import styled from 'styled-components';
import Nav from './components/Nav';
import { useState } from 'react';
import PostModal from './components/main/components/PostModal';
import { useEffect } from 'react';
import userImg from '../assets/user.png'
import { USERNAME, USER_PROFILE, postGetProfile } from '../kv';

export default function Home({ component }) {

  const [isShowModal, setShowModal] = useState(false);
  const [user, setUser] = useState({
    dp: userImg
  });

  useEffect(() => {
    async function fetchUserProfile() {
      //payload
      let data = {
        "username": USERNAME
      };

      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
      }
      let res = await fetch(postGetProfile, options);

      // get the output as a responce from the server
      let output = await res.json();

      if (output.status) {
        localStorage.setItem("USER_PROFILE", JSON.stringify(output.user));
        setUser(output.user);
      }
      else {
        console.log(output.msg);
      }
    }

    if(!USER_PROFILE) {
      fetchUserProfile();
    }
  }, [])

  return (
    <StyledLayout>

      {isShowModal
        ? <div id="modal">
          <PostModal setShowModal={setShowModal} user={user}/>
        </div>
        : null
      }

      <Nav setShowModal={setShowModal} user={user}/>
      {component}
    </StyledLayout>
  )
}

const StyledLayout = styled.div`
    width: 100%;
    max-width: 1444px;
    margin: auto;
    height: 100%;
    /* overflow: hidden; */
    display: grid;
    grid-template-columns: 1fr 10fr;

    #modal{
      position: absolute;
      width: 100vw;
      height: 100vh;
      background-color: #000000bc;
      z-index: 999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 1444px;
      margin: auto;
      transition: all 0.3s ease;
    }
`