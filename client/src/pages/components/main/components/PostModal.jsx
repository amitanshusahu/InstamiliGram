import styled from "styled-components"
import uploadIcon from "../../../../assets/upload.jpg"
import { useState } from "react";
import { TOKEN, USERNAME, USER_PROFILE, getMe, postSavePost } from "../../../../kv";
import { useEffect } from "react";

export default function PostModal({setShowPostModal, user}) {

  const [postImg, setPostImg] = useState(uploadIcon);
  const [userprofile, setUserProfile] = useState(USER_PROFILE);
  const [postBody, setPostBody] = useState({
    title: null,
    body: null,
  });

  useEffect(() => {
    if (!USER_PROFILE) {
      async function doFetch() {

        let res = await fetch(getMe, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `${TOKEN}`
          },
        });

        // get the output as a responce from the server
        let output = await res.json();

        if (output.status) {
          localStorage.setItem("USER_PROFILE", JSON.stringify(output.user));
          setUserProfile(output.user);
        }
        else {
          console.log(output.msg);
        }
      }

      doFetch();
    }
  }, []); 

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
          setPostImg(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    // simulate a click
    fileInput.click();
  }

  const handelChage = (e) => {
    setPostBody({...postBody, [e.target.name] : e.target.value});
  }

  const handelPost = async (e) => {
    e.preventDefault();

    //payload
    let data = {
      "username": USERNAME,
      "userImg": userprofile.dp || user.dp,
      "postImg": postImg,
      "body": postBody
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${TOKEN}`
      },
      body: JSON.stringify(data)
    }
    let res = await fetch(postSavePost, options);

    // get the output as a responce from the server
    let output = await res.json();

    if (output.status) {
      setShowPostModal(false);
      location.reload();
    }
    else {
      alert(output.msg);
    }
  }

  return (
    <StyledDiv>
      <h3> Post  </h3>

      <div className="img-wrapper" onClick={handelImage}>
        <img src={postImg} />
      </div>

      <input type="text" name="title" placeholder="Tile of the post ..." onChange={handelChage} />
      <textarea name="body" placeholder="Write something about the post..." onChange={handelChage} ></textarea>
      <div className="action">
        <button id="cancel" onClick={() => setShowPostModal(false)} >Cancel</button>
        <button onClick={handelPost}>Post it</button>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  background-color: white;
  border-radius: 15px;

  .img-wrapper{
    width: 300px;
    height: 300px;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;

    img{
      width: inherit; height: inherit;
      object-fit: cover;
    }
  }

  .action{
    display: flex;
    justify-content: space-between;
  }

  #cancel{
    background-color: transparent;
    color: #ff5c5c;
    border: 2px solid #ffa9a9;
  }
`