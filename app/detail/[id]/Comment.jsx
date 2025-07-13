'use client'

import { useState, useEffect } from 'react'

export default function Comment(props) {
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([])

    const handleComment = () => {
        fetch(`/api/comment`, { method: 'POST', body: JSON.stringify({ comment: comment, parent: props.parent }) })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setCommentList([...commentList, data])
            setComment('')
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetch(`/api/comment?parent=${props.parent}`, { method: 'GET' })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            setCommentList(result)
        })
    }, [])

    return (
        <div>
            <div>댓글 목록</div>
            {
                commentList.map((item, index) => (
                    <div key={index}>
                        <p>{item.comment}</p>
                    </div>
                ))
            }
            <input value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={handleComment}>댓글달기</button>
        </div>
    )
}