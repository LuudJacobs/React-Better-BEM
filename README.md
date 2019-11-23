# React-Better-BEM

React component which uses [better-bem](https://github.com/LuudJacobs/better-bem) to easily generate [BEM](https://en.bem.info/methodology/quick-start/) classnames with support for classname maps as imported with [CSS Modules](https://github.com/css-modules/css-modules).

## Install

```zsh
# install
npm i react-better-bem --save
```

## Usage

```javascript
import React from 'react';
import Bem from 'react-better-bem';
import style from './BemComponent.module.css';

const BemComponent = () => (
  <Bem block="block" style={style} strict={true}>
	<article isBlock>
	  <h1 el="element" mod="modifiers">title</h1>
	</article>
  </Bem>
);
```

### better-bem

This component uses [better-bem](https://github.com/LuudJacobs/better-bem) for generating classnames. Please refer to the readme in that project for details on how the 'block', 'el' and 'mod' props work.

### `<Bem/>` Props

#### block

_string_, _array_ or _object_ The bem 'block' classname(s).

default: `""`

#### mod

_string_, _array_ or _object_ The bem 'modifier' classname(s).

#### style

_object_ Classname map (as imported via CSS Modules for example)

default: `{}`

#### strict

_boolean_ If `true` only classnames defined in the classname map passed to the style prop will be outputted.

default: `true`

### Children Props

The `<Bem/>` component walks over its children and looks for the following props to generate a className prop.

#### isBlock

_bool_ If true this element is handled as the bem block element

default: `false`

#### block

**todo:** _string_, _array_ or _object_ The bem 'block' classname(s)

default: `""`

#### el

_string_, _array_ or _object_ The bem 'element' classname(s)

default: `""`

#### mod

_string_, _array_ or _object_ The bem 'modifier' classname(s). Mods are passed down to child components.

default: `""`

#### className

_string_ Default classname props. This classname will be preserved and generated bem classnames will be added to this classname.

### Nesting

`<Bem/>` components can safely be nested. This will generate a new bem block 'namespace'. **todo:** inherit 'style' and 'strict' props, unless they're explicitly defined for the nested component.

### Example

```javascript
import React from 'react';
import Bem from 'react-better-bem';
import style from './BemComponent.module.css';

const BemComponent = () => {
  return (
    <Bem block="container" style={style} strict={false}>
      <div isBlock>
        <h1 el="title">I left my wallet in El Segundo</h1>
        <h2 el="title" mod="sub">
          I got to get it, <span el="repeat">I got</span>, <span el="repeat">I got to get it</span>
        </h2>
        <Bem block="lyrics">
          <p className="paragraph" isBlock>
			My mother went away for a month-long <span el="rhyme" mod={{ scheme: '1' }}>trip</span><br/>
			Her and some friends on an ocean liner <span el="rhyme" mod={{ scheme: '1' }}>ship</span><br/>
			She made a big mistake by leaving me <span el="rhyme" mod={{ scheme: '2' }}>home</span></br>
			I had to <span el="rhyme" mod={{ scheme: '2' }}>roam</span> so I picked up the <span el="rhyme" mod={{ scheme: '2' }}>phone</span><br/>
			Dialed Ali up to see what was going <span el="rhyme" mod={{ scheme: '3' }}>down</span><br/>
			Told him I pick him up so we could drive <span el="rhyme" mod={{ scheme: '3' }}>around</span>
          </p>
        </Bem>
      </div>
    </Bem>
  );
};
```

#### Outputted html

```html
<div class="container">
  <h1 class="container__title">I left my wallet in El Segundo</h1>
  <h2 class="container__title container__title--sub">
    I got to get it, <span className="container__title__repeat container__title__repeat--sub">I got</span>, <span className="container__title__repeat container__title__repeat--sub">I got to get it</span>
  </h2>
  <p class="paragraph lyrics">
    My mother went away for a month-long <span class="lyrics__rhyme lyrics__rhyme--scheme-1">trip</span><br>
    Her and some friends on an ocean liner <span class="lyrics__rhyme lyrics__rhyme--scheme-1">ship</span><br>
    She made a big mistake by leaving me <span class="lyrics__rhyme lyrics__rhyme--scheme-2">home</span><br>
    I had to <span class="lyrics__rhyme lyrics__rhyme--scheme-2">roam</span> so I picked up the <span class="lyrics__rhyme lyrics__rhyme--scheme-2">phone</span><br>
    Dialed Ali up to see what was going <span class="lyrics__rhyme lyrics__rhyme--scheme-3">down</span><br>
    Told him I pick him up so we could drive <span class="lyrics__rhyme lyrics__rhyme--scheme-3">around</span>
  </p>
</div>
```
