

export class ProductoComponent extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        this.innerHTML = `
        <style rel="stylesheet">
            @import "./App/Components/products/productoStyle.css";
        </style>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active mnuproducto" aria-current="page" href="#" data-verocultar='["#crearProducto",["#editarProducto", "#eliminarProducto", "#listarProducto"]]'>Crear Producto</a>
            </li>
            <li class="nav-item">
                <a class="nav-link mnuproducto" href="#" data-verocultar='["#editarProducto",["#crearProducto", "#eliminarProducto", "#listarProducto"]]'>Editar Producto</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active mnuproducto" aria-current="page" href="#" data-verocultar='["#eliminarProducto",["#crearProducto", "#listarProducto", "#editarProducto", ]]'>Eliminar Producto</a>
            </li>
            <li class="nav-item">
                <a class="nav-link mnuproducto" href="#" data-verocultar='["#listarProducto",["#crearProducto", "#editarProducto", "#eliminarProducto"]]'>Listar Productos</a>
            </li>
        </ul>
        <div class="container" id="crearProducto" style="display:block;">
        <crear-producto></crear-producto>
        </div>
        <div class="container" id="editarProducto" style="display:none;">
            <editar-producto></editar-producto>
        </div> 
        <div class="container" id="eliminarProducto" style="display:block;">
        <eliminar-producto></eliminar-producto>
        </div>
        <div class="container" id="listarProducto" style="display:none;">
            <listar-producto></listar-producto>
        </div> 
        `;
        this.querySelectorAll(".mnuproducto").forEach((val, id) => {
            val.addEventListener("click", (e)=>{
                let data = JSON.parse(e.target.dataset.verocultar);
                let cardVer = document.querySelector(data[0]);
                cardVer.style.display = 'block';
                data[1].forEach(card => {
                    let cardActual = document.querySelector(card);
                    cardActual.style.display = 'none';
                });
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        });
    }
}

customElements.define("producto-component", ProductoComponent);