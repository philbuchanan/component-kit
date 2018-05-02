# Component Kit

A modular, scalable, Sass-based, OOCSS framework for quick development of web application interfaces.

## CSS directory structure

The folder structure is as follows:

- `/settings`: Global variables and site-wide settings
- `/tools`: Mixins
- `/generic`: Low-specificity, far-reaching rulesets (like resets)
- `/elements`: Unclassed HTML elements
- `/objects`: Objects, abstractions, and design-less patterns
- `/components`: Discrete, complete chunks of UI
- `/utilities`: High-specificity, very explicit selectors for overrides and helpers (usually include `!important` to ensure override)
