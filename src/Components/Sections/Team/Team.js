import React from 'react'
import './Team.css'
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
function Team({ data, titleTeam, newImgsArr }) {
    return (
        <>
            <div className='titleSection'>
                <h2 className='sectionMainHeading noyh-bold-moufit'>{titleTeam.heading}</h2>
                <p className='sectionMainPara rubik-regular-moufit'>{titleTeam.paragraph}</p>
            </div>
        <div className='teamMainContainer'>
            <Container>
            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

      {data.map((data, index) => (
        <Grid className='teamColumn' key={index} item xs={6} md={3}>
          <Item className='teamItem'>
            <div className='teamBox'>
                <img className='memberImage' style={{height: '275px', width: '100%'}} src={newImgsArr[index]?.url ?? data.teamImageSrc ?? titleTeam?.defaultImg} alt={data.teamMemberName} />
                <div className='teamTextbox'>
                    <h2 className='nameMember noyh-regular-moufit'>{data.teamMemberName}</h2>
                    <p style={{height: '30px'}} className='designationMember rubik-regular-moufit'>{data.teamMemberDesignation}</p>
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

export default Team
