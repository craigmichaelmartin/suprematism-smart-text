# Suprematism Smart Text

An Angular 2 smart text component.


#### Installation
```bash
npm i -S CINBCUniversal/suprematism-smart-text
```
Until it is published to npm, point to github. A consequence of this is that
built files must be checked-in. When we publish to npm with `npm publish`,
there is a prehook to build the files and a posthook to delete them
(so only source files are saved in git). For now, after doing development,
we must manually run the publish prehook and save the files.


#### View
- [Hosted on Github Pages](https://cinbcuniversal.github.io/suprematism-smart-text/)
- Run the example locally with `npm run example`


## Components
- [`supre-smart-text`](#supre-smart-text)

#### <a id="supre-smart-text"></a> `supre-smart-text`
A component for smart text
  - Rows: Specify a maxmimum number of rows for the display text, using an ellipsis with popover if text overflows.
  - Editable: Specify the display text to be editable.
  - Placeholder: Specify a placeholder in editable area if empty.
  - Default Value: Specify a default value if the editable area is saved empty (or starts empty).
  - Force Value: Specify that a value must be provided - an action cannot be taken to leave the editable area when there is no value. If no initial value is given, component will begin as editable.

##### Directives
- `supreDisplayRows: number` - No default. If not provided, text will never be shaved. If provided text will be shaved at the given number of lines.
- `supreEditRows: number` - No default. If not provided, edit area will expand. If provided testarea will begin scrolling at the given number of lines.
- `supreIsEditable: boolean` - Defaults to true.
- `suprePlaceholder: string` - No default. If not provided, no placeholder will be used.
- `supreDefaultText: string` - No default. If not provided, no default text will be used.
- `supreForceValue: boolean` - Defaults to false.
- `popout: boolean` - Defaults to false. If true, text will be updated in a dialog.

##### Events
- `textUpdated: string` - The confirmed text.


## States
The smart text component has these states:
  - `SmartText.is-display`|`SmartText.is-edit`|`SmartText.is-popout` - which mode the smart text is in.
  - `SmartText-Display.is-active`|`SmartText-Display.is-notActive` - whether the display is active (focused).
  - `SmartText-Edit.is-active`|`SmartText-Edit.is-notActive` - whether the edit is active (focused).


## Example
```html
<supre-smart-text supreDisplayRows=2 supreEditRows=2 suprePlaceholder="Please enter title" [supreDefaultText]="Default Title (1)">
  <div class="header">My Award Winning Title</div>
</supre-smart-text>
```

## Notes
- Inline styles on the wrapped element are not reflected in the smart text projection
- Edit area height is not guaranteed to be _precisely_ accurate :(
