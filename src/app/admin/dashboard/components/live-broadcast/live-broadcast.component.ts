import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-live-broadcast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-broadcast.component.html',
  styleUrls: ['./live-broadcast.component.scss'],
})
export class LiveBroadcastComponent {
  @Input() isLive = false;
  @Output() toggle = new EventEmitter<void>();
}
