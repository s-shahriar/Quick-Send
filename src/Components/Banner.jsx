import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-primary">
      <header className="dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
        <div className="lg:flex">
          <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-white lg:text-4xl">
                Discover{" "}
                <span className="text-teal-200 dark:text-teal-400">
                  Endless Wisdom
                </span>{" "}
                in Every Page
              </h2>
              <p className="mt-4 text-sm text-gray-200 dark:text-gray-400 lg:text-base">
                Explore our vast collection of books and unlock new realms of
                knowledge. From timeless classics to contemporary masterpieces,
                each page holds the promise of discovery, offering endless
                opportunities to expand your horizons and enrich your mind.
                Start your adventure today and unlock the doors to a world of
                endless possibilities.
              </p>
              <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <Link
                  to={"/all-books"}
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-teal-500 dark:bg-teal-500 rounded-md hover:bg-teal-600 dark:hover:bg-teal-600"
                >
                  Start Exploring
                </Link>
                <Link
                  to={"/login"}
                  className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-800 dark:text-white transition-colors duration-300 transform bg-white dark:bg-gray-700 rounded-md lg:mx-4 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Banner;
