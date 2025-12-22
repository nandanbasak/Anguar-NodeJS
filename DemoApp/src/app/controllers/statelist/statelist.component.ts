import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-statelist',
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.css'],
  
})
export class StatelistComponent implements OnInit, OnChanges {
  @Input() country: string = '';
  @Output() stateSelected = new EventEmitter<string>();

  stateControl = new FormControl('');
  filteredStates: Observable<string[]> = of([]);
  states: string[] = [];

  private countryStates: { [key: string]: string[] } = {
    'USA': ['California', 'Texas', 'New York', 'Florida', 'Illinois'],
    'India': ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Gujarat'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
    // Add more countries and states as needed
  };

  ngOnInit() {
    this.updateStates();
    this.stateControl.valueChanges.subscribe(value => {
      this.stateSelected.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['country']) {
      this.updateStates();
      this.stateControl.setValue(''); // Reset state field when country changes
    }
  }

  updateStates() {
    this.states = this.countryStates[this.country] || [];
    this.filteredStates = this.stateControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStates(value || ''))
    );
  }

  private _filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.toLowerCase().includes(filterValue));
  }
}
