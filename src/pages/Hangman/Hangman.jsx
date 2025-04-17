import React, { Component } from "react";
import "./Hangman.css";

import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    wordLength: 5, 
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: "", 
    };

    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentDidMount() {
    this.fetchWord();
  }

  async fetchWord() {
    try {
      const response = await fetch(
        `https://random-word-api.herokuapp.com/word?length=${this.props.wordLength}`
      );
      const data = await response.json();
      this.setState({ answer: data[0] });
    } catch (error) {
      console.error("Error fetching word:", error);
      this.setState({ answer: "error" });
    }
  }

  resetGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: "",
    }, this.fetchWord);
  }

  guessedWord() {
    const { answer, guessed } = this.state;
    return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={index}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  render() {
    const { nWrong, answer } = this.state;
    const { images, maxWrong } = this.props;

    let alternateText = `${nWrong} wrong guesses`;

    return (
      <div className="Hangman">
        <div className="Hangman-container">
          <img src={images[nWrong]} alt={alternateText} />
    
          <div className="Hangman-right">
            <p>Number Wrong: {nWrong}</p>
    
            {answer === "" ? (
              <p>Loading...</p>
            ) : answer === this.guessedWord().join("") ? (
              <p>You WIN!</p>
            ) : nWrong === maxWrong ? (
              <div>
                <p>YOU LOSE</p>
                <p>Correct Word is: {answer}</p>
              </div>
            ) : (
              <div>
                <p className="Hangman-word">{this.guessedWord()}</p>
                <p className="Hangman-btns">{this.generateButtons()}</p>
              </div>
            )}
    
            <button id="reset" onClick={this.resetGame}>
              Reset Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default Hangman;