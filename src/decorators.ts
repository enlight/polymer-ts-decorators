/// <reference path="../typings/polymer/polymer.d.ts" />

export function is(elementName: string): ClassDecorator {
  return (targetClass: Function) => {
    targetClass.prototype.is = elementName;
  }
}

export function extendsElement(elementName: string): ClassDecorator {
  return (targetClass: Function) => {
    targetClass.prototype.extends = elementName;
  }
}

export function behaviors(behaviorClasses: Function[]): ClassDecorator {
  return (targetClass: Function) => {
    targetClass.prototype.behaviors = behaviorClasses.map(behaviorClass => behaviorClass.prototype);
  }
}

/** Appends a bunch of observers to the `observers` property of a Polymer element prototype. */
export function observers(observerList: string[]): ClassDecorator {
  return (targetClass: Function) => {
    let targetPrototype: polymer.IBehavior = targetClass.prototype;
    targetPrototype.observers = targetPrototype.observers ? targetPrototype.observers.concat(observerList) : [];
  }
}

/** Adds a bunch of event listeners to the `listeners` property of a Polymer element prototype. */
export function listeners(listenerMap: Object): ClassDecorator {
  return (targetClass: Function) => {
    let allListeners = targetClass.prototype.listeners || listenerMap;
    if (allListeners !== listenerMap) {
      Object.getOwnPropertyNames(listenerMap).forEach(name => {
        allListeners[name] = listenerMap[name];
      });
    }
  }
}

/** Adds a bunch of attributes to the `hostAttributes` property of a Polymer element prototype. */
export function hostAttributes(attributeMap: Object): ClassDecorator {
  return (targetClass: Function) => {
    let allAttrs = targetClass.prototype.hostAttributes || attributeMap;
    if (allAttrs !== attributeMap) {
      Object.getOwnPropertyNames(attributeMap).forEach(name => {
        allAttrs[name] = attributeMap[name];
      });
    }
  }
}

export function property<T>(propertyDefinition?: polymer.IProperty<T>): PropertyDecorator {
  return (targetPrototype: polymer.IBehavior, propertyKey: string | symbol) => {
    targetPrototype.properties = targetPrototype.properties || {};
    if (propertyDefinition) {
      if (!propertyDefinition.type) {
        propertyDefinition.type = targetPrototype[propertyKey].constructor
      }
      targetPrototype.properties[propertyKey] = propertyDefinition;
    } else {
      targetPrototype.properties[propertyKey] = targetPrototype[propertyKey].constructor;
    }
  }
}

export function listener(eventName: string): PropertyDecorator {
  return (targetPrototype: polymer.IBehavior, propertyKey: string | symbol) => {
    targetPrototype.listeners = targetPrototype.listeners || {};
    targetPrototype.listeners[eventName] = propertyKey;
  }
}
