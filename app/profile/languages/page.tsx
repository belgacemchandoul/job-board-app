import { userLanguagesFormType } from "@/app/components/forms/UserLanguagesForm";
import { fetchData } from "@/app/lib/apiUtils";
import LanguagesComponent from "@/app/components/Languages";
import { UserLanguagesProps } from "@/types/interfaces";

const Languages: React.FC<UserLanguagesProps> = async () => {
  const userLanguages = await fetchData<userLanguagesFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  console.log(userLanguages);
  return <LanguagesComponent userLanguages={userLanguages} />;
};

export default Languages;
