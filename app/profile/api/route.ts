import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/nextAuth";
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextRequest) {

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 })
  }
  const session = await getServerSession({
    req: req as unknown as NextApiRequest,
    res: NextResponse as unknown as NextApiResponse,
    ...authOptions,
  });
  if (!session) {
    return new Response(JSON.stringify({ message: "Please Log in" }), { status: 401 })
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email || ""
      }
    })
    return new Response(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: "Not able to get the authenticated user" }), { status: 500 })
  }
}



export async function PATCH(req: NextRequest) {
  if (req.method !== "PATCH") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 })
  }
  const session = await getServerSession({
    req: req as unknown as NextApiRequest,
    res: NextResponse as unknown as NextApiResponse,
    ...authOptions,
  });
  if (!session) {
    return new Response(JSON.stringify({ message: "Please Log in" }), { status: 401 })
  }
  const updatedData = await req.json()
  try {
    const userData = await prisma.user.update({
      data: {
        ...updatedData
      },
      where: {
        email: session.user?.email || ""
      }
    })
    return new Response(JSON.stringify(userData), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: "Not able to update or add user data" }))
  }
}