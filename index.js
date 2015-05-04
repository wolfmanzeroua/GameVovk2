
var heroMovePath = require('./modules/classPathmap.js');
var defSet = require('./modules/defaultClassSettings.js');
var Location = require('./modules/location.js');

var numberOfLivingHero = 0;
var numberOfHero = 0;
var numberOfSteps = 0;
var gameMode = "Deathmatch";
var heroes = [];

var myLocation = new Location(800, 600, 0, 0, 10, 20, 0.2, 1, 0.2, 100, 4000);
myLocation.barriersInit(0);
// ініціалізація барєрів, самі барєри описані в цій же функції


var startGame = false;


// клас потомок
function Vampires(clan, name, level, features, hairСolor, beard, tits, sex, health, power, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, hasVampBite, x, y) {
    XMen.apply(this, arguments);
}

// клас нащалок
function XMen(clan, name, level, features, hairСolor, beard, tits, sex, health, power, attackRange, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, canHealing, healingMaxPoint, hasVampBite,lookForTrouble, x, y) {
    this.clan = clan;
    this.name = name;
    this.features = features;
    this.hairСolor = hairСolor;
    this.beard = beard;
    this.tits = tits;
    this.sex = sex;
    this.health = health;
    this.maxHealth = health;
    this.power = power;
    this.attackRange = attackRange;
    this.damage = damage;
    this.specDamage = specDamage;

    // Шанс нанести спецудар ногтями або укус у вампіра
    this.chanceSpecDamage = chanceSpecDamage;
    this.defence = defence;
    this.speed = speed;
    this.canFly = canFly;
    this.flySpeed = flySpeed;
    this.canBeInvisible = canBeInvisible;
    this.invisible = invisible;
    this.canJump = canJump;
    this.canTeleport = canTeleport;
    this.canShoot = canShoot;
    this.canFreeze = canFreeze;
    this.isFreeze = false;
    this.isFly = false;
    this.FreezeStepLeft = 0;


    // Спеціальний навик деяких істот відновлюватися
    this.canHealing = canHealing;
    this.healingMaxPoint = healingMaxPoint;

    // Спеціальний навик вампіра, якщо тру - дає можливість відновити здоровся за рахунок нанесеного урона
    this.hasVampBite = hasVampBite;

    // рівень героя. після перемоги підвищується і запускається метод levelUp()
    this.level = level;
    this.lookForTrouble = lookForTrouble;

    // масив для збереження історії героя
    this.history = [];
    this.x = x;
    this.y = y;
    this.PathMapStep = 0;
    this.walkedAllWay = false;
    this.nextDestinationPoint = { 'x': x,
        'y' : y};


}
XMen.prototype = {
    figth: function (hero) {
        var _totalDamage = 0;
        var _specFeature = false;

        _totalDamage = this.power + this.damage + _totalDamage + (_specFeature = (Math.random() * 100 < this.chanceSpecDamage) ? this.specDamage : 0);
        hero.health = hero.health - _totalDamage;
        console.log(this.name, '(', this.health, ') атакував ', hero.name, '(', hero.health, '), нанесено шкоди', _totalDamage, ' пункти');

        // логування в історії двох героїв
        this.history.push(this.name + '('+ this.health + ') атакував ' + hero.name + '(', hero.health, '), нанесено шкоди'+ _totalDamage + ' пункти');
        hero.history.push(this.name + '('+ this.health + ') атакував ' + hero.name + '(', hero.health, '), нанесено шкоди'+ _totalDamage + ' пункти');

        //якщо відбувся суперудар і це був вампір
        if (_specFeature && this.hasVampBite) {

            this.health = this.health + _totalDamage + ((hero.health < 0) ? hero.health : 0);
            console.log(this.name, '(', this.health, ') напився крові і відновив ', _totalDamage + ((hero.health < 0) ? hero.health : 0), ' пунктів здоровя');

            // логування в історії двох героїв
            this.history.push(this.name + '('+ this.health + ') напився крові і відновив '+ (_totalDamage + ((hero.health < 0) ? hero.health : 0)) + ' пунктів здоровя');
            hero.history.push(this.name + '('+ this.health + ') напився крові і відновив '+ (_totalDamage + ((hero.health < 0) ? hero.health : 0)) + ' пунктів здоровя');
        };

        if (hero.health <= 0) {
            console.log(this.name, '(', this.health, ')знищив ', hero.name);

            // логування в історії двох героїв
            this.history.push(this.name + '(' + this.health + ')знищив ' + hero.name);
            hero.history.push(this.name + '(' + this.health + ')знищив ' + hero.name);

            // тут зменшуємо кількість героїв
            numberOfLivingHero--;

            // ініціюємо підвищення рівня
            this.levelUp();
        }
    },

    areaCheck: function () {

        var _x = 0;
        var _y = 0;
        var distance = 0;
        var logic = false;

        // прогон противників на можливість дотягнутися

        for (var i = 0; i<numberOfHero; i++) {
           if (gameMode == 'Deathmatch') {
               logic = (this != heroes[i]);
             //  console.log(logic, i);
           }
            if (gameMode == 'clanVsClan')
            {
                logic = (this.clan != heroes[i].clan);
               // console.log(logic, i);
            }

            if (logic) {

                _x = heroes[i].x;
                _y = heroes[i].y;
                distance = Math.pow((_x - this.x)*(_x - this.x) + (_y - this.y)*(_y - this.y),0.5);

                // console.log(this.name,heroes[i].name, distance );

                if (distance <= this.attackRange) {  // перевірка чи входить в область атаки
                    // Нарешті битися!!!!

                    if ((heroes[i].health > 0) && (this.health > 0)) {
                        this.figth(heroes[i]);
                        return true;    // передається для того, щоб герой знав що він у бою і нікуди не звалив.
                    }
                }
                else {
                    if (distance <= heroes[i].attackRange) {  // перевірка чи входить в область атаки
                        // по дорозі напали на персонажа !!

                        if ((heroes[i].health > 0) && (this.health > 0)) {
                            console.log(this.name,'попав в зону атаки', heroes[i].name);
                            heroes[i].figth(this);
                            // return true;    // не передається, герой отримав пілюлі і продовжує  рух.
                        }
                    }
                }

            }
        }
        return false;  // Ворогів не знайдено, спрацює метод moveTo
    },




    moveTo: function () {

        var _x, x1, x2, x3 = 0;
        var _y, y1, y2, y3 = 0;
        var x2 =0;
        var y2 = 0;
        var minD = 1000;
        var minI = -1;
        var _dirX = 0;
        var _dirY = 0;
        var distanceTo = 0;
        var cosineAngle = 0;
        var _point = {};

        // генерування довільного вектора напряму

        if (this.lookForTrouble == true && numberOfLivingHero>1) { // Логан або інші мачо має цю властивість, тому хоче переслідувати противника

            // цикл пошуку противників, має шукати найближчого противника і брати на нього напрямок

            for (var i = numberOfHero - 1; i >= 0; i--) {
                if (this != heroes[i] && heroes[i].health > 0) {
                    distanceTo = Math.pow((heroes[i].x - this.x) * (heroes[i].x - this.x) + (heroes[i].y - this.y) * (_y = heroes[i].y - this.y), 0.5);
                    if (minD > distanceTo) {
                        minD = distanceTo;
                        minI = i;
                    }
                }
            }
            if (minI >= 0) {
                _x = heroes[minI].x;
                _y = heroes[minI].y;
            }
        }

        // інші герої отримують довільний напрямок
        else {
            //console.log('Персонаж', this.name,' номер точки маршруту',this.PathMapStep);
            // _point = heroMovePath.call(this, this.PathMapStep);
            //
            //this.nextDestinationPoint.x = _x = _point.x;
            //this.nextDestinationPoint.y = _y = _point.y;
            //this.walkedAllWay = _point.isLast;


            if (this.nextDestinationPoint.x == this.x && this.nextDestinationPoint.y == this.y) {
                this.PathMapStep++;

                _point = heroMovePath.call(this, this.PathMapStep);
                //console.dir(_point);
                this.nextDestinationPoint.x = _x = _point.x;
                this.nextDestinationPoint.y = _y = _point.y;
                this.walkedAllWay = _point.isLast;
               // console.log('this.walkedAllWay',this.walkedAllWay);

                console.log(this.name, ' отримав новий машрут, прямує до [', _x, ',', _y, '] точка маршруту', this.PathMapStep);
            }
            else {
                _x = this.nextDestinationPoint.x;
                _y =this.nextDestinationPoint.y;
            }
        }


        // генерування векторe в напрямку противника
        // визначення кута між вектором і обєктом, вважаємо що швидкість обєкта - це гіпотенуза, для визначення координати нової точки треба мало побабратися
        //cosineAngle = vector.scalar(this.x, this.y, _x,_y) / (vector.module(this.x, this.y) * vector.module(_x,_y));
        //console.log(Math.acos(cosineAngle));
        //_dirX = this.speed * cosineAngle;
        //_dirY = this.speed * Math.sin(Math.acos(cosineAngle));


        //distanceTo = Math.pow((_x - this.x)*(_x - this.x) + (_y - this.y)*(_y - this.y),0.5);
        //console.log('Відстань до обєкта ',distanceTo);

        //_dirX = _x * this.speed/distanceTo;
        //_dirY = _y * this.speed/distanceTo;

        distanceTo = Math.pow((_x - this.x) * (_x - this.x) + (_y - this.y) * (_y - this.y), 0.5);
//console.log('выдстань до кінцевої точки',distanceTo);
        // вирахувати супротив вітру !!!!!!!! ы запистаи в windresistance дыстанц - резыстанц в умову



        // перевірка чи поряд нема противника, якщо є і ближче ніж крок, - стишити хід.
        //Якщо противник на ощній прямі або поряд в области ітаки наступним буде бій
        // для двох героїв працюэ потребує доробки і винесення в окремий метод.


            _dirX = (_x - this.x) * this.speed / distanceTo;
            _dirY = (_y - this.y) * this.speed / distanceTo;
          //  console.log('проміжкові',distanceTo, _dirX , _dirY);

            // Визначення косинуса між векторами покищо не пригодилось.. а крові попило...
            //cosineAngle = vector.scalar(this.x, this.y, _x,_y) / (vector.module(this.x, this.y) * vector.module(_x,_y));
            //console.log(Math.acos(cosineAngle));

        if (distanceTo > this.speed) {
            //this.x = this.x + Math.floor(_dirX);
            //this.y = this.y + Math.floor(_dirY);
            x2 = this.x + Math.round(_dirX);
            y2 = this.y + Math.round(_dirY);
            //console.log(this.x, this.y);

        }

        else {
            x2 = _x;
            y2 = _y;
        }

        _x = this.x; _y = this.y;
        x3 = this.x; y3 = this.y;

        var barrierOrEnemyDeteced = false;
        var path =[];

        // берем кожну цілу координату і здійснюємо перевірку на ворога і на перешкоду.


        while (!( Math.round(_x) == x2 &&  Math.round(_y) == y2)&&!barrierOrEnemyDeteced) {
            _x = _x + _dirX / this.speed;
            _y = _y + _dirY / this.speed;

            // координата змінилася
            //console.log('Кінцева ',x2,y2,' розкадровка шляху:',Math.round(_x),Math.round(_y),_x,_y)
            if ((x3 != Math.round(_x)) || (y3 != Math.round(_y))) {

                //якщо ячейка карти != 0  тобто є перешкода - запускаємо алгоритм обходу перешкод.

                if (myLocation.map[Math.round(_x)][Math.round(_y)] != 0) {
                    barrierOrEnemyDeteced = true;
                    console.log( this.name,this.x, this.y,' натрапив на перешкоду',[Math.round(_x)], [Math.round(_y)],' типу:', myLocation.map[Math.round(_x)][Math.round(_y)]);


                    // Алгоритм не працює... покишо..

                    //if (path = myLocation.findPath(this.x, this.y, x2, y2, this.speed)){
                    if (null) {
                        for (var i = path.lengthh-1; i>=0;i--) {
                            this.x = path[i].x;
                            this.y= path[i].y;
                            // на кожній координаті робимо перевірку...

                            if (this.areaCheck()){ //вороги знайдено далы йти нема змсісту
                                console.log('був бій ');

                                return false;
                            }  // герой зупиняэться, щоб не робив ще раз чек ареа
                        }
                    }

                }
                x3 = Math.round(_x);
                y3 = Math.round(_y);

            }
        }
        this.x = x2;
        this.y = y2;





// перевірка НЕвиходу за межі локації

        //this.x = (this.x >= myLocation.mapMaxX) ? myLocation.mapMaxX : ((this.x <= 0) ? 0 : this.x);
        //this.y = (this.y >= myLocation.mapMaxY) ? myLocation.mapMaxY : ((this.y <= 0) ? 0 : this.y);


        console.log(this.name, ' перемістився до [', this.x, ',', this.y, ']');
        this.history.push(this.name + ' перемістився до [' + this.x + ',' + this.y + '] зміщення по x:' + Math.floor(_dirX) + ' y:' + Math.floor(_dirY) + ' вектор direction: ' + Math.floor(_x) + ',' + Math.floor(_y));
        //console.log(this.name, ' координати [', _x, ',', _y,'] ');


    },

    levelUp: function () {
        this.level += 0.2;
        this.maxHealth = Math.round(this.maxHealth * this.level);
        this.power = Math.round(this.power * this.level);
        this.damage = Math.round(this.damage * this.level);
        this.specDamage = Math.round(this.specDamage * this.level);
        this.chanceSpecDamage = Math.round(this.chanceSpecDamage * this.level);
        console.log(this.name, '(', this.health, ')досяг нового рівня, покращивши свої характеристики макс.здаровя:', this.maxHealth,', сила:', this.power,', атака:', this.damage,', спец. атака:', this.specDamage);
        //console.log(this.name, '(', this.health, ')досяг нового рівня, покращивши свої характеристики макс.здаровя:', this.maxHealth,', сила:', this.power,', атака:', this.damage,', спец. атака:', this.specDamage);

    },

    regeneration: function () {
        var _regerHp = 0;

        if (this.canHealing && (this.health > 0) && (this.health < this.maxHealth)) {
            _regerHp = Math.round(this.healingMaxPoint * Math.random());

            if (_regerHp > 0) {
                this.health += _regerHp;
                this.health = (this.health < this.maxHealth) ? this.health : this.maxHealth;
                console.log(this.name, '(', this.health, ') зцілився на ', _regerHp, ' пунктів здоровя');

                this.history.push(this.name + '('+ this.health + ') зцілився на ' + _regerHp + ' пунктів здоровя');
            }
        }
    },

    // повторювався код пошуку найближчого противника... треба буде реалызувати
    findingNearest: function () {
    }
}

Vampires.prototype = Object.create(XMen.prototype);
Vampires.prototype.constructor = Vampires;









// функція по обрахуванню векторів

    function vector() {
    }
    vector.module = function (x, y) {
        return Math.pow(x * x + y * y, 0.5);
    };

    vector.scalar = function (x, y, x2, y2) {
        return x * x2 + y * y2;
    };


    /*
     vector.intersection  = function (hero1, hero2, x1, y1, x2, y2, x3, y3, x4, y4) {
     // http://www.cyberforum.ru/cpp-beginners/thread588383.html формулу перетину запозичено, протестовано, перероблено, але все даремно , не пригодилася.. покищо
     var	dx1 = x2 - x1;
     var	dy1 = y2 - y1;
     var	dx2 = x4 - x3;
     var	dy2 = y4 - y3;
     var	x = dy1 * dx2 - dy2 * dx1;
     var distance = 0;

     // перевірка паралельності, ділення на 0
     if ( (!x)|| (!dx2)){

     //  перевірити чи нема накладок відрізків

     distance = Math.max(x1, x2, x3, x4) - Math.min(x1, x2, x3, x4) + Math.max(y1, y2, y3, y4) - Math.min(y1, y2, y3, y4);

     if (distance <= (Math.abs(dx1) + Math.abs(dy1) + Math.abs(dx2) + Math.abs(dy2))) {
     console.log('Накладка є ');

     // э накладеня векторів, перевірити чи герой в разі ходу достає ворога

     if (_length => ( Math.abs(hero1.x - hero2.x) + Math.abs(hero1.y - hero2.y) )) {
     console.log(hero1.name,' атакує ',hero2.name);
     return	true;
     }
     }
     }

     return console.log('Не пересікаються', x,dx2);


     var	y = x3 * y4 - y3 * x4;
     vector.crossX = x = ((x1 * y2 - y1 * x2) * dx2 - y * dx1) / x;
     vector.crossY = y = (dy2 * x - y) / dx2;

     if ( ((x1 <= x && x2 >= x) || (x2 <= x && x1 >= x)) && ((x3 <= x && x4 >= x) || (x4 <= x && x3 >= x))) {
     console.log('Герої зустрінуться,  координати перетину х', x,' y', y);
     return	true;
     }
     else return	false;
     }
     */

//------------------------------------------------------------------------------
// Код виконання





    function checkHero(heroName) {

        var isFind;

        for (var i = heroes.length - 1; i >= 0; i--) {
            if (heroes[i].name == heroName) {
                isFind = heroes[i];
            }
        }
        return isFind;
    }

module.exports.start = function () {

    console.log('гра почалась')

    if (!startGame) {
       // var myLocation = new Location(800, 600, 0, 0, 10, 20, 0.2, 1, 0.2, 100, 4000);

        startGame = true;
        //console.log(" Гра почалася ", startGame);
        var gameSpedTimer = setInterval(function () {
                if (startGame) {

                    numberOfSteps++;

// Головна умова гри... поки не лишиться 1-го героя.
// Звичайно планується щоб билися не між собою а Клан на клан, але навряд чи встигну.. ще роути
                    console.log(numberOfHero);
                    if (numberOfLivingHero >= 2) {

                        for (var i = numberOfHero-1; i >= 0; i--) {
                            //console.log(i);
                            //console.dir(heroes[i]);

                            heroes[i].regeneration();

                            if (heroes[i].isFreeze && heroes[i].FreezeStepLeft == 0) {
                                heroes[i].isFreeze = false;
                                console.log(heroes[i].name, ' розаморозився');
                            }

                            if (heroes[i].isFreeze && heroes[i].FreezeStepLeft > 0) {
                                heroes[i].FreezeStepLeft--;
                                console.log(heroes[i].name, ' заморожений і пропускає хід');
                            }
                            else {

                                // Якщо живий і ні на кого не напав
                                if (heroes[i].health > 0 && !heroes[i].areaCheck()) {

                                    // Якщо живий після перевірки локації, і не дайшов до кінцевої точки
                                    if (heroes[i].health > 0 && !heroes[i].walkedAllWay) {
                                        heroes[i].moveTo();
                                        //console.log(heroes[i].walkedAllWay)

                                        // Якщо живий після пройденого шляху робить перевірку локації
                                        if (heroes[i].health > 0) heroes[i].areaCheck();
                                    }
                                }
                            }
                        }
                     //   console.log('Крок:', numberOfSteps);
                        console.log('Крок:', numberOfSteps);
                    }   //ocation.environmentChange();


                    else {
                        clearInterval(gameSpedTimer); // якщо героїв менше двох - зупинити
                       // якщо героїв менше двох - зупинити
                        gameSpedTimer = 0;
                    }
                }
               console.log('Персонажів: ',numberOfHero,' з них живі',numberOfLivingHero );
            }, myLocation.timeBetweenSteps);

        }
    }


//module.exports.hello = function() {
//    console.log('сий Хелло')
//};

module.exports.numberOfHero =  function(antiCaching) {
    return numberOfHero;
}

module.exports.numberOfLivingHero = function(antiCaching) {
    return numberOfLivingHero;
}

module.exports.gameMode = function(mode){
    console.log('Змынено режим гри на:',mode);
    return (gameMode = mode);
}

module.exports.freezeHero = function(heroName,command) {
    var isFind = checkHero(heroName);
    if (!isFind) {
        console.log('Була спроба змінити маршрут неіснуючого героя з іменем', heroName);
        return 'Sorry but there is no hero that has name:' + heroName;
    }
    else {
        isFind.isFreeze = command;
        iconsole.log(isFind.name, ', було заморожено:',command);
        return 'Hero: ' + isFind.name + command;
    }
}
        module.exports.setMoveTo = function(heroName,x,y) {
    var isFind = checkHero(heroName);

    if (!isFind) {
        console.log('Була спроба змінити маршрут неіснуючого героя з іменем',heroName);
        return 'Sorry but there is no hero that has name:' + heroName;
    }
    else {
        isFind.nextDestinationPoint.x = x;
        isFind.nextDestinationPoint.y = y;
        console.log('Змінено точку призначення',isFind.name,' тепер він прямує в :',isFind.nextDestinationPoint.x, isFind.nextDestinationPoint.y);
        return 'Hero: ' + isFind.name + ' recived new point of destenition';
    }
}

module.exports.setToFly = function(heroName,type) {
    var isFind = checkHero(heroName);
    if (!isFind) {
        console.log('Була спроба змінити можливості неіснуючого героя з імене', heroName);
        return 'Sorry but there is no hero that has name:' + heroName;
    }
    else {

        if (isFind.canFly) {
            isFind.isFly = type;
            console.log(heroName, ' змінив режим польоту на: ', type);
            return heroName + 'change type of Fly status to : ' + type;
            console.dir(isFind);
        }
        else
            console.log(heroName, ' народжений повзати літати не буде...');
        return 'Sorry but hero ' + heroName + ' dont has ability for fly';
    }
}

module.exports.heroCreate = function(name, clan, x, y) {

//console.log(numberOfLivingHero);
    var created = false;
    // console.log(name, name.length,(name == 'Wolverine') );
                                                      //XMen(clan, name, level, features, hairСolor, beard, tits, sex, health, power, attackRange, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, canHealing, healingMaxPoint, hasVampBite,lookForTrouble, x, y) {
    if (name == 'Wolverine') {
        heroes.push(new XMen('X-Men', 'Wolverine', 1, 'healing factor, six retractable claws', 'black', 'small', 'no', 'man', 100, 2, 4, 10, 20, 70, 0, 10, false, 0, false, false, true, false, false, false, true, 15, false, true, x, y));
        created = true;
    }


    if (name == 'Sweetdeath') {
        heroes.push(new Vampires('Vampires', 'Sweetdeath', 1, 'invisibility,can fly, regeneration bites', 'carrot', 'no', 'big', 'woman', 150, 2, 6, 15, 10, 30, 0, 15, true, 20, true, false, true, false, false, false, true, 7, true, false, x, y));
        created = true;
    }

    if (name == 'Dracula') {
        heroes.push(new Vampires('Vampires', 'Sweetdeath', 1, 'invisibility,can fly, regeneration bites', 'carrot', 'no', 'no', 'man', 180, 3, 6, 17, 10, 30, 0, 15, true, 20, true, false, true, false, false, false, true, 7, true, false, x, y));
        created = true;
    }

    if (name == 'MegaVamp') {
        heroes.push(new Vampires('Vampires', 'Sweetdeath', 1, 'invisibility,can fly, regeneration bites', 'carrot', 'no', 'no', 'man', 200, 3, 6, 20, 10, 30, 0, 15, true, 20, true, false, true, false, false, false, true, 7, true, false, x, y));
        created = true;
    }


    if (!created) {


        created = true;

        var defObject = defSet(name, clan, +x, +y);

        if (clan == 'X-Men') {
            console.log('Це новенький Хмен');
            heroes.push(new XMen(defObject.clan, defObject.name, defObject.level, defObject.features, defObject.hairСolor, defObject.beard, defObject.tits, defObject.sex, defObject.health, defObject.power, defObject.attackRange, defObject.damage, defObject.specDamage, defObject.chanceSpecDamage, defObject.defence, defObject.speed, defObject.canFly, defObject.flySpeed, defObject.canBeInvisible, defObject.invisible, defObject.canJump, defObject.canTeleport, defObject.canShoot, defObject.canFreeze, defObject.canHealing, defObject.healingMaxPoint, defObject.hasVampBite, defObject.lookForTrouble, defObject.x, defObject.y));
        }

        if (clan == 'Vampires') {
            console.log('Це новенький Вампір');
            heroes.push(new Vampires(defObject.clan, defObject.name, defObject.level, defObject.features, defObject.hairСolor, defObject.beard, defObject.tits, defObject.sex, defObject.health, defObject.power, defObject.attackRange, defObject.damage, defObject.specDamage, defObject.chanceSpecDamage, defObject.defence, defObject.speed, defObject.canFly, defObject.flySpeed, defObject.canBeInvisible, defObject.invisible, defObject.canJump, defObject.canTeleport, defObject.canShoot, defObject.canFreeze, defObject.canHealing, defObject.healingMaxPoint, defObject.hasVampBite, defObject.lookForTrouble, defObject.x, defObject.y));
        }
    }
    if (created) {
        numberOfHero = heroes.length;
        numberOfLivingHero++;

    }
    console.dir(heroes[heroes.length - 1]);

    }
