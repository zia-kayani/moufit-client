import React, { useState, useEffect } from 'react'
import './Locations.css'

import HeaderBannerPages from '../../Components/Sections/HeaderBannerPages/HeaderBannerPages'
import TabsLocation from '../../Components/Sections/TabsLocation/TabsLocation'
import LoaderComp from '../../Components/Sections/Loader/LoaderComp';
import ImgGallery from '../../Components/Sections/ImgGallery/ImgGallery';

import { getAllDocsWithinCollection, setSingleBannerState } from '../../Components/Helpers/apiCalls/globalApiCalls';

import axios from 'axios';
import YAML from 'js-yaml';

const dummyData = [
  { index: 0, is_active: true, label: 'main_banner', body: { title: 'Locations !' } },

  {
    index: 1, is_active: true, label: 'dynamic_tabs_section', body: [
      {
        label: 'Gyms !!',
        sections: [
          {
            title: 'Fashion',
            slides: [
              { imgSrc: '/MoufitMedia/sliderfitnessImage1.jpg', imgLink: '/location-page', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage2.jpg', imgLink: '/location-page', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage3.jpg', imgLink: '/location-page', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
            ],
          },
          {
            title: '',
            slides: [
              { imgSrc: '/MoufitMedia/sliderfitnessImage1.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage2.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage3.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
            ],
          },
        ],
      },
      {
        label: 'Clubs',
        sections: [
          {
            title: 'Clubs',
            slides: [
              { imgSrc: '/MoufitMedia/sliderfitnessImage1.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage2.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage3.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
            ],
          },
        ],
      },
      {
        label: 'Classes',
        sections: [
          {
            title: 'Classes',
            slides: [
              { imgSrc: '/MoufitMedia/sliderfitnessImage1.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage2.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage3.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
            ],
          },
        ],
      },
      {
        label: 'Food !!',
        sections: [
          {
            title: 'Food !',
            slides: [
              { imgSrc: '/MoufitMedia/sliderfitnessImage1.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage2.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage3.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
            ],
          },
          {
            title: 'dummy',
            slides: [
              { imgSrc: '/MoufitMedia/sliderfitnessImage1.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage2.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage3.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
            ],
          },
          {
            title: '',
            slides: [
              { imgSrc: '/MoufitMedia/sliderfitnessImage1.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage2.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
              { imgSrc: '/MoufitMedia/sliderfitnessImage3.jpg', imgLink: '', slideHeading: 'Fit Boys Marina', slidePara: 'Marina, Dubai' },
            ],
          },
        ],
      },
    ]
  }
];

function Locations() {

  const [dynamicSectionsObj, setDynamicSectionsObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const getLocationsSectionsFromFirebase = async () => {

  //   try {
  //     setIsLoading(true);
  //     // const dynamicBannerCall = await setSingleBannerState("locations_page", 'pages_customization', setDynamicSectionsObj);
  //     const dynamicBannerCall = await setSingleBannerState("locations_test_page", 'test_collection', setDynamicSectionsObj);

  //     console.log('dynamicBannerCall', dynamicBannerCall);
  //     setIsLoading(false);

  //   } catch (err) {
  //     console.log(err);
  //     setIsLoading(false);

  //   }
  // };

  const getLocationsSectionsFromFirebase = async () => {
    
    try {
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection("locations_dynamic_page");
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
  const getSampleData = async (filePath) => {

    try {
      const fileResponse = await axios.get(filePath, { baseURL: process.env.PUBLIC_URL });
      const content = fileResponse?.data;
      const cleanedContent = content?.replace(/---/g, '');
      // console.log('cleanedContent:', cleanedContent); // Check the cleaned content
      const parsedData = YAML.load(cleanedContent);
      // console.log('parsedData:', parsedData); // Check the parsed data

      return parsedData;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const requireMDX = require.context('../../locations', true, /\.mdx$/);
      const fileKeys = requireMDX.keys();

      const data = await Promise.all(fileKeys.map(async (filePath) => {
        const fileData = requireMDX(filePath);
        const module = fileData.default;
        // console.log('module:', module);

        const parsedData = await getSampleData(fileData);
        // console.log('parsedData:', parsedData);

        return parsedData;
      }));

      console.log('data:', data); // Array of parsed objects

      const groupedData = data.reduce((acc, item) => {
        const { name, area } = item;
        const key = `${name}-${area}`;
        acc[key] = acc[key] || [];
        acc[key].push(item);
        return acc;
      }, {});

      console.log('groupedData:', groupedData);
      console.log('dynamicSectionsObj', dynamicSectionsObj)

    };

    getData();
  }, []);

  useEffect(() => { }, [isLoading]);

  useEffect(() => {
    getLocationsSectionsFromFirebase();
  }, []);


  useEffect(() => { }, [dynamicSectionsObj]);

  return (
    <>
      {/* <ImgGallery /> */}
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
                  <HeaderBannerPages text={section?.body?.title ?? "Locations"} />
                )
              } else if (section.label === "dynamic_tabs_section"
                //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
              ) {
                return (
                  <TabsLocation data={section?.body.tabs_arr} />
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

export default Locations;