import { register } from "@/modules/fetch/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";

const RegisterPage = () => {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(name, email, password)
            window.alert(response.message)
            router.push('/auth/login')
        } catch (err) {
            window.alert(err.message)
        }
    }

  return (
    <>
    <Head>
      <title>Register | TodosNow</title>
    </Head>
      <div className="w-full h-screen">
        <div className="absolute mt-5 ml-5">
          <p className="text-back" onClick={() => router.push("/")}>
            Kembali
          </p>
        </div>
        <div className="flex justify-center items-center w-full h-screen">
          <div className="card-register bg-gray-300 rounded-xl shadow-sm shadow-slate-400 px-3 py-10">
            <form onSubmit={handleSubmit}>
              <p className="text-center text-4xl font-bold">Register</p>
              <div className="grid grid-cols-2 px-5 mt-5 gap-5">
                <div className="flex-row">
                  <p className="text-jdl">Nama</p>
                  <input
                    className="w-full h-10 rounded-lg placeholder-gray-500 pl-3"
                    type="text"
                    placeholder="Masukkan email anda..."
                    onChange={(e) => {
                      const name = e.target.value;
                      setName(name);
                    }}
                    required
                  />
                </div>
                <div className="flex-row">
                  <p className="text-jdl">Email</p>
                  <input
                    className="w-full h-10 rounded-lg placeholder-gray-500 pl-3"
                    type="text"
                    placeholder="Masukkan email anda..."
                    onChange={(e) => {
                      const email = e.target.value;
                      setEmail(email)
                    }}
                    required
                  />
                </div>
              </div>
              <div className="w-full flex-row px-5 mt-5">
                <p className="text-jdl">Password</p>
                <input
                  className="w-full h-10 rounded-lg placeholder-gray-500 pl-3"
                  type="password"
                  placeholder="Masukkan password anda..."
                  onChange={(e) => {
                    const password = e.target.value;
                    setPassword(password)
                  }}
                  required
                />
              </div>
              <div className="flex flex-col justify-center items-center mt-10">
                <button className="btn text-3xl font-bold text-white bg-green-600 rounded-lg py-3 px-28 hover:bg-green-500">
                  Register
                </button>
                <p className="mt-2 text-lg">
                  Sudah punya akun?{" "}
                  <u
                    className="font-bold text-blue-700 cursor-pointer"
                    onClick={() => router.push("/auth/login")}
                  >
                    Register
                  </u>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
