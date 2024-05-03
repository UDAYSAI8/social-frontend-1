import { useState } from "react";
import { storage } from "../../Components/firbase";
import {ref, uploadBytes,getDownloadURL} from "firebase/storage";
import { Navbar ,NavbarBrand,NavItem,Input,Button} from "reactstrap";
import {v4} from "uuid";
import "./NewPost.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

function NewPost(){
    const navigate = useNavigate();
    const [Search, setSearch] = useState("");
    const [image, setImage] = useState("");
    const [text,setText] = useState("");
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
    const UploadImage = () => {
        if(!text) return alert("Please Enter Caption");
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log("text",text);
                axiosInstance().post("/create-post",{
                    content: text,
                    image: url
                }).then((res)=>{
                    console.log(res);
                }
                ).catch((err)=>{
                    console.log(err);
                }
                )
            });
            alert("Post Uploaded Successfully")
            setImage("");
            setText("");
        }
        );
    }
    return(
        <>
        <Navbar className="Navbar" style={{backgroundColor:"#4c355c"}}>
            <NavbarBrand href="/" className="mr-auto"><b style={{color:"darkkhaki"}}>Socify</b></NavbarBrand>
            <NavItem className="d-inline-flex">
            <Input type="text" placeholder="Search" className="SearchBar" onChange={(e)=>{
                setSearch(e.target.value);
            }} />
            <Button className="Button" onClick={searchUser}>Search</Button>
            </NavItem>
            <NavItem>
            <Button className="Button" onClick={logOut}>Logout</Button>
            </NavItem>
        </Navbar>
        <div className="NewPost">
            <h1>Create New Post</h1>

            <input type="text" placeholder="Enter Caption" id="inp-txt" onChange={(e)=>{
                setText(e.target.value);
            }
            }value={text}/>
            <input type="file" name="file" id="file" className="inputfile" onChange={(e)=>{
                setImage(e.target.files[0]);
            }} />
            <button onClick={UploadImage}>Upload Post</button>
        </div>
        </>
    )
}

export default NewPost;

