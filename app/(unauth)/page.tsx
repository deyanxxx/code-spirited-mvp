const App = async () => {
  return (
    <section className="py-24 lg:py-32 bg-jaffa-100 bg-center bg-cover">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="border border-jaffa-500 p-1 max-w-64 mx-auto rounded-full flex items-center justify-between mb-4">
          <span className="font-inter text-xs font-medium text-gray-900 ml-3">
            Master Coding for Your Success
          </span>
          <a
            href="/"
            className="w-8 h-8 rounded-full flex justify-center items-center bg-jaffa-500"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-700 mb-5 md:text-5xl leading-[50px]">
          Empowering Future
          <span className="text-jaffa-500"> Innovators!</span>
        </h1>
        <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
          At Code Spirited, we believe that the best way to learn is by doing
          and collaborating.
        </p>
        <a
          href="/p2p-coding-bootcamp"
          className="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bg-jaffa-500 shadow-xs hover:bg-jaffa-600 transition-all duration-500"
        >
          Join a Bootcamp
          <svg
            className="ml-2"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <h2 className="mt-12 font-manrope font-bold text-2xl text-gray-700 md:text-3xl">C.O.D.E Spirited Mantra</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-jaffa-500 p-6 rounded-lg bg-white">
            <h3 className="font-manrope font-semibold text-xl text-gray-700 mb-3">Collaborate</h3>
            <p className="text-gray-500">Work together with creativity to achieve your goals.</p>
          </div>
          <div className="border border-jaffa-500 p-6 rounded-lg bg-white">
            <h3 className="font-manrope font-semibold text-xl text-gray-700 mb-3">Overcome</h3>
            <p className="text-gray-500">Tackle challenges head-on with courage and determination.</p>
          </div>
          <div className="border border-jaffa-500 p-6 rounded-lg bg-white">
            <h3 className="font-manrope font-semibold text-xl text-gray-700 mb-3">Dedicate</h3>
            <p className="text-gray-500">Commit yourself with passion and determination to your projects.</p>
          </div>
          <div className="border border-jaffa-500 p-6 rounded-lg bg-white">
            <h3 className="font-manrope font-semibold text-xl text-gray-700 mb-3">Evolve</h3>
            <p className="text-gray-500">Strive for continuous improvement and excellence in everything you do.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
