import { connectDB } from '@/util/database'

export default async function handler(req, res) {
    const client = await connectDB
    const db = client.db('forum')
    const result = await db.collection('post').find().toArray()
    console.log(result)

    res.status(200).json(result)
}