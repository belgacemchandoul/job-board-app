import BasicInformationComponent from "@/app/components/BasicInformations";
import { userInfoFormType } from "@/app/components/forms/UserInfosForm";
import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession, Session } from "next-auth";

interface BasicInformationProps {
  userData: userInfoFormType;
}

const BasicInformation: React.FC<BasicInformationProps> = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const userData: userInfoFormType = session
    ? {
        email: session.user?.email || "",
        name: session.user?.name || "",
        birthdate: "",
      }
    : {
        email: "",
        name: "",
        birthdate: "",
      };
  return <BasicInformationComponent userData={userData} />;
};

export default BasicInformation;
