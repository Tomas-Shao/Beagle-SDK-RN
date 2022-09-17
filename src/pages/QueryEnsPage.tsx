type FootDescription = {
    description: string,
    (args: number): boolean
}

function doSomething(foot: FootDescription) {
    foot.description
    foot(222)
}

function map<Input, Output>(inputs: Input[], func: (inputs: Input[]) => Output[]) {
    return func(inputs);
}

map(["1", "2"], (n) => [2]);

function greet<U, V extends (args: U) => boolean>(array: U[], func: V): U[] {
    return array.filter(func);
}

greet([1, 2, 3], (n) => n / 2 == 0)


function greetTo(person: { name: string, age: number }) {
    console.log("hello " + person.name)
    console.log(`hello ${person.name}`)
}

interface Paint {
    x: number;
    y: number;
}

function paintTo(paint: Paint) {

}

paintTo({x: 2, y: 20})

interface Colorful {
    color: string
}

interface Circle {
    radius: number
}

interface ColorfulCircle extends Colorful, Circle {
}

const cc: ColorfulCircle = {
    color: "xxx",
    radius: 2
}

type ColorfulCircle2 = Colorful & Circle;

const cc2: ColorfulCircle2 = {
    color: '2',
    radius: 2
}

type orNull<T> = T | null;
type oneOrMany<T> = T | T[];
