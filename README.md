# React-Better-BEM

React component which uses [better-bem](https://github.com/LuudJacobs/better-bem) to easily generate [BEM](https://en.bem.info/methodology/quick-start/) classnames with support for classname maps as imported with [CSS Modules](https://github.com/css-modules/css-modules).

## Install

```zsh
# install
npm i react-better-bem
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

### `<Bem/>` Props

#### block

_string_, _array_ or _object_ The bem 'block' classname(s)

default: `""`

#### mod

_string_, _array_ or _object_ The bem 'modifier' classname(s). These are passed down to child elements

#### style

_object_ Classname map (as imported via CSS Modules for example)

default: `{}`

#### strict

_boolean_ Only output classnames which are mapped via classname map in style prop

default: `true`

### Child Props

#### isBlock

_bool_ If true this element is handled as the bem block element

default: `false`

#### el

_string_, _array_ or _object_ The bem 'element' classname(s)

default: `""`

#### mod

_string_, _array_ or _object_ The bem 'modifier' classname(s). Mods are passed down to child components.

default: `""`

#### className

_string_ Default classname props. This classname will be preserved and generated bem classnames will be added to this classname.

### better-bem

This component uses [better-bem](https://github.com/LuudJacobs/better-bem) for generating classnames. Please refer to the readme in that project for details on how block, el and mod do work.

### Nesting

`<Bem/>` components can safely be nested. This will generate a new bem block 'namespace' and no props from the outer `<Bem/>` component will leak into the inner `<Bem/>` component.

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
