import { getProductos, patchProductos } from "../../../Apis/products/productsApi.js";

export class EditarProducto extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = /* html */ `
        <div class="container">
            <input type="text" id="buscador" placeholder="Buscar producto..." class="form-control">
            <div id="listaProductos"></div>
            <form id="formEditarProducto" style="display: none;">
                <!-- Aquí se renderiza el formulario dinámicamente -->
                <button type="submit" class="btn btn-primary">Editar</button>
            </form>
        </div>
        `;
        this.buscadorProducto();
    }

    buscadorProducto = () => {
        const buscador = document.getElementById('buscador');
        buscador.addEventListener('input', () => {
            const busqueda = buscador.value.toLowerCase();
            this.mostrarProductos(busqueda);
        });
    }

    mostrarProductos = (busqueda = '') => {
        getProductos()
            .then((productos) => {
                const listaProductos = document.getElementById('listaProductos');
                listaProductos.innerHTML = '';

                const productosFiltrados = productos.filter((producto) =>
                    producto.nombreProducto.toLowerCase().includes(busqueda)
                );

                productosFiltrados.forEach((producto) => {
                    const item = document.createElement('div');
                    item.classList.add('producto-item');
                    item.innerHTML = /*html*/ `
                    <button class="btn btn-outline-primary btnSeleccionar" data-id="${producto.id}">
                        ${producto.nombreProducto}
                    </button>
                    `;
                    listaProductos.appendChild(item);
                });
                this.seleccionarProducto();
            })
            .catch((error) => {
                console.error('Error en la solicitud GET:', error.message);
            });
    }

    seleccionarProducto = () => {
        const btnSeleccionar = document.querySelectorAll('.btnSeleccionar');
        btnSeleccionar.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const idProducto = e.target.getAttribute("data-id");
                this.mostrarFormulario(idProducto);
            });
        });
    }

    mostrarFormulario = (idProducto) => {
        const formEditarProducto = document.getElementById('formEditarProducto');
        formEditarProducto.style.display = 'none';

        getProductos()
            .then((productos) => {
                const producto = productos.find((producto) => producto.id === idProducto);

                if (!producto) {
                    alert("Producto no encontrado");
                    return;
                }

                const { id, nombreProducto, stock, precioProducto, imageProduct } = producto;

                formEditarProducto.innerHTML = /*html*/ `
                <div class="row">
                    <div class="col">
                        <label for="id" class="form-label">COD</label>
                        <input type="text" class="form-control" id="id" name="id" value="${id}" disabled>
                    </div>
                    <div class="col">
                        <label for="nombreProducto" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombreProducto" name="nombreProducto" value="${nombreProducto}">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="stock" class="form-label">Stock</label>
                        <input type="number" class="form-control" id="stock" name="stock" value="${stock}">
                    </div>
                    <div class="col">
                        <label for="precioProducto" class="form-label">Precio</label>
                        <input type="number" class="form-control" id="precioProducto" name="precioProducto" value="${precioProducto}">
                    </div>
                    <div class="col">
                        <label for="imageProduct" class="form-label">Imágen</label>
                        <input type="url" class="form-control" id="imageProduct" name="imageProduct" value="${imageProduct}">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Editar</button>
                `;

                formEditarProducto.style.display = 'block';
                this.editarData();
            })
            .catch((error) => {
                console.error('Error en la solicitud GET:', error.message);
            });
    }

    editarData = () => {
        const formEditarProducto = document.getElementById('formEditarProducto');

        formEditarProducto.addEventListener("submit", (e) => {
            e.preventDefault();

            const datos = Object.fromEntries(new FormData(formEditarProducto).entries());
            datos.id = document.querySelector("#id").value; // Recuperamos el ID del producto

            patchProductos(datos)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Error en la solicitud PUT: ${response.status} - ${response.statusText}`);
                    }
                })
                .then(responseData => {
                    console.log("Producto actualizado:", responseData);
                    alert("Producto actualizado correctamente");
                })
                .catch(error => {
                    console.error("Error en la solicitud PUT:", error.message);
                });
        });
    }
}

customElements.define("editar-producto", EditarProducto);