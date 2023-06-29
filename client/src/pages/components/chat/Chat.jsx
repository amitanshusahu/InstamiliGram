import { useEffect, useState } from "react"
import { TOKEN, USERNAME } from "../../../kv"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Contacts from "./components/Contacts";
import ChatView from "./components/ChatView";
import { io } from 'socket.io-client';

export default function Chat() {

  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [msg, setMsg] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!TOKEN) {
      navigate('../signup');
    }
  }, []);

  useEffect(() => {
    let s = io('http://localhost:3000');

    s.on("connect", (socket) => {
      setSocket(s);
    });

    s.emit('add-online', USERNAME);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <StyledDiv>
      <Contacts setSelectedUser={setSelectedUser} setMsg={setMsg}/>
      <ChatView selectedUser={selectedUser} setMsg={setMsg} msg={msg} socket={socket}/>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 30px;
    height: calc(100vh - 60px);
    overflow: hidden;
    overflow-y: scroll;
`