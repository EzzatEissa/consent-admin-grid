import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgbActiveModal, NgbModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CheckboxModule} from 'primeng/checkbox';
import {TextViewerComponent} from "./component/text-viewer/text-viewer.component";
import {ValuesListViewComponent} from "./component/values-list-view/values-list-view.component";

import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SliderModule} from 'primeng/slider';
import {TabViewModule} from 'primeng/tabview';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';


import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from "primeng/table";
import {CardComponent} from "./component/card/card.component";
import {TooltipModule} from 'primeng/tooltip';
import { CardViewComponent } from './component/card-view/card-view.component';
import {RouterModule} from "@angular/router";

import { PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    TextViewerComponent,
    ValuesListViewComponent,
    CardComponent,
    CardViewComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    TranslateModule,
    NgbPopoverModule,
    NgbModule,
    SliderModule,
    TableModule,
    RadioButtonModule,
    FieldsetModule,
    TabViewModule,
    OverlayPanelModule,
    CheckboxModule,
    TriStateCheckboxModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    RouterModule,
    PaginatorModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    NgSelectModule,
    RadioButtonModule,
    FieldsetModule,
    TabViewModule,
    OverlayPanelModule,
    NgbPopoverModule,
    CheckboxModule,
    TriStateCheckboxModule,
    NgbModule,
    TextViewerComponent,
    ValuesListViewComponent,
    DialogModule,
    ButtonModule,
    CardComponent,
    TableModule,
    TooltipModule,
    CardViewComponent,
    RouterModule,
    PaginatorModule
  ],
  entryComponents: [],
  providers: [
    NgbActiveModal
  ]
})
export class SharedModule { }
