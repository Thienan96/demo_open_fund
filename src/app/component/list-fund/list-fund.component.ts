import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { Fund } from "src/app/data-access/model/model";
import { FundService } from "src/app/data-access/service/fund.service";
import { MatSortModule } from "@angular/material/sort";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FundStore } from "src/app/data-access/store/fund.store";
@Component({
  selector: "app-list-fund",
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatSortModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: "./list-fund.component.html",
  styleUrl: "./list-fund.component.scss",
  providers: [FundStore, FundService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListFundComponent implements OnInit {
  private fundStore = inject(FundStore);
  private cd = inject(ChangeDetectorRef);
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ["code", "currentPrice", "navPercent", "date"];
  dataSource!: MatTableDataSource<Fund>;
  ngOnInit() {
    this.fundStore.loadList$();
    this.fundStore.funds$.subscribe((r) => {
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
      this.cd.markForCheck();
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
