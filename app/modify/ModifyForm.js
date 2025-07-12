'use client'

import { useRouter } from 'next/navigation'

export default function ModifyForm({ result }) {
    const router = useRouter()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/api/modify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: result._id.toString(),
                title: e.target.title.value,
                content: e.target.content.value
            })
        })
        .then(res => res.json())
        .then(result => {
            if(result.success) {
                alert('수정 완료!')
                router.push('/list')
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="글제목" defaultValue={result.title}/>
            <input name="content" placeholder="글내용" defaultValue={result.content}/>
            <button type="submit">전송</button>
        </form>
    )
}