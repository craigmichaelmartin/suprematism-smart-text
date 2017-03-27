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
var platform_browser_1 = require('@angular/platform-browser');
var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeHtmlPipe.prototype.transform = function (html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    };
    SafeHtmlPipe = __decorate([
        core_1.Pipe({ name: 'safeHtml' }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());
exports.SafeHtmlPipe = SafeHtmlPipe;
var SafeStylePipe = (function () {
    function SafeStylePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeStylePipe.prototype.transform = function (style) {
        return this.sanitizer.bypassSecurityTrustStyle(style);
    };
    SafeStylePipe = __decorate([
        core_1.Pipe({ name: 'safeStyle' }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], SafeStylePipe);
    return SafeStylePipe;
}());
exports.SafeStylePipe = SafeStylePipe;
var SafeScriptPipe = (function () {
    function SafeScriptPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeScriptPipe.prototype.transform = function (script) {
        return this.sanitizer.bypassSecurityTrustScript(script);
    };
    SafeScriptPipe = __decorate([
        core_1.Pipe({ name: 'safeScript' }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], SafeScriptPipe);
    return SafeScriptPipe;
}());
exports.SafeScriptPipe = SafeScriptPipe;
var SafeUrlPipe = (function () {
    function SafeUrlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeUrlPipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    SafeUrlPipe = __decorate([
        core_1.Pipe({ name: 'safeUrl' }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], SafeUrlPipe);
    return SafeUrlPipe;
}());
exports.SafeUrlPipe = SafeUrlPipe;
var SafeResourceUrlPipe = (function () {
    function SafeResourceUrlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeResourceUrlPipe.prototype.transform = function (resourceUrl) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(resourceUrl);
    };
    SafeResourceUrlPipe = __decorate([
        core_1.Pipe({ name: 'safeScript' }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], SafeResourceUrlPipe);
    return SafeResourceUrlPipe;
}());
exports.SafeResourceUrlPipe = SafeResourceUrlPipe;
//# sourceMappingURL=/Users/craigmartin/projects/suprematism-smart-text/src/src/safe.pipe.js.map