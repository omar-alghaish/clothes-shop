// import React, { useEffect, useState } from "react";
// import axios from "axios";
// function Instgram({ accessToken }) {
//     const [photos, setPhotos] = useState([]);

//     useEffect(() => {
//       const fetchPhotos = async () => {
//         try {
//           // Make a GET request to fetch the user's media
//           const response = await axios.get(
//             `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${accessToken}`
//           );
  
//           // Set the photos state with the fetched data
//           setPhotos(response.data.data);
//         } catch (error) {
//           console.error("Error fetching photos:", error);
//         }
//       };
  
//       fetchPhotos();
//     }, [accessToken]);
  
//     return (
//       <div>
//         <h1>Instagram Photos</h1>
//         <div>
//           {photos.map((photo) => (
//             <img key={photo.id} src={photo.media_url} alt={photo.caption} />
//           ))}
//         </div>
//       </div>
//     );
// }

// export default Instgram