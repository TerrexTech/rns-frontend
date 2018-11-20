import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Http } from '@angular/http'
import { Inventory } from '../../models/inventory'
import { InventoryService } from '../inventory.service'

@Component({
  selector: 'component-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  displayedColumns: string[] =
  ['upc', 'sku', 'name', 'origin', 'lot', 'dateArrived', 'soldWeight', 'totalWeight']
dataSource = new MatTableDataSource()
today: number = Date.now()
@ViewChild(MatPaginator) paginator: MatPaginator
@ViewChild(MatSort) sort: MatSort

constructor(private http: Http, public dialog: MatDialog, private showService: InventoryService) {
}

ngOnInit(): void {

  this.showService.getTable()
    .toPromise()
    .then((data: any) => {
      if (data.data.InventoryQueryCount) {
      console.log(data.data.InventoryQueryCount)
      this.dataSource.data = data.data.InventoryQueryCount
      }
      else {
        alert('Timed out.')
      }

    }
    )
    .catch()

  this.dataSource.paginator = this.paginator
  this.dataSource.sort = this.sort
}

}
