export declare function is(elementName: string): ClassDecorator;
export declare function extend(elementName: string): ClassDecorator;
/**
 * Generates a class decorator that adds a behavior to a custom Polymer element.
 *
 * @param behaviorClassOrPrototype A behavior class (a constructor function) or a prototype object.
 */
export declare function behavior(behaviorClassOrPrototype: Function | Object): ClassDecorator;
/** Generates a class decorator that adds a list of behaviors to a custom Polymer element. */
export declare function behaviors(behaviorClassesOrPrototypes: Array<Function | Object>): ClassDecorator;
/** Appends a bunch of observers to the `observers` property of a Polymer element prototype. */
export declare function observers(observerList: string[]): ClassDecorator;
/** Adds a bunch of event listeners to the `listeners` property of a Polymer element prototype. */
export declare function listeners(listenerMap: any): ClassDecorator;
/** Adds a bunch of attributes to the `hostAttributes` property of a Polymer element prototype. */
export declare function hostAttributes(attributeMap: any): ClassDecorator;
export declare function property<T>(propertyDefinition: polymer.IProperty<T>): PropertyDecorator;
export declare function listener(eventName: string): MethodDecorator;
