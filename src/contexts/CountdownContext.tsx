import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextdata {

  minutes: number;
  seconds: number;
  isFinished: boolean;
  isActive: boolean;
  isPaused: boolean;
  time: number;
  inicialTime: number;
  startCountdown: () => void;
  resetCountdown: () => void;
  pauseCountdown: () => void;
  continueCountdown: () => void;

}

interface CountdownProviderProps {
  children: ReactNode;
}


export const CountdownContext = createContext({} as CountdownContextdata);

export function CountdownProvider( { children }:CountdownProviderProps ) {

  let countdownTimeout: NodeJS.Timeout;

  const inicialTime = (25 * 60);

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(inicialTime);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const minutes = Math.floor(time / 60); 
  // arredonda para baixo 24:59 - 24 
  const seconds = time % 60; 
  // pega o resto da divisão, no caso os segundos


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

  const resetCountdown = useCallback(()=> {
    setIsActive(false);
    setIsPaused(false);
    setTime(inicialTime);
    setIsFinished(false);
    clearTimeout(countdownTimeout);
  }, [time]);

  const pauseCountdown = useCallback(()=> {
    clearTimeout(countdownTimeout);
    setIsPaused(true);
    setIsActive(false);
  }, [time]);

  const continueCountdown = useCallback(()=> {
    setIsActive(true);
    setIsFinished(false);
    setIsPaused(false);
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
//   setIsPaused(false);
// }


// function pauseCountdown() {
//   clearTimeout(countdownTimeout);
//   setIsPaused(true);
//   setIsActive(false); 
// }




  return (
    <CountdownContext.Provider value={{
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

    }}>
      { children }
    </CountdownContext.Provider>
  );
}