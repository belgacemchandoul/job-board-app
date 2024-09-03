import { authOptions } from "@/app/lib/nextAuth";
import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

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
    const userJobs = await prisma.userJob.findMany({
      where: {
        userEmail: session.user?.email || "",
      },
      include: {
        job: {
          select: {
            title: true,
            description: true
          },
        },
      },
    });
    return new Response(JSON.stringify(userJobs), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: "Not able to get applied jobs" }), { status: 500 })
  }
}