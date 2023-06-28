import { useState } from 'react'
import styled from 'styled-components'

export default function ChatView({ selectedUser, setMsg, msg }) {

  const [input, setInput] = useState(null);

  const handelInput = (e) => {
    setInput(e.target.value);
  }

  const handelMsgSend = () => {
    setMsg([...msg, input]);
  }

  return (
    <StyledDiv>
      <div className="header">
        <div className="img-wrapper">
          <img src={selectedUser ? selectedUser.dp : null} />
        </div>
        <h3>{selectedUser ? selectedUser.username : "InstaMiliuser"}</h3>
      </div>

      <div className="chat">

        {(msg?.length > 0)
          ? msg.map(m => {
            return (
              <div className="msg">
                {m}
              </div>
            )
          })
          : null
        }

      </div>

      <div className="input">
        <input type="text" placeholder='Type Your Message Here...' onChange={handelInput} />
        <button onClick={handelMsgSend}>send</button>
      </div>
    </StyledDiv>
  )
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
    overflow-y: auto;
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