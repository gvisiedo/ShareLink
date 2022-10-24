import { Link } from "react-router-dom";
import useImageName from "../../hooks/useImageName";
import noImage from "../../img/photo-no-image-available.jpg";
import "./GetFavorite.css";

const GetFavorite = ({ favorite }) => {
  const imageName = useImageName(favorite, noImage);
  return (
    <section className="link">
      <main>
        <a href={favorite.url}>
          <img src={imageName} alt={favorite.title} />
        </a>
        <h2>{favorite.title}</h2>
        <p>{favorite.description}</p>
      </main>
      <footer>
        <button className="buttonDeleteFavorite">
          <Link to={`/deletefavorite/${favorite.id_favorite}`}>borrar</Link>
        </button>
      </footer>
    </section>
  );
};

export default GetFavorite;
