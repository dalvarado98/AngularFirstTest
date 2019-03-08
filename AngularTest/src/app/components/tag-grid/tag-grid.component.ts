import {Observable, Subject, merge} from 'rxjs';
import { TagService } from './../../services/tag.service';
import { Tag } from './../../models/Tag';
import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tag-grid',
  templateUrl: './tag-grid.component.html',
  styleUrls: ['./tag-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagGridComponent implements OnInit {


  @Input() gridColumns: number;
  @Output() tagsChanged: EventEmitter<Tag[]> =   new EventEmitter();
  preference;
  tags: Tag[];
  appTags: Tag[];
  tagsMatrix: Tag[][];
  columnNumbers: number[];
  rowNumbers: number[];
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  search;
  formatter;

  constructor(private tagService: TagService) {
  }

  ngOnInit() {
    this.loadAppTags();
    this.loadSearchTags();
    this.tags = [];
    this.loadMatrixDetails();
  }

  loadMatrixDetails() {
    this.columnNumbers = Array.apply(null, {length: this.gridColumns}).map(Number.call, Number);
    this.rowNumbers = Array.apply(null, {length: Math.ceil(this.tags.length / this.gridColumns)}).map(Number.call, Number);
    this.tagsMatrix = this.tags.reduce((rows, key, index) => (index % this.gridColumns == 0 ? rows.push([key])
    : rows[rows.length-1].push(key)) && rows, []);
  }

  loadAppTags() {
    this.tagService.getAllTags().subscribe(responseTags => {
      this.appTags = responseTags;
    });
  }

  loadSearchTags() {
    this.search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$;
      console.log("called");
      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => this.appTags)
      );
    }
    this.formatter = (x: {name: string}) => x.name;
  }

  deleteTag(tag: string) {
    this.tags = this.tags.filter(function(ele){
      if(ele.name !== tag) {
        return ele;
      }
    });
    this.loadMatrixDetails();
    this.tagsChanged.emit(this.tags);
  }

  onEnterTag() {

    if (typeof this.preference === 'object') {
      this.tags.push(this.preference);
    } else {
      let inputTag: Tag = new Tag();
      let createdTag;
      inputTag.name = this.preference;
      this.tagService.createUser(inputTag).subscribe(
        tagResponse => {
          this.loadAppTags();
          this.tags.push(tagResponse.body);
          this.loadMatrixDetails();
          this.tagsChanged.emit(this.tags);
        }
      );

    }
    this.loadMatrixDetails();
    this.preference = null;
    this.tagsChanged.emit(this.tags);

  }
}
