const cuadro = document.querySelectorAll('.cuadro-datos')

const daily = document.querySelector('.daily')
const weekly = document.querySelector('.weekly')
const monthly = document.querySelector('.monthly')

var enlaces = document.querySelectorAll('.card-link')

enlaces.forEach(function(enlace){
    enlace.addEventListener('click', function(event){
        if(!event.target.matches('.card-link')) {
            return;
        }
        const target = event.target;
        definirClick(target)
    })
})

function definirClick(target) {
    var contenido = target.innerHTML;   
    console.log(contenido)
    if(contenido == 'Daily'){
        console.log('diario')
        target.classList.add('activado')
        weekly.classList.remove('activado')
        monthly.classList.remove('activado')
        ponerDia("daily","Yesterday")

    }
    if(contenido == 'Weekly'){
        console.log("semanal")
        target.classList.add('activado')
        daily.classList.remove('activado')
        monthly.classList.remove('activado')
        ponerDia("weekly", "Last Week")
        
    }
    if(contenido == 'Monthly'){
        console.log("mensual")
        target.classList.add('activado')
        daily.classList.remove('activado')
        weekly.classList.remove('activado')
        ponerDia("monthly","Last Month")
    }
}

function ponerDia(indicador, frase){
    var objeto=cargarDatos()
    console.log(objeto)
    var elementos = []
    for(var i=0; i<objeto.length; i++){
        elementos.push(objeto[i]["timeframes"][indicador])
    }
    console.log(elementos)
    
    asignarDia(elementos, frase)
}

function asignarDia(elementos, frase) {
    var nodos = obtenerCards()
    console.log("hijo", nodos[0]["children"][2]["innerHTML"],nodos[0]["children"][3]["innerHTML"])
    console.log("elementos" , elementos[0]["current"])
    for (let index = 0; index < nodos.length; index++) {
        //Actual
        nodos[index]["children"][2]["innerHTML"] = `${elementos[index]["current"]}hrs`
        nodos[index]["children"][3]["innerHTML"] = `${frase} - ${elementos[index]["previous"]}hrs`
    }
}

function obtenerCards() {
    var nodos = []
    cuadro.forEach(function (userItem){
        nodos.push(userItem)
      })
      console.log("nodos", nodos)
      return nodos;
        
}
const requestURL = 'data.json'
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

function cargarDatos() {
    const horarios = request.response;
    return horarios
}
