import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';
export declare type BypassKindType = 'html' | 'style';
export declare type TransformReturnType = SafeStyle | SafeHtml;
export declare class SafePipe implements PipeTransform {
    private sanitizer;
    bypassMap: Map<string, (value: string) => SafeHtml>;
    constructor(sanitizer: DomSanitizer);
    transform(value: string, bypassKind: BypassKindType): TransformReturnType;
}
