import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PbdsHeaderShadowModule } from 'pb-design-system/header-shadow';
import { PbdsPageTitleModule } from 'pb-design-system/page-title';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from '@app/shared/footer/footer.component';
import { HeaderComponent } from '@app/shared/header/header.component';
import { WelcomeBannerComponent } from '@app/shared/welcome-banner/welcome-banner.component';
import { CardComponent } from '@app/shared/card/card.component';
import { LocationsModalComponent } from './locations-modal/locations-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PbdsHeaderShadowModule, PbdsPageTitleModule, TableModule, HttpClientModule, NgbModule],
  declarations: [HeaderComponent, FooterComponent, WelcomeBannerComponent, CardComponent, LocationsModalComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    WelcomeBannerComponent,
    CardComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PbdsHeaderShadowModule,
    PbdsPageTitleModule,
    LocationsModalComponent,
  ],
})
export class SharedModule {}
