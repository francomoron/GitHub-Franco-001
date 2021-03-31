const objeto = {
  nombre: 'Cerveza',
  precio: 10
}
const objetoString = JSON.stringify(objeto)
console.log(typeof objeto)
console.log(typeof objetoString)
console.log(objetoString)

console.log(`\n\n`)

try {
  const stringObjeto = '{"nombre":"Cerveza","precio":10}'
  const objetoDesdeString = JSON.parse(stringObjeto)
  console.log(typeof objetoDesdeString)
  console.log(objetoDesdeString)
} catch (error) {
  console.log('Tu JSON no es válido')
}
