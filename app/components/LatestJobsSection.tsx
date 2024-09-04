"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Button from "./Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

interface LatestJobsSectionProps {
  children: React.ReactNode;
}

const LatestJobsSection: React.FC<LatestJobsSectionProps> = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75 },
    },
  };

  return (
    <section className="relative bg-white py-16 px-4 overflow-hidden min-h-screen">
      {/* Decorative Shapes */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-100 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-blue-200 rounded-full opacity-40"></div>
      <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-blue-300 rounded-full opacity-60"></div>

      <motion.div
        className="relative flex flex-col items-center gap-10 z-10"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <motion.p className="text-4xl font-bold text-[#003366] border-b-4 border-[#003366] pb-2 mb-6">
          Latest Jobs
        </motion.p>
        <motion.div className="flex flex-col gap-10 items-center">
          {children}
          <Link href="/jobs">
            <Button text="Explore Jobs">
              <ArrowForwardIcon sx={{ fontSize: 20, fontWeight: "light" }} />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LatestJobsSection;
