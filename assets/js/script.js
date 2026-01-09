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

// Pour faire le toggle 
// toggleBiblio.addEventListener("click",() =>{
    
    
//     const isHiden = hidenBiblio.classList.toggle("hiden");
//     console.log(isHiden)

//     toggleBiblio.classList.toggle("bi-arrow-down-short",isHiden)
   
//     toggleBiblio.classList.toggle("bi-arrow-up-short",!isHiden)
// })
const funcToggle = (btn,content)=>{
    const isHiden = content.classList.toggle("hiden")
    btn.classList.toggle("bi-arrow-down-short",isHiden)
    btn.classList.toggle("bi-arrow-up-short",!isHiden)
}

toggleBiblio.addEventListener("click", () => {
    funcToggle(toggleBiblio, hidenBiblio); 
});

toggleScore.addEventListener("click",()=>{
    funcToggle(toggleScore, pourcentage); 
})