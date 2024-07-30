import React, { useEffect, useState } from 'react';
import Faqs from '../../Components/Sections/Faqs/Faqs';
import HeaderBannerPages from '../../Components/Sections/HeaderBannerPages/HeaderBannerPages';
import HorizontalBtnBanner from '../../Components/Sections/HorizontalBtnBanner/HorizontalBtnBanner';
import PricingHome from '../../Components/Sections/PricingHome/PricingHome';
import { fetchImgSrcListFromFirebase, getAllDocsWithinCollection, getSingleFirebaseDocById, setSingleBannerState } from '../../Components/Helpers/apiCalls/globalApiCalls';
import { CircularProgress } from '@mui/material';
import LoaderComp from '../../Components/Sections/Loader/LoaderComp';

const testDynamicSections = [
  { label: 'main_banner', index: 0, is_active: true, body: { title: 'SUBSCRIPTIONS !' } },
  {
    label: 'plans_section', index: 1, is_active: true, body: [
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
    ]
  },
  {
    label: 'faqs_section', index: 0, is_active: true, body: {

      accordions_section: [
        { title: "Accordion 1 !", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
        { title: "Accordion 2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
        { title: "Accordion 3 !", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
        { title: "Accordion 4", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
      ]
    }
  },
];

function Subscriptions() {

  const [dynamicBannerObj, setDynamicBannerObj] = useState([]);
  const [firstBannerImgs, setFirstBannerImgs] = useState({});

  const [fourthBannerImgs, setFourthBannerImgs] = useState({
    desktop_img: [],
    mobile_img: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const getSubscriptionSectionsFromFirebase = async () => {
    
    try {
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection("subscriptions_dynamic_page");
      };

      let resp = await fetchSections();
      setDynamicBannerObj(resp);
      console.log(resp);

      setIsLoading(true);

      console.log("COntact Us  dynamicBannerCall", dynamicBannerObj);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  // const getSubscriptionSectionsFromFirebase = async () => {
  //   try {

  //     setIsLoading(true);
  //     // const dynamicBannerCall = await setSingleBannerState("subscriptions_page", 'pages_customization', setDynamicBannerObj);
  //     const dynamicBannerCall = await setSingleBannerState('subscriptions_test_page', 'test_collection', setDynamicBannerObj);

  //     console.log('dynamicBannerCall', dynamicBannerCall);
  //     setIsLoading(false);
  //     console.log('dynamicBannerObj?.dynmaic_sections', dynamicBannerObj.dynamic_sections)

  //   } catch (error) {
  //     console.error(error);
  //     setIsLoading(false);

  //   };

  // };

  useEffect(() => { }, [isLoading]);

  const getSubscriptionImgsFromFirebase = async () => {

    fetchFirstBannerImgs();
    fetchFourthBannerImgs();

  };

  const fetchFirstBannerImgs = async () => {

    try {

      const firstBannerDesktopImg = await fetchImgSrcListFromFirebase('/subscriptions_page', '/first_banner_imgs', '/desktop_imgs');
      const firstBannerMobileImg = await fetchImgSrcListFromFirebase('/subscriptions_page', '/first_banner_imgs', '/mobile_imgs');

      setFirstBannerImgs({
        desktop_img: firstBannerDesktopImg[0]?.url ?? "/MoufitMedia/moufitPagesBanner.jpg",
        mobile_img: firstBannerMobileImg[0]?.url ?? "/MoufitMedia/overlay.png",
      });

    } catch (err) {
      console.error(err);
    };

  };

  const fetchFourthBannerImgs = async () => {

    const desktopImgsArr = await fetchImgSrcListFromFirebase('/subscriptions_page', '/fourth_banner_img', '/desktop_img');
    const mobileImgsArr = await fetchImgSrcListFromFirebase('/subscriptions_page', '/fourth_banner_img', '/mobile_img');
    // console.log("Image LIST:", imageURL);

    setFourthBannerImgs({
      desktop_img: desktopImgsArr,
      mobile_img: mobileImgsArr
    });

  };

  useEffect(() => {

    getSubscriptionSectionsFromFirebase();
    getSubscriptionImgsFromFirebase();

    window.scrollTo(0, 0);

  }, []);

  useEffect(() => { }, [dynamicBannerObj]);

  useEffect(() => { }, [firstBannerImgs, fourthBannerImgs]);

  return (
    <>
    {isLoading ? (
       <LoaderComp />
      ) : (
        <>
        {dynamicBannerObj?.sort((a, b) => a.index - b.index)?.map((section, ind) => {
          if (section.is_active && section.label === "main_banner"
            //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
          ) {
            return <HeaderBannerPages imgData={firstBannerImgs} text={section?.body?.title ?? "SUBSCRIPTION"} />
  
          } else if (section.is_active && section.label === "plans_section"
            //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
          ) {
            return <PricingHome
              info={{
                title: section?.body?.heading,
                sub_title: section?.body?.sub_heading
              }}
              data={section?.body?.features ?? [
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
          } else if (section.is_active && section.label === "faqs_section"
            //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
          ) {
            return <Faqs body={section.body}  data={section?.body.accordions_section ?? [
              { title: "Accordion 1", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
              // { title: "Accordion 2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
              // { title: "Accordion 3", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
              // { title: "Accordion 4", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
            ]} />
  
          } else if (section.is_active && section.label === "responsive_banner"
            //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
          ) {
            return <HorizontalBtnBanner
              data={{
                DesktopBannerImg: fourthBannerImgs?.desktop_img[0]?.url ?? "./MoufitMedia/startTodayDesktop.png",
                txtCstmBannerDesktop: section?.body?.desktop_banner_text ?? "Get started today",
                btnTextDesktop: section?.body?.desktop_btn_text ?? "Join Now",
                MobileBannerImg: fourthBannerImgs?.mobile_img[0]?.url ?? "./MoufitMedia/startTodayMovile.png",
                txtCstmBannerMobile: section?.body?.mobile_banner_text ?? "Get started today",
                btnTextMobile: section?.body?.mobile_btn_text ?? "Join Now"
              }}
            />
          }
          return null;
        })}
        </>
      )}
    </>
  )
};

export default Subscriptions;