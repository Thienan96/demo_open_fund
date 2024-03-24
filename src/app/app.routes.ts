import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "list-fund", pathMatch: "full" },
  {
    path: "list-fund",
    loadComponent: () =>
      import("./component/list-fund/list-fund.component").then(
        (m) => m.ListFundComponent
      ),
  },
  {
    path: "fund/:id",
    loadComponent: () =>
      import("./component/detail/detail.component").then(
        (m) => m.DetailComponent
      ),
  },
];
