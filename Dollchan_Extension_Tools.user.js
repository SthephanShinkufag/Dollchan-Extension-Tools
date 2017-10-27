// ==UserScript==
// @name            Dollchan Extension Tools
// @version         17.10.24.0
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       © 2017 Dollchan Extension Tools Team. See the LICENSE file for license rights and limitations (MIT).
// @description     Doing some profit for imageboards
// @icon            https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Icon.png
// @updateURL       https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/Dollchan_Extension_Tools.meta.js
// @run-at          document-start
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_openInTab
// @grant           GM_xmlhttpRequest
// @grant           unsafeWindow
// @include         *
// @nocompat        Chrome
// ==/UserScript==
(function de_main_func_outer(localData) {
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;
},{"../../modules/_core":29,"../../modules/es6.array.from":99,"../../modules/es6.string.iterator":109}],2:[function(require,module,exports){
require('../../modules/es6.array.iterator');
module.exports = require('../../modules/_core').Array.values;
},{"../../modules/_core":29,"../../modules/es6.array.iterator":100}],3:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
module.exports = require('../modules/_core').Map;
},{"../modules/_core":29,"../modules/es6.map":101,"../modules/es6.object.to-string":105,"../modules/es6.string.iterator":109,"../modules/es7.map.to-json":114,"../modules/web.dom.iterable":118}],4:[function(require,module,exports){
require('../../modules/es6.math.clz32');
module.exports = require('../../modules/_core').Math.clz32;
},{"../../modules/_core":29,"../../modules/es6.math.clz32":102}],5:[function(require,module,exports){
require('../../modules/es6.number.max-safe-integer');
module.exports = 0x1fffffffffffff;
},{"../../modules/es6.number.max-safe-integer":103}],6:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":29,"../../modules/es6.object.assign":104}],7:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/_core').Promise;
},{"../modules/_core":29,"../modules/es6.object.to-string":105,"../modules/es6.promise":106,"../modules/es6.string.iterator":109,"../modules/web.dom.iterable":118}],8:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
module.exports = require('../modules/_core').Set;
},{"../modules/_core":29,"../modules/es6.object.to-string":105,"../modules/es6.set":107,"../modules/es6.string.iterator":109,"../modules/es7.set.to-json":115,"../modules/web.dom.iterable":118}],9:[function(require,module,exports){
require('../../modules/es6.string.includes');
module.exports = require('../../modules/_core').String.includes;
},{"../../modules/_core":29,"../../modules/es6.string.includes":108}],10:[function(require,module,exports){
require('../../modules/es6.string.repeat');
module.exports = require('../../modules/_core').String.repeat;
},{"../../modules/_core":29,"../../modules/es6.string.repeat":110}],11:[function(require,module,exports){
require('../../modules/es6.string.starts-with');
module.exports = require('../../modules/_core').String.startsWith;
},{"../../modules/_core":29,"../../modules/es6.string.starts-with":111}],12:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":29,"../../modules/es6.object.to-string":105,"../../modules/es6.symbol":112,"../../modules/es7.symbol.async-iterator":116,"../../modules/es7.symbol.observable":117}],13:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/web.dom.iterable');
require('../modules/es6.weak-map');
module.exports = require('../modules/_core').WeakMap;
},{"../modules/_core":29,"../modules/es6.object.to-string":105,"../modules/es6.weak-map":113,"../modules/web.dom.iterable":118}],14:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],15:[function(require,module,exports){
var UNSCOPABLES = require('./_wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./_hide":43,"./_wks":97}],16:[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],17:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":51}],18:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":40}],19:[function(require,module,exports){
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":88,"./_to-iobject":90,"./_to-length":91}],20:[function(require,module,exports){
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            
        else if(res)switch(TYPE){
          case 3: return true;                    
          case 5: return val;                     
          case 6: return index;                   
          case 2: result.push(val);               
        } else if(IS_EVERY)return false;          
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":22,"./_ctx":31,"./_iobject":48,"./_to-length":91,"./_to-object":92}],21:[function(require,module,exports){
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":50,"./_is-object":51,"./_wks":97}],22:[function(require,module,exports){
var speciesConstructor = require('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":21}],23:[function(require,module,exports){
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){  }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    : ARG ? cof(O)
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":24,"./_wks":97}],24:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],25:[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); 
      that._f = undefined;    
      that._l = undefined;    
      that[SIZE] = 0;         
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      forEach: function forEach(callbackfn ){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          while(entry && entry.r)entry = entry.p;
        }
      },
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    if(entry){
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
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  
      this._k = kind;      
      this._l = undefined; 
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      while(entry && entry.r)entry = entry.p;
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        that._t = undefined;
        return step(1);
      }
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    setSpecies(NAME);
  }
};
},{"./_an-instance":16,"./_ctx":31,"./_defined":32,"./_descriptors":33,"./_for-of":40,"./_iter-define":55,"./_iter-step":57,"./_meta":61,"./_object-create":64,"./_object-dp":65,"./_redefine-all":76,"./_set-species":79}],26:[function(require,module,exports){
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":18,"./_classof":23}],27:[function(require,module,exports){
'use strict';
var redefineAll       = require('./_redefine-all')
  , getWeak           = require('./_meta').getWeak
  , anObject          = require('./_an-object')
  , isObject          = require('./_is-object')
  , anInstance        = require('./_an-instance')
  , forOf             = require('./_for-of')
  , createArrayMethod = require('./_array-methods')
  , $has              = require('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      
      that._l = undefined; 
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":16,"./_an-object":17,"./_array-methods":20,"./_for-of":40,"./_has":42,"./_is-object":51,"./_meta":61,"./_redefine-all":76}],28:[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , $export           = require('./_export')
  , redefine          = require('./_redefine')
  , redefineAll       = require('./_redefine-all')
  , meta              = require('./_meta')
  , forOf             = require('./_for-of')
  , anInstance        = require('./_an-instance')
  , isObject          = require('./_is-object')
  , fails             = require('./_fails')
  , $iterDetect       = require('./_iter-detect')
  , setToStringTag    = require('./_set-to-string-tag')
  , inheritIfRequired = require('./_inherit-if-required');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) 
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":16,"./_export":37,"./_fails":39,"./_for-of":40,"./_global":41,"./_inherit-if-required":46,"./_is-object":51,"./_iter-detect":56,"./_meta":61,"./_redefine":77,"./_redefine-all":76,"./_set-to-string-tag":80}],29:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; 
},{}],30:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":65,"./_property-desc":75}],31:[function(require,module,exports){
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":14}],32:[function(require,module,exports){
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],33:[function(require,module,exports){
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":39}],34:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":41,"./_is-object":51}],35:[function(require,module,exports){
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],36:[function(require,module,exports){
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":70,"./_object-keys":73,"./_object-pie":74}],37:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    own = !IS_FORCED && target && target[key] !== undefined;
    out = (own ? target : source)[key];
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(target)redefine(target, key, out, type & $export.U);
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
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
},{"./_core":29,"./_ctx":31,"./_global":41,"./_hide":43,"./_redefine":77}],38:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){  }
  } return true;
};
},{"./_wks":97}],39:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],40:[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":17,"./_ctx":31,"./_is-array-iter":49,"./_iter-call":53,"./_to-length":91,"./core.get-iterator-method":98}],41:[function(require,module,exports){
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; 
},{}],42:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],43:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":33,"./_object-dp":65,"./_property-desc":75}],44:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":41}],45:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":33,"./_dom-create":34,"./_fails":39}],46:[function(require,module,exports){
var isObject       = require('./_is-object')
  , setPrototypeOf = require('./_set-proto').set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"./_is-object":51,"./_set-proto":78}],47:[function(require,module,exports){
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
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
  } return              fn.apply(that, args);
};
},{}],48:[function(require,module,exports){
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":24}],49:[function(require,module,exports){
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":58,"./_wks":97}],50:[function(require,module,exports){
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":24}],51:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],52:[function(require,module,exports){
var isObject = require('./_is-object')
  , cof      = require('./_cof')
  , MATCH    = require('./_wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./_cof":24,"./_is-object":51,"./_wks":97}],53:[function(require,module,exports){
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":17}],54:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":43,"./_object-create":64,"./_property-desc":75,"./_set-to-string-tag":80,"./_wks":97}],55:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) 
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      setToStringTag(IteratorPrototype, TAG, true);
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":37,"./_has":42,"./_hide":43,"./_iter-create":54,"./_iterators":58,"./_library":60,"./_object-gpo":71,"./_redefine":77,"./_set-to-string-tag":80,"./_wks":97}],56:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){  }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){  }
  return safe;
};
},{"./_wks":97}],57:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],58:[function(require,module,exports){
module.exports = {};
},{}],59:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":73,"./_to-iobject":90}],60:[function(require,module,exports){
module.exports = false;
},{}],61:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, 
    w: {}          
  }});
};
var fastKey = function(it, create){
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    if(!isExtensible(it))return 'F';
    if(!create)return 'E';
    setMeta(it);
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    if(!isExtensible(it))return true;
    if(!create)return false;
    setMeta(it);
  } return it[META].w;
};
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":39,"./_has":42,"./_is-object":51,"./_object-dp":65,"./_uid":94}],62:[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); 
    notify = function(){
      node.data = toggle = !toggle;
    };
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  } else {
    notify = function(){
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":24,"./_global":41,"./_task":87}],63:[function(require,module,exports){
'use strict';
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ 
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":39,"./_iobject":48,"./_object-gops":70,"./_object-keys":73,"./_object-pie":74,"./_to-object":92}],64:[function(require,module,exports){
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){  }
  , PROTOTYPE   = 'prototype';

var createDict = function(){
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; 
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":17,"./_dom-create":34,"./_enum-bug-keys":35,"./_html":44,"./_object-dps":66,"./_shared-key":81}],65:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){  }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":17,"./_descriptors":33,"./_ie8-dom-define":45,"./_to-primitive":93}],66:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":17,"./_descriptors":33,"./_object-dp":65,"./_object-keys":73}],67:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){  }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":33,"./_has":42,"./_ie8-dom-define":45,"./_object-pie":74,"./_property-desc":75,"./_to-iobject":90,"./_to-primitive":93}],68:[function(require,module,exports){
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":69,"./_to-iobject":90}],69:[function(require,module,exports){
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":35,"./_object-keys-internal":72}],70:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],71:[function(require,module,exports){
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":42,"./_shared-key":81,"./_to-object":92}],72:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":19,"./_has":42,"./_shared-key":81,"./_to-iobject":90}],73:[function(require,module,exports){
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":35,"./_object-keys-internal":72}],74:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],75:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],76:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"./_redefine":77}],77:[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":29,"./_global":41,"./_has":42,"./_hide":43,"./_uid":94}],78:[function(require,module,exports){
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? 
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":17,"./_ctx":31,"./_is-object":51,"./_object-gopd":67}],79:[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_descriptors":33,"./_global":41,"./_object-dp":65,"./_wks":97}],80:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":42,"./_object-dp":65,"./_wks":97}],81:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":82,"./_uid":94}],82:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":41}],83:[function(require,module,exports){
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":14,"./_an-object":17,"./_wks":97}],84:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":32,"./_to-integer":89}],85:[function(require,module,exports){
var isRegExp = require('./_is-regexp')
  , defined  = require('./_defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./_defined":32,"./_is-regexp":52}],86:[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./_defined":32,"./_to-integer":89}],87:[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":24,"./_ctx":31,"./_dom-create":34,"./_global":41,"./_html":44,"./_invoke":47}],88:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":89}],89:[function(require,module,exports){
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],90:[function(require,module,exports){
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":32,"./_iobject":48}],91:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; 
};
},{"./_to-integer":89}],92:[function(require,module,exports){
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":32}],93:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":51}],94:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],95:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":29,"./_global":41,"./_library":60,"./_object-dp":65,"./_wks-ext":96}],96:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":97}],97:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":41,"./_shared":82,"./_uid":94}],98:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":23,"./_core":29,"./_iterators":58,"./_wks":97}],99:[function(require,module,exports){
'use strict';
var ctx            = require('./_ctx')
  , $export        = require('./_export')
  , toObject       = require('./_to-object')
  , call           = require('./_iter-call')
  , isArrayIter    = require('./_is-array-iter')
  , toLength       = require('./_to-length')
  , createProperty = require('./_create-property')
  , getIterFn      = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  from: function from(arrayLike){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":30,"./_ctx":31,"./_export":37,"./_is-array-iter":49,"./_iter-call":53,"./_iter-detect":56,"./_to-length":91,"./_to-object":92,"./core.get-iterator-method":98}],100:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); 
  this._i = 0;                   
  this._k = kind;                
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":15,"./_iter-define":55,"./_iter-step":57,"./_iterators":58,"./_to-iobject":90}],101:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":28,"./_collection-strong":25}],102:[function(require,module,exports){
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./_export":37}],103:[function(require,module,exports){
var $export = require('./_export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./_export":37}],104:[function(require,module,exports){
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":37,"./_object-assign":63}],105:[function(require,module,exports){
'use strict';
var classof = require('./_classof')
  , test    = {};
test[require('./_wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./_classof":23,"./_redefine":77,"./_wks":97}],106:[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){  }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){  }
}();

var sameConstructor = function(a, b){
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); 
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; 
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; 
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; 
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); 
  }
};

if(!USE_NATIVE){
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             
    this._a = undefined;      
    this._s = 0;              
    this._d = false;          
    this._v = undefined;      
    this._h = 0;              
    this._n = false;          
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  resolve: function resolve(x){
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":14,"./_an-instance":16,"./_classof":23,"./_core":29,"./_ctx":31,"./_export":37,"./_for-of":40,"./_global":41,"./_is-object":51,"./_iter-detect":56,"./_library":60,"./_microtask":62,"./_redefine-all":76,"./_set-species":79,"./_set-to-string-tag":80,"./_species-constructor":83,"./_task":87,"./_wks":97}],107:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

module.exports = require('./_collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./_collection":28,"./_collection-strong":25}],108:[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , context  = require('./_string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString ){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./_export":37,"./_fails-is-regexp":38,"./_string-context":85}],109:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); 
  this._i = 0;                
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":55,"./_string-at":84}],110:[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  repeat: require('./_string-repeat')
});
},{"./_export":37,"./_string-repeat":86}],111:[function(require,module,exports){
'use strict';
var $export     = require('./_export')
  , toLength    = require('./_to-length')
  , context     = require('./_string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString ){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./_export":37,"./_fails-is-regexp":38,"./_string-context":85,"./_to-length":91}],112:[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  create: $create,
  defineProperty: $defineProperty,
  defineProperties: $defineProperties,
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  getOwnPropertyNames: $getOwnPropertyNames,
  getOwnPropertySymbols: $getOwnPropertySymbols
});

$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; 
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
setToStringTag($Symbol, 'Symbol');
setToStringTag(Math, 'Math', true);
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":17,"./_descriptors":33,"./_enum-keys":36,"./_export":37,"./_fails":39,"./_global":41,"./_has":42,"./_hide":43,"./_is-array":50,"./_keyof":59,"./_library":60,"./_meta":61,"./_object-create":64,"./_object-dp":65,"./_object-gopd":67,"./_object-gopn":69,"./_object-gopn-ext":68,"./_object-gops":70,"./_object-keys":73,"./_object-pie":74,"./_property-desc":75,"./_redefine":77,"./_set-to-string-tag":80,"./_shared":82,"./_to-iobject":90,"./_to-primitive":93,"./_uid":94,"./_wks":97,"./_wks-define":95,"./_wks-ext":96}],113:[function(require,module,exports){
'use strict';
var each         = require('./_array-methods')(0)
  , redefine     = require('./_redefine')
  , meta         = require('./_meta')
  , assign       = require('./_object-assign')
  , weak         = require('./_collection-weak')
  , isObject     = require('./_is-object')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

var $WeakMap = module.exports = require('./_collection')('WeakMap', wrapper, methods, weak, true, true);

if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":20,"./_collection":28,"./_collection-weak":27,"./_is-object":51,"./_meta":61,"./_object-assign":63,"./_redefine":77}],114:[function(require,module,exports){
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":26,"./_export":37}],115:[function(require,module,exports){
var $export  = require('./_export');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json')('Set')});
},{"./_collection-to-json":26,"./_export":37}],116:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":95}],117:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":95}],118:[function(require,module,exports){
var $iterators    = require('./es6.array.iterator')
  , redefine      = require('./_redefine')
  , global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , wks           = require('./_wks')
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"./_global":41,"./_hide":43,"./_iterators":58,"./_redefine":77,"./_wks":97,"./es6.array.iterator":100}],119:[function(require,module,exports){
var process = module.exports = {};


var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; 
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],120:[function(require,module,exports){
(function (process,global){

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; 
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
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

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

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
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
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

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
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

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            context.delegate = null;

            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            method = "throw";
            arg = record.arg;
            continue;
          }

          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

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
        return !!caught;
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
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
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

      return ContinueSentinel;
    }
  };
})(
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":119}],121:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


(function de_main_func_inner(scriptStorage, FormData, scrollTo, localData) {
	'use strict';

	var _marked = [getFormElements].map(regeneratorRuntime.mark);

	var version = '17.10.24.0';
	var commit = '1246dbf';


	var defaultCfg = {
		'disabled': 0, 
		'language': 0, 
		'hideBySpell': 1, 
		'spells': null, 
		'sortSpells': 0, 
		'menuHiddBtn': 1, 
		'hideRefPsts': 0, 
		'delHiddPost': 0, 
		'ajaxUpdThr': 1, 
		'updThrDelay': 20, 
		'updCount': 1, 
		'favIcoBlink': 0, 
		'desktNotif': 0, 
		'noErrInTitle': 0, 
		'markNewPosts': 1, 
		'useDobrAPI': 1, 
		'markMyPosts': 1, 
		'hideReplies': 0, 
		'expandTrunc': 0, 
		'updThrBtns': 1, 
		'showHideBtn': 1, 
		'showRepBtn': 1, 
		'postBtnsCSS': 1, 
		'postBtnsBack': '#8c8c8c', 
		'noSpoilers': 1, 
		'noPostNames': 0, 
		'widePosts': 0, 
		'correctTime': 0, 
		'timeOffset': '+0', 
		'timePattern': '', 
		'timeRPattern': '', 
		'expandImgs': 2, 
		'imgNavBtns': 1, 
		'imgInfoLink': 1, 
		'resizeDPI': 0, 
		'resizeImgs': 1, 
		'minImgSize': 100, 
		'zoomFactor': 25, 
		'webmControl': 1, 
		'webmTitles': 0, 
		'webmVolume': 100, 
		'minWebmWidth': 320, 
		'preLoadImgs': 0, 
		'findImgFile': 0, 
		'openImgs': 0, 
		'imgSrcBtns': 1, 
		'delImgNames': 0, 
		'maskImgs': 0, 
		'maskVisib': 7, 
		'linksNavig': 1, 
		'linksOver': 100, 
		'linksOut': 1500, 
		'markViewed': 0, 
		'strikeHidd': 0, 
		'removeHidd': 0, 
		'noNavigHidd': 0, 
		'markMyLinks': 1, 
		'crossLinks': 0, 
		'decodeLinks': 0, 
		'insertNum': 1, 
		'addOPLink': 0, 
		'addImgs': 0, 
		'addMP3': 1, 
		'addVocaroo': 1, 
		'addYouTube': 3, 
		'YTubeType': 0, 
		'YTubeWidth': 360, 
		'YTubeHeigh': 270, 
		'YTubeTitles': 0, 
		'ytApiKey': '', 
		'addVimeo': 1, 
		'ajaxPosting': 1, 
		'postSameImg': 1, 
		'removeEXIF': 1, 
		'removeFName': 0, 
		'sendErrNotif': 1, 
		'scrAfterRep': 0, 
		'fileInputs': 2, 
		'addPostForm': 2, 
		'spacedQuote': 1, 
		'favOnReply': 1, 
		'warnSubjTrip': 0, 
		'addSageBtn': 1, 
		'saveSage': 1, 
		'sageReply': 0, 
		'cap4chanAlt': 1, 
		'capUpdTime': 300, 
		'captchaLang': 1, 
		'addTextBtns': 1, 
		'txtBtnsLoc': 1, 
		'passwValue': '', 
		'userName': 0, 
		'nameValue': '', 
		'noBoardRule': 1, 
		'noPassword': 1, 
		'noName': 0, 
		'noSubj': 0, 
		'scriptStyle': 0, 
		'userCSS': 0, 
		'userCSSTxt': '', 
		'expandPanel': 0, 
		'panelCounter': 1, 
		'rePageTitle': 1, 
		'animation': 1, 
		'closePopups': 0, 
		'inftyScroll': 1, 
		'scrollToTop': 0, 
		'hotKeys': 1, 
		'loadPages': 1, 
		'updScript': 1, 
		'scrUpdIntrv': 1, 
		'turnOff': 0, 
		'textaWidth': 300, 
		'textaHeight': 115, 
		'replyWinDrag': 0, 
		'replyWinX': 'right: 0', 
		'replyWinY': 'top: 0', 
		'cfgWinDrag': 0, 
		'cfgWinX': 'right: 0', 
		'cfgWinY': 'top: 0', 
		'cfgTab': 'filters', 
		'hidWinDrag': 0, 
		'hidWinX': 'right: 0', 
		'hidWinY': 'top: 0', 
		'favWinDrag': 0, 
		'favWinX': 'right: 0', 
		'favWinY': 'top: 0', 
		'favWinWidth': 500, 
		'vidWinDrag': 0, 
		'vidWinX': 'right: 0', 
		'vidWinY': 'top: 0' 
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
			updThrBtns: ['Кнопки "Получить новые посты" в списке тредов', 'Show "Get new posts" buttons in threads list', 'Кнопки "Отримати нові пости" у списку тредів'],
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
			preLoadImgs: ['Предварительно загружать картинки*', 'Preload images*', 'Наперед завантажувати зображення *'],
			findImgFile: ['Распознавать файлы, встроенные в картинках*', 'Detect embedded files in images*', 'Розпізнавати файли, що вбудовані в зображення*'],
			openImgs: {
				sel: [['Откл.', 'Все подряд', 'Только GIF', 'Кроме GIF'], ['Disable', 'All types', 'Only GIF', 'Non-GIF'], ['Вимк.', 'Всі', 'Лише GIF', 'Окрім GIF']],
				txt: ['Заменять картинки на оригиналы*', 'Replace thumbnails with original images*', 'Замінювати зображення на оригінали*']
			},
			imgSrcBtns: ['Добавлять кнопки "Поиск" для картинок', 'Add "Search" buttons for images', 'Додавати кнопки "Пошук" для зображень'],
			delImgNames: ['Скрывать имена картинок', 'Hide filenames', 'Ховати імена зображень'],
			maskVisib: ['Видимость для NSFW-изображений [0-100%]', 'Visibility for NSFW images [0-100%]', 'Видимість для NSFW-зображень [0-100%]'],

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
			YTubeType: {
				sel: [['Flash', 'HTML5'], ['Flash', 'HTML5'], ['Flash', 'HTML5']],
				txt: ['', '', '']
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
			cap4chanAlt: ['4chan: альтернативная капча*', '4chan: use alternative captcha*', '4chan: альтернативна капча*'],
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
			updScript: ['Автоматически проверять обновления Dollchan', 'Auto check for Dollchan updates', 'Автоматично перевіряти оновлення Dollchan'],
			scrUpdIntrv: {
				sel: [['Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'], ['Every day', 'Every 2 days', 'Every week', 'Every 2 weeks', 'Every month'], ['Щодня', 'Кожні 2 дні', 'Щотижня', 'Кожні 2 тижні', 'Щомісяця']],
				txt: ['', '', '']
			},
			excludeList: ['Не запускать Dollchan на:', 'Prevent Dollchan launch on:', 'Не запускати Dollchan на:'],
			turnOff: ['Запускать Dollchan только на этом сайте', 'Run Dollchan only on this site', 'Запускати Dollchan лише на цьому сайті']
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
			preimg: ['Предзагрузить картинки&#13;([Ctrl+Click] только для новых постов)', 'Preload images&#13;([Ctrl+Click] for new posts only)', 'Наперед завантажити зображення&#13;([Ctrl+Click] лише для нових постів)'],
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
		replyToPost: ['Ответить на пост', 'Reply to post', 'Відповісти на пост'],
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
			refs: ['Скрыть с ответами', 'Hide with answers', 'Сховати з відповідями']
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
			'янв': 0, 'фев': 1, 'мар': 2, 'апр': 3, 'май': 4, 'мая': 4, 'июн': 5, 'июл': 6, 'авг': 7, 'сен': 8, 'окт': 9, 'ноя': 10, 'дек': 11,
			'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11,
			'січ': 0, 'лют': 1, 'бер': 2, 'кві': 3, 'тра': 4, 'чер': 5, 'лип': 6, 'сер': 7, 'вер': 8, 'жов': 9, 'лис': 10, 'гру': 11
		},

		seSyntaxErr: ['синтаксическая ошибка в аргументе спелла: %s', 'syntax error in argument of spell: %s', 'синтаксична помилка в аргументі спеллу: %s'],
		seUnknown: ['неизвестный спелл: %s', 'unknown spell: %s', 'невідомий спелл: %s'],
		seMissOp: ['пропущен оператор', 'missing operator', 'пропущено оператор'],
		seMissArg: ['пропущен аргумент спелла: %s', 'missing argument of spell: %s', 'пропущено аргумент спеллу: %s'],
		seMissSpell: ['пропущен спелл', 'missing spell', 'пропущено спелл'],
		seErrRegex: ['синтаксическая ошибка в регулярном выражении: %s', 'syntax error in regular expression: %s', 'синтаксична помилка в регулярному виразі: %s'],
		seUnexpChar: ['неожиданный символ: %s', 'unexpected character: %s', 'неочікуваний символ: %s'],
		seMissClBkt: ['пропущена закрывающая скобка', 'missing \')\' in expression', 'пропущено закривну дужку'],
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
		delEntries: ['Выбрать и удалить записи', 'Select and delete entries', 'Обрати та видалити записи'],
		saveChanges: ['Сохранить внесенные изменения', 'Save your changes', 'Зберегти внесені зміни'],
		hiddenPosts: ['Скрытые посты', 'Hidden posts', 'Сховані пости'],
		hidPostThr: ['Скрытые посты и треды', 'Hidden posts and threads', 'Сховані пости та треди'],
		myPosts: ['Мои посты', 'My posts', 'Мої пости'],

		checkNow: ['Проверить сейчас', 'Check now', 'Перевірити зараз'],
		updAvail: ['Доступно обновление Dollchan!', 'Dollchan update available!', 'Доступне оновлення Dollchan!'],
		haveLatest: ['У вас стоит последняя стабильная версия!', 'You have the latest stable version!', 'Ви маєте останню стабільну версію!'],
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

		hideLnkList: ['Скрыть/Показать список ссылок', 'Hide/Unhide list of links', 'Сховати/показати перелік посилань'],
		expandVideo: ['Развернуть/Свернуть видео', 'Expand/Collapse video', 'Розгорнути/згорнути відео'],
		prevVideo: ['Предыдущее видео', 'Previous video', 'Попереднє відео'],
		nextVideo: ['Следующее видео', 'Next video', 'Наступне відео'],
		duration: ['Продолжительность: ', 'Duration: ', 'Тривалість: '],
		published: ['опубликовано: ', 'published: ', 'опубліковано: '],
		author: ['Автор: ', 'Author: ', 'Автор: '],
		views: ['просмотров: ', 'views: ', 'переглядів: '],

		dropFileHere: ['Бросьте сюда файл(ы) или ссылку', 'Drop file(s) or link here', 'Киньте сюди файл(и) чи посилання'],
		youCanDrag: ['Можно перетаскивать картинки и ссылки на файлы&#13;прямо со страницы или других сайтов', 'You can drag images and file links&#13;directly from the page or other sites', 'Можна перетягувати зображення чи посилання на файли&#13;безпосередньо зі сторінки чи інших сайтів'],
		removeFile: ['Удалить файл', 'Remove file', 'Видалити файл'],
		spoilFile: ['Спойлер', 'Spoiler', 'Спойлер'],
		addManually: ['Ввести ссылку на файл вручную', 'Enter a link to the file manually', 'Ввести посилання на файл вручну'],
		enterTheLink: ['Введите ссылку и нажмите \'+\'', 'Enter the link and click \'+\'', 'Введіть посилання та натисніть \'+\''],
		helpAddFile: ['Встроить ogg/rar/zip/7z в картинку', 'Embed ogg/rar/zip/7z into the image', 'Вбудувати ogg/rar/zip/7z в зображення'],

		expImgInline: ['[Click] открыть в посте, [Ctrl+Click] по центру', '[Click] expand in post, [Ctrl+Click] by center', '[Click] розгорнути в пості, [Ctrl+Click] в центрі'],
		expImgFull: ['[Click] открыть по центру, [Ctrl+Click] в посте', '[Click] expand by center, [Ctrl+Click] in post', '[Click] розгорнути в центрі, [Ctrl+Click] в пості'],
		nextImg: ['Следующая картинка', 'Next image', 'Наступне зображення'],
		prevImg: ['Предыдущая картинка', 'Previous image', 'Попереднє зображення'],
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
		thrNotFound: ['Тред недоступен (№', 'Thread is unavailable (№', 'Тред недоступний (№'],
		thrClosed: ['Тред закрыт', 'Thread is closed', 'Тред закрито'],
		thrArchived: ['Тред в архиве', 'Thread is archived', 'Тред заархівовано'],

		internalError: ['Внутренняя ошибка:\n', 'Internal error:\n', 'Внутрішня помилка:\n'],
		postNotFound: ['Пост не найден', 'Post not found', 'пост не знайдено'],
		noHidThr: ['Нет скрытых тредов…', 'No hidden threads…', 'Немає схованих постів…'],
		noFavThr: ['Нет избранных тредов…', 'Favorites is empty…', 'Немає вибраних тредів…'],
		noVideoLinks: ['Нет ссылок на видео…', 'No video links…', 'Немає посилань на відео…'],
		invalidData: ['Некорректный формат данных', 'Incorrect data format', 'Некоректний формат даних'],
		noGlobalCfg: ['Глобальные настройки не найдены', 'Global config not found', 'Глобальні налаштування не знайдено'],
		subjHasTrip: ['Поле "Тема" содержит трипкод!', '"Subject" field contains a tripcode!', 'Поле "Тема" містить трипкод!'],
		errMsEdgeWebm: ['Загрузите скрипт для воспроизведения WebM (VP9/Opus)', 'Please load a script to play WebM (VP9/Opus)', 'Завантажте скрипт для відтворення WebM (VP9/Opus)'],

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
		deletion: ['Удаление…', 'Deletion…', 'Видалення…'],
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


	var doc = window.document,
	    emptyFn = Function.prototype,
	    aProto = Array.prototype;
	var Images_ = { preloading: false, afterpreload: null, progressId: null, canvas: null };
	var gitWiki = 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/';
	var gitRaw = 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/';

	var docBody = void 0,
	    locStorage = void 0,
	    sesStorage = void 0,
	    Cfg = void 0,
	    pByEl = void 0,
	    pByNum = void 0,
	    aib = void 0,
	    nav = void 0,
	    updater = void 0,
	    dTime = void 0,
	    pr = void 0,
	    dummy = void 0,
	    lang = void 0,
	    isExpImg = void 0,
	    isPreImg = void 0,
	    needScroll = void 0,
	    excludeList = void 0,
	    quotetxt = '',
	    nativeXHRworks = true,
	    visPosts = 2,
	    topWinZ = 0;



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

	var $each = function $each(els, cb) {
		return aProto.forEach.call(els, cb);
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
		var next = el.nextSibling;
		if (next) {
			el.parentNode.insertBefore(node, next);
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
		if (nav.Safari && !('flex' in docBody.style)) {
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
		var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		el.addEventListener('animationend', function aEvent() {
			el.removeEventListener('animationend', aEvent);
			if (remove) {
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

	var $join = function $join(arr, start, end) {
		return start + arr.join(end + start) + end;
	};

	var fixBrd = function fixBrd(b) {
		return '/' + b + (b ? '/' : '');
	};

	var getAbsLink = function getAbsLink(url) {
		return url[1] === '/' ? aib.prot + url : url[0] === '/' ? aib.prot + '//' + aib.host + url : url;
	};

	var quoteReg = function quoteReg(str) {
		return (str + '').replace(/([.?*+^$[\]\\(){}|\-])/g, '\\$1');
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
		if (el && nav.Presto) {
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
		getData: function getData(full) {
			var duration = void 0,
			    i = 1;
			var marks = this._marks;
			var timeLog = [];
			for (var len = marks.length - 1, lastExtra = 0; i < len; ++i) {
				duration = marks[i][1] - marks[i - 1][1] + lastExtra;
				if (full || duration > 1) {
					lastExtra = 0;
					timeLog.push([marks[i][0], duration]);
				} else {
					lastExtra = duration;
				}
			}
			duration = marks[i][1] - marks[0][1];
			timeLog.push([Lng.total[lang], duration]);
			return timeLog;
		},
		init: function init() {
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

	function sleep(ms) {
		return new Promise(function (resolve, reject) {
			return setTimeout(resolve, ms);
		});
	}

	function CancelError() {}

	var CancelablePromise = function () {
		_createClass(CancelablePromise, null, [{
			key: 'reject',
			value: function reject(val) {
				return new CancelablePromise(function (res, rej) {
					return rej(val);
				});
			}
		}, {
			key: 'resolve',
			value: function resolve(val) {
				return new CancelablePromise(function (res, rej) {
					return res(val);
				});
			}
		}]);

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
					for (var _iterator = children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var child = _ref;

						child.cancel();
					}
					_this2.cancel();
				});
			}
		}, {
			key: 'catch',
			value: function _catch(eb) {
				return this.then(void 0, eb);
			}
		}, {
			key: 'cancel',
			value: function cancel() {
				this._reject(new CancelError());
				if (!this._isResolved && this._cancelFn) {
					this._cancelFn();
				}
			}
		}]);

		return CancelablePromise;
	}();

	function Maybe(ctor ) {
		this._ctor = ctor;
		this.hasValue = false;
	}
	Maybe.prototype = {
		get value() {
			var ctor = this._ctor;
			this.hasValue = !!ctor;
			var val = ctor ? new ctor() : null;
			Object.defineProperty(this, 'value', { value: val });
			return val;
		},
		end: function end() {
			if (this.hasValue) {
				this.value.end();
			}
		}
	};

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
			key: 'remove',
			value: function remove(key) {
				if (this.data) {
					this.data['delete'](key);
				}
			}
		}]);

		return TemporaryContent;
	}();

	TemporaryContent.purgeSecs = 6e4;

	function TasksPool(tasksCount, taskFunc, endFn) {
		this.array = [];
		this.running = 0;
		this.num = 1;
		this.func = taskFunc;
		this.endFn = endFn;
		this.max = tasksCount;
		this.completed = this.paused = this.stopped = false;
	}
	TasksPool.PauseError = function (duration) {
		this.name = 'TasksPool.PauseError';
		this.duration = duration;
	};
	TasksPool.prototype = {
		complete: function complete() {
			if (!this.stopped) {
				if (this.array.length === 0 && this.running === 0) {
					this.endFn();
				} else {
					this.completed = true;
				}
			}
		},
		'continue': function _continue() {
			if (!this.stopped) {
				this.paused = false;
				if (this.array.length === 0) {
					if (this.completed) {
						this.endFn();
					}
					return;
				}
				while (this.array.length !== 0 && this.running !== this.max) {
					this._run(this.array.shift());
					this.running++;
				}
			}
		},
		pause: function pause() {
			this.paused = true;
		},
		run: function run(data) {
			if (!this.stopped) {
				if (this.paused || this.running === this.max) {
					this.array.push(data);
				} else {
					this._run(data);
					this.running++;
				}
			}
		},
		stop: function stop() {
			this.stopped = true;
			this.endFn();
		},
		_end: function _end() {
			if (!this.stopped) {
				if (!this.paused && this.array.length !== 0) {
					this._run(this.array.shift());
					return;
				}
				this.running--;
				if (!this.paused && this.completed && this.running === 0) {
					this.endFn();
				}
			}
		},
		_run: function _run(data) {
			var _this3 = this;

			this.func(this.num++, data).then(function () {
				return _this3._end();
			}, function (e) {
				if (e instanceof TasksPool.PauseError) {
					_this3.pause();
					if (e.duration !== -1) {
						setTimeout(function () {
							return _this3['continue']();
						}, e.duration);
					}
				} else {
					_this3._end();
					throw e;
				}
			});
		}
	};

	function TarBuilder() {
		this._data = [];
	}
	TarBuilder.prototype = {
		addFile: function addFile(filepath, input) {
			var i = void 0,
			    checksum = 0;
			var fileSize = input.length;
			var header = new Uint8Array(512);
			var nameLen = Math.min(filepath.length, 100);
			for (i = 0; i < nameLen; ++i) {
				header[i] = filepath.charCodeAt(i) & 0xFF;
			}
			this._padSet(header, 100, '100777', 8); 
			this._padSet(header, 108, '0', 8); 
			this._padSet(header, 116, '0', 8); 
			this._padSet(header, 124, fileSize.toString(8), 13); 
			this._padSet(header, 136, Math.floor(Date.now() / 1000).toString(8), 12); 
			this._padSet(header, 148, '        ', 8); 
			header[156] = 0x30;
			for (i = 0; i < 157; i++) {
				checksum += header[i];
			}
			this._padSet(header, 148, checksum.toString(8), 8);
			this._data.push(header, input);
			if ((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
				this._data.push(new Uint8Array(i));
			}
		},
		addString: function addString(filepath, str) {
			var sDat = unescape(encodeURIComponent(str));
			var len = sDat.length;
			var data = new Uint8Array(len);
			for (var i = 0; i < len; ++i) {
				data[i] = sDat.charCodeAt(i) & 0xFF;
			}
			this.addFile(filepath, data);
		},
		get: function get() {
			this._data.push(new Uint8Array(1024));
			return new Blob(this._data, { type: 'application/x-tar' });
		},
		_padSet: function _padSet(data, offset, num, len) {
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
	};

	function getErrorMessage(e) {
		if (e instanceof AjaxError) {
			return e.toString();
		}
		if (typeof e === 'string') {
			return e;
		}
		return Lng.internalError[lang] + (!e.stack ? e.name + ': ' + e.message : nav.WebKit ? e.stack : e.name + ': ' + e.message + '\n' + (!nav.Firefox ? e.stack : e.stack.replace(/^([^@]*).*\/(.+)$/gm, function (str, fName, line) {
			return '    at ' + (fName ? fName + ' (' + line + ')' : line);
		})));
	}

	function getFormElements(form, submitter) {
		var controls, fixName, i, len, field, tagName, type, name, options, j, jlen, option, imgFile, files, _j, _jlen, dirname;

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
						return {
							el: field,
							name: fixName(name),
							value: option.value,
							type: type
						};

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
						return {
							el: field,
							name: fixName(name),
							value: field.value || 'on',
							type: type
						};

					case 30:
						return _context.abrupt('continue', 62);

					case 31:
						imgFile = void 0;

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
						return {
							el: field,
							name: name,
							value: files[_j],
							type: type
						};

					case 38:
						++_j;
						_context.next = 35;
						break;

					case 41:
						_context.next = 50;
						break;

					case 43:
						if (!(field.obj && (imgFile = field.obj.imgFile))) {
							_context.next = 48;
							break;
						}

						_context.next = 46;
						return {
							el: field,
							name: name,
							value: new File([imgFile[0]], imgFile[1], { type: imgFile[2] }),
							type: type
						};

					case 46:
						_context.next = 50;
						break;

					case 48:
						_context.next = 50;
						return {
							el: field,
							name: fixName(name),
							value: new File([''], ''),
							type: 'application/octet-stream'
						};

					case 50:
						return _context.abrupt('continue', 62);

					case 51:
						if (!(type === 'textarea')) {
							_context.next = 56;
							break;
						}

						_context.next = 54;
						return {
							el: field,
							name: name || '',
							value: field.value,
							type: type
						};

					case 54:
						_context.next = 58;
						break;

					case 56:
						_context.next = 58;
						return {
							el: field,
							name: fixName(name),
							value: field.value,
							type: type
						};

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
							value: nav.matchesSelector(field, ':dir(rtl)') ? 'rtl' : 'ltr',
							type: 'direction'
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
		}, _marked[0], this);
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

	function prettifySize(val) {
		if (val > 512 * 1024 * 1024) {
			return (val / (1024 * 1024 * 1024)).toFixed(2) + Lng.sizeGByte[lang];
		}
		if (val > 512 * 1024) {
			return (val / (1024 * 1024)).toFixed(2) + Lng.sizeMByte[lang];
		}
		if (val > 512) {
			return (val / 1024).toFixed(2) + Lng.sizeKByte[lang];
		}
		return val.toFixed(2) + Lng.sizeByte[lang];
	}

	function getFileType(url) {
		return (/\.jpe?g$/i.test(url) ? 'image/jpeg' : /\.png$/i.test(url) ? 'image/png' : /\.gif$/i.test(url) ? 'image/gif' : /\.webm$/i.test(url) ? 'video/webm' : ''
		);
	}

	function downloadBlob(blob, name) {
		var url = nav.MsEdge ? navigator.msSaveOrOpenBlob(blob, name) : window.URL.createObjectURL(blob);
		var link = docBody.appendChild($add('<a href="' + url + '" download="' + name + '"></a>'));
		link.click();
		setTimeout(function () {
			window.URL.revokeObjectURL(url);
			$del(link);
		}, 2e5);
	}


	function getStored(id) {
		return regeneratorRuntime.async(function getStored$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (!nav.isNewGM) {
							_context2.next = 6;
							break;
						}

						_context2.next = 3;
						return regeneratorRuntime.awrap(GM.getValue(id));

					case 3:
						return _context2.abrupt('return', _context2.sent);

					case 6:
						if (!nav.isGM) {
							_context2.next = 10;
							break;
						}

						return _context2.abrupt('return', GM_getValue(id));

					case 10:
						if (!nav.isChromeStorage) {
							_context2.next = 16;
							break;
						}

						_context2.next = 13;
						return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
							return chrome.storage.local.get(id, function (obj) {
								if (Object.keys(obj).length) {
									resolve(obj[id]);
								} else {
									chrome.storage.sync.get(id, function (obj) {
										resolve(obj[id]);
									});
								}
							});
						}));

					case 13:
						return _context2.abrupt('return', _context2.sent);

					case 16:
						if (!nav.isScriptStorage) {
							_context2.next = 18;
							break;
						}

						return _context2.abrupt('return', scriptStorage.getItem(id));

					case 18:
						return _context2.abrupt('return', locStorage[id]);

					case 19:
					case 'end':
						return _context2.stop();
				}
			}
		}, null, this);
	}

	function setStored(id, value) {
		if (nav.isNewGM) {
			return GM.setValue(id, value);
		} else if (nav.isGM) {
			GM_setValue(id, value);
		} else if (nav.isChromeStorage) {
			(function () {
				var obj = {};
				obj[id] = value;
				chrome.storage.sync.set(obj, function () {
					if (chrome.runtime.lastError) {
						chrome.storage.local.set(obj, emptyFn);
						chrome.storage.sync.remove(id, emptyFn);
					} else {
						chrome.storage.local.remove(id, emptyFn);
					}
				});
			})();
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
	}

	function getStoredObj(id) {
		return regeneratorRuntime.async(function getStoredObj$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.t1 = JSON;
						_context3.next = 3;
						return regeneratorRuntime.awrap(getStored(id));

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
		}, null, this);
	}

	function saveCfgObj(dm, obj) {
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
	}

	function readCfg() {
		var obj, val, hasGlobal;
		return regeneratorRuntime.async(function readCfg$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						obj = void 0;
						_context4.next = 3;
						return regeneratorRuntime.awrap(getStoredObj('DESU_Config'));

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
							aib.jsonBuilder = null;
						}
						if (!('FormData' in window)) {
							Cfg.ajaxPosting = 0;
						}
						if (!('Notification' in window)) {
							Cfg.desktNotif = 0;
						}
						if (nav.Presto) {
							if (Cfg.YTubeType === 2) {
								Cfg.YTubeType = 1;
							}
							Cfg.preLoadImgs = 0;
							Cfg.findImgFile = 0;
							if (!nav.isGM) {
								Cfg.updScript = 0;
							}
							Cfg.fileInputs = 0;
						}
						if (nav.isChromeStorage) {
							Cfg.updScript = 0;
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
						if (Cfg.updScript) {
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
		}, null, this);
	}

	function readPostsData(firstPost, fav) {
		var sVis = null;
		try {
			var str = aib.t ? sesStorage['de-hidden-' + aib.b + aib.t] : null;
			if (str) {
				var json = JSON.parse(str);
				if (json.hash === (Cfg.hideBySpell ? Spells.hash : 0) && pByNum.has(json.lastNum) && pByNum.get(json.lastNum).count === json.lastCount) {
					sVis = json.data && json.data[0] instanceof Array ? json.data : null;
				}
			}
		} catch (e) {
			sesStorage['de-hidden-' + aib.b + aib.t] = null;
		}
		if (!firstPost) {
			return;
		}
		var updateFav = false;
		var favBrd = aib.host in fav && aib.b in fav[aib.host] ? fav[aib.host][aib.b] : {};
		var spellsHide = Cfg.hideBySpell;
		var maybeSpells = new Maybe(SpellsRunner);

		for (var _post = firstPost; _post; _post = _post.next) {
			var num = _post.num;
			if (_post.isOp && num in favBrd) {
				var f = favBrd[num];
				var thr = _post.thr;
				_post.setFavBtn(true);
				if (aib.t) {
					f.cnt = thr.pcount;
					f['new'] = 0;
					f.you = 0;
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
					f['new'] = thr.pcount - f.cnt;
				}
				updateFav = true;
			}
			if (HiddenPosts.has(num)) {
				var uHideData = HiddenPosts.get(num);
				if (!uHideData && _post.isOp && HiddenThreads.has(num)) {
					_post.setUserVisib(true);
				} else {
					_post.setUserVisib(uHideData, false);
				}
				continue;
			}
			var hideData = void 0;
			if (_post.isOp) {
				if (HiddenThreads.has(num)) {
					hideData = [true, null];
				} else if (spellsHide) {
					hideData = sVis && sVis[_post.count];
				}
			} else if (spellsHide) {
				hideData = sVis && sVis[_post.count];
			} else {
				continue;
			}
			if (!hideData) {
				maybeSpells.value.run(_post); 
			} else if (hideData[0]) {
				if (_post.hidden) {
					_post.spellHidden = true;
				} else {
					_post.spellHide(hideData[1]);
				}
			}
		}
		maybeSpells.end();
		if (Cfg.panelCounter === 2) {
			$id('de-panel-info-pcount').textContent = Thread.first.pcount - Thread.first.hidCounter;
		}
		if (updateFav) {
			setStored('DESU_Favorites', JSON.stringify(fav));
		}
		if (sesStorage['de-win-fav'] === '1') {
			toggleWindow('fav', false, null, true);
			sesStorage.removeItem('de-win-fav');
		}
	}

	function readFavorites() {
		return getStoredObj('DESU_Favorites');
	}

	function saveFavorites(fav) {
		setStored('DESU_Favorites', JSON.stringify(fav));
		toggleWindow('fav', true, fav);
	}

	function removeFavoriteEntry(fav, h, b, num) {
		if (h in fav && b in fav[h] && num in fav[h][b]) {
			delete fav[h][b][num];
			if (fav[h][b].hasOwnProperty('url') && Object.keys(fav[h][b]).length === 1) {
				delete fav[h][b];
				if ($isEmpty(fav[h])) {
					delete fav[h];
				}
			}
		}
	}

	function readViewedPosts() {
		if (!Cfg.markViewed) {
			var data = sesStorage['de-viewed'];
			if (data) {
				data.split(',').forEach(function (pNum) {
					var post = pByNum.get(+pNum);
					if (post) {
						post.el.classList.add('de-viewed');
						post.viewed = true;
					}
				});
			}
		}
	}


	var PostsStorage = function (_ref2) {
		_inherits(PostsStorage, _ref2);

		function PostsStorage() {
			_classCallCheck(this, PostsStorage);

			return _possibleConstructorReturn(this, (PostsStorage.__proto__ || Object.getPrototypeOf(PostsStorage)).apply(this, arguments));
		}

		_createClass(PostsStorage, null, [{
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
			key: 'remove',
			value: function remove(num) {
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
				if (storage && storage.$count > 5000) {
					var minDate = Date.now() - 5 * 24 * 3600 * 1000;
					for (var b in storage) {
						if (storage.hasOwnProperty(b)) {
							var _data = storage[b];
							for (var key in _data) {
								if (_data.hasOwnProperty(key) && _data[key][0] < minDate) {
									delete _data[key];
								}
							}
						}
					}
				}
				if (!storage[aib.b]) {
					storage[aib.b] = {};
				}
				storage[aib.b][num] = [this._cachedTime, thrNum, data];
				this._saveStorage();
			}
		}, {
			key: '_migrateOld',
			value: function _migrateOld(newName, oldName) {
				if (locStorage.hasOwnProperty(oldName)) {
					locStorage[newName] = locStorage[oldName];
					locStorage.removeItem(oldName);
				}
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
					} catch (e) {}
				}
				return this._cachedStorage = {};
			}
		}, {
			key: '_saveStorage',
			value: function _saveStorage() {
				var _this5 = this;

				if (this._cacheTO === null) {
					this._cacheTO = setTimeout(function () {
						if (_this5._cachedStorage) {
							locStorage[_this5.storageName] = JSON.stringify(_this5._cachedStorage);
						}
						_this5.purge();
					}, 0);
				}
			}
		}, {
			key: '_cachedTime',
			get: function get() {
				return this.__cachedTime || (this.__cachedTime = Date.now());
			}
		}]);

		return PostsStorage;
	}(null);

	PostsStorage.storageName = '';
	PostsStorage.__cachedTime = null;
	PostsStorage._cachedStorage = null;
	PostsStorage._cacheTO = null;

	var HiddenPosts = function (_PostsStorage) {
		_inherits(HiddenPosts, _PostsStorage);

		function HiddenPosts() {
			_classCallCheck(this, HiddenPosts);

			return _possibleConstructorReturn(this, (HiddenPosts.__proto__ || Object.getPrototypeOf(HiddenPosts)).apply(this, arguments));
		}

		_createClass(HiddenPosts, null, [{
			key: '_readStorage',
			value: function _readStorage() {
				this._migrateOld(this.storageName, 'de-threads-new'); 
				return _get(HiddenPosts.__proto__ || Object.getPrototypeOf(HiddenPosts), '_readStorage', this).call(this);
			}
		}]);

		return HiddenPosts;
	}(PostsStorage);

	HiddenPosts.storageName = 'de-posts';

	var HiddenThreads = function (_PostsStorage2) {
		_inherits(HiddenThreads, _PostsStorage2);

		function HiddenThreads() {
			_classCallCheck(this, HiddenThreads);

			return _possibleConstructorReturn(this, (HiddenThreads.__proto__ || Object.getPrototypeOf(HiddenThreads)).apply(this, arguments));
		}

		_createClass(HiddenThreads, null, [{
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
				this._migrateOld(this.storageName, ''); 
				return _get(HiddenThreads.__proto__ || Object.getPrototypeOf(HiddenThreads), '_readStorage', this).call(this);
			}
		}]);

		return HiddenThreads;
	}(PostsStorage);

	HiddenThreads.storageName = 'de-threads';

	var MyPosts = function (_PostsStorage3) {
		_inherits(MyPosts, _PostsStorage3);

		function MyPosts() {
			_classCallCheck(this, MyPosts);

			return _possibleConstructorReturn(this, (MyPosts.__proto__ || Object.getPrototypeOf(MyPosts)).apply(this, arguments));
		}

		_createClass(MyPosts, null, [{
			key: 'has',
			value: function has(num) {
				return this._cachedData.has(num);
			}
		}, {
			key: 'purge',
			value: function purge() {
				_get(MyPosts.__proto__ || Object.getPrototypeOf(MyPosts), 'purge', this).call(this);
				this._cachedData = null;
				this._readStorage();
			}
		}, {
			key: 'read',
			value: function read() {
				this._readStorage();
			}
		}, {
			key: 'set',
			value: function set(num, thrNum) {
				_get(MyPosts.__proto__ || Object.getPrototypeOf(MyPosts), 'set', this).call(this, num, thrNum);
				this._cachedData.add(+num);
				locStorage['__de-mypost'] = 1; 
				locStorage.removeItem('__de-mypost');
			}
		}, {
			key: '_readStorage',
			value: function _readStorage() {
				if (this._cachedData && this._cachedStorage) {
					return this._cachedStorage;
				}
				this._migrateOld(this.storageName, 'de-myposts-new');
				var rv = _get(MyPosts.__proto__ || Object.getPrototypeOf(MyPosts), '_readStorage', this).call(this);
				this._cachedData = rv[aib.b] ? new Set(Object.keys(rv[aib.b]).map(function (_) {
					return +_;
				})) : new Set();
				return rv;
			}
		}]);

		return MyPosts;
	}(PostsStorage);

	MyPosts.storageName = 'de-myposts';
	MyPosts._cachedData = null;

	function initStorageEvent() {
		doc.defaultView.addEventListener('storage', function (e) {
			var data,
			    temp,
			    post,
			    val = e.newValue;
			if (!val) {
				return;
			}
			switch (e.key) {
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
							if ((post = pByNum.get(data.num)) && post.hidden ^ data.hide) {
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
							Cfg.spells = aib.stringify(data.data);
							temp = $id('de-spell-txt');
							if (temp) {
								temp.value = Spells.list;
							}
						} else {
							SpellsRunner.unhideAll();
							Spells.disable();
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


	var panel = Object.create({
		_el: null,
		_hideTO: 0,
		_menu: null,
		_menuTO: 0,
		get _pcountEl() {
			var value = $id('de-panel-info-pcount');
			Object.defineProperty(this, '_pcountEl', { value: value, configurable: true });
			return value;
		},
		get _icountEl() {
			var value = $id('de-panel-info-icount');
			Object.defineProperty(this, '_icountEl', { value: value, configurable: true });
			return value;
		},
		get _acountEl() {
			var value = $id('de-panel-info-acount');
			Object.defineProperty(this, '_acountEl', { value: value, configurable: true });
			return value;
		},
		_getButton: function _getButton(id) {
			var p, href, title, useId;
			switch (id) {
				case 'goback':
					p = Math.max(aib.page - 1, 0);
					href = aib.getPageUrl(aib.b, p);
					if (!aib.t) {
						title = Lng.panelBtn.gonext[lang].replace('%s', p);
					}
					useId = 'arrow';
					break;
				case 'gonext':
					p = aib.page + 1;
					href = aib.getPageUrl(aib.b, p);
					title = Lng.panelBtn.gonext[lang].replace('%s', p);
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
			var panelTitle = title || Lng.panelBtn[id][lang];
			return '\n\t\t<a id="de-panel-' + id + '" class="de-abtn de-panel-button" title="' + panelTitle + '" href="' + (href || '#') + '">\n\t\t\t<svg class="de-panel-svg">\n\t\t\t' + (id !== 'audio-off' ? '\n\t\t\t\t<use xlink:href="#de-symbol-panel-' + (useId || id) + '"/>' : '\n\t\t\t\t<use class="de-use-audio-off" xlink:href="#de-symbol-panel-audio-off"/>\n\t\t\t\t<use class="de-use-audio-on" xlink:href="#de-symbol-panel-audio-on"/>') + '\n\t\t\t</svg>\n\t\t</a>';
		},
		_prepareToHide: function _prepareToHide(rt) {
			var _this9 = this;

			if (!Cfg.expandPanel && !$q('.de-win-active') && (!rt || !this._el.contains(rt.farthestViewportElement || rt))) {
				this._hideTO = setTimeout(function () {
					return $hide(_this9._buttons);
				}, 500);
			}
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
							toggleWindow('vid', false);break;
						case 'de-panel-refresh':
							window.location.reload();break;
						case 'de-panel-goup':
							scrollTo(0, 0);break;
						case 'de-panel-godown':
							scrollTo(0, docBody.scrollHeight || docBody.offsetHeight);break;
						case 'de-panel-expimg':
							isExpImg = !isExpImg;
							$del($q('.de-img-center'));
							for (var post = Thread.first.op; post; post = post.next) {
								post.toggleImages(isExpImg);
							}
							break;
						case 'de-panel-preimg':
							isPreImg = !isPreImg;
							if (!e.ctrlKey) {
								for (var _iterator2 = DelForm, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
									var _ref3;

									if (_isArray2) {
										if (_i2 >= _iterator2.length) break;
										_ref3 = _iterator2[_i2++];
									} else {
										_i2 = _iterator2.next();
										if (_i2.done) break;
										_ref3 = _i2.value;
									}

									var form = _ref3;

									preloadImages(form.el);
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
								updater.enable();
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
		init: function init(formEl) {
			var imgLen = $Q(aib.qPostImg, formEl).length,
			    isThr = aib.t;
			(pr && pr.pArea[0] || formEl).insertAdjacentHTML('beforebegin', '\n\t\t<div id="de-main">\n\t\t\t<div id="de-panel">\n\t\t\t\t<div id="de-panel-logo" title="' + Lng.panelBtn.attach[lang] + '">\n\t\t\t\t\t<svg class="de-panel-logo-svg">\n\t\t\t\t\t\t<use xlink:href="#de-symbol-panel-logo"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<span id="de-panel-buttons"' + (Cfg.expandPanel ? '' : ' style="display: none;"') + '>\n\t\t\t\t' + (Cfg.disabled ? this._getButton('enable') : this._getButton('cfg') + this._getButton('hid') + this._getButton('fav') + (!Cfg.addYouTube ? '' : this._getButton('vid')) + (localData ? '' : this._getButton('refresh') + (!isThr && aib.page === aib.firstPage ? '' : this._getButton('goback')) + (isThr || aib.page === aib.lastPage ? '' : this._getButton('gonext'))) + this._getButton('goup') + this._getButton('godown') + (imgLen === 0 ? '' : this._getButton('expimg') + this._getButton('maskimg')) + (nav.Presto || localData ? '' : (imgLen === 0 || Cfg.preLoadImgs ? '' : this._getButton('preimg')) + (!isThr ? '' : this._getButton('savethr'))) + (!isThr || localData ? '' : this._getButton(Cfg.ajaxUpdThr && !aib.isArchived ? 'upd-on' : 'upd-off') + (nav.Safari ? '' : this._getButton('audio-off'))) + (!aib.hasCatalog ? '' : this._getButton('catalog')) + this._getButton('enable') + (!isThr ? '' : '<span id="de-panel-info">' + '<span id="de-panel-info-pcount" title="' + Lng.panelBtn[Cfg.panelCounter !== 2 ? 'pcount' : 'pcountNotHid'][lang] + '">' + Thread.first.pcount + '</span>' + '<span id="de-panel-info-icount" title="' + Lng.panelBtn.imglen[lang] + '">' + imgLen + '</span>' + '<span id="de-panel-info-acount" title="' + Lng.panelBtn.posters[lang] + '"></span>' + '</span>')) + '\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t' + (Cfg.disabled ? '' : '<div id="de-wrapper-popup"></div><hr style="clear: both;">') + '\n\t\t</div>');
			this._el = $id('de-panel');
			this._el.addEventListener('click', this, true);
			this._el.addEventListener('mouseover', this);
			this._el.addEventListener('mouseout', this);
			this._buttons = $id('de-panel-buttons');
			this.isNew = true;
		},
		remove: function remove() {
			this._el.removeEventListener('click', this, true);
			this._el.removeEventListener('mouseover', this);
			this._el.removeEventListener('mouseout', this);
			delete this._pcountEl;
			delete this._icountEl;
			delete this._acountEl;
			$del($id('de-main'));
		},
		updateCounter: function updateCounter(postCount, imgsCount, postersCount) {
			this._pcountEl.textContent = postCount;
			this._icountEl.textContent = imgsCount;
			this._acountEl.textContent = postersCount;
			this.isNew = false;
		}
	});


	function updateWinZ(style) {
		if (style.zIndex < topWinZ) {
			style.zIndex = ++topWinZ;
		}
	}

	function makeDraggable(name, win, head) {
		head.addEventListener('mousedown', {
			_win: win,
			_wStyle: win.style,
			_oldX: 0,
			_oldY: 0,
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
						docBody.addEventListener('mousemove', this);
						docBody.addEventListener('mouseup', this);
						$pd(e);
						return;
					case 'mousemove':
						var maxX = Post.sizing.wWidth - this._win.offsetWidth,
						    maxY = Post.sizing.wHeight - this._win.offsetHeight - 25,
						    cr = this._win.getBoundingClientRect(),
						    x = cr.left + curX - this._oldX,
						    y = cr.top + curY - this._oldY;
						this._X = x >= maxX || curX > this._oldX && x > maxX - 20 ? 'right: 0' : x < 0 || curX < this._oldX && x < 20 ? 'left: 0' : 'left: ' + x + 'px';
						this._Y = y >= maxY || curY > this._oldY && y > maxY - 20 ? 'bottom: 25px' : y < 0 || curY < this._oldY && y < 20 ? 'top: 0' : 'top: ' + y + 'px';
						var width = this._wStyle.width;
						this._win.setAttribute('style', this._X + '; ' + this._Y + '; z-index: ' + this._Z + (width ? '; width: ' + width : ''));
						this._oldX = curX;
						this._oldY = curY;
						return;
					default:
						docBody.removeEventListener('mousemove', this);
						docBody.removeEventListener('mouseup', this);
						saveCfg(name + 'WinX', this._X);
						saveCfg(name + 'WinY', this._Y);
				}
			}
		});
	}

	function WinResizer(name, dir, cfgName, win, target) {
		this.name = name;
		this.dir = dir;
		this.cfgName = cfgName;
		this.vertical = dir === 'top' || dir === 'bottom';
		this.win = win;
		this.wStyle = this.win.style;
		this.tStyle = target.style;
		$q('.de-resizer-' + dir, win).addEventListener('mousedown', this);
	}
	WinResizer.prototype = {
		handleEvent: function handleEvent(e) {
			var val,
			    x,
			    y,
			    cr = this.win.getBoundingClientRect(),
			    maxX = Post.sizing.wWidth,
			    maxY = Post.sizing.wHeight,
			    width = this.wStyle.width,
			    z = '; z-index: ' + this.wStyle.zIndex + (width ? '; width:' + width : '');
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
							val = 'right: ' + (maxX - cr.right) + 'px; ' + y + z;break;
						case 'right':
							val = 'left: ' + cr.left + 'px; ' + y + z;
					}
					this.win.setAttribute('style', val);
					docBody.addEventListener('mousemove', this);
					docBody.addEventListener('mouseup', this);
					$pd(e);
					return;
				case 'mousemove':
					if (this.vertical) {
						val = e.clientY;
						this.tStyle.height = Math.max(parseInt(this.tStyle.height, 10) + (this.dir === 'top' ? cr.top - (val < 20 ? 0 : val) : (val > maxY - 45 ? maxY - 25 : val) - cr.bottom), 90) + 'px';
					} else {
						val = e.clientX;
						this.tStyle.width = Math.max(parseInt(this.tStyle.width, 10) + (this.dir === 'left' ? cr.left - (val < 20 ? 0 : val) : (val > maxX - 20 ? maxX : val) - cr.right), this.name === 'reply' ? 275 : 400) + 'px';
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
	};

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
			el.onmouseover = function (e) {
				switch (fixEventEl(e.target).classList[0]) {
					case 'de-btn-close':
						this.title = Lng.closeWindow[lang];break;
					case 'de-btn-toggle':
						this.title = Cfg[name + 'WinDrag'] ? Lng.toPanel[lang] : Lng.makeDrag[lang];
				}
			};
			el.lastElementChild.onclick = function () {
				return toggleWindow(name, false);
			};
			el.firstElementChild.onclick = function (e) {
				var width = win.style.width;
				var w = width ? '; width: ' + width : '';
				toggleCfg(name + 'WinDrag');
				if (Cfg[name + 'WinDrag']) {
					win.classList.remove('de-win-fixed');
					win.classList.add('de-win');
					win.style.cssText = Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] + w;
				} else {
					var temp = $q('.de-win-active.de-win-fixed', win.parentNode);
					if (temp) {
						toggleWindow(temp.id.substr(7), false);
					}
					win.classList.remove('de-win');
					win.classList.add('de-win-fixed');
					win.style.cssText = 'right: 0; bottom: 25px' + w;
				}
				updateWinZ(win.style);
			};
			makeDraggable(name, win, $q('.de-win-head', win));
		}
		updateWinZ(win.style);
		var remove = !isUpd && isActive;
		if (!remove && !win.classList.contains('de-win') && (el = $q('.de-win-active.de-win-fixed:not(#de-win-' + name + ')', win.parentNode))) {
			toggleWindow(el.id.substr(7), false);
		}
		var isAnim = !noAnim && !isUpd && Cfg.animation;
		var body = $q('.de-win-body', win);
		if (isAnim && body.hasChildNodes()) {
			win.addEventListener('animationend', function aEvent() {
				this.removeEventListener('animationend', aEvent);
				showWindow(win, body, name, remove, data, Cfg.animation);
				win = body = name = remove = data = null;
			});
			win.classList.remove('de-win-open');
			win.classList.add('de-win-close');
		} else {
			showWindow(win, body, name, remove, data, isAnim);
		}
	}

	function showWindow(win, body, name, remove, data, isAnim) {
		body.innerHTML = '';
		if (remove) {
			win.classList.remove('de-win-active');
			win.classList.remove('de-win-close');
			$hide(win);
			if (!Cfg.expandPanel && !$q('.de-win-active')) {
				$hide($id('de-panel-buttons'));
			}
			return;
		}
		win.classList.add('de-win-active');
		if (!Cfg.expandPanel) {
			$show($id('de-panel-buttons'));
		}
		switch (name) {
			case 'fav':
				if (data) {
					showFavoritesWindow(body, data);
					break;
				}
				readFavorites().then(function (fav) {
					showFavoritesWindow(body, fav);
					$show(win);
					if (isAnim) {
						win.classList.add('de-win-open');
					}
				});
				return;
			case 'cfg':
				cfgWindow.init(body);break;
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
			listHidden: false,
			player: body.firstElementChild,
			playerInfo: null,
			currentLink: null,
			handleEvent: function handleEvent(e) {
				var el = e.target;
				if (el.classList.contains('de-abtn')) {
					var node = void 0;
					switch (e.target.id) {
						case 'de-video-btn-hide':
							if (this.listHidden = !this.listHidden) {
								$hide(this.linkList);
								e.target.textContent = '\u25BC';
							} else {
								$show(this.linkList);
								e.target.textContent = '\u25B2';
							}
							break;
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
							var exp = this.player.className === 'de-video-obj';
							this.player.className = exp ? 'de-video-obj de-video-expanded' : 'de-video-obj';
							this.linkList.style.maxWidth = (exp ? 894 : +Cfg.YTubeWidth + 40) + 'px';
							this.linkList.style.maxHeight = nav.viewportHeight() * 0.92 - (exp ? 562 : +Cfg.YTubeHeigh + 82) + 'px';
					}
					$pd(e);
					return;
				} else if (!el.classList.contains('de-video-link')) {
					pByNum.get(+e.target.getAttribute('de-num')).selectAndScrollTo();
					return;
				}
				var info = el.videoInfo;
				if (this.playerInfo !== info) {
					if (this.currentLink) {
						this.currentLink.classList.remove('de-current');
					}
					this.currentLink = el;
					el.classList.add('de-current');
					this.playerInfo = info;
					Videos.addPlayer(this.player, info, el.classList.contains('de-ytube'), true);
				}
				$pd(e);
			}
		}, true);

		for (var i = 0, len = els.length; i < len; ++i) {
			var el = els[i].cloneNode(true);
			var num = aib.getPostOfEl(els[i]).num;
			el.videoInfo = els[i].videoInfo;
			$bEnd(linkList, '<div class="de-entry ' + aib.cReply + '">\n\t\t\t<a class="de-video-refpost" title=">>' + num + '" de-num="' + num + '">&gt;</a>\n\t\t</div>').appendChild(el).classList.remove('de-current');
			el.setAttribute('onclick', 'window.de_addVideoEvents && window.de_addVideoEvents();');
		}
		body.appendChild(linkList);
		$q('.de-video-link', linkList).click();
	}

	function showHiddenWindow(body) {
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
					$bEnd(block, '<div class="de-entry ' + aib.cReply + '" info="' + (b + ';' + tNum) + '">\n\t\t\t\t\t<input type="checkbox">\n\t\t\t\t\t<a href="' + aib.getThrUrl(b, tNum) + '" target="_blank">' + tNum + '</a>\n\t\t\t\t\t<div class="de-entry-title">- ' + hThr[b][tNum][2] + '</div>\n\t\t\t\t</div>');
				}
			};

			for (var b in hThr) {
				var _ret2 = _loop(b);

				if (_ret2 === 'continue') continue;
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

		body.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], function _callee() {
			var i, els, len, _els$i$getAttribute$s, _els$i$getAttribute$s2, _b, tNum;

			return regeneratorRuntime.async(function _callee$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							i = 0, els = $Q('.de-entry[info]', this.parentNode), len = els.length;

						case 1:
							if (!(i < len)) {
								_context5.next = 14;
								break;
							}

							_els$i$getAttribute$s = els[i].getAttribute('info').split(';'), _els$i$getAttribute$s2 = _slicedToArray(_els$i$getAttribute$s, 2), _b = _els$i$getAttribute$s2[0], tNum = _els$i$getAttribute$s2[1];
							_context5.prev = 3;
							_context5.next = 6;
							return regeneratorRuntime.awrap($ajax(aib.getThrUrl(_b, tNum)));

						case 6:
							_context5.next = 11;
							break;

						case 8:
							_context5.prev = 8;
							_context5.t0 = _context5['catch'](3);

							if (_context5.t0.code === 404) {
								HiddenThreads.remove(tNum, _b); 
								HiddenPosts.remove(tNum, _b); 
							}

						case 11:
							++i;
							_context5.next = 1;
							break;

						case 14:
							toggleWindow('hid', true);

						case 15:
						case 'end':
							return _context5.stop();
					}
				}
			}, null, this, [[3, 8]]);
		}));

		body.appendChild($btn(Lng.remove[lang], Lng.delEntries[lang], function () {
			$each($Q('.de-entry[info]', body), function (el) {
				if (!$q('input', el).checked) {
					return;
				}

				var _el$getAttribute$spli = el.getAttribute('info').split(';'),
				    _el$getAttribute$spli2 = _slicedToArray(_el$getAttribute$spli, 2),
				    b = _el$getAttribute$spli2[0],
				    tNum = _el$getAttribute$spli2[1];

				var num = +tNum;
				if (pByNum.has(num)) {
					pByNum.get(num).setUserVisib(false);
				} else {
					locStorage['__de-post'] = JSON.stringify({
						'brd': b,
						'num': num,
						'thrNum': num,
						'hide': false
					});
					locStorage.removeItem('__de-post');
				}
				HiddenThreads.remove(num, b); 
				HiddenPosts.set(num, num, false); 
			});
			toggleWindow('hid', true);
		}));
	}


	function cleanFavorites() {
		var els = $Q('.de-entry[de-removed]');
		var len = els.length;
		if (!len) {
			return;
		}
		readFavorites().then(function (data) {
			for (var i = 0; i < len; ++i) {
				var el = els[i];
				var h = el.getAttribute('de-host');
				var b = el.getAttribute('de-board');
				var num = +el.getAttribute('de-num');
				removeFavoriteEntry(data, h, b, num);
				if (h === aib.host && b === aib.b && pByNum.has(num)) {
					pByNum.get(num).thr.op.setFavBtn(false);
				}
			}
			saveFavorites(data);
		});
	}

	function showFavoritesWindow(body, data) {
		var html = '';
		for (var h in data) {
			for (var b in data[h]) {
				var d = data[h][b];
				var innerHtml = '';
				for (var _tNum in d) {
					if (_tNum === 'url') {
						continue;
					}
					var t = d[_tNum];
					if (!t.url.startsWith('http')) {
						t.url = (h === aib.host ? aib.prot + '//' : 'http://') + h + t.url;
					}

					innerHtml += '<div class="de-entry ' + aib.cReply + '" de-host="' + h + '" de-board="' + b + '" de-num="' + _tNum + '" de-url="' + t.url + '">\n\t\t\t\t\t<input class="de-fav-switch" type="checkbox">\n\t\t\t\t\t<a class="de-fav-link" href="' + (t.url + (!t.last ? '' : t.last.startsWith('#') ? t.last : h === aib.host ? aib.anchor + t.last : '')) + '" rel="noreferrer">\n\t\t\t\t\t\t' + _tNum + '\n\t\t\t\t\t</a>\n\t\t\t\t\t<div class="de-entry-title">- ' + t.txt + '</div>\n\t\t\t\t\t<div class="de-fav-inf">\n\t\t\t\t\t\t<span class="de-fav-inf-iwrap" ' + (!t.err ? '' : t.err === 'Closed' ? 'title="' + Lng.thrClosed[lang] + '"' : 'title="' + t.err + '"') + '>\n\t\t\t\t\t\t\t<svg class="de-fav-inf-icon ' + (!t.err ? '' : t.err === 'Closed' || t.err === 'Archived' ? 'de-fav-closed' : 'de-fav-unavail') + '">\n\t\t\t\t\t\t\t\t<use class="de-fav-closed-use" xlink:href="#de-symbol-closed"/>\n\t\t\t\t\t\t\t\t<use class="de-fav-unavail-use" xlink:href="#de-symbol-unavail"/>\n\t\t\t\t\t\t\t\t<use class="de-fav-wait-use" xlink:href="#de-symbol-wait"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class="de-fav-inf-you" title="' + Lng.myPostsRep[lang] + '"' + (t.you ? '' : ' style="display: none;"') + '>' + (t.you || 0) + '</span>\n\t\t\t\t\t\t<span class="de-fav-inf-new" title="' + Lng.newPosts[lang] + '"' + (t['new'] ? '' : ' style="display: none;"') + '>' + (t['new'] || 0) + '</span>\n\t\t\t\t\t\t<span class="de-fav-inf-old" title="' + Lng.oldPosts[lang] + '">' + t.cnt + '</span>\n\t\t\t\t\t\t<span class="de-fav-inf-page" title="' + Lng.thrPage[lang] + '"></span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>';
				}
				if (!innerHtml) {
					continue;
				}

				html += '<div class="de-fold-block' + (h === aib.host && b === aib.b ? ' de-fav-current' : '') + '">\n\t\t\t\t<div class="de-fav-header">\n\t\t\t\t\t<input class="de-fav-header-switch" type="checkbox">\n\t\t\t\t\t<a class="de-fav-header-link" href="' + d.url + '" rel="noreferrer">' + h + '/' + b + '</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="de-fav-entries"' + (h === aib.host ? ' de-opened' : ' style="display: none;"') + '>\n\t\t\t\t\t' + innerHtml + '\n\t\t\t\t</div>\n\t\t\t</div>';
			}
		}

		if (html) {
			$bEnd(body, '<div class="de-fav-table">' + html + '</div>').addEventListener('click', function (e) {
				var el = e.target;

				var _ret3 = function () {
					switch (el.className) {
						case 'de-fav-link':
							sesStorage['de-win-fav'] = '1'; 
							el = el.parentNode;
							sesStorage.removeItem('de-scroll-' + el.getAttribute('de-board') + el.getAttribute('de-num'));
							break;
						case 'de-fav-header-switch':
							var checked = el.checked;
							el = el.parentNode.nextElementSibling;
							$each($Q('.de-entry > input', el), function (checkBox) {
								return checkBox.checked = checked;
							});
							if (!checked || el.hasAttribute('de-opened')) {
								return {
									v: void 0
								};
							}
							break;
						case 'de-fav-header-link':
							el = el.parentNode.nextElementSibling;
							$pd(e); 
							break;
						default:
							return {
								v: void 0
							};
					}

				}();

				if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
				if (el.hasAttribute('de-opened')) {
					el.style.display = 'none';
					el.removeAttribute('de-opened');
				} else {
					el.removeAttribute('style');
					el.setAttribute('de-opened', '');
				}
			});
		} else {
			$bEnd(body, '<center><b>' + Lng.noFavThr[lang] + '</b></center>');
		}

		var div = $bEnd(body, '<hr><div id="de-fav-buttons"></div>');

		div.appendChild(getEditButton('favor', function (fn) {
			return readFavorites().then(function (data) {
				return fn(data, true, saveFavorites);
			});
		}));

		div.appendChild($btn(Lng.refresh[lang], Lng.infoCount[lang], function _callee2() {
			var fav, isUpdate, last404, myposts, els, i, len, el, host, _b2, num, f, countEl, youEl, iconEl, titleEl, form, isArchived, _ref4, _ref5, bArch, posts, cnt, j, links, a, _len, _num, tc;

			return regeneratorRuntime.async(function _callee2$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.next = 2;
							return regeneratorRuntime.awrap(getStoredObj('DESU_Favorites'));

						case 2:
							fav = _context6.sent;

							if (fav[aib.host]) {
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
								_context6.next = 66;
								break;
							}

							el = els[i];
							host = el.getAttribute('de-host');
							_b2 = el.getAttribute('de-board');
							num = el.getAttribute('de-num');
							f = fav[host][_b2][num];


							if (!(host !== aib.host || f.err === 'Closed' || f.err === 'Archived')) {
								_context6.next = 18;
								break;
							}

							return _context6.abrupt('continue', 63);

						case 18:
							countEl = $q('.de-fav-inf-new', el);
							youEl = countEl.previousElementSibling;
							iconEl = $q('.de-fav-inf-icon', el);
							titleEl = iconEl.parentNode;

							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
							titleEl.title = Lng.updating[lang];
							form = void 0, isArchived = void 0;
							_context6.prev = 25;

							if (aib.iichan) {
								_context6.next = 32;
								break;
							}

							_context6.next = 29;
							return regeneratorRuntime.awrap(ajaxLoad(aib.getThrUrl(_b2, num)));

						case 29:
							form = _context6.sent;
							_context6.next = 38;
							break;

						case 32:
							_context6.next = 34;
							return regeneratorRuntime.awrap(ajaxLoad(aib.getThrUrl(_b2, num), true, false, aib.iichan));

						case 34:
							_ref4 = _context6.sent;
							_ref5 = _slicedToArray(_ref4, 2);
							form = _ref5[0];
							isArchived = _ref5[1];

						case 38:
							last404 = false;
							_context6.next = 58;
							break;

						case 41:
							_context6.prev = 41;
							_context6.t0 = _context6['catch'](25);

							if (!(_context6.t0 instanceof AjaxError && _context6.t0.code === 404)) {
								_context6.next = 51;
								break;
							}

							if (!last404) {
								_context6.next = 48;
								break;
							}

							Thread.removeSavedData(_b2, num); 
							_context6.next = 51;
							break;

						case 48:
							last404 = true;
							--i; 
							return _context6.abrupt('continue', 63);

						case 51:
							last404 = false;
							$hide(countEl);
							$hide(youEl);
							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
							f.err = titleEl.title = getErrorMessage(_context6.t0);
							isUpdate = true;
							return _context6.abrupt('continue', 63);

						case 58:

							if (aib.qClosed && $q(aib.qClosed, form)) {
								iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
								titleEl.title = Lng.thrClosed[lang];
								f.err = 'Closed';
								isUpdate = true;
							} else if (isArchived) {
								iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
								titleEl.title = Lng.thrArchived[lang];
								f.err = 'Archived';
								bArch = _b2 + '/arch';

								if (!fav[host][bArch]) {
									fav[host][bArch] = { url: fav[host][_b2].url + 'arch/' };
								}
								fav[host][bArch][num] = Object.assign({}, f);
								removeFavoriteEntry(fav, host, _b2, num);
								isUpdate = true;
							} else {
								iconEl.setAttribute('class', 'de-fav-inf-icon');
								titleEl.removeAttribute('title');
								if (f.err) {
									delete f.err;
									isUpdate = true;
								}
							}

							posts = $Q(aib.qRPost, form);
							cnt = posts.length + 1 - f.cnt;

							countEl.textContent = cnt;
							if (cnt === 0) {
								$hide(countEl); 
								$hide(youEl);
							} else {
								$show(countEl);
								f['new'] = cnt;
								isUpdate = true;

								if (myposts && myposts[_b2]) {
									f.you = 0;
									for (j = 0; j < cnt; ++j) {
										links = $Q(aib.qPostMsg + ' a', posts[posts.length - 1 - j]);

										for (a = 0, _len = links.length; a < _len; ++a) {
											tc = links[a].textContent;

											if (tc[0] === '>' && tc[1] === '>' && myposts[_b2][tc.substr(2)]) {
												f.you++;
											}
										}
									}
									if (f.you) {
										youEl.textContent = f.you;
										$show(youEl);
									}
								}
							}

						case 63:
							++i;
							_context6.next = 10;
							break;

						case 66:
							AjaxCache.clear();
							if (isUpdate) {
								setStored('DESU_Favorites', JSON.stringify(fav));
							}

						case 68:
						case 'end':
							return _context6.stop();
					}
				}
			}, null, this, [[25, 41]]);
		}));

		div.appendChild($btn(Lng.page[lang], Lng.infoPage[lang], function _callee3() {
			var els, len, thrInfo, i, el, iconEl, titleEl, endPage, page, infoLoaded, tNums, form, _i3, pInfo, _i4, _thrInfo$_i, found, pageEl, iconClass, _iconEl, iconTitle, _titleEl;

			return regeneratorRuntime.async(function _callee3$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							els = $Q('.de-fav-current > .de-fav-entries > .de-entry');
							len = els.length;
							thrInfo = [];

							if (len) {
								_context7.next = 5;
								break;
							}

							return _context7.abrupt('return');

						case 5:
							$popup('load-pages', Lng.loading[lang], true);

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

							page = 0, infoLoaded = 0;

						case 9:
							if (!(page < endPage)) {
								_context7.next = 27;
								break;
							}

							tNums = void 0;
							_context7.prev = 11;
							_context7.next = 14;
							return regeneratorRuntime.awrap(ajaxLoad(aib.getPageUrl(aib.b, page)));

						case 14:
							form = _context7.sent;

							tNums = new Set(Array.from(DelForm.getThreads(form)).map(function (thrEl) {
								return aib.getTNum(thrEl);
							}));
							_context7.next = 21;
							break;

						case 18:
							_context7.prev = 18;
							_context7.t0 = _context7['catch'](11);
							return _context7.abrupt('continue', 24);

						case 21:

							for (_i3 = 0; _i3 < len; ++_i3) {
								pInfo = thrInfo[_i3];

								if (tNums.has(pInfo.num)) {
									pInfo.iconEl.setAttribute('class', pInfo.iconClass);
									if (pInfo.iconTitle) {
										pInfo.titleEl.setAttribute('title', pInfo.iconTitle);
									} else {
										pInfo.titleEl.removeAttribute('title');
									}
									pInfo.pageEl.textContent = '@' + page; 
									pInfo.found = true;
									infoLoaded++;
								}
							}

							if (!(infoLoaded === len)) {
								_context7.next = 24;
								break;
							}

							return _context7.abrupt('break', 27);

						case 24:
							++page;
							_context7.next = 9;
							break;

						case 27:

							for (_i4 = 0; _i4 < len; ++_i4) {
								_thrInfo$_i = thrInfo[_i4], found = _thrInfo$_i.found, pageEl = _thrInfo$_i.pageEl, iconClass = _thrInfo$_i.iconClass, _iconEl = _thrInfo$_i.iconEl, iconTitle = _thrInfo$_i.iconTitle, _titleEl = _thrInfo$_i.titleEl;

								if (!found) {
									_iconEl.setAttribute('class', iconClass);
									if (iconTitle) {
										_titleEl.setAttribute('title', iconTitle);
									} else {
										_titleEl.removeAttribute('title');
									}
									pageEl.textContent = '@?'; 
								}
							}

							closePopup('load-pages');

						case 29:
						case 'end':
							return _context7.stop();
					}
				}
			}, null, this, [[11, 18]]);
		}));

		div.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], function _callee4() {
			var i, last404, els, len, el, iconEl, titleEl;
			return regeneratorRuntime.async(function _callee4$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							i = 0, last404 = false, els = $Q('.de-entry'), len = els.length;

						case 1:
							if (!(i < len)) {
								_context8.next = 31;
								break;
							}

							el = els[i];
							iconEl = $q('.de-fav-inf-icon', el);
							titleEl = iconEl.parentNode;

							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
							titleEl.title = Lng.updating[lang];
							_context8.prev = 7;
							_context8.next = 10;
							return regeneratorRuntime.awrap($ajax(el.getAttribute('de-url'), null, false));

						case 10:
							iconEl.setAttribute('class', 'de-fav-inf-icon');
							titleEl.removeAttribute('title');
							_context8.next = 27;
							break;

						case 14:
							_context8.prev = 14;
							_context8.t0 = _context8['catch'](7);

							if (!(_context8.t0.code === 404)) {
								_context8.next = 25;
								break;
							}

							if (!last404) {
								_context8.next = 22;
								break;
							}

							Thread.removeSavedData(el.getAttribute('de-board'), 
							+el.getAttribute('de-num'));
							el.setAttribute('de-removed', ''); 
							_context8.next = 25;
							break;

						case 22:
							last404 = true;
							--i; 
							return _context8.abrupt('continue', 28);

						case 25:
							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
							titleEl.title = getErrorMessage(_context8.t0);

						case 27:
							last404 = false;

						case 28:
							++i;
							_context8.next = 1;
							break;

						case 31:
							cleanFavorites(); 

						case 32:
						case 'end':
							return _context8.stop();
					}
				}
			}, null, this, [[7, 14]]);
		}));

		div.appendChild($btn(Lng.deletion[lang], Lng.delEntries[lang], function () {
			return body.classList.add('de-fav-del');
		}));
		div = $bEnd(body, '<div id="de-fav-delbuttons"></div>');

		div.appendChild($btn(Lng.apply[lang], Lng.delEntries[lang], function () {
			$each($Q('.de-entry > input[type="checkbox"]', body), function (el) {
				if (el.checked) {
					el.parentNode.setAttribute('de-removed', '');
				}
			});
			cleanFavorites(); 
			body.classList.remove('de-fav-del'); 
		}));

		div.appendChild($btn(Lng.cancel[lang], '', function () {
			$each($Q('input[type="checkbox"]', body), function (el) {
				return el.checked = false;
			}); 
			body.classList.remove('de-fav-del'); 
		}));
	}


	var cfgWindow = Object.create({
		init: function init(body) {
			var _this11 = this;

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
							if (i !== 'correctTime' && i !== 'timePattern' && i !== 'userCSS' && i !== 'userCSSTxt' && com[i] !== defaultCfg[i] && i !== 'stats') {
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

			!nav.Presto && div.appendChild($btn(Lng.file[lang], Lng.fileImpExp[lang], function () {
				$popup('cfg-file', '<b>' + Lng.fileImpExp[lang] + ':</b><hr>' + '<div class="de-list">' + Lng.fileToData[lang] + ':<div class="de-cfg-depend">' + '<input type="file" accept=".json" id="de-import-file"></div></div><hr>' + '<div class="de-list"><a id="de-export-file" href="#">' + Lng.dataToFile[lang] + ':<div class="de-cfg-depend">' + _this11._getList([Lng.panelBtn.cfg[lang] + ' ' + Lng.allDomains[lang], Lng.panelBtn.fav[lang], Lng.hidPostThr[lang] + ' (' + aib.dm + ')', Lng.myPosts[lang] + ' (' + aib.dm + ')']) + '</div></div>');

				$id('de-import-file').onchange = function (e) {
					var file = e.target.files[0];
					if (!file) {
						return;
					}
					readFile(file, true).then(function (_ref6) {
						var data = _ref6.data;

						var obj = void 0;
						try {
							obj = JSON.parse(data);
						} catch (e) {
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
							} catch (e) {}
						}
						if (favObj) {
							saveFavorites(favObj);
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
				expFile.addEventListener('click', function _callee5(e) {
					var name, nameDm, d, val, valDm, i, len, cfgData;
					return regeneratorRuntime.async(function _callee5$(_context9) {
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
									name.push('Cfg');
									_context9.next = 12;
									return regeneratorRuntime.awrap(Promise.all([getStored('DESU_Config'), getStored('DESU_keys'), getStored('DESU_Exclude')]));

								case 12:
									cfgData = _context9.sent;

									val.push('"settings":' + cfgData[0], '"hotkeys":' + (cfgData[1] || '""'), '"exclude":"' + (cfgData[2] || '') + '"');
									return _context9.abrupt('break', 31);

								case 15:
									name.push('Fav');
									_context9.t1 = val;
									_context9.next = 19;
									return regeneratorRuntime.awrap(getStored('DESU_Favorites'));

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
										name.push(aib.dm + '(' + nameDm.join('+') + ')');
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
					}, null, this);
				}, true);
			}));

			div.appendChild($btn(Lng.reset[lang] + '…', Lng.resetCfg[lang], function () {
				return $popup('cfg-reset', '<b>' + Lng.resetData[lang] + ':</b><hr>' + ('<div class="de-list"><b>' + aib.dm + ':</b>' + _this11._getList([Lng.panelBtn.cfg[lang], Lng.hidPostThr[lang], Lng.myPosts[lang]]) + '</div><hr>') + ('<div class="de-list"><b>' + Lng.allDomains[lang] + ':</b>' + _this11._getList([Lng.panelBtn.cfg[lang], Lng.panelBtn.fav[lang]]) + '</div><hr>')).appendChild($btn(Lng.clear[lang], '', function () {
					var els = $Q('input[type="checkbox"]', this.parentNode);
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
			var type = e.type;
			var el = e.target;
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
						panel.remove();
						this._updateCSS();
						panel.init(DelForm.first.el);
						toggleWindow('cfg', false);
						break;
					case 'delHiddPost':
						var isHide = Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2;
						for (var _post2 = Thread.first.op; _post2; _post2 = _post2.next) {
							if (_post2.hidden && !_post2.isOp) {
								if (isHide) {
									_post2.wrap.classList.add('de-hidden');
								} else {
									_post2.wrap.classList.remove('de-hidden');
								}
							}
						}
						updateCSS();
						break;
					case 'postBtnsCSS':
						updateCSS();
						if (nav.Presto) {
							$del($q('.de-svg-icons'));
							addSVGIcons();
						}
						break;
					case 'noSpoilers':
						updateCSS();break;
					case 'expandImgs':
						updateCSS();
						if (Attachment.viewer) {
							Attachment.viewer.close();
						}
						break;
					case 'fileInputs':
						pr.files.changeMode();
						if (!aib.kus && !aib.multiFile) {
							pr.setPlaceholders();
						}
						updateCSS();
						break;
					case 'addPostForm':
						pr.isBottom = Cfg.addPostForm === 1;
						pr.setReply(false, !aib.t || Cfg.addPostForm > 1);
						break;
					case 'addTextBtns':
						pr.addTextPanel();break;
					case 'scriptStyle':
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
					case 'updThrBtns':
					case 'showHideBtn':
					case 'showRepBtn':
					case 'noPostNames':
					case 'widePosts':
					case 'imgNavBtns':
					case 'resizeImgs':
					case 'strikeHidd':
					case 'removeHidd':
					case 'noBoardRule':
					case 'panelCounter':
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
								_post3.ref.unhide();
							} else if (_post3.hidden) {
								_post3.ref.hide();
							}
						}
						break;
					case 'ajaxUpdThr':
						if (aib.t) {
							if (Cfg.ajaxUpdThr) {
								updater.enable();
							} else {
								updater.disable();
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
						aib.jsonBuilder = Cfg.useDobrAPI ? DobrochanPostsBuilder : null;break;
					case 'markMyPosts':
						if (!Cfg.markMyPosts && !Cfg.markMyLinks) {
							locStorage.removeItem('de-myposts');
							MyPosts.purge();
						}
						updateCSS();
						break;
					case 'correctTime':
						DateTime.toggleSettings();break;
					case 'imgInfoLink':
						var img = $q('.de-img-wrapper');
						if (img) {
							img.click();
						}
						updateCSS();
						break;
					case 'imgSrcBtns':
						if (Cfg.imgSrcBtns) {
							for (var _iterator3 = DelForm, _isArray3 = Array.isArray(_iterator3), _i5 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
								var _ref7;

								if (_isArray3) {
									if (_i5 >= _iterator3.length) break;
									_ref7 = _iterator3[_i5++];
								} else {
									_i5 = _iterator3.next();
									if (_i5.done) break;
									_ref7 = _i5.value;
								}

								var form = _ref7;

								processImagesLinks(form.el, 1, 0);
							}
						} else {
							$each($Q('.de-btn-src'), function (el) {
								return el.remove();
							});
						}
						break;
					case 'delImgNames':
						if (Cfg.delImgNames) {
							for (var _iterator4 = DelForm, _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
								var _ref8;

								if (_isArray4) {
									if (_i6 >= _iterator4.length) break;
									_ref8 = _iterator4[_i6++];
								} else {
									_i6 = _iterator4.next();
									if (_i6.done) break;
									_ref8 = _i6.value;
								}

								var _form = _ref8;

								processImagesLinks(_form.el, 0, 1);
							}
						} else {
							$each($Q('.de-img-name'), function (link) {
								link.classList.remove('de-img-name');
								link.textContent = link.title;
								link.removeAttribute('title');
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
					case 'txtBtnsLoc':
						pr.addTextPanel();break;
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
							HotKeys.enable();
						} else {
							HotKeys.disable();
						}
						break;
					case 'turnOff':
						getStoredObj('DESU_Config').then(function (data) {
							for (var dm in data) {
								if (dm !== aib.dm && dm !== 'global' && dm !== 'lastUpd') {
									data[dm].disabled = Cfg.turnOff;
								}
							}
							data[aib.dm].turnOff = Cfg.turnOff;
							setStored('DESU_Config', JSON.stringify(data));
						});
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
							'version': version,
							'location': String(window.location),
							'nav': nav,
							'cfg': Cfg,
							'sSpells': Spells.list.split('\n'),
							'oSpells': sesStorage['de-spells-' + aib.b + (aib.t || '')],
							'perf': Logger.getData(true)
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
						if (checkCSSColor(el.value)) {
							el.classList.remove('de-error-input');
							saveCfg('postBtnsBack', el.value);
							updateCSS();
						} else {
							el.classList.add('de-error-input');
						}
						break;
					case 'minImgSize':
						saveCfg('minImgSize', Math.max(+el.value, 1));break;
					case 'zoomFactor':
						saveCfg('zoomFactor', Math.min(Math.max(+el.value, 1), 100));break;
					case 'webmVolume':
						var val = Math.min(+el.value || 0, 100);
						saveCfg('webmVolume', val);
						locStorage['__de-webmvolume'] = val;
						locStorage.removeItem('__de-webmvolume');
						break;
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
				var _el = els[i];
				var _info4 = _el.getAttribute('info');
				if (_el.tagName === 'INPUT') {
					if (_el.type === 'checkbox') {
						_el.checked = !!Cfg[_info4];
					} else {
						_el.value = _info4 !== 'excludeList' ? Cfg[_info4] : excludeList;
					}
				} else {
					_el.selectedIndex = Cfg[_info4];
				}
			}
		},


		_getCfgFilters: function _getCfgFilters() {
			return '<div id="de-cfg-filters" class="de-cfg-unvis">\n\t\t\t<div id="de-spell-panel">\n\t\t\t\t' + this._getBox('hideBySpell') + '\n\t\t\t\t<a id="de-btn-spell-add" class="de-abtn de-spell-btn" href="#">' + Lng.add[lang] + '</a>\n\t\t\t\t<a id="de-btn-spell-apply" class="de-abtn de-spell-btn" href="#">' + Lng.apply[lang] + '</a>\n\t\t\t\t<a id="de-btn-spell-clear" class="de-abtn de-spell-btn" href="#">' + Lng.clear[lang] + '</a>\n\t\t\t\t<a class="de-abtn de-spell-btn" href="' + (gitWiki + 'Spells-' + (lang ? 'en' : 'ru')) + '" target="_blank">[?]</a>\n\t\t\t</div>\n\t\t\t<div id="de-spell-editor">\n\t\t\t\t<div id="de-spell-rowmeter"></div>\n\t\t\t\t<textarea id="de-spell-txt" wrap="off"></textarea>\n\t\t\t</div>\n\t\t\t' + this._getBox('sortSpells') + '<br>\n\t\t\t' + this._getBox('menuHiddBtn') + '<br>\n\t\t\t' + this._getBox('hideRefPsts') + '<br>\n\t\t\t' + this._getSel('delHiddPost') + '\n\t\t</div>';
		},


		_getCfgPosts: function _getCfgPosts() {
			return '<div id="de-cfg-posts" class="de-cfg-unvis">\n\t\t\t' + (!localData ? this._getBox('ajaxUpdThr') + this._getInp('updThrDelay') + ('<div class="de-cfg-depend">\n\t\t\t\t\t' + this._getBox('updCount') + '<br>\n\t\t\t\t\t' + this._getBox('favIcoBlink') + '<br>\n\t\t\t\t\t' + ('Notification' in window ? this._getBox('desktNotif') + '<br>' : '') + '\n\t\t\t\t\t' + this._getBox('noErrInTitle') + '<br>\n\t\t\t\t\t' + this._getBox('markNewPosts') + '<br>\n\t\t\t\t\t' + (aib.dobr ? this._getBox('useDobrAPI') : '') + '\n\t\t\t\t</div>') : '') + '\n\t\t\t' + (aib.jsonSubmit || aib.fch ? this._getBox('markMyPosts') + '<br>' : '') + '\n\t\t\t' + this._getBox('hideReplies') + '<br>\n\t\t\t' + this._getBox('expandTrunc') + '<br>\n\t\t\t' + this._getBox('updThrBtns') + '<br>\n\t\t\t' + this._getBox('showHideBtn') + '\n\t\t\t' + this._getBox('showRepBtn') + '<br>\n\t\t\t' + this._getSel('postBtnsCSS') + '\n\t\t\t' + this._getInp('postBtnsBack', false, 8) + '<br>\n\t\t\t' + this._getSel('noSpoilers') + '<br>\n\t\t\t' + this._getBox('noPostNames') + '<br>\n\t\t\t' + this._getBox('widePosts') + '<br>\n\t\t\t' + this._getBox('correctTime') + '\n\t\t\t' + this._getInp('timeOffset') + '\n\t\t\t<a class="de-abtn" target="_blank" href="' + (gitWiki + 'Settings-time-' + (lang ? 'en' : 'ru')) + '">[?]</a>\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getInp('timePattern', true, 24) + '<br>\n\t\t\t\t' + this._getInp('timeRPattern', true, 24) + '\n\t\t\t</div>\n\t\t</div>';
		},


		_getCfgImages: function _getCfgImages() {
			return '<div id="de-cfg-images" class="de-cfg-unvis">\n\t\t\t' + this._getSel('expandImgs') + '<br>\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getBox('imgNavBtns') + '<br>\n\t\t\t\t' + this._getBox('imgInfoLink') + '<br>\n\t\t\t\t' + this._getBox('resizeImgs') + '<br>\n\t\t\t\t' + (Post.sizing.dPxRatio > 1 ? this._getBox('resizeDPI') + '<br>' : '') + '\n\t\t\t\t' + this._getInp('minImgSize') + '<br>\n\t\t\t\t' + this._getInp('zoomFactor') + '<br>\n\t\t\t\t' + this._getBox('webmControl') + '<br>\n\t\t\t\t' + this._getBox('webmTitles') + '<br>\n\t\t\t\t' + this._getInp('webmVolume') + '<br>\n\t\t\t\t' + this._getInp('minWebmWidth') + '\n\t\t\t</div>\n\t\t\t' + (!nav.Presto ? this._getBox('preLoadImgs') + '<br>' : '') + '\n\t\t\t' + (!nav.Presto && !aib.fch ? '<div class="de-cfg-depend">' + this._getBox('findImgFile') + '</div>' : '') + '\n\t\t\t' + this._getSel('openImgs') + '<br>\n\t\t\t' + this._getBox('imgSrcBtns') + '<br>\n\t\t\t' + this._getBox('delImgNames') + '<br>\n\t\t\t' + this._getInp('maskVisib') + '\n\t\t</div>';
		},


		_getCfgLinks: function _getCfgLinks() {
			return '<div id="de-cfg-links" class="de-cfg-unvis">\n\t\t\t' + this._getBox('linksNavig') + '\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getInp('linksOver') + '\n\t\t\t\t' + this._getInp('linksOut') + '<br>\n\t\t\t\t' + this._getBox('markViewed') + '<br>\n\t\t\t\t' + this._getBox('strikeHidd') + '\n\t\t\t\t<div class="de-cfg-depend">' + this._getBox('removeHidd') + '</div>\n\t\t\t\t' + this._getBox('noNavigHidd') + '\n\t\t\t</div>\n\t\t\t' + (aib.jsonSubmit || aib.fch ? this._getBox('markMyLinks') + '<br>' : '') + '\n\t\t\t' + this._getBox('crossLinks') + '<br>\n\t\t\t' + this._getBox('decodeLinks') + '<br>\n\t\t\t' + this._getBox('insertNum') + '<br>\n\t\t\t' + this._getBox('addOPLink') + '<br>\n\t\t\t' + this._getBox('addImgs') + '<br>\n\t\t\t<div>\n\t\t\t\t' + this._getBox('addMP3') + '\n\t\t\t\t' + (aib.prot === 'http:' ? this._getBox('addVocaroo') : '') + '\n\t\t\t</div>\n\t\t\t' + this._getSel('addYouTube') + '\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getSel('YTubeType') + '\n\t\t\t\t' + this._getInp('YTubeWidth', false) + '\xD7\n\t\t\t\t' + this._getInp('YTubeHeigh', false) + '(px)<br>\n\t\t\t\t' + this._getBox('YTubeTitles') + '<br>\n\t\t\t\t' + this._getInp('ytApiKey', true, 25) + '<br>\n\t\t\t\t' + this._getBox('addVimeo') + '\n\t\t\t</div>\n\t\t</div>';
		},


		_getCfgForm: function _getCfgForm() {
			return '<div id="de-cfg-form" class="de-cfg-unvis">\n\t\t\t' + this._getBox('ajaxPosting') + '<br>\n\t\t\t' + (pr.form ? '<div class="de-cfg-depend">\n\t\t\t\t' + this._getBox('postSameImg') + '<br>\n\t\t\t\t' + this._getBox('removeEXIF') + '\n\t\t\t\t' + this._getBox('removeFName') + '<br>\n\t\t\t\t' + this._getBox('sendErrNotif') + '<br>\n\t\t\t\t' + this._getBox('scrAfterRep') + '<br>\n\t\t\t\t' + (pr.files && !nav.Presto ? this._getSel('fileInputs') : '') + '\n\t\t\t</div>' : '') + '\n\t\t\t' + (pr.form ? this._getSel('addPostForm') + '<br>' : '') + '\n\t\t\t' + (pr.txta ? this._getBox('spacedQuote') + '<br>' : '') + '\n\t\t\t' + this._getBox('favOnReply') + '<br>\n\t\t\t' + (pr.subj ? this._getBox('warnSubjTrip') + '<br>' : '') + '\n\t\t\t' + (pr.mail ? this._getBox('addSageBtn') + this._getBox('saveSage') + '<br>' : '') + '\n\t\t\t' + (pr.cap ? (aib.fch ? this._getBox('cap4chanAlt') + '<br>' : '') + this._getInp('capUpdTime') + '<br>' + this._getSel('captchaLang') + '<br>' : '') + '\n\t\t\t' + (pr.txta ? this._getSel('addTextBtns') + this._getBox('txtBtnsLoc') + '<br>' : '') + '\n\t\t\t' + (pr.passw ? this._getInp('passwValue', true, 9) + ('<input type="button" id="de-cfg-btn-pass" class="de-cfg-button" value="' + Lng.change[lang] + '"><br>') : '') + '\n\t\t\t' + (pr.name ? this._getInp('nameValue', false, 9) + ' ' + this._getBox('userName') + '<br>' : '') + '\n\t\t\t' + (pr.rules || pr.passw || pr.name ? Lng.hide[lang] + (pr.rules ? this._getBox('noBoardRule') : '') + (pr.passw ? this._getBox('noPassword') : '') + (pr.name ? this._getBox('noName') : '') + (pr.subj ? this._getBox('noSubj') : '') : '') + '\n\t\t</div>';
		},


		_getCfgCommon: function _getCfgCommon() {
			return '<div id="de-cfg-common" class="de-cfg-unvis">\n\t\t\t' + this._getSel('scriptStyle') + '<br>\n\t\t\t' + this._getBox('userCSS') + '\n\t\t\t<a href="' + gitWiki + 'css-tricks" class="de-abtn" target="_blank">[?]</a><br>\n\t\t\t' + this._getSel('panelCounter') + '<br>\n\t\t\t' + this._getBox('rePageTitle') + '<br>\n\t\t\t' + ('animation' in docBody.style ? this._getBox('animation') + '<br>' : '') + '\n\t\t\t' + this._getBox('closePopups') + '<br>\n\t\t\t' + this._getBox('inftyScroll') + '<br>\n\t\t\t' + this._getBox('scrollToTop') + '<br>\n\t\t\t' + this._getBox('hotKeys') + '\n\t\t\t<input type="button" id="de-cfg-btn-keys" class="de-cfg-button" value="' + Lng.edit[lang] + '">\n\t\t\t<div class="de-cfg-depend">\n\t\t\t\t' + this._getInp('loadPages') + '\n\t\t\t</div>\n\t\t\t' + (!nav.isChromeStorage && !nav.Presto || nav.isGM ? this._getBox('updScript') + ('<div class="de-cfg-depend">\n\t\t\t\t\t' + this._getSel('scrUpdIntrv') + '\n\t\t\t\t\t<input type="button" id="de-cfg-btn-updnow" class="de-cfg-button" value="' + Lng.checkNow[lang] + '">\n\t\t\t\t</div>') : '') + '\n\t\t\t' + (nav.isGlobal ? Lng.cfg.excludeList[lang] + '<input type="text" info="excludeList" class="de-cfg-inptxt" style="display: block; width: 80%;" placeholder="4chan.org, 8ch.net, \u2026">' + this._getBox('turnOff') : '') + '\n\t\t</div>';
		},


		_getCfgInfo: function _getCfgInfo() {
			return '<div id="de-cfg-info" class="de-cfg-unvis">\n\t\t\t<div style="padding-bottom: 10px;">\n\t\t\t\t<a href="' + gitWiki + 'versions" target="_blank">v' + version + '.' + (commit + (nav.isESNext ? '.es6' : '')) + '</a>&nbsp;|&nbsp;\n\t\t\t\t<a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a>&nbsp;|&nbsp;\n\t\t\t\t<a href="' + (gitWiki + (lang ? 'home-en/' : '')) + '" target="_blank">Github</a>\n\t\t\t</div>\n\t\t\t<div id="de-info-table">\n\t\t\t\t<div id="de-info-stats">' + this._getInfoTable([[Lng.thrViewed[lang], Cfg.stats.view], [Lng.thrCreated[lang], Cfg.stats.op], [Lng.thrHidden[lang], HiddenThreads.getCount()], [Lng.postsSent[lang], Cfg.stats.reply]], false) + '</div>\n\t\t\t\t<div id="de-info-log">' + this._getInfoTable(Logger.getData(false), true) + '</div>\n\t\t\t</div>\n\t\t\t<input type="button" id="de-cfg-btn-debug" value="' + Lng.debug[lang] + '" title="' + Lng.infoDebug[lang] + '">\n\t\t</div>';
		},


		_getBox: function _getBox(id) {
			return '<label class="de-cfg-label">\n\t\t\t<input class="de-cfg-chkbox" info="' + id + '" type="checkbox"> ' + Lng.cfg[id][lang] + '\n\t\t</label>';
		},


		_getInp: function _getInp(id) {
			var addText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

			return '<label class="de-cfg-label">\n\t\t\t<input class="de-cfg-inptxt" info="' + id + '" type="text" size="' + size + '" value="' + escapeHTML(Cfg[id]) + '">' + (addText && Lng.cfg[id] ? Lng.cfg[id][lang] : '') + '</label>';
		},


		_getSel: function _getSel(id) {
			var x = Lng.cfg[id];
			var opt = [];
			for (var i = 0, len = x.sel[lang].length; i < len; ++i) {
				opt.push('<option value="', i, '">', x.sel[lang][i], '</option>');
			}
			return '<label class="de-cfg-label">\n\t\t\t<select class="de-cfg-select" info="' + id + '">' + opt.join('') + '</select> ' + x.txt[lang] + '\n\t\t</label>';
		},


		_getInfoTable: function _getInfoTable(data, needMs) {
			return data.map(function (data) {
				return '<div class="de-info-row">\n\t\t\t<span class="de-info-name">' + data[0] + '</span>\n\t\t\t<span>' + (data[1] + (needMs ? 'ms' : '')) + '</span>\n\t\t</div>';
			}).join('');
		},


		_getList: function _getList(a) {
			return $join(a, '<label class="de-block"><input type="checkbox"> ', '</label>');
		},


		_getTab: function _getTab(name) {
			return '<div class="' + aib.cReply + ' de-cfg-tab" info="' + name + '">' + Lng.cfgTab[name][lang] + '</div>';
		},


		_toggleBox: function _toggleBox(state, arr) {
			var i = arr.length;
			var nState = !state;
			while (i--) {
				($q(arr[i]) || {}).disabled = nState;
			}
		},
		_updateCSS: function _updateCSS() {
			$each($Q('#de-css, #de-css-dynamic, #de-css-user', doc.head), $del);
			scriptCSS();
		},
		_updateDependant: function _updateDependant() {
			this._toggleBox(Cfg.ajaxUpdThr, ['input[info="updThrDelay"]', 'input[info="updCount"]', 'input[info="favIcoBlink"]', 'input[info="markNewPosts"]', 'input[info="desktNotif"]', 'input[info="noErrInTitle"]']);
			this._toggleBox(Cfg.postBtnsCSS === 2, ['input[info="postBtnsBack"]']);
			this._toggleBox(Cfg.expandImgs, ['input[info="imgNavBtns"]', 'input[info="imgInfoLink"]', 'input[info="resizeDPI"]', 'input[info="resizeImgs"]', 'input[info="minImgSize"]', 'input[info="zoomFactor"]', 'input[info="webmControl"]', 'input[info="webmTitles"]', 'input[info="webmVolume"]', 'input[info="minWebmWidth"]']);
			this._toggleBox(Cfg.preLoadImgs, ['input[info="findImgFile"]']);
			this._toggleBox(Cfg.linksNavig, ['input[info="linksOver"]', 'input[info="linksOut"]', 'input[info="markViewed"]', 'input[info="strikeHidd"]', 'input[info="noNavigHidd"]']);
			this._toggleBox(Cfg.strikeHidd && Cfg.linksNavig, ['input[info="removeHidd"]']);
			this._toggleBox(Cfg.addYouTube && Cfg.addYouTube !== 4, ['select[info="YTubeType"]', 'input[info="addVimeo"]']);
			this._toggleBox(Cfg.addYouTube, ['input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]', 'input[info="ytApiKey"]']);
			this._toggleBox(Cfg.YTubeTitles, ['input[info="ytApiKey"]']);
			this._toggleBox(Cfg.ajaxPosting, ['input[info="postSameImg"]', 'input[info="removeEXIF"]', 'input[info="removeFName"]', 'input[info="sendErrNotif"]', 'input[info="scrAfterRep"]', 'select[info="fileInputs"]']);
			this._toggleBox(Cfg.addTextBtns, ['input[info="txtBtnsLoc"]']);
			this._toggleBox(Cfg.updScript, ['select[info="scrUpdIntrv"]']);
			this._toggleBox(Cfg.hotKeys, ['input[info="loadPages"]']);
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
	});


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
			el = $id('de-wrapper-popup').appendChild($add('\n\t\t<div class="' + aib.cReply + ' de-popup" id="de-popup-' + id + '">\n\t\t\t<span class="de-popup-btn">' + buttonHTML + '</span>\n\t\t\t<div class="de-popup-msg">' + txt.trim() + '</div>\n\t\t</div>'));
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

	function Menu(parentEl, html, clickFn) {
		var isFixed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

		var el = $bEnd(docBody, '<div class="' + aib.cReply + ' de-menu" style="position: ' + (isFixed ? 'fixed' : 'absolute') + '; left: 0px; top: 0px; visibility: hidden;">' + html + '</div>');
		var mStyle = el.style,
		    cr = parentEl.getBoundingClientRect(),
		    width = el.offsetWidth,
		    xOffset = isFixed ? 0 : window.pageXOffset;
		if (cr.left + width < Post.sizing.wWidth) {
			mStyle.left = xOffset + cr.left + 'px';
		} else {
			mStyle.left = xOffset + cr.right - width + 'px';
		}
		var height = el.offsetHeight;
		var yOffset = isFixed ? 0 : window.pageYOffset;
		if (cr.bottom + height < Post.sizing.wHeight) {
			mStyle.top = yOffset + cr.bottom - 0.5 + 'px';
		} else {
			mStyle.top = yOffset + cr.top - height + 0.5 + 'px';
		}
		mStyle.removeProperty('visibility');
		this._clickFn = clickFn;
		this._el = el;
		this.parentEl = parentEl;
		el.addEventListener('mouseover', this, true);
		el.addEventListener('mouseout', this, true);
		parentEl.addEventListener('mouseout', this);
		el.addEventListener('click', this);
	}
	Menu.prototype = {
		_closeTO: 0,
		onover: null,
		onout: null,
		onremove: null,
		remove: function remove() {
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
		},
		handleEvent: function handleEvent(e) {
			var _this12 = this;

			var isOverEvent = false,
			    el = e.target;
			switch (e.type) {
				case 'click':
					if (el.className === 'de-menu-item') {
						this.remove();
						this._clickFn(el);
						if (!Cfg.expandPanel && !$q('.de-win-active')) {
							$hide($id('de-panel-buttons'));
						}
					}
					break;
				case 'mouseover':
					isOverEvent = true;
				case 'mouseout':
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
								return _this12.remove();
							}, 75);
							if (this.onout) {
								this.onout();
							}
						}
					}
			}
		}
	};

	function addMenu(el) {
		var fn = function fn(a) {
			return $join(a, '<span class="de-menu-item">', '</span>');
		};
		switch (el.id) {
			case 'de-btn-spell-add':
				return new Menu(el, '<div style="display: inline-block; border-right: 1px solid grey;">' + fn('#words,#exp,#exph,#imgn,#ihash,#subj,#name,#trip,#img,#sage'.split(',')) + '</div><div style="display: inline-block;">' + fn('#op,#tlen,#all,#video,#vauthor,#num,#wipe,#rep,#outrep,<br>'.split(',')) + '</div>', function (el) {
					var exp = el.textContent;
					$txtInsert($id('de-spell-txt'), exp + (!aib.t || exp === '#op' || exp === '#rep' || exp === '#outrep' ? '' : '[' + aib.b + ',' + aib.t + ']') + (Spells.needArg[Spells.names.indexOf(exp.substr(1))] ? '(' : ''));
				});
			case 'de-panel-refresh':
				return new Menu(el, fn(Lng.selAjaxPages[lang]), function (el) {
					Pages.load(aProto.indexOf.call(el.parentNode.children, el) + 1);
				});
			case 'de-panel-savethr':
				return new Menu(el, fn($q(aib.qPostImg, DelForm.first.el) ? Lng.selSaveThr[lang] : [Lng.selSaveThr[lang][0]]), function (el) {
					if (!$id('de-popup-savethr')) {
						var imgOnly = !!aProto.indexOf.call(el.parentNode.children, el);
						if (Images_.preloading) {
							$popup('savethr', Lng.loading[lang], true);
							Images_.afterpreload = function () {
								return loadDocFiles(imgOnly);
							};
							Images_.progressId = 'savethr';
						} else {
							loadDocFiles(imgOnly);
						}
					}
				});
			case 'de-panel-audio-off':
				return new Menu(el, fn(Lng.selAudioNotif[lang]), function (el) {
					var i = aProto.indexOf.call(el.parentNode.children, el);
					updater.enable();
					updater.toggleAudio(i === 0 ? 3e4 : i === 1 ? 6e4 : i === 2 ? 12e4 : 3e5);
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
		getDefaultKeys: function getDefaultKeys() {
			var globKeys = [
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
			];
			var nonThrKeys = [
0x004D 
			, 0x004E 
			, 0x0056 
			, 0x0045 
			];
			var thrKeys = [
0x0055 
			];
			return [HotKeys.version, nav.Firefox, globKeys, nonThrKeys, thrKeys];
		},
		clear: function clear() {
			this.cPost = null;
			this.lastPageOffset = 0;
		},
		disable: function disable() {
			if (this.enabled) {
				this.enabled = false;
				if (this.cPost) {
					this.cPost.unselect();
				}
				this.clear();
				this.gKeys = this.ntKeys = this.tKeys = null;
				doc.removeEventListener('keydown', this, true);
			}
		},
		enable: function enable() {
			var _this13 = this;

			if (!this.enabled) {
				this.enabled = true;
				this._paused = false;
				Promise.resolve(this.readKeys()).then(function (keys) {
					if (_this13.enabled) {
						_this13.gKeys = keys[2];
						_this13.ntKeys = keys[3];
						_this13.tKeys = keys[4];
						doc.addEventListener('keydown', _this13, true);
					}
				});
			}
		},
		handleEvent: function handleEvent(e) {
			if (this._paused || e.metaKey) {
				return;
			}
			var isThr = aib.t,
			    curTh = e.target.tagName,
			    kc = e.keyCode | (e.ctrlKey ? 0x1000 : 0) | (e.shiftKey ? 0x2000 : 0) | (e.altKey ? 0x4000 : 0) | (curTh === 'TEXTAREA' || curTh === 'INPUT' && (e.target.type === 'text' || e.target.type === 'password') ? 0x8000 : 0);
			if (kc === 0x74 || kc === 0x8074) {
				if (isThr || $id('de-popup-load-pages')) {
					return;
				}
				if (Attachment.viewer) {
					Attachment.viewer.close(null);
					Attachment.viewer = null;
				}
				Pages.load(+Cfg.loadPages);
			} else if (kc === 0x1B) {
				if (Attachment.viewer) {
					Attachment.viewer.close(null);
					Attachment.viewer = null;
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
				e.target.blur();
			} else {
				var post,
				    idx,
				    globIdx = this.gKeys.indexOf(kc);
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
							post.setUserVisib(!post.hidden);
							this._scroll(post, false, post.isOp);
						}
						break;
					case 4:
						if (Attachment.viewer) {
							Attachment.viewer.navigate(false);
						} else if (isThr || aib.page !== aib.firstPage) {
							window.location.pathname = aib.getPageUrl(aib.b, isThr ? 0 : aib.page - 1);
						}
						break;
					case 5:
						if (e.target !== pr.txta && e.target !== pr.cap.textEl) {
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
						if (e.target !== pr.txta) {
							return;
						}
						$id('de-btn-bold').click();
						break;
					case 13:
						if (e.target !== pr.txta) {
							return;
						}
						$id('de-btn-italic').click();
						break;
					case 14:
						if (e.target !== pr.txta) {
							return;
						}
						$id('de-btn-strike').click();
						break;
					case 15:
						if (e.target !== pr.txta) {
							return;
						}
						$id('de-btn-spoil').click();
						break;
					case 16:
						if (e.target !== pr.txta) {
							return;
						}
						$id('de-btn-code').click();
						break;
					case 17:
						if (Attachment.viewer) {
							Attachment.viewer.navigate(true);
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
						var scrollToThr = !isThr && (globIdx === 0 || globIdx === 1);
						this._scroll(this._getFirstVisPost(scrollToThr, false), globIdx === 0 || idx === 0, scrollToThr);
				}
			}
			e.stopPropagation();
			$pd(e);
		},
		pause: function pause() {
			this._paused = true;
		},
		resume: function resume(keys) {
			this.gKeys = keys[2];
			this.ntKeys = keys[3];
			this.tKeys = keys[4];
			this._paused = false;
		},

		readKeys: function readKeys() {
			var keys, str, tKeys, mapFunc;
			return regeneratorRuntime.async(function readKeys$(_context10) {
				while (1) {
					switch (_context10.prev = _context10.next) {
						case 0:
							_context10.next = 2;
							return regeneratorRuntime.awrap(getStored('DESU_keys'));

						case 2:
							str = _context10.sent;

							if (str) {
								_context10.next = 5;
								break;
							}

							return _context10.abrupt('return', this.getDefaultKeys());

						case 5:
							_context10.prev = 5;

							keys = JSON.parse(str);

						case 7:
							_context10.prev = 7;

							if (keys) {
								_context10.next = 10;
								break;
							}

							return _context10.abrupt('return', this.getDefaultKeys());

						case 10:
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
							if (keys[1] ^ nav.Firefox) {
								mapFunc = nav.Firefox ? function mapFuncFF(key) {
									switch (key) {
										case 189:
											return 173;
										case 187:
											return 61;
										case 186:
											return 59;
										default:
											return key;
									}
								} : function mapFuncNonFF(key) {
									switch (key) {
										case 173:
											return 189;
										case 61:
											return 187;
										case 59:
											return 186;
										default:
											return key;
									}
								};

								keys[1] = nav.Firefox;
								keys[2] = keys[2].map(mapFunc);
								keys[3] = keys[3].map(mapFunc);
								setStored('DESU_keys', JSON.stringify(keys));
							}
							return _context10.abrupt('return', keys);

						case 14:
						case 'end':
							return _context10.stop();
					}
				}
			}, null, this, [[5,, 7, 14]]);
		},

		_paused: false,
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
		_getNextVisPost: function _getNextVisPost(cPost, isOp, toUp) {
			if (isOp) {
				var thr = cPost ? toUp ? cPost.thr.prevNotHidden : cPost.thr.nextNotHidden : Thread.first.hidden ? Thread.first.nextNotHidden : Thread.first;
				return thr ? thr.op : null;
			}
			return cPost ? cPost.getAdjacentVisPost(toUp) : Thread.first.hidden || Thread.first.op.hidden ? Thread.first.op.getAdjacentVisPost(toUp) : Thread.first.op;
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

	function KeyEditListener(popupEl, keys, allKeys) {
		var aInputs = Array.from($Q('.de-input-key', popupEl));
		for (var i = 0, len = allKeys.length; i < len; ++i) {
			var k = allKeys[i];
			if (k !== 0) {
				for (var j = i + 1; j < len; ++j) {
					if (k === allKeys[j]) {
						aInputs[i].classList.add('de-error-input');
						aInputs[j].classList.add('de-error-input');
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
		this.errCount = $Q('.de-error-input', popupEl).length;
		if (this.errCount !== 0) {
			this.saveButton.disabled = true;
		}
	}
	KeyEditListener.keyCodes = ['',,,,,,,, 'Backspace', 'Tab',,,, 'Enter',,, 'Shift', 'Ctrl', 'Alt',,,,,,,,,,,,,,  
'Space',,,,,    '←', '↑', '→', '↓',,,,,,,,  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',, ';',, '=',,,, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',,,,,,
'Numpad 0', 'Numpad 1', 'Numpad 2', 'Numpad 3', 'Numpad 4', 'Numpad 5', 'Numpad 6', 'Numpad 7', 'Numpad 8', 'Numpad 9', 'Numpad *', 'Numpad +',, 'Numpad -', 'Numpad .', 'Numpad /',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,     
'-',,,,,,,,,,,,, ';', '=', ',', '-', '.', '/', '`',,,,,,,,,,,,,,,,,,,,,,,,,,, '[', '\\', ']', '\''];
	KeyEditListener.getStrKey = function (key) {
		return (key & 0x1000 ? 'Ctrl+' : '') + (key & 0x2000 ? 'Shift+' : '') + (key & 0x4000 ? 'Alt+' : '') + KeyEditListener.keyCodes[key & 0xFFF];
	};
	KeyEditListener.getEditMarkup = function (keys) {
		var allKeys = [];
		var html = Lng.hotKeyEdit[lang].join('').replace(/%l/g, '<label class="de-block">').replace(/%\/l/g, '</label>').replace(/%i([2-4])([0-9]+)(t)?/g, function (all, id1, id2, isText) {
			var key = keys[+id1][+id2];
			allKeys.push(key);
			return '<input class="de-input-key" type="text" de-id1="' + id1 + '" de-id2="' + id2 + '" size="16" value="' + KeyEditListener.getStrKey(key) + (isText ? '" de-text' : '"') + ' readonly>';
		}) + '<input type="button" id="de-keys-save" class="de-button" value="' + Lng.save[lang] + '">' + '<input type="button" id="de-keys-reset" class="de-button" value="' + Lng.reset[lang] + '">';
		return [allKeys, html];
	};
	KeyEditListener.setTitle = function (el, idx) {
		var title = el.getAttribute('de-title');
		if (!title) {
			title = el.getAttribute('title');
			el.setAttribute('de-title', title);
		}
		if (HotKeys.enabled && idx !== -1) {
			title += ' [' + KeyEditListener.getStrKey(HotKeys.gKeys[idx]) + ']';
		}
		el.title = title;
	};
	KeyEditListener.prototype = {
		cEl: null,
		cKey: -1,
		errorInput: false,
		get saveButton() {
			var val = $id('de-keys-save');
			Object.defineProperty(this, 'saveButton', { value: val, configurable: true });
			return val;
		},
		handleEvent: function handleEvent(e) {
			var key,
			    el = e.target;
			switch (e.type) {
				case 'blur':
					if (HotKeys.enabled && this.errCount === 0) {
						HotKeys.resume(this.keys);
					}
					this.cEl = null;
					return;
				case 'focus':
					if (HotKeys.enabled) {
						HotKeys.pause();
					}
					this.cEl = el;
					return;
				case 'click':
					var keys;
					if (el.id === 'de-keys-reset') {
						this.keys = HotKeys.getDefaultKeys();
						this.initKeys = HotKeys.getDefaultKeys();
						if (HotKeys.enabled) {
							HotKeys.resume(this.keys);
						}
						var temp = KeyEditListener.getEditMarkup(this.keys);
						this.allKeys = temp[0];
						this.popupEl.innerHTML = temp[1];
						this.allInputs = Array.from($Q('.de-input-key', this.popupEl));
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
				case 'keydown':
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
				case 'keyup':
					el = this.cEl;
					key = this.cKey;
					if (!el || key === -1) {
						return;
					}
					var rEl,
					    isError = el.classList.contains('de-error-input');
					if (!this.errorInput && key !== -1) {
						var idx = this.allInputs.indexOf(el),
						    oKey = this.allKeys[idx];
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
								if (rEl.classList.contains('de-error-input')) {
									this.errCount--;
									rEl.classList.remove('de-error-input');
								}
							}
							if (rIdx === -1) {
								this.errCount--;
								el.classList.remove('de-error-input');
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
						if (!rEl.classList.contains('de-error-input')) {
							this.errCount++;
							rEl.classList.add('de-error-input');
						}
					}
					if (!isError) {
						this.errCount++;
						el.classList.add('de-error-input');
					}
					if (this.errCount !== 0) {
						this.saveButton.disabled = true;
					}
			}
			$pd(e);
		}
	};


	function detectImgFile(ab) {
		var i,
		    j,
		    dat = new Uint8Array(ab),
		    len = dat.length;
		if (dat[0] === 0xFF && dat[1] === 0xD8) {
			for (i = 0, j = 0; i < len - 1; i++) {
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
			for (i = 0; i < len - 7; i++) {
				if (dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
					i += 8;
					break;
				}
			}
		} else {
			return {};
		}
		if (i !== len && len - i > 60) {
			for (len = i + 90; i < len; i++) {
				if (dat[i] === 0x37 && dat[i + 1] === 0x7A && dat[i + 2] === 0xBC) {
					return { type: 0, idx: i, data: ab };
				} else if (dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
					return { type: 1, idx: i, data: ab };
				} else if (dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
					return { type: 2, idx: i, data: ab };
				} else if (dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
					return { type: 3, idx: i, data: ab };
				} else if (dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
					return { type: 4, idx: i, data: ab };
				}
			}
		}
		return {};
	}

	function WorkerPool(mReqs, wrkFn, errFn) {
		var _this14 = this;

		if (!nav.hasWorker) {
			this.run = function (data, transferObjs, fn) {
				return fn(wrkFn(data));
			};
			return;
		}
		var url = window.URL.createObjectURL(new Blob(['self.onmessage = function(e) {\n\t\tvar info = (' + String(wrkFn) + ')(e.data);\n\t\tif(info.data) {\n\t\t\tself.postMessage(info, [info.data]);\n\t\t} else {\n\t\t\tself.postMessage(info);\n\t\t}\n\t}'], { type: 'text/javascript' }));
		this._pool = new TasksPool(mReqs, function (num, data) {
			return _this14._createWorker(num, data);
		}, null);
		this._freeWorkers = [];
		this._url = url;
		this._errFn = errFn;
		while (mReqs--) {
			this._freeWorkers.push(new Worker(url));
		}
	}
	WorkerPool.prototype = {
		run: function run(data, transferObjs, fn) {
			this._pool.run([data, transferObjs, fn]);
		},
		_createWorker: function _createWorker(num, data) {
			var _this15 = this;

			return new Promise(function (resolve, reject) {
				var w = _this15._freeWorkers.pop(),
				    _data2 = _slicedToArray(data, 3),
				    sendData = _data2[0],
				    transferObjs = _data2[1],
				    fn = _data2[2];

				w.onmessage = function (e) {
					fn(e.data);
					_this15._freeWorkers.push(w);
					resolve();
				};
				w.onerror = function (err) {
					resolve();
					_this15._freeWorkers.push(w);
					_this15._errFn(err);
				};
				w.postMessage(sendData, transferObjs);
			});
		},
		clear: function clear() {
			window.URL.revokeObjectURL(this._url);
			this._freeWorkers = [];
		}
	};

	function addImgFileIcon(nameLink, fName, info) {
		var app,
		    ext,
		    type = info.type;
		if (typeof type === 'undefined') {
			return;
		}
		if (type === 2) {
			app = 'application/x-rar-compressed';
			ext = 'rar';
		} else if (type === 1) {
			app = 'application/zip';
			ext = 'zip';
		} else if (type === 0) {
			app = 'application/x-7z-compressed';
			ext = '7z';
		} else if (type === 3) {
			app = 'audio/ogg';
			ext = 'ogg';
		} else {
			app = 'audio/mpeg';
			ext = 'mp3';
		}
		nameLink.insertAdjacentHTML('afterend', '<a href="' + window.URL.createObjectURL(new Blob([nav.getUnsafeUint8Array(info.data, info.idx)], { type: app })) + '" class="de-img-' + (type > 2 ? 'audio' : 'arch') + '" title="' + Lng.downloadFile[lang] + '" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>');
	}

	function downloadImgData(url) {
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
				} catch (e) {}
			}
			var txt = xhr.responseText;
			var rv = new Uint8Array(txt.length);
			for (var i = 0, len = txt.length; i < len; ++i) {
				rv[i] = txt.charCodeAt(i) & 0xFF;
			}
			return rv;
		}, function (err) {
			return err.code !== 404 && repeatOnError ? downloadImgData(url, false) : null;
		});
	}

	function preloadImages(data) {
		if (!Cfg.preLoadImgs && !Cfg.openImgs && !isPreImg) {
			return;
		}
		var pool,
		    isPost = data instanceof AbstractPost;
		if (isPreImg || Cfg.preLoadImgs) {
			var cImg = 1,
			    mReqs = isPost ? 1 : 4,
			    rjf = (isPreImg || Cfg.findImgFile) && new WorkerPool(mReqs, detectImgFile, function (e) {
				console.error('File detector error:', 'line: ' + e.lineno + ' - ' + e.message);
			});
			pool = new TasksPool(mReqs, function (num, data) {
				return downloadImgData(data[0]).then(function (imageData) {
					var _data3 = _slicedToArray(data, 5),
					    url = _data3[0],
					    imgLink = _data3[1],
					    iType = _data3[2],
					    nExp = _data3[3],
					    el = _data3[4];

					if (imageData) {
						(function () {
							var fName = url.substring(url.lastIndexOf('/') + 1);
							var nameLink = $q(aib.qImgNameLink, aib.getImgWrap(el));
							imgLink.setAttribute('download', fName);
							nameLink.setAttribute('download', fName);
							nameLink.setAttribute('de-href', nameLink.href);
							imgLink.href = nameLink.href = window.URL.createObjectURL(new Blob([imageData], { type: iType }));
							if (iType === 'video/webm') {
								el.setAttribute('de-video', '');
							}
							if (nExp) {
								el.src = imgLink.href;
							}
							if (rjf) {
								rjf.run(imageData.buffer, [imageData.buffer], function (info) {
									return addImgFileIcon(nameLink, fName, info);
								});
							}
						})();
					}
					if (Images_.progressId) {
						$popup(Images_.progressId, Lng.loadImage[lang] + ': ' + cImg + '/' + len, true);
					}
					cImg++;
				});
			}, function () {
				Images_.preloading = false;
				if (Images_.afterpreload) {
					Images_.afterpreload();
					Images_.afterpreload = Images_.progressId = null;
				}
				if (rjf) {
					rjf.clear();
				}
			});
			Images_.preloading = true;
		}
		var els = $Q(aib.qPostImg, isPost ? data.el : data);
		for (var i = 0, len = els.length; i < len; ++i) {
			var el = els[i],
			    imgLink = $parent(el = els[i], 'A');
			if (!imgLink) {
				continue;
			}
			var nExp = !!Cfg.openImgs;
			var url = imgLink.href;
			var iType = getFileType(url);
			if (!iType) {
				continue;
			} else if (iType === 'image/gif') {
				nExp &= Cfg.openImgs !== 3;
			} else {
				if (iType === 'video/webm') {
					nExp = false;
				}
				nExp &= Cfg.openImgs !== 2;
			}
			if (pool) {
				pool.run([url, imgLink, iType, nExp, el]);
			} else if (nExp) {
				el.src = url; 
			}
		}
		if (pool) {
			pool.complete();
		}
	}

	function getDataFromImg(el) {
		try {
			var cnv = Images_.canvas || (Images_.canvas = doc.createElement('canvas'));
			cnv.width = el.width;
			cnv.height = el.height;
			cnv.getContext('2d').drawImage(el, 0, 0);
			return Promise.resolve(new Uint8Array(atob(cnv.toDataURL('image/png').split(',')[1]).split('').map(function (a) {
				return a.charCodeAt();
			})));
		} catch (e) {
			return downloadImgData(el.src);
		}
	}

	function loadDocFiles(imgOnly) {
		var els,
		    progress,
		    counter,
		    count = 0,
		    current = 1,
		    warnings = '',
		    tar = new TarBuilder(),
		    dc = imgOnly ? doc : doc.documentElement.cloneNode(true);
		Images_.pool = new TasksPool(4, function (num, data) {
			return downloadImgData(data[0]).then(function (imgData) {
				var _data4 = _slicedToArray(data, 4),
				    url = _data4[0],
				    fName = _data4[1],
				    el = _data4[2],
				    imgLink = _data4[3],
				    safeName = fName.replace(/[\\\/:*?"<>|]/g, '_');

				progress.value = current;
				counter.innerHTML = current;
				current++;
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
						warnings += '<br>' + Lng.cantLoad[lang] + ' <a href="' + url + '">' + url + '</a><br>' + Lng.willSavePview[lang];
						$popup('err-files', Lng.loadErrors[lang] + warnings);
						if (imgOnly) {
							return getDataFromImg(el).then(function (data) {
								return tar.addFile(thumbName, data);
							}, emptyFn);
						}
					}
					return imgOnly ? null : getDataFromImg(el).then(function (data) {
						el.src = thumbName;
						tar.addFile(thumbName, data);
					}, function () {
						el.src = safeName;
					});
				} else if (imgData && imgData.length > 0) {
					tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
				} else {
					$del(el);
				}
			});
		}, function () {
			var docName = aib.dm + '-' + aib.b.replace(/[\\\/:*?"<>|]/g, '') + '-' + aib.t;
			if (!imgOnly) {
				$q('head', dc).insertAdjacentHTML('beforeend', '<script type="text/javascript" src="data/dollscript.js" charset="utf-8"></script>');
				$each($Q('#de-css, #de-css-dynamic, #de-css-user', dc), $del);
				var scriptStr,
				    localData = JSON.stringify({ dm: aib.dm, b: aib.b, t: aib.t });
				if (nav.isESNext) {
					scriptStr = '(' + String(de_main_func_inner) + ')(null, null, (x, y) => window.scrollTo(x, y), ' + localData + ');';
				} else {
					scriptStr = '(' + String(de_main_func_outer) + ')(' + localData + ');';
				}
				tar.addString('data/dollscript.js', scriptStr);
				var dt = doc.doctype;
				tar.addString(docName + '.html', '<!DOCTYPE ' + dt.name + (dt.publicId ? ' PUBLIC "' + dt.publicId + '"' : dt.systemId ? ' SYSTEM' : '') + (dt.systemId ? ' "' + dt.systemId + '"' : '') + '>' + dc.outerHTML);
			}
			downloadBlob(tar.get(), docName + (imgOnly ? '-images.tar' : '.tar'));
			$del($id('de-popup-load-files'));
			Images_.pool = tar = warnings = count = current = imgOnly = progress = counter = null;
		});
		els = Array.from($Q(aib.qPostImg, $q('[de-form]', dc)));
		count += els.length;
		els.forEach(function (el) {
			var imgLink = $parent(el, 'A');
			if (imgLink) {
				var url = imgLink.href;
				if (aib.tiny) {
					url = url.replace(/^.*?\?v=|&.*?$/g, '');
				}
				Images_.pool.run([url, imgLink.getAttribute('download') || url.substring(url.lastIndexOf('/') + 1), el, imgLink]);
			}
		});
		if (!imgOnly) {
			$each($Q('#de-main, .de-parea, .de-post-btns, .de-btn-src, .de-refmap, .de-thread-buttons, ' + '.de-video-obj, #de-win-reply, link[rel="alternate stylesheet"], script, ' + aib.qForm, dc), $del);
			$each($Q('a', dc), function (el) {
				var num,
				    tc = el.textContent;
				if (tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && pByNum.has(num)) {
					el.href = aib.anchor + num;
					if (!el.classList.contains('de-link-pref')) {
						el.className = 'de-link-pref ' + el.className;
					}
				} else {
					el.href = getAbsLink(el.href);
				}
			});
			$each($Q(aib.qRPost, dc), function (post, i) {
				post.setAttribute('de-num', i === 0 ? aib.t : aib.getPNum(post));
			});
			var files = [];
			var urlRegex = new RegExp('^\\/\\/?|^https?:\\/\\/([^\\/]*\.)?' + quoteReg(aib.fch ? '4cdn.org' : aib.dm) + '\\/', 'i');
			$each($Q('link, *[src]', dc), function (el) {
				if (els.indexOf(el) !== -1) {
					return;
				}
				var fName,
				    url = el.tagName === 'LINK' ? el.href : el.src;
				if (!urlRegex.test(url)) {
					$del(el);
					return;
				}
				fName = url.substring(url.lastIndexOf('/') + 1).replace(/[\\\/:*?"<>|]/g, '_').toLowerCase();
				if (files.indexOf(fName) !== -1) {
					var temp = url.lastIndexOf('.'),
					    ext = url.substring(temp);
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
				Images_.pool.run([url, fName, el, null]);
				count++;
			});
		}
		$popup('load-files', (imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang]) + ':<br><progress id="de-loadprogress" value="0" max="' + count + '"></progress> <span>1</span>/' + count, true);
		progress = $id('de-loadprogress');
		counter = progress.nextElementSibling;
		Images_.pool.complete();
		els = null;
	}


	function DateTime(pattern, rPattern, diff, dtLang, onRPat) {
		if (DateTime.checkPattern(pattern)) {
			this.disabled = true;
			return;
		}
		this.regex = pattern.replace(/(?:[sihdny]\?){2,}/g, function (str) {
			return '(?:' + str.replace(/\?/g, '') + ')?';
		}).replace(/\-/g, '[^<]').replace(/\+/g, '[^0-9<]').replace(/([sihdny]+)/g, '($1)').replace(/[sihdny]/g, '\\d').replace(/m|w/g, '([a-zA-Zа-яА-Я]+)');
		this.pattern = pattern.replace(/[\?\-\+]+/g, '').replace(/([a-z])\1+/g, '$1');
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
	DateTime.toggleSettings = function (el) {
		if (el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.timeOffset) || DateTime.checkPattern(Cfg.timePattern))) {
			$popup('err-correcttime', Lng.cTimeError[lang]);
			saveCfg('correctTime', 0);
			el.checked = false;
		}
	};
	DateTime.checkPattern = function (val) {
		return !val.includes('i') || !val.includes('h') || !val.includes('d') || !val.includes('y') || !(val.includes('n') || val.includes('m')) || /[^\?\-\+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
	};
	DateTime.prototype = {
		genDateTime: null,
		onRPat: null,
		pad2: pad2,
		genRFunc: function genRFunc(rPattern) {
			return new Function('dtime', 'return \'' + rPattern.replace('_o', (this.diff < 0 ? '' : '+') + this.diff).replace('_s', '\' + this.pad2(dtime.getSeconds()) + \'').replace('_i', '\' + this.pad2(dtime.getMinutes()) + \'').replace('_h', '\' + this.pad2(dtime.getHours()) + \'').replace('_d', '\' + this.pad2(dtime.getDate()) + \'').replace('_w', '\' + this.arrW[dtime.getDay()] + \'').replace('_n', '\' + this.pad2(dtime.getMonth() + 1) + \'').replace('_m', '\' + this.arrM[dtime.getMonth()] + \'').replace('_M', '\' + this.arrFM[dtime.getMonth()] + \'').replace('_y', '\' + (\'\' + dtime.getFullYear()).substring(2) + \'').replace('_Y', '\' + dtime.getFullYear() + \'') + '\';');
		},
		getRPattern: function getRPattern(txt) {
			var m = txt.match(new RegExp(this.regex));
			if (!m) {
				this.disabled = true;
				return false;
			}
			var rPattern = '';
			for (var i = 1, len = m.length, j = 0, str = m[0]; i < len;) {
				var a = m[i++],
				    p = this.pattern[i - 2];
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
		},
		fix: function fix(txt) {
			var _this16 = this;

			if (this.disabled || !this.genDateTime && !this.getRPattern(txt)) {
				return txt;
			}
			return txt.replace(new RegExp(this.regex, 'g'), function (str) {
				for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key = 1; _key < _len2; _key++) {
					args[_key - 1] = arguments[_key];
				}

				var second, minute, hour, day, month, year;
				for (var i = 0; i < 7; ++i) {
					var a = args[i];
					switch (_this16.pattern[i]) {
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
				dtime.setHours(dtime.getHours() + _this16.diff);
				return _this16.genDateTime(dtime);
			});
		}
	};


	function Videos(post) {
		var player = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var playerInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		this.post = post;
		this.vData = [[], []];
		if (player && playerInfo) {
			Object.defineProperty(this, 'player', { value: player });
			this.playerInfo = playerInfo;
		}
	}
	Videos._global = {
		get vData() {
			var val;
			try {
				sesStorage.removeItem('de-videos-data1');
				val = Cfg.YTubeTitles ? JSON.parse(sesStorage['de-videos-data2'] || '[{}, {}]') : [{}, {}];
			} catch (e) {
				val = [{}, {}];
			}
			Object.defineProperty(this, 'vData', { value: val });
			return val;
		}
	};
	Videos.ytReg = /^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([a-zA-Z0-9-_]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/;
	Videos.vimReg = /^https?:\/\/(?:www\.)?vimeo\.com\/(?:[^\?]+\?clip_id=|.*?\/)?(\d+).*?(#t=\d+)?$/;
	Videos.addPlayer = function (el, m, isYtube) {
		var enableJsapi = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		var txt;
		if (isYtube) {
			var list = m[0].match(/list=[^&#]+/);
			txt = '<iframe class="de-video-player" src="https://www.youtube.com/embed/' + m[1] + '?start=' + ((m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? +m[4] : 0)) + (enableJsapi ? '&enablejsapi=1' : Cfg.addYouTube === 3 ? '&autoplay=1' : '') + (list ? '&' + list[0] : '') + (Cfg.YTubeType === 1 ? '&html5=1" type="text/html"' : '" type="application/x-shockwave-flash"') + ' frameborder="0" allowfullscreen="1"></iframe>';
		} else {
			var id = m[1] + (m[2] ? m[2] : '');
			txt = Cfg.YTubeType === 1 ? '<iframe class="de-video-player" src="' + aib.prot + '//player.vimeo.com/video/' + id + (Cfg.addYouTube === 3 ? '?autoplay=1' : '') + '" frameborder="0" ' + 'webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : '<embed class="de-video-player" type="application/x-shockwave-flash" src="' + aib.prot + '//vimeo.com/moogaloop.swf' + '?clip_id=' + id + (Cfg.addYouTube === 3 ? '&autoplay=1' : '') + '&server=vimeo.com&color=00adef&fullscreen=1" ' + 'allowscriptaccess="always" allowfullscreen="true"></embed>';
		}
		el.innerHTML = txt + (enableJsapi ? '' : '<span class="de-video-resizer" title="' + Lng.expandVideo[lang] + '"></span>');
		$show(el);
		if (!enableJsapi) {
			el.lastChild.onclick = function () {
				var node = this.parentNode;
				node.className = 'de-video-obj' + (node.className === 'de-video-obj' ? ' de-video-expanded' : '');
			};
		}
	};
	Videos.setLinkData = function (link, _ref9) {
		var _ref10 = _slicedToArray(_ref9, 5),
		    title = _ref10[0],
		    author = _ref10[1],
		    views = _ref10[2],
		    publ = _ref10[3],
		    duration = _ref10[4];

		link.textContent = title;
		link.classList.add('de-video-title');
		link.setAttribute('de-author', author);
		link.title = (duration ? Lng.duration[lang] + duration : '') + (publ ? ', ' + Lng.published[lang] + publ + '\n' : '') + Lng.author[lang] + author + (views ? ', ' + Lng.views[lang] + views : '');
	};
	Videos._fixTime = function () {
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
		var timeStr = (hours ? hours + 'h' : '') + (minutes ? minutes + 'm' : '') + (seconds ? seconds + 's' : '');
		return [timeStr, hours, minutes, seconds];
	};
	Videos._titlesLoaderHelper = function (_ref11, num) {
		var _ref12 = _slicedToArray(_ref11, 4),
		    link = _ref12[0],
		    isYtube = _ref12[1],
		    videoObj = _ref12[2],
		    id = _ref12[3];

		for (var _len3 = arguments.length, data = Array(_len3 > 2 ? _len3 - 2 : 0), _key2 = 2; _key2 < _len3; _key2++) {
			data[_key2 - 2] = arguments[_key2];
		}

		if (data.length !== 0) {
			Videos.setLinkData(link, data);
			Videos._global.vData[isYtube ? 0 : 1][id] = data;
			videoObj.vData[isYtube ? 0 : 1].push(data);
			if (videoObj.titleLoadFn) {
				videoObj.titleLoadFn(data);
			}
		}
		videoObj.loadedLinksCount++;
		if (num % 30 === 0) {
			return Promise.reject(new TasksPool.PauseError(3e3));
		}
		return sleep(250);
	};
	Videos._getYTInfoAPI = function (info, num, id) {
		return $ajax('https://www.googleapis.com/youtube/v3/videos?key=' + Cfg.ytApiKey + '&id=' + id + '&part=snippet,statistics,contentDetails&fields=items/snippet/title,items/snippet/publishedAt,items/snippet/channelTitle,items/statistics/viewCount,items/contentDetails/duration', null, false).then(function (xhr) {
			var items = JSON.parse(xhr.responseText).items[0];
			return Videos._titlesLoaderHelper(info, num, items.snippet.title, items.snippet.channelTitle, items.statistics.viewCount, items.snippet.publishedAt.substr(0, 10), items.contentDetails.duration.substr(2).toLowerCase());
		})['catch'](function () {
			return Videos._getYTInfoOembed(info, num, id);
		});
	};
	Videos._getYTInfoOembed = function (info, num, id) {
		return (nav.isGM ? $ajax('https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D' + id + '&format=json', null, false) : $ajax('https://noembed.com/embed?url=http%3A//youtube.com/watch%3Fv%3D' + id + '&callback=?')).then(function (xhr) {
			var json = JSON.parse(xhr.responseText);
			return Videos._titlesLoaderHelper(info, num, json.title, json.author_name, null, null, null);
		})['catch'](function () {
			return Videos._titlesLoaderHelper(info, num);
		});
	};
	Videos._getTitlesLoader = function () {
		return Cfg.YTubeTitles && new TasksPool(4, function (num, info) {
			var _info5 = _slicedToArray(info, 4),
			    isYtube = _info5[1],
			    id = _info5[3];

			if (isYtube) {
				return Cfg.ytApiKey ? Videos._getYTInfoAPI(info, num, id) : Videos._getYTInfoOembed(info, num, id);
			}
			return $ajax(aib.prot + '//vimeo.com/api/v2/video/' + id + '.json', null, false).then(function (xhr) {
				var entry = JSON.parse(xhr.responseText)[0];
				return Videos._titlesLoaderHelper(info, num, entry.title, entry.user_name, entry.stats_number_of_plays, /(.*)\s(.*)?/.exec(entry.upload_date)[1], Videos._fixTime(entry.duration)[0]);
			})['catch'](function () {
				return Videos._titlesLoaderHelper(info, num);
			});
		}, function () {
			sesStorage['de-videos-data2'] = JSON.stringify(Videos._global.vData);
		});
	};
	Videos.prototype = {
		currentLink: null,
		hasLinks: false,
		playerInfo: null,
		titleLoadFn: null,
		linksCount: 0,
		loadedLinksCount: 0,
		get player() {
			var post = this.post;
			var val = aib.insertYtPlayer(post.msg, '<div class="de-video-obj' + (post.images.hasAttachments && !post.isOp ? ' de-video-obj-inline' : '') + '"></div>');
			Object.defineProperty(this, 'player', { value: val });
			return val;
		},
		addLink: function addLink(m, loader, link, isYtube) {
			var time, dataObj;
			this.hasLinks = true;
			this.linksCount++;
			if (this.playerInfo === null) {
				if (Cfg.addYouTube === 2) {
					this.addPlayer(m, isYtube);
				} else if (Cfg.addYouTube > 2) {
					this._addThumb(m, isYtube);
				}
			} else if (!link && $q('.de-video-link[href*="' + m[1] + '"]', this.post.msg)) {
				return;
			}
			if (loader && (dataObj = Videos._global.vData[isYtube ? 0 : 1][m[1]])) {
				this.vData[isYtube ? 0 : 1].push(dataObj);
			}

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
				link = $bEnd(this.post.msg, '\n\t\t\t<p class="de-video-ext"><a class="de-video-link ' + ((isYtube ? 'de-ytube' : 'de-vimeo') + (time ? '" de-time="' + time : '')) + '" href="' + src + '">' + (dataObj ? '' : src) + '</a></p>').firstChild;
			}
			if (dataObj) {
				Videos.setLinkData(link, dataObj);
			}
			if (this.playerInfo === null || this.playerInfo === m) {
				this.currentLink = link;
			}
			link.videoInfo = m;
			if (loader && !dataObj) {
				loader.run([link, isYtube, this, m[1]]);
			}
		},
		addPlayer: function addPlayer(m, isYtube) {
			this.playerInfo = m;
			Videos.addPlayer(this.player, m, isYtube);
		},
		clickLink: function clickLink(el, mode) {
			var m = el.videoInfo;
			if (this.playerInfo !== m) {
				this.currentLink.classList.remove('de-current');
				this.currentLink = el;
				if (mode > 2) {
					this._addThumb(m, el.classList.contains('de-ytube'));
				} else {
					el.classList.add('de-current');
					this.addPlayer(m, el.classList.contains('de-ytube'));
				}
				return;
			}
			if (mode === 3) {
				if ($q('.de-video-thumb', this.player)) {
					el.classList.add('de-current');
					this.addPlayer(m, el.classList.contains('de-ytube'));
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
		},
		updatePost: function updatePost(oldLinks, newLinks, cloned) {
			var loader = !cloned && Videos._getTitlesLoader();
			for (var i = 0, j = 0, len = newLinks.length; i < len; ++i) {
				var el = newLinks[i],
				    link = oldLinks[j];
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
				loader.complete();
			}
		},
		_addThumb: function _addThumb(m, isYtube) {
			var el = this.player;
			this.playerInfo = m;
			$show(el);
			if (isYtube) {
				el.innerHTML = '<a class="de-video-player" href="' + aib.prot + '//www.youtube.com/watch?v=' + m[1] + '" target="_blank">' + '<img class="de-video-thumb de-ytube" src="https://i.ytimg.com/vi/' + m[1] + '/0.jpg"></a>';
				return;
			}
			el.innerHTML = '<a class="de-video-player" href="' + aib.prot + '//vimeo.com/' + m[1] + '" target="_blank"><img class="de-video-thumb de-vimeo" src=""></a>';
			$ajax(aib.prot + '//vimeo.com/api/v2/video/' + m[1] + '.json', null, false).then(function (xhr) {
				try {
					el.firstChild.firstChild.setAttribute('src', JSON.parse(xhr.responseText)[0].thumbnail_large);
				} catch (e) {}
			});
		}
	};

	function VideosParser() {
		this._loader = Videos._getTitlesLoader();
	}
	VideosParser.prototype = {
		end: function end() {
			if (this._loader) {
				this._loader.complete();
			}
		},
		parse: function parse(data) {
			var isPost = data instanceof AbstractPost;
			var loader = this._loader;
			var links = $Q('a[href*="youtu"]', isPost ? data.el : data);
			for (var i = 0, len = links.length; i < len; ++i) {
				var link = links[i];
				var m = link.href.match(Videos.ytReg);
				if (m) {
					var _mPost = isPost ? data : aib.getPostOfEl(link);
					if (_mPost) {
						_mPost.videos.addLink(m, loader, link, true);
					}
				}
			}
			if (Cfg.addVimeo) {
				links = $Q('a[href*="vimeo.com"]', isPost ? data.el : data);
				for (var _i7 = 0, _len4 = links.length; _i7 < _len4; ++_i7) {
					var _link = links[_i7];
					var _m = _link.href.match(Videos.vimReg);
					if (_m) {
						var mPost = isPost ? data : aib.getPostOfEl(_link);
						if (mPost) {
							mPost.videos.addLink(_m, loader, _link, false);
						}
					}
				}
			}
			var vids = aib.fixVideo(isPost, data);
			for (var _i8 = 0, _len5 = vids.length; _i8 < _len5; ++_i8) {
				var _vids$_i = _slicedToArray(vids[_i8], 3),
				    pst = _vids$_i[0],
				    _m2 = _vids$_i[1],
				    isYtube = _vids$_i[2];

				if (pst) {
					pst.videos.addLink(_m2, loader, null, isYtube);
				}
			}
			return this;
		}
	};

	function embedMediaLinks(data) {
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
					el.insertAdjacentHTML('beforeend', '<object data="http://junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + src + '"><br>');
				}
			}
		}
		if (Cfg.addVocaroo) {
			var _els = $Q('a[href*="vocaroo.com"]', isPost ? data.el : data);
			for (var _i9 = 0, _len6 = _els.length; _i9 < _len6; ++_i9) {
				var _link2 = _els[_i9];
				var _el2 = _link2.previousSibling;
				if (!_el2 || _el2.className !== 'de-vocaroo') {
					_link2.insertAdjacentHTML('beforebegin', '<div class="de-vocaroo">\n\t\t\t\t\t<embed src="http://vocaroo.com/player.swf?playMediaID=' + _link2.href.split('\/').pop() + '" width="148" height="44" wmode="transparent" type="application/x-shockwave-flash">\n\t\t\t\t</div>');
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
			(function () {
				var gmxhr = void 0;
				var toFunc = function toFunc() {
					reject(AjaxError.Timeout);
					try {
						gmxhr.abort();
					} catch (e) {}
				};
				var loadTO = needTO && setTimeout(toFunc, 5e3);
				var obj = {
					'method': params && params.method || 'GET',
					'url': nav.fixLink(url),
					'onreadystatechange': function onreadystatechange(e) {
						if (needTO) {
							clearTimeout(loadTO);
						}
						if (e.readyState === 4) {
							if (e.status === 200 || aib.tiny && e.status === 400) {
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
						} catch (e) {}
					};
				}
			})();
		} else {
			var _ret6 = function () {
				var xhr = new XMLHttpRequest();
				var toFunc = function toFunc() {
					reject(AjaxError.Timeout);
					xhr.abort();
				};
				var loadTO = needTO && setTimeout(toFunc, 5e3);
				if (params && params.onprogress) {
					xhr.upload.onprogress = params.onprogress;
				}
				xhr.onreadystatechange = function (_ref13) {
					var target = _ref13.target;

					if (needTO) {
						clearTimeout(loadTO);
					}
					if (target.readyState === 4) {
						if (target.status === 200 || aib.tiny && target.status === 400 || target.status === 0 && target.responseType === 'arraybuffer') {
							resolve(target);
						} else {
							reject(new AjaxError(target.status, target.statusText));
						}
					} else if (needTO) {
						loadTO = setTimeout(toFunc, 5e3);
					}
				};
				try {
					xhr.open(params && params.method || 'GET', url, true);
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
							clearTimeout(loadTO);
						}
						xhr.abort();
					};
				} catch (e) {
					clearTimeout(loadTO);
					nativeXHRworks = false;
					return {
						v: $ajax(url, params, false)
					};
				}
			}();

			if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
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
	AjaxError.Locked = new AjaxError(-1, {
		toString: function toString() {
			return Lng.thrClosed[lang];
		}
	});
	AjaxError.Timeout = new AjaxError(0, {
		toString: function toString() {
			return Lng.noConnect[lang] + ' (timeout)';
		}
	});

	var AjaxCache = function (_ref14) {
		_inherits(AjaxCache, _ref14);

		function AjaxCache() {
			_classCallCheck(this, AjaxCache);

			return _possibleConstructorReturn(this, (AjaxCache.__proto__ || Object.getPrototypeOf(AjaxCache)).apply(this, arguments));
		}

		_createClass(AjaxCache, null, [{
			key: 'clear',
			value: function clear() {
				AjaxCache._data = new Map();
			}
		}, {
			key: 'fixURL',
			value: function fixURL(url) {
				return url + (url.includes('?') ? '&' : '?') + 'nocache=' + Math.random();
			}
		}, {
			key: 'runCachedAjax',
			value: function runCachedAjax(url, useCache) {
				var _ref15 = AjaxCache._data.get(url) || {},
				    hasCacheControl = _ref15.hasCacheControl,
				    params = _ref15.params;

				var ajaxURL = hasCacheControl === false ? AjaxCache.fixURL(url) : url;
				return $ajax(ajaxURL, useCache && params || { useTimeout: true }).then(function (xhr) {
					return AjaxCache.saveData(url, xhr) ? xhr : $ajax(AjaxCache.fixURL(url), useCache && params);
				});
			}
		}, {
			key: 'saveData',
			value: function saveData(url, xhr) {
				var ETag = null,
				    LastModified = null,
				    i = 0,
				    hasCacheControl = false,
				    ajaxHeaders = 'getAllResponseHeaders' in xhr ? xhr.getAllResponseHeaders() : xhr.responseHeaders;
				for (var _iterator5 = ajaxHeaders.split('\r\n'), _isArray5 = Array.isArray(_iterator5), _i10 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
					var _ref16;

					if (_isArray5) {
						if (_i10 >= _iterator5.length) break;
						_ref16 = _iterator5[_i10++];
					} else {
						_i10 = _iterator5.next();
						if (_i10.done) break;
						_ref16 = _i10.value;
					}

					var header = _ref16;

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
				var headers = null;
				if (ETag || LastModified) {
					headers = {};
					if (ETag) {
						headers['If-None-Match'] = ETag;
					}
					if (LastModified) {
						headers['If-Modified-Since'] = LastModified;
					}
				}
				var hasUrl = AjaxCache._data.has(url);
				AjaxCache._data.set(url, { hasCacheControl: hasCacheControl, params: headers ? { headers: headers, useTimeout: true } : { useTimeout: true } });
				return hasUrl || hasCacheControl;
			}
		}]);

		return AjaxCache;
	}(null);

	AjaxCache._data = new Map();

	function ajaxLoad(url) {
		var returnForm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
		var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
		var checkArch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		return AjaxCache.runCachedAjax(url, useCache).then(function (xhr) {
			var el,
			    text = xhr.responseText;
			if (text.includes('</html>')) {
				el = returnForm ? $q(aib.qDForm, $DOM(text)) : $DOM(text);
			}
			return el ? !checkArch ? el : [el, (xhr.responseURL || '').includes('/arch/')] : CancelablePromise.reject(new AjaxError(0, Lng.errCorruptData[lang]));
		}, function (err) {
			return err.code === 304 ? null : CancelablePromise.reject(err);
		});
	}

	function ajaxPostsLoad(brd, tNum, useCache) {
		if (aib.jsonBuilder) {
			return AjaxCache.runCachedAjax(aib.getJsonApiUrl(brd, tNum), useCache).then(function (xhr) {
				try {
					return new aib.jsonBuilder(JSON.parse(xhr.responseText), brd);
				} catch (e) {
					if (e instanceof AjaxError) {
						return CancelablePromise.reject(e);
					}
					console.warn('API error: ' + e + '. Switching to DOM parsing!');
					aib.jsonBuilder = null;
					return ajaxPostsLoad(brd, tNum, useCache);
				}
			}, function (e) {
				return e.code === 304 ? null : CancelablePromise.reject(e);
			});
		}
		return aib.iichan ? ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache, true).then(function (data) {
			return data && data[0] ? new DOMPostsBuilder(data[0], data[1]) : null;
		}) : ajaxLoad(aib.getThrUrl(brd, tNum), true, useCache).then(function (form) {
			return form ? new DOMPostsBuilder(form) : null;
		});
	}

	function infoLoadErrors(e) {
		var showError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

		var isAjax = e instanceof AjaxError,
		    eCode = isAjax ? e.code : 0;
		if (eCode === 200) {
			closePopup('newposts');
		} else if (isAjax && eCode === 0) {
			$popup('newposts', e.message ? String(e.message) : Lng.noConnect[lang]);
		} else {
			$popup('newposts', Lng.thrNotFound[lang] + aib.t + '): \n' + getErrorMessage(e));
			if (showError) {
				doc.title = '{' + eCode + '} ' + doc.title;
			}
		}
	}


	var Pages = {
		add: function add() {
			var _this18 = this;

			var pageNum = DelForm.last.pageNum + 1;
			if (this._adding || pageNum > aib.lastPage) {
				return;
			}
			this._adding = true;
			DelForm.last.el.insertAdjacentHTML('beforeend', '<div class="de-addpage-wait"><hr>' + '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' + Lng.loading[lang] + '</div>');
			MyPosts.purge();
			this._addPromise = ajaxLoad(aib.getPageUrl(aib.b, pageNum)).then(function (formEl) {
				var form = _this18._addForm(formEl, pageNum);
				if (!form.firstThr) {
					_this18._endAdding();
					_this18.add();
					return CancelablePromise.reject(new CancelError());
				}
				return _this18._updateForms(DelForm.last);
			}).then(function () {
				return _this18._endAdding();
			})['catch'](function (e) {
				if (!(e instanceof CancelError)) {
					$popup('add-page', getErrorMessage(e));
					_this18._endAdding();
				}
			});
		},

		load: function load(count) {
			var _iterator6, _isArray6, _i11, _ref17, form, len, i, el, first;

			return regeneratorRuntime.async(function load$(_context11) {
				while (1) {
					switch (_context11.prev = _context11.next) {
						case 0:
							$popup('load-pages', Lng.loading[lang], true);
							if (this._addPromise) {
								this._addPromise.cancel();
								this._endAdding();
							}
							PviewsCache.purge();
							isExpImg = false;
							pByEl = new Map();
							pByNum = new Map();
							Post.hiddenNums = new Set();
							if (Attachment.viewer) {
								Attachment.viewer.close(null);
								Attachment.viewer = null;
							}
							if (pr.isQuick) {
								pr.clearForm();
							}
							DelForm.tNums = new Set();
							_iterator6 = DelForm, _isArray6 = Array.isArray(_iterator6), _i11 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();

						case 11:
							if (!_isArray6) {
								_context11.next = 17;
								break;
							}

							if (!(_i11 >= _iterator6.length)) {
								_context11.next = 14;
								break;
							}

							return _context11.abrupt('break', 29);

						case 14:
							_ref17 = _iterator6[_i11++];
							_context11.next = 21;
							break;

						case 17:
							_i11 = _iterator6.next();

							if (!_i11.done) {
								_context11.next = 20;
								break;
							}

							return _context11.abrupt('break', 29);

						case 20:
							_ref17 = _i11.value;

						case 21:
							form = _ref17;

							$each($Q('a[href^="blob:"]', form.el), function (a) {
								return URL.revokeObjectURL(a.href);
							});
							$hide(form.el);

							if (!(form === DelForm.last)) {
								_context11.next = 26;
								break;
							}

							return _context11.abrupt('break', 29);

						case 26:
							$del(form.el);

						case 27:
							_context11.next = 11;
							break;

						case 29:
							DelForm.first = DelForm.last;
							len = Math.min(aib.lastPage + 1, aib.page + count);
							i = aib.page;

						case 32:
							if (!(i < len)) {
								_context11.next = 46;
								break;
							}

							_context11.prev = 33;
							_context11.next = 36;
							return regeneratorRuntime.awrap(ajaxLoad(aib.getPageUrl(aib.b, i)));

						case 36:
							el = _context11.sent;

							this._addForm(el, i);
							_context11.next = 43;
							break;

						case 40:
							_context11.prev = 40;
							_context11.t0 = _context11['catch'](33);

							$popup('load-pages', getErrorMessage(_context11.t0));

						case 43:
							++i;
							_context11.next = 32;
							break;

						case 46:
							first = DelForm.first;

							if (!(first !== DelForm.last)) {
								_context11.next = 53;
								break;
							}

							DelForm.first = first.next;
							$del(first.el);
							_context11.next = 52;
							return regeneratorRuntime.awrap(this._updateForms(DelForm.first));

						case 52:
							closePopup('load-pages');

						case 53:
						case 'end':
							return _context11.stop();
					}
				}
			}, null, this, [[33, 40]]);
		},

		_adding: false,
		_addPromise: null,
		_addForm: function _addForm(formEl, pageNum) {
			formEl = doc.adoptNode(formEl);
			$hide(formEl = aib.fixHTML(formEl));
			$after(DelForm.last.el, formEl);
			var form = new DelForm(formEl, +pageNum, DelForm.last);
			DelForm.last = form;
			form.addStuff();
			if (pageNum != aib.page && form.firstThr) {
				formEl.insertAdjacentHTML('afterbegin', '<div class="de-page-num">\n\t\t\t\t<center style="font-size: 2em">' + Lng.page[lang] + ' ' + pageNum + '</center>\n\t\t\t\t<hr>\n\t\t\t</div>');
			}
			$show(formEl);
			return form;
		},
		_endAdding: function _endAdding() {
			$del($q('.de-addpage-wait'));
			this._adding = false;
			this._addPromise = null;
		},

		_updateForms: function _updateForms(newForm) {
			var fav;
			return regeneratorRuntime.async(function _updateForms$(_context12) {
				while (1) {
					switch (_context12.prev = _context12.next) {
						case 0:
							_context12.next = 2;
							return regeneratorRuntime.awrap(getStoredObj('DESU_Favorites'));

						case 2:
							fav = _context12.sent;

							readPostsData(newForm.firstThr.op, fav);
							if (pr.passw) {
								PostForm.setUserPassw();
							}
							if (HotKeys.enabled) {
								HotKeys.clear();
							}

						case 6:
						case 'end':
							return _context12.stop();
					}
				}
			}, null, this);
		}
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
					Pages.add();
				}
			});
		}
	};


	var Spells = Object.create({
		hash: null,
		names: ['words', 'exp', 'exph', 'imgn', 'ihash', 'subj', 'name', 'trip', 'img', 'sage', 'op', 'tlen', 'all', 'video', 'wipe', 'num', 'vauthor'],
		needArg: [
true, true, true, true, true,
false, true, false, false, false,
false, false, false, false, false,
true, true],
		get hiders() {
			this._init();
			return this.hiders;
		},
		get reps() {
			this._init();
			return this.reps;
		},
		get outreps() {
			this._init();
			return this.outreps;
		},
		get list() {
			var str, reps, oreps, data;
			if (Cfg.spells === null) {
				return '#wipe(samelines,samewords,longwords,symbols,numbers,whitespace)';
			}
			try {
				data = JSON.parse(Cfg.spells);
			} catch (e) {
				return '';
			}
			str = data[1] ? this._decompileScope(data[1], '')[0].join('\n') : '';
			reps = data[2];
			oreps = data[3];
			if (reps || oreps) {
				if (str) {
					str += '\n\n';
				}
				if (reps) {
					for (var _iterator7 = reps, _isArray7 = Array.isArray(_iterator7), _i12 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
						var _ref18;

						if (_isArray7) {
							if (_i12 >= _iterator7.length) break;
							_ref18 = _iterator7[_i12++];
						} else {
							_i12 = _iterator7.next();
							if (_i12.done) break;
							_ref18 = _i12.value;
						}

						var rep = _ref18;

						str += this._decompileRep(rep, false) + '\n';
					}
				}
				if (oreps) {
					for (var _iterator8 = oreps, _isArray8 = Array.isArray(_iterator8), _i13 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
						var _ref19;

						if (_isArray8) {
							if (_i13 >= _iterator8.length) break;
							_ref19 = _iterator8[_i13++];
						} else {
							_i13 = _iterator8.next();
							if (_i13.done) break;
							_ref19 = _i13.value;
						}

						var orep = _ref19;

						str += this._decompileRep(orep, true) + '\n';
					}
				}
				str = str.substr(0, str.length - 1);
			}
			return str;
		},
		add: function add(type, arg, isNeg) {
			var temp,
			    fld = $id('de-spell-txt'),
			    val = fld && fld.value,
			    chk = $q('input[info="hideBySpell"]'),
			    spells = val && this.parseText(val);
			if (!val || spells) {
				if (!spells) {
					try {
						spells = JSON.parse(Cfg.spells);
					} catch (e) {}
					spells = spells || [Date.now(), [], null, null];
				}
				var idx,
				    scope = aib.t ? [aib.b, aib.t] : null,
				    sScope = String(scope),
				    sArg = String(arg);
				var isAdded = true;
				if (spells[1]) {
					spells[1].some(scope && isNeg ? function (spell, i) {
						var data;
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
				saveCfg('spells', aib.stringify(spells));
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

			var spell = (neg ? '!#' : '#') + Spells.names[type] + (scope ? '[' + scope[0] + (scope[1] ? ',' + (scope[1] === -1 ? '' : scope[1]) : '') + ']' : '');
			if (!val) {
				return spell;
			}
			if (type === 8) {
				return spell + '(' + (val[0] === 2 ? '>' : val[0] === 1 ? '<' : '=') + (val[1] ? val[1][0] + (val[1][1] === val[1][0] ? '' : '-' + val[1][1]) : '') + (val[2] ? '@' + val[2][0] + (val[2][0] === val[2][1] ? '' : '-' + val[2][1]) + 'x' + val[2][2] + (val[2][2] === val[2][3] ? '' : '-' + val[2][3]) : '') + ')';
			}
			else if (type === 14) {
					if (val === 0x3F && !wipeMsg) {
						return spell;
					}

					var _ref20 = wipeMsg || [],
					    _ref21 = _slicedToArray(_ref20, 2),
					    msgBit = _ref21[0],
					    msgData = _ref21[1],
					    names = [],
					    bits = { 1: 'samelines', 2: 'samewords', 4: 'longwords', 8: 'symbols',
						16: 'capslock', 32: 'numbers', 64: 'whitespace' };

					for (var bit in bits) {
						if (+bit !== msgBit) {
							if (val & +bit) {
								names.push(bits[bit]);
							}
						}
					}
					if (msgBit) {
						names.push(bits[msgBit].toUpperCase() + (msgData ? ': ' + msgData : ''));
					}
					return spell + '(' + names.join(',') + ')';
				}
				else if (type === 15 || type === 11) {
						var temp_,
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
					}
					else if (type === 0 || type === 6 || type === 7 || type === 16) {
							return spell + '(' + val.replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') + ')';
						} else {
							return spell + '(' + String(val) + ')';
						}
		},
		disable: function disable() {
			var value = null,
			    configurable = true;
			Object.defineProperties(this, {
				hiders: { configurable: configurable, value: value },
				reps: { configurable: configurable, value: value },
				outreps: { configurable: configurable, value: value }
			});
			saveCfg('hideBySpell', 0);
		},
		outReplace: function outReplace(txt) {
			for (var _iterator9 = this.outreps, _isArray9 = Array.isArray(_iterator9), _i14 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
				var _ref22;

				if (_isArray9) {
					if (_i14 >= _iterator9.length) break;
					_ref22 = _iterator9[_i14++];
				} else {
					_i14 = _iterator9.next();
					if (_i14.done) break;
					_ref22 = _i14.value;
				}

				var orep = _ref22;

				txt = txt.replace(orep[0], orep[1]);
			}
			return txt;
		},
		parseText: function parseText(text) {
			var codeGen = new SpellsCodegen(text),
			    data = codeGen.generate();
			if (codeGen.hasError) {
				$popup('err-spell', Lng.error[lang] + ': ' + codeGen.error);
			} else if (data) {
				if (data[0] && Cfg.sortSpells) {
					this._sort(data[0]);
				}
				return [Date.now(), data[0], data[1], data[2]];
			}
			return null;
		},
		setSpells: function setSpells(spells, sync) {
			if (sync) {
				this._sync(spells);
			}
			if (!Cfg.hideBySpell) {
				SpellsRunner.unhideAll();
				this.disable();
				return;
			}
			this._optimize(spells);
			if (this.hiders) {
				var sRunner = new SpellsRunner();
				for (var post = Thread.first.op; post; post = post.next) {
					sRunner.run(post);
				}
				sRunner.end();
			} else {
				SpellsRunner.unhideAll();
			}
		},
		replace: function replace(txt) {
			for (var _iterator10 = this.reps, _isArray10 = Array.isArray(_iterator10), _i15 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
				var _ref23;

				if (_isArray10) {
					if (_i15 >= _iterator10.length) break;
					_ref23 = _iterator10[_i15++];
				} else {
					_i15 = _iterator10.next();
					if (_i15.done) break;
					_ref23 = _i15.value;
				}

				var orep = _ref23;

				txt = txt.replace(orep[0], orep[1]);
			}
			return txt;
		},
		toggle: function toggle() {
			var spells,
			    fld = $id('de-spell-txt'),
			    val = fld.value;
			if (val && (spells = this.parseText(val))) {
				closePopup('err-spell');
				this.setSpells(spells, true);
				saveCfg('spells', aib.stringify(spells));
				fld.value = this.list;
			} else {
				if (!val) {
					closePopup('err-spell');
					SpellsRunner.unhideAll();
					this.disable();
					saveCfg('spells', aib.stringify([Date.now(), null, null, null]));
					locStorage['__de-spells'] = '{"hide": false, "data": null}';
					locStorage.removeItem('__de-spells');
				}
				$q('input[info="hideBySpell"]').checked = false;
			}
		},
		_decompileScope: function _decompileScope(scope, indent) {
			var dScope = [],
			    hScope = false;
			for (var i = 0, j = 0, len = scope.length; i < len; i++, j++) {
				var spell = scope[i],
				    type = spell[0] & 0xFF;
				if (type === 0xFF) {
					hScope = true;
					var temp = this._decompileScope(spell[1], indent + '    ');
					if (temp[1]) {
						var str = (spell[0] & 0x100 ? '!(\n' : '(\n') + indent + '    ' + temp[0].join('\n' + indent + '    ') + '\n' + indent + ')';
						if (j === 0) {
							dScope[0] = str;
						} else {
							dScope[--j] += ' ' + str;
						}
					} else {
						dScope[j] = (spell[0] & 0x100 ? '!(' : '(') + temp[0].join(' ') + ')';
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
		_decompileRep: function _decompileRep(rep, isOrep) {
			return (isOrep ? '#outrep' : '#rep') + (rep[0] ? '[' + rep[0] + (rep[1] ? ',' + (rep[1] === -1 ? '' : rep[1]) : '') + ']' : '') + '(' + rep[2] + ',' + rep[3].replace(/([)\\])/g, '\\$1').replace(/\n/g, '\\n') + ')';
		},
		_init: function _init() {
			if (!Cfg.hideBySpell) {
				var value = null,
				    configurable = true;
				Object.defineProperties(this, {
					hiders: { configurable: configurable, value: value },
					reps: { configurable: configurable, value: value },
					outreps: { configurable: configurable, value: value }
				});
				return;
			}
			var spells, data;
			try {
				spells = JSON.parse(Cfg.spells);
				data = JSON.parse(sesStorage['de-spells-' + aib.b + (aib.t || '')]);
			} catch (e) {}
			if (data && spells && data[0] === spells[0]) {
				this.hash = data[0];
				this._setData(data[1], data[2], data[3]);
				return;
			}
			if (spells) {
				this._optimize(spells);
			} else {
				this.disable();
			}
		},
		_initHiders: function _initHiders(data) {
			if (data) {
				for (var _iterator11 = data, _isArray11 = Array.isArray(_iterator11), _i16 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
					var _ref24;

					if (_isArray11) {
						if (_i16 >= _iterator11.length) break;
						_ref24 = _iterator11[_i16++];
					} else {
						_i16 = _iterator11.next();
						if (_i16.done) break;
						_ref24 = _i16.value;
					}

					var item = _ref24;

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
			}
			return data;
		},
		_initReps: function _initReps(data) {
			if (data) {
				for (var _iterator12 = data, _isArray12 = Array.isArray(_iterator12), _i17 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
					var _ref25;

					if (_isArray12) {
						if (_i17 >= _iterator12.length) break;
						_ref25 = _iterator12[_i17++];
					} else {
						_i17 = _iterator12.next();
						if (_i17.done) break;
						_ref25 = _i17.value;
					}

					var item = _ref25;

					item[0] = toRegExp(item[0], false);
				}
			}
			return data;
		},
		_optimize: function _optimize(data) {
			var hiders = data[1] ? this._optimizeSpells(data[1]) : null,
			    reps = data[2] ? this._optimizeReps(data[2]) : null,
			    outreps = data[3] ? this._optimizeReps(data[3]) : null;
			sesStorage['de-spells-' + aib.b + (aib.t || '')] = JSON.stringify([data[0], hiders, reps, outreps]);
			this.hash = data[0];
			this._setData(hiders, reps, outreps);
		},
		_optimizeReps: function _optimizeReps(data) {
			var rv = [];
			for (var _iterator13 = data, _isArray13 = Array.isArray(_iterator13), _i18 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
				var _ref26;

				if (_isArray13) {
					if (_i18 >= _iterator13.length) break;
					_ref26 = _iterator13[_i18++];
				} else {
					_i18 = _iterator13.next();
					if (_i18.done) break;
					_ref26 = _i18.value;
				}

				var rep = _ref26;

				if (!rep[0] || rep[0] === aib.b && (rep[1] === -1 ? !aib.t : !rep[1] || +rep[1] === aib.t)) {
					rv.push([rep[2], rep[3]]);
				}
			}
			return !rv.length ? null : rv;
		},
		_optimizeSpells: function _optimizeSpells(spells) {
			var neg,
			    lastSpell = -1,
			    newSpells = [];
			for (var i = 0, len = spells.length; i < len; ++i) {
				var j,
				    spell = spells[i],
				    flags = spell[0],
				    type = flags & 0xFF;
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
				reps: { configurable: configurable, value: this._initReps(reps) },
				outreps: { configurable: configurable, value: this._initReps(outreps) }
			});
		},
		_sort: function _sort(sp) {
			for (var i = 0, len = sp.length - 1; i < len; i++) {
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
			for (var _i19 = 0, _len7 = sp.length - 1; _i19 < _len7; _i19++) {
				if (sp[_i19][0] === sp[_i19 + 1][0] && sp[_i19][1] <= sp[_i19 + 1][1] && sp[_i19][1] >= sp[_i19 + 1][1] && (sp[_i19][2] === null || 
				sp[_i19][2] === undefined || 
				sp[_i19][2] <= sp[_i19 + 1][2] && sp[_i19][2] >= sp[_i19 + 1][2])) {
					sp.splice(_i19 + 1, 1);
					_i19--;
					_len7--;
				} else if (sp[_i19][0] === 0xFF) {
					sp.push(sp.splice(_i19, 1)[0]);
					_i19--;
					_len7--;
				}
			}
		},
		_sync: function _sync(data) {
			locStorage['__de-spells'] = JSON.stringify({
				'hide': !!Cfg.hideBySpell,
				'data': data
			});
			locStorage.removeItem('__de-spells');
		}
	});

	function SpellsCodegen(sList) {
		this._line = 1;
		this._col = 1;
		this._sList = sList;
		this.hasError = false;
	}
	SpellsCodegen.prototype = {
		TYPE_UNKNOWN: 0,
		TYPE_ANDOR: 1,
		TYPE_NOT: 2,
		TYPE_SPELL: 3,
		TYPE_PARENTHESES: 4,
		TYPE_REPLACER: 5,

		generate: function generate() {
			return this._sList ? this._generate(this._sList, false) : null;
		},

		get error() {
			if (!this.hasError) {
				return '';
			}
			return (this._errMsgArg ? this._errMsg.replace('%s', this._errMsgArg) : this._errMsg) + Lng.seRow[lang] + this._line + Lng.seCol[lang] + this._col + ')';
		},

		_errMsg: '',
		_errMsgArg: null,
		_generate: function _generate(sList, inParens) {
			var spells = [],
			    reps = [],
			    outreps = [],
			    lastType = this.TYPE_UNKNOWN,
			    hasReps = false;
			for (var i = 0, len = sList.length; i < len; i++, this._col++) {
				var res;
				switch (sList[i]) {
					case '\n':
						this._line++;
						this._col = 0;
					case '\r':
					case ' ':
						continue;
					case '#':
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
							spells.push(res[1]);
							lastType = this.TYPE_SPELL;
						}
						break;
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
						spells.push([lastType === this.TYPE_NOT ? 0x1FF : 0xFF, res[1]]);
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
							spells[spells.length - 1][0] |= 0x200;
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
							return [i, spells];
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
			return [spells, reps, outreps];
		},
		_getScope: function _getScope(str) {
			var m = str.match(/^\[([a-z0-9\/]+)(?:(,)|,(\s*[0-9]+))?\]/);
			if (m) {
				return [m[0].length, [m[1], m[3] ? +m[3] : m[2] ? -1 : false]];
			}
			return null;
		},
		_getRegex: function _getRegex(str, haveComma) {
			var val,
			    m = str.match(/^\((\/.*?[^\\]\/[igm]*)(?:\)|\s*(,))/);
			if (!m) {
				return null;
			}
			if (haveComma !== Boolean(m[2])) {
				return null;
			}
			val = m[1];
			try {
				toRegExp(val, true);
			} catch (e) {
				this._setError(Lng.seErrRegex[lang], val);
				return null;
			}
			return [m[0].length, val];
		},
		_getText: function _getText(str, haveBracket) {
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
							rv += '\n';
							break;
						case '\\':
							rv += '\\';
							break;
						case ')':
							rv += ')';
							break;
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
		},
		_doRep: function _doRep(name, str) {
			var regex,
			    scope = this._getScope(str);
			if (scope) {
				str = str.substring(scope[0]);
			} else {
				scope = [0, ['', '']];
			}
			regex = this._getRegex(str, true);
			if (regex) {
				str = str.substring(regex[0]);
				if (str[0] === ')') {
					return [regex[0] + scope[0] + 1, [scope[1][0], scope[1][1], regex[1], '']];
				}
				var val = this._getText(str, false);
				if (val) {
					return [val[0] + regex[0] + scope[0], [scope[1][0], scope[1][1], regex[1], val[1]]];
				}
			}
			this._setError(Lng.seSyntaxErr[lang], name);
			return null;
		},
		_doSpell: function _doSpell(name, str, isNeg) {
			var m,
			    spellType,
			    val,
			    temp,
			    scope = null,
			    i = 0,
			    spellIdx = Spells.names.indexOf(name);
			if (spellIdx === -1) {
				this._setError(Lng.seUnknown[lang], name);
				return null;
			}
			temp = this._getScope(str);
			if (temp) {
				i += temp[0];
				str = str.substring(temp[0]);
				scope = temp[1];
			}
			spellType = isNeg ? spellIdx | 0x100 : spellIdx;
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
					if (+m[1] === +m[1]) {
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
					temp = this._getText(str, true);
					if (temp) {
						return [i + temp[0], [spellType, spellIdx === 0 ? temp[1].toLowerCase() : temp[1], scope]];
					}
			}
			this._setError(Lng.seSyntaxErr[lang], name);
			return null;
		},
		_setError: function _setError(msg, arg) {
			this.hasError = true;
			this._errMsg = msg;
			this._errMsgArg = arg;
		}
	};

	var SpellsRunner = function () {
		_createClass(SpellsRunner, null, [{
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
		}]);

		function SpellsRunner() {
			_classCallCheck(this, SpellsRunner);

			this.hasNumSpell = false;
			this._endPromise = null;
			this._spells = Spells.hiders;
			if (!this._spells) {
				this.run = this._unhidePost;
				SpellsRunner.cachedData = null;
			}
		}

		_createClass(SpellsRunner, [{
			key: 'end',
			value: function end() {
				var _this19 = this;

				if (this._endPromise) {
					this._endPromise.then(function () {
						return _this19._savePostsHelper();
					});
				} else {
					this._savePostsHelper();
				}
			}
		}, {
			key: 'run',
			value: function run(post) {
				var _this20 = this;

				var interp = new SpellsInterpreter(post, this._spells);
				var res = interp.run();
				if (res instanceof Promise) {
					res = res.then(function (val) {
						return _this20._checkRes(post, val);
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
			value: function _checkRes(post, _ref27) {
				var _ref28 = _slicedToArray(_ref27, 3),
				    hasNumSpell = _ref28[0],
				    val = _ref28[1],
				    msg = _ref28[2];

				this.hasNumSpell |= hasNumSpell;
				if (val) {
					post.spellHide(msg);
					if (SpellsRunner.cachedData && !post.deleted) {
						SpellsRunner.cachedData[post.count] = [true, msg];
					}
					return 1;
				}
				return this._unhidePost(post);
			}
		}, {
			key: '_unhidePost',
			value: function _unhidePost(post) {
				if (post.spellHidden) {
					post.spellUnhide();
					if (SpellsRunner.cachedData && !post.deleted) {
						SpellsRunner.cachedData[post.count] = [false, null];
					}
				}
				return 0;
			}
		}, {
			key: '_savePostsHelper',
			value: function _savePostsHelper() {
				if (this._spells) {
					if (aib.t) {
						var lPost = Thread.first.lastNotDeleted,
						    data = null;
						if (Spells.hiders) {
							if (SpellsRunner.cachedData) {
								data = SpellsRunner.cachedData;
							} else {
								data = [];
								for (var post = Thread.first.op; post; post = post.nextNotDeleted) {
									var hidden = post.spellHidden;
									data.push(hidden ? [true, post.note.text] : [false, null]);
								}
								SpellsRunner.cachedData = data;
							}
						}
						sesStorage['de-hidden-' + aib.b + aib.t] = !data ? null : JSON.stringify({
							'hash': Cfg.hideBySpell ? Spells.hash : 0,
							'lastCount': lPost.count,
							'lastNum': lPost.num,
							'data': data
						});
					}
					toggleWindow('hid', true);
				}
				ImagesHashStorage.endFn();
			}
		}]);

		return SpellsRunner;
	}();

	SpellsRunner.cachedData = null;

	function SpellsInterpreter(post, spells) {
		this._post = post;
		this._ctx = [spells.length, spells, 0, false];
		this._lastTSpells = [];
		this._triggeredSpellsStack = [this._lastTSpells];
		this._deep = 0;
	}
	SpellsInterpreter.prototype = {
		hasNumSpell: false,
		run: function run() {
			var _this21 = this;

			var rv,
			    stopCheck,
			    isNegScope = this._ctx.pop(),
			    i = this._ctx.pop(),
			    scope = this._ctx.pop(),
			    len = this._ctx.pop();
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
							return _this21._asyncContinue(v);
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
		},


		_wipeMsg: null,
		_asyncContinue: function _asyncContinue(val) {
			var cl = this._ctx.length;
			var spell = this._ctx[cl - 3][this._ctx[cl - 2] - 1];

			var _checkRes4 = this._checkRes(spell, val, this._ctx[cl - 1]),
			    _checkRes5 = _slicedToArray(_checkRes4, 2),
			    rv = _checkRes5[0],
			    stopCheck = _checkRes5[1];

			return stopCheck ? [this.hasNumSpell, rv, rv ? this._getMsg() : null] : this.run();
		},
		_checkRes: function _checkRes(spell, val, isNegScope) {
			var flags = spell[0];
			var isAndSpell = (flags & 0x200) !== 0 ^ isNegScope;
			var isNegSpell = (flags & 0x100) !== 0 ^ isNegScope;
			if (isNegSpell ^ val) {
				this._lastTSpells.push([isNegSpell, spell, (spell[0] & 0xFF) === 14 ? this._wipeMsg : null]);
				return [true, !isAndSpell];
			}
			this._lastTSpells.length = 0;
			return [false, isAndSpell];
		},
		_getMsg: function _getMsg() {
			var rv = [];
			for (var _iterator14 = this._triggeredSpellsStack, _isArray14 = Array.isArray(_iterator14), _i20 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
				var _ref29;

				if (_isArray14) {
					if (_i20 >= _iterator14.length) break;
					_ref29 = _iterator14[_i20++];
				} else {
					_i20 = _iterator14.next();
					if (_i20.done) break;
					_ref29 = _i20.value;
				}

				var spellEls = _ref29;

				for (var _iterator15 = spellEls, _isArray15 = Array.isArray(_iterator15), _i21 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
					var _ref30;

					if (_isArray15) {
						if (_i21 >= _iterator15.length) break;
						_ref30 = _iterator15[_i21++];
					} else {
						_i21 = _iterator15.next();
						if (_i21.done) break;
						_ref30 = _i21.value;
					}

					var _ref31 = _ref30,
					    _ref32 = _slicedToArray(_ref31, 3),
					    isNeg = _ref32[0],
					    spell = _ref32[1],
					    wipeMsg = _ref32[2];

					rv.push(Spells.decompileSpell(spell[0] & 0xFF, isNeg, spell[1], spell[2], wipeMsg));
				}
			}
			return rv.join(' & ');
		},
		_runSpell: function _runSpell(spellId, val) {
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
		},
		_words: function _words(val) {
			return this._post.text.toLowerCase().includes(val) || this._post.subj.toLowerCase().includes(val);
		},
		_exp: function _exp(val) {
			return val.test(this._post.text);
		},
		_exph: function _exph(val) {
			return val.test(this._post.html);
		},
		_imgn: function _imgn(val) {
			for (var _iterator16 = this._post.images, _isArray16 = Array.isArray(_iterator16), _i22 = 0, _iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();;) {
				var _ref33;

				if (_isArray16) {
					if (_i22 >= _iterator16.length) break;
					_ref33 = _iterator16[_i22++];
				} else {
					_i22 = _iterator16.next();
					if (_i22.done) break;
					_ref33 = _i22.value;
				}

				var image = _ref33;

				if (image instanceof Attachment && val.test(image.name)) {
					return true;
				}
			}
			return false;
		},

		_ihash: function _ihash(val) {
			var _iterator17, _isArray17, _i23, _ref34, image, hash;

			return regeneratorRuntime.async(function _ihash$(_context13) {
				while (1) {
					switch (_context13.prev = _context13.next) {
						case 0:
							_iterator17 = this._post.images, _isArray17 = Array.isArray(_iterator17), _i23 = 0, _iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();

						case 1:
							if (!_isArray17) {
								_context13.next = 7;
								break;
							}

							if (!(_i23 >= _iterator17.length)) {
								_context13.next = 4;
								break;
							}

							return _context13.abrupt('break', 21);

						case 4:
							_ref34 = _iterator17[_i23++];
							_context13.next = 11;
							break;

						case 7:
							_i23 = _iterator17.next();

							if (!_i23.done) {
								_context13.next = 10;
								break;
							}

							return _context13.abrupt('break', 21);

						case 10:
							_ref34 = _i23.value;

						case 11:
							image = _ref34;

							if (image instanceof Attachment) {
								_context13.next = 14;
								break;
							}

							return _context13.abrupt('continue', 19);

						case 14:
							_context13.next = 16;
							return regeneratorRuntime.awrap(ImagesHashStorage.getHash(image));

						case 16:
							hash = _context13.sent;

							if (!(hash === val)) {
								_context13.next = 19;
								break;
							}

							return _context13.abrupt('return', true);

						case 19:
							_context13.next = 1;
							break;

						case 21:
							return _context13.abrupt('return', false);

						case 22:
						case 'end':
							return _context13.stop();
					}
				}
			}, null, this);
		},
		_subj: function _subj(val) {
			var pSubj = this._post.subj;
			return pSubj ? !val || val.test(pSubj) : false;
		},
		_name: function _name(val) {
			var pName = this._post.posterName;
			return pName ? !val || pName.includes(val) : false;
		},
		_trip: function _trip(val) {
			var pTrip = this._post.posterTrip;
			return pTrip ? !val || pTrip.includes(val) : false;
		},
		_img: function _img(val) {
			var images = this._post.images;

			var _val = _slicedToArray(val, 3),
			    compareRule = _val[0],
			    weightVals = _val[1],
			    sizeVals = _val[2];

			if (!val) {
				return images.hasAttachments;
			}
			for (var _iterator18 = images, _isArray18 = Array.isArray(_iterator18), _i24 = 0, _iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();;) {
				var _ref35;

				if (_isArray18) {
					if (_i24 >= _iterator18.length) break;
					_ref35 = _iterator18[_i24++];
				} else {
					_i24 = _iterator18.next();
					if (_i24.done) break;
					_ref35 = _i24.value;
				}

				var image = _ref35;

				if (!(image instanceof Attachment)) {
					continue;
				}
				if (weightVals) {
					var w = image.weight;
					var hide = void 0;
					switch (compareRule) {
						case 0:
							hide = w >= weightVals[0] && w <= weightVals[1];break;
						case 1:
							hide = w < weightVals[0];break;
						case 2:
							hide = w > weightVals[0];break;
					}
					if (!hide) {
						continue;
					} else if (!sizeVals) {
						return true;
					}
				}
				if (sizeVals) {
					var _w = image.width;
					var h = image.height;
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
			return false;
		},
		_sage: function _sage(val) {
			return this._post.sage;
		},
		_op: function _op(val) {
			return this._post.isOp;
		},
		_tlen: function _tlen(val) {
			var text = this._post.text.replace(/\s+(?=\s)|\n/g, '');
			return !val ? !!text : this._tlenNum_helper(val, text.length);
		},
		_all: function _all(val) {
			return true;
		},
		_video: function _video(val) {
			return this._videoVauthor(val, false);
		},
		_wipe: function _wipe(val) {
			var arr = void 0,
			    len = void 0,
			    x = void 0,
			    txt = this._post.text;
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
				arr = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
				if ((len = arr.length) > 3) {
					arr.sort();
					var keys = 0;
					for (var _i25 = 0, _n = len / 4, pop = 0; _i25 < len; keys++) {
						x = arr[_i25];
						var _j2 = 0;
						while (arr[_i25++] === x) {
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
				arr = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
				if (arr[0].length > 50 || (len = arr.length) > 1 && arr.join('').length / len > 10) {
					this._wipeMsg = [4, null];
					return true;
				}
			}
			if (val & 8) {
				var _txt = txt.replace(/\s+/g, '');
				if ((len = _txt.length) > 30 && (x = _txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length / len) > 0.4) {
					this._wipeMsg = [8, (x * 100).toFixed(0) + '%'];
					return true;
				}
			}
			if (val & 16) {
				arr = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
				if ((len = arr.length) > 4) {
					var _n2 = 0;
					var capsw = 0;
					var casew = 0;
					for (var _i26 = 0; _i26 < len; _i26++) {
						x = arr[_i26];
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
		},
		_num: function _num(val) {
			return this._tlenNum_helper(val, this._post.count + 1);
		},
		_tlenNum_helper: function _tlenNum_helper(val, num) {
			var i, arr;
			for (arr = val[0], i = arr.length - 1; i >= 0; --i) {
				if (arr[i] === num) {
					return true;
				}
			}
			for (arr = val[1], i = arr.length - 1; i >= 0; --i) {
				if (num >= arr[i][0] && num <= arr[i][1]) {
					return true;
				}
			}
			return false;
		},
		_vauthor: function _vauthor(val) {
			return this._videoVauthor(val, true);
		},
		_videoVauthor: function _videoVauthor(val, isAuthorSpell) {
			var videos = this._post.videos;
			if (!val) {
				return !!videos.hasLinks;
			}
			if (!videos.hasLinks || !Cfg.YTubeTitles) {
				return false;
			}
			for (var _iterator19 = videos.vData, _isArray19 = Array.isArray(_iterator19), _i27 = 0, _iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();;) {
				var _ref36;

				if (_isArray19) {
					if (_i27 >= _iterator19.length) break;
					_ref36 = _iterator19[_i27++];
				} else {
					_i27 = _iterator19.next();
					if (_i27.done) break;
					_ref36 = _i27.value;
				}

				var siteData = _ref36;

				for (var _iterator20 = siteData, _isArray20 = Array.isArray(_iterator20), _i28 = 0, _iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();;) {
					var _ref37;

					if (_isArray20) {
						if (_i28 >= _iterator20.length) break;
						_ref37 = _iterator20[_i28++];
					} else {
						_i28 = _iterator20.next();
						if (_i28.done) break;
						_ref37 = _i28.value;
					}

					var data = _ref37;

					if (isAuthorSpell ? val === data[1] : val.test(data[0])) {
						return true;
					}
				}
			}
			if (videos.linksCount === videos.loadedLinksCount) {
				return false;
			}
			return new Promise(function (resolve, reject) {
				videos.titleLoadFn = function (data) {
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
	};


	function PostForm(form) {
		var _this22 = this;

		var oeForm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var ignoreForm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		if (!ignoreForm && !form) {
			if (this.oeForm) {
				ajaxLoad(aib.getThrUrl(aib.b, Thread.first.num), false).then(function (loadedDoc) {
					var form = $q(aib.qForm, loadedDoc);
					var oeForm = $q('form[name="oeform"], form[action*="paint"]', loadedDoc);
					pr = new PostForm(form && doc.adoptNode(form), oeForm && doc.adoptNode(oeForm), true);
				}, function () {
					pr = new PostForm(null, null, true);
				});
			} else {
				this.form = null;
			}
			return;
		}
		this.tNum = aib.t;
		this.form = form;
		this.oeForm = oeForm || $q('form[name="oeform"], form[action*="paint"]');
		this.txta = $q('tr:not([style*="none"]) textarea:not([style*="display:none"])', form);
		this.subm = $q('tr input[type="submit"]', form);
		var fileEl = $q('tr input[type="file"]', form);
		if (fileEl) {
			if (aib.fixFileInputs) {
				aib.fixFileInputs($parent(fileEl, 'TD'));
			}
			this.files = new Files(this, $q('tr input[type="file"]', form));
			window.addEventListener('load', function () {
				return setTimeout(function () {
					if (!_this22.files.filesCount) {
						_this22.files.clear();
					}
				}, 0);
			});
		}
		this.name = $q(aib.qFormName, form);
		this.mail = $q(aib.qFormMail, form);
		this.subj = $q(aib.qFormSubj, form);
		this.passw = $q(aib.qFormPassw, form);
		this.rules = $q(aib.qFormRules, form);
		this.video = $q('tr input[name="video"], tr input[name="embed"]', form);
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
			return _this22.showMainReply(false, e);
		};
		this._pBtn[1].firstElementChild.onclick = function (e) {
			return _this22.showMainReply(true, e);
		};
		this.qArea = $add('<div style="display: none; ' + Cfg.replyWinX + '; ' + Cfg.replyWinY + '; z-index: ' + ++topWinZ + ';" id="de-win-reply" class="' + aib.cReply + (Cfg.replyWinDrag ? ' de-win' : ' de-win-inpost') + '"></div>');
		this.isBottom = Cfg.addPostForm === 1;
		this.setReply(false, !aib.t || Cfg.addPostForm > 1);
		makeDraggable('reply', this.qArea, $aBegin(this.qArea, '<div class="de-win-head">\n\t\t<span class="de-win-title"></span>\n\t\t<span class="de-win-buttons">\n\t\t\t<svg class="de-btn-clear"><use xlink:href="#de-symbol-unavail"/></svg>\n\t\t\t<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>\n\t\t\t<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>\n\t\t</span>\n\t</div>\n\t<div class="de-resizer de-resizer-top"></div>\n\t<div class="de-resizer de-resizer-left"></div>\n\t<div class="de-resizer de-resizer-right"></div>\n\t<div class="de-resizer de-resizer-bottom"></div>'));
		var el = $q('.de-win-buttons', this.qArea);
		el.onmouseover = function (e) {
			switch (fixEventEl(e.target).classList[0]) {
				case 'de-btn-clear':
					this.title = Lng.clearForm[lang];break;
				case 'de-btn-close':
					this.title = Lng.closeReply[lang];break;
				case 'de-btn-toggle':
					this.title = Cfg.replyWinDrag ? Lng.underPost[lang] : Lng.makeDrag[lang];
			}
		};
		(el = el.firstElementChild).onclick = function () {
			saveCfg('sageReply', 0);
			_this22._setSage();
			_this22.files.clear();
			[_this22.txta, _this22.name, _this22.mail, _this22.subj, _this22.video, _this22.cap && _this22.cap.textEl].forEach(function (node) {
				if (node) {
					node.value = '';
				}
			});
		};
		(el = el.nextElementSibling).onclick = function () {
			toggleCfg('replyWinDrag');
			if (Cfg.replyWinDrag) {
				_this22.qArea.className = aib.cReply + ' de-win';
				updateWinZ(_this22.qArea.style);
			} else {
				_this22.qArea.className = aib.cReply + ' de-win-inpost';
				_this22.txta.focus();
			}
		};
		el.nextElementSibling.onclick = function () {
			return _this22.closeReply();
		};
		if (!this.form || !this.txta) {
			return;
		}
		new WinResizer('reply', 'top', 'textaHeight', this.qArea, this.txta);
		new WinResizer('reply', 'left', 'textaWidth', this.qArea, this.txta);
		new WinResizer('reply', 'right', 'textaWidth', this.qArea, this.txta);
		new WinResizer('reply', 'bottom', 'textaHeight', this.qArea, this.txta);
		if (!aib.kus && (aib.multiFile || Cfg.fileInputs !== 2)) {
			this.setPlaceholders();
		}
		this.form.style.display = 'inline-block';
		this.form.style.textAlign = 'left';
		if (nav.Firefox) {
			this.txta.addEventListener('mouseup', function () {
				saveCfg('textaWidth', parseInt(this.style.width, 10));
				saveCfg('textaHeight', parseInt(this.style.height, 10));
			});
		} else {
			$aEnd(this.txta, '<div id="de-resizer-text"></div>').addEventListener('mousedown', {
				_el: this.txta,
				_elStyle: this.txta.style,
				handleEvent: function handleEvent(e) {
					switch (e.type) {
						case 'mousedown':
							docBody.addEventListener('mousemove', this);
							docBody.addEventListener('mouseup', this);
							$pd(e);
							return;
						case 'mousemove':
							var cr = this._el.getBoundingClientRect();
							this._elStyle.width = e.clientX - cr.left + 'px';
							this._elStyle.height = e.clientY - cr.top + 'px';
							return;
						default:
							docBody.removeEventListener('mousemove', this);
							docBody.removeEventListener('mouseup', this);
							saveCfg('textaWidth', parseInt(this._elStyle.width, 10));
							saveCfg('textaHeight', parseInt(this._elStyle.height, 10));
					}
				}
			});
		}
		if (Cfg.addSageBtn && this.mail) {
			PostForm.hideField($parent(this.mail, 'LABEL') || this.mail);
			$aEnd(this.subm, '<svg id="de-sagebtn" class="de-btn-sage">' + '<use xlink:href="#de-symbol-post-sage"/></svg>').onclick = function (e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('sageReply');
				_this22._setSage();
			};
			setTimeout(function () {
				return _this22._setSage();
			}, 0);
		}
		this.addTextPanel();
		this.txta.classList.add('de-textarea');
		this.txta.style.cssText = 'width: ' + Cfg.textaWidth + 'px; height: ' + Cfg.textaHeight + 'px;';
		this.txta.addEventListener('keypress', function (e) {
			var code = e.charCode || e.keyCode;
			if ((code === 33 || code === 34) && e.which === 0) {
				e.target.blur();
				window.focus();
			}
		});
		if (aib.dobr) {
			this.txta.removeAttribute('id');
		}
		if (!aib.tiny) {
			this.subm.value = Lng.reply[lang];
		}
		this.subm.addEventListener('click', function (e) {
			if (Cfg.warnSubjTrip && _this22.subj && /#.|##./.test(_this22.subj.value)) {
				$pd(e);
				$popup('upload', Lng.subjHasTrip[lang]);
				return;
			}
			var val = _this22.txta.value;
			if (Spells.outreps) {
				val = Spells.outReplace(val);
			}
			if (_this22.tNum && pByNum.get(_this22.tNum).subj === 'Dollchan Extension Tools') {
				var temp = '\n\n' + _this22._wrapText(aib.markupTags[5], '-'.repeat(50) + '\n' + nav.ua + '\nv' + version + '.' + commit + (nav.isESNext ? '.es6' : '') + ' [' + nav.scriptInstall + ']')[1];
				if (!val.includes(temp)) {
					val += temp;
				}
			}
			_this22.txta.value = val;
			if (Cfg.ajaxPosting) {
				$popup('upload', Lng.checking[lang], true);
			}
			if (_this22.video && (val = _this22.video.value) && (val = val.match(Videos.ytReg))) {
				_this22.video.value = 'http://www.youtube.com/watch?v=' + val[1];
			}
			if (_this22.isQuick) {
				$hide(_this22.pForm);
				$hide(_this22.qArea);
				$after(_this22._pBtn[+_this22.isBottom], _this22.pForm);
			}
			updater.pause();
		});
		if (Cfg.noPassword && (el = this.passw)) {
			$hide($parent(el, 'TR'));
		}
		if (Cfg.noName && (el = this.name)) {
			PostForm.hideField(el);
		}
		if (Cfg.noSubj && (el = this.subj)) {
			PostForm.hideField(el);
		}
		window.addEventListener('load', function () {
			if (Cfg.userName && _this22.name) {
				setTimeout(PostForm.setUserName, 1e3);
			}
			if (_this22.passw) {
				setTimeout(PostForm.setUserPassw, 1e3);
			}
		});
		var capEl = $q('input[type="text"][name*="aptcha"], *[id*="captcha"], *[class*="captcha"]', form);
		if (capEl) {
			this.cap = new Captcha(capEl, this.tNum);
			var updCapFn = function updCapFn() {
				_this22.cap.addCaptcha();
				_this22.cap.updOutdated();
			};
			this.txta.addEventListener('focus', updCapFn);
			if (this.files) {
				this.files.onchange = updCapFn;
			}
			this.form.addEventListener('click', function () {
				return _this22.cap.addCaptcha();
			}, true);
		} else {
			this.cap = null;
		}
		if (Cfg.ajaxPosting) {
			if (aib.qFormRedir && (el = $q(aib.qFormRedir, form))) {
				aib.disableRedirection(el);
			}
			this.form.onsubmit = function (e) {
				$pd(e);
				$popup('upload', Lng.sending[lang], true);
				html5Submit(_this22.form, _this22.subm, true).then(checkUpload)['catch'](function (e) {
					return $popup('upload', getErrorMessage(e));
				});
			};
		}
	}
	PostForm.hideField = function (el) {
		var next = el.nextElementSibling;
		$toggle(next && next.style.display !== 'none' || el.previousElementSibling ? el : $parent(el, 'TR'));
	};
	PostForm.setUserName = function () {
		var el = $q('input[info="nameValue"]');
		if (el) {
			saveCfg('nameValue', el.value);
		}
		pr.name.value = Cfg.userName ? Cfg.nameValue : '';
	};
	PostForm.setUserPassw = function () {
		var el = $q('input[info="passwValue"]');
		if (el) {
			saveCfg('passwValue', el.value);
		}
		var value = pr.passw.value = Cfg.passwValue;
		for (var _iterator21 = DelForm, _isArray21 = Array.isArray(_iterator21), _i29 = 0, _iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();;) {
			var _ref38;

			if (_isArray21) {
				if (_i29 >= _iterator21.length) break;
				_ref38 = _iterator21[_i29++];
			} else {
				_i29 = _iterator21.next();
				if (_i29.done) break;
				_ref38 = _i29.value;
			}

			var form = _ref38;

			(form.passEl || {}).value = value;
		}
	};
	PostForm.prototype = {
		isHidden: false,
		isQuick: false,
		isBottom: false,
		lastQuickPNum: -1,
		pForm: null,
		pArea: [],
		qArea: null,
		addTextPanel: function addTextPanel() {
			var id,
			    val,
			    btns,
			    html = '',
			    tPanel = $id('de-txt-panel');
			if (!Cfg.addTextBtns || aib.fch && !$q('input[type="checkbox"][name="spoiler"]', this.form)) {
				$del(tPanel);
				return;
			}
			if (!tPanel) {
				tPanel = $add('<span id="de-txt-panel"></span>');
				tPanel.addEventListener('click', this);
				tPanel.addEventListener('mouseover', this);
			}
			tPanel.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
			$after(Cfg.txtBtnsLoc ? $id('de-resizer-text') || this.txta : this.subm, tPanel);
			id = ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub'];
			val = ['B', 'i', 'U', 'S', '%', 'C', 'v', '^'];
			btns = aib.markupTags;
			for (var i = 0, len = btns.length; i < len; ++i) {
				if (btns[i] === '') {
					continue;
				}
				html += '<div id="de-btn-' + id[i] + '" de-title="' + Lng.txtBtn[i][lang] + '" de-tag="' + btns[i] + '">' + (Cfg.addTextBtns === 2 ? (html === '' ? '[ ' : '') + '<a class="de-abtn" href="#">' + val[i] + '</a> / ' : Cfg.addTextBtns === 3 ? '<button type="button" style="font-weight: bold;">' + val[i] + '</button>' : '<svg><use xlink:href="#de-symbol-markup-' + id[i] + '"/></svg>') + '</div>';
			}
			tPanel.innerHTML = html + ('<div id="de-btn-quote" de-title="' + Lng.txtBtn[8][lang] + '" de-tag="q">' + (Cfg.addTextBtns === 2 ? '<a class="de-abtn" href="#">&gt;</a> ]' : Cfg.addTextBtns === 3 ? '<button type="button" style="font-weight: bold;">&gt;</button>' : '<svg><use xlink:href="#de-symbol-markup-quote"/></svg>') + '</span>');
		},
		clearForm: function clearForm() {
			if (this.txta) {
				this.txta.value = '';
			}
			if (this.files) {
				this.files.clear();
			}
			if (this.video) {
				this.video.value = '';
			}
		},
		handleEvent: function handleEvent(e) {
			var id,
			    el = e.target;
			if (el.tagName !== 'SPAN') {
				el = el.parentNode;
			}
			id = el.id;
			if (id.startsWith('de-btn')) {
				var x;
				if (e.type === 'mouseover') {
					if (id === 'de-btn-quote') {
						quotetxt = window.getSelection().toString();
					}
					x = -1;
					if (HotKeys.enabled) {
						switch (id.substr(7)) {
							case 'bold':
								x = 12;break;
							case 'italic':
								x = 13;break;
							case 'strike':
								x = 14;break;
							case 'spoil':
								x = 15;break;
							case 'code':
								x = 16;
						}
					}
					KeyEditListener.setTitle(el, x);
					return;
				}
				x = pr.txta;
				var start = x.selectionStart,
				    end = x.selectionEnd,
				    q = Cfg.spacedQuote ? '> ' : '>';
				if (id === 'de-btn-quote') {
					$txtInsert(x, q + (start === end ? quotetxt : x.value.substring(start, end)).replace(/\n/gm, '\n' + q));
					quotetxt = '';
				} else {
					var scrtop = x.scrollTop,
					    val = this._wrapText(el.getAttribute('de-tag'), x.value.substring(start, end)),
					    len = start + val[0];
					x.value = x.value.substr(0, start) + val[1] + x.value.substr(end);
					x.setSelectionRange(len, len);
					x.focus();
					x.scrollTop = scrtop;
				}
				$pd(e);
				e.stopPropagation();
			}
		},

		get isVisible() {
			if (!this.isHidden && this.isBottom && $q(':focus', this.pForm)) {
				var cr = this.pForm.getBoundingClientRect();
				return cr.bottom > 0 && cr.top < nav.viewportHeight();
			}
			return false;
		},
		get top() {
			return this.pForm.getBoundingClientRect().top;
		},
		showQuickReply: function showQuickReply(post, pNum, closeReply, isNumClick) {
			if (!this.isQuick) {
				this.isQuick = true;
				this.setReply(true, false);
				$q('a', this._pBtn[+this.isBottom]).className = 'de-abtn de-parea-btn-' + (aib.t ? 'reply' : 'thr');
			} else if (closeReply && !quotetxt && post.wrap.nextElementSibling === this.qArea) {
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
			var temp = this.txta.value;
			if (!Cfg.addOPLink && !aib.t && post.isOp && !isNumClick) {
				this.txta.focus();
			} else {
				var isOnNewLine = temp === '' || temp.slice(-1) === '\n';
				$txtInsert(this.txta, (isNumClick ? '>>' + pNum + (isOnNewLine ? '\n' : '') : (isOnNewLine ? '' : '\n') + (this.lastQuickPNum === pNum && temp.includes('>>' + pNum) ? '' : '>>' + pNum + '\n')) + (quotetxt ? quotetxt.replace(/^\n|\n$/g, '').replace(/(^|\n)(.)/gm, '$1>' + (Cfg.spacedQuote ? ' ' : '') + '$2') + '\n' : ''));
			}
			temp = pByNum.get(pNum).thr.op.title.trim();
			if (temp.length > 27) {
				temp = temp.substr(0, 30) + '\u2026';
			}
			$q('.de-win-title', this.qArea).textContent = temp || '#' + pNum;
			this.lastQuickPNum = pNum;
		},
		showMainReply: function showMainReply(isBottom, evt) {
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
			if (evt) {
				$pd(evt);
			}
		},
		closeReply: function closeReply() {
			if (this.isQuick) {
				this.isQuick = false;
				this.lastQuickPNum = -1;
				if (!aib.t) {
					this._toggleQuickReply(false);
				}
				this.setReply(false, !aib.t || Cfg.addPostForm > 1);
			}
		},
		refreshCap: function refreshCap() {
			var isErr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			if (this.cap) {
				this.cap.refreshCaptcha(isErr, isErr, this.tNum);
			}
		},
		setReply: function setReply(isQuick, needToHide) {
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
		},
		setPlaceholders: function setPlaceholders() {
			this._setPlaceholder('name');
			this._setPlaceholder('subj');
			this._setPlaceholder('mail');
			this._setPlaceholder('video');
			if (this.cap) {
				this._setPlaceholder('cap');
			}
		},
		updatePAreaBtns: function updatePAreaBtns() {
			var txt = 'de-abtn de-parea-btn-',
			    rep = aib.t ? 'reply' : 'thr';
			$q('a', this._pBtn[+this.isBottom]).className = txt + (!this.pForm.style.display ? 'close' : rep);
			$q('a', this._pBtn[+!this.isBottom]).className = txt + rep;
		},


		_pBtn: [],
		_setSage: function _setSage() {
			var el = $id('de-sagebtn'),
			    c = Cfg.sageReply;
			el.style.opacity = c ? '1' : '.3';
			el.title = c ? 'SAGE!' : Lng.noSage[lang];
			if (this.mail.type === 'text') {
				this.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
			} else {
				this.mail.checked = c;
			}
		},
		_toggleQuickReply: function _toggleQuickReply(tNum) {
			if (this.oeForm) {
				$del($q('input[name="oek_parent"]', this.oeForm));
				if (tNum) {
					this.oeForm.insertAdjacentHTML('afterbegin', '<input type="hidden" value="' + tNum + '" name="oek_parent">');
				}
			}
			if (this.form) {
				if (aib.tiny) {
					if (tNum) {
						$del($q('input[name="page"]', this.form));
					} else if (!$q('input[name="page"]', this.form)) {
						$q('input[name="board"]', this.form).insertAdjacentHTML('afterend', '<input name="page" value="1" type="hidden">');
					}
				}
				$del($q('input[name="' + aib.formParent + '"]', this.form));
				if (tNum) {
					this.form.insertAdjacentHTML('afterbegin', '<input type="hidden" name="' + aib.formParent + '" value="' + tNum + '">');
				}
			}
		},
		_setPlaceholder: function _setPlaceholder(val) {
			var el = val === 'cap' ? this.cap.textEl : this[val];
			if (el) {
				if (aib.multiFile || Cfg.fileInputs !== 2) {
					el.placeholder = Lng[val][lang];
				} else {
					el.removeAttribute('placeholder');
				}
			}
		},
		_wrapText: function _wrapText(tag, text) {
			var m,
			    isBB = aib.markupBB;
			if (tag.startsWith('[')) {
				tag = tag.substr(1);
				isBB = true;
			}
			if (isBB) {
				var str;
				if (text.includes('\n')) {
					str = '[' + tag + ']' + text + '[/' + tag + ']';
					return [str.length, str];
				}
				m = text.match(/^(\s*)(.*?)(\s*)$/);
				str = m[1] + '[' + tag + ']' + m[2] + '[/' + tag + ']' + m[3];
				return [!m[2].length ? m[1].length + tag.length + 2 : str.length, str];
			}
			var rv = '',
			    i = 0,
			    arr = text.split('\n');
			for (var len = arr.length; i < len; ++i) {
				m = arr[i].match(/^(\s*)(.*?)(\s*)$/);
				rv += '\n' + m[1] + (tag === '^H' ? m[2] + '^H'.repeat(m[2].length) : tag + m[2] + tag) + m[3];
			}
			return [i === 1 && !m[2].length && tag !== '^H' ? m[1].length + tag.length : rv.length - 1, rv.slice(1)];
		}
	};


	function getSubmitError(dc) {
		if (!dc.body.hasChildNodes() || $q(aib.qDForm, dc)) {
			return null;
		}
		var err = '',
		    els = $Q(aib.qError, dc);
		for (var i = 0, len = els.length; i < len; ++i) {
			err += els[i].innerHTML + '\n';
		}
		err = err.replace(/<a [^>]+>Назад.+|<br.+/, '') || Lng.error[lang] + ':\n' + dc.body.innerHTML;
		return (/successful|uploaded|updating|post deleted|обновл|удален[о\.]/i.test(err) ? null : err
		);
	}

	function getUploadFunc() {
		$popup('upload', Lng.sending[lang] + '<br><progress id="de-uploadprogress" value="0" max="1" style="display: none; width: 200px;">' + '</progress><div style="display: none; font: bold 12px arial;">' + '<span></span> / <span></span> (<span></span>)</div>', true);
		var inited = false;
		var beginTime = Date.now();
		var progress = $id('de-uploadprogress');
		var counterWrap = progress.nextElementSibling;

		var _Array$from = Array.from(counterWrap.children),
		    _Array$from2 = _slicedToArray(_Array$from, 3),
		    counterEl = _Array$from2[0],
		    totalEl = _Array$from2[1],
		    speedEl = _Array$from2[2];

		return function (data) {
			if (!inited) {
				progress.setAttribute('max', data.total);
				$show(progress);
				totalEl.textContent = prettifySize(data.total);
				$show(counterWrap);
				inited = true;
			}
			progress.value = data.loaded;
			counterEl.textContent = prettifySize(data.loaded);
			speedEl.textContent = prettifySize(data.loaded / (Date.now() - beginTime) * 1e3) + '/' + Lng.second[lang];
		};
	}

	function checkUpload(data) {
		var error = null,
		    postNum = null,
		    isDocument = data instanceof HTMLDocument;
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
						updater['continue']();
					});
					return;
				}
				try {
					data = JSON.parse(isDocument ? data.body.textContent : data);
				} catch (e) {
					error = getErrorMessage(e);
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
			updater['continue']();
			DollchanAPI.notify('submitform', { success: false, error: error });
			return;
		}
		var tNum = pr.tNum;
		if ((Cfg.markMyPosts || Cfg.markMyLinks) && postNum) {
			MyPosts.set(postNum, tNum || postNum);
		}
		if (Cfg.favOnReply && tNum && !$q('.de-btn-fav-sel', pByNum.get(tNum).el)) {
			pByNum.get(tNum).thr.setFavorState(true, 'onreply');
		}
		pr.clearForm();
		DollchanAPI.notify('submitform', { success: true, num: postNum });
		Cfg.stats[tNum ? 'reply' : 'op']++;
		saveCfgObj(aib.dm, Cfg);
		if (!tNum) {
			if (postNum) {
				window.location = aib.getThrUrl(aib.b, postNum);
			} else if (isDocument) {
				var dForm = $q(aib.qDForm, data);
				if (dForm) {
					window.location = aib.getThrUrl(aib.b, aib.getTNum(dForm));
				}
			}
			return;
		}
		if (aib.t) {
			Post.clearMarks();
			Thread.first.loadNewPosts().then(function () {
				return AjaxError.Success;
			}, function (e) {
				return e;
			}).then(function (e) {
				infoLoadErrors(e);
				if (Cfg.scrAfterRep) {
					scrollTo(0, window.pageYOffset + Thread.first.last.el.getBoundingClientRect().top);
				}
				updater['continue'](true);
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

	function checkDelete(data) {
		var err, els, threads, isThr, i, len, el;
		return regeneratorRuntime.async(function checkDelete$(_context14) {
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
						return regeneratorRuntime.awrap(Thread.first.loadNewPosts());

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
						return regeneratorRuntime.awrap(Promise.all(Array.from(threads).map(function (thr) {
							return thr.loadPosts(visPosts, false, false);
						})));

					case 23:
						$popup('delete', Lng.succDeleted[lang]);

					case 24:
					case 'end':
						return _context14.stop();
				}
			}
		}, null, this, [[11, 16]]);
	}

	function html5Submit(form, submitter) {
		var needProgress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		var formData, hasFiles, _iterator22, _isArray22, _i30, _ref39, _ref40, name, value, type, el, fileName, newFileName, _data5, ajaxParams, xhr;

		return regeneratorRuntime.async(function html5Submit$(_context15) {
			while (1) {
				switch (_context15.prev = _context15.next) {
					case 0:
						formData = new FormData();
						hasFiles = false;
						_iterator22 = getFormElements(form, submitter), _isArray22 = Array.isArray(_iterator22), _i30 = 0, _iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();

					case 3:
						if (!_isArray22) {
							_context15.next = 9;
							break;
						}

						if (!(_i30 >= _iterator22.length)) {
							_context15.next = 6;
							break;
						}

						return _context15.abrupt('break', 35);

					case 6:
						_ref39 = _iterator22[_i30++];
						_context15.next = 13;
						break;

					case 9:
						_i30 = _iterator22.next();

						if (!_i30.done) {
							_context15.next = 12;
							break;
						}

						return _context15.abrupt('break', 35);

					case 12:
						_ref39 = _i30.value;

					case 13:
						_ref40 = _ref39, name = _ref40.name, value = _ref40.value, type = _ref40.type, el = _ref40.el;

						if (!(name === 'de-file-txt')) {
							_context15.next = 16;
							break;
						}

						return _context15.abrupt('continue', 33);

					case 16:
						if (!(type === 'file')) {
							_context15.next = 32;
							break;
						}

						hasFiles = true;
						fileName = value.name;
						newFileName = Cfg.removeFName ? ' ' + fileName.substring(fileName.lastIndexOf('.')) : fileName;

						if (!((Cfg.postSameImg || Cfg.removeEXIF) && (value.type === 'image/jpeg' || value.type === 'image/png' || value.type === 'video/webm' && !aib.mak))) {
							_context15.next = 31;
							break;
						}

						_context15.next = 23;
						return regeneratorRuntime.awrap(readFile(value));

					case 23:
						_context15.t0 = _context15.sent.data;
						_context15.t1 = el.obj ? el.obj.extraFile : null;
						_data5 = cleanFile(_context15.t0, _context15.t1);

						if (_data5) {
							_context15.next = 28;
							break;
						}

						return _context15.abrupt('return', Promise.reject(Lng.fileCorrupt[lang] + ': ' + fileName));

					case 28:
						value = new File(_data5, newFileName);
						_context15.next = 32;
						break;

					case 31:
						if (Cfg.removeFName) {
							value = new File([value], newFileName);
						}

					case 32:
						formData.append(name, value);

					case 33:
						_context15.next = 3;
						break;

					case 35:
						ajaxParams = { method: 'POST', data: formData };

						if (needProgress && hasFiles) {
							ajaxParams.onprogress = getUploadFunc();
						}
						_context15.prev = 37;
						_context15.next = 40;
						return regeneratorRuntime.awrap($ajax(form.action, ajaxParams));

					case 40:
						xhr = _context15.sent;
						return _context15.abrupt('return', aib.jsonSubmit ? xhr.responseText : $DOM(xhr.responseText));

					case 44:
						_context15.prev = 44;
						_context15.t2 = _context15['catch'](37);
						return _context15.abrupt('return', Promise.reject(_context15.t2));

					case 47:
					case 'end':
						return _context15.stop();
				}
			}
		}, null, this, [[37, 44]]);
	}

	function readFile(file) {
		var asText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		return regeneratorRuntime.async(function readFile$(_context16) {
			while (1) {
				switch (_context16.prev = _context16.next) {
					case 0:
						return _context16.abrupt('return', new Promise(function (resolve, reject) {
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
		}, null, this);
	}

	function cleanFile(data, extraData) {
		var subarray = function subarray(begin, end) {
			return nav.getUnsafeUint8Array(data, begin, end - begin);
		};
		var i,
		    len,
		    val,
		    lIdx,
		    jpgDat,
		    img = nav.getUnsafeUint8Array(data),
		    rand = Cfg.postSameImg && String(Math.round(Math.random() * 1e6)),
		    rExif = !!Cfg.removeEXIF,
		    rv = extraData ? rand ? [img, extraData, rand] : [img, extraData] : rand ? [img, rand] : [img];
		if (!rand && !rExif && !extraData) {
			return rv;
		}
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
			for (i = 0, len = img.length - 7; i < len && (img[i] !== 0x49 || img[i + 1] !== 0x45 || img[i + 2] !== 0x4E || img[i + 3] !== 0x44); i++) {}
			i += 8;
			if (i !== len && (extraData || len - i <= 75)) {
				rv[0] = nav.getUnsafeUint8Array(data, 0, i);
			}
			return rv;
		}
		if (img[0] === 0x1a && img[1] === 0x45 && img[2] === 0xDF && img[3] === 0xA3) {
			return new _WebmParser(data).addData(rand).getData();
		}
		return null;
	}

	function readExif(data, off, len) {
		var i,
		    xRes = 0,
		    yRes = 0,
		    resT = 0,
		    dv = nav.getUnsafeDataView(data, off),
		    le = String.fromCharCode(dv.getUint8(0), dv.getUint8(1)) !== 'MM';
		if (dv.getUint16(2, le) !== 0x2A) {
			return null;
		}
		i = dv.getUint32(4, le);
		if (i > len) {
			return null;
		}
		for (var j = 0, tgLen = dv.getUint16(i, le); j < tgLen; j++) {
			var dE = i + 2 + 12 * j,
			    tag = dv.getUint16(dE, le);
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

	var _WebmParser = function WebmParser(data) {
		var EBMLId = 0x1A45DFA3,
		    segmentId = 0x18538067,
		    voidId = 0xEC;
		function WebmElement(elData, dataLength, offset) {
			if (offset + 4 >= dataLength) {
				return;
			}
			var num = elData.getUint32(offset),
			    leadZeroes = Math.clz32(num);
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
		}
		WebmElement.prototype = {
			error: false,
			id: 0
		};

		function Parser(data) {
			var dv = nav.getUnsafeDataView(data),
			    len = dv.byteLength,
			    el = new WebmElement(dv, len, 0),
			    offset = 0,
			    voids = [];
			error: do {
				if (el.error || el.id !== EBMLId) {
					break;
				}
				this.EBML = el;
				offset += el.headSize + el.size;
				while (true) {
					el = new WebmElement(dv, len, offset);
					if (el.error) {
						break error;
					}
					if (el.id === segmentId) {
						this.segment = el;
						break; 
					} else if (el.id === voidId) {
						voids.push(el);
					} else {
						break error;
					}
					offset += el.headSize + el.size;
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
		Parser.prototype = {
			addData: function addData(data) {
				if (this.error || !data) {
					return this;
				}
				var size = typeof data === 'string' ? data.length : data.byteLength;
				if (size > 127) {
					this.error = true;
					return;
				}
				this.rv.push(new Uint8Array([voidId, 0x80 | size]), data);
				return this;
			},
			getData: function getData() {
				if (this.error) {
					return null;
				}
				this.rv[0] = nav.getUnsafeUint8Array(this.data, 0, this.segment.endOffset);
				return this.rv;
			}
		};

		_WebmParser = Parser;
		return new Parser(data);
	};


	var Files = function () {
		function Files(form, fileEl) {
			_classCallCheck(this, Files);

			this.filesCount = 0;
			this.fileTd = $parent(fileEl, 'TD');
			this.onchange = null;
			this._form = form;
			var inputs = [];
			var els = $Q('input[type="file"]', this.fileTd);
			for (var i = 0, len = els.length; i < len; ++i) {
				inputs.push(new FileInput(this, els[i]));
			}
			this._inputs = inputs;
			this._files = [];
			this.hide();
		}

		_createClass(Files, [{
			key: 'changeMode',
			value: function changeMode() {
				var cfg = Cfg.fileInputs === 2 && Cfg.ajaxPosting;
				for (var _iterator23 = this._inputs, _isArray23 = Array.isArray(_iterator23), _i31 = 0, _iterator23 = _isArray23 ? _iterator23 : _iterator23[Symbol.iterator]();;) {
					var _ref41;

					if (_isArray23) {
						if (_i31 >= _iterator23.length) break;
						_ref41 = _iterator23[_i31++];
					} else {
						_i31 = _iterator23.next();
						if (_i31.done) break;
						_ref41 = _i31.value;
					}

					var inp = _ref41;

					inp.changeMode(cfg);
				}
				this.hide();
			}
		}, {
			key: 'clear',
			value: function clear() {
				for (var _iterator24 = this._inputs, _isArray24 = Array.isArray(_iterator24), _i32 = 0, _iterator24 = _isArray24 ? _iterator24 : _iterator24[Symbol.iterator]();;) {
					var _ref42;

					if (_isArray24) {
						if (_i32 >= _iterator24.length) break;
						_ref42 = _iterator24[_i32++];
					} else {
						_i32 = _iterator24.next();
						if (_i32.done) break;
						_ref42 = _i32.value;
					}

					var inp = _ref42;

					inp.clear();
				}
				this.hide();
			}
		}, {
			key: 'hide',
			value: function hide() {
				for (var _els2 = this._inputs, i = _els2.length - 1; i > 0; --i) {
					var inp = _els2[i];
					if (inp.hasFile) {
						break;
					} else if (_els2[i - 1].hasFile) {
						inp.show();
						break;
					}
					inp.hide();
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
					value = $add('<tr><td></td><td><div id="de-file-area"></div></td></tr>');
					$after(this.fileTd.parentNode, value);
				} else {
					value = $q(aib.tiny ? 'th' : 'td', $parent(this._form.txta, 'TR'));
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
			this._utils = $add('<div class="de-file-utils">\n\t\t\t<div class="de-file-btn-rar" title="' + Lng.helpAddFile[lang] + '" style="display: none;"></div>\n\t\t\t<input class="de-file-spoil" type="checkbox" title="' + Lng.spoilFile[lang] + '" style="display: none;">\n\t\t\t<div class="de-file-btn-txt" title="' + Lng.addManually[lang] + '"></div>\n\t\t\t<div class="de-file-btn-del" title="' + Lng.removeFile[lang] + '" style="display: none;"></div>\n\t\t</div>');

			var _Array$from3 = Array.from(this._utils.children);

			var _Array$from4 = _slicedToArray(_Array$from3, 4);

			this._btnRarJpg = _Array$from4[0];
			this._btnSpoil = _Array$from4[1];
			this._btnTxt = _Array$from4[2];
			this._btnDel = _Array$from4[3];

			this._utils.addEventListener('click', this);
			this._txtWrap = $add('<span class="de-file-txt-wrap">\n\t\t\t<input type="text" name="de-file-txt" class="de-file-txt-input de-file-txt-noedit" title="' + Lng.youCanDrag[lang] + '" placeholder="' + Lng.dropFileHere[lang] + '">\n\t\t\t<input type="button" class="de-file-txt-add" value="+" title="' + Lng.add[lang] + '" style="display: none;"></span>');

			var _Array$from5 = Array.from(this._txtWrap.children);

			var _Array$from6 = _slicedToArray(_Array$from5, 2);

			this._txtInput = _Array$from6[0];
			this._txtAddBtn = _Array$from6[1];

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
			if (this._isThumb) {
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
			key: 'clear',
			value: function clear() {
				if (this._isThumb) {
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
					if (this._isThumb) {
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
				var _this23 = this;

				var el = e.target;
				var isThumb = el === this._thumb || el.className === 'de-file-img';
				switch (e.type) {
					case 'change':
						setTimeout(function () {
							return _this23._onFileChange(false);
						}, 20);
						var index = this._parent._inputs.indexOf(this);
						if (el.files.length > 0) {
							this._parent._files[index] = el.files[0];
						} else {
							delete this._parent._files[index];
						}
						DollchanAPI.notify('filechange', this._parent._files);
						return;
					case 'click':
						if (isThumb) {
							this._input.click();
						} else if (el === this._btnDel) {
							this.clear();
							this._parent.hide();
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
							if (this._isThumb) {
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
							this._thumb.classList.add('de-file-drag');
						}
						return;
					case 'dragleave':
						if (isThumb && !this._thumb.contains(e.relatedTarget)) {
							this._thumb.classList.remove('de-file-drag');
						}
						return;
					case 'drop':
						var dt = e.dataTransfer;
						if (!isThumb && el !== this._txtInput) {
							return;
						}
						var filesLen = dt.files.length;
						if (filesLen) {
							var inpArray = this._parent._inputs;
							var inpLen = inpArray.length;
							for (var i = inpArray.indexOf(this), j = 0; i < inpLen && j < filesLen; ++i, ++j) {
								FileInput._readDroppedFile(inpArray[i], dt.files[j]);
								this._parent._files[i] = dt.files[j];
							}
							DollchanAPI.notify('filechange', this._parent._files);
						} else {
							this._addUrlFile(dt.getData('text/plain'));
						}
						setTimeout(function () {
							return _this23._thumb.classList.remove('de-file-drag');
						}, 10);
						e.stopPropagation();
						$pd(e);
				}
			}
		}, {
			key: 'hide',
			value: function hide() {
				if (this._isThumb) {
					this._showDelBtn(false);
					$hide(this._thumb);
					$hide(this._txtWrap);
				}
				$hide(this._wrap);
			}
		}, {
			key: 'show',
			value: function show() {
				if (this._isThumb) {
					$show(this._thumb);
				}
				$show(this._wrap);
			}
		}, {
			key: '_addNewThumb',
			value: function _addNewThumb(fileData, fileName, fileSize, fileType) {
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
				var _this24 = this;

				var el = this._parent.rarInput;
				el.onchange = function (e) {
					$hide(_this24._btnRarJpg);
					var myBtn = _this24._rarMsg = $aBegin(_this24._utils, '<span><svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg></span>');
					var file = e.target.files[0];
					readFile(file).then(function (_ref43) {
						var data = _ref43.data;

						if (_this24._rarMsg === myBtn) {
							myBtn.className = 'de-file-rarmsg';
							var origFileName = _this24.imgFile ? _this24.imgFile[1] : _this24._input.files[0].name;
							myBtn.title = origFileName + ' + ' + file.name;
							myBtn.textContent = origFileName.split('.').pop() + ' + ' + file.name.split('.').pop();
							_this24.extraFile = data;
						}
					});
				};
				el.click();
			}
		}, {
			key: '_addUrlFile',
			value: function _addUrlFile(url) {
				var _this25 = this;

				if (!url) {
					return;
				}
				$popup('file-loading', Lng.loading[lang], true);
				downloadImgData(url, false).then(function (data) {
					if (!data) {
						$popup('file-loading', Lng.cantLoad[lang] + ' URL: ' + url);
						return;
					}
					closePopup('file-loading');
					_this25._isTxtEditable = false;
					var name = url.split('/').pop();
					var ext = name.split('.').pop();
					if (!/^(jpe?g|png|gif|webm)$/.test(ext)) {
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
							url = name = name.split('?').shift() + '.' + ext;
						}
					}
					_this25.imgFile = [data.buffer, name, getFileType(url)];
					var file = new Blob([data], { type: _this25.imgFile[2] });
					file.name = name;
					_this25._parent._files[_this25._parent._inputs.indexOf(_this25)] = file;
					DollchanAPI.notify('filechange', _this25._parent._files);
					if (_this25._isThumb) {
						$hide(_this25._txtWrap);
					}
					_this25._onFileChange(true);
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
					this._showPviewImage();
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
				if (this._isThumb) {
					this._showPviewImage();
				}
				if (this.hasFile) {
					this.extraFile = null;
				} else {
					this.hasFile = true;
					this._changeFilesCount(+1);
					this._showDelBtn(true);
					$hide(this._txtAddBtn);
					if (this._isThumb) {
						$hide(this._txtWrap);
					}
					if (this._spoilEl) {
						this._btnSpoil.checked = this._spoilEl.checked;
						$show(this._btnSpoil);
					}
					this._txtInput.classList.add('de-file-txt-noedit');
					this._txtInput.placeholder = Lng.dropFileHere[lang];
				}
				this._parent.hide();
				if (!nav.Presto && !aib.fch && /^image\/(?:png|jpeg)$/.test(hasImgFile ? this.imgFile[2] : this._input.files[0].type)) {
					$del(this._rarMsg);
					$show(this._btnRarJpg);
				}
			}
		}, {
			key: '_removeFile',
			value: function _removeFile() {
				var oldEl = this._input;
				var newEl = $aEnd(oldEl, oldEl.outerHTML);
				oldEl.removeEventListener('change', this);
				newEl.addEventListener('change', this);
				newEl.obj = this;
				this._input = newEl;
				$del(oldEl);
				this.hasFile = false;
			}
		}, {
			key: '_showPviewImage',
			value: function _showPviewImage() {
				var _this26 = this;

				if (this.imgFile) {
					var _imgFile = _slicedToArray(this.imgFile, 3),
					    _data6 = _imgFile[0],
					    fileName = _imgFile[1],
					    fileType = _imgFile[2];

					this._addNewThumb(_data6, fileName, _data6.byteLength, fileType);
				} else {
					(function () {
						var file = _this26._input.files[0];
						if (file) {
							readFile(file).then(function (_ref44) {
								var data = _ref44.data;

								if (_this26._input.files[0] === file) {
									_this26._addNewThumb(data, file.name, file.size, file.type);
								}
							});
						}
					})();
				}
			}
		}, {
			key: '_showDelBtn',
			value: function _showDelBtn(isShow) {
				$toggle(this._btnDel, isShow);
				$toggle(this._btnTxt, !isShow);
			}
		}, {
			key: '_toggleDragEvents',
			value: function _toggleDragEvents(el, add) {
				var name = add ? 'addEventListener' : 'removeEventListener';
				el[name]('dragover', $pd);
				el[name]('dragenter', this);
				el[name]('dragleave', this);
				el[name]('drop', this);
			}
		}, {
			key: '_isThumb',
			get: function get() {
				return Cfg.fileInputs === 2 && Cfg.ajaxPosting;
			}
		}, {
			key: '_wrap',
			get: function get() {
				return aib.multiFile ? this._input.parentNode : this._input;
			}
		}], [{
			key: '_readDroppedFile',
			value: function _readDroppedFile(input, file) {
				readFile(file).then(function (_ref45) {
					var data = _ref45.data;

					input.imgFile = [data, file.name, file.type];
					input.show();
					input._onFileChange(true);
				});
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
			this.parentEl = el.tagName === 'TR' ? el : $parent(el, 'TR');
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
				var _this27 = this;

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
					var _el3 = $q('#g-recaptcha, .g-recaptcha' + (aib.fch ? ', #qrCaptchaContainerAlt' : ''));
					$replace(_el3, '<div id="g-recaptcha" class="g-recaptcha" data-sitekey="' + _el3.getAttribute('data-sitekey') + '"></div>');
				}
				var initPromise = aib.initCaptcha ? aib.initCaptcha(this) : null;
				if (initPromise) {
					initPromise.then(function () {
						return _this27.showCaptcha();
					}, function (e) {
						if (e instanceof AjaxError) {
							_this27._setUpdateError(e);
						} else {
							_this27.hasCaptcha = false;
						}
					});
				} else if (this.hasCaptcha) {
					this.showCaptcha(true);
				}
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				switch (e.type) {
					case 'keypress':
						if (!Cfg.captchaLang || e.which === 0) {
							return;
						}
						var ruUa = 'йцукенгшщзхъїфыівапролджэєячсмитьбюёґ';
						var en = 'qwertyuiop[]]assdfghjkl;\'\'zxcvbnm,.`\\';
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
					case 'focus':
						this.updOutdated();
				}
				$pd(e);
				e.stopPropagation();
			}
		}, {
			key: 'initImage',
			value: function initImage(img) {
				var _this28 = this;

				img.title = Lng.refresh[lang];
				img.alt = Lng.loading[lang];
				img.style.cssText = 'vertical-align: text-bottom; border: none; cursor: pointer;';
				img.onclick = function () {
					return _this28.refreshCaptcha(true);
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
				var _this29 = this;

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
							return _this29._updateTextEl(isFocus);
						}, function (e) {
							return _this29._setUpdateError(e);
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
					aib._capUpdPromise.cancel();
				}
				return aib._capUpdPromise = $ajax(url).then(function (xhr) {
					aib._capUpdPromise = null;
					fn(xhr);
				}, function (e) {
					if (!(e instanceof CancelError)) {
						aib._capUpdPromise = null;
						return CancelablePromise.reject(e);
					}
				});
			}
		}, {
			key: 'updOutdated',
			value: function updOutdated() {
				if (this._lastUpdate && Date.now() - this._lastUpdate > Cfg.capUpdTime * 1e3) {
					this.refreshCaptcha(false);
				}
			}
		}, {
			key: '_isOldRecap',
			value: function _isOldRecap() {
				return !!$id('recaptcha_widget_div') || aib.fch && Cfg.cap4chanAlt && pr.tNum;
			}
		}, {
			key: '_setUpdateError',
			value: function _setUpdateError(e) {
				var _this30 = this;

				if (e) {
					this.parentEl = e.toString();
					this.isAdded = false;
					this.parentEl.onclick = function () {
						_this30.parentEl.onclick = null;
						_this30.addCaptcha();
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
					(function () {
						var script = doc.createElement('script');
						script.type = 'text/javascript';
						script.src = aib.prot + '//www.google.com/recaptcha/api.js';
						doc.head.appendChild(script);
						setTimeout(function () {
							return $del(script);
						}, 1e5);
					})();
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

			this._hasEvents = false;
			this._linkDelay = 0;
			this._menu = null;
			this._menuDelay = 0;
			this.isOp = isOp;
			this.kid = null;
			this.num = num;
			this.ref = new RefMap(this);
			this.thr = thr;
		}

		_createClass(AbstractPost, [{
			key: 'addFuncs',
			value: function addFuncs() {
				RefMap.upd(this, true);
				embedMediaLinks(this);
				if (Cfg.addImgs) {
					embedImagesLinks(this.el);
				}
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(e) {
				var _this31 = this;

				var temp,
				    el = fixEventEl(e.target),
				    type = e.type,
				    isOutEvent = type === 'mouseout',
				    isPview = this instanceof Pview;
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
						this._menu.remove();
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
								} else if (Cfg.insertNum && pr.form && (aib.tiny ? el : temp) === this._pref && !/Reply|Ответ/.test(el.textContent)) {
									$pd(e);
									e.stopPropagation();
									if (!Cfg.showRepBtn) {
										quotetxt = window.getSelection().toString();
										pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
										quotetxt = '';
									} else if (pr.isQuick || aib.t && pr.isHidden) {
										pr.showQuickReply(isPview ? Pview.topParent : this, this.num, false, true);
									} else if (aib.t) {
										var formText = pr.txta.value,
										    isOnNewLine = formText === '' || formText.slice(-1) === '\n';
										$txtInsert(pr.txta, '>>' + this.num + (isOnNewLine ? '\n' : ''));
									} else {
										window.location = el.href.replace(/#i/, '#');
									}
								} else if ((temp = el.textContent)[0] === '>' && temp[1] === '>' && !temp[2].includes('\/')) {
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
									var vObject = this.videos;
									vObject.currentLink.classList.add('de-current');
									vObject.addPlayer(vObject.playerInfo, el.classList.contains('de-ytube'));
									$pd(e);
								}
							} else if (Cfg.expandImgs !== 0) {
								this._clickImage(el, e);
							}
							return;
						case 'OBJECT':
						case 'VIDEO':
							if (Cfg.expandImgs !== 0 && !(Cfg.webmControl && e.clientY > el.getBoundingClientRect().top + parseInt(el.style.height, 10) - 30)) {
								this._clickImage(el, e);
							}
							return;
					}
					if (aib.mak && el.classList.contains('expand-large-comment')) {
						this._getFullMsg(el, false);
						$pd(e);
						e.stopPropagation();
					}
					switch (el.classList[0]) {
						case 'de-btn-expthr':
							this.thr.loadPosts('all');
							return;
						case 'de-btn-fav':
							this.thr.setFavorState(true, 'user');return;
						case 'de-btn-fav-sel':
							this.thr.setFavorState(false, 'user');return;
						case 'de-btn-hide':
						case 'de-btn-hide-user':
						case 'de-btn-unhide':
						case 'de-btn-unhide-user':
							this.setUserVisib(!this.hidden);
							return;
						case 'de-btn-rep':
							pr.showQuickReply(isPview ? Pview.topParent : this, this.num, !isPview, false);
							quotetxt = '';
							return;
						case 'de-btn-sage':
							Spells.add(9, '', false);return;
						case 'de-btn-stick':
							this.setSticky(true);return;
						case 'de-btn-stick-on':
							this.setSticky(false);return;
					}
					return;
				}
				if (!isOutEvent && Cfg.expandImgs && el.tagName === 'IMG' && !el.classList.contains('de-img-full') && (temp = this.images.getImageByEl(el)) && (temp.isImage || temp.isVideo)) {
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
						this.btns.title = Lng.togglePost[lang];
						if (Cfg.menuHiddBtn && !(this instanceof Pview)) {
							this._addMenu(el, isOutEvent, this._getMenuHide(el));
						}
						return;
					case 'de-btn-expthr':
						this.btns.title = Lng.expandThr[lang];
						if (!(this instanceof Pview)) {
							this._addMenu(el, isOutEvent, $join(Lng.selExpandThr[lang], '<span class="de-menu-item" info="thr-exp">', '</span>'));
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
						this._addMenu(el, isOutEvent, this._getMenuImgSrc(el));return;
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
						if (Cfg.linksNavig) {
							if (isOutEvent) {
								clearTimeout(this._linkDelay);
								if (!(aib.getPostOfEl(fixEventEl(e.relatedTarget)) instanceof Pview) && Pview.top) {
									Pview.top.markToDel(); 
								} else if (this.kid) {
									this.kid.markToDel(); 
								}
							} else {
								this._linkDelay = setTimeout(function () {
									return _this31.kid = Pview.show(_this31, el);
								}, Cfg.linksOver);
							}
							$pd(e);
							e.stopPropagation();
						}
				}
			}
		}, {
			key: 'setFavBtn',
			value: function setFavBtn(state) {
				var el = $q(state ? '.de-btn-fav' : '.de-btn-fav-sel', this.btns);
				if (el) {
					el.setAttribute('class', state ? 'de-btn-fav-sel' : 'de-btn-fav');
				}
			}
		}, {
			key: 'updateMsg',
			value: function updateMsg(newMsg, sRunner) {
				var videoExt,
				    videoLinks,
				    origMsg = aib.dobr ? this.msg.firstElementChild : this.msg;
				if (Cfg.addYouTube) {
					videoExt = $q('.de-video-ext', origMsg);
					videoLinks = $Q(':not(.de-video-ext) > .de-video-link', origMsg);
				}
				$replace(origMsg, newMsg);
				Object.defineProperties(this, {
					'msg': { configurable: true, value: newMsg },
					'trunc': { configurable: true, value: null }
				});
				Post.content.remove(this);
				if (Cfg.addYouTube) {
					this.videos.updatePost(videoLinks, $Q('a[href*="youtu"], a[href*="vimeo.com"]', newMsg), false);
					if (videoExt) {
						newMsg.appendChild(videoExt);
					}
				}
				this.addFuncs();
				sRunner.run(this);
				closePopup('load-fullmsg');
			}
		}, {
			key: '_addMenu',
			value: function _addMenu(el, isOutEvent, html) {
				var _this32 = this;

				if (this.menu && this.menu.parentEl === el) {
					return;
				}
				if (isOutEvent) {
					clearTimeout(this._menuDelay);
				} else {
					this._menuDelay = setTimeout(function () {
						return _this32._showMenu(el, html);
					}, Cfg.linksOver);
				}
			}
		}, {
			key: '_clickImage',
			value: function _clickImage(el, e) {
				var data = this.images.getImageByEl(el);
				if (!data || !data.isImage && !data.isVideo) {
					return;
				}
				data.expand(Cfg.expandImgs === 1 ^ e.ctrlKey, e);
				$pd(e);
				e.stopPropagation();
			}
		}, {
			key: '_getFullMsg',
			value: function _getFullMsg(el, isInit) {
				var _this33 = this;

				if (aib.delTruncMsg) {
					aib.delTruncMsg(this, el, isInit);
					return;
				}
				if (!isInit) {
					$popup('load-fullmsg', Lng.loading[lang], true);
				}
				ajaxLoad(aib.getThrUrl(aib.b, this.tNum)).then(function (form) {
					var maybeSpells = new Maybe(SpellsRunner);
					if (_this33.isOp) {
						_this33.updateMsg(aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, form))), maybeSpells.value);
						$del(el);
					} else {
						var _els3 = $Q(aib.qRPost, form);
						for (var i = 0, len = _els3.length; i < len; i++) {
							if (_this33.num === aib.getPNum(_els3[i])) {
								_this33.updateMsg(aib.fixHTML(doc.adoptNode($q(aib.qPostMsg, _els3[i]))), maybeSpells.value);
								$del(el);
								break;
							}
						}
					}
					maybeSpells.end();
				}, emptyFn);
			}
		}, {
			key: '_getMenuImgSrc',
			value: function _getMenuImgSrc(el) {
				var link = el.nextSibling,
				    p = encodeURIComponent(link.getAttribute('de-href') || link.href) + '" target="_blank">' + Lng.searchIn[lang];
				return '<a class="de-menu-item de-src-google" href="https://www.google.com/searchbyimage?image_url=' + p + 'Google</a>' + '<a class="de-menu-item de-src-yandex" href="http://yandex.ru/images/search?rpt=imageview&img_url=' + p + 'Yandex</a>' + '<a class="de-menu-item de-src-tineye" href="http://tineye.com/search/?url=' + p + 'TinEye</a>' + '<a class="de-menu-item de-src-saucenao" href="http://saucenao.com/search.php?url=' + p + 'SauceNAO</a>' + '<a class="de-menu-item de-src-iqdb" href="http://iqdb.org/?url=' + p + 'IQDB</a>' + '<a class="de-menu-item de-src-whatanime" href="http://whatanime.ga/?auto&url=' + (aib.iichan ? 'http://reho.st/' + p : p) + 'WhatAnime</a>';
			}
		}, {
			key: '_showMenu',
			value: function _showMenu(el, html) {
				var _this34 = this;

				if (this._menu) {
					this._menu.remove();
				}
				this._menu = new Menu(el, html, function (el) {
					return _this34._clickMenu(el);
				}, false);
				this._menu.onremove = function () {
					return _this34._menu = null;
				};
			}
		}, {
			key: 'hideBtn',
			get: function get() {
				var value = this.btns.firstChild;
				Object.defineProperty(this, 'hideBtn', { value: value });
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
				var val = $q(aib.qPostMsg, this.el);
				Object.defineProperty(this, 'msg', { configurable: true, value: val });
				return val;
			}
		}, {
			key: 'trunc',
			get: function get() {
				var el = aib.qTrunc && $q(aib.qTrunc, this.el),
				    value = null;
				if (el && /long|full comment|gekürzt|слишком|длинн|мног|полн/i.test(el.textContent)) {
					value = el;
				}
				Object.defineProperty(this, 'trunc', { configurable: true, value: value });
				return value;
			}
		}, {
			key: 'videos',
			get: function get() {
				var value = Cfg.addYouTube ? new Videos(this) : null;
				Object.defineProperty(this, 'videos', { value: value });
				return value;
			}
		}]);

		return AbstractPost;
	}();

	var Post = function (_AbstractPost) {
		_inherits(Post, _AbstractPost);

		_createClass(Post, null, [{
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
			key: 'hideContent',
			value: function hideContent(headerEl, hideBtn, isUser, hide) {
				if (hide) {
					if (aib.t) {
						Thread.first.hidCounter++;
					}
					hideBtn.setAttribute('class', isUser ? 'de-btn-unhide-user' : 'de-btn-unhide');
					if (headerEl) {
						for (var el = headerEl.nextElementSibling; el; el = el.nextElementSibling) {
							el.classList.add('de-post-hiddencontent');
						}
					}
				} else {
					hideBtn.setAttribute('class', isUser ? 'de-btn-hide-user' : 'de-btn-hide');
					$each($Q('.de-post-hiddencontent', headerEl.parentNode), function (el) {
						return el.classList.remove('de-post-hiddencontent');
					});
				}
			}
		}]);

		function Post(el, thr, num, count, isOp, prev) {
			_classCallCheck(this, Post);

			var _this35 = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, thr, num, isOp));

			_this35.count = count;
			_this35.el = el;
			_this35.prev = prev;
			_this35.next = null;
			_this35.deleted = false;
			_this35.hidden = false;
			_this35.omitted = false;
			_this35.spellHidden = false;
			_this35.userToggled = false;
			_this35.viewed = false;
			_this35._selRange = null;
			_this35._selText = '';
			if (prev) {
				prev.next = _this35;
			}
			pByEl.set(el, _this35);
			pByNum.set(num, _this35);
			if (MyPosts.has(num)) {
				_this35.el.classList.add('de-mypost');
			}
			var refEl = $q(aib.qPostRef, el),
			    html = '<span class="de-post-btns' + (isOp ? '' : ' de-post-counter') + '"><svg class="de-btn-hide"><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/>' + '<use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' + '<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>';
			_this35._pref = refEl;
			if (isOp) {
				if (!aib.t) {
					html += '<svg class="de-btn-expthr"><use xlink:href="#de-symbol-post-expthr"/></svg>';
				}
				html += '<svg class="de-btn-fav"><use xlink:href="#de-symbol-post-fav"/></svg>';
			}
			_this35.sage = aib.getSage(el);
			if (_this35.sage) {
				html += '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>';
			}
			_this35.btns = $aEnd(refEl, html + '</span>');
			if (Cfg.expandTrunc && _this35.trunc) {
				_this35._getFullMsg(_this35.trunc, true);
			}
			el.addEventListener('mouseover', _this35, true);
			return _this35;
		}

		_createClass(Post, [{
			key: 'addFuncs',
			value: function addFuncs() {
				_get(Post.prototype.__proto__ || Object.getPrototypeOf(Post.prototype), 'addFuncs', this).call(this);
				if (isExpImg) {
					this.toggleImages(true);
				}
			}
		}, {
			key: 'delete',
			value: function _delete(removeEl) {
				if (removeEl) {
					$del(this.wrap);
					pByEl['delete'](this.el);
					pByNum['delete'](this.num);
					if (this.hidden) {
						this.ref.unhide();
					}
					RefMap.upd(this, false);
					if (this.prev.next = this.next) {
						this.next.prev = this.prev;
					}
				} else {
					this.deleted = true;
					this.btns.classList.remove('de-post-counter');
					this.btns.classList.add('de-post-deleted');
					this.el.classList.add('de-post-removed');
					this.wrap.classList.add('de-wrap-removed');
					($q('input[type="checkbox"]', this.el) || {}).disabled = true;
				}
			}
		}, {
			key: 'getAdjacentVisPost',
			value: function getAdjacentVisPost(toUp) {
				var post = toUp ? this.prev : this.next;
				while (post) {
					if (post.thr.hidden) {
						post = toUp ? post.thr.op.prev : post.thr.last.next;
					} else if (post.hidden || post.omitted) {
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
					}
				} else {
					Post.hideContent(this.headerEl, this.hideBtn, this.userToggled, needToHide);
				}
			}
		}, {
			key: 'select',
			value: function select() {
				if (this.isOp) {
					if (this.hidden) {
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
			value: function setUserVisib(hide) {
				var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
				var note = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				this.userToggled = true;
				this.setVisib(hide, note);
				if (this.isOp || this.hidden === hide) {
					this.hideBtn.setAttribute('class', hide ? 'de-btn-unhide-user' : 'de-btn-hide-user');
				}
				if (save) {
					HiddenPosts.set(this.num, this.thr.num, hide);
					if (this.isOp) {
						if (hide) {
							HiddenThreads.set(this.num, this.num, this.title);
						} else {
							HiddenThreads.remove(this.num);
						}
					}
					locStorage['__de-post'] = JSON.stringify({
						'brd': aib.b,
						'num': this.num,
						'thrNum': this.thr.num,
						'hide': hide,
						'title': this.isOp ? this.title : ''
					});
					locStorage.removeItem('__de-post');
				}
				if (hide) {
					this.ref.hide();
				} else {
					this.ref.unhide();
				}
			}
		}, {
			key: 'setVisib',
			value: function setVisib(hide) {
				var _this36 = this;

				var note = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				if (this.hidden === hide) {
					if (hide && note) {
						this.note.set(note);
					}
					return;
				}
				if (this.isOp) {
					this.thr.hidden = hide;
				} else {
					if (Cfg.delHiddPost === 1 || Cfg.delHiddPost === 2) {
						if (hide) {
							this.wrap.classList.add('de-hidden');
						} else {
							this.wrap.classList.remove('de-hidden');
						}
					} else {
						this._pref.onmouseover = this._pref.onmouseout = !hide ? null : function (e) {
							var yOffset = window.pageYOffset;
							_this36.hideContent(e.type === 'mouseout');
							scrollTo(window.pageXOffset, yOffset);
						};
					}
				}
				if (Cfg.strikeHidd) {
					setTimeout(function () {
						return _this36._strikePostNum(hide);
					}, 50);
				}
				if (hide) {
					this.note.set(note);
				} else {
					this.note.hide();
				}
				this.hidden = hide;
				this.hideContent(hide);
			}
		}, {
			key: 'spellHide',
			value: function spellHide(note) {
				this.spellHidden = true;
				if (!this.userToggled) {
					this.setVisib(true, note);
					this.ref.hide();
				}
			}
		}, {
			key: 'spellUnhide',
			value: function spellUnhide() {
				this.spellHidden = false;
				if (!this.userToggled) {
					this.setVisib(false);
					this.ref.unhide();
				}
			}
		}, {
			key: 'toggleImages',
			value: function toggleImages() {
				var expand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.images.expanded;

				for (var _iterator25 = this.images, _isArray25 = Array.isArray(_iterator25), _i33 = 0, _iterator25 = _isArray25 ? _iterator25 : _iterator25[Symbol.iterator]();;) {
					var _ref46;

					if (_isArray25) {
						if (_i33 >= _iterator25.length) break;
						_ref46 = _iterator25[_i33++];
					} else {
						_i33 = _iterator25.next();
						if (_i33.done) break;
						_ref46 = _i33.value;
					}

					var image = _ref46;

					if (image.isImage && image.expanded ^ expand) {
						if (expand) {
							image.expand(true, null);
						} else {
							image.collapse(null);
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
			key: '_getMenuHide',
			value: function _getMenuHide(el) {
				var str = '',
				    sel = window.getSelection(),
				    ssel = sel.toString().trim(),
				    getItem = function getItem(name) {
					return '<span info="hide-' + name + '" class="de-menu-item">' + Lng.selHiderMenu[name][lang] + '</span>';
				};
				if (ssel) {
					this._selText = ssel;
					this._selRange = sel.getRangeAt(0);
					str += getItem('sel');
				}
				if (this.posterName) {
					str += getItem('name');
				}
				if (this.posterTrip) {
					str += getItem('trip');
				}
				if (this.images.hasAttachments) {
					str += getItem('img');
					str += getItem('imgn');
					str += getItem('ihash');
				} else {
					str += getItem('noimg');
				}
				if (this.text) {
					str += getItem('text');
				} else {
					str += getItem('notext');
				}
				if (!Cfg.hideRefPsts && this.ref.hasMap) {
					str += getItem('refs');
				}
				return str;
			}
		}, {
			key: '_clickMenu',
			value: function _clickMenu(el) {
				var hidden = this.hidden;
				switch (el.getAttribute('info')) {
					case 'hide-sel':
						var start = this._selRange.startContainer,
						    end = this._selRange.endContainer;
						if (start.nodeType === 3) {
							start = start.parentNode;
						}
						if (end.nodeType === 3) {
							end = end.parentNode;
						}
						var inMsgSel = aib.qPostMsg + ', ' + aib.qPostMsg + ' *';
						if (nav.matchesSelector(start, inMsgSel) && nav.matchesSelector(end, inMsgSel) || nav.matchesSelector(start, aib.qPostSubj) && nav.matchesSelector(end, aib.qPostSubj)) {
							if (this._selText.includes('\n')) {
								Spells.add(1 , '/' + quoteReg(this._selText).replace(/\r?\n/g, '\\n') + '/', false);
							} else {
								Spells.add(0 , this._selText.toLowerCase(), false);
							}
						} else {
							dummy.innerHTML = '';
							dummy.appendChild(this._selRange.cloneContents());
							Spells.add(2 , '/' + quoteReg(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) + '/', false);
						}
						return;
					case 'hide-name':
						Spells.add(6 , this.posterName, false);return;
					case 'hide-trip':
						Spells.add(7 , this.posterTrip, false);return;
					case 'hide-img':
						var img = this.images.firstAttach,
						    w = img.weight,
						    wi = img.width,
						    h = img.height;
						Spells.add(8 , [0, [w, w], [wi, wi, h, h]], false);
						return;
					case 'hide-imgn':
						Spells.add(3 , '/' + quoteReg(this.images.firstAttach.name) + '/', false);
						return;
					case 'hide-ihash':
						ImagesHashStorage.getHash(this.images.firstAttach).then(function (hash) {
							if (hash !== -1) {
								Spells.add(4 , hash, false);
							}
						});
						return;
					case 'hide-noimg':
						Spells.add(0x108 , '', true);return;
					case 'hide-text':
						var num = this.num,
						    wrds = Post.getWrds(this.text);
						for (var post = Thread.first.op; post; post = post.next) {
							Post.findSameText(num, hidden, wrds, post);
						}
						return;
					case 'hide-notext':
						Spells.add(0x10B , '', true);return;
					case 'hide-refs':
						this.ref[hidden ? 'unhide' : 'hide'](true);
						this.setUserVisib(!hidden);
						return;
					case 'thr-exp':
						var task = parseInt(el.textContent.match(/\d+/), 10);
						this.thr.loadPosts(!task ? 'all' : task === 10 ? 'more' : task);
				}
			}
		}, {
			key: '_strikePostNum',
			value: function _strikePostNum(isHide) {
				var num = this.num;
				if (isHide) {
					Post.hiddenNums.add(+num);
				} else {
					Post.hiddenNums['delete'](+num);
				}
				$each($Q('[de-form] a[href*="' + aib.anchor + num + '"]'), isHide ? function (el) {
					el.classList.add('de-link-hid');
					if (Cfg.removeHidd && el.classList.contains('de-link-ref')) {
						var refmap = el.parentNode;
						if (!$q('.de-link-ref:not(.de-link-hid)', refmap)) {
							$hide(refmap);
						}
					}
				} : function (el) {
					el.classList.remove('de-link-hid');
					if (Cfg.removeHidd && el.classList.contains('de-link-ref')) {
						var refmap = el.parentNode;
						if ($q('.de-link-ref:not(.de-link-hid)', refmap)) {
							$show(refmap);
						}
					}
				});
			}
		}, {
			key: 'banned',
			get: function get() {
				var value = aib.getBanId(this.el);
				Object.defineProperty(this, 'banned', { writable: true, value: value });
				return value;
			}
		}, {
			key: 'bottom',
			get: function get() {
				return (this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el).getBoundingClientRect().bottom;
			}
		}, {
			key: 'headerEl',
			get: function get() {
				return new Post.content(this).headerEl;
			}
		}, {
			key: 'html',
			get: function get() {
				return new Post.content(this).html;
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
				while (post && post.deleted) {
					post = post.nextInThread;
				}
				return post;
			}
		}, {
			key: 'note',
			get: function get() {
				var value = new Post.note(this);
				Object.defineProperty(this, 'note', { value: value });
				return value;
			}
		}, {
			key: 'posterName',
			get: function get() {
				return new Post.content(this).posterName;
			}
		}, {
			key: 'posterTrip',
			get: function get() {
				return new Post.content(this).posterTrip;
			}
		}, {
			key: 'subj',
			get: function get() {
				return new Post.content(this).subj;
			}
		}, {
			key: 'text',
			get: function get() {
				return new Post.content(this).text;
			}
		}, {
			key: 'title',
			get: function get() {
				return new Post.content(this).title;
			}
		}, {
			key: 'tNum',
			get: function get() {
				return this.thr.thrId;
			}
		}, {
			key: 'top',
			get: function get() {
				return (this.isOp && this.hidden ? this.thr.el.previousElementSibling : this.el).getBoundingClientRect().top;
			}
		}, {
			key: 'wrap',
			get: function get() {
				return new Post.content(this).wrap;
			}
		}]);

		return Post;
	}(AbstractPost);

	Post.content = function (_TemporaryContent) {
		_inherits(PostContent, _TemporaryContent);

		function PostContent(post) {
			_classCallCheck(this, PostContent);

			var _this37 = _possibleConstructorReturn(this, (PostContent.__proto__ || Object.getPrototypeOf(PostContent)).call(this, post));

			if (_this37._inited) {
				return _possibleConstructorReturn(_this37);
			}
			_this37._inited = true;
			_this37.el = post.el;
			_this37.post = post;
			return _this37;
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
				var val = this.el.outerHTML;
				Object.defineProperty(this, 'html', { value: val });
				return val;
			}
		}, {
			key: 'posterName',
			get: function get() {
				var pName = $q(aib.qPostName, this.el),
				    val = pName ? pName.textContent.trim().replace(/\s/g, ' ') : '';
				Object.defineProperty(this, 'posterName', { value: val });
				return val;
			}
		}, {
			key: 'posterTrip',
			get: function get() {
				var pTrip = $q(aib.qPostTrip, this.el),
				    val = pTrip ? pTrip.textContent : '';
				Object.defineProperty(this, 'posterTrip', { value: val });
				return val;
			}
		}, {
			key: 'subj',
			get: function get() {
				var subj = $q(aib.qPostSubj, this.el),
				    val = subj ? subj.textContent : '';
				Object.defineProperty(this, 'subj', { value: val });
				return val;
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
				var val = this.subj || this.text.substring(0, 70).replace(/\s+/g, ' ');
				Object.defineProperty(this, 'title', { value: val });
				return val;
			}
		}, {
			key: 'wrap',
			get: function get() {
				var val = aib.getPostWrap(this.el, this.post.isOp);
				Object.defineProperty(this, 'wrap', { value: val });
				return val;
			}
		}]);

		return PostContent;
	}(TemporaryContent);
	Post.hasNew = false;
	Post.hiddenNums = new Set();
	Post.note = function () {
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
			key: 'hide',
			value: function hide() {
				if (this.isHideThr) {
					this._aEl.onmouseover = this._aEl.onmouseout = this._aEl.onclick = null;
				}
				$hide(this._noteEl);
			}
		}, {
			key: 'set',
			value: function set(note) {
				var _this38 = this;

				this.text = note;
				var text = void 0;
				if (this.isHideThr) {
					this._aEl.onmouseover = this._aEl.onmouseout = function (e) {
						return _this38._post.hideContent(e.type === 'mouseout');
					};
					this._aEl.onclick = function (e) {
						$pd(e);
						_this38._post.setUserVisib(!_this38._post.hidden);
					};
					text = (this._post.title ? '(' + this._post.title + ') ' : '') + (note ? '[autohide: ' + note + ']' : '');
				} else {
					text = note ? 'autohide: ' + note : '';
				}
				this.textEl.textContent = text;
				$show(this._noteEl);
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.text = null;
				if (this.isHideThr) {
					this.set(null);
				} else {
					this.hide();
				}
			}
		}]);

		return PostNote;
	}();
	Post.getWrds = function (text) {
		return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').trim().substring(0, 800).split(' ');
	};
	Post.findSameText = function (oNum, oHid, oWords, post) {
		var words = Post.getWrds(post.text),
		    len = words.length,
		    i = oWords.length,
		    olen = i,
		    _olen = i,
		    n = 0;
		if (len < olen * 0.4 || len > olen * 3) {
			return;
		}
		while (i--) {
			if (olen > 6 && oWords[i].length < 3) {
				_olen--;
				continue;
			}
			var j = len;
			while (j--) {
				if (words[j] === oWords[i] || oWords[i].match(/>>\d+/) && words[j].match(/>>\d+/)) {
					n++;
				}
			}
		}
		if (n < _olen * 0.4 || len > _olen * 3) {
			return;
		}
		if (oHid) {
			if (post.spellHidden) {
				post.note.reset();
			} else {
				post.setVisib(false);
			}
			if (post.userToggled) {
				HiddenPosts.remove(post.num);
				post.userToggled = false;
			}
		} else {
			post.setUserVisib(true, true, 'similar to >>' + oNum);
		}
		return false;
	};
	Post.sizing = {
		get dPxRatio() {
			var val = window.devicePixelRatio || 1;
			Object.defineProperty(this, 'dPxRatio', { value: val });
			return val;
		},
		get wHeight() {
			var val = nav.viewportHeight();
			if (!this._enabled) {
				doc.defaultView.addEventListener('resize', this);
				this._enabled = true;
			}
			Object.defineProperties(this, {
				'wWidth': { writable: true, configurable: true, value: nav.viewportWidth() },
				'wHeight': { writable: true, configurable: true, value: val }
			});
			return val;
		},
		get wWidth() {
			var val = nav.viewportWidth();
			if (!this._enabled) {
				doc.defaultView.addEventListener('resize', this);
				this._enabled = true;
			}
			Object.defineProperties(this, {
				'wWidth': { writable: true, configurable: true, value: val },
				'wHeight': { writable: true, configurable: true, value: nav.viewportHeight() }
			});
			return val;
		},
		handleEvent: function handleEvent() {
			this.wHeight = nav.viewportHeight();
			this.wWidth = nav.viewportWidth();
		},


		_enabled: false
	};

	function PostImages(post) {
		var first = null,
		    last = null,
		    els = $Q(aib.qPostImg, post.el);
		var hasAttachments = false;
		var filesMap = new Map();
		for (var i = 0, len = els.length; i < len; ++i) {
			var _el4 = els[i];
			last = new Attachment(post, _el4, last);
			filesMap.set(_el4, last);
			hasAttachments = true;
			if (!first) {
				first = last;
			}
		}
		if (Cfg.addImgs) {
			els = Array.from($Q('.de-img-pre', post.el));
			for (var _i34 = 0, _len8 = els.length; _i34 < _len8; ++_i34) {
				var _el5 = els[_i34];
				last = new EmbeddedImage(post, _el5, last);
				filesMap.set(_el5, last);
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
	PostImages.prototype = _defineProperty({
		get expanded() {
			for (var img = this.first; img; img = img.next) {
				if (img.expanded) {
					return true;
				}
			}
			return false;
		},
		get firstAttach() {
			return this.hasAttachments ? this.first : null;
		},
		getImageByEl: function getImageByEl(el) {
			return this._map.get(el);
		}
	}, Symbol.iterator, function () {
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
	});


	var Pview = function (_AbstractPost2) {
		_inherits(Pview, _AbstractPost2);

		_createClass(Pview, null, [{
			key: 'show',
			value: function show(parent, link) {
				var tNum = +(link.pathname.match(/.+?\/[^\d]*(\d+)/) || [, aib.getPostOfEl(link).tNum])[1];
				var pNum = +(link.textContent.trim().match(/\d+$/) || [tNum])[0];
				var isTop = !(parent instanceof Pview);
				var pv = isTop ? Pview.top : parent.kid;
				clearTimeout(Pview._delTO);
				if (pv && pv.num === pNum) {
					if (pv.kid) {
						pv.kid['delete']();
					}
					if (pv._link !== link) {
						pv._setPosition(link, Cfg.animation);
						pv._link.classList.remove('de-link-parent');
						link.classList.add('de-link-parent');
						pv._link = link;
						if (pv.parent.num !== parent.num) {
							$each($Q('.de-link-pview', pv.el), function (el) {
								el.classList.remove('de-link-pview');
							});
							Pview._markLink(pv.el, parent.num);
						}
					}
					pv.parent = parent;
				} else if (!Cfg.noNavigHidd || !pByNum.has(pNum) || !pByNum.get(pNum).hidden) {
					if (pv) {
						pv['delete']();
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
				var parent = pv.parent;
				if (parent.omitted) {
					pv['delete']();
					return;
				}
				if (parent.thr.loadCount === 1 && !parent.el.contains(pv._link)) {
					var _el6 = parent.ref.getElByNum(pv.num);
					if (_el6) {
						pv._link = _el6;
					} else {
						pv['delete']();
						return;
					}
				}
				var cr = parent.hidden ? parent : pv._link.getBoundingClientRect();
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
					if (el.textContent.startsWith('>>' + num)) {
						el.classList.add('de-link-pview');
					}
				});
			}
		}, {
			key: 'topParent',
			get: function get() {
				return Pview.top ? Pview.top.parent : null;
			}
		}]);

		function Pview(parent, link, pNum, tNum) {
			_classCallCheck(this, Pview);

			var _this39 = _possibleConstructorReturn(this, (Pview.__proto__ || Object.getPrototypeOf(Pview)).call(this, parent.thr, pNum, pNum === tNum));

			_this39._isCached = false;
			_this39._isLeft = false;
			_this39._isTop = false;
			_this39._link = link;
			_this39._newPos = null;
			_this39._offsetTop = 0;
			_this39._readDelay = 0;
			_this39.isSticky = false;
			_this39.parent = parent;
			_this39.tNum = tNum;
			var post = pByNum.get(pNum);
			if (post && (!post.isOp || !(parent instanceof Pview) || !parent._isCached)) {
				_this39._showPost(post);
				return _possibleConstructorReturn(_this39);
			}
			_this39._isCached = true;
			_this39._brd = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
			if (PviewsCache.has(_this39._brd + tNum)) {
				post = PviewsCache.get(_this39._brd + tNum).getPost(pNum);
				if (post) {
					_this39._showPost(post);
				} else {
					_this39._showPview(_this39.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">\n\t\t\t\t\t' + Lng.postNotFound[lang] + '</div>'));
				}
				return _possibleConstructorReturn(_this39);
			}
			_this39._showPview(_this39.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">\n\t\t\t<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' + Lng.loading[lang] + '</div>'));

			_this39._loadPromise = ajaxPostsLoad(_this39._brd, tNum, false).then(function (pBuilder) {
				if (aib.jsonBuilder) {
					var html = [];
					for (var i = 0, len = pBuilder.length + 1; i < len; ++i) {
						html.push(pBuilder.getPostHTML(i - 1)); 
					}
					_this39._onload($add('<div>' + aib.fixHTML(html.join('')) + '</div>'));
				} else {
					_this39._onload(pBuilder._form);
				}
			}, function (e) {
				return _this39._onerror(e);
			});
			return _this39;
		}

		_createClass(Pview, [{
			key: 'delete',
			value: function _delete() {
				this.parent.kid = null;
				this._link.classList.remove('de-link-parent');
				if (Pview.top === this) {
					Pview.top = null;
				}
				if (this._loadPromise) {
					this._loadPromise.cancel();
					this._loadPromise = null;
				}
				var vPost = Attachment.viewer && Attachment.viewer.data.post;
				var pv = this;
				do {
					clearTimeout(pv._readDelay);
					if (vPost === pv) {
						Attachment.viewer.close(null);
						Attachment.viewer = vPost = null;
					}
					var el = pv.el;
					pByEl['delete'](el);
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
					this['delete']();
				} else if (lastSticky.kid) {
					lastSticky.kid['delete']();
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
				var _this40 = this;

				clearTimeout(Pview._delTO);
				Pview._delTO = setTimeout(function () {
					return _this40.deleteNonSticky();
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
			key: 'setSticky',
			value: function setSticky(val) {
				this.stickBtn.setAttribute('class', val ? 'de-btn-stick-on' : 'de-btn-stick');
				this.isSticky = val;
			}
		}, {
			key: 'setUserVisib',
			value: function setUserVisib() {
				var post = pByNum.get(this.num);
				post.setUserVisib(!post.hidden);
				Pview.updatePosition(true);
				$each($Q('.de-btn-pview-hide[de-num="' + this.num + '"]'), function (el) {
					if (post.hidden) {
						el.setAttribute('class', 'de-btn-unhide-user de-btn-pview-hide');
						el.parentNode.classList.add('de-post-hide');
					} else {
						el.setAttribute('class', 'de-btn-hide-user de-btn-pview-hide');
						el.parentNode.classList.remove('de-post-hide');
					}
				});
			}
		}, {
			key: '_onerror',
			value: function _onerror(e) {
				if (!(e instanceof CancelError)) {
					this.el.innerHTML = e instanceof AjaxError && e.code === 404 ? Lng.postNotFound[lang] : getErrorMessage(e);
				}
			}
		}, {
			key: '_onload',
			value: function _onload(form) {
				var parentNum = this.parent.num,
				    post = new PviewsCache(doc.adoptNode(form), this._brd, this.tNum).getPost(this.num);
				if (post && (aib.b !== this._brd || !post.ref.hasMap || !post.ref.has(parentNum))) {
					(post.ref.hasMap ? $q('.de-refmap', post.el) : $aEnd(post.msg, '<div class="de-refmap"></div>')).insertAdjacentHTML('afterbegin', '<a class="de-link-ref" href="' + aib.getThrUrl(this._brd, this.parent.tNum) + aib.anchor + parentNum + '">&gt;&gt;' + (aib.b === this._brd ? '' : '/' + aib.b + '/') + parentNum + '</a><span class="de-refcomma">, </span>');
				}
				if (post) {
					this._showPost(post);
				} else {
					this.el.innerHTML = Lng.postNotFound[lang];
				}
			}
		}, {
			key: '_setPosition',
			value: function _setPosition(link, isAnim) {
				var oldCSS,
				    pv = this.el,
				    cr = link.getBoundingClientRect(),
				    offX = cr.left + window.pageXOffset + cr.width / 2,
				    offY = cr.top,
				    bWidth = nav.viewportWidth(),
				    isLeft = offX < bWidth / 2,
				    tmp = isLeft ? offX : offX - Math.min(parseInt(pv.offsetWidth, 10), offX - 10),
				    lmw = 'max-width:' + (bWidth - tmp - 10) + 'px; left:' + tmp + 'px;';
				if (isAnim) {
					oldCSS = pv.style.cssText;
					pv.style.cssText = 'opacity: 0; ' + lmw;
				} else {
					pv.style.cssText = lmw;
				}
				var top = pv.offsetHeight,
				    isTop = offY + top + cr.height < nav.viewportHeight() || offY - top < 5;
				top = window.pageYOffset + (isTop ? offY + cr.height : offY - top);
				this._offsetTop = top;
				this._isLeft = isLeft;
				this._isTop = isTop;
				if (!isAnim) {
					pv.style.top = top + 'px';
					return;
				}
				var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
				$css('@keyframes ' + uId + ' { to { ' + lmw + ' top:' + top + 'px; } }').className = 'de-css-move';
				if (this._newPos) {
					pv.style.cssText = this._newPos;
					pv.removeEventListener('animationend', this);
				} else {
					pv.style.cssText = oldCSS;
				}
				this._newPos = lmw + ' top:' + top + 'px;';
				pv.addEventListener('animationend', this);
				pv.classList.add('de-pview-anim');
				pv.style.animationName = uId;
			}
		}, {
			key: '_showMenu',
			value: function _showMenu(el, html) {
				var _this41 = this;

				_get(Pview.prototype.__proto__ || Object.getPrototypeOf(Pview.prototype), '_showMenu', this).call(this, el, html);
				this._menu.onover = function () {
					return _this41.mouseEnter();
				};
				this._menu.onout = function () {
					return _this41.markToDel();
				};
			}
		}, {
			key: '_showPost',
			value: function _showPost(post) {
				if (this.el) {
					$del(this.el);
				}
				var el = this.el = post.el.cloneNode(true),
				    isMyPost = Cfg.markMyPosts && MyPosts.has(this.num),
				    pText = '<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>' + (post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') + '<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>' + (post.deleted ? '' : '<span style="margin: 0 4px 0 2px; vertical-align: 1px; ' + 'color: #4f7942; font: bold 11px tahoma; cursor: default;">' + (post.isOp ? 'OP' : post.count + 1) + (isMyPost ? ' (You)' : '') + '</span>');
				pByEl.set(el, this);
				el.className = aib.cReply + ' de-pview' + (post.viewed ? ' de-viewed' : '') + (isMyPost ? ' de-mypost' : '');
				$show(el);
				$each($Q('.de-post-hiddencontent', el), function (node) {
					return node.classList.remove('de-post-hiddencontent');
				});
				if (Cfg.linksNavig) {
					Pview._markLink(el, this.parent.num);
				}
				this._pref = $q(aib.qPostRef, el);
				this._link.classList.add('de-link-parent');
				if (post instanceof CacheItem) {
					this.btns = $aEnd(this._pref, '<span class="de-post-btns">' + pText + '</span>');
					embedMediaLinks(this);
					if (Cfg.addYouTube) {
						new VideosParser().parse(this).end();
					}
					if (Cfg.addImgs) {
						embedImagesLinks(el);
					}
					processImagesLinks(el);
				} else {
					var node = this._pref.nextSibling;
					this.btns = node;
					this.isOp = post.isOp;
					node.classList.remove('de-post-counter');
					if (post.hidden) {
						node.classList.add('de-post-hide');
					}
					node.innerHTML = '<svg class="de-btn-' + (post.hidden ? 'unhide' : 'hide') + (post.userToggled ? '-user' : '') + ' de-btn-pview-hide" de-num="' + this.num + '">' + '<use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/>' + '<use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' + pText;
					$each($Q((!aib.t && post.isOp ? aib.qOmitted + ', ' : '') + '.de-img-wrapper, .de-after-fimg', el), $del);
					$each($Q(aib.qPostImg, el), function (el) {
						$show(el.parentNode);
					});
					node = $q('.de-link-parent', el);
					if (node) {
						node.classList.remove('de-link-parent');
					}
					if (Cfg.addYouTube && post.videos.hasLinks) {
						if (post.videos.playerInfo !== null) {
							Object.defineProperty(this, 'videos', {
								value: new Videos(this, $q('.de-video-obj', el), post.videos.playerInfo)
							});
						}
						this.videos.updatePost($Q('.de-video-link', post.el), $Q('.de-video-link', el), true);
					}
					if (Cfg.addImgs) {
						$each($Q('.de-img-pre', el), $show);
					}
					if (Cfg.markViewed) {
						this._readDelay = setTimeout(function (pst) {
							if (!pst.viewed) {
								pst.el.classList.add('de-viewed');
								pst.viewed = true;
							}
							var arr = (sesStorage['de-viewed'] || '').split(',');
							arr.push(pst.num);
							sesStorage['de-viewed'] = arr;
						}, post.text.length > 100 ? 2e3 : 500, post);
					}
				}
				el.addEventListener('click', this, true);
				this._showPview(el);
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
		}]);

		return Pview;
	}(AbstractPost);

	Pview.top = null;
	Pview._delTO = null;

	var CacheItem = function () {
		function CacheItem(el, count) {
			_classCallCheck(this, CacheItem);

			this.el = el;
			this.count = count;
			this.isOp = count === 0;
			this.itemInited = false;
			this.deleted = false;
			this.viewed = false;
		}

		_createClass(CacheItem, [{
			key: 'msg',
			get: function get() {
				var value = $q(aib.qPostMsg, this.el);
				Object.defineProperty(this, 'msg', { configurable: true, value: value });
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
		}]);

		return CacheItem;
	}();

	var PviewsCache = function (_TemporaryContent2) {
		_inherits(PviewsCache, _TemporaryContent2);

		function PviewsCache(form, b, tNum) {
			_classCallCheck(this, PviewsCache);

			var _this42 = _possibleConstructorReturn(this, (PviewsCache.__proto__ || Object.getPrototypeOf(PviewsCache)).call(this, b + tNum));

			if (_this42._inited) {
				return _possibleConstructorReturn(_this42);
			}
			_this42._inited = true;
			var pBn = new Map(),
			    thr = $q(aib.qThread, form) || form,
			    posts = $Q(aib.qRPost + ', ' + aib.qOPost, thr);
			for (var i = 0, len = posts.length; i < len; ++i) {
				var post = posts[i];
				pBn.set(aib.getPNum(post), new CacheItem(post, i + 1));
			}
			pBn.set(tNum, _this42._opObj = new CacheItem(aib.getOp(thr), 0));
			_this42._b = b;
			_this42._tNum = tNum;
			_this42._tUrl = aib.getThrUrl(b, tNum);
			_this42._posts = pBn;
			if (Cfg.linksNavig) {
				RefMap.gen(pBn, _this42._tUrl);
			}
			return _this42;
		}

		_createClass(PviewsCache, [{
			key: 'getPost',
			value: function getPost(num) {
				var pst = this._posts.get(num);
				if (!pst || pst.itemInited) {
					return pst;
				}
				if (num === this._tNum) {
					if (this._b === aib.b && pByNum.has(this._tNum)) {
						pst.ref.makeUnion(pByNum.get(this._tNum).ref);
					}
				}
				pst.el = aib.fixHTML(pst.el);
				delete pst.msg;
				if (pst.ref.hasMap) {
					pst.ref.init(this._tUrl, Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null);
				}
				pst.itemInited = true;
				return pst;
			}
		}]);

		return PviewsCache;
	}(TemporaryContent);

	PviewsCache.purgeSecs = 3e5;


	function ImgBtnsShowHider(nextFn, prevFn) {
		var btns = $bEnd(docBody, '<div style="display: none;">' + '<div id="de-img-btn-next" de-title="' + Lng.nextImg[lang] + '"></div>' + '<div id="de-img-btn-prev" de-title="' + Lng.prevImg[lang] + '"></div></div>');
		this._btns = btns;
		this._btnsStyle = btns.style;
		this._nextFn = nextFn;
		this._prevFn = prevFn;
		doc.defaultView.addEventListener('mousemove', this);
		btns.addEventListener('mouseover', this);
	}
	ImgBtnsShowHider.prototype = {
		handleEvent: function handleEvent(e) {
			switch (e.type) {
				case 'mousemove':
					var curX = e.clientX,
					    curY = e.clientY;
					if (this._oldX !== curX || this._oldY !== curY) {
						this._oldX = curX;
						this._oldY = curY;
						this.show();
					}
					return;
				case 'mouseover':
					if (!this.hasEvents) {
						this.hasEvents = true;
						this._btns.addEventListener('mouseout', this);
						this._btns.addEventListener('click', this);
					}
					if (!this._hidden) {
						clearTimeout(this._hideTmt);
						KeyEditListener.setTitle(this._btns.firstChild, 17);
						KeyEditListener.setTitle(this._btns.lastChild, 4);
					}
					return;
				case 'mouseout':
					this._setHideTmt();return;
				case 'click':
					switch (e.target.id) {
						case 'de-img-btn-next':
							this._nextFn();return;
						case 'de-img-btn-prev':
							this._prevFn();
					}
			}
		},
		hide: function hide() {
			this._btnsStyle.display = 'none';
			this._hidden = true;
			this._oldX = this._oldY = -1;
		},
		remove: function remove() {
			$del(this._btns);
			doc.defaultView.removeEventListener('mousemove', this);
			clearTimeout(this._hideTmt);
		},
		show: function show() {
			if (this._hidden) {
				this._btnsStyle.removeProperty('display');
				this._hidden = false;
				this._setHideTmt();
			}
		},


		_hasEvents: false,
		_hideTmt: 0,
		_hidden: true,
		_oldX: -1,
		_oldY: -1,
		_setHideTmt: function _setHideTmt() {
			var _this43 = this;

			clearTimeout(this._hideTmt);
			this._hideTmt = setTimeout(function () {
				return _this43.hide();
			}, 2e3);
		}
	};

	function AttachmentViewer(data) {
		this._show(data);
	}
	AttachmentViewer.prototype = {
		data: null,
		close: function close(e) {
			if (this.hasOwnProperty('_btns')) {
				this._btns.remove();
			}
			this._remove(e);
		},
		handleEvent: function handleEvent(e) {
			switch (e.type) {
				case 'mousedown':
					if (this.data.isVideo && this.data.isControlClick(e)) {
						return;
					}
					this._oldX = e.clientX;
					this._oldY = e.clientY;
					docBody.addEventListener('mousemove', this, true);
					docBody.addEventListener('mouseup', this, true);
					break;
				case 'mousemove':
					var curX = e.clientX,
					    curY = e.clientY;
					if (curX !== this._oldX || curY !== this._oldY) {
						this._elStyle.left = (this._oldL = parseInt(this._elStyle.left, 10) + curX - this._oldX) + 'px';
						this._elStyle.top = (this._oldT = parseInt(this._elStyle.top, 10) + curY - this._oldY) + 'px';
						this._oldX = curX;
						this._oldY = curY;
						this._moved = true;
					}
					return;
				case 'mouseup':
					docBody.removeEventListener('mousemove', this, true);
					docBody.removeEventListener('mouseup', this, true);
					return;
				case 'click':
					var _el7 = e.target;
					if (this.data.isVideo && this.data.isControlClick(e) || _el7.tagName !== 'IMG' && _el7.tagName !== 'VIDEO' && !_el7.classList.contains('de-img-wrapper') && _el7.target.className !== 'de-img-load') {
						return;
					}
					if (e.button === 0) {
						if (this._moved) {
							this._moved = false;
						} else {
							this.close(e);
							Attachment.viewer = null;
						}
						e.stopPropagation();
						break;
					}
					return;
				case 'mousewheel':
					this._handleWheelEvent(e.clientX, e.clientY, -1 / 40 * ('wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta));
					break;
				default:
					this._handleWheelEvent(e.clientX, e.clientY, e.deltaY);
			}
			$pd(e);
		},
		navigate: function navigate(isForward) {
			var data = this.data;
			data.cancelWebmLoad(this._fullEl);
			do {
				data = data.getFollow(isForward);
			} while (data && !data.isVideo && !data.isImage);
			if (data) {
				this.update(data, true, null);
				data.post.selectAndScrollTo(data.post.images.first.el);
			}
		},
		update: function update(data, showButtons, e) {
			this._remove(e);
			this._show(data, showButtons);
		},


		_data: null,
		_elStyle: null,
		_fullEl: null,
		_obj: null,
		_oldL: 0,
		_oldT: 0,
		_height: 0,
		_width: 0,
		_oldX: 0,
		_oldY: 0,
		_minSize: 0,
		_moved: false,
		get _btns() {
			var _this44 = this;

			var val = new ImgBtnsShowHider(function () {
				return _this44.navigate(true);
			}, function () {
				return _this44.navigate(false);
			});
			Object.defineProperty(this, '_btns', { value: val });
			return val;
		},
		get _zoomFactor() {
			var val = 1 + Cfg.zoomFactor / 100;
			Object.defineProperty(this, '_zoomFactor', { value: val });
			return val;
		},
		_handleWheelEvent: function _handleWheelEvent(clientX, clientY, delta) {
			if (delta === 0) {
				return;
			}
			var width,
			    height,
			    oldW = this._width,
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
			this._elStyle.left = (this._oldL = parseInt(clientX - width / oldW * (clientX - this._oldL), 10)) + 'px';
			this._elStyle.top = (this._oldT = parseInt(clientY - height / oldH * (clientY - this._oldT), 10)) + 'px';
		},
		_show: function _show(data) {
			var _this45 = this;

			var _data$computeFullSize = data.computeFullSize(),
			    _data$computeFullSize2 = _slicedToArray(_data$computeFullSize, 3),
			    width = _data$computeFullSize2[0],
			    height = _data$computeFullSize2[1],
			    minSize = _data$computeFullSize2[2];

			this._fullEl = data.getFullObject(false, function (el) {
				return _this45._resize(el);
			}, function (el) {
				return _this45._rotate(el);
			});
			if (data.isVideo && width < Cfg.minWebmWidth) {
				width = Cfg.minWebmWidth;
			}
			this._width = width;
			this._height = height;
			this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
			this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
			this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
			var obj = $add('<div class="de-img-center" style="top:' + (this._oldT - (Cfg.imgInfoLink ? 11 : 0)) + 'px; left:' + this._oldL + 'px; width:' + width + 'px; height:' + height + 'px; display: block"></div>');
			if (data.isImage) {
				$aBegin(obj, '<a style="width: inherit; height: inherit;" href="' + data.src + '"></a>').appendChild(this._fullEl);
			} else {
				obj.appendChild(this._fullEl);
			}
			this._elStyle = obj.style;
			this.data = data;
			this._obj = obj;
			obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', this, true);
			obj.addEventListener('mousedown', this, true);
			obj.addEventListener('click', this, true);
			if (data.inPview && !data.post.isSticky) {
				this.data.post.setSticky(true);
			}
			if (!data.inPview) {
				this._btns.show();
			} else if (this.hasOwnProperty('_btns')) {
				this._btns.hide();
			}
			data.post.thr.form.el.appendChild(obj);
		},
		_remove: function _remove(e) {
			var data = this.data;
			data.cancelWebmLoad(this._fullEl);
			if (data.inPview && data.post.isSticky) {
				data.post.setSticky(false);
			}
			$del(this._obj);
			if (e && data.inPview) {
				data.sendCloseEvent(e, false);
			}
		},
		_resize: function _resize(el) {
			if (el !== this._fullEl) {
				return;
			}

			var _data$computeFullSize3 = this.data.computeFullSize(),
			    _data$computeFullSize4 = _slicedToArray(_data$computeFullSize3, 3),
			    width = _data$computeFullSize4[0],
			    height = _data$computeFullSize4[1],
			    minSize = _data$computeFullSize4[2];

			this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
			if (Post.sizing.wWidth - this._oldL - this._width < 5 || Post.sizing.wHeight - this._oldT - this._height < 5) {
				return;
			}
			var cPointX = this._oldL + this._width / 2,
			    cPointY = this._oldT + this._height / 2,
			    maxWidth = (Post.sizing.wWidth - cPointX - 2) * 2,
			    maxHeight = (Post.sizing.wHeight - cPointY - 2) * 2;
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
		},
		_rotate: function _rotate(el) {
			if (el !== this._fullEl) {
				return;
			}
			var width = this._width;
			var height = this._height;
			this._width = height;
			this._height = width;
			this._elStyle.width = height + 'px';
			this._elStyle.height = width + 'px';
			var halfWidth = width / 2;
			var halfHeight = height / 2;
			this._elStyle.left = (this._oldL = parseInt(this._oldL + halfWidth - halfHeight, 10)) + 'px';
			this._elStyle.top = (this._oldT = parseInt(this._oldT + halfHeight - halfWidth, 10)) + 'px';
		}
	};

	var ExpandableMedia = function () {
		function ExpandableMedia(post, el, prev) {
			_classCallCheck(this, ExpandableMedia);

			this.post = post;
			this.el = el;
			this.prev = prev;
			this.next = null;
			this.expanded = false;
			this._fullEl = null;
			this._webmTitleLoad = null;
			if (prev) {
				prev.next = this;
			}
		}

		_createClass(ExpandableMedia, [{
			key: 'cancelWebmLoad',
			value: function cancelWebmLoad(fullEl) {
				if (this.isVideo && fullEl.tagName === 'VIDEO') {
					fullEl.pause();
					fullEl.removeAttribute('src');
					fullEl.load();
				}
				if (this._webmTitleLoad) {
					this._webmTitleLoad.cancel();
					this._webmTitleLoad = null;
				}
			}
		}, {
			key: 'collapse',
			value: function collapse(e) {
				if (e && this.isVideo && this.isControlClick(e)) {
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
					return this._getThumbSize();
				}
				var width = this._size[0];
				var height = this._size[1];
				if (Cfg.resizeDPI) {
					width /= Post.sizing.dPxRatio;
					height /= Post.sizing.dPxRatio;
				}
				var minSize = Cfg.minImgSize;
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
			key: 'expand',
			value: function expand(inPost, e) {
				var _this46 = this;

				if (e && !e.bubbles) {
					return;
				}
				if (!inPost) {
					if (Attachment.viewer) {
						if (Attachment.viewer.data === this) {
							Attachment.viewer.close(e);
							Attachment.viewer = null;
							return;
						}
						Attachment.viewer.update(this, e);
					} else {
						Attachment.viewer = new AttachmentViewer(this);
					}
					return;
				}
				this.expanded = true;
				var el = this.el;
				(aib.hasPicWrap ? this._getImageParent() : el.parentNode).insertAdjacentHTML('afterend', '<div class="de-after-fimg"></div>');
				this._fullEl = this.getFullObject(true, null, null);
				this._fullEl.addEventListener('click', function (e) {
					return _this46.collapse(e);
				});
				$hide(el.parentNode);
				$after(el.parentNode, this._fullEl);
			}
		}, {
			key: 'getFollow',
			value: function getFollow(isForward) {
				var nImage = isForward ? this.next : this.prev;
				if (nImage) {
					return nImage;
				}
				var imgs,
				    post = this.post;
				do {
					post = post.getAdjacentVisPost(!isForward);
					if (!post) {
						post = isForward ? Thread.first.op : Thread.last.last;
						if (post.hidden || post.thr.hidden) {
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
			key: 'getFullObject',
			value: function getFullObject(inPost, onsizechange, onrotate) {
				var _this47 = this;

				var wrapEl = void 0,
				    name = void 0,
				    origSrc = void 0,
				    src = this.src;
				var parent = this._getImageParent();
				if (this.el.className !== 'de-img-pre') {
					var nameEl = $q(aib.qImgNameLink, parent);
					origSrc = nameEl.getAttribute('de-href') || nameEl.href;
					name = this.name;
				} else {
					origSrc = parent.href;
					name = origSrc.split('/').pop();
				}
				if (!this.isVideo) {
					wrapEl = $add('<div class="de-img-wrapper' + (inPost ? ' de-img-wrapper-inpost' : !this._size ? ' de-img-wrapper-nosize' : '') + '">\n\t\t\t\t' + (!inPost && !this._size ? '<svg class="de-img-load"><use xlink:href="#de-symbol-wait"/></svg>' : '') + '\n\t\t\t\t<img class="de-img-full" src="' + src + '" alt="' + src + '">\n\t\t\t\t<div class="de-img-full-info">\n\t\t\t\t\t<a class="de-img-full-src" target="_blank" title="' + Lng.openOriginal[lang] + '" href="' + origSrc + '">' + name + '</a>\n\t\t\t\t</div>\n\t\t\t</div>');
					var img = $q('.de-img-full', wrapEl);
					img.onload = img.onerror = function (_ref47) {
						var target = _ref47.target;

						if (target.naturalHeight + target.naturalWidth === 0) {
							if (!target.onceLoaded) {
								target.src = target.src;
								target.onceLoaded = true;
							}
						} else {
							var newWidth = target.naturalWidth;
							var newHeight = target.naturalHeight;
							var ar = _this47._size ? _this47._size[1] / _this47._size[0] : newHeight / newWidth;
							var isExifRotated = target.scrollHeight / target.scrollWidth > 1 ? ar < 1 : ar > 1;
							if (!_this47._size || isExifRotated) {
								_this47._size = isExifRotated ? [newHeight, newWidth] : [newWidth, newHeight];
							}
							var _el8 = target.previousElementSibling;
							if (_el8) {
								var p = _el8.parentNode;
								$hide(_el8);
								p.classList.remove('de-img-wrapper-nosize');
								if (onsizechange) {
									onsizechange(p);
								}
							} else if (isExifRotated && onrotate) {
								onrotate(target.parentNode);
							}
						}
					};
					DollchanAPI.notify('expandmedia', src);
					return wrapEl;
				}

				if (aib.tiny) {
					src = src.replace(/^.*?\?v=|&.*?$/g, '');
				}
				var isWebm = src.split('.').pop() === 'webm';
				var needTitle = isWebm && Cfg.webmTitles;
				wrapEl = $add('<div class="de-img-wrapper" style="width: inherit; height: inherit">\n\t\t\t<video style="width: inherit; height: inherit" src="' + src + '" loop autoplay ' + (Cfg.webmControl ? 'controls ' : '') + (Cfg.webmVolume === 0 ? 'muted ' : '') + '></video>\n\t\t\t<div class="de-img-full-info">\n\t\t\t\t<a class="de-img-full-src" target="_blank" title="' + Lng.openOriginal[lang] + '" href="' + origSrc + '">' + name + '</a>\n\t\t\t\t' + (needTitle ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '') + '\n\t\t\t</div>\n\t\t</div>');
				var videoEl = $q('video', wrapEl);
				videoEl.volume = Cfg.webmVolume / 100;
				videoEl.addEventListener('error', function () {
					if (!this.onceLoaded) {
						this.load();
						this.onceLoaded = true;
					}
				});
				setTimeout(function () {
					return videoEl.dispatchEvent(new CustomEvent('volumechange'));
				}, 150);
				videoEl.addEventListener('volumechange', function (e) {
					var val = this.muted ? 0 : Math.round(this.volume * 100);
					if (e.isTrusted && val !== Cfg.webmVolume) {
						saveCfg('webmVolume', val);
						locStorage['__de-webmvolume'] = val;
						locStorage.removeItem('__de-webmvolume');
					}
				});
				if (nav.MsEdge && isWebm && !DollchanAPI.hasListener('expandmedia')) {
					var href = 'https://github.com/Kagami/webmify/';
					$popup('err-expandmedia', Lng.errMsEdgeWebm[lang] + (':\n<a href="' + href + '" target="_blank">' + href + '</a>'), false);
				}
				if (needTitle) {
					this._webmTitleLoad = downloadImgData(videoEl.src, false).then(function (data) {
						$hide($q('.de-wait', wrapEl));
						if (!data) {
							return;
						}
						var title = '',
						    d = new _WebmParser(data.buffer).getData();
						if (!d) {
							return;
						}
						d = d[0];
						for (var i = 0, len = d.length; i < len; i++) {
							if (d[i] === 0x49 && d[i + 1] === 0xA9 && d[i + 2] === 0x66 && d[i + 18] === 0x7B && d[i + 19] === 0xA9) {
								i += 20;
								for (var end = (d[i++] & 0x7F) + i; i < end; i++) {
									title += String.fromCharCode(d[i]);
								}
								if (title) {
									$q('.de-img-full-src', wrapEl).textContent += ' - ' + (videoEl.title = decodeURIComponent(escape(title)));
								}
								break;
							}
						}
					});
				}
				DollchanAPI.notify('expandmedia', src);
				return wrapEl;
			}
		}, {
			key: 'isControlClick',
			value: function isControlClick(e) {
				return Cfg.webmControl && e.clientY > e.target.getBoundingClientRect().bottom - 40;
			}
		}, {
			key: 'sendCloseEvent',
			value: function sendCloseEvent(e, inPost) {
				var pv = this.post,
				    cr = pv.el.getBoundingClientRect(),
				    x = e.pageX - window.pageXOffset,
				    y = e.pageY - window.pageYOffset;
				if (!inPost) {
					while (x > cr.right || x < cr.left || y > cr.bottom || y < cr.top) {
						pv = pv.parent;
						if (pv && pv instanceof Pview) {
							cr = pv.el.getBoundingClientRect();
						} else {
							if (Pview.top) {
								Pview.top.markToDel();
							}
							return;
						}
					}
					pv.mouseEnter();
				} else if (x > cr.right || y > cr.bottom && Pview.top) {
					Pview.top.markToDel();
				}
			}
		}, {
			key: '_getThumbSize',
			value: function _getThumbSize() {
				var iEl = new Image();
				iEl.src = this.el.src;
				return this.isVideo ? [iEl.width * 5, iEl.height * 5] : [iEl.width, iEl.height, null];
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
				var val = /\.jpe?g|\.png|\.gif/i.test(this.src) || this.src.startsWith('blob:') && !this.el.hasAttribute('de-video');
				Object.defineProperty(this, 'isImage', { value: val });
				return val;
			}
		}, {
			key: 'isVideo',
			get: function get() {
				var val = /\.(?:webm|mp4)(?:&|$)/i.test(this.src) || this.src.startsWith('blob:') && this.el.hasAttribute('de-video');
				Object.defineProperty(this, 'isVideo', { value: val });
				return val;
			}
		}, {
			key: 'src',
			get: function get() {
				var val = this._getImageSrc();
				Object.defineProperty(this, 'src', { value: val });
				return val;
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
		}]);

		return ExpandableMedia;
	}();

	var EmbeddedImage = function (_ExpandableMedia) {
		_inherits(EmbeddedImage, _ExpandableMedia);

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
	}(ExpandableMedia);

	var Attachment = function (_ExpandableMedia2) {
		_inherits(Attachment, _ExpandableMedia2);

		function Attachment() {
			_classCallCheck(this, Attachment);

			return _possibleConstructorReturn(this, (Attachment.__proto__ || Object.getPrototypeOf(Attachment)).apply(this, arguments));
		}

		_createClass(Attachment, [{
			key: '_getImageParent',
			value: function _getImageParent() {
				return aib.getImgWrap(this.el);
			}
		}, {
			key: '_getImageSize',
			value: function _getImageSize() {
				if (this.info) {
					var size = this.info.match(/(\d+)\s?[x\u00D7]\s?(\d+)/);
					return [size[1], size[2]];
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
				var val = aib.getImgInfo(aib.getImgWrap(this.el));
				Object.defineProperty(this, 'info', { value: val });
				return val;
			}
		}, {
			key: 'weight',
			get: function get() {
				var val = 0;
				if (this.info) {
					var w = this.info.match(/(\d+(?:[\.,]\d+)?)\s*([mмkк])?i?[bб]/i);
					var w1 = w[1].replace(',', '.');
					val = w[2] === 'M' ? w1 * 1e3 | 0 : !w[2] ? Math.round(w1 / 1e3) : w1;
				}
				Object.defineProperty(this, 'weight', { value: val });
				return val;
			}
		}, {
			key: 'name',
			get: function get() {
				var val = aib.getImgRealName(aib.getImgWrap(this.el)).trim();
				Object.defineProperty(this, 'name', { value: val });
				return val;
			}
		}]);

		return Attachment;
	}(ExpandableMedia);

	Attachment.viewer = null;

	var ImagesHashStorage = Object.create({
		endFn: function endFn() {
			if (this.hasOwnProperty('_storage')) {
				sesStorage['de-imageshash'] = JSON.stringify(this._storage);
			}
			if (this.hasOwnProperty('_workers')) {
				this._workers.clear();
				delete this._workers;
			}
		},

		get getHash() {
			var val = this._getHashHelper.bind(this);
			Object.defineProperty(this, 'getHash', { value: val });
			return val;
		},

		_getHashHelper: function _getHashHelper(imgObj) {
			var _this50 = this;

			var el, src, data, buffer, val, w, h, imgData, cnv, ctx;
			return regeneratorRuntime.async(function _getHashHelper$(_context17) {
				while (1) {
					switch (_context17.prev = _context17.next) {
						case 0:
							el = imgObj.el, src = imgObj.src;

							if (!(src in this._storage)) {
								_context17.next = 3;
								break;
							}

							return _context17.abrupt('return', this._storage[src]);

						case 3:
							if (el.complete) {
								_context17.next = 6;
								break;
							}

							_context17.next = 6;
							return regeneratorRuntime.awrap(new Promise(function (resolve) {
								return el.addEventListener('load', function () {
									return resolve();
								});
							}));

						case 6:
							if (!(el.naturalWidth + el.naturalHeight === 0)) {
								_context17.next = 8;
								break;
							}

							return _context17.abrupt('return', -1);

						case 8:
							val = -1, w = el.naturalWidth, h = el.naturalHeight;

							if (!aib.fch) {
								_context17.next = 16;
								break;
							}

							_context17.next = 12;
							return regeneratorRuntime.awrap(downloadImgData(el.src));

						case 12:
							imgData = _context17.sent;

							if (imgData) {
								buffer = imgData.buffer;
							}
							_context17.next = 22;
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
								_context17.next = 27;
								break;
							}

							_context17.next = 25;
							return regeneratorRuntime.awrap(new Promise(function (resolve) {
								return _this50._workers.run([buffer, w, h], [buffer], function (val) {
									return resolve(val);
								});
							}));

						case 25:
							data = _context17.sent;

							if (data && 'hash' in data) {
								val = data.hash;
							}

						case 27:
							this._storage[src] = val;
							return _context17.abrupt('return', val);

						case 29:
						case 'end':
							return _context17.stop();
					}
				}
			}, null, this);
		},
		get _canvas() {
			var val = doc.createElement('canvas');
			Object.defineProperty(this, '_canvas', { value: val });
			return val;
		},
		get _storage() {
			var val = null;
			try {
				val = JSON.parse(sesStorage['de-imageshash']);
			} finally {
				if (!val) {
					val = {};
				}
				Object.defineProperty(this, '_storage', { value: val });
				return val;
			}
		},
		get _workers() {
			var val = new WorkerPool(4, genImgHash, emptyFn);
			Object.defineProperty(this, '_workers', { value: val, configurable: true });
			return val;
		}
	});

	function processImagesLinks(el) {
		var addSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Cfg.imgSrcBtns;
		var delNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Cfg.delImgNames;

		if (!addSrc && !delNames) {
			return;
		}
		for (var i = 0, els = $Q(aib.qImgNameLink, el), len = els.length; i < len; i++) {
			var link = els[i];
			if (/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
				$del(link);
				continue;
			}
			if (link.firstElementChild) {
				continue;
			}
			if (addSrc) {
				link.insertAdjacentHTML('beforebegin', '<svg class="de-btn-src"><use xlink:href="#de-symbol-post-src"/></svg>');
			}
			if (delNames) {
				link.classList.add('de-img-name');
				var text = link.textContent;
				link.textContent = text.split('.').pop();
				link.title = text;
			}
		}
	}

	function embedImagesLinks(el) {
		for (var i = 0, els = $Q(aib.qMsgImgLink, el), len = els.length; i < len; ++i) {
			var link = els[i],
			    url = link.href;
			if (link.parentNode.tagName === 'SMALL' || url.includes('?')) {
				return;
			}
			var a = link.cloneNode(false);
			a.target = '_blank';
			a.innerHTML = '<img class="de-img-pre" src="' + url + '">';
			$before(link, a);
		}
	}

	function genImgHash(data) {
		var buf = new Uint8Array(data[0]);
		var oldw = data[1];
		var oldh = data[2];
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
		for (var _i35 = 0; _i35 < newh; _i35++) {
			for (var _j3 = 0; _j3 < neww; _j3++) {
				var tmp = _i35 / (newh - 1) * (oldh - 1);
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
			key: 'getPostEl',
			value: function getPostEl(i) {
				return aib.fixHTML(this._posts[i]);
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return aib.getPNum(this._posts[i]);
			}
		}, {
			key: 'bannedPostsData',
			value: regeneratorRuntime.mark(function bannedPostsData() {
				var bEls, i, len, bEl, pEl;
				return regeneratorRuntime.wrap(function bannedPostsData$(_context18) {
					while (1) {
						switch (_context18.prev = _context18.next) {
							case 0:
								bEls = $Q(aib.qBan, this._form);
								i = 0, len = bEls.length;

							case 2:
								if (!(i < len)) {
									_context18.next = 9;
									break;
								}

								bEl = bEls[i], pEl = aib.getPostElOfEl(bEl);
								_context18.next = 6;
								return [1, pEl ? aib.getPNum(pEl) : null, doc.adoptNode(bEl)];

							case 6:
								++i;
								_context18.next = 2;
								break;

							case 9:
							case 'end':
								return _context18.stop();
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

	DOMPostsBuilder.fixFileName = function (name, maxLength) {
		var decodedName = name.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		if (decodedName.length > maxLength) {
			return {
				isFixed: true,
				name: decodedName.slice(0, 25).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
			};
		}
		return { isFixed: false, name: name };
	};

	var _4chanPostsBuilder = function () {
		_createClass(_4chanPostsBuilder, null, [{
			key: '_setCustomSpoiler',
			value: function _setCustomSpoiler(board, val) {
				if (!_4chanPostsBuilder._customSpoiler[board] && (val = parseInt(val))) {
					var s = void 0;
					if (board === aib.brd && (s = $q('.imgspoiler'))) {
						_4chanPostsBuilder._customSpoiler.set(board, s.firstChild.src.match(/spoiler(-[a-z0-9]+)\.png$/)[1]);
					}
				} else {
					_4chanPostsBuilder._customSpoiler.set(board, '-' + board + (Math.floor(Math.random() * val) + 1));
				}
			}
		}]);

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
				var data = this._posts[0];
				return $add(aib.fixHTML('<blockquote class="postMessage" id="m' + data.no + '"> ' + data.com + '</blockquote>'));
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
					return '//s.4cdn.org/image/' + id + (window.devicePixelRatio >= 2 ? '@2x.gif' : '.gif');
				};

				var fileHTML = '';
				if (data.filedeleted) {
					fileHTML = '<div id="f' + num + '" class="file"><span class="fileThumb">\n\t\t\t\t<img src="' + _icon('filedeleted-res') + '" class="fileDeletedRes" alt="File deleted.">\n\t\t\t</span></div>';
				} else if (typeof data.filename === 'string') {
					var _DOMPostsBuilder$fixF = DOMPostsBuilder.fixFileName(data.filename, 30),
					    _name2 = _DOMPostsBuilder$fixF.name,
					    needTitle = _DOMPostsBuilder$fixF.isFixed;

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
					fileHTML = '<div class="file" id="f' + num + '">\n\t\t\t\t<div class="fileText" id="fT' + num + '" ' + (isSpoiler ? 'title="' + (data.filename + data.ext) + '"' : '') + '>File: <a href="//i.4cdn.org/' + brd + '/' + (data.tim + data.ext) + '" ' + (needTitle ? 'title="' + (data.filename + data.ext) + '"' : '') + ' target="_blank">' + _name2 + '</a> (' + size + ', ' + (data.ext === '.pdf' ? 'PDF' : data.w + 'x' + data.h) + ')</div>\n\t\t\t\t<a class="fileThumb ' + (isSpoiler ? 'imgSpoiler' : '') + '" href="//i.4cdn.org/' + brd + '/' + (data.tim + data.ext) + '" target="_blank">\n\t\t\t\t\t<img src="' + (isSpoiler ? '//s.4cdn.org/image/spoiler' + _4chanPostsBuilder._customSpoiler.get(brd) || '' + '.png' : '//i.4cdn.org/' + brd + '/' + data.tim + 's.jpg') + '" alt="' + size + '" data-md5="' + data.md5 + '" style="height: ' + data.tn_h + 'px; width: ' + data.tn_w + 'px;">\n\t\t\t\t\t<div data-tip="" data-tip-cb="mShowFull" class="mFileInfo mobile">' + size + ' ' + data.ext.substr(1).toUpperCase() + '</div>\n\t\t\t\t</a>\n\t\t\t</div>';
				}

				var highlight = '',
				    capcodeText = '',
				    capcodeClass = '',
				    capcodeImg = '';
				switch (data.capcode) {
					case 'admin_highlight':
						highlight = ' highlightPost';
					case 'admin':
						capcodeText = '<strong class="capcode hand id_admin" title="Highlight posts by Administrators">## Admin</strong>';
						capcodeClass = 'capcodeAdmin';
						capcodeImg = '<img src="' + _icon('adminicon') + '" alt="This user is a 4chan Administrator." title="This user is a 4chan Administrator." class="identityIcon">';
						break;
					case 'mod':
						capcodeText = '<strong class="capcode hand id_mod" title="Highlight posts by Moderators">## Mod</strong>';
						capcodeClass = 'capcodeMod';
						capcodeImg = '<img src="' + _icon('modicon') + '" alt="This user is a 4chan Moderator." title="This user is a 4chan Moderator." class="identityIcon">';
						break;
					case 'developer':
						capcodeText = '<strong class="capcode hand id_developer" title="Highlight posts by Developers">## Developer</strong>';
						capcodeClass = 'capcodeDeveloper';
						capcodeImg = '<img src="' + _icon('developericon') + '" alt="This user is a 4chan Developer." title="This user is a 4chan Developer." class="identityIcon">';
						break;
					case 'manager':
						capcodeText = '<strong class="capcode hand id_manager" title="Highlight posts by Managers">## Manager</strong>';
						capcodeClass = 'capcodeManager';
						capcodeImg = '<img src="' + _icon('managericon') + '" alt="This user is a 4chan Manager." title="This user is a 4chan Manager." class="identityIcon">';
						break;
					case 'founder':
						capcodeText = '<strong class="capcode hand id_admin" title="Highlight posts by the Founder">## Founder</strong>';
						capcodeClass = ' capcodeAdmin';
						capcodeImg = '<img src="' + _icon('foundericon') + '" alt="This user is 4chan\'s Founder." title="This user is 4chan\'s Founder." class="identityIcon">';
						break;
				}

				var name = data.name || '';

				return '<div class="postContainer replyContainer" id="pc' + num + '">\n\t\t\t<div class="sideArrows" id="sa' + num + '">&gt;&gt;</div>\n\t\t\t<div id="p' + num + '" class="post ' + (i === -1 ? 'op' : 'reply') + ' ' + highlight + '">\n\t\t\t\t<div class="postInfoM mobile" id="pim' + num + '">\n\t\t\t\t\t<span class="nameBlock ' + capcodeClass + '">\n\t\t\t\t\t\t' + (name.length > 30 ? '<span class="name" data-tip data-tip-cb="mShowFull">' + name.substring(30) + '(…)</span>' : '<span class="name">' + name + '</span>') + '\n\t\t\t\t\t\t' + (data.trip ? '<span class="postertrip">' + data.trip + '</span>' : '') + '\n\t\t\t\t\t\t' + capcodeText + '\n\t\t\t\t\t\t' + capcodeImg + '\n\t\t\t\t\t\t' + (data.id && !data.capcode ? '<span class="posteruid id_' + data.id + '">(ID: <span class="hand" title="Highlight posts by this ID">' + data.id + '</span>)</span>' : '') + '\n\t\t\t\t\t\t' + (data.country ? '<span title="' + data.country_name + '" class="flag flag-' + data.country.toLowerCase() + '"></span>' : '') + '\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<span class="subject">' + (data.sub || '') + '</span>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="dateTime postNum" data-utc="' + data.time + '">' + data.now + ' <a href="#p' + num + '" title="Link to this post">No.</a><a href="javascript:quote(\'' + num + '\');" title="Reply to this post">' + num + '</a></span>\n\t\t\t\t</div>\n\t\t\t\t<div class="postInfo desktop" id="pi' + num + '">\n\t\t\t\t\t<input name="' + num + '" value="delete" type="checkbox">\n\t\t\t\t\t<span class="subject">' + (data.sub || '') + '</span>\n\t\t\t\t\t<span class="nameBlock ' + capcodeClass + '">\n\t\t\t\t\t\t' + (data.email ? '<a href="mailto:' + data.email.replace(/ /g, '%20') + '" class="useremail">' : '') + '\n\t\t\t\t\t\t\t<span class="name">' + name + '</span>\n\t\t\t\t\t\t\t' + (data.trip ? '<span class="postertrip">' + data.trip + '</span>' : '') + '\n\t\t\t\t\t\t\t' + capcodeText + '\n\t\t\t\t\t\t' + (data.email ? '</a>' : '') + '\n\t\t\t\t\t\t' + capcodeImg + '\n\t\t\t\t\t\t' + (data.id && !data.capcode ? '<span class="posteruid id_' + data.id + '">(ID: <span class="hand" title="Highlight posts by this ID">' + data.id + '</span>)</span>' : '') + '\n\t\t\t\t\t\t' + (data.country ? '<span title="' + data.country_name + '" class="flag flag-' + data.country.toLowerCase() + '"></span>' : '') + '\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="dateTime" data-utc="' + data.time + '">' + data.now + '</span>\n\t\t\t\t\t<span class="postNum desktop"><a href="#p' + num + '" title="Link to this post">No.</a><a href="javascript:quote(\'' + num + '\');" title="Reply to this post">' + num + '</a></span>\n\t\t\t\t</div>\n\t\t\t\t' + fileHTML + '\n\t\t\t\t<blockquote class="postMessage" id="m' + num + '"> ' + (data.com || '') + '</blockquote>\n\t\t\t</div>\n\t\t</div>';
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return this._posts[i + 1].no;
			}
		}, {
			key: 'bannedPostsData',
			value: regeneratorRuntime.mark(function bannedPostsData() {
				return regeneratorRuntime.wrap(function bannedPostsData$(_context19) {
					while (1) {
						switch (_context19.prev = _context19.next) {
							case 0:
							case 'end':
								return _context19.stop();
						}
					}
				}, bannedPostsData, this);
			})
		}, {
			key: 'isClosed',
			get: function get() {
				return !!(this._posts[0].closed || this._posts[0].archived);
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
				for (var _iterator26 = data.files, _isArray26 = Array.isArray(_iterator26), _i36 = 0, _iterator26 = _isArray26 ? _iterator26 : _iterator26[Symbol.iterator]();;) {
					var _ref48;

					if (_isArray26) {
						if (_i36 >= _iterator26.length) break;
						_ref48 = _iterator26[_i36++];
					} else {
						_i36 = _iterator26.next();
						if (_i36.done) break;
						_ref48 = _i36.value;
					}

					var file = _ref48;

					var fileName = void 0,
					    fullFileName = void 0;
					var thumb = file.thumb;
					var thumb_w = 200;
					var thumb_h = 200;
					var ext = file.src.split('.').pop();
					if (brd === 'b' || brd === 'rf') {
						fileName = fullFileName = thumb.split('/').pop();
					} else {
						fileName = fullFileName = file.src.split('/').pop();
						if (multiFile && fileName.length > 20) {
							fileName = fileName.substr(0, 20 - ext.length) + '(…)' + ext;
						}
					}
					var max_rating = 'r15'; 
					if (file.rating === 'r-18g' && max_rating !== 'r-18g') {
						thumb = "images/r-18g.png";
					} else if (file.rating === 'r-18' && (max_rating !== 'r-18g' || max_rating !== 'r-18')) {
						thumb = "images/r-18.png";
					} else if (file.rating === 'r-15' && max_rating === 'sfw') {
						thumb = "images/r-15.png";
					} else if (file.rating === 'illegal') {
						thumb = "images/illegal.png";
					} else {
						thumb_w = file.thumb_width;
						thumb_h = file.thumb_height;
					}
					var fileInfo = '<div class="fileinfo' + (multiFile ? ' limited' : '') + '">\u0424\u0430\u0439\u043B:\n\t\t\t\t<a href="/' + file.src + '" title="' + fullFileName + '" target="_blank">' + fileName + '</a><br>\n\t\t\t\t<em>' + ext + ', ' + prettifySize(file.size) + ', ' + file.metadata.width + 'x' + file.metadata.height + '</em>' + (multiFile ? '' : ' - Нажмите на картинку для увеличения') + '<br>\n\t\t\t\t<a class="edit_ icon" href="/utils/image/edit/' + file.file_id + '/' + num + '">\n\t\t\t\t\t<img title="edit" alt="edit" src="/images/blank.png">\n\t\t\t\t</a>\n\t\t\t</div>';
					filesHTML += (multiFile ? '' : fileInfo) + '\n\t\t\t<div id="file_' + num + '_' + file.file_id + '" class="file">' + (multiFile ? fileInfo : '') + '\n\t\t\t\t<a href="/' + file.src + '" target="_blank">\n\t\t\t\t\t<img class="thumb" src="/' + thumb + '" width="' + thumb_w + '" height="' + thumb_h + '">\n\t\t\t\t</a>\n\t\t\t</div>';
				}

				var date = data.date.replace(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/, function (_, y, mo, d, h, m, s) {
					var dt = new Date(y, +mo - 1, d, h, m, s);
					return pad2(dt.getDate()) + ' ' + Lng.fullMonth[1][dt.getMonth()] + ' ' + dt.getFullYear() + ' (' + Lng.week[1][dt.getDay()] + ') ' + pad2(dt.getHours()) + ':' + pad2(dt.getMinutes());
				});

				var isOp = i === -1;
				return (isOp ? '<div id="post_' + num + '" class="oppost post">' : '<table id="post_' + num + '" class="replypost post"><tbody><tr>\n\t\t\t<td class="doubledash">&gt;&gt;</td>\n\t\t\t<td class="reply" id="reply' + num + '">') + '\n\t\t\t\t<a name="i' + num + '"></a>\n\t\t\t\t<label>\n\t\t\t\t\t<input name="' + num + '" value="' + data.thread_id + '" class="delete_checkbox" id="delbox_' + num + '" type="checkbox">\n\t\t\t\t\t' + (data.subject ? '<span class="replytitle">' + data.subject + '</span>' : '') + '\n\t\t\t\t\t<span class="postername">' + (data.name || 'Анонимус') + '</span> ' + date + '\n\t\t\t\t</label>\n\t\t\t\t<span class="reflink">\n\t\t\t\t\t<a href="/' + brd + '/res/' + data.thread_id + '.xhtml#i' + num + '"> No.' + num + '</a>\n\t\t\t\t</span><br>\n\t\t\t\t' + filesHTML + '\n\t\t\t\t' + (multiFile ? '<div style="clear: both;"></div>' : '') + '\n\t\t\t\t<div class="postbody"> ' + data.message_html + '</div>\n\t\t\t' + (isOp ? '</div>' : '</td></tr></tbody></table>');
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return this._posts[i + 1].display_id;
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
					filesHTML = '<div class="images ' + (data.files.length === 1 ? 'images-single' : 'images-multi') + '">';
					for (var _iterator27 = data.files, _isArray27 = Array.isArray(_iterator27), _i37 = 0, _iterator27 = _isArray27 ? _iterator27 : _iterator27[Symbol.iterator]();;) {
						var _ref49;

						if (_isArray27) {
							if (_i37 >= _iterator27.length) break;
							_ref49 = _iterator27[_i37++];
						} else {
							_i37 = _iterator27.next();
							if (_i37.done) break;
							_ref49 = _i37.value;
						}

						var file = _ref49;

						var imgId = num + '-' + file.md5;
						var fullName = file.fullname || file.name;
						var dispName = file.displayname || file.name;
						var isWebm = fullName.substr(-5) === '.webm';
						filesHTML += '<figure class="image">\n\t\t\t\t\t<figcaption class="file-attr">\n\t\t\t\t\t\t<a id="title-' + imgId + '" class="desktop" target="_blank" href="' + file.path + '"' + (dispName === fullName ? '' : ' title="' + fullName + '"') + '>' + dispName + '</a>\n\t\t\t\t\t\t<span class="filesize">(' + file.size + '\u041A\u0431, ' + file.width + 'x' + file.height + (isWebm ? ', ' + file.duration : '') + ')</span>\n\t\t\t\t\t</figcaption>\n\t\t\t\t\t<div id="exlink-' + imgId + '" class="image-link">\n\t\t\t\t\t\t<a href="' + file.path + '">\n\t\t\t\t\t\t\t<img src="' + file.thumbnail + '" width="' + file.tn_width + '" height="' + file.tn_height + '" alt="' + file.size + '" class="img preview' + (isWebm ? ' webm-file' : '') + '">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</figure>';
					}
					filesHTML += '</div>';
				} else if (data.video) {
					filesHTML = '<div class="images">\n\t\t\t\t<div style="float: left; margin: 5px; margin-right:10px">\n\t\t\t\t\t' + post.video + '\n\t\t\t\t</div>\n\t\t\t</div>';
				}

				return '<div id="post-' + num + '" class="post-wrapper">\n\t\t\t<div class="post ' + (i === -1 ? 'oppost' : 'reply') + '" id="post-body-' + num + '" data-num="' + num + '">\n\t\t\t\t<div id="post-details-' + num + '" class="post-details">\n\t\t\t\t\t<input type="checkbox" name="delete" value="' + num + '">\n\t\t\t\t\t' + (!data.subject ? '' : '<span class="post-title">' + (data.subject + (data.tags ? ' /' + data.tags + '/' : '')) + '</span>') + '\n\t\t\t\t\t' + (data.email ? '<a href="' + data.email + '" class="post-email">' + data.name + '</a>' : '<span class="ananimas">' + data.name + '</span>') + '\n\t\t\t\t\t' + (data.icon ? '<span class="post-icon">' + data.icon + '</span>' : '') + '\n\t\t\t\t\t<span class="' + (!data.trip ? '' : _switch(data.trip, {
					'!!%adm%!!': 'adm">## Abu ##',
					'!!%mod%!!': 'mod">## Mod ##',
					'!!%Inquisitor%!!': 'inquisitor">## Applejack ##',
					'!!%coder%!!': 'mod">## Кодер ##',
					'@@default': 'postertrip">' + data.trip
				})) + '</span>\n\t\t\t\t\t' + (data.op === 1 ? '<span class="ophui"># OP</span>&nbsp;' : '') + '\n\t\t\t\t\t<span class="posttime-reflink">\n\t\t\t\t\t\t<span class="posttime">' + data.date + '&nbsp;</span>\n\t\t\t\t\t\t<span class="reflink">\n\t\t\t\t\t\t\t<a href="/' + brd + '/res/' + (parseInt(data.parent) || num) + '.html#' + num + '">\u2116</a><a href="/' + brd + '/res/' + (parseInt(data.parent) || num) + '.html#' + num + '" class="postbtn-reply-href" name="' + num + '">' + num + '</a>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</span>\n\t\t\t\t\t' + (this._brd === 'po' ? '<div id="like-div' + num + '" class="like-div">\n\t\t\t\t\t\t\t<span class="like-icon"><i class="fa fa-bolt"></i></span>\n\t\t\t\t\t\t\t<span class="like-caption">\u0414\u0432\u0430\u0447\u0443\u044E</span>\n\t\t\t\t\t\t\t<span id="like-count' + num + '" class="like-count">' + (data.likes || '') + '</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="dislike-div' + num + '" class="dislike-div">\n\t\t\t\t\t\t\t<span class="dislike-icon"><i class="fa fa-thumbs-down"></i></span>\n\t\t\t\t\t\t\t<span class="dislike-caption">RRRAGE!</span>\n\t\t\t\t\t\t\t<span id="dislike-count' + num + '" class="dislike-count">' + (data.dislikes || '') + '</span>\n\t\t\t\t\t\t</div>' : '') + '\n\t\t\t\t</div>\n\t\t\t\t' + filesHTML + '\n\t\t\t\t' + this._getPostMsg(data) + '\n\t\t\t</div>\n\t\t</div>';
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return this._posts[i + 1].num;
			}
		}, {
			key: 'bannedPostsData',
			value: regeneratorRuntime.mark(function bannedPostsData() {
				var _iterator28, _isArray28, _i38, _ref50, _post4;

				return regeneratorRuntime.wrap(function bannedPostsData$(_context21) {
					while (1) {
						switch (_context21.prev = _context21.next) {
							case 0:
								_iterator28 = this._posts, _isArray28 = Array.isArray(_iterator28), _i38 = 0, _iterator28 = _isArray28 ? _iterator28 : _iterator28[Symbol.iterator]();

							case 1:
								if (!_isArray28) {
									_context21.next = 7;
									break;
								}

								if (!(_i38 >= _iterator28.length)) {
									_context21.next = 4;
									break;
								}

								return _context21.abrupt('break', 23);

							case 4:
								_ref50 = _iterator28[_i38++];
								_context21.next = 11;
								break;

							case 7:
								_i38 = _iterator28.next();

								if (!_i38.done) {
									_context21.next = 10;
									break;
								}

								return _context21.abrupt('break', 23);

							case 10:
								_ref50 = _i38.value;

							case 11:
								_post4 = _ref50;
								_context21.t0 = _post4.banned;
								_context21.next = _context21.t0 === 1 ? 15 : _context21.t0 === 2 ? 18 : 21;
								break;

							case 15:
								_context21.next = 17;
								return [1, _post4.num, $add('<span class="pomyanem">(Автор этого поста был забанен. Помянем.)</span>')];

							case 17:
								return _context21.abrupt('break', 21);

							case 18:
								_context21.next = 20;
								return [2, _post4.num, $add('<span class="pomyanem">(Автор этого поста был предупрежден.)</span>')];

							case 20:
								return _context21.abrupt('break', 21);

							case 21:
								_context21.next = 1;
								break;

							case 23:
							case 'end':
								return _context21.stop();
						}
					}
				}, bannedPostsData, this);
			})
		}, {
			key: '_getPostMsg',
			value: function _getPostMsg(data) {
				var _switch = function _switch(val, obj) {
					return val in obj ? obj[val] : obj['@@default'];
				};
				var comment = data.comment.replace(/<script /ig, '<!--<textarea ').replace(/<\/script>/ig, '</textarea>-->');
				return '<blockquote id="m' + data.num + '" class="post-message">\n\t\t\t' + comment + '\n\t\t\t' + _switch(data.banned, {
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
		function _0chanPostsBuilder(json, brd) {
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
			key: 'getPostEl',
			value: function getPostEl(i) {
				return $add(aib.fixHTML(this.getPostHTML(i)));
			}
		}, {
			key: 'getPostHTML',
			value: function getPostHTML(i) {
				var data = this._posts[i + 1];
				var num = data.id;
				var brd = data.boardDir;
				var parId = data.parentId;
				var isOp = i === -1;
				var filesHTML = '';
				if (data.attachments.length) {
					filesHTML += '<div class="post-attachments">';
					for (var _iterator29 = data.attachments, _isArray29 = Array.isArray(_iterator29), _i39 = 0, _iterator29 = _isArray29 ? _iterator29 : _iterator29[Symbol.iterator]();;) {
						var _ref51;

						if (_isArray29) {
							if (_i39 >= _iterator29.length) break;
							_ref51 = _iterator29[_i39++];
						} else {
							_i39 = _iterator29.next();
							if (_i39.done) break;
							_ref51 = _i39.value;
						}

						var file = _ref51;

						var id = file.id;
						var img = file.images;
						var orig = img.original;
						var thumb200 = img.thumb_200px;
						var thumb400 = img.thumb_400px;
						filesHTML += '<figure class="post-img"><span>\n\t\t\t\t\t<figcaption>\n\t\t\t\t\t\t<span class="pull-left">' + orig.width + 'x' + orig.height + ', ' + orig.size_kb + '\u041A\u0431</span>\n\t\t\t\t\t</figcaption>\n\t\t\t\t\t<a href="' + orig.url + '" target="_blank"><img src="' + thumb200.url + '" srcset="' + thumb400.url + ' 2x" class="post-img-thumbnail" style="width: ' + thumb200.width + 'px; height: ' + thumb200.height + 'px;"></a>\n\t\t\t\t</span></figure>';
					}
					filesHTML += '</div>';
				}

				var d = new Date(data.date * 1e3);
				var date = d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
				return '<div><div class="block post' + (isOp ? ' post-op' : '') + '">\n\t\t\t<div class="post-header">\n\t\t\t\t<a name="' + num + '"></a>\n\t\t\t\t<span class="post-id">\n\t\t\t\t\t<a href="/' + brd + '" class="router-link-active">/' + brd + '/</a>\n\t\t\t\t\t' + (isOp ? '<span>\u2014 ' + this._json.thread.board.name + ' \u2014</span>' : '') + '\n\t\t\t\t\t<a href="/' + brd + '/' + (data.threadId + (isOp ? '' : '#' + num)) + '">#' + num + '</a>\n\t\t\t\t</span>\n\t\t\t\t<span class="pull-right">\n\t\t\t\t\t<span class="post-thread-options"></span>\n\t\t\t\t\t<span class="post-date">' + date + '</span>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class="post-body' + (data.attachments.length > 1 ? '' : ' post-inline-attachment') + '">\n\t\t\t\t' + filesHTML + '\n\t\t\t\t<div class="post-body-message">\n\t\t\t\t\t' + (parId === this._json.posts[0].id ? '' : '<div class="post-parent"><a data-post="' + parId + '" href="/' + brd + '/' + data.threadId + '#' + parId + '">&gt;&gt;' + parId + '</a></div>') + '\n\t\t\t\t\t<div> ' + (data.messageHtml || '') + '</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="post-footer"></div>\n\t\t</div></div>';
			}
		}, {
			key: 'getPNum',
			value: function getPNum(i) {
				return +this._posts[i + 1].id; 
			}
		}]);

		return _0chanPostsBuilder;
	}();


	var RefMap = function () {
		_createClass(RefMap, null, [{
			key: 'gen',
			value: function gen(posts, thrURL) {
				var opNums = DelForm.tNums;
				for (var _iterator30 = posts, _isArray30 = Array.isArray(_iterator30), _i40 = 0, _iterator30 = _isArray30 ? _iterator30 : _iterator30[Symbol.iterator]();;) {
					var _ref52;

					if (_isArray30) {
						if (_i40 >= _iterator30.length) break;
						_ref52 = _iterator30[_i40++];
					} else {
						_i40 = _iterator30.next();
						if (_i40.done) break;
						_ref52 = _i40.value;
					}

					var _ref53 = _ref52,
					    _ref54 = _slicedToArray(_ref53, 2),
					    pNum = _ref54[0],
					    _post5 = _ref54[1];

					var links = $Q('a', _post5.msg);
					for (var lNum, i = 0, len = links.length; i < len; ++i) {
						var link = links[i];
						var tc = link.textContent;
						if (tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
							continue;
						}
						if (MyPosts.has(lNum)) {
							link.classList.add('de-ref-my');
							_post5.el.classList.add('de-reply-post');
						}
						if (!posts.has(lNum)) {
							continue;
						}
						var ref = posts.get(lNum).ref;
						if (ref._inited) {
							ref.add(_post5, pNum);
						} else {
							ref._set.add(pNum);
							ref.hasMap = true;
						}
						if (!aib.hasOPNum && opNums.has(lNum)) {
							link.classList.add('de-ref-op');
						}
						if (thrURL) {
							var url = link.getAttribute('href');
							if (url[0] === '#') {
								link.setAttribute('href', thrURL + url);
							}
						}
					}
				}
			}
		}, {
			key: 'init',
			value: function init(form) {
				var post = form.firstThr && form.firstThr.op;
				if (post && Cfg.linksNavig) {
					this.gen(pByNum, '');
					var strNums = Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null;
					for (; post; post = post.next) {
						if (post.ref.hasMap) {
							post.ref.init('', strNums);
						}
					}
				}
			}
		}, {
			key: 'upd',
			value: function upd(post, isAdd) {
				var pNum = post.num;
				var strNums = isAdd && Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null;
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
					if (isAdd) {
						if (strNums && strNums.has(lNum)) {
							link.classList.add('de-link-hid');
						}
						if (!aib.hasOPNum && DelForm.tNums.has(lNum)) {
							link.classList.add('de-ref-op');
						}
						lPost.ref.add(post, pNum, strNums && strNums.has(pNum));
					} else {
						lPost.ref.remove(pNum);
					}
				}
			}
		}]);

		function RefMap(post) {
			_classCallCheck(this, RefMap);

			this.hasMap = false;
			this._hidden = false;
			this._inited = false;
			this._post = post;
			this._set = new Set();
		}

		_createClass(RefMap, [{
			key: 'add',
			value: function add(post, num) {
				var isHidden = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

				if (isHidden === null) {
					var strNums = Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null;
					isHidden = strNums ? strNums.has(+num) : false;
				}
				if (!this._set.has(num)) {
					this._set.add(num);
					this._el.insertAdjacentHTML('beforeend', this._getHTML(num, '', isHidden));
					if (Cfg.hideRefPsts && this._post.hidden) {
						post.setVisib(true, 'reference to >>' + num);
						post.ref.hide();
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
			key: 'hide',
			value: function hide() {
				var isForced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (!isForced && !Cfg.hideRefPsts || !this.hasMap || this._hidden) {
					return;
				}
				this._hidden = true;
				for (var _iterator31 = this._set, _isArray31 = Array.isArray(_iterator31), _i41 = 0, _iterator31 = _isArray31 ? _iterator31 : _iterator31[Symbol.iterator]();;) {
					var _ref55;

					if (_isArray31) {
						if (_i41 >= _iterator31.length) break;
						_ref55 = _iterator31[_i41++];
					} else {
						_i41 = _iterator31.next();
						if (_i41.done) break;
						_ref55 = _i41.value;
					}

					var num = _ref55;

					var pst = pByNum.get(num);
					if (pst && !pst.hidden) {
						if (isForced) {
							pst.setUserVisib(true, true, 'reference to >>' + this._post.num);
							pst.ref.hide(true);
						} else if (!pst.userToggled) {
							pst.setVisib(true, 'reference to >>' + this._post.num);
							pst.ref.hide();
						}
					}
				}
			}
		}, {
			key: 'init',
			value: function init(tUrl, strNums) {
				var html = '';
				for (var _iterator32 = this._set, _isArray32 = Array.isArray(_iterator32), _i42 = 0, _iterator32 = _isArray32 ? _iterator32 : _iterator32[Symbol.iterator]();;) {
					var _ref56;

					if (_isArray32) {
						if (_i42 >= _iterator32.length) break;
						_ref56 = _iterator32[_i42++];
					} else {
						_i42 = _iterator32.next();
						if (_i42.done) break;
						_ref56 = _i42.value;
					}

					var num = _ref56;

					html += this._getHTML(num, tUrl, strNums && strNums.has(num));
				}
				this._createEl(html, false);
				this._inited = true;
			}
		}, {
			key: 'makeUnion',
			value: function makeUnion(oRef) {
				this._set = new Set([].concat(_toConsumableArray(this._set), _toConsumableArray(oRef._set)).sort(function (a, b) {
					return a - b;
				}));
			}
		}, {
			key: 'remove',
			value: function remove(num) {
				this._set['delete'](num);
				if (this._set.size === 0) {
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
			key: 'unhide',
			value: function unhide() {
				var isForced = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (this._hidden && !this.hasMap) {
					return;
				}
				this._hidden = false;
				for (var _iterator33 = this._set, _isArray33 = Array.isArray(_iterator33), _i43 = 0, _iterator33 = _isArray33 ? _iterator33 : _iterator33[Symbol.iterator]();;) {
					var _ref57;

					if (_isArray33) {
						if (_i43 >= _iterator33.length) break;
						_ref57 = _iterator33[_i43++];
					} else {
						_i43 = _iterator33.next();
						if (_i43.done) break;
						_ref57 = _i43.value;
					}

					var num = _ref57;

					var pst = pByNum.get(num);
					if (pst && pst.hidden && !pst.spellHidden) {
						if (isForced) {
							pst.setUserVisib(false);
							pst.ref.unhide(true);
						} else if (!pst.userToggled) {
							pst.setVisib(false);
							pst.ref.unhide();
						}
					}
				}
			}
		}, {
			key: '_createEl',
			value: function _createEl(innerHTML, isHidden) {
				var el,
				    msg = this._post.msg,
				    html = '<div class="de-refmap' + (isHidden ? ' de-post-hiddencontent' : '') + '">' + innerHTML + '</div>';
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
					this._createEl('', this._post.hidden);
					value = $q('.de-refmap', this._post.el);
				}
				Object.defineProperty(this, '_el', { configurable: true, value: value });
				return value;
			}
		}]);

		return RefMap;
	}();


	var Thread = function () {
		_createClass(Thread, null, [{
			key: 'removeSavedData',
			value: function removeSavedData(brd, num) {
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

		function Thread(el, num, prev, form) {
			var _this51 = this;

			_classCallCheck(this, Thread);

			var els = $Q(aib.qRPost, el),
			    len = els.length,
			    omt = aib.t ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
			this.hasNew = false;
			this.hidden = false;
			this.hidCounter = 0;
			this.loadCount = 0;
			this.next = null;
			this.num = num;
			this.thrId = aib.thrId ? aib.thrId(el) : num;
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
			for (var i = 0; i < len; i++) {
				var pEl = els[i];
				lastPost = new Post(pEl, this, aib.getPNum(pEl), omt + i, false, lastPost);
			}
			this.last = lastPost;
			el.style.counterReset = 'de-cnt ' + omt;
			el.setAttribute('de-thread', null);
			visPosts = Math.max(visPosts, len);
			if (aib.tiny) {
				var temp = el.lastChild;
				if (temp !== this.op.el) {
					$after(el, temp);
				}
				$del($q('.clear', el));
			}
			if (!aib.t) {
				this.btns = $bEnd(el, '<div class="de-thread-buttons">' + '<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>]</span></div>');
				var updBtn = this.btns.firstChild;
				updBtn.onclick = function (e) {
					$pd(e);
					_this51.loadPosts('new');
				};
				if (Cfg.hideReplies) {
					var repBtn = $bEnd(this.btns, ' <span class="de-replies-btn">[<a class="de-abtn" href="#"></a>]</span>');
					repBtn.onclick = function (e) {
						$pd(e);
						var nextCoord = !_this51.next || _this51.last.omitted ? null : _this51.next.top;
						_this51._toggleReplies(repBtn, updBtn);
						if (nextCoord) {
							scrollTo(window.pageXOffset, windows.pageYOffset + _this51.next.top - nextCoord);
						}
					};
					this._toggleReplies(repBtn, updBtn);
				}
			}
		}

		_createClass(Thread, [{
			key: 'deletePost',
			value: function deletePost(post, delAll, removePost) {
				SpellsRunner.cachedData = null;
				var count = 0,
				    idx = post.count;
				do {
					if (removePost && this.last === post) {
						this.last = post.prev;
					}
					post['delete'](removePost);
					post = post.nextNotDeleted;
					count++;
				} while (delAll && post);
				for (var tPost = post; tPost; tPost = tPost.nextInThread) {
					tPost.count -= count;
				}
				this.pcount -= count;
				return post;
			}

		}, {
			key: 'loadPosts',
			value: function loadPosts(task) {
				var _this52 = this;

				var isSmartScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var isInformUser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

				if (isInformUser) {
					$popup('load-thr', Lng.loading[lang], true);
				}
				return ajaxPostsLoad(aib.b, this.thrId, false).then(function (pBuilder) {
					return _this52._loadFromBuilder(task, isSmartScroll, pBuilder);
				}, function (e) {
					return $popup('load-thr', getErrorMessage(e));
				});
			}

		}, {
			key: 'loadNewPosts',
			value: function loadNewPosts() {
				var _this53 = this;

				return ajaxPostsLoad(aib.b, this.thrId, true).then(function (pBuilder) {
					return pBuilder ? _this53._loadNewFromBuilder(pBuilder) : { newCount: 0, locked: false };
				});
			}
		}, {
			key: 'setFavorState',
			value: function setFavorState(val, type) {
				var _this54 = this;

				this.op.setFavBtn(val);
				readFavorites().then(function (fav) {
					var b = aib.b;
					var h = aib.host;
					var num = _this54.thrId;
					if (val) {
						if (!fav[h]) {
							fav[h] = {};
						}
						if (!fav[h][b]) {
							fav[h][b] = {};
						}
						fav[h][b].url = aib.prot + '//' + aib.host + aib.getPageUrl(b, 0);
						fav[h][b][num] = {
							'cnt': _this54.pcount,
							'new': 0,
							'you': 0,
							'txt': _this54.op.title,
							'url': aib.getThrUrl(b, num),
							'last': aib.anchor + _this54.last.num,
							'type': type
						};
					} else {
						removeFavoriteEntry(fav, h, b, num);
					}
					saveFavorites(fav);
				});
			}
		}, {
			key: 'updateHidden',
			value: function updateHidden(data) {
				var thr = this;
				do {
					var realHid = data ? data.hasOwnProperty(thr.num) : false;
					if (thr.hidden ^ realHid) {
						if (realHid) {
							thr.op.setUserVisib(true, false);
							data[thr.num] = thr.op.title;
						} else if (thr.hidden) {
							thr.op.setUserVisib(false, false);
						}
					}
				} while (thr = thr.next);
			}
		}, {
			key: '_addPost',
			value: function _addPost(parent, el, i, prev, maybeVParser) {
				var post,
				    num = aib.getPNum(el),
				    wrap = doc.adoptNode(aib.getPostWrap(el, false));
				post = new Post(el, this, num, i, false, prev);
				parent.appendChild(wrap);
				if (aib.t && !doc.hidden && Cfg.animation) {
					$animate(post.el, 'de-post-new');
				}
				if (this.userTouched.has(num)) {
					post.setUserVisib(this.userTouched.get(num), false);
					this.userTouched['delete'](num);
				}
				if (maybeVParser.value) {
					maybeVParser.value.parse(post);
				}
				processImagesLinks(el);
				post.addFuncs();
				preloadImages(post);
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
				for (var _iterator34 = pBuilder.bannedPostsData(), _isArray34 = Array.isArray(_iterator34), _i44 = 0, _iterator34 = _isArray34 ? _iterator34 : _iterator34[Symbol.iterator]();;) {
					var _ref58;

					if (_isArray34) {
						if (_i44 >= _iterator34.length) break;
						_ref58 = _iterator34[_i44++];
					} else {
						_i44 = _iterator34.next();
						if (_i44.done) break;
						_ref58 = _i44.value;
					}

					var _ref59 = _ref58,
					    _ref60 = _slicedToArray(_ref59, 3),
					    banId = _ref60[0],
					    bNum = _ref60[1],
					    bEl = _ref60[2];

					var _post6 = bNum ? pByNum.get(bNum) : this.op;
					if (_post6 && _post6.banned !== banId) {
						$del($q(aib.qBan, _post6.el));
						_post6.msg.appendChild(bEl);
						_post6.banned = banId;
					}
				}
			}
		}, {
			key: '_toggleReplies',
			value: function _toggleReplies(repBtn, updBtn) {
				var isHide = !this.last.omitted;
				for (var i = 0, post = this.op; post !== this.last; i++) {
					post = post.next;
					if (isHide) {
						post.wrap.classList.add('de-hidden');
						post.omitted = true;
					} else {
						post.wrap.classList.remove('de-hidden');
						post.omitted = false;
					}
				}
				repBtn.firstElementChild.className = 'de-abtn ' + (isHide ? 'de-replies-show' : 'de-replies-hide');
				$toggle(updBtn, !isHide);
				var colBtn = $q('.de-thread-collapse', this.el);
				if (colBtn) {
					$toggle(colBtn, !isHide);
				}
				$del($q(aib.qOmitted + ', .de-omitted', this.el));
				i = this.pcount - 1 - (isHide ? 0 : i);
				if (i) {
					this.op.el.insertAdjacentHTML('afterend', '<span class="de-omitted">' + i + '</span> ');
				}
			}
		}, {
			key: '_importPosts',
			value: function _importPosts(last, pBuilder, begin, end, maybeVParser, maybeSpells) {
				var fragm,
				    newCount = end - begin,
				    newVisCount = newCount,
				    nums = [];
				if (aib.jsonBuilder && nav.hasTemplate) {
					var temp = document.createElement('template');
					var html = [];
					for (var i = begin; i < end; ++i) {
						html.push(pBuilder.getPostHTML(i));
						nums.push(pBuilder.getPNum(i));
					}
					temp.innerHTML = aib.fixHTML(html.join(''));
					fragm = temp.content;
					var _posts = $Q(aib.qRPost, fragm);
					for (var _i45 = 0, _len9 = _posts.length; _i45 < _len9; ++_i45) {
						last = this._addPost(fragm, _posts[_i45], begin + _i45 + 1, last, maybeVParser);
						newVisCount -= maybeSpells.value.run(last);
					}
				} else {
					fragm = doc.createDocumentFragment();
					for (; begin < end; ++begin) {
						last = this._addPost(fragm, pBuilder.getPostEl(begin), begin + 1, last, maybeVParser);
						nums.push(last.num);
						newVisCount -= maybeSpells.value.run(last);
					}
				}
				return [newCount, newVisCount, fragm, last, nums];
			}
		}, {
			key: '_loadFromBuilder',
			value: function _loadFromBuilder(last, smartScroll, pBuilder) {
				var _this55 = this;

				var nextCoord,
				    maybeSpells = new Maybe(SpellsRunner),
				    op = this.op,
				    thrEl = this.el;
				if (smartScroll) {
					if (this.next) {
						nextCoord = this.next.top;
					} else {
						smartScroll = false;
					}
				}
				pr.closeReply();
				$del($q(aib.qOmitted + ', .de-omitted', thrEl));
				if (this.loadCount === 0) {
					if (op.trunc) {
						op.updateMsg(pBuilder.getOpMessage(), maybeSpells.value);
					}
					op.ref.removeMap();
				}
				this.loadCount++;
				this._parsePosts(pBuilder);
				var needToHide,
				    needToOmit,
				    needToShow,
				    post = op.next,
				    needRMUpdate = false,
				    existed = this.pcount === 1 ? 0 : this.pcount - post.count;
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
						post.omitted = true;
						post = post.next;
					}
				} else {
					var nonExisted = pBuilder.length - existed,
					    maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null),
					    iprv = this._importPosts(op, pBuilder, Math.max(0, nonExisted + existed - needToShow), nonExisted, maybeVParser, maybeSpells);

					var _iprv = _slicedToArray(iprv, 5),
					    fragm = _iprv[2],
					    _last = _iprv[3],
					    nums = _iprv[4];

					maybeVParser.end();
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
					if (post.omitted) {
						post.wrap.classList.remove('de-hidden');
						post.omitted = false;
					}
					if (needRMUpdate) {
						RefMap.upd(post, true);
					}
					post = post.next;
				}
				maybeSpells.end();
				thrEl.style.counterReset = 'de-cnt ' + (needToOmit - needToHide + 1);
				var btn = this.btns;
				if (btn !== thrEl.lastChild) {
					thrEl.appendChild(btn);
				}
				if (!$q('.de-thread-collapse', btn)) {
					$bEnd(btn, '<span class="de-thread-collapse"> [<a class="de-abtn" href="' + aib.getThrUrl(aib.b, this.thrId) + '"></a>]</span>').onclick = function (e) {
						$pd(e);
						_this55.loadPosts(visPosts, true);
					};
				}
				if (needToShow > visPosts) {
					navPanel.addThr(this);
					btn.lastChild.style.display = 'initial';
				} else {
					navPanel.removeThr(this);
					$hide(btn.lastChild);
				}
				if (needToOmit > 0) {
					op.el.insertAdjacentHTML('afterend', '<div class="de-omitted">' + needToOmit + '</div>');
				}
				if (smartScroll) {
					scrollTo(window.pageXOffset, window.pageYOffset + this.next.top - nextCoord);
				}
				Pview.updatePosition(false);
				if (Cfg.hideReplies) {
					$q('.de-replies-btn', this.btns).firstElementChild.className = 'de-abtn de-replies-hide';
					if (Cfg.updThrBtns) {
						$show(btn.firstChild);
					}
				}
				closePopup('load-thr');
			}
		}, {
			key: '_loadNewFromBuilder',
			value: function _loadNewFromBuilder(pBuilder) {
				var lastOffset = pr.isVisible ? pr.top : null,
				    _parsePosts2 = this._parsePosts(pBuilder),
				    _parsePosts3 = _slicedToArray(_parsePosts2, 2),
				    newPosts = _parsePosts3[0],
				    newVisPosts = _parsePosts3[1];

				if (lastOffset !== null) {
					scrollTo(window.pageXOffset, window.pageYOffset + pr.top - lastOffset);
				}
				if (newPosts !== 0 || panel.isNew) {
					panel.updateCounter(pBuilder.length + 1 - this.hidCounter, $Q(aib.qPostImg, this.el).length, pBuilder.postersCount);
					Pview.updatePosition(true);
				}
				if (pBuilder.isClosed) {
					AjaxCache.clear();
					return { newCount: newVisPosts, locked: true };
				}
				return { newCount: newVisPosts, locked: false };
			}
		}, {
			key: '_parsePosts',
			value: function _parsePosts(pBuilder) {
				var _this56 = this;

				this._checkBans(pBuilder);
				var maybeSpells = new Maybe(SpellsRunner),
				    newPosts = 0,
				    newVisPosts = 0,
				    len = pBuilder.length,
				    post = this.lastNotDeleted,
				    maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
				if (post.count !== 0 && (aib.dobr || post.count > len || pBuilder.getPNum(post.count - 1) !== post.num)) {
					post = this.op.nextNotDeleted;
					var i,
					    firstChangedPost = null;
					for (i = post.count - 1; i < len && post;) {
						if (post.num === pBuilder.getPNum(i)) {
							i++;
							post = post.nextNotDeleted;
							continue;
						}
						if (post.num > pBuilder.getPNum(i)) {
							if (!firstChangedPost) {
								firstChangedPost = post.prev;
							}
							var cnt = 0;
							do {
								cnt++;
								i++;
							} while (pBuilder.getPNum(i) < post.num);
							var res = this._importPosts(post.prev, pBuilder, i - cnt, i, maybeVParser, maybeSpells);
							newPosts += res[0];
							this.pcount += res[0];
							newVisPosts += res[1];
							$after(post.prev.wrap, res[2]);
							res[3].next = post;
							post.prev = res[3];
							DollchanAPI.notify('newpost', res[4]);
							for (var temp = post; temp; temp = temp.nextInThread) {
								temp.count += cnt;
							}
						} else {
							if (!firstChangedPost) {
								firstChangedPost = post;
							}
							post = this.deletePost(post, false, !aib.t);
						}
					}
					if (i === len && post) {
						this.deletePost(post, true, !aib.t);
					}
					if (firstChangedPost && maybeSpells.hasValue && maybeSpells.value.hasNumSpell) {
						for (post = firstChangedPost.nextInThread; post; post = post.nextInThread) {
							maybeSpells.value.run(post);
						}
					}
					if (newPosts !== 0) {
						for (post = firstChangedPost; post; post = post.nextInThread) {
							RefMap.upd(post, true);
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
				readFavorites().then(function (fav) {
					var f = fav[aib.host];
					if (!f || !f[aib.b]) {
						return;
					}
					if (f = f[aib.b][_this56.op.num]) {
						var el = $q('#de-win-fav > .de-win-body');
						if (el && el.hasChildNodes()) {
							el = $q('.de-fav-current > .de-fav-entries > .de-entry[de-num="' + _this56.op.num + '"] .de-fav-inf-new', el);
							$hide(el);
							el.textContent = 0;
							el = el.nextElementSibling; 
							el.textContent = _this56.pcount;
						}
						f.cnt = _this56.pcount;
						f['new'] = 0;
						f.you = 0;
						f.last = aib.anchor + _this56.last.num;
						setStored('DESU_Favorites', JSON.stringify(fav));
					}
				});
				maybeVParser.end();
				maybeSpells.end();
				return [newPosts, newVisPosts];
			}
		}, {
			key: 'bottom',
			get: function get() {
				return this.hidden ? this.op.bottom : this.last.bottom;
			}
		}, {
			key: 'lastNotDeleted',
			get: function get() {
				var post = this.last;
				while (post.deleted) {
					post = post.prev;
				}
				return post;
			}
		}, {
			key: 'nextNotHidden',
			get: function get() {
				for (var thr = this.next; thr && thr.hidden; thr = thr.next) {}
				return thr;
			}
		}, {
			key: 'prevNotHidden',
			get: function get() {
				for (var thr = this.prev; thr && thr.hidden; thr = thr.prev) {}
				return thr;
			}
		}, {
			key: 'userTouched',
			get: function get() {
				var value = new Map();
				Object.defineProperty(this, 'userTouched', { value: value });
				return value;
			}
		}, {
			key: 'top',
			get: function get() {
				return this.op.top;
			}
		}]);

		return Thread;
	}();

	var navPanel = {
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
			var _this57 = this;

			switch (e.type) {
				case 'scroll':
					window.requestAnimationFrame(function () {
						return _this57._checkThreads();
					});break;
				case 'mouseover':
					this._expandCollapse(true, fixEventEl(e.relatedTarget));break;
				case 'mouseout':
					this._expandCollapse(false, fixEventEl(e.relatedTarget));break;
				case 'click':
					this._handleClick(e);break;
			}
		},
		init: function init() {
			var el = $bEnd(docBody, '\n\t\t<div id="de-thr-navpanel" class="de-thr-navpanel-hidden" style="display: none;">\n\t\t\t<svg id="de-thr-navarrow"><use xlink:href="#de-symbol-nav-arrow"/></svg>\n\t\t\t<div id="de-thr-navup">\n\t\t\t\t<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-nav-up"/></svg>\n\t\t\t</div>\n\t\t\t<div id="de-thr-navdown">\n\t\t\t\t<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-nav-down"/></svg>\n\t\t\t</div>\n\t\t</div>');
			el.addEventListener('mouseover', this, true);
			el.addEventListener('mouseout', this, true);
			el.addEventListener('click', this, true);
			this._el = el;
			this._thrs = new Set();
		},
		removeThr: function removeThr(thr) {
			this._thrs['delete'](thr.el);
			if (this._thrs.size === 0) {
				$hide(this._el);
				this._currentThr = null;
				this._visible = false;
				doc.defaultView.removeEventListener('scroll', this);
			}
		},


		_el: null,
		_showhideTO: 0,
		_thrs: null,
		_currentThr: null,
		_visible: false,
		_checkThreads: function _checkThreads() {
			var el = this._findCurrentThread();
			if (el) {
				if (!this._visible) {
					this._showHide(true);
				}
				this._currentThr = el;
			} else if (this._visible) {
				this._showHide(false);
			}
		},
		_findCurrentThread: function _findCurrentThread() {
			if ('elementsFromPoint' in doc) {
				Object.defineProperty(this, '_findCurrentThread', {
					value: function value() {
						var _this58 = this;

						return doc.elementsFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2).find(function (el) {
							return _this58._thrs.has(el);
						});
					}
				});
				return this._findCurrentThread();
			}
			Object.defineProperty(this, '_findCurrentThread', {
				value: function value() {
					var el = document.elementFromPoint(Post.sizing.wWidth / 2, Post.sizing.wHeight / 2);
					while (el) {
						if (this._thrs.has(el)) {
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
		_expandCollapse: function _expandCollapse(expand, rt) {
			var _this59 = this;

			if (!rt || !this._el.contains(rt.farthestViewportElement || rt)) {
				clearTimeout(this._showhideTO);
				this._showhideTO = setTimeout(expand ? function () {
					return _this59._el.classList.remove('de-thr-navpanel-hidden');
				} : function () {
					return _this59._el.classList.add('de-thr-navpanel-hidden');
				}, Cfg.linksOver);
			}
		},
		_showHide: function _showHide(show) {
			this._el.style.display = show ? 'initial' : 'none';
			this._visible = show;
		}
	};


	function initThreadUpdater(title, enableUpdate) {
		var focusLoadTime,
		    paused = false,
		    enabled = false,
		    disabledByUser = true,
		    lastECode = 200,
		    sendError = false,
		    newPosts = 0,
		    hasYouRefs = false,
		    storageName = 'de-lastpcount-' + aib.b + '-' + aib.t;

		var audio = {
			enabled: false,
			repeatMS: 0,
			disable: function disable() {
				this.stop();
				this.enabled = false;
				var btn = $id('de-panel-audio-on');
				if (btn) {
					btn.id = 'de-panel-audio-off';
				}
			},
			play: function play() {
				var _this60 = this;

				this.stop();
				if (this.repeatMS === 0) {
					this._el.play();
					return;
				}
				this._playInterval = setInterval(function () {
					return _this60._el.play();
				}, this.repeatMS);
			},
			stop: function stop() {
				if (this._playInterval) {
					clearInterval(this._playInterval);
					this._playInterval = null;
				}
			},


			get _el() {
				var val = doc.createElement('audio');
				val.setAttribute('preload', 'auto');
				val.src = gitRaw + 'signal.ogg';
				Object.defineProperty(this, '_el', { val: val });
				return val;
			}
		};

		var counter = {
			enable: function enable() {
				this._enabled = true;
				$show(this._el);
			},
			disable: function disable() {
				this._enabled = false;
				this._stop();
				$hide(this._el);
			},
			count: function count(delayMS, useCounter, callback) {
				var _this61 = this;

				if (this._enabled && useCounter) {
					var seconds = delayMS / 1000;
					this._set(seconds);
					this._countingIV = setInterval(function () {
						seconds--;
						if (seconds === 0) {
							_this61._stop();
							callback();
						} else {
							_this61._set(seconds);
						}
					}, 1000);
				} else {
					this._countingTO = setTimeout(function () {
						_this61._countingTO = null;
						callback();
					}, delayMS);
				}
			},
			setWait: function setWait() {
				this._stop();
				if (this._enabled) {
					this._el.innerHTML = '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>';
				}
			},


			_countingIV: null,
			_countingTO: null,
			_enabled: false,
			get _el() {
				var value = $id('de-updater-count');
				Object.defineProperty(this, '_el', { value: value });
				return value;
			},

			_set: function _set(seconds) {
				this._el.innerHTML = seconds;
			},
			_stop: function _stop() {
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
				var _this62 = this;

				if (this._isInited) {
					return;
				}
				this._isInited = true;
				var icon = new Image();
				icon.onload = function (e) {
					try {
						_this62._initIconsHelper(e.target);
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
			updateIcon: function updateIcon(isError) {
				if (!isError && !newPosts) {
					this._setIcon(this.originalIcon);
				} else if (this._hasIcons) {
					this._setIcon(isError ? this._iconError : hasYouRefs ? this._iconYou : this._iconNew);
				}
			},
			startBlinkNew: function startBlinkNew() {
				if (this._hasIcons) {
					this._startBlink(hasYouRefs ? this._iconYou : this._iconNew);
				} else {
					this._startBlink(this._emptyIcon);
				}
			},
			startBlinkError: function startBlinkError() {
				this._startBlink(this._hasIcons ? this._iconError : this._emptyIcon);
			},
			stopBlink: function stopBlink() {
				if (this._blinkInterval) {
					clearInterval(this._blinkInterval);
					this._blinkInterval = null;
				}
				if (!this._isOriginalIcon) {
					this._setIcon(this.originalIcon);
					this._isOriginalIcon = true;
				}
			},


			_blinkInterval: null,
			_blinkMS: 800,
			_currentIcon: null,
			_emptyIcon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
			_hasIcons: false,
			_iconError: null,
			_iconNew: null,
			_iconYou: null,
			_isInited: false,
			_isOriginalIcon: true,
			get _iconEl() {
				var el = $q('link[rel="shortcut icon"]', doc.head) || $bEnd(doc.head, '<link href="/favicon.ico" rel="shortcut icon"/>');
				Object.defineProperties(this, {
					'_iconEl': { value: el, writable: true },
					'originalIcon': { value: el.href }
				});
				return el;
			},
			_initIconsHelper: function _initIconsHelper(icon) {
				function drawLines(ctx, line1, line2, color, width, scaleFactor) {
					ctx.beginPath();
					ctx.strokeStyle = color;
					ctx.lineWidth = width * scaleFactor;
					ctx.moveTo(line1[0] * scaleFactor, line1[1] * scaleFactor);
					ctx.lineTo(line1[2] * scaleFactor, line1[3] * scaleFactor);
					ctx.moveTo(line2[0] * scaleFactor, line2[1] * scaleFactor);
					ctx.lineTo(line2[2] * scaleFactor, line2[3] * scaleFactor);
					ctx.stroke();
				}
				var canvas = doc.createElement('canvas'),
				    ctx = canvas.getContext('2d'),
				    wh = Math.max(icon.naturalHeight, 16 * (window.devicePixelRatio || 1)),
				    scale = wh / 16;
				canvas.width = canvas.height = wh;
				ctx.drawImage(icon, 0, 0, wh, wh);
				var original = ctx.getImageData(0, 0, wh, wh);
				drawLines(ctx, [15, 15, 7, 7], [7, 15, 15, 7], '#780000', 3, scale);
				drawLines(ctx, [14.5, 14.5, 7.5, 7.5], [7.5, 14.5, 14.5, 7.5], '#fa2020', 1.5, scale);
				this._iconError = canvas.toDataURL('image/png');
				ctx.putImageData(original, 0, 0);
				drawLines(ctx, [6, 11, 16, 11], [11, 6, 11, 16], '#1c5f23', 4, scale);
				drawLines(ctx, [7, 11, 15, 11], [11, 7, 11, 15], '#00f51b', 2, scale);
				this._iconNew = canvas.toDataURL('image/png');
				ctx.putImageData(original, 0, 0);
				drawLines(ctx, [6, 11, 16, 11], [11, 6, 11, 16], '#122091', 4, scale);
				drawLines(ctx, [7, 11, 15, 11], [11, 7, 11, 15], '#1b6df5', 2, scale);
				this._iconYou = canvas.toDataURL('image/png');
				this._hasIcons = true;
			},
			_setIcon: function _setIcon(iconUrl) {
				$del(this._iconEl);
				this._iconEl = $aBegin(doc.head, '<link rel="shortcut icon" href="' + iconUrl + '">');
			},
			_startBlink: function _startBlink(iconUrl) {
				var _this63 = this;

				if (this._blinkInterval) {
					if (this._currentIcon === iconUrl) {
						return;
					}
					clearInterval(this._blinkInterval);
				}
				this._currentIcon = iconUrl;
				this._blinkInterval = setInterval(function () {
					_this63._setIcon(_this63._isOriginalIcon ? _this63._currentIcon : _this63.originalIcon);
					_this63._isOriginalIcon = !_this63._isOriginalIcon;
				}, this._blinkMS);
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
			show: function show() {
				var _this64 = this;

				var post = Thread.first.last,
				    notif = new Notification(aib.dm + '/' + aib.b + '/' + aib.t + ': ' + newPosts + ' ' + Lng.newPost[lang][lang !== 0 ? +(newPosts !== 1) : newPosts % 10 > 4 || newPosts % 10 === 0 || (newPosts % 100 / 10 | 0) === 1 ? 2 : newPosts % 10 === 1 ? 0 : 1] + '. ' + Lng.newPost[lang][3] + ':', {
					'body': post.text.substring(0, 250).replace(/\s+/g, ' '),
					'tag': aib.dm + aib.b + aib.t,
					'icon': post.images.firstAttach ? post.images.firstAttach.src : favicon.originalIcon
				});
				notif.onshow = function () {
					return setTimeout(function () {
						if (notif === _this64._notifEl) {
							_this64.close();
						}
					}, 12e3);
				};
				notif.onclick = function () {
					return window.focus();
				};
				notif.onerror = function () {
					window.focus();
					_this64._requestPermission();
				};
				this._notifEl = notif;
			},
			close: function close() {
				if (this._notifEl) {
					this._notifEl.close();
					this._notifEl = null;
				}
			},


			_granted: true,
			_closeTO: null,
			_notifEl: null,

			_requestPermission: function _requestPermission() {
				var _this65 = this;

				this._granted = false;
				Notification.requestPermission(function (state) {
					if (state.toLowerCase() === 'denied') {
						saveCfg('desktNotif', 0);
					} else {
						_this65._granted = true;
					}
				});
			}
		};

		var updMachine = {
			start: function start() {
				var needSleep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
				var loadOnce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (this._state !== -1) {
					this.stop(false);
				}
				this._state = 0;
				this._loadOnce = loadOnce;
				this._delay = this._initDelay = Cfg.updThrDelay * 1e3;
				if (!loadOnce) {
					this._setUpdateStatus('on');
				}
				this._makeStep(needSleep);
			},
			stop: function stop() {
				var updateStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				if (this._state !== -1) {
					this._state = -1;
					if (this._loadPromise) {
						this._loadPromise.cancel();
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
			_loadPromise: null,
			_loadOnce: false,
			_seconds: 0,
			_state: -1,
			get _panelButton() {
				var value = $q('a[id^="de-panel-upd"]');
				if (value) {
					Object.defineProperty(this, '_panelButton', { value: value });
				}
				return value;
			},

			_handleNewPosts: function _handleNewPosts(lPosts, error) {
				if (error instanceof CancelError) {
					return;
				}
				infoLoadErrors(error, false);
				var eCode = error instanceof AjaxError ? error.code : 0;
				if (eCode !== 200 && eCode !== 304) {
					if (doc.hidden && favicon.canBlink) {
						favicon.startBlinkError();
					}
					if (eCode === -1 || eCode === 404 && lastECode === 404) {
						Thread.removeSavedData(aib.b, aib.t);
						updateTitle(eCode);
						disableUpdater();
					} else {
						this._setUpdateStatus('warn');
						if (!Cfg.noErrInTitle) {
							updateTitle(eCode);
						}
						this._makeStep();
					}
					lastECode = eCode;
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
							favicon.startBlinkNew();
						}
						if (notification.canShow) {
							notification.show();
						}
						if (audio.enabled) {
							audio.play();
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
				var _this66 = this;

				var needSleep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				while (true) {
					switch (this._state) {
						case 0:
							if (needSleep) {
								this._state = 1;
								counter.count(this._delay, !doc.hidden, function () {
									return _this66._makeStep();
								});
								return;
							}
						case 1:
							counter.setWait();
							this._state = 2;
							this._loadPromise = Thread.first.loadNewPosts().then(function (_ref61) {
								var newCount = _ref61.newCount,
								    locked = _ref61.locked;
								return _this66._handleNewPosts(newCount, locked ? AjaxError.Locked : AjaxError.Success);
							}, function (e) {
								return _this66._handleNewPosts(0, e);
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
					if (nav.Presto) {
						this._panelButton.innerHTML = '<svg class="de-panel-svg"><use xlink:href="#de-symbol-panel-upd"/></svg>';
					}
				}
			}
		};

		function enableUpdater() {
			enabled = true;
			disabledByUser = paused = hasYouRefs = false;
			newPosts = 0;
			focusLoadTime = -1e4;
			notification.checkPermission();
			if (Cfg.updCount) {
				counter.enable();
			}
			favicon.initIcons();
		}

		function disableUpdater() {
			if (enabled) {
				audio.disable();
				counter.disable();
				updMachine.stop();
				enabled = false;
			}
		}

		function forceLoadPosts() {
			if (enabled && paused) {
				return;
			}
			if (!enabled && !disabledByUser) {
				enableUpdater();
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
				audio.stop();
				notification.close();
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
			enableUpdater();
			updMachine.start(true);
		}

		return {
			enable: function enable() {
				if (!enabled) {
					enableUpdater();
					updMachine.start();
				}
			},
			disable: function disable() {
				disabledByUser = true;
				disableUpdater();
			},
			toggle: function toggle() {
				if (enabled) {
					this.disable();
				} else {
					this.enable();
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
			pause: function pause() {
				if (enabled && !paused) {
					updMachine.stop();
					paused = true;
				}
			},
			'continue': function _continue() {
				var needSleep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (enabled && paused) {
					updMachine.start(needSleep);
					paused = false;
				}
			},
			toggleAudio: function toggleAudio(repeatMS) {
				if (audio.enabled) {
					audio.stop();
					return audio.enabled = false;
				}
				audio.repeatMS = repeatMS;
				return audio.enabled = true;
			},
			toggleCounter: function toggleCounter(enableCnt) {
				if (enableCnt) {
					counter.enable();
					counter.setWait();
				} else {
					counter.disable();
				}
				forceLoadPosts();
			},
			sendErrNotif: function sendErrNotif() {
				if (Cfg.sendErrNotif && doc.hidden) {
					sendError = true;
					updateTitle();
				}
			},
			refToYou: function refToYou() {
				if (doc.hidden) {
					hasYouRefs = true;
				}
			}
		};
	}


	var DelForm = function () {
		_createClass(DelForm, null, [{
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
			key: 'getThreads',
			value: function getThreads(formEl) {
				var threads = $Q(aib.qThread, formEl),
				    len = threads.length;
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
			key: '_parseClasslessThreads',
			value: function _parseClasslessThreads(formEl) {
				var i,
				    len,
				    threads = [],
				    fNodes = Array.from(formEl.childNodes),
				    cThr = doc.createElement('div');
				for (i = 0, len = fNodes.length - 1; i < len; ++i) {
					var node = fNodes[i];
					if (node.tagName === 'HR') {
						formEl.insertBefore(cThr, node);
						if (!aib.tinyib) {
							formEl.insertBefore(cThr.lastElementChild, node);
						}
						var el = cThr.lastElementChild;
						if (el.tagName === 'BR') {
							formEl.insertBefore(el, node);
						}
						try {
							aib.getTNum(cThr);
							threads.push(cThr);
						} catch (e) {}
						cThr = doc.createElement('div');
					} else {
						cThr.appendChild(node);
					}
				}
				cThr.appendChild(fNodes[i]);
				formEl.appendChild(cThr);
				return threads;
			}
		}]);

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
			var threads = DelForm.getThreads(this.el),
			    len = threads.length;
			for (var i = 0; i < len; ++i) {
				var num = aib.getTNum(threads[i]);
				if (DelForm.tNums.has(num)) {
					var el = threads[i],
					    thrNext = threads[i + 1],
					    elNext = el.nextSibling;
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
				if (!localData && Cfg.ajaxPosting) {
					el.onsubmit = $pd;
					var btn = $q(aib.qDelBut, el);
					if (btn) {
						btn.onclick = function (e) {
							$pd(e);
							pr.closeReply();
							$popup('delete', Lng.deleting[lang], true);
							html5Submit(el, e.target).then(checkDelete)['catch'](function (e) {
								return $popup('delete', getErrorMessage(e));
							});
						};
					}
				}
				Logger.log('Init AJAX');
				preloadImages(el);
				Logger.log('Preload images');
				embedMediaLinks(el);
				Logger.log('Audio links');
				if (Cfg.addYouTube) {
					new VideosParser().parse(el).end();
					Logger.log('Video links');
				}
				if (Cfg.addImgs) {
					embedImagesLinks(el);
					Logger.log('Image-links');
				}
				processImagesLinks(el);
				Logger.log('Image names');
				RefMap.init(this);
				Logger.log('Reflinks map');
			}
		}, {
			key: 'passEl',
			get: function get() {
				var value = $q(aib.qDelPassw, this.el);
				Object.defineProperty(this, 'passEl', { value: value });
				return value;
			}
		}]);

		return DelForm;
	}();

	DelForm.tNums = new Set();


	function checkStorage() {
		try {
			locStorage = window.localStorage;
			sesStorage = window.sessionStorage;
			sesStorage['__de-test'] = 1;
		} catch (e) {
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
		var firefox = ua.includes('Gecko/');
		var webkit = ua.includes('WebKit/');
		var chrome = webkit && ua.includes('Chrome/');
		var safari = webkit && !chrome;
		var isChromeStorage = !!window.chrome && !!window.chrome.storage;
		var isScriptStorage = !!scriptStorage && !ua.includes('Opera Mobi');
		var isGM = false;
		var isNewGM = typeof GM !== 'undefined' && typeof GM.xmlHttpRequest === 'function';
		if (!isNewGM) {
			try {
				isGM = typeof GM_setValue === 'function' && (!chrome || !GM_setValue.toString().includes('not supported'));
			} catch (e) {
				isGM = e.message === 'Permission denied to access property "toString"';
			}
		}
		if (!('requestAnimationFrame' in window)) {
			window.requestAnimationFrame = function (fn) {
				return setTimeout(fn, 0);
			};
		}
		if (!('remove' in Element.prototype)) {
			Element.prototype.remove = function () {
				if (this.parentNode) {
					this.parentNode.removeChild(this);
				}
			};
		}
		var needFileHack = false;
		try {
			new File([''], '');
			if (firefox || safari) {
				needFileHack = !FormData.prototype.get;
			}
		} catch (e) {
			needFileHack = true;
		}
		if (needFileHack && FormData) {
			(function () {
				var origFormData = FormData;
				var origAppend = FormData.prototype.append;
				FormData = function FormData(form) {
					var rv = form ? new origFormData(form) : new origFormData();
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
			})();
		}
		if ('toJSON' in aProto) {
			delete aProto.toJSON;
		}
		nav = {
			get ua() {
				return navigator.userAgent + (this.Firefox ? ' [' + navigator.buildID + ']' : '');
			},
			Firefox: firefox,
			WebKit: webkit,
			Chrome: chrome,
			Safari: safari,
			Presto: !!window.opera,
			MsEdge: ua.includes('Edge/'),
			isGM: isGM,
			isNewGM: isNewGM,
			get isESNext() {
				return typeof de_main_func_outer === 'undefined';
			},
			isChromeStorage: isChromeStorage,
			isScriptStorage: isScriptStorage,
			isGlobal: isGM || isNewGM || isChromeStorage || isScriptStorage,
			hasGMXHR: typeof GM_xmlhttpRequest === 'function' || isNewGM && typeof GM.xmlHttpRequest === 'function',
			get scriptInstall() {
				if (this.Firefox) {
					if (this.isNewGM) {
						if (GM.info) {
							return GM.info.scriptHandler + ' ' + GM.info.version;
						}
						return 'Greasemonkey';
					}
					return typeof GM_info !== 'undefined' ? 'Greasemonkey' : 'Scriptish';
				}
				return isChromeStorage ? 'Chrome extension' : isGM ? 'Monkey' : 'Native userscript';
			},
			cssMatches: function cssMatches(leftSel) {
				for (var _len10 = arguments.length, rules = Array(_len10 > 1 ? _len10 - 1 : 0), _key3 = 1; _key3 < _len10; _key3++) {
					rules[_key3 - 1] = arguments[_key3];
				}

				return leftSel + rules.join(', ' + leftSel);
			},

			fixLink: safari ? getAbsLink : function fixLink(url) {
				return url;
			},
			get hasTemplate() {
				var value = 'content' in document.createElement('template');
				Object.defineProperty(this, 'hasTemplate', { value: value });
				return value;
			},
			get hasWorker() {
				var val = false;
				try {
					val = 'Worker' in window && 'URL' in window;
				} catch (e) {}
				if (val && this.Firefox) {
					val = +(navigator.userAgent.match(/rv:(\d{2,})\./) || [])[1] >= 40;
				}
				Object.defineProperty(this, 'hasWorker', { value: val });
				return val;
			},
			get canPlayMP3() {
				var val = !!new Audio().canPlayType('audio/mpeg;');
				Object.defineProperty(this, 'canPlayMP3', { value: val });
				return val;
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
				var value = document.compatMode && document.compatMode == 'CSS1Compat' ? function () {
					return doc.documentElement.clientHeight;
				} : function () {
					return docBody.clientHeight;
				};
				Object.defineProperty(this, 'viewportHeight', { value: value });
				return value;
			},
			get viewportWidth() {
				var value = document.compatMode && document.compatMode == 'CSS1Compat' ? function () {
					return doc.documentElement.clientWidth;
				} : function () {
					return docBody.clientWidth;
				};
				Object.defineProperty(this, 'viewportWidth', { value: value });
				return value;
			},
			getUnsafeUint8Array: function getUnsafeUint8Array(data, i, len) {
				var ctor = Uint8Array;
				if (!nav.isNewGM && nav.Firefox) {
					try {
						if (!(new Uint8Array(data) instanceof Uint8Array)) {
							ctor = unsafeWindow.Uint8Array;
						}
					} catch (e) {
						ctor = unsafeWindow.Uint8Array;
					}
				}
				switch (arguments.length) {
					case 1:
						return new ctor(data);
					case 2:
						return new ctor(data, i);
					case 3:
						return new ctor(data, i, len);
				}
				throw new Error();
			},
			getUnsafeDataView: function getUnsafeDataView(data, offset) {
				var rv = new DataView(data, offset || 0);
				return nav.isNewGM || !nav.Firefox || rv instanceof DataView ? rv : new unsafeWindow.DataView(data, offset || 0);
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
			this.hasCatalog = false;
			this.hasOPNum = false; 
			this.hasPicWrap = false;
			this.hasTextLinks = false;
			this.host = window.location.hostname;
			this.jsonBuilder = null;
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
				var str;
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
					str = str.replace(aib.reCrossLinks, function (str, b, tNum, pNum) {
						return '>&gt;&gt;/' + b + '/' + (pNum || tNum) + '<';
					});
				}
				if (Cfg.decodeLinks) {
					str = str.replace(/>https?:\/\/[^<]+</ig, function (match) {
						try {
							return decodeURI(match);
						} catch (e) {}
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
				var videos = [],
				    els = $Q('embed, object, iframe', isPost ? data.el : data);
				for (var i = 0, len = els.length; i < len; ++i) {
					var m,
					    el = els[i],
					    src = el.src || el.data;
					if (src) {
						if (m = src.match(Videos.ytReg)) {
							videos.push([isPost ? data : this.getPostOfEl(el), m, true]);
							$del(el);
						}
						if (Cfg.addVimeo && (m = src.match(Videos.vimReg))) {
							videos.push([isPost ? data : this.getPostOfEl(el), m, false]);
							$del(el);
						}
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
			key: 'getCaptchaSrc',
			value: function getCaptchaSrc(src, tNum) {
				var tmp = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=').replace(/dummy=[\d\.]*/, 'dummy=' + Math.random());
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
			value: function getJsonApiUrl(brd, tNum) {}
		}, {
			key: 'getOmitted',
			value: function getOmitted(el, len) {
				var txt;
				return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] + 1 : 1;
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
				var el,
				    opEnd = $q(this._qTable, thr);
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
				return +post.id.match(/\d+/)[0]; 
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
				if (el.tagName === 'TD') {
					Object.defineProperty(this, 'getPostWrap', {
						value: function value(el, isOp) {
							return isOp ? el : $parent(el, 'TABLE');
						}
					});
				} else {
					Object.defineProperty(this, 'getPostWrap', {
						value: function value(el, isOp) {
							return el;
						}
					});
				}
				return this.getPostWrap(el, isOp);
			}
		}, {
			key: 'getSage',
			value: function getSage(post) {
				var a = $q('a[href^="mailto:"], a[href="sage"]', post);
				return !!a && /sage/i.test(a.href);
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
			key: 'parseURL',
			value: function parseURL() {
				var url = (window.location.pathname || '').replace(/^\//, '');
				if (url.match(this.res)) {
					var temp = url.split(this.res);
					this.b = temp[0].replace(/\/$/, '');
					this.t = +temp[1].match(/^\d+/)[0];
					this.page = this.firstPage;
				} else {
					var _temp = url.match(/\/?(\d+)[^\/]*?$/);
					this.page = _temp && +_temp[1] || this.firstPage;
					this.b = url.replace(_temp && this.page ? _temp[0] : /\/(?:[^\/]+\.[a-z]+)?$/, '');
				}
				if (this.docExt === null) {
					this.docExt = (url.match(/\.[a-z]+$/) || ['.html'])[0];
				}
			}
		}, {
			key: 'stringify',
			value: function stringify(obj) {
				return JSON.stringify(obj);
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
				var value = nav.cssMatches(this.qImgInfo + ' a', '[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]', '[href$=".webm"]', '[href$=".mp4"]', '[href$=".apng"]', ', [href^="blob:"]');
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
				var val = $q('.thread') ? '.thread' : '[id^="thread"]';
				Object.defineProperty(this, 'qThread', { value: val });
				return val;
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
			key: 'css',
			get: function get() {
				return '';
			}
		}, {
			key: 'delTruncMsg',
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
				var el = $q(this.qPages),
				    val = el && +aProto.pop.call(el.textContent.match(/\d+/g) || []) || 0;
				if (this.page === val + 1) {
					val++;
				}
				Object.defineProperty(this, 'lastPage', { value: val });
				return val;
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
				var val = new RegExp('>https?:\\/\\/[^\\/]*' + this.dm + '\\/([a-z0-9]+)\\/' + quoteReg(this.res) + '(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<', 'g');
				Object.defineProperty(this, 'reCrossLinks', { value: val });
				return val;
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

				var _this67 = _possibleConstructorReturn(this, (Makaba.__proto__ || Object.getPrototypeOf(Makaba)).call(this, prot, dm));

				_this67.mak = true;

				_this67.cReply = 'post reply';
				_this67.qBan = '.pomyanem';
				_this67.qClosed = '.sticky-img[src$="locked.png"]';
				_this67.qDForm = '#posts-form';
				_this67.qFormRedir = null;
				_this67.qFormRules = '.rules-area';
				_this67.qImgInfo = '.file-attr';
				_this67.qOmitted = '.mess-post';
				_this67.qPostHeader = '.post-details';
				_this67.qPostImg = '.preview';
				_this67.qPostMsg = '.post-message';
				_this67.qPostName = '.ananimas, .post-email';
				_this67.qPostSubj = '.post-title';
				_this67.qRPost = '.post.reply[data-num]';
				_this67.qTrunc = null;

				_this67.formParent = 'thread';
				_this67.hasCatalog = true;
				_this67.hasOPNum = true;
				_this67.hasPicWrap = true;
				_this67.jsonBuilder = MakabaPostsBuilder;
				_this67.jsonSubmit = true;
				_this67.markupBB = true;
				_this67.multiFile = true;
				_this67.timePattern = 'dd+nn+yy+w+hh+ii+ss';

				_this67._capUpdPromise = null;
				return _this67;
			}

			_createClass(Makaba, [{
				key: 'delTruncMsg',
				value: function delTruncMsg(post, el, isInit) {
					$del(el.previousSibling);
					$show(el.previousSibling);
					$del(el);
				}
			}, {
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '';
					for (var _i46 = 0; _i46 < 8; ++_i46) {
						str += '<div' + (_i46 ? ' style="display: none;"' : '') + '><input type="file" name="image' + (_i46 + 1) + '"></div>';
					}
					el.innerHTML = str;
				}
			}, {
				key: 'getBanId',
				value: function getBanId(postEl) {
					var el = $q(this.qBan, postEl);
					if (!el) {
						return 0;
					}
					return el.textContent.includes('предупрежден') ? 2 : 1;
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
				value: function getPostWrap(el, isOp) {
					return el.parentNode;
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					if ($q('.ananimas > span[id^="id_tag_"], .post-email > span[id^="id_tag_"]')) {
						this.getSage = function (post) {
							var name = $q(this.qPostName, post);
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
					var error = null,
					    postNum = null;
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
					$script('(function() {\n\t\t\t\tvar emptyFn = function() {};\n\t\t\t\tfunction fixGlobalFunc(name) {\n\t\t\t\t\tObject.defineProperty(window, name, { value: emptyFn, writable: false, configurable: false });\n\t\t\t\t}\n\t\t\t\tfixGlobalFunc("$alert");\n\t\t\t\tfixGlobalFunc("autorefresh_start");\n\t\t\t\tfixGlobalFunc("linkremover");\n\t\t\t\tfixGlobalFunc("scrollTo");\n\t\t\t\twindow.FormData = void 0;\n\t\t\t\t$(function() { $(window).off(); });\n\t\t\t})();');
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
					cap.textEl.tabIndex = 999;
					return this.updateCaptcha(cap);
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap, isErr) {
					var type = void 0;
					try {
						type = JSON.parse(locStorage.store).other.captcha_provider || '2chaptcha';
					} catch (e) {
						type = '2chaptcha';
					}
					return cap.updateHelper('/api/captcha/' + type + '/id?board=' + this.b + '&thread=' + pr.tNum, function (xhr) {
						var box = $q('.captcha-box', cap.parentEl);
						var data = xhr.responseText;
						try {
							data = JSON.parse(data);
						} catch (e) {}
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
								if (type === '2chaptcha') {
									var src = '/api/captcha/' + type + '/image/' + data.id;
									var image = $id('de-image-captcha');
									if (image) {
										image.src = '';
										image.src = src;
									} else {
										image = $q('.captcha-image', cap.parentEl);
										image.innerHTML = '<img id="de-image-captcha" src="' + src + '">';
										cap.initImage(image.firstChild);
									}
									$q('input[name="2chaptcha_id"]', cap.parentEl).value = data.id;
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
					return '.ABU-refmap, .box[onclick="ToggleSage()"], img[alt="webm file"], .kupi-passcode-suka, .fa-media-icon, .logo + hr, .media-expand-button, .nav-arrows, .news, .norm-reply, .message-byte-len, .postform-hr, .postpanel > :not(img), .prerekl-hr, .posts > hr, .reflink::before, .thread-nav, .toolbar-area, #ABU-alert-wait, #media-thumbnail { display: none !important; }\n\t\t\t\t.captcha-image > img { cursor: pointer; }\n\t\t\t\t#de-txt-panel { font-size: 16px !important; }\n\t\t\t\t.mess-post { display: block; }\n\t\t\t\t.oekaki-height, .oekaki-width { width: 36px !important; }\n\t\t\t\t.post.reply .post-message { max-height: initial !important; }\n\t\t\t\t.tmp_postform { width: auto; }\n\t\t\t\t.de-win-inpost { position: static !important; }\n\t\t\t\t' + (Cfg.expandTrunc ? '.expand-large-comment, div[id^="shrinked-post"] { display: none !important; } div[id^="original-post"] { display: block !important; }' : '') + '\n\t\t\t\t' + (Cfg.delImgNames ? '.filesize { display: inline !important; } .file-attr { margin-bottom: 1px; }' : '') + '\n\t\t\t\t' + (Cfg.expandImgs ? '#fullscreen-container { display: none !important; }' : '') + '\n\t\t\t\t' + (Cfg.txtBtnsLoc ? '.message-sticker-btn, .message-sticker-preview { bottom: 25px !important; }' : '');
				}
			}, {
				key: 'lastPage',
				get: function get() {
					var els = $Q('.pager > a:not([class])'),
					    val = els ? els.length : 1;
					Object.defineProperty(this, 'lastPage', { value: val });
					return val;
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

				var _this68 = _possibleConstructorReturn(this, (Tinyboard.__proto__ || Object.getPrototypeOf(Tinyboard)).call(this, prot, dm));

				_this68.tiny = true;

				_this68.cReply = 'post reply';
				_this68.qClosed = '.fa-lock';
				_this68.qDForm = 'form[name*="postcontrols"]';
				_this68.qForm = 'form[name="post"]';
				_this68.qFormPassw = 'input[name="password"]';
				_this68.qFormRedir = null;
				_this68.qImgInfo = '.fileinfo';
				_this68.qOmitted = '.omitted';
				_this68.qPages = '.pages > a:nth-last-of-type(2)';
				_this68.qPostHeader = '.intro';
				_this68.qPostMsg = '.body';
				_this68.qPostName = '.name';
				_this68.qPostRef = '.post_no + a';
				_this68.qPostSubj = '.subject';
				_this68.qPostTrip = '.trip';
				_this68.qTrunc = '.toolong';

				_this68.firstPage = 1;
				_this68.formParent = 'thread';
				_this68.hasCatalog = true;
				_this68.jsonSubmit = true;
				_this68.timePattern = 'nn+dd+yy++w++hh+ii+ss';

				_this68._qTable = '.post.reply';
				return _this68;
			}

			_createClass(Tinyboard, [{
				key: 'fixVideo',
				value: function fixVideo(isPost, data) {
					var videos = [],
					    els = $Q('.video-container, #ytplayer', isPost ? data.el : data);
					for (var i = 0, len = els.length; i < len; ++i) {
						var el = els[i];
						videos.push([isPost ? data : this.getPostOfEl(el), el.id === 'ytplayer' ? el.src.match(Videos.ytReg) : ['', el.getAttribute('data-video')], true]);
						$del(el);
					}
					return videos;
				}
			}, {
				key: 'getImgRealName',
				value: function getImgRealName(wrap) {
					return $q('.postfilename, .unimportant > a', wrap).textContent;
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return p > 1 ? fixBrd(b) + p + this.docExt : fixBrd(b);
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(json) {
					return { error: json.error, postNum: json.id && +json.id };
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
				}
			}, {
				key: 'init',
				value: function init() {
					$script('window.FormData = void 0');
					var form = $q('form[name="post"]');
					if (form) {
						form.insertAdjacentHTML('beforeend', '<input name="json_response" value="1" type="hidden">');
					}
					return false;
				}
			}, {
				key: 'qImgNameLink',
				get: function get() {
					return 'p.fileinfo > a:first-of-type';
				}
			}, {
				key: 'css',
				get: function get() {
					return '.banner, ' + (this.t ? '' : '.de-btn-rep,') + ' .hide-thread-link, .mentioned, .post-hover { display: none !important; }\n\t\t\t\tdiv.post.reply:not(.de-entry):not(.de-cfg-tab):not(.de-win-body) { float: left !important; clear: left; display: block; }';
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

				var _this69 = _possibleConstructorReturn(this, (Vichan.__proto__ || Object.getPrototypeOf(Vichan)).call(this, prot, dm));

				_this69.qDelPassw = '#password';
				_this69.qPostImg = '.post-image';

				_this69.multiFile = true;
				return _this69;
			}

			_createClass(Vichan, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '';
					for (var _i47 = 0; _i47 < 5; ++_i47) {
						str += '<div' + (_i47 ? ' style="display: none;"' : '') + '><input type="file" name="file' + (_i47 ? _i47 + 1 : '') + '"></div>';
					}
					el.innerHTML = str;
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
					$script('highlightReply = function() {}');
					setTimeout(function () {
						return $del($id('updater'));
					}, 0);
					var textarea = $id('body');
					if (textarea) {
						textarea.removeAttribute('id');
					}
					var el = $q('#upload > td > input:not([name="file"])');
					if (el) {
						$q(this.qForm).appendChild(el);
					}
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Vichan.prototype.__proto__ || Object.getPrototypeOf(Vichan.prototype), 'css', this) + '.boardlist { position: static !important; }\n\t\t\t\tbody { padding: 0 5px !important; }\n\t\t\t\t.fileinfo { width: 250px; }\n\t\t\t\t.multifile { width: auto !important; }\n\t\t\t\t#expand-all-images, #expand-all-images + .unimportant, .post-btn, small { display: none !important; }';
				}
			}]);

			return Vichan;
		}(Tinyboard);

		ibEngines.push(['tr#upload', Vichan]);

		var Kusaba = function (_BaseBoard3) {
			_inherits(Kusaba, _BaseBoard3);

			function Kusaba(prot, dm) {
				_classCallCheck(this, Kusaba);

				var _this70 = _possibleConstructorReturn(this, (Kusaba.__proto__ || Object.getPrototypeOf(Kusaba)).call(this, prot, dm));

				_this70.kus = true;

				_this70.qError = 'h1, h2, div[style*="1.25em"]';
				_this70.qFormRedir = 'input[name="redirecttothread"][value="1"]';

				_this70.formParent = 'replythread';
				_this70.markupBB = true;
				return _this70;
			}

			_createClass(Kusaba, [{
				key: 'getCaptchaSrc',
				value: function getCaptchaSrc(src, tNum) {
					return src.replace(/\?[^?]+$|$/, '?' + Math.random());
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
					return '.extrabtns > a, .extrabtns > span, #newposts_get, .replymode, .ui-resizable-handle, blockquote + a { display: none !important; }\n\t\t\t\t.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }';
				}
			}]);

			return Kusaba;
		}(BaseBoard);

		ibEngines.push(['script[src*="kusaba"]', Kusaba], ['form#delform[action$="/board.php"]', Kusaba]);

		var TinyIB = function (_BaseBoard4) {
			_inherits(TinyIB, _BaseBoard4);

			function TinyIB(prot, dm) {
				_classCallCheck(this, TinyIB);

				var _this71 = _possibleConstructorReturn(this, (TinyIB.__proto__ || Object.getPrototypeOf(TinyIB)).call(this, prot, dm));

				_this71.tinyib = true;

				_this71.qError = 'body[align=center] div, div[style="margin-top: 50px;"]';
				_this71.qPostMsg = '.message';
				return _this71;
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


		var _0chanHk = function (_BaseBoard5) {
			_inherits(_0chanHk, _BaseBoard5);

			function _0chanHk(prot, dm) {
				_classCallCheck(this, _0chanHk);

				var _this72 = _possibleConstructorReturn(this, (_0chanHk.__proto__ || Object.getPrototypeOf(_0chanHk)).call(this, prot, dm));

				_this72.cReply = 'block post';
				_this72.qDForm = '#content > div > .threads-scroll-spy + div, .threads > div:first-of-type';
				_this72.qForm = '.reply-form';
				_this72.qImgInfo = 'figcaption';
				_this72.qOmitted = 'div[style="margin-left: 25px; font-weight: bold;"]';
				_this72.qOPost = '.post-op';
				_this72.qPostHeader = '.post-header';
				_this72.qPostImg = '.post-img-thumbnail';
				_this72.qPostMsg = '.post-body-message';
				_this72.qPostRef = '.post-id';
				_this72.qRPost = '.block.post:not(.post-op)';

				_this72.docExt = '';
				_this72.jsonBuilder = _0chanPostsBuilder;
				_this72.res = '';
				return _this72;
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
				value: function getPostWrap(el, isOp) {
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
						if (el && el.id === 'app') {
							initObserver.disconnect();
							doc.defaultView.addEventListener('message', function (_ref62) {
								var data = _ref62.data;

								if (data !== '0chan-content-done') {
									return;
								}
								if (updater) {
									updater.disable();
								}
								DelForm.tNums = new Set();
								$each($Q('#de-css, #de-css-dynamic, #de-css-user, #de-svg-icons, #de-thr-navpanel', doc), $del);
								runMain(checkDomains, dataPromise);
							});
							$script('window.app.$bus.on(\'refreshContentDone\',\n\t\t\t\t\t\t() => document.defaultView.postMessage(\'0chan-content-done\', \'*\'))');
						}
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
					return $q('.post-id > a:nth-of-type(2)', op).href.match(/\d+$/)[0];
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

		var _02chNet = function (_BaseBoard6) {
			_inherits(_02chNet, _BaseBoard6);

			function _02chNet(prot, dm) {
				_classCallCheck(this, _02chNet);

				var _this73 = _possibleConstructorReturn(this, (_02chNet.__proto__ || Object.getPrototypeOf(_02chNet)).call(this, prot, dm));

				_this73.qFormRedir = 'input[name="gb2"][value="thread"]';

				_this73.ru = true;
				_this73.timePattern = 'yyyy+nn+dd++w++hh+ii+ss';
				return _this73;
			}

			_createClass(_02chNet, [{
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode;
				}
			}]);

			return _02chNet;
		}(BaseBoard);

		ibDomains['02ch.net'] = _02chNet;

		var _02chSu = function (_Kusaba) {
			_inherits(_02chSu, _Kusaba);

			function _02chSu(prot, dm) {
				_classCallCheck(this, _02chSu);

				var _this74 = _possibleConstructorReturn(this, (_02chSu.__proto__ || Object.getPrototypeOf(_02chSu)).call(this, prot, dm));

				_this74.hasCatalog = true;

				_this74._capUpdPromise = null;
				return _this74;
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

				var _this75 = _possibleConstructorReturn(this, (_2chan.__proto__ || Object.getPrototypeOf(_2chan)).call(this, prot, dm));

				_this75.qDForm = 'form:not([enctype])';
				_this75.qForm = 'form[enctype]';
				_this75.qFormRedir = null;
				_this75.qFormRules = '.chui';
				_this75.qOmitted = 'font[color="#707070"]';
				_this75.qPostImg = 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img';
				_this75.qPostRef = '.del';
				_this75.qRPost = 'td:nth-child(2)';

				_this75.docExt = '.htm';
				_this75.formParent = 'resto';
				return _this75;
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
					return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
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

				var _this76 = _possibleConstructorReturn(this, (_2chRip.__proto__ || Object.getPrototypeOf(_2chRip)).call(this, prot, dm));

				_this76.ru = true;

				_this76._capUpdPromise = null;
				return _this76;
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
					return cap.updateHelper('/cgi/captcha?task=get_id', function (xhr) {
						var id = xhr.responseText;
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

				var _this77 = _possibleConstructorReturn(this, (_2chRu.__proto__ || Object.getPrototypeOf(_2chRu)).call(this, prot, dm));

				_this77.qPages = 'table[border="1"] td > a:last-of-type';

				_this77.docExt = '.html';
				_this77.hasPicWrap = true;
				_this77.jsonSubmit = true;
				_this77.markupBB = true;
				_this77.multiFile = true;
				_this77.ru = true;

				_this77._qTable = 'table:not(.postfiles)';
				return _this77;
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
				value: function getCaptchaSrc(src, tNum) {
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
					var txt;
					return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] - len : 1;
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return fixBrd(b) + (p > 0 ? p : 0) + '.memhtml';
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(json) {
					var error, postNum;
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
					var el = $q('#postform input[type="button"]');
					if (el) {
						$replace(el, '<input type="submit" value="Отправить">');
					}
					el = $q(this.qDForm);
					$each($Q('input[type="hidden"]', el), $del);
					el.appendChild($q('.userdelete'));
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

				var _this78 = _possibleConstructorReturn(this, (_410chanOrg.__proto__ || Object.getPrototypeOf(_410chanOrg)).call(this, prot, dm));

				_this78.qFormRedir = 'input#noko';
				_this78.qPages = '.pgstbl > table > tbody > tr > td:nth-child(2)';

				_this78.ru = true;
				_this78.hasCatalog = true;
				_this78.markupBB = false;
				_this78.timePattern = 'dd+nn+yyyy++w++hh+ii+ss';

				_this78._capUpdPromise = null;
				return _this78;
			}

			_createClass(_410chanOrg, [{
				key: 'fixHTML',
				value: function fixHTML(data, isForm) {
					var _this79 = this;

					var el = _get(_410chanOrg.prototype.__proto__ || Object.getPrototypeOf(_410chanOrg.prototype), 'fixHTML', this).call(this, data, isForm);
					if (aib.t) {
						try {
							(function () {
								var backBtn = $q(_this79.qThread + ' > span[style]', el);
								if (backBtn) {
									var modBtn = $q('a[accesskey="m"]', el);
									$after(backBtn.parentElement, backBtn);
									[modBtn.previousSibling, modBtn, modBtn.nextSibling].forEach(function (elm) {
										return $after(backBtn.lastChild, elm);
									});
								}
							})();
						} catch (e) {}
					}
					return el;
				}
			}, {
				key: 'getCaptchaSrc',
				value: function getCaptchaSrc(src, tNum) {
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
				key: 'stringify',
				value: function stringify(obj) {
					var str = JSON.stringify(obj);
					return obj instanceof Array ? str.replace(/^"\[/, '[').replace(/\]"$/, ']') : str;
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					var _this80 = this;

					return cap.updateHelper('/api_adaptive.php?board=' + this.b, function (xhr) {
						if (xhr.responseText === '1') {
							cap.textEl.disabled = true;
							setTimeout(function () {
								return cap.textEl.value = 'проезд оплачен';
							}, 0);
						} else {
							cap.textEl.disabled = false;
							cap.textEl.value = '';
							var img = $q('img', cap.parentEl);
							var src = img.getAttribute('src');
							img.src = '';
							img.src = _this80.getCaptchaSrc(src);
						}
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
					return _get(_410chanOrg.prototype.__proto__ || Object.getPrototypeOf(_410chanOrg.prototype), 'css', this) + 'body { margin: 0 }\n\t\t\t\t#resizer { display: none; }\n\t\t\t\t.topmenu { position: static; }\n\t\t\t\t.de-thr-hid { display: inherit; }\n\t\t\t\tform > span { margin-top: 5px; }\n\t\t\t\tform > .de-thread-buttons { float: left; } ';
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

				var _this81 = _possibleConstructorReturn(this, (_4chanOrg.__proto__ || Object.getPrototypeOf(_4chanOrg)).call(this, prot, dm));

				_this81.fch = true;

				_this81.cReply = 'post reply';
				_this81.qBan = 'strong[style="color: red;"]';
				_this81.qClosed = '.archivedIcon';
				_this81.qDelBut = '.deleteform > input[type="submit"]';
				_this81.qError = '#errmsg';
				_this81.qForm = 'form[name="post"]';
				_this81.qFormRedir = null;
				_this81.qImgInfo = '.fileText';
				_this81.qOmitted = '.summary.desktop';
				_this81.qOPost = '.op';
				_this81.qPages = '.pagelist > .pages:not(.cataloglink) > a:last-of-type';
				_this81.qPostHeader = '.postInfo';
				_this81.qPostImg = '.fileThumb > img:not(.fileDeletedRes)';
				_this81.qPostName = '.name';
				_this81.qPostRef = '.postInfo > .postNum';
				_this81.qPostSubj = '.subject';

				_this81.anchor = '#p';
				_this81.docExt = '';
				_this81.firstPage = 1;
				_this81.formParent = 'resto';
				_this81.hasCatalog = true;
				_this81.hasTextLinks = true;
				_this81.jsonBuilder = _4chanPostsBuilder;
				_this81.res = 'thread/';
				_this81.timePattern = 'nn+dd+yy+w+hh+ii-?s?s?';

				_this81._qTable = '.replyContainer';
				return _this81;
			}

			_createClass(_4chanOrg, [{
				key: 'fixDeadLinks',
				value: function fixDeadLinks(str) {
					return str.replace(/<span class="deadlink">&gt;&gt;(\d+)<\/span>/g, '<a class="de-ref-del" href="#p$1">&gt;&gt;$1</a>');
				}
			}, {
				key: 'fixHTMLHelper',
				value: function fixHTMLHelper(str) {
					return str.replace(/<\/?wbr>/g, '').replace(/ \(OP\)<\/a/g, '</a');
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
				value: function getPostWrap(el, isOp) {
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
					var error = null,
					    postNum = null,
					    errEl = $q('#errmsg', data);
					if (errEl) {
						error = errEl.textContent;
					} else {
						try {
							postNum = +$q('h1', data).nextSibling.textContent.match(/no:(\d+)/)[1];
						} catch (e) {}
					}
					return { error: error, postNum: postNum };
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
				}
			}, {
				key: 'init',
				value: function init() {
					Cfg.findImgFile = 0;
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
					return '.backlink, #blotter, .extButton, hr.desktop, .navLinks, .postMenuBtn, #togglePostFormLink { display: none !important; }\n\t\t\t\t#bottomReportBtn { display: initial !important; }\n\t\t\t\t.postForm { display: table !important; width: auto !important; }\n\t\t\t\ttextarea { margin-right: 0 !important; }';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['', '', '', '', '[spoiler'];
				}
			}, {
				key: 'updateCaptcha',
				get: function get() {
					var value = null;
					var tr = $id('captchaFormPart');
					if (tr) {
						(function () {
							var capClick = $bEnd(docBody, '<div onclick="initRecaptcha();"></div>');
							var altCapClick = $bEnd(docBody, '<div onclick="QR.initCaptchaAlt();"></div>');
							var waitForReload = function waitForReload() {
								return setTimeout(function () {
									var input = $id('recaptcha_response_field');
									if (input) {
										input.tabIndex = 5;
									} else {
										waitForReload();
									}
								}, 1e3);
							};
							value = function value() {
								if (!Cfg.cap4chanAlt || !pr.tNum) {
									$replace($q('#g-recaptcha, #qrCaptchaContainerAlt'), '<div id="g-recaptcha"></div>');
									capClick.click();
									tr.removeAttribute('onclick');
									return null;
								}
								var container = $id('qrCaptchaContainerAlt');
								if (container) {
									container.click();
									return null;
								}
								$replace($id('g-recaptcha'), '<div id="qrCaptchaContainerAlt"></div>');
								altCapClick.click();
								tr.setAttribute('onclick', "if(event.target.tagName !== 'INPUT') { Recaptcha.reload(); }");
								waitForReload();
								return null;
							};
						})();
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

				var _this82 = _possibleConstructorReturn(this, (_8chNet.__proto__ || Object.getPrototypeOf(_8chNet)).call(this, prot, dm));

				_this82._8ch = true;

				_this82._capUpdPromise = null;
				return _this82;
			}

			_createClass(_8chNet, [{
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					$q('td', cap.parentEl).innerHTML = '\n\t\t\t<input placeholder="{ Lng.cap[lang] }" class="captcha_text" type="text" name="captcha_text" size="25" maxlength="8" autocomplete="off">\n\t\t\t<input class="captcha_cookie" name="captcha_cookie" type="hidden">\n\t\t\t<div class="captcha_html"></div>';
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
					return _get(_8chNet.prototype.__proto__ || Object.getPrototypeOf(_8chNet.prototype), 'css', this) + '#post-moderation-fields { display: initial !important; }';
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

				var _this83 = _possibleConstructorReturn(this, (_55chan.__proto__ || Object.getPrototypeOf(_55chan)).call(this, prot, dm));

				_this83._8ch = null;

				_this83.qFormRules = '.regras';
				return _this83;
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

				var _this85 = _possibleConstructorReturn(this, (Arhivach.__proto__ || Object.getPrototypeOf(Arhivach)).call(this, prot, dm));

				_this85.cReply = 'post';
				_this85.qDForm = 'body > .container-fluid';
				_this85.qPostHeader = '.post_head';
				_this85.qPostImg = '.post_image > img';
				_this85.qPostMsg = '.post_comment_body';
				_this85.qPostRef = '.post_id, .post_head > b';
				_this85.qPostSubj = '.post_subject';
				_this85.qRPost = '.post:not(:first-child):not([postid=""])';

				_this85.docExt = '';
				_this85.res = 'thread/';
				return _this85;
			}

			_createClass(Arhivach, [{
				key: 'fixHTML',
				value: function fixHTML(data, isForm) {
					var el = _get(Arhivach.prototype.__proto__ || Object.getPrototypeOf(Arhivach.prototype), 'fixHTML', this).call(this, data, isForm);
					try {
						var _els4 = $Q('.expand_image', el);
						for (var _i48 = 0, tLen = _els4.length; _i48 < tLen; ++_i48) {
							_els4[_i48].href = _els4[_i48].getAttribute('onclick').match(/http:\/[^']+/)[0];
						}
					} catch (e) {}
					return el;
				}
			}, {
				key: 'getImgInfo',
				value: function getImgInfo(wrap) {
					var data = wrap.firstElementChild.getAttribute('onclick').match(/'([1-9]\d*)','([1-9]\d*)'/);
					return data ? data[1] + 'x' + data[2] + ', 0Kb' : null;
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
				value: function getThrUrl(b, tNum) {
					return $q('link[rel="canonical"]', doc.head).href;
				}
			}, {
				key: 'getTNum',
				value: function getTNum(el) {
					return +this.getOp(el).getAttribute('postid');
				}
			}, {
				key: 'init',
				value: function init() {
					defaultCfg.ajaxUpdThr = 0;
					setTimeout(function () {
						var delPosts = $Q('.post[postid=""]');
						for (var i = 0, len = delPosts.length; i < len; ++i) {
							try {
								var post = pByNum.get(+$q('blockquote', delPosts[i]).getAttribute('id').substring(1));
								if (post) {
									post.deleted = true;
									post.btns.classList.remove('de-post-counter');
									post.btns.classList.add('de-post-deleted');
									post.wrap.classList.add('de-post-removed');
								}
							} catch (e) {}
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
					return '.de-cfg-inptxt, .de-cfg-label, .de-cfg-select { display: inline; width: auto; height: auto !important; font: 13px/15px arial !important; }\n\t\t\t\t.de-cfg-label.de-block { display: block; }\n\t\t\t\t.post_replies, .post_num, .poster_sage, .post[postid=""] { display: none !important; }\n\t\t\t\t.post { overflow-x: auto !important; }';
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

				var _this86 = _possibleConstructorReturn(this, (Brchan.__proto__ || Object.getPrototypeOf(Brchan)).call(this, prot, dm));

				_this86.brchan = true;

				_this86.qPostTrip = '.poster_id';

				_this86.markupBB = true;
				return _this86;
			}

			_createClass(Brchan, [{
				key: 'getImgWrap',
				value: function getImgWrap(img) {
					return img.parentNode.parentNode.parentNode;
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					return !!$q('.sage', post);
				}
			}, {
				key: 'init',
				value: function init() {
					_get(Brchan.prototype.__proto__ || Object.getPrototypeOf(Brchan.prototype), 'init', this).call(this);
					defaultCfg.timePattern = 'dd+nn+yy+++++hh+ii+ss';
					defaultCfg.timeRPattern = '_d/_n/_y(_w)_h:_i:_s';
					if (Cfg.ajaxUpdThr) {
						locStorage.auto_thread_update = false;
					}
					var el = $id('upload_embed');
					var el2 = $id('upload');
					if (el && el2) {
						$after(el2, el);
					}
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Brchan.prototype.__proto__ || Object.getPrototypeOf(Brchan.prototype), 'css', this) + 'input[name="embed"] { width: 100% !important; }\n\t\t\t\t#upload_embed > td > .unimportant.hint { display: none; }\n\t\t\t\t.reflink::after { content: "" !important; }';
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
		ibDomains['brchanansdnhvvnm.onion'] = Brchan;
		ibDomains['lolifox.org'] = Brchan;

		var Diochan = function (_Kusaba3) {
			_inherits(Diochan, _Kusaba3);

			function Diochan(prot, dm) {
				_classCallCheck(this, Diochan);

				var _this87 = _possibleConstructorReturn(this, (Diochan.__proto__ || Object.getPrototypeOf(Diochan)).call(this, prot, dm));

				_this87.multiFile = true;
				return _this87;
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
					return _get(Diochan.prototype.__proto__ || Object.getPrototypeOf(Diochan.prototype), 'css', this) + '.resize, .postblock { display: none; }';
				}
			}]);

			return Diochan;
		}(Kusaba);

		ibDomains['diochan.com'] = Diochan;

		var Dobrochan = function (_BaseBoard13) {
			_inherits(Dobrochan, _BaseBoard13);

			function Dobrochan(prot, dm) {
				_classCallCheck(this, Dobrochan);

				var _this88 = _possibleConstructorReturn(this, (Dobrochan.__proto__ || Object.getPrototypeOf(Dobrochan)).call(this, prot, dm));

				_this88.dobr = true;

				_this88.qClosed = 'img[src="/images/locked.png"]';
				_this88.qDForm = 'form[action*="delete"]';
				_this88.qError = '.post-error, h2';
				_this88.qFormRedir = 'select[name="goto"]';
				_this88.qImgInfo = '.fileinfo';
				_this88.qOmitted = '.abbrev > span:last-of-type';
				_this88.qPages = '.pages > tbody > tr > td';
				_this88.qPostMsg = '.postbody';
				_this88.qPostSubj = '.replytitle';
				_this88.qTrunc = '.abbrev > span:first-of-type';

				_this88.anchor = '#i';
				_this88.formParent = 'thread_id';
				_this88.hasPicWrap = true;
				_this88.jsonBuilder = DobrochanPostsBuilder;
				_this88.multiFile = true;
				_this88.ru = true;
				_this88.timePattern = 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?';
				return _this88;
			}

			_createClass(Dobrochan, [{
				key: 'delTruncMsg',
				value: function delTruncMsg(post, el, isInit) {
					[el.previousSibling, el.nextSibling, el].forEach($del);
					if (isInit) {
						$replace(post.msg.firstElementChild, $q('.alternate > div', post.el));
					} else {
						var sRunner = new SpellsRunner();
						post.updateMsg($q('.alternate > div', post.el), sRunner);
						sRunner.end();
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
					$each($Q('input[type="file"]', el), function (input) {
						return input.removeAttribute('onchange');
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
				value: function getOmitted(el, len) {
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
					return +$q('a[name]', op).name.match(/\d+/)[0];
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
					$script('window.UploadProgress = function() {}');
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
						var src = img.getAttribute('src').split('/').slice(0, -1).join('/') + '/' + Date.now() + '.png';
						img.src = '';
						img.src = src;
						cap.textEl.value = '';
					} else if (isErr) {
						var _el9 = img.parentNode;
						_el9.innerHTML = '';
						_el9.appendChild(img);
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

		var Ernstchan = function (_BaseBoard14) {
			_inherits(Ernstchan, _BaseBoard14);

			function Ernstchan(prot, dm) {
				_classCallCheck(this, Ernstchan);

				var _this89 = _possibleConstructorReturn(this, (Ernstchan.__proto__ || Object.getPrototypeOf(Ernstchan)).call(this, prot, dm));

				_this89.cReply = 'post';
				_this89.qError = '.error';
				_this89.qFormRedir = 'input[name="gb2"][value="thread"]';
				_this89.qOPost = '.thread_OP';
				_this89.qPages = '.pagelist > li:nth-last-child(2)';
				_this89.qPostHeader = '.post_head';
				_this89.qPostMsg = '.text';
				_this89.qPostSubj = '.subject';
				_this89.qPostTrip = '.tripcode';
				_this89.qRPost = '.thread_reply';
				_this89.qTrunc = '.tldr';

				_this89.docExt = '';
				_this89.firstPage = 1;
				_this89.markupBB = true;
				_this89.multiFile = true;
				_this89.res = 'thread/';
				return _this89;
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
					return '.content > hr, .de-parea > hr, .de-pview > .doubledash { display: none !important }\n\t\t\t\t.de-pview > .post { margin-left: 0; border: none; }\n\t\t\t\t#de-win-reply { float:left; margin-left:2em }';
				}
			}]);

			return Ernstchan;
		}(BaseBoard);

		ibDomains['ernstchan.com'] = Ernstchan;

		var Ichan = function (_Kusaba4) {
			_inherits(Ichan, _Kusaba4);

			function Ichan() {
				_classCallCheck(this, Ichan);

				return _possibleConstructorReturn(this, (Ichan.__proto__ || Object.getPrototypeOf(Ichan)).apply(this, arguments));
			}

			_createClass(Ichan, [{
				key: 'init',
				value: function init() {
					_get(Ichan.prototype.__proto__ || Object.getPrototypeOf(Ichan.prototype), 'init', this).call(this);
					var el = $q('div[id^="thread"]');
					if (el) {
						var node = void 0;
						while ((node = el.nextElementSibling) && node.tagName === 'TABLE') {
							el.appendChild(node);
						}
					}
				}
			}]);

			return Ichan;
		}(Kusaba);

		ibDomains['ichan.net'] = Ichan;

		var Iichan = function (_BaseBoard15) {
			_inherits(Iichan, _BaseBoard15);

			function Iichan(prot, dm) {
				_classCallCheck(this, Iichan);

				var _this91 = _possibleConstructorReturn(this, (Iichan.__proto__ || Object.getPrototypeOf(Iichan)).call(this, prot, dm));

				_this91.iichan = true;

				_this91.hasCatalog = true;
				return _this91;
			}

			_createClass(Iichan, [{
				key: 'init',
				value: function init() {
					defaultCfg.addSageBtn = 0;
					$script('highlight = function() {}');
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

				var _this92 = _possibleConstructorReturn(this, (Krautchan.__proto__ || Object.getPrototypeOf(Krautchan)).call(this, prot, dm));

				_this92.krau = true;

				_this92.cReply = 'postreply';
				_this92.qBan = '.ban_mark';
				_this92.qClosed = 'img[src="/images/locked.gif"]';
				_this92.qDForm = 'form[action*="delete"]';
				_this92.qError = '.message_text';
				_this92.qFormRedir = 'input#forward_thread';
				_this92.qFormRules = '#rules_row';
				_this92.qImgInfo = '.fileinfo';
				_this92.qOmitted = '.omittedinfo';
				_this92.qPages = 'table[border="1"] > tbody > tr > td > a:nth-last-child(2) + a';
				_this92.qPostHeader = '.postheader';
				_this92.qPostImg = 'img[id^="thumbnail_"]';
				_this92.qPostRef = '.postnumber';
				_this92.qPostSubj = '.postsubject';
				_this92.qRPost = '.postreply';
				_this92.qTrunc = 'p[id^="post_truncated"]';

				_this92.hasCatalog = true;
				_this92.hasPicWrap = true;
				_this92.hasTextLinks = true;
				_this92.markupBB = true;
				_this92.multiFile = true;
				_this92.res = 'thread-';
				_this92.timePattern = 'yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?';
				return _this92;
			}

			_createClass(Krautchan, [{
				key: 'fixDeadLinks',
				value: function fixDeadLinks(str) {
					return str.replace(/<span class="invalidquotelink">&gt;&gt;(\d+)<\/span>/g, '<a class="de-ref-del" href="#$1">&gt;&gt;$1</a>');
				}
			}, {
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '';
					for (var _i49 = 0; _i49 < 4; ++_i49) {
						str += '<div' + (_i49 ? ' style="display: none;"' : '') + '><input type="file" name="file_' + _i49 + '" tabindex="7"></div>';
					}
					el.innerHTML = str;
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
					return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
				}
			}, {
				key: 'init',
				value: function init() {
					$script('highlightPost = function() {}');
					return false;
				}
			}, {
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					cap.hasCaptcha = false;
					var scripts = $Q('script:not([src])', doc);
					for (var _i50 = 0, _len11 = scripts.length; _i50 < _len11; ++_i50) {
						var m = scripts[_i50].textContent.match(/var boardRequiresCaptcha = ([a-z]+);/);
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
					var pMsg = msg.parentNode,
					    prev = pMsg.previousElementSibling;
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
						for (var _iterator35 = cookie.split(';'), _isArray35 = Array.isArray(_iterator35), _i51 = 0, _iterator35 = _isArray35 ? _iterator35 : _iterator35[Symbol.iterator]();;) {
							var _ref63;

							if (_isArray35) {
								if (_i51 >= _iterator35.length) break;
								_ref63 = _iterator35[_i51++];
							} else {
								_i51 = _iterator35.next();
								if (_i51.done) break;
								_ref63 = _i51.value;
							}

							var c = _ref63;

							var m = c.match(/^\s*desuchan\.session=(.*)$/);
							if (m) {
								sessionId = unescape(m[1].replace(/\+/g, ' '));
								break;
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
					return 'img[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr, form > div:first-of-type > hr, h2, .sage { display: none; }\n\t\t\t\t.de-thr-hid { float: none; }\n\t\t\t\t.de-video-obj-inline { margin-left: 5px; }\t\t\t\tdiv[id^="Wz"] { z-index: 10000 !important; }\n\t\t\t\tform[action="/paint"] > select { width: 105px; }\n\t\t\t\tform[action="/paint"] > input[type="text"] { width: 24px !important; }';
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

				var _this93 = _possibleConstructorReturn(this, (Kropyvach.__proto__ || Object.getPrototypeOf(Kropyvach)).call(this, prot, dm));

				_this93.markupBB = true;
				return _this93;
			}

			_createClass(Kropyvach, [{
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

				var _this94 = _possibleConstructorReturn(this, (Lainchan.__proto__ || Object.getPrototypeOf(Lainchan)).call(this, prot, dm));

				_this94.qOPost = '.op';
				return _this94;
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
					return _get(Lainchan.prototype.__proto__ || Object.getPrototypeOf(Lainchan.prototype), 'css', this) + '.sidearrows { display: none !important; }\n\t\t\t\t.bar { position: static; }';
				}
			}]);

			return Lainchan;
		}(Vichan);

		ibDomains['lainchan.org'] = Lainchan;

		var Niuchan = function (_Kusaba5) {
			_inherits(Niuchan, _Kusaba5);

			function Niuchan() {
				_classCallCheck(this, Niuchan);

				return _possibleConstructorReturn(this, (Niuchan.__proto__ || Object.getPrototypeOf(Niuchan)).apply(this, arguments));
			}

			_createClass(Niuchan, [{
				key: 'css',
				get: function get() {
					return _get(Niuchan.prototype.__proto__ || Object.getPrototypeOf(Niuchan.prototype), 'css', this) + '.resize { display: none; }';
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
					$script('highlight = function() {}');
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

				var _this97 = _possibleConstructorReturn(this, (Ponyach.__proto__ || Object.getPrototypeOf(Ponyach)).call(this, prot, dm));

				_this97.qBan = 'font[color="#FF0000"]';
				_this97.qImgInfo = '.filesize[style="display: inline;"]';

				_this97.formParent = 'replythread';
				_this97.jsonSubmit = true;
				_this97.multiFile = true;
				return _this97;
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
				value: function getSubmitData(json) {
					return { error: json.error, postNum: json.id && +json.id };
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

				var _this98 = _possibleConstructorReturn(this, (Ponychan.__proto__ || Object.getPrototypeOf(Ponychan)).call(this, prot, dm));

				_this98.qOPost = '.opContainer';
				return _this98;
			}

			_createClass(Ponychan, [{
				key: 'init',
				value: function init() {
					_get(Ponychan.prototype.__proto__ || Object.getPrototypeOf(Ponychan.prototype), 'init', this).call(this);
					$each($Q('img[data-mature-src]'), function (el) {
						el.src = el.getAttribute('data-mature-src');
					});
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Ponychan.prototype.__proto__ || Object.getPrototypeOf(Ponychan.prototype), 'css', this) + '.mature_thread { display: block !important; }\n\t\t\t\t.mature_warning { display: none; }';
				}
			}]);

			return Ponychan;
		}(Tinyboard);

		ibDomains['ponychan.net'] = Ponychan;

		var Synch = function (_Tinyboard3) {
			_inherits(Synch, _Tinyboard3);

			function Synch(prot, dm) {
				_classCallCheck(this, Synch);

				var _this99 = _possibleConstructorReturn(this, (Synch.__proto__ || Object.getPrototypeOf(Synch)).call(this, prot, dm));

				_this99.qImgInfo = '.unimportant';

				_this99.markupBB = true;
				return _this99;
			}

			_createClass(Synch, [{
				key: 'init',
				value: function init() {
					var val = '{"simpleNavbar":true}';
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
				key: 'css',
				get: function get() {
					return _get(Synch.prototype.__proto__ || Object.getPrototypeOf(Synch.prototype), 'css', this) + '.fa-sort { display: none; }\n\t\t\t\ttime::after { content: none; }';
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

		var dm = localData ? localData.dm : window.location.hostname.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
		var prot = window.location.protocol;
		if (checkDomains && dm in ibDomains) {
			return new ibDomains[dm](prot, dm);
		}
		if (checkEngines) {
			for (var i = ibEngines.length - 1; i >= 0; --i) {
				var _ibEngines$i = _slicedToArray(ibEngines[i], 2),
				    path = _ibEngines$i[0],
				    Ctor = _ibEngines$i[1];

				if ($q(path, doc)) {
					return new Ctor(prot, dm);
				}
			}
			return new BaseBoard(prot, dm);
		}
		return null;
	}



	var DollchanAPI = function () {
		function DollchanAPI() {
			_classCallCheck(this, DollchanAPI);
		}

		_createClass(DollchanAPI, null, [{
			key: 'init',
			value: function init() {
				DollchanAPI.hasListeners = false;
				if (!('MessageChannel' in window)) {
					return;
				}
				var channel = new MessageChannel();
				DollchanAPI.port = channel.port1;
				DollchanAPI.port.onmessage = DollchanAPI._handleMessage;
				DollchanAPI.activeListeners = new Set();
				var port = channel.port2;
				doc.defaultView.addEventListener('message', function (_ref64) {
					var data = _ref64.data;

					if (data === 'de-request-api-message') {
						DollchanAPI.hasListeners = true;
						document.defaultView.postMessage('de-answer-api-message', '*', [port]);
					}
				});
			}
		}, {
			key: 'hasListener',
			value: function hasListener(name) {
				return DollchanAPI.hasListeners && DollchanAPI.activeListeners.has(name);
			}
		}, {
			key: 'notify',
			value: function notify(name, data) {
				if (DollchanAPI.hasListener(name)) {
					DollchanAPI.port.postMessage({ name: name, data: data });
				}
			}
		}, {
			key: '_handleMessage',
			value: function _handleMessage(_ref65) {
				var arg = _ref65.data;

				if (!arg || !arg.name) {
					return;
				}
				var name = arg.name;
				var data = arg.data;
				var rv = null;
				switch (arg.name.toLowerCase()) {
					case 'registerapi':
						if (data) {
							rv = {};
							for (var _iterator36 = data, _isArray36 = Array.isArray(_iterator36), _i52 = 0, _iterator36 = _isArray36 ? _iterator36 : _iterator36[Symbol.iterator]();;) {
								var _ref66;

								if (_isArray36) {
									if (_i52 >= _iterator36.length) break;
									_ref66 = _iterator36[_i52++];
								} else {
									_i52 = _iterator36.next();
									if (_i52.done) break;
									_ref66 = _i52.value;
								}

								var aName = _ref66;

								rv[aName] = DollchanAPI._register(aName.toLowerCase());
							}
						}
						break;
				}
				DollchanAPI.port.postMessage({ name: name, data: rv });
			}
		}, {
			key: '_register',
			value: function _register(name) {
				switch (name) {
					case 'expandmedia':
					case 'filechange':
					case 'newpost':
					case 'submitform':
						break;
					default:
						return false;
				}
				DollchanAPI.activeListeners.add(name);
				return true;
			}
		}]);

		return DollchanAPI;
	}();



	function checkForUpdates(isManual, lastUpdateTime) {
		if (!isManual) {
			if (Date.now() - +lastUpdateTime < [1, 2, 7, 14, 30][Cfg.scrUpdIntrv] * 1000 * 60 * 60 * 24) {
				return Promise.reject();
			}
		}
		return $ajax(gitRaw + 'Dollchan_Extension_Tools.meta.js', { 'Content-Type': 'text/plain' }, false).then(function (xhr) {
			var m = xhr.responseText.match(/@version\s+([0-9.]+)/);
			var remoteVer = m && m[1] ? m[1].split('.') : null;
			if (remoteVer) {
				var currentVer = version.split('.');
				var src = gitRaw + (nav.isESNext ? 'src/' : '') + 'Dollchan_Extension_Tools.' + (nav.isESNext ? 'es6.' : '') + 'user.js';
				saveCfgObj('lastUpd', Date.now());
				for (var i = 0, _len12 = Math.max(currentVer.length, remoteVer.length); i < _len12; ++i) {
					if ((+remoteVer[i] || 0) > (+currentVer[i] || 0)) {
						return '<a style="color: blue; font-weight: bold;" href="' + src + '">' + Lng.updAvail[lang] + '</a>';
					} else if ((+remoteVer[i] || 0) < (+currentVer[i] || 0)) {
						break;
					}
				}
				if (isManual) {
					return Lng.haveLatest[lang];
				}
			}
			return Promise.reject();
		}, function () {
			return isManual ? '<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>' : Promise.reject();
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
				Thread.first.el.insertAdjacentHTML('afterend', '<div class="de-thread-buttons">' + '<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>' + '<span id="de-updater-count" style="display: none;"></span>]</span>' + (aib.mak ? '[<a class="de-abtn" href="#" onclick="UnbanShow();">Реквест разбана</a>]' : '') + '</div>');
			}
		} else {
			navPanel.init();
		}
		if (!localData) {
			updater = initThreadUpdater(doc.title, aib.t && Cfg.ajaxUpdThr && !aib.isArchived);
			if (aib.t) {
				Thread.first.el.nextSibling.firstChild.firstElementChild.addEventListener('click', updater.forceLoad);
			}
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
			var post,
			    num,
			    hash,
			    val = +sesStorage['de-scroll-' + aib.b + aib.t];
			if (val) {
				scrollTo(0, val);
				sesStorage.removeItem('de-scroll-' + aib.b + aib.t);
			} else if ((hash = window.location.hash) && (num = hash.match(/#[ip]?(\d+)$/)) && (num = +num[1]) && (post = pByNum.get(num)) && !post.isOp) {
				post.selectAndScrollTo();
			}
		}, 0);
	}


	function addSVGIcons() {
		docBody.insertAdjacentHTML('beforeend', '\n\t<div id="de-svg-icons" style="height: 0; width: 0; position: fixed;">\n\t<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t<defs>\n\t\t<linearGradient id="de-btn-back-gradient" x1="50%" y1="0%" y2="100%" x2="50%">\n\t\t\t<stop offset="0%" stop-color="#A0A0A0"/>\n\t\t\t<stop offset="50%" stop-color="#505050"/>\n\t\t\t<stop offset="100%" stop-color="#A0A0A0"/>\n\t\t</linearGradient>\n\t</defs>\n\n\t<!-- POST ICONS -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-back">\n\t\t<path class="de-post-btns-back" d="M4 1q-3 0,-3 3v8q0 3,3 3h8q3 0,3 -3v-8q0 -3,-3-3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-hide">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<line class="de-svg-stroke" stroke-width="2.5" x1="4.5" y1="11.5" x2="11.5" y2="4.5"/>\n\t\t<line class="de-svg-stroke" stroke-width="2.5" x1="11.5" y1="11.5" x2="4.5" y2="4.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-unhide">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="8" y1="4" x2="8" y2="12"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="4" y1="8" x2="12" y2="8"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-rep">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M5 11c0 .8.6 1.2 1.3.7l5-3c.6-.4.6-1 0-1.5l-5-3C5.6 4 5 4.3 5 5v6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-expthr">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M4.5 6L8 3l3.5 3H9.25v4h2.25L8 13 4.5 10h2.25V6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-fav">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M8 3l1.5 3 3.5.5-2.5 2.2 1 3.8-3.5-2-3.5 2 1-3.8L3 6.5 6.5 6 8 3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-stick">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M5 5h6v6H5z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-sage">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M4 9h8l-4 4.5zM6 3h4v1h-4zM6 5h4v1h-4zM6 7h4v1h-4z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-src">\n\t\t<use class="de-post-btns-back" xlink:href="#de-symbol-post-back"/>\n\t\t<circle class="de-svg-stroke" cx="7" cy="7" r="2.5" stroke-width="2"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="9" y1="9" x2="12" y2="12"/>\n\t</symbol>\n\n\t<!-- WINDOW ICONS -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-win-arrow">\n\t\t<path class="de-svg-stroke" stroke-width="3.5" d="M8 13V6"/>\n\t\t<path class="de-svg-fill"  d="M3.5 7h9L8 2.5 3.5 7z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-win-close">\n\t\t<path class="de-svg-stroke" stroke-width="2.5" d="M3.5 3.5l9 9m-9 0l9-9"/>\n\t</symbol>\n\n\t<!-- NAVIGATION PANEL ICONS -->\n\t<symbol viewBox="0 0 7 7" id="de-symbol-nav-arrow">\n\t\t<path class="de-svg-fill" d="M6 3.5L2 0v7z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 24 24" id="de-symbol-nav-up">\n\t\t<path class="de-svg-stroke" stroke-width="3" stroke-miterlimit="10" d="M3 22.5l9-9 9 9M3 13.5l9-9 9 9"/>\n\t</symbol>\n\t<symbol viewBox="0 0 24 24" id="de-symbol-nav-down">\n\t\t<path class="de-svg-stroke" stroke-width="3" stroke-miterlimit="10" d="M3 11.5l9 9 9-9M3 2.5l9 9 9-9"/>\n\t</symbol>\n\n\t<!-- MAIN PANEL -->\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-logo">\n\t\t<path class="de-svg-fill" d="M22 5h-10v16h4v-14h6z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M22 20.5H12c-2.8 0-5.7 0-5.7-4s2.8-4 5.7-4H21"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-cfg">\n\t\t<circle class="de-svg-stroke" stroke-width="3" cx="12.5" cy="12.5" r="6"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 6.5v-3M18.5 12.5h3M12.5 18.5v3M6.5 12.5h-3M16.7 8.3L19 6M16.7 16.7L19 19M8.3 16.7L6 19M8.3 8.3L6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-hid">\n\t\t<path class="de-svg-stroke" stroke-width="4" d="M6 19L19 6M6 6l13 13"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-fav">\n\t\t<path class="de-svg-fill" d="M12.5 3.5l2.5 6 6.5.5-5 4.2 2 6.8-6-4-6 4 2-6.8-5-4.2 6.5-.5 2.5-6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-vid">\n\t\t<path class="de-svg-fill" d="M12.5 4a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1 13c-1.3 1-2.5.2-2.5-1.4V9.4C9 7.8 10.2 7 11.6 8l5.3 3c1.3.8 1.3 2.2 0 3l-5.4 3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-refresh">\n\t\t<path class="de-svg-fill" d="M14 4v4.3a4.5 4.5 0 1 1-3 0V4a8.5 8.5 0 1 0 3 0z"/>\n\t\t<path class="de-svg-fill" d="M13 11V4h7"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-arrow">\n\t\t<path class="de-svg-stroke" stroke-width="5" d="M4 12.5h12"/>\n\t\t<path class="de-svg-fill" d="M14 19V6l7 6.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-expimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M8 12.5h9"/>\n\t\t<path class="de-svg-fill" d="M10 8v9l-5-4.5M15 17V8l5 4.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-maskimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" d="M5 20L20 5M5 15.5L15.5 5M5 11l6-6M20 9.5L9.5 20M20 14l-6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-preimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 17V9"/>\n\t\t<path class="de-svg-fill" d="M8 15h9l-4.5 5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-savethr">\n\t\t<path class="de-svg-fill" d="M18 4h-1v6H8V4H6C5 4 4 5 4 6v13c0 1 1 2 2 2h13c1 0 2-1 2-2V7l-3-3zM6 20v-8h13v8H6z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M13.5 9V4"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-upd">\n\t\t<circle cx="12.5" cy="10.8" r="4"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" stroke-linejoin="round" d="M4.5 12q8-10,16 0q-8 10,-16 0z"/>\n\t\t<path class="de-svg-stroke" d="M11 7L9.8 5M14 7l1.2-2M11 17l-1.2 2m4.2-2l1.2 2M7 8.5L5.3 6.8M7 15.5l-1.7 1.7M18 8.5l1.7-1.7M18 15.5l1.7 1.7"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-off">\n\t\t<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4l5 5z"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M15 9.5l6 6m0-6l-6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-on">\n\t\t<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4z"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M15.5 7.5c1.7 3.3 1.7 6.7 0 10m3-12.5c3 5 3 10 0 15"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-catalog">\n\t\t<path class="de-svg-fill" d="M5 5h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 5h3v3H9zM5 9h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 9h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-enable">\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 4v8"/>\n\t\t<path class="de-svg-fill" d="M16 4.8v4a5 5 0 0 1-3.5 8.7A5 5 0 0 1 9 9V4.7a8.5 8.5 0 1 0 7 0z"/>\n\t</symbol>\n\n\t<!-- MARKUP BUTTONS -->\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-back">\n\t\t<path class="de-markup-back" stroke-width="2" d="M6 1q-5 0,-5 5v10q0 5,5 5h11q5 0,5 -5v-10q0 -5,-5-5z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-bold">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="5.5" y="17" style="font-family: sans-serif; font-size: 17px; font-weight: 800;">B</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-italic">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="8" y="17" style="font-family: sans-serif; font-size: 17px; font-weight: 600; font-style: italic;">i</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-under">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="6" y="15" width="20" style="font-family: sans-serif; font-size: 17px; font-weight: 600;">u</text>\n\t\t<path stroke="#444" stroke-width="1.5" d="M6 17H17.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-strike">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="4" y="17" style="font-family: sans-serif; font-size: 22px; font-weight: 600; font-style: italic;">s</text>\n\t\t<path stroke="#444" d="M4 11H19"/>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-spoil">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<path stroke="#666" stroke-width="10" d="M4 11H19"/>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-code">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="5" y="17" style="font-family: \'Lucida Console\', monospace; font-size: 18px; font-weight: 600;">C</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-sup">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="4" y="15" style="font-family: sans-serif; font-size: 16px; font-weight: 600;">x</text>\n\t\t<text x="14" y="10" style="font-family: sans-serif; font-size: 8px; font-weight: 600;">2</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-sub">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="4" y="15" style="font-family: sans-serif; font-size: 16px; font-weight: 600;">x</text>\n\t\t<text x="14" y="17" style="font-family: sans-serif; font-size: 8px; font-weight: 600;">2</text>\n\t</symbol>\n\t<symbol viewBox="0 0 23 22" id="de-symbol-markup-quote">\n\t\t<use xlink:href="#de-symbol-markup-back"/>\n\t\t<text x="6" y="18" style="font-family: sans-serif; font-size: 20px; font-weight: 600;">&gt;</text>\n\t</symbol>\n\n\t<!-- OTHER -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-wait">\n\t\t<circle fill="#929087" cx="8" cy="2" r="2"/>\n\t\t<circle fill="#C5C2BA" cx="8" cy="14" r="2"/>\n\t\t<circle fill="#ACAAA0" cx="2" cy="8" r="2"/>\n\t\t<circle fill="#79766C" cx="14" cy="8" r="2"/>\n\t\t<circle fill="#D2CFC6" cx="12.25" cy="12.25" r="2"/>\n\t\t<circle fill="#9F9C93" cx="3.75" cy="3.75" r="2"/>\n\t\t<circle fill="#B9B6AE" cx="3.75" cy="12.25" r="2"/>\n\t\t<circle fill="#868379" cx="12.25" cy="3.75" r="2"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-closed">\n\t\t<image display="inline" width="16" height="16" xlink:href="data:image/gif;base64,R0lGODlhEAAQAKIAAP3rqPPOd+y6V+WmN+Dg4M7OzmZmZv///yH5BAEAAAcALAAAAAAQABAAAANCeLrWvZARUqqJkjiLj9FMcWHf6IldGZqM4zqRAcw0zXpAoO/6LfeNnS8XcAhjAIHSoFwim0wockCtUodWq+/1UiQAADs="/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-unavail">\n\t\t<circle class="de-svg-stroke" fill="none" stroke-width="2" cx="8" cy="8" r="5"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M4 4l8 8"/>\n\t</symbol>\n\t</svg>\n\t</div>');
	}


	function scriptCSS() {
		var cont = function cont(id, src) {
			return id + ('::before { content: ""; padding-right: 16px; margin-right: 4px; background: url(' + src + ') no-repeat center; background-size: contain; }');
		};
		var gif = function gif(id, src) {
			return id + (' { background-image: url(data:image/gif;base64,' + src + '); background-repeat: no-repeat; background-position: center; }');
		};

		var p = void 0,
		    x = '#de-panel { position: fixed; right: 0; bottom: 0; z-index: 9999; border-radius: 15px 0 0 0; cursor: default; display: flex; min-height: 25px; color: #F5F5F5; }\n\t#de-panel-logo { flex: none; margin: auto 3px auto 0; cursor: pointer; }\n\t#de-panel-buttons { flex: 0 1 auto; display: flex; flex-flow: row wrap; align-items: center; padding: 0 0 0 2px; margin: 0; border-left: 1px solid #616b86; }\n\t.de-panel-button { display: block; flex: none; margin: 0 1px; padding: 0; transition: all .3s ease; }\n\ta.de-panel-button, a.de-panel-button:hover { color: inherit !important; }\n\t.de-panel-svg, #de-panel-logo, .de-panel-logo-svg, .de-panel-button { width: 25px; height: 25px; }\n\t#de-panel-goback { transform: rotate(180deg); will-change: transform; }\n\t#de-panel-godown { transform: rotate(90deg); will-change: transform; }\n\t#de-panel-goup { transform: rotate(-90deg); will-change: transform; }\n\t#de-panel-upd-on { fill: #32ff32; }\n\t#de-panel-upd-warn { fill: #fff441; }\n\t#de-panel-upd-off { fill: #ff3232; }\n\t#de-panel-audio-on > .de-panel-svg > .de-use-audio-off, #de-panel-audio-off > .de-panel-svg > .de-use-audio-on { display: none; }\n\t#de-panel-info { flex: none; padding: 0 6px; margin-left: 2px; border-left: 1px solid #616b86; font: 18px serif; }\n\t#de-panel-info-icount::before, #de-panel-info-acount:not(:empty)::before { content: "/"; }\n\t.de-svg-stroke { stroke: currentColor; fill: none; }\n\t.de-svg-fill { stroke: none; fill: currentColor; }\n\tuse { fill: inherit; pointer-events: none; }';

		switch (Cfg.scriptStyle) {
			case 0:
				x += '#de-panel, .de-win-head { background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }';
				break;
			case 1:
				x += '#de-panel, .de-win-head { background: linear-gradient(to bottom, #4b90df, #3d77be 20%, #376cb0 28%, #295591 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #183d77 52%, #1f4485 72%, #264c90 80%, #325f9e 100%); }\n\t\t\t#de-panel-buttons, #de-panel-info { border-color: #8fbbed; }';
				break;
			case 2:
				x += '#de-panel, .de-win-head { background-color: #777; }\n\t\t\t#de-panel-buttons, #de-panel-info { border-color: #ccc; }\n\t\t\t.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }';
				break;
			case 3:
				x += '#de-panel, .de-win-head { background-color: rgba(0,20,80,.72); }';
				break;
			case 4:
				x += '#de-panel, .de-win-head { background: none; background-color: #333; border-radius: 0 !important; }\n\t\t\t#de-win-reply.de-win { border-radius: 0 !important; }\n\t\t\t#de-panel-buttons, #de-panel-info { border-color: #666; }';
		}
		if (Cfg.scriptStyle === 2) {
			x += '.de-panel-svg:hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }';
		} else {
			x += '.de-panel-button:hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }';
		}

		if (Cfg.disabled) {
			$css(x).id = 'de-css';
			return;
		}

		x += '.de-win .de-btn-toggle { transform: rotate(180deg); }\n\t.de-resizer { position: absolute; }\n\t.de-resizer-bottom { height: 6px; bottom: -3px; left: 0; right: 0; cursor: ns-resize; }\n\t.de-resizer-left { width: 6px; top: 0px; bottom: 0px; left: -3px; cursor: ew-resize; }\n\t.de-resizer-right { width: 6px; top: 0px; bottom: 0px; right: -3px; cursor: ew-resize; }\n\t.de-resizer-top { height: 6px; top: -3px; left: 0; right: 0; cursor: ns-resize; }\n\t.de-win > .de-win-head { cursor: move; }\n\t.de-win-buttons { position: absolute; right: 0; margin: 0 2px 0 0; font-size: 0; cursor: pointer; }\n\t.de-win-buttons > svg { transition: background .3s ease, box-shadow .3s ease; }\n\t.de-win-buttons > svg:hover { background-color: rgba(255,255,255,.2); box-shadow: 0 0 2px rgba(255,255,255,.4); }\n\t.de-win-inpost > .de-win-head > .de-win-buttons > svg:hover { background-color: rgba(64,64,64,.15); box-shadow: 0 0 2px rgba(64,64,64,.3); }\n\t#de-win-cfg { width: 355px; }\n\t#de-win-cfg, #de-win-fav, #de-win-hid, #de-win-vid { position: fixed; max-height: 92%; overflow-x: hidden; overflow-y: auto; }\n\t#de-win-cfg > .de-win-body { float: none; display: block; width: auto; min-width: 0; max-width: 100% !important; padding: 0; margin: 0 !important; border: none; }\n\t#de-win-fav > .de-win-body, #de-win-hid > .de-win-body, #de-win-vid > .de-win-body { padding: 9px; border: 1px solid gray; }\n\t#de-win-hid { max-width: 60%; }\n\t#de-win-vid > .de-win-body { display: flex; flex-direction: column; align-items: center; }\n\t#de-win-vid .de-entry { white-space: normal; }\n\t.de-win-head { position: relative; padding: 2px; border-radius: 10px 10px 0 0; color: #F5F5F5; font: bold 14px/16px arial; text-align: center; cursor: default; }' + (

		'.de-block { display: block; }\n\t#de-btn-spell-add { margin-left: auto; }\n\t#de-cfg-bar { display: flex; margin: 0; padding: 0; }\n\t.de-cfg-body { min-height: 327px; padding: 9px 7px 7px; margin-top: -1px; font: 13px/15px arial !important; box-sizing: content-box; -moz-box-sizing: content-box; }\n\t.de-cfg-body, #de-cfg-buttons { border: 1px solid #183d77; border-top: none; }\n\t.de-cfg-button { padding: 0 ' + (nav.Firefox ? '2' : '4') + 'px !important; margin: 0 4px; height: 21px; font: 12px arial !important; }\n\t#de-cfg-buttons { display: flex; align-items: center; padding: 3px; }\n\t#de-cfg-buttons > label { flex: 1 0 auto; }\n\t.de-cfg-chkbox { ' + (nav.Presto ? '' : 'vertical-align: -1px !important; ') + 'margin: 2px 1px !important; }\n\t.de-cfg-depend { padding-left: 17px; }\n\t.de-cfg-inptxt { width: auto; padding: 0 2px !important; margin: 1px 4px 1px 0 !important; font: 13px arial !important; }\n\t.de-cfg-label { padding: 0; margin: 0; }\n\t.de-cfg-select { padding: 0 2px; margin: 1px 0; font: 13px arial !important; }\n\t.de-cfg-tab { flex: 1 0 auto; display: block !important; margin: 0 !important; float: none !important; width: auto !important; min-width: 0 !important; padding: 4px 0 !important; box-shadow: none !important; border: 1px solid #444 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; font: bold 12px arial; text-align: center; cursor: default; background-image: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\n\t.de-cfg-tab:hover { background-image: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\n\t.de-cfg-tab[selected], .de-cfg-tab[selected]:hover { background-image: none !important; border-bottom: none !important; }\n\t.de-cfg-tab::' + (nav.Firefox ? '-moz-' : '') + 'selection { background: transparent; }\n\t.de-cfg-unvis { display: none; }\n\t#de-info-log, #de-info-stats { width: 100%; padding: 0px 7px; }\n\t#de-info-log { overflow-y: auto; border-left: 1px solid grey; }\n\t.de-info-name { flex: 1 0 auto; }\n\t.de-info-row { display: flex; }\n\t#de-info-table { display: flex; height: 267px; }\n\t.de-spell-btn { padding: 0 4px; }\n\t#de-spell-editor { display: flex; align-items: stretch; height: 235px; padding: 2px 0; }\n\t#de-spell-panel { display: flex; }\n\t#de-spell-txt { padding: 2px !important; margin: 0; width: 100%; min-width: 0; border: none !important; outline: none !important; font: 12px courier new; ' + (nav.Presto ? '' : 'resize: none !important; ') + '}\n\t#de-spell-rowmeter { padding: 2px 3px 0 0; overflow: hidden; min-width: 2em; background-color: #616b86; text-align: right; color: #fff; font: 12px courier new; }');

		switch (Cfg.scriptStyle) {
			case 0:
				x += '#de-cfg-bar { background-color: #1f2740; }\n\t\t\t.de-cfg-tab { border-color: #121421 !important; }';
				break;
			case 1:
				x += '#de-cfg-bar { background-color: #325f9e; }\n\t\t\t.de-cfg-tab { border-color: #183d77 !important; }';
				break;
			case 2:
				x += '#de-cfg-bar, #de-spell-rowmeter { background-color: #777; }\n\t\t\t.de-cfg-body, #de-cfg-buttons { border-color: #444; }';
				break;
			case 3:
				x += '#de-cfg-bar { background-color: rgba(0,20,80,.72); }\n\t\t\t.de-cfg-tab { border-color: #001450 !important; }';
				break;
			case 4:
				x += '#de-cfg-bar { background-color: #222; }\n\t\t\t.de-cfg-body, #de-cfg-buttons { border-color: #666; }';
		}

		x += '.de-post-btns { margin-left: 4px; }\n\t.de-post-btns-back { fill: inherit; stroke: none; }\n\t.de-post-note:not(:empty) { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }\n\t.de-thread-note { font-style: italic; }\n\t.de-btn-hide > .de-btn-unhide-use, .de-btn-unhide > .de-btn-hide-use, .de-btn-hide-user > .de-btn-unhide-use, .de-btn-unhide-user > .de-btn-hide-use { display: none; }\n\t.de-btn-clear, .de-btn-close, .de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-stick-on, .de-btn-toggle { margin: 0 2px -3px 0 !important; cursor: pointer; width: 16px; height: 16px; }\n\t' + (!pr.form && !pr.oeForm ? '.de-btn-rep { display: none; }' : '') +

		cont('.de-src-google', 'https://google.com/favicon.ico') + cont('.de-src-yandex', 'https://yandex.ru/favicon.ico') + cont('.de-src-tineye', 'https://tineye.com/favicon.ico') + cont('.de-src-saucenao', 'https://saucenao.com/favicon.ico') + cont('.de-src-iqdb', '//iqdb.org/favicon.ico') + cont('.de-src-whatanime', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAWlBMVEX////29fbT1NOOj44dGx0SEhIHCAfX2NfQ0NDBwcGztLOwsbA7Ozs4ODgeHh7/2Nf/1dTMsbGpkZGWZWRyRUQ8NTYoIyMZAAAAAAAGBASBaGeBZ2Z2XVtmTUw2fryxAAAAGHRSTlP+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v4W3wyUAAAAZElEQVQI152OSQ6AMBRCadU6zxN1uP81/Y2NSY0r2fBgA+BL/wrbWEcewEqrrHa5zpSuCJMC0IY0WiA1iJW4ikkPYCFeUlQKFASTKI8SyTc8s8sc/rBDvwbF1LVjUJzbftjv6xfbkBHGT8GSnQAAAABJRU5ErkJggg==') + (

		'.de-post-counter::after { counter-increment: de-cnt 1; content: counter(de-cnt); margin: 0 4px 0 2px; vertical-align: 1px; color: #4f7942; font: bold 11px tahoma; cursor: default; }\n\t.de-post-deleted::after { content: "' + Lng.deleted[lang] + '"; margin: 0 4px 0 2px; vertical-align: 1px; color: #727579; font: bold 11px tahoma; cursor: default; }') +

		'#de-txt-panel { display: block; font-weight: bold; cursor: pointer; }\n\t#de-txt-panel > div { display: inline-block; }\n\t#de-txt-panel > div > svg { width: 23px; height: 22px; margin: 0 2px; }\n\t.de-markup-back { fill: #f0f0f0; stroke: #808080; }';

		if ('animation' in docBody.style) {
			x += '@keyframes de-open { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }\n\t\t@keyframes de-close { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }\n\t\t@keyframes de-blink {\n\t\t\t0%, 100% { transform: translateX(0); }\n\t\t\t10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\n\t\t\t20%, 40%, 60%, 80% { transform: translateX(10px); }\n\t\t}\n\t\t@keyframes de-post-open-tl { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-open-bl { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-open-tr { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-open-br { from { transform: translate(50%,50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-close-tl { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-close-bl { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-close-tr { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-close-br { to { transform: translate(50%,50%) scale(0); opacity: 0; } }\n\t\t@keyframes de-post-new { from { transform: translate(0,-50%) scaleY(0); opacity: 0; } }\n\t\t@keyframes de-win-open { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }\n\t\t@keyframes de-win-close { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }\n\t\t.de-pview-anim { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }\n\t\t.de-open { animation: de-open .15s ease-out both; }\n\t\t.de-close { animation: de-close .15s ease-in both; }\n\t\t.de-blink { animation: de-blink .7s ease-in-out both; }\n\t\t.de-post-new { animation: de-post-new .2s ease-out both; }\n\t\t.de-win-open { animation: de-win-open .2s ease-out backwards; }\n\t\t.de-win-close { animation: de-win-close .2s ease-in both; }';
		} else {
			Cfg.animation = 0;
		}

		p = Math.max(Cfg.minImgSize || 0, 50);
		x += '.de-img-pre, .de-img-full { display: block; border: none; outline: none; cursor: pointer; image-orientation: from-image; }\n\t.de-img-pre { max-width: 200px; max-height: 200px; }\n\t.de-img-load { position: absolute; z-index: 2; width: 50px; height: 50px; top: 50%; left: 50%; margin: -25px; }\n\t.de-img-full { width: 100%; }\n\t.de-img-full-info { text-align: center; }\n\t.de-img-full-src { display: inline-block; padding: 2px 4px; margin: 2px 0 2px -1px; background: rgba(64,64,64,.8); font: bold 12px tahoma; color: #fff  !important; text-decoration: none; outline: none; }\n\t.de-img-full-src:hover { color: #fff !important; background: rgba(64,64,64,.6); }\n\t.de-img-wrapper-inpost { min-width: ' + p + 'px; min-height: ' + p + 'px; float: left; ' + (aib.multiFile ? '' : 'padding: 2px 5px; -moz-box-sizing: border-box; box-sizing: border-box; ') + ' }\n\t.de-img-wrapper-nosize { position: relative; width: 100%; height: 100%; }\n\t.de-img-wrapper-nosize > .de-img-full { position: absolute; z-index: 1; opacity: .3; }\n\t.de-img-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; box-sizing: content-box; -moz-box-sizing: content-box; }\n\t#de-img-btn-next, #de-img-btn-prev { position: fixed; top: 50%; z-index: 10000; height: 36px; width: 36px; margin-top: -18px; background-repeat: no-repeat; background-position: center; background-color: black; cursor: pointer; }\n\t#de-img-btn-next { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJPjI8JkO1vlpzS0YvzhUdX/nigR2ZgSJ6IqY5Uy5UwJK/l/eI6A9etP1N8grQhUbg5RlLKAJD4DAJ3uCX1isU4s6xZ9PR1iY7j5nZibixgBQA7); right: 0; border-radius: 10px 0 0 10px; }\n\t#de-img-btn-prev { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJOjI8JkO24ooxPzYvzfJrWf3Rg2JUYVI4qea1g6zZmPLvmDeM6Y4mxU/v1eEKOpziUIA1BW+rXXEVVu6o1dQ1mNcnTckp7In3LAKyMchUAADs=); left: 0; border-radius: 0 10px 10px 0; }' +

		cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico') + cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico') + cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') + cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==') + '.de-current::after { content: " \u25CF"; }\n\t.de-img-arch, .de-img-audio { margin-left: 4px; color: inherit; text-decoration: none; font-weight: bold; }\n\t.de-mp3 { margin: 5px 20px; }\n\t.de-video-obj { margin: 5px 20px; white-space: nowrap; }\n\t.de-video-obj-inline { display: inline-block; }\n\t#de-video-btn-resize { padding: 0 14px 8px 0; margin: 0 8px; border: 2px solid; border-radius: 2px; }\n\t#de-video-btn-hide, #de-video-btn-prev { margin-left: auto; }\n\t#de-video-buttons { display: flex; align-items: center; width: 100%; line-height: 16px; }\n\t.de-video-expanded { width: 854px !important; height: 480px !important; }\n\t#de-video-list { padding: 0 0 4px; overflow-y: auto; width: 100%; }\n\t.de-video-refpost { margin: 0 3px; text-decoration: none; cursor: pointer; }\n\t.de-video-resizer::after { content: "\u2795"; margin: 0 -15px 0 3px; vertical-align: 6px; color: #000; font-size: 12px; cursor: pointer; }\n\t.de-video-player, .de-video-thumb { width: 100%; height: 100%; }\n\ta.de-video-player { display: inline-block; position: relative; border-spacing: 0; border: none; }\n\ta.de-video-player::after { content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAQAAACMYb/JAAAArklEQVR4AYXSr05CYRjA4cPGxjRosTijdvNJzmD1CrwAvQWugASNwGg0MoErOIVCPCMx0hmBMaAA4mPX8/2rT/i+9/1lPu0M3MtCN1OAvS+NEFkDmHqoJwcAbHzUkb9n7C5FqLynCAzdpAhLrynCRc9VnEDpKUWYpUmZIlt5nBQeY889amvGPj33HBvdt45WbAELeWyNP/qu/8dwBrDyVp9UBRi5DYXZdTLxEs77F5bCVAHlDJ1UAAAAAElFTkSuQmCC"); position: absolute;top: 50%; left: 50%; padding: 12px 24px; margin: -22px 0 0 -32px; background-color: rgba(255,0,0,.4); border-radius: 8px; line-height: 0; }\n\ta.de-video-player:hover::after { background-color: rgba(255,0,0,.7); }\n\t.de-video-title[de-time]::after { content: " [" attr(de-time) "]"; color: red; }\n\t.de-vocaroo > embed { display: inline-block; }\n\tvideo { background: black; }' + (

		'.de-file { display: inline-block; vertical-align: top; margin: 1px; height: ' + (p = aib.multiFile ? 90 : 130) + 'px; width: ' + p + 'px; text-align: center; background-color: rgba(96,96,96,.15); border: 1px dashed grey; }\n\t.de-file > .de-file-img { display: table; width: 100%; height: 100%; cursor: pointer; }\n\t.de-file > .de-file-img > div { display: table-cell; vertical-align: middle; }\n\t.de-file > .de-file-utils { display: none; height: 16px; margin-top: -18px; padding: 1px 0; background: rgba(64,64,64,.6); position: relative; }\n\t.de-file > .de-file-utils > .de-file-rarmsg { color: #fff; }\n\t#de-file-area { border-spacing: 0; margin-top: 1px; width: 275px; min-width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; white-space: nowrap; }\n\t.de-file-drag { background: rgba(96,96,96,.8); border: 1px solid grey; opacity: .7; }\n\t.de-file:hover:not(.de-file-drag) > .de-file-utils { display: block !important; }\n\timg.de-file-img, video.de-file-img { max-width: ' + (p - 4) + 'px; max-height: ' + (p - 4) + 'px; }\n\t.de-file-input { max-width: 300px; }\n\t.de-file-input + .de-file-utils { margin-left: 4px; }\n\t.de-file-off > .de-file-img > div::after { content: "' + Lng.dropFileHere[lang] + '"; display: block; width: 80px; margin: 0 auto; font: 11px arial; opacity: .8; white-space: initial; }\n\t.de-file-rarmsg { margin: 0 2px; vertical-align: 4px; font: bold 11px tahoma; cursor: default; }\n\t.de-file-btn-del, .de-file-btn-rar, .de-file-btn-txt { display: inline-block; margin: 0 1px; padding: 0 16px 16px 0; cursor: pointer; }\n\t.de-file-spoil { margin: 0 3px; vertical-align: 1px; }\n\t.de-file-txt-add { font-weight: bold; width: 21px; padding: 0 !important; }\n\t.de-file-txt-input { border: 1px solid #9c9c9c; padding: 2px; font: 12px/16px sans-serif; }\n\t.de-file-txt-noedit { background: rgba(255,255,255,.5); cursor: pointer; }\n\t.de-file-utils { display: inline-block; float: none; vertical-align: -2px; }') + gif('.de-file-btn-del', 'R0lGODlhEAAQALMOAP8zAMopAJMAAP/M//+DIP8pAP86Av9MDP9sFP9zHv9aC/9gFf9+HJsAAP///wAAACH5BAEAAA4ALAAAAAAQABAAAARU0MlJKw3B4hrGyFP3hQNBjE5nooLJMF/3msIkJAmCeDpeU4LFQkFUCH8VwWHJRHIM0CiIMwBYryhS4XotZDuFLUAg6LLC1l/5imykgW+gU0K22C0RADs=') + gif('.de-file-btn-rar', 'R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') + gif('.de-file-btn-txt', 'R0lGODlhEAAQAJEAACyr4e/19////wAAACH5BAEAAAIALAAAAAAQABAAAAIrlI+pwK3WokMyBEmjxbBeLgEbKFrmyXTn+nXaF7nNGMslZ9NpFu4L/ggeCgA7') + (

		'.de-parea { text-align: center; }\n\t.de-parea-btn-close::after { content: "' + Lng.hideForm[lang] + '"; }\n\t.de-parea-btn-thr::after { content: "' + Lng.makeThr[lang] + '"; }\n\t.de-parea-btn-reply::after { content: "' + Lng.makeReply[lang] + '"; }\n\t#de-pform > form { padding: 0; margin: 0; border: none; }\n\t#de-pform input[type="text"], #de-pform input[type="file"] { width: 200px; }\n\t#de-resizer-text { display: inline-block !important; float: none !important; padding: 5px; margin: ' + (nav.Presto ? '-2px -10px' : '0 0 -2px -10px') + '; vertical-align: bottom; border-bottom: 2px solid #666; border-right: 2px solid #666; cursor: se-resize; }\n\t.de-win-inpost { float: none; clear: left; display: inline-block; width: auto; padding: 3px; margin: 2px 0; }\n\t.de-win-inpost > .de-resizer { display: none; }\n\t.de-win-inpost > .de-win-head { background: none; color: inherit; }\n\t#de-win-reply { width: auto !important; min-width: 0; padding: 0 !important; border: none !important; }\n\t#de-win-reply.de-win { position: fixed !important; padding: 0 !important; margin: 0 !important; border-radius: 10px 10px 0 0; }\n\t#de-win-reply.de-win > .de-win-body { padding: 2px 2px 0 1px; border: 1px solid gray; }\n\t#de-win-reply.de-win .de-textarea { min-width: 98% !important; resize: none !important; }\n\t#de-win-reply.de-win #de-resizer-text { display: none !important; }\n\t#de-sagebtn { margin: 4px !important; vertical-align: top; cursor: pointer; }\n\t.de-textarea { display: inline-block; padding: 3px !important; min-width: 275px !important; min-height: 90px !important; resize: both; transition: none !important; }') +

		'.de-fav-del > #de-fav-buttons { display: none; }\n\t.de-fav-del > #de-fav-delbuttons { display: block !important; }\n\t.de-fav-del .de-fav-header-switch, .de-fav-del .de-fav-switch { display: block !important; margin: 2px 0 2px 4px !important; flex: none; }\n\t#de-fav-delbuttons { display: none; }\n\t.de-fav-header-switch, .de-fav-switch { display: none; }\n\t.de-fav-header { margin-top: 0; margin-bottom: 0; padding: 1px 0; display: flex; }\n\t.de-fav-entries { border-top: 1px solid rgba(80,80,80,.3); }\n\t.de-fav-header-link { margin-left: 4px; color: inherit; font-weight: bold; font-size: 14px; flex: auto; text-decoration: none; outline: none; }\n\t.de-entry { display: flex !important; align-items: center; float: none !important; padding: 0 !important; margin: 2px 0 !important; border: none !important; font-size: 14px; overflow: hidden !important; white-space: nowrap; }\n\t.de-fav-link { flex: none; margin-left: 4px; text-decoration: none; border: none; }\n\t.de-entry-title { flex: auto; padding-left: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n\t.de-fav-inf { flex: none; padding: 0 4px 0 10px; font: bold 14px serif; cursor: default; }\n\t.de-fav-inf-icon, .de-fav-inf-iwrap  { width: 16px; height: 16px; }\n\t.de-fav-inf-icon { margin-bottom: -3px; }\n\t.de-fav-inf-icon:not(.de-fav-closed):not(.de-fav-unavail):not(.de-fav-wait), .de-fav-closed > .de-fav-unavail-use, .de-fav-closed > .de-fav-wait-use, .de-fav-unavail > .de-fav-closed-use, .de-fav-unavail > .de-fav-wait-use, .de-fav-wait > .de-fav-closed-use, .de-fav-wait > .de-fav-unavail-use { display: none; }\n\t.de-fav-inf-new { color: #424f79; }\n\t.de-fav-inf-new::after { content: " +"; }\n\t.de-fav-inf-old { color: #4f7942; }\n\t.de-fav-inf-you { padding: 0 4px; margin-right: 4px; border-radius: 3px; color: #fff; background-color: #424f79; opacity: 0.65; }\n\t.de-fav-unavail { color: #cf4436; }\n\t.de-fold-block { border: 1px solid rgba(120,120,120,.8); border-radius: 2px; }\n\t.de-fold-block:not(:first-child) { border-top: none; }' +

		'#de-thr-navpanel { color: #F5F5F5; height: 98px; width: 41px; position: fixed; top: 50%; left: 0px; padding: 0; margin: -49px 0 0; background: #777; border: 1px solid #525252; border-left: none; border-radius: 0 5px 5px 0; cursor: pointer; z-index: 1000; }\n\t.de-thr-navpanel-hidden { opacity: .7; margin-left: -34px !important; }\n\t#de-thr-navarrow { display: none; position: absolute; top: 50%; left: 34px; transform: translateY(-50%); width: 7px; height: 7px; }\n\t.de-thr-navpanel-hidden > #de-thr-navarrow { display: initial; }\n\t#de-thr-navup { padding: 12px 9px 13px 8px; border-radius: 0 5px 0 0; }\n\t#de-thr-navdown { padding: 13px 9px 12px 8px; border-radius: 0 0 5px 0; }\n\t#de-thr-navup, #de-thr-navdown { width: 41px; height: 49px; -moz-box-sizing: border-box; box-sizing: border-box; }\n\t:not(.de-thr-navpanel-hidden) > #de-thr-navup:hover, :not(.de-thr-navpanel-hidden) > #de-thr-navdown:hover { background: #555; }' + (

		'@keyframes de-wait-anim { to { transform: rotate(360deg); } }\n\t.de-wait, .de-fav-wait , .de-img-load { animation: de-wait-anim 1s linear infinite; }\n\t.de-wait { margin: 0 2px -3px 0 !important; width: 16px; height: 16px; }\n\t.de-abtn { text-decoration: none !important; outline: none; }\n\t.de-after-fimg { clear: left; }\n\t#de-wrapper-popup { overflow-x: hidden !important; overflow-y: auto !important; -moz-box-sizing: border-box; box-sizing: border-box; max-height: 100vh; position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\n\t.de-popup { overflow: visible !important; clear: both !important; width: auto !important; min-width: 0pt !important; padding: 8px !important; margin: 1px !important; border: 1px solid grey !important; display: block !important; float: right !important; max-width: initial !important; }\n\t.de-popup-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; line-height: 1.15; }\n\t.de-popup-msg { display: inline-block; white-space: pre-wrap; }\n\t.de-button { flex: none; padding: 0 ' + (nav.Firefox ? 2 : 4) + 'px !important; margin: 1px 2px; height: 24px; font: 13px arial; }\n\t.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }\n\t.de-hidden { float: left; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important; width: 0 !important; height: 0 !important; display: inline !important; }\n\t.de-input-key { padding: 0 2px !important; margin: 0 !important; font: 13px/15px arial !important; }\n\t.de-link-parent { outline: 1px dotted !important; }\n\t.de-link-pview { font-weight: bold; }\n\t.de-link-ref { text-decoration: none; }\n\t.de-list { padding-top: 4px; }\n\t.de-list::before { content: "\u25CF"; margin-right: 4px; }\n\t.de-menu { padding: 0 !important; margin: 0 !important; width: auto !important; min-width: 0 !important; z-index: 9999; border: 1px solid grey !important;}\n\t.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }\n\t.de-menu-item:hover { background-color: #222; color: #fff; }\n\t.de-omitted { color: grey; }\n\t.de-omitted::before { content: "' + Lng.postsOmitted[lang] + '"; }\n\t.de-post-hiddencontent { display: none !important; }\n\t.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }\n\t.de-pview-info { padding: 3px 6px !important; }\n\t.de-ref-op::after { content: " (OP)"; }\n\t.de-ref-del::after { content: " (Del)"; }\n\t.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }\n\t.de-refmap::before { content: "' + Lng.replies[lang] + ' "; }\n\t.de-refcomma:last-child { display: none; }\n\t.de-replies-hide::after { content: "' + Lng.hidePosts[lang] + '"; }\n\t.de-replies-show::after { content: "' + Lng.showPosts[lang] + '"; }\n\t.de-thread-buttons { clear: left; margin-top: 5px; }\n\t.de-thread-collapse > a::after { content: "' + Lng.collapseThr[lang] + '"; }\n\t.de-thread-updater > a::after { content: "' + Lng.getNewPosts[lang] + '"; }\n\t#de-updater-count::before { content: ": "; }\n\t.de-viewed { color: #747488 !important; }\n\tform > hr { clear: both }');

		$css(x).id = 'de-css';
		$css('').id = 'de-css-dynamic';
		$css('').id = 'de-css-user';
		updateCSS();
	}

	function updateCSS() {
		var str = '.de-video-obj { width: ' + Cfg.YTubeWidth + 'px; height: ' + Cfg.YTubeHeigh + 'px; }\n\t.de-new-post { ' + (nav.Presto ? 'border-left: 4px solid rgba(107,134,97,.7); border-right: 4px solid rgba(107,134,97,.7)' : 'box-shadow: 6px 0 2px -2px rgba(107,134,97,.8), -6px 0 2px -2px rgba(107,134,97,.8)') + '; }\n\t.de-selected, .de-error-input { ' + (nav.Presto ? 'border-left: 4px solid rgba(220,0,0,.7); border-right: 4px solid rgba(220,0,0,.7)' : 'box-shadow: 6px 0 2px -2px rgba(220,0,0,.8), -6px 0 2px -2px rgba(220,0,0,.8)') + '; }\n\t' + (Cfg.markMyPosts ? '.de-mypost { ' + (nav.Presto ? 'border-left: 4px solid rgba(97,107,134,.7); border-right: 4px solid rgba(97,107,134,.7)' : 'box-shadow: 6px 0 2px -2px rgba(97,107,134,.8), -6px 0 2px -2px rgba(97,107,134,.8)') + '; }\n\t\t.de-mypost .de-post-counter::after { content: counter(de-cnt) " (You)"; }\n\t\t.de-mypost .de-post-deleted::after { content: "' + Lng.deleted[lang] + ' (You)"; }' : '') + '\n\t' + (Cfg.markMyLinks ? '.de-ref-my::after { content: " (You)"; }\n\t\t.de-ref-del.de-ref-my::after { content: " (Del)(You)"; }\n\t\t.de-ref-op.de-ref-my::after { content: " (OP)(You)"; }' : '') + '\n\t' + (Cfg.postBtnsCSS === 0 ? '.de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep, .de-btn-hide, .de-btn-unhide, .de-btn-src { fill: rgba(0,0,0,0); color: currentColor; }\n\t\t.de-btn-fav-sel, .de-btn-stick-on, .de-btn-sage, .de-btn-hide-user, .de-btn-unhide-user { fill: rgba(0,0,0,0); color: #F00; }' : '.de-btn-hide, .de-btn-unhide, .de-btn-src, .de-btn-sage, .de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep { color: #F5F5F5; }\n\t\t.de-btn-hide-user { color: #BFFFBF; }\n\t\t.de-btn-unhide-user { color: #FFBFBF; }\n\t\t.de-btn-fav-sel { color: #FFE100; }\n\t\t.de-btn-stick-on { color: #BFFFBF; }\n\t\t.de-btn-sage { fill: #4B4B4B; }\n\t\t.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-src, .de-btn-stick, .de-btn-stick-on { fill: ' + (Cfg.postBtnsCSS === 1 && !nav.Presto ? 'url(#de-btn-back-gradient)' : Cfg.postBtnsBack) + '; }') + '\n\t' + (Cfg.hideReplies || Cfg.updThrBtns ? '.de-thread-buttons::before { content: ">> "; }' : '') + '\n\t' + (Cfg.resizeImgs ? '' : '.de-img-wrapper-inpost > .de-img-full { width: auto; }') + '\n\t' + (Cfg.maskImgs ? aib.qPostImg + (', .de-img-pre, .de-video-obj { opacity: ' + Cfg.maskVisib / 100 + ' !important; } ' + aib.qPostImg.split(', ').join(':hover, ') + ':hover, .de-img-pre:hover, .de-video-obj:hover { opacity: 1 !important; }\n\t\t.de-video-obj:not(.de-video-obj-inline) { clear: both; }') : '') + '\n\t' + (Cfg.delImgNames ? '.de-img-name { text-transform: capitalize; text-decoration: none; }' : '') + '\n\t' + (Cfg.widePosts ? '.' + aib.cReply.replace(/\s/, '.') + ':not(.de-pview) { float: none; width: 100%; }' : '') + '\n\t' + (Cfg.strikeHidd ? '.de-link-hid { text-decoration: line-through !important; }' : '') + '\n\t' + (Cfg.noSpoilers === 1 ? '.spoiler, s { color: #F5F5F5 !important; background-color: #888 !important; }\n\t\t.spoiler > a, s > a:not(:hover) { color: #F5F5F5 !important; background-color: #888 !important; }' : Cfg.noSpoilers === 2 ? '.spoiler, s { color: inherit !important; }\n\t\t.spoiler > a, s > a:not(:hover) { color: inherit !important; }' : '') + '\n\t' + (Cfg.fileInputs ? '' : '.de-file-input { display: inline !important; }') + '\n\t' + (!Cfg.addSageBtn ? '#de-sagebtn, ' : '') + (Cfg.delHiddPost === 1 || Cfg.delHiddPost === 3 ? '.de-thr-hid, .de-thr-hid + div + hr, .de-thr-hid + div + br, .de-thr-hid + div + br + hr, .de-thr-hid + div + div + hr, ' : '') + (!Cfg.imgNavBtns ? '#de-img-btn-next, #de-img-btn-prev, ' : '') + (!Cfg.imgInfoLink ? '.de-img-full-info, ' : '') + (Cfg.noPostNames ? aib.qPostName + ', ' + aib.qPostTrip + ', ' : '') + (Cfg.noBoardRule ? aib.qFormRules + ', ' : '') + (!Cfg.panelCounter ? '#de-panel-info, ' : '') + (Cfg.removeHidd ? '.de-link-ref.de-link-hid, .de-link-ref.de-link-hid + .de-refcomma, ' : '') + (!Cfg.showHideBtn ? '.de-btn-hide, ' : '') + (!Cfg.showRepBtn ? '.de-btn-rep, ' : '') + (!Cfg.updThrBtns && !aib.t ? '.de-thread-updater, ' : '') + (!Cfg.ajaxPosting ? '.de-file-btn-rar, .de-file-btn-txt, ' : '') + (!Cfg.fileInputs ? '.de-file-txt-wrap, .de-file-btn-txt, ' : '') + (!aib.kus && (aib.multiFile || Cfg.fileInputs !== 2) ? '#de-pform form > table > tbody > tr > td:not([colspan]):first-child, #de-pform form > table > tbody > tr > th:first-child, ' : '') + ' body > hr, .postarea, small[id^="rfmap"], .theader { display: none !important; }';
		$id('de-css-dynamic').textContent = str + '\n' + aib.css;
		$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
	}


	function runMain(checkDomains, dataPromise) {
		var formEl, eList, fav, _ref67, _ref68, _ref69, _ref70, storageName, firstThr;

		return regeneratorRuntime.async(function runMain$(_context22) {
			while (1) {
				switch (_context22.prev = _context22.next) {
					case 0:
						Logger.init();
						docBody = doc.body;

						if (docBody) {
							_context22.next = 4;
							break;
						}

						return _context22.abrupt('return');

					case 4:
						if (!aib) {
							aib = getImageBoard(checkDomains, true);
						}
						formEl = $q(aib.qDForm + ', form[de-form]');

						if (formEl) {
							_context22.next = 9;
							break;
						}

						if (aib.observeContent) {
							aib.observeContent(checkDomains, dataPromise);
						}
						return _context22.abrupt('return');

					case 9:
						Logger.log('Imageboard check');

						if (locStorage) {
							_context22.next = 14;
							break;
						}

						if (checkStorage()) {
							_context22.next = 13;
							break;
						}

						return _context22.abrupt('return');

					case 13:
						initNavFuncs();

					case 14:
						eList = void 0, fav = void 0;

						if (!dataPromise) {
							_context22.next = 24;
							break;
						}

						_context22.next = 18;
						return regeneratorRuntime.awrap(dataPromise);

					case 18:
						_ref67 = _context22.sent;
						_ref68 = _slicedToArray(_ref67, 2);
						eList = _ref68[0];
						fav = _ref68[1];
						_context22.next = 30;
						break;

					case 24:
						_context22.next = 26;
						return regeneratorRuntime.awrap(readData());

					case 26:
						_ref69 = _context22.sent;
						_ref70 = _slicedToArray(_ref69, 2);
						eList = _ref70[0];
						fav = _ref70[1];

					case 30:
						if (!(eList && eList.includes(aib.dm))) {
							_context22.next = 32;
							break;
						}

						return _context22.abrupt('return');

					case 32:
						excludeList = eList || '';
						Logger.log('Data loading');

						if (!(!Cfg.disabled && (aib.init && aib.init() || $id('de-panel')))) {
							_context22.next = 36;
							break;
						}

						return _context22.abrupt('return');

					case 36:
						addSVGIcons();

						if (!Cfg.disabled) {
							_context22.next = 41;
							break;
						}

						panel.init(formEl);
						scriptCSS();
						return _context22.abrupt('return');

					case 41:
						initStorageEvent();
						DollchanAPI.init();
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
							doc.defaultView.addEventListener('beforeunload', function (e) {
								sesStorage['de-scroll-' + aib.b + aib.t] = window.pageYOffset;
							});
						}
						Logger.log('Init');
						if (Cfg.correctTime) {
							dTime = new DateTime(Cfg.timePattern, Cfg.timeRPattern, Cfg.timeOffset, lang, function (rp) {
								return saveCfg('timeRPattern', rp);
							});
							Logger.log('Time correction');
						}
						MyPosts.read();
						Logger.log('Read my posts');
						$hide(docBody);
						dummy = doc.createElement('div');
						formEl = aib.fixHTML(formEl, true);
						Logger.log('Replace delform');
						pByEl = new Map();
						pByNum = new Map();
						_context22.prev = 55;

						DelForm.last = DelForm.first = new DelForm(formEl, aib.page, false);

						if (Thread.first) {
							_context22.next = 59;
							break;
						}

						throw 'No threads detected!';

					case 59:
						_context22.next = 66;
						break;

					case 61:
						_context22.prev = 61;
						_context22.t0 = _context22['catch'](55);

						console.error('Delform parsing error:', getErrorMessage(_context22.t0));
						$show(docBody);
						return _context22.abrupt('return');

					case 66:
						Logger.log('Parse delform');
						storageName = 'de-lastpcount-' + aib.b + '-' + aib.t;

						if (aib.t && !!sesStorage[storageName]) {
							if (sesStorage[storageName] > Thread.first.pcount) {
								sesStorage.removeItem(storageName);
								window.location.reload();
							}
						}
						pr = new PostForm($q(aib.qForm));
						Logger.log('Parse postform');
						if (Cfg.hotKeys) {
							HotKeys.enable();
							Logger.log('Init keybinds');
						}
						initPage();
						Logger.log('Init page');
						panel.init(formEl);
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
							readPostsData(firstThr.op, fav);
						}
						Logger.log('Hide posts');
						scrollPage();
						Logger.log('Scroll page');
						if (localData) {
							$each($Q('.de-post-removed'), function (el) {
								var post = pByEl.get(el);
								if (post) {
									post['delete'](false);
								}
							});
							Logger.log('Local changings');
						}
						Logger.finish();

					case 91:
					case 'end':
						return _context22.stop();
				}
			}
		}, null, this, [[55, 61]]);
	}

	if (/^(?:about|chrome|opera|res):$/i.test(window.location.protocol)) {
		return;
	}
	if (doc.readyState !== 'loading') {
		needScroll = false;
		runMain(true, null);
	} else {
		var _ret12 = function () {
			var dataPromise = null;
			if (aib = getImageBoard(true, false)) {
				if (!checkStorage()) {
					return {
						v: void 0
					};
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
		}();

		if ((typeof _ret12 === 'undefined' ? 'undefined' : _typeof(_ret12)) === "object") return _ret12.v;
	}

})(window.opera && window.opera.scriptStorage, window.FormData, function (x, y) {
	return window.scrollTo(x, y);
}, (typeof localData === 'undefined' ? 'undefined' : _typeof(localData)) === 'object' ? localData : null);

},{}],122:[function(require,module,exports){
'use strict';

require('core-js/fn/object/assign');
require('core-js/fn/array/from');
require('core-js/fn/array/iterator');
require('core-js/fn/number/max-safe-integer');
require('core-js/fn/string/includes');
require('core-js/fn/string/repeat');
require('core-js/fn/string/starts-with');
require('core-js/fn/math/clz32');
require('core-js/fn/symbol');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/weak-map');
require('core-js/fn/promise');
require('regenerator-runtime/runtime');

},{"core-js/fn/array/from":1,"core-js/fn/array/iterator":2,"core-js/fn/map":3,"core-js/fn/math/clz32":4,"core-js/fn/number/max-safe-integer":5,"core-js/fn/object/assign":6,"core-js/fn/promise":7,"core-js/fn/set":8,"core-js/fn/string/includes":9,"core-js/fn/string/repeat":10,"core-js/fn/string/starts-with":11,"core-js/fn/symbol":12,"core-js/fn/weak-map":13,"regenerator-runtime/runtime":120}]},{},[122,121]);
})(null);