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
A component for a smart text.

##### Directives
- Any Directives?

##### Events
- Any Events


## States
- The smart text component has these states:


## Example
```html
<supre-smart-text>
</supre-smart-text>
```



notes:
------
- inline styles aren't carried over with ng-content (i think that's the explanation; inline styles don't show is the problem)
- rows calc / shave - breaks if padding present
