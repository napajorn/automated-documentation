import {Component, Input} from 'angular2/core'
import {TextboxComponent} from './textbox.component'

@Component({
    selector: 'config',
    template: `
        <label *ngFor="#s of select">
            {{s}}
        </label>
        <h2>Config {{page?.pname}}</h2>
        <div *ngIf="page">
            Page: {{page.pid}} [{{page.pname}}]<br>
            
            ShapeID: {{shape.id}} [{{shape.name}}]<br>

            Value: {{shape.value}}<br>
            
            Properties:
            <ul *ngIf="shape?.properties">
                <li *ngFor="#prop of shape.properties">{{prop.label}}: {{prop.value}}</li>
            </ul>
    
           
           <text-component *ngIf="shape.name == 'Header'">Loading...</text-component>
           
            <div *ngIf="shape.name == 'Header'">
                <p>Header</p>
                <input type='text'>
                <button (click)=saveConfig()>Save</button>
            </div>
           

        </div>
        
         
    `,
    styles: [],
    directives: [TextboxComponent]
})


export class ConfigComponent {
    @Input('selectedShape') select;
    @Input() page;
    @Input() shape;
    
    //@Input('page') pageID: {};
    
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