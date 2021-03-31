const fs = require('fs')
const path = require('path')
const ordenesPath = path.join(__dirname, 'input')

const subtotales = []
let carpetasTotal = 0
let carpetasProcesadas = 0
let archivosTotal = 0
let archivosProcesadas = 0

const mostrarTotal = function () {
  let total = 0
  subtotales.forEach(function (subtotal) {
    total += subtotal
  })
  // console.log(`Carpetas: ${carpetasProcesadas}/${carpetasTotal} | Archivos: ${archivosProcesadas}/${archivosTotal}`)
  if ((carpetasProcesadas === carpetasTotal) && (archivosProcesadas === archivosTotal)) {
    console.log(`TOTAL ORDENES DE COMPRA: ${total}`)
  }
}

fs.readdir(ordenesPath, function (error, carpetasFechas) {
  if (error) {
    console.log('Tuve un error al leer el fs', error)
  } else if (carpetasFechas && Array.isArray(carpetasFechas) && carpetasFechas.length) {
    carpetasTotal = carpetasFechas.length
    // console.log('Procesando carpetas con fechas...')
    carpetasFechas.forEach(function (carpetaFecha) {
      const ordenesDeCompraPath = path.join(ordenesPath, carpetaFecha)
      fs.stat(ordenesDeCompraPath, function (errorStat, stats) {
        if (errorStat) {
          console.log('Tuve un error al leer la carpeta de ordenes de compra', error)
        } else if (stats.isDirectory()) {
          // console.log(`Procesando carpeta ${carpetaFecha}...`)
          fs.readdir(ordenesDeCompraPath, function (errorOrdenes, ordenesDeCompra) {
            if (errorOrdenes) {
              console.log('Tuve un error al leer las ordenes de compra', error)
            } else if (ordenesDeCompra && Array.isArray(ordenesDeCompra) && ordenesDeCompra.length) {
              archivosTotal += ordenesDeCompra.length
              ordenesDeCompra.forEach(function (ordenDeCompraPath) {
                if (ordenDeCompraPath.endsWith('.json')) {
                  const ordenDeCompraPathCompleto = path.join(ordenesDeCompraPath, ordenDeCompraPath)
                  fs.readFile(ordenDeCompraPathCompleto, function (errorOrdenCompra, dataOrden) {
                    const jsonString = dataOrden.toString()
                    try {
                      const jsonOrden = JSON.parse(jsonString)
                      // console.log(`Orden #${jsonOrden.id}: ${jsonOrden.total}`)
                      subtotales.push(jsonOrden.total)
                      archivosProcesadas += 1
                      mostrarTotal()
                    } catch (jsonError) {
                      console.log(jsonError)
                    }
                  })
                }
              })
            } else {
              console.log(`La carpeta de ordenes de ${carpetaFecha} esta vacia aparentemente`)
            }
            carpetasProcesadas += 1
          })
        } else {
          // console.log(`Salteandome ${carpetaFecha}`)
          carpetasProcesadas += 1
        }
      })
    })
    // console.log('Terminé de procesar carpetas con fechas')
  } else {
    console.log('La carpeta esta vacia aparentemente')
  }
})
