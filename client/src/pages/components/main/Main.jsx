import { useEffect, useState } from "react"
import { TOKEN, USER_PROFILE, getStauts } from "../../../kv"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import Status from "./components/Status";
import Feed from "./components/Feed";
import StatusModal from "./components/StatusModal";

export default function Main() {

  const navigate = useNavigate();
  const [isShowStatusModal, setIsShowStautsModal] = useState(false);
  const [status, setstatus] = useState(null);
  const [statusToShow, setStatusToShow] = useState(null);

  useEffect(() => {
    if (!TOKEN && !USER_PROFILE) {
      navigate('../signup');
    }
  }, []);


  useEffect(() => {
    async function doFetch() {

      let res = await fetch(getStauts, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `${TOKEN}`
        },
      });

      // get the output as a responce from the server
      let output = await res.json();

      if (output.status) {
        setstatus(output.userStauts);
      }
      else {
        console.log(output.msg);
      }
    }

    doFetch();
  }, [])

  return (
    <StyledDiv>
      <div className="feed-wrapper">

        {isShowStatusModal
          ? <div id="modal" className="main-util" onClick={ () => setIsShowStautsModal(false)}>
            <StatusModal statusToShow={statusToShow}/>
          </div>
          : null
        }

        <Status setIsShowStautsModal={setIsShowStautsModal} status={status} setStatusToShow={setStatusToShow}/>
        <Feed />
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #dce7ec;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;

  .main-util{
    left: 0;
  }

  @media only screen and (min-width: 1444px) {
    .main-util{
      all: unset;
      left: ${(document.querySelector("body").clientWidth - 1444)/2 + "px"}
    }
  }

  .feed-wrapper{
    /* background-color: white; */
    width: 75%;
    height: fit-content;
    max-width: 700px;
  }
`