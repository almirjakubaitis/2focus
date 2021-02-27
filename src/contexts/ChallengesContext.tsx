import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal'


interface Challenge {
  // type: 'body' | 'eye';
  type: string;
  description: string;
  amount: number;

}

interface ChallengesProviderProps {
  children: ReactNode;
  level:number;
  currentExperience: number;
  challengesCompleted: number;
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
  closeLevelUpModal: () => void; 
} 

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({
children, 
...rest
}: ChallengesProviderProps) {

  const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges[randomChallengeIndex];

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActivechallenge] = useState<Challenge | null>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextlevel = Math.pow((level + 1) * 4 ,2); 
  // método de potência (raiz quadrada) ou logartimo


  useEffect(()=> {
    Notification.requestPermission();
  }, []);

  useEffect(()=> {

    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));

    
  }, [level, currentExperience, challengesCompleted]);


  const levelUp = useCallback(()=> {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
  },[]);


  const closeLevelUpModal = useCallback(() => { 
    setIsLevelUpModalOpen(false);
  }, [])

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
    closeLevelUpModal,
    
    }}>
    { children }

     { isLevelUpModalOpen && <LevelUpModal /> }
  </ChallengesContext.Provider>
  
)

}