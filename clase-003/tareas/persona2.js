function calcularSeguro(marcaFunc, modeloFunc) {
    let vaAPagar = 1000
    if (marcaFunc === 'Renault') {
      vaAPagar *= 0.8
    }
    // total += vaAPagar
    return vaAPagar
  }

  const autos = [
      {
        marca: 'Renault',
        modelo: '4'
      },
      {
        marca: 'Ford',
        modelo: 'Taunus'
      }
  ]

  for (let auto of autos){
    const seguro = calcularSeguro(auto.marca, auto.modelo)
    console.log(`El seguro de ${auto.marca} modelo ${auto.modelo} es: $${seguro}`)
  }