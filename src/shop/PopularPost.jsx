import React from "react";
import { Link } from "react-router-dom";

const title = "Most Popular Post";
const postList = [
  {
    id: 1,
    imgUrl: "/src/assets/images/blog/10.jpg",
    imgAlt: "rajibraj91",
    title: "Poor People Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 2,
    imgUrl: "/src/assets/images/blog/11.jpg",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 3,
    imgUrl: "/src/assets/images/blog/12.jpg",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
  {
    id: 4,
    imgUrl: "/src/assets/images/blog/09.jpg",
    imgAlt: "rajibraj91",
    title: "Poor Peoples Campaign Our Resources",
    date: "Jun 05,2022",
  },
];

const PopularPost = () => {
  return (
    <div className="widget widget-post">
      <div className="widget-header">
        <h5>{title}</h5>
      </div>

      <ul className="widget-wrapper">
        {postList.map((val, i) => {
          return (
            <li key={i} className="d-flex flex-wrap justify-content-between">
              <div className="blog-thumb">
                <Link to={`/blog/${val.id}`}>
                  <img src={val.imgUrl} alt="" />
                </Link>
              </div>
              <div className="post-content">
                <Link to={`/blog/${val.id}`}><h5>{val.title}</h5></Link>
                <p>{val.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopularPost;
