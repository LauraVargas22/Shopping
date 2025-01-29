import "/App/Components/vender/RegisterElement.js";
import "/App/Components/vender/headerElement.js";

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
                <header-element></header-element>
            </form>
            <!--Web Component Resgistro de productos y factura final-->
            <register-element></register-element>
        </div>
        `;
    }
}

customElements.define("vender-component", VenderComponent);