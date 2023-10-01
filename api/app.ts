import express from 'express';
import cors from 'cors';
import { Router, Request, Response } from 'express';
import { z } from 'zod'
import prisma from './lib/prisma';


const app = express();

const route = Router()

app.use(express.json())
app.use(cors())

route.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello world' })
})


route.get('/user/:userId/notes', async (req: Request, res: Response) => {
    const paramsSchema = z.object({
        userId: z.string()
    })
    const { userId } = paramsSchema.parse(req.params)
    const idNumber = Number(userId)


    const existingUser = await prisma.user.findUnique({
        where: {
            id: idNumber
        }
    })

    if (!existingUser) {
        return res.status(400).send({ error: "User doesn't exist" })
    }

    const notes = await prisma.note.findMany({
        where: {
            authorId: existingUser.id
        }
    })

    res.json(notes)
})


route.post('/login', async (req: Request, res: Response) => {
    const bodySchema = z.object({
        values: z.object({
            username: z.string(),
            password: z.string()
        })
    })
    const { values } = bodySchema.parse(req.body)

    const existingUser = await prisma.user.findFirst({
        where: {
            username: values.username
        }
    })

    if (!existingUser) {
        return res.status(400).send({ error: "User doesn't exist" })
    }

    return res.send(existingUser);
})

route.post('/user', async (req: Request, res: Response) => {
    const bodySchema = z.object({
        values: z.object({
            username: z.string(),
            password: z.string()
        })
    })
    const { values } = bodySchema.parse(req.body)

    const existingUser = await prisma.user.findFirst({
        where: {
            username: values.username
        }
    })

    if (existingUser) {
        return res.status(400).send({ error: "User already exists" })
    }

    const createdUser = await prisma.user.create({
        data: {
            username: values.username,
            password: values.password
        }
    })

    return res.json(createdUser);
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')