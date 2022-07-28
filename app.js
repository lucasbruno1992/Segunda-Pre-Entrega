let bienvenida = document.querySelector(".bienvenida");
let usuario = []
let nombreUsuario = prompt(`Ingrese nombre: `); //A nombreUsuario le asigno una variable que le ingreso mediante prompt
usuario.push(nombreUsuario.toUpperCase()) // Guardo en el array vacio el nombre del usuario

// -----------------------------------------------Mensaje de bienvenida--------------------------------
let contenedorBienvenida = document.createElement("div"); // Creo un elemento div en una variable contenedor
contenedorBienvenida.innerHTML = `<h3> Bienvenido/a ${usuario}</h3>`; // Modifico el interior del html 
bienvenida.appendChild(contenedorBienvenida); //Lo muestro en el html

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector(".listaProductos");
let productosCarrito = [];

cargarEventListeners()

function cargarEventListeners() {
    //Agrego productos al carrito
    listaProductos.addEventListener("click", agregarProductos);

    //Elimino productos del carrito
    carrito.addEventListener("click", eliminarProductos);

    //Vacio total del carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        productosCarrito = [];
        limpiarHTML();
    });
}

//FUNCIONES

function agregarProductos(e) {
    e.preventDefault(); //Evito que se accione el evento
    if (e.target.classList.contains("agregar-carrito")) { //Armo funcion para agregar el producto si tiene una clase agregar-carrito
        const productoSeleccionado = e.target.parentElement;
        leerDatosProducto(productoSeleccionado); //Llamo a la funcion leerDatosProducto con el parametro de productoSeleccionado
    }
}

[]
function leerDatosProducto(producto) { //Armo un obejeto con las propiedades de mis productos
    const infoProducto = {
    titulo: producto.querySelector(".card-title").innerText,
    precio: producto.querySelector("h6").innerText,
    id: producto.querySelector("a").getAttribute("id"),
    cantidad: 1,
    };
    //Debo incorporar la propiedad stock.

    //Verificamos si los productos que se estan ingresando son duplicados o no
    const existe = productosCarrito.some((producto) => producto.id === infoProducto.id);
    if (existe) {
        //Actualizamos la cantidad
        const producto = productosCarrito.map((producto) => {
        if (producto.id === infoProducto.id) {
            producto.cantidad++;
            return producto; // retorna objeto actualizado
        } else {
            return producto; // retorna los objetos que no son duplicados
        }
        });
        productosCarrito = [...producto];
    } else {
        //Agregar elementos al arreglo del carrito
        productosCarrito = [...productosCarrito, infoProducto];
    }
    carritoHTML();
}

//Muestra el Carrito en el HTML

function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    productosCarrito.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td>${producto.cantidad}</td>
    <td>
    <a href="" class="borrar-producto" id="${producto.id}">x</a>
    </td>`;
    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
    });
}

function eliminarProductos(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-producto")) {
    const productoID = e.target.getAttribute("id");

    //Eliminar del arreglo de articulosCarrito por el id
    productosCarrito = productosCarrito.filter((producto) => producto.id !== productoID);
    carritoHTML();
    }
}

//Elimina los cursos del HTML

function limpiarHTML() {
    contenedorCarrito.innerHTML = "";
}


//Incorporar la suma de los productos y con el boton de confirmar tengo que llamar a los metodos de pago
//Utilizar storage y JSON
//Utilizar librerias para armar alertas





