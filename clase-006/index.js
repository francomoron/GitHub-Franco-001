const fs = require('fs')
const path = require('path')
const ordenesPath = path.join(__dirname, 'input')

// console.log('Clase 6')

// UTILITIES
const saberSiEsDirectorio = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, function (error, stats) {
      if (error) {
        reject(error)
      } else if (stats.isDirectory()) {
        resolve(path)
      } else {
        reject(new Error('No es un directorio'))
      }
    })
  })
}

const iterarPath = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (error, paths) {
      if (error) {
        reject(error)
      } else {
        resolve(paths)
      }
    })
  })
}

const leerOrden = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function (error, dataOrden) {
      if (error) {
        reject(error)
      } else {
        const jsonString = dataOrden.toString()
        try {
          const jsonOrden = JSON.parse(jsonString)
          resolve(jsonOrden.total)
        } catch (error) {
          reject(error)
        }
      }
    })
  })
}

// MAIN - LEER LA CARPETA INPUT
let main = iterarPath(ordenesPath)

// IGNORO LO QUE NO SEA UN DIRECTORIO
main = main.then(carpetasFechas => {
  if (carpetasFechas && Array.isArray(carpetasFechas) && carpetasFechas.length) {
    let promiseEsUnDirectorio = Promise.resolve()
    const carpetasFechasPaths = []
    carpetasFechas.forEach(function (carpetaFecha) {
      const ordenesDeCompraPath = path.join(ordenesPath, carpetaFecha)
      promiseEsUnDirectorio = promiseEsUnDirectorio.then(_ => {
        return saberSiEsDirectorio(ordenesDeCompraPath)
      }).then(path => {
        carpetasFechasPaths.push(path)
      }).catch(_ => {
        // No es un directorio
      })
    })
    return promiseEsUnDirectorio.then(_ => {
      return Promise.resolve(carpetasFechasPaths)
    })
  }
})

// LEO LAS ORDENES DE COMPRA DE CADA CARPETA
main = main.then(carpetasFechasPaths => {
  const ordenesDeCompraPaths = []
  let promiseIterarOrdenes = Promise.resolve()
  carpetasFechasPaths.forEach(carpetasFechasPath => {
    promiseIterarOrdenes = promiseIterarOrdenes.then(_ => {
      return iterarPath(carpetasFechasPath)
    }).then(ordenesDeCompra => {
      ordenesDeCompra.forEach(function (ordenDeCompraPath) {
        if (ordenDeCompraPath.endsWith('.json')) {
          const ordenDeCompraPathCompleto = path.join(carpetasFechasPath, ordenDeCompraPath)
          ordenesDeCompraPaths.push(ordenDeCompraPathCompleto)
        }
      })
    })
  })
  return promiseIterarOrdenes.then(_ => {
    return Promise.resolve(ordenesDeCompraPaths)
  })
})

// LEO LAS ORDENES DE COMPRA PARA OBTENER SUS TOTALES
main = main.then(ordenesDeCompraPaths => {
  let total = 0
  let promiseLeerOrdenes = Promise.resolve()
  ordenesDeCompraPaths.forEach(ordenDeCompraPath => {
    promiseLeerOrdenes = promiseLeerOrdenes.then(_ => {
      return leerOrden(ordenDeCompraPath)
    }).then(totalOrden => {
      total += totalOrden
    }).catch(_ => {
      // Ignoro una orden inválida
    })
  })
  return promiseLeerOrdenes.then(_ => {
    return Promise.resolve(total)
  })
})

// MUESTRO EL TOTAL
main = main.then(total => {
  console.log(`TOTAL ORDENES DE COMPRA: ${total}`)
})

// GLOBAL CATCH
main = main.catch(_ => {
  console.log('Tuve que parar la ejecución por un problema')
})
