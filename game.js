var game = {
  state: {
  flower: 0,
  C1: {
    amount: 0,
    cost: 50,
		prod: 1,
		interval: 1,
		buy: function() {
    if(game.state.flower < this.cost) return 0;
    if(game.state.flower >= this.cost) {
      game.state.flower-=this.cost;
      this.amount++;
			this.cost = Math.pow(1.03,this.amount)*50;
    }
		}
	},
  C3: {
    amount: 0,
    cost: 2000,
		prod: 50,
		interval: 3,
		buy: function() {
    if(game.state.flower < this.cost) return 0;
    if(game.state.flower >= this.cost) {
      game.state.flower-=this.cost;
      this.amount++;
			this.cost = Math.pow(1.05,this.amount)*2000;
		}
		}
	},
	C4: {
		amount: 0,
		cost: 2e6,
		prod: 3e5,
		interval: 4,
		buy: function() {
    if(game.state.flower < this.cost) return 0;
    if(game.state.flower >= this.cost) {
      game.state.flower-=this.cost;
      this.amount++;
			this.cost = Math.pow(1.1,this.amount)*2000;
    }
		}
	},
  tap: 1
  }
};
var AFPS;
function commaNumber(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
setInterval(function() {
AFPS = Math.round(game.state.C1.amount + (game.state.C3.prod/game.state.C3.interval * game.state.C3.amount) + (game.state.C4.prod/game.state.C4.interval * game.state.C4.amount))
}, 20);
function UpdateAFPS(){
	document.getElementById('AverageFlowerPerSecond').innerHTML = commaNumber(AFPS);
}
function MakeFlowers(amt){
  game.state.flower += amt;
  document.getElementById("flower").innerHTML = commaNumber(game.state.flower);
}
setInterval(function() { // Interval function for 1-leaf clovers
	MakeFlowers(game.state.C1.amount);
}, game.state.C1.interval*1000);
setInterval(function(){ // Interval function for 3-leaf clovers
	MakeFlowers(game.state.C3.prod * game.state.C3.amount);
}, game.state.C3.interval*1000);
setInterval(function(){ // Interval function for 4-leaf clovers!
	MakeFlowers(game.state.C4.prod * game.state.C4.amount);
}, game.state.C4.interval*1000);
setInterval(function(){
	UpdateAFPS();
	document.getElementById("C1s").innerHTML = commaNumber(game.state.C1.amount);
	document.getElementById("C1cost").innerHTML = commaNumber(game.state.C1.cost);
	document.getElementById("C1prod").innerHTML = commaNumber(game.state.C1.prod);
	document.getElementById("C3s").innerHTML = commaNumber(game.state.C3.amount);
	document.getElementById("C3cost").innerHTML = commaNumber(game.state.C3.cost);
	document.getElementById("C3prod").innerHTML = commaNumber(game.state.C3.prod);
	document.getElementById("C4s").innerHTML = commaNumber(game.state.C4.amount);
	document.getElementById("C4cost").innerHTML = commaNumber(game.state.C4.cost);
	document.getElementById("C4prod").innerHTML = commaNumber(game.state.C4.prod);
}, 40);
function save() {
  localStorage.cc = btoa(JSON.stringify(game));
}
function load() {
  if(!localStorage.cc) return;
  game = JSON.parse(atob(localStorage.cc));
  transformToDecimal(game);
}
function transformToDecimal(object) { 
  for(var i in object) {
   if(typeof(object[i]) == "string" && !isNaN(new Decimal(object[i]).mag)) object[i] = new Decimal(object[i]); 
   if(typeof(object[i]) == "object") transformToDecimal(object[i]) ;
  }
}
load();
setInterval(function(){
	save();
}, 15000);
