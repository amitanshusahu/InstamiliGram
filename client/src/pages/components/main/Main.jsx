import { useEffect } from "react"
import { TOKEN, USER_PROFILE } from "../../../kv"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import Status from "./components/Status";
import Feed from "./components/Feed";

export default function Main() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!TOKEN && !USER_PROFILE) {
      navigate('../signup');
    }
  }, [])

  return (
    <StyledDiv>
      <div className="feed-wrapper">
        <Status />
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

  .feed-wrapper{
    /* background-color: white; */
    width: 75%;
    height: fit-content;
    max-width: 700px;
  }
`