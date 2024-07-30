import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';

import HeaderBannerPages from '../../Components/Sections/HeaderBannerPages/HeaderBannerPages';
import HorizontalBtnBanner from '../../Components/Sections/HorizontalBtnBanner/HorizontalBtnBanner';
import IconBox from '../../Components/Sections/IconBox/IconBox';
import TextImageSec from '../../Components/Sections/TextImageSec/TextImageSec';
import SimpleImgSlider from '../../Components/Sections/SimpleImgSlider/SimpleImgSlider';
import TeamSlider from '../../Components/Sections/TeamSlider/TeamSlider';
import LoaderComp from '../../Components/Sections/Loader/LoaderComp';

import { fetchImgSrcListFromFirebase, getAllDocsWithinCollection, setSingleBannerState } from '../../Components/Helpers/apiCalls/globalApiCalls';

import './About.css';

const testDynamicObj = [
  { index: 0, is_active: true, label: 'main_banner', body: { title: 'About Us !' } },
  {
    index: 1, is_active: true, label: 'text_img_section', body: {
      title: '',
      sub_title: 'We exist to make fitness accessable to as many people as possible !',
      desc: 'Moufit partners with fitness service providers to create exciting fitness programs. These experiences draw the interest of people who dont normally particpate in the industry !',
      btn_text: '',
    }
  },
  {
    index: 2, is_active: true, label: 'icons_section', body: [
      { iconBoxHeading: "Personal Training !", iconBoxPara: "Book one on one time to achive your fitness goals faster." },
      { iconBoxHeading: "Consumer Gym Access !", iconBoxPara: "Access fitness facilities for one low monthly fee, cancel anytime, no hidden fees." },
      { iconBoxHeading: "Virtual Sessions !", iconBoxPara: "We offer a mix of pre recorded and live workout sessions when you cant make it." },
      { iconBoxHeading: "Class Bookings !", iconBoxPara: "Book classes in some of the most exclusive facilties in the Dubai and Sharjah" },
      { iconBoxHeading: "Personal Training !", iconBoxPara: "Book one on one time to achive your fitness goals faster." },
    ]
  },
  {
    index: 3, is_active: true, label: 'team_section', body: {
      heading: 'Meet The Team !',
      paragraph: 'We share a common interest to revolutionise the way fitness is consumed !',
      imgs_arr: [
        { teamMemberName: "Remi", teamMemberDesignation: "Marketing Intern" },
        { teamMemberName: "David Campbell", teamMemberDesignation: "CEO" },
        { teamMemberName: "Emmanuel", teamMemberDesignation: "Partner Relationships Manager" },
        { teamMemberName: "Remi", teamMemberDesignation: "Marketing Intern" },
      ]
    }
  },
  {
    index: 4, is_active: true, label: 'slider_section', body: {
      title: 'We have partnered with some of the Fitness Instituion !',
      imgs_arr: [
        { imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
      ]
    }
  },
  {
    index: 5, is_active: true, label: 'responsive_banner', body: {
      desktop_banner_text: 'Get started today !',
      desktop_btn_text: ' Join Now !',
      mobile_btn_text: 'Join Now !',
      mobile_banner_text: 'Get started today !',
    }
  }
];

function About() {

  const [dynamicSectionsObj, setDynamicSectionsObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [firstBannerImgs, setFirstBannerImgs] = useState({});
  const [secondBannerImg, setSecondBannerImg] = useState({});
  const [thirdBannerImg, setThirdBannerImg] = useState({});
  const [fourthBannerImg, setFourthBannerImg] = useState({});
  const [fifthBannerImg, setFifthBannerImg] = useState({});
  const [sixthBannerImg, setSixthBannerImg] = useState({});

  const getAboutSectionsFromFirebase = async () => {
    
    try {
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection("about_us_dynamic_page");
      };

      let resp = await fetchSections();
      setDynamicSectionsObj(resp);
      console.log(resp);

      setIsLoading(true);

      console.log("About Us  dynamicBannerCall", dynamicSectionsObj);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  // const getAboutSectionsFromFirebase = async () => {

  //   try {
  //     setIsLoading(true);
  //     // const dynamicBannerCall = await setSingleBannerState("about_page", 'pages_customization', setDynamicSectionsObj);
  //     const dynamicBannerCall = await setSingleBannerState("about_us_test_page", 'test_collection', setDynamicSectionsObj);

  //     console.log('dynamicBannerCall', dynamicBannerCall);
  //     setIsLoading(false);

  //   } catch (err) {
  //     console.log(err);
  //     setIsLoading(false);
  //   };

  // };

  const getAboutImgsFromFirebase = async () => {

    fetchFirstBannerImgs();
    fetchSecondBannerImg();
    fetchThirdBannerImgs();
    fetchFourthBannerImgs();
    fetchFifthBannerImgs();
    fetchSixthBannerImgs();

  };

  const fetchFirstBannerImgs = async () => {

    try {

      const firstBannerDesktopImg = await fetchImgSrcListFromFirebase('/about_page', '/first_banner_imgs', '/desktop_imgs');
      const firstBannerMobileImg = await fetchImgSrcListFromFirebase('/about_page', '/first_banner_imgs', '/mobile_imgs');

      setFirstBannerImgs({
        desktop_img: firstBannerDesktopImg[0]?.url ?? "/MoufitMedia/moufitPagesBanner.jpg",
        mobile_img: firstBannerMobileImg[0]?.url ?? "/MoufitMedia/overlay.png",
      });

    } catch (err) {
      console.error(err);
    };
  };

  const fetchSecondBannerImg = async () => {

    const imgUrl = await fetchImgSrcListFromFirebase('/about_page', '/second_banner_img');
    setSecondBannerImg(imgUrl[0]?.url ?? "/MoufitMedia/ABOUT.png");

  };

  const fetchThirdBannerImgs = async () => {

    const imgList = await fetchImgSrcListFromFirebase('/about_page', '/third_banner_img');
    setThirdBannerImg(imgList ?? "/MoufitMedia/iconBox.svg");

  };

  const fetchFourthBannerImgs = async () => {

    const imgList = await fetchImgSrcListFromFirebase('/about_page', '/fourth_banner_img');
    setFourthBannerImg(imgList ?? "/MoufitMedia/iconBox.svg");

  };

  const fetchFifthBannerImgs = async () => {

    const imgList = await fetchImgSrcListFromFirebase('/about_page', '/fifth_banner_img');
    // const imgSrc = await fetchImgSrcListFromFirebase('/home_page', '/fourth_banner_img');
    // console.log(imgList)
    setFifthBannerImg(imgList ?? "/MoufitMedia/iconBox.svg");

  };

  const fetchSixthBannerImgs = async () => {

    const imgDesktopList = await fetchImgSrcListFromFirebase('/about_page', '/sixth_banner_img', '/desktop_imgs');
    const imgMobileList = await fetchImgSrcListFromFirebase('/about_page', '/sixth_banner_img', '/mobile_imgs');

    setSixthBannerImg({
      desktop_img: imgDesktopList[0]?.url ?? "/MoufitMedia/iconBox.svg",
      mobile_img: imgMobileList[0]?.url ?? "/MoufitMedia/iconBox.svg",
    });

  };

  useEffect(() => {

    getAboutSectionsFromFirebase();
    getAboutImgsFromFirebase();

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => { }, [
    firstBannerImgs, secondBannerImg,
    thirdBannerImg, fourthBannerImg,
    fifthBannerImg, sixthBannerImg
  ]);

  useEffect(() => { }, [dynamicSectionsObj]);

  useEffect(() => { }, [isLoading]);

  return (
    <>
      <div className='about-page'>
        {isLoading ? (
          <LoaderComp />
        ) : (
          <>
            {dynamicSectionsObj?.sort((a, b) => a.index - b.index)?.map((section, ind) => {

              // @@ section.is_active && section.label === "main_banner" ?
              //  (<1stcomp></1stcomp>) : section.label === "three_col" ?
              //  (<2ndcomp></2ndcomp>) : null

              if (section.is_active) {

                if (section.label === "main_banner"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <HeaderBannerPages imgData={section?.body ?? firstBannerImgs} text={section?.body?.title ?? "About Us"} />
                  )
                } else if (section.label === "text_img_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <Container sx={{ mt: 8, mb: 8 }}>
                      <TextImageSec data={{
                        secHeading: section?.body?.title ?? "",
                        secSubHeading: section?.body?.sub_title ?? "We exist to make fitness accessable to as many people as possible",
                        secPara: section?.body?.desc ?? "Moufit partners with fitness service providers to create exciting fitness programs. These experiences draw the interest of people who dont normally particpate in the industry.",
                        secBtnLink: "",
                        secBtnText: section?.body?.btn_text ?? "",
                        rightImageLink: section?.body?.imgSrc ?? secondBannerImg ?? "/MoufitMedia/ABOUT.png",
                      }} />
                    </Container>
                  )
                } else if (section.label === "icons_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <IconBox
                      defaultImg='/MoufitMedia/iconBox.svg'
                      newImgsArr={section?.body.dynamic_section || thirdBannerImg || [{ url: "/MoufitMedia/iconBox.svg" }]}
                      data={section?.body.dynamic_section ?? [
                        { iconImageSrc: "/MoufitMedia/iconBox.svg", iconBoxHeading: "Personal Training", iconBoxPara: "Book one on one time to achive your fitness goals faster." },
                        { iconImageSrc: "/MoufitMedia/iconBox.svg", iconBoxHeading: "Consumer Gym Access", iconBoxPara: "Access fitness facilities for one low monthly fee, cancel anytime, no hidden fees." },
                        { iconImageSrc: "/MoufitMedia/iconBox.svg", iconBoxHeading: "Virtual Sessions", iconBoxPara: "We offer a mix of pre recorded and live workout sessions when you cant make it." },
                        { iconImageSrc: "/MoufitMedia/iconBox.svg", iconBoxHeading: "Class Bookings", iconBoxPara: "Book classes in some of the most exclusive facilties in the Dubai and Sharjah" },
                        { iconImageSrc: "/MoufitMedia/iconBox.svg", iconBoxHeading: "Personal Training", iconBoxPara: "Book one on one time to achive your fitness goals faster." },
                      ]}
                    />
                  )
                } else if (section.label === "team_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <>
                      <TeamSlider titleTeam={{
                        heading: section?.body?.title ?? section?.body?.heading ?? "Meet The Team",
                        paragraph: section?.body?.description ?? section?.body?.paragraph ?? "We share a common interest to revolutionise the way fitness is consumed.",
                        defaultImg: "/MoufitMedia/member1.jpg"
                      }}
                        newImgsArr={section?.body?.dynamic_section || fourthBannerImg || [{ url: '/MoufitMedia/member1.jpg' }]}
                        data={section?.body?.dynamic_section ?? [
                          { teamImageSrc: "/MoufitMedia/member1.jpg", teamMemberName: "Remi", teamMemberDesignation: "Marketing Intern" },
                          { teamImageSrc: "/MoufitMedia/member2.jpg", teamMemberName: "David Campbell", teamMemberDesignation: "CEO" },
                          { teamImageSrc: "/MoufitMedia/member3.jpg", teamMemberName: "Emmanuel", teamMemberDesignation: "Partner Relationships Manager" },
                          { teamImageSrc: "/MoufitMedia/member1.jpg", teamMemberName: "Remi", teamMemberDesignation: "Marketing Intern" },
                        ]} />
                    </>
                  )
                } else if (section.label === "slider_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <>
                      <SimpleImgSlider title={section?.body?.title} body={section.body} pictures={fifthBannerImg ?? section?.body?.imgs_arr ?? [
                        { imgSrc: '/MoufitMedia/sliderImage1.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                        { imgSrc: '/MoufitMedia/sliderImage2.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                        { imgSrc: '/MoufitMedia/sliderImage3.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                        { imgSrc: '/MoufitMedia/sliderImage3.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                        { imgSrc: '/MoufitMedia/sliderImage2.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                      ]} />
                    </>
                  )
                } else if (section.label === "responsive_banner"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <HorizontalBtnBanner
                      data={{
                        DesktopBannerImg: sixthBannerImg?.desktop_img ?? "./MoufitMedia/startTodayDesktop.png",
                        txtCstmBannerDesktop: section?.body?.desktop_banner_text ?? "Get started today",
                        btnTextDesktop: section?.body?.desktop_btn_text ?? "Join Now",
                        MobileBannerImg: sixthBannerImg?.mobile_img ?? "./MoufitMedia/startTodayMovile.png",
                        txtCstmBannerMobile: section?.body?.mobile_banner_text ?? "Get started today",
                        btnTextMobile: section?.body?.mobile_btn_text ?? "Join Now"
                      }}
                    />
                  )
                }
              }
              return null;
            })}
          </>
        )}
      </div>
    </>
  )
};

export default About;