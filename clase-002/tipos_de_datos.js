const nombre = 'Seba'
// console.log(nombre, typeof nombre)
const edad = 39
// console.log(edad, typeof edad)
const educador = true
// console.log(educador, typeof educador)
let nodefinido
// console.log(nodefinido, typeof nodefinido)
const esnulo = null
// console.log(esnulo, typeof esnulo)

// const nombres = [
//   'Sebastian',
//   'Matias',
//   true,
//   [
//     'Arena',
//     'Reto'
//   ]
// ]
// console.log(nombres, typeof nombres, Array.isArray(nombres), Array.isArray(nombre))

// const apellidos = new Array()
// apellidos.push('Arena')
// apellidos.push('Reto')
// // apellidos[0] = 'Arena'
// // apellidos[1] = 'Reto'
// console.log(apellidos)

const frutas = []
frutas.push('Manzana')
frutas.push('Banana')
frutas.push('Pera')

const frutas2 = [].concat(frutas)
frutas.push('Ciruela')

console.log(frutas)
console.log(frutas2)

// const fruta = frutas.pop()
// console.log(frutas)
// console.log(fruta)

// frutas.forEach(function(fruta) {
//   console.log(fruta)
// })

// const frutaColores = frutas.map(function(fruta) {
//   return fruta + ' rojo'
// })
// console.log(frutaColores)

// const nombres = [
//   'Sebastian',
//   'Matias'
// ]
// const apellidos = [
//   'Arena',
//   'Reto'
// ]
// const nombresApellidos = nombres.concat(apellidos)
// console.log(nombresApellidos)

const gustos = [
  'programar',
  'enseñar'
]
const parientes = {
  madre: 'Madre',
  padre: 'Padre',
  conyuge: 'Conyuge'
}
let persona = {
  nombre: 'Sebastian',
  apellido: 'Arena',
  edad: 39,
  mail: 'futuro@randomico.xyz',
  gustos,
  parientes
}
const deportes = {
  natacion: true,
  futbol: false,
  boxeo: false
}
const literatura = {
  'Harry Potter': 'Me gusta',
  'Moby Dick': 'No me gusta'
}
const literaturaAvanzada = {
  'Moby Dick': 'Me gusta'
}
// persona.nombre = 'Matias'
// persona.apellido = 'Reto'
// console.log(persona)

const propiedades = Object.keys(persona)
// console.log(propiedades)
propiedades.forEach(function(propiedad) {
  // console.log(propiedad)
  // console.log(persona[propiedad])
  console.log(`${propiedad}: ${persona[propiedad]}`)
})

console.log('======')

// const deportesKeys = Object.keys(deportes)
// console.log(deportesKeys)
// deportesKeys.forEach(function(deporte) {
//   persona[deporte] = deportes[deporte]
// })
persona = Object.assign(persona, deportes, literatura, literaturaAvanzada)
console.log(persona)

const personaCopia = Object.assign({}, persona)

persona.nombre = 'Matias'

console.log(personaCopia)
