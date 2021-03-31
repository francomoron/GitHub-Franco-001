const fs = require('fs')
const path = require('path')

/**
 * Procesa todos los autos.
 * 
 * @param {*} config
 */
const procesarTodosLosAutos = (config) => {
  fs.readdir(config.directorioEntrada, (err, archivos) => {

    const totales = {
      totalAutos: archivos.length,
      seguroAcumulado: 0,
      autosProcesados: 0
    }
    
    archivos.forEach((archivo) => {
      procesarAuto(archivo, totales, config)
    })

  })
}

/**
 * Procesamiento completo de un auto:
 * lee de archivo, calcula seguro y guarda resultados
 * 
 * @param {*} archivo 
 * @param {*} totales 
 * @param {*} config 
 */
const procesarAuto = (archivo, totales, config) => {

  const archivoIn = path.resolve(config.directorioEntrada, archivo)
  fs.readFile(archivoIn, (err, data) => {

    totales.autosProcesados++

    if (err) {
      throw err
    }
    else {
      try {
        const auto = JSON.parse(data)

        auto.seguro = calcularSeguro(auto)
        totales.seguroAcumulado += auto.seguro

        const archivoOut = path.resolve(config.directorioSalida, archivo)
        fs.writeFile(archivoOut, JSON.stringify(auto), _ => {
          console.log(`Auto ${archivo} guardado.`)
        })

      } catch (error) {
        console.error(`Error en ${archivo} ->`, error)

      } finally {
        guardarSeguroAcumulado(totales, config)
      }
    }
  })
}

/**
 * Calculo del valor de seguro de un auto.
 * 
 * @param {*} auto 
 */
const calcularSeguro = (auto) => {
  
  if (!auto.hasOwnProperty('marca') || !auto.hasOwnProperty('año')) {
    throw new Error(`Al auto le falta marca y/o año.`)
  }
  
  let valor = 1000

  switch (auto.marca) {
    case 'Peugeot':
    case 'Citroën':
      valor *= 1.1
      break
    case 'Audi':
    case 'BMW':
      valor *= 2
      break
  }

  if (auto.año < 2015) {
    valor += (2015 - auto.año) * 100
  }

  return valor
}

/**
 * Guarda el total acumulado de seguro en archivo,
 * solo si todos los autos fueron procesados.
 * 
 * @param {*} totales 
 * @param {*} config 
 */
const guardarSeguroAcumulado = (totales, config) => {
  console.log('Estoy guardando...')
  if (totales.autosProcesados === totales.totalAutos) {
    const archivo = path.resolve(config.directorioSalida, config.archivoTotal)

    fs.writeFile(archivo, totales.seguroAcumulado, _ => {
      console.log(`Total en seguro acumulados guardado en seguro.txt.`)
    })
  }
}


//----------------------------------------------------//
// Ejecutemos esto...
procesarTodosLosAutos({
  directorioEntrada: path.resolve(__dirname, 'input'),
  directorioSalida: path.resolve(__dirname, 'output'),
  archivoTotal: 'seguro.txt'
})
