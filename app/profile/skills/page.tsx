import { userSkillsFormType } from "../../components/forms/UserSkillsForm";
import { fetchData } from "@/app/lib/apiUtils";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
const SkillsComponent = dynamic(() => import("@/app/components/Skills"), {
  ssr: true,
  loading: () => <Loading />,
});
const Skills = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }
  const userSkills = await fetchData<userSkillsFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  return <SkillsComponent userSkills={userSkills} />;
};

export default Skills;
