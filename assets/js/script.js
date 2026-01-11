// Seclectionner les element du dom
let toggleBiblio = document.querySelector(".toggle-bibliotheque");

let hidenBiblio = document.querySelector(".hiden-bibliotheque");
let btnTelBiblio = document.querySelector(".btn-tel-bibliotheque");
let btnEmailBiblio = document.querySelector(".btn-email-bibliotheque");

let btnLancer = document.querySelector("#btn-lancer");
let toggleScore = document.querySelector(".toggle-score");
let pourcentage = document.querySelector(".div-pourcentage");
let paraPourcentage = document.querySelector(".pourcentage");

let inputRegex = document.querySelector(".input-regex");
let btnTelTest = document.querySelector(".btn-tel-test");
let btnEmailTest = document.querySelector(".btn-email-test")
let textareaTest = document.querySelector(".test")
let btnEffacer = document.querySelector(".btn-effacer");
let btnCopier = document.querySelector(".btn-copier");

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


// Fonction pour verifier l'expression 
btnLancer.addEventListener("click",(e) =>{
    e.preventDefault()
    // Selectionne le p pour afficher le message erreur 
    let erreur = document.querySelector(".erreur")
    // pour recuperer la valeur du texte 
   let regexValue = inputRegex.value.trim();
//    pour verifier que le regex est bon on verifie les symbole 
    let symbolesRegex = /[\[\]\(\)\*\+\?\.\\\^\$\|\{\}]/;

   if(regexValue==""){
     erreur.textContent="Erreur tu dois saisir un regex "
    return erreur.style.color="red";
   }
//    si il n'y a aucun symbole c'est du texte 
   else if(!symbolesRegex.test(regexValue)) {
    erreur.textContent="";
    erreur.textContent="Attention ceci a ressemble a du texte et pas à un regex"
    return erreur.style.color="red";
    
   }else{

    erreur.textContent="";
    // appelle de la function pour faire les test
    funcTest(regexValue)
   }
   
})

// function pour un test 
function funcTest(regexValue){
    
    console.log(regexValue)
    // recuperation du test 
    let testValue = textareaTest.value.trim()
    let lignes = testValue.split("\n");
    // on boucle sur lignes 
    lignes.forEach((ligne) => {
        // verifie le KO et OK 
        const analyse = ligne.match(/^(\[(?:OK|KO)\])\s*(.*)/i);
        // Si analyse == true 
        
        if(analyse){
            let indicateur = analyse[1].toUpperCase()
            const text = analyse[2].trim()
            // console.log("indicateur :",indicateur)
            // console.log("text : ",text)
            console.log(analyse.length)
        }

    });
    
    
}