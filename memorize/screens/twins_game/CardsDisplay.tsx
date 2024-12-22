import { Animated, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useCards } from '../../context/TwinsGameCardsContext';
import { ConstImageTwinGame, ConstStyleCardsTwinsGame } from '../../utils/ConstantsTwinGame';
import { Card, numberOfCards } from '../../utils/CardsGeneratorTwinsGame';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { setTime } from '../../components/TimerView';
import {  soundBonusWin, soundCardMovement, soundFailAnswer, soundGameWin, soundSelectCard, soundSuccesAnswer } from '../../utils/Sound';
import {  getBonusOption, setCardBonusFlip } from '../../components/CardBonusChallenge';


var selectCard : boolean=false;
var successAnswer : boolean=false;
export var cardClickable : boolean=true;
export var setCardClickable : (clic:boolean) => void
var deleteProcess : boolean=false;
export var jokerShowCardsUse : boolean=false;
 var stateRenderFlipCard : boolean=false;
var cardValues:string="";
  var indexCard:string="";
  var indexCard2:string="";
  var timeout: NodeJS.Timeout
  export var showAllCardJoker: (time:number,msTime:number) => () => void
  export var getAvailableListForBonus: () => void

const CardsDisplay = () => {
    const {cards, setCards}=useCards();
    const {isStart, setIsStart}=useCards();
    const {numberOfMoves, setNumberOfMoves}=useCards();
    const {numberOfdeleteCards, setNumberOfdeleteCards }= useCards();
  
    const {listOfCardsAvailableForBonusContest, setListOfCardsAvailableForBonusContest}=useCards();
    const {cardBonusContest, setCardBonusContest}=useCards();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    var isFlipped  = false;
    const flipAnimation = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
      if(isStart===false && numberOfdeleteCards===0 && !jokerShowCardsUse){
        startOfGame();
      }
      else{
        setTime(0);
      }
    },[]);

    useEffect(() => {
      // Cette fonction sera exécutée lorsque l'écran est monté (focus) ou lorsque l'utilisateur revient à cet écran
      console.log('Screen is focused');
  
      // Pour détecter le changement d'écran (quand l'utilisateur navigue vers un autre écran)
      const unsubscribe = navigation.addListener('beforeRemove', () => {
        console.log('Screen will be removed');
        setIsStart(true);
        setTime(0);
        setCardBonusContest((prevCard) => ({
          ...prevCard,
          isSelected: false,
        }));

        setCardBonusContest((prevCard) => ({
          ...prevCard,
          delete: true,
        }));
        clearTimeout(timeout);
      });
  
      // Cleanup function
      return () => {
        console.log('Screen will unmount (lose focus)');
        // Vous pouvez exécuter des actions de nettoyage ici
        unsubscribe();
      };
    }, [isFocused, navigation]);

    const startOfGame=()=>{
      setNumberOfMoves(10);
      waitinStartProcess(showAllCardStart,1000);
      setIsStart(true);
      jokerShowCardsUse=false;
      setListOfCardsAvailableForBonusContest([]);
      getAvailableListForBonus();
      console.log("twin game start");
      soundSuccesAnswer.setVolume(1);
      soundSelectCard.setVolume(1)
      soundGameWin.setVolume(1);
      soundCardMovement.setVolume(1);
      soundFailAnswer.setVolume(1);
      soundBonusWin.setVolume(1);
    }

    const handleFlip = () => {
      !successAnswer && soundCardMovement.play();
      Animated.timing(flipAnimation, {
        toValue: isFlipped ? 0 : 180,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        isFlipped=!isFlipped;
      });
    };

    const handleFlipInstant = () => {
      
      Animated.timing(flipAnimation, {
        toValue: isFlipped ? 0 : 180,
        duration: 0,
        useNativeDriver: false,
      }).start(() => {
        isFlipped=!isFlipped;
      });
    };

    setCardClickable=(clic:boolean)=>{
    cardClickable=clic
    }

    const cardClickableDelay = (time:number) => {
      const timeout = setTimeout(() => {
        successAnswer=false;
        cardClickable=true;
      }, time);
      // Nettoyer le timeout lorsque le composant est démonté
      return () => clearTimeout(timeout);
    };
    
    const cardSelected = (id1: string) => {
      setCards((prevCards) =>
        prevCards.map((item) =>
          item.id === id1 ? { ...item, isSelected: !item.isSelected } : item
        )
      );
    };

   // Fonction pour supprimer les cartes valider une carte
const cardsDeselected = (id1: string,id2 : string,timer:number) => {
  const timeout = setTimeout(() => {
    setCards((prevCards) =>
    prevCards.map((item) =>
      item.id === id1 || item.id === id2 ? { ...item, isSelected: !item.isSelected } : item 
    )
  );
  }, timer);
  // Nettoyer le timeout lorsque le composant est démonté
  return () => clearTimeout(timeout);
};

   const cardDeselected = (id1: string) => {
      setCards((prevCards) =>
      prevCards.map((item) =>
        item.id === id1 ? { ...item, isSelected: !item.isSelected } : item 
      )
    );
  };

  const delete2Card = (id1: string,id2 : string) => {
    setCards((prevCards) =>
      prevCards.map((item) =>
        item.id === id1 || item.id === id2 ? { ...item, delete: !item.delete } : item
      )
    );
    
  };

const timerDeleteProcessTwinsCard = (id1:string,id2:string) => {
   const timeout = setTimeout(() => {
    delete2Card(id1,id2);
    handleFlipInstant();
    cardsDeselected(id1,id2,10);
    cardClickableDelay(10);
    
    gameWin();
  }, 600);
  return () => clearTimeout(timeout);
};

 getAvailableListForBonus=()=>{
  cards.map((item) =>
  {item.delete === false && setListOfCardsAvailableForBonusContest((prev)=>[...prev,item])}
  );
  console.log("taille de liste:",listOfCardsAvailableForBonusContest.length);
};

const waitinsoundGoodAnswer = () => {
   timeout = setTimeout(() => {
    soundSuccesAnswer.play();
  }, 500);
  return () => clearTimeout(timeout);
};

const waitinSoundFailAnswer = () => {
   timeout = setTimeout(() => {
    soundFailAnswer.play();
  }, 500);
  return () => clearTimeout(timeout);
};


const waitinStartProcess = (func:()=>void,time:number) => {
  cardClickable=false;
   timeout = setTimeout(() => {
    func() ;
  }, time);
  return () => clearTimeout(timeout);
};

const waitinDelete2Process = (id1:string,id2:string) => {
  cardClickable=false;
   timeout = setTimeout(() => {
    delete2Card(id1,id2)
  }, 150);
  return () => clearTimeout(timeout);
};

const waitinSetStartProcess = () => {
   timeout = setTimeout(() => {
    setIsStart(true);
  }, 700);
  return () => clearTimeout(timeout);
};

const waitinHandleAndDeleteFlipBonusCard = (sameCard:boolean) => {
  setCardBonusContest((prevCard) => ({
    ...prevCard,
    isSelected: false,
  }));
  timeout = setTimeout(() => {
    setCardBonusFlip(true);
    checkShowAllCardJokerAndDeleteFlipBonusCard(sameCard);
 }, 800);
 return () => clearTimeout(timeout);
};

const waitinHandleAndExplodeTwinsCard = (sameCard:boolean,cardId:string,cardText:string) => {
  setCardBonusContest((prevCard) => ({
    ...prevCard,
    isSelected: false,
  }));
  timeout = setTimeout(() => {
    setCardBonusFlip(true);
    checkTwinsCardJokerAndDeleteFlipBonusCard(sameCard,cardId,cardText);
 }, 800);
 return () => clearTimeout(timeout);
};

const randomNumberFromInterval = (min:number,max:number)=>{
  return Math.floor(Math.random()*(max-min+1)+min);
}

const waitinShowCardBonusAndSetNumberOfMovesProcess = () => {
  setNumberOfMoves(numberOfMoves-1);
  var nbMoveToShowBonus=randomNumberFromInterval(5,9);
  var nbMoveModuloToShowBonus=randomNumberFromInterval(2,7);
   timeout = setTimeout(() => {
    if(numberOfMoves<nbMoveToShowBonus && numberOfMoves%nbMoveModuloToShowBonus===0 && numberOfdeleteCards<=numberOfCards/2-3) setCardBonusContest((prevCard) => ({
      ...prevCard,
      delete: false,
    }));
  }, 500);
  return () => clearTimeout(timeout);
};

const waitinSetCardClickableWhileTimerShowAllCardsBonus = () => {
  timeout = setTimeout(() => {
    cardClickable=true;
 }, 5000);
 return () => clearTimeout(timeout);
};

const waitinStateRenderFlipCard = () => {
  timeout = setTimeout(() => {
    stateRenderFlipCard=!stateRenderFlipCard;
 }, 580);
 return () => clearTimeout(timeout);
};

const checkShowAllCardJokerAndDeleteFlipBonusCard = (sameCard:Boolean) => {
  if(sameCard){
    soundBonusWin.play();
  }else{
    soundFailAnswer.play();
    setNumberOfMoves(numberOfMoves-1);
    gameFail();
  }
  timeout = setTimeout(() => {
    if(sameCard){
    setTime(5);
    showAllCardJoker(5,5000);
    }
    setCardBonusContest((prevCard) => ({
      ...prevCard,
      delete: true,
    }));
 }, 580);
 return () => clearTimeout(timeout);
};

const checkTwinsCardJokerAndDeleteFlipBonusCard = (sameCard:Boolean,cardId:string,cardText:string) => {
  if(sameCard){
    soundBonusWin.play();
    gameWin();
  }else{
    soundFailAnswer.play();
    setNumberOfMoves(numberOfMoves-1);
    gameFail();
  }
  timeout = setTimeout(() => {
    if(sameCard){
      listOfCardsAvailableForBonusContest.map((item) =>
      item.id !== cardId && item.text===cardText && waitinDelete2Process(item.id,cardId)
    );
    }
    setCardBonusContest((prevCard) => ({
      ...prevCard,
      delete: true,
    }));
 }, 580);
 return () => clearTimeout(timeout);
};




    const twinsCardsCheck = (cardText:string,cardId:string) => {
      
      if(cardBonusContest.isSelected && cardClickable){
        cardSelected(cardId);
        cardClickable=false;
        deleteProcess=false;
        showCardAnswerBonus(cardId);
        if(cardBonusContest.id===cardId||cardBonusContest.text===cardText ){
          getBonusOption==="swap" ? waitinHandleAndDeleteFlipBonusCard(true):
          waitinHandleAndExplodeTwinsCard(true,cardId,cardText)
          
        }
        else{
          waitinHandleAndDeleteFlipBonusCard(false);
        }
      }
      else
      {if(cardClickable===true){
        soundSelectCard.stop();
          soundSelectCard.play();
        deleteProcess=false;
        if (selectCard===false){
          console.log(cards.length);
          cardSelected(cardId)
          cardValues=cardText
          indexCard=cardId
          selectCard=true
          console.log(cardText);
        }
        else{
          
          indexCard2=cardId
          console.log(cardText);
          cardClickable=false;
            if(indexCard!==cardId ){
              cardSelected(indexCard2)
              showCard()
              if(cardValues===cardText){
                waitinsoundGoodAnswer();
                successAnswer=true;
                console.log("super, cartes identiques");
                deleteProcess=true;
                timerDeleteProcessTwinsCard(indexCard,cardId)
                selectCard=false;
            }
            else{
              cardBonusContest.delete===false && setCardBonusContest((prevCard) => ({
                ...prevCard,
                delete: true,
              }));
              waitinSoundFailAnswer();
              console.log("carte différente");
              selectCard=false;
              waitinShowCardBonusAndSetNumberOfMovesProcess();
              gameFail();
            }
            }
            else{
              cardDeselected(indexCard);
              console.log("carte désélectionné");
              selectCard=false;
              cardClickable=true;
            }
        }
      }}
      
    };
    const gameWin=()=>{
      setNumberOfdeleteCards(numberOfdeleteCards+1); 
      if(numberOfdeleteCards===numberOfCards/2-1){
        console.log("game win");
            soundGameWin.play();
          navigation.reset({
            index: 0,
            routes: [{ name: 'RewardScreen'as never }],
          });
          stateRenderFlipCard=!stateRenderFlipCard;
      }
    }

    const gameFail=()=>{
      if(numberOfMoves===1){
        console.log("game fail");
         timeout = setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoseScreen'as never }],
          });
          stateRenderFlipCard=!stateRenderFlipCard
        }, 500);
        // Nettoyer le timeout lorsque le composant est démonté
        return () => clearTimeout(timeout);
      }
      
    }

        // Fonction pour activer la visibilité des cartes
    const showCard = () => {
      handleFlip();
      // Cacher le composant après 1 secondes
       timeout = setTimeout(() => {
        if(deleteProcess===false ){
          cardsDeselected(indexCard,indexCard2,500);
        handleFlip();
        cardClickableDelay(200);
        }else{
          clearTimeout(timeout);
        }
      }, 900);

      // Nettoyer le timeout lorsque le composant est démonté
      return () => clearTimeout(timeout);
    };

    const showCardAnswerBonus = (id:string) => {
      handleFlip();
      // Cacher le composant après 1 secondes
       timeout = setTimeout(() => {
        cardClickable=true;
        
        handleFlip();
        
        timeout = setTimeout(() => {
          cardDeselected(id);
          cardClickableDelay(200);
       }, 500);
       return () => clearTimeout(timeout);
       
        
      }, 900);

      // Nettoyer le timeout lorsque le composant est démonté
      return () => clearTimeout(timeout);
    };

     const showAllCardStart = () => {
      setTime(10);
      successAnswer=false;
        cardClickable=false;
      handleFlip();
       timeout = setTimeout(() => {
        waitinStateRenderFlipCard();
        handleFlip();
        cardClickable=true;
        waitinSetStartProcess()
        jokerShowCardsUse=false
      }, 10000);
      return () => clearTimeout(timeout);
    };

    showAllCardJoker = (time:number,msTime:number) => {
      jokerShowCardsUse=false;
      stateRenderFlipCard=!stateRenderFlipCard
      jokerShowCardsUse=true;
      setIsStart(false)
      setTime(time);
      successAnswer=false;
        cardClickable=false;
      handleFlip();
       timeout = setTimeout(() => {
        stateRenderFlipCard=!stateRenderFlipCard
        handleFlip();
        waitinSetCardClickableWhileTimerShowAllCardsBonus();
        waitinSetStartProcess()
        jokerShowCardsUse=false;
      }, msTime);
      return () => clearTimeout(timeout);
    };


    const frontInterpolate = flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
  
    const backInterpolate = flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  
    const frontAnimatedStyle = {
      transform: [{ rotateY: frontInterpolate }],
    };
  
    const backAnimatedStyle = {
      transform: [{ rotateY: backInterpolate }],
    };

    const RenderFront = (card: Card)=>{
      return(
        <>
        {!card.delete ?<Animated.View style={[styles.flipCardFront,card.isSelected===stateRenderFlipCard && frontAnimatedStyle]}>
          <ImageBackground source={ConstImageTwinGame.bgCardTw12} borderRadius={ConstStyleCardsTwinsGame.cardBorderRadius} style={[styles.imageBackground,{ borderRadius:ConstStyleCardsTwinsGame.cardBorderRadius,}]}>
            <Text style={styles.frontText}>{card.hideSymbol}</Text>
          </ImageBackground>
        </Animated.View> :
        <View style={styles.cardDeleteFront}></View>}
        </>
      )
    }
    const RenderBack = (card: Card)=>{
      return(
        <>
        {!card.delete ? <Animated.View style={[styles.flipCardBack,card.isSelected===stateRenderFlipCard &&  backAnimatedStyle]}>
          <Text style={[styles.backText]}>{card.text}</Text>
        </Animated.View> :
        <View style={styles.cardDeleteBack}></View>}
        </>
      )
    }
  
  return (
    <View style={styles.container}>
      <FlatList
      data={cards}
      keyExtractor={(item) => item.id}
      numColumns={6}
      renderItem={({ item }) => (
            <View style={{  borderWidth:1, borderColor:item.isSelected ? ConstStyleCardsTwinsGame.cardSelectColor :ConstStyleCardsTwinsGame.cardContainerBorderColor,margin:7, borderRadius:ConstStyleCardsTwinsGame.cardBorderRadius}}>
              {RenderBack(item)}
              {!item.delete ? <TouchableOpacity onPressIn={()=> twinsCardsCheck(item.text,item.id)} activeOpacity={0.9}>
              {RenderFront(item)}
              </TouchableOpacity>:
              RenderFront(item)}
            </View>
          )
      }
    />
    </View>
  )
}

export default CardsDisplay

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCardFront: {
    height: ConstStyleCardsTwinsGame.cardHeight,
    width: ConstStyleCardsTwinsGame.cardWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    
    
  },
  flipCardBack: {
    height: ConstStyleCardsTwinsGame.cardHeight,
    width: ConstStyleCardsTwinsGame.cardWidth,
    backgroundColor: ConstStyleCardsTwinsGame.cardBackColor,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    borderRadius:ConstStyleCardsTwinsGame.cardBorderRadius,
    
  },
  cardDeleteFront: {
    height: ConstStyleCardsTwinsGame.cardHeight,
    width: ConstStyleCardsTwinsGame.cardWidth,
    backgroundColor: ConstStyleCardsTwinsGame.transparentColor,
    borderRadius:ConstStyleCardsTwinsGame.cardBorderRadius,
  },
  cardDeleteBack: {
    height: ConstStyleCardsTwinsGame.cardHeight,
    width: ConstStyleCardsTwinsGame.cardWidth,
    backgroundColor: ConstStyleCardsTwinsGame.transparentColor,
    position: 'absolute',
    top: 0,
    borderRadius:ConstStyleCardsTwinsGame.cardBorderRadius,
  },
  frontText: {
    fontSize: 45,
    fontFamily:ConstStyleCardsTwinsGame.congratulationFont,
    color:"white",
  },
  backText: {
    fontSize: 40,
    fontWeight:"bold",
    color:"white",
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})