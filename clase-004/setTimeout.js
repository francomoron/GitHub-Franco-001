function futuro() {
  console.log('Empece futuro')
  const timer = setTimeout(function () {
    console.log('Termine futuro')
  }, 3000)
  clearInterval(timer)
}

function main() {
  console.log('Empezo main')
  futuro()
  console.log('Termino main')
}

main()
