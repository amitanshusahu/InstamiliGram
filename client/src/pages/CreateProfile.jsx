import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import banner from '../assets/banner.jpg';
import user from '../assets/user.png';
import { TOKEN, USERNAME, USER_PROFILE, postCreateContact, postCreateProfile } from '../kv';

export default function CreateProfile() {

  const [username, setUsername] = useState(USERNAME);
  const [bio, setBio] = useState();
  const [userImg, setUserImg] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!TOKEN) navigate("../login")
    if (USER_PROFILE) {
      navigate("../home");
      location.reload();
    }
    setUsername(localStorage.getItem('USERNAME'));
  }, [])

  const handelInput = (e) => {
    setBio(e.target.value);
  }

  const getCompressedImage = async (imgString) => {

    // if greated than 200kb compress
    if (imgString.length > 200000) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // set the canvas dimensions compressed image size
      const maxWidth = 400;
      const maxHeight = 400;

      const image = new Image();
      image.src = imgString;

      // wait for the image to load
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      // calculate the new dimensions based on the maximum size while maintaining the aspect ratio
      let newWidth = image.width;
      let newHeight = image.height;

      if (newWidth > maxWidth) {
        const ratio = maxWidth / newWidth;
        newWidth = maxWidth;
        newHeight = newHeight * ratio;
      }

      if (newHeight > maxHeight) {
        const ratio = maxHeight / newHeight;
        newHeight = maxHeight;
        newWidth = newWidth * ratio;
      }

      // set the canvas dimensions to the new dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // draw the image onto the canvas with the new dimensions
      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      // get the compressed image as a base64-encoded data URL
      // quality range => 1 >= quality >= 0  
      const compressedImage = canvas.toDataURL('image/jpg', 1);

      return compressedImage;
    }

    return imgString;
  }

  const handelImage = (e) => {
    // create a file input dynamically
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpg';

    // define a onchange image to read and show the file
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setUserImg(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    // simulate a click
    fileInput.click();
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    const dp = await getCompressedImage(userImg);

    // payloads
    let createProfilePayload = {
      "username": username,
      "bio": bio,
      "dp": dp,
    };
    let createContactPayload = {
      "username" : username,
    }

    // options
    let createProfileOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${TOKEN}`
      },
      body: JSON.stringify(createProfilePayload)
    }
    let createContactOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${TOKEN}`
      },
      body: JSON.stringify(createContactPayload)
    }

    // send req to server
    let profileRes = await fetch(postCreateProfile, createProfileOptions);
    let contactRes = await fetch(postCreateContact, createContactOptions);

    // get the output as a responce from the server
    let profileOut = await profileRes.json();
    let contactOut = await contactRes.json();

    if (profileOut.status) {
      localStorage.setItem("USER_PROFILE", JSON.stringify(profileOut.createdUser));
    } else alert(profileOut.msg);
    
    if (contactOut.status) {
      localStorage.setItem("CONTACTS", JSON.stringify(contactOut.contacts));
    } else alert(contactOut.msg);
    
    if (profileOut.status && contactOut.status) {
      navigate(`../home`);
    } else alert("Error Rediecting");

  }

  return (
    <StyledDiv>
      <div className="wrapper">

        <div className="header">
          <div className="banner"></div>
          <div className="dp-wrapper" onClick={handelImage}>
            <img src={userImg} />
          </div>
        </div>

        <h2>@{username}</h2>

        <div className="bio-wrapper">
          <textarea placeholder="Write something about you..." id="bio-box" onChange={handelInput}></textarea>
        </div>

        <button onClick={handelSubmit}>Done</button>

      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding-bottom: 60px;
    overflow: hidden;
    height: fit-content;

    .header{
      display: flex;
      align-items: center;
      flex-direction: column;

      .banner{
        min-width: 500px;
        min-height: 130px;
        background: url(${banner}), white;
        background-size: cover;
      }

      .dp-wrapper{
        width: 100px;
        height: 100px;
        overflow: hidden;
        border: 2px solid white;
        border-radius: 999px;
        margin-top: -50px;
        cursor: pointer;
        transition: all 0.2s;
        outline: 1px solid white;

        &:hover{
          opacity: 0.9;
          outline: 4px solid white;
        }

        img{
          width: inherit;
          height: inherit;
          object-fit: cover;
        }
      }
    }

    textarea{
      min-width: 300px;
      min-height: 100px;
    }

    button {
      width: 330px;
    }
  }

`