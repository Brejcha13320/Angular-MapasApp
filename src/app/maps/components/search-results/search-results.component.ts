import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  public selectedId: string = '';

  constructor(
    private mapService: MapService,
    private placesService: PlacesService
  ) {}

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;

    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {
    if (!this.placesService.userLocation) throw Error('No hay userLocation');
    this.placesService.deletePlaces();
    const start = this.placesService.userLocation;
    const end = place.center as [number, number];
    this.mapService.getRouteBetweenPoints(start, end);
  }
}
