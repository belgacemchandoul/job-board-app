import { User } from "@/types/User";
import UserProfileCard from "./UserProfileCard";
import DateRangeItem from "./DateRangeItem";

interface UserProfileDataSection {
  userData: User;
}
const UserProfileDataSection: React.FC<UserProfileDataSection> = ({
  userData,
}) => {
  const sections = [
    {
      title: "Basic Information",
      data: [
        { label: "Name", value: userData.name },
        { label: "Email", value: userData.email },
        userData.birthdate === null
          ? { label: "Birthdate", value: "add your birthdate" }
          : { label: "Birthdate", value: userData.birthdate },
      ],
      link: "/profile/basic-information",
    },
    {
      title: "Education",
      data:
        userData.education?.length > 0
          ? userData.education.map((uni) => ({
              label: uni.name,
              value: (
                <DateRangeItem
                  label={uni.name}
                  details={uni.diploma}
                  startDate={uni.startDate}
                  endDate={uni.endDate}
                />
              ),
            }))
          : [{ value: "add your education" }],
      link: "/profile/education",
    },
    {
      title: "Work",
      data:
        userData.work?.length > 0
          ? userData.work.map((work) => ({
              label: work.name,
              value: (
                <DateRangeItem
                  label={work.name}
                  details={work.job}
                  startDate={work.startDate}
                  endDate={work.endDate}
                />
              ),
            }))
          : [{ value: "add your work career" }],
      link: "/profile/work",
    },
    {
      title: "Skills",
      data:
        userData.skills?.length > 0
          ? userData.skills.map((skill) => ({
              label: "Skill",
              value: skill.name,
            }))
          : [{ value: "add your skills" }],
      link: "/profile/skills",
    },
    {
      title: "Languages",
      data:
        userData.languages?.length > 0
          ? userData.languages.map((language) => ({
              label: "Language",
              value: language.name,
            }))
          : [{ value: "add your languages" }],
      link: "/profile/languages",
    },
  ];
  return (
    <section className="flex flex-col">
      {sections.map((section, index) => (
        <UserProfileCard
          key={index}
          title={section.title}
          data={section.data}
          link={section.link}
        />
      ))}
    </section>
  );
};

export default UserProfileDataSection;
