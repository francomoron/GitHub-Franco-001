// imports
const fs = require('fs')
const path = require('path')

// functions
const calcularPorcentajeSeguro = function (pAnio) {
  var porcentajeADevolver = 0
  switch (true) {
    case (pAnio <= 1975):
      porcentajeADevolver = 0
      break
    case (pAnio > 1975 && pAnio <= 1995):
      porcentajeADevolver = 0.005
      break
    case (pAnio > 1995 && pAnio <= 2005):
      porcentajeADevolver = 0.009
      break
    case (pAnio > 2005):
      porcentajeADevolver = 0.015
      break
  }
  return porcentajeADevolver
}

const scriptInicial = function (pCarpeta) {
  let vAutos = []
  fs.mkdirSync(pCarpeta)

  vAutos.push({ id: 'FZN268', marca: 'Fiat', modelo: '600', anio: 1975, valor: 70000, seguro: 0 })
  vAutos.push({ id: 'AYG699', marca: 'Volkswagen', modelo: 'Gol', anio: 2006, valor: 240000, seguro: 0 })
  vAutos.push({ id: 'KZI113', marca: 'Volkswagen', modelo: 'Fox', anio: 2012, valor: 380000, seguro: 0 })
  vAutos.push({ id: 'PSI111', marca: 'Renault', modelo: 'Clio', anio: 1998, valor: 140000, seguro: 0 })
  vAutos.push({ id: 'CAN420', marca: 'Renault', modelo: '9', anio: 1989, valor: 124500, seguro: 0 })
  vAutos.push({ id: 'AAA323', marca: 'Ford', modelo: 'Fiesta', anio: 1998, valor: 130000, seguro: 0 })
  vAutos.push({ id: 'FEW200', marca: 'Ford', modelo: 'Ka', anio: 2001, valor: 220000, seguro: 0 })
  vAutos.push({ id: 'LOO432', marca: 'Chevrolet', modelo: 'Serie 2 INMACULADO', anio: 1979, valor: 360000, seguro: 0 })

  vAutos.forEach(oAuto => {
    oAuto.seguro = oAuto.valor * calcularPorcentajeSeguro(oAuto.anio)
    fs.writeFileSync(path.join(pCarpeta, `${oAuto.id}.json`), JSON.stringify(oAuto))
  })

  vAutos = null
}

const borraCarpeta = function (pCarpeta) {
  if (fs.existsSync(pCarpeta)) {
    fs.readdirSync(pCarpeta).forEach(sArchivo => {
      const rutaCompletaArchivo = path.join(pCarpeta, sArchivo)

      if (fs.lstatSync(rutaCompletaArchivo).isDirectory()) {
        borraCarpeta(rutaCompletaArchivo)
      } else {
        fs.unlinkSync(rutaCompletaArchivo) // borra archivo
      }
    })
    fs.rmdirSync(pCarpeta)
  }
}

// main
let aAutos = [] // no la hago const porque en el finally libero el puntero, hace falta en nodejs?
const cCarpeta = path.join(__dirname, 'carpetaAutos_nodejs')

try {
  if (fs.existsSync(cCarpeta)) {
    borraCarpeta(cCarpeta)
  }

  // crea datos iniciales
  scriptInicial(cCarpeta)

  // levanta archivos desde disco a memoria
  if (fs.existsSync(cCarpeta)) {
    fs.readdirSync(cCarpeta).forEach(sArchivo => {
      const rutaCompletaArchivo = path.join(cCarpeta, sArchivo)
      aAutos.push(
        JSON.parse(fs.readFileSync(rutaCompletaArchivo, { encoding: 'utf-8' }))
      )
    })
  }

  if (aAutos.length > 0) {
    // calcula total e imprime
    let totalSeguros = 0

    aAutos.forEach(oAuto => {
      totalSeguros += oAuto.seguro
      console.log(`El vehiculo ${oAuto.marca} ${oAuto.modelo} pagará $${Math.floor(oAuto.seguro)}`)
    })

    console.log(`Total a pagar $${totalSeguros}`)
  } else {
    throw new Error('No hay autos en disco')
  }
} catch (error) {
  console.log(error.message)
} finally {
  aAutos = null
  borraCarpeta(cCarpeta)
}
