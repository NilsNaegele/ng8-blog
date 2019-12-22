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
      heading: 'Typescript, Basis- Teil 4',
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
      `,
      blockQuote: `
      Wir beabsichtigen zum Mond zu fliegen in diesem Jahrzehnt und andere Sachen zu tun, nicht weil sie einfach sind,
      sondern weil sie schwer sind, weil das Ziel uns dienen wird zu organisieren und messen die Beste unserer Energien
      und Kompetenzen, weil diese Herausforderung ist eine welche wir annehmen, eine die wir nicht vertagen wollen
      und eine die wir vorhaben zu gewinnen.
      `,
      imageFooterUrl: 'assets/img/post4.jpg',
      footerQuote:  'Wir sind alle miteinander verbunden; zueinander biologisch. Zu der Erde, chemisch. Zum Rest des Universums, atomar.',
    }
  ];

  constructor( private route: ActivatedRoute, private router: Router,
               private location: Location, public sanitization: DomSanitizer) { }

  ngOnInit() {
    this.getArticle();
  }
  getArticle(): void {
    this.articleId = +this.route.snapshot.paramMap.get('id');
    // console.log(this.articleId);
    if (!this.articleId || this.articleId > 4) {
      this.isNotFound = true;
      this.router.navigate(['page-not-found']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
