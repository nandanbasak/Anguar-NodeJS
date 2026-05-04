import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {
  selectedCountry: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // Get the saved location from service
    this.productService.getSelectedLocation().subscribe(location => {
      if (location) {
        this.selectedCountry = location;
      }
    });
  }

  onCountryChange(event: any) {
    this.selectedCountry = event.target ? event.target.value : event;
  }

  applyLocation() {
    if (this.selectedCountry) {
      this.productService.setSelectedLocation(this.selectedCountry);
      console.log('Location applied:', this.selectedCountry);
    }
  }
}
