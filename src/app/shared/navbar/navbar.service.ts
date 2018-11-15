import { TokenService } from '../../_Auth/token.service'
import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class NavbarService {
    constructor(
        @Inject(HttpClient)
        private http: HttpClient
      ) {}

      private _subject = new Subject<any>()

      newEvent(event: number): void {
        this._subject.next(event++)
      }

      get events$(): any {
        return this._subject.asObservable()
      }
}
