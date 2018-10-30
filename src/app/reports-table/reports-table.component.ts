import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Http } from '@angular/http'
import { LoadInventoryJsonService } from '../services/load-inventory-json/load-inventory-json.service'
import { Inventory } from '../models/inventory'
import { SelectionModel } from '@angular/cdk/collections'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MockUtils } from '../reports/mocks'
import { MockMonitor } from '../monitoring/mocksMonitor'
const Food: Inventory[] = []

@Component({
  selector: 'component-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ReportsTableComponent implements OnInit {

  selection = new SelectionModel<Inventory>(true, [])
  expandedElement: any
  ethyData: any
  invData: any
  flashData: any
  savingsData: any
  sensorData: any
  tempData: any
  wasteData: any
  carbonMon: any
  ethyMon: any
  sensorMon: any
  tempMon: any
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  dtOptions: any = {}
  @ViewChild('table') table: any
  @Input() displayedColumns: string[]
  @Input() jsonFields: number
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('query') query: ElementRef
  @ViewChild('field') field: ElementRef
  @ViewChild('formDate') formDate: ElementRef
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow')

  constructor(
    private http: Http,
    private loadInventoryJsonService: LoadInventoryJsonService,
    public dialog: MatDialog
             ) { }

  ngOnInit(): void {

    if (this.jsonFields === 1) {
      const mock = new MockUtils()
      console.log(mock.genEthyData())
      this.ethyData = mock.genEthyData()
      this.dataSource.data = this.ethyData
    }

    else if (this.jsonFields === 2) {
      const mock = new MockUtils()
      console.log(mock.genInvData())
      this.invData = mock.genInvData()
      this.dataSource.data = this.invData
    }

    else if (this.jsonFields === 3) {
      const mock = new MockUtils()
      console.log(mock.genFlashData())
      this.flashData = mock.genFlashData()
      this.dataSource.data = this.flashData
    }

    else if (this.jsonFields === 4) {
      const mock = new MockUtils()
      console.log(mock.genSavingsData())
      this.savingsData = mock.genSavingsData()
      this.dataSource.data = this.savingsData
    }

    else if (this.jsonFields === 5) {
      const mock = new MockUtils()
      console.log(mock.genTempData())
      this.tempData = mock.genTempData()
      this.dataSource.data = this.tempData
    }

    else if (this.jsonFields === 6) {
      const mock = new MockUtils()
      console.log(mock.genSensorData())
      this.sensorData = mock.genSensorData()
      this.dataSource.data = this.sensorData
    }

    else if (this.jsonFields === 7) {
      const mock = new MockUtils()
      console.log(mock.genWasteData())
      this.wasteData = mock.genWasteData()
      this.dataSource.data = this.wasteData
    }

    else if (this.jsonFields === 8) {
      const mock = new MockMonitor()
      console.log(mock.genCarbonData())
      this.carbonMon = mock.genCarbonData()
      this.dataSource.data = this.carbonMon
    }

    else if (this.jsonFields === 9) {
      const mock = new MockMonitor()
      console.log(mock.genEthyleneData())
      this.ethyData = mock.genEthyleneData()
      this.dataSource.data = this.ethyData
    }

    else if (this.jsonFields === 10) {
      const mock = new MockMonitor()
      console.log(mock.genSensorData())
      this.sensorMon = mock.genSensorData()
      this.dataSource.data = this.sensorMon
    }

    else if (this.jsonFields === 11) {
      const mock = new MockMonitor()
      console.log(mock.genTempData())
      this.tempMon = mock.genTempData()
      this.dataSource.data = this.tempMon
    }

    // this.loadInventoryJsonService.getJsonTest()
    //   .subscribe(data => {
        // console.log(data)
        // for(var elem in data){
        //   if(data.hasOwnProperty(elem)){
        //     data[elem].timestamp = new Date(data[elem].timestamp * 1000).toISOString().split('T')[0]
        //     data[elem].date_arrived = new Date(data[elem].date_arrived * 1000).toISOString().split('T')[0]
        //   }
        // }
       // console.log(data)
        // this.dataSource.data = this.mock.genEthyData()
        // Food = data
      // })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length

    return numSelected === numRows
  }

  /** Selects all rows if they are not all selected otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row))
  }

}
