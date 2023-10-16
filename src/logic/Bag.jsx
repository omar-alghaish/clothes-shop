import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


export const addToBag = async({user,id,size, quantity})=>{
  try {
    const userRef = doc(db, "users", `${user.id}`);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const user1 = userSnapshot.data();
      const productID = id;

      if (!user1.bagArray || !user1.bagArray.some((item) => item.id === id)) {
        // Add the product with options to the bagArray
        await updateDoc(userRef, {
          bagArray: arrayUnion({
            id: productID,
            size,
            quantity,
          }),
        });
        
        console.log("Product added to bagArray!");
        // setIsInBag(true);
      } else {
        // Remove the product ID from the bagArray
        await updateDoc(userRef, {
          bagArray: user1.bagArray.filter((id) => id !== productID),
        });

        console.log("Product removed from bagArray!");
        // setIsInBag(false);
      }
    } else {
      console.log("User document does not exist.");
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
  }
}