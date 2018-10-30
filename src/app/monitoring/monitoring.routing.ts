import { CarbonComponent } from './carbon/carbon.component'
import { EthyleneComponent } from './ethylene/ethylene.component'
import { SensorComponent } from './sensor/sensor.component'
import { TemperatureComponent } from './temperature/temperature.component'

export const MonitoringRoutes = {
    carbon: {
        path: 'monitor-carbon',
        title: 'Monitor Carbon',
        component: CarbonComponent
    },
    ethylene: {
        path: 'monitor-ethylene',
        title: 'Monitor Ethylene',
        component: EthyleneComponent
    },
    sensor: {
        path: 'monitor-sensor',
        title: 'Monitor Sensor',
        component: SensorComponent
    },
    temperature: {
        path: 'monitor-temperature',
        title: 'Monitor Temperature',
        component: TemperatureComponent
    }
}
