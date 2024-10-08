import Image from "next/image";

const HeaderHome = () => {
  return (
    <>
        <div className="grid grid-cols-2 px-10">
            <div className="content flex-row items-center pt-20">
                <p className="text-6xl mb-5 font-semibold">Catat Setiap Langkahmu dengan TodosNow!</p>
                <button className="btn bg-blue-700 text-white py-2 px-5 rounded-xl text-2xl font-semibold hover:bg-blue-500">Mulai Mencatat!</button>
            </div>
            <div className="flex justify-end items-center">
                <Image className="rounded-xl" src={'/todos.png'} alt="Logo_todos" width={400} height={100} />
            </div>
        </div>
    </>
  );
};

export default HeaderHome;
