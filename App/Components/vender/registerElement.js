//Inicialización variable para almacenar el subtotal de la compra
export let summarySubTotal = 0;
//Inicialización variable para almacenar el iva de la compra
export let summaryVat = 0;
//Inicialización variable para almacenar el total de la compra
export let summaryTotal = 0;

/**
 * Función para ingresar productos y a la vez mostrarlos en una tabla
 * @returns {HTMLElement}
 */
export const createProducts = () => {
    //El ID del producto se convierte a hexadecimal
    let id = Date.now().toString(16);
    //Creación de formulario para ingresar productos en el HTML
    let productsHTML = /*HTML*/ `
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
                summarySubTotal += parseFloat(subTotal);
                //Agrega el valor del subtotal general al HTML
                const subTotalInvoice = document.getElementById('subTotalInvoice').innerText = `SubTotal: ${summarySubTotal}`;

                //Calcula el interes respecto al valor del subtotal
                summaryVat = parseFloat(summarySubTotal * 19 / 100).toFixed(2);
                //Agrega el valor del interes al HTML
                const vatInvoice = document.getElementById('vatInvoice').innerText = `VAT (19%) ${summaryVat}`;

                //Calcula el valor total de la factura
                summaryTotal = (parseFloat(summarySubTotal) + parseFloat(summaryVat)).toFixed(2);
                //Agrega el valor TOTAL de la factura al HTML
                const totalInvoice = document.getElementById('totalInvoice').innerText = `TOTAL: ${summaryTotal}`;
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
                summarySubTotal -= subTotal;
                //Actualiza el valor del subtotal en el HTML
                const subTotalInvoice = document.getElementById('subTotalInvoice').innerText = `SubTotal: ${summarySubTotal}`;

                //Recalcula el valor del IVA de acuerdo con el nuevo valor
                summaryVat = parseFloat(summarySubTotal * 19 / 100).toFixed(2);
                //Actualiza el valor del IVA en el HTML
                const vatInvoice = document.getElementById('vatInvoice').innerText = `VAT (19%) ${summaryVat}`;

                //Recalcula el valor total de la factura de acuerdo con el nuevo valor
                summaryTotal = (parseFloat(summarySubTotal) + parseFloat(summaryVat)).toFixed(2);
                //Actualiza el valor TOTAL en el HTML
                const totalInvoice = document.getElementById('totalInvoice').innerText = `TOTAL: ${summaryTotal}`;

                //Elimina el ID y la fila correspondiente a este
                document.querySelector(`#numProducts${id}`).remove();
                document.querySelector(`#row${id}`).remove();
            });
        })
    }, 0);
    return productsHTML;
}