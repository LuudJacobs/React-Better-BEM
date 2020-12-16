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

    return React.Children.map(children, (childElement) => {
        // sorry, only handling DOM type elements
        // so no nested components
        if (!React.isValidElement(childElement) || typeof childElement.type !== 'string') {
            return childElement;
        }

        // destruct element props
        const {
            el,
            mod = [],
            className: originalClassName = '',
            children,
        } = childElement.props;

        // set base className
        const mainClassName = el || childElement.type;

        // bemify
        const elementBem = _bem.el(mainClassName).mod(mod);

        // concat with original classname
        const className = [elementBem.cn, originalClassName].join(' ').trim();

        // clone element with new className prop and apply bem to all child elements recursively
        // unset el and mod props
        return React.cloneElement(
            childElement,
            { className, el: undefined, mod: undefined },
            recursivelyApplyBem(children, elementBem)
        );
    });
}
