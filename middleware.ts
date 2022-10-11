import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')
  const url = request.nextUrl.clone()   

  if(request.nextUrl.pathname.startsWith('/dashboard')){
    if(!token){
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  if(request.nextUrl.pathname.startsWith('/login')){
    if(token){
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}