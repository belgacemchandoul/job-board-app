import { userCareerFormType } from "@/app/components/forms/UserCareerForm";
import { fetchData } from "@/app/lib/apiUtils";
import WorkComponent from "@/app/components/Work";
import { UserCareerProps } from "@/types/interfaces";

const Work: React.FC<UserCareerProps> = async () => {
  const userWork = await fetchData<userCareerFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  return <WorkComponent userWork={userWork} />;
};

export default Work;
