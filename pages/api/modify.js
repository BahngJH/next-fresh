import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const client = await connectDB
            const db = client.db('forum')
            
            // 요청 본문에서 데이터 추출
            const { id, title, content } = req.body
            
            if (!title || !content) {
                return res.status(400).json({ error: '제목, 내용을 모두 입력해주세요' })
            }
            
            // ObjectId 유효성 검사
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: '잘못된 ID 형식입니다' })
            }
            
            // 게시글 수정
            const result = await db.collection('post').updateOne(
                { _id: new ObjectId(id) },
                { 
                    $set: { 
                        title, 
                        content,
                    } 
                }
            )
            
            if (result.matchedCount === 0) {
                return res.status(404).json({ error: '수정할 게시글을 찾을 수 없습니다' })
            }
            
            console.log('게시글 수정 완료:', result)
            res.status(200).json({ 
                success: true, 
                message: '게시글이 성공적으로 수정되었습니다',
                modifiedCount: result.modifiedCount
            })
            
        } catch (error) {
            console.error('게시글 수정 오류:', error)
            res.status(500).json({ error: '서버 오류가 발생했습니다' })
        }
    }
} 