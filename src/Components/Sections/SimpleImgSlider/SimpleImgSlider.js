import React, { useState, useEffect, useRef } from 'react';
import './SimpleImgSlider.css';

const SimpleImgSlider = ({ title, pictures, body }) => {
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
            prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
        );
    };

    const renderPaginationDots = () => {
        const dotCount = pictures ? pictures?.length - 1 : 0;
        const dots = [];

        for (let i = 0; i < dotCount; i++) {
            const isActive = currentIndex === i;
            const dotStyle = {
                backgroundColor: isActive ? 'black' : 'gray',
            };

            dots.push(
                <div
                    key={i}
                    className="dot"
                    style={dotStyle}
                    onClick={() => handleDotClick(i)}
                ></div>
            );
        }

        return dots;
    };


    const handleDotClick = (index) => {
        const dotsSkipped = index - Math.floor(currentIndex / 4);
        const newIndex = currentIndex + dotsSkipped * 4;
        setCurrentIndex(newIndex);
        // scrollToImage(newIndex);
    };


    const renderImages = () => {

        const imagesToDisplay = [];

        // @@ SET NO. of images to display here !!
        const numbOfImages = 5;
        const imgsLength = body?.imgs_arr?.length || pictures?.length; // || body?.slider_arr?.length

        for (let i = 0; i < numbOfImages; i++) {

            let newIndex = currentIndex + i;
            const imageIndex = newIndex % imgsLength;
            const picture = body?.imgs_arr[imageIndex] || pictures[imageIndex];

            imagesToDisplay.push(
             
                <div className="single-img-wrapper">
                <img
                    key={i}
                    style={{
                        width: '270px',
                        height: '200px',
                        objectFit: 'contain', // Adjust this property as needed
                      }}                    // src={typeof(picture) !== 'string' ? console.log(picture) : picture?.url || picture?.imgSrc || picture?.img || picture || ''}
                    src={picture?.url || picture?.imgUrl || picture?.imgSrc || picture?.img || picture || ''}

                    alt={`Slide ${i + 1}`}
                    />
                <h6>{picture?.title ?? ''}</h6>
                <small>{picture?.description ?? ''}</small>

                </div>

                    
            );
            
        }

        return imagesToDisplay;
    };

    const renderSlider = () => {
        const transformValue = -currentIndex * imageWidth;
        // console.log('transformValue', transformValue);
        const sliderStyle = {
            //   transform: `translateX(${transformValue}px)`,
            transform: `translateX(${-10}px)`,

            transition: 'transform 0.1s',
        };

        return (
            <>

                <div className="slider" ref={sliderRef} style={sliderStyle}>
                    {renderImages()}
                </div>
            </>
        );
    };

    const renderWithPagination = () => (
        <div>
            {renderSlider()}
            <div className="pagination-dots">{renderPaginationDots()}</div>
        </div>
    );

    return (
        <div className="slider-container">
            <strong className='sliderTitle'>
                {title ?? 'WE HAVE PARTNERED WITH SOME OF THE BEST FITNESS INSTITUTIONS'}
            </strong>

            {/* {pictures.length > 4 ? renderWithPagination() : renderSlider()} */}
            {renderSlider()}

        </div>
    );
};

export default SimpleImgSlider;


