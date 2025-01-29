import { postProductos } from "../../../Apis/products/productsApi.js";
import ProductoModel from "../../../Models/productModel.js";

export class CrearProducto extends HTMLElement {
    constructor(){
        super();
        this.render();
        this.crearData();
    }

    render() {
        let id = Date.now();
        this.innerHTML = /* html */ `
        <form id="formCrearProducto">
            <div class="row">
                <div class="col">
                    <label for="id" class="form-label">COD</label>
                    <input type="number" class="form-control" id="id" name ="id" placeholder="${id}" disabled>
                </div>
                <div class="col">
                    <label for="nombreProducto" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombreProducto" name="nombreProducto">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="stock" class="form-label">Stock</label>
                    <input type="number" class="form-control" id="stock" name ="stock">
                </div>
                <div class="col">
                    <label for="precioProducto" class="form-label">Precio</label>
                    <input type="number" class="form-control" id="precioProducto" name="precioProducto">
                </div>
                <div class="col">
                    <label for="imageProduct" class="form-label">Imágen</label>
                    <input type="url" class="form-control" id="imageProduct" name="imageProduct">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <button id="btnCrear" type="submit" class="btn btn-primary">Crear</button>
                </div>
            </div>
        </form>
        `;
    }

    crearData = () =>{
        const formCrearData = document.querySelector('#formCrearProducto');
        document.querySelector('#btnCrear').addEventListener("click",(e) =>{
            e.preventDefault();
            const datos = Object.fromEntries(new FormData(formCrearData).entries());
            datos.id = document.querySelector("#id").placeholder;
            postProductos(datos)
            .then(response => {
                // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
                if (response.ok) {
                    return response.json(); // Devolver la respuesta como JSON
                } else {
                    // Si la respuesta no fue exitosa, lanzar una excepción
                    throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
                }
            })
            .then(responseData => {
                // Hacer algo con la respuesta exitosa si es necesario
                console.log('Respuesta exitosa:', responseData);
            })
            .catch(error => {
                console.error('Error en la solicitud POST:', error.message);
                // Puedes manejar el error de otra manera si es necesario
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    }
}
customElements.define("crear-producto", CrearProducto);