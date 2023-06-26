import styled from "styled-components";
import { Chat, Trending, Reel, Bell, Home, Add } from '../../assets/icons'
import { useNavigate } from "react-router-dom";
import { USERNAME, USER_PROFILE } from "../../kv";

export default function Nav({setShowPostModal, setShowStatusUploadModal, user}) {

  const navigate = useNavigate();

  return (
    <StyledDiv>
        <menu>
          <div id='dp' onClick={ () => navigate(`../${ (USERNAME) ? USERNAME : "User" }`) }>
             <img src={(USER_PROFILE) ? USER_PROFILE.dp : user.dp} /> 
          </div>
          <li onClick={ () => navigate('../home') }> <Home /> </li>
          <li onClick={ () => navigate('../chat') }> <Chat /> </li>
          <li onClick={ () => navigate('../trending') }> <Trending /> </li>
          <li onClick={ () => navigate('../reel') }> <Reel /> </li>
          <li onClick={ () => navigate('../notification') }> <Bell /> </li>
        </menu>
        
        <menu>
          <li id="post"> 
            
            <ul id="action-modal">
              <li onClick={ () => {setShowPostModal(true)}}> <button>⭐ Create A Post</button></li>
              <li onClick={ () => {setShowStatusUploadModal(true)}}> <button>⭐ Update Status</button></li>
              <li> <button style={{color: "lightcoral"}}>💔 Logout</button></li>
            </ul>

            <Add /> 
          </li>
        </menu>
    </StyledDiv>
  )

}

const StyledDiv = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  menu > #post:hover > #action-modal{
    scale: 1;
  }

  menu{
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        justify-content: center;
        height: fit-content;

        

        li{
          padding: 10px;
          list-style: none;
          border-radius: 10px;
          cursor: pointer;
          margin: 0 20px;
          transition: all 0.3s ease;

          &:hover{
            background-color: #d7f3ff;
          }
        }

        #post{
          margin-bottom: 30px;
          position: relative;

          #action-modal{
            position: absolute;
            width: max-content;
            /* left: 60px; */
            bottom: 60px;
            background-color: #ffffff;
            box-shadow: 0 2px 10px rgba(0,0,0, 0.15);
            border-radius: 15px;
            overflow: hidden;
            scale: 0;
            transition: all 0.2s ease-in-out;


            &:hover{
              display: block;
            }

            li{
              all: unset;
              display: block;
              padding: 10px 15px;
              font-size: 15px;
              font-weight: 500;
              color: #444444;
              border-bottom: 1px solid lightgrey;

              &:hover{
                background-color: #effaff;
              }

              button{
                all: unset;
              }
            }
          }
        }

        #dp {
          all: unset;
          width: 60px;
          height: 60px;
          overflow: hidden;
          margin-top: 30px;
          margin-bottom: 15px;
          border-radius: 999px;
          outline: 3px solid pink;
          cursor: pointer;

          img{
            width: inherit;
            height: inherit;
            object-fit: cover;
          }

        }
      }
`