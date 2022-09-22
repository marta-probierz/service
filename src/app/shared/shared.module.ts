import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { HeaderComponent } from '@app/shared/header/header.component';
import { WelcomeBannerComponent } from '@app/shared/welcome-banner/welcome-banner.component';
import { PbdsHeaderShadowModule } from 'pb-design-system/header-shadow';
import { PbdsPageTitleModule } from 'pb-design-system/page-title';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, PbdsHeaderShadowModule, PbdsPageTitleModule],
  declarations: [HeaderComponent, FooterComponent, WelcomeBannerComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    WelcomeBannerComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PbdsHeaderShadowModule,
    PbdsPageTitleModule,
  ],
})
export class SharedModule {}
