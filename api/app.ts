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
        throw new Error("User already exists.")
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