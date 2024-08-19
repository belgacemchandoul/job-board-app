import { userSkillsFormType } from "../../components/forms/UserSkillsForm";
import SkillsComponent from "@/app/components/Skills";
import { fetchData } from "@/app/lib/apiUtils";
import { UserSkillsProps } from "@/types/interfaces";

const Skills: React.FC<UserSkillsProps> = async () => {
  const userSkills = await fetchData<userSkillsFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  console.log(userSkills);
  return <SkillsComponent userSkills={userSkills} />;
};

export default Skills;
