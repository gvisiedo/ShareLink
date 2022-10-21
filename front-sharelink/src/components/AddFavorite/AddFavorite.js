import { useAddFavorite } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";
import labelwhite from "../../img/labelWhite.png";
import "./AddFavorite.css";

const AddFavorite = ({ id }) => {
  const [status, , sendData] = useAddFavorite();

  const add = async () => {
    sendData({ id });
  };

  return (
    <>
      <button onClick={() => add()} className="labelAddFavorite">
        <img src={labelwhite} alt="label" />
      </button>
      {status === "error" && (
        <MessageStatus
          title="¡UPS!"
          message="Ya tienes añadido este link en tus favoritos"
          navigate="/links"
        />
      )}
      {status === "success" && (
        <MessageStatus
          title="¡Felicidades!"
          message="Se ha ñadido a tus favoritos"
          navigate="/links"
        />
      )}
    </>
  );
};

export default AddFavorite;
