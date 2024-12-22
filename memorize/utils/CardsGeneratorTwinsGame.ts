
export interface Card {
  id: string;
  text: string;
  isSelected: boolean;
  hideSymbol:string
  delete:boolean
}

export var numberOfCards:number
const cardsContent : string = "ⰀⰁⰂⰃⰄⰅⰆⰇⰈⰉⰊⰋⰌⰍⰎⰏⰐⰑⰒⰓⰔⰕⰖⰗⰘⰙⰚⰛⰜⰝⰞⰟⰠⰡⰢⰣⰤⰥⰦⰧⰨⰩⰪⰫⰬⰭⰮⰰⰱⰲⰳⰴⰵⰶⰷⰸⰹⰺⰻⰼⰽⰾⰿⱀⱁⱂⱃⱄⱅⱆⱇⱈⱉⱊⱋⱌⱍⱎⱏⱐⱑⱒⱓⱔⱕⱖⱗⱘⱙⱚⱛⱜⱝⱞⱠⱡⱢⱣⱤⱥⱦⱧⱨⱩⱪⱫⱬⱭⱮⱯⱰⱱⱲⱳⱴⱵⱶⱷⱸⱹⱺⱻⱼⱽⱾⱿⲀⲁⲂⲃⲄⲅⲆⲇⲈⲉⲊⲋⲌⲍⲎⲏⲐⲑⲒⲓⲔⲕⲖⲗⲘⲙⲚⲛⲜⲝⲞⲟⲠⲡⲢⲣⲤⲥⲦⲧⲨⲩⲪⲫⲬⲭⲮⲯⲰⲱⲴⲵⲶⲷⲸⲹⲼⲽⲾⲿⳀⳁⳂⳃⳄⳅⳆⳇⳈⳉⳊⳋⳌⳍⳎⳏⳐⳑⳒⳓⳔⳕⳖⳗⳘⳙⳚⳛⳜⳝⳞⳟⳠⳡⳢⳣⳤ⳥⳦⳧⳨⳩⳪ⳫⳬⳭⳮⳲⳳ⳹⳺⳻⳼⳽⳾⳿";
export const initCards=() => mixCards(generateTableCard(cardsContent, numberOfCards=18))

function generateTableCard(caracteres: string, tailleTableau: number): Card[] {
    const tableau: Card[] = [];
  
    for (let i = 0; i < tailleTableau/2; i++) {
      const caractere = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  
      // Ajouter deux objets avec des id uniques et le même caractère
      const id1 = Date.now().toString() + i * 2;
      const id2 = Date.now().toString() + i * 2 + 1;
  
      tableau.push({
        id: id1,
        text: caractere,
        isSelected: false,
        hideSymbol: '?',
        delete: false,
       
      });
  
      tableau.push({
        id: id2,
        text: caractere,
        isSelected: false,
        hideSymbol: '?',
        delete: false,
        
      });
    }
  
    return tableau;
  }
  
    // mélanger les cartes
    function mixCards(tabCards:Card[]) {
    
    // Fonction de comparaison aléatoire pour mélanger le tableau
    const compareRandom = () => Math.random() - 0.5;
  
    // Création d'une copie mélangée du tableau original
    const mixTab = [...tabCards].sort(compareRandom);
  
    return mixTab
  };
  