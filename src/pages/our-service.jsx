import LayoutFirst from "@/components/layouts/layout.first";
import Head from "next/head";

const OurServicePage = () => {
  return (
    <>
    <Head>
        <title>Tentang kami | TodosNow</title>
    </Head>
      <LayoutFirst>
        <div className="flex justify-center">
          <p className="text-4xl font-bold">Layanan Kami</p>
        </div>
        <div className="flex justify-center w-full mt-8">
          <div className="flex-row w-full">
            <div className="flex card ml-auto mr-auto gap-3">
              <p className="text-2xl text-black font-bold">1.</p>
              <p className="text-xl">Catat Hal yang Ingin Dilakukan dengan Lebih Mudah!</p>
            </div>
            <div className="flex card ml-auto mr-auto gap-3">
              <p className="text-2xl text-black font-bold">2.</p>
              <p className="text-xl">Sederhana, Hanya Catat Hal yang Anda Inginkan.</p>
            </div>
            <div className="flex card ml-auto mr-auto gap-3">
              <p className="text-2xl text-black font-bold">3.</p>
              <p className="text-xl">Efisien, Mencatat To-Do Tanpa Ribet.</p>
            </div>
          </div>
        </div>
      </LayoutFirst>
    </>
  );
};

export default OurServicePage;
