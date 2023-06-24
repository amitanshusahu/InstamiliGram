import styled from "styled-components"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom";

export default function Post({ name, img, body, date, userImg }) {

  const [para, setPara] = useState(body.body);

  useEffect(() => {
    if (body.body) {
      if (body.body.length > 200) {
        let text = body.body.slice(0, 200);
        setPara(`${text} .....`)
      }
    }
  }, []);

  const viewMore = (e) => {
    if (e.target.innerText == "View More") {
      setPara(body.body);
      e.target.innerText = "View Less"
    }
    else {
      let text = body.body.slice(0, 200);
      setPara(`${text} .....`)
      e.target.innerText = "View More"
    }
  }

  return (
    <StyledDiv>
      <div className="header">

        <div className="img-wrapper"><img src={userImg}/></div>
        <div className="info">
          <h3> <Link to={"../"+name} >{name}</Link> </h3>
          <p>{date}</p>
        </div>
      </div>

      <div className="img-wrapper"><img src={img ? img : " " } /></div>

      <div className="body">
        <h4>{body.title ? body.title : null}</h4>
        <p>{para ? para : null}</p>
        {
          (body.body && body.body.length > 200) 
          ? <button onClick={viewMore}> View More</button> 
          : null 
        }
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  padding: 30px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.02);

  img{
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
  
  .header{
    display: flex;
    gap: 15px;
    align-items: center;

    .img-wrapper{
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 999px;
      outline: 2px solid #e6f2f3;
    }
  }

  .img-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    aspect-ratio: 1/1;
    border-radius: 15px;
  }

  .info{
    h3{
      
      a {color: #292929;}

    }
    p{
      color: grey;
    }
  }

  .body{
    h4{
      margin-bottom: 15px;
    }
    p{
      margin-bottom: 15px;
    }
    button{
      all: unset;
      color: #0066ff;
      cursor: pointer;
    }
  }

`