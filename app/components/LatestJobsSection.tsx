"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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
    <motion.div className="mt-16 flex items-center flex-col gap-10 mb-44 ">
      <motion.p
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="font-bold text-5xl text-[#003366] border-b-4 pb-2 border-[#003366]"
      >
        Latest Jobs
      </motion.p>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default LatestJobsSection;
