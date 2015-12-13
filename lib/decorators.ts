// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

export function is(elementName: string): ClassDecorator {
  return (targetClass: Function) => {
    targetClass.prototype.is = elementName;
  };
}

export function extend(elementName: string): ClassDecorator {
  return (targetClass: Function) => {
    targetClass.prototype.extends = elementName;
  };
}

/**
 * Generates a class decorator that adds a list of behaviors to a custom Polymer element.
 * 
 * @param getBehaviors A function that returns an array of behavior classes
 *                     (i.e. constructor functions) or prototypes.
 */
export function behaviors(getBehaviors: () => any[]): ClassDecorator {
  return (targetClass: Function) => {
    const existingDescriptor = Object.getOwnPropertyDescriptor(targetClass, 'behaviors');
    if (existingDescriptor) {
      throw new Error('The @behaviors decorator cannot be applied more than once per class.')
    }
    // Polymer looks for behaviors to mix into an element in the `behaviors` property
    Object.defineProperty(targetClass.prototype, 'behaviors', {
      get: function () {
        if (!this._behaviors) {
          // Polymer expects an array of prototypes, so replace the constructors with the
          // corresponding prototypes.
          this._behaviors = getBehaviors().map(classOrPrototype =>
            ((classOrPrototype instanceof Function) ? classOrPrototype.prototype : classOrPrototype)
          );
        }
        return this._behaviors;
      },
      // Polymer will flatten out composite behaviors and then assign the result back to the
      // `behaviors` property on the element, so the property must have a setter.
      set: function (value: any[]) {
        this._behaviors = value;
      }
    });
  };
}

/** Appends a bunch of observers to the `observers` property of a Polymer element prototype. */
export function observers(observerList: string[]): ClassDecorator {
  return (targetClass: Function) => {
    let prototype: polymer.IBehavior = targetClass.prototype;
    prototype.observers = prototype.observers ? prototype.observers.concat(observerList) : observerList;
  };
}

/** Adds a bunch of event listeners to the `listeners` property of a Polymer element prototype. */
export function listeners(listenerMap: any): ClassDecorator {
  return (targetClass: Function) => {
    let prototype: polymer.IBehavior = targetClass.prototype;
    if (prototype.listeners) {
      Object.getOwnPropertyNames(listenerMap).forEach(name => {
        prototype.listeners[name] = listenerMap[name];
      });
    } else {
      prototype.listeners = listenerMap;
    }
  };
}

/** Adds a bunch of attributes to the `hostAttributes` property of a Polymer element prototype. */
export function hostAttributes(attributeMap: any): ClassDecorator {
  return (targetClass: Function) => {
    let prototype: polymer.IBehavior = targetClass.prototype;
    if (prototype.hostAttributes) {
      Object.getOwnPropertyNames(attributeMap).forEach(name => {
        prototype.hostAttributes[name] = attributeMap[name];
      });
    } else {
      prototype.hostAttributes = attributeMap;
    }
  };
}

export function property<T>(propertyDefinition: polymer.IProperty<T>): PropertyDecorator {
  return (targetPrototype: polymer.IBehavior, propertyKey: string | symbol) => {
    targetPrototype.properties = targetPrototype.properties || {};
    targetPrototype.properties[propertyKey] = propertyDefinition;
  };
}

export function listener(eventName: string): MethodDecorator {
  return (targetPrototype: polymer.IBehavior, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    targetPrototype.listeners = targetPrototype.listeners || {};
    targetPrototype.listeners[eventName] = propertyKey;
    return descriptor;
  };
}
