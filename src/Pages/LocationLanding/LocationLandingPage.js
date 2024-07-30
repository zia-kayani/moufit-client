import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './LocationLandinPage.css';

import LocationPageComplete from '../../Components/Sections/LocationPageComplete/LocationPageComplete';
import ImageGallary from '../../Components/Sections/ImageGallary/ImageGallary';
import SimpleImgSlider from '../../Components/Sections/SimpleImgSlider/SimpleImgSlider';

function LocationLandingPage() {

  const location = useLocation();
  const [locationInfo, SetlocationInfo] = useState({});

  useEffect(() => {
    const data = location?.state?.data;
    if (data) {
      console.log('single location data', data);
      SetlocationInfo(data)
    } else {
      console.log('no location data found')
    };
  }, [location?.state?.data])

  return (

    <>
      <div className='headerAuth'>

      </div>
      <LocationPageComplete
        data={{
          mainImageSrc: locationInfo?.d?.locationGallery ? locationInfo?.d?.locationGallery[0] : "/MoufitMedia/LocatonDetail.svg",
          headingLocation: locationInfo?.d?.locationName ?? "Class Name lorem ipsum dollar sit imet dollar sit imet ",
          paraLocation: locationInfo?.d?.locationDescriptionEn ?? "The most important thing in preventing workout burnout is to pay attention to the signs your body is giving you. If youre feeling exceptionally tired mentally and physically, its a good sign you might be due for a rest day. If theres a particular workout you just can’t seem to get the hang of, quit forcing it and try something new instead. ",
        }}
      />
      <SimpleImgSlider pictures={locationInfo?.d?.locationGallery ? locationInfo?.d?.locationGallery : [
          {
            img: './MoufitMedia/sliderImage3.png',
          },
          {
            img: './MoufitMedia/sliderImage4.png',
          },
          {
            img: './MoufitMedia/sliderImage3.png',
          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
          {
            img: './MoufitMedia/sliderImage3.png',

          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
          {
            img: './MoufitMedia/sliderImage3.png',

          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
          {
            img: './MoufitMedia/sliderImage3.png',

          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
          {
            img: './MoufitMedia/sliderImage3.png',

          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
        ]} />
      {/* <ImageGallary
        mainTitleGallary={{
          heading: locationInfo?.d?.locationAddress ?? "Image Gallary",
          paragraph: locationInfo?.d?.locationHours ?? "Class Name lorem ipsum dollar sit imet dollar sit imet ",
        }}

        data={locationInfo?.d?.locationGallery ? locationInfo?.d?.locationGallery : [
          {
            img: './MoufitMedia/sliderImage3.png',
          },
          {
            img: './MoufitMedia/sliderImage4.png',
          },
          {
            img: './MoufitMedia/sliderImage3.png',
          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
          {
            img: './MoufitMedia/sliderImage3.png',

          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
          {
            img: './MoufitMedia/sliderImage3.png',

          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
          {
            img: './MoufitMedia/sliderImage3.png',

          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
          {
            img: './MoufitMedia/sliderImage3.png',

          },
          {
            img: './MoufitMedia/sliderImage4.png',

          },
        ]}
      /> */}

    </>
  )
}

export default LocationLandingPage;