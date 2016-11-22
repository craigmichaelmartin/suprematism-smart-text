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
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/startWith');
require('rxjs/add/operator/combineLatest');
require('rxjs/add/operator/map');
require('rxjs/add/operator/delay');
var shave = require('shave');
var SmartTextComponent = (function () {
    // ------ Constructor ------------------------------------------------------
    function SmartTextComponent(ref) {
        this.ref = ref;
        this.fullTextSource = new Subject_1.Subject();
        this.resizeSource = new Subject_1.Subject();
        this.resize$ = this.resizeSource.asObservable();
        this.displayStateSource = new Subject_1.Subject();
        this.displayState$ = this.displayStateSource.startWith('notActive');
        this.editStateSource = new Subject_1.Subject();
        this.editState$ = this.editStateSource.startWith('notActive');
        this.modeSource = new Subject_1.Subject();
        this.mode$ = this.modeSource.startWith('display');
        this.substituteCharacter = ' ...';
    }
    // ------ Lifecycle Hooks ---------------------------------------------------
    SmartTextComponent.prototype.ngAfterContentInit = function () {
        this.nativeEl = this.el.nativeElement.children[0];
        this.fullText$ = this.fullTextSource
            .startWith(this.nativeEl.textContent.trim());
        this.resize$.combineLatest(this.fullText$)
            .map(function (_a) {
            var text = _a[1];
            return text;
        })
            .subscribe(this.shaveText.bind(this));
        _a = this.getStylesTuple(), this.cssText = _a[0], this.height = _a[1], this.offsets = _a[2];
        this.fullText$.subscribe(this.shaveText.bind(this));
        var _a;
    };
    SmartTextComponent.prototype.shaveText = function (text) {
        var options = {
            character: "<span suprePopoverBody=\"" + text + "\">" + this.substituteCharacter + "</span>"
        };
        this.nativeEl.textContent = text;
        shave(this.nativeEl, this.height, options);
        var shaveCharNativeEl = this.nativeEl.querySelector('.js-shave-char');
        var subShaveCharNativeEl = this.substituteShaveChar.nativeElement;
        if (shaveCharNativeEl) {
            subShaveCharNativeEl.style.display = 'inline-block';
            shaveCharNativeEl.textContent = '';
            shaveCharNativeEl.append(subShaveCharNativeEl);
        }
        else {
            subShaveCharNativeEl.style.display = 'none';
        }
        this.ref.detectChanges();
    };
    SmartTextComponent.prototype.getStylesTuple = function () {
        var computedStyles = window.getComputedStyle(this.nativeEl);
        var fontSize = parseInt(computedStyles.fontSize, 10);
        var lineHeight = parseInt(computedStyles.lineHeight, 10) || 1.2;
        var height = this.supreRows * fontSize * lineHeight;
        var topOffset = parseInt(computedStyles.marginTop, 10)
            + parseInt(computedStyles.paddingTop, 10);
        var rightOffset = parseInt(computedStyles.marginRight, 10)
            + parseInt(computedStyles.paddingRight, 10);
        var bottomOffset = parseInt(computedStyles.marginBottom, 10)
            + parseInt(computedStyles.paddingBottom, 10);
        var leftOffset = parseInt(computedStyles.marginLeft, 10)
            + parseInt(computedStyles.paddingLeft, 10);
        var offsets = topOffset + "px " + rightOffset + "px " + bottomOffset + "px " + leftOffset + "px";
        var style = this.nativeEl.style;
        this.nativeEl.style.padding = 0;
        this.nativeEl.style.margin = 0;
        this.nativeEl.style.height = height + "px";
        var newComputedStyles = window.getComputedStyle(this.nativeEl);
        var cssText = newComputedStyles.cssText;
        this.nativeEl.style = style;
        return [cssText, height, offsets];
    };
    __decorate([
        core_1.ViewChild('displayText'), 
        __metadata('design:type', core_1.ElementRef)
    ], SmartTextComponent.prototype, "el", void 0);
    __decorate([
        core_1.ViewChild('substituteShaveChar'), 
        __metadata('design:type', core_1.ElementRef)
    ], SmartTextComponent.prototype, "substituteShaveChar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SmartTextComponent.prototype, "supreRows", void 0);
    SmartTextComponent = __decorate([
        core_1.Component({
            selector: 'supre-smart-text',
            template: require('./smart-text.component.html'),
            styles: [require('./smart-text.component.css')]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], SmartTextComponent);
    return SmartTextComponent;
}());
exports.SmartTextComponent = SmartTextComponent;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-smart-text/src/smart-text.component.js.map