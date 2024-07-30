import React, { useState, useEffect } from "react";
import HeaderBannerPages from "../../Components/Sections/HeaderBannerPages/HeaderBannerPages";
import WhyUs from "../../Components/Sections/WhyUs/WhyUs";
import {
  fetchImgSrcListFromFirebase,
  getAllDocsWithinCollection,
  setSingleBannerState,
} from "../../Components/Helpers/apiCalls/globalApiCalls";
import { CircularProgress } from "@mui/material";
import LoaderComp from "../../Components/Sections/Loader/LoaderComp";

const testDynamicObj = [
  {
    label: "main_banner",
    index: 0,
    is_active: true,
    body: { title: "How It Works !" },
  },
  {
    index: 1,
    is_active: true,
    label: "why_us_section",
    body: {
      right_section: {
        title: "",
      },
      left_section: {
        title: "How It Works !",
        desc: "Sign up today, get instant access!",
        dynamic_section: {
          right_col: [
            {
              heading: "50+ Locations !",
              sub_heading:
                "Access any of our locations once per day with one subscription !",
            },
            {
              heading: "50+ GYMS !",
              sub_heading:
                "Access any of our GYMS once per day with one subscription !",
            },
            {
              heading: "50+ Locations !",
              sub_heading:
                "Access any of our GYMS once per day with one subscription !",
            },
          ],
          left_col: [
            {
              heading: "50+ Locations !",
              sub_heading:
                "Access any of our locations once per day with one subscription !",
            },
            {
              heading: "50+ GYMS !",
              sub_heading:
                "Access any of our GYMS once per day with one subscription !",
            },
            {
              heading: "50+ Locations !",
              sub_heading:
                "Access any of our GYMS once per day with one subscription !",
            },
          ],
        },
      },
    },
  },
];

function HowItWorks() {
  const [dynamicSectionsObj, setDynamicSectionsObj] = useState({});

  const [firstBannerImgs, setFirstBannerImgs] = useState({});
  const [secondBannerImgs, setSecondBannerImgs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const getHowItWorksSectionsFromFirebase = async () => {
  //   try {

  //     setIsLoading(true);
  //     // const dynamicBannerCall = await setSingleBannerState("how_it_works_section", 'pages_customization', setDynamicSectionsObj);
  //     const dynamicBannerCall = await setSingleBannerState("how_it_works_test_page", 'test_collection', setDynamicSectionsObj);

  //     console.log('dynamicBannerCall', dynamicBannerCall);
  //     setIsLoading(false);

  //   } catch (err) {
  //     console.error(err);
  //     setIsLoading(false);
  //   };
  // };

  const getHowItWorksSectionsFromFirebase = async () => {
    
    try {
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection("how_it_works_dynamic_page");
      };

      let resp = await fetchSections();
      setDynamicSectionsObj(resp);
      console.log(resp);

      setIsLoading(true);

      console.log("COntact Us  dynamicBannerCall", dynamicSectionsObj);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {}, [isLoading]);

  const getHowItWorksImgsFromFirebase = async () => {
    fetchFirstBannerImgs();
    fetchSecondBannerImgs();
  };

  const fetchFirstBannerImgs = async () => {
    try {
      const firstBannerDesktopImg = await fetchImgSrcListFromFirebase(
        "/how-it-works_page",
        "/first_banner_imgs",
        "/desktop_imgs"
      );
      const firstBannerMobileImg = await fetchImgSrcListFromFirebase(
        "/how-it-works_page",
        "/first_banner_imgs",
        "/mobile_imgs"
      );

      setFirstBannerImgs({
        desktop_img:
          firstBannerDesktopImg[0]?.url ?? "/MoufitMedia/moufitPagesBanner.jpg",
        mobile_img: firstBannerMobileImg[0]?.url ?? "/MoufitMedia/overlay.png",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSecondBannerImgs = async () => {
    const rightSectionImg = await fetchImgSrcListFromFirebase(
      "/how-it-works_page",
      "/second_banner_imgs",
      "/right_section_imgs"
    );
    // const leftSectionImgArr = await fetchImgSrcListFromFirebase('/how-it-works_page', '/second_banner_imgs', '/left_section_imgs', '/left_col_imgs');
    // const rightSectionImgArr = await fetchImgSrcListFromFirebase('/how-it-works_page', '/second_banner_imgs', '/left_section_imgs', '/right_col_imgs');
    const leftSectionImgArr = await fetchImgSrcListFromFirebase(
      "/home_page",
      "/fifth_banner_img",
      "/left_section",
      "/left_col"
    );
    const rightSectionImgArr = await fetchImgSrcListFromFirebase(
      "/home_page",
      "/fifth_banner_img",
      "/left_section",
      "/right_col"
    );
    // console.log(leftSectionImgArr);

    setSecondBannerImgs({
      left_section: {
        left_col: leftSectionImgArr,
        right_col: rightSectionImgArr,
      },
      right_section: rightSectionImg[0]?.url ?? "/MoufitMedia/yourBenefits.jpg",
    });
  };

  useEffect(() => {
    getHowItWorksImgsFromFirebase();
    getHowItWorksSectionsFromFirebase();
  }, []);

  useEffect(() => {}, [dynamicSectionsObj]);

  useEffect(() => {}, [firstBannerImgs, secondBannerImgs]);

  return (
    <>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <>
        {/* dynamicSectionsObj?.dynamic_sections || */}
          {dynamicSectionsObj
            ?.sort((a, b) => a.index - b.index)
            ?.map((section, ind) => {
              if (section?.is_active && section?.label === "main_banner") {
                return (
                  <HeaderBannerPages
                    imgData={section?.body}
                    text={section?.body?.title ?? "How it Works"}
                  />
                );
              } else if (
                section?.is_active &&
                section?.label === "why_us_section"
              ) {
                return (
                  <WhyUs
                    styles={{
                      padding: "10px",
                      marginTop: "15px",
                      imgWidth: "71%",
                    }}
                    hasBtn={true}
                    data={section?.body}
                    imgData={{
                      left_col:
                        secondBannerImgs?.left_section?.left_col ??
                        "/MoufitMedia/iconUser.svg",
                      right_col:
                        secondBannerImgs?.left_section?.right_col ??
                        "/MoufitMedia/iconUser.svg",
                      right_section:
                        secondBannerImgs?.right_section ??
                        "/MoufitMedia/yourBenefits.jpg",
                    }}
                  />
                );
              }
              return null;
            })}
        </>
      )}
    </>
  );
}

export default HowItWorks;
