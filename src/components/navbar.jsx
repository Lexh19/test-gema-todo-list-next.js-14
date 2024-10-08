import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="container my-3 flex justify-center">
      <div className="box-nav flex flex-col md:flex-row items-center gap-3 py-3 px-5 rounded-xl w-full">
        <p className="text-white text-2xl font-bold">To do lits</p>
        
        <div className="flex gap-5 mt-2 md:mt-1 md:ml-16">
          <p
            className="text-navbar font-medium"
            onClick={() => router.push("/")}
          >
            Beranda
          </p>
          <p className="text-navbar font-medium" onClick={() => router.push("/our-service")}>
            Layanan Kami
          </p>
          <p className="text-navbar font-medium" onClick={() => router.push("/about-us")}>
            Tentang Kami
          </p>
        </div>

        <div className="flex md:ml-auto gap-2 mt-2 md:mt-0">
          <button
            className="btn-lg-blue"
            onClick={() => router.push("/auth/register")}
          >
            Register
          </button>
          <p className="font-medium text-2xl text-white hidden md:block">|</p>
          <button
            className="btn-green"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
