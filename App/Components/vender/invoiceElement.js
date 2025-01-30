export class InvoiceElement extends HTMLElement {
    constructor(){
        super();
        this.render();
        this.summarySubTotal = 0;
        this.summaryVat = 0;
        this.summaryTotal = 0;
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
            <!--Card con la información general de la factura-->
        <div class="d-flex justify-content-end">
        <div id="card" class="card border-0 shadow-sm rounded">
            <div id="card_header" class="card-header text-center fw-bold">
            Invoice Summary
            </div>
            <ul class="list-group list-group-flush">
            <!--Subtotal del valor de la factura-->
            <li id="subTotalInvoice" class="list-group-item d-flex justify-content-between align-items-center">SubTotal:</li>
            <!--Impuesto respecto al subtotal de la factura-->
            <li id="vatInvoice" class="list-group-item d-flex justify-content-between align-items-center">VAT (19%)</li>
            <!--Valor total de la factura-->
            <li id="totalInvoice" class="list-group-item d-flex justify-content-between align-items-center">TOTAL:</li>
            </ul>
        </div>
        </div>
        <!--Botón para pagar la factura-->
        <div class="d-flex justify-content-center">
        <button id="btnInvoice" type="button" class="btn btn-secondary">Pay</button>
        </div>
        <!--Ventana emergente al cumplirse el evento pay-->
        <div id="popup" class="popup">
        <div class="col">
            <h1 class="title_popup">Invoice</h1>
            <p class="header_popup" id="popUpName"></p> <!--Nombre Comprador-->
            <p class="header_popup" id="popUpID"></p> <!--Identificación del usuario-->
        </div>
        <!--Tabla resumen de la compra realizada-->
        <div class="table-responsive">
            <table id="invoiceProducts" class="table">
            <!--Encabezado de la tabla-->
            <thead>
                <tr>
                <th id="popUpQuantity">QUANTITY</th>
                <th id="popUpProduct">PRODUCT</th>
                <th id="popUpUnit">V/UNIT</th>
                <th id="popUpSubT">SUBTOTAL</th>
                </tr>
            </thead>
            <!--Cuerpo de la tabla-->
            <tbody>
                <!--Se agregan automáticamente las filas de acuerdo a los productos-->
            </tbody>
            </table>
        </div>
        <!--Cuadro con información general-->
        <div id="values" class="col text-left">
            <p id="popUpSubTotal">SUBTOTAL</p>
            <p id="popUpVat">VAT</p>
            <p id="popUpTotal">TOTAL</p>
        </div>
        <div class="d-flex justify-content-center">
            <!--Botón de confirmación de la compra-->
            <button id="confirm" type="button" class="btn btn-primary">Confirm</button>
        </div>
        <!--Botón para cerrar popup-->
        <button id="popUpClose" type="button" class="close">&times;</button>
        </div>
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

        //Seleccionar cuerpo de la tabla #tableProducts del HTML
        const tableBody = document.querySelector("#tableProducts tbody");
        //En el cuerpo de la tabla crear un tr
        const rowTable = document.createElement('tr');
        //Asignación de la clase al tr de la tabla
        rowTable.classList.add('product-row')
        // Establecer el atributo "id" con un valor dinámico
        rowTable.setAttribute("id", `row${id}`);
        // Establecer el atributo "data-id" con el valor de la variable id
        rowTable.setAttribute("data-id", id);
        //Por cada atributo crear una fila con los siguientes datos
        rowTable.innerHTML = /*HTML*/ `
            <td>${id}</td>
            <td id="tableName${id}"></td>
            <td id="tableUnitValue${id}"></td>
            <td id="tableQuantity${id}"></td>
            <td id="tableSubTotal${id}"></td>
            <!--Botón para eliminar producto desde la tabla-->
            <td><button type="button" class="btn btn-danger remove-product" data-id="${id}">-</button></td>
            `;
            tableBody.appendChild(rowTable);
    
        //Método para ejecutar el código después de que el navegador haya terminado el ciclo actual de eventos
        setTimeout(() => {
            //Selecciona todos los inputs con la clase 'product-input' y un atributo 'data-id' que coincida con 'id'
            const inputs = document.querySelectorAll(`.product-input[data-id="${id}"]`);
            //Itera por cada input encontrado
            inputs.forEach(input => {
                input.addEventListener("input", (e) => {
                const field = e.target.dataset.field;  // Obtiene el valor del atributo 'data-field' del input
                const value = e.target.value;  // Obtiene el valor actual del input
    
                const tableRow = document.querySelector(`#table${field}${id}`);
                //En caso que que la fila ya existe solo la actualiza
                if (tableRow) tableRow.innerText = value;
    
                //Cuando los campos 'UnitValue' y 'Quantity' están llenos empieza a realizar los cálculos
                if (field === "UnitValue" || field === "Quantity") {
                    //Obtiene los valores ingresados
                    const unitValue = parseFloat(document.getElementById(`unitValue${id}`).value || 0);
                    const quantity = parseFloat(document.getElementById(`quantity${id}`).value || 0);
    
                    //Con los valores ingresados calcula el subtotal
                    const subTotal = (quantity * unitValue).toFixed(2);
    
                    //Agrega a la columna de la tabla el subtotal calculado por cada producto
                    document.getElementById(`tableSubTotal${id}`).textContent = `${subTotal}`;
    
                    //Por cada subtotal calculado lo va agregando a la variable del subtotal general
                    this.summarySubTotal += parseFloat(subTotal);
                    //Agrega el valor del subtotal general al HTML
                    const subTotalInvoice = document.getElementById('subTotalInvoice').innerText = `SubTotal: ${this.summarySubTotal}`;
    
                    //Calcula el interes respecto al valor del subtotal
                    this.summaryVat = parseFloat(this.summarySubTotal * 19 / 100).toFixed(2);
                    //Agrega el valor del interes al HTML
                    const vatInvoice = document.getElementById('vatInvoice').innerText = `VAT (19%) ${this.summaryVat}`;
    
                    //Calcula el valor total de la factura
                    this.summaryTotal = (parseFloat(this.summarySubTotal) + parseFloat(this.summaryVat)).toFixed(2);
                    //Agrega el valor TOTAL de la factura al HTML
                    const totalInvoice = document.getElementById('totalInvoice').innerText = `TOTAL: ${this.summaryTotal}`;
                }
            });
        });
            // Selecciona todos los botones de eliminación de productos que tienen un 'data-id' correspondiente
            const removeProducts = document.querySelectorAll(`.remove-product[data-id="${id}"]`);
            //Por cada botón para remover los productos
            removeProducts.forEach(removeProduct => {
                //Evento al hacer click en los botónes
                removeProduct.addEventListener("click", () => {
                    //Selecciona el valor subtotal del producto a eliminar
                    const subTotal = parseFloat(document.getElementById(`tableSubTotal${id}`).textContent || 0);
                    //El valor seleccionado lo resta del valor total de la factura
                    this.summarySubTotal -= subTotal;
                    //Actualiza el valor del subtotal en el HTML
                    const subTotalInvoice = document.getElementById('subTotalInvoice').innerText = `SubTotal: ${this.summarySubTotal}`;
    
                    //Recalcula el valor del IVA de acuerdo con el nuevo valor
                    this.summaryVat = parseFloat(this.summarySubTotal * 19 / 100).toFixed(2);
                    //Actualiza el valor del IVA en el HTML
                    const vatInvoice = document.getElementById('vatInvoice').innerText = `VAT (19%) ${this.summaryVat}`;
    
                    //Recalcula el valor total de la factura de acuerdo con el nuevo valor
                    this.summaryTotal = (parseFloat(this.summarySubTotal) + parseFloat(this.summaryVat)).toFixed(2);
                    //Actualiza el valor TOTAL en el HTML
                    const totalInvoice = document.getElementById('totalInvoice').innerText = `TOTAL: ${this.summaryTotal}`;
    
                    //Elimina el ID y la fila correspondiente a este
                    document.querySelector(`#numProducts${id}`).remove();
                    document.querySelector(`#row${id}`).remove();
                });
            })
        }, 0);
    
    return productsHTML;
    }

    
}
customElements.define("invoice-element", InvoiceElement);