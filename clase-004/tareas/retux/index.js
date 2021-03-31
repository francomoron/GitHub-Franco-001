// segurola: Lee los archivos de autos desde el subdirectorio ./input y los procesa para 
//   calcular el precio de las pólizas de seguro. Los archivos de salida se escriben en el subdir
//   ./output. Solo los archivos de entrada .json son procesados.
//   Querido @kaminoo, para que no te chives, te esribo todo en español y más te vale que
//   tengas todo en UTF-8 porque te voy a mandar caracteres extraños.
//   Pero tener en cuenta que lo que acá son archivos en otros sitios son ficheros. No sé si semejante
//   ambigüedad no va a embromar.

const fs = require('fs')
const path = require('path')


function getAutosDesdeEntrada (dirPath) {
  try {
    fs.readdir(dirPath, function(err, archivos) {
      if (err) {
        throw new Error('Ameo, fijate bien el diretorio.')
      }
      archivos.forEach(function(archivo) {
        if (/.*\.json$/.exec(archivo)) {
          // console.log(`found: ${dirPath}/${archivo}.`)
          try {
            fs.readFile(path.join(dirPath, archivo), 'utf8', function (err,datos) {
              if (err) {
                throw new Error(`Ameo, encontré un error al abrir ${archivo}. Fijate bien y volvé después.`)
              }
              try {
                const objdesdeArchivo = JSON.parse(datos)
                procesarAutos(objdesdeArchivo, archivo)
              }
              catch (error) {
                console.log(error.message)
              }
              
            })
          }
          catch (error) {
            console.log(error.message)
          }
        }
      })
    })
  }
  catch (error) {
    console.log(error.message)
  }
}

function getCostoPoliza(coche) {
  // Recibe un objeto auto, calcula su atributo valor (de póliza) y retorna
  // el objeto con ese nuevo atributo actualizado.
  // Este es el costo base de la poliza en esta compañia. 
  let costopolizaMensual = 1500
  let valorAutoCopetudo = 350000
  if (coche.fabricadoen <= 2000) { 
    costopolizaMensual *= 1.05
  } 
  if (coche.fabricadoen <= 1985) {
    costopolizaMensual *= 1.10
  } 
  if (coche.fabricadoen <= 1977) { 
    costopolizaMensual *= 1.30 
  }
  // Plus a coches de lujo con precios mayores a valorAutoCopetudo
  if (parseInt(coche.valor) >= valorAutoCopetudo) {
    costopolizaMensual *= 1.60
  }
  costopolizaMensual *= (parseFloat(coche.valor) / parseFloat(valorAutoCopetudo)) * 3
  coche.costopoliza = costopolizaMensual.toFixed(2) 
  return coche
}

function procesarAutos(listadeAutos, archivoSalida) {
  const objSalida = []
  listadeAutos.forEach(function(coche) {
    objSalida.push(getCostoPoliza(coche))
  })
  fs.writeFileSync(path.join(__dirname, 'output', archivoSalida), JSON.stringify(objSalida, null, 2))
}

function main() {
  getAutosDesdeEntrada(path.join(__dirname, 'input'))
  console.log('[info] Si suerte has tenido, el directorio output ver debes.')
}

main()

