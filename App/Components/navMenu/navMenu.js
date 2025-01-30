export class NavMenu extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        this.innerHTML = /* html */ `
        <style rel="stylesheet">
          @import "./App/Components/navMenu/menuStyle.css";
        </style>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"><img class="img-fluid" src="../../../images/logo.png"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active navbar" aria-current="page" href="#" data-verocultar='["#vender", ["#producto"]]'>Vender</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link navbar" aria-current="page" href="#" data-verocultar='["#producto", ["#vender"]]'>Productos</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="container" id="vender" style="display:block;">
          <vender-component></vender-component>
        </div>
        <div class="container" id="producto" style="display:none;">
          <producto-component></producto-component>
        </div>
        `;
        this.querySelectorAll(".navbar").forEach((val, id) => {
            val.addEventListener("click", (e)=>{
                let data = JSON.parse(e.target.dataset.verocultar);
                let cardVer = document.querySelector(data[0]);
                cardVer.style.display = 'block';
                data[1].forEach(card => {
                    let cardActual = document.querySelector(card);
                    cardActual.style.display = 'none';
                });
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        });
    }
}
customElements.define("nav-menu", NavMenu);