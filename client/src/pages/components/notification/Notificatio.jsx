import { useEffect } from "react"
import { TOKEN, USER_PROFILE } from "../../../kv"
import { useNavigate } from "react-router-dom"

export default function Notification() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!TOKEN && !USER_PROFILE) {
      navigate('../signup');
    }
  }, [])

  return (
    <div>notifation</div>
  )
}