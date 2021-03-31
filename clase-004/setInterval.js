function futuro() {
  console.log('Empece futuro')
  let i = 0
  const timer = setInterval(function () {
    console.log(`Intervalo ${i}`)
    i++
    if (i > 10) {
      clearInterval(timer)
    }
  }, 500)
}

function main() {
  console.log('Empezo main')
  futuro()
  console.log('Termino main')
}

main()
