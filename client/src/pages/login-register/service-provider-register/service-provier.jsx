import { useEffect, useState } from "react";
import "./service-provider.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../img/user.jpeg";
import Otp from "../Otp/otp";

export default function ServiceProvier() {
  const [img1, setImg] = useState(img);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("electrician");
  const [adress, setadress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [Matching, setMatching] = useState(true);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Math.floor(Math.random() * (10000 - 1000) + 1000));
  const [isVarified, setVarified] = useState(false);

  const ChangeHandler = (e) => {
    if (e.target.id == "name") {
      setName(e.target.value);
    }
    if (e.target.id == "email") {
      setEmail(e.target.value);
    }
    if (e.target.id == "occupation") {
      setOccupation(e.target.value);
    }
    if (e.target.id == "adress") {
      setadress(e.target.value);
    }
    if (e.target.id == "city") {
      setCity(e.target.value);
    }
    if (e.target.id == "state") {
      setState(e.target.value);
    }
    if (e.target.id == "mobile") {
      setMobile(e.target.value);
    }
    if (e.target.id == "password1") {
      setPassword1(e.target.value);
    }
    if (e.target.id == "password2") {
      setPassword2(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password1 != password2) {
      toast.error("Passwords are not matching", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      email == "" ||
      name == "" ||
      mobile == "" ||
      adress == "" ||
      city == "" ||
      state == ""
    ) {
      toast.error("All Information must be provided!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (isVarified == false) {
        toast.error("Please Verify Phone!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("adress", adress);
        formdata.append("city", city);
        formdata.append("state", state);
        formdata.append("mobile", mobile);
        formdata.append("password", password1);
        formdata.append("occupation", occupation);
        console.log(formdata.get("name"));
        console.log(formdata.get("email"));
        console.log(formdata.get("adress"));
        console.log(formdata.get("city"));
        axios
          .post("http://localhost:8080/addservice", formdata, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data == "already exists") {
              toast.error("email already registred,Please use another email", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else if (response.data == "service registered") {
              toast.success(
                "Congrats..! service registered successfully! login again",
                {
                  position: "top-center",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
              setInterval(() => {
                navigate("/");
              }, 4000);
            } else {
              toast.error("oops...Some error occured", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("some error occured", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    }
  };

  const clickHandler = (e) => {
    if (e.target.id == "verify") {
      if (mobile != "") {
        var OtpCard = document.getElementById("verify-box")
        OtpCard.style.display = "flex";
        axios.get("https://www.fast2sms.com/dev/bulkV2?authorization=bhplEVGHSwu9qZ84Ck1N0mfvB6IKtAzjsacUXrW3gPJDeiyF2Mf6JEkDeHMqwpTR3O1SFd7QsG9hxVcn&variables_values="+otp+"&numbers="+mobile+"&route=otp").then(resp=>{
          if(resp.data.return == true){
            console.log(resp.data)
          }else{
            console.log(resp.data)
            toast.error("Not a valid Number", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            OtpCard.style.display = "none";
            setOtp(Math.floor(Math.random() * (10000 - 1000) + 1000))
          }
        }).catch(err=>{
          toast.error("Some error Occured", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(err);
          OtpCard.style.display = "none";
          setOtp(Math.floor(Math.random() * (10000 - 1000) + 1000))
        })
      }else{
        toast.error("Please provide mobile number", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  return (
    <>
      <div className="service-register">
        <div className="service-register-box">
          <div className="banner">
            <div className="banner-slider">
              <img
                className="img-register"
                src="https://www.westend61.de/images/0001180331l/portrait-of-happy-worker-in-factory-warehouse-ZEDF02244.jpg"
              />
              <img
                className="img-register"
                src="https://www.startupdonut.co.uk/sites/default/files/styles/landing_pages_lists/public/six-top-tips-for-starting-a-trade-business_530856187.jpg?itok=ppHxO8RM"
              />
              <img
                className="img-register"
                src="https://thumbs.dreamstime.com/b/happy-painter-painting-wall-wearing-hat-gloves-beige-using-roller-106961124.jpg"
              />
              <img
                className="img-register"
                src="https://www.iec-cincy.com/wp-content/uploads/2020/01/010320_IEC-Blog-Image_Jobs-you-Havent-Thought-Of-1.jpg"
              />
            </div>
          </div>

          <div className="form-box">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
              <div className="input-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name.."
                  id="name"
                  value={name}
                  onChange={ChangeHandler}
                />
              </div>
              <div className="input-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  placeholder="xyz@mail.com"
                  id="email"
                  value={email}
                  onChange={ChangeHandler}
                />
              </div>
              <div className="input-group">
                <label for="occupation">Occupation</label>
                <select
                  name="occ-list"
                  id="occupation"
                  value={occupation}
                  onChange={ChangeHandler}
                >
                  <option value="electrician">Electrician</option>
                  <option value="painter">Painter</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="packersandmovers">Packers and movers</option>
                  <option value="tilesmaker">Tiles Maker</option>
                </select>
              </div>
              <div className="input-group">
                <label for="street">Address</label>
                <input
                  type="text"
                  id="adress"
                  placeholder="street"
                  value={adress}
                  onChange={ChangeHandler}
                />
              </div>
              <div className="input-group">
                <label for="city">City</label>
                <input
                  type="text"
                  placeholder="City"
                  id="city"
                  value={city}
                  onChange={ChangeHandler}
                />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  placeholder="State"
                  id="state"
                  value={state}
                  onChange={ChangeHandler}
                />
              </div>
              <div className="input-group">
                <label htmlFor="mobile">Mobile No.</label>
                <input
                  type="text"
                  id="mobile"
                  placeholder="mobile number"
                  value={mobile}
                  onChange={ChangeHandler}
                />
              </div>
              <div className="verify-box">
                <button onClick={clickHandler}
                  type={"button"}
                  id="verify">verify</button>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  id="password1"
                  value={password1}
                  onChange={ChangeHandler}
                />
              </div>
              <div className="input-group">
                <label htmlFor="passwordC">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="password2"
                  value={password2}
                  onChange={ChangeHandler}
                />
              </div>
              <div className="button-div">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Otp otp={otp} stateChanger={setVarified} number={mobile}/>
      </div>
    </>
  );
}
