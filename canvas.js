var pantalla = document.querySelector("canvas");
var pincel= pantalla.getContext("2d");
//pincel.fillStyle = "lightgrey";


    //base horca y mastil
    function horca(){
        pincel.fillStyle = "black"
        pincel.beginPath();
        pincel.moveTo(100,600);
        pincel.lineTo(50,620);
        pincel.lineTo(150,620);
        pincel.fill();
    
        // mastil o palo
        pincel.fillRect(95,205,10,400);
        pincel.fillRect(95,205,200,10);
        pincel.fillRect(295,205,10,50);
    }
   
   
    //cabeza
    function cabeza(){
        pincel.fillStyle = "black"
        pincel.beginPath();
        pincel.arc(300,295,40,0,2*3.14);
        pincel.fill();
    }

    // cuerpo
    function cuerpo(){
        pincel.fillStyle = "black"
        pincel.fillRect(295,335,10,130);

    }
 
//brazo Derecho
function brazoDerecho(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.moveTo(305,355);
    pincel.lineTo(380,325);
    pincel.lineTo(380,335);
    pincel.lineTo(305,365);
    pincel.fill();

}

//brazo Izquierdo
function brazoIzquierdo(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.moveTo(295,355);
    pincel.lineTo(220,325);
    pincel.lineTo(220,335);
    pincel.lineTo(295,365);
    pincel.fill();
}

//pierna derecha
function piernaDerecha(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.moveTo(305,455);
    pincel.lineTo(390,505);
    pincel.lineTo(390,515);
    pincel.lineTo(305,465);
    pincel.fill();
}

//pierna izquierda
function piernaIzwuierda(){
    pincel.fillStyle = "black"
    pincel.beginPath();
    pincel.moveTo(295,455);
    pincel.lineTo(210,505);
    pincel.lineTo(210,515);
    pincel.lineTo(295,465);
    pincel.fill();
}
   



   