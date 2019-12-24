import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

// symbol type

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  articleId: number;
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
  heading: 'Angular 8/9, Superheroisches Javascript Framework',
  subHeading: 'Angular 8/9, hier die Welt zu retten!',
  metaPublishedDate: 'am 24 Dezember, 2019',
  sectionHeading: 'Basis - Einleitung in Angular 8/9, Template Syntax',
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
  ];

  constructor( private route: ActivatedRoute, private router: Router,
               private location: Location, public sanitization: DomSanitizer) { }

  ngOnInit() {
    this.getArticle();
  }
  getArticle(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id');
    // console.log(this.articleId);
    if (!this.articleId || this.articleId > 6) {
      this.isNotFound = true;
      this.router.navigate(['page-not-found']);
    }
  }

  goBack(): void {
    this.location.back();
  }

  // goToTop() {
  //   document.body.scrollTop = document.documentElement.scrollTop = 0;
  // }
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
