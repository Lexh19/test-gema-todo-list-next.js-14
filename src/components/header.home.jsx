import Image from "next/image";
import { useRouter } from "next/router";

const HeaderHome = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-5 md:px-10">
      <div className="content flex flex-col items-start justify-center pt-10 md:pt-20">
        <p className="text-4xl md:text-6xl mb-5 font-semibold text-center md:text-left">
          Catat Setiap Langkahmu dengan To do lits!
        </p>
        <button
          className="btn bg-blue-700 text-white py-2 px-4 md:px-5 rounded-xl text-xl md:text-2xl font-semibold hover:bg-blue-500"
          onClick={() => router.push("/auth/register")}
        >
          Mulai Mencatat!
        </button>
      </div>
      <div className="flex justify-center md:justify-end items-center mt-10 md:mt-0">
        <Image
          className="rounded-xl"
          src={"/todos.png"}
          alt="Logo_todos"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default HeaderHome;
