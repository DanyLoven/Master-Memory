import { Animated, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { soundCardMovement } from '../utils/Sound';
import { Card } from '../utils/CardsGeneratorTwinsGame';
import { ConstImageTwinGame, ConstStyleCardsTwinsGame } from '../utils/ConstantsTwinGame';
import Octicons from 'react-native-vector-icons/Octicons';
import { useCards } from '../context/TwinsGameCardsContext';
import { getAvailableListForBonus, setCardClickable } from '../screens/twins_game/CardsDisplay';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
export var setCardBonusFlip : Dispatch<SetStateAction<boolean>>
export var cardBonusFlip : boolean
export var handleFlipBonusCard: () => void
export var getBonusOption:string;



const CardBonusChallenge = () => {
    const {cards, setCards}=useCards();
 
    const {listOfCardsAvailableForBonusContest, setListOfCardsAvailableForBonusContest}=useCards();
    const {numberOfdeleteCards, setNumberOfdeleteCards }= useCards();
    const {cardBonusContest, setCardBonusContest}=useCards();
    const [isFlipped, setIsFlipped] = useState(false);
    const {numberOfMoves, setNumberOfMoves}=useCards();
    [cardBonusFlip,setCardBonusFlip]=useState(false);
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const bonusOptions=["swap","bomb"];
    
    
    

    useEffect(()=>{
      console.log(`cardBonusFlip: ${cardBonusFlip}`);
      if(cardBonusFlip){
          const timeout = setTimeout(() => {
              handleFlipBonusCard();
              waitinSetCardBonusFlip();
              console.log(`cardBonusFlipIn: ${cardBonusFlip}`);
            }, 100);
            return () => clearTimeout(timeout);
      }
  },[cardBonusFlip]);


  useEffect(()=>{
    if(cardBonusContest.delete) getBonusOption=bonusOptions[Math.floor(Math.random()*bonusOptions.length)];
    generateAvailableBonus();
    
  },[numberOfMoves,numberOfdeleteCards])
                                                                 
    const bonusContest=()=>{
        console.log(`isSelected: ${cardBonusContest.isSelected}`);
        generateAvailableBonus();
        if(cardBonusContest.isSelected===false){
           delaySetCardText();
           setCardBonusFlip(true);
           setCardBonusContest((prevCard) => ({
            ...prevCard,
            isSelected: true,
          }));
        }   
    }

    const delaySetCardText=()=>{
      
      const timeout = setTimeout(() => {
        const newText=(listOfCardsAvailableForBonusContest[Math.floor(Math.random() * listOfCardsAvailableForBonusContest.length)]).text;
        setCardBonusContest((prevCard) => ({
          ...prevCard,
          text: newText,
        }));
      }, 50);
      return () => clearTimeout(timeout);
    }

   
const generateAvailableBonus = () => {
  setListOfCardsAvailableForBonusContest([]);
  getAvailableListForBonus();
};

    const waitinSetCardBonusFlip = () => {
      
       const timeout = setTimeout(() => {
        setCardClickable(true);
        setCardBonusFlip(false);
       }, 500);
       return () => clearTimeout(timeout);
     };

     const handleFlipBonusCard = () => {
        soundCardMovement.play();
        Animated.timing(flipAnimation, {
          toValue: isFlipped ? 0 : 180,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          setIsFlipped(!isFlipped);
          console.log("isFlipped");
        });
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
          {!card.delete ?<Animated.View style={[styles.flipCardFront,frontAnimatedStyle]}>
            <ImageBackground source={ConstImageTwinGame.bgCardTw20} borderRadius={ConstStyleCardsTwinsGame.cardBorderRadius} style={[styles.imageBackground,{ borderRadius:ConstStyleCardsTwinsGame.cardBorderRadius,}]}>
              <Text style={styles.frontText}><Octicons name="feed-star" size={30} color="gold" /></Text>
              {getBonusOption==="swap" ?
              <Fontisto name="arrow-swap" size={28} color="white" />:
              <MaterialCommunityIcons name="bomb" size={28} color="black" />
              }
            </ImageBackground>
          </Animated.View> :
          <View style={styles.cardDeleteFront}></View>}
          </>
        )
      }
      const RenderBack = (card: Card)=>{
        return(
          <>
          {!card.delete ? <Animated.View style={[styles.flipCardBack, backAnimatedStyle]}>
            <Text style={[styles.backText]}>{card.text}</Text>
          </Animated.View> :
          <View style={styles.cardDeleteBack}><Octicons name="feed-star" size={30} color="gold"/></View>}
          </>
        )
      }
    
  return (
    <View style={styles.container}>
      <View style={{  borderWidth:1, borderColor:"grey",margin:7, borderRadius:ConstStyleCardsTwinsGame.cardBorderRadius,}}>
              
              {!cardBonusContest.isSelected ? <TouchableOpacity onPressIn={()=> {
                setCardBonusContest((prevCard) => ({
                ...prevCard,
                isSelected: true,
              }));
              bonusContest();
              setCardClickable(false);
          }} activeOpacity={0.8}>
              {RenderBack(cardBonusContest)}
              
              {RenderFront(cardBonusContest)}
              </TouchableOpacity>:
              <View>
                {RenderBack(cardBonusContest)}
              {RenderFront(cardBonusContest)}
              </View>
             }
            </View>
    </View>
  )
}

export default CardBonusChallenge

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
        alignItems:"center",
        justifyContent:"center",
        top: 0,
        borderRadius:ConstStyleCardsTwinsGame.cardBorderRadius,
        opacity:0.3,
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