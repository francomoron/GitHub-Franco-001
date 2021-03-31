let auto = {
  marca: 'Renault',
  modelo: '4'
  seguro: function() {
    return 'algo'
  }
}

function seguro(autoParam) {
  autoParam.modelo = '9'
  console.log(`Dentro de la funcion: ${JSON.stringify(autoParam)}`)
}

console.log(auto)
seguro(auto)
console.log(auto)
