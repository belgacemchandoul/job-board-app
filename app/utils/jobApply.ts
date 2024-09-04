import axios, { AxiosError } from "axios";

const onJobApply = async ({ params }: { params: { jobId: string } }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.jobId}/api/?jobId=${params.jobId}`,
      params.jobId
    );

    if (res.status !== 200) {
      throw new AxiosError(res.statusText, res.status.toString(), res.config, res.request, res);
    }

    return res;
  } catch (error: any) {
    if (error.response) {
      throw new AxiosError(
        error.response.statusText,
        error.response.status.toString(),
        error.config,
        error.request,
        error.response
      );
    }
    throw new Error("An unexpected error occurred while applying to the job.");
  }
};

export default onJobApply;
