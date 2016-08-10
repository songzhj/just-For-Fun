/*
 * 寄生组合式继承，传入超类和子类，以及子类的方法名称和方法。
 * @param(超类型，子类型，子类型的方法名称，子类型的方法)
 */
 function inherit(Super, Sub, functionName, functionArr) {
 	function object(o) {
 	  function F(){}
 	  F.prototype = o;
 	  return new F();
 	}

 	function inheritPrototype(Super, Sub) {
 	  var prototype = object(Super.prototype);
 	  prototype.constructor = Sub;
 	  Sub.prototype = prototype;
 	}

 	inheritPrototype(Super, Sub);

 	for(var i in functionName) {
 		Sub.prototype[functionName[i]] = functionArr[i];
 	}
 }