# Eslint plugin mobx observer checker

> Plugin for eslint that checks whether you have wrapped the component in the observer when using the store

## Table of Contents

* [Installation](#installation)
* [Config](#config)
* [What you need for linter works](#what-you-need-for-linter-works)
* [Example](#example)

## Installation

```sh
$ npm install eslint-plugin-mobx-observer-checker --save-dev
```

## Config

Update eslint config

```js
"plugins": [
	...
	"mobx-observer-checker"
],
"rules": {
	...
	"mobx-observer-checker/observer-wrapper": "warn"
}
```

## What you need for linter works

In order for the linter to work, you need to adhere to the following rules:
 - You must use the store using the hook that has in the name ```use``` and ```Store```:

```js
// work
const {bar} = useRootStore()
const {foo} = useStore()

// not work
const store = useContext(RootSoreContext)
```

 - The component must be wrapped in the Observer when exporting by default:

```js
// work:
export default observer(Foo) 

// not work:
export const Foo = observer(()) => {}
const Foo = observer(()) => {}
export default Foo
```

## Example

```js
import useStore from 'hooks/useStore'
import { observer } from "mobx-react-lite";

const Foo = () => {
	const {bar} = useRootStore()
	return { ... }
}

// Error
export default Foo 

// Fine
export default observer(Foo) 
```
