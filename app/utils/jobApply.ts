import axios from "axios"

const onJobApply = async ({ params }: { params: { jobId: string } }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.jobId}/api/?jobId=${params.jobId}`, params.jobId
    );
    console.log("job applied successfully", res);
  } catch (error) {
    console.log("error applying to job", error);
  }
};

export default onJobApply