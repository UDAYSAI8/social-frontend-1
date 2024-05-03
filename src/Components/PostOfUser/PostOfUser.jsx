import "./PostOfUser.css"
import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {Card, CardImg, CardBody,CardTitle,CardHeader,CardFooter} from "reactstrap"
import axiosInstance from "../../axios";
  
function PostOfUser(props) {
    const [loadComment, setLoadComment] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState([]);
    const [arr1,setArr1] = useState(props.props.comments);
    const [like, setLike] = useState(0);
    const [isActive, setActive] = useState(null);
    const [comment, setComment] = useState("");
    useEffect(()=>{
        axiosInstance().get("http://localhost:3000/users/"+props.props.user).then(res=>{setName([res.data.data.name,res.data.data.username])
        axiosInstance().get("http://localhost:3000/posts/"+props.props._id+"/likes").then(res=>{
            const arr = res.data.data.likes;
            setLike(arr.length);
            if(arr.includes(props.props.cur_user)){
                setActive(true);
            }
            else{
                setActive(false);
            }
        });
        setLoading(false);
    });
        
    },[]);


    
    function likeButton(){
        // setActive(!isActive);
        if(isActive){
            axiosInstance().patch("http://localhost:3000/posts/"+props.props._id+"/dislike").then((res)=>{
                console.log("disliked");
            })
            setActive(false);
            setLike(like-1);
        }
        else{
            axiosInstance().patch("http://localhost:3000/posts/"+props.props._id+"/like").then((res)=>{
                console.log("liked");
            })
            setActive(true);
            setLike(like+1);
        }
    }

    function addComment(){
        if(!comment) return alert("Please Enter Comment");
        const url = "http://localhost:3000/posts/"+props.props._id+"/comment";
        setArr1([...arr1,comment]);
        setComment("");
        axiosInstance().patch(url,{comment: comment}).then(res=>{
            console.log("comment added");
            
        })
    }
    if (loading) {
        return <div className="App">Loading...</div>;
      }

    return (
        <div style={{display: 'block', width: 700, padding: 30}}>
            <Card className=""style={{width: '100%'}}>
                <CardHeader>
                    <div className="prof-container">
                        <p className="prof_name">{name[0]}</p>
                        <p className="prof_uname">@{name[1]}</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <CardTitle tag="h5">
                        {props.props.content}
                    </CardTitle>
                    <CardImg src={props.props.image} />
                </CardBody>
                <CardFooter>
                    <button className={isActive ? "btn btn-block btn-primary" : "btn btn-block"} onClick={likeButton}><i className="fa fa-thumbs-up"></i> </button>
                    {like} Likes
                    <div className="d-flex flex-row mt-2">
                    <input type="text" placeholder="Add a comment" className="comment" onChange={(e)=>{
                        setComment(e.target.value);
                    }} value={comment} />
                    <button className="btn btn-block btn-primary" onClick={addComment} ><i className="fa fa-paper-plane"></i></button>
                    </div>
                    
                    {loadComment ? 
                        <>
                        <button className="btn btn-block btn-primary" onClick={()=>{setLoadComment(false)}}>Hide Comments</button>
                        <p className="mb-0" style={{fontSize: "1.5rem"}}>Comments</p>
                        {arr1.map((item)=>{
                            return(
                                <div id="comments">
                                    {item}
                                </div>
                        )})}</>
                    : <button className="btn btn-block btn-primary" onClick={()=>{setLoadComment(true)}}>Load Comments</button>}
                </CardFooter>
            </Card>
        </div>
    );
}
  
export default PostOfUser;
