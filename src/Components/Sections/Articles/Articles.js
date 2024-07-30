import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import './Articles.css';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Articles({ data, intro, imgData, newImgsArr }) {

    return (
        <>
            <div className='articlesMain'>
                <div className='titleSection'>
                    <h2 className='sectionMainHeading noyh-bold-moufit'>{intro.heading}</h2>
                    <p className='sectionMainPara rubik-regular-moufit'>{intro.paragraph}</p>
                </div>

                <Container className="articleContainer">
                    <Box className='articleBox' sx={{ flexGrow: 1 }}>
                        <Grid className='articleGrid' container spacing={2}>
                            {data.map((data, index) => (
                                <Grid key={index} className='articleGridColumn articleGridColumn1' item xs={12} md={4}>
                                    <Item className='articleGridItem articleGridItem1'>
                                        <div className='articleCstm'>
                                            <a href={data.Link}>
                                                <img className='imgArticles' src={newImgsArr[index]?.url ?? imgData[index]?.url ?? intro?.defaultSrc ??  data.imgSrc} alt='...' />
                                            </a>

                                            <div className='articlesTextbox'>
                                                <p className='captionArticles rubik-ligt-moufit'>{data.captionArticles}</p>
                                                <p className='titleArticles noyh-bold-moufit'>{data.titleArticles}</p>
                                                <p className='paraArticles rubik-regular-moufit'>{data.paraArticle}</p>
                                                <a className='btnLinkArticle rubik-regular-moufit' href={data.btnLinkArticle}>ReadMore</a>
                                            </div>

                                        </div>
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>

            </div>
        </>
    )
}

export default Articles