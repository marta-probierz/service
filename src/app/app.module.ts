import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';
import { TransactionsModule } from '@app/transactions/transactions.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FinancialsModule } from '@app/financials/financials.module';
import { Item2Module } from '@app/item2/item2.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    AppRoutingModule,
    SharedModule,
    TransactionsModule,
    BrowserAnimationsModule,
    FinancialsModule,
    Item2Module
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
