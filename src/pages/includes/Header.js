import React from "react";
import { Link } from "react-router-dom";


export const Header = () => (
    <>
    <nav>
        <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-between" }}>
            <li><Link to="../" >Home</Link></li>
            <li><Link to="../articles-list" >Articles</Link></li>
            <li><Link to="../article" >Article</Link></li>
            <li><Link to="../about" >About</Link></li>
            <li><Link to="../contact" >Contact Me</Link></li>
        </ul>
    </nav>
    </>
)

export const Footer = () => (
    <>
        <p>Copyright 2022</p>
    </>
)
