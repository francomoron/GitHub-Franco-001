const fs = require("fs");

const calcularSeguro = (auto) => {
  const añoActual = new Date().getFullYear();
  let seguro = 0;

  if (auto.tipoSeguro === "TR") {
    // Verifico si eligió Todo Riesgo
    if (añoActual - auto.año <= 10) {
      // verifico si el auto es mas viejo que 10 años
      seguro = auto.valor * 0.01; // calculo el 1% de valor del auto
    } else {
      seguro = 10000; //valor alto porque el auto es muy viejo
    }
  } else {
    if (auto.tipoSeguro === "TC") {
      seguro = auto.valor * 0.0025; // Terceros Completo
    } else {
      // Otro seguro. Ejemplo Contra Terceros
      seguro = 800;
    }
  }
  return seguro;
};

const guardarTotales = (totales, archivoOutput) => {
  objSalidaTotales = JSON.stringify(totales);
  fs.writeFile(archivoOutput, objSalidaTotales, (_) => {
    console.log(
      `Los totales acumulados de seguros quedaron guardados en ${archivoOutput}.`
    );
  });
};

const procesarAutos = (archivoJSON) => {
  const listaDeAutos = JSON.parse(fs.readFileSync(archivoJSON));
  const totales = {
    totalValorAutos: 0,
    totalSeguros: 0,
    cantAutosProcesados: 0,
  };

  listaDeAutos.forEach((auto) => {
    totales.totalValorAutos += auto.valor;
    totales.totalSeguros += calcularSeguro(auto);
    totales.cantAutosProcesados += 1;
  });

  guardarTotales(totales, "./Output/seguros.json");
};

procesarAutos("./input/autos.json");



