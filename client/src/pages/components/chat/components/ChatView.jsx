import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { TOKEN, USERNAME, postMsg } from '../../../../kv';
import nomsg from '../../../../assets/nomessage.webp'

export default function ChatView({ selectedUser, setMsg, msg, socket }) {

  const [input, setInput] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const scrollRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (socket && selectedUser && msg) {
      // check if selectedUser.username is online
      socket.emit('isOnline', selectedUser.username, cb => {
        setIsOnline(cb);
      })
      // recieve msg
      socket.on('recieve-msg', ms => {
        setMsg([...msg, { msg: ms, from: selectedUser.username }]);
      })
    }
  }, [selectedUser, msg])


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msg]);

  const handelInput = (e) => {
    setInput(e.target.value);
  }

  const handelMsgSend = async () => {
    setMsg([...msg, { msg: input, from: USERNAME }]);

    //payload
    let data = {
      'to': selectedUser.username,
      'msg': input
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${TOKEN}`
      },
      body: JSON.stringify(data)
    }
    let res = await fetch(postMsg, options);

    // get the output as a responce from the server
    let output = await res.json();

    if (output.status) {
      console.log("message saved");
    }
    else {
      alert(output.msg);
    }

    inputRef.current.value = "";

    if (socket) {
      // send msg
      let msgData = {
        to: selectedUser.username,
        msg: input
      }
      socket.emit('send-msg', msgData, cb => {
        setIsOnline(cb);
      })
    }
  }

  if (selectedUser) {
    return (
      <StyledDiv>
        <div className="header">
          <div className="img-wrapper">
            <img src={selectedUser ? selectedUser.dp : null} />
          </div>
          <div className='head-info'>
            <h3>{selectedUser ? selectedUser.username : "InstaMiliuser"}</h3>
            <p style={{ color: isOnline ? "lightgreen" : "grey" }} >{isOnline ? "online" : " offline"}</p>
          </div>
        </div>

        <div className="chat" ref={scrollRef} id='scroll'>

          {(msg?.length > 0)
            ? msg.map(m => {
              return (
                <div className="msg" style={{ alignSelf: (m.from == USERNAME) ? "flex-end" : "flex-start" }}>
                  {m.msg}
                </div>
              )
            })
            : null
          }

        </div>

        <div className="input">
          <input type="text" placeholder='Type Your Message Here...' ref={inputRef} onChange={handelInput} />
          <button onClick={handelMsgSend}>send</button>
        </div>
      </StyledDiv>
    )
  }
  else {
    return (
      <StyledWrapper>
        <div className="img-wrapper">
          <img src={nomsg} />
        </div>
      </StyledWrapper>
    )
  }
}

const StyledDiv = styled.div`
  background-color: #eef7ff;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #dae8ee;
  display: flex;
  flex-direction: column;

  .header{
    padding: 30px;
    background-color: white;
    display: flex;
    align-items: center;
    gap: 30px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    .img-wrapper{
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 999px;
            border: 2px solid pink;

            img{
                width: inherit;
                height: inherit;
                object-fit: cover;
            }
        }
  }
  
  .chat{
    height: calc(100vh - 292px);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  .input{
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background-color: white;
    display: flex;
    gap: 30px;

    input{
      width: 100%;
    }
  }

  .msg{
    margin: 15px;
    background-color: white;
    width: fit-content;
    padding: 15px;
    border-radius: 10px;
  }
`

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`