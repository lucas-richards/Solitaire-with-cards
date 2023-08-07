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
//boolean 
let flag

//
let clickedCard
let clickedCardEl


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

let pm = []

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
const botPilesEl = document.getElementById('b-piles')

//TO RENDER
// top cards array
const topCards = [...document.querySelectorAll('#t-piles > div')]

// mid cards array
const midCards = [...document.querySelectorAll('#m-piles > div')]

// bottom cards array
const botCards = [...document.querySelectorAll('#b-piles > div')]


/*----- classes -----*/





/*----- functions -----*/

init()


function init(){
    //create a copy of the deck
    let newDeck = deck.splice(0)
    //initiate top piles
    topPiles = [
        [{name:'h', click:false, flip:false}],
        [{name:'c', click:false, flip:false}],
        [{name:'d', click:false, flip:false}],
        [{name:'s', click:false, flip:false}]
    ]

    flag = true
    clickedCardStr = null
    

    deal(newDeck)

    renderMid()

    renderTop()

    renderBottom()


    
}

//deal will distribute the cards on the table 1,2,3,4,5,6,7 and 24 
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

        console.log('these are midPiles',midPiles)
    
        pm = deck
        

    }

}

function render(){
    renderTop()
    renderMid()
    renderBottom()
    renderControls()
}

function renderTop() {

    topPiles.forEach((pile,eleIdx)=>{
        if(pile.length!==0){
            
            const newCard = document.createElement('div')
            newCard.classList.add('card')
            newCard.classList.add('shadow')
            newCard.classList.add('medium')
            newCard.classList.add( `${pile[pile.length-1].name}`)
            topCards[eleIdx].appendChild(newCard)
        }
        
    })
}


function renderMid(){

    midPiles.forEach((pile,index)=>{
        pile.cards.forEach((card)=>{
            const newCard = document.createElement('div')
            newCard.classList.add('card')
            newCard.classList.add('shadow')
            newCard.classList.add('medium')
            card.flip?
            newCard.classList.add( `${card.name}`)
            :newCard.classList.add('back-red')
            midCards[index].appendChild(newCard)
        })
    })
    
}

// IS NOT FINISHED
function renderBottom(){
    console.log(botCards)
    console.log(pm)
    //if the bottom pile is empty -> return (do not render)
    if(pm.length!==0)return
    //iterate over pm and show clicked card
    pm.forEach((card)=>{
        if(card.flip){
            const newCard = document.createElement('div')
            newCard.classList.add('card')
            newCard.classList.add('shadow')
            newCard.classList.add('medium')
            newCard.classList.add( `${card.name}`)
            botCards[1].appendChild(newCard)
        }
    })

}



function handleClick(evt){
    //set invalid message to invisible

    //If a card was clicked and clickedCard is not null do this
    if(evt.target.classList.contains('card')){
        // convert evt.target into array to get the card in the class
        let targetClasses = [...evt.target.classList]
        let card = targetClasses[targetClasses.length-1]
        
        //This is the first card that is clicked
        if(clickedCardStr===null){
            evt.target.style.border = 'solid black'
            clickedCardEl = evt.target
            clickedCardParentId = evt.currentTarget.id
            clickedCardStr = card

        }
        //This is the second card that is clicked
        else {
            

            //NEED TO ADD CONVERSION FOR A=1 K=13 Q=12 J=11

            //number condition
            if(Number(card.substring(1))-1=== Number(clickedCardStr.substring(1))){
                //color condition
                if(((card[0]==='d'||card[0]==='h')&& (clickedCardStr[0]==='c'||clickedCardStr[0]==='s'))||
                ((card[0]==='c'||card[0]==='s')&& (clickedCardStr[0]==='d'||clickedCardStr[0]==='h'))){
                    console.log('that could be a good move')
                   let removedCards = []
                    //find the clickedcard pile, remove card and save it
                    //IMPROVE BY REMOVING MANY CARDS
                    midPiles.forEach((pile)=>{
                        if(pile.name===clickedCardParentId){
                            removedCards.push(pile.cards.pop())
                            pile.cards[pile.cards.length -1].flip = true
                            console.log(removedCards)
                        }
                                    
                    })
                    //add card to pile
                    midPiles.forEach((pile)=>{
                        if(pile.name===evt.currentTarget.id){
                            removedCards.forEach((card)=> pile.cards.push(card))
                                                        
                        }
                                    
                    })

                    console.log(midPiles)
                    renderMid()
                }
                
        
            }
            console.log('this is the evt.target card',card)
            console.log('this is clicked card',clickedCardStr)
            
            
            //reset the clicked element
            clickedCardEl.style.border = ''
            clickedCardStr = null

        }
        
        
       
    }
    //if a card was not clicked and clickedcard was not null
    //set clickedcard to null and display for 2 seconds the invalid move message
    if(!evt.target.classList.contains('card')&&clickedCardEl!==undefined){
        clickedCardStr = null
        clickedCardEl.style.border = ''
       
    }





    //NOT DONE
    //bottom pile flip cards
    if(evt.target.id === 'pm'&& pm.length!==0){
        console.log('you clicked pm')
        pm.forEach((card,cardIdx)=>{
            if(card.flip){
                flag=false
                console.log('flip changes')
                card.flip = false
                return
            }
        })

        if(flag)pm[0].flip = true
        console.log(pm)
      
    }

}

function render() {
    
}

function attachCard(card){
    

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
botPilesEl.addEventListener('click',handleClick)





