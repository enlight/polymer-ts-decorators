// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

/// <reference path="../typings/polymer/polymer.d.ts" />

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

export function behavior(behaviorClass: Function): ClassDecorator {
  return (targetClass: Function) => {
    let prototype: polymer.IBehavior = targetClass.prototype;
    prototype.behaviors = prototype.behaviors || [];
    prototype.behaviors.push(behaviorClass.prototype);
  };
}

export function behaviors(behaviorClasses: Function[]): ClassDecorator {
  return (targetClass: Function) => {
    let prototype: polymer.IBehavior = targetClass.prototype;
    let behaviors = behaviorClasses.map(behaviorClass => behaviorClass.prototype);
    prototype.behaviors = prototype.behaviors ? prototype.behaviors.concat(behaviors) : behaviors;
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
