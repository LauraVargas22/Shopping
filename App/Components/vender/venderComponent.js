import "/App/Components/vender/InvoiceElement.js";

export class VenderComponent extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        this.innerHTML = /* html */ `
        <div class="container">
            <h1 class="title">ELECTRONIC INVOICE</h1>
            <form id="dataProducts" class="form">
                <!--Web Component Personal Information-->
                <invoice-element></invoice-element>
            </form>
        </div>
        `;
    }
}

customElements.define("vender-component", VenderComponent);