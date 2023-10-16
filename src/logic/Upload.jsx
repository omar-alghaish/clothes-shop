import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase";

export const UploadImage = async ({ imagePath, image }) => {
  try {
    const imgRef = ref(storage, `${imagePath}`);
    await uploadBytes(imgRef, image);
    const imgUrl = await getDownloadURL(imgRef);
    return imgUrl;
  } catch (err) {
    console.log(err.message);
    throw err; // Rethrow the error to handle it in the calling component
  }
};

export const UploadImages = async (imagesPath, images) => {
  const imagesArray = [];
  for (let i = 0; i < images.length; i++) {
    const imgRef = ref(storage, `${imagesPath}/${images[i]}`);
    await uploadBytes(imgRef, images[i]);
    const imgUrl = getDownloadURL(imgRef);
    imagesArray.push(imgUrl);
  }
  return imagesArray;
};

export const UploadImagesWithData = async ({ collectionName, data }) => {
  const collectionRef = collection(db, collectionName);
  await addDoc(collectionRef, data);
};
