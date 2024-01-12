import { FacebookIcon, MailIcon, PhoneContact } from "../assets/icons";
import DesktopFooter from "../components/Footer/DesktopFooter";
import { Link, Location, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MutableRefObject, useEffect, useRef } from "react";
import { AnimationObject } from "../Types/Types";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const location: Location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/contact")) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  const { t } = useTranslation();
  const createAnimationObject = (y: number): AnimationObject => {
    return {
      hidden: { opacity: 0, y: y },
      visible: { opacity: 1, y: 0 },
    };
  };
  const ref: MutableRefObject<any> = useRef(null);
  const fadeInAnimation = createAnimationObject(-40);
  const emailAddress: string = "oskarkuchta5@gmail.com";
  const subject: { emailTopic: string } = { emailTopic: t("email-topic") };
  return (
    <section ref={ref} className="flex flex-col items-center my-[5vh]">
      <h2 className="mb-12 text-3xl">{t("contact-us")}</h2>
      <aside className="w-4/5 flex justify-between flex-col md:flex-row">
        <motion.div
          variants={fadeInAnimation}
          initial="hidden"
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, delay: 1 },
          }}
          className="flex flex-col w-full items-center my-8"
        >
          <Link
            to="tel:+48123456789"
            className="outline-none focus:outline-none transition-all duration-200  hover:text-contactHover focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
          >
            <PhoneContact />
          </Link>
          <h4 className="mt-6 leading-7 text-center md:mx-4 text-xl">
            {t("phone-contact")}{" "}
            <Link
              to="tel:+48123456789"
              className="outline-none focus:outline-none transition-all duration-200  hover:text-contactHover  focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
            >
              +48 123 456 789
            </Link>
            .
          </h4>
        </motion.div>
        <motion.div
          variants={fadeInAnimation}
          initial="hidden"
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, delay: 2 },
          }}
          className="flex flex-col w-full items-center my-8"
        >
          <Link
            to={`mailto:${emailAddress}?subject=${encodeURIComponent(
              subject.emailTopic
            )}`}
            className="outline-none focus:outline-none transition-all duration-200 hover:text-contactHover  focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
          >
            <MailIcon />
          </Link>
          <h4 className="mt-6 leading-7 text-center md:mx-4 text-xl">
            {t("mail-contact")}{" "}
            <Link
              to={`mailto:${emailAddress}?subject=${encodeURIComponent(
                subject.emailTopic
              )}`}
              className="outline-none focus:outline-none transition-all duration-200 hover:text-contactHover focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
            >
              oskarkuchta5@gmail.com
            </Link>
          </h4>
        </motion.div>
        <motion.div
          variants={fadeInAnimation}
          initial="hidden"
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, delay: 3 },
          }}
          className="flex flex-col w-full items-center my-8"
        >
          <Link
            target="blank"
            to="https://www.facebook.com/oskar.kuchta.39/"
            className="outline-none focus:outline-none transition-all duration-200  hover:text-contactHover  focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
          >
            <FacebookIcon />
          </Link>
          <h4 className="mt-6 leading-7 text-center md:mx-4 text-xl">
            {t("fb-contact")}{" "}
            <Link
              target="blank"
              to="https://www.facebook.com/oskar.kuchta.39/"
              className="outline-none focus:outline-none transition-all duration-200 hover:text-contactHover focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
            >
              {t("click-here")}
            </Link>
          </h4>
        </motion.div>
      </aside>
      <DesktopFooter />
    </section>
  );
};

export default Contact;
