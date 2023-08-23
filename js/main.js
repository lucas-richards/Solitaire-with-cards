
/*----- constants -----*/

const deck = [
{name:'hK', flip:false},
{name:'hQ', flip:false},
{name:'hJ', flip:false},
{name:'h10', flip:false},
{name:'h09', flip:false},
{name:'h08', flip:false},
{name:'h07', flip:false},
{name:'h06', flip:false},
{name:'h05', flip:false},
{name:'h04', flip:false},
{name:'h03', flip:false},
{name:'h02', flip:false},
{name:'hA', flip:false},
{name:'dK', flip:false},
{name:'dQ', flip:false},
{name:'dJ', flip:false},
{name:'d10', flip:false},
{name:'d09', flip:false},
{name:'d08', flip:false},
{name:'d07', flip:false},
{name:'d06', flip:false},
{name:'d05', flip:false},
{name:'d04', flip:false},
{name:'d03', flip:false},
{name:'d02', flip:false},
{name:'dA', flip:false},
{name:'sK', flip:false},
{name:'sQ', flip:false},
{name:'sJ', flip:false},
{name:'s10', flip:false},
{name:'s09', flip:false},
{name:'s08', flip:false},
{name:'s07', flip:false},
{name:'s06', flip:false},
{name:'s05', flip:false},
{name:'s04', flip:false},
{name:'s03', flip:false},
{name:'s02', flip:false},
{name:'sA', flip:false},
{name:'cK', flip:false},
{name:'cQ', flip:false},
{name:'cJ', flip:false},
{name:'c10', flip:false},
{name:'c09', flip:false},
{name:'c08', flip:false},
{name:'c07', flip:false},
{name:'c06', flip:false},
{name:'c05', flip:false},
{name:'c04', flip:false},
{name:'c03', flip:false},
{name:'c02', flip:false},
{name:'cA', flip:false},
]

const rules = [
    {name:'Objective',desc:' Move all cards to foundation piles, organized by suit and in ascending order from Ace to King.'},
    {name:'Rule 1',desc:' Move cards in descending order and alternating colors (red and black) onto each other in the tableau.'},
    {name:'Rule 2',desc:' Cards can be moved individually or in groups if they form a valid descending sequence.'},
    {name:'Rule 3',desc:' Top cards of tableau piles and the stock pile are available for play.'},
    {name:'Rule 4',desc:' A King or a group of cards with a King on top can be moved to an empty tableau pile.'},
    {name:'Rule 5',desc:' Start foundation piles with Aces.'},
    {name:'Rule 6',desc:' Build up each foundation pile by suit in ascending order (Ace, 2, 3, ..., King).'},
    {name:'Rule 7',desc:' Draw cards from the stock pile one at a time.'},
]


/*----- state variables -----*/
// count moves
let moves

// clickedCard is the first clicked card
let clickedCardStr
let clickedCardEl

// card is the second clicked card
let card
let cardNum

//winner is a number and when gets to 4 -> is a winner
let winner


//TOP PILES - ARRAY OF OBJECTS
//Cards will be pushed into this array of arrays in order A -> K and same suit
//The last card will be shown on top
let topPiles 

//MIDDLE PILES - ARRAY OF OBJECTS
//Cards will be pushed into these arrays if:
// array === 'empty' -> only King can be pushed
// array.lastelement.color !== card.color 
// array.lastelement.number === card.num + 1
let midPiles 

//BOTTOM PILES - ARRAY OF OBJECTS
//cards will go from one array to the other
let botPiles 



/*----- cached elements  -----*/
//info button
const infoIcon = document.getElementById('info-icon')
const infoCont = document.getElementById('info-cont')
const rulesEl = document.querySelector('#info-cont > ul')

//try again button
const tryAgainBtn = document.querySelector('button')

//invalid move message
const msgInvEl = document.getElementById('inv-msg')

//win or loose message
const msgFinEl = document.getElementById('final-msg')
const backgroundWinEl = document.getElementsByClassName('f-msg-cont')
// backgroundWinEl[0].style.visibility = 'visible'
const msgMoves = document.getElementById('moves')

//TO RENDER
// top cards array
const topCardsEls = [...document.querySelectorAll('#t-piles > div')]

// mid cards array
const midCardsEls = [...document.querySelectorAll('#m-piles > div')]

// bottom cards array
const botCardsEls = [...document.querySelectorAll('#b-piles > div')]


/*----- functions -----*/

init()


function init(){
    //create a copy of the deck
    console.log('game is initialized')
    
    let newDeck = deck.slice()

    resetCards(newDeck)
    
    //initialize variables
    clickedCardStr = null

    winner = 0

    moves = 0

    topPiles = [
        {name:'ph',cards:[{name:'h', flip:true}]},
        {name:'pc',cards:[{name:'c', flip:true}]},
        {name:'pd',cards:[{name:'d', flip:true}]},
        {name:'ps',cards:[{name:'s', flip:true}]},
    ]

    midPiles = [
        {name:'p0',cards:[]},
        {name:'p1',cards:[]},
        {name:'p2',cards:[]},
        {name:'p3',cards:[]},
        {name:'p4',cards:[]},
        {name:'p5',cards:[]},
        {name:'p6',cards:[]},
    ]
    
    botPiles = [
        {name:'bp0',cards:[]},
        {name:'bp1',cards:[]},
    ]

    deal(newDeck)


    render()

    //check for a winner
    checkWinner()

    createRulesElements()

    

    

    
}

function resetCards(deck){
    deck.forEach((card)=>{
        card.flip = false
    })
}

//deal function distributes the cards on the table 1,2,3,4,5,6,7 and 24 
function deal(newDeck){
    //shuffle newDeck
    newDeck.sort( () => Math.random() - 0.5)

    //distribute cards 
    num = 1
    midPiles.forEach((pile)=>{
        for(let i=0; i < num; i++){
            pile.cards.push(newDeck.pop())
        }
        pile.cards[pile.cards.length-1].flip = true
        num++
    })

    //rest of the cards to the bottom pile
    botPiles[0].cards = newDeck

}

function render(){
    renderTop()
    renderMid()
    renderBottom()
    renderMoves()
}

function renderMoves(){
    msgMoves.innerText = `Moves: ${moves}`
}

function renderReset(piles){
    piles.forEach((pile)=>{
        pile.innerHTML = ''
    })
}

function renderTop() {
    //reset elements for rendering
    renderReset(topCardsEls)

    //iterates over the topPiles array of arrays and creates divs for each card. One on top of each other
    topPiles.forEach((pile,eleIdx)=>{
        if(pile.cards.length!==0){
            
            const newCard = document.createElement('div')
            newCard.classList.add('card','shadow','medium')
            newCard.classList.add( `${pile.cards[pile.cards.length-1].name}`)
            topCardsEls[eleIdx].appendChild(newCard)
        }
        
    })
}


function renderMid(){
    //remove all cards
    renderReset(midCardsEls)
   
    //iterates over the midPiles array of arrays and creates divs for each card one on top of each other
    midPiles.forEach((pile,index)=>{
        pile.cards.forEach((card)=>{
            const newCard = document.createElement('div')
            newCard.classList.add('card','shadow','medium')
            //if the card flip === true -> show card facing up
            card.flip?
            newCard.classList.add( `${card.name}`)
            :newCard.classList.add('back-red')
            midCardsEls[index].appendChild(newCard)
        })
    })
    
}

// render the bottom piles
function renderBottom(){
    
    renderReset(botCardsEls)

    //iterate over botPiles[0].cards and show clicked card
    if(botPiles[0].cards.length !== 0 || botPiles[1].cards.length !== 0){
        const newCard = document.createElement('div')
        newCard.classList.add('card','shadow','medium','back-red')
        botCardsEls[0].appendChild(newCard)
    }

    //iterate over botPiles[0].cards and show clicked card
    if(botPiles[1].cards.length !== 0){
        const newCard = document.createElement('div')
        newCard.classList.add('card','shadow','medium')
        newCard.classList.add( `${botPiles[1].cards[botPiles[1].cards.length - 1].name}`)
        botCardsEls[1].appendChild(newCard)
    }

}


function handleClick(evt){
    //SHOW WINNER
    topPiles = [
        {name:'ph',cards:[{name:'hK', flip:true}]},
        {name:'pc',cards:[{name:'cK', flip:true}]},
        {name:'pd',cards:[{name:'dK', flip:true}]},
        {name:'ps',cards:[{name:'sK', flip:true}]},
    ]

    // convert evt.target into array to get the card in the class
    if(evt.target.classList.contains('card')){
        let targetClasses = [...evt.target.classList]
        card = targetClasses[targetClasses.length-1]
        clickedCardEl = evt.target
        cardNum = convertCardToNumber(card)
    }

    //if clicked on bottom main pile -> flip cards
    if(evt.currentTarget.id === 'bp0'){
        if(botPiles[0].cards.length!==0){
            console.log(botPiles[0].cards.length)
            botPiles[1].cards.push(botPiles[0].cards.shift())
            botPiles[1].cards[botPiles[1].cards.length - 1].flip = true

        }
        else {
            
            botPiles[0].cards = botPiles[1].cards
            botPiles[1].cards = []

        }
        renderBottom()
    
    }
    
    //This is the first card clicked
    else if(clickedCardStr===null && evt.target.classList.contains('card')){
        evt.target.style.border = 'solid black'
        clickedCardParentId = evt.currentTarget.id
        clickedCardStr = card
        clickedCardNum = convertCardToNumber(card)

    }
    //This is the second card that is clicked
    else {
        
        //NOT A CARD -> condition to add king to empty pile
        if(!evt.target.classList.contains('card')){
            midPiles.forEach((pile)=>{
                if(evt.currentTarget.id === pile.name &&
                    pile.cards.length === 0 &&
                        clickedCardNum === 13){

                    moveCards(clickedCardParentId,evt.currentTarget.id,clickedCardStr)

                }
            })

        }
        

        //IS A CARD -> number condition and do not enter if card is in botPile
        else if(cardNum-1 === clickedCardNum && evt.currentTarget.id!=='bp1'){
            //color condition
            if(((card[0]==='d'||card[0]==='h')&& (clickedCardStr[0]==='c'||clickedCardStr[0]==='s'))||
            ((card[0]==='c'||card[0]==='s')&& (clickedCardStr[0]==='d'||clickedCardStr[0]==='h'))){
                
                moveCards(clickedCardParentId,evt.currentTarget.id,clickedCardStr)

            }else{
                //invalid move
                invalidMove()
            }
            
        }
        
        //If the second clicked card is on the top pile
        else if(clickedCardStr[0]===evt.currentTarget.id[1]){
            
            topPiles.forEach((pile)=>{
                if(pile.name[1]===clickedCardStr[0]){
                    if((clickedCardNum === 1 && pile.cards.length <2) ||
                        (cardNum+1 === clickedCardNum)){
                        moveCards(clickedCardParentId,evt.currentTarget.id,clickedCardStr)
                    }else{
                        //invalid move
                        invalidMove()
                    }
                    

                }
                    
            })
    
        }  
        
        else   {
            //invalid move
            invalidMove()

        }
    
        //reset the clicked element
        clickedCardEl.style.border = ''
        clickedCardStr = null
        
        render()

    }

    //check for a winner
    checkWinner()

    
    
}

function convertCardToNumber(card){
    if(card.substring(1)==='A')return 1
    if(card.substring(1)==='J')return 11
    if(card.substring(1)==='Q')return 12
    if(card.substring(1)==='K')return 13
    else return Number(card.substring(1))

}

function invalidMove(){
    //invalid move
    msgInvEl.style.visibility = 'visible' 
    setTimeout(function(){
        msgInvEl.style.visibility = 'hidden' 
    }, 1000);
}

function moveCards(clickedCardParentId,evtCurrentTargetId,card){
    //find the clickedcard pile, remove card and save it
    let removedCards = []
    const topArray = ['ph','pc','pd','ps'] 

    if(topArray.includes(clickedCardParentId)){
        removedCards = removeCards(topPiles,clickedCardParentId,card) 

    }
    //is the first card clicked from the bottom -> remove from bottom
    else if(clickedCardParentId === 'bp1'){  
        removedCards = removeCards(botPiles,clickedCardParentId,card) 
    } 
    //is the first card clicked from the mid -> remove from mid
    else {
        removedCards = removeCards(midPiles,clickedCardParentId,card)
    }
    //add card to pile
    if(topArray.includes(evtCurrentTargetId)){
        pushCard(topPiles,evtCurrentTargetId,removedCards)
    }

    pushCard(midPiles,evtCurrentTargetId,removedCards)

    moves++

    render()
}

function removeCards(piles,clickedCardParentId,card){
    let removedCards = []
    piles.forEach((pile)=>{
        if(pile.name===clickedCardParentId){
            do{
                removedCards.unshift(pile.cards.pop())
                //if there is another card -> flip it
                if(pile.cards.length !== 0) pile.cards[pile.cards.length -1].flip = true
            }while(removedCards[0].name !== card)
             
        }
                    
    })
    return removedCards
}

function pushCard(piles,pileId,removedCards){
    piles.forEach((pile)=>{
        if(pile.name===pileId){
            removedCards.forEach((card)=> pile.cards.push(card))
                                        
        }
                    
    })
}

function checkWinner(){
    topPiles.forEach((pile)=>{
        if(pile.cards[pile.cards.length -1].name[1] === 'K' )
        winner++
    })
    console.log('this is winner',winner)
    console.log('this is winner',winner)

    //declare a winner!
    if(winner === 4){
        msgFinEl.style.visibility = 'visible'
        backgroundWinEl[0].style.visibility = 'visible'

        
        let i = 1
        let a = 1
        topPiles.forEach((pile,eleIdx)=>{
            
            setInterval(()=>{
                const newCard = document.createElement('div')
                newCard.classList.add('card','shadow','medium')
                newCard.classList.add( `${pile.cards[pile.cards.length-1].name}`)
                newCard.style.position = 'absolute'
                newCard.style.top = `${i*5 + 80}px`
                if(pile.name === 'ph')newCard.style.right = `${i*1 + a*16}px`
                else if(pile.name === 'pd') newCard.style.left = `${i*1 + a*12}px`
                else if(pile.name === 'ps') newCard.style.right = `${i*1 + a*1 + 250}px`
                else if(pile.name === 'pc') newCard.style.left = `${i*1 + a*1 + 250}px`
                topCardsEls[eleIdx].appendChild(newCard)
                console.log('working')
                i++
                
            },100)
            a+=10
            
        })



        
    
        
        
        // setInterval(()=>{
        //     let i = 0
        //     let a = 0
        //     let eleIdx = 0
        //     let pile = topPiles[0]
        //     const newCard = document.createElement('div')
        //     newCard.classList.add('card','shadow','medium')
        //     newCard.classList.add( `${pile.cards[pile.cards.length-1].name}`)
        //     newCard.style.position = 'absolute'
        //     newCard.style.top = `${i*20}px`
        //     if(pile.name === 'ph')newCard.style.right = `${i*10 + a*10}px`
        //     else if(pile.name === 'pd') newCard.style.left = `${i*10 + a*10}px`
        //     else if(pile.name === 'ps') newCard.style.right = `${i*10+ a*10 + 250}px`
        //     else if(pile.name === 'pc') newCard.style.left = `${i*10 + a*10 + 250}px`
        //     topCardsEls[eleIdx].appendChild(newCard)
        //     console.log('working')
        //     i++
        //     a++
        
        // }, 200);

    }else {
        msgFinEl.style.visibility = 'hidden'
        backgroundWinEl[0].style.visibility = 'hidden'
        winner = 0
    }


    
}

function addEventHandleClick(piles){
    piles.forEach((pile)=>{
        pile.addEventListener('click', handleClick)
    })
}

function showRules(){
    if(infoCont.style.visibility === 'visible')infoCont.style.visibility = 'hidden'
    else infoCont.style.visibility = 'visible'
}

function createRulesElements(){
    rulesEl.innerHTML = ''
    rules.forEach((rule)=>{
        const newRule = document.createElement('li')
        newRule.innerHTML = `<span>${rule.name}</span>:${rule.desc}`
        rulesEl.appendChild(newRule)
        
    })
}

/*----- event listeners -----*/

addEventHandleClick(topCardsEls)
addEventHandleClick(midCardsEls)
addEventHandleClick(botCardsEls)

tryAgainBtn.addEventListener('click', init)

infoIcon.addEventListener('click',showRules)





