import { Link } from "react-router-dom";

const WhatsAppButton = () => {
    // Replace this with your WhatsApp number
    const phoneNumber = '+201559970700';
  
    // Function to create a WhatsApp link
    const getWhatsAppLink = () => {
      const url = `https://wa.me/${phoneNumber}`;
      return encodeURI(url);
    };
  
    return (
      <div className="whats-app-button-container">
         <Link to={getWhatsAppLink()} target="_blank">
        <button>WhatsApp</button>
      </Link>
      </div>
     
    );
  };

  export default WhatsAppButton