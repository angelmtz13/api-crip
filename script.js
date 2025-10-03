const tablaCripto = document.getElementById("tablaCripto");
const btnActualizar = document.getElementById("btnActualizar");

// Lista de criptomonedas a mostrar
const cryptos = ["bitcoin", "ethereum", "dogecoin", "litecoin", "ripple"];

async function obtenerPrecios() {
  tablaCripto.innerHTML = "<tr><td colspan='4'>Cargando...</td></tr>";

  try {
    const ids = cryptos.join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    const res = await fetch(url);
    const data = await res.json();

    let html = "";
    cryptos.forEach((crypto, index) => {
      const precio = data[crypto].usd.toFixed(2);
      const cambio = data[crypto].usd_24h_change.toFixed(2);
      const claseCambio = cambio >= 0 ? "cambio-positivo" : "cambio-negativo";

      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${crypto.charAt(0).toUpperCase() + crypto.slice(1)}</td>
          <td class="precio">$${precio}</td>
          <td class="cambio ${claseCambio}">${cambio}%</td>
        </tr>
      `;
    });

    tablaCripto.innerHTML = html;

  } catch (error) {
    tablaCripto.innerHTML = "<tr><td colspan='4'>Error al cargar los datos.</td></tr>";
    console.error(error);
  }
}

// Cargar precios al iniciar
window.addEventListener("load", obtenerPrecios);

// Actualizar al presionar el botón
btnActualizar.addEventListener("click", obtenerPrecios);
