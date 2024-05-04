import "./login-middle.css"

export default function Login_middle() {
  return (
    <div className="login-page">
        <div className="welcome-banner">    
          <h1>Angello</h1>
          <h3>Start your bussiness today</h3>
        </div>
        <div className="login-middle">
        <h1>Login as</h1>
         <div className="login-box2">
            <div className="login-box-plate">
            <i class="fa-solid fa-user"></i>
            <a href="/login-user">User</a>
            </div>
            <div className="login-box-plate">
            <i class="fa-solid fa-user-tie"></i>
            <a href="/login-service">Service Provider</a>
            </div>
            <h3>Not a member ?</h3>
            <a href="/register-middle">Register</a>
         </div>
    </div>
    </div>
    
  )
}
