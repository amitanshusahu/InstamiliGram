import styled from "styled-components"
import uploadIcon from "../../../../assets/upload.jpg"
import { useState } from "react";
import { TOKEN, USERNAME, USER_PROFILE, postUploadStauts } from "../../../../kv";

export default function StatusUploadModal({ setShowStatusUploadModal, user}) {


  const [statusImg, setstatusImg] = useState(uploadIcon);
  const [caption , setCaption] = useState();
  const [userprofile, setUserProfile] = useState(USER_PROFILE);

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
          setstatusImg(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    // simulate a click
    fileInput.click();
  }

  const handleStatusUpload = async (e) => {
    e.preventDefault();

    //payload
    let data = {
      "username": USERNAME,
      "userImg": userprofile.dp || user.dp,
      "statusImg": statusImg,
      "body": caption
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${ TOKEN }`
      },
      body: JSON.stringify(data)
    }
    let res = await fetch(postUploadStauts, options);

    // get the output as a responce from the server
    let output = await res.json();

    if (output.status) {
      setShowStatusUploadModal(false);
      location.reload();
    }
    else {
      alert(output.msg);
    }
  }

  const handelCaptions = (e) => {
    setCaption(e.target.value);
  }

  return (
    <StyledDiv>
      <div className="wrapper">
        <div className="img-wrapper" onClick={handelImage}>
          <img src={statusImg} />
        </div>
        <input id="caption" type="text" placeholder="Captions.." onChange={handelCaptions}/>
      </div>
      <div className="action">
        <button id="cancel" onClick={ () => setShowStatusUploadModal(false) }>Cancel</button>
        <button onClick={handleStatusUpload}>Upload</button>
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
  .wrapper {
    position: relative;

    #caption{
      border: none;
      outline: none;
      background-color: #ffffffa7;
      backdrop-filter: blur(2px);
      width: 280px;
      position: absolute;
      left: 0;
      bottom: 0;
    }

  }

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