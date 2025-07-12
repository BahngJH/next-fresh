'use client'

import { useRouter } from 'next/navigation'

export default function BoardForm({ mode = 'modify', post = null }) {
    const router = useRouter()

    function handleSubmit(e) {
        e.preventDefault()
        
        const formData = {
            title: e.target.title.value,
            content: e.target.content.value
        }

        if (mode === 'modify') {
            formData.id = post._id
        }

        const url = mode === 'create' ? '/api/post' : '/api/modify'
        const method = mode === 'create' ? 'POST' : 'PUT'

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(result => {
            if(result.success) {
                alert(mode === 'create' ? '게시글이 작성되었습니다!' : '게시글이 수정되었습니다!')
                router.push('/list')
            } else {
                alert('실패했습니다: ' + result.error)
            }
        })
        .catch(error => {
            console.error('오류:', error)
            alert('오류가 발생했습니다')
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="title" 
                placeholder="글제목" 
                defaultValue={mode === 'modify' ? post.title : ''}
            />
            <input 
                name="content" 
                placeholder="글내용" 
                defaultValue={mode === 'modify' ? post.content : ''}
            />
            <button type="submit">
                {mode === 'create' ? '게시글 작성' : '게시글 수정'}
            </button>
        </form>
    )
}