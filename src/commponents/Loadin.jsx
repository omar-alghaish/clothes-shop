import React from 'react'
import logo from "../imges/grazia-high-resolution-logo-white-on-transparent-background.png"

function Loadin(props) {
  return (
    <div style={{width: "100%", height: `${props.Height}`, display:"flex", alignItems: "center",justifyContent:"center", background:"red",padding: "100px 0"}}>
        <img style={{width: "300px",maxWidth:"40%"}} src={logo} alt="" />
    </div>
  )
}

export default Loadin