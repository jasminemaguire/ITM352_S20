var age = 21;
var number = 0;
while (number++ < age) {
    if ((number > 0.5*age) && (number<age*0.75)) {
        console.log("No age zone!");
        continue;
    }
    console.log(number);
}
