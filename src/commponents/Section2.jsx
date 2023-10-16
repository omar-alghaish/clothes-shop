import React,{useState} from 'react';
import video from '../videos/v2.mp4';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

function Section2() {
    const isDarkMode = useSelector((state) => state.theme.darkMode);
  const [t] = useTranslation()
    const [isPlaying, setIsPlaying] = useState(false)


    const videoButton = () =>{
        let vid = document.getElementById("myVideo");
        let btn = document.getElementById("playAndPause");
    
    
    function playVid() {
        vid.play();
        setIsPlaying(true)
    }
    
    function pauseVid() {
        vid.pause();
        setIsPlaying(false)
    }
    
    isPlaying ? pauseVid() : playVid() ;
    }

  return (
    <div className={`section2-home-container ${isDarkMode ? "dark" : "light"}`}>
        <div className="text">{t("section2-message")}</div>
        <div className="video">
          <h1>GRAZIA</h1>
            <video id='myVideo' src={video} >
                
            </video>
            <button onClick={videoButton} id='playAndPause'>{isPlaying? <i class="fa-solid fa-pause"></i>: <i class="fa-solid fa-play"></i>}</button>
        </div>
    </div>
  )
}

export default Section2