// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.
function is(elementName) {
    return function (targetClass) {
        targetClass.prototype.is = elementName;
    };
}
exports.is = is;
function extend(elementName) {
    return function (targetClass) {
        targetClass.prototype.extends = elementName;
    };
}
exports.extend = extend;
/**
 * Generates a class decorator that adds a behavior to a custom Polymer element.
 *
 * @param behaviorClassOrPrototype A behavior class (a constructor function) or a prototype object.
 */
function behavior(behaviorClassOrPrototype) {
    return function (targetClass) {
        var prototype = targetClass.prototype;
        prototype.behaviors = prototype.behaviors || [];
        prototype.behaviors.push((behaviorClassOrPrototype instanceof Function) ?
            behaviorClassOrPrototype.prototype : behaviorClassOrPrototype);
    };
}
exports.behavior = behavior;
/** Generates a class decorator that adds a list of behaviors to a custom Polymer element. */
function behaviors(behaviorClassesOrPrototypes) {
    return function (targetClass) {
        var prototype = targetClass.prototype;
        var behaviors = behaviorClassesOrPrototypes.map(function (behaviorClassOrPrototype) { return ((behaviorClassOrPrototype instanceof Function) ?
            behaviorClassOrPrototype.prototype : behaviorClassOrPrototype); });
        prototype.behaviors = prototype.behaviors ? prototype.behaviors.concat(behaviors) : behaviors;
    };
}
exports.behaviors = behaviors;
/** Appends a bunch of observers to the `observers` property of a Polymer element prototype. */
function observers(observerList) {
    return function (targetClass) {
        var prototype = targetClass.prototype;
        prototype.observers = prototype.observers ? prototype.observers.concat(observerList) : observerList;
    };
}
exports.observers = observers;
/** Adds a bunch of event listeners to the `listeners` property of a Polymer element prototype. */
function listeners(listenerMap) {
    return function (targetClass) {
        var prototype = targetClass.prototype;
        if (prototype.listeners) {
            Object.getOwnPropertyNames(listenerMap).forEach(function (name) {
                prototype.listeners[name] = listenerMap[name];
            });
        }
        else {
            prototype.listeners = listenerMap;
        }
    };
}
exports.listeners = listeners;
/** Adds a bunch of attributes to the `hostAttributes` property of a Polymer element prototype. */
function hostAttributes(attributeMap) {
    return function (targetClass) {
        var prototype = targetClass.prototype;
        if (prototype.hostAttributes) {
            Object.getOwnPropertyNames(attributeMap).forEach(function (name) {
                prototype.hostAttributes[name] = attributeMap[name];
            });
        }
        else {
            prototype.hostAttributes = attributeMap;
        }
    };
}
exports.hostAttributes = hostAttributes;
function property(propertyDefinition) {
    return function (targetPrototype, propertyKey) {
        targetPrototype.properties = targetPrototype.properties || {};
        targetPrototype.properties[propertyKey] = propertyDefinition;
    };
}
exports.property = property;
function listener(eventName) {
    return function (targetPrototype, propertyKey, descriptor) {
        targetPrototype.listeners = targetPrototype.listeners || {};
        targetPrototype.listeners[eventName] = propertyKey;
        return descriptor;
    };
}
exports.listener = listener;
