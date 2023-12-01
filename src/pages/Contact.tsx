import { FacebookIcon, MailIcon, PhoneContact } from "../assets/icons";
import DesktopFooter from "../components/Footer/DesktopFooter";
import { Link } from "react-router-dom";

const Contact = () => {
  const emailAddress: string = "oskarkuchta5@gmail.com";
  const subject: string = "Ocena i uwagi na temat projektu";
  return (
    <section className="flex flex-col items-center my-[5vh]">
      <h2 className="mb-12 text-3xl">Contact us:</h2>
      <aside className="contact-options w-4/5 flex justify-between flex-col md:flex-row">
        <div className="flex flex-col w-full items-center my-8">
          <Link
            to="tel:+48123456789"
            className="outline-none focus:outline-none transition-all duration-200  hover:text-contactHover focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
          >
            <PhoneContact />
          </Link>
          <h4 className="mt-6 leading-7 text-center md:mx-4 text-xl">
            You can contact with our consultants at number {""}
            <Link
              to="tel:+48123456789"
              className="outline-none focus:outline-none transition-all duration-200  hover:text-contactHover  focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
            >
              +48 123 456 789
            </Link>
            .
          </h4>
        </div>
        <div className="flex flex-col w-full items-center my-8">
          <Link
            to={`mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`}
            className="outline-none focus:outline-none transition-all duration-200 hover:text-contactHover  focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
          >
            <MailIcon />
          </Link>
          <h4 className="mt-6 leading-7 text-center md:mx-4 text-xl">
            Another way to contact us is email adress. Mail:{" "}
            <Link
              to={`mailto:${emailAddress}?subject=${encodeURIComponent(
                subject
              )}`}
              className="outline-none focus:outline-none transition-all duration-200 hover:text-contactHover focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
            >
              oskarkuchta5@gmail.com
            </Link>
          </h4>
        </div>
        <div className="flex flex-col w-full items-center my-8">
          <Link
            target="blank"
            to="https://www.facebook.com/oskar.kuchta.39/"
            className="outline-none focus:outline-none transition-all duration-200  hover:text-contactHover  focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
          >
            <FacebookIcon />
          </Link>
          <h4 className="mt-6 leading-7 text-center md:mx-4 text-xl">
            When you have loose questions about project or someone else{" "}
            <Link
              target="blank"
              to="https://www.facebook.com/oskar.kuchta.39/"
              className="outline-none focus:outline-none transition-all duration-200 hover:text-contactHover focus:text-contactHover hover:fill-contactHover focus:fill-contactHover"
            >
              click here
            </Link>
          </h4>
        </div>
      </aside>
      <DesktopFooter />
    </section>
  );
};

export default Contact;
