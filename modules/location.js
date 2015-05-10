// клас локації
var myLocation = new Location(800, 600, 0, 0, 10, 20, 0.2, 1, 0.2, 3000, 4000);
var heroMovePath = require('./classPathmap.js');
myLocation.barriersInit();
myLocation.classPathPointValidation();

function Location(mapMaxX, mapMaxY, windX1, windX2, windY1, windY2, windPower, gravity, airResistance, timeBetweenSteps, maxTimeOfEnvirChange) {
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
    this.caсhePath = [];

    this.map = [];

    // початкова ініціалізація карти
    for (var i = this.mapMaxX; i >= 0; i--) {
        this.map[i] = [];
        for (var j = this.mapMaxY; j >= 0; j--) {
            this.map[i][j] = 0;
        }
        // console.log(this.map[i].join())
    }
//    console.log(this.mapMaxX, this.mapMaxY, this.map[800][600])

    this.triangle = [];
    this.rectangle = [];
    this.ellipse = [];

    this.environmentChange = function () {
    };

    this.square = function (x1, y1, x2, y2, x3, y3) {
        return Math.abs(x2 * y3 - x3 * y2 - x1 * y3 + x3 * y1 + x1 * y2 - x2 * y1);
    };


    // Відмічення на карті локації області заданої трикутником, проганяє координати точок через умову, присвоює координаты карти тип перешкоди

    this.triangleInit = function (i, x, y) {
        var _s = this.square(x, y, this.triangle[i][2].x, this.triangle[i][2].y, this.triangle[i][3].x, this.triangle[i][3].y) +
            this.square(this.triangle[i][1].x, this.triangle[i][1].y, x, y, this.triangle[i][3].x, this.triangle[i][3].y) +
            this.square(this.triangle[i][1].x, this.triangle[i][1].y, this.triangle[i][2].x, this.triangle[i][2].y, x, y);

        if (this.square(this.triangle[i][1].x, this.triangle[i][1].y, this.triangle[i][2].x, this.triangle[i][2].y, this.triangle[i][3].x, this.triangle[i][3].y) == _s) {
            // console.log('попадає');
            this.map[x][y] = this.triangle[i].type;
        }
        //  else  this.map[x][y] = 0;

    };

    // Відмічення на карті локації області заданої прямокутником, проганяє координати точок через умову, присвоює координаты карти тип перешкоди

    this.rectangleInit = function (i, x, y, maxX, maxY, minX, minY) {

        if ((maxX >= x) && (minX <= x) && (maxY >= y) && (minY <= y)) {
            // console.log('попадає');
            this.map[x][y] = this.rectangle[i].type;
        }
        //  else  this.map[x][y] = 0;

    };

    this.ellipseInit = function (i, x, y) {
        if ((((x - this.ellipse[i].x) * (x - this.ellipse[i].x) / (this.ellipse[i].rX * this.ellipse[i].rX)) + ((y - this.ellipse[i].y) * (y - this.ellipse[i].y) / (this.ellipse[i].rY * this.ellipse[i].rY))) <= 1) {
            // console.log('попадає');
            this.map[x][y] = this.ellipse[i].type;
        }
        //  else  this.map[x][y] = 0;

    };

    //перевірити карту героїв на точки що попадають на площину перешкод.

    this.validatePoint = function(x1,y1) {
        return    (this.map[x1][y1] >= 1 ? this.map[x1][y1] : 0);
    };



    this.classPathPointValidation = function() {
        console.log('Валідація точок маршруту персонажів... ');
        var class1 = {
            clan: 'X-Men'
        };
        var _point= {isLast: false};

        var class2 = {
            clan: 'Vampires'
        };


        var i = 0;
        while (!_point.isLast) {
            // while (i > 0) {
            _point = heroMovePath.call(class1,i);
            if (this.validatePoint(_point.x, _point.y)>0) {
                console.log('Точка маршруту клана', class1.clan, _point.x, _point.y, ' знаходиться у перешкоді типу', this.validatePoint(_point.x, _point.y),' треба виправити');
                process.exit(1);
            }
            _point = heroMovePath.call(class2,i);
            if (this.validatePoint(_point.x, _point.y)>0) {
                console.log('Точка маршруту клана', class2.clan, _point.x, _point.y, ' знаходиться у перешкоді типу', this.validatePoint(_point.x, _point.y),' треба виправити');
                process.exit(1);
            }
            i++;
        }
        console.log('Валідацію пройдено!');
    };


    // ініціалізація карти з барєрами
    this.barriersInit = function (anticash) {

        function Triangles(name, type, resistance, x1, y1, x2, y2, x3, y3) {
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

        function Rectangles(name, type, resistance, x1, y1, x2, y2) {
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

        function Ellipses(name, type, resistance, x, y, rX, rY) {
            this.name = name;
            this.type = type;
            this.resistance = resistance;
            this.x = x;
            this.y = y;
            this.rX = rX;
            this.rY = rY;
        }


        var maxX = 0;
        var minX = 0;
        var maxY = 0;
        var minY = 0;
        console.log('Ініціалізація перешкод');

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
        // this.triangle[0] = new Triangles('Ліс', 1, 3, 5, 0, 3, 5, 5, 8);
        //this.triangle[0]= new Triangles('Ліс',1, 3,5,1,3,5,5,8);


        this.triangle.push(new Triangles('Ліс', 1, 3, 66, 506, 154, 391, 154, 460));
        this.triangle.push(new Triangles('Гора', 3, 1, 396, 460, 506, 504, 506, 370));
        this.triangle.push(new Triangles('Болото', 2, 2, 682, 322, 800, 322, 800, 437));
        this.triangle.push(new Triangles('Гора', 3, 1, 330, 230, 418, 230, 390, 23));
        this.triangle.push(new Triangles('Ліс', 1, 3, 440, 209, 430, 70, 528, 70));
        //this.triangle[3]= new Triangles('Озеро',4, 1,2,2,0,10,20,70);

        triangleCount = this.triangle.length;

        //console.dir(triangleCount);
        //console.dir(this.triangle[1]);
        //console.dir(this.triangle[2]);
        //console.dir(this.triangle[3]);

        // Тест кийс для карти 20х20
        this.rectangle.push(new Rectangles('Болото', 2, 2, 220, 600, 244, 460));
        this.rectangle.push(new Rectangles('Гора',3, 1, 660, 506, 800, 490));
        this.rectangle.push(new Rectangles('Озеро',4, 1, 616, 600, 626, 390));
        this.rectangle.push(new Rectangles('Ліс', 1, 2, 44, 46, 220, 92));

        //this.rectangle[0]= new Rectangles('Ліс',1, 3, 10, 20, 20, 50);
        //this.rectangle[1] = new Rectangles('Болото', 2, 2, 600, 550, 300, 500);
        //       this.rectangle[1] = new Rectangles('Болото', 2, 2, 511, 501, 488, 500);
        //this.rectangle[1] = new Rectangles('Болото', 2, 2, 1, 20, 25, 25);
        //this.rectangle[2]= new Rectangles('Гора',3, 1, 70, 90, 90, 100);
        //this.rectangle[3]= new Rectangles('Гора',3, 1, 65, 65, 70, 70);

        rectangleCount = this.rectangle.length;

        // Тест кийс для карти 20х20
        this.ellipse.push(new Ellipses('Озеро',4, 1, 420, 310, 40, 60));
        this.ellipse.push(new Ellipses('Озеро',4, 1, 620, 380, 30, 60));
        this.ellipse.push(new Ellipses('Болото', 2, 2, 40, 240, 30, 100));
        this.ellipse.push(new Ellipses('Озеро',4, 1, 680, 140, 30, 60));
        this.ellipse.push(new Ellipses('Ліс', 1, 2, 690, 140, 40, 60));

        //this.ellipse[0]= new Ellipses('Ліс',1, 3,50,20,20,20);
        //this.ellipse[1]= new Ellipses('Болото',2,2, 70,70,10,20);
        //this.ellipse[2]= new Ellipses('Озеро',4, 1,5,70,5,30);

        ellipseCount = this.ellipse.length;

        //console.dir(this.ellipse[0]);
        //console.dir(this.ellipse[1]);
        // console.dir(this.ellipse[2]);


// прогон точок-координат на принадлежність до перешкод трикутників

        for (var k = triangleCount - 1; k >= 0; k--) {

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

        for (var k = rectangleCount - 1; k >= 0; k--) {

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

        for (var k = ellipseCount - 1; k >= 0; k--) {

// визначення сектору перешкоди для зменшення обчислень
            maxX = this.ellipse[k].x + this.ellipse[k].rX;
            minX = this.ellipse[k].x - this.ellipse[k].rX;

            maxY = this.ellipse[k].y + this.ellipse[k].rY;
            minY = this.ellipse[k].y - this.ellipse[k].rY;

            //console.dir(this.ellipse[k]);
            //   console.log(minX, maxX, minY, maxY);
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
        //  console.log('_________________________________________________________________________________');
        var _s = ' ';

        for (var j = this.mapMaxY; j >= 0; j--) {
            for (var i = 0; i < this.mapMaxX; i++) {

                _s+=this.map[i][j];
            }
            console.log(_s);
            _s=' ';
        }

//console.log(this.map[51][30]);
//console.log(this.map);
//console.log(this.triangle.length);
//this.triangleInit(1,12,10);

    };

    /*
     * Для обходу перешкоди використано за основу каркас коду з GITхабу
     * https://github.com/newpdv/pathfinder/blob/master/finder.js
     *
     * код перетравлено і  переробдено під ідеологію чистого алгоритму А*
     * http://www.policyalmanac.org/games/aStarTutorial_rus.htm
     */

    //Повний шлях шукає довго, повний шля в ігрі і не потрібний
    //краще мабуть обходить потрохи.. на глубину heroSpeed

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
                //console.log('В закритий список',posX,posY,type);

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
                    //  console.log('closePointArray[', posX, '][', posY, ']', pathFinder.closePointArray[posX][posY]);
                    // значення важливе... 0-перешкода, 1 - точка
                }

                if (pathFinder.openPointArray[posX] != undefined) {
                    if (pathFinder.openPointArray[posX][posY] != undefined) {
                        pathFinder.openPointArray[posX][posY].status = false;
                        pathFinder.countOfOpenPoin--;
                      //  console.log('addClose: ', posX, posY, ' кількість відкритих', pathFinder.countOfOpenPoin);

                    }
                }
            },

            addOpen: function (posX, posY, parentPointX, parentPointY, step, i) {
                var define = false;

                // console.log(i, posX, posY, parentPointX, parentPointY, step);

                // ця умова для класичного плгоритму А.., дя порівняння і встановлення в уже пройдену ячейку меншого шляху а тут в ный тільки глюк відловився..

                //if (pathFinder.openPointArray[posX] != undefined) {
                //    if (pathFinder.openPointArray[posX][posY] != undefined) {
                //        if ((pathFinder.openPointArray[parentPointX][parentPointY].G + step) >= pathFinder.openPointArray[posX][posY].G) {
                //            define = true;
                //        }
                //        else {
                //            // тут було пропущено  define = false; через це кылькість відкритих незаконно зменщувалося !!!!!!!!!!!!! виявилося випадково
                //
                //            //  у випадку перезапису в точку меншого шляху
                //            // перезапис відбудеться нижче
                //            //  console.log('перезапис відбудеться нижче');
                //            pathFinder.countOfOpenPoin--;
                //        }
                //    }
                //}

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
                    };


                    // Для Алгоритму А* , пошуку мінімального шляху, більш повільний
                    //pathFinder.openPointArray[posX][posY].F = pathFinder.openPointArray[posX][posY].H + pathFinder.openPointArray[posX][posY].G;

                    // більш швидшою (20-70 % від розмірів) буде наступна реалізація, просто рухатись бік кінцевої точки
                    //

                    pathFinder.openPointArray[posX][posY].F = pathFinder.openPointArray[posX][posY].H;


                    // збільшення кількості відкритих ТП
                    pathFinder.countOfOpenPoin++;

                    // замість дебага... відловити глюк

                    if (startX == 500 && startY == 490){


                        console.log(i, 'addOpen: ', posX, posY, 'F :',   pathFinder.openPointArray[posX][posY].F); ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
                        //console.dir(pathFinder.openPointArray[posX][posY]);
                    }
                    // перевірка чи не це не кінцева точка в білому списку
                    if (pathFinder.openPointArray[posX][posY].H == 0) return true;
                }
            },

            addBarrier: function (posX, posY) {
                pathFinder.addClose(posX, posY, 0);
            },

            findAround: function (i) {
                if (pathFinder.minPointF) {
                    pathFinder.setCurr(+pathFinder.minPointF.x, +pathFinder.minPointF.y);
                    //     console.log('Записую в каррент координати з мін. F', pathFinder.minPointF.x, pathFinder.minPointF.y)
                }
                // console.log('крок',i);

                pathFinder.addClose(pathFinder.currPoint.x, pathFinder.currPoint.y, 1);

                var minX = (pathFinder.currPoint.x - 1)<0 ? 0: pathFinder.currPoint.x - 1;
                var minY = (pathFinder.currPoint.y - 1)<0 ? 0: pathFinder.currPoint.y - 1;
                var maxX = (pathFinder.currPoint.x + 1)>800 ? 800: pathFinder.currPoint.x + 1;
                var maxY = (pathFinder.currPoint.y + 1)>600 ? 600: pathFinder.currPoint.y + 1;

                //  console.log(minX,minY,maxX,maxY);


                for (var y = maxY; y >= minY; y--) {
                    for (var x = maxX; x >= minX; x--) {

                        // замість дебага... відловити глюк
                        if (startX == 500 && startY == 490) {
                            console.log(x,  y, pathFinder.minZonePoint.x, pathFinder.minZonePoint.y, pathFinder.maxZonePoint.x, pathFinder.maxZonePoint.y);
                            //console.log('x,pathFinder.minZonePoint.x ,y, pathFinder.minZonePoint.y,  pathFinder.maxZonePoint.x, pathFinder.maxZonePoint.y');
                        }
                        if (x >= pathFinder.minZonePoint.x && y >= pathFinder.minZonePoint.y && x <= pathFinder.maxZonePoint.x && y <= pathFinder.maxZonePoint.y) {
                            // console.log('test');
                            //вихід із пошуку якщо true (у відкритий список попала кінцева ТП)
                            if (pathFinder.addOpen(x, y, pathFinder.currPoint.x, pathFinder.currPoint.y, ((pathFinder.currPoint.x == x) || (pathFinder.currPoint.y == y)) ? 10 : 14, i)) {
                                pathFinder.currPoint.x = x;
                                pathFinder.currPoint.y = y;
                                console.log('Попала кінцева точка');
                                return true;

                            }
                        }
                    }
                }
                pathFinder.findPointMinF();
            },

            findPointMinF: function () {
                // кондішн перевіря довжину [масива ключів] обекта відкритих точок масива
                // if(Object.keys(pathFinder.openPointArray).length){   // оригінальна умова

                // перевірка чи э ще відкриті точки
                // пошук ТП з найменшим F
                //console.log('Знайти мынымальну Ф');

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
                                            //  console.log('Мінімальне F');
                                            // console.dir(pathFinder.minPointF);

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
                    console.log('Всі точки в закритому масиві, а шлях не знайдено.... придумай щось' );
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
                };
                pathFinder.countOfOpenPoin++;
                pathFinder.addOpen(pathFinder.currPoint.x, pathFinder.currPoint.y, pathFinder.currPoint.x, pathFinder.currPoint.y, 0, 'start');
            }
        }; //скінчився обєкт

        if (this.validatePoint(startX, startY) >0) {
            console.log('Початкові координати',startX,startY,' знаходяться в перешкоді');
            process.exit(1);
        }

        if (this.validatePoint(endX,endY) >0) {
            console.log('Кінцеві координати',endX,endY,' знаходяться в перешкоді');
            process.exit(1);
        }


        myLocation.mustFindPath = true;

        var detectStartPoint = false;
        var detectEndPoint = false;
        var detectStartPointPosition = -1;
        var detectEndPointPosition = -1;
        var detectArrayNumber = -1;
        var stepCount = 0;

// перевірка Кеша
        console.log('Статрова точк:',startX, startY, 'кінцева точка:', endX, endY);
        if (this.caсhePath) {

            this.caсhePath.every(function (item,i){
                detectStartPoint = false;
                detectEndPoint = false;
                detectStartPointPosition = -1;
                detectEndPointPosition = -1;
                detectArrayNumber = i;

                item.every(function (value, j){
                    if (startX == value.x && startY == value.y) {
                        detectStartPoint = true;
                        detectStartPointPosition = j;
                    }
                    if (endX == value.x && endY == value.y) {
                        detectEndPoint = true;
                        detectEndPointPosition = j;
                    }

                    if (detectStartPoint && detectEndPoint) {
                        return false;
                    }
                    else return true;
                });

                if (detectStartPoint && detectEndPoint) {
                    // console.log ('Маршрут взято із кеша, масив шляху',i,' позиція початку', detectStartPointPosition,' позиція кінця',detectEndPointPosition);
                    return false;}
                else return true;
            });

            // console.log ('Не пустий');
        }
        if (detectStartPoint && detectEndPoint) {
            console.log('Маршрут взято із кеша, масив шляху', detectArrayNumber, ' позиція початку', detectStartPointPosition, ' позиція кінця', detectEndPointPosition);
            console.log('Старт поинт', this.caсhePath[detectArrayNumber][detectStartPointPosition]);
            console.log('Енд поинт', this.caсhePath[detectArrayNumber][detectEndPointPosition]);

            pathFinder.path = this.caсhePath[detectArrayNumber].slice(Math.min(detectStartPointPosition, detectEndPointPosition),Math.max(detectStartPointPosition, detectEndPointPosition)+1);
            if (detectStartPointPosition < detectEndPointPosition ) {
                pathFinder.path.reverse();
            }
        }

        else {


            for (var i = this.mapMaxX; i >= 0; i--) {
                for (var j = this.mapMaxY; j >= 0; j--) {
                    if (this.map[i][j] >= 1) pathFinder.addBarrier(i, j);
                }
            }

            pathFinder.setStart(startX, startY);
            pathFinder.setEnd(endX, endY);



            var pathIsFind = false;
            var j = 0;
            var _maxX = this.mapMaxX;
            var _minX = 0;
            var _maxY = this.mapMaxY;
            var _minY = 0;


            // заносить стартову Точку у відкритий список

            pathFinder.firstInit();

            pathFinder.maxZonePoint = {
                x: _maxX,
                y: _maxY
            };

            pathFinder.minZonePoint = {
                x: _minX,
                y: _minY
            };

            //while (!(pathIsFind) && (!((_maxX == this.mapMaxX) && (_maxY == this.mapMaxY) && (_minX == 0)&& (_minY == 0))) && stepCount < 300 ) {
            //  while (!pathIsFind ) {


// умова глубини пошуку  ... потыбно тыльки наприклад 10 кроків
            while (myLocation.mustFindPath && stepCount < 80000) {
                // while (this.mustFindPath) {
                //console.log (stepCount);
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
                        };

                        // console.log(pathFinder.currPoint.x, pathFinder.currPoint.y);
                        //   console.log(pathFinder.openPointArray[pathFinder.path[j].x][pathFinder.path[j].y]);

                        //  console.log('j:',j,pathFinder.path[j].x, pathFinder.path[j].y, pathFinder.openPointArray[pathFinder.path[j].x][pathFinder.path[j].y].parentX);
                        pathFinder.currPoint.x = pathFinder.openPointArray[pathFinder.path[j].x][pathFinder.path[j].y].parentX;
                        pathFinder.currPoint.y = pathFinder.openPointArray[pathFinder.path[j].x][pathFinder.path[j].y].parentY;
                        j++;
                    }

                    pathFinder.path[j] = {
                        x: pathFinder.currPoint.x,
                        y: pathFinder.currPoint.y
                    };
                    // оскільки в масив був записаний шлях з кінцевої до початкової треба його розвернути
                    // pathFinder.path.reverse();

                    // закидуємо результат в кеш

                    this.caсhePath.push(pathFinder.path.slice());

                    //видаляємо точку початку маршруту
                                        //console.log('До кінцевої точки маршруту треба пройти ', pathFinder.path.length - 1,' кроків');
                }
                stepCount++;
            }

            if (!pathIsFind) {
                console.log('Печалька, зроблено', stepCount, 'ітерацій а шлях не знайдено... Вчися літати, ти приречений...  ');
                return false;
            }
        }
        pathFinder.path.pop();
        console.log('Зроблено', stepCount, 'Ітерацій, до кінцевої точки маршруту треба пройти', pathFinder.path.length - 1, pathFinder.path);
         return pathFinder.path;
        //}
    }



}

module.exports = myLocation;
//module.exports.myLocation = myLocation;

//var myLocation = new Location(800, 600, 0, 0, 10, 20, 0.2, 1, 0.2, 100, 4000);
//myLocation.barriersInit();

//this.rectangle[0] = new Rectangles('Болото', 2, 2, 2, 20, 23, 25);
//myLocation.findPath(7, 0, 12, 30);
//myLocation.findPath(7, 1, 11, 30);
//myLocation.findPath(1,1, 800, 600);
//myLocation.findPath(7, 1, 200, 100);
//myLocation.findPath( 200, 100,300,250);
//myLocation.findPath( 300,250, 660, 250);
////myLocation.findPath(700, 599, 600, 549);
//myLocation.findPath(0, 50, 70, 50);

//myLocation.findPath(10, 0, 30, 30,10);
