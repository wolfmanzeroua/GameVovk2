var  heroMovePath = function (heroCounterPassedPoint) {

    var DefaultHeroDestinationPointOfXMen =
        [[50, 10, 20, 30, 800, 500, 500, 150],
         [50, 70, 100, 300, 500, 0, 600, 10]];

     //console.log('Hello',  DefaultHeroDestinationPointOfXMen)
    var  DefaultHeroDestinationPointOfVampires =
        [[800, 300, 20, 10, 600, 450, 100, 400],
        [50, 600, 20, 300, 500, 5, 600, 300]];



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