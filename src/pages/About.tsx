import FooterDesktop from "../components/Footer/DesktopFooter";
import { Link } from "react-router-dom";
import { FC } from "react";
import { motion } from "framer-motion";
import { AnimationObject } from "../Types/Types";
import CountUp from "react-countup";
const About: FC = () => {
  const fadeInAnimation: AnimationObject = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <main className="m-8 flex flex-col items-center md:flex-row md:items-start">
        <div className="w-full md:w-1/2">
          <motion.h2
            variants={fadeInAnimation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="text-purple my-8 text-center md:text-start"
          >
            Why Choose Phone Paradise?
          </motion.h2>
          <motion.p
            variants={fadeInAnimation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Phone Paradise is where your dreams of the perfect phone come to
            life. For years, our company has been delivering the best
            telecommunications solutions, making us an industry leader. Here's
            why you should choose our store:
          </motion.p>
          <motion.ul
            variants={fadeInAnimation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 1.2 }}
            className="list-none mt-8"
          >
            <li className="my-6">
              <i className="fa fa-check-circle first-line mr-4"></i>
              Wide selection of the latest phone models from top manufacturers.
            </li>
            <li className="my-6">
              <i className="fa fa-check-circle mr-4"></i>
              Guaranteed quality and authenticity of every product – we never
              compromise on quality.
            </li>
            <li className="my-6">
              <i className="fa fa-check-circle mr-4"></i>
              Express delivery so you can enjoy your new phone quickly and
              without delays.
            </li>
            <li className="my-6">
              <i className="fa fa-check-circle mr-4"></i>
              Our{" "}
              <Link
                to="/contact"
                aria-label="Contact with us"
                className="text-blue-500"
              >
                customer support
              </Link>{" "}
              is available 24/7 – you can always count on us.
            </li>
            <li className="my-6">
              <i className="fa fa-check-circle mr-4"></i>
              We care for every customer, providing comprehensive support and
              satisfaction.
            </li>
          </motion.ul>
        </div>
        <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-center items-center md:ml-16 mt-12 mb-20 md:h-[60vh] gap-16 flex-wrap">
          <div className="relative w-48 h-48 border border-black rounded flex flex-col justify-center items-center p-4">
            <div className="absolute inset-0"></div>
            <CountUp end={24.5} suffix=" K" decimals={1} />
            <p className="text-center mt-12">satisfied customers</p>
          </div>
          <div className="relative w-48 h-48 border border-black rounded flex flex-col justify-center items-center p-4">
            <div className="absolute inset-0"></div>
            <CountUp end={185} suffix=" K" />
            <p className="text-center mt-12">products buyed</p>
          </div>
          <div className="relative w-48 h-48 border border-black rounded flex flex-col justify-center items-center p-4">
            <div className="absolute inset-0"></div>
            <CountUp end={2.5} suffix=" M" decimals={1} />
            <p className="text-center mt-12">page visited</p>
          </div>
        </div>
      </main>
      <FooterDesktop />
    </>
  );
};

export default About;
