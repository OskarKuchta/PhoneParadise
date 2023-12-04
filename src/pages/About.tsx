import FooterDesktop from "../components/Footer/DesktopFooter";
import { Link } from "react-router-dom";
import { FC } from "react";

const About: FC = () => {
  return (
    <>
      <main className="m-8 flex flex-col  items-center md:flex-row md:items-start">
        <div className="w-full md:w-1/2">
          <h2 className="text-purple my-8 text-center md:text-start">
            Why Choose Phone Paradise?
          </h2>
          <p>
            Phone Paradise is where your dreams of the perfect phone come to
            life. For years, our company has been delivering the best
            telecommunications solutions, making us an industry leader. Here's
            why you should choose our store:
          </p>
          <ul className="list-none mt-8">
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
                className="text-[rgb(4, 4, 250)]"
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
          </ul>
        </div>
      </main>
      <FooterDesktop />
    </>
  );
};

export default About;
