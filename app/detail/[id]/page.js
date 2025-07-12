import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function Detail(props) {
    const client = await connectDB
    const db = client.db('forum')
    
    // params를 먼저 await한 후 속성에 접근
    const params = await props.params
    const result = await db.collection('post').findOne({ id: Number(params.id) })
    console.log(result)

    return (
      <div>
        <h4>상세페이지임</h4>
        <h4>{result.title || '글제목 없음'}</h4>
        <p>{result.content || '글내용 없음'}</p>
      </div>
    )
  }