import React, { useEffect, useState } from 'react';

import Mainbanner from '../../Components/Sections/MainBanner/Mainbanner';
import TextImageSec from '../../Components/Sections/TextImageSec/TextImageSec';
import ThreeColumn from '../../Components/Sections/ThreeColumn/ThreeColumn';
import SliderSection from '../../Components/Sections/SliderSection/SliderSection';
import WhyUs from '../../Components/Sections/WhyUs/WhyUs';
import PricingHome from '../../Components/Sections/PricingHome/PricingHome';
import HorizontalBtnBanner from '../../Components/Sections/HorizontalBtnBanner/HorizontalBtnBanner';
import Articles from '../../Components/Sections/Articles/Articles';

import { fetchImgSrcListFromFirebase, getAllDocsWithinCollection, getSingleColletionFromFirebase, setSingleBannerState } from '../../Components/Helpers/apiCalls/globalApiCalls';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import LoaderComp from '../../Components/Sections/Loader/LoaderComp';

import YAML from 'js-yaml';
import SimpleImgSlider from '../../Components/Sections/SimpleImgSlider/SimpleImgSlider';

const testDynamicSections = [
  { index: 0, is_active: true, label: 'main_banner', body: { title: 'The best Gym in Dubai & Sharjah !', desc: 'Access them all wth one subscription !' } },
  {
    index: 1, is_active: true, label: 'three_col', body: {
      col1: { title: 'Gym Access !', desc: 'Get access to 29 gyms spread over Dubai & Sharjah for AED 299 per month !' },
      col2: { title: 'Book Classes !', desc: "Book classes at Dubai's most famous fitness clubs !" },
      col3: { title: 'Personal Training !', desc: 'Book sessions with the best trainers in the UAE !' },
    },
  },
  { index: 2, is_active: true, label: 'text_img_section', body: { title: 'About Us !', sub_title: 'We offer affordable access to the best fitness institutions in the UAE !', desc: 'We have been working quitely since May 2019 to bring the best fitness experience to the UAE !', btn_text: 'More About US !' } },

  {
    index: 3, is_active: true, label: 'slider_section', body: {
      title: 'We have partnered with some of the Fitness Instituion !',
      imgs_arr: [
        { slideHeading: 'Fit Boys Marina !', slidePara: 'Marina, Dubai !' },
        { slideHeading: 'Fit Boys Marina !', slidePara: 'Marina, Dubai !' },
        { slideHeading: 'Fit Boys Marina !', slidePara: 'Marina, Dubai !' },
        { slideHeading: 'Fit Boys Marina !', slidePara: 'Marina, Dubai !' },
        { slideHeading: 'Fit Boys Marina !', slidePara: 'Marina, Dubai !' },
        { slideHeading: 'Fit Boys Marina !', slidePara: 'Marina, Dubai !' },
      ],
    },
  },

  {
    index: 4, is_active: true, label: 'why_us_section', body: {
      right_section: {
        title: 'YOUR BENEFITS'
      },
      left_section: {
        title: 'Why Choose Us',
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
        },
      },
    },
  },

  {
    index: 5, is_active: true, label: 'pricing_section', body: {
      heading: '',
      sub_heading: '',
      plans_section: [
        {
          access: "Gym Access",
          plan: "Pro Plan",
          price: "AED299",
          duration: "monthly",
          features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees", "Cancel Anytime", "Exclusive Member Benefits"]
        },
        {
          access: "Gym Access",
          plan: "Pro Plan",
          price: "AED299",
          duration: "monthly",
          features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees"]

        },
        {
          access: "Gym Access",
          plan: "Pro Plan",
          price: "AED299",
          duration: "monthly",
          features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees", "Cancel Anytime"]

        },
      ],
    },
  },
  {
    index: 6, is_active: true, label: 'responsive_banner', body: {
      desktop_banner_text: 'Get started today !',
      desktop_btn_text: ' Join Now !',
      mobile_btn_text: 'Join Now !',
      mobile_banner_text: 'Get started today !',
    },
  },
  {
    index: 7, is_active: true, label: 'articles_section', body: {
      title: 'Our Recent Articles !',
      desc: ' Gain access to dubais best collection of boutique gyms for one low monthly price !',
      imgs_arr: [
        { captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
        { captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
        { captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
      ],
    },
  },
];


function Home() {

  const [dynamicSectionsObj, setDynamicSectionsObj] = useState([]);
  const [subscriptionList, setSubscriptionList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [firstBannerImg, setFirstBannerImg] = useState('');
  const [secondBannerImgs, setSecondBannerImgs] = useState({
    first_col: '',
    second_col: '',
    third_col: ''
  });
  const [thirdBannerImg, setThirdBannerImg] = useState('');
  const [fourthBannerImgs, setFourthBannerImgs] = useState('');
  const [fifthBannerImgs, setFifthBannerImgs] = useState({
    right_section: '',
    left_section: {
      left_col: '',
      right_col: '',
    },
  });
  const [seventhBannerImgs, setSeventhBannerImgs] = useState({
    desktop_img: [],
    mobile_img: [],
  });
  const [eighthBannerImgs, setEighthBannerImgs] = useState([]);
  const [ninthBannerImg, setNinthBannerImg] = useState('');

  // @@ Fetching data from firebase and setting state variables for banner images
  const getHomeSectionsFromFirebase = async () => {
    try {
      getSingleColletionFromFirebase('home_dynamic_approach_test');
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection('home_dynamic_approach_test')
      };
      let resp = fetchSections().then(data => {
        console.log(data)
        setDynamicSectionsObj(data);
        // setValue("hCPForm.dynamicSectionsArr", data);
  
        // data.map((y,yInd) => {
        //   setValue(`hCPForm.${y.index}-${y.label}`, getValues(`hCPForm.dynamicSectionsArr[${yInd}]`))
        // })
  
      })
      console.log(resp)

      setIsLoading(true);
      // const dynamicBannerCall = await setSingleBannerState("home_page", 'pages_customization', setDynamicSectionsObj);
      // const dynamicCollectionCall = await setSingleCollectionState("home_test_page", 'test_collection', setDynamicSectionsObj);
      // const dynamicBannerCall = await setSingleBannerState("home_test_page", 'test_collection', setDynamicSectionsObj);


      console.log('HOME dynamicBannerCall', dynamicSectionsObj);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };


  const getHomeImgsFromFirebase = async () => {

    fetchFirstBannerImgs();
    fetchSecondBannerImgs();
    fetchThirdBannerImgs();
    fetchFifthBannerImgs();
    fetchSeventhBannerImgs();
    fetchEighthBannerImgs();
    fetchFourthBannerImgs();
    fetchNinthBannerImgs();

  };


  // @@ MAKE DYNAMIC FUNC TO STORE IMG URL INTO STATE !
  const fetchFirstBannerImgs = async () => {

    const firstBannerImg = await fetchImgSrcListFromFirebase('/home_page', '/first_banner_img');
    setFirstBannerImg(firstBannerImg[0]?.url ?? "\MoufitMedia\overlay.png");
    // console.log("Image URL:", imageURL);

  };

  const fetchSecondBannerImgs = async () => {

    const first_col_img = await fetchImgSrcListFromFirebase('/home_page', '/second_banner_img', '/first_col');
    const second_col_img = await fetchImgSrcListFromFirebase('/home_page', '/second_banner_img', '/second_col');
    const third_col_img = await fetchImgSrcListFromFirebase('/home_page', '/second_banner_img', '/third_col');

    setSecondBannerImgs({
      first_col: first_col_img[0]?.url ?? "/MoufitMedia/col1.svg",
      second_col: second_col_img[0]?.url ?? "/MoufitMedia/col2.svg",
      third_col: third_col_img[0]?.url ?? "/MoufitMedia/col3.svg"
    });

  };

  const fetchThirdBannerImgs = async () => {

    const imgSrc = await fetchImgSrcListFromFirebase('/home_page', '/third_banner_img');
    setThirdBannerImg(imgSrc[0]?.url ?? "/MoufitMedia/gymAbout.jpg");
  };

  const fetchFourthBannerImgs = async () => {
    const imgSrc = await fetchImgSrcListFromFirebase('/home_page', '/fourth_banner_img');
    setFourthBannerImgs(imgSrc ?? "/MoufitMedia/gymAbout.jpg");

  }
  const fetchFifthBannerImgs = async () => {

    const rightSectionImg = await fetchImgSrcListFromFirebase('/home_page', '/fifth_banner_img', '/right_section');
    const leftSectionImgArr = await fetchImgSrcListFromFirebase('/home_page', '/fifth_banner_img', '/left_section', '/left_col');
    const rightSectionImgArr = await fetchImgSrcListFromFirebase('/home_page', '/fifth_banner_img', '/left_section', '/right_col');

    // console.log(leftSectionImgArr);

    setFifthBannerImgs({
      left_section: {
        left_col: leftSectionImgArr,
        right_col: rightSectionImgArr
      },
      right_section: rightSectionImg[0]?.url,
    });

  };

  const fetchSeventhBannerImgs = async () => {

    const desktopImgsArr = await fetchImgSrcListFromFirebase('/home_page', '/seventh_banner_img', '/desktop_img');
    const mobileImgsArr = await fetchImgSrcListFromFirebase('/home_page', '/seventh_banner_img', '/mobile_img');

    setSeventhBannerImgs({
      desktop_img: desktopImgsArr,
      mobile_img: mobileImgsArr
    });

  };

  const fetchEighthBannerImgs = async () => {
    // gs://moufit-prod.appspot.com/home_page/second_banner_img/col1.svg
    const imgSrcArr = await fetchImgSrcListFromFirebase('/home_page', '/eigth_banner_img');
    // console.log("Image URL:", imageURL);

    setEighthBannerImgs(imgSrcArr);

  };

  const fetchNinthBannerImgs = async () => {
    const ninthBannerImg = await fetchImgSrcListFromFirebase('/home_page', '/ninth_banner_img');
    // console.log("Image URL:", imageURL);
    setNinthBannerImg(ninthBannerImg ?? "./MoufitMedia/article1.jpg");
  };

  const fetchSubscriptionsList = async () => {
    try {
      const resp = await axios.get(' https://us-central1-moufit-prod.cloudfunctions.net/api/plan/fetch-subscription-plans');
      console.log('resp', resp);
      console.log(resp)
      if (resp?.data?.success) {
        setSubscriptionList(resp?.data?.plans?.list ?? []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    getHomeSectionsFromFirebase();
    getHomeImgsFromFirebase();
    fetchSubscriptionsList();

  }, []);

  useEffect(() => { }, [isLoading]);

  useEffect(() => { }, [dynamicSectionsObj]);

  useEffect(() => { }, [subscriptionList]);

  useEffect(() => { },
    [
      firstBannerImg, secondBannerImgs,
      thirdBannerImg, fourthBannerImgs, fifthBannerImgs,
      seventhBannerImgs, eighthBannerImgs,
      ninthBannerImg
    ]);

  return (
    <>
      <div className='home fullwidth-moufit'>
        {/* {!dynamicSectionsObj ?? <div style={{width: '100%', backgroundColor: 'red', padding: '4em'}}>'Loading...'</div>} */}
        {isLoading ? (
          <LoaderComp />
        ) : (
          <>
            {/* {dynamicSectionsObj?.dynamic_sections?.sort((a, b) => a.index - b.index)?.map((section, ind) => { */}
            {dynamicSectionsObj?.sort((a, b) => a.index - b.index)?.map((section, ind) => {


              // @@ section.is_active && section.label === "main_banner" ?
              //  (<1stcomp></1stcomp>) : section.label === "three_col" ?
              //  (<2ndcomp></2ndcomp>) : null

              if (section.is_active) {

                if (section.label === "main_banner"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <Mainbanner data={{
                      firstBannerObj: section?.body,
                      imgUrl: section?.body?.imgUrl ?? firstBannerImg
                    }} />
                  )
                } else if (section.label === "three_col"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <ThreeColumn data={{
                      col1: {
                        data: section?.body?.col1,
                        src: section?.body?.col1.imgSrc ?? secondBannerImgs?.first_col,
                      },
                      col2: {
                        data: section?.body?.col2,
                        src: section?.body?.col2.imgSrc ?? secondBannerImgs?.second_col
                      },
                      col3: {
                        data: section?.body?.col3,
                        src: section?.body?.col3.imgSrc ?? secondBannerImgs?.third_col
                      },
                    }} />
                  )
                } else if (section.label === "text_img_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <TextImageSec data={{
                      secHeading: section?.body?.title ?? "About Us",
                      secSubHeading: section?.body?.sub_title ?? "We offer affordable access to the best fitness institutions in the UAE.",
                      secPara: section?.body?.desc ?? "We have been working quitely since May 2019 to bring the best fitness experience to the UAE.",
                      secBtnLink: section?.body?.btn_link ?? "/",
                      secBtnText: section?.body?.btn_text ?? "More About US",
                      rightImageLink: section?.body?.imgUrl ?? thirdBannerImg ?? "/MoufitMedia/gymAbout.jpg",
                      // rightImageLink: "/MoufitMedia/gymAbout.jpg",

                    }} />
                  )
                } else if (section.label === "slider_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                 
                      <SimpleImgSlider title={section?.body?.title ?? ''} pictures={section?.body?.slider_arr ?? section?.body?.imgs_arr ?? [
                        { imgSrc: '/MoufitMedia/sliderImage1.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                        { imgSrc: '/MoufitMedia/sliderImage2.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                        { imgSrc: '/MoufitMedia/sliderImage3.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                        { imgSrc: '/MoufitMedia/sliderImage3.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                        { imgSrc: '/MoufitMedia/sliderImage2.png', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                      ]} />
                    
                  )
                } else if (section.label === "why_us_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <WhyUs imgData={{
                      left_col: section.body?.left_section.dynamic_section.left_col ?? fifthBannerImgs?.left_section?.left_col,
                      right_col: section.body?.left_section.dynamic_section.right_col ?? fifthBannerImgs?.left_section?.right_col,
                      right_section: section.body?.right_section?.imgUrl ?? fifthBannerImgs?.right_section,

                    }} data={section?.body} />
                  )
                } else if (section.label === "pricing_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <PricingHome
                      mainPara={{
                        heading: section?.body?.heading ?? "Our Pricing Packages",
                        sub_heading: section?.body?.sub_heading ?? "Gain access to dubais best collection of boutique gyms for one low monthly price.",
                      }}
                      priceData={subscriptionList}
                      data={section?.body?.plans_section ?? [
                        {
                          access: "Gym Access",
                          plan: "Pro Plan",
                          price: "AED299",
                          duration: "monthly",
                          features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees", "Cancel Anytime", "Exclusive Member Benefits"]

                        },
                        {
                          access: "Gym Access",
                          plan: "Pro Plan",
                          price: "AED299",
                          duration: "monthly",
                          features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees"]

                        },
                        {
                          access: "Gym Access",
                          plan: "Pro Plan",
                          price: "AED299",
                          duration: "monthly",
                          features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees", "Cancel Anytime"]

                        },
                      ]} />
                  )
                } else if (section.label === "responsive_banner"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <HorizontalBtnBanner
                      data={{
                        DesktopBannerImg: section.body.imgUrl ?? seventhBannerImgs?.desktop_img[0]?.url ?? "./MoufitMedia/startTodayDesktop.png",
                        txtCstmBannerDesktop: section?.body?.desktop_banner_text ?? "Get started today",
                        btnTextDesktop: section?.body?.desktop_btn_text ?? "Join Now",
                        MobileBannerImg: section.body.imgUrl ?? seventhBannerImgs?.mobile_img[0]?.url ?? "./MoufitMedia/startTodayMovile.png",
                        txtCstmBannerMobile: section?.body?.mobile_banner_text ?? "Get started today",
                        btnTextMobile: section?.body?.mobile_btn_text ?? "Join Now",
                        btnLink: section?.body?.btn_link
                      }}
                    />
                  )
                } else if (section.label === "articles_section"
                  //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                ) {
                  return (
                    <Articles
                      intro={{
                        heading: section?.body?.title ?? "Our Recent Articles",
                        paragraph: section?.body?.desc ?? "Gain access to dubais best collection of boutique gyms for one low monthly price.",
                        defaultSrc: './MoufitMedia/article1.jpg',
                      }}
                      newImgsArr={ninthBannerImg}
                      data={section?.body?.dynamic_section ??
                        [
                          { imgSrc: './MoufitMedia/article1.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "a" },
                          { imgSrc: './MoufitMedia/article2.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
                          { imgSrc: './MoufitMedia/article3.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
                        ]
                      }
                      imgData={eighthBannerImgs}

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

export default Home;