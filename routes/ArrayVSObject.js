

var myArray  = [];
var myArrayOfObjects =[];
var ArrySum=0;
var startTime = new Date();
// --------------------- Замір швидкості роботи з масивом ---------------------------------------------------------------
// ініціалізація масиву, запис випадкових чисел
myArray[0] =[];
myArray[1] =[];

for (var i = 100000; i>=0; i--) {


    myArray[0][i] = Math.random();
    myArray[1][i] = Math.random();
}
console.log('На ініціалізацію двухмірного масиву було потрачено:',new Date() - startTime ,' мілісекунт');

startTime = new Date();
//Зчитування з масиву
for (var i = 100000; i>=0; i--) {
    ArrySum += myArray[0][i]+myArray[1][i];
}
console.log('На зчитування двухмірного масиву було потрачено:',new Date() - startTime ,' мілісекунт');


// --------------------- Замір швидкості роботи з масивом Обектів---------------------------------------------------------------
startTime = new Date();
for (var i = 100000; i>=0; i--) {
    myArrayOfObjects[i] = {};
    myArrayOfObjects[i].x = Math.random();
    myArrayOfObjects[i].y = Math.random();

}
console.log('На ініціалізацію масиву обєктів було потрачено:',new Date() - startTime ,' мілісекунд');

startTime = new Date();
//Зчитування з масиву
for (var i = 100000; i>=0; i--) {
    ArrySum += myArrayOfObjects[i].x + myArrayOfObjects[i].y;
}
console.log('На зчитування масиву обєктів було потрачено:',new Date() - startTime ,' мілісекунд');



