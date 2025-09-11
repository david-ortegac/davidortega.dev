import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorials',
  imports: [],
  templateUrl: './tutorials.component.html',
  styleUrl: './tutorials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
 }
