import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppMainComponent} from 'src/app/template/app.main.component';
import {AccessDeniedComponent} from 'src/app/template/access-denied/access-denied.component';
import {HomeComponent} from 'src/app/home/home.component';


@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {path: '', component: HomeComponent},
                {
                    path: 'app', // '\'' + root + '\'',
                    component: AppMainComponent,
                    children: [
                        {
                            path: 'admin',
                            loadChildren: () => import( './module/admin/admin-routing.module').then(x => x.AdminRoutingModule),
                        },
                        {path: 'denied', component: AccessDeniedComponent},
                    ],
                },
            ],
            {scrollPositionRestoration: 'enabled'}
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
