import styled from "styled-components"
import user from '../../../../assets/user.png'
import { USER_PROFILE } from "../../../../kv"


export default function Status() {
  return (
    <StyledDiv>
      <div className="wrapper">

        <div className="status" id="my-status">
          <img src={ USER_PROFILE ?  USER_PROFILE.dp : user} />
        </div>


      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: white;
  width: 100%;
  overflow-x: auto;
  border-radius: 15px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.02);

  .wrapper{
    padding: 30px;
    display: flex;
    align-items: center;
    gap: 30px;
    width: fit-content;

    .status{
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 999px;
      outline: 3px solid #e6f2f3;
      cursor: pointer;

      img{
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }

  }
`