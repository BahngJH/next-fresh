import { NextResponse } from 'next/server'

export async function middleware(request) {
    // console.log(request.nextUrl);
    // console.log(request.cookies);
    // console.log(request.headers);

    if (request.nextUrl.pathname === '/list') {
        console.log(new Date())
        console.log(request.headers.get('sec-ch-ua-platform'))
    }

    // 통과
    return NextResponse.next()
} 