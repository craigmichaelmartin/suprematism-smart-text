import { CommonModule } from '@angular/common';
import { SmartTextComponent } from './smart-text.component';
import { NgModule } from '@angular/core';
import { PopoverModule } from 'suprematism-popover';
import { SafeStylePipe } from './safe.pipe';

export * from './smart-text.component';

@NgModule({
    imports: [
        CommonModule,
        PopoverModule,
    ],
    declarations: [
        SmartTextComponent,
        SafeStylePipe,
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
