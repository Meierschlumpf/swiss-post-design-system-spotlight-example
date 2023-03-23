import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AuthorizationViewerComponent} from './containers/authorization-viewer/authorization-viewer.component';

const routes: Routes = [
    {
        path: 'ui', children: [
            {
                path: 'authorization',
                children: [
                    {path: '', component: AuthorizationViewerComponent}
                ]
            }
        ]
    }
];

@NgModule({
    declarations: [
        AuthorizationViewerComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild()
    ],
    providers: []
})
export class SampleAuthorizationModule {}
