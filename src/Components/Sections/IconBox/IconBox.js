import React from 'react'
import './IconBox.css'
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


function IconBox({ data, defaultImg, newImgsArr }) {

  return (
    <>
      <div className='IconBoxMain'>
        <Box className='mainBoxContainer' sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {(newImgsArr || data)?.map((data, index) => (
              <Grid key={index} className='gridColumnIcon' item xs={12} md={2.4}>
                <Item className='gridItemIcon'>
                  <div className='iconBox'>
                  {/* <img
                    style={{width: '50px', height: '50px'}}
                      src={data?.imgUrl ?? data.iconImageSrc ?? defaultImg}
                      alt='...'
                    /> */}
                    <img
                    style={{width: '50px', height: '50px'}}
                      src={newImgsArr[index]?.imgUrl ?? newImgsArr[index]?.url ?? data.iconImageSrc ?? defaultImg}
                      alt='...'
                    />
                    <div className='iconTextBox'>
                      <h3 className='iconBoxHeading noyh-bold-moufit'>
                        {newImgsArr[index]?.title ?? data.iconBoxHeading}
                      </h3>
                      
                      <p className='iconBoxPara rubik-regular-moufit'>
                        {newImgsArr[index]?.description ?? data.iconBoxPara}
                      </p>
                    </div>
                  </div>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  )
}

export default IconBox