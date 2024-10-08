import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="container my-3 flex justify-center">
      <div className="box-nav flex items-center gap-3 py-3 px-5 rounded-xl">
        <p className="text-white text-2xl font-bold">TodosNow</p>
        <div className="flex gap-5 mt-1 ml-16">
          <p
            className="text-navbar font-medium"
            onClick={() => router.push("/")}
          >
            Beranda
          </p>
          <p className="text-navbar font-medium" onClick={() => router.push('/our-service')}>Layanan Kami</p>
          <p className="text-navbar font-medium" onClick={() => router.push('/about-us')}>Tentang Kami</p>
        </div>
        <div className="flex ml-auto gap-2">
          <button className="btn-lg-blue" onClick={() => router.push('/auth/register')}>Register</button>
          <p className="font-medium text-2xl" style={{ color: "aliceblue" }}>
            |
          </p>
          <button className="btn-green" onClick={() => router.push('/auth/login')}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
