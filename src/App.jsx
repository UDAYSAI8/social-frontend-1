import "./App.css"
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/LoginPage/LoginPage";
import NewPost from "./Pages/NewPost/NewPost";
import Register from "./Pages/Register/Register";
import SearchUser from "./Pages/SearchUser/SearchUser";

function App() {

  return (
    <div className="bg-img">
    <Routes>
      <Route path="/" Component={() => {
            const token = localStorage.getItem("token");
            return token ? <HomePage /> : Navigate({ to: "/login" });
      }}/>
      <Route path="/login" Component={()=>{
          const token = localStorage.getItem("token");
          return token ? Navigate({ to: "/" }) : <Login />;
      }}/>
      <Route path="*" Component={() => {
            Navigate({ to: "/login" });
      }}/>
      <Route path="/new-post" Component={() => {
            const token = localStorage.getItem("token");
            return token ? <NewPost /> : Navigate({ to: "/login" });
      } }/>
      <Route path="/register" Component={()=>{
            const token = localStorage.getItem("token");
            return token ? Navigate({ to: "/" }) : <Register />;
      }} />
      <Route path="/profile/:id" Component={() => {
            const token = localStorage.getItem("token");
            return token ? <SearchUser /> : Navigate({ to: "/login" });
      }}/>
    </Routes>
    </div>
    )
}

export default App;
