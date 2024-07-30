import React from 'react'
import './LocationPageComplete.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function LocationPageComplete({ data }) {
  return (
    <>
      <Grid container >
        <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>
          <Grid item xs={6} sx={{ textAlign: 'left',
          //  paddingLeft: '7em', 
           display: 'flex', flexDirection: 'column', borderRight: '1px solid #6c757d' }} >
            <small style={{color: '#ff8200', fontSize: '18px', paddingBottom :'8px'}}> About this location</small>
            <span style={{fontSize: '42px', fontWeight: '700', color: '#6f42c1'}}>
              Say hello to {data.headingLocation} & a new healthy lifestyle.
            </span>
          </Grid>
          <Grid item xs={6} >
          {data.paraLocation}
          </Grid>
        </Grid>
      </Grid>
      {/* <div className='mainLocationLanding'>
        <div className='containerLocation'>
        
          <Box className='boxCstmLocation' sx={{ flexGrow: 1 }}>
            <Grid className="locationGridRow" container spacing={2}>
              <Grid className='locationColumn locationColumn1' item xs={12} md={6}>
                <Item className='locationItemCstm locationItemCstm1'>
                  <img className='locationImage' src={data.mainImageSrc} alt={data.headingLocation} />

                </Item>
              </Grid>
              <Grid className='locationColumn locationColumn2' item xs={12} md={6}>
                <Item className='locationItemCstm locationItemCstm2'>
                  <h2 className='locationItemHeading JosefinSans'>
                    {data.headingLocation}
                  </h2>
                  <p className='locationItemPara rubik-regular-moufit'>
                    {data.paraLocation}
                  </p>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div> */}
    </>
  )
}

export default LocationPageComplete