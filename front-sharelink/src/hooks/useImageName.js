const useImageName = (link, noImage) => {
  let nameImage;
  if (link.image === "photoDefault") {
    nameImage = noImage;
  } else if (link.image.includes("upload")) {
    nameImage = `${process.env.REACT_APP_BACKEND}/${link.image}`;
  } else {
    nameImage = link.image;
  }
  return nameImage;
};

export default useImageName;
