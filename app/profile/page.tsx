import UserProfileDataSection from "../components/UserProfileDataSection";
import { User } from "@/types/User";
import axiosInstance from "../lib/axiosInterceptor";

const Profile = async () => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  const userData: User = await response.data;
  console.log(userData);
  return (
    <div className="min-h-screen flex flex-col items-center">
      <p>welcome, {userData.name}</p>
      <UserProfileDataSection />
    </div>
  );
};

export default Profile;
