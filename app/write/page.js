'use client'

import { useRouter } from 'next/navigation'
import BoardForm from '../modify/BoardForm'

export default function Write() {
    const router = useRouter()

    function handleSubmit(e) {
        e.preventDefault()
        
        fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: e.target.title.value, content: e.target.content.value})
        })
        .then(res => res.json())
        .then(result => {
            if(result.success) {
                alert('게시글이 성공적으로 작성되었습니다!')
                router.push('/list')
            } else {
                alert('게시글 작성에 실패했습니다: ' + result.error)
            }
        })
        .catch(error => {
            console.error('게시글 작성 오류:', error)
            alert('게시글 작성 중 오류가 발생했습니다')
        })
    }
    
    return (
      <div className="p-20">
        <h4>새 게시글 작성</h4>
        <BoardForm mode="create" />
      </div>
    )
  } 