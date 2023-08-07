console.log('working')

/*----- constants -----*/

const deck = [
{name:'hK', click:false, flip:false},
{name:'hQ', click:false, flip:false},
{name:'hJ', click:false, flip:false},
{name:'h10', click:false, flip:false},
{name:'h09', click:false, flip:false},
{name:'h08', click:false, flip:false},
{name:'h07', click:false, flip:false},
{name:'h06', click:false, flip:false},
{name:'h05', click:false, flip:false},
{name:'h04', click:false, flip:false},
{name:'h03', click:false, flip:false},
{name:'h02', click:false, flip:false},
{name:'hA', click:false, flip:false},
{name:'dK', click:false, flip:false},
{name:'dQ', click:false, flip:false},
{name:'dJ', click:false, flip:false},
{name:'d10', click:false, flip:false},
{name:'d09', click:false, flip:false},
{name:'d08', click:false, flip:false},
{name:'d07', click:false, flip:false},
{name:'d06', click:false, flip:false},
{name:'d05', click:false, flip:false},
{name:'d04', click:false, flip:false},
{name:'d03', click:false, flip:false},
{name:'d02', click:false, flip:false},
{name:'dA', click:false, flip:false},
{name:'sK', click:false, flip:false},
{name:'sQ', click:false, flip:false},
{name:'sJ', click:false, flip:false},
{name:'s10', click:false, flip:false},
{name:'s09', click:false, flip:false},
{name:'s08', click:false, flip:false},
{name:'s07', click:false, flip:false},
{name:'s06', click:false, flip:false},
{name:'s05', click:false, flip:false},
{name:'s04', click:false, flip:false},
{name:'s03', click:false, flip:false},
{name:'s02', click:false, flip:false},
{name:'sA', click:false, flip:false},
{name:'cK', click:false, flip:false},
{name:'cQ', click:false, flip:false},
{name:'cJ', click:false, flip:false},
{name:'c10', click:false, flip:false},
{name:'c09', click:false, flip:false},
{name:'c08', click:false, flip:false},
{name:'c07', click:false, flip:false},
{name:'c06', click:false, flip:false},
{name:'c05', click:false, flip:false},
{name:'c04', click:false, flip:false},
{name:'c03', click:false, flip:false},
{name:'c02', click:false, flip:false},
{name:'cA', click:false, flip:false},
]


/*----- state variables -----*/

// clicked card is the first clicked card
let clickedCard
let clickedCardEl

let card
let cardNum


//TOP PILES - SUITS
//Cards will be pushed into this array of arrays in order A -> K and same suit
//The last card will be shown on top

let topPiles

//MIDDLE PILES
//Cards will be pushed into these arrays if:
// array === 'empty' -> only King can be pushed
// array.lastelement.color !== card.color 
// array.lastelement.number === card.num + 1


let midPiles = [
    {name:'p0',cards:[]},
    {name:'p1',cards:[]},
    {name:'p2',cards:[]},
    {name:'p3',cards:[]},
    {name:'p4',cards:[]},
    {name:'p5',cards:[]},
    {name:'p6',cards:[]},
]

//BOTTOM PILES

let botPiles = [
    {name:'bp0',cards:[]},
    {name:'bp1',cards:[]},
]


// another method to push to the front of the array
/*----- cached elements  -----*/


//invalid move message
const msgInvEl = document.getElementById('inv-msg')
// msgInvEl.style.visibility = 'visible'
//win or loose message
const msgFinEl = document.getElementById('final-msg')
// msgFinEl.style.visibility = 'visible'

//TO LISTEN
// top cards container element
const topPilesEl = document.getElementById('t-piles')
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
    let newDeck = deck.splice(0)
    //initiate top piles
    topPiles = [
        [{name:'h', click:false, flip:true}],
        [{name:'c', click:false, flip:true}],
        [{name:'d', click:false, flip:true}],
        [{name:'s', click:false, flip:true}]
    ]
    

    clickedCardStr = null
    

    deal(newDeck)

    renderMid()

    renderTop()

    renderBottom()


    
}

//deal function distributes the cards on the table 1,2,3,4,5,6,7 and 24 
function deal(deck){
    {
        // migth use this for random numbers
        // console.log(Math.floor(Math.random()*Number(deck.length)))

        num = 1
        midPiles.forEach((pile)=>{
            for(let i=0; i < num; i++){
                pile.cards.push(deck.pop())
            }
            pile.cards[pile.cards.length-1].flip = true
            num++
        })
    
        botPiles[0].cards = deck
        

    }

}

function render(){
    renderTop()
    renderMid()
    renderBottom()
    renderControls()
}

function renderTop() {
    //iterates over the topPiles array of arrays and creates divs for each card one on top of each other
    topPiles.forEach((pile,eleIdx)=>{
        if(pile.length!==0){
            
            const newCard = document.createElement('div')
            newCard.classList.add('card')
            newCard.classList.add('shadow')
            newCard.classList.add('medium')
            newCard.classList.add( `${pile[pile.length-1].name}`)
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
    
    //if the bottom pile is empty -> return (do not render)
    if(botPiles[0].cards.length===0)return
    //remove all divs
    bp1El.innerHTML = ''
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

    clickedCardEl = evt.target

    // convert evt.target into array to get the card in the class
    if(evt.target.classList.contains('card')){
        let targetClasses = [...evt.target.classList]
        card = targetClasses[targetClasses.length-1]
        cardNum = convertCardToNumber(card)
    }

    //if clicked on bottom main pile -> flip cards
    if(evt.target.id === 'bp0'){
        if(botPiles[0].cards.length!==0){
            botPiles[1].cards.push(botPiles[0].cards.pop())
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
        //condition to add king to empty pile
        if(!evt.target.classList.contains('card')){
            midPiles.forEach((pile)=>{
                if(evt.currentTarget.id === pile.name &&
                    pile.cards.length === 0 &&
                        clickedCardNum === 13){

                    console.log('The king shall move to this pile')
                    
                    //is the first card clicked from the bottom -> remove from bottom
                    if(clickedCardParentId === 'bp1'){
                        removedCards = removeCard(botPiles,clickedCardParentId)
                    } 
                    //is the first card clicked from the mid -> remove from mid
                    else {
                        removedCards = removeCard(midPiles,clickedCardParentId)
                    }
                    //add card to pile
                    pushCard(midPiles,evt.currentTarget.id,removedCards)
                    
                    renderMid()
                    renderBottom()

                }
            })

        }

        

        //number condition
        else if(cardNum-1 === clickedCardNum){
            //color condition
            if(((card[0]==='d'||card[0]==='h')&& (clickedCardStr[0]==='c'||clickedCardStr[0]==='s'))||
            ((card[0]==='c'||card[0]==='s')&& (clickedCardStr[0]==='d'||clickedCardStr[0]==='h'))){
                console.log('this is a good move')
                
                //find the clickedcard pile, remove card and save it
                //IMPROVE BY REMOVING MANY CARDS
                let removedCards = []
                
                //is the first card clicked from the bottom -> remove from bottom
                if(clickedCardParentId === 'bp1'){
                    
                    removedCards = removeCard(botPiles,clickedCardParentId)
                    
                } 
                //is the first card clicked from the mid -> remove from mid
                else {
                    removedCards = removeCard(midPiles,clickedCardParentId)
                }
                
                
                //add card to pile
                pushCard(midPiles,evt.currentTarget.id,removedCards)
                

                
                renderMid()
                renderBottom()

                
            }
            

        }
        
            //If the second clicked card is on the top pile
        else if(evt.currentTarget.id === 't-piles'){

            console.log('the second card clicked was on top')

        }  
        else if(clickedCardNum === 13){

            midPiles.forEach((pile)=>{
                if(pile.name === evt.currentTarget.id && pile.cards.length === 0){
                    console.log('the king shall move')
                    //remove from bottom pile and save card
            
                    //add to the empty middle pile
    
                }
            })
        } 
        else   {
            //invalid move
            msgInvEl.style.visibility = 'visible' 
            setTimeout(function(){
                msgInvEl.style.visibility = 'hidden' 
            }, 1000);

        }
    
        //reset the clicked element
        clickedCardEl.style.border = ''
        clickedCardStr = null
            
        
        

    }

    
}

function convertCardToNumber(card){
    if(card.substring(1)==='A')return 1
    if(card.substring(1)==='J')return 11
    if(card.substring(1)==='Q')return 12
    if(card.substring(1)==='K')return 13
    else return Number(card.substring(1))

}

function removeCard(piles,clickedCardParentId){
    let removedCards = []
    piles.forEach((pile)=>{
        if(pile.name===clickedCardParentId){
            removedCards.push(pile.cards.pop())
            //if there is another card -> flip it
            if(pile.cards.length !== 0) pile.cards[pile.cards.length -1].flip = true
            console.log(removedCards)
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

topPilesEl.addEventListener('click',handleClick)
p0El.addEventListener('click',handleClick)
p1El.addEventListener('click',handleClick)
p2El.addEventListener('click',handleClick)
p3El.addEventListener('click',handleClick)
p4El.addEventListener('click',handleClick)
p5El.addEventListener('click',handleClick)
p6El.addEventListener('click',handleClick)

bp0El.addEventListener('click',handleClick)
bp1El.addEventListener('click',handleClick)





