import "./processing.css"

export default function Logout() {
  return (
    <div className="logout">
        <div className="logout-box">
             <h1>Processing</h1>
             <h3>Please wait while we process your request</h3>
             <div className="dot-box">
                <h1 className="dot1">.</h1>
                <h1 className="dot1">.</h1>
                <h1 className="dot1">.</h1>
             </div>  
        </div>   
    </div>
  )
}
