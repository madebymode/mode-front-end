---
title: Style Guide
name: style_guide
category: Getting Started
hologram: true
---
## Naming Conventions

### [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)

`block__element--modifier@breakpoint`

### [Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

- `o-`   Object     : Generic styles that can be reused in multiple, unrelated contexts.
- `u-`   Utility    : “A very specific role [that is] not tied to any specific piece of UI.”
- `c-`   Component  : “A concrete, implementation-specific piece of UI.”
- `t-`   Theme      : Use to affect the appearance of components.
- `is-`,
  `has-` State      : “Temporary, optional, or short-lived style.”
-  `_`   Hack       : The worst (hopefully temporary) styles.
- `js-`  JavaScript : Use to bind behaviors to the DOM. (This makes for more flexible styling.)
- `qa-`  QA         : Use to bind automated UI tests to the DOM. "Basically just reserves hooks in the DOM for non-CSS purposes."
