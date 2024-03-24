import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { FundStore } from "src/app/data-access/store/fund.store";
import { Comment } from "../../data-access/model/model";
@Component({
  selector: "app-comment",
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: "./comment.component.html",
  styleUrl: "./comment.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {
  private fundStore = inject(FundStore);
  comments$ = this.fundStore.comments$;
  like(id: number) {
    this.fundStore.likeComment$(id);
  }

  ngOnInit() {
    this.fundStore.loadComments$();
  }
}
