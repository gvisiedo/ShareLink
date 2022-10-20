import { Link } from "react-router-dom";
import noImage from "../../img/photo-no-image-available.jpg";
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
        <button>
          <Link to={`/deletefavorite/${favorite.id_link}`}>delete</Link>
        </button>
      </footer>
    </section>
  );
};

export default GetFavorite;
