import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import Chart from "chart.js/auto";
import { FundStore } from "src/app/data-access/store/fund.store";
@Component({
  selector: "app-line-chart",
  standalone: true,
  imports: [],
  templateUrl: "./line-chart.component.html",
  styleUrl: "./line-chart.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements OnInit {
  private fundStore = inject(FundStore);
  chart: any;
  createChart(labels: string[], data: string[]) {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart("lineChart", {
      type: "line", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: labels,
        datasets: [
          {
            label: "NAV/Unit(VND)",
            data: data,
            backgroundColor: "#009688",
            borderColor:  "#009688"
          },
        ]
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  ngOnInit(): void {
    this.fundStore.nav$.subscribe((r) => {
      const labels = r.map((rr) => rr.navDate);
      const data = r.map((rr) => `${rr.nav}`);
      this.createChart(labels, data);
    });
  }
}
