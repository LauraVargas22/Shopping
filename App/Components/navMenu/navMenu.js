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
                  <a id="text_navbar" class="nav-link active" aria-current="page" href="#" data-verocultar='["vender"]'>Vender</a>
                </li>
                <li class="nav-item">
                  <a id="text_navbar" class="nav-link" href="#" data-verocultar='["products"]'>Productos</a>
                </li>
                <li class="nav-item">
                  <a id="text_navbar" class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>         
        `;
        this.querySelectorAll(".nav-link").forEach((val, id) => {
          val.addEventListener("click", (e)=>{
              let data = JSON.parse(e.target.dataset.verocultar);
              let mainContent = document.querySelector('#mainContent');
              mainContent.innerHTML= "";
              switch (data[0]){
                case 'vender':
                  mainContent.innerHTML="<vender-component></vender-component>";
                  break;
                case 'products':
                  mainContent.innerHTML="<producto-component></producto-component>";
                  break;
              }
              e.stopImmediatePropagation();
              e.preventDefault();
          })
      });
    }
}
customElements.define("nav-menu",NavMenu);