import React, { useState, useEffect } from 'react'
import './Blog.css'
import Articles from '../../Components/Sections/Articles/Articles'
import HeaderBannerPages from '../../Components/Sections/HeaderBannerPages/HeaderBannerPages'
import axios from 'axios'
import { Button } from '@mui/material'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     margin: theme.spacing(2),
//   },
//   loadMoreButton: {
//     margin: theme.spacing(2),
//   },
// }));

const staticBlogsData = [
  { imgSrc: './MoufitMedia/1blog.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
  { imgSrc: './MoufitMedia/2blog.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
  { imgSrc: './MoufitMedia/3blog.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
  { imgSrc: './MoufitMedia/4blog.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
  { imgSrc: './MoufitMedia/5blog.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
  { imgSrc: './MoufitMedia/6blog.jpg', Link: "", captionArticles: "Lorem Ipsum Dollar", titleArticles: "Hoe hiking helps body!", paraArticle: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …", btnLinkArticle: "" },
];

function Blogs() {

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  const fetchBlogs = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/cms/blog_list`);
    setBlogs(response.data.results || staticBlogsData);
    console.log(response.data.results)
    console.log(response.data.next)

    let hasNext = true
    // if(response.data.next){
    //     handleLoadMore();

    // }
    // while (response.data.next && hasNext) {
    // console.log('blogs updated func')
      //   handleLoadMore();      
    // }
  }

  const handleLoadMore = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/cms/blog_list?page=${page + 1}`);
    setBlogs([...blogs, ...response.data.results]);
    setPage(page + 1);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBlogs();
  }, []) 

  useEffect(() => {
    console.log('blogs updated effect')
    // fetchBlogs();
  }, [blogs]) //@@ ADD blogs in Arr if needed


  return (
    <>
      <div className="blogs">
        <HeaderBannerPages text="Blogs" />
        <Articles
          intro={{
            heading: "",
            paragraph: "",
            defaultSrc: './MoufitMedia/1blog.jpg',
          }}
          data={
            // blogs && blogs ? blogs?.map((x, i) => {
            blogs.length > 0 ? blogs?.map((x, i) => {
              return {
                imgSrc: `./MoufitMedia/${i + 1}blog.jpg`,
                Link: `blog/${x.id}`,
                captionArticles: x?.title ?? "Lorem Ipsum Dollar",
                titleArticles: x?.title ?? "Lorem Ipsum Dollar",
                paraArticle: x?.content ?? "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …",
                btnLinkArticle: `blog/${x.id}`
              }
            }) : staticBlogsData
          }
        />
        {blogs && blogs.length >= 10 ? (
          <Button
            variant="contained"
            color="primary"
            // className={classes.loadMoreButton}
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        ) : ''}

      </div>
    </>
  )
}

export default Blogs