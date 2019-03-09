import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-feed-filter',
  templateUrl: './feed-filter.component.html',
  styleUrls: ['./feed-filter.component.css']
})
export class FeedFilterComponent implements OnInit {

  filterType: number;
  @Output() filterChanged: EventEmitter<number> =   new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.filterType = 1;
  }

  changedFilter(type: number) {
    this.filterType = type;
    this.filterChanged.emit(this.filterType);
  }

}
