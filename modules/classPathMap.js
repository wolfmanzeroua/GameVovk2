var  heroMovePath = function (heroCounterPassedPoint) {

    var DefaultHeroDestinationPointOfXMen =
        [[1, 50, 70, 80, 260, 580, 600, 790, 600, 352, 440],
         [1, 95, 250, 540, 520, 490,260, 590, 290, 260, 20 ]];

     //console.log('Hello',  DefaultHeroDestinationPointOfXMen)
    var  DefaultHeroDestinationPointOfVampires =
        [[800, 550, 300, 220, 20, 10, 120, 610, 450, 100, 480],
        [50, 290, 600, 230,1, 300, 300, 500, 5, 600, 300]];



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