import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-message',
    imports: [CommonModule],
    templateUrl: './message.component.html',
    styleUrl: './message.component.scss'
})
export class MessageComponent {
    @Input() message: string = "";
    @Input() messageType!: "success" | "error";

    @Output() closeComponentEvent = new EventEmitter<void>();

    closeComponent() {
        this.closeComponentEvent.emit();
    }
}
