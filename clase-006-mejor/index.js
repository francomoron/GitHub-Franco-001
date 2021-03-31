const fs = require('fs').promises
const path = require('path')
const showLogs = false
let totalOrdenesCompra = 0

const recorrerDirectorio = (pathDirectorio) => {
  return fs.readdir(pathDirectorio).then(paths => {
    let promise = Promise.resolve()
    paths.forEach(pathRelativo => {
      const pathAbsoluto = path.join(pathDirectorio, pathRelativo)
      promise = promise.then(_ => {
        return procesarPath(pathAbsoluto)
      })
    })
    return promise
  })
}

const validarOrdenCompra = (pathAbsoluto) => {
  if (pathAbsoluto.endsWith('.json')) {
    return fs.readFile(pathAbsoluto).then(data => {
      const ordenCompra = JSON.parse(data)
      if (!ordenCompra.hasOwnProperty('id')) {
        throw new Error('Orden es inválida: falta id')
      } else if (!(ordenCompra.producto && ordenCompra.producto.length)) {
        throw new Error('Orden es inválida: falta producto')
      } else if (!ordenCompra.hasOwnProperty('total')) {
        throw new Error('Orden es inválida: falta total')
      } else {
        return procesarOrdenCompra(ordenCompra)
      }
    })
  }
  throw new Error('No es un path de orden valida')
}

const procesarOrdenCompra = (ordenCompra) => {
  showLogs && console.log(`Orden Compra: ${JSON.stringify(ordenCompra)}`)
  totalOrdenesCompra += ordenCompra.total
  return Promise.resolve()
}

const procesarPath = (pathAbsoluto) => {
  return fs.stat(pathAbsoluto).then(stats => {
    if (stats.isDirectory()) {
      return recorrerDirectorio(pathAbsoluto)
    } else if (stats.isFile()) {
      return validarOrdenCompra(pathAbsoluto)
    }
  }).catch(error => {
    showLogs && console.log(`Tuve un problema con ${pathAbsoluto}: ${error.message}`)
  })
}

const ordenesPath = path.normalize(process.argv[2])
const ordenesPathAbsoluto = path.isAbsolute(ordenesPath) ? ordenesPath : path.join(process.cwd(), ordenesPath)
procesarPath(ordenesPathAbsoluto).then(_ => {
  console.log(`TOTAL ORDENES DE COMPRA: ${totalOrdenesCompra}`)
})
