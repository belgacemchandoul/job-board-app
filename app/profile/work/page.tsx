import { userCareerFormType } from "@/app/components/forms/UserCareerForm";
import { fetchData } from "@/app/lib/apiUtils";
import WorkComponent from "@/app/components/Work";
import { UserCareerProps } from "@/types/interfaces";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";

const Work = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const userWork = await fetchData<userCareerFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  return <WorkComponent userWork={userWork} />;
};

export default Work;
