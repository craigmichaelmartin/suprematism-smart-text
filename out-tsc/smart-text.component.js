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
require('rxjs/add/observable/merge');
require('rxjs/add/observable/interval');
require('rxjs/add/operator/startWith');
require('rxjs/add/operator/combineLatest');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mapTo');
require('rxjs/add/operator/merge');
require('rxjs/add/operator/take');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/do');
require('rxjs/add/operator/withLatestFrom');
var shave = require('shave');
var ENTER = 13;
var SmartTextComponent = (function () {
    // ------ Constructor ------------------------------------------------------
    function SmartTextComponent(ref) {
        var _this = this;
        this.ref = ref;
        this.supreActionsAlign = 'right';
        this.fullTextSource = new Subject_1.Subject();
        this.fullText$ = this.fullTextSource
            .asObservable()
            .map(function (text) { return text || _this.supreDefaultText || ''; });
        this.modeSource = new Subject_1.Subject();
        this.mode$ = this.modeSource
            .withLatestFrom(this.fullText$)
            .map(function (_a) {
            var mode = _a[0], text = _a[1];
            return (_this.supreForceValue && !text) ? 'edit' : mode;
        })
            .startWith('display');
        this.resizeSource = new Subject_1.Subject();
        this.resize$ = this.resizeSource.asObservable();
        this.displayStateSource = new Subject_1.Subject();
        this.displayState$ = this.displayStateSource.startWith('notActive');
        this.editStateSource = new Subject_1.Subject();
        this.editState$ = this.editStateSource
            .startWith('notActive')
            .merge(this.mode$
            .filter(function (mode) { return mode === 'edit'; })
            .mapTo('active'));
        this.substituteCharacter = ' ...';
    }
    // ------ Lifecycle Hooks ---------------------------------------------------
    SmartTextComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.nativeEl = this.el.nativeElement.children[0];
        this.fullText$.subscribe(this.shaveText.bind(this));
        this.mode$
            .filter(function (mode) { return mode === 'display'; })
            .withLatestFrom(this.fullText$)
            .map(function (_a) {
            var text = _a[1];
            return text;
        })
            .subscribe(function (text) { return _this.editText.nativeElement.value = text; });
        this.resize$.combineLatest(this.fullText$)
            .map(function (_a) {
            var text = _a[1];
            return text;
        })
            .subscribe(this.shaveText.bind(this));
    };
    SmartTextComponent.prototype.ngAfterViewInit = function () {
        this.setStyleProperties();
        this.ref.detectChanges();
        var initialText = this.nativeEl.textContent.trim();
        this.textAreaHasContent = !!initialText;
        this.confirmText(initialText);
    };
    SmartTextComponent.prototype.confirmText = function (text) {
        this.fullTextSource.next(text);
        this.editStateSource.next('notActive');
        this.modeSource.next('display');
    };
    // ------ Protected Methods -------------------------------------------------
    SmartTextComponent.prototype.editKeydown = function (event) {
        if (event.keyCode === ENTER) {
            this.confirmText(event.target.value);
        }
    };
    SmartTextComponent.prototype.editKeyup = function (event) {
        this.textAreaHasContent = !!event.target.value;
    };
    SmartTextComponent.prototype.shaveText = function (text) {
        if (!this.supreRows) {
            return;
        }
        var options = {
            character: this.substituteCharacter
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
    SmartTextComponent.prototype.setStyleProperties = function () {
        var computedStyles = window.getComputedStyle(this.nativeEl);
        this.height = this.getHeight(computedStyles, this.supreRows);
        this.offsets = this.getOffsets(computedStyles);
        this.cssText = this.getCssText(computedStyles, this.nativeEl, this.height);
    };
    SmartTextComponent.prototype.getHeight = function (computedStyles, rows) {
        if (!rows) {
            return this.nativeEl.offsetHeight;
        }
        var fontSize = parseInt(computedStyles.fontSize, 10);
        var lineHeight = parseInt(computedStyles.lineHeight, 10) || 1.2;
        return rows * fontSize * lineHeight;
    };
    SmartTextComponent.prototype.getOffsets = function (computedStyles) {
        var topP = parseInt(computedStyles.paddingTop, 10);
        var rightP = parseInt(computedStyles.paddingRight, 10);
        var bottomP = parseInt(computedStyles.paddingBottom, 10);
        var leftP = parseInt(computedStyles.paddingLeft, 10);
        var topM = parseInt(computedStyles.marginTop, 10);
        var rightM = parseInt(computedStyles.marginRight, 10);
        var bottomM = parseInt(computedStyles.marginBottom, 10);
        var leftM = parseInt(computedStyles.marginLeft, 10);
        return {
            padding: topP + "px " + rightP + "px " + bottomP + "px " + leftP + "px",
            margin: topM + "px " + rightM + "px " + bottomM + "px " + leftM + "px",
        };
    };
    SmartTextComponent.prototype.getCssText = function (computedStyles, el, height) {
        var style = el.style;
        this.nativeEl.style.padding = 0;
        this.nativeEl.style.margin = 0;
        this.nativeEl.style.height = height + "px";
        var cssText = computedStyles.cssText;
        this.nativeEl.style = style;
        return cssText;
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
        core_1.ViewChild('editText'), 
        __metadata('design:type', core_1.ElementRef)
    ], SmartTextComponent.prototype, "editText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SmartTextComponent.prototype, "supreRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SmartTextComponent.prototype, "suprePlaceholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SmartTextComponent.prototype, "supreDefaultText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SmartTextComponent.prototype, "supreForceValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SmartTextComponent.prototype, "supreActionsAlign", void 0);
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