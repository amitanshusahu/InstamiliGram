import styled from "styled-components"
import user from '../../../../assets/user.png'
import { USER_PROFILE } from "../../../../kv"
import nostatus from '../../../../assets/status.jpg';


export default function Status({ setIsShowStautsModal, status, setStatusToShow }) {
  return (
    <StyledDiv id="status-bar">
      <div className="wrapper">

        {status
          ? status.map(stat => {
            return (
              <div className="status" id="my-status" onClick={() => {
                setIsShowStautsModal(true)
                setStatusToShow({ statusImg: stat.statusImg, caption: stat.body, username: stat.username})
              }}>
                <img src={stat.userImg} />
              </div>
            )
          }).reverse()
          : <div className="status" id="my-status" onClick={() => {
            setIsShowStautsModal(true)
            setStatusToShow({ statusImg: nostatus, caption: "No Status, Your Status Will Show Here" })
            }}>
            <img src={USER_PROFILE ? USER_PROFILE.dp : user} />
          </div>
        }


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
  position: relative;

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