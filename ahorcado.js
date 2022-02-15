
var btnInicio = document.querySelector("#boton-inicio");
var btnAgregar  =document.querySelector("#boton-agregar");
var inputNuevaPalabra=document.querySelector("#palabra-nueva");
var btnReiniciar= document.querySelector("#boton-reiniciar");



var listaPalabrasSecretas =["LUCIO","CASCADA","FUEGO","HIJASTRO","REMOLINO","ABREVIATURA","COLORIDO","PACIENCIA","ARGENTINA","AMISTAD","OSCURIDAD"];

var inicioJuego = false; // iniciamos el juego en falso

var palabraSecreta; // la usaremos para saber que palabra debe adivinar
var indices = []; // me ayudará a ordenar las letras ingresadas 
var arrayPalabraSecretaSeparada; // usaremos el array para separar la palabra secreta
var arrayCorrectas = []; // guardaremos las letras que son correctas
var arrayIncorrectas = []; // guardaremos las letras incorrectas
var arrayIngresadas= []; // array que guarda los ingresos del usuario
let letrasSinRepetir = []; // guardamos las letras no repetidas



//botón inicio para empezar el juego, se debe mostrar canvas con la palabra sorteada y su dibujo
btnInicio.addEventListener("click",function(event){
    event.preventDefault();
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
    inicioDeJuego();
})

//funcionalidad al boton agregar para ingresar nuevas palabras que digite el usuario

btnAgregar.addEventListener("click",function(event){

    event.preventDefault();

    var palabraIngresada = inputNuevaPalabra.value.toUpperCase().trim(); // elimina espacios en blanco en ambos extremos
  
    //validamos la palabra ingresada 

    if (palabraIngresada == '' || palabraIngresada == null) {
        alert('No ingreso ningún texto')
           }

    if (listaPalabrasSecretas.indexOf(palabraIngresada) >= 0 ) {
            alert("Palabra ya ingresada.");
             return;
        }

    //ingresamos en nuestra lista la palabra secreta del input usando el método push
    listaPalabrasSecretas.push(inputNuevaPalabra.value.toUpperCase()); // llevamos a mayúscula la palabra ingresada

    //limpiamos el input y hacemos foco en el con el cursor
    inputNuevaPalabra.value = "";
    inputNuevaPalabra.focus();
})

btnReiniciar.addEventListener("click",function(event){
    event.preventDefault();
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
    inicioDeJuego();
})


//sorteo de palabra aleatoria usamos splice para eliminar la palabra secreta sorteada así no se repita

function sortearPalabra(){

    var indiceAleatorio = Math.floor(Math.random()*listaPalabrasSecretas.length);
    palabraSecreta = listaPalabrasSecretas[indiceAleatorio];
    listaPalabrasSecretas.splice(indiceAleatorio,1); // pasamos dos parametros para eliminar la palabra del arreglo
    return palabraSecreta;

}

//con el metodo split obtenemos un array de la palabra secreta
function crearArrayDePalabraSecreta(palabra){
    palabraSeparada = palabra.split("");
    arrayPalabraSecretaSeparada = palabraSeparada;
}
//dibujaremos los guiones de la palabra a adivinar

function dibujarGuionesDePalabraSecreta(){
    var inicioX = 350;
    var inicioY = 610;
    var contador = 0;
    var cantidadLetras = palabraSecreta.length;

    while (contador<cantidadLetras){
        pincel.fillStyle = "yellow";
        pincel.fillRect(inicioX+(40*contador),inicioY,30,4);
        contador++;
    }
}



//--------dibuja la pieza del ahorcado correspondiente segun la cantidad de errores

function dibujarAhorcado(){
    var contador = arrayIncorrectas.length;
    if (contador===1){
        cabeza()
    }else if(contador===2){
        cuerpo()
    }else if(contador===3){  
        brazoDerecho()
    }else if(contador===4){
        brazoIzquierdo()
    }else if(contador===5){
         
    }else if(contador===6){  
        piernaIzquierda()
    }
}

//crea un array de letras sin repetir para comprobar si ganaron o no el juego

function crearArrayLetrasNoRepetidas(){
    for ( var i=0 ; i<palabraSecreta.length; i++){
        if(!letrasSinRepetir.includes(palabraSecreta[i])){ // sin el array no incluye alguna letra de la palabra secreta
            letrasSinRepetir.push(palabraSecreta[i]); // la agregamos al array
        }
    }
}
//--------comprueba si el juego ha terminado con resultado positivo
function verificarSiGano(){
    let palabraSecreta = letrasSinRepetir.sort().toString();
    let letrasCorrectas = arrayCorrectas.sort().toString();
    if(palabraSecreta===letrasCorrectas){
        pincel.fillStyle = "green";
        pincel.font = "50 px Gloria Hallelujah cursive";;
        pincel.fillText("Ganaste, felicidades!",600,400);
        inicioJuego = false;
        btnReiniciar.focus();
        letrasSinRepetir = [];
    }
}
//--------comprueba si el juego ha terminado con resultado negativo
function verificarSiPerdio(){
    if(arrayIncorrectas.length>5){
        pincel.fillStyle = "red";
        pincel.font = "50px Gloria Hallelujah cursive";
        pincel.fillText("Perdiste,fin del Juego!",600,400);
        inicioJuego = false;
        alert("la palabra era " + palabraSecreta);
        btnReiniciar.focus();
        letrasSinRepetir=[];
    }
}

//dibuja o muestra las letras que no están en la palabra a adivinar
function dibujarLetrasIncorrectas(letrasIncorrectas){
    var inicioX = 400;
    var inicioY = 200;
    pincel.fillStyle = "white";
    pincel.font = "45px Gloria Hallelujah";
    pincel.fillText("letras incorrectas: " + letrasIncorrectas.toString(),inicioX,inicioY);
}



//Array que tiene los índices de las letras ingresadas, para poder dibujar letras repetidas 

function buscarIndices(){
    if (inicioJuego){
    var indiceBuscado = arrayPalabraSecretaSeparada.indexOf(arrayIngresadas[0]);
        while (indiceBuscado != -1) { //el -1 es el return de indexOf si no encuentra el elemento
            indices.push(indiceBuscado);
            indiceBuscado = arrayPalabraSecretaSeparada.indexOf(arrayIngresadas[0], indiceBuscado + 1);
  }
}
}
//--------coloca cada letra en el lugar que deberia aparecer
function dibujarletrasCorrectas(arrayOrden){
    var inicioX = 358;
    var inicioY = 600;
        for(i=0;i<arrayOrden.length;i++){
            pincel.fillStyle = "orange";
            pincel.font = "45px Georcia";
            pincel.fillText(arrayIngresadas[0],inicioX+(40*arrayOrden[i]),inicioY);
        }
        indices = [];
}
//captura teclas ingresadas por el usuario y las guarda en el array segun estan o no en la palabra sorteada
//dibuja las piezas del ahorcado y comprueba el resultado

document.addEventListener("keyup", function(event){
    arrayIngresadas = [];
    var letra = event.key.toUpperCase();
    var codigo = letra.charCodeAt();
    if (inicioJuego){
    if(codigo>64 && codigo<91){
        arrayIngresadas.push(letra);
        buscarIndices();
        dibujarletrasCorrectas(indices);
        var comparador = arrayIncorrectas.length;
        if(arrayPalabraSecretaSeparada.includes(letra)){
            if(!arrayCorrectas.includes(letra)){
                arrayCorrectas.push(letra);
            }
        }else if(!arrayIncorrectas.includes(letra)){
            arrayIncorrectas.push(letra);
        }
        if(comparador<arrayIncorrectas.length){
            dibujarLetrasIncorrectas(arrayIncorrectas);
        }
        dibujarAhorcado();
        }
    verificarSiGano();
    verificarSiPerdio();
    } 
});


function inicioDeJuego(){

    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
    horca(); // primer dibujo que se mostrará
    crearArrayDePalabraSecreta(sortearPalabra());
    dibujarGuionesDePalabraSecreta();
    crearArrayLetrasNoRepetidas();
    inicioJuego = true;
    arrayIngresada = [];
    arrayCorrectas = [];
    arrayIncorrectas = [];
}