-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "missions" JSONB[],
    "status" BOOLEAN,
    "profiles" JSONB[],

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
