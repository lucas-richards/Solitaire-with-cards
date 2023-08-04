console.log('working')

  /*----- constants -----*/

  const cards = [
    {0:'hK', color:'red', onTopM:'empty', onTopF:'hQ'},
    {0:'hQ', color:'red', onTopM:'empty', onTopF:'hQ' },
    {0:'hJ', color:'red', onTopM:'empty', onTopF:'hQ' },

  ]

  


  /*----- state variables -----*/

  //Top piles - 4 suits
  //Cards will be pushed into these arrays in order A -> K and same suit
  let fph = []
  let fpc = []
  let fpd = []
  let fps = []
  
  //middle piles
  //Cards will be pushed into these arrays if:
  // array === 'empty' -> only King can be pushed
  // array.lastelement.color !== card.color 
  // array.lastelement.number === card.num + 1

  let pile1 = []
  let pile2 = []
  let pile3 = []
  let pile4 = []
  let pile5 = []
  let pile6 = []
  let pile7 = []

  /*----- cached elements  -----*/

  const topPilesEl = document.getElementById('t-piles')

  console.log(topPilesEl)


  /*----- event listeners -----*/


  /*----- functions -----*/






