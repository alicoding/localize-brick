Localize Brick
====

Localize Brick is a node module uses to localize any brick (component) for Appmaker project.

Install:

``` bash
npm install -g localize-brick
```

##### Example


Run:

``` bash
localize
```

It will look for `<ceci-definition>` and grab the JSON inside its children.
```
╭─ali@ali  ~/work/personal/localize-brick  ‹master›
╰─$ node localize

{ 'ceci-double-button/description': 'Broadcasts a "click" when clicked.',
  'ceci-double-button/name': 'Double Button',
  'ceci-double-button/clickleft/label': 'Left Button',
  'ceci-double-button/clickleft/description': 'Occurs when left button is clicked.',
  'ceci-double-button/clickright/label': 'Right Button',
  'ceci-double-button/clickright/description': 'Occurs when right button is clicked.',
  'ceci-double-button/leftlabel/label': 'Left Button Label',
  'ceci-double-button/leftlabel/description': 'Text shown on the left button.',
  'ceci-double-button/leftbuttoncolor/label': 'Left Button Color',
  'ceci-double-button/leftbuttoncolor/description': 'Background color of the left button.',
  'ceci-double-button/rightlabel/label': 'Right Button Label',
  'ceci-double-button/rightlabel/description': 'Text shown on the right button.',
  'ceci-double-button/rightbuttoncolor/label': 'Right Button Color',
  'ceci-double-button/rightbuttoncolor/description': 'Background color of the right button.',
  'ceci-double-button/textcolor/label': 'Text Color',
  'ceci-double-button/textcolor/description': 'Color of the text on the button\'s label.' }

[?] Do you want to write this content to "locale/en-US.json" : Yes
[?] Are you sure you want to continue? (This will overwrite the existing content in the given path: Yes
```
It should write file to `locale/en-US.json`

If the option picked was `no` then you can specifiy the path you want the JSON to be written to.
