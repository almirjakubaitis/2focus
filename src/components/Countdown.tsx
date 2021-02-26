import { useContext } from 'react'


import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'



export function Countdown() {

  const { 
    minutes,
    seconds,
    isFinished,
    isActive, 
    isPaused,
    time,
    inicialTime,
    startCountdown,
    resetCountdown,
    pauseCountdown,
    continueCountdown

  } = useContext(CountdownContext);


  const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split(''); 
  // split devolve um array
  
  const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');


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


    {/* Iniciar um ciclo */}
    { !isActive && !isPaused &&  (
      <button type="button" 
    className={styles.countdownButton}
    onClick={startCountdown}>
      Iniciar um ciclo
    </button>
    ) }


    {/* Continuar ciclo */}
    { isPaused && time > 0 && time < inicialTime && (
       <button type="button" 
      className={`${styles.countdownButton} 
      ${styles.countdownButtonContinue} `} 
       onClick={continueCountdown}>
         Continuar
       </button>
    ) }
    

    <div className={styles.countdownButtonContainerGrid}>

    {/* Abandonar ciclo */}
    { isActive &&  (
    <button type="button" 
    className={`${styles.countdownButton} 
    ${styles.countdownButtonActive} `} 
    onClick={resetCountdown}>
      Abandonar
    </button>) }

   

    {/* Pausar ciclo */}
    { isActive && time > 0 && (
       <button type="button" 
       className={`${styles.countdownButton} 
      ${styles.countdownButtonContinue} `} 
       onClick={pauseCountdown}>
         Pausar
       </button>
    ) }

    </div>



      </>

    )}

    </div>
  )
}