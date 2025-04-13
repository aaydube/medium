import { Hono } from "hono";
import { getPrisma } from "../index";
import { sign } from "hono/jwt";
import {signupInput, signinInput} from "@aaydube/common"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const {success}  = signupInput.safeParse(body)
  if(!success){
    return c.json("Invalid input")
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({token: jwt, name:body.name});
  } catch (error) {
    return c.json({error});
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body)
  if(!success)
    return c.json("Invalid input")
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      },
    });
    if (!user) {
      c.status(403);
      return c.text("invalid email");
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: jwt, name: user.name });
  } catch (error) {
    c.status(413);
    c.json("error while signing in");
  }
});
