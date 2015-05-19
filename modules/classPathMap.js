var  heroMovePath = function (heroCounterPassedPoint) {

    var DefaultHeroDestinationPointOfXMen =
        [{x:1, y:1},{x:50, y:95}, {x:70, y:250}, {x:80, y:540}, {x:260, y:520}, {x:580, y:490}, {x:600, y:260}, {x:790, y:590}, {x:600, y:290}, {x:352, y:260}, {x:440, y:20}];

     //console.log('Hello',  DefaultHeroDestinationPointOfXMen)
    var  DefaultHeroDestinationPointOfVampires =
        [{x:800, y:50},{x:550, y:290}, {x:300, y:600}, {x:220, y:230}, {x:20, y:1}, {x:10, y:300}, {x:120, y:300}, {x:610, y:500}, {x:450, y:5},{x:100, y:600}, {x:480, y:300}];



    var endOfPath = false;

    if (this.clan == 'X-Men') {
        if  (heroCounterPassedPoint > DefaultHeroDestinationPointOfXMen.length -1){
            heroCounterPassedPoint = DefaultHeroDestinationPointOfXMen.length-1;
            endOfPath = true;
        }
       //console.log(this.name, this.clan,' точка маршруту:',heroCounterPassedPoint,  DefaultHeroDestinationPointOfXMen[0][heroCounterPassedPoint], DefaultHeroDestinationPointOfXMen[1][heroCounterPassedPoint]);
        return {
            x:  DefaultHeroDestinationPointOfXMen[heroCounterPassedPoint].x,
            y:  DefaultHeroDestinationPointOfXMen[heroCounterPassedPoint].y,
            isLast: endOfPath
        }
    }

    if (this.clan == 'Vampires') {
        if  (heroCounterPassedPoint >  DefaultHeroDestinationPointOfVampires.length -1) {
            heroCounterPassedPoint = DefaultHeroDestinationPointOfVampires.length - 1;
            endOfPath = true;
        }
      //  console.log(this.name, this.clan,' точка маршруту:',heroCounterPassedPoint,  DefaultHeroDestinationPointOfVampires[0][heroCounterPassedPoint], DefaultHeroDestinationPointOfVampires[1][heroCounterPassedPoint]);
        return {
            x:  DefaultHeroDestinationPointOfVampires[heroCounterPassedPoint].x,
            y:  DefaultHeroDestinationPointOfVampires[heroCounterPassedPoint].y,
            isLast: endOfPath
        }

    }
};
module.exports= heroMovePath;