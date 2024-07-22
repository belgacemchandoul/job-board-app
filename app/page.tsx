import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex items-center min-h-screen w-full justify-between absolute top-0 left-0 z-0">
      <section className="flex flex-col gap-4">
        <p className="text-[#003366] text-3xl font-bold">
          Find Your Dream Job Today!
        </p>
        <p>Explore multiple job opportunities across various industries.</p>
        <button className="bg-[#66CCFF] text-white py-2 px-4 rounded w-fit ">
          Explore jobs
        </button>
      </section>
      <Image src="/work2.svg" width={600} alt="team work" height={600} />
    </div>
  );
}
