import "./review.css"

export default function Review(props) {
  const rows = [];
  for(var i=1;i<=5;i++){
      if(i <= props.rating){
        rows.push(<i class="set-fill fa-solid fa-star" key={i}></i>)
      }else{
        rows.push(<i class="fa-solid fa-star" key={i}></i>)
      }
  }
  return (
    <div className="ratebox">
        <span>
          {rows}
        </span>
    </div>
  )
}
