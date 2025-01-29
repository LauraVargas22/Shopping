import { deleteProductos, getProductos } from "../../../Apis/products/productsApi.js";
import ProductoModel from "../../../Models/productModel.js";

export class EliminarProducto extends HTMLElement {
    constructor(){
        super();
        this.render();
        this.eliminarProducto();
        this.mostrarProductos();
    }

    render(){
        this.innerHTML = /* html */ `
        <table id="tableProducts" class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody id="tbody">

            </tbody>
        </table>
        `;
        this.mostrarProductos();
    }

    mostrarProductos = () => {
        getProductos()
        .then((productos) => {
            //Seleccionar cuerpo de la tabla #tableProducts del HTML
            const tableBody = document.querySelector("#tbody");
            tableBody.innerHTML = '';
            
            productos.forEach((producto) => {
                //En el cuerpo de la tabla crear un tr
                const rowTable = document.createElement('tr');
                //Asignación de la clase al tr de la tabla
                rowTable.classList.add('product-row');
                rowTable.innerHTML = /* html */ `
                <td>${producto.id}</td>
                <td>${producto.nombreProducto}</td>
                <td><button class="btn btn-danger btnEliminar" data-id="${producto.id}">-</button></td>
                `;
                tableBody.appendChild(rowTable);
            });
                
            this.eliminarProducto();

        }).catch ((error) => {
            console.error('Error en la solicitud GET:', error.message);
        });
    }

    eliminarProducto(){
        const btnEliminar = this.querySelectorAll('.btnEliminar');

        btnEliminar.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const idProducto = e.target.getAttribute("data-id");
                Swal.fire({
                    title: "¿Está seguro de eliminar el producto?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, seguro!"
                  }).then(async(result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Eliminado!",
                        text: "El producto ha sido eliminado.",
                        icon: "success"
                      });
                      
                      try {
                          const response = await deleteProductos(idProducto);
                          if (response.ok) {
                              this.mostrarProductos();
                          } else {
                              throw new Error(`Error en la solicitud DELETE: ${response.status} - ${response.statusText}`);
                          }
                      } catch (error) {
                          console.error('Error en la solicitud DELETE:', error.message);
                      }
                    }
                  });
            });
        });
    }
}
customElements.define("eliminar-producto", EliminarProducto);