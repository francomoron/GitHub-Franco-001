const calcularSeguro = function (param) {
  return 1000
}

const calcularSeguroPeroNoMeGustaSuCara = function (param) {
  return 2000
}

const imprimir = function (nombre, funcCalculo) {
  console.log(`${nombre} paga ${funcCalculo()}`)
}

const primerParte = 'calcular'
// const segundaParte = 'Seguro'
const segundaParte = 'SeguroPeroNoMeGustaSuCara'
const nombreFuncion = `${primerParte}${segundaParte}`
console.log(nombreFuncion, typeof nombreFuncion)
// console.log(this[nombreFuncion])
const funcion = eval(nombreFuncion) // NO USAR NUNCA EL EVAL SOLO FUE POR QUE ME PREGUNTO RETUX!
console.log(funcion, funcion())

imprimir('Retux', calcularSeguro)
imprimir('Seba', calcularSeguroPeroNoMeGustaSuCara)
