import Link from "next/link";
type JobData = {
  title: string;
  jobLink: string;
  description: string;
};
const JobCard = ({ title, jobLink, description }: JobData) => {
  return (
    <Link
      href={`/jobs/${jobLink}`}
      className="border flex flex-col p-4 gap-3 items-center rounded-lg shadow-sm hover:scale-110 duration-300 cursor-pointer"
    >
      <span className="font-semibold text-lg">{title}</span>
      <span className="font-light text-sm">{description}</span>
    </Link>
  );
};

export default JobCard;
