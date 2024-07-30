import React, { useState, useEffect, useRef } from 'react';
import './TeamSlider.css';

const TeamSlider = ({ data, titleTeam, newImgsArr }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const imageWidth = 500; // Width of each image in pixels

  useEffect(() => {
    const timer = setInterval(() => {
      scrollRight();
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const scrollRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderImages = () => {
    const imagesToDisplay = [];

    // Set the number of images to display here
    const numbOfImages = 5;
    const imgsLength = data.length;

    for (let i = 0; i < numbOfImages; i++) {
      let newIndex = currentIndex + i;
      const imageIndex = newIndex % imgsLength;
      const teamData = data[imageIndex];
      const teamImg = newImgsArr[imageIndex]?.imgUrl ?? newImgsArr[imageIndex]?.url ?? teamData.teamImageSrc ?? titleTeam?.defaultImg;

      imagesToDisplay.push(
        <div className="teamItem" key={i}>
          <div className="teamBox">
            <img
              className="memberImage"
              style={{ height: '275px', width: '100%' }}
              src={teamData.imgUrl ?? teamImg}
              alt={teamData.teamMemberName}
            />
            <div className="teamTextbox" style={{ paddingLeft: '10px' }}>
              <h2 className="nameMember noyh-regular-moufit" style={{ paddingBottom: '8px' }}>
                {/* {teamData.teamMemberName} */}
                {teamData.title}

              </h2>
              <p style={{ height: '30px' }} className="designationMember rubik-regular-moufit">
                {/* {teamData.teamMemberDesignation} */}
                {teamData.description}

              </p>
            </div>
          </div>
        </div>
      );
    }

    return imagesToDisplay;
  };

  const renderSlider = () => {
    const transformValue = -currentIndex * imageWidth;
    const sliderStyle = {
      //   transform: `translateX(${transformValue}px)`,
      transition: 'transform 0.5s',
    };

    return (
      <>
        <div className="slider" ref={sliderRef} style={sliderStyle}>
          {renderImages()}
        </div>
      </>
    );
  };

  return (
    <div className="slider-container">
      <bold className="sliderTitle">{titleTeam.heading}</bold>
      <p className='sectionMainPara rubik-regular-moufit' style={{ textAlign: 'end' }}>{titleTeam.paragraph}</p>


      {renderSlider()}
    </div>
  );
};

export default TeamSlider;
