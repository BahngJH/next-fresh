import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function Detail(props) {
    const client = await connectDB
    const db = client.db('forum')
    
    // params를 먼저 await한 후 속성에 접근
    const params = await props.params
    
    try {
        const result = await db.collection('post').findOne({ _id: new ObjectId(params.id) })

        if (!result) {
            return (
                <div>
                    <h4>게시글을 찾을 수 없습니다</h4>
                    <p>ID: {params.id}</p>
                </div>
            )
        }

        return (
            <div>
                <h4>상세페이지임</h4>
                <h4>{result.title || '글제목 없음'}</h4>
                <p>{result.content || '글내용 없음'}</p>
                <p>ObjectId: {result._id.toString()}</p>
            </div>
        )
    } catch (error) {
        console.error('게시글 조회 오류:', error)
        return (
            <div>
                <h4>게시글 조회 중 오류가 발생했습니다</h4>
                <p>잘못된 ID 형식입니다: {params.id}</p>
            </div>
        )
    }
}