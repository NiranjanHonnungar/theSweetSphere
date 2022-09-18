import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SubHeading, StarRating } from "../../components";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiCake3Fill } from "react-icons/ri";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./Feedback.css";
const Feedback = ({ cid, feedbacks, avgRating, getFeedback }) => {
  useEffect(() => {
    getFeedback();
  }, []);
  return (
    <div className="feedback section__padding">
      <h1 className="feedback__heading">Feedback</h1>
      <div className="underline" style={{ width: "100%" }} />
      <div className="feedback__average-rating">
        <FaStar size="1.7rem" style={{ marginRight: "0.5rem" }} />
        <SubHeading
          title={`Average Rating : ${Number.parseFloat(avgRating).toFixed(
            3
          )} / 5`}
        />
      </div>
      <div className="feedback__feedback-list">
        {feedbacks.map((f, idx) => {
          return <Testimonial key={idx} feedback={f} />;
        })}
      </div>
      <div className="underline" style={{ width: "100%" }} />
      <Posting cid={cid} getFeedback={getFeedback} />
      <Outlet />
    </div>
  );
};

const Testimonial = ({ feedback }) => {
  const rating = feedback.rating;
  return (
    <div className="f_container">
      <div className="feedback-container">
        <IoPersonCircleOutline size={"4rem"} />
        {/* <div className="profile-icon">
            <img
              className="default-prof"
              src={img.person}
              style={{ width: "5rem" }}
            />
            
          </div> */}
        <div className="username">
          <p>{feedback.fname + " " + feedback.lname}</p>
        </div>
      </div>
      <div className="rating-static">
        {[...Array(5)].map((star, idx) => {
          return (
            <FaStar
              key={idx}
              size="2rem"
              color={idx + 1 <= rating ? "var(--color-yellow)" : "#e4e5e9"}
            />
          );
        })}
      </div>
      <div className="feedback-content">
        <FaQuoteLeft size="2rem" color="var(--color-dark-blue)" />
        <p>
          {feedback.feedback +
            feedback.feedback +
            feedback.feedback +
            feedback.feedback}
        </p>
        <FaQuoteRight
          size="2rem"
          color="var(--color-dark-blue)"
          style={{ alignSelf: "flex-end" }}
        />
      </div>
    </div>
  );
};

const Posting = ({ cid, getFeedback }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (cid == 0) {
      alert("Not Logged in!");
      navigate("/login");
      return;
    }
    console.log(feedback, rating);
    if (rating == 0 || feedback == "") {
      alert("Rating/Review not given!");
      return;
    }
    const post = {
      rating: rating,
      feedback: feedback,
    };
    axios
      .post(`http://localhost/thesweetsphere/feedback.php/${cid}`, post)
      .then((data) => {
        console.log(data);
        getFeedback();
        alert("Feedback Posted!");
        setRating(0);
        setFeedback("");
        window.scrollTo(0, 0);
      });
  };
  return (
    <div class="feedback__posting">
      <div className="posting__heading">
        <RiCake3Fill size={"2rem"} />
        <h1>GIVE FEEDBACK</h1>
        <RiCake3Fill size={"2rem"} />
      </div>
      <div class="feedback-rating">
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <textarea
        class="posting__text"
        placeholder="Enter your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows="25"
        cols="27"
      ></textarea>

      <button class="posting__btn" type="submit" onClick={onSubmit}>
        POST
      </button>
    </div>
  );
};
export default Feedback;
