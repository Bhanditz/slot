import Reel from './Reel.js';
import Symbol from './Symbol.js';
import Reward from './Reward.js';

let startingCredits = 100;
export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();
    
    this.currentSymbols = [
      ['7', 'Cherry', '3xBAR'],
      ['Cherry', '3xBAR', 'Cherry'],
      ['Cherry', 'Cherry', '3xBAR'],
     
    ];

    this.nextSymbols = [
      ['Cherry', 'Cherry', 'Cherry'],
      ['Cherry', 'Cherry', 'Cherry'],
      ['Cherry', 'Cherry', 'Cherry'],
    ]

    this.container = domElement;
   
    
    this.reels = Array.from(this.container.getElementsByClassName('reel')).map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx])); 
    this.spinButton = document.getElementById('spin');
    this.spinButton.addEventListener('click', () => this.spin());

    this.autoPlayCheckbox = document.getElementById('autoplay');
    this.balance = document.getElementById('balance')
    this.balance.value = startingCredits;
   
    if (config.inverted) {
      this.container.classList.add('inverted');
    } 
    this.payTableDiv = document.getElementById('pay-table');
    this.debugger = document.createElement('div');
    this.debuggerArea = document.createElement('textarea');
    this.debugger.classList.add('debug');
    this.payTableDiv.appendChild(this.debugger);
    this.debuggerArea.cols = 20
    this.debuggerArea.rows = 3
    this.debugger.appendChild(this.debuggerArea);
  }
 

  spin() {
    this.onSpinStart();

    this.currentSymbols = this.nextSymbols;
    // this.nextSymbols = [
    //   ['Cherry', 'Cherry', 'Cherry'],
    //   ['Cherry', 'Cherry', 'Cherry'],
    //   ['Cherry', 'Cherry', 'Cherry'],
     
    // ];
    // this.nextSymbols = [
    //   ['7', '7', '7'],
    //   ['7', 'BAR', '2xBAR'],
    //   ['3xBAR', '2xBAR', '7'],
    // ]
    
    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
     
    ];
    
    return Promise.all(this.reels.map(reel => {
      reel.renderSymbols(this.currentSymbols[reel.idx], this.nextSymbols[reel.idx]);
      
      return reel.spin();
    })).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.spinButton.disabled = true;
    //this.balance --;
    this.balance.value --;
    console.log('SPIN START');
  }
  getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
 }
 matchResult(line){
  var result = {};
    Symbol.symbols.forEach(function(item) {
      result[item] = line.filter(t => t == item).length;
    })
    return result;
 }
 
 
  onSpinEnd() {
    this.spinButton.disabled = false;
    const fisrtLine =Object.values(this.matchResult(this.getCol(this.nextSymbols,0)));
    const middleLine =Object.values(this.matchResult(this.getCol(this.nextSymbols,1)));
    const lastLine = Object.values(this.matchResult(this.getCol(this.nextSymbols,2)));
   console.log(fisrtLine);
    console.log(this.matchResult(this.getCol(this.nextSymbols,0)))
    console.log(this.matchResult(this.getCol(this.nextSymbols,1)));
    console.log(this.matchResult(this.getCol(this.nextSymbols,2)));
    let firstLineReward = new Reward(fisrtLine,1)
    let middleLineReward = new Reward(middleLine,2)
    let lastLineReward = new Reward(lastLine,3)
    // console.log(reward3);
    if(firstLineReward.rewardCalculation()>0){
      this.balance.value= parseInt(this.balance.value) + parseInt(firstLineReward.rewardCalculation())
      Reward.highlight(1)
    }
    if(middleLineReward.rewardCalculation()>0){
      this.balance.value= parseInt(this.balance.value) + parseInt(middleLineReward.rewardCalculation())
      Reward.highlight(2)
    }
    if(lastLineReward.rewardCalculation()>0){
      this.balance.value= parseInt(this.balance.value) + parseInt(lastLineReward.rewardCalculation())
      Reward.highlight(3)
    }
    console.log("First Line Reward "+firstLineReward.rewardCalculation())
    console.log("Middle Line Reward "+middleLineReward.rewardCalculation())
    console.log("Last Line Reward "+lastLineReward.rewardCalculation())    
    this.total = firstLineReward.rewardCalculation()+middleLineReward.rewardCalculation()+lastLineReward.rewardCalculation()
    this.debuggerArea.textContent = "Total winning "+this.total
    
    if (this.autoPlayCheckbox.checked) return window.setTimeout(() => this.spin(), 200);
  }
 
}
