import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components";
import uimg from "../../../assets/user.png"
import { USERNAME, TOKEN, postGetProfile, postGetUserPost, postIsFollowing, postFollow, postUnFollow } from "../../../kv";
import MiniPosts from "./MiniPosts";

export default function Profile() {

  const params = useParams();
  const [username, setUsername] = useState();
  const [user, setUser] = useState(null);
  const [userPost, setUserpost] = useState();
  const [isFollowing, setisFollowing] = useState(false);
  const [showFollow, setShowFollow] = useState(false);


  useEffect(() => {
    setUsername(params.username);

    async function fetchUserProfile() {
      //payload
      let data = {
        "username": params.username
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
        setUser(output.user);
        if (TOKEN) setShowFollow(true);
      }
      else {
        alert(output.msg);
        setShowFollow(false);
      }
    }

    async function fetchUserIsFollowing() {
      //payload
      let data = {
        "follow": params.username
      };

      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `${TOKEN}`
        },
        body: JSON.stringify(data)
      }

      let res = await fetch(postIsFollowing, options);

      // get the output as a responce from the server
      let output = await res.json();
      
      if ( params.username != USERNAME ){
        setisFollowing(output.status);
      }
      else setisFollowing(true);
    }

    async function fetchUserPosts() {
      //payload
      let data = {
        "username": params.username
      };

      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `${TOKEN}`
        },
        body: JSON.stringify(data)
      }

      let res = await fetch(postGetUserPost, options);

      // get the output as a responce from the server
      let output = await res.json();

      if (output.status) {
        setUserpost(output.posts);
      }
      else {
        console.log(output.msg);
      }
    }

    fetchUserProfile();
    fetchUserIsFollowing()
    fetchUserPosts();
  }, []);

  const handelFollow = async () => {
    //payload
    let data = {
      "follow": params.username
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${TOKEN}`
      },
      body: JSON.stringify(data)
    }

    let res = await fetch(postFollow, options);

    // get the output as a responce from the server
    let output = await res.json();

    if (output.status) {
      localStorage.setItem("CONTACTS", JSON.stringify(output.contacts));
      location.reload()
    }
    else {
      console.log(output.msg);
    }
  }

  const handelUnFollow = async () => {
    //payload
    let data = {
      "unfollow": params.username
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${TOKEN}`
      },
      body: JSON.stringify(data)
    }

    let res = await fetch(postUnFollow, options);

    // get the output as a responce from the server
    let output = await res.json();

    if (output.status) {
      localStorage.setItem("CONTACTS", JSON.stringify(output.contacts));
      location.reload()
    }
    else {
      console.log(output.msg);
    }
  }

  return (
    <StyledDiv>
      <div className="profile-wrapper">

        <div className="dp-wrapper"> {user ? <img src={user.dp} /> : <img src={uimg} />} </div>
        <div className="info-wrapper">
          <h2>@{username}</h2>
          <div className="bio"> {user ? user.bio : ""} </div>
          {(showFollow) 
          ? ( isFollowing ? <button className="unfollow" onClick={handelUnFollow}> Following </button> : <button className="follow" onClick={handelFollow}>Follow </button> )
          : " "}
        </div>

      </div>
      <div className="post-wrapper">
        {
          (userPost && userPost.length > 0)
            ? (
              userPost.map(post => {
                return (
                  <MiniPosts
                    img={post.postImg}
                    body={post.body}
                  />
                )
              }).reverse()
            )
            : (" ")
        }
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  height: 100vh;
  overflow: auto;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.05);

  .profile-wrapper{
    display: flex;
    padding: 30px;
    margin-left: 60px;
    gap: 30px;

    .dp-wrapper{
      width: 200px;
      height: 200px;
      overflow: hidden;
      border-radius: 999px;

      img{
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }

    .info-wrapper{
      max-width: 300px;
      margin-top: 50px;

      h2{
        margin-bottom: 2px;
      }

      .bio{
        color: #505050;
        font-weight: bold;
        margin-left: 5px;
      }

      button{
        margin-top: 15px;
        width: 100px;
        display: flex;
        justify-content: space-around;
        animation: pop 0.3s ease-in-out !important;
      }

      .unfollow{
        color: #afafaf;
        background-color: #eeeeee;
      }
    }
  }

  .post-wrapper{
    padding: 30px;
    margin-left: 20px;
    margin-top: 30px;
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fill, 240px);
    grid-template-rows: 295px;
  }
`