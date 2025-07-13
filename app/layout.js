import Link from "next/link";
import './globals.css';
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <html lang="en">
      <head />
      <body>
        {/* <div className="navbar">
          <Link href="/">Home</Link>
          <Link href="/list">List</Link>
          <Link href="/cart">Cart</Link>
        </div> */}
        <div className="navbar">
          <Link href="/" className="logo">Home</Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          {
            session ? <span style={{color: 'blue'}}>{session.user.name} 님 환영합니다. <LogoutBtn /></span> : <LoginBtn />
          }
        </div>
        {children}
      </body>
    </html>
  )
} 