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

//TOP PILES - SUITS
//Cards will be pushed into these arrays in order A -> K and same suit
let ph = []
let pc = []
let pd = []
let ps = []

//MIDDLE PILES
//Cards will be pushed into these arrays if:
// array === 'empty' -> only King can be pushed
// array.lastelement.color !== card.color 
// array.lastelement.number === card.num + 1

let p0 = []
let p1 = []
let p2 = []
let p3 = []
let p4 = []
let p5 = []
let p6 = []

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
const midPilesEl = document.getElementById('m-piles')
// bottom cards container element
const botPilesEl = document.getElementById('b-piles')

//TO RENDER
// top cards array
const topCards = [...document.querySelectorAll('#t-piles > div')]
console.log(topCards)
// mid cards array
const midCards = [...document.querySelectorAll('#m-piles > div')]
console.log(midCards)
// bottom cards array
const botCards = [...document.querySelectorAll('#b-piles > div')]
console.log(botCards)

/*----- classes -----*/





/*----- functions -----*/

init()


function init(){
    
    let newDeck = deck.splice(0)

    deal(newDeck)

    renderMid()


    
}

function deal(deck){
    {
        // migth use this for random numbers
        // console.log(Math.floor(Math.random()*Number(deck.length)))
        

        p0.push(deck.pop())
        console.log(p0)
        for(let i=0; i < 2; i++){
            p1.push(deck.pop())
        }
        console.log(p1)
        for(let i=0; i < 3; i++){
            p2.push(deck.pop())
        }
        console.log(p2)
        for(let i=0; i < 4; i++){
            p3.push(deck.pop())
        }
        console.log(p3)
        for(let i=0; i < 5; i++){
            p4.push(deck.pop())
        }
        console.log(p4)
        for(let i=0; i < 6; i++){
            p5.push(deck.pop())
        }
        console.log(p5)
        for(let i=0; i < 7; i++){
            p6.push(deck.pop())
        }
        console.log(p6)
        
        
        p0[p0.length-1].flip = true
        p1[p1.length-1].flip = true
        p2[p2.length-1].flip = true
        p3[p3.length-1].flip = true
        p4[p4.length-1].flip = true
        p5[p5.length-1].flip = true
        p6[p6.length-1].flip = true
        

        pm = deck

    }

}
0
function render(){
    renderTop()
    renderMid()
    renderBottom()
    renderControls()
}



function renderMid(){
    renderPile(p0,midCards[0])
    renderPile(p1,midCards[1])
    renderPile(p2,midCards[2])
    renderPile(p3,midCards[3])
    renderPile(p4,midCards[4])
    renderPile(p5,midCards[5])
    renderPile(p6,midCards[6])
    
}

function renderPile(cards,container){
    cards.forEach((card)=>{
        const newCard = document.createElement('div')
        newCard.classList.add('card')
        newCard.classList.add('shadow')
        newCard.classList.add('medium')
        card.flip?
        newCard.classList.add( `${card.name}`)
        :newCard.classList.add('back-red')
        container.appendChild(newCard)
    })
}

function handleClick(evt){
    //do this is the element clicked is a card
    if(evt.target.classList.contains('card')){
        evt.target.style.border = 'solid black'
        // convert evt.target into array to get the card in the class
        let targetClasses = [...evt.target.classList]
        let card = targetClasses[targetClasses.length-1]
        //console.log the card clicked
        console.log('this is the pile of the card',evt.currentTarget)
        console.log('this is the card clicked',card)
    }

}

function render() {
    
}



/*----- event listeners -----*/

topPilesEl.addEventListener('click',handleClick)
midPilesEl.addEventListener('click',handleClick)
botPilesEl.addEventListener('click',handleClick)





