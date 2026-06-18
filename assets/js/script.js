// Seclectionner les element du dom
let toggleBiblio = document.querySelector(".toggle-bibliotheque");

let hidenBiblio = document.querySelector(".hiden-bibliotheque");
let btnTelBiblio = document.querySelector(".btn-tel-bibliotheque");
let btnEmailBiblio = document.querySelector(".btn-email-bibliotheque");

let btnLancer = document.querySelector("#btn-lancer");
let toggleScore = document.querySelector(".toggle-score");
let pourcentage = document.querySelector(".div-pourcentage");
let paraPourcentage = document.querySelector(".pourcentage");
let resultatTest = document.querySelector(".resultat-test")

let inputRegex = document.querySelector(".input-regex");
let btnTelTest = document.querySelector(".btn-tel-test");
let btnEmailTest = document.querySelector(".btn-email-test")
let textareaTest = document.querySelector(".test")
let btnEffacer = document.querySelector(".btn-effacer");
let btnCopier = document.querySelector(".btn-copier");
let erreur = document.querySelector(".erreur")
let compteurReussi = 0;
let compteurTest = 0; 


// function pour les différents toogle 
const funcToggle = (btn,content)=>{
    // pour ajouter la class hiden au element 
    const isHiden = content.classList.toggle("hiden")
    // si la class isHiden existe alors on change le logo 
    btn.classList.toggle("bi-arrow-down-short",isHiden)
    // si la class isHiden = false alors on change de logo 
    btn.classList.toggle("bi-arrow-up-short",!isHiden)
}

// le toggle de bibliotheque de regex
toggleBiblio.addEventListener("click", () => {
    funcToggle(toggleBiblio, hidenBiblio); 
});

// toggle pour afficher les pourcentages 
toggleScore.addEventListener("click",()=>{
    funcToggle(toggleScore, pourcentage); 
})

// FONCTION POUR VALIDER LA STRUCTURE DES REGEX  
function funcVerificationRegex(regexValue){
    // Nombre maximum de caractere qu'on peut ecrire dedans 
   
//    pour verifier que le regex est bon on verifie les symbole 
    let symbolesRegex = /[\[\]\(\)\*\+\?\.\\\^\$\|\{\}]/;
    // verifie que le ce n'est pas vide 
   if(regexValue==""){
     erreur.textContent="Erreur tu dois saisir un regex "
     erreur.style.color="red";
     return false;
   }
    //  si il n'y a aucun symbole c'est du texte 
    if(!symbolesRegex.test(regexValue)) {
    erreur.textContent="";
    erreur.textContent="Attention ceci a ressemble a du texte et pas à un regex"
     erreur.style.color="red";
     return false;
    
   }
//    Verifie que le reegx est syntaxiquement correcte 
    try {
        new RegExp(regexValue);
    } catch (e) {
        erreur.textContent = "Regex invalide : " + e.message;
        erreur.style.color = "red";
        return false;
    }

   
   erreur.textContent="";
    // appelle de la function pour faire les test
    return true;
}

// Pour lancer les test
btnLancer.addEventListener("click",(e)=>{
    e.preventDefault();
    let regexValue = inputRegex.value.trim();
    if(funcVerificationRegex(regexValue)){
        // funcTest(regexValue)
        funcTest(regexValue).catch(err => {
            erreur.textContent = "Erreur inattendue : " + err.message;
            erreur.style.color = "red";
    });
    }
})


//FUNCTION POUR LES TEST
async function funcTest(regexValue) {
    compteurTest = 0;
    compteurReussi = 0;
    erreur.textContent = "";

    const MAX_CHARS = 6000;
    let testValue = textareaTest.value.trim();

    // Protection taille des entrées
    if (testValue === "") {
        erreur.textContent = "Erreur tu dois saisir un test";
        erreur.style.color = "red";
        return;
    }

    if (testValue.length > MAX_CHARS) {
        erreur.textContent = "Trop de données (max 6 000 caractères)";
        erreur.style.color = "red";
        return;
    }

    let lignes = testValue.split("\n");

    for (const ligne of lignes) {

        if (ligne.trim() === "") continue; 

        const analyse = ligne.match(/^(\[(?:OK|KO)\])\s*(.*)/i);

        if (analyse) {
            let indicateur = analyse[1].toUpperCase();
            const text = analyse[2].trim();

            let estValide = false;

            // Protection ReDoS via Web Worker + timeout
            try {
                estValide = await testerAvecTimeout(regexValue, text, 200);
            } catch (err) {
                erreur.textContent = "⚠️ " + err.message;
                erreur.style.color = "red";
                return; 
            }

            compteurTest++;
            let reussite = false;
            if (indicateur === "[OK]" && estValide) reussite = true;
            if (indicateur === "[KO]" && !estValide) reussite = true;

            if (reussite) compteurReussi++;

        } else {
            erreur.textContent = "Format invalide — ton test doit commencer par [OK] ou [KO]";
            erreur.style.color = "red";
            return; // on arrête dès la première ligne mal formatée
        }
    }

    // Affichage des résultats
    resultatTest.textContent = `${compteurReussi} / ${compteurTest}`;
    paraPourcentage.textContent = calculerScore(compteurReussi, compteurTest) + "%";
}

// FONCTION POUR EVITER LES ATTAQUE REDOS 
function testerAvecTimeout(regexValue, text, timeout = 200) {
    return new Promise((resolve, reject) => {
        const worker = new Worker("assets/js/regexWorker.js");
        const timer = setTimeout(() => {
            worker.terminate();
            reject(new Error("Timeout : regex trop complexe ou potentiellement dangereuse"));
        }, timeout);

        worker.onmessage = (e) => {
            clearTimeout(timer);
            worker.terminate();
            if (e.data.ok) resolve(e.data.resultat);
            else reject(new Error(e.data.erreur));
        };

        worker.postMessage({ regexValue, text });
    });
}

// FONCTION POUR CALCULER LE SCORE 
function calculerScore(succes,total){
    if (total ==0) return 0;
    let resultat = (succes / total) *100
    return Math.round(resultat)
}

// POUR EFFACER LE TEXTE 
btnEffacer.addEventListener("click",() =>{

    inputRegex.value="";
    textareaTest.value="";
    paraPourcentage.textContent="0%";
    resultatTest.textContent="0 /0";
   
})
// FUNCTION POUR COPIER DANS LE PRESSE PAPIER LE REGEX
function funcCopier(regexValue){
    navigator.clipboard.writeText(regexValue)
    .then( ()=>{
        // Affiche un message pour dire que le texte a etait copié 
        erreur.textContent="Le Regex à était copié ! ";
        erreur.style.color="green";
        // s'efface au bou de 2s 
        setTimeout(() => {
            erreur.textContent="";
        }, 2000);
    } )
    .catch(err=>{
        console.error("Erreur lors de la copie ",err)
    })
}
// POUR COPIER QUAND ON CLIQUE SUR LE BTN 
btnCopier.addEventListener("click",()=>{
    let regexValue = inputRegex.value.trim();
    if(funcVerificationRegex(regexValue)){
        funcCopier(regexValue);

    }
    
})

// FONCTION POUR LA BIBLIOTHEQUE DE REGEX 
function regexBibliotheque(regex){
    inputRegex.value="";
    inputRegex.value = regex;
}

btnTelBiblio.addEventListener("click",() =>{
   
    regexBibliotheque("^0[1-9][0-9]{8}$");
   
})

btnEmailBiblio.addEventListener("click",()=>{
    regexBibliotheque("^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$");
})
// fonction pour ecrire des test
function funcTestBiblio(valueTest){
    const test = valueTest;
    return textareaTest.value=test;
}
// Test pouir le bouton tel 
btnTelTest.addEventListener("click",() =>{
    // console.log(textareaTest)
   funcTestBiblio(`[OK] 0612345678
[OK] 0145879632
[KO] 12345
[KO] 06123abc78
[KO] 0012345678`)
})

btnEmailTest.addEventListener("click",()=>{
    funcTestBiblio(`[OK] contact@domaine.com
[KO] email@domaine.c
[OK] mon_email-123@web-site.org
[KO] test.nom@sous.domaine.net
[OK] email@domaine.longueextension
`)
})