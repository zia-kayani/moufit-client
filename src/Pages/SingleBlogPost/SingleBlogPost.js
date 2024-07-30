import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {Card, CardHeader, CardContent, Typography} from '@mui/material';

import './SingleBlogPost.css';

// import { makeStyles } from '@material-ui/core/styles';
// import {makeStyles} from '@mui/styles'


// const useStyles = makeStyles((theme) => ({
//   card: {
//     border: `1px solid ${theme.palette.grey[400]}`,
//     marginBottom: theme.spacing(2),
//     textAlign: 'left',
//   },
//   title: {
//     fontSize: '2em',
//     marginBottom: theme.spacing(1),
//     textAlign: 'left',
//   },
//   author: {
//     fontStyle: 'italic',
//     marginBottom: theme.spacing(2),
//     textAlign: 'left',
//   },
// }));

function SingleBlogPost() {

  // const classes = useStyles();
  const [blogPost, setBlogPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(id, 'id')
    axios.get(`http://127.0.0.1:8000/cms/blog/${id}`)
      .then(response => setBlogPost(response.data))
      .catch(error => console.log(error));
  }, [id]);

  return (
    <>
      <Card className={'blog-post'}>
        <CardHeader  title={blogPost?.title} sx={{
          marginLeft: '1em'
        }} />
        <CardContent>
          {blogPost?.author &&
            <Typography variant="subtitle1" className={'author'}>
              Written by ~{blogPost?.author}
            </Typography>
            // `Written by ~${blogPost?.author}`
          }
          <Typography variant="body1" className={'content'}>
            {blogPost?.content}
          </Typography>
        </CardContent>
      </Card>
    </>

  );
}

export default SingleBlogPost;


