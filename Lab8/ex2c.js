var age = 21;
var number = 0;
while (number++ < age) {
    if (number > 0.5*age) {
        throw new Error("Don't ask how old I am!");
    }
    console.log(number);
}
