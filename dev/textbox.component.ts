import {Component, Input} from 'angular2/core'

@Component({
    selector: 'text-component',
    template: `
        <h4>{{shape?.name}} Attributes</h4>
        <p>{{shape?.name.split('.',1)}}</p>
        XXXX: <input #name1 type='text' id='name1' (keyup)="0">
        XXXX: <input #name2 type='text' id='name2' (keyup)="0">
        XXXX: <input #name3 type='text' id='name3' (keyup)="0">
        XXXX: <input #name4 type='text' id='name4' (keyup)="0">
        XXXX: <input #name5 type='text' id='name5' (keyup)="0">
        <hr/>
        <button (click)="saveConfig(name1,name2 ,name3 ,name4 ,name5)">Save</button>
        <br>
        <pre>
            <!-- *ngIf="name1?.value || name2?.value || name3?.value || name4?.value || name5?.value || saveCompleted == true" -->
        <label>
            Result: 
                "page": {{page?.pname}},
                "shape": {{shape?.id}}, 
                "properties:" [
                    {"name:" {{shape?.name || ""}} },
                    {"value:" {{shape?.value || ""}} }
                "config": [
                    {"value1": {{name1.value || ""}} },   
                    {"value2": {{name2.value || ""}} }, 
                    {"value3": {{name3.value || ""}} },
                    {"value4": {{name4.value || ""}} },
                    {"value5": {{name5.value || ""}} }
                ]   
        </label> 
        </pre>
    `
    
})

export class TextboxComponent {
    @Input() page;
    @Input() shape;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
    result;
    saveCompleted;
    constructor(){
        this.saveCompleted = false;
    }
    
    ngOnInit() { 
    
     }
    
    
    
    saveConfig(name1,name2,name3,name4,name5) {
        
        this.result  = '{ "page": "'+this.page.pname+ '", "shape": "'+ this.shape.id + '", "shapeProperties": [';
        this.result += '{"name": "'+this.shape.name +'"},';
        this.result += '{"value": "'+this.shape.value +'"}';
        this.result += '], "config": [';
        this.result += '{"value1": "'+name1.value+'" },';
        this.result += '{"value2": "'+name2.value+'" },';
        this.result += '{"value3": "'+name3.value+'" },';
        this.result += '{"value4": "'+name4.value+'" },';
        this.result += '{"value5": "'+name5.value+'" } ]}';
                                       
        localStorage.setItem(this.page.pid+this.shape.id,this.result);

        for (var i = 0; i < localStorage.length; i++){
            console.log(localStorage.getItem(localStorage.key(i)));
            alert(localStorage.getItem(localStorage.key(i)));
        }
        name1.value = null;
        name2.value = null;
        name3.value = null;
        name4.value = null;
        name5.value = null;
        
        
    }
}

