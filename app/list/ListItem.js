'use client'

import Link from 'next/link'
import DetailLink from './DetailLink'

export default function ListItem({ posts }) {

    return (
        <div>
            { posts.map((item, i) => 
            <div className="list-item" key={item._id.toString()}>
                <Link href={`/detail/${item._id.toString()}`}>
                    <h4>{item.title}</h4>
                </Link>
                <DetailLink id={item._id.toString()} />
                <p>{item.content}</p>
                <span onClick={() => {
                    fetch(`/api/post?id=${item._id.toString()}`, {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then(result => {
                        if(result.success) {
                            alert('삭제 완료!')
                            window.location.reload()
                        } else {
                            // 서버가 에러코드 전송
                            alert('삭제 실패!')
                        }
                    }).catch(err => {
                        // 인터넷 문제로 실패 시
                        console.log(err)
                    })
                }}>🗑️</span>
            </div>
        )}
        </div>
    )
}