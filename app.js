// Evento que asegura la funcionalidad al cargar HTML
window.onload = () => {
    // Función que selecciona un elemento
    const $ = (selector) => document.querySelector(selector);

    // .........................................Inicio de selecciones de elementos.........................................
    const $cuerpo = $(".cuerpo"); // Modo Oscuro
    const $botonModo = $(".modo"); // Modo Oscuro
    const $lista = $(".lista"); // Manejo de Tareas
    const $entrada = $("#entrada"); // Manejo de Tareas
    const $botonAgregar = $("#boton-agregar"); // Manejo de Tareas
    const $botonOrdenar = $("#boton-ordenar"); // Manejo de Tareas
    const $modal = $("#modal"); // Edición de Tareas
    const $tituloEditar = $("#titulo-editar"); // Edición de Tareas
    const $descripcionEditar = $("#descripcion-editar"); // Edición de Tareas
    const $estadoEditar = $("#estado-editar"); // Edición de Tareas
    const $botonCerrar = $(".cerrar"); // Edición de Tareas
    const $botonGuardarCambios = $("button[onclick='guardar-cambios()']"); // Edición de Tareas

    // .........................................Inicio de variables............................................................

    let LIST = [];
    let id = 0;

    // ....................................................Inicio de Funciones....................................................

    // Función para cambiar entre modo claro y oscuro
    function cambiarModo() {
        $cuerpo.classList.toggle("oscuro");
    }

    // Validar entrada de datos
    function validarEntrada(texto) {
        return (
            texto.trim() !== "" && !LIST.some((tarea) => tarea.titulo === texto)
        );
    }

    // Función para obtener el icono según el estado de la tarea
    function obtenerIconoEstado(estado) {
        const iconos = {
            Pendiente:
                "<i class='fas fa-hourglass-start' style='color: darkorange;'></i>",
            "En Progreso":
                "<i class='fas fa-spinner' style='color: yellow;'></i>",
            Completada:
                "<i class='fas fa-check-circle' style='color: green;'></i>",
        };
        return iconos[estado] || "";
    }

    // Función para agregar tarea a la lista y al DOM
    function agregarTarea(tarea) {
        const $elemento = document.createElement("li");
        $elemento.id = `tarea-${tarea.id}`;
        $elemento.innerHTML = `
            <p class="texto">${tarea.titulo}</p>
            <span class="estado">${obtenerIconoEstado(tarea.estado)}</span>
            <button class="eliminar" aria-label="eliminar-tarea" style="background: none; color: white; border: none;">
                <i class="fas fa-trash" data-id="${tarea.id}"></i>
            </button>
            <button class="editar" aria-label="editar-tarea" style="background: none; color: white; border: none;">
                <i class="fas fa-pen" data-id="${tarea.id}"></i>
            </button>
        `;
        $lista.appendChild($elemento);
    }

    // Función para manejar el evento de agregar tarea
    function manejarAgregarTarea() {
        const tituloTarea = $entrada.value.trim();
        if (validarEntrada(tituloTarea)) {
            const nuevaTarea = {
                titulo: tituloTarea,
                estado: "Pendiente",
                id: id++,
            };
            LIST.push(nuevaTarea);
            renderizarTareas(); // Renderizamos las tareas inmediatamente
            guardarTareas();
            $entrada.value = "";
        } else {
            alert("Por favor, ingresa un título válido y único para la tarea.");
        }
    }

    // Función para ordenar las tareas alfabéticamente
    function ordenarTareas() {
        LIST.sort(function (a, b) {
            return a.titulo.localeCompare(b.titulo);
        });
        renderizarTareas(); // Renderizamos las tareas inmediatamente
        guardarTareas();
    }

    // Función para abrir el modal con datos de la tarea
    function abrirModal(tarea) {
        $modal.dataset.index = tarea.id;
        $tituloEditar.value = tarea.titulo || "";
        $descripcionEditar.value = tarea.descripcion || "";
        $estadoEditar.value = tarea.estado || "Pendiente";
        $modal.style.display = "block";
    }

    // Función para guardar cambios en el modal
    function guardarCambios() {
        const index = parseInt($modal.dataset.index, 10);
        const tarea = LIST.find(function (t) {
            return t.id === index;
        });
        tarea.titulo = $tituloEditar.value;
        tarea.descripcion = $descripcionEditar.value;
        tarea.estado = $estadoEditar.value;
        guardarTareas();
        renderizarTareas();
        cerrarModal();
    }

    // Función para cerrar el modal
    function cerrarModal() {
        $modal.style.display = "none";
        $modal.dataset.index = "";
        $tituloEditar.value = "";
        $descripcionEditar.value = "";
        $estadoEditar.value = "Pendiente";
    }

    // Función para renderizar todas las tareas
    function renderizarTareas() {
        $lista.innerHTML = LIST.map(function (tarea) {
            return `
                <li id="tarea-${tarea.id}">
                    <p class="texto">${tarea.titulo}</p>
                    <span class="estado">${obtenerIconoEstado(
                        tarea.estado
                    )}</span>
                    <button class="eliminar" aria-label="eliminar-tarea" style="background: none; color: white; border: none;">
                        <i class="fas fa-trash" data-id="${tarea.id}"></i>
                    </button>
                    <button class="editar" aria-label="editar-tarea" style="background: none; color: white; border: none;">
                        <i class="fas fa-pen" data-id="${tarea.id}"></i>
                    </button>
                </li>
            `;
        }).join("");
    }

    // Función para guardar tareas en localStorage
    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(LIST));
    }

    // Función para cargar tareas desde localStorage al iniciar
    function cargarTareas() {
        const tareasGuardadas = localStorage.getItem("tareas");
        if (tareasGuardadas) {
            LIST = JSON.parse(tareasGuardadas).filter(function (t) {
                return t.titulo;
            });
            id = LIST.length;
            renderizarTareas();
        }
    }

    // ...................................................Inicio de Eventos....................................................
    // Evento para cambiar entre modo claro y oscuro
    $botonModo.addEventListener("click", cambiarModo);

    // Eventos para agregar tarea al presionar Enter o hacer clic en el botón +
    $botonAgregar.addEventListener("click", manejarAgregarTarea);
    $entrada.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            manejarAgregarTarea();
        }
    });

    // Evento para ordenar las tareas alfabéticamente
    $botonOrdenar.addEventListener("click", ordenarTareas);

    //  Eventos para manejar la edición de tarea
    $botonCerrar.addEventListener("click", cerrarModal);
    $botonGuardarCambios.addEventListener("click", guardarCambios);
    window.addEventListener("click", function (event) {
        if (event.target === $modal) {
            cerrarModal();
        }
    });

    //  Evento para detectar acciones en la lista (editar o eliminar)
    $lista.addEventListener("click", function (event) {
        const elemento = event.target;
        const idElemento = parseInt(elemento.dataset.id, 10);

        if (elemento.classList.contains("fa-trash")) {
            LIST = LIST.filter(function (tarea) {
                return tarea.id !== idElemento;
            });
            renderizarTareas(); // Renderizamos las tareas inmediatamente
            guardarTareas();
        } else if (elemento.classList.contains("fa-pen")) {
            const tarea = LIST.find(function (t) {
                return t.id === idElemento;
            });
            abrirModal(tarea);
        }
    });

    // ......................................................Inicialización......................................................
    cargarTareas();
};
