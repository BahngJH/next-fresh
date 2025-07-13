import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions)

        const { comment, parent } = JSON.parse(req.body)

        let db = (await connectDB).db('forum');
        const result = await db.collection('comment').insertOne({
            comment: comment,
            parent: parent,
            author: session.user.email,
            insertDate: new Date()
        })

        const result2 = await db.collection('comment').findOne({ _id: result.insertedId })

        res.status(200).json(result2)
    } else if (req.method === 'GET') {
        const { parent } = req.query

        let db = (await connectDB).db('forum');
        const result = await db.collection('comment').find({ parent: parent }).toArray()

        res.status(200).json(result)
    }
}