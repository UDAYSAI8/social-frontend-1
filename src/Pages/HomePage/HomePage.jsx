import "./HomePage.css"
import PostOfUser from "../../Components/PostOfUser/PostOfUser.jsx"
import axiosInstance from "../../axios"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { Navbar ,NavbarBrand,NavItem,Input,Button,Card,CardTitle,CardBody} from "reactstrap";

function HomePage() {
  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [Search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(()=>{
    axiosInstance().get("/current-user").then(res=>{
      setName(res.data.data._id);
      setUserData(res.data.data);
    });
    axiosInstance().get("/posts").then(res=> setData(res.data.data));
  },[]);
  for(let i=0;i<data.length;i++){
    data[i].cur_user = name;
  }
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const searchUser = () => {
      axiosInstance().get("http://localhost:3000/users/username/"+Search).then(res=>{
        if(res.data.data.length===0){
          alert("No user found");
        }
        else{
          navigate("/profile/"+res.data.data[0]._id);
        }
        
  })};
  return (
    <>
      <Navbar className="Navbar" style={{backgroundColor:"#4c355c"}}>
        <NavbarBrand href="/" className="mr-auto"><b style={{color:"darkkhaki"}}>Socify</b></NavbarBrand>
        <NavItem className="d-inline-flex">
          <Input type="text" placeholder="Search" className="SearchBar" onChange={(e)=>{
            setSearch(e.target.value);
          }}/>
          <Button className="Button" onClick={searchUser}>Search</Button>
        </NavItem>
        <NavItem>
          <Button className="Button" onClick={logOut}>Logout</Button>
        </NavItem>
      </Navbar>
      <div className="HomePage">
        <div className="HomePage-child" id="left">
        <Card style={{width: '18rem'}}>
          <CardBody>
            <CardTitle tag="h5">
              Profile
            </CardTitle>
          </CardBody>
           <CardBody>
            <p className="name">{userData.name}</p>
            <p className="username">@{userData.username}</p>
            <Button className="btn btn-primary" onClick={()=>{
              navigate("/new-post");
            }}>+ New Post</Button>
          </CardBody>
        </Card>
        </div>
        <div className="HomePage-child" id="mid">
          {data.map((items)=>{
            return <PostOfUser className="Post" props={items}/>
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
