import { useState, useEffect } from "react";
import "./temp.css";

function TheOfficeRandomQuote({ setModalMessage, setModalOpen }) {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    const fetchOfficeQuote = async () => {
      try {
        const randomQuote = await fetch(
          "https://ninjaplavi-cors-proxy.herokuapp.com/https://officeapi.dev/api/quotes/random"
        );
        const quoteData = await randomQuote.json();
        setQuote(quoteData.data);
      } catch (e) {
        setModalMessage(
          `Random office quote didn't load because: ${e.message}`
        );
        setModalOpen(true);
      }
    };
    fetchOfficeQuote();
  }, []);
  return (
    <div className="the-office-random-quote">
      <h2>Waste of time section</h2>
      <div className="the-office-random-quote-wrapper">
        <blockquote>
          {quote?.content || "Sorry, no quote for you :/"}
        </blockquote>
        <div className="quote-overlay"></div>
        <p className="quote-author">
          {quote?.character.firstname} {quote?.character.lastname}
        </p>
        <span className="quote-symbol">„</span>
      </div>
    </div>
  );
}

export default TheOfficeRandomQuote;
