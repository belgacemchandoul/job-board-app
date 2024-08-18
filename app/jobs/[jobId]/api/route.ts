import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/app/lib/nextAuth";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 });
  }

  try {
    const id = req.nextUrl.searchParams.get("jobId");
    if (!id) {
      return new Response(JSON.stringify({ message: "Missing Job ID" }), { status: 400 });
    }
    const jobData = await prisma.job.findUnique({
      where: { id: id },
    });
    if (!jobData) {
      return new Response(JSON.stringify({ message: "Job not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(jobData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Not able to fetch jobs" }), { status: 500 });
  }
}



export async function PATCH(req: NextRequest) {

  if (req.method !== "PATCH") {
    return new Response(JSON.stringify({ message: "Method Noth Allowed" }), { status: 405 })
  }
  try {
    const id = req.nextUrl.searchParams.get("jobId")
    const updateData = await req.json()

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing Job ID" }), { status: 400 })
    }
    const updateJob = await prisma.job.update({
      where: { id: id },
      data: updateData
    })
    return new Response(JSON.stringify(updateJob), { status: 200, headers: { "Content-Type": "application/json" } })
  } catch (error) {
    return new Response(JSON.stringify({ message: "Not able to update this job" }), { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 })
  }
  try {
    const id = req.nextUrl.searchParams.get("jobId")
    if (!id) {
      return new Response(JSON.stringify({ message: "Missing Job ID" }), { status: 400 })
    }
    await prisma.job.delete({
      where: { id: id }
    })
    return new Response(JSON.stringify({ message: "Job deleted successfully" }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: "Not able to delete this job" }), { status: 500 })
  }
}
export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
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

    const jobId = req.nextUrl.searchParams.get("jobId");

    if (!jobId) {
      return new Response(JSON.stringify({ message: "Job ID is required" }), { status: 400 });
    }

    const jobExists = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!jobExists) {
      return new Response(
        JSON.stringify({ message: "Job not found" }),
        { status: 404 }
      );
    }
    const appliedJob = await prisma.userJob.findUnique({
      where: {
        jobId_userEmail: {
          jobId,
          userEmail: session.user?.email || "",
        },
      },
      include: {
        job: true
      }
    })
    if (appliedJob) {
      return new Response(JSON.stringify({ message: "You have already applied to this job!" }), { status: 401 })
    }
    const userJob = await prisma.userJob.create({
      data: {
        userEmail: session.user?.email || "",
        jobId: jobId
      }

    })
    return new Response(JSON.stringify(userJob), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: "You cannot apply to this job" }), { status: 500 })
  }
}