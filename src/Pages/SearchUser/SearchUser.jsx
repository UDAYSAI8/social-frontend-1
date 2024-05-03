
import PostOfUser from "../../Components/PostOfUser/PostOfUser.jsx"
import axiosInstance from "../../axios"
import { useEffect, useState } from "react";
import {useNavigate,useLocation} from "react-router-dom";
import { Navbar ,NavbarBrand,NavItem,Input,Button,Card,CardTitle,CardBody} from "reactstrap";

function SearchUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [Search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(()=>{
    axiosInstance().get("/current-user").then(res=>{
      setName(res.data.data._id);
    });
    axiosInstance().get("/users/"+location.pathname.split("/")[2]).then(res=>{
      setUserData(res.data.data);
    });
    axiosInstance().get("/users/"+location.pathname.split("/")[2]+"/posts").then(res=> setData(res.data.data));
  },[]);
  for(let i=0;i<data.length;i++){
    data[i].cur_user = name;
  }
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const searchUser = () => {
      axiosInstance().get("/users/username/"+Search).then(res=>{
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

export default SearchUser;
