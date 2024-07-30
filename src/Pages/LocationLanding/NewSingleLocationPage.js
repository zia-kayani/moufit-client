import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './LocationLandinPage.css';
import { Grid, Typography } from '@mui/material';
import LocationPageComplete from '../../Components/Sections/LocationPageComplete/LocationPageComplete';
import ImageGallary from '../../Components/Sections/ImageGallary/ImageGallary';
import SimpleImgSlider from '../../Components/Sections/SimpleImgSlider/SimpleImgSlider';
import { getSingleFirebaseDocById } from '../../Components/Helpers/apiCalls/globalApiCalls';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import PricingHome from '../../Components/Sections/PricingHome/PricingHome';
// import GoogleMapComp from '../../Components/Sections/GoogleMapComp/GoogleMapComp';
import GoogleMapComp from '../../Components/Sections/GoogleMapComp/GoogleMapComp';
import DynamicPackageList from '../../Components/Sections/DynamicPackageList/DynamicPackageList';

// import GoogleMapComp from '../../Components/Sections/GoogleMapComp/GoogleMapComp.js';

function NewLocationPage() {

    const location = useLocation();
    const [locationInfo, SetlocationInfo] = useState({});
    const [locationData, setLocationData] = useState({})


    const fetchLocations = async () => {
        const locationCollectionRef = collection(db, 'locations');
        const querySnapshot = await getDocs(locationCollectionRef);
        const locationsData = querySnapshot.docs.map((doc) => doc.data());
        // let singleLocation = locationData.find(x => x.d.locationName === location?.state?.data.locationName);
        // console.log(locationsData);
        // console.log(locationsData[0].d.locationGallery);
        console.log('locationsData[0].l', locationsData[0].l)
        setLocationData(locationsData[3].d.locationGallery);

    };


    useEffect(() => {

        const data = location?.state?.data;
        if (data) {
            console.log('single location data', data);
            SetlocationInfo(data);
            fetchLocations();

        } else {
            console.log('no location data found')
        };
    }, [location?.state?.data]);

    useEffect(() => { }, [locationData, locationInfo]);


    return (

        <>
            {/* <div className='headerAuth'>

      </div> */}
            <Grid container xs={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {/* 1st - Name + Location,  */}
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6638b6', color: 'white', marginBottom: '2.5em', paddingTop: '2.2em' }}>
                    <Typography variant='h2' sx={{ margin: '10px 0' }} >
                        {/* {`${locationInfo?.name ?? 'GYM NAME'}`} */}
                        {`${locationInfo?.name ?? 'GYM NAME'}`}

                    </Typography>
                    {/* subtitle2 */}
                    <Typography variant='h5' >
                        {/* {`${locationInfo?.address ?? 'GYM ADDR'}`} */}
                        {`${locationInfo?.area ?? 'GYM AREA'}`}

                    </Typography>

                    {/* <Typography variant='caption' sx={{ width: '50%', backgroundColor: 'orange', color: 'white', padding: '2em', borderRadius: '5px', marginBottom: '-2em' }} >
                        {`${locationInfo?.moufit_member_benefits ?? 'GYM BENEFITS'}`}
                    </Typography> */}
                </Grid>

                {/* 2nd - ABOUT + DESC */}
                <Grid item xs={12} sx={{ display: 'flex', margin: '1em 4em', textAlign: 'left' }}>
                    <Grid item xs={6} sx={{ borderRight: '1px solid #dfdddf' }} >
                        <Typography variant='h6' sx={{ color: 'orange' }}>About this location</Typography>
                        <Typography variant='h4' sx={{ width: '75%', color: '#6638b6' }} >
                            {/* {locationInfo.} */}
                            {/* {`Say hello to ${locationInfo?.name ?? ''} & a new healthy lifestyle.`} */}
                            {`${locationInfo?.short ?? ''}`}

                        </Typography>

                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', paddingLeft: '2em', color: '#000' }} >
                        {/* {locationInfo?.desc ?? 'desc'} */}
                        <div dangerouslySetInnerHTML={{ __html: locationInfo?.description }}></div>
                        {/* {locationInfo?.description ?? 'desc'} */}

                    </Grid>
                </Grid>

                {/* 3rd - Map + 3 Three things around ! */}
                <Grid item xs={12} sx={{ margin: '1em 4em ' }}>
                    {/* MAP + 3 THINGS NEAR BY !!! */}
                    {/* <Grid item xs={8} > */}
                    {/* <iframe
                            title="Map"
                            width="100%"
                            height="400"
                            frameBorder="0"
                            src="https://goo.gl/maps/WBDw9fLT7ywAdt3a8"
                            allowFullScreen
                        /> */}
                    <GoogleMapComp data={locationData} />
                    {/* </Grid> */}
                </Grid>
                <DynamicPackageList items={locationInfo?.ctaTexts ?? []} />
            </Grid>

            <SimpleImgSlider pictures={locationInfo?.images ?? locationData ?? [
                {
                    img: './MoufitMedia/yourBenefits.jpg',
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

            {/* <Grid item xs={4} >
                <PricingHome
                    onClick={true}
                    //   mainPara={{
                    //     heading: section?.body?.heading ?? "Our Pricing Packages",
                    //     sub_heading: section?.body?.sub_heading ?? "Gain access to dubais best collection of boutique gyms for one low monthly price.",
                    //   }}

                    arrToMap={Array.isArray(locationInfo?.Moufit_b2b_rate) ? locationInfo?.Moufit_b2b_rate : [locationInfo?.Moufit_b2b_rate]}

                    data={[
                        { plan: "Pro Plan" }
                    ]}
                //   data={section?.body?.plans_section ?? [
                //     {
                //       access: "Gym Access",
                //       plan: "Pro Plan",
                //       price: "AED299",
                //       duration: "monthly",
                //       features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees", "Cancel Anytime", "Exclusive Member Benefits"]

                //     },
                //     {
                //       access: "Gym Access",
                //       plan: "Pro Plan",
                //       price: "AED299",
                //       duration: "monthly",
                //       features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees"]

                //     },
                //     {
                //       access: "Gym Access",
                //       plan: "Pro Plan",
                //       price: "AED299",
                //       duration: "monthly",
                //       features: ["Access to 50+ Locations", "Visit any location once per day", "No Joining Fees", "Cancel Anytime"]

                //     },
                //   ]} 
                />
            </Grid> */}
            {/* <LocationPageComplete
        data={{
          mainImageSrc: locationInfo?.d?.locationGallery ? locationInfo?.d?.locationGallery[0] : "/MoufitMedia/LocatonDetail.svg",
          headingLocation: locationInfo?.d?.locationName ?? "Class Name lorem ipsum dollar sit imet dollar sit imet ",
          paraLocation: locationInfo?.d?.locationDescriptionEn ?? "The most important thing in preventing workout burnout is to pay attention to the signs your body is giving you. If youre feeling exceptionally tired mentally and physically, its a good sign you might be due for a rest day. If theres a particular workout you just can’t seem to get the hang of, quit forcing it and try something new instead. ",
        }}
      /> */}
            {/* <SimpleImgSlider pictures={locationInfo?.d?.locationGallery ? locationInfo?.d?.locationGallery : [
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
    */}
        </>
    )
}

export default NewLocationPage;