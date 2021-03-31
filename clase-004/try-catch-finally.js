function intento() {
  try {
    console.log('Estoy empezando el try')
    // const vodka = 120
    // console.log('Ya declare vodka')
    // if (vodka >= 120) {
    //   const error = new Error('El vodka esta muy caro')
    //   throw error
    // }
    let divisionPorCero = 100 / 0
    if (isNaN(divisionPorCero) || divisionPorCero === Infinity) {
      throw new Error('La cuenta esta mal hecha')
    }
  } catch (error) {
    // console.log('Upa')
    // console.log(typeof error)
    // console.log(error.name)
    console.log(error.message)
    // console.log(error.stack)
    // throw new Error('Intento fallo')
  // } finally {
    // console.log('Pase por finally')
  }
  // console.log('pase por aca')
}

function main() {
  try {
    intento()
  } catch (error) {
    console.log('Estoy en main y fallo todo')
    console.log(error.message)
  }
}

main()
