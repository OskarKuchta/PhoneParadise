import { useEffect, useState } from "react";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";

const BadURL = () => {
  const [count, setCount] = useState<number>(15);
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      navigate("/");
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [count, navigate]);
  return (
    <section className="bad-url">
      <h2>404</h2>
      <p>
        Your url adress is incorrect, back to main site or you will be
        redirected for {count} seconds
      </p>
      <Link to="/" aria-label="Back to main page">
        Back to main site
      </Link>
    </section>
  );
};

export default BadURL;
