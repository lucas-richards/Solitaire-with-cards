console.log('working')

/*----- constants -----*/

const deck = [
{name:'hK', click:false, flip:false},
{name:'hQ', click:false, flip:false},
{name:'hJ', click:false, flip:false},
{name:'h10', click:false, flip:false},
{name:'h9', click:false, flip:false},
{name:'h8', click:false, flip:false},
{name:'h7', click:false, flip:false},
{name:'h6', click:false, flip:false},
{name:'h5', click:false, flip:false},
{name:'h4', click:false, flip:false},
{name:'h3', click:false, flip:false},
{name:'h2', click:false, flip:false},
{name:'hA', click:false, flip:false},
{name:'dK', click:false, flip:false},
{name:'dQ', click:false, flip:false},
{name:'dJ', click:false, flip:false},
{name:'d10', click:false, flip:false},
{name:'d9', click:false, flip:false},
{name:'d8', click:false, flip:false},
{name:'d7', click:false, flip:false},
{name:'d6', click:false, flip:false},
{name:'d5', click:false, flip:false},
{name:'d4', click:false, flip:false},
{name:'d3', click:false, flip:false},
{name:'d2', click:false, flip:false},
{name:'dA', click:false, flip:false},
{name:'sK', click:false, flip:false},
{name:'sQ', click:false, flip:false},
{name:'sJ', click:false, flip:false},
{name:'s10', click:false, flip:false},
{name:'s9', click:false, flip:false},
{name:'s8', click:false, flip:false},
{name:'s7', click:false, flip:false},
{name:'s6', click:false, flip:false},
{name:'s5', click:false, flip:false},
{name:'s4', click:false, flip:false},
{name:'s3', click:false, flip:false},
{name:'s2', click:false, flip:false},
{name:'sA', click:false, flip:false},
{name:'cK', click:false, flip:false},
{name:'cQ', click:false, flip:false},
{name:'cJ', click:false, flip:false},
{name:'c10', click:false, flip:false},
{name:'c9', click:false, flip:false},
{name:'c8', click:false, flip:false},
{name:'c7', click:false, flip:false},
{name:'c6', click:false, flip:false},
{name:'c5', click:false, flip:false},
{name:'c4', click:false, flip:false},
{name:'c3', click:false, flip:false},
{name:'c2', click:false, flip:false},
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

let p1 = []
let p2 = []
let p3 = []
let p4 = []
let p5 = []
let p6 = []
let p7 = []

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

    Deal(newDeck)

    render()

    
}

function Deal(deck){
    {
        // migth use this for random numbers
        // console.log(Math.floor(Math.random()*Number(deck.length)))
        
        p1.unshift(deck.pop())
        console.log(p1)
        
        for(let i=0; i < 2; i++){
            p2.unshift(deck.pop())
        }
        console.log(p2)
        for(let i=0; i < 3; i++){
            p3.unshift(deck.pop())
        }
        console.log(p3)
        for(let i=0; i < 4; i++){
            p4.unshift(deck.pop())
        }
        console.log(p4)
        for(let i=0; i < 5; i++){
            p5.unshift(deck.pop())
        }
        console.log(p5)
        for(let i=0; i < 6; i++){
            p6.unshift(deck.pop())
        }
        console.log(p6)
        for(let i=0; i < 7; i++){
            p7.unshift(deck.pop())
        }
        console.log(p7)
        

        p1[0].flip = true
        p2[0].flip = true
        p3[0].flip = true
        p4[0].flip = true
        p5[0].flip = true
        p6[0].flip = true
        p7[0].flip = true

        pm = deck

        
    }

}

function render(){
    renderTopPiles()
    renderMediumPiles()
    renderBottomPiles()
    renderControls()
}

function renderTopPiles(){

}

function handleMove(evt){
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

topPilesEl.addEventListener('click',handleMove)
midPilesEl.addEventListener('click',handleMove)
botPilesEl.addEventListener('click',handleMove)





