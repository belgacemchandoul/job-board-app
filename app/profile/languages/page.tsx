import { userLanguagesFormType } from "@/app/components/forms/UserLanguagesForm";
import { fetchData } from "@/app/lib/apiUtils";
import LanguagesComponent from "@/app/components/Languages";
import { UserLanguagesProps } from "@/types/interfaces";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";

const Languages = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }
  const userLanguages = await fetchData<userLanguagesFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  console.log(userLanguages);
  return <LanguagesComponent userLanguages={userLanguages} />;
};

export default Languages;
