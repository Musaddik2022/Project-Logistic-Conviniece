import { useState } from "react";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import Carpenter from "./pages/carpenter-page/carpenter";
import ProfileEdit from "./pages/editpage/profile-edit/profile-edit";
import WorkEdit from "./pages/editpage/work-edit/work-edit";
import Electrician from "./pages/electricians/electrician";
import Home from "./pages/home/home";
import AdminLogin from "./pages/login-register/admin-login/admin-log";
import Login_middle from "./pages/login-register/login-middle/login-middle";
import RegisterMiddle from "./pages/login-register/register-middle/register";
import ServiceProvier from "./pages/login-register/service-provider-register/service-provier";
import UserLogin from "./pages/login-register/user-login/user_login";
import UserRegister from "./pages/login-register/user-register/user-register";
import MyOrders from "./pages/myorders/myorders";
import Packers from "./pages/packersandmovers/Packers";
import Painter from "./pages/painter-page/painter";
import Plumber from "./pages/plumber/plumber";
import ServiceDash from "./pages/service-dashboard/service_dashborad";
import TileMaker from "./pages/tile-maker/TileMaker";
import UserDash from "./pages/userdashboard/user";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServiceLogin from "./pages/login-register/servicepro-login/servicePro-login";
import Ratework from "./pages/ratework/ratework";
import Logout from "./pages/processingpages/logout";
import Test from "./test/test";
import MyNotifications from "./pages/notifications/notifications";
import UserProfile from "./pages/editpage/user-profile-edit/userprofile";
import Otp from "./pages/login-register/Otp/otp";
import Fpassword from "./pages/login-register/forgotPssword/fpassword";
import Feedback from "./pages/feedback/feedback";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/home/user/:id" element={<Home login="user"/>}/>
          <Route path="/home/service/:id" element={<Home login="service"/>}/>
          <Route path="/carpenter/user/:id" element={<Carpenter login="user"/>}/>
          <Route path="/carpenter/service/:id" element={<Carpenter login="service"/>}/>
          <Route path="/electrician/user/:id" element={<Electrician login="user" />}/>
          <Route path="/electrician/service/:id" element={<Electrician login="service" />}/>
          <Route path="/painter/user/:id" element={<Painter login="user"/>}/>
          <Route path="/painter/service/:id" element={<Painter login="service"/>}/>
          <Route path="/packers/user/:id" element={<Packers login="user"/>}/>
          <Route path="/packers/service/:id" element={<Packers login="service"/>}/>
          <Route path="/plumber/user/:id" element={<Plumber login="user"/>}/>
          <Route path="/plumber/service/:id" element={<Plumber login="service"/>}/>
          <Route path="/tilesmaker/user/:id" element={<TileMaker login="user" />}/>
          <Route path="/tilesmaker/service/:id" element={<TileMaker login="service"/>}/>
          <Route path="/" element={<Login_middle/>}/>
          <Route path="/register-middle" element={<RegisterMiddle/>}/>
          <Route path="/login-user" element={<UserLogin/>}/>
          <Route path="/login-service" element={<ServiceLogin/>}/>
          <Route path="/register-user" element={<UserRegister/>}/>
          <Route path="/register-service" element={<ServiceProvier/>}/>
          <Route path="/user-dash/user/:userid/:serviceid" element={<UserDash login="user"/>}/>
          <Route path="/user-dash/service/:serviceproviderid/:serviceid" element={<UserDash login="service"/>}/>
          <Route path="/service-dash/:id" element={<ServiceDash login="service"/>}/>
          <Route path="/work-edit/:id" element={<WorkEdit login="service"/>}/>
          <Route path="/profile-edit/:id" element={<ProfileEdit login="service"/>}/>
          <Route path="/user-edit/:id" element={<UserProfile login="user"/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/orders/:id" element={<MyOrders login="user"/>}/>
          <Route path="/rate/:serviceid/:userid" element={<Ratework login="user"/>}/>
          <Route path="/notifications/user/:id" element={<MyNotifications login="user"/>}/>
          <Route path="/notifications/service/:id" element={<MyNotifications login="service"/>}/>
          <Route path="/forgot-password/user" element={<Fpassword login={"user"}/>} />
          <Route path="/forgot-password/service" element={<Fpassword login={"service"}/>} />
          {/* <Route path="/otp-confirm/:phone" element={<Otp />} />  */}
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    )
  }

export default App;
