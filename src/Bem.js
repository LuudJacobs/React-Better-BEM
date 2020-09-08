/*
 * React-Better-BEM
 * (c) Luud Jacobs
 * @license ISC
 */

import React from 'react';
import bem from 'better-bem';

const Bem = ({ children, block = '', mod = [], style = {}, strict = true, glue = {} }) => {
    const _bem = bem(block, mod, style, strict, glue);
    return recursivelyApplyBem(children, _bem);
};

function recursivelyApplyBem(children, _bem) {
    // if there's no children, return nothing
    if (!children) {
        return null;
    }

    return React.Children.map(children, (child) => {
        // sorry, only handling valid elements
        // and no, no, no we're not handling nested
        // <Bem> components. They can be all bemmy by themselves
        if (!React.isValidElement(child) || child.type === Bem) {
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

        const element = el === undefined ? child.name : el;

        const elementBem = _bem.el(el).mod(mod);

        console.log({el, mod}, elementBem.cn);

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

export default Bem;
