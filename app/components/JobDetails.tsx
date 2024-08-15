import { Job } from "@/types/Job";

interface JobsList {
  selectedJob: Job | null;
}
const JobDetails: React.FC<JobsList> = ({ selectedJob }) => {
  return (
    <section className="border p-3 rounded-md ">
      <div>{selectedJob?.title}</div>
      <div>{selectedJob?.description}</div>
      <div>
        {selectedJob?.missions.map((mission, index) => {
          return <p key={index}>{mission.mission}</p>;
        })}
      </div>
      <div>
        {selectedJob?.skills.map((skill, index) => {
          return <p key={index}>{skill.skill}</p>;
        })}
      </div>
    </section>
  );
};

export default JobDetails;
