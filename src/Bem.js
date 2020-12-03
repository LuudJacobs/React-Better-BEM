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

        // destruct element props
        const {
            el,
            mod = [],
            className: elementClassName = '',
            children,
            ...restProps
        } = child.props;

        const mainClassName = el || child.name || child.type;

        const elementBem = _bem.el(mainClassName).mod(mod);

        const className = [elementBem.cn, elementClassName].join(' ').trim();

        // generate 'new' element with generated bem classname
        // recursively apply bem classnames to 'new' children
        return React.createElement(
            child.type,
            {
                ...restProps,
                ...(className && { className }),
                children: recursivelyApplyBem(children, elementBem)
            }
        );
    });
}
