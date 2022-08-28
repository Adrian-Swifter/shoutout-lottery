import { useState, useEffect } from "react";
import "./temp.css";

function RandomMeme({ setModalMessage, setModalOpen }) {
  const [meme, setMeme] = useState(null);
  useEffect(() => {
    const fetchRandomMeme = async () => {
      try {
        const randomMeme = await fetch("https://meme-api.herokuapp.com/gimme");
        const memeData = await randomMeme.json();
        setMeme(memeData.data);
      } catch (e) {
        setModalMessage(
          `Random office quote didn't load because: ${e.message}`
        );
        setModalOpen(true);
      }
    };
    fetchRandomMeme();
  }, []);

  console.log(meme);
  return (
    <div className="the-office-random-quote">
      {/* <h2>Waste of time section</h2>
      <div className="the-office-random-quote-wrapper">
        <blockquote>
          {quote?.content || "Sorry, no quote for you :/"}
        </blockquote>
        <div className="quote-overlay"></div>
        <p className="quote-author">
          {quote?.character.firstname} {quote?.character.lastname}
        </p>
        <span className="quote-symbol">„</span>
      </div> */}
    </div>
  );
}

export default RandomMeme;
