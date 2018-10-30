import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'component-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  row: number[] = [1, 2, 3, 4]
  count: number[] = [1, 2, 3, 4]
  constructor() { }

  ngOnInit(): void {
  }

  showPopup(): void {
      const popup = document.getElementById('myPopup')
      popup.classList.toggle('show')
  }

}
