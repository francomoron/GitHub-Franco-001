const path = require ('path')
const fs = require('fs')

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
  console.log(`Carpetas: ${carpetasProcesadas}/${carpetasTotal} | Archivos: ${archivosProcesadas}/${archivosTotal}`)
  if ((carpetasProcesadas === carpetasTotal) && (archivosProcesadas === archivosTotal)) {
    console.log(`TOTAL ORDENES DE COMPRA: ${total}`)
  }
}

const dir = path.join (__dirname,'input')
fs.readdir(dir, (error,files) => {
    if (error) {
        console.log ('Ocurrio Un Error')
    }
    else if (files && Array.isArray(files) && files.length ) {
        carpetasTotal = files.length
    const Carpetas_Fechas = []
    files.forEach(file => {
          Carpetas_Fechas.push ( path.join (dir,file) )
    })
    Carpetas_Fechas.forEach ( fecha => {
        fs.stat ( fecha,function (error,carpeta_fecha)  {
            if (error) {
                console.log ('Ocurrio Un Error')
            } else if (carpeta_fecha.isDirectory() ) {
                fs.readdir (fecha , (error_orden , orden)=>{
                    if ( error_orden ) {
                        console.log('Ocurrio Un Error')
                    } else if (orden && Array.isArray(orden) && orden.length){
                        archivosTotal += orden.length
                        orden.forEach ( Orden_For => {
                            const Path_Orden = path.join (fecha,Orden_For)
                            fs.readFile( Path_Orden, (Error_Orden,Data) => {
                                if (Error_Orden) {
                                    console.log('Ocurrio Un Error')
                                } else {
                                    const Data_String = Data.toString()
                                    try {
                                    const Data_Parse = JSON.parse(Data_String)
                                    subtotales.push(Data_Parse.total)
                                    archivosProcesadas += 1
                                    mostrarTotal()
                                    } catch (JSON_error) {
                                        console.log('ERROR EN JSON')
                                    }
                                    }
                            })
                        })
                    }
                })
            }
        })
        carpetasProcesadas += 1
    })
  }
 
})