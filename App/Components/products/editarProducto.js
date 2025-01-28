export class EditarProducto extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render() {
        this.innerHTML = /* html */ `
        <form id="formEditarProducto">
            
            <div class="row mt-3">
                <div class="col">
                    <button type="submit" class="btn btn-primary">Editar</button>
                </div>
            </div>
        </form>
        `;
    }
}
customElements.define("editar-producto", EditarProducto);