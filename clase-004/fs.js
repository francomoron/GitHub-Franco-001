const fs = require('fs')
const objeto = {
  nombre: 'Cerveza',
  precio: 10,
  marcas: [
    'Quilmes',
    'Stella Artois',
    'Patagonia'
  ]
}
const objetoString = JSON.stringify(objeto, null, 4)
fs.writeFileSync('./objeto.json', objetoString)

const stringObjeto = fs.readFileSync('./objeto.json')
const objetoDesdeString = JSON.parse(stringObjeto)
console.log(objetoDesdeString)
