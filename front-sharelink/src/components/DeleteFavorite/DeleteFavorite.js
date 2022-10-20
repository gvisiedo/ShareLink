import { Link, useParams } from "react-router-dom";
import { useDeleteFavorite } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";

const DeleteFavorite = () => {
  const { id } = useParams();

  const [, response, sendData] = useDeleteFavorite(id);
  console.log(response);

  const deleteFavorite = async () => {
    sendData({}, "DELETE");
  };

  return (
    <div className="bg">
      <section className="fg">
        {!response && (
          <section className="deleteLink_confirmation">
            <p>¿Quieres borrar el link de tu lista de favoritos?</p>
            <div>
              <button onClick={() => deleteFavorite()}>si</button>
              <Link to="/myfavorites">
                <button>No</button>
              </Link>
            </div>
          </section>
        )}
        {response?.status === "ok" && (
          <>
            <MessageStatus
              title="¡Felicidades!"
              message="Tu publicación se ha borrado correctamente"
              navigate="/myfavorites"
            />
          </>
        )}
      </section>
    </div>
  );
};

export default DeleteFavorite;
