import React, { useState } from 'react';
import { Container } from '@mui/system';
import {Grid} from '@mui/material'
 import './ContactForm.css';

function ContactForm({ title }) {

    let [contactForm, setContactForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",

    });
    const onChange = (e) => {
        console.log("The target name", e.target.name);
        console.log("The target value", e.target.value);
        setContactForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

    }

    return (
        <>
            <div className='contactFormMain'>
                <div className='titleSection'>
                    <h2 className='sectionMainHeading noyh-bold-moufit'>{title.heading}</h2>
                    <p className='sectionMainPara rubik-regular-moufit'>{title.paragraph}</p>
                </div>
                <Container sx={{
                    width: '70%'
                }}>
                    <div className='formMain'>
                       <div className='flexBoxInput'>
                       <div className='fieldbox'>
                            <label className="label labelFirstName">
                                First Name
                            </label>
                            <input
                                className="inputMain inputFirstName"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={contactForm.firstName}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className='fieldbox'>
                            <label className="label labelLastName">
                                Last Name
                            </label>
                            <input
                                className="inputMain inputLastName"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={contactForm.lastName}
                                onChange={onChange}
                                required
                            />
                        </div>
                       </div>
                       <div className='flexBoxInput'>
                       <div className='fieldbox'>
                            <label className="label labelEmail">
                                Email
                            </label>
                            <input
                                className="inputMain inputEmail"
                                type="email"
                                placeholder="example@email.com"
                                value={contactForm.email}
                                name="email"
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className='fieldbox'>
                            <label className="label labelSubject">
                                Subject
                            </label>
                            <input
                                className="inputMain inputSubject"
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={contactForm.subject}
                                onChange={onChange}
                                required
                            />
                        </div>
                       </div>
                      
                        <div className='fieldbox'>
                            <label className="label labelMessage">
                                Subject
                            </label>
                            <input
                                className="inputMain inputMessage"
                                type="textarea"
                                name="message"
                                placeholder="enter message here"
                                value={contactForm.message}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <button className='submitFormBtn'>
                            {title.btnText ?? 'Send Message'}
                        </button>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default ContactForm;