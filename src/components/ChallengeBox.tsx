import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {

  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

  // const isActiveChallenge = true;


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
          onClick={resetChallenge}>
          
          Falhei

          </button>
          <button 
          type="button"
          className={styles.challengesucceededButton}>
            
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