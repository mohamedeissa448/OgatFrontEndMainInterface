import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './dashboard.routing';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './index/index.component';
import { TasksChartComponent } from './tasks-chart/tasks-chart.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';
import { ReferralsComponent } from './referrals/referrals.component';

import { TopProductsComponent } from './top-products/top-products.component';

@NgModule({
    imports: [
        routing,NgxEchartsModule,
        RouterModule,CommonModule,NgbModule,RichTextEditorAllModule
    ],
    declarations: [
        DashboardComponent,
        TasksChartComponent,
        TopProductsComponent,
        TotalRevenueComponent,
        ReferralsComponent
    ],
  })
  export class DashboardModule { }