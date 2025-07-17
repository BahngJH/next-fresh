import { connectDB } from '@/util/database'
import { revalidatePath } from 'next/cache'

export default async function Write2() {

    const db = (await connectDB).db('forum')
    let result = await db.collection('post_test').find().toArray()

    async function handleSubmit(formData) {
        'use server'

        const db = (await connectDB).db('forum')
        await db.collection('post_test').insertOne({title: formData.get('title')})

        revalidatePath('/write2')
    }

    return (
        <div>
            <h4>Write2</h4>
            <form action={handleSubmit} method="POST">
                <input type="text" name="title" placeholder="title" />
                <button type="submit">submit</button>
            </form>
            {
                result ? result.map((a, i) => <p key={i}>글 제목: {a.title}</p>) : null
            }
        </div>
    )
}