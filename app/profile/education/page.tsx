import { fetchData } from "@/app/lib/apiUtils";
import { userEducationFormType } from "@/app/components/forms/UserEducationForm";
import EducationComponent from "@/app/components/Education";
import { UserEducationProps } from "@/types/interfaces";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";

const Education = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const userEducation = await fetchData<userEducationFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  return <EducationComponent userEducation={userEducation} />;
};

export default Education;
