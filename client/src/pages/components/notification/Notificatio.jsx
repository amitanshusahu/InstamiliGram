import styled from "styled-components"
import { useEffect } from "react"
import { TOKEN, USER_PROFILE } from "../../../kv"
import { Link, useNavigate } from "react-router-dom"
import { getNotification } from "../../../kv";
import { useState } from "react";

export default function Notification() {

  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!TOKEN && !USER_PROFILE) {
      navigate('../signup');
    }
    fetchNotification();
  }, [])

  const fetchNotification = async () => {
    let res = await fetch(getNotification, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${TOKEN}`
      },
    });

    // get the output as a responce from the server
    let output = await res.json();

    if (output.status) {
      setNotification(output.notification);
    }
    else {
      console.log(output.msg);
    }
  }

  return (
    <StyledDiv>
      <div className="notif-wrapper">
        <div className="heading">
          <h1>Notifications</h1>
          <button>Refresh</button>
        </div>

        {notification
          ? notification.map(notif => {
            return (
              <div className="notification">
                <div className="img-wrapper"><img src={notif.userdp}/></div>
                <div className="info">
                  <h3><Link to={"../" + notif.username}> {notif.username} </Link> : {notif.body.title}</h3>
                  <p>{notif.body.body}</p>
                  <p id="time">{new Date(notif.date).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}</p>
                </div>
              </div>
            )
          }).reverse()
          : null
        }

      </div>
    </StyledDiv >
  )
}

const StyledDiv = styled.div`
  padding: 60px;
  height: calc(100vh - 120px);
  overflow: hidden;
  overflow-y: scroll;

  #time{
    color: grey;
  }

  .notif-wrapper{
    max-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .heading{
    margin-bottom: 30px;
  }

  .notification{
    display: flex;
    align-items: center;
    gap: 30px;
    background-color: #f6fdff;
    border: 1px solid #ceefff;
    padding: 30px;
    border-radius: 15px;
    
    &:nth-child(2n){
      background-color: #eaf7ff;
    }

    .img-wrapper{
      width: 70px;
      height: 70px;
      overflow: hidden;
      border-radius: 999px;

      img{
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }
  }

  .heading{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


`