import { useEffect, useState } from "react"
import { TOKEN } from "../../../kv"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Contacts from "./components/Contacts";
import ChatView from "./components/ChatView";

export default function Chat() {

  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    if (!TOKEN) {
      navigate('../signup');
    }
  }, [])

  return (
    <StyledDiv>
      <Contacts setSelectedUser={setSelectedUser} setMsg={setMsg}/>
      <ChatView selectedUser={selectedUser} setMsg={setMsg} msg={msg}/>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 30px;
`