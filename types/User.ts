export type User = {
  name: string;
  email: string;
  birthdate: string;
  appliedJobs?: {
    title: string;
    status?: boolean;
  };
  education: {
    name: string;
    startDate: string;
    endDate: string;
    diploma: string;
  }[];
  work: {
    name: string;
    startDate: string;
    endDate: string;
    job: string;
  }[];
  cv?: {
    name: string;
    type: string;
    content: string;
    userId: string;
  };
  skills: {
    name: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
};
