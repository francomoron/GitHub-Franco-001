const frutas = [
  'Manzana',
  'Banana',
  'Pera',
  'Durazno'
]

// const iterador = function (fruta) {
//   console.log(fruta)
// }

// const iterador = fruta => console.log(fruta)

// frutas.forEach(iterador)
// frutas.forEach(fruta => console.log(fruta))

// const frutasFiltradas = frutas.filter(function (fruta) {
//   if (fruta === 'Pera') {
//     return false
//   } else {
//     return true
//   }
// })

// const filtroDeFrutas = function (fruta) {
//   if (fruta === 'Pera') {
//     return false
//   } else {
//     return true
//   }
// }

// const filtroDeFrutas2 = function (fruta) {
//   if (fruta === 'Durazno') {
//     return false
//   } else {
//     return true
//   }
// }

// const frutasFiltradas = frutas.filter(filtroDeFrutas2)

const frutasFiltradas = frutas.filter(fruta => fruta !== 'Durazno')

console.log(frutas)
console.log(frutasFiltradas)
