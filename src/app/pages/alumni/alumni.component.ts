import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alumni',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss'],
})
export class AlumniComponent {
  alumniStory = {
    title: 'Our Alumni',
    subtitle: 'Stories of faith, service and leadership',
    image: '../../../../assets/about/image_3.png',
    description:
      'UBS alumni continue to serve in churches, mission fields, theological education, and community leadership across India and beyond. Their lives bear testimony to the seminary’s conviction that faithful biblical teaching, spiritual formation, and Christ-centred discipleship prepare servants for lasting impact.',
    highlight:
      'From local congregations to cross-cultural mission work, the stories of our graduates reflect courage, humility, and a deep commitment to the gospel.',
  };
}
