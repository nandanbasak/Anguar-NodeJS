import { NgModule } from '@angular/core';
import { StatelistComponent } from '../statelist/statelist.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    // ...existing code...
    StatelistComponent
  ],
  imports: [
    // ...existing code...
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCommonModule
  ],
  exports: [
    StatelistComponent,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCommonModule

  ]
})
export class ControllersModule {}
