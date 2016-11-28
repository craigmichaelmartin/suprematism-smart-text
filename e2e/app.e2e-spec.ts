import { SuprematismSmartTextPage } from './app.po';

const projectedTextHeight = '54px';
const headerColor = 'rgba(102,102,102,1)';
const headerEditableColor = 'rgba(0,137,208,1)';
const text = 'I ponder of something great. My lungs will fill and deflate. They fill with fire, exhale desire. I know it\'s dire my time today.';
const textShown = 'I ponder of something great. My lungs will fill and deflate. They fill ...';


const assertRestingDisplayMode = function(page, truncatedText = textShown) {
  expect(page.getDisplayElStyle('visibility')).toEqual('visible');
  expect(page.getEditElStyle('display')).toEqual('none');
  expect(page.getProjectedTextElStyle('color')).toEqual(headerColor);
  expect(page.getEditIconElStyle('visibility')).toEqual('hidden');
  expect(page.getDisplayTextElText()).toEqual(truncatedText);
};
const assertHoveredEditableDisplayMode = function(page) {
  expect(page.getDisplayElStyle('visibility')).toEqual('visible');
  expect(page.getEditElStyle('display')).toEqual('none');
  expect(page.getDisplayTextElStyle('color')).toEqual(headerEditableColor);
  expect(page.getEditIconElStyle('visibility')).toEqual('visible');
  expect(page.getEditIconElStyle('color')).toEqual(headerEditableColor);
};
const assertInRestingEditMode = function(page) {
  expect(page.getDisplayElStyle('visibility')).toEqual('hidden');
  expect(page.getEditElStyle('display')).toEqual('block');
  expect(page.getEditAreaElStyle('color')).toEqual(headerColor);
  expect(page.getConfirmIconElStyle('visibility')).toEqual('visible');
  expect(page.getConfirmIconElStyle('color')).toEqual(headerEditableColor);
  expect(page.getCancelIconElStyle('visibility')).toEqual('visible');
  expect(page.getCancelIconElStyle('color')).toEqual(headerEditableColor);
};
const assertRowsFeature = function(page) {
  expect(page.getProjectedTextElStyle('height')).toEqual(projectedTextHeight);
  expect(page.isEllipsisPresent()).toEqual(true);
};
const assertPopoverDisplayed = function(page) {
  expect(page.isPopoverPresent()).toEqual(true);
  expect(page.getPopoverText()).toEqual(text);
  expect(page.getPopoverStyle('color')).toEqual(headerColor);
};

describe('suprematism-smart-text component', function() {
  let page: SuprematismSmartTextPage;
  beforeEach(() => {
    page = new SuprematismSmartTextPage();
    page.setBrowserDimensions(1000, 700);
  });
  describe('static example', () => {
    beforeEach(() => {
      page.navigateTo('static');
    });
    describe('resting state', () => {
      it('should have display resting mode set', () => {
        assertRestingDisplayMode(page);
      });
      it('should have rows feature working correctly', () => {
        assertRowsFeature(page);
      });
    });
    describe('when hovering text', () => {
      beforeEach(() => {
        page.hoverOnProjectedText();
      });
      it('should remain in display mode', () => {
        assertRestingDisplayMode(page);
      });
      it('should have rows feature working correctly', () => {
        assertRowsFeature(page);
      });
    });
    describe('when clicking text', () => {
      beforeEach(() => {
        page.clickOnProjectedText();
      });
      it('should remain in display mode', () => {
        assertRestingDisplayMode(page);
      });
      it('should have rows feature working correctly', () => {
        assertRowsFeature(page);
      });
    });
    describe('when hovering ellipsis', () => {
      beforeEach(() => {
        page.hoverOnEllipsis();
      });
      it('should correctly display popover', () => {
        assertPopoverDisplayed(page);
      });
    });
  });
  describe('simple example', () => {
    beforeEach(() => {
      page.navigateTo('simple');
    });
    describe('resting state', () => {
      it('should have display resting mode set', () => {
        assertRestingDisplayMode(page);
      });
      it('should have rows feature working correctly', () => {
        assertRowsFeature(page);
      });
    });
    describe('when hovering text', () => {
      beforeEach(() => {
        page.hoverOnProjectedText();
      });
      it('should change to editable display mode', () => {
        assertHoveredEditableDisplayMode(page);
      });
      it('should have rows feature working correctly', () => {
        assertRowsFeature(page);
      });
    });
    describe('when clicking text', () => {
      beforeEach(() => {
        page.clickOnProjectedText();
      });
      describe('resting edit state', () => {
        it('should change to edit mode', () => {
          assertInRestingEditMode(page);
        });
      });
      describe('cancel functionality', () => {
        beforeEach(() => {
          page.changeEditTextArea('a');
          page.clickOnCancelIcon();
        });
        it('should swtich back to edit mode with unchanged text', () => {
          assertRestingDisplayMode(page);
        });
      });
      describe('confirm functionality', () => {
        beforeEach(() => {
          page.changeEditTextArea('a' + text);
        });
        describe('using icon', () => {
          beforeEach(() => {
            page.clickOnConfirmIcon();
          });
          it('should switch back to edit mode with changed text', () => {
            assertRestingDisplayMode(page, 'a' + textShown);
          });
        });
        describe('using enter key', () => {
          beforeEach(() => {
            page.hitEnterKeyInTextArea();
          });
          it('should switch back to edit mode with changed text', () => {
            assertRestingDisplayMode(page, 'a' + textShown);
          });
        });
      });
    });
    describe('when hovering ellipsis', () => {
      beforeEach(() => {
        page.hoverOnEllipsis();
      });
      it('should correctly display popover', () => {
        assertPopoverDisplayed(page);
      });
    });
  });
});
