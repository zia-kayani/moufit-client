import React, { useState, useEffect } from 'react';
import HeaderBannerPages from '../../Components/Sections/HeaderBannerPages/HeaderBannerPages';
import SliderSection from '../../Components/Sections/SliderSection/SliderSection';
import TextImageSec from '../../Components/Sections/TextImageSec/TextImageSec';
import { fetchImgSrcListFromFirebase, setSingleBannerState } from '../../Components/Helpers/apiCalls/globalApiCalls';
import { CircularProgress } from '@mui/material';
import LoaderComp from '../../Components/Sections/Loader/LoaderComp';

const testDynamicObj = [
  { index: 0, is_active: true, label: 'main_banner', body: { title: 'FITNESS & LIFESTYLE !' } },
  {
    index: 1, is_active: true, label: 'text_img_section', body: {
      title: 'Fitness Heading !',
      sub_title: 'We offer affordable access to the best fitness institutions in the UAE!',
      desc: 'We have been working quitely since May 2019 to bring the best fitness experience to the UAE.We have been working quitely since May 2019 to bring the best fitness experience to the UAE !',
      btn_text: '',
    },
  },

  {
    index: 2, is_active: true, label: 'slider_section', body: {
      title: 'Gym and Clubs !',
      imgs_arr: [
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
      ]
    }
  },

  {
    index: 3, is_active: true, label: 'slider_section', body: {
      title: 'Food !',
      imgs_arr: [
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
      ]
    }
  },
  {
    index: 2, is_active: true, label: 'slider_section', body: {
      title: 'Fashion !',
      imgs_arr: [
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
        { slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
      ]
    }
  },

];

function LifestyleAndFitness() {

  const [dynamicSectionObj, setDynamicSectionObj] = useState({});

  const [firstBannerImgs, setFirstBannerImgs] = useState({});
  const [secondBannerImg, setSecondBannerImg] = useState({});
  const [thirdBannerImg, setThirdBannerImg] = useState('');
  const [isLoading, setIsLoading] = useState(true);



  const getFitnessSectionsFromFirebase = async () => {
    try {

      setIsLoading(true);
      const dynamicBannerCall = await setSingleBannerState("lifestyle_and_fitness_page", 'pages_customization', setDynamicSectionObj);
      console.log('dynamicBannerCall', dynamicBannerCall);
      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }
  };

  useEffect(() => { }, [isLoading])

  const getFitnessImgsFromFirebase = async () => {

    fetchFirstBannerImgs();
    fetchSecondBannerImgs();
    fetchThirdBannerImg();
  };

  const fetchFirstBannerImgs = async () => {

    try {

      const firstBannerDesktopImg = await fetchImgSrcListFromFirebase('/fitness_page', '/first_banner_imgs', '/desktop_imgs');
      const firstBannerMobileImg = await fetchImgSrcListFromFirebase('/fitness_page', '/first_banner_imgs', '/mobile_imgs');

      setFirstBannerImgs({
        desktop_img: firstBannerDesktopImg[0]?.url ?? "/MoufitMedia/moufitPagesBanner.jpg",
        mobile_img: firstBannerMobileImg[0]?.url ?? "/MoufitMedia/overlay.png",
      });

    } catch (err) {
      console.error(err);
    };
  };

  const fetchSecondBannerImgs = async () => {

    const imgUrl = await fetchImgSrcListFromFirebase('/fitness_page', '/second_banner_img');
    setSecondBannerImg(imgUrl[0]?.url ?? "\MoufitMedia\overlay.png");
    // console.log("Image URL:", imageURL);

  };

  const fetchThirdBannerImg = async () => {

    const imgUrl = await fetchImgSrcListFromFirebase('/fitness_page', '/third_banner_img');
    setThirdBannerImg(imgUrl ?? '/MoufitMedia/sliderfitnessImage1.jpg');
    // console.log("Image URL:", imageURL);

  };


  useEffect(() => {

    getFitnessSectionsFromFirebase();
    getFitnessImgsFromFirebase();

  }, []);

  useEffect(() => { }, [dynamicSectionObj]);

  useEffect(() => { }, [firstBannerImgs, secondBannerImg, thirdBannerImg]);


  return (
    <>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <>
          {dynamicSectionObj?.dynamic_sections?.sort((a, b) => a.index - b.index)?.map((section, ind) => {

            if (section?.is_active) {

              if (section.label === "main_banner"
                //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
              ) {
                return (
                  <HeaderBannerPages text={section?.body?.title ?? "Fitness & Lifestyle"} />
                )
              } else if (section.label === "text_img_section"
                //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
              ) {
                return (
                  <TextImageSec data={{
                    secHeading: section?.body?.title ?? "Fitness Heading",
                    secSubHeading: section?.body?.sub_title ?? "We offer affordable access to the best fitness institutions in the UAE.",
                    secPara: section?.body?.desc ?? "We have been working quitely since May 2019 to bring the best fitness experience to the UAE.We have been working quitely since May 2019 to bring the best fitness experience to the UAE.",
                    secBtnLink: "",
                    secBtnText: section?.body?.btn_text ?? "",
                    rightImageLink: secondBannerImg ?? "/MoufitMedia/gymAbout.jpg",
                  }} />
                )
              }
              else if (section.label === "slider_section"
                //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
              ) {
                return (
                  <SliderSection data={{
                    title: section?.body?.title ?? "Gym and Clubs",
                    slideShow: thirdBannerImg?.length - 1 ?? section?.body?.imgs_arr?.length - 1 ?? 3,
                    defaultImg: '/MoufitMedia/sliderfitnessImage1.jpg'
                  }}
                    newImgsArr={thirdBannerImg}
                    slides={thirdBannerImg ?? section?.body?.imgs_arr ?? [
                      { imgSrc: '/MoufitMedia/sliderfitnessImage1.jpg', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                      { imgSrc: '/MoufitMedia/sliderfitnessImage2.jpg', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                      { imgSrc: '/MoufitMedia/sliderfitnessImage3.jpg', imgLink: "", slideHeading: "Fit Boys Marina", slidePara: "Marina, Dubai" },
                    ]}
                  />
                )
              }

            }
            return null;
          })}
        </>
      )}
    </>
  )
};

export default LifestyleAndFitness;