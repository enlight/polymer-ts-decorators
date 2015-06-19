# polymer-ts-decorators
TypeScript decorators for Polymer 1.0 that enable more concise definition of web components.

Prerequisites
=============

TypeScript 1.5.0-beta or later.

Usage
=====

The following examples assume the module containing the decorators has been
imported like so:
```TypeScript
import * as pd from 'polymer-ts-decorators';
```

@is
---
A class decorator that sets the `is` property on the class prototype.
The [`is`](https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#register-element)
property is used to specify the HTML tag name for a custom element.

```TypeScript
@pd.is('my-element')
class MyElement {
  ...
}

Polymer(MyElement.prototype);

```

@extend
-------
A class decorator that sets the `extends` property on the class prototype.
The [`extends`](https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#type-extension)
property is used to specify which native HTML element a custom element extends.

```TypeScript
@pd.is('my-element')
@pd.extend('input')
class MyElement {
  ...
}

Polymer(MyElement.prototype);
```

@property
---------
A property decorator that adds a Polymer property definition to the
[`properties`](https://www.polymer-project.org/1.0/docs/devguide/properties.html)
property on the class prototype.

```TypeScript
@pd.is('my-element')
class MyElement {
  @pd.property({
    type: String,
    value: 'user',
    reflectToAttribute: true,
    readOnly: false,
    notify: true,
    computed: 'computeUserName',
    observer: 'userNameChanged'
  })
  userName: string;

  computeUserName(): string {
    ...
  }

  userNameChanged(newValue: string, oldValue: string) {
    ...
  }
}

Polymer(MyElement.prototype);
```

@behavior
---------
A class decorator that adds a behavior prototype to the `behaviors` property on
the class prototype. The [`behaviors`](https://www.polymer-project.org/1.0/docs/devguide/behaviors.html)
property is an array of prototypes that Polymer will merge into the class prototype.

```TypeScript
class SwooshBehavior {
  ...
}

class SwishBehavior {
  ...
}

@pd.is('my-element')
@pd.behavior(SwooshBehavior.prototype)
@pd.behavior(SwishBehavior)
class MyElement {
  ...
}

Polymer(MyElement.prototype);
```

@behaviors
----------
A class decorator that adds behavior prototypes to the `behaviors` property on the
class prototype. The [`behaviors`](https://www.polymer-project.org/1.0/docs/devguide/behaviors.html)
property is an array of prototypes that Polymer will merge into the class
prototype. If the decorator is applied multiple times to the same class the
observers are merged into a single array.

```TypeScript
@pd.is('my-element')
@pd.behaviors([SwishBehavior.prototype, SwooshBehavior])
class MyElement {
  ...
}

Polymer(MyElement.prototype);
```

@observers
----------
A class decorator that creates an `observers` property on the class prototype.
The [`observers`](https://www.polymer-project.org/1.0/docs/devguide/properties.html#multi-property-observers)
property is an array of names of functions that observe changes to a set of properties,
sub-properties, or array properties. If the decorator is applied multiple times to
the same class the observers are merged into a single array.

```TypeScript
@pd.is('my-element')
@pd.observers(['observeA(propA)', 'observeB(propB)'])
@pd.observers(['observeAB(propA,propB)', 'observeCD(propC,propD)'])
class MyElement {
  observeA(propA): void {
    ...
  }
  observeB(propB): void {
    ...
  }
  observeAB(propA, propB): void {
    ...
  }
  observeCD(propC, propD): void {
    ...
  }
}

Polymer(MyElement.prototype);
```

@listener
---------
A method decorator that creates a mapping between an event name and a method
that will be used to handle that event, the mapping is stored in the
[`listeners`](https://www.polymer-project.org/1.0/docs/devguide/events.html#event-listeners)
property on the class prototype.

```TypeScript
@pd.is('my-element')
class MyElement {
  @pd.listener('tap')
  regularTap(e: Event) {
    ...
  }
  @pd.listener('special.tap')
  specialTap(e: Event) {
    ...
  }
}

Polymer(MyElement.prototype);
```

@listeners
----------
A class decorator that creates a `listeners` property on the class prototype.
The [`listeners`](https://www.polymer-project.org/1.0/docs/devguide/events.html#event-listeners)
property is an object whose keys and values correspond to event names and event handlers.
If the decorator is applied multiple times to the same class the event handler
mappings are merged into a single object.

```TypeScript
@pd.is('my-element')
@pd.listeners({
  'tap': 'regularTap',
  'special.tap', 'specialTap'
})
@pd.listeners({
  'up': 'buttonUp',
  'down': 'buttonDown'
})
class MyElement {
  regularTap(e: Event) {
    ...
  }
  specialTap(e: Event) {
    ...
  }
  buttonUp(e: Event) {
    ...
  }
  buttonDown(e: Event) {
    ...
  }
}

Polymer(MyElement.prototype);
```

@hostAttributes
---------------
A class decorator that creates a `hostAttributes` property on the class prototype.
The [`hostAttributes`](https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#host-attributes)
property is an object whose keys and values correspond to attribute names and values.
If the decorator is applied multiple times to the same class the attribute definitions are merged into a single object. Polymer will set these HTML
attributes on the element when it is created.

```TypeScript
@pd.is('my-element')
@pd.hostAttributes({
  role: 'button',
  'aria-disabled': true
})
@pd.hostAttributes({
  tabindex: 0
})
class MyElement {
  ...
}

Polymer(MyElement.prototype);
```

License
=======

This library is licensed under the MIT license. See [LICENSE](LICENSE) file for full terms.
