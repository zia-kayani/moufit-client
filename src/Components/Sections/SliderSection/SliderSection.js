import React from 'react'
import Slider from "react-slick";
import './SliderSection.css'
import { Link, NavLink } from 'react-router-dom';


function SliderSection({ data, slides, newImgsArr }) {


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: data.slideShow,
        slidesToScroll: 1,
        initialSlide: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        // cssEase: "linear",
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: data.slideShow,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className="MainSliderDiv">
                <div className="titleDivSecSlider">
                    <h3 className="sectionTitleSlider noyh-bold-moufit moufit-gap">{data?.title ?? ''}</h3>
                </div>

                <Slider {...settings}>
                    {/* {(newImgsArr ?? slides)?.map((slide, index) => ( */}
                    {Array.isArray(slides) && slides.map((slide, index) => (

                        <div key={index} className="SliderWrapper">
                            <div className="slide-cstm" key={index}>
                                {/* <a href={slide?.imgLink ?? '/'}> */}
                                <img
                                    className='singleImg'
                                    src={newImgsArr[index]?.url ?? slide?.imgSrc ?? data?.defaultImg ?? ''} alt={slide.slideHeading ?? ''} />
                                {/* </a> */}
                                <div className="textareaSlider">
                                    {/* <Link to={slide?.imgLink ?? '/'} component={NavLink}> */}
                                    <h3 className="slide-heading noyh-bold-moufit">{slide?.slideHeading ?? ''}</h3>
                                    {/* </Link> */}

                                    <p className="slide-para rubik-regular-moufit">{slide?.slidePara ?? ''}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}


export default SliderSection

