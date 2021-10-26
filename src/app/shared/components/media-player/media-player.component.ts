import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  mockCover: TrackModel = {
    name: 'Getting Over',
    album: 'One Love',
    cover: 'https://jenesaispop.com/wp-content/uploads/2009/09/guetta_onelove.jpg',
    url: 'http://localhost:3000/track.mp3',
    _id: 1
  }
  listObserver$: Array<Subscription> = []

  constructor(private multimediaService: MultimediaService) { }
  
  ngOnInit(): void {
    const observe1$: Subscription  =  this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log('Recibiendo cancion....', response)
      }
    )
    this.listObserver$ = [observe1$]
  }

  ngOnDestroy(): void {
    this.listObserver$.forEach(u => u.unsubscribe())
    console.log('Componente destruido')
  }

}
