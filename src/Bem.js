import React from 'react';
import BEM from 'better-bem';

const Bem = ({ children, block = '', mod, style, strict }) => {
    const bem = BEM(block, style, strict);
    return recursivelyApplyBem(children, bem, mod);
};

function recursivelyApplyBem(children, bem, inheritedMods = []) {
    return React.Children.map(children, (child) => {
        // sorry, only handling valid elements
        // and no, no, no we're not handling nested
        // <Bem> components. They can be all bemmy by themselves
        if (!React.isValidElement(child) || child.type === Bem) {
            return child;
        }

        // destruct element props
        const {
            isBlock, el,
            mod: elementMods,
            className: elementClassName = '',
            children,
            ...restProps
        } = child.props;

        // get base (.block or .block__element)
        const bemBase = bem.el(el);

        // merge inherited mods and element props
        const mods = [inheritedMods, elementMods].flat();

        // create classname string with passed classname
        // and generated bem classname. If neither block or
        // el is set, only return elementClassName
        const className = isBlock || el ? [elementClassName, bemBase.mod(mods).cn].join (' ').trim() : elementClassName;

        // generate 'new' element with generated bem classname
        // recursively apply bem classnames to 'new' children
        return React.createElement(
            child.type,
            {
                ...restProps,
                ...(className && { className }),
                children: recursivelyApplyBem(children, bemBase, mods)
            }
        );
    });
}

export default Bem;
