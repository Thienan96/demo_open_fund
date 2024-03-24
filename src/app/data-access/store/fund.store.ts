import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { filter, map, Observable, switchMap, take, tap } from "rxjs";
import { Comment, Fund, NAV, Volume } from "../model/model";
import { FundService } from "../service/fund.service";

export interface FundState {
  status: string;
  funds: Fund[];
  detail: Fund;
  nav: NAV[];
  volume: Volume[];
  comments: Comment[];
}

@Injectable()
export class FundStore extends ComponentStore<FundState> {
  readonly setDetail = this.updater((state, detail: Fund) => {
    return {
      ...state,
      detail,
    };
  });
  readonly setFunds = this.updater((state, funds: Fund[]) => {
    return {
      ...state,
      funds,
    };
  });
  readonly setNAV = this.updater((state, nav: NAV[]) => {
    return {
      ...state,
      nav,
    };
  });
  readonly setVolume = this.updater((state, volume: Volume[]) => {
    return {
      ...state,
      volume,
    };
  });
  readonly setComment = this.updater((state, comments: Comment[]) => {
    return {
      ...state,
      comments,
    };
  });
  readonly detail$ = this.select((s) => s.detail).pipe(
    filter((detail) => !!detail)
  );
  readonly funds$ = this.select((s) => s.funds).pipe(
    filter((funds) => !!funds)
  );
  readonly nav$ = this.select((s) => s.nav).pipe(filter((nav) => !!nav));
  readonly volume$ = this.select((s) => s.volume).pipe(
    filter((volume) => !!volume)
  );
  readonly comments$ = this.select((s) => s.comments).pipe(
    filter((comments) => !!comments)
  );

  readonly loadList$ = this.effect((params$) =>
    params$.pipe(
      switchMap((r) => this.fundService.getFunds()),
      tap((funds) => {
        this.setFunds(funds);
      })
    )
  );

  readonly loadDetail$ = this.effect((params$: Observable<number>) =>
    params$.pipe(
      switchMap((r) => this.fundService.getFundDetail(r)),
      tap((detail) => {
        this.setDetail(detail);
      })
    )
  );

  readonly loadNAV$ = this.effect((params$: Observable<6 | 12>) =>
    params$.pipe(
      switchMap((month) => this.fundService.getNav(month)),
      tap((nav) => {
        this.setNAV(nav);
      })
    )
  );

  readonly loadVolume$ = this.effect((params$: Observable<6 | 12>) =>
    params$.pipe(
      switchMap((month) => this.fundService.getVolume(month)),
      tap((volume) => {
        this.setVolume(volume);
      })
    )
  );

  readonly loadComments$ = this.effect((params$) =>
    params$.pipe(
      switchMap(() => this.fundService.getComments()),
      tap((comment) => {
        this.setComment(comment);
      })
    )
  );

  readonly likeComment$ = this.effect((params$: Observable<number>) =>
    params$.pipe(
      switchMap((id) => {
        return this.comments$.pipe(
          take(1),
          map((comments) => {
            return { comments, id };
          })
        );
      }),
      tap(({ comments, id }) => {
        let likeComments = comments.map((r) => {
          if (r.id === id) {
            r.liked = !r.liked;
          }
          return r;
        });
        this.setComment(likeComments);
      })
    )
  );

  constructor(private fundService: FundService) {
    super(<FundState>{});
  }
}
