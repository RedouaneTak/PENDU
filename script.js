let dictionnaire = ['BONJOUR', 'MANGER', 'DORMIR', 'VOLER', 'JOUER','COURIR','MARCHER']
//let dictionnaire = ['BONJOUR'];
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


let clavier = document.getElementById("clavier");
let mots = document.getElementById("mots");
let btnRejouer = document.getElementById("rejouer");
let image = document.getElementById("image");
btnRejouer.addEventListener("click", nouvellePartie);
let resultatSpan = document.getElementById("resultat");
let motsFailedToFind = document.getElementById("motsFailedToFind");

var linkImg = "img/0";

var lol;

nbErreur = 1;
motChoisit = undefined;
motEnRecherche = undefined;


jouer();


function jouer(){

  resultatSpan.style.visibility="hidden";
  motsFailedToFind.style.visibility="hidden";
  var urlImg=linkImg+nbErreur+".png";
  image.style.setProperty("background-image","url('"+urlImg+"')");

  initClavier();
  choisirMot()
  initMotRecherche();
}







function nouvellePartie() {

  nbErreur = 1;
  const touches = clavier.getElementsByTagName("input");

  for(i=0;i<=25;i++){
    touches.item(0).remove();
  }


  const span = document.getElementById("motsRecherche");
  span.remove();

jouer();


}


function initClavier() {

 btnRejouer.style.visibility = "hidden";

  for (i = 0; i < alphabet.length; i++) {

    var lettre = alphabet[i];

    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", lettre);
    button.setAttribute("id", "lettre" + lettre);
    button.setAttribute("name", "lettre" + lettre);
    button.setAttribute("class","lettre");
    button.addEventListener("click", testerLettre);
    button.style.setProperty("background-color", "darkgrey");

    clavier.appendChild(button);

  }

}

function testerLettre(e) {


  var trouver = verifierLettre(e.target.getAttribute("value"))
  griserLettre(e, trouver);
  checkErreur();
  checkMotsIsGood();
  var urlImg=linkImg+nbErreur+".png";
  image.style.setProperty("background-image","url('"+urlImg+"')");

}

function choisirMot() {


  var motChoisitTmp = dictionnaire[Math.round(Math.random() * (dictionnaire.length - 1))];
  console.log(motChoisitTmp.length);
  var motEnRechercheTmp = "";
  for (i = 0; i < motChoisitTmp.length; i++) {

    motEnRechercheTmp += "_";


  }

  motChoisit = motChoisitTmp;
  motEnRecherche = motEnRechercheTmp;
}

function initMotRecherche() {

  var span = document.createElement("span")

  span.setAttribute("id", "motsRecherche");
  mots.appendChild(span);

  span.innerHTML = motEnRecherche;
  motsRechercheVisible = document.getElementById("motsRecherche");


}

function verifierLettre(lettre) {


  var motTmp = "";
  var trouver = false;

  for (i = 0; i < motChoisit.length; i++) {


    if (motChoisit[i].match(lettre)) {

      motTmp += motChoisit[i];
      trouver = true;

    } else {
      motTmp += motEnRecherche[i];
    }
  }


  console.log(motTmp);


 motEnRecherche = motTmp;

 motsRechercheVisible.innerHTML = motEnRecherche;

motsRechercheVisible.innerHTML = motTmp;
  return trouver;


}

function griserLettre(e, trouver) {

  if (trouver) {
    e.target.style.setProperty("color", "darkseagreen");
  } else {

    e.target.style.setProperty("color", "lightcoral");
    nbErreur++;
  }
  e.target.setAttribute("disabled", '');
  e.target.style.setProperty("background-color", "lightgrey")


}

function checkErreur() {

  if (nbErreur == 8) {
    desactiverClavier();
    console.log("PERDUUU");
    btnRejouer.style.visibility = "visible";


    resultatSpan.style.setProperty("color","red");
    resultatSpan.style.visibility="visible";
    resultatSpan.innerHTML="VOUS AVEZ PERDU";

    motsFailedToFind.style.visibility="visible";
    motsFailedToFind.innerHTML=motChoisit;



  }

}
function checkMotsIsGood(){

  if(motChoisit.match(motEnRecherche)){
    desactiverClavier();
    console.log("GAGNEEEEER");
    btnRejouer.style.visibility = "visible";

    resultatSpan.style.setProperty("color","green");
    resultatSpan.style.visibility="visible";
    resultatSpan.innerHTML="C'EST GAGNÉ !!!";
  }

}

function desactiverClavier(){
  const touches = clavier.getElementsByTagName("input");

  for (i = 0; i <= 25; i++) {
    touches.item(i).setAttribute("disabled", '');

  }
}
