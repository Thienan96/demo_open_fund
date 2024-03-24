import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Fund, NAV, Volume, Comment } from "../model/model";

@Injectable({
  providedIn: "root",
})
export class FundService {
  constructor(private http: HttpClient) {}

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(
      "https://my-json-server.typicode.com/Thienan96/demo_open_fund/funds"
    );
  }

  getFundDetail(id: number): Observable<Fund> {
    return this.http.get<Fund>(
      `https://my-json-server.typicode.com/Thienan96/demo_open_fund/funds/${id}`
    );
  }

  getNav(month: 6 | 12): Observable<NAV[]> {
    return this.http.get<NAV[]>(
      `https://my-json-server.typicode.com/Thienan96/demo_open_fund/nav${month}`
    );
  }

  getVolume(month: 6 | 12): Observable<Volume[]> {
    return this.http.get<Volume[]>(
      `https://my-json-server.typicode.com/Thienan96/demo_open_fund/volume${month}`
    );
  }

  getComments(): Observable<Comment[]> {
    return of([
      {
        id: 1,
        username: "Nguyen Hoa Thien An",
        comment:
          "Content Content Content Content Content Content Content Content Content Content Content Content",
      },
      {
        id: 2,
        username: "Nguyen Hoa Thien An",
        comment:
          "Content Content Content Content Content Content Content Content Content Content Content Content",
      },
      {
        id: 3,
        username: "Nguyen Hoa Thien An",
        comment:
          "Content Content Content Content Content Content Content Content Content Content Content Content",
      },
    ]);
  }
}
