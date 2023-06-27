import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CreateProfile";
import Home from "./pages/Home";

import Chat from "./pages/components/chat/Chat";
import Main from "./pages/components/main/Main";
import Notification from "./pages/components/notification/Notificatio";
import Contacts from "./pages/components/contacts/Contacts"
import Profile from "./pages/components/profile/Profile";

function App() {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<Login />}/> 
                <Route path="/login" element={<Login />}/> 
                <Route path="/signup" element={<Signup />}/>
                <Route path="/createprofile" element={<CreateProfile />}/>
                <Route path="/home" element={<Home component={<Main />}/>}/>
                <Route path="/chat" element={<Home component={<Chat />}/>}/>
                <Route path="/contacts" element={<Home component={<Contacts />}/>}/>
                <Route path="/notification" element={<Home component={<Notification />}/>}/>
                <Route path="/:username" element={<Home component={<Profile />}/>}/>
            </Routes>
        </BrowserRouter>
    )
}


export default App
