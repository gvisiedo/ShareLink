import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useNewLink } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";
import "./NewLink.css";

const NewLink = ({ reload }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const user = useUser();

  const [, response, sendData] = useNewLink();

  const handleSubmit = async (e) => {
    e.preventDefault();

    reload();
    sendData({ title, url, description });
    setTitle("");
    setUrl("");
    setDescription("");
  };

  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="newLink">
      <form onSubmit={handleSubmit} className="form_newLink">
        <p>
          Comparte tus enlaces aquí y ayuda a otras personas en su día a día
        </p>
        <input
          placeholder="Título...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Url....."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          placeholder="Descripción....."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Compartir</button>
      </form>
      {response?.status === "ok" && (
        <MessageStatus
          title="Felicidades"
          message="Tú publicación se ha creado correctamente"
          navigate="/mylinks"
        />
      )}
      {response?.status === "error" && (
        <p className="error">
          !Ups¡ No se ha relaizado tu publicación recuerda rellenar todos los
          campos
        </p>
      )}
    </div>
  );
};

export default NewLink;
