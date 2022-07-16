# @esri/eslint-plugin-calcite-components

ESLint rules specific to Stencil JS projects.

## Installation

Install the following deps in your stencil project:

```bash
npm i @esri/eslint-plugin-calcite-components --save-dev
```

## Usage

`.eslintrc.json` configuration file:

```json
{
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@esri/calcite-components/recommended"
  ]
}
```

Add a new `lint` script to the `package.json`:
```json
{
  "scripts": {
    "lint": "eslint src/**/*{.ts,.tsx}"
  }
}
```

Lint all your project:
```
npm run lint
```

## Supported Rules

- [`@esri/calcite-components/ban-events`](./docs/ban-events.md)

This rule helps prevent usage of specific events and allows suggesting alternatives.

- [`@esri/calcite-components/ban-props-on-host`](./docs/ban-props-on-host.md)

This rule catches props/attributes that should be in the encapsulated HTML structure and not on the host element.

- [`@esri/calcite-components/require-event-emitter-type`](./docs/require-event-emitter-type.md)

This rule helps enforce the payload type to EventEmitters to avoid misleading `any` type on the CustomEvent detail object.

- [`@esri/calcite-components/strict-boolean-attributes`](./docs/strict-boolean-attributes.md)

This rule catches boolean props that are initialized in a way that does not conform to the HTML5 spec.

## Recommended rules

```json
{
  "@esri/calcite-components/ban-props-on-host": "error",
  "@esri/calcite-components/require-event-emitter-type": "error",
  "@esri/calcite-components/strict-boolean-attributes": "error"
}
```

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing

Copyright 2021 Esri

Licensed under the Apache License Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license](./LICENSE) file.
