var  heroMovePath = function (heroCounterPassedPoint) {

    var DefaultHeroDestinationPointOfXMen =
        [[1, 40, 88, 80, 260, 790, 352, 440],
         [1, 100, 250, 540, 520, 590, 260, 20 ]];

     //console.log('Hello',  DefaultHeroDestinationPointOfXMen)
    var  DefaultHeroDestinationPointOfVampires =
        [[800, 300, 20, 10, 650, 450, 100, 480],
        [50, 600, 1, 300, 500, 5, 600, 300]];



    var endOfPath = false;

    if (this.clan == 'X-Men') {
        if  (heroCounterPassedPoint > DefaultHeroDestinationPointOfXMen[0].length -1){
            heroCounterPassedPoint = DefaultHeroDestinationPointOfXMen[0].length-1;
            endOfPath = true;
        }
       //console.log(this.name, this.clan,' точка маршруту:',heroCounterPassedPoint,  DefaultHeroDestinationPointOfXMen[0][heroCounterPassedPoint], DefaultHeroDestinationPointOfXMen[1][heroCounterPassedPoint]);
        return {
            x:  DefaultHeroDestinationPointOfXMen[0][heroCounterPassedPoint],
            y:  DefaultHeroDestinationPointOfXMen[1][heroCounterPassedPoint],
            isLast: endOfPath
        }
    }

    if (this.clan == 'Vampires') {
        if  (heroCounterPassedPoint >  DefaultHeroDestinationPointOfVampires[0].length -1) {
            heroCounterPassedPoint = DefaultHeroDestinationPointOfVampires[0].length - 1;
            endOfPath = true;
        }
      //  console.log(this.name, this.clan,' точка маршруту:',heroCounterPassedPoint,  DefaultHeroDestinationPointOfVampires[0][heroCounterPassedPoint], DefaultHeroDestinationPointOfVampires[1][heroCounterPassedPoint]);
        return {
            x:  DefaultHeroDestinationPointOfVampires[0][heroCounterPassedPoint],
            y:  DefaultHeroDestinationPointOfVampires[1][heroCounterPassedPoint],
            isLast: endOfPath
        }

    }
};
module.exports= heroMovePath;