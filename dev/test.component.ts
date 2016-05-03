import {Component} from 'angular2/core'
import {ConfigComponent} from './config.component'


const URL = 'http://127.0.0.1:3003/upload';

@Component({
    selector: 'my-component',
    template: `
        <scetion>
            <h2>status: {{uploadStatus}} </h2>
            
            <div id="menu">
                <ul *ngFor="#data of dataJson?.pages" colspan='4'>
                    <li>PageID {{data.pid}} : {{data.pname}}</li>
                    
                    <ul *ngFor="#shape of data.shapes">
                        <li>{{shape.id}} : <a href='#' (click)="checkbox(data, shape, $event);">{{shape.name.split('.',1)}}</a>
                        <!--<blockqoute>{{shape.value}}</blockqoute>-->
                        <input type="checkbox" name="shapes" value="{{data.pid}}.{{shape.id}}" 
                                (change)="checkbox(data, shape)">
                        </li>
                        <ul *ngIf="shape?.properties">
                            <li *ngFor="#prop of shape.properties">{{prop.label}}: {{prop.value}}</li>
                        </ul>
                    </ul>
                    
                    <hr/>
                </ul>
            </div>
                
            <div id="content">
                <form>
                    <input type="file" id="uploads" name="uploads" style="width:70%;border:1px;" (change)="fileChangeEvent($event)">
                    <button type="submit" (click)="upload();">Submit</button>
                    <br><br>
                    <button type="button" (click)="extract();">Load XML</button>
                </form>
                <hr/>
                
                <config [page]="page" [shape]="shape" [selectedShape]="selectedShape" (click)="clicked()"></config>
                
            </div>

        </scetion>
    `,
    styles: [],
    directives: [ConfigComponent]

})

export class TestComponent {
  uploadStatus;
  dataJson;
  debugJson;
  file: File;
  filesToUpload: Array<File>;
  attrText;
  page;
  shape;
  property;
  selectedShape = [];
  constructor() {
        this.filesToUpload = [];
  }
  
  upload() {
        this.makeFileRequest("http://127.0.0.1:3003/uploads", [], this.filesToUpload).then((result) => {
            this.filesToUpload = []
            console.log(result);
            alert(result);
            this.uploadStatus = result;
        }, (error) => {
            console.log(error);
            this.uploadStatus = '';
           
        });
    }
  extract() {
     this.extractFile("http://127.0.0.1:3003/extract").then((result) => {
            //console.log(Object.keys(result));
            this.uploadStatus = 'Extract Data.xml to JSON format';
            this.dataJson =  eval('(' + result + ')');
            this.debugJson = result;
            localStorage.clear();
        }, (error) => {
            this.uploadStatus = 'Not found Data.xml'
            this.dataJson = null;
            console.log(error);
        }).then( (result) => {
            //alert(result[0].pid);
            //this.dataJson = result;
        }); 

    }
    
    selectedData(page, shape){
        this.page = page;
        this.shape = shape;
    }
    
    checkbox(page, shape, event) {
        //recipient.selected = (recipient.selected) ? false : true;
        
        this.selectedShape.push([[page.pid,shape.id]]);
        //alert(this.selectedShape);
        
        this.selectedData(page, shape)
        console.log(shape.id + ':' + shape.name);
    }
    
    loadConfigure() {
       this.attrText = !this.attrText;
    }  
    
    clicked(){
        //alert(this.page.pid + ':' + this.shape.id);
    }
    
    fileChangeEvent(fileInput: any){
        this.uploadStatus = null; 
        if(fileInput.target.files) {
            this.filesToUpload = <Array<File>> fileInput.target.files;
            console.log(this.filesToUpload[0].name + ' ' + this.filesToUpload[0].size)
        }    
    }
 
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                var status;
                var data;
                if (xhr.readyState == 4) {
                    status = xhr.status;
                    if (xhr.status == 200) {
                        //data = JSON.parse(xhr.responseText);
                        //JSON.parse(xhr.response)
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);    
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }
    
    extractFile(url: string) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                var status;
                var data;
                if (xhr.readyState == 4) {
                    status = xhr.status;
                    if (xhr.status == 200) {
                        //data = JSON.parse(xhr.responseText);
                        //JSON.parse(xhr.response)
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);    
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send(xhr.response);
        });
    }
  /*
  selectFile($event): void {
        var inputValue = $event.target;
        this.filesToUpload = inputValue.files[0];
        console.debug("Input File name: " + this.file.name + " type:" + this.file.size + " size:" + this.file.size);
    }
  */ 
}