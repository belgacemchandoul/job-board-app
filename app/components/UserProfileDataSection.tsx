import UserProfileCard from "./UserProfileCard";

const UserProfileDataSection = () => {
  return (
    <section className="flex flex-col">
      {" "}
      <UserProfileCard>
        <div>test</div>
        <div>test</div>
      </UserProfileCard>
      <UserProfileCard>
        <div>test</div>
        <div>test</div>
      </UserProfileCard>
      <UserProfileCard>
        <div>test</div>
        <div>test</div>
      </UserProfileCard>
    </section>
  );
};

export default UserProfileDataSection;
