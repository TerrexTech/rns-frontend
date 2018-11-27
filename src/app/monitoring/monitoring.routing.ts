import { CarbonComponent } from './carbon/carbon.component'
import { EthyleneComponent } from './ethylene/ethylene.component'
import { SensorComponent } from './sensor/sensor.component'
import { TemperatureComponent } from './temperature/temperature.component'

export const MonitoringRoutes = {
    carbon: {
        path: 'metrics',
        title: 'Metrics',
        component: CarbonComponent
    },
    ethylene: {
        path: 'monitor-ethylene',
        title: 'Monitor Ethylene',
        component: EthyleneComponent
    },
    sensor: {
        path: 'sensors',
        title: 'Sensors',
        component: SensorComponent
    },
    temperature: {
        path: 'monitor-temperature',
        title: 'Monitor Temperature',
        component: TemperatureComponent
    }
}
