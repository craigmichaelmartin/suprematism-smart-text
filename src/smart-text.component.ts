import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component,
  ElementRef, EventEmitter, Input, Renderer, Output, ViewChild, OnChanges
  } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
declare let shave: any;

const ENTER = 13;
export type ActiveType = 'active' | 'notActive';
export type ModeType = 'display' | 'edit' | 'popout';

@Component({
  selector: 'supre-smart-text',
  template: require('./smart-text.component.html'),
  styles: [require('./smart-text.component.scss')]
})
export class SmartTextComponent implements AfterContentInit, AfterViewInit, OnChanges {

  // ------ Properties -------------------------------------------------------

  @ViewChild('displayText') el: ElementRef;
  @ViewChild('substituteShaveChar') substituteShaveChar: ElementRef;
  @ViewChild('editText') editText: ElementRef;
  @ViewChild('textareaTracker') public textareaTracker: ElementRef;

  @Input() supreDisplayRows: number;
  @Input() supreEditRows: number;
  @Input() suprePlaceholder: string;
  @Input() supreDefaultText: string;
  @Input() supreForceValue: boolean;
  @Input() supreIsEditable = true;
  @Input() popout = false;
  @Output() textUpdated = new EventEmitter();

  nativeEl: any;
  height: any;
  offsets: any;
  cssText: any;
  popoutCSS: any;
  trackerCSS: any;
  shaved: boolean;
  visibleEditRows = 1;
  substituteCharacter = ' ...';

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

  rawTextSource = new Subject<string>();
  rawText$: Observable<string> = this.rawTextSource
    .merge(
      this.fullText$
        .combineLatest(this.mode$.filter((mode) => mode === 'display'))
        .map(([text]) => text)
    );


  // ------ Constructor ------------------------------------------------------

  constructor(protected ref: ChangeDetectorRef,
              protected renderer: Renderer) {}


  // ------ Lifecycle Hooks ---------------------------------------------------

  public ngAfterContentInit() {
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
  public ngAfterViewInit() {
    this.setStyleProperties();
    this.ref.detectChanges();
    const initialText = this.nativeEl.textContent.trim();
    this.confirmText(initialText);
    this.fullText$.subscribe(this.updatedText.bind(this));

    if (this.supreForceValue) {
      this.prepareTracker();
    }
  }
  public ngOnChanges(changes) {
    if (changes && changes.supreDefaultText && changes.supreDefaultText.currentValue
      && changes.supreDefaultText.previousValue !== changes.supreDefaultText.currentValue) {
      this.confirmText(changes.supreDefaultText.currentValue);
    }
  }


  // ------ Protected Methods -------------------------------------------------

  protected updatedText(text) {
    this.textUpdated.emit(text);
  }

  protected confirmText(text) {
    this.fullTextSource.next(text);
    this.editStateSource.next('notActive');
    this.modeSource.next('display');
    this.ref.detectChanges();
  }

  protected editKeydown(event) {
    if (event.keyCode === ENTER) {
      this.confirmText(event.target.value);
    }
  }

  protected shaveText(text) {
    this.renderer.setElementProperty(this.nativeEl, 'textContent', text);
    if (!this.supreDisplayRows) {
      return;
    }
    const options = {
      character: this.substituteCharacter
    };

    shave(this.nativeEl, this.getHeight(window.getComputedStyle(this.nativeEl), this.supreDisplayRows), options);
    const shaveCharNativeEl = this.nativeEl.querySelector('.js-shave-char');
    let subShaveCharNativeEl = this.substituteShaveChar.nativeElement;
    if (shaveCharNativeEl) {
      this.shaved = true;
      this.renderer.setElementStyle(subShaveCharNativeEl, 'display', 'inline-block');
      this.renderer.setElementProperty(shaveCharNativeEl, 'textContent', '');
      shaveCharNativeEl.append(subShaveCharNativeEl);
    } else {
      this.shaved = false;
      this.renderer.setElementStyle(subShaveCharNativeEl, 'display', 'none');
    }
    this.ref.detectChanges();
  }

  protected setStyleProperties() {
    const computedStyles = window.getComputedStyle(this.nativeEl);
    this.height = this.getHeight(computedStyles, this.visibleEditRows);
    this.offsets = this.getOffsets(computedStyles);
    this.cssText = this.getCssText(computedStyles, this.height);
  }

  protected getHeight(computedStyles, rows) {
    if (!rows) {
      return Math.ceil(this.nativeEl.offsetHeight);
    }
    const fontSize = parseInt(computedStyles.fontSize, 10);
    const lineHeight = parseInt(computedStyles.lineHeight, 10) || 1.2;
    const paddingTop = parseInt(computedStyles.paddingTop, 10) || 0;
    const paddingBottom = parseInt(computedStyles.paddingBottom, 10) || 0;
    let textHeight;
    if (computedStyles.lineHeight.includes('px')) {
      textHeight = lineHeight * rows;
    } else {
      textHeight = lineHeight * fontSize * rows;
    }

    return Math.ceil(textHeight) +
      Math.ceil(paddingTop + paddingBottom) + 3;
  }

  protected getOffsets(computedStyles) {
    return {
      padding: computedStyles.padding,
      margin: computedStyles.margin
    };
  }

  protected getCssText(computedStyles, height) {
    // Override styles that computedStyles will reflect, and then
    // change them back after capturing the new computed styles.
    const style = this.nativeEl.style;
    this.renderer.setElementStyle(this.nativeEl, 'padding', '0');
    this.renderer.setElementStyle(this.nativeEl, 'margin', '0');
    this.renderer.setElementStyle(this.nativeEl, 'height', `${height}px`);
    const cssText = computedStyles.cssText;
    this.renderer.setElementProperty(this.nativeEl, 'style', style);
    return cssText;
  }

  protected getPopoutCss() {
    const rect = this.nativeEl.getBoundingClientRect();
    const left = `${Math.max(rect.left - rect.width * .2, 0)}px`;
    const top = `${Math.max(rect.top - 20, 0)}px`;
    const width = `${rect.width * 1.4}px`;
    return {top, left, width};
  }

  protected getTrackerCss(height) {
    // Override styles that computedStyles will reflect, and then
    // change them back after capturing the new computed styles.
    const computedStyles = window.getComputedStyle(this.nativeEl);
    const style = this.nativeEl.style;
    this.renderer.setElementStyle(this.nativeEl, 'padding', '0');
    this.renderer.setElementStyle(this.nativeEl, 'margin', '0');
    this.renderer.setElementStyle(this.nativeEl, 'height', `${height}px`);
    this.renderer.setElementStyle(this.nativeEl, 'width', `${this.editText.nativeElement.getBoundingClientRect().width}px`);
    const cssText = computedStyles.cssText;
    this.renderer.setElementProperty(this.nativeEl, 'style', style);
    return cssText;
  }

  protected onMouseoverDisplay(event) {
    if (this.supreIsEditable) {
      if (event.target.classList.contains('popover')) {
        this.displayStateSource.next('notActive');
      } else {
        this.displayStateSource.next('active');
      }
    }
  }

  protected onClickDisplay(event) {
    if (this.supreIsEditable) {
      if (!event.target.classList.contains('popover')) {
        this.prepareTracker(true);
        if (this.popout) {
          this.popoutCSS = this.getPopoutCss();
          this.modeSource.next('popout');
        } else {
          this.modeSource.next('edit');
        }
      }
    }
  }

  public prepareTracker(focusOnElement=false) {
    setTimeout(() => {
      this.trackerCSS = this.getTrackerCss(this.height);
      this.trackHeightRows(this.editText.nativeElement, this.textareaTracker.nativeElement);
      if (focusOnElement) {
        this.editText.nativeElement.focus();
      }
    }, 0);
  }

  public trackHeightRows(inputEl: HTMLTextAreaElement, trackingEl: HTMLElement) {
    setTimeout(() => {
      const computedStyles = window.getComputedStyle(trackingEl);
      const padding = parseInt(computedStyles.borderTopWidth, 10)
        + parseInt(computedStyles.borderBottomWidth, 10)
        + parseInt(computedStyles.paddingTop, 10)
        + parseInt(computedStyles.paddingBottom, 10);

      const lines = Math.ceil(
        Math.min(
          (trackingEl.offsetHeight - padding),
          Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          ) - inputEl.getBoundingClientRect().top - 120) / parseInt(inputEl.style.lineHeight, 10)
      );
      if (lines > this.visibleEditRows) {
        this.visibleEditRows = Math.min(lines, this.supreEditRows || 200);
      } else if (lines < this.visibleEditRows) {
        this.visibleEditRows = Math.max(lines, 1);
      }
    }, 0);
  }

}
