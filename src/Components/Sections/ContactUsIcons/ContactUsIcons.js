import React from 'react'
import './ContactUsIcons.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ContactUsIcons({ data, newData, defaultIcon, imgData }) {
  return (
    <>
      <div className='contactUsMainIcons'>
        <Box sx={{ flexGrow: 1, mt: 5, mb: 5 }}>
          <Container className="iconContainer">
            <Grid container spacing={2} className='iconWrapper' >
              {/* {newData.map((data, index) => ( */}
              {data.map((data, index) => (

                <Grid key={index} className='contactIconColumn' item xs={12} md={index === 1 ? 3 : index === 2 ? 3 : 4}>
                  <Item className='contactIconItem'>
                    <div className='contactIconContainer'>
                      {/* <img className='imageCstmIcon' src={imgArr[index]?.src ?? data.imageIcon ?? defaultIcon} alt={data.heading} /> */}
                      <img className='imageCstmIcon' src={imgData[index]?.url ?? data?.imageIcon ?? defaultIcon} alt={data.heading} />

                      {/* <h3 className='iconCstmHeading noyh-bold-moufit'>{data.heading}</h3> */}
                      <h3 className='iconCstmHeading noyh-bold-moufit'>{newData[index]?.heading ?? data.heading}</h3>
                      <p className='iconCstmInfo rubik-regular-moufit'>
                        {/* {data.info} */}
                        {newData[index]?.info ?? data.info}
                      </p>
                    </div>
                  </Item>
                </Grid>
              ))}

            </Grid>
          </Container>

        </Box>
      </div>
    </>
  )
};

export default ContactUsIcons;