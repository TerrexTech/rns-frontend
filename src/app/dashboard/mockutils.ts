import randomstring from 'random-string'
import uuid from 'uuid/v4'

export class MockUtils {
  genBarcode(): number {
    const s = randomstring({
      length: 12,
      letters: false
    })

    return parseInt(s, 16)
  }

  genSKU(): string {
    const s1 = randomstring({ length: 3 })
    const s2 = randomstring({ length: 3 })
    const s3 = randomstring({ length: 3 })
    const s4 = randomstring({ length: 2 })

    return `${s1}-${s2}-${s3}-${s4}`.toUpperCase()
  }

  genUUID(): string {

    return uuid()
  }

  genDeviceID(): string {

    return this.genUUID()
  }

  genInt(min: number, max: number): number {

    return Math.floor(Math.random() * (max - min)) + min
  }

  genFloat(min: number, max: number): number {

    return (Math.random() * (max - min)) + min
  }

  genName(): string {
    const dictionary = [
      'Apple',
      'Banana',
      'Grapes',
      'Lettuce',
      'Mango',
      'Orange',
      'Pear',
      'Strawberry',
      'Sweet Pepper',
      'Tomato'
    ]

    const index = this.genInt(0, dictionary.length)

    return dictionary[index]
  }

  genOrigin(): string {
    const dictionary = [
      'ON Canada',
      'BC Canada',
      'SK Canada',
      'MN Canada',
      'NS Canada',
      'PEI Canada',
      'QC Canada'
    ]

    const index = this.genInt(0, dictionary.length)

    return dictionary[index]
  }

  avgWeight(fruit: string): number {
    const dictionary = {
      Apple:        0.33,
      Banana:       0.26,
      Grapes:       0.01,
      Lettuce:      0.028,
      Mango:        0.44,
      Orange:       0.30,
      Pear:         0.44,
      Strawberry:   0.026,
      'Sweet Pepper': 0.992,
      Tomato:       0.328
    }

    if (dictionary[fruit] === undefined) {

      return this.genFloat(0, 1)
    }

    return dictionary[fruit]
  }

  genDateArrived(): number {

    return Date.now()
  }

  genWeight(): number {

    return this.genFloat(100, 500)
  }

  genPrice(): number {

    return this.genFloat(5000, 10000)
  }

  genLot(): string {
    const s1 = randomstring({ length: 2 })
    const i1 = this.genInt(0, 9999)

    return `${s1}${i1}`.toUpperCase()
  }
}
