import React, { useState, useEffect } from 'react'
import './FooterMoufit.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link, NavLink } from 'react-router-dom';
import { setSingleBannerState } from '../../Helpers/apiCalls/globalApiCalls';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function FooterMoufit() {

    const [dynamicBannerObj, setDynamicBannerObj] = useState([])
    const testDynamicObj = [
        {
            index: 0, label: 'info_section', is_active: true, body: {
                info: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat!',
            }
        },
        {
            index: 1, label: 'qucik_links', is_active: true, body: {
                title: 'Quick Links',
                links_arr: [
                    { menuItem: "Home", route: "/" },
                    { menuItem: "Locations", route: "/locations" },

                ]
            }
        },
        {
            index: 2, label: 'info_links', is_active: true, body: {
                title: 'Info Links',
                links_arr: [
                    { menuItem: "Gym Membership", route: "/subscriptions" },
                    { menuItem: "About Us", route: "/about" },

                ]
            }
        },
        {
            index: 3, label: 'contact_links', is_active: true, body: {
                title: 'Contact Info',
                links_arr: [
                    { heading: "Location:", info: " Astrolabs, Parkside Retail Level - Cluster R - Jumeirah Lakes Towers - Dubai - United Arab Emirates" },
                    { heading: "Email:", info: " yalla@mou.fit !" },

                ]
            }
        },
        {
            index: 4, label: 'news_links', is_active: true, body: {
                title: 'Contact Info',
                text: 'We dont send spam so dont worry !'
            }
        },

    ]
    const [footerAllTitles, setFooterAllTitles] = useState({
        title1: "Quick Links",
        title2: "Information",
        title3: "Contact Info",
        title4: "Newsletter",
    });

    const [footerWidget1, setFooterWidget1] = useState({
        logo: "./MoufitMedia/Moufit-new-dimensions_59.png",
        about: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
        facebook: "https://www.facebook.com/",
        twitter: "",
        instagram: "https://www.instagram.com/",
        linkedin: "",
    });

    const footerWidget2Links = [
        { menuItem: "Home", route: "/" },
        { menuItem: "Locations", route: "./locations" },
        { menuItem: "Partner with Us", route: "" },
        { menuItem: "Customer Reviews", route: "" },
        { menuItem: "Our Packages", route: "" },
    ];

    const footerWidget3Links = [
        { menuItem: "Gym Membership", route: "/subscriptions" },
        { menuItem: "About Us", route: "/about" },
        { menuItem: "Blogs", route: "/blogs" },
        { menuItem: "Website Terms", route: "/website-terms" },
        { menuItem: "Contact Us", route: "contact-us" },
    ];

    const footerWidget4 = [
        { heading: "Location:", info: " Astrolabs, Parkside Retail Level - Cluster R - Jumeirah Lakes Towers - Dubai - United Arab Emirates" },
        { heading: "Email:", info: " yalla@mou.fit" },
        { heading: "Phone:", info: " +971 56 964 2280" },

    ];

    const [footerWidget5, setFooterWidget5] = useState({
        text: "We dont send spam so dont worry."
    });

    const getFooterSectionsFromFirebase = async () => {

    //   const navSections = await setSingleBannerState("footer_section", 'global_customization', setDynamicBannerObj);
      const navSections = await setSingleBannerState("new_footer_section", 'global_customization', setDynamicBannerObj);

      console.log(navSections);
        
    };
    
    useEffect(() => {

        getFooterSectionsFromFirebase();

    }, [])

    useEffect(() => { console.log('footerrr',dynamicBannerObj) }, [dynamicBannerObj])


    return (
        <>
            <div className='footerMain'>
                <div className='footerContainer'>
                    <Box className='footerBox' sx={{ flexGrow: 1 }}>
                        <Grid className='footerGrid' container spacing={2}>
                            {( dynamicBannerObj?.dynamic_sections ?? testDynamicObj).sort((a, b) => a.index - b.index)?.map((section, ind) => {
                                if (section.is_active && section.label === "info_section"
                                    //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                                ) {
                                    return (
                                        <Grid className='footerColumn footerColumn1' item xs={12} md={3}>
                                            <Item className='footerItem footerItem1'>
                                                <div className='footerSection1'>
                                                    <img className='footerLogo' src={footerWidget1.logo} />
                                                    <div className='aboutText'>
                                                        <p className='txtParaAbout rubik-ligt-moufit'>
                                                            {section?.body?.info ?? footerWidget1.about}
                                                        </p>
                                                    </div>
                                                    <div className='socialIcons'>
                                                        <div className='socialIconFooter socialIconFooter1'>
                                                            <a href={footerWidget1.facebook}>
                                                                <img src="./MoufitMedia/facebook.svg" alt='facebook' />
                                                            </a>
                                                        </div>
                                                        {/* <div className='socialIconFooter socialIconFooter2'>
                                                            <a href={footerWidget1.twitter}>
                                                                <img src="./MoufitMedia/twitter.svg" alt='twitter' />
                                                            </a>
                                                        </div> */}
                                                        <div className='socialIconFooter socialIconFooter2'>
                                                            <a href={footerWidget1.instagram}>
                                                                <img src="./MoufitMedia/instagram.svg" alt='instagram' />
                                                            </a>
                                                        </div>
                                                        <div className='socialIconFooter socialIconFooter2'>
                                                            <a href={footerWidget1.linkedin}>
                                                                <img src="./MoufitMedia/linkedin.svg" alt='linkedin' />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Item>
                                        </Grid>
                                    )
                                    // return <HeaderBannerPages text={section?.body?.title ?? "Contact Us"} />

                                } else if (section.is_active && section.label === "qucik_links"
                                    //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                                ) {
                                    return (
                                        <Grid className='footerColumn footerColumn2' item xs={12} md={2}>
                                            <Item className='footerItem footerItem2'>
                                                <div className='quicklinks1Footer'>
                                                    <div className='titleFooterLinks'>
                                                        <b><p className='titleWidget noyh-bold-moufit'>{section?.body?.title ?? footerAllTitles.title1}</p></b>
                                                    </div>
                                                    <ul className='footerLinkList'>
                                                        {(dynamicBannerObj?.menus?.first_col_menu ?? section?.body?.links_arr).map((footerWidget2Links, index) => (
                                                            <li key={index} className='liLinks'>

                                                                <Link className="menuItemMainFooter rubik-medium-moufit" to={footerWidget2Links.link ?? footerWidget2Links.route} component={NavLink}>{footerWidget2Links.label ?? footerWidget2Links.menuItem} </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </Item>
                                        </Grid>
                                    )

                                } else if (section.is_active && section.label === "info_links"
                                    //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                                ) {
                                    return (
                                        <Grid className='footerColumn footerColumn3' item xs={12} md={2}>
                                            <Item className='footerItem footerItem3'>
                                                <div className='quicklinks1Footer informationLinksFooter'>
                                                    <div className='titleFooterLinks'>
                                                        <b><p className='titleWidget noyh-bold-moufit'>{section?.body?.title ?? footerAllTitles.title2}</p></b>
                                                    </div>
                                                    <ul className='footerLinkList'>
                                                        {(dynamicBannerObj?.menus?.second_col_menu ?? section?.body?.links_arr).map((footerWidget3Links, index) => (
                                                            <li key={index} className='liLinks'>
                                                                <Link className="menuItemMainFooter rubik-medium-moufit" to={footerWidget3Links?.link ?? footerWidget3Links.route} component={NavLink}>{footerWidget3Links?.label ?? footerWidget3Links.menuItem} </Link>
                                                            </li>
                                                        ))}

                                                    </ul>
                                                </div>
                                            </Item>
                                        </Grid>
                                    )
                                }
                                else if (section.is_active && section.label === "contact_links"
                                    //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                                ) {
                                    return (
                                        <Grid className='footerColumn footerColumn4' item xs={12} md={3}>
                                            <Item className='footerItem footerItem4'>
                                                <div className='contactInfoFooter'>
                                                    <div className='titleFooterLinks'>
                                                        <b><p className='titleWidget noyh-bold-moufit'>{section?.body?.title ?? footerAllTitles.title3}</p></b>
                                                    </div>
                                                    {(dynamicBannerObj?.menus?.third_col_menu ?? section?.body?.links_arr ?? footerWidget4).map((footerWidget4, index) => (
                                                        <div key={index} className='addressFooter'>
                                                            <p className='menuItemMainFooter rubik-medium-moufit'> <b className='BoldItem'>{footerWidget4.label ?? footerWidget4.heading}: </b>{footerWidget4.desc ?? footerWidget4.info}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Item>
                                        </Grid>
                                    )
                                }
                                else if (section.is_active && section.label === "news_links"
                                    //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                                ) {
                                    return (
                                        <Grid className='footerColumn footerColumn5' item xs={12} md={2}>
                                            <Item className='footerItem footerItem5'>
                                                <div className='titleFooterLinks'>
                                                    <b><p className='titleWidget noyh-bold-moufit'>{section?.body?.title ?? footerAllTitles.title4}</p></b>
                                                </div>
                                                <p className='menuItemMainFooter rubik-medium-moufit cstmWidgit5Para'>{section?.body?.text ?? footerWidget5.text}</p>
                                                <div className='inputFieldNewsletter'>
                                                    <input className='inputFooter' type="text" placeholder='Email...' />
                                                    <button className='newsletterBtn'><img className='imageNewsletter' src='./MoufitMedia/newsletter.png' alt='newsletter' /></button>
                                                </div>
                                            </Item>
                                        </Grid>
                                    )
                                }
                                return null;
                            })}

                            {/* <Grid className='footerColumn footerColumn1' item xs={12} md={3}>
                                <Item className='footerItem footerItem1'>
                                    <div className='footerSection1'>
                                        <img className='footerLogo' src={footerWidget1.logo} />
                                        <div className='aboutText'>
                                            <p className='txtParaAbout rubik-ligt-moufit'>
                                                {footerWidget1.about}
                                            </p>
                                        </div>
                                        <div className='socialIcons'>
                                            <div className='socialIconFooter socialIconFooter1'>
                                                <a href={footerWidget1.facebook}>
                                                    <img src="./MoufitMedia/facebook.svg" alt='facebook' />
                                                </a>
                                            </div>
                                            <div className='socialIconFooter socialIconFooter2'>
                                                <a href={footerWidget1.twitter}>
                                                    <img src="./MoufitMedia/twitter.svg" alt='twitter' />
                                                </a>
                                            </div>
                                            <div className='socialIconFooter socialIconFooter2'>
                                                <a href={footerWidget1.instagram}>
                                                    <img src="./MoufitMedia/instagram.svg" alt='instagram' />
                                                </a>
                                            </div>
                                            <div className='socialIconFooter socialIconFooter2'>
                                                <a href={footerWidget1.linkedin}>
                                                    <img src="./MoufitMedia/linkedin.svg" alt='linkedin' />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Item>
                            </Grid>

                            <Grid className='footerColumn footerColumn2' item xs={12} md={2}>
                                <Item className='footerItem footerItem2'>
                                    <div className='quicklinks1Footer'>
                                        <div className='titleFooterLinks'>
                                            <b><p className='titleWidget noyh-bold-moufit'>{footerAllTitles.title1}</p></b>
                                        </div>
                                        <ul className='footerLinkList'>
                                            {footerWidget2Links.map((footerWidget2Links, index) => (
                                                <li key={index} className='liLinks'>

                                                    <Link className="menuItemMainFooter rubik-medium-moufit" to={footerWidget2Links.route} component={NavLink}>{footerWidget2Links.menuItem} </Link>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                </Item>
                            </Grid> */}

                            {/* <Grid className='footerColumn footerColumn3' item xs={12} md={2}>
                                <Item className='footerItem footerItem3'>
                                    <div className='quicklinks1Footer informationLinksFooter'>
                                        <div className='titleFooterLinks'>
                                            <b><p className='titleWidget noyh-bold-moufit'>{footerAllTitles.title2}</p></b>
                                        </div>
                                        <ul className='footerLinkList'>
                                            {footerWidget3Links.map((footerWidget3Links, index) => (
                                                <li key={index} className='liLinks'>
                                                    <Link className="menuItemMainFooter rubik-medium-moufit" to={footerWidget3Links.route} component={NavLink}>{footerWidget3Links.menuItem} </Link>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                </Item>
                            </Grid> */}
                            {/* <Grid className='footerColumn footerColumn4' item xs={12} md={3}>
                                <Item className='footerItem footerItem4'>
                                    <div className='contactInfoFooter'>
                                        <div className='titleFooterLinks'>
                                            <b><p className='titleWidget noyh-bold-moufit'>{footerAllTitles.title3}</p></b>
                                        </div>
                                        {footerWidget4.map((footerWidget4, index) => (
                                            <div key={index} className='addressFooter'>
                                                <p className='menuItemMainFooter rubik-medium-moufit'> <b className='BoldItem'>{footerWidget4.heading}</b>{footerWidget4.info}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Item>
                            </Grid> */}

                            {/* <Grid className='footerColumn footerColumn5' item xs={12} md={2}>
                                <Item className='footerItem footerItem5'>
                                    <div className='titleFooterLinks'>
                                        <b><p className='titleWidget noyh-bold-moufit'>{footerAllTitles.title4}</p></b>
                                    </div>
                                    <p className='menuItemMainFooter rubik-medium-moufit cstmWidgit5Para'>{footerWidget5.text}</p>
                                    <div className='inputFieldNewsletter'>
                                        <input className='inputFooter' type="text" placeholder='Email...' />
                                        <button className='newsletterBtn'><img className='imageNewsletter' src='./MoufitMedia/newsletter.png' alt='newsletter' /></button>
                                    </div>
                                </Item>
                            </Grid> */}
                        </Grid>
                    </Box>
                    <Box className='footerBottomRow' >
                            <Typography  className='txtParaAbout'>
                            2020 Moufit DMCC. Moufit DMCC is Registered & Licensed as a FREEZONE Company under the Rules & Regulations of DMCC. 
                            </Typography>
                            <Link to={'/terms-and-condition'}>
                               Terms & Conditions 
                            </Link>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default FooterMoufit