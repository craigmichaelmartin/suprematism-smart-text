import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component,
  ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
const shave = require('shave');

const ENTER = 13;
export type ActiveType = 'active' | 'notActive';
export type ModeType = 'display' | 'edit';

@Component({
  selector: 'supre-smart-text',
  template: require('./smart-text.component.html'),
  styles: [require('./smart-text.component.css')]
})
export class SmartTextComponent implements AfterContentInit, AfterViewInit {

  // ------ Properties -------------------------------------------------------

  @ViewChild('displayText') el: ElementRef;
  @ViewChild('substituteShaveChar') substituteShaveChar: ElementRef;
  @ViewChild('editText') editText: ElementRef;
  @Input() supreRows: number;
  @Input() suprePlaceholder: string;
  @Input() supreDefaultText: string;
  @Input() supreForceValue: boolean;
  @Input() supreActionsAlign = 'bottom';
  @Input() supreIsEditable = true;
  @Output() textUpdated = new EventEmitter();
  nativeEl: any;
  fullTextSource = new Subject<string>();
  fullText$: Observable<string> = this.fullTextSource
    .asObservable()
    .map((text) => text || this.supreDefaultText || '');
  modeSource = new Subject<ModeType>();
  mode$: Observable<ModeType> = this.modeSource
    .withLatestFrom(this.fullText$)
    .map(([mode, text]) => {
      return (this.supreForceValue && !text) ? 'edit' : mode;
    })
    .startWith('display');
  resizeSource = new Subject<'resize'>();
  resize$: Observable<'resize'> = this.resizeSource.asObservable();
  displayStateSource = new Subject<ActiveType>();
  displayState$: Observable<ActiveType> =
    this.displayStateSource.startWith('notActive');
  editStateSource = new Subject<ActiveType>();
  editState$: Observable<ActiveType> = this.editStateSource
    .startWith('notActive')
    .merge(this.mode$.filter((mode) => mode === 'edit').mapTo('active'));
  height: any;
  offsets: any;
  cssText: any;
  substituteCharacter = ' ...';
  rawTextSource = new Subject<string>();
  rawText$: Observable<string> = this.rawTextSource
    .merge(
      this.fullText$
        .combineLatest(this.mode$.filter((mode) => mode === 'display'))
        .map(([text]) => text)
    );
  get heightOffset() {
    return this.supreActionsAlign === 'right' ? 0 : 3;
  }


  // ------ Constructor ------------------------------------------------------

  constructor(protected ref: ChangeDetectorRef) {}


  // ------ Lifecycle Hooks ---------------------------------------------------

  ngAfterContentInit() {
    this.nativeEl = this.el.nativeElement.children[0];
    this.fullText$.subscribe(this.shaveText.bind(this));
    this.mode$
      .filter((mode) => mode === 'display')
      .withLatestFrom(this.fullText$)
      .map(([, text]) => text)
      .subscribe((text) => this.editText.nativeElement.value = text);
    this.resize$.combineLatest(this.fullText$)
      .map(([, text]) => text)
      .subscribe(this.shaveText.bind(this));
  }
  ngAfterViewInit() {
    this.setStyleProperties();
    this.ref.detectChanges();
    const initialText = this.nativeEl.textContent.trim();
    this.confirmText(initialText);
    this.fullText$.subscribe(this.updatedText.bind(this));
  }


  // ------ Protected Methods -------------------------------------------------

  protected updatedText(text) {
    this.textUpdated.emit(text);
  }

  protected confirmText(text) {
    this.fullTextSource.next(text);
    this.editStateSource.next('notActive');
    this.modeSource.next('display');
  }

  protected editKeydown(event) {
    if (event.keyCode === ENTER) {
      this.confirmText(event.target.value);
    }
  }

  protected shaveText(text) {
    this.nativeEl.textContent = text;
    if (!this.supreRows) {
      return;
    }
    const options = {
      character: this.substituteCharacter
    };
    shave(this.nativeEl, this.height, options);
    const shaveCharNativeEl = this.nativeEl.querySelector('.js-shave-char');
    let subShaveCharNativeEl = this.substituteShaveChar.nativeElement;
    if (shaveCharNativeEl) {
      subShaveCharNativeEl.style.display = 'inline-block';
      shaveCharNativeEl.textContent = '';
      shaveCharNativeEl.append(subShaveCharNativeEl);
    } else {
      subShaveCharNativeEl.style.display = 'none';
    }
    this.ref.detectChanges();
  }

  protected setStyleProperties() {
    const computedStyles = window.getComputedStyle(this.nativeEl);
    this.height = this.getHeight(computedStyles, this.supreRows);
    this.offsets = this.getOffsets(computedStyles);
    this.cssText = this.getCssText(computedStyles, this.nativeEl, this.height);
  }

  protected getHeight(computedStyles, rows) {
    if (!rows) {
      return Math.ceil(this.nativeEl.offsetHeight);
    }
    const fontSize = parseInt(computedStyles.fontSize, 10);
    const lineHeight = parseInt(computedStyles.lineHeight, 10) || 1.2;
    const paddingTop = parseInt(computedStyles.paddingTop, 10) || 0;
    const paddingBottom = parseInt(computedStyles.paddingBottom, 10) || 0;
    return Math.ceil(rows * fontSize * lineHeight) +
      Math.ceil(paddingTop + paddingBottom) + this.heightOffset;
  }

  protected getOffsets(computedStyles) {
    return {
      padding: computedStyles.padding,
      margin: computedStyles.margin
    };
  }

  protected getCssText(computedStyles, el, height) {
    const style = el.style;
    this.nativeEl.style.padding = 0;
    this.nativeEl.style.margin = 0;
    this.nativeEl.style.height = `${height}px`;
    const cssText = computedStyles.cssText;
    this.nativeEl.style = style;
    return cssText;
  }

}
