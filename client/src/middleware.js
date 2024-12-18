/* eslint-disable react-hooks/rules-of-hooks */
import { NextResponse } from "next/server";


export const middleware = (request) => {


  const authToken = request.cookies.get('authToken')?.value;
  
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard/adminHome'],
};
