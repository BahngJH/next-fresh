import { connectDB } from '@/util/database'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const client = await connectDB
            const db = client.db('forum')
            
            // title과 content만 받기
            const { title, content } = req.body
            
            if (!title || !content) {
                return res.status(400).json({ error: '제목과 내용을 모두 입력해주세요' })
            }
            
            const result = await db.collection('post').insertOne({
                title,
                content
            })
            
            console.log('새 게시글 생성:', result)
            res.status(200).json({ 
                success: true, 
                _id: result.insertedId,
                message: '게시글이 성공적으로 작성되었습니다'
            })
        } catch (error) {
            console.error('게시글 작성 오류:', error)
            res.status(500).json({ error: '서버 오류가 발생했습니다' })
        }
    } else {
        res.status(405).json({ error: 'POST 메서드만 허용됩니다' })
    }
}