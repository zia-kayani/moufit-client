import React, { useState } from 'react';
// import HeaderBannerPages from 'path/to/HeaderBannerPages';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SliderSection from '../SliderSection/SliderSection';
import ImageGallary from '../ImageGallary/ImageGallary';
import ImgGallery from '../ImgGallery/ImgGallery';
import LoaderComp from '../Loader/LoaderComp';
import TeamSlider from '../TeamSlider/TeamSlider';
// import SliderSection from 'path/to/SliderSection';
// import HeaderBannerPages from '../HeaderBannerPages/HeaderBannerPages';

const tabSections = [
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
    label: 'Food',
    sections: [
      {
        title: 'Food',
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
];

const TabsLocation = ({data}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log('value', value);
  };
console.log(value,'data',data)
  return (
    <>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          {data ? data?.map((tabSection, index) => (
            <Tab key={index} label={tabSection?.tab_label} />
          )) : <LoaderComp />}
        </Tabs>
      </Box>
      {/* <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          {data ? data?.map((tabSection, index) => (
            <Tab key={index} label={tabSection?.tab_label} />
          )) : <LoaderComp />}
        </Tabs>
      </Box> */}

        <>
        {data[value].slides?.map((x,i) => {
          return <>
         {/* {console.log('x.title',x.title)} */}
         {/* {x.title} */}
         <TeamSlider titleTeam={{
                        heading: x.title ??  "Meet The Team",
                        // paragraph: section?.body?.description ?? section?.body?.paragraph ?? "We share a common interest to revolutionise the way fitness is consumed.",
                        defaultImg: "/MoufitMedia/member1.jpg"
                      }}
                        newImgsArr={x.tab_sections|| [{ url: '/MoufitMedia/member1.jpg' }]}
                        data={x.tab_sections ?? [
                          { teamImageSrc: "/MoufitMedia/member1.jpg", teamMemberName: "Remi", teamMemberDesignation: "Marketing Intern" },
                          { teamImageSrc: "/MoufitMedia/member2.jpg", teamMemberName: "David Campbell", teamMemberDesignation: "CEO" },
                          { teamImageSrc: "/MoufitMedia/member3.jpg", teamMemberName: "Emmanuel", teamMemberDesignation: "Partner Relationships Manager" },
                          { teamImageSrc: "/MoufitMedia/member1.jpg", teamMemberName: "Remi", teamMemberDesignation: "Marketing Intern" },
                        ]} />
          {/* {x?.slides?.map((slide, slideInd) => { */}
          {/* {data[i]?.slides?.map((slide, slideInd) => {
            return <>
            {slide?.title}
            </>
          })} */}
          </>
        })}
        </>

      <ImgGallery />
    </>
  );
};

export default TabsLocation;
