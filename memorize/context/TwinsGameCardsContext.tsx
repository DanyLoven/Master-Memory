// CardsContext.tsx
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { Card, initCards } from '../utils/CardsGeneratorTwinsGame';




interface CardsContextProps {
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  initializeCards: (initialCards: Card[]) => void;
  isStart:boolean
  setIsStart: Dispatch<SetStateAction<boolean>>;
  numberOfMoves:number
  setNumberOfMoves:Dispatch<SetStateAction<number>>;
  numberOfCoins:number
  setNumberOfCoins:Dispatch<SetStateAction<number>>;
  numberOfVictories:number
  setNumberOfVicories:Dispatch<SetStateAction<number>>;
  numberOfdeleteCards:number
  setNumberOfdeleteCards:Dispatch<SetStateAction<number>>;
  listOfCardsAvailableForBonusContest:Card[];
  setListOfCardsAvailableForBonusContest:Dispatch<SetStateAction<Card[]>>;
  cardBonusContest:Card;
  setCardBonusContest:Dispatch<SetStateAction<Card>>;
}
const TwinsGameCardsContext = createContext<CardsContextProps | undefined>(undefined);

export const TwinsGameCardsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>(initCards());
  const [isStart, setIsStart] = useState(false);
  const [numberOfMoves, setNumberOfMoves] = useState(10);
  const [numberOfdeleteCards, setNumberOfdeleteCards] = useState(0);
  const [numberOfCoins, setNumberOfCoins] = useState(200);
  const [numberOfVictories, setNumberOfVicories] = useState(0);

  const [listOfCardsAvailableForBonusContest, setListOfCardsAvailableForBonusContest] = useState<Card[]>(initCards());
  const [cardBonusContest, setCardBonusContest] = useState<Card>({
    id: "0",
    text: "",
    isSelected: false,
    hideSymbol: '?',
    delete: true,                                              

});
  const initializeCards = (initialCards: Card[]) => {
    setCards(initialCards);
  };

  return (
    <TwinsGameCardsContext.Provider value={{ cards, setCards, initializeCards,isStart,setIsStart,numberOfMoves,setNumberOfMoves,numberOfCoins,setNumberOfCoins,numberOfVictories,setNumberOfVicories,numberOfdeleteCards,setNumberOfdeleteCards,listOfCardsAvailableForBonusContest,setListOfCardsAvailableForBonusContest,cardBonusContest,setCardBonusContest }}>
      {children}
    </TwinsGameCardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(TwinsGameCardsContext);
  if (!context) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
};

export { initCards };

