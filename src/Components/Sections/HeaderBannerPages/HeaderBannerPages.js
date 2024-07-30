import React, { useState } from 'react'
import './HeaderBannerPages.css'
function HeaderBannerPages({ text, imgData }) {
    // const [BannerHeaderMain, setBannerHeaderMain] = useState({
    //     textMain:text,
    // });

    return (
        <>
            <div className='bannerContainerHeader'>
                <div className='imageContainerDesktop'>
                    <img className='bannerImg fullwidth-moufit' src={imgData?.imgSrc ?? imgData?.desktop_img ?? "./MoufitMedia/moufitPagesBanner.jpg"} alt={text ?? '...'} />
                </div>
                <div className='imageContainerMobile'>
                                                                 {/* imgData?.imgSrc ?? */}
                    <img className='bannerImgMobile fullwidth-moufit' src={imgData?.mobile_img ?? "\MoufitMedia\overlay.png"} alt={text ?? '...'} />
                </div>
                <div className='textNoxHeading'>
                    <h1 className='headinMainBanner noyh-bold-moufit'>
                        {text ?? 'Contact Us'}
                    </h1>
                </div>
            </div>
        </>
    )
}


export default HeaderBannerPages