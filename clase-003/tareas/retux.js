// Tarea: hacer un programa que tenga un array de objectos que sean marcas y autos,
// calcular el seguro de cada uno, y el total a pagar

const calcularSeguros = function (coches, precioBase) {
  let montoTotal = 0
  coches.forEach(function (coche) {
    let precioFinal = precioBase
    if (coche.fabricadoen <= '2000') precioFinal = precioFinal * 1.05
    if (coche.fabricadoen <= '1985') precioFinal = precioFinal * 1.10
    if (coche.fabricadoen <= '1977') precioFinal = precioFinal * 1.20
    coche.costoseguro = precioFinal
    montoTotal += precioFinal
    console.log(`Marca: ${coche.marca.padStart(10)}    Modelo: ${coche.modelo.padStart(12)}    Año: ${coche.fabricadoen.padStart(6)}   Precio(ARS): ${precioFinal.toString().padStart(6)}`)     
  })
  return montoTotal
}

const myCars = [ {'marca': 'Ford', 'modelo': 'Mustang', 'fabricadoen': '1969'},
  {'marca': 'Renault', 'modelo': '4', 'fabricadoen': '1981'},
  {'marca': 'Chevrolet', 'modelo': 'Camaro', 'fabricadoen': '1976'},
  {'marca': 'Fiat', 'modelo': 'Uno', 'fabricadoen': '2004'}
]

const montoTotal = calcularSeguros(myCars, 1000)
console.log(`Monto total (ARS): ${montoTotal}`)
//console.log(JSON.stringify(myCars))

