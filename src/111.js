function createPerson (name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  0.job = job
  o.sayName = function () {
    alert(this.name)
  }

  return o
}

var p1 = new createPerson('nick', 29, 'ali')
var p1 = new createPerson('pom', 19, 'changtou')

function Person(name) (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    alert(this.name)
  }
}

var p1 = new Person('nick', 29, 'ali')
var p1 = new Person('pom', 19, 'changtou')

p1.constructor === Person
p2.constructor === Person

p1 instanceof Object
p1 instanceof Person
p2 instanceof Object
p2 instanceof Person


// 当做构造函数使用
var person = new Person('nick', 29, 'ali')
person.sayName(); // 'nick'

// 作为普通函数
Person('pom', 19, 'changtou')
window.sayName(); // 'nick'

//在另一个对象的作用域中调用
var o = new Object()
Person.call(o, 'kick', 25, 'google')
o.sayName(); //kick

function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = sayName
}
function sayName () {
  alert(this.name)
}

function Person(){}
Person.prototype = {
  name: 'nick',
  age: 29,
  sayName: function () {
    alert(this.name)
  }
}

var friend = new Person()

friend instanceof Object //true
friend instanceof Person //false
friend.constructor === Object // true
