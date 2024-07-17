import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Image from 'next/image';

const Home: React.FC = () => {
  const [userChoice, setUserChoice] = useState<string>('');
  const [computerChoice, setComputerChoice] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [playerWins, setPlayerWins] = useState<number>(0);
  const [computerWins, setComputerWins] = useState<number>(0);

  const imageExtensions: Record<string, string> = {
    rock: 'png',
    paper: 'png',
    scissors: 'jpg',
  };

  const possibleChoices = ['rock', 'paper', 'scissors'];

  const generateComputerChoice = () => {
    const randomChoice = Math.floor(Math.random() * 3);
    const choice = possibleChoices[randomChoice];
    setComputerChoice(choice);
    return choice;
  };

  const generateResult = (computerChoice: string, userChoice: string) => {
    let newResult = '';

    if (computerChoice === userChoice) {
      newResult = "It's a draw!";
    } else if (
      (computerChoice === 'rock' && userChoice === 'paper') ||
      (computerChoice === 'paper' && userChoice === 'scissors') ||
      (computerChoice === 'scissors' && userChoice === 'rock')
    ) {
      newResult = 'You win!';
      setPlayerWins((prevWins) => prevWins + 1);
    } else {
      newResult = 'Computer wins!';
      setComputerWins((prevWins) => prevWins + 1);
    }

    setResult(newResult);
  };

  const handleClick = (choice: string) => {
    setUserChoice(choice);
    const computerChoice = generateComputerChoice();
    generateResult(computerChoice, choice);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Rock Paper Scissors</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="container">
        <h2>
          Computer Choice: <span>{computerChoice}</span>{' '}
          <Image
            id="computer-choice-img"
            className="choice-img"
            src={`/images/${computerChoice}.${imageExtensions[computerChoice]}`}
            alt={computerChoice}
            width={50}
            height={50}
          />
        </h2>
        <h2>
          Your Choice: <span>{userChoice}</span>{' '}
          <Image
            id="user-choice-img"
            className="choice-img"
            src={`/images/${userChoice}.${imageExtensions[userChoice]}`}
            alt={userChoice}
            width={50}
            height={50}
          />
        </h2>
        <h1>
          Result: <span>{result}</span>
        </h1>
        <div className="scores">
          <h2>
            Player Wins: <span>{playerWins}</span>
          </h2>
          <h2>
            Computer Wins: <span>{computerWins}</span>
          </h2>
        </div>

        <div className={styles.buttons}>
          {possibleChoices.map((choice) => (
            <button key={choice} onClick={() => handleClick(choice)} className={styles.button}>
              <Image
                src={`/images/${choice}.${imageExtensions[choice]}`}
                alt={choice}
                width={50}
                height={50}
              />
              <span>{choice.charAt(0).toUpperCase() + choice.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
