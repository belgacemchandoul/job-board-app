import BasicInformationComponent from "@/app/components/BasicInformations";
import { userInfoFormType } from "@/app/components/forms/UserInfosForm";
import { fetchData } from "@/app/lib/apiUtils";
import { authOptions } from "@/app/lib/nextAuth";
import { BasicInformationProps } from "@/types/interfaces";
import { getServerSession, Session } from "next-auth";

const BasicInformation: React.FC<BasicInformationProps> = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const userSkills = await fetchData<userInfoFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  const userData: userInfoFormType = session
    ? {
        email: session.user?.email || "",
        name: session.user?.name || "",
        birthdate: userSkills.birthdate || "",
      }
    : {
        email: "",
        name: "",
        birthdate: "",
      };
  return <BasicInformationComponent userData={userData} />;
};

export default BasicInformation;
