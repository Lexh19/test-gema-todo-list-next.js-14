import Navbar from "../navbar";

const LayoutFirst = ({ children }) => {
  return (
    <>
      <div className="w-full fixed top-0">
        <Navbar />
      </div>
      <div className="w-full h-screen pt-28 md:pt-32 px-5 md:px-10">{children}</div>
    </>
  );
};

export default LayoutFirst;
