import React from "react";
import { useParams } from "react-router-dom";

const Article = ({ match }) => {
    const { name} = useParams();

    return (
    <>
    <h1>My First Article: { name } </h1>
    </>
    )
   
}

export default Article;