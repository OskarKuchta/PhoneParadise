import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store";
import { FC, useState } from "react";

export const CartIcon = ({ color = "white", width = 25, height = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
    </svg>
  );
};
export const CartCount: FC = () => {
  const { amount } = useSelector((state: RootState) => state.cart);
  return (
    <svg
      className="absolute top-[0.3rem] right-[1.3rem] md:top-[0.7rem] md:right-[0.7rem] xl:top-[1rem] xl:right-[0.8rem]"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 50 50"
    >
      <circle
        className="count-circle"
        cx="25"
        cy="25"
        r="20"
        fill="transparent"
        stroke="white"
        strokeWidth="2"
      />

      <text x="50%" y="65%" textAnchor="middle" fontSize="24" fill="white">
        {amount}
      </text>
    </svg>
  );
};
export const HomeIcon: FC = () => {
  return (
    <svg
      className="home-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
    </svg>
  );
};
export const ContactIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
    </svg>
  );
};
export const LoginIcon: FC = () => {
  const iconStyle: React.CSSProperties = {
    stroke: "none",
    strokeWidth: 0,
    strokeDasharray: "none",
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
    strokeMiterlimit: 10,
    fill: "none",
    fillRule: "nonzero",
    opacity: 1,
  };

  return (
    <svg
      version="1.1"
      width="26"
      height="26"
      viewBox="0 0 256 256"
      fill="white"
      stroke="white"
    >
      <defs></defs>
      <g
        style={iconStyle}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 45 53.718 c -10.022 0 -18.175 -8.153 -18.175 -18.175 S 34.978 17.368 45 17.368 c 10.021 0 18.175 8.153 18.175 18.175 S 55.021 53.718 45 53.718 z"
          style={{ ...iconStyle, fill: "white" }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 45 0 C 20.187 0 0 20.187 0 45 c 0 24.813 20.187 45 45 45 c 24.813 0 45 -20.187 45 -45 C 90 20.187 69.813 0 45 0 z M 74.821 70.096 c -3.543 -5.253 -8.457 -9.568 -14.159 -12.333 c -2.261 -1.096 -4.901 -1.08 -7.247 0.047 c -2.638 1.268 -5.47 1.91 -8.415 1.91 c -2.945 0 -5.776 -0.643 -8.415 -1.91 c -2.343 -1.125 -4.984 -1.143 -7.247 -0.047 c -5.702 2.765 -10.616 7.08 -14.16 12.333 C 9.457 63.308 6 54.552 6 45 C 6 23.495 23.495 6 45 6 s 39 17.495 39 39 C 84 54.552 80.543 63.308 74.821 70.096 z"
          style={{ ...iconStyle, fill: "white" }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
export const ChevronDown: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export const ChevronUp: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
};

export const InfoIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="26"
      height="26"
      viewBox="0 0 50 50"
      fill="white"
    >
      <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
    </svg>
  );
};
export const PhoneContact: FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 512 512">
      <path d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z" />
    </svg>
  );
};

export const MailIcon: FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 512 512">
      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
    </svg>
  );
};

export const FacebookIcon: FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="5em" viewBox="0 0 512 512">
      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
    </svg>
  );
};

export const Smileicon = () => {
  return (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g fill="rgb(46, 3, 87)">
        <path d="M8 12c-1.01 0-1.782-.504-2.267-.945a4.72 4.72 0 01-.564-.614 3.31 3.31 0 01-.212-.305.75.75 0 011.284-.775 3.214 3.214 0 00.5.584c.341.31.769.555 1.259.555.49 0 .918-.246 1.258-.555a3.214 3.214 0 00.5-.584.75.75 0 011.285.775l-.212.305c-.128.167-.317.39-.564.614C9.782 11.495 9.01 12 8 12zM5 6a1 1 0 011-1h.007a1 1 0 010 2H6a1 1 0 01-1-1zM10 5a1 1 0 100 2h.007a1 1 0 100-2H10z" />

        <path
          fillRule="evenodd"
          d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
};

export const EyeIcon = ({ size = 48 }: { size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
        stroke="rgb(46, 3, 87)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
        stroke="rgb(46, 3, 87)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CheckPassword = ({
  className,
  togglePassword,
}: {
  className: string;
  togglePassword: () => void;
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const changeVisibility = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div
      className={className}
      onClick={() => {
        changeVisibility();
        togglePassword();
      }}
    >
      {!isHidden ? (
        <EyeIcon size={24} />
      ) : (
        <i className="fas fa-eye-slash text-purple"></i>
      )}
    </div>
  );
};

export const PolandFlag = () => {
  return (
    <svg
      height="20px"
      width="20px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.999 511.999"
    >
      <path
        className="fill-[#ED1F34]"
        d="M135.205,211.667c-4.247,0-7.689-3.442-7.689-7.689h-15.38c0,4.247-3.443,7.689-7.689,7.689H50.619
	v138.415H496.62V211.667H135.205z"
      />
      <path
        className="fill-[#FFFFFF]"
        d="M135.205,196.287H496.62V57.873H50.619v138.414h53.828c4.246,0,7.689,3.443,7.689,7.689h15.38
	C127.515,199.73,130.958,196.287,135.205,196.287z"
      />
      <path
        d="M504.311,42.493H42.928c-4.246,0-7.689,3.443-7.689,7.689V357.77c0,4.247,3.443,7.689,7.689,7.689H504.31
	c4.247,0,7.689-3.443,7.689-7.689V50.183C512,45.936,508.557,42.493,504.311,42.493z M50.619,350.081V211.667h53.828
	c4.246,0,7.689-3.442,7.689-7.689s-3.443-7.689-7.689-7.689H50.619V57.873H496.62v138.414H135.205c-4.247,0-7.689,3.443-7.689,7.689
	c0,4.246,3.443,7.689,7.689,7.689H496.62v138.415L50.619,350.081L50.619,350.081z"
      />
      <path
        className="fill-[#2E3033]"
        d="M21.013,482.461c-6.442,0-11.685-5.242-11.685-11.685V41.115c0-6.383,5.194-11.577,11.577-11.577
	h1.527c6.444,0,11.685,5.242,11.685,11.685v429.552c0,6.444-5.242,11.685-11.685,11.685h-1.419V482.461z"
      />
      <path
        d="M22.432,20.21h-1.527C9.378,20.21,0,29.588,0,41.115v429.661c0,11.587,9.426,21.013,21.013,21.013h1.418
	c11.587,0,21.013-9.426,21.013-21.013V41.223C43.444,29.636,34.018,20.21,22.432,20.21z M27.898,470.776
	c0,3.014-2.452,5.466-5.466,5.466h-1.418c-3.014,0-5.466-2.452-5.466-5.466V41.115c0-2.955,2.403-5.358,5.358-5.358h1.527
	c3.014,0,5.466,2.452,5.466,5.466v429.554H27.898z"
      />
    </svg>
  );
};

export const UkFlag = () => {
  return (
    <svg
      height="20px"
      width="20px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.1 512.1"
    >
      <path
        className="fill-[#41479B]"
        d="M503.5,373.85h-468c-4.7,0-8.5-3.8-8.5-8.5V64.65c0-4.7,3.8-8.5,8.5-8.5h468.1c4.7,0,8.5,3.8,8.5,8.5
	v300.8C512,370.05,508.2,373.85,503.5,373.85z"
      />
      <path
        className="fill-[#F5F5F5]"
        d="M512,64.45c0-4.6-3.7-8.3-8.3-8.3h-37.4l-154.9,101.5V56.15h-83.6v101.5l-155-101.5H35.4
	c-4.6,0-8.3,3.7-8.3,8.3v21.6l132.9,87.1H27.1v83.6H160l-132.9,87.1v21.6c0,4.6,3.7,8.3,8.3,8.3h37.4l154.9-101.5v101.5h83.6v-101.3
	l154.9,101.5h37.4c4.6,0,8.3-3.7,8.3-8.3v-21.6L379,256.95h133v-83.6H379.1L512,86.15V64.45L512,64.45z"
      />
      <g>
        <polygon
          className="fill-[#FF4B55]"
          points="512,189.95 294.6,189.95 294.6,56.15 244.5,56.15 244.5,189.95 27.1,189.95 27.1,240.15 
		244.5,240.15 244.5,373.85 294.6,373.85 294.6,240.15 512,240.15 	"
        />
        <path
          className="fill-[#FF4B55]"
          d="M196.5,256.85L27.3,366.65c0.6,4,3.9,7.2,8.2,7.2H47l180.3-117.1h-30.8V256.85z"
        />
        <path
          className="fill-[#FF4B55]"
          d="M355.1,256.85h-30.7l180,116.9c4.2-0.4,7.5-3.9,7.5-8.2v-6.9L355.1,256.85z"
        />
        <path
          className="fill-[#FF4B55]"
          d="M27.1,73.75l153.2,99.5H211L31.9,56.95c-2.9,1.3-4.9,4.2-4.9,7.6C27.1,64.55,27.1,73.75,27.1,73.75z
		"
        />
        <path
          className="fill-[#FF4B55]"
          d="M342,173.25l169.7-110.2c-0.7-3.9-4-6.9-8.1-6.9h-12l-180.2,117.1H342z"
        />
      </g>
      <path
        className="fill-[#2E3033]"
        d="M18.8,483.55L18.8,483.55c-10.4,0-18.8-8.4-18.8-18.8V47.15c0-10.2,8.3-18.6,18.6-18.6h0.1
	c10.4,0,18.8,8.4,18.8,18.8v417.4C37.5,475.15,29.1,483.55,18.8,483.55z"
      />
    </svg>
  );
};
