/*
 * React-Better-BEM
 * (c) Luud Jacobs
 * @license ISC
 */

import React from 'react';
import bem from 'better-bem';

export default function Bem ({ children, block = '', mod = [], style = {}, strict = true, glue = {} }) {
    const _bem = bem(block, mod, style, strict, glue);
    return recursivelyApplyBem(children, _bem);
}

function recursivelyApplyBem(children, _bem) {
    // if there's no children, return nothing
    if (!children) {
        return null;
    }

    return React.Children.map(children, (child) => {
        // sorry, only handling DOM type elements
        // so no nested components
        if (!React.isValidElement(child) || typeof child.type !== 'string') {
            return child;
        }

        // get child element type, key, props and ref
        const { type, key, props, ref } = child;

        // destruct element props
        const {
            el,
            mod = [],
            className: originalElementClassName = '',
            children,
            ...restProps
        } = props;

        // set base className
        const mainClassName = el || type;

        // bemify
        const elementBem = _bem.el(mainClassName).mod(mod);

        // concat with original element classname
        const className = [elementBem.cn, originalElementClassName].join(' ').trim();

        // generate 'new' element with generated bem classname
        // recursively apply bem classnames to 'new' children
        return React.createElement(
            type,
            {
                ...restProps,
                ...(className && { className }),
                children: recursivelyApplyBem(children, elementBem),
                key,
                ref
            }
        );
    });
}
