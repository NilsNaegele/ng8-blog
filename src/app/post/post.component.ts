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
  subHeading: 'DI, HTTP, Routing, QR, Testing, TS, API',
  metaPublishedDate: 'am 26 Dezember, 2019',
  sectionHeading: 'Dependency Injection, Http Client, Routing, Quick Reference, Testing, Typescript, API + Template Syntax',
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








  `,
  blockQuote: `
  Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
  sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
  und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
  und eine die wir vorhaben zu gewinnen.
  `,
  imageFooterUrl: 'assets/img/post8.jpg',
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
    if (!(+this.articleId) || +this.articleId > 8) {
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
