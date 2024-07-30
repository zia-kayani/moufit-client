import React, { useState } from 'react'
import './MainBanner.css'
function Mainbanner({ data }) {
    const [isBanner, setIsBanner] = useState(false);

    const [BannerMain, setBannerMain] = useState({
        subheading: data?.firstBannerObj?.title ?? "The best Gym in Dubai & Sharjah",
        title: data?.firstBannerObj?.desc ?? "Access them all wth one subscription.",
        btnText: data?.firstBannerObj?.btnText ?? "Play the Video",
        imgSrc: data?.firstBannerObj?.imgUrl ?? "",

        // btnLink: data?.firstBannerObj?.btnLink ?? '',
        btnLink:  '',

    });
   
    const closeBanner = () => {
        setIsBanner(true);
        let btnPlay = document.querySelector('.playVidBtn');
        btnPlay.style.visibility = "hidden";
    };

    return (
        <>
            <div className='BannerMain'>
                {isBanner === false ?
                // MAIN BANNER IMG
                    <img
                        className='mainImage'
                        // src="\MoufitMedia\overlay.png"
                        src={data?.firstBannerObj?.imgUrl ?? data?.body?.imgUrl ?? data?.imgUrl ?? "\MoufitMedia\overlay.png"}

                        alt="..."
                        sx={{ width: '100%' }}
                    />
                    :
                // MAIN BANNER VIDEO
                    <video className='mainVideo' src="\MoufitMedia\vidMain.mp4" autoPlay  loop></video>
                }



                {/* Title && DESC Image */}
                <div className='textboxHeroImage'>
                    {/* PURPLE IMG */}
                    <img
                        src="\MoufitMedia\bannerng.png"
                        // src={data?.imgUrl ?? "\MoufitMedia\bannerng.png"}

                        className='overlay-bg-text'
                        alt="..."
                    />
                </div>
                <div className='textboxHero'>
                    <p className='para-cstm rubik-medium-moufit'>{data?.title ?? BannerMain.subheading}</p>
                    <h1 className='heading-cstm noyh-bold-moufit'>{data?.desc ?? BannerMain.title}</h1>
                    <div className='btn-wrap flex'>


                        <button onClick={closeBanner} className="playVidBtn"><span>
                            <img
                                src="\MoufitMedia\playBtn.svg"
                                alt="..."
                            /></span>{BannerMain.btnText}</button>
                    </div>

                </div>

            </div>
        </>
    )
};

export default Mainbanner;