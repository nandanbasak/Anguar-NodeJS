import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-menuitems",
  templateUrl: "./menuitems.component.html",
  styleUrls: ["./menuitems.component.css"],
})
export class MenuitemsComponent implements OnInit {
  constructor(private productService: ProductService) {}
  menuItems: any = [];
  isExpanded: boolean = true;

  ngOnInit() {
    // Fetch categories from ProductService
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.menuItems = categories.map(cat => ({
          MENU_NAME: cat.name,
          MENU_CODE: cat.id,
          icon: cat.icon
        }));
        console.log(`Menu Items loaded: ${this.menuItems.length} categories`);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
    console.log(`Menu is now ${this.isExpanded ? 'expanded' : 'collapsed'}`);
  }

  getIconForMenu(menuName: string): string {
    // Try to find icon from menu item first
    const item = this.menuItems.find((m: any) => m.MENU_NAME === menuName);
    if (item && item.icon) {
      return item.icon;
    }

    // Fallback to icon map
    const iconMap: { [key: string]: string } = {
      'health & medical': 'local_hospital',
      'education': 'school',
      'beauty & wellness': 'spa',
      'home services': 'home',
      'technology & it': 'computer',
      'legal & finance': 'gavel',
      'countrylist': 'public',
      'statelist': 'location_city',
      'productcategory': 'category',
      'sitemap': 'sitemap',
      'about': 'info',
      'contact': 'mail',
      'geolocation': 'place',
      'register': 'person_add'
    };
    return iconMap[menuName.toLowerCase()] || 'dashboard';
  }
}