import React from 'react';

import { Box, Paper, Grid, styled } from '@mui/material';

import './TextImageSec.css';


function TextImageSec({ data }) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid className='cstmGridBox gridLeft' item xs={12} md={6}>
            <Item className='itemCustom leftItem' style={{ backgroundColor: '#FAFAFA' }}>
              <h2 className='secHeading noyh-bold-moufit'>{data.secHeading}</h2>
              <p className='secSubHeading moufit-primary-color rubik-regular-moufit'>{data.secSubHeading}</p>
              <p className='secPara rubik-regular-moufit'>{data.secPara}</p>
              <div className='buttonContainerCstm'>
                <button className='sec-btn-cstm-grid moufit-primary-color rubik-bold-moufit'>{data.secBtnText}</button>
                <span className='span-grid'><img className='img-grid-cstm' src="/MoufitMedia/playIconPurple.svg" alt={data.secHeading} /></span>
              </div>
            </Item>
          </Grid>
          <Grid className='cstmGridBox gridRight' item xs={12} md={6}>
            <Item className='rightItem'>
              <img className='itemCustom RightImage' alt={data.secHeading} src={data.rightImageLink} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
};

export default TextImageSec;