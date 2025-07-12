'use client'

import { useRouter } from 'next/navigation'

export default function DetailLink(props) {
    const router = useRouter()
    return (
        <button onClick={() => {router.push(`/detail/${props.id}`)}}>상세보기</button>
    )
}