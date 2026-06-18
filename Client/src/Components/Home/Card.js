import React from "react";

const Card = (props) => {

  return (
    <div className={`card-container ${props.bgClass || ''}`} style={props.bgImage ? { '--card-bg-image': `url(${props.bgImage})` } : undefined}>
      <div className="card-container-overlay" />
      <div className="card-container-content">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Card;
