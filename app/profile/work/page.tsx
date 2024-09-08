import { userCareerFormType } from "@/app/components/forms/UserCareerForm";
import { fetchData } from "@/app/lib/apiUtils";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
const WorkComponent = dynamic(() => import("@/app/components/Work"), {
  ssr: true,
  loading: () => <Loading />,
});
const Work = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }
  const userWork = await fetchData<userCareerFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  return <WorkComponent userWork={userWork} />;
};

export default Work;
