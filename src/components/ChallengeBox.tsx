import { useCallback, useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {

  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext)
  
  // const isActiveChallenge = true;

  const handleChallengeSucceed = useCallback(()=> {
    completeChallenge();
    resetCountdown();


  },[completeChallenge, resetCountdown]);

  const handleChallengeFailed = useCallback(()=> {
    resetChallenge();
    resetCountdown();

  },[resetChallenge, resetCountdown]);




  return (
    <div className={styles.challengeBoxContainer}>

      {activeChallenge ? (
        <div className={styles.challengeActive}>
        <header>Ganhe {activeChallenge.amount} xp</header>

        <main>
          <img src={`icons/${activeChallenge.type}.svg`}></img>
          <strong>Novo desafio</strong>
          <p>{activeChallenge.description}</p>
        </main>

        <footer>
          <button
          type="button"
          className={styles.challengeFailedButton}
          onClick={handleChallengeFailed}>
          
          Falhei

          </button>
          <button 
          type="button"
          className={styles.challengesucceededButton}
          onClick={handleChallengeSucceed}
          >
            
          Completei
          </button>

        </footer>


        </div>
      ) : (

    <div className={styles.challengeNotActive}>
    <strong>
    Finalize um ciclo para receber um desafio
    </strong>

    <p>
      <img src="icons/level-up.svg" alt="Level Up"/>
      Avance de level completando desafios.
    </p>
    </div>

      )}

      
    </div>
  );
}