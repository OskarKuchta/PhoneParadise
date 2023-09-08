import Footertext from "../components/Footertext";
import icon from "../assets/logo.png";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <section className="about">
        <div className="about-left">
          <h2>Why Choose Phone Paradise?</h2>
          <p>
            Phone Paradise is where your dreams of the perfect phone come to
            life. For years, our company has been delivering the best
            telecommunications solutions, making us an industry leader. Here's
            why you should choose our store:
          </p>
          <ul className="about-list">
            <li>
              <i className="fa fa-check-circle"></i>
              Wide selection of the latest phone models from top manufacturers.
            </li>
            <li>
              <i className="fa fa-check-circle"></i>
              Guaranteed quality and authenticity of every product – we never
              compromise on quality.
            </li>
            <li>
              <i className="fa fa-check-circle"></i>
              Express delivery so you can enjoy your new phone quickly and
              without delays.
            </li>
            <li>
              <i className="fa fa-check-circle"></i>
              Our{" "}
              <Link to="/contact" className="about-link">
                customer support
              </Link>{" "}
              is available 24/7 – you can always count on us.
            </li>
            <li>
              <i className="fa fa-check-circle"></i>
              We care for every customer, providing comprehensive support and
              satisfaction.
            </li>
          </ul>
        </div>
        <div className="about-right">
          <img src={icon} />
          <h2 className="about-right-text">Phone Paradise</h2>
        </div>
      </section>
      <Footertext />
    </>
  );
};

export default About;
