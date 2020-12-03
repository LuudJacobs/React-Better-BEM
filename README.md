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

const BemComponent = () => (
  <Bem>
    <article mod="new">
      <h1 el="title" mod={['large', { bold: true, color: 'blue' }]}>
        Long classnames nobody wants to write
      </h1>
      <p mod="intro">
        BEM is great and all, but who wants to spend all day writing classnames?
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod idem cum vestri faciant, non satis magnam tribuunt inventoribus gratiam.
      </p>
    </article>
  </Bem>
);
```

**Output:**

```html
<article class="article article--new">
  <h1 class="article__title article__title--new article__title--large article__title--bold article__title--color-blue">
    Long classnames nobody wants to write
  </h1>
  <p class="article__p article__p--new article__p--intro">
    BEM is great and all, but who wants to spend all day writing classnames?
  </p>
  <p class="article__p article__p--new">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod idem cum vestri faciant, non satis magnam tribuunt inventoribus gratiam.
  </p>
</article>
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

_boolean_ If `true` only classnames defined in the classname map passed to the style prop will be outputted. This will prevent the generation of unused classnames.

default: `true`

### Children Props

The `<Bem/>` component walks over its children and looks for the following props to generate a className prop.

#### el

_string_, _array_ or _object_ The bem 'element' classname(s)

default: `""`

#### mod

_string_, _array_ or _object_ The bem 'modifier' classname(s). Mods are passed down to child components.

default: `""`

#### className

_string_ Default classname props. This classname will be preserved and generated bem classnames will be added to this classname.

### Nesting

`<Bem/>` components can safely be nested. This will generate a new bem block 'namespace'. None of the properties are inherited.

### Example

```javascript
import React from 'react';
import Bem from 'react-better-bem';
import style from './BemComponent.module.css';

const BemComponent = () => (
  <Bem style={style}>
    <div el="container" mod="padded">
      <h1 el="title">This title is an element in the container block</h1>
      <h2 el="title" mod="sub small">
        There's no modifier classname '--small' in the css sheet, so it will not be applied.
      </h2>
      <Bem block="inner" style={style}>
        <p className="paragraph">
          {'This is a new <Bem/> instance. Classnames in the className property will always be passed on and will not be used for classname generation.'}
        </p>
        <p mod={{ bold: true, size: 2, color: 'blue' }}>
          You can use objects for more advanced classname generation.
        </p>
      </Bem>
    </div>
  </Bem>
);
```

```css
/* BemComponent.module.css */

.container {
  margin: 0 auto;
  max-width: 640px;
}

.container--padded {
  padding: 0 1em;
}

.container__title {
  font-size: 1.8em;
  line-height: 1;
}

.container__title--sub {
  font-size: 1.2em;
}

.inner__p {
  line-height: 1.8;
  max-width: 400px;
}

.inner__p--bold {
  font-weight: bold;
}

.inner__p--size-2 {
  font-size: 2em;
}

.inner__p--color-blue {
  color: blue;
}
```

#### Outputted html

```html
<div class="container container--padded">
  <h1 class="container__title">This title is an element in the container block</h1>
  <h2 class="container__title container__title--sub">
    There's no modifier classname '--small' in the css sheet, so it will not be applied.
  </h2>
  <p class="inner__p paragraph">
    This is a new &lt;Bem/&gt; instance. Classnames in the className property will always be passed on and will not be used for classname generation.
  </p>
  <p class="inner__p inner__p--bold inner__p--size-2 inner__p--color-blue">
    You can use objects for more advanced classname generation.
  </p>
</div>
```
