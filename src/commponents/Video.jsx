import React from 'react'
import v1 from "../videos/v3.mp4"
function Video() {

  return (
    <div className='video-container'> 
        <video id="vid" src={v1} autoPlay muted loop></video>
    </div>
  )
}

export default Video