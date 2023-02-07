//Tareas

const tareas = [
{
  Titulo: "Estructurar html",
  Estado: "Realizado",
},
{
  Titulo: "Diseñar css",
  Estado: "En progreso",
},
{
  Titulo: "Interacturar js",
  Estado: "Pendiente",
},
  {
  Titulo: "Programar js",
  Estado: "En progreso",
},
];
  
  console.log(tareas);


// Modo oscuro
const $buttonModo = document.querySelector(".modo")
const $body = document.querySelector(".body")

$buttonModo.addEventListener("click", (e) => {
    $body.classList.toggle("dark")
})



// Fecha
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};


const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const botonOrdenar = document.querySelector('#boton-ordenar')

const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST

let id 


// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado,editado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 
    if(editado) {return} // si existe editado es true si no es false 


    const EDITADO = editado
    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : '' 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <i class="far ${EDITADO}" data="editado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        <i class="fa-sharp fa-solid fa-pen-to-square"data="editado" id="${id}"></i>
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)

}


// funcion de Tarea Realizada, eliminada y editada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true //Si
  
}

function tareaEliminada(element){
 
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)
}


function tareaEditada(element){

     element.parentNode.parentNode.appendChild(element.parentNode)
     LIST[element.id].editado = true
     console.log(LIST)
 }
 


// Evento para habilitar botones

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false,
            editado: false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }

})



document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false,
            editado: false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        input.value = ''
        id++
        console.log(LIST)
        }
    }
    
})


lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("eliminado")
    }

    else if(elementData == 'editado') {
        tareaEditada(element)
        console.log("editado")
    }



    localStorage.setItem('TODO',JSON.stringify(LIST))
})




let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado,item.editado)
    })
}


// Modal
const open = document.getElementById('open')
const modal_container = document.getElementById('#modal_container');
const close = document.getElementById('close')

open.addEventListener('click', () => {
    modal_container.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container.classList.add('show');
});













///////////
// Agregar tarea:


  // function añadirTareas (titulo, estado) {
  //   tareas.push ({Titulo: titulo, Estado: estado});
  //   return tareas
  // }
  // console.log (añadirTareas("Estructurar html", "Ejecutar web"));
  
  // const añadirTareas = (estado) => {
  // }
  
  // const progress = tareas.find ((obj) => {
  // console.log(obj)
  // tareas.Estado === "En progreso"
  
  // })
  
  // console.log (progress ("En progreso"))
  


  // Listar tareas


  // const registrarTareas = (estado) => {
  
  //     if (estado === "En Progreso" || estado === "Pendiente" || estado === "Terminado") {
  //         const registroTareas = tareas.filter(tareas => tareas.Estado === estado);
  //         return registroTareas;
  
  //     } else {
  //         return tareas;
  //     }
  // }
  
  // console.log(registrarTareas("Pendiente"))
  
  
  // Agregar Verificación

  
  
  // const añadirTareas = (titulo, estado) => {
  // if (tareas[index].Titulo === titulo)  {
  //   return "Alerta: La tarea ya existe"
  // } else {
  //   tareas.push({Titulo: titulo, Estado: estado})
  //   return tareas
  //   }
  // }
  

  // ¿Existe tarea?

  
// const existeTarea = (str) => {

// tareas.forEach(tarea => {
//   if(tarea.Titulo.includes(str)) {
//     tareasEncontradas.push(tarea)
//   }
// })
// if(tareasFiltradas.length === 0) {
//   return "No coinciden"
// }
// return tareasEncontradas
// console.log(existeTarea("js"))

// }



// function $(elementoDeHtml) {
//     return document.querySelector(elementoDeHtml)
// }

// window.addEventListener("load", () =>{
    
//     // Modal
//     const $openButton = document.querySelector("#open-modal")
//     const $containModal = document.querySelector(".contain-modal")
//     const $closeButton = document.querySelector("#close-modal")
   
//     // Contenedor de tareas
//     const $containPendient = document.querySelector(".contain-tareas")

//     // Botones de filtrado
//     const $filterPendient = document.querySelector("btn-filterPendient")
//     const $filterInProgress = document.querySelector("btn-filterInProgress")
//     const $filterFinish = document.querySelector("btn-filterFinish")


//     // Eventos Modal  
//     $openButton.addEventListener("click", (event) => {
//         event.preventDefault();
//         $containModal.classList.add("show-modal")
//     })
//     $closeButton.addEventListener("click", (event) => {
//         event.preventDefault();
//         $containModal.classList.remove("show-modal")
//     }) 
    
//     $openButton.onClick = (event) => {
//         event.preventDefault();
//         $containModal.classList.add("show-modal")
//     } 
    
//     })