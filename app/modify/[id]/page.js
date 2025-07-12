import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import BoardForm from '../BoardForm'

export default async function Modify(props) {
    const client = await connectDB
    const db = client.db('forum')
    
    // params를 먼저 await한 후 속성에 접근
    const params = await props.params
    const result = await db.collection('post').findOne({ _id: new ObjectId(params.id) })

    // ObjectId를 문자열로 변환
    const postData = {
      _id: result._id.toString(),
      title: result.title,
      content: result.content
  }

    return (
      <div className="p-20">
        <h4>게시글 수정</h4>
        <BoardForm mode="modify" post={postData} />
      </div>
    )
}