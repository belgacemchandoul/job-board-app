import axiosInstance from "@/app/lib/axiosInterceptor";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";
import Button from "@/app/components/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { AppliedJob } from "@/types/AppliedJob";
import truncateDescription from "@/app/utils/truncateDescription";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
const JobCard = dynamic(() => import("@/app/components/JobCard"), {
  ssr: true,
  loading: () => <Loading />,
});
const AppliedJobs = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/applied-jobs/api`
  );
  const data: AppliedJob[] = response.data;
  return (
    <div className="flex flex-col items-center mt-7">
      {data.length === 0 ? (
        <div className="flex flex-col items-center gap-10">
          <div className="font-medium text-3xl text-[#003366] mt-4">
            No applied jobs!
          </div>
          <Link href="/jobs">
            <Button text="Explore Jobs">
              <ArrowForwardIcon sx={{ fontSize: 20, fontWeight: "light" }} />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-10">
          <div className="font-medium text-3xl text-[#003366] mt-4">
            You applied to {data.length} {data.length === 1 ? "job" : "jobs"}
          </div>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((appliedJob) => (
              <JobCard
                key={appliedJob.jobId}
                title={appliedJob.job.title}
                jobLink={appliedJob.jobId || ""}
                description={truncateDescription(appliedJob.job.description, 6)}
              />
            ))}
          </section>
          <Link href="/jobs">
            <Button text="Explore more jobs">
              <ArrowForwardIcon sx={{ fontSize: 20, fontWeight: "light" }} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
