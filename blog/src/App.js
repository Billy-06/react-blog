import React, { Component } from "react";
import { Header, Footer } from "./pages/includes/Header";
import HomePage from "./pages/HomePage";
import ResourceError from "./pages/ResourceError";
import ContactMe from "./pages/ContactMe";
import About from "./pages/About";
import Article from "./pages/Article";
import ArticleList from "./pages/ArticleList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


class App extends Component {
  
  render(){
    return (
    <Router>
      <div className="App" style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{ width: "60%" }}>
          <Header />
          <Routes>
            <Route path="/" element={ <HomePage /> } exact />
            <Route path="/about" element={ <About /> } />
            <Route path="/articles-list" element={ <ArticleList /> } />
            <Route path="/articles/:name" element={ <Article /> } />
            <Route path="/contact" element={ <ContactMe /> } />
            <Route path="*" element={ <ResourceError /> } />
            
          </Routes>
          <Footer />
        </div>
          
      </div>
    </Router>
  );
  }
}

export default App;
