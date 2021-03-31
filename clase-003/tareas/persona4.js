const construirUnAuto = (unaMarca, unModelo, unAño) => {
  return {
  	marca: unaMarca,
    modelo: unModelo,
    año: unAño,
  
    seguro: function() {
    	let valor = 1000

      switch(this.marca) {
        case 'Peugeot':
        case 'Citroën':
          valor *= 1.1
          break
        case 'Audi':
        case 'BMW':
          valor *= 2
          break
      }

      if (this.año < 2015)
        valor += (2015 - this.año) * 100
      
      return valor
    },
  
    stringify: function() {
      return `Un ${this.marca} ${this.modelo} del año ${this.año}, asegurado por $${this.seguro()}`
    }
  }
}

const autos = []
autos.push(construirUnAuto('Peugeot','107', 2016))
autos.push(construirUnAuto('Citroën','C1', 2015))
autos.push(construirUnAuto('Audi','A1', 2012))
autos.push(construirUnAuto('BMW','X1', 2013))
autos.push(construirUnAuto('Renault','Megane', 2017))

autos.forEach(unAuto => { console.log(unAuto.stringify()) })

const total = autos.reduce((acumulado, unAuto) => acumulado + unAuto.seguro(), 0)
console.log(`Será un total de $${total} en seguros`)