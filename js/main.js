console.log('working')

/*----- constants -----*/

const cards = [
{name:'hK', color:'red', clicked:false},
{name:'hQ', color:'red', clicked:false},
{name:'hJ', color:'red', clicked:false},
{name:'h10', color:'red', clicked:false},
{name:'h9', color:'red', clicked:false},
]


/*----- state variables -----*/

//TOP PILES
//Cards will be pushed into these arrays in order A -> K and same suit
let fph = []
let fpc = []
let fpd = []
let fps = []

//MIDDLE PILES
//Cards will be pushed into these arrays if:
// array === 'empty' -> only King can be pushed
// array.lastelement.color !== card.color 
// array.lastelement.number === card.num + 1

let pile1 = ['cK','red-back','red-back']
let pile2 = []
let pile3 = []
let pile4 = []
let pile5 = []
let pile6 = []
let pile7 = []

//BOTTOM PILES

let mPile = []
//slice and save it 
// another method to push to the front of the array
/*----- cached elements  -----*/

//this div element contains the 4 div piles on the top
const topPilesEl = document.getElementById('t-piles')
//this div element contains the 7 div piles on the middle
const midPilesEl = document.getElementById('m-piles')
//this div element contains the 2 div piles on the bottom
const botPilesEl = document.getElementById('b-piles')
//invalid move message
const msgInvEl = document.getElementById('inv-msg')
msgInvEl.style.visibility = 'visible'
//win or loose message
const msgFinEl = document.getElementById('final-msg')
msgFinEl.style.visibility = 'visible'

/*----- classes -----*/

class Solitaire {
    constructor(topPilesEl,midPilesEl,botPilesEl) {
        this.topPilesEl = topPilesEl;
        this.midPilesEl = midPilesEl;
        this.botPilesEl = [...botPilesEl.querySelectorAll('div')];
    }
}
/*----- event listeners -----*/

topPilesEl.addEventListener('click',handleMove)
midPilesEl.addEventListener('click',handleMove)
botPilesEl.addEventListener('click',handleMove)


/*----- functions -----*/

init()

function handleMove(evt){
    if(evt.target.classList.contains('card'))
    evt.target.style.border = 'solid black'
    let card = evt.target
    // document.evt.target.classList[ evt.target.classList.length-1 ]
    console.log(card.classList)

}

function init(){
    let game = new Solitaire(topPilesEl,midPilesEl,botPilesEl)
    console.log(game)
    
}






