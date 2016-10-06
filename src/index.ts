import { CommonModule } from '@angular/common';
import { SmartTextComponent } from './smart-text.component';
import { NgModule } from '@angular/core';

export * from './smart-text.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SmartTextComponent,
    ],
    exports: [
        SmartTextComponent,
    ],
    entryComponents: [
        SmartTextComponent,
    ]
})
export class SmartTextModule {

}
