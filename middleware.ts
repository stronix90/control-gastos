import { NextResponse } from 'next/server';
import { auth } from './src/conexion';
import { getIdToken } from 'firebase/auth';

export async function middleware(req) {
  
  const token = req.cookies.token;
  console.log(token)
  return NextResponse.next();
  

  if (!token) {
    return NextResponse.redirect('/login');
  }

  // try {
  //   const decodedToken = await getIdToken(auth, token);
  //   req.user = decodedToken;
    return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect('/login');
  // }
}

export const config = {
  matcher: ['/app/:path*'],
};
