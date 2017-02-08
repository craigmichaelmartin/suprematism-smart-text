"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var common_1 = require('@angular/common');
var smart_text_component_1 = require('./smart-text.component');
var core_1 = require('@angular/core');
var suprematism_popover_1 = require('suprematism-popover');
var safe_pipe_1 = require('./safe.pipe');
__export(require('./smart-text.component'));
var SmartTextModule = (function () {
    function SmartTextModule() {
    }
    SmartTextModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                suprematism_popover_1.PopoverModule,
            ],
            declarations: [
                smart_text_component_1.SmartTextComponent,
                safe_pipe_1.SafeStylePipe,
            ],
            exports: [
                smart_text_component_1.SmartTextComponent,
            ],
            entryComponents: [
                smart_text_component_1.SmartTextComponent,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SmartTextModule);
    return SmartTextModule;
}());
exports.SmartTextModule = SmartTextModule;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-smart-text/src/index.js.map