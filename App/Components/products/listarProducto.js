import { getProductos } from "../../../Apis/products/productsApi.js";

export class ListarProducto extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render() {
        this.innerHTML = /* html */ `
        <div id="productosCards" class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <!--Aquí se llamarán las cartas desde archivo JS-->
        </div>
        `;
        this.mostrarProductos();
    }

    mostrarProductos = () => {
        getProductos()
        .then((productos) => {
            //Toma el elemento HTML con ID productosCards
            const productosCards = document.getElementById('productosCards');
            //Al elemento HTML con ID productosCards le agrega la siguiente clase la cual hace uso de Bootstrap
            productosCards.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3');
            
            productos.forEach((producto) => {
                const {nombreProducto, precioProducto, imageProduct} = producto;
                //Crea un div en HTML
                const divItems = document.createElement('div');
                //El div creado tendrá como clase col
                divItems.classList.add('col');
                //Cambios dentro del archivo HTML, se completa la información con la data adquirida
                divItems.innerHTML = /*html*/`
                <div id="card__listar" class="card">
                    <img class="img-fluid" src="${imageProduct}" alt="Movie Image">
                    <h1 class="card__titles">${nombreProducto}</h1>
                    <p class="card__price">${precioProducto}</p>
                </div>
                `;
                productosCards.appendChild(divItems);
            });

        }).catch ((error) => {
            console.error('Error en la solicitud GET:', error.message);
        });
    }
}
customElements.define("listar-producto", ListarProducto);