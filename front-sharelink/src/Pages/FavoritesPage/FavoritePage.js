import GetFavorites from "../../components/GetFavorites/GetFavorites";
import Submenu from "../../components/Submenu/Submenu";

const FavoritePage = ({ setValuefavorites }) => {
  return (
    <section className="linksPage">
      <Submenu />
      <GetFavorites setValuefavorites={setValuefavorites} />
    </section>
  );
};

export default FavoritePage;
