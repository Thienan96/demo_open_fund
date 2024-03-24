import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDividerModule } from "@angular/material/divider";
import { FundService } from "src/app/data-access/service/fund.service";
import { FundStore } from "src/app/data-access/store/fund.store";
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { CommentComponent } from "../comment/comment.component";
import { LineChartComponent } from "../line-chart/line-chart.component";
@Component({
  selector: "app-detail",
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatDividerModule,
    LineChartComponent,
    BarChartComponent,
    CommentComponent,
    CommonModule,
    MatDividerModule
  ],
  templateUrl: "./detail.component.html",
  styleUrl: "./detail.component.scss",
  providers: [FundStore, FundService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnChanges {
  private fundStore = inject(FundStore);
  fund$ = this.fundStore.detail$;
  optionNav: 6 | 12 = 12;
  @Input() id!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["id"] && this.id) {
      this.fundStore.loadDetail$(this.id);
      this.setMonth(this.optionNav);
    }
  }

  setMonth(month: 6 | 12) {
    this.optionNav = month;
    this.fundStore.loadNAV$(this.optionNav);
    this.fundStore.loadVolume$(this.optionNav);
  }
}
