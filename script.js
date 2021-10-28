var nom = "franck Tanoh";
var statut = "marie";
let doc = "je suis " + nom + " " + statut;
console.log(doc);
if (statut == "celibataire") {
    console.log(nom + " vous avez droit à 50 000");
} 
else{
    console.log(nom + " vous avez droit à 100 000");
}
// var j = 0 
// for(var i=0; i <= 10; i++){
//     console.log(i);
// }
//  var i=0
// do {
//     console.log(i);
//     i++;
// } while (i <= 10);
// var nombres = Array( 1, 2, 3, 4, 5);
var nombres = [1, 2, 3, 4, 5];
// console.log(nombres[0] , nombres[3]);
// for (var i of nombres) {
//     console.log(i);
// }
function calcul(a, b) {
    return a + b;
}
// calcul ();
console.log(calcul(4, 5));