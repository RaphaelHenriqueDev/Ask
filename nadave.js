function orderArray(baguncado) {
  if (baguncado.length !== 6) {
    throw new Error('O array deve conter exatamente 6 elementos')
  }

  // Etapa 1: Separar e redistribuir
  let metade1 = baguncado.slice(0, 3)
  let metade2 = baguncado.slice(3)

  let finish1 = false
  let finish2 = false

  while (!(finish1 && finish2)) {
    let encontrouMaior = false
    for (let i = 0; i < metade1.length; i++) {
      if (metade1[i] > 3) {
        metade2.push(metade1.splice(i, 1)[0])
        encontrouMaior = true
        break
      }
    }
    finish1 = !encontrouMaior

    let encontrouMenor = false
    for (let i = 0; i < metade2.length; i++) {
      if (metade2[i] < 4) {
        metade1.push(metade2.splice(i, 1)[0])
        encontrouMenor = true
        break
      }
    }
    finish2 = !encontrouMenor
  }

  // Etapa 2: Organizar cada metade com segundo maior antes do maior
  function organizarMetade(arr) {
    if (arr.length < 2) return arr

    let copia = [...arr]
    copia.sort((a, b) => a - b)

    let maior = copia.pop()
    let segundoMaior = copia.pop()

    // O resto
    let resto = copia

    return [...resto, segundoMaior, maior]
  }

  const metade1Organizada = organizarMetade(metade1)
  const metade2Organizada = organizarMetade(metade2)

  // Juntar resultado final
  return [...metade1Organizada, ...metade2Organizada]
}

const resultado = orderArray([100, 12, 3000, 45000, 29, 11])
console.log(resultado)
