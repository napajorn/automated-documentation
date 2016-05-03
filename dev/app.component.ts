import {Component} from 'angular2/core';
import {TestComponent} from './test.component';
import {MyComponent} from './my-component';


@Component({
    selector: 'my-app',
    template: `
        <h1>Angular 2</h1>
        <my-component></my-component>
    `,
    directives: [TestComponent]
})
export class AppComponent {

}