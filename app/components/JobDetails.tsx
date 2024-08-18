import { Job } from "@/types/Job";
import Button from "./Button";
import onJobApply from "../utils/jobApply";
interface JobsList {
  selectedJob: Job | null;
}

const JobDetails: React.FC<JobsList> = ({ selectedJob }) => {
  return (
    <div className="border p-3 rounded-md flex flex-col gap-5">
      <section>
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
      <Button
        text="Apply"
        onClick={() => onJobApply({ params: { jobId: selectedJob?.id || "" } })}
      />
    </div>
  );
};

export default JobDetails;
