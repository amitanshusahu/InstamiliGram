import styled from "styled-components"
import Post from "./Post"
import user from '../../../../assets/user.png'
import { useEffect, useState } from "react"
import { TOKEN, getFeed } from "../../../../kv"
import nopost from '../../../../assets/nopost.jpg'

export default function Feed({ isCreatePost }) {

  const [feed, setFeed] = useState(null);

  useEffect(() => {
    async function doFetch() {

      let res = await fetch(getFeed, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `${TOKEN}`
        },
      });

      // get the output as a responce from the server
      let output = await res.json();


      if (output.status) {
        setFeed(output.posts);
      }
      else {
        console.log(output.msg);
      }
    }

    doFetch();
  }, [])

  if (feed?.length > 0) {
    return (
      <StyledDiv>

        {(feed) ?
          feed.map(post => {
            return (
              <Post
                img={post.postImg}
                name={post.username}
                userImg={post.userImg}
                date={new Date(post.date).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
                body={post.body}
              />
            )
          }).reverse()

          : " "
        }

      </StyledDiv>
    )
  }
  else {
    return (
      <StyledDiv>
        <div className="nopost">
          <div className="img-wrapper-nopost">
            <img src={nopost} />
          </div>
          <h2>No Posts Yet</h2>
        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  padding: 30px;
  padding-top: 60px;

  .nopost{
    padding: 30px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 60px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.02);
  border: 2px dashed #b0b9bd;

  .img-wrapper-nopost{
    width: 100%;
    overflow: hidden;
    border-radius: 15px;

    img{
      width: inherit;
      object-fit: cover;
    }
  }

  h2{
    color: gray;
  }
  }
`