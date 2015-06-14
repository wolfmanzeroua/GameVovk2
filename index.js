
var heroMovePath = require('./modules/classPathMap.js');
var defSet = require('./modules/defaultClassSettings.js');
var myLocation = require('./modules/location.js');

var personsHistoryDB = require('./modules/mongoDbClient.js');
var personsDB = require('./modules/mongooseDBClient.js');

var initHeroOnMap = require('./routes/socketRoutes.js').initHero;
var moveHeroOnMap = require('./routes/socketRoutes.js').moveHeroOnMap;


var gameSpedTimer=0;
var numberOfLivingHero = 0;
var numberOfHero = 0;
var numberOfSteps = 0;
var gameMode = "Deathmatch";
var heroes = [];

//var myLocation = new Location(800, 600, 0, 0, 10, 20, 0.2, 1, 0.2, 100, 4000);
//myLocation.barriersInit(0);
// ініціалізація барєрів, самі барєри описані в цій же функції


var startGame = false;



// клас потомок
function Vampires(clan, name, level, features, hairColor, beard, tits, sex, health, power, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, hasVampBite, x, y) {
    XMen.apply(this, arguments);
}

// клас нащалок
function XMen(clan, name, level, features, hairColor, beard, tits, sex, health, power, attackRange, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, canHealing, healingMaxPoint, hasVampBite,lookForTrouble, x, y, heroID) {
    this.clan = clan;
    this.name = name;
    this.features = features;
    this.hairСolor = hairColor;
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
    this.freezeStepLeft = 0;


    // Спеціальний навик деяких істот відновлюватися
    this.canHealing = canHealing;
    this.healingMaxPoint = healingMaxPoint;

    // Спеціальний навик вампіра, якщо тру - дає можливість відновити здоровся за рахунок нанесеного урона
    this.hasVampBite = hasVampBite;

    // рівень героя. після перемоги підвищується і запускається метод levelUp()
    this.level = level;
    this.lookForTrouble = lookForTrouble;

    // масив для збереження історії героя
    //this.history = [];
    this.x = x;
    this.y = y;
    this.PathMapStep = 0;
    this.walkedAllWay = false;
    this.nextDestinationPointX = x;
    this.nextDestinationPointY = y;
    this.caсhePath = [];            /// для кешування шляху обходу
    this.heroID = heroID;


}
XMen.prototype = {

    figth: function (hero) {
        if (this.isFreeze) {

        }
        else {
            var _totalDamage = 0;
            var _specFeature = false;

            _totalDamage = this.power + this.damage + _totalDamage + (_specFeature = (Math.random() * 100 < this.chanceSpecDamage) ? this.specDamage : 0);
            hero.health = hero.health - _totalDamage;
            console.log(this.showHeroInfo() +' атакував ' + hero.showHeroInfo() +'), нанесено шкоди '+ _totalDamage + ' пункти');

            // логування в історії двох героїв

            //this.history.push(this.showHeroInfo() +' атакував ' + hero.showHeroInfo() +'), нанесено шкоди '+ _totalDamage + ' пункти');
            //hero.history.push(this.name + '('+ this.health + ') атакував ' + hero.name + '(', hero.health, '), нанесено шкоди'+ _totalDamage + ' пункти');
            personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() +' атакував ' + hero.showHeroInfo() +'), нанесено шкоди '+ _totalDamage + ' пункти');
            personsHistoryDB.personsAddLog(hero.heroID, this.showHeroInfo() +' атакував ' + hero.showHeroInfo() +'), нанесено шкоди '+ _totalDamage + ' пункти');

            //якщо відбувся суперудар і це був вампір
            if (_specFeature && this.hasVampBite) {

                this.health = this.health + _totalDamage + ((hero.health < 0) ? hero.health : 0);
                console.log(this.showHeroInfo() + ' напився крові і відновив ' + _totalDamage + ((hero.health < 0) ? hero.health : 0) + ' пунктів здоровя');

                // логування в історії двох героїв

                //this.history.push(this.showHeroInfo() + ' напився крові і відновив '+ (_totalDamage + ((hero.health < 0) ? hero.health : 0)) + ' пунктів здоровя');
                //hero.history.push(this.showHeroInfo() + ' напився крові і відновив '+ (_totalDamage + ((hero.health < 0) ? hero.health : 0)) + ' пунктів здоровя');
                personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() + ' напився крові і відновив '+ (_totalDamage + ((hero.health < 0) ? hero.health : 0)) + ' пунктів здоровя');
                personsHistoryDB.personsAddLog(hero.heroID, this.showHeroInfo() + ' напився крові і відновив '+ (_totalDamage + ((hero.health < 0) ? hero.health : 0)) + ' пунктів здоровя');

            }

            if (hero.health <= 0) {
                console.log(this.showHeroInfo() +' знищив ' + hero.name);

                // логування в історії двох героїв
                //this.history.push(this.showHeroInfo() +' знищив ' + hero.name);
                //hero.history.push(this.name + '(' + this.health + ')знищив ' + hero.name);

                personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() +' знищив ' + hero.name);
                personsHistoryDB.personsAddLog(hero.heroID, this.showHeroInfo() +' знищив ' + hero.name);

                // тут зменшуємо кількість героїв
                numberOfLivingHero--;

                // ініціюємо підвищення рівня
                this.levelUp();
            }
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
                            console.log(this.showHeroInfo() +'попав в зону атаки', heroes[i].showHeroInfo());
                            heroes[i].figth(this);

                            // відправка логів в БД
                            personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() +'попав в зону атаки', heroes[i].showHeroInfo());
                            personsHistoryDB.personsAddLog(heroes[i].heroID, this.showHeroInfo() +'попав в зону атаки', heroes[i].showHeroInfo());

                            // return true;    // не передається, герой отримав пілюлі і продовжує  рух.
                        }
                    }
                }

            }
        }
        return false;  // Ворогів не знайдено, спрацює метод moveTo
    },

    showHeroInfo: function() {
        return this.name + '\u2764' + this.health + ' (' + this.x+ ',' +this.y + ')';
    },




    moveTo: function () {

        var _x, x1, x2, x3 = 0;
        var _y, y1, y2, y3 = 0;
        var x2 = 0;
        var y2 = 0;
        var minD = 1001;
        var minI = -1;
        var _dirX = 0;
        var _dirY = 0;
        var distanceTo = 0;
        var cosineAngle = 0;
        var _point = {};
        var logic = gameMode == 'Deathmatch';

        var indexOfthisHero = heroes.indexOf(this);


        if (this.lookForTrouble == true && numberOfLivingHero > 1) { // Логан або інші мачо має цю властивість, тому хоче переслідувати противника
            console.log('lookForTrouble in working');

            // цикл пошуку противників, має шукати найближчого противника і брати на нього напрямок

            for (var i = heroes.length - 1; i >= 0; i--) {
                logic = logic ? true : this.clan != heroes[i].clan;

                console.log(logic);
                if (this != heroes[i] && heroes[i].health > 0 && logic) {
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
                //   console.log('Персонаж',this.name,' взяв курс на,',heroes[minI].name);
            }
        }

        // інші герої отримують довільний напрямок
        else {
            if (this.caсhePath.length > 0) {
                console.log(this.showHeroInfo(), ' У героя в кеші є ще точки шляху', this.caсhePath);
                personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() +' бере координати з свого кеша обходу перешкод');
                for (var i = this.caсhePath.length - 1, j = 0; i >= 0 && j < this.speed; i--, j++) {

                    this.x = this.caсhePath[i].x;
                    this.y = this.caсhePath[i].y;

                    this.caсhePath.pop();

                    moveHeroOnMap(this, indexOfthisHero);
                    // на кожній координаті робимо перевірку...
                    console.log(this.showHeroInfo() + ' перемістився в обході з свого кеша');
                    //personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() +' перемістився в обході з свого кеша');

                    if (this.areaCheck()) { //вороги знайдено далі йти нема змсісту
                        console.log('при обході перешкоди відбувся бій');

                        return false;
                    }  // герой зупиняэться, щоб не робив ще раз чек ареа
                }
                // герой пройшов шлях із кеша і далі нічого йти
                return false;
            }

            if (this.nextDestinationPointX == this.x && this.nextDestinationPointY == this.y) {
                this.PathMapStep++;

                _point = heroMovePath.call(this, this.PathMapStep);
                //console.dir(_point);
                this.nextDestinationPointX = _x = _point.x;
                this.nextDestinationPointY = _y = _point.y;
                this.walkedAllWay = _point.isLast;
                // console.log('this.walkedAllWay',this.walkedAllWay);

                // якщо вже кінцева точка - припинити обрахунок
                if (this.walkedAllWay) {
                    console.log(this.showHeroInfo() + ' дійшов до кінцевої точки точка Дефолтного маршруту №' + this.PathMapStep);
                    personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() + ' дійшов до кінцевої точки точка Дефолтного маршруту №' + this.PathMapStep);
                    return;
                }

                console.log(this.name, ' отримав новий машрут, прямує до [', _x, ',', _y, '] точка маршруту', this.PathMapStep);
                personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() + ' дійшов до кінцевої точки і отримав новий машрут, прямує до [' + _x + ',' + _y + '] точка маршруту №' + this.PathMapStep);
            }
            else {
                _x = this.nextDestinationPointX;
                _y = this.nextDestinationPointY;
            }
        }

        distanceTo = Math.pow((_x - this.x) * (_x - this.x) + (_y - this.y) * (_y - this.y), 0.5);

        _dirX = (_x - this.x) * this.speed / distanceTo;
        _dirY = (_y - this.y) * this.speed / distanceTo;

        if (distanceTo > this.speed) {
            x2 = this.x + Math.round(_dirX);
            y2 = this.y + Math.round(_dirY);
            //console.log(this.x, this.y);

        }

        else {
            x2 = _x;
            y2 = _y;
        }

        _x = this.x;
        _y = this.y;
        x3 = this.x;
        y3 = this.y;

        var barrierOrEnemyDetected = false;
        //var path = [];

        // берем кожну цілу координату і здійснюємо перевірку на ворога і на перешкоду.


        while (!( Math.round(_x) == x2 && Math.round(_y) == y2) && !barrierOrEnemyDetected) {
            _x = _x + _dirX / this.speed;
            _y = _y + _dirY / this.speed;
//console.log(_x,_y,x3,y3);
            // координата змінилася
            //console.log('Кінцева ',x2,y2,' розкадровка шляху:',Math.round(_x),Math.round(_y),_x,_y)
            if ((x3 != Math.round(_x)) || (y3 != Math.round(_y))) {

                //перевірка на наявність  ворга
                if (this.areaCheck()) { //вороги знайдено далі йти нема змісту
                    console.log('при обході перешкоди відбувся бій');

                    return false;
                }  // герой зупиняється, щоб не робив ще раз чек ареа

                //якщо ячейка карти != 0  тобто є перешкода - запускаємо алгоритм обходу перешкод.
                if (myLocation.map[Math.round(_x)][Math.round(_y)] != 0) {
                    barrierOrEnemyDetected = true;
                    console.log(this.showHeroInfo() + ' натрапив на перешкоду', [Math.round(_x)], [Math.round(_y)], ' типу:', myLocation.map[Math.round(_x)][Math.round(_y)]);
                    personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo()  + ' натрапив на перешкоду' + Math.round(_x)+ ',' + Math.round(_y) + ' типу:' + myLocation.map[Math.round(_x)][Math.round(_y)]);

                    // Алгоритм не працює... покишо..
// Глюк найдено.. наступна точка  маршруту попадала у перешкоду ........ :))
                    if (this.caсhePath = myLocation.findPath(this.x, this.y, this.nextDestinationPointX, this.nextDestinationPointY, this.speed)) {

                        // console.log('Урра--- отримав масив', path.length-1, path[10].x,path[10].y )
                        //          if (null)
                        //        barrierOrEnemyDetected =true;

                        for (var i = this.caсhePath.length - 1, j = 0; i >= 0 && j < this.speed; i--, j++) {

                            this.x = this.caсhePath[i].x;
                            this.y = this.caсhePath[i].y;

                            this.caсhePath.pop();

                            moveHeroOnMap(this, indexOfthisHero);
                            // на кожній координаті робимо перевірку...
                            console.log(this.showHeroInfo() + ' перемістився в обході');
                            personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() + ' перемістився в обході');

                            if (this.areaCheck()) { //вороги знайдено далі йти нема змісту
                                console.log('при обході перешкоди відбувся бій');

                                return false;
                            }  // герой зупиняється, щоб не робив ще раз чек ареа
                        }
                        // якщо шляху не знайдено.. тупік
                    }
                    return false;
                    // якщо шлях не знайдено завершуэмо ходьбу потребує доробки логыки !!!!!!!!!!!!!!!!!!!!!

                }
                //x3 = Math.round(_x);
                //y3 = Math.round(_y);

            }
        }
        // якщо барэрыв не було в не було ворога = пролітаємо відрізок
        if (!barrierOrEnemyDetected) {
            this.x = x2;
            this.y = y2;
            console.log(this.showHeroInfo() + ' перемістився');
            //this.history.push(this.showHeroInfo() + ' перемістився зміщення по x:' + Math.floor(_dirX) + ' y:' + Math.floor(_dirY) + ' вектор direction: ' + Math.floor(_x) + ',' + Math.floor(_y));
            personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() +  ' перемістився зміщення по x:' + Math.floor(_dirX) + ' y:' + Math.floor(_dirY));
        }

// перевірка НЕвиходу за межі локації

        //this.x = (this.x >= myLocation.mapMaxX) ? myLocation.mapMaxX : ((this.x <= 0) ? 0 : this.x);
        //this.y = (this.y >= myLocation.mapMaxY) ? myLocation.mapMaxY : ((this.y <= 0) ? 0 : this.y);

    },

    levelUp: function () {
        this.level += 0.2;
        this.maxHealth = this.maxHealth +  Math.round(this.maxHealth * 0.2);
        this.power = this.power + Math.round(this.power * 0.2);
        this.damage = this.damage + Math.round(this.damage * 0.2);
        this.specDamage = this.specDamage + Math.round(this.specDamage * 0.2);
        this.chanceSpecDamage = this.chanceSpecDamage + Math.round(this.chanceSpecDamage * 0.2);
        console.log(this.showHeroInfo() +'досяг нового рівня, покращивши свої характеристики макс.здаровя:', this.maxHealth,', сила:', this.power,', атака:', this.damage,', спец. атака:', this.specDamage);
        //console.log(this.name, '(', this.health, ')досяг нового рівня, покращивши свої характеристики макс.здаровя:', this.maxHealth,', сила:', this.power,', атака:', this.damage,', спец. атака:', this.specDamage);
        personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() + ' досяг нового рівня, покращивши свої характеристики макс.здаровя: ' + this.maxHealth +', сила: ' + this.power + ', атака: ' + this.damage +', спец. атака: ' + this.specDamage);
    },

    regeneration: function () {
        var regenerHp = 0;

        if (this.canHealing && (this.health > 0) && (this.health < this.maxHealth)) {
            regenerHp = Math.round(this.healingMaxPoint * Math.random());

            if (regenerHp > 0) {
                this.health += regenerHp;
                this.health = (this.health < this.maxHealth) ? this.health : this.maxHealth;
                console.log(this.showHeroInfo() + ' зцілився на '+ regenerHp + ' пунктів здоровя');

                //this.history.push(this.showHeroInfo() + 'зцілився на ' + regenerHp + ' пунктів здоровя');
                personsHistoryDB.personsAddLog(this.heroID, this.showHeroInfo() + 'зцілився на ' + regenerHp + ' пунктів здоровя');
            }
        }
    }


};

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




function checkHero(heroName) {

    var isFind;

    for (var i = heroes.length - 1; i >= 0; i--) {
        if (heroes[i].name == heroName) {
            isFind = heroes[i];
        }
    }
    return isFind;
}

function start (mode) {


    function gameStep(){
        // console.log('*********************** ',gameSpedTimer);
        if (startGame) {

            numberOfSteps++;

// Головна умова гри... поки не лишиться 1-го героя.
// Звичайно планується щоб билися не між собою а Клан на клан, але навряд чи встигну.. ще роути
            // console.log(numberOfHero);
            if (numberOfLivingHero >= 1) {

                for (var i = numberOfHero-1; i >= 0; i--) {
                    moveHeroOnMap(heroes[i],i);
                    personsDB.updatePerson(heroes[i]);

                    if (heroes[i].health > 0) {
                        //console.log(i);
                        //console.dir(heroes[i]);

                        heroes[i].regeneration();

                        if (heroes[i].isFreeze && heroes[i].freezeStepLeft == 0) {
                            heroes[i].isFreeze = false;
                            console.log(heroes[i].showHeroInfo(),') розморозився');
                            personsHistoryDB.personsAddLog(heroes[i].heroID, heroes[i].showHeroInfo(),') розморозився');
                        }

                        if (heroes[i].isFreeze && heroes[i].freezeStepLeft > 0) {
                            heroes[i].freezeStepLeft--;
                            // console.log(heroes[i].name, ' \u2764',heroes[i].helth,'(',heroes[i].x,heroes[i].y,') заморожений і пропускає хід');
                            console.log(heroes[i].showHeroInfo() + 'заморожений і пропускає хід');
                            personsHistoryDB.personsAddLog(heroes[i].heroID,heroes[i].showHeroInfo() + 'заморожений і пропускає хід');

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
                                moveHeroOnMap(heroes[i],i);
                                personsDB.updatePerson(heroes[i]);
                            }
                        }
                    }
                }

                console.log('Крок:', numberOfSteps);
            }   //ocation.environmentChange();



            else {
                // clearInterval(gameSpedTimer); // якщо героїв менше двох - зупинити
                // якщо героїв менше двох - зупинити
                // gameSpedTimer = 0;
            }
        }
        console.log('Персонажів: ',numberOfHero,' з них живі',numberOfLivingHero );

    }

    if ( mode == 2) {
        console.log('Встановлено нову швидкість гри: ',myLocation.timeBetweenSteps);
        clearInterval(gameSpedTimer);
        gameSpedTimer = setInterval(function () {
            gameStep();
            //   console.log('Таймер2:',gameSpedTimer._idleTimeout);
            //   console.log(' тик так',myLocation.timeBetweenSteps);

        }, myLocation.timeBetweenSteps);
        // var myLocation = new Location(800, 600, 0, 0, 10, 20, 0.2, 1, 0.2, 100, 4000);
    } else {
        startGame = true;
        //console.log(" Гра почалася ", startGame);

        gameSpedTimer = setInterval(function () {
            gameStep();
            //   console.log('Таймер1:',gameSpedTimer._idleTimeout);
            //   console.log(' тик так', myLocation.timeBetweenSteps);
        }, myLocation.timeBetweenSteps);

    }


}


//module.exports.hello = function() {
//    console.log('сий Хелло')
//};

module.exports.numberOfHero =  function(antiCaching) {
    return numberOfHero;
};

module.exports.numberOfLivingHero = function(antiCaching) {
    return numberOfLivingHero;
};

module.exports.gameMode = function(mode){
    console.log('Змінено режим гри на:',mode);
    return (gameMode = mode);
};

module.exports. setTimeBetweenSteps = function(timeBetweenSteps){
    myLocation.timeBetweenSteps = timeBetweenSteps;

    if (startGame) { start(2);
        return 'Змінено швидкість гри на: ' + myLocation.timeBetweenSteps;
    }
    return   'Змінено швидкість гри на:'+ myLocation.timeBetweenSteps;


};

module.exports.freezeHero = function(heroName,command) {
    var isFind = checkHero(heroName);
    if (!isFind) {
        console.log('Була спроба змінити маршрут неіснуючого героя з іменем', heroName);
        return 'Sorry but there is no hero that has name:' + heroName;
    }
    else {
        if (command == 'toFreeze') {
            isFind.isFreeze = true;
            isFind.freezeStepLeft = 1000;
            console.log(isFind.name, ', було заморожено___________________________________!!!!');
            personsHistoryDB.personsAddLog(isFind.heroID, ' Hero: ' + isFind.name + ' було заморожено');
            personsDB.updatePerson(isFind);
            return ' Hero: ' + isFind.name + ' було заморожено';
        }
        else {
            isFind.isFreeze = false;
            isFind.freezeStepLeft = 0;
            console.log(isFind.name, ', було розможено________________________');
            personsHistoryDB.personsAddLog(isFind.heroID, ' Hero: ' + isFind.name + ' було розморожено');
            personsDB.updatePerson(isFind);
            return 'Hero: ' + isFind.name + ' було розморожено'+ command;
        }
    }

};
module.exports.setMoveTo = function(heroName,x,y) {
    var isFind = checkHero(heroName);

    if (!isFind) {
        console.log('Була спроба змінити маршрут неіснуючого героя з іменем ',heroName);
        return 'Sorry but there is no hero that has name:' + heroName;
    }
    else {
        if (myLocation.validatePoint(x,y) > 0) {
            return 'Sorry but point with these coordinates corresponds obstacle type ' + myLocation.validatePoint(x,y);
        }
        else {
            isFind.nextDestinationPointX = x;
            isFind.nextDestinationPointY = y;
            isFind.walkedAllWay = false;
            console.log('Змінено точку призначення',isFind.name,' тепер він прямує в :',isFind.nextDestinationPointX, isFind.nextDestinationPointY);
            personsHistoryDB.personsAddLog(isFind.heroID, 'Змінено точку призначення ' + isFind.name + ' тепер він прямує в : ' + isFind.nextDestinationPointX + ',' + isFind.nextDestinationPointY);
            personsDB.updatePerson(heroes[heroes.length-1]);
            return 'Hero: ' + isFind.name + ' recived new point of destenition';
        }
    }
};

module.exports.setToFly = function(heroName,type) {
    var isFind = checkHero(heroName);
    if (!isFind) {
        console.log('Була спроба змінити можливості неіснуючого героя з іменем ', heroName);
        return 'Sorry but there is no hero that has name: ' + heroName;
    }
    else {

        if (isFind.canFly) {
            isFind.isFly = type;

            console.log(heroName, ' змінив режим польоту на: ', type);
            return heroName + ' change type of Fly status to : ' + type;
            //console.dir(isFind);
        }
        else
            console.log(heroName, ' народжений повзати літати не буде...');
        return 'Sorry but hero ' + heroName + ' dont has ability for fly';
    }
};

module.exports.newSettings = function(newSettingsOfHero) {
    var heroName = newSettingsOfHero.name;
    var isFind = checkHero(heroName);
    var logChanges='';
    if (!isFind) {
        console.log('Була спроба змінити маршрут неіснуючого героя з іменем', heroName);
        return 'Sorry but there is no hero that has name:' + heroName;
    }
    else {

        var logic = 0;
        if ('nextDestinationPointX' in newSettingsOfHero && myLocation.validatePoint(newSettingsOfHero.nextDestinationPointX, newSettingsOfHero.nextDestinationPointY) > 0) {
            return 'Sorry but point with these coordinates corresponds obstacle type ' + myLocation.validatePoint(newSettingsOfHero.nextDestinationPointX, newSettingsOfHero.nextDestinationPointY);
        }
        else {
            for (var k in newSettingsOfHero) {

                // преобразуватор типів відповідно до типу паттерна . на ці граблі сьогодні не наступимо :)

                if (typeof (isFind[k]) == 'number') {
                    isFind[k] = +newSettingsOfHero[k];
                    logic = 1;
                }
                if (typeof (isFind[k]) == 'boolean') {
                    isFind[k] = !!newSettingsOfHero[k];
                    logic = 1;
                }
                if (logic == 0) isFind[k] = newSettingsOfHero[k];

                // тру або фалсе - розморозити...
                if (k == 'isFreeze')  isFind.freezeStepLeft = isFind[k] ? 1000 : 0;
                if (k == 'nextDestinationPointX') {
                    isFind.walkedAllWay = false;
                    isFind.caсhePath = [];
                }


                //logChanges += ' ' + k + ' = ' + isFind[k] + typeof (isFind[k]);
                logChanges += ' ' + k + ' = ' + isFind[k];

            }
            console.dir(isFind);
            personsHistoryDB.personsAddLog(isFind.heroID, isFind.name + ' received next changes : ' + logChanges);
            personsDB.updatePerson(isFind);
            return heroName + ' received next changes : ' + logChanges;
        }
    }
};

module.exports.heroCreate = function(savedHero) {

    if (savedHero.defaultProperty) {
        var name = savedHero.name;
        var clan = savedHero.clan;
        var x = savedHero.x;
        var y = savedHero.y;

//console.log(numberOfLivingHero);
        var created = false;
        if (myLocation.validatePoint(x, y) > 0) {
            console.log('Sorry but point with these coordinates corresponds obstacle type ' + myLocation.validatePoint(x, y));
            return {err: 'Sorry but point with these coordinates corresponds obstacle type ' + myLocation.validatePoint(x, y)};
        }
        else {
            console.log('Validate Hero passed');
            // console.log(name, name.length,(name == 'Wolverine') );
            //XMen(clan, name, level, features, hairСolor, beard, tits, sex, health, power, attackRange, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, canHealing, healingMaxPoint, hasVampBite,lookForTrouble, x, y) {
            if (name == 'Wolverine') {
                heroes.push(new XMen('X-Men', 'Wolverine', 1, 'healing factor, six retractable claws', 'black', 'small', 'no', 'man', 100, 2, 4, 10, 20, 70, 0, 10, false, 0, false, false, true, false, false, false, true, 15, false, true, x, y, heroes.length));
                created = true;
                console.log('Create Wolverine');
                console.log(heroes[heroes.length - 1]);

            }


            if (name == 'Sweetdeath') {
                heroes.push(new Vampires('Vampires', 'Sweetdeath', 1, 'invisibility,can fly, regeneration bites', 'carrot', 'no', 'big', 'woman', 150, 2, 6, 15, 10, 30, 0, 15, true, 20, true, false, true, false, false, false, true, 7, true, false, x, y, heroes.length));
                created = true;
                console.log('Create Sweetdeath');
                console.log(heroes[heroes.length - 1]);
            }

            if (name == 'Dracula') {
                heroes.push(new Vampires('Vampires', 'Dracula', 1, 'invisibility,can fly, regeneration bites', 'carrot', 'no', 'no', 'man', 180, 3, 6, 17, 10, 30, 0, 15, true, 20, true, false, true, false, false, false, true, 7, true, false, x, y, heroes.length));
                created = true;
                console.log('Create Dracula');
                console.log(heroes[heroes.length - 1]);
            }

            if (name == 'MegaVamp') {
                heroes.push(new Vampires('Vampires', 'MegaVamp', 1, 'invisibility,can fly, regeneration bites', 'carrot', 'no', 'no', 'man', 200, 3, 6, 20, 10, 30, 0, 15, true, 20, true, false, true, false, false, false, true, 7, true, false, x, y, heroes.length));
                created = true;
                console.log('Create MegaVamp ');
                console.log(heroes[heroes.length - 1]);
            }


            if (!created) {


                created = true;

                var defObject = defSet(name, clan, +x, +y);

                if (clan == 'X-Men') {
                    heroes.push(new XMen(defObject.clan, defObject.name, defObject.level, defObject.features, defObject.hairСolor, defObject.beard, defObject.tits, defObject.sex, defObject.health, defObject.power, defObject.attackRange, defObject.damage, defObject.specDamage, defObject.chanceSpecDamage, defObject.defence, defObject.speed, defObject.canFly, defObject.flySpeed, defObject.canBeInvisible, defObject.invisible, defObject.canJump, defObject.canTeleport, defObject.canShoot, defObject.canFreeze, defObject.canHealing, defObject.healingMaxPoint, defObject.hasVampBite, defObject.lookForTrouble, defObject.x, defObject.y, heroes.length));
                    console.log('Oh... Its a new  Х-Men  with default properties');
                    console.log(heroes[heroes.length - 1]);

                }

                if (clan == 'Vampires') {
                    heroes.push(new Vampires(defObject.clan, defObject.name, defObject.level, defObject.features, defObject.hairСolor, defObject.beard, defObject.tits, defObject.sex, defObject.health, defObject.power, defObject.attackRange, defObject.damage, defObject.specDamage, defObject.chanceSpecDamage, defObject.defence, defObject.speed, defObject.canFly, defObject.flySpeed, defObject.canBeInvisible, defObject.invisible, defObject.canJump, defObject.canTeleport, defObject.canShoot, defObject.canFreeze, defObject.canHealing, defObject.healingMaxPoint, defObject.hasVampBite, defObject.lookForTrouble, defObject.x, defObject.y, heroes.length));
                    console.log('Oh... Its a new  Vampires with default properties ');
                    console.log(heroes[heroes.length - 1]);

                }
            }
        }
    }
    else {
        if (savedHero.clan == 'X-Men') {
            heroes.push(new XMen(savedHero.clan, savedHero.name, /*savedHero.level */1, savedHero.features, savedHero.hairСolor, savedHero.beard, savedHero.tits, savedHero.sex, savedHero.health, savedHero.power, savedHero.attackRange, savedHero.damage, savedHero.specDamage, savedHero.chanceSpecDamage, /*savedHero.defence */ 0, savedHero.speed, savedHero.canFly, savedHero.flySpeed, savedHero.canBeInvisible, savedHero.invisible, savedHero.canJump, savedHero.canTeleport, savedHero.canShoot, savedHero.canFreeze, savedHero.canHealing, savedHero.healingMaxPoint, savedHero.hasVampBite, savedHero.lookForTrouble, savedHero.x, savedHero.y, heroes.length));
            console.log('Oh... Its a new  Х-Men with individual properties ');
            console.log(heroes[heroes.length - 1]);

        }

        if (savedHero.clan == 'Vampires') {
            heroes.push(new Vampires(savedHero.clan, savedHero.name,  /*savedHero.level */1, savedHero.features, savedHero.hairСolor, savedHero.beard, savedHero.tits, savedHero.sex, savedHero.health, savedHero.power, savedHero.attackRange, savedHero.damage, savedHero.specDamage, savedHero.chanceSpecDamage, /*savedHero.defence */ 0, savedHero.speed, savedHero.canFly, savedHero.flySpeed, savedHero.canBeInvisible, savedHero.invisible, savedHero.canJump, savedHero.canTeleport, savedHero.canShoot, savedHero.canFreeze, savedHero.canHealing, savedHero.healingMaxPoint, savedHero.hasVampBite, savedHero.lookForTrouble, savedHero.x, savedHero.y, heroes.length));
            console.log('Oh... Its a new  Vampires  with individual properties ');
            console.log(heroes[heroes.length - 1]);

        }

    }

    numberOfHero = heroes.length;
    numberOfLivingHero++;

    initHeroOnMap(heroes[heroes.length-1],heroes.length-1);
    personsHistoryDB.personsSave(heroes[heroes.length-1].heroID,'Hero '+ heroes[heroes.length-1].name +' was succesfull created ');
    personsDB.savePerson(heroes[heroes.length-1]);
    return { text: 'Hero '+ heroes[heroes.length-1].name +' was succesfull created '};


    // console.dir(heroes[heroes.length - 1]);
};

module.exports.start= start;

module.exports.heroArray = function(antiCaching) {
    console.log(heroes);
    if (heroes) return heroes;
    if (!heroes) return 1;


};


