import React, { useState } from 'react'
import './ThreeColumn.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));


function ThreeColumn({ data, col1, col2, col3 }) {
  
  const [column1, setColumn1] = useState({
    iconLink: data?.col1?.data?.imgSrc ?? data?.col1?.src ?? "/MoufitMedia/col1.svg",
    mainTitle: data?.col1?.data?.title ?? "Gym Access",
    paraText: data?.col1?.data?.desc ?? "Get access to 29 gyms spread over Dubai & Sharjah for AED 299 per month.",
    btnLink: data?.col1?.data?.btnLink ?? "/subscriptions",
    btnText: data?.col1?.data?.btnText ?? "Comming Soon",

  });

  const [column2, setColumn2] = useState({
    iconLink: data?.col2?.imgSrc ?? "/MoufitMedia/col2.svg",
    mainTitle: data?.col2?.data?.title ?? "Book Classes",
    paraText: data?.col2?.data?.desc ?? "Book classes at Dubai's most famous fitness clubs",
    btnLink: "",
    btnText: "Comming Soon",

  });


  const [column3, setColumn3] = useState({
    iconLink: data?.col3?.imgSrc ?? "/MoufitMedia/col3.svg",
    mainTitle: data?.col3?.data?.title ?? "Personal Training",
    paraText: data?.col3?.data?.desc ?? "Book sessions with the best trainers in the UAE.",
    btnLink: "",
    btnText: "Comming Soon",

  });

  const col1Button = () => {

  }

  const col2Button = () => {

  }
  const col3Button = () => {

  }
  return (
    <>
      <Box className='MainGridRow' sx={{ flexGrow: 1 }}>
        <Grid className='MainGridContainer' container spacing={0}>
          <Grid className='MainGridItem' item xs={12} md={4}>
            <Item className='Item1Grid ItemCstm'>

              <img className='icon-grid' src={data?.col1?.src ?? column1.iconLink} alt='icon img' />
              <h2 className='heading-grid noyh-bold-moufit'>{data?.col1?.data?.title ?? column1.mainTitle}</h2>
              <p className='para-grid rubik-ligt-moufit'>{data?.col1?.data?.desc ?? column1.paraText}</p>
              <div className='buttonContainerCstm'>
                <Link to={data?.col1?.data?.btnLink ?? column1.btnLink}>
                <button onClick={col1Button} className='btn-cstm-grid btnImageCstm rubik-ligt-moufit'>{data?.col1?.data?.btnText ?? column1.btnText}</button>
                <span className='span-grid'><img className='img-grid-cstm' alt={column1.mainTitle} src={"/MoufitMedia/iconPlayBtn.svg"} /></span>
                
                </Link>
              </div>

            </Item>
          </Grid>
          <Grid className='MainGridItem' item xs={12} md={4}>
            <Item className='Item2Grid ItemCstm'>
              <img className='icon-grid' src={data?.col2?.src ?? column2.iconLink} alt={column2.mainTitle} />
              <h2 className='heading-grid noyh-bold-moufit'>{data?.col2?.data?.title ?? column2.mainTitle}</h2>
              <p className='para-grid rubik-ligt-moufit'>{data?.col2?.data?.desc ?? column2.paraText}</p>
              <div className='buttonContainerCstm'>
                <button className='btn-cstm-grid btnImageCstm rubik-ligt-moufit'>{column2.btnText}</button>
                <span className='span-grid'><img className='img-grid-cstm' alt={column2.mainTitle} src="/MoufitMedia/iconPlayBtn.svg" /></span>
              </div>
            </Item>
          </Grid>
          <Grid className='MainGridItem' item xs={12} md={4}>
            <Item className='Item3Grid ItemCstm'>
              <img className='icon-grid' src={data?.col3?.src ?? column3.iconLink} alt={column3.btnText} />
              <h2 className='heading-grid noyh-bold-moufit'>{data?.col3?.data?.title ?? column3.mainTitle}</h2>
              <p className='para-grid rubik-ligt-moufit'>{data?.col3?.data?.desc ?? column3.paraText}</p>
              <div className='buttonContainerCstm'>
                <button className='btn-cstm-grid btnImageCstm rubik-ligt-moufit'>{column3.btnText}</button>
                <span className='span-grid'><img className='img-grid-cstm' src="/MoufitMedia/iconPlayBtn.svg" alt={column3.mainTitle} /></span>
              </div>
            </Item>
          </Grid>

        </Grid>
      </Box>


    </>
  )
}

export default ThreeColumn