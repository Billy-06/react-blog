import React, { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [ username, setUsername ] = useState("");
    const [ commentText, setCommentText ] = useState("");

    const addComment = async () => {
        const result = await fetch(`/api/articles/${ articleName }/comment`,{
            method: "post",
            body: JSON.stringify({ username, text: commentText }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const body = await result.json();
        setArticleInfo(body);
        setUsername("");
        setCommentText("");
    }

    return (
        <>
        <h3>Add a Comment</h3>
        <label htmlFor="user">Name:</label><br/>
        <input id="user" name="user" type="text" value={ username } onChange={ (event) => setUsername(event.target.value) }/><br/>

        <label htmlFor="comments">Comments:</label><br/>
        <textarea id="comments" name="comments" rows="4" cols="50" value={ commentText } onChange={ (event) => setCommentText(event.target.value) }/><br/>

        <button onClick={ () => addComment() } >Add Comment</button>
        </>
    );

}

export default AddCommentForm;