import { type NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 });
  }

  try {
    const jobsData = await prisma.job.findMany();
    return new Response(JSON.stringify(jobsData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Not able to fetch jobs" }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 });
  }

  try {
    const data = await req.json();
    const { title, description, status, missions, skills } = data;

    if (!title || !description || status === undefined || !missions || !skills) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const jobData = await prisma.job.create({
      data: {
        ...data
      },
    });

    return new Response(JSON.stringify(jobData), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Not able to create this job" }), { status: 500 });
  }
}

