interface UserProfileCardProps {
  children: React.ReactNode;
}
const UserProfileCard: React.FC<UserProfileCardProps> = ({ children }) => {
  return <div className="border rounded-md">{children}</div>;
};

export default UserProfileCard;
