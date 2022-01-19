import React from "react";

const UpvotesSection = ({ articleName, upvotes, setArtcileInfo }) => {
    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${ articleName }`,{
            method: "post"
        });
        const body = await result.json();
        setArtcileInfo(body);
    }
    
    return (
        <div>
            <button onClick={ () => upvoteArticle() }>Add Upvote</button>
            <p>This article has been upvoted { upvotes } times</p>
        </div>
    )
}

export default UpvotesSection;