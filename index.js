let items = [];
let temp = {
  web: 0,
  node: 0,
  server: 0,
};

function push_save(params, cant) {
  items.length = 0;
  for (let index = 0; index < cant; index++) {
    items.push({ id: params });
  }
}

temp.web = Number(window.localStorage.getItem("web"));
temp.node = Number(window.localStorage.getItem("node"));
temp.server = Number(window.localStorage.getItem("server"));

push_save("web", temp.web);
push_save("node", temp.node);
push_save("server", temp.server);

async function add_shop(params) {
  let shopping = document.getElementById("shopping");

  if (items.length === 10) {
    shopping.innerHTML = `<p>Carro de compras lleno</p>`;
    shopping.className = "show shopping-d";
  } else {
    items.push({ id: params });

    window.localStorage.setItem(
      params,
      items.filter((e) => e.id === params).length
    );

    shopping.innerHTML = `<p>Se agrego al carrito el articulo ${params}</p>`;
    shopping.className = "show shopping";
  }
  setTimeout(() => {
    shopping.className = "no-show";
  }, 5000);
}

function show_car() {
  let max = document.getElementById("max");
  let main = document.getElementById("main");
  let html = [];

  if (temp.web + temp.node + temp.server === 0) {
    max.innerHTML = `${temp.web + temp.node + temp.server}/10`;
    main.innerHTML =
      "<h2>> No hay articulos de compra! ve a tienda para agregar!</h2>";
    return;
  } else {
    max.innerHTML = `${temp.web + temp.node + temp.server}/10`;
    if (temp.web > 0) {
      html.push(`
        <div class="main">
          <p>Web Basica</p>
          <div style="padding-left: 10%;">
            <p>Cantidad </p>
            <p>${temp.web}</p>
          </div>
          <div style="padding-left: 70%;">
            <p>${temp.web * 5}$</p>
            <button
              style="background-color: #ff2f2f;"
              onclick="delete_shop('web')"
            >
              Eliminar
            </button>
          </div>
        </div>`);
    }

    if (temp.server > 0) {
      html.push(`
          <div class="main">
            <p>Server Basico</p>
            <div style="padding-left: 10%;">
              <p>Cantidad </p>
              <p>${temp.server}</p>
            </div>
            <div style="padding-left: 70%;">
              <p>${temp.server * 10}$</p>
              <button
              style="background-color: #ff2f2f;"
              onclick="delete_shop('server')"
              >
                Eliminar
              </button>
            </div>
          </div>`);
    }
    if (temp.node > 0) {
      html.push(`
            <div class="main">
              <p>Servicio basico</p>
              <div style="padding-left: 10%;">
                <p>Cantidad </p>
                <p>${temp.node}</p>
              </div>
              <div style="padding-left: 70%;">
                <p>${temp.node * 7}$</p>
                <button
                style="background-color: #ff2f2f;"
                onclick="delete_shop('node')"
                >
                  Eliminar
                </button>
              </div>
            </div>`);
    }
    html.push(`<button
    style="background-color: greenyellow; color: black"
    onclick="buy()"
    >Comprar
    </button> `);
    main.innerHTML = html.join("<br/>");
  }
}

function delete_shop(params) {
  window.localStorage.setItem(params, 0);
  reCheck();
  show_car();
}

function buy(params) {
    window.localStorage.setItem("web", 0);
    window.localStorage.setItem("node", 0);
    window.localStorage.setItem("server", 0);
    
    document.getElementById("buy").innerHTML = `<div class="shopping">Todos los objectos "comprados"</div>`
    reCheck();
    show_car()
    
  setTimeout(() => {
    document.getElementById("buy").innerHTML = ""
  }, 5000);
}

function reCheck() {
  temp.web = Number(window.localStorage.getItem("web"));
  temp.node = Number(window.localStorage.getItem("node"));
  temp.server = Number(window.localStorage.getItem("server"));

  push_save("web", temp.web);
  push_save("node", temp.node);
  push_save("server", temp.server);
}
