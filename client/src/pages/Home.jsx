import Typewriter from "typewriter-effect";
import Footer from "../components/shared/Footer";
import { useParallax } from "react-scroll-parallax";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Home = () => {
  const { ref } = useParallax({
    easing: "easeOutQuad",
    translateX: [200, -10],
  });
  const { ref: ref2 } = useParallax({
    easing: "easeOutQuad",
    translateX: [200, -10],
  });
  const { ref: ref3 } = useParallax({
    easing: "easeOutQuad",
    translateX: [30, -10],
  });

  const { ref: left1 } = useParallax({
    easing: "easeOutQuad",
    translateX: [-100, 60],
  });

  const { ref: left2 } = useParallax({
    easing: "easeOutQuad",
    translateX: [-70, 60],
  });

  const { ref: left3 } = useParallax({
    easing: "easeOutQuad",
    translateX: [-10, 40],
  });

  return (
    <section>
      <Fade cascade>
        <div className="mt-10 grid grid-cols-12 grid-rows-1 gap-4">
          <div className="col-span-3 hidden md:block">
            <img
              ref={ref}
              src="./jayesh.png"
              className="w-44  cursor-pointer rounded-[24px] border"
              alt=""
            />
            <img
              ref={ref2}
              src="./testione.png"
              className="mt-10  w-44 cursor-pointer rounded-[24px] border"
              alt=""
            />
            <img
              ref={ref3}
              src="./zita.png"
              className="mt-10 w-44 cursor-pointer rounded-[24px] border"
              alt=""
            />
          </div>

          <div className="col-span-12  md:col-span-6  lg:col-span-6 lg:col-start-4">
            <div className="mx-auto flex h-full flex-col items-center justify-center px-3 py-8 md:py-20">
              <h1 className="text-bold my-4 text-center text-2xl font-bold md:w-full md:text-4xl lg:text-5xl">
                Connecting People{" "}
                <Typewriter
                  options={{
                    strings: ["Who Need Assistance With Those Offering Help."],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p className="my-4  text-center text-lg md:text-xl lg:text-2xl">
                WorkConnect Is An Innovative Online Platform Designed To
                Facilitate Local Collaboration By Connecting Users Who Need
                Assistance With Their Day-To-Day Tasks.
              </p>
              <Link
                to="/login"
                type="button"
                className="my-6 rounded-full bg-[#FFDD00] p-3 px-5 text-center text-lg font-bold text-black md:p-4 md:px-6 md:text-xl"
              >
                Join Now
              </Link>
            </div>
          </div>

          <div className="col-span-3 col-start-10 hidden md:block">
            <img
              ref={left1}
              src="./math.png"
              className="w-44  cursor-pointer rounded-[24px] border"
              alt=""
            />

            <img
              ref={left2}
              src="./divya.png"
              className="mt-10 w-44  cursor-pointer rounded-[24px] border"
              alt=""
            />

            <img
              ref={left3}
              src="./vihaan.png"
              className="ml-16 mt-10 w-40 cursor-pointer rounded-[24px] border"
              alt=""
            />
          </div>
        </div>
      </Fade>

      <Fade className="mx-5 my-10 flex flex-col items-center justify-center rounded-lg bg-white p-8 md:p-12">
        <div className="">
          <h1 className="text-bold my-4  text-center text-2xl font-bold md:w-3/4 md:text-4xl lg:w-full lg:text-5xl">
            Find your suitable person.
          </h1>
          <p className="mb-6 text-center text-lg md:mb-10 md:text-xl lg:text-2xl">
            Get all the local works/tasks listings available near your locality
            in just simple clicks.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="w-full transform rounded-lg px-4 py-6 transition duration-500 hover:scale-110 md:w-auto">
              <div className="card glass bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="https://media.istockphoto.com/id/1449552590/photo/portrait-of-indian-woman-enjoying-while-cooking-meal-in-the-kitchen-stock-photo.jpg?s=612x612&w=0&k=20&c=sSSFGWffGnjDJEX_VCA3YQ5B3T1jQ_0kCbPTL0BItlg="
                    alt="Cook"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center">Find Cook</h2>
                </div>
              </div>
            </div>
            <div className="w-full transform rounded-lg px-4 py-6 transition duration-500 hover:scale-110 md:w-auto">
              <div className="card glass bg-base-100 shadow-xl">
                <figure>
                  <img src="./car_washer.jpg" alt="Car Washer" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center">Find Car Washer</h2>
                </div>
              </div>
            </div>
            <div className="w-full transform rounded-lg px-4 py-6 transition duration-500 hover:scale-110 md:w-auto">
              <div className="card glass bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="https://qph.cf2.quoracdn.net/main-qimg-56fad305fc7134be522d1c4e73521f09"
                    alt="Dog Trainer"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center">Find Dog Trainer</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>

      <Fade className="mx-4 my-4 flex flex-col items-center justify-center rounded-lg bg-white p-8 md:mx-20 md:my-10 md:p-12">
        <div>
          <h1 className="text-bold my-2 text-center text-3xl font-bold md:w-3/4 md:text-4xl lg:w-full lg:text-5xl">
            Access Everything Within Your Dashboard.
          </h1>
          <p className="mb-6 text-center text-lg md:text-xl lg:text-2xl">
            Simple Minimal Dashboard
          </p>
          <div className="mx-auto max-w-screen-md">
            <img
              className="mx-auto rounded-lg border-4 p-4 md:p-10"
              src="./workconnect_dashboard.png"
              alt=""
            />
          </div>
        </div>
      </Fade>

      <Fade>
        <Footer />
      </Fade>
    </section>
  );
};

export default Home;
