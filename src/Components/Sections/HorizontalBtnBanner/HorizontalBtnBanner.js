import React from 'react'
import './HorizontalBtnBanner.css'
import { Box } from '@mui/system'
import { Link, NavLink } from 'react-router-dom';
function HorizontalBtnBanner({ data }) {
    // const [bannerHorizontal, setBannerHorizontal] = useState({
    //     DesktopBannerImg:"./MoufitMedia/startTodayDesktop.png",
    //     txtCstmBannerDesktop:"Get started today",
    //     btnTextDesktop:"Join Now",
    //     MobileBannerImg:"./MoufitMedia/startTodayMovile.png",
    //     txtCstmBannerMobile:"Get started today",
    //     btnTextMobile:"Join Now",
    // });
    const joinNowBanner = () => {
        console.log("btn join now");
    }
    return (
        <>
            <Box className='MainBtnBanner'>
                <div className='BtnBannerDesktop'>
                    <div className='containerBtnBanner'>
                        <img className='DesktopBannerImg' src={data.DesktopBannerImg} alt={data.txtCstmBannerDesktop} />
                        <div className='textBoxCstmBtnBanner'>
                            <h1 className='txtCstmBanner noyh-bold-moufit'>{data.txtCstmBannerDesktop}</h1>
                            <Link to={data?.btnLink ?? '/join-now'} component={NavLink}>
                                <button onClick={joinNowBanner} className='getStartedDesktop myBtnCstm'>{data.btnTextDesktop}</button>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className='BtnBannerMobile'>
                    <img className='MobileBannerImg' src={data.MobileBannerImg} alt={data.txtCstmBannerMobile} />
                    <div className='textboxMobileBtnBanner'>
                        <h1 className='txtCstmBanner noyh-bold-moufit'>{data.txtCstmBannerMobile}</h1>
                        <Link to={data?.btnLink ?? '/join-now'} component={NavLink}>
                            <button onClick={joinNowBanner} className='getStartedMobile myBtnCstm'>{data.btnTextMobile}</button>
                        </Link>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default HorizontalBtnBanner