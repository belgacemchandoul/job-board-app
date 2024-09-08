import { fetchData } from "@/app/lib/apiUtils";
import { userEducationFormType } from "@/app/components/forms/UserEducationForm";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const EducationComponent = dynamic(() => import("@/app/components/Education"), {
  ssr: true,
  loading: () => <Loading />,
});
const Education = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }
  const userEducation = await fetchData<userEducationFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  return <EducationComponent userEducation={userEducation} />;
};

export default Education;
