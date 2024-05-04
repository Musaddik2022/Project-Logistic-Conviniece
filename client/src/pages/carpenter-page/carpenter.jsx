import Navbar from "../../components/navbar/navbar";
import "./carpenter.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Review from "../../components/review/review";

export default function Carpenter(props) {
  const id = useParams().id;
  const [allCarpenters, setAllCarpenters] = useState([]);
  const [isGot, setGot] = useState(false);
  const [user, setUser] = useState({});
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getall/carpenter/all/xyz")
      .then((response) => {
        setAllCarpenters(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (props.login == "service") {
      axios
        .get("http://localhost:8080/getservice/" + id)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("http://localhost:8080/getuser/" + id)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setGot(true);
  }

  const changeHandler = (e) => {
    if (e.target.id == "sort") {
      if (e.target.value == "rating") {
        axios
          .get("http://localhost:8080/getall/carpenter/rating/xyz")
          .then((response) => {
            setAllCarpenters(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (e.target.value == "nearby") {
        axios
          .get("http://localhost:8080/getall/carpenter/nearby/" + user.city)
          .then((response) => {
            setAllCarpenters(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (e.target.value == "all") {
        axios
          .get("http://localhost:8080/getall/carpenter/all/" + user.city)
          .then((response) => {
            setAllCarpenters(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div>
      <Navbar login={props.login} id={id} />
      <div className="major-service">
        <div className="socket">
          <div className="slider-bar">
            <img
              src="https://webtk.sfastservices.com/blogimg/Carpenter%20Services-Sfastservices.jpeg"
              className="slider-img"
            />
            <img
              src="https://www.worthview.com/wp-content/uploads/2019/12/featured-image.jpg"
              className="slider-img"
            />
            <img
              src="https://img.freepik.com/premium-photo/closeup-man-carpenter-using-nail-gun-carpenter-using-air-nail-gun-doing-wooden-furniture-work-vintage-style_180392-481.jpg?w=2000"
              className="slider-img"
            />
            <img
              src="https://images.snapwi.re/f9ba/5e5a9331de99c5cab75e26df.w800.jpg"
              className="slider-img"
            />
            <img
              src="https://www.thebcc.ac.uk/wp-content/uploads/2015/06/BUILDING_CRAFTS_COLLEGE_38-960x470.jpg"
              className="slider-img"
            />
          </div>
        </div>
        <div className="operations">
          <div className="option">
            <label for="sort">Sort By</label>
            <select id="sort">
              <option value="all">Show All</option>
              <option value="rating">Rating</option>
              <option value="nearby">Nearby</option>
            </select>
          </div>
        </div>
        <div className="major-service-list">
          {allCarpenters.map((item) => (
            <div className="service-pro-box" key={item.id}>
              <img
                className="service-pro-img"
                src={"data:image/jpeg;base64," + item.profile}
              />
              <div className="details-box">
                <h2>{item.name}</h2>
                <Review rating={item.rating} />
                <p>{item.description}</p>
                <a
                  className="see-all"
                  href={"/user-dash/" + props.login + "/" + id + "/" + item.id}
                >
                  See work..
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="Contact">
          <h1>Contact us</h1>
          <div className="social">
            <a href="">
              <i class="social-icon fa-brands fa-facebook-square"></i>
            </a>
            <a href="">
              <i class="social-icon fa-brands fa-twitter-square"></i>
            </a>
            <a href="">
              <i class="social-icon fa-brands fa-instagram-square"></i>
            </a>
            <a href="">
              <i class="social-icon fa-brands fa-reddit-square"></i>
            </a>
          </div>
          <div className="other">
            <h4>Helpline-231-345671</h4>
            <h4>Mail us FlipsideCustomer@gmail.com</h4>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
