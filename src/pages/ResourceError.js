import React from "react";
import { useLocation } from "react-router-dom";


const ResourceError = () => {
    let location = useLocation()

    return(
    <>
        <h1>Page Could not be found at { location.pathname }</h1>
    </>)
}

export default ResourceError;