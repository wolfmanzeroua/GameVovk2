// клас нащалок
var defaultClassSettings = function ( name, clan, x, y) {
    var myObject = {
        clan: clan,
        name: name,
        features: ' defaul hero dount have features',
        hairColor: 'does not matter',
        beard: 'does not matter',
        tits: 'does not matter',
        sex: 'does not matter',
        health: 100,
        maxHealth: 100,
        power: 2,
        attackRange: 4,
        damage: 10,
        specDamage: 5,

        // Шанс нанести спецудар ногтями або укус у вампіра
        chanceSpecDamage: 50,
        defence: 0,
        speed: 10,
        canFly: false,
        flySpeed: 0,
        canBeInvisible: false,
        invisible: false,
        canJump: true,
        canTeleport: false,
        canShoot: false,
        canFreeze: false,
        isFreeze: false,
        FreezeStepLeft: 0,


        // Спеціальний навик деяких істот відновлюватися
        canHealing: false,
        healingMaxPoint: false,

        // Спеціальний навик вампіра, якщо тру - дає можливість відновити здоровся за рахунок нанесеного урона
        hasVampBite: false,

        // рівень героя. після перемоги підвищується і запускається метод levelUp()
        level: 1,
        lookForTrouble: false,

        // масив для збереження історії героя
        history: [],
        x: x,
        y: y,
        PathMapStep: 0,
        walkedAllWay: false,
        nextDestinationPoint: {
            'x': x,
            'y': y
        }

    };

    if (clan == 'Vampires') {


    }
    return myObject;
};

module.exports= defaultClassSettings;

// клас нащалок
//var defaultClassSettings = function ( name, clan, x, y) {
//
//    var clan = clan;
//    var name = name;
//    var features = ' defaul user dount have features';
//    var hairСolor = 'does not matter' ;
//    var beard = 'does not matter';
//    var tits ='does not matter';
//    var sex = 'does not matter';
//    var health = 100;
//    var maxHealth = 100;
//    var power = 2;
//    var attackRange = 4;
//    var damage = 10;
//    var specDamage = 5;
//
//    // Шанс нанести спецудар ногтями або укус у вампіра
//    var chanceSpecDamage = 50;
//    var defence = 0;
//    var speed = 10;
//    var canFly = false;
//    var flySpeed = 0;
//    var canBeInvisible = false;
//    var invisible = false;
//    var canJump = true;
//    var canTeleport = false;
//    var canShoot = false;
//    var canFreeze = false;
//    var isFreeze = false;
//    var FreezeStepLeft = 0;
//
//
//    // Спеціальний навик деяких істот відновлюватися
//    var canHealing = false;
//    var healingMaxPoint = false;
//
//    // Спеціальний навик вампіра, якщо тру - дає можливість відновити здоровся за рахунок нанесеного урона
//    var hasVampBite = false;
//
//    // рівень героя. після перемоги підвищується і запускається метод levelUp()
//    var level = 1;
//    var lookForTrouble = false;
//
//    // масив для збереження історії героя
//    var history = [];
//    var x = x;
//    var y = y;
//    var PathMapStep = 0;
//    var walkedAllWay = false;
//    var nextDestinationPoint = { 'x': x,
//        'y' : y};
//
//    if (clan == 'Vampires') {
//
//
//    }
//    return [clan, name, level, features, hairСolor, beard, tits, sex, health, power, attackRange, damage, specDamage, chanceSpecDamage, defence, speed, canFly, flySpeed, canBeInvisible, invisible, canJump, canTeleport, canShoot, canFreeze, canHealing, healingMaxPoint, hasVampBite,lookForTrouble, x, y]
//}