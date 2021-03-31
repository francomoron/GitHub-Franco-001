// Tarea: hacer un programa que tenga un array de objectos que sean marcas y autos, calcular el seguro de cada uno, y el total a pagar

class Auto
{
  constructor(marca, modelo, valor, anio, tipoSeguro)
  {
    this.marca = marca
    this.modelo = modelo
    this.valor = valor
    this.anio = anio
    this.tipoSeguro = tipoSeguro
  }
  seguro(){
    let a = new Date().getFullYear()
    let seguro=0

    if(this.tipoSeguro==="TR") // Verifico si eligió Todo Riesgo
    {
      if(a-this.anio <= 10){ // verifico si el auto es mas viejo que 10 años
        seguro = this.valor * 0.01 // calculo el 1% de valor del auto
      }
      else{
        seguro = 10000 //valor alto porque el auto es muy viejo
      }
    }
    else{
      // Otro seguro. Ejemplo Contra Terceros
      seguro = 800
    }
    return seguro
  }
}

let listaAutos=[]
listaAutos.push(new Auto("Ford", "Focus", 350000, 2010, "TR"))
listaAutos.push(new Auto("Ford", "Taunus", 230000, 1984, "CT"))
listaAutos.push(new Auto("Reanult", "Fuego", 300000, 1985, "TR"))

listaAutos.forEach(function(auto){
  console.log(`${auto.marca} | ${auto.modelo} | ${auto.anio} | $${auto.seguro()}`)
})

const total = listaAutos.reduce((acumulado, unAuto) => acumulado + unAuto.Seguro(), 0)
console.log(`El total de los seguros es: $${total}`)
