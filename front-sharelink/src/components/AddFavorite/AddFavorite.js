import { useAddFavorite } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";

const AddFavorite = ({ id }) => {
  const [status, , sendData] = useAddFavorite();
  const add = async () => {
    sendData({ id });
  };

  return (
    <>
      <span onClick={() => add()}>🏷️</span>
      {status === "error" && (
        <MessageStatus
          title="¡UPS!"
          message="Ya tienes añadido este link en tus favoritos"
          navigate="/links"
        />
      )}
      {status === "succes" && (
        <MessageStatus
          title="¡Felicidades!"
          message="Se ha ñadido a tus favoritos"
          navigate="links/"
        />
      )}
    </>
  );
};

export default AddFavorite;
