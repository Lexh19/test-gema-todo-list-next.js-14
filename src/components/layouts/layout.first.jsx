import Navbar from "../navbar";

const LayoutFirst = ({ children }) => {
  return (
    <>
      <div className="w-full fixed">
          <Navbar />
      </div>
      <div className="w-full h-screen pt-32 px-10">{children}</div>
    </>
  );
};

export default LayoutFirst;
