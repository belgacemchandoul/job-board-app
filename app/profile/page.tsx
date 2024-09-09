import { User } from "@/types/User";
import axiosInstance from "../lib/axiosInterceptor";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/nextAuth";
import dynamic from "next/dynamic";
import Loading from "../loading";
const UserProfileDataSection = dynamic(
  import("../components/UserProfileDataSection"),
  { ssr: true, loading: () => <Loading /> }
);
const Profile = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  const userData: User = await response.data;
  return (
    <div className="min-h-screen flex flex-col items-center mt-8 gap-9 px-4 md:px-8 lg:px-12">
      <div className="font-medium text-3xl text-[#003366] text-center md:text-4xl">
        Welcome back, {userData.name}!
      </div>
      <UserProfileDataSection userData={userData} />
    </div>
  );
};

export default Profile;
