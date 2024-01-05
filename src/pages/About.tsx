import FooterDesktop from "../components/Footer/DesktopFooter";
import { Link, Location, useLocation } from "react-router-dom";
import { FC, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimationObject, UseInViewWithRefReturnType } from "../Types/Types";
import CountUp from "react-countup";
import { CartIcon, EyeIcon, Smileicon } from "../assets/icons";
import { usePhoneContext } from "../context/PhoneProvider";
const About: FC = () => {
  const location: Location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/about")) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  const useInViewWithRef: () => UseInViewWithRefReturnType = () => {
    const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
    const inView: boolean = useInView(ref, {
      once: true,
      margin: `0px 0px -100px 0px`,
    });
    return { ref, inView };
  };
  const { ref: smileDivRef, inView: smileInView } = useInViewWithRef();
  const { ref: cartDivRef, inView: cartInView } = useInViewWithRef();
  const { ref: eyeDivRef, inView: eyeInView } = useInViewWithRef();

  const isPhone = usePhoneContext();
  const fadeLeftAnimation: AnimationObject = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const fadeUpAnimation: AnimationObject = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <main className="m-8 flex flex-col items-center md:flex-row md:items-start">
        <div className="w-full md:w-1/2">
          <motion.h2
            variants={fadeLeftAnimation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
            className="text-purple my-8 text-center md:text-start"
          >
            Why Choose Phone Paradise?
          </motion.h2>
          <motion.p
            variants={fadeLeftAnimation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            Phone Paradise is where your dreams of the perfect phone come to
            life. For years, our company has been delivering the best
            telecommunications solutions, making us an industry leader. Here's
            why you should choose our store:
          </motion.p>
          <motion.ul
            variants={fadeLeftAnimation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 2 }}
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
        <div className="w-full md:w-1/2 flex flex-row justify-center items-center md:ml-16 mt-12 mb-32 md:h-[60vh] gap-4 flex-wrap text-purple">
          <motion.div
            className="relative w-48 h-48 border-2 border-purple  rounded flex flex-col items-center p-6"
            ref={smileDivRef}
            variants={!isPhone.isPhone ? fadeUpAnimation : fadeLeftAnimation}
            initial="hidden"
            animate={smileInView ? "visible" : "hidden"}
            transition={{
              duration: 0.7,
              delay: !isPhone.isPhone ? 2.5 : 0.5,
            }}
          >
            <div className="absolute bottom-0 w-full h-4 bg-purple"></div>
            <Smileicon />
            {smileInView && (
              <CountUp
                end={24.5}
                suffix=" K"
                decimals={1}
                className="mt-4"
                delay={!isPhone.isPhone ? 2.5 : 1}
              />
            )}
            <p className="text-center">satisfied customers</p>
          </motion.div>
          <motion.div
            className="relative w-48 h-48 border-2 border-purple rounded flex flex-col items-center p-6"
            ref={cartDivRef}
            variants={!isPhone.isPhone ? fadeUpAnimation : fadeLeftAnimation}
            initial="hidden"
            animate={cartInView ? "visible" : "hidden"}
            transition={{
              duration: 0.7,
              delay: !isPhone.isPhone ? 3 : 1,
            }}
          >
            <div className="absolute bottom-0 w-full h-4 bg-purple"></div>
            <CartIcon color="rgb(46, 3, 87)" width={48} height={48} />
            {cartInView && (
              <CountUp
                end={185}
                suffix=" K"
                className="mt-4"
                delay={!isPhone.isPhone ? 3 : 1}
              />
            )}
            <p className="text-center">orders realized</p>
          </motion.div>
          <motion.div
            className="relative w-48 h-48 border-2 border-purple rounded flex flex-col items-center p-6"
            ref={eyeDivRef}
            variants={!isPhone.isPhone ? fadeUpAnimation : fadeLeftAnimation}
            initial="hidden"
            animate={eyeInView ? "visible" : "hidden"}
            transition={{
              duration: 0.7,
              delay: !isPhone.isPhone ? 3.5 : 1.5,
            }}
          >
            <div className="absolute bottom-0 w-full h-4 bg-purple"></div>
            <EyeIcon />
            {eyeInView && (
              <CountUp
                end={2.5}
                suffix=" M"
                decimals={1}
                className="mt-4"
                delay={!isPhone.isPhone ? 3.5 : 2}
              />
            )}
            <p className="text-center">times page visited</p>
          </motion.div>
        </div>
      </main>
      <FooterDesktop />
    </>
  );
};

export default About;
