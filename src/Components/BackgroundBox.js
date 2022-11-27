import React, { useState } from "react";
import "./BackgroundBox.css";

import "./inputA.css";
export const BackgroundBox = () => {
    const  [countPhp, setcountPhp] = useState(0)
    let newcountPhp = countPhp




  return (
    <div className="BackgroundBox">
        <div className="heading">Vote Your Language!</div>
      <div className="input-field">
        <div className="divBox">
        <div style={{ margin: "10px" }}>{newcountPhp}</div>
        <div className="lang"> PHP</div>
        <button className="btn" onSubmit={()=> setcountPhp(newcountPhp++)}> Click Here</button>
      </div>
     <div className="divBox">
        <div style={{ margin: "10px" }}>p</div>
        <div className="lang"> Python</div>
        <button className="btn"> Click Here</button>
      </div>
      <div className="divBox">
        <div style={{ margin: "10px" }}>p</div>
        <div className="lang"> React</div>
        <button className="btn"> Click Here</button>
      </div>
      <div className="divBox">
        <div style={{ margin: "10px" }}>p</div>
        <div className="lang"> Java</div>
        <button className="btn"> Click Here</button>
      </div>
    </div>
    </div>
  );
};
