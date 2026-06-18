import React from "react";
import girlHoldingADog from "./images/girlHoldingADog2.jpg";
import homepageDog from "./images/heroleft.png";
import footPrint from "./images/footPrint.png";
import heroBadgeOne from "./images/slider/unnamed(11).jpg";
import heroBadgeTwo from "./images/slider/unnamed(27).jpg";
import heroBadgeThree from "./images/slider/unnamed(5).jpg";

const HomeLandingContainer = (props) => {
  return (
    <div className="home-container">
      <div className="homeContainer-left">
        <div className="home-titleRow">
          <img className="home-left-dog" src={homepageDog} alt="Dog sitting" />
          <div>
            <h1 className="home-title">
              <span className="home-titleFirstLine">KAMPOT DOG SANCTUARY</span>
              <span className="home-titleSecondLine">HELP US HELP DOGS</span>
            </h1>
          {props.description ? (
            <p className="home-second-para">
              {props.description}
            </p>
          ) : null}
          </div>
        </div>
      </div>
      <div className="homeContainer-right">
        <div className="hero-artwork">
          <img className="hero-main-image" src={girlHoldingADog} alt="Girl holding a Dog" />

          <img className="hero-paw hero-paw-top-right" src={footPrint} alt="Decorative paw print" />
          <img className="hero-paw hero-paw-mid-right" src={footPrint} alt="Decorative paw print" />

          <div className="hero-badge hero-badge-top-left hero-badge-gold">
            <img src={heroBadgeOne} alt="Decorative dog badge" />
          </div>

          <div className="hero-badge hero-badge-right hero-badge-cream">
            <img src={heroBadgeTwo} alt="Decorative dog badge" />
          </div>

          <div className="hero-badge hero-badge-bottom-left hero-badge-sky">
            <img src={heroBadgeThree} alt="Decorative dog badge" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLandingContainer;
