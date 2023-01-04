import React from 'react'
import{ useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

function singlePostPage() {

    const params = useParams();
    const[currentPost, setCurrentPost] = useState(); 
    
    const getPost = async()=>{
        let response = await axios.get(`/postss/${params.id_post}`)
        console.log(response.data.success)
        setCurrentPost(response.data.success)
    }

    useEffect( () => {
        getPost()
      },[])


    return (
        <div>
            <h1>Single Post Page</h1>
            <h4>Post: {JSON.stringify(params.id_post)}</h4>
                {currentPost && currentPost.map((post)=>{
                    return(
                        <div>
                            <h1> Title </h1>
                            <h4>{post.title}</h4>
                            <h1> Content </h1>
                            <p>{post.content}</p>
                        </div>
                    )
                })}
                
            
            
        </div>
    )
}

export default singlePostPage