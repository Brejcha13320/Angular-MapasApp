import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Map, Popup, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) {}

  ngOnInit(): void {
    console.log(this.placesService.userLocation);
  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup().setHTML(`
      <h6>Aquí estoy</h6>
      <span>Estoy en este lugar del mundo</span>
      `);

    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocation!)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);
  }
}
