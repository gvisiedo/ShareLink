// import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import useImageName from "../../hooks/useImageName";
import noImage from "../../img/photo-no-image-available.jpg";
import NewVotes from "../Votes/NewVotes";
import "./OneMyLink.css";

const OneMyLink = ({ myLink }) => {
  const nameImage = useImageName(myLink, noImage);
  return (
    <section className="myLink">
      <main>
        <a href={myLink.url}>
          <img src={nameImage} alt={myLink.title} />
        </a>
        <h2>{myLink.title}</h2>
        <p>{myLink.description}</p>
      </main>
      <footer>
        <NewVotes value={myLink.AVGvote} id={myLink.id_link} />
        <button>
          <Link to={`/mylinks/delete/${myLink.id_link}`}>delete</Link>
        </button>
        <button>
          <Link to={`/mylinks/edit/${myLink.id_link}`}>edit</Link>
        </button>
        <p>create by me</p>
      </footer>
    </section>
  );
};

export default OneMyLink;
