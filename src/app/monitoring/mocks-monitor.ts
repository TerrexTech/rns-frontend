import randomstring from 'random-string'
import uuid from 'uuid/v4'

export class MockMonitor {
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

        return new Date().getTime()
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

    genCarbonData(min, max, iteration: number): any {
        const array1 = []
        for (let index = 0; index < iteration; index++) {
            array1.push({
                Carbon: this.genFloat(min, max)
                    .toFixed(2),
                Timestamp: this.genArrivalDate()
            })
        }

        return array1
    }

    genEthyleneData(min, max, iteration: number): any {
        const array2 = []
        for (let index = 0; index < iteration; index++) {
            array2.push({
                Ethylene: this.genFloat(min, max)
                    .toFixed(2),
                Timestamp: new Date(this.genArrivalDate())
                    .toLocaleString()
                    .split(',')[1]
            })
        }
        localStorage.setItem('ethylene', JSON.stringify(array2))

        return array2
    }

    genSensorData(): any {
        const array3 = []
        console.log(localStorage.getItem('sensor') !== undefined)
        if (localStorage.getItem('sensor') === undefined) {

            return JSON.parse(localStorage.getItem('sensor'))
        } else {

            const flashArr = []

            for (let index = 0; index < 10; index++) {
                array3.push({
                    SKU: this.genSKU(),
                    Name: this.genName(),
                    'Sensor #': this.genFloat(1, 40)
                        .toFixed(0),
                    status: 'good',
                    'Last Maintenance': new Date(this.genArrivalDate())
                        .toISOString()
                        .split('T')[0],
                    Timestamp: new Date(this.genArrivalDate())
                        .toISOString()
                        .split('T')[0]
                })
            }
            localStorage.setItem('sensor', JSON.stringify(array3))
        }

        return array3
    }

    genTempData(): any {
        const array3 = []
        const flashArr = []

        for (let index = 0; index < 10; index++) {
            array3.push({
                Temperature: this.genFloat(1, 80)
                    .toFixed(2),
                Humidity: this.genFloat(1, 80)
                    .toFixed(2),
                Timestamp: new Date(this.genArrivalDate())
                    .toLocaleString()
                    .split(',')[1]
            })
        }
        localStorage.setItem('temp', JSON.stringify(array3))

        return array3
    }
}
