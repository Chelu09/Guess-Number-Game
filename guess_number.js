/*
Instructiuni crearea jocului

1. Generarea unui numar aleatoriu

2. Registrarea numarului si incercarii la care jucatorul este, incepand cu 1

3. A da jucatorului un indiciu

4. Cand numarul este submis, sa se inregistreze intr un loc si jucatorul sa vada incercarile

5. Verifica daca nr este corect

6. Daca este corect
        - arata mesaj fericit
        - nu lasa pe jucator sa mai incerce
        - arata un buton ca sa reia jocul

7. Daca este incorect
        - spune-i ca a gresit
        - lasa-l sa incerce din nou
        - creste numaru de incercari
        - continua

8. Daca jucatorul esueaza ca nu mai are incercari,
spune-i ca jocu a luat sfarsit si fa-l sa nu mai poata sa scrie
si sa-i dai optiunea de a relua jocul

9. Cand jocul se reia fi sigur ca logica jocului si interfata jucatorului
sunt restaurate si totul se reia de la inceput

*/

//Generam numarul aleatoriu

let randomNumber = Math.floor(Math.random() * 100) + 1;

//Ne referam la informatiile din paragraf (html)

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

//Ne referam la inputul si butonul din html

const GuessSubmit = document.querySelector(".GuessSubmit");
const GuessField = document.querySelector(".GuessField");

//Variables para los intentos
//La segunda variable guarda la referencia al button reset
let guessCount = 1;
let resetButton;
GuessField.focus();

//Functia care va fi numarul pe care il ghicim
function checkGuess(){
    //Guardamos el valor ingresado en el input y nos aseguramos
    //que es un numero, con Number()

    let userGuess = Number(GuessField.value);

    //Comprobamos si estamos en el primer intento
    if(guessCount === 1){
        guesses.textContent = "Incercari anterioare ";
    }
    guesses.textContent += userGuess + " ";

    //En este bloque comprobaremos los pasos del 5 al 8
    if(userGuess === randomNumber){
        lastResult.textContent = "Felicitari! Ai ghicit bulangiule!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    }else if (guessCount === 10){
          lastResult.textContent = "Esti ca pula...";
        setGameOver();
    } else {
        lastResult.textContent = "Incorect!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber){
            lowOrHi.textContent = "Numarul este prea mic!";
        }else if (userGuess > randomNumber){
            lowOrHi.textContent = "Numarul este prea mare!";
        }
    }
    //Preparamos la variables para el siguiente intento
    //Vaciamos el valor del campo numero (input)
    //Aplicamos el foco al input
    guessCount++;
    GuessField.value = "";
    GuessField.focus();
}

//Agregamos un listener al buton guessSubmit
GuessSubmit.addEventListener("click", checkGuess);

//Declaramos la function gameover
function setGameOver(){
    GuessField.disabled = true; //Deshabilita el input
    GuessSubmit.disabled = true;
    //Creamos un buton para resetear el juego y lo agregamos al html
    resetButton = document.createElement("Button");
    resetButton.textContent = "Incepe un joc nou!";
    document.body.append(resetButton);

    //Creamos un listener al buton creado
    resetButton.addEventListener("click", resetGame);
}

//Creamos la function reset game
function resetGame(){
    guessCount = 1;
    const resetParas = document.querySelectorAll(".resultParas p");
    for(let i = 0; i < resetParas.length; i++){
        resetParas[i].textContent = "";
    }
    resetButton.parentNode.removeChild(resetButton);

    GuessField.disabled = false;
    GuessSubmit.disabled = false;
    GuessField.value = "";
    GuessField.focus();

    lastResult.style.backgroundColor = "black";

    randomNumber = Math.floor(Math.random()*100) + 1;
}