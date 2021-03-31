const fs = require('fs').promises
const path = require('path')
const ordenesPath = path.join(__dirname, 'input')

const saberSiEsTipoArchivo = 'archivo'
const saberSiEsTipoDirectorio = 'directorio'

// UTILITIES
const saberSiEsTipo = (path, isType) => {
  return fs.stat(path).then(stats => {
    if (isType === saberSiEsTipoArchivo && stats.isFile()) {
      return path
    } else if (isType === saberSiEsTipoDirectorio && stats.isDirectory()) {
      return path
    }
  })
}

const iterarPath = (path) => {
  return fs.readdir(path)
}

const leerOrden = (path) => {
  return fs.readFile(path).then(dataOrden => {
    const jsonString = dataOrden.toString()
    const jsonOrden = JSON.parse(jsonString)
    return jsonOrden.total
  })
}

// MAIN - LEER LA CARPETA INPUT
let main = iterarPath(ordenesPath)

// IGNORO LO QUE NO SEA UN DIRECTORIO
main = main.then(carpetasFechas => {
  if (carpetasFechas) {
    const carpetasFechasPaths = []
    let promise = Promise.resolve()
    carpetasFechas.forEach(function (carpetaFecha) {
      const ordenesDeCompraPath = path.join(ordenesPath, carpetaFecha)
      promise = promise.then(_ => {
        return saberSiEsTipo(ordenesDeCompraPath, saberSiEsTipoDirectorio)
      }).then(path => {
        if (path) {
          carpetasFechasPaths.push(path)
        }
      }).catch(_ => {
        // Ignorar este path
      })
    })
    return promise.then(_ => {
      return carpetasFechasPaths
    })
  }
})

// LEO LAS ORDENES DE COMPRA DE CADA CARPETA
main = main.then(carpetasFechasPaths => {
  const ordenesDeCompraPaths = []
  let promise = Promise.resolve()
  carpetasFechasPaths.forEach(carpetasFechasPath => {
    promise = promise.then(_ => {
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
  return promise.then(_ => {
    return ordenesDeCompraPaths
  })
})

// LEO LAS ORDENES DE COMPRA PARA OBTENER SUS TOTALES
main = main.then(ordenesDeCompraPaths => {
  let total = 0
  let promise = Promise.resolve()
  ordenesDeCompraPaths.forEach(ordenDeCompraPath => {
    promise = promise.then(_ => {
      return leerOrden(ordenDeCompraPath)
    }).then(totalOrden => {
      total += totalOrden
    }).catch(_ => {
      // Ignoro una orden inválida
    })
  })
  return promise.then(_ => {
    return total
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
