import styled from 'styled-components'
import { CONTACTS } from '../../../../kv'
import { useEffect, useState } from 'react';

export default function Contacts({setSelectedUser, setMsg}) {

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
        }
        else {
          console.log(output.msg);
        }
      }

      doFetch();
    }
  }, [])

  return (
    <StyledDiv>
      <input type="text" placeholder='Search..' />

      {contacts
        ? contacts.contacts.map(contact => {
          return (
            <div className="contact" onClick={ () => {
              setSelectedUser({
                username: contact.username,
                dp: contact.dp
              });
              setMsg([]);
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