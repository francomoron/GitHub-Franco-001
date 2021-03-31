let total = 0

function calcularSeguro(marcaFunc, modeloFunc) {
  let vaAPagar = 1000
  if (marcaFunc === 'Renault') {
    vaAPagar *= 0.8
  }
  // total += vaAPagar
  return vaAPagar
}

let marca = 'Renault'
let modelo = '4'
let seguro = calcularSeguro(marca, modelo)
total += seguro
console.log(`${marca} ${modelo}: $${seguro}`)

let marca2 = 'Ford'
let modelo2 = 'Taunus'
let seguro2 = calcularSeguro(marca2, modelo2)
total += seguro2
console.log(`${marca2} ${modelo2}: $${seguro2}`)

console.log(`Total: $${total}`)
