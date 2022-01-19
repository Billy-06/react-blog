import React from "react";

const CommentsList = ({ comments }) => (
        <>
        <h3>Comments:</h3>
        {comments.map((comment, key) => (
            <div key= { key }>
                <h4>User:{ comment.username }</h4>
                <p>Comments:{ comment.text }</p>
            </div>
        ))}
        </>
)
    
export default CommentsList;