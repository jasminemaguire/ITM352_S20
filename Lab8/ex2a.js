var age = 21;
var number = 1;
while (number <= age) {
    console.log(number);
    number++;
    if (number >= 0.5*age) {
        console.log("I'm old!")
        break;
    }
}
