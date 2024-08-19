import { fetchData } from "@/app/lib/apiUtils";
import { userEducationFormType } from "@/app/components/forms/UserEducationForm";
import EducationComponent from "@/app/components/Education";
import { UserEducationProps } from "@/types/interfaces";

const Education: React.FC<UserEducationProps> = async () => {
  const userEducation = await fetchData<userEducationFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  return <EducationComponent userEducation={userEducation} />;
};

export default Education;
