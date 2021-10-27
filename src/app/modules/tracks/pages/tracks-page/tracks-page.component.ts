import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];
  listObservers$: Array<Subscription> = []

  constructor(private tracksService: TracksService) {}

  ngOnInit(): void {
    const observe1$ = this.tracksService.dataTracksTranding$
    .subscribe(arg => {
      this.tracksTrending =  arg
      this.tracksRandom =  arg
      console.log('Cancion llegando....', arg)
      });
    this.listObservers$ = [observe1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
}
 