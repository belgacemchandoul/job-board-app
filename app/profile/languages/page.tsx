import { userLanguagesFormType } from "@/app/components/forms/UserLanguagesForm";
import { fetchData } from "@/app/lib/apiUtils";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
const LanguagesComponent = dynamic(() => import("@/app/components/Languages"), {
  ssr: true,
  loading: () => <Loading />,
});
const Languages = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }
  const userLanguages = await fetchData<userLanguagesFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  return <LanguagesComponent userLanguages={userLanguages} />;
};

export default Languages;
