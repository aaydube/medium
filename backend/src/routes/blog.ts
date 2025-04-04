import { Hono } from "hono";
import { getPrisma } from "..";
import { createPostInput, updatePostInput } from "@aaydube/common"

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
    }
    Variables:{
        userId: string
    }
}>()

blogRouter.get("/all", async(c)=>{
    const prisma = getPrisma(c.env.DATABASE_URL)
    const blogs = await prisma.post.findMany({})
    return c.json(blogs)
})


blogRouter.get("/", async(c)=>{
    const prisma = getPrisma(c.env.DATABASE_URL)
    const id = c.req.query("id")
    const blog = await prisma.post.findUnique({
        where: {
            id: id,
        }
    })
    return c.json(blog)
})


blogRouter.put("/update", async(c)=>{
    const userId  = c.get("userId")
    const prisma = getPrisma(c.env.DATABASE_URL)
    const body = await c.req.json()
    const {success} = updatePostInput.safeParse(body)
    if(!success){
        return c.json("Invalid input")
    }

        await prisma.post.update({
            where:{
                id: body.id,
                authorId: userId
            },
            data:{
                title: body.title,
                content: body.content
            }
        })
        return c.json("Blog Updated!")
})

blogRouter.post("/post", async(c)=>{
 const userId  = c.get("userId")
 const prisma = getPrisma(c.env.DATABASE_URL)

 const body = await c.req.json()
 const {success} = createPostInput.safeParse(body)
  if (!success){
    return c.json("Invalid input")
  }
 try {
    const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
     })
     return c.json({id: post.id})
 } catch (error) {
    c.status(403)
    return c.json("post cant be created!")
 }
})