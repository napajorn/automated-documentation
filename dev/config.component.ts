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
    
           
           <text-component *ngIf="shape.name.split('.',1) == 'Header'" [page]="page" [shape]="shape">Loading...</text-component>
           


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
    
}