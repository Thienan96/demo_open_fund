import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import Chart from "chart.js/auto";
import { FundStore } from "src/app/data-access/store/fund.store";

@Component({
  selector: "app-bar-chart",
  standalone: true,
  imports: [],
  templateUrl: "./bar-chart.component.html",
  styleUrl: "./bar-chart.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnInit {
  private fundStore = inject(FundStore);
  chart: any;
  createChart(labels: string[], buy: string[], sell: string[]) {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart("barChart", {
      type: "bar", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: labels,
        datasets: [
          {
            label: "Buy",
            data: buy,
            backgroundColor: "#009688",
          },
          {
            label: "Sell",
            data: sell,
            backgroundColor: "#aa3b42",
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngOnInit(): void {
    this.fundStore.volume$.subscribe((r) => {
      const labels = r.map((rr) => rr.date);
      const buy = r.map((rr) => `${rr.buy}`);
      const sell = r.map((rr) => `${rr.sell}`);
      this.createChart(labels, buy, sell);
    });
  }
}
