export class InvoiceElement extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        let numInvoice = Date.now().toString(16);
        let id = Date.now();
        this.innerHTML = /* html */ `
        <style rel="stylesheet">
          @import "./App/Components/vender/venderStyle.css";
        </style>
        <div class="row p-4">
            <label for="numInvoice" class="col-3 form-label">Num Invoice</label>
            <div class="col-6">
            <!--ID predeterminado-->
            <input class="form-control" type="text" placeholder="${numInvoice}" aria-label="Disabled input example" disabled>
            </div>
        </div>
        <!--Identificación-->
        <div class="row p-4">
            <label for="numID" class="col-3 form-label">ID</label>
            <div class="col-6">
            <input type="number" class="form-control" name="numID" id="numId" placeholder="Enter ID..." required>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 p-4">
            <!--Nombres-->
            <div class="col">
                <label for="names" class="form-label">Name</label>
                <input id="names" type="text" class="form-control" name="names" placeholder="Enter Names..." required>
            </div>
            <!--Apellidos-->
            <div class="col">
                <label for="surname" class="form-label">Surname</label>
                <input type="text" class="form-control" id="surname" name="surname" placeholder="Enter Surname..." required>
            </div>
        </div>
        <!--Dirección-->
        <div class="row p-4">
            <label for="address" class="col-3 form-label">Address</label>
            <div class="col-6">
                <input type="text" class="form-control" name="address" id="address" placeholder="Enter Address..." required>
            </div>
        </div>
        <!--Email-->
        <div class="row p-4">
            <label for="email" class="col-3 form-label">Email</label>
            <div class="col-6">
                <input type="email" class="form-control" name="email" id="email" placeholder="Enter email..." required>
            </div>
        </div>
        <div class="row mt-3" id="numProducts${id}">
        <!--Cartas para registrar productos-->
        <div class="col-12">
          <div class="card border-secondary mb-3" style="max-width: 100%;">
              <div id="products_title" class="card-header">Products</div>
              <div class="card-body">
                <h5 id="products_text" class="card-title">Register your products here</h5>
                <button type="button" class="btn btn-primary" id="addProduct">+</button>
                <div id="infoProductos" class="container detailProducts">
                  <!--Contenedor con las opciones de registro de los productos-->
                </div>
              </div>
            </div>
        </div>
        <!--Tabla para agregar la información ingresada por el usuario-->
        <div class="table-responsive">
        <table id="tableProducts" class="table">
            <!--Encabezado de la tabla-->
            <thead>
            <tr>
                <th>COD</th>
                <th>NAME</th>
                <th>V/UNIT</th>
                <th>QUANTITY</th>
                <th>SUBT</th>
                <th>-</th>
            </tr>
            </thead>
            <!--Cuerpo de la tabla-->
            <tbody>
            <!--Por cada producto se agrega una fila con la información respectiva-->
            </tbody>
        </table>
        </div>
        `;
        this.addEventListener();

    }

    addEventListener(){
        //Selecciona el contenedor donde se ingresan los datos de los prodcutos
        const divContainerProducts = document.querySelector('.detailProducts');
        document.addEventListener('DOMContentLoaded', (e) => {
            
        });

        //Evento para agregar un nuevo formulario para otro producto en el contenedor
        document.querySelector('#addProduct').addEventListener('click', (e) => {
            divContainerProducts.insertAdjacentHTML('beforeend', this.addProduct());
        });
    }
    
    addProduct(){
        let id = Date.now();
        let productsHTML = /*html*/`
        <div class="row mt-3" id="numProducts${id}">
            <!--Código del producto generado automáticamente-->
            <div class="row p-4">
                <label for="cod" class="col-6 form-label">COD</label>
                <div class="col-6">
                <input class="form-control" type="text" placeholder="${id}" aria-label="Disabled input example" disabled>
                </div>
            </div>
            <!--Input para el nombre del producto-->
            <div class="row p-4">
                <label class="col-6 form-label">Name Product</label>
                <div class="col-6">
                <input type="text" class="border-secondary form-control product-input" id="nameProduct${id}" name="nameProduct${id}" data-id="${id}" data-field="Name" required>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 p-4">
            <!--Input para el valor unitario del producto-->
                <div class="col">
                    <label class="form-label">Unit Value</label>
                    <input type="number" class="border-secondary form-control product-input" id="unitValue${id}" name="unitValue${id}" data-id="${id}" data-field="UnitValue" required>
                </div>
                <!--Input para la cantidad a comprar-->
                <div class="col">
                    <label class="form-label">Quantity</label>
                    <input type="number" class="border-secondary form-control product-input" id="quantity${id}" name="quantity${id}" data-id="${id}" data-field="Quantity" required>
                </div>
            </div>
            <!--Botón para eliminar productos-->
            <div class="col-2">
                <button type="button" class="btn btn-danger remove-product" data-id="${id}">-</button>
            </div>
        </div>
        `;
        
        return productsHTML;
    }

    removeProduct(){
        // Selecciona todos los botones de eliminación de productos que tienen un 'data-id' correspondiente
        const removeProducts = document.querySelectorAll(`.remove-product[data-id="${id}"]`);
        //Por cada botón para remover los productos
        removeProducts.forEach(removeProduct => {
            //Evento al hacer click en los botónes
            removeProduct.addEventListener("click", () => {
                //Elimina el ID y la fila correspondiente a este
                document.querySelector(`#numProducts${id}`).remove();
                document.querySelector(`#row${id}`).remove();
            });
        });
    }
}
customElements.define("invoice-element", InvoiceElement);