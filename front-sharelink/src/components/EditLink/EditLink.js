import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
// import { useEditLink } from "../api";
import useFetch from "fetch-suspense";
import MessageStatus from "../MessageStatus/MessageStatus";
import "./EditLink.css";

const EditLink = () => {
  const user = useUser();
  const { id } = useParams();
  const [response, setResponse] = useState();

  const link = useFetch(`${process.env.REACT_APP_BACKEND}/links/${id}`, {
    headers: user ? { Authorization: user.data } : {},
  });

  const [title, setTitle] = useState(link.data.title);
  const [url, setUrl] = useState(link.data.url);
  const [description, setDescription] = useState(link.data.description);
  const [image, setImageUrl] = useState();
  const [imagePreview, setImagePreview] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("url", url);
    formData.append("description", description);
    formData.append("image", image);

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/links/${id}`, {
      method: "PUT",
      headers: user ? { Authorization: user.data } : {},
      body: formData,
    });
    const data = await res.json();

    setResponse(data);
    setImagePreview(null);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
    setImagePreview(URL.createObjectURL(file));
  };
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg">
      <form onSubmit={handleSubmit} className="form_editLink">
        <label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title..."
          />
        </label>
        <label>
          <input
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="url..."
          />
        </label>
        <label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description..."
          />
        </label>
        <label>
          <p className="up_photo">Sube tu foto aquí</p>
          <p className="up_photo">📷</p>
          <input
            type="file"
            name="image"
            onChange={handleFile}
            className="input_file"
          />
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="imagePreview" />
          )}
        </label>
        <button>Guardar</button>
      </form>
      {response?.status === "OK" && (
        <>
          <MessageStatus
            title="¡Felicidades!"
            message="Tu link se ha modificado correactamente"
            navigate="/mylinks"
          />
        </>
      )}
      {response?.status === "error" && (
        <p>Recuerda que todos los campos son obligatorios</p>
      )}
    </div>
  );
};

export default EditLink;
