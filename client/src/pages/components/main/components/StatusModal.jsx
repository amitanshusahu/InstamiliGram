import { Link } from "react-router-dom"
import styled from "styled-components"

export default function StatusModal({statusToShow}){
  return (
    <StyledDiv>
      <div className="img-wrapper">
        <img src={statusToShow ? statusToShow.statusImg : null} alt="" />
      </div>
      <div className="caption">
        <Link to={"../" + (statusToShow?.username ? statusToShow.username : null)}>{statusToShow?.username ? statusToShow.username: null }</Link>
        <p>{statusToShow ? statusToShow.caption : null}</p>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 350px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;

  .img-wrapper{
    width: 350px;
    height: 500px;

    img{
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }
  a {
    color: #2c2c2c;
  }
  .caption{
    width: 100%;
    position: absolute;
    bottom: 0; 
    left: 0;
    height: 50px;
    padding: 15px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #ffffff9b;
    backdrop-filter: blur(2px);
    font-weight: bold;
    font-size:  15px;

    p{
      margin-top: 5px;
    }
  }
`