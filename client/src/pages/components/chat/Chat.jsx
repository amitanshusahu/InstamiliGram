import { useEffect } from "react"
import { TOKEN } from "../../../kv"
import { useNavigate } from "react-router-dom"

export default function Chat(){

  const navigate = useNavigate();

  useEffect( () => {
    if (!TOKEN) {
      navigate('../signup');
    }
  }, [])

  return (
    <div>chat</div>
  )
}