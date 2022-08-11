// import { useState, useEffect } from "react";
import "./temp.css";

function TheOfficeRandomQuote() {
  //   useEffect(() => {
  //     const fetchOfficeQuote = async () => {
  //       try {
  //         const randomQuote = await fetch(
  //           "https://officeapi.dev/api/quotes/random"
  //         );
  //         console.log(randomQuote);
  //       } catch (e) {
  //         console.log(e.message);
  //       }
  //     };
  //     fetchOfficeQuote();
  //   }, []);
  return (
    <div className="the-office-random-quote">
      <h2>Waste of time section</h2>
      <div className="the-office-random-quote-wrapper">
        <blockquote>
          Last year, Creed asked me how to set up a blog. Wanting to protect the
          world from being exposed to Creed's brain, I opened up a Word document
          on his computer and put an address at the top. I've read some of it.
          Even for the Internet, it's... pretty shocking.
        </blockquote>
        <div className="quote-overlay"></div>
        <p className="quote-author">Ryan Howard</p>
        <span className="quote-symbol">„</span>
      </div>
    </div>
  );
}

export default TheOfficeRandomQuote;
