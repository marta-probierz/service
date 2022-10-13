import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from '@app/shared/footer/footer.component';
import { HeaderComponent } from '@app/shared/header/header.component';
import { Item2Component } from '@app/item2/item2.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                outlet: 'header',
                component: HeaderComponent,
            },
            {
                path: '',
                component: Item2Component,
            },
            {
                path: '',
                outlet: 'footer',
                component: FooterComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Item2RoutingModule {}
