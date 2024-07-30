import { collection, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase-config';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';
import LoaderComp from '../Loader/LoaderComp';

import axios from 'axios';
import YAML from 'js-yaml';

import './ImgGallery.css'

const dummyCardData = {
  name: 'GoGym Al Qusais',
  desc: 'Fit Box  Gym The Palm offer private boxing class and located in one of the newest destinations on Palm Jumeirah. Located at the head of the fronds, directly across the water from Atlantis the Palm. ',
  class_timings: 'Call the club for booking',
  fee: '',
  pass_type: 'Pay per class',
  moufit_member_benefits: 'Day PassGym and Pool Access  with 20 % off F&B to book in our website',
  moufit_member_acces_included: 'Gym and Group Classes Access', // Gym Access and GX class 

  // contact info 
  email_for_subcribers: 'info@fitboysgym.com',
  email_for_moufit: 'info@fitboysgym.com',
  contact_number_for_subcribers: '+971585329093',
  contact_number_for_moufit: '+971585329093',

  // address related => Map + accordion + addr
  map_url: 'https://goo.gl/maps/uHQkQPAY15bdJnAd6',
  address: 'Boxpark M4-2, Al wasl RoadDubai – UAE',
  three_things_near: ['The Pointe Shopping Mall', 'The Pointe Union Coop', 'Atlantis The Palm'],

  // price related => Dispplay accordions
  gym_partner_normal_rate: [
    'Single Group Class - (Regular Rate AED100/)',
    'Single Physiotherapy Session - (Regular Rate AED 300/)',
    '3 Physio Sessions - (Regular Rate AED 825)',
    '6 Physio Sessions - (Regular Rate AED 1500)',
    '10 Physio Sessions - (Regular Rate AED 2350)',
    '1 PhysioTherapy & 1 Group Yoga Class- (Regular Rate AED 350)',
    '3 Physiotherapy & 3 Group Yoga Class - (Regular rate AED 1100)',
  ],
  Moufit_b2b_rate: [
    'Single Group Class - AED 40.00 ',
    'Single Physiotherapy Session - AED 250.00',
    '3 Physio Sessions - AED 690.00',
    '6 Physio Sessions - AED 1300.00',
    '10 Physio Sessions - AED 2050.00',
    '1 PhysioTherapy & 1 Group Yoga Class- AED 280.00',
    '3 Physiotherapy & 3 Group Yoga Class - AED 810.00 ',
  ],
  brb_partner_retail_rate: [

    'Single Group Class - 85.00 AED ',
    'Single Physiotherapy Session - 270.00 AED',
    '3 Physio Sessions - 735.00 AED',
    '6 Physio Sessions -1,345.00 AED',
    '10 Physio Sessions - 2,095.00 AED',
    '1 PhysioTherapy & 1 Group Yoga Class- 325.00 AED',
    '3 Physiotherapy & 3 Group Yoga Class - 855.00 AED',

  ],

}
const ImgGallery = () => {
  const navigate = useNavigate()
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const humanCollectionRef = collection(db, 'locations');
      const querySnapshot = await getDocs(humanCollectionRef);
      const locationsData = querySnapshot.docs.map((doc) => doc.data());
      // console.log(locationsData[0].l)
      // console.log(locationsData[0].l._lat)
      // console.log(locationsData[0].l._long)


      setLocations(locationsData);
    };

    fetchLocations();
  }, []);

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

  const [staticLocationsList, setStaticLocationsList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const requireMDX = require.context('../../../locations', true, /\.mdx$/);
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
      setStaticLocationsList(data)
      // console.log(groupGymsByNames(data))
      // getGroupedData(data);


      // const groupedData = data.reduce((acc, item) => {
      //   const { name, area } = item;
      //   const key = `${name}-${area}`;
      //   acc[key] = acc[key] || [];
      //   acc[key].push(item);
      //   return acc;
      // }, {});

      // console.log('groupedData:', groupedData);

    };

    getData();

  }, []);

  useEffect(() => { }, [staticLocationsList])

  function groupGymsByNames(gyms) {
    const groupedGyms = {};

    gyms.forEach(gym => {
      const { addresses, name, area, date, description, images, short, ctaText, ctaLink, featuredText } = gym;

      if (!groupedGyms[name]) {
        groupedGyms[name] = {
          name,
          area,
          date,
          description,
          images,
          short,
          addresses,
          // addresses: [],
          ctaTexts: [],
          ctaLinks: [],
          featuredTexts: []
        };
      }

      // groupedGyms[name].addresses.push(gym.address);
      groupedGyms[name].ctaTexts.push(ctaText);
      groupedGyms[name].ctaLinks.push(ctaLink);
      groupedGyms[name].featuredTexts.push(featuredText);
    });
    // console.log(Object.values(groupedGyms));
    // console.log(groupedGyms);

    return Object.values(groupedGyms);
  }

  // const getGroupedData = (data) => {
  //   const groupedData = data.reduce((acc, item) => {
  //     const { name, area } = item;
  //     const key = `${name}-${area}`;
  //     acc[key] = acc[key] || [];
  //     acc[key].push(item);
  //     return acc;
  //   }, {});

  //   console.log('groupedData:', groupedData);
  // }
  return (
    <div style={{ width: '90%', margin: '1em auto' }}>
    
      
      <Grid container spacing={2}>
        {/* {locations ? locations?.map((location) => ( */}
        {groupGymsByNames(staticLocationsList) ? groupGymsByNames(staticLocationsList)?.map((location) => (

          <Grid item xs={12} sm={6} md={4} key={location?.g}>
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <CardMedia
                  component="img"
                  // src={location?.d?.locationGallery ? location?.d?.locationGallery[0] : ''}
                  // alt={location?.d?.locationName ?? 'alt'}
                  src={location?.images ? location?.images[0] : ''}
                  alt={location?.name ?? 'alt'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    // width: '100%',
                    backgroundColor: '#ffcd00',
                    color: '#6638b6',
                    padding: '8px 1em',

                    // paddingLeft: '1em',
                    borderTopRightRadius: '5px',
                    fontSize: '13px',
                    // fontWeight: '400'
                  }}
                >
                  {location?.d?.locationDescriptionEn?.length > 40 ? location?.d?.locationDescriptionEn?.substr(0, 41) : location?.d?.locationDescriptionEn}
                </div> */}
              </div>
              <CardContent sx={{ padding: '1em', textAlign: 'left', paddingBottom: '0.3em' }}>
                {/* <Typography variant="h5" sx={{ color: '#6638b6' }}>{location?.d?.locationName?.length > 28 ? location?.d?.locationName?.substr(0, 28) : location?.d?.locationName ?? ''}</Typography> */}
                <Typography variant="h5" sx={{ color: '#6638b6' }}>{location?.name ?? ''}</Typography>


                {/* <Typography variant="h6" sx={{ fontSize: '14px', paddingTop: '0.5em' }} >{location?.d?.locationAddress?.length > 34 ? location?.d?.locationAddress?.substr(0, 34) : location?.d?.locationAddress ?? ''}</Typography> */}
                <Typography variant="h6" sx={{ fontSize: '14px', paddingTop: '0.5em' }} >{location?.area ?? ''}</Typography>


              </CardContent>
              <Button
                //   onClick={() => console.log(location)}
                // onClick={() => navigate('/location-page', { state: { data: location } },)}
                onClick={() => navigate('/new-location-page', { state: { data: location } },)}


                size='small'
                sx={{ width: 'fit-content', marginLeft: '1em', marginBottom: '1em', color: '#6638b6' }}
              // variant=""

              >View more</Button>
            </Card>
          </Grid>
        )) : <LoaderComp />}
      </Grid>
    </div>
  );
};

export default ImgGallery;
