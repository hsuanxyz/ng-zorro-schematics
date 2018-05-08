import { Component, OnInit<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%> } from '@angular/core';

export class <%= classify(name) %>DataSourceItem {
    key: string;
    name: string;
    address: string;
    age: number;
}

@Component({
  selector: '<%= selector %>',<% if(inlineTemplate) { %>
  template: `
     <nz-table #nzTable [nzDataSource]="dataSource">
       <thead nz-thead>
         <tr>
           <th nz-th><span>Name</span></th>
           <th nz-th><span>Age</span></th>
           <th nz-th><span>Address</span></th>
         </tr>
       </thead>
       <tbody nz-tbody>
         <tr nz-tbody-tr *ngFor="let data of nzTable.data">
           <td nz-td>{{data.name}}</td>
           <td nz-td>{{data.age}}</td>
           <td nz-td>{{data.address}}</td>
         </tr>
       </tbody>
     </nz-table>
  `,<% } else { %>
  templateUrl: './<%= dasherize(name) %>.component.html',<% } if(inlineStyle) { %>
  styles: []<% } else { %>
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
  encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
  changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
})
export class <%= classify(name) %>Component implements OnInit {
  dataSource: <%= classify(name) %>DataSourceItem[];

  ngOnInit() {
    this.dataSource = [{
       key: '1',
       name: 'John Brown',
       age: 32,
       address: 'New York No. 1 Lake Park',
     }, {
       key: '2',
       name: 'Jim Green',
       age: 42,
       address: 'London No. 1 Lake Park',
     }, {
       key: '3',
       name: 'Joe Black',
       age: 32,
       address: 'Sidney No. 1 Lake Park',
     }];
  }
}
