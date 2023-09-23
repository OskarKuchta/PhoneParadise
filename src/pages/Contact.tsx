import { FacebookIcon, MailIcon, PhoneContact } from "../assets/icons";
import Footertext from "../components/Footer/Footertext";
import { Link } from "react-router-dom";

const Contact = () => {
  const emailAddress = "oskarkuchta5@gmail.com";
  const subject = "Ocena i uwagi na temat projektu";
  return (
    <section className="contact">
      <h2>Contact us via:</h2>
      <aside className="contact-options">
        <div className="contact-phone">
          <Link to="tel:+48123456789">
            <PhoneContact />
          </Link>
          <h4>
            You can contact with our consultants at number {""}
            <Link to="tel:+48123456789">+48 123 456 789</Link>.
          </h4>
        </div>
        <div className="contact-mail">
          <Link
            to={`mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`}
          >
            <MailIcon />
          </Link>
          <h4>
            Another way to contact us is email adress. Mail:{" "}
            <Link
              to={`mailto:${emailAddress}?subject=${encodeURIComponent(
                subject
              )}`}
            >
              oskarkuchta5@gmail.com
            </Link>
          </h4>
        </div>
        <div className="contact-facebook">
          <Link to="https://www.facebook.com/oskar.kuchta.39/">
            <FacebookIcon />
          </Link>
          <h4>
            When you have loose questions about project or someone else {" "}
            <Link to="https://www.facebook.com/oskar.kuchta.39/">
              click here
            </Link>
          </h4>
        </div>
      </aside>
      <Footertext />
    </section>
  );
};

export default Contact;
