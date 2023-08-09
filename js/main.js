console.log('working')

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

//give up botton
const giveUpBtn = document.querySelector('button')

//invalid move message
const msgInvEl = document.getElementById('inv-msg')
// msgInvEl.style.visibility = 'visible'
//win or loose message
const msgFinEl = document.getElementById('final-msg')
// msgFinEl.style.visibility = 'visible'
const msgMoves = document.getElementById('moves')

//TO LISTEN
// top cards container element
const phEl = document.getElementById('ph')
const pcEl = document.getElementById('pc')
const pdEl = document.getElementById('pd')
const psEl = document.getElementById('ps')

// mid cards container element
const p0El = document.getElementById('p0')
const p1El = document.getElementById('p1')
const p2El = document.getElementById('p2')
const p3El = document.getElementById('p3')
const p4El = document.getElementById('p4')
const p5El = document.getElementById('p5')
const p6El = document.getElementById('p6')

// bottom cards container element
const bp0El = document.getElementById('bp0')
const bp1El = document.getElementById('bp1')

//TO RENDER
// top cards array
const topCardsEls = [...document.querySelectorAll('#t-piles > div')]

// mid cards array
const midCardsEls = [...document.querySelectorAll('#m-piles > div')]

// bottom cards array
const botCardsEls = [...document.querySelectorAll('#b-piles > div')]


/*----- classes -----*/





/*----- functions -----*/

init()


function init(){
    //create a copy of the deck
    let newDeck = JSON.parse(JSON.stringify(deck))
    
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
    
}

//deal function distributes the cards on the table 1,2,3,4,5,6,7 and 24 
function deal(newDeck){
    //shuffle newDeck
    newDeck.sort( () => Math.random() - 0.5)

    num = 1
    midPiles.forEach((pile)=>{
        for(let i=0; i < num; i++){
            pile.cards.push(newDeck.pop())
        }
        pile.cards[pile.cards.length-1].flip = true
        num++
    })

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

function renderTop() {
    //reset elements for rendering
    phEl.innerHTML = ''
    pcEl.innerHTML = ''
    pdEl.innerHTML = ''
    psEl.innerHTML = ''
    //iterates over the topPiles array of arrays and creates divs for each card. One on top of each other
    topPiles.forEach((pile,eleIdx)=>{
        if(pile.cards.length!==0){
            
            const newCard = document.createElement('div')
            newCard.classList.add('card')
            newCard.classList.add('shadow')
            newCard.classList.add('medium')
            newCard.classList.add( `${pile.cards[pile.cards.length-1].name}`)
            topCardsEls[eleIdx].appendChild(newCard)
        }
        
    })
}


function renderMid(){
    //remove all cards
    p0El.innerHTML = ''
    p1El.innerHTML = ''
    p2El.innerHTML = ''
    p3El.innerHTML = ''
    p4El.innerHTML = ''
    p5El.innerHTML = ''
    p6El.innerHTML = ''
    //iterates over the midPiles array of arrays and creates divs for each card one on top of each other
    midPiles.forEach((pile,index)=>{
        pile.cards.forEach((card)=>{
            const newCard = document.createElement('div')
            newCard.classList.add('card')
            newCard.classList.add('shadow')
            newCard.classList.add('medium')
            //if the card flip === true -> show card facing up
            card.flip?
            newCard.classList.add( `${card.name}`)
            :newCard.classList.add('back-red')
            midCardsEls[index].appendChild(newCard)
        })
    })
    
}

// NOT WORKING IS NOT FINISHED
function renderBottom(){
    
    // if the bottom pile is empty -> return (do not render)
    // if(botPiles[0].cards.length===0){
    //     bp0El.innerHTML = ''
    //     return
    // }
    //remove all divs
    bp0El.innerHTML = ''
    bp1El.innerHTML = ''

    //iterate over botPiles[0].cards and show clicked card
    console.log('this is botPiles[0].cards.length',botPiles[0].cards.length)
    console.log('this is botPiles[1].cards.length',botPiles[1].cards.length)
    if(botPiles[0].cards.length !== 0 || botPiles[1].cards.length !== 0){
        const newCard = document.createElement('div')
        newCard.classList.add('card')
        newCard.classList.add('shadow')
        newCard.classList.add('medium')
        newCard.classList.add('back-red')
        botCardsEls[0].appendChild(newCard)
    }

    //iterate over botPiles[0].cards and show clicked card
    if(botPiles[1].cards.length !== 0){
        const newCard = document.createElement('div')
        newCard.classList.add('card')
        newCard.classList.add('shadow')
        newCard.classList.add('medium')
        newCard.classList.add( `${botPiles[1].cards[botPiles[1].cards.length - 1].name}`)
        botCardsEls[1].appendChild(newCard)
    }
    


}



function handleClick(evt){

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
    topPiles.forEach((pile)=>{
        if(pile.cards[pile.cards.length -1].name[1] === 'K' )
        winner++
    })
    console.log('this is winner',winner)

    //declare a winner
    if(winner === 4){
        msgFinEl.style.visibility = 'visible'
    }else {
        msgFinEl.style.visibility = 'hidden'
        winner = 0
    }
    
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


/*----- event listeners -----*/
phEl.addEventListener('click',handleClick)
pcEl.addEventListener('click',handleClick)
pdEl.addEventListener('click',handleClick)
psEl.addEventListener('click',handleClick)

p0El.addEventListener('click',handleClick)
p1El.addEventListener('click',handleClick)
p2El.addEventListener('click',handleClick)
p3El.addEventListener('click',handleClick)
p4El.addEventListener('click',handleClick)
p5El.addEventListener('click',handleClick)
p6El.addEventListener('click',handleClick)

bp0El.addEventListener('click',handleClick)
bp1El.addEventListener('click',handleClick)


giveUpBtn.addEventListener('click',init)





