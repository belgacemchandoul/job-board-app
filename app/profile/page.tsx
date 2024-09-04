import UserProfileDataSection from "../components/UserProfileDataSection";
import { User } from "@/types/User";
import axiosInstance from "../lib/axiosInterceptor";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/nextAuth";

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
    <div className="min-h-screen flex flex-col items-center mt-5 gap-9">
      <div className="font-medium text-3xl text-[#003366]">
        {" "}
        Welcome back, {userData.name}!
      </div>
      <UserProfileDataSection userData={userData} />
    </div>
  );
};

export default Profile;
