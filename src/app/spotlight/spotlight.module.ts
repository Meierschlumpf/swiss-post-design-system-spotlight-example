import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SpotlightComponent} from './components/spotlight/spotlight.component';
import {SpotlightService} from './services/spotlight.service';
import {SpotlightProviderComponent} from './components/spotlight-provider/spotlight-provider.component';

@NgModule({
	declarations: [
		SpotlightComponent,
		SpotlightProviderComponent
		// Components
	],
	imports: [FormsModule, CommonModule, TranslateModule.forChild()],
	providers: [
		// Services
		SpotlightService
	],
	exports: [SpotlightProviderComponent]
})
export class SpotlightModule {}
