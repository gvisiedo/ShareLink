import GetFavorites from "../../components/GetFavorites/GetFavorites";
import Submenu from "../../components/Submenu/Submenu";

const FavoritePage = () => {
  return (
    <section className="linksPage">
      <Submenu />
      <GetFavorites />
    </section>
  );
};

export default FavoritePage;
