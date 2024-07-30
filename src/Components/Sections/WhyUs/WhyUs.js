import React, { useState } from 'react'
import './WhyUs.css';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link, NavLink } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const testDynamicSections = [
    { index: 0, is_active: true, label: 'main_banner', body: { title: 'The best Gym in Dubai & Sharjah !', desc: 'Access them all wth one subscription !' } },
    {
        index: 1, is_active: true, label: 'why_us_section', body: {
            right_section: {
                title: ''
            },
            left_section: {
                title: 'Why Choose Us !',
                desc: 'We offer affordable access to the best fitness institutions in the UAE !',
                dynamic_section: {
                    right_col: [
                        { heading: '50+ Locations !', sub_heading: 'Access any of our locations once per day with one subscription !' },
                        { heading: '50+ GYMS !', sub_heading: 'Access any of our GYMS once per day with one subscription !' },
                        { heading: '50+ Locations !', sub_heading: 'Access any of our GYMS once per day with one subscription !' },
                    ],
                    left_col: [
                        { heading: '50+ Locations !', sub_heading: 'Access any of our locations once per day with one subscription !' },
                        { heading: '50+ GYMS !', sub_heading: 'Access any of our GYMS once per day with one subscription !' },
                        { heading: '50+ Locations !', sub_heading: 'Access any of our GYMS once per day with one subscription !' },
                    ],
                }
            }
        }
    },
];

let Styles = {
    icon: {
        height: '40px',
        width: '35px',
        objectFit: 'cover'
    },
    heading: { margin: '10px 0' },
    btn: { margin: '0 0 5px 0' },
}
function WhyUs({ data, imgData, hasBtn, styles }) {
    // console.log('hereeee',imgData?.left_col)
    // console.log('hereeee right_col',imgData?.right_col)

    const [rightColumn, setRightColumn] = useState({
        imgaeLink: imgData?.right_section ?? "/MoufitMedia/yourBenefits.jpg",
        secTitle: data?.right_section?.title ?? "YOUR BENIFITS"
    });
    const [leftColumn, setLeftColumn] = useState({
        leftHeading: data?.left_section?.title ?? "Why Choose Us",
        LeftPara: data?.left_section?.desc ?? "Moufit offers you a exclusive set of benefits that you wont find anywhere else.",
    });
    //    const featureBox1 = data?.left_section?.dynamic_section?.left_col || [
    // const featureBox1 = (data?.left_section?.dynamic_section?.left_col?.length >= 1 ?
    //     data.left_section.dynamic_section.left_col :
    //     [
    //         { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
    //         { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
    //         { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
    //     ];

    const featureBox1 = imgData?.right_col ?? [
        { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
        { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
        { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
    ];
    const featureBox2 = [
        { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
        { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
        { imgIcon: '/MoufitMedia/iconUser.svg', iconHeading: "50+ Locations", iconPara: "Access any of our locations once per day with one subscription." },
    ];

// console.log('imgData',imgData)
// console.log('body',data)

    return (
        <>
            <div className='WhyUsMainContainer'>
                <Box className='gridBox' sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid className='GridContainerWhyUsMobile GridContainerWhyUsRightMobile RightMobileWhyUs' item xs={12} md={6}>
                            <Item className='GridItemWhyUsMobile GridItemLeftWhyUsMobile' style={{ boxShadow: 'none !important', backgroundColor: '#FAFAFA' }}>
                                <div className='ImageContainerMainMobile'>
                                    <div className='titleBannerRightMobile'>
                                        <h1 className='benifitsHeadingMobile noyh-bold-moufit'>{data?.right_section?.title ?? rightColumn.secTitle}</h1>
                                    </div>
                                    <img className='imageBenefitsMobile' src={imgData?.right_section ?? rightColumn.imgaeLink ?? "/MoufitMedia/yourBenefits.jpg"} alt={leftColumn.leftHeading} />
                                </div>
                            </Item>
                        </Grid>
                        <Grid className='GridContainerWhyUs GridContainerWhyUsLeft' item xs={12} md={6}>
                            <Item className='GridItemWhyUs GridItemLeftWhyUs' style={{ boxShadow: 'none !important', backgroundColor: '#FAFAFA' }}>
                                <div className='leftMainContainer' style={{ marginTop: `${styles?.marginTop ?? '10px'}` }}>
                                    <div className='textboxWhyUs' style={{ padding: `${styles?.padding ?? '50px'} 10px` }}>
                                        <div className='containerCstm'>
                                            <h2 className='headingCstm noyh-bold-moufit'>{data?.left_section?.title ?? leftColumn.leftHeading}</h2>
                                            <p className='paraCstm rubik-regular-moufit'>{data?.left_section?.desc ?? leftColumn.LeftPara}</p>
                                        </div>
                                        <div className='iconBoxContainer'>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6} >
                                                    {/* {(data?.left_section?.dynamic_section?.left_col?.length > featureBox1.length ? data?.left_section?.dynamic_section.left_col : featureBox1).map((featureBox, index) => ( */}
                                                    {/* {(data?.left_section?.dynamic_section?.left_col ?? featureBox1).map((featureBox, index) => ( */}
                                                    {/* {(imgData?.left_col ?? featureBox1).map((item, index) => ( */}
                                                    {(data?.left_section?.dynamic_section?.left_col ?? featureBox1).map((item, index) => (
                                                        <Item key={index} className='iconItem'>
                                                            <div className='iconContainer'>
                                                                <div className='imageBox'>
                                                                    <img className='singleImg'
                                                                        style={Styles.icon}
                                                                        src={imgData?.left_col[index]?.imgUrl ?? item?.imgUrl ?? item.imgIcon  ?? '/MoufitMedia/iconUser.svg'} alt={item.iconHeading} />

                                                                        {/* // src={imgData?.left_col[index]?.url ?? item.imgIcon ?? '/MoufitMedia/iconUser.svg'} alt={item.iconHeading} /> */}
                                                                </div>
                                                                <div className='textBoxIcon'>
                                                                <h4 className='IconHeading rubik-regular-moufit'>{imgData?.left_col[index]?.title ?? item?.title ??  item?.iconHeading}</h4>
                                                                    <p className='IconPara rubik-regular-moufit'>{imgData?.left_col[index]?.description ?? item?.description ??  item?.iconPara}</p>
                                                                    {/* <h4 className='IconHeading rubik-regular-moufit'>{data?.left_section?.dynamic_section?.left_col[index]?.heading ?? featureBox.iconHeading}</h4>
                                                                    <p className='IconPara rubik-regular-moufit'>{data?.left_section?.dynamic_section?.left_col[index]?.sub_heading ?? featureBox.iconPara}</p> */}
                                                                </div>
                                                            </div>
                                                        </Item>
                                                    ))}

                                                </Grid>
                                                <Grid item xs={12} md={6} >
                                                    {/* {(data?.left_section?.dynamic_section?.right_col ?? featureBox2).map((featureBox2, index) => ( */}
                                                    {(data?.left_section?.dynamic_section?.right_col ?? featureBox2).map((item, index) => (
                                                        <Item key={index} className='iconItem'>
                                                            <div className='iconContainer'>
                                                                <div className='imageBox'>
                                                                {/* <img style={Styles.icon} src={imgData?.right_col[index]?.url ?? item.imgIcon ?? '/MoufitMedia/iconUser.svg'} alt={item.iconHeading} /> */}
                                                                    <img style={Styles.icon} src={imgData?.right_col[index]?.imgUrl ?? item?.imgUrl ?? item?.imgIcon ?? '/MoufitMedia/iconUser.svg'} alt={item.iconHeading} />
                                                                </div>
                                                                <div className='textBoxIcon'>
                                                                <h4 className='IconHeading'>{imgData?.right_col[index]?.title  ?? item?.title ?? item.iconHeading}</h4>
                                                                    <p className='IconPara'>{imgData?.right_col[index]?.description  ?? item?.description ?? item.iconPara}</p>
                                                                    {/* <h4 className='IconHeading'>{data?.left_section?.dynamic_section?.right_col[index]?.heading ?? item.iconHeading}</h4>
                                                                    <p className='IconPara'>{data?.left_section?.dynamic_section?.right_col[index]?.sub_heading ?? item.iconPara}</p> */}
                                                                </div>
                                                            </div>
                                                        </Item>
                                                    ))}
                                                </Grid>

                                                {data?.left_section?.btnText && (
                                                    <Link to={data?.left_section?.btnLink ?? '/join-now'} component={NavLink}>

                                                        <button onClick={(e) => e?.preventDefault()} style={Styles.btn} className='getStartedDesktop myBtnCstm' >{ data?.left_section?.btnText ?? 'Join Now'}</button>
                                                    </Link>
                                                )}

                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Grid>

                        <Grid className='GridContainerWhyUs GridContainerWhyUsRight RightDesktopWhyUs' item xs={12} md={6}>
                            <Item className='GridItemWhyUs GridItemLeftWhyUs' style={{ boxShadow: 'none !important', backgroundColor: '#FAFAFA' }}>
                                <div className='ImageContainerMain'>
                                    <img className='imageBenefits' style={{ width: styles?.imgWidth ?? '60%' }} src={imgData?.right_section ?? rightColumn.imgaeLink ?? "/MoufitMedia/yourBenefits.jpg"} alt={rightColumn.secTitle} />
                                    {data?.right_section?.title && (
                                        <div className='titleBannerRight'>
                                            <h1 className='benifitsHeading noyh-bold-moufit'>{data?.right_section?.title ?? rightColumn.secTitle}</h1>
                                        </div>
                                    )}
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    )
};

export default WhyUs;