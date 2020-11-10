import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  public arr = [1, 23, 3, 2, 32, 3, 23, 23, 2, 32, 3, 23, 2, 3];

  constructor() { }

  ngOnInit(): void {
  }

}
