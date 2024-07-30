import React from 'react'
import './Faqs.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Container } from '@mui/system';


export default function Faqs({body, data }) {
    return (
        <>
            <div className='FaqContainer'>
                <div className='titleSection'>
                    <h2 className='sectionMainHeading noyh-bold-moufit'>{body?.heading ?? 'FAQs'}</h2>
                    <p className='sectionMainPara rubik-regular-moufit'>{body?.sub_heading ?? 'Lorem ipsum dollar sit imet'}</p>
                </div>
                {data?.map((x, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className='flex-heading'>
                                <img src='./MoufitMedia/faqIcon.png' alt={'img alt'} />
                                <Typography className="headingAccordian">{x.title}</Typography>
                            </div>


                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="paraAccordian">
                                {x?.description ?? x?.text ?? ''}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

        </>
    )
};
