import styled from "styled-components"

export default function MiniPosts({ img, body }) {
  return (
    <StyledDiv>
      <div className="img-wrapper">
        <img src={img} />
      </div>
      <h4>{body.title}</h4>
      <p>{body.body}</p>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 255px;
  border-radius: 10px;
  animation: pop 0.3s ease-in-out !important;

  .img-wrapper{
    width: 200px;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;

    img{
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }

  h4{
    margin: 15px 0 0 0;
  }

  p{
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`