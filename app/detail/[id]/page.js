import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import Link from 'next/link'
import Comment from './Comment'

export default async function Detail(props) {
    const client = await connectDB
    const db = client.db('forum')
    
    // params를 먼저 await한 후 속성에 접근
    const params = await props.params

    let result = await db.collection('post').findOne({ _id: new ObjectId(params.id) })

    if (result === null) {
        return <div>
            <h4>게시글을 찾을 수 없습니다</h4>
            <p>ID: {params.id}</p>
        </div>
    }

    return (
      <div>
        <h4>상세페이지임</h4>
          <h4>{result.title || '글제목 없음'}</h4>
          <p>{result.content || '글내용 없음'}</p>
          <Link href={`/modify/${params.id}`} style={{color: 'white'}}>수정하기</Link>
          <br/> <br/> <br/>
          <Comment parent={params.id} />
      </div>
    )
}