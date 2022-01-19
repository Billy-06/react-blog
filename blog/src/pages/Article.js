import React, { useState, useEffect } from "react";
import ContentList from "../components/ContentList";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import UpvotesSection from "../components/UpvotesSection";
import AddCommentForm from "../components/AddCommentForm";

const Article = ({ match }) => {
    const { name } = useParams();
    const piece = articles.find(
        (article) => article.name === name
    );

    const [ articleInfo, setArticleInfo ] = useState({
        upvotes: 0,
        comments: []
    });

    useEffect( () => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${ name }`)
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        }

        fetchData();
        // setArticleInfo({ upvotes: Math.ceil(Math.random() * 10) });
    }, [name]);
    
    const moreArticles = articles.filter(
        article => article.name !== name
    );

    return (
    <>
        <h1>{piece.title}</h1>
        <UpvotesSection articleName={ name } upvotes={ articleInfo.upvotes } setArtcileInfo={ setArticleInfo } />

        {piece.content.map((par, key) => (
        <p key={key}>
            {par}
        </p>
        ))}
        <CommentsList comments={ articleInfo.comments }/>
        <AddCommentForm articleName={ name } setArticleInfo={ setArticleInfo } />
        <h3>Related Articles</h3>
        <ContentList articles={ moreArticles } />
    </>
    )
   
}

export default Article;