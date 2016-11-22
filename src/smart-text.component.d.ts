import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
export declare type ActiveType = 'active' | 'notActive';
export declare type ModeType = 'display' | 'edit';
export declare class SmartTextComponent implements AfterContentInit, AfterViewInit {
    protected ref: ChangeDetectorRef;
    el: ElementRef;
    substituteShaveChar: ElementRef;
    editText: ElementRef;
    supreRows: number;
    suprePlaceholder: string;
    supreDefaultText: string;
    supreForceValue: boolean;
    supreActionsAlign: string;
    nativeEl: any;
    fullTextSource: Subject<string>;
    fullText$: Observable<string>;
    modeSource: Subject<ModeType>;
    mode$: Observable<ModeType>;
    resizeSource: Subject<"resize">;
    resize$: Observable<'resize'>;
    displayStateSource: Subject<ActiveType>;
    displayState$: Observable<ActiveType>;
    editStateSource: Subject<ActiveType>;
    editState$: Observable<ActiveType>;
    height: any;
    offsets: any;
    cssText: any;
    substituteCharacter: string;
    textAreaHasContent: boolean;
    readonly heightOffset: number;
    constructor(ref: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    confirmText(text: any): void;
    protected editKeydown(event: any): void;
    protected editKeyup(event: any): void;
    protected shaveText(text: any): void;
    protected setStyleProperties(): void;
    protected getHeight(computedStyles: any, rows: any): number;
    protected getOffsets(computedStyles: any): {
        padding: string;
        margin: string;
    };
    protected getCssText(computedStyles: any, el: any, height: any): any;
}
