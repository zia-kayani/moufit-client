import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import './PricingHome.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PathCheck from '../../../Svgs/PathCheck';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function PricingHome({ data, mainPara, info, priceData, onClick, arrToMap }) {
    const navigate = useNavigate();


    const navigateToForm = async () => {
        const matchingPlan = priceData?.find((x) => x.plan.name === data.plan);
        console.log(matchingPlan)
        if (priceData) {
            let tempObj = {
                planId: matchingPlan, priceData: priceData
            }
            navigate('/join-now', matchingPlan ? { state: { tempObj } } : { state: { tempObj } });
        } else {
            console.log('No Price Data found !')
        }
    }

    return (
        <>
            <Box className="PricingMain">
                <Container className="PricingContainer">
                    <div className="titleSection">
                        <h2 className="sectionMainHeading noyh-bold-moufit">
                            {info?.title ?? mainPara?.heading ?? ''}
                        </h2>
                        <p className="sectionMainPara rubik-regular-moufit">
                            {info?.sub_title ?? mainPara?.sub_heading ?? ''}
                        </p>
                    </div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid className="PricingGridRow" container spacing={2}>
                            {data.map((data, index) => (
                                <Grid key={index} className="PricingColumn PricingColumn1" item xs={12} md={4}>
                                    <Item
                                        className="PricingItem PricingItem1"
                                        // onClick={() => console.log('plan card', data.plan === "Physical Workout - Unlimited" ? "physical-workout": index)}
                                        // onClick={() => {
                                        //     navigate('/join-now', data.plan === "Physical Workout - Unlimited" ? { state: { planId: "physical-workout" } } : { state: { planId: '' } })
                                        // }}
                                        onClick={() => onClick ? onClick() : navigateToForm()}
                                    >
                                        <div className="pricingContext">
                                            <div className="pricingInfo">
                                                <h4 className="subheadingPricing rubik-bold-moufit">{data?.access ?? ''}</h4>
                                                <h3 className="headingPricing noyh-bold-moufit">{data?.plan ?? ''}</h3>
                                                <div className="textMonthly">
                                                    <h1 className="costPricing noyh-bold-moufit">{data?.price ?? ''}</h1>
                                                    <p className="planPricing rubik-regular-moufit">{data?.duration ?? ''}</p>
                                                </div>
                                            </div>
                                            <div className="" >

                                                {arrToMap && arrToMap.map((x, i) => {
                                                    return (
                                                        <div>
                                                            <PathCheck className="iconPricing" />

                                                            {x}
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            <div className="pricingFeatures rubik-medium-moufit">

                                                {data?.features && _.times(data?.features?.length, (index) => {
                                                    return (
                                                        <div key={index} className="iconTextContainer">
                                                            <PathCheck className="iconPricing" />
                                                            <p className="textPricing">{data.features[index]}</p>
                                                        </div>
                                                    );
                                                })}

                                                {/* {_.times(data?.features?.length, (index) => {
                                                    return (
                                                        <div key={index} className="iconTextContainer">
                                                            <PathCheck className="iconPricing" />
                                                            <p className="textPricing">{data.features[index]}</p>
                                                        </div>
                                                    );
                                                })} */}
                                                {/* {(data?.features || arrToMap) ?? _.times((data?.features || arrToMap).length, (index) => {
                                                    return (
                                                        <div key={index} className="iconTextContainer">
                                                            <PathCheck className="iconPricing" />
                                                            <p className="textPricing">{data.features[index] ?? arrToMap[index] ?? arrToMap ?? 'text'}</p>
                                                        </div>
                                                    );
                                                })} */}
                                            </div>
                                        </div>
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default PricingHome;
