import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './security/containers/login/login.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
	{path: '', redirectTo: 'ui/home', pathMatch: 'full'},
	{
		path: 'ui',
		children: [
			{path: 'home', component: HomeComponent},
			{path: 'login', component: LoginComponent},
			{path: '**', redirectTo: ''}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: false,
			relativeLinkResolution: 'legacy'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
