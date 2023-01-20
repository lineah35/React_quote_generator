import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaQuoteLeft } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";

function App() {
  const [newQuote, setNewQuote] = useState({
    text: "",
    author: "",
  });

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    setLoading(true);
    const fetchData = await axios.get("https://type.fit/api/quotes");
    const data = await fetchData.data;
    const quote = data[Math.floor(Math.random() * data.length)];
    console.log("quote:", quote);
    setNewQuote((prev) => ({ ...prev, text: quote.text }));
    setNewQuote((prev) => ({ ...prev, author: quote.author }));
    setLoading(false);
  }

  const renderContent = (
    <div class="quote-container" id="quote-container">
        <div class="quote-text">
          <FaQuoteLeft />
          <span>{newQuote.text}</span>
        </div>
        <div class="quote-author">
          <h3>{newQuote.author}</h3>
        </div>
        <div class="button-container">
          <button
            class="twitter-button"
            id="twitter"
            title="Tweet This!"
            onClick={() => {
              const twitterUrl = `https://twitter.com/intent/tweet?text=${newQuote.text} - ${newQuote.author}`;
              window.open(twitterUrl, "_blank");
            }}
          >
          <FaTwitter />
          </button>
          <button id="new-quote" onClick={getData} disabled={isLoading}>
            New Quote
          </button>
        </div>
      </div>
  )

  return (
    <div>
      {isLoading ? 
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} 
      /> : renderContent}
    </div>
    
  );
}

export default App;
