import React from 'react';
import LandingNavbar from './LandingNavbar';
import '../styles/landingPage.css';
import heroImage from '../assets/heroImage.svg';

function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <body>
        <img className="svgImage" src={heroImage} alt="SVG Image" />

        <div className="heading">
          Relieve yourself from the hassle <br /> of remembering bills shared!{" "}
          <br /> <br />
          <div className="subHeading">
            Introducing SplitEx, a complete <br /> solution for all your bill
            splitting needs!
          </div>{" "}
        </div>
      </body>
    </>
  );
}

export default LandingPage
