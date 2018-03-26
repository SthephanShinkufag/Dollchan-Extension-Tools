// ==UserScript==
// @name            Dollchan Extension Tools
// @version         18.2.19.0
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       © Dollchan Extension Team. See the LICENSE file for license rights and limitations (MIT).
// @description     Doing some profit for imageboards
// @icon            https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Icon.png
// @updateURL       https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js
// @run-at          document-start
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_openInTab
// @grant           GM_xmlhttpRequest
// @grant           GM.getValue
// @grant           GM.setValue
// @grant           GM.deleteValue
// @grant           GM.xmlHttpRequest
// @grant           unsafeWindow
// @include         *
// @nocompat        Chrome
// ==/UserScript==
/* eslint-disable */
(function deMainFuncOuter(localData) {
(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":30,"../../modules/es6.array.from":105,"../../modules/es6.string.iterator":116}],2:[function(require,module,exports){
require('../../modules/es6.array.iterator');
module.exports = require('../../modules/_core').Array.values;

},{"../../modules/_core":30,"../../modules/es6.array.iterator":106}],3:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
require('../modules/es7.map.of');
require('../modules/es7.map.from');
module.exports = require('../modules/_core').Map;

},{"../modules/_core":30,"../modules/es6.map":107,"../modules/es6.object.to-string":111,"../modules/es6.string.iterator":116,"../modules/es7.map.from":121,"../modules/es7.map.of":122,"../modules/es7.map.to-json":123,"../modules/web.dom.iterable":133}],4:[function(require,module,exports){
require('../../modules/es6.math.clz32');
module.exports = require('../../modules/_core').Math.clz32;

},{"../../modules/_core":30,"../../modules/es6.math.clz32":108}],5:[function(require,module,exports){
require('../../modules/es6.number.max-safe-integer');
module.exports = 0x1fffffffffffff;

},{"../../modules/es6.number.max-safe-integer":109}],6:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":30,"../../modules/es6.object.assign":110}],7:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/_core":30,"../modules/es6.object.to-string":111,"../modules/es6.promise":112,"../modules/es6.string.iterator":116,"../modules/es7.promise.finally":124,"../modules/es7.promise.try":125,"../modules/web.dom.iterable":133}],8:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
require('../modules/es7.set.of');
require('../modules/es7.set.from');
module.exports = require('../modules/_core').Set;

},{"../modules/_core":30,"../modules/es6.object.to-string":111,"../modules/es6.set":113,"../modules/es6.string.iterator":116,"../modules/es7.set.from":126,"../modules/es7.set.of":127,"../modules/es7.set.to-json":128,"../modules/web.dom.iterable":133}],9:[function(require,module,exports){
require('../../modules/es6.string.ends-with');
module.exports = require('../../modules/_core').String.endsWith;

},{"../../modules/_core":30,"../../modules/es6.string.ends-with":114}],10:[function(require,module,exports){
require('../../modules/es6.string.includes');
module.exports = require('../../modules/_core').String.includes;

},{"../../modules/_core":30,"../../modules/es6.string.includes":115}],11:[function(require,module,exports){
require('../../modules/es6.string.repeat');
module.exports = require('../../modules/_core').String.repeat;

},{"../../modules/_core":30,"../../modules/es6.string.repeat":117}],12:[function(require,module,exports){
require('../../modules/es6.string.starts-with');
module.exports = require('../../modules/_core').String.startsWith;

},{"../../modules/_core":30,"../../modules/es6.string.starts-with":118}],13:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":30,"../../modules/es6.object.to-string":111,"../../modules/es6.symbol":119,"../../modules/es7.symbol.async-iterator":129,"../../modules/es7.symbol.observable":130}],14:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/web.dom.iterable');
require('../modules/es6.weak-map');
require('../modules/es7.weak-map.of');
require('../modules/es7.weak-map.from');
module.exports = require('../modules/_core').WeakMap;

},{"../modules/_core":30,"../modules/es6.object.to-string":111,"../modules/es6.weak-map":120,"../modules/es7.weak-map.from":131,"../modules/es7.weak-map.of":132,"../modules/web.dom.iterable":133}],15:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],16:[function(require,module,exports){
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":44,"./_wks":103}],17:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],18:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":52}],19:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":41}],20:[function(require,module,exports){
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      if (value != value) return true;
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":93,"./_to-iobject":95,"./_to-length":96}],21:[function(require,module,exports){
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   
        else if (res) switch (TYPE) {
          case 3: return true;             
          case 5: return val;              
          case 6: return index;            
          case 2: result.push(val);        
        } else if (IS_EVERY) return false; 
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_array-species-create":23,"./_ctx":32,"./_iobject":49,"./_to-length":96,"./_to-object":97}],22:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-array":51,"./_is-object":52,"./_wks":103}],23:[function(require,module,exports){
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":22}],24:[function(require,module,exports){
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
var ARG = cof(function () { return arguments; }()) == 'Arguments';

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) {  }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    : ARG ? cof(O)
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":25,"./_wks":103}],25:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],26:[function(require,module,exports){
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         
      that._i = create(null); 
      that._f = undefined;    
      that._l = undefined;    
      that[SIZE] = 0;         
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      forEach: function forEach(callbackfn ) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          while (entry && entry.r) entry = entry.p;
        }
      },
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    if (entry) {
      entry.v = value;
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), 
        k: key,                        
        v: value,                      
        p: prev = that._l,             
        n: undefined,                  
        r: false                       
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); 
      this._k = kind;                     
      this._l = undefined;                
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      while (entry && entry.r) entry = entry.p;
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        that._t = undefined;
        return step(1);
      }
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    setSpecies(NAME);
  }
};

},{"./_an-instance":17,"./_ctx":32,"./_descriptors":34,"./_for-of":41,"./_iter-define":56,"./_iter-step":58,"./_meta":61,"./_object-create":65,"./_object-dp":66,"./_redefine-all":79,"./_set-species":84,"./_validate-collection":100}],27:[function(require,module,exports){
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_array-from-iterable":19,"./_classof":24}],28:[function(require,module,exports){
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      
      that._i = id++;      
      that._l = undefined; 
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_an-instance":17,"./_an-object":18,"./_array-methods":21,"./_for-of":41,"./_has":43,"./_is-object":52,"./_meta":61,"./_redefine-all":79,"./_validate-collection":100}],29:[function(require,module,exports){
'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); 
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_an-instance":17,"./_export":38,"./_fails":40,"./_for-of":41,"./_global":42,"./_inherit-if-required":47,"./_is-object":52,"./_iter-detect":57,"./_meta":61,"./_redefine":80,"./_redefine-all":79,"./_set-to-string-tag":85}],30:[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; 

},{}],31:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":66,"./_property-desc":78}],32:[function(require,module,exports){
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function () {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":15}],33:[function(require,module,exports){
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],34:[function(require,module,exports){
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":40}],35:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":42,"./_is-object":52}],36:[function(require,module,exports){
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],37:[function(require,module,exports){
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":71,"./_object-keys":74,"./_object-pie":75}],38:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    own = !IS_FORCED && target && target[key] !== undefined;
    out = (own ? target : source)[key];
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if (target) redefine(target, key, out, type & $export.U);
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
$export.F = 1;   
$export.G = 2;   
$export.S = 4;   
$export.P = 8;   
$export.B = 16;  
$export.W = 32;  
$export.U = 64;  
$export.R = 128; 
module.exports = $export;

},{"./_core":30,"./_ctx":32,"./_global":42,"./_hide":44,"./_redefine":80}],39:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) {  }
  } return true;
};

},{"./_wks":103}],40:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],41:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":18,"./_ctx":32,"./_is-array-iter":50,"./_iter-call":54,"./_to-length":96,"./core.get-iterator-method":104}],42:[function(require,module,exports){
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  : Function('return this')();
if (typeof __g == 'number') __g = global; 

},{}],43:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],44:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":34,"./_object-dp":66,"./_property-desc":78}],45:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":42}],46:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":34,"./_dom-create":35,"./_fails":40}],47:[function(require,module,exports){
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":52,"./_set-proto":83}],48:[function(require,module,exports){
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],49:[function(require,module,exports){
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":25}],50:[function(require,module,exports){
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":59,"./_wks":103}],51:[function(require,module,exports){
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":25}],52:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],53:[function(require,module,exports){
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":25,"./_is-object":52,"./_wks":103}],54:[function(require,module,exports){
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":18}],55:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":44,"./_object-create":65,"./_property-desc":78,"./_set-to-string-tag":85,"./_wks":103}],56:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); 
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      setToStringTag(IteratorPrototype, TAG, true);
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":38,"./_has":43,"./_hide":44,"./_iter-create":55,"./_iterators":59,"./_library":60,"./_object-gpo":72,"./_redefine":80,"./_set-to-string-tag":85,"./_wks":103}],57:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  Array.from(riter, function () { throw 2; });
} catch (e) {  }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) {  }
  return safe;
};

},{"./_wks":103}],58:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],59:[function(require,module,exports){
module.exports = {};

},{}],60:[function(require,module,exports){
module.exports = false;

},{}],61:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, 
    w: {}          
  } });
};
var fastKey = function (it, create) {
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    if (!isExtensible(it)) return 'F';
    if (!create) return 'E';
    setMeta(it);
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    if (!isExtensible(it)) return true;
    if (!create) return false;
    setMeta(it);
  } return it[META].w;
};
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":40,"./_has":43,"./_is-object":52,"./_object-dp":66,"./_uid":99}],62:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); 
    notify = function () {
      node.data = toggle = !toggle;
    };
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  } else {
    notify = function () {
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":25,"./_global":42,"./_task":92}],63:[function(require,module,exports){
'use strict';
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":15}],64:[function(require,module,exports){
'use strict';
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { 
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":40,"./_iobject":49,"./_object-gops":71,"./_object-keys":74,"./_object-pie":75,"./_to-object":97}],65:[function(require,module,exports){
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () {  };
var PROTOTYPE = 'prototype';

var createDict = function () {
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; 
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":18,"./_dom-create":35,"./_enum-bug-keys":36,"./_html":45,"./_object-dps":67,"./_shared-key":86}],66:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":18,"./_descriptors":34,"./_ie8-dom-define":46,"./_to-primitive":98}],67:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":18,"./_descriptors":34,"./_object-dp":66,"./_object-keys":74}],68:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {  }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":34,"./_has":43,"./_ie8-dom-define":46,"./_object-pie":75,"./_property-desc":78,"./_to-iobject":95,"./_to-primitive":98}],69:[function(require,module,exports){
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":70,"./_to-iobject":95}],70:[function(require,module,exports){
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":36,"./_object-keys-internal":73}],71:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],72:[function(require,module,exports){
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":43,"./_shared-key":86,"./_to-object":97}],73:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":20,"./_has":43,"./_shared-key":86,"./_to-iobject":95}],74:[function(require,module,exports){
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":36,"./_object-keys-internal":73}],75:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],76:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],77:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":18,"./_is-object":52,"./_new-promise-capability":63}],78:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],79:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":80}],80:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":30,"./_global":42,"./_has":43,"./_hide":44,"./_uid":99}],81:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source ) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_a-function":15,"./_ctx":32,"./_export":38,"./_for-of":41}],82:[function(require,module,exports){
'use strict';
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":38}],83:[function(require,module,exports){
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? 
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_an-object":18,"./_ctx":32,"./_is-object":52,"./_object-gopd":68}],84:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":34,"./_global":42,"./_object-dp":66,"./_wks":103}],85:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":43,"./_object-dp":66,"./_wks":103}],86:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":87,"./_uid":99}],87:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":42}],88:[function(require,module,exports){
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":15,"./_an-object":18,"./_wks":103}],89:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":33,"./_to-integer":94}],90:[function(require,module,exports){
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_defined":33,"./_is-regexp":53}],91:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_defined":33,"./_to-integer":94}],92:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":25,"./_ctx":32,"./_dom-create":35,"./_global":42,"./_html":45,"./_invoke":48}],93:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":94}],94:[function(require,module,exports){
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],95:[function(require,module,exports){
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":33,"./_iobject":49}],96:[function(require,module,exports){
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; 
};

},{"./_to-integer":94}],97:[function(require,module,exports){
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":33}],98:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":52}],99:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],100:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":52}],101:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":30,"./_global":42,"./_library":60,"./_object-dp":66,"./_wks-ext":102}],102:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":103}],103:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":42,"./_shared":87,"./_uid":99}],104:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":24,"./_core":30,"./_iterators":59,"./_wks":103}],105:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  from: function from(arrayLike ) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":31,"./_ctx":32,"./_export":38,"./_is-array-iter":50,"./_iter-call":54,"./_iter-detect":57,"./_to-length":96,"./_to-object":97,"./core.get-iterator-method":104}],106:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); 
  this._i = 0;                   
  this._k = kind;                
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":16,"./_iter-define":56,"./_iter-step":58,"./_iterators":59,"./_to-iobject":95}],107:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection":29,"./_collection-strong":26,"./_validate-collection":100}],108:[function(require,module,exports){
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":38}],109:[function(require,module,exports){
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":38}],110:[function(require,module,exports){
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":38,"./_object-assign":64}],111:[function(require,module,exports){
'use strict';
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":24,"./_redefine":80,"./_wks":103}],112:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () {  };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) {  }
}();

var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); 
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; 
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; 
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; 
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); 
  }
};

if (!USE_NATIVE) {
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor) {
    this._c = [];             
    this._a = undefined;      
    this._s = 0;              
    this._d = false;          
    this._v = undefined;      
    this._h = 0;              
    this._n = false;          
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":15,"./_an-instance":17,"./_classof":24,"./_core":30,"./_ctx":32,"./_export":38,"./_for-of":41,"./_global":42,"./_is-object":52,"./_iter-detect":57,"./_library":60,"./_microtask":62,"./_new-promise-capability":63,"./_perform":76,"./_promise-resolve":77,"./_redefine-all":79,"./_set-species":84,"./_set-to-string-tag":85,"./_species-constructor":88,"./_task":92,"./_wks":103}],113:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection":29,"./_collection-strong":26,"./_validate-collection":100}],114:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString ) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":38,"./_fails-is-regexp":39,"./_string-context":90,"./_to-length":96}],115:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString ) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":38,"./_fails-is-regexp":39,"./_string-context":90}],116:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); 
  this._i = 0;                
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":56,"./_string-at":89}],117:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  repeat: require('./_string-repeat')
});

},{"./_export":38,"./_string-repeat":91}],118:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString ) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":38,"./_fails-is-regexp":39,"./_string-context":90,"./_to-length":96}],119:[function(require,module,exports){
'use strict';
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  create: $create,
  defineProperty: $defineProperty,
  defineProperties: $defineProperties,
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  getOwnPropertyNames: $getOwnPropertyNames,
  getOwnPropertySymbols: $getOwnPropertySymbols
});

$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; 
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
setToStringTag($Symbol, 'Symbol');
setToStringTag(Math, 'Math', true);
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":18,"./_descriptors":34,"./_enum-keys":37,"./_export":38,"./_fails":40,"./_global":42,"./_has":43,"./_hide":44,"./_is-array":51,"./_is-object":52,"./_library":60,"./_meta":61,"./_object-create":65,"./_object-dp":66,"./_object-gopd":68,"./_object-gopn":70,"./_object-gopn-ext":69,"./_object-gops":71,"./_object-keys":74,"./_object-pie":75,"./_property-desc":78,"./_redefine":80,"./_set-to-string-tag":85,"./_shared":87,"./_to-iobject":95,"./_to-primitive":98,"./_uid":99,"./_wks":103,"./_wks-define":101,"./_wks-ext":102}],120:[function(require,module,exports){
'use strict';
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var fails = require('./_fails');
var validate = require('./_validate-collection');
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      } return method.call(this, a, b);
    });
  });
}

},{"./_array-methods":21,"./_collection":29,"./_collection-weak":28,"./_fails":40,"./_is-object":52,"./_meta":61,"./_object-assign":64,"./_redefine":80,"./_validate-collection":100}],121:[function(require,module,exports){
require('./_set-collection-from')('Map');

},{"./_set-collection-from":81}],122:[function(require,module,exports){
require('./_set-collection-of')('Map');

},{"./_set-collection-of":82}],123:[function(require,module,exports){
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_collection-to-json":27,"./_export":38}],124:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":30,"./_export":38,"./_global":42,"./_promise-resolve":77,"./_species-constructor":88}],125:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":38,"./_new-promise-capability":63,"./_perform":76}],126:[function(require,module,exports){
require('./_set-collection-from')('Set');

},{"./_set-collection-from":81}],127:[function(require,module,exports){
require('./_set-collection-of')('Set');

},{"./_set-collection-of":82}],128:[function(require,module,exports){
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_collection-to-json":27,"./_export":38}],129:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":101}],130:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":101}],131:[function(require,module,exports){
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":81}],132:[function(require,module,exports){
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":82}],133:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, 
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, 
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, 
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./_global":42,"./_hide":44,"./_iterators":59,"./_object-keys":74,"./_redefine":80,"./_wks":103,"./es6.array.iterator":106}],134:[function(require,module,exports){

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; 
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      module.exports = runtime;
    }
    return;
  }

  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  var ContinueSentinel = {};

  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter 
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      context[delegate.resultName] = info.value;

      context.next = delegate.nextLoc;

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      return info;
    }

    context.delegate = null;
    return ContinueSentinel;
  }

  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  (function() { return this })() || Function("return this")()
);

},{}],135:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



(function deMainFuncInner(scriptStorage, FormData, scrollTo, localData) {
	'use strict';


	var getStored = function () {
		var _ref = _asyncToGenerator( regeneratorRuntime.mark(function _callee(id) {
			var value, _value;

			return regeneratorRuntime.wrap(function _callee$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!nav.isNewGM) {
								_context2.next = 7;
								break;
							}

							_context2.next = 3;
							return GM.getValue(id);

						case 3:
							value = _context2.sent;
							return _context2.abrupt('return', value);

						case 7:
							if (!nav.isGM) {
								_context2.next = 11;
								break;
							}

							return _context2.abrupt('return', GM_getValue(id));

						case 11:
							if (!nav.isChromeStorage) {
								_context2.next = 18;
								break;
							}

							_context2.next = 14;
							return new Promise(function (resolve) {
								return chrome.storage.local.get(id, function (obj) {
									if (Object.keys(obj).length) {
										resolve(obj[id]);
									} else {
										chrome.storage.sync.get(id, function (obj) {
											return resolve(obj[id]);
										});
									}
								});
							});

						case 14:
							_value = _context2.sent;
							return _context2.abrupt('return', _value);

						case 18:
							if (!nav.isScriptStorage) {
								_context2.next = 20;
								break;
							}

							return _context2.abrupt('return', scriptStorage.getItem(id));

						case 20:
							return _context2.abrupt('return', locStorage[id]);

						case 21:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee, this);
		}));

		return function getStored(_x6) {
			return _ref.apply(this, arguments);
		};
	}();



	var getStoredObj = function () {
		var _ref2 = _asyncToGenerator( regeneratorRuntime.mark(function _callee2(id) {
			return regeneratorRuntime.wrap(function _callee2$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.t1 = JSON;
							_context3.next = 3;
							return getStored(id);

						case 3:
							_context3.t2 = _context3.sent;

							if (_context3.t2) {
								_context3.next = 6;
								break;
							}

							_context3.t2 = '{}';

						case 6:
							_context3.t3 = _context3.t2;
							_context3.t0 = _context3.t1.parse.call(_context3.t1, _context3.t3);

							if (_context3.t0) {
								_context3.next = 10;
								break;
							}

							_context3.t0 = {};

						case 10:
							return _context3.abrupt('return', _context3.t0);

						case 11:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee2, this);
		}));

		return function getStoredObj(_x7) {
			return _ref2.apply(this, arguments);
		};
	}();



	var readCfg = function () {
		var _ref3 = _asyncToGenerator( regeneratorRuntime.mark(function _callee3() {
			var obj, val, hasGlobal;
			return regeneratorRuntime.wrap(function _callee3$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							obj = void 0;
							_context4.next = 3;
							return getStoredObj('DESU_Config');

						case 3:
							val = _context4.sent;

							if (!(aib.dm in val) || $isEmpty(obj = val[aib.dm])) {
								hasGlobal = nav.isGlobal && !!val.global;

								obj = hasGlobal ? val.global : {};
								if (hasGlobal) {
									delete obj.correctTime;
									delete obj.captchaLang;
								}
							}
							defaultCfg.captchaLang = aib.capLang;
							defaultCfg.language = +!String(navigator.language).toLowerCase().startsWith('ru');
							Cfg = Object.assign(Object.create(defaultCfg), obj);
							if (!Cfg.timeOffset) {
								Cfg.timeOffset = '+0';
							}
							if (!Cfg.timePattern) {
								Cfg.timePattern = aib.timePattern;
							}
							if (aib.prot !== 'http:') {
								Cfg.addVocaroo = 0;
							}
							if (aib.dobr && !Cfg.useDobrAPI) {
								aib.JsonBuilder = null;
							}
							if (!('FormData' in window)) {
								Cfg.ajaxPosting = 0;
							}
							if (!('Notification' in window)) {
								Cfg.desktNotif = 0;
							}
							if (nav.isPresto) {
								Cfg.preLoadImgs = 0;
								Cfg.findImgFile = 0;
								if (!nav.isGM) {
									Cfg.updDollchan = 0;
								}
								Cfg.fileInputs = 0;
							}
							if (nav.scriptHandler === 'WebExtension') {
								Cfg.updDollchan = 0;
							}
							if (Cfg.updThrDelay < 10) {
								Cfg.updThrDelay = 10;
							}
							if (!Cfg.saveSage) {
								Cfg.sageReply = 0;
							}
							if (!Cfg.passwValue) {
								Cfg.passwValue = Math.round(Math.random() * 1e15).toString(32);
							}
							if (!Cfg.stats) {
								Cfg.stats = { view: 0, op: 0, reply: 0 };
							}
							setStored('DESU_Config', JSON.stringify(val));
							lang = Cfg.language;
							if (Cfg.updDollchan && !localData) {
								checkForUpdates(false, val.lastUpd).then(function (html) {
									if (doc.readyState === 'loading') {
										doc.addEventListener('DOMContentLoaded', function () {
											return $popup('updavail', html);
										});
									} else {
										$popup('updavail', html);
									}
								}, emptyFn);
							}

						case 23:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee3, this);
		}));

		return function readCfg() {
			return _ref3.apply(this, arguments);
		};
	}();



	var checkDelete = function () {
		var _ref41 = _asyncToGenerator( regeneratorRuntime.mark(function _callee13(data) {
			var err, els, threads, isThr, i, len, el;
			return regeneratorRuntime.wrap(function _callee13$(_context14) {
				while (1) {
					switch (_context14.prev = _context14.next) {
						case 0:
							err = getSubmitError(data instanceof HTMLDocument ? data : $DOM(data));

							if (!err) {
								_context14.next = 5;
								break;
							}

							$popup('delete', Lng.errDelete[lang] + ':\n' + err);
							updater.sendErrNotif();
							return _context14.abrupt('return');

						case 5:
							els = $Q('[de-form] ' + aib.qRPost + ' input:checked');
							threads = new Set();
							isThr = aib.t;

							for (i = 0, len = els.length; i < len; ++i) {
								el = els[i];

								el.checked = false;
								if (!isThr) {
									threads.add(aib.getPostOfEl(el).thr);
								}
							}

							if (!isThr) {
								_context14.next = 21;
								break;
							}

							Post.clearMarks();
							_context14.prev = 11;
							_context14.next = 14;
							return Thread.first.loadNewPosts();

						case 14:
							_context14.next = 19;
							break;

						case 16:
							_context14.prev = 16;
							_context14.t0 = _context14['catch'](11);

							infoLoadErrors(_context14.t0);

						case 19:
							_context14.next = 23;
							break;

						case 21:
							_context14.next = 23;
							return Promise.all(Array.from(threads, function (thr) {
								return thr.loadPosts(visPosts, false, false);
							}));

						case 23:
							$popup('delete', Lng.succDeleted[lang]);

						case 24:
						case 'end':
							return _context14.stop();
					}
				}
			}, _callee13, this, [[11, 16]]);
		}));

		return function checkDelete(_x39) {
			return _ref41.apply(this, arguments);
		};
	}();

	var html5Submit = function () {
		var _ref42 = _asyncToGenerator( regeneratorRuntime.mark(function _callee14(form, submitter) {
			var needProgress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			var data, hasFiles, _iteratorNormalCompletion23, _didIteratorError23, _iteratorError23, _iterator23, _step23, _ref43, name, value, type, el, val, fileName, newFileName, mime, cleanData, ajaxParams, xhr;

			return regeneratorRuntime.wrap(function _callee14$(_context15) {
				while (1) {
					switch (_context15.prev = _context15.next) {
						case 0:
							data = new FormData();
							hasFiles = false;
							_iteratorNormalCompletion23 = true;
							_didIteratorError23 = false;
							_iteratorError23 = undefined;
							_context15.prev = 5;
							_iterator23 = getFormElements(form, submitter)[Symbol.iterator]();

						case 7:
							if (_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done) {
								_context15.next = 38;
								break;
							}

							_ref43 = _step23.value;
							name = _ref43.name;
							value = _ref43.value;
							type = _ref43.type;
							el = _ref43.el;
							val = value;

							if (!(name === 'de-file-txt')) {
								_context15.next = 16;
								break;
							}

							return _context15.abrupt('continue', 35);

						case 16:
							if (!(type === 'file')) {
								_context15.next = 34;
								break;
							}

							hasFiles = true;
							fileName = value.name;
							newFileName = Cfg.removeFName ? ' ' + fileName.substring(fileName.lastIndexOf('.')) : fileName;
							mime = value.type;

							if (!((Cfg.postSameImg || Cfg.removeEXIF) && (mime === 'image/jpeg' || mime === 'image/png' || mime === 'video/webm' && !aib.mak))) {
								_context15.next = 33;
								break;
							}

							_context15.t0 = cleanFile;
							_context15.next = 25;
							return readFile(value);

						case 25:
							_context15.t1 = _context15.sent.data;
							_context15.t2 = el.obj ? el.obj.extraFile : null;
							cleanData = (0, _context15.t0)(_context15.t1, _context15.t2);

							if (cleanData) {
								_context15.next = 30;
								break;
							}

							return _context15.abrupt('return', Promise.reject(new Error(Lng.fileCorrupt[lang] + ': ' + fileName)));

						case 30:
							val = new File(cleanData, newFileName, { type: mime });
							_context15.next = 34;
							break;

						case 33:
							if (Cfg.removeFName) {
								val = new File([value], newFileName, { type: mime });
							}

						case 34:
							data.append(name, val);

						case 35:
							_iteratorNormalCompletion23 = true;
							_context15.next = 7;
							break;

						case 38:
							_context15.next = 44;
							break;

						case 40:
							_context15.prev = 40;
							_context15.t3 = _context15['catch'](5);
							_didIteratorError23 = true;
							_iteratorError23 = _context15.t3;

						case 44:
							_context15.prev = 44;
							_context15.prev = 45;

							if (!_iteratorNormalCompletion23 && _iterator23.return) {
								_iterator23.return();
							}

						case 47:
							_context15.prev = 47;

							if (!_didIteratorError23) {
								_context15.next = 50;
								break;
							}

							throw _iteratorError23;

						case 50:
							return _context15.finish(47);

						case 51:
							return _context15.finish(44);

						case 52:
							if (!aib.sendHTML5Post) {
								_context15.next = 54;
								break;
							}

							return _context15.abrupt('return', aib.sendHTML5Post(form, data, needProgress, hasFiles));

						case 54:
							ajaxParams = {
								data: data,
								method: 'POST'
							};

							if (needProgress && hasFiles) {
								ajaxParams.onprogress = getUploadFunc();
							}
							_context15.prev = 56;
							_context15.next = 59;
							return $ajax(form.action, ajaxParams);

						case 59:
							xhr = _context15.sent;
							return _context15.abrupt('return', aib.jsonSubmit ? xhr.responseText : $DOM(xhr.responseText));

						case 63:
							_context15.prev = 63;
							_context15.t4 = _context15['catch'](56);
							return _context15.abrupt('return', Promise.reject(_context15.t4));

						case 66:
						case 'end':
							return _context15.stop();
					}
				}
			}, _callee14, this, [[5, 40, 44, 52], [45,, 47, 51], [56, 63]]);
		}));

		return function html5Submit(_x41, _x42) {
			return _ref42.apply(this, arguments);
		};
	}();

	var readFile = function () {
		var _ref44 = _asyncToGenerator( regeneratorRuntime.mark(function _callee15(file) {
			var asText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			return regeneratorRuntime.wrap(function _callee15$(_context16) {
				while (1) {
					switch (_context16.prev = _context16.next) {
						case 0:
							return _context16.abrupt('return', new Promise(function (resolve) {
								var fr = new FileReader();
								fr.onload = function (e) {
									return resolve({ data: e.target.result });
								};
								if (asText) {
									fr.readAsText(file);
								} else {
									fr.readAsArrayBuffer(file);
								}
							}));

						case 1:
						case 'end':
							return _context16.stop();
					}
				}
			}, _callee15, this);
		}));

		return function readFile(_x44) {
			return _ref44.apply(this, arguments);
		};
	}();



	var runMain = function () {
		var _ref79 = _asyncToGenerator( regeneratorRuntime.mark(function _callee22(checkDomains, dataPromise) {
			var formEl, favObj, oldMain, _ref80, _ref81, storageName, firstThr;

			return regeneratorRuntime.wrap(function _callee22$(_context27) {
				while (1) {
					switch (_context27.prev = _context27.next) {
						case 0:
							Logger.initLogger();

							if (!(!(docBody = doc.body) || !aib && !(aib = getImageBoard(checkDomains, true)))) {
								_context27.next = 3;
								break;
							}

							return _context27.abrupt('return');

						case 3:
							formEl = $q(aib.qDForm + ', form[de-form]');

							if (formEl) {
								_context27.next = 7;
								break;
							}

							if (aib.observeContent) {
								aib.observeContent(checkDomains, dataPromise);
							}
							return _context27.abrupt('return');

						case 7:
							Logger.log('Imageboard check');

							if (locStorage) {
								_context27.next = 12;
								break;
							}

							if (checkStorage()) {
								_context27.next = 11;
								break;
							}

							return _context27.abrupt('return');

						case 11:
							initNavFuncs();

						case 12:
							favObj = void 0, oldMain = void 0;
							_context27.next = 15;
							return dataPromise || readData();

						case 15:
							_ref80 = _context27.sent;
							_ref81 = _slicedToArray(_ref80, 2);
							excludeList = _ref81[0];
							favObj = _ref81[1];

							if (!((excludeList = excludeList || '').includes(aib.dm) || !Cfg.disabled && aib.init && aib.init() || !localData && docBody.classList.contains('de-mode-local') || (oldMain = $id('de-main')) && $id('de-panel-buttons').children.length > 1)) {
								_context27.next = 21;
								break;
							}

							return _context27.abrupt('return');

						case 21:
							Logger.log('Storage loading');
							$del(oldMain);
							addSVGIcons();

							if (!Cfg.disabled) {
								_context27.next = 28;
								break;
							}

							Panel.initPanel(formEl);
							scriptCSS();
							return _context27.abrupt('return');

						case 28:
							if ('toJSON' in aProto) {
								delete aProto.toJSON;
							}
							initStorageEvent();
							DollchanAPI.initAPI();
							if (localData) {
								aib.prot = 'http:';
								aib.host = aib.dm;
								aib.b = localData.b;
								aib.t = localData.t;
								aib.docExt = '.html';
							} else {
								aib.parseURL();
							}
							if (aib.t || !Cfg.scrollToTop) {
								doc.defaultView.addEventListener('beforeunload', function () {
									return sesStorage['de-scroll-' + aib.b + (aib.t || '')] = window.pageYOffset;
								});
							}
							Logger.log('Init');
							if (Cfg.correctTime) {
								dTime = new DateTime(Cfg.timePattern, Cfg.timeRPattern, Cfg.timeOffset, lang, function (rp) {
									return saveCfg('timeRPattern', rp);
								});
								Logger.log('Time correction');
							}
							MyPosts.readStorage();
							Logger.log('Read my posts');
							$hide(docBody);
							dummy = doc.createElement('div');
							formEl = aib.fixHTML(formEl, true);
							Logger.log('Replace delform');
							pByEl = new Map();
							pByNum = new Map();
							_context27.prev = 43;

							DelForm.last = DelForm.first = new DelForm(formEl, aib.page, false);
							if (!Thread.first) {
								console.error('No threads detected!');
							}
							_context27.next = 53;
							break;

						case 48:
							_context27.prev = 48;
							_context27.t0 = _context27['catch'](43);

							console.error('Delform parsing error:', getErrorMessage(_context27.t0));
							$show(docBody);
							return _context27.abrupt('return');

						case 53:
							Logger.log('Parse delform');
							storageName = 'de-lastpcount-' + aib.b + '-' + aib.t;

							if (aib.t && !!sesStorage[storageName] && sesStorage[storageName] > Thread.first.pcount) {
								sesStorage.removeItem(storageName);
								window.location.reload();
							}
							pr = new PostForm($q(aib.qForm));
							Logger.log('Parse postform');
							if (Cfg.hotKeys) {
								HotKeys.enableHotKeys();
								Logger.log('Init keybinds');
							}
							initPage();
							Logger.log('Init page');
							Panel.initPanel(formEl);
							Logger.log('Add panel');
							DelForm.first.addStuff();
							readViewedPosts();
							scriptCSS();
							Logger.log('Apply CSS');
							$show(docBody);
							Logger.log('Display page');
							toggleInfinityScroll();
							Logger.log('Infinity scroll');
							firstThr = DelForm.first.firstThr;

							if (firstThr) {
								readPostsData(firstThr.op, favObj);
							}
							Logger.log('Hide posts');
							embedPostMsgImages(DelForm.first.el);
							Logger.log('Image-links');
							scrollPage();
							Logger.log('Scroll page');
							if (localData) {
								$each($Q('.de-post-removed'), function (el) {
									var post = pByEl.get(el);
									if (post) {
										post.deletePost(false);
									}
								});
								Logger.log('Local changings');
							}
							Logger.finish();

						case 80:
						case 'end':
							return _context27.stop();
					}
				}
			}, _callee22, this, [[43, 48]]);
		}));

		return function runMain(_x84, _x85) {
			return _ref79.apply(this, arguments);
		};
	}();



	var _marked = regeneratorRuntime.mark(getFormElements);

	var version = '18.2.19.0';
	var commit = '66a0908';


	var defaultCfg = {
		disabled: 0, 
		language: 0, 
		hideBySpell: 1, 
		spells: null, 
		sortSpells: 0, 
		menuHiddBtn: 1, 
		hideRefPsts: 0, 
		delHiddPost: 0, 
		ajaxUpdThr: 1, 
		updThrDelay: 20, 
		updCount: 1, 
		favIcoBlink: 0, 
		desktNotif: 0, 
		noErrInTitle: 0, 
		markNewPosts: 1, 
		useDobrAPI: 1, 
		markMyPosts: 1, 
		hideReplies: 0, 
		expandTrunc: 0, 
		showHideBtn: 1, 
		showRepBtn: 1, 
		postBtnsCSS: 1, 
		postBtnsBack: '#8c8c8c', 
		thrBtns: 1, 
		noSpoilers: 1, 
		noPostNames: 0, 
		widePosts: 0, 
		correctTime: 0, 
		timeOffset: '+0', 
		timePattern: '', 
		timeRPattern: '', 
		expandImgs: 2, 
		imgNavBtns: 1, 
		imgInfoLink: 1, 
		resizeDPI: 0, 
		resizeImgs: 1, 
		minImgSize: 100, 
		zoomFactor: 25, 
		webmControl: 1, 
		webmTitles: 0, 
		webmVolume: 100, 
		minWebmWidth: 320, 
		preLoadImgs: 0, 
		findImgFile: 0, 
		openImgs: 0, 
		imgSrcBtns: 1, 
		delImgNames: 0, 
		maskImgs: 0, 
		maskVisib: 7, 
		linksNavig: 1, 
		linksOver: 100, 
		linksOut: 1500, 
		markViewed: 0, 
		strikeHidd: 0, 
		removeHidd: 0, 
		noNavigHidd: 0, 
		markMyLinks: 1, 
		crossLinks: 0, 
		decodeLinks: 0, 
		insertNum: 1, 
		addOPLink: 0, 
		addImgs: 0, 
		addMP3: 1, 
		addVocaroo: 1, 
		addYouTube: 3, 
		YTubeWidth: 360, 
		YTubeHeigh: 270, 
		YTubeTitles: 0, 
		ytApiKey: '', 
		addVimeo: 1, 
		ajaxPosting: 1, 
		postSameImg: 1, 
		removeEXIF: 1, 
		removeFName: 0, 
		sendErrNotif: 1, 
		scrAfterRep: 0, 
		fileInputs: 2, 
		addPostForm: 2, 
		spacedQuote: 1, 
		favOnReply: 1, 
		warnSubjTrip: 0, 
		addSageBtn: 1, 
		saveSage: 1, 
		sageReply: 0, 
		altCaptcha: 0, 
		capUpdTime: 300, 
		captchaLang: 1, 
		addTextBtns: 1, 
		txtBtnsLoc: 1, 
		passwValue: '', 
		userName: 0, 
		nameValue: '', 
		noBoardRule: 1, 
		noPassword: 1, 
		noName: 0, 
		noSubj: 0, 
		scriptStyle: 0, 
		userCSS: 0, 
		userCSSTxt: '', 
		expandPanel: 0, 
		panelCounter: 1, 
		rePageTitle: 1, 
		animation: 1, 
		closePopups: 0, 
		inftyScroll: 1, 
		scrollToTop: 0, 
		hotKeys: 1, 
		loadPages: 1, 
		updDollchan: 2, 
		textaWidth: 300, 
		textaHeight: 115, 
		replyWinDrag: 0, 
		replyWinX: 'right: 0', 
		replyWinY: 'top: 0', 
		cfgTab: 'filters', 
		cfgWinDrag: 0, 
		cfgWinX: 'right: 0', 
		cfgWinY: 'top: 0', 
		hidWinDrag: 0, 
		hidWinX: 'right: 0', 
		hidWinY: 'top: 0', 
		favWinDrag: 0, 
		favWinX: 'right: 0', 
		favWinY: 'top: 0', 
		favWinWidth: 500, 
		vidWinDrag: 0, 
		vidWinX: 'right: 0', 
		vidWinY: 'top: 0' 
	};


	var Lng = {
		cfgTab: {
			filters: ['Фильтры', 'Filters', 'Фільтри'],
			posts: ['Посты', 'Posts', 'Пости'],
			images: ['Картинки', 'Images', 'Зображ.'],
			links: ['Ссылки', 'Links', 'Посил.'],
			form: ['Форма', 'Form', 'Форма'],
			common: ['Общее', 'Common', 'Спільне'],
			info: ['Инфо', 'Info', 'Інфо']
		},
		cfg: {
			language: {
				sel: [['Ru', 'En', 'Ua'], ['Ru', 'En', 'Ua'], ['Ru', 'En', 'Ua']],
				txt: ['', '', '']
			},

			hideBySpell: ['Спеллы: ', 'Magic spells: ', 'Спелли: '],
			sortSpells: ['Сортировать спеллы и удалять дубликаты', 'Sort spells and remove duplicates', 'Сортувати спелли та видаляти дублікати'],
			menuHiddBtn: ['Дополнительное меню для кнопок "Скрыть"', 'Extra options for "Hide" buttons', 'Додаткове меню для кнопок "Сховати"'],
			hideRefPsts: ['Скрывать ответы на скрытые посты', 'Hide replies to hidden posts', 'Ховати відповіді на сховані пости'],
			delHiddPost: {
				sel: [['Откл.', 'Всё', 'Только посты', 'Только треды'], ['Disable', 'All', 'Posts only', 'Threads only'], ['Вимк.', 'Все', 'Лише пости', 'Лише треди']],
				txt: ['Удалять скрытое', 'Remove placeholders', 'Видаляти сховане']
			},

			ajaxUpdThr: ['Апдейтер тредов ', 'Threads updater ', 'Оновлювач тредів '],
			updThrDelay: ['(сек)', '(sec)', '(сек)'],
			updCount: ['Обратный счетчик обновления треда', 'Show countdown to thread update', 'Зворотній відлік оновлення треду'],
			favIcoBlink: ['Мигать фавиконом при появлении новых постов', 'Blink the favicon on new posts', 'Блимати фавіконом в разі появи нових постів'],
			desktNotif: ['Уведомлять о новых постах на рабочем столе', 'Desktop notifications for new posts', 'Повідомляти про нові пости на стільниці'],
			noErrInTitle: ['Не показывать номер ошибки в заголовке', 'Donʼt show error code in pageʼs title', 'Не показувати номер помилки в заголовку'],
			markNewPosts: ['Выделять цветом новые посты', 'Highlight new posts with color', 'Виділяти кольором нові пости'],
			useDobrAPI: ['dobrochan: использовать JSON API', 'dobrochan: use JSON API', 'dobrochan: використовувати JSON API'],
			markMyPosts: ['Выделять цветом мои посты', 'Highlight my own posts', 'Виділяти кольором мої пости'],
			hideReplies: ['Показывать только OP в списке тредов*', 'Show only OP in threads list*', 'Показувати лише OP в списку тредів*'],
			expandTrunc: ['Авторазворот сокращенных постов*', 'Autoexpand truncated posts*', 'Авторозгортання скорочених постів*'],
			thrBtns: {
				sel: [['Откл.', 'Все', 'Все (на доске)', '"Новые посты" на доске'], ['Disable', 'All', 'All (on board)', '"New posts" on board'], ['Вимк.', 'Всі', 'Всі (на дошці)', '"Нові пости" на дошці']],
				txt: ['Кнопки под тредами', 'Buttons under threads', 'Кнопки під тредами']
			},
			showHideBtn: ['Кнопки "Скрыть" ', 'Show "Hide" buttons ', 'Кнопки "Сховати" '],
			showRepBtn: ['Кнопки "Быстрый ответ"', 'Show "Quick reply" buttons', 'Кнопки "Швидка відповідь"'],
			postBtnsCSS: {
				sel: [['Упрощенные', 'Серый градиент', 'Настраиваемые'], ['Simple', 'Gradient grey', 'Custom'], ['Спрощені', 'Сірий градієнт', 'Користувацькі']],
				txt: ['Кнопки постов ', 'Post buttons ', 'Кнопки постів ']
			},
			noSpoilers: {
				sel: [['Откл.', 'Серое', 'Родное'], ['Disable', 'Grey', 'Native'], ['Вимк.', 'Сіре', 'Рідне']],
				txt: ['Раскрытие текстовых спойлеров', 'Text spoilers expansion', 'Розкриття текстових спойлерів']
			},
			noPostNames: ['Скрывать имена в постах', 'Hide poster names', 'Ховати імена в постах'],
			widePosts: ['Растягивать посты по ширине экрана', 'Stretch posts to page width', 'Розтягувати пости на ширину екрану'],
			hotKeys: ['Горячие клавиши', 'Hotkeys', 'Гарячі клавіші'],
			loadPages: ['Количество страниц, загружаемых по F5', 'Number of pages that are loaded on F5 ', 'Кількість сторінок, що завантажуються по F5'],
			correctTime: ['Коррекция времени в постах* ', 'Time correction in posts* ', 'Корекція часу в постах* '],
			timeOffset: ['разница (ч) ', 'time offset (h) ', 'різниця (год) '],
			timePattern: ['Шаблон поиска', 'Search pattern', 'Шаблон пошуку'],
			timeRPattern: ['Шаблон замены', 'Replace pattern', 'Шаблон заміни'],

			expandImgs: {
				sel: [['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center'], ['Вимк.', 'В пості', 'По центру']],
				txt: ['Раскрывать картинки по клику', 'Expand images on click', 'Розгортати зображення по кліку']
			},
			imgNavBtns: ['Добавлять кнопки навигации по картинкам', 'Add buttons to navigate images', 'Додавати кнопки навігації по зображеннях'],
			imgInfoLink: ['Имя файла под раскрытой картинкой', 'Show file name under expanded image', 'Імʼя файлу під розкритим зображенням'],
			resizeDPI: ['Не растягивать на дисплеях с высоким DPI', 'Donʼt upscale images on high DPI displays', 'Не розтягувати на дисплеях з високим DPI'],
			resizeImgs: ['Умещать большие картинки в экран', 'Resize large images to fit screen', 'Вміщувати великі зображення в екран'],
			minImgSize: ['Миним. размер раскрытых картинок (px)', 'Minimal size for expanded images (px)', 'Мінім. розмір розгорнутих зображень (px)'],
			zoomFactor: ['Чувствительность зума картинок [1-100%]', 'Images zoom sensibility [1-100%]', 'Чутливість зуму зображень [1-100%]'],
			webmControl: ['Показывать контрол-бар для WebM', 'Show control bar for WebM', 'Показувати смугу керування для WebM'],
			webmTitles: ['Получать названия WebM из метаданных', 'Load titles from WebM metadata', 'Отримувати назви WebM з метаданих'],
			webmVolume: ['Громкость WebM по умолчанию [0-100%]', 'Default volume for WebM [0-100%]', 'Гучність WebM по замовчуванню [0-100%]'],
			minWebmWidth: ['Минимальная ширина WebM (px)', 'Minimal width for WebM (px)', 'Мінімальна ширина WebM (px)'],
			preLoadImgs: {
				sel: [['Откл.', 'Все', 'Без WebM'], ['Disable', 'All', 'Non-WebM'], ['Вимк.', 'Всі', 'Крім WebM']],
				txt: ['Предварительно загружать картинки*', 'Preload images*', 'Наперед завантажувати зображення *']
			},
			findImgFile: ['Распознавать файлы, встроенные в картинках*', 'Detect embedded files in images*', 'Розпізнавати файли, що вбудовані в зображення*'],
			openImgs: {
				sel: [['Откл.', 'Все подряд', 'Только GIF', 'Кроме GIF'], ['Disable', 'All types', 'Only GIF', 'Non-GIF'], ['Вимк.', 'Всі', 'Лише GIF', 'Крім GIF']],
				txt: ['Заменять картинки на оригиналы*', 'Replace thumbnails with original images*', 'Замінювати зображення на оригінали*']
			},
			imgSrcBtns: ['Добавлять кнопки "Поиск" для картинок', 'Add "Search" buttons for images', 'Додавати кнопки "Пошук" для зображень'],
			delImgNames: ['Скрывать имена картинок', 'Hide filenames', 'Ховати імена зображень'],
			maskVisib: ['Видимость для NSFW-картинок [0-100%]', 'Visibility for NSFW images [0-100%]', 'Видимість для NSFW-зображень [0-100%]'],

			linksNavig: ['Навигация постов по >>ссылкам* ', 'Posts navigation by >>links* ', 'Навігація постів по >>посиланнях* '],
			linksOver: ['Появление ', 'Appearance ', 'Поява '],
			linksOut: ['Пропадание (мс)', 'Disappearance (ms)', 'Зникнення (мс)'],
			markViewed: ['Помечать просмотренные посты', 'Mark viewed posts', 'Позначати переглянуті пости'],
			strikeHidd: ['Зачеркивать >>ссылки на скрытые посты', 'Strike >>links to hidden posts', 'Закреслювати >>посилання на сховані пости'],
			removeHidd: ['Также удалять из обратных >>ссылок', 'Also remove from >>backlinks', 'Також видаляти із зворотніх >>посилань'],
			noNavigHidd: ['Не отображать превью для скрытых постов', 'Donʼt show previews for hidden posts', 'Не показувати превʼю до cхованих постів'],
			markMyLinks: ['Помечать ссылки на мои посты как (You)', 'Mark links to my posts with (You)', 'Позначати посилання на мої пости як (You)'],
			crossLinks: ['Заменять http:// на >>/b/ссылки*', 'Replace http:// with >>/b/links*', 'Замінювати https:// на >>/b/посилання*'],
			decodeLinks: ['Декодировать %D0%A5%D1 в ссылках*', 'Decode %D0%A5%D1 in links*', 'Декодувати %D0%A5%D1 в посиланнях*'],
			insertNum: ['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*', 'Вставляти >>посилання на клік по №посту*'],
			addOPLink: ['>>ссылка при ответе на OP в списке тредов', 'Insert >>link when replying to OP on threads list', '>>посилання при відповіді на OP у списці тредів'],
			addImgs: ['Загружать картинки к jpg/png/gif ссылкам*', 'Load images for jpg/png/gif links*', 'Додавати зображення до jpg/png/gif посилань*'],
			addMP3: ['Плеер к mp3 ссылкам* ', 'Player for mp3 links* ', 'Плеєр до mp3 посилань* '],
			addVocaroo: ['к Vocaroo ссылкам*', 'for Vocaroo links*', 'до Vocaroo посилань*'],
			addVimeo: ['Добавлять плеер к Vimeo ссылкам*', 'Add player for Vimeo links*', 'Додавати плеєр до Vimeo посилань*'],
			addYouTube: {
				sel: [['Ничего', 'Плеер по клику', 'Авто плеер', 'Превью+плеер', 'Только превью'], ['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview'], ['Нічого', 'Плеєр по кліку', 'Авто плеєр', 'Превʼю+плеєр', 'Тільки превʼю']],
				txt: ['к YouTube ссылкам* ', 'for YouTube links* ', 'до YouTube посилань* ']
			},
			YTubeTitles: ['Загружать названия к YouTube ссылкам*', 'Load titles for YouTube links*', 'Отримувати назви до YouTube посилань*'],
			ytApiKey: ['Ключ YT API*', 'YT API Key*', 'Ключ YT API*'],

			ajaxPosting: ['Отправка постов без перезагрузки*', 'Posting without page refresh*', 'Постування без оновлення сторінки*'],
			postSameImg: ['Возможность отправки одинаковых картинок', 'Ability to post duplicate images', 'Можливість надсилання однакових зображень'],
			removeEXIF: ['Удалять EXIF из JPEG ', 'Remove EXIF from JPEG ', 'Видаляти EXIF з JPEG '],
			removeFName: ['Очищать имена файлов', 'Clear file names', 'Видаляти імена файлів'],
			sendErrNotif: ['Оповещать в заголовке об ошибке отправки', 'Inform in title about post send error', 'Сповіщати в заголовку про помилку надсилання'],
			scrAfterRep: ['Перемещаться в конец треда после отправки', 'Scroll to bottom after reply', 'Гортати в кінець треду після надсилання'],
			fileInputs: {
				sel: [['Откл.', 'Упрощ.', 'Превью'], ['Disable', 'Simple', 'Preview'], ['Вимкн.', 'Спрощене', 'Превʼю']],
				txt: ['Улучшенное поле добавления файлов', 'Enhanced file attachment field', 'Покращене поле додавання файлів']
			},
			addPostForm: {
				sel: [['Сверху', 'Внизу', 'Скрытая'], ['At top', 'At bottom', 'Hidden'], ['Вгорі', 'Знизу', 'Прихована']],
				txt: ['Форма ответа в треде', 'Reply form display in thread', 'Форма відповіді в треді']
			},
			spacedQuote: ['Вставлять пробел при цитировании "> "', 'Insert a space when quoting "> "', 'Вставляти пробіл при цитуванні "> "'],
			favOnReply: ['Добавлять тред в "Избранное" после ответа', 'Add thread to "Favorites" after reply', 'Додавати тред в "Вибране" після відповіді'],
			warnSubjTrip: ['Оповещать о трипкоде в поле "Тема"', 'Warn about a tripcode in "Subject" field', 'Сповіщувати про трипкод в полі "Тема"'],
			addSageBtn: ['Кнопка Sage вместо поля "Email" ', 'Replace "Email" with Sage button ', 'Кнопка Sage замість "E-mail" '],
			saveSage: ['Помнить сажу', 'Remember sage', 'Памʼятати сажу'],
			altCaptcha: ['Использовать альтернативную капчу', 'Use alternative captcha', 'Використовувати альтернативну капчу'],
			capUpdTime: ['Интервал обновления капчи (сек)', 'Captcha update interval (sec)', 'Інтервал оновлення капчі (сек)'],
			captchaLang: {
				sel: [['Откл.', 'Eng', 'Rus'], ['Disable', 'Eng', 'Rus'], ['Вимк.', 'Eng', 'Ukr']],
				txt: ['Принудительный язык ввода капчи', 'Forced captcha input language', 'Примусова мова вводу капчі']
			},
			addTextBtns: {
				sel: [['Откл.', 'Графические', 'Упрощённые', 'Стандартные'], ['Disable', 'As images', 'As text', 'Standard'], ['Вимк.', 'Графічні', 'Спрощені', 'Стандартні']],
				txt: ['Кнопки разметки текста ', 'Text markup buttons ', 'Кнопки розмітки тексту ']
			},
			txtBtnsLoc: ['Внизу', 'At bottom', 'Знизу'],
			userPassw: ['Постоянный пароль', 'Fixed password', 'Постійний пароль'],
			userName: ['Постоянное имя', 'Fixed name', 'Постійне імʼя'],
			noBoardRule: ['Правила ', 'Rules ', 'Правила '],
			noPassword: ['Пароль ', 'Password ', 'Пароль '],
			noName: ['Имя ', 'Name ', 'Імʼя '],
			noSubj: ['Тему', 'Subject', 'Тему'],

			scriptStyle: {
				sel: [['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark'], ['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark'], ['Gradient darkblue', 'Gradient blue', 'Solid grey', 'Transparent blue', 'Square dark']],
				txt: ['Стиль Dollchan', 'Dollchan style', 'Стиль Dollchan']
			},
			userCSS: ['Пользовательский CSS', 'User CSS', 'Користувацький CSS'],
			panelCounter: {
				sel: [['Откл.', 'Все посты', 'Без скрытых'], ['Disabled', 'All posts', 'Except hidden'], ['Вимкн.', 'Усі пости', 'Крім схованих']],
				txt: ['Счетчик постов/картинок в треде', 'Сounter for posts/images in thread', 'Лічильник постів/зображень в треді']
			},
			rePageTitle: ['Название треда в заголовке вкладки*', 'Show thread title in the page tab*', 'Назва треду в заголовку вкладки*'],
			animation: ['CSS3 анимация', 'CSS3 animation', 'CSS3 анімація'],
			closePopups: ['Автоматически закрывать уведомления', 'Close popups automatically', 'Автоматично закривати сповіщення'],
			inftyScroll: ['Бесконечная прокрутка страниц', 'Infinite scrolling for pages', 'Нескінченна прокрутка сторінок'],
			scrollToTop: ['Всегда перемещаться вверх в списке тредов', 'Always scroll to top in the threads list', 'Завжди гортати догори в списку тредів'],
			updDollchan: {
				sel: [['Откл.', 'Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'], ['Disable', 'Every day', 'Every 2 days', 'Every week', 'Every 2 weeks', 'Every month'], ['Вимкн.', 'Щодня', 'Кожні 2 дні', 'Щотижня', 'Кожні 2 тижні', 'Щомісяця']],
				txt: ['Проверять обновления Dollchan', 'Check for Dollchan updates', 'Перевіряти оновлення Dollchan']
			},
			excludeList: ['Не запускать Dollchan на:', 'Prevent Dollchan launch on:', 'Не запускати Dollchan на:']
		},

		panelBtn: {
			attach: ['Прикрепить/Открепить панель', 'Attach/Detach panel', 'Закріпити/відкріпити панель'],
			cfg: ['Настройки', 'Settings', 'Налаштування'],
			hid: ['Скрытое', 'Hidden', 'Сховане'],
			fav: ['Избранное', 'Favorites', 'Вибране'],
			vid: ['Ссылки на видео', 'Video links', 'Посилання на відео'],
			refresh: ['Обновить', 'Refresh', 'Оновити'],
			goback: ['Назад на доску', 'Return to board', 'Назад до дошки'],
			gonext: ['На %s страницу', 'Go to page %s', 'До %s сторінки'],
			goup: ['В начало страницы', 'Scroll to top', 'Прогорнути догори'],
			godown: ['В конец страницы', 'Scroll to bottom', 'Прогорнути донизу'],
			expimg: ['Раскрыть все картинки', 'Expand all images', 'Розгорнути всі зображення'],
			maskimg: ['Режим NSFW', 'NSFW mode', 'Режим NSFW'],
			preimg: ['Предзагрузить картинки\r\n([Ctrl+Click] только для новых постов)', 'Preload images\r\n([Ctrl+Click] for new posts only)', 'Наперед завантажити зображення\r\n([Ctrl+Click] лише для нових постів)'],
			savethr: ['Сохранить на диск', 'Save to disk', 'Зберегти на диск'],
			'upd-on': ['Выключить автообновление треда', 'Disable thread updater', 'Вимкнути оновлювач треду'],
			'upd-off': ['Включить автообновление треда', 'Enable thread updater', 'Увімкнути оновлювач треду'],
			'audio-off': ['Звуковое оповещение о новых постах', 'Sound notification about new posts', 'Звукове сповіщення про нові пости'],
			catalog: ['Перейти в каталог', 'Go to catalog', 'Перейти до каталогу'],
			enable: ['Включить/выключить Dollchan', 'Turn on/off the Dollchan', 'Увімкнути/вимкнути Dollchan'],
			pcount: ['Постов в треде', 'Posts in thread', 'Постів у треді'],
			pcountNotHid: ['Постов в треде (без скрытых)', 'Posts in thread (without hidden)', 'Постів у треді (крім схованих)'],
			imglen: ['Картинок в треде', 'Images in thread', 'Зображень у треді'],
			posters: ['Постящих в треде', 'Posters in thread', 'Постувачів у треді']
		},

		togglePost: ['Скрыть/Раскрыть пост', 'Hide/Unhide post', 'Сховати/показати пост'],
		toggleThr: ['Скрыть/Раскрыть тред', 'Hide/Unhide thread', 'Сховати/показати тред'],
		replyToPost: ['Ответить на пост', 'Reply to post', 'Відповісти на пост'],
		replyToThr: ['Ответить в тред', 'Reply to thread', 'Відповісти в тред'],
		expandThr: ['Развернуть тред', 'Expand thread', 'Розгорнути тред'],
		addFav: ['Добавить тред в Избранное', 'Add thread to Favorites', 'Додати тред в Вибране'],
		delFav: ['Убрать тред из Избранного', 'Remove thread from Favorites', 'Прибрати тред з Вибраного'],
		attachPview: ['Закрепить превью', 'Attach preview', 'Закріпити превʼю'],
		searchIn: ['Искать в ', 'Search in ', 'Шукати в '],

		closeWindow: ['Закрыть окно', 'Close window', 'Закрити вікно'],
		closeReply: ['Закрыть форму', 'Close form', 'Закрити форму'],
		toPanel: ['Закрепить на панели', 'Attach to panel', 'Закріпити на панелі'],
		makeDrag: ['Сделать перетаскиваемым окном', 'Make draggable window', 'Зробити перетягуваним вікном'],
		underPost: ['Разместить форму после поста', 'Move form under post', 'Розмістити форму після посту'],
		clearForm: ['Очистить форму', 'Clear form', 'Очистити форму'],

		txtBtn: [['Жирный', 'Bold', 'Жирний'], ['Курсив', 'Italic', 'Курсив'], ['Подчеркнутый', 'Underlined', 'Підкреслений'], ['Зачеркнутый', 'Strike', 'Закреслений'], ['Спойлер', 'Spoiler', 'Спойлер'], ['Код', 'Code', 'Код'], ['Верхний индекс', 'Superscript', 'Верхній індекс'], ['Нижний индекс', 'Subscript', 'Нижній індекс'], ['Цитировать выделенное', 'Quote selected', 'Цитувати виділене']],

		selHiderMenu: { 
			sel: ['Скрывать выделенное', 'Hide selected text', 'Ховати виділене'],
			name: ['Скрывать по имени', 'Hide by name', 'Ховати по імені'],
			trip: ['Скрывать по трипкоду', 'Hide by tripcode', 'Ховати по тріпкоду'],
			img: ['Скрывать по размеру картинки', 'Hide by image size', 'Ховати по розміру зображення'],
			imgn: ['Скрывать по имени картинки', 'Hide by image name', 'Ховати по імені зображення'],
			ihash: ['Скрывать схожие картинки', 'Hide by similar images', 'Ховати подібні зображення'],
			noimg: ['Скрывать без картинок', 'Hide without images', 'Ховати без зображень'],
			notext: ['Скрывать без текста', 'Hide without text', 'Ховати без тексту'],
			text: ['Скрыть схожий текст', 'Hide similar text', 'Сховати схожий текст'],
			refs: ['Скрыть с ответами', 'Hide with answers', 'Сховати з відповідями'],
			refsonly: ['Скрывать ответы', 'Hide answers', 'Ховати відповіді']
		},
		selExpandThr: [
		['+10 постов', 'Последние 30', 'Последние 50', 'Последние 100', 'Весь тред'], ['+10 posts', 'Last 30 posts', 'Last 50 posts', 'Last 100 posts', 'Entire thread'], ['+10 постів', 'Останні 30', 'Останні 50', 'Останні 100', 'Весь тред']],
		selAjaxPages: [
		['1 страница', '2 страницы', '3 страницы', '4 страницы', '5 страниц'], ['1 page', '2 pages', '3 pages', '4 pages', '5 pages'], ['1 сторінка', '2 сторінки', '3 сторінки', '4 сторінки', '5 сторінок']],
		selSaveThr: [
		['Скачать весь тред', 'Скачать картинки'], ['Download thread', 'Download images'], ['Завантажити весь тред', 'Завантажити зображення']],
		selAudioNotif: [
		['Каждые 30 сек.', 'Каждую минуту', 'Каждые 2 мин.', 'Каждые 5 мин.'], ['Every 30 sec.', 'Every minute', 'Every 2 min.', 'Every 5 min.'], ['Кожні 30 сек.', 'Щохвилини', 'Кожні 2 хв.', 'Кожні 5 хв.']],

		hotKeyEdit: [[
		'%l%i24 – предыдущая страница/картинка%/l', '%l%i217 – следующая страница/картинка%/l', '%l%i21 – тред (на доске)/пост (в треде) ниже%/l', '%l%i20 – тред (на доске)/пост (в треде) выше%/l', '%l%i31 – пост (на доске) ниже%/l', '%l%i30 – пост (на доске) выше%/l', '%l%i23 – скрыть пост/тред%/l', '%l%i32 – перейти в тред%/l', '%l%i33 – развернуть тред%/l', '%l%i211 – раскрыть картинку в посте%/l', '%l%i22 – быстрый ответ%/l', '%l%i25t – отправить пост%/l', '%l%i210 – открыть/закрыть "Настройки"%/l', '%l%i26 – открыть/закрыть "Избранное"%/l', '%l%i27 – открыть/закрыть "Скрытое"%/l', '%l%i218 – открыть/закрыть "Видео"%/l', '%l%i28 – открыть/закрыть панель%/l', '%l%i29 – вкл./выкл. режим NSFW%/l', '%l%i40 – обновить тред (в треде)%/l', '%l%i212t – жирный%/l', '%l%i213t – курсив%/l', '%l%i214t – зачеркнутый%/l', '%l%i215t – спойлер%/l', '%l%i216t – код%/l'], [
		'%l%i24 – previous page/image%/l', '%l%i217 – next page/image%/l', '%l%i21 – thread (on board)/post (in thread) below%/l', '%l%i20 – thread (on board)/post (in thread) above%/l', '%l%i31 – on board post below%/l', '%l%i30 – on board post above%/l', '%l%i23 – hide post/thread%/l', '%l%i32 – go to thread%/l', '%l%i33 – expand thread%/l', '%l%i211 – expand postʼs images%/l', '%l%i22 – quick reply%/l', '%l%i25t – send post%/l', '%l%i210 – open/close "Settings"%/l', '%l%i26 – open/close "Favorites"%/l', '%l%i27 – open/close "Hidden"%/l', '%l%i218 – open/close "Videos"%/l', '%l%i28 – open/close main panel%/l', '%l%i29 – toggle NSFW mode%/l', '%l%i40 – update thread%/l', '%l%i212t – bold%/l', '%l%i213t – italic%/l', '%l%i214t – strike%/l', '%l%i215t – spoiler%/l', '%l%i216t – code%/l'], [
		'%l%i24 – попередня сторінка/зображення%/l', '%l%i217 – наступна сторінка/зображення%/l', '%l%i21 – тред (на дошці)/пост (в треді) нижче%/l', '%l%i20 – тред (на дошці)/пост (в треді) вище%/l', '%l%i31 – пост (на дошці) нижче%/l', '%l%i30 – пост (на дошці) вище%/l', '%l%i23 – приховати пост/тред%/l', '%l%i32 – перейти в тред%/l', '%l%i33 – розгорнути тред%/l', '%l%i211 – розгорнути зображення в пості%/l', '%l%i22 – швидка відповідь%/l', '%l%i25t – відправити пост%/l', '%l%i210 – відкрити/закрити "Налаштування"%/l', '%l%i26 – відкрити/закрити "Вибране"%/l', '%l%i27 – відкрити/закрити "Сховане"%/l', '%l%i218 – відкрити/закрити "Посилання на відео"%/l', '%l%i28 – відкрити/закрити панель%/l', '%l%i29 – увімкнути/вимкнути режим NSFW%/l', '%l%i40 – оновити тред (в треді)%/l', '%l%i212t – жирний%/l', '%l%i213t – курсив%/l', '%l%i214t – закреслений%/l', '%l%i215t – спойлер%/l', '%l%i216t – код%/l']],

		cTimeError: ['Неправильные настройки времени', 'Invalid time settings', 'Неправильні налаштування часу'],
		month: [['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру']],
		fullMonth: [['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']],
		week: [['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ['Нед', 'Пон', 'Вів', 'Сер', 'Чет', 'Птн', 'Сбт']],
		monthDict: {
			янв: 0, фев: 1, мар: 2, апр: 3, май: 4, мая: 4, июн: 5, июл: 6, авг: 7, сен: 8, окт: 9, ноя: 10, дек: 11,
			jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
			січ: 0, лют: 1, бер: 2, кві: 3, тра: 4, чер: 5, лип: 6, сер: 7, вер: 8, жов: 9, лис: 10, гру: 11
		},

		seSyntaxErr: ['синтаксическая ошибка в аргументе спелла: %s', 'syntax error in argument of spell: %s', 'синтаксична помилка в аргументі спеллу: %s'],
		seUnknown: ['неизвестный спелл: %s', 'unknown spell: %s', 'невідомий спелл: %s'],
		seMissOp: ['пропущен оператор', 'missing operator', 'пропущено оператор'],
		seMissArg: ['пропущен аргумент спелла: %s', 'missing argument of spell: %s', 'пропущено аргумент спеллу: %s'],
		seMissSpell: ['пропущен спелл', 'missing spell', 'пропущено спелл'],
		seErrRegex: ['синтаксическая ошибка в регулярном выражении: %s', 'syntax error in regular expression: %s', 'синтаксична помилка в регулярному виразі: %s'],
		seUnexpChar: ['неожиданный символ: %s', 'unexpected character: %s', 'неочікуваний символ: %s'],
		seMissClBkt: ['пропущена закрывающая скобка', "missing ')' in expression", 'пропущено закривну дужку'],
		seRepsInParens: ['спелл %s не должен располагаться в скобках', 'spell %s shouldnʼt be inside parentheses', 'спелл %s не може бути в дужках'],
		seOpInReps: ['недопустимо использовать оператор %s со спеллами #rep и #outrep', 'donʼt use operator %s with spells #rep & #outrep', 'неприпустимо використовувати оператор %s зі спеллами #rep и #outrep'],
		seRow: [' (строка ', ' (row ', ' (рядок '],
		seCol: [', столбец ', ', column ', ', стовпчик '],

		editInTxt: ['Правка в текстовом формате', 'Edit in text format', 'Правка в текстовому форматі'],
		editor: {
			cfg: ['Редактирование настроек', 'Edit settings', 'Редагування налаштувань'],
			hidden: ['Редактирование скрытых тредов', 'Edit hidden threads', 'Редагування схованих тредів'],
			favor: ['Редактирование избранного', 'Edit favorites', 'Редагування вибраного'],
			css: ['Редактирование CSS', 'Edit CSS', 'Редагування CSS']
		},

		fileImpExp: ['Импорт/экспорт настроек в файл', 'Import/export config to file', 'Імпорт/експорт налаштувань до файлу'],
		fileToData: ['Загрузить данные из файла', 'Load data from a file', 'Завантажити дані з файла'],
		dataToFile: ['Получить файл</a> с данными', 'Get the file</a> with data', 'Отримати файл</a> з даними'],
		globalCfg: ['Глобальные настройки', 'Global config', 'Глобальні налаштування'],
		loadGlobal: ['и применить к этому домену', 'and apply to this domain', 'і застосувати до цього домену'],
		saveGlobal: ['текущие настройки как глобальные', 'current config as global', 'поточні налаштування як глобальні'],
		descrGlobal: ['Глобальные настройки применяются по умолчанию<br>при первом посещении других доменов', 'Global config is applied by default<br>on the first visit of other domains', 'Глобальні налаштування застосовуються по замовчуванню<br>під час першого відвідання інших доменів'],
		resetCfg: ['Сбросить в настройки по умолчанию', 'Reset config to defaults', 'Скинути в налаштування по замовчуванню'],
		resetData: ['Очистить выбранные данные', 'Reset selected data', 'Очистити обрані дані'],
		allDomains: ['для всех доменов', 'for all domains', 'для всіх доменів'],
		delEntries: ['Удалить выбранные записи', 'Delete selected entries', 'Видалити обрані записи'],
		saveChanges: ['Сохранить внесенные изменения', 'Save your changes', 'Зберегти внесені зміни'],
		hiddenPosts: ['Скрытые посты', 'Hidden posts', 'Сховані пости'],
		hidPostThr: ['Скрытые посты и треды', 'Hidden posts and threads', 'Сховані пости та треди'],
		myPosts: ['Мои посты', 'My posts', 'Мої пости'],

		checkNow: ['Проверить сейчас', 'Check now', 'Перевірити зараз'],
		updAvail: ['Доступно обновление Dollchan: %s', 'Dollchan update available: %s!', 'Доступне оновлення Dollchan: %s'],
		newCommitsAvail: ['Обнаружены новые исправления: %s', 'New fixes detected: %s', 'Виявлено нові виправлення: %s'],
		haveLatestStable: ['Ваша версия %s является последней из стабильных.', 'Your %s version is the latest from stable versions.', 'Ваша версія %s є останньою зі стабільних.'],
		haveLatestCommit: ['Ваша версия %s содержит последние исправления.', 'Your %s version contains all the latest fixes.', 'Ваша версія %s містить всі останні виправлення.'],
		thrViewed: ['Тредов посещено', 'Threads visited', 'Тредів відвідано'],
		thrCreated: ['Тредов создано', 'Threads created', 'Тредів створено'],
		thrHidden: ['Тредов скрыто', 'Threads hidden', 'Тредів сховано'],
		postsSent: ['Постов отправлено', 'Posts sent', 'Постів надіслано'],
		total: ['Всего', 'Total', 'Всього'],
		debug: ['Отладка', 'Debug', 'Відлагодження'],
		infoDebug: ['Информация для отладки', 'Information for debugging', 'Інформація для відлагодження'],

		infoCount: ['Обновить счетчики постов', 'Refresh posts counters', 'Оновити лічильники постів'],
		infoPage: ['Проверить положение тредов (до 10-й страницы)', 'Check for threads position (up to 10th page)', 'Перевірити актуальність тредів (до 10 сторінки)'],
		clrDeleted: ['Очистить недоступные (404) треды', 'Clear inaccessible (404) threads', 'Очистити недоступні (404) треди'],
		oldPosts: ['Постов при последнем посещении', 'Posts at the last visit', 'Постів під час останнього відвідування'],
		newPosts: ['Количество новых постов', 'Number of new posts', 'Кількість нових постів'],
		myPostsRep: ['Ответов на ваши посты', 'Replies to your posts', 'Відповідей на ваші пости'],
		thrPage: ['Тред на @странице', 'Thread on @page', 'Тред на @сторінці'],
		goToThread: ['Перейти к треду', 'Go to the thread', 'Перейти до треду'],
		goToBoard: ['Перейти к доске', 'Go to the board', 'Перейти до дошки'],
		toggleEntries: ['Скрыть/раскрыть записи', 'Hide/expand entries', 'Сховати/розкрити записи'],

		hideLnkList: ['Скрыть/Показать список ссылок', 'Hide/Unhide list of links', 'Сховати/показати перелік посилань'],
		expandVideo: ['Развернуть/Свернуть видео', 'Expand/Collapse video', 'Розгорнути/згорнути відео'],
		prevVideo: ['Предыдущее видео', 'Previous video', 'Попереднє відео'],
		nextVideo: ['Следующее видео', 'Next video', 'Наступне відео'],
		duration: ['Продолжительность: ', 'Duration: ', 'Тривалість: '],
		published: ['опубликовано: ', 'published: ', 'опубліковано: '],
		author: ['Автор: ', 'Author: ', 'Автор: '],
		views: ['просмотров: ', 'views: ', 'переглядів: '],

		pasteImage: ['Ctrl+V - вставить картинку из буфера', 'Ctrl+V - paste an image from clipboard', 'Ctrl+V - додати зображення з буферу'],
		dropFileHere: ['Бросьте сюда файл(ы) или ссылку', 'Drop file(s) or link here', 'Киньте сюди файл(и) чи посилання'],
		youCanDrag: ['Можно перетаскивать картинки и ссылки на файлы\r\nпрямо со страницы или других сайтов', 'You can drag images and file links\r\ndirectly from the page or other sites', 'Можна перетягувати зображення чи посилання на файли\r\nбезпосередньо зі сторінки чи інших сайтів'],
		removeFile: ['Удалить файл', 'Remove file', 'Видалити файл'],
		spoilFile: ['Спойлер', 'Spoiler', 'Спойлер'],
		addManually: ['Ввести ссылку на файл вручную', 'Enter a link to the file manually', 'Ввести посилання на файл вручну'],
		enterTheLink: ["Введите ссылку и нажмите '+'", "Enter the link and click '+'", "Введіть посилання та натисніть '+'"],
		helpAddFile: ['Встроить ogg/rar/zip/7z в картинку', 'Embed ogg/rar/zip/7z into the image', 'Вбудувати ogg/rar/zip/7z в зображення'],

		expImgInline: ['[Click] открыть в посте, [Ctrl+Click] по центру', '[Click] expand in post, [Ctrl+Click] by center', '[Click] розгорнути в пості, [Ctrl+Click] в центрі'],
		expImgFull: ['[Click] открыть по центру, [Ctrl+Click] в посте', '[Click] expand by center, [Ctrl+Click] in post', '[Click] розгорнути в центрі, [Ctrl+Click] в пості'],
		nextImg: ['Следующая картинка', 'Next image', 'Наступне зображення'],
		prevImg: ['Предыдущая картинка', 'Previous image', 'Попереднє зображення'],
		autoPlayOn: ['Автоматически воспроизводить следующее видео', 'Automatically play the next video', 'Автоматично відтворювати наступне відео'],
		autoPlayOff: ['Отключить автовоспроизведение', 'Disable autoplay', 'Відключити автовідтворення'],
		downloadFile: ['Скачать содержащийся в картинке файл', 'Download embedded file from the image', 'Завантажити файл, що міститься в зображенні'],
		openOriginal: ['Открыть оригинал в новой вкладке', 'Open the original image in new tab', 'Відкрити оригінал в новій вкладці'],

		loadImage: ['Загружаются картинки', 'Loading images', 'Завантажуються зображення'],
		loadFile: ['Загружаются файлы', 'Loading files', 'Завантажуються файли'],
		cantLoad: ['Не могу загрузить', 'Canʼt load', 'Не можу завантажити'],
		willSavePview: ['Будет сохранено превью', 'Thumbnail will be saved', 'Буде збережено превʼю'],
		loadErrors: ['Во время загрузки произошли ошибки:', 'An error occurred during the loading:', 'Під час завантаження сталися помилки:'],

		succDeleted: ['Успешно удалено!', 'Succesfully deleted!', 'Успішно видалено!'],
		errDelete: ['Не могу удалить', 'Canʼt delete', 'Не можу видалити'],
		fileCorrupt: ['Файл повреждён', 'File is corrupt', 'Файл пошкоджено'],
		errCorruptData: ['Ошибка: сервер отправил повреждённые данные', 'Error: server sent corrupted data', 'Помилка: сервер надіслав пошкоджені дані'],
		noConnect: ['Ошибка подключения', 'Connection failed', 'Помилка зʼєднання'],
		thrNotFound: ['Тред недоступен', 'Thread is unavailable', 'Тред недоступний'],
		thrClosed: ['Тред закрыт', 'Thread is closed', 'Тред закрито'],
		thrArchived: ['Тред в архиве', 'Thread is archived', 'Тред заархівовано'],

		internalError: ['Внутренняя ошибка:\n', 'Internal error:\n', 'Внутрішня помилка:\n'],
		postNotFound: ['Пост не найден', 'Post not found', 'Пост не знайдено'],
		noHidThr: ['Нет скрытых тредов…', 'No hidden threads…', 'Немає схованих постів…'],
		noFavThr: ['Нет избранных тредов…', 'Favorites is empty…', 'Немає вибраних тредів…'],
		noVideoLinks: ['Нет ссылок на видео…', 'No video links…', 'Немає посилань на відео…'],
		invalidData: ['Некорректный формат данных', 'Incorrect data format', 'Некоректний формат даних'],
		noGlobalCfg: ['Глобальные настройки не найдены', 'Global config not found', 'Глобальні налаштування не знайдено'],
		subjHasTrip: ['Поле "Тема" содержит трипкод!', '"Subject" field contains a tripcode!', 'Поле "Тема" містить трипкод!'],
		errMsEdgeWebm: ['Загрузите скрипт для воспроизведения WebM (VP9/Opus)', 'Please load a script to play WebM (VP9/Opus)', 'Завантажте скрипт для відтворення WebM (VP9/Opus)'],
		errFormLoad: ['Не удаётся загрузить форму ответа', 'Can`t load the reply form', 'Не вдалося завантажити форму відповіді'],

		second: ['с', 's', 'с'],
		sizeByte: [' Байт', ' Byte', ' Байт'],
		sizeKByte: [' КБ', ' KB', ' КБ'],
		sizeMByte: [' МБ', ' MB', ' МБ'],
		sizeGByte: [' ГБ', ' GB', ' ГБ'],
		name: ['Имя', 'Name', 'Імʼя'],
		subj: ['Тема', 'Subject', 'Тема'],
		mail: ['Почта', 'Email', 'Пошта'],
		video: ['Видео', 'Video', 'Відео'],
		cap: ['Капча', 'Captcha', 'Капча'],
		add: ['Добавить', 'Add', 'Додати'],
		apply: ['Применить', 'Apply', 'Застосувати'],
		cancel: ['Отмена', 'Cancel', 'Скасувати'],
		clear: ['Очистить', 'Clear', 'Очистити'],
		refresh: ['Обновить', 'Refresh', 'Оновити'],
		save: ['Сохранить', 'Save', 'Зберегти'],
		load: ['Загрузить', 'Load', 'Завантажити'],
		edit: ['Правка', 'Edit', 'Правка'],
		file: ['Файл', 'File', 'Файл'],
		global: ['Глобальные', 'Global', 'Глобальні'],
		reset: ['Сброс', 'Reset', 'Скинути'],
		remove: ['Удалить', 'Remove', 'Видалити'],
		change: ['Сменить', 'Change', 'Змінити'],
		page: ['Страница', 'Page', 'Сторінка'],
		reply: ['Ответ', 'Reply', 'Відповідь'],
		replies: ['Ответы:', 'Replies:', 'Відповіді:'],
		makeReply: ['Ответить', 'Reply', 'Відповісти'],
		error: ['Ошибка', 'Error', 'Помилка'],
		loading: ['Загрузка…', 'Loading…', 'Завантаження…'],
		sending: ['Отправка…', 'Sending…', 'Надсилання…'],
		checking: ['Проверка…', 'Checking…', 'Перевірка…'],
		updating: ['Обновление…', 'Updating…', 'Оновлення…'],
		deleting: ['Удаление…', 'Deleting…', 'Видалення…'],
		deleted: ['удалён', 'deleted', 'видалено'],
		hide: ['Скрыть: ', 'Hide: ', 'Сховати: '],

		hidePosts: ['Скрыть посты', 'Hide posts', 'Сховати пости'],
		showPosts: ['Показать посты', 'Show posts', 'Показати пости'],
		getNewPosts: ['Получить новые посты', 'Get new posts', 'Отримати нові пости'],
		makeThr: ['Создать тред', 'Create thread', 'Створити тред'],
		collapseThr: ['Свернуть тред', 'Collapse thread', 'Згорнути тред'],
		hiddenThr: ['Скрытый тред', 'Hidden thread', 'Схований тред'],
		hideForm: ['Скрыть форму', 'Hide form', 'Сховати форму'],
		noSage: ['Без сажи', 'No sage', 'Без сажі'],
		postsOmitted: ['Пропущено ответов: ', 'Posts omitted: ', 'Пропущено відповідей: '],
		newPost: [['новый пост', 'новых поста', 'новых постов', 'Последний'], ['new post', 'new posts', 'new posts', 'Latest'], ['новий пост', 'нових пости', 'нових постів', 'Останній']]
	};


	var doc = window.document;
	var emptyFn = Function.prototype;
	var aProto = Array.prototype;
	var gitWiki = 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/';
	var gitRaw = 'https://raw.githubusercontent.com/SthephanShinkufag/Dollchan-Extension-Tools/master/';

	var $each = void 0,
	    aib = void 0,
	    Cfg = void 0,
	    docBody = void 0,
	    dTime = void 0,
	    dummy = void 0,
	    excludeList = void 0,
	    isExpImg = void 0,
	    isPreImg = void 0,
	    lang = void 0,
	    locStorage = void 0,
	    nav = void 0,
	    needScroll = void 0,
	    pByEl = void 0,
	    pByNum = void 0,
	    pr = void 0,
	    sesStorage = void 0,
	    updater = void 0;
	var quotetxt = '';
	var nativeXHRworks = true;
	var visPosts = 2;
	var topWinZ = 0;



	var $Q = function $Q(path) {
		var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : docBody;
		return root.querySelectorAll(path);
	};

	var $q = function $q(path) {
		var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : docBody;
		return root.querySelector(path);
	};

	var $id = function $id(id) {
		return doc.getElementById(id);
	};

	function $parent(el, tagName) {
		do {
			el = el.parentElement;
		} while (el && el.tagName !== tagName);
		return el;
	}


	function $before(el, node) {
		el.parentNode.insertBefore(node, el);
	}

	function $after(el, node) {
		var nextEl = el.nextSibling;
		if (nextEl) {
			el.parentNode.insertBefore(node, nextEl);
		} else {
			el.parentNode.appendChild(node);
		}
	}

	function $bBegin(sibling, html) {
		sibling.insertAdjacentHTML('beforebegin', html);
		return sibling.previousSibling;
	}

	function $aBegin(parent, html) {
		parent.insertAdjacentHTML('afterbegin', html);
		return parent.firstChild;
	}

	function $bEnd(parent, html) {
		parent.insertAdjacentHTML('beforeend', html);
		return parent.lastChild;
	}

	function $aEnd(sibling, html) {
		sibling.insertAdjacentHTML('afterend', html);
		return sibling.nextSibling;
	}

	function $replace(origEl, newEl) {
		if (typeof newEl === 'string') {
			origEl.insertAdjacentHTML('afterend', newEl);
			origEl.remove();
		} else {
			origEl.parentNode.replaceChild(newEl, origEl);
		}
	}

	function $del(el) {
		if (el) {
			el.remove();
		}
	}

	function $add(html) {
		dummy.innerHTML = html;
		return dummy.firstElementChild;
	}

	var $txt = function $txt(el) {
		return doc.createTextNode(el);
	};

	function $btn(val, ttl, fn) {
		var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'de-button';

		var el = doc.createElement('input');
		el.type = 'button';
		el.className = className;
		el.value = val;
		el.title = ttl;
		el.addEventListener('click', fn);
		return el;
	}

	function $script(text) {
		var el = doc.createElement('script');
		el.type = 'text/javascript';
		el.textContent = text;
		$del(doc.head.appendChild(el));
	}

	function $css(text) {
		if (nav.isSafari && !('flex' in docBody.style)) {
			text = text.replace(/(transform|transition|flex|align-items)/g, ' -webkit-$1');
		}
		return $bEnd(doc.head, '<style type="text/css">' + text + '</style>');
	}

	function $DOM(html) {
		var myDoc = doc.implementation.createHTMLDocument('');
		myDoc.documentElement.innerHTML = html;
		return myDoc;
	}


	function $toggle(el) {
		var needToShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : el.style.display;

		if (needToShow) {
			el.style.removeProperty('display');
		} else {
			el.style.display = 'none';
		}
	}

	function $show(el) {
		el.style.removeProperty('display');
	}

	function $hide(el) {
		el.style.display = 'none';
	}

	function $animate(el, cName) {
		var isRemove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		el.addEventListener('animationend', function aEvent() {
			el.removeEventListener('animationend', aEvent);
			if (isRemove) {
				el.remove();
			} else {
				el.classList.remove(cName);
			}
		});
		el.classList.add(cName);
	}

	function checkCSSColor(color) {
		if (!color || color === 'inherit' || color === 'currentColor') {
			return false;
		}
		if (color === 'transparent') {
			return true;
		}
		var image = doc.createElement('img');
		image.style.color = 'rgb(0, 0, 0)';
		image.style.color = color;
		if (image.style.color !== 'rgb(0, 0, 0)') {
			return true;
		}
		image.style.color = 'rgb(255, 255, 255)';
		image.style.color = color;
		return image.style.color !== 'rgb(255, 255, 255)';
	}


	var pad2 = function pad2(i) {
		return (i < 10 ? '0' : '') + i;
	};

	var arrTags = function arrTags(arr, start, end) {
		return start + arr.join(end + start) + end;
	};

	var fixBrd = function fixBrd(b) {
		return '/' + b + (b ? '/' : '');
	};

	var getAbsLink = function getAbsLink(url) {
		return url[1] === '/' ? aib.prot + url : url[0] === '/' ? aib.prot + '//' + aib.host + url : url;
	};

	var quoteReg = function quoteReg(str) {
		return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	};

	function toRegExp(str, noG) {
		var l = str.lastIndexOf('/');
		var flags = str.substr(l + 1);
		return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
	}

	function escapeHTML(html) {
		var el = doc.createElement('div');
		el.appendChild($txt(html));
		return el.innerHTML;
	}

	function toggleAttr(el, name, value, isAdd) {
		if (isAdd) {
			el.setAttribute(name, value);
		} else {
			el.removeAttribute(name);
		}
	}

	function $pd(e) {
		e.preventDefault();
	}

	function $isEmpty(obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				return false;
			}
		}
		return true;
	}

	function $txtInsert(el, txt) {
		var scrtop = el.scrollTop;
		var start = el.selectionStart;
		el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
		el.setSelectionRange(start + txt.length, start + txt.length);
		el.focus();
		el.scrollTop = scrtop;
	}

	function fixEventEl(el) {
		if (el && nav.isPresto) {
			var svg = el.correspondingUseElement;
			if (svg) {
				el = svg.ownerSVGElement;
			}
		}
		return el;
	}

	var Logger = {
		finish: function finish() {
			this._finished = true;
			this._marks.push(['LoggerFinish', Date.now()]);
		},
		getLogData: function getLogData(isFull) {
			var marks = this._marks;
			var timeLog = [];
			var duration = void 0,
			    i = 1;
			var lastExtra = 0;
			for (var len = marks.length - 1; i < len; ++i) {
				duration = marks[i][1] - marks[i - 1][1] + lastExtra;
				if (isFull || duration > 1) {
					lastExtra = 0;
					timeLog.push([marks[i][0], duration]);
				} else {
					lastExtra = duration;
				}
			}
			timeLog.push([Lng.total[lang], marks[i][1] - marks[0][1]]);
			return timeLog;
		},
		initLogger: function initLogger() {
			this._marks.push(['LoggerInit', Date.now()]);
		},
		log: function log(text) {
			if (!this._finished) {
				this._marks.push([text, Date.now()]);
			}
		},


		_finished: false,
		_marks: []
	};

	function CancelError() {}

	var CancelablePromise = function () {
		function CancelablePromise(resolver, cancelFn) {
			var _this = this;

			_classCallCheck(this, CancelablePromise);

			this._promise = new Promise(function (resolve, reject) {
				_this._reject = reject;
				resolver(function (value) {
					resolve(value);
					_this._isResolved = true;
				}, function (reason) {
					reject(reason);
					_this._isResolved = true;
				});
			});
			this._cancelFn = cancelFn;
			this._isResolved = false;
		}

		_createClass(CancelablePromise, [{
			key: 'cancelPromise',
			value: function cancelPromise() {
				this._reject(new CancelError());
				if (!this._isResolved && this._cancelFn) {
					this._cancelFn();
				}
			}
		}, {
			key: 'catch',
			value: function _catch(eb) {
				return this.then(void 0, eb);
			}
		}, {
			key: 'then',
			value: function then(cb, eb) {
				var _this2 = this;

				var children = [];
				var wrap = function wrap(fn) {
					return function () {
						var child = fn.apply(undefined, arguments);
						if (child instanceof CancelablePromise) {
							children.push(child);
						}
						return child;
					};
				};
				return new CancelablePromise(function (resolve) {
					return resolve(_this2._promise.then(cb && wrap(cb), eb && wrap(eb)));
				}, function () {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var child = _step.value;

							child.cancelPromise();
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					_this2.cancelPromise();
				});
			}
		}], [{
			key: 'reject',
			value: function reject(val) {
				return new CancelablePromise(function (res, rej) {
					return rej(val);
				});
			}
		}, {
			key: 'resolve',
			value: function resolve(val) {
				return new CancelablePromise(function (res) {
					return res(val);
				});
			}
		}]);

		return CancelablePromise;
	}();

	var Maybe = function () {
		function Maybe(Ctor ) {
			_classCallCheck(this, Maybe);

			this._ctor = Ctor;
			this.hasValue = false;
		}

		_createClass(Maybe, [{
			key: 'value',
			get: function get() {
				var Ctor = this._ctor;
				this.hasValue = !!Ctor;
				var value = Ctor ? new Ctor() : null;
				Object.defineProperty(this, 'value', { value: value });
				return value;
			}
		}]);

		return Maybe;
	}();

	var TemporaryContent = function () {
		function TemporaryContent(key) {
			_classCallCheck(this, TemporaryContent);

			var oClass = this.constructor; 
			if (oClass.purgeTO) {
				clearTimeout(oClass.purgeTO);
			}
			oClass.purgeTO = setTimeout(function () {
				return oClass.purge();
			}, oClass.purgeSecs);
			if (oClass.data) {
				var rv = oClass.data.get(key);
				if (rv) {
					return rv;
				}
			} else {
				oClass.data = new Map();
			}
			oClass.data.set(key, this);
		}

		_createClass(TemporaryContent, null, [{
			key: 'get',
			value: function get(key) {
				return this.data ? this.data.get(key) : null;
			}
		}, {
			key: 'has',
			value: function has(key) {
				return this.data ? this.data.has(key) : false;
			}
		}, {
			key: 'purge',
			value: function purge() {
				if (this.purgeTO) {
					clearTimeout(this.purgeTO);
					this.purgeTO = null;
				}
				this.data = null;
			}
		}, {
			key: 'removeTempData',
			value: function removeTempData(key) {
				if (this.data) {
					this.data.delete(key);
				}
			}
		}]);

		return TemporaryContent;
	}();

	TemporaryContent.purgeSecs = 6e4;

	var TasksPool = function () {
		function TasksPool(tasksCount, taskFunc, endFn) {
			_classCallCheck(this, TasksPool);

			this.array = [];
			this.running = 0;
			this.num = 1;
			this.func = taskFunc;
			this.endFn = endFn;
			this.max = tasksCount;
			this.completed = this.paused = this.stopped = false;
		}

		_createClass(TasksPool, [{
			key: 'completeTasks',
			value: function completeTasks() {
				if (!this.stopped) {
					if (this.array.length === 0 && this.running === 0) {
						this.endFn();
					} else {
						this.completed = true;
					}
				}
			}
		}, {
			key: 'pauseTasks',
			value: function pauseTasks() {
				this.paused = true;
			}
		}, {
			key: 'runTask',
			value: function runTask(data) {
				if (!this.stopped) {
					if (this.paused || this.running === this.max) {
						this.array.push(data);
					} else {
						this._runTask(data);
						this.running++;
					}
				}
			}
		}, {
			key: 'stopTasks',
			value: function stopTasks() {
				this.stopped = true;
				this.endFn();
			}
		}, {
			key: '_continueTasks',
			value: function _continueTasks() {
				if (!this.stopped) {
					this.paused = false;
					if (this.array.length === 0) {
						if (this.completed) {
							this.endFn();
						}
						return;
					}
					while (this.array.length !== 0 && this.running !== this.max) {
						this._runTask(this.array.shift());
						this.running++;
					}
				}
			}
		}, {
			key: '_endTask',
			value: function _endTask() {
				if (!this.stopped) {
					if (!this.paused && this.array.length !== 0) {
						this._runTask(this.array.shift());
						return;
					}
					this.running--;
					if (!this.paused && this.completed && this.running === 0) {
						this.endFn();
					}
				}
			}
		}, {
			key: '_runTask',
			value: function _runTask(data) {
				var _this3 = this;

				this.func(this.num++, data).then(function () {
					return _this3._endTask();
				}, function (err) {
					if (err instanceof TasksPool.PauseError) {
						_this3.pauseTasks();
						if (err.duration !== -1) {
							setTimeout(function () {
								return _this3._continueTasks();
							}, err.duration);
						}
					} else {
						_this3._endTask();
						throw err;
					}
				});
			}
		}]);

		return TasksPool;
	}();

	TasksPool.PauseError = function (duration) {
		this.name = 'TasksPool.PauseError';
		this.duration = duration;
	};

	var WorkerPool = function () {
		function WorkerPool(mReqs, wrkFn, errFn) {
			var _this4 = this;

			_classCallCheck(this, WorkerPool);

			if (!nav.hasWorker) {
				this.runWorker = function (data, transferObjs, fn) {
					return fn(wrkFn(data));
				};
				return;
			}
			var url = window.URL.createObjectURL(new Blob(['self.onmessage = function(e) {\n\t\t\tvar info = (' + String(wrkFn) + ')(e.data);\n\t\t\tif(info.data) {\n\t\t\t\tself.postMessage(info, [info.data]);\n\t\t\t} else {\n\t\t\t\tself.postMessage(info);\n\t\t\t}\n\t\t}'], { type: 'text/javascript' }));
			this._pool = new TasksPool(mReqs, function (num, data) {
				return _this4._createWorker(num, data);
			}, null);
			this._freeWorkers = [];
			this._url = url;
			this._errFn = errFn;
			while (mReqs--) {
				this._freeWorkers.push(new Worker(url));
			}
		}

		_createClass(WorkerPool, [{
			key: 'clearWorkers',
			value: function clearWorkers() {
				window.URL.revokeObjectURL(this._url);
				this._freeWorkers.forEach(function (w) {
					return w.terminate();
				});
				this._freeWorkers = [];
			}
		}, {
			key: 'runWorker',
			value: function runWorker(data, transferObjs, fn) {
				this._pool.runTask([data, transferObjs, fn]);
			}
		}, {
			key: '_createWorker',
			value: function _createWorker(num, data) {
				var _this5 = this;

				return new Promise(function (resolve) {
					var worker = _this5._freeWorkers.pop();

					var _data = _slicedToArray(data, 3),
					    sendData = _data[0],
					    transferObjs = _data[1],
					    fn = _data[2];

					worker.onmessage = function (e) {
						fn(e.data);
						_this5._freeWorkers.push(worker);
						resolve();
					};
					worker.onerror = function (err) {
						resolve();
						_this5._freeWorkers.push(worker);
						_this5._errFn(err);
					};
					worker.postMessage(sendData, transferObjs);
				});
			}
		}]);

		return WorkerPool;
	}();

	var TarBuilder = function () {
		function TarBuilder() {
			_classCallCheck(this, TarBuilder);

			this._data = [];
		}

		_createClass(TarBuilder, [{
			key: 'addFile',
			value: function addFile(filepath, input) {
				var i = void 0,
				    checksum = 0;
				var fileSize = input.length;
				var header = new Uint8Array(512);
				var nameLen = Math.min(filepath.length, 100);
				for (i = 0; i < nameLen; ++i) {
					header[i] = filepath.charCodeAt(i) & 0xFF;
				}
				TarBuilder._padSet(header, 100, '100777', 8); 
				TarBuilder._padSet(header, 108, '0', 8); 
				TarBuilder._padSet(header, 116, '0', 8); 
				TarBuilder._padSet(header, 124, fileSize.toString(8), 13); 
				TarBuilder._padSet(header, 136, Math.floor(Date.now() / 1e3).toString(8), 12); 
				TarBuilder._padSet(header, 148, '        ', 8); 
				header[156] = 0x30;
				for (i = 0; i < 157; ++i) {
					checksum += header[i];
				}
				TarBuilder._padSet(header, 148, checksum.toString(8), 8);
				this._data.push(header, input);
				if ((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
					this._data.push(new Uint8Array(i));
				}
			}
		}, {
			key: 'addString',
			value: function addString(filepath, str) {
				var sDat = unescape(encodeURIComponent(str));
				this.addFile(filepath, new Uint8Array(sDat.length).map(function (val, i) {
					return sDat.charCodeAt(i) & 0xFF;
				}));
			}
		}, {
			key: 'get',
			value: function get() {
				this._data.push(new Uint8Array(1024));
				return new Blob(this._data, { type: 'application/x-tar' });
			}
		}], [{
			key: '_padSet',
			value: function _padSet(data, offset, num, len) {
				var i = 0;
				var nLen = num.length;
				len -= 2;
				while (nLen < len) {
					data[offset++] = 0x20; 
					len--;
				}
				while (i < nLen) {
					data[offset++] = num.charCodeAt(i++);
				}
				data[offset] = 0x20; 
			}
		}]);

		return TarBuilder;
	}();

	var WebmParser = function () {
		function WebmParser(data) {
			_classCallCheck(this, WebmParser);

			var offset = 0;
			var dv = nav.getUnsafeDataView(data);
			var len = dv.byteLength;
			var el = new WebmParser.Element(dv, len, 0);
			var voids = [];
			var EBMLId = 0x1A45DFA3;
			var segmentId = 0x18538067;
			var voidId = 0xEC;
			this.voidId = voidId;
			error: do {
				if (el.error || el.id !== EBMLId) {
					break;
				}
				this.EBML = el;
				offset += el.headSize + el.size;
				while (true) {
					var _el = new WebmParser.Element(dv, len, offset);
					if (_el.error) {
						break error;
					}
					if (_el.id === segmentId) {
						this.segment = _el;
						break; 
					} else if (_el.id === voidId) {
						voids.push(_el);
					} else {
						break error;
					}
					offset += _el.headSize + _el.size;
				}
				this.voids = voids;
				this.data = data;
				this.length = len;
				this.rv = [null];
				this.error = false;
				return;
			} while (false);
			this.error = true;
		}

		_createClass(WebmParser, [{
			key: 'addWebmData',
			value: function addWebmData(data) {
				if (this.error || !data) {
					return this;
				}
				var size = typeof data === 'string' ? data.length : data.byteLength;
				if (size > 127) {
					this.error = true;
					return;
				}
				this.rv.push(new Uint8Array([this.voidId, 0x80 | size]), data);
				return this;
			}
		}, {
			key: 'getWebmData',
			value: function getWebmData() {
				if (this.error) {
					return null;
				}
				this.rv[0] = nav.getUnsafeUint8Array(this.data, 0, this.segment.endOffset);
				return this.rv;
			}
		}]);

		return WebmParser;
	}();

	WebmParser.Element = function (elData, dataLength, offset) {
		this.error = false;
		this.id = 0;
		if (offset + 4 >= dataLength) {
			return;
		}
		var num = elData.getUint32(offset);
		var leadZeroes = Math.clz32(num);
		if (leadZeroes > 3) {
			this.error = true;
			return;
		}
		offset += leadZeroes + 1;
		if (offset >= dataLength) {
			this.error = true;
			return;
		}
		this.id = num >>> 8 * (3 - leadZeroes);
		this.headSize = leadZeroes + 1;
		num = elData.getUint32(offset);
		leadZeroes = Math.clz32(num);
		var size = num & 0xFFFFFFFF >>> leadZeroes + 1;
		if (leadZeroes > 3) {
			var shift = 8 * (7 - leadZeroes);
			if (size >>> shift !== 0 || offset + 4 > dataLength) {
				this.error = true;
				return; 
			}
			size = size << 32 - shift | elData.getUint32(offset + 4) >>> shift;
		} else {
			size >>>= 8 * (3 - leadZeroes);
		}
		this.headSize += leadZeroes + 1;
		offset += leadZeroes + 1;
		if (offset + size > dataLength) {
			this.error = true;
			return;
		}
		this.data = elData;
		this.offset = offset;
		this.endOffset = offset + size;
		this.size = size;
	};

	function getErrorMessage(err) {
		if (err instanceof AjaxError) {
			return err.toString();
		}
		if (typeof err === 'string') {
			return err;
		}
		var stack = err.stack,
		    name = err.name,
		    message = err.message;

		return Lng.internalError[lang] + (!stack ? name + ': ' + message : nav.isWebkit ? stack : name + ': ' + message + '\n' + (!nav.isFirefox ? stack : stack.replace(/^([^@]*).*\/(.+)$/gm, function (str, fName, line) {
			return '    at ' + (fName ? fName + ' (' + line + ')' : line);
		})));
	}

	function getFormElements(form, submitter) {
		var controls, fixName, i, len, field, tagName, type, name, options, j, jlen, option, img, files, _j, _jlen, dirname;

		return regeneratorRuntime.wrap(function getFormElements$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						controls = $Q('button, input, keygen, object, select, textarea', form);

						fixName = function fixName(name) {
							return name ? name.replace(/([^\r])\n|\r([^\n])/g, '$1\r\n$2') : '';
						};

						i = 0, len = controls.length;

					case 3:
						if (!(i < len)) {
							_context.next = 65;
							break;
						}

						field = controls[i];
						tagName = field.tagName.toLowerCase();
						type = field.getAttribute('type');
						name = field.getAttribute('name');

						if (!($parent(field, 'DATALIST', form) || isFormElDisabled(field) || field !== submitter && (tagName === 'button' || tagName === 'input' && (type === 'submit' || type === 'reset' || type === 'button')) || tagName === 'input' && (type === 'checkbox' && !field.checked || type === 'radio' && !field.checked || type === 'image' && !name) || tagName === 'object')) {
							_context.next = 10;
							break;
						}

						return _context.abrupt('continue', 62);

					case 10:
						if (!(tagName === 'select')) {
							_context.next = 23;
							break;
						}

						options = $Q('select > option, select > optgrout > option', field);
						j = 0, jlen = options.length;

					case 13:
						if (!(j < jlen)) {
							_context.next = 21;
							break;
						}

						option = options[j];

						if (!(option.selected && !isFormElDisabled(option))) {
							_context.next = 18;
							break;
						}

						_context.next = 18;
						return { type: type, el: field, name: fixName(name), value: option.value };

					case 18:
						++j;
						_context.next = 13;
						break;

					case 21:
						_context.next = 51;
						break;

					case 23:
						if (!(tagName === 'input')) {
							_context.next = 51;
							break;
						}

						_context.t0 = type;
						_context.next = _context.t0 === 'image' ? 27 : _context.t0 === 'checkbox' ? 28 : _context.t0 === 'radio' ? 28 : _context.t0 === 'file' ? 31 : 51;
						break;

					case 27:
						throw new Error('input[type="image"] is not supported');

					case 28:
						_context.next = 30;
						return { type: type, el: field, name: fixName(name), value: field.value || 'on' };

					case 30:
						return _context.abrupt('continue', 62);

					case 31:
						img = void 0;

						if (!(field.files.length > 0)) {
							_context.next = 43;
							break;
						}

						files = field.files;
						_j = 0, _jlen = files.length;

					case 35:
						if (!(_j < _jlen)) {
							_context.next = 41;
							break;
						}

						_context.next = 38;
						return { name: name, type: type, el: field, value: files[_j] };

					case 38:
						++_j;
						_context.next = 35;
						break;

					case 41:
						_context.next = 50;
						break;

					case 43:
						if (!(field.obj && (img = field.obj.imgFile))) {
							_context.next = 48;
							break;
						}

						_context.next = 46;
						return {
							name: name,
							type: type,
							el: field,
							value: new File([img[0]], img[1], { type: img[2] })
						};

					case 46:
						_context.next = 50;
						break;

					case 48:
						_context.next = 50;
						return {
							el: field,
							name: fixName(name),
							type: 'application/octet-stream',
							value: new File([''], '')
						};

					case 50:
						return _context.abrupt('continue', 62);

					case 51:
						if (!(type === 'textarea')) {
							_context.next = 56;
							break;
						}

						_context.next = 54;
						return { type: type, el: field, name: name || '', value: field.value };

					case 54:
						_context.next = 58;
						break;

					case 56:
						_context.next = 58;
						return { type: type, el: field, name: fixName(name), value: field.value };

					case 58:
						dirname = field.getAttribute('dirname');

						if (!dirname) {
							_context.next = 62;
							break;
						}

						_context.next = 62;
						return {
							el: field,
							name: fixName(dirname),
							type: 'direction',
							value: nav.matchesSelector(field, ':dir(rtl)') ? 'rtl' : 'ltr'
						};

					case 62:
						++i;
						_context.next = 3;
						break;

					case 65:
					case 'end':
						return _context.stop();
				}
			}
		}, _marked, this);
	}

	function isFormElDisabled(el) {
		switch (el.tagName.toLowerCase()) {
			case 'button':
			case 'input':
			case 'select':
			case 'textarea':
				if (el.hasAttribute('disabled')) {
					return true;
				}
			default:
				if (nav.matchesSelector(el, 'fieldset[disabled] > :not(legend):not(:first-of-type) *')) {
					return true;
				}
		}
		return false;
	}

	var prettifySize = function prettifySize(val) {
		return val > 512 * 1024 * 1024 ? (val / Math.pow(1024, 3)).toFixed(2) + Lng.sizeGByte[lang] : val > 512 * 1024 ? (val / Math.pow(1024, 2)).toFixed(2) + Lng.sizeMByte[lang] : val > 512 ? (val / 1024).toFixed(2) + Lng.sizeKByte[lang] : val.toFixed(2) + Lng.sizeByte[lang];
	};

	function getFileType(url) {
		var dotIdx = url.lastIndexOf('.') + 1;
		switch (dotIdx && url.substr(dotIdx).toLowerCase()) {
			case 'jpg':
			case 'jpeg':
				return 'image/jpeg';
			case 'png':
				return 'image/png';
			case 'gif':
				return 'image/gif';
			case 'webm':
				return 'video/webm';
			case 'mp4':
				return 'video/mp4';
			case 'ogv':
				return 'video/ogv';
			default:
				return '';
		}
	}

	function downloadBlob(blob, name) {
		var url = nav.isMsEdge ? navigator.msSaveOrOpenBlob(blob, name) : window.URL.createObjectURL(blob);
		var link = $bEnd(docBody, '<a href="' + url + '" download="' + name + '"></a>');
		link.click();
		setTimeout(function () {
			window.URL.revokeObjectURL(url);
			$del(link);
		}, 2e5);
	}function setStored(id, value) {
		if (nav.isNewGM) {
			return GM.setValue(id, value);
		} else if (nav.isGM) {
			GM_setValue(id, value);
		} else if (nav.isChromeStorage) {
			var obj = { id: value };
			chrome.storage.sync.set(obj, function () {
				if (chrome.runtime.lastError) {
					chrome.storage.local.set(obj, emptyFn);
					chrome.storage.sync.remove(id, emptyFn);
				} else {
					chrome.storage.local.remove(id, emptyFn);
				}
			});
		} else if (nav.isScriptStorage) {
			scriptStorage.setItem(id, value);
		} else {
			locStorage[id] = value;
		}
	}

	function delStored(id) {
		if (nav.isNewGM) {
			return GM.deleteValue(id);
		} else if (nav.isGM) {
			GM_deleteValue(id);
		} else if (nav.isChromeStorage) {
			chrome.storage.sync.remove(id, emptyFn);
		} else if (nav.isScriptStorage) {
			scriptStorage.removeItem(id);
		} else {
			locStorage.removeItem(id);
		}
	}function saveCfgObj(dm, obj) {
		getStoredObj('DESU_Config').then(function (val) {
			if (obj) {
				val[dm] = obj;
			} else {
				delete val[dm];
			}
			setStored('DESU_Config', JSON.stringify(val));
		});
	}

	function saveCfg(id, val) {
		if (Cfg[id] !== val) {
			Cfg[id] = val;
			saveCfgObj(aib.dm, Cfg);
		}
	}

	function toggleCfg(id) {
		saveCfg(id, +!Cfg[id]);
	}

	function readData() {
		return Promise.all([getStored('DESU_Exclude'), readFavorites(), readCfg()]);
	}function readPostsData(firstPost, favObj) {
		var sVis = null;
		try {
			var str = aib.t ? sesStorage['de-hidden-' + aib.b + aib.t] : null;
			if (str) {
				var json = JSON.parse(str);
				if (json.hash === (Cfg.hideBySpell ? Spells.hash : 0) && pByNum.has(json.lastNum) && pByNum.get(json.lastNum).count === json.lastCount) {
					sVis = json.data && json.data[0] instanceof Array ? json.data : null;
				}
			}
		} catch (err) {
			sesStorage['de-hidden-' + aib.b + aib.t] = null;
		}
		if (!firstPost) {
			return;
		}
		var updateFav = false;
		var favBrd = aib.host in favObj && aib.b in favObj[aib.host] ? favObj[aib.host][aib.b] : {};
		var spellsHide = Cfg.hideBySpell;
		var maybeSpells = new Maybe(SpellsRunner);

		for (var post = firstPost; post; post = post.next) {
			var _post = post,
			    num = _post.num;

			if (post.isOp && num in favBrd) {
				var f = favBrd[num];
				var _post2 = post,
				    thr = _post2.thr;

				post.toggleFavBtn(true);
				post.thr.isFav = true;
				if (aib.t) {
					f.cnt = thr.pcount;
					f.new = f.you = 0;
					if (Cfg.markNewPosts && f.last) {
						var lastPost = pByNum.get(+f.last.match(/\d+/));
						if (lastPost) {
							while (lastPost = lastPost.next) {
								Post.addMark(lastPost.el, true);
							}
						}
					}
					f.last = aib.anchor + thr.last.num;
				} else {
					f.new = thr.pcount - f.cnt;
				}
				updateFav = true;
			}
			if (HiddenPosts.has(num)) {
				var uHideData = HiddenPosts.get(num);
				if (!uHideData && post.isOp && HiddenThreads.has(num)) {
					post.setUserVisib(true);
				} else {
					post.setUserVisib(!!uHideData, false);
				}
				continue;
			}
			var hideData = void 0;
			if (post.isOp) {
				if (HiddenThreads.has(num)) {
					hideData = [true, null];
				} else if (spellsHide) {
					hideData = sVis && sVis[post.count];
				}
			} else if (spellsHide) {
				hideData = sVis && sVis[post.count];
			} else {
				continue;
			}
			if (!hideData) {
				maybeSpells.value.runSpells(post); 
			} else if (hideData[0]) {
				if (post.isHidden) {
					post.spellHidden = true;
				} else {
					post.spellHide(hideData[1]);
				}
			}
		}
		if (maybeSpells.hasValue) {
			maybeSpells.value.endSpells();
		}
		if (Cfg.panelCounter === 2) {
			$id('de-panel-info-pcount').textContent = Thread.first.pcount - Thread.first.hidCounter;
		}
		if (updateFav) {
			saveFavorites(favObj);
		}
		if (sesStorage['de-fav-win'] === '1') {
			toggleWindow('fav', false, null, true);
			sesStorage.removeItem('de-fav-win');
		}
		var thrData = sesStorage['de-fav-newthr'];
		if (thrData) {
			thrData = JSON.parse(thrData);
			if (thrData.num) {
				if (thrData.num === firstPost.num) {
					firstPost.thr.toggleFavState(true);
					sesStorage.removeItem('de-fav-newthr');
				}
			} else if (Date.now() - thrData.date > 2e4) {
				sesStorage.removeItem('de-fav-newthr');
			} else if (!firstPost.next) {
				firstPost.thr.toggleFavState(true);
				sesStorage.removeItem('de-fav-newthr');
			}
		}
	}

	function readFavorites() {
		return getStoredObj('DESU_Favorites');
	}

	function saveFavorites(data) {
		setStored('DESU_Favorites', JSON.stringify(data));
	}

	function readViewedPosts() {
		if (!Cfg.markViewed) {
			return;
		}
		var data = sesStorage['de-viewed'];
		if (data) {
			data.split(',').forEach(function (pNum) {
				var post = pByNum.get(+pNum);
				if (post) {
					post.el.classList.add('de-viewed');
					post.isViewed = true;
				}
			});
		}
	}


	var PostsStorage = function () {
		function PostsStorage() {
			_classCallCheck(this, PostsStorage);

			this.storageName = '';
			this.__cachedTime = null;
			this._cachedStorage = null;
			this._cacheTO = null;
		}

		_createClass(PostsStorage, [{
			key: 'get',
			value: function get(num) {
				var storage = this._readStorage()[aib.b];
				if (storage) {
					var val = storage[num];
					return val ? val[2] : null;
				}
				return null;
			}
		}, {
			key: 'has',
			value: function has(num) {
				var storage = this._readStorage()[aib.b];
				return storage ? storage.hasOwnProperty(num) : false;
			}
		}, {
			key: 'purge',
			value: function purge() {
				this._cacheTO = this.__cachedTime = this._cachedStorage = null;
			}
		}, {
			key: 'removeStorage',
			value: function removeStorage(num) {
				var board = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : aib.b;

				var storage = this._readStorage();
				var bStorage = storage[board];
				if (bStorage && bStorage.hasOwnProperty(num)) {
					delete bStorage[num];
					if ($isEmpty(bStorage)) {
						delete storage[board];
					}
					this._saveStorage();
				}
			}
		}, {
			key: 'set',
			value: function set(num, thrNum) {
				var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				var storage = this._readStorage();
				if (storage && storage.$count > 5e3) {
					var minDate = Date.now() - 5 * 24 * 3600 * 1e3;
					for (var b in storage) {
						if (storage.hasOwnProperty(b)) {
							var _data2 = storage[b];
							for (var key in _data2) {
								if (_data2.hasOwnProperty(key) && _data2[key][0] < minDate) {
									delete _data2[key];
								}
							}
						}
					}
				}
				(storage[aib.b] || (storage[aib.b] = {}))[num] = [this._cachedTime, thrNum, data];
				this._saveStorage();
			}
		}, {
			key: '_readStorage',
			value: function _readStorage() {
				if (this._cachedStorage) {
					return this._cachedStorage;
				}
				var data = locStorage[this.storageName];
				if (data) {
					try {
						return this._cachedStorage = JSON.parse(data);
					} catch (err) {}
				}
				return this._cachedStorage = {};
			}
		}, {
			key: '_saveStorage',
			value: function _saveStorage() {
				var _this6 = this;

				if (this._cacheTO === null) {
					this._cacheTO = setTimeout(function () {
						if (_this6._cachedStorage) {
							locStorage[_this6.storageName] = JSON.stringify(_this6._cachedStorage);
						}
						_this6.purge();
					}, 0);
				}
			}
		}, {
			key: '_cachedTime',
			get: function get() {
				return this.__cachedTime || (this.__cachedTime = Date.now());
			}
		}], [{
			key: '_migrateOld',
			value: function _migrateOld(newName, oldName) {
				if (locStorage.hasOwnProperty(oldName)) {
					locStorage[newName] = locStorage[oldName];
					locStorage.removeItem(oldName);
				}
			}
		}]);

		return PostsStorage;
	}();

	var HiddenPosts = new (function (_PostsStorage) {
		_inherits(HiddenPostsClass, _PostsStorage);

		function HiddenPostsClass() {
			_classCallCheck(this, HiddenPostsClass);

			var _this7 = _possibleConstructorReturn(this, (HiddenPostsClass.__proto__ || Object.getPrototypeOf(HiddenPostsClass)).call(this));

			_this7.storageName = 'de-posts';
			return _this7;
		}

		_createClass(HiddenPostsClass, [{
			key: '_readStorage',
			value: function _readStorage() {
				PostsStorage._migrateOld(this.storageName, 'de-threads-new'); 
				return _get(HiddenPostsClass.prototype.__proto__ || Object.getPrototypeOf(HiddenPostsClass.prototype), '_readStorage', this).call(this);
			}
		}]);

		return HiddenPostsClass;
	}(PostsStorage))();

	var HiddenThreads = new (function (_PostsStorage2) {
		_inherits(HiddenThreadsClass, _PostsStorage2);

		function HiddenThreadsClass() {
			_classCallCheck(this, HiddenThreadsClass);

			var _this8 = _possibleConstructorReturn(this, (HiddenThreadsClass.__proto__ || Object.getPrototypeOf(HiddenThreadsClass)).call(this));

			_this8.storageName = 'de-threads';
			return _this8;
		}

		_createClass(HiddenThreadsClass, [{
			key: 'getCount',
			value: function getCount() {
				var storage = this._readStorage();
				var rv = 0;
				for (var b in storage) {
					rv += Object.keys(storage[b]).length;
				}
				return rv;
			}
		}, {
			key: 'getRawData',
			value: function getRawData() {
				return this._readStorage();
			}
		}, {
			key: 'saveRawData',
			value: function saveRawData(data) {
				locStorage[this.storageName] = JSON.stringify(data);
				this.purge();
			}
		}, {
			key: '_readStorage',
			value: function _readStorage() {
				PostsStorage._migrateOld(this.storageName, ''); 
				return _get(HiddenThreadsClass.prototype.__proto__ || Object.getPrototypeOf(HiddenThreadsClass.prototype), '_readStorage', this).call(this);
			}
		}]);

		return HiddenThreadsClass;
	}(PostsStorage))();

	var MyPosts = new (function (_PostsStorage3) {
		_inherits(MyPostsClass, _PostsStorage3);

		function MyPostsClass() {
			_classCallCheck(this, MyPostsClass);

			var _this9 = _possibleConstructorReturn(this, (MyPostsClass.__proto__ || Object.getPrototypeOf(MyPostsClass)).call(this));

			_this9.storageName = 'de-myposts';
			_this9._cachedData = null;
			return _this9;
		}

		_createClass(MyPostsClass, [{
			key: 'has',
			value: function has(num) {
				return this._cachedData.has(num);
			}
		}, {
			key: 'purge',
			value: function purge() {
				_get(MyPostsClass.prototype.__proto__ || Object.getPrototypeOf(MyPostsClass.prototype), 'purge', this).call(this);
				this._cachedData = null;
				this._readStorage();
			}
		}, {
			key: 'readStorage',
			value: function readStorage() {
				this._readStorage();
			}
		}, {
			key: 'set',
			value: function set(num, thrNum) {
				_get(MyPostsClass.prototype.__proto__ || Object.getPrototypeOf(MyPostsClass.prototype), 'set', this).call(this, num, thrNum);
				this._cachedData.add(+num);
				sendStorageEvent('__de-mypost', 1);
			}
		}, {
			key: '_readStorage',
			value: function _readStorage() {
				if (this._cachedData && this._cachedStorage) {
					return this._cachedStorage;
				}
				PostsStorage._migrateOld(this.storageName, 'de-myposts-new');
				var rv = _get(MyPostsClass.prototype.__proto__ || Object.getPrototypeOf(MyPostsClass.prototype), '_readStorage', this).call(this);
				this._cachedData = rv[aib.b] ? new Set(Object.keys(rv[aib.b]).map(function (val) {
					return +val;
				})) : new Set();
				return rv;
			}
		}]);

		return MyPostsClass;
	}(PostsStorage))();

	function sendStorageEvent(name, value) {
		locStorage[name] = typeof value === 'string' ? value : JSON.stringify(value);
		locStorage.removeItem(name);
	}

	function initStorageEvent() {
		doc.defaultView.addEventListener('storage', function (e) {
			var data = void 0,
			    temp = void 0,
			    val = e.newValue;
			if (!val) {
				return;
			}
			switch (e.key) {
				case '__de-favorites':
					{
						try {
							data = JSON.parse(val);
						} catch (err) {
							return;
						}
						updateFavWindow.apply(undefined, _toConsumableArray(data));
						return;
					}
				case '__de-mypost':
					MyPosts.purge();return;
				case '__de-webmvolume':
					val = +val || 0;
					Cfg.webmVolume = val;
					temp = $q('input[info="webmVolume"]');
					if (temp) {
						temp.value = val;
					}
					return;
				case '__de-post':
					(function () {
						try {
							data = JSON.parse(val);
						} catch (err) {
							return;
						}
						HiddenThreads.purge();
						HiddenPosts.purge();
						if (data.brd === aib.b) {
							var post = pByNum.get(data.num);
							if (post && post.isHidden ^ data.hide) {
								post.setUserVisib(data.hide, false);
							} else if (post = pByNum.get(data.thrNum)) {
								post.thr.userTouched.set(data.num, data.hide);
							}
						}
						toggleWindow('hid', true);
					})();
					return;
				case 'de-threads':
					HiddenThreads.purge();
					Thread.first.updateHidden(HiddenThreads.getRawData()[aib.b]);
					toggleWindow('hid', true);
					return;
				case '__de-spells':
					(function () {
						try {
							data = JSON.parse(val);
						} catch (err) {
							return;
						}
						Cfg.hideBySpell = +data.hide;
						temp = $q('input[info="hideBySpell"]');
						if (temp) {
							temp.checked = data.hide;
						}
						$hide(docBody);
						if (data.data) {
							Spells.setSpells(data.data, false);
							Cfg.spells = JSON.stringify(data.data);
							temp = $id('de-spell-txt');
							if (temp) {
								temp.value = Spells.list;
							}
						} else {
							SpellsRunner.unhideAll();
							Spells.disableSpells();
							temp = $id('de-spell-txt');
							if (temp) {
								temp.value = '';
							}
						}
						$show(docBody);
					})();
			}
		});
	}


	var Panel = Object.create({
		isVidEnabled: false,
		initPanel: function initPanel(formEl) {
			var imgLen = $Q(aib.qPostImg, formEl).length;
			var isThr = aib.t;
			(pr && pr.pArea[0] || formEl).insertAdjacentHTML('beforebegin', '<div id="de-main">\n\t\t\t<div id="de-panel">\n\t\t\t\t<div id="de-panel-logo" title="' + Lng.panelBtn.attach[lang] + '">\n\t\t\t\t\t<svg class="de-panel-logo-svg">\n\t\t\t\t\t\t<use xlink:href="#de-symbol-panel-logo"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<span id="de-panel-buttons"' + (!Cfg.expandPanel ? ' style="display: none;"' : '') + '>\n\t\t\t\t' + (Cfg.disabled ? this._getButton('enable') : this._getButton('cfg') + this._getButton('hid') + this._getButton('fav') + (Cfg.addYouTube ? this._getButton('vid') : '') + (!localData ? this._getButton('refresh') + (isThr || aib.page !== aib.firstPage ? this._getButton('goback') : '') + (!isThr && aib.page !== aib.lastPage ? this._getButton('gonext') : '') : '') + this._getButton('goup') + this._getButton('godown') + (imgLen ? this._getButton('expimg') + this._getButton('maskimg') : '') + (!localData && !nav.isPresto ? (imgLen && !Cfg.preLoadImgs ? this._getButton('preimg') : '') + (isThr ? this._getButton('savethr') : '') : '') + (!localData && isThr ? this._getButton(Cfg.ajaxUpdThr && !aib.isArchived ? 'upd-on' : 'upd-off') + (!nav.isSafari ? this._getButton('audio-off') : '') : '') + (aib.hasCatalog ? this._getButton('catalog') : '') + this._getButton('enable') + (isThr ? '<span id="de-panel-info">\n\t\t\t\t\t\t<span id="de-panel-info-pcount" title="' + (Lng.panelBtn[Cfg.panelCounter !== 2 ? 'pcount' : 'pcountNotHid'][lang] + '">') + (Thread.first.pcount + '</span>\n\t\t\t\t\t\t<span id="de-panel-info-icount" title="' + Lng.panelBtn.imglen[lang] + '">\n\t\t\t\t\t\t\t' + imgLen + '</span>\n\t\t\t\t\t\t<span id="de-panel-info-acount" title="' + Lng.panelBtn.posters[lang] + '"></span>\n\t\t\t\t\t</span>') : '')) + '\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t' + (Cfg.disabled ? '' : '<div id="de-wrapper-popup"></div><hr style="clear: both;">') + '\n\t\t</div>');
			this._el = $id('de-panel');
			this._el.addEventListener('click', this, true);
			this._el.addEventListener('mouseover', this);
			this._el.addEventListener('mouseout', this);
			this._buttons = $id('de-panel-buttons');
			this.isNew = true;
		},
		removeMain: function removeMain() {
			this._el.removeEventListener('click', this, true);
			this._el.removeEventListener('mouseover', this);
			this._el.removeEventListener('mouseout', this);
			delete this._pcountEl;
			delete this._icountEl;
			delete this._acountEl;
			$del($id('de-main'));
		},
		handleEvent: function handleEvent(e) {
			var _this10 = this;

			if ('isTrusted' in e && !e.isTrusted) {
				return;
			}
			var el = fixEventEl(e.target);
			if (el.tagName.toLowerCase() === 'svg') {
				el = el.parentNode;
			}
			switch (e.type) {
				case 'click':
					switch (el.id) {
						case 'de-panel-logo':
							if (Cfg.expandPanel && !$q('.de-win-active')) {
								$hide(this._buttons);
							}
							toggleCfg('expandPanel');
							return;
						case 'de-panel-cfg':
							toggleWindow('cfg', false);break;
						case 'de-panel-hid':
							toggleWindow('hid', false);break;
						case 'de-panel-fav':
							toggleWindow('fav', false);break;
						case 'de-panel-vid':
							toggleWindow('vid', false);
							this.isVidEnabled = !this.isVidEnabled;
							break;
						case 'de-panel-refresh':
							window.location.reload();break;
						case 'de-panel-goup':
							scrollTo(0, 0);break;
						case 'de-panel-godown':
							scrollTo(0, docBody.scrollHeight || docBody.offsetHeight);break;
						case 'de-panel-expimg':
							isExpImg = !isExpImg;
							$del($q('.de-fullimg-center'));
							for (var post = Thread.first.op; post; post = post.next) {
								post.toggleImages(isExpImg, false);
							}
							break;
						case 'de-panel-preimg':
							isPreImg = !isPreImg;
							if (!e.ctrlKey) {
								var _iteratorNormalCompletion2 = true;
								var _didIteratorError2 = false;
								var _iteratorError2 = undefined;

								try {
									for (var _iterator2 = DelForm[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
										var _ref4 = _step2.value;
										var _el2 = _ref4.el;

										ContentLoader.preloadImages(_el2);
									}
								} catch (err) {
									_didIteratorError2 = true;
									_iteratorError2 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion2 && _iterator2.return) {
											_iterator2.return();
										}
									} finally {
										if (_didIteratorError2) {
											throw _iteratorError2;
										}
									}
								}
							}
							break;
						case 'de-panel-maskimg':
							toggleCfg('maskImgs');
							updateCSS();
							break;
						case 'de-panel-upd-on':
						case 'de-panel-upd-warn':
						case 'de-panel-upd-off':
							updater.toggle();
							break;
						case 'de-panel-audio-on':
						case 'de-panel-audio-off':
							if (updater.toggleAudio(0)) {
								updater.enableUpdater();
								el.id = 'de-panel-audio-on';
							} else {
								el.id = 'de-panel-audio-off';
							}
							$del($q('.de-menu'));
							break;
						case 'de-panel-savethr':
							break;
						case 'de-panel-enable':
							toggleCfg('disabled');
							window.location.reload();
							break;
						default:
							return;
					}
					$pd(e);
					return;
				case 'mouseover':
					if (!Cfg.expandPanel) {
						clearTimeout(this._hideTO);
						$show(this._buttons);
					}
					switch (el.id) {
						case 'de-panel-cfg':
							KeyEditListener.setTitle(el, 10);break;
						case 'de-panel-hid':
							KeyEditListener.setTitle(el, 7);break;
						case 'de-panel-fav':
							KeyEditListener.setTitle(el, 6);break;
						case 'de-panel-vid':
							KeyEditListener.setTitle(el, 18);break;
						case 'de-panel-goback':
							KeyEditListener.setTitle(el, 4);break;
						case 'de-panel-gonext':
							KeyEditListener.setTitle(el, 17);break;
						case 'de-panel-maskimg':
							KeyEditListener.setTitle(el, 9);break;
						case 'de-panel-refresh':
							if (aib.t) {
								return;
							}
						case 'de-panel-savethr':
						case 'de-panel-audio-off':
							if (this._menu && this._menu.parentEl === el) {
								return;
							}
							this._menuTO = setTimeout(function () {
								_this10._menu = addMenu(el);
								_this10._menu.onover = function () {
									return clearTimeout(_this10._hideTO);
								};
								_this10._menu.onout = function () {
									return _this10._prepareToHide(null);
								};
								_this10._menu.onremove = function () {
									return _this10._menu = null;
								};
							}, Cfg.linksOver);
					}
					return;
				default:
					this._prepareToHide(fixEventEl(e.relatedTarget));
					switch (el.id) {
						case 'de-panel-refresh':
						case 'de-panel-savethr':
						case 'de-panel-audio-off':
							clearTimeout(this._menuTO);
							this._menuTO = 0;
					}
			}
		},
		updateCounter: function updateCounter(postCount, imgsCount, postersCount) {
			this._pcountEl.textContent = postCount;
			this._icountEl.textContent = imgsCount;
			this._acountEl.textContent = postersCount;
			this.isNew = false;
		},


		_el: null,
		_hideTO: 0,
		_menu: null,
		_menuTO: 0,
		get _acountEl() {
			var value = $id('de-panel-info-acount');
			Object.defineProperty(this, '_acountEl', { value: value, configurable: true });
			return value;
		},
		get _icountEl() {
			var value = $id('de-panel-info-icount');
			Object.defineProperty(this, '_icountEl', { value: value, configurable: true });
			return value;
		},
		get _pcountEl() {
			var value = $id('de-panel-info-pcount');
			Object.defineProperty(this, '_pcountEl', { value: value, configurable: true });
			return value;
		},
		_getButton: function _getButton(id) {
			var page = void 0,
			    href = void 0,
			    title = void 0,
			    useId = void 0;
			switch (id) {
				case 'goback':
					page = Math.max(aib.page - 1, 0);
					href = aib.getPageUrl(aib.b, page);
					if (!aib.t) {
						title = Lng.panelBtn.gonext[lang].replace('%s', page);
					}
					useId = 'arrow';
					break;
				case 'gonext':
					page = aib.page + 1;
					href = aib.getPageUrl(aib.b, page);
					title = Lng.panelBtn.gonext[lang].replace('%s', page);
				case 'goup':
				case 'godown':
					useId = 'arrow';
					break;
				case 'upd-on':
				case 'upd-off':
					useId = 'upd';
					break;
				case 'catalog':
					href = aib.catalogUrl;
			}
			return '<a id="de-panel-' + id + '" class="de-abtn de-panel-button" title="' + (title || Lng.panelBtn[id][lang]) + '" href="' + (href || '#') + '">\n\t\t\t<svg class="de-panel-svg">\n\t\t\t' + (id !== 'audio-off' ? '\n\t\t\t\t<use xlink:href="#de-symbol-panel-' + (useId || id) + '"/>' : '\n\t\t\t\t<use class="de-use-audio-off" xlink:href="#de-symbol-panel-audio-off"/>\n\t\t\t\t<use class="de-use-audio-on" xlink:href="#de-symbol-panel-audio-on"/>') + '\n\t\t\t</svg>\n\t\t</a>';
		},
		_prepareToHide: function _prepareToHide(rt) {
			var _this11 = this;

			if (!Cfg.expandPanel && !$q('.de-win-active') && (!rt || !this._el.contains(rt.farthestViewportElement || rt))) {
				this._hideTO = setTimeout(function () {
					return $hide(_this11._buttons);
				}, 500);
			}
		}
	});


	function updateWinZ(style) {
		if (style.zIndex < topWinZ) {
			style.zIndex = ++topWinZ;
		}
	}

	function makeDraggable(name, win, head) {
		head.addEventListener('mousedown', {
			_oldX: 0,
			_oldY: 0,
			_win: win,
			_wStyle: win.style,
			_X: 0,
			_Y: 0,
			_Z: 0,
			handleEvent: function handleEvent(e) {
				if (!Cfg[name + 'WinDrag']) {
					return;
				}
				var curX = e.clientX,
				    curY = e.clientY;

				switch (e.type) {
					case 'mousedown':
						this._oldX = curX;
						this._oldY = curY;
						this._X = Cfg[name + 'WinX'];
						this._Y = Cfg[name + 'WinY'];
						if (this._Z < topWinZ) {
							this._Z = this._wStyle.zIndex = ++topWinZ;
						}
						docBody.addEventListener('mouseleave', this);
						docBody.addEventListener('mousemove', this);
						docBody.addEventListener('mouseup', this);
						$pd(e);
						return;
					case 'mousemove':
						{
							var maxX = Post.sizing.wWidth - this._win.offsetWidth;
							var maxY = Post.sizing.wHeight - this._win.offsetHeight - 25;
							var cr = this._win.getBoundingClientRect();
							var x = cr.left + curX - this._oldX;
							var y = cr.top + curY - this._oldY;
							this._X = x >= maxX || curX > this._oldX && x > maxX - 20 ? 'right: 0' : x < 0 || curX < this._oldX && x < 20 ? 'left: 0' : 'left: ' + x + 'px';
							this._Y = y >= maxY || curY > this._oldY && y > maxY - 20 ? 'bottom: 25px' : y < 0 || curY < this._oldY && y < 20 ? 'top: 0' : 'top: ' + y + 'px';
							var width = this._wStyle.width;

							this._win.setAttribute('style', this._X + '; ' + this._Y + '; z-index: ' + this._Z + (width ? '; width: ' + width : ''));
							this._oldX = curX;
							this._oldY = curY;
							return;
						}
					case 'mouseleave':
					case 'mouseup':
						docBody.removeEventListener('mouseleave', this);
						docBody.removeEventListener('mousemove', this);
						docBody.removeEventListener('mouseup', this);
						saveCfg(name + 'WinX', this._X);
						saveCfg(name + 'WinY', this._Y);
				}
			}
		});
	}

	var WinResizer = function () {
		function WinResizer(name, dir, cfgName, win, target) {
			_classCallCheck(this, WinResizer);

			this.name = name;
			this.dir = dir;
			this.cfgName = cfgName;
			this.vertical = dir === 'top' || dir === 'bottom';
			this.win = win;
			this.wStyle = this.win.style;
			this.tStyle = target.style;
			$q('.de-resizer-' + dir, win).addEventListener('mousedown', this);
		}

		_createClass(WinResizer, [{
			key: 'handleEvent',
			value: function handleEvent(e) {
				var val = void 0,
				    x = void 0,
				    y = void 0;
				var _Post$sizing = Post.sizing,
				    maxX = _Post$sizing.wWidth,
				    maxY = _Post$sizing.wHeight;
				var width = this.wStyle.width;

				var cr = this.win.getBoundingClientRect();
				var z = '; z-index: ' + this.wStyle.zIndex + (width ? '; width:' + width : '');
				switch (e.type) {
					case 'mousedown':
						if (this.win.classList.contains('de-win-fixed')) {
							x = 'right: 0';
							y = 'bottom: 25px';
						} else {
							x = Cfg[this.name + 'WinX'];
							y = Cfg[this.name + 'WinY'];
						}
						switch (this.dir) {
							case 'top':
								val = x + '; bottom: ' + (maxY - cr.bottom) + 'px' + z;break;
							case 'bottom':
								val = x + '; top: ' + cr.top + 'px' + z;break;
							case 'left':
								val = 'right: ' + (maxX - cr.right) + 'px; ' + (y + z);break;
							case 'right':
								val = 'left: ' + cr.left + 'px; ' + (y + z);
						}
						this.win.setAttribute('style', val);
						docBody.addEventListener('mousemove', this);
						docBody.addEventListener('mouseup', this);
						$pd(e);
						return;
					case 'mousemove':
						if (this.vertical) {
							val = e.clientY;
							this.tStyle.setProperty('height', Math.max(parseInt(this.tStyle.height, 10) + (this.dir === 'top' ? cr.top - (val < 20 ? 0 : val) : (val > maxY - 45 ? maxY - 25 : val) - cr.bottom), 90) + 'px', 'important');
						} else {
							val = e.clientX;
							this.tStyle.setProperty('width', Math.max(parseInt(this.tStyle.width, 10) + (this.dir === 'left' ? cr.left - (val < 20 ? 0 : val) : (val > maxX - 20 ? maxX : val) - cr.right), this.name === 'reply' ? 275 : 400) + 'px', 'important');
						}
						return;
					default:
						docBody.removeEventListener('mousemove', this);
						docBody.removeEventListener('mouseup', this);
						saveCfg(this.cfgName, parseInt(this.vertical ? this.tStyle.height : this.tStyle.width, 10));
						if (this.win.classList.contains('de-win-fixed')) {
							this.win.setAttribute('style', 'right: 0; bottom: 25px' + z);
							return;
						}
						if (this.vertical) {
							saveCfg(this.name + 'WinY', cr.top < 1 ? 'top: 0' : cr.bottom > maxY - 26 ? 'bottom: 25px' : 'top: ' + cr.top + 'px');
						} else {
							saveCfg(this.name + 'WinX', cr.left < 1 ? 'left: 0' : cr.right > maxX - 1 ? 'right: 0' : 'left: ' + cr.left + 'px');
						}
						this.win.setAttribute('style', Cfg[this.name + 'WinX'] + '; ' + Cfg[this.name + 'WinY'] + z);
				}
			}
		}]);

		return WinResizer;
	}();

	function toggleWindow(name, isUpd, data, noAnim) {
		var el = void 0,
		    win = $id('de-win-' + name);
		var isActive = win && win.classList.contains('de-win-active');
		if (isUpd && !isActive) {
			return;
		}
		if (!win) {
			var winAttr = (Cfg[name + 'WinDrag'] ? 'de-win" style="' + Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] : 'de-win-fixed" style="right: 0; bottom: 25px') + (name !== 'fav' ? '' : '; width: ' + Cfg.favWinWidth + 'px; ');
			win = $aBegin($id('de-main'), '<div id="de-win-' + name + '" class="' + winAttr + '; display: none;">\n\t\t\t<div class="de-win-head">\n\t\t\t\t<span class="de-win-title">\n\t\t\t\t\t' + (name === 'cfg' ? 'Dollchan Extension Tools' : Lng.panelBtn[name][lang]) + '\n\t\t\t\t</span>\n\t\t\t\t<span class="de-win-buttons">\n\t\t\t\t\t<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>\n\t\t\t\t\t<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class="de-win-body"></div>\n\t\t\t' + (name !== 'fav' ? '' : '\n\t\t\t\t<div class="de-resizer de-resizer-left"></div>\n\t\t\t\t<div class="de-resizer de-resizer-right"></div>') + '\n\t\t</div>');
			setTimeout(function () {
				var el = $q('.de-win-body', win);
				if (name === 'cfg') {
					el.className = 'de-win-body ' + aib.cReply;
				} else {
					var backColor = getComputedStyle(docBody).getPropertyValue('background-color');
					el.style.backgroundColor = backColor !== 'transparent' ? backColor : '#EEE';
				}
			}, 0);
			if (name === 'fav') {
				new WinResizer('fav', 'left', 'favWinWidth', win, win);
				new WinResizer('fav', 'right', 'favWinWidth', win, win);
			}
			el = $q('.de-win-buttons', win);
			el.onmouseover = function (_ref5) {
				var target = _ref5.target;

				var el = target.parentNode;
				switch (fixEventEl(target).classList[0]) {
					case 'de-btn-close':
						el.title = Lng.closeWindow[lang];break;
					case 'de-btn-toggle':
						el.title = Cfg[name + 'WinDrag'] ? Lng.toPanel[lang] : Lng.makeDrag[lang];
				}
			};
			el.lastElementChild.onclick = function () {
				return toggleWindow(name, false);
			};
			el.firstElementChild.onclick = function () {
				toggleCfg(name + 'WinDrag');
				var isDrag = Cfg[name + 'WinDrag'];
				if (!isDrag) {
					var temp = $q('.de-win-active.de-win-fixed', win.parentNode);
					if (temp) {
						toggleWindow(temp.id.substr(7), false);
					}
				}
				win.classList.toggle('de-win', isDrag);
				win.classList.toggle('de-win-fixed', !isDrag);
				var width = win.style.width;

				win.style.cssText = '' + (isDrag ? Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] : 'right: 0; bottom: 25px') + (width ? '; width: ' + width : '');
				updateWinZ(win.style);
			};
			makeDraggable(name, win, $q('.de-win-head', win));
		}
		updateWinZ(win.style);
		var isRemove = !isUpd && isActive;
		if (!isRemove && !win.classList.contains('de-win') && (el = $q('.de-win-active.de-win-fixed:not(#de-win-' + name + ')', win.parentNode))) {
			toggleWindow(el.id.substr(7), false);
		}
		var isAnim = !noAnim && !isUpd && Cfg.animation;
		var body = $q('.de-win-body', win);
		if (isAnim && body.hasChildNodes()) {
			win.addEventListener('animationend', function aEvent(e) {
				e.target.removeEventListener('animationend', aEvent);
				showWindow(win, body, name, isRemove, data, Cfg.animation);
				win = body = name = isRemove = data = null;
			});
			win.classList.remove('de-win-open');
			win.classList.add('de-win-close');
		} else {
			showWindow(win, body, name, isRemove, data, isAnim);
		}
	}

	function showWindow(win, body, name, isRemove, data, isAnim) {
		body.innerHTML = '';
		win.classList.toggle('de-win-active', !isRemove);
		if (isRemove) {
			win.classList.remove('de-win-close');
			$hide(win);
			if (!Cfg.expandPanel && !$q('.de-win-active')) {
				$hide($id('de-panel-buttons'));
			}
			return;
		}
		if (!Cfg.expandPanel) {
			$show($id('de-panel-buttons'));
		}
		switch (name) {
			case 'fav':
				if (data) {
					showFavoritesWindow(body, data);
					break;
				}
				readFavorites().then(function (favObj) {
					showFavoritesWindow(body, favObj);
					$show(win);
					if (isAnim) {
						win.classList.add('de-win-open');
					}
				});
				return;
			case 'cfg':
				CfgWindow.initCfgWindow(body);break;
			case 'hid':
				showHiddenWindow(body);break;
			case 'vid':
				showVideosWindow(body);
		}
		$show(win);
		if (isAnim) {
			win.classList.add('de-win-open');
		}
	}


	function showVideosWindow(body) {
		var els = $Q('.de-video-link');
		if (!els.length) {
			body.innerHTML = '<b>' + Lng.noVideoLinks[lang] + '</b>';
			return;
		}
		if (!$id('de-ytube-api')) {
			var _script = doc.createElement('script');
			_script.type = 'text/javascript';
			_script.src = aib.prot + '//www.youtube.com/player_api';
			doc.head.appendChild(_script).id = 'de-ytube-api';
		}
		body.innerHTML = '<div de-disableautoplay class="de-video-obj"></div>\n\t<div id="de-video-buttons">\n\t\t<a class="de-abtn" id="de-video-btn-prev" href="#" title="' + Lng.prevVideo[lang] + '">&#x25C0;</a>\n\t\t<a class="de-abtn" id="de-video-btn-resize" href="#" title="' + Lng.expandVideo[lang] + '"></a>\n\t\t<a class="de-abtn" id="de-video-btn-next" href="#" title="' + Lng.nextVideo[lang] + '">&#x25B6;</a>\n\t\t<a class="de-abtn" id="de-video-btn-hide" href="#" title="' + Lng.hideLnkList[lang] + '">&#x25B2;</a>\n\t</div>';
		var linkList = $add('<div id="de-video-list" style="max-width: ' + (+Cfg.YTubeWidth + 40) + 'px; max-height: ' + (nav.viewportHeight() * 0.92 - +Cfg.YTubeHeigh - 82) + 'px;"></div>');

		var script = doc.createElement('script');
		script.type = 'text/javascript';
		script.textContent = '(function() {\n\t\tif(\'YT\' in window && \'Player\' in window.YT) {\n\t\t\tonYouTubePlayerAPIReady();\n\t\t} else {\n\t\t\twindow.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;\n\t\t}\n\t\tfunction onYouTubePlayerAPIReady() {\n\t\t\twindow.de_addVideoEvents =\n\t\t\t\taddEvents.bind(document.querySelector(\'#de-win-vid > .de-win-body > .de-video-obj\'));\n\t\t\twindow.de_addVideoEvents();\n\t\t}\n\t\tfunction addEvents() {\n\t\t\tvar autoplay = true;\n\t\t\tif(this.hasAttribute(\'de-disableautoplay\')) {\n\t\t\t\tautoplay = false;\n\t\t\t\tthis.removeAttribute(\'de-disableautoplay\');\n\t\t\t}\n\t\t\tnew YT.Player(this.firstChild, { events: {\n\t\t\t\t\'onError\': gotoNextVideo,\n\t\t\t\t\'onReady\': autoplay ? function(e) {\n\t\t\t\t\te.target.playVideo();\n\t\t\t\t} : Function.prototype,\n\t\t\t\t\'onStateChange\': function(e) {\n\t\t\t\t\tif(e.data === 0) {\n\t\t\t\t\t\tgotoNextVideo();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}});\n\t\t}\n\t\tfunction gotoNextVideo() {\n\t\t\tdocument.getElementById("de-video-btn-next").click();\n\t\t}\n\t})();';
		body.appendChild(script);

		body.addEventListener('click', {
			linkList: linkList,
			currentLink: null,
			listHidden: false,
			player: body.firstElementChild,
			playerInfo: null,
			handleEvent: function handleEvent(e) {
				var el = e.target;
				if (el.classList.contains('de-abtn')) {
					var node = void 0;
					switch (el.id) {
						case 'de-video-btn-hide':
							{
								var isHide = this.listHidden = !this.listHidden;
								$toggle(this.linkList, !isHide);
								el.textContent = isHide ? '\u25BC' : '\u25B2';
								break;
							}
						case 'de-video-btn-prev':
							node = this.currentLink.parentNode;
							node = node.previousElementSibling || node.parentNode.lastElementChild;
							node.lastElementChild.click();
							break;
						case 'de-video-btn-next':
							node = this.currentLink.parentNode;
							node = node.nextElementSibling || node.parentNode.firstElementChild;
							node.lastElementChild.click();
							break;
						case 'de-video-btn-resize':
							{
								var exp = this.player.className === 'de-video-obj';
								this.player.className = exp ? 'de-video-obj de-video-expanded' : 'de-video-obj';
								this.linkList.style.maxWidth = (exp ? 894 : +Cfg.YTubeWidth + 40) + 'px';
								this.linkList.style.maxHeight = nav.viewportHeight() * 0.92 - (exp ? 562 : +Cfg.YTubeHeigh + 82) + 'px';
							}
					}
					$pd(e);
					return;
				} else if (!el.classList.contains('de-video-link')) {
					pByNum.get(+el.getAttribute('de-num')).selectAndScrollTo();
					return;
				}
				var info = el.videoInfo;
				if (this.playerInfo !== info) {
					if (this.currentLink) {
						this.currentLink.classList.remove('de-current');
					}
					this.currentLink = el;
					el.classList.add('de-current');
					Videos.addPlayer(this, info, el.classList.contains('de-ytube'), true);
				}
				$pd(e);
			}
		}, true);

		for (var i = 0, len = els.length; i < len; ++i) {
			updateVideoList(linkList, els[i], aib.getPostOfEl(els[i]).num);
		}
		body.appendChild(linkList);
		$q('.de-video-link', linkList).click();
	}

	function updateVideoList(parent, link, num) {
		var el = link.cloneNode(true);
		el.videoInfo = link.videoInfo;
		$bEnd(parent, '<div class="de-entry ' + aib.cReply + '">\n\t\t<a class="de-video-refpost" title=">>' + num + '" de-num="' + num + '">&gt;</a>\n\t</div>').appendChild(el).classList.remove('de-current');
		el.setAttribute('onclick', 'window.de_addVideoEvents && window.de_addVideoEvents();');
	}

	function showHiddenWindow(body) {
		var _this12 = this;

		var hThr = HiddenThreads.getRawData();
		var hasThreads = !$isEmpty(hThr);
		if (hasThreads) {
			var _loop = function _loop(b) {
				if ($isEmpty(hThr[b])) {
					return 'continue';
				}
				var block = $bEnd(body, '<div class="de-fold-block"><input type="checkbox"><b>/' + b + '</b></div>');
				block.firstChild.onclick = function (e) {
					return $each($Q('.de-entry > input', block), function (el) {
						return el.checked = e.target.checked;
					});
				};
				for (var tNum in hThr[b]) {
					$bEnd(block, '<div class="de-entry ' + aib.cReply + '" info="' + b + ';' + tNum + '">\n\t\t\t\t\t<input type="checkbox">\n\t\t\t\t\t<a href="' + aib.getThrUrl(b, tNum) + '" target="_blank">' + tNum + '</a>\n\t\t\t\t\t<div class="de-entry-title">- ' + hThr[b][tNum][2] + '</div>\n\t\t\t\t</div>');
				}
			};

			for (var b in hThr) {
				var _ret = _loop(b);

				if (_ret === 'continue') continue;
			}
		}
		$bEnd(body, hasThreads ? '<hr>' : '<center><b>' + Lng.noHidThr[lang] + '</b></center><hr>');

		body.appendChild(getEditButton('hidden', function (fn) {
			return fn(HiddenThreads.getRawData(), true, function (data) {
				HiddenThreads.saveRawData(data);
				Thread.first.updateHidden(data[aib.b]);
				toggleWindow('hid', true);
			});
		}));

		body.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], function () {
			var _ref6 = _asyncToGenerator( regeneratorRuntime.mark(function _callee4(e) {
				var els, i, len, _els$i$getAttribute$s, _els$i$getAttribute$s2, b, tNum;

				return regeneratorRuntime.wrap(function _callee4$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								els = $Q('.de-entry[info]', e.target.parentNode);
								i = 0, len = els.length;

							case 2:
								if (!(i < len)) {
									_context5.next = 15;
									break;
								}

								_els$i$getAttribute$s = els[i].getAttribute('info').split(';'), _els$i$getAttribute$s2 = _slicedToArray(_els$i$getAttribute$s, 2), b = _els$i$getAttribute$s2[0], tNum = _els$i$getAttribute$s2[1];
								_context5.prev = 4;
								_context5.next = 7;
								return $ajax(aib.getThrUrl(b, tNum));

							case 7:
								_context5.next = 12;
								break;

							case 9:
								_context5.prev = 9;
								_context5.t0 = _context5['catch'](4);

								if (_context5.t0.code === 404) {
									HiddenThreads.removeStorage(tNum, b);
									HiddenPosts.removeStorage(tNum, b);
								}

							case 12:
								++i;
								_context5.next = 2;
								break;

							case 15:
								toggleWindow('hid', true);

							case 16:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee4, _this12, [[4, 9]]);
			}));

			return function (_x10) {
				return _ref6.apply(this, arguments);
			};
		}()));

		body.appendChild($btn(Lng.remove[lang], Lng.delEntries[lang], function () {
			$each($Q('.de-entry[info]', body), function (el) {
				if (!$q('input', el).checked) {
					return;
				}

				var _el$getAttribute$spli = el.getAttribute('info').split(';'),
				    _el$getAttribute$spli2 = _slicedToArray(_el$getAttribute$spli, 2),
				    brd = _el$getAttribute$spli2[0],
				    tNum = _el$getAttribute$spli2[1];

				var num = +tNum;
				if (pByNum.has(num)) {
					pByNum.get(num).setUserVisib(false);
				} else {
					sendStorageEvent('__de-post', { brd: brd, num: num, hide: false, thrNum: num });
				}
				HiddenThreads.removeStorage(num, brd);
				HiddenPosts.set(num, num, false); 
			});
			toggleWindow('hid', true);
		}));
	}


	function saveRenewFavorites(favObj) {
		saveFavorites(favObj);
		toggleWindow('fav', true, favObj);
	}

	function removeFavEntry(favObj, h, b, num) {
		var f = void 0;
		if (h in favObj && b in favObj[h] && num in (f = favObj[h][b])) {
			delete f[num];
			if (!(Object.keys(f).length - +f.hasOwnProperty('url') - +f.hasOwnProperty('hide'))) {
				delete favObj[h][b];
				if ($isEmpty(favObj[h])) {
					delete favObj[h];
				}
			}
		}
	}

	function toggleThrFavBtn(h, b, num, isEnable) {
		if (h === aib.host && b === aib.b && pByNum.has(num)) {
			var post = pByNum.get(num);
			post.toggleFavBtn(isEnable);
			post.thr.isFav = isEnable;
		}
	}

	function updateFavorites(num, value, mode) {
		readFavorites().then(function (favObj) {
			var f = favObj[aib.host];
			if (!f || !f[aib.b] || !(f = f[aib.b][num])) {
				return;
			}
			switch (mode) {
				case 'error':
					f.err = value;break;
				case 'update':
					f.cnt = value[0];
					f.new = f.you = 0;
					f.last = aib.anchor + value[1];
			}
			var data = [aib.host, aib.b, num, value, mode];
			updateFavWindow.apply(undefined, data);
			saveFavorites(favObj);
			sendStorageEvent('__de-favorites', data);
		});
	}

	function updateFavWindow(h, b, num, value, mode) {
		if (mode === 'add' || mode === 'delete') {
			toggleThrFavBtn(h, b, num, mode === 'add');
			toggleWindow('fav', true, value);
			return;
		}
		var winEl = $q('#de-win-fav > .de-win-body');
		if (!winEl || !winEl.hasChildNodes()) {
			return;
		}
		var el = $q('.de-entry[de-host="' + h + '"][de-board="' + b + '"][de-num="' + num + '"] > .de-fav-inf', winEl);
		if (!el) {
			return;
		}

		var _ref7 = [].concat(_toConsumableArray(el.children)),
		    iconEl = _ref7[0],
		    youEl = _ref7[1],
		    newEl = _ref7[2],
		    oldEl = _ref7[3];

		$hide(youEl);
		$hide(newEl);
		if (mode === 'error') {
			iconEl.firstElementChild.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
			iconEl.title = value;
			return;
		}
		youEl.textContent = 0;
		newEl.textContent = 0;
		oldEl.textContent = value[0];
	}

	function cleanFavorites() {
		var els = $Q('.de-entry[de-removed]');
		var len = els.length;
		if (!len) {
			return;
		}
		readFavorites().then(function (favObj) {
			for (var i = 0; i < len; ++i) {
				var el = els[i];
				var h = el.getAttribute('de-host');
				var b = el.getAttribute('de-board');
				var num = +el.getAttribute('de-num');
				removeFavEntry(favObj, h, b, num);
				toggleThrFavBtn(h, b, num, false);
			}
			saveRenewFavorites(favObj);
		});
	}

	function showFavoritesWindow(body, favObj) {
		var _this13 = this;

		var html = '';
		for (var h in favObj) {
			for (var b in favObj[h]) {
				var f = favObj[h][b];
				var hb = 'de-host="' + h + '" de-board="' + b + '"';
				var delBtn = '<svg class="de-fav-del-btn"><use xlink:href="#de-symbol-win-close"></use></svg>';
				var innerHtml = '';
				for (var tNum in f) {
					if (tNum === 'url' || tNum === 'hide') {
						continue;
					}
					var t = f[tNum];
					if (!t.url.startsWith('http')) {
						t.url = (h === aib.host ? aib.prot + '//' : 'http://') + h + t.url;
					}
					var favLinkHref = t.url + (!t.last ? '' : t.last.startsWith('#') ? t.last : h === aib.host ? aib.anchor + t.last : '');
					var favInfIwrapTitle = !t.err ? '' : t.err === 'Closed' ? 'title="' + Lng.thrClosed[lang] + '"' : 'title="' + t.err + '"';
					var favInfIconClass = !t.err ? '' : t.err === 'Closed' || t.err === 'Archived' ? 'de-fav-closed' : 'de-fav-unavail';
					var favInfYouDisp = t.you ? '' : ' style="display: none;"';
					var favInfNewDisp = t.new ? '' : ' style="display: none;"';
					innerHtml += '<div class="de-entry ' + aib.cReply + '" ' + hb + ' de-num="' + tNum + '" de-url="' + t.url + '">\n\t\t\t\t\t' + delBtn + '\n\t\t\t\t\t<a class="de-fav-link" title="' + Lng.goToThread[lang] + '"' + (' href="' + favLinkHref + '" rel="noreferrer">' + tNum + '</a>\n\t\t\t\t\t<div class="de-entry-title">- ' + t.txt + '</div>\n\t\t\t\t\t<div class="de-fav-inf">\n\t\t\t\t\t\t<span class="de-fav-inf-iwrap" ' + favInfIwrapTitle + '>\n\t\t\t\t\t\t\t<svg class="de-fav-inf-icon ' + favInfIconClass + '">\n\t\t\t\t\t\t\t\t<use class="de-fav-closed-use" xlink:href="#de-symbol-closed"/>\n\t\t\t\t\t\t\t\t<use class="de-fav-unavail-use" xlink:href="#de-symbol-unavail"/>\n\t\t\t\t\t\t\t\t<use class="de-fav-wait-use" xlink:href="#de-symbol-wait"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class="de-fav-inf-you" title="' + Lng.myPostsRep[lang] + '"' + favInfYouDisp + '>\n\t\t\t\t\t\t\t' + (t.you || 0) + '</span>\n\t\t\t\t\t\t<span class="de-fav-inf-new" title="' + Lng.newPosts[lang] + '"' + favInfNewDisp + '>\n\t\t\t\t\t\t\t' + (t.new || 0) + '</span>\n\t\t\t\t\t\t<span class="de-fav-inf-old" title="' + Lng.oldPosts[lang] + '">' + t.cnt + '</span>\n\t\t\t\t\t\t<span class="de-fav-inf-page" title="' + Lng.thrPage[lang] + '"></span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>');
				}
				if (!innerHtml) {
					continue;
				}
				var isHide = f.hide === undefined ? h !== aib.host : f.hide;
				html += '<div class="de-fold-block' + (isHide || b !== aib.b ? '' : ' de-fav-current') + '">\n\t\t\t\t<div class="de-fav-header">\n\t\t\t\t\t' + delBtn + '\n\t\t\t\t\t<a class="de-fav-header-link" title="' + Lng.goToBoard[lang] + '"' + (' href="' + f.url + '" rel="noreferrer">' + h + '/' + b + '</a>\n\t\t\t\t\t<a class="de-abtn de-fav-header-btn" title="' + Lng.toggleEntries[lang] + '"') + (' href="#">' + (isHide ? '&#x25BC;' : '&#x25B2;') + '</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="de-fav-entries' + (isHide ? ' de-fav-entries-hide' : '') + '" ' + hb + '>\n\t\t\t\t\t' + innerHtml + '\n\t\t\t\t</div>\n\t\t\t</div>');
			}
		}

		if (html) {
			$bEnd(body, '<div class="de-fav-table">' + html + '</div>').addEventListener('click', function (e) {
				var el = fixEventEl(e.target);
				var parentEl = el.parentNode;
				switch (el.tagName.toLowerCase() === 'svg' ? el.classList[0] : el.className) {
					case 'de-fav-link':
						sesStorage['de-fav-win'] = '1'; 
						sesStorage.removeItem('de-scroll-' + parentEl.getAttribute('de-board') + (parentEl.getAttribute('de-num') || ''));
						break;
					case 'de-fav-del-btn':
						{
							var wasChecked = el.getAttribute('de-checked') === '';
							var toggleFn = function toggleFn(btnEl) {
								return toggleAttr(btnEl, 'de-checked', '', !wasChecked);
							};
							toggleFn(el);
							if (parentEl.className === 'de-fav-header') {
								var entriesEl = parentEl.nextElementSibling;
								$each($Q('.de-fav-del-btn', entriesEl), toggleFn);
								if (!wasChecked && entriesEl.classList.contains('de-fav-entries-hide')) {
									entriesEl.classList.remove('de-fav-entries-hide');
								}
							}
							var isShowDelBtns = !!$q('.de-entry > .de-fav-del-btn[de-checked]', body);
							$toggle($id('de-fav-buttons'), !isShowDelBtns);
							$toggle($id('de-fav-del-confirm'), isShowDelBtns);
							break;
						}
					case 'de-abtn de-fav-header-btn':
						{
							var _entriesEl = parentEl.nextElementSibling;
							var _isHide = !_entriesEl.classList.contains('de-fav-entries-hide');
							el.innerHTML = _isHide ? '&#x25BC' : '&#x25B2';
							favObj[_entriesEl.getAttribute('de-host')][_entriesEl.getAttribute('de-board')].hide = _isHide;
							saveFavorites(favObj);
							$pd(e);
							_entriesEl.classList.toggle('de-fav-entries-hide');
						}
				}
			});
		} else {
			$bEnd(body, '<center><b>' + Lng.noFavThr[lang] + '</b></center>');
		}
		var btns = $bEnd(body, '<hr><div id="de-fav-buttons"></div>');

		btns.appendChild(getEditButton('favor', function (fn) {
			return readFavorites().then(function (favObj) {
				return fn(favObj, true, saveRenewFavorites);
			});
		}));

		btns.appendChild($btn(Lng.refresh[lang], Lng.infoCount[lang], _asyncToGenerator( regeneratorRuntime.mark(function _callee5() {
			var favObj, isUpdate, last404, myposts, els, i, len, el, host, _b, num, _f, _ref9, titleEl, youEl, countEl, iconEl, form, isArchived, _ref10, _ref11, arch, fo, posts, cnt, j, links, a, _len, tc;

			return regeneratorRuntime.wrap(function _callee5$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.next = 2;
							return readFavorites();

						case 2:
							favObj = _context6.sent;

							if (favObj[aib.host]) {
								_context6.next = 5;
								break;
							}

							return _context6.abrupt('return');

						case 5:
							isUpdate = false;
							last404 = false;
							myposts = JSON.parse(locStorage['de-myposts'] || '{}');
							els = $Q('.de-entry');
							i = 0, len = els.length;

						case 10:
							if (!(i < len)) {
								_context6.next = 64;
								break;
							}

							el = els[i];
							host = el.getAttribute('de-host');
							_b = el.getAttribute('de-board');
							num = el.getAttribute('de-num');
							_f = favObj[host][_b][num];

							if (!(host !== aib.host || _f.err === 'Closed' || _f.err === 'Archived')) {
								_context6.next = 18;
								break;
							}

							return _context6.abrupt('continue', 61);

						case 18:
							_ref9 = [].concat(_toConsumableArray(el.lastElementChild.children)), titleEl = _ref9[0], youEl = _ref9[1], countEl = _ref9[2];
							iconEl = titleEl.firstElementChild;

							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
							titleEl.title = Lng.updating[lang];
							form = void 0, isArchived = void 0;
							_context6.prev = 23;

							if (aib.iichan) {
								_context6.next = 30;
								break;
							}

							_context6.next = 27;
							return ajaxLoad(aib.getThrUrl(_b, num));

						case 27:
							form = _context6.sent;
							_context6.next = 36;
							break;

						case 30:
							_context6.next = 32;
							return ajaxLoad(aib.getThrUrl(_b, num), true, false, true);

						case 32:
							_ref10 = _context6.sent;
							_ref11 = _slicedToArray(_ref10, 2);
							form = _ref11[0];
							isArchived = _ref11[1];

						case 36:
							last404 = false;
							_context6.next = 56;
							break;

						case 39:
							_context6.prev = 39;
							_context6.t0 = _context6['catch'](23);

							if (!(_context6.t0 instanceof AjaxError && _context6.t0.code === 404)) {
								_context6.next = 49;
								break;
							}

							if (!last404) {
								_context6.next = 46;
								break;
							}

							Thread.removeSavedData(_b, num); 
							_context6.next = 49;
							break;

						case 46:
							last404 = true;
							--i; 
							return _context6.abrupt('continue', 61);

						case 49:
							last404 = false;
							$hide(countEl);
							$hide(youEl);
							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
							_f.err = titleEl.title = getErrorMessage(_context6.t0);
							isUpdate = true;
							return _context6.abrupt('continue', 61);

						case 56:
							if (aib.qClosed && $q(aib.qClosed, form)) {
								iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
								titleEl.title = Lng.thrClosed[lang];
								_f.err = 'Closed';
								isUpdate = true;
							} else if (isArchived) {
								iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
								titleEl.title = Lng.thrArchived[lang];
								_f.err = 'Archived';
								arch = _b + '/arch';
								fo = favObj[host];

								(fo[arch] || (fo[arch] = { url: favObj[host][_b].url + 'arch/' }))[num] = Object.assign({}, _f);
								removeFavEntry(favObj, host, _b, num);
								isUpdate = true;
							} else {
								iconEl.setAttribute('class', 'de-fav-inf-icon');
								titleEl.removeAttribute('title');
								if (_f.err) {
									delete _f.err;
									isUpdate = true;
								}
							}
							posts = $Q(aib.qRPost, form);
							cnt = posts.length + 1 - _f.cnt;

							countEl.textContent = cnt;
							if (cnt === 0) {
								$hide(countEl); 
								$hide(youEl);
							} else {
								$show(countEl);
								_f.new = cnt;
								isUpdate = true;
								if (myposts && myposts[_b]) {
									_f.you = 0;
									for (j = 0; j < cnt; ++j) {
										links = $Q(aib.qPostMsg + ' a', posts[posts.length - 1 - j]);

										for (a = 0, _len = links.length; a < _len; ++a) {
											tc = links[a].textContent;

											if (tc[0] === '>' && tc[1] === '>' && myposts[_b][tc.substr(2)]) {
												_f.you++;
											}
										}
									}
									if (_f.you) {
										youEl.textContent = _f.you;
										$show(youEl);
									}
								}
							}

						case 61:
							++i;
							_context6.next = 10;
							break;

						case 64:
							AjaxCache.clearCache();
							if (isUpdate) {
								saveFavorites(favObj);
							}

						case 66:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee5, _this13, [[23, 39]]);
		}))));

		btns.appendChild($btn(Lng.page[lang], Lng.infoPage[lang], _asyncToGenerator( regeneratorRuntime.mark(function _callee6() {
			var els, len, thrInfo, i, el, iconEl, titleEl, endPage, infoLoaded, updateInf, page, tNums, form, _i, inf, _i2, _inf;

			return regeneratorRuntime.wrap(function _callee6$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							els = $Q('.de-fav-current > .de-fav-entries > .de-entry');
							len = els.length;

							if (len) {
								_context7.next = 4;
								break;
							}

							return _context7.abrupt('return');

						case 4:
							$popup('load-pages', Lng.loading[lang], true);
							thrInfo = [];

							for (i = 0; i < len; ++i) {
								el = els[i];
								iconEl = $q('.de-fav-inf-icon', el);
								titleEl = iconEl.parentNode;

								thrInfo.push({
									found: false,
									num: +el.getAttribute('de-num'),
									pageEl: $q('.de-fav-inf-page', el),
									iconClass: iconEl.getAttribute('class'),
									iconEl: iconEl,
									iconTitle: titleEl.getAttribute('title'),
									titleEl: titleEl
								});
								iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
								titleEl.title = Lng.updating[lang];
							}
							endPage = (aib.lastPage || 10) + 1; 

							infoLoaded = 0;

							updateInf = function updateInf(inf, page) {
								inf.iconEl.setAttribute('class', inf.iconClass);
								toggleAttr(inf.titleEl, 'title', inf.iconTitle, inf.iconTitle);
								inf.pageEl.textContent = '@' + page;
							};

							page = 0;

						case 11:
							if (!(page < endPage)) {
								_context7.next = 29;
								break;
							}

							tNums = void 0;
							_context7.prev = 13;
							_context7.next = 16;
							return ajaxLoad(aib.getPageUrl(aib.b, page));

						case 16:
							form = _context7.sent;

							tNums = new Set(Array.from(DelForm.getThreads(form), function (thrEl) {
								return aib.getTNum(thrEl);
							}));
							_context7.next = 23;
							break;

						case 20:
							_context7.prev = 20;
							_context7.t0 = _context7['catch'](13);
							return _context7.abrupt('continue', 26);

						case 23:
							for (_i = 0; _i < len; ++_i) {
								inf = thrInfo[_i];

								if (tNums.has(inf.num)) {
									updateInf(inf, page);
									inf.found = true;
									infoLoaded++;
								}
							}

							if (!(infoLoaded === len)) {
								_context7.next = 26;
								break;
							}

							return _context7.abrupt('break', 29);

						case 26:
							++page;
							_context7.next = 11;
							break;

						case 29:
							for (_i2 = 0; _i2 < len; ++_i2) {
								_inf = thrInfo[_i2];

								if (!_inf.found) {
									updateInf(_inf, '?');
								}
							}
							closePopup('load-pages');

						case 31:
						case 'end':
							return _context7.stop();
					}
				}
			}, _callee6, _this13, [[13, 20]]);
		}))));

		btns.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], _asyncToGenerator( regeneratorRuntime.mark(function _callee7() {
			var last404, els, parent, i, len, el, iconEl, titleEl;
			return regeneratorRuntime.wrap(function _callee7$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							last404 = false;
							els = $Q('.de-entry');
							parent = $q('.de-fav-table');

							parent.classList.add('de-fav-table-unfold');
							i = 0, len = els.length;

						case 5:
							if (!(i < len)) {
								_context8.next = 35;
								break;
							}

							el = els[i];
							iconEl = $q('.de-fav-inf-icon', el);
							titleEl = iconEl.parentNode;

							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
							titleEl.title = Lng.updating[lang];
							_context8.prev = 11;
							_context8.next = 14;
							return $ajax(el.getAttribute('de-url'), null, false);

						case 14:
							iconEl.setAttribute('class', 'de-fav-inf-icon');
							titleEl.removeAttribute('title');
							_context8.next = 31;
							break;

						case 18:
							_context8.prev = 18;
							_context8.t0 = _context8['catch'](11);

							if (!(_context8.t0.code === 404)) {
								_context8.next = 29;
								break;
							}

							if (!last404) {
								_context8.next = 26;
								break;
							}

							Thread.removeSavedData(el.getAttribute('de-board'), 
							+el.getAttribute('de-num'));
							el.setAttribute('de-removed', ''); 
							_context8.next = 29;
							break;

						case 26:
							last404 = true;
							--i; 
							return _context8.abrupt('continue', 32);

						case 29:
							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
							titleEl.title = getErrorMessage(_context8.t0);

						case 31:
							last404 = false;

						case 32:
							++i;
							_context8.next = 5;
							break;

						case 35:
							cleanFavorites(); 
							parent.classList.remove('de-fav-table-unfold');

						case 37:
						case 'end':
							return _context8.stop();
					}
				}
			}, _callee7, _this13, [[11, 18]]);
		}))));

		var delBtns = $bEnd(body, '<div id="de-fav-del-confirm" style="display: none;"></div>');
		delBtns.appendChild($btn(Lng.remove[lang], Lng.delEntries[lang], function () {
			$each($Q('.de-entry > .de-fav-del-btn[de-checked]', body), function (el) {
				return el.parentNode.setAttribute('de-removed', '');
			});
			cleanFavorites(); 
			$show(btns);
			$hide(delBtns);
		}));
		delBtns.appendChild($btn(Lng.cancel[lang], '', function () {
			$each($Q('.de-fav-del-btn', body), function (el) {
				return el.removeAttribute('de-checked');
			});
			$show(btns);
			$hide(delBtns);
		}));
	}


	var CfgWindow = {
		initCfgWindow: function initCfgWindow(body) {
			var _this14 = this;

			body.addEventListener('click', this);
			body.addEventListener('mouseover', this);
			body.addEventListener('mouseout', this);
			body.addEventListener('change', this);
			body.addEventListener('keyup', this);
			body.addEventListener('keydown', this);
			body.addEventListener('scroll', this);

			var div = $bEnd(body, '<div id="de-cfg-bar">' + (this._getTab('filters') + this._getTab('posts') + this._getTab('images') + this._getTab('links') + (pr.form || pr.oeForm ? this._getTab('form') : '') + this._getTab('common') + this._getTab('info')) + '</div><div id="de-cfg-buttons">' + this._getSel('language') + '</div>');

			this._clickTab(Cfg.cfgTab);

			div.appendChild(getEditButton('cfg', function (fn) {
				return fn(Cfg, true, function (data) {
					saveCfgObj(aib.dm, data);
					window.location.reload();
				});
			}));

			nav.isGlobal && div.appendChild($btn(Lng.global[lang], Lng.globalCfg[lang], function () {
				var el = $popup('cfg-global', '<b>' + Lng.globalCfg[lang] + ':</b>');
				$bEnd(el, '<div id="de-list"><input type="button" value="' + Lng.load[lang] + '"> ' + Lng.loadGlobal[lang] + '</div>').firstElementChild.onclick = function () {
					return getStoredObj('DESU_Config').then(function (data) {
						if (data && 'global' in data && !$isEmpty(data.global)) {
							saveCfgObj(aib.dm, data.global);
							window.location.reload();
						} else {
							$popup('err-noglobalcfg', Lng.noGlobalCfg[lang]);
						}
					});
				};
				div = $bEnd(el, '<div id="de-list"><input type="button" value="' + Lng.save[lang] + '"> ' + Lng.saveGlobal[lang] + '</div>').firstElementChild.onclick = function () {
					return getStoredObj('DESU_Config').then(function (data) {
						var obj = {};
						var com = data[aib.dm];
						for (var i in com) {
							if (i !== 'correctTime' && i !== 'timePattern' && i !== 'userCSS' && i !== 'userCSSTxt' && i !== 'stats' && com[i] !== defaultCfg[i]) {
								obj[i] = com[i];
							}
						}
						data.global = obj;
						saveCfgObj('global', data.global);
						toggleWindow('cfg', true);
					});
				};
				el.insertAdjacentHTML('beforeend', '<hr><small>' + Lng.descrGlobal[lang] + '</small>');
			}));

			!nav.isPresto && div.appendChild($btn(Lng.file[lang], Lng.fileImpExp[lang], function () {
				var list = _this14._getList([Lng.panelBtn.cfg[lang] + ' ' + Lng.allDomains[lang], Lng.panelBtn.fav[lang], Lng.hidPostThr[lang] + (' (' + aib.dm + ')'), Lng.myPosts[lang] + (' (' + aib.dm + ')')]);
				$popup('cfg-file', '<b>' + Lng.fileImpExp[lang] + ':</b><hr><!--\n\t\t\t\t--><div class="de-list">' + Lng.fileToData[lang] + ':<div class="de-cfg-depend"><!--\n\t\t\t\t\t--><input type="file" accept=".json" id="de-import-file"></div></div><hr><!--\n\t\t\t\t--><div class="de-list"><a id="de-export-file" href="#">' + Lng.dataToFile[lang] + ':<!--\n\t\t\t\t--><div class="de-cfg-depend">' + list + '</div></div>');
				$id('de-import-file').onchange = function (e) {
					var file = e.target.files[0];
					if (!file) {
						return;
					}
					readFile(file, true).then(function (_ref14) {
						var data = _ref14.data;

						var obj = void 0;
						try {
							obj = JSON.parse(data);
						} catch (err) {
							$popup('err-invaliddata', Lng.invalidData[lang]);
							return;
						}
						var cfgObj = obj.settings;
						var favObj = obj.favorites;
						var dmObj = obj[aib.dm];
						var isOldCfg = !cfgObj && !favObj && !dmObj;
						if (isOldCfg) {
							setStored('DESU_Config', data);
						}
						if (cfgObj) {
							try {
								setStored('DESU_Config', JSON.stringify(cfgObj));
								setStored('DESU_keys', JSON.stringify(obj.hotkeys));
								setStored('DESU_Exclude', obj.exclude);
							} catch (err) {}
						}
						if (favObj) {
							saveRenewFavorites(favObj);
						}
						if (dmObj) {
							if (dmObj.posts) {
								locStorage['de-posts'] = JSON.stringify(dmObj.posts);
							}
							if (dmObj.threads) {
								locStorage['de-threads'] = JSON.stringify(dmObj.threads);
							}
							if (dmObj.myposts) {
								locStorage['de-myposts'] = JSON.stringify(dmObj.myposts);
							}
						}
						if (cfgObj || dmObj || isOldCfg) {
							$popup('cfg-file', Lng.updating[lang], true);
							window.location.reload();
							return;
						}
						closePopup('cfg-file');
					});
				};

				var expFile = $id('de-export-file');
				var els = $Q('input', expFile.nextElementSibling);
				els[0].checked = true;
				expFile.addEventListener('click', function () {
					var _ref15 = _asyncToGenerator( regeneratorRuntime.mark(function _callee8(e) {
						var name, nameDm, d, val, valDm, i, len, cfgData;
						return regeneratorRuntime.wrap(function _callee8$(_context9) {
							while (1) {
								switch (_context9.prev = _context9.next) {
									case 0:
										name = [], nameDm = [], d = new Date();
										val = [], valDm = [];
										i = 0, len = els.length;

									case 3:
										if (!(i < len)) {
											_context9.next = 34;
											break;
										}

										if (els[i].checked) {
											_context9.next = 6;
											break;
										}

										return _context9.abrupt('continue', 31);

									case 6:
										_context9.t0 = i;
										_context9.next = _context9.t0 === 0 ? 9 : _context9.t0 === 1 ? 15 : _context9.t0 === 2 ? 26 : _context9.t0 === 3 ? 29 : 31;
										break;

									case 9:
										name.push('Cfg');_context9.next = 12;
										return Promise.all([getStored('DESU_Config'), getStored('DESU_keys'), getStored('DESU_Exclude')]);

									case 12:
										cfgData = _context9.sent;

										val.push('"settings":' + cfgData[0], '"hotkeys":' + (cfgData[1] || '""'), '"exclude":"' + (cfgData[2] || '') + '"');
										return _context9.abrupt('break', 31);

									case 15:
										name.push('Fav');
										_context9.t1 = val;
										_context9.next = 19;
										return getStored('DESU_Favorites');

									case 19:
										_context9.t2 = _context9.sent;

										if (_context9.t2) {
											_context9.next = 22;
											break;
										}

										_context9.t2 = '{}';

									case 22:
										_context9.t3 = _context9.t2;
										_context9.t4 = '"favorites":' + _context9.t3;

										_context9.t1.push.call(_context9.t1, _context9.t4);

										return _context9.abrupt('break', 31);

									case 26:
										nameDm.push('Hid');
										valDm.push('"posts":' + (locStorage['de-posts'] || '{}'), '"threads":' + (locStorage['de-threads'] || '{}'));
										return _context9.abrupt('break', 31);

									case 29:
										nameDm.push('You');
										valDm.push('"myposts":' + (locStorage['de-myposts'] || '{}'));

									case 31:
										++i;
										_context9.next = 3;
										break;

									case 34:
										if (valDm = valDm.join(',')) {
											val.push('"' + aib.dm + '":{' + valDm + '}');
											name.push(aib.dm + ' (' + nameDm.join('+') + ')');
										}
										if (val = val.join(',')) {
											downloadBlob(new Blob(['{' + val + '}'], { type: 'application/json' }), 'DE_' + d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) + '_' + pad2(d.getHours()) + pad2(d.getMinutes()) + '_' + name.join('+') + '.json');
										}
										$pd(e);

									case 37:
									case 'end':
										return _context9.stop();
								}
							}
						}, _callee8, _this14);
					}));

					return function (_x11) {
						return _ref15.apply(this, arguments);
					};
				}(), true);
			}));

			div.appendChild($btn(Lng.reset[lang] + '…', Lng.resetCfg[lang], function () {
				return $popup('cfg-reset', '<b>' + Lng.resetData[lang] + ':</b><hr>' + ('<div class="de-list"><b>' + aib.dm + ':</b>' + _this14._getList([Lng.panelBtn.cfg[lang], Lng.hidPostThr[lang], Lng.myPosts[lang]]) + '</div><hr>') + ('<div class="de-list"><b>' + Lng.allDomains[lang] + ':</b>' + _this14._getList([Lng.panelBtn.cfg[lang], Lng.panelBtn.fav[lang]]) + '</div><hr>')).appendChild($btn(Lng.clear[lang], '', function (e) {
					var els = $Q('input[type="checkbox"]', e.target.parentNode);
					for (var i = 1, len = els.length; i < len; ++i) {
						if (!els[i].checked) {
							continue;
						}
						switch (i) {
							case 1:
								locStorage.removeItem('de-posts');
								locStorage.removeItem('de-threads');
								break;
							case 2:
								locStorage.removeItem('de-myposts');break;
							case 4:
								delStored('DESU_Favorites');
						}
					}
					if (els[3].checked) {
						delStored('DESU_Config');
						delStored('DESU_keys');
						delStored('DESU_Exclude');
					} else if (els[0].checked) {
						getStoredObj('DESU_Config').then(function (data) {
							delete data[aib.dm];
							setStored('DESU_Config', JSON.stringify(data));
							$popup('cfg-reset', Lng.updating[lang], true);
							window.location.reload();
						});
						return;
					}
					$popup('cfg-reset', Lng.updating[lang], true);
					window.location.reload();
				}));
			}));
		},


		handleEvent: function handleEvent(e) {
			var type = e.type,
			    el = e.target;

			var tag = el.tagName;
			if (type === 'click' && tag === 'DIV' && el.classList.contains('de-cfg-tab')) {
				var info = el.getAttribute('info');
				this._clickTab(info);
				saveCfg('cfgTab', info);
			}
			if (type === 'change' && tag === 'SELECT') {
				var _info = el.getAttribute('info');
				saveCfg(_info, el.selectedIndex);
				this._updateDependant();
				switch (_info) {
					case 'language':
						lang = el.selectedIndex;
						Panel.removeMain();
						if (pr.form) {
							pr.addMarkupPanel();
							pr.setPlaceholders();
							pr.updateLanguage();
							aib.updateSubmitBtn(pr.subm);
							if (pr.files) {
								$each($Q('.de-file-img, .de-file-txt-input', pr.form), function (el) {
									return el.title = Lng.youCanDrag[lang];
								});
							}
						}
						this._updateCSS();
						Panel.initPanel(DelForm.first.el);
						toggleWindow('cfg', false);
						break;
					case 'delHiddPost':
						{
							var isHide = Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2;
							for (var post = Thread.first.op; post; post = post.next) {
								if (post.isHidden && !post.isOp) {
									post.wrap.classList.toggle('de-hidden', isHide);
								}
							}
							updateCSS();
							break;
						}
					case 'postBtnsCSS':
						updateCSS();
						if (nav.isPresto) {
							$del($q('.de-svg-icons'));
							addSVGIcons();
						}
						break;
					case 'thrBtns':
					case 'noSpoilers':
						updateCSS();break;
					case 'expandImgs':
						updateCSS();
						AttachedImage.closeImg();
						break;
					case 'fileInputs':
						pr.files.changeMode();
						pr.setPlaceholders();
						updateCSS();
						break;
					case 'addPostForm':
						pr.isBottom = Cfg.addPostForm === 1;
						pr.setReply(false, !aib.t || Cfg.addPostForm > 1);
						break;
					case 'addTextBtns':
						pr.addMarkupPanel();break;
					case 'scriptStyle':
					case 'panelCounter':
						this._updateCSS();
				}
				return;
			}
			if (type === 'click' && tag === 'INPUT' && el.type === 'checkbox') {
				var _info2 = el.getAttribute('info');
				toggleCfg(_info2);
				this._updateDependant();
				switch (_info2) {
					case 'expandTrunc':
					case 'showHideBtn':
					case 'showRepBtn':
					case 'noPostNames':
					case 'widePosts':
					case 'imgNavBtns':
					case 'resizeImgs':
					case 'strikeHidd':
					case 'removeHidd':
					case 'noBoardRule':
					case 'userCSS':
						updateCSS();break;
					case 'hideBySpell':
						Spells.toggle();break;
					case 'sortSpells':
						if (Cfg.sortSpells) {
							Spells.toggle();
						}
						break;
					case 'hideRefPsts':
						for (var _post3 = Thread.first.op; _post3; _post3 = _post3.next) {
							if (!Cfg.hideRefPsts) {
								_post3.ref.unhideRef();
							} else if (_post3.isHidden) {
								_post3.ref.hideRef();
							}
						}
						break;
					case 'ajaxUpdThr':
						if (aib.t) {
							if (Cfg.ajaxUpdThr) {
								updater.enableUpdater();
							} else {
								updater.disableUpdater();
							}
						}
						break;
					case 'updCount':
						updater.toggleCounter(Cfg.updCount);break;
					case 'desktNotif':
						if (Cfg.desktNotif) {
							Notification.requestPermission();
						}
						break;
					case 'markNewPosts':
						Post.clearMarks();break;
					case 'useDobrAPI':
						aib.JsonBuilder = Cfg.useDobrAPI ? DobrochanPostsBuilder : null;break;
					case 'markMyPosts':
						if (!Cfg.markMyPosts && !Cfg.markMyLinks) {
							locStorage.removeItem('de-myposts');
							MyPosts.purge();
						}
						updateCSS();
						break;
					case 'correctTime':
						DateTime.toggleSettings(el);break;
					case 'imgInfoLink':
						{
							var img = $q('.de-fullimg-wrap');
							if (img) {
								img.click();
							}
							updateCSS();
							break;
						}
					case 'imgSrcBtns':
						if (Cfg.imgSrcBtns) {
							var _iteratorNormalCompletion3 = true;
							var _didIteratorError3 = false;
							var _iteratorError3 = undefined;

							try {
								for (var _iterator3 = DelForm[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
									var _ref16 = _step3.value;
									var _el3 = _ref16.el;

									processImgInfoLinks(_el3, 1, 0);
									$each($Q('.de-img-embed'), function (el) {
										return addImgSrcButtons(el.parentNode.nextSibling);
									});
								}
							} catch (err) {
								_didIteratorError3 = true;
								_iteratorError3 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion3 && _iterator3.return) {
										_iterator3.return();
									}
								} finally {
									if (_didIteratorError3) {
										throw _iteratorError3;
									}
								}
							}
						} else {
							$each($Q('.de-btn-src'), $del);
						}
						break;
					case 'delImgNames':
						if (Cfg.delImgNames) {
							var _iteratorNormalCompletion4 = true;
							var _didIteratorError4 = false;
							var _iteratorError4 = undefined;

							try {
								for (var _iterator4 = DelForm[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
									var _ref17 = _step4.value;
									var _el4 = _ref17.el;

									processImgInfoLinks(_el4, 0, 1);
								}
							} catch (err) {
								_didIteratorError4 = true;
								_iteratorError4 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion4 && _iterator4.return) {
										_iterator4.return();
									}
								} finally {
									if (_didIteratorError4) {
										throw _iteratorError4;
									}
								}
							}
						} else {
							$each($Q('.de-img-name'), function (el) {
								el.classList.remove('de-img-name');
								el.textContent = el.title;
								el.removeAttribute('title');
							});
						}
						updateCSS();
						break;
					case 'markMyLinks':
						if (!Cfg.markMyPosts && !Cfg.markMyLinks) {
							locStorage.removeItem('de-myposts');
							MyPosts.purge();
						}
						updateCSS();
						break;
					case 'addSageBtn':
						PostForm.hideField($parent(pr.mail, 'LABEL') || pr.mail);
						updateCSS();
						break;
					case 'altCaptcha':
						pr.cap.initCapPromise();break;
					case 'txtBtnsLoc':
						pr.addMarkupPanel();
						updateCSS();
						break;
					case 'userName':
						PostForm.setUserName();break;
					case 'noPassword':
						$toggle($parent(pr.passw, 'TR'));break;
					case 'noName':
						PostForm.hideField(pr.name);break;
					case 'noSubj':
						PostForm.hideField(pr.subj);break;
					case 'inftyScroll':
						toggleInfinityScroll();break;
					case 'hotKeys':
						if (Cfg.hotKeys) {
							HotKeys.enableHotKeys();
						} else {
							HotKeys.disableHotKeys();
						}
				}
				return;
			}
			if (type === 'click' && tag === 'INPUT' && el.type === 'button') {
				switch (el.id) {
					case 'de-cfg-btn-pass':
						$q('input[info="passwValue"]').value = Math.round(Math.random() * 1e15).toString(32);
						PostForm.setUserPassw();
						break;
					case 'de-cfg-btn-keys':
						$pd(e);
						if ($id('de-popup-edit-hotkeys')) {
							return;
						}
						Promise.resolve(HotKeys.readKeys()).then(function (keys) {
							var temp = KeyEditListener.getEditMarkup(keys);
							var el = $popup('edit-hotkeys', temp[1]);
							var fn = new KeyEditListener(el, keys, temp[0]);
							el.addEventListener('focus', fn, true);
							el.addEventListener('blur', fn, true);
							el.addEventListener('click', fn, true);
							el.addEventListener('keydown', fn, true);
							el.addEventListener('keyup', fn, true);
						});
						break;
					case 'de-cfg-btn-updnow':
						$popup('updavail', Lng.loading[lang], true);
						getStoredObj('DESU_Config').then(function (data) {
							return checkForUpdates(true, data.lastUpd);
						}).then(function (html) {
							return $popup('updavail', html);
						}, emptyFn);
						break;
					case 'de-cfg-btn-debug':
						$popup('cfg-debug', Lng.infoDebug[lang] + ':<textarea readonly class="de-editor"></textarea>').firstElementChild.value = JSON.stringify({
							version: version + '.' + commit,
							location: String(window.location),
							nav: nav,
							Cfg: Cfg,
							sSpells: Spells.list.split('\n'),
							oSpells: sesStorage['de-spells-' + aib.b + (aib.t || '')],
							perf: Logger.getLogData(true).reduce(function (obj, el) {
								obj[el[0]] = el[1]; 
								return obj;
							}, {})
						}, function (key, value) {
							switch (key) {
								case 'stats':
								case 'nameValue':
								case 'passwValue':
								case 'ytApiKey':
									return void 0;
							}
							return key in defaultCfg && value === defaultCfg[key] ? void 0 : value;
						}, '\t');
				}
			}
			if (type === 'keyup' && tag === 'INPUT' && el.type === 'text') {
				var _info3 = el.getAttribute('info');
				switch (_info3) {
					case 'postBtnsBack':
						{
							var isCheck = checkCSSColor(el.value);
							el.classList.toggle('de-input-error', !isCheck);
							if (isCheck) {
								saveCfg('postBtnsBack', el.value);
								updateCSS();
							}
							break;
						}
					case 'minImgSize':
						saveCfg('minImgSize', Math.max(+el.value, 1));break;
					case 'zoomFactor':
						saveCfg('zoomFactor', Math.min(Math.max(+el.value, 1), 100));break;
					case 'webmVolume':
						{
							var val = Math.min(+el.value || 0, 100);
							saveCfg('webmVolume', val);
							sendStorageEvent('__de-webmvolume', val);
							break;
						}
					case 'minWebmWidth':
						saveCfg('minWebmWidth', Math.max(+el.value, Cfg.minImgSize));break;
					case 'maskVisib':
						saveCfg('maskVisib', Math.min(+el.value || 0, 100));
						updateCSS();
						break;
					case 'linksOver':
						saveCfg('linksOver', +el.value | 0);break;
					case 'linksOut':
						saveCfg('linksOut', +el.value | 0);break;
					case 'ytApiKey':
						saveCfg('ytApiKey', el.value.trim());break;
					case 'passwValue':
						PostForm.setUserPassw();break;
					case 'nameValue':
						PostForm.setUserName();break;
					case 'excludeList':
						setStored('DESU_Exclude', excludeList = el.value);break;
					default:
						saveCfg(_info3, el.value);
				}
				return;
			}
			if (tag === 'A') {
				if (el.id === 'de-btn-spell-add') {
					switch (e.type) {
						case 'click':
							$pd(e);break;
						case 'mouseover':
							el.odelay = setTimeout(function () {
								return addMenu(el);
							}, Cfg.linksOver);break;
						case 'mouseout':
							clearTimeout(el.odelay);
					}
					return;
				}
				if (type === 'click') {
					switch (el.id) {
						case 'de-btn-spell-apply':
							$pd(e);
							saveCfg('hideBySpell', 1);
							$q('input[info="hideBySpell"]').checked = true;
							Spells.toggle();
							break;
						case 'de-btn-spell-clear':
							$pd(e);
							$id('de-spell-txt').value = '';
							Spells.toggle();
					}
				}
				return;
			}
			if (tag === 'TEXTAREA' && el.id === 'de-spell-txt' && (type === 'keydown' || type === 'scroll')) {
				this._updateRowMeter(el);
			}
		},


		_clickTab: function _clickTab(info) {
			var el = $q('.de-cfg-tab[info="' + info + '"]');
			if (el.hasAttribute('selected')) {
				return;
			}
			var prefTab = $q('.de-cfg-body');
			if (prefTab) {
				prefTab.className = 'de-cfg-unvis';
				$q('.de-cfg-tab[selected]').removeAttribute('selected');
			}
			el.setAttribute('selected', '');
			var id = el.getAttribute('info');
			var newTab = $id('de-cfg-' + id);
			if (!newTab) {
				newTab = $aEnd($id('de-cfg-bar'), id === 'filters' ? this._getCfgFilters() : id === 'posts' ? this._getCfgPosts() : id === 'images' ? this._getCfgImages() : id === 'links' ? this._getCfgLinks() : id === 'form' ? this._getCfgForm() : id === 'common' ? this._getCfgCommon() : this._getCfgInfo());
				if (id === 'filters') {
					this._updateRowMeter($id('de-spell-txt'));
				}
				if (id === 'common') {
					$after($q('input[info="userCSS"]').parentNode, getEditButton('css', function (fn) {
						return fn(Cfg.userCSSTxt, false, function () {
							saveCfg('userCSSTxt', this.value);
							updateCSS();
							toggleWindow('cfg', true);
						});
					}, 'de-cfg-button'));
				}
			}
			newTab.className = 'de-cfg-body';
			if (id === 'filters') {
				$id('de-spell-txt').value = Spells.list;
			}
			this._updateDependant();

			var els = $Q('.de-cfg-chkbox, .de-cfg-inptxt, .de-cfg-select', newTab.parentNode);
			for (var i = 0, len = els.length; i < len; ++i) {
				var _el5 = els[i];
				var _info4 = _el5.getAttribute('info');
				if (_el5.tagName === 'INPUT') {
					if (_el5.type === 'checkbox') {
						_el5.checked = !!Cfg[_info4];
					} else {
						_el5.value = _info4 !== 'excludeList' ? Cfg[_info4] : excludeList;
					}
				} else {
					_el5.selectedIndex = Cfg[_info4];
				}
			}
		},


		_getCfgFilters: function _getCfgFilters() {
			return '<div id="de-cfg-filters" class="de-cfg-unvis">\n\t\t\t<div id="de-spell-panel">\n\t\t\t\t' + this._getBox('hideBySpell') + '\n\t\t\t\t<a id="de-btn-spell-add" class="de-abtn de-spell-btn" href="#">' + Lng.add[lang] + '</a>\n\t\t\t\t<a id="de-btn-spell-apply" class="de-abtn de-spell-btn" href="#">' + Lng.apply[lang] + '</a>\n\t\t\t\t<a id="de-btn-spell-clear" class="de-abtn de-spell-btn" href="#">' + Lng.clear[lang] + '</a>\n\t\t\t\t<a class="de-abtn de-spell-btn" href="' + gitWiki + 'Spells-' + ((lang ? 'en' : 'ru') + '" target="_blank">[?]</a>\n\t\t\t</div>\n\t\t\t<div id="de-spell-editor">\n\t\t\t\t<div id="de-spell-rowmeter"></div>\n\t\t\t\t<textarea id="de-spell-txt" wrap="off"></textarea>\n\t\t\t</div>\n\t\t\t' + this._getBox('sortSpells') + '<br>\n\t\t\t' + this._getBox('menuHiddBtn') + '<br>\n\t\t\t' + this._getBox('hideRefPsts') + '<br>\n\t\t\t' + this._getSel('delHiddPost') + '\n\t\t</div>');
		},


		_getCfgPosts: function _getCfgPosts() {
			return '<div id="de-cfg-posts" class="de-cfg-unvis">\n\t\t\t' + (localData ? '' : this._getBox('ajaxUpdThr') + '\n\t\t\t\t' + this._getInp('updThrDelay') + '\n\t\t\t\t<div class="de-cfg-depend">\n\t\t\t\t\t' + this._getBox('updCount') + '<br>\n\t\t\t\t\t' + this._getBox('favIcoBlink') + '<br>\n\t\t\t\t\t' + ('Notification' in window ? this._getBox('desktNotif') + '<br>' : '') + '\n\t\t\t\t\t' + this._getBox('noErrInTitle') + '<br>\n\t\t\t\t\t' + this._getBox('markNewPosts') + '<br>\n\t\t\t\t\t' + (aib.dobr ? this._getBox('useDobrAPI') : '') + '\n\t\t\t\t</div>') + '\n\t\t\t' + (aib.jsonSubmit || aib.fch ? this._getBox('markMyPosts') + '<br>' : '') + '\n\t\t\t' + (!localData ? this._getBox('hideReplies') + '<br>\n\t\t\t\t' + this._getBox('expandTrunc') + '<br>' : '') + '\n\t\t\t' + this._getBox('showHideBtn') + '\n\t\t\t' + (!localData ? this._getBox('showRepBtn') : '') + '<br>\n\t\t\t' + this._getSel('postBtnsCSS') + '\n\t\t\t' + this._getInp('postBtnsBack', false, 8) + '<br>\n\t\t\t' + (!localData ? this._getSel('thrBtns') : '') + '<br>\n\t\t\t' + this._getSel('noSpoilers') + '<br>\n\t\t\t' + this._getBox('noPostNames') + '<br>\n\t\t\t' + this._getBox('widePosts') + '<br>\n\t\t\t' + this._getBox('correctTime') + '\n\t\t\t' + this._getInp('timeOffset') + '\n\t\t\t<a class="de-abtn" target="_blank" href="' + gitWiki + 'Settings-time-' + ((lang ? 'en' : 'ru') + '">[?]</a>\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getInp('timePattern', true, 24) + '<br>\n\t\t\t\t' + this._getInp('timeRPattern', true, 24) + '\n\t\t\t</div>\n\t\t</div>');
		},


		_getCfgImages: function _getCfgImages() {
			return '<div id="de-cfg-images" class="de-cfg-unvis">\n\t\t\t' + this._getSel('expandImgs') + '<br>\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getBox('imgNavBtns') + '<br>\n\t\t\t\t' + this._getBox('imgInfoLink') + '<br>\n\t\t\t\t' + this._getBox('resizeImgs') + '<br>\n\t\t\t\t' + (Post.sizing.dPxRatio > 1 ? this._getBox('resizeDPI') + '<br>' : '') + '\n\t\t\t\t' + this._getInp('minImgSize') + '<br>\n\t\t\t\t' + this._getInp('zoomFactor') + '<br>\n\t\t\t\t' + this._getBox('webmControl') + '<br>\n\t\t\t\t' + this._getBox('webmTitles') + '<br>\n\t\t\t\t' + this._getInp('webmVolume') + '<br>\n\t\t\t\t' + this._getInp('minWebmWidth') + '\n\t\t\t</div>\n\t\t\t' + (nav.isPresto ? '' : this._getSel('preLoadImgs') + '<br>') + '\n\t\t\t' + (nav.isPresto || aib.fch ? '' : '<div class="de-cfg-depend">\n\t\t\t\t' + this._getBox('findImgFile') + '\n\t\t\t</div>') + '\n\t\t\t' + this._getSel('openImgs') + '<br>\n\t\t\t' + this._getBox('imgSrcBtns') + '<br>\n\t\t\t' + this._getBox('delImgNames') + '<br>\n\t\t\t' + this._getInp('maskVisib') + '\n\t\t</div>';
		},


		_getCfgLinks: function _getCfgLinks() {
			return '<div id="de-cfg-links" class="de-cfg-unvis">\n\t\t\t' + this._getBox('linksNavig') + '\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getInp('linksOver') + '\n\t\t\t\t' + this._getInp('linksOut') + '<br>\n\t\t\t\t' + this._getBox('markViewed') + '<br>\n\t\t\t\t' + this._getBox('strikeHidd') + '\n\t\t\t\t<div class="de-cfg-depend">' + this._getBox('removeHidd') + '</div>\n\t\t\t\t' + this._getBox('noNavigHidd') + '\n\t\t\t</div>\n\t\t\t' + (aib.jsonSubmit || aib.fch ? this._getBox('markMyLinks') + '<br>' : '') + '\n\t\t\t' + this._getBox('crossLinks') + '<br>\n\t\t\t' + this._getBox('decodeLinks') + '<br>\n\t\t\t' + this._getBox('insertNum') + '<br>\n\t\t\t' + (!localData ? this._getBox('addOPLink') + '<br>\n\t\t\t\t' + this._getBox('addImgs') + '<br>' : '') + '\n\t\t\t<div>\n\t\t\t\t' + this._getBox('addMP3') + '\n\t\t\t\t' + (aib.prot === 'http:' ? this._getBox('addVocaroo') : '') + '\n\t\t\t</div>\n\t\t\t' + this._getSel('addYouTube') + '\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getInp('YTubeWidth', false) + '\xD7\n\t\t\t\t' + this._getInp('YTubeHeigh', false) + '(px)<br>\n\t\t\t\t' + this._getBox('YTubeTitles') + '<br>\n\t\t\t\t' + this._getInp('ytApiKey', true, 25) + '<br>\n\t\t\t\t' + this._getBox('addVimeo') + '\n\t\t\t</div>\n\t\t</div>';
		},


		_getCfgForm: function _getCfgForm() {
			return '<div id="de-cfg-form" class="de-cfg-unvis">\n\t\t\t' + this._getBox('ajaxPosting') + '<br>\n\t\t\t' + (pr.form ? '<div class="de-cfg-depend">\n\t\t\t\t' + this._getBox('postSameImg') + '<br>\n\t\t\t\t' + this._getBox('removeEXIF') + '\n\t\t\t\t' + this._getBox('removeFName') + '<br>\n\t\t\t\t' + this._getBox('sendErrNotif') + '<br>\n\t\t\t\t' + this._getBox('scrAfterRep') + '<br>\n\t\t\t\t' + (pr.files && !nav.isPresto ? this._getSel('fileInputs') : '') + '\n\t\t\t</div>' : '') + '\n\t\t\t' + (pr.form ? this._getSel('addPostForm') + '<br>' : '') + '\n\t\t\t' + (pr.txta ? this._getBox('spacedQuote') + '<br>' : '') + '\n\t\t\t' + this._getBox('favOnReply') + '<br>\n\t\t\t' + (pr.subj ? this._getBox('warnSubjTrip') + '<br>' : '') + '\n\t\t\t' + (pr.mail ? this._getBox('addSageBtn') + '\n\t\t\t\t' + this._getBox('saveSage') + '<br>' : '') + '\n\t\t\t' + (pr.cap ? (aib.hasAltCaptcha ? this._getBox('altCaptcha') + '<br>' : '') + '\n\t\t\t\t' + this._getInp('capUpdTime') + '<br>\n\t\t\t\t' + this._getSel('captchaLang') + '<br>' : '') + '\n\t\t\t' + (pr.txta ? this._getSel('addTextBtns') + '\n\t\t\t\t' + (!aib.fch ? this._getBox('txtBtnsLoc') : '') + '<br>' : '') + '\n\t\t\t' + (pr.passw ? this._getInp('passwValue', true, 9) + '<input type="button" id="de-cfg-btn-pass' + ('" class="de-cfg-button" value="' + Lng.change[lang] + '"><br>') : '') + '\n\t\t\t' + (pr.name ? this._getInp('nameValue', false, 9) + '\n\t\t\t\t' + this._getBox('userName') + '<br>' : '') + '\n\t\t\t' + (pr.rules || pr.passw || pr.name ? Lng.hide[lang] + (pr.rules ? this._getBox('noBoardRule') : '') + (pr.passw ? this._getBox('noPassword') : '') + (pr.name ? this._getBox('noName') : '') + (pr.subj ? this._getBox('noSubj') : '') : '') + '\n\t\t</div>';
		},


		_getCfgCommon: function _getCfgCommon() {
			return '<div id="de-cfg-common" class="de-cfg-unvis">\n\t\t\t' + this._getSel('scriptStyle') + '<br>\n\t\t\t' + this._getBox('userCSS') + '\n\t\t\t<a href="' + gitWiki + 'css-tricks" class="de-abtn" target="_blank">[?]</a><br>\n\t\t\t' + this._getSel('panelCounter') + '<br>\n\t\t\t' + this._getBox('rePageTitle') + '<br>\n\t\t\t' + ('animation' in docBody.style ? this._getBox('animation') + '<br>' : '') + '\n\t\t\t' + this._getBox('closePopups') + '<br>\n\t\t\t' + (!localData ? this._getBox('inftyScroll') + '<br>\n\t\t\t\t' + this._getBox('scrollToTop') + '<br>' : '') + '\n\t\t\t' + this._getBox('hotKeys') + '\n\t\t\t<input type="button" id="de-cfg-btn-keys" class="de-cfg-button" value="' + Lng.edit[lang] + '">\n\t\t\t<div class="de-cfg-depend">' + this._getInp('loadPages') + '</div>\n\t\t\t' + (nav.isGlobal ? Lng.cfg.excludeList[lang] + '\n\t\t\t\t<input type="text" info="excludeList" class="de-cfg-inptxt" style="display: block;' + ' width: 80%;" placeholder="4chan.org, 8ch.net, …">' : '') + '\n\t\t</div>';
		},


		_getCfgInfo: function _getCfgInfo() {
			var statsTable = this._getInfoTable([[Lng.thrViewed[lang], Cfg.stats.view], [Lng.thrCreated[lang], Cfg.stats.op], [Lng.thrHidden[lang], HiddenThreads.getCount()], [Lng.postsSent[lang], Cfg.stats.reply]], false);
			return '<div id="de-cfg-info" class="de-cfg-unvis">\n\t\t\t<div style="padding-bottom: 10px;">\n\t\t\t\t<a href="' + gitWiki + 'versions" target="_blank">v' + version + '.' + commit + ((nav.isESNext ? '.es6' : '') + '</a> |\n\t\t\t\t<a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a> |\n\t\t\t\t<a href="' + gitWiki + (lang ? 'home-en/' : '') + '" target="_blank">Github</a>\n\t\t\t</div>\n\t\t\t<div id="de-info-table">\n\t\t\t\t<div id="de-info-stats">' + statsTable + '\n\t\t\t\t\t<input type="button" id="de-cfg-btn-debug" style="margin-top: 3px;" value="') + (Lng.debug[lang] + '" title="' + Lng.infoDebug[lang] + '">\n\t\t\t\t</div>\n\t\t\t\t<div id="de-info-log">' + this._getInfoTable(Logger.getLogData(false), true) + '</div>\n\t\t\t</div>\n\t\t\t' + (!nav.isChromeStorage && !nav.isPresto && !localData || nav.hasGMXHR ? '\n\t\t\t\t<div style="margin-top: 3px; text-align: center;">&gt;&gt;\n\t\t\t\t\t<input type="button" id="de-cfg-btn-updnow" value="' + Lng.checkNow[lang] + '">\n\t\t\t\t&lt;&lt;</div><br>\n\t\t\t\t' + this._getSel('updDollchan') : '') + '\n\t\t</div>');
		},


		_getBox: function _getBox(id) {
			return '<label class="de-cfg-label">\n\t\t<input class="de-cfg-chkbox" info="' + id + '" type="checkbox"> ' + Lng.cfg[id][lang] + '</label>';
		},
		_getInfoTable: function _getInfoTable(data, needMs) {
			return data.map(function (val) {
				return '<div class="de-info-row">\n\t\t<span class="de-info-name">' + val[0] + '</span>\n\t\t<span>' + (val[1] + (needMs ? 'ms' : '')) + '</span></div>';
			}).join('');
		},
		_getInp: function _getInp(id) {
			var addText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
			return '<label class="de-cfg-label">\n\t\t<input class="de-cfg-inptxt" info="' + id + '" type="text" size="' + size + '" value="' + escapeHTML(Cfg[id]) + '">' + (addText && Lng.cfg[id] ? Lng.cfg[id][lang] : '') + '</label>';
		},
		_getList: function _getList(arr) {
			return arrTags(arr, '<label class="de-block"><input type="checkbox"> ', '</label>');
		},
		_getSel: function _getSel(id) {
			return '<label class="de-cfg-label"><select class="de-cfg-select" info="' + id + '">' + Lng.cfg[id].sel[lang].map(function (val, i) {
				return '<option value="' + i + '">' + val + '</option>';
			}).join('') + '</select> ' + Lng.cfg[id].txt[lang] + ' </label>';
		},
		_getTab: function _getTab(id) {
			return '<div class="' + aib.cReply + ' de-cfg-tab" info="' + id + '">' + Lng.cfgTab[id][lang] + '</div>';
		},
		_toggleDependant: function _toggleDependant(state, arr) {
			var i = arr.length;
			var nState = !state;
			while (i--) {
				var el = $q(arr[i]);
				if (el) {
					el.disabled = nState;
				}
			}
		},
		_updateCSS: function _updateCSS() {
			$each($Q('#de-css, #de-css-dynamic, #de-css-user', doc.head), $del);
			scriptCSS();
		},
		_updateDependant: function _updateDependant() {
			var fn = this._toggleDependant;
			fn(Cfg.ajaxUpdThr, ['input[info="updThrDelay"]', 'input[info="updCount"]', 'input[info="favIcoBlink"]', 'input[info="markNewPosts"]', 'input[info="desktNotif"]', 'input[info="noErrInTitle"]']);
			fn(Cfg.postBtnsCSS === 2, ['input[info="postBtnsBack"]']);
			fn(Cfg.expandImgs, ['input[info="imgNavBtns"]', 'input[info="imgInfoLink"]', 'input[info="resizeDPI"]', 'input[info="resizeImgs"]', 'input[info="minImgSize"]', 'input[info="zoomFactor"]', 'input[info="webmControl"]', 'input[info="webmTitles"]', 'input[info="webmVolume"]', 'input[info="minWebmWidth"]']);
			fn(Cfg.preLoadImgs, ['input[info="findImgFile"]']);
			fn(Cfg.linksNavig, ['input[info="linksOver"]', 'input[info="linksOut"]', 'input[info="markViewed"]', 'input[info="strikeHidd"]', 'input[info="noNavigHidd"]']);
			fn(Cfg.strikeHidd && Cfg.linksNavig, ['input[info="removeHidd"]']);
			fn(Cfg.addYouTube, ['input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]', 'input[info="ytApiKey"]', 'input[info="addVimeo"]']);
			fn(Cfg.YTubeTitles, ['input[info="ytApiKey"]']);
			fn(Cfg.ajaxPosting, ['input[info="postSameImg"]', 'input[info="removeEXIF"]', 'input[info="removeFName"]', 'input[info="sendErrNotif"]', 'input[info="scrAfterRep"]', 'select[info="fileInputs"]']);
			fn(Cfg.addTextBtns, ['input[info="txtBtnsLoc"]']);
			fn(Cfg.hotKeys, ['input[info="loadPages"]']);
		},

		_updateRowMeter: function _updateRowMeter(node) {
			var top = node.scrollTop;
			var el = node.previousElementSibling;
			var num = el.numLines || 1;
			var i = 17;
			if (num - i < (top / 12 | 0 + 1)) {
				var str = '';
				while (i--) {
					str += num++ + '<br>';
				}
				el.insertAdjacentHTML('beforeend', str);
				el.numLines = num;
			}
			el.scrollTop = top;
		}
	};


	function closePopup(data) {
		var el = typeof data === 'string' ? $id('de-popup-' + data) : data;
		if (el) {
			el.closeTimeout = null;
			if (Cfg.animation) {
				$animate(el, 'de-close', true);
			} else {
				el.remove();
			}
		}
	}

	function $popup(id, txt) {
		var isWait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		var el = $id('de-popup-' + id);
		var buttonHTML = isWait ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '\u2716 ';
		if (el) {
			$q('div', el).innerHTML = txt.trim();
			$q('span', el).innerHTML = buttonHTML;
			if (!isWait && Cfg.animation) {
				$animate(el, 'de-blink');
			}
		} else {
			el = $bEnd($id('de-wrapper-popup'), '<div class="' + aib.cReply + ' de-popup" id="de-popup-' + id + '">\n\t\t\t<span class="de-popup-btn">' + buttonHTML + '</span>\n\t\t\t<div class="de-popup-msg">' + txt.trim() + '</div>\n\t\t</div>');
			el.onclick = function (e) {
				var el = fixEventEl(e.target);
				el = el.tagName.toLowerCase() === 'svg' ? el.parentNode : el;
				if (el.className === 'de-popup-btn') {
					closePopup(el.parentNode);
				}
			};
			if (Cfg.animation) {
				$animate(el, 'de-open');
			}
		}
		if (Cfg.closePopups && !isWait && !id.includes('edit') && !id.includes('cfg')) {
			el.closeTimeout = setTimeout(closePopup, 6e3, el);
		}
		return el.lastElementChild;
	}

	function getEditButton(name, getDataFn) {
		var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'de-button';

		return $btn(Lng.edit[lang], Lng.editInTxt[lang], function () {
			return getDataFn(function (val, isJSON, saveFn) {
				var el = $popup('edit-' + name, '<b>' + Lng.editor[name][lang] + '</b><textarea class="de-editor"></textarea>');
				var ta = el.lastChild;
				ta.value = isJSON ? JSON.stringify(val, null, '\t') : val;
				el.appendChild($btn(Lng.save[lang], Lng.saveChanges[lang], !isJSON ? saveFn.bind(ta) : function () {
					var data = void 0;
					try {
						data = JSON.parse(ta.value.trim().replace(/[\n\r\t]/g, '') || '{}');
					} finally {
						if (!data) {
							$popup('err-invaliddata', Lng.invalidData[lang]);
							return;
						}
						saveFn(data);
						closePopup('edit-' + name);
						closePopup('err-invaliddata');
					}
				}));
			});
		}, className);
	}

	var Menu = function () {
		function Menu(parentEl, html, clickFn) {
			var isFixed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

			_classCallCheck(this, Menu);

			this.onout = null;
			this.onover = null;
			this.onremove = null;
			this._closeTO = 0;
			var el = $bEnd(docBody, '<div class="' + aib.cReply + ' de-menu" style="position: ' + (isFixed ? 'fixed' : 'absolute') + '; left: 0px; top: 0px; visibility: hidden;">' + html + '</div>');
			var cr = parentEl.getBoundingClientRect();
			var style = el.style,
			    w = el.offsetWidth,
			    h = el.offsetHeight;

			style.left = (isFixed ? 0 : window.pageXOffset) + (cr.left + w < Post.sizing.wWidth ? cr.left : cr.right - w) + 'px';
			style.top = (isFixed ? 0 : window.pageYOffset) + (cr.bottom + h < Post.sizing.wHeight ? cr.bottom - 0.5 : cr.top - h + 0.5) + 'px';
			style.removeProperty('visibility');
			this._clickFn = clickFn;
			this._el = el;
			this.parentEl = parentEl;
			el.addEventListener('mouseover', this, true);
			el.addEventListener('mouseout', this, true);
			el.addEventListener('click', this);
			parentEl.addEventListener('mouseout', this);
		}

		_createClass(Menu, [{
			key: 'handleEvent',
			value: function handleEvent(e) {
				var _this15 = this;

				var isOverEvent = false;
				switch (e.type) {
					case 'click':
						if (e.target.className === 'de-menu-item') {
							this.removeMenu();
							this._clickFn(e.target);
							if (!Cfg.expandPanel && !$q('.de-win-active')) {
								$hide($id('de-panel-buttons'));
							}
						}
						break;
					case 'mouseover':
						isOverEvent = true;
					case 'mouseout':
						{
							clearTimeout(this._closeTO);
							var rt = fixEventEl(e.relatedTarget);
							rt = rt && rt.farthestViewportElement || rt;
							if (!rt || rt !== this._el && !this._el.contains(rt)) {
								if (isOverEvent) {
									if (this.onover) {
										this.onover();
									}
								} else if (!rt || rt !== this.parentEl && !this.parentEl.contains(rt)) {
									this._closeTO = setTimeout(function () {
										return _this15.removeMenu();
									}, 75);
									if (this.onout) {
										this.onout();
									}
								}
							}
						}
				}
			}
		}, {
			key: 'removeMenu',
			value: function removeMenu() {
				if (!this._el) {
					return;
				}
				if (this.onremove) {
					this.onremove();
				}
				this._el.removeEventListener('mouseover', this, true);
				this._el.removeEventListener('mouseout', this, true);
				this.parentEl.removeEventListener('mouseout', this);
				this._el.removeEventListener('click', this);
				$del(this._el);
				this._el = null;
			}
		}]);

		return Menu;
	}();

	function addMenu(el) {
		var fn = function fn(a) {
			return arrTags(a, '<span class="de-menu-item">', '</span>');
		};
		switch (el.id) {
			case 'de-btn-spell-add':
				return new Menu(el, '<div style="display: inline-block; border-right: 1px solid grey;">' + fn('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,#sage'.split(',')) + '</div><div style="display: inline-block;">' + fn('#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep,<br>'.split(',')) + '</div>', function (_ref18) {
					var s = _ref18.textContent;
					return $txtInsert($id('de-spell-txt'), s + (!aib.t || s === '#op' || s === '#rep' || s === '#outrep' ? '' : '[' + aib.b + ',' + aib.t + ']') + (Spells.needArg[Spells.names.indexOf(s.substr(1))] ? '(' : ''));
				});
			case 'de-panel-refresh':
				return new Menu(el, fn(Lng.selAjaxPages[lang]), function (el) {
					return Pages.loadPages(aProto.indexOf.call(el.parentNode.children, el) + 1);
				});
			case 'de-panel-savethr':
				return new Menu(el, fn($q(aib.qPostImg, DelForm.first.el) ? Lng.selSaveThr[lang] : [Lng.selSaveThr[lang][0]]), function (el) {
					if ($id('de-popup-savethr')) {
						return;
					}
					var imgOnly = !!aProto.indexOf.call(el.parentNode.children, el);
					if (ContentLoader.isLoading) {
						$popup('savethr', Lng.loading[lang], true);
						ContentLoader.afterFn = function () {
							return ContentLoader.downloadThread(imgOnly);
						};
						ContentLoader.popupId = 'savethr';
					} else {
						ContentLoader.downloadThread(imgOnly);
					}
				});
			case 'de-panel-audio-off':
				return new Menu(el, fn(Lng.selAudioNotif[lang]), function (el) {
					updater.enableUpdater();
					updater.toggleAudio([3e4, 6e4, 12e4, 3e5][aProto.indexOf.call(el.parentNode.children, el)]);
					$id('de-panel-audio-off').id = 'de-panel-audio-on';
				});
		}
	}


	var HotKeys = {
		cPost: null,
		enabled: false,
		gKeys: null,
		lastPageOffset: 0,
		ntKeys: null,
		tKeys: null,
		version: 7,
		clearCPost: function clearCPost() {
			this.cPost = null;
			this.lastPageOffset = 0;
		},
		disableHotKeys: function disableHotKeys() {
			if (this.enabled) {
				this.enabled = false;
				if (this.cPost) {
					this.cPost.unselect();
				}
				this.clearCPost();
				this.gKeys = this.ntKeys = this.tKeys = null;
				doc.removeEventListener('keydown', this, true);
			}
		},
		enableHotKeys: function enableHotKeys() {
			var _this16 = this;

			if (!this.enabled) {
				this.enabled = true;
				this._paused = false;
				Promise.resolve(this.readKeys()).then(function (keys) {
					if (_this16.enabled) {
						var _keys = _slicedToArray(keys, 5);

						_this16.gKeys = _keys[2];
						_this16.ntKeys = _keys[3];
						_this16.tKeys = _keys[4];

						doc.addEventListener('keydown', _this16, true);
					}
				});
			}
		},

		getDefaultKeys: function getDefaultKeys() {
			return [HotKeys.version, nav.isFirefox, [
0x004B 
			, 0x004A 
			, 0x0052 
			, 0x0048 
			, 0x1025 
			, 0x900D 
			, 0x4046 
			, 0x4048 
			, 0x0050 
			, 0x0042 
			, 0x4053 
			, 0x0049 
			, 0xC042 
			, 0xC049 
			, 0xC054 
			, 0xC050 
			, 0xC043 
			, 0x1027 
			, 0x4056 
			], [
0x004D 
			, 0x004E 
			, 0x0056 
			, 0x0045 
			], [
0x0055 
			]];
		},
		handleEvent: function handleEvent(e) {
			if (this._paused || e.metaKey) {
				return;
			}
			var idx = void 0;
			var isThr = aib.t;
			var el = e.target;
			var tag = el.tagName;
			var kc = e.keyCode | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) | (e.altKey ? 0x4000 : 0) | (tag === 'TEXTAREA' || tag === 'INPUT' && (el.type === 'text' || el.type === 'password') ? 0x8000 : 0);
			if (kc === 0x74 || kc === 0x8074) {
				if (isThr || $id('de-popup-load-pages')) {
					return;
				}
				AttachedImage.closeImg();
				Pages.loadPages(+Cfg.loadPages);
			} else if (kc === 0x1B) {
				if (AttachedImage.viewer) {
					AttachedImage.closeImg();
					return;
				}
				if (this.cPost) {
					this.cPost.unselect();
					this.cPost = null;
				}
				if (isThr) {
					Post.clearMarks();
				}
				this.lastPageOffset = 0;
			} else if (kc === 0x801B) {
				el.blur();
			} else {
				var post = void 0;
				var globIdx = this.gKeys.indexOf(kc);
				switch (globIdx) {
					case 2:
						if (pr.form) {
							post = this.cPost || this._getFirstVisPost(false, true) || Thread.first.op;
							this.cPost = post;
							pr.showQuickReply(post, post.num, true, false);
							post.select();
						}
						break;
					case 3:
						post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
						if (post) {
							post.setUserVisib(!post.isHidden);
							this._scroll(post, false, post.isOp);
						}
						break;
					case 4:
						if (AttachedImage.viewer) {
							AttachedImage.viewer.navigate(false);
						} else if (isThr || aib.page !== aib.firstPage) {
							window.location.pathname = aib.getPageUrl(aib.b, isThr ? 0 : aib.page - 1);
						}
						break;
					case 5:
						if (el !== pr.txta && el !== pr.cap.textEl) {
							return;
						}
						pr.subm.click();
						break;
					case 6:
						toggleWindow('fav', false);
						break;
					case 7:
						toggleWindow('hid', false);
						break;
					case 8:
						$toggle($id('de-panel-buttons'));
						break;
					case 9:
						toggleCfg('maskImgs');
						updateCSS();
						break;
					case 10:
						toggleWindow('cfg', false);
						break;
					case 11:
						post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
						if (post) {
							post.toggleImages();
						}
						break;
					case 12:
						if (el !== pr.txta) {
							return;
						}
						$id('de-btn-bold').click();
						break;
					case 13:
						if (el !== pr.txta) {
							return;
						}
						$id('de-btn-italic').click();
						break;
					case 14:
						if (el !== pr.txta) {
							return;
						}
						$id('de-btn-strike').click();
						break;
					case 15:
						if (el !== pr.txta) {
							return;
						}
						$id('de-btn-spoil').click();
						break;
					case 16:
						if (el !== pr.txta) {
							return;
						}
						$id('de-btn-code').click();
						break;
					case 17:
						if (AttachedImage.viewer) {
							AttachedImage.viewer.navigate(true);
						} else if (!isThr) {
							var pageNum = DelForm.last.pageNum + 1;
							if (pageNum <= aib.lastPage) {
								window.location.pathname = aib.getPageUrl(aib.b, pageNum);
							}
						}
						break;
					case 18:
						toggleWindow('vid', false);
						break;
					case -1:
						if (isThr) {
							idx = this.tKeys.indexOf(kc);
							if (idx === 0) {
								updater.forceLoad(null);
								break;
							}
							return;
						}
						idx = this.ntKeys.indexOf(kc);
						if (idx === -1) {
							return;
						} else if (idx === 2) {
							post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
							if (post) {
								if (typeof GM_openInTab === 'function') {
									GM_openInTab(aib.getThrUrl(aib.b, post.tNum), false, true);
								} else {
									window.open(aib.getThrUrl(aib.b, post.tNum), '_blank');
								}
							}
							break;
						} else if (idx === 3) {
							post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
							if (post) {
								if (post.thr.loadCount !== 0 && post.thr.op.next.count === 1) {
									var nextThr = post.thr.nextNotHidden;
									post.thr.loadPosts(visPosts, !!nextThr);
									post = (nextThr || post.thr).op;
								} else {
									post.thr.loadPosts('all');
									post = post.thr.op;
								}
								scrollTo(window.pageXOffset, window.pageYOffset + post.top);
								if (this.cPost && this.cPost !== post) {
									this.cPost.unselect();
									this.cPost = post;
								}
							}
							break;
						}
					default:
						{
							var scrollToThr = !isThr && (globIdx === 0 || globIdx === 1);
							this._scroll(this._getFirstVisPost(scrollToThr, false), globIdx === 0 || idx === 0, scrollToThr);
						}
				}
			}
			e.stopPropagation();
			$pd(e);
		},
		pauseHotKeys: function pauseHotKeys() {
			this._paused = true;
		},
		readKeys: function () {
			var _ref19 = _asyncToGenerator( regeneratorRuntime.mark(function _callee9() {
				var str, keys, tKeys, mapFunc;
				return regeneratorRuntime.wrap(function _callee9$(_context10) {
					while (1) {
						switch (_context10.prev = _context10.next) {
							case 0:
								_context10.next = 2;
								return getStored('DESU_keys');

							case 2:
								str = _context10.sent;

								if (str) {
									_context10.next = 5;
									break;
								}

								return _context10.abrupt('return', this.getDefaultKeys());

							case 5:
								keys = void 0;
								_context10.prev = 6;

								keys = JSON.parse(str);

							case 8:
								_context10.prev = 8;

								if (keys) {
									_context10.next = 11;
									break;
								}

								return _context10.abrupt('return', this.getDefaultKeys());

							case 11:
								if (keys[0] !== this.version) {
									tKeys = this.getDefaultKeys();

									switch (keys[0]) {
										case 1:
											keys[2][11] = tKeys[2][11];
											keys[4] = tKeys[4];
										case 2:
											keys[2][12] = tKeys[2][12];
											keys[2][13] = tKeys[2][13];
											keys[2][14] = tKeys[2][14];
											keys[2][15] = tKeys[2][15];
											keys[2][16] = tKeys[2][16];
										case 3:
											keys[2][17] = keys[3][3];
											keys[3][3] = keys[3].splice(4, 1)[0];
										case 4:
										case 5:
										case 6:
											keys[2][18] = tKeys[2][18];
									}
									keys[0] = this.version;
									setStored('DESU_keys', JSON.stringify(keys));
								}
								if (keys[1] ^ nav.isFirefox) {
									mapFunc = nav.isFirefox ? function (key) {
										return key === 189 ? 173 : key === 187 ? 61 : key === 186 ? 59 : key;
									} : function (key) {
										return key === 173 ? 189 : key === 61 ? 187 : key === 59 ? 186 : key;
									};

									keys[1] = nav.isFirefox;
									keys[2] = keys[2].map(mapFunc);
									keys[3] = keys[3].map(mapFunc);
									setStored('DESU_keys', JSON.stringify(keys));
								}
								return _context10.abrupt('return', keys);

							case 15:
							case 'end':
								return _context10.stop();
						}
					}
				}, _callee9, this, [[6,, 8, 15]]);
			}));

			function readKeys() {
				return _ref19.apply(this, arguments);
			}

			return readKeys;
		}(),
		resume: function resume(keys) {
			var _keys2 = _slicedToArray(keys, 5);

			this.gKeys = _keys2[2];
			this.ntKeys = _keys2[3];
			this.tKeys = _keys2[4];

			this._paused = false;
		},


		_paused: false,
		_getNextVisPost: function _getNextVisPost(cPost, isOp, toUp) {
			if (isOp) {
				var thr = cPost ? toUp ? cPost.thr.prevNotHidden : cPost.thr.nextNotHidden : Thread.first.isHidden ? Thread.first.nextNotHidden : Thread.first;
				return thr ? thr.op : null;
			}
			return cPost ? cPost.getAdjacentVisPost(toUp) : Thread.first.isHidden || Thread.first.op.isHidden ? Thread.first.op.getAdjacentVisPost(toUp) : Thread.first.op;
		},
		_getFirstVisPost: function _getFirstVisPost(getThread, getFull) {
			if (this.lastPageOffset !== window.pageYOffset) {
				var post = getThread ? Thread.first : Thread.first.op;
				while (post.top < 1) {
					var tPost = post.next;
					if (!tPost) {
						break;
					}
					post = tPost;
				}
				if (this.cPost) {
					this.cPost.unselect();
				}
				this.cPost = getThread ? getFull ? post.op : post.op.prev : getFull ? post : post.prev;
				this.lastPageOffset = window.pageYOffset;
			}
			return this.cPost;
		},
		_scroll: function _scroll(post, toUp, toThread) {
			var next = this._getNextVisPost(post, toThread, toUp);
			if (!next) {
				if (!aib.t) {
					var pageNum = toUp ? DelForm.first.pageNum - 1 : DelForm.last.pageNum + 1;
					if (toUp ? pageNum >= aib.firstPage : pageNum <= aib.lastPage) {
						window.location.pathname = aib.getPageUrl(aib.b, pageNum);
					}
				}
				return;
			}
			if (post) {
				post.unselect();
			}
			if (toThread) {
				next.el.scrollIntoView();
			} else {
				scrollTo(0, window.pageYOffset + next.el.getBoundingClientRect().top - Post.sizing.wHeight / 2 + next.el.clientHeight / 2);
			}
			this.lastPageOffset = window.pageYOffset;
			next.select();
			this.cPost = next;
		}
	};

	var KeyEditListener = function () {
		function KeyEditListener(popupEl, keys, allKeys) {
			_classCallCheck(this, KeyEditListener);

			this.cEl = null;
			this.cKey = -1;
			this.errorInput = false;
			var aInputs = [].concat(_toConsumableArray($Q('.de-input-key', popupEl)));
			for (var i = 0, len = allKeys.length; i < len; ++i) {
				var k = allKeys[i];
				if (k !== 0) {
					for (var j = i + 1; j < len; ++j) {
						if (k === allKeys[j]) {
							aInputs[i].classList.add('de-input-error');
							aInputs[j].classList.add('de-input-error');
							break;
						}
					}
				}
			}
			this.popupEl = popupEl;
			this.keys = keys;
			this.initKeys = JSON.parse(JSON.stringify(keys));
			this.allKeys = allKeys;
			this.allInputs = aInputs;
			this.errCount = $Q('.de-input-error', popupEl).length;
			if (this.errCount !== 0) {
				this.saveButton.disabled = true;
			}
		}

		_createClass(KeyEditListener, [{
			key: 'handleEvent',
			value: function handleEvent(e) {
				var key = void 0,
				    el = e.target;
				switch (e.type) {
					case 'blur':
						if (HotKeys.enabled && this.errCount === 0) {
							HotKeys.resume(this.keys);
						}
						el.classList.remove('de-input-selected');
						this.cEl = null;
						return;
					case 'focus':
						if (HotKeys.enabled) {
							HotKeys.pauseHotKeys();
						}
						el.classList.add('de-input-selected');
						this.cEl = el;
						return;
					case 'click':
						{
							var keys = void 0;
							if (el.id === 'de-keys-reset') {
								this.keys = HotKeys.getDefaultKeys();
								this.initKeys = HotKeys.getDefaultKeys();
								if (HotKeys.enabled) {
									HotKeys.resume(this.keys);
								}

								var _KeyEditListener$getE = KeyEditListener.getEditMarkup(this.keys);

								var _KeyEditListener$getE2 = _slicedToArray(_KeyEditListener$getE, 2);

								this.allKeys = _KeyEditListener$getE2[0];
								this.popupEl.innerHTML = _KeyEditListener$getE2[1];

								this.allInputs = [].concat(_toConsumableArray($Q('.de-input-key', this.popupEl)));
								this.errCount = 0;
								delete this.saveButton;
								break;
							} else if (el.id === 'de-keys-save') {
								keys = this.keys;

								setStored('DESU_keys', JSON.stringify(keys));
							} else if (el.className === 'de-popup-btn') {
								keys = this.initKeys;
							} else {
								return;
							}
							if (HotKeys.enabled) {
								HotKeys.resume(keys);
							}
							closePopup('edit-hotkeys');
							break;
						}
					case 'keydown':
						{
							if (!this.cEl) {
								return;
							}
							key = e.keyCode;
							if (key === 0x1B || key === 0x2E) {
								this.cEl.value = '';
								this.cKey = 0;
								this.errorInput = false;
								break;
							}
							var keyStr = KeyEditListener.keyCodes[key];
							if (keyStr === undefined) {
								this.cKey = -1;
								return;
							}
							var str = '';
							if (e.ctrlKey) {
								str += 'Ctrl+';
							}
							if (e.shiftKey) {
								str += 'Shift+';
							}
							if (e.altKey) {
								str += 'Alt+';
							}
							if (key === 16 || key === 17 || key === 18) {
								this.errorInput = true;
								this.cKey = 0;
							} else {
								this.cKey = key | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) | (e.altKey ? 0x4000 : 0) | (this.cEl.hasAttribute('de-text') ? 0x8000 : 0);
								this.errorInput = false;
								str += keyStr;
							}
							this.cEl.value = str;
							break;
						}
					case 'keyup':
						{
							el = this.cEl;
							key = this.cKey;
							if (!el || key === -1) {
								return;
							}
							var rEl = void 0;
							var isError = el.classList.contains('de-input-error');
							if (!this.errorInput && key !== -1) {
								var idx = this.allInputs.indexOf(el);
								var oKey = this.allKeys[idx];
								if (oKey === key) {
									this.errorInput = false;
									break;
								}
								var rIdx = key === 0 ? -1 : this.allKeys.indexOf(key);
								this.allKeys[idx] = key;
								if (isError) {
									idx = this.allKeys.indexOf(oKey);
									if (idx !== -1 && this.allKeys.indexOf(oKey, idx + 1) === -1) {
										rEl = this.allInputs[idx];
										if (rEl.classList.contains('de-input-error')) {
											this.errCount--;
											rEl.classList.remove('de-input-error');
										}
									}
									if (rIdx === -1) {
										this.errCount--;
										el.classList.remove('de-input-error');
									}
								}
								if (rIdx === -1) {
									this.keys[+el.getAttribute('de-id1')][+el.getAttribute('de-id2')] = key;
									if (this.errCount === 0) {
										this.saveButton.disabled = false;
									}
									this.errorInput = false;
									break;
								}
								rEl = this.allInputs[rIdx];
								if (!rEl.classList.contains('de-input-error')) {
									this.errCount++;
									rEl.classList.add('de-input-error');
								}
							}
							if (!isError) {
								this.errCount++;
								el.classList.add('de-input-error');
							}
							if (this.errCount !== 0) {
								this.saveButton.disabled = true;
							}
						}
				}
				$pd(e);
			}
		}, {
			key: 'saveButton',
			get: function get() {
				var value = $id('de-keys-save');
				Object.defineProperty(this, 'saveButton', { value: value, configurable: true });
				return value;
			}
		}], [{
			key: 'getEditMarkup',
			value: function getEditMarkup(keys) {
				var allKeys = [];
				return [allKeys, Lng.hotKeyEdit[lang].join('').replace(/%l/g, '<label class="de-block">').replace(/%\/l/g, '</label>').replace(/%i([2-4])([0-9]+)(t)?/g, function (all, id1, id2, isText) {
					var key = keys[+id1][+id2];
					allKeys.push(key);
					return '<input class="de-input-key" type="text" de-id1="' + id1 + '" de-id2="' + id2 + ('" size="16" value="' + KeyEditListener.getStrKey(key) + (isText ? '" de-text' : '"') + ' readonly>');
				}) + '<input type="button" id="de-keys-save" class="de-button" value="' + Lng.save[lang] + '">' + ('<input type="button" id="de-keys-reset" class="de-button" value="' + Lng.reset[lang] + '">')];
			}
		}, {
			key: 'getStrKey',
			value: function getStrKey(key) {
				return (key & 0x1000 ? 'Ctrl+' : '') + (key & 0x2000 ? 'Shift+' : '') + (key & 0x4000 ? 'Alt+' : '') + KeyEditListener.keyCodes[key & 0xFFF];
			}
		}, {
			key: 'setTitle',
			value: function setTitle(el, idx) {
				var title = el.getAttribute('de-title');
				if (!title) {
					title = el.getAttribute('title');
					el.setAttribute('de-title', title);
				}
				if (HotKeys.enabled && idx !== -1) {
					title += ' [' + KeyEditListener.getStrKey(HotKeys.gKeys[idx]) + ']';
				}
				el.title = title;
			}
		}]);

		return KeyEditListener;
	}();


	KeyEditListener.keyCodes = ['',,,,,,,, 'Backspace', 'Tab',,,, 'Enter',,, 'Shift', 'Ctrl', 'Alt',,,,,,,,,,,,,,  
'Space',,,,,    '←', '↑', '→', '↓',,,,,,,, 
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',, ';',, '=',,,, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',,,,,,  
'Num 0', 'Num 1', 'Num 2', 'Num 3', 'Num 4', 'Num 5', 'Num 6', 'Num 7', 'Num 8', 'Num 9', 'Num *', 'Num +',, 'Num -', 'Num .', 'Num /',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,        
'-',,,,,,,,,,,,, ';', '=', ',', '-', '.', '/', '`',,,,,,,,,,,,,,,,,,,,,,,,,,, '[', '\\', ']', "'"];


	var ContentLoader = {
		afterFn: null,
		isLoading: false,
		popupId: null,
		downloadThread: function downloadThread(imgOnly) {
			var _this17 = this;

			var progress = void 0,
			    counter = void 0,
			    current = 1,
			    warnings = '',
			    tar = new TarBuilder();
			var dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
			var els = [].concat(_toConsumableArray($Q(aib.qPostImg, $q('[de-form]', dc))));
			var count = els.length;
			this._thrPool = new TasksPool(4, function (num, data) {
				return _this17.loadImgData(data[0]).then(function (imgData) {
					var _data3 = _slicedToArray(data, 4),
					    url = _data3[0],
					    fName = _data3[1],
					    el = _data3[2],
					    imgLink = _data3[3];

					var safeName = fName.replace(/[\\/:*?"<>|]/g, '_');
					progress.value = counter.innerHTML = current++;
					if (imgLink) {
						var thumbName = safeName.replace(/\.[a-z]+$/, '.png');
						if (imgOnly) {
							thumbName = 'thumb-' + thumbName;
						} else {
							thumbName = 'thumbs/' + thumbName;
							safeName = imgData ? 'images/' + safeName : thumbName;
							imgLink.href = $q('a[de-href], ' + aib.qImgNameLink, aib.getImgWrap(el)).href = safeName;
						}
						if (imgData) {
							tar.addFile(safeName, imgData);
						} else {
							warnings += '<br>' + Lng.cantLoad[lang] + ' <a href="' + url + '">' + url + '</a>' + ('<br>' + Lng.willSavePview[lang]);
							$popup('err-files', Lng.loadErrors[lang] + warnings);
							if (imgOnly) {
								return _this17._getDataFromImg(el).then(function (data) {
									return tar.addFile(thumbName, data);
								}, emptyFn);
							}
						}
						return imgOnly ? null : _this17._getDataFromImg(el).then(function (data) {
							el.src = thumbName;
							tar.addFile(thumbName, data);
						}, function () {
							return el.src = safeName;
						});
					} else if (imgData && imgData.length > 0) {
						tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
					} else {
						$del(el);
					}
				});
			}, function () {
				var docName = aib.dm + '-' + aib.b.replace(/[\\/:*?"<>|]/g, '') + '-' + aib.t;
				if (!imgOnly) {
					$q('head', dc).insertAdjacentHTML('beforeend', '<script type="text/javascript" src="data/dollscript.js" charset="utf-8"></script>');
					$q('body', dc).classList.add('de-mode-local');
					$each($Q('#de-css, #de-css-dynamic, #de-css-user', dc), $del);
					tar.addString('data/dollscript.js', '' + (nav.isESNext ? '(' + String(deMainFuncInner) + ')(null, null, (x, y) => window.scrollTo(x, y), ' : '(' + String( deMainFuncOuter) + ')(') + JSON.stringify({ dm: aib.dm, b: aib.b, t: aib.t }) + ');');
					var dt = doc.doctype;
					tar.addString(docName + '.html', '<!DOCTYPE ' + dt.name + (dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : dt.systemId ? ' SYSTEM' : '') + (dt.systemId ? ' "' + dt.systemId + '"' : '') + '>' + dc.outerHTML);
				}
				downloadBlob(tar.get(), docName + (imgOnly ? '-images.tar' : '.tar'));
				$del($id('de-popup-load-files'));
				_this17._thrPool = tar = warnings = count = current = imgOnly = progress = counter = null;
			});
			els.forEach(function (el) {
				var imgLink = $parent(el, 'A');
				if (imgLink) {
					var _url = imgLink.href;
					_this17._thrPool.runTask([_url, imgLink.getAttribute('download') || _url.substring(_url.lastIndexOf('/') + 1), el, imgLink]);
				}
			});
			if (!imgOnly) {
				$each($Q('#de-main, .de-parea, .de-post-btns, .de-btn-src, .de-refmap, .de-thr-buttons, ' + '.de-video-obj, #de-win-reply, link[rel="alternate stylesheet"], script, ' + aib.qForm, dc), $del);
				$each($Q('a', dc), function (el) {
					var num = void 0;
					var tc = el.textContent;
					if (tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && pByNum.has(num)) {
						el.href = aib.anchor + num;
						if (!el.classList.contains('de-link-pref')) {
							el.className = 'de-link-pref ' + el.className;
						}
					} else {
						el.href = getAbsLink(el.href);
					}
				});
				$each($Q(aib.qRPost, dc), function (el, i) {
					return el.setAttribute('de-num', i ? aib.getPNum(el) : aib.t);
				});
				var files = [];
				var urlRegex = new RegExp('^\\/\\/?|^https?:\\/\\/([^\\/]*\\.)?' + quoteReg(aib.fch ? '4cdn.org' : aib.dm) + '\\/', 'i');
				$each($Q('link, *[src]', dc), function (el) {
					if (els.indexOf(el) !== -1) {
						return;
					}
					var url = el.tagName === 'LINK' ? el.href : el.src;
					if (!urlRegex.test(url)) {
						$del(el);
						return;
					}
					var fName = url.substring(url.lastIndexOf('/') + 1).replace(/[\\/:*?"<>|]/g, '_').toLowerCase();
					if (files.indexOf(fName) !== -1) {
						var temp = url.lastIndexOf('.');
						var ext = url.substring(temp);
						url = url.substring(0, temp);
						fName = fName.substring(0, fName.lastIndexOf('.'));
						for (var i = 0;; ++i) {
							temp = fName + '(' + i + ')' + ext;
							if (files.indexOf(temp) === -1) {
								break;
							}
						}
						fName = temp;
					}
					files.push(fName);
					_this17._thrPool.runTask([url, fName, el, null]);
					count++;
				});
			}
			$popup('load-files', (imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang]) + ':<br><progress ' + ('id="de-loadprogress" value="0" max="' + count + '"></progress> <span>1</span>/' + count), true);
			progress = $id('de-loadprogress');
			counter = progress.nextElementSibling;
			this._thrPool.completeTasks();
			els = null;
		},

		loadImgData: function loadImgData(url) {
			var repeatOnError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			return $ajax(url, {
				responseType: 'arraybuffer',
				overrideMimeType: 'text/plain; charset=x-user-defined'
			}, url.startsWith('blob')).then(function (xhr) {
				if (xhr.status === 0 && xhr.responseType === 'arraybuffer') {
					return new Uint8Array(xhr.response);
				}
				if ('response' in xhr) {
					try {
						return nav.getUnsafeUint8Array(xhr.response);
					} catch (err) {}
				}
				var txt = xhr.responseText;
				return new Uint8Array(txt.length).map(function (val, i) {
					return txt.charCodeAt(i) & 0xFF;
				});
			}, function (err) {
				return err.code !== 404 && repeatOnError ? ContentLoader.loadImgData(url, false) : null;
			});
		},
		preloadImages: function preloadImages(data) {
			var _this18 = this;

			if (!Cfg.preLoadImgs && !Cfg.openImgs && !isPreImg) {
				return;
			}
			var preloadPool = void 0;
			var isPost = data instanceof AbstractPost;
			var els = $Q(aib.qPostImg, isPost ? data.el : data);
			var len = els.length;
			if (isPreImg || Cfg.preLoadImgs) {
				var cImg = 1;
				var mReqs = isPost ? 1 : 4;
				var rarJpgFinder = (isPreImg || Cfg.findImgFile) && new WorkerPool(mReqs, this._detectImgFile, function (err) {
					return console.error('File detector error:', 'line: ' + err.lineno + ' - ' + err.message);
				});
				preloadPool = new TasksPool(mReqs, function (num, data) {
					return _this18.loadImgData(data[0]).then(function (imageData) {
						var _data4 = _slicedToArray(data, 6),
						    url = _data4[0],
						    imgLink = _data4[1],
						    iType = _data4[2],
						    isRepToOrig = _data4[3],
						    el = _data4[4],
						    isVideo = _data4[5];

						if (imageData) {
							var fName = url.substring(url.lastIndexOf('/') + 1);
							var nameLink = $q(aib.qImgNameLink, aib.getImgWrap(el));
							imgLink.setAttribute('download', fName);
							nameLink.setAttribute('download', fName);
							nameLink.setAttribute('de-href', nameLink.href);
							imgLink.href = nameLink.href = window.URL.createObjectURL(new Blob([imageData], { type: iType }));
							if (isVideo) {
								el.setAttribute('de-video', '');
							}
							if (isRepToOrig) {
								el.src = imgLink.href;
							}
							if (rarJpgFinder) {
								rarJpgFinder.runWorker(imageData.buffer, [imageData.buffer], function (info) {
									return _this18._addImgFileIcon(nameLink, fName, info);
								});
							}
						}
						if (_this18.popupId) {
							$popup(_this18.popupId, Lng.loadImage[lang] + ': ' + cImg + '/' + len, true);
						}
						cImg++;
					});
				}, function () {
					_this18.isLoading = false;
					if (_this18.afterFn) {
						_this18.afterFn();
						_this18.afterFn = _this18.popupId = null;
					}
					if (rarJpgFinder) {
						rarJpgFinder.clearWorkers();
					}
				});
				this.isLoading = true;
			}
			for (var i = 0; i < len; ++i) {
				var el = els[i];
				var imgLink = $parent(el, 'A');
				if (!imgLink) {
					continue;
				}
				var isRepToOrig = !!Cfg.openImgs;
				var _url2 = imgLink.href;
				var type = getFileType(_url2);
				var isVideo = type && (type === 'video/webm' || type === 'video/mp4' || type === 'video/ogv');
				if (!type || isVideo && Cfg.preLoadImgs === 2) {
					continue;
				} else if (type === 'image/gif') {
					isRepToOrig &= Cfg.openImgs !== 3;
				} else {
					if (isVideo) {
						isRepToOrig = false;
					}
					isRepToOrig &= Cfg.openImgs !== 2;
				}
				if (preloadPool) {
					preloadPool.runTask([_url2, imgLink, type, isRepToOrig, el, isVideo]);
				} else if (isRepToOrig) {
					el.src = _url2;
				}
			}
			if (preloadPool) {
				preloadPool.completeTasks();
			}
		},


		_canvas: null,
		_thrPool: null,
		_addImgFileIcon: function _addImgFileIcon(nameLink, fName, info) {
			var type = info.type;

			if (typeof type === 'undefined') {
				return;
			}
			var ext = ['7z', 'zip', 'rar', 'ogg', 'mp3'][type];
			nameLink.insertAdjacentHTML('afterend', '<a href="' + window.URL.createObjectURL(new Blob([nav.getUnsafeUint8Array(info.data, info.idx)], {
				type: ['application/x-7z-compressed', 'application/zip', 'application/x-rar-compressed', 'audio/ogg', 'audio/mpeg'][type]
			})) + '" class="de-img-' + (type > 2 ? 'audio' : 'arch') + '" title="' + Lng.downloadFile[lang] + '" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>');
		},

		_detectImgFile: function _detectImgFile(arrBuf) {
			var i = void 0,
			    j = void 0;
			var dat = new Uint8Array(arrBuf);
			var len = dat.length;
			if (dat[0] === 0xFF && dat[1] === 0xD8) {
				for (i = 0, j = 0; i < len - 1; ++i) {
					if (dat[i] === 0xFF) {
						if (dat[i + 1] === 0xD8) {
							j++;
						} else if (dat[i + 1] === 0xD9 && --j === 0) {
							i += 2;
							break;
						}
					}
				}
			} else if (dat[0] === 0x89 && dat[1] === 0x50) {
				for (i = 0; i < len - 7; ++i) {
					if (dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
						i += 8;
						break;
					}
				}
			} else {
				return {};
			}
			if (i === len || len - i <= 60) {
				return {};
			}
			for (len = i + 90; i < len; ++i) {
				if (dat[i] === 0x37 && dat[i + 1] === 0x7A && dat[i + 2] === 0xBC) {
					return { type: 0, idx: i, data: arrBuf };
				} else if (dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
					return { type: 1, idx: i, data: arrBuf };
				} else if (dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
					return { type: 2, idx: i, data: arrBuf };
				} else if (dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
					return { type: 3, idx: i, data: arrBuf };
				} else if (dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
					return { type: 4, idx: i, data: arrBuf };
				}
			}
			return {};
		},
		_getDataFromImg: function _getDataFromImg(el) {
			try {
				var cnv = this._canvas || (this._canvas = doc.createElement('canvas'));
				cnv.width = el.width;
				cnv.height = el.height;
				cnv.getContext('2d').drawImage(el, 0, 0);
				return Promise.resolve(new Uint8Array(atob(cnv.toDataURL('image/png').split(',')[1]).split('').map(function (a) {
					return a.charCodeAt();
				})));
			} catch (err) {
				return this.loadImgData(el.src);
			}
		}
	};


	var DateTime = function () {
		function DateTime(pattern, rPattern, diff, dtLang, onRPat) {
			_classCallCheck(this, DateTime);

			this.pad2 = pad2;
			this.genDateTime = null;
			this.onRPat = null;
			if (DateTime.checkPattern(pattern)) {
				this.disabled = true;
				return;
			}
			this.regex = pattern.replace(/(?:[sihdny]\?){2,}/g, function (str) {
				return '(?:' + str.replace(/\?/g, '') + ')?';
			}).replace(/-/g, '[^<]').replace(/\+/g, '[^0-9<]').replace(/([sihdny]+)/g, '($1)').replace(/[sihdny]/g, '\\d').replace(/m|w/g, '([a-zA-Zа-яА-Я]+)');
			this.pattern = pattern.replace(/[?\-+]+/g, '').replace(/([a-z])\1+/g, '$1');
			this.diff = parseInt(diff, 10);
			this.arrW = Lng.week[dtLang];
			this.arrM = Lng.month[dtLang];
			this.arrFM = Lng.fullMonth[dtLang];
			if (rPattern) {
				this.genDateTime = this.genRFunc(rPattern);
			} else {
				this.onRPat = onRPat;
			}
		}

		_createClass(DateTime, [{
			key: 'genRFunc',
			value: function genRFunc(rPattern) {
				return new Function('dtime', 'return \'' + rPattern.replace('_o', (this.diff < 0 ? '' : '+') + this.diff).replace('_s', "' + this.pad2(dtime.getSeconds()) + '").replace('_i', "' + this.pad2(dtime.getMinutes()) + '").replace('_h', "' + this.pad2(dtime.getHours()) + '").replace('_d', "' + this.pad2(dtime.getDate()) + '").replace('_w', "' + this.arrW[dtime.getDay()] + '").replace('_n', "' + this.pad2(dtime.getMonth() + 1) + '").replace('_m', "' + this.arrM[dtime.getMonth()] + '").replace('_M', "' + this.arrFM[dtime.getMonth()] + '").replace('_y', "' + ('' + dtime.getFullYear()).substring(2) + '").replace('_Y', "' + dtime.getFullYear() + '") + '\';');
			}
		}, {
			key: 'getRPattern',
			value: function getRPattern(txt) {
				var m = txt.match(new RegExp(this.regex));
				if (!m) {
					this.disabled = true;
					return false;
				}
				var rPattern = '';
				for (var i = 1, len = m.length, j = 0, str = m[0]; i < len;) {
					var a = m[i++];
					if (!a) {
						continue;
					}
					var p = this.pattern[i - 2];
					if ((p === 'm' || p === 'y') && a.length > 3) {
						p = p.toUpperCase();
					}
					var k = str.indexOf(a, j);
					rPattern += str.substring(j, k) + '_' + p;
					j = k + a.length;
				}
				if (this.onRPat) {
					this.onRPat(rPattern);
				}
				this.genDateTime = this.genRFunc(rPattern);
				return true;
			}
		}, {
			key: 'fix',
			value: function fix(txt) {
				var _this19 = this;

				if (this.disabled || !this.genDateTime && !this.getRPattern(txt)) {
					return txt;
				}
				return txt.replace(new RegExp(this.regex, 'g'), function (str) {
					for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key = 1; _key < _len2; _key++) {
						args[_key - 1] = arguments[_key];
					}

					var second = void 0,
					    minute = void 0,
					    hour = void 0,
					    day = void 0,
					    month = void 0,
					    year = void 0;
					for (var i = 0; i < 7; ++i) {
						var a = args[i];
						switch (_this19.pattern[i]) {
							case 's':
								second = a;break;
							case 'i':
								minute = a;break;
							case 'h':
								hour = a;break;
							case 'd':
								day = a;break;
							case 'n':
								month = a - 1;break;
							case 'y':
								year = a;break;
							case 'm':
								month = Lng.monthDict[a.slice(0, 3).toLowerCase()] || 0;break;
						}
					}
					var dtime = new Date(year.length === 2 ? '20' + year : year, month, day, hour, minute, second || 0);
					dtime.setHours(dtime.getHours() + _this19.diff);
					return _this19.genDateTime(dtime);
				});
			}
		}], [{
			key: 'checkPattern',
			value: function checkPattern(val) {
				return !val.includes('i') || !val.includes('h') || !val.includes('d') || !val.includes('y') || !(val.includes('n') || val.includes('m')) || /[^?\-+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
			}
		}, {
			key: 'toggleSettings',
			value: function toggleSettings(el) {
				if (el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.timeOffset) || DateTime.checkPattern(Cfg.timePattern))) {
					$popup('err-correcttime', Lng.cTimeError[lang]);
					saveCfg('correctTime', 0);
					el.checked = false;
				}
			}
		}]);

		return DateTime;
	}();


	var Videos = function () {
		function Videos(post) {
			var player = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var playerInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			_classCallCheck(this, Videos);

			this.currentLink = null;
			this.hasLinks = false;
			this.linksCount = 0;
			this.loadedLinksCount = 0;
			this.playerInfo = null;
			this.post = post;
			this.titleLoadFn = null;
			this.vData = [[], []];
			if (player && playerInfo) {
				Object.defineProperty(this, 'player', { value: player });
				this.playerInfo = playerInfo;
			}
		}

		_createClass(Videos, [{
			key: 'addLink',
			value: function addLink(m, loader, link, isYtube) {
				this.hasLinks = true;
				this.linksCount++;
				if (this.playerInfo === null) {
					if (Cfg.addYouTube === 2) {
						this.setPlayer(m, isYtube);
					} else if (Cfg.addYouTube > 2) {
						this._addThumb(m, isYtube);
					}
				} else if (!link && $q('.de-video-link[href*="' + m[1] + '"]', this.post.msg)) {
					return;
				}
				var dataObj = void 0;
				if (loader && (dataObj = Videos._global.vData[+!isYtube][m[1]])) {
					this.vData[+!isYtube].push(dataObj);
				}
				var time = '';

				var _Videos$_fixTime = Videos._fixTime(m[4], m[3], m[2]);

				var _Videos$_fixTime2 = _slicedToArray(_Videos$_fixTime, 4);

				time = _Videos$_fixTime2[0];
				m[2] = _Videos$_fixTime2[1];
				m[3] = _Videos$_fixTime2[2];
				m[4] = _Videos$_fixTime2[3];

				if (link) {
					link.href = link.href.replace(/^http:/, 'https:');
					if (time) {
						link.setAttribute('de-time', time);
					}
					link.className = 'de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo');
				} else {
					var src = isYtube ? aib.prot + '//www.youtube.com/watch?v=' + m[1] + (time ? '#t=' + time : '') : aib.prot + '//vimeo.com/' + m[1];
					link = $bEnd(this.post.msg, '<p class="de-video-ext"><a class="de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo') + (time ? '" de-time="' + time : '') + '" href="' + src + '">' + (dataObj ? '' : src) + '</a></p>').firstChild;
				}
				if (dataObj) {
					Videos.setLinkData(link, dataObj);
				}
				if (this.playerInfo === null || this.playerInfo === m) {
					this.currentLink = link;
				}
				link.videoInfo = m;
				if (Panel.isVidEnabled) {
					updateVideoList($id('de-video-list'), link, this.post.num);
				}
				if (loader && !dataObj) {
					loader.runTask([link, isYtube, this, m[1]]);
				}
			}
		}, {
			key: 'clickLink',
			value: function clickLink(el, mode) {
				var m = el.videoInfo;
				if (this.playerInfo !== m) {
					this.currentLink.classList.remove('de-current');
					this.currentLink = el;
					if (mode > 2) {
						this._addThumb(m, el.classList.contains('de-ytube'));
					} else {
						el.classList.add('de-current');
						this.setPlayer(m, el.classList.contains('de-ytube'));
					}
					return;
				}
				if (mode === 3) {
					if ($q('.de-video-thumb', this.player)) {
						el.classList.add('de-current');
						this.setPlayer(m, el.classList.contains('de-ytube'));
					} else {
						el.classList.remove('de-current');
						this._addThumb(m, el.classList.contains('de-ytube'));
					}
				} else {
					el.classList.remove('de-current');
					$hide(this.player);
					this.player.innerHTML = '';
					this.playerInfo = null;
				}
			}
		}, {
			key: 'setPlayer',
			value: function setPlayer(m, isYtube) {
				Videos.addPlayer(this, m, isYtube);
			}
		}, {
			key: 'updatePost',
			value: function updatePost(oldLinks, newLinks, cloned) {
				var loader = !cloned && Videos._getTitlesLoader();
				var j = 0;
				for (var i = 0, len = newLinks.length; i < len; ++i) {
					var el = newLinks[i];
					var link = oldLinks[j];
					if (link && link.classList.contains('de-current')) {
						this.currentLink = el;
					}
					if (cloned) {
						el.videoInfo = link.videoInfo;
						j++;
					} else {
						var m = el.href.match(Videos.ytReg);
						if (m) {
							this.addLink(m, loader, el, true);
							j++;
						}
					}
				}
				this.currentLink = this.currentLink || newLinks[0];
				if (loader) {
					loader.completeTasks();
				}
			}
		}, {
			key: '_addThumb',
			value: function _addThumb(m, isYtube) {
				var el = this.player;
				this.playerInfo = m;
				el.classList.remove('de-video-expanded');
				$show(el);
				var str = '<a class="de-video-player" href="' + aib.prot;
				if (isYtube) {
					el.innerHTML = str + '//www.youtube.com/watch?v=' + m[1] + '" target="_blank">' + ('<img class="de-video-thumb de-ytube" src="https://i.ytimg.com/vi/' + m[1] + '/0.jpg"></a>');
					return;
				}
				el.innerHTML = str + '//vimeo.com/' + m[1] + '" target="_blank">' + '<img class="de-video-thumb de-vimeo" src=""></a>';
				$ajax(aib.prot + '//vimeo.com/api/v2/video/' + m[1] + '.json', null, false).then(function (xhr) {
					try {
						el.firstChild.firstChild.setAttribute('src', JSON.parse(xhr.responseText)[0].thumbnail_large);
					} catch (err) {}
				});
			}
		}, {
			key: 'player',
			get: function get() {
				var post = this.post;

				var value = aib.insertYtPlayer(post.msg, '<div class="de-video-obj' + (post.images.hasAttachments && !post.isOp ? ' de-video-obj-inline' : '') + '"></div>');
				Object.defineProperty(this, 'player', { value: value });
				return value;
			}
		}], [{
			key: 'addPlayer',
			value: function addPlayer(obj, m, isYtube) {
				var enableJsapi = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

				var el = obj.player;
				obj.playerInfo = m;
				var txt = void 0;
				if (isYtube) {
					var list = m[0].match(/list=[^&#]+/);
					txt = '<iframe class="de-video-player" src="https://www.youtube.com/embed/' + m[1] + '?start=' + (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0) + (enableJsapi ? '&enablejsapi=1' : Cfg.addYouTube === 3 ? '&autoplay=1' : '') + (list ? '&' + list[0] : '') + '" frameborder="0" allowfullscreen></iframe>';
				} else {
					var id = m[1] + (m[2] ? m[2] : '');
					txt = '<iframe class="de-video-player" src="' + aib.prot + '//player.vimeo.com/video/' + id + (Cfg.addYouTube === 3 ? '?autoplay=1' : '') + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
				}
				el.innerHTML = txt + (enableJsapi ? '' : '<span class="de-video-resizer" title="' + Lng.expandVideo[lang] + '"></span>');
				$show(el);
				if (!enableJsapi) {
					el.lastChild.onclick = function (e) {
						return e.target.parentNode.classList.toggle('de-video-expanded');
					};
				}
			}
		}, {
			key: 'setLinkData',
			value: function setLinkData(link, data) {
				var isCloned = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

				var _data5 = _slicedToArray(data, 5),
				    title = _data5[0],
				    author = _data5[1],
				    views = _data5[2],
				    publ = _data5[3],
				    duration = _data5[4];

				if (Panel.isVidEnabled && !isCloned) {
					var clonedLink = $q('.de-entry > .de-video-link[href="' + link.href + '"]:not(title)');
					if (clonedLink) {
						Videos.setLinkData(clonedLink, data, true);
					}
				}
				link.textContent = title;
				link.classList.add('de-video-title');
				link.setAttribute('de-author', author);
				link.title = (duration ? Lng.duration[lang] + duration : '') + (publ ? ', ' + (Lng.published[lang] + publ) + '\n' : '') + Lng.author[lang] + author + (views ? ', ' + Lng.views[lang] + views : '');
			}
		}, {
			key: '_fixTime',
			value: function _fixTime() {
				var seconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var minutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var hours = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				if (seconds >= 60) {
					minutes += Math.floor(seconds / 60);
					seconds %= 60;
				}
				if (minutes >= 60) {
					hours += Math.floor(seconds / 60);
					minutes %= 60;
				}
				return [(hours ? hours + 'h' : '') + (minutes ? minutes + 'm' : '') + (seconds ? seconds + 's' : ''), hours, minutes, seconds];
			}
		}, {
			key: '_getTitlesLoader',
			value: function _getTitlesLoader() {
				return Cfg.YTubeTitles && new TasksPool(4, function (num, info) {
					var _info5 = _slicedToArray(info, 4),
					    isYtube = _info5[1],
					    id = _info5[3];

					if (isYtube) {
						if (Cfg.ytApiKey) {
							return Videos._getYTInfoAPI(info, num, id);
						} else {
							return Videos._getYTInfoOembed(info, num, id);
						}
					}
					return $ajax(aib.prot + '//vimeo.com/api/v2/video/' + id + '.json', null, false).then(function (xhr) {
						var entry = JSON.parse(xhr.responseText)[0];
						return Videos._titlesLoaderHelper(info, num, entry.title, entry.user_name, entry.stats_number_of_plays, /(.*)\s(.*)?/.exec(entry.upload_date)[1], Videos._fixTime(entry.duration)[0]);
					}).catch(function () {
						return Videos._titlesLoaderHelper(info, num);
					});
				}, function () {
					return sesStorage['de-videos-data2'] = JSON.stringify(Videos._global.vData);
				});
			}
		}, {
			key: '_getYTInfoAPI',
			value: function _getYTInfoAPI(info, num, id) {
				return $ajax('https://www.googleapis.com/youtube/v3/videos?key=' + Cfg.ytApiKey + '&id=' + id + '&part=snippet,statistics,contentDetails&fields=items/snippet/title,items/snippet/publishedAt,' + 'items/snippet/channelTitle,items/statistics/viewCount,items/contentDetails/duration', null, false).then(function (xhr) {
					var items = JSON.parse(xhr.responseText).items[0];
					return Videos._titlesLoaderHelper(info, num, items.snippet.title, items.snippet.channelTitle, items.statistics.viewCount, items.snippet.publishedAt.substr(0, 10), items.contentDetails.duration.substr(2).toLowerCase());
				}).catch(function () {
					return Videos._getYTInfoOembed(info, num, id);
				});
			}
		}, {
			key: '_getYTInfoOembed',
			value: function _getYTInfoOembed(info, num, id) {
				return (nav.hasGMXHR ? $ajax('https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D' + id + '&format=json', null, false) : $ajax('https://noembed.com/embed?url=http%3A//youtube.com/watch%3Fv%3D' + id + '&callback=?')).then(function (xhr) {
					var res = xhr.responseText;
					var json = JSON.parse(nav.hasGMXHR ? res : res.replace(/^[^{]+|\)$/g, ''));
					return Videos._titlesLoaderHelper(info, num, json.title, json.author_name, null, null, null);
				}).catch(function () {
					return Videos._titlesLoaderHelper(info, num);
				});
			}
		}, {
			key: '_titlesLoaderHelper',
			value: function _titlesLoaderHelper(_ref20, num) {
				var _ref21 = _slicedToArray(_ref20, 4),
				    link = _ref21[0],
				    isYtube = _ref21[1],
				    videoObj = _ref21[2],
				    id = _ref21[3];

				for (var _len3 = arguments.length, data = Array(_len3 > 2 ? _len3 - 2 : 0), _key2 = 2; _key2 < _len3; _key2++) {
					data[_key2 - 2] = arguments[_key2];
				}

				if (data.length !== 0) {
					Videos.setLinkData(link, data);
					Videos._global.vData[+!isYtube][id] = data;
					videoObj.vData[+!isYtube].push(data);
					if (videoObj.titleLoadFn) {
						videoObj.titleLoadFn(data);
					}
				}
				videoObj.loadedLinksCount++;
				if (num % 30 === 0) {
					return Promise.reject(new TasksPool.PauseError(3e3));
				}
				return new Promise(function (resolve) {
					return setTimeout(resolve, 250);
				});
			}
		}]);

		return Videos;
	}();

	Videos.ytReg = /^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([a-zA-Z0-9-_]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/;
	Videos.vimReg = /^https?:\/\/(?:www\.)?vimeo\.com\/(?:[^?]+\?clip_id=|.*?\/)?(\d+).*?(#t=\d+)?$/;
	Videos._global = {
		get vData() {
			var value = void 0;
			try {
				sesStorage.removeItem('de-videos-data1');
				value = Cfg.YTubeTitles ? JSON.parse(sesStorage['de-videos-data2'] || '[{}, {}]') : [{}, {}];
			} catch (err) {
				value = [{}, {}];
			}
			Object.defineProperty(this, 'vData', { value: value });
			return value;
		}
	};

	var VideosParser = function () {
		function VideosParser() {
			_classCallCheck(this, VideosParser);

			this._loader = Videos._getTitlesLoader();
		}

		_createClass(VideosParser, [{
			key: 'endParser',
			value: function endParser() {
				if (this._loader) {
					this._loader.completeTasks();
				}
			}
		}, {
			key: 'parse',
			value: function parse(data) {
				var isPost = data instanceof AbstractPost;
				var loader = this._loader;
				VideosParser._parserHelper('a[href*="youtu"]', data, loader, isPost, true, Videos.ytReg);
				if (Cfg.addVimeo) {
					VideosParser._parserHelper('a[href*="vimeo.com"]', data, loader, isPost, false, Videos.vimReg);
				}
				var vids = aib.fixVideo(isPost, data);
				for (var i = 0, len = vids.length; i < len; ++i) {
					var _vids$i = _slicedToArray(vids[i], 3),
					    post = _vids$i[0],
					    m = _vids$i[1],
					    isYtube = _vids$i[2];

					if (post) {
						post.videos.addLink(m, loader, null, isYtube);
					}
				}
				return this;
			}
		}], [{
			key: '_parserHelper',
			value: function _parserHelper(qPath, data, loader, isPost, isYtube, reg) {
				var links = $Q(qPath, isPost ? data.el : data);
				for (var i = 0, len = links.length; i < len; ++i) {
					var link = links[i];
					var m = link.href.match(reg);
					if (m) {
						var mPost = isPost ? data : aib.getPostOfEl(link);
						if (mPost) {
							mPost.videos.addLink(m, loader, link, isYtube);
						}
					}
				}
			}
		}]);

		return VideosParser;
	}();



	function embedAudioLinks(data) {
		var isPost = data instanceof AbstractPost;
		if (Cfg.addMP3) {
			var els = $Q('a[href*=".mp3"]', isPost ? data.el : data);
			for (var i = 0, len = els.length; i < len; ++i) {
				var link = els[i];
				if (link.target !== '_blank' && link.rel !== 'nofollow' || !link.pathname.includes('.mp3')) {
					continue;
				}
				var src = link.href;
				var el = (isPost ? data : aib.getPostOfEl(link)).mp3Obj;
				if (nav.canPlayMP3) {
					if (!$q('audio[src="' + src + '"]', el)) {
						el.insertAdjacentHTML('beforeend', '<p><audio src="' + src + '" preload="none" controls></audio></p>');
					}
				} else if (!$q('object[FlashVars*="' + src + '"]', el)) {
					el.insertAdjacentHTML('beforeend', '<object data="' + 'http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" ' + 'wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;' + 'bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;' + 'rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;' + 'text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;' + ('loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + src + '"><br>'));
				}
			}
		}
		if (Cfg.addVocaroo) {
			var _els = $Q('a[href*="vocaroo.com"]', isPost ? data.el : data);
			for (var _i3 = 0, _len4 = _els.length; _i3 < _len4; ++_i3) {
				var _link = _els[_i3];
				var _el6 = _link.previousSibling;
				if (!_el6 || _el6.className !== 'de-vocaroo') {
					_link.insertAdjacentHTML('beforebegin', '<div class="de-vocaroo">\n\t\t\t\t\t<embed src="http://vocaroo.com/player.swf?playMediaID=' + _link.href.split('/').pop() + '" width="148" height="44" wmode="transparent" type="application/x-shockwave-flash">\n\t\t\t\t</div>');
				}
			}
		}
	}


	function $ajax(url) {
		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var useNative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : nativeXHRworks;

		var resolve = void 0,
		    reject = void 0,
		    cancelFn = void 0;
		var needTO = params ? params.useTimeout : false;
		if (!useNative && nav.hasGMXHR) {
			var gmxhr = void 0;
			var toFunc = function toFunc() {
				reject(AjaxError.Timeout);
				try {
					gmxhr.abort();
				} catch (err) {}
			};
			var loadTO = needTO && setTimeout(toFunc, 5e3);
			var obj = {
				method: params && params.method || 'GET',
				url: nav.fixLink(url),
				onreadystatechange: function onreadystatechange(e) {
					if (needTO) {
						clearTimeout(loadTO);
					}
					if (e.readyState === 4) {
						if (aib.isAjaxStatusOK(e.status)) {
							resolve(e);
						} else {
							reject(new AjaxError(e.status, e.statusText));
						}
					} else if (needTO) {
						loadTO = setTimeout(toFunc, 5e3);
					}
				}
			};
			if (params) {
				if (params.onprogress) {
					obj.upload = { onprogress: params.onprogress };
					delete params.onprogress;
				}
				delete params.method;
				Object.assign(obj, params);
			}
			if (nav.isNewGM) {
				GM.xmlHttpRequest(obj);
				cancelFn = emptyFn;
			} else {
				gmxhr = GM_xmlhttpRequest(obj);
				cancelFn = function cancelFn() {
					if (needTO) {
						clearTimeout(loadTO);
					}
					try {
						gmxhr.abort();
					} catch (err) {}
				};
			}
		} else {
			var xhr = new XMLHttpRequest();
			var _toFunc = function _toFunc() {
				reject(AjaxError.Timeout);
				xhr.abort();
			};
			var _loadTO = needTO && setTimeout(_toFunc, 5e3);
			if (params && params.onprogress) {
				xhr.upload.onprogress = params.onprogress;
			}
			xhr.onreadystatechange = function (_ref22) {
				var target = _ref22.target;

				if (needTO) {
					clearTimeout(_loadTO);
				}
				if (target.readyState === 4) {
					if (aib.isAjaxStatusOK(target.status) || target.status === 0 && target.responseType === 'arraybuffer') {
						resolve(target);
					} else {
						reject(new AjaxError(target.status, target.statusText));
					}
				} else if (needTO) {
					_loadTO = setTimeout(_toFunc, 5e3);
				}
			};
			try {
				xhr.open(params && params.method || 'GET', (url[1] === '/' ? aib.prot : url[0] === '/' ? aib.prot + '//' + aib.host : '') + url, true);
				if (params) {
					if (params.responseType) {
						xhr.responseType = params.responseType;
					}
					var headers = params.headers;

					if (headers) {
						for (var h in headers) {
							if (headers.hasOwnProperty(h)) {
								xhr.setRequestHeader(h, headers[h]);
							}
						}
					}
				}
				xhr.send(params && params.data || null);
				cancelFn = function cancelFn() {
					if (needTO) {
						clearTimeout(_loadTO);
					}
					xhr.abort();
				};
			} catch (err) {
				clearTimeout(_loadTO);
				nativeXHRworks = false;
				return $ajax(url, params, false);
			}
		}
		return new CancelablePromise(function (res, rej) {
			resolve = res;
			reject = rej;
		}, cancelFn);
	}

	var AjaxError = function () {
		function AjaxError(code, message) {
			_classCallCheck(this, AjaxError);

			this.code = code;
			this.message = message;
		}

		_createClass(AjaxError, [{
			key: 'toString',
			value: function toString() {
				return this.code <= 0 ? String(this.message || Lng.noConnect[lang]) : 'HTTP [' + this.code + '] ' + this.message;
			}
		}]);

		return AjaxError;
	}();

	AjaxError.Success = new AjaxError(200, 'OK');
	AjaxError.Locked = new AjaxError(-1, { toString: function toString() {
			return Lng.thrClosed[lang];
		} });
	AjaxError.Timeout = new AjaxError(0, { toString: function toString() {
			return Lng.noConnect[lang] + ' (timeout)';
		} });

	var AjaxCache = {
		clearCache: function clearCache() {
			this._data = new Map();
		},

		fixURL: function fixURL(url) {
			return '' + url + (url.includes('?') ? '&' : '?') + 'nocache=' + Math.random();
		},
		runCachedAjax: function runCachedAjax(url, useCache) {
			var _this20 = this;

			var _ref23 = this._data.get(url) || {},
			    hasCacheControl = _ref23.hasCacheControl,
			    params = _ref23.params;

			var ajaxURL = hasCacheControl === false ? this.fixURL(url) : url;
			return $ajax(ajaxURL, useCache && params || { useTimeout: true }).then(function (xhr) {
				return _this20.saveData(url, xhr) ? xhr : $ajax(_this20.fixURL(url), useCache && params);
			});
		},
		saveData: function saveData(url, xhr) {
			var ETag = null;
			var LastModified = null;
			var i = 0;
			var hasCacheControl = false;
			var headers = 'getAllResponseHeaders' in xhr ? xhr.getAllResponseHeaders() : xhr.responseHeaders;
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = headers.split('\r\n')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var header = _step5.value;

					var lHeader = header.toLowerCase();
					if (lHeader.startsWith('cache-control: ')) {
						hasCacheControl = true;
						i++;
					} else if (lHeader.startsWith('last-modified: ')) {
						LastModified = header.substr(15);
						i++;
					} else if (lHeader.startsWith('etag: ')) {
						ETag = header.substr(6);
						i++;
					}
					if (i === 3) {
						break;
					}
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			headers = null;
			if (ETag || LastModified) {
				headers = {};
				if (ETag) {
					headers['If-None-Match'] = ETag;
				}
				if (LastModified) {
					headers['If-Modified-Since'] = LastModified;
				}
			}
			var hasUrl = this._data.has(url);
			this._data.set(url, {
				hasCacheControl: hasCacheControl,
				params: headers ? { headers: headers, useTimeout: true } : { useTimeout: true }
			});
			return hasUrl || hasCacheControl;
		},


		_data: new Map()
	};

	function ajaxLoad(url) {
		var returnForm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
		var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
		var checkArch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		return AjaxCache.runCachedAjax(url, useCache).then(function (xhr) {
			var el = void 0;
			var text = xhr.responseText;
			if (text.includes('</html>')) {
				el = returnForm ? $q(aib.qDForm, $DOM(text)) : $DOM(text);
			}
			return !el ? CancelablePromise.reject(new AjaxError(0, Lng.errCorruptData[lang])) : checkArch ? [el, (xhr.responseURL || '').includes('/arch/')] : el;
		}, function (err) {
			return err.code === 304 ? null : CancelablePromise.reject(err);
		});
	}

	function ajaxPostsLoad(brd, tNum, useCache) {
		if (aib.JsonBuilder) {
			return AjaxCache.runCachedAjax(aib.getJsonApiUrl(brd, tNum), useCache).then(function (xhr) {
				try {
					return new aib.JsonBuilder(JSON.parse(xhr.responseText), brd);
				} catch (err) {
					if (err instanceof AjaxError) {
						return CancelablePromise.reject(err);
					}
					console.warn('API error: ' + err + '. Switching to DOM parsing!');
					aib.JsonBuilder = null;
					return ajaxPostsLoad(brd, tNum, useCache);
				}
			}, function (err) {
				return err.code === 304 ? null : CancelablePromise.reject(err);
			});
		}
		return aib.iichan ? ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache, true).then(function (data) {
			return data && data[0] ? new DOMPostsBuilder(data[0], data[1]) : null;
		}) : ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache).then(function (form) {
			return form ? new DOMPostsBuilder(form) : null;
		});
	}

	function infoLoadErrors(err) {
		var showError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		var isAjax = err instanceof AjaxError;
		var eCode = isAjax ? err.code : 0;
		if (eCode === 200) {
			closePopup('newposts');
		} else if (isAjax && eCode === 0) {
			$popup('newposts', err.message ? String(err.message) : Lng.noConnect[lang]);
		} else {
			$popup('newposts', ' (' + Lng.thrNotFound[lang] + ': \u2116' + aib.t + '): \n' + getErrorMessage(err));
			if (showError) {
				doc.title = '{' + eCode + '} ' + doc.title;
			}
		}
	}


	var Pages = {
		addPage: function addPage() {
			var _this21 = this;

			var pageNum = DelForm.last.pageNum + 1;
			if (this._isAdding || pageNum > aib.lastPage) {
				return;
			}
			this._isAdding = true;
			DelForm.last.el.insertAdjacentHTML('beforeend', '<div class="de-addpage-wait"><hr>' + ('<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' + Lng.loading[lang] + '</div>'));
			MyPosts.purge();
			this._addingPromise = ajaxLoad(aib.getPageUrl(aib.b, pageNum)).then(function (formEl) {
				if (_this21._addForm(formEl, pageNum).firstThr) {
					return _this21._updateForms(DelForm.last);
				}
				_this21._endAdding();
				_this21.addPage();
				return CancelablePromise.reject(new CancelError());
			}).then(function () {
				return _this21._endAdding();
			}).catch(function (err) {
				if (!(err instanceof CancelError)) {
					$popup('add-page', getErrorMessage(err));
					_this21._endAdding();
				}
			});
		},
		loadPages: function () {
			var _ref24 = _asyncToGenerator( regeneratorRuntime.mark(function _callee10(count) {
				var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, form, i, len, first;

				return regeneratorRuntime.wrap(function _callee10$(_context11) {
					while (1) {
						switch (_context11.prev = _context11.next) {
							case 0:
								$popup('load-pages', Lng.loading[lang], true);
								if (this._addingPromise) {
									this._addingPromise.cancelPromise();
									this._endAdding();
								}
								PviewsCache.purge();
								isExpImg = false;
								pByEl = new Map();
								pByNum = new Map();
								Post.hiddenNums = new Set();
								AttachedImage.closeImg();
								if (pr.isQuick) {
									pr.clearForm();
								}
								DelForm.tNums = new Set();
								_iteratorNormalCompletion6 = true;
								_didIteratorError6 = false;
								_iteratorError6 = undefined;
								_context11.prev = 13;
								_iterator6 = DelForm[Symbol.iterator]();

							case 15:
								if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
									_context11.next = 25;
									break;
								}

								form = _step6.value;

								$each($Q('a[href^="blob:"]', form.el), function (el) {
									return URL.revokeObjectURL(el.href);
								});
								$hide(form.el);

								if (!(form === DelForm.last)) {
									_context11.next = 21;
									break;
								}

								return _context11.abrupt('break', 25);

							case 21:
								$del(form.el);

							case 22:
								_iteratorNormalCompletion6 = true;
								_context11.next = 15;
								break;

							case 25:
								_context11.next = 31;
								break;

							case 27:
								_context11.prev = 27;
								_context11.t0 = _context11['catch'](13);
								_didIteratorError6 = true;
								_iteratorError6 = _context11.t0;

							case 31:
								_context11.prev = 31;
								_context11.prev = 32;

								if (!_iteratorNormalCompletion6 && _iterator6.return) {
									_iterator6.return();
								}

							case 34:
								_context11.prev = 34;

								if (!_didIteratorError6) {
									_context11.next = 37;
									break;
								}

								throw _iteratorError6;

							case 37:
								return _context11.finish(34);

							case 38:
								return _context11.finish(31);

							case 39:
								DelForm.first = DelForm.last;
								i = aib.page, len = Math.min(aib.lastPage + 1, aib.page + count);

							case 41:
								if (!(i < len)) {
									_context11.next = 57;
									break;
								}

								_context11.prev = 42;
								_context11.t1 = this;
								_context11.next = 46;
								return ajaxLoad(aib.getPageUrl(aib.b, i));

							case 46:
								_context11.t2 = _context11.sent;
								_context11.t3 = i;

								_context11.t1._addForm.call(_context11.t1, _context11.t2, _context11.t3);

								_context11.next = 54;
								break;

							case 51:
								_context11.prev = 51;
								_context11.t4 = _context11['catch'](42);

								$popup('load-pages', getErrorMessage(_context11.t4));

							case 54:
								++i;
								_context11.next = 41;
								break;

							case 57:
								first = DelForm.first;

								if (!(first !== DelForm.last)) {
									_context11.next = 64;
									break;
								}

								DelForm.first = first.next;
								$del(first.el);
								_context11.next = 63;
								return this._updateForms(DelForm.first);

							case 63:
								closePopup('load-pages');

							case 64:
							case 'end':
								return _context11.stop();
						}
					}
				}, _callee10, this, [[13, 27, 31, 39], [32,, 34, 38], [42, 51]]);
			}));

			function loadPages(_x31) {
				return _ref24.apply(this, arguments);
			}

			return loadPages;
		}(),


		_isAdding: false,
		_addingPromise: null,
		_addForm: function _addForm(formEl, pageNum) {
			formEl = doc.adoptNode(formEl);
			$hide(formEl = aib.fixHTML(formEl));
			$after(DelForm.last.el, formEl);
			var form = new DelForm(formEl, +pageNum, DelForm.last);
			DelForm.last = form;
			form.addStuff();
			if (pageNum !== aib.page && form.firstThr) {
				formEl.insertAdjacentHTML('afterbegin', '<div class="de-page-num">\n\t\t\t\t<center style="font-size: 2em">' + Lng.page[lang] + ' ' + pageNum + '</center>\n\t\t\t\t<hr>\n\t\t\t</div>');
			}
			$show(formEl);
			return form;
		},
		_endAdding: function _endAdding() {
			$del($q('.de-addpage-wait'));
			this._isAdding = false;
			this._addingPromise = null;
		},
		_updateForms: function () {
			var _ref25 = _asyncToGenerator( regeneratorRuntime.mark(function _callee11(newForm) {
				return regeneratorRuntime.wrap(function _callee11$(_context12) {
					while (1) {
						switch (_context12.prev = _context12.next) {
							case 0:
								_context12.t0 = readPostsData;
								_context12.t1 = newForm.firstThr.op;
								_context12.next = 4;
								return readFavorites();

							case 4:
								_context12.t2 = _context12.sent;
								(0, _context12.t0)(_context12.t1, _context12.t2);

								embedPostMsgImages(newForm.el);
								if (pr.passw) {
									PostForm.setUserPassw();
								}
								if (HotKeys.enabled) {
									HotKeys.clearCPost();
								}

							case 9:
							case 'end':
								return _context12.stop();
						}
					}
				}, _callee11, this);
			}));

			function _updateForms(_x32) {
				return _ref25.apply(this, arguments);
			}

			return _updateForms;
		}()
	};

	function toggleInfinityScroll() {
		if (!aib.t) {
			var evtName = 'onwheel' in doc.defaultView ? 'wheel' : 'mousewheel';
			if (Cfg.inftyScroll) {
				doc.defaultView.addEventListener(evtName, toggleInfinityScroll.onwheel);
			} else {
				doc.defaultView.removeEventListener(evtName, toggleInfinityScroll.onwheel);
			}
		}
	}
	toggleInfinityScroll.onwheel = function (e) {
		if ((e.type === 'wheel' ? e.deltaY : -('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta)) > 0) {
			window.requestAnimationFrame(function () {
				if (Thread.last.bottom - 150 < Post.sizing.wHeight) {
					Pages.addPage();
				}
			});
		}
	};


	var Spells = Object.create({
		hash: null,
		get hiders() {
			this._initSpells();
			return this.hiders;
		},
		get list() {
			if (Cfg.spells === null) {
				return '#wipe(samelines,samewords,longwords,symbols,numbers,whitespace)';
			}
			var data = void 0;
			try {
				data = JSON.parse(Cfg.spells);
			} catch (err) {
				return '';
			}

			var _data6 = data,
			    _data7 = _slicedToArray(_data6, 4),
			    s = _data7[1],
			    reps = _data7[2],
			    oreps = _data7[3];

			var str = s ? this._decompileScope(s, '')[0].join('\n') : '';
			if (reps || oreps) {
				if (str) {
					str += '\n\n';
				}
				if (reps) {
					var _iteratorNormalCompletion7 = true;
					var _didIteratorError7 = false;
					var _iteratorError7 = undefined;

					try {
						for (var _iterator7 = reps[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
							var rep = _step7.value;

							str += this._decompileRep(rep, false) + '\n';
						}
					} catch (err) {
						_didIteratorError7 = true;
						_iteratorError7 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion7 && _iterator7.return) {
								_iterator7.return();
							}
						} finally {
							if (_didIteratorError7) {
								throw _iteratorError7;
							}
						}
					}
				}
				if (oreps) {
					var _iteratorNormalCompletion8 = true;
					var _didIteratorError8 = false;
					var _iteratorError8 = undefined;

					try {
						for (var _iterator8 = oreps[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
							var orep = _step8.value;

							str += this._decompileRep(orep, true) + '\n';
						}
					} catch (err) {
						_didIteratorError8 = true;
						_iteratorError8 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion8 && _iterator8.return) {
								_iterator8.return();
							}
						} finally {
							if (_didIteratorError8) {
								throw _iteratorError8;
							}
						}
					}
				}
				str = str.substr(0, str.length - 1);
			}
			return str;
		},
		get names() {
			return ['words', 'exp', 'exph', 'imgn', 'ihash', 'subj', 'name', 'trip', 'img', 'sage', 'op', 'tlen', 'all', 'video', 'wipe', 'num', 'vauthor'];
		},
		get needArg() {
			return [
true, true, true, true, true,
false, true, false, false, false,
false, false, false, false, false,
true, true];
		},
		get outreps() {
			this._initSpells();
			return this.outreps;
		},
		get reps() {
			this._initSpells();
			return this.reps;
		},
		addSpell: function addSpell(type, arg, isNeg) {
			var fld = $id('de-spell-txt');
			var val = fld && fld.value;
			var chk = $q('input[info="hideBySpell"]');
			var spells = val && this.parseText(val);
			if (!val || spells) {
				if (!spells) {
					try {
						spells = JSON.parse(Cfg.spells);
					} catch (err) {}
					spells = spells || [Date.now(), [], null, null];
				}
				var idx = void 0,
				    isAdded = true;
				var scope = aib.t ? [aib.b, aib.t] : null;
				if (spells[1]) {
					var sScope = String(scope);
					var sArg = String(arg);
					spells[1].some(scope && isNeg ? function (spell, i) {
						var data = void 0;
						if (spell[0] === 0xFF && (data = spell[1]) instanceof Array && data.length === 2 && data[0][0] === 0x20C && data[1][0] === type && data[1][2] == null && String(data[1][1]) === sArg && String(data[0][2]) === sScope) {
							idx = i;
							return true;
						}
						return (spell[0] & 0x200) !== 0;
					} : function (spell, i) {
						if (spell[0] === type && String(spell[1]) === sArg && String(spell[2]) === sScope) {
							idx = i;
							return true;
						}
						return (spell[0] & 0x200) !== 0;
					});
				} else {
					spells[1] = [];
				}
				if (typeof idx === 'undefined') {
					if (scope && isNeg) {
						spells[1].unshift([0xFF, [[0x20C, '', scope], [type, arg, void 0]], void 0]);
					} else {
						spells[1].unshift([type, arg, scope]);
					}
				} else if (Cfg.hideBySpell) {
					if (spells[1].length === 1) {
						spells[1] = null;
					} else {
						spells[1].splice(idx, 1);
					}
					isAdded = false;
				}
				if (isAdded) {
					saveCfg('hideBySpell', 1);
					if (chk) {
						chk.checked = true;
					}
				} else if (!spells[1] && !spells[2] && !spells[3]) {
					saveCfg('hideBySpell', 0);
					if (chk) {
						chk.checked = false;
					}
				}
				saveCfg('spells', JSON.stringify(spells));
				this.setSpells(spells, true);
				if (fld) {
					fld.value = this.list;
				}
				Pview.updatePosition(true);
				return;
			}
			if (chk) {
				chk.checked = false;
			}
		},
		decompileSpell: function decompileSpell(type, neg, val, scope) {
			var wipeMsg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

			var spell = (neg ? '!#' : '#') + this.names[type] + (scope ? '[' + scope[0] + (scope[1] ? ',' + (scope[1] === -1 ? '' : scope[1]) : '') + ']' : '');
			if (!val) {
				return spell;
			}
			if (type === 8) {
				return spell + '(' + (val[0] === 2 ? '>' : val[0] === 1 ? '<' : '=') + (val[1] ? val[1][0] + (val[1][1] === val[1][0] ? '' : '-' + val[1][1]) : '') + (val[2] ? '@' + val[2][0] + (val[2][0] === val[2][1] ? '' : '-' + val[2][1]) + 'x' + val[2][2] + (val[2][2] === val[2][3] ? '' : '-' + val[2][3]) : '') + ')';
			} else if (type === 14) {
				if (val === 0x3F && !wipeMsg) {
					return spell;
				}

				var _ref26 = wipeMsg || [],
				    _ref27 = _slicedToArray(_ref26, 2),
				    msgBit = _ref27[0],
				    msgData = _ref27[1];

				var names = [];
				var bits = {
					1: 'samelines',
					2: 'samewords',
					4: 'longwords',
					8: 'symbols',
					16: 'capslock',
					32: 'numbers',
					64: 'whitespace'
				};
				for (var bit in bits) {
					if (+bit !== msgBit && val & +bit) {
						names.push(bits[bit]);
					}
				}
				if (msgBit) {
					names.push(bits[msgBit].toUpperCase() + (msgData ? ': ' + msgData : ''));
				}
				return spell + '(' + names.join(',') + ')';
			} else if (type === 15 || type === 11) {
				var temp_ = void 0,
				    temp = val[1].length - 1;
				if (temp !== -1) {
					for (temp_ = []; temp >= 0; --temp) {
						temp_.push(val[1][temp][0] + '-' + val[1][temp][1]);
					}
					temp_.reverse();
				}
				spell += '(';
				if (val[0].length) {
					spell += val[0].join(',') + (temp_ ? ',' : '');
				}
				if (temp_) {
					spell += temp_.join(',');
				}
				return spell + ')';
			} else if (type === 0 || type === 6 || type === 7 || type === 16) {
				return spell + '(' + val.replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') + ')';
			} else {
				return spell + '(' + String(val) + ')';
			}
		},
		disableSpells: function disableSpells() {
			var value = null;
			var configurable = true;
			Object.defineProperties(this, {
				hiders: { configurable: configurable, value: value },
				outreps: { configurable: configurable, value: value },
				reps: { configurable: configurable, value: value }
			});
			saveCfg('hideBySpell', 0);
		},
		outReplace: function outReplace(txt) {
			var _iteratorNormalCompletion9 = true;
			var _didIteratorError9 = false;
			var _iteratorError9 = undefined;

			try {
				for (var _iterator9 = this.outreps[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
					var orep = _step9.value;

					txt = txt.replace(orep[0], orep[1]);
				}
			} catch (err) {
				_didIteratorError9 = true;
				_iteratorError9 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion9 && _iterator9.return) {
						_iterator9.return();
					}
				} finally {
					if (_didIteratorError9) {
						throw _iteratorError9;
					}
				}
			}

			return txt;
		},
		parseText: function parseText(text) {
			var codeGen = new SpellsCodegen(text);
			var data = codeGen.generate();
			if (codeGen.hasError) {
				$popup('err-spell', Lng.error[lang] + ': ' + codeGen.errorSpell);
			} else if (data) {
				if (data[0] && Cfg.sortSpells) {
					this._sort(data[0]);
				}
				return [Date.now()].concat(_toConsumableArray(data));
			}
			return null;
		},
		replace: function replace(txt) {
			var _iteratorNormalCompletion10 = true;
			var _didIteratorError10 = false;
			var _iteratorError10 = undefined;

			try {
				for (var _iterator10 = this.reps[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
					var rep = _step10.value;

					txt = txt.replace(rep[0], rep[1]);
				}
			} catch (err) {
				_didIteratorError10 = true;
				_iteratorError10 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion10 && _iterator10.return) {
						_iterator10.return();
					}
				} finally {
					if (_didIteratorError10) {
						throw _iteratorError10;
					}
				}
			}

			return txt;
		},
		setSpells: function setSpells(spells, sync) {
			if (sync) {
				this._sync(spells);
			}
			if (!Cfg.hideBySpell) {
				SpellsRunner.unhideAll();
				this.disableSpells();
				return;
			}
			this._optimize(spells);
			if (this.hiders) {
				var sRunner = new SpellsRunner();
				for (var post = Thread.first.op; post; post = post.next) {
					sRunner.runSpells(post);
				}
				sRunner.endSpells();
			} else {
				SpellsRunner.unhideAll();
			}
		},
		toggle: function toggle() {
			var spells = void 0;
			var fld = $id('de-spell-txt');
			var val = fld.value;
			if (val && (spells = this.parseText(val))) {
				closePopup('err-spell');
				this.setSpells(spells, true);
				saveCfg('spells', JSON.stringify(spells));
				fld.value = this.list;
			} else {
				if (!val) {
					closePopup('err-spell');
					SpellsRunner.unhideAll();
					this.disableSpells();
					saveCfg('spells', JSON.stringify([Date.now(), null, null, null]));
					sendStorageEvent('__de-spells', '{ hide: false, data: null }');
				}
				$q('input[info="hideBySpell"]').checked = false;
			}
		},
		_decompileRep: function _decompileRep(rep, isOrep) {
			return (isOrep ? '#outrep' : '#rep') + (rep[0] ? '[' + rep[0] + (rep[1] ? ',' + (rep[1] === -1 ? '' : rep[1]) : '') + ']' : '') + ('(' + rep[2] + ',' + rep[3].replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') + ')');
		},
		_decompileScope: function _decompileScope(scope, indent) {
			var dScope = [];
			var hScope = false;
			for (var i = 0, j = 0, len = scope.length; i < len; ++i, ++j) {
				var spell = scope[i];
				var type = spell[0] & 0xFF;
				if (type === 0xFF) {
					hScope = true;
					var temp = this._decompileScope(spell[1], indent + '    ');
					if (temp[1]) {
						var str = '' + (spell[0] & 0x100 ? '!(\n' : '(\n') + indent + '    ' + (temp[0].join('\n' + indent + '    ') + '\n' + indent + ')');
						if (j === 0) {
							dScope[0] = str;
						} else {
							dScope[--j] += ' ' + str;
						}
					} else {
						dScope[j] = '' + (spell[0] & 0x100 ? '!(' : '(') + temp[0].join(' ') + ')';
					}
				} else {
					dScope[j] = this.decompileSpell(type, spell[0] & 0x100, spell[1], spell[2]);
				}
				if (i !== len - 1) {
					dScope[j] += spell[0] & 0x200 ? ' &' : ' |';
				}
			}
			return [dScope, dScope.length > 2 || hScope];
		},
		_initSpells: function _initSpells() {
			if (!Cfg.hideBySpell) {
				var value = null;
				var configurable = true;
				Object.defineProperties(this, {
					hiders: { configurable: configurable, value: value },
					outreps: { configurable: configurable, value: value },
					reps: { configurable: configurable, value: value }
				});
				return;
			}
			var spells = void 0,
			    data = void 0;
			try {
				spells = JSON.parse(Cfg.spells);
				data = JSON.parse(sesStorage['de-spells-' + aib.b + (aib.t || '')]);
			} catch (err) {}
			if (data && spells && data[0] === spells[0]) {
				this.hash = data[0];
				this._setData(data[1], data[2], data[3]);
				return;
			}
			if (spells) {
				this._optimize(spells);
			} else {
				this.disableSpells();
			}
		},
		_initHiders: function _initHiders(data) {
			if (data) {
				var _iteratorNormalCompletion11 = true;
				var _didIteratorError11 = false;
				var _iteratorError11 = undefined;

				try {
					for (var _iterator11 = data[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
						var item = _step11.value;

						var val = item[1];
						if (val) {
							switch (item[0] & 0xFF) {
								case 1:
								case 2:
								case 3:
								case 5:
								case 13:
									item[1] = toRegExp(val, true);break;
								case 0xFF:
									this._initHiders(val);
							}
						}
					}
				} catch (err) {
					_didIteratorError11 = true;
					_iteratorError11 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion11 && _iterator11.return) {
							_iterator11.return();
						}
					} finally {
						if (_didIteratorError11) {
							throw _iteratorError11;
						}
					}
				}
			}
			return data;
		},
		_initReps: function _initReps(data) {
			if (data) {
				var _iteratorNormalCompletion12 = true;
				var _didIteratorError12 = false;
				var _iteratorError12 = undefined;

				try {
					for (var _iterator12 = data[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
						var item = _step12.value;

						item[0] = toRegExp(item[0], false);
					}
				} catch (err) {
					_didIteratorError12 = true;
					_iteratorError12 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion12 && _iterator12.return) {
							_iterator12.return();
						}
					} finally {
						if (_didIteratorError12) {
							throw _iteratorError12;
						}
					}
				}
			}
			return data;
		},
		_optimize: function _optimize(data) {
			var arr = [data[1] ? this._optimizeSpells(data[1]) : null, data[2] ? this._optimizeReps(data[2]) : null, data[3] ? this._optimizeReps(data[3]) : null];
			sesStorage['de-spells-' + aib.b + (aib.t || '')] = JSON.stringify([data[0]].concat(arr));
			this.hash = data[0];
			this._setData.apply(this, arr);
		},
		_optimizeReps: function _optimizeReps(data) {
			var rv = [];
			var _iteratorNormalCompletion13 = true;
			var _didIteratorError13 = false;
			var _iteratorError13 = undefined;

			try {
				for (var _iterator13 = data[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
					var _ref28 = _step13.value;

					var _ref29 = _slicedToArray(_ref28, 4);

					var r0 = _ref29[0];
					var r1 = _ref29[1];
					var r2 = _ref29[2];
					var r3 = _ref29[3];

					if (!r0 || r0 === aib.b && (r1 === -1 ? !aib.t : !r1 || +r1 === aib.t)) {
						rv.push([r2, r3]);
					}
				}
			} catch (err) {
				_didIteratorError13 = true;
				_iteratorError13 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion13 && _iterator13.return) {
						_iterator13.return();
					}
				} finally {
					if (_didIteratorError13) {
						throw _iteratorError13;
					}
				}
			}

			return !rv.length ? null : rv;
		},
		_optimizeSpells: function _optimizeSpells(spells) {
			var neg = void 0,
			    lastSpell = -1;
			var newSpells = [];
			for (var i = 0, len = spells.length; i < len; ++i) {
				var j = void 0;
				var spell = spells[i];
				var flags = spell[0];
				var type = flags & 0xFF;
				neg = (flags & 0x100) !== 0;
				if (type === 0xFF) {
					var parensSpells = this._optimizeSpells(spell[1]);
					if (parensSpells) {
						if (parensSpells.length !== 1) {
							newSpells.push([flags, parensSpells]);
							lastSpell++;
							continue;
						} else if ((parensSpells[0][0] & 0xFF) !== 12) {
							newSpells.push([(parensSpells[0][0] | flags & 0x200) ^ flags & 0x100, parensSpells[0][1]]);
							lastSpell++;
							continue;
						}
						flags = parensSpells[0][0];
						neg = !(neg ^ (flags & 0x100) !== 0);
					}
				} else {
					var scope = spell[2];
					if (!scope || scope[0] === aib.b && (scope[1] === -1 ? !aib.t : !scope[1] || +scope[1] === aib.t)) {
						if (type === 12) {
							neg = !neg;
						} else {
							newSpells.push([flags, spell[1]]);
							lastSpell++;
							continue;
						}
					}
				}
				for (j = lastSpell; j >= 0 && (newSpells[j][0] & 0x200) !== 0 ^ neg; --j) {}
				if (j !== lastSpell) {
					newSpells = newSpells.slice(0, j + 1);
					lastSpell = j;
				}
				if (neg && j !== -1) {
					newSpells[j][0] &= 0x1FF;
				}
				if ((flags & 0x200) !== 0 ^ neg) {
					break;
				}
			}
			return lastSpell === -1 ? neg ? [[12, '']] : null : newSpells;
		},
		_setData: function _setData(hiders, reps, outreps) {
			var configurable = true;
			Object.defineProperties(this, {
				hiders: { configurable: configurable, value: this._initHiders(hiders) },
				outreps: { configurable: configurable, value: this._initReps(outreps) },
				reps: { configurable: configurable, value: this._initReps(reps) }
			});
		},
		_sort: function _sort(sp) {
			for (var i = 0, len = sp.length - 1; i < len; ++i) {
				if (sp[i][0] > 0x200) {
					var temp = [0xFF, []];
					do {
						temp[1].push(sp.splice(i, 1)[0]);
						len--;
					} while (sp[i][0] > 0x200);
					temp[1].push(sp.splice(i, 1)[0]);
					sp.splice(i, 0, temp);
				}
			}
			sp = sp.sort();
			for (var _i4 = 0, _len5 = sp.length - 1; _i4 < _len5; ++_i4) {
				var j = _i4 + 1;
				if (sp[_i4][0] === sp[j][0] && sp[_i4][1] <= sp[j][1] && sp[_i4][1] >= sp[j][1] && (sp[_i4][2] === null || 
				sp[_i4][2] === undefined || 
				sp[_i4][2] <= sp[j][2] && sp[_i4][2] >= sp[j][2])) {
					sp.splice(j, 1);
					_i4--;
					_len5--;
				} else if (sp[_i4][0] === 0xFF) {
					sp.push(sp.splice(_i4, 1)[0]);
					_i4--;
					_len5--;
				}
			}
		},
		_sync: function _sync(data) {
			sendStorageEvent('__de-spells', { hide: !!Cfg.hideBySpell, data: data });
		}
	});

	var SpellsCodegen = function () {
		function SpellsCodegen(sList) {
			_classCallCheck(this, SpellsCodegen);

			this.TYPE_UNKNOWN = 0;
			this.TYPE_ANDOR = 1;
			this.TYPE_NOT = 2;
			this.TYPE_SPELL = 3;
			this.TYPE_PARENTHESES = 4;
			this.TYPE_REPLACER = 5;
			this.hasError = false;
			this._col = 1;
			this._errMsg = '';
			this._errMsgArg = null;
			this._line = 1;
			this._sList = sList;
		}

		_createClass(SpellsCodegen, [{
			key: 'generate',
			value: function generate() {
				return this._sList ? this._generate(this._sList, false) : null;
			}
		}, {
			key: '_generate',
			value: function _generate(sList, inParens) {
				var spellsArr = [];
				var reps = [];
				var outreps = [];
				var lastType = this.TYPE_UNKNOWN;
				var hasReps = false;
				for (var i = 0, len = sList.length; i < len; i++, this._col++) {
					var res = void 0;
					switch (sList[i]) {
						case '\n':
							this._line++;
							this._col = 0;
						case '\r':
						case ' ':
							continue;
						case '#':
							{
								var name = '';
								i++;
								this._col++;
								while (sList[i] >= 'a' && sList[i] <= 'z' || sList[i] >= 'A' && sList[i] <= 'Z') {
									name += sList[i].toLowerCase();
									i++;
									this._col++;
								}
								if (name === 'rep' || name === 'outrep') {
									if (!hasReps) {
										if (inParens) {
											this._col -= 1 + name.length;
											this._setError(Lng.seRepsInParens[lang], '#' + name);
											return null;
										}
										if (lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
											i -= 1 + name.length;
											this._col -= 1 + name.length;
											lookBack: while (i >= 0) {
												switch (sList[i]) {
													case '\n':
													case '\r':
													case ' ':
														i--;
														this._col--;
														break;
													default:
														break lookBack;
												}
											}
											this._setError(Lng.seOpInReps[lang], sList[i]);
											return null;
										}
										hasReps = true;
									}
									res = this._doRep(name, sList.substr(i));
									if (!res) {
										return null;
									}
									(name === 'rep' ? reps : outreps).push(res[1]);
									i += res[0] - 1;
									this._col += res[0] - 1;
									lastType = this.TYPE_REPLACER;
								} else {
									if (lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
										this._setError(Lng.seMissOp[lang], null);
										return null;
									}
									res = this._doSpell(name, sList.substr(i), lastType === this.TYPE_NOT);
									if (!res) {
										return null;
									}
									i += res[0] - 1;
									this._col += res[0] - 1;
									spellsArr.push(res[1]);
									lastType = this.TYPE_SPELL;
								}
								break;
							}
						case '(':
							if (hasReps) {
								this._setError(Lng.seUnexpChar[lang], '(');
								return null;
							}
							if (lastType === this.TYPE_SPELL || lastType === this.TYPE_PARENTHESES) {
								this._setError(Lng.seMissOp[lang], null);
								return null;
							}
							res = this._generate(sList.substr(i + 1), true);
							if (!res) {
								return null;
							}
							i += res[0] + 1;
							spellsArr.push([lastType === this.TYPE_NOT ? 0x1FF : 0xFF, res[1]]);
							lastType = this.TYPE_PARENTHESES;
							break;
						case '|':
						case '&':
							if (hasReps) {
								this._setError(Lng.seUnexpChar[lang], sList[i]);
								return null;
							}
							if (lastType !== this.TYPE_SPELL && lastType !== this.TYPE_PARENTHESES) {
								this._setError(Lng.seMissSpell[lang], null);
								return null;
							}
							if (sList[i] === '&') {
								spellsArr[spellsArr.length - 1][0] |= 0x200;
							}
							lastType = this.TYPE_ANDOR;
							break;
						case '!':
							if (hasReps) {
								this._setError(Lng.seUnexpChar[lang], '!');
								return null;
							}
							if (lastType !== this.TYPE_ANDOR && lastType !== this.TYPE_UNKNOWN) {
								this._setError(Lng.seMissOp[lang], null);
								return null;
							}
							lastType = this.TYPE_NOT;
							break;
						case ')':
							if (hasReps) {
								this._setError(Lng.seUnexpChar[lang], ')');
								return null;
							}
							if (lastType === this.TYPE_ANDOR || lastType === this.TYPE_NOT) {
								this._setError(Lng.seMissSpell[lang], null);
								return null;
							}
							if (inParens) {
								return [i, spellsArr];
							}
						default:
							this._setError(Lng.seUnexpChar[lang], sList[i]);
							return null;
					}
				}
				if (inParens) {
					this._setError(Lng.seMissClBkt[lang], null);
					return null;
				}
				if (lastType !== this.TYPE_SPELL && lastType !== this.TYPE_PARENTHESES && lastType !== this.TYPE_REPLACER) {
					this._setError(Lng.seMissSpell[lang], null);
					return null;
				}
				if (!reps.length) {
					reps = false;
				}
				if (!outreps.length) {
					outreps = false;
				}
				return [spellsArr, reps, outreps];
			}
		}, {
			key: '_getRegex',
			value: function _getRegex(str, haveComma) {
				var m = str.match(/^\((\/.*?[^\\]\/[igm]*)(?:\)|\s*(,))/);
				if (!m || haveComma !== Boolean(m[2])) {
					return null;
				}
				var val = m[1];
				try {
					toRegExp(val, true);
				} catch (err) {
					this._setError(Lng.seErrRegex[lang], val);
					return null;
				}
				return [m[0].length, val];
			}
		}, {
			key: '_doRep',
			value: function _doRep(name, str) {
				var scope = SpellsCodegen._getScope(str);
				if (scope) {
					str = str.substring(scope[0]);
				} else {
					scope = [0, ['', '']];
				}
				var regex = this._getRegex(str, true);
				if (regex) {
					str = str.substring(regex[0]);
					if (str[0] === ')') {
						return [regex[0] + scope[0] + 1, [scope[1][0], scope[1][1], regex[1], '']];
					}
					var val = SpellsCodegen._getText(str, false);
					if (val) {
						return [val[0] + regex[0] + scope[0], [scope[1][0], scope[1][1], regex[1], val[1]]];
					}
				}
				this._setError(Lng.seSyntaxErr[lang], name);
				return null;
			}
		}, {
			key: '_doSpell',
			value: function _doSpell(name, str, isNeg) {
				var m = void 0,
				    val = void 0,
				    scope = null,
				    i = 0;
				var spellIdx = Spells.names.indexOf(name);
				if (spellIdx === -1) {
					this._setError(Lng.seUnknown[lang], name);
					return null;
				}
				var temp = SpellsCodegen._getScope(str);
				if (temp) {
					i += temp[0];
					str = str.substring(temp[0]);
					scope = temp[1];
				}
				var spellType = isNeg ? spellIdx | 0x100 : spellIdx;
				if (str[0] !== '(' || str[1] === ')') {
					if (Spells.needArg[spellIdx]) {
						this._setError(Lng.seMissArg[lang], name);
						return null;
					}
					return [str[0] === '(' ? i + 2 : i, [spellType, spellIdx === 14 ? 0x3F : '', scope]];
				}
				switch (spellIdx) {
					case 4:
						m = str.match(/^\((\d+)\)/);
						if (!isNaN(+m[1])) {
							return [i + m[0].length, [spellType, +m[1], scope]];
						}
						break;
					case 8:
						m = str.match(/^\(([><=])(?:(\d+(?:\.\d+)?)(?:-(\d+(?:\.\d+)?))?)?(?:@(\d+)(?:-(\d+))?x(\d+)(?:-(\d+))?)?\)/);
						if (m && (m[2] || m[4])) {
							return [i + m[0].length, [spellType, [m[1] === '=' ? 0 : m[1] === '<' ? 1 : 2, m[2] && [+m[2], m[3] ? +m[3] : +m[2]], m[4] && [+m[4], m[5] ? +m[5] : +m[4], +m[6], m[7] ? +m[7] : +m[6]]], scope]];
						}
						break;
					case 14:
						m = str.match(/^\(([a-z, ]+)\)/);
						if (m) {
							val = m[1].split(/, */).reduce(function (val, str) {
								switch (str) {
									case 'samelines':
										return val |= 1;
									case 'samewords':
										return val |= 2;
									case 'longwords':
										return val |= 4;
									case 'symbols':
										return val |= 8;
									case 'capslock':
										return val |= 16;
									case 'numbers':
										return val |= 32;
									case 'whitespace':
										return val |= 64;
									default:
										return -1;
								}
							}, 0);
							if (val !== -1) {
								return [i + m[0].length, [spellType, val, scope]];
							}
						}
						break;
					case 11:
					case 15:
						m = str.match(/^\(([\d-, ]+)\)/);
						if (m) {
							m[1].split(/, */).forEach(function (v) {
								if (v.includes('-')) {
									var nums = v.split('-');
									nums[0] = +nums[0];
									nums[1] = +nums[1];
									this[1].push(nums);
								} else {
									this[0].push(+v);
								}
							}, val = [[], []]);
							return [i + m[0].length, [spellType, val, scope]];
						}
						break;
					case 1:
					case 2:
					case 3:
					case 5:
					case 13:
						temp = this._getRegex(str, false);
						if (temp) {
							return [i + temp[0], [spellType, temp[1], scope]];
						}
						break;
					default:
						temp = SpellsCodegen._getText(str, true);
						if (temp) {
							return [i + temp[0], [spellType, spellIdx === 0 ? temp[1].toLowerCase() : temp[1], scope]];
						}
				}
				this._setError(Lng.seSyntaxErr[lang], name);
				return null;
			}
		}, {
			key: '_setError',
			value: function _setError(msg, arg) {
				this.hasError = true;
				this._errMsg = msg;
				this._errMsgArg = arg;
			}
		}, {
			key: 'errorSpell',
			get: function get() {
				return !this.hasError ? '' : (this._errMsgArg ? this._errMsg.replace('%s', this._errMsgArg) : this._errMsg) + Lng.seRow[lang] + this._line + Lng.seCol[lang] + this._col + ')';
			}
		}], [{
			key: '_getScope',
			value: function _getScope(str) {
				var m = str.match(/^\[([a-z0-9/]+)(?:(,)|,(\s*[0-9]+))?\]/);
				return m ? [m[0].length, [m[1], m[3] ? +m[3] : m[2] ? -1 : false]] : null;
			}
		}, {
			key: '_getText',
			value: function _getText(str, haveBracket) {
				if (haveBracket && str[0] !== '(') {
					return [0, ''];
				}
				var rv = '';
				for (var i = haveBracket ? 1 : 0, len = str.length; i < len; ++i) {
					var ch = str[i];
					if (ch === '\\') {
						if (i === len - 1) {
							return null;
						}
						switch (str[i + 1]) {
							case 'n':
								rv += '\n';break;
							case '\\':
								rv += '\\';break;
							case ')':
								rv += ')';break;
							default:
								return null;
						}
						++i;
					} else if (ch === ')') {
						return [i + 1, rv];
					} else {
						rv += ch;
					}
				}
				return null;
			}
		}]);

		return SpellsCodegen;
	}();

	var SpellsRunner = function () {
		function SpellsRunner() {
			_classCallCheck(this, SpellsRunner);

			this.hasNumSpell = false;
			this._endPromise = null;
			this._spells = Spells.hiders;
			if (!this._spells) {
				this.runSpells = SpellsRunner._unhidePost;
				SpellsRunner.cachedData = null;
			}
		}

		_createClass(SpellsRunner, [{
			key: 'endSpells',
			value: function endSpells() {
				var _this22 = this;

				if (this._endPromise) {
					this._endPromise.then(function () {
						return _this22._savePostsHelper();
					});
				} else {
					this._savePostsHelper();
				}
			}
		}, {
			key: 'runSpells',
			value: function runSpells(post) {
				var _this23 = this;

				var res = new SpellsInterpreter(post, this._spells).runInterpreter();
				if (res instanceof Promise) {
					res = res.then(function (val) {
						return _this23._checkRes(post, val);
					});
					this._endPromise = this._endPromise ? this._endPromise.then(function () {
						return res;
					}) : res;
					return 0;
				}
				return this._checkRes(post, res);
			}
		}, {
			key: '_checkRes',
			value: function _checkRes(post, _ref30) {
				var _ref31 = _slicedToArray(_ref30, 3),
				    hasNumSpell = _ref31[0],
				    val = _ref31[1],
				    msg = _ref31[2];

				this.hasNumSpell |= hasNumSpell;
				if (val) {
					post.spellHide(msg);
					if (SpellsRunner.cachedData && !post.isDeleted) {
						SpellsRunner.cachedData[post.count] = [true, msg];
					}
					return 1;
				}
				return SpellsRunner._unhidePost(post);
			}
		}, {
			key: '_savePostsHelper',
			value: function _savePostsHelper() {
				if (this._spells) {
					if (aib.t) {
						var lPost = Thread.first.lastNotDeleted;
						var data = null;
						if (Spells.hiders) {
							if (SpellsRunner.cachedData) {
								data = SpellsRunner.cachedData;
							} else {
								data = [];
								for (var post = Thread.first.op; post; post = post.nextNotDeleted) {
									data.push(post.spellHidden ? [true, Post.Note.text] : [false, null]);
								}
								SpellsRunner.cachedData = data;
							}
						}
						sesStorage['de-hidden-' + aib.b + aib.t] = !data ? null : JSON.stringify({
							hash: Cfg.hideBySpell ? Spells.hash : 0,
							lastCount: lPost.count,
							lastNum: lPost.num,
							data: data
						});
					}
					toggleWindow('hid', true);
				}
				ImagesHashStorage.endFn();
			}
		}], [{
			key: 'unhideAll',
			value: function unhideAll() {
				if (aib.t) {
					sesStorage['de-hidden-' + aib.b + aib.t] = null;
				}
				for (var post = Thread.first.op; post; post = post.next) {
					if (post.spellHidden) {
						post.spellUnhide();
					}
				}
			}
		}, {
			key: '_unhidePost',
			value: function _unhidePost(post) {
				if (post.spellHidden) {
					post.spellUnhide();
					if (SpellsRunner.cachedData && !post.isDeleted) {
						SpellsRunner.cachedData[post.count] = [false, null];
					}
				}
				return 0;
			}
		}]);

		return SpellsRunner;
	}();

	SpellsRunner.cachedData = null;

	var SpellsInterpreter = function () {
		function SpellsInterpreter(post, spells) {
			_classCallCheck(this, SpellsInterpreter);

			this.hasNumSpell = false;
			this._ctx = [spells.length, spells, 0, false];
			this._deep = 0;
			this._lastTSpells = [];
			this._post = post;
			this._triggeredSpellsStack = [this._lastTSpells];
			this._wipeMsg = null;
		}

		_createClass(SpellsInterpreter, [{
			key: 'runInterpreter',
			value: function runInterpreter() {
				var _this24 = this;

				var rv = void 0,
				    stopCheck = void 0;
				var isNegScope = this._ctx.pop();
				var i = this._ctx.pop();
				var scope = this._ctx.pop();
				var len = this._ctx.pop();
				while (true) {
					if (i < len) {
						var type = scope[i][0] & 0xFF;
						if (type === 0xFF) {
							this._deep++;
							this._ctx.push(len, scope, i, isNegScope);
							isNegScope = !!((scope[i][0] & 0x100) !== 0 ^ isNegScope);
							scope = scope[i][1];
							len = scope.length;
							i = 0;
							this._lastTSpells = [];
							this._triggeredSpellsStack.push(this._lastTSpells);
							continue;
						}
						var val = this._runSpell(type, scope[i][1]);
						if (val instanceof Promise) {
							this._ctx.push(len, scope, ++i, isNegScope);
							return val.then(function (v) {
								return _this24._asyncContinue(v);
							});
						}

						var _checkRes2 = this._checkRes(scope[i], val, isNegScope);

						var _checkRes3 = _slicedToArray(_checkRes2, 2);

						rv = _checkRes3[0];
						stopCheck = _checkRes3[1];

						if (!stopCheck) {
							i++;
							continue;
						}
					}
					if (this._deep !== 0) {
						this._deep--;
						isNegScope = this._ctx.pop();
						i = this._ctx.pop();
						scope = this._ctx.pop();
						len = this._ctx.pop();
						if ((scope[i][0] & 0x200) === 0 ^ rv) {
							i++;
							this._triggeredSpellsStack.pop();
							this._lastTSpells = this._triggeredSpellsStack[this._triggeredSpellsStack.length - 1];
							continue;
						}
					}
					return [this.hasNumSpell, rv, rv ? this._getMsg() : null];
				}
			}
		}, {
			key: '_asyncContinue',
			value: function _asyncContinue(val) {
				var cl = this._ctx.length;
				var spell = this._ctx[cl - 3][this._ctx[cl - 2] - 1];

				var _checkRes4 = this._checkRes(spell, val, this._ctx[cl - 1]),
				    _checkRes5 = _slicedToArray(_checkRes4, 2),
				    rv = _checkRes5[0],
				    stopCheck = _checkRes5[1];

				return stopCheck ? [this.hasNumSpell, rv, rv ? this._getMsg() : null] : this.runInterpreter();
			}
		}, {
			key: '_checkRes',
			value: function _checkRes(spell, val, isNegScope) {
				var flags = spell[0];
				var isAndSpell = (flags & 0x200) !== 0 ^ isNegScope;
				var isNegSpell = (flags & 0x100) !== 0 ^ isNegScope;
				if (isNegSpell ^ val) {
					this._lastTSpells.push([isNegSpell, spell, (spell[0] & 0xFF) === 14 ? this._wipeMsg : null]);
					return [true, !isAndSpell];
				}
				this._lastTSpells.length = 0;
				return [false, isAndSpell];
			}
		}, {
			key: '_getMsg',
			value: function _getMsg() {
				var rv = [];
				var _iteratorNormalCompletion14 = true;
				var _didIteratorError14 = false;
				var _iteratorError14 = undefined;

				try {
					for (var _iterator14 = this._triggeredSpellsStack[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
						var spellEls = _step14.value;
						var _iteratorNormalCompletion15 = true;
						var _didIteratorError15 = false;
						var _iteratorError15 = undefined;

						try {
							for (var _iterator15 = spellEls[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
								var _ref32 = _step15.value;

								var _ref33 = _slicedToArray(_ref32, 3);

								var isNeg = _ref33[0];
								var spell = _ref33[1];
								var wipeMsg = _ref33[2];

								rv.push(Spells.decompileSpell(spell[0] & 0xFF, isNeg, spell[1], spell[2], wipeMsg));
							}
						} catch (err) {
							_didIteratorError15 = true;
							_iteratorError15 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion15 && _iterator15.return) {
									_iterator15.return();
								}
							} finally {
								if (_didIteratorError15) {
									throw _iteratorError15;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError14 = true;
					_iteratorError14 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion14 && _iterator14.return) {
							_iterator14.return();
						}
					} finally {
						if (_didIteratorError14) {
							throw _iteratorError14;
						}
					}
				}

				return rv.join(' & ');
			}
		}, {
			key: '_runSpell',
			value: function _runSpell(spellId, val) {
				switch (spellId) {
					case 0:
						return this._words(val);
					case 1:
						return this._exp(val);
					case 2:
						return this._exph(val);
					case 3:
						return this._imgn(val);
					case 4:
						return this._ihash(val);
					case 5:
						return this._subj(val);
					case 6:
						return this._name(val);
					case 7:
						return this._trip(val);
					case 8:
						return this._img(val);
					case 9:
						return this._sage(val);
					case 10:
						return this._op(val);
					case 11:
						return this._tlen(val);
					case 12:
						return this._all(val);
					case 13:
						return this._video(val);
					case 14:
						return this._wipe(val);
					case 15:
						this.hasNumSpell = true;
						return this._num(val);
					case 16:
						return this._vauthor(val);
				}
			}
		}, {
			key: '_all',
			value: function _all() {
				return true;
			}
		}, {
			key: '_exp',
			value: function _exp(val) {
				return val.test(this._post.text);
			}
		}, {
			key: '_exph',
			value: function _exph(val) {
				return val.test(this._post.html);
			}
		}, {
			key: '_ihash',
			value: function () {
				var _ref34 = _asyncToGenerator( regeneratorRuntime.mark(function _callee12(val) {
					var _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, image;

					return regeneratorRuntime.wrap(function _callee12$(_context13) {
						while (1) {
							switch (_context13.prev = _context13.next) {
								case 0:
									_iteratorNormalCompletion16 = true;
									_didIteratorError16 = false;
									_iteratorError16 = undefined;
									_context13.prev = 3;
									_iterator16 = this._post.images[Symbol.iterator]();

								case 5:
									if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
										_context13.next = 19;
										break;
									}

									image = _step16.value;
									_context13.t0 = image instanceof AttachedImage;

									if (!_context13.t0) {
										_context13.next = 14;
										break;
									}

									_context13.next = 11;
									return ImagesHashStorage.getHash(image);

								case 11:
									_context13.t1 = _context13.sent;
									_context13.t2 = val;
									_context13.t0 = _context13.t1 === _context13.t2;

								case 14:
									if (!_context13.t0) {
										_context13.next = 16;
										break;
									}

									return _context13.abrupt('return', true);

								case 16:
									_iteratorNormalCompletion16 = true;
									_context13.next = 5;
									break;

								case 19:
									_context13.next = 25;
									break;

								case 21:
									_context13.prev = 21;
									_context13.t3 = _context13['catch'](3);
									_didIteratorError16 = true;
									_iteratorError16 = _context13.t3;

								case 25:
									_context13.prev = 25;
									_context13.prev = 26;

									if (!_iteratorNormalCompletion16 && _iterator16.return) {
										_iterator16.return();
									}

								case 28:
									_context13.prev = 28;

									if (!_didIteratorError16) {
										_context13.next = 31;
										break;
									}

									throw _iteratorError16;

								case 31:
									return _context13.finish(28);

								case 32:
									return _context13.finish(25);

								case 33:
									return _context13.abrupt('return', false);

								case 34:
								case 'end':
									return _context13.stop();
							}
						}
					}, _callee12, this, [[3, 21, 25, 33], [26,, 28, 32]]);
				}));

				function _ihash(_x34) {
					return _ref34.apply(this, arguments);
				}

				return _ihash;
			}()
		}, {
			key: '_img',
			value: function _img(val) {
				var images = this._post.images;

				var _val = _slicedToArray(val, 3),
				    compareRule = _val[0],
				    weightVals = _val[1],
				    sizeVals = _val[2];

				if (!val) {
					return images.hasAttachments;
				}
				var _iteratorNormalCompletion17 = true;
				var _didIteratorError17 = false;
				var _iteratorError17 = undefined;

				try {
					for (var _iterator17 = images[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
						var image = _step17.value;

						if (!(image instanceof AttachedImage)) {
							continue;
						}
						if (weightVals) {
							var w = image.weight;
							var isHide = void 0;
							switch (compareRule) {
								case 0:
									isHide = w >= weightVals[0] && w <= weightVals[1];break;
								case 1:
									isHide = w < weightVals[0];break;
								case 2:
									isHide = w > weightVals[0];break;
							}
							if (!isHide) {
								continue;
							} else if (!sizeVals) {
								return true;
							}
						}
						if (sizeVals) {
							var h = image.height,
							    _w = image.width;

							switch (compareRule) {
								case 0:
									if (_w >= sizeVals[0] && _w <= sizeVals[1] && h >= sizeVals[2] && h <= sizeVals[3]) {
										return true;
									}
									break;
								case 1:
									if (_w < sizeVals[0] && h < sizeVals[3]) {
										return true;
									}
									break;
								case 2:
									if (_w > sizeVals[0] && h > sizeVals[3]) {
										return true;
									}
							}
						}
					}
				} catch (err) {
					_didIteratorError17 = true;
					_iteratorError17 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion17 && _iterator17.return) {
							_iterator17.return();
						}
					} finally {
						if (_didIteratorError17) {
							throw _iteratorError17;
						}
					}
				}

				return false;
			}
		}, {
			key: '_imgn',
			value: function _imgn(val) {
				var _iteratorNormalCompletion18 = true;
				var _didIteratorError18 = false;
				var _iteratorError18 = undefined;

				try {
					for (var _iterator18 = this._post.images[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
						var image = _step18.value;

						if (image instanceof AttachedImage && val.test(image.name)) {
							return true;
						}
					}
				} catch (err) {
					_didIteratorError18 = true;
					_iteratorError18 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion18 && _iterator18.return) {
							_iterator18.return();
						}
					} finally {
						if (_didIteratorError18) {
							throw _iteratorError18;
						}
					}
				}

				return false;
			}
		}, {
			key: '_name',
			value: function _name(val) {
				var pName = this._post.posterName;
				return pName ? !val || pName.includes(val) : false;
			}
		}, {
			key: '_num',
			value: function _num(val) {
				return SpellsInterpreter._tlenNum_helper(val, this._post.count + 1);
			}
		}, {
			key: '_op',
			value: function _op() {
				return this._post.isOp;
			}
		}, {
			key: '_sage',
			value: function _sage() {
				return this._post.sage;
			}
		}, {
			key: '_subj',
			value: function _subj(val) {
				var pSubj = this._post.subj;
				return pSubj ? !val || val.test(pSubj) : false;
			}
		}, {
			key: '_tlen',
			value: function _tlen(val) {
				var text = this._post.text.replace(/\s+(?=\s)|\n/g, '');
				return !val ? !!text : SpellsInterpreter._tlenNum_helper(val, text.length);
			}
		}, {
			key: '_trip',
			value: function _trip(val) {
				var pTrip = this._post.posterTrip;
				return pTrip ? !val || pTrip.includes(val) : false;
			}
		}, {
			key: '_vauthor',
			value: function _vauthor(val) {
				return this._videoVauthor(val, true);
			}
		}, {
			key: '_video',
			value: function _video(val) {
				return this._videoVauthor(val, false);
			}
		}, {
			key: '_videoVauthor',
			value: function _videoVauthor(val, isAuthorSpell) {
				var videos = this._post.videos;

				if (!val) {
					return !!videos.hasLinks;
				}
				if (!videos.hasLinks || !Cfg.YTubeTitles) {
					return false;
				}
				var _iteratorNormalCompletion19 = true;
				var _didIteratorError19 = false;
				var _iteratorError19 = undefined;

				try {
					for (var _iterator19 = videos.vData[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
						var siteData = _step19.value;
						var _iteratorNormalCompletion20 = true;
						var _didIteratorError20 = false;
						var _iteratorError20 = undefined;

						try {
							for (var _iterator20 = siteData[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
								var data = _step20.value;

								if (isAuthorSpell ? val === data[1] : val.test(data[0])) {
									return true;
								}
							}
						} catch (err) {
							_didIteratorError20 = true;
							_iteratorError20 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion20 && _iterator20.return) {
									_iterator20.return();
								}
							} finally {
								if (_didIteratorError20) {
									throw _iteratorError20;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError19 = true;
					_iteratorError19 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion19 && _iterator19.return) {
							_iterator19.return();
						}
					} finally {
						if (_didIteratorError19) {
							throw _iteratorError19;
						}
					}
				}

				if (videos.linksCount === videos.loadedLinksCount) {
					return false;
				}
				return new Promise(function (resolve) {
					return videos.titleLoadFn = function (data) {
						if (isAuthorSpell ? val === data[1] : val.test(data[0])) {
							resolve(true);
						} else if (videos.linksCount === videos.loadedLinksCount) {
							resolve(false);
						} else {
							return;
						}
						videos.titleLoadFn = null;
					};
				});
			}
		}, {
			key: '_wipe',
			value: function _wipe(val) {
				var arr = void 0,
				    len = void 0,
				    x = void 0;
				var txt = this._post.text;
				if (val & 1) {
					arr = txt.replace(/>/g, '').split(/\s*\n\s*/);
					if ((len = arr.length) > 5) {
						arr.sort();
						for (var i = 0, n = len / 4; i < len;) {
							x = arr[i];
							var j = 0;
							while (arr[i++] === x) {
								j++;
							}
							if (j > 4 && j > n && x) {
								this._wipeMsg = [1, '"' + x.substr(0, 20) + '" x' + (j + 1)];
								return true;
							}
						}
					}
				}
				if (val & 2) {
					arr = txt.replace(/[\s.?!,>]+/g, ' ').toUpperCase().split(' ');
					if ((len = arr.length) > 3) {
						arr.sort();
						var keys = 0;
						var pop = 0;
						for (var _i5 = 0, _n = len / 4; _i5 < len; keys++) {
							x = arr[_i5];
							var _j2 = 0;
							while (arr[_i5++] === x) {
								_j2++;
							}
							if (len > 25) {
								if (_j2 > pop && x.length > 2) {
									pop = _j2;
								}
								if (pop >= _n) {
									this._wipeMsg = [2, 'same "' + x.substr(0, 20) + '" x' + (pop + 1)];
									return true;
								}
							}
						}
						x = keys / len;
						if (x < 0.25) {
							this._wipeMsg = [2, 'uniq ' + (x * 100).toFixed(0) + '%'];
							return true;
						}
					}
				}
				if (val & 4) {
					arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s.?!,>:;-]+/g, ' ').split(' ');
					if (arr[0].length > 50 || (len = arr.length) > 1 && arr.join('').length / len > 10) {
						this._wipeMsg = [4, null];
						return true;
					}
				}
				if (val & 8) {
					var _txt = txt.replace(/\s+/g, '');
					if ((len = _txt.length) > 30 && (x = _txt.replace(/[0-9a-zа-я.?!,]/ig, '').length / len) > 0.4) {
						this._wipeMsg = [8, (x * 100).toFixed(0) + '%'];
						return true;
					}
				}
				if (val & 16) {
					arr = txt.replace(/[\s.?!;,-]+/g, ' ').trim().split(' ');
					if ((len = arr.length) > 4) {
						var _n2 = 0;
						var capsw = 0;
						var casew = 0;
						for (var _i6 = 0; _i6 < len; ++_i6) {
							x = arr[_i6];
							if ((x.match(/[a-zа-я]/ig) || []).length < 5) {
								continue;
							}
							if ((x.match(/[A-ZА-Я]/g) || []).length > 2) {
								casew++;
							}
							if (x === x.toUpperCase()) {
								capsw++;
							}
							_n2++;
						}
						if (capsw / _n2 >= 0.3 && _n2 > 4) {
							this._wipeMsg = [16, 'CAPS ' + capsw / arr.length * 100 + '%'];
							return true;
						} else if (casew / _n2 >= 0.3 && _n2 > 8) {
							this._wipeMsg = [16, 'cAsE ' + casew / arr.length * 100 + '%'];
							return true;
						}
					}
				}
				if (val & 32) {
					var _txt2 = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
					if ((len = _txt2.length) > 30 && (x = (len - _txt2.replace(/\d/g, '').length) / len) > 0.4) {
						this._wipeMsg = [32, Math.round(x * 100) + '%'];
						return true;
					}
				}
				if (val & 64) {
					if (/(?:\n\s*){10}/i.test(txt)) {
						this._wipeMsg = [64, null];
						return true;
					}
				}
				return false;
			}
		}, {
			key: '_words',
			value: function _words(val) {
				return this._post.text.toLowerCase().includes(val) || this._post.subj.toLowerCase().includes(val);
			}
		}], [{
			key: '_tlenNum_helper',
			value: function _tlenNum_helper(val, num) {
				for (var arr = val[0], i = arr.length - 1; i >= 0; --i) {
					if (arr[i] === num) {
						return true;
					}
				}
				for (var _arr = val[1], _i7 = _arr.length - 1; _i7 >= 0; --_i7) {
					if (num >= _arr[_i7][0] && num <= _arr[_i7][1]) {
						return true;
					}
				}
				return false;
			}
		}]);

		return SpellsInterpreter;
	}();


	var PostForm = function () {
		function PostForm(form) {
			var _this25 = this;

			var oeForm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var ignoreForm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			_classCallCheck(this, PostForm);

			this.isBottom = false;
			this.isHidden = false;
			this.isQuick = false;
			this.lastQuickPNum = -1;
			this.pArea = [];
			this.pForm = null;
			this.qArea = null;
			this._pBtn = [];
			var qOeForm = 'form[name="oeform"], form[action*="paint"]';
			this.oeForm = oeForm || $q(qOeForm);
			if (!ignoreForm && !form) {
				if (this.oeForm) {
					ajaxLoad(aib.getThrUrl(aib.b, Thread.first.num), false).then(function (loadedDoc) {
						var form = $q(aib.qForm, loadedDoc);
						var oeForm = $q(qOeForm, loadedDoc);
						pr = new PostForm(form && doc.adoptNode(form), oeForm && doc.adoptNode(oeForm), true);
					}, function () {
						return pr = new PostForm(null, null, true);
					});
				} else {
					this.form = null;
				}
				return;
			}
			this.tNum = aib.t;
			this.form = form;
			this.files = null;
			this.txta = $q('tr:not([style*="none"]) textarea:not([style*="display:none"])', form);
			this.subm = $q(aib.qFormSubm, form);
			this.name = $q(aib.qFormName, form);
			this.mail = $q(aib.qFormMail, form);
			this.subj = $q(aib.qFormSubj, form);
			this.passw = $q(aib.qFormPassw, form);
			this.rules = $q(aib.qFormRules, form);
			this.video = $q('tr input[name="video"], tr input[name="embed"]', form);
			this._initFileInputs();
			this._makeHideableContainer();
			this._makeWindow();
			if (!form || !this.txta) {
				return;
			}
			form.style.display = 'inline-block';
			form.style.textAlign = 'left';
			var qArea = this.qArea,
			    txta = this.txta;

			new WinResizer('reply', 'top', 'textaHeight', qArea, txta);
			new WinResizer('reply', 'left', 'textaWidth', qArea, txta);
			new WinResizer('reply', 'right', 'textaWidth', qArea, txta);
			new WinResizer('reply', 'bottom', 'textaHeight', qArea, txta);
			this._initTextarea();
			this.addMarkupPanel();
			this.setPlaceholders();
			this.updateLanguage();
			this._initCaptcha();
			this._initSubmit();
			if (Cfg.ajaxPosting) {
				this._initAjaxPosting();
			}
			if (Cfg.addSageBtn && this.mail) {
				this._makeSageBtn();
			}
			if (Cfg.noPassword && this.passw) {
				$hide($parent(this.passw, 'TR'));
			}
			if (Cfg.noName && this.name) {
				PostForm.hideField(this.name);
			}
			if (Cfg.noSubj && this.subj) {
				PostForm.hideField(this.subj);
			}
			window.addEventListener('load', function () {
				if (Cfg.userName && _this25.name) {
					setTimeout(PostForm.setUserName, 1e3);
				}
				if (_this25.passw) {
					setTimeout(PostForm.setUserPassw, 1e3);
				}
			});
		}

		_createClass(PostForm, [{
			key: 'addMarkupPanel',
			value: function addMarkupPanel() {
				var el = $id('de-txt-panel');
				if (!Cfg.addTextBtns) {
					$del(el);
					return;
				}
				if (!el) {
					el = $add('<span id="de-txt-panel"></span>');
					el.addEventListener('click', this);
					el.addEventListener('mouseover', this);
				}
				el.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
				$after(Cfg.txtBtnsLoc ? $id('de-resizer-text') || this.txta : this.subm, el);
				var id = ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub'];
				var val = ['B', 'i', 'U', 'S', '%', 'C', 'x\xB2', 'x\u2082'];
				var mode = Cfg.addTextBtns;
				var btnsHTML = aib.markupTags.reduce(function (html, str, i) {
					return html + (str === '' ? '' : '<div id="de-btn-' + id[i] + '" de-title="' + Lng.txtBtn[i][lang] + '" de-tag="' + str + '">' + (mode === 2 ? (!html ? '[' : '') + '&nbsp;<a class="de-abtn" href="#">' + val[i] + '</a> /' : mode === 3 ? '<button type="button" style="font-weight: bold;">' + val[i] + '</button>' : '<svg><use xlink:href="#de-symbol-markup-' + id[i] + '"/></svg>') + '</div>');
				}, '');
				el.innerHTML = btnsHTML + '<div id="de-btn-quote" de-title="' + Lng.txtBtn[8][lang] + '" de-tag="q">' + (mode === 2 ? '&nbsp;<a class="de-abtn" href="#">&gt;</a> ]' : mode === 3 ? '<button type="button" style="font-weight: bold;">&gt;</button>' : '<svg><use xlink:href="#de-symbol-markup-quote"/></svg>') + '</span>';
			}
		}, {
			key: 'clearForm',
			value: function clearForm() {
				if (this.txta) {
					this.txta.value = '';
				}
				if (this.files) {
					this.files.clearInputs();
				}
				if (this.video) {
					this.video.value = '';
				}
			}
		}, {
			key: 'closeReply',
			value: function closeReply() {
				if (this.isQuick) {
					this.isQuick = false;
					this.lastQuickPNum = -1;
					if (!aib.t) {
						this._toggleQuickReply(false);
					}
					this.setReply(false, !aib.t || Cfg.addPostForm > 1);
				}
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				var el = e.target;
				if (el.tagName !== 'DIV') {
					el = el.parentNode;
				}
				var _el7 = el,
				    id = _el7.id;

				if (!id.startsWith('de-btn')) {
					return;
				}
				if (e.type === 'mouseover') {
					if (id === 'de-btn-quote') {
						quotetxt = window.getSelection().toString();
					}
					var key = -1;
					if (HotKeys.enabled) {
						switch (id.substr(7)) {
							case 'bold':
								key = 12;break;
							case 'italic':
								key = 13;break;
							case 'strike':
								key = 14;break;
							case 'spoil':
								key = 15;break;
							case 'code':
								key = 16;
						}
					}
					KeyEditListener.setTitle(el, key);
					return;
				}
				var txtaEl = pr.txta;
				var start = txtaEl.selectionStart,
				    end = txtaEl.selectionEnd;

				var quote = Cfg.spacedQuote ? '> ' : '>';
				if (id === 'de-btn-quote') {
					$txtInsert(txtaEl, quote + (start === end ? quotetxt : txtaEl.value.substring(start, end)).replace(/\n/gm, '\n' + quote));
					quotetxt = '';
				} else {
					var scrtop = txtaEl.scrtop;

					var val = PostForm._wrapText(el.getAttribute('de-tag'), txtaEl.value.substring(start, end));
					var len = start + val[0];
					txtaEl.value = txtaEl.value.substr(0, start) + val[1] + txtaEl.value.substr(end);
					txtaEl.setSelectionRange(len, len);
					txtaEl.focus();
					txtaEl.scrollTop = scrtop;
				}
				$pd(e);
				e.stopPropagation();
			}
		}, {
			key: 'refreshCap',
			value: function refreshCap() {
				var isErr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (this.cap) {
					this.cap.refreshCaptcha(isErr, isErr, this.tNum);
				}
			}
		}, {
			key: 'setPlaceholders',
			value: function setPlaceholders() {
				if (aib.kus || !aib.multiFile && Cfg.fileInputs === 2) {
					return;
				}
				this._setPlaceholder('name');
				this._setPlaceholder('subj');
				this._setPlaceholder('mail');
				this._setPlaceholder('video');
				if (this.cap) {
					this._setPlaceholder('cap');
				}
			}
		}, {
			key: 'setReply',
			value: function setReply(isQuick, needToHide) {
				if (isQuick) {
					$after(this.qArea.firstChild, this.pForm);
				} else {
					$after(this.pArea[+this.isBottom], this.qArea);
					$after(this._pBtn[+this.isBottom], this.pForm);
				}
				this.isHidden = needToHide;
				$toggle(this.qArea, isQuick);
				$toggle(this.pForm, !needToHide);
				this.updatePAreaBtns();
			}
		}, {
			key: 'showMainReply',
			value: function showMainReply(isBottom, e) {
				this.closeReply();
				if (!aib.t) {
					this.tNum = false;
					this.refreshCap();
				}
				if (this.isBottom === isBottom) {
					$toggle(this.pForm, this.isHidden);
					this.isHidden = !this.isHidden;
					this.updatePAreaBtns();
				} else {
					this.isBottom = isBottom;
					this.setReply(false, false);
				}
				if (e) {
					$pd(e);
				}
			}
		}, {
			key: 'showQuickReply',
			value: function showQuickReply(post, pNum, isCloseReply, isNumClick) {
				var isNoLink = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

				if (!this.isQuick) {
					this.isQuick = true;
					this.setReply(true, false);
					$q('a', this._pBtn[+this.isBottom]).className = 'de-abtn de-parea-btn-' + (aib.t ? 'reply' : 'thr');
				} else if (isCloseReply && !quotetxt && post.wrap.nextElementSibling === this.qArea) {
					this.closeReply();
					return;
				}
				$after(post.wrap, this.qArea);
				if (this.qArea.classList.contains('de-win')) {
					updateWinZ(this.qArea.style);
				}
				var qNum = post.thr.num;
				if (!aib.t) {
					this._toggleQuickReply(qNum);
				}
				if (!this.form) {
					return;
				}
				if (!aib.t && this.tNum !== qNum) {
					this.tNum = qNum;
					this.refreshCap();
				}
				this.tNum = qNum;
				var txt = this.txta.value;
				var isOnNewLine = txt === '' || txt.slice(-1) === '\n';
				var link = isNoLink || post.isOp && !Cfg.addOPLink && !aib.t && !isNumClick ? '' : isNumClick ? '>>' + pNum + (isOnNewLine ? '\n' : '') : (isOnNewLine ? '' : '\n') + (this.lastQuickPNum === pNum && txt.includes('>>' + pNum) ? '' : '>>' + pNum + '\n');
				var quote = !quotetxt ? '' : quotetxt.replace(/^\n|\n$/g, '').replace(/(^|\n)(.)/gm, '$1>' + (Cfg.spacedQuote ? ' ' : '') + '$2') + '\n';
				$txtInsert(this.txta, link + quote);
				var winTitle = pByNum.get(pNum).thr.op.title.trim();
				$q('.de-win-title', this.qArea).textContent = (winTitle.length < 28 ? winTitle : winTitle.substr(0, 30) + '\u2026') || '#' + pNum;
				this.lastQuickPNum = pNum;
			}
		}, {
			key: 'updateLanguage',
			value: function updateLanguage() {
				this.txta.title = Lng.pasteImage[lang];
				aib.updateSubmitBtn(this.subm);
			}
		}, {
			key: 'updatePAreaBtns',
			value: function updatePAreaBtns() {
				var txt = 'de-abtn de-parea-btn-';
				var rep = aib.t ? 'reply' : 'thr';
				$q('a', this._pBtn[+this.isBottom]).className = txt + (!this.pForm.style.display ? 'close' : rep);
				$q('a', this._pBtn[+!this.isBottom]).className = txt + rep;
			}
		}, {
			key: '_initAjaxPosting',
			value: function _initAjaxPosting() {
				var _this26 = this;

				var el = void 0;
				if (aib.qFormRedir && (el = $q(aib.qFormRedir, this.form))) {
					aib.disableRedirection(el);
				}
				this.form.onsubmit = function (e) {
					$pd(e);
					$popup('upload', Lng.sending[lang], true);
					html5Submit(_this26.form, _this26.subm, true).then(checkUpload).catch(function (err) {
						return $popup('upload', getErrorMessage(err));
					});
				};
			}
		}, {
			key: '_initCaptcha',
			value: function _initCaptcha() {
				var _this27 = this;

				var capEl = $q('input[type="text"][name*="aptcha"], *[id*="captcha"], *[class*="captcha"]', this.form);
				if (!capEl || aib.fch && doc.cookie.includes('pass_enabled')) {
					this.cap = null;
					return;
				}
				this.cap = new Captcha(capEl, this.tNum);
				var updCapFn = function updCapFn() {
					_this27.cap.addCaptcha();
					_this27.cap.updateOutdated();
				};
				this.txta.addEventListener('focus', updCapFn);
				if (this.files) {
					this.files.onchange = updCapFn;
				}
				this.form.addEventListener('click', function () {
					return _this27.cap.addCaptcha();
				}, true);
			}
		}, {
			key: '_initFileInputs',
			value: function _initFileInputs() {
				var _this28 = this;

				var fileEl = $q('tr input[type="file"]', this.form);
				if (!fileEl) {
					return;
				}
				if (aib.fixFileInputs) {
					aib.fixFileInputs($parent(fileEl, 'TD'));
				}
				this.files = new Files(this, $q('tr input[type="file"]', this.form));
				window.addEventListener('load', function () {
					return setTimeout(function () {
						return !_this28.files.filesCount && _this28.files.clearInputs();
					}, 0);
				});
			}
		}, {
			key: '_initSubmit',
			value: function _initSubmit() {
				var _this29 = this;

				this.subm.addEventListener('click', function (e) {
					if (Cfg.warnSubjTrip && _this29.subj && /#.|##./.test(_this29.subj.value)) {
						$pd(e);
						$popup('upload', Lng.subjHasTrip[lang]);
						return;
					}
					var val = _this29.txta.value;
					if (Spells.outreps) {
						val = Spells.outReplace(val);
					}
					if (_this29.tNum && pByNum.get(_this29.tNum).subj === 'Dollchan Extension Tools') {
						var temp = '\n\n' + PostForm._wrapText(aib.markupTags[5], '-'.repeat(50) + '\n' + nav.ua + '\nv' + version + '.' + commit + (nav.isESNext ? '.es6' : '') + ' [' + nav.scriptHandler + ']')[1];
						if (!val.includes(temp)) {
							val += temp;
						}
					}
					_this29.txta.value = val;
					if (Cfg.ajaxPosting) {
						$popup('upload', Lng.checking[lang], true);
					}
					if (_this29.video && (val = _this29.video.value) && (val = val.match(Videos.ytReg))) {
						_this29.video.value = 'http://www.youtube.com/watch?v=' + val[1];
					}
					if (_this29.isQuick) {
						$hide(_this29.pForm);
						$hide(_this29.qArea);
						$after(_this29._pBtn[+_this29.isBottom], _this29.pForm);
					}
					updater.pauseUpdater();
				});
			}
		}, {
			key: '_initTextarea',
			value: function _initTextarea() {
				var _this30 = this;

				var el = this.txta;
				if (aib.dobr) {
					el.removeAttribute('id');
				}
				el.classList.add('de-textarea');
				el.style.cssText = 'width: ' + Cfg.textaWidth + 'px !important; height: ' + Cfg.textaHeight + 'px !important;';
				el.addEventListener('keypress', function (e) {
					var code = e.charCode || e.keyCode;
					if ((code === 33  || code === 34 ) && e.which === 0) {
						e.target.blur();
						window.focus();
					}
				});
				el.addEventListener('paste', function (e) {
					if ('clipboardData' in e) {
						var _iteratorNormalCompletion21 = true;
						var _didIteratorError21 = false;
						var _iteratorError21 = undefined;

						try {
							for (var _iterator21 = e.clipboardData.items[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
								var item = _step21.value;

								if (item.kind === 'file') {
									var inputs = _this30.files._inputs;
									for (var i = 0, len = inputs.length; i < len; ++i) {
										var input = inputs[i];
										if (!input.hasFile) {
											var file = item.getAsFile();
											input._addUrlFile(URL.createObjectURL(file), file);
											break;
										}
									}
								}
							}
						} catch (err) {
							_didIteratorError21 = true;
							_iteratorError21 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion21 && _iterator21.return) {
									_iterator21.return();
								}
							} finally {
								if (_didIteratorError21) {
									throw _iteratorError21;
								}
							}
						}
					}
				});
				if (nav.isFirefox) {
					el.addEventListener('mouseup', function (_ref35) {
						var target = _ref35.target;
						var _target$style = target.style,
						    width = _target$style.width,
						    height = _target$style.height;

						target.style.cssText = 'width: ' + width + ' !important; height: ' + height + ' !important;';
						saveCfg('textaWidth', parseInt(width, 10));
						saveCfg('textaHeight', parseInt(height, 10));
					});
					return;
				}
				$aEnd(el, '<div id="de-resizer-text"></div>').addEventListener('mousedown', {
					_el: el,
					_elStyle: el.style,
					handleEvent: function handleEvent(e) {
						switch (e.type) {
							case 'mousedown':
								docBody.addEventListener('mousemove', this);
								docBody.addEventListener('mouseup', this);
								$pd(e);
								return;
							case 'mousemove':
								{
									var cr = this._el.getBoundingClientRect();
									this._elStyle.cssText = 'width: ' + (e.clientX - cr.left) + 'px !important; height: ' + (e.clientY - cr.top) + 'px !important;';
									return;
								}
							default:
								docBody.removeEventListener('mousemove', this);
								docBody.removeEventListener('mouseup', this);
								saveCfg('textaWidth', parseInt(this._elStyle.width, 10));
								saveCfg('textaHeight', parseInt(this._elStyle.height, 10));
						}
					}
				});
			}
		}, {
			key: '_makeHideableContainer',
			value: function _makeHideableContainer() {
				var _this31 = this;

				this.pForm = $add('<div id="de-pform" class="de-win-body"></div>');
				if (this.form) {
					this.pForm.appendChild(this.form);
				}
				if (this.oeForm) {
					this.pForm.appendChild(this.oeForm);
				}
				var html = '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>';
				this.pArea = [$bBegin(DelForm.first.el, html), $aEnd(aib.fch ? $q('.board', DelForm.first.el) : DelForm.first.el, html)];
				this._pBtn = [this.pArea[0].firstChild, this.pArea[1].firstChild];
				this._pBtn[0].firstElementChild.onclick = function (e) {
					return _this31.showMainReply(false, e);
				};
				this._pBtn[1].firstElementChild.onclick = function (e) {
					return _this31.showMainReply(true, e);
				};
				this.qArea = $add('<div style="display: none; ' + Cfg.replyWinX + '; ' + Cfg.replyWinY + '; z-index: ' + ++topWinZ + ';" id="de-win-reply" class="' + (aib.cReply + (Cfg.replyWinDrag ? ' de-win' : ' de-win-inpost')) + '"></div>');
				this.isBottom = Cfg.addPostForm === 1;
				this.setReply(false, !aib.t || Cfg.addPostForm > 1);
			}
		}, {
			key: '_makeSageBtn',
			value: function _makeSageBtn() {
				var _this32 = this;

				PostForm.hideField($parent(this.mail, 'LABEL') || this.mail);
				$aEnd(this.subm, '<svg id="de-sagebtn" class="de-btn-sage">' + '<use xlink:href="#de-symbol-post-sage"/></svg>').onclick = function (e) {
					e.stopPropagation();
					$pd(e);
					toggleCfg('sageReply');
					_this32._setSage();
				};
				setTimeout(function () {
					return _this32._setSage();
				}, 0);
			}
		}, {
			key: '_makeWindow',
			value: function _makeWindow() {
				var _this33 = this;

				makeDraggable('reply', this.qArea, $aBegin(this.qArea, '<div class="de-win-head">\n\t\t\t<span class="de-win-title"></span>\n\t\t\t<span class="de-win-buttons">\n\t\t\t\t<svg class="de-btn-clear"><use xlink:href="#de-symbol-unavail"/></svg>\n\t\t\t\t<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>\n\t\t\t\t<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>\n\t\t\t</span>\n\t\t</div>\n\t\t<div class="de-resizer de-resizer-top"></div>\n\t\t<div class="de-resizer de-resizer-left"></div>\n\t\t<div class="de-resizer de-resizer-right"></div>\n\t\t<div class="de-resizer de-resizer-bottom"></div>'));
				var buttons = $q('.de-win-buttons', this.qArea);
				buttons.onmouseover = function (_ref36) {
					var target = _ref36.target;

					var el = target.parentNode;
					switch (fixEventEl(target).classList[0]) {
						case 'de-btn-clear':
							el.title = Lng.clearForm[lang];break;
						case 'de-btn-close':
							el.title = Lng.closeReply[lang];break;
						case 'de-btn-toggle':
							el.title = Cfg.replyWinDrag ? Lng.underPost[lang] : Lng.makeDrag[lang];
					}
				};

				var _ref37 = [].concat(_toConsumableArray(buttons.children)),
				    clearBtn = _ref37[0],
				    toggleBtn = _ref37[1],
				    closeBtn = _ref37[2];

				clearBtn.onclick = function () {
					saveCfg('sageReply', 0);
					_this33._setSage();
					_this33.files.clearInputs();
					[_this33.txta, _this33.name, _this33.mail, _this33.subj, _this33.video, _this33.cap && _this33.cap.textEl].forEach(function (el) {
						return el && (el.value = '');
					});
				};
				toggleBtn.onclick = function () {
					toggleCfg('replyWinDrag');
					if (Cfg.replyWinDrag) {
						_this33.qArea.className = aib.cReply + ' de-win';
						updateWinZ(_this33.qArea.style);
					} else {
						_this33.qArea.className = aib.cReply + ' de-win-inpost';
						_this33.txta.focus();
					}
				};
				closeBtn.onclick = function () {
					return _this33.closeReply();
				};
			}
		}, {
			key: '_setPlaceholder',
			value: function _setPlaceholder(val) {
				var el = val === 'cap' ? this.cap.textEl : this[val];
				if (el) {
					toggleAttr(el, 'placeholder', Lng[val][lang], aib.multiFile || Cfg.fileInputs !== 2);
				}
			}
		}, {
			key: '_setSage',
			value: function _setSage() {
				var el = $id('de-sagebtn');
				var c = Cfg.sageReply;
				el.style.opacity = c ? '1' : '.3';
				el.title = c ? 'SAGE!' : Lng.noSage[lang];
				if (this.mail.type === 'text') {
					this.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
				} else {
					this.mail.checked = c;
				}
			}
		}, {
			key: '_toggleQuickReply',
			value: function _toggleQuickReply(tNum) {
				if (this.oeForm) {
					$del($q('input[name="oek_parent"]', this.oeForm));
					if (tNum) {
						this.oeForm.insertAdjacentHTML('afterbegin', '<input type="hidden" value="' + tNum + '" name="oek_parent">');
					}
				}
				if (this.form) {
					if (aib.changeReplyMode && tNum !== this.tNum) {
						aib.changeReplyMode(this.form, tNum);
					}
					$del($q('input[name="' + aib.formParent + '"]', this.form));
					if (tNum) {
						this.form.insertAdjacentHTML('afterbegin', '<input type="hidden" name="' + aib.formParent + '" value="' + tNum + '">');
					}
				}
			}
		}, {
			key: 'isVisible',
			get: function get() {
				if (!this.isHidden && this.isBottom && $q(':focus', this.pForm)) {
					var cr = this.pForm.getBoundingClientRect();
					return cr.bottom > 0 && cr.top < nav.viewportHeight();
				}
				return false;
			}
		}, {
			key: 'top',
			get: function get() {
				return this.pForm.getBoundingClientRect().top;
			}
		}], [{
			key: 'hideField',
			value: function hideField(el) {
				var next = el.nextElementSibling;
				$toggle(next && next.style.display !== 'none' || el.previousElementSibling ? el : $parent(el, 'TR'));
			}
		}, {
			key: 'setUserName',
			value: function setUserName() {
				var el = $q('input[info="nameValue"]');
				if (el) {
					saveCfg('nameValue', el.value);
				}
				pr.name.value = Cfg.userName ? Cfg.nameValue : '';
			}
		}, {
			key: 'setUserPassw',
			value: function setUserPassw() {
				var el = $q('input[info="passwValue"]');
				if (el) {
					saveCfg('passwValue', el.value);
				}
				var value = pr.passw.value = Cfg.passwValue;
				var _iteratorNormalCompletion22 = true;
				var _didIteratorError22 = false;
				var _iteratorError22 = undefined;

				try {
					for (var _iterator22 = DelForm[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
						var _ref38 = _step22.value;
						var passEl = _ref38.passEl;

						if (passEl) {
							passEl.value = value;
						}
					}
				} catch (err) {
					_didIteratorError22 = true;
					_iteratorError22 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion22 && _iterator22.return) {
							_iterator22.return();
						}
					} finally {
						if (_didIteratorError22) {
							throw _iteratorError22;
						}
					}
				}
			}
		}, {
			key: '_wrapText',
			value: function _wrapText(tag, text) {
				var isBB = aib.markupBB;
				if (tag.startsWith('[')) {
					tag = tag.substr(1);
					isBB = true;
				}
				if (isBB) {
					if (text.includes('\n')) {
						var _str = '[' + tag + ']' + text + '[/' + tag + ']';
						return [_str.length, _str];
					}
					var _m = text.match(/^(\s*)(.*?)(\s*)$/);
					var str = _m[1] + '[' + tag + ']' + _m[2] + '[/' + tag + ']' + _m[3];
					return [!_m[2].length ? _m[1].length + tag.length + 2 : str.length, str];
				}
				var m = void 0,
				    rv = '',
				    i = 0;
				var arr = text.split('\n');
				for (var len = arr.length; i < len; ++i) {
					m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
					rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) : tag + m[2] + tag) + m[3];
				}
				return [i === 1 && !m[2].length && tag !== '^H' ? m[1].length + tag.length : rv.length - 1, rv.slice(1)];
			}
		}]);

		return PostForm;
	}();


	function getSubmitError(dc) {
		if (!dc.body.hasChildNodes() || $q(aib.qDForm, dc)) {
			return null;
		}
		var err = [].concat(_toConsumableArray($Q(aib.qError, dc))).map(function (str) {
			return str.innerHTML + '\n';
		}).join('').replace(/<a [^>]+>Назад.+|<br.+/, '') || Lng.error[lang] + ':\n' + dc.body.innerHTML;
		return (/successful|uploaded|updating|post deleted|post created|обновл|удален[о.]/i.test(err) ? null : err
		);
	}

	function getUploadFunc() {
		$popup('upload', Lng.sending[lang] + '<br><progress id="de-uploadprogress" value="0" max="1" style="display: none; width: 200px;">' + '</progress><div style="display: none; font: bold 12px arial;">' + '<span></span> / <span></span> (<span></span>)</div>', true);
		var isInited = false;
		var beginTime = Date.now();
		var progress = $id('de-uploadprogress');
		var counterWrap = progress.nextElementSibling;

		var _ref39 = [].concat(_toConsumableArray(counterWrap.children)),
		    counterEl = _ref39[0],
		    totalEl = _ref39[1],
		    speedEl = _ref39[2];

		return function (_ref40) {
			var total = _ref40.total,
			    i = _ref40.loaded;

			if (!isInited) {
				progress.setAttribute('max', total);
				$show(progress);
				totalEl.textContent = prettifySize(total);
				$show(counterWrap);
				isInited = true;
			}
			progress.value = i;
			counterEl.textContent = prettifySize(i);
			speedEl.textContent = prettifySize(1e3 * i / (Date.now() - beginTime)) + '/' + Lng.second[lang];
		};
	}

	function checkUpload(data) {
		var error = null;
		var postNum = null;
		var isDocument = data instanceof HTMLDocument;
		if (aib.getSubmitData) {
			if (aib.jsonSubmit) {
				if (aib._8ch && data.substring(0, 16) === '{"captcha":true|') {
					$ajax('/dnsbls_bypass_popup.php').then(function (xhr) {
						$popup('upload', xhr.responseText).style.cssText = 'width: 350px; text-align: center;';
						$id('captcha_pop_submit').onclick = function () {
							$id('captcha_message_box').innerHTML = '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>';
							var formData = new FormData();
							formData.append('captcha_text', $q('.captcha_text').value);
							formData.append('captcha_cookie', $q('.captcha_cookie').value);
							$ajax('/dnsbls_bypass_popup.php', { method: 'POST', data: formData }).then(function (xhr) {
								var data = JSON.parse(xhr.responseText);
								if (data.status === 1) {
									$popup('upload', data.message);
								} else {
									$id('captcha_message_box').innerHTML = data.message;
									$id('captcha_objects').innerHTML = data.new_captcha;
								}
							});
						};
						if (pr.isQuick) {
							pr.setReply(true, false);
						}
						updater.sendErrNotif();
						updater.continueUpdater();
					});
					return;
				}
				try {
					data = JSON.parse(isDocument ? data.body.textContent : data);
				} catch (err) {
					error = getErrorMessage(err);
				}
			}
			if (!error) {
				var _aib$getSubmitData = aib.getSubmitData(data);

				error = _aib$getSubmitData.error;
				postNum = _aib$getSubmitData.postNum;
			}
		} else {
			error = getSubmitError(data);
		}
		if (error) {
			if (pr.isQuick) {
				pr.setReply(true, false);
			}
			if (/[cf]aptch|капч|подтвер|verifi/i.test(error)) {
				pr.refreshCap(true);
			}
			$popup('upload', error);
			updater.sendErrNotif();
			updater.continueUpdater();
			DollchanAPI.notify('submitform', { success: false, error: error });
			return;
		}
		var _pr = pr,
		    tNum = _pr.tNum;

		if ((Cfg.markMyPosts || Cfg.markMyLinks) && postNum) {
			MyPosts.set(postNum, tNum || postNum);
		}
		if (Cfg.favOnReply && !Cfg.sageReply) {
			if (tNum) {
				var _pByNum$get = pByNum.get(tNum),
				    thr = _pByNum$get.thr;

				if (!thr.isFav) {
					thr.toggleFavState(true);
				}
			} else {
				sesStorage['de-fav-newthr'] = JSON.stringify({ num: postNum, date: Date.now() });
			}
		}
		pr.clearForm();
		DollchanAPI.notify('submitform', { success: true, num: postNum });
		Cfg.stats[tNum ? 'reply' : 'op']++;
		saveCfgObj(aib.dm, Cfg);
		if (!tNum) {
			if (postNum) {
				window.location.assign(aib.getThrUrl(aib.b, postNum));
			} else if (isDocument) {
				var dForm = $q(aib.qDForm, data);
				if (dForm) {
					window.location.assign(aib.getThrUrl(aib.b, aib.getTNum(dForm)));
				}
			}
			return;
		}
		if (aib.t) {
			Post.clearMarks();
			Thread.first.loadNewPosts().then(function () {
				return AjaxError.Success;
			}, function (err) {
				return err;
			}).then(function (err) {
				infoLoadErrors(err);
				if (Cfg.scrAfterRep) {
					scrollTo(0, window.pageYOffset + Thread.first.last.el.getBoundingClientRect().top);
				}
				updater.continueUpdater(true);
				closePopup('upload');
			});
		} else {
			pByNum.get(tNum).thr.loadPosts(visPosts, false, false).then(function () {
				return closePopup('upload');
			});
		}
		pr.closeReply();
		pr.refreshCap();
	}

	function cleanFile(data, extraData) {
		var img = nav.getUnsafeUint8Array(data);
		var rand = Cfg.postSameImg && String(Math.round(Math.random() * 1e6));
		var rv = extraData ? rand ? [img, extraData, rand] : [img, extraData] : rand ? [img, rand] : [img];
		var rExif = !!Cfg.removeEXIF;
		if (!rand && !rExif && !extraData) {
			return rv;
		}
		var i = void 0,
		    len = void 0,
		    val = void 0,
		    lIdx = void 0,
		    jpgDat = void 0;
		var subarray = function subarray(begin, end) {
			return nav.getUnsafeUint8Array(data, begin, end - begin);
		};
		if (img[0] === 0xFF && img[1] === 0xD8) {
			var deep = 1;
			for (i = 2, len = img.length - 1, val = [null, null], lIdx = 2, jpgDat = null; i < len;) {
				if (img[i] === 0xFF) {
					if (rExif) {
						if (!jpgDat && deep === 1) {
							if (img[i + 1] === 0xE1 && img[i + 4] === 0x45) {
								jpgDat = readExif(data, i + 10, (img[i + 2] << 8) + img[i + 3]);
							} else if (img[i + 1] === 0xE0 && img[i + 7] === 0x46 && (img[i + 2] !== 0 || img[i + 3] >= 0x0E || img[i + 15] !== 0xFF)) {
								jpgDat = subarray(i + 11, i + 16);
							}
						}
						if (img[i + 1] >> 4 === 0xE && img[i + 1] !== 0xEE || img[i + 1] === 0xFE) {
							if (lIdx !== i) {
								val.push(subarray(lIdx, i));
							}
							i += 2 + (img[i + 2] << 8) + img[i + 3];
							lIdx = i;
							continue;
						}
					} else if (img[i + 1] === 0xD8) {
						deep++;
						i++;
						continue;
					}
					if (img[i + 1] === 0xD9 && --deep === 0) {
						break;
					}
				}
				i++;
			}
			i += 2;
			if (!extraData && len - i > 75) {
				i = len;
			}
			if (lIdx === 2) {
				if (i !== len) {
					rv[0] = nav.getUnsafeUint8Array(data, 0, i);
				}
				return rv;
			}
			val[0] = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0, 0x0E, 0x4A, 0x46, 0x49, 0x46, 0, 1, 1]);
			val[1] = jpgDat || new Uint8Array([0, 0, 1, 0, 1]);
			val.push(subarray(lIdx, i));
			if (extraData) {
				val.push(extraData);
			}
			if (rand) {
				val.push(rand);
			}
			return val;
		}
		if (img[0] === 0x89 && img[1] === 0x50) {
			for (i = 0, len = img.length - 7; i < len && (img[i] !== 0x49 || img[i + 1] !== 0x45 || img[i + 2] !== 0x4E || img[i + 3] !== 0x44); ++i) {}
			i += 8;
			if (i !== len && (extraData || len - i <= 75)) {
				rv[0] = nav.getUnsafeUint8Array(data, 0, i);
			}
			return rv;
		}
		if (img[0] === 0x1a && img[1] === 0x45 && img[2] === 0xDF && img[3] === 0xA3) {
			return new WebmParser(data).addWebmData(rand).getWebmData();
		}
		return null;
	}

	function readExif(data, off, len) {
		var xRes = 0;
		var yRes = 0;
		var resT = 0;
		var dv = nav.getUnsafeDataView(data, off);
		var le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
		if (dv.getUint16(2, le) !== 0x2A) {
			return null;
		}
		var i = dv.getUint32(4, le);
		if (i > len) {
			return null;
		}
		for (var j = 0, tgLen = dv.getUint16(i, le); j < tgLen; ++j) {
			var dE = i + 2 + 12 * j;
			var tag = dv.getUint16(dE, le);
			if (tag === 0x0128) {
				resT = dv.getUint16(dE + 8, le) - 1;
			} else if (tag === 0x011A || tag === 0x011B) {
				dE = dv.getUint32(dE + 8, le);
				if (dE > len) {
					return null;
				}
				if (tag === 0x11A) {
					xRes = Math.round(dv.getUint32(dE, le) / dv.getUint32(dE + 4, le));
				} else {
					yRes = Math.round(dv.getUint32(dE, le) / dv.getUint32(dE + 4, le));
				}
			}
		}
		xRes = xRes || yRes;
		yRes = yRes || xRes;
		return new Uint8Array([resT & 0xFF, xRes >> 8, xRes & 0xFF, yRes >> 8, yRes & 0xFF]);
	}


	var Files = function () {
		function Files(form, fileEl) {
			var _this34 = this;

			_classCallCheck(this, Files);

			this.filesCount = 0;
			this.fileTd = $parent(fileEl, 'TD');
			this.onchange = null;
			this._form = form;
			this._inputs = Array.from($Q('input[type="file"]', this.fileTd), function (el) {
				return new FileInput(_this34, el);
			});
			this._files = [];
			this.hideEmpty();
		}

		_createClass(Files, [{
			key: 'changeMode',
			value: function changeMode() {
				var cfg = Cfg.fileInputs === 2 && Cfg.ajaxPosting;
				var _iteratorNormalCompletion24 = true;
				var _didIteratorError24 = false;
				var _iteratorError24 = undefined;

				try {
					for (var _iterator24 = this._inputs[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
						var inp = _step24.value;

						inp.changeMode(cfg);
					}
				} catch (err) {
					_didIteratorError24 = true;
					_iteratorError24 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion24 && _iterator24.return) {
							_iterator24.return();
						}
					} finally {
						if (_didIteratorError24) {
							throw _iteratorError24;
						}
					}
				}

				this.hideEmpty();
			}
		}, {
			key: 'clearInputs',
			value: function clearInputs() {
				var _iteratorNormalCompletion25 = true;
				var _didIteratorError25 = false;
				var _iteratorError25 = undefined;

				try {
					for (var _iterator25 = this._inputs[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
						var inp = _step25.value;

						inp.clearInp();
					}
				} catch (err) {
					_didIteratorError25 = true;
					_iteratorError25 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion25 && _iterator25.return) {
							_iterator25.return();
						}
					} finally {
						if (_didIteratorError25) {
							throw _iteratorError25;
						}
					}
				}

				this.hideEmpty();
			}
		}, {
			key: 'hideEmpty',
			value: function hideEmpty() {
				for (var els = this._inputs, i = els.length - 1; i > 0; --i) {
					var inp = els[i];
					if (inp.hasFile) {
						break;
					} else if (els[i - 1].hasFile) {
						inp.showInp();
						break;
					}
					inp.hideInp();
				}
			}
		}, {
			key: 'rarInput',
			get: function get() {
				var value = $bEnd(docBody, '<input type="file" style="display: none;">');
				Object.defineProperty(this, 'rarInput', { value: value });
				return value;
			}
		}, {
			key: 'thumbsEl',
			get: function get() {
				var value = void 0;
				if (aib.multiFile) {
					value = $aEnd(this.fileTd.parentNode, '<div id="de-file-area"></div>');
				} else {
					value = $q(aib.formTd, $parent(this._form.txta, 'TR'));
					value.innerHTML = '<div style="display: none;">' + value.innerHTML + '</div><div></div>';
					value = value.lastChild;
				}
				Object.defineProperty(this, 'thumbsEl', { value: value });
				return value;
			}
		}]);

		return Files;
	}();

	var FileInput = function () {
		function FileInput(parent, el) {
			_classCallCheck(this, FileInput);

			this.extraFile = null;
			this.hasFile = false;
			this.imgFile = null;
			this._input = el;
			this._isTxtEditable = false;
			this._mediaEl = null;
			this._parent = parent;
			this._rarMsg = null;
			this._spoilEl = $q('input[type="checkbox"][name="spoiler"]', el.parentNode);
			this._thumb = null;
			this._utils = $add('<div class="de-file-utils">\n\t\t\t<div class="de-file-btn-rar" title="' + Lng.helpAddFile[lang] + '" style="display: none;"></div>\n\t\t\t<input class="de-file-spoil" type="checkbox" title="' + (Lng.spoilFile[lang] + '" style="display: none;">\n\t\t\t<div class="de-file-btn-txt" title="' + Lng.addManually[lang] + '"></div>\n\t\t\t<div class="de-file-btn-del" title="' + Lng.removeFile[lang] + '" style="display: none;"></div>\n\t\t</div>'));

			var _ref45 = [].concat(_toConsumableArray(this._utils.children));

			this._btnRarJpg = _ref45[0];
			this._btnSpoil = _ref45[1];
			this._btnTxt = _ref45[2];
			this._btnDel = _ref45[3];

			this._utils.addEventListener('click', this);
			this._txtWrap = $add('<span class="de-file-txt-wrap">\n\t\t\t<input type="text" name="de-file-txt" class="de-file-txt-input de-file-txt-noedit" title="' + (Lng.youCanDrag[lang] + '" placeholder="' + Lng.dropFileHere[lang] + '">\n\t\t\t<input type="button" class="de-file-txt-add" value="+" title="') + (Lng.add[lang] + '" style="display: none;"></span>'));

			var _ref46 = [].concat(_toConsumableArray(this._txtWrap.children));

			this._txtInput = _ref46[0];
			this._txtAddBtn = _ref46[1];

			this._txtWrap.addEventListener('click', this);
			this._toggleDragEvents(this._txtWrap, true);
			if (Cfg.ajaxPosting) {
				$hide(el);
			}
			el.obj = this;
			el.classList.add('de-file-input');
			el.addEventListener('change', this);
			if (el.files && el.files[0]) {
				this._removeFile();
			}
			if (aib.multiFile && Cfg.fileInputs && Cfg.ajaxPosting) {
				this._input.setAttribute('multiple', true);
			}
			if (FileInput._isThumb) {
				this._initThumbs();
			} else {
				if (Cfg.fileInputs === 1 && Cfg.ajaxPosting) {
					$before(el, this._txtWrap);
				}
				$after(el, this._utils);
			}
		}

		_createClass(FileInput, [{
			key: 'changeMode',
			value: function changeMode(showThumbs) {
				if (!(showThumbs ^ !!this._thumb)) {
					return;
				}
				toggleAttr(this._input, 'multiple', true, aib.multiFile && Cfg.fileInputs && Cfg.ajaxPosting);
				if (showThumbs) {
					this._initThumbs();
					return;
				}
				var el = this._txtWrap.parentNode.parentNode;
				$before(this._input, this._txtWrap);
				$after(this._input, this._utils);
				$del(el);
				$show(this._parent.fileTd.parentNode);
				$show(this._txtWrap);
				if (this._mediaEl) {
					window.URL.revokeObjectURL(this._mediaEl.src);
				}
				this._toggleDragEvents(this._thumb, false);
				$del(this._thumb);
				this._thumb = this._mediaEl = null;
			}
		}, {
			key: 'clearInp',
			value: function clearInp() {
				if (FileInput._isThumb) {
					this._thumb.classList.add('de-file-off');
					if (this._mediaEl) {
						window.URL.revokeObjectURL(this._mediaEl.src);
						this._mediaEl.parentNode.title = Lng.youCanDrag[lang];
						$del(this._mediaEl);
						this._mediaEl = null;
					}
				}
				if (this._btnDel) {
					this._showDelBtn(false);
					$hide(this._btnSpoil);
					$hide(this._btnRarJpg);
					$hide(this._txtAddBtn);
					$del(this._rarMsg);
					if (FileInput._isThumb) {
						$hide(this._txtWrap);
					}
					this._txtInput.value = '';
					this._txtInput.classList.add('de-file-txt-noedit');
					this._txtInput.placeholder = Lng.dropFileHere[lang];
				}
				this.extraFile = this.imgFile = null;
				this._isTxtEditable = false;
				this._changeFilesCount(-1);
				this._removeFile();
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				var _this35 = this;

				var el = e.target;
				var thumb = this._thumb;
				var isThumb = el === thumb || el.className === 'de-file-img';
				switch (e.type) {
					case 'change':
						{
							var inpArray = this._parent._inputs;
							var curInpIdx = inpArray.indexOf(this);
							var filesLen = el.files.length;
							if (filesLen > 1) {
								(function () {
									var allowedLen = Math.min(filesLen, inpArray.length - curInpIdx);
									var j = allowedLen;
									for (var i = 0; i < allowedLen; ++i) {
										FileInput._readDroppedFile(inpArray[curInpIdx + i], el.files[i]).then(function () {
											if (! --j) {
												_this35._removeFileHelper();
											}
										});
										_this35._parent._files[curInpIdx + i] = el.files[i];
									}
								})();
							} else {
								setTimeout(function () {
									return _this35._onFileChange(false);
								}, 20);
								if (filesLen > 0) {
									this._parent._files[curInpIdx] = el.files[0];
								} else {
									delete this._parent._files[curInpIdx];
								}
							}
							DollchanAPI.notify('filechange', this._parent._files);
							return;
						}
					case 'click':
						if (isThumb) {
							this._input.click();
						} else if (el === this._btnDel) {
							this.clearInp();
							this._parent.hideEmpty();
							delete this._parent._files[this._parent._inputs.indexOf(this)];
							DollchanAPI.notify('filechange', this._parent._files);
						} else if (el === this._btnSpoil) {
							this._spoilEl.checked = this._btnSpoil.checked;
							return;
						} else if (el === this._btnRarJpg) {
							this._addRarJpeg();
						} else if (el === this._btnTxt) {
							this._showDelBtn(this._isTxtEditable = true);
							$show(this._txtAddBtn);
							if (FileInput._isThumb) {
								$toggle(this._txtWrap);
							}
							this._txtInput.classList.remove('de-file-txt-noedit');
							this._txtInput.placeholder = Lng.enterTheLink[lang];
							this._txtInput.focus();
						} else if (el === this._txtAddBtn) {
							this._addUrlFile(this._txtInput.value);
						} else if (el === this._txtInput && !this._isTxtEditable) {
							this._input.click();
							this._txtInput.blur();
						}
						e.stopPropagation();
						$pd(e);
						return;
					case 'dragenter':
						if (isThumb) {
							thumb.classList.add('de-file-drag');
						}
						return;
					case 'dragleave':
						if (isThumb && el.classList.contains('de-file-img')) {
							thumb.classList.remove('de-file-drag');
						}
						return;
					case 'drop':
						{
							var dt = e.dataTransfer;
							if (!isThumb && el !== this._txtInput) {
								return;
							}
							var _filesLen = dt.files.length;
							if (_filesLen) {
								var _inpArray = this._parent._inputs;
								var inpLen = _inpArray.length;
								for (var i = _inpArray.indexOf(this), j = 0; i < inpLen && j < _filesLen; ++i, ++j) {
									FileInput._readDroppedFile(_inpArray[i], dt.files[j]);
									this._parent._files[i] = dt.files[j];
								}
								DollchanAPI.notify('filechange', this._parent._files);
							} else {
								this._addUrlFile(dt.getData('text/plain'));
							}
							setTimeout(function () {
								return thumb.classList.remove('de-file-drag');
							}, 10);
							e.stopPropagation();
							$pd(e);
						}
				}
			}
		}, {
			key: 'hideInp',
			value: function hideInp() {
				if (FileInput._isThumb) {
					this._showDelBtn(false);
					$hide(this._thumb);
					$hide(this._txtWrap);
				}
				$hide(this._wrap);
			}
		}, {
			key: 'showInp',
			value: function showInp() {
				if (FileInput._isThumb) {
					$show(this._thumb);
				}
				$show(this._wrap);
			}
		}, {
			key: '_addNewThumb',
			value: function _addNewThumb(fileData, fileName, fileType, fileSize) {
				var el = this._thumb;
				el.classList.remove('de-file-off');
				el = el.firstChild.firstChild;
				el.title = fileName + ', ' + (fileSize / 1024).toFixed(2) + 'KB';
				this._mediaEl = el = $aBegin(el, fileType.startsWith('video/') ? '<video class="de-file-img" loop autoplay muted src=""></video>' : '<img class="de-file-img" src="">');
				el.src = window.URL.createObjectURL(new Blob([fileData]));
				if (el = el.nextSibling) {
					window.URL.revokeObjectURL(el.src);
					$del(el);
				}
			}
		}, {
			key: '_addRarJpeg',
			value: function _addRarJpeg() {
				var _this36 = this;

				var el = this._parent.rarInput;
				el.onchange = function (e) {
					$hide(_this36._btnRarJpg);
					var myBtn = _this36._rarMsg = $aBegin(_this36._utils, '<span><svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg></span>');
					var file = e.target.files[0];
					readFile(file).then(function (_ref47) {
						var data = _ref47.data;

						if (_this36._rarMsg === myBtn) {
							myBtn.className = 'de-file-rarmsg';
							var origFileName = _this36.imgFile ? _this36.imgFile[1] : _this36._input.files[0].name;
							myBtn.title = origFileName + ' + ' + file.name;
							myBtn.textContent = origFileName.split('.').pop() + ' + ' + file.name.split('.').pop();
							_this36.extraFile = data;
						}
					});
				};
				el.click();
			}
		}, {
			key: '_addUrlFile',
			value: function _addUrlFile(url) {
				var _this37 = this;

				var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (!url) {
					return Promise.reject(new Error('URL is null'));
				}
				$popup('file-loading', Lng.loading[lang], true);
				return ContentLoader.loadImgData(url, false).then(function (data) {
					if (file) {
						window.URL.revokeObjectURL(url);
					}
					if (!data) {
						$popup('file-loading', Lng.cantLoad[lang] + ' URL: ' + url);
						return;
					}
					closePopup('file-loading');
					_this37._isTxtEditable = false;
					var name = file ? file.name : url.split('/').pop();
					var type = file && file.type || getFileType(name);
					if (!type || name.includes('?')) {
						var ext = void 0;
						switch (data[0] << 8 | data[1]) {
							case 0xFFD8:
								ext = 'jpg';break;
							case 0x8950:
								ext = 'png';break;
							case 0x4749:
								ext = 'gif';break;
							case 0x1A45:
								ext = 'webm';break;
							default:
								ext = '';
						}
						if (ext) {
							name = name.split('?').shift() + '.' + ext;
						}
					}
					_this37.imgFile = [data.buffer, name, type || getFileType(name)];
					if (!file) {
						file = new Blob([data], { type: _this37.imgFile[2] });
						file.name = name;
					}
					_this37._parent._files[_this37._parent._inputs.indexOf(_this37)] = file;
					DollchanAPI.notify('filechange', _this37._parent._files);
					if (FileInput._isThumb) {
						$hide(_this37._txtWrap);
					}
					_this37._onFileChange(true);
				});
			}
		}, {
			key: '_changeFilesCount',
			value: function _changeFilesCount(val) {
				this._parent.filesCount = Math.max(this._parent.filesCount + val, 0);
				if (aib.dobr) {
					this._parent.fileTd.firstElementChild.value = this._parent.filesCount + 1;
				}
			}
		}, {
			key: '_initThumbs',
			value: function _initThumbs() {
				var fileTr = this._parent.fileTd.parentNode;
				$hide(fileTr);
				$hide(this._txtWrap);
				($q('.de-file-txt-area') || $bBegin(fileTr, '<tr class="de-file-txt-area">\n\t\t\t<td class="postblock"></td><td></td></tr>')).lastChild.appendChild(this._txtWrap);
				this._thumb = $bEnd(this._parent.thumbsEl, '<div class="de-file de-file-off"><div class="de-file-img"><div class="de-file-img" title="' + Lng.youCanDrag[lang] + '"></div></div></div>');
				this._thumb.addEventListener('click', this);
				this._thumb.addEventListener('dragenter', this);
				this._thumb.appendChild(this._utils);
				this._toggleDragEvents(this._thumb, true);
				if (this.hasFile) {
					this._showFileThumb();
				}
			}
		}, {
			key: '_onFileChange',
			value: function _onFileChange(hasImgFile) {
				this._txtInput.value = hasImgFile ? this.imgFile[1] : this._input.files[0].name;
				if (!hasImgFile) {
					this.imgFile = null;
				}
				if (this._parent.onchange) {
					this._parent.onchange();
				}
				if (FileInput._isThumb) {
					this._showFileThumb();
				}
				if (this.hasFile) {
					this.extraFile = null;
				} else {
					this.hasFile = true;
					this._changeFilesCount(+1);
					this._showDelBtn(true);
					$hide(this._txtAddBtn);
					if (FileInput._isThumb) {
						$hide(this._txtWrap);
					}
					if (this._spoilEl) {
						this._btnSpoil.checked = this._spoilEl.checked;
						$show(this._btnSpoil);
					}
					this._txtInput.classList.add('de-file-txt-noedit');
					this._txtInput.placeholder = Lng.dropFileHere[lang];
				}
				this._parent.hideEmpty();
				if (!nav.isPresto && !aib.fch && /^image\/(?:png|jpeg)$/.test(hasImgFile ? this.imgFile[2] : this._input.files[0].type)) {
					$del(this._rarMsg);
					$show(this._btnRarJpg);
				}
			}
		}, {
			key: '_removeFile',
			value: function _removeFile() {
				this._removeFileHelper();
				this.hasFile = false;
				delete this._parent._files[this._parent._inputs.indexOf(this)];
			}
		}, {
			key: '_removeFileHelper',
			value: function _removeFileHelper() {
				var oldEl = this._input;
				var newEl = $aEnd(oldEl, oldEl.outerHTML);
				oldEl.removeEventListener('change', this);
				newEl.addEventListener('change', this);
				newEl.obj = this;
				this._input = newEl;
				$del(oldEl);
			}
		}, {
			key: '_showDelBtn',
			value: function _showDelBtn(isShow) {
				$toggle(this._btnDel, isShow);
				$toggle(this._btnTxt, !isShow);
			}
		}, {
			key: '_showFileThumb',
			value: function _showFileThumb() {
				var _this38 = this;

				var imgFile = this.imgFile;

				if (imgFile) {
					this._addNewThumb.apply(this, _toConsumableArray(imgFile).concat([imgFile[0].byteLength]));
					return;
				}
				var file = this._input.files[0];
				if (file) {
					readFile(file).then(function (_ref48) {
						var data = _ref48.data;

						if (_this38._input.files[0] === file) {
							_this38._addNewThumb(data, file.name, file.type, file.size);
						}
					});
				}
			}
		}, {
			key: '_toggleDragEvents',
			value: function _toggleDragEvents(el, isAdd) {
				var name = isAdd ? 'addEventListener' : 'removeEventListener';
				el[name]('dragover', $pd);
				el[name]('dragenter', this);
				el[name]('dragleave', this);
				el[name]('drop', this);
			}
		}, {
			key: '_wrap',
			get: function get() {
				return aib.multiFile ? this._input.parentNode : this._input;
			}
		}], [{
			key: '_readDroppedFile',
			value: function _readDroppedFile(input, file) {
				return readFile(file).then(function (_ref49) {
					var data = _ref49.data;

					input.imgFile = [data, file.name, file.type];
					input.showInp();
					input._onFileChange(true);
				});
			}
		}, {
			key: '_isThumb',
			get: function get() {
				return Cfg.fileInputs === 2 && Cfg.ajaxPosting;
			}
		}]);

		return FileInput;
	}();


	var Captcha = function () {
		function Captcha(el, initNum) {
			_classCallCheck(this, Captcha);

			this.hasCaptcha = true;
			this.textEl = null;
			this.tNum = initNum;
			this.parentEl = el.tagName === 'TR' ? el : aib.getCapParent(el);
			this.isAdded = false;
			this._isRecap = !!$q('[id*="recaptcha"], [class*="recaptcha"]', this.parentEl);
			this._lastUpdate = null;
			this.originHTML = this.parentEl.innerHTML;
			$hide(this.parentEl);
			if (!this._isRecap) {
				this.parentEl.innerHTML = '';
			}
		}

		_createClass(Captcha, [{
			key: 'addCaptcha',
			value: function addCaptcha() {
				if (this.isAdded) {
					return;
				}
				this.isAdded = true;
				if (!this._isRecap) {
					this.parentEl.innerHTML = this.originHTML;
					this.textEl = $q('input[type="text"][name*="aptcha"]', this.parentEl);
				} else if (this._isOldRecap()) {
					this.textEl = $id('recaptcha_response_field');
				} else {
					var el = $q('#g-recaptcha, .g-recaptcha' + (aib.fch ? ', #qrCaptchaContainerAlt' : ''));
					$replace(el, '<div id="g-recaptcha" class="g-recaptcha" data-sitekey="' + el.getAttribute('data-sitekey') + '"></div>');
				}
				this.initCapPromise();
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				switch (e.type) {
					case 'keypress':
						{
							if (!Cfg.captchaLang || e.which === 0) {
								return;
							}
							var ruUa = 'йцукенгшщзхъїфыівапролджэєячсмитьбюёґ';
							var en = "qwertyuiop[]]assdfghjkl;''zxcvbnm,.`\\";
							var code = e.charCode || e.keyCode;
							var i = void 0,
							    chr = String.fromCharCode(code).toLowerCase();
							if (Cfg.captchaLang === 1) {
								if (code < 0x0410 || code > 0x04FF || (i = ruUa.indexOf(chr)) === -1) {
									return;
								}
								chr = en[i];
							} else {
								if (code < 0x0021 || code > 0x007A || (i = en.indexOf(chr)) === -1) {
									return;
								}
								chr = ruUa[i];
							}
							$txtInsert(e.target, chr);
							break;
						}
					case 'focus':
						this.updateOutdated();
				}
				$pd(e);
				e.stopPropagation();
			}
		}, {
			key: 'initCapPromise',
			value: function initCapPromise() {
				var _this39 = this;

				var initPromise = aib.initCaptcha ? aib.initCaptcha(this) : null;
				if (initPromise) {
					initPromise.then(function () {
						return _this39.showCaptcha();
					}, function (err) {
						if (err instanceof AjaxError) {
							_this39._setUpdateError(err);
						} else {
							_this39.hasCaptcha = false;
						}
					});
				} else if (this.hasCaptcha) {
					this.showCaptcha(true);
				}
			}
		}, {
			key: 'initImage',
			value: function initImage(img) {
				var _this40 = this;

				img.title = Lng.refresh[lang];
				img.alt = Lng.loading[lang];
				img.style.cssText = 'vertical-align: text-bottom; border: none; cursor: pointer;';
				img.onclick = function () {
					return _this40.refreshCaptcha(true);
				};
			}
		}, {
			key: 'initTextEl',
			value: function initTextEl() {
				this.textEl.autocomplete = 'off';
				if (!aib.kus && (aib.multiFile || Cfg.fileInputs !== 2)) {
					this.textEl.placeholder = Lng.cap[lang];
				}
				this.textEl.addEventListener('keypress', this);
				this.textEl.onkeypress = null;
				this.textEl.addEventListener('focus', this);
				this.textEl.onfocus = null;
			}
		}, {
			key: 'showCaptcha',
			value: function showCaptcha() {
				var isUpdateImage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (!this.textEl) {
					$show(this.parentEl);
					if (aib.updateCaptcha) {
						aib.updateCaptcha(this, false);
					} else if (this._isRecap) {
						this._updateRecap();
					}
					return;
				}
				this.initTextEl();
				var img = void 0;
				if (this._isRecap || !(img = $q('img', this.parentEl))) {
					$show(this.parentEl);
					return;
				}
				this.initImage(img);
				var a = img.parentNode;
				if (a.tagName === 'A') {
					$replace(a, img);
				}
				if (isUpdateImage) {
					this.refreshCaptcha(false);
				} else {
					this._lastUpdate = Date.now();
				}
				$show(this.parentEl);
			}
		}, {
			key: 'refreshCaptcha',
			value: function refreshCaptcha(isFocus) {
				var _this41 = this;

				var isErr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var tNum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tNum;

				if (!this.isAdded || tNum !== this.tNum) {
					this.tNum = tNum;
					this.isAdded = false;
					this.hasCaptcha = true;
					this.textEl = null;
					$hide(this.parentEl);
					this.addCaptcha();
					return;
				} else if (!this.hasCaptcha && !isErr) {
					return;
				}
				this._lastUpdate = Date.now();
				if (aib.updateCaptcha) {
					var updatePromise = aib.updateCaptcha(this, isErr);
					if (updatePromise) {
						updatePromise.then(function () {
							return _this41._updateTextEl(isFocus);
						}, function (err) {
							return _this41._setUpdateError(err);
						});
					}
				} else if (this._isRecap) {
					this._updateRecap();
				} else if (this.textEl) {
					this._updateTextEl(isFocus);
					var img = $q('img', this.parentEl);
					if (!img) {
						return;
					}
					if (aib.getCaptchaSrc) {
						var src = img.getAttribute('src');
						if (src) {
							img.src = '';
							img.src = aib.getCaptchaSrc(src, tNum);
						}
					} else {
						img.click();
					}
				}
			}
		}, {
			key: 'updateHelper',
			value: function updateHelper(url, fn) {
				if (aib._capUpdPromise) {
					aib._capUpdPromise.cancelPromise();
				}
				return aib._capUpdPromise = $ajax(url).then(function (xhr) {
					aib._capUpdPromise = null;
					fn(xhr);
				}, function (err) {
					if (!(err instanceof CancelError)) {
						aib._capUpdPromise = null;
						return CancelablePromise.reject(err);
					}
				});
			}
		}, {
			key: 'updateOutdated',
			value: function updateOutdated() {
				if (this._lastUpdate && Date.now() - this._lastUpdate > Cfg.capUpdTime * 1e3) {
					this.refreshCaptcha(false);
				}
			}
		}, {
			key: '_isOldRecap',
			value: function _isOldRecap() {
				return !!$id('recaptcha_widget_div');
			}
		}, {
			key: '_setUpdateError',
			value: function _setUpdateError(e) {
				var _this42 = this;

				if (e) {
					this.parentEl = e.toString();
					this.isAdded = false;
					this.parentEl.onclick = function () {
						_this42.parentEl.onclick = null;
						_this42.addCaptcha();
					};
					$show(this.parentEl);
				}
			}
		}, {
			key: '_updateRecap',
			value: function _updateRecap() {
				if (this._isOldRecap()) {
					$script('Recaptcha.reload()');
				} else {
					var script = doc.createElement('script');
					script.type = 'text/javascript';
					script.src = aib.prot + '//www.google.com/recaptcha/api.js';
					doc.head.appendChild(script);
					setTimeout(function () {
						return $del(script);
					}, 1e5);
				}
			}
		}, {
			key: '_updateTextEl',
			value: function _updateTextEl(isFocus) {
				if (this.textEl) {
					this.textEl.value = '';
					if (isFocus) {
						this.textEl.focus();
					}
				}
			}
		}]);

		return Captcha;
	}();


	var AbstractPost = function () {
		function AbstractPost(thr, num, isOp) {
			_classCallCheck(this, AbstractPost);

			this.isOp = isOp;
			this.kid = null;
			this.num = num;
			this.ref = new RefMap(this);
			this.thr = thr;
			this._hasEvents = false;
			this._linkDelay = 0;
			this._menu = null;
			this._menuDelay = 0;
		}

		_createClass(AbstractPost, [{
			key: 'addFuncs',
			value: function addFuncs() {
				RefMap.updateRefMap(this, true);
				embedAudioLinks(this);
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				var _this43 = this;

				var temp = void 0,
				    el = fixEventEl(e.target);
				var type = e.type;

				var isOutEvent = type === 'mouseout';
				var isPview = this instanceof Pview;
				if (type === 'click') {
					switch (e.button) {
						case 0:
							break;
						case 1:
							e.stopPropagation();
						default:
							return;
					}
					if (this._menu) {
						this._menu.removeMenu();
						this._menu = null;
					}
					switch (el.tagName) {
						case 'A':
							if (el.classList.contains('de-video-link')) {
								this.videos.clickLink(el, Cfg.addYouTube);
								$pd(e);
								return;
							}
							if ((temp = el.firstElementChild) && temp.tagName === 'IMG') {
								el = temp;
							} else {
								temp = el.parentNode;
								if (temp === this.trunc) {
									this._getFullMsg(temp, false);
									$pd(e);
									e.stopPropagation();
								} else if (Cfg.insertNum && pr.form && (this._pref === temp || this._pref === el) && !/Reply|Ответ/.test(el.textContent)) {
									$pd(e);
									e.stopPropagation();
									if (!Cfg.showRepBtn) {
										quotetxt = window.getSelection().toString();
										pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
										quotetxt = '';
									} else if (pr.isQuick || aib.t && pr.isHidden) {
										pr.showQuickReply(isPview ? Pview.topParent : this, this.num, false, true);
									} else if (aib.t) {
										var formText = pr.txta.value;
										var isOnNewLine = formText === '' || formText.slice(-1) === '\n';
										$txtInsert(pr.txta, '>>' + this.num + (isOnNewLine ? '\n' : ''));
									} else {
										window.location.assign(el.href.replace(/#i/, '#'));
									}
								} else if ((temp = el.textContent)[0] === '>' && temp[1] === '>' && !temp[2].includes('/')) {
									var post = pByNum.get(+temp.match(/\d+/));
									if (post) {
										post.selectAndScrollTo();
									}
								}
								return;
							}
						case 'IMG':
							if (el.classList.contains('de-video-thumb')) {
								if (Cfg.addYouTube === 3) {
									var videos = this.videos;

									videos.currentLink.classList.add('de-current');
									videos.setPlayer(videos.playerInfo, el.classList.contains('de-ytube'));
									$pd(e);
								}
							} else if (Cfg.expandImgs !== 0) {
								this._clickImage(el, e);
							}
							return;
						case 'OBJECT':
						case 'VIDEO':
							if (Cfg.expandImgs !== 0 && !ExpandableImage.isControlClick(e)) {
								this._clickImage(el, e);
							}
							return;
					}
					if (aib.mak) {
						switch (el.className) {
							case 'fa fa-bolt':
							case 'fa fa-thumbs-down':
								el = el.parentNode;
							case 'like-icon':
							case 'dislike-icon':
							case 'like-caption':
							case 'dislike-caption':
							case 'like-count':
							case 'dislike-count':
								el = el.parentNode;
							case 'like-div':
							case 'dislike-div':
								{
									var task = el.className.split('-')[0];
									var num = +el.id.match(/\d+/);
									$ajax('/makaba/likes.fcgi?task=' + task + '&board=' + aib.b + '&num=' + num).then(function (xhr) {
										var data = JSON.parse(xhr.responseText);
										if (data.Status !== 'OK') {
											$popup('err-2chlike', data.Reason);
											return;
										}
										el.classList.add(task + '-div-checked');
										var countEl = $q('.' + task + '-count', el);
										countEl.textContent = +countEl.textContent + 1;
									}, function () {
										return $popup('err-2chlike', Lng.noConnect[lang]);
									});
								}
						}
						if (el.classList.contains('expand-large-comment')) {
							this._getFullMsg(el, false);
							$pd(e);
							e.stopPropagation();
						}
					}
					switch (el.classList[0]) {
						case 'de-btn-expthr':
							this.thr.loadPosts('all');return;
						case 'de-btn-fav':
							this.thr.toggleFavState(true, isPview ? this : null);return;
						case 'de-btn-fav-sel':
							this.thr.toggleFavState(false, isPview ? this : null);return;
						case 'de-btn-hide':
						case 'de-btn-hide-user':
						case 'de-btn-unhide':
						case 'de-btn-unhide-user':
							this.setUserVisib(!this.isHidden);return;
						case 'de-btn-rep':
							pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
							quotetxt = '';
							return;
						case 'de-btn-sage':
							Spells.addSpell(9, '', false);return;
						case 'de-btn-stick':
							this.toggleSticky(true);return;
						case 'de-btn-stick-on':
							this.toggleSticky(false);return;
					}
					return;
				}
				if (!isOutEvent && Cfg.expandImgs && el.tagName === 'IMG' && !el.classList.contains('de-fullimg') && (temp = this.images.getImageByEl(el)) && (temp.isImage || temp.isVideo)) {
					el.title = Cfg.expandImgs === 1 ? Lng.expImgInline[lang] : Lng.expImgFull[lang];
				}
				if (!this._hasEvents) {
					this._hasEvents = true;
					this.el.addEventListener('click', this, true);
					this.el.addEventListener('mouseout', this, true);
				}
				switch (el.classList[0]) {
					case 'de-post-btns':
						el.removeAttribute('title');return;
					case 'de-btn-rep':
						this.btns.title = Lng.replyToPost[lang];
						if (!isOutEvent) {
							quotetxt = window.getSelection().toString();
						}
						return;
					case 'de-btn-hide':
					case 'de-btn-hide-user':
					case 'de-btn-unhide':
					case 'de-btn-unhide-user':
						this.btns.title = this.isOp ? Lng.toggleThr[lang] : Lng.togglePost[lang];
						if (Cfg.menuHiddBtn && !(this instanceof Pview)) {
							this._addMenu(el, isOutEvent, this._getMenuHide(el));
						}
						return;
					case 'de-btn-expthr':
						this.btns.title = Lng.expandThr[lang];
						if (!(this instanceof Pview)) {
							this._addMenu(el, isOutEvent, arrTags(Lng.selExpandThr[lang], '<span class="de-menu-item" info="thr-exp">', '</span>'));
						}
						return;
					case 'de-btn-fav':
						this.btns.title = Lng.addFav[lang];return;
					case 'de-btn-fav-sel':
						this.btns.title = Lng.delFav[lang];return;
					case 'de-btn-sage':
						this.btns.title = 'SAGE';return;
					case 'de-btn-stick':
						this.btns.title = Lng.attachPview[lang];return;
					case 'de-btn-src':
						this._addMenu(el, isOutEvent, AbstractPost._getMenuImgSrc(el));return;
					default:
						if (!Cfg.linksNavig || el.tagName !== 'A' || el.lchecked) {
							return;
						}
						if (!el.textContent.startsWith('>>')) {
							el.lchecked = true;
							return;
						}
						el.className = 'de-link-pref ' + el.className;
					case 'de-link-ref':
					case 'de-link-pref':
						if (!Cfg.linksNavig) {
							return;
						}
						if (isOutEvent) {
							clearTimeout(this._linkDelay);
							if (!(aib.getPostOfEl(fixEventEl(e.relatedTarget)) instanceof Pview) && Pview.top) {
								Pview.top.markToDel(); 
							} else if (this.kid) {
								this.kid.markToDel(); 
							}
						} else {
							this._linkDelay = setTimeout(function () {
								return _this43.kid = Pview.showPview(_this43, el);
							}, Cfg.linksOver);
						}
						$pd(e);
						e.stopPropagation();
				}
			}
		}, {
			key: 'toggleFavBtn',
			value: function toggleFavBtn(isEnable) {
				var elClass = isEnable ? 'de-btn-fav-sel' : 'de-btn-fav';
				if (this.btnFav) {
					this.btnFav.setAttribute('class', elClass);
				}
				if (this.thr.btnFav) {
					this.thr.btnFav.setAttribute('class', elClass);
				}
			}
		}, {
			key: 'updateMsg',
			value: function updateMsg(newMsg, sRunner) {
				var videoExt = void 0,
				    videoLinks = void 0;
				var origMsg = aib.dobr ? this.msg.firstElementChild : this.msg;
				if (Cfg.addYouTube) {
					videoExt = $q('.de-video-ext', origMsg);
					videoLinks = $Q(':not(.de-video-ext) > .de-video-link', origMsg);
				}
				$replace(origMsg, newMsg);
				Object.defineProperties(this, {
					msg: { configurable: true, value: newMsg },
					trunc: { configurable: true, value: null }
				});
				Post.Сontent.removeTempData(this);
				if (Cfg.addYouTube) {
					this.videos.updatePost(videoLinks, $Q('a[href*="youtu"], a[href*="vimeo.com"]', newMsg), false);
					if (videoExt) {
						newMsg.appendChild(videoExt);
					}
				}
				this.addFuncs();
				sRunner.runSpells(this);
				embedPostMsgImages(this.el);
				closePopup('load-fullmsg');
			}
		}, {
			key: '_addMenu',
			value: function _addMenu(el, isOutEvent, html) {
				var _this44 = this;

				if (this.menu && this.menu.parentEl === el) {
					return;
				}
				if (isOutEvent) {
					clearTimeout(this._menuDelay);
				} else {
					this._menuDelay = setTimeout(function () {
						return _this44._showMenu(el, html);
					}, Cfg.linksOver);
				}
			}
		}, {
			key: '_clickImage',
			value: function _clickImage(el, e) {
				var image = this.images.getImageByEl(el);
				if (!image || !image.isImage && !image.isVideo) {
					return;
				}
				image.expandImg(Cfg.expandImgs === 1 ^ e.ctrlKey, e);
				$pd(e);
				e.stopPropagation();
			}
		}, {
			key: '_getFullMsg',
			value: function _getFullMsg(truncEl, isInit) {
				var _this45 = this;

				if (aib.deleteTruncMsg) {
					aib.deleteTruncMsg(this, truncEl, isInit);
					return;
				}
				if (!isInit) {
					$popup('load-fullmsg', Lng.loading[lang], true);
				}
				ajaxLoad(aib.getThrUrl(aib.b, this.tNum)).then(function (form) {
					var sourceEl = void 0;
					var maybeSpells = new Maybe(SpellsRunner);
					if (_this45.isOp) {
						sourceEl = form;
					} else {
						var posts = $Q(aib.qRPost, form);
						for (var i = 0, len = posts.length; i < len; ++i) {
							var post = posts[i];
							if (_this45.num === aib.getPNum(post)) {
								sourceEl = post;
								break;
							}
						}
					}
					if (sourceEl) {
						_this45.updateMsg(aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, sourceEl))), maybeSpells.value);
						$del(truncEl);
					}
					if (maybeSpells.hasValue) {
						maybeSpells.value.endSpells();
					}
				}, emptyFn);
			}
		}, {
			key: '_showMenu',
			value: function _showMenu(el, html) {
				var _this46 = this;

				if (this._menu) {
					this._menu.removeMenu();
				}
				this._menu = new Menu(el, html, function (el) {
					return _this46._clickMenu(el);
				}, false);
				this._menu.onremove = function () {
					return _this46._menu = null;
				};
			}
		}, {
			key: 'btnFav',
			get: function get() {
				var value = $q('.de-btn-fav, .de-btn-fav-sel', this.btns);
				Object.defineProperty(this, 'btnFav', { value: value });
				return value;
			}
		}, {
			key: 'btnHide',
			get: function get() {
				var value = this.btns.firstChild;
				Object.defineProperty(this, 'btnHide', { value: value });
				return value;
			}
		}, {
			key: 'images',
			get: function get() {
				var value = new PostImages(this);
				Object.defineProperty(this, 'images', { value: value });
				return value;
			}
		}, {
			key: 'mp3Obj',
			get: function get() {
				var value = $bBegin(this.msg, '<div class="de-mp3"></div>');
				Object.defineProperty(this, 'mp3Obj', { value: value });
				return value;
			}
		}, {
			key: 'msg',
			get: function get() {
				var value = $q(aib.qPostMsg, this.el);
				Object.defineProperty(this, 'msg', { value: value, configurable: true });
				return value;
			}
		}, {
			key: 'trunc',
			get: function get() {
				var value = null;
				var el = aib.qTrunc && $q(aib.qTrunc, this.el);
				if (el && /long|full comment|gekürzt|слишком|длинн|мног|полн/i.test(el.textContent)) {
					value = el;
				}
				Object.defineProperty(this, 'trunc', { value: value, configurable: true });
				return value;
			}
		}, {
			key: 'videos',
			get: function get() {
				var value = Cfg.addYouTube ? new Videos(this) : null;
				Object.defineProperty(this, 'videos', { value: value });
				return value;
			}
		}], [{
			key: '_getMenuImgSrc',
			value: function _getMenuImgSrc(el) {
				var link = el.nextSibling;
				var p = encodeURIComponent(link.getAttribute('de-href') || link.href) + '" target="_blank">' + Lng.searchIn[lang];
				return '<a class="de-menu-item ' + ['de-src-google" href="https://www.google.com/searchbyimage?image_url=' + p + 'Google', 'de-src-yandex" href="http://yandex.ru/images/search?rpt=imageview&img_url=' + p + 'Yandex', 'de-src-tineye" href="http://tineye.com/search/?url=' + p + 'TinEye', 'de-src-saucenao" href="http://saucenao.com/search.php?url=' + p + 'SauceNAO', 'de-src-iqdb" href="http://iqdb.org/?url=' + p + 'IQDB', 'de-src-whatanime" href="http://whatanime.ga/?auto&url=' + (aib.iichan ? 'http://reho.st/' + p : p) + 'WhatAnime'].join('</a><a class="de-menu-item ') + '</a>';
			}
		}]);

		return AbstractPost;
	}();

	var Post = function (_AbstractPost) {
		_inherits(Post, _AbstractPost);

		function Post(el, thr, num, count, isOp, prev) {
			_classCallCheck(this, Post);

			var _this47 = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, thr, num, isOp));

			_this47.count = count;
			_this47.el = el;
			_this47.isDeleted = false;
			_this47.isHidden = false;
			_this47.isOmitted = false;
			_this47.isViewed = false;
			_this47.next = null;
			_this47.prev = prev;
			_this47.spellHidden = false;
			_this47.userToggled = false;
			_this47._selRange = null;
			_this47._selText = '';
			if (prev) {
				prev.next = _this47;
			}
			pByEl.set(el, _this47);
			pByNum.set(num, _this47);
			if (MyPosts.has(num)) {
				_this47.el.classList.add('de-mypost');
			}
			el.classList.add(isOp ? 'de-oppost' : 'de-reply');
			_this47.sage = aib.getSage(el);
			_this47.btns = $aEnd(_this47._pref = $q(aib.qPostRef, el), '<span class="de-post-btns">' + Post.getPostBtns(isOp, aib.t) + (_this47.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') + (isOp ? '' : '<span class="de-post-counter">' + (count + 1) + '</span>') + '</span>');
			_this47.counterEl = isOp ? null : _this47.btns.lastChild;
			if (Cfg.expandTrunc && _this47.trunc) {
				_this47._getFullMsg(_this47.trunc, true);
			}
			el.addEventListener('mouseover', _this47, true);
			return _this47;
		}

		_createClass(Post, [{
			key: 'addFuncs',
			value: function addFuncs() {
				_get(Post.prototype.__proto__ || Object.getPrototypeOf(Post.prototype), 'addFuncs', this).call(this);
				if (isExpImg) {
					this.toggleImages(true, false);
				}
			}
		}, {
			key: 'deleteCounter',
			value: function deleteCounter() {
				this.isDeleted = true;
				$del(this.counterEl);
				this.counterEl = null;
				this.btns.classList.add('de-post-deleted');
				this.el.classList.add('de-post-removed');
				this.wrap.classList.add('de-wrap-removed');
			}
		}, {
			key: 'deletePost',
			value: function deletePost(isRemovePost) {
				if (isRemovePost) {
					$del(this.wrap);
					pByEl.delete(this.el);
					pByNum.delete(this.num);
					if (this.isHidden) {
						this.ref.unhideRef();
					}
					RefMap.updateRefMap(this, false);
					if (this.prev.next = this.next) {
						this.next.prev = this.prev;
					}
					return;
				}
				this.deleteCounter();
				($q('input[type="checkbox"]', this.el) || {}).disabled = true;
			}
		}, {
			key: 'getAdjacentVisPost',
			value: function getAdjacentVisPost(toUp) {
				var post = toUp ? this.prev : this.next;
				while (post) {
					if (post.thr.isHidden) {
						post = toUp ? post.thr.op.prev : post.thr.last.next;
					} else if (post.isHidden || post.isOmitted) {
						post = toUp ? post.prev : post.next;
					} else {
						return post;
					}
				}
				return null;
			}
		}, {
			key: 'hideContent',
			value: function hideContent(needToHide) {
				if (this.isOp) {
					if (!aib.t) {
						$toggle(this.thr.el, !needToHide);
						$toggle(this.thr.btns, !needToHide);
					}
				} else {
					Post.hideContent(this.headerEl, this.btnHide, this.userToggled, needToHide);
				}
			}
		}, {
			key: 'select',
			value: function select() {
				if (this.isOp) {
					if (this.isHidden) {
						this.thr.el.previousElementSibling.classList.add('de-selected');
					}
					this.thr.el.classList.add('de-selected');
				} else {
					this.el.classList.add('de-selected');
				}
			}
		}, {
			key: 'selectAndScrollTo',
			value: function selectAndScrollTo() {
				var scrollNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.el;

				scrollTo(0, window.pageYOffset + scrollNode.getBoundingClientRect().top - Post.sizing.wHeight / 2 + scrollNode.clientHeight / 2);
				if (HotKeys.enabled) {
					if (HotKeys.cPost) {
						HotKeys.cPost.unselect();
					}
					HotKeys.cPost = this;
					HotKeys.lastPageOffset = window.pageYOffset;
				} else {
					var el = $q('.de-selected');
					if (el) {
						el.unselect();
					}
				}
				this.select();
			}
		}, {
			key: 'setUserVisib',
			value: function setUserVisib(isHide) {
				var isSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var note = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				this.userToggled = true;
				this.setVisib(isHide, note);
				if (this.isOp || this.isHidden === isHide) {
					var hideClass = isHide ? 'de-btn-unhide-user' : 'de-btn-hide-user';
					this.btnHide.setAttribute('class', hideClass);
					if (this.isOp) {
						this.thr.btnHide.setAttribute('class', hideClass);
					}
				}
				if (isSave) {
					var num = this.num;

					HiddenPosts.set(num, this.thr.num, isHide);
					if (this.isOp) {
						if (isHide) {
							HiddenThreads.set(num, num, this.title);
						} else {
							HiddenThreads.removeStorage(num);
						}
					}
					sendStorageEvent('__de-post', {
						hide: isHide,
						brd: aib.b,
						num: num,
						thrNum: this.thr.num,
						title: this.isOp ? this.title : ''
					});
				}
				this.ref.toggleRef(isHide, false);
			}
		}, {
			key: 'setVisib',
			value: function setVisib(isHide) {
				var _this48 = this;

				var note = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (this.isHidden === isHide) {
					if (isHide && note) {
						this.note.set(note);
					}
					return;
				}
				if (this.isOp) {
					this.thr.isHidden = isHide;
				} else {
					if (Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2) {
						this.wrap.classList.toggle('de-hidden', isHide);
					} else {
						this._pref.onmouseover = this._pref.onmouseout = !isHide ? null : function (e) {
							var yOffset = window.pageYOffset;
							_this48.hideContent(e.type === 'mouseout');
							scrollTo(window.pageXOffset, yOffset);
						};
					}
				}
				if (Cfg.strikeHidd) {
					setTimeout(function () {
						return _this48._strikePostNum(isHide);
					}, 50);
				}
				if (isHide) {
					this.note.set(note);
				} else {
					this.note.hideNote();
				}
				this.isHidden = isHide;
				this.hideContent(isHide);
			}
		}, {
			key: 'spellHide',
			value: function spellHide(note) {
				this.spellHidden = true;
				if (!this.userToggled) {
					this.setVisib(true, note);
					this.ref.hideRef();
				}
			}
		}, {
			key: 'spellUnhide',
			value: function spellUnhide() {
				this.spellHidden = false;
				if (!this.userToggled) {
					this.setVisib(false);
					this.ref.unhideRef();
				}
			}
		}, {
			key: 'toggleImages',
			value: function toggleImages() {
				var isExpand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.images.expanded;
				var isExpandVideos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var _iteratorNormalCompletion26 = true;
				var _didIteratorError26 = false;
				var _iteratorError26 = undefined;

				try {
					for (var _iterator26 = this.images[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
						var image = _step26.value;

						if ((image.isImage || isExpandVideos && image.isVideo) && image.expanded ^ isExpand) {
							if (isExpand) {
								image.expandImg(true, null);
							} else {
								image.collapseImg(null);
							}
						}
					}
				} catch (err) {
					_didIteratorError26 = true;
					_iteratorError26 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion26 && _iterator26.return) {
							_iterator26.return();
						}
					} finally {
						if (_didIteratorError26) {
							throw _iteratorError26;
						}
					}
				}
			}
		}, {
			key: 'unselect',
			value: function unselect() {
				if (this.isOp) {
					var el = $id('de-thr-hid-' + this.num);
					if (el) {
						el.classList.remove('de-selected');
					}
					this.thr.el.classList.remove('de-selected');
				} else {
					this.el.classList.remove('de-selected');
				}
			}
		}, {
			key: '_clickMenu',
			value: function _clickMenu(el) {
				var isHide = !this.isHidden;
				switch (el.getAttribute('info')) {
					case 'hide-sel':
						{
							var _selRange = this._selRange,
							    start = _selRange.startContainer,
							    end = _selRange.endContainer;

							if (start.nodeType === 3) {
								start = start.parentNode;
							}
							if (end.nodeType === 3) {
								end = end.parentNode;
							}
							var inMsgSel = aib.qPostMsg + ', ' + aib.qPostMsg + ' *';
							if (nav.matchesSelector(start, inMsgSel) && nav.matchesSelector(end, inMsgSel) || nav.matchesSelector(start, aib.qPostSubj) && nav.matchesSelector(end, aib.qPostSubj)) {
								if (this._selText.includes('\n')) {
									Spells.addSpell(1 
									, '/' + quoteReg(this._selText).replace(/\r?\n/g, '\\n') + '/', false);
								} else {
									Spells.addSpell(0 , this._selText.toLowerCase(), false);
								}
							} else {
								dummy.innerHTML = '';
								dummy.appendChild(this._selRange.cloneContents());
								Spells.addSpell(2 
								, '/' + quoteReg(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) + '/', false);
							}
							return;
						}
					case 'hide-name':
						Spells.addSpell(6 , this.posterName, false);return;
					case 'hide-trip':
						Spells.addSpell(7 , this.posterTrip, false);return;
					case 'hide-img':
						{
							var _images$firstAttach = this.images.firstAttach,
							    w = _images$firstAttach.weight,
							    wi = _images$firstAttach.width,
							    h = _images$firstAttach.height;

							Spells.addSpell(8 , [0, [w, w], [wi, wi, h, h]], false);
							return;
						}
					case 'hide-imgn':
						Spells.addSpell(3 , '/' + quoteReg(this.images.firstAttach.name) + '/', false);
						return;
					case 'hide-ihash':
						ImagesHashStorage.getHash(this.images.firstAttach).then(function (hash) {
							if (hash !== -1) {
								Spells.addSpell(4 , hash, false);
							}
						});
						return;
					case 'hide-noimg':
						Spells.addSpell(0x108 , '', true);return;
					case 'hide-text':
						{
							var num = this.num;

							var words = Post.getWrds(this.text);
							for (var post = Thread.first.op; post; post = post.next) {
								Post.findSameText(num, !isHide, words, post);
							}
							return;
						}
					case 'hide-notext':
						Spells.addSpell(0x10B , '', true);return;
					case 'hide-refs':
						this.ref.toggleRef(isHide, true);
						this.setUserVisib(isHide);
						return;
					case 'hide-refsonly':
						Spells.addSpell(0 , '>>' + this.num, false);return;
					case 'thr-exp':
						{
							var task = +el.textContent.match(/\d+/);
							this.thr.loadPosts(!task ? 'all' : task === 10 ? 'more' : task);
						}
				}
			}
		}, {
			key: '_getMenuHide',
			value: function _getMenuHide() {
				var item = function item(name) {
					return '<span info="hide-' + name + '" class="de-menu-item">' + Lng.selHiderMenu[name][lang] + '</span>';
				};
				var sel = window.getSelection();
				var ssel = sel.toString().trim();
				if (ssel) {
					this._selText = ssel;
					this._selRange = sel.getRangeAt(0);
				}
				return '' + (ssel ? item('sel') : '') + (this.posterName ? item('name') : '') + (this.posterTrip ? item('trip') : '') + (this.images.hasAttachments ? item('img') + item('imgn') + item('ihash') : item('noimg')) + (this.text ? item('text') : item('notext')) + (!Cfg.hideRefPsts && this.ref.hasMap ? item('refs') : '') + item('refsonly');
			}
		}, {
			key: '_strikePostNum',
			value: function _strikePostNum(isHide) {
				var num = this.num;

				if (isHide) {
					Post.hiddenNums.add(+num);
				} else {
					Post.hiddenNums.delete(+num);
				}
				$each($Q('[de-form] a[href*="' + (aib.anchor + num) + '"]'), function (el) {
					el.classList.toggle('de-link-hid', isHide);
					if (Cfg.removeHidd && el.classList.contains('de-link-ref')) {
						var refMapEl = el.parentNode;
						if (isHide === !$q('.de-link-ref:not(.de-link-hid)', refMapEl)) {
							$toggle(refMapEl, !isHide);
						}
					}
				});
			}
		}, {
			key: 'banned',
			get: function get() {
				var value = aib.getBanId(this.el);
				Object.defineProperty(this, 'banned', { value: value, writable: true });
				return value;
			}
		}, {
			key: 'bottom',
			get: function get() {
				return (this.isOp && this.isHidden ? this.thr.el.previousElementSibling : this.el).getBoundingClientRect().bottom;
			}
		}, {
			key: 'headerEl',
			get: function get() {
				return new Post.Сontent(this).headerEl;
			}
		}, {
			key: 'html',
			get: function get() {
				return new Post.Сontent(this).html;
			}
		}, {
			key: 'nextInThread',
			get: function get() {
				var post = this.next;
				return !post || post.count === 0 ? null : post;
			}
		}, {
			key: 'nextNotDeleted',
			get: function get() {
				var post = this.nextInThread;
				while (post && post.isDeleted) {
					post = post.nextInThread;
				}
				return post;
			}
		}, {
			key: 'note',
			get: function get() {
				var value = new Post.Note(this);
				Object.defineProperty(this, 'note', { value: value });
				return value;
			}
		}, {
			key: 'posterName',
			get: function get() {
				return new Post.Сontent(this).posterName;
			}
		}, {
			key: 'posterTrip',
			get: function get() {
				return new Post.Сontent(this).posterTrip;
			}
		}, {
			key: 'subj',
			get: function get() {
				return new Post.Сontent(this).subj;
			}
		}, {
			key: 'text',
			get: function get() {
				return new Post.Сontent(this).text;
			}
		}, {
			key: 'title',
			get: function get() {
				return new Post.Сontent(this).title;
			}
		}, {
			key: 'tNum',
			get: function get() {
				return this.thr.thrId;
			}
		}, {
			key: 'top',
			get: function get() {
				return (this.isOp && this.isHidden ? this.thr.el.previousElementSibling : this.el).getBoundingClientRect().top;
			}
		}, {
			key: 'wrap',
			get: function get() {
				return new Post.Сontent(this).wrap;
			}
		}], [{
			key: 'addMark',
			value: function addMark(postEl, forced) {
				if (!doc.hidden && !forced) {
					Post.clearMarks();
				} else {
					if (!Post.hasNew) {
						Post.hasNew = true;
						doc.addEventListener('click', Post.clearMarks, true);
					}
					postEl.classList.add('de-new-post');
				}
			}
		}, {
			key: 'clearMarks',
			value: function clearMarks() {
				if (Post.hasNew) {
					Post.hasNew = false;
					$each($Q('.de-new-post'), function (el) {
						return el.classList.remove('de-new-post');
					});
					doc.removeEventListener('click', Post.clearMarks, true);
				}
			}
		}, {
			key: 'getPostBtns',
			value: function getPostBtns(isOp, noExpThr) {
				return '<svg class="de-btn-hide"><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/>' + '<use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' + '<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>' + (isOp ? (noExpThr ? '' : '<svg class="de-btn-expthr"><use xlink:href="#de-symbol-post-expthr"/></svg>') + '<svg class="de-btn-fav"><use xlink:href="#de-symbol-post-fav"/></svg>' : '');
			}
		}, {
			key: 'findSameText',
			value: function findSameText(pNum, isHidden, words, curPost) {
				var curWords = Post.getWrds(curPost.text);
				var len = curWords.length;
				var i = words.length;
				var olen = i;
				var _olen = i;
				var n = 0;
				if (len < olen * 0.4 || len > olen * 3) {
					return;
				}
				while (i--) {
					if (olen > 6 && words[i].length < 3) {
						_olen--;
						continue;
					}
					var j = len;
					while (j--) {
						if (curWords[j] === words[i] || words[i].match(/>>\d+/) && curWords[j].match(/>>\d+/)) {
							n++;
						}
					}
				}
				if (n < _olen * 0.4 || len > _olen * 3) {
					return;
				}
				if (isHidden) {
					if (curPost.spellHidden) {
						Post.Note.reset();
					} else {
						curPost.setVisib(false);
					}
					if (curPost.userToggled) {
						HiddenPosts.removeStorage(curPost.num);
						curPost.userToggled = false;
					}
				} else {
					curPost.setUserVisib(true, true, 'similar to >>' + pNum);
				}
				return false;
			}
		}, {
			key: 'getWrds',
			value: function getWrds(text) {
				return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').trim().substring(0, 800).split(' ');
			}
		}, {
			key: 'hideContent',
			value: function hideContent(headerEl, btnHide, isUser, isHide) {
				if (!isHide) {
					btnHide.setAttribute('class', isUser ? 'de-btn-hide-user' : 'de-btn-hide');
					$each($Q('.de-post-hiddencontent', headerEl.parentNode), function (el) {
						return el.classList.remove('de-post-hiddencontent');
					});
					return;
				}
				if (aib.t) {
					Thread.first.hidCounter++;
				}
				btnHide.setAttribute('class', isUser ? 'de-btn-unhide-user' : 'de-btn-unhide');
				if (headerEl) {
					for (var el = headerEl.nextElementSibling; el; el = el.nextElementSibling) {
						el.classList.add('de-post-hiddencontent');
					}
				}
			}
		}]);

		return Post;
	}(AbstractPost);

	Post.hasNew = false;
	Post.hiddenNums = new Set();
	Post.Сontent = function (_TemporaryContent) {
		_inherits(PostContent, _TemporaryContent);

		function PostContent(post) {
			_classCallCheck(this, PostContent);

			var _this49 = _possibleConstructorReturn(this, (PostContent.__proto__ || Object.getPrototypeOf(PostContent)).call(this, post));

			if (_this49._isInited) {
				return _possibleConstructorReturn(_this49);
			}
			_this49._isInited = true;
			_this49.el = post.el;
			_this49.post = post;
			return _this49;
		}

		_createClass(PostContent, [{
			key: 'headerEl',
			get: function get() {
				var value = $q(aib.qPostHeader, this.el);
				Object.defineProperty(this, 'headerEl', { value: value });
				return value;
			}
		}, {
			key: 'html',
			get: function get() {
				var value = this.el.outerHTML;
				Object.defineProperty(this, 'html', { value: value });
				return value;
			}
		}, {
			key: 'posterName',
			get: function get() {
				var pName = $q(aib.qPostName, this.el);
				var value = pName ? pName.textContent.trim().replace(/\s/g, ' ') : '';
				Object.defineProperty(this, 'posterName', { value: value });
				return value;
			}
		}, {
			key: 'posterTrip',
			get: function get() {
				var pTrip = $q(aib.qPostTrip, this.el);
				var value = pTrip ? pTrip.textContent : '';
				Object.defineProperty(this, 'posterTrip', { value: value });
				return value;
			}
		}, {
			key: 'subj',
			get: function get() {
				var subj = $q(aib.qPostSubj, this.el);
				var value = subj ? subj.textContent : '';
				Object.defineProperty(this, 'subj', { value: value });
				return value;
			}
		}, {
			key: 'text',
			get: function get() {
				var value = this.post.msg.innerHTML.replace(/<\/?(?:br|p|li)[^>]*?>/gi, '\n').replace(/<[^>]+?>/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&nbsp;/g, '\xA0').trim();
				Object.defineProperty(this, 'text', { value: value });
				return value;
			}
		}, {
			key: 'title',
			get: function get() {
				var value = this.subj || this.text.substring(0, 70).replace(/\s+/g, ' ');
				Object.defineProperty(this, 'title', { value: value });
				return value;
			}
		}, {
			key: 'wrap',
			get: function get() {
				var value = aib.getPostWrap(this.el, this.post.isOp);
				Object.defineProperty(this, 'wrap', { value: value });
				return value;
			}
		}]);

		return PostContent;
	}(TemporaryContent);
	Post.Note = function () {
		function PostNote(post) {
			_classCallCheck(this, PostNote);

			this.text = null;
			this._post = post;
			this.isHideThr = this._post.isOp && !aib.t; 
			if (!this.isHideThr) {
				this._noteEl = this.textEl = $bEnd(post.btns, '<span class="de-post-note"></span>');
				return;
			}
			this._noteEl = $bBegin(post.thr.el, '<div class="' + aib.cReply + ' de-thr-hid" id="de-thr-hid-' + post.num + '">' + Lng.hiddenThr[lang] + ': <a href="#">\u2116' + post.num + '</a>\n\t\t\t<span class="de-thread-note"></span>\n\t\t</div>');
			this._aEl = $q('a', this._noteEl);
			this.textEl = this._aEl.nextElementSibling;
		}

		_createClass(PostNote, [{
			key: 'hideNote',
			value: function hideNote() {
				if (this.isHideThr) {
					this._aEl.onmouseover = this._aEl.onmouseout = this._aEl.onclick = null;
				}
				$hide(this._noteEl);
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.text = null;
				if (this.isHideThr) {
					this.set(null);
				} else {
					this.hideNote();
				}
			}
		}, {
			key: 'set',
			value: function set(note) {
				var _this50 = this;

				this.text = note;
				var text = void 0;
				if (this.isHideThr) {
					this._aEl.onmouseover = this._aEl.onmouseout = function (e) {
						return _this50._post.hideContent(e.type === 'mouseout');
					};
					this._aEl.onclick = function (e) {
						$pd(e);
						_this50._post.setUserVisib(!_this50._post.isHidden);
					};
					text = (this._post.title ? '(' + this._post.title + ') ' : '') + (note ? '[autohide: ' + note + ']' : '');
				} else {
					text = note ? 'autohide: ' + note : '';
				}
				this.textEl.textContent = text;
				$show(this._noteEl);
			}
		}]);

		return PostNote;
	}();
	Post.sizing = {
		get dPxRatio() {
			var value = window.devicePixelRatio || 1;
			Object.defineProperty(this, 'dPxRatio', { value: value });
			return value;
		},
		get wHeight() {
			var value = nav.viewportHeight();
			if (!this._enabled) {
				doc.defaultView.addEventListener('resize', this);
				this._enabled = true;
			}
			Object.defineProperties(this, {
				wHeight: { writable: true, configurable: true, value: value },
				wWidth: { writable: true, configurable: true, value: nav.viewportWidth() }
			});
			return value;
		},
		get wWidth() {
			var value = nav.viewportWidth();
			if (!this._enabled) {
				doc.defaultView.addEventListener('resize', this);
				this._enabled = true;
			}
			Object.defineProperties(this, {
				wHeight: { writable: true, configurable: true, value: nav.viewportHeight() },
				wWidth: { writable: true, configurable: true, value: value }
			});
			return value;
		},
		handleEvent: function handleEvent() {
			this.wHeight = nav.viewportHeight();
			this.wWidth = nav.viewportWidth();
		},


		_enabled: false
	};


	var Pview = function (_AbstractPost2) {
		_inherits(Pview, _AbstractPost2);

		function Pview(parent, link, pNum, tNum) {
			_classCallCheck(this, Pview);

			var _this51 = _possibleConstructorReturn(this, (Pview.__proto__ || Object.getPrototypeOf(Pview)).call(this, parent.thr, pNum, pNum === tNum));

			_this51.isSticky = false;
			_this51.parent = parent;
			_this51.remoteThr = null;
			_this51.tNum = tNum;
			_this51._isCached = false;
			_this51._isLeft = false;
			_this51._isTop = false;
			_this51._link = link;
			_this51._newPos = null;
			_this51._offsetTop = 0;
			_this51._readDelay = 0;
			var post = pByNum.get(pNum);
			if (post && (!post.isOp || !(parent instanceof Pview) || !parent._isCached)) {
				_this51._buildPview(post);
				return _possibleConstructorReturn(_this51);
			}
			_this51._isCached = true;
			_this51.brd = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
			if (PviewsCache.has(_this51.brd + tNum)) {
				post = PviewsCache.get(_this51.brd + tNum).getPost(pNum);
				if (post) {
					_this51._buildPview(post);
				} else {
					_this51._showPview(_this51.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">\n\t\t\t\t\t' + Lng.postNotFound[lang] + '</div>'));
				}
				return _possibleConstructorReturn(_this51);
			}
			_this51._showPview(_this51.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">\n\t\t\t<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' + Lng.loading[lang] + '</div>'));

			_this51._loadPromise = ajaxPostsLoad(_this51.brd, tNum, false).then(function (pBuilder) {
				if (!aib.JsonBuilder) {
					_this51._onload(pBuilder._form);
					return;
				}
				var html = [];
				for (var i = 0, len = pBuilder.length + 1; i < len; ++i) {
					html.push(pBuilder.getPostHTML(i - 1)); 
				}
				_this51._onload($add('<div>' + aib.fixHTML(html.join('')) + '</div>'));
			}, function (err) {
				return _this51._onerror(err);
			});
			return _this51;
		}

		_createClass(Pview, [{
			key: 'deletePview',
			value: function deletePview() {
				this.parent.kid = null;
				this._link.classList.remove('de-link-parent');
				if (Pview.top === this) {
					Pview.top = null;
				}
				if (this._loadPromise) {
					this._loadPromise.cancelPromise();
					this._loadPromise = null;
				}
				var vPost = AttachedImage.viewer && AttachedImage.viewer.data.post;
				var pv = this;
				do {
					clearTimeout(pv._readDelay);
					if (vPost === pv) {
						AttachedImage.closeImg();
						vPost = null;
					}
					var _pv = pv,
					    el = _pv.el;

					pByEl.delete(el);
					if (Cfg.animation) {
						$animate(el, 'de-pview-anim', true);
						el.style.animationName = 'de-post-close-' + (this._isTop ? 't' : 'b') + (this._isLeft ? 'l' : 'r');
					} else {
						el.remove();
					}
				} while (pv = pv.kid);
			}
		}, {
			key: 'deleteNonSticky',
			value: function deleteNonSticky() {
				var lastSticky = null,
				    pv = this;
				do {
					if (pv.isSticky) {
						lastSticky = pv;
					}
				} while (pv = pv.kid);
				if (!lastSticky) {
					this.deletePview();
				} else if (lastSticky.kid) {
					lastSticky.kid.deletePview();
				}
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				var pv = e.target;
				if (e.type === 'animationend' && pv.style.animationName) {
					pv.classList.remove('de-pview-anim');
					pv.style.cssText = this._newPos;
					this._newPos = null;
					$each($Q('.de-css-move', doc.head), $del);
					pv.removeEventListener('animationend', this);
					return;
				}
				var isOverEvent = false;
				checkMouse: do {
					switch (e.type) {
						case 'mouseover':
							isOverEvent = true;break;
						case 'mouseout':
							break;
						default:
							break checkMouse;
					}
					var el = fixEventEl(e.relatedTarget);
					if (!el || isOverEvent && (el.tagName !== 'A' || el.lchecked) || el !== this.el && !this.el.contains(el)) {
						if (isOverEvent) {
							this.mouseEnter();
						} else if (Pview.top) {
							Pview.top.markToDel();
						}
					}
				} while (false);
				if (!this.loading) {
					_get(Pview.prototype.__proto__ || Object.getPrototypeOf(Pview.prototype), 'handleEvent', this).call(this, e);
				}
			}
		}, {
			key: 'markToDel',
			value: function markToDel() {
				var _this52 = this;

				clearTimeout(Pview._delTO);
				Pview._delTO = setTimeout(function () {
					return _this52.deleteNonSticky();
				}, Cfg.linksOut);
			}
		}, {
			key: 'mouseEnter',
			value: function mouseEnter() {
				if (this.kid) {
					this.kid.markToDel();
				} else {
					clearTimeout(Pview._delTO);
				}
			}
		}, {
			key: 'setUserVisib',
			value: function setUserVisib() {
				var post = pByNum.get(this.num);
				var isHide = post.isHidden;
				post.setUserVisib(!isHide);
				Pview.updatePosition(true);
				$each($Q('.de-btn-pview-hide[de-num="' + this.num + '"]'), function (el) {
					el.setAttribute('class', (isHide ? 'de-btn-unhide-user' : 'de-btn-hide-user') + ' de-btn-pview-hide');
					el.parentNode.classList.toggle('de-post-hide', isHide);
				});
			}
		}, {
			key: 'toggleSticky',
			value: function toggleSticky(isEnabled) {
				this.stickBtn.setAttribute('class', isEnabled ? 'de-btn-stick-on' : 'de-btn-stick');
				this.isSticky = isEnabled;
			}
		}, {
			key: '_buildPview',
			value: function () {
				var _ref50 = _asyncToGenerator( regeneratorRuntime.mark(function _callee16(post) {
					var num, pv, isOp, f, isFav, isCached, pText, btnsEl, link;
					return regeneratorRuntime.wrap(function _callee16$(_context17) {
						while (1) {
							switch (_context17.prev = _context17.next) {
								case 0:
									$del(this.el);
									num = this.num;
									pv = this.el = post.el.cloneNode(true);

									pByEl.set(pv, this);
									pv.className = aib.cReply + ' de-pview' + (post.isViewed ? ' de-viewed' : '') + (Cfg.markMyPosts && MyPosts.has(num) ? ' de-mypost' : '');
									$show(pv);
									$each($Q('.de-post-hiddencontent', pv), function (el) {
										return el.classList.remove('de-post-hiddencontent');
									});
									if (Cfg.linksNavig) {
										Pview._markLink(pv, this.parent.num);
									}
									this._pref = $q(aib.qPostRef, pv);
									this._link.classList.add('de-link-parent');
									isOp = this.isOp;
									f = void 0;
									_context17.t0 = isOp;

									if (!_context17.t0) {
										_context17.next = 27;
										break;
									}

									_context17.t1 = post.thr.isFav;

									if (_context17.t1) {
										_context17.next = 26;
										break;
									}

									_context17.next = 18;
									return readFavorites();

								case 18:
									_context17.t4 = aib.host;
									_context17.t3 = f = _context17.sent[_context17.t4];

									if (!_context17.t3) {
										_context17.next = 22;
										break;
									}

									_context17.t3 = f = f[this.brd];

								case 22:
									_context17.t2 = _context17.t3;

									if (!_context17.t2) {
										_context17.next = 25;
										break;
									}

									_context17.t2 = num in f;

								case 25:
									_context17.t1 = _context17.t2;

								case 26:
									_context17.t0 = _context17.t1;

								case 27:
									isFav = _context17.t0;
									isCached = post instanceof CacheItem;
									pText = '<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>' + (isOp ? '<svg class="' + (isFav ? 'de-btn-fav-sel' : 'de-btn-fav') + '">' + '<use xlink:href="#de-symbol-post-fav"></use></svg>' : '') + (post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') + '<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>' + (post.isDeleted ? '' : '<span class="de-post-counter">' + (isOp ? 'OP' : post.count + +!(aib.JsonBuilder && isCached)) + '</span>');

									if (isCached) {
										if (isOp) {
											this.remoteThr = post.thr;
										}
										this.btns = $aEnd(this._pref, '<span class="de-post-btns">' + pText + '</span>');
										embedAudioLinks(this);
										if (Cfg.addYouTube) {
											new VideosParser().parse(this).endParser();
										}
										embedPostMsgImages(pv);
										processImgInfoLinks(pv);
									} else {
										btnsEl = this.btns = this._pref.nextSibling;

										$del($q('.de-post-counter', btnsEl));
										if (post.isHidden) {
											btnsEl.classList.add('de-post-hide');
										}
										btnsEl.innerHTML = '<svg class="de-btn-' + (post.isHidden ? 'unhide' : 'hide') + (post.userToggled ? '-user' : '') + ' de-btn-pview-hide" de-num="' + num + '"><!--\n\t\t\t\t--><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/><!--\n\t\t\t\t--><use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' + pText;
										$each($Q((!aib.t && isOp ? aib.qOmitted + ', ' : '') + '.de-fullimg-wrap, .de-fullimg-after', pv), $del);
										$each($Q(aib.qPostImg, pv), function (el) {
											return $show(el.parentNode);
										});
										link = $q('.de-link-parent', pv);

										if (link) {
											link.classList.remove('de-link-parent');
										}
										if (Cfg.addYouTube && post.videos.hasLinks) {
											if (post.videos.playerInfo !== null) {
												Object.defineProperty(this, 'videos', { value: new Videos(this, $q('.de-video-obj', pv), post.videos.playerInfo) });
											}
											this.videos.updatePost($Q('.de-video-link', post.el), $Q('.de-video-link', pv), true);
										}
										if (Cfg.addImgs) {
											$each($Q('.de-img-embed', pv), $show);
										}
										if (Cfg.markViewed) {
											this._readDelay = setTimeout(function (post) {
												if (!post.isViewed) {
													post.el.classList.add('de-viewed');
													post.isViewed = true;
												}
												var arr = (sesStorage['de-viewed'] || '').split(',');
												arr.push(post.num);
												sesStorage['de-viewed'] = arr;
											}, post.text.length > 100 ? 2e3 : 500, post);
										}
									}
									pv.addEventListener('click', this, true);
									this._showPview(pv);

								case 33:
								case 'end':
									return _context17.stop();
							}
						}
					}, _callee16, this);
				}));

				function _buildPview(_x55) {
					return _ref50.apply(this, arguments);
				}

				return _buildPview;
			}()
		}, {
			key: '_onerror',
			value: function _onerror(err) {
				if (!(err instanceof CancelError)) {
					this.el.innerHTML = err instanceof AjaxError && err.code === 404 ? Lng.postNotFound[lang] : getErrorMessage(err);
				}
			}
		}, {
			key: '_onload',
			value: function _onload(form) {
				var b = this.brd;
				var num = this.parent.num;

				var post = new PviewsCache(doc.adoptNode(form), b, this.tNum).getPost(this.num);
				if (post && (aib.b !== b || !post.ref.hasMap || !post.ref.has(num))) {
					(post.ref.hasMap ? $q('.de-refmap', post.el) : $aEnd(post.msg, '<div class="de-refmap"></div>')).insertAdjacentHTML('afterbegin', '<a class="de-link-ref" href="' + (aib.getThrUrl(b, this.parent.tNum) + aib.anchor + num) + '">&gt;&gt;' + (aib.b === b ? '' : '/' + aib.b + '/') + num + '</a><span class="de-refcomma">, </span>');
				}
				if (post) {
					this._buildPview(post);
				} else {
					this.el.innerHTML = Lng.postNotFound[lang];
				}
			}
		}, {
			key: '_setPosition',
			value: function _setPosition(link, isAnim) {
				var oldCSS = void 0;
				var cr = link.getBoundingClientRect();
				var offX = cr.left + window.pageXOffset + cr.width / 2;
				var offY = cr.top;
				var bWidth = nav.viewportWidth();
				var isLeft = offX < bWidth / 2;
				var pv = this.el;
				var tmp = isLeft ? offX : offX - Math.min(parseInt(pv.offsetWidth, 10), offX - 10);
				var lmw = 'max-width:' + (bWidth - tmp - 10) + 'px; left:' + tmp + 'px;';
				var style = pv.style;

				if (isAnim) {
					oldCSS = style.cssText;
				}
				style.cssText = (isAnim ? 'opacity: 0; ' : '') + lmw;
				var top = pv.offsetHeight;
				var isTop = offY + top + cr.height < nav.viewportHeight() || offY - top < 5;
				top = window.pageYOffset + (isTop ? offY + cr.height : offY - top);
				this._offsetTop = top;
				this._isLeft = isLeft;
				this._isTop = isTop;
				if (!isAnim) {
					style.top = top + 'px';
					return;
				}
				var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
				$css('@keyframes ' + uId + ' { to { ' + lmw + ' top:' + top + 'px; } }').className = 'de-css-move';
				if (this._newPos) {
					style.cssText = this._newPos;
					pv.removeEventListener('animationend', this);
				} else {
					style.cssText = oldCSS;
				}
				this._newPos = lmw + ' top:' + top + 'px;';
				pv.addEventListener('animationend', this);
				pv.classList.add('de-pview-anim');
				style.animationName = uId;
			}
		}, {
			key: '_showMenu',
			value: function _showMenu(el, html) {
				var _this53 = this;

				_get(Pview.prototype.__proto__ || Object.getPrototypeOf(Pview.prototype), '_showMenu', this).call(this, el, html);
				this._menu.onover = function () {
					return _this53.mouseEnter();
				};
				this._menu.onout = function () {
					return _this53.markToDel();
				};
			}
		}, {
			key: '_showPview',
			value: function _showPview(el) {
				el.addEventListener('mouseover', this, true);
				el.addEventListener('mouseout', this, true);
				this.thr.form.el.appendChild(el);
				this._setPosition(this._link, false);
				if (Cfg.animation) {
					el.addEventListener('animationend', function aEvent() {
						el.removeEventListener('animationend', aEvent);
						el.classList.remove('de-pview-anim');
						el.style.animationName = '';
					});
					el.classList.add('de-pview-anim');
					el.style.animationName = 'de-post-open-' + (this._isTop ? 't' : 'b') + (this._isLeft ? 'l' : 'r');
				}
			}
		}, {
			key: 'stickBtn',
			get: function get() {
				var value = $q('.de-btn-stick', this.el);
				Object.defineProperty(this, 'stickBtn', { value: value });
				return value;
			}
		}], [{
			key: 'showPview',
			value: function showPview(parent, link) {
				var tNum = +(link.pathname.match(/.+?\/[^\d]*(\d+)/) || [0, aib.getPostOfEl(link).tNum])[1];
				var pNum = +(link.textContent.trim().match(/\d+$/) || [tNum]);
				var isTop = !(parent instanceof Pview);
				var pv = isTop ? Pview.top : parent.kid;
				clearTimeout(Pview._delTO);
				if (pv && pv.num === pNum) {
					if (pv.kid) {
						pv.kid.deletePview();
					}
					if (pv._link !== link) {
						pv._setPosition(link, Cfg.animation);
						pv._link.classList.remove('de-link-parent');
						link.classList.add('de-link-parent');
						pv._link = link;
						if (pv.parent.num !== parent.num) {
							$each($Q('.de-link-pview', pv.el), function (el) {
								return el.classList.remove('de-link-pview');
							});
							Pview._markLink(pv.el, parent.num);
						}
					}
					pv.parent = parent;
				} else if (!Cfg.noNavigHidd || !pByNum.has(pNum) || !pByNum.get(pNum).hidden) {
					if (pv) {
						pv.deletePview();
					}
					pv = new Pview(parent, link, pNum, tNum);
					if (isTop) {
						Pview.top = pv;
					}
				} else {
					return null;
				}
				return pv;
			}
		}, {
			key: 'updatePosition',
			value: function updatePosition(scroll) {
				var pv = Pview.top;
				if (!pv) {
					return;
				}
				var _pv2 = pv,
				    parent = _pv2.parent;

				if (parent.isOmitted) {
					pv.deletePview();
					return;
				}
				if (parent.thr.loadCount === 1 && !parent.el.contains(pv._link)) {
					var el = parent.ref.getElByNum(pv.num);
					if (!el) {
						pv.deletePview();
						return;
					}
					pv._link = el;
				}
				var cr = parent.isHidden ? parent : pv._link.getBoundingClientRect();
				var diff = pv._isTop ? pv._offsetTop - window.pageYOffset - cr.bottom : pv._offsetTop + pv.el.offsetHeight - window.pageYOffset - cr.top;
				if (Math.abs(diff) > 1) {
					if (scroll) {
						scrollTo(window.pageXOffset, window.pageYOffset - diff);
					}
					do {
						pv._offsetTop -= diff;
						pv.el.style.top = Math.max(pv._offsetTop, 0) + 'px';
					} while (pv = pv.kid);
				}
			}
		}, {
			key: '_markLink',
			value: function _markLink(el, num) {
				$each($Q('a[href*="' + num + '"]', el), function (el) {
					return el.textContent.startsWith('>>' + num) && el.classList.add('de-link-pview');
				});
			}
		}, {
			key: 'topParent',
			get: function get() {
				return Pview.top ? Pview.top.parent : null;
			}
		}]);

		return Pview;
	}(AbstractPost);

	Pview.top = null;
	Pview._delTO = null;

	var CacheItem = function () {
		function CacheItem(el, count) {
			_classCallCheck(this, CacheItem);

			this.count = count;
			this.el = el;
			this.isDeleted = false;
			this.isInited = false;
			this.isOp = count === 0;
			this.isViewed = false;
		}

		_createClass(CacheItem, [{
			key: 'msg',
			get: function get() {
				var value = $q(aib.qPostMsg, this.el);
				Object.defineProperty(this, 'msg', { value: value, configurable: true });
				return value;
			}
		}, {
			key: 'ref',
			get: function get() {
				var value = new RefMap(this);
				Object.defineProperty(this, 'ref', { value: value });
				return value;
			}
		}, {
			key: 'sage',
			get: function get() {
				var value = aib.getSage(this.el);
				Object.defineProperty(this, 'sage', { value: value });
				return value;
			}
		}, {
			key: 'title',
			get: function get() {
				return new Post.Сontent(this).title;
			}
		}]);

		return CacheItem;
	}();

	var PviewsCache = function (_TemporaryContent2) {
		_inherits(PviewsCache, _TemporaryContent2);

		function PviewsCache(form, b, tNum) {
			_classCallCheck(this, PviewsCache);

			var _this54 = _possibleConstructorReturn(this, (PviewsCache.__proto__ || Object.getPrototypeOf(PviewsCache)).call(this, b + tNum));

			if (_this54._isInited) {
				return _possibleConstructorReturn(_this54);
			}
			_this54._isInited = true;
			var pByNum = new Map();
			var thr = $q(aib.qThread, form) || form;
			var posts = $Q(aib.qRPost + ', ' + aib.qOPost, thr);
			var pcount = posts.length;
			for (var i = 0; i < pcount; ++i) {
				var post = posts[i];
				pByNum.set(aib.getPNum(post), new CacheItem(post, i + 1));
			}
			_this54._opObj = new CacheItem(aib.getOp(thr), 0);
			_this54._opObj.thr = { lastNum: aib.getPNum(posts[pcount - 1]), pcount: pcount, title: _this54._opObj.title };
			pByNum.set(tNum, _this54._opObj);
			_this54._b = b;
			_this54._tNum = tNum;
			_this54._tUrl = aib.getThrUrl(b, tNum);
			_this54._posts = pByNum;
			if (Cfg.linksNavig) {
				RefMap.gen(pByNum, _this54._tUrl);
			}
			return _this54;
		}

		_createClass(PviewsCache, [{
			key: 'getPost',
			value: function getPost(num) {
				var post = this._posts.get(num);
				if (!post || post.isInited) {
					return post;
				}
				if (num === this._tNum && this._b === aib.b && pByNum.has(this._tNum)) {
					post.ref.makeUnion(pByNum.get(this._tNum).ref);
				}
				post.el = aib.fixHTML(post.el);
				delete post.msg;
				if (post.ref.hasMap) {
					post.ref.initPostRef(this._tUrl, Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null);
				}
				post.isInited = true;
				return post;
			}
		}]);

		return PviewsCache;
	}(TemporaryContent);

	PviewsCache.purgeSecs = 3e5;



	var ImagesNavigBtns = function () {
		function ImagesNavigBtns(viewerObj) {
			_classCallCheck(this, ImagesNavigBtns);

			var btns = $bEnd(docBody, '<div style="display: none;">\n\t\t\t<div id="de-img-btn-prev" class="de-img-btn" de-title="' + Lng.prevImg[lang] + '">\n\t\t\t\t<svg><use xlink:href="#de-symbol-img-btn-arrow"/></svg></div>\n\t\t\t<div id="de-img-btn-next" class="de-img-btn" de-title="' + Lng.nextImg[lang] + '">\n\t\t\t\t<svg><use xlink:href="#de-symbol-img-btn-arrow"/></svg></div>\n\t\t\t<div id="de-img-btn-auto" class="de-img-btn de-img-btn-none" title="' + Lng.autoPlayOn[lang] + '">\n\t\t\t\t<svg><use xlink:href="#de-symbol-img-btn-auto"/></svg></div></div>');

			var _ref51 = [].concat(_toConsumableArray(btns.children));

			this.prevBtn = _ref51[0];
			this.nextBtn = _ref51[1];
			this.autoBtn = _ref51[2];

			this._btns = btns;
			this._btnsStyle = btns.style;
			this._hideTmt = 0;
			this._isHidden = true;
			this._oldX = -1;
			this._oldY = -1;
			this._viewer = viewerObj;
			doc.defaultView.addEventListener('mousemove', this);
			btns.addEventListener('mouseover', this);
		}

		_createClass(ImagesNavigBtns, [{
			key: 'handleEvent',
			value: function handleEvent(e) {
				switch (e.type) {
					case 'mousemove':
						{
							var curX = e.clientX,
							    curY = e.clientY;

							if (this._oldX !== curX || this._oldY !== curY) {
								this._oldX = curX;
								this._oldY = curY;
								this.showBtns();
							}
							return;
						}
					case 'mouseover':
						if (!this.hasEvents) {
							this.hasEvents = true;
							this._btns.addEventListener('mouseout', this);
							this._btns.addEventListener('click', this);
						}
						if (!this._isHidden) {
							clearTimeout(this._hideTmt);
							KeyEditListener.setTitle(this.prevBtn, 4);
							KeyEditListener.setTitle(this.nextBtn, 17);
						}
						return;
					case 'mouseout':
						this._setHideTmt();return;
					case 'click':
						{
							var parent = e.target.parentNode;
							var viewer = this._viewer;
							switch (parent.id) {
								case 'de-img-btn-prev':
									viewer.navigate(false);return;
								case 'de-img-btn-next':
									viewer.navigate(true);return;
								case 'de-img-btn-auto':
									this.autoBtn.title = (viewer.isAutoPlay = !viewer.isAutoPlay) ? Lng.autoPlayOff[lang] : Lng.autoPlayOn[lang];
									viewer.toggleVideoLoop();
									parent.classList.toggle('de-img-btn-auto-on');
							}
						}
				}
			}
		}, {
			key: 'hideBtns',
			value: function hideBtns() {
				this._btnsStyle.display = 'none';
				this._isHidden = true;
				this._oldX = this._oldY = -1;
			}
		}, {
			key: 'removeBtns',
			value: function removeBtns() {
				$del(this._btns);
				doc.defaultView.removeEventListener('mousemove', this);
				clearTimeout(this._hideTmt);
			}
		}, {
			key: 'showBtns',
			value: function showBtns() {
				if (this._isHidden) {
					this._btnsStyle.removeProperty('display');
					this._isHidden = false;
					this._setHideTmt();
				}
			}
		}, {
			key: '_setHideTmt',
			value: function _setHideTmt() {
				var _this55 = this;

				clearTimeout(this._hideTmt);
				this._hideTmt = setTimeout(function () {
					return _this55.hideBtns();
				}, 2e3);
			}
		}]);

		return ImagesNavigBtns;
	}();



	var ImagesViewer = function () {
		function ImagesViewer(data) {
			_classCallCheck(this, ImagesViewer);

			this.data = null;
			this.isAutoPlay = false;
			this._data = null;
			this._elStyle = null;
			this._fullEl = null;
			this._height = 0;
			this._minSize = 0;
			this._moved = false;
			this._obj = null;
			this._oldL = 0;
			this._oldT = 0;
			this._oldX = 0;
			this._oldY = 0;
			this._width = 0;
			this._showFullImg(data);
		}

		_createClass(ImagesViewer, [{
			key: 'closeImgViewer',
			value: function closeImgViewer(e) {
				if (this.hasOwnProperty('_btns')) {
					this._btns.removeBtns();
				}
				this._removeFullImg(e);
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				switch (e.type) {
					case 'mousedown':
						if (this.data.isVideo && ExpandableImage.isControlClick(e)) {
							return;
						}
						this._oldX = e.clientX;
						this._oldY = e.clientY;
						docBody.addEventListener('mousemove', this, true);
						docBody.addEventListener('mouseup', this, true);
						break;
					case 'mousemove':
						{
							var curX = e.clientX,
							    curY = e.clientY;

							if (curX !== this._oldX || curY !== this._oldY) {
								this._oldL = parseInt(this._elStyle.left, 10) + curX - this._oldX;
								this._elStyle.left = this._oldL + 'px';
								this._oldT = parseInt(this._elStyle.top, 10) + curY - this._oldY;
								this._elStyle.top = this._oldT + 'px';
								this._oldX = curX;
								this._oldY = curY;
								this._moved = true;
							}
							return;
						}
					case 'mouseup':
						docBody.removeEventListener('mousemove', this, true);
						docBody.removeEventListener('mouseup', this, true);
						return;
					case 'click':
						{
							var el = e.target;
							if (this.data.isVideo && ExpandableImage.isControlClick(e) || el.tagName !== 'IMG' && el.tagName !== 'VIDEO' && !el.classList.contains('de-fullimg-wrap') && el.className !== 'de-fullimg-load') {
								return;
							}
							if (e.button === 0) {
								if (this._moved) {
									this._moved = false;
								} else {
									this.closeImgViewer(e);
									AttachedImage.viewer = null;
								}
								e.stopPropagation();
								break;
							}
							return;
						}
					case 'mousewheel':
						this._handleWheelEvent(e.clientX, e.clientY, -1 / 40 * ('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta));
						break;
					default:
						this._handleWheelEvent(e.clientX, e.clientY, e.deltaY);
				}
				$pd(e);
			}
		}, {
			key: 'navigate',
			value: function navigate(isForward) {
				var isVideoOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var data = this.data;

				data.cancelWebmLoad(this._fullEl);
				do {
					data = data.getFollowImg(isForward);
				} while (data && !data.isVideo && !data.isImage || isVideoOnly && data.isImage);
				if (data) {
					this.updateImgViewer(data, true, null);
					data.post.selectAndScrollTo(data.post.images.first.el);
				}
			}
		}, {
			key: 'toggleVideoLoop',
			value: function toggleVideoLoop() {
				if (this.data.isVideo) {
					toggleAttr(this._fullEl.firstElementChild, 'loop', '', !this.isAutoPlay);
				}
			}
		}, {
			key: 'updateImgViewer',
			value: function updateImgViewer(data, showButtons, e) {
				this._removeFullImg(e);
				this._showFullImg(data, showButtons);
			}
		}, {
			key: '_handleWheelEvent',
			value: function _handleWheelEvent(clientX, clientY, delta) {
				if (delta === 0) {
					return;
				}
				var width = void 0,
				    height = void 0;
				var oldW = this._width,
				    oldH = this._height;

				if (delta > 0) {
					width = oldW / this._zoomFactor;
					height = oldH / this._zoomFactor;
					if (width <= this._minSize && height <= this._minSize) {
						return;
					}
				} else {
					width = oldW * this._zoomFactor;
					height = oldH * this._zoomFactor;
				}
				this._width = width;
				this._height = height;
				this._elStyle.width = width + 'px';
				this._elStyle.height = height + 'px';
				this._oldL = parseInt(clientX - width / oldW * (clientX - this._oldL), 10);
				this._elStyle.left = this._oldL + 'px';
				this._oldT = parseInt(clientY - height / oldH * (clientY - this._oldT), 10);
				this._elStyle.top = this._oldT + 'px';
			}
		}, {
			key: '_removeFullImg',
			value: function _removeFullImg(e) {
				var data = this.data;

				data.cancelWebmLoad(this._fullEl);
				if (data.inPview && data.post.isSticky) {
					data.post.toggleSticky(false);
				}
				$del(this._obj);
				if (e && data.inPview) {
					data.sendCloseEvent(e, false);
				}
			}
		}, {
			key: '_resizeFullImg',
			value: function _resizeFullImg(el) {
				if (el !== this._fullEl) {
					return;
				}

				var _data$computeFullSize = this.data.computeFullSize(),
				    _data$computeFullSize2 = _slicedToArray(_data$computeFullSize, 3),
				    width = _data$computeFullSize2[0],
				    height = _data$computeFullSize2[1],
				    minSize = _data$computeFullSize2[2];

				this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
				if (Post.sizing.wWidth - this._oldL - this._width < 5 || Post.sizing.wHeight - this._oldT - this._height < 5) {
					return;
				}
				var cPointX = this._oldL + this._width / 2;
				var cPointY = this._oldT + this._height / 2;
				var maxWidth = (Post.sizing.wWidth - cPointX - 2) * 2;
				var maxHeight = (Post.sizing.wHeight - cPointY - 2) * 2;
				if (width > maxWidth || height > maxHeight) {
					var ar = width / height;
					if (ar > maxWidth / maxHeight) {
						width = maxWidth;
						height = width / ar;
					} else {
						height = maxHeight;
						width = height * ar;
					}
					if (minSize && width < minSize || height < minSize) {
						this._minSize = Math.max(width, height);
					}
				}
				this._width = width;
				this._height = height;
				this._elStyle.width = width + 'px';
				this._elStyle.height = height + 'px';
				this._elStyle.left = (this._oldL = parseInt(cPointX - width / 2, 10)) + 'px';
				this._elStyle.top = (this._oldT = parseInt(cPointY - height / 2, 10)) + 'px';
			}
		}, {
			key: '_rotateFullImg',
			value: function _rotateFullImg(el) {
				if (el !== this._fullEl) {
					return;
				}
				var _width = this._width,
				    _height = this._height;

				this._width = _height;
				this._height = _width;
				this._elStyle.width = _height + 'px';
				this._elStyle.height = _width + 'px';
				var halfWidth = _width / 2;
				var halfHeight = _height / 2;
				this._elStyle.left = (this._oldL = parseInt(this._oldL + halfWidth - halfHeight, 10)) + 'px';
				this._elStyle.top = (this._oldT = parseInt(this._oldT + halfHeight - halfWidth, 10)) + 'px';
			}
		}, {
			key: '_showFullImg',
			value: function _showFullImg(data) {
				var _this56 = this;

				var _data$computeFullSize3 = data.computeFullSize(),
				    _data$computeFullSize4 = _slicedToArray(_data$computeFullSize3, 3),
				    width = _data$computeFullSize4[0],
				    height = _data$computeFullSize4[1],
				    minSize = _data$computeFullSize4[2];

				this._fullEl = data.getFullImg(false, function (el) {
					return _this56._resizeFullImg(el);
				}, function (el) {
					return _this56._rotateFullImg(el);
				});
				this._width = width;
				this._height = height;
				this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
				this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
				this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
				var el = $add('<div class="de-fullimg-center' + (data.isVideo ? ' de-fullimg-center-video' : '') + '" style="top:' + (this._oldT - (Cfg.imgInfoLink ? 11 : 0)) + 'px; left:' + this._oldL + 'px; width:' + width + 'px; height:' + height + 'px; display: block"></div>');
				(data.isImage ? $aBegin(el, '<a class="de-fullimg-wrap-link" href="' + data.src + '"></a>') : el).appendChild(this._fullEl);
				this._elStyle = el.style;
				this.data = data;
				this._obj = el;
				el.addEventListener('onwheel' in el ? 'wheel' : 'mousewheel', this, true);
				el.addEventListener('mousedown', this, true);
				el.addEventListener('click', this, true);
				if (data.inPview && !data.post.isSticky) {
					this.data.post.toggleSticky(true);
				}
				var btns = this._btns;
				if (!data.inPview) {
					btns.showBtns();
					btns.autoBtn.classList.toggle('de-img-btn-none', !data.isVideo);
				} else if (this.hasOwnProperty('_btns')) {
					btns.hideBtns();
				}
				data.post.thr.form.el.appendChild(el);
				this.toggleVideoLoop();
			}
		}, {
			key: '_btns',
			get: function get() {
				var value = new ImagesNavigBtns(this);
				Object.defineProperty(this, '_btns', { value: value });
				return value;
			}
		}, {
			key: '_zoomFactor',
			get: function get() {
				var value = 1 + Cfg.zoomFactor / 100;
				Object.defineProperty(this, '_zoomFactor', { value: value });
				return value;
			}
		}]);

		return ImagesViewer;
	}();



	var ExpandableImage = function () {
		function ExpandableImage(post, el, prev) {
			_classCallCheck(this, ExpandableImage);

			this.el = el;
			this.expanded = false;
			this.next = null;
			this.post = post;
			this.prev = prev;
			this._fullEl = null;
			this._webmTitleLoad = null;
			if (prev) {
				prev.next = this;
			}
		}

		_createClass(ExpandableImage, [{
			key: 'cancelWebmLoad',
			value: function cancelWebmLoad(fullEl) {
				if (this.isVideo) {
					var videoEl = fullEl.firstElementChild;
					videoEl.pause();
					videoEl.removeAttribute('src');
					videoEl.load();
				}
				if (this._webmTitleLoad) {
					this._webmTitleLoad.cancelPromise();
					this._webmTitleLoad = null;
				}
			}
		}, {
			key: 'collapseImg',
			value: function collapseImg(e) {
				if (e && this.isVideo && ExpandableImage.isControlClick(e)) {
					return;
				}
				this.cancelWebmLoad(this._fullEl);
				this.expanded = false;
				$del(this._fullEl);
				this._fullEl = null;
				$show(this.el.parentNode);
				$del((aib.hasPicWrap ? this._getImageParent() : this.el.parentNode).nextSibling);
				if (e) {
					$pd(e);
					if (this.inPview) {
						this.sendCloseEvent(e, true);
					}
				}
			}
		}, {
			key: 'computeFullSize',
			value: function computeFullSize() {
				if (!this._size) {
					var iEl = new Image();
					iEl.src = this.el.src;
					return this.isVideo ? [iEl.width * 5, iEl.height * 5] : [iEl.width, iEl.height, null];
				}

				var _size = _slicedToArray(this._size, 2),
				    width = _size[0],
				    height = _size[1];

				if (Cfg.resizeDPI) {
					width /= Post.sizing.dPxRatio;
					height /= Post.sizing.dPxRatio;
				}
				var minSize = this.isVideo ? Math.max(Cfg.minImgSize, Cfg.minWebmWidth) : Cfg.minImgSize;
				if (width < minSize && height < minSize) {
					var ar = width / height;
					if (width > height) {
						width = minSize;
						height = width / ar;
					} else {
						height = minSize;
						width = height * ar;
					}
				}
				if (Cfg.resizeImgs) {
					var maxWidth = Post.sizing.wWidth - 2;
					var maxHeight = Post.sizing.wHeight - (Cfg.imgInfoLink ? 24 : 2);
					if (width > maxWidth || height > maxHeight) {
						var _ar = width / height;
						if (_ar > maxWidth / maxHeight) {
							width = maxWidth;
							height = width / _ar;
						} else {
							height = maxHeight;
							width = height * _ar;
						}
						if (width < minSize || height < minSize) {
							return [width, height, Math.max(width, height)];
						}
					}
				}
				return [width, height, null];
			}
		}, {
			key: 'expandImg',
			value: function expandImg(inPost, e) {
				var _this57 = this;

				if (e && !e.bubbles) {
					return;
				}
				if (!inPost) {
					var viewer = AttachedImage.viewer;

					if (!viewer) {
						AttachedImage.viewer = new ImagesViewer(this);
						return;
					}
					if (viewer.data === this) {
						viewer.closeImgViewer(e);
						AttachedImage.viewer = null;
						return;
					}
					viewer.updateImgViewer(this, e);
					return;
				}
				this.expanded = true;
				var el = this.el;

				(aib.hasPicWrap ? this._getImageParent() : el.parentNode).insertAdjacentHTML('afterend', '<div class="de-fullimg-after"></div>');
				this._fullEl = this.getFullImg(true, null, null);
				this._fullEl.addEventListener('click', function (e) {
					return _this57.collapseImg(e);
				}, true);
				$hide(el.parentNode);
				$after(el.parentNode, this._fullEl);
			}
		}, {
			key: 'getFollowImg',
			value: function getFollowImg(isForward) {
				var nImage = isForward ? this.next : this.prev;
				if (nImage) {
					return nImage;
				}
				var imgs = void 0,
				    post = this.post;
				do {
					post = post.getAdjacentVisPost(!isForward);
					if (!post) {
						post = isForward ? Thread.first.op : Thread.last.last;
						if (post.isHidden || post.thr.isHidden) {
							post = post.getAdjacentVisPost(!isForward);
							if (!post) {
								return null;
							}
						}
					}
					imgs = post.images;
				} while (imgs.first === null);
				return isForward ? imgs.first : imgs.last;
			}
		}, {
			key: 'getFullImg',
			value: function getFullImg(inPost, onsizechange, onrotate) {
				var _this58 = this;

				var wrapEl = void 0,
				    name = void 0,
				    origSrc = void 0;
				var src = this.src;

				var parent = this._getImageParent();
				if (this.el.className !== 'de-img-embed') {
					var nameEl = $q(aib.qImgNameLink, parent);
					origSrc = nameEl.getAttribute('de-href') || nameEl.href;
					name = this.name;
				} else {
					origSrc = parent.href;
					name = origSrc.split('/').pop();
				}
				var imgNameEl = '<a class="de-fullimg-src" target="_blank" title="' + Lng.openOriginal[lang] + '" href="' + origSrc + '">' + name;
				var wrapClass = '' + (inPost ? ' de-fullimg-wrap-inpost' : ' de-fullimg-wrap-center' + (this._size ? '' : ' de-fullimg-wrap-nosize')) + (this.isVideo ? ' de-fullimg-video' : '');
				if (!this.isVideo) {
					var waitEl = inPost || this._size ? '' : '<svg class="de-fullimg-load"><use xlink:href="#de-symbol-wait"/></svg>';
					wrapEl = $add('<div class="de-fullimg-wrap' + wrapClass + '">\n\t\t\t\t' + waitEl + '\n\t\t\t\t<img class="de-fullimg" src="' + src + '" alt="' + src + '">\n\t\t\t\t<div class="de-fullimg-info">' + imgNameEl + '</a></div>\n\t\t\t</div>');
					var imgEl = $q('.de-fullimg', wrapEl);
					imgEl.onload = imgEl.onerror = function (_ref52) {
						var img = _ref52.target;

						if (!(img.naturalHeight + img.naturalWidth)) {
							if (!img.onceLoaded) {
								img.src = img.src;
								img.onceLoaded = true;
							}
							return;
						}
						var newW = img.naturalWidth,
						    newH = img.naturalHeight;

						var ar = _this58._size ? _this58._size[1] / _this58._size[0] : newH / newW;
						var isRotated = !img.scrollWidth ? false : img.scrollHeight / img.scrollWidth > 1 ? ar < 1 : ar > 1;
						if (!_this58._size || isRotated) {
							_this58._size = isRotated ? [newH, newW] : [newW, newH];
						}
						var waitEl = img.previousElementSibling;
						if (waitEl) {
							var parentEl = img.parentNode;
							$hide(waitEl);
							parentEl.classList.remove('de-fullimg-wrap-nosize');
							if (onsizechange) {
								onsizechange(parentEl);
							}
						} else if (isRotated && onrotate) {
							onrotate(img.parentNode);
						}
					};
					DollchanAPI.notify('expandmedia', src);
					return wrapEl;
				}

				var isWebm = src.split('.').pop() === 'webm';
				var needTitle = isWebm && Cfg.webmTitles;
				var inPostSize = '';
				if (inPost) {
					var _computeFullSize = this.computeFullSize(),
					    _computeFullSize2 = _slicedToArray(_computeFullSize, 2),
					    width = _computeFullSize2[0],
					    height = _computeFullSize2[1];

					inPostSize = ' style="width: ' + width + 'px; height: ' + height + 'px;"';
				}
				var hasTitle = needTitle && this.el.hasAttribute('de-metatitle');
				var title = hasTitle ? this.el.getAttribute('de-metatitle') : '';
				wrapEl = $add('<div class="de-fullimg-wrap' + wrapClass + '"' + inPostSize + '>\n\t\t\t<video style="width: inherit; height: inherit" src="' + src + '" ' + ((hasTitle && title ? 'title="' + title + '" ' : '') + 'loop autoplay ') + ('' + (Cfg.webmControl ? 'controls ' : '')) + ((Cfg.webmVolume === 0 ? 'muted ' : '') + '></video>\n\t\t\t<div class="de-fullimg-info">\n\t\t\t\t' + imgNameEl + (hasTitle && title ? ' - ' + title : '') + '</a>\n\t\t\t\t' + (needTitle && !hasTitle ? '<svg class="de-wait">\n\t\t\t\t\t<use xlink:href="#de-symbol-wait"/></svg>' : '') + '\n\t\t\t</div>\n\t\t</div>'));
				var videoEl = wrapEl.firstElementChild;
				videoEl.volume = Cfg.webmVolume / 100;
				videoEl.addEventListener('ended', function () {
					return AttachedImage.viewer.navigate(true, true);
				});
				videoEl.addEventListener('error', function (_ref53) {
					var target = _ref53.target;

					if (!target.onceLoaded) {
						target.load();
						target.onceLoaded = true;
					}
				});
				setTimeout(function () {
					return videoEl.dispatchEvent(new CustomEvent('volumechange'));
				}, 150);
				videoEl.addEventListener('volumechange', function (_ref54) {
					var target = _ref54.target,
					    isTrusted = _ref54.isTrusted;

					var val = target.muted ? 0 : Math.round(target.volume * 100);
					if (isTrusted && val !== Cfg.webmVolume) {
						saveCfg('webmVolume', val);
						sendStorageEvent('__de-webmvolume', val);
					}
				});
				if (nav.isMsEdge && isWebm && !DollchanAPI.hasListener('expandmedia')) {
					var href = 'https://github.com/Kagami/webmify/';
					$popup('err-expandmedia', Lng.errMsEdgeWebm[lang] + ':\n<a href="' + href + '" target="_blank">' + href + '</a>', false);
				}
				if (needTitle && !hasTitle) {
					this._webmTitleLoad = ContentLoader.loadImgData(videoEl.src, false).then(function (data) {
						$hide($q('.de-wait', wrapEl));
						if (!data) {
							return;
						}
						var str = '',
						    d = new WebmParser(data.buffer).getWebmData();
						if (!d) {
							return;
						}
						d = d[0];
						for (var i = 0, len = d.length; i < len; ++i) {
							if (d[i] === 0x49 && d[i + 1] === 0xA9 && d[i + 2] === 0x66 && d[i + 18] === 0x7B && d[i + 19] === 0xA9) {
								i += 20;
								for (var end = (d[i++] & 0x7F) + i; i < end; ++i) {
									str += String.fromCharCode(d[i]);
								}
								break;
							}
						}
						var loadedTitle = decodeURIComponent(escape(str));
						_this58.el.setAttribute('de-metatitle', loadedTitle);
						if (str) {
							$q('.de-fullimg-src', wrapEl).textContent += ' - ' + (videoEl.title = loadedTitle);
						}
					});
				}
				DollchanAPI.notify('expandmedia', src);
				return wrapEl;
			}
		}, {
			key: 'sendCloseEvent',
			value: function sendCloseEvent(e, inPost) {
				var post = this.post;

				var cr = post.el.getBoundingClientRect();
				var x = e.pageX - window.pageXOffset;
				var y = e.pageY - window.pageYOffset;
				if (!inPost) {
					while (x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
						post = post.parent;
						if (post && post instanceof Pview) {
							cr = post.el.getBoundingClientRect();
						} else {
							if (Pview.top) {
								Pview.top.markToDel();
							}
							return;
						}
					}
					post.mouseEnter();
				} else if (x > cr.right || y > cr.bottom && Pview.top) {
					Pview.top.markToDel();
				}
			}
		}, {
			key: 'height',
			get: function get() {
				return (this._size || [-1, -1])[1];
			}
		}, {
			key: 'inPview',
			get: function get() {
				var value = this.post instanceof Pview;
				Object.defineProperty(this, 'inPview', { value: value });
				return value;
			}
		}, {
			key: 'isImage',
			get: function get() {
				var value = /\.jpe?g|\.png|\.gif/i.test(this.src) || this.src.startsWith('blob:') && !this.el.hasAttribute('de-video');
				Object.defineProperty(this, 'isImage', { value: value });
				return value;
			}
		}, {
			key: 'isVideo',
			get: function get() {
				var value = /\.(?:webm|mp4|ogv)(?:&|$)/i.test(this.src) || this.src.startsWith('blob:') && this.el.hasAttribute('de-video');
				Object.defineProperty(this, 'isVideo', { value: value });
				return value;
			}
		}, {
			key: 'src',
			get: function get() {
				var value = this._getImageSrc();
				Object.defineProperty(this, 'src', { value: value });
				return value;
			}
		}, {
			key: 'width',
			get: function get() {
				return (this._size || [-1, -1])[0];
			}
		}, {
			key: '_size',
			get: function get() {
				var value = this._getImageSize();
				Object.defineProperty(this, '_size', { value: value, writable: true });
				return value;
			}
		}], [{
			key: 'isControlClick',
			value: function isControlClick(e) {
				return Cfg.webmControl && e.clientY > e.target.getBoundingClientRect().bottom - 40;
			}
		}]);

		return ExpandableImage;
	}();



	var EmbeddedImage = function (_ExpandableImage) {
		_inherits(EmbeddedImage, _ExpandableImage);

		function EmbeddedImage() {
			_classCallCheck(this, EmbeddedImage);

			return _possibleConstructorReturn(this, (EmbeddedImage.__proto__ || Object.getPrototypeOf(EmbeddedImage)).apply(this, arguments));
		}

		_createClass(EmbeddedImage, [{
			key: '_getImageParent',
			value: function _getImageParent() {
				return this.el.parentNode;
			}
		}, {
			key: '_getImageSize',
			value: function _getImageSize() {
				return [this.el.naturalWidth, this.el.naturalHeight];
			}
		}, {
			key: '_getImageSrc',
			value: function _getImageSrc() {
				return this.el.src;
			}
		}]);

		return EmbeddedImage;
	}(ExpandableImage);



	var AttachedImage = function (_ExpandableImage2) {
		_inherits(AttachedImage, _ExpandableImage2);

		function AttachedImage() {
			_classCallCheck(this, AttachedImage);

			return _possibleConstructorReturn(this, (AttachedImage.__proto__ || Object.getPrototypeOf(AttachedImage)).apply(this, arguments));
		}

		_createClass(AttachedImage, [{
			key: '_getImageParent',
			value: function _getImageParent() {
				return aib.getImgWrap(this.el);
			}
		}, {
			key: '_getImageSize',
			value: function _getImageSize() {
				if (this.info) {
					var size = this.info.match(/(?:[\s]|^)(\d+)\s?[x\u00D7]\s?(\d+)(?:[)\s,]|$)/);
					return size ? [size[1], size[2]] : null;
				}
				return null;
			}
		}, {
			key: '_getImageSrc',
			value: function _getImageSrc() {
				return aib.getImgSrcLink(this.el).getAttribute('href');
			}
		}, {
			key: 'info',
			get: function get() {
				var value = aib.getImgInfo(aib.getImgWrap(this.el));
				Object.defineProperty(this, 'info', { value: value });
				return value;
			}
		}, {
			key: 'name',
			get: function get() {
				var value = aib.getImgRealName(aib.getImgWrap(this.el)).trim();
				Object.defineProperty(this, 'name', { value: value });
				return value;
			}
		}, {
			key: 'weight',
			get: function get() {
				var value = 0;
				if (this.info) {
					var w = this.info.match(/(\d+(?:[.,]\d+)?)\s*([mмkк])?i?[bб]/i);
					var w1 = w[1].replace(',', '.');
					value = w[2] === 'M' ? w1 * 1e3 | 0 : !w[2] ? Math.round(w1 / 1e3) : w1;
				}
				Object.defineProperty(this, 'weight', { value: value });
				return value;
			}
		}], [{
			key: 'closeImg',
			value: function closeImg() {
				var viewer = AttachedImage.viewer;

				if (viewer) {
					viewer.closeImgViewer(null);
					AttachedImage.viewer = null;
				}
			}
		}]);

		return AttachedImage;
	}(ExpandableImage);

	AttachedImage.viewer = null;


	var PostImages = function () {
		function PostImages(post) {
			_classCallCheck(this, PostImages);

			var first = null,
			    last = null,
			    els = $Q(aib.qPostImg, post.el);
			var hasAttachments = false;
			var filesMap = new Map();
			for (var i = 0, len = els.length; i < len; ++i) {
				var el = els[i];
				last = new AttachedImage(post, el, last);
				filesMap.set(el, last);
				hasAttachments = true;
				if (!first) {
					first = last;
				}
			}
			if (Cfg.addImgs || localData) {
				els = $Q('.de-img-embed', post.el);
				for (var _i8 = 0, _len6 = els.length; _i8 < _len6; ++_i8) {
					var _el8 = els[_i8];
					last = new EmbeddedImage(post, _el8, last);
					filesMap.set(_el8, last);
					if (!first) {
						first = last;
					}
				}
			}
			this.first = first;
			this.last = last;
			this.hasAttachments = hasAttachments;
			this._map = filesMap;
		}

		_createClass(PostImages, [{
			key: 'getImageByEl',
			value: function getImageByEl(el) {
				return this._map.get(el);
			}
		}, {
			key: Symbol.iterator,
			value: function value() {
				return {
					_img: this.first,
					next: function next() {
						var value = this._img;
						if (value) {
							this._img = value.next;
							return { value: value, done: false };
						}
						return { done: true };
					}
				};
			}
		}, {
			key: 'expanded',
			get: function get() {
				for (var img = this.first; img; img = img.next) {
					if (img.expanded) {
						return true;
					}
				}
				return false;
			}
		}, {
			key: 'firstAttach',
			get: function get() {
				return this.hasAttachments ? this.first : null;
			}
		}]);

		return PostImages;
	}();

	var ImagesHashStorage = Object.create({
		get getHash() {
			var value = this._getHashHelper.bind(this);
			Object.defineProperty(this, 'getHash', { value: value });
			return value;
		},
		endFn: function endFn() {
			if (this.hasOwnProperty('_storage')) {
				sesStorage['de-imageshash'] = JSON.stringify(this._storage);
			}
			if (this.hasOwnProperty('_workers')) {
				this._workers.clearWorkers();
				delete this._workers;
			}
		},


		get _canvas() {
			var value = doc.createElement('canvas');
			Object.defineProperty(this, '_canvas', { value: value });
			return value;
		},
		get _storage() {
			var value = null;
			try {
				value = JSON.parse(sesStorage['de-imageshash']);
			} finally {
				if (!value) {
					value = {};
				}
				Object.defineProperty(this, '_storage', { value: value });
				return value;
			}
		},
		get _workers() {
			var value = new WorkerPool(4, this._genImgHash, emptyFn);
			Object.defineProperty(this, '_workers', { value: value, configurable: true });
			return value;
		},
		_genImgHash: function _genImgHash(_ref55) {
			var _ref56 = _slicedToArray(_ref55, 3),
			    arrBuf = _ref56[0],
			    oldw = _ref56[1],
			    oldh = _ref56[2];

			var buf = new Uint8Array(arrBuf);
			var size = oldw * oldh;
			for (var i = 0, j = 0; i < size; i++, j += 4) {
				buf[i] = buf[j] * 0.3 + buf[j + 1] * 0.59 + buf[j + 2] * 0.11;
			}
			var newh = 8;
			var neww = 8;
			var levels = 3;
			var areas = 256 / levels;
			var values = 256 / (levels - 1);
			var hash = 0;
			for (var _i9 = 0; _i9 < newh; ++_i9) {
				for (var _j3 = 0; _j3 < neww; ++_j3) {
					var tmp = _i9 / (newh - 1) * (oldh - 1);
					var l = Math.min(tmp | 0, oldh - 2);
					var u = tmp - l;
					tmp = _j3 / (neww - 1) * (oldw - 1);
					var c = Math.min(tmp | 0, oldw - 2);
					var t = tmp - c;
					hash = (hash << 4) + Math.min(values * ((buf[l * oldw + c] * ((1 - t) * (1 - u)) + buf[l * oldw + c + 1] * (t * (1 - u)) + buf[(l + 1) * oldw + c + 1] * (t * u) + buf[(l + 1) * oldw + c] * ((1 - t) * u)) / areas | 0), 255);
					var g = hash & 0xF0000000;
					if (g) {
						hash ^= g >>> 24;
					}
					hash &= ~g;
				}
			}
			return { hash: hash };
		},
		_getHashHelper: function () {
			var _ref58 = _asyncToGenerator( regeneratorRuntime.mark(function _callee17(_ref57) {
				var _this61 = this;

				var el = _ref57.el,
				    src = _ref57.src;
				var data, buffer, val, w, h, imgData, cnv, ctx;
				return regeneratorRuntime.wrap(function _callee17$(_context18) {
					while (1) {
						switch (_context18.prev = _context18.next) {
							case 0:
								if (!(src in this._storage)) {
									_context18.next = 2;
									break;
								}

								return _context18.abrupt('return', this._storage[src]);

							case 2:
								if (el.complete) {
									_context18.next = 5;
									break;
								}

								_context18.next = 5;
								return new Promise(function (resolve) {
									return el.addEventListener('load', function () {
										return resolve();
									});
								});

							case 5:
								if (!(el.naturalWidth + el.naturalHeight === 0)) {
									_context18.next = 7;
									break;
								}

								return _context18.abrupt('return', -1);

							case 7:
								data = void 0, buffer = void 0, val = -1;
								w = el.naturalWidth, h = el.naturalHeight;

								if (!aib.fch) {
									_context18.next = 16;
									break;
								}

								_context18.next = 12;
								return ContentLoader.loadImgData(el.src);

							case 12:
								imgData = _context18.sent;

								if (imgData) {
									buffer = imgData.buffer;
								}
								_context18.next = 22;
								break;

							case 16:
								cnv = this._canvas;

								cnv.width = w;
								cnv.height = h;
								ctx = cnv.getContext('2d');

								ctx.drawImage(el, 0, 0);
								buffer = ctx.getImageData(0, 0, w, h).data.buffer;

							case 22:
								if (!buffer) {
									_context18.next = 27;
									break;
								}

								_context18.next = 25;
								return new Promise(function (resolve) {
									return _this61._workers.runWorker([buffer, w, h], [buffer], function (val) {
										return resolve(val);
									});
								});

							case 25:
								data = _context18.sent;

								if (data && 'hash' in data) {
									val = data.hash;
								}

							case 27:
								this._storage[src] = val;
								return _context18.abrupt('return', val);

							case 29:
							case 'end':
								return _context18.stop();
						}
					}
				}, _callee17, this);
			}));

			function _getHashHelper(_x57) {
				return _ref58.apply(this, arguments);
			}

			return _getHashHelper;
		}()
	});

	function addImgSrcButtons(link) {
		link.insertAdjacentHTML('beforebegin', '<svg class="de-btn-src"><use xlink:href="#de-symbol-post-src"/></svg>');
	}

	function processImgInfoLinks(el) {
		var addSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Cfg.imgSrcBtns;
		var delNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Cfg.delImgNames;

		if (!addSrc && !delNames) {
			return;
		}
		var els = $Q(aib.qImgNameLink, el);
		for (var i = 0, len = els.length; i < len; ++i) {
			var link = els[i];
			if (/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
				$del(link);
				continue;
			}
			if (link.firstElementChild) {
				continue;
			}
			if (addSrc) {
				addImgSrcButtons(link);
			}
			if (delNames) {
				link.classList.add('de-img-name');
				var text = link.textContent;
				link.textContent = text.split('.').pop();
				link.title = text;
			}
		}
	}

	function embedPostMsgImages(el) {
		if (!Cfg.addImgs || localData) {
			return;
		}
		var els = $Q(aib.qMsgImgLink, el);
		for (var i = 0, len = els.length; i < len; ++i) {
			var link = els[i];
			var _url3 = link.href;
			if (_url3.includes('?') || aib.getPostOfEl(link).hidden) {
				continue;
			}
			var a = link.cloneNode(false);
			a.target = '_blank';
			a.innerHTML = '<img class="de-img-embed" src="' + _url3 + '">';
			$before(link, a);
			if (Cfg.imgSrcBtns) {
				addImgSrcButtons(link);
			}
		}
	}


	var DOMPostsBuilder = function () {
		function DOMPostsBuilder(form, isArchived) {
			_classCallCheck(this, DOMPostsBuilder);

			this._form = form;
			this._posts = $Q(aib.qRPost, form);
			this.length = this._posts.length;
			this.postersCount = '';
			this._isArchived = isArchived;
		}

		_createClass(DOMPostsBuilder, [{
			key: 'getOpMessage',
			value: function getOpMessage() {
				return aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, this._form)));
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return aib.getPNum(this._posts[i]);
			}
		}, {
			key: 'getPostEl',
			value: function getPostEl(i) {
				return aib.fixHTML(this._posts[i]);
			}
		}, {
			key: 'bannedPostsData',
			value: regeneratorRuntime.mark(function bannedPostsData() {
				var banEls, i, len, banEl, postEl;
				return regeneratorRuntime.wrap(function bannedPostsData$(_context19) {
					while (1) {
						switch (_context19.prev = _context19.next) {
							case 0:
								banEls = $Q(aib.qBan, this._form);
								i = 0, len = banEls.length;

							case 2:
								if (!(i < len)) {
									_context19.next = 10;
									break;
								}

								banEl = banEls[i];
								postEl = aib.getPostElOfEl(banEl);
								_context19.next = 7;
								return [1, postEl ? aib.getPNum(postEl) : null, doc.adoptNode(banEl)];

							case 7:
								++i;
								_context19.next = 2;
								break;

							case 10:
							case 'end':
								return _context19.stop();
						}
					}
				}, bannedPostsData, this);
			})
		}, {
			key: 'isClosed',
			get: function get() {
				return aib.qClosed && !!$q(aib.qClosed, this._form) || this._isArchived;
			}
		}]);

		return DOMPostsBuilder;
	}();

	var _4chanPostsBuilder = function () {
		function _4chanPostsBuilder(json, brd) {
			_classCallCheck(this, _4chanPostsBuilder);

			this._posts = json.posts;
			this._brd = brd;
			this.length = json.posts.length - 1;
			this.postersCount = this._posts[0].unique_ips;
			if (this._posts[0].custom_spoiler) {
				_4chanPostsBuilder._setCustomSpoiler(brd, this._posts[0].custom_spoiler);
			}
		}

		_createClass(_4chanPostsBuilder, [{
			key: 'getOpMessage',
			value: function getOpMessage() {
				var _posts$ = this._posts[0],
				    no = _posts$.no,
				    com = _posts$.com;

				return $add(aib.fixHTML('<blockquote class="postMessage" id="m' + no + '"> ' + com + '</blockquote>'));
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return this._posts[i + 1].no;
			}
		}, {
			key: 'getPostEl',
			value: function getPostEl(i) {
				return $add(aib.fixHTML(this.getPostHTML(i))).lastElementChild;
			}
		}, {
			key: 'getPostHTML',
			value: function getPostHTML(i) {
				var data = this._posts[i + 1];
				var num = data.no;
				var brd = this._brd;
				var _icon = function _icon(id) {
					return '//s.4cdn.org/image/' + id + (window.devicePixelRatio < 2 ? '.gif' : '@2x.gif');
				};

				var fileHTML = '';
				if (data.filedeleted) {
					fileHTML = '<div id="f' + num + '" class="file"><span class="fileThumb">\n\t\t\t\t<img src="' + _icon('filedeleted-res') + '" class="fileDeletedRes" alt="File deleted.">\n\t\t\t</span></div>';
				} else if (typeof data.filename === 'string') {
					var _chanPostsBuilder$fi = _4chanPostsBuilder.fixFileName(data.filename, 30),
					    _name2 = _chanPostsBuilder$fi.name,
					    needTitle = _chanPostsBuilder$fi.isFixed;

					_name2 += data.ext;
					if (!data.tn_w && !data.tn_h && data.ext === '.gif') {
						data.tn_w = data.w;
						data.tn_h = data.h;
					}
					var isSpoiler = data.spoiler && !Cfg.noSpoilers;
					if (isSpoiler) {
						_name2 = 'Spoiler Image';
						data.tn_w = data.tn_h = 100;
						needTitle = false;
					}
					var size = prettifySize(data.fsize);
					var fileTextTitle = isSpoiler ? ' title="' + (data.filename + data.ext) + '"' : '';
					var aHref = needTitle ? 'title="' + (data.filename + data.ext) + '"' : '';
					var imgSrc = isSpoiler ? '//s.4cdn.org/image/spoiler' + (_4chanPostsBuilder._customSpoiler.get(brd) || '') + '.png' : '//i.4cdn.org/' + brd + '/' + data.tim + 's.jpg';
					fileHTML = '<div class="file" id="f' + num + '">\n\t\t\t\t<div class="fileText" id="fT' + num + '"' + fileTextTitle + '>File:\n\t\t\t\t\t<a href="//i.4cdn.org/' + brd + '/' + (data.tim + data.ext) + '" ' + aHref + ' target="_blank">' + _name2 + '</a>\n\t\t\t\t\t(' + size + ', ' + (data.ext === '.pdf' ? 'PDF' : data.w + 'x' + data.h) + ')\n\t\t\t\t</div>\n\t\t\t\t<a class="fileThumb ' + (isSpoiler ? 'imgSpoiler' : '') + '" href="//i.4cdn.org/' + brd + '/' + (data.tim + data.ext + '" target="_blank">\n\t\t\t\t\t<img src="' + imgSrc + '" alt="' + size + '" data-md5="') + (data.md5 + '" style="height: ' + data.tn_h + 'px; width: ' + data.tn_w + 'px;">\n\t\t\t\t\t<div data-tip="" data-tip-cb="mShowFull" class="mFileInfo mobile">\n\t\t\t\t\t\t' + size + ' ' + data.ext.substr(1).toUpperCase() + '\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>');
				}

				var highlight = '',
				    capcodeText = '',
				    capcodeClass = '',
				    capcodeImg = '';
				switch (data.capcode) {
					case 'admin_highlight':
						highlight = ' highlightPost';
					case 'admin':
						capcodeText = '<strong class="capcode hand id_admin" ' + 'title="Highlight posts by Administrators">## Admin</strong>';
						capcodeClass = 'capcodeAdmin';
						capcodeImg = '<img src="' + _icon('adminicon') + '" alt="This user is a 4chan Administrator." ' + 'title="This user is a 4chan Administrator." class="identityIcon">';
						break;
					case 'mod':
						capcodeText = '<strong class="capcode hand id_mod" ' + 'title="Highlight posts by Moderators">## Mod</strong>';
						capcodeClass = 'capcodeMod';
						capcodeImg = '<img src="' + _icon('modicon') + '" alt="This user is a 4chan Moderator." ' + 'title="This user is a 4chan Moderator." class="identityIcon">';
						break;
					case 'developer':
						capcodeText = '<strong class="capcode hand id_developer" ' + 'title="Highlight posts by Developers">## Developer</strong>';
						capcodeClass = 'capcodeDeveloper';
						capcodeImg = '<img src="' + _icon('developericon') + '" alt="This user is a 4chan Developer." ' + 'title="This user is a 4chan Developer." class="identityIcon">';
						break;
					case 'manager':
						capcodeText = '<strong class="capcode hand id_manager" ' + 'title="Highlight posts by Managers">## Manager</strong>';
						capcodeClass = 'capcodeManager';
						capcodeImg = '<img src="' + _icon('managericon') + '" alt="This user is a 4chan Manager." ' + 'title="This user is a 4chan Manager." class="identityIcon">';
						break;
					case 'founder':
						capcodeText = '<strong class="capcode hand id_admin" ' + 'title="Highlight posts by the Founder">## Founder</strong>';
						capcodeClass = ' capcodeAdmin';
						capcodeImg = '<img src="' + _icon('foundericon') + '" alt="This user is 4chan\'s Founder." ' + 'title="This user is 4chan\'s Founder." class="identityIcon">';
				}

				var _data$name = data.name,
				    name = _data$name === undefined ? '' : _data$name;

				var nameEl = '<span class="name">' + name + '</span>';
				var mobNameEl = name.length <= 30 ? nameEl : '<span class="name" data-tip data-tip-cb="mShowFull">' + name.substring(30) + '(\u2026)</span>';
				var tripEl = '' + (data.trip ? '<span class="postertrip">' + data.trip + '</span>' : '');
				var posteruidEl = data.id && !data.capcode ? '<span class="posteruid id_' + data.id + ('">(ID: <span class="hand" title="Highlight posts by this ID">' + data.id + '</span>)</span>') : '';
				var flagEl = data.country ? '<span title="' + data.country_name + '" class="flag flag-' + data.country.toLowerCase() + '"></span>' : '';
				var emailEl = data.email ? '<a href="mailto:' + data.email.replace(/ /g, '%20') + '" class="useremail">' : '';
				var replyEl = '<a href="#p' + num + '" title="Link to this post">No.</a><a href="javascript:quote(\'' + num + '\');" title="Reply to this post">' + num + '</a>';
				var subjEl = '<span class="subject">' + (data.sub || '') + '</span>';
				return '<div class="postContainer replyContainer" id="pc' + num + '">\n\t\t\t<div class="sideArrows" id="sa' + num + '">&gt;&gt;</div>\n\t\t\t<div id="p' + num + '" class="post ' + (i === -1 ? 'op' : 'reply') + ' ' + highlight + '">\n\t\t\t\t<div class="postInfoM mobile" id="pim' + num + '">\n\t\t\t\t\t<span class="nameBlock ' + capcodeClass + '">\n\t\t\t\t\t\t' + mobNameEl + '\n\t\t\t\t\t\t' + tripEl + '\n\t\t\t\t\t\t' + capcodeText + '\n\t\t\t\t\t\t' + capcodeImg + '\n\t\t\t\t\t\t' + posteruidEl + '\n\t\t\t\t\t\t' + flagEl + '<br>\n\t\t\t\t\t\t' + subjEl + '\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="dateTime postNum" data-utc="' + data.time + '">' + data.now + ' ' + replyEl + '</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="postInfo desktop" id="pi' + num + '">\n\t\t\t\t\t<input name="' + num + '" value="delete" type="checkbox">\n\t\t\t\t\t' + subjEl + '\n\t\t\t\t\t<span class="nameBlock ' + capcodeClass + '">\n\t\t\t\t\t\t' + emailEl + '\n\t\t\t\t\t\t\t' + nameEl + '\n\t\t\t\t\t\t\t' + tripEl + '\n\t\t\t\t\t\t\t' + capcodeText + '\n\t\t\t\t\t\t' + (data.email ? '</a>' : '') + '\n\t\t\t\t\t\t' + capcodeImg + '\n\t\t\t\t\t\t' + posteruidEl + '\n\t\t\t\t\t\t' + flagEl + '\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="dateTime" data-utc="' + data.time + '">' + data.now + '</span>\n\t\t\t\t\t<span class="postNum desktop">' + replyEl + '</span>\n\t\t\t\t</div>\n\t\t\t\t' + fileHTML + '\n\t\t\t\t<blockquote class="postMessage" id="m' + num + '"> ' + (data.com || '') + '</blockquote>\n\t\t\t</div>\n\t\t</div>';
			}
		}, {
			key: 'bannedPostsData',
			value: regeneratorRuntime.mark(function bannedPostsData() {
				return regeneratorRuntime.wrap(function bannedPostsData$(_context20) {
					while (1) {
						switch (_context20.prev = _context20.next) {
							case 0:
							case 'end':
								return _context20.stop();
						}
					}
				}, bannedPostsData, this);
			})
		}, {
			key: 'isClosed',
			get: function get() {
				return !!(this._posts[0].closed || this._posts[0].archived);
			}
		}], [{
			key: 'fixFileName',
			value: function fixFileName(name, maxLength) {
				var decodedName = name.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
				return decodedName.length <= maxLength ? { isFixed: false, name: name } : {
					isFixed: true,
					name: decodedName.slice(0, 25).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
				};
			}
		}, {
			key: '_setCustomSpoiler',
			value: function _setCustomSpoiler(board, val) {
				var spoiler = _4chanPostsBuilder._customSpoiler;
				if (!spoiler[board] && (val = parseInt(val))) {
					var spoilerEl = void 0;
					if (board === aib.brd && (spoilerEl = $q('.imgspoiler'))) {
						spoiler.set(board, spoilerEl.firstChild.src.match(/spoiler(-[a-z0-9]+)\.png$/)[1]);
					}
				} else {
					spoiler.set(board, '-' + board + (Math.floor(Math.random() * val) + 1));
				}
			}
		}]);

		return _4chanPostsBuilder;
	}();

	_4chanPostsBuilder._customSpoiler = new Map();

	var DobrochanPostsBuilder = function () {
		function DobrochanPostsBuilder(json, brd) {
			_classCallCheck(this, DobrochanPostsBuilder);

			if (json.error) {
				throw new AjaxError(0, 'API error: ' + json.error.message);
			}
			this._json = json.result;
			this._brd = brd;
			this._posts = json.result.threads[0].posts;
			this.length = this._posts.length - 1;
			this.postersCount = '';
		}

		_createClass(DobrochanPostsBuilder, [{
			key: 'getOpMessage',
			value: function getOpMessage() {
				return $add(aib.fixHTML('<div class="postbody"> ' + this._posts[0].message_html + '</div>'));
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return this._posts[i + 1].display_id;
			}
		}, {
			key: 'getPostEl',
			value: function getPostEl(i) {
				return $add(aib.fixHTML(this.getPostHTML(i))).firstChild.firstChild.lastElementChild;
			}
		}, {
			key: 'getPostHTML',
			value: function getPostHTML(i) {
				var data = this._posts[i + 1];
				var num = data.display_id;
				var brd = this._brd;
				var multiFile = data.files.length > 1;

				var filesHTML = '';
				var _iteratorNormalCompletion27 = true;
				var _didIteratorError27 = false;
				var _iteratorError27 = undefined;

				try {
					for (var _iterator27 = data.files[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
						var _ref59 = _step27.value;
						var file_id = _ref59.file_id;
						var metadata = _ref59.metadata;
						var rating = _ref59.rating;
						var size = _ref59.size;
						var src = _ref59.src;
						var thumb = _ref59.thumb;
						var thumb_height = _ref59.thumb_height;
						var thumb_width = _ref59.thumb_width;

						var fileName = void 0,
						    fullFileName = void 0,
						    th = thumb;
						var thumbW = 200;
						var thumbH = 200;
						var ext = src.split('.').pop();
						if (brd === 'b' || brd === 'rf') {
							fileName = fullFileName = th.split('/').pop();
						} else {
							fileName = fullFileName = src.split('/').pop();
							if (multiFile && fileName.length > 20) {
								fileName = fileName.substr(0, 20 - ext.length) + '(…)' + ext;
							}
						}
						var maxRating = 'r15'; 
						if (rating === 'r-18g' && maxRating !== 'r-18g') {
							th = 'images/r-18g.png';
						} else if (rating === 'r-18' && (maxRating !== 'r-18g' || maxRating !== 'r-18')) {
							th = 'images/r-18.png';
						} else if (rating === 'r-15' && maxRating === 'sfw') {
							th = 'images/r-15.png';
						} else if (rating === 'illegal') {
							th = 'images/illegal.png';
						} else {
							thumbW = thumb_width;
							thumbH = thumb_height;
						}
						var fileInfo = '<div class="fileinfo' + (multiFile ? ' limited' : '') + '">\u0424\u0430\u0439\u043B:\n\t\t\t\t<a href="/' + src + '" title="' + fullFileName + '" target="_blank">' + fileName + '</a><br>\n\t\t\t\t<em>' + ext + ', ' + prettifySize(size) + ', ' + metadata.width + 'x' + metadata.height + '\n\t\t\t\t</em>' + (multiFile ? '' : ' - Нажмите на картинку для увеличения') + '<br>\n\t\t\t\t<a class="edit_ icon" href="/utils/image/edit/' + file_id + '/' + num + '">\n\t\t\t\t\t<img title="edit" alt="edit" src="/images/blank.png">\n\t\t\t\t</a>\n\t\t\t</div>';
						filesHTML += (multiFile ? '' : fileInfo) + '\n\t\t\t<div id="file_' + num + '_' + file_id + '" class="file">' + (multiFile ? fileInfo : '') + '\n\t\t\t\t<a href="/' + src + '" target="_blank">\n\t\t\t\t\t<img class="thumb" src="/' + th + '" width="' + thumbW + '" height="' + thumbH + '">\n\t\t\t\t</a>\n\t\t\t</div>';
					}

				} catch (err) {
					_didIteratorError27 = true;
					_iteratorError27 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion27 && _iterator27.return) {
							_iterator27.return();
						}
					} finally {
						if (_didIteratorError27) {
							throw _iteratorError27;
						}
					}
				}

				var date = data.date.replace(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/, function (all, y, mo, d, h, m, s) {
					var dt = new Date(y, +mo - 1, d, h, m, s);
					return pad2(dt.getDate()) + ' ' + Lng.fullMonth[1][dt.getMonth()] + ' ' + dt.getFullYear() + ' (' + Lng.week[1][dt.getDay()] + ') ' + pad2(dt.getHours()) + ':' + pad2(dt.getMinutes());
				});
				var isOp = i === -1;
				return (isOp ? '<div id="post_' + num + '" class="oppost post">' : '<table id="post_' + num + '" class="replypost post"><tbody><tr>\n\t\t\t<td class="doubledash">&gt;&gt;</td>\n\t\t\t<td class="reply" id="reply' + num + '">') + '\n\t\t\t\t<a name="i' + num + '"></a>\n\t\t\t\t<label>\n\t\t\t\t\t<input name="' + num + '" value="' + data.thread_id + '" ' + ('class="delete_checkbox" id="delbox_' + num + '" type="checkbox">\n\t\t\t\t\t' + (data.subject ? '<span class="replytitle">' + data.subject + '</span>' : '') + '\n\t\t\t\t\t<span class="postername">' + (data.name || 'Анонимус') + '</span> ' + date + '\n\t\t\t\t</label>\n\t\t\t\t<span class="reflink">\n\t\t\t\t\t<a href="/' + brd + '/res/' + data.thread_id + '.xhtml#i' + num + '"> No.' + num + '</a>\n\t\t\t\t</span><br>\n\t\t\t\t' + filesHTML + '\n\t\t\t\t' + (multiFile ? '<div style="clear: both;"></div>' : '') + '\n\t\t\t\t<div class="postbody"> ' + data.message_html + '</div>\n\t\t\t' + (isOp ? '</div>' : '</td></tr></tbody></table>'));
			}
		}, {
			key: 'bannedPostsData',
			value: regeneratorRuntime.mark(function bannedPostsData() {
				return regeneratorRuntime.wrap(function bannedPostsData$(_context21) {
					while (1) {
						switch (_context21.prev = _context21.next) {
							case 0:
							case 'end':
								return _context21.stop();
						}
					}
				}, bannedPostsData, this);
			})
		}, {
			key: 'isClosed',
			get: function get() {
				return !!this._json.threads[0].archived;
			}
		}]);

		return DobrochanPostsBuilder;
	}();

	var MakabaPostsBuilder = function () {
		function MakabaPostsBuilder(json, brd) {
			_classCallCheck(this, MakabaPostsBuilder);

			if (json.Error) {
				throw new AjaxError(0, 'API error: ' + json.Error + ' (' + json.Code + ')');
			}
			this._json = json;
			this._brd = brd;
			this._posts = json.threads[0].posts;
			this.length = json.posts_count;
			this.postersCount = json.unique_posters;
		}

		_createClass(MakabaPostsBuilder, [{
			key: 'getOpMessage',
			value: function getOpMessage() {
				return $add(aib.fixHTML(this._getPostMsg(this._posts[0])));
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return this._posts[i + 1].num;
			}
		}, {
			key: 'getPostEl',
			value: function getPostEl(i) {
				return $add(aib.fixHTML(this.getPostHTML(i))).firstElementChild;
			}
		}, {
			key: 'getPostHTML',
			value: function getPostHTML(i) {
				var data = this._posts[i + 1];
				var num = data.num;

				var brd = this._brd;
				var _switch = function _switch(val, obj) {
					return val in obj ? obj[val] : obj['@@default'];
				};

				var filesHTML = '';
				if (data.files && data.files.length !== 0) {
					filesHTML = '<div class="images images-' + (data.files.length === 1 ? 'single' : 'multi') + '">';
					var _iteratorNormalCompletion28 = true;
					var _didIteratorError28 = false;
					var _iteratorError28 = undefined;

					try {
						for (var _iterator28 = data.files[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
							var file = _step28.value;

							var imgId = num + '-' + file.md5;
							var _file$fullname = file.fullname,
							    fullname = _file$fullname === undefined ? file.name : _file$fullname,
							    _file$displayname = file.displayname,
							    dispName = _file$displayname === undefined ? file.name : _file$displayname;

							var isWebm = fullname.substr(-5) === '.webm';
							filesHTML += '<figure class="image">\n\t\t\t\t\t<figcaption class="file-attr">\n\t\t\t\t\t\t<a id="title-' + imgId + '" class="desktop" target="_blank" href="' + file.path + '"' + ((dispName === fullname ? '' : ' title="' + fullname + '"') + '>' + dispName + '</a>\n\t\t\t\t\t\t<span class="filesize">(' + file.size + '\u041A\u0431, ' + file.width + 'x' + file.height) + ((isWebm ? ', ' + file.duration : '') + ')</span>\n\t\t\t\t\t</figcaption>\n\t\t\t\t\t<div id="exlink-' + imgId + '" class="image-link">\n\t\t\t\t\t\t<a href="' + file.path + '">\n\t\t\t\t\t\t\t<img class="img preview' + (isWebm ? ' webm-file' : '') + '" src="') + (file.thumbnail + '" alt="' + file.size + '" width="') + (file.tn_width + '" height="' + file.tn_height + '">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</figure>');
						}
					} catch (err) {
						_didIteratorError28 = true;
						_iteratorError28 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion28 && _iterator28.return) {
								_iterator28.return();
							}
						} finally {
							if (_didIteratorError28) {
								throw _iteratorError28;
							}
						}
					}

					filesHTML += '</div>';
				} else if (data.video) {
					filesHTML = '<div class="images">\n\t\t\t\t<div style="float: left; margin: 5px; margin-right:10px">' + data.video + '</div>\n\t\t\t</div>';
				}

				var emailEl = data.email ? '<a href="' + data.email + '" class="post-email">' + data.name + '</a>' : '<span class="ananimas">' + data.name + '</span>';
				var tripEl = !data.trip ? '' : '<span class="' + _switch(data.trip, {
					'!!%adm%!!': 'adm">## Abu ##',
					'!!%mod%!!': 'mod">## Mod ##',
					'!!%Inquisitor%!!': 'inquisitor">## Applejack ##',
					'!!%coder%!!': 'mod">## Кодер ##',
					'@@default': 'postertrip">' + data.trip
				}) + '</span>';
				var refHref = '/' + brd + '/res/' + (parseInt(data.parent) || num) + '.html#' + num;
				return '<div id="post-' + num + '" class="post-wrapper">\n\t\t\t<div class="post ' + (i === -1 ? 'oppost' : 'reply') + '" id="post-body-' + num + '" data-num="' + num + '">\n\t\t\t\t<div id="post-details-' + num + '" class="post-details">\n\t\t\t\t\t<input type="checkbox" name="delete" value="' + num + '">\n\t\t\t\t\t' + (!data.subject ? '' : '<span class="post-title">' + (data.subject + (data.tags ? ' /' + data.tags + '/' : '')) + '</span>') + '\n\t\t\t\t\t' + emailEl + '\n\t\t\t\t\t' + (data.icon ? '<span class="post-icon">' + data.icon + '</span>' : '') + '\n\t\t\t\t\t' + tripEl + '\n\t\t\t\t\t' + (data.op === 1 ? '<span class="ophui"># OP</span>&nbsp;' : '') + '\n\t\t\t\t\t<span class="posttime-reflink">\n\t\t\t\t\t\t<span class="posttime">' + data.date + '&nbsp;</span>\n\t\t\t\t\t\t<span class="reflink">\n\t\t\t\t\t\t\t<a href="' + refHref + '">\u2116</a>' + ('<a href="' + refHref + '" class="postbtn-reply-href" name="' + num + '">' + num + '</a>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</span>\n\t\t\t\t\t' + (this._brd === 'po' ? '<div id="like-div' + num + '" class="like-div">\n\t\t\t\t\t\t\t<span class="like-icon"><i class="fa fa-bolt"></i></span>\n\t\t\t\t\t\t\t<span class="like-caption">\u0414\u0432\u0430\u0447\u0443\u044E</span>\n\t\t\t\t\t\t\t<span id="like-count' + num + '" class="like-count">' + (data.likes || '') + '</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="dislike-div' + num + '" class="dislike-div">\n\t\t\t\t\t\t\t<span class="dislike-icon"><i class="fa fa-thumbs-down"></i></span>\n\t\t\t\t\t\t\t<span class="dislike-caption">RRRAGE!</span>\n\t\t\t\t\t\t\t<span id="dislike-count' + num + '" class="dislike-count">\n\t\t\t\t\t\t\t\t' + (data.dislikes || '') + '</span>\n\t\t\t\t\t\t</div>' : '') + '\n\t\t\t\t</div>\n\t\t\t\t' + filesHTML + '\n\t\t\t\t' + this._getPostMsg(data) + '\n\t\t\t</div>\n\t\t</div>');
			}
		}, {
			key: 'bannedPostsData',
			value: regeneratorRuntime.mark(function bannedPostsData() {
				var _iteratorNormalCompletion29, _didIteratorError29, _iteratorError29, _iterator29, _step29, _ref60, banned, num;

				return regeneratorRuntime.wrap(function bannedPostsData$(_context22) {
					while (1) {
						switch (_context22.prev = _context22.next) {
							case 0:
								_iteratorNormalCompletion29 = true;
								_didIteratorError29 = false;
								_iteratorError29 = undefined;
								_context22.prev = 3;
								_iterator29 = this._posts[Symbol.iterator]();

							case 5:
								if (_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done) {
									_context22.next = 21;
									break;
								}

								_ref60 = _step29.value;
								banned = _ref60.banned;
								num = _ref60.num;
								_context22.t0 = banned;
								_context22.next = _context22.t0 === 1 ? 12 : _context22.t0 === 2 ? 15 : 18;
								break;

							case 12:
								_context22.next = 14;
								return [1, num, $add('<span class="pomyanem">' + '(Автор этого поста был забанен. Помянем.)</span>')];

							case 14:
								return _context22.abrupt('break', 18);

							case 15:
								_context22.next = 17;
								return [2, num, $add('<span class="pomyanem">' + '(Автор этого поста был предупрежден.)</span>')];

							case 17:
								return _context22.abrupt('break', 18);

							case 18:
								_iteratorNormalCompletion29 = true;
								_context22.next = 5;
								break;

							case 21:
								_context22.next = 27;
								break;

							case 23:
								_context22.prev = 23;
								_context22.t1 = _context22['catch'](3);
								_didIteratorError29 = true;
								_iteratorError29 = _context22.t1;

							case 27:
								_context22.prev = 27;
								_context22.prev = 28;

								if (!_iteratorNormalCompletion29 && _iterator29.return) {
									_iterator29.return();
								}

							case 30:
								_context22.prev = 30;

								if (!_didIteratorError29) {
									_context22.next = 33;
									break;
								}

								throw _iteratorError29;

							case 33:
								return _context22.finish(30);

							case 34:
								return _context22.finish(27);

							case 35:
							case 'end':
								return _context22.stop();
						}
					}
				}, bannedPostsData, this, [[3, 23, 27, 35], [28,, 30, 34]]);
			})
		}, {
			key: '_getPostMsg',
			value: function _getPostMsg(data) {
				var _switch = function _switch(val, obj) {
					return val in obj ? obj[val] : obj['@@default'];
				};
				var comment = data.comment.replace(/<script /ig, '<!--<textarea ').replace(/<\/script>/ig, '</textarea>-->');
				return '<blockquote id="m' + data.num + '" class="post-message">' + comment + _switch(data.banned, {
					1: '<br><span class="pomyanem">(Автор этого поста был забанен. Помянем.)</span>',
					2: '<br><span class="pomyanem">(Автор этого поста был предупрежден.)</span>',
					'@@default': ''
				}) + '\n\t\t</blockquote>';
			}
		}, {
			key: 'isClosed',
			get: function get() {
				return this._json.is_closed;
			}
		}]);

		return MakabaPostsBuilder;
	}();

	var _0chanPostsBuilder = function () {
		function _0chanPostsBuilder(json) {
			_classCallCheck(this, _0chanPostsBuilder);

			if (json.error) {
				throw new AjaxError(0, 'API error: ' + json.message);
			}
			this._json = json;
			this._posts = json.posts;
			this.length = json.posts.length - 1;
			this.postersCount = '';
		}

		_createClass(_0chanPostsBuilder, [{
			key: 'getOpMessage',
			value: function getOpMessage() {
				return $add(aib.fixHTML('<div class="post-body-message"><div> ' + this._posts[0].message + '</div></div>'));
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return +this._posts[i + 1].id;
			}
		}, {
			key: 'getPostEl',
			value: function getPostEl(i) {
				return $add(aib.fixHTML(this.getPostHTML(i)));
			}
		}, {
			key: 'getPostHTML',
			value: function getPostHTML(i) {
				var filesHTML = '';
				var isOp = i === -1;
				var data = this._posts[i + 1];
				var num = data.id,
				    brd = data.boardDir,
				    parId = data.parentId;

				if (data.attachments.length) {
					filesHTML += '<div class="post-attachments">';
					var _iteratorNormalCompletion30 = true;
					var _didIteratorError30 = false;
					var _iteratorError30 = undefined;

					try {
						for (var _iterator30 = data.attachments[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
							var _ref61 = _step30.value;
							var images = _ref61.images;
							var orig = images.original,
							    thumb200 = images.thumb_200px,
							    thumb400 = images.thumb_400px;

							filesHTML += '<figure class="post-img"><span>\n\t\t\t\t\t<figcaption>\n\t\t\t\t\t\t<span class="pull-left">' + orig.width + 'x' + orig.height + ', ' + orig.size_kb + '\u041A\u0431</span>\n\t\t\t\t\t</figcaption>\n\t\t\t\t\t<a href="' + orig.url + '" target="_blank"><img src="' + thumb200.url + '" srcset="' + (thumb400.url + ' 2x" class="post-img-thumbnail" style="width: ') + (thumb200.width + 'px; height: ' + thumb200.height + 'px;"></a>\n\t\t\t\t</span></figure>');
						}
					} catch (err) {
						_didIteratorError30 = true;
						_iteratorError30 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion30 && _iterator30.return) {
								_iterator30.return();
							}
						} finally {
							if (_didIteratorError30) {
								throw _iteratorError30;
							}
						}
					}

					filesHTML += '</div>';
				}

				var d = new Date(data.date * 1e3);
				var date = d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
				var postParentEl = parId === this._json.posts[0].id ? '' : '<div class="post-parent"><a data-post="' + parId + '" href="/' + brd + '/' + data.threadId + '#' + parId + '">&gt;&gt;' + parId + '</a></div>';
				return '<div><div class="block post' + (isOp ? ' post-op' : '') + '">\n\t\t\t<div class="post-header">\n\t\t\t\t<a name="' + num + '"></a>\n\t\t\t\t<span class="post-id">\n\t\t\t\t\t<a href="/' + brd + '" class="router-link-active">/' + brd + '/</a>\n\t\t\t\t\t' + (isOp ? '<span>\u2014 ' + this._json.thread.board.name + ' \u2014</span>' : '') + '\n\t\t\t\t\t<a href="/' + brd + '/' + (data.threadId + (isOp ? '' : '#' + num)) + '">#' + num + '</a>\n\t\t\t\t</span>\n\t\t\t\t<span class="pull-right">\n\t\t\t\t\t<span class="post-thread-options"></span>\n\t\t\t\t\t<span class="post-date">' + date + '</span>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class="post-body' + (data.attachments.length > 1 ? '' : ' post-inline-attachment') + '">\n\t\t\t\t' + filesHTML + '\n\t\t\t\t<div class="post-body-message">\n\t\t\t\t\t' + postParentEl + '\n\t\t\t\t\t<div> ' + (data.messageHtml || '') + '</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="post-footer"></div>\n\t\t</div></div>';
			}
		}]);

		return _0chanPostsBuilder;
	}();


	var RefMap = function () {
		function RefMap(post) {
			_classCallCheck(this, RefMap);

			this.hasMap = false;
			this._isHidden = false;
			this._isInited = false;
			this._post = post;
			this._set = new Set();
		}

		_createClass(RefMap, [{
			key: 'addRefNum',
			value: function addRefNum(post, num) {
				var isHidden = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (isHidden === null) {
					var strNums = Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
					isHidden = strNums ? strNums.has(+num) : false;
				}
				if (!this._set.has(num)) {
					this._set.add(num);
					this._el.insertAdjacentHTML('beforeend', this._getHTML(num, '', isHidden));
					if (Cfg.hideRefPsts && this._post.isHidden) {
						post.setVisib(true, 'reference to >>' + num);
						post.ref.hideRef();
					}
				}
			}
		}, {
			key: 'getElByNum',
			value: function getElByNum(num) {
				return $q('a[href$="' + num + '"]', this._el);
			}
		}, {
			key: 'has',
			value: function has(num) {
				return this._set.has(num);
			}
		}, {
			key: 'hideRef',
			value: function hideRef() {
				var isForced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (!isForced && !Cfg.hideRefPsts || !this.hasMap || this._isHidden) {
					return;
				}
				this._isHidden = true;
				var _iteratorNormalCompletion31 = true;
				var _didIteratorError31 = false;
				var _iteratorError31 = undefined;

				try {
					for (var _iterator31 = this._set[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
						var num = _step31.value;

						var post = pByNum.get(num);
						if (post && !post.isHidden) {
							if (isForced) {
								post.setUserVisib(true, true, 'reference to >>' + this._post.num);
								post.ref.hideRef(true);
							} else if (!post.userToggled) {
								post.setVisib(true, 'reference to >>' + this._post.num);
								post.ref.hideRef();
							}
						}
					}
				} catch (err) {
					_didIteratorError31 = true;
					_iteratorError31 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion31 && _iterator31.return) {
							_iterator31.return();
						}
					} finally {
						if (_didIteratorError31) {
							throw _iteratorError31;
						}
					}
				}
			}
		}, {
			key: 'initPostRef',
			value: function initPostRef(tUrl, strNums) {
				var html = '';
				var _iteratorNormalCompletion32 = true;
				var _didIteratorError32 = false;
				var _iteratorError32 = undefined;

				try {
					for (var _iterator32 = this._set[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
						var num = _step32.value;

						html += this._getHTML(num, tUrl, strNums && strNums.has(num));
					}
				} catch (err) {
					_didIteratorError32 = true;
					_iteratorError32 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion32 && _iterator32.return) {
							_iterator32.return();
						}
					} finally {
						if (_didIteratorError32) {
							throw _iteratorError32;
						}
					}
				}

				this._createEl(html, false);
				this._isInited = true;
			}
		}, {
			key: 'makeUnion',
			value: function makeUnion(oRef) {
				this._set = new Set([].concat(_toConsumableArray(this._set), _toConsumableArray(oRef._set)).sort(function (a, b) {
					return a - b;
				}));
			}
		}, {
			key: 'removeLink',
			value: function removeLink(num) {
				this._set.delete(num);
				if (!this._set.size) {
					this.removeMap();
				} else {
					var el = this.getElByNum(num);
					if (el) {
						$del(el.nextSibling);
						$del(el);
					}
				}
			}
		}, {
			key: 'removeMap',
			value: function removeMap() {
				this._set = new Set();
				$del(this._el);
				delete this._el;
				this.hasMap = false;
			}
		}, {
			key: 'toggleRef',
			value: function toggleRef(isHide, isForced) {
				if (isHide) {
					this.hideRef(isForced);
				} else {
					this.unhideRef(isForced);
				}
			}
		}, {
			key: 'unhideRef',
			value: function unhideRef() {
				var isForced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (this._isHidden && !this.hasMap) {
					return;
				}
				this._isHidden = false;
				var _iteratorNormalCompletion33 = true;
				var _didIteratorError33 = false;
				var _iteratorError33 = undefined;

				try {
					for (var _iterator33 = this._set[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
						var num = _step33.value;

						var post = pByNum.get(num);
						if (post && post.isHidden && !post.spellHidden) {
							if (isForced) {
								post.setUserVisib(false);
								post.ref.unhideRef(true);
							} else if (!post.userToggled) {
								post.setVisib(false);
								post.ref.unhideRef();
							}
						}
					}
				} catch (err) {
					_didIteratorError33 = true;
					_iteratorError33 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion33 && _iterator33.return) {
							_iterator33.return();
						}
					} finally {
						if (_didIteratorError33) {
							throw _iteratorError33;
						}
					}
				}
			}
		}, {
			key: '_createEl',
			value: function _createEl(innerHTML, isHidden) {
				var el = void 0;
				var msg = this._post.msg;

				var html = '<div class="de-refmap' + (isHidden ? ' de-post-hiddencontent' : '') + '">' + innerHTML + '</div>';
				if (aib.dobr && (el = msg.nextElementSibling)) {
					el.insertAdjacentHTML('beforeend', html);
				} else {
					msg.insertAdjacentHTML('afterend', html);
				}
			}
		}, {
			key: '_getHTML',
			value: function _getHTML(num, tUrl, isHidden) {
				return '<a href="' + tUrl + aib.anchor + num + '" class="de-link-ref' + (isHidden ? ' de-link-hid' : '') + (MyPosts.has(num) ? ' de-ref-my' : '') + '">&gt;&gt;' + num + '</a><span class="de-refcomma">, </span>';
			}
		}, {
			key: '_el',
			get: function get() {
				var value = $q('.de-refmap', this._post.el);
				if (!value) {
					this._createEl('', this._post.isHidden);
					value = $q('.de-refmap', this._post.el);
				}
				Object.defineProperty(this, '_el', { value: value, configurable: true });
				return value;
			}
		}], [{
			key: 'gen',
			value: function gen(posts, thrURL) {
				var tNums = DelForm.tNums;
				var _iteratorNormalCompletion34 = true;
				var _didIteratorError34 = false;
				var _iteratorError34 = undefined;

				try {
					for (var _iterator34 = posts[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
						var _ref62 = _step34.value;

						var _ref63 = _slicedToArray(_ref62, 2);

						var pNum = _ref63[0];
						var post = _ref63[1];

						var links = $Q('a', post.msg);
						for (var lNum, i = 0, len = links.length; i < len; ++i) {
							var link = links[i];
							var tc = link.textContent;
							if (tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
								continue;
							}
							if (MyPosts.has(lNum)) {
								link.classList.add('de-ref-my');
								post.el.classList.add('de-reply-post');
							}
							if (!posts.has(lNum)) {
								continue;
							}

							var _posts$get = posts.get(lNum),
							    ref = _posts$get.ref;

							if (ref._isInited) {
								ref.addRefNum(post, pNum);
							} else {
								ref._set.add(pNum);
								ref.hasMap = true;
							}
							if (!aib.hasOPNum && tNums.has(lNum)) {
								link.classList.add('de-ref-op');
							}
							if (thrURL) {
								var _url4 = link.getAttribute('href');
								if (_url4[0] === '#') {
									link.setAttribute('href', thrURL + _url4);
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError34 = true;
					_iteratorError34 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion34 && _iterator34.return) {
							_iterator34.return();
						}
					} finally {
						if (_didIteratorError34) {
							throw _iteratorError34;
						}
					}
				}
			}
		}, {
			key: 'initRefMap',
			value: function initRefMap(form) {
				var post = form.firstThr && form.firstThr.op;
				if (post && Cfg.linksNavig) {
					this.gen(pByNum, '');
					var strNums = Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
					for (; post; post = post.next) {
						if (post.ref.hasMap) {
							post.ref.initPostRef('', strNums);
						}
					}
				}
			}
		}, {
			key: 'updateRefMap',
			value: function updateRefMap(post, isAdd) {
				var pNum = post.num;
				var strNums = isAdd && Cfg.strikeHidd && Post.hiddenNums.size ? Post.hiddenNums : null;
				var links = $Q('a', post.msg);
				for (var lNum, i = 0, len = links.length; i < len; ++i) {
					var link = links[i];
					var tc = link.textContent;
					if (tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
						continue;
					}
					if (isAdd && MyPosts.has(lNum)) {
						link.classList.add('de-ref-my');
						post.el.classList.add('de-reply-post');
						updater.refToYou();
					}
					if (!pByNum.has(lNum)) {
						continue;
					}
					var lPost = pByNum.get(lNum);
					if (!aib.t) {
						link.href = '#' + (aib.fch ? 'p' : '') + lNum;
					}
					if (!isAdd) {
						lPost.ref.removeLink(pNum);
						return;
					}
					if (strNums && strNums.has(lNum)) {
						link.classList.add('de-link-hid');
					}
					if (!aib.hasOPNum && DelForm.tNums.has(lNum)) {
						link.classList.add('de-ref-op');
					}
					lPost.ref.addRefNum(post, pNum, strNums && strNums.has(pNum));
				}
			}
		}]);

		return RefMap;
	}();


	var Thread = function () {
		function Thread(el, num, prev, form) {
			_classCallCheck(this, Thread);

			this.hasNew = false;
			this.hidCounter = 0;
			this.isFav = false;
			this.isHidden = false;
			this.loadCount = 0;
			this.next = null;
			this.num = num;
			this.thrId = aib.thrId ? aib.thrId(el) : num;
			var els = $Q(aib.qRPost, el);
			var len = els.length;
			var omt = aib.t ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
			this.pcount = omt + len;
			this.el = el;
			this.prev = prev;
			this.form = form;
			this._lastModified = '';
			if (prev) {
				prev.next = this;
			}
			var lastPost = this.op = new Post(aib.getOp(el), this, num, 0, true, prev ? prev.last : null);
			pByEl.set(el, lastPost);
			for (var i = 0; i < len; ++i) {
				var pEl = els[i];
				lastPost = new Post(pEl, this, aib.getPNum(pEl), omt + i, false, lastPost);
			}
			this.last = lastPost;
			el.setAttribute('de-thread', null);
			visPosts = Math.max(visPosts, len);
			if (localData) {
				return;
			}
			this.btns = $aEnd(el, '<div class="de-thr-buttons">' + Post.getPostBtns(true, true) + '\n\t\t\t<span class="de-thr-updater">[<a class="de-thr-updater-link de-abtn" href="#"></a>' + (!aib.t ? ']</span>' : '<span id="de-updater-count" style="display: none;"></span>]</span>' + (aib.mak ? ' [<a class="de-abtn" href="#" onclick="UnbanShow();">Реквест разбана</a>]' : '')) + '</div>');
			this.btns.addEventListener('click', this);
			this.btns.addEventListener('mouseover', this);

			var _ref64 = [].concat(_toConsumableArray(this.btns.children));

			this.btnHide = _ref64[0];
			this.btnFav = _ref64[2];
			this.btnUpd = _ref64[3];

			if (!aib.t && Cfg.hideReplies) {
				this.btnReplies = $bEnd(this.btns, ' <span class="de-btn-replies">[<a class="de-abtn" href="#"></a>]</span>');
				this._toggleReplies();
			}
		}

		_createClass(Thread, [{
			key: 'deletePosts',
			value: function deletePosts(post, delAll, isRemovePost) {
				SpellsRunner.cachedData = null;
				var count = 0;
				do {
					if (isRemovePost && this.last === post) {
						this.last = post.prev;
					}
					post.deletePost(isRemovePost);
					post = post.nextNotDeleted;
					count++;
				} while (delAll && post);
				for (var tPost = post; tPost; tPost = tPost.nextInThread) {
					if (!tPost.isDeleted) {
						tPost.count -= count;
						tPost.counterEl.textContent = tPost.count + 1;
					}
				}
				this.pcount -= count;
				return post;
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				$pd(e);
				var el = fixEventEl(e.target);
				var elClass = el.classList[0];
				var nextThr = this.next;
				var oldCoord = false;
				if (e.type === 'click') {
					switch (elClass) {
						case 'de-btn-fav':
							this.toggleFavState(true);break;
						case 'de-btn-fav-sel':
							this.toggleFavState(false);break;
						case 'de-btn-hide':
						case 'de-btn-hide-user':
						case 'de-btn-unhide-user':
							oldCoord = nextThr && nextThr.top;
							this.op.setUserVisib(!this.isHidden);
							break;
						case 'de-btn-rep':
							pr.showQuickReply(this.last, this.num, false, false, true);break;
						case 'de-btn-replies':
						case 'de-replies-show':
						case 'de-replies-hide':
							oldCoord = !nextThr || this.last.isOmitted ? null : nextThr.top;
							this._toggleReplies();
							break;
						case 'de-thr-collapse':
						case 'de-thr-collapse-link':
							this.loadPosts(visPosts, true);break;
						case 'de-thr-updater':
						case 'de-thr-updater-link':
							if (aib.t) {
								updater.forceLoad();
							} else {
								this.loadPosts('new');
							}
					}
					if (oldCoord) {
						scrollTo(window.pageXOffset, window.pageYOffset + nextThr.top - oldCoord);
					}
				} else if (e.type === 'mouseover') {
					switch (el.classList[0]) {
						case 'de-btn-rep':
							this.btns.title = Lng.replyToThr[lang];
							quotetxt = window.getSelection().toString();
							return;
						case 'de-btn-hide':
						case 'de-btn-hide-user':
						case 'de-btn-unhide':
						case 'de-btn-unhide-user':
							this.btns.title = Lng.toggleThr[lang];return;
						case 'de-btn-fav':
							this.btns.title = Lng.addFav[lang];return;
						case 'de-btn-fav-sel':
							this.btns.title = Lng.delFav[lang];return;
						default:
							this.btns.removeAttribute('title');
					}
				}
			}

		}, {
			key: 'loadPosts',
			value: function loadPosts(task) {
				var _this62 = this;

				var isSmartScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var isInformUser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				if (isInformUser) {
					$popup('load-thr', Lng.loading[lang], true);
				}
				return ajaxPostsLoad(aib.b, this.thrId, false).then(function (pBuilder) {
					return _this62._loadFromBuilder(task, isSmartScroll, pBuilder);
				}, function (err) {
					return $popup('load-thr', getErrorMessage(err));
				});
			}

		}, {
			key: 'loadNewPosts',
			value: function loadNewPosts() {
				var _this63 = this;

				return ajaxPostsLoad(aib.b, this.thrId, true).then(function (pBuilder) {
					return pBuilder ? _this63._loadNewFromBuilder(pBuilder) : { newCount: 0, locked: false };
				});
			}
		}, {
			key: 'toggleFavState',
			value: function toggleFavState(isEnable) {
				var preview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				var h = void 0,
				    b = void 0,
				    num = void 0,
				    cnt = void 0,
				    txt = void 0,
				    last = void 0;
				if (preview) {
					preview.toggleFavBtn(isEnable);
				}
				if (!preview || preview.num === this.num) {
					this.op.toggleFavBtn(isEnable);
					this.isFav = isEnable;
					var _aib = aib;
					h = _aib.host;
					b = _aib.b;

					num = this.thrId;
					cnt = this.pcount;
					txt = this.op.title;
					last = aib.anchor + this.last.num;
				} else {
					h = aib.host;
					b = preview.brd;
					num = preview.num;

					cnt = preview.remoteThr.pcount;
					txt = preview.remoteThr.title;
					last = aib.anchor + preview.remoteThr.lastNum;
				}
				readFavorites().then(function (favObj) {
					if (isEnable) {
						var f = favObj[h] || (favObj[h] = {});
						f = f[b] || (f[b] = {});
						f.url = aib.prot + '//' + aib.host + aib.getPageUrl(b, 0);
						f[num] = { cnt: cnt, new: 0, you: 0, txt: txt, url: aib.getThrUrl(b, num), last: last };
					} else {
						removeFavEntry(favObj, h, b, num);
					}
					sendStorageEvent('__de-favorites', [h, b, num, favObj, isEnable ? 'add' : 'delete']);
					saveRenewFavorites(favObj);
				});
			}
		}, {
			key: 'updateHidden',
			value: function updateHidden(data) {
				var thr = this;
				do {
					var realHid = data ? data.hasOwnProperty(thr.num) : false;
					if (thr.isHidden ^ realHid) {
						if (realHid) {
							thr.op.setUserVisib(true, false);
							data[thr.num] = thr.op.title;
						} else if (thr.isHidden) {
							thr.op.setUserVisib(false, false);
						}
					}
				} while (thr = thr.next);
			}
		}, {
			key: '_addPost',
			value: function _addPost(parent, el, i, prev, maybeVParser) {
				var num = aib.getPNum(el);
				var wrap = doc.adoptNode(aib.getPostWrap(el, false));
				var post = new Post(el, this, num, i, false, prev);
				parent.appendChild(wrap);
				if (aib.t && !doc.hidden && Cfg.animation) {
					$animate(post.el, 'de-post-new');
				}
				if (this.userTouched.has(num)) {
					post.setUserVisib(this.userTouched.get(num), false);
					this.userTouched.delete(num);
				}
				if (maybeVParser.value) {
					maybeVParser.value.parse(post);
				}
				processImgInfoLinks(el);
				post.addFuncs();
				ContentLoader.preloadImages(post);
				if (aib.t && Cfg.markNewPosts) {
					Post.addMark(el, false);
				}
				return post;
			}
		}, {
			key: '_checkBans',
			value: function _checkBans(pBuilder) {
				if (!aib.qBan) {
					return;
				}
				var _iteratorNormalCompletion35 = true;
				var _didIteratorError35 = false;
				var _iteratorError35 = undefined;

				try {
					for (var _iterator35 = pBuilder.bannedPostsData()[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
						var _ref65 = _step35.value;

						var _ref66 = _slicedToArray(_ref65, 3);

						var banId = _ref66[0];
						var bNum = _ref66[1];
						var bEl = _ref66[2];

						var post = bNum ? pByNum.get(bNum) : this.op;
						if (post && post.banned !== banId) {
							$del($q(aib.qBan, post.el));
							post.msg.appendChild(bEl);
							post.banned = banId;
						}
					}
				} catch (err) {
					_didIteratorError35 = true;
					_iteratorError35 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion35 && _iterator35.return) {
							_iterator35.return();
						}
					} finally {
						if (_didIteratorError35) {
							throw _iteratorError35;
						}
					}
				}
			}
		}, {
			key: '_importPosts',
			value: function _importPosts(last, pBuilder, begin, end, maybeVParser, maybeSpells) {
				var nums = [];
				var newCount = end - begin;
				var newVisCount = newCount;
				var fragm = void 0;
				if (aib.JsonBuilder && nav.hasTemplate) {
					var html = [];
					for (var i = begin; i < end; ++i) {
						html.push(pBuilder.getPostHTML(i));
						nums.push(pBuilder.getPNum(i));
					}
					var temp = doc.createElement('template');
					temp.innerHTML = aib.fixHTML(html.join(''));
					fragm = temp.content;
					var _posts = $Q(aib.qRPost, fragm);
					for (var _i10 = 0, _len7 = _posts.length; _i10 < _len7; ++_i10) {
						last = this._addPost(fragm, _posts[_i10], begin + _i10 + 1, last, maybeVParser);
						newVisCount -= maybeSpells.value.runSpells(last);
						embedPostMsgImages(last.el);
					}
				} else {
					fragm = doc.createDocumentFragment();
					for (; begin < end; ++begin) {
						last = this._addPost(fragm, pBuilder.getPostEl(begin), begin + 1, last, maybeVParser);
						nums.push(last.num);
						newVisCount -= maybeSpells.value.runSpells(last);
						embedPostMsgImages(last.el);
					}
				}
				return [newCount, newVisCount, fragm, last, nums];
			}
		}, {
			key: '_loadFromBuilder',
			value: function _loadFromBuilder(last, smartScroll, pBuilder) {
				var nextCoord = void 0;
				var maybeSpells = new Maybe(SpellsRunner);
				if (smartScroll) {
					if (this.next) {
						nextCoord = this.next.top;
					} else {
						smartScroll = false;
					}
				}
				pr.closeReply();
				var op = this.op,
				    thrEl = this.el;

				$del($q(aib.qOmitted + ', .de-omitted', thrEl));
				if (this.loadCount === 0) {
					if (op.trunc) {
						op.updateMsg(pBuilder.getOpMessage(), maybeSpells.value);
					}
					op.ref.removeMap();
				}
				this.loadCount++;
				this._parsePosts(pBuilder);
				var needToHide = void 0,
				    needToOmit = void 0,
				    needToShow = void 0;
				var post = op.next;
				var needRMUpdate = false;
				var existed = this.pcount === 1 ? 0 : this.pcount - post.count;
				switch (last) {
					case 'new':
						needToHide = $Q('.de-hidden', thrEl).length;
						needToOmit = needToHide + post.count - 1;
						needToShow = pBuilder.length - needToOmit;
						break;
					case 'all':
						needToHide = needToOmit = 0;
						needToShow = pBuilder.length;
						break;
					case 'more':
						needToHide = $Q('.de-hidden', thrEl).length - 10;
						needToOmit = Math.max(needToHide + post.count - 1, 0);
						needToHide = Math.max(needToHide, 0);
						needToShow = pBuilder.length - needToOmit;
						break;
					default:
						needToHide = Math.max(existed - last, 0);
						needToOmit = Math.max(pBuilder.length - last, 0);
						needToShow = last;
				}
				if (needToHide) {
					while (existed-- !== needToShow) {
						post.wrap.classList.add('de-hidden');
						post.isOmitted = true;
						post = post.next;
					}
				} else {
					var nonExisted = pBuilder.length - existed;
					var maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);

					var _importPosts2 = this._importPosts(op, pBuilder, Math.max(0, nonExisted + existed - needToShow), nonExisted, maybeVParser, maybeSpells),
					    _importPosts3 = _slicedToArray(_importPosts2, 5),
					    fragm = _importPosts3[2],
					    _last = _importPosts3[3],
					    nums = _importPosts3[4];

					if (maybeVParser.hasValue) {
						maybeVParser.value.endParser();
					}
					$after(op.wrap, fragm);
					DollchanAPI.notify('newpost', nums);
					_last.next = post;
					if (post) {
						post.prev = _last;
					}
					needRMUpdate = true;
					needToShow = Math.min(nonExisted + existed, needToShow);
				}
				while (existed-- !== 0) {
					if (post.trunc) {
						var newMsg = doc.adoptNode($q(aib.qPostMsg, pBuilder.getPostEl(post.count - 1)));
						post.updateMsg(aib.fixHTML(newMsg), maybeSpells.value);
					}
					if (post.isOmitted) {
						post.wrap.classList.remove('de-hidden');
						post.isOmitted = false;
					}
					if (needRMUpdate) {
						RefMap.updateRefMap(post, true);
					}
					post = post.next;
				}
				if (maybeSpells.hasValue) {
					maybeSpells.value.endSpells();
				}
				var btns = this.btns;

				if (btns !== thrEl.lastChild) {
					thrEl.appendChild(btns);
				}
				if (!$q('.de-thr-collapse', btns)) {
					$bEnd(btns, '<span class="de-thr-collapse"> [<a class="de-thr-collapse-link de-abtn" href="' + aib.getThrUrl(aib.b, this.thrId) + '"></a>]</span>');
				}
				if (needToShow > visPosts) {
					thrNavPanel.addThr(this);
					btns.lastChild.style.display = 'initial';
				} else {
					thrNavPanel.removeThr(this);
					$hide(btns.lastChild);
				}
				if (needToOmit > 0) {
					op.el.insertAdjacentHTML('afterend', '<div class="de-omitted">' + needToOmit + '</div>');
				}
				if (smartScroll) {
					scrollTo(window.pageXOffset, window.pageYOffset + this.next.top - nextCoord);
				}
				Pview.updatePosition(false);
				if (Cfg.hideReplies) {
					this.btnReplies.firstElementChild.className = 'de-replies-hide de-abtn';
					if (Cfg.updThrBtns) {
						$show(this.btnUpd);
					}
				}
				closePopup('load-thr');
			}
		}, {
			key: '_loadNewFromBuilder',
			value: function _loadNewFromBuilder(pBuilder) {
				var lastOffset = pr.isVisible ? pr.top : null;

				var _parsePosts2 = this._parsePosts(pBuilder),
				    _parsePosts3 = _slicedToArray(_parsePosts2, 2),
				    newPosts = _parsePosts3[0],
				    newVisPosts = _parsePosts3[1];

				if (lastOffset !== null) {
					scrollTo(window.pageXOffset, window.pageYOffset + pr.top - lastOffset);
				}
				if (newPosts !== 0 || Panel.isNew) {
					Panel.updateCounter(pBuilder.length + 1 - this.hidCounter, $Q(aib.qPostImg, this.el).length, pBuilder.postersCount);
					Pview.updatePosition(true);
				}
				if (pBuilder.isClosed) {
					AjaxCache.clearCache();
				}
				return { newCount: newVisPosts, locked: pBuilder.isClosed };
			}
		}, {
			key: '_parsePosts',
			value: function _parsePosts(pBuilder) {
				this._checkBans(pBuilder);
				var newPosts = 0;
				var newVisPosts = 0;
				var post = this.lastNotDeleted;
				var len = pBuilder.length;
				var maybeSpells = new Maybe(SpellsRunner);
				var maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
				var _post4 = post,
				    count = _post4.count;

				if (count !== 0 && (aib.dobr || count > len || pBuilder.getPNum(count - 1) !== post.num)) {
					post = this.op.nextNotDeleted;
					var i = post.count - 1;
					var firstChangedPost = null;
					for (; i < len && post;) {
						var _post5 = post,
						    num = _post5.num,
						    prev = _post5.prev;

						var iNum = pBuilder.getPNum(i);
						if (num === iNum) {
							i++;
							post = post.nextNotDeleted;
							continue;
						}
						if (num <= iNum) {
							if (!firstChangedPost) {
								firstChangedPost = post;
							}
							post = this.deletePosts(post, false, !aib.t);
							continue;
						}
						if (!firstChangedPost) {
							firstChangedPost = prev;
						}
						var cnt = 0;
						do {
							cnt++;
							i++;
						} while (pBuilder.getPNum(i) < num);
						var res = this._importPosts(prev, pBuilder, i - cnt, i, maybeVParser, maybeSpells);
						newPosts += res[0];
						this.pcount += res[0];
						newVisPosts += res[1];
						$after(prev.wrap, res[2]);
						res[3].next = post;
						post.prev = res[3];
						DollchanAPI.notify('newpost', res[4]);
						for (var temp = post; temp; temp = temp.nextInThread) {
							temp.count += cnt;
						}
					}
					if (i === len && post) {
						this.deletePosts(post, true, !aib.t);
					}
					if (firstChangedPost && maybeSpells.hasValue && maybeSpells.value.hasNumSpell) {
						for (post = firstChangedPost.nextInThread; post; post = post.nextInThread) {
							maybeSpells.value.runSpells(post);
						}
					}
					if (newPosts !== 0) {
						for (post = firstChangedPost; post; post = post.nextInThread) {
							RefMap.updateRefMap(post, true);
						}
					}
				}
				if (len + 1 > this.pcount) {
					var _res = this._importPosts(this.last, pBuilder, this.lastNotDeleted.count, len, maybeVParser, maybeSpells);
					newPosts += _res[0];
					newVisPosts += _res[1];
					this.el.appendChild(_res[2]);
					this.last = _res[3];
					DollchanAPI.notify('newpost', _res[4]);
					this.pcount = len + 1;
				}
				updateFavorites(this.op.num, [this.pcount, this.last.num], 'update');
				if (maybeVParser.hasValue) {
					maybeVParser.value.endParser();
				}
				if (maybeSpells.hasValue) {
					maybeSpells.value.endSpells();
				}
				return [newPosts, newVisPosts];
			}
		}, {
			key: '_toggleReplies',
			value: function _toggleReplies() {
				var _this64 = this;

				var isHide = !this.last.isOmitted;
				var post = this.op;
				var i = 0;
				for (; post !== this.last; ++i) {
					(post = post.next).isOmitted = isHide;
					post.wrap.classList.toggle('de-hidden', isHide);
				}
				this.btnReplies.firstElementChild.className = (isHide ? 'de-replies-show' : 'de-replies-hide') + ' de-abtn';
				$each(this.btns.children, function (el) {
					return el !== _this64.btnReplies && $toggle(el, !isHide);
				});
				$del($q(aib.qOmitted + ', .de-omitted', this.el));
				i = this.pcount - 1 - (isHide ? 0 : i);
				if (i) {
					this.op.el.insertAdjacentHTML('afterend', '<span class="de-omitted">' + i + '</span> ');
				}
			}
		}, {
			key: 'bottom',
			get: function get() {
				return this.isHidden ? this.op.bottom : this.last.bottom;
			}
		}, {
			key: 'lastNotDeleted',
			get: function get() {
				var post = this.last;
				while (post.isDeleted) {
					post = post.prev;
				}
				return post;
			}
		}, {
			key: 'nextNotHidden',
			get: function get() {
				var thr = void 0;
				for (thr = this.next; thr && thr.isHidden; thr = thr.next) {}
				return thr;
			}
		}, {
			key: 'prevNotHidden',
			get: function get() {
				var thr = void 0;
				for (thr = this.prev; thr && thr.isHidden; thr = thr.prev) {}
				return thr;
			}
		}, {
			key: 'top',
			get: function get() {
				return this.op.top;
			}
		}, {
			key: 'userTouched',
			get: function get() {
				var value = new Map();
				Object.defineProperty(this, 'userTouched', { value: value });
				return value;
			}
		}], [{
			key: 'removeSavedData',
			value: function removeSavedData() {
			}
		}, {
			key: 'first',
			get: function get() {
				return DelForm.first.firstThr;
			}
		}, {
			key: 'last',
			get: function get() {
				return DelForm.last.lastThr;
			}
		}]);

		return Thread;
	}();

	var thrNavPanel = {
		addThr: function addThr(thr) {
			this._thrs.add(thr.el);
			if (this._thrs.size === 1) {
				doc.defaultView.addEventListener('scroll', this);
			}
			if (!this._visible) {
				this._checkThreads();
			}
		},
		handleEvent: function handleEvent(e) {
			var _this65 = this;

			switch (e.type) {
				case 'scroll':
					window.requestAnimationFrame(function () {
						return _this65._checkThreads();
					});break;
				case 'mouseover':
					this._expandCollapse(true, fixEventEl(e.relatedTarget));break;
				case 'mouseout':
					this._expandCollapse(false, fixEventEl(e.relatedTarget));break;
				case 'click':
					this._handleClick(e);break;
			}
		},
		initThrNav: function initThrNav() {
			var el = $bEnd(docBody, '\n\t\t<div id="de-thr-navpanel" class="de-thr-navpanel-hidden" style="display: none;">\n\t\t\t<svg id="de-thr-navarrow"><use xlink:href="#de-symbol-thr-nav-arrow"/></svg>\n\t\t\t<div id="de-thr-navup">\n\t\t\t\t<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-thr-nav-up"/></svg>\n\t\t\t</div>\n\t\t\t<div id="de-thr-navdown">\n\t\t\t\t<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-thr-nav-down"/></svg>\n\t\t\t</div>\n\t\t</div>');
			el.addEventListener('mouseover', this, true);
			el.addEventListener('mouseout', this, true);
			el.addEventListener('click', this, true);
			this._el = el;
			this._thrs = new Set();
		},
		removeThr: function removeThr(thr) {
			this._thrs.delete(thr.el);
			if (!this._thrs.size) {
				$hide(this._el);
				this._currentThr = null;
				this._visible = false;
				doc.defaultView.removeEventListener('scroll', this);
			}
		},


		_currentThr: null,
		_el: null,
		_toggleTO: 0,
		_thrs: null,
		_visible: false,
		_checkThreads: function _checkThreads() {
			var el = this._findCurrentThread();
			if (el) {
				if (!this._visible) {
					this._toggleNavPanel(false);
				}
				this._currentThr = el;
			} else if (this._visible) {
				this._toggleNavPanel(true);
			}
		},
		_expandCollapse: function _expandCollapse(isExpand, rt) {
			var _this66 = this;

			if (!rt || !this._el.contains(rt.farthestViewportElement || rt)) {
				clearTimeout(this._toggleTO);
				this._toggleTO = setTimeout(function () {
					return _this66._el.classList.toggle('de-thr-navpanel-hidden', !isExpand);
				}, Cfg.linksOver);
			}
		},
		_findCurrentThread: function _findCurrentThread() {
			var _this67 = this;

			Object.defineProperty(this, '_findCurrentThread', {
				value: 'elementsFromPoint' in doc ? function () {
					return doc.elementsFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2).find(function (el) {
						return _this67._thrs.has(el);
					});
				} : function () {
					var el = doc.elementFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2);
					while (el) {
						if (_this67._thrs.has(el)) {
							return el;
						}
						el = el.parentElement;
					}
					return undefined;
				}
			});
			return this._findCurrentThread();
		},
		_handleClick: function _handleClick(e) {
			var el = fixEventEl(e.target);
			if (el.tagName.toLowerCase() === 'svg') {
				el = el.parentNode;
			}
			switch (el.id) {
				case 'de-thr-navup':
					scrollTo(window.pageXOffset, window.pageYOffset + this._currentThr.getBoundingClientRect().top - 50);
					break;
				case 'de-thr-navdown':
					scrollTo(window.pageXOffset, window.pageYOffset + this._currentThr.getBoundingClientRect().bottom - Post.sizing.wHeight + 50);
					break;
			}
		},
		_toggleNavPanel: function _toggleNavPanel(isHide) {
			this._el.style.display = isHide ? 'none' : 'initial';
			this._visible = isHide;
		}
	};


	function initThreadUpdater(title, enableUpdate) {
		var focusLoadTime = void 0,
		    disabledByUser = true;
		var enabled = false;
		var hasYouRefs = false;
		var lastECode = 200;
		var newPosts = 0;
		var paused = false;
		var sendError = false;
		var storageName = 'de-lastpcount-' + aib.b + '-' + aib.t;

		var audio = {
			enabled: false,
			repeatMS: 0,
			disableAudio: function disableAudio() {
				this.stopAudio();
				this.enabled = false;
				var btn = $id('de-panel-audio-on');
				if (btn) {
					btn.id = 'de-panel-audio-off';
				}
			},
			playAudio: function playAudio() {
				var _this68 = this;

				this.stopAudio();
				if (this.repeatMS === 0) {
					this._el.play();
					return;
				}
				this._playInterval = setInterval(function () {
					return _this68._el.play();
				}, this.repeatMS);
			},
			stopAudio: function stopAudio() {
				if (this._playInterval) {
					clearInterval(this._playInterval);
					this._playInterval = null;
				}
			},


			get _el() {
				var value = doc.createElement('audio');
				value.setAttribute('preload', 'auto');
				value.src = gitRaw + 'signal.ogg';
				Object.defineProperty(this, '_el', { value: value });
				return value;
			}
		};

		var counter = {
			count: function count(delayMS, useCounter, callback) {
				var _this69 = this;

				if (!this._enabled || !useCounter) {
					this._countingTO = setTimeout(function () {
						_this69._countingTO = null;
						callback();
					}, delayMS);
					return;
				}
				var seconds = delayMS / 1e3;
				this._set(seconds);
				this._countingIV = setInterval(function () {
					seconds--;
					if (seconds === 0) {
						_this69._stopCounter();
						callback();
					} else {
						_this69._set(seconds);
					}
				}, 1e3);
			},
			disableCounter: function disableCounter() {
				this._enabled = false;
				this._stopCounter();
				$hide(this._el);
			},
			enableCounter: function enableCounter() {
				this._enabled = true;
				$show(this._el);
			},
			setWait: function setWait() {
				this._stopCounter();
				if (this._enabled) {
					this._el.innerHTML = '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>';
				}
			},


			_countingTO: null,
			_countingIV: null,
			_enabled: false,
			get _el() {
				var value = $id('de-updater-count');
				Object.defineProperty(this, '_el', { value: value });
				return value;
			},
			_set: function _set(seconds) {
				this._el.innerHTML = seconds;
			},
			_stopCounter: function _stopCounter() {
				if (this._countingIV) {
					clearInterval(this._countingIV);
					this._countingIV = null;
				}
				if (this._countingTO) {
					clearTimeout(this._countingTO);
					this._countingTO = null;
				}
			}
		};

		var favicon = {
			get canBlink() {
				return Cfg.favIcoBlink && !!this.originalIcon;
			},
			get originalIcon() {
				return this._iconEl ? this._iconEl.href : null;
			},
			initIcons: function initIcons() {
				var _this70 = this;

				if (this._isInited) {
					return;
				}
				this._isInited = true;
				var icon = new Image();
				icon.onload = function (e) {
					try {
						_this70._initIconsHelper(e.target);
					} catch (err) {
						console.warn('Icon error:', err);
					}
				};
				if (aib.fch) {
					$ajax(this._iconEl.href, { responseType: 'blob' }, false).then(function (xhr) {
						icon.src = 'response' in xhr ? window.URL.createObjectURL(xhr.response) : '/favicon.ico';
					}, emptyFn);
					return;
				}
				icon.src = this._iconEl.href;
			},
			startBlink: function startBlink(isError) {
				var _this71 = this;

				var iconUrl = !this._hasIcons ? this._emptyIcon : isError ? this._iconError : hasYouRefs ? this._iconYou : this._iconNew;
				if (this._blinkInterv) {
					if (this._currentIcon === iconUrl) {
						return;
					}
					clearInterval(this._blinkInterv);
				}
				this._currentIcon = iconUrl;
				this._blinkInterv = setInterval(function () {
					return _this71._setIcon((_this71._isOrigIcon = !_this71._isOrigIcon) ? _this71.originalIcon : _this71._currentIcon);
				}, this._blinkMS);
			},
			stopBlink: function stopBlink() {
				if (this._blinkInterv) {
					clearInterval(this._blinkInterv);
					this._blinkInterv = null;
				}
				if (!this._isOrigIcon) {
					this._setIcon(this.originalIcon);
					this._isOrigIcon = true;
				}
			},
			updateIcon: function updateIcon(isError) {
				if (!isError && !newPosts) {
					this._setIcon(this.originalIcon);
				} else if (this._hasIcons) {
					this._setIcon(isError ? this._iconError : hasYouRefs ? this._iconYou : this._iconNew);
				}
			},


			_blinkInterv: null,
			_blinkMS: 800,
			_currentIcon: null,
			_emptyIcon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			_hasIcons: false,
			_iconError: null,
			_iconNew: null,
			_iconYou: null,
			_isInited: false,
			_isOrigIcon: true,
			get _iconEl() {
				var el = $q('link[rel="shortcut icon"]', doc.head) || $bEnd(doc.head, '<link href="/favicon.ico" rel="shortcut icon"/>');
				Object.defineProperties(this, {
					_iconEl: { value: el, writable: true },
					originalIcon: { value: el.href }
				});
				return el;
			},
			_drawLines: function _drawLines(ctx, line1, line2, color, width, scaleFactor) {
				ctx.beginPath();
				ctx.strokeStyle = color;
				ctx.lineWidth = width * scaleFactor;
				ctx.moveTo(line1[0] * scaleFactor, line1[1] * scaleFactor);
				ctx.lineTo(line1[2] * scaleFactor, line1[3] * scaleFactor);
				ctx.moveTo(line2[0] * scaleFactor, line2[1] * scaleFactor);
				ctx.lineTo(line2[2] * scaleFactor, line2[3] * scaleFactor);
				ctx.stroke();
			},
			_initIconsHelper: function _initIconsHelper(icon) {
				var canvas = doc.createElement('canvas');
				var ctx = canvas.getContext('2d');
				var wh = Math.max(icon.naturalHeight, 16 * (window.devicePixelRatio || 1));
				var scale = wh / 16;
				canvas.width = canvas.height = wh;
				ctx.drawImage(icon, 0, 0, wh, wh);
				var original = ctx.getImageData(0, 0, wh, wh);
				this._drawLines(ctx, [15, 15, 7, 7], [7, 15, 15, 7], '#780000', 3, scale);
				this._drawLines(ctx, [14.5, 14.5, 7.5, 7.5], [7.5, 14.5, 14.5, 7.5], '#fa2020', 1.5, scale);
				this._iconError = canvas.toDataURL('image/png');
				ctx.putImageData(original, 0, 0);
				this._drawLines(ctx, [6, 11, 16, 11], [11, 6, 11, 16], '#1c5f23', 4, scale);
				this._drawLines(ctx, [7, 11, 15, 11], [11, 7, 11, 15], '#00f51b', 2, scale);
				this._iconNew = canvas.toDataURL('image/png');
				ctx.putImageData(original, 0, 0);
				this._drawLines(ctx, [6, 11, 16, 11], [11, 6, 11, 16], '#122091', 4, scale);
				this._drawLines(ctx, [7, 11, 15, 11], [11, 7, 11, 15], '#1b6df5', 2, scale);
				this._iconYou = canvas.toDataURL('image/png');
				this._hasIcons = true;
			},
			_setIcon: function _setIcon(iconUrl) {
				$del(this._iconEl);
				this._iconEl = $aBegin(doc.head, '<link rel="shortcut icon" href="' + iconUrl + '">');
			}
		};

		var notification = {
			get canShow() {
				return Cfg.desktNotif && this._granted;
			},
			checkPermission: function checkPermission() {
				if (Cfg.desktNotif && 'permission' in Notification) {
					switch (Notification.permission.toLowerCase()) {
						case 'default':
							this._requestPermission();break;
						case 'denied':
							saveCfg('desktNotif', 0);
					}
				}
			},
			closeNotif: function closeNotif() {
				if (this._notifEl) {
					this._notifEl.close();
					this._notifEl = null;
				}
			},
			showNotif: function showNotif() {
				var _this72 = this;

				var new10 = newPosts % 10;
				var quantity = lang !== 0 ? +(newPosts !== 1) : new10 > 4 || new10 === 0 || (newPosts % 100 / 10 | 0) === 1 ? 2 : new10 === 1 ? 0 : 1;
				var post = Thread.first.last;
				var notif = new Notification(aib.dm + '/' + aib.b + '/' + aib.t + ': ' + newPosts + ' ' + Lng.newPost[lang][quantity] + '. ' + Lng.newPost[lang][3] + ':', {
					body: post.text.substring(0, 250).replace(/\s+/g, ' '),
					icon: post.images.firstAttach ? post.images.firstAttach.src : favicon.originalIcon,
					tag: aib.dm + aib.b + aib.t
				});
				notif.onshow = function () {
					return setTimeout(function () {
						return notif === _this72._notifEl && _this72.closeNotif();
					}, 12e3);
				};
				notif.onclick = function () {
					return window.focus();
				};
				notif.onerror = function () {
					window.focus();
					_this72._requestPermission();
				};
				this._notifEl = notif;
			},


			_closeTO: null,
			_granted: true,
			_notifEl: null,
			_requestPermission: function _requestPermission() {
				var _this73 = this;

				this._granted = false;
				Notification.requestPermission(function (state) {
					if (state.toLowerCase() === 'denied') {
						saveCfg('desktNotif', 0);
					} else {
						_this73._granted = true;
					}
				});
			}
		};

		var updMachine = {
			start: function start() {
				var needSleep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
				var loadOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (this._state !== -1) {
					this.stopUpdater(false);
				}
				this._state = 0;
				this._loadOnce = loadOnce;
				this._delay = this._initDelay = Cfg.updThrDelay * 1e3;
				if (!loadOnce) {
					this._setUpdateStatus('on');
				}
				this._makeStep(needSleep);
			},
			stopUpdater: function stopUpdater() {
				var updateStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				if (this._state !== -1) {
					this._state = -1;
					if (this._loadPromise) {
						this._loadPromise.cancelPromise();
						this._loadPromise = null;
					}
					counter.setWait();
					if (updateStatus) {
						this._setUpdateStatus('off');
					}
				}
			},


			_delay: 0,
			_initDelay: 0,
			_loadOnce: false,
			_loadPromise: null,
			_seconds: 0,
			_state: -1,
			get _panelButton() {
				var value = $q('a[id^="de-panel-upd"]');
				if (value) {
					Object.defineProperty(this, '_panelButton', { value: value });
				}
				return value;
			},
			_handleNewPosts: function _handleNewPosts(lPosts, err) {
				if (err instanceof CancelError) {
					return;
				}
				infoLoadErrors(err, false);
				var eCode = err instanceof AjaxError ? err.code : 0;
				if (eCode !== 200 && eCode !== 304) {
					if (doc.hidden && favicon.canBlink) {
						favicon.startBlink(true);
					}
					if (eCode === -1 || eCode === 404 && lastECode === 404) {
						Thread.removeSavedData(aib.b, aib.t);
						updateTitle(eCode);
						_disableUpdater();
					} else {
						this._setUpdateStatus('warn');
						if (!Cfg.noErrInTitle) {
							updateTitle(eCode);
						}
						this._makeStep();
					}
					lastECode = eCode;
					updateFavorites(aib.t, getErrorMessage(err), 'error');
					return;
				}
				if (lastECode !== 200) {
					favicon.stopBlink();
					this._setUpdateStatus('on');
					if (!Cfg.noErrInTitle) {
						updateTitle(eCode);
					}
				}
				lastECode = eCode;
				if (doc.hidden) {
					if (lPosts !== 0) {
						newPosts += lPosts;
						updateTitle();
						if (favicon.canBlink) {
							favicon.startBlink(false);
						}
						if (notification.canShow) {
							notification.showNotif();
						}
						if (audio.enabled) {
							audio.playAudio();
						}
						sesStorage[storageName] = Thread.first.pcount;
						this._delay = this._initDelay;
					} else if (this._delay !== 12e4) {
						this._delay = Math.min(this._delay + this._initDelay, 12e4);
					}
				}
				this._makeStep();
			},
			_makeStep: function _makeStep() {
				var _this74 = this;

				var needSleep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				while (true) {
					switch (this._state) {
						case 0:
							if (needSleep) {
								this._state = 1;
								counter.count(this._delay, !doc.hidden, function () {
									return _this74._makeStep();
								});
								return;
							}
						case 1:
							counter.setWait();
							this._state = 2;
							this._loadPromise = Thread.first.loadNewPosts().then(function (_ref67) {
								var newCount = _ref67.newCount,
								    locked = _ref67.locked;
								return _this74._handleNewPosts(newCount, locked ? AjaxError.Locked : AjaxError.Success);
							}, function (err) {
								return _this74._handleNewPosts(0, err);
							});
							return;
						case 2:
							this._loadPromise = null;
							if (this._loadOnce) {
								this._state = -1;
								return;
							}
							this._state = 0;
							break;
						default:
							console.error('Invalid thread updater state:', this._state, new Error().stack);
							return;
					}
				}
			},
			_setUpdateStatus: function _setUpdateStatus(status) {
				if (this._panelButton) {
					this._panelButton.id = 'de-panel-upd-' + status;
					this._panelButton.title = Lng.panelBtn['upd-' + (status === 'off' ? 'off' : 'on')][lang];
					if (nav.isPresto) {
						this._panelButton.innerHTML = '<svg class="de-panel-svg"><use xlink:href="#de-symbol-panel-upd"/></svg>';
					}
				}
			}
		};

		function _enableUpdater() {
			enabled = true;
			disabledByUser = paused = hasYouRefs = false;
			newPosts = 0;
			focusLoadTime = -1e4;
			notification.checkPermission();
			if (Cfg.updCount) {
				counter.enableCounter();
			}
			favicon.initIcons();
		}

		function _disableUpdater() {
			if (enabled) {
				audio.disableAudio();
				counter.disableCounter();
				updMachine.stopUpdater();
				enabled = false;
			}
		}

		function forceLoadPosts() {
			if (enabled && paused) {
				return;
			}
			if (!enabled && !disabledByUser) {
				_enableUpdater();
			}
			updMachine.start(false, !enabled);
		}

		function updateTitle() {
			var eCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : lastECode;

			doc.title = (sendError === true ? '{' + Lng.error[lang] + '} ' : '') + (eCode <= 0 || eCode === 200 ? '' : '{' + eCode + '} ') + (newPosts === 0 ? '' : '[' + newPosts + '] ') + title;
			favicon.updateIcon(eCode !== 200 && eCode !== 304);
		}

		doc.addEventListener('visibilitychange', function (e) {
			if (!doc.hidden) {
				var focusTime = e.timeStamp;
				favicon.stopBlink();
				audio.stopAudio();
				notification.closeNotif();
				newPosts = 0;
				hasYouRefs = false;
				sendError = false;
				setTimeout(function () {
					updateTitle();
					if (enabled && focusTime - focusLoadTime > 1e4) {
						focusLoadTime = focusTime;
						forceLoadPosts();
					}
				}, 200);
			} else if (Thread.first) {
				Post.clearMarks();
			}
		});
		if (enableUpdate) {
			_enableUpdater();
			updMachine.start(true);
		}

		return {
			continueUpdater: function continueUpdater() {
				var needSleep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (enabled && paused) {
					updMachine.start(needSleep);
					paused = false;
				}
			},
			disableUpdater: function disableUpdater() {
				disabledByUser = true;
				_disableUpdater();
			},
			enableUpdater: function enableUpdater() {
				if (!enabled) {
					_enableUpdater();
					updMachine.start();
				}
			},
			forceLoad: function forceLoad(e) {
				if (e) {
					$pd(e);
				}
				Post.clearMarks();
				if (enabled && paused) {
					return;
				}
				$popup('newposts', Lng.loading[lang], true);
				forceLoadPosts();
			},
			pauseUpdater: function pauseUpdater() {
				if (enabled && !paused) {
					updMachine.stopUpdater();
					paused = true;
				}
			},
			refToYou: function refToYou() {
				if (doc.hidden) {
					hasYouRefs = true;
				}
			},
			toggle: function toggle() {
				if (enabled) {
					this.disableUpdater();
				} else {
					this.enableUpdater();
				}
			},
			toggleAudio: function toggleAudio(repeatMS) {
				if (audio.enabled) {
					audio.stopAudio();
					return audio.enabled = false;
				}
				audio.repeatMS = repeatMS;
				return audio.enabled = true;
			},
			toggleCounter: function toggleCounter(enableCnt) {
				if (enableCnt) {
					counter.enableCounter();
					counter.setWait();
				} else {
					counter.disableCounter();
				}
				forceLoadPosts();
			},
			sendErrNotif: function sendErrNotif() {
				if (Cfg.sendErrNotif && doc.hidden) {
					sendError = true;
					updateTitle();
				}
			}
		};
	}


	var DelForm = function () {
		function DelForm(formEl, pageNum) {
			var prev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			_classCallCheck(this, DelForm);

			var thr = null;
			this.el = formEl;
			this.firstThr = null;
			this.lastThr = null;
			this.next = null;
			this.pageNum = pageNum;
			this.prev = prev;
			if (prev) {
				prev.next = this;
				thr = prev.lastThr;
			}
			formEl.setAttribute('de-form', '');
			formEl.removeAttribute('id');
			$each($Q('script', this.el), $del);
			var threads = DelForm.getThreads(this.el);
			for (var i = 0, _len8 = threads.length; i < _len8; ++i) {
				var num = aib.getTNum(threads[i]);
				if (DelForm.tNums.has(num)) {
					var el = threads[i];
					var thrNext = threads[i + 1];
					var elNext = el.nextSibling;
					while (elNext && elNext !== thrNext) {
						$del(elNext);
						elNext = el.nextSibling;
					}
					$del(el);
					console.log('Repeated thread: ' + num);
				} else {
					DelForm.tNums.add(num);
					thr = new Thread(threads[i], num, thr, this);
					if (this.firstThr === null) {
						this.firstThr = thr;
					}
				}
			}
			if (this.firstThr === null) {
				if (prev) {
					this.lastThr = prev.lastThr;
				}
				return;
			}
			this.lastThr = thr;
		}

		_createClass(DelForm, [{
			key: 'addStuff',
			value: function addStuff() {
				var el = this.el;

				if (Cfg.ajaxPosting && !localData) {
					el.onsubmit = $pd;
					var delBtn = $q(aib.qDelBut, el);
					if (delBtn) {
						delBtn.onclick = function (e) {
							$pd(e);
							pr.closeReply();
							$popup('delete', Lng.deleting[lang], true);
							html5Submit(el, e.target).then(checkDelete).catch(function (err) {
								return $popup('delete', getErrorMessage(err));
							});
						};
					}
					Logger.log('Init AJAX');
				}
				ContentLoader.preloadImages(el);
				Logger.log('Preload images');
				embedAudioLinks(el);
				Logger.log('Audio links');
				if (Cfg.addYouTube) {
					new VideosParser().parse(el).endParser();
					Logger.log('Video links');
				}
				processImgInfoLinks(el);
				Logger.log('Image names');
				RefMap.initRefMap(this);
				Logger.log('Reflinks map');
			}
		}, {
			key: 'passEl',
			get: function get() {
				var value = $q(aib.qDelPassw, this.el);
				Object.defineProperty(this, 'passEl', { value: value });
				return value;
			}
		}], [{
			key: 'getThreads',
			value: function getThreads(formEl) {
				var threads = $Q(aib.qThread, formEl);
				var len = threads.length;
				if (len === 0) {
					if (localData) {
						threads = $Q('div[de-thread]');
						len = threads.length;
					}
					if (len === 0) {
						threads = DelForm._parseClasslessThreads(formEl);
					}
				}
				return threads;
			}
		}, {
			key: Symbol.iterator,
			value: function value() {
				return {
					_data: this.first,
					next: function next() {
						var value = this._data;
						if (value) {
							this._data = value.next;
							return { value: value, done: false };
						}
						return { done: true };
					}
				};
			}
		}, {
			key: '_parseClasslessThreads',
			value: function _parseClasslessThreads(formEl) {
				var i = void 0,
				    len = void 0,
				    cThr = doc.createElement('div');
				var threads = [];
				var fNodes = [].concat(_toConsumableArray(formEl.childNodes));
				for (i = 0, len = fNodes.length - 1; i < len; ++i) {
					var el = fNodes[i];
					if (el.tagName === 'HR') {
						formEl.insertBefore(cThr, el);
						if (!aib.tinyib) {
							formEl.insertBefore(cThr.lastElementChild, el);
						}
						var lastEl = cThr.lastElementChild;
						if (lastEl.tagName === 'BR') {
							formEl.insertBefore(lastEl, el);
						}
						try {
							aib.getTNum(cThr);
							threads.push(cThr);
						} catch (err) {}
						cThr = doc.createElement('div');
					} else {
						cThr.appendChild(el);
					}
				}
				cThr.appendChild(fNodes[i]);
				formEl.appendChild(cThr);
				return threads;
			}
		}]);

		return DelForm;
	}();

	DelForm.tNums = new Set();


	function checkStorage() {
		try {
			locStorage = window.localStorage;
			sesStorage = window.sessionStorage;
			sesStorage['de-test'] = 1;
		} catch (err) {
			if (typeof unsafeWindow !== 'undefined') {
				locStorage = unsafeWindow.localStorage;
				sesStorage = unsafeWindow.sessionStorage;
			}
		}
		if (!(locStorage && (typeof locStorage === 'undefined' ? 'undefined' : _typeof(locStorage)) === 'object' && sesStorage)) {
			console.error('Webstorage error: please, enable webstorage!');
			return false;
		}
		return true;
	}

	function initNavFuncs() {
		var ua = navigator.userAgent;
		var isFirefox = ua.includes('Gecko/');
		var isWebkit = ua.includes('WebKit/');
		var isChrome = isWebkit && ua.includes('Chrome/');
		var isSafari = isWebkit && !isChrome;
		var isChromeStorage = (typeof chrome === 'undefined' ? 'undefined' : _typeof(chrome)) === 'object' && !!chrome && !!chrome.storage;
		var isScriptStorage = !!scriptStorage && !ua.includes('Opera Mobi');
		var isNewGM = typeof GM !== 'undefined' && typeof GM.xmlHttpRequest === 'function';
		var scriptHandler = void 0,
		    isGM = false;
		if (!isNewGM) {
			try {
				isGM = typeof GM_setValue === 'function' && (!isChrome || !GM_setValue.toString().includes('not supported'));
			} catch (err) {
				isGM = err.message === 'Permission denied to access property "toString"';
			}
			scriptHandler = isChromeStorage ? 'WebExtension' : typeof GM_info === 'undefined' ? isFirefox ? 'Scriptish' : 'Unknown' : GM_info.scriptHandler ? GM_info.scriptHandler + ' ' + GM_info.version : isFirefox ? 'Greasemonkey' : 'Unknown';
		} else {
			scriptHandler = GM.info ? GM.info.scriptHandler + ' ' + GM.info.version : 'Greasemonkey';
		}
		if (!('requestAnimationFrame' in window)) {
			window.requestAnimationFrame = function (fn) {
				return setTimeout(fn, 0);
			};
		}
		if (!('remove' in Element.prototype)) {
			Element.prototype.remove = function () {
				var el = this.parentNode;
				if (el) {
					el.removeChild(this);
				}
			};
		}
		var nlProto = NodeList.prototype;
		$each = 'forEach' in nlProto ? function (els, cb) {
			return nlProto.forEach.call(els, cb);
		} : function (els, cb) {
			return aProto.forEach.call(els, cb);
		};
		var needFileHack = false;
		try {
			new File([''], '');
			if (isFirefox || isSafari) {
				needFileHack = !FormData.prototype.get;
			}
		} catch (ett) {
			needFileHack = true;
		}
		if (needFileHack && FormData) {
			var OrigFormData = FormData;
			var origAppend = FormData.prototype.append;
			FormData = function FormData(form) {
				var rv = form ? new OrigFormData(form) : new OrigFormData();
				rv.append = function append(name, value) {
					var fileName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

					if (value instanceof Blob && 'name' in value && fileName === null) {
						return origAppend.call(this, name, value, value.name);
					}
					return origAppend.apply(this, arguments);
				};
				return rv;
			};
			window.File = function File(arr, name) {
				var rv = new Blob(arr);
				rv.name = name;
				return rv;
			};
		}
		nav = {
			ua: navigator.userAgent + (isFirefox ? ' [' + navigator.buildID + ']' : ''),
			scriptHandler: scriptHandler,
			isESNext: typeof deMainFuncOuter === 'undefined',
			isFirefox: isFirefox,
			firefoxVer: isFirefox ? +(ua.match(/Gecko\/[^/]+\/(\d+)/) || [0, 0])[1] : 0,
			isWebkit: isWebkit,
			isChrome: isChrome,
			isSafari: isSafari,
			isPresto: !!window.opera,
			isMsEdge: ua.includes('Edge/'),
			isGM: isGM,
			isNewGM: isNewGM,
			isChromeStorage: isChromeStorage,
			isScriptStorage: isScriptStorage,
			isGlobal: isGM || isNewGM || isChromeStorage || isScriptStorage,
			hasGMXHR: typeof GM_xmlhttpRequest === 'function' || isNewGM && typeof GM.xmlHttpRequest === 'function',
			get canPlayMP3() {
				var value = !!new Audio().canPlayType('audio/mpeg;');
				Object.defineProperty(this, 'canPlayMP3', { value: value });
				return value;
			},
			get hasTemplate() {
				var value = 'content' in doc.createElement('template');
				Object.defineProperty(this, 'hasTemplate', { value: value });
				return value;
			},
			get hasWorker() {
				var value = false;
				try {
					value = 'Worker' in window && 'URL' in window;
				} catch (err) {}
				value = value && this.firefoxVer >= 40;
				Object.defineProperty(this, 'hasWorker', { value: value });
				return value;
			},
			get matchesSelector() {
				var dE = doc.documentElement;
				var func = dE.matches || dE.mozMatchesSelector || dE.webkitMatchesSelector || dE.oMatchesSelector;
				var value = function value(el, sel) {
					return func.call(el, sel);
				};
				Object.defineProperty(this, 'matchesSelector', { value: value });
				return value;
			},
			get viewportHeight() {
				var value = doc.compatMode && doc.compatMode === 'CSS1Compat' ? function () {
					return doc.documentElement.clientHeight;
				} : function () {
					return docBody.clientHeight;
				};
				Object.defineProperty(this, 'viewportHeight', { value: value });
				return value;
			},
			get viewportWidth() {
				var value = doc.compatMode && doc.compatMode === 'CSS1Compat' ? function () {
					return doc.documentElement.clientWidth;
				} : function () {
					return docBody.clientWidth;
				};
				Object.defineProperty(this, 'viewportWidth', { value: value });
				return value;
			},
			cssMatches: function cssMatches(leftSel) {
				for (var _len9 = arguments.length, rules = Array(_len9 > 1 ? _len9 - 1 : 0), _key3 = 1; _key3 < _len9; _key3++) {
					rules[_key3 - 1] = arguments[_key3];
				}

				return leftSel + rules.join(', ' + leftSel);
			},
			fixLink: isSafari ? getAbsLink : function (url) {
				return url;
			},
			getUnsafeUint8Array: function getUnsafeUint8Array(data, i, len) {
				var Ctor = Uint8Array;
				if (!nav.isNewGM && nav.isFirefox) {
					try {
						if (!(new Uint8Array(data) instanceof Uint8Array)) {
							Ctor = unsafeWindow.Uint8Array;
						}
					} catch (err) {
						Ctor = unsafeWindow.Uint8Array;
					}
				}
				switch (arguments.length) {
					case 1:
						return new Ctor(data);
					case 2:
						return new Ctor(data, i);
					case 3:
						return new Ctor(data, i, len);
				}
				throw new Error();
			},
			getUnsafeDataView: function getUnsafeDataView(data, offset) {
				var rv = new DataView(data, offset || 0);
				return nav.isNewGM || !nav.isFirefox || rv instanceof DataView ? rv : new unsafeWindow.DataView(data, offset || 0);
			}
		};
	}


	var BaseBoard = function () {
		function BaseBoard(prot, dm) {
			_classCallCheck(this, BaseBoard);

			this.cReply = 'reply';
			this.qBan = null;
			this.qClosed = null;
			this.qDelBut = 'input[type="submit"]'; 
			this.qDelPassw = 'input[type="password"], input[name="password"]'; 
			this.qDForm = '#delform, form[name="delform"]';
			this.qError = 'h1, h2, font[size="5"]';
			this.qForm = '#postform';
			this.qFormPassw = 'tr input[type="password"]';
			this.qFormRedir = 'input[name="postredir"][value="1"]';
			this.qFormRules = '.rules, #rules';
			this.qFormSubm = 'tr input[type="submit"]'; 
			this.qImgInfo = '.filesize';
			this.qOmitted = '.omittedposts';
			this.qOPost = '.oppost';
			this.qPages = 'table[border="1"] > tbody > tr > td:nth-child(2) > a:last-of-type';
			this.qPostHeader = '.de-post-btns';
			this.qPostImg = '.thumb, .ca_thumb, img[src*="thumb"], img[src*="/spoiler"], img[src^="blob:"]';
			this.qPostMsg = 'blockquote';
			this.qPostName = '.postername, .commentpostername';
			this.qPostSubj = '.filetitle';
			this.qPostTrip = '.postertrip';
			this.qPostRef = '.reflink';
			this.qRPost = '.reply';
			this.qTrunc = '.abbrev, .abbr, .shortened';

			this.anchor = '#';
			this.b = '';
			this.dm = dm;
			this.docExt = null;
			this.firstPage = 0;
			this.formParent = 'parent';
			this.formTd = 'td';
			this.hasAltCaptcha = false; 
			this.hasCatalog = false;
			this.hasOPNum = false;
			this.hasPicWrap = false;
			this.hasTextLinks = false;
			this.host = window.location.hostname;
			this.JsonBuilder = null;
			this.jsonSubmit = false;
			this.markupBB = false;
			this.multiFile = false;
			this.page = 0;
			this.prot = prot;
			this.res = 'res/';
			this.ru = false;
			this.t = false;
			this.timePattern = 'w+dd+m+yyyy+hh+ii+ss';

			this._qTable = 'form > table, div > table, div[id^="repl"]';
		}

		_createClass(BaseBoard, [{
			key: 'disableRedirection',
			value: function disableRedirection(el) {
				$hide($parent(el, 'TR'));
				el.checked = true;
			}
		}, {
			key: 'fixHTML',
			value: function fixHTML(data) {
				var isForm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (!(dTime || Spells.reps || Cfg.crossLinks || Cfg.decodeLinks || this.fixHTMLHelper || this.fixDeadLinks || this.hasTextLinks)) {
					return data;
				}
				var str = void 0;
				if (typeof data === 'string') {
					str = data;
				} else if (isForm) {
					data.id = 'de-dform-old';
					str = data.outerHTML;
				} else {
					str = data.innerHTML;
				}
				if (dTime) {
					str = dTime.fix(str);
				}
				if (this.fixHTMLHelper) {
					str = this.fixHTMLHelper(str);
				}
				if (this.fixDeadLinks) {
					str = this.fixDeadLinks(str);
				}
				if (this.hasTextLinks) {
					str = str.replace(/(^|>|\s|&gt;)(https*:\/\/[^"<>]*?)(<\/a>)?(?=$|<|\s)/ig, function (x, a, b, c) {
						return c ? x : a + '<a rel="noreferrer" href="' + b + '">' + b + '</a>';
					});
				}
				if (Spells.reps) {
					str = Spells.replace(str);
				}
				if (Cfg.crossLinks) {
					str = str.replace(aib.reCrossLinks, function (_, b, tNum, pNum) {
						return '>&gt;&gt;/' + b + '/' + (pNum || tNum) + '<';
					});
				}
				if (Cfg.decodeLinks) {
					str = str.replace(/>https?:\/\/[^<]+</ig, function (match) {
						try {
							return decodeURI(match);
						} catch (err) {}
						return match;
					});
				}
				if (typeof data === 'string') {
					return str;
				}
				if (isForm) {
					var newForm = $bBegin(data, str);
					$hide(data);
					window.addEventListener('load', function () {
						return $del($id('de-dform-old'));
					});
					return newForm;
				}
				data.innerHTML = str;
				return data;
			}
		}, {
			key: 'fixVideo',
			value: function fixVideo(isPost, data) {
				var videos = [];
				var els = $Q('embed, object, iframe', isPost ? data.el : data);
				for (var i = 0, _len10 = els.length; i < _len10; ++i) {
					var el = els[i];
					var src = el.src || el.data;
					if (!src) {
						continue;
					}
					var m = src.match(Videos.ytReg);
					if (m) {
						videos.push([isPost ? data : this.getPostOfEl(el), m, true]);
						$del(el);
					}
					if (Cfg.addVimeo && (m = src.match(Videos.vimReg))) {
						videos.push([isPost ? data : this.getPostOfEl(el), m, false]);
						$del(el);
					}
				}
				return videos;
			}
		}, {
			key: 'getBanId',
			value: function getBanId(postEl) {
				return this.qBan && $q(this.qBan, postEl) ? 1 : 0;
			}
		}, {
			key: 'getCapParent',
			value: function getCapParent(el) {
				return $parent(el, 'TR');
			}
		}, {
			key: 'getCaptchaSrc',
			value: function getCaptchaSrc(src, tNum) {
				var tmp = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=').replace(/dummy=[\d.]*/, 'dummy=' + Math.random());
				return tNum ? tmp.replace(/mainpage|res\d+/, 'res' + tNum) : tmp.replace(/res\d+/, 'mainpage');
			}
		}, {
			key: 'getImgInfo',
			value: function getImgInfo(wrap) {
				var el = $q(this.qImgInfo, wrap);
				return el ? el.textContent : '';
			}
		}, {
			key: 'getImgRealName',
			value: function getImgRealName(wrap) {
				return $q(this.qImgNameLink, wrap)[Cfg.delImgNames ? 'title' : 'textContent'];
			}
		}, {
			key: 'getImgSrcLink',
			value: function getImgSrcLink(img) {
				return $parent(img, 'A');
			}
		}, {
			key: 'getImgWrap',
			value: function getImgWrap(img) {
				return $parent(img, 'A').parentNode;
			}
		}, {
			key: 'getJsonApiUrl',
			value: function getJsonApiUrl() {}
		}, {
			key: 'getOmitted',
			value: function getOmitted(el) {
				return +(el && (el.textContent || '').match(/\d+/)) + 1;
			}
		}, {
			key: 'getOp',
			value: function getOp(thr) {
				var op = localData ? $q('div[de-oppost]', thr) : $q(this.qOPost, thr);
				if (op) {
					return op;
				}
				op = thr.ownerDocument.createElement('div');
				op.setAttribute('de-oppost', '');
				var el = void 0;
				var opEnd = $q(this._qTable, thr);
				while ((el = thr.firstChild) && el !== opEnd) {
					op.appendChild(el);
				}
				if (thr.hasChildNodes()) {
					thr.insertBefore(op, thr.firstChild);
				} else {
					thr.appendChild(op);
				}
				return op;
			}
		}, {
			key: 'getPageUrl',
			value: function getPageUrl(b, p) {
				return fixBrd(b) + (p > 0 ? p + this.docExt : '');
			}
		}, {
			key: 'getPNum',
			value: function getPNum(post) {
				return +post.id.match(/\d+/);
			}
		}, {
			key: 'getPostElOfEl',
			value: function getPostElOfEl(el) {
				var sel = this.qRPost + ', [de-thread]';
				while (el && !nav.matchesSelector(el, sel)) {
					el = el.parentElement;
				}
				return el;
			}
		}, {
			key: 'getPostOfEl',
			value: function getPostOfEl(el) {
				return pByEl.get(this.getPostElOfEl(el));
			}
		}, {
			key: 'getPostWrap',
			value: function getPostWrap(el, isOp) {
				if (isOp) {
					return el;
				}
				Object.defineProperty(this, 'getPostWrap', { value: el.tagName === 'TD' ? function (el, isOp) {
						return isOp ? el : $parent(el, 'TABLE');
					} : function (el) {
						return el;
					} });
				return this.getPostWrap(el, isOp);
			}
		}, {
			key: 'getSage',
			value: function getSage(post) {
				var el = $q('a[href^="mailto:"], a[href="sage"]', post);
				return !!el && /sage/i.test(el.href);
			}
		}, {
			key: 'getThrUrl',
			value: function getThrUrl(b, tNum) {
				return this.prot + '//' + this.host + fixBrd(b) + this.res + tNum + this.docExt;
			}
		}, {
			key: 'getTNum',
			value: function getTNum(op) {
				return +$q('input[type="checkbox"]', op).value;
			}
		}, {
			key: 'insertYtPlayer',
			value: function insertYtPlayer(msg, playerHtml) {
				return $bBegin(msg, playerHtml);
			}
		}, {
			key: 'isAjaxStatusOK',
			value: function isAjaxStatusOK(status) {
				return status === 200 || status === 206;
			}
		}, {
			key: 'parseURL',
			value: function parseURL() {
				var url = (window.location.pathname || '').replace(/^\//, '');
				if (url.match(this.res)) {
					var temp = url.split(this.res);
					this.b = temp[0].replace(/\/$/, '');
					this.t = +temp[1].match(/^\d+/)[0];
					this.page = this.firstPage;
				} else {
					var _temp = url.match(/\/?(\d+)[^/]*?$/);
					this.page = _temp && +_temp[1] || this.firstPage;
					this.b = url.replace(_temp && this.page ? _temp[0] : /\/(?:[^/]+\.[a-z]+)?$/, '');
				}
				if (this.docExt === null) {
					this.docExt = (url.match(/\.[a-z]+$/) || ['.html'])[0];
				}
			}
		}, {
			key: 'updateSubmitBtn',
			value: function updateSubmitBtn(el) {
				el.value = Lng.reply[lang];
			}
		}, {
			key: 'qFormMail',
			get: function get() {
				return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])', '[name="email"]', '[name="em"]', '[name="field2"]', '[name="sage"]');
			}
		}, {
			key: 'qFormName',
			get: function get() {
				return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])', '[name="name"]', '[name="field1"]');
			}
		}, {
			key: 'qFormSubj',
			get: function get() {
				return nav.cssMatches('tr:not([style*="none"]) input:not([type="hidden"]):not([style*="none"])', '[name="subject"]', '[name="field3"]');
			}
		}, {
			key: 'qImgNameLink',
			get: function get() {
				var value = nav.cssMatches(this.qImgInfo + ' a', '[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]', '[href$=".webm"]', '[href$=".mp4"]', '[href$=".ogv"]', '[href$=".apng"]', ', [href^="blob:"]');
				Object.defineProperty(this, 'qImgNameLink', { value: value });
				return value;
			}
		}, {
			key: 'qMsgImgLink',
			get: function get() {
				var value = nav.cssMatches(this.qPostMsg + ' a', '[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]');
				Object.defineProperty(this, 'qMsgImgLink', { value: value });
				return value;
			}
		}, {
			key: 'qThread',
			get: function get() {
				var value = $q('.thread') ? '.thread' : '[id^="thread"]';
				Object.defineProperty(this, 'qThread', { value: value });
				return value;
			}
		}, {
			key: 'capLang',
			get: function get() {
				return this.ru ? 2 : 1;
			}
		}, {
			key: 'catalogUrl',
			get: function get() {
				return this.prot + '//' + this.host + '/' + this.b + '/catalog.html';
			}
		}, {
			key: 'changeReplyMode',
			get: function get() {
				return null;
			}
		}, {
			key: 'css',
			get: function get() {
				return '';
			}
		}, {
			key: 'deleteTruncMsg',
			get: function get() {
				return null;
			}
		}, {
			key: 'fixDeadLinks',
			get: function get() {
				return null;
			}
		}, {
			key: 'fixHTMLHelper',
			get: function get() {
				return null;
			}
		}, {
			key: 'fixFileInputs',
			get: function get() {
				return null;
			}
		}, {
			key: 'getSubmitData',
			get: function get() {
				return null;
			}
		}, {
			key: 'initCaptcha',
			get: function get() {
				return null;
			}
		}, {
			key: 'isArchived',
			get: function get() {
				return false;
			}
		}, {
			key: 'lastPage',
			get: function get() {
				var el = $q(this.qPages);
				var value = el && +aProto.pop.call(el.textContent.match(/\d+/g) || []) || 0;
				if (this.page === value + 1) {
					value++;
				}
				Object.defineProperty(this, 'lastPage', { value: value });
				return value;
			}
		}, {
			key: 'markupTags',
			get: function get() {
				return this.markupBB ? ['b', 'i', 'u', 's', 'spoiler', 'code'] : ['**', '*', '', '^H', '%%', '`'];
			}
		}, {
			key: 'observeContent',
			get: function get() {
				return null;
			}
		}, {
			key: 'reCrossLinks',
			get: function get() {
				var value = new RegExp('>https?:\\/\\/[^\\/]*' + this.dm + '\\/([a-z0-9]+)\\/' + quoteReg(this.res) + '(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<', 'g');
				Object.defineProperty(this, 'reCrossLinks', { value: value });
				return value;
			}
		}, {
			key: 'sendHTML5Post',
			get: function get() {
				return null;
			}
		}, {
			key: 'thrId',
			get: function get() {
				return null;
			}
		}, {
			key: 'updateCaptcha',
			get: function get() {
				return null;
			}
		}]);

		return BaseBoard;
	}();


	function getImageBoard(checkDomains, checkEngines) {
		var ibDomains = {};
		var ibEngines = [];


		var Makaba = function (_BaseBoard) {
			_inherits(Makaba, _BaseBoard);

			function Makaba(prot, dm) {
				_classCallCheck(this, Makaba);

				var _this75 = _possibleConstructorReturn(this, (Makaba.__proto__ || Object.getPrototypeOf(Makaba)).call(this, prot, dm));

				_this75.mak = true;

				_this75.cReply = 'post reply';
				_this75.qBan = '.pomyanem';
				_this75.qClosed = '.sticky-img[src$="locked.png"]';
				_this75.qDForm = '#posts-form';
				_this75.qFormRedir = null;
				_this75.qFormRules = '.rules-area';
				_this75.qImgInfo = '.file-attr';
				_this75.qOmitted = '.mess-post';
				_this75.qPostHeader = '.post-details';
				_this75.qPostImg = '.preview';
				_this75.qPostMsg = '.post-message';
				_this75.qPostName = '.ananimas, .post-email';
				_this75.qPostSubj = '.post-title';
				_this75.qRPost = '.post.reply[data-num]';
				_this75.qTrunc = null;

				_this75.formParent = 'thread';
				_this75.hasAltCaptcha = true;
				_this75.hasCatalog = true;
				_this75.hasOPNum = true;
				_this75.hasPicWrap = true;
				_this75.JsonBuilder = MakabaPostsBuilder;
				_this75.jsonSubmit = true;
				_this75.markupBB = true;
				_this75.multiFile = true;
				_this75.timePattern = 'dd+nn+yy+w+hh+ii+ss';

				_this75._capUpdPromise = null;
				return _this75;
			}

			_createClass(Makaba, [{
				key: 'deleteTruncMsg',
				value: function deleteTruncMsg(post, el) {
					$del(el.previousSibling);
					$show(el.previousSibling);
					$del(el);
				}
			}, {
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					el.innerHTML = Array.from({ length: 8 }, function (val, i) {
						return '<div' + (i ? ' style="display: none;"' : '') + '><input type="file" name="image' + (i + 1) + '"></div>';
					}).join('');
				}
			}, {
				key: 'getBanId',
				value: function getBanId(postEl) {
					var el = $q(this.qBan, postEl);
					return !el ? 0 : el.textContent.includes('предупрежден') ? 2 : 1;
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode;
				}
			}, {
				key: 'getJsonApiUrl',
				value: function getJsonApiUrl(brd, tNum) {
					return '/' + brd + '/res/' + tNum + '.json';
				}
			}, {
				key: 'getPNum',
				value: function getPNum(post) {
					return +post.getAttribute('data-num');
				}
			}, {
				key: 'getPostWrap',
				value: function getPostWrap(el) {
					return el.parentNode;
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					var _this76 = this;

					if ($q('.ananimas > span[id^="id_tag_"], .post-email > span[id^="id_tag_"]')) {
						this.getSage = function (post) {
							var name = $q(_this76.qPostName, post);
							return name ? name.childElementCount === 0 && !$q('.ophui', post) : false;
						};
					} else {
						this.getSage = _get(Makaba.prototype.__proto__ || Object.getPrototypeOf(Makaba.prototype), 'getSage', this);
					}
					return this.getSage(post);
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(json) {
					var error = null;
					var postNum = null;
					if (json.Status === 'OK') {
						postNum = +json.Num;
					} else if (json.Status === 'Redirect') {
						postNum = +json.Target;
					} else {
						error = Lng.error[lang] + ':\n' + json.Reason;
					}
					return { error: error, postNum: postNum };
				}
			}, {
				key: 'init',
				value: function init() {
					$script('(function() {\n\t\t\t\tvar emptyFn = Function.prototype;\n\t\t\t\tfunction fixGlobalFunc(name) {\n\t\t\t\t\tObject.defineProperty(window, name,\n\t\t\t\t\t\t{ value: emptyFn, writable: false, configurable: false });\n\t\t\t\t}\n\t\t\t\tfixGlobalFunc("$alert");\n\t\t\t\tfixGlobalFunc("autorefresh_start");\n\t\t\t\tfixGlobalFunc("linkremover");\n\t\t\t\tfixGlobalFunc("scrollTo");\n\t\t\t\twindow.FormData = void 0;\n\t\t\t\t$(function() { $(window).off(); });\n\t\t\t})();');
					$each($Q('.autorefresh'), $del);
					var el = $q('td > .anoniconsselectlist');
					if (el) {
						$q('.option-area > td:last-child').appendChild(el);
					}
					if (el = $q('.search')) {
						var node = $q('.adminbar__menu, .menu');
						if (node && (node = node.firstChild)) {
							$before(node, el);
						}
					}
					if (el = $id('shampoo')) {
						el.tabIndex = 1;
					}
					$del($id('favorites-box'));
					return false;
				}
			}, {
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					var _this77 = this;

					var box = $q('.captcha-box', cap.parentEl);
					if (Cfg.altCaptcha && box.firstChild.tagName !== 'IMG') {
						box.innerHTML = '<img>\n\t\t\t\t\t<input name="2chaptcha_value" maxlength="6" type="text">\n\t\t\t\t\t<input name="captcha_type" value="2chaptcha" type="hidden">\n\t\t\t\t\t<input name="2chaptcha_id" type="hidden">';

						var _ref68 = [].concat(_toConsumableArray(box.children)),
						    img = _ref68[0],
						    inp = _ref68[1];

						img.onclick = function () {
							return _this77.updateCaptcha(cap);
						};
						inp.tabIndex = 999;
						cap.textEl = inp;
					} else {
						box.innerHTML = '<div id="captcha-widget-main"></div>\n\t\t\t\t\t<input name="captcha_type" value="invisible_recaptcha" type="hidden">';
					}
					return null;
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					var url = Cfg.altCaptcha ? '/api/captcha/2chaptcha/id?board=' + this.b + '&thread=' + pr.tNum : '/api/captcha/invisible_recaptcha/id';
					return cap.updateHelper(url, function (xhr) {
						var box = $q('.captcha-box', cap.parentEl);
						var data = xhr.responseText;
						try {
							data = JSON.parse(data);
						} catch (err) {}
						switch (data.result) {
							case 0:
								box.innerHTML = 'Пасс-код не действителен. <a href="#" id="renew-pass-btn">Обновить</a>';
								break;
							case 2:
								box.textContent = 'Вам не нужно вводить капчу, у вас введен пасс-код.';
								break;
							case 3:
								return CancelablePromise.reject(); 
							case 1:
								if (data.type === 'invisible_recaptcha') {
									$q('.captcha-key').value = data.id;
									if (!$id('captcha-widget').hasChildNodes()) {
										$script('deCapWidget = grecaptcha.render(\'captcha-widget\', {\n\t\t\t\t\t\t\t\t\tsitekey : \'' + data.id + '\',\n\t\t\t\t\t\t\t\t\ttheme   : \'light\',\n\t\t\t\t\t\t\t\t\tsize    : \'invisible\',\n\t\t\t\t\t\t\t\t\tcallback: function() {\n\t\t\t\t\t\t\t\t\t\tvar el = document.getElementById(\'captcha-widget-main\');\n\t\t\t\t\t\t\t\t\t\tel.innerHTML = \'<input type="hidden" name="g-recaptcha-response">\';\n\t\t\t\t\t\t\t\t\t\tel.firstChild.value = grecaptcha.getResponse();\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\tgrecaptcha.execute(deCapWidget);');
									} else {
										$script('grecaptcha.reset(deCapWidget);\n\t\t\t\t\t\t\t\tgrecaptcha.execute(deCapWidget);');
									}
									break;
								} else if (data.type === '2chaptcha') {
									var img = box.firstChild;
									img.src = '';
									img.src = '/api/captcha/2chaptcha/image/' + data.id;
									box.lastChild.value = data.id;
									break;
								}
							default:
								box.innerHTML = data;
						}
					});
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return '.file-attr > .desktop';
				}
			}, {
				key: 'css',
				get: function get() {
					return '#ABU-alert-wait, .ABU-refmap, .box[onclick="ToggleSage()"], .cntnt__right > hr,\n\t\t\t\t\t.fa-media-icon, .kupi-passcode-suka, .logo + hr, .media-expand-button, #media-thumbnail,\n\t\t\t\t\t.message-byte-len, .nav-arrows, .norm-reply, .postform-hr, .postpanel > :not(img),\n\t\t\t\t\t.thread-nav, .toolbar-area, .top-user-boards + hr { display: none !important; }\n\t\t\t\t.captcha-box > img { display: block; width: 221px; cursor: pointer; }\n\t\t\t\t.mess-post { display: block; }\n\t\t\t\t.oekaki-height, .oekaki-width { width: 36px !important; }\n\t\t\t\t.post.reply .post-message { max-height: initial !important; }\n\t\t\t\t.tmp_postform { width: auto; }\n\t\t\t\t.de-win-inpost { position: static !important; }\n\t\t\t\t' + (Cfg.expandTrunc ? '.expand-large-comment,\n\t\t\t\t\tdiv[id^="shrinked-post"] { display: none !important; }\n\t\t\t\t\tdiv[id^="original-post"] { display: block !important; }' : '') + '\n\t\t\t\t' + (Cfg.delImgNames ? '.filesize { display: inline !important; }\n\t\t\t\t\t.file-attr { margin-bottom: 1px; }' : '') + '\n\t\t\t\t' + (Cfg.expandImgs ? '#fullscreen-container { display: none !important; }' : '') + '\n\t\t\t\t' + (Cfg.txtBtnsLoc ? '.message-sticker-btn, .message-sticker-preview {\n\t\t\t\t\tbottom: 25px !important; }' : '');
				}
			}, {
				key: 'lastPage',
				get: function get() {
					var els = $Q('.pager > a:not([class])');
					var value = els ? els.length : 1;
					Object.defineProperty(this, 'lastPage', { value: value });
					return value;
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['B', 'I', 'U', 'S', 'SPOILER', 'CODE', 'SUP', 'SUB'];
				}
			}]);

			return Makaba;
		}(BaseBoard);

		ibEngines.push(['body.makaba', Makaba]);
		ibDomains['2ch.hk'] = Makaba;
		ibDomains['2ch.pm'] = Makaba;

		var Tinyboard = function (_BaseBoard2) {
			_inherits(Tinyboard, _BaseBoard2);

			function Tinyboard(prot, dm) {
				_classCallCheck(this, Tinyboard);

				var _this78 = _possibleConstructorReturn(this, (Tinyboard.__proto__ || Object.getPrototypeOf(Tinyboard)).call(this, prot, dm));

				_this78.cReply = 'post reply';
				_this78.qClosed = '.fa-lock';
				_this78.qDForm = 'form[name*="postcontrols"]';
				_this78.qForm = 'form[name="post"]';
				_this78.qFormPassw = 'input[name="password"]';
				_this78.qFormRedir = null;
				_this78.qImgInfo = '.fileinfo';
				_this78.qOmitted = '.omitted';
				_this78.qPages = '.pages';
				_this78.qPostHeader = '.intro';
				_this78.qPostMsg = '.body';
				_this78.qPostName = '.name';
				_this78.qPostRef = '.post_no + a';
				_this78.qPostSubj = '.subject';
				_this78.qPostTrip = '.trip';
				_this78.qTrunc = '.toolong';

				_this78.firstPage = 1;
				_this78.formParent = 'thread';
				_this78.formTd = 'th';
				_this78.hasCatalog = true;
				_this78.jsonSubmit = true;
				_this78.timePattern = 'nn+dd+yy++w++hh+ii+ss';

				_this78._origInputs = null;
				_this78._qTable = '.post.reply';
				return _this78;
			}

			_createClass(Tinyboard, [{
				key: 'changeReplyMode',
				value: function () {
					var _ref69 = _asyncToGenerator( regeneratorRuntime.mark(function _callee18(form, tNum) {
						var _this79 = this;

						var pageInp, query, errFn;
						return regeneratorRuntime.wrap(function _callee18$(_context23) {
							while (1) {
								switch (_context23.prev = _context23.next) {
									case 0:
										if (!(!this._origInputs && !$q('input[name="hash"]', form))) {
											_context23.next = 5;
											break;
										}

										pr.subm.value = Lng.reply[lang];
										pageInp = $q('input[name="page"]', form);

										if (tNum) {
											$del(pageInp);
										} else if (!pageInp) {
											form.insertAdjacentHTML('beforeend', '<input name="page" value="1" type="hidden">');
										}
										return _context23.abrupt('return');

									case 5:
										query = 'div[style="display:none"], input[style="display:none"], ' + 'span[style="display:none"], textarea[style="display:none"], ' + 'input[type="hidden"]:not(.de-input-hidden)';

										if ($q('input[name="thread"]', form)) {
											_context23.next = 11;
											break;
										}

										this._origInputs = [doc.createElement('div'), pr.subm.value];
										$each($Q(query, form), function (el) {
											return _this79._origInputs[0].appendChild(el);
										});
										_context23.next = 17;
										break;

									case 11:
										if (tNum) {
											_context23.next = 17;
											break;
										}

										pr.subm.value = this._origInputs[1];
										$each($Q(query, form), $del);
										form.insertAdjacentHTML('beforeend', this._origInputs[0].innerHTML);
										this._origInputs = null;
										return _context23.abrupt('return');

									case 17:
										errFn = function errFn() {
											$popup('load-form', Lng.errFormLoad[lang]);
											pr.closeReply();
										};

										$popup('load-form', Lng.loading[lang], true);
										_context23.next = 21;
										return ajaxLoad(aib.getThrUrl(this.b, tNum), false).then(function (loadedDoc) {
											var loadedForm = $q(_this79.qForm, loadedDoc);
											if (!loadedForm) {
												errFn();
												return;
											}
											pr.subm.value = $q(_this79.qFormSubm, loadedDoc).value;
											$each($Q(query, form), $del);
											$each($Q(query, loadedForm), function (el) {
												return form.appendChild(doc.adoptNode(el));
											});
											closePopup('load-form');
										}, errFn);

									case 21:
									case 'end':
										return _context23.stop();
								}
							}
						}, _callee18, this);
					}));

					function changeReplyMode(_x75, _x76) {
						return _ref69.apply(this, arguments);
					}

					return changeReplyMode;
				}()
			}, {
				key: 'fixVideo',
				value: function fixVideo(isPost, data) {
					var _this80 = this;

					return Array.from($Q('.video-container, #ytplayer', isPost ? data.el : data), function (el) {
						var value = [isPost ? data : _this80.getPostOfEl(el), el.id === 'ytplayer' ? el.src.match(Videos.ytReg) : ['', el.getAttribute('data-video')], true];
						$del(el);
						return value;
					});
				}
			}, {
				key: 'getImgRealName',
				value: function getImgRealName(wrap) {
					return ($q('.postfilename, .unimportant > a[download]', wrap) || $q(this.qImgNameLink, wrap)).textContent;
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return p > 1 ? fixBrd(b) + p + this.docExt : fixBrd(b);
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(_ref70) {
					var error = _ref70.error,
					    id = _ref70.id;

					return { error: error, postNum: id && +id };
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('input[type="checkbox"]', op).name.match(/\d+/);
				}
			}, {
				key: 'init',
				value: function init() {
					$script('window.FormData = void 0');
					var form = $q('form[name="post"]');
					if (form) {
						form.insertAdjacentHTML('beforeend', '<input class="de-input-hidden" name="json_response" value="1" type="hidden">');
					}
					$each($Q('br.clear'), function (el) {
						var hr = el.nextElementSibling;
						if (hr && hr.tagName === 'HR') {
							$after(el.parentNode, hr);
						}
						$del(el);
					});
					return false;
				}
			}, {
				key: 'isAjaxStatusOK',
				value: function isAjaxStatusOK(status) {
					return status === 200 || status === 206 || status === 400;
				}
			}, {
				key: 'updateSubmitBtn',
				value: function updateSubmitBtn() {}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return 'p.fileinfo > a:first-of-type';
				}
			}, {
				key: 'css',
				get: function get() {
					return '.banner, .hide-thread-link, .mentioned,\n\t\t\t\t\t.post-hover { display: none !important; }\n\t\t\t\tdiv.post.reply:not(.de-entry):not(.de-cfg-tab):not(.de-win-body) {\n\t\t\t\t\tfloat: left !important; clear: left; display: block; }';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ["'''", "''", '__', '~~', '**', '[code'];
				}
			}]);

			return Tinyboard;
		}(BaseBoard);

		ibEngines.push(['form[name*="postcontrols"]', Tinyboard]);

		var Vichan = function (_Tinyboard) {
			_inherits(Vichan, _Tinyboard);

			function Vichan(prot, dm) {
				_classCallCheck(this, Vichan);

				var _this81 = _possibleConstructorReturn(this, (Vichan.__proto__ || Object.getPrototypeOf(Vichan)).call(this, prot, dm));

				_this81.qDelPassw = '#password';
				_this81.qPostImg = '.post-image[alt]:not(.deleted)';

				_this81.multiFile = true;
				return _this81;
			}

			_createClass(Vichan, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					el.innerHTML = Array.from({ length: 5 }, function (val, i) {
						return '<div' + (i ? ' style="display: none;"' : '') + '>' + ('<input type="file" name="file' + (i ? i + 1 : '') + '"></div>');
					}).join('');
				}
			}, {
				key: 'fixHTMLHelper',
				value: function fixHTMLHelper(str) {
					return str.replace(/"\/player\.php\?v=([^&]+)&[^"]+"/g, '"$1"');
				}
			}, {
				key: 'init',
				value: function init() {
					_get(Vichan.prototype.__proto__ || Object.getPrototypeOf(Vichan.prototype), 'init', this).call(this);
					if (locStorage.file_dragdrop !== 'false') {
						locStorage.file_dragdrop = false;
						window.location.reload();
						return true;
					}
					$script('highlightReply = Function.prototype');
					setTimeout(function () {
						return $del($id('updater'));
					}, 0);
					var textarea = $id('body');
					if (textarea) {
						textarea.removeAttribute('id');
					}
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Vichan.prototype.__proto__ || Object.getPrototypeOf(Vichan.prototype), 'css', this) + '\n\t\t\t\t#expand-all-images, #expand-all-images + .unimportant, .fileinfo > span[style*="nowrap;"],\n\t\t\t\t\t.post-btn, small { display: none !important; }\n\t\t\t\tbody { padding: 0 5px !important; }\n\t\t\t\t.boardlist { position: static !important; }\n\t\t\t\t.fileinfo { width: 250px; }\n\t\t\t\t.multifile { width: auto !important; }';
				}
			}]);

			return Vichan;
		}(Tinyboard);

		ibEngines.push(['tr#upload', Vichan]);

		var Kusaba = function (_BaseBoard3) {
			_inherits(Kusaba, _BaseBoard3);

			function Kusaba(prot, dm) {
				_classCallCheck(this, Kusaba);

				var _this82 = _possibleConstructorReturn(this, (Kusaba.__proto__ || Object.getPrototypeOf(Kusaba)).call(this, prot, dm));

				_this82.kus = true;

				_this82.qError = 'h1, h2, div[style*="1.25em"]';
				_this82.qFormRedir = 'input[name="redirecttothread"][value="1"]';

				_this82.formParent = 'replythread';
				_this82.markupBB = true;
				return _this82;
			}

			_createClass(Kusaba, [{
				key: 'getCaptchaSrc',
				value: function getCaptchaSrc(src) {
					return src.replace(/\?[^?]+$|$/, '?' + Math.random());
				}
			}, {
				key: 'getImgRealName',
				value: function getImgRealName(wrap) {
					var el = $q('.filesize', wrap).textContent.split(',')[2];
					return !el && _get(Kusaba.prototype.__proto__ || Object.getPrototypeOf(Kusaba.prototype), 'getImgRealName', this).call(this, wrap) || el.replace(')', '');
				}
			}, {
				key: 'init',
				value: function init() {
					var el = $id('posttypeindicator');
					if (el) {
						[el.previousSibling, el.nextSibling, el].forEach($del);
					}
				}
			}, {
				key: 'css',
				get: function get() {
					return '.extrabtns > a, .extrabtns > span, #newposts_get, .replymode,\n\t\t\t\t\t.ui-resizable-handle, blockquote + a { display: none !important; }\n\t\t\t\t.ui-wrapper { display: inline-block; width: auto !important;\n\t\t\t\t\theight: auto !important; padding: 0 !important; }';
				}
			}]);

			return Kusaba;
		}(BaseBoard);

		ibEngines.push(['script[src*="kusaba"]', Kusaba], ['form#delform[action$="/board.php"]', Kusaba]);

		var TinyIB = function (_BaseBoard4) {
			_inherits(TinyIB, _BaseBoard4);

			function TinyIB(prot, dm) {
				_classCallCheck(this, TinyIB);

				var _this83 = _possibleConstructorReturn(this, (TinyIB.__proto__ || Object.getPrototypeOf(TinyIB)).call(this, prot, dm));

				_this83.tinyib = true;

				_this83.qError = 'body[align=center] div, div[style="margin-top: 50px;"]';
				_this83.qPostMsg = '.message';
				return _this83;
			}

			_createClass(TinyIB, [{
				key: 'fixHTMLHelper',
				value: function fixHTMLHelper(str) {
					return str.replace(/="\.\.\//g, '="/' + this.b + '/');
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode;
				}
			}, {
				key: 'init',
				value: function init() {
					$each($Q('.message > .omittedposts'), function (el) {
						return $replace(el, '<span class="abbrev">Post too long. <a href="#">Click to view.</a>');
					});
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return '.replymode { display: none; }';
				}
			}]);

			return TinyIB;
		}(BaseBoard);

		ibEngines.push(['form[action$="imgboard.php?delete"]', TinyIB]);

		var LynxChan = function (_BaseBoard5) {
			_inherits(LynxChan, _BaseBoard5);

			function LynxChan(prot, dm) {
				_classCallCheck(this, LynxChan);

				var _this84 = _possibleConstructorReturn(this, (LynxChan.__proto__ || Object.getPrototypeOf(LynxChan)).call(this, prot, dm));

				_this84.cReply = 'innerPost';
				_this84.qDForm = 'form[action$="contentActions.js"]';
				_this84.qError = '#errorLabel, #labelMessage';
				_this84.qForm = '.form-post';
				_this84.qFormPassw = 'input[name="password"]';
				_this84.qFormRules = '.form-post > .small';
				_this84.qFormSubm = '#formButton';
				_this84.qImgInfo = '.uploadDetails';
				_this84.qOmitted = '.labelOmission';
				_this84.qOPost = '.innerOP';
				_this84.qPages = '#divPages';
				_this84.qPostHeader = '.postInfo, .de-post-btns';
				_this84.qPostImg = '.imgLink > img, img[src*="/.media/"]';
				_this84.qPostMsg = '.divMessage';
				_this84.qPostRef = '.linkQuote';
				_this84.qRPost = '.innerPost';
				_this84.qTrunc = '.contentOmissionIndicator';

				_this84.firstPage = 1;
				_this84.formParent = 'threadId';
				_this84.formTd = 'th';
				_this84.hasCatalog = true;
				_this84.jsonSubmit = true;
				_this84.multiFile = true;

				_this84._qTable = '.divPosts';
				return _this84;
			}

			_createClass(LynxChan, [{
				key: 'changeReplyMode',
				value: function changeReplyMode(form, tNum) {
					var action = form.getAttribute('action');
					form.setAttribute('action', tNum ? action.replace('newThread', 'replyThread') : action.replace('replyThread', 'newThread'));
				}
			}, {
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '><input name="files" type="file"></div>';
					el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(+$id('labelMaxFiles').textContent - 1);
				}
			}, {
				key: 'getCapParent',
				value: function getCapParent(el) {
					return $id('captchaDiv');
				}
			}, {
				key: 'getImgRealName',
				value: function getImgRealName(wrap) {
					return $q('.originalNameLink', wrap).textContent;
				}
			}, {
				key: 'getImgSrcLink',
				value: function getImgSrcLink(img) {
					var el = img.parentNode;
					return el.tagName === 'A' ? el : $q('.originalNameLink', el.parentNode);
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return $parent(img, 'FIGURE');
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return fixBrd(b) + (p > 1 ? p + this.docExt : 'index.html');
				}
			}, {
				key: 'getPNum',
				value: function getPNum(post) {
					return +$q('.deletionCheckBox', post).name.split('-')[2];
				}
			}, {
				key: 'getPostWrap',
				value: function getPostWrap(el, isOp) {
					return isOp ? el : el.parentNode;
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(_ref71) {
					var status = _ref71.status,
					    data = _ref71.data;

					return {
						error: status === 'error' ? data : null,
						postNum: status === 'ok' ? +data : null
					};
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('.deletionCheckBox', op).name.split('-')[1];
				}
			}, {
				key: 'init',
				value: function init() {
					$script('if("autoRefresh" in window) clearInterval(refreshTimer);');
					if (!$q(this.qForm + ' td')) {
						var table = $aBegin($q(this.qForm), '<table><tbody></tbody></table>').firstChild;
						var _els2 = $Q('#fieldName, #fieldEmail, #fieldSubject, #fieldMessage, ' + '#fieldPostingPassword, #divUpload');
						for (var i = 0, _len11 = _els2.length; i < _len11; ++i) {
							$bEnd(table, '<tr><th></th><td></td></tr>').lastChild.appendChild(_els2[i]);
						}
					}
					return false;
				}
			}, {
				key: 'isAjaxStatusOK',
				value: function isAjaxStatusOK(status) {
					return status === 200 || status === 206 || status === 400 || status === 500;
				}
			}, {
				key: 'sendHTML5Post',
				value: function () {
					var _ref72 = _asyncToGenerator( regeneratorRuntime.mark(function _callee21(form, data, needProgress, hasFiles) {
						var _this85 = this;

						var getBase64, getCookies, dataObj, files, i, _len13, file, cookieObj, ajaxParams, xhr;

						return regeneratorRuntime.wrap(function _callee21$(_context26) {
							while (1) {
								switch (_context26.prev = _context26.next) {
									case 0:
										getBase64 = function () {
											var _ref73 = _asyncToGenerator( regeneratorRuntime.mark(function _callee19(file) {
												return regeneratorRuntime.wrap(function _callee19$(_context24) {
													while (1) {
														switch (_context24.prev = _context24.next) {
															case 0:
																return _context24.abrupt('return', new Promise(function (resolve, reject) {
																	var reader = new FileReader();
																	reader.readAsDataURL(file);
																	reader.onload = function () {
																		return resolve(reader.result);
																	};
																	reader.onerror = function (err) {
																		return reject(err);
																	};
																}));

															case 1:
															case 'end':
																return _context24.stop();
														}
													}
												}, _callee19, _this85);
											}));

											return function getBase64(_x81) {
												return _ref73.apply(this, arguments);
											};
										}();

										getCookies = function getCookies() {
											var obj = {};
											var cookies = doc.cookie.split(';');
											for (var i = 0, _len12 = cookies.length; i < _len12; ++i) {
												var parts = cookies[i].split('=');
												obj[parts.shift().trim()] = decodeURI(parts.join('='));
											}
											return obj;
										};

										dataObj = { files: [] };
										files = [];

										data.forEach(function () {
											var _ref74 = _asyncToGenerator( regeneratorRuntime.mark(function _callee20(value, key) {
												return regeneratorRuntime.wrap(function _callee20$(_context25) {
													while (1) {
														switch (_context25.prev = _context25.next) {
															case 0:
																if (key !== 'files') {
																	dataObj[key] = value;
																} else {
																	files.push(value);
																}

															case 1:
															case 'end':
																return _context25.stop();
														}
													}
												}, _callee20, _this85);
											}));

											return function (_x82, _x83) {
												return _ref74.apply(this, arguments);
											};
										}());
										i = 0, _len13 = files.length;

									case 6:
										if (!(i < _len13)) {
											_context26.next = 21;
											break;
										}

										file = files[i];

										if (!file.type) {
											_context26.next = 18;
											break;
										}

										_context26.t0 = dataObj.files;
										_context26.t1 = 'data:' + file.type + ';base64,';
										_context26.next = 13;
										return getBase64(file).then(function (data) {
											return data.split(',')[1];
										});

									case 13:
										_context26.t2 = _context26.sent;
										_context26.t3 = _context26.t1 + _context26.t2;
										_context26.t4 = file.name;
										_context26.t5 = {
											content: _context26.t3,
											name: _context26.t4,
											spoiler: false
										};

										_context26.t0.push.call(_context26.t0, _context26.t5);

									case 18:
										++i;
										_context26.next = 6;
										break;

									case 21:
										cookieObj = getCookies();
										ajaxParams = {
											data: JSON.stringify({
												captchaId: cookieObj.captchaid,
												bypassId: cookieObj.bypass,
												parameters: dataObj,
												auth: { login: cookieObj.login, hash: cookieObj.hash }
											}),
											headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
											method: 'POST'
										};

										if (needProgress && hasFiles) {
											ajaxParams.onprogress = getUploadFunc();
										}
										_context26.prev = 24;
										_context26.next = 27;
										return $ajax('/.api/' + form.action.split('/').pop().replace('.js', ''), ajaxParams);

									case 27:
										xhr = _context26.sent;
										return _context26.abrupt('return', xhr.responseText);

									case 31:
										_context26.prev = 31;
										_context26.t6 = _context26['catch'](24);
										return _context26.abrupt('return', Promise.reject(_context26.t6));

									case 34:
									case 'end':
										return _context26.stop();
								}
							}
						}, _callee21, this, [[24, 31]]);
					}));

					function sendHTML5Post(_x77, _x78, _x79, _x80) {
						return _ref72.apply(this, arguments);
					}

					return sendHTML5Post;
				}()
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha() {
					$script('reloadCaptcha();');
					return null;
				}
			}, {
				key: 'updateSubmitBtn',
				value: function updateSubmitBtn(el) {
					el.textContent = Lng.reply[lang];
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return '.originalNameLink';
				}
			}, {
				key: 'qThread',
				get: function get() {
					return '.opCell';
				}
			}, {
				key: 'css',
				get: function get() {
					return '.de-video-link + div[style="display: inline;"] > .embedButton, .de-parea > hr,\n\t\t\t\t\t.divRefresh, #jsButton, .hideButton, .nameLink, #newPostFieldset, .panelBacklinks,\n\t\t\t\t\tbody > div[style^="display: inline;"] { display: none !important; }\n\t\t\t\t.divPosts { margin: 0 0; }\n\t\t\t\t#formButton { display: initial !important; }\n\t\t\t\t.form-post button, .form-post input, .form-post img { width: initial; }';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ["'''", "''", '__', '~~', '**', '[code'];
				}
			}]);

			return LynxChan;
		}(BaseBoard);

		ibEngines.push(['form[action$="contentActions.js"]', LynxChan]);


		var _0chanHk = function (_BaseBoard6) {
			_inherits(_0chanHk, _BaseBoard6);

			function _0chanHk(prot, dm) {
				_classCallCheck(this, _0chanHk);

				var _this86 = _possibleConstructorReturn(this, (_0chanHk.__proto__ || Object.getPrototypeOf(_0chanHk)).call(this, prot, dm));

				_this86.cReply = 'block post';
				_this86.qDForm = '#content > div > .threads-scroll-spy + div, .threads > div:first-of-type';
				_this86.qForm = '.reply-form';
				_this86.qImgInfo = 'figcaption';
				_this86.qOmitted = 'div[style="margin-left: 25px; font-weight: bold;"]';
				_this86.qOPost = '.post-op';
				_this86.qPostHeader = '.post-header';
				_this86.qPostImg = '.post-img-thumbnail';
				_this86.qPostMsg = '.post-body-message';
				_this86.qPostRef = '.post-id';
				_this86.qRPost = '.block.post:not(.post-op)';

				_this86.docExt = '';
				_this86.JsonBuilder = _0chanPostsBuilder;
				_this86.res = '';
				return _this86;
			}

			_createClass(_0chanHk, [{
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode;
				}
			}, {
				key: 'getJsonApiUrl',
				value: function getJsonApiUrl(brd, num) {
					return '/api/thread?thread=' + num;
				}
			}, {
				key: 'getPNum',
				value: function getPNum(post) {
					return +$q('a[name]', post).name;
				}
			}, {
				key: 'getPostWrap',
				value: function getPostWrap(el) {
					return el.parentNode;
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('a[name]', op).name;
				}
			}, {
				key: 'init',
				value: function init() {
					defaultCfg.postBtnsCSS = 0;
					$del($q('base', doc.head)); 
					$each($Q('a[data-post]'), function (el) {
						return el.href = $q('.post-id > a:nth-of-type(2)', el.parentNode.parentNode.parentNode.previousElementSibling).href.split('#')[0] + '#' + el.getAttribute('data-post');
					});
					return false;
				}
			}, {
				key: 'observeContent',
				value: function observeContent(checkDomains, dataPromise) {
					var initObserver = new MutationObserver(function (mutations) {
						var el = mutations[0].addedNodes[0];
						if (!el || el.id !== 'app') {
							return;
						}
						initObserver.disconnect();
						doc.defaultView.addEventListener('message', function (e) {
							if (e.data !== '0chan-content-done') {
								return;
							}
							if (updater) {
								updater.disableUpdater();
							}
							DelForm.tNums = new Set();
							$each($Q('#de-css, #de-css-dynamic, #de-css-user, #de-svg-icons, #de-thr-navpanel'), $del);
							runMain(checkDomains, dataPromise);
						});
						$script('window.app.$bus.on(\'refreshContentDone\',\n\t\t\t\t\t() => document.defaultView.postMessage(\'0chan-content-done\', \'*\'))');
					});
					initObserver.observe(docBody, { childList: true });
				}
			}, {
				key: 'parseURL',
				value: function parseURL() {
					var url = (window.location.pathname || '').replace(/^\//, '');
					var temp = url.split('/');
					this.b = temp[0];
					this.t = temp[1] ? +temp[1].match(/^\d+/)[0] : 0;
					this.page = 0;
				}
			}, {
				key: 'thrId',
				value: function thrId(op) {
					return +$q('.post-id > a:nth-of-type(2)', op).href.match(/\d+$/);
				}
			}, {
				key: 'qThread',
				get: function get() {
					return 'div[style="margin-top: 20px; margin-bottom: 40px;"] > div, .thread > div';
				}
			}, {
				key: 'css',
				get: function get() {
					return '.post-embed, .post-replied-by, .post-referenced-by { display: none; }\n\t\t\t\t.de-post-btns { float: right; }\n\t\t\t\t#de-main { z-index: 1; position: relative; }\n\t\t\t\t#de-main > hr { display: none; }\n\t\t\t\t.de-pview { margin-left: -250px !important; }\n\t\t\t\tlabel { font-weight: initial; }\n\t\t\t\thr { margin: 4px; border-top: 1px solid #bbb; }';
				}
			}]);

			return _0chanHk;
		}(BaseBoard);

		ibDomains['0chan.hk'] = _0chanHk;

		var _02chSu = function (_Kusaba) {
			_inherits(_02chSu, _Kusaba);

			function _02chSu(prot, dm) {
				_classCallCheck(this, _02chSu);

				var _this87 = _possibleConstructorReturn(this, (_02chSu.__proto__ || Object.getPrototypeOf(_02chSu)).call(this, prot, dm));

				_this87.hasCatalog = true;

				_this87._capUpdPromise = null;
				return _this87;
			}

			_createClass(_02chSu, [{
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					return cap.updateHelper('/captcha_update.php', function (xhr) {
						cap.parentEl.innerHTML = xhr.responseText;
						cap.textEl = $id('recaptcha_response_field');
						cap.initImage($q('img', cap.parentEl));
						cap.initTextEl();
					});
				}
			}]);

			return _02chSu;
		}(Kusaba);

		ibDomains['02ch.su'] = _02chSu;

		var _2chan = function (_BaseBoard7) {
			_inherits(_2chan, _BaseBoard7);

			function _2chan(prot, dm) {
				_classCallCheck(this, _2chan);

				var _this88 = _possibleConstructorReturn(this, (_2chan.__proto__ || Object.getPrototypeOf(_2chan)).call(this, prot, dm));

				_this88.qDForm = 'form:not([enctype])';
				_this88.qForm = 'form[enctype]';
				_this88.qFormRedir = null;
				_this88.qFormRules = '.chui';
				_this88.qOmitted = 'font[color="#707070"]';
				_this88.qPostImg = 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img';
				_this88.qPostRef = '.del';
				_this88.qRPost = 'td:nth-child(2)';

				_this88.docExt = '.htm';
				_this88.formParent = 'resto';
				return _this88;
			}

			_createClass(_2chan, [{
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return fixBrd(b) + (p > 0 ? p + this.docExt : 'futaba.htm');
				}
			}, {
				key: 'getPNum',
				value: function getPNum(post) {
					return +$q('input', post).name;
				}
			}, {
				key: 'getPostElOfEl',
				value: function getPostElOfEl(el) {
					while (el && el.tagName !== 'TD' && !el.hasAttribute('de-thread')) {
						el = el.parentElement;
					}
					return el;
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('input[type="checkbox"]', op).name.match(/\d+/);
				}
			}, {
				key: 'init',
				value: function init() {
					$del($q('base', doc.head)); 
					return false;
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return 'a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]';
				}
			}, {
				key: 'qThread',
				get: function get() {
					return '.thre';
				}
			}, {
				key: 'css',
				get: function get() {
					return '.ftbl { width: auto; margin: 0; }\n\t\t\t\t.reply { background: #f0e0d6; }\n\t\t\t\tspan { font-size: inherit; }';
				}
			}]);

			return _2chan;
		}(BaseBoard);

		ibDomains['2chan.net'] = _2chan;

		var _2chRip = function (_BaseBoard8) {
			_inherits(_2chRip, _BaseBoard8);

			function _2chRip(prot, dm) {
				_classCallCheck(this, _2chRip);

				var _this89 = _possibleConstructorReturn(this, (_2chRip.__proto__ || Object.getPrototypeOf(_2chRip)).call(this, prot, dm));

				_this89.ru = true;

				_this89._capUpdPromise = null;
				return _this89;
			}

			_createClass(_2chRip, [{
				key: 'init',
				value: function init() {
					var el = $id('submit_button');
					if (el) {
						$del(el.previousElementSibling);
						$replace(el, '<input type="submit" id="submit" name="submit" value="Ответ">');
					}
					return false;
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					return cap.updateHelper('/cgi/captcha?task=get_id', function (_ref75) {
						var id = _ref75.responseText;

						$id('imgcaptcha').src = '/cgi/captcha?task=get_image&id=' + id;
						$id('captchaid').value = id;
					});
				}
			}]);

			return _2chRip;
		}(BaseBoard);

		ibDomains['2ch.rip'] = _2chRip;
		ibDomains['dva-ch.com'] = _2chRip;

		var _2chRu = function (_BaseBoard9) {
			_inherits(_2chRu, _BaseBoard9);

			function _2chRu(prot, dm) {
				_classCallCheck(this, _2chRu);

				var _this90 = _possibleConstructorReturn(this, (_2chRu.__proto__ || Object.getPrototypeOf(_2chRu)).call(this, prot, dm));

				_this90.qPages = 'table[border="1"] td > a:last-of-type';

				_this90.docExt = '.html';
				_this90.hasPicWrap = true;
				_this90.jsonSubmit = true;
				_this90.markupBB = true;
				_this90.multiFile = true;
				_this90.ru = true;

				_this90._qTable = 'table:not(.postfiles)';
				return _this90;
			}

			_createClass(_2chRu, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '><input type="file" name="file"></div>';
					el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
				}
			}, {
				key: 'fixHTMLHelper',
				value: function fixHTMLHelper(str) {
					return str.replace(/data-original="\//g, 'src="/');
				}
			}, {
				key: 'getCaptchaSrc',
				value: function getCaptchaSrc() {
					return '/' + this.b + '/captcha.fpl?' + Math.random();
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode;
				}
			}, {
				key: 'getOmitted',
				value: function getOmitted(el, len) {
					var txt = void 0;
					return el && (txt = el.textContent) ? +txt.match(/\d+/) - len : 1;
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return '' + fixBrd(b) + (p > 0 ? p : 0) + '.memhtml';
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(json) {
					var error = null;
					var postNum = null;
					if (json.post) {
						postNum = +json.post;
					} else {
						error = Lng.error[lang];
						if (json.error) {
							error += ':\n' + json.error.text;
						}
					}
					return { error: error, postNum: postNum };
				}
			}, {
				key: 'init',
				value: function init() {
					var btnEl = $q('#postform input[type="button"]');
					if (btnEl) {
						$replace(btnEl, '<input type="submit" value="Отправить">');
					}
					var dFormEl = $q(this.qDForm);
					$each($Q('input[type="hidden"]', dFormEl), $del);
					dFormEl.appendChild($q('.userdelete'));
					return false;
				}
			}, {
				key: 'qThread',
				get: function get() {
					return '.threadz';
				}
			}, {
				key: 'css',
				get: function get() {
					return 'span[id$="_display"], #fastload { display: none; }';
				}
			}, {
				key: 'initCaptcha',
				get: function get() {
					$id('captchadiv').innerHTML = '<img src="' + this.getCaptchaSrc() + '" style="vertical-align: bottom;" id="imgcaptcha">';
					return null;
				}
			}]);

			return _2chRu;
		}(BaseBoard);

		ibDomains['2--ch.ru'] = _2chRu;
		ibDomains['2-ch.su'] = _2chRu;

		var _410chanOrg = function (_Kusaba2) {
			_inherits(_410chanOrg, _Kusaba2);

			function _410chanOrg(prot, dm) {
				_classCallCheck(this, _410chanOrg);

				var _this91 = _possibleConstructorReturn(this, (_410chanOrg.__proto__ || Object.getPrototypeOf(_410chanOrg)).call(this, prot, dm));

				_this91.qFormRedir = 'input#noko';
				_this91.qPages = '.pgstbl > table > tbody > tr > td:nth-child(2)';

				_this91.ru = true;
				_this91.hasCatalog = true;
				_this91.markupBB = false;
				_this91.timePattern = 'dd+nn+yyyy++w++hh+ii+ss';

				_this91._capUpdPromise = null;
				return _this91;
			}

			_createClass(_410chanOrg, [{
				key: 'fixHTML',
				value: function fixHTML(data, isForm) {
					var el = _get(_410chanOrg.prototype.__proto__ || Object.getPrototypeOf(_410chanOrg.prototype), 'fixHTML', this).call(this, data, isForm);
					if (aib.t) {
						try {
							var backBtn = $q(this.qThread + ' > span[style]', el);
							if (backBtn) {
								var modBtn = $q('a[accesskey="m"]', el);
								$after(backBtn.parentElement, backBtn);
								[modBtn.previousSibling, modBtn, modBtn.nextSibling].forEach(function (el) {
									return $after(backBtn.lastChild, el);
								});
							}
						} catch (err) {}
					}
					return el;
				}
			}, {
				key: 'getCaptchaSrc',
				value: function getCaptchaSrc(src) {
					return src.replace(/\?[^?]+$|$/, '?board=' + aib.b + '&' + Math.random());
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					var el = $q('.filetitle', post);
					return el && el.textContent.includes('\u21E9');
				}
			}, {
				key: 'init',
				value: function init() {
					_get(_410chanOrg.prototype.__proto__ || Object.getPrototypeOf(_410chanOrg.prototype), 'init', this).call(this);
					$bEnd(docBody, '<span id="faptcha_input" style="display: none"></span>');
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					var _this92 = this;

					return cap.updateHelper('/api_adaptive.php?board=' + this.b, function (xhr) {
						if (xhr.responseText === '1') {
							cap.textEl.disabled = true;
							setTimeout(function () {
								return cap.textEl.value = 'проезд оплачен';
							}, 0);
							return;
						}
						cap.textEl.disabled = false;
						cap.textEl.value = '';
						var img = $q('img', cap.parentEl);
						var src = img.getAttribute('src');
						img.src = '';
						img.src = _this92.getCaptchaSrc(src);
					});
				}
			}, {
				key: 'capLang',
				get: function get() {
					return 0;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(_410chanOrg.prototype.__proto__ || Object.getPrototypeOf(_410chanOrg.prototype), 'css', this) + '\n\t\t\t\t#resizer { display: none; }\n\t\t\t\tbody { margin: 0 }\n\t\t\t\tform > span { margin-top: 5px; }\n\t\t\t\tform > .de-thr-buttons { float: left; }\n\t\t\t\t.de-thr-hid { display: inherit; }\n\t\t\t\t.topmenu { position: static; }';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['**', '*', '__', '^^', '%%', '`'];
				}
			}]);

			return _410chanOrg;
		}(Kusaba);

		ibDomains['410chan.org'] = _410chanOrg;

		var _4chanOrg = function (_BaseBoard10) {
			_inherits(_4chanOrg, _BaseBoard10);

			function _4chanOrg(prot, dm) {
				_classCallCheck(this, _4chanOrg);

				var _this93 = _possibleConstructorReturn(this, (_4chanOrg.__proto__ || Object.getPrototypeOf(_4chanOrg)).call(this, prot, dm));

				_this93.fch = true;

				_this93.cReply = 'post reply';
				_this93.qBan = 'strong[style="color: red;"]';
				_this93.qClosed = '.archivedIcon';
				_this93.qDelBut = '.deleteform > input[type="submit"]';
				_this93.qError = '#errmsg';
				_this93.qForm = 'form[name="post"]';
				_this93.qFormRedir = null;
				_this93.qImgInfo = '.fileText';
				_this93.qOmitted = '.summary.desktop';
				_this93.qOPost = '.op';
				_this93.qPages = '.pagelist > .pages:not(.cataloglink) > a:last-of-type';
				_this93.qPostHeader = '.postInfo';
				_this93.qPostImg = '.fileThumb > img:not(.fileDeletedRes)';
				_this93.qPostName = '.name';
				_this93.qPostRef = '.postInfo > .postNum';
				_this93.qPostSubj = '.subject';

				_this93.anchor = '#p';
				_this93.docExt = '';
				_this93.firstPage = 1;
				_this93.formParent = 'resto';
				_this93.hasAltCaptcha = true;
				_this93.hasCatalog = true;
				_this93.hasTextLinks = true;
				_this93.JsonBuilder = _4chanPostsBuilder;
				_this93.res = 'thread/';
				_this93.timePattern = 'nn+dd+yy+w+hh+ii-?s?s?';

				_this93._qTable = '.replyContainer';
				return _this93;
			}

			_createClass(_4chanOrg, [{
				key: 'fixDeadLinks',
				value: function fixDeadLinks(str) {
					return str.replace(/<span class="deadlink">&gt;&gt;(\d+)<\/span>/g, '<a class="de-ref-del" href="#p$1">&gt;&gt;$1</a>');
				}
			}, {
				key: 'fixHTMLHelper',
				value: function fixHTMLHelper(str) {
					return str.replace(/<span>([^<]+)(?:<\/?wbr>)?([^<]+)<\/span> \[<a [^>]+>Embed<\/a>\]/g, '$1$2').replace(/<\/?wbr>/g, '').replace(/ \(OP\)<\/a/g, '</a');
				}
			}, {
				key: 'getImgInfo',
				value: function getImgInfo(wrap) {
					var el = $q(this.qImgInfo, wrap);
					return el ? el.lastChild.textContent : '';
				}
			}, {
				key: 'getJsonApiUrl',
				value: function getJsonApiUrl(brd, tNum) {
					return '//a.4cdn.org/' + brd + '/thread/' + tNum + '.json';
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode;
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return fixBrd(b) + (p > 1 ? p : '');
				}
			}, {
				key: 'getPostWrap',
				value: function getPostWrap(el) {
					return el.parentNode;
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					return !!$q('.id_Heaven, .useremail[href^="mailto:sage"]', post);
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(data) {
					var error = null;
					var postNum = null;
					var errEl = $q('#errmsg', data);
					if (errEl) {
						error = errEl.textContent;
					} else {
						try {
							postNum = +$q('h1', data).nextSibling.textContent.match(/no:(\d+)/)[1];
						} catch (err) {}
					}
					return { error: error, postNum: postNum };
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('input[type="checkbox"]', op).name.match(/\d+/);
				}
			}, {
				key: 'init',
				value: function init() {
					Cfg.findImgFile = 0;
					Cfg.txtBtnsLoc = 0;
					var el = $id('styleSelector');
					if (el) {
						el.setAttribute('onchange', 'setActiveStyleSheet(this.value);');
					}
					return false;
				}
			}, {
				key: 'qFormSubj',
				get: function get() {
					return 'input[name="sub"]';
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return '.fileText > a';
				}
			}, {
				key: 'css',
				get: function get() {
					return '.backlink, #blotter, .extButton, hr.desktop, .navLinks, .postMenuBtn,\n\t\t\t\t\t#togglePostFormLink { display: none !important; }\n\t\t\t\t#bottomReportBtn { display: initial !important; }\n\t\t\t\t#g-recaptcha { height: initial; }\n\t\t\t\t.postForm { display: table !important; width: auto !important; }\n\t\t\t\ttextarea { margin-right: 0 !important; }\n\t\t\t\t' + (Cfg.widePosts ? '.sideArrows { display: none; }' : '');
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['', '', '', '', $q('input[type="checkbox"][name="spoiler"]') ? '[spoiler' : ''];
				}
			}, {
				key: 'updateCaptcha',
				get: function get() {
					var value = null;
					var tr = $id('captchaFormPart');
					if (tr) {
						var capClick = $bEnd(docBody, '<div onclick="initRecaptcha();"></div>');
						value = function value() {
							if (Cfg.altCaptcha) {
								$id('g-recaptcha').innerHTML = $q('noscript', tr).innerHTML;
							} else {
								$replace($id('g-recaptcha'), '<div id="g-recaptcha"></div>');
								capClick.click();
							}
							tr.removeAttribute('onclick');
							return null;
						};
					}
					Object.defineProperty(this, 'updateCaptcha', { value: value });
					return value;
				}
			}]);

			return _4chanOrg;
		}(BaseBoard);

		ibDomains['4chan.org'] = _4chanOrg;

		var _8chNet = function (_Vichan) {
			_inherits(_8chNet, _Vichan);

			function _8chNet(prot, dm) {
				_classCallCheck(this, _8chNet);

				var _this94 = _possibleConstructorReturn(this, (_8chNet.__proto__ || Object.getPrototypeOf(_8chNet)).call(this, prot, dm));

				_this94._8ch = true;

				_this94._capUpdPromise = null;
				return _this94;
			}

			_createClass(_8chNet, [{
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					$q('td', cap.parentEl).innerHTML = '<input placeholder="' + Lng.cap[lang] + '" class="captcha_text' + '" type="text" name="captcha_text" size="25" maxlength="8" autocomplete="off">\n\t\t\t\t<input class="captcha_cookie de-input-hidden" name="captcha_cookie" type="hidden">\n\t\t\t\t<div class="captcha_html"></div>';
					cap.textEl = $q('.captcha_text', cap.parentEl);
					return this.updateCaptcha(cap, true);
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					return cap.updateHelper('/8chan-captcha/entrypoint.php?mode=get&extra=abcdefghijklmnopqrstuvwxyz', function (xhr) {
						var obj = JSON.parse(xhr.responseText);
						$q('.captcha_cookie', cap.parentEl).value = obj.cookie;
						$q('.captcha_html', cap.parentEl).innerHTML = obj.captchahtml;
						var img = $q('img', cap.parentEl);
						if (img) {
							cap.initImage(img);
						}
					});
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(_8chNet.prototype.__proto__ || Object.getPrototypeOf(_8chNet.prototype), 'css', this) + '\n\t\t\t\tinput.delete, #post-moderation-fields { display: initial !important; }';
				}
			}]);

			return _8chNet;
		}(Vichan);

		ibDomains['8ch.net'] = _8chNet;
		ibDomains['oxwugzccvk3dk6tj.onion'] = _8chNet;

		var _55chan = function (_chNet) {
			_inherits(_55chan, _chNet);

			function _55chan(prot, dm) {
				_classCallCheck(this, _55chan);

				var _this95 = _possibleConstructorReturn(this, (_55chan.__proto__ || Object.getPrototypeOf(_55chan)).call(this, prot, dm));

				_this95._8ch = null;

				_this95.qFormRules = '.regras';
				return _this95;
			}

			_createClass(_55chan, [{
				key: 'qThread',
				get: function get() {
					return 'div[data-board]';
				}
			}]);

			return _55chan;
		}(_8chNet);

		ibDomains['55chan.org'] = _55chan;

		var _7chanOrg = function (_BaseBoard11) {
			_inherits(_7chanOrg, _BaseBoard11);

			function _7chanOrg() {
				_classCallCheck(this, _7chanOrg);

				return _possibleConstructorReturn(this, (_7chanOrg.__proto__ || Object.getPrototypeOf(_7chanOrg)).apply(this, arguments));
			}

			_createClass(_7chanOrg, [{
				key: 'init',
				value: function init() {
					return true;
				}
			}]);

			return _7chanOrg;
		}(BaseBoard);

		ibDomains['7chan.org'] = _7chanOrg;

		var Arhivach = function (_BaseBoard12) {
			_inherits(Arhivach, _BaseBoard12);

			function Arhivach(prot, dm) {
				_classCallCheck(this, Arhivach);

				var _this97 = _possibleConstructorReturn(this, (Arhivach.__proto__ || Object.getPrototypeOf(Arhivach)).call(this, prot, dm));

				_this97.cReply = 'post';
				_this97.qDForm = 'body > .container-fluid';
				_this97.qPostHeader = '.post_head';
				_this97.qPostImg = '.post_image > img';
				_this97.qPostMsg = '.post_comment_body';
				_this97.qPostRef = '.post_id, .post_head > b';
				_this97.qPostSubj = '.post_subject';
				_this97.qRPost = '.post:not(:first-child):not([postid=""])';

				_this97.docExt = '';
				_this97.hasOPNum = true;
				_this97.res = 'thread/';
				return _this97;
			}

			_createClass(Arhivach, [{
				key: 'fixHTML',
				value: function fixHTML(data, isForm) {
					var el = _get(Arhivach.prototype.__proto__ || Object.getPrototypeOf(Arhivach.prototype), 'fixHTML', this).call(this, data, isForm);
					var links = $Q('.expand_image', el);
					for (var i = 0, _len14 = links.length; i < _len14; ++i) {
						var link = links[i];
						link.href = link.getAttribute('onclick').match(/https?:\/[^']+/)[0];
						link.removeAttribute('onclick');
					}
					return el;
				}
			}, {
				key: 'getImgInfo',
				value: function getImgInfo(wrap) {
					return wrap.title;
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return $parent(img, 'A').parentNode;
				}
			}, {
				key: 'getOp',
				value: function getOp(el) {
					return $q('.post:first-child', el);
				}
			}, {
				key: 'getPNum',
				value: function getPNum(post) {
					return +post.getAttribute('postid');
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					return !!$q('.poster_sage', post);
				}
			}, {
				key: 'getThrUrl',
				value: function getThrUrl() {
					return $q('link[rel="canonical"]', doc.head).href;
				}
			}, {
				key: 'getTNum',
				value: function getTNum(el) {
					return this.getPNum(this.getOp(el));
				}
			}, {
				key: 'init',
				value: function init() {
					var _this98 = this;

					defaultCfg.ajaxUpdThr = 0;
					setTimeout(function () {
						var delPosts = $Q('.post_deleted');
						for (var i = 0, _len15 = delPosts.length; i < _len15; ++i) {
							var post = pByNum.get(_this98.getPNum(delPosts[i]));
							if (post) {
								post.thr.deletePosts(post, false, false);
							}
						}
					}, 0);
					return false;
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return '.img_filename';
				}
			}, {
				key: 'qThread',
				get: function get() {
					return '.thread_inner';
				}
			}, {
				key: 'css',
				get: function get() {
					return '.media-expand-button, .post_replies, .post_num, .poster_sage { display: none !important; }\n\t\t\t\t.de-cfg-inptxt, .de-cfg-label, .de-cfg-select { display: inline; width: auto;\n\t\t\t\t\theight: auto !important; font: 13px/15px arial !important; }\n\t\t\t\t.de-cfg-label.de-block { display: block; }\n\t\t\t\t.post { overflow-x: auto !important; }\n\t\t\t\t.thread_inner img.de-fullimg { max-width: 100% !important; max-height: 100% !important; }';
				}
			}, {
				key: 'isArchived',
				get: function get() {
					return true;
				}
			}]);

			return Arhivach;
		}(BaseBoard);

		ibDomains['arhivach.org'] = Arhivach;

		var Brchan = function (_Vichan2) {
			_inherits(Brchan, _Vichan2);

			function Brchan(prot, dm) {
				_classCallCheck(this, Brchan);

				var _this99 = _possibleConstructorReturn(this, (Brchan.__proto__ || Object.getPrototypeOf(Brchan)).call(this, prot, dm));

				_this99.qPostTrip = '.poster_id';

				_this99.markupBB = true;
				return _this99;
			}

			_createClass(Brchan, [{
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode;
				}
			}, {
				key: 'init',
				value: function init() {
					_get(Brchan.prototype.__proto__ || Object.getPrototypeOf(Brchan.prototype), 'init', this).call(this);
					if (Cfg.ajaxUpdThr) {
						locStorage.auto_thread_update = false;
					}
					return false;
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['b', 'i', 'u', 's', 'spoiler', 'code'];
				}
			}]);

			return Brchan;
		}(Vichan);

		ibDomains['brchan.org'] = Brchan;

		var Lolifox = function (_Brchan) {
			_inherits(Lolifox, _Brchan);

			function Lolifox() {
				_classCallCheck(this, Lolifox);

				return _possibleConstructorReturn(this, (Lolifox.__proto__ || Object.getPrototypeOf(Lolifox)).apply(this, arguments));
			}

			_createClass(Lolifox, [{
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode;
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					return !!$q('.sage', post);
				}
			}, {
				key: 'init',
				value: function init() {
					_get(Lolifox.prototype.__proto__ || Object.getPrototypeOf(Lolifox.prototype), 'init', this).call(this);
					defaultCfg.timePattern = 'dd+nn+yy+++++hh+ii+ss';
					defaultCfg.timeRPattern = '_d/_n/_y(_w)_h:_i:_s';
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Lolifox.prototype.__proto__ || Object.getPrototypeOf(Lolifox.prototype), 'css', this) + '\r\n\t' + (Cfg.noSpoilers ? 'span.spoiler, span.spoiler:hover { ' + (Cfg.noSpoilers === 1 ? 'color: #F5F5F5 !important; background-color: #888 !important' : 'color: inherit !important') + '; transition: none !important; }' : '') + '\n\t\t\t\t#thread-interactions { display: none; }\n\t\t\t\t.reflink::after { content: "" !important; }';
				}
			}]);

			return Lolifox;
		}(Brchan);

		ibDomains['lolifox.org'] = Lolifox;
		ibDomains['brchanansdnhvvnm.onion'] = Lolifox;

		var Diochan = function (_Kusaba3) {
			_inherits(Diochan, _Kusaba3);

			function Diochan(prot, dm) {
				_classCallCheck(this, Diochan);

				var _this101 = _possibleConstructorReturn(this, (Diochan.__proto__ || Object.getPrototypeOf(Diochan)).call(this, prot, dm));

				_this101.multiFile = true;
				return _this101;
			}

			_createClass(Diochan, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '><input type="file" name="imagefile[]"></div>';
					el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(2);
					$each($Q('.file2, .file3, .fileurl1, .fileurl2, .fileurl3'), $del);
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Diochan.prototype.__proto__ || Object.getPrototypeOf(Diochan.prototype), 'css', this) + '\n\t\t\t\t.resize, .postblock { display: none; }';
				}
			}]);

			return Diochan;
		}(Kusaba);

		ibDomains['diochan.com'] = Diochan;

		var Dobrochan = function (_BaseBoard13) {
			_inherits(Dobrochan, _BaseBoard13);

			function Dobrochan(prot, dm) {
				_classCallCheck(this, Dobrochan);

				var _this102 = _possibleConstructorReturn(this, (Dobrochan.__proto__ || Object.getPrototypeOf(Dobrochan)).call(this, prot, dm));

				_this102.dobr = true;

				_this102.qClosed = 'img[src="/images/locked.png"]';
				_this102.qDForm = 'form[action*="delete"]';
				_this102.qError = '.post-error, h2';
				_this102.qFormRedir = 'select[name="goto"]';
				_this102.qImgInfo = '.fileinfo';
				_this102.qOmitted = '.abbrev > span:last-of-type';
				_this102.qPages = '.pages > tbody > tr > td';
				_this102.qPostMsg = '.postbody';
				_this102.qPostSubj = '.replytitle';
				_this102.qTrunc = '.abbrev > span:first-of-type';

				_this102.anchor = '#i';
				_this102.formParent = 'thread_id';
				_this102.hasPicWrap = true;
				_this102.JsonBuilder = DobrochanPostsBuilder;
				_this102.multiFile = true;
				_this102.ru = true;
				_this102.timePattern = 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?';
				return _this102;
			}

			_createClass(Dobrochan, [{
				key: 'deleteTruncMsg',
				value: function deleteTruncMsg(post, el, isInit) {
					[el.previousSibling, el.nextSibling, el].forEach($del);
					if (isInit) {
						$replace(post.msg.firstElementChild, $q('.alternate > div', post.el));
					} else {
						var sRunner = new SpellsRunner();
						post.updateMsg($q('.alternate > div', post.el), sRunner);
						sRunner.endSpells();
					}
				}
			}, {
				key: 'disableRedirection',
				value: function disableRedirection(el) {
					$hide($parent(el, 'TR'));
					el.selectedIndex = 1;
				}
			}, {
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					$each($Q('input[type="file"]', el), function (el) {
						return el.removeAttribute('onchange');
					});
					el.firstElementChild.value = 1;
				}
			}, {
				key: 'getImgSrcLink',
				value: function getImgSrcLink(img) {
					var el = img.parentNode;
					return el.tagName === 'A' ? el : $q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					var el = img.parentNode;
					return el.tagName === 'A' ? (el.previousElementSibling ? el : el.parentNode).parentNode : img.previousElementSibling ? el : el.parentNode;
				}
			}, {
				key: 'getJsonApiUrl',
				value: function getJsonApiUrl(brd, tNum) {
					return '/api/thread/' + brd + '/' + tNum + '/all.json?new_format&message_html&board';
				}
			}, {
				key: 'getOmitted',
				value: function getOmitted(el) {
					while (el) {
						var m = el.textContent.match(/(\d+) posts are omitted/);
						if (m) {
							return +m[1] + 1;
						}
						el = el.previousElementSibling;
					}
					return 1;
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return fixBrd(b) + (p > 0 ? p + this.docExt : 'index.xhtml');
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('a[name]', op).name.match(/\d+/);
				}
			}, {
				key: 'init',
				value: function init() {
					if (window.location.pathname === '/settings') {
						$q('input[type="button"]').addEventListener('click', function () {
							return readCfg().then(function () {
								return saveCfg('__hanarating', $id('rating').value);
							});
						});
						return true;
					}
					$script('window.UploadProgress = Function.prototype');
					var el = $id('postform');
					if (el) {
						el.appendChild($q('.rules'));
					}
					return false;
				}
			}, {
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					if (!cap.textEl) {
						$hide($q('img', cap.parentEl));
						$show(cap.parentEl);
					}
					return null;
				}
			}, {
				key: 'insertYtPlayer',
				value: function insertYtPlayer(msg, playerHtml) {
					var prev = msg.previousElementSibling;
					return $bBegin(prev.tagName === 'BR' ? prev : msg, playerHtml);
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap, isErr) {
					var img = $q('img', cap.parentEl);
					if (!img) {
						return null;
					}
					if (cap.textEl) {
						var src = img.getAttribute('src').split('/').slice(0, -1).join('/') + ('/' + Date.now() + '.png');
						img.src = '';
						img.src = src;
						cap.textEl.value = '';
					} else if (isErr) {
						var el = img.parentNode;
						el.innerHTML = '';
						el.appendChild(img);
						img.insertAdjacentHTML('afterend', '<br><input placeholder="Капча" autocomplete="off"' + ' id="captcha" name="captcha" size="35" type="text">');
						$show(img);
						cap.isAdded = false;
						cap.originHTML = cap.parentEl.innerHTML;
						cap.addCaptcha();
					}
					return null;
				}
			}, {
				key: 'css',
				get: function get() {
					return '.de-video-obj-inline { margin-left: 5px; }\n\t\t\t\t.delete > img, .popup, .reply_, .search_google, .search_iqdb { display: none; }\n\t\t\t\t.delete { background: none; }\n\t\t\t\t.delete_checkbox { position: static !important; }';
				}
			}]);

			return Dobrochan;
		}(BaseBoard);

		ibDomains['dobrochan.com'] = Dobrochan;
		ibDomains['dobrochan.org'] = Dobrochan;
		ibDomains['dobrochan.ru'] = Dobrochan;

		var EndChan = function (_LynxChan) {
			_inherits(EndChan, _LynxChan);

			function EndChan(prot, dm) {
				_classCallCheck(this, EndChan);

				var _this103 = _possibleConstructorReturn(this, (EndChan.__proto__ || Object.getPrototypeOf(EndChan)).call(this, prot, dm));

				_this103.qTrunc = '.contentOmissionIndicator > p';
				return _this103;
			}

			_createClass(EndChan, [{
				key: 'init',
				value: function init() {
					_get(EndChan.prototype.__proto__ || Object.getPrototypeOf(EndChan.prototype), 'init', this).call(this);
					$each($Q('.imgLink > img[src^="/.youtube/"]'), function (el) {
						return $del($parent(el, 'FIGURE'));
					});
					$each($Q('.youtube_wrapper'), function (el) {
						var src = $q('a', el).href;
						$del($bBegin(el, '<a href="' + src + '">' + src + '</a>').nextSibling);
					});
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(EndChan.prototype.__proto__ || Object.getPrototypeOf(EndChan.prototype), 'css', this) + '\n\t\t\t\t.bottomNav, .delLink, #expandAll, .hidePost, .hideThread, .linkLast50,\n\t\t\t\t\t.linkPreview, #modeBanner, .watchButton { display: none !important; }\n\t\t\t\t.de-cfg-label { display: initial !important; }\n\t\t\t\t#de-main, .de-pview { font-size: 75%; }';
				}
			}]);

			return EndChan;
		}(LynxChan);

		ibDomains['endchan.xyz'] = EndChan;

		var Ernstchan = function (_BaseBoard14) {
			_inherits(Ernstchan, _BaseBoard14);

			function Ernstchan(prot, dm) {
				_classCallCheck(this, Ernstchan);

				var _this104 = _possibleConstructorReturn(this, (Ernstchan.__proto__ || Object.getPrototypeOf(Ernstchan)).call(this, prot, dm));

				_this104.cReply = 'post';
				_this104.qError = '.error';
				_this104.qFormRedir = 'input[name="gb2"][value="thread"]';
				_this104.qOPost = '.thread_OP';
				_this104.qPages = '.pagelist > li:nth-last-child(2)';
				_this104.qPostHeader = '.post_head';
				_this104.qPostMsg = '.text';
				_this104.qPostSubj = '.subject';
				_this104.qPostTrip = '.tripcode';
				_this104.qRPost = '.thread_reply';
				_this104.qTrunc = '.tldr';

				_this104.docExt = '';
				_this104.firstPage = 1;
				_this104.markupBB = true;
				_this104.multiFile = true;
				_this104.res = 'thread/';
				return _this104;
			}

			_createClass(Ernstchan, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '><input name="file" type="file"></div>';
					el.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode;
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return p > 1 ? fixBrd(b) + 'page/' + p : fixBrd(b);
				}
			}, {
				key: 'getPostElOfEl',
				value: function getPostElOfEl(el) {
					while (el && !nav.matchesSelector(el, '.post')) {
						el = el.parentElement;
					}
					return el.parentNode;
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					return !!$q('.sage', post);
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return '.filename > a';
				}
			}, {
				key: 'css',
				get: function get() {
					return '.content > hr, .de-parea > hr, .de-pview > .doubledash { display: none !important }\n\t\t\t\t.de-pview > .post { margin-left: 0; border: none; }\n\t\t\t\t#de-win-reply { float:left; margin-left:2em }\n\t\t\t\t' + (Cfg.widePosts ? '.doubledash { display: none; }\n\t\t\t\t\t.thread_reply { float: none; }' : '');
				}
			}]);

			return Ernstchan;
		}(BaseBoard);

		ibDomains['ernstchan.com'] = Ernstchan;

		var Iichan = function (_BaseBoard15) {
			_inherits(Iichan, _BaseBoard15);

			function Iichan(prot, dm) {
				_classCallCheck(this, Iichan);

				var _this105 = _possibleConstructorReturn(this, (Iichan.__proto__ || Object.getPrototypeOf(Iichan)).call(this, prot, dm));

				_this105.iichan = true;

				_this105.hasCatalog = true;
				return _this105;
			}

			_createClass(Iichan, [{
				key: 'getImgRealName',
				value: function getImgRealName(wrap) {
					return $q('.filesize > em', wrap).textContent.split(',')[2] || _get(Iichan.prototype.__proto__ || Object.getPrototypeOf(Iichan.prototype), 'getImgRealName', this).call(this, wrap);
				}
			}, {
				key: 'init',
				value: function init() {
					defaultCfg.addSageBtn = 0;
					$script('highlight = Function.prototype');
					return false;
				}
			}, {
				key: 'qFormMail',
				get: function get() {
					return 'input[name="nya2"]';
				}
			}, {
				key: 'qFormName',
				get: function get() {
					return 'td > input[name="nya1"]';
				}
			}, {
				key: 'qFormSubj',
				get: function get() {
					return 'input[name="nya3"]';
				}
			}, {
				key: 'catalogUrl',
				get: function get() {
					return this.prot + '//' + this.host + '/' + this.b + '/catalogue.html';
				}
			}, {
				key: 'css',
				get: function get() {
					return (!this.t ? '' : '#de-main { margin-top: -37px; } .logo { margin-bottom: 14px; }') + '\n\t\t\t.iichan-hide-thread-btn { display: none; }\n\t\t\t.replypage div[id^="thread"] span.reflink::after { content: none; }';
				}
			}, {
				key: 'isArchived',
				get: function get() {
					return this.b.includes('/arch');
				}
			}]);

			return Iichan;
		}(BaseBoard);

		ibDomains['iichan.hk'] = Iichan;

		var Krautchan = function (_BaseBoard16) {
			_inherits(Krautchan, _BaseBoard16);

			function Krautchan(prot, dm) {
				_classCallCheck(this, Krautchan);

				var _this106 = _possibleConstructorReturn(this, (Krautchan.__proto__ || Object.getPrototypeOf(Krautchan)).call(this, prot, dm));

				_this106.cReply = 'postreply';
				_this106.qBan = '.ban_mark';
				_this106.qClosed = 'img[src="/images/locked.gif"]';
				_this106.qDForm = 'form[action*="delete"]';
				_this106.qError = '.message_text';
				_this106.qFormRedir = 'input#forward_thread';
				_this106.qFormRules = '#rules_row';
				_this106.qImgInfo = '.fileinfo';
				_this106.qOmitted = '.omittedinfo';
				_this106.qPages = 'table[border="1"] > tbody > tr > td > a:nth-last-child(2) + a';
				_this106.qPostHeader = '.postheader';
				_this106.qPostImg = 'img[id^="thumbnail_"]';
				_this106.qPostRef = '.postnumber';
				_this106.qPostSubj = '.postsubject';
				_this106.qRPost = '.postreply';
				_this106.qTrunc = 'p[id^="post_truncated"]';

				_this106.hasCatalog = true;
				_this106.hasPicWrap = true;
				_this106.hasTextLinks = true;
				_this106.markupBB = true;
				_this106.multiFile = true;
				_this106.res = 'thread-';
				_this106.timePattern = 'yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?';
				return _this106;
			}

			_createClass(Krautchan, [{
				key: 'fixDeadLinks',
				value: function fixDeadLinks(str) {
					return str.replace(/<span class="invalidquotelink">&gt;&gt;(\d+)<\/span>/g, '<a class="de-ref-del" href="#$1">&gt;&gt;$1</a>');
				}
			}, {
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					el.innerHTML = Array.from({ length: 4 }, function (val, i) {
						return '<div' + (i ? ' style="display: none;"' : '') + '>' + ('<input type="file" name="file_' + i + '" tabindex="7"></div>');
					}).join('');
					el.removeAttribute('id');
				}
			}, {
				key: 'fixHTMLHelper',
				value: function fixHTMLHelper(str) {
					return str.replace(/href="(#\d+)"/g, 'href="/' + aib.b + '/thread-' + aib.t + '.html$1"');
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode;
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					return !!$q('.sage', post);
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('input[type="checkbox"]', op).name.match(/\d+/);
				}
			}, {
				key: 'init',
				value: function init() {
					$script('highlightPost = Function.prototype');
					return false;
				}
			}, {
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					cap.hasCaptcha = false;
					var scripts = $Q('script:not([src])', doc);
					for (var i = 0, _len16 = scripts.length; i < _len16; ++i) {
						var m = scripts[i].textContent.match(/var boardRequiresCaptcha = ([a-z]+);/);
						if (m) {
							if (m[1] === 'true') {
								cap.hasCaptcha = true;
							}
							break;
						}
					}
					return null;
				}
			}, {
				key: 'insertYtPlayer',
				value: function insertYtPlayer(msg, playerHtml) {
					var pMsg = msg.parentNode;
					var prev = pMsg.previousElementSibling;
					return $bBegin(prev.hasAttribute('style') ? prev : pMsg, playerHtml);
				}
			}, {
				key: 'parseURL',
				value: function parseURL() {
					_get(Krautchan.prototype.__proto__ || Object.getPrototypeOf(Krautchan.prototype), 'parseURL', this).call(this);
					if (this.b.startsWith('board/')) {
						this.b = this.b.substr(6);
					}
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap, isErr) {
					if (isErr && !cap.hasCaptcha) {
						cap.hasCaptcha = true;
						cap.showCaptcha();
					}
					var sessionId = null;
					var cookie = doc.cookie;

					if (cookie.includes('desuchan.session')) {
						var _iteratorNormalCompletion36 = true;
						var _didIteratorError36 = false;
						var _iteratorError36 = undefined;

						try {
							for (var _iterator36 = cookie.split(';')[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
								var c = _step36.value;

								var m = c.match(/^\s*desuchan\.session=(.*)$/);
								if (m) {
									sessionId = unescape(m[1].replace(/\+/g, ' '));
									break;
								}
							}
						} catch (err) {
							_didIteratorError36 = true;
							_iteratorError36 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion36 && _iterator36.return) {
									_iterator36.return();
								}
							} finally {
								if (_didIteratorError36) {
									throw _iteratorError36;
								}
							}
						}
					}
					var id = this.b + (pr.tNum ? pr.tNum : '') + (sessionId ? '-' + sessionId : '') + '-' + new Date().getTime() + '-' + Math.round(1e8 * Math.random());
					var img = $q('img', cap.parentEl);
					img.src = '';
					img.src = '/captcha?id=' + id;
					$q('input[name="captcha_name"]', cap.parentEl).value = id;
					return null;
				}
			}, {
				key: 'qFormName',
				get: function get() {
					return 'input[name="internal_n"]';
				}
			}, {
				key: 'qFormSubj',
				get: function get() {
					return 'input[name="internal_s"]';
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return '.filename > a';
				}
			}, {
				key: 'qThread',
				get: function get() {
					return '.thread_body';
				}
			}, {
				key: 'catalogUrl',
				get: function get() {
					return this.prot + '//' + this.host + '/catalog/' + this.b;
				}
			}, {
				key: 'css',
				get: function get() {
					return 'img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr,\n\t\t\t\t\tform > div:first-of-type > hr, h2, .sage { display: none; }\n\t\t\t\t.de-thr-hid { float: none; }\n\t\t\t\t.de-video-obj-inline { margin-left: 5px; }\n\t\t\t\tdiv[id^="Wz"] { z-index: 10000 !important; }\n\t\t\t\tform[action="/paint"] > select { width: 105px; }\n\t\t\t\tform[action="/paint"] > input[type="text"] { width: 24px !important; }';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['b', 'i', 'u', 's', 'spoiler', 'aa'];
				}
			}]);

			return Krautchan;
		}(BaseBoard);

		ibDomains['krautchan.net'] = Krautchan;

		var Kropyvach = function (_Vichan3) {
			_inherits(Kropyvach, _Vichan3);

			function Kropyvach(prot, dm) {
				_classCallCheck(this, Kropyvach);

				var _this107 = _possibleConstructorReturn(this, (Kropyvach.__proto__ || Object.getPrototypeOf(Kropyvach)).call(this, prot, dm));

				_this107.markupBB = true;
				return _this107;
			}

			_createClass(Kropyvach, [{
				key: 'css',
				get: function get() {
					return _get(Kropyvach.prototype.__proto__ || Object.getPrototypeOf(Kropyvach.prototype), 'css', this) + (this.t ? '' : '\r\n.de-btn-rep { display: none !important; }');
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['b', 'i', 'u', 's', 'spoiler', 'code'];
				}
			}]);

			return Kropyvach;
		}(Vichan);

		ibDomains['kropyva.ch'] = Kropyvach;

		var Lainchan = function (_Vichan4) {
			_inherits(Lainchan, _Vichan4);

			function Lainchan(prot, dm) {
				_classCallCheck(this, Lainchan);

				var _this108 = _possibleConstructorReturn(this, (Lainchan.__proto__ || Object.getPrototypeOf(Lainchan)).call(this, prot, dm));

				_this108.qOPost = '.op';
				return _this108;
			}

			_createClass(Lainchan, [{
				key: 'init',
				value: function init() {
					_get(Lainchan.prototype.__proto__ || Object.getPrototypeOf(Lainchan.prototype), 'init', this).call(this);
					$each($Q('.files + .post.op'), function (el) {
						return el.insertBefore(el.previousElementSibling, el.firstChild);
					});
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Lainchan.prototype.__proto__ || Object.getPrototypeOf(Lainchan.prototype), 'css', this) + '\n\t\t\t\t.sidearrows { display: none !important; }\n\t\t\t\t.bar { position: static; }';
				}
			}]);

			return Lainchan;
		}(Vichan);

		ibDomains['lainchan.org'] = Lainchan;

		var Niuchan = function (_Kusaba4) {
			_inherits(Niuchan, _Kusaba4);

			function Niuchan() {
				_classCallCheck(this, Niuchan);

				return _possibleConstructorReturn(this, (Niuchan.__proto__ || Object.getPrototypeOf(Niuchan)).apply(this, arguments));
			}

			_createClass(Niuchan, [{
				key: 'css',
				get: function get() {
					return _get(Niuchan.prototype.__proto__ || Object.getPrototypeOf(Niuchan.prototype), 'css', this) + '\n\t\t\t\t.replybacklinks, .resize { display: none; }';
				}
			}]);

			return Niuchan;
		}(Kusaba);

		ibDomains['niuchan.org'] = Niuchan;

		var Nowere = function (_BaseBoard17) {
			_inherits(Nowere, _BaseBoard17);

			function Nowere() {
				_classCallCheck(this, Nowere);

				return _possibleConstructorReturn(this, (Nowere.__proto__ || Object.getPrototypeOf(Nowere)).apply(this, arguments));
			}

			_createClass(Nowere, [{
				key: 'init',
				value: function init() {
					$script('highlight = Function.prototype');
					return false;
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['**', '***', '', '^H', '', ''];
				}
			}]);

			return Nowere;
		}(BaseBoard);

		ibDomains['nowere.net'] = Nowere;

		var Ponyach = function (_BaseBoard18) {
			_inherits(Ponyach, _BaseBoard18);

			function Ponyach(prot, dm) {
				_classCallCheck(this, Ponyach);

				var _this111 = _possibleConstructorReturn(this, (Ponyach.__proto__ || Object.getPrototypeOf(Ponyach)).call(this, prot, dm));

				_this111.qBan = 'font[color="#FF0000"]';
				_this111.qImgInfo = '.filesize[style="display: inline;"]';

				_this111.formParent = 'replythread';
				_this111.jsonSubmit = true;
				_this111.multiFile = true;
				return _this111;
			}

			_createClass(Ponyach, [{
				key: 'getImgRealName',
				value: function getImgRealName(wrap) {
					return $q('.filesize[style="display: inline;"] > .mobile_filename_hide', wrap).textContent;
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode.parentNode;
				}
			}, {
				key: 'getPNum',
				value: function getPNum(post) {
					return +post.getAttribute('data-num');
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(_ref76) {
					var error = _ref76.error,
					    id = _ref76.id;

					return { error: error, postNum: id && +id };
				}
			}, {
				key: 'init',
				value: function init() {
					var el = $id('postform');
					if (el) {
						el.setAttribute('action', el.getAttribute('action') + '?json=1');
					}
					defaultCfg.postSameImg = 0;
					defaultCfg.removeEXIF = 0;
					return false;
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return '.filesize > a:first-of-type';
				}
			}]);

			return Ponyach;
		}(BaseBoard);

		ibDomains['ponyach.cf'] = Ponyach;
		ibDomains['ponyach.ga'] = Ponyach;
		ibDomains['ponyach.gq'] = Ponyach;
		ibDomains['ponyach.ml'] = Ponyach;
		ibDomains['ponyach.ru'] = Ponyach;
		ibDomains['ponyach.tk'] = Ponyach;
		ibDomains['cafe-asylum.cf'] = Ponyach;
		ibDomains['cafe-bb.cf'] = Ponyach;
		ibDomains['cafe-bb.ga'] = Ponyach;
		ibDomains['cafe-bb.gq'] = Ponyach;
		ibDomains['cafe-bb.ml'] = Ponyach;
		ibDomains['cafe-bb.tk'] = Ponyach;

		var Ponychan = function (_Tinyboard2) {
			_inherits(Ponychan, _Tinyboard2);

			function Ponychan(prot, dm) {
				_classCallCheck(this, Ponychan);

				var _this112 = _possibleConstructorReturn(this, (Ponychan.__proto__ || Object.getPrototypeOf(Ponychan)).call(this, prot, dm));

				_this112.qOPost = '.opContainer';

				_this112.jsonSubmit = false;
				return _this112;
			}

			_createClass(Ponychan, [{
				key: 'getImgRealName',
				value: function getImgRealName(wrap) {
					return $q('.post-filename', wrap).textContent;
				}
			}, {
				key: 'init',
				value: function init() {
					_get(Ponychan.prototype.__proto__ || Object.getPrototypeOf(Ponychan.prototype), 'init', this).call(this);
					$each($Q('img[data-mature-src]'), function (el) {
						return el.src = el.getAttribute('data-mature-src');
					});
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Ponychan.prototype.__proto__ || Object.getPrototypeOf(Ponychan.prototype), 'css', this) + '\n\t\t\t\t.mature_thread { display: block !important; }\n\t\t\t\t.mature_warning { display: none; }';
				}
			}]);

			return Ponychan;
		}(Tinyboard);

		ibDomains['ponychan.net'] = Ponychan;

		var Synch = function (_Tinyboard3) {
			_inherits(Synch, _Tinyboard3);

			function Synch(prot, dm) {
				_classCallCheck(this, Synch);

				var _this113 = _possibleConstructorReturn(this, (Synch.__proto__ || Object.getPrototypeOf(Synch)).call(this, prot, dm));

				_this113.qImgInfo = '.unimportant';

				_this113.markupBB = true;
				return _this113;
			}

			_createClass(Synch, [{
				key: 'init',
				value: function init() {
					var val = '{ "simpleNavbar": true }';
					if (locStorage.settings !== val) {
						locStorage.settings = val;
						window.location.reload();
						return true;
					}
					_get(Synch.prototype.__proto__ || Object.getPrototypeOf(Synch.prototype), 'init', this).call(this);
					defaultCfg.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
					defaultCfg.timeOffset = 4;
					defaultCfg.correctTime = 1;
					return false;
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return '.file-info > .btn-group > .btn-xs > a';
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Synch.prototype.__proto__ || Object.getPrototypeOf(Synch.prototype), 'css', this) + '\n\t\t\t\t.fa-sort { display: none; }\n\t\t\t\ttime::after { content: none; }';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['b', 'i', 'u', 's', 'spoiler', 'code', 'sup', 'sub'];
				}
			}]);

			return Synch;
		}(Tinyboard);

		ibDomains['syn-ch.ru'] = Synch;
		ibDomains['syn-ch.com'] = Synch;
		ibDomains['syn-ch.org'] = Synch;

		var prot = window.location.protocol;
		var dm = localData && localData.dm;
		if (checkDomains) {
			if (!dm) {
				var ibKeys = Object.keys(ibDomains);
				var i = ibKeys.length;
				var host = window.location.hostname.toLowerCase();
				while (i--) {
					dm = ibKeys[i];
					if (host === dm || host.endsWith('.' + dm)) {
						return new ibDomains[dm](prot, dm);
					}
				}
			} else if (dm in ibDomains) {
				return new ibDomains[dm](prot, dm);
			}
		}
		if (!dm) {
			dm = window.location.hostname;
		}
		if (!dm || !checkEngines) {
			return null;
		}
		dm = dm.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
		for (var _i11 = ibEngines.length - 1; _i11 >= 0; --_i11) {
			var _ibEngines$_i = _slicedToArray(ibEngines[_i11], 2),
			    path = _ibEngines$_i[0],
			    Ctor = _ibEngines$_i[1];

			if ($q(path, doc)) {
				return new Ctor(prot, dm);
			}
		}
		return new BaseBoard(prot, dm);
	}


	var DollchanAPI = {
		initAPI: function initAPI() {
			var _this114 = this;

			this.hasListeners = false;
			if (!('MessageChannel' in window)) {
				return;
			}
			var channel = new MessageChannel();
			this.port = channel.port1;
			this.port.onmessage = this._handleMessage;
			this.activeListeners = new Set();
			var port = channel.port2;
			doc.defaultView.addEventListener('message', function (e) {
				if (e.data === 'de-request-api-message') {
					_this114.hasListeners = true;
					doc.defaultView.postMessage('de-answer-api-message', '*', [port]);
				}
			});
		},

		hasListener: function hasListener(name) {
			return DollchanAPI.hasListeners && DollchanAPI.activeListeners.has(name);
		},
		notify: function notify(name, data) {
			if (this.hasListener(name)) {
				this.port.postMessage({ name: name, data: data });
			}
		},
		_handleMessage: function _handleMessage(_ref77) {
			var arg = _ref77.data;

			if (!arg || !arg.name) {
				return;
			}
			var rv = null;
			var name = arg.name,
			    data = arg.data;

			switch (name.toLowerCase()) {
				case 'registerapi':
					if (data) {
						rv = {};
						var _iteratorNormalCompletion37 = true;
						var _didIteratorError37 = false;
						var _iteratorError37 = undefined;

						try {
							for (var _iterator37 = data[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
								var aName = _step37.value;

								rv[aName] = DollchanAPI._register(aName.toLowerCase());
							}
						} catch (err) {
							_didIteratorError37 = true;
							_iteratorError37 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion37 && _iterator37.return) {
									_iterator37.return();
								}
							} finally {
								if (_didIteratorError37) {
									throw _iteratorError37;
								}
							}
						}
					}
					break;
			}
			DollchanAPI.port.postMessage({ name: name, data: rv });
		},
		_register: function _register(name) {
			switch (name) {
				case 'expandmedia':
				case 'filechange':
				case 'newpost':
				case 'submitform':
					break;
				default:
					return false;
			}
			this.activeListeners.add(name);
			return true;
		}
	};

	function checkForUpdates(isManual, lastUpdateTime) {
		if (!isManual) {
			if (Date.now() - +lastUpdateTime < [0, 1, 2, 7, 14, 30][Cfg.updDollchan] * 1e3 * 60 * 60 * 24) {
				return Promise.reject();
			}
		}
		return $ajax(gitRaw + 'src/modules/Wrap.js', { 'Content-Type': 'text/plain' }, false).then(function (_ref78) {
			var responseText = _ref78.responseText;

			var v = responseText.match(/const version = '([0-9.]+)';/);
			var remoteVer = v && v[1] ? v[1].split('.') : null;
			if (remoteVer) {
				var currentVer = version.split('.');
				var src = '' + gitRaw + (nav.isESNext ? 'src/' : '') + 'Dollchan_Extension_Tools.' + (nav.isESNext ? 'es6.' : '') + 'user.js';
				saveCfgObj('lastUpd', Date.now());
				var link = '<a style="color: blue; font-weight: bold;" href="' + src + '">';
				for (var i = 0, _len17 = Math.max(currentVer.length, remoteVer.length); i < _len17; ++i) {
					if ((+remoteVer[i] || 0) > (+currentVer[i] || 0)) {
						return '' + link + Lng.updAvail[lang].replace('%s', v[1]) + '</a>';
					} else if ((+remoteVer[i] || 0) < (+currentVer[i] || 0)) {
						break;
					}
				}
				if (isManual) {
					var c = responseText.match(/const commit = '([0-9abcdef]+)';/)[1];
					var vc = version + '.' + c;
					return c === commit ? Lng.haveLatestCommit[lang].replace('%s', vc) : Lng.haveLatestStable[lang].replace('%s', version) + '\n' + Lng.newCommitsAvail[lang].replace('%s', '' + link + vc + '</a>');
				}
			}
			return Promise.reject();
		}, function () {
			return !isManual ? Promise.reject() : '<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>';
		});
	}

	function initPage() {
		if (aib.t) {
			if (Cfg.rePageTitle) {
				doc.title = '/' + aib.b + ' - ' + Thread.first.op.title;
			}
			if (!localData) {
				Cfg.stats.view++;
				saveCfgObj(aib.dm, Cfg);
			}
		} else {
			thrNavPanel.initThrNav();
		}
		if (!localData) {
			updater = initThreadUpdater(doc.title, aib.t && Cfg.ajaxUpdThr && !aib.isArchived);
		}
	}

	function scrollPage() {
		if (!aib.t && Cfg.scrollToTop) {
			if (doc.hidden || needScroll) {
				scrollTo(0, 1);
			}
			return;
		}
		if (!needScroll) {
			return;
		}
		setTimeout(function () {
			var id = 'de-scroll-' + aib.b + (aib.t || '');
			var val = +sesStorage[id];
			if (val) {
				scrollTo(0, val);
				sesStorage.removeItem(id);
				return;
			}
			var post = void 0,
			    num = void 0;
			var hash = window.location.hash;

			if (hash && (num = hash.match(/#[ip]?(\d+)$/)) && (num = +num[1]) && (post = pByNum.get(num)) && !post.isOp) {
				post.selectAndScrollTo();
			}
		}, 0);
	}



	function addSVGIcons() {
		docBody.insertAdjacentHTML('beforeend', '\n\t<div id="de-svg-icons" style="height: 0; width: 0; position: fixed;">\n\t<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t<defs>\n\t\t<linearGradient id="de-btn-back-gradient" x1="50%" y1="0%" y2="100%" x2="50%">\n\t\t\t<stop offset="0%" stop-color="#A0A0A0"/>\n\t\t\t<stop offset="50%" stop-color="#505050"/>\n\t\t\t<stop offset="100%" stop-color="#A0A0A0"/>\n\t\t</linearGradient>\n\t</defs>\n\n\t<!-- POST ICONS -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-back">\n\t\t<path class="de-post-btns-back" d="M4 1q-3 0,-3 3v8q0 3,3 3h8q3 0,3 -3v-8q0 -3,-3-3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-hide">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<line class="de-svg-stroke" stroke-width="2.5" x1="4.5" y1="11.5" x2="11.5" y2="4.5"/>\n\t\t<line class="de-svg-stroke" stroke-width="2.5" x1="11.5" y1="11.5" x2="4.5" y2="4.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-unhide">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="8" y1="4" x2="8" y2="12"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="4" y1="8" x2="12" y2="8"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-rep">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M5 11c0 .8.6 1.2 1.3.7l5-3c.6-.4.6-1 0-1.5l-5-3C5.6 4 5 4.3 5 5v6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-expthr">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M4.5 6L8 3l3.5 3H9.25v4h2.25L8 13 4.5 10h2.25V6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-fav">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M8 3l1.5 3 3.5.5-2.5 2.2 1 3.8-3.5-2-3.5 2 1-3.8L3 6.5 6.5 6 8 3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-stick">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M5 5h6v6H5z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-sage">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M4 9h8l-4 4.5zM6 3h4v1h-4zM6 5h4v1h-4zM6 7h4v1h-4z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-src">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<circle class="de-svg-stroke" cx="7" cy="7" r="2.5" stroke-width="2"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="9" y1="9" x2="12" y2="12"/>\n\t</symbol>\n\n\t<!-- WINDOW ICONS -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-win-arrow">\n\t\t<path class="de-svg-stroke" stroke-width="3.5" d="M8 13V6"/>\n\t\t<path class="de-svg-fill"  d="M3.5 7h9L8 2.5 3.5 7z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-win-close">\n\t\t<path class="de-svg-stroke" stroke-width="2.5" d="M3.5 3.5l9 9m-9 0l9-9"/>\n\t</symbol>\n\n\t<!-- THREAD NAVIGATION ICONS -->\n\t<symbol viewBox="0 0 7 7" id="de-symbol-thr-nav-arrow">\n\t\t<path class="de-svg-fill" d="M6 3.5L2 0v7z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 24 24" id="de-symbol-thr-nav-up">\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M3 22.5l9-9 9 9M3 13.5l9-9 9 9"/>\n\t</symbol>\n\t<symbol viewBox="0 0 24 24" id="de-symbol-thr-nav-down">\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M3 11.5l9 9 9-9M3 2.5l9 9 9-9"/>\n\t</symbol>\n\n\t<!-- IMAGE BUTTON ICONS -->\n\t<symbol viewBox="0 0 32 32" id="de-symbol-img-btn-arrow">\n\t\t<path class="de-svg-stroke" stroke-width="8" d="M0 16h20"/>\n\t\t<path class="de-svg-stroke" stroke-width="9" d="M13 3l16 16M13 29l16-16"/>\n\t</symbol>\n\t<symbol viewBox="0 0 32 32" id="de-symbol-img-btn-auto">\n\t\t<path class="de-svg-fill" d="M13.2 26.6c-3.1 2.4-5.9.5-5.9-3.3V8.7c0-3.8 2.8-5.6 6.1-3.3l12.5 7.1c3.1 1.9 3.1 5.2 0 7.1 0-.1-12.7 7-12.7 7z"/>\n\t</symbol>\n\n\t<!-- MAIN PANEL -->\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-logo">\n\t\t<path class="de-svg-fill" d="M22 5h-10v16h4v-14h6z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M22 20.5H12c-2.8 0-5.7 0-5.7-4s2.8-4 5.7-4H21"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-cfg">\n\t\t<circle class="de-svg-stroke" stroke-width="3" cx="12.5" cy="12.5" r="6"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 6.5v-3M18.5 12.5h3M12.5 18.5v3M6.5 12.5h-3M16.7 8.3L19 6M16.7 16.7L19 19M8.3 16.7L6 19M8.3 8.3L6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-hid">\n\t\t<path class="de-svg-stroke" stroke-width="4" d="M6 19L19 6M6 6l13 13"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-fav">\n\t\t<path class="de-svg-fill" d="M12.5 3.5l2.5 6 6.5.5-5 4.2 2 6.8-6-4-6 4 2-6.8-5-4.2 6.5-.5 2.5-6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-vid">\n\t\t<path class="de-svg-fill" d="M12.5 4a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1 13c-1.3 1-2.5.2-2.5-1.4V9.4C9 7.8 10.2 7 11.6 8l5.3 3c1.3.8 1.3 2.2 0 3l-5.4 3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-refresh">\n\t\t<path class="de-svg-fill" d="M14 4v4.3a4.5 4.5 0 1 1-3 0V4a8.5 8.5 0 1 0 3 0z"/>\n\t\t<path class="de-svg-fill" d="M13 11V4h7"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-arrow">\n\t\t<path class="de-svg-stroke" stroke-width="5" d="M4 12.5h12"/>\n\t\t<path class="de-svg-fill" d="M14 19V6l7 6.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-expimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M8 12.5h9"/>\n\t\t<path class="de-svg-fill" d="M10 8v9l-5-4.5M15 17V8l5 4.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-maskimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" d="M5 20L20 5M5 15.5L15.5 5M5 11l6-6M20 9.5L9.5 20M20 14l-6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-preimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 17V9"/>\n\t\t<path class="de-svg-fill" d="M8 15h9l-4.5 5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-savethr">\n\t\t<path class="de-svg-fill" d="M18 4h-1v6H8V4H6C5 4 4 5 4 6v13c0 1 1 2 2 2h13c1 0 2-1 2-2V7l-3-3zM6 20v-8h13v8H6z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M13.5 9V4"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-upd">\n\t\t<circle cx="12.5" cy="10.8" r="4"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" stroke-linejoin="round" d="M4.5 12q8-10,16 0q-8 10,-16 0z"/>\n\t\t<path class="de-svg-stroke" d="M11 7L9.8 5M14 7l1.2-2M11 17l-1.2 2m4.2-2l1.2 2M7 8.5L5.3 6.8M7 15.5l-1.7 1.7M18 8.5l1.7-1.7M18 15.5l1.7 1.7"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-off">\n\t\t<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4l5 5z"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M15 9.5l6 6m0-6l-6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-on">\n\t\t<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4z"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M15.5 7.5c1.7 3.3 1.7 6.7 0 10m3-12.5c3 5 3 10 0 15"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-catalog">\n\t\t<path class="de-svg-fill" d="M5 5h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 5h3v3H9zM5 9h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 9h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-enable">\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 4v8"/>\n\t\t<path class="de-svg-fill" d="M16 4.8v4a5 5 0 0 1-3.5 8.7A5 5 0 0 1 9 9V4.7a8.5 8.5 0 1 0 7 0z"/>\n\t</symbol>\n\n\t<!-- MARKUP BUTTONS -->\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-back">\n\t\t<path class="de-markup-back" stroke-width="2" d="M6 1q-5 0,-5 5v10q0 5,5 5h11q5 0,5 -5v-10q0 -5,-5-5z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-bold">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="5.5" y="17" style="font-family: sans-serif; font-size: 17px; font-weight: 800;">B</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-italic">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="8" y="17" style="font-family: sans-serif; font-size: 17px; font-weight: 600; font-style: italic;">i</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-under">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="6" y="15" width="20" style="font-family: sans-serif; font-size: 17px; font-weight: 600;">u</text>\n\t\t<path stroke="#444" stroke-width="1.5" d="M6 17H17.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-strike">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="4" y="17" style="font-family: sans-serif; font-size: 22px; font-weight: 600; font-style: italic;">s</text>\n\t\t<path stroke="#444" d="M4 11H19"/>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-spoil">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<path stroke="#666" stroke-width="10" d="M4 11H19"/>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-code">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="5" y="17" style="font-family: \'Lucida Console\', monospace; font-size: 18px; font-weight: 600;">C</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-sup">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="4" y="15" style="font-family: sans-serif; font-size: 16px; font-weight: 600;">x</text>\n\t\t<text x="14" y="10" style="font-family: sans-serif; font-size: 8px; font-weight: 600;">2</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-sub">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="4" y="15" style="font-family: sans-serif; font-size: 16px; font-weight: 600;">x</text>\n\t\t<text x="14" y="17" style="font-family: sans-serif; font-size: 8px; font-weight: 600;">2</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-quote">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="6" y="18" style="font-family: sans-serif; font-size: 20px; font-weight: 600;">&gt;</text>\n\t</symbol>\n\n\t<!-- OTHER -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-wait">\n\t\t<circle fill="#929087" cx="8" cy="2" r="2"/>\n\t\t<circle fill="#C5C2BA" cx="8" cy="14" r="2"/>\n\t\t<circle fill="#ACAAA0" cx="2" cy="8" r="2"/>\n\t\t<circle fill="#79766C" cx="14" cy="8" r="2"/>\n\t\t<circle fill="#D2CFC6" cx="12.25" cy="12.25" r="2"/>\n\t\t<circle fill="#9F9C93" cx="3.75" cy="3.75" r="2"/>\n\t\t<circle fill="#B9B6AE" cx="3.75" cy="12.25" r="2"/>\n\t\t<circle fill="#868379" cx="12.25" cy="3.75" r="2"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-closed">\n\t\t<image display="inline" width="16" height="16" xlink:href="data:image/gif;base64,R0lGODlhEAAQAKIAAP3rqPPOd+y6V+WmN+Dg4M7OzmZmZv///yH5BAEAAAcALAAAAAAQABAAAANCeLrWvZARUqqJkjiLj9FMcWHf6IldGZqM4zqRAcw0zXpAoO/6LfeNnS8XcAhjAIHSoFwim0wockCtUodWq+/1UiQAADs="/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-unavail">\n\t\t<circle class="de-svg-stroke" fill="none" stroke-width="2" cx="8" cy="8" r="5"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M4 4l8 8"/>\n\t</symbol>\n\t</svg>\n\t</div>');
	}




	function scriptCSS() {
		var cont = function cont(id, src) {
			return id + '::before { content: ""; display: inline-block; vertical-align: -3px; padding: 16px 16px 0 0; margin-right: 4px; background: url(' + src + ') no-repeat center; background-size: contain; }';
		};
		var gif = function gif(id, src) {
			return id + ' { background-image: url(data:image/gif;base64,' + src + '); background-repeat: no-repeat; background-position: center; }';
		};

		var x = '\n\t/* Main panel */\n\t#de-panel { position: fixed; right: 0; bottom: 0; z-index: 9999; border-radius: 15px 0 0 0; cursor: default; display: flex; min-height: 25px; color: #F5F5F5; }\n\t#de-panel-logo { flex: none; margin: auto 3px auto 0; cursor: pointer; }\n\t#de-panel-buttons { flex: 0 1 auto; display: flex; flex-flow: row wrap; align-items: center; padding: 0 0 0 2px; margin: 0; border-left: 1px solid #616b86; }\n\t.de-panel-button { display: block; flex: none; margin: 0 1px; padding: 0; transition: all .3s ease; }\n\ta.de-panel-button, a.de-panel-button:hover { color: inherit !important; }\n\t.de-panel-svg, #de-panel-logo, .de-panel-logo-svg, .de-panel-button { width: 25px; height: 25px; }\n\t#de-panel-goback { transform: rotate(180deg); will-change: transform; }\n\t#de-panel-godown { transform: rotate(90deg); will-change: transform; }\n\t#de-panel-goup { transform: rotate(-90deg); will-change: transform; }\n\t#de-panel-upd-on { fill: #32ff32; }\n\t#de-panel-upd-warn { fill: #fff441; }\n\t#de-panel-upd-off { fill: #ff3232; }\n\t#de-panel-audio-on > .de-panel-svg > .de-use-audio-off, #de-panel-audio-off > .de-panel-svg > .de-use-audio-on { display: none; }\n\t#de-panel-info { display: flex; flex: none; padding: 0 6px; margin-left: 2px; border-left: 1px solid #616b86; font: 18px serif; }\n\t#de-panel-info-icount::before, #de-panel-info-acount:not(:empty)::before { content: "/"; }\n\t.de-svg-fill { stroke: none; fill: currentColor; }\n\t.de-svg-stroke { stroke: currentColor; fill: none; }\n\tuse { fill: inherit; pointer-events: none; }\n\n\t/* Panel theme */\n\t' + [
		'.de-img-btn, #de-panel, .de-win-head { background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }',
		'.de-img-btn, #de-panel, .de-win-head { background: linear-gradient(to bottom, #4b90df, #3d77be 20%, #376cb0 28%, #295591 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #183d77 52%, #1f4485 72%, #264c90 80%, #325f9e 100%); }\n\t\t#de-panel-buttons, #de-panel-info { border-color: #8fbbed; }',
		'.de-img-btn, #de-panel, .de-win-head { background-color: #777; }\n\t\t#de-panel-buttons, #de-panel-info { border-color: #ccc; }\n\t\t.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }',
		'.de-img-btn, #de-panel, .de-win-head { background-color: rgba(0,20,80,.72); }',
		'.de-img-btn, #de-panel, .de-win-head { background: none; background-color: #333; border-radius: 0 !important; }\n\t\t#de-win-reply.de-win { border-radius: 0 !important; }\n\t\t#de-panel-buttons, #de-panel-info { border-color: #666; }'][Cfg.scriptStyle] + '\n\t' + (Cfg.scriptStyle === 2 ? '.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }' : '.de-panel-button:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }') + '\r\n';

		if (Cfg.disabled) {
			$css(x).id = 'de-css';
			return;
		}

		x += '\n\t/* Windows */\n\t.de-win .de-btn-toggle { transform: rotate(180deg); }\n\t.de-resizer { position: absolute; }\n\t.de-resizer-bottom { height: 6px; bottom: -3px; left: 0; right: 0; cursor: ns-resize; }\n\t.de-resizer-left { width: 6px; top: 0px; bottom: 0px; left: -3px; cursor: ew-resize; }\n\t.de-resizer-right { width: 6px; top: 0px; bottom: 0px; right: -3px; cursor: ew-resize; }\n\t.de-resizer-top { height: 6px; top: -3px; left: 0; right: 0; cursor: ns-resize; }\n\t.de-win > .de-win-head { cursor: move; }\n\t.de-win-buttons { position: absolute; right: 0; margin: 0 2px 0 0; font-size: 0; cursor: pointer; }\n\t.de-win-buttons > svg { transition: background .3s ease, box-shadow .3s ease; }\n\t.de-win-buttons > svg:hover { background-color: rgba(255,255,255,.2); box-shadow: 0 0 2px rgba(255,255,255,.4); }\n\t.de-win-inpost > .de-win-head > .de-win-buttons > svg:hover { background-color: rgba(64,64,64,.15); box-shadow: 0 0 2px rgba(64,64,64,.3); }\n\t#de-win-cfg { width: 355px; }\n\t#de-win-cfg, #de-win-fav, #de-win-hid, #de-win-vid { position: fixed; max-height: 92%; overflow-x: hidden; overflow-y: auto; }\n\t#de-win-cfg > .de-win-body { float: none; display: block; width: auto; min-width: 0; max-width: 100% !important; padding: 0; margin: 0 !important; border: none; }\n\t#de-win-fav > .de-win-body, #de-win-hid > .de-win-body, #de-win-vid > .de-win-body { padding: 9px; border: 1px solid gray; }\n\t#de-win-hid { max-width: 60%; }\n\t#de-win-vid > .de-win-body { display: flex; flex-direction: column; align-items: center; }\n\t#de-win-vid .de-entry { white-space: normal; }\n\t.de-win-head { position: relative; padding: 2px; border-radius: 10px 10px 0 0; color: #F5F5F5; font: bold 14px/16px arial; text-align: center; cursor: default; }\n\n\t/* Settings window */\n\t.de-block { display: block; }\n\t#de-btn-spell-add { margin-left: auto; }\n\t#de-cfg-bar { display: flex; margin: 0; padding: 0; }\n\t.de-cfg-body { min-height: 328px; padding: 9px 7px 7px; margin-top: -1px; font: 13px/15px arial !important; box-sizing: content-box; -moz-box-sizing: content-box; }\n\t.de-cfg-body, #de-cfg-buttons { border: 1px solid #183d77; border-top: none; }\n\t.de-cfg-button { padding: 0 ' + (nav.isFirefox ? '2' : '4') + 'px !important; margin: 0 4px; height: 21px; font: 12px arial !important; }\n\t#de-cfg-buttons { display: flex; align-items: center; padding: 3px; }\n\t#de-cfg-buttons > label { flex: 1 0 auto; }\n\t.de-cfg-chkbox { ' + (nav.isPresto ? '' : 'vertical-align: -1px !important; ') + 'margin: 2px 1px !important; }\n\t.de-cfg-depend { padding-left: 17px; }\n\t#de-cfg-info { display: flex; flex-direction: column; }\n\t.de-cfg-inptxt { width: auto; padding: 0 2px !important; margin: 1px 4px 1px 0 !important; font: 13px arial !important; }\n\t.de-cfg-label { padding: 0; margin: 0; }\n\t.de-cfg-select { padding: 0 2px; margin: 1px 0; font: 13px arial !important; }\n\t.de-cfg-tab { flex: 1 0 auto; display: block !important; margin: 0 !important; float: none !important; width: auto !important; min-width: 0 !important; padding: 4px 0 !important; box-shadow: none !important; border: 1px solid #444 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; font: bold 12px arial; text-align: center; cursor: default; background-image: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\n\t.de-cfg-tab:hover { background-image: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\n\t.de-cfg-tab[selected], .de-cfg-tab[selected]:hover { background-image: none !important; border-bottom: none !important; }\n\t.de-cfg-tab::' + (nav.isFirefox ? '-moz-' : '') + 'selection { background: transparent; }\n\t.de-cfg-unvis { display: none !important; }\n\t#de-info-log, #de-info-stats { width: 100%; padding: 0px 7px; }\n\t#de-info-log { overflow-y: auto; border-left: 1px solid grey; }\n\t.de-info-name { flex: 1 0 auto; }\n\t.de-info-row { display: flex; }\n\t#de-info-table { display: flex; flex: 1 0 auto; }\n\t.de-spell-btn { padding: 0 4px; }\n\t#de-spell-editor { display: flex; align-items: stretch; height: 235px; padding: 2px 0; }\n\t#de-spell-panel { display: flex; }\n\t#de-spell-txt { padding: 2px !important; margin: 0; width: 100%; min-width: 0; border: none !important; outline: none !important; font: 12px courier new; ' + (nav.isPresto ? '' : 'resize: none !important; ') + '}\n\t#de-spell-rowmeter { padding: 2px 3px 0 0; overflow: hidden; min-width: 2em; background-color: #616b86; text-align: right; color: #fff; font: 12px courier new; }\n\t#de-win-cfg.de-win-fixed { z-index: 10001 !important; }\n\n\t/* Settings window theme */\n\t' + [
		'#de-cfg-bar { background-color: #1f2740; }\n\t\t.de-cfg-tab { border-color: #121421 !important; }',
		'#de-cfg-bar { background-color: #325f9e; }\n\t\t.de-cfg-tab { border-color: #183d77 !important; }',
		'#de-cfg-bar, #de-spell-rowmeter { background-color: #777; }\n\t\t.de-cfg-body, #de-cfg-buttons { border-color: #444; }',
		'#de-cfg-bar { background-color: rgba(0,20,80,.72); }\n\t\t.de-cfg-tab { border-color: #001450 !important; }',
		'#de-cfg-bar { background-color: #222; }\n\t\t.de-cfg-body, #de-cfg-buttons { border-color: #666; }'][Cfg.scriptStyle] + '\n\n\t/* Favorites window */\n\t.de-entry { display: flex !important; align-items: center; float: none !important; padding: 0 !important; margin: 2px 0 !important; border: none !important; font-size: 14px; overflow: hidden !important; white-space: nowrap; }\n\t.de-entry-title { flex: auto; padding-left: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n\t.de-fav-entries { border-top: 1px solid rgba(80,80,80,.3); }\n\t.de-fav-entries-hide, .de-fav-inf-icon:not(.de-fav-closed):not(.de-fav-unavail):not(.de-fav-wait), .de-fav-closed > .de-fav-unavail-use, .de-fav-closed > .de-fav-wait-use, .de-fav-unavail > .de-fav-closed-use, .de-fav-unavail > .de-fav-wait-use, .de-fav-wait > .de-fav-closed-use, .de-fav-wait > .de-fav-unavail-use { display: none; }\n\t.de-fav-del-btn { flex: 0 0 auto; align-self: center; width: 13px; height: 13px; margin-left: 2px; opacity: 0.65; cursor: pointer; }\n\t.de-fav-del-btn[de-checked] { color: red; background-color: rgba(255,0,0,.2); border-radius: 7px; opacity: 1; }\n\t.de-fav-header { display: flex; margin-top: 0; margin-bottom: 0; padding: 1px 0; cursor: pointer; }\n\t.de-fav-header-btn { flex: 1 0 auto; margin-right: 2px; font-size: 85%; color: inherit; text-align: right; opacity: 0.65; }\n\t.de-fav-header-link { margin-left: 2px; color: inherit; font-weight: bold; font-size: 14px; text-decoration: none; outline: none; }\n\t.de-fav-inf { flex: none; padding: 0 4px 0 10px; font: bold 14px serif; cursor: default; }\n\t.de-fav-inf-icon, .de-fav-inf-iwrap  { width: 16px; height: 16px; }\n\t.de-fav-inf-icon { margin-bottom: -3px; }\n\t.de-fav-inf-new { color: #424f79; }\n\t.de-fav-inf-new::after { content: " +"; }\n\t.de-fav-inf-old { color: #4f7942; }\n\t.de-fav-inf-you { padding: 0 4px; margin-right: 4px; border-radius: 3px; color: #fff; background-color: #424f79; opacity: 0.65; }\n\t.de-fav-link { flex: none; margin-left: 2px; text-decoration: none; border: none; }\n\t.de-fav-table-unfold > .de-fold-block > .de-fav-entries { display: initial !important; }\n\t.de-fav-unavail { color: #cf4436; }\n\t.de-fold-block { border: 1px solid rgba(120,120,120,.8); border-radius: 2px; }\n\t.de-fold-block:not(:first-child) { border-top: none; }\n\n\t/* Post panel */\n\t.de-post-btns { margin-left: 4px; }\n\t.de-post-btns-back { fill: inherit; stroke: none; }\n\t.de-post-note:not(:empty) { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }\n\t.de-thread-note { font-style: italic; }\n\t.de-btn-hide > .de-btn-unhide-use, .de-btn-unhide > .de-btn-hide-use, .de-btn-hide-user > .de-btn-unhide-use, .de-btn-unhide-user > .de-btn-hide-use { display: none; }\n\t.de-btn-clear, .de-btn-close, .de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-stick-on, .de-btn-toggle { margin: 0 2px -3px 0 !important; cursor: pointer; width: 16px; height: 16px; }' + (!pr.form && !pr.oeForm ? '.de-btn-rep { display: none; }' : '') + '\n\n\t/* Sauce buttons */\n\t' + cont('.de-src-google', 'https://google.com/favicon.ico') + '\n\t' + cont('.de-src-yandex', 'https://yandex.ru/favicon.ico') + '\n\t' + cont('.de-src-tineye', 'https://tineye.com/favicon.ico') + '\n\t' + cont('.de-src-saucenao', 'https://saucenao.com/favicon.ico') + '\n\t' + cont('.de-src-iqdb', '//iqdb.org/favicon.ico') + '\n\t' + cont('.de-src-whatanime', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAWlBMVEX////29fbT1NOOj44dGx0SEhIHCAfX2NfQ0NDBwcGztLOwsbA7Ozs4ODgeHh7/2Nf/1dTMsbGpkZGWZWRyRUQ8NTYoIyMZAAAAAAAGBASBaGeBZ2Z2XVtmTUw2fryxAAAAGHRSTlP+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v4W3wyUAAAAZElEQVQI152OSQ6AMBRCadU6zxN1uP81/Y2NSY0r2fBgA+BL/wrbWEcewEqrrHa5zpSuCJMC0IY0WiA1iJW4ikkPYCFeUlQKFASTKI8SyTc8s8sc/rBDvwbF1LVjUJzbftjv6xfbkBHGT8GSnQAAAABJRU5ErkJggg==') + '\n\n\t/* Posts counter */\n\t.de-post-counter, .de-post-deleted::after { margin: 0 4px 0 2px; vertical-align: 1px;  font: bold 11px tahoma; cursor: default; }\n\t.de-post-counter { color: #4f7942; }\n\t.de-post-deleted::after { content: "' + Lng.deleted[lang] + '"; color: #727579; }\n\n\t/* Text markup buttons */\n\t#de-txt-panel { display: block; font-weight: bold; cursor: pointer; }\n\t#de-txt-panel > div { display: inline-block; }\n\t#de-txt-panel > div > svg { width: 23px; height: 22px; margin: 0 2px; }\n\t.de-markup-back { fill: #f0f0f0; stroke: #808080; }\r\n';

		if ('animation' in docBody.style) {
			x += '\n\t\t/* Show/hide animation */\n\t\t@keyframes de-open { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }\n\t\t@keyframes de-close { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }\n\t\t@keyframes de-blink {\n\t\t\t0%, 100% { transform: translateX(0); }\n\t\t\t10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\n\t\t\t20%, 40%, 60%, 80% { transform: translateX(10px); }\n\t\t}\n\t\t@keyframes de-post-open-tl { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-open-bl { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-open-tr { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-open-br { from { transform: translate(50%,50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-close-tl { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-close-bl { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-close-tr { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-close-br { to { transform: translate(50%,50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-new { from { transform: translate(0,-50%) scaleY(0); opacity: 0; } }\n\t\t@keyframes de-win-open { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }\n\t\t@keyframes de-win-close { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }\n\t\t.de-pview-anim { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }\n\t\t.de-open { animation: de-open .15s ease-out both; }\n\t\t.de-close { animation: de-close .15s ease-in both; }\n\t\t.de-blink { animation: de-blink .7s ease-in-out both; }\n\t\t.de-post-new { animation: de-post-new .2s ease-out both; }\n\t\t.de-win-open { animation: de-win-open .2s ease-out backwards; }\n\t\t.de-win-close { animation: de-win-close .2s ease-in both; }\r\n';
		} else {
			Cfg.animation = 0;
		}

		var p = Math.max(Cfg.minImgSize || 0, 50);
		x += '\n\t/* Full images */\n\t.de-img-embed, .de-fullimg { display: block; border: none; outline: none; cursor: pointer; image-orientation: from-image; }\n\t.de-img-embed { max-width: 200px; max-height: 200px; }\n\t.de-fullimg-after { clear: left; }\n\t.de-fullimg-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; box-sizing: content-box; -moz-box-sizing: content-box; }\n\t.de-fullimg-info { text-align: center; }\n\t.de-fullimg-load { position: absolute; z-index: 2; width: 50px; height: 50px; top: 50%; left: 50%; margin: -25px; }\n\t.de-fullimg-src { float: none !important; display: inline-block; padding: 2px 4px; margin: 2px 0 2px -1px; background: rgba(64,64,64,.8); font: bold 12px tahoma; color: #fff  !important; text-decoration: none; outline: none; }\n\t.de-fullimg-src:hover { color: #fff !important; background: rgba(64,64,64,.6); }' + (nav.firefoxVer >= 59 ? '.de-fullimg-center-video { border-top: 20px solid #444 !important; border-radius: 10px 10px 0 0; cursor: pointer; }\n\t\t.de-fullimg-center-video > .de-fullimg-video::before { right: 6px !important; top: -20px; }\n\t\t.de-fullimg-video { position: relative; }\n\t\t.de-fullimg-video::before { content: "\u2716"; color: #fff; background-color: rgba(64, 64, 64, 0.8); text-align: center; width: 20px; height: 20px; position: absolute; right: 0; font: bold 14px/18px tahoma; cursor: pointer; }' : '') + '\n\t.de-fullimg-wrap-center, .de-fullimg-wrap-link { width: inherit; height: inherit; }\n\t.de-fullimg-wrap-center > .de-fullimg { height: 100%; }\n\t.de-fullimg-wrap-inpost { min-width: ' + p + 'px; min-height: ' + p + 'px; float: left; ' + (aib.multiFile ? '' : 'margin: 2px 5px; -moz-box-sizing: border-box; box-sizing: border-box; ') + ' }\n\t.de-fullimg-wrap-nosize > .de-fullimg { opacity: .3; }\n\t.de-img-btn { position: fixed; top: 50%; z-index: 10000; height: 36px; width: 36px; border-radius: 10px 0 0 10px; color: #f0f0f0; cursor: pointer; }\n\t.de-img-btn > svg { height: 32px; width: 32px; margin: 2px; }\n\t#de-img-btn-auto { right: 0; margin-top: 20px; }\n\t.de-img-btn-auto-on { color: #ffe100; }\n\t#de-img-btn-next { right: 0; margin-top: -18px; }\n\t.de-img-btn-none { display: none; }\n\t#de-img-btn-prev { left: 0; margin-top: -18px; transform: scaleX(-1); }\n\n\t/* Embedders */\n\t' + cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico') + '\n\t' + cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico') + '\n\t' + cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') + '\n\t' + cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==') + '\n\t.de-current::after { content: " \u25CF"; }\n\t.de-img-arch, .de-img-audio { margin-left: 4px; color: inherit; text-decoration: none; font-weight: bold; }\n\t.de-mp3 { margin: 5px 20px; }\n\t.de-video-obj { margin: 5px 20px; white-space: nowrap; }\n\t.de-video-obj-inline { display: inline-block; }\n\t#de-video-btn-resize { padding: 0 14px 8px 0; margin: 0 8px; border: 2px solid; border-radius: 2px; }\n\t#de-video-btn-hide, #de-video-btn-prev { margin-left: auto; }\n\t#de-video-buttons { display: flex; margin-bottom: 2px; align-items: center; width: 100%; line-height: 16px; }\n\t#de-video-buttons > a:not(:hover) { color: inherit; }\n\t.de-video-expanded { width: 854px !important; height: 480px !important; }\n\t#de-video-list { padding: 0 0 4px; overflow-y: auto; width: 100%; }\n\t.de-video-refpost { margin: 0 3px; color: inherit; text-decoration: none; cursor: pointer; }\n\t.de-video-resizer::after { content: "\u2795"; margin: 0 -15px 0 3px; vertical-align: 6px; color: #000; font-size: 12px; cursor: pointer; }\n\t.de-video-player, .de-video-thumb { width: 100%; height: 100%; }\n\ta.de-video-player { display: inline-block; position: relative; border-spacing: 0; border: none; }\n\ta.de-video-player::after { content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAQAAACMYb/JAAAArklEQVR4AYXSr05CYRjA4cPGxjRosTijdvNJzmD1CrwAvQWugASNwGg0MoErOIVCPCMx0hmBMaAA4mPX8/2rT/i+9/1lPu0M3MtCN1OAvS+NEFkDmHqoJwcAbHzUkb9n7C5FqLynCAzdpAhLrynCRc9VnEDpKUWYpUmZIlt5nBQeY889amvGPj33HBvdt45WbAELeWyNP/qu/8dwBrDyVp9UBRi5DYXZdTLxEs77F5bCVAHlDJ1UAAAAAElFTkSuQmCC"); position: absolute;top: 50%; left: 50%; padding: 12px 24px; margin: -22px 0 0 -32px; background-color: rgba(255,0,0,.4); border-radius: 8px; line-height: 0; }\n\ta.de-video-player:hover::after { background-color: rgba(255,0,0,.7); }\n\t.de-video-title[de-time]::after { content: " [" attr(de-time) "]"; color: red; }\n\t.de-vocaroo > embed { display: inline-block; }\n\tvideo { background: black; }\n\n\t/* File inputs */\n\t.de-file { display: inline-block; vertical-align: top; margin: 1px; height: ' + (p = aib.multiFile ? 90 : 130) + 'px; width: ' + p + 'px; text-align: center; background-color: rgba(96,96,96,.15); border: 1px dashed grey; }\n\t.de-file > .de-file-img { display: table; width: 100%; height: 100%; cursor: pointer; }\n\t.de-file > .de-file-img > div { display: table-cell; vertical-align: middle; }\n\t.de-file > .de-file-utils { display: none; height: 16px; margin-top: -18px; padding: 1px 0; background: rgba(64,64,64,.6); position: relative; }\n\t.de-file > .de-file-utils > .de-file-rarmsg { color: #fff; }\n\t#de-file-area { border-spacing: 0; margin-top: 1px; width: 275px; min-width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; white-space: nowrap; }\n\t.de-file-drag { background: rgba(96,96,96,.8); border: 1px solid grey; opacity: .7; }\n\t.de-file:hover:not(.de-file-drag) > .de-file-utils { display: block !important; }\n\timg.de-file-img, video.de-file-img { max-width: ' + (p - 4) + 'px; max-height: ' + (p - 4) + 'px; }\n\t.de-file-input { max-width: 300px; }\n\t.de-file-input + .de-file-utils { margin-left: 4px; }\n\t.de-file-off > .de-file-img > div::after { content: "' + Lng.dropFileHere[lang] + '"; display: block; width: 80px; margin: 0 auto; font: 11px arial; opacity: .8; white-space: initial; }\n\t.de-file-rarmsg { margin: 0 2px; vertical-align: 4px; font: bold 11px tahoma; cursor: default; }\n\t.de-file-btn-del, .de-file-btn-rar, .de-file-btn-txt { display: inline-block; margin: 0 1px; padding: 0 16px 16px 0; cursor: pointer; }\n\t.de-file-spoil { margin: 0 3px; vertical-align: 1px; }\n\t.de-file-txt-add { font-weight: bold; width: 21px; padding: 0 !important; }\n\t.de-file-txt-input { border: 1px solid #9c9c9c; padding: 2px; font: 12px/16px sans-serif; }\n\t.de-file-txt-noedit { background: rgba(255,255,255,.5); cursor: pointer; }\n\t.de-file-utils { display: inline-block; float: none; vertical-align: -2px; }\n\t' + gif('.de-file-btn-del', 'R0lGODlhEAAQALMOAP8zAMopAJMAAP/M//+DIP8pAP86Av9MDP9sFP9zHv9aC/9gFf9+HJsAAP///wAAACH5BAEAAA4ALAAAAAAQABAAAARU0MlJKw3B4hrGyFP3hQNBjE5nooLJMF/3msIkJAmCeDpeU4LFQkFUCH8VwWHJRHIM0CiIMwBYryhS4XotZDuFLUAg6LLC1l/5imykgW+gU0K22C0RADs=') + '\n\t' + gif('.de-file-btn-rar', 'R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') + '\n\t' + gif('.de-file-btn-txt', 'R0lGODlhEAAQAJEAACyr4e/19////wAAACH5BAEAAAIALAAAAAAQABAAAAIrlI+pwK3WokMyBEmjxbBeLgEbKFrmyXTn+nXaF7nNGMslZ9NpFu4L/ggeCgA7') + '\n\n\t/* Reply form */\n\t.de-parea { text-align: center; }\n\t.de-parea-btn-close::after { content: "' + Lng.hideForm[lang] + '"; }\n\t.de-parea-btn-thr::after { content: "' + Lng.makeThr[lang] + '"; }\n\t.de-parea-btn-reply::after { content: "' + Lng.makeReply[lang] + '"; }\n\t#de-pform > form { padding: 0; margin: 0; border: none; }\n\t#de-pform input[type="text"], #de-pform input[type="file"] { width: 200px; }\n\t#de-resizer-text { display: inline-block !important; float: none !important; padding: 5px; margin: ' + (nav.isPresto ? '-2px -10px' : '0 0 -2px -10px') + '; border-bottom: 2px solid #666; border-right: 2px solid #666; cursor: se-resize; }\n\t.de-win-inpost { float: none; clear: left; display: inline-block; width: auto; padding: 3px; margin: 2px 0; }\n\t.de-win-inpost > .de-resizer { display: none; }\n\t.de-win-inpost > .de-win-head { background: none; color: inherit; }\n\t#de-win-reply { width: auto !important; min-width: 0; padding: 0 !important; border: none !important; }\n\t#de-win-reply.de-win { position: fixed !important; padding: 0 !important; margin: 0 !important; border-radius: 10px 10px 0 0; }\n\t#de-win-reply.de-win > .de-win-body { padding: 2px 2px 0 1px; border: 1px solid gray; }\n\t#de-win-reply.de-win .de-textarea { min-width: 98% !important; resize: none !important; }\n\t#de-win-reply.de-win #de-resizer-text { display: none !important; }\n\t#de-sagebtn { margin: 4px !important; vertical-align: top; cursor: pointer; }\n\t.de-textarea { display: inline-block; padding: 3px !important; min-width: 275px !important; min-height: 90px !important; resize: both; transition: none !important; }\n\n\t/* Thread navigation */\n\t#de-thr-navarrow { display: none; position: absolute; top: 50%; left: 34px; transform: translateY(-50%); width: 7px; height: 7px; }\n\t#de-thr-navpanel { color: #F5F5F5; height: 98px; width: 41px; position: fixed; top: 50%; left: 0px; padding: 0; margin: -49px 0 0; background: #777; border: 1px solid #525252; border-left: none; border-radius: 0 5px 5px 0; cursor: pointer; z-index: 1000; }\n\t.de-thr-navpanel-hidden { opacity: .7; margin-left: -34px !important; }\n\t.de-thr-navpanel-hidden > #de-thr-navarrow { display: initial; }\n\t#de-thr-navup { padding: 12px 9px 13px 8px; border-radius: 0 5px 0 0; }\n\t#de-thr-navdown { padding: 13px 9px 12px 8px; border-radius: 0 0 5px 0; }\n\t#de-thr-navup, #de-thr-navdown { width: 41px; height: 49px; -moz-box-sizing: border-box; box-sizing: border-box; }\n\t:not(.de-thr-navpanel-hidden) > #de-thr-navup:hover, :not(.de-thr-navpanel-hidden) > #de-thr-navdown:hover { background: #555; }\n\n\t/* Other */\n\t.de-abtn { text-decoration: none !important; outline: none; }\n\t.de-button { flex: none; padding: 0 ' + (nav.isFirefox ? 2 : 4) + 'px !important; margin: 1px 2px; height: 24px; font: 13px arial; }\n\t.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }\n\t.de-hidden { float: left; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important; width: 0 !important; height: 0 !important; display: inline !important; }\n\t.de-input-key { padding: 0 2px !important; margin: 0 !important; font: 13px/15px arial !important; }\n\tinput[type="text"].de-input-selected { background: rgba(255,255,150,0.4) !important }\n\t.de-link-parent { outline: 1px dotted !important; }\n\t.de-link-pview { font-weight: bold; }\n\t.de-link-ref { text-decoration: none; }\n\t.de-list { padding-top: 4px; }\n\t.de-list::before { content: "\u25CF"; margin-right: 4px; }\n\t.de-menu { padding: 0 !important; margin: 0 !important; width: auto !important; min-width: 0 !important; z-index: 9999; border: 1px solid grey !important; }\n\t.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }\n\t.de-menu-item:hover { background-color: #222; color: #fff; }\n\t.de-omitted { color: grey; }\n\t.de-omitted::before { content: "' + Lng.postsOmitted[lang] + '"; }\n\t.de-popup { overflow: visible !important; clear: both !important; width: auto !important; min-width: 0pt !important; padding: 8px !important; margin: 1px !important; border: 1px solid grey !important; display: block !important; float: right !important; max-width: initial !important; }\n\t.de-popup-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; line-height: 1.15; }\n\t.de-popup-msg { display: inline-block; white-space: pre-wrap; }\n\t.de-post-hiddencontent { display: none !important; }\n\t.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }\n\t.de-pview-info { padding: 3px 6px !important; }\n\t.de-ref-del::after { content: " (Del)"; }\n\t.de-ref-op::after { content: " (OP)"; }\n\t.de-refcomma:last-child { display: none; }\n\t.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }\n\t.de-refmap::before { content: "' + Lng.replies[lang] + ' "; }\n\t.de-replies-hide::after { content: "' + Lng.hidePosts[lang] + '"; }\n\t.de-replies-show::after { content: "' + Lng.showPosts[lang] + '"; }\n\t.de-thr-buttons { clear: left; margin-top: 5px; }\n\t' + (aib.t ? '.de-thr-buttons > .de-btn-rep { display: none; }' : '') + '\n\t.de-thr-collapse-link::after { content: "' + Lng.collapseThr[lang] + '"; }\n\t.de-thr-updater-link::after { content: "' + Lng.getNewPosts[lang] + '"; }\n\t#de-updater-count::before { content: ": "; }\n\t.de-viewed { color: #747488 !important; }\n\t.de-wait, .de-fav-wait , .de-fullimg-load { animation: de-wait-anim 1s linear infinite; }\n\t.de-wait { margin: 0 2px -3px 0 !important; width: 16px; height: 16px; }\n\t#de-wrapper-popup { overflow-x: hidden !important; overflow-y: auto !important; -moz-box-sizing: border-box; box-sizing: border-box; max-height: 100vh; position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\n\t@keyframes de-wait-anim { to { transform: rotate(360deg); } }\n\tform > hr { clear: both }';

		$css(x).id = 'de-css';
		$css('').id = 'de-css-dynamic';
		$css('').id = 'de-css-user';
		updateCSS();
	}

	function updateCSS() {
		var x = '\n\t.de-video-obj { width: ' + Cfg.YTubeWidth + 'px; height: ' + Cfg.YTubeHeigh + 'px; }\n\t.de-new-post { ' + (nav.isPresto ? 'border-left: 4px solid rgba(107,134,97,.7); border-right: 4px solid rgba(107,134,97,.7)' : 'box-shadow: 6px 0 2px -2px rgba(107,134,97,.8), -6px 0 2px -2px rgba(107,134,97,.8)') + ' !important; }\n\t.de-selected, .de-input-error { ' + (nav.isPresto ? 'border-left: 4px solid rgba(220,0,0,.7); border-right: 4px solid rgba(220,0,0,.7)' : 'box-shadow: 6px 0 2px -2px rgba(220,0,0,.8), -6px 0 2px -2px rgba(220,0,0,.8)') + ' !important; }\n\t' + (Cfg.markMyPosts ? '.de-mypost { ' + (nav.isPresto ? 'border-left: 4px solid rgba(97,107,134,.7); border-right: 4px solid rgba(97,107,134,.7)' : 'box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8)') + ' !important; }\n\t\t.de-mypost .de-post-counter::after { content: " (You)"; }\n\t\t.de-mypost .de-post-deleted::after { content: "' + Lng.deleted[lang] + ' (You)"; }' : '') + '\n\t' + (Cfg.markMyLinks ? '.de-ref-my::after { content: " (You)"; }\n\t\t.de-ref-del.de-ref-my::after { content: " (Del)(You)"; }\n\t\t.de-ref-op.de-ref-my::after { content: " (OP)(You)"; }' : '') + '\n\t' + (Cfg.postBtnsCSS === 0 ? '.de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep, .de-btn-hide, .de-btn-unhide, .de-btn-src { fill: rgba(0,0,0,0); color: currentColor; }\n\t\t.de-btn-fav-sel, .de-btn-stick-on, .de-btn-sage, .de-btn-hide-user, .de-btn-unhide-user { fill: rgba(0,0,0,0); color: #F00; }' : '.de-btn-hide, .de-btn-unhide, .de-btn-src, .de-btn-sage, .de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep { color: #F5F5F5; }\n\t\t.de-btn-hide-user { color: #BFFFBF; }\n\t\t.de-btn-unhide-user { color: #FFBFBF; }\n\t\t.de-btn-fav-sel { color: #FFE100; }\n\t\t.de-btn-stick-on { color: #BFFFBF; }\n\t\t.de-btn-sage { fill: #4B4B4B; }\n\t\t.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user,\n\t\t.de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-src, .de-btn-stick,\n\t\t.de-btn-stick-on { fill: ' + (Cfg.postBtnsCSS === 1 && !nav.isPresto ? 'url(#de-btn-back-gradient)' : Cfg.postBtnsBack) + '; }') + '\n\t.de-fullimg-wrap-inpost > .de-fullimg { width: ' + (Cfg.resizeImgs ? '100%' : 'auto') + '; }\n\t' + (Cfg.maskImgs ? aib.qPostImg + ', .de-img-embed, .de-video-obj { opacity: ' + Cfg.maskVisib / 100 + ' !important; }\n\t\t' + aib.qPostImg.split(', ').join(':hover, ') + ':hover, .de-img-embed:hover, .de-video-obj:hover { opacity: 1 !important; }\n\t\t.de-video-obj:not(.de-video-obj-inline) { clear: both; }' : '') + '\n\t' + (Cfg.delImgNames ? '.de-img-name { text-transform: capitalize; text-decoration: none; }' : '') + '\n\t' + (Cfg.widePosts ? '.de-reply { float: none; width: 99.9%; margin-left: 0; }' : '') + '\n\t' + (Cfg.strikeHidd ? '.de-link-hid { text-decoration: line-through !important; }' : '') + '\n\t' + (Cfg.noSpoilers === 1 ? '.spoiler, s { color: #F5F5F5 !important; background-color: #888 !important; }\n\t\t.spoiler > a, s > a:not(:hover) { color: #F5F5F5 !important; background-color: #888 !important; }' : Cfg.noSpoilers === 2 ? '.spoiler, s { color: inherit !important; }\n\t\t\t.spoiler > a, s > a:not(:hover) { color: inherit !important; }' : '') + '\n\t' + (Cfg.fileInputs ? '' : '.de-file-input { display: inline !important; }') + '\n\t' + (Cfg.addSageBtn ? '' : '#de-sagebtn, ') + '\n\t' + (Cfg.delHiddPost === 1 || Cfg.delHiddPost === 3 ? '.de-thr-hid, .de-thr-hid + div + div + hr, .de-thr-hid + div + div + br, .de-thr-hid + div + div + br + hr, .de-thr-hid + div + div + div + hr, ' : '') + '\n\t' + (Cfg.imgNavBtns ? '' : '.de-img-btn, ') + '\n\t' + (Cfg.imgInfoLink ? '' : '.de-fullimg-info, ') + '\n\t' + (Cfg.noPostNames ? aib.qPostName + ', ' + aib.qPostTrip + ', ' : '') + '\n\t' + (Cfg.noBoardRule ? aib.qFormRules + ', ' : '') + '\n\t' + (Cfg.panelCounter ? '' : '#de-panel-info, ') + '\n\t' + (Cfg.removeHidd ? '.de-link-ref.de-link-hid, .de-link-ref.de-link-hid + .de-refcomma, ' : '') + '\n\t' + (Cfg.showHideBtn ? '' : '.de-btn-hide, ') + '\n\t' + (Cfg.showRepBtn ? '' : '.de-btn-rep, ') + '\n\t' + (Cfg.thrBtns || aib.t ? '' : '.de-thr-updater, ') + '\n\t' + (Cfg.thrBtns === 1 || Cfg.thrBtns === 2 && !aib.t ? '' : '.de-thr-buttons > svg, ') + '\n\t' + (Cfg.ajaxPosting ? '' : '.de-file-btn-rar, .de-file-btn-txt, ') + '\n\t' + (Cfg.fileInputs ? '' : '.de-file-txt-wrap, .de-file-btn-txt, ') + '\n\t' + (aib.kus || !aib.multiFile && Cfg.fileInputs === 2 ? '' : '#de-pform form > table > tbody > tr > td:not([colspan]):first-child, #de-pform form > table > tbody > tr > th:first-child, ') + 'body > hr, .postarea, .theader { display: none !important; }\r\n';

		$id('de-css-dynamic').textContent = (x + aib.css).replace(/[\r\n\t]+/g, '\r\n\t');
		$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
	}if (/^(?:about|chrome|opera|res):$/i.test(window.location.protocol)) {
		return;
	}
	if (doc.readyState !== 'loading') {
		needScroll = false;
		runMain(true, null);
		return;
	}
	var dataPromise = null;
	if (aib = getImageBoard(true, false)) {
		if (!checkStorage()) {
			return;
		}
		initNavFuncs();
		dataPromise = readData();
	}
	needScroll = true;
	doc.addEventListener('onwheel' in doc.defaultView ? 'wheel' : 'mousewheel', function wFunc(e) {
		needScroll = false;
		doc.removeEventListener(e.type, wFunc);
	});
	doc.addEventListener('DOMContentLoaded', function () {
		return runMain(false, dataPromise);
	});

})(window.opera && window.opera.scriptStorage, window.FormData, function (x, y) {
	return window.scrollTo(x, y);
},
(typeof localData === 'undefined' ? 'undefined' : _typeof(localData)) === 'object' ? localData : null);

},{}],136:[function(require,module,exports){
'use strict';

require('core-js/fn/array/from');
require('core-js/fn/array/iterator');
require('core-js/fn/map');
require('core-js/fn/math/clz32');
require('core-js/fn/number/max-safe-integer');
require('core-js/fn/object/assign');
require('core-js/fn/promise');
require('core-js/fn/set');
require('core-js/fn/string/ends-with');
require('core-js/fn/string/includes');
require('core-js/fn/string/repeat');
require('core-js/fn/string/starts-with');
require('core-js/fn/symbol');
require('core-js/fn/weak-map');
require('regenerator-runtime/runtime');

},{"core-js/fn/array/from":1,"core-js/fn/array/iterator":2,"core-js/fn/map":3,"core-js/fn/math/clz32":4,"core-js/fn/number/max-safe-integer":5,"core-js/fn/object/assign":6,"core-js/fn/promise":7,"core-js/fn/set":8,"core-js/fn/string/ends-with":9,"core-js/fn/string/includes":10,"core-js/fn/string/repeat":11,"core-js/fn/string/starts-with":12,"core-js/fn/symbol":13,"core-js/fn/weak-map":14,"regenerator-runtime/runtime":134}]},{},[136,135]);
})(null);