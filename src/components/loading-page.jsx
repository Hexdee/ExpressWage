/* eslint-disable react/prop-types */
const PageLoader = ({ loaderText }) => {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-white">
        <div className="flex flex-col gap-[5px] items-center">
          <div>
             <img src="/loading.gif" alt="loading" className="w-[150px] h-[150px]" />
          </div>
          <span className="font-bold text-[22px] text-white">
            {loaderText || "Loading page..."}
          </span>
        </div>
      </div>
    );
  };

  export default PageLoader;