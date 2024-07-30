import React, { useState, useEffect } from 'react'
import './Navigation.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';

import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { NavLink, useLocation } from 'react-router-dom';
import MenuItemsComp from './MenuItemsComp';
import { setSingleBannerState } from '../../Helpers/apiCalls/globalApiCalls';


// const menuItems = [
//     {
//         title: 'Home',
//         url: '/',
//     },
//     {
//         title: 'Services',
//         url: '/services',
//         submenu: [
//             {
//                 title: 'web design',
//                 url: 'web-design',
//             },
//             {
//                 title: 'web development',
//                 url: 'web-dev',
//                 submenu: [
//                     {
//                         title: 'Frontend',
//                         url: 'frontend',
//                     },
//                     {
//                         title: 'Backend',
//                         submenu: [
//                             {
//                                 title: 'NodeJS',
//                                 url: 'node',
//                             },
//                             {
//                                 title: 'PHP',
//                                 url: 'php',
//                             },
//                         ],
//                     },
//                 ],
//             },
//             {
//                 title: 'SEO',
//                 url: 'seo',
//             },
//         ],
//     },
//     {
//         title: 'About',
//         url: '/about',
//         submenu: [
//             {
//                 title: 'Who we are',
//                 url: 'who-we-are',
//             },
//             {
//                 title: 'Our values',
//                 url: 'our-values',
//             },
//         ],
//     },
// ];


const pages = [
    { label: 'Home', link: '/' },
    { label: 'Locations', link: '/locations' },
    { label: 'About Us', link: '/about-us' },
    { label: 'Contact Us', link: '/contact-us' },
    { label: 'How it works', link: '/how-it-works' },
    { label: 'Subscriptions', link: '/subscriptions' },
    { label: 'Fitness and Lifestyle', link: '/lifestyle-&-fitness' }
];

function Navigation() {

    const location = useLocation();
    let locationPagePath = location.pathname;
    console.log("The current pathname", locationPagePath);
    // /location-page

    const [anchorElNav, setAnchorElNav] = useState(null);

    const [styles, setStyles] = useState(true);

    const [activeLinkIndex, setActiveLinkIndex] = useState(-1);

    // @@ NAV ARRAY !
    const [navData, setNavData] = useState([]);

    const [mainMenuVal, setMainMenuVal] = useState(null);
    // const [mainMenuVal, setMainMenuVal] = useState({
    //     menuId: '',
    //     menuTitle: '',
    //     menuArr: [],
    // });
    // useEffect(() => { }, [mainMenuVal]);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }


    let inputStyle = {};

    if (locationPagePath === "/location-page") {
        inputStyle = {
            color: '#2d2d2d',
            fontWeight: '600'
        };
    } else {
        inputStyle = {
            color: 'white',
        };
        // inputStyle.color = 'white';
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setActiveLinkIndex(-1);
        setAnchorElNav(null);
    };

    const handleLoginPage = () => { };


    const fetchNavigationList = async () => {

        const firstBannerCall = await setSingleBannerState("nav_section", 'global_customization', setNavData);
        console.log(firstBannerCall)
    };

    useEffect(() => {
        fetchNavigationList();
    }, []);

    useEffect(() => { }, [navData]);

    return (

        <>
            <AppBar className='MainMenuAppBar' position="static">
                <Container className='MainMenuContainer' maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link href="/">
                            {locationPagePath != "/location-page" && (
                                <>
                                    <img
                                        src= {navData?.nav_logo !== '' ? navData?.nav_logo : "/MoufitMedia/Moufit-new-dimensions.png"}
                                        className="LogoSiteMain"
                                        alt="Moufit Logo"
                                    />
                                </>
                            )}

                            {locationPagePath === "/location-page" && (
                                <>
                                    <img
                                        src= {navData?.nav_logo !== '' ? navData?.nav_logo : "/MoufitMedia/LogoColor.svg"}
                                        className="LogoSiteMain"
                                        alt="Moufit Logo"
                                    />
                                </>
                            )}
                        </Link>

                        {/* sx={styles?{'background':'red'}:{'background':'black'}} */}
                        <Box className='MobileMenuCstm' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                style={inputStyle}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                                className="MobileNavBtn"
                            >
                                {/* {pages.map((page, index) => ( */}
                                {(navData?.nav_data ?? mainMenuVal?.menuArr ?? pages).map((page, index) => (
                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                        <Link to={page?.link ?? '/no-page'} component={NavLink} className="moufit-link">
                                            <Typography className="noyh-regular-moufit moufit-black-color" textAlign="center">{page.label}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box className='MobileMenuLogoBox' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Link href="/">
                                {locationPagePath != "/location-page" && (
                                    <img
                                        src="/MoufitMedia/Moufit-new-dimensions.png"
                                        className="LogoSiteMobile"
                                        alt="Moufit Logo"
                                    />
                                )}
                                {locationPagePath === "/location-page" && (
                                    <>
                                        <img
                                            src="/MoufitMedia/LogoColor.svg"
                                            className="LogoSiteMobile"
                                            alt="Moufit Logo"
                                        />
                                    </>
                                )}
                            </Link>
                        </Box>

                        <Box
                            className='desktopMenu'
                            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* {pages.map((page) => ( */}
                            <ul className="menus">
                                {(navData?.nav_data ?? mainMenuVal?.menuArr ?? pages).map((menu, index) => {
                                    const depthLevel = 0;
                                    if (menu.children && !menu.children.length > 0) {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => console.log('workingg', index, menu)}
                                                className={index === activeLinkIndex ? 'active-link' : ''}
                                            >
                                                {menu.label}
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <MenuItemsComp
                                                items={menu}
                                                key={index}
                                                depthLevel={depthLevel}
                                                currentLink={window.location.pathname}
                                            />
                                        );
                                    }
                                })}
                            </ul>
                        </Box>

                        <Box>

                            {/* <Button
                                className='loginButton'
                                onClick={handleLoginPage}
                                variant="contained">
                                <Link to="/join-now" component={NavLink} className="moufit-btn-link">Login</Link>
                            </Button> */}
                            <Button
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                // variant='contained'
                            >
                                Join Now
                            </Button>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    <Link style={{textDecoration: 'none', color: 'black'}} to={'/join-now'} component={NavLink}>
                                                        <MenuItem onClick={handleClose}>As a Subscriber</MenuItem>
                                                    </Link>
                                                    <Link style={{textDecoration: 'none', color: 'black'}} to={'/join-as-partner'} component={NavLink}>
                                                        
                                                    <MenuItem onClick={handleClose}>As a Partner</MenuItem>
                                               </Link>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
};

export default Navigation;
