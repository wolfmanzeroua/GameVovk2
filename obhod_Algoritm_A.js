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
        }

        if (hero.health <= 0) {
            console.log(this.name, '(', this.health, ')знищив ', hero.name);

            // логування в історії двох героїв
            this.history.push(this.name + '(' + this.health + ')знищив ' + hero.name);
            hero.history.push(this.name + '(' + this.health + ')знищив ' + hero.name);

            // тут зменшуємо кількість героїв
            numberLivingHero--;

            // ініціюємо підвищення рівня
            this.levelUp();
        }
    },

    areaCheck: function () {

        var _x = 0;
        var _y = 0;
        var distance = 0;

        // прогон противників на можливість дотягнутися

        for (var i = 0; i<numberOfHero; i++) {
            if (this != heroes[i]) {

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
            }
        }
        return false;  // Ворогів не знайдено, спрацює метод moveTo
    },




    moveTo: function () {
        var _x =0;
        var _y =0;
        var _x2 =0;
        var _y2 =0;
        var _dirX =0;
        var _dirY =0;
        var distance =0;
        var _length2 =0;
        var cosineAngle =0;

        /*
         _x =  this.x + ((Math.random() < 0.5) ? this.speed*Math.random() : - this.speed * Math.random());
         _x = _x < 0 ? 0 : _x;
         _x = _x > myLocation.mapMaxX ? myLocation.mapMaxX : _x;

         _y =  this.y + ((Math.random() < 0.5) ? this.speed*Math.random() : - this.speed * Math.random());
         _y = _y < 0 ? 0 : _y;
         _y = _y > myLocation.mapMaxY ? myLocation.mapMaxY : _y;

         */

        // генерування довільного вектора напряму

        if (this.lookForTrouble) { // Логан має цю властивість, тому хоче переслідувати противника

            // цикл пошуку противників, має шукати найближчого противника і брати на нього напрямок
            // реалізувати потім...
            for (var i = 0; i<numberOfHero; i++) {
                if (this != heroes[i]) {
                    _x = heroes[i].x;
                    _y = heroes[i].y;
                }
            }

        }

        // інші герої отримують довільний напрямок
        else {
            _x = Math.random()*myLocation.mapMaxX;
            _y = Math.random()*myLocation.mapMaxY;
        }

        // генерування векторe в напрямку противника
        // визначення кута між вектором і обєктом, вважаємо що швидкість обєкта - це гіпотенуза, для визначення координати нової точки треба мало побабратися
        //cosineAngle = vector.scalar(this.x, this.y, _x,_y) / (vector.module(this.x, this.y) * vector.module(_x,_y));
        //console.log(Math.acos(cosineAngle));
        //_dirX = this.speed * cosineAngle;
        //_dirY = this.speed * Math.sin(Math.acos(cosineAngle));


        //distance = Math.pow((_x - this.x)*(_x - this.x) + (_y - this.y)*(_y - this.y),0.5);
        //console.log('Відстань до обєкта ',distance);

        //_dirX = _x * this.speed/distance;
        //_dirY = _y * this.speed/distance;

        distance = Math.pow((_x - this.x)*(_x - this.x) + (_y - this.y)*(_y - this.y),0.5);
        //console.log('Відстань до обєкта ',distance);
        //_dirX = (_x - this.x) * this.speed/distance;
        //_dirY = (_y - this.y) * this.speed/distance;

        // перевірка чи поряд нема противника, якщо є і ближче ніж крок, - стишити хід.
        //Якщо противник на ощній прямі або поряд в области ітаки наступним буде бій
        // для двох героїв працюэ потребує доробки і винесення в окремий метод.

        for (var i = 0; i<numberOfHero; i++) {
            if (this != heroes[i]) {
                _x2 = heroes[i].x;
                _y2 = heroes[i].y;
            }
        }
        _length2 = Math.pow((_x2 - this.x)*(_x2 - this.x) + (_y2 - this.y)*(_y2 - this.y),0.5);

        if (_length2 > this.speed) {
            //console.log('быльше не цікавить', _length2);
            _length2 = this.speed;
        }

        _dirX = (_x - this.x) * _length2/distance;
        _dirY = (_y - this.y) * _length2/distance;

        // Визначення косинуса між векторами покищо не пригодилось.. а крові попило...
        //cosineAngle = vector.scalar(this.x, this.y, _x,_y) / (vector.module(this.x, this.y) * vector.module(_x,_y));
        //console.log(Math.acos(cosineAngle));




        this.x = this.x + Math.floor(_dirX);
        this.y = this.y + Math.floor(_dirY);


        // корегування знаків відповідно до напряму, координата кінцевої точки

        //this.x = this.x + ((_x - this.x) < 0 ? -Math.floor(_dirX): Math.floor(_dirX));
        //this.y = this.y + ((_y - this.y) < 0 ? -Math.floor(_dirY): Math.floor(_dirY));

        // перевірка НЕвиходу за межі локації

        this.x =  (this.x > myLocation.mapMaxX) ? myLocation.mapMaxX : ((this.x < 0) ? 0 : this.x);
        this.y =  (this.y > myLocation.mapMaxY) ? myLocation.mapMaxY : ((this.y < 0) ? 0 : this.y);


        console.log(this.name, ' перемістився до [', this.x, ',',this.y,']');
        this.history.push(this.name + ' перемістився до [' + this.x + ',' + this.y + '] зміщення по x:' + Math.floor(_dirX) +' y:' + Math.floor(_dirY) +' вектор direction: '+ Math.floor(_x) + ',' + Math.floor(_y));
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

// клас потомок
function Vampires(clan, name, level, features, hairСolor, beard, tits, sex, health, power, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, hasVampBite, x, y) {
    XMen.apply(this, arguments);
}

// клас локації
function Location(mapMaxX, mapMaxY, windX1, windX2, windY1, windY2, windPower, gravity, airResistance, timeBetweenSteps,maxTimeOfEnvirChange){
    this.mapMaxX = mapMaxX;
    this.mapMaxY = mapMaxY;
    this.windX1 = windX1;
    this.windX2 = windX2;
    this.windY1 = windY1;
    this.windY2 = windY2;
    this.windPower = windPower;
    this.gravity = gravity;
    this.airResistance = airResistance;
    this.timeBetweenSteps = timeBetweenSteps;
    this.maxTimeOfEnvirChange = maxTimeOfEnvirChange;
    this.mustFindPath = true;

    this.map = [];

    // початкова ініціалізація карти
    for (var i = this.mapMaxX; i>= 0; i--) {
        this.map[i] = [];
        for (var j = this.mapMaxY; j >= 0; j--) {
            this.map[i][j] = 0;
        }
        // console.log(myLocation.map[i].join())
    };

    this.triangle =[];
    this.rectangle =[];
    this.ellipse =[];

    this.environmentChange = function () {};

    this.square = function (x1, y1, x2, y2, x3, y3) {
        return Math.abs(x2 * y3 - x3 * y2 - x1 * y3 + x3 * y1 + x1 * y2 - x2 * y1);
    }


    // Відмічення на карті локації області заданої трикутником, проганяє координати точок через умову, присвоює координаты карти тип перешкоди

    this.triangleInit = function(i, x, y) {
        var _s = this.square(x, y, this.triangle[i][2].x, this.triangle[i][2].y, this.triangle[i][3].x, this.triangle[i][3].y) +
            this.square(this.triangle[i][1].x, this.triangle[i][1].y, x, y, this.triangle[i][3].x, this.triangle[i][3].y) +
            this.square(this.triangle[i][1].x, this.triangle[i][1].y, this.triangle[i][2].x, this.triangle[i][2].y, x, y);

        if (this.square(this.triangle[i][1].x, this.triangle[i][1].y, this.triangle[i][2].x, this.triangle[i][2].y, this.triangle[i][3].x, this.triangle[i][3].y) == _s) {
            // console.log('попадає');
            this.map[x][y] = this.triangle[i].type;
        }
        //  else  this.map[x][y] = 0;

    }

    // Відмічення на карті локації області заданої прямокутником, проганяє координати точок через умову, присвоює координаты карти тип перешкоди

    this.rectangleInit = function(i, x, y, maxX, maxY, minX, minY) {

        if ((maxX >= x) && (minX <= x) && (maxY >= y) && (minY <= y)) {
            // console.log('попадає');
            this.map[x][y] = this.rectangle[i].type;
        }
        //  else  this.map[x][y] = 0;

    }

    this.ellipseInit = function(i, x, y) {
        if ( (((x - this.ellipse[i].x) * (x - this.ellipse[i].x) / (this.ellipse[i].rX * this.ellipse[i].rX)) +((y - this.ellipse[i].y) * (y - this.ellipse[i].y) / (this.ellipse[i].rY * this.ellipse[i].rY))) <= 1) {
            // console.log('попадає');
            this.map[x][y] = this.ellipse[i].type;
        }
        //  else  this.map[x][y] = 0;

    }

    // ініціалізація карти з барєрами
    this.barriersInit = function(){

        function Triangles (name, type, resistance, x1, y1, x2, y2, x3, y3) {
            this[1] = {};
            this[2] = {};
            this[3] = {};
            this.name = name;
            this.type = type;
            this.resistance = resistance;
            this[1].x = x1;
            this[1].y = y1;
            this[2].x = x2;
            this[2].y = y2;
            this[3].x = x3;
            this[3].y = y3;
        }

        function Rectangles (name, type, resistance, x1, y1, x2, y2) {
            this[1] = {};
            this[2] = {};
            this.name = name;
            this.type = type;
            this.resistance = resistance;
            this[1].x = x1;
            this[1].y = y1;
            this[2].x = x2;
            this[2].y = y2;
        }

        function Ellipses (name, type, resistance, x, y, rX, rY) {
            this.name = name;
            this.type = type;
            this.resistance = resistance;
            this.x = x;
            this.y = y;
            this.rX = rX;
            this.rY = rY;
        }

        var maxX =0;
        var minX =0;
        var maxY =0;
        var minY =0;

        // кількість перешкод в формі трикутника
        var triangleCount = 0;

        // кількість перешкод в формі прямокутника
        var rectangleCount = 0;

        // кількість перешкод в формі еліпса
        var ellipseCount = 0;

        /* Тип перешкод, type
         * 1 - Ліс
         * 2 - Болото
         * 3 - Гора
         * 4 - Озеро
         */

        // Тест кийс для карти 20х20
        //Triangles (name, type, resistance, x1, y1, x2, y2, x3, y3)
        this.triangle[0]= new Triangles('Ліс',1, 3,5,0,3,5,5,8);
        //this.triangle[0]= new Triangles('Ліс',1, 3,5,1,3,5,5,8);



        //this.triangle[0]= new Triangles('Ліс',1, 3,10,15,70,20,50,30);
        //this.triangle[1]= new Triangles('Болото',2, 2,50,100,0,90,60,0);
        //this.triangle[1]= new Triangles('Гора',3, 1,10,25,0,70,40,30);
        //this.triangle[3]= new Triangles('Озеро',4, 1,2,2,0,10,20,70);

        triangleCount = this.triangle.length;

        //console.dir(triangleCount);
        //console.dir(this.triangle[1]);
        //console.dir(this.triangle[2]);
        //console.dir(this.triangle[3]);

        // Тест кийс для карти 20х20
        this.rectangle[0]= new Rectangles('Ліс',1, 3, 11, 5, 15,13);

        //this.rectangle[0]= new Rectangles('Ліс',1, 3, 10, 20, 20, 50);
        //this.rectangle[1]= new Rectangles('Болото',2, 50, 50, 60, 70);
        //this.rectangle[2]= new Rectangles('Гора',3, 1, 70, 90, 90, 100);
        //this.rectangle[3]= new Rectangles('Гора',3, 1, 65, 65, 70, 70);

        rectangleCount = this.rectangle.length;

        // Тест кийс для карти 20х20
        this.ellipse[0]= new Ellipses('Ліс',1, 3,5,14,3,3);

        //this.ellipse[0]= new Ellipses('Ліс',1, 3,50,20,20,20);
        //this.ellipse[1]= new Ellipses('Болото',2,2, 70,70,10,20);
        //this.ellipse[2]= new Ellipses('Озеро',4, 1,5,70,5,30);

        ellipseCount =  this.ellipse.length;

        //console.dir(this.ellipse[0]);
        //console.dir(this.ellipse[1]);
        // console.dir(this.ellipse[2]);




// прогон точок-координат на принадлежність до перешкод трикутників

        for (var k = triangleCount-1; k >= 0; k--) {

// визначення сектору перешкоди для зменшення обчислень
            maxX = Math.max(this.triangle[k][1].x, this.triangle[k][2].x, this.triangle[k][3].x);
            minX = Math.min(this.triangle[k][1].x, this.triangle[k][2].x, this.triangle[k][3].x);

            maxY = Math.max(this.triangle[k][1].y, this.triangle[k][2].y, this.triangle[k][3].y);
            minY = Math.min(this.triangle[k][1].y, this.triangle[k][2].y, this.triangle[k][3].y);
            //console.log(minX,maxX,minY,maxY);

// прогон точок-координат на принадлежність до області перешкоди
            for (var i = maxX; i >= minX; i--) {
                for (var j = maxY; j >= minY; j--) {
                    this.triangleInit(k, i, j);
                }
            }
        }

// прогон точок-координат на принадлежність до перешкод прямокутників

        for (var k = rectangleCount-1; k >= 0; k--) {

// визначення сектору перешкоди для зменшення обчислень
            maxX = Math.max(this.rectangle[k][1].x, this.rectangle[k][2].x);
            minX = Math.min(this.rectangle[k][1].x, this.rectangle[k][2].x);

            maxY = Math.max(this.rectangle[k][1].y, this.rectangle[k][2].y);
            minY = Math.min(this.rectangle[k][1].y, this.rectangle[k][2].y);
            //console.log(minX,maxX,minY,maxY);

// прогон точок-координат на принадлежність до області перешкоди
            for (var i = maxX; i >= minX; i--) {
                for (var j = maxY; j >= minY; j--) {
                    this.rectangleInit(k, i, j, maxX, maxY, minX, minY);
                }
            }
        }

// прогон точок-координат на принадлежність до округлих перешкод

        for (var k = ellipseCount-1; k >= 0; k--) {

// визначення сектору перешкоди для зменшення обчислень
            maxX = this.ellipse[k].x + this.ellipse[k].rX;
            minX = this.ellipse[k].x - this.ellipse[k].rX;

            maxY = this.ellipse[k].y + this.ellipse[k].rY;
            minY = this.ellipse[k].y - this.ellipse[k].rY;

            //console.dir(this.ellipse[k]);
            console.log(minX,maxX,minY,maxY);
            // не забути перевырку на виліт з карти !!!!! коли ху зайде в мінус або більше маусимального !!!!!!!!!!!!!!!!!!!!

// прогон точок-координат на принадлежність до області перешкоди
            for (var i = maxX; i >= minX; i--) {
                for (var j = maxY; j >= minY; j--) {
                    this.ellipseInit(k, i, j);
                }
            }
        }


//this.ellipseInit(0, 52, 20);

// вивід нової карти
        console.log('_________________________________________________________________________________');

        for (var i = this.mapMaxX; i >= 0; i--) {
            console.log(this.map[i].join(''));
        }
//console.log(this.map[51][30]);
//console.log(this.map);
//console.log(this.triangle.length);
//this.triangleInit(1,12,10);

    }

    /*
     * Для обходу перешкоди використано за основу каркас коду з GITхабу
     * https://github.com/newpdv/pathfinder/blob/master/finder.js
     *
     * код перетравлено і  переробдено під ідеологію чистого алгоритму А*
     * http://www.policyalmanac.org/games/aStarTutorial_rus.htm
     */

    // По задуму має повертати масив з координатами шляху від А до Б.
    // Покищо тільки виводить



    this.findPath = function (startX, startY, endX, endY, heroSpeed) {


        var pathFinder = {
            'maxZonePoint': {},
            'minZonePoint': {},
            'startPoint': {},
            'endPoint': {},
            'openPointArray': {},
            'closePointArray': {},
            'currPoint': {},
            'minPointF': 0,
            'path': [],
            'countOfOpenPoin': 0,

            setStart: function (posX, posY) {
                pathFinder.startPoint = {x: posX, y: posY, G: 0};
                pathFinder.currPoint = pathFinder.startPoint;
            },

            setEnd: function (posX, posY) {
                pathFinder.endPoint = {x: posX, y: posY};
            },

            calcDistance: function (x1, y1, x2, y2) {
                return (Math.abs(x2 - x1) + Math.abs(y1 - y2)) * 10;
            },

            setCurr: function (posX, posY) {
                pathFinder.currPoint = {x: posX, y: posY};
            },

            addClose: function (posX, posY, type) {

                var define = false;

                if (pathFinder.closePointArray[posX] != undefined) {
                    if (pathFinder.closePointArray[posX][posY] != undefined) {
                        define = true;
                    }
                }

                if (!define) {
                    if (pathFinder.closePointArray[posX] == undefined) {
                        pathFinder.closePointArray[posX] = [];
                    }

                    pathFinder.closePointArray[posX][posY] = type;
                    console.log('closePointArray[',posX,'][',posY,']', pathFinder.closePointArray[posX][posY]);
                    // значення важливе... 0-перешкода, 1 - точка
                }

                if (pathFinder.openPointArray[posX] != undefined) {
                    if (pathFinder.openPointArray[posX][posY] != undefined) {
                        pathFinder.openPointArray[posX][posY].status = false;
                        pathFinder.countOfOpenPoin--;
                        console.log('addClose: ', posX, posY,' кількість відкритих',pathFinder.countOfOpenPoin);

                    }
                }
            },

            addOpen: function (posX, posY, parentPointX, parentPointY, step, i) {
                var define = false;

                console.log(i, posX, posY, parentPointX, parentPointY, step);

                if (pathFinder.openPointArray[posX] != undefined) {
                    if (pathFinder.openPointArray[posX][posY] != undefined) {
                        if ((pathFinder.openPointArray[parentPointX][parentPointY].G + step) >= pathFinder.openPointArray[posX][posY].G) {
                            define = true;
                        }
                        else {

                            //  у випадку перезапису в точку меншого шляху
                            // перезапис відбудеться нижче
                            console.log('перезапис відбудеться нижче');
                            pathFinder.countOfOpenPoin--;
                        }
                    }
                }

                if (pathFinder.closePointArray[posX] != undefined) {
                    if (pathFinder.closePointArray[posX][posY] != undefined) {
                        define = true;
                    }
                }

                if (!define) {
                    if (pathFinder.openPointArray[posX] == undefined) {
                        pathFinder.openPointArray[posX] = [];
                    }

                    /* Памятаю слова во upCase змінні, що вони вважаються константами, але в даному
                     * випадку їх застосовано для кращої візуального сприйняття коду алгоритму, відповідно до статті
                     * про алгорит
                     */


                    pathFinder.openPointArray[posX][posY] = {
                        parentX: parentPointX,
                        parentY: parentPointY,
                        H: pathFinder.calcDistance(posX, posY, pathFinder.endPoint.x, pathFinder.endPoint.y),
                        G: (pathFinder.openPointArray[parentPointX][parentPointY].G + step), // було не правильно! має плюсуватися з учотом перешкод а не діагональ
                        status: true
                    }


                    // Для Алгоритму А* , пошуку мінімального шляху, більш повільний
                    pathFinder.openPointArray[posX][posY].F = pathFinder.openPointArray[posX][posY].H + pathFinder.openPointArray[posX][posY].G;



                    // збільшення кількості відкритих ТП
                    pathFinder.countOfOpenPoin++;
                    console.log(i, 'addOpen: ', posX, posY,'Кількість відкритих', pathFinder.countOfOpenPoin);
                    console.dir(pathFinder.openPointArray[posX][posY]);

                    // перевірка чи не це не кінцева точка в білому списку
                    if (pathFinder.openPointArray[posX][posY].H == 0) return true;
                }
            },

            addBarrier: function (posX, posY) {
                pathFinder.addClose(posX, posY, 0);
            },

            findAround: function (i) {
                if (pathFinder.minPointF) {
                    pathFinder.setCurr(pathFinder.minPointF.x, pathFinder.minPointF.y);
                    console.log('Записую в каррент координати з мін. F',pathFinder.minPointF.x, pathFinder.minPointF.y )
                }

                pathFinder.addClose(pathFinder.currPoint.x, pathFinder.currPoint.y, 1);

                var minX = eval(pathFinder.currPoint.x) - 1;
                var minY = eval(pathFinder.currPoint.y) - 1;
                var maxX = eval(pathFinder.currPoint.x) + 1;
                var maxY = eval(pathFinder.currPoint.y) + 1;

                for (var y = maxY; y >= minY; y--) {
                    for (var x = maxX; x >= minX; x--) {
                        if (x >= pathFinder.minZonePoint.x && y >= pathFinder.minZonePoint.y && x <= pathFinder.maxZonePoint.x && y <= pathFinder.maxZonePoint.y) {

                            //вихід із пошуку якщо true (у відкритий список попала кінцева ТП)
                            if (pathFinder.addOpen(x, y, pathFinder.currPoint.x, pathFinder.currPoint.y, ((pathFinder.currPoint.x == x) || (pathFinder.currPoint.y == y)) ? 10 : 14, i)) {
                                pathFinder.currPoint.x = x;
                                pathFinder.currPoint.y = y;
                                return true;

                            }
                        }
                    }
                }
                pathFinder.findPointMinF();
            },

            findPointMinF:function () {



                // кондішн перевіря довжину [масива ключів] обекта відкритих точок масива
                // if(Object.keys(pathFinder.openPointArray).length){   // оригінальна умова

                // перевірка чи э ще відкриті точки
                // пошук ТП з найменшим F

                pathFinder.minPointF = 0;
                if (pathFinder.countOfOpenPoin > 0) {

                    for (var posX in pathFinder.openPointArray) {
                        if (pathFinder.openPointArray[posX] != undefined) {
                            for (var posY in pathFinder.openPointArray[posX]) {
                                if ((pathFinder.openPointArray[posX][posY] != undefined) && (pathFinder.openPointArray[posX][posY].status)) {
                                    if (pathFinder.minPointF) {
                                        if (pathFinder.openPointArray[posX][posY].F < pathFinder.minPointF.F) {
                                            pathFinder.minPointF = {
                                                x: posX,
                                                y: posY,
                                                F: pathFinder.openPointArray[posX][posY].F
                                            };
                                            console.log('Мінімальне F')
                                            console.dir(pathFinder.minPointF);

                                        }
                                    }
                                    else {
                                        pathFinder.minPointF = {
                                            x: posX,
                                            y: posY,
                                            F: pathFinder.openPointArray[posX][posY].F
                                        };
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    console.log('Всі точки в закритому масиві, а шлях не знайдено.... придумай щось');
                    myLocation.mustFindPath = false;
                }

            },

            firstInit: function () {
                pathFinder.openPointArray[startX] = [];
                pathFinder.openPointArray[startX][startY] = {
                    x: startX,
                    y: startY,
                    H: pathFinder.calcDistance(startX, startY, pathFinder.endPoint.x, pathFinder.endPoint.y),
                    G: 0
                }
                pathFinder.countOfOpenPoin++;
                pathFinder.addOpen(pathFinder.currPoint.x, pathFinder.currPoint.y, pathFinder.currPoint.x, pathFinder.currPoint.y, 0, 'start');

            }
        } // закриваэться обект

        /* тест кийс для класичного Алгоритму А* "стінка між точками
         * pathFinder.addBarrier(5, 9);
         * pathFinder.addBarrier(5, 8);
         * pathFinder.addBarrier(5, 7);
         * pathFinder.addBarrier(5, 6);
         * pathFinder.addBarrier(4, 9);
         */

        // запис перешкод в закриту таблицю
        // перенести запис перешков в Ініціалізацію !!!!!!!!!!!

        for (var i = this.mapMaxX; i >= 0; i--) {
            for (var j = this.mapMaxY; j >= 0; j--) {
                if (this.map[i][j] >= 1) pathFinder.addBarrier(i, j);
            }
        }

        pathFinder.setStart(startX, startY);
        pathFinder.setEnd(endX, endY);

        var distance = 2;
        var pathIsFind = false;
        var stepCount = 0;
        var j = 0;
        var _maxX = Math.max(startX, endX);
        var _minX = Math.min(startX, endX);
        var _maxY = Math.max(startY, endY);
        var _minY = Math.min(startY, endY);


        // заносить стартову Точку у відкритий список

        pathFinder.firstInit();


        //while (!(pathIsFind) && (!((_maxX == this.mapMaxX) && (_maxY == this.mapMaxY) && (_minX == 0)&& (_minY == 0))) && stepCount < 300 ) {
        while (!(pathIsFind) && (!((_maxX == this.mapMaxX) && (_maxY == this.mapMaxY) && (_minX == 0)&& (_minY == 0)))) {

            _maxX += distance;
            _maxX = (_maxX > this.mapMaxX) ? this.mapMaxX : _maxX;

            _maxY += distance;
            _maxY = (_maxY > this.mapMaxY) ? this.mapMaxY : _maxY;

            _minX -= distance;
            _minX = (_minX < 0) ? 0 : _minX;

            _minY -= distance;
            _minY = (_minY < 0) ? 0 : _minY;

            pathFinder.maxZonePoint = {
                x: _maxX,
                y: _maxY
            };

            pathFinder.minZonePoint = {
                x: _minX,
                y: _minY
            };


            console.log('distacne',distance,'maxX', _maxX, 'minX', _minX, 'maxnY',_maxY, 'minY', _minY, 'pathIsFind:', pathIsFind);


            //while (myLocation.mustFindPath && stepCount < 300) {
            while (myLocation.mustFindPath) {
                // console.log (myLocation.mustFindPath);
                pathFinder.findAround(stepCount);

                if (pathFinder.currPoint.x == pathFinder.endPoint.x && pathFinder.currPoint.y == pathFinder.endPoint.y) {
                    console.log('Шлях знайдено');
                    myLocation.mustFindPath = false;
                    pathIsFind = true;
                    j = 0;
                    // йдемо по цепочці коорлдмнат і записуемо координати їх паттерна в масив Path

                    while (!((pathFinder.currPoint.x == startX ) && (pathFinder.currPoint.y == startY))) {
                        pathFinder.path[j] = {
                            x: pathFinder.currPoint.x,
                            y: pathFinder.currPoint.y
                        }

                        //console.log(pathFinder.currPoint.x, pathFinder.currPoint.y);
                        //console.log(pathFinder.openPointArray[pathFinder.path[j].x][pathFinder.path[j].y]);


                        pathFinder.currPoint.x = pathFinder.openPointArray[pathFinder.path[j].x][pathFinder.path[j].y].parentX;
                        pathFinder.currPoint.y = pathFinder.openPointArray[pathFinder.path[j].x][pathFinder.path[j].y].parentY;
                        j++;
                    }

                    pathFinder.path[j] = {
                        x: pathFinder.currPoint.x,
                        y: pathFinder.currPoint.y
                    };
                    // оскільки в масив був записаний шлях з кінцевої до початкової треба його розвернути
                    pathFinder.path.reverse();
                    console.log('Треба пройти кроків', pathFinder.path.length - 1, pathFinder.path);

                }
                stepCount++;
            }

            distance += heroSpeed;
            if (!pathIsFind){

                // переключаємо тригер потреби пошуку шляху
                myLocation.mustFindPath = true;
                console.log('Збільшую зону пошуку карти на:',distance,'maxX', _maxX, 'minX', _minX, 'maxnY',_maxY, 'minY', _minY, 'pathIsFind:', pathIsFind);
                console.log(pathFinder.closePointArray);
                //треба розблокувати по краях карти ячейки і знайти мінімальне F

                for (var i = _maxX; i>= _minX; i--){
                    // якщо це була не перешкода - активувати точку
                    if ((pathFinder.closePointArray[i] != undefined) && (pathFinder.closePointArray[i][_maxY] != undefined) && (pathFinder.closePointArray[i][_maxY] == 1)) {
                        pathFinder.openPointArray[i] [_maxY].status = true;
                        pathFinder.countOfOpenPoin++;
                        console.log('Добавив точку у выдкритий масив', i, _maxY, 'countOfOpenPoin', pathFinder.countOfOpenPoin);

                    }

                    if ((pathFinder.closePointArray[i] != undefined) && (pathFinder.closePointArray[i][_minY] != undefined) && (pathFinder.closePointArray[i][_minY] == 1)) {
                        pathFinder.openPointArray[i] [_minY].status = true;
                        pathFinder.countOfOpenPoin++;
                        console.log('Добавив точку у выдкритий масив', i, _minY,'countOfOpenPoin', pathFinder.countOfOpenPoin );
                    }
                }

                for (var i = _maxY-1; i>= _minY+1; i--){
                    //console.log('i',i);
                    // якщо це була не перешкода - активувати точку
                    if ((pathFinder.closePointArray[_maxX] != undefined) && (pathFinder.closePointArray[_maxX][i] != undefined) && (pathFinder.closePointArray[_maxX][i] == 1)) {
                        pathFinder.openPointArray[_maxX][i].status = true;
                        pathFinder.countOfOpenPoin++;
                        console.log('Добавив точку у відкритий масив',_maxX, i);
                    }

                    if ((pathFinder.closePointArray[_minX]!= undefined) && (pathFinder.closePointArray[_minX][i] != undefined) && (pathFinder.closePointArray[_minX][i] == 1)) {
                        pathFinder.openPointArray[_minX][i].status = true;
                        pathFinder.countOfOpenPoin++;
                        console.log('Добавив точку у відкритий масив', _minX, i,'countOfOpenPoin', pathFinder.countOfOpenPoin);
                    }
                }


                // тепер треба запустити пошук з мінімальним F запишнться потым в каррент
                pathFinder.findPointMinF();

            }
        }
        if (((!pathIsFind)&&(_maxX == this.mapMaxX) && (_maxY == this.mapMaxY) && (_minX == 0)&& (_minY == 0))) {
            console.log('Печалька, але карта пошуку зрівнялася з картою локації, а шлях не знайдено... Вчися літати, ти приречений...  ');
        }

    }
}


// функція по обрахуванню векторів

function vector(){};
vector.module = function (x,y) {
    return Math.pow(x * x + y * y, 0.5);
};

vector.scalar = function (x,y, x2,y2) {
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

Vampires.prototype = Object.create(XMen.prototype);
Vampires.prototype.constructor = Vampires;

//XMen(clan, name, level, features, hairСolor, beard, tits, sex, health, power, attackRange, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, canHealing, healingMaxPoint, hasVampBite,lookForTrouble, x, y) {
var rosomaha = new XMen('X-Men', 'Logan', 1, 'healing factor, six retractable claws', 'black', 'small', 'no', 'man', 100, 2, 3, 10, 20, 70, 0, 10, false, 0, false, false, true, false, false, false, true, 15, false, true, 2, 2);
//console.dir(rosomaha);

//var vampire = new Vampires('Vampires', 'Sweetdeath', 1, 'invisibility,can fly, regeneration bites', 'carrot', 'no', 'big', 'woman', 150, 3, 3, 15, 10, 30, 0, 15, true, 20, true, false, true, false, false, false, true, 7, true, false, 80, 70);
//console.dir(vampire);




// заносимо в масив для полегшеного перебирання
var heroes = [];
heroes.push(rosomaha);
//heroes.push(vampire);


var numberLivingHero = 2;
var numberOfHero = 2;



var numberOfSteps = 0;

// Створення обєкту локації
// function Location(mapMaxX, mapMaxY, windX1, windX2, windY1, windY2, windPower, gravity, airResistance, timeBetweenSteps,maxTimeOfEnvirChange)
var myLocation = new Location(20, 20, 0, 0, 10, 20, 0.2, 1, 0.2, 100, 4000);
//var myLocation = new Location(20, 20, 0, 0, 10, 20, 0.2, 1, 0.2, 100, 4000);

// ініціалізація барєрів, самі барєри описані в цій же функції
myLocation.barriersInit();

// тест кейс, точки новпроти через стінку
//myLocation.findPath(3,7,7,7,0);

// Тест кийс №1 для карти 20х20
//myLocation.findPath(2,2,7,3,10);

// Тест кийс №2 для карти 20х20
//myLocation.findPath(2,2,17,2,5);

// Тест кийс №3 для карти 20х20
//myLocation.findPath(2,2,17,13,0);

// Тест кийс №4 для карти 20х20
//myLocation.findPath(2,2,19,5,0);

// Тест кийс №3 для карти 20х20
var nextPoint = {};
nextPoint.x = 19;
nextPoint.y = 5;

myLocation.findPath(heroes[0].x,heroes[0].y, nextPoint.x,nextPoint.y, heroes[0].speed );


/*
 var gameSpedTimer = setInterval(function () {

 // if (numberOfSteps <= 12) {
 numberOfSteps++;
 if (numberLivingHero >= 2) {


 for (var i = 0; i<numberOfHero; i++) {

 /*
 if ((vampire.health > 0) && (rosomaha.health > 0)) {
 //	rosomaha.figth(vampire);
 }

 if ((vampire.health > 0) && (rosomaha.health > 0)) {
 //	vampire.figth(rosomaha);
 }
 rosomaha.regeneration();
 vampire.regeneration();
 */
/*
 heroes[i].regeneration();
 if (!heroes[i].areaCheck()) { heroes[i].moveTo(); }

 }


 location.environmentChange();
 console.log('Крок:',numberOfSteps);

 //	vampire.moveTo();
 //console.log(rosomaha.name, '(', rosomaha.health, ') регенерував 10', ' пунктів здоровя');
 }

 else {
 //console.log('___****_____***_________***________');
 //console.log(rosomaha.history);

 clearInterval(gameSpedTimer); // якщо героїв менше двох - зупинити
 gameSpedTimer = 0;

 }
 }, myLocation.timeBetweenSteps);
 */

//vector.intersection(rosomaha,vampire, 20,10,30,10, 25,10,10,10);

//var cosineAngle = vector.scalar(20, 0 80,0) / (vector.module(20, 0) * vector.module(80,0));
//console.log(cosineAngle);


//for (var i = 10; i>0; i--)
//console.log( 'Спец удари Вампіра',Math.random()*100<vampire.chanceSpecDamage)
