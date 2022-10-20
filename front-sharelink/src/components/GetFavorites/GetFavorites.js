import { useGetFavorites } from "../api";
import GetFavorite from "../GetFavorite/GetFavorite";

const GetFavorites = () => {
  const [favorites] = useGetFavorites();

  return (
    <>
      <ul className="listLinks">
        {favorites?.result.length === 0 && (
          <p className="messageResponse">
            Aún no tienes enlaces en tu lista de favoritos
          </p>
        )}

        {favorites?.result.map((favorite) => (
          <li key={favorite.id_favorite}>
            <GetFavorite favorite={favorite} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default GetFavorites;
