import { Link } from "react-router-dom";
import noImage from "../../img/photo-no-image-available.jpg";
import "./GetFavorite.css";

const GetFavorite = ({ favorite }) => {
  return (
    <section className="link">
      <main>
        <a href={favorite.url}>
          {favorite.image === "photoDefault" ? (
            <img src={noImage} alt={favorite.title} />
          ) : (
            <img src={favorite.image} alt={favorite.title} />
          )}
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
