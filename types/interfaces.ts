import { userEducationFormType } from "@/app/components/forms/UserEducationForm";
import { userCareerFormType } from "@/app/components/forms/UserCareerForm";
import { userLanguagesFormType } from "@/app/components/forms/UserLanguagesForm";
import { userSkillsFormType } from "@/app/components/forms/UserSkillsForm";
import { userInfoFormType } from "@/app/components/forms/UserInfosForm";

export interface UserEducationProps {
  userEducation: userEducationFormType;
}

export interface UserCareerProps {
  userWork: userCareerFormType;
}

export interface UserLanguagesProps {
  userLanguages: userLanguagesFormType;
}

export interface UserSkillsProps {
  userSkills: userSkillsFormType;
}

export interface BasicInformationProps {
  userData: userInfoFormType;
}
