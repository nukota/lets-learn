import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar-group',
  standalone: false,
  templateUrl: './sidebar-group.component.html',
  styleUrl: './sidebar-group.component.scss',
})
export class SidebarGroupComponent {
  @Input() hasBorder = true;
}
