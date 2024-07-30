import React from 'react'
import './ImageGallary.css'
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

function ImageGallary({ data, mainTitleGallary }) {
    console.log("the props data", data)
    return (
        <>
            <div className='locationGallaryMain'>
                <div className='titleSection'>
                    <h2 className='sectionMainHeading noyh-bold-moufit'>{mainTitleGallary.heading}</h2>
                    <p className='sectionMainPara rubik-regular-moufit'>{mainTitleGallary.paragraph}</p>
                </div>

                <Box sx={{ flexGrow: 1, marginBottom: '1em' }}>
                    <Grid container spacing={0.2}>
                        {data?.map((data, index) => (
                            <Grid className='imageGallaryColumn' key={index} item xs={6} md={3}>
                                <Item className='imageGallaryItem'>
                                    <img className='imageGallaryImage' src={data?.img ?? data} alt="..." />
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </div>

        </>
    )
}

export default ImageGallary