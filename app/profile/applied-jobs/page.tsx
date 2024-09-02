import axiosInstance from "@/app/lib/axiosInterceptor";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";
const AppliedJobs = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/applied-jobs/api`
  );
  const data = response.data;
  console.log(data);
  return <div>applied jobs</div>;
};

export default AppliedJobs;
