import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import challenges from '../../challenges.json';


interface Challenge {
  // type: 'body' | 'eye';
  type: string;
  description: string;
  amount: number;

}

interface ChallengesProviderProps {
  children: ReactNode;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextlevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;  
  completeChallenge: () => void; 
} 

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children }: ChallengesProviderProps) {

  const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges[randomChallengeIndex];

  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActivechallenge] = useState<Challenge | null>(null);
  const experienceToNextlevel = Math.pow((level + 1) * 4 ,2); 
  // método de potência (raiz quadrada) ou logartimo


  useEffect(()=> {
    Notification.requestPermission();
  }, []);




  const levelUp = useCallback(()=> {
        setLevel(level + 1);
  },[]);

  // function levelUp() {
  //   setLevel(level + 1);
  // }

const startNewChallenge = useCallback(()=> {
  
  setActivechallenge(challenge);

  // console.log('new Callenge')
  // console.log(challenge);

  new Audio('/boing.wav').play();

  if (Notification.permission === 'granted') {
    new Notification('Nova desafio 💪🏼', {
      body: `Valendo ${challenge.amount} xp`
    });
  }

},[]);

const resetChallenge = useCallback(()=> {
  setActivechallenge(null);
},[]);


const completeChallenge = useCallback(()=> {
  if(!activeChallenge) {
    return;
  }

  const { amount } = activeChallenge;

  let finalExperience = currentExperience + amount;

  if (finalExperience >= experienceToNextlevel) {
    finalExperience = finalExperience - experienceToNextlevel;
    levelUp();
  }

  // console.log(finalExperience);

  setCurrentExperience(finalExperience);
  setActivechallenge(null);
  setChallengesCompleted(challengesCompleted + 1);

}, [activeChallenge]);




return (

  <ChallengesContext.Provider value={{ 
    level,
    currentExperience,
    challengesCompleted,
    activeChallenge,
    experienceToNextlevel,
    resetChallenge,
    levelUp,
    startNewChallenge,
    completeChallenge,
    
    }}>
    { children }
  </ChallengesContext.Provider>
  
)

}