import styled from 'styled-components'
import { CONTACTS, TOKEN, getMsg } from '../../../../kv'
import { useEffect, useState } from 'react';

export default function Contacts({ setSelectedUser, setMsg }) {

  const [contacts, setContacts] = useState(CONTACTS);

  useEffect(() => {
    if (!CONTACTS) {
      async function doFetch() {

        let res = await fetch(getContacts, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `${TOKEN}`
          },
        });

        // get the output as a responce from the server
        let output = await res.json();

        if (output.status) {
          localStorage.setItem("CONTACTS", JSON.stringify(output.contacts));
          setContacts(output.contacts);
          location.reload();
        }
        else {
          console.log(output.msg);
        }
      }

      doFetch();
    }
  }, [])

  const getMessage = async (to) => {
    //payload
    let data = {
      'to': to,
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${TOKEN}`
      },
      body: JSON.stringify(data)
    }
    let res = await fetch(getMsg, options);

    // get the output as a responce from the server
    let output = await res.json();

    if (output.status) {
      let msg = output.msg;
      setMsg(msg);
    }
    else {
      alert(output.msg);
    }
  }

  if (contacts?.contacts.length > 0) {
    return (
      <StyledDiv>
        <input type="text" placeholder='Search..' />

        {contacts
          ? contacts?.contacts.map(contact => {
            return (
              <div className="contact" onClick={() => {
                setSelectedUser({
                  username: contact.username,
                  dp: contact.dp
                });
                getMessage(contact.username);
              }}>
                <div className="img-wrapper">
                  <img src={contact.dp} />
                </div>
                <h4>@{contact.username}</h4>
              </div>
            )
          })
          : null}

      </StyledDiv>
    )
  }
  else {
    return (
      <StyledWrapper>
        <input type="text" placeholder='Search..' />
        <div className="contact">
          <p>No Contacts</p>
        </div>
      </StyledWrapper>
    )
  }
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .contact{
      background-color: #def2ff;
      padding: 15px;
      display: flex;
      align-items: center;
      gap: 15px;
      border-radius: 10px;
      cursor: pointer;

      h4{
        color: #2b2b2b;
      }

      .img-wrapper{
          width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 999px;

          img{
              width: inherit;
              height: inherit;
              object-fit: cover;
          }
      }
  }
`

const StyledWrapper = styled.div`
  background-color: #f8fdff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  gap: 15px;

  .contact{
    background-color: #def2ff;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    border: 2px dashed grey;
  }
`