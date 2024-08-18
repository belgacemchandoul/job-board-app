-- CreateTable
CREATE TABLE "UserJob" (
    "userEmail" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "UserJob_pkey" PRIMARY KEY ("jobId","userEmail")
);

-- AddForeignKey
ALTER TABLE "UserJob" ADD CONSTRAINT "UserJob_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJob" ADD CONSTRAINT "UserJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
