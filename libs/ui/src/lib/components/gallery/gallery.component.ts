import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  imagenSeleccionadaURL!: string;

  @Input() images!: string[];

  ngOnInit(): void {
    if (this.hayImagenes) {
      this.imagenSeleccionadaURL = this.images[0];
    }
  }

  changeImagenSeleccionada(imagenUrl: string) {
    this.imagenSeleccionadaURL = imagenUrl;
  }

  get hayImagenes() {
    return this.images?.length > 0;
  }
}
