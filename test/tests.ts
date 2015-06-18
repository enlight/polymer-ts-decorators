// Copyright (c) 2015 Vadim Macagon
// MIT License, see LICENSE file for full terms.

/// <reference path="../typings/test-tsd.d.ts" />

require('source-map-support').install();

import * as chai from 'chai';
import chaiAsPromised = require('chai-as-promised');
import * as pd from '../src/decorators';

chai.use(chaiAsPromised);

// alias
var expect = chai.expect;

@pd.is('is-decorator-test')
class IsDecoratorTestElement {
}

describe('@is', () => {
  it('adds "is" property to the class prototype', () => {
    expect(IsDecoratorTestElement.prototype).to.have.property('is', 'is-decorator-test');
  });
});

@pd.extendsElement('input')
class ExtendsDecoratorTestElement {
}

describe('@extendsElement', () => {
  it('adds "extends" property to the class prototype', () => {
    expect(ExtendsDecoratorTestElement.prototype).to.have.property('extends', 'input');
  });
});

class TestBehavior implements polymer.IBehavior {
}

class TestBehavior2 implements polymer.IBehavior {
}

@pd.behavior(TestBehavior)
class BehaviorTestElement {
}

@pd.behavior(TestBehavior2)
@pd.behavior(TestBehavior)
class BehaviorTestElement2 {
}

describe('@behavior', () => {
  it('adds "behaviors" property to the class prototype', () => {
    let elementPrototype: polymer.IBehavior = BehaviorTestElement.prototype;
    expect(elementPrototype).to.have.property('behaviors').that.has.lengthOf(1);
    expect(elementPrototype.behaviors[0]).equals(TestBehavior.prototype);
  });
  it('adds a behavior prototype to an existing "behaviors" property on the class prototype', () => {
    let elementPrototype: polymer.IBehavior = BehaviorTestElement2.prototype;
    expect(elementPrototype).to.have.property('behaviors').that.has.lengthOf(2);
    expect(elementPrototype.behaviors[0]).equals(TestBehavior.prototype);
    expect(elementPrototype.behaviors[1]).equals(TestBehavior2.prototype);
  });
});

@pd.behaviors([TestBehavior, TestBehavior2])
class BehaviorTestElement3 {
}

class TestBehavior3 implements polymer.IBehavior {
}

class TestBehavior4 implements polymer.IBehavior {
}

@pd.behaviors([TestBehavior3, TestBehavior4])
@pd.behaviors([TestBehavior, TestBehavior2])
class BehaviorTestElement4 {
}

describe('@behaviors', () => {
  it('adds "behaviors" property to the class prototype', () => {
    let elementPrototype: polymer.IBehavior = BehaviorTestElement3.prototype;
    expect(elementPrototype).to.have.property('behaviors').that.has.lengthOf(2);
    expect(elementPrototype.behaviors[0]).equals(TestBehavior.prototype);
    expect(elementPrototype.behaviors[1]).equals(TestBehavior2.prototype);
  });
  it('adds additional behavior prototypes to an existing "behaviors" property on the class prototype', () => {
    let elementPrototype: polymer.IBehavior = BehaviorTestElement4.prototype;
    expect(elementPrototype).to.have.property('behaviors').that.has.lengthOf(4);
    expect(elementPrototype.behaviors[0]).equals(TestBehavior.prototype);
    expect(elementPrototype.behaviors[1]).equals(TestBehavior2.prototype);
    expect(elementPrototype.behaviors[2]).equals(TestBehavior3.prototype);
    expect(elementPrototype.behaviors[3]).equals(TestBehavior4.prototype);
  });
});

@pd.observers(['observer', 'observer2'])
class ObserverTestElement {
}

@pd.observers(['observer3', 'observer4'])
@pd.observers(['observer', 'observer2'])
class ObserverTestElement2 {
}

describe('@observers', () => {
  it('adds "observers" property to the class prototype', () => {
    let elementPrototype: polymer.IBehavior = ObserverTestElement.prototype;
    expect(elementPrototype).to.have.property('observers').that.has.lengthOf(2);
    expect(elementPrototype.observers[0]).equals('observer');
    expect(elementPrototype.observers[1]).equals('observer2');
  });
  it('adds additional observers to an existing "observers" property on the class prototype', () => {
    let elementPrototype: polymer.IBehavior = ObserverTestElement2.prototype;
    expect(elementPrototype).to.have.property('observers').that.has.lengthOf(4);
    expect(elementPrototype.observers[0]).equals('observer');
    expect(elementPrototype.observers[1]).equals('observer2');
    expect(elementPrototype.observers[2]).equals('observer3');
    expect(elementPrototype.observers[3]).equals('observer4');
  });
});

class ListenerTestElement {
  @pd.listener('eventA')
  handleEventA() {
  }
}

class ListenerTestElement2 {
  @pd.listener('eventA')
  handleEventA() {
  }

  @pd.listener('eventB')
  handleEventB() {
  }
}

describe('@listener', () => {
  it('adds "listeners" property to the class prototype', () => {
    let elementPrototype: polymer.IBehavior = ListenerTestElement.prototype;
    expect(elementPrototype).to.have.property('listeners');
    expect(elementPrototype.listeners).to.have.property('eventA', 'handleEventA');
  });
  it('adds a listener to an existing "listeners" property on the class prototype', () => {
    let elementPrototype: polymer.IBehavior = ListenerTestElement2.prototype;
    expect(elementPrototype).to.have.property('listeners');
    expect(elementPrototype.listeners).to.have.property('eventA', 'handleEventA');
    expect(elementPrototype.listeners).to.have.property('eventB', 'handleEventB');
  });
});

@pd.listeners({ 'eventA': 'handleEventA', 'eventB': 'handleEventB' })
class ListenerTestElement3 {
}

@pd.listeners({ 'eventC': 'handleEventC', 'eventD': 'handleEventD' })
@pd.listeners({ 'eventA': 'handleEventA', 'eventB': 'handleEventB' })
class ListenerTestElement4 {
}

describe('@listeners', () => {
  it('adds "listeners" property to the class prototype', () => {
    let elementPrototype: polymer.IBehavior = ListenerTestElement3.prototype;
    expect(elementPrototype).to.have.property('listeners');
    expect(elementPrototype.listeners).to.have.property('eventA');
    expect(elementPrototype.listeners).to.have.property('eventB');
  });
  it('adds additional listeners to an existing "listeners" property on the class prototype', () => {
    let elementPrototype: polymer.IBehavior = ListenerTestElement4.prototype;
    expect(elementPrototype).to.have.property('listeners');
    expect(elementPrototype.listeners).to.have.property('eventA');
    expect(elementPrototype.listeners).to.have.property('eventB');
    expect(elementPrototype.listeners).to.have.property('eventC');
    expect(elementPrototype.listeners).to.have.property('eventD');
  });
});

@pd.hostAttributes({
  attributeA: 'hello',
  attributeB: true
})
class HostAttributeTestElement {
}

@pd.hostAttributes({
  attributeA: 'hello',
  attributeB: true
})
@pd.hostAttributes({
  attributeC: 1,
  attributeD: 2
})
class HostAttributeTestElement2 {
}

describe('@hostAttributes', () => {
  it('adds "hostAttributes" property to the class prototype', () => {
    let elementPrototype: polymer.IBehavior = HostAttributeTestElement.prototype;
    expect(elementPrototype).to.have.property('hostAttributes');
    expect(elementPrototype.hostAttributes).to.have.property('attributeA', 'hello');
    expect(elementPrototype.hostAttributes).to.have.property('attributeB', true);
  });
  it('adds additional attributes to an existing "hostAttributes" property on the class prototype', () => {
    let elementPrototype: polymer.IBehavior = HostAttributeTestElement2.prototype;
    expect(elementPrototype).to.have.property('hostAttributes');
    expect(elementPrototype.hostAttributes).to.have.property('attributeA', 'hello');
    expect(elementPrototype.hostAttributes).to.have.property('attributeB', true);
    expect(elementPrototype.hostAttributes).to.have.property('attributeC', 1);
    expect(elementPrototype.hostAttributes).to.have.property('attributeD', 2);
  });
});
