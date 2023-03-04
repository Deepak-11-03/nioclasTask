import React, { useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const questionArray = [
    "AreaUnderTheCurve_901",
    "BinomialTheorem_901",
    "DifferentialCalculus2_901",
  ];

  useEffect(() => {
    setLoading(true);
    const fetchQuestion = async () => {
      let api = await fetch(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionArray[count]}`
      );
      api = await api.json();
      setQuestion(api[0].Question);
      setLoading(false);
    };
    fetchQuestion();
  }, [count]);

  return (
    <div className="App">
      <div className="main">
        <h2 style={{ textAlign: "center" }}>This test contains 3 questions</h2>
        <br />
        <div className="question">
          {loading ? (
            <h3>Loading....</h3>
          ) : (
            <MathJaxContext>
              <MathJax>
                <span>Question {count + 1}</span>
                <h4>{question}</h4>
              </MathJax>
            </MathJaxContext>
          )}
        </div>
        <div className="buttons">
          <button disabled={count === 0} onClick={() => setCount(count - 1)}>
            prev
          </button>
          <button
            disabled={count === questionArray.length - 1}
            onClick={() => setCount(count + 1)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

// 894,371
