import { useState } from "react";
import { Link } from "react-router-dom";
import "./MessageStatus.css";

const MessageStatus = ({ title, message, navigate }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <div className="bg">
          <section className="fg">
            <h2>{title}</h2>
            <p>{message}</p>
            <footer>
              <Link to={navigate}>
                <button onClick={() => setShow(false)}>volver </button>
              </Link>
            </footer>
          </section>
        </div>
      )}
    </>
  );
};

export default MessageStatus;
