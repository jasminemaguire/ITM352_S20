age = 14;
military = false;

if (age == 100) {
        document.write("<P>You get in for free!");
} else if (age <= 16) {
        document.write("<P>Student discount");
} else if (military == true) {
    document.write("<P>Military discount");
} else {
    document.write("<P>Full price ticket");
}