import {Component, Input} from 'angular2/core'


@Component({
    selector: 'config',
    template: `
        <h2>Config</h2>
        <div *ngFor="#shape of data.shapes">
            <div *ngIf="isHeader(shape.name)">
                {{shape.name}}
                <input type='text'>
                <button (click)=saveConfig()>Save</button>
            </div>
        </div> 
    `,
    styles: []
})


export class ConfigComponent {
    @Input() data;
    
    isHeader(type) {
        if (type == 'Header') {
            return true;
        } else {
            return false;
        }
    }
    
    
    saveConfig() {
        alert('test');
    }
    
}