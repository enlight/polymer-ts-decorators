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
function behaviors(getBehaviors) {
    return function (targetClass) {
        var existingDescriptor = Object.getOwnPropertyDescriptor(targetClass, 'behaviors');
        if (existingDescriptor) {
            throw new Error('The @behaviors decorator cannot be applied more than once per class.');
        }
        Object.defineProperty(targetClass.prototype, 'behaviors', {
            get: function () {
                if (!this._behaviors) {
                    this._behaviors = getBehaviors().map(function (classOrPrototype) {
                        return ((classOrPrototype instanceof Function) ? classOrPrototype.prototype : classOrPrototype);
                    });
                }
                return this._behaviors;
            },
            set: function (value) {
                this._behaviors = value;
            }
        });
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
