import styled from "styled-components"
import Post from "./Post"
import user from '../../../../assets/user.png'
import { useEffect, useState } from "react"
import { TOKEN, getFeed } from "../../../../kv"

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

const StyledDiv = styled.div`
  padding: 30px;
  padding-top: 60px;
`