# typescript

> 타입스크립트는 자바스크립트로 컴파일되는, 자바스크립트의 타입이 있는 상위집합입니다.  
> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

## static type 장점

보다 빠른 버그 발견, 툴링, 주석으로서의 타입

## typescript 장점

자바스크립트의 상위집합, 트레이드오프, VS Code, 커뮤니티

> 안전하고 “증명 가능하게 올바른” 타입 시스템 적용하기. 그 대신 정확성과 생산성 사이의 균형을 노린다.  
> Apply a sound or "provably correct" type system. Instead, strike a balance between correctness and productivity.

```ts
function getFirstThreeCharsUnsafe(arg: { x: string | null }) {
    if (arg.x !== null) {
        window.alert('arg.x is string!');
        console.log(arg.x.substr(0, 3));
    }
}

var a: { x: string | null } = { x: 'ok' };
window.alert = function (str: string) {
    a.x = null;
};
getFirstThreeCharsUnsafe(a);
```

## 기초 문법

### Type Annotation

`value: type`

```ts
const areYouCool: boolean = true;
const answer: number = 42;
const typescript: string = "great";
const greetings: string = `
Hello, Readers!
Welcome to TypeScript.
`;
const hasType: Object = {
  TypeScript: true,
  JavaScript: false
};
```

### Types

#### Primitive Types

- `boolean`, `number`, `string`
- `null`, `undefined` - 각각 null과 undefined라는 하나의 값만

```ts
타입스크립트에서, 원래 null과 undefined는 기본적으로 모든 타입의 서브타입이다. 즉 아무런 설정이 없다면 아래와 같은 식의 할당이 허용된다.

const a: number = null; // okay
하지만 이런 동작은 버그를 양산하기 쉽다. 때문에 타입스크립트 2.0에 null과 undefined 값을 다른 타입에 할당하는 것을 막는 --strictNullChecks 플래그가 추가되었다.
--strictNullChecks 플래그는 --strict 플래그에 포함된다.
```

- `any` - 모든 타입과 호환 가능
- `void` - `null`과 `undefined`만을 값으로 가질 수 있는 타입
- `never` - 아무런 값도 가질 수 없는 타입

```ts
function alwaysThrow(): never {
  throw new Error(`I'm a wicked function!`);
}
```

#### 배열

```ts
const pibonacci: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const myFavoriteBeers: string[] = ['Imperial Stout', 'India Pale Ale', 'Weizenbock'];

const pibonacci: Array<number> = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const myFavoriteBeers: Array<string> = ['Imperial Stout', 'India Pale Ale', 'Weizenbock'];
```

#### 튜플

```ts
// 튜플 타입 변수는 정확히 명시된 개수 만큼의 원소만을 가질 수 있다.
const nameAndHeight: [string, number] = ['lucas', 172]
```

#### 객체

```ts
const userWithUnknownHeight: { name: string; height?: number; readonly age: number } = { 
  name: '';
  age: 32;
};
user.age = 22; // error TS2540: Cannot assign to 'age' because it is a constant or a read-only property.
```

### Type Alias

```ts
type NewType = Type;
```

```ts
type UUID = string;
type Height = number;
type AnotherUUID = UUID;
type Animals = Animal[];
type User = {
  name: string;
  height: number;
};
```


### Function

function func(param: `type`): `type` {...}

```ts
// default parameter, optional parameter
function sum(a: number = 1, b?: number): number {
  return (a + b);
}

// 선택 매개변수 이후에 필수 매개변수를 두는 것은 허용되지 않는다.
function invalidFetchVideo(subtitleUrl?: string, url: string) {
  /* ... */
}
//error TS1016: A required parameter cannot follow an optional parameter.
```

func: (param1: `type`, param2: `type`) => `type`

```ts
const yetAnotherSum: (a: number, b: number) => number = sum;
const onePlusOne: () => number = () => 2;
const arrowSum: (a: number, b: number) => number = (a, b) => (a + b);

type SumFunction = (a: number, b: number) => number;
const definitelySum: SumFunction = (a, b) => (a + b);
```

#### Overloading

- 함수는 하나 이상의 타입 시그니처를 가질 수 있다.
- 함수는 단 하나의 구현을 가질 수 있다.

```ts
function double(str: string): string;
function double(num: number): number;
function double(arr: boolean[]): boolean[];
// 분기는 함수 본문 내에서 이루어져야 한다.
function double(arg) {
    if (typeof arg === 'string') {
        return `${arg}${arg}`;
    } else if (typeof arg === 'number') {
        return arg * 2;
    } else if (Array.isArray(arg)) {
        return arg.concat(arg);
    }
}
```

#### this

함수의 타입 시그니쳐에서 매개변수 가장 앞에 this 를 추가

```ts
interface HTMLElement {
  tagName: string;
  /* ... */
}
interface Handler {
  (this: HTMLElement, event: Event, callback: () => void): void;
}
let cb: any;
// 실제 함수 매개변수에는 this가 나타나지 않음
const onClick: Handler = function(event, cb) {
  // this는 HTMLElement 타입
  console.log(this.tagName);
  cb();
}
```

### Generic - [?]

여러 타입에 대해 동작하는 요소를 정의하되, 해당 요소를 사용할 때가 되어야 알 수 있는 타입 정보를 정의에 사용

#### type variable - `<T>`

```ts
type MyNumberArray = MyArray<number>
```

#### generic function

```ts
function getFirstElem<T>(arr: T[]): T {
    /* */
}
type MyArray<T> = T[];     // generic type alias
const languages: MyArray<string> = ['TypeScript', 'JavaScript'];
const language = getFirstElem<string>(languages); // 이 때 language의 타입은 문자열
```

inheritance

```ts
function getFirst<T extends Stack<U>, U>(container: T): U {
  const item = container.pop();
  container.push(item);
  return item;
}

getFirst<Stack<number>, number)(numberStack);
```

### Union Type

어떤 타입이 가질 수 있는 경우의 수를 나열 - `type | type | type`

```ts
function square(value: number, returnString: boolean = false): string | number {
  /*  */
}
const stringOrNumber: string | number = square(randomNumber, randomBoolean);

// type
type SquaredType =
    | string
    | number;
function square(value: number, returnOnString: boolean = false): SquaredType {
  /*  */
}
const stringOrNumber: SquaredType = square(randomNumber, randomBoolean);
```

### Intersection Type

이미 존재하는 여러 타입을 모두 만족하는 타입 - `type & type & type`

```ts
type BeerLovingProgrammer =
  & Programmer
  & BeerLover;
```

### Enum

```ts
enum Direction {
  East,
  West,
  South,
  North
}

const south: Direction = Direction.South;
console.log(south); // 2
```

#### computed member

```ts
function getAnswer() {
  return 42;
}
enum SpecialNumbers {
  Answer = getAnswer(),
  //계산된 멤버 뒤에 오는 멤버는 반드시 초기화되어야 한다
  Mystery // error TS1061: Enum member must have initializer.
}
```

#### reverse mapping

```ts
// from
enum Direction {
  East,
  West,
  South,
  North
}
const east: Direction = Direction.East;
// to
var Direction;
(function (Direction) {
    Direction[Direction["East"] = 0] = "East";
    Direction[Direction["West"] = 1] = "West";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["North"] = 3] = "North";
})(Direction || (Direction = {}));
var east = Direction.East;
```

string

```ts
// from
enum Direction {
  East = 'EAST',
  West = 'WEST',
  South = 'SOUTH',
  North = 'NORTH'
}
// to
var Direction;
(function (Direction) {
    Direction["East"] = "EAST";
    Direction["West"] = "WEST";
    Direction["South"] = "SOUTH";
    Direction["North"] = "NORTH";
})(Direction || (Direction = {}));
```

#### const enum

```ts
const enum ConstEnum {
  A,
  B = 2,
  C = B * 2,
  D = -C,
}
// from
console.log(ConstEnum.A);
// to
console.log(0 /* A */);
```

#### union enum

열거형의 모든 멤버가 아래 경우 중 하나에 해당하는 열거형을 유니온 열거형(union enum)이라 부른다.

- 암시적으로 초기화 된 값 (값이 표기되지 않음)
- 문자열 리터럴
- 숫자 리터럴

```ts
type Circle = {
  kind: ShapeKind.Circle;
  radius: number;
}
type Triangle = {
  kind: ShapeKind.Triangle;
  maxAngle: number;
}
type Square = {
  kind: ShapeKind.Square;
  maxLength: number;
}
type Shape = Circle | Triangle | Square;
```

#### union type

```ts
type Direction = 'EAST' | 'WEST' | 'SOUTH' | 'NORTH';
const east: Direction = 'EAST';
const center: Direction = 'CENTER'; // error TS2322: Type '"CENTER"' is not assignable to type 'Direction'.
```

## Interface

값이 특정한 형태(shape)를 갖도록 제약

```ts
interface User {
  name: string;
  readonly height: number;
  favoriteLanguage?: string;
}
const author: User = { name: 'lucas', height: 176 }; // ok
author.height = 183; // error TS2540: Cannot assign to 'height' because it is a constant or a read-only property.
```

### Function Interface

call signature - `(매개변수1 이름: 매개변수1 타입, 매개변수2 이름: 매개변수2 타입, ...): 반환 타입`

```ts
interface GetUserName {
  (user: User): string;
}
const getUserName: GetUserName = function (user) {
  return user.name;
};
```

### Hybrid Interface - call signature + type

```ts
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### Generic Interface

```ts
interface MyResponse<Data> {
  data: Data;
  status: number;
  ok: boolean;
  /* ... */
}
interface User {
  name: string;
  readonly height: number;
  /* ... */
}
const user: MyReponse<User> = await getUserApiCall(userId);
user.name; // 타입 시스템은 user.name이 string임을 알 수 있다.

interface GetData {
  <Data>(response: MyResponse<Data>): Data;
}
```

> 기본적으로 인터페이스로 표현할 수 있는 모든 타입은 인터페이스로 표현하고, 기본 타입에 새로운 이름을 붙이고 싶거나 유니온 타입을 명명하고 싶은 경우 등 인터페이스의 능력 밖인 부분에서만 타입 별칭을 사용하라.

### Indexible Type

코드의 실행 시점에서만 알 수 있는 이름의 동적 속성을 갖는 타입

```ts
const users:  = [
  { name: 'lucas', height: 176, favoriteLanguage: 'TypeScript' },
  { name: 'stranger', height: 42 }
];
interface NameHeightMap {
  [userName: string]: number | undefined;   // index signature
}
const nameHeightMap: NameHeightMap = {};
users.map(user => {
  nameHeightMap[user.name] = user.height;
});
console.log(userHeightMap)
```

#### Index and Type

색인의 타입으로는 `문자열 또는 숫자`만이 사용 가능  
문자열 색인과 숫자 색인이 모두 존재하는 경우, `숫자로 색인 된 값의 타입은 문자열로 색인 된 값 타입의 서브타입이어야 한다`.  
문자열 색인 시그니처가 존재한다면 그 외 모든 속성의 값 타입은 문자열 색인으로 접근한 값의 타입의 서브타입이여야 한다

> 이러한 제약이 존재하는 이유는 자바스크립트 색인의 동작 방식 때문이다. 자바스크립트 코드에서 객체의 색인에 접근할 때, 내부적으로는 색인의 toString() 메소드를 호출해 문자열로 변형된 값을 색인으로 사용한다. 예를 들어 1.toString() === '1' 이므로 obj[1] 이라고 적은 코드는 실제로는 obj['1']와 동일하다.

```ts
interface ErrorProne {
  [str: string]: number;
  [num: number]: boolean;
}
let errorProne: ErrorProne = {
  'abc': 3,
  3: true
};
errorProne[3];

interface User {
    [randomProp: string]: number;
    name: string;
}
// error TS2411: Property 'name' of type 'string' is not assignable to string index type 'number'.
```

#### Readonly

```ts
interface ReadonlyNameHeightMap {
  readonly [name: string]: height;
}
const m: ReadonlyNameHeightMap = { 'lucas': 176 };
m['lucas'] = 177; // error TS2542: Index signature in type 'ReadonlyNameHeightMap' only permits reading.
```

### Interface 확장 - `extends`

```ts
interface BeverageLover {
  favoriteDrink: string;
}
interface BeerLover {
  favoriteDrink: 'beer';
}
interface CoolPerson extends BeverageLover, BeerLover {
  name: string;
}
// error TS2320:
// Interface 'CoolPerson' cannot simultaneously extend types 'BeverageLover' and 'BeerLover'.
// Named property 'favoriteDrink' of types 'BeverageLover' and 'BeerLover' are not identical.
```

> 이름이 겹치는 속성의 타입은 모든 확장 대상 인터페이스에서 같아야 한다.

## Class

### Constructor

```ts
class BarkingDog {
  constructor(barkingSound: string) {
    console.log(`${barkingSound}!`);
  }
}
const err: BarkingDog = new BarkingDog();
// error TS2554: Expected 1 arguments, but got 0.

const err2: BarkingDog = new BarkingDog(3);
// error TS2345: Argument of type '3' is not assignable to parameter of type 'string'.
```
​
const barkingDog: BarkingDog = new BarkingDog('월'); // 월!

## Reference

- [자바스크립트 개발자를 위한 타입스크립트](https://ahnheejong.gitbook.io/ts-for-jsdev)
- [TypeScript with React + Redux/Immutable.js 빠르게 배우기](https://velopert.com/3595)
- [DailyEngineering - TypeScript](https://hyunseob.github.io/categories/JavaScript/TypeScript/)
- [TypeScript Playgound](http://www.typescriptlang.org/play/)