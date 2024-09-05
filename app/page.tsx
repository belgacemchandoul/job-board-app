import Image from "next/image";
import Button from "./components/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LatestJobsSection from "./components/LatestJobsSection";
import JobsHomePageSection from "./components/JobsHomePageSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="relative flex flex-col items-center min-h-screen w-full justify-evenly z-0 bg-gradient-to-r from-teal-700 to-[#20B2AA]">
        <div className="absolute top-1 left-1 w-20 h-20 sm:w-40 sm:h-40 bg-teal-50 rounded-full opacity-50"></div>
        <div className="absolute top-20 right-10 w-16 h-16 sm:w-32 sm:h-32 bg-teal-100 rounded-full opacity-60"></div>
        <div className="absolute top-30 left-40 w-8 h-8 sm:w-16 sm:h-16 bg-teal-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-10 left-20 w-12 h-12 sm:w-24 sm:h-24 bg-teal-200 rounded-full opacity-70"></div>
        <div className="absolute bottom-20 right-0 w-24 h-24 sm:w-48 sm:h-48 bg-teal-400 rounded-full opacity-40"></div>
        <div className="absolute top-40 right-40 w-10 h-10 sm:w-20 sm:h-20 bg-blue-100 rounded-full opacity-50"></div>

        <section className="flex flex-col gap-5 sm:gap-10 items-center text-center px-4 sm:px-0">
          <p className="md:text-3xl text-4xl text-white font-bold">
            Find Your Dream Job Today!
          </p>
          <Link href="/jobs">
            <Button text="Explore Jobs">
              <ArrowForwardIcon sx={{ fontSize: 20, fontWeight: "light" }} />
            </Button>
          </Link>
        </section>

        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
          <Image
            src="/undraw_team_work_k-80-m (1).svg"
            alt="team work"
            priority
            layout="responsive"
            height={500}
            width={500}
          />
        </div>
      </section>

      {/* Future Sections (Commented) */}
      {/* <LatestJobsSection>
        <JobsHomePageSection />
      </LatestJobsSection> */}
    </main>
  );
}
