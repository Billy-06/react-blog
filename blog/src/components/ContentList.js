import React from "react";
import { Link } from "react-router-dom";

const ContentList = ({ articles }) => {
    return(
        <>
            <h1>Article List</h1>
            <div>
            {   
            articles.map( ( article, id )  => (
                <Link to={ `/articles/${article.name}` }>
                    <h3 key={ id }>{article.title}</h3>
                    <p>{article.content[0].substring(0,220)}</p>
                </Link>
            ) )
            }
            </div>
        </>
    )
}

export default ContentList;