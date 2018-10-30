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

  genArrivalDate(): number {

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

  genEthyData(): any {
    const array1 = []
    console.log(localStorage.getItem('arr1') !== undefined)
    if (localStorage.getItem('arr1') === undefined) {
      console.log('here')

      return JSON.parse(localStorage.getItem('arr1'))
    } else {

      for (let index = 0; index < 100; index++) {
        array1.push({
          SKU: this.genSKU(),
          Name: this.genName(),
          Ethylene: this.genFloat(1, 80)
                        .toFixed(2),
          Timestamp: new Date(this.genArrivalDate())
                                    .toISOString()
                                    .split('T')[0],
          Status: 'Warning',
          'Projected Expiry': new Date(this.genArrivalDate() * 1.0001).toISOString()
                                                                      .split('T')[0],
          'Trend (%)': (this.genFloat(-1, 1) * 5).toFixed(0)
        })
      }
      console.log(array1)
      console.log('complete')
      localStorage.setItem('arr1', JSON.stringify(array1))
    }

    return array1
  }

  genInvData(): any {
    const array2 = []
    console.log(localStorage.getItem('arr2') !== undefined)
    if (localStorage.getItem('arr2') === undefined) {

      return JSON.parse(localStorage.getItem('arr2'))
    } else {

      const ethyleneArr = []

      for (let index = 0; index < 100; index++) {
        array2.push({
          SKU: this.genSKU(),
          Name: this.genName(),
          'Total Weight': this.genFloat(200, 500)
                                .toFixed(2),
          'Sold Weight': this.genFloat(100, 200)
                               .toFixed(2),
          Price: this.genPrice()
        })
      }
      localStorage.setItem('arr2', JSON.stringify(array2))
    }

    return array2
  }

  genFlashData(): any {
    const array3 = []
    console.log(localStorage.getItem('arr3') !== undefined)
    if (localStorage.getItem('arr3') === undefined) {

      return JSON.parse(localStorage.getItem('arr3'))
    } else {

      const flashArr = []

      for (let index = 0; index < 100; index++) {
        array3.push({
          SKU: this.genSKU(),
          Name: this.genName(),
          'Total Products (Kg)': this.genFloat(100, 300)
            .toFixed(2),
          'Total sold after flash sale': this.genFloat(200, 400)
            .toFixed(2),
          '% sold': (this.genFloat(-1, 1) * 5).toFixed(0) ,
          'Price ($)': this.genPrice()
        })
      }
      localStorage.setItem('arr3', JSON.stringify(array3))
    }

    return array3
  }

  genSavingsData(): any {
    const array4 = []
    console.log(localStorage.getItem('arr4') !== undefined)
    if (localStorage.getItem('arr4') === undefined) {

      return JSON.parse(localStorage.getItem('arr4'))
    } else {

      const savingsArr = []

      for (let index = 0; index < 100; index++) {
        array4.push({
          SKU: this.genSKU(),
          Name: this.genName(),
          'Total Product (Kg)': this.genFloat(200, 500),
          'Total Product Sold (Kg)': this.genFloat(100, 300),
          'Product Sold after Warning': this.genFloat(50, 100),
          'Price Saved ($)': this.genPrice()
        })
      }
      localStorage.setItem('arr4', JSON.stringify(array4))
    }

    return array4
  }

  genSensorData(): any {
    const array5 = []
    console.log(localStorage.getItem('arr5') !== undefined)
    if (localStorage.getItem('arr5') === undefined) {

      return JSON.parse(localStorage.getItem('arr5'))
    } else {

      const sensorArr = []

      for (let index = 0; index < 100; index++) {
        array5.push({
           Sensor: 100,
           'Working Sensors': 95,
           'Under Maintenance': 5,
          'Date Installed': this.genArrivalDate(),
          'Last Maintenance': this.genArrivalDate(),
           Status: this.genName(),
          'Price ($)': this.genPrice()
        })
      }
      localStorage.setItem('arr5', JSON.stringify(array5))
    }

    return array5
  }

  genTempData(): any {
    const array6 = []
    console.log(localStorage.getItem('arr6') !== undefined)
    if (localStorage.getItem('arr6') === undefined) {

      return JSON.parse(localStorage.getItem('arr6'))
    } else {

      const tempArr = []

      for (let index = 0; index < 100; index++) {
        array6.push({
          SKU: this.genSKU(),
          Sensor: this.genFloat(1, 10),
          Temperature: this.genFloat(200, 500)
            .toFixed(2),
          Humidity: this.genFloat(100, 200)
            .toFixed(2),
          CO2: this.genFloat(10, 50)
            .toFixed(2),
          Ethylene: this.genFloat(10, 50)
            .toFixed(2),
          Status: this.genName(),
          Timestamp: this.genArrivalDate()
        })
      }
      localStorage.setItem('arr6', JSON.stringify(array6))
    }

    return array6
  }

  genWasteData(): any {
    const array7 = []
    console.log(localStorage.getItem('arr7') !== undefined)
    if (localStorage.getItem('arr7') === undefined) {

      return JSON.parse(localStorage.getItem('arr7'))
    } else {

      const wasteArr = []

      for (let index = 0; index < 100; index++) {
        array7.push({
          SKU: this.genSKU(),
          Name: this.genName(),
          'Total Product (Kg)': this.genFloat(200, 500),
          'Total Product Sold (Kg)': this.genFloat(100, 300),
          'Product left over': this.genFloat(50, 100),
          '% left over': (this.genFloat(-1, 1) * 5).toFixed(0),
          'Price wasted ($)': this.genPrice()
        })
      }
      localStorage.setItem('arr7', JSON.stringify(array7))
    }

    return array7
  }
}
