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
function behavior(behaviorClassOrPrototype) {
    return function (targetClass) {
        var prototype = targetClass.prototype;
        prototype.behaviors = prototype.behaviors || [];
        prototype.behaviors.push((behaviorClassOrPrototype instanceof Function) ?
            behaviorClassOrPrototype.prototype : behaviorClassOrPrototype);
    };
}
exports.behavior = behavior;
function behaviors(behaviorClassesOrPrototypes) {
    return function (targetClass) {
        var prototype = targetClass.prototype;
        var behaviors = behaviorClassesOrPrototypes.map(function (behaviorClassOrPrototype) { return ((behaviorClassOrPrototype instanceof Function) ?
            behaviorClassOrPrototype.prototype : behaviorClassOrPrototype); });
        prototype.behaviors = prototype.behaviors ? prototype.behaviors.concat(behaviors) : behaviors;
    };
}
exports.behaviors = behaviors;
function observers(observerList) {
    return function (targetClass) {
        var prototype = targetClass.prototype;
        prototype.observers = prototype.observers ? prototype.observers.concat(observerList) : observerList;
    };
}
exports.observers = observers;
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
