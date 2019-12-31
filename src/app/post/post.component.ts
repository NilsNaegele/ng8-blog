import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { identity } from 'rxjs';

// symbol type

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  articleId: any;
  isNotFound: boolean;

  posts = [
    {},
    {},
    {},
    {
      id: 3,
      imageHeaderUrl: 'url(assets/img/post3-bg.jpg)',
      heading: 'Javascript, Basis- Teil 1',
      subHeading: 'ES6, ES7, ES8 ...',
      metaPublishedDate: 'am 22 Dezember, 2019',
      sectionHeading: 'EcmaScript 6, 7, 8 ...',
      code: `
// constants
const PI = 3.141593;
console.log(PI > 3);

// block-scoped variables without hoisting
const a = [1, 2, 3];
const b = [3, 5, 7, 9, 11];
for (let i = 0; i < alert.length; i++) {
    let x = a[i];
  }
for (let i = 0; i < b.length; i++) {
    let y = b[i];
  }


let callbacks = [];
  for (let i = 0; i <= 3; i++) {
    callbacks[i] = () => i * 2;
  }

console.log(callbacks[0]() === 0); // true
console.log(callbacks[1]() === 2); // true
console.log(callbacks[2]() === 4); // true

// blocked scoped functions
{
  function foo () { return 1 }
  foo() === 1
  {
      function foo () { return 2 }
      foo() === 2
  }
  foo() === 1
}

// arrow functions expression bodies
const evens = [0, 2, 4, 6, 8];
const odds = evens.map(v => v + 1);
const pairs = evens.map(v => ({ even: v, odd: v + 1}));
const nums = evens.map((v, i) => v + i);
console.log(nums);

// arrow functions statement bodies
const threes = [];
evens.forEach(v => {
  if ( v % 3 === 0) {
    threes.push(v);
  }
});
console.log(threes);

// lexical this
this.evens.forEach(v => {
  if ( v % 3 === 0) {
    this.threes.push(v);
  }
});
console.log(this.threes);

// default parameter values
const f = (x, y = 7, z = 42) => x + y + z;
console.log(f(1) === 50);

// rest parameter
const g = (x, y, ...a) => (x + y) * a.length;

console.log(g(1, 2, 'hello', true, 7) === 9);

// spread operator
const params = ['hello', true];
const other = [1, 2, ...params]; // 1, 2, 'hello', true

const h = (x, y, ...a) => (x + y) * a.length;

console.log(h(1, 2, ...params) === 6); // true

const str = 'foo';
const chars = [...str]; // f o o

// template literals, string interpolation + custom with back ticks

// extended literals binary and octal
console.log(0b111110111 === 503);
console.log(0o767 === 503);

// unicode string and regexp literal
console.log('𠮷'.length === 2);
console.log('𠮷'.match(/./u)[0].length === 2);
console.log('𠮷' === '\uD842\uDFB7');
console.log('𠮷' === '\u{20BB7}');
console.log('𠮷'.codePointAt(0) === 0x20BB7);
for (const codepoint of '𠮷') {
  console.log(codepoint);
}

// regular expression sticky matching
const parser = (input, match) => {
  for (let pos = 0, lastPos = input.length; pos < lastPos; ) {
      for (let i = 0; i < match.length; i++) {
          match[i].pattern.lastIndex = pos;
          let found;
          if ((found = match[i].pattern.exec(input)) !== null) {
              match[i].action(found);
              pos = match[i].pattern.lastIndex;
              break;
          }
      }
  }
};

const report = (match) => {
  console.log(JSON.stringify(match));
};
parser('Foo 1 Bar 7 Baz 42', [
  { pattern: /Foo\s+(\d+)/y, action: (match) => report(match) },
  { pattern: /Bar\s+(\d+)/y, action: (match) => report(match) },
  { pattern: /Baz\s+(\d+)/y, action: (match) => report(match) },
  { pattern: /\s*/y,         action: (match) => {}            }
]);

// object properties property shorthand
const x = 0, y = 0;
const obj = { x, y };

// computed property names
const quux = () => 'foo';
const obj1 = {
  foo: 'bar',
  ['baz' + quux()]: 42
};

// method properties
const obj2 = {
  foo(a, b) {},
  bar(x, y) {},
  *quux(x, y) {}
};

// array matching
const list = [1, 2, 3];
let [a, , b] = list;
[b, a] = [a, b];

// object matching shorthand notation
const { op, lhs, rhs } = getASTNode();

// object matching, deep matching
const { op: d, lhs: { op: e }, rhs: f } = getASTNode();

// object/array matching, default values
const obj1 = { g: 1 };
const list1 = [1];
const {g, h = 2} = obj1;
const [x, y = 2] = list1;

// parameter context matching
const i = ([name, val]) => console.log(name, val);
const j = ({name: n, val: v}) => console.log(n, v);
const k = ({name, val}) => console.log(name, val);

i(['bar', 42]);
j({name: 'foo', val: 7});
k({name: 'bar', val: 42});

// fall soft destructuring
const list = [7, 42];
const [a = 1, b = 2, c = 3, d] = list;
console.log(a === 7);
console.log(b === 42);
console.log(c === 3);
console.log(d === undefined);

// modules export/import
//  lib/math.js
export function sum (x, y) { return x + y }
export const pi = 3.141593;

//  some-app.js
import * as math from 'lib/math';
console.log('2π = ' + math.sum(math.pi, math.pi));

//  other-app.js
import { sum, pi } from 'lib/math';
console.log('2π = ' + sum(pi, pi));


// modules default & wildcard
//  lib/mathplusplus.js
export * from 'lib/math';
export const e = 2.71828182846;
export default (x) => Math.exp(x);

//  some-app.js
import exp, { pi, e } from 'lib/mathplusplus';
console.log('e^{π} = ' + exp(pi));

// class definition
class Shape {
  private id: number;
  private x: number;
  private y: number;
  constructor(id, x, y) {
    this.id = id;
    this.move(x, y);
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}

// class inheritance
class Rectangle extends Shape {
  private width: number;
  private height: number;
  constructor(id, x, y, width, height) {
    super(id, x, y);
    this.width = width;
    this.height = height;
  }
}

class Circle extends Shape {
  private radius: number;
  constructor(id, x, y, radius) {
    super(id, x, y);
    this.radius = radius;
  }
}


// class inheritance from expressions
const aggregation = (baseClass, ...mixins) => {
  const base = class Combined extends baseClass {
      constructor(...args) {
          super(...args);
          mixins.forEach((mixin) => {
              mixin.prototype.initializer.call(this);
          })
      }
  };
  const copyProps = (target, source) => {
      Object.getOwnPropertyNames(source)
          .concat(Object.getOwnPropertySymbols(source))
          .forEach((prop) => {
          if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) {
              return;
          }
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop))
      });
  };
  mixins.forEach((mixin) => {
      copyProps(base.prototype, mixin.prototype);
      copyProps(base, mixin);
  });
  return base;
};

class Colored {
  private colour: string;
  initializer() {
    this.colour = 'white';
  }
  get color(){
    return this.colour;
  }
  set color(v){
    this.colour = v;
  }
}

class ZCoord {
  private zz: number;
  initializer() {
    this.zz = 0;
   }
  get z() {
    return this.zz;
   }
  set z(v) {
    this.zz = v;
   }
}

class Shape {
  private xx: number;
  private yy: number;
  constructor(x, y) {
    this.xx = x;
    this.yy = y;
  }
  get x() {
    return this.xx;
  }
  set x(v) {
    this.xx = v;
   }
  get y() {
    return this.yy;
   }
  set y(v) {
    this.yy = v;
   }
}

class Rectangle extends aggregation(Shape, Colored, ZCoord) {}

const rect = new Rectangle(2, 8);
rect.z = 1000;
rect.color = 'red';
console.log(rect.x, rect.y, rect.z, rect.color);

// static class members
class Rectangle extends Shape {
  static defaultRectangle() {
      return new Rectangle('default', 0, 0, 100, 100);
  }
}
class Circle extends Shape {
  static defaultCircle() {
      return new Circle('default', 0, 0, 100);
  }
}
const defRectangle = Rectangle.defaultRectangle();
const defCircle = Circle.defaultCircle();

// classes getter/setter
class Rectangle {
  private width: number;
  private height: number;
  constructor(width, height) {
      this.width  = width;
      this.height = height;
  }
  set Width(width)  {
    this.width = width;
    }
  get Width() {
    return this.width;
    }
  set Height(height) {
    this.height = height;
  }
  get Height() {
    return this.height;
    }
  get Area() {
    return this.width * this.height;
  }
}
const rec = new Rectangle(50, 20);
console.log(rec.Area === 1000);



// continue here http://es6-features.org/#SymbolType

`,
      blockQuote: `
Greife nach den Sternen. Das Weltall, die letzte Front. Dieses sind die Reisen
des Sternenschiffes Enterprise, eine Fünf Jahres Mission: neue Welten entdecken,
neues Leben und Zivilisationen zu erkunden, mutig da hin zu gehen wo keiner jeh
gewesen ist.
`,
    imageFooterUrl: 'assets/img/post3.jpg',
    footerQuote:  'Mann muss entdecken und das Weltall erforschen ist Entdeckung an seinem Höhepunkt.',

    },
    {
      id: 4,
      imageHeaderUrl: 'url(assets/img/post4-bg.jpg)',
      heading: 'Typescript, Basis- Teil 3',
      subHeading: 'Funktionen && Schleifen',
      metaPublishedDate: 'am 23 Dezember, 2019',
      sectionHeading: 'Funktionen && Schleifen',
      code: `
// named function
function add(x, y){
  return x + y;
    }
// anonymous function
let myAdd = (x, y) => x + y;

// higher order functions javascript
// map
const numbers = [1, 4, 9];
const doubles = numbers.map((num) => num * 2);
console.log(doubles); // [2, 8, 18]

// filter
const isAboveMyRange = (value) => value >= 50;
const filtered = [12, 150, 49, 77, 99, 13, 38, 101].filter(isAboveMyRange);
console.log(filtered); // [150, 77, 99, 101]

// reduce
const sum = [1, 2, 3, 4, 5].reduce((accumulator, currentValue) => accumulator + currentValue);
console.log(sum); // 15

let z = 100;
function addToZ(x, y){
  return x + y + z;
 }

// function types
function add(x: number, y: number): number{
  return x + y;
 }

const myAdd = (x: number, y: number): number => x + y;

// function type
const myAdd: (x: number, y: number) => number = (x: number, y: number): number => x + y;
console.log(myAdd(2, 3)); // 5

// destructuring within parameter list
const f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
console.log(f());  // 6

// myAdd has the full function type
let myAdd = (x: number, y: number): number => x + y;
// parameters x and y have type number
let myAdd1: (baseValue: number, increment: number) => number = (x, y) => x + y;

const operatingSystems = ['Debian', 'MacOS', 'Mint', 'Ubuntu', 'Windows', 'ZorinOS'];

console.log(operatingSystems.map(os => os.length));

console.log(operatingSystems.map(({length}) => length));

function Person() {
  let age = 0;
  setInterval(() => { console.log(age); age++; }, 1000);
}

// const p = new Person();

const adder = {
  base: 10,
  add: (a) => {
    const f = v => v + adder.base;
    return f(a);
  },
  addThruCall: (a) => {
    const f = v => v + adder.base;
    const b = {
      base: 2
    };
    return f.call(b, a);
  }
};

console.log(adder.add(10)); // logs 20
console.log(adder.addThruCall(20)); // logs 30

const argum = [10, 20, 30];
const arr = () => argum[0];

console.log(arr()); // logs 10

const foo = (n) => {
  const f = () => argum[1] + n;
  return f();
};

console.log(foo(2));

// rest parameters
const foo1 = (n) => {
  const f = (...args) => argum[2] + n;
  return f(10);
};

console.log(foo1(1)); // logs 31

const func = x => x * x;

console.log(func(10)); // logs 100

let callback;
callback = callback || (() => {});

let empty = () => {};

(() => 'foobar')(); // iife

const simple = a => a > 15 ? 15 : a;
simple(17); // logs 15
simple(9); // logs 9

let max = (a, b) => a > b ? a : b;

const arr1 = [1, 4, 5, 8, 11];
const sum = arr1.reduce((a, b) => a + b); // 29
const even = arr1.filter(v => v % 2 === 0); // [4, 8]
const double = arr1.map(v => v * 2); // [2, 8, 10. 16, 22]

// more concise promise chains
promise.then(a => {
  // ...
}).then(b => {
  // ...
});

setTimeout(() => {
  console.log('I happen sooner');
  setTimeout(() => {
    // deeper code
    console.log('I happen later');
  }, 1);
}, 1);

// optional and default parameters
const buildName = (firstName: string, lastName: string) => firstName + ' ' + lastName;
console.log(buildName('Nils-Holger', 'Nägele'));

const buildName1 = (firstName: string, lastName?: string) => lastName ? firstName + ' ' + lastName : firstName;
console.log(buildName1('Nils-Holger'));

const buildName2 = (firstName: string, lastName = 'Nägele') => firstName + ' ' + lastName;
console.log(buildName2('Nils-Holger'));

// rest parameters
const buildName3 = (firstName: string, ...restOfName: string[]) => firstName + ' ' + restOfName.join(' ');
console.log(buildName3('Maria', 'Jenny', 'Silvia', 'Anna', 'Pipa'));

const buildNameFun: (fname: string, ...rest: string[]) => string = buildName3;

// arrow functions and this
const deck = {
  suits: ['hearts', 'spades', 'clubs', 'diiamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      const pickedCard = Math.floor(Math.random() * 52);
      const pickedSuit = Math.floor(pickedCard / 13);
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  }
};

const cardPicker = deck.createCardPicker();
const pickedCard1 = cardPicker();

alert('card ' + pickedCard1.card + ' of ' + pickedCard1.suit);

// interfaces
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}


const deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diiamonds'],
  cards: Array(52),
  createCardPicker: function(this: Deck) {
    return () => {
      const pickedCard = Math.floor(Math.random() * 52);
      const pickedSuit = Math.floor(pickedCard / 13);
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  }
};

const cardPicker = deck.createCardPicker();
const pickedCard1 = cardPicker();

alert('card ' + pickedCard1.card + ' of ' + pickedCard1.suit);

// this parameters in callbacks

interface UIElement {
  addClickListener(onClick: (this: void, e: Event) => void): void;
}

class Handler {
  info: string;
  onClickedGood = (e: Event) => this.info = e.message;
}

let h = new Handler();
let uiElement: UIElement;
uiElement.addClickListener(h.onClickedGood);

// overloads
const suits = ['hearts', 'spades', 'clubs', 'diamonds'];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    if (typeof x === 'object') {
        const pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    } else if (typeof x === 'number') {
        const pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

const myDeck = [{ suit: 'diamonds', card: 2 }, { suit: 'spades', card: 10 }, { suit: 'hearts', card: 4 }];
const pickedCard1 = myDeck[pickCard(myDeck)];
alert('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);

const pickedCard2 = pickCard(15);
alert('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit);

// javascript foreeach loop
const array1 = ['a', 'b', 'c', 'd'];

array1.forEach(element => console.log(element));

array1.forEach((value, index, arr) => console.log(value, index, arr));

const array2 = [1, 79, 50, 81, 29, 45];

console.log(array2.every(currentValue => currentValue < 85)); // true

console.log(array2.some(element => element % 2 === 0)); // true

console.log(array2.find(element => element > 80)); // 81

console.log(array2.findIndex(element => element === 50)); // 2


for (let i = 0; i < 5; i++) {
  console.log(i);
}

let i = 0;
do {
  i += 1;
  console.log(i);
} while (i < 10);

let n = 0;
let x = 0;
while (n < 3) {
  n++;
  x += n;
}
console.log(x); // logs 6

// infinite loop
// while (true) {
//   console.log('hello world');
// }
const a = [1, 2, 3, 4, 5];
const theValue = 3;
for (let i = 0; i < a.length; i++) {
  console.log(a[i]);
  if (a[i] === theValue) {
    break;
  }
}

// for in
const car = {
  make: 'BMW',
  model: 'X4'
};

for (let i in car) {
  console.log(i, car[i]);
}

// for of
const arr = ['BMW', 'Porsche', 'Mercedes', 'Audi'];
arr['foo'] = 'Volkswagen';

for (let i in arr) {
  console.log(i); // logs 0 1 2 3 foo
}

for (let i of arr) {
  console.log(i); // logs BMW Porsche Mercedes Audi
}

// higher order functions
const arr1 = [2, 4, 8];
const arr2 = arr1.map(item => item * 2);
console.log(arr2); // 4, 18, 16
const birthYears = [1971, 1978, 1981, 1990];
const ages = birthYears.map(year => 2019 - year);
console.log(ages); // 48, 41, 38, 29

const persons = [
  { name: 'Peter', age: 16 },
  { name: 'Mark', age: 18 },
  { name: 'Bertram', age: 17 },
  { name: 'Tim', age: 25 }
];

const fullAge = persons.filter(person => person.age >= 18); // Mark, Tim
console.log(fullAge);

const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue);
console.log(sum); // 25

const strArray = ['JavaScript', 'HTML', 'CSS', 'Java', 'C'];
const mapForEach = (arr, fn) => {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray.push(fn(arr[i]));
  }
  return newArray;
};

const lenArray = mapForEach(strArray, (item) => item.length);
console.log(lenArray); // 10, 4, 3, 4, 1

      `,
      blockQuote: `
      Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
      sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
      und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
      und eine die wir vorhaben zu gewinnen.
      `,
      imageFooterUrl: 'assets/img/post4.jpg',
      footerQuote:  'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.',
    },
    {
    id: 5,
    imageHeaderUrl: 'url(assets/img/post5-bg.jpg)',
    heading: 'Typescript, Basis- Teil 4',
    subHeading: ' Generics, Enums, Fortgeschrittene Typen',
    metaPublishedDate: 'am 24 Dezember, 2019',
    sectionHeading: ' Generics, Enums, Fortgeschrittene Typen',
    code: `
// generics
// before
const identity = (arg: number): number => arg;
const identity1 = (arg: any): any => arg;

// after
function identity2<T>(arg: T): T {
  return arg;
}
const identity3 = <U>(arg: U): U => arg;

const output = identity3<string>('myString');
const output1 = identity3('testString');
console.log(output1);

const loggingIdentity = <V>(arg: V[]): V[] => {
  console.log(arg.length);
  return arg;
};

const loggigIdentity1 = <W>(arg: Array<W>): Array<W> => {
  console.log(arg.length);
  return arg;
};

const identity4 = <Y>(arg: Y) => arg;

// generic types
const myIdentity: {<X>(arg: X): X} = identity4;

// first generic interface
interface GenericIdentityFn {
  <T>(arg: T): T;
}

type GenericIdentityFn1 = <T>(arg: T) => T;

function identity<T>(arg: T): T {
  return arg;
}

const myIdentity: GenericIdentityFn1 = identity;

// generic paramter of whole interface now
interface GenericIdentityFn<T> {
  (arg: T): T;
}

type GenericIdentityFn1 = <T>(arg: T) => T;

function identity<T>(arg: T): T {
  return arg;
}

const myIdentity: GenericIdentityFn<number> = identity;

// generic classes
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

const myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;

const stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = '';
stringNumeric.add = (x, y) => x + y;

console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'));

// generic constraints
const loggingIdentity = <T>(arg: T) => {
  console.log(arg.length); // error: Property 'length' does not exist on type 'T'.
  return arg;
};

interface Lengthwise {
  length: number;
}

const loggingIdentity = <T extends Lengthwise>(arg: T): T => {
    console.log(arg.length);
    return arg;
};

console.log(loggingIdentity(3)); // error: Argument of type '3' is not assignable to parameter of type 'Lengthwise'.
console.log(loggingIdentity({length: 10, value: 3}));

// type parameters in generic constraints
const getProperty = <T, K extends keyof T>(obj: T, key: K) => obj[key];

const x = { a: 1, b: 2, c: 3, d: 4 };

console.log(getProperty(x, 'c'));
console.log(getProperty(x, 'z')); // error: Argument of type '"z"'
// is not assignable to parameter of type '"c" | "a" | "b" | "d"'

// class types in generics
const create = <T>(c: new() => T): T => new c();


class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

const createInstance = <A extends Animal>(c: new() => A): A => new c();

console.log(createInstance(Lion).keeper.nametag); // type checks
console.log(createInstance(Bee).keeper.hasMask); // type checks

// enums
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// without initializers
enum DirectionOne {
  Up,
  Down,
  Left,
  Right,
}

enum Response {
  No = 0,
  Yes = 1,
}

const respond = (recipient: string, message: Response): void => void 0;
console.log('Princess Anna', Response.Yes);

// string enums
enum DirectionTwo {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// heterogeneous enums
enum BooleanLikeHeterogeneeousEnum {
  No = 0,
  Yes = 'YES'
}

// computed and constant members
// E.X is a constant
enum E { X }

enum E1 { X, Y, Z }
enum E2 {
  A = 1,
  B,
  C
}

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member length
  G = '123'.length
}

enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

const c: Circle = {
  kind: ShapeKind.Square, // error: Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.ts(2322)
  radius: 100
};

enum E {
  Foo,
  Bar,
}


const f = (x: E) => {
  if ( x !== E.Foo || x !== E.Bar) {
    // error: This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.ts(2367)
  }
};

// enums at runtime
enum EZ {
  X, Y, Z
}

const f1 = (obj: { X: number}) => obj.X;

console.log(f1(EZ));

// enums at compile time
enum LogLevel {
  ERROR, WARN, INFO, DEBUG
}

// equivalent to: type LogLevelStrings = "ERROR" | "WARN" | "INFO" | "DEBUG"
type LogLevelStrings = keyof typeof LogLevel;

const printImportant = (key: LogLevelStrings, message: string): void => {
            const num = LogLevel[key];
            if (num <= LogLevel.WARN) {
              console.log('Log level key is: ', key);
              console.log('Log level value is: ', num);
              console.log('Log level message is: ', message);
            }
};

printImportant('ERROR', 'this is a message');

// reverse mappings
enum Enum {
    A
}

let a = Enum.A;
let nameOfA = Enum[a]; // A

// typescript compiles this to
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"

// const enums
const enum Enum {
  A = 1,
  B = A * 2
}

const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

const directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// this is generated code
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// ambient enums
declare enum Enum1 {
  A = 1,
  B,
  C = 2,
}

// continue here: https://www.typescriptlang.org/docs/handbook/advanced-types.html


    `,
    blockQuote: `
    Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
    sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
    und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
    und eine die wir vorhaben zu gewinnen.
    `,
    imageFooterUrl: 'assets/img/post5.jpg',
    footerQuote:  'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.',
    },
    {
  id: 6,
  imageHeaderUrl: 'url(assets/img/post6-bg.jpg)',
  heading: 'Angular, Superheroisches Javascript Framework',
  subHeading: 'Angular 8/9, hier die Welt zu retten!',
  metaPublishedDate: 'am 24 Dezember, 2019',
  sectionHeading: 'Template Syntax, Lifecycle Hooks, Component Interactions, Component Styles, Dynamic Components',
  code: `
// displaying data - interpolation
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
      <h1>{{ title }}</h1>
      <h2>My favorite technology is: {{ myTechnology }}</h2>
  \`
})
export class AppComponent  {
    title = 'Tour of Technologies';
    myTechnology = 'JavaScript';
}

// *ngFor showing an array property
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
      <h1>{{ title }}</h1>
      <h2>My favorite technology is: {{ myTechnology }}</h2>
      <p>Technologies:</p>
      <ul>
        <li *ngFor="let technology of technologies">
                  {{ technology }}
        </li>
      </ul>
  \`
})
export class AppComponent  {
    title = 'Tour of Technologies';
    technologies = ['JavaScript', 'TypeScript', 'HTML', 'CSS'];
    myTechnology = this.technologies[0];
}

// create technology class
import { Component } from '@angular/core';

export class Technology {
  constructor(public id: number, public name: string) { }
}

@Component({
  selector: 'app-root',
  template: \`
      <h1>{{ title }}</h1>
      <h2>My favorite technology is: {{ myTechnology.name }}</h2>
      <p>Technologies:</p>
      <ul>
        <li *ngFor="let technology of technologies">
                  {{ technology.name }}
        </li>
      </ul>
  \`
})
export class AppComponent  {
    title = 'Tour of Technologies';
    technologies = [
      new Technology(1, 'JavaScript'),
      new Technology(2, 'TypeScript'),
      new Technology(3, 'HTML'),
      new Technology(4, 'CSS')
      ];
    myTechnology = this.technologies[0];
}

// *ngIf conditional display
<p *ngIf="technologies.length > 3">There are many technologies!</p>

// template syntax
// interpolation
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
      <h1>{{technique}}</h1>
      <h3>{{currentTechnology}}</h3>
      <div><img src="{{imageUrl}}"></div>
      <p>The sum of 1 + 1 is {{1 + 1}}</p>
      <p>The sum of 1 + 1 is not {{1 + 1 + getVal()}}</p>
  \`
})
export class AppComponent  {
    technique = 'Interpolation';
    currentTechnology = 'Angular 8.2';
    imageUrl = '../assets/image1.jpg';
    getVal() {
      return 4;
    }
}

// template expressions
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
      <h1>{{technique}}</h1>
      <h4>{{recommended}}</h4>
      <img [src]="imageUrl2">
      <ul>
        <li *ngFor="let hero of heroes">
        {{ hero }}
        </li>
      </ul>
      <label (keyup)="0">Type something:
      <input #userInput>{{userInput.value}}
      </label>
      <button (click)="deleteHero()">Delete hero</button>
      <button (click)="onSave($event)">Save</button>
      <button *ngFor="let hero of heroes" (click)="delete(hero)">
      {{hero}}
      </button>
      <form #heroForm (ngSubmit)="onSubmit(heroForm)">...</form>
  \`
})
export class AppComponent  {
    technique = 'Expression context';
    recommended = 'Angular 8.2';
    imageUrl2 = '../assets/image2.jpg';
    heroes = ['Nils-Holger', 'Andre', 'Dominique', 'Martin'];
    deleteHero() {
     alert('delete the hero.');
    }

    onSave(event?: MouseEvent) {
      const evtMsg = event ? ' Event target is ' + (event.target as HTMLElement).textContent : '';
    alert('Saved' + evtMsg);
    }
    onSubmit(data) {
      // referenced but not used
    }
    delete(hero: string) {
      alert('Delete ' + hero);
    }
}

// binding syntax
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
  <div>
  <h1>Binding syntax</h1>
  <hr>

  <div>
    <h2>Button disabled state bound to isUnachanged property</h2>
    <button [disabled]="isUnchanged">
        Save
    </button>
  </div>
  <hr>

  <div (keyup)="0">
    <h2>HTML attributes and DOM properties</h2>
    <p>1. Use the inspector to see the HTML attribute and DOM property values.
      Click the buttons to log values to the console.
    </p>
    <label>HTML Attribute Initializes to Sarah
    <input type="text" value="Sarah" #bindingInput>
  </label>

  <div>
    <button (click)="getHTMLAttributeValue()">
      Get HTML attribut value
    </button>
     Won't change
  </div>

  <div>
    <button (click)="getDOMPropertyValue()">
      Get DOM property value
    </button>
     Changeable. Angular works with these.
  </div>

  <p>2. Change the name in the input and click the buttons again.</p>
</div>

<hr>

<div>
  <h3>Disabled property vs. attributes</h3>
  <p>
    Use the inspector to see the Test Button work and its disabled property toggle.
  </p>
<div>
<button id="testButton" (click)="working()">Test Button</button>
</div>
<div>
  <button (click)="toggleDisabled()">
      Toggle disabled property for Test Button
  </button>
</div>
</div>
</div>
  \`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('bindingInput', { static: false }) bindingInput: ElementRef;

  isUnchanged = true;

  getHTMLAttributeValue(): any {
    console.warn('HTML attribute value: ' + this.bindingInput.nativeElement.getAttribute('value'));
  }

  getDOMPropertyValue(): any {
    console.warn('DOM property value: ' + this.bindingInput.nativeElement.value);
  }

  working(): any {
    console.warn('Test Button works');
  }

  toggleDisabled(): any {
    const testButton = document.getElementById('testButton') as HTMLInputElement;
    testButton.disabled = !testButton.disabled;
    console.warn(testButton.disabled);
  }
}

// property binding
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
  <img [src]="imageUrl" style="width:200px;">
  <table>
  <tr><td [colSpan]="2">Span 2 columns</td></tr>
  </table>
  <button [disabled]="isUnchanged">Disabled Button</button>
  <p [ngClass]="classes">[ngClass] binding to the classes property making this blue</p>
  \`,
  styles: [
    '.special {color: blue}'
  ]
})
export class AppComponent {
  imageUrl = '../assets/images/image1.jpg';
  isUnchanged = true;
  classes = 'special';
}

// interpolation revisited
<p>My current hero name is {{ currentHero.name }}</p>
<h3>
    {{ title }}
    <img src="{{ heroImageUrl }}" style="height: 100px">
</h3>
<p>The sum of 1 + 1 is {{ 1 + 1 }}</p>
<p>The sum of 1 + 1 is not {{ 1 + 1 + getNumber() }}</p>

// template expressions expression context revisited
{{ title }}
<span [hidden]="isUnchanged">changed</span>
<div *ngFor="let hero of heroes">{{ hero.name }}</div>
<input #heroInput>{{ heroInput.value }}

// template statements statement context revisited
<button (click)="deleteHero()">Delete Hero</button>
<button (click)="onSaveHer($event)">Save Her</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">
{{ hero.name }}
</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>

// binding syntax overview revisited
// one way from component to view
{{ expression }}
[target]="expression"
bind-target="expression"

// one way from view to component
(target)="statement"
on-target="statement"

// two way
[(target)]="expression"
bindon-target="expression"

// new mental model
<div [class.special]="isSpecial">New Mental Model</div>
<app-hero-detail></app-hero-detail>
<button [disabled]="isUnchanged">Save Her</button>
<img [src]="heroImageUrl">
<app-hero-detail [hero]="currentHero"></app-hero-detail>
<div [ngClass]="{ 'special': isSpecial }"></div>
<button (click)="onSave()">Save</button>
<app-hero-detail (deleteRequest)="deleteHero()"></app-hero-detail>
<div (myClick)="clicked=$event" clickable>Click Me</div>
{{ clicked }}
<div>
    Hero Name:
    <input [(ngModel)]="name">
</div>
<button [attr.aria-label]="help">Help</button>
<div [class.red]="isRed">Favorite</div>
<button [style.color]="isSpecial ? 'red' : 'blue'">Special</button>

// binding targets revisited
// property
<img [src]="heroImageUrl">
<app-hero-detail [hero]="currentHero"></app-hero-detail>
<div [ngClass]="{ 'special': isSpecial }"></div>

// event
<button (click)="onSave()">Save</button>
<app-hero-detail (deleteRequest)="deleteHero()"></app-hero-detail>
<div (myClick)="clicked="$event" clickable>Click Me</div>

// two way
<input [(ngModel)]="name">

// attribute
<button [attr.aria-label]="help">Help</button>

// class
<div [class.special]="isSpecial">Special</div>

// style
<button [style.color]="isSpecial ? 'red' : 'green'">

// property binding revisited
<img [src]="heroImageUrl">
<img bind-src="heroImageUrl"> // canonical form
<button [disabled]="isUnchanged">Cancel is disabled</button>
<div [ngClass]="classes">[ngClass] binding to the classes property</div>
<app-hero-detail [hero]="currentHero"></app-hero-detail>
<app-hero-detail prefix="You are my" [hero]="currentHero"></app-hero-detail>

<p><img src="{{ heroImageUrl }}"> is the <i>interpolated</i> image.</p>
<p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{{ title }}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="title"></span>" is the <i>property bound</i> title.</p>

evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';

<p><span>"{{ evilTitle }}" is the <i>interpolated</i> evil title.</span></p>
<p><span [innerHTML]="evilTitle"></span> is the <i>property bound</i> evil title.</p>

// attribute binding
<table border=1>
<tr><td [attr.colspan]="1 + 1">One-Two</td></tr>
<tr><td>Three</td><td>Four</td></tr>
</table>
<button [attr.aria-label]="actionName">{{ actionName }} with Aria</button>

// class binding
<div class="nice curly special" [class]="niceCurly">Nice curly</div>
<div [class.special]="isSpecial">This class binding is special</div>
<div class="special" [class.special]="!isSpecial">This one is not so special</div>

// style binding
<button [style.color]="isSpecial ? 'red' : 'green'">Red</button>
<button [style.background-color]="canSave ? 'yellow' : 'blue'">Save Her</button>
<button [style.font-size.em]="isSpecial ? 3 : 1">Big</button>
<button [style.font-size.%]="!isSpecial ? 150 : 50">Small</button>

// event binding
<button (click)="onSave()">Save Her</button>
<button on-click="onSave()">Save Her</button>
<div (myClick)="clickMessage=$event" clickable>Click with myClick</div>
{{ clickMessage }}

<input [value]="currentHero.name" (input)="currentHero.name=$event.target.value">

// custom events with eventemitter
template: \`
<div>
  <img src="{{ heroImageUrl }}">
  <span [style.text-decoration]="lineThrough">
      {{ prefix }} {{ hero?.name }}
  </span>
  <button (click)="delete()">Delete</button>
</div>
\`
deleteRequest = new EventEmitter<Hero>();
delete() {
this.deleteRequest.emit(this.hero);
}

<app-hero-detail (deleteRequest)="deleteHero($event)" [hero]="currentHero">
</app-hero-detail>


// two way binding
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sizer',
  template: \`
      <div>
          <button (click)="decrease()" title="smaller">-</button>
          <button (click)="increase()" title="bigger">+</button>
          <label [style.font-size.px]="size">FontSize: {{ size }}px</label>
      </div>
  \`
})
export class SizerComponent {
  @Input() size: number | string;
  @Output() sizeChange = new EventEmitter<number>();

  decrease() {
    this.resize(-1);
  }

  increase() {
    this.resize(+1);
  }


  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }

}

<app-sizer [(size)]="fontSizePx"></app-sizer>
<div [style.font-size.px]="fontSizePx">Resizable Text</div>

// desugared
<app-sizer [size]="fontSizePx" (sizeChange)="fontSizePx=$event"></app-sizer>

// ngClass
<div [class.special]="isSpecial">This class binding is special.</div>

<div [ngClass]="currentClasses">
This div is initially saveable, unchanged, and special.
</div>

currentClasses: {};
setCurrentClasses() {
  this.currentClasses = {
    'saveable': this.canSave,
    'modified': !this.isUnchanged,
    'special': this.isSpecial
  };
}

// ngStyle
<div [style.font-size]="isSpecial ? 'x-large' : 'smaller'">
This div is x-large or smaller.
</div>
<div [ngStyle]="currentStyles">
This div is initially italic, normal weight, and extra large (24px).
</div>
currentStyles: {};
setCurrentStyles() {
this.currentStyles = {
  'font-style': this.canSave ? 'italic' : 'normal',
  'font-weight': !this.isUnchanged ? 'bold' : 'normal',
  'font-size': this.isSpecial ? '24px' : '12px'
};
}

// ngModel
import { FormsModule } from '@angular/forms';

<input [(ngModel)]="currentHero.name">

<input [value]="currentHero.name" (input)="currentHero.name=$event.target.value">

<input [ngModel]="currentHero.name" (ngModelChange)="currentHero.name=$event">

<input [ngModel]="currentHero.name" (ngModelChange)="setUppercaseName($event)">

// ngIf
<app-hero-detail *ngIf="isActive"></app-hero-detail>

<div [class.hidden]="!isSpecial">Show with class</div>
<div [class.hidden]="isSpecial">Hide with class</div>
<app-hero-detail [class.hidden]="isSpecial"></app-hero-detail>

<div [style.display]="isSpecial ? 'block' : 'none'">Show with style</div>
<div [style.display]="isSpecial ? 'none' : 'block'">Hide with style</div>

<div *ngIf="currentHero">Hello, {{ currentHero.name }}</div>
<div *ngIf="nullHero">Hello, {{ nullHero.name }}</div>

// ngForOf
<div *ngFor="let hero of heroes">{{ hero.name }}</div>
<app-hero-detail *ngFor="let hero of heroes" [hero]="hero"></app-hero-detail>

<div *ngFor="let hero of heroes; let i = index;">{{ i + 1 }} - {{ hero.name }}</div>

<div *ngFor="let hero of heroes; trackBy: trackByHeroes">
    ({{ hero.id }}) {{ hero.name }}
</div>

trackByHeroes(index: number, hero: Hero) {
  return hero.id;
}

// ngSwitch
<div [ngSwitch]="currentHero.emotion">
<app-happy-hero *ngSwitchCase="'happy'" [hero]="currentHero">
</app-happy-hero>
<app-sad-hero *ngSwitchCase="'sad'" [hero]="currentHero">
</app-sad-hero>
<app-confused-hero *ngSwitchCase="'confused'" [hero]="currentHero">
</app-confused-hero>
<div *ngSwitchCase="'confused'">
Are you as confused as {{ currentHero.name }}
</div>
<app-unknown-hero *ngSwitchDefault [hero]="currentHero">
</app-unknown-hero>
</div>

// template reference variable (#var)
<input #phone placeholder="phone number">
<button (click)="callPhone(phone.value)">Call</button>

<form (ngSubmit)="onSubmit(heroForm)" #heroForm="ngForm">
    <div class="form-group">
        <label for="name">Name
            <input class="form-control" name="name" required [(ngModel)]="hero.name">
        </label>
    </div>
    <button type="submit" [disabled]="!heroForm.form.valid">Submit</button>
</form>
<div [hidden]="!heroForm.form.valid">
    {{ submitMessage }}
</div>

<input ref-fax placeholder="fax number">
<button (click)="callFax(fax.value)">Fax</button>

// input and output properties
<img [src]="iconUrl">
<button (click)="onSave()">Save</button>

<app-hero-detail [hero]="currentHero" (deleteRequest)="deleteHero($event)">
</app-hero-detail>

@Input() hero: Hero;
@Output() deleteRequest = new EventEmitter<Hero>();

@Component({
  inputs: ['hero'],
  outputs: ['deleteRequest']
})

<div (myClick)="clickMessage=$event" clickable>click with myClick</div>
@Output('myClick') clicks = new EventEmitter<string>();

@Directive({
  outputs: ['clicks:myClick']
})

// template expression operators
<div>Title through uppercase pipe: {{ title | uppercase }}</div>
<div>
      Title through a pipe chain:
      {{ title | uppercase | lowercase }}
</div>
<div>
      Birthdate: {{ currentHero?.birthDate | date:'longDate' }}
</div>
<div> {{ currentHero | json }}</div>

<div>The current hero's name is {{ currentHero?.name }}</div>

<div *ngIf="nullHero">The null hero's name is {{ nullHero.name }}</div>
<div>The null hero's name is {{ nullHero && nullHero.name }}</div>
<div>The null hero's name is {{ nullHero?.name }}</div>

<div *ngIf="hero">
      The hero's name is {{ hero!.name }}
</div>

<div>
      The hero's marker is {{ $any(hero).marker }}
</div>

<div>
      Undeclared members is {{ $any(this).member }}
</div>

// lifecycle hooks parent
import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-peek-a-boo-parent',
  template: \`
          <div class="parent">
              <h2>Peek-A-Boo</h2>
              <button (click)="toggleChild()">
                {{ hasChild ? 'Destroy' : 'Create' }} PeekABooComponent
              </button>
              <button (click)="updateHero()" [hidden]="!hasChild">Update Hero</button>
              <app-peek-a-boo *ngIf="hasChild" [name]="heroName">
              </app-peek-a-boo>
              <h4>-- Lifecycle Hook Log --</h4>
              <div *ngFor="let message of hookLog">
              {{ message }}
              </div>
          </div>
  \`,
  styles: ['.parent { background: moccasin; }'],
  providers: [LoggerService]
})
export class PeekABooParentComponent {
  hasChild = false;
  hookLog: string[];
  heroName = 'Flash';

  constructor(private logger: LoggerService) {
    this.hookLog = logger.logs;
   }

   toggleChild() {
     this.hasChild = !this.hasChild;
     if (this.hasChild) {
       this.heroName = 'Flash';
       this.logger.clear();
     }
     this.updateLog();
   }

   updateHero() {
     this.heroName += '!';
     this.updateLog();
   }

   updateLog() {
    this.logger.tick();
    this.hookLog = this.logger.logs;
   }

}

// lifecycle hook child

import { Component, Input } from '@angular/core';
  import { AfterContentChecked,
           AfterContentInit,
           AfterViewChecked,
           AfterViewInit,
           DoCheck,
           OnChanges,
           OnDestroy,
           OnInit,
           SimpleChanges } from '@angular/core';

  import { LoggerService } from '../logger.service';

  let nextId = 1;

  export class PeekABoo implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logIt('OnInit');
  }

  logIt(message: string) {
    this.logger.log(\`#\${nextId++} \${message}\`);
  }

}

  @Component({
  selector: 'app-peek-a-boo',
  template: '<p>Now you see my hero, {{ name }}</p>',
  styles: ['p {background: LightYellow; padding: 8px;}']
    })
  export class PeekABooComponent extends PeekABoo
                               implements OnChanges, OnInit, DoCheck, AfterContentInit,
                                          AfterContentChecked, AfterViewInit, AfterViewChecked,
                                          OnDestroy {
  @Input() name: string;

  private verb = 'initialized';

  constructor(logger: LoggerService) {
    super(logger);
    const is = this.name ? 'is' : 'is not';
    this.logIt(\`name \${is} known at construction\`);
  }

  // only called for if there is an @input variable set by parent
  ngOnChanges(changes: SimpleChanges) {
      const changesMessages: string[] = [];
      for (const propertyName in changes) {
        if (propertyName === 'name') {
          const name = changes['name'].currentValue;
          changesMessages.push(\`name \${this.verb} to "\${name}"\`);
        } else {
          changesMessages.push(propertyName + ' ' + this.verb);
        }
      }
      this.logIt(\`OnChanges: \${changesMessages.join('; ')}\`);
      this.verb = 'changed';
  }

  // called in every change detection cycle anywhere on the page
  ngDoCheck() {
    this.logIt('DoCheck');
  }

  ngAfterContentInit() {
    this.logIt('AfterContentInit');
  }

  // called in every change detection cycle anywhere on the page
  ngAfterContentChecked() {
    this.logIt('AfterContentChecked');
  }

  ngAfterViewInit() {
    this.logIt('AfterViewInit');
  }

  // called in every change detection cycle anywhere on the page
  ngAfterViewChecked() {
    this.logIt('AfterViewChecked');
  }

  ngOnDestroy() {
    this.logIt('OnDestroy');
  }

}

// logger service
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  export class LoggerService {
    logs: string[] = [];
    previousMessage = '';
    previousMessageCount = 1;

    log(message: string) {
      if (message === this.previousMessage) {
        this.logs[this.logs.length - 1] = message + \` (\${this.previousMessageCount += 1}x)\`;
      } else {
        this.previousMessage = message;
        this.previousMessageCount = 1;
        this.logs.push(message);
      }
    }

    clear() {
      this.logs = [];
    }

    tick() {
      this.tick_then(() => { });
    }

    tick_then(fn: () => any) { setTimeout(fn, 0); }
  }

 // spy directive
 import { Directive, OnInit, OnDestroy } from '@angular/core';

 import { LoggerService } from '../logger.service';

 let nextId = 1;

 @Directive({
 selector: '[appISpy]'
 })
 export class SpyDirective implements OnInit, OnDestroy {

 private logIt(message: string) {
   this.logger.log(\`Spy #\${nextId++} \${message}\`);
 }

 constructor(private logger: LoggerService) { }

 ngOnInit() {
   this.logIt('onInit');
 }

 ngOnDestroy() {
   this.logIt('onDestroy');
 }

}

// spy component
import { Component } from '@angular/core';

  import { LoggerService } from '../logger.service';

  @Component({
    selector: 'app-spy',
    template: \`
              <div class="parent">
                    <h2>Spy Directive</h2>

                    <input [(ngModel)]="newName" (keyup.enter)="addHero()">
                    <button (click)="addHero()">Add Hero</button>
                    <button (click)="reset()">Reset Heroes</button>

                    <p></p>
                    <div *ngFor="let hero of heroes" appISpy class="heroes">
                        {{ hero }}
                        <span (click)="removeHero(hero)">x</span>
                    </div>
                    <h4>-- Spy Lifecycle Hook Log --</h4>
                    <div *ngFor="let message of logger.logs">
                        {{ message }}
                    </div>
              </div>
    \`,
    styles: [
             '.parent { background: khaki; }',
             '.heroes { background: LightYellow; padding: 0 8px; }'
  ],
  })
  export class SpyComponent {
    newName = 'Mickey';
    heroes: string[] = ['Wonderwoman', 'Superman'];

    constructor(public logger: LoggerService) { }

    addHero() {
      if (this.newName.trim()) {
        this.heroes.push(this.newName.trim());
        this.newName = '';
        this.logger.tick();
      }
    }

    removeHero(hero: string) {
      this.heroes.splice(this.heroes.indexOf(hero), 1);
      this.logger.tick();
    }

    reset() {
      this.logger.log('-- reset --');
      this.heroes = [];
      this.logger.tick();
    }
  }

// onchanges component
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

  class Hero {
    constructor(public name: string) { }
  }


  @Component({
    selector: 'app-on-changes',
    template: \`
      <div class="hero">
          <p>{{ hero.name }} can {{ power }}</p>

          <h4>-- Change Log --</h4>
          <div *ngFor="let change of changeLog">
                  {{ change }}
          </div>
      </div>
    \`,
    styles: [
            '.hero { background: LightYellow; padding: 8px; margin-top: 8px;',
            'p { background: Yellow; padding: 8px; margin-top: 8px; }'
  ]
  })
  export class OnChangesComponent implements OnChanges {
    @Input() hero: Hero;
    @Input() power: string;

    changeLog: string[] = [];

    ngOnChanges(changes: SimpleChanges) {
      for (const propertyName of Object.keys(changes)) {
        const change = changes[propertyName];
        const current = JSON.stringify(change.currentValue);
        const previous = JSON.stringify(change.previousValue);
        this.changeLog.push(\`\${propertyName}: currentValue = \${current},
                                              previousValue= \${previous}\`);
      }
    }

    reset() { this.changeLog = []; }

  }


  /**********************************************************************************/

  @Component({
    selector: 'app-on-changes-parent',
    template: \`
          <div class="parent">
              <h2>{{ title }}</h2>

              <table>
                    <tr><td>Power: </td><td><input [(ngModel)]="power"></td></tr>
                    <tr><td>Hero.name: </td><td><input [(ngModel)]="hero.name"></td></tr>
              </table>
              <p><button (click)="reset()">Reset Log</button></p>

              <app-on-changes [hero]="hero" [power]="power"></app-on-changes>
          </div>
    \`,
    styles: ['.parent { background: Lavender;']
  })
  export class OnChangesParentComponent {
    hero: Hero;
    power: string;
    title = 'OnChanges';
    @ViewChild(OnChangesComponent) childView: OnChangesComponent;

    constructor() {
      this.reset();
    }

    reset() {
      this.hero = new Hero('Flash');
      this.power = 'sing';
      if (this.childView) { this.childView.reset(); }
    }

  }

  // docheck component
  import { Component, DoCheck, Input, ViewChild } from '@angular/core';

  class Hero {
    constructor(public name: string) { }
  }

  @Component({
    selector: 'app-do-check',
    template: \`
          <div class="hero">
                <p>{{ hero.name }} can {{ power }} </p>
                <h4>-- Change Log --</h4>
                <div *ngFor="let change of changeLog">
                          {{ change }}
                </div>
          </div>
    \`,
    styles: [
              '.hero { background: LightYellow; padding: 8px; margin-top: 8px; }',
              'p { background: Yellow; padding: 8px; margin-top: 8px; }'
            ]
  })
  export class DoCheckComponent implements DoCheck {
    @Input() hero: Hero;
    @Input() power: string;

    changeDetected = false;
    changeLog: string[] = [];
    oldHeroName = '';
    oldPower = '';
    oldLogLength = 0;
    noChangeCount = 0;

    constructor() { }

    ngDoCheck() {
        if (this.hero.name !== this.oldHeroName) {
          this.changeDetected = true;
          this.changeLog.push(\`DoCheck: Hero name changed to "\${this.hero.name}"
                               from "\${this.oldHeroName}"\`);
          this.oldHeroName = this.hero.name;
        }

        if (this.power !== this.oldPower) {
          this.changeDetected = true;
          this.changeLog.push(\`DoCheck: Power changed to "\${this.power}"
                               from "\${this.oldPower}"\`);
          this.oldPower = this.power;
        }

        if (this.changeDetected) {
          this.noChangeCount = 0;
        } else {
          const count = this.noChangeCount += 1;
          const noChangeMessage = \`DoCheck called \${count}x when no change to hero or power\`;
          if (count === 1) {
            this.changeLog.push(noChangeMessage);
          } else {
            this.changeLog[this.changeLog.length - 1] = noChangeMessage;
          }
        }
        this.changeDetected = false;

    }

    reset() {
      this.changeDetected = true;
      this.changeLog = [];
    }

  }

  /*********************************************************************************/

  @Component({
    selector: 'app-do-check-parent',
    template: \`
          <div class="parent">
              <h2>{{ title }}</h2>

              <table>
                    <tr><td>Power: </td><td><input [(ngModel)]="power"></td></tr>
                    <tr><td>Hero.name: </td><td><input [(ngModel)]="hero.name"></td></tr>
              </table>
              <p><button (click)="reset()">Reset Log</button></p>

              <app-do-check [hero]="hero" [power]="power"></app-do-check>

          </div>
    \`,
    styles: ['.parent { background: Lavender; }']
  })
  export class DoCheckParentComponent {
      hero: Hero;
      power: string;
      title = 'DoCheck';
      @ViewChild(DoCheckComponent) childView: DoCheckComponent;

      constructor() {
        this.reset();
      }

      reset() {
        this.hero = new Hero('Flash');
        this.power = 'sing';
        if (this.childView) {
          this.childView.reset();
        }
      }

  }

// afterview component
import { Component, AfterViewChecked, AfterViewInit, ViewChild } from '@angular/core';

  import { LoggerService } from '../logger.service';

  /*****************************************************/
  @Component({
    selector: 'app-child-view',
    template: '<input [(ngModel)]="hero">'
  })
  export class ChildViewComponent {
    hero = 'Flash';
  }

  /*****************************************************/
  @Component({
    selector: 'app-after-view',
    template: \`
        <div>-- child view begins --</div>
        <app-child-view></app-child-view>
        <div>-- child view ends --</div>
    <p *ngIf="comment" class="comment">
        {{ comment }}
    </p>
    \`
  })
  export class AfterViewComponent implements AfterViewChecked, AfterViewInit {
    private previousHero = '';
    comment = '';

    @ViewChild(ChildViewComponent) viewChild: ChildViewComponent;

    constructor(private logger: LoggerService) {
      this.logIt('AfterView constructor');
    }

    ngAfterViewInit() {
      // viewchild is set after view has been initialized
      this.logIt('AfterViewInit');
      this.doSomething();
    }

    ngAfterViewChecked() {
      // viewchild is updated after view has been checked
      if (this.previousHero === this.viewChild.hero) {
            this.logIt('AfterViewChecked (no change)');
      } else {
        this.previousHero = this.viewChild.hero;
        this.logIt('AfterViewChecked');
        this.doSomething();
      }
    }

    private doSomething() {
          const come = this.viewChild.hero.length > 10 ? \`That's a long name\` : '';
          if (come !== this.comment) {
            this.logger.tick_then(() => this.comment = come);
          }
    }

    private logIt(method: string) {
      const child = this.viewChild;
      const message = \`\${method}: \${child ? child.hero : 'no'} child view\`;
      this.logger.log(message);
    }

  }

  /*****************************************************/
  @Component({
    selector: 'app-after-view-parent',
    template: \`
          <div class="parent">
              <h2>AfterView</h2>
              <app-after-view *ngIf="show"></app-after-view>

              <h4>-- AfterView Logs --</h4>
              <p><button (click)="reset()">Reset</button></p>
              <div *ngFor="let message of logger.logs">{{ message }}</div>
          </div>
    \`,
    styles: ['.parent { background: burlywood; }'],
  })
  export class AfterViewParentComponent {
          show = true;

          constructor(public logger: LoggerService) { }

          reset() {
            this.logger.clear();
            this.show = false;
            this.logger.tick_then(() => this.show = true);
          }

  }

// aftercontent component
import { Component,
  AfterContentChecked,
  AfterContentInit,
  ContentChild } from '@angular/core';

import { LoggerService } from '../logger.service';

/*****************************************************/
@Component({
selector: 'app-child',
template: '<input [(ngModel)]="hero">'
})
export class ChildComponent {
hero = 'Flash';
}

/*****************************************************/
@Component({
selector: 'app-after-content',
template: \`
<div>-- projected content begins --</div>
   <ng-content></ng-content>
<div>-- projected content ends --</div>
\`
+
\`
<p *ngIf="comment" class="comment">
{{ comment }}
</p>
\`
})
export class AfterContentComponent implements AfterContentChecked, AfterContentInit {
private previousHero = '';
comment = '';

@ContentChild(ChildComponent) contentChild: ChildComponent;

constructor(private logger: LoggerService) {
this.logIt('AfterContent constructor');
}

ngAfterContentInit() {
// contentchild is set after content has been initialized
this.logIt('AfterContentInit');
this.doSomething();
}

ngAfterContentChecked() {
// contentchild is updated after content has been checked
if (this.previousHero === this.contentChild.hero) {
   this.logIt('AfterContentChecked (no change)');
} else {
this.previousHero = this.contentChild.hero;
this.logIt('AfterContentChecked');
this.doSomething();
}
}

private doSomething() {
 this.comment = this.contentChild.hero.length > 10 ? \`That's a long name\` : '';
}

private logIt(method: string) {
const child = this.contentChild;
const message = \`\${method}: \${child ? child.hero : 'no'} child content\`;
this.logger.log(message);
}

}

/*****************************************************/
@Component({
selector: 'app-after-content-parent',
template: \`
 <div class="parent">
     <h2>AfterContent</h2>

     <div *ngIf="show">
       <app-after-content>
           <app-child></app-child>
       </app-after-content>

     <h4>-- AfterView Logs --</h4>
     <p><button (click)="reset()">Reset</button></p>
     <div *ngFor="let message of logger.logs">{{ message }}</div>
 </div>
\`,
styles: ['.parent { background: burlywood; }']
})
export class AfterContentParentComponent {
 show = true;

 constructor(public logger: LoggerService) { }

 reset() {
   this.logger.clear();
   this.show = false;
   this.logger.tick_then(() => this.show = true);
 }
}

// counter component
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-counter',
  template: \`
          <div class="counter">
                  Counter = {{ counter }}
            <h5>-- Counter Change Log --</h5>
            <div *ngFor="let change of changeLog" appISpy>
                  {{ change }}
            </div>
          </div>
  \`,
  styles: ['.counter { background: LightYellow; padding: 8px; margin-top: 8px; }']
})
export class MyCounterComponent implements OnChanges {
       @Input() counter: number;
       changeLog: string[] = [];

      ngOnChanges(changes: SimpleChanges) {
        // empty changelog whenever counter hits zero
        // hint: this is a way to respond programmatically to external value changes.
        if (this.counter === 0) {
          this.changeLog = [];
        }

        // change to counter is the only thing we care about
        const change = changes['counter'];
        const current = change.currentValue;
        // first time is {}; after is integer
        const previous = JSON.stringify(change.previousValue);
        this.changeLog.push(\`counter: currentValue = \${current},
                                       previousValue = \${previous}\`);
      }
}

/******************************************************/
@Component({
  selector: 'app-counter-parent',
  template: \`
          <div class="parent">
              <h2>Counter</h2>

              <button (click)="updateCounter()">Update Counter</button>
              <button (click)="reset()">Reset Counter</button>

              <app-counter [counter]="value"></app-counter>

              <h4>-- Spy Lifecycle Hook Log --</h4>
              <div *ngFor="let message of spyLog">
                    {{ message }}
              </div>
          </div>
  \`,
  styles: ['.parent { background: gold; }'],
})
export class CounterParentComponent {
      value: number;
      spyLog: string[] = [];

      constructor(private logger: LoggerService) {
        this.spyLog = logger.logs;
        this.reset();
      }

      updateCounter() {
        this.value += 1;
        this.logger.tick();
      }

      reset() {
        this.logger.log('-- reset --');
        this.value = 0;
        this.logger.tick();
      }

}

// input binding
import { Component, Input } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-child',
  template: \`
        <h3>{{ hero.name }} says:</h3>
        <p>I, {{ hero.name }}, honor you, {{ master }}.</p>
  \`
})
export class HeroChildComponent {
    @Input() hero: Hero;
    @Input() master: string;

}

/******************************************************/

import { Component } from '@angular/core';
import { HEROES } from './../hero';

@Component({
  selector: 'app-hero-parent',
  template: \`
    <h2>{{ master }} honors {{ heroes.length }} heroes</h2>
    <app-hero-child *ngFor="let hero of heroes"
      [hero]="hero"
      [master]="master">
    </app-hero-child>
  \`,
})
export class HeroParentComponent  {
  heroes = HEROES;
  master = 'Open Source';

}


export class Hero {
  name: string;
}

export const HEROES = [
  { name: 'Angular CLI' },
  { name: 'Angular' },
  { name: 'Angular Material' }
];


// input with setter bindings
import { Component, Input } from '@angular/core';

  @Component({
    selector: 'app-name-child',
    template: '<h3>"{{ name }}"</h3>',
  })
  export class NameChildComponent {
    private _name = '';

    @Input()
    set name(name: string) {
      this._name = (name && name.trim()) || '<no name set>';
    }

    get name(): string {
      return this._name;
    }

  }

  /******************************************************/

  import { Component } from '@angular/core';

  @Component({
  selector: 'app-name-parent',
  template: \`
          <h2>Master controls {{ names.length }} names</h2>
          <app-name-child *ngFor="let name of names" [name]="name">
          </app-name-child>
    \`,
  })
  export class NameParentComponent  {
      // displays "Dr. IQ", "<no name set>", "Bombasto"
      names = ['Dr. IQ', ' ', '  Bombasto   '];

}

// input interceptions with ngonchanges
import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-version-child',
  template: \`
          <h3>Version {{ major }}. {{ minor }}. {{ patch }}</h3>
          <h4>Change log:</h4>
          <ul>
                <li *ngFor="let change of changeLog">
                    {{ change }}
                </li>
          </ul>
  \`
})
export class VersionChildComponent implements OnChanges {
  @Input() major: number;
  @Input() minor: number;
  @Input() patch: number;

  changeLog: string[] = [];

  ngOnChanges(changes: {[propertyKey: string]: SimpleChange}) {
      const log: string[] = [];

      for (const propertyName of Object.keys(changes)) {
        const changedProperty = changes[propertyName];
        const to = JSON.stringify(changedProperty.currentValue);
        if (changedProperty.isFirstChange()) {
          log.push(\`Initial value of \${propertyName} set to \${to}\`);
        } else {
          const from = JSON.stringify(changedProperty.previousValue);
          log.push(\`\${propertyName} changed from \${from} to \${to}\`);
        }
      }
      this.changeLog.push(log.join(', '));
  }

}

/******************************************************/

import { Component } from '@angular/core';

@Component({
selector: 'app-version-parent',
template: \`
          <h2>Source Code Version</h2>
          <button (click)="newMajor()">New Major Version</button>
          <button (click)="newMinor()">New Minor Version</button>
          <button (click)="newPatch()">New Patch Version</button>
          <app-version-child [major]="major" [minor]="minor" [patch]="patch">
          </app-version-child>
  \`,
})
export class VersionParentComponent {
  major = 5;
  minor = 2;
  patch = 3;

  newPatch() {
    this.patch++;
  }

  newMinor() {
    this.minor++;
    this.patch = 0;
  }

  newMajor() {
    this.major++;
    this.minor = 0;
    this.patch = 0;
  }

}

// parent listens for child events
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voter',
  template: \`
          <h4>{{ name }}</h4>
          <button (click)="vote(true)" [disabled]="voted">Agree</button>
          <button (click)="vote(false)" [disabled]="voted">Disagree</button>
  \`,
})
export class VoterComponent {
  @Input() name: string;
  @Output() onVoted = new EventEmitter<boolean>();

  voted = false;

  vote(agreed: boolean) {
    this.onVoted.emit(agreed);
    this.voted = true;
  }

}

/******************************************************/

import { Component } from '@angular/core';

@Component({
selector: 'app-vote-taker',
template: \`
          <h2>Should mankind colonize the Universe?</h2>
          <h3>Agree: {{ agreed }}, Disagree: {{ disagreed }}</h3>
          <app-voter *ngFor="let voter of voters"
                      [name]="voter"
                      (onVoted)="onVoted($event)">
          </app-voter>
  \`,
})
export class VoteTakerComponent {
    agreed = 0;
    disagreed = 0;
    voters = ['Flash', 'Wonderwoman', 'Superman'];

    onVoted(agreed: boolean) {
      agreed ? this.agreed++ : this.disagreed++;
    }

}

// parent interacts with child vi a local variable
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  template: \`
        <p>{{ message }}</p>
  \`,
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  intervalId = 0;
  message = '';
  seconds = 11;

  ngOnInit() {
    this.start();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  start() {
    this.countDown();
  }

  stop() {
    this.clearTimer();
    this.message = \`Holding at T-\${this.seconds} seconds\`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast Off!';
      } else {
        if (this.seconds < 0) {
          this.seconds = 10;
        }
        this.message = \`T-\${this.seconds} seconds and counting ...\`;
      }
    }, 1000);
  }

}

/******************************************************/

import { Component } from '@angular/core';


@Component({
selector: 'app-countdown-parent-lv',
template: \`
      <h3>Countdown to Liftoff (via local variable)</h3>
      <button (click)="timer.start()">Start</button>
      <button (click)="timer.stop()">Stop</button>
      <div class="seconds">{{ timer.seconds }}</div>
      <app-countdown-timer #timer></app-countdown-timer>
\`,
styleUrls: ['../../assets/demo.css']
})
export class CountdownLocalVarParentComponent { }

// parent Calls An @viewchild
import { Component } from '@angular/core';
  import { AfterViewInit, ViewChild } from '@angular/core';

  import { CountdownTimerComponent } from './../countdown-timer/countdown-timer.component';

  @Component({
    selector: 'app-countdown-parent-vc',
    template: \`
      <h3>Countdown to Liftoff (via ViewChild)</h3>
      <button (click)="start()">Start</button>
      <button (click)="stop()">Stop</button>
      <div class="seconds">{{ seconds() }}</div>
      <app-countdown-timer></app-countdown-timer>
      \`
    ,
    styleUrls: ['../../assets/demo.css']
  })
  export class CountdownViewChildParentComponent implements AfterViewInit {
    @ViewChild(CountdownTimerComponent, { static: false })
               private timerComponent: CountdownTimerComponent;

    seconds() {
      return 0;
    }

    ngAfterViewInit() {
      setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
    }

    start() {
      this.timerComponent.start();
    }

    stop() {
      this.timerComponent.stop();
    }

  }

  // parent and child communicate via a shared service
  import { Injectable } from '@angular/core';

  import { Subject } from 'rxjs/Subject';

  @Injectable({
    providedIn: 'root'
  })
  export class MissionService {

    // observable string sources
    private missionAnnouncedSource = new Subject<string>();
    private missionConfirmedSource = new Subject<string>();

    // observable string streams
    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionConfirmedSource.asObservable();

    // service message commands
    announceMission(mission: string) {
      this.missionAnnouncedSource.next(mission);
    }

    confirmMission(technology: string) {
      this.missionConfirmedSource.next(technology);
    }

  }


  import { Component } from '@angular/core';

  import { MissionService } from '../mission.service';

  @Component({
    selector: 'app-mission-control',
    template: \`
              <h2>Mission Control</h2>
              <button (click)="announce()">Announce Mission</button>
              <app-technology *ngFor="let technology of technologies"
                              [technology]="technology">
              </app-technology>
              <h3>History</h3>
              <ul>
                  <li *ngFor="let event of history">{{ event }}</li>
              </ul>
    \`,
  })
  export class MissionControlComponent {
    technologies = ['Angular CLI',
                    'Angular',
                    'Angular Material',
                    'Firebase',
                    'Google Cloud Platform'];
    history: string[] = [];

    missions = ['Reach N° 1 position in our domains!',
                'Build new Features, Fix all Bugs!',
                'Have Fun, Build awesome Technologies, Grow our Communities!'];
    nextMission = 0;

    constructor(private missionService: MissionService) {
                missionService.missionConfirmed$.subscribe(
                  technology => {
                      this.history.push(\`\${technology} confirmed the mission.\`);
                  });
    }

    announce() {
      const mission = this.missions[this.nextMission++];
      this.missionService.announceMission(mission);
      this.history.push(\`Mission "\${mission}" announced.\`);
      if (this.nextMission >= this.missions.length) {
        this.nextMission = 0;
      }
    }

  }


  /******************************************************/

  import { MissionService } from './../mission.service';
  import { Component, Input, OnDestroy } from '@angular/core';

  import { Subscription } from 'rxjs/Subscription';

  @Component({
  selector: 'app-technology',
  template: \`
            <p>
                {{ technology }}: <strong>{{ mission }}</strong>
                <button (click)="confirm()"
                        [disabled]="!announced || confirmed">
                Confirm
                </button>
            </p>
  \`,
  })
  export class TechnologyComponent implements OnDestroy {
       @Input() technology: string;
        mission = '<no mission announced>';
        confirmed = false;
        announced = false;
        missionSubscription: Subscription;

  constructor(private missionService: MissionService) {
    this.missionSubscription = missionService.missionAnnounced$.subscribe(
      mission => {
          this.mission = mission;
          this.announced = true;
          this.confirmed = false;
      });
  }

  confirm() {
    this.confirmed = true;
    this.missionService.confirmMission(this.technology);
  }

  ngOnDestroy() {
    this.missionSubscription.unsubscribe();
    }

  }

  // sibling component communication
  import { Injectable } from '@angular/core';

  import { Subject } from 'rxjs/Subject';

  @Injectable()
  export class TodoService {

    // observable string sources
    private totalCount = new Subject<number>();
    private lastUpdate = new Subject<number>();
    private clearAll = new Subject<boolean>();


    // observable string streams
    totalCount$ = this.totalCount.asObservable();
    lastUpdate$ = this.lastUpdate.asObservable();
    clearAll$ = this.clearAll.asObservable();


    // service message commands
    publishTotalCount(count: number) {
      this.totalCount.next(count);
    }

    publishLastUpdate(date: number) {
      this.lastUpdate.next(date);
    }

    publishClearAll(clear: boolean) {
      this.clearAll.next(clear);
    }

  }

  /******************************************************/

  import { TodoService } from './../todo.service';
  import { Component, OnDestroy } from '@angular/core';

  import { Subscription } from 'rxjs/Subscription';

  class Todo {
    constructor(public title: string,
                public isCompleted: boolean,
                public date: number) { }
  }

  @Component({
    selector: 'app-todo',
    template: \`
            <h2>Todo List</h2>
            <h3>What needs to be done?</h3>
            <input #todoBox>
            <button (click)="add(todoBox)">Add</button>
            <ul>
                  <li *ngFor="let todo of todos">{{ todo.title }}
                    <button (click)="remove(todo)">x</button>
                  </li>
            </ul>
    \`,
  })
  export class TodoComponent implements OnDestroy {
    todos: Todo[] = [];
    totalTodos = 0;
    lastUpdate = 0;

    clearAllSubscription: Subscription;

    private updateCountDate(change: boolean): void {
      change ? this.totalTodos += 1 : this.totalTodos -= 1;
      this.todoService.publishTotalCount(this.totalTodos);
      this.todoService.publishLastUpdate(new Date().getTime());
    }

    constructor(private todoService: TodoService) {
      this.clearAllSubscription = this.todoService.clearAll$.subscribe(
        clear => {
          if (clear) {
            this.todos.length = 0;
            this.totalTodos = 0;
          }
        });
     }

     add(todo): void {
       if (!todo.value) {
         return;
       }
       this.todos.push(new Todo(todo.value, false, new Date().getTime()));
       this.updateCountDate(true);
       todo.value = '';
     }

     remove(todo): void {
       this.todos.splice(this.todos.indexOf(todo), 1);
       this.updateCountDate(false);
     }

    ngOnDestroy() {
      this.clearAllSubscription.unsubscribe();
    }

  }

  /******************************************************/

  import { Component, OnDestroy } from '@angular/core';

  import { TodoService } from './../todo.service';

  import { Subscription } from 'rxjs/Subscription';

  @Component({
    selector: 'app-dashboard',
    template: \`
          <h2>Dashboard</h2>
          <p><strong>Last Update: </strong>{{ lastUpdate | date:'medium' }}</p>
          <p><strong>Total Todos: </strong> {{ totalCount }}</p>
          <button (click)="clearAll()">Clear All</button>
    \`,
    styleUrls: ['./dashboard.component.css']
  })
  export class DashboardComponent implements OnDestroy {
    lastUpdate = null;
    totalCount = 0;

    totalCountSubscription: Subscription;
    lastUpdateSubscription: Subscription;

    constructor(private todoService: TodoService) {
      this.totalCountSubscription = this.todoService.totalCount$.subscribe(
        count => {
          this.totalCount = count;
        });
        this.lastUpdateSubscription = this.todoService.lastUpdate$.subscribe(
          lastUpdate => {
            this.lastUpdate = lastUpdate;
          });
    }

    clearAll() {
      this.lastUpdate = null;
      this.totalCount = 0;
      this.todoService.publishClearAll(true);
    }

    ngOnDestroy() {
      this.totalCountSubscription.unsubscribe();
      this.lastUpdateSubscription.unsubscribe();
    }
  }

  // component styles in component metadata
  import { Component, HostBinding } from '@angular/core';

  import { Hero } from '../hero';

  @Component({
    selector: 'app-hero-app',
    template: \`
          <h1>Tour of Heroes</h1>
          <app-hero-app-main [hero]="hero"></app-hero-app-main>
    \`,
    styles: ['h1 { font-weight: normal; }']
  })
  export class HeroAppComponent {
    hero = new Hero(
      'Flash',
      ['Polymer Princess', 'Superman', 'Spiderman']
    );

    @HostBinding('class') get themeClass() {
      return 'theme-light';
    }

  }

  // host selector
  :host {
    display: block;
    border: 1px solid black;
  }

  :host(.active) {
    border-width: 3px;
  }

  :host-context(.theme-light) h2 {
    background-color: #eef;
  }

  :host /deep/ h3 {
    font-style: italic;
  }

// css inline revisited
import { Component, HostBinding } from '@angular/core';

  import { Hero } from '../hero';

  @Component({
    selector: 'app-hero-app',
    template: \`
          <h1>Tour of Heroes</h1>
          <app-hero-app-main [hero]="hero"></app-hero-app-main>
    \`,
    styles: ['h1 { font-weight: normal; }']
  })
  export class HeroAppComponent {
    hero = new Hero(
      'Flash',
      ['Polymer Princess', 'Superman', 'Spiderman']
    );

    @HostBinding('class') get themeClass() {
      return 'theme-light';
    }

  }

// css (scss less, stylus) external file
import { Component, HostBinding } from '@angular/core';

import { Hero } from '../hero';


@Component({
  selector: 'app-hero-app',
  template: \`
        <h1>Tour of Heroes</h1>
        <app-hero-app-main [hero]="hero"></app-hero-app-main>
  \`,
  styles: ['./hero-app.component.css']
})
export class HeroAppComponent {
  hero = new Hero(
    'Flash',
    ['Polymer Princess', 'Superman', 'Spiderman']
  );

  @HostBinding('class') get themeClass() {
    return 'theme-light';
  }

}


h1 {
  font-weight: normal;
}

// template inline styles
import { Component, Input } from '@angular/core';

  import { Hero } from '../hero';

  @Component({
    selector: 'app-hero-controls',
    template: \`
        <style>
            button {
              background-color: white;
              border: 1px solid #777;
            }
        </style>
        <h3>Controls</h3>
        <button (click)="activate()">Activate</button>
    \`,
  })
  export class HeroControlsComponent {
    @Input() hero: Hero;

    activate() {
      this.hero.active = true;
    }

  }

// template link tags
import { Component, Input } from '@angular/core';

  import { Hero } from '../hero';

  @Component({
    selector: 'app-hero-team',
    template: \`
          <!-- we must use a relative URL so that the AOT compiler can find the stylesheet -->
          <link rel="../../assets/hero-team.component.css">
          <h3>Team</h3>
          <ul>
            <li *ngFor="let member of hero.team">
                {{ member }}
            </li>
          </ul>
    \`,
  })
  export class HeroTeamComponent {
    @Input() hero: Hero;

  }

// css @imports
/* the aot compiler needs the ./ to show that this is local */
/* @import './hero-detail.box.css'; */

// view encapuslation

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-quest-summary',
  templateUrl: './quest-summary.component.html',
  styleUrls: ['./quest-summary.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class QuestSummaryComponent {
  // careful: few browsers support shadow DOM encapsulation at this time

}

<p>
      angular, it's all about you ... my baby ...
</p>


// dynamic components: anchor directive
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAdHost]'
})
export class AdDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}


// loading components
import { Component,
  Input,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  OnDestroy } from '@angular/core';

import { AdDirective } from '../ad.directive';
import { AdComponent } from '../ad.component';
import { AdItem } from '../ad-item';

@Component({
  selector: 'app-ad-banner',
  template: \`
     <div class="ad-banner">
           <h3>Advertisements</h3>
           <ng-template appAdHost></ng-template>
     </div>
\`
})
export class AdBannerComponent implements AfterViewInit, OnDestroy  {
    @Input() ads: AdItem[];
    currentAddIndex: number = -1;
    @ViewChild(AdDirective) adHost: AdDirective;
    subscription: any;
    interval: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef) { }

    ngAfterViewInit() {
      this.loadComponent();
      this.getAds();
      this.cdr.detectChanges();
    }

  loadComponent() {
  this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
  const adItem = this.ads[this.currentAddIndex];

  const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(adItem.component);
  const viewContainerRef = this.adHost.viewContainerRef;
  viewContainerRef.clear();

  const componentRef = viewContainerRef.createComponent(componentFactory);
  (<AdComponent>componentRef.instance).data = adItem.data;

  }

  getAds() {
      this.interval = setInterval(() => {
      this.loadComponent();
  }, 3000);
}

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}

// selector reference
import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  import { AdDirective } from './ad.directive';
  import { AdBannerComponent } from './ad-banner/ad-banner.component';
  import { TechnologyAdComponent } from './technology-ad/technology-ad.component';
  import { TechnologyProfileComponent }
         from './technology-profile/technology-profile.component';

  import { AdService } from './ad.service';

  @NgModule({
    imports: [
      CommonModule
    ],
    declarations: [AdDirective,
                  AdBannerComponent,
                  TechnologyAdComponent,
                  TechnologyProfileComponent],
    providers: [ AdService ],
    entryComponents: [ TechnologyAdComponent, TechnologyProfileComponent ],
    exports: [ AdBannerComponent ]
  })
  export class DynamicComponentModule { }

  // ad service
  import { Injectable } from '@angular/core';

  import { AdItem } from './ad-item';
  import { TechnologyProfileComponent }
  from './technology-profile/technology-profile.component';
  import { TechnologyAdComponent } from './technology-ad/technology-ad.component';

  @Injectable({
    providedIn: 'root'
  })
  export class AdService {

    getAds() {
      return [
            new AdItem(TechnologyProfileComponent,
              { name: 'Angular CLI', feature: 'Create your dream app'}),
            new AdItem(TechnologyProfileComponent,
              { name: 'Angular', feature: 'One Platform. Mobile && desktop'}),
            new AdItem(TechnologyProfileComponent,
              { name: 'Angular Material', feature: 'Material Design CSS Framework'}),
            new AdItem(TechnologyAdComponent,
              { headline: 'Angular 8.2.4 released', body: 'Get the newest version now!'}),
            new AdItem(TechnologyAdComponent,
              { headline: 'Angular 8.2.4 available', body: 'Try this command line tool.'})
      ];
    }
  }

  // happy coding, frohes programmieren, joyeux programmation... :-)
  `,
  blockQuote: `
  Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
  sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
  und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
  und eine die wir vorhaben zu gewinnen.
  `,
  imageFooterUrl: 'assets/img/post6.jpg',
  footerQuote: 'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.'
},
{
  id: 7,
  imageHeaderUrl: 'url(assets/img/post7-bg.jpg)',
  heading: 'Angular 8/9, Basis- Teil 1',
  subHeading: 'Helden bauen Lösungen mit dieser Technologie',
  metaPublishedDate: 'am 25 Dezember, 2019',
  sectionHeading: 'Attribute Directives, Pipes, Animations, Template-Driven Forms, Reactive Forms, Dynamic Forms, Validation',
  code: `
// attribute directive
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() defaultColor: string;
  @Input() appHighlight: string;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onmouseenter() {
    this.highlight(this.appHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onmouseleave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}

// host component
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 color: string;

}

/******************************************************/

<h1>My first Attribute Directive</h1>

  <h4>Pick a highlight color</h4>
<div>
  <input type="radio" name="colors" (click)="color='lightgreen'">Green
  <input type="radio" name="colors" (click)="color='yellow'">Yellow
  <input type="radio" name="colors" (click)="color='cyan'">Cyan
</div>
<p [appHighlight]="color">Highlight me!</p>
<p [appHighlight]="color" defaultColor="violet">
  Highlight me too!
</p>
<hr>
<p><i>Mouse over following lines to see fixed highlights</i></p>

<p [appHighlight]="'yellow'">Highlighted in yellow</p>
<p appHighlight="red">Highlighted in red</p>

// birthday pipe
import { Component } from '@angular/core';

  @Component({
    selector: 'app-hero-birthday1',
    template: \`
              <p>The hero's birthday is {{ birthday | date }}</p>
              <p>The hero's birthday is {{ birthday | date:"dd/MM/yy" }}</p>
    \`
  })
  export class HeroBirthday1Component {

    birthday = new Date(1971, 6, 13);

  }

  // parameterizing a pipe
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-hero-birthday2',
    template: \`
          <p>The hero's birthday is {{ birthday | date:format }}</p>
          <button (click)="toggleFormat()">Toggle Format</button>
    \`,
  })
  export class HeroBirthday2Component {
        birthday = new Date(1971, 6, 13);
        toggle = true;

        get format() { return this.toggle ? 'shortDate' : 'fullDate'; }

        toggleFormat() {
          this.toggle = !this.toggle;
        }

  }

  // chaining pipes
  <app-hero-birthday1></app-hero-birthday1>

  <hr>

  <app-hero-birthday2></app-hero-birthday2>

  <hr>

  <p>
      The chained hero's birthday is
      {{ birthday | date | uppercase }}
  </p>
  <p>
    The chained hero's birthday is
    {{ birthday | date:'fullDate' | uppercase }}
  </p>
  <p>
    The chained hero's birthday is
    {{ ( birthday | date:'fullDate' ) | uppercase }}
  </p>

  <hr>

  <app-power-booster></app-power-booster>

  <hr>

  <app-power-boost-calculator></app-power-boost-calculator>

  <hr>

  <app-flying-heroes></app-flying-heroes>

  <hr>

  <app-flying-heroes-impure></app-flying-heroes-impure>

  <hr>

  <app-hero-async-message></app-hero-async-message>

  <hr>

  <app-hero-list></app-hero-list>

// custom pipe
import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'exponentialStrength'
  })
  export class ExponentialStrengthPipe implements PipeTransform {

    transform(value: number, exponent: string): number {
      const exp = parseFloat(exponent);
      return Math.pow(value, isNaN(exp) ? 1 : exp);
    }

  }

// power booster
import { Component } from '@angular/core';

@Component({
  selector: 'app-power-booster',
  template: \`
          <h2>Power Booster</h2>
          <p>Super power boost: {{ 2 | exponentialStrength: 10 }}</p>
  \`
})
export class PowerBoosterComponent { }

// power boost calculator

import { Component } from '@angular/core';

@Component({
  selector: 'app-power-boost-calculator',
  template: \`
      <h2>Power Boost Calculator</h2>
      <div>Normal power: <input [(ngModel)]="power"></div>
      <div>Boost factor: <input [(ngModel)]="factor"></div>
      <p>
          Super Hero Power: {{power | exponentialStrength: factor }}
      </p>
  \`,
})
export class PowerBoostCalculatorComponent {
      power = 2;
      factor = 8;
}

// impure and pure pipes
import { Pipe, PipeTransform } from '@angular/core';

  import { Flyer } from './heroes';

  @Pipe({
    name: 'flyingHeroes'
  })
  export class FlyingHeroesPipe implements PipeTransform {

    transform(allHeroes: Flyer[]): Flyer[] {
      return allHeroes.filter(hero => hero.canFly);
    }

  }

  @Pipe({
    name: 'flyingHeroesImpure',
    pure: false
  })
  export class FlyingHeroesImpurePipe extends FlyingHeroesPipe { }


  /******************************************************/

  export interface Flyer { canFly: boolean; }

  export const HEROES = [
    { name: 'Flash', canFly: true },
    { name: 'Wonderwoman', canFly: true },
    { name: 'Bombasto', canFly: false },
    { name: 'Spiderman', canFly: false }
  ];

// component pipes
import { Component } from '@angular/core';

import { HEROES } from '../heroes';

@Component({
  selector: 'app-flying-heroes',
  template: \`
    <h2>{{ title }}</h2>
    <p>
      New hero:
          <input type="text" #box
          (keyup.enter)="addHero(box.value); box.value='';"
          placeholder="hero name">
      <input id="can-fly" type="checkbox" [(ngModel)]="canFly"> can fly
    </p>

    <p>
    <input id="mutate" type="checkbox" [(ngModel)]="mutate"> Mutate array
    <button (click)="reset()">Reset</button>
    </p>

    <h4>Heroes who fly (piped)</h4>
    <div id="flyer">
      <div *ngFor="let hero of heroes | flyingHeroes">
          {{ hero.name }}
      </div>
    </div>

    <h4>All Heroes (no pipe)</h4>
    <div id="all">
        <div *ngFor="let hero of heroes">
              {{ hero.name }}
        </div>
    </div>
  \`,
  styles: ['#flyers, #all { font-style: italic; }']
})
export class FlyingHeroesComponent {
  title = 'Flying Heroes (pure pipe)';
  heroes: any[] = [];
  canFly = true;
  mutate = true;

  constructor() {
    this.reset();
  }

  addHero(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    const hero = { name, canFly: this.canFly };
    if (this.mutate) {
      // pure pipe won't update because heroes array reference is unchanged
      // impure pipe will
      this.heroes.push(hero);
    } else {
      // pipe updates because heroes array is a new object
      this.heroes = this.heroes.concat(hero);
    }
  }

  reset() {
    this.heroes = HEROES.slice();
  }

}

/////////// Identical except for impure pipe /////////////
@Component({
  selector: 'app-flying-heroes-impure',
  template: \`
  <h2>{{ title }}</h2>
  <p>
    New hero:
        <input type="text" #box
        (keyup.enter)="addHero(box.value); box.value='';"
        placeholder="hero name">
    <input id="can-fly" type="checkbox" [(ngModel)]="canFly"> can fly
  </p>

  <p>
  <input id="mutate" type="checkbox" [(ngModel)]="mutate"> Mutate array
  <button (click)="reset()">Reset</button>
  </p>

  <h4>Heroes who fly (piped)</h4>
  <div id="flyer">
    <div *ngFor="let hero of heroes | flyingHeroesImpure">
        {{ hero.name }}
    </div>
  </div>

  <h4>All Heroes (no pipe)</h4>
  <div id="all">
      <div *ngFor="let hero of heroes">
            {{ hero.name }}
      </div>
  </div>
\`,
styles: ['#flyers, #all { font-style: italic; }']
})
export class FlyingHeroesImpureComponent extends FlyingHeroesComponent {
  title = 'Flying Heroes (impure pipe)';
}

// impure async pipe
import { Component } from '@angular/core';

  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/interval';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/take';

  @Component({
    selector: 'app-hero-async-message',
    template: \`
          <h2>Async Hero Message and AsyncPipe</h2>
          <p>Message: {{ message$ | async }}</p>
          <button (click)="resend()">Resend</button>
    \`
  })
  export class HeroAsyncMessageComponent {
         message$: Observable<string>;

         private messages = [
            'You are my hero!',
            'You are the best hero!',
            'Will you be my hero?',
            'I will save you, my polymer princess.'
         ];

         constructor() {
           this.resend();
         }

         resend() {
           this.message$ = Observable.interval(1000)
                           .map(i => this.messages[i])
                           .take(this.messages.length);
         }

  }

// impure caching pipe
import { Pipe, PipeTransform } from '@angular/core';
  import { HttpClient } from '@angular/common/http';

  @Pipe({
    name: 'fetch',
    pure: false
  })
  export class FetchJsonPipe implements PipeTransform {
    private cachedData: any = null;
    private cachedUrl = '';

    constructor(private http: HttpClient) {}

    transform(url: string): any {
      if (url !== this.cachedUrl) {
        this.cachedData = null;
        this.cachedUrl = url;
        this.http.get<any>(url).subscribe(result => this.cachedData = result);
      }
      return this.cachedData;
    }

  }

// hero list component
import { Component } from '@angular/core';

  @Component({
    selector: 'app-hero-list',
    template: \`
          <h2>Heroes from JSON File</h2>
          <div *ngFor="let hero of ('assets/heroes.json' | fetch)">
                {{ hero.name }}
          </div>

          <p>Heroes as JSON:
              {{ 'assets/heroes.json' | fetch | json }}
          </p>

    \`,
  })
  export class HeroListComponent { }

  /******************************************************/

  [
    {"name": "Andreas", "canFly": true},
    {"name": "Martin", "canFly": false},
    {"name": "Dominique", "canFly": true},
    {"name": "Bertrand", "canFly": false},
    {"name": "Max", "canFly": true},
    {"name": "Alexander", "canFly": false},
    {"name": "Karl", "canFly": true},
    {"name": "Maria", "canFly": false},
    {"name": "Nils", "canFly": true}
  ]

// animations, technology service
import { Injectable } from '@angular/core';

export class Technology {

  constructor(public name: string, public state = 'inactive') { }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

}

const ALL_TECHNOLOGIES = [
      'Angular CLI 8.2',
      'Angular 8.2',
      'Angular Material 8.2',
      'Bootstrap 4',
      'TypeScript 3.6.7',
      'JavaScript',
      'EcmaScript 2015',
      'EcmaScript 2016',
      'EcmaScript 2017',
      'EcmaScript 2018',
      'Windows',
      'Linux',
      'MacOs',
      'Firebase',
      'Azure',
      'Google Cloud Platform'
].map(name => new Technology(name));

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  technologies: Technology[] = [];

  canAdd() {
    return this.technologies.length < ALL_TECHNOLOGIES.length;
  }

  canRemove() {
    return this.technologies.length > 0;
  }

  addActive(active = true) {
    const technology = ALL_TECHNOLOGIES[this.technologies.length];
    technology.state = active ? 'active' : 'inactive';
    this.technologies.push(technology);
  }

  addInactive() {
    this.addActive(false);
  }

  remove() {
    this.technologies.length -= 1;
  }
}

// animations module
import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  import { TechnologyTeamComponent } from './technology-team/technology-team.component';
  import { TechnologyListBasicComponent }
  from './technology-list-basic/technology-list-basic.component';
  import { TechnologyListEnterLeaveComponent }
  from './technology-list-enter-leave/technology-list-enter-leave.component';
  import { TechnologyListEnterLeaveStatesComponent }
  from './technology-list-enter-leave-states/technology-list-enter-leave-states.component';
  import { TechnologyListAutoComponent }
  from './technology-list-auto/technology-list-auto.component';
  import { TechnologyListTimingsComponent }
  from './technology-list-timings/technology-list-timings.component';
  import { TechnologyListMultistepComponent }
  from './technology-list-multistep/technology-list-multistep.component';
  import { TechnologyListGroupsComponent }
  from './technology-list-groups/technology-list-groups.component';
  import { TechnologyListInlineStylesComponent }
  from './technology-list-inline-styles/technology-list-inline-styles.component';
  import { TechnologyListCombinedTransitionsComponent }
  from './technology-list-combined-transitions/technology-list-combined-transitions.component';
  import { TechnologyListTwowayComponent }
  from './technology-list-twoway/technology-list-twoway.component';

  @NgModule({
    imports: [
      CommonModule
    ],
    declarations: [TechnologyTeamComponent,
                   TechnologyListBasicComponent,
                   TechnologyListEnterLeaveComponent,
                   TechnologyListEnterLeaveStatesComponent,
                   TechnologyListAutoComponent,
                   TechnologyListTimingsComponent,
                   TechnologyListMultistepComponent,
                   TechnologyListGroupsComponent,
                   TechnologyListInlineStylesComponent,
                   TechnologyListCombinedTransitionsComponent,
                   TechnologyListTwowayComponent],
    exports: [ TechnologyTeamComponent ]
  })
  export class AnimationsModule { }

// global css
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  width: 190px;
  line-height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #f8bbd0;
  color: #fff;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}

.active {
  background-color: #ec407a;
  color: #fff;
  transform: scale(1.3);
}

.inactive {
  background-color: #f8bbd0;
  color: #fff;
  transform: scale(1);
}


// technology team component
import { Component } from '@angular/core';

import { TechnologyService, Technology } from '../technology.service';

@Component({
  selector: 'app-technology-team',
  template: \`
              <div class="buttons">
              <button [disabled]="!technologyService.canAdd()"
                      (click)="technologyService.addInactive()">
                      Add inactive technology
              </button>
              <button [disabled]="!technologyService.canAdd()"
                      (click)="technologyService.addActive()">
                      Add active technology
              </button>
              <button [disabled]="!technologyService.canRemove()"
                      (click)="technologyService.remove()">
                      Remove technology
              </button>
              </div>
              <div class="columns">
                  <div class="column">
                      <h4>Basic State</h4>
                        <app-technology-list-basic [technologies]="technologies">
                        </app-technology-list-basic>
                  </div>
                  <div class="column">
                      <h4>Enter & Leave</h4>
                        <app-technology-list-enter-leave [technologies]="technologies">
                        </app-technology-list-enter-leave>
                  </div>
                  <div class="column">
                        <h4>Styles In Transitions</h4>
                        <app-technology-list-inline-styles [technologies]="technologies">
                        </app-technology-list-inline-styles>
                  </div>
          <div class="column">
              <h4>Combined Transitions</h4>
                <app-technology-list-combined-transitions [technologies]="technologies">
                </app-technology-list-combined-transitions>
          </div>
                  <div class="column">
                       <h4>Two-Way Transitions</h4>
                        <app-technology-list-twoway [technologies]="technologies">
                        </app-technology-list-twoway>
                 </div>
              </div>
        <div class="columns">
            <div class="column">
                <h4>Enter & Leave & States</h4>
                  <app-technology-list-enter-leave-states [technologies]="technologies">
                  </app-technology-list-enter-leave-states>
            </div>
                  <div class="column">
                      <h4>Auto Style Calc</h4>
                      <app-technology-list-auto [technologies]="technologies">
                      </app-technology-list-auto>
                  </div>
                  <div class="column">
                      <h4>Different Timings</h4>
                      <app-technology-list-timings [technologies]="technologies">
                      </app-technology-list-timings>
                  </div>
                  <div class="column">
                      <h4>Multiple Keyframes</h4>
                      <app-technology-list-multistep [technologies]="technologies">
                      </app-technology-list-multistep>
                  </div>
                  <div class="column">
                      <h4>Parallel Groups</h4>
                      <app-technology-list-groups [technologies]="technologies">
                      </app-technology-list-groups>
                  </div>
          </div>
  \`,
  styles: [\`
  .buttons {
    text-align: center;
  }
  button {
    padding: 1.5em 3em;
  }
  .columns {
    display: flex;
    flex-direction: row;
  }
  .column {
    flex: 1;
    padding: 10px;
  }
  .column p {
    min-height: 6em;
  }
  \`],
})
export class TechnologyTeamComponent {
  technologies: Technology[];

  constructor(public technologyService: TechnologyService) {
    this.technologies = technologyService.technologies;
  }
}

// basic state component
import { Component, Input } from '@angular/core';
  import { trigger, state, style, animate, transition } from '@angular/animations';

  import { Technology } from '../technology.service';

  @Component({
    selector: 'app-technology-list-basic',
    template: \`
            <ul>
                  <li *ngFor="let technology of technologies"
                        [@technologyState]="technology.state"
                        (click)="technology.toggleState()">
                        {{ technology.name }}
                  </li>
            </ul>
    \`,
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('technologyState', [
        state('inactive', style({
          backgroundColor: '#f8bbd0',
          color: '#fff',
          transform: 'scale(1)'
        })),
        state('active', style({
          backgroundColor: '#ec407a',
          color: '#fff',
          transform: 'scale(1.3)'
        })),
        transition('inactive => active', animate('1000ms ease-in')),
        transition('active => inactive', animate('1000ms ease-out'))
      ])
    ]
  })
  export class TechnologyListBasicComponent {

    @Input() technologies: Technology[];

  }

// enter leave component
import { Component, Input } from '@angular/core';
  import { trigger, state, style, animate, transition } from '@angular/animations';

  import { Technology } from '../technology.service';

  @Component({
    selector: 'app-technology-list-enter-leave',
    template: \`
                <ul>
                      <li *ngFor="let technology of technologies"
                      [@flyInOut]="'in'">
                      {{ technology.name }}
                      </li>
                </ul>
    \`,
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('flyInOut', [
        state('in', style({transform: 'translateX(0)'})),
        transition('void => *', [
          style({transform: 'translateX(-100%)'}),
          animate(1000)
        ]),
        transition('* => void', [
          animate(1000, style({transform: 'translateX(100%)'}))
        ])
      ])
    ]
  })
  export class TechnologyListEnterLeaveComponent {
        @Input() technologies: Technology[];
  }

// styles transition component
import { Component, Input } from '@angular/core';
  import { trigger, style, animate, transition } from '@angular/animations';

  import { Technology } from '../technology.service';

  @Component({
    selector: 'app-technology-list-inline-styles',
    template: \`
              <ul>
                  <li *ngFor="let technology of technologies"
                       [@technologyState]="technology.state"
                       (click)="technology.toggleState()">
                  {{ technology.name }}
                  </li>
              </ul>
    \`,
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('technologyState', [
        transition('inactive => active', [
          style({
            backgroundColor: '#ffab91',
            transform: 'scale(1.3)'
          }),
          animate('3s ease-in', style({
            backgroundColor: '#ff3d00',
            transform: 'scale(1)'
          }))
        ])
      ])
    ]
  })
  export class TechnologyListInlineStylesComponent {
      @Input() technologies: Technology[];

  }

// combined transitions component
import { Component, Input } from '@angular/core';
  import { trigger, style, state, animate, transition } from '@angular/animations';

  import { Technology } from '../technology.service';

  @Component({
    selector: 'app-technology-list-combined-transitions',
    template: \`
    <ul>
        <li *ngFor="let technology of technologies"
             [@technologyState]="technology.state"
             (click)="technology.toggleState()">
        {{ technology.name }}
        </li>
    </ul>
  \`,
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('technologyState', [
      state('inactive', style({
        backgroundColor: '#ffe082',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#ff6f00',
        transform: 'scale(1.5)'
      })),
      transition('inactive => active, active => inactive',
      animate('3s ease-out'))
      ])
    ]
  })
  export class TechnologyListCombinedTransitionsComponent {
    @Input() technologies: Technology[];
  }

// two way transitions component
import { Component, Input } from '@angular/core';
  import { trigger, style, state, animate, transition } from '@angular/animations';

  import { Technology } from '../technology.service';

  @Component({
    selector: 'app-technology-list-twoway',
    template: \`
    <ul>
        <li *ngFor="let technology of technologies"
             [@technologyState]="technology.state"
             (click)="technology.toggleState()">
        {{ technology.name }}
        </li>
    </ul>
  \`,
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('technologyState', [
      state('inactive', style({
        backgroundColor: '#66bb6a',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#2e7d32',
        transform: 'scale(1.7)'
      })),
      transition('inactive <=> active',
      animate('2s ease-out'))
      ])
    ]
  })
  export class TechnologyListTwowayComponent {
    @Input() technologies: Technology[];

  }

// enter leave states component
import { Component, Input } from '@angular/core';
  import { trigger, state, style, animate, transition } from '@angular/animations';

  import { Technology } from './../technology.service';

  @Component({
    selector: 'app-technology-list-enter-leave-states',
    template: \`
            <ul>
                <li *ngFor="let technology of technologies"
                     (click)="technology.toggleState()"
                     [@technologyState]="technology.state">
                     {{ technology.name }}
                </li>
            </ul>
    \`,
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('technologyState', [
        state('inactive', style({transform: 'translateX(0) scale(1)'})),
        state('active', style({transform: 'translateX(0) scale(1.3)'})),
        transition('inactive => active', animate('1000ms ease-in')),
        transition('active => inactive', animate('1000ms ease-out')),
        transition('void => inactive', [
          style({transform: 'translateX(-100%) scale(1)'}),
          animate(1000)
        ]),
        transition('inactive => void', [
          style({transform: 'translateX(100%) scale(1)'}),
          animate(1000)
        ]),
        transition('void => inactive', [
          style({transform: 'translateX(0) scale(0)'}),
          animate(2000)
        ]),
        transition('active => void', [
          style({transform: 'translateX(0) scale(0)'}),
          animate(2000)
        ])
      ])
    ]
  })
  export class TechnologyListEnterLeaveStatesComponent {
    @Input() technologies: Technology[];

  }

// auto style calc component
import { Component, Input } from '@angular/core';
  import { trigger, state, style, animate, transition } from '@angular/animations';

  import { Technology } from '../technology.service';

  @Component({
    selector: 'app-technology-list-auto',
    template: \`
          <ul>
              <li *ngFor="let technology of technologies"
                   [@shrinkOut]="'in'">
                    {{ technology.name }}
              </li>
          </ul>
    \`,
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('shrinkOut', [
        state('in', style({height: '*'})),
        transition('* => void', [
          style({ height: '*' }),
          animate(2500, style({ height: 0}))
        ])
      ])
    ]
  })
  export class TechnologyListAutoComponent {
      @Input() technologies: Technology[];

  }

// different timings component
import { Component, Input } from '@angular/core';
  import { trigger, state, style, animate, transition } from '@angular/animations';

  import { Technology } from '../technology.service';

  @Component({
    selector: 'app-technology-list-timings',
    template: \`
                <ul>
                    <li *ngFor="let technology of technologies"
                          [@flyInOut]="'in'" (click)="technology.toggleState()">
                          {{ technology.name }}
                    </li>
                </ul>
    \`,
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('flyInOut', [
        state('in', style({ opacity: 1, transform: 'translateX(0)'})),
        transition('void => *', [
          style({
            opacity: 0,
            transform: 'translateX(-100%)'
          }),
          animate('0.9s ease-in')
        ]),
        transition('* => void', [
          animate('0.8s 0.6s ease-out', style({
            opacity: 0,
            transform: 'translateX(100%)'
          }))
        ])
      ])
    ]
  })
  export class TechnologyListTimingsComponent {
          @Input() technologies: Technology[];

  }

// multiple keyframes component
import { Component, Input } from '@angular/core';
import { trigger,
         state,
         animate,
         style,
         transition,
         keyframes,
         AnimationEvent } from '@angular/animations';

import { Technology } from '../technology.service';

@Component({
  selector: 'app-technology-list-multistep',
  template: \`
          <ul>
              <li *ngFor="let technology of technologies"
                   (@flyInOut.start)="animationStarted($event)"
                   (@flyInOut.done)="animationDone($event)"
                   [@flyInOut]="'in'">
              {{ technology.name }}
              </li>
          </ul>
  \`,
  styleUrls: ['../technology-list.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)'})),
      transition('void => *', [
        animate(800, keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(800, keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class TechnologyListMultistepComponent {
  @Input() technologies: Technology[];

  animationStarted(event: AnimationEvent): void {
    console.warn('Animation started: ', event);
  }

  animationDone(event: AnimationEvent): void {
    console.warn('Animation done: ', event);
  }

}

// parallel groups component
import { Component, Input } from '@angular/core';
  import { trigger,
           state,
           style,
           animate,
           transition,
           group } from '@angular/animations';

  import { Technology } from '../technology.service';

  @Component({
    selector: 'app-technology-list-groups',
    template: \`
              <ul>
                  <li *ngFor="let technology of technologies"
                       [@flyInOut]="'in'">
                  {{ technology.name }}
                  </li>
              </ul>
    \`,
    styles: [\`
      li {
        padding: 0 !important;
        text-align: center;
      }
    \`],
    styleUrls: ['../technology-list.css'],
    animations: [
      trigger('flyInOut', [
        state('in', style({ width: 190, transform: 'translateX(0)', opacity: 1 })),
        transition('void => *', [
          style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
          group([
            animate('0.9s 0.7s ease', style({
              transform: 'translateX(0)',
              width: 190
            })),
            animate('0.9s ease', style({
              opacity: 1
            }))
          ])
        ]),
        transition('* => void', [
          group([
            animate('0.9s 0.7s ease', style({
              transform: 'translateX(50px)',
              width: 190
            })),
            animate('0.9s 0.6s ease', style({
              opacity: 0
            }))
          ])
        ])
      ])
    ]
  })
  export class TechnologyListGroupsComponent {
    @Input() technologies: Technology[];
  }

// angular forms user input
// binding user input events
import { Component } from '@angular/core';

@Component({
  selector: 'app-click-me',
  template: \`
            <button (click)="onClickMe()">Click me!</button>
            {{ clickMessage }}
  \`,
  styleUrls: ['./click-me.component.css']
})
export class ClickMeComponent {
  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }

}

/******************************************************/

import { Component } from '@angular/core';

@Component({
selector: 'app-click-me2',
template: \`
    <button (click)="onClickMe2($event)">No! .. Click me!</button>
    {{ clickMessage }}
\`,
})
export class ClickMe2Component {
  clickMessage = '';
  clicks = 1;

  onClickMe2(event: any) {
    const eventMessage = event ? 'Event target is ' + event.target.tagName : '';
    this.clickMessage = (\`Click #\${this.clicks++}. \${eventMessage}\`);
  }

}

// user input $event object
import { Component } from '@angular/core';

  @Component({
    selector: 'app-key-up1',
    template: \`
            <input (keyup)="onKey($event)">
            <p>{{ values }}</p>
    \`
  })
  export class KeyUpComponent_v1 {
    values = '';

    // onKey(event: any) { // without type info
    //   this.values += event.target.value + ' | ';
    // }

    onKey(event: KeyboardEvent) { // with type info
          this.values += (<HTMLInputElement>event.target).value + ' | ';

    }

  }

  //////////////////////////////////////////////////////////////////////////

  @Component({
    selector: 'app-key-up2',
    template: \`
            <input #box (keyup)="onKey(box.value)">
            <p>{{ values }}</p>
    \`
  })
  export class KeyUpComponent_v2 {
    values = '';

    onKey(value: string) {
      this.values += value + ' | ';
    }

  }

  //////////////////////////////////////////////////////////////////////////

  @Component({
    selector: 'app-key-up3',
    template: \`
            <input #box (keyup.enter)="onEnter(box.value)">
            <p>{{ value }}</p>
    \`
  })
  export class KeyUpComponent_v3 {
    value = '';

    onEnter(value: string) {
      this.value = value;
    }

  }

  //////////////////////////////////////////////////////////////////////////

  @Component({
    selector: 'app-key-up4',
    template: \`
            <input #box (keyup.enter)="update(box.value)"
                        (blur)="update(box.value)">
            <p>{{ value }}</p>
    \`
  })
  export class KeyUpComponent_v4 {
    value = '';

    update(value: string) {
      this.value = value;
    }

  }

// user input template reference variable
import { Component } from '@angular/core';

@Component({
  selector: 'app-loop-back',
  template: \`
      <input #box (keyup)="0">
      <p>{{ box.value }}
  \`
})
export class LoopBackComponent { }

// little tour technologies
import { Component } from '@angular/core';

@Component({
  selector: 'app-little-tour',
  template: \`
        <input #newTechnology
              (keyup.enter)="add(newTechnology.value)"
              (blur)="add(newTechnology.value); newTechnology.value = '';">
        <button (click)="add(newTechnology.value)">Add</button>
        <ul>
            <li *ngFor="let technology of technologies">
                  {{ technology }}
            </li>
        </ul>

  \`
})
export class LittleTourComponent {
    technologies = ['Angular CLI 9', 'Angular 9',
                    'Angular Material 9', 'JavaScript', 'C#', 'Java'];

    add(newTechnology: string): void {
      if (newTechnology) {
      this.technologies.push(newTechnology);
      }
    }

}

// template driven forms, hero form component
import { Component } from '@angular/core';

  import { Hero } from '../hero';

  @Component({
    selector: 'app-hero-form',
    templateUrl: './hero-form.component.html',
    styleUrls: ['./hero-form.component.css']
  })
  export class HeroFormComponent {

    powers = ['Really Smart', 'Super Flexible',
              'Super Hot', 'Weather Changer'];

    model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

    submitted = false;

    onSubmit() {
      this.submitted = true;
    }

    newHero() {
      this.model = new Hero(42, '', '');
    }

    // TODO: remove this when we are done
    get diagnostic() { return JSON.stringify(this.model); }
  }

// hero form template
<div class="container">
  <h1>Hero Form</h1>
  <div [hidden]="submitted">
  <form #heroForm="ngForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name</label>
          <input type="text"
                 class="form-control"
                 id="name"
                 [(ngModel)]="model.name"
                 name="name"
                 #name="ngModel"
                 required>
          <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
                Name is required
          </div>
      </div>

      <div class="form-group">
          <label for="alterEgo">Alter Ego</label>
          <input type="text"
                 class="form-control"
                 [(ngModel)]="model.alterEgo"
                 name="alterEgo"
                 id="alterEgo">
      </div>

      <div class="form-group">
          <label for="power">Hero Power</label>
          <select class="form-control"
                  id="power"
                  [(ngModel)]="model.power"
                  name="power"
                  required>
            <option *ngFor="let pow of powers" [value]="pow">
                  {{ pow }}
            </option>
          </select>
      </div>

      <button type="submit" class="btn btn-success" [disabled]="!heroForm.form.valid">
        Submit
      </button>
      <button type="button" class="btn btn-default"
              (click)="newHero(); heroForm.reset();">
        New Hero
      </button>
  </form>
</div>
<div [hidden]="!submitted">
  <h2>You submitted the following:</h2>
  <div class="row">
    <div class="col-xs-3">Name</div>
    <div class="col-xs-9 pull-left">{{ model.name }}</div>
  </div>
  <div class="row">
      <div class="col-xs-3">Alter Ego</div>
      <div class="col-xs-9 pull-left">{{ model.alterEgo }}</div>
  </div>
  <div class="row">
      <div class="col-xs-3">Power</div>
      <div class="col-xs-9 pull-left">{{ model.power }}</div>
  </div>
  <br>
  <button class="btn btn-primary" (click)="submitted=false;">Edit</button>
</div>

<hr>
<input type="text" class="form-control" id="name" required
        [(ngModel)]="model.name" name="name">
        {{ model.name }}

<hr>
<input type="text" class="form-control" id="name"
       required
       [ngModel]="model.name"
       name="name"
       (ngModelChange)="model.name = $event">
       {{ model.name }}
<hr>
<input type="text" class="form-control" id="name"
       required
       [(ngModel)]="model.name"
       name="name"
       #spy>
       <br>{{ spy.className }}

</div>

// hero form css
.ng-valid[required], .ng-valid.required {
  border-left: 5px solid #42A948;
}

.ng-invalid:not(form) {
  border-left: 5px solid #a94442;
}

// reactive forms, initial reactive form module
import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule } from '@angular/forms';

  import { HeroDetail1Component } from './hero-detail1/hero-detail1.component';
  import { HeroDetail2Component } from './hero-detail2/hero-detail2.component';
  import { HeroDetail3Component } from './hero-detail3/hero-detail3.component';
  import { HeroDetail4Component } from './hero-detail4/hero-detail4.component';
  import { HeroDetail5Component } from './hero-detail5/hero-detail5.component';
  import { HeroDetail6Component } from './hero-detail6/hero-detail6.component';
  import { HeroDetail7Component } from './hero-detail7/hero-detail7.component';
  import { HeroDetail8Component } from './hero-detail8/hero-detail8.component';
  import { HeroDetail9Component } from './hero-detail9/hero-detail9.component';

  @NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule
    ],
    declarations: [
                    HeroDetail1Component,
                    HeroDetail2Component,
                    HeroDetail3Component,
                    HeroDetail4Component,
                    HeroDetail5Component,
                    HeroDetail6Component,
                    HeroDetail7Component,
                    HeroDetail8Component,
                    HeroDetail9Component
                  ],
    exports: [
               HeroDetail1Component,
               HeroDetail2Component,
               HeroDetail3Component,
               HeroDetail4Component,
               HeroDetail5Component,
               HeroDetail6Component,
               HeroDetail7Component,
               HeroDetail8Component,
               HeroDetail9Component
            ]
  })
  export class ReactiveModule { }

// data model
export class Hero {
  id = 0;
  name = '';
  addresses: Address[];
}

export class Address {
  street = '';
  city = '';
  state = '';
  zip = '';
}

export const heroes: Hero[] = [

    {
      id: 1,
      name: 'Thor',
      addresses: [
        { street: '123 Kurfürstendamm', city: 'Berlin', state: 'BE', zip: '13001'},
        { street: '123 Maximilian Straße', city: 'München', state: 'BA', zip: '88181'}
      ]
    },
    {
      id: 2,
      name: 'Tyr',
      addresses: [
        { street: '123 Elbchaussee', city: 'Hamburg', state: 'HH', zip: '61636'}
      ]
    },
    {
      id: 3,
      name: 'Freyja',
      addresses: []
    }
];

export const states = ['BE', 'BA', 'HH', 'BW'];

// just a form control
import { Component } from '@angular/core';
  import { FormControl } from '@angular/forms';

  @Component({
    selector: 'app-hero-detail1',
    template: \`
            <h2>Hero Detail</h2>
            <h3>
                  <i>
                      Just a FormControl
                  </i>
            </h3>
            <label class="center-block">Name:
                  <input class="form-control" [formControl]="name">
            </label>
    \`
  })
  export class HeroDetail1Component {
    name = new FormControl();

  }

 // form group
 import { Component } from '@angular/core';
 import { FormControl, FormGroup } from '@angular/forms';


 @Component({
   selector: 'app-hero-detail2',
   template: \`
             <h2>Hero Detail</h2>
               <h3>
                   <i>
                       FormControl in a FormGroup
                   </i>
               </h3>
             <form [formGroup]="heroForm" novalidate>
               <div class="form-group">
                   <label class="center-block">Name:
                       <input class="form-control" formControlName="name">
                   </label>
               </div>
             </form>
       <p>
           Form value: {{ heroForm.value | json }}
       </p>
       <p>
           Form status: {{ heroForm.status | json }}
       </p>
   \`
 })
 export class HeroDetail2Component  {
       heroForm = new FormGroup({
         name: new FormControl()
       });

 }

// form builder single control
import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  @Component({
    selector: 'app-hero-detail3',
    template: \`
            <h2>Hero Detail</h2>
              <h3>
                  <i>
                      FormGroup with a single FormControl using FormBuilder
                  </i>
              </h3>
            <form [formGroup]="heroForm" novalidate>
                  <div class="form-group">
                      <label class="center-block">Name:
                        <input class="form-control" formControlName="name">
                      </label>
                  </div>
            </form>
                <p>
                    Form value: {{ heroForm.value | json }}
                </p>
                  <p>
                    Form status: {{ heroForm.status | json }}
                  </p>

    \`
  })
  export class HeroDetail3Component  {
          heroForm: FormGroup;

          constructor(private formBuilder: FormBuilder) {
            this.createForm();
          }

          createForm() {
            this.heroForm = this.formBuilder.group({
              name: ['', Validators.required ]
            });
          }

  }

// form group with multiple controls
import { Component } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';

  import { states } from '../data-model';

  @Component({
    selector: 'app-hero-detail4',
    template: \`
                    <h2>Hero Detail</h2>
                    <h3>
                        <i>
                            A FormGroup with multiple FormControls
                        </i>
                    </h3>

                    <form [formGroup]="heroForm" novalidate>
                          <div class="form-group">
                            <label class="center-block">Name:
                                <input class="form-control" formControlName="name">
                            </label>
                          </div>
                          <div class="form-group">
                            <label class="center-block">Street:
                                <input class="form-control" formControlName="street">
                            </label>
                          </div>
                          <div class="form-group">
                            <label class="center-block">City:
                                <input class="form-control" formControlName="city">
                            </label>
                          </div>
                          <div class="form-group">
                            <label class="center-block">State:
                                <select class="form-control" formControlName="state">
                                      <option *ngFor="let state of states"
                                               [value]="state">
                                            {{ state }}
                                      </option>
                                </select>
                            </label>
                          </div>
                          <div class="form-group">
                            <label class="center-block">Zip Code:
                                <input class="form-control" formControlName="zip">
                            </label>
                          </div>
                          <div class="form-group radio">
                              <h4>Super Power:</h4>
                              <label class="center-block">
                                  <input type="radio"
                                  formControlName="power"
                                  value="flight">
                                  Flight
                              </label>
                              <label class="center-block">
                                  <input type="radio"
                                  formControlName="power"
                                  value="x-ray vision">
                                  X-Ray Vision
                              </label>
                              <label class="center-block">
                                  <input type="radio"
                                   formControlName="power"
                                    value="strength">
                                  Strength
                              </label>
                          </div>
                          <div class="checkbox">
                                  <label class="center-block">
                                        <input type="checkbox" formControlName="sidekick">
                                        I have a sidekick.
                                  </label>
                          </div>
                    </form>

                    <p>Form value: {{ heroForm.value | json }}</p>
    \`
  })
  export class HeroDetail4Component {
        heroForm: FormGroup;
        states = states;

        constructor(private formBuilder: FormBuilder) {
          this.createForm();
        }

        createForm() {
          this.heroForm = this.formBuilder.group({
            name: ['', Validators.required],
            street: '',
            city: '',
            state: '',
            zip: '',
            power: '',
            sidekick: ''
          });

        }

  }

// form builder group
import { Component } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';

  import { states } from '../data-model';


  @Component({
    selector: 'app-hero-detail5',
    template: \`
    <form [formGroup]="heroForm" novalidate>
          <div class="form-group">
            <label class="center-block">Name:
                <input class="form-control" formControlName="name">
            </label>
          </div>
        <div formGroupName="address" class="well well-lg">
          <h4>Secret Lair</h4>
          <div class="form-group">
            <label class="center-block">Street:
                <input class="form-control" formControlName="street">
            </label>
          </div>
          <div class="form-group">
            <label class="center-block">City:
                <input class="form-control" formControlName="city">
            </label>
          </div>
          <div class="form-group">
            <label class="center-block">State:
                <select class="form-control" formControlName="state">
                      <option *ngFor="let state of states"
                               [value]="state">
                            {{ state }}
                      </option>
                </select>
            </label>
          </div>
            <div class="form-group">
              <label class="center-block">Zip Code:
                <input class="form-control" formControlName="zip">
              </label>
            </div>
        </div>
          <div class="form-group radio">
              <h4>Super Power:</h4>
              <label class="center-block">
                  <input type="radio" formControlName="power" value="flight">
                  Flight
              </label>
              <label class="center-block">
                  <input type="radio" formControlName="power" value="x-ray vision">
                  X-Ray Vision
              </label>
              <label class="center-block">
                  <input type="radio" formControlName="power" value="strength">
                  Strength
              </label>
          </div>
          <div class="checkbox">
                  <label class="center-block">
                        <input type="checkbox" formControlName="sidekick">
                        I have a sidekick.
                  </label>
          </div>
    </form>

        <p>Form value: {{ heroForm.value | json }}</p>
        <h4>Extra info for the curious:</h4>
        <p>Name value: {{ heroForm.get('name').value }}</p>
        <p>Street value: {{ heroForm.get('address.street').value }}</p>
    \`
  })
  export class HeroDetail5Component  {
    heroForm: FormGroup;
    states = states;


    constructor(private formBuilder: FormBuilder) {
      this.createForm();
    }

    createForm() {
        this.heroForm = this.formBuilder.group({
          name: ['', Validators.required],
          address: this.formBuilder.group({
            street: '',
            city: '',
            state: '',
            zip: ''
          }),
          power: '',
          sidekick: ''
        });
    }

  }

// hero service
import { Injectable } from '@angular/core';

  import { Hero, heroes } from './data-model';

  import { Observable } from 'rxjs/Observable';
  import { of } from 'rxjs/observable/of';
  import 'rxjs/add/operator/delay';


  @Injectable({
    providedIn: 'root'
  })
  export class HeroService {
    delayMs = 1000;

    getHeroes(): Observable<Hero[]> {
      return of(heroes).delay(this.delayMs);
    }

    updateHero(hero: Hero): Observable<Hero> {
      const oldHero = heroes.find(h => h.id === hero.id);
      const newHero = Object.assign(oldHero, hero);
      return of(newHero).delay(this.delayMs);
    }

  }

// patch value
import { Component, Input, OnChanges } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  import { Hero, states } from '../data-model';

  @Component({
    selector: 'app-hero-detail6',
    template: \`
    <h2>Hero Detail</h2>
    <h3>
          <i>
              PatchValue to initialize a value
          </i>
    </h3>
    <form [formGroup]="heroForm" novalidate>
    <div class="form-group">
      <label class="center-block">Name:
          <input class="form-control" formControlName="name">
      </label>
    </div>
    <div formGroupName="address" class="well well-lg">
      <h4>Secret Lair</h4>
    <div class="form-group">
      <label class="center-block">Street:
          <input class="form-control" formControlName="street">
      </label>
    </div>
    <div class="form-group">
      <label class="center-block">City:
          <input class="form-control" formControlName="city">
      </label>
    </div>
    <div class="form-group">
      <label class="center-block">State:
          <select class="form-control" formControlName="state">
                <option *ngFor="let state of states"
                         [value]="state">
                      {{ state }}
                </option>
          </select>
      </label>
    </div>
      <div class="form-group">
        <label class="center-block">Zip Code:
          <input class="form-control" formControlName="zip">
        </label>
      </div>
    </div>
    <div class="form-group radio">
        <h4>Super Power:</h4>
        <label class="center-block">
            <input type="radio" formControlName="power" value="flight">
            Flight
        </label>
        <label class="center-block">
            <input type="radio" formControlName="power" value="x-ray vision">
            X-Ray Vision
        </label>
        <label class="center-block">
            <input type="radio" formControlName="power" value="strength">
            Strength
        </label>
    </div>
    <div class="checkbox">
            <label class="center-block">
                  <input type="checkbox" formControlName="sidekick">
                  I have a sidekick.
            </label>
    </div>
  </form>
  <p>Form value: {{ heroForm.value | json }}</p>
  \`
  })
  export class HeroDetail6Component implements OnChanges {
    @Input() hero: Hero;

    heroForm: FormGroup;
    states = states;


    constructor(private formBuilder: FormBuilder) {
      this.createForm();
    }

    createForm() {
      this.heroForm = this.formBuilder.group({
        name: ['', Validators.required ],
        address: this.formBuilder.group({
          street: '',
          city: '',
          state: '',
          zip: ''
        }),
        power: '',
        sidekick: ''
      });
    }

    ngOnChanges() {
      this.heroForm.reset();
      this.heroForm.patchValue({
        name: this.hero.name
      });
    }

  }

// app component host
import { Component, OnInit } from '@angular/core';

  import { HeroService } from './reactive/hero.service';
  import { Hero } from './reactive/data-model';

  import { Observable } from 'rxjs/Observable';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {

    heroes: Observable<Hero[]>;
    selectedHero: Hero;

    constructor(private heroService: HeroService) { }

    getHeroes() {
      this.heroes = this.heroService.getHeroes();
      this.selectedHero = undefined;
    }

    select(hero: Hero) {
      this.selectedHero = hero;
    }

    ngOnInit() {
      this.getHeroes();
    }

  }

// app component template
<div class="container">
<h1>Reactive Forms</h1>
<!-- <app-hero-detail1></app-hero-detail1>
<app-hero-detail2></app-hero-detail2>
<app-hero-detail3></app-hero-detail3>
<app-hero-detail4></app-hero-detail4>
<app-hero-detail5></app-hero-detail5> -->

<hr>
<nav>
  <button (click)="getHeroes()" class="btn btn-primary">
  Refresh
  </button>
  <a *ngFor="let hero of heroes | async" (click)="select(hero)">
            {{ hero.name }}
  </a>
</nav>
<div *ngIf="selectedHero">
<hr>
<h2>Hero Detail</h2>
<h3>Editing: {{ selectedHero.name }}</h3>
<app-hero-detail6 [hero]="selectedHero"></app-hero-detail6>
<!-- <app-hero-detail7 [hero]="selectedHero"></app-hero-detail7>
    <app-hero-detail8 [hero]="selectedHero"></app-hero-detail8> -->
</div>

</div>

// set value
import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hero, Address, states } from '../data-model';

@Component({
  selector: 'app-hero-detail7',
  template: \`
  <h2>Hero Detail</h2>
  <h3>
        <i>
            PatchValue to initialize a value
        </i>
  </h3>
  <form [formGroup]="heroForm" novalidate>
  <div class="form-group">
    <label class="center-block">Name:
        <input class="form-control" formControlName="name">
    </label>
  </div>
  <div formGroupName="address" class="well well-lg">
    <h4>Secret Lair</h4>
  <div class="form-group">
    <label class="center-block">Street:
        <input class="form-control" formControlName="street">
    </label>
  </div>
  <div class="form-group">
    <label class="center-block">City:
        <input class="form-control" formControlName="city">
    </label>
  </div>
  <div class="form-group">
    <label class="center-block">State:
        <select class="form-control" formControlName="state">
              <option *ngFor="let state of states"
                       [value]="state">
                    {{ state }}
              </option>
        </select>
    </label>
  </div>
    <div class="form-group">
      <label class="center-block">Zip Code:
        <input class="form-control" formControlName="zip">
      </label>
    </div>
  </div>
  <div class="form-group radio">
      <h4>Super Power:</h4>
      <label class="center-block">
          <input type="radio" formControlName="power" value="flight">
          Flight
      </label>
      <label class="center-block">
          <input type="radio" formControlName="power" value="x-ray vision">
          X-Ray Vision
      </label>
      <label class="center-block">
          <input type="radio" formControlName="power" value="strength">
          Strength
      </label>
  </div>
  <div class="checkbox">
          <label class="center-block">
                <input type="checkbox" formControlName="sidekick">
                I have a sidekick.
          </label>
  </div>
</form>

<p>Form value: {{ heroForm.value | json }}</p>
<h4>Extra info for the curious:</h4>
<p>Name value: {{ heroForm.get('name').value }}</p>

<p>Street value: {{ heroForm.get('address.street').value }}</p>
  \`
})
export class HeroDetail7Component implements OnChanges {
  @Input() hero: Hero;

  heroForm: FormGroup;
  states = states;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

   createForm() {
     this.heroForm = this.formBuilder.group({
       name: ['', Validators.required ],
       address: this.formBuilder.group(new Address()),
       power: '',
       sidekick: ''
     });
   }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address()
    });
  }

  ngOnChanges1() {
    this.heroForm.reset();
    this.heroForm.setValue({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address(),
      power: 'strength',
      sidekick: true
    });
  }

}


// form array add groups
import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hero, Address, states } from '../data-model';

@Component({
  selector: 'app-hero-detail8',
  template: \`
  <h3>
        <i>
            Using FormArray to add Groups
        </i>
  </h3>
  <form [formGroup]="heroForm" novalidate>
  <p>Form Changed: {{ heroForm.dirty }}</p>
  <div class="form-group">
    <label class="center-block">Name:
        <input class="form-control" formControlName="name">
    </label>
  </div>
  <div formArrayName="secretLairs" class="well well-lg">

  <div *ngFor="let address of secretLairs.controls; let i = index;" [formGroupName]="i">
  <h4>Address #{{ i + 1 }}</h4>

  <div style="margin-left: 1em;">
  <div class="form-group">
    <label class="center-block">Street:
        <input class="form-control" formControlName="street">
    </label>
  </div>
  <div class="form-group">
    <label class="center-block">City:
        <input class="form-control" formControlName="city">
    </label>
  </div>
  <div class="form-group">
    <label class="center-block">State:
        <select class="form-control" formControlName="state">
              <option *ngFor="let state of states"
                       [value]="state">
                    {{ state }}
              </option>
        </select>
    </label>
  </div>
    <div class="form-group">
      <label class="center-block">Zip Code:
        <input class="form-control" formControlName="zip">
      </label>
    </div>
  </div>
  <br>
</div>
<button (click)="addLair()" type="button">Add Secret Lair</button>
</div>
  <div class="form-group radio">
      <h4>Super Power:</h4>
      <label class="center-block">
          <input type="radio" formControlName="power" value="flight">
          Flight
      </label>
      <label class="center-block">
          <input type="radio" formControlName="power" value="x-ray vision">
          X-Ray Vision
      </label>
      <label class="center-block">
          <input type="radio" formControlName="power" value="strength">
          Strength
      </label>
  </div>
  <div class="checkbox">
          <label class="center-block">
                <input type="checkbox" formControlName="sidekick">
                I have a sidekick.
          </label>
  </div>
</form>

<p>Form value: {{ heroForm.value | json }}</p>
  \`
})
export class HeroDetail8Component implements OnChanges {
  @Input() hero: Hero;

  heroForm: FormGroup;
  states = states;


  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.logNameChanges();
  }

  createForm() {
    this.heroForm = this.formBuilder.group({
      name: [ '', Validators.required ],
      secretLairs: this.formBuilder.array([]),
      power: '',
      sidekick: ''
    });
  }

  logNameChanges() {
    // TODO ...
  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name
    });
    this.setAddresses(this.hero.addresses);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }

  setAddresses(addresses: Address[]) {
    const addressFormGroup = addresses.map(address => this.formBuilder.group(address));
    const addressFormArray = this.formBuilder.array(addressFormGroup);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  addLair() {
    this.secretLairs.push(this.formBuilder.group(new Address()));
  }

}


// final reactive forms component code
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
  import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

  import { Hero, Address, states } from '../data-model';
  import { HeroService } from '../hero.service';

  import { Subscription } from 'rxjs/Subscription';

  @Component({
    selector: 'app-hero-detail9',
    template: \`
      <form [formGroup]="heroForm" (ngSubmit)="onSubmit()" novalidate>
      <div style="margin-bottom: 1em;">
          <button type="submit"
                  [disabled]="heroForm.pristine"
                  class="btn btn-success">
          Save
          </button> &nbsp;
          <button type="reset"
                  (click)="revert()"
                  [disabled]="heroForm.pristine"
                  class="btn btn-danger">
          Revert
          </button>
      </div>
  <div class="form-group">
  <label class="center-block">Name:
    <input class="form-control" formControlName="name">
  </label>
  </div>
  <div formArrayName="secretLairs" class="well well-lg">
  <div *ngFor="let address of secretLairs.controls; let i = index;" [formGroupName]="i">
  <h4>Address #{{ i + 1 }}</h4>
  <div style="margin-left: 1em;">
  <div class="form-group">
  <label class="center-block">Street:
    <input class="form-control" formControlName="street">
  </label>
  </div>
  <div class="form-group">
  <label class="center-block">City:
    <input class="form-control" formControlName="city">
  </label>
  </div>
  <div class="form-group">
  <label class="center-block">State:
    <select class="form-control" formControlName="state">
          <option *ngFor="let state of states"
                   [value]="state">
                {{ state }}
          </option>
    </select>
  </label>
  </div>
  <div class="form-group">
  <label class="center-block">Zip Code:
    <input class="form-control" formControlName="zip">
  </label>
  </div>
  </div>
  <br>
  </div>
  <button (click)="addLair()" type="button">Add Secret Lair</button>
  </div>
  <div class="form-group radio">
  <h4>Super Power:</h4>
  <label class="center-block">
      <input type="radio" formControlName="power" value="flight">
      Flight
  </label>
  <label class="center-block">
      <input type="radio" formControlName="power" value="x-ray vision">
      X-Ray Vision
  </label>
  <label class="center-block">
      <input type="radio" formControlName="power" value="strength">
      Strength
  </label>
  </div>
  <div class="checkbox">
      <label class="center-block">
            <input type="checkbox" formControlName="sidekick">
            I have a sidekick.
      </label>
  </div>
  </form>

  <p>Form value: {{ heroForm.value | json }}</p>

  <h4>
        Name change log
  </h4>
  <div *ngFor="let change of nameChangeLog">{{ change }}</div>
    \`
  })
  export class HeroDetail9Component implements OnChanges, OnDestroy {
    @Input() hero: Hero;

    heroForm: FormGroup;
    nameChangeLog: string[] = [];
    states = states;

    private heroUpdateSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private heroService: HeroService) {
                  this.createForm();
                  this.logNameChanges();
                }

    createForm() {
      this.heroForm = this.formBuilder.group({
        name: '',
        secretLairs: this.formBuilder.array([]),
        power: '',
        sidekick: ''
      });
    }



    logNameChanges() {
      const nameControl = this.heroForm.get('name');
      nameControl.valueChanges.forEach(
        (value: string) => this.nameChangeLog.push(value)
      );
    }

    ngOnChanges() {
      this.heroForm.reset({
        name: this.hero.name
      });
      this.setAddresses(this.hero.addresses);
    }

    get secretLairs(): FormArray {
      return this.heroForm.get('secretLairs') as FormArray;
    }

    setAddresses(addresses: Address[]) {
      const addressFormGroup = addresses.map(address => this.formBuilder.group(address));
      const addressFormArray = this.formBuilder.array(addressFormGroup);
      this.heroForm.setControl('secretLairs', addressFormArray);
    }

    addLair() {
      this.secretLairs.push(this.formBuilder.group(new Address()));
    }

    onSubmit() {
      this.hero = this.prepareSaveHero();
      this.heroUpdateSubscription = this.heroService.updateHero(this.hero).subscribe();
      this.ngOnChanges();
    }

    prepareSaveHero() {
      const formModel = this.heroForm.value;

      const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
          (address: Address) => Object.assign({}, address)
      );

      const savedHero: Hero = {
        id: this.hero.id,
        name: formModel.name as string,
        addresses: secretLairsDeepCopy
      };
      return savedHero;
    }

    revert() {
      this.ngOnChanges();
    }

    logNameChange() {
      const nameControl = this.heroForm.get('name');
      nameControl.valueChanges.forEach((value: string) => {
            this.nameChangeLog.push(value);
      });

    }

    ngOnDestroy() {
      this.heroUpdateSubscription.unsubscribe();
    }

  }


// dynamic forms module
import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule } from '@angular/forms';

  import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
  import { DynamicFormQuestionComponent }
  from './dynamic-form-question/dynamic-form-question.component';

  @NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule
    ],
    declarations: [ DynamicFormComponent, DynamicFormQuestionComponent ],
    exports: [ DynamicFormComponent ]
  })
  export class DynamicFormsModule { }

// question service
import { Injectable } from '@angular/core';

  import { QuestionBase } from './question-base';
  import { DropDownQuestion } from './question-dropdown';
  import { TextboxQuestion } from './question-textbox';

  @Injectable({
    providedIn: 'root'
  })
  export class QuestionService {

    getQuestions() {

      const questions: QuestionBase<any>[] = [

          new DropDownQuestion({
            key: 'brave',
            label: 'Bravery Rating',
            options: [
              { key: 'solid', value: 'Solid' },
              { key: 'great', value: 'Great' },
              { key: 'good', value: 'Good' },
              { key: 'unproven', value: 'Unproven'}
            ],
            order: 3
          }),

          new TextboxQuestion({
            key: 'firstName',
            label: 'First name',
            value: 'Flash',
            required: true,
            order: 1
          }),

          new TextboxQuestion({
            key: 'emailAddress',
            label: 'Email',
            type: 'email',
            order: 2
          })
      ];

      return questions.sort((a, b) => a.order - b.order);
    }

  }

// question control service
import { Injectable } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';

  import { QuestionBase } from './question-base';

  @Injectable({
    providedIn: 'root'
  })
  export class QuestionControlService {

    constructor() { }

    toFormGroup(questions: QuestionBase<any>[]) {
      const group: any = {};

      questions.forEach(question => {
        group[question.key] = question.required ?
                          new FormControl(question.value || '', Validators.required) :
                          new FormControl(question.value || '');
      });
      return new FormGroup(group);
    }

  }

// question base
export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }

}

// textbox question
import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
        controlType = 'textbox';
        type: string;

        constructor(options: {} = {}) {
          super(options);
          this.type = options['type'] || '';
        }

}

// dropdown question
import { QuestionBase } from './question-base';


export class DropDownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: { key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }

}


// dynamic form question component
import { Component, Input } from '@angular/core';
  import { FormGroup } from '@angular/forms';

  import { QuestionBase } from '../question-base';

  @Component({
    selector: 'app-dynamic-form-question',
    template: \`
          <div [formGroup]="form">
            <label [attr.for]="question.key">{{ question.label }}</label>

            <div [ngSwitch]="question.controlType">
                <input *ngSwitchCase="'textbox'" [formControlName]="question.key"
                        [id]="question.key" [type]="question.type">

            <select [id]="question.key" *ngSwitchCase="'dropdown'"
                    [formControlName]="question.key">
                <option *ngFor="let opt of question.options" [value]="opt.key">
                      {{ opt.value }}
                </option>
            </select>
            </div>

          <div class="errorMessage" *ngIf="!isValid">{{ question.label }} is required</div>

          </div>
    \`
  })
  export class DynamicFormQuestionComponent {
    @Input() question: QuestionBase<any>;
    @Input() form: FormGroup;

    get isValid() {
      return this.form.controls[this.question.key].valid;
    }

  }


// dynamic form component
import { Component, Input, OnInit } from '@angular/core';
  import { FormGroup } from '@angular/forms';

  import { QuestionBase } from '../question-base';
  import { QuestionControlService } from '../question-control.service';

  @Component({
    selector: 'app-dynamic-form',
    template: \`
          <div>
              <form (ngSubmit)="onSubmit()" [formGroup]="form">
                  <div *ngFor="let question of questions" class="form-row">
                          <app-dynamic-form-question [question]="question" [form]="form">
                          </app-dynamic-form-question>
                  </div>
                  <div class="form-row">
                      <button type="submit" [disabled]="!form.valid">Save</button>
                  </div>
              </form>

              <div *ngIf="payLoad" class="form-row">
                  <strong>Saved the following values</strong>
                  <br>
                  {{ payLoad }}
              </div>

          </div>
    \`,
  })
  export class DynamicFormComponent implements OnInit {

    @Input() questions: QuestionBase<any>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor(private questionControlService: QuestionControlService) { }

    ngOnInit() {
      this.form = this.questionControlService.toFormGroup(this.questions);
    }

    onSubmit() {
      this.payLoad = JSON.stringify(this.form.value);
    }

  }

// app component host
import { Component, OnInit } from '@angular/core';

  import { QuestionService } from './dynamic-forms/question.service';


  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    questions: any[];

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
      this.questions = this.questionService.getQuestions();
    }

  }

// app component template
<div class="container">

<h1>Dynamic Forms</h1>
<app-dynamic-form [questions]="questions"></app-dynamic-form>

</div>

// higher order functions
technologies = [
  { name: 'Angular', githubStars: 50000, corporateBacked: true },
  { name: 'React', githubStars: 130000, corporateBacked: true },
  { name: 'VueJS', githubStars: 150000, corporateBacked: false }
];

technologiesAbove80K(): string[] {
    return this.technologies
                .filter((technology) => technology.githubStars >= 80000)
                .map(t => t.name);
}

technologiesCorporateBacked(): Array<string> {
      return this.technologies
                .filter((technology) => technology.corporateBacked === true)
                .map(tech => tech.name);
}

totalAllStars(): number {
  return this.technologies.reduce((acc, curr) => acc + curr.githubStars , 0);
}

totalStarsAbove80K(): number {
  return this.technologies.filter((technology) => technology.githubStars >= 80000)
                          .reduce((acc, curr) => acc + curr.githubStars, 0);
}


// form validation
// fobidden name validator directive
import { Directive, Input } from '@angular/core';
  import { AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

  // hero's name can't match given regular expression
  export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': { value: control.value }} : null;
    };
  }

  @Directive({
    selector: '[appForbiddenName]',
    providers: [{provide: NG_VALIDATORS,
                 useExisting: ForbiddenNameValidatorDirective,
                 multi: true }]
  })
  export class ForbiddenNameValidatorDirective {
    @Input() appForbiddenName: string;

    validate(control: AbstractControl): {[key: string]: any} {
      return this.appForbiddenName ?
      forbiddenNameValidator(new RegExp(this.appForbiddenName, 'i'))(control) : null;
    }

  }

// hero form template component
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-form-template',
  template: \`
      <div class="container">
            <h1>Template-DRIVEN Form</h1>
            <form #heroForm="ngForm">
                <div [hidden]="heroForm.submitted">

                <div class="form-group">
                  <label for="name">Name</label>
                  <input id="name" name="name" class="form-control"
                  required minlength="4" appForbiddenName="react"
                  [(ngModel)]="hero.name" #name="ngModel">

                  <div *ngIf="name.invalid && (name.dirty || name.touched)"
                        class="alert alert-danger">

                  <div *ngIf="name.errors.required">
                    Name is required.
                  </div>
                  <div *ngIf="name.errors.minlength">
                    Name must be at least 4 characters long.
                  </div>
                  <div *ngIf="name.errors.forbiddenName">
                    Name cannot be React.
                  </div>

                  </div>
                </div>

                <div class="form-group">
                    <label for="alterEgo">Alter Ego</label>
                    <input id="alterEgo" class="form-control"
                           name="alterEgo" [(ngModel)]="hero.alterEgo">
                </div>
                <div class="form-group">
                    <label for="power">Hero Power</label>
                    <select id="power" name="power" class="form-control"
                            required [(ngModel)]="hero.power" #power="ngModel">
                      <option *ngFor="let pows of powers" [value]="pows">
                            {{ pows }}
                      </option>
                    </select>

                    <div *ngIf="power.errors && power.touched" class="alert alert-danger">
                     <div *ngIf="power.errors.required">Power is required</div>
                    </div>
                </div>

                <button type="submit" class="btn btn-default"
                        [disabled]="heroForm.invalid">
                Submit
                </button>
                <button type="button" class="btn btn-default"
                        (click)="heroForm.resetForm({})">
                Reset
                </button>
              </div>

              <div class="submitted-message" *ngIf="heroForm.submitted">
                  <p>You've submitted your hero, {{ heroForm.value.name }}!</p>
                  <button (click)="heroForm.resetForm({})">Add new hero</button>
              </div>
            </form>
      </div>
  \`
})
export class HeroFormTemplateComponent {

  powers = ['Really Smart', 'Super Hot', 'Game Changer'];

  hero = {
    name: 'Nils',
    alterEgo: 'Flash',
    power: this.powers[2]
  };

}


// hero form reactive component
import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';

  import { forbiddenNameValidator } from '../forbidden-name.directive';

  @Component({
    selector: 'app-hero-form-reactive',
    template: \`
                <div class="container">
                  <h1>Reactive Form</h1>
                  <form [formGroup]="heroForm" #formDir="ngForm">
                      <div [hidden]="formDir.submitted">
                          <div class="form-group">
                              <label for="name">Name</label>
                              <input id="name" class="form-control"
                                      formControlName="name" required>
                              <div *ngIf="name.invalid && (name.dirty || name.touched)"
                                    class="alert alert-danger">
                              <div *ngIf="name.errors.required">
                                Name is required.
                              </div>
                              <div *ngIf="name.errors.minlength">
                                Name must be at least 4 characters long.
                              </div>
                              <div *ngIf="name.errors.forbiddenName">
                                Name cannot be React.
                              </div>
                          </div>
                      </div>

                      <div class="form-group">
                            <label for="alterEgo">Alter Ego</label>
                            <input id="alterEgo"
                                   class="form-control"
                                   formControlName="alterEgo">
                      </div>

                      <div class="form-group">
                            <label for="power">Hero Power</label>
                            <select id="power" class="form-control"
                                    formControlName="power" required>
                                <option *ngFor="let pow of powers" [value]="pow">
                                  {{ pow }}
                                </option>
                            </select>

                            <div *ngIf="power.invalid && power.touched"
                                  class="alert alert-danger">
                                  <div *ngIf="power.errors.required">Power is required</div>
                            </div>
                      </div>

                      <button type="submit" class="btn btn-default"
                              [disabled]="heroForm.invalid">
                        Submit
                      </button>
                      <button type="button" class="btn btn-default"
                              (click)="formDir.resetForm({})">
                        Reset
                      </button>
                      </div>
                  </form>

                <div class="submitted-message" *ngIf="formDir.submitted">
                  <p>You've submitted your hero, {{ heroForm.value.name }}!</p>
                  <button (click)="formDir.resetForm({})">Add new hero</button>
                </div>
              </div>
    \`
  })
  export class HeroFormReactiveComponent implements OnInit {

    heroForm: FormGroup;

    powers = ['Really Flexible', 'Super Smart', 'Game Changer'];

    hero = {
        name: 'Carmen',
        alterEgo: 'Wonderwoman',
        power: this.powers[1]
      };

    ngOnInit(): void {
      this.heroForm = new FormGroup({
        'name': new FormControl(this.hero.name, [
          Validators.required,
          Validators.minLength(4),
          forbiddenNameValidator(/react/i)
        ]),
        'alterEgo': new FormControl(this.hero.alterEgo),
        'power': new FormControl(this.hero.power, Validators.required)
      });
    }

    get name() {
        return this.heroForm.get('name');
    }

    get power() {
      return this.heroForm.get('power');
    }

  }

  // quality input
  * create new angular/react/vuejs apps
  * code with passion
  * code all the time
  * write new angular/react/vuejs tutorials
  * write new blog posts
  * build new libraries
  * learn a new technique
  * read a new technical book
  * have fun and enjoy yourself!!!

  `,
  blockQuote: `
  Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
  sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
  und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
  und eine die wir vorhaben zu gewinnen.
  `,
  imageFooterUrl: 'assets/img/post7.jpg',
  footerQuote: 'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.'
},
{
  id: 8,
  imageHeaderUrl: 'url(assets/img/post8-bg.jpg)',
  heading: 'Angular 8/9, Basis- Teil 2',
  subHeading: 'DI, HTTP, Routing, QR, Testing, TS',
  metaPublishedDate: 'am 26 Dezember, 2019',
  sectionHeading: 'Dependency Injection, Http Client, Routing, Quick Reference, Testing, Typescript',
  code: `
// in memory collection
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 11, isSecret: false, name: 'Odin' },
  { id: 12, isSecret: false, name: 'Thor' },
  { id: 13, isSecret: false, name: 'Frigg' },
  { id: 14, isSecret: false, name: 'Freyja' },
  { id: 15, isSecret: false, name: 'Heimdall' },
  { id: 16, isSecret: false, name: 'Loki' },
  { id: 17, isSecret: false, name: 'Baldur' },
  { id: 18, isSecret: true, name: 'Tyr' },
  { id: 19, isSecret: true, name: 'Mani' },
  { id: 20, isSecret: true, name: 'Sol' }
];


// hero class

export class Hero {
  id: number;
  name: string;
  isSecret = false;
}

// logger service
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Logger {
  logs: string[] = [];

  log(message: string): void {
    this.logs.push(message);
    console.log(message);
  }

}

// user service
import { Injectable } from '@angular/core';

export class User {
  constructor(public name: string, public isAuthorized = false) {}
}

const flash = new User('Flash', true);
const nils = new User('Nils-Holger', false);


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = nils;

  getNewUser() {
    this.user = this.user === nils ? flash : nils;
  }

}

// hero service
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private logger: Logger, private isAuthorized: boolean) { }


  getHeroes() {
    const auth = this.isAuthorized ? 'authorized' : 'unauthorized';
    this.logger.log(\`Getting heroes for \${auth} user.\`);
    return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
  }

}

// hero service provider
/* tslint:disable:one-line */
import { HeroService } from './hero.service';
import { Logger } from '../logger.service';
import { UserService } from '../user.service';

const heroServiceFactory = (logger: Logger, userService: UserService) => {
      return new HeroService(logger, userService.user.isAuthorized);
};

export const heroServiceProvider =
        {
          provide: HeroService,
          useFactory: heroServiceFactory,
          deps: [ Logger, UserService ]
        };


// hero list component
/* tslint:disable:one-line */
  import { Component } from '@angular/core';

  import { Hero } from './hero';
  import { HeroService } from './hero.service';

  @Component({
    selector: 'app-hero-list',
    template:  \`
          <div *ngFor="let hero of heroes">
                {{ hero.id }} - {{ hero.name }}
                ({{ hero.isSecret ? 'secret' : 'public' }})
          </div>
    \`
  })
  export class HeroListComponent {
    heroes: Hero[];

    constructor(heroService: HeroService)
    {
        this.heroes = heroService.getHeroes();
    }

  }

// heroes component
import { Component } from '@angular/core';
  import { heroServiceProvider } from './hero.service.provider';

  @Component({
    selector: 'app-heroes',
    template: \`
              <h2>Heroes</h2>
              <app-hero-list></app-hero-list>
    \`
  })
  export class HeroesComponent { }


// car service
import { Injectable } from '@angular/core';

  export class Engine {
    public cylinders = 4;
  }

  export class Tires {
    public make = 'Flinstone';
    public model = 'Square';
  }


  @Injectable({
    providedIn: 'root'
  })
  export class Car {
    public description = 'DI';

    constructor(public engine: Engine, public tires: Tires) { }

    drive() {
      return \`\${this.description} car with \` +
            \`\${this.engine.cylinders} cylinders and \${this.tires.make} tires.\`;
    }

  }

// car no dependency injection
import { Engine, Tires } from './car';

export class Car {
  public engine: Engine;
  public tires: Tires;
  public description = 'No DI';

  constructor() {
    this.engine = new Engine();
    this.tires = new Tires();
  }


  drive() {
    return \`\${this.description} car with \` +
    \`\${this.engine.cylinders} cylinders and \${this.tires.make} tires.\`;
  }

}


// car injector
import { ReflectiveInjector } from '@angular/core';

import { Car, Engine, Tires } from './car';
import { Logger } from '../logger.service';

export function useInjector() {
  let injector: ReflectiveInjector;

  injector = ReflectiveInjector.resolveAndCreate([Car, Engine, Tires]);
  const car = injector.get(Car);
  car.description = 'Injector';

  injector = ReflectiveInjector.resolveAndCreate([Logger]);
  const logger = injector.get(Logger);
  logger.log('Injector car.drive() said: ' + car.drive());
  return car;
}

// car factory
import { Engine, Tires, Car } from './car';

  // BAD PATTERN
  export class CarFactory {

    createCar() {
      const car = new Car(this.createEngine(), this.createTires());
      car.description = 'Factory';
      return car;
    }

    createEngine() {
      return new Engine();
    }

    createTires() {
      return new Tires();
    }

  }

// car creations
// example with car and engine variations

import { Car, Engine, Tires } from './car';

// example 1
export function simpleCar() {
  const car = new Car(new Engine(), new Tires());
  car.description = 'Simple';
  return car;
}

// example 2
class Engine2 {
  constructor(public cylinders: number) { }
}

export function superCar() {
  const bigCylinders = 12;
  const car = new Car(new Engine2(bigCylinders), new Tires());
  car.description = 'Super';
  return car;
}

// example 3
class MockEngine extends Engine {
  cylinders = 8;
}
class MockTires extends Tires {
  make = 'YokoGoodStone';
}

export function testCar() {
  const car = new Car(new MockEngine(), new MockTires());
  car.description = 'Test';
  return car;
}


// injector component
import { Component, Injector, OnInit } from '@angular/core';

  import { Car, Engine, Tires } from '../car/car';
  import { Hero } from '../heroes/hero';
  import { HeroService } from '../heroes/hero.service';
  import { heroServiceProvider } from '../heroes/hero.service.provider';
  import { Logger } from '../logger.service';

  @Component({
    selector: 'app-injectors',
    template: \`
          <h2>Other Injections</h2>
          <div id="car">{{ car.drive() }}</div>
          <div id="hero">{{ hero.name }}</div>
          <div id="rodent">{{ rodent }}</div>
  \`
  })
  export class InjectorComponent implements OnInit {
    car: Car;

    heroService: HeroService;
    hero: Hero;

    constructor(private injector: Injector) { }

    ngOnInit() {
      this.car = this.injector.get(Car);
      this.heroService = this.injector.get(HeroService);
      this.hero = this.heroService.getHeroes()[0];
    }

    get rodent() {
      const rousDontExist = \`R.O.U.S.'s? I don't think they exist\`;
      return this.injector.get(ROUS, rousDontExist);
    }

  }

  class ROUS {}


// test component
import { Component } from '@angular/core';

import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';
import { HeroListComponent } from '../heroes/hero-list.component';

@Component({
  selector: 'app-tests',
  template: \`
        <h2>Tests</h2>
        <p id="tests">Tests {{ results.pass }}: {{ results.message }}</p>
  \`
})
export class TestComponent {
  results = runTests();

}

function runTests() {
  const expectedHeroes = [ { name: 'Carmen' }, { name: 'Nils' } ];
  const mockService = <HeroService> { getHeroes: () => expectedHeroes };

  it('should have heroes when HeroListComponent created', () => {
    const component = new HeroListComponent(mockService);
    expect(component.heroes.length).toEqual(expectedHeroes.length);
  });
  return testResults;
}

let testName = '';
let testResults = { pass : '', message : ''};

function expect(actual: any) {
  return {
    toEqual: function(expected: any) {
      testResults = actual === expected ?
          { pass: 'passed', message: testName } :
          { pass: 'failed',
          message: \`\${testName}; expected \${actual} to equal \${expected}.\`};
    }
  };
}

function it(label: string, test: () => void) {
  testName = label;
  test();
}


// providers component
import { Component, Inject, Injectable, OnInit } from '@angular/core';

  import { AppConfig, APP_CONFIG, HERO_DI_CONFIG } from '../app.config';

  import { HeroService } from '../heroes/hero.service';
  import { heroServiceProvider } from '../heroes/hero.service.provider';

  import { Logger } from '../logger.service';
  import { UserService } from '../user.service';

  const template = \`{{ log }}\`;

  @Component({
    selector: 'app-provider-1',
    template: template,
    providers: [ Logger ]
  })
  export class Provider1Component {
    log: string;
    constructor(logger: Logger) {
      logger.log('hi from logger provided with logger class');
      this.log = logger.logs[0];
    }
  }

  ////////////////////////////////////////////////////////////

  @Component({
    selector: 'app-provider-3',
    template: template,
    providers: [ { provide: Logger, useClass: Logger } ]
  })
  export class Provider3Component {
    log: string;
    constructor(logger: Logger) {
      logger.log('hi from logger provided with useClass: Logger');
      this.log = logger.logs[0];
    }
  }

  ////////////////////////////////////////////////////////////
  export class BetterLogger extends Logger { }

  @Component({
    selector: 'app-provider-4',
    template: template,
    providers: [ { provide: Logger, useClass: BetterLogger } ]
  })
  export class Provider4Component {
    log: string;
    constructor(logger: Logger) {
      logger.log('hi from logger provided with useClass: BetterLogger');
      this.log = logger.logs[0];
    }
  }

  ////////////////////////////////////////////////////////////

  @Injectable()
  export class EvenBetterLogger extends Logger {
    constructor(private userService: UserService) { super(); }

    log(message: string): void {
      const name = this.userService.user.name;
      super.log(\`Message to \${name}: \${message}\`);
    }

  }

  @Component({
    selector: 'app-provider-5',
    template: template,
    providers: [ UserService, { provide: Logger, useClass: EvenBetterLogger } ]
  })
  export class Provider5Component {
    log: string;
    constructor(logger: Logger) {
      logger.log('hi from EvenBetter logger');
      this.log = logger.logs[0];
    }
  }

  ////////////////////////////////////////////////////////////

  export class NewLogger extends Logger { }

  export class OldLogger {
    logs: string[] = [];
    log(message: string): void {
      throw new Error('Should not call the old logger!');
    }
  }

  @Component({
    selector: 'app-provider-6a',
    template: template,
    providers: [ NewLogger, { provide: OldLogger, useClass: NewLogger } ]
  })
  export class Provider6aComponent {
    log: string;
    constructor(newLogger: NewLogger, oldLogger: OldLogger) {
      if (newLogger === oldLogger) {
        throw new Error('expected the two loggers to be different instances.');
      }
      oldLogger.log('hi oldlogger (but we want newlogger)');
      this.log = newLogger.logs[0] || oldLogger.logs[0];
    }
  }

  ////////////////////////////////////////////////////////////

  @Component({
    selector: 'app-provider-6b',
    template: template,
    providers: [ NewLogger, { provide: OldLogger, useExisting: NewLogger } ]
  })
  export class Provider6bComponent {
    log: string;
    constructor(newLogger: NewLogger, oldLogger: OldLogger) {
      if (newLogger !== oldLogger) {
        throw new Error('expected the tow loggers to be the same instance');
      }
      oldLogger.log('hi from newlogger (via aliased oldlogger)');
      this.log = newLogger.logs[0];
    }
  }

  ////////////////////////////////////////////////////////////

  export function SilentLoggerFn() { }

  const silentLogger = {
    logs: ['Silent logger says "shhhhhh!", provided with "usevalue"'],
    log: SilentLoggerFn
  };

  @Component({
    selector: 'app-provider-7',
    template: template,
    providers: [ { provide: Logger, useValue: silentLogger } ]
  })
  export class Provider7Component {
    log: string;
    constructor(logger: Logger) {
      logger.log('hi from logger provided with usevalue');
      this.log = logger.logs[0];
    }
  }

  ////////////////////////////////////////////////////////////

  @Component({
    selector: 'app-provider-8',
    template: template,
    providers: [ heroServiceProvider, Logger, UserService ]
  })
  export class Provider8Component {
    log = 'hero service injected successfully via heroserviceprovider';
    constructor(heroService: HeroService) { }
  }

  ////////////////////////////////////////////////////////////

  @Component({
    selector: 'app-provider-9',
    template: template,
    providers: [ { provide: APP_CONFIG, useValue: HERO_DI_CONFIG } ]
  })
  export class Provider9Component implements OnInit {
    log: string;
    constructor(@Inject(APP_CONFIG) private config: AppConfig ) { }

    ngOnInit() {
      this.log = 'app-config application title is ' + this.config.title;
    }
  }

  ////////////////////////////////////////////////////////////

  import { Optional } from '@angular/core';

  const some_message = 'hi from injected logger';

  @Component({
    selector: 'app-provider-10',
    template: template,
    providers: [ { provide: Logger, useValue: null } ]
  })
  export class Provider10Component implements OnInit {
    log: string;
    constructor( @Optional() private logger: Logger) {
      if (this.logger) {
        this.logger.log(some_message);
      }
    }

    ngOnInit() {
      this.log = this.logger ? this.logger.logs[0] : 'Optional logger was not available';
    }


  }

  ////////////////////////////////////////////////////////////

  @Component({
    selector: 'app-providers',
    template: \`
      <h2>Provider Variations</h2>
      <div id="p1"><app-provider-1></app-provider-1></div>
      <div id="p3"><app-provider-3></app-provider-3></div>
      <div id="p4"><app-provider-4></app-provider-4></div>
      <div id="p5"><app-provider-5></app-provider-5></div>
      <div id="p6a"><app-provider-6a></app-provider-6a></div>
      <div id="p6b"><app-provider-6b></app-provider-6b></div>
      <div id="p7"><app-provider-7></app-provider-7></div>
      <div id="p8"><app-provider-8></app-provider-8></div>
      <div id="p9"><app-provider-9></app-provider-9></div>
      <div id="p10"><app-provider-10></app-provider-10></div>
    \`
  })
  export class ProvidersComponent { }


// providers module
import { NgModule } from '@angular/core';

  import {
    Provider1Component,
    Provider3Component,
    Provider4Component,
    Provider5Component,
    Provider6aComponent,
    Provider6bComponent,
    Provider7Component,
    Provider8Component,
    Provider9Component,
    Provider10Component,
    ProvidersComponent
  } from './providers.component';

  @NgModule({
    declarations: [
          Provider1Component,
          Provider3Component,
          Provider4Component,
          Provider5Component,
          Provider6aComponent,
          Provider6bComponent,
          Provider7Component,
          Provider8Component,
          Provider9Component,
          Provider10Component,
          ProvidersComponent
    ],
    exports: [ ProvidersComponent ]
  })
  export class ProvidersModule { }


// app module
import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { ProvidersModule } from './providers/providers.module';

  import { AppComponent } from './app.component';
  import { APP_CONFIG, HERO_DI_CONFIG } from './app.config';
  import { HeroListComponent } from './heroes/hero-list.component';
  import { HeroesComponent } from './heroes/heroes.component';
  import { CarComponent } from './car/car.component';
  import { InjectorComponent } from './injector/injector.component';
  import { TestComponent } from './test/test.component';

  import { Logger } from './logger.service';
  import { UserService } from './user.service';



  @NgModule({
    declarations: [
      AppComponent,
      HeroListComponent,
      HeroesComponent,
      CarComponent,
      InjectorComponent,
      TestComponent
    ],
    imports: [
      BrowserModule,
      ProvidersModule
    ],
    providers: [ Logger, UserService, { provide: APP_CONFIG, useValue: HERO_DI_CONFIG} ],
    bootstrap: [ AppComponent ]
  })
  export class AppModule { }


// app component
import { Component, Inject } from '@angular/core';

  import { AppConfig } from './app-config';
  import { APP_CONFIG } from './app.config';
  import { UserService } from './user.service';

  @Component({
    selector: 'app-root',
    template: \`
            <h1>{{ title }}</h1>
            <app-car></app-car>
            <app-injectors><app-injectors>
            <app-tests><app-tests>
            <h2>User</h2>
            <p id="user">
            {{ userInfo }}
              <button (click)="nextUser()">Next User</button>
            </p>

            <app-heroes id="authorized" *ngIf="isAuthorized"></app-heroes>
            <app-heroes id="unauthorized" *ngIf="!isAuthorized"></app-heroes>
            <app-providers></app-providers>

    \`
  })
  export class AppComponent {
   title: string;

    constructor(@Inject(APP_CONFIG) config: AppConfig, private userService: UserService) {
            this.title = config.title;
    }

    get isAuthorized() {
      return this.user.isAuthorized;
    }

    nextUser() {
      this.userService.getNewUser();
    }

    get user() {
      return this.userService.user;
    }

    get userInfo() {
      return \`Current user, \${this.user.name}, is \` +
      \`\${this.isAuthorized ? '' : 'not'} authorized.\`;
    }

}


// httpclient
// inmemory data service
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Odin' },
      { id: 12, name: 'Thor' },
      { id: 13, name: 'Tyr' },
      { id: 14, name: 'Frigg' },
      { id: 15, name: 'Freyja' },
      { id: 16, name: 'Loki' },
      { id: 17, name: 'Baldur' },
      { id: 18, name: 'Mani' }
    ];
    return { heroes };
  }

}


// heroes service
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'applications/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  heroesUrl = 'api/heroes';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(catchError(this.handleError('getHeroes', [])));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    const options = term ? { params: new HttpParams().set('name', term) } : {};
    return this.http.get<Hero[]>(this.heroesUrl, options)
                    .pipe(catchError(this.handleError('searchHeroes', [])));
  }


  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
                    .pipe(
                      catchError(this.handleError('addHero', hero))
                    );
  }

  deleteHero(id: number): Observable<{}> {
    const url = \`\${this.heroesUrl}/\${id}\`;
    return this.http.delete(url, httpOptions)
                    .pipe(
                      catchError(this.handleError('deleteHero'))
                    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
                    .pipe(catchError(this.handleError('updateHero', hero))
          );
  }

}


// heroes component
import { Component, OnInit, OnDestroy } from '@angular/core';

  import { Hero } from './hero';
  import { HeroesService } from './heroes.service';

  import { Subscription } from 'rxjs/Subscription';

  @Component({
    selector: 'app-heroes',
    template: \`
              <h3>Heroes</h3>
              <div>
                  <label>Hero name:
                        <input #heroName>
                  </label>
                  <button (click)="add(heroName.value); heroName.value = '';">
                    Add
                  </button>
                  <button (click)="search(heroName.value)">
                    Search
                  </button>
              </div>

              <ul class="heroes">
                    <li *ngFor="let hero of heroes">
                          <a (click)="edit(hero)">
                              <span class="badge">{{ hero.id || -1}}</span>
                              <span *ngIf="hero !== editHero">{{ hero.name }}</span>
                              <input *ngIf="hero === editHero" [(ngModel)]="hero.name"
                              (blur)="update()" (keyup.enter)="update()">
                          </a>
                      <button class="delete" title="delete hero" (click)="delete(hero)">
                      x
                      </button>
                    </li>
              </ul>
    \`,
    styleUrls: ['./heroes.component.css']
  })
  export class HeroesComponent implements OnInit, OnDestroy {
      heroes: Hero[];
      editHero: Hero;
      heroesSubscription: Subscription;

      constructor(private heroesService: HeroesService) { }

      ngOnInit() {
        this.getHeroes();
      }

      getHeroes(): void {
        this.heroesSubscription = this.heroesService.getHeroes()
                                  .subscribe(heroes => this.heroes = heroes);
      }

      add(name: string): void {
        this.editHero = undefined;
        name = name.trim();
        if (!name) { return; }

        const newHero: Hero = { name } as Hero;
        this.heroesSubscription = this.heroesService.addHero(newHero)
                                  .subscribe(hero => this.heroes.push(hero));
      }

      delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroesSubscription = this.heroesService.deleteHero(hero.id).subscribe();
      }

      edit(hero) {
        this.editHero = hero;
      }

      search(searchTerm: string) {
        this.editHero = undefined;
        if (searchTerm) {
          this.heroesSubscription = this.heroesService.searchHeroes(searchTerm)
                            .subscribe(heroes => this.heroes = heroes);
        }
      }

      update() {
        if (this.editHero) {
          this.heroesSubscription =
          this.heroesService.updateHero(this.editHero).subscribe(hero => {
                const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
                if (ix > -1) { this.heroes[ix] = hero; }

          });
          this.editHero = undefined;
        }
      }

      ngOnDestroy() {
        this.heroesSubscription.unsubscribe();
      }

  }


// heroes component css
/* HeroesComponent's private CSS styles */

.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  position: relative;
  cursor: pointer;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
  width: 19em;
}

.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}

.heroes a {
  color: #888;
  text-decoration: none;
  position: relative;
  display: block;
  width: 250px;
}

.heroes a:hover {
  color:#607D8B;
}

.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  min-width: 16px;
  text-align: right;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}

.button {
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
  font-family: Arial;
}

button:hover {
  background-color: #cfd8dc;
}

button.delete {
  position: relative;
  left: 24em;
  top: -32px;
  background-color: gray !important;
  color: white;
  display: inherit;
  padding: 5px 8px;
  width: 2em;
}

input {
  font-size: 100%;
  margin-bottom: 2px;
  width: 11em;
}

.heroes input {
  position: relative;
  top: -3px;
  width: 12em;
}


// message service
import { Injectable } from '@angular/core';


  @Injectable({
    providedIn: 'root'
  })
  export class MessageService {
    messages: string[] = []; // empty

    add(message: string) {
      this.messages.push(message);
    }

    clear() {
      this.messages = [];
    }

  }


// message component
import { Component } from '@angular/core';
  import { MessageService } from '../message.service';

  @Component({
    selector: 'app-messages',
    template: \`
        <div *ngIf="messageService.messages.length">
                <h3>Messages</h3>
                <button class="clear" (click)="messageService.clear()">clear</button>
                <br>
                <ol>
                  <li *ngFor="let message of messageService.messages">{{ message }}</li>
                </ol>
        </div>
    \`
  })
  export class MessagesComponent {

    constructor(public messageService: MessageService) { }

  }


// assets/config.json
{
  "heroesUrl": "api/heroes",
  "textfile": "assets/textfile.txt"
}


// assets/textfile.txt
<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ng5-http-client</title>
    <base href="/">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>
  <body>
    <app-root></app-root>
  </body>
  </html>


// config service
import { Injectable } from '@angular/core';
  import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

  import { Observable } from 'rxjs/Observable';
  import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
  import { catchError, retry } from 'rxjs/operators';

  export interface Config {
    heroesUrl: string;
    textfile: string;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class ConfigService {
    configUrl = 'assets/config.json';

    constructor(private http: HttpClient) { }

    getConfig() {
      return this.http.get<Config>(this.configUrl)
                      .pipe(
                        retry(3),
                        catchError(this.handleError)
                      );
    }

    getConfig_1() {
      return this.http.get(this.configUrl);
    }

    getConfig_2() {
      return this.http.get<Config>(this.configUrl);
    }

    getConfig_3() {
      return this.http.get<Config>(this.configUrl)
                      .pipe(
                        catchError(this.handleError)
                      );
    }

    getConfigResponse(): Observable<HttpResponse<Config>> {
      return this.http.get<Config>(
              this.configUrl, { observe: 'response'}
      );
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occured:', error.error.message);
      } else {
        console.error(
          \`Backend returned code \${error.status}, \` +
          \`body was \${error.error}\`
        );
      }
      return new ErrorObservable('Something bad happened; please try again later.');
    }

    makeIntentionalError() {
      return this.http.get('not/a/real/url')
                       .pipe(
                         catchError(this.handleError)
                       );
    }

  }

// config component
import { Component, OnDestroy } from '@angular/core';

import { ConfigService, Config } from './config.service';
import { MessageService } from '../message.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-config',
  template: \`
      <h3>Get configuration from JSON file</h3>
      <div>
              <button (click)="clear(); showConfig();">get</button>
              <button (click)="clear(); showConfigResponse()">getResponse</button>
              <button (click)="clear();">clear</button>
              <button (click)="clear(); makeError();">error</button>
            <span *ngIf="config">
                      <p>Heroes API URL is "{{ config.heroesUrl }}"</p>
                      <p>Textfile URL is "{{ config.textfile }}"</p>
              <div *ngIf="headers">
                  Response headers:
                  <ul>
                      <li *ngFor="let header of headers">{{ header }}</li>
                  </ul>
              </div>
            </span>
      </div>
      <p *ngIf="error" class="error">{{ error | json }}</p>
  \`,
  styles: ['.error { color: red; }']
})
export class ConfigComponent implements OnDestroy {
  error: any;
  headers: string[];
  config: Config;
  configSubscription: Subscription;

  constructor(private configService: ConfigService) { }

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  showConfig() {
    this.configSubscription = this.configService.getConfig().subscribe(
                  data => this.config = { ...data },
                  error => this.error = error
    );
  }


  showConfig_v1() {
    this.configSubscription = this.configService.getConfig_1()
                              .subscribe(data => this.config = {
            heroesUrl: data['heroesUrl'],
            textfile: data['textfile']
    });
  }

  showConfig_v2() {
    this.configSubscription = this.configService.getConfig()
                              .subscribe(data => this.config = { ...data });
  }

  showConfigResponse() {
    this.configSubscription = this.configService.getConfigResponse()
        .subscribe(response => {
            const keys = response.headers.keys();
            this.headers = keys.map(key => \`\${key}: \${response.headers.get(key)}\`);
            this.config = { ...response.body };
        });
  }

  makeError() {
    this.configSubscription =
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error);
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

}


// downloader service
import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';

  import { MessageService } from '../message.service';

  import { tap } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class DownloaderService {

    constructor(private http: HttpClient,
                private messageService: MessageService) { }

    getTextFile(filename: string) {
      return this.http.get(filename, { responseType: 'text'})
                      .pipe(
                        tap(
                            data => this.log(filename, data),
                            error => this.logError(filename, error)
                        )
                      );
    }

    private log(filename: string, data: string) {
      const message = \`DownloaderService downloaded: \${filename} and got "\${data}".\`;
      this.messageService.add(message);
    }

    private logError(filename: string, error: any) {
      const message = \`DownloaderService failed to download: \${filename}; and got error
      "\${error.message}".\`;
      console.error(message);
      this.messageService.add(message);
    }

  }


// downloader component
import { Component, OnDestroy } from '@angular/core';

  import { DownloaderService } from './downloader.service';

  import { Subscription } from 'rxjs/Subscription';

  @Component({
    selector: 'app-downloader',
    template: \`
          <h3>Download the texfile</h3>
          <button (click)="download()">download</button>
          <button (click)="clear()">clear</button>
          <p *ngIf="contents">Contents: "{{ contents }}"</p>
    \`
  })
  export class DownloaderComponent implements OnDestroy {
    contents: string;
    downloaderSubscription: Subscription;

    constructor(private downloaderService: DownloaderService) { }

    clear() {
      this.contents = undefined;
    }

    download() {
     this.downloaderSubscription = this.downloaderService.getTextFile('assets/textfile.txt')
                            .subscribe(results => this.contents = results);
    }

    ngOnDestroy() {
      this.downloaderSubscription.unsubscribe();
    }

  }


// uploader service
import { Injectable } from '@angular/core';
  import { HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
           HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

  import { MessageService } from '../message.service';

  import { of } from 'rxjs/observable/of';
  import { catchError, last, map, tap } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class UploaderService {

    constructor(private http: HttpClient,
                private messageService: MessageService) { }

    upload(file: File) {
      if (!file) { return; }

      const req = new HttpRequest('POST', '/upload/file', file, {
            reportProgress: true
      });

      return this.http.request(req).pipe(
        map(event => this.getEventMessage(event, file)),
        tap(message => this.showProgress(message)),
        last(),
        catchError(this.handleError(file))
      );
    }

    private getEventMessage(event: HttpEvent<any>, file: File) {
        switch (event.type) {
          case HttpEventType.Sent:
            return \`Uploading file "\${file.name}" of size \${file.size}\`;
          case HttpEventType.UploadProgress:
          const percentDone = Math.round(100 * event.loaded / event.total);
            return \`File "\${file.name}" is \${percentDone}% uploaded.\`;
          case HttpEventType.Response:
            return \`File "\${file.name}" was completely uploaded.\`;
          default:
            return \`File "\${file.name}" surprising upload event: \$\{event.type}\`;
        }
    }

    private handleError(file: File) {
      const userMessage = \`\${file.name} upload failed\`;
      return (error: HttpErrorResponse) => {
        console.error(error);
        const message = (error.error instanceof Error) ?
              error.error.message : \`server returned code \$\{error.status}
              with body "\${error.error}"\`;
        this.messageService.add(\`\${userMessage} \${message}\`);
        return of(userMessage);
      };
    }

    private showProgress(message: string) {
      this.messageService.add(message);
    }

  }


// uploader component
import { Component, OnDestroy } from '@angular/core';

  import { UploaderService } from './uploader.service';

  import { Subscription } from 'rxjs/Subscription';

  @Component({
    selector: 'app-uploader',
    template: \`
        <h3>Upload File</h3>
        <form enctype="multipart/form-data" method="post">
        <div>
        <label for="picked">Choose file to upload</label>
          <div>
              <input type="file"
                   id="picked"
                   #picked
                   (click)="message=''"
                   (change)="onPicked(picked)">
          </div>
        </div>
        <p *ngIf="message">{{ message }}</p>
        </form>
    \`
  })
  export class UploaderComponent implements OnDestroy {
    message: string;
    uploaderSubscription: Subscription;

    constructor(private uploaderService: UploaderService) { }

    onPicked(input: HTMLInputElement) {
      const file = input.files[0];
      if (file) {
        this.uploaderSubscription = this.uploaderService.upload(file).subscribe(
          msg => {
            input.value = null;
            this.message = msg;
          }
        );
      }
    }

    ngOnDestroy() {
      this.uploaderSubscription.unsubscribe();
    }

  }


// package search service
import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

  import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

  import { Observable } from 'rxjs/Observable';
  import { of } from 'rxjs/observable/of';
  import { catchError, map } from 'rxjs/operators';

  export interface NpmPackageInfo {
    name: string;
    version: string;
    description: string;
  }

  export const searchUrl = 'https://npmsearch.com/query';

  const httpOptions = {
    headers: new HttpHeaders({
      'x-refresh': 'true'
    })
  };

  function createHttpOptions(packageName: string, refresh = false) {
    const params = new HttpParams({ fromObject: { q: packageName} });
    const headerMap = refresh ? {'x-refresh': 'true'} : {};
    const headers = new HttpHeaders(headerMap);
    return { headers, params };
  }

  @Injectable({
    providedIn: 'root'
  })
  export class PackageSearchService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

    search(packageName: string, refresh = false): Observable<NpmPackageInfo[]> {
      if (!packageName.trim()) {
        return of([]);
      }

      const options = createHttpOptions(packageName, refresh);

      return this.http.get(searchUrl, options).pipe(
        map((data: any) => {
          return data.results.map(entry => ({
            name: entry.name[0],
            version: entry.version[0],
            description: entry.description[0]
          } as NpmPackageInfo));
        }), catchError(this.handleError('search', []))
      );
    }

  }


// package search component
import { Component, OnInit } from '@angular/core';

  import { PackageSearchService, NpmPackageInfo } from './package-search.service';

  import { Observable } from 'rxjs/Observable';
  import { Subject } from 'rxjs/Subject';
  import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

  @Component({
    selector: 'app-package-search',
    template: \`
            <h3>Search Npm Package</h3>
            <p><i>Searches when typing stops. Caches for 30 seconds.</i></p>
            <input (keyup)="search($event.target.value)" id="name" placeholder="Search">
            <input type="checkbox" id="refresh" [checked]="withRefresh"
            (click)="toggleRefresh()">
            <label for="refresh">with refresh</label>

            <ul>
                  <li *ngFor="let package of packages$ | async">
                        <b>{{ package.name }} v.{{ package.version }}</b> -
                        <i>{{ package.description }}</i>
                  </li>
            </ul>

    \`
  })
  export class PackageSearchComponent implements OnInit {
    withRefresh = false;
    packages$: Observable<NpmPackageInfo[]>;
    private searchText$ = new Subject<string>();

    search(packageName: string) {
      this.searchText$.next(packageName);
    }

    constructor(private packageSearchService: PackageSearchService) { }

    ngOnInit() {
      this.packages$ = this.searchText$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(packageName =>
          this.packageSearchService.search(packageName, this.withRefresh))
        );
    }

    toggleRefresh() {
      this.withRefresh = !this.withRefresh;
    }

  }


// authentication service
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAuthorizationToken() {
    return 'some-auth-token';
  }

}

// http error handler service
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from './message.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

  @Injectable({
    providedIn: 'root'
  })
  export class HttpErrorHandler {
    constructor (private messageService: MessageService) { }

    createHandleError = (serviceName = '') => <T>
        (operation = 'operation', result = {} as T) =>
                   this.handleError(serviceName, operation, result)

   handleError<T> (serviceName = '', operation = 'operation', result = {} as T) {
     return (error: HttpErrorResponse): Observable<T> => {
       console.error(error);

      const message = (error.error instanceof ErrorEvent) ? error.error.message :
      \`server returned a code of \${error.status} with body "\${error.error}"\`;

      this.messageService.add(\`\${serviceName}: \${operation} failed: \${message}\`);
      return of (result);
     };
   }

  }


// request cache service
import { Injectable } from '@angular/core';
  import { HttpRequest, HttpResponse } from '@angular/common/http';

  import { MessageService } from './message.service';

  export interface RequestCacheEntry {
    url: string;
    response: HttpResponse<any>;
    lastRead: number;
  }

  export abstract class RequestCache {
    abstract get(request: HttpRequest<any>): HttpResponse<any> | undefined;
    abstract put(request: HttpRequest<any>, response: HttpResponse<any>): void;
  }

  const maxAge = 20000;

  @Injectable({
    providedIn: 'root'
  })
  export class RequestCacheWithMap implements RequestCache {

    cache = new Map<string, RequestCacheEntry>();

    constructor(private messageService: MessageService) { }


    get(request: HttpRequest<any>): HttpResponse<any> | undefined {
      const url = request.urlWithParams;
      const cached = this.cache.get(url);

      if (!cached) {
        return undefined;
      }

      const isExpired = cached.lastRead < (Date.now() - maxAge);
      const expired = isExpired ? 'expired' : '';
      this.messageService.add(\`Found \${expired}cached response for "\${url}".\`);
      return isExpired ? undefined : cached.response;
    }

    put(request: HttpRequest<any>, response: HttpResponse<any>): void {
      const url = request.urlWithParams;
      this.messageService.add(\`Caching response from "\${url}".\`);

      const entry = { url, response, lastRead: Date.now() };
      this.cache.set(url, entry);

      const expired = Date.now() - maxAge;
      this.cache.forEach(item => {
        if (item.lastRead < expired) {
          this.cache.delete(item.url);
        }
      });

      this.messageService.add(\`Request cache size: \${this.cache.size}.\`);

    }


  }


// auth interceptor
import { Injectable } from '@angular/core';
  import { HttpRequest, HttpResponse } from '@angular/common/http';

  import { MessageService } from './message.service';

  export interface RequestCacheEntry {
    url: string;
    response: HttpResponse<any>;
    lastRead: number;
  }

  export abstract class RequestCache {
    abstract get(request: HttpRequest<any>): HttpResponse<any> | undefined;
    abstract put(request: HttpRequest<any>, response: HttpResponse<any>): void;
  }

  const maxAge = 20000;

  @Injectable({
    providedIn: 'root'
  })
  export class RequestCacheWithMap implements RequestCache {

    cache = new Map<string, RequestCacheEntry>();

    constructor(private messageService: MessageService) { }


    get(request: HttpRequest<any>): HttpResponse<any> | undefined {
      const url = request.urlWithParams;
      const cached = this.cache.get(url);

      if (!cached) {
        return undefined;
      }

      const isExpired = cached.lastRead < (Date.now() - maxAge);
      const expired = isExpired ? 'expired' : '';
      this.messageService.add(\`Found \${expired}cached response for "\${url}".\`);
      return isExpired ? undefined : cached.response;
    }

    put(request: HttpRequest<any>, response: HttpResponse<any>): void {
      const url = request.urlWithParams;
      this.messageService.add(\`Caching response from "\${url}".\`);

      const entry = { url, response, lastRead: Date.now() };
      this.cache.set(url, entry);

      const expired = Date.now() - maxAge;
      this.cache.forEach(item => {
        if (item.lastRead < expired) {
          this.cache.delete(item.url);
        }
      });

      this.messageService.add(\`Request cache size: \${this.cache.size}.\`);

    }

  }


// caching interceptor
import { Injectable } from '@angular/core';
  import { HttpEvent, HttpHeaders, HttpRequest,
           HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';

  import { RequestCache } from '../request-cache.service';
  import { searchUrl } from '../package-search/package-search.service';

  import { Observable } from 'rxjs/Observable';
  import { of } from 'rxjs/observable/of';
  import { startWith, tap } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class CachingInterceptor implements HttpInterceptor {

          constructor(private cache: RequestCache) {}

          intercept(request: HttpRequest<any>, next: HttpHandler) {

            if (!isCachable(request)) {
              return next.handle(request);
            }

            const cachedResponse = this.cache.get(request);
            if (request.headers.get('x-refresh')) {
              const results$ = sendRequest(request, next, this.cache);
              return cachedResponse ? results$.pipe(startWith(cachedResponse)) : results$;
            }
            return cachedResponse ? of(cachedResponse) :
            sendRequest(request, next, this.cache);
          }


  }

  function isCachable(request: HttpRequest<any>) {
    return request.method === 'GET' &&
           request.url.indexOf(searchUrl) > -1;
  }

  function sendRequest(request: HttpRequest<any>,
                       next: HttpHandler,
                       cache: RequestCache): Observable<HttpEvent<any>> {
    const noHeadersRequest = request.clone({ headers: new HttpHeaders() });
    return next.handle(noHeadersRequest).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(request, event);
        }
      })
    );

  }


// ensure https interceptor
import { Injectable } from '@angular/core';
  import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

  import { Observable } from 'rxjs/Observable';


  @Injectable({
    providedIn: 'root'
  })
  export class EnsureHttpsInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const secureRequest = request.clone({
        url: request.url.replace('http://', 'https://')
      });
      return next.handle(secureRequest);
    }

  }


// logging interceptor
import { Injectable } from '@angular/core';

  import { HttpEvent, HttpInterceptor, HttpHandler,
           HttpRequest, HttpResponse } from '@angular/common/http';

  import { MessageService } from '../message.service';

  import { Observable } from 'rxjs/Observable';
  import { finalize, tap } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class LoggingInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
      const started = Date.now();
      let ok: string;

      return next.handle(request)
                 .pipe(
                   tap(
                     event => ok = event instanceof HttpResponse ? 'succeeded' : '',
                     error => ok = 'failed'
                   ),
                   finalize(() => {
                     const elapsed = Date.now() - started;
                     const message = \`\${request.method} "\${request.urlWithParams}"
                                      \${ok} in \${elapsed} ms.\`;
                     this.messageService.add(message);
                   })
                 );
    }

  }


// noop interceptor
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor,
         HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class NoopInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
  }

}


// trim name interceptor
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor,
         HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TrimNameInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const body = request.body;
        if (!body || !body.name) {
          return next.handle(request);
        }
        const newBody = { ...body, name: body.name.trim() };
        const newRequest = request.clone({ body: newBody });

        return next.handle(newRequest);
  }

}


// upload interceptor
import { Injectable } from '@angular/core';
  import { HttpEvent, HttpInterceptor, HttpHandler,
           HttpResponse, HttpRequest, HttpEventType,
           HttpProgressEvent } from '@angular/common/http';

  import { Observable } from 'rxjs/Observable';
  import { of } from 'rxjs/observable/of';

  @Injectable({
    providedIn: 'root'
  })
  export class UploadInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (request.url.indexOf('/upload/file') === -1) {
        return next.handle(request);
      }
        const delay = 300;
        return createUploadEvents(delay);
    }

  }

  function createUploadEvents(delay: number) {
    const chunks = 5;
    const total = 12345678;
    const chunkSize = Math.ceil(total / chunks);

    return new Observable<HttpEvent<any>>(observer => {
      observer.next({ type: HttpEventType.Sent });
      uploadLoop(0);

      function uploadLoop(loaded: number) {
        setTimeout(() => {
          loaded += chunkSize;
          if (loaded >= total) {
            const doneResponse = new HttpResponse({
              status: 201
            });
            observer.next(doneResponse);
            observer.complete();
            return;
          }

          const progressEvent: HttpProgressEvent = {
            type: HttpEventType.UploadProgress,
            loaded,
            total
          };
          observer.next(progressEvent);
          uploadLoop(loaded);
        }, delay);
      }
    });

  }


// global css styles
/* Master Styles */
  h1 {
    color: #369;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 250%;
  }
  h2, h3 {
    color: #444;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
  }
  body {
    margin: 2em;
  }
  body, input[text], button {
    color: #888;
    font-family: Cambria, Georgia;
  }
  a {
    cursor: pointer;
    cursor: hand;
  }
  button {
    font-family: Arial;
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    cursor: hand;
  }
  button:hover {
    background-color: #cfd8dc;
  }
  button:disabled {
    background-color: #eee;
    color: #aaa;
    cursor: auto;
  }

  /* Navigation link styles */
  nav a {
    padding: 5px 10px;
    text-decoration: none;
    margin-right: 10px;
    margin-top: 10px;
    display: inline-block;
    background-color: #eee;
    border-radius: 4px;
  }
  nav a:visited, a:link {
    color: #607D8B;
  }
  nav a:hover {
    color: #039be5;
    background-color: #CFD8DC;
  }
  nav a.active {
    color: #039be5;
  }

  /* everywhere else */
  * {
    font-family: Arial, Helvetica, sans-serif;
  }


// app module
import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { FormsModule } from '@angular/forms';
  import { HttpClientModule } from '@angular/common/http';
  import { HttpClientXsrfModule } from '@angular/common/http';

  import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
  import { InMemoryDataService } from './in-memory-data.service';

  import { AppComponent } from './app.component';
  import { HeroesComponent } from './heroes/heroes.component';
  import { ConfigComponent } from './config/config.component';
  import { MessagesComponent } from './messages/messages.component';
  import { DownloaderComponent } from './downloader/downloader.component';
  import { UploaderComponent } from './uploader/uploader.component';
  import { PackageSearchComponent } from './package-search/package-search.component';

  import { MessageService } from './message.service';
  import { HttpErrorHandler } from './http-error-handler.service';
  import { AuthService } from './auth.service';
  import { RequestCache, RequestCacheWithMap } from './request-cache.service';

  import { httpInterceptorProviders } from './http-interceptors';

  @NgModule({
    declarations: [
      AppComponent,
      HeroesComponent,
      ConfigComponent,
      MessagesComponent,
      DownloaderComponent,
      UploaderComponent,
      PackageSearchComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      HttpClientXsrfModule.withOptions({
        cookieName: 'My-Xsrf-Cookie',
        headerName: 'My-Xsrf-Header'
      }),
      HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, {
          dataEncapsulation: false,
          passThruUnknownUrl: true,
          put204: false
        }
      )
    ],
    providers: [
          AuthService,
          HttpErrorHandler,
          MessageService,
          { provide: RequestCache, useClass: RequestCacheWithMap },
          httpInterceptorProviders
        ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }


// app component
import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    template: \`
          // tslint:disable-next-line: whitespace
          <h1>HTTPClient Code</h1>
          <div>
            <input type="checkbox" id="heroes" [checked]="showHeroes"
            (click)="toggleHeroes()">
            <label for="heroes">Heroes</label>
            <input type="checkbox" id="config" [checked]="showConfig"
            (click)="toggleConfig()">
            <label for="config">Config</label>
            <input type="checkbox" id="downloader" [checked]="showDownloader"
            (click)="toggleDownloader()">
            <label for="downloader">Downloader</label>
            <input type="checkbox" id="uploader" [checked]="showUploader"
            (click)="toggleUploader()">
            <label for="uploader">Uploader</label>
            <input type="checkbox" id="search" [checked]="showSearch"
            (click)="toggleSearch()">
            <label for="search">Search</label>

          </div>
          <app-heroes *ngIf="showHeroes"></app-heroes>
          <app-messages></app-messages>
          <app-config *ngIf="showConfig"></app-config>
          <app-downloader *ngIf="showDownloader"></app-downloader>
          <app-uploader *ngIf="showUploader"></app-uploader>
          <app-package-search *ngIf="showSearch"></app-package-search>
    \`
  })
  export class AppComponent {
          showHeroes = true;
          showConfig = true;
          showDownloader = true;
          showUploader = true;
          showSearch = true;

          toggleHeroes() {
            this.showHeroes = !this.showHeroes;
          }

          toggleConfig() {
            this.showConfig = !this.showConfig;
          }

          toggleDownloader() {
            this.showDownloader = !this.showDownloader;
          }

          toggleUploader() {
            this.showUploader = !this.showUploader;
          }

          toggleSearch() {
            this.showSearch = !this.showSearch;
          }

  }


// routing, app routing module
import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';

  import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
  import { AuthGuard } from './auth-guard.service';
  import { CanDeactivateGuard } from './can-deactivate-guard.service';

  import { ComposeMessageComponent } from './compose-message/compose-message.component';
  import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

  const appRoutes: Routes = [
    {
      path: 'compose',
      component: ComposeMessageComponent,
      outlet: 'popup'
    },
    {
      path: 'admin',
      loadChildren: 'app/admin/admin.module#AdminModule',
      canLoad: [ AuthGuard ]
    },
    {
      path: 'crisis-center',
      loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
      data: { preload: true }
    },
    {
      path: '',
      redirectTo: '/superheroes',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(appRoutes, {
        preloadingStrategy: SelectivePreloadingStrategy
      }) ],
    exports: [ RouterModule ],
    providers: [ SelectivePreloadingStrategy, CanDeactivateGuard ]
  })
  export class AppRoutingModule { }


// app module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { LoginRoutingModule } from './login-routing.module';

import { DialogService } from './dialog-service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HeroesModule,
    LoginRoutingModule,
    AppRoutingModule
  ],
  providers: [ DialogService ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// app component
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
          <h1 class="title">Angular Router</h1>
          <nav>
                <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
                <a routerLink="/superheroes" routerLinkActive="active">Heroes</a>
                <a routerLink="/admin" routerLinkActive="active">Admin</a>
                <a routerLink="/login" routerLinkActive="active">Login</a>
                <a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
          </nav>
          <router-outlet></router-outlet>
          <router-outlet name="popup"></router-outlet>
  \`
})
export class AppComponent { }


// animations
import { animate, AnimationEntryMetadata, state,
  style, transition, trigger } from '@angular/core';

export const slideInDownAnimation: AnimationEntryMetadata =
trigger('routeAnimation', [
 state('*',
   style({
     opacity: 1,
     transform: 'translateX(0)'
   })
 ),
 transition(':enter', [
   style({
     opacity: 0,
     transform: 'translateX(-100%)'
   }),
   animate('0.2s ease-in')
 ]),
 transition(':leave', [
   animate('0.5s ease-out', style({
     opacity: 0,
     transform: 'translateY(100%)'
   }))
 ])
]);



// authentication guard
import { Injectable } from '@angular/core';

  import { CanActivate,
           Router,
           ActivatedRouteSnapshot,
           RouterStateSnapshot,
           CanActivateChild,
           NavigationExtras,
           CanLoad,
           Route} from '@angular/router';

  import { AuthService } from './auth.service';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const url = state.url;
      return this.checkLogin(url);
    }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
      const url = \`/\${route.path}\`;
      return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
      if (this.authService.isLoggedIn) {
        return true;
      }

      this.authService.redirectUrl = url;

      const sessionId = 123456789;

      const navigationExtras: NavigationExtras = {
        queryParams: { 'session_id': sessionId },
        fragment: 'anchor'
      };

      this.router.navigate(['/login'], navigationExtras);
      return false;

    }
  }


// auth service
import { Injectable } from '@angular/core';

  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/of';
  import 'rxjs/add/operator/do';
  import 'rxjs/add/operator/delay';

  @Injectable({
    providedIn: 'route'
  })
  export class AuthService {
    isLoggedIn = false;

    redirectUrl: string;

    login(): Observable<boolean> {
      return Observable.of(true).delay(1000).do(value => this.isLoggedIn = true);
    }

    logout(): void {
      this.isLoggedIn = false;
    }

  }


// can deactivate guard service
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}


// dialog service
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');
    return Observable.of(confirmation);
  }

}


// login routing module
import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';

  import { AuthGuard } from './auth-guard.service';
  import { AuthService } from './auth.service';

  import { LoginComponent } from './login/login.component';

  const loginRoutes: Routes = [
      { path: 'login', component: LoginComponent }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(loginRoutes)
    ],
    exports: [
      RouterModule
    ],
    providers: [
      AuthGuard,
      AuthService
    ]
  })
  export class LoginRoutingModule { }


// selective preloading strategy
import { Injectable } from '@angular/core';
import { Route, PreloadingStrategy } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategy implements PreloadingStrategy {
       preloadedModules: string[] = [];

       preload(route: Route, load: () => Observable<any>): Observable<any> {
         if (route.data && route.data['preload']) {
           this.preloadedModules.push(route.path);
           console.log('Preloaded: ' + route.path);
           return load();
         } else {
           return Observable.of(null);
         }
       }

}


// admin module
import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  import { AdminRoutingModule } from './admin-routing.module';

  import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
  import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
  import { AdminComponent } from './admin/admin.component';
  import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

  @NgModule({
    imports: [
      CommonModule,
      AdminRoutingModule
    ],
    declarations: [
      ManageCrisesComponent,
      ManageHeroesComponent,
      AdminComponent,
      AdminDashboardComponent
    ]
  })
  export class AdminModule { }


// admin routing module


import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';

  import { AuthGuard } from '../auth-guard.service';

  import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
  import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
  import { AdminComponent } from './admin/admin.component';
  import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


  const adminRoutes: Routes = [
        {
          path: '',
          component: AdminComponent,
          canActivate: [ AuthGuard ],
          children: [
            {
              path: '',
              canActivateChild: [ AuthGuard ],
              children: [
                { path: 'crises', component: ManageCrisesComponent },
                { path: 'heroes', component: ManageHeroesComponent },
                { path: '', component: AdminDashboardComponent }
              ]
            }
          ]
        }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(adminRoutes)
    ],
    exports: [ RouterModule ]
  })
  export class AdminRoutingModule { }


// admin component
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: \`
            <h3>ADMIN</h3>
              <nav>
                  <a routerLink="./" routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
                  <a routerLink="./crises" routerLinkActive="active">Manage Crises</a>
                  <a routerLink="./heroes" routerLinkActive="active">Manage Heroes</a>
              </nav>
            <router-outlet></router-outlet>
  \`
})
export class AdminComponent { }


// admin dashboard component
import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';

  import { SelectivePreloadingStrategy } from '../../selective-preloading-strategy';

  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/operator/map';

  @Component({
    selector: 'app-admin-dashboard',
    template: \`
            <p>Dashboard</p>

            <p>Session ID: {{ sessionId | async }}</p>
            <a id="anchor"></a>
            <p>Token: {{ token | async }}</p>

            Preloaded Modules
            <ul>
                <li *ngFor="let module of modules">
                      {{ module }}
                </li>
            </ul>
  }\`
  })
  export class AdminDashboardComponent implements OnInit {
        sessionId: Observable<string>;
        token: Observable<string>;
        modules: string[];

        constructor(private route: ActivatedRoute,
                    private selectivePreloadingStrategy: SelectivePreloadingStrategy) {
                      this.modules = selectivePreloadingStrategy.preloadedModules;
                     }

       ngOnInit() {
         this.sessionId = this.route.queryParamMap.map(params =>
        params.get('session_id') || 'None');

        this.token = this.route.fragment.map(fragment => fragment || 'None');
       }

   }


// manage heroes/ crises component
import { Component } from '@angular/core';

  @Component({
    selector: 'app-manage-crises',
    template: \`
          <p>Manage your crises here</p>
    \`
  })
  export class ManageCrisesComponent { }

********************************************************

import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-heroes',
  template: \`
        <p>Manage your heroes here</p>
  \`
})
export class ManageHeroesComponent { }



// compose message component
import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-compose-message',
  template: \`
            <h3>Contact Crisis Center</h3>
            <div *ngIf="details">
              {{ details }}
            </div>
            <div>
                <div>
                      <label>Message: </label>
                </div>
                <div>
                      <textarea [(ngModel)]="message" rows="10" cols="35"
                                [disabled]="sending">
                      </textarea>
                </div>
            </div>
            <p *ngIf="!sending">
                <button (click)="send()">Send</button>
                <button (click)="cancel()">Cancel</button>
            </p>
  \`,
  styles: [':host { position: relative; bottom: 10%; '],
  animations: [ slideInDownAnimation ]
})
export class ComposeMessageComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  details: string;
  message = '';
  sending = false;

  constructor(private router: Router) { }

  send() {
    this.sending = true;
    this.details = 'Sending Message';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  cancel() {
    this.closePopup();
  }

  closePopup() {
    this.router.navigate([{ outlets: { popup: null }}]);
  }

}


// crisis service
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

export class Crisis {
  constructor(public id: number, public name: string) { }
}

const CRISES = [
    new Crisis(1, 'Dragon Burning Cities'),
    new Crisis(2, 'Sky Rains Great White Sharks'),
    new Crisis(3, 'Giant Asteroids Heading For Earth'),
    new Crisis(4, 'Procrastinators Meeting Delayed Again')
];

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  static nextCrisisId = 100;
  private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);

  getCrises() {
    return this.crises$;
  }

  getCrisis(id: number | string) {
    return this.getCrises().map(crises => crises.find(crisis => crisis.id === +id));
  }

  addCrisis(name: string) {
    name = name.trim();
    if (name) {
      const crisis = new Crisis(CrisisService.nextCrisisId++, name);
      CRISES.push(crisis);
      this.crises$.next(CRISES);
    }
  }

}


// crisis list component
import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, ParamMap } from '@angular/router';

  import { CrisisService, Crisis } from './crisis.service';
  import { Observable } from 'rxjs/Observable';

  @Component({
    selector: 'app-crisis-list',
    template: \`
            <ul class="items">
                <li *ngFor="let crisis of crises$ | async"
                     [class.selected]="crisis.id === selectedId">
                <a [routerLink]="[crisis.id]">
                  <span class="badge">{{ crisis.id }}</span>{{ crisis.name }}
                </a>
                </li>
            </ul>

            <router-outlet></router-outlet>
    \`
  })
  export class CrisisListComponent implements OnInit {
    crises$: Observable<Crisis[]>;
    selectedId: number;

    constructor(private crisisService: CrisisService,
                private route: ActivatedRoute) { }

    ngOnInit() {
      this.crises$ = this.route.paramMap.switchMap((params: ParamMap) => {
            this.selectedId = +params.get('id');
            return this.crisisService.getCrises();
      });
    }

  }


// crisis detail component
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Crisis } from './crisis.service';
import { slideInDownAnimation } from '../animations';
import { DialogService } from '../dialog-service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-crisis-detail',
  template: \`
          <div *ngIf="crisis">
                <h3>"{{ editName }}"</h3>
              <div>
                  <label>Id: </label>{{ crisis.id }}
              </div>
              <div>
                  <label>Name: </label>
                  <input [(ngModel)]="editName" placeholder="name">
              </div>
              <p>
                    <button (click)="save()">Save</button>
                    <button (click)="cancel()">Cancel</button>
              </p>
          </div>
  \`,
  styles: ['input { width: 20em; }'],
  animations: [ slideInDownAnimation ]
})
export class CrisisDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  crisis: Crisis;
  editName: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialogService: DialogService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { crisis: Crisis }) => {
          this.editName = data.crisis.name;
          this.crisis = data.crisis;
    });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Observable<boolean>| boolean {
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', { id: crisisId, foo: 'bar'}], { relativeTo: this.route });
  }

}


// crisis detail resolver
import { Injectable } from '@angular/core';
  import { Router, Resolve, RouterStateSnapshot,
           ActivatedRouteSnapshot } from '@angular/router';

  import { CrisisService, Crisis } from './crisis.service';

  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/operator/take';
  import 'rxjs/add/operator/map';

  @Injectable()
  export class CrisisDetailResolver implements Resolve<Crisis> {

    constructor(private crisisService: CrisisService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> {
      const id = route.paramMap.get('id');

      return this.crisisService.getCrisis(id).take(1).map(crisis => {
        if (crisis) {
          return crisis;
        } else {
          this.router.navigate(['/crisis-center']);
          return null;
        }
      });
    }

  }


// crisis center module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent } from './crisis-list.component';

import { CrisisService } from './crisis.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisCenterRoutingModule
  ],
  declarations: [
    CrisisCenterHomeComponent,
    CrisisCenterComponent,
    CrisisDetailComponent,
    CrisisListComponent
  ],
  providers: [
    CrisisService
  ]
})
export class CrisisCenterModule { }


// crisis center component
import { Component } from '@angular/core';

  @Component({
    selector: 'app-crisis-center',
    template: \`
            <h2>CRISIS CENTER</h2>
            <router-outlet></router-outlet>
    \`
  })
  export class CrisisCenterComponent { }


// crisis center routing module
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent } from './crisis-list.component';

import { CanDeactivateGuard } from '../can-deactivate-guard.service';
import { CrisisDetailResolver } from './crisis-detail-resolver.service';

const crisisCenterRoutes: Routes = [
    {
      path: '',
      component: CrisisCenterComponent,
      children: [
        {
          path: '',
          component: CrisisListComponent,
          children: [
            {
              path: ':id',
              component: CrisisDetailComponent,
              canDeactivate: [ CanDeactivateGuard ],
              resolve: {
                crisis: CrisisDetailResolver
              }
            },
            {
              path: '',
              component: CrisisCenterHomeComponent
            }
          ]
        }
      ]
    }

];

@NgModule({
  imports: [
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CrisisDetailResolver
  ]
})
export class CrisisCenterRoutingModule { }


// crisis home component
import { Component } from '@angular/core';

@Component({
  selector: 'app-crisis-center-home',
  template: \`
      <p>Welcome to the Crisis Center</p>
  \`
})
export class CrisisCenterHomeComponent  { }


// heroes module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';

import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';

import { HeroService } from './hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule
  ],
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ],
  providers: [ HeroService ]
})
export class HeroesModule { }


// heroes routing module
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';

const heroesRoutes: Routes = [
  { path: 'heroes', redirectTo: '/superheroes' },
  { path: 'hero/:id', redirectTo: '/superhero/:id' },
  { path: 'superheroes', component: HeroListComponent },
  { path: 'superhero/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [ RouterModule ]
})
export class HeroesRoutingModule { }


// hero service
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


export class Hero {
  constructor(public id: number, public name: string) { }
}

const HEROES = [
  new Hero(11, 'Flash'),
  new Hero(12, 'Wonderwoman'),
  new Hero(13, 'Superman'),
  new Hero(14, 'Spiderman'),
  new Hero(15, 'Batman'),
  new Hero(16, 'Green Arrow')
];

@Injectable({
  provididedIn: 'root'
})
export class HeroService {

  getHeroes() {
    return Observable.of(HEROES);
  }

  getHero(id: number | string) {
    return this.getHeroes().map(heroes => heroes.find(hero => hero.id === +id));
  }

}


// hero list component
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { HeroService, Hero } from './hero.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-list',
  template: \`
              <h2>HEROES</h2>
              <ul class="items">
                  <li *ngFor="let hero of heroes$ | async"
                       [class.selected]="hero.id === selectedId">
                  <a [routerLink]="['/hero', hero.id]">
                      <span class="badge">{{ hero.id }}</span>{{ hero.name }}
                  </a>
                  </li>
              </ul>

            <button routerLink="/sidekicks">Go to sidekicks</button>
  \`
})
export class HeroListComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  private selectedId: number;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.heroes$ = this.route.paramMap
                   .switchMap((params: ParamMap) => {
          this.selectedId = +params.get('id');
          return this.heroService.getHeroes();
    });
  }

}


// hero detail component
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { slideInDownAnimation } from '../animations';
import { HeroService, Hero } from './hero.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  template: \`
        <h2>HEROES</h2>
        <div *ngIf="hero$ | async as hero">
            <h3>"{{ hero.name }}"</h3>
            <div>
                <label>ID: </label>{{ hero.id }}
            </div>
            <div>
                <label>Name: </label>
                <input [(ngModel)]="hero.name" placeholder="name">
            </div>
            <p>
                <button (click)="gotoHeroes(hero)">Back</button>
            </p>
        </div>
  \`,
  animations: [ slideInDownAnimation ]
})
export class HeroDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  hero$: Observable<Hero>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private heroService: HeroService) { }

  ngOnInit() {
    this.hero$ = this.route.paramMap.switchMap((params: ParamMap) =>
          this.heroService.getHero(params.get('id')));
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['/heroes', { id: heroId, foo: 'bar' }]);
  }

}


// login component
import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-login',
  template: \`
        <h2>LOGIN</h2>
        <p>{{ message }}</p>
        <p>
            <button (click)="login()" *ngIf="!authService.isLoggedIn">Login</button>
            <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
        </p>
  \`
})
export class LoginComponent implements OnDestroy {
  message: string;
  authSubscription: Subscription;

  constructor(public authService: AuthService, private router: Router) {
    this.setMessage();
   }

   setMessage() {
     this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
   }

   login() {
     this.message = 'Trying to log in ...';
     this.authSubscription = this.authService.login().subscribe(() => {
       this.setMessage();
       if (this.authService.isLoggedIn) {
         const redirect = this.authService.redirectUrl ?
         this.authService.redirectUrl : '/admin';
         const navigationExtras: NavigationExtras = {
           queryParamsHandling: 'preserve',
           preserveFragment: true
         };
         this.router.navigate([redirect], navigationExtras);
       }
     });
   }

   logout() {
     this.authService.logout();
     this.setMessage();
   }

   ngOnDestroy() {
     if (this.authSubscription !== undefined) {
     this.authSubscription.unsubscribe();
     }
   }

}


// page not found component
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: \`
          <h2>Page Not Found</h2>
  \`
})
export class PageNotFoundComponent { }


// app styles
/* items class */
  .items {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 24em;
  }
  .items li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .items li a {
    display: block;
    text-decoration: none;
  }
  .items li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .items li.selected {
    background-color: #CFD8DC;
    color: white;
  }
  .items li.selected:hover {
    background-color: #BBD8DC;
  }
  .items .text {
    position: relative;
    top: -3px;
  }
  .items .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }


// master styles
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
h2, h3 {
  color: #444;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body, input[text], button {
  color: #888;
  font-family: Cambria, Georgia;
}
a {
  cursor: pointer;
  cursor: hand;
}
button {
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #aaa;
  cursor: auto;
}

/* Navigation link styles */
nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-right: 10px;
  margin-top: 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 4px;
}
nav a:visited, a:link {
  color: #607D8B;
}
nav a:hover {
  color: #039be5;
  background-color: #CFD8DC;
}
nav a.active {
  color: #039be5;
}

/* everywhere else */
* {
  font-family: Arial, Helvetica, sans-serif;
}


// angular quick reference

// bootstrapping
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// bootstraps the app, using the root component from the specified ngmodule
platformBrowserDynamic().bootstrapModule(AppModule);


// ngmodules
import { NgModule } from '@angular/core;

// defines a module that contains components, directives, pipes and providers
@NgModule({
  declarations: ...,
  imports: ...,
  exports: ...,
  providers: ...,
  bootstrap: ...
})
class MyModule { }

// list of components, directives, and pipes that belong to this module
declarations: [ MyRedComponent, MyBlueComponent, MyDatePipe ]

// list of modules to import into this module. everything from the imported
// modules is available to declarations of this module
imports: [ BrowserModule, SomeOtherModule ]

// list of components, directives, and pipes visible to modules that
// import this module
exports: [ MyRedComponent, MyDatePipe ]

// list of dependency injection providers visible both to the contents of this
// module and to importers of this module
providers: [ MyService, { provide: ... } ]

// list of components to bootstrap when this module is bootstrapped
bootstrap: [ MyAppComponent ]


// template syntax
// binds property value to the result of expression firstName
<input [value]="firstName">

// binds attribute role to the result of expression myAriaRole
<input [attr.role]="myAriaRole">

// binds the presence of the css class extra-sparkle on the element
// to the truthiness of the expression isDelightful
<div [class.extra-sparkle]="isDelightful"></div>

// binds style property width to the result of expression mySize in pixels.
// units are optional
<div [style.width.px]="mySize"></div>

// calls method readRainbow when a click event is triggered on this button
// element (or its children) and passes in the event object
<button (click)="readRainbow($event)"></button>

// binds a property to an interpolated string, for example, "Hi Baby"
// Equivalent to: <div [title]="'Hi ' + girlyName">
<div title="Hi {{ girlyName }}"></div>

// binds text content to an interpolated string, for example, "Hi Baby"
<p>Hi {{ girlyName }}</p>

// sets up two-way binding. equivalent to: <my-cmp [title]="name"
// (titleChange)="name=$event">
<my-cmp [(title)]="name"></my-cmp>

// creates a local variable movieplayer that provides access to the video element
// instance in data-binding and event-binding expressions in the current template.
<video #movieplayer ...>
<button (click)="movieplayer.play()">Play</button>
</video>

// the * symbol turns the current element into an embedded template. equivalent to:
// <ng-template [myUnless]="myExpression"><p>...</p></ng-template>
<p *myUnless="myExpression"></p>

// transforms the current value of expression cardNumber via the pipe called
// myCardNumberFormatter
<p>Card No.: {{ cardNumber | myCardNumberFormatter }}</p>

// the safe navigation operator (?) means the employer field is optional and if
// undefined, the rest of the expression should be ignored. formerly known as
// the elvis operator
<p>Employer: {{ employer?.companyName }}</p>

// an svg snippet template needs an svg: prefix on its root element to disambiguate
// the svg element from an html component
<svg:rect x="0" y="0" width="100" height="100"/>

// an <svg> root element is detected as an svg element automatically,
// without the prefix
<svg>
<rect x="0" y="0" width="100" height="100"/>
</svg>


// built-in directives
import { CommonModule } from '@angular/common';

// removes or recreates a portion of the dom tree based on the
// showSection expression
<section *ngIf="showSection">

// turns the li element and its contents into a template, and uses
// that to instantiate a view for each item in the list
<ul>
    <li *ngFor="let item of list">
          {{ item }}
    </li>
</ul>

// conditionally swaps the contents of the div by selecting one of the
// embedded templates based on the current value of conditionExpression
<div [ngSwitch]="conditionExpression">
  <ng-template [ngSwitchCase]="case1Exp">...</ng-template>
  <ng-template ngSwitchCase="case2LiteralString">...</ng-template>
  <ng-template ngSwitchDefault>...</ng-template>
</div>

// binds the presence of css classes on the element to the truthiness of
// the associated map values. the right-hand expression should return
// {class-name: true/false} map
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}"></div>


// forms
import { FormsModule } from '@angular/forms';

// provides two-way data-binding, parsing, and validation for form controls
<input [(ngModel)]="userName">


// class decorators
import { Directive, ... } from '@angular/core';

// declares that a class is a component and provides metadata about the component
@Component({
  ...
})
class MyComponent { }

// declares that a class is a directive and provides metadata about the directive
@Directive({
  ...
})
class MyDirective { }

// declares that a class is a pipe and provides metadata about the pipe
@Pipe({
  ...
})
class MyPipe { }

// declares that a class has dependencies that should be injected
// into the constructor when the dependency injector is creating
// an instance of this class
@Injectable({
  providedIn: 'root'
})
class MyService { }


// directive configuration
@Directive({
  property1: value1,
  ...
})

// specifies a css selector that identifies the directive within a template.
// supported selectors include element, [attribute], .class, and :not()
// does not support parent-child relationship selectors
selector: '.cool-button:not(a)'

// list of dependency injection providers for this directive and its children
providers: [ MyService, { provide: ... }]


// component configuration
@Component extends @Directive, so the @Directive configuration applies
to components as well

// if set, the templateurl and styleurl are resolved to the component
moduleId: module.id

// list of dependency injection providers scoped to the component's view
viewProviders: [ MyService, { provide: ... } ]

// inline template or external template url of the component's view
template: 'Hello {{ wifeName }}'
templateUrl: 'my-component.html'

// list of inline css styles or external stylesheet urls for styling
// the component's view
styles: ['.primary { color: red; }']
styleUrls: ['my-component.css']


// class field decorators for directives && components
import { Input, ... } from '@angular/core';

// declares an input property that you can update via property binding
// (example: <my-cmp [myProperty]="someExpression"></my-cmp>)
@Input() myProperty;

// declares an output property that fires events you can subscribe to
// with an event binding (example: <my-cmp (myEvent)="letsGetMarried()">
// </my-cmp>)
@Output() myEvent = new EventEmitter();

// binds a host element property (here, the css class valid) to a
// directive/component property (isValid)
@HostBinding('class.valid') isValid;

// subscribes to a host element event (click) with a directive/component
// method (onClick), optionally passing an argument ($event)
@HostListener('click', [$event]) onClick(e) { ... }

// binds the first result of the component content query (myPredicate)
// to a property (myChildComponent) of the class.
@ContentChild(myPredicate) myChildComponent;

// binds the results of the component content query (myPredicate) to a property
// (myChildComponents) of the class
@ContentChildren(myPredicate) myChildComponents;

// binds the first result of the component view query (myPredicate) to a property
// (myChildComponent) of the class. not available for directives.
@ViewChild(myPredicate, { static: false }) myChildComponent;

// binds the results of the component view query (myPredicate) to a property
// (myChildComponents) of the class. not available for directives.
@ViewChildren(myPredicate, { static: true }) myChildComponents;


// directive/component change detection and lifecycle hooks
// called before anyother lifecycle hook. use it to inject dependencies,
// but avoid any serious work here
constructor(myService: MyService, ...) { ... }

// called after every change to input properties and before processing
// content or child views
ngOnChanges(changeRecord) { ... }

// called after the constructor, initializing input properties, and the first
// call to ngOnChanges
ngOnInit() { ... }

// called every time that the input properties of a component or a directive
// are checked. use it to extend change detection by performing a custom check
ngDoCheck() { ... }

// called after ngOnInit when the component's or directive's content has been
// initialized
ngAfterContentInit() { ... }

// called after every check of the component's or directive's content.
ngAfterContentChecked() { ... }

// called after ngAfterContentInit when the component's view has been initialized.
// applies to component's only
ngAfterViewInit() { ... }

// called after every check of the component's view. applies to component's only
ngAfterViewChecked() { ... }

// called once, before the instance is destroyed
ngOnDestroy() { ... }


// dependency injection configuration
// sets or overrides the provider for myservice to the mymockservice class
{ provide: MyService, useClass: MyMockService }

// sets or overrides the provider for myservice to the myfactory factory function
{ provide: MyService, useFactory: myFactory }

// sets or overrides the provider for myvalue to the value 42
{ provide: MyValue, useValue: 42 }


// routing && navigation
import { Routes, RouterModule, ... } from '@angular/router';

// configure routes for the application. supports static, parameterized,
// redirect, and wildcard routes. also supports custom route data and resolve
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'path/:routeParam', component: MyComponent },
  { path: 'staticPath', component: ... },
  { path: '**', component: ... },
  { path: 'oldPath', redirectTo: '/staticPath' },
  { path: ..., component: ..., data: { message: 'Custom' } }
];
const routing = RouterModule.forRoot(routes);

// marks the location to load the component of the active route
<router-outlet></router-outlet>
<router-outlet name="aux"></router-outlet>

// creates a link to a different view based on a route instruction consisting
// of a route path, required and optional parameters, query parameters, and a
// fragment. to navigate to a root route, use the / prefix: for a child route,
// use the ./ prefix; for a sibling or parent, use the ../prefix
<a routerLink="/path"></a>
<a [routerLink]="['/path', routeParam]"></a>
<a [routerLink]="['/path', { matrixParam: 'value' }]"></a>
<a [routerLink]="['/path']" [queryParams]="{ page: 1 }"></a>
<a [routerLink]="['/path']" fragment="anchor"></a>

// the provided classes are added to the element when the routerlink
// becomes the current active route
<a [routerLink]="[ '/path' ]" routerLinkActive="active"></a>

// an interface for defining a class that the router should call first to
// determine if it should activate this component. should return a boolean
// or an observable/promise that resolves to a boolean
class CanActivateGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
              Observable<boolean> | Promise<boolean> | boolean { ... }

}

{ path: ..., canActivate: [ CanActivateGuard ]}

// an interface for defining a class that the router should call first to
// determine if it should deactivate this component after navigation.
// should return a boolean or an observable/promise that resolves to a
// boolean
class CanDeactivateGuard implements CanDeactivate<T> {
  canDeactivate(component: T, route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean>
                | Promise<boolean> | boolean { ... }
}

{ path: ..., canDeactivate: [ CanDeactivateGuard ]}

// an interface for defining a class that the router should call first to
// determine if it should activate the child route. should return a boolean
// or an observable/promise that resolves to a boolean
class CanActivateChildGuard implements CanActivateChild {
  canActivateChild(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean>
                | Promise<boolean> | boolean { ... }
}

{ path: ..., canActivateChild: [ CanActivateGuard ], children: ... }

// an interface for defining a class that the router should call first to
// resolve route data before rendering the route.
// should return a value or an observable/promise that resolves to a value
class ResolveGuard implements Resolve<T> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
         Observable<any> | Promise<any> | any { ... }
}

{ path: ..., resolve: [ ResolveGuard ]}

// an interface for defining a class that the router should call first to
// check if the lazy loaded module should be loaded. should return a boolean
// or an observable/promise that resolves to a boolean
class CanLoadGuard implements CanLoad {
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean { ... }
}

{ path: ..., canLoad: [ CanLoadGuard ], loadChildren: ... }


// testing
// banner inline component
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-inline',
  template: \`
    <h1>{{ title }}</h1>
  \`
})
export class BannerInlineComponent {
    title = 'Test Tour of Heroes';

}


// banner inline component tests
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerInlineComponent } from './banner-inline.component';

describe('BannerInlineComponent (inline template)', () => {
  let component: BannerInlineComponent;
  let fixture: ComponentFixture<BannerInlineComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerInlineComponent ] // declare test component
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerInlineComponent);
    component = fixture.componentInstance; // component test instance
    // query for title h1 by css element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Hi baby';
    fixture.detectChanges();
    expect(el.textContent).toContain('Hi baby');
  });

});


// banner component autochangedetect tests
import { async } from '@angular/core/testing';
  import { ComponentFixtureAutoDetect } from '@angular/core/testing';
  import { ComponentFixture, TestBed } from '@angular/core/testing';
  import { By } from '@angular/platform-browser';
  import { DebugElement } from '@angular/core';

  import { BannerComponent } from './banner.component';

  describe('Banner Component (AutoChangeDetect)', () => {
      let comp: BannerComponent;
      let fixture: ComponentFixture<BannerComponent>;
      let de: DebugElement;
      let el: HTMLElement;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ BannerComponent ],
          providers: [
            { provide: ComponentFixtureAutoDetect, useValue: true }
          ]
        })
        .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(BannerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
      });

      it('should display original title', () => {
        expect(el.textContent).toContain(comp.title);
      });

      it('should still see original title after comp.title change', () => {
        const oldTitle = comp.title;
        comp.title = 'Hi Carmen';
        expect(el.textContent).toContain(oldTitle);
      });

      it('should display updated title after detectChanges', () => {
        comp.title = 'Hi Carmen';
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
      });

  });


// banner component templateurl tests
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerComponent } from './banner.component';

describe('BannerComponent (TemplateURL)', () => {
  let comp: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  // async beforeeach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ] // declare test component
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeeach
  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    comp = fixture.componentInstance; // banner component test instance
    // query for title h1 by css element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('no title in DOM until manually call \`detectChanges\`', () => {
    expect(el.textContent).toEqual('');
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    comp.title = 'Hi Baby!';
    fixture.detectChanges();
    expect(el.textContent).toContain('Hi Baby!');
  });

});


// dashboardhero component
import { Component, Input, Output, EventEmitter } from '@angular/core';

  import { Hero } from '../model/hero';

  @Component({
    selector: 'app-dashboard-hero',
    template: \`
      <div (click)="click()" class="hero">
            {{ hero.name | uppercase }}
      </div>
    \`,
    styleUrls: ['./dashboard-hero.component.css']
  })
  export class DashboardHeroComponent  {
    @Input() hero: Hero;
    @Output() selected = new EventEmitter<Hero>();

    click() {
      this.selected.emit(this.hero);
    }

  }


// dasboardhero component tests
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { addMatchers, click } from '../../testing';

import { DashboardHeroComponent } from './dashboard-hero.component';
import { Hero } from '../model/hero';

describe('DasboardHeroComponent', () => {
  let component: DashboardHeroComponent;
  let expectedHero: Hero;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroEl: DebugElement;

  // async beforeeach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent ]
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeeach
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;
    heroEl = fixture.debugElement.query(By.css('.hero')); // find hero element

    // pretend wired to something that supplied a hero
    expectedHero = new Hero(42, 'Nils-Holger');
    component.hero = expectedHero;
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name', () => {
    const expectedPipedName = expectedHero.name.toUpperCase();
    expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should raised selected event when clicked', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);

    heroEl.triggerEventHandler('click', null);
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raised selected event when clicked', () => {
    let selectedHero: Hero;
    component.selected.subscribe((hero: Hero) => selectedHero = hero);

    click(heroEl); // triggereventhandler helper
    expect(selectedHero).toBe(expectedHero);
  });
});

describe('DashboardHeroComponent when inside a test host', () => {
    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let heroEl: DebugElement;

    beforeEach(async() => {
      TestBed.configureTestingModule({
        declarations: [ DashboardHeroComponent, TestHostComponent ] // declare both
      }).compileComponents();
    });

    beforeEach(() => {
      // create testhostcomponent instead of dashboardherocomponent
      fixture = TestBed.createComponent(TestHostComponent);
      testHost = fixture.componentInstance;
      heroEl = fixture.debugElement.query(By.css('.hero')); // find hero
      fixture.detectChanges(); // trigger initial data binding
    });

    it('should display hero name', () => {
      const expectedPipedName = testHost.hero.name.toUpperCase();
      expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
    });

    it('should raise selected event when clicked', () => {
      click(heroEl);
      expect(testHost.selectedHero).toBe(testHost.hero);
    });

});

//// test host component ////
import { Component } from '@angular/core';

@Component({
  template: \`
          <app-dashboard-hero [hero]="hero"
          (selected)="onSelected($event)">
          </app-dashboard-hero>
  \`
})
class TestHostComponent {
  hero = new Hero(42, 'Nils-Holger');
  selectedHero: Hero;
  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}


// dashboard component
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../model/hero';
import { HeroService } from '../model/hero.service';

@Component({
  selector: 'app-dashboard',
  template: \`
      <h2 highlight>{{ title }}</h2>

      <div class="grid grid-pad">
        <app-dashboard-hero *ngFor="let hero of heroes" class="col-1-4"
                            [hero]="hero" (selected)="gotoDetail($event)">
        </app-dashboard-hero>
      </div>
  \`,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private router: Router,
              private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes()
                    .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero) {
    const url = \`/heroes/\${hero.id}\`;
    this.router.navigateByUrl(url);
  }

  get title() {
    const count = this.heroes.length;
    return count === 0 ? 'No Heroes' : count === 1 ? 'Top Hero' : \`Top \${count} Heroes\`;
  }

}


// dasboard component tests
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { addMatchers, click } from '../../testing';
import { HeroService } from '../model';
import { FakeHeroService } from '../model/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardModule } from './dashboard.module';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

beforeEach( addMatchers );

let component: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

//// deep ////
describe('DashboardComponent (deep)', () => {
  beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ DashboardModule ]
        });
  });

  const clickForDeep = () => {
    const heroEl = fixture.debugElement.query(By.css('.hero'));
    click(heroEl);
  };

  compileAndCreate();
  tests(clickForDeep);

});



//// shallow ////
describe('DasboardComponent (shallow)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DashboardModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
});

const clickForShallow = () => {
const heroEl = fixture.debugElement.query(By.css('app-dashboard-hero'));
heroEl.triggerEventHandler('selected', component.heroes[0]);
};

compileAndCreate();
tests(clickForShallow);

});

function compileAndCreate() {
  beforeEach(async(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: HeroService, useClass: FakeHeroService },
            { provide: Router, useClass: RouterStub }
          ]
        })
        .compileComponents().then(() => {
              fixture = TestBed.createComponent(DashboardComponent);
              component = fixture.componentInstance;
        });
  }));
}

function tests(heroClick: Function) {

    it('should not have heroes before ngoninit', () => {
        expect(component.heroes.length).toBe(0,
        'should not have heroes before ngoninit');
    });

    it('should not have heroes immediately after ngoninit', () => {
        fixture.detectChanges(); // runs initial lifecycle hooks
        expect(component.heroes.length).toBe(0,
        'should not have heroes until service promise resolves');
    });

    describe('after get dashboard heroes', () => {
      // trigger component so it gets heroes and binds to them
      beforeEach(async(() => {
        fixture.detectChanges(); // runs ngoninit getheroes
        fixture.whenStable() // no need for lastpromise hack
        .then(() => fixture.detectChanges()); // bind to heroes
      }));

      it('should have heroes', () => {
        expect(component.heroes.length).toBeGreaterThan(0,
        'should have heroes after service promise resolves');
      });

      it('should display 4 heroes', () => {
          // find and examine heroes
          // look for them in the dom by css class
          const heroes = fixture.debugElement.queryAll(By.css('app-dashboard-hero'));
          expect(heroes.length).toBe(4, 'should display 4 heroes');
      });

      it('should tell router to navigate when hero clicked',
          inject([Router], (router: Router) => {
            const spy = spyOn(router, 'navigateByUrl');

            heroClick(); // trigger click onf first inner <div class="hero">

            // args passed to router.navigateByUrl()
            const navArgs = spy.calls.first().args[0];

            // expecting to navigate to id of the component's first hero
            const id = component.heroes[0].id;
            console.log(navArgs);
            console.log('/heroes/' + id);
            expect(navArgs).toBe('/heroes/' + id, 'should nav to herodetail for first hero');
          }));

    });

}


// twain service
import { Injectable } from '@angular/core';

  const quotes = [
    \`Always do the right thing. This will gratify some people and astonish the rest.\`,
    \`I have never let my schooling interfere with my education.\`,
    \`Don't go around saying the world owes you a living. The world owes you nothing.
    It was here first.\`,
    \`Whenever you find yourself on the side of majority, it is time to pause and reflect.\`,
    \`If you tell the truth, you don't have to remember anything.\`,
    \`Clothes make the man. Naked people have little or no influence on society.\`,
    \`It's not the size of the dog in the fight, it's the size of the fight in the dog.\`,
    \`Truth is stranger than fiction, but it is because fiction is obliged to stick to
    possibilities; Truth isn't.\`,
    \`The man who does not read a good book has no advantage over the man who cannot
    read them.\`,
    \`Get your facts first, and then you can distort them as much as you please.\`
  ];

  @Injectable()
  export class TwainService {
    private next = 0;

    getQuote(): Promise<string> {
      return new Promise(resolve => {
        setTimeout(() => resolve(this.nextQuote()), 500);
      });
    }

    private nextQuote() {
      if (this.next === quotes.length) {
        this.next = 0;
      }
      return quotes[ this.next++ ];
    }

  }


// highlight directive
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnChanges {
  @Input('highlight') bgColor: string;

  defaultColor = 'rgb(211, 211, 211)';

  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
   }

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }

}


// title case pipe
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase', pure: false
})
export class TitleCasePipe implements PipeTransform {

  transform(input: string): string {
    return input.length === 0 ? '' :
           input.replace(/wS*/g,
            (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
  }

}


// shared module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HighlightDirective } from './highlight.directive';
import { TitleCasePipe } from './title-case.pipe';
import { TwainComponent } from './twain.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HighlightDirective,
    TitleCasePipe,
    TwainComponent
  ],
  declarations: [HighlightDirective, TitleCasePipe, TwainComponent]
})
export class SharedModule { }


// twain component
import { Component, OnInit } from '@angular/core';

import { TwainService } from './twain.service';

@Component({
  selector: 'app-twain-quote',
  template: \`
        <p class="twain"><i>{{ quote }}</i></p>
  \`
})
export class TwainComponent implements OnInit {
  intervalId: number;
  quote = '...';

  constructor(private twainService: TwainService) { }

  ngOnInit() {
    this.twainService.getQuote().then(quote => this.quote = quote);
  }

}


// twain component tests
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';


describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;

  let spy: jasmine.Spy;
  let de: DebugElement;
  let el: HTMLElement;
  let twainService: TwainService; // actually injected service

  const testQuote = 'The will to win is nothing without the will to prepare.';


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TwainComponent ],
      providers: [ TwainService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;

    // twainservice actually injected into component
    twainService = fixture.debugElement.injector.get(TwainService);

    // setup spy on \`getquote\` method
    spy = spyOn(twainService, 'getQuote').and.returnValue(Promise.resolve(testQuote));

    // get twain quote element by css selector (e.g. by class name)
    de = fixture.debugElement.query(By.css('.twain'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show quote before OnInit', () => {
    expect(el.textContent).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
  });

  it('should still not show quote after component initialized', () => {
    fixture.detectChanges();
    // getquote service is async => still has not returned with quote
    expect(el.textContent).toBe('...', 'no quote yet');
    expect(spy.calls.any()).toBe(true, 'getQuote called');
  });

  it('should show quote after getQuote promise (async)', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => { // wait for async getquote
        fixture.detectChanges();      // update view with quote
        expect(el.textContent).toBe(testQuote);
    });
  }));

  it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
      fixture.detectChanges();
      tick(); // wait for async getquote
      fixture.detectChanges();
      expect(el.textContent).toBe(testQuote);
  }));

  it('should show quote after getQuote promise (done)', (done: any) => {
    fixture.detectChanges();

    // get spy promise and wait for it to resolve
    spy.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges(); // update view with quote
        expect(el.textContent).toBe(testQuote);
        done();
    });
  });

});


// welcome component
import { Component, OnInit } from '@angular/core';

  import { UserService } from './model/user.service';

  @Component({
    selector: 'app-welcome',
    template: \`
          <h3 class="welcome"><i>{{ welcome }}</i></h3>
    \`
  })
  export class WelcomeComponent implements OnInit {
    welcome = '--- not initialized yet ---';

    constructor(private userService: UserService) { }

    ngOnInit() {
      this.welcome = this.userService.isLoggedIn ?
      'Welcome, ' + this.userService.user.name : 'Please log in.';
    }

  }


// welcome component tests
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
  import { By } from '@angular/platform-browser';
  import { DebugElement } from '@angular/core';

  import { WelcomeComponent } from './welcome.component';
  import { UserService } from './model';

  describe('WelcomeComponent', () => {
    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let componentUserService: UserService; // actually injected service
    let userService: UserService; // testbed injected service
    let de: DebugElement; // debugelement with welcome message
    let el: HTMLElement; // dom element with welcome message

    let userServiceStub: {
      isLoggedIn: boolean;
      user: { name: string }
    };

    beforeEach(async(() => {
      // stub userservice for test purposes
      userServiceStub = {
        isLoggedIn: true,
        user: { name: 'Carmen Labelle' }
      };

      TestBed.configureTestingModule({
        declarations: [ WelcomeComponent ],
        providers: [ {provide: UserService, useValue: userServiceStub } ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WelcomeComponent);
      component = fixture.componentInstance;
      // userservice actually injected into component
      userService = fixture.debugElement.injector.get(UserService);
      componentUserService = userService;
      // userservice from root injector
      userService = TestBed.get(UserService);

      // get welcome element by css selector (e.g. by class name)
      de = fixture.debugElement.query(By.css('.welcome'));
      el = de.nativeElement;

      // fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should welcome the user', () => {
      fixture.detectChanges();
      const content = el.textContent;
      expect(content).toContain('Welcome', '"Welcome ..."');
      expect(content).toContain('Carmen Labelle', 'expected name');
    });

    it('should welcome "Nils-Holger"', () => {
      userService.user.name = 'Nils-Holger'; // welcome message hasn't been shown yet
      fixture.detectChanges();
      expect(el.textContent).toContain('Nils-Holger');
    });

    it('should request login if not logged in', () => {
      userService.isLoggedIn = false; // welcome message hasn't been shown yet
      fixture.detectChanges();
      const content = el.textContent;
      expect(content).not.toContain('Welcome', 'not welcomed');
      expect(content).toMatch(/log in/i, '"log in"');
    });

    it(\`should inject the component's UserService instance\`, () => {
      inject([UserService], (service: UserService) => {
        expect(service).toBe(componentUserService);
      });
    });

    it('TestBed and Component UserService should be the same', () => {
      expect(userService === componentUserService).toBe(true);
    });

    it('stub object and injected UserService should not be the same', () => {
      expect(userServiceStub === userService).toBe(false);
      // changing stub object has no effect on injected service
      userServiceStub.isLoggedIn = false;
      expect(userService.isLoggedIn).toBe(true);
    });

  });


// testing utilities: global jasmine
import jasmineRequire from 'jasmine-core/lib/jasmine-core/jasmine.js';

window['jasmineRequire'] = jasmineRequire;


// testing utilities: jasmine matchers definition
declare namespace jasmine {
  interface Matchers<T> {
    toHaveText(actual: any, expectationFailOutput?: any): jasmine.CustomMatcher;
  }
}


// testing utilities: jasmine matchers implementation
/// <reference path="./jasmine-matchers.d.ts" />


  //// Jasmine Custom Matchers ////
  // be sure to extend jasmine-matchers.d.ts when adding matchers

  export function addMatchers(): void {
    jasmine.addMatchers({
      toHaveText: toHaveText
    });
  }

  function toHaveText(): jasmine.CustomMatcher {

    return {
      compare: function(actual: any,
                        expectedText: string,
                        expectationFailOutput?: any): jasmine.CustomMatcherResult {
              const actualText = elementText(actual);
              const pass = actualText.indexOf(expectedText) > -1;
              const message = pass ? '' : composeMessage();
              return { pass, message };

              function composeMessage() {
                const a = (actualText.length < 100 ? actualText :
                  actualText.substr(0, 100) + '...');
                const efo = expectationFailOutput ? \` '\${expectationFailOutput}'\` : '';
                return \`Expected element to have text content '\${expectedText}'
                        instead of '\${a}'\${efo}\`;
              }
      }
    };
  }

  function elementText(n: any): string {
    if (n instanceof Array) {
      return n.map(elementText).join('');
    }
    if (n.nodeType === Node.COMMENT_NODE) {
      return '';
    }
    if (n.nodeType === Node.ELEMENT_NODE && n.hasChildNodes()) {
      return elementText(Array.prototype.slice.call(n.childNodes));
    }
    if (n.nativeElement) {
      n = n.nativeElement;
    }
    return n.textContent;
  }


// testing utilities: router stubs
export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';


@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({ selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
}

// only implements params and part of snapshot.parammap
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';

@Injectable()
export class ActivatedRouteStub {

  // activatedroute.parammap is observable
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();

  // test parameters
  private _testParamMap: ParamMap;
  get testParamMap() {
    return this._testParamMap;
  }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  // activatedroute.snapshot.parammap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }

}


// testing utilirties: barrel + more utilities
import { DebugElement } from '@angular/core';
import { tick, ComponentFixture } from '@angular/core/testing';

export * from './jasmine-matchers';
export * from './router-stubs';


//// short utilities ////

/* wait a tick, then detect changes */
export function advance(f: ComponentFixture<any>): void {
  tick();
  f.detectChanges();
}

//// create a custom dom event the old fashioned way ////
export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 }
};

// simulate element click. defaults to mouse left-button click event
export function click(el: DebugElement | HTMLElement,
                      eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}


// basic intro to typescript
// constant named properties
const Foo = 'Foo';
const Bar = 'Bar';

let x = {
  [Foo]: 100,
  [Bar]: 'hello world'
};

let a = x[Foo]; // type number
let b = x[Bar]; // type string


// strict class initialization
export class TypescriptComponent {

  foo: number;
  bar = 'hello world';
  baz: boolean;

  constructor() {
    this.foo = 42;
  }

}


// fixed length tuples
interface NumberStringTuple extends Array<number | string> {
  0: number;
  1: string;
  length: 2;
}


// optional catch clause variables
let input = '...';
try {
  JSON.parse(input);
}
catch {
  console.log('invalid JSON ' + input);
}


// string enums
enum Colors {
  Red = 'RED',
  Blue = 'BLUE',
  Green = 'GREEN'
}


// improved inference for generics
function arrayMap<T, U>(f: (x: T) => U): (a: T[]) => U[] {
  return a => a.map(f);
}

const lengths: (a: string[]) => number[] = arrayMap(s => s.length);


// weak detection type
interface Options {
  data?: string;
  timeout?: number;
  maxRetries?: number;
}


// support for mixin classes
class Point {
  constructor(public x: number, public y: number) { }
}

class Person {
  constructor(public name: string) { }
}

type Constructor<T> = new(...args: any[]) => T;

function Tagged<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    _tag: string;
    constructor(...args: any[]) {
      super(...args);
      this._tag = '';
    }
  };
}

const TaggedPoint = Tagged(Point);

let point = new TaggedPoint(100, 200);
point._tag = 'hello world';

class Customer extends Tagged(Person) {
  accountBalance: number;
}

let customer = new Customer('John');
customer._tag = 'test';
customer.accountBalance = 1000000;



// object type
declare function create(obj: object | null): void;

create({ property: 100 });
create(null);


// keyof
interface Person {
  name: string;
  age: number;
  location: string;
}

type Key1 = keyof Person;
type Key2 = keyof Person[];
type Key3 = keyof { [x: string]: Person };


// mapped types
interface Person {
  name: string;
  age: number;
  location: string;
}

interface PartialPerson {
  name?: string;
  age?: number;
  location?: string;
}

type Partial<T> = {
      [P in keyof T]?: T[P];
};

type PP = Partial<Person>;


// tagged union types
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape) {
  switch (shape.kind) {
    case 'square':
        return shape.size * shape.size;
    case 'rectangle':
        return shape.height * shape.width;
    case 'circle':
        return Math.PI * shape.radius * shape.radius;
  }
}

function test1(shape: Shape) {
  if (shape.kind === 'square') {
    shape;
  } else {
    shape;
  }
}

function test2(shape: Shape) {
  if (shape.kind === 'rectangle' || shape.kind === 'circle') {
    return;
  }
  shape;
}


// type parameters as constraints
function assign<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = source[id];
  }
  return target;
}


// async await support
async function logDelayed(elements: string[]) {
  for (const element of elements) {
    await delay(200);
    console.log(element);
  }
}

async function delay(ms: number) {
  return new Promise<void>(resolve => {
          setTimeout(resolve, ms);
  });
}

logDelayed(['Hi', 'Baby', 'Beautiful', 'Asynchronous', 'Planet']).then(() => {
  console.log();
  console.log('Logged every element');
});


// this typing
class BasicCalculator {

  public constructor(protected value: number = 0) { }

  public currentValue(): number {
    return this.value;
  }

  public add(operand: number) {
    this.value += operand;
    return this;
  }

  public subtract(operand: number) {
    this.value -= operand;
    return this;
  }

  public multiply(operand: number) {
    this.value *= operand;
    return this;
  }

  public divide(operand: number) {
    this.value /= operand;
    return this;
  }

}

class ScientificCalculator extends BasicCalculator {

  public constructor(value = 0) {
    super(value);
  }

  public square() {
    this.value = this.value ** 2;
    return this;
  }

  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }

  public cos() {
    this.value = Math.cos(this.value);
    return this;
  }

}

let value = new BasicCalculator(10).add(100).subtract(20).multiply(5)
                                   .divide(9).currentValue();
let value1 = new ScientificCalculator(100).add(1000).sin().currentValue();


// abstract classes/methods support
abstract class Base {
  abstract getLaid(): string;
  getAGirlFriend() { return 'you sexy string ...'; }

}

class Derived extends Base {
  getLaid() {
    return 'super sex ... () => get married.';
  }

}

  const x: Base = new Derived();
  console.log(x.getLaid());
  console.log(x.getAGirlFriend());


// generic type aliases
type Lazy<T> = T | (() => T);

let s: Lazy<string>;
s = 'eager';
s = () => 'lazy';

interface Tuple<A, B> {
    a: A;
    b: B;

}

type Pair<T> = Tuple<T, T>;


// support for es6 generators
function *g(): Iterable<string> {
  for (let i = 1; i < 4; i++) {
    yield 'hi baby ' + i;
  }
}


// decorators
class C {
  @readonly
  @enumerable(false)
  method() { }
}

function readonly(target, key, descriptor) {
  descriptor.writable = false;
}

function enumerable(value) {
  return function(target, key, descriptor) {
    descriptor.enumerable = value;
  };
}


// union types
interface RunOptions {
  program: string;
  terminal: string[] | string | (() => string);
}

private options: RunOptions;

this.options.terminal = 'hello world';
this.options.terminal = ['hello', 'world'];
this.options.terminal = () => 'hello world';


function formatTerminal(c: string | string[]) {
  if (typeof c === 'string') {
    return c.trim();
  } else {
    return c.join(',');
  }
}

class Dog {
  woof() {}
}

class Cat {
  meow() {}
}

let pet: Dog | Cat;

if (pet instanceof Dog) {
  pet.woof();
} else {
  pet.meow();
}

type PrimitiveArray = Array<string | number | boolean>;
type MyNumber = number;
type callback = () => void;


// protected, tuple types
class Female {
  protected protectHer() { }
}

class MyWife extends Female {
  public takeHerToTheMovies() {
    this.protectHer();
  }
}

let x: [string, number];
x = ['hello', 100];

const t = new MyWife();
t.takeHerToTheMovies();


// basic types
let isDone: boolean = false;
  let decimal: number = 42;
  let hex: number = 0xf00d;
  let binary: number = 0b1010;
  let octal: number = 0o744;

  let color: string = 'red';

  let fullName: string = 'Nils-Holger Nägele';
  let age: number = 46;
  let sentence: string = \`Hello, my name is \${ fullName }.
  I'll be \${ age + 1 } years in 7 months.
  \`;

  let list: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  let list1: Array<number> = [9, 10, 11, 12, 13, 14, 15, 16];

  let y: [string, number];
  y = ['hi', 42];
  console.log(y[0].substr(1));

  enum Color { Red, Green, Blue }
  let c: Color = Color.Red;
  let colorName: string = Color[0];
  console.log(colorName);

  let notSure: any = 6;
  notSure = 'she takes any and wants many ...';
  notSure = false;

  let list3: any[] = [1, true, 'free'];

  let someValue: any = 'this is a string';
  let strLength: number = (<string>someValue).length;
  let strLength1: number = (someValue as string).length;

  function greetUser(): void {
    console.log('welcome in the pleasure dome ...');
  }

  function error(message: string): never {
    throw new Error(message);
  }

  function infiniteLoop(): never {
    while (true) {

    }
  }


// variable declarations
let hello = 'Hello';
console.log(theCityThatNeverSleepsAndProducesWorldsBestSoftware());

for (let i = 1; i <= 1024; i++) {
  setTimeout(() =>  console.log(i), 100 * i);
}

const eternalLife = 1000;

const input = [1, 2, 3, 4, 5];
const [first, second, third, fourth, fifth] = input;
console.log(third);
console.log(fourth);
f([100, 200]);

let [firstEntry, ...rest] = [1, 2, 3, 4, 5];
console.log(firstEntry);
console.log(rest);

const o = {
    a: 'foo',
    b: 42,
    c: 'bar'
};
const { a, b } = o;

const winner = [1, 2];
const firstLooser = [3, 4];

const bothPlus = [0, ...winner, ...firstLooser, 5];

const theCityThatNeverSleepsAndProducesWorldsBestSoftware = () => {
  let getCity;
  if (true) {
    let city = 'Berlin';
    getCity = () =>  city;
  }
  return getCity();
};

const f = ([first, second]: [ number, number]) => {
  console.log(first);
  console.log(second);
};

const keepWholeObject = (wholeObject: { a: string, b?: number }) => {
  const { a, b = 1001 } = wholeObject;
};


// interfaces
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class Textbox extends Control {
  select() { }
}

class Location { }

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = () => { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 10.0;

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = 'red';
square.sideLength = 10;
square.penWidth = 6.0;

interface ClockConstructor {
  new (hour: number, minute: number, second: number): ClockInterface;
}

interface ClockInterface {
  tick();
}

const createClock = (ctor: ClockConstructor,
                     hour: number,
                     minute: number,
                     second: number): ClockInterface => {
  return new ctor(hour, minute, second);
};

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number, s: number) { }
  tick() {
    console.log('beep beep');
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number, s: number) { }
  tick() {
    console.log('tick tock');
  }
}

let digital = createClock(DigitalClock, 7, 15, 0);
let analog = createClock(AnalogClock, 12, 55, 59);

interface SearchFunc {
  search?: string;
  (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = (src: string, sub: string) => {
                let result = src.search(sub);
                return result > -1;
};


interface SquareConfig {
  color?: string;
  width?: number;
}

const createSquare = (config: SquareConfig): { color: string, area: number } => {
  let color = config.color ? config.color : 'red';
  let area = config.width ? Math.pow(config.width, 2) : 100;
  return { color, area };
};

let mySquare = createSquare({ color: 'green', width: 10 });


interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 8, y: 16 };


// classes
class Point {
  a: number;
  b: number;

}

interface Point3D extends Point {
  c: number;
}

let point3D: Point3D = { a: 1, b: 2, c: 3 };

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello ' + this.greeting;
  }
}

let greeter: Greeter;
greeter = new Greeter('World');
console.log(greeter.greet());

abstract class Department {
  constructor(public name: string) { }

  printName(): void {
    console.log('Department name is: ' + this.name);
  }

  abstract printMeeting(): void;

}

class EngineeringDepartment extends Department {

  constructor() {
    super('Software Engineering');
   }

   printMeeting() {
   console.log('The Engineering Department meets each Morning at 4:00 AM');
   }

   generateCharts(): void {
     console.log('Generating Velocity and Burndown charts ...');
   }
}

let department: Department;
department = new EngineeringDepartment();
department.printName();
department.printMeeting();

class Grid {

  static origin = { x: 0, y: 0 };

  constructor(public scale: number) {

  }

  calculateDistanceFromOrigin(point: { x: number; y: number; }) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

const passcode = 'secret_passcode';

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode === 'secret_passcode') {
      this._fullName = newName;
    } else {
      console.log('Error: Unauthorized update of employee!');
    }
  }

}

let employee = new Employee();
employee.fullName = 'John Blow';
if (employee.fullName) {
  console.log(employee.fullName);
}


class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(\`\${this.name} moved \${distanceInMeters}m.\`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 10) {
    console.log('Slithering ...');
    super.move(distanceInMeters);
  }
}

class WorkStallion extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 150) {
    console.log('Galloping ...');
    super.move(distanceInMeters);
  }

}

let nils = new Snake('Nils the Cobra');
let wally = new WorkStallion('Wally the Racer');

nils.move();
wally.move(200);


// functions
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = (x: number, y: number): number => x + y;

let z = 100;

function addToZ(x, y) {
  return x + y + z;
}

function buildName(firstName: string, lastName: string): string {
  return firstName + ' ' + lastName;
}

let result1 = buildName('Mary', 'Fox');

const buildName1 = (firstName: string, lastName?: string): string =>  {
            return lastName ? firstName + ' ' + lastName : firstName;
};

const buildName2 = (firstName: string, lastName = 'Blow'): string => firstName + lastName;

const buildName3 = (firstName = 'Will', lastName: string): string => firstName + lastName;

function buildName4(firstName: string, ...restOfNames: string[]) {
  return firstName + ' ' + restOfNames.join(' ');
}

let employeeNames = buildName4('Joseph', 'Samuel', 'Lucas', 'Alice');

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName4;

let deck = {
        suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        cards: Array(52),
        createCardPicker: function() {
          return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
          };
        }
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);

interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardSelector(this: Deck): () => Card;
}

const decker: Deck = {
          suits: ['hearts', 'spades', 'clubs', 'diamonds'],
          cards: Array(52),
          createCardSelector: function(this: Deck) {
            return () => {
              let selectedCard = Math.floor(Math.random() * 52);
              let selectedSuit = Math.floor(selectedCard / 13);

              return { suit: this.suits[selectedSuit], card: selectedCard % 13 };
            };
          }
};

let cardSelector = decker.createCardSelector();
let selectedCard = cardSelector();

console.log('card: ' + selectedCard.card + ' of ' + selectedCard.suit);


// generics
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nameTag: string;
}

class Animal {
  numberLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Giraffe extends Animal {
  keeper: ZooKeeper;
}

const createInstance = <A extends Animal>(c: new () => A): A => new c();

createInstance(Giraffe).keeper.nameTag;
createInstance(Bee).keeper.hasMask;

const getProperty = <T, K extends keyof T>(obj: T, key: K) => obj[key];


let x = { a: 10, b: 20, c: 30, d: 40 };

console.log(getProperty(x, 'c'));

interface LengthWise {
  length: number;
}

function loggingIdentity<T extends LengthWise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

console.log(loggingIdentity({length: 10, value: 3}));

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}


let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (a, b) => a + b;

console.log(myGenericNumber.add(myGenericNumber.zeroValue, 42));

interface GenericIdentityFn<T> {
  search?: T;
  (arg: T): T;
}

const identity = <T>(arg: T): T => arg;

let myIdentity: GenericIdentityFn<number> = identity;

console.log(identity<string>('herString'));
console.log(identity<number>(42));
console.log(identity<boolean>(true));
console.log(identity<any>('she wants many ...'));


// enums
const enum Directions { North, South, East, West }

let directions = [ Directions.North, Directions.South, Directions.East, Directions.West ];

enum E {
  X, Y, Z
}

const f = (obj: { X: number }) => obj.X;

console.log(f(E));

enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Circle,
  radius: 15
};

enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  G = 'ABC'.length
}

console.log(FileAccess.Write + '' + FileAccess.Read);

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

console.log(Direction.Right);


// iterators and generators
let someArray = [1, 'string', true];

for (let entry of someArray) {
  console.log(entry);
}

for (let entry in someArray) {
  if (someArray.hasOwnProperty(entry)) {
  console.log(entry);
  }
}

let pets = new Set(['Dog', 'Cat', 'Rabbit']);
pets['species'] = 'mammals';

for (let pet in pets) {
  if (pets.hasOwnProperty(pet)) {
  console.log(pet);
  }
}

let numbers = [1, 13, 33, 71, 100];
for (let num of numbers) {
  console.log(num);
}


// decorators
import 'reflect-metadata';

function c() {
  console.log('c(): evaluated');
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('c(): called');
  };
}

function p() {
  console.log('p(): evaluated');
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('p(): called');
  };
}

class C {
    @c()
    @p()
    method() { }
}


@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @enumerable(false)
  greet() {
    return 'Hey, ' + this.greeting;
  }
}

function enumerable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

console.log(new Greeter('Marie').greet());

function classDecorator<T extends { new(...args: any[]): {}}>(constructor: T) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  };
}

@classDecorator
class Greeter1 {
  property = 'property';
  hello: string;
  constructor(msg: string) {
    this.hello = msg;
  }
}

console.log(new Greeter1('world'));


class Point {
      private _x: number;
      private _y: number;

      constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
      }

      @configurable(false)
      get x() { return this._x; }

      @configurable(false)
      get y() { return this._y; }
}

function configurable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

console.log(new Point(1, 10).x);

class Greeter2 {
  @format('Hello, %s')
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    let formatString = getFormat(this, 'greeting');
    return formatString.replace('%s', this.greeting);
  }
}

const formatMetadataKey = Symbol('format');

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter3 {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @validate
  greet(@required name: string) {
    return 'Hey, ' + name + ', ' + this.greeting;
  }
}

const requireMetadataKey = Symbol('required');

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requireMetadataKey,
  target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requireMetadataKey, existingRequiredParameters,
    target, propertyKey);
}

function validate(target: any, propertyName: string,
                  descriptor: TypedPropertyDescriptor<Function>) {
                    let method = descriptor.value;
                    descriptor.value = function() {
                      let requiredParameters: number[] =
                                              Reflect.getOwnMetadata(requireMetadataKey,
                      target, propertyName);
                      if (requiredParameters) {
                          for (let parameterIndex of requiredParameters) {
                            if (parameterIndex >= arguments.length ||
                              arguments[parameterIndex] === undefined) {
                                throw new Error('Missing required argument.');
                              }
                          }
                      }
                      return method.apply(this, arguments);
                    };
                  }
console.log(new Greeter3('what's up?').greet('Nils-Holger'));

class Point1 {
  x: number;
  y: number;
}

class Line {
  private _p0: Point;
  private _p1: Point;

  @validate1
  set p0(value: Point) { this._p0 = value; }
  get p0() { return this._p0; }

  @validate1
  set p1(value: Point) { this._p1 = value; }
  get p1() { return this._p1; }

}

function validate1<T>(target: any, propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>) {
  let set = descriptor.set;
  descriptor.set = function(value: T) {
    let type = Reflect.getMetadata('design:type', target, propertyKey);
    if (!(value instanceof type)) {
      throw new TypeError('Invalid type.');
    }
    set(value);
  };
}

  `,
  blockQuote: `
  Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
  sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
  und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
  und eine die wir vorhaben zu gewinnen.
  `,
  imageFooterUrl: 'assets/img/post8.jpg',
  footerQuote: 'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.'
},
{
  id: 9,
  imageHeaderUrl: 'url(assets/img/post9-bg.jpg)',
  heading: 'Du kannst kein Javascript- Teil 1',
  subHeading: 'Javascript Unter der Haube',
  metaPublishedDate: 'am 29 Dezember, 2019',
  sectionHeading: 'Du kannst kein Javascript!?!',
  code: `
// values, I value JavaScript
// value embedded using literal
console.log('My name is Nils-Holger.');
const firstName = 'Nils-Holger';
// delimit string literal with back-tick
console.log(\`My name is \${firstName}\`);
// primitive literal values such as boolean and numbers
// while (false) {
//   console.log(3.141592);
// }
const names = ['Joe', 'Nils-Holger', 'Mark'];
// access array element in second position like this
console.log(\`My name is \${names[1]}\`);
// better use undefined as as single empty value
const value = null;
// while (value !== undefined) {
//   console.log('Still got something');
// }
const hitchhikersGuide = [];
// primitive symbol is a hidden unguessable value, unique identifier
const result = hitchhikersGuide[Symbol('meaning of life')];
// 42

// arrays and objects
// arrays special type of object comprised of an ordered and numerically
// indexed list of data
const names1 = ['Peter', 'Nils', 'Tim', 'Ernst'];
const len = names1.length; // 4
const first = names1[0]; // Peter
const second = names1[1]; // Nils

// objects, unordered keyed collection of any various values
const name = {
  first: 'Nils-Holger',
  last: 'Nägele',
  age: 48,
  specialties: ['JS', 'HTML']
};
console.log(\`My name is \${name.first}\`);

// value type determination
console.log(typeof 42); // number
const str = typeof 'abc'; // string
const bool = typeof true; // boolean
const undef = typeof undefined; // undefined
const nul = typeof null; // 'object' --oops, JS bug
const obj = typeof { a: 1 }; // 'object'
const obj1 = typeof [1, 2, 3]; // 'object'
const func = typeof function hello() {}; // 'function'

// declaring and using variables
// global scope
var name = 'Nils-Holger';
var name;

// block scoped
let name = 'Nils-Holger';
let name;


var adult true;
if (adult) {
  var name = 'Nils-Holger';
  let age = 48;
  console.log('Shhh, this is a secret');
}

console.log(name); // Nils-Holger
console.log(age); // error

// const block scoped, value must be assigned at declaration
const myBirthday = true;
let age = 48;
if (myBirthday) {
  age = age + 1;
  myBirthday = false; // error
}

// const variables are not unchangeable, they just cannot be reassigned
const actors = ['Morgan Freeman', 'Jennifer Anniston'];
actors[2] = 'Tom Cruise';

actors = []; // error


function hello(firstName) {
  console.log(\`Hello \${firstName}\`);
}

hello('Nils-Holger');

// err is block scoped, exists only inside catch clause
try {
  someError();
} catch (err) {
  console.log(err);
}


// functions
// function declaration
function awesomeFunction(coolThings) {
  // ...
  return amazingStuff;
}

// function expression
const awesomeFunction1 = function (coolThings) {
  // ...
  return amazingStuff;
};

// arrow function
const awesomeFunction2 = (coolThings) => amazingStuff;

// function paramater input
function greeting(myName) {
  console.log(\`Hello \${myName}\`);
}

greeting('Nils-Holger');

// function with return value
function greeting1(myName) {
  return \`Hello \${myName}!\`;
}

const msg = greeting1('Nils-Holger');
console.log(msg); // Hello Nils-Holger!


// functions assigned as properties on objects
const whatToSay = {
  greeting() {
    console.log('Hello!');
  },
  question() {
    console.log('What is your name?');
  },
  answer() {
    console.log('My name is Nils-Holger.');
  }
};

whatToSay.greeting(); // Hello!

// comparisons
3 === 3; // true
'yes' === 'yes'; // true
null === null; // true
false === false; // true


42 === '42'; // false
'hello' === 'Hello'; // false
true === 1; // false
0 === null; // false
'' === null; // false
null === undefined; // false


NaN === NaN; // false
0 === -0; // true


// comparisons object values, non-primitives
[1, 2, 3] === [1, 2, 3]; // false
{ a: 42 } === { a: 42 }; // false
(x => x * 2) === (x => x * 2); // false


// in JS all object values are held by reference, assigned and passed by reference copy
// are compared by reference(identity) equality
const x = [1, 2, 3];

// assignment is by reference copy, y references the same array as x, not another copy of it
const y = x;

y === x; // true
y === [1, 2, 3]; // false
x === [1, 2, 3]; // false

// coercive comparisons ==

42 == '42'; // true
1 === true; // true


const arr = ['1', '10', '100', '1000'];
for (let i = 0; i < arr.length && arr[i] < 500; i++) {
    // will run 3 times
}

const x1 = '10';
const y1 = '9';
x1 < y1; // true, be careful!


// classes
class Page {
  text: string;
  constructor(text) {
    this.text = text;
  }
  print() {
    console.log(this.text);
  }
}

class Notebook {
  pages: Page[];
  constructor() {
    this.pages = [];
  }
  addPage(text) {
    const page = new Page(text);
    this.pages.push(page);
  }
  print() {
    for (let page of this.pages) {
      page.print();
    }
  }
}

const mathNotes = new Notebook();
mathNotes.addPage('Arithmetic: + - * / ...');
mathNotes.addPage('Trigonometry: sin cos tan ...');
mathNotes.print();
// ...

// class inheritance

class Publication {
  title: string;
  author: string;
  pubDate: string;
  constructor(title, author, pubDate) {
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
  }
  print() {
    console.log(\`
        Title: \${this.title}
        By: \${this.author}
        \${this.pubDate}
    \`);
  }
}

class Book extends Publication {
  publisher: string;
  ISBN: string;
  constructor(bookDetails) {
    super(bookDetails.title, bookDetails.author, bookDetails.publishedOn);
    this.publisher = bookDetails.publisher;
    this.ISBN = bookDetails.ISBN;
  }
  print() {
    super.print();
    console.log(\`
        Published By: \${this.publisher}
        ISBN: \${this.ISBN}
    \`);
  }
}

class BlogPost extends Publication {
  URL: string;
  constructor(title, author, pubDate, URL) {
    super(title, author, pubDate);
    this.URL = URL;
  }
  print() {
    super.print();
    console.log(this.URL);
  }
}


const YDKJS = new Book({
  title: 'You don\'t know JS',
  author: 'Kyle Simpson',
  publishedOn: 'June 2014',
  publisher: 'O\'Reilly',
  ISBN: '123456-789'
});

YDKJS.print();
// Title: You Don't know JS
// By: Kyle Simpson
// June 2014
// Published By: O'Reilly
// ISBN: 123456-789

const forAgainstLet = new BlogPost(
  'For and against Let',
  'Kyle Simpson',
  'October 27, 2014',
  'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet.print();
// Title: For and against Let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let


// modules, group behavior into logical units
// classic module form
function Publication1(title, author, pubDate) {
  const publicAPI = {
      print() {
          console.log(\`
              Title: \${ title }
              By: \${ author }
              \${ pubDate }
          \`);
      }
  };

  return publicAPI;
}

function Book1(bookDetails) {
  const pub = Publication1(
      bookDetails.title,
      bookDetails.author,
      bookDetails.publishedOn
  );

  const publicAPI = {
      print() {
          pub.print();
          console.log(\`
              Published By: \${ bookDetails.publisher }
              ISBN: \${ bookDetails.ISBN }
          \`);
      }
  };

  return publicAPI;
}

function BlogPost1(title,author,pubDate,URL) {
  const pub = Publication1(title,author,pubDate);

  const publicAPI = {
      print() {
          pub.print();
          console.log(URL);
      }
  };

  return publicAPI;
}

// usage of these module factory functions
const YDKJS1 = Book1({
  title: 'You Don\'t know JS',
  author: 'Kyle Simpson',
  publishedOn: 'June 2014',
  publisher: 'O\'Reilly',
  ISBN: '123456-789'
});

YDKJS1.print();
// Title: You Don't know JS
// By: Kyle Simpson
// June 2014
// Published By: O'Reilly
// ISBN: 123456-789

const forAgainstLet1 = BlogPost1(
  'For and against Let',
  'Kyle Simpson',
  'October 27, 2014',
  'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet1.print();
// Title: For and against Let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let


// ES Modules
// file publication.js
const printDetails = (title, author, pubDate) => {
  console.log(\`
      Title: \${ title }
      By: \${ author }
      \${ pubDate }
  \`);
};

export function create(title, author, pubDate) {
  const publicAPI = {
      print() {
          printDetails(title, author, pubDate);
      }
  };

  return publicAPI;
}

// import and use thid module from another ES module, like blogpost.js
import { create as createPub } from 'publication.js';

const printDetails1 = (pub, URL) => {
    pub.print();
    console.log(URL);
}

export function create1(title, author, pubDate, URL) {
    const pub = createPub(title, author, pubDate);

    const publicAPI = {
        print() {
            printDetails1(pub, URL);
        }
    };

    return publicAPI;
}


// use this module, import into main.js
import { create1 as createBlogPost } from 'blogpost.js';

const forAgainstLet2 = createBlogPost(
    'For and against Let',
    'Kyle Simpson',
    'October 27, 2014',
    'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet2.print();
// Title: For and against Let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let

// let us dive deeper into the JavaScript rabbit hole... ;-)
// consuming iterators with for of loop
const it = /* ... */;
// loop over results one at a time
for (let val of it) {
  console.log(\`Iterator value: \${val}\`);
}

// Iterator value: ...
// Iterator value: ...

// spread iterator into an array
const vals = [...it];

// function call spread
doSomethingUseful(...it);


// iterables
const arr = [10, 20, 30];
for (let val of arr) {
  console.log(\`Array value: \${val}\`);
}

// Array value: 10
// Array value: 20
// Array value: 30

// shallow copy array
const arrCopy = [...arr];

// iterate characters in string, one at a time
const greeting = 'hello world';
const chars = [...greeting];
chars;
// ['h', 'e', 'l', ...]

// map, given 2 DOM elements, btn1 and btn2
const buttonNames = new Map();
buttonNames.set(btn1, 'Button 1');
buttonNames.set(btn2, 'Button 2');

for (let [btn, btnName] of buttonNames) {
  btn.addEventListener('click', (onClick) => {
    console.log(\`Clicked \${btnName}\`);
  });
}

// consume values of buttonNames
for (let btnName of buttonNames.values()) {
  console.log(btnName);
}
// Button 1
// Button 2

// get index andd value in array iteration with entries() method
const arr1 = [10, 20, 30];
for (let [idx, val] of arr1.entries()) {
  console.log(\`[\${idx}]: \${val}\`);
}

// [0]: 10
// [1]: 20
// [2]; 30


// closure, function remembers and continues to access varaiables defined outside its scope
// even wehen function is executed in different scope
function greeting1(msg) {
  return function who1(name) {
    console.log(\`\${msg}, \${name}!\`);
  };
}

const hello = greeting1('Hello');
const hi = greeting1('Hi');

hello('Nils-Holger'); // Hello, Nils-Holger!
hello('Jennifer'); // Hello, Jennifer!
hi('Mark'); // Hi, Mark!

// closure can observe and make updates to variables over time
function counter(step = 1) {
  let count = 0;
  return function increaseCount() {
    count = count + step;
    return count;
  };
}

const incBy1 = counter(1);
const incBy3 = counter(3);

incBy1(); // 1
incBy1(); // 2

incBy3(); // 3
incBy3(); // 6
incBy3(); // 9


// closure most common when working with asynchronous code, such as callbacks
function getSomeData(url) {
  ajax(url, function onResponse(resp) {
    console.log(\`Response (from \${url}): \${resp}\`);
  });
}

getSomeData('https://some.url/wherever');
// Response (from https://some.url/wherever): ...whatever...

// another closure sample
for (let [idx, btn] of buttons.entries()) {
  btn.addEventListener('click', function onClick(evt) {
    console.log(\`Clicked on button (\${idx})!\`);
  });
}

// this keyword
function classroom(teacher) {
  return function study() {
    console.log(\`\${teacher} wants you to study \${this.topic}\`);
  };
}

const assignment = classroom('Nils-Holger'); // Nils-Holger wants you to study undfined

const homework = {
  topic: 'Javascript',
  assignment
};

homework.assignment(); // Nils-Holger wants you to study Javascript

const otherHomework = {
  topic: 'Math'
};

assignment.call(otherHomework); // Nils-Holger wants you to study Math


// prototypes
// object normal literal, default prototype linkage connects to Object.prototype
const homeworkOne = {
  topic: 'Javascript'
};

homeworkOne.toString(); // [object Object]

// define object prototype linkage
const otherHomeworkOne = Object.create(homeworkOne);

otherHomeworkOne.topic; // Javascript


// this revisited, this powers prototype delegated function calls
const homeworkTwo = {
  study() {
      console.log(\`Please study \${ this.topicTwo }\`);
  }
};

const jsHomework = Object.create(homeworkTwo);
jsHomework.topicTwo = 'Javascript';
jsHomework.study();
// Please study Javascript

const mathHomework = Object.create(homeworkTwo);
mathHomework.topicTwo = 'Mathematics';
mathHomework.study();
// Please study Mathematics


// Any sufficiently advanced technology is indistinguishable from magic. -- Arthur C. Clarke

// practice, practice, practice

// objects and classes

// this or that
function identify() {
  return this.name.toUpperCase();
}
function speak() {
  const greeting = 'Hello, I\'m ' + identify.call(this);
  console.log(greeting);
}
const me = {
  name: 'Nils-Holger'
};
const you = {
  name: 'Reader'
};
identify.call(me); // NILS-HOLGER
identify.call(you); // READER
speak.call(me); // Hello, I'm Nils-Holger
speak.call(you); // Hello I'm Reader

// instead of relying on this, could have passed in a context object to identify() and speak()
function identify1(context) {
  return context.name.toUpperCase();
}

function speak1(context) {
  const greeting = 'Hello, I\'m ' + identify1(context);
  console.log(greeting);
}

identify1(you); // READER
speak1(me); // Hello, I'm Nils-Holger


// track how many times a function was called
function foo(num) {
    console.log( 'foo: ' + num );
    // keep track of how many times foo is called
    this.count++;
}

foo.count = 0;

let i;

for (i = 0; i < 10; i++) {
    if (i > 5) {
       foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was foo called?
console.log( foo.count ); // 0

// fix hack, create object to hold count property
function foo1(num) {
  console.log( 'foo1: ' + num );
  // keep track of how many times foo1 is called
  data1.count++;
}

const data1 = {
  count: 0
};

let j: number;

for (j = 0; j < 10; i++) {
    if (j > 5) {
      foo1(j);
   }
}
// foo1: 6
// foo1: 7
// foo1: 8
// foo1: 9

// how many times was foo1 called?
console.log( data1.count ); // 4

function foo2() {
  foo2.count = 4; // foo2 refers to itself
}

setTimeout(() => {}, 10);


// solution use foo3 identifier as a function object reference in each place
const foo3 = (num) => {
  console.log( 'foo3: ' + num );
  // keep track of how many times foo3 is called
  foo3.count++;
};

foo3.count = 0;

let k;

for (k = 0; k < 10; k++) {
  if (k > 5) {
    foo3( i );
   }
}
// foo3: 6
// foo3: 7
// foo3: 8
// foo3: 9

// how many times was foo3 called?
console.log( foo3.count ); // 4


// another approach, force this to point to actual foo4 function object
function foo4(num) {
  console.log( 'foo4: ' + num );

 // keep track of how many times foo4 is called
 // Note: this IS actually foo4 now, based on
 // how foo4 is called (see below)
  this.count4++;
}

foo4.count4 = 0;

let l;

for (l = 0; l < 10; l++) {
    if (l > 5) {
     // using call(..), we ensure the this
     // points at the function object (foo) itself
      foo4.call( foo4, l );
    }
}
// foo4: 6
// foo4: 7
// foo4: 8
// foo4: 9

// how many times was foo called?
console.log( foo4.count4 ); // 4

// code that fails, attempts to cross over boundary and use this implicitly refer
// to a functions lexcial scope
const foo5 = () => {
  const a = 2;
  this.bar();
}

const bar5 = () => console.log(this.a);

foo5(); // undefined


// objects and classes, call-site
function baz() {
  // call-stack is: baz
  // so, our call-site is in the global scope

  console.log('baz');
  bar(); // <-- call-site for bar
}

function bar() {
  // call-stack is: baz -> bar
  // so, our call-site is in baz

  console.log('bar');
  foo(); // <-- call-site for foo
}

function foo() {
  // call-stack is: baz -> bar -> foo
  // so, our call-site is in bar

  console.log('foo');
}

baz(); // <-- call-site for baz

// default binding
function foo1() {
  console.log(this.a);
}

const a = 2;
foo(); // 2

// strict mode
function foo2() {
  'use strict';
  console.log(this.a1);
}

const a1 = 2;
foo2(); // undefined

function foo3() {
  console.log(this.a2);
}

const a2 = 2;

(() => {
  'use strict';
  foo3(); // 2
})();


// implicit binding
const foo4 = () => console.log(this.a3);

const obj = {
  a3: 2,
  foo4
};

obj.foo4(); // 2


// only top/last level of an object property reference chain matters to the call-site

const foo5 = () => console.log(this.a5);

const obj2 = {
  a5: 42,
  foo5
};

const obj1 = {
  a5: 2,
  obj2
};

obj1.obj2.foo5(); // 42



// implicitly lost
function foo() {
  console.log( this.a );
}

const obj = {
  a: 2,
  foo
};

const bar = obj.foo; // function reference/alias!

var a = 'oops, global'; // 'a' also property on global object

bar(); // 'is global'

// implicitly lost when passing a callback function
function foo1() {
  console.log( this.a );
}

function doFoo(fn) {
  // fn is just another reference to foo

  fn(); // <-- call-site!
}

const obj1 = {
  a1: 2,
  foo1
};

var a1 = 'is global'; // a1 also property on global object

doFoo( obj1.foo1 ); // 'is global

// function passing in callback, built into the language
function foo2() {
	console.log(this.a2);
}

var obj2 = {
	a2: 2,
	foo2
};

var a2 = 'is global'; // a also property on global object

setTimeout( obj2.foo2, 1000 ); // is global


// crude theoretical pseudo code of setTimeout
function settimeout(fn, delay) {
  // wait for delay in milliseconds
  fn(); // call-site
}


// this binding => explicitly stating what this is
const foo3 = () => console.log(this.a3);


var obj3 = {
  a3: 2
};

foo3.call(obj3); // 2


// hard binding
function foo4() {
	console.log( this.a4 );
}

var obj4 = {
	a4: 42
};

var bar4 = () => foo4.call( obj4 );

bar4(); // 42
setTimeout( bar4, 100 ); // 42

// bar4 hard binds foo4's this to obj4
// so that it cannot be overriden
bar4.call( window ); // 42


// wrap function with hard binding, create pass thru of any arguments like this
function foo5(something) {
	console.log(this.a5, something);
	return this.a5 + something;
}

var obj5 = {
	a5: 42
};

var bar5 = () => foo5.apply(obj5, arguments);

var b5 = bar5(3); // 42 3
console.log(b5); // 45



// express this pattern, create reusable helper
function foo6(something) {
	console.log( this.a6, something );
	return this.a6 + something;
}

// simple bind helper
function bind(fn, obj6) {
	return () => {
		return fn.apply( obj6, arguments );
	};
}

var obj6 = {
	a: 42
};

var bar6 = bind(foo5, obj6);

var b6 = bar6(3); // 42 3
console.log(b6); // 45

// hard binding is built in ES5 with bind instruction
const foo7 = (something) => {
	console.log( this.a7, something );
	return this.a7 + something;
}

const obj7 = {
	a7: 42
};

const bar7 = foo7.bind(obj7);

const b7 = bar7( 3 ); // 42 3
console.log(b7); // 45


// api call contexts
// optional parameter context provided, ensures particular callbak function uses particular this

const foo = (el) => console.log(el, this.id);

const obj = {
  id: 'awesome'
};

[1, 2, 3].forEach(foo, obj); // 1 awesome 2 awesome 3 awesome

// new binding
function foo1(a1) { this.a1 = a1; }

const bar1 = new foo1(42);
console.log(bar1.a); // 42


// explicit binding takes precedence over implicit binding
const foo2 = () => { console.log( this.a2 );
}

const obj2 = {
	a2: 42,
	foo2
};

const obj3 = {
	a3: 33,
	foo2
};

obj2.foo2(); // 42
obj3.foo2(); // 33

obj2.foo2.call( obj3 ); // 33
obj3.foo2.call( obj2 ); // 42


// where does new binding fit in precedence, new is more precedant than implicit
let a3;
const foo3 = (something) => { this.a3 = something; };

const obj4 = {
	foo3
};

const obj5 = {};

obj4.foo3(42);
console.log( obj4.a3 ); // 42

obj4.foo3.call( obj5, 33 );
console.log( obj5.a3 ); // 33

const bar4 = new obj4.foo3( 42 );
console.log( obj4.a3 ); // 42
console.log( bar4.a3 ); // 42

// let's check...
function foo(something) {
	this.a = something;
}

const obj1 = {};

const bar = foo.bind( obj1 );
bar(42);
console.log( obj1.a ); // 42

const baz = new bar(33);
console.log( obj1.a ); // 42
console.log( baz.a ); // 33

// how the fake bind helper works
function bind(fn, obj) {
	return function() {
		fn.apply( obj, arguments );
	};
}


// polyfill provided for prototype.bind from MDN
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError( "Function.prototype.bind - what " +
				"is trying to be bound is not callable"
			);
		}

		var aArgs = Array.prototype.slice.call( arguments, 1 ),
			fToBind = this,
			fNOP = function(){},
			fBound = function(){
				return fToBind.apply(
					(
						this instanceof fNOP &&
						oThis ? this : oThis
					),
					aArgs.concat( Array.prototype.slice.call( arguments ) )
				);
			}
		;

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}


// part that allwos new overriding is this
this instanceof fNOP &&
oThis ? this : oThis

// ... and:

fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();


// partial application, a subset of currying

function foo(p1, p2) {
  this.val = p1 + p2;
}
var bar = foo.bind(null, 'p1');
var baz = new bar('p2');
console.log(baz.val); // p1p2


// this ignored
function foo() {
  console.log(this.a);
}

var a = 42;
foo.call(null); // 42


// use apply spread out arrays of values as parameters to a function call
function foo1(a, b) {
	console.log( 'a:' + a + '', 'b:' + b );
}

// spreading out array as parameters with apply
foo1.apply( null, [4, 2] ); // a:4, b:2

// currying with bind(..)
var bar = foo1.bind( null, 4 );
bar(2); // a:4, b:2


// Object.create(null) is similar to { }
function foo(a, b) {
	console.log( 'a:' + a + ', b:' + b );
}

// emp DMZ empty object
var emp = Object.create( null );

// spreading out array as parameters
foo.apply( emp, [4, 2] ); // a:4, b:2

// currying with bind(..)
var bar = foo.bind(emp, 4);
bar(4); // a:2, b:3


// indirection
function foo() {
	console.log( this.a );
}

var a = 2;
var o = { a: 3, foo };
var p = { a: 4 };

console.log(o.foo()); // 3
console.log((p.foo = o.foo)()); // undefined

// softening binding
if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1 ),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" &&
							this === window) ||
						(typeof global !== "undefined" &&
							this === global)
					) ? obj : this,
					curried.concat.apply( curried, arguments )
				);
			};
		bound.prototype = Object.create( fn.prototype );
		return bound;
	};
}


// usage
function foo() {
  console.log('name: ' + this.name);
}

var obj = { name: 'obj' },
   obj2 = { name: 'obj2' },
   obj3 = { name: 'obj3' };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call( obj3 ); // name: obj3   <---- look!

setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding


// lexical this, arrow function lexical scope
function foo() {
	// return an arrow function
	return (a) => {
		// this here is lexically adopted from foo()
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3.

// most common use, callbacks, event handlers or timers
function foo() {
	setTimeout(() => {
		// this here is lexically adopted from foo()
		console.log( this.a );
	},100);
}

var obj = {
	a: 2
};

foo.call( obj ); // 2

prior to ES6, lexical scoping like this
function foo() {
	var self = this; // lexical capture of this
	setTimeout( function(){
		console.log( self.a );
	}, 100 );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2


// objects and classes ch. 3 objects

// object literal syntax
var myObj = {
  key: 'value'
};

// constructed form
var myObj1 = new Object();
myObj1.key = value;


// built in functions
var strPrimitive = 'I am a string';
typeof strPrimitive;							// 'string'
strPrimitive instanceof String;		// false

var strObject = new String( 'I am a string' );
typeof strObject; 								// object
strObject instanceof String;			// true

// inspect the object sub-type
Object.prototype.toString.call( strObject );	// [object String]

// consider
var strPrimitive1 = 'I am a string';

console.log(strPrimitive1.length);			// 13

console.log(strPrimitive1.charAt(3));	// m

// contents
var myObject = {
  a: 42
};

myObject.a; // 42
myObject['a']; // 42


// ['...'] syntax
const wantA = true;
const myObject1 = {
	a: 42
};

let idx;

if (wantA) {
	idx = 'a';
}

// later

console.log( myObject1[idx] ); // 42


// in objects property names are always strings
const myObject2 = { };

myObject2[true] = 'foo';
myObject2[3] = 'bar';
myObject2[myObject2] = 'baz';

myObject2['true'];				// foo
myObject2['3'];					// bar
myObject2['[object Object]'];	// baz


// computed property names
const prefix = 'foo';

const myObject3 = {
	[prefix + 'bar']: 'hello',
	[prefix + 'baz']: 'javascript'
};

myObject3['foobar']; // hello
myObject3['foobaz']; // javascript


// symbol
const myObject4 = {
	[Symbol.Something]: 'hello from symbol'
};

// property vs. method

// for example
function foo1() {
	console.log('foo1');
}

const someFoo1 = foo1;	// variable reference to foo1

const myObject1 = {
	someFoo1: foo1
};

foo1;				// function foo1(){..}

someFoo1;			// function foo1(){..}

myObject1.someFoo1;	// function foo1(){..}

// function expression as part of object literal,
// just multiple references to same function object
const myObject5 = {
  foo2: () => { console.log('foo2'); }
};

const someFoo2 = myObject5.foo2;

someFoo2; // function foo2(){..}
myObject5.foo2; // function foo2(){..}


// arrays
const myArray = ['foo', 42, 'bar'];

myArray.length; // 3
myArray[0]; // foo
myArray[2]; // bar

// arrays are objects, can add properties
const myArray1 = ['foo', 42, 'bar'];
myArray1.baz = 'baz';
myArray1.length; // 3
myArray1.baz; // baz

// add property to array, property name looks like number, will end up as numeric index
const myArray2 = [ 'foo', 42, 'bar' ];

myArray2['3'] = 'baz';

myArray2.length;	// 4

myArray2[3];		// 'baz'


// duplicating objects
const anotherFunction = () => { /*..*/ };

const anotherObject = {
  c: true
};

const anotherArray = [];

const myObject = {
  a: 42,
  b: anotherObject,	// reference, not a copy!
  c: anotherArray,	// another reference!
  d: anotherFunction
};

anotherArray.push(anotherObject, myObject);

// solution subset
const newObje = JSON.parse(JSON.stringify(someObj));

// duplicate shallow copy
const newObj = Object.assign({}, myObject );

newObj.a;						// 42
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true


// property descriptors
const myObject1 = {
	a: 42
};

Object.getOwnPropertyDescriptor(myObject1, 'a');
// {
//    value: 42,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }


// add or modify an existing property
const myObject2 = {};

Object.defineProperty(myObject2, 'b', {
	value: 33,
	writable: true,
	configurable: true,
	enumerable: true
} );

myObject2.b; // 33


// writable
const myObject3 = {};

Object.defineProperty(myObject3, 'c', {
	value: 42,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );

myObject3.c = 33;

myObject.c; // 42


// writable, in strict mode, get an error
'use strict';

const myObject4 = {};

Object.defineProperty(myObject4, 'd', {
	value: 1,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
});

myObject4.d = 2; // TypeError


// configurable
const myObject5 = {
	e: 42
};

myObject5.e = 33;
myObject5.e;					// 33

Object.defineProperty( myObject, 'e', {
	value: 42,
	writable: true,
	configurable: false,	// not configurable!
	enumerable: true
} );

myObject5.e;					// 42
myObject5.e = 65;
myObject5.e;					// 65

Object.defineProperty( myObject5, 'e', {
	value: 99,
	writable: true,
	configurable: true,
	enumerable: true
} ); // TypeError


// configurable: false prevents to use delete operator to remove an existing property
var myObject6 = {
	f: 22
};

myObject6.f;				// 22
delete myObject6.f;
myObject6.f;				// undefined

Object.defineProperty( myObject6, 'f', {
	value: 22,
	writable: true,
	configurable: false,
	enumerable: true
} );

myObject6.f;				// 22
delete myObject6.f;
myObject6.f;				// 22


// immutability
const myImmutableObject = {
  foo:  [1, 2, 3]
};
myImmutableObject.foo; // [1,2,3]
myImmutableObject.foo.push(4);
myImmutableObject.foo; // [1,2,3,4]


// object constant
const myObject = {};

Object.defineProperty( myObject, 'FAVORITE_NUMBER', {
	value: 42,
	writable: false,
	configurable: false
});

// prevent extensions
const myObject1 = {
	a: 42
};

Object.preventExtensions(myObject1);

myObject1.b = 33;
myObject1.b; // undefined


// [[Get]]
const myObject2 = {
  a: 42,
  c: undefined
};

myObject2.a; // 42
myObject2.b // undefined
myObject2.c // undefined


// getters && setters
const myObject3 = {
	// define a getter for a
	get a() {
		return 42;
	}
};

Object.defineProperty(
	myObject3,	// target
	'b',		// property name
	{			// descriptor
		// define a getter for b
		get: () => this.a * 2 ,

		// make sure b shows up as an object property
		enumerable: true
	}
);

myObject3.a; // 42

myObject3.b; // 84

myObject3.a = 65;
myObject3.a; // undefined


// object with defined setter
const myObject4 = {
	// define a getter for a
	get a() {
		return this._a_;
	},

	// define a setter for a
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject4.a = 3;

myObject4.a; // 6


// existence
const myObject5 = {
	a: 42
};

('a' in myObject5);				// true
('b' in myObject5);				// false

myObject.hasOwnProperty('a');	// true
myObject.hasOwnProperty('b');	// false

// enumeration
const myObject6 = { };

Object.defineProperty(
	myObject6,
	'a',
	// make a enumerable, as normal
	{ enumerable: true, value: 42 }
);

Object.defineProperty(
	myObject6,
	'b',
	// make b NON-enumerable
	{ enumerable: false, value: 33 }
);

myObject6.b; // 33
('b' in myObject6); // true
myObject6.hasOwnProperty( 'b' ); // true

// .......

for (let k in myObject6) {
	console.log( k, myObject6[k] );
}
// 'a' 42

// another way that enumerable and non-enumerable properties can be distinguished
const myObject7 = {};

Object.defineProperty(
	myObject7,
	'a',
	// make a enumerable, as normal
	{ enumerable: true, value: 42 }
);

Object.defineProperty(
	myObject7,
	'b',
	// make b non-enumerable
	{ enumerable: false, value: 33 }
);

myObject7.propertyIsEnumerable( 'a' ); // true
myObject7.propertyIsEnumerable( 'b' ); // false

Object.keys( myObject7 ); // ['a']
Object.getOwnPropertyNames( myObject7 ); // ['a', 'b']

// iteration
// iterate over values in numerically indexed array
const myArray = [1, 2, 3];

for (let i = 0; i < myArray.length; i++) {
	console.log(myArray[i]);
}
// 1 2 3

// iterate over values directly
for (let v of myArray) {
	console.log(v);
}
// 1
// 2
// 3

// using iterator
const it = myArray[Symbol.iterator]();

it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }


// default @@iterator for any object want to iterate over
const myObject = {
	a: 4,
	b: 2
};

Object.defineProperty(myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {
		const o = this;
		let idx = 0;
		const ks = Object.keys(o);
		return {
			next: function() {
				return {
					value: o[ks[idx++]],
					done: (idx > ks.length)
				};
			}
		};
	}
} );

// iterate myObject manually
const ite = myObject[Symbol.iterator]();
ite.next(); // { value:4, done:false }
ite.next(); // { value:2, done:false }
ite.next(); // { value:undefined, done:true }

// iterate myObject with for...of
for (const v of myObject) {
	console.log(v);
}
// 4
// 2


// random number iterator, breaks at 10
const randoms = {
	[Symbol.iterator]: () => {
		return {
			next: () => {
				return { value: Math.random() };
			}
		};
	}
};

const randomsPool = [];
for (const num of randoms) {
  randomsPool.push(num);
  console.log(num);
  if (randomsPool.length === 10) {
    break;
  }
}

  `,
  blockQuote: `
  Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
  sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
  und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
  und eine die wir vorhaben zu gewinnen.
  `,
  imageFooterUrl: 'assets/img/post9.jpg',
  footerQuote: 'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.'
},
{
  id: 10,
  imageHeaderUrl: 'url(assets/img/post10-bg.jpg)',
  heading: 'Angular 8/9, Basis- Teil 3',
  subHeading: 'API + TS, RxJS',
  metaPublishedDate: 'am 30 Dezember, 2019',
  sectionHeading: 'API + Template Syntax, Intro RxJS',
  code: `
// currency pipe
import { Component } from '@angular/core';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Currency Pipe</h1>

            <p>A: {{ a | currency }}</p>

            <p>A: {{ a | currency:'EUR' }}</p>

            <p>A: {{ a | currency:'EUR':'code' }}</p>

            <p>B: {{ b | currency:'EUR':'symbol':'4.2-2' }}</p>

            <p>B: {{ b | currency:'EUR':'symbol-narrow':'4.2-2' }}</p>

            <p>B: {{ b | currency:'EUR':'symbol':'4.2-2':'de' }}</p>
    \`
  })
  export class ApiComponent {
    a: number = 0.259;
    b: number = 1.3495;
  }


// json pipe
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>JSON Pipe</h1>
            <div>
              <p>Without JSON pipe:</p>
              <pre>{{ object }}</pre>
              <p>With JSON pipe:</p>
              <pre>{{ object | json }}</pre>
            </div>
  \`
})
export class ApiComponent {
  object: Object = { foo: 'bar', baz: 'qux',
                     nested: { xyz: 33, numbers: [1, 2, 3, 4, 5, 6]}};
}


// lower/uppercase pipe
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Lower/Uppercase Pipe</h1>
           <div>
              <label>Name: </label><input #name (keyup)="change(name.value)" type="text">
              <p>In lowercase: <pre>'{{ value | lowercase }}'</pre>
              <p>In uppercase: <pre>'{{ value | uppercase }}'</pre>
          </div>
  \`
})
export class ApiComponent {

  value = 'Hi Nils-Holger, I love you.';
  change(value: string) {
    this.value = value;
  }

}

// ngforof directive
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Directive({
  selector: '[ngFor][ngForOf]'
})
class NgForOf<T> implements DoCheck, OnChanges {
  ngForOf: NgIterable<T>
  ngForTrackBy: TrackByFunction<T>
  set ngForTemplate: TemplateRef<NgForOfContext<T>>
  ngOnChanges(changes: SimpleChanges): void
  ngDoCheck(): void
}

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>NgForOf Directive</h1>
           <div>
                  <ul>
                      <li *ngFor="let user of userObservable | async as users;
                                  index as i; first as isFirst;">
                          {{ i + 1 }}/{{ users.length}}.{{ user }}
                          <span *ngIf="isFirst">default</span>
                      </li>
                  </ul>
                  <ul>
                        <li *ngFor="let item of items; index as i; trackBy: trackByFn">
                               {{ i }} {{ item }}
                        </li>
                  </ul>

                  <div *ngFor="let hero of heroes; let i = index; let odd = odd;
                  trackBy: trackById;" [class.odd]="odd">
                    ({{ i }}) {{ hero.name }}
                  </div>

                  <ng-template ngFor let-hero [ngForOf]="heroes" let-i="index"
                  let-odd="odd" [ngForTrackBy]="trackById">
                    <div [class.odd]="odd">
                        ({{ i }}) {{ hero.name }}
                    </div>
                  </ng-template>

          </div>
  \`
})
export class ApiComponent {

  private names = ['Flash', 'Wonderwoman', 'Superman', 'Spiderman', 'Green Arrow'];
  heroes = [{ name: 'Nils-Holger' }, { name: 'Julia' }, { name: 'Andre' }, { name: 'Niko'},
  { name: 'Jens' }, { name: 'Björn' }, { name: 'Niels' },
  { name: 'Stephan' }, { name: 'Markus'}];
  items = ['Computer', 'Mobile Device', 'Watch', 'Chromebook'];

  userObservable: Observable<string[]>;


  constructor() {
    this.userObservable = Observable.from([this.names]);
  }

  trackByFn(idx: number, item: any) {
    console.log(idx, item);
  }

  trackById(id: number, hero: any) {
    console.log(id, hero);
  }

}


// ngplural directive
import { Component } from '@angular/core';
import { NgPlural } from '@angular/common';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>NgPlural Directive</h1>
          <div [ngPlural]="value">
                <ng-template ngPluralCase="0">there is nothing</ng-template>
                <ng-template ngPluralCase="1">there is one</ng-template>
                <ng-template ngPluralCase="2">there are a couple</ng-template>
          </div>
  \`
})
export class ApiComponent {

      values = [0, 1, 2];
      value = this.values[2];

}

// ngswitch directive
import { Component } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>NgSwitch Directive</h1>
            <ng-container [ngSwitch]="hero?.emotion">
                <div *ngSwitchCase="'happy'">{{ hero.name }} is {{ hero.emotion}}.</div>
                <div *ngSwitchCase="'angry'">{{ hero.name }} is {{ hero.emotion}}.</div>
                <div *ngSwitchCase="'indifferent'">{{ hero.name }} is {{ hero.emotion}}.
                </div>
                <div *ngSwitchDefault>no emotions.</div>
            <ng-container>
  \`
})
export class ApiComponent {
      hero = { name: 'Razor', emotion: 'indifferent' };
}


// async pipe
import { Component } from '@angular/core';

  import { Observable } from 'rxjs/Observable';
  import { Subscriber } from 'rxjs/Subscriber';


  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Async Pipe</h1>
                <div>
                    <code>observable | async</code>:
                    Time: {{ time | async }}

                </div>
              <div>
                  <code>promise | async</code>:
                  <button (click)="clicked()">
                      {{ arrived ? 'Reset' : 'Resolve' }}
                  </button>
                  <span>Wait for it ... {{ greeting | async }}</span>
              </div>
    \`
  })
  export class ApiComponent {
      time = new Observable<string>((observer: Subscriber<string>) => {
          setInterval(() => observer.next(new Date().toString()), 1000);
      });


      greeting: Promise<string> | null = null;
      arrived: boolean = false;

      private resolve: Function | null = null;

      constructor() {
        this.reset();
      }

      reset() {
        this.arrived = false;
        this.greeting = new Promise<string>((resolve, reject) => { this.resolve = resolve; });
      }

      clicked() {
        if (this.arrived) {
          this.reset();
        } else {
          this.resolve !('Hi Nils-Holger!!!');
          this.arrived = true;
        }
      }
  }


// date pipe
import { Component } from '@angular/core';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Date Pipe</h1>

            <p>Today is {{ today | date }}</p>
            <p>Or if you prefer, {{ today | date:'fullDate' }}</p>
            <p>The time is {{ today | date:'shortTime' }}</p>
            <p>The full date/time is {{ today | date:'full' }}</p>
            <p>The full date/time in german is: {{ today | date:'full':'':'de' }}</p>
            <p>The custom date is {{ today | date:'dd-MM-yyyy HH:mm:ss a z':'+0100' }}</p>
            <p>The custom date with fixed timezone is
            {{ fixedTimezone | date:'dd-MM-yyyy HH:mm:ss a z':'+0100' }}</p>
    \`
  })
  export class ApiComponent {
    today = Date.now();
    fixedTimezone = '2019-12-29T10:32:42+0100';

  }


// ngclass directive
import { Component } from '@angular/core';


  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>NgClass Directive</h1>
            <div [ngClass]="currentClasses">
                This div is initially saveable, unchanged and special.
            </div>

    \`,
    styles: [\`.saveable { font-size: 150%; }
              .modified { background-color: yellow; }
              .special { color: red; }
            \`]
  })
  export class ApiComponent {
        currentClasses: {};
        canSave = true;
        isUnchanged = true;
        isSpecial = true;

        constructor() {
          this.setCurrentClasses();
        }

        setCurrentClasses() {
          this.currentClasses = {
            'saveable': this.canSave,
            'modified': !this.isUnchanged,
            'special': this.isSpecial
          };
        }

  }


// percent pipe
import { Component } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Percent Pipe</h1>
          <p>A: {{ a | percent }}</p>
          <p>B: {{ b | percent:'4.3-5' }}</p>
          <p>B: {{ b | percent:'4.3-5':'de' }}</p>
  \`
})
export class ApiComponent {
      a: number = 0.259;
      b: number = 1.3495;

}


// decimal pipe
import { Component } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Decimal Pipe</h1>
          <p>e (no formatting): {{ e | number }}</p>
          <p>e (3.1-5): {{ e | number:'3.1-5' }}</p>
          <p>e (4.5-5): {{ e | number:'4.5-5' }}</p>
          <p>e (german): {{ e | number:'4.5-5':'de' }}</p>

          <p>pi (no formatting): {{ pi | number }}</p>
          <p>pi (3.1-5): {{ pi | number:'3.1-5' }}</p>
          <p>pi (3.5-5): {{ pi | number:'3.5-5' }}</p>

  \`
})
export class ApiComponent {
      pi: number = 3.14;
      e: number = 2.718281828459045;

}


// ngif directive
import { Component } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>NgIf Directive</h1>
          <button (click)="show = !show">{{ show ? 'hide' : 'show' }}</button>
          show = {{ show }}
          <br>
          <div *ngIf="show; else elseBlock">Text to show</div>
          <ng-template #elseBlock>Alternate text while primary text is hidden</ng-template>
  \`
})
export class ApiComponent {
        show: boolean = true;

}

*****************************************************************

import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';


@Component({
selector: 'app-ng-api',
template: \`
        <h1>NgIf Directive</h1>
        <button (click)="show = !show">{{ show ? 'hide' : 'show' }}</button>
        <button (click)="switchPrimary()">Switch Primary</button>
        show = {{ show }}
        <br>
        <div *ngIf="show; then thenBlock; else elseBlock">this is ignored</div>
        <ng-template #primaryBlock>Primary text to show</ng-template>
        <ng-template #secondaryBlock>Secondary text to show</ng-template>
        <ng-template #elseBlock>Alternate text while primary text is hidden</ng-template>
\`
})
export class ApiComponent implements OnInit {
      thenBlock: TemplateRef<any> | null = null;
      show: boolean = true;

      @ViewChild('primaryBlock', { static: false })
      primaryBlock: TemplateRef<any> | null = null;
      @ViewChild('secondaryBlock', { static: false })
      secondaryBlock: TemplateRef<any> | null = null;

      switchPrimary() {
        this.thenBlock = this.thenBlock === this.primaryBlock ?
                         this.secondaryBlock : this.primaryBlock;
      }

      ngOnInit() {
        this.thenBlock = this.primaryBlock;
      }

}

*****************************************************************

import { Component } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Component({
selector: 'app-ng-api',
template: \`
        <h1>NgIf Directive</h1>
        <button (click)="nextUser()">Next User</button>
        <br>
        <div *ngIf="userObservable | async as user; else loading;">
            Hello {{ user.last }}, {{ user.first }}!
        </div>
        <ng-template #loading let-user>Waiting ...
                              (user is {{ user | json }} )</ng-template>
\`
})
export class ApiComponent {
      userObservable = new Subject<{first: string, last: string}>();
      first = ['Nils-Holger', 'Julia', 'Max', 'Peter', 'Angular'];
      firstIndex = 0;
      last = ['Nägele', 'Betten', 'Tor', 'Haferstein', '9'];
      lastIndex = 0;

      nextUser() {
        let first = this.first[this.firstIndex++];
        if (this.firstIndex >= this.first.length) {
          this.firstIndex = 0;
        }
        let last = this.last[this.lastIndex++];
        if (this.lastIndex >= this.last.length) {
          this.lastIndex = 0;
        }
        this.userObservable.next({first, last});
      }

}


// ngstyle directive
import { Component } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>NgStyle Directive</h1>

          <div [style.font-size]="isSpecial ? 'x-large' : 'smaller'">
                This div is x-large.
          </div>

          <div [ngStyle]="currentStyles">
                This div is initially italic, normal weight and x-large (24px).
          </div>
  \`
})
export class ApiComponent {
      isSpecial = true;
      canSave = true;
      isUnchanged = true;

      currentStyles = {
            'font-style': this.canSave ? 'italic' : 'normal',
            'font-weight': !this.isUnchanged ? 'bold' : 'normal',
            'font-size': this.isSpecial ? '24px' : '12px'
      };

}


// viewchildren decorator
import { Component, Directive, Input,
  QueryList, ViewChildren, AfterViewInit } from '@angular/core';


  @Directive({
      selector: 'app-pane'
  })
  export class PaneDirective {
  @Input() id: string;
}


  @Component({
      selector: 'app-ng-api',
      template: \`
                    <h1>ViewChildren Decorator</h1>
                    <app-pane id="1"></app-pane>
                    <app-pane id="2"></app-pane>
                    <app-pane id="3" *ngIf="shouldShow"></app-pane>
                    <button (click)="show()">Show 3</button>
                    <div>panes: {{ serializedPanes }}</div>
            \`
        })
        export class ApiComponent implements AfterViewInit {
        @ViewChildren(PaneDirective) panes: QueryList<PaneDirective>;
        serializedPanes: string = '';

        shouldShow = false;

        show() {
            this.shouldShow = true;
        }

        ngAfterViewInit() {
        this.calculateSerializedPanes();
        this.panes.changes.subscribe((r) => { this.calculateSerializedPanes(); });
        }

        calculateSerializedPanes() {
        setTimeout(() =>
              { this.serializedPanes = this.panes.map(p => p.id).join(', '); }, 0);
        }
    }

// contentchild decorator
import { Component, Directive, Input, ContentChild } from '@angular/core';


@Directive({
  selector: 'app-pane'
})
export class PaneDirective {
  @Input() id: string;
}

@Component({
  selector: 'app-tab',
  template: \`
          <div>pane: {{ pane?.id }}</div>
  \`
})
export class TabComponent {
  @ContentChild(PaneDirective, { static: false }) pane: PaneDirective;
}


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>ContentChild Decorator</h1>
          <app-tab>
            <app-pane id="1" *ngIf="shouldShow"></app-pane>
            <app-pane id="2" *ngIf="!shouldShow"></app-pane>
          </app-tab>

          <button (click)="toggle()">Toggle</button>
  \`
})
export class ApiComponent {
        shouldShow = true;

        toggle() {
          this.shouldShow = !this.shouldShow;
        }

}


// directive decorator
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-bank-account',
  template: \`
          Bank Name: {{ bankName }}
          Account ID: {{ id }}
  \`
})
export class BankAccountComponent {
  @Input('bank-name') bankName: string;
  @Input('account-id') id: string;

}


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Directive Decorator</h1>
          <app-bank-account bank-name='ABC' account-id="123"></app-bank-account>
  \`
})
export class ApiComponent { }

*****************************************************************

import { Component, Directive, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: 'app-interval-dir'
})
export class IntervalDirective {
  @Output() everySecond = new EventEmitter();
  @Output('everyFiveSeconds') five5Seconds = new EventEmitter();

  constructor() {
    setInterval(() => this.everySecond.emit('event'), 1000);
    setInterval(() => this.five5Seconds.emit('event'), 5000);
  }

}


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Directive Decorator</h1>
          <app-interval-dir (everySecond)="everySecond()"
          (everyFiveSeconds)="everyFiveSeconds()">
          </app-interval-dir>
  \`
})
export class ApiComponent {

  everySecond() {
    console.log('second');
  }

  everyFiveSeconds() {
    console.log('five seconds');
  }

}

*****************************************************************

import { Component, Directive } from '@angular/core';


@Directive({
  selector: 'button[counting]',
  host: {
  '(click)': 'onClick($event.target)'
  }
})
export class CountClicksDirective {
    numberOfClicks = 0;

    onClick(btn) {
      console.log('button', btn, 'number of clicks: ', this.numberOfClicks++);
    }

}


@Component({
selector: 'app-ng-api',
template: \`
        <h1>Directive Decorator</h1>
        <button counting>Increment</button>
\`
})
export class ApiComponent {

}

*****************************************************************

import { Component, Directive } from '@angular/core';
import { NgModel } from '@angular/forms';


@Directive({
selector: '[ngModel]',
host: {
  '[class.valid]': 'valid',
  '[class.invalid]' : 'invalid'
}
})
export class NgModelStatusDirective {

constructor(public control: NgModel) { }

get valid() { return this.control.valid; }
get invalid() { return this.control.invalid; }

}


@Component({
selector: 'app-ng-api',
template: \`
        <h1>Directive Decorator</h1>
        <input [(ngModel)]="prop">
\`
})
export class ApiComponent {
  prop: any;
}


*****************************************************************

import { Component, Directive } from '@angular/core';


@Directive({
selector: '[my-button]',
host: {
  'role': 'button'
}
})
export class MyButtonDirective {

}


@Component({
selector: 'app-ng-api',
template: \`
        <h1>Directive Decorator</h1>
        <div my-button>My Button</div>
\`
})
export class ApiComponent {

}


*****************************************************************

import { Component, Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
selector: '[appHighlight]'
})
export class HighlightDirective {
    @HostListener('mouseenter') onMouseEnter() {
      this.highlight('red');
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.highlight('yellow');
    }

    constructor(private el: ElementRef) {
      el.nativeElement.style.color = 'white';
      this.el.nativeElement.style.backgroundColor = 'green';
     }

     private highlight(color: string) {
      this.el.nativeElement.style.backgroundColor = color;
     }
}


@Component({
selector: 'app-ng-api',
template: \`
        <h1>Directive Decorator</h1>
        <p appHighlight>Highlight me!</p>
\`
})
export class ApiComponent {

}

*****************************************************************

import { Component, Directive, Input,
TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({
selector: '[appUnless]'
})
export class UnlessDirective {
private hasView = false;

@Input() set appUnless(condition: boolean) {
if (!condition && !this.hasView) {
this.viewContainerRef.createEmbeddedView(this.templateRef);
this.hasView = true;
} else if (condition && this.hasView) {
this.viewContainerRef.clear();
this.hasView = false;
}
}

constructor(private templateRef: TemplateRef<any>,
     private viewContainerRef: ViewContainerRef) { }



}


@Component({
selector: 'app-ng-api',
template: \`
 <h1>Directive Decorator</h1>
 <p *appUnless="condition">Show this sentence unless the condition is true</p>
 <p *appUnless="!condition">This condition is true so this paragraph is not displayed</p>

\`
})
export class ApiComponent {
condition = false;
}


// event emitter class
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-zippy',
  template: \`
          <div class="zippy">
            <div (click)="toggle()">Toggle</div>
            <div [hidden]="!visible">
              <ng-content></ng-content>
            </div>
          </div>
  \`
})
export class ZippyComponent {
        visible: boolean = false;
        @Output() open: EventEmitter<string> = new EventEmitter();
        @Output() close: EventEmitter<string> = new EventEmitter();

        toggle() {
          this.visible = !this.visible;
          if (this.visible) {
            this.open.emit('open');
          } else {
            this.close.emit('close');
          }
        }

}


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>EventEmitter Class</h1>

          <app-zippy (open)="onOpen($event)"
                    (close)="onClose($event)">
          <app-zippy>
  \`
})
export class ApiComponent {
      onOpen(evt) {
        console.log(evt);
      }

      onClose(evt) {
        console.log(evt);
      }
}


// contentchildren decorator
import { Component, ContentChildren, Directive, Input, QueryList } from '@angular/core';


@Directive({
  selector: 'app-pane'
})
export class PaneDirective {
  @Input() id: string;
}

@Component({
  selector: 'app-tab',
  template: \`
            <div class="top-level">Top level panes: {{ serializedPanes }}</div>
            <div class="nested">Arbitrary nested panes: {{ serializedNestedPanes }}</div>
  \`
})
export class TabComponent {
  @ContentChildren(PaneDirective) topLevelPanes: QueryList<PaneDirective>;
  @ContentChildren(PaneDirective, { descendants: true })
  arbitraryNestedPanes: QueryList<PaneDirective>;

  get serializedPanes(): string {
    return this.topLevelPanes ?
           this.topLevelPanes.map(p => p.id).join(', ') : '';
  }

  get serializedNestedPanes(): string {
    return this.arbitraryNestedPanes ?
           this.arbitraryNestedPanes.map(p => p.id).join(', ') : '';
  }
}


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>ContentChildren Decorator</h1>

          <app-tab>
              <app-pane id="1"></app-pane>
              <app-pane id="2"></app-pane>
              <app-pane id="3" *ngIf="shouldShow">
                  <app-tab>
                      <app-pane id="3_1"></app-pane>
                      <app-pane id="3_2"></app-pane>
                  </app-tab>
              </app-pane>
          </app-tab>

          <button (click)="show()">Show 3</button>
  \`
})
export class ApiComponent {
      shouldShow = false;

      show() {
        this.shouldShow = true;
      }

}


// animate function
import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Animate Function</h1>

          <button (click)="expand()">Open</button>
          <button (click)="collapse()">Closed</button>
          <hr>
          <div class="toggle-container" [@openClose]="stateExpression">
                Look at this box
          </div>
  \`,
  animations: [trigger(
        'openClose',
        [
          state('collapsed, void', style({ height: '0px', color: 'red',
                borderColor: 'red'})),
          state('expanded', style({ height: '*', borderColor: 'green', color: 'green'})),
          transition(
            'collapsed <=> expanded', [animate(1500, style({height: '250px'})),
             animate(1500)]
          )
        ]
  )],
  styles: [\`
    .toggle-container {
      background-color: white;
      border: 10px solid black;
      width: 200px;
      text-align: center;
      line-height: 100px;
      font-size: 50px;
      box-sizing: border-box;
      overflow: hidden;
    }

  \`]
})
export class ApiComponent {
      stateExpression: string;
      constructor() {
        this.collapse();
      }

      expand() { this.stateExpression = 'expanded'; }
      collapse() { this.stateExpression = 'collapsed'; }

}


// interpolation
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Interpolation</h1>
          <p>My current technology is {{ currentTechnology.name }}.</p>
          <h3>
              {{ title }}
            <img src="{{heroImageUrl}}" style="height:50px">
          </h3>
          <p>The product of 10 x 10 is {{ 10 * 10 }}</p>
          <p>The product of 10 x 10 is not {{ 10 * 10 * getVal() }}</p>
  \`
})
export class ApiComponent {
  technologies = [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'React' },
      { id: 3, name: 'VueJS' }
  ];
  currentTechnology = this.technologies[0];
  title = 'Hi Nils-Holger';
  heroImageUrl = 'https://ng8-photo-gallery.firebaseapp.com/assets/my_images/a1.jpg';
  getVal() {
    return 2;
  }

}


// expression context
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Expression Context</h1>
          <span [hidden]="isUnchanged">changed</span>
          <ng-template>
                <div *ngFor="let technology of technologies">
                    {{ technology.name }}
                </div>
          <ng-template>
          <div (keyup)="0">
            Type something:
            <input #technologyInput> {{ technologyInput.value }}
          </div>
  \`
})
export class ApiComponent {
  technologies = [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'React' },
      { id: 3, name: 'VueJS' }
  ];
  isUnchanged = true;

}


// statement context
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Statement Context</h1>
          <div class="context">
            <button (click)="deleteTechnology()">Delete technology</button>
          </div>
          <div class="context">
            <button (click)="onSave($event)">Save</button>
          </div>
          <div class="context">
              <button *ngFor="let technology of technologies"
              (click)="deleteTechnology(technology)">
                    {{ technology.name }}
              </button>
          </div>
          <div class="context">
            <form #technologyForm (ngSubmit)="onSubmit(technologyForm)">
                ...
            </form>
          </div>

  \`
})
export class ApiComponent {
  technologies = [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'React' },
      { id: 3, name: 'VueJS' }
  ];

  deleteTechnology() {
    alert('delete the technology.');
  }

  onSave(evt: KeyboardEvent) {
    alert('Saved. Event target is ' + (<HTMLElement>evt.target).textContent);
  }

}


// new mental model
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>New Mental Model</h1>

            <div>
              <h3>New Mental Model</h3>
              <img src="assets/hero.jpg">
              <button disabled>Save</button>
            </div>

            <div>
                  <h3>New Mental Model</h3>
                  <app-technology-detail></app-technology-detail>
            </div>

            <div>
                <button [disabled]="isUnchanged">Save</button>
            </div>

            <div>
                <img [src]="heroImageUrl">
                <app-technology-detail [technology]="currentTechnology">
                </app-technology-detail>
                <div [ngClass]="{'special': isSpecial}">this div is special</div>
            </div>

            <div>
                <button (click)="onSave()">Save</button>
                <app-technology-detail (deleteRequest)="deleteTechnology()">
                </app-technology-detail>
                <div (appMyClick)="clicked=$event">Click me!</div>
                   {{ clicked }}
            </div>

            <div>
                Technology Name:
                <input [(ngModel)]="name">
                {{ name }}
            </div>

            <div>
                <button [attr.aria-label]="help">Help</button>
                <div [class.special]="isSpecial">Special</div>
                <button [style.color]="isSpecial ? 'red' : 'green'">
                  button
                </button>
            </div>
  \`,
  styles: [\`
      img {
        height: 100px;
      }
      .special {
        font-weight: bold;
        font-size: x-large;
        color: red;
      }
  \`]
})
export class ApiComponent {
  technologies = [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'React' },
      { id: 3, name: 'VueJS' }
  ];
  isUnchanged = true;
  heroImageUrl = '../../assets/hero.jpg';
  currentTechnology = this.technologies[1];
  isSpecial = true;
  clicked = '';
  name = this.technologies[2].name;
  help = 'help';
  onSave() {
    alert('Saved.');
  }

  deleteTechnology() {
    alert('Delete the technology.');
  }

}


// technology class
export class Technology {
  static nextId = 0;

  static technologies: Technology[] = [
      new Technology(
        null,
        'Angular 9',
        'awesome',
        new Date(2020, 1, 14),
        'https://angular.io',
        150
      ),
      new Technology(1, 'Angular CLI 8.2', 'strong'),
      new Technology(2, 'Angular Material 8.2', 'happy'),
      new Technology(3, 'ECMAScript 6/7/8', 'energetic'),
      new Technology(4, 'Firebase')
  ];

  constructor(public id?: number,
              public name?: string,
              public emotion?: string,
              public birthDate?: Date,
              public url?: string,
              public rating = 100) {
                this.id = id ? id : Technology.nextId++;
              }

  clone(): Technology {
      return Object.assign(new Technology(), this);
  }

}



// click directive
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

  @Directive({
    selector: '[appMyClick]'
  })
  export class ClickDirective {
    @Output('appMyClick') clicks = new EventEmitter<string>();

    toggle = false;

    constructor(el: ElementRef) {
      el.nativeElement.addEventListener('click', (event: Event) => {
              this.toggle = !this.toggle;
              this.clicks.emit(this.toggle ? 'Click!' : '');
      });
    }

  }

  @Directive({
    selector: '[appMyClick2]',
    outputs: ['clicks:appMyClick']
  })
  export class Click2Directive {
    clicks = new EventEmitter<string>();
    toggle = false;

    constructor(el: ElementRef) {
      el.nativeElement.addEventListener('click', (event: Event) => {
              this.toggle = !this.toggle;
              this.clicks.emit(this.toggle ? 'Click2!' : '');
      });
    }

  }


// technology switch components
import { Component, Input } from '@angular/core';

import { Technology } from '../technology';

@Component({
  selector: 'app-awesome-technology',
  template: \`
          Wow. You like {{ technology.name }}. What an awesome technology ... just like you.
  \`
})
export class AwesomeTechnologyComponent {
  @Input() technology: Technology;

}

@Component({
  selector: 'app-strong-technology',
  template: \`
          You like {{ technology.name }}? Such a strong technology. Are you strong too?
  \`
})
export class StrongTechnologyComponent {
  @Input() technology: Technology;

}

@Component({
  selector: 'app-happy-technology',
  template: \`
          Are you as happy as {{ technology.name }}?
  \`
})
export class HappyTechnologyComponent {
  @Input() technology: Technology;

}

@Component({
  selector: 'app-future-technology',
  template: \`
          {{ message }}
  \`
})
export class FutureTechnologyComponent {
  @Input() technology: Technology;

  get message() {
    return this.technology && this.technology.name ?
        \`\${this.technology.name} is not born yet.\` :
        'Are you feeling stubborn and curious?';
  }

}

export const technologySwitchComponents =
        [ AwesomeTechnologyComponent, StrongTechnologyComponent,
          HappyTechnologyComponent, FutureTechnologyComponent ];



// technology form component
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Technology } from '../technology';

@Component({
  selector: 'app-technology-form',
  template: \`
            <div id="technologyForm">
                  <form (ngSubmit)="onSubmit(technologyForm)" #technologyForm="ngForm">
                        <div class="form-group">
                              <label for="name">Name
                                <input class="form-control" name="name" required
                                [(ngModel)]="technology.name">
                              </label>
                        </div>
                        <button type="submit" [disabled]="!technologyForm.form.valid">
                          Submit
                        </button>
                  </form>
                  <div [hidden]="!technologyForm.form.valid">
                      {{ submitMessage }}
                  </div>
            </div>
  \`,
  styles: [\`
    button {
              margin: 6px 0;
        }
    #technologyForm {
                border: 1px solid black;
                margin: 20px 0;
                padding: 8px;
                max-width: 350px;
        }
  \`]
})
export class TechnologyFormComponent  {
      @Input() technology: Technology;
      @ViewChild('technologyForm') form: NgForm;

      private _submitMessage = '';

      get submitMessage() {
        if (!this.form.valid) {
          this._submitMessage = '';
        }
        return this._submitMessage;
      }

      onSubmit(form: NgForm) {
        this._submitMessage = 'Submitted. Form value is ' + JSON.stringify(form.value);
      }

}


// technology detail component
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Technology } from '../technology';

@Component({
  selector: 'app-technology-detail',
  inputs: ['technology'],
  outputs: ['deleteRequest'],
  template: \`
          <div>
              <img src="{{ heroImageUrl }}">
              <span [style.text-decoration]="lineThrough">
                  {{ prefix }} {{ technology?.name }}
              </span>
              <button (click)="delete()">Delete</button>
          </div>
  \`,
  styles: [\`
        button {
          margin-left: 8px;
        }
        div {
          margin: 8px 0;
        }
        img {
          height: 24px;
        }

  \`]
})
export class TechnologyDetailComponent {
  technology: Technology = new Technology(-1, '', 'Zzzzzzzzzzzzzzz');
  heroImageUrl = '../../assets/hero.jpg';

  lineThrough = '';
  @Input() prefix = '';

  deleteRequest = new EventEmitter<Technology>();

  delete() {
    this.deleteRequest.emit(this.technology);
    this.lineThrough = this.lineThrough ? '' : 'line-through';
  }

}

@Component({
  selector: 'app-big-technology-detail',
  template: \`
            <div class="detail">
                  <img src="{{ heroImageUrl }}">
                  <div><b>{{ technology?.name }}</b></div>
                  <div>Name: {{ technology?.name }}</div>
                  <div>Emotion: {{ technology?.emotion }}</div>
                  <div>Birthdate: {{ technology?.birthDate }}</div>
                  <div>Web: <a href="{{ technology?.url }}" target="_blank">
                    {{ technology?.url }}</a>
                  </div>
                  <div>
                      Rating: {{ technology?.rating | number:'3.1-5' }}
                  </div>
                  <br>
                  <button (click)="delete()">Delete</button>
            </div>
  \`
})
export class BigTechnologyDetailComponent extends TechnologyDetailComponent {
  @Input() technology: Technology;
  @Output() deleteRequest = new EventEmitter<Technology>();

  delete() {
    this.deleteRequest.emit(this.technology);
  }

}


// property vs attribute binding, buttons
import { Component } from '@angular/core';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Property vs. Attribute Binding. Buttons</h1>
            <img src="../../assets/ng-logo.png"
                 [src]="heroImageUrl">
            <br><br>
           <img [src]="iconUrl">
           <img bind-src="heroImageUrl">
           <img [attr.src]="villainImageUrl">

           <h2>Buttons</h2>
           <button>Enabled but does nothing</button>
           <button disabled>Disabled</button>
           <button disabled=false>Still disabled</button>
           <br><br>
           <button disabled>Disabled by attribute</button>
           <button [disabled]="isUnchanged">Disabled by property binding</button>
           <br><br>
           <button bind-disabled="isUnchanged" on-click="onSave($event)">
              Disabled Cancel
           </button>
           <button [disabled]="!canSave" (click)="onSave($event)">Enabled Save</button>
    \`,
    styles: [\`
      img {
        height: 100px;
      }
    \`]
  })
  export class ApiComponent {
    heroImageUrl = '../../assets/hero.jpg';
    iconUrl = '../../assets/ng-logo.png';
    villainImageUrl = '../../assets/hang.jpg';
    isUnchanged = true;
    canSave = true;

    onSave(evt: KeyboardEvent) {
      alert('Event target class is ' + (<HTMLElement>evt.target).textContent);
    }
  }


// property binding
import { Component } from '@angular/core';
import { Technology } from './../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Property Binding</h1>
            <img [src]="heroImageUrl">
            <button [disabled]="isUnchanged">Cancel is disabled</button>
            <div [ngClass]="classes">[ngClass] is binding to the classes property</div>
            <app-technology-detail [technology]="currentTechnology"></app-technology-detail>
            <img bind-src="heroImageUrl">
            <app-technology-detail prefix="You are my" [technology]="currentTechnology">
            </app-technology-detail>

            <p><img src="{{ heroImageUrl }}"> is the <i>interpolated</i> image.</p>
            <p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>

            <p><span>"{{ title }}" is the <i>interpolated title</i> title.</span></p>
            <p>"<span [innerHTML]="title"></span>" is the <i>property bound</i> title.</p>

            <p><span>"{{ evilTitle }}" is the <i>interpolated title</i>
            evil title.</span></p>
            <p>"<span [innerHTML]="evilTitle"></span>" is the <i>property bound</i>
            evil title.</p>
    \`,
    styles: [\`
      img {
        height: 100px;
      }
      .special {
        font-weight: bold;
        font-size: x-large;
        color: red;
      }
    \`]
  })
  export class ApiComponent {
    heroImageUrl = '../../assets/hero.jpg';
    isUnchanged = true;
    classes = 'special';
    currentTechnology = Technology.technologies[0];
    title = 'Hello Nils-Holger';
    evilTitle = 'Template <script>alert("extermination through work")</script>Syntax';

  }


// attribute binding
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Attribute Binding</h1>
          <table border="1">
            <tr><td [attr.colspan]="1 + 1">One-Two</td></tr>
            <tr><td>Three</td><td>Four</td></tr>
          </table>
          <br>
          <button [attr.aria-label]="actionName">{{ actionName }} with Aria</button>
          <br>
          <br>
          <div>
              <button [attr.disabled]="isUnchanged">Disabled</button>
              <button [attr.disabled]="!isUnchanged">Disabled as well</button>
              <button disabled [disabled]="false">Enabled (but inert)</button>
          </div>
   \`
})
export class ApiComponent {
  actionName = 'Go for it';
  isUnchanged = true;

}


// class binding
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Class Binding</h1>
          <div class="nice girly special">Nice girly special</div>

          <div class="nice girly special" [class]="niceGirly">Nice girly</div>

          <div [class.special]="isSpecial">This class binding is special</div>

          <div class="special" [class.special]="!isSpecial">This one is not so special</div>

          <div bind-class.special="isSpecial">This class binding is special too</div>
  \`,
  styles: [\`
    .nice {
      color: red;
    }
    .girly {
      font-family: Brush Script MT;
    }
    .special {
      font-weight: bold;
      font-size: x-large;
    }
  \`]
})
export class ApiComponent {
  niceGirly = 'nice girly';
  isSpecial = true;

}


// style binding
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Style Binding</h1>
          <button [style.color]="isSpecial ? 'red' : 'green'">Red</button>
          <button [style.background-color]="canSave ? 'cyan' : 'grey'">Save Her</button>
          <button [style.font-size.em]="isSpecial ? 3 : 1">Big</button>
          <button [style.font-size.%]="!isSpecial ? 150 : 50">Small</button>

  \`
})
export class ApiComponent {
  niceGirly = 'nice girly'; // gets a date
  isSpecial = true;
  canSave = true;

}


// event binding
import { Component } from '@angular/core';

import { Technology } from './../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Event Binding</h1>

            <button (click)="onSaveHer()">Save Her</button>
            <button on-click="onSaveHer()">Save Her</button>

            <div>
                <div (appMyClick)="clickMessage=$event">Click with MyClick!</div>
                {{ clickMessage }}
            </div>

            <app-technology-detail (deleteRequest)="deleteTechnology($event)"
                                    [technology]="currentTechnology">
            </app-technology-detail>
            <br>

            <app-big-technology-detail (deleteRequest)="deleteTechnology($event)"
                                        [technology]="currentTechnology">
            </app-big-technology-detail>

            <div class="parent-div" (click)="onClickMe($event)">Click me
                <div class="child-div">Click me too!</div>
            </div>

            <div (click)="onSave()">
                <button (click)="onSave($event)">Save, no propagation</button>
            </div>

            <div (click)="onSave()">
                <button (click)="onSave()">Save, with propagation</button>
            </div>

    \`
  })
  export class ApiComponent {
          clickMessage = '';
          currentTechnology = new Technology(100, 'React', 'hungry', new Date(2020, 1, 1),
                                            'https://reactjs.org/', 1000);
          onSaveHer() {
            alert('Save Her ...');
          }

          deleteTechnology(technology: Technology) {
            alert(\`Delete \${technology ? technology.name : 'the technology'}.\`);
          }

          onClickMe(event: KeyboardEvent) {
            let eventMessage = event ?
                            ' Event target class is ' +
                            (<HTMLElement>event.target).className : '';
            alert('Click me.' + eventMessage);
          }

          onSave(event?: KeyboardEvent) {
            let eventMessage = event ?
                            ' Event target is ' +
                            (<HTMLElement>event.target).textContent : '';
            alert('Saved.' + eventMessage);
            if (event) {
              event.stopPropagation();
            }
          }

  }


// two-way binding
import { Component } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>Two-Way Binding</h1>
          <div>
            <app-sizer [(size)]="fontSizePx"></app-sizer>
            <div [style.font-size.px]="fontSizePx">Resizable Text</div>
            <label>FontSize (px): <input [(ngModel)]="fontSizePx"></label>
          </div>
          <h3>De-Sugared Two-Way Binding</h3>
          <app-sizer [size]="fontSizePx"
                     (sizeChange)="fontSizePx=$event">
          </app-sizer>
  \`
})
export class ApiComponent {
  fontSizePx = 18;

}


// ngclass binding
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>NgClass Binding</h1>

          <p>currentClasses is {{ currentClasses | json }}</p>
          <div [ngClass]="currentClasses">
                This div is initially saveable, unchanged and special
          </div>
          <br>
          <label>saveable <input type="checkbox" [(ngModel)]="canSave"></label>
          <label>modified: <input type="checkbox" [value]="!isUnchanged"
            (change)="isUnchanged = !isUnchanged"></label> |
          <label>special: <input type="checkbox" [(ngModel)]="isSpecial"></label>
          <button (click)="setCurrentClasses()">Refresh currentClasses</button>
          <br><br>
              <div [ngClass]="currentClasses">
                    This div should be {{ canSave ? "" : "not"}} saveable,
                                       {{ isUnchanged ? "unchanged" : "modified" }} and,
                                       {{ isSpecial ? "" : "not" }}
                                       special after clicking "Refresh".
              </div>
          <br><br>
          <div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>

          <div class="nice girly special">Nice girly special</div>
          <div [ngClass]="{'nice': false, 'girly': true, 'special': true }">
                    Girly special
          </div>
  \`,
  styles: [\`
        .saveable {
          color: red;
        }
        .girly, .modified {
          font-family: Brush Script MT;
        }
        .special {
          font-weight: bold;
          font-size: x-large;
        }
        .nice {
          color: red;
        }
  \`]
})
export class ApiComponent implements OnInit {
  currentClasses: {};
  canSave = true;
  isUnchanged = true;
  isSpecial = true;

  setCurrentClasses() {
    this.currentClasses = {
      'saveable': this.canSave,
      'modified': !this.isUnchanged,
      'special': this.isSpecial
    };
  }

  ngOnInit() {
    this.setCurrentClasses();
  }

}


// ngstyle binding
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>NgStyle Binding</h1>

          <div [style.font-size]="isSpecial ? 'x-large' : 'smaller'">
                This div is x-large or smaller.
          </div>

          <p>currentStyles is {{ currentStyles | json }}</p>
          <div [ngStyle]="currentStyles">
              This div is initially italic, normal weight, and extra large (24px).
          </div>
          <br>

          <label>italic: <input type="checkbox" [(ngModel)]="canSave"></label> |
          <label>normal: <input type="checkbox" [(ngModel)]="isUnchanged"></label> |
          <label>x-large: <input type="checkbox" [(ngModel)]="isSpecial"></label>
          <button (click)="setCurrentStyles()">Refresh currentStyles</button>
          <br><br>
          <div [ngStyle]="currentStyles">
                This div should be {{ canSave ? "italic" : "plain" }},
                                   {{ isUnchanged ? "normal weight" : "bold" }} and,
                                   {{ isSpecial ? "extra large" : "normal size" }} after
                clicking "Refresh".
          </div>
  \`
})
export class ApiComponent implements OnInit {
  currentStyles: {};
  canSave = true;
  isUnchanged = true;
  isSpecial = true;

  setCurrentStyles() {
    this.currentStyles = {
      'font-style': this.canSave ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSpecial ? '24px' : '12px'
    };
  }

  ngOnInit() {
    this.setCurrentStyles();
  }

}


// ngif binding
import { Component } from '@angular/core';


@Component({
  selector: 'app-ng-api',
  template: \`
          <h1>NgIf Binding</h1>

          <app-technology-detail *ngIf="isActive"></app-technology-detail>

          <div *ngIf="currentTechnology">Hello, {{ currentTechnology.name }}</div>
          <div *ngIf="nullTechnology">Hello, {{ nullTechnology.name }}</div>

          <ng-template [ngIf]="currentTechnology">
                       Add {{ currentTechnology.name }} with template
          </ng-template>

          <div>Technology Detail removed from DOM (via template)
                                 because isActive is false</div>
          <ng-template [ngIf]="isActive">
              <app-technology-detail></app-technology-detail>
          </ng-template>

          <div [class.hidden]="!isSpecial">Show with class</div>
          <div [class.hidden]="isSpecial">Hide with class</div>

          <app-technology-detail [class.hidden]="isSpecial"></app-technology-detail>

          <div [style.display]="isSpecial ? 'block' : 'none'">Show with style</div>
          <div [style.display]="isSpecial ? 'none' : 'block'">Hide with style</div>

  \`,
  styles: [\`
      .hidden {
        display: none;
      }
  \`]
})
export class ApiComponent {
        isActive = false;
        isSpecial = true;
        nullTechnology = null;

        technologies = [
          { id: 1, name: 'Angular 8.2.14' },
          { id: 2, name: 'Angular CLI 8.2.14' },
          { id: 3, name: 'Angular Material 8.2.14'}
        ];

        currentTechnology = this.technologies[1];

}


// ngfor binding
import { Component, OnInit, AfterViewInit,
  QueryList, ElementRef, ViewChildren } from '@angular/core';

import { Technology } from '../technology';

@Component({
selector: 'app-ng-api',
template: \`
<h1>NgFor Binding</h1>

<div class="box">
  <div *ngFor="let technology of technologies">
            {{ technology.name }}
  </div>
</div>
<br>
<div class="box">
      <app-technology-detail *ngFor="let technology of technologies"
                        [technology]="technology">
      </app-technology-detail>
</div>
<br>
<h4>*ngFor with index</h4>
<p>with <i>semi-colon</i> separator</p>
<div class ="box">
  <div *ngFor="let technology of technologies; let i = index;">
          ({{ i + 1 }}) - {{ technology.name }}
  </div>
</div>

<p>with <i>comma</i> separator</p>
<div class="box">
  <div *ngFor="let technology of technologies, let i = index;">
        ({{ i + 1 }}) - {{ technology.name }}
  </div>
</div>

<h4>*ngFor trackBy</h4>
<button (click)="resetTechnologies()">Reset Technologies</button>
<button (click)="changeIds()">Change Ids</button>
<button (click)="clearTrackByCounts()">Clear Counts</button>

<p><i>without</i> trackBy</p>
    <div class="box">
          <div #noTrackBy *ngFor="let technology of technologies">
                ({{ technology.id }}) {{ technology.name }}
          </div>
          <div *ngIf="technologiesNoTrackByCount">
                  Technology DOM elements change #{{ technologiesNoTrackByCount }}
                  without trackBy
          </div>
    </div>
<p>with trackBy</p>
<div class="box">
    <div #withTrackBy *ngFor="let technology of technologies;
         trackBy: trackByTechnologies;">
                ({{ technology.id }}) {{ technology.name }}
    </div>
    <div *ngIf="technologiesWithTrackByCount">
          Technology DOM elements change #{{ technologiesWithTrackByCount }}
          with trackBy
    </div>
</div>
<br>
<br>
<br>

<p>with trackBy and <i>semi-colon</i> separator</p>
<div class="box">
  <div *ngFor="let technology of technologies; trackBy: trackByTechnologies;">
        ({{ technology.id }}) {{ technology.name }}
  </div>
</div>

<p>with trackBy and <i>comma</i> separator</p>
<div class="box">
  <div *ngFor="let technology of technologies, trackBy: trackByTechnologies;">
        ({{ technology.id }}) {{ technology.name }}
  </div>
</div>

<p>with trackBy and <i>space</i> separator</p>
<div class="box">
  <div *ngFor="let technology of technologies trackBy: trackByTechnologies;">
      ({{ technology.id }}) {{ technology.name }}
  </div>
</div>

<p>with <i>generic</i> trackById function</p>
<div class="box">
  <div *ngFor="let technology of technologies, trackBy: trackById;">
    ({{ technology.id }}) {{ technology.name }}
  </div>
</div>
\`,
styles: [\`
.box {
border: 3px solid red;
padding: 6px;
max-width: 300px;
}
\`]
})
export class ApiComponent implements OnInit, AfterViewInit {
@ViewChildren('noTrackBy') technologiesNoTrackBy: QueryList<ElementRef>;
@ViewChildren('withTrackBy') technologiesWithTrackBy: QueryList<ElementRef>;

technologiesNoTrackByCount = 0;
technologiesWithTrackByCount = 0;
technologiesWithTrackByCountReset = 0;

technologyIdIncrement = 1;

technologies: Technology[] = [];

resetTechnologies() {
this.technologies = Technology.technologies.map(technology => technology.clone());
this.technologiesWithTrackByCountReset = 0;
}

changeIds() {
this.resetTechnologies();
this.technologies.forEach(t => t.id += 10 * this.technologyIdIncrement++);
this.technologiesWithTrackByCountReset = -1;
}

clearTrackByCounts() {
const trackByCountReset = this.technologiesWithTrackByCountReset;
this.resetTechnologies();
this.technologiesNoTrackByCount = -1;
this.technologiesWithTrackByCount = trackByCountReset;
this.technologyIdIncrement = 1;
}

ngOnInit() {
this.technologies = Technology.technologies;
}

ngAfterViewInit() {
trackChanges(this.technologiesNoTrackBy,
           () => this.technologiesNoTrackByCount++);
trackChanges(this.technologiesWithTrackBy,
           () => this.technologiesWithTrackByCount++);
}


trackByTechnologies(index: number, technology: Technology):
                number { return technology.id; }

trackById(index: number, item: any):
                number { return item['id']; }

}

function trackChanges(views: QueryList<ElementRef>, changed: () => void) {
let oldRefs = views.toArray();
views.changes.subscribe((changes: QueryList<ElementRef>) => {
const changedRefs = changes.toArray();
const isSame = oldRefs.every((v, i) =>
                    v.nativeElement === changedRefs[i].nativeElement);
if (!isSame) {
  oldRefs = changedRefs;
  setTimeout(changed, 0);
}
});
}


// ngswitch binding
import { Component, OnInit } from '@angular/core';

import { Technology } from '../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>NgSwitch Binding</h1>

            <p>Select your favorite technology</p>

            <div>
                <label *ngFor="let tech of technologies">
                <input type="radio" name="technologies" [(ngModel)]="currentTechnology"
                       [value]="tech">{{ tech.name }}
                </label>
            </div>

            <div [ngSwitch]="currentTechnology.emotion">
                <app-awesome-technology
                                        *ngSwitchCase="'awesome'"
                                        [technology]="currentTechnology">
                </app-awesome-technology>
                <app-strong-technology
                                        *ngSwitchCase="'strong'"
                                        [technology]="currentTechnology">
                </app-strong-technology>
                <app-happy-technology
                                        *ngSwitchCase="'happy'"
                                        [technology]="currentTechnology">
                </app-happy-technology>
                <div *ngSwitchCase="'happy'">
                        Are you as happy as {{ currentTechnology.name }}?
                </div>
                <app-future-technology *ngSwitchDefault [technology]="currentTechnology">
                </app-future-technology>
            </div>
    \`
  })
  export class ApiComponent implements OnInit {
          technologies: Technology[] = [];
          currentTechnology: Technology;

          ngOnInit() {
            this.technologies = Technology.technologies;
            this.currentTechnology = this.technologies[0];
          }
  }


// template reference variables
import { Component } from '@angular/core';

import { Technology } from './../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Template Reference Variables</h1>

            <input #phone placeholder="phone number">

            <button (click)="callPhone(phone.value)">Call</button>

            <input ref-fax placeholder="fax number">
            <button (click)="callFax(fax.value)">Fax</button>

            <button #btn disabled [innerHTML]="'disabled by attribute: '
                                               +btn.disabled"></button>

            <h4>Technology Form</h4>
            <app-technology-form [technology]="currentTechnology"></app-technology-form>
    \`
  })
  export class ApiComponent {
    currentTechnology: Technology;

    callPhone(value: string) {
      alert(\`Calling \${value} ...\` );
    }

    callFax(value: string) {
      alert(\`Faxing \${value} ...\`);
    }

    constructor() {
      this.currentTechnology = Technology.technologies[0];
    }

  }


// inputs and outputs
import { Component } from '@angular/core';

import { Technology } from './../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Inputs && Outputs</h1>
            <img [src]="iconUrl">
            <button (click)="onSave()">Save Her</button>

            <app-technology-detail [technology]="currentTechnology"
                                  (deleteRequest)="deleteTechnology($event)">
            <app-technology-detail>

            <div (appMyClick)="clickMessage2=$event">MyClick2</div>
            {{ clickMessage2 }}
    \`
  })
  export class ApiComponent {
    currentTechnology: Technology;
    iconUrl = '../../assets/ng-logo.png';
    clickMessage2 = '';
    onSave() {
      alert('Save Her.');
    }

    deleteTechnology(evt) {
      alert(\`Delete \${evt.name}.\`);
    }

    constructor() {
      this.currentTechnology = Technology.technologies[0];
    }

  }


// pipes
import { Component } from '@angular/core';

import { Technology } from './../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Pipes</h1>

            <div>Title through uppercase pipe: {{ title | uppercase }}</div>

            <div>
                  Title through a pipe chain:
                  {{ title | uppercase | lowercase }}
            </div>

            <div>{{ currentTechnology | json }}</div>

            <div>Birthdate: {{ (currentTechnology?.birthDate | date:'longDate')
                                                             | uppercase }}</div>

            <div>
                <label>Price: </label> {{ price | currency:'EUR':true }}
            </div>
    \`
  })
  export class ApiComponent {
    title = 'Super Technology';
    currentTechnology: Technology;
    price = 42;

    constructor() {
      this.currentTechnology = Technology.technologies[0];
    }

  }


// safe navigation operator ?.
import { Component } from '@angular/core';

import { Technology } from './../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Safe Navigation Operator ?.</h1>

            <div>
                The title is {{ title }}
            </div>

            <div>
                The current technologies name is {{ currentTechnology?.name }}
            </div>

            <div>
                The current technologies name is {{ currentTechnology.name }}
            </div>

            <div *ngIf="nullTechnology">
                The null technologies name is {{ nullTechnology.name }}
            </div>

            <div>
                The null technologies name is {{ nullTechnology && nullTechnology.name }}
            </div>

            <div>
              The null technologies name is {{ nullTechnology?.name }}
            </div>
    \`
  })
  export class ApiComponent {
    title = 'Super Code';
    currentTechnology: Technology;

    constructor() {
      this.currentTechnology = Technology.technologies[0];
    }

    get nullTechnology(): Technology {
      return null;
    }

  }


// non-null assertion operator !.
import { Component } from '@angular/core';

import { Technology } from './../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Non-Null Assertion Operator !.</h1>

            <div *ngIf="technology">
                  The technologies name is {{ technology!.name }}
            </div>
    \`
  })
  export class ApiComponent {
    technology: Technology;

    constructor() {
      this.technology = Technology.technologies[0];
    }
  }

// any type cast function
import { Component } from '@angular/core';

import { Technology } from './../technology';

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Any Type Cast Function $any()</h1>

            <div>
                  <div>
                        The technology's marker is {{ $any(technology).marker }}
                  </div>
            </div>

            <div>
                    <div>
                        Undeclared member is {{ $any(this).member }}
                    </div>
            </div>
    \`
  })
  export class ApiComponent {
    technology: Technology;

    constructor() {
      this.technology = Technology.technologies[0];
    }
  }


// enums in binding
import { Component } from '@angular/core';


export enum Color { Red, Green, Blue };

  @Component({
    selector: 'app-ng-api',
    template: \`
            <h1>Enums In Binding</h1>

            <p>
                The name of the Color.Red enum is {{ Color[Color.Red] }}.<br>
                The current color is {{ Color[color] }} and its number is {{ color }}.<br>
                <button [style.color]="Color[color]" (click)="colorToggle()">
                    Enum Toggle
                </button>
            </p>
    \`
  })
  export class ApiComponent {
    Color = Color;
    color = Color.Red;

    colorToggle() {
      this.color = (this.color === Color.Red) ? Color.Blue : Color.Red;
    }
  }


// observable of
import { Component } from '@angular/core';

import { of } from 'rxjs';


@Component({
    selector: 'app-root',
    template: \`
            <ul>
                  <li *ngFor="let number of myNumbers$ | async">
                          {{ number * 2 }}
                  </li>
            </ul>
    \`
  })
  export class AppComponent {

    myNumbers$ = of([2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]);

  }


// subject
import { Component } from '@angular/core';

import { Subject } from 'rxjs';


@Component({
    selector: 'app-root',
    template: \`
           <button (click)="upVote(1)">
              Up Vote
            </button>
    \`
  })
  export class AppComponent {

    counter$ = new Subject<number>();

    upVote(vote: number) {
      this.counter$.next(vote);
    }

    constructor() {
      this.counter$.subscribe(value => {
        console.log(value);
      });
    }
  }

// range pipe filter map subscribe
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { range } from 'rxjs/observable/range';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  template: \`

  \`
})
export class ObservableComponent {

    constructor() {
      range(1, 100)
          .pipe(
            filter(x => x % 2 === 1),
            map(x => x + x))
          .subscribe(x => console.log(x));
    }

}

// scan
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { range } from 'rxjs/observable/range';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  template: \`

  \`
})
export class ObservableComponent {

   source$ = range(0, 10);

    constructor() {
      this.source$
          .pipe(
            filter(x => x % 2 === 0),
            map(x => x + x),
            scan((acc, x) => acc + x, 0))
          .subscribe(x => console.log(x));
    }

}


// observable from event
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-observable',
  template: \`
          <button #herSexyButton>Click</button>
  \`
})
export class ObservableComponent implements AfterViewInit {
    @ViewChild('herSexyButton', { static: false }) button: ElementRef;

    ngAfterViewInit() {
      const btnSubscription = Observable.fromEvent(this.button.nativeElement, 'click')
                          .subscribe(() => console.log('Clicked'));

    }
}


// button scan
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  template: \`
          <button #herSexyButton>Click</button>
  \`
})
export class ObservableComponent implements AfterViewInit {
    @ViewChild('herSexyButton', { static: false }) button: ElementRef;

    ngAfterViewInit() {
      const btnSubscription =
                      Observable.fromEvent(this.button.nativeElement, 'click')
                              .pipe(
                              scan(count => count + 1, 0)
                              )
                              .subscribe((count) => console.log(\`Clicked \$\{count} times\`));
    }
}


// throttle time
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { scan, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  template: \`
          <button #herSexyButton>Click</button>
  \`
})
export class ObservableComponent implements AfterViewInit {
    @ViewChild('herSexyButton', { atatic: false}) button: ElementRef;

    ngAfterViewInit() {
      const btnSubscription = Observable.fromEvent(this.button.nativeElement, 'click').pipe(
                                throttleTime(1000),
                                scan(count => count + 1, 0)
                              )
                              .subscribe((count) => console.log(\`Clicked \${count} times\`));
    }
}


// map
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/fromEvent';
  import { scan, throttleTime, map } from 'rxjs/operators';

  @Component({
    selector: 'app-observable',
    template: \`
            <button #herSexyButton>Click</button>
    \`
  })
  export class ObservableComponent implements AfterViewInit {
      @ViewChild('herSexyButton', { static: false }) button: ElementRef;

      ngAfterViewInit() {
        const btnSubscription = Observable.fromEvent(this.button.nativeElement, 'click').pipe(
                                  throttleTime(1000),
                                  map(event => event.clientX),
                                  scan((count, clientX) => count + clientX, 0)
                                )
                                .subscribe((count) => console.log(count));
      }
  }


// observable
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-observable',
  template: \` \`
})
export class ObservableComponent {

  private myObservable = Observable.create((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
      observer.next(4);
      observer.complete();
    }, 1000);
    observer.next(5);
    observer.next(6);
});


  constructor() {
    console.log('just before subscribe');
    this.myObservable.subscribe({
      next: x => console.log('got value ' + x),
      error: err => console.log('something wrong occured: ' + err),
      complete: () => console.log('done')
    });
    console.log('just after subscribe');
  }

}


// interval
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { filter, map, take, toArray } from 'rxjs/operators';


@Component({
  selector: 'app-observable',
  template: \` \`
})
export class ObservableComponent {

    takeEveryNth = (n: number) => <T>(source: Observable<T>) =>
                   new Observable<T>(observer => {
                    let count = 0;
                    return source.subscribe({
                      next(x) {
                        if (count++ % n === 0) {
                          observer.next(x);
                        }
                      },
                        error(err) { observer.error(err); },
                        complete() { observer.complete(); }
                    });
                   })
    takeEveryNthSimple = (n: number) => <T>(source: Observable<T>) =>
                      source.pipe(
                        filter((value, index) => index % n === 0)
                      )

   takeEveryNthSimplest = (n: number) => filter((value, index) => index % n === 0);



    constructor() {
            interval(1).pipe(
                this.takeEveryNth(2),
                map(x => x + x),
                this.takeEveryNthSimple(3),
                map(x => x * x),
                this.takeEveryNthSimplest(4),
                take(3),
                toArray()
                ).subscribe(x => console.log(x));
   }

}



// observables generalizations functions
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-observable',
  template: \` \`
})
export class ObservableComponent {

          myFun = Observable.create((observer) => {
            console.log('Hi Nils-Holger ...');
            observer.next(42);
          });

          constructor() {
            this.myFun.subscribe((x) => console.log(x));
            this.myFun.subscribe((y) => console.log(y));
            this.myFun.subscribe((z) => console.log(z));
          }

}


// behavior subject
import { Component } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-observable',
  template: \` \`
})
export class ObservableComponent {

    subject = new BehaviorSubject(100);

    constructor() {

      this.subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
      });

      this.subject.next(101);
      this.subject.next(102);

      this.subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
      });

      this.subject.next(103);

    }
}


// replay subject
import { Component } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-observable',
  template: \` \`
})
export class ObservableComponent {

    subject = new ReplaySubject(2);

    constructor() {

      this.subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
      });

      this.subject.next(1);
      this.subject.next(2);
      this.subject.next(3);
      this.subject.next(4);
      this.subject.next(5);
      this.subject.next(6);

      this.subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
      });

      this.subject.next(7);

    }

}


// async subject
import { Component } from '@angular/core';

import { AsyncSubject } from 'rxjs/AsyncSubject';

@Component({
  selector: 'app-observable',
  template: \` \`
})
export class ObservableComponent {

    subject = new AsyncSubject();

    constructor() {

      this.subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
      });

      this.subject.next(1);
      this.subject.next(2);
      this.subject.next(3);
      this.subject.next(4);
      this.subject.next(5);

      this.subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
      });

      this.subject.next(6);
      this.subject.complete();

    }

}



// create
import { Component } from '@angular/core';

  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/from';


  @Component({
    selector: 'app-observable',
    template: \` \`
  })
  export class ObservableComponent {
      input = Observable.from([2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]);
      multiplyByTen(input) {
        const output = Observable.create(function subscribe(observer) {
                  input.subscribe({
                  next: (cp) => observer.next(10 * cp),
                  error: (err) => observer.error(err),
                  complete: () => observer.complete()
              });
        });
        return output;
      }

      constructor() {
        const output = this.multiplyByTen(this.input);
        output.subscribe(a => console.log(a));
      }

  }


// instance operators
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';


@Component({
  selector: 'app-observable',
  template: \` \`
})
export class ObservableComponent {
    i = Observable.prototype.multiplyByTen = function multiplyByTen() {
      const input = this;
      return Observable.create(function subscribe(observer) {
                input.subscribe({
                next: (cp) => observer.next(10 * cp),
                error: (err) => observer.error(err),
                complete: () => observer.complete()
            });
      });
    };

    constructor() {
      const observable = Observable.from([2, 4, 8, 16, 32, 64, 128]).multiplyByTen();
      observable.subscribe(a => console.log(a));
    }

}


// scheduler
import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import 'rxjs/add/operator/observeOn';


@Component({
  selector: 'app-observable',
  template: \` \`
})
export class ObservableComponent {
    observable = Observable.create((observer) => {
        observer.next(10);
        observer.next(20);
        observer.next(30);
        observer.complete();
    })
    .observeOn(async);

    constructor() {
      console.log('just before subscribe');
      this.observable.subscribe({
        next: cp => console.log('got value ' + cp),
        error: err => console.log('something wrong occured ' + err),
        complete: () => console.log('done')
      });
      console.log('just after subscribe');
    }

}


// converting to observables
const obs = Observable.of('hi', 'baby', 'cpu2');
const obsArr = Observable.from([1, 2, 3, 4, 5, 6]);
const obsEvent = Observable.fromEvent(document.querySelector('button'), 'click');
const obsProm = Observable.fromPromise(fetch('/data'));


// creating observables
export class ObservableComponent {

  myObservable = new Subject();

  constructor() {
    this.myObservable.subscribe(value => console.log(value));
    this.myObservable.next('foo');
    this.myObservable.next('bar');
    this.myObservable.next('baz');

    const myObservable1 = Observable.create(observer => {
            observer.next('oof');
            setTimeout(() => observer.next('rab'), 500);
            setTimeout(() => observer.next('zab'), 1000);
    });
    myObservable1.subscribe(value => console.log(value));

  }

}


// controlling the flow
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { filter, map, delay, throttleTime,
         debounceTime, take, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-observable',
  template: \`

        <input type="text" #box>
        <button #herSexyButton>Button</button>

  \`
})
export class ObservableComponent implements AfterViewInit {
    @ViewChild('box', { static; false }) input: ElementRef;
    @ViewChild('herSexyButton', { static: false }) button: ElementRef;

    constructor() { }

    ngAfterViewInit() {
      const input = Observable.fromEvent(this.input.nativeElement, 'input');

      input.pipe(
        filter(event => event.target.value.length > 3),
        map(event => event.target.value)
      )
      .subscribe(value => console.log(value));

      input.pipe(
        delay(2000),
        map(event => event.target.value)
      )
      .subscribe(value => console.log(value));

      input.pipe(
        throttleTime(200),
        map(event => event.target.value)
      )
      .subscribe(value => console.log(value));

      input.pipe(
        debounceTime(200),
        map(event => event.target.value)
      )
      .subscribe(value => console.log(value));

      input.pipe(
        take(3),
        map(event => event.target.value)
      )
      .subscribe(value => console.log(value));

      const stopStream = Observable.fromEvent(this.button.nativeElement, 'click');
      input.pipe(
        takeUntil(stopStream),
        map(event => event.target.value)
      )
      .subscribe(value => console.log(value));

    }

}


// producing values
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/fromEvent';
  import { map, pluck, pairwise, distinct, distinctUntilChanged } from 'rxjs/operators';


  @Component({
    selector: 'app-observable',
    template: \`

          <input type="text" #box>

    \`
  })
  export class ObservableComponent implements AfterViewInit {
      @ViewChild('box', { static; false }) input: ElementRef;

      constructor() { }

      ngAfterViewInit() {
        const input = Observable.fromEvent(this.input.nativeElement, 'input');

        input.pipe(
          map(event => event.target.value)
        )
        .subscribe(value => console.log(value));

        input.pipe(
          pluck('target', 'value')
        )
        .subscribe(value => console.log(value));

        input.pipe(
          pluck('target', 'value'),
          pairwise()
        )
        .subscribe(value => console.log(value));

        input.pipe(
          pluck('target', 'value'),
          distinct()
        )
        .subscribe(value => console.log(value));

        input.pipe(
          pluck('target', 'value'),
          distinctUntilChanged()
        )
        .subscribe(value => console.log(value));

      }

  }


 // simple store
 import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { Observable } from 'rxjs/Observable';

 export interface StoreOptions {
   debug?: boolean;
   mutateState?: boolean;
 }

 export abstract class Store<T extends object> extends Observable<T> {
   private stateSubject: BehaviorSubject<T>;
   private options: StoreOptions;

   get state() {
     return this.stateSubject.value;
   }

   constructor(initialState: T, options: StoreOptions = {}) {
     const stateSubject = new BehaviorSubject(initialState);
     super(observer => stateSubject.subscribe(observer));
     this.stateSubject = stateSubject;
     this.options = options;
   }

   protected mutate(newState: Partial<T>) {
     const state = this.options.mutateState ?
     Object.assign(this.state, newState) : Object.assign({}, this.state, newState);
     if (this.options.debug) {
       console.log(\`State changed [\${this.constructor.name}]:\`, state);
     }
     this.stateSubject.next(state);
   }

 }
  `,
  blockQuote: `
  Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
  sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
  und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
  und eine die wir vorhaben zu gewinnen.
  `,
  imageFooterUrl: 'assets/img/post10.jpg',
  footerQuote: 'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.'
},
{
  id: 11,
  imageHeaderUrl: 'url(assets/img/post11-bg.jpg)',
  heading: 'Javascript, Basis- Teil 2',
  subHeading: 'Javascript, Dynamisch, Prototypen, Klassen, Objekt-Orientiert',
  metaPublishedDate: 'am 31 Dezember, 2019',
  sectionHeading: 'Javascript, Dynamisch, Prototypen, Klassen, Objekt-Orientiert',
  code: `
// classes constructor
class CoolGuy {
  private specialTrick;
  private nothing;
  private output = (a, b) => a + b;

    constructor(trick) {
		this.specialTrick = trick;
	}

showOff() {
		return this.output('Here\'s my trick: ', this.specialTrick);
	}
}

const Joe = new CoolGuy('running marathons in 02:10');

console.log(Joe.showOff()); // Here's my trick: running marathons in 02:10

// class inheritance
class Vehicle {
  engines;
  output = (a, b = '', c = '') => a + b + c;

  constructor(engines = 1) {
    this.engines = engines;
  }

	ignition() {
    return this.output('Turning on my engine.');
	}

	drive() {
		return this.ignition() + ' ' + this.output('Steering and moving forward!');
	}
}

class Car extends Vehicle {
 wheels;

 constructor(wheels = 4) {
   super(wheels);
   this.wheels = wheels;
 }

  drive() {
    return super.drive() + ' ' + this.output('Rolling on all ', this.wheels, ' wheels!');
  }
}

class SpeedBoat extends Vehicle {

  constructor(engines = 2) {
    super(engines);
    this.engines = engines;
  }

	ignition() {
		return this.output('Turning on my ', this.engines, ' engines.');
	}

	pilot() {
		return super.drive() + ' ' + this.output('Speeding through the water with ease!');
	}
}


const vehicle = new Vehicle();
const car = new Car();
const speedBoat = new SpeedBoat();
console.log(vehicle.engines, vehicle.drive());
console.log(car.wheels, car.drive());
console.log(speedBoat.engines, speedBoat.pilot());


// explicit mixin, manually copy behavior form one object to the next
// simple mixin
const mixin = (sourceObj, targetObj ) => {
	for (const key in sourceObj) {
		if (!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}
	return targetObj;
}

const Vehicle = {
	engines: 1,
	ignition: function() {
		console.log('Turning on my engine.');
	},
	drive: function () {
		this.ignition();
		console.log('Steering and moving forward!');
	}
};

const Car = mixin( Vehicle, {
	wheels: 4,
	drive: function() {
		Vehicle.drive.call(this);
		console.log('Rolling on all ' + this.wheels + ' wheels!');
	}
} );

const vehicle = Vehicle;
const car = Car;
vehicle.drive();
console.log(vehicle.engines);
car.drive();
console.log(car.engines, car.wheels);


// parasitic inheritance
// traditional JS class vehicle
function Vehicle() {
	this.engines = 1;
}
Vehicle.prototype.ignition = () => {
	console.log('Turning on my engine.');
};
Vehicle.prototype.drive = function() {
	this.ignition();
	console.log('Steering and moving forward!');
};

// parasitic class car
function Car() {
	// first car is a vehicle
	const car = new Vehicle();

	// modify car to specialize
	car.wheels = 6;

	// save a privileged reference vehicle.drive
	const vehDrive = car.drive;

	// override vehicle.drive
	car.drive = function() {
		vehDrive.call(this);
		console.log('Rolling on all ' + this.wheels + ' wheels!');
	};

	return car;
}

const myCar = Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 6 wheels!



// implicit mixin
const Something = {
	cool() {
		this.greeting = 'Guten Morgen, Nils-Holger!';
		this.count = this.count ? this.count + 1 : 42;
	}
};

Something.cool();
console.log(Something.greeting); // 'Guten Morgen, Nils-Holger!'
console.log(Something.count); // 42

const Another = {
	cool() {
		// implicit mixin of something to another
		Something.cool.call(this);
	}
};

Another.cool();
console.log(Another.greeting); // 'Guten Morgen, Nils-Holger!'
console.log(Another.count); // 42 (not shared state with something)


// prototypes




  `,
  blockQuote: `
  Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
  sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
  und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
  und eine die wir vorhaben zu gewinnen.
  `,
  imageFooterUrl: 'assets/img/post11.jpg',
  footerQuote: 'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.'
}
  ];

  constructor( private route: ActivatedRoute, private router: Router,
               private location: Location, public sanitization: DomSanitizer) { }

  ngOnInit() {
    this.getArticle();
  }
  getArticle(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    // console.log(this.articleId);
    if (+this.articleId === 1 || this.articleId === 'typescript-basics-1') {
      this.articleId = 1;
    }
    if (+this.articleId === 2 || this.articleId === 'typescript-basics-2') {
      this.articleId = 2;
    }
    if (this.articleId === 'javascript-basics-1') {
      this.articleId = 3;
    }
    if (this.articleId === 'typescript-basics-3') {
      this.articleId = 4;
    }
    if (this.articleId === 'typescript-basics-4') {
      this.articleId = 5;
    }
    if (this.articleId === 'angular-superheroic-javascript-framework') {
      this.articleId = 6;
    }
    if (this.articleId === 'angular-basics-1') {
      this.articleId = 7;
    }
    if (this.articleId === 'angular-basics-2') {
      this.articleId = 8;
    }
    if (this.articleId === 'you-do-not-know-javascript-part-1') {
      this.articleId = 9;
    }
    if (this.articleId === 'angular-basics-3') {
      this.articleId = 10;
    }
    if (this.articleId === 'you-do-not-know-javascript-part-2') {
      this.articleId = 11;
    }
    if (!(+this.articleId) || +this.articleId > 11) {
      this.isNotFound = true;
      this.router.navigate(['page-not-found']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}












// {
//   id: 6,
//   imageHeaderUrl: 'url(assets/img/post5-bg.jpg)',
//   heading: 'Typescript, Basis- Teil 5',
//   subHeading: ' Generics, Enums, Fortgeschrittene Typen',
//   metaPublishedDate: 'am 25 Dezember, 2019',
//   sectionHeading: ' Generics, Enums, Fortgeschrittene Typen',
//   code: `
//   `,
//   blockQuote: `
//   Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
//   sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
//   und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
//   und eine die wir vorhaben zu gewinnen.
//   `,
//   imageFooterUrl: 'assets/img/post5.jpg',
//   footerQuote: 'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.'
// }
