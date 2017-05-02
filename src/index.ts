import { CommonModule } from '@angular/common';
import { SmartTextComponent } from './smart-text.component';
import { NgModule } from '@angular/core';
import { SuprePopoverModule } from 'suprematism-popover';
import { SafeStylePipe } from './safe.pipe';

export * from './smart-text.component';

@NgModule({
    imports: [
        CommonModule,
        SuprePopoverModule,
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
