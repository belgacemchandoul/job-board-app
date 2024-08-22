import UserProfileDataSection from "../components/UserProfileDataSection";
import { User } from "@/types/User";
import axiosInstance from "../lib/axiosInterceptor";

const Profile = async () => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  const userData: User = await response.data;
  return (
    <div className="min-h-screen flex flex-col items-center mt-5 gap-9">
      <p className="font-medium text-3xl text-[#003366]">
        {" "}
        Welcome back, {userData.name}!
      </p>
      <UserProfileDataSection userData={userData} />
    </div>
  );
};

export default Profile;
