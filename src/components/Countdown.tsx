import { useCallback, useEffect, useState, useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'



export function Countdown() {

  let countdownTimeout: NodeJS.Timeout;
  const inicialTime = (0.1 * 60);

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(inicialTime);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
 

  const minutes = Math.floor(time / 60); // arredonda para baixo 24:59 - 24
  const seconds = time % 60; // pega o resto da divisão, no caso os segundos

  const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split(''); // split devolve um array
  const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

  useEffect(()=> {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setIsActive(false);
      setIsFinished(true);
      startNewChallenge();
    }
  }, [isActive, time])

  const startCountdown = useCallback(()=> {
    setIsActive(true);
    setIsFinished(false);
    setIsPaused(false);
    setTime(inicialTime);
  }, []);

  const continueCountdown = useCallback(()=> {
    setIsActive(true);
    setIsFinished(false);
    setIsPaused(false);
  }, []);

  const resetCountdown = useCallback(()=> {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(inicialTime);
  }, []);

  const pauseCountdown = useCallback(()=> {
    clearTimeout(countdownTimeout);
    setIsPaused(true);
    setIsActive(false);
  }, []);

// funcoes abaixo foram alteradas para useCallBack

// function startCountdown() {
//   setIsActive(true);
//   setIsFinished(false);
//   setIsPaused(false);
//   setTime(inicialTime);
// }

// function continueCountdown() {
//   setIsActive(true);
//   setIsFinished(false);
//   setIsPaused(false);
// }

// function resetCountdown() {
//   clearTimeout(countdownTimeout);
//   setIsActive(false);
//   setTime(inicialTime);
// }


// function pauseCountdown() {
//   clearTimeout(countdownTimeout);
//   setIsPaused(true);
//   setIsActive(false);
  
// }

  return (
    <div>

    <div className={styles.countdownContainer}>
      
      <div>
       <span>{minuteLeft}</span>
       <span>{minuteRight}</span>
      </div>

      <span>:</span>

      <div>
       <span>{secondLeft}</span>
       <span>{secondRight}</span>
      </div>
    </div>

    {/* Ciclo Terminado */}
    { isFinished ? (
       <button type="button" 
       disabled
       className={styles.countdownButton}>
         <span>Ciclo encerrado
         <img src="icons/check-circle.svg" alt="Ciclo encerrado"/>
         </span>
         
         <div></div>
       </button>
    ) : (

      <>

{/* Abandonar ciclo */}
{ isActive && !isPaused && (
    <button type="button" 
    className={`${styles.countdownButton} 
    ${styles.countdownButtonActive}`}
    onClick={resetCountdown}>
      Abandonar ciclo x
    </button>) }

    {/* Iniciar um ciclo */}
    { !isActive && !isPaused && (
      <button type="button" 
    className={styles.countdownButton}
    onClick={startCountdown}>
      Iniciar um ciclo
    </button>
    ) }

    {/* Continuar ciclo */}
    { isPaused && (
       <button type="button" 
       className={styles.countdownButton}
       onClick={continueCountdown}>
         Continuar ciclo
       </button>
    ) }

    {/* Pausar ciclo */}
    { isActive && time > 0 && (
       <button type="button" 
       className={styles.countdownButton}
       onClick={pauseCountdown}>
         Pausar ciclo
       </button>
    ) }

      </>

    )}

    </div>
  )
}