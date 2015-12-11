// ==UserScript==
// @name            Dollchan Extension Tools
// @version         15.11.29.1
// @namespace       http://www.freedollchan.org/scripts/*
// @author          Sthephan Shinkufag @ FreeDollChan
// @copyright       (c) 2015 Dollchan Extension Tools Team. See the LICENSE file for license rights and limitations (MIT).
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
// ==/UserScript==
(function de_main_func_outer() { 
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":25,"../../modules/es6.array.from":78,"../../modules/es6.string.iterator":88}],2:[function(require,module,exports){
require('../../modules/es6.array.iterator');
module.exports = require('../../modules/$.core').Array.values;
},{"../../modules/$.core":25,"../../modules/es6.array.iterator":79}],3:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
module.exports = require('../modules/$.core').Map;
},{"../modules/$.core":25,"../modules/es6.map":80,"../modules/es6.object.to-string":84,"../modules/es6.string.iterator":88,"../modules/es7.map.to-json":93,"../modules/web.dom.iterable":95}],4:[function(require,module,exports){
require('../../modules/es6.math.clz32');
module.exports = require('../../modules/$.core').Math.clz32;
},{"../../modules/$.core":25,"../../modules/es6.math.clz32":81}],5:[function(require,module,exports){
require('../../modules/es6.number.max-safe-integer');
module.exports = 0x1fffffffffffff;
},{"../../modules/es6.number.max-safe-integer":82}],6:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":25,"../../modules/es6.object.assign":83}],7:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":25,"../modules/es6.object.to-string":84,"../modules/es6.promise":85,"../modules/es6.string.iterator":88,"../modules/web.dom.iterable":95}],8:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
module.exports = require('../modules/$.core').Set;
},{"../modules/$.core":25,"../modules/es6.object.to-string":84,"../modules/es6.set":86,"../modules/es6.string.iterator":88,"../modules/es7.set.to-json":94,"../modules/web.dom.iterable":95}],9:[function(require,module,exports){
require('../../modules/es6.string.includes');
module.exports = require('../../modules/$.core').String.includes;
},{"../../modules/$.core":25,"../../modules/es6.string.includes":87}],10:[function(require,module,exports){
require('../../modules/es6.string.repeat');
module.exports = require('../../modules/$.core').String.repeat;
},{"../../modules/$.core":25,"../../modules/es6.string.repeat":89}],11:[function(require,module,exports){
require('../../modules/es6.string.starts-with');
module.exports = require('../../modules/$.core').String.startsWith;
},{"../../modules/$.core":25,"../../modules/es6.string.starts-with":90}],12:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":25,"../../modules/es6.object.to-string":84,"../../modules/es6.symbol":91}],13:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/web.dom.iterable');
require('../modules/es6.weak-map');
module.exports = require('../modules/$.core').WeakMap;
},{"../modules/$.core":25,"../modules/es6.object.to-string":84,"../modules/es6.weak-map":92,"../modules/web.dom.iterable":95}],14:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],15:[function(require,module,exports){

var UNSCOPABLES = require('./$.wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./$.hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./$.hide":38,"./$.wks":76}],16:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":44}],17:[function(require,module,exports){







var ctx      = require('./$.ctx')
  , IObject  = require('./$.iobject')
  , toObject = require('./$.to-object')
  , toLength = require('./$.to-length')
  , asc      = require('./$.array-species-create');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
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
},{"./$.array-species-create":18,"./$.ctx":26,"./$.iobject":41,"./$.to-length":73,"./$.to-object":74}],18:[function(require,module,exports){

var isObject = require('./$.is-object')
  , isArray  = require('./$.is-array')
  , SPECIES  = require('./$.wks')('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
   
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};
},{"./$.is-array":43,"./$.is-object":44,"./$.wks":76}],19:[function(require,module,exports){

var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
 
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
   
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
   
    : ARG ? cof(O)
   
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":20,"./$.wks":76}],20:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],21:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , redefineAll  = require('./$.redefine-all')
  , ctx          = require('./$.ctx')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , $iterDefine  = require('./$.iter-define')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , setSpecies   = require('./$.set-species')
  , DESCRIPTORS  = require('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
 
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
   
    if(!isExtensible(it))return 'F';
   
    if(!create)return 'E';
   
    hide(it, ID, ++id);
 
  } return 'O' + it[ID];
};

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
      strictNew(that, C, NAME);
      that._i = $.create(null);
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
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
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
},{"./$":52,"./$.ctx":26,"./$.defined":27,"./$.descriptors":28,"./$.for-of":34,"./$.has":37,"./$.hide":38,"./$.is-object":44,"./$.iter-define":48,"./$.iter-step":50,"./$.redefine-all":58,"./$.set-species":62,"./$.strict-new":66,"./$.uid":75}],22:[function(require,module,exports){

var forOf   = require('./$.for-of')
  , classof = require('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":19,"./$.for-of":34}],23:[function(require,module,exports){
'use strict';
var hide              = require('./$.hide')
  , redefineAll       = require('./$.redefine-all')
  , anObject          = require('./$.an-object')
  , isObject          = require('./$.is-object')
  , strictNew         = require('./$.strict-new')
  , forOf             = require('./$.for-of')
  , createArrayMethod = require('./$.array-methods')
  , $has              = require('./$.has')
  , WEAK              = require('./$.uid')('weak')
  , isExtensible      = Object.isExtensible || isObject
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;


var frozenStore = function(that){
  return that._l || (that._l = new FrozenStore);
};
var FrozenStore = function(){
  this.a = [];
};
var findFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
FrozenStore.prototype = {
  get: function(key){
    var entry = findFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findFrozen(this, key);
  },
  set: function(key, value){
    var entry = findFrozen(this, key);
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
      strictNew(that, C, NAME);
      that._i = id++;     
      that._l = undefined;
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
     
     
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
     
     
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(anObject(key))){
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    } return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};
},{"./$.an-object":16,"./$.array-methods":17,"./$.for-of":34,"./$.has":37,"./$.hide":38,"./$.is-object":44,"./$.redefine-all":58,"./$.strict-new":66,"./$.uid":75}],24:[function(require,module,exports){
'use strict';
var global         = require('./$.global')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , fails          = require('./$.fails')
  , $iterDetect    = require('./$.iter-detect')
  , setToStringTag = require('./$.set-to-string-tag');

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
  } else {
    var instance             = new C
     
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
     
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
     
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); })
     
      , BUGGY_ZERO;
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        strictNew(target, C, NAME);
        var that = new Base;
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    IS_WEAK || instance.forEach(function(val, key){
      BUGGY_ZERO = 1 / key === -Infinity;
    });
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
},{"./$.export":31,"./$.fails":33,"./$.for-of":34,"./$.global":36,"./$.is-object":44,"./$.iter-detect":49,"./$.redefine":59,"./$.redefine-all":58,"./$.set-to-string-tag":63,"./$.strict-new":66}],25:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core;
},{}],26:[function(require,module,exports){

var aFunction = require('./$.a-function');
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
},{"./$.a-function":14}],27:[function(require,module,exports){

module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],28:[function(require,module,exports){

module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":33}],29:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
 
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":36,"./$.is-object":44}],30:[function(require,module,exports){

var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":52}],31:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , hide      = require('./$.hide')
  , redefine  = require('./$.redefine')
  , ctx       = require('./$.ctx')
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
   
    own = !IS_FORCED && target && key in target;
   
    out = (own ? target : source)[key];
   
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
   
    if(target && !own)redefine(target, key, out);
   
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
module.exports = $export;
},{"./$.core":25,"./$.ctx":26,"./$.global":36,"./$.hide":38,"./$.redefine":59}],32:[function(require,module,exports){
var MATCH = require('./$.wks')('match');
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
},{"./$.wks":76}],33:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],34:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
 
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":16,"./$.ctx":26,"./$.is-array-iter":42,"./$.iter-call":46,"./$.to-length":73,"./core.get-iterator-method":77}],35:[function(require,module,exports){

var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":52,"./$.to-iobject":72}],36:[function(require,module,exports){

var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global;
},{}],37:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],38:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":52,"./$.descriptors":28,"./$.property-desc":57}],39:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":36}],40:[function(require,module,exports){

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
},{}],41:[function(require,module,exports){

var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":20}],42:[function(require,module,exports){

var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":51,"./$.wks":76}],43:[function(require,module,exports){

var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":20}],44:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],45:[function(require,module,exports){

var isObject = require('./$.is-object')
  , cof      = require('./$.cof')
  , MATCH    = require('./$.wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./$.cof":20,"./$.is-object":44,"./$.wks":76}],46:[function(require,module,exports){

var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
 
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":16}],47:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};


require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":52,"./$.hide":38,"./$.property-desc":57,"./$.set-to-string-tag":63,"./$.wks":76}],48:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
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
    , methods, key;
 
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
   
    setToStringTag(IteratorPrototype, TAG, true);
   
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
   
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
 
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
 
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":52,"./$.export":31,"./$.has":37,"./$.hide":38,"./$.iter-create":47,"./$.iterators":51,"./$.library":54,"./$.redefine":59,"./$.set-to-string-tag":63,"./$.wks":76}],49:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
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
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){  }
  return safe;
};
},{"./$.wks":76}],50:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],51:[function(require,module,exports){
module.exports = {};
},{}],52:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],53:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":52,"./$.to-iobject":72}],54:[function(require,module,exports){
module.exports = false;
},{}],55:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn();
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};


if(isNode){
  notify = function(){
    process.nextTick(flush);
  };

} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true});
  notify = function(){
    node.data = toggle = -toggle;
  };

} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };






} else {
  notify = function(){
   
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":20,"./$.global":36,"./$.task":70}],56:[function(require,module,exports){

var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');


module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":52,"./$.fails":33,"./$.iobject":41,"./$.to-object":74}],57:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],58:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":59}],59:[function(require,module,exports){


var global    = require('./$.global')
  , hide      = require('./$.hide')
  , SRC       = require('./$.uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    val.hasOwnProperty('name') || hide(val, 'name', key);
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./$.core":25,"./$.global":36,"./$.hide":38,"./$.uid":75}],60:[function(require,module,exports){

module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],61:[function(require,module,exports){

var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ?
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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
},{"./$":52,"./$.an-object":16,"./$.ctx":26,"./$.is-object":44}],62:[function(require,module,exports){
'use strict';
var global      = require('./$.global')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":52,"./$.descriptors":28,"./$.global":36,"./$.wks":76}],63:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":52,"./$.has":37,"./$.wks":76}],64:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":36}],65:[function(require,module,exports){

var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":14,"./$.an-object":16,"./$.wks":76}],66:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],67:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');


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
},{"./$.defined":27,"./$.to-integer":71}],68:[function(require,module,exports){

var isRegExp = require('./$.is-regexp')
  , defined  = require('./$.defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./$.defined":27,"./$.is-regexp":45}],69:[function(require,module,exports){
'use strict';
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./$.defined":27,"./$.to-integer":71}],70:[function(require,module,exports){
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
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
var listner = function(event){
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
 
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
 
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
 
 
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
 
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
},{"./$.cof":20,"./$.ctx":26,"./$.dom-create":29,"./$.global":36,"./$.html":39,"./$.invoke":40}],71:[function(require,module,exports){

var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],72:[function(require,module,exports){

var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":27,"./$.iobject":41}],73:[function(require,module,exports){

var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
};
},{"./$.to-integer":71}],74:[function(require,module,exports){

var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":27}],75:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],76:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":36,"./$.shared":64,"./$.uid":75}],77:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":19,"./$.core":25,"./$.iterators":51,"./$.wks":76}],78:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
 
  from: function from(arrayLike){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
   
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":26,"./$.export":31,"./$.is-array-iter":42,"./$.iter-call":46,"./$.iter-detect":49,"./$.to-length":73,"./$.to-object":74,"./core.get-iterator-method":77}],79:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');





module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
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
},{"./$.add-to-unscopables":15,"./$.iter-define":48,"./$.iter-step":50,"./$.iterators":51,"./$.to-iobject":72}],80:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');


require('./$.collection')('Map', function(get){
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
},{"./$.collection":24,"./$.collection-strong":21}],81:[function(require,module,exports){

var $export = require('./$.export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./$.export":31}],82:[function(require,module,exports){

var $export = require('./$.export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./$.export":31}],83:[function(require,module,exports){

var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":31,"./$.object-assign":56}],84:[function(require,module,exports){
'use strict';

var classof = require('./$.classof')
  , test    = {};
test[require('./$.wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./$.redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./$.classof":19,"./$.redefine":59,"./$.wks":76}],85:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
   
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
   
    if(works && require('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();


var sameConstructor = function(a, b){
 
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
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
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record;
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record;
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false};
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e);
  }
};


if(!USE_NATIVE){
 
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),        
      c: [],                                 
      a: undefined,                          
      s: 0,                                  
      d: false,                              
      v: undefined,                          
      h: false,                              
      n: false                               
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
   
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
   
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];


$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
 
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
 
  resolve: function resolve(x){
   
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
 
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
 
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
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
},{"./$":52,"./$.a-function":14,"./$.an-object":16,"./$.classof":19,"./$.core":25,"./$.ctx":26,"./$.descriptors":28,"./$.export":31,"./$.for-of":34,"./$.global":36,"./$.is-object":44,"./$.iter-detect":49,"./$.library":54,"./$.microtask":55,"./$.redefine-all":58,"./$.same-value":60,"./$.set-proto":61,"./$.set-species":62,"./$.set-to-string-tag":63,"./$.species-constructor":65,"./$.strict-new":66,"./$.wks":76}],86:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');


require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
 
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":24,"./$.collection-strong":21}],87:[function(require,module,exports){

'use strict';
var $export  = require('./$.export')
  , context  = require('./$.string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./$.fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString ){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./$.export":31,"./$.fails-is-regexp":32,"./$.string-context":68}],88:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);


require('./$.iter-define')(String, 'String', function(iterated){
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
},{"./$.iter-define":48,"./$.string-at":67}],89:[function(require,module,exports){
var $export = require('./$.export');

$export($export.P, 'String', {
 
  repeat: require('./$.string-repeat')
});
},{"./$.export":31,"./$.string-repeat":69}],90:[function(require,module,exports){

'use strict';
var $export     = require('./$.export')
  , toLength    = require('./$.to-length')
  , context     = require('./$.string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./$.fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString ){
    var that   = context(this, searchString, STARTS_WITH)
      , $$     = arguments
      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./$.export":31,"./$.fails-is-regexp":32,"./$.string-context":68,"./$.to-length":73}],91:[function(require,module,exports){
'use strict';

var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;


var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
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
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return;
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
 
 
 
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});


if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
 
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
 
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};











$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
 
  create: $create,
 
  defineProperty: $defineProperty,
 
  defineProperties: $defineProperties,
 
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
 
  getOwnPropertyNames: $getOwnPropertyNames,
 
  getOwnPropertySymbols: $getOwnPropertySymbols
});


$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});


setToStringTag($Symbol, 'Symbol');

setToStringTag(Math, 'Math', true);

setToStringTag(global.JSON, 'JSON', true);
},{"./$":52,"./$.an-object":16,"./$.descriptors":28,"./$.enum-keys":30,"./$.export":31,"./$.fails":33,"./$.get-names":35,"./$.global":36,"./$.has":37,"./$.is-array":43,"./$.keyof":53,"./$.library":54,"./$.property-desc":57,"./$.redefine":59,"./$.set-to-string-tag":63,"./$.shared":64,"./$.to-iobject":72,"./$.uid":75,"./$.wks":76}],92:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , redefine     = require('./$.redefine')
  , weak         = require('./$.collection-weak')
  , isObject     = require('./$.is-object')
  , has          = require('./$.has')
  , frozenStore  = weak.frozenStore
  , WEAK         = weak.WEAK
  , isExtensible = Object.isExtensible || isObject
  , tmp          = {};


var $WeakMap = require('./$.collection')('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
 
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return frozenStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this._i];
    }
  },
 
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);


if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
     
      if(isObject(a) && !isExtensible(a)){
        var result = frozenStore(this)[key](a, b);
        return key == 'set' ? this : result;
     
      } return method.call(this, a, b);
    });
  });
}
},{"./$":52,"./$.collection":24,"./$.collection-weak":23,"./$.has":37,"./$.is-object":44,"./$.redefine":59}],93:[function(require,module,exports){

var $export  = require('./$.export');

$export($export.P, 'Map', {toJSON: require('./$.collection-to-json')('Map')});
},{"./$.collection-to-json":22,"./$.export":31}],94:[function(require,module,exports){

var $export  = require('./$.export');

$export($export.P, 'Set', {toJSON: require('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":22,"./$.export":31}],95:[function(require,module,exports){
require('./es6.array.iterator');
var global      = require('./$.global')
  , hide        = require('./$.hide')
  , Iterators   = require('./$.iterators')
  , ITERATOR    = require('./$.wks')('iterator')
  , NL          = global.NodeList
  , HTC         = global.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype
  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);
},{"./$.global":36,"./$.hide":38,"./$.iterators":51,"./$.wks":76,"./es6.array.iterator":79}],96:[function(require,module,exports){


var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
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
    var timeout = setTimeout(cleanUpNextTick);
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
    clearTimeout(timeout);
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
        setTimeout(drainQueue, 0);
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],97:[function(require,module,exports){
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
   
    var generator = Object.create((outerFn || Generator).prototype);
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
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }

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
      this.sent = undefined;
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
},{"_process":96}],98:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




















(function de_main_func_inner(scriptStorage, FormData) {
	'use strict';

	var _marked = [getFormElements, getStored, getStoredObj, getLocStoredObj, readCfg, readPostsData, readMyPosts, addMyPost, html5Submit, runMain].map(regeneratorRuntime.mark);

	var version = '15.11.29.1';
	var commit = '9359e08';

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
		'markNewPosts': 1,
		'noErrInTitle': 0,
		'hideReplies': 0,
		'expandTrunc': 0,
		'updThrBtns': 1,
		'showHideBtn': 1,
		'showRepBtn': 1,
		'postBtnsCSS': 1,
		'postBtnsBack': '#8C8C8C',
		'noSpoilers': 1,
		'noPostNames': 0,
		'widePosts': 0,
		'correctTime': 0,
		'timeOffset': '+0',
		'timePattern': '',
		'timeRPattern': '',
		'expandImgs': 2,
		'imgNavBtns': 1,
		'resizeDPI': 0,
		'resizeImgs': 1,
		'minImgSize': 100,
		'zoomFactor': 25,
		'webmControl': 1,
		'webmVolume': 100,
		'preLoadImgs': 0,
		'findImgFile': 0,
		'openImgs': 0,
		'imgSrcBtns': 1,
		'delImgNames': 0,
		'maskImgs': 0,
		'maskVisib': 7,
		'linksNavig': 2,
		'linksOver': 100,
		'linksOut': 1500,
		'markViewed': 0,
		'strikeHidd': 0,
		'removeHidd': 0,
		'noNavigHidd': 0,
		'crossLinks': 0,
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
		'ajaxReply': 2,
		'postSameImg': 1,
		'removeEXIF': 1,
		'removeFName': 0,
		'sendErrNotif': 1,
		'scrAfterRep': 0,
		'addPostForm': 2,
		'spacedQuote': 1,
		'favOnReply': 1,
		'warnSubjTrip': 0,
		'fileThumb': 1,
		'addSageBtn': 1,
		'saveSage': 1,
		'sageReply': 0,
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
	},
	    Lng = {
		cfg: {
			'hideBySpell': ['Спеллы: ', 'Magic spells: '],
			'sortSpells': ['Сортировать спеллы и удалять дубликаты', 'Sort spells and delete duplicates'],
			'menuHiddBtn': ['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
			'hideRefPsts': ['Скрывать ответы на скрытые посты*', 'Hide replies to hidden posts*'],
			'delHiddPost': ['Удалять скрытые посты', 'Delete hidden posts'],

			'ajaxUpdThr': ['AJAX обновление треда ', 'AJAX thread update '],
			'updThrDelay': ['(сек)', '(sec)'],
			'updCount': ['Обратный счетчик секунд до обновления', 'Show countdown to thread update'],
			'favIcoBlink': ['Мигать фавиконом при новых постах', 'Favicon blinking for new posts'],
			'desktNotif': ['Уведомлять о новых постах на рабочем столе', 'Desktop notifications for new posts'],
			'markNewPosts': ['Выделять новые посты при смене вкладки', 'Mark new posts when tab changes'],
			'noErrInTitle': ['Не показывать номер ошибки в заголовке', 'Don\'t show error number in title'],
			'hideReplies': ['Показывать только оп-посты в списке тредов*', 'Show only op-posts in threads list*'],
			'expandTrunc': ['Разворачивать сокращенные посты*', 'Auto expanding of truncated posts*'],
			'updThrBtns': ['Кнопки получения новых постов в списке тредов', 'Get-new-posts buttons in threads list'],
			'showHideBtn': ['Кнопки скрытия ', 'Hide buttons '],
			'showRepBtn': ['Кнопки быстрого ответа', 'Quick reply buttons'],
			'postBtnsCSS': {
				sel: [['Упрощенные', 'Серый градиент', 'Настраиваемые'], ['Simple green', 'Gradient grey', 'Custom filled']],
				txt: ['Кнопки постов ', 'Post buttons ']
			},
			'noSpoilers': {
				sel: [['Откл.', 'Серое', 'Родное'], ['Disable', 'Grey', 'Native']],
				txt: ['Раскрытие текстовых спойлеров', 'Text spoilers expanding']
			},
			'noPostNames': ['Скрывать имена в постах', 'Hide names in posts'],
			'widePosts': ['Растягивать посты по ширине экрана', 'Stretch posts to screen width'],
			'hotKeys': ['Горячие клавиши', 'Keyboard hotkeys'],
			'loadPages': ['Количество страниц, загружаемых по F5', 'Number of pages that are loaded on F5 '],
			'correctTime': ['Коррекция времени* ', 'Correct time* '],
			'timeOffset': ['(ч) разница ', '(h) difference '],
			'timePattern': ['Шаблон поиска', 'Search pattern'],
			'timeRPattern': ['Шаблон замены', 'Replace pattern'],

			'expandImgs': {
				sel: [['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
				txt: ['Раскрывать картинки по клику', 'Expand images on click']
			},
			'imgNavBtns': ['Добавлять кнопки навигации по картинкам', 'Add buttons for images navigation'],
			'resizeDPI': ['Отображать картинки пиксель в пиксель', 'Don\'t upscale images on retina displays'],
			'resizeImgs': ['Уменьшать в экран большие картинки', 'Resize large images to fit screen'],
			'minImgSize': ['Минимальный размер картинок (px)', 'Minimal image\'s size (px)'],
			'zoomFactor': ['Чувствительность зума картинок [1-100%]', 'Sensibility of the images zoom [1-100%]'],
			'webmControl': ['Показывать контрол-бар для webm-файлов', 'Show control bar for webm files'],
			'webmVolume': ['Громкость webm-файлов [0-100%]', 'Default volume for webm files [0-100%]'],
			'preLoadImgs': ['Предварительно загружать картинки*', 'Pre-load images*'],
			'findImgFile': ['Распознавать встроенные файлы в картинках*', 'Detect built-in files in images*'],
			'openImgs': {
				sel: [['Откл.', 'Все подряд', 'Только GIF', 'Кроме GIF'], ['Disable', 'All types', 'Only GIF', 'Non-GIF']],
				txt: ['Заменять картинки на оригиналы*', 'Replace images with originals*']
			},
			'imgSrcBtns': ['Добавлять кнопки для поиска картинок*', 'Add image search buttons*'],
			'delImgNames': ['Скрывать имена картинок*', 'Hide names of images*'],
			'maskVisib': ['Видимость при маскировке [0-100%]', 'Visibility for masked images [0-100%]'],

			'linksNavig': {
				sel: [['Откл.', 'Без карты', 'С картой'], ['Disable', 'No map', 'With map']],
				txt: ['Навигация по >>ссылкам* ', 'Navigation by >>links* ']
			},
			'linksOver': ['Появление ', 'Appearance '],
			'linksOut': ['Пропадание (мс)', 'Disappearance (ms)'],
			'markViewed': ['Отмечать просмотренные посты', 'Mark viewed posts'],
			'strikeHidd': ['Зачеркивать >>ссылки на скрытые посты', 'Strike >>links to hidden posts'],
			'removeHidd': ['Удалять из карты ответов', 'Remove from replies map'],
			'noNavigHidd': ['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
			'crossLinks': ['Преобразовывать http:// в >>/b/ссылки*', 'Replace http:// with >>/b/links*'],
			'insertNum': ['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*'],
			'addOPLink': ['>>ссылка при ответе на оп-пост на доске', 'Insert >>link for reply to op-posts on board'],
			'addImgs': ['Загружать картинки к jpg, png, gif ссылкам*', 'Load images to jpg, png, gif links*'],
			'addMP3': ['Плеер к mp3 ссылкам* ', 'Player to mp3 links* '],
			'addVocaroo': ['к Vocaroo ссылкам*', 'to Vocaroo links*'],
			'addVimeo': ['Добавлять плеер к Vimeo ссылкам*', 'Add player to Vimeo links*'],
			'addYouTube': {
				sel: [['Ничего', 'Плеер по клику', 'Авто плеер', 'Превью+плеер', 'Только превью'], ['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']],
				txt: ['к YouTube-ссылкам* ', 'to YouTube-links* ']
			},
			'YTubeType': {
				sel: [['Flash', 'HTML5'], ['Flash', 'HTML5']],
				txt: ['', '']
			},
			'YTubeTitles': ['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],
			'ytApiKey': ['Ключ YT API*', 'YT API Key*'],

			'ajaxReply': {
				sel: [['Откл.', 'Iframe', 'HTML5'], ['Disable', 'Iframe', 'HTML5']],
				txt: ['AJAX отправка постов*', 'posting with AJAX*']
			},
			'postSameImg': ['Возможность отправки одинаковых картинок', 'Ability to post same images'],
			'removeEXIF': ['Удалять EXIF из JPEG ', 'Remove EXIF from JPEG '],
			'removeFName': ['Удалять имя файлов', 'Clear file names'],
			'sendErrNotif': ['Оповещать в заголовке об ошибке отправки', 'Inform in title about post send error'],
			'scrAfterRep': ['Перемещаться в конец треда после отправки', 'Scroll to the bottom after reply'],
			'addPostForm': {
				sel: [['Сверху', 'Внизу', 'Скрытая'], ['At top', 'At bottom', 'Hidden']],
				txt: ['Форма ответа в треде', 'Reply form in thread']
			},
			'spacedQuote': ['Вставлять пробел при цитировании "> "', 'Insert a space when quoting "> "'],
			'favOnReply': ['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
			'warnSubjTrip': ['Оповещать при наличии трип-кода в поле "Тема"', 'Warn if "Subject" field contains trip-code'],
			'fileThumb': ['Область превью картинок вместо кнопки "Файл"', 'File thumbnail area instead of "File" button'],
			'addSageBtn': ['Кнопка Sage вместо "E-mail" ', 'Sage button instead of "E-mail" '],
			'saveSage': ['Запоминать сажу', 'Remember sage'],
			'capUpdTime': ['Интервал обновления капчи (сек)', 'Captcha update interval (sec)'],
			'captchaLang': {
				sel: [['Откл.', 'Eng', 'Rus'], ['Disable', 'Eng', 'Rus']],
				txt: ['Язык ввода капчи', 'Language input in captcha']
			},
			'addTextBtns': {
				sel: [['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'], ['Disable', 'As images', 'As text', 'Standard']],
				txt: ['Кнопки разметки текста ', 'Text format buttons ']
			},
			'txtBtnsLoc': ['Внизу', 'At bottom'],
			'userPassw': ['Постоянный пароль', 'Fixed password'],
			'userName': ['Постоянное имя', 'Fixed name'],
			'noBoardRule': ['Правила ', 'Rules '],
			'noPassword': ['Пароль ', 'Password '],
			'noName': ['Имя ', 'Name '],
			'noSubj': ['Тему', 'Subject'],

			'scriptStyle': {
				sel: [['Gradient black', 'Gradient blue', 'Solid grey', 'Transparent blue'], ['Gradient black', 'Gradient blue', 'Solid grey', 'Transparent blue']],
				txt: ['Стиль скрипта', 'Script style']
			},
			'userCSS': ['Пользовательский CSS', 'User CSS'],
			'panelCounter': ['Счетчик постов/картинок на главной панели', 'Counter of posts/images on main panel'],
			'rePageTitle': ['Название треда в заголовке вкладки*', 'Thread title in page tab*'],
			'animation': ['CSS3 анимация в скрипте', 'CSS3 animation in script'],
			'closePopups': ['Автоматически закрывать уведомления', 'Close popups automatically'],
			'inftyScroll': ['Бесконечная прокрутка', 'Infinity scroll'],
			'updScript': ['Автоматически проверять обновления скрипта', 'Check for script update automatically'],
			'scrUpdIntrv': {
				sel: [['Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'], ['Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']],
				txt: ['', '']
			},
			'excludeList': ['Не запускать скрипт на:', 'Prevent script launch on:'],
			'turnOff': ['Включать скрипт только на этом сайте', 'Enable script only on this site'],

			'language': {
				sel: [['Ru', 'En'], ['Ru', 'En']],
				txt: ['', '']
			}
		},

		txtBtn: [['Жирный', 'Bold'], ['Наклонный', 'Italic'], ['Подчеркнутый', 'Underlined'], ['Зачеркнутый', 'Strike'], ['Спойлер', 'Spoiler'], ['Код', 'Code'], ['Верхний индекс', 'Superscript'], ['Нижний индекс', 'Subscript'], ['Цитировать выделенное', 'Quote selected']],

		cfgTab: {
			'filters': ['Фильтры', 'Filters'],
			'posts': ['Посты', 'Posts'],
			'images': ['Картинки', 'Images'],
			'links': ['Ссылки', 'Links'],
			'form': ['Форма', 'Form'],
			'common': ['Общее', 'Common'],
			'info': ['Инфо', 'Info']
		},

		panelBtn: {
			'attach': ['Прикрепить/Открепить панель', 'Attach/Detach panel'],
			'cfg': ['Настройки', 'Settings'],
			'hid': ['Скрытое', 'Hidden'],
			'fav': ['Избранное', 'Favorites'],
			'vid': ['Видео-ссылки', 'Video links'],
			'refresh': ['Обновить', 'Refresh'],
			'goback': ['Назад на доску', 'Return to board'],
			'gonext': ['На страницу %s', 'Go to page %s'],
			'goup': ['В начало страницы', 'To top of page'],
			'godown': ['В конец страницы', 'To bottom of page'],
			'expimg': ['Раскрыть все картинки', 'Expand all images'],
			'preimg': ['Предзагрузка картинок ([Ctrl+Click] только для новых постов)', 'Preload images ([Ctrl+Click] for new posts only)'],
			'maskimg': ['Маскировать картинки', 'Mask images'],
			'upd-on': ['Выключить автообновление треда', 'Disable thread autoupdate'],
			'upd-off': ['Включить автообновление треда', 'Enable thread autoupdate'],
			'audio-off': ['Звуковое оповещение о новых постах', 'Sound notification about new posts'],
			'catalog': ['Перейти в каталог', 'Go to catalog'],
			'counter': ['Постов/картинок в треде', 'Posts/Images in thread'],
			'savethr': ['Сохранить на диск', 'Save to disk'],
			'enable': ['Включить/выключить скрипт', 'Turn on/off the script']
		},

		selHiderMenu: {
			'sel': ['Скрывать выделенное', 'Hide selected text'],
			'name': ['Скрывать имя', 'Hide name'],
			'trip': ['Скрывать трип-код', 'Hide with trip-code'],
			'img': ['Скрывать картинку', 'Hide with image'],
			'ihash': ['Скрывать схожие картинки', 'Hide similar images'],
			'noimg': ['Скрывать без картинок', 'Hide without images'],
			'notext': ['Скрывать без текста', 'Hide without text'],
			'text': ['Скрыть схожий текст', 'Hide similar text'],
			'refs': ['Скрыть с ответами', 'Hide with answers']
		},
		selExpandThr: [['+10 постов', 'Последние 30', 'Последние 50', 'Последние 100', 'Весь тред'], ['+10 posts', 'Last 30 posts', 'Last 50 posts', 'Last 100 posts', 'All thread']],
		selAjaxPages: [['1 страница', '2 страницы', '3 страницы', '4 страницы', '5 страниц'], ['1 page', '2 pages', '3 pages', '4 pages', '5 pages']],
		selSaveThr: [['Скачать весь тред', 'Скачать картинки'], ['Download thread', 'Download images']],
		selAudioNotif: [['Каждые 30 сек.', 'Каждую минуту', 'Каждые 2 мин.', 'Каждые 5 мин.'], ['Every 30 sec.', 'Every minute', 'Every 2 min.', 'Every 5 min.']],

		hotKeyEdit: [['%l%i24 – предыдущая страница/картинка%/l', '%l%i217 – следующая страница/картинка%/l', '%l%i21 – тред (на доске)/пост (в треде) ниже%/l', '%l%i20 – тред (на доске)/пост (в треде) выше%/l', '%l%i31 – пост (на доске) ниже%/l', '%l%i30 – пост (на доске) выше%/l', '%l%i23 – скрыть пост/тред%/l', '%l%i32 – перейти в тред%/l', '%l%i33 – развернуть тред%/l', '%l%i211 – раскрыть картинку в посте%/l', '%l%i22 – быстрый ответ%/l', '%l%i25t – отправить пост%/l', '%l%i210 – открыть/закрыть "Настройки"%/l', '%l%i26 – открыть/закрыть "Избранное"%/l', '%l%i27 – открыть/закрыть "Скрытое"%/l', '%l%i218 – открыть/закрыть "Видео"%/l', '%l%i28 – открыть/закрыть панель%/l', '%l%i29 – вкл./выкл. маскировку картинок%/l', '%l%i40 – обновить тред (в треде)%/l', '%l%i212t – жирный%/l', '%l%i213t – курсив%/l', '%l%i214t – зачеркнутый%/l', '%l%i215t – спойлер%/l', '%l%i216t – код%/l'], ['%l%i24 – previous page/image%/l', '%l%i217 – next page/image%/l', '%l%i21 – thread (on board)/post (in thread) below%/l', '%l%i20 – thread (on board)/post (in thread) above%/l', '%l%i31 – on board post below%/l', '%l%i30 – on board post above%/l', '%l%i23 – hide post/thread%/l', '%l%i32 – go to thread%/l', '%l%i33 – expand thread%/l', '%l%i211 – expand post\'s images%/l', '%l%i22 – quick reply%/l', '%l%i25t – send post%/l', '%l%i210 – open/close "Settings"%/l', '%l%i26 – open/close "Favorites"%/l', '%l%i27 – open/close "Hidden"%/l', '%l%i218 – open/close "Videos"%/l', '%l%i28 – open/close main panel%/l', '%l%i29 – turn on/off masking images%/l', '%l%i40 – update thread%/l', '%l%i212t – bold%/l', '%l%i213t – italic%/l', '%l%i214t – strike%/l', '%l%i215t – spoiler%/l', '%l%i216t – code%/l']],

		month: [['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']],
		fullMonth: [['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']],
		week: [['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']],

		editor: {
			cfg: ['Редактирование настроек:', 'Edit settings:'],
			hidden: ['Редактирование скрытых тредов:', 'Edit hidden threads:'],
			favor: ['Редактирование избранного:', 'Edit favorites:'],
			css: ['Редактирование CSS', 'Edit CSS']
		},

		newPost: [[' новый пост', ' новых поста', ' новых постов', '. Последний:'], [' new post', ' new posts', ' new posts', '. Latest: ']],

		name: ['Имя', 'Name'],
		subj: ['Тема', 'Subject'],
		mail: ['E-mail', 'E-mail'],
		cap: ['Капча', 'Captcha'],
		video: ['Видео', 'Video'],
		add: ['Добавить', 'Add'],
		apply: ['Применить', 'Apply'],
		clear: ['Очистить', 'Clear'],
		refresh: ['Обновить', 'Refresh'],
		load: ['Загрузить', 'Load'],
		save: ['Сохранить', 'Save'],
		edit: ['Правка', 'Edit'],
		file: ['Файл', 'File'],
		global: ['Глобальные', 'Global'],
		reset: ['Сброс', 'Reset'],
		remove: ['Удалить', 'Remove'],
		info: ['Инфо', 'Info'],
		undo: ['Отмена', 'Undo'],
		change: ['Сменить', 'Change'],
		reply: ['Ответ', 'Reply'],
		loading: ['Загрузка...', 'Loading...'],
		checking: ['Проверка...', 'Checking...'],
		deleting: ['Удаление...', 'Deleting...'],
		updating: ['Обновление...', 'Updating...'],
		error: ['Ошибка', 'Error'],
		noConnect: ['Ошибка подключения', 'Connection failed'],
		internalError: ['Ошибка скрипта:\n', 'Script error:\n'],
		thrNotFound: ['Тред недоступен (№', 'Thread is unavailable (№'],
		thrClosed: ['Тред закрыт', 'Thread is closed'],
		succDeleted: ['Успешно удалено!', 'Succesfully deleted!'],
		errDelete: ['Не могу удалить:\n', 'Can\'t delete:\n'],
		cTimeError: ['Неправильные настройки времени', 'Invalid time settings'],
		noGlobalCfg: ['Глобальные настройки не найдены', 'Global config not found'],
		postNotFound: ['Пост не найден', 'Post not found'],
		dontShow: ['Скрыть: ', 'Hide: '],
		checkNow: ['Проверить сейчас', 'Check now'],
		updAvail: ['Доступно обновление!', 'Update available!'],
		haveLatest: ['У вас стоит самая последняя версия!', 'You have latest version!'],
		thrViewed: ['Тредов посещено', 'Threads visited'],
		thrCreated: ['Тредов создано', 'Threads created'],
		thrHidden: ['Тредов скрыто', 'Threads hidden'],
		postsSent: ['Постов отправлено', 'Posts sent'],
		total: ['Всего', 'Total'],
		debug: ['Отладка', 'Debug'],
		infoDebug: ['Информация для отладки', 'Information for debugging'],
		impexpCfg: ['Импорт/экспорт настроек', 'Config import/export'],
		fileToCfg: ['Загрузить настройки из файла', 'Load config from a file'],
		cfgToFile: ['Сохранить файл</a> с настройками', 'Get config file</a>'],
		globalCfg: ['Глобальные настройки', 'Global config'],
		loadGlobal: [' и применить к этому домену', ' and apply to this domain'],
		saveGlobal: [' текущие настройки как глобальные', ' current config as global'],
		descrGlobal: ['Глобальные настройки будут по умолчанию применяться<br>при первом посещеннии других доменов', 'Global config will apply by default<br>at the first visit of other domains'],
		editInTxt: ['Правка в текстовом формате', 'Edit in text format'],
		resetCfg: ['Сбросить в настройки по умолчанию', 'Reset config to defaults'],
		resetData: ['Очистить данные', 'Reset selected data'],
		allDomains: ['Для всех доменов:', 'For all domains'],
		clrSelected: ['Удалить выделенные записи', 'Remove selected notes'],
		saveChanges: ['Сохранить внесенные изменения', 'Save your changes'],
		infoCount: ['Обновить счетчики постов', 'Refresh posts counters'],
		infoPage: ['Проверить актуальность тредов (до 5 страницы)', 'Check for threads actuality (up to 5 page)'],
		clrDeleted: ['Очистить недоступные (404) треды', 'Clear inaccessible (404) threads'],
		setByUser: ['Выбрано пользователем', 'Set by user'],
		oldPosts: ['Постов при последнем посещении', 'Posts at the last visit'],
		newPosts: ['Количество новых постов', 'Number of new posts'],
		thrPage: ['Тред на @странице', 'Thread on @page'],
		hiddenPosts: ['Скрытые посты', 'Hidden posts'],
		onPage: [' на странице', ' on the page'],
		hiddenThrds: ['Скрытые треды', 'Hidden threads'],
		myPosts: ['Мои посты', 'My posts'],
		noHidPosts: ['На этой странице нет скрытых постов...', 'No hidden posts on this page...'],
		noHidThrds: ['Нет скрытых тредов...', 'No hidden threads...'],
		expandAll: ['Раскрыть все', 'Expand all'],
		invalidData: ['Некорректный формат данных', 'Incorrect data format'],
		noFavThrds: ['Нет избранных тредов...', 'Favorites is empty...'],
		noVideoLinks: ['Нет ссылок на видео...', 'No video links...'],
		hideLnkList: ['Скрыть/Показать список ссылок', 'Hide/Unhide list of links'],
		prevVideo: ['Предыдущее видео', 'Previous video'],
		nextVideo: ['Следующее видео', 'Next video'],
		toPanel: ['Закрепить на панели', 'Attach to panel'],
		underPost: ['Поместить форму под пост', 'Move under post'],
		makeDrag: ['Сделать перетаскиваемым окном', 'Make draggable window'],
		closeWindow: ['Закрыть окно', 'Close window'],
		closeReply: ['Закрыть форму', 'Close form'],
		replies: ['Ответы:', 'Replies:'],
		postsOmitted: ['Пропущено ответов: ', 'Posts omitted: '],
		showPosts: ['Показать посты', 'Show posts'],
		hidePosts: ['Скрыть посты', 'Hide posts'],
		collapseThrd: ['Свернуть тред', 'Collapse thread'],
		deleted: ['удалён', 'deleted'],
		getNewPosts: ['Получить новые посты', 'Get new posts'],
		page: ['Страница', 'Page'],
		hiddenThrd: ['Скрытый тред:', 'Hidden thread:'],
		makeThrd: ['Создать тред', 'Create thread'],
		makeReply: ['Ответить', 'Make reply'],
		noSage: ['Без сажи', 'No sage'],
		hideForm: ['Скрыть форму', 'Hide form'],
		search: ['Искать в ', 'Search in '],
		wait: ['Ждите', 'Wait'],
		noFile: ['Нет файла', 'No file'],
		clickToAdd: ['Выберите, либо перетащите файл', 'Select or drag and drop file'],
		removeFile: ['Удалить файл', 'Remove file'],
		spoilFile: ['Спойлер', 'Spoiler'],
		helpAddFile: ['Встроить .ogg, .rar, .zip или .7z в картинку', 'Pack .ogg, .rar, .zip or .7z into image'],
		downloadFile: ['Скачать содержащийся в картинке файл', 'Download existing file from image'],
		fileCorrupt: ['Файл повреждён: ', 'File is corrupted: '],
		subjHasTrip: ['Поле "Тема" содержит трипкод', '"Subject" field contains a tripcode'],
		loadImage: ['Загружаются картинки: ', 'Loading images: '],
		loadFile: ['Загружаются файлы: ', 'Loading files: '],
		cantLoad: ['Не могу загрузить ', 'Can\'t load '],
		willSavePview: ['Будет сохранено превью', 'Thumbnail will be saved'],
		loadErrors: ['Во время загрузки произошли ошибки:', 'An error occurred during the loading:'],
		errCorruptData: ['Ошибка: сервер отправил повреждённые данные', 'Error: server sent corrupted data'],
		expImgInline: ['[Click] открыть в посте, [Ctrl+Click] в центре', '[Click] expand in post, [Ctrl+Click] by center'],
		expImgFull: ['[Click] открыть в центре, [Ctrl+Click] в посте', '[Click] expand by center, [Ctrl+Click] in post'],
		nextImg: ['Следующая картинка', 'Next image'],
		prevImg: ['Предыдущая картинка', 'Previous image'],
		togglePost: ['Скрыть/Раскрыть пост', 'Hide/Unhide post'],
		replyToPost: ['Ответить на пост', 'Reply to post'],
		expandThrd: ['Развернуть тред', 'Expand thread'],
		addFav: ['Добавить тред в Избранное', 'Add thread to Favorites'],
		delFav: ['Убрать тред из Избранного', 'Remove thread from Favorites'],
		attachPview: ['Закрепить превью', 'Attach preview'],
		expandVideo: ['Развернуть/Свернуть видео', 'Expand/Collapse video'],
		author: ['автор: ', 'author: '],
		views: ['просмотров: ', 'views: '],
		published: ['опубликовано: ', 'published: '],

		seSyntaxErr: ['синтаксическая ошибка в аргументе спелла: %s', 'syntax error in argument of spell: %s'],
		seUnknown: ['неизвестный спелл: %s', 'unknown spell: %s'],
		seMissOp: ['пропущен оператор', 'missing operator'],
		seMissArg: ['пропущен аргумент спелла: %s', 'missing argument of spell: %s'],
		seMissSpell: ['пропущен спелл', 'missing spell'],
		seErrRegex: ['синтаксическая ошибка в регулярном выражении: %s', 'syntax error in regular expression: %s'],
		seUnexpChar: ['неожиданный символ: %s', 'unexpected character: %s'],
		seMissClBkt: ['пропущена закрывающаяся скобка', 'missing ) in parenthetical'],
		seRepsInParens: ['спелл $s не должен располагаться в скобках', 'spell %s shouldn\'t be in parens'],
		seOpInReps: ['недопустимо использовать оператор %s со спеллами #rep и #outrep', 'don\'t use operator %s with spells #rep & #outrep'],
		seRow: [' (строка ', ' (row '],
		seCol: [', столбец ', ', column '],
		sendingPost: ['Отправка поста...', 'Sending post...'],
		sizeByte: [' Байт', ' Byte'],
		sizeKByte: [' КБ', ' KB'],
		sizeMByte: [' МБ', ' MB'],
		sizeGByte: [' ГБ', ' GB'],
		second: ['с', 's']
	},
	    doc = window.document,
	    docBody,
	    aProto = Array.prototype,
	    locStorage,
	    sesStorage,
	    Cfg,
	    hThr,
	    pByEl,
	    pByNum,
	    uVis,
	    needScroll,
	    aib,
	    nav,
	    updater,
	    dTime,
	    visPosts = 2,
	    topWinZ = 0,
	    pr,
	    dummy,
	    myPosts,
	    Images_ = { preloading: false, afterpreload: null, progressId: null, canvas: null },
	    lang,
	    quotetxt = '',
	    localRun,
	    isExpImg,
	    isPreImg,
	    excludeList,
	    $each = Function.prototype.call.bind(aProto.forEach),
	    emptyFn = Function.prototype,
	    nativeXHRworks = true,
	    gitWiki = 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/wiki/',
	    gitRaw = 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/master/';




	function $Q(path) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? docBody : arguments[1];

		return root.querySelectorAll(path);
	}

	function $q(path) {
		var root = arguments.length <= 1 || arguments[1] === undefined ? docBody : arguments[1];

		return root.querySelector(path);
	}

	function $id(id) {
		return doc.getElementById(id);
	}

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

	function $replace(origEl, newEl) {
		if (typeof newEl === 'string') {
			origEl.insertAdjacentHTML('afterend', newEl);
			origEl.parentNode.removeChild(origEl);
		} else {
			origEl.parentNode.replaceChild(newEl, origEl);
		}
	}

	function $add(html) {
		dummy.innerHTML = html;
		return dummy.firstElementChild;
	}

	function $new(tag, attr, events) {
		var el = doc.createElement(tag);
		if (attr) {
			for (var key in attr) {
				if (key === 'text') {
					el.textContent = attr[key];
				} else if (key === 'value') {
					el.value = attr[key];
				} else if (attr.hasOwnProperty(key)) {
					el.setAttribute(key, attr[key]);
				}
			}
		}
		if (events) {
			for (var key in events) {
				if (events.hasOwnProperty(key)) {
					el.addEventListener(key, events[key]);
				}
			}
		}
		return el;
	}

	function $New(tag, attr, nodes) {
		for (var i = 0, len = nodes.length, el = $new(tag, attr, null); i < len; i++) {
			if (nodes[i]) {
				el.appendChild(nodes[i]);
			}
		}
		return el;
	}

	function $txt(el) {
		return doc.createTextNode(el);
	}

	function $btn(val, ttl, Fn) {
		var className = arguments.length <= 3 || arguments[3] === undefined ? 'de-button' : arguments[3];

		return $new('input', { 'type': 'button', 'class': className, 'value': val, 'title': ttl }, { 'click': Fn });
	}

	function $script(text) {
		$del(doc.head.appendChild($new('script', { 'type': 'text/javascript', 'text': text }, null)));
	}

	function $css(text) {
		if (!nav.Firefox) {
			text = text.replace(/(transition|keyframes|transform|animation|linear-gradient)/g, nav.cssFix + '$1');
			if (!nav.Presto) {
				text = text.replace(/\(to bottom/g, '(top').replace(/\(to top/g, '(bottom');
			}
			if (nav.Safari && !('flex' in docBody.style)) {
				text = text.replace(/( flex|inline-flex|align-items)/g, ' -webkit-$1');
			}
		}
		return doc.head.appendChild($new('style', { 'type': 'text/css', 'text': text }, null));
	}

	function $if(cond, el) {
		return cond ? el : null;
	}

	function $toggle(el) {
		var needToShow = arguments.length <= 1 || arguments[1] === undefined ? el.style.display : arguments[1];

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

	function $del(el) {
		if (el) {
			el.parentNode.removeChild(el);
		}
	}

	function $DOM(html) {
		var myDoc = doc.implementation.createHTMLDocument('');
		myDoc.documentElement.innerHTML = html;
		return myDoc;
	}

	function $pd(e) {
		e.preventDefault();
	}

	function $txtInsert(el, txt) {
		var scrtop = el.scrollTop,
		    start = el.selectionStart;
		el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
		el.setSelectionRange(start + txt.length, start + txt.length);
		el.focus();
		el.scrollTop = scrtop;
	}

	function $isEmpty(obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				return false;
			}
		}
		return true;
	}

	function $join(arr, start, end) {
		return start + arr.join(end + start) + end;
	}

	var Logger = {
		finish: function finish() {
			this._finished = true;
			this._marks.push(['LoggerFinish', Date.now()]);
		},
		getData: function getData(full) {
			var duration,
			    marks = this._marks,
			    timeLog = [],
			    i = 1;
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

	function async(generatorFunc) {
		return function () {
			function continuer(verb, arg) {
				var result;
				try {
					result = generator[verb](arg);
				} catch (err) {
					console.log('Generator throw: ', err);
					return Promise.reject(err);
				}
				return result.done ? result.value : Promise.resolve(result.value).then(onFulfilled, onRejected);
			}

			for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
				args[_key] = arguments[_key];
			}

			var generator = generatorFunc.apply(this, args),
			    onFulfilled = continuer.bind(continuer, 'next'),
			    onRejected = continuer.bind(continuer, 'throw');
			return onFulfilled();
		};
	}

	function spawn(generatorFunc) {
		for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key2 = 1; _key2 < _len3; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		return Promise.resolve(async(generatorFunc).apply(undefined, args));
	}

	function sleep(ms) {
		return new Promise(function (resolve, reject) {
			return setTimeout(function () {
				return resolve();
			}, ms);
		});
	}

	function CancelError() {}

	var CancelablePromise = (function () {
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
				var wrappedResolve = function wrappedResolve(value) {
					resolve(value);_this._isResolved = true;
				};
				var wrappedReject = function wrappedReject(reason) {
					reject(reason);_this._isResolved = true;
				};
				resolver(wrappedResolve, wrappedReject);
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
					for (var _iterator = children, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;

						if (_isArray) {
							if (_i2 >= _iterator.length) break;
							_ref = _iterator[_i2++];
						} else {
							_i2 = _iterator.next();
							if (_i2.done) break;
							_ref = _i2.value;
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
	})();

	var AjaxError = (function () {
		function AjaxError(code, message) {
			_classCallCheck(this, AjaxError);

			this.code = code;
			this.message = message;
		}

		_createClass(AjaxError, [{
			key: 'toString',
			value: function toString() {
				return this.code === 0 ? this.message || Lng.noConnect[lang] : 'HTTP [' + this.code + '] ' + this.message;
			}
		}]);

		return AjaxError;
	})();

	AjaxError.Success = new AjaxError(200, '');

	function $ajax(url) {
		var params = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var useNative = arguments.length <= 2 || arguments[2] === undefined ? nativeXHRworks : arguments[2];

		var resolve, reject, cancelFn;
		if (!useNative && typeof GM_xmlhttpRequest === 'function') {
			var obj = {
				'method': params && params.method || 'GET',
				'url': nav.fixLink(url),
				'onload': function onload(e) {
					if (e.status === 200 || aib.tiny && e.status === 400) {
						resolve(e);
					} else {
						reject(new AjaxError(e.status, e.statusText));
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
			var gmxhr = GM_xmlhttpRequest(obj);
			cancelFn = function () {
				try {
					gmxhr.abort();
				} catch (e) {}
			};
		} else {
			var xhr = new XMLHttpRequest();
			if (params && params.onprogress) {
				xhr.upload.onprogress = params.onprogress;
			}
			xhr.onreadystatechange = function (_ref2) {
				var target = _ref2.target;

				if (target.readyState === 4) {
					if (target.status === 200 || aib.tiny && target.status === 400 || target.status === 0 && target.responseType === 'arraybuffer') {
						resolve(target);
					} else {
						reject(new AjaxError(target.status, target.statusText));
					}
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
				cancelFn = function () {
					return xhr.abort();
				};
			} catch (e) {
				nativeXHRworks = false;
				var newParams = null;
				if (params) {
					if (params.headers) {
						Object.assign(params.headers, headers);
					} else {
						params.headers = headers;
					}
					newParams = params;
				} else {
					newParams = { headers: headers };
				}
				return $ajax(url, newParams, false);
			}
		}
		return new CancelablePromise(function (res, rej) {
			resolve = res;
			reject = rej;
		}, cancelFn);
	}

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

	var TemporaryContent = (function () {
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
	})();

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
			var i = 0,
			    checksum = 0,
			    fileSize = input.length,
			    header = new Uint8Array(512);
			for (var nameLen = Math.min(filepath.length, 100); i < nameLen; ++i) {
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
			this._data.push(header);
			this._data.push(input);
			if ((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
				this._data.push(new Uint8Array(i));
			}
		},
		addString: function addString(filepath, str) {
			var i,
			    len,
			    data,
			    sDat = unescape(encodeURIComponent(str));
			for (i = 0, len = sDat.length, data = new Uint8Array(len); i < len; ++i) {
				data[i] = sDat.charCodeAt(i) & 0xFF;
			}
			this.addFile(filepath, data);
		},
		get: function get() {
			this._data.push(new Uint8Array(1024));
			return new Blob(this._data, { 'type': 'application/x-tar' });
		},
		_padSet: function _padSet(data, offset, num, len) {
			var i = 0,
			    nLen = num.length;
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

	function regQuote(str) {
		return (str + '').replace(/([.?*+^$[\]\\(){}|\-])/g, '\\$1');
	}

	function fixBrd(b) {
		return '/' + b + (b ? '/' : '');
	}

	function getAbsLink(url) {
		return url[1] === '/' ? aib.prot + url : url[0] === '/' ? aib.prot + '//' + aib.host + url : url;
	}

	function getErrorMessage(e) {
		if (e instanceof AjaxError) {
			return e.toString();
		}
		if (typeof e === 'string') {
			return e;
		}
		return Lng.internalError[lang] + e.stack ? nav.WebKit ? e.stack : e.name + ': ' + e.message + '\n' + (nav.Firefox ? e.stack.replace(/^([^@]*).*\/(.+)$/gm, function (str, fName, line) {
			return '    at ' + (fName ? fName + ' (' + line + ')' : line);
		}) : e.stack) : e.name + ': ' + e.message;
	}

	function toRegExp(str, noG) {
		var l = str.lastIndexOf('/'),
		    flags = str.substr(l + 1);
		return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
	}


	function getFormElements(form, submitter) {
		var controls, fixName, i, len, field, tagName, type, name, options, _i, _len, option, files, dirname, dir;

		return regeneratorRuntime.wrap(function getFormElements$(_context) {
			while (1) switch (_context.prev = _context.next) {
				case 0:
					controls = $Q('button, input, keygen, object, select, textarea', form), fixName = function fixName(name) {
						return name ? name.replace(/([^\r])\n|\r([^\n])/g, '$1\r\n$2') : '';
					};
					i = 0, len = controls.length;

				case 2:
					if (!(i < len)) {
						_context.next = 56;
						break;
					}

					field = controls[i], tagName = field.tagName.toLowerCase(), type = field.getAttribute('type'), name = field.getAttribute('name');

					if (!($parent(field, 'DATALIST', form) || isFormElDisabled(field) || (tagName === 'button' || tagName === 'input' && (type === 'submit' || type === 'reset' || type === 'button')) && field !== submitter || tagName === 'input' && (type === 'checkbox' && !field.checked || type === 'radio' && !field.checked || type === 'image' && !name) || tagName === 'object')) {
						_context.next = 6;
						break;
					}

					return _context.abrupt('continue', 53);

				case 6:
					if (!(tagName === 'select')) {
						_context.next = 19;
						break;
					}

					options = $Q('select > option, select > optgrout > option', field);
					_i = 0, _len = options.length;

				case 9:
					if (!(_i < _len)) {
						_context.next = 17;
						break;
					}

					option = options[_i];

					if (!(option.selected && !isFormElDisabled(option))) {
						_context.next = 14;
						break;
					}

					_context.next = 14;
					return {
						el: field,
						name: fixName(name),
						value: option.value,
						type: type
					};

				case 14:
					++_i;
					_context.next = 9;
					break;

				case 17:
					_context.next = 41;
					break;

				case 19:
					if (!(tagName === 'input')) {
						_context.next = 41;
						break;
					}

					_context.t0 = type;
					_context.next = _context.t0 === 'image' ? 23 : _context.t0 === 'checkbox' ? 24 : _context.t0 === 'radio' ? 24 : _context.t0 === 'file' ? 27 : 41;
					break;

				case 23:
					throw new Error('input[type="image"] is not supported');

				case 24:
					_context.next = 26;
					return {
						el: field,
						name: fixName(name),
						value: field.value || 'on',
						type: type
					};

				case 26:
					return _context.abrupt('continue', 53);

				case 27:
					if (!(field.files.length > 0)) {
						_context.next = 38;
						break;
					}

					files = field.files;
					_i = 0, _len = files.length;

				case 30:
					if (!(_i < _len)) {
						_context.next = 36;
						break;
					}

					_context.next = 33;
					return {
						el: field,
						name: name,
						value: files[_i],
						type: type
					};

				case 33:
					++_i;
					_context.next = 30;
					break;

				case 36:
					_context.next = 40;
					break;

				case 38:
					_context.next = 40;
					return {
						el: field,
						name: fixName(name),
						value: new File([''], ''),
						type: 'application/octet-stream'
					};

				case 40:
					return _context.abrupt('continue', 53);

				case 41:
					if (!(type === 'textarea')) {
						_context.next = 46;
						break;
					}

					_context.next = 44;
					return {
						el: field,
						name: name || '',
						value: field.value,
						type: type
					};

				case 44:
					_context.next = 48;
					break;

				case 46:
					_context.next = 48;
					return {
						el: field,
						name: fixName(name),
						value: field.value,
						type: type
					};

				case 48:
					dirname = field.getAttribute('dirname');

					if (!dirname) {
						_context.next = 53;
						break;
					}

					dir = nav.matchesSelector(field, ':dir(rtl)') ? 'rtl' : 'ltr';
					_context.next = 53;
					return {
						el: field,
						name: fixName(dirname),
						value: dir,
						type: 'direction'
					};

				case 53:
					++i;
					_context.next = 2;
					break;

				case 56:
				case 'end':
					return _context.stop();
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

	function downloadBlob(blob, name) {
		var url = window.URL.createObjectURL(blob);
		var link = docBody.appendChild($add('<a href="' + url + '" download="' + name + '"></a>'));
		link.click();
		setTimeout(function () {
			window.URL.revokeObjectURL(url);
			$del(link);
		}, 1e5);
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

	function fixEventEl(el) {
		if (el && nav.Presto) {
			var svg = el.correspondingUseElement;
			if (svg) {
				el = svg.ownerSVGElement;
			}
		}
		return el;
	}

	function onDOMLoaded(fn) {
		if (doc.readyState === 'interactive' || doc.readyState === 'complete') {
			fn();
		} else {
			doc.addEventListener('DOMContentLoaded', fn);
		}
	}




	function getStored(id) {
		return regeneratorRuntime.wrap(function getStored$(_context2) {
			while (1) switch (_context2.prev = _context2.next) {
				case 0:
					if (!nav.isGM) {
						_context2.next = 4;
						break;
					}

					return _context2.abrupt('return', GM_getValue(id));

				case 4:
					if (!nav.isChromeStorage) {
						_context2.next = 10;
						break;
					}

					_context2.next = 7;
					return new Promise(function (resolve, reject) {
						chrome.storage.local.get(id, function (obj) {
							if (Object.keys(obj).length) {
								resolve(obj[id]);
							} else {
								chrome.storage.sync.get(id, function (obj) {
									resolve(obj[id]);
								});
							}
						});
					});

				case 7:
					return _context2.abrupt('return', _context2.sent);

				case 10:
					if (!nav.isScriptStorage) {
						_context2.next = 12;
						break;
					}

					return _context2.abrupt('return', scriptStorage.getItem(id));

				case 12:
					return _context2.abrupt('return', locStorage[id]);

				case 13:
				case 'end':
					return _context2.stop();
			}
		}, _marked[1], this);
	}

	function setStored(id, value) {
		if (nav.isGM) {
			GM_setValue(id, value);
		} else if (nav.isChromeStorage) {
			var obj = {};
			obj[id] = value;
			if (value.toString().length < 4095) {
				chrome.storage.sync.set(obj, emptyFn);
				chrome.storage.local.remove(id, emptyFn);
			} else {
				chrome.storage.local.set(obj, emptyFn);
				chrome.storage.sync.remove(id, emptyFn);
			}
		} else if (nav.isScriptStorage) {
			scriptStorage.setItem(id, value);
		} else {
			locStorage[id] = value;
		}
	}

	function delStored(id) {
		if (nav.isGM) {
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
		return regeneratorRuntime.wrap(function getStoredObj$(_context3) {
			while (1) switch (_context3.prev = _context3.next) {
				case 0:
					_context3.t1 = JSON;
					return _context3.delegateYield(getStored(id), 't3', 2);

				case 2:
					_context3.t2 = _context3.t3;

					if (_context3.t2) {
						_context3.next = 5;
						break;
					}

					_context3.t2 = '{}';

				case 5:
					_context3.t4 = _context3.t2;
					_context3.t0 = _context3.t1.parse.call(_context3.t1, _context3.t4);

					if (_context3.t0) {
						_context3.next = 9;
						break;
					}

					_context3.t0 = {};

				case 9:
					return _context3.abrupt('return', _context3.t0);

				case 10:
				case 'end':
					return _context3.stop();
			}
		}, _marked[2], this);
	}

	function getLocStoredObj(id) {
		var data, oldId;
		return regeneratorRuntime.wrap(function getLocStoredObj$(_context4) {
			while (1) switch (_context4.prev = _context4.next) {
				case 0:
					data = locStorage[id];

					if (data) {
						_context4.next = 6;
						break;
					}

					oldId = (id === 'de-posts' ? 'DESU_Posts_' : id === 'de-threads' ? 'DESU_Threads_' : 'DESU_MyPosts_') + aib.dm;
					return _context4.delegateYield(getStored(oldId), 't0', 4);

				case 4:
					data = _context4.t0;

					if (data) {
						locStorage[id] = data;
						delStored(oldId);
					}

				case 6:
					_context4.prev = 6;
					return _context4.abrupt('return', JSON.parse(data || '{}') || {});

				case 10:
					_context4.prev = 10;
					_context4.t1 = _context4['catch'](6);
					return _context4.abrupt('return', {});

				case 13:
				case 'end':
					return _context4.stop();
			}
		}, _marked[3], this, [[6, 10]]);
	}

	function saveComCfg(dm, obj) {
		spawn(getStoredObj, 'DESU_Config').then(function (val) {
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
			saveComCfg(aib.dm, Cfg);
		}
	}

	function readCfg() {
		var obj, val;
		return regeneratorRuntime.wrap(function readCfg$(_context5) {
			while (1) switch (_context5.prev = _context5.next) {
				case 0:
					return _context5.delegateYield(getStoredObj('DESU_Config'), 't0', 1);

				case 1:
					val = _context5.t0;

					if (!(aib.dm in val) || $isEmpty(obj = val[aib.dm])) {
						obj = nav.isGlobal ? val.global || {} : {};
						obj.captchaLang = aib.ru ? 2 : 1;
						obj.correctTime = 0;
					}
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
						Cfg.fileThumb = 0;
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
						Cfg.stats = { 'view': 0, 'op': 0, 'reply': 0 };
					}
					setStored('DESU_Config', JSON.stringify(val));
					lang = Cfg.language;
					if (Cfg.updScript) {
						checkForUpdates(false, val.lastUpd).then(function (html) {
							return onDOMLoaded(function () {
								return $popup(html, 'updavail');
							});
						}, emptyFn);
					}

				case 17:
				case 'end':
					return _context5.stop();
			}
		}, _marked[4], this);
	}

	function toggleCfg(id) {
		saveCfg(id, +!Cfg[id]);
	}

	function readFav() {
		return spawn(getStoredObj, 'DESU_Favorites');
	}

	function initPostUserVisib(post, num, hide, date) {
		if (hide) {
			post.setUserVisib(true, date, false);
		} else {
			uVis[num][1] = date;
			post.hideBtn.setAttribute('class', 'de-btn-hide-user');
			post.userToggled = true;
		}
	}

	function readPostsData(firstPost) {
		var sVis, json, str, b, date, spellsHide, updatePosts, globalUserVis, updateFav, fav, favBrd, maybeSpells, post, num, f, thr, lastPost, hidePost, hideThread, hideData;
		return regeneratorRuntime.wrap(function readPostsData$(_context6) {
			while (1) switch (_context6.prev = _context6.next) {
				case 0:
					sVis = null;

					try {
						str = aib.t ? sesStorage['de-hidden-' + aib.b + aib.t] : null;

						if (str) {
							json = JSON.parse(str);
							if (json['hash'] === (Cfg.hideBySpell ? Spells.hash : 0) && pByNum.has(json['lastNum']) && pByNum.get(json['lastNum']).count === json['lastCount']) {
								sVis = json['data'] && json['data'][0] instanceof Array ? json['data'] : null;
							}
						}
					} catch (e) {
						sesStorage['de-hidden-' + aib.b + aib.t] = null;
					}
					b = aib.b;
					date = Date.now();
					spellsHide = Cfg.hideBySpell;
					updatePosts = false;
					return _context6.delegateYield(getLocStoredObj('de-posts'), 't0', 7);

				case 7:
					globalUserVis = _context6.t0;
					return _context6.delegateYield(getLocStoredObj('de-threads'), 't1', 9);

				case 9:
					hThr = _context6.t1;

					uVis = globalUserVis[b] || {};
					if (!(b in hThr)) {
						hThr[b] = {};
					}

					if (firstPost) {
						_context6.next = 14;
						break;
					}

					return _context6.abrupt('return');

				case 14:
					updateFav = false;
					return _context6.delegateYield(getStoredObj('DESU_Favorites'), 't2', 16);

				case 16:
					fav = _context6.t2;
					favBrd = aib.host in fav && b in fav[aib.host] ? fav[aib.host][b] : {};
					maybeSpells = new Maybe(SpellsRunner);
					post = firstPost;

				case 20:
					if (!post) {
						_context6.next = 41;
						break;
					}

					num = post.num;

					if (post.isOp && num in favBrd) {
						f = favBrd[num], thr = post.thr;

						post.setFavBtn(true);
						if (aib.t) {
							f.cnt = thr.pcount;
							f['new'] = 0;
							if (Cfg.markNewPosts && f.last) {
								lastPost = pByNum.get(+f.last.match(/\d+/));

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

					if (!(num in uVis)) {
						_context6.next = 28;
						break;
					}

					hidePost = uVis[num][0] === 0;

					if (post.isOp) {
						hideThread = !!(num in hThr[b]);

						if (hidePost !== hideThread) {
							updatePosts = true;
							hidePost = hideThread;
						}
					}
					initPostUserVisib(post, num, hidePost, date);
					return _context6.abrupt('continue', 38);

				case 28:
					if (!post.isOp) {
						_context6.next = 32;
						break;
					}

					if (num in hThr[b]) {
						hideData = [true, null];
					} else if (spellsHide) {
						hideData = sVis && sVis[post.count];
					}
					_context6.next = 37;
					break;

				case 32:
					if (!spellsHide) {
						_context6.next = 36;
						break;
					}

					hideData = sVis && sVis[post.count];
					_context6.next = 37;
					break;

				case 36:
					return _context6.abrupt('continue', 38);

				case 37:
					if (!hideData) {
						maybeSpells.value.run(post);
					} else if (hideData[0]) {
						if (post.hidden) {
							post.spellHidden = true;
						} else {
							post.spellHide(hideData[1]);
						}
					}

				case 38:
					post = post.next;
					_context6.next = 20;
					break;

				case 41:
					if (updatePosts) {
						globalUserVis[b] = uVis;
						locStorage['de-posts'] = JSON.stringify(globalUserVis);
					}
					maybeSpells.end();
					if (updateFav) {
						setStored('DESU_Favorites', JSON.stringify(fav));
					}
					if (sesStorage['de-win-fav'] === '1') {
						toggleWindow('fav', false, null, true);
						sesStorage.removeItem('de-win-fav');
					}

				case 45:
				case 'end':
					return _context6.stop();
			}
		}, _marked[5], this);
	}

	function readMyPosts() {
		var data;
		return regeneratorRuntime.wrap(function readMyPosts$(_context7) {
			while (1) switch (_context7.prev = _context7.next) {
				case 0:
					return _context7.delegateYield(getLocStoredObj('de-myposts'), 't0', 1);

				case 1:
					data = _context7.t0;

					if (!(aib.b in data)) {
						_context7.next = 10;
						break;
					}

					_context7.prev = 3;

					myPosts = new Set(data[aib.b]);
					return _context7.abrupt('return');

				case 8:
					_context7.prev = 8;
					_context7.t1 = _context7['catch'](3);

				case 10:
					myPosts = new Set();

				case 11:
				case 'end':
					return _context7.stop();
			}
		}, _marked[6], this, [[3, 8]]);
	}

	function addMyPost(num) {
		var data, arr;
		return regeneratorRuntime.wrap(function addMyPost$(_context8) {
			while (1) switch (_context8.prev = _context8.next) {
				case 0:
					locStorage['__de-mypost'] = JSON.stringify([aib.b, num]);
					locStorage.removeItem('__de-mypost');
					myPosts.add(num);
					return _context8.delegateYield(getLocStoredObj('de-myposts'), 't0', 4);

				case 4:
					data = _context8.t0;
					arr = data[aib.b];

					if (arr) {
						arr.push(num);
						if (arr.length > 1e4) {
							arr = arr.slice(5e3);
						}
					} else {
						arr = [num];
					}
					data[aib.b] = arr;
					locStorage['de-myposts'] = JSON.stringify(data);

				case 9:
				case 'end':
					return _context8.stop();
			}
		}, _marked[7], this);
	}

	function saveUserPosts() {
		var obj,
		    data = locStorage['de-posts'];
		try {
			obj = JSON.parse(data || '{}') || {};
		} catch (e) {
			obj = {};
		}
		if (data && data.length > 1e6) {
			var minDate = Date.now() - 5 * 24 * 3600 * 1000;
			for (var b in obj) {
				if (obj.hasOwnProperty(b)) {
					var vis = obj[b];
					for (var key in vis) {
						if (vis.hasOwnProperty(key) && vis[key][1] < minDate) {
							delete vis[key];
						}
					}
				}
			}
		}
		obj[aib.b] = uVis;
		locStorage['de-posts'] = JSON.stringify(obj);
		toggleWindow('hid', true);
	}

	function saveHiddenThreads(updWindow) {
		locStorage['de-threads'] = JSON.stringify(hThr);
		if (updWindow) {
			toggleWindow('hid', true);
		}
	}

	function saveFavorites(fav) {
		setStored('DESU_Favorites', JSON.stringify(fav));
		toggleWindow('fav', true, fav);
	}

	function removeFavoriteEntry(fav, h, b, num, clearPage) {
		function _isEmpty(f) {
			for (var i in f) {
				if (i !== 'url' && f.hasOwnProperty(i)) {
					return false;
				}
			}
			return true;
		}
		if (h in fav && b in fav[h] && num in fav[h][b]) {
			delete fav[h][b][num];
			if (_isEmpty(fav[h][b])) {
				delete fav[h][b];
				if ($isEmpty(fav[h])) {
					delete fav[h];
				}
			}
		}
		if (clearPage && h === aib.host && b === aib.b && pByNum.has(num)) {
			pByNum.get(num).thr.op.setFavBtn(false);
		}
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
					post.viewed = true;
				}
			});
		}
	}




	var panel = Object.create({
		_el: null,
		_hideTO: 0,
		_menu: null,
		_menuTO: 0,
		get _infoEl() {
			var value = $id('de-panel-info');
			Object.defineProperty(this, '_infoEl', { value: value, configurable: true });
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
					href = aib.getCatalogUrl();
			}
			var panelTitle = title || Lng.panelBtn[id][lang];
		
			return '\n\t\t<a id="de-panel-' + id + '" class="de-abtn de-panel-button" title="' + panelTitle + '" href="' + (href || '#') + '">\n\t\t\t<svg class="de-panel-svg">\n\t\t\t' + (id !== 'audio-off' ? '\n\t\t\t\t<use xlink:href="#de-symbol-panel-' + (useId || id) + '"/>' : '\n\t\t\t\t<use class="de-use-audio-off" xlink:href="#de-symbol-panel-audio-off"/>\n\t\t\t\t<use class="de-use-audio-on" xlink:href="#de-symbol-panel-audio-on"/>') + '\n\t\t\t</svg>\n\t\t</a>';
		},
		_prepareToHide: function _prepareToHide(rt) {
			var _this4 = this;

			if (!Cfg.expandPanel && !$q('.de-win-active') && (!rt || !this._el.contains(rt.farthestViewportElement || rt))) {
				this._hideTO = setTimeout(function () {
					return $hide(_this4._buttons);
				}, 500);
			}
		},
		handleEvent: function handleEvent(e) {
			var _this5 = this;

			if (!e.isTrusted) {
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
								for (var _iterator2 = DelForm, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
									var _ref3;

									if (_isArray2) {
										if (_i3 >= _iterator2.length) break;
										_ref3 = _iterator2[_i3++];
									} else {
										_i3 = _iterator2.next();
										if (_i3.done) break;
										_ref3 = _i3.value;
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
								_this5._menu = addMenu(el);
								_this5._menu.onover = function () {
									return clearTimeout(_this5._hideTO);
								};
								_this5._menu.onout = function () {
									return _this5._prepareToHide(null);
								};
								_this5._menu.onremove = function () {
									return _this5._menu = null;
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
			(pr && pr.pArea[0] || formEl).insertAdjacentHTML('beforebegin', '\n\t\t<div id="de-main" lang="' + getThemeLang() + '">\n\t\t\t<div id="de-panel">\n\t\t\t\t<div id="de-panel-logo" title="' + Lng.panelBtn.attach[lang] + '">\n\t\t\t\t\t<svg class="de-panel-logo-svg">\n\t\t\t\t\t\t<use xlink:href="#de-symbol-panel-logo"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</div>\n\t\t\t\t<span id="de-panel-buttons"' + (Cfg.expandPanel ? '' : ' style="display: none;"') + '>\n\t\t\t\t' + (Cfg.disabled ? this._getButton('enable') : this._getButton('cfg') + this._getButton('hid') + this._getButton('fav') + (!Cfg.addYouTube ? '' : this._getButton('vid')) + (localRun ? '' : this._getButton('refresh') + (!isThr && aib.page === aib.firstPage ? '' : this._getButton('goback')) + (isThr || aib.page === aib.lastPage ? '' : this._getButton('gonext'))) + this._getButton('goup') + this._getButton('godown') + (imgLen === 0 ? '' : this._getButton('expimg') + this._getButton('maskimg')) + (nav.Presto || localRun ? '' : (imgLen === 0 || Cfg.preLoadImgs ? '' : this._getButton('preimg')) + (!isThr ? '' : this._getButton('savethr'))) + (!isThr || localRun ? '' : this._getButton(Cfg.ajaxUpdThr ? 'upd-on' : 'upd-off') + (nav.Safari ? '' : this._getButton('audio-off'))) + (!aib.hasCatalog ? '' : this._getButton('catalog')) + this._getButton('enable') + (!isThr ? '' : '\n\t\t\t\t\t\t<span id="de-panel-info" title="' + Lng.panelBtn.counter[lang] + '">\n\t\t\t\t\t\t\t' + Thread.first.pcount + '/' + imgLen + '\n\t\t\t\t\t\t</span>')) + '\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t' + (Cfg.disabled ? '' : '<div id="de-wrapper-popup"></div><hr style="clear: both;">') + '\n\t\t</div>');
			this._el = $id('de-panel');
			this._el.addEventListener('click', this, true);
			this._el.addEventListener('mouseover', this);
			this._el.addEventListener('mouseout', this);
			this._buttons = $id('de-panel-buttons');
		},
		remove: function remove() {
			this._el.removeEventListener('click', this, true);
			this._el.removeEventListener('mouseover', this);
			this._el.removeEventListener('mouseout', this);
			delete this._infoEl;
			$del($id('de-main'));
		},
		updateCounter: function updateCounter(postCount, imgsCount) {
			this._infoEl.textContent = postCount + '/' + imgsCount;
		}
	});

	function updateWinZ(style) {
		if (style.zIndex < topWinZ) {
			style.zIndex = ++topWinZ;
		}
	}

	function makeDraggable(win, head, name) {
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
			    maxX = nav.Chrome ? doc.documentElement.clientWidth : Post.sizing.wWidth,
			    maxY = nav.Chrome ? doc.documentElement.clientHeight : Post.sizing.wHeight,
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
						this.tStyle.width = Math.max(parseInt(this.tStyle.width, 10) + (this.dir === 'left' ? cr.left - (val < 20 ? 0 : val) : (val > maxX - 20 ? maxX : val) - cr.right), this.name === 'reply' ? 275 : 380) + 'px';
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
		var el,
		    main = $id('de-main'),
		    win = $id('de-win-' + name),
		    isActive = win && win.classList.contains('de-win-active');
		if (isUpd && !isActive) {
			return;
		}
		if (!win) {
			var winAttr = (Cfg[name + 'WinDrag'] ? 'de-win" style="' + Cfg[name + 'WinX'] + '; ' + Cfg[name + 'WinY'] : 'de-win-fixed" style="right: 0; bottom: 25px') + (name !== 'fav' ? '' : '; width: ' + Cfg.favWinWidth + 'px; ');
			var backColor = getComputedStyle(docBody).getPropertyValue('background-color');
			var bodyAttr = name === 'cfg' ? ' ' + aib.cReply : '" style="background-color: ' + (backColor !== 'transparent' ? backColor : '#EEE');
			main.insertAdjacentHTML('afterbegin', '\n\t\t<div id="de-win-' + name + '" class="' + winAttr + '; display: none;">\n\t\t\t<div class="de-win-head">\n\t\t\t\t<span class="de-win-title">\n\t\t\t\t\t' + (name === 'cfg' ? 'Dollchan Extension Tools' : Lng.panelBtn[name][lang]) + '\n\t\t\t\t</span>\n\t\t\t\t<span class="de-win-buttons">\n\t\t\t\t\t<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>\n\t\t\t\t\t<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class="de-win-body' + bodyAttr + '"></div>\n\t\t\t' + (name !== 'fav' ? '' : '\n\t\t\t\t<div class="de-resizer de-resizer-left"></div>\n\t\t\t\t<div class="de-resizer de-resizer-right"></div>') + '\n\t\t</div>');
			win = main.firstElementChild;
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
			el.lastElementChild.onclick = toggleWindow.bind(null, name, false);
			el.firstElementChild.onclick = function (e) {
				var width = win.style.width,
				    w = width ? '; width: ' + width : '';
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
			makeDraggable(win, $q('.de-win-head', win), name);
		}
		updateWinZ(win.style);
		var remove = !isUpd && isActive;
		if (!remove && !win.classList.contains('de-win') && (el = $q('.de-win-active.de-win-fixed:not(#de-win-' + name + ')', win.parentNode))) {
			toggleWindow(el.id.substr(7), false);
		}
		var isAnim = !noAnim && !isUpd && Cfg.animation,
		    body = $q('.de-win-body', win);
		if (isAnim && body.hasChildNodes()) {
			nav.animEvent(win, function (node) {
				showWindow(node, body, name, false, remove, data, Cfg.animation);
				body = name = remove = data = null;
			});
			win.classList.remove('de-win-open');
			win.classList.add('de-win-close');
		} else {
			showWindow(win, body, name, isUpd, remove, data, isAnim);
		}
	}

	function showWindow(win, body, name, isUpd, remove, data, isAnim) {
		var temp, cfgTabId;
		if (name === 'cfg' && !remove && (temp = $q('.de-cfg-tab[selected]', body))) {
			cfgTabId = temp.getAttribute('info');
		}
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
				readFav().then(function (fav) {
					showFavoritesWindow(body, fav);
					$show(win);
					if (isAnim) {
						win.classList.add('de-win-open');
					}
				});
				return;
			case 'cfg':
				addSettings(body, cfgTabId);break;
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
			doc.head.appendChild($new('script', {
				'id': 'de-ytube-api',
				'type': 'text/javascript',
				'src': aib.prot + '//www.youtube.com/player_api'
			}, null));
		}
		body.innerHTML = '\n\t<div de-disableautoplay class="de-video-obj"></div>\n\t<div id="de-video-buttons">\n\t\t<a class="de-abtn" id="de-video-btn-prev" href="#" title="' + Lng.prevVideo[lang] + '">&#x25C0;</a>\n\t\t<a class="de-abtn" id="de-video-btn-resize" href="#" title="' + Lng.expandVideo[lang] + '"></a>\n\t\t<a class="de-abtn" id="de-video-btn-next" href="#" title="' + Lng.nextVideo[lang] + '">&#x25B6;</a>\n\t\t<a class="de-abtn" id="de-video-btn-hide" href="#" title="' + Lng.hideLnkList[lang] + '">&#x25B2;</a>\n\t</div>';
		var linkList = $new('div', { 'id': 'de-video-list', 'style': 'max-width: ' + (+Cfg.YTubeWidth + 40) + 'px; ' + 'max-height: ' + (doc.documentElement.clientHeight * .92 - +Cfg.YTubeHeigh - 82) + 'px;' });
		body.appendChild($new('script', { 'type': 'text/javascript', 'text': '(function() {\n\t\tif(\'YT\' in window && \'Player\' in window.YT) {\n\t\t\tonYouTubePlayerAPIReady();\n\t\t} else {\n\t\t\twindow.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;\n\t\t}\n\t\tfunction onYouTubePlayerAPIReady() {\n\t\t\twindow.de_addVideoEvents =\n\t\t\t\taddEvents.bind(document.querySelector(\'#de-win-vid > .de-win-body > .de-video-obj\'));\n\t\t\twindow.de_addVideoEvents();\n\t\t}\n\t\tfunction addEvents() {\n\t\t\tvar autoplay = true;\n\t\t\tif(this.hasAttribute(\'de-disableautoplay\')) {\n\t\t\t\tautoplay = false;\n\t\t\t\tthis.removeAttribute(\'de-disableautoplay\');\n\t\t\t}\n\t\t\tnew YT.Player(this.firstChild, { events: {\n\t\t\t\t\'onError\': gotoNextVideo,\n\t\t\t\t\'onReady\': autoplay ? function(e) {\n\t\t\t\t\te.target.playVideo();\n\t\t\t\t} : Function.prototype,\n\t\t\t\t\'onStateChange\': function(e) {\n\t\t\t\t\tif(e.data === 0) {\n\t\t\t\t\t\tgotoNextVideo();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}});\n\t\t}\n\t\tfunction gotoNextVideo() {\n\t\t\tdocument.getElementById("de-video-btn-next").click();\n\t\t}\n\t})();' }));
		body.addEventListener('click', {
			linkList: linkList,
			listHidden: false,
			player: body.firstElementChild,
			playerInfo: null,
			currentLink: null,
			handleEvent: function handleEvent(e) {
				var el = e.target;
				if (el.classList.contains('de-abtn')) {
					var node;
					switch (e.target.id) {
						case 'de-video-btn-hide':
							if (this.listHidden = !this.listHidden) {
								$hide(this.linkList);
								e.target.textContent = '▼';
							} else {
								$show(this.linkList);
								e.target.textContent = '▲';
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
							this.linkList.style.maxHeight = doc.documentElement.clientHeight * .92 - (exp ? 562 : +Cfg.YTubeHeigh + 82) + 'px';
					}
					$pd(e);
					return;
				} else if (!el.classList.contains('de-video-link')) {
					pByNum.get(+e.target.getAttribute('de-num')).selectCurrent();
					return;
				}
				var m = el.videoInfo;
				if (this.playerInfo !== m) {
					if (this.currentLink) {
						this.currentLink.classList.remove('de-current');
					}
					this.currentLink = el;
					el.classList.add('de-current');
					this.playerInfo = m;
					Videos.addPlayer(this.player, m, el.classList.contains('de-ytube'), true);
				}
				$pd(e);
			}
		}, true);
		for (var i = 0, len = els.length; i < len; ++i) {
			var el = els[i].cloneNode(true),
			    num = aib.getPostOfEl(els[i]).num;
			el.videoInfo = els[i].videoInfo;
			linkList.insertAdjacentHTML('beforeend', '\n\t\t<div class="de-entry ' + aib.cReply + '">\n\t\t\t<a class="de-video-refpost" href="' + (aib.anchor + num) + '" de-num="' + num + '">&gt;</a>\n\t\t</div>');
			linkList.lastChild.appendChild(el).classList.remove('de-current');
			el.setAttribute('onclick', 'window.de_addVideoEvents && window.de_addVideoEvents();');
		}
		body.appendChild(linkList);
		$q('.de-video-link', linkList).click();
	}

	function addContentBlock(parent, title) {
		return parent.appendChild($New('div', { 'class': 'de-content-block' }, [$new('input', { 'type': 'checkbox' }, {
			'click': function click() {
				var _this6 = this;

				$each($Q('.de-entry > input', this.parentNode), function (el) {
					return el.checked = _this6.checked;
				});
			}
		}), title]));
	}

	function showHiddenWindow(body) {
		var block;
		for (var post = Thread.first.op; post; post = post.next) {
			if (!post.hidden || post.isOp) {
				continue;
			}
			var cloneEl = post.el.cloneNode(true);
			var hideData = {
				btn: $q('.de-btn-unhide, .de-btn-unhide-user', cloneEl),
				headerEl: $q(aib.qPostHeader, cloneEl),
				hidden: true,
				origin: post,
				handleEvent: function handleEvent() {
					Post.hideContent(this.headerEl, this.btn, true, this.hidden = !this.hidden);
				}
			};
			cloneEl.hideData = hideData;
			cloneEl.removeAttribute('id');
			cloneEl.className = aib.cReply + ' de-cloned-post';
			$show(cloneEl);
			hideData.btn.parentNode.className = 'de-post-btns';
			hideData.btn.addEventListener('click', hideData);
			if (!block) {
				block = body.appendChild($add('<div class="de-content-block"><b>' + Lng.hiddenPosts[lang] + Lng.onPage[lang] + ':</b></div>'));
			}
			block.appendChild($New('div', { 'class': 'de-entry' }, [cloneEl]));
		}
		if (block) {
			body.appendChild($btn(Lng.expandAll[lang], '', function () {
				var isHide = this.value === Lng.undo[lang];
				$each($Q('.de-cloned-post', this.parentNode), function (el) {
					var hData = el.hideData;
					Post.hideContent(hData.headerEl, hData.btn, true, hData.hidden = isHide);
				});
				this.value = isHide ? Lng.expandAll[lang] : Lng.undo[lang];
			}));
			body.appendChild($btn(Lng.save[lang], '', function () {
				$each($Q('.de-cloned-post', this.parentNode), (function (date, el) {
					var hData = el.hideData;
					if (!hData.hidden) {
						hData.origin.setUserVisib(false, date, true);
					}
				}).bind(null, Date.now()));
				saveUserPosts();
			}));
		} else {
			body.insertAdjacentHTML('beforeend', '<b>' + Lng.noHidPosts[lang] + '</b>');
		}
		body.insertAdjacentHTML('beforeend', '<hr><b>' + ($isEmpty(hThr) ? Lng.noHidThrds[lang] : Lng.hiddenThrds[lang] + ':') + '</b>');
		for (var b in hThr) {
			if (!$isEmpty(hThr[b])) {
				block = addContentBlock(body, $new('b', { 'text': '/' + b }, null));
				for (var tNum in hThr[b]) {
					block.insertAdjacentHTML('beforeend', '\n\t\t\t\t<div class="de-entry ' + aib.cReply + '" info="' + (b + ';' + tNum) + '">\n\t\t\t\t\t<input type="checkbox"/>\n\t\t\t\t\t<a href="' + aib.getThrdUrl(b, tNum) + '" target="_blank">' + tNum + '</a>\n\t\t\t\t\t<div class="de-entry-title">- ' + hThr[b][tNum] + '</div>\n\t\t\t\t</div>');
				}
			}
		}
		body.insertAdjacentHTML('beforeend', '<hr>');
		body.appendChild(addEditButton('hidden', function (fn) {
			fn(hThr, true, function (data) {
				hThr = data;
				if (!(aib.b in hThr)) {
					hThr[aib.b] = {};
				}
				Thread.first.updateHidden(hThr[aib.b]);
				saveHiddenThreads(true);
			});
		}));
		body.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], async(regeneratorRuntime.mark(function _callee() {
			var i, els, len, _els$i$getAttribute$s, _els$i$getAttribute$s2, board, tNum;

			return regeneratorRuntime.wrap(function _callee$(_context9) {
				while (1) {
					switch (_context9.prev = _context9.next) {
						case 0:
							i = 0, els = $Q('.de-entry[info]', this.parentNode), len = els.length;

						case 1:
							if (!(i < len)) {
								_context9.next = 17;
								break;
							}

							_els$i$getAttribute$s = els[i].getAttribute('info').split(';');
							_els$i$getAttribute$s2 = _slicedToArray(_els$i$getAttribute$s, 2);
							board = _els$i$getAttribute$s2[0];
							tNum = _els$i$getAttribute$s2[1];
							_context9.prev = 6;
							_context9.next = 9;
							return $ajax(aib.getThrdUrl(board, tNum));

						case 9:
							_context9.next = 14;
							break;

						case 11:
							_context9.prev = 11;
							_context9.t0 = _context9['catch'](6);

							if (_context9.t0.code === 404) {
								delete hThr[board][tNum];
								saveHiddenThreads(true);
							}

						case 14:
							++i;
							_context9.next = 1;
							break;

						case 17:
						case 'end':
							return _context9.stop();
					}
				}
			}, _callee, this, [[6, 11]]);
		}))));
		body.appendChild($btn(Lng.remove[lang], Lng.clrSelected[lang], function () {
			$each($Q('.de-entry[info]', this.parentNode), (function (date, el) {
				if ($q('input', el).checked) {
					var arr = el.getAttribute('info').split(';');
					var num = +arr[1];
					if (pByNum.has(num)) {
						pByNum.get(num).setUserVisib(false, date, true);
					} else {
						locStorage['__de-post'] = JSON.stringify({
							'brd': arr[0],
							'date': date,
							'isOp': true,
							'num': num,
							'hide': false
						});
						locStorage.removeItem('__de-post');
					}
					delete hThr[arr[0]][num];
				}
			}).bind(null, Date.now()));
			saveHiddenThreads(true);
		}));
	}

	function cleanFavorites() {
		var els = $Q('.de-entry[de-removed]'),
		    len = els.length;
		if (len > 0) {
			readFav().then(function (fav) {
				for (var i = 0; i < len; ++i) {
					var el = els[i];
					removeFavoriteEntry(fav, el.getAttribute('de-host'), el.getAttribute('de-board'), +el.getAttribute('de-num'), true);
				}
				saveFavorites(fav);
			});
		}
	}

	function showFavoritesWindow(body, data) {
		for (var h in data) {
			for (var b in data[h]) {
				var d = data[h][b],
				    block = addContentBlock(body, d.url ? $new('a', { 'href': d.url, 'text': h + '/' + b, 'rel': 'noreferrer' }, null) : $new('b', { 'text': h + '/' + b }, null));
				if (h === aib.host && b === aib.b) {
					block.classList.add('de-fav-current');
				}
				for (var tNum in d) {
					if (tNum === 'url') {
						continue;
					}
					var t = d[tNum];
					if (!t.url.startsWith('http')) {
						t.url = (h === aib.host ? aib.prot + '//' : 'http://') + h + t.url;
					}
					block.insertAdjacentHTML('beforeend', '\n\t\t\t\t<div class="de-entry ' + aib.cReply + '" de-host="' + h + '" de-board="' + b + '" de-num="' + tNum + '" de-url="' + t.url + '">\n\t\t\t\t\t' + (t['type'] !== 'user' ? '' : '\n\t\t\t\t\t\t<span class="de-fav-user" title="' + Lng.setByUser[lang] + '"></span>') + '\n\t\t\t\t\t<input type="checkbox"/>\n\t\t\t\t\t<a href="' + (t.url + (!t.last ? '' : t.last.startsWith('#') ? t.last : h === aib.host ? aib.anchor + t.last : '')) + '" rel="noreferrer">\n\t\t\t\t\t\t' + tNum + '\n\t\t\t\t\t</a>\n\t\t\t\t\t<div class="de-entry-title">- ' + t.txt + '</div>\n\t\t\t\t\t<div class="de-fav-inf">\n\t\t\t\t\t\t<span class="de-fav-inf-iwrap" ' + (!t['err'] ? '' : t['err'] === 'Closed' ? 'title="' + Lng.thrClosed[lang] + '"' : 'title="' + t['err'] + '"') + '>\n\t\t\t\t\t\t\t<svg class="de-fav-inf-icon ' + (!t['err'] ? '' : t['err'] === 'Closed' ? 'de-fav-closed' : 'de-fav-unavail') + '">\n\t\t\t\t\t\t\t\t<use class="de-fav-closed-use" xlink:href="#de-symbol-closed"/>\n\t\t\t\t\t\t\t\t<use class="de-fav-unavail-use" xlink:href="#de-symbol-unavail"/>\n\t\t\t\t\t\t\t\t<use class="de-fav-wait-use" xlink:href="#de-symbol-wait"/>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class="de-fav-inf-new" title="' + Lng.newPosts[lang] + '"' + (t['new'] ? '' : ' style="display: none;"') + '>\n\t\t\t\t\t\t\t' + (t['new'] || 0) + '\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t[<span class="de-fav-inf-old" title="' + Lng.oldPosts[lang] + '">' + t.cnt + '</span>]\n\t\t\t\t\t\t<span class="de-fav-inf-page" title="' + Lng.thrPage[lang] + '"></span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>');
					$q('a', block.lastChild).onclick = function () {
						sesStorage['de-win-fav'] = '1';
						var el = this.parentNode;
						sesStorage.removeItem('de-scroll-' + el.getAttribute('de-board') + el.getAttribute('de-num'));
					};
				}
			}
		}
		if (!body.hasChildNodes()) {
			body.insertAdjacentHTML('afterbegin', '<center><b>' + Lng.noFavThrds[lang] + '</b></center>');
		}
		body.insertAdjacentHTML('beforeend', '<hr>');
		body.appendChild(addEditButton('favor', function (fn) {
			readFav().then(function (val) {
				return fn(val, true, saveFavorites);
			});
		}));
		body.appendChild($btn(Lng.refresh[lang], Lng.infoCount[lang], async(regeneratorRuntime.mark(function _callee2() {
			var isUpdate, els, fav, i, len, form, el, host, b, num, f, iconEl, titleEl, cnt;
			return regeneratorRuntime.wrap(function _callee2$(_context10) {
				while (1) {
					switch (_context10.prev = _context10.next) {
						case 0:
							isUpdate = false;
							els = $Q('.de-entry');
							return _context10.delegateYield(getStoredObj('DESU_Favorites'), 't0', 3);

						case 3:
							fav = _context10.t0;
							i = 0, len = els.length;

						case 5:
							if (!(i < len)) {
								_context10.next = 38;
								break;
							}

							el = els[i], host = el.getAttribute('de-host'), b = el.getAttribute('de-board'), num = el.getAttribute('de-num'), f = fav[host][b][num];

							if (!(host !== aib.host || f['err'] === 'Closed')) {
								_context10.next = 9;
								break;
							}

							return _context10.abrupt('continue', 35);

						case 9:
							iconEl = $q('.de-fav-inf-icon', el), titleEl = iconEl.parentNode;

							el = $q('.de-fav-inf-new', el);
							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
							titleEl.title = Lng.updating[lang];
							_context10.prev = 13;
							_context10.next = 16;
							return ajaxLoad(aib.getThrdUrl(b, num), true, true);

						case 16:
							form = _context10.sent;

							if (form) {
								_context10.next = 21;
								break;
							}

							iconEl.setAttribute('class', 'de-fav-inf-icon');
							titleEl.removeAttribute('title');
							return _context10.abrupt('continue', 35);

						case 21:
							_context10.next = 30;
							break;

						case 23:
							_context10.prev = 23;
							_context10.t1 = _context10['catch'](13);

							$hide(el);
							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
							f['err'] = titleEl.title = getErrorMessage(_context10.t1);
							isUpdate = true;
							return _context10.abrupt('continue', 35);

						case 30:
							if (f['err']) {
								delete f['err'];
								isUpdate = true;
							}
							if ($q(aib.qClosed, form)) {
								iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-closed');
								titleEl.title = Lng.thrClosed[lang];
								f['err'] = 'Closed';
								isUpdate = true;
							} else {
								iconEl.setAttribute('class', 'de-fav-inf-icon');
								titleEl.removeAttribute('title');
							}
							cnt = $Q(aib.qRPost, form).length + 1 - el.nextElementSibling.textContent;

							el.textContent = cnt;
							if (cnt === 0) {
								$hide(el);
							} else {
								$show(el);
								f['new'] = cnt;
								isUpdate = true;
							}

						case 35:
							++i;
							_context10.next = 5;
							break;

						case 38:
							if (isUpdate) {
								setStored('DESU_Favorites', JSON.stringify(fav));
							}

						case 39:
						case 'end':
							return _context10.stop();
					}
				}
			}, _callee2, this, [[13, 23]]);
		}))));
		body.appendChild($btn(Lng.page[lang], Lng.infoPage[lang], async(regeneratorRuntime.mark(function _callee3() {
			var infoCount, els, postsInfo, i, el, iconEl, titleEl, page, infoLoaded, endPage, tNums, form, pInfo, _postsInfo$i, found, pageEl, iconClass, iconTitle;

			return regeneratorRuntime.wrap(function _callee3$(_context11) {
				while (1) {
					switch (_context11.prev = _context11.next) {
						case 0:
							els = $Q('.de-fav-current > .de-entry'), infoCount = els.length, postsInfo = [];

							if (infoCount) {
								_context11.next = 3;
								break;
							}

							return _context11.abrupt('return');

						case 3:
							$popup(Lng.loading[lang], 'load-pages', true);
							for (i = 0; i < infoCount; ++i) {
								el = els[i], iconEl = $q('.de-fav-inf-icon', el), titleEl = iconEl.parentNode;

								postsInfo.push({
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
							page = 0, infoLoaded = 0, endPage = (aib.lastPage || 10) + 1;

						case 6:
							if (!(page < endPage)) {
								_context11.next = 23;
								break;
							}

							_context11.prev = 7;
							_context11.next = 10;
							return ajaxLoad(aib.getPageUrl(aib.b, page));

						case 10:
							form = _context11.sent;

							tNums = new Set(Array.from(DelForm.getThreads(form)).map(function (thrEl) {
								return aib.getTNum(thrEl);
							}));
							_context11.next = 17;
							break;

						case 14:
							_context11.prev = 14;
							_context11.t0 = _context11['catch'](7);
							return _context11.abrupt('continue', 20);

						case 17:
							for (i = 0; i < infoCount; ++i) {
								pInfo = postsInfo[i];

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

							if (!(infoLoaded === infoCount)) {
								_context11.next = 20;
								break;
							}

							return _context11.abrupt('break', 23);

						case 20:
							++page;
							_context11.next = 6;
							break;

						case 23:
							for (i = 0; i < infoCount; ++i) {
								_postsInfo$i = postsInfo[i];
								found = _postsInfo$i.found;
								pageEl = _postsInfo$i.pageEl;
								iconClass = _postsInfo$i.iconClass;
								iconEl = _postsInfo$i.iconEl;
								iconTitle = _postsInfo$i.iconTitle;
								titleEl = _postsInfo$i.titleEl;

								if (!found) {
									iconEl.setAttribute('class', iconClass);
									if (iconTitle) {
										titleEl.setAttribute('title', iconTitle);
									} else {
										titleEl.removeAttribute('title');
									}
									pageEl.textContent = '@?';
								}
							}
							closePopup('load-pages');

						case 25:
						case 'end':
							return _context11.stop();
					}
				}
			}, _callee3, this, [[7, 14]]);
		}))));
		body.appendChild($btn(Lng.clear[lang], Lng.clrDeleted[lang], async(regeneratorRuntime.mark(function _callee4() {
			var i, els, len, el, iconEl, titleEl;
			return regeneratorRuntime.wrap(function _callee4$(_context12) {
				while (1) {
					switch (_context12.prev = _context12.next) {
						case 0:
							i = 0, els = $Q('.de-entry'), len = els.length;

						case 1:
							if (!(i < len)) {
								_context12.next = 20;
								break;
							}

							el = els[i], iconEl = $q('.de-fav-inf-icon', el), titleEl = iconEl.parentNode;

							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-wait');
							titleEl.title = Lng.updating[lang];
							_context12.prev = 5;
							_context12.next = 8;
							return $ajax(el.getAttribute('de-url'), null, false);

						case 8:
							iconEl.setAttribute('class', 'de-fav-inf-icon');
							titleEl.removeAttribute('title');
							_context12.next = 17;
							break;

						case 12:
							_context12.prev = 12;
							_context12.t0 = _context12['catch'](5);

							if (_context12.t0.code === 404) {
								el.setAttribute('de-removed', '');
							}
							iconEl.setAttribute('class', 'de-fav-inf-icon de-fav-unavail');
							titleEl.title = getErrorMessage(_context12.t0);

						case 17:
							++i;
							_context12.next = 1;
							break;

						case 20:
							cleanFavorites();

						case 21:
						case 'end':
							return _context12.stop();
					}
				}
			}, _callee4, this, [[5, 12]]);
		}))));
		body.appendChild($btn(Lng.remove[lang], Lng.clrSelected[lang], function () {
			$each($Q('.de-entry'), function (el) {
				if ($q('input', el).checked) {
					el.setAttribute('de-removed', '');
				}
			});
			cleanFavorites();
		}));
	}




	function fixSettings() {
		function toggleBox(state, arr) {
			var i = arr.length,
			    nState = !state;
			while (i--) {
				($q(arr[i]) || {}).disabled = nState;
			}
		}
		toggleBox(Cfg.ajaxUpdThr, ['input[info="updThrDelay"]', 'input[info="updCount"]', 'input[info="favIcoBlink"]', 'input[info="markNewPosts"]', 'input[info="desktNotif"]', 'input[info="noErrInTitle"]']);
		toggleBox(Cfg.postBtnsCSS === 2, ['input[info="postBtnsBack"]']);
		toggleBox(Cfg.expandImgs, ['input[info="imgNavBtns"]', 'input[info="resizeDPI"]', 'input[info="resizeImgs"]', 'input[info="minImgSize"]', 'input[info="zoomFactor"]', 'input[info="webmControl"]', 'input[info="webmVolume"]']);
		toggleBox(Cfg.preLoadImgs, ['input[info="findImgFile"]']);
		toggleBox(Cfg.linksNavig, ['input[info="linksOver"]', 'input[info="linksOut"]', 'input[info="markViewed"]', 'input[info="strikeHidd"]', 'input[info="noNavigHidd"]']);
		toggleBox(Cfg.strikeHidd && Cfg.linksNavig === 2, ['input[info="removeHidd"]']);
		toggleBox(Cfg.addYouTube && Cfg.addYouTube !== 4, ['select[info="YTubeType"]', 'input[info="addVimeo"]']);
		toggleBox(Cfg.addYouTube, ['input[info="YTubeWidth"]', 'input[info="YTubeHeigh"]', 'input[info="YTubeTitles"]', 'input[info="ytApiKey"]']);
		toggleBox(Cfg.YTubeTitles, ['input[info="ytApiKey"]']);
		toggleBox(Cfg.ajaxReply, ['input[info="sendErrNotif"]', 'input[info="scrAfterRep"]']);
		toggleBox(Cfg.ajaxReply === 2, ['input[info="postSameImg"]', 'input[info="removeEXIF"]', 'input[info="removeFName"]']);
		toggleBox(Cfg.addTextBtns, ['input[info="txtBtnsLoc"]']);
		toggleBox(Cfg.updScript, ['select[info="scrUpdIntrv"]']);
		toggleBox(Cfg.hotKeys, ['input[info="loadPages"]']);
	}

	function lBox(id, isBlock, fn) {
		var el = $new('input', { 'class': 'de-cfg-chkbox', 'info': id, 'type': 'checkbox' }, {
			'click': function click() {
				toggleCfg(this.getAttribute('info'));
				fixSettings();
				if (fn) {
					fn(this);
				}
			}
		});
		el.checked = Cfg[id];
		return $New('label', { 'class': 'de-cfg-label' + (isBlock ? ' de-block' : '') }, [el, $txt(' ' + Lng.cfg[id][lang])]);
	}

	function inpTxt(id, size, Fn) {
		return $new('input', { 'class': 'de-cfg-inptxt', 'info': id,
			'type': 'text', 'size': size, 'value': Cfg[id] }, {
			'keyup': Fn ? Fn : function () {
				saveCfg(this.getAttribute('info'), this.value);
			}
		});
	}

	function optSel(id, isBlock, Fn) {
		var className = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

		var el,
		    opt = '',
		    x = Lng.cfg[id];
		for (var i = 0, len = x.sel[lang].length; i < len; i++) {
			opt += '<option value="' + i + '">' + x.sel[lang][i] + '</option>';
		}
		el = $add('<select class="de-cfg-select" info="' + id + '">' + opt + '</select>');
		el.addEventListener('change', Fn || function () {
			saveCfg(this.getAttribute('info'), this.selectedIndex);
			fixSettings();
		});
		el.selectedIndex = Cfg[id];
		return $New('label', { 'class': className + (isBlock ? ' de-block' : '') + ' de-cfg-label' }, [el, $txt(' ' + x.txt[lang])]);
	}

	function updRowMeter(node) {
		var top = node.scrollTop,
		    el = node.previousSibling,
		    num = el.numLines || 1,
		    i = 17;
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

	function getCfgFilters() {
		return $New('div', { 'class': 'de-cfg-unvis', 'id': 'de-cfg-filters' }, [$New('div', { 'id': 'de-spell-panel' }, [lBox('hideBySpell', false, Spells.toggle.bind(Spells)), $new('a', {
			'id': 'de-btn-addspell',
			'text': Lng.add[lang],
			'href': '#',
			'class': 'de-abtn de-spell-btn' }, {
			'click': $pd,
			'mouseover': function mouseover(_ref4) {
				var target = _ref4.target;
				return target.odelay = setTimeout(function () {
					return addMenu(target);
				}, Cfg.linksOver);
			},
			'mouseout': function mouseout(_ref5) {
				var target = _ref5.target;
				return clearTimeout(target.odelay);
			}
		}), $new('a', { 'text': Lng.apply[lang], 'href': '#', 'class': 'de-abtn de-spell-btn' }, {
			'click': function click(e) {
				$pd(e);
				saveCfg('hideBySpell', 1);
				$q('input[info="hideBySpell"]').checked = true;
				Spells.toggle();
			}
		}), $new('a', { 'text': Lng.clear[lang], 'href': '#', 'class': 'de-abtn de-spell-btn' }, {
			'click': function click(e) {
				$pd(e);
				$id('de-spell-txt').value = '';
				Spells.toggle();
			}
		}), $add('<a href="' + gitWiki + 'Spells-' + (lang ? 'en' : 'ru') + '" class="de-abtn de-spell-btn" target="_blank">[?]</a>')]), $New('div', { 'id': 'de-spell-editor' }, [$add('<div id="de-spell-rowmeter"></div>'), $new('textarea', { 'id': 'de-spell-txt', 'wrap': 'off' }, {
			'keydown': function keydown() {
				updRowMeter(this);
			},
			'scroll': function scroll() {
				updRowMeter(this);
			}
		})]), lBox('sortSpells', true, function () {
			if (Cfg.sortSpells) {
				Spells.toggle();
			}
		}), lBox('menuHiddBtn', true, null), lBox('hideRefPsts', true, null), lBox('delHiddPost', true, function () {
			for (var post = Thread.first.op; post; post = post.next) {
				if (post.hidden) {
					post.wrap.classList.toggle('de-hidden');
				}
			}
			updateCSS();
		})]);
	}

	function getCfgPosts() {
		return $New('div', { 'class': 'de-cfg-unvis', 'id': 'de-cfg-posts' }, [$if(!localRun, $New('div', null, [lBox('ajaxUpdThr', false, aib.t ? function () {
			if (Cfg.ajaxUpdThr) {
				updater.enable();
			} else {
				updater.disable();
			}
		} : null), inpTxt('updThrDelay', 2, null), $txt(Lng.cfg.updThrDelay[lang]), $New('div', { 'class': 'de-cfg-depend' }, [lBox('updCount', true, function () {
			updater.toggleCounter(Cfg.updCount);
		}), lBox('favIcoBlink', true, null), $if('Notification' in window, lBox('desktNotif', true, function () {
			if (Cfg.desktNotif) {
				Notification.requestPermission();
			}
		})), lBox('markNewPosts', true, function () {
			Post.clearMarks();
		}), lBox('noErrInTitle', true, null)])])), lBox('hideReplies', true, null), lBox('expandTrunc', true, updateCSS), lBox('updThrBtns', true, updateCSS), $New('div', null, [lBox('showHideBtn', false, updateCSS), lBox('showRepBtn', false, updateCSS)]), optSel('postBtnsCSS', false, function () {
			saveCfg('postBtnsCSS', this.selectedIndex);
			updateCSS();
			if (nav.Presto) {
				$del($q('.de-svg-icons'));
				addSVGIcons();
			}
			fixSettings();
		}), inpTxt('postBtnsBack', 8, function () {
			if (checkCSSColor(this.value)) {
				this.classList.remove('de-error-input');
				saveCfg('postBtnsBack', this.value);
				updateCSS();
			} else {
				this.classList.add('de-error-input');
			}
		}), optSel('noSpoilers', true, function () {
			saveCfg('noSpoilers', this.selectedIndex);
			updateCSS();
		}), lBox('noPostNames', true, updateCSS), lBox('widePosts', true, updateCSS), $New('div', null, [lBox('correctTime', false, DateTime.toggleSettings), inpTxt('timeOffset', 2, null), $txt(Lng.cfg.timeOffset[lang]), $add('<a href="' + gitWiki + 'Settings-time-' + (lang ? 'en' : 'ru') + '" class="de-abtn" target="_blank">[?]</a>')]), $New('div', { 'class': 'de-cfg-depend' }, [$New('div', null, [inpTxt('timePattern', 24, null), $txt(Lng.cfg.timePattern[lang])]), $New('div', null, [inpTxt('timeRPattern', 24, null), $txt(Lng.cfg.timeRPattern[lang])])])]);
	}

	function getCfgImages() {
		return $New('div', { 'class': 'de-cfg-unvis', 'id': 'de-cfg-images' }, [optSel('expandImgs', true, null), $New('div', { 'class': 'de-cfg-depend' }, [lBox('imgNavBtns', true, updateCSS), lBox('resizeImgs', true, updateCSS), $if(Post.sizing.dPxRatio > 1, lBox('resizeDPI', true, null)), $New('div', null, [inpTxt('minImgSize', 2, function () {
			saveCfg('minImgSize', Math.max(+this.value, 1));
		}), $txt(Lng.cfg.minImgSize[lang])]), inpTxt('zoomFactor', 2, function () {
			saveCfg('zoomFactor', Math.min(Math.max(+this.value, 1), 100));
		}), $txt(Lng.cfg.zoomFactor[lang]), lBox('webmControl', true, null), $if(nav.canPlayWebm, $New('div', null, [inpTxt('webmVolume', 2, function () {
			var val = Math.min(+this.value || 0, 100);
			saveCfg('webmVolume', val);
			locStorage['__de-webmvolume'] = val;
			locStorage.removeItem('__de-webmvolume');
		}), $txt(Lng.cfg.webmVolume[lang])]))]), $if(!nav.Presto, lBox('preLoadImgs', true, null)), $if(!nav.Presto && !aib.fch, $New('div', { 'class': 'de-cfg-depend' }, [lBox('findImgFile', true, null)])), optSel('openImgs', true, null), lBox('imgSrcBtns', true, null), lBox('delImgNames', true, null), $New('div', null, [inpTxt('maskVisib', 2, function () {
			var val = Math.min(+this.value || 0, 100);
			saveCfg('maskVisib', val);
			updateCSS();
		}), $txt(Lng.cfg.maskVisib[lang])])]);
	}

	function getCfgLinks() {
		return $New('div', { 'class': 'de-cfg-unvis', 'id': 'de-cfg-links' }, [optSel('linksNavig', true, null), $New('div', { 'class': 'de-cfg-depend' }, [$New('div', null, [inpTxt('linksOver', 2, function () {
			saveCfg('linksOver', +this.value | 0);
		}), $txt(Lng.cfg.linksOver[lang]), inpTxt('linksOut', 2, function () {
			saveCfg('linksOut', +this.value | 0);
		}), $txt(Lng.cfg.linksOut[lang])]), lBox('markViewed', true, null), lBox('strikeHidd', true, updateCSS), $New('div', { 'class': 'de-cfg-depend' }, [lBox('removeHidd', false, updateCSS)]), lBox('noNavigHidd', true, null)]), lBox('crossLinks', true, null), lBox('insertNum', true, null), lBox('addOPLink', true, null), lBox('addImgs', true, null), lBox('addMP3', false, null), $if(aib.prot === 'http:', lBox('addVocaroo', false, null)), optSel('addYouTube', true, null), $New('div', { 'class': 'de-cfg-depend' }, [$New('div', null, [optSel('YTubeType', false, null), inpTxt('YTubeWidth', 2, null), $txt('×'), inpTxt('YTubeHeigh', 2, null), $txt('(px)')]), lBox('YTubeTitles', false, null), $New('div', null, [inpTxt('ytApiKey', 25, function () {
			saveCfg('ytApiKey', this.value.trim());
		}), $txt(Lng.cfg.ytApiKey[lang])]), lBox('addVimeo', true, null)])]);
	}

	function getCfgForm() {
		return $New('div', { 'class': 'de-cfg-unvis', 'id': 'de-cfg-form' }, [optSel('ajaxReply', true, null), $if(pr.form, $New('div', { 'class': 'de-cfg-depend' }, [$New('div', null, [lBox('postSameImg', true, null), lBox('removeEXIF', false, null), lBox('removeFName', false, null), lBox('sendErrNotif', true, null)]), lBox('scrAfterRep', true, null)])), $if(pr.form, optSel('addPostForm', true, function () {
			saveCfg('addPostForm', this.selectedIndex);
			pr.isBottom = Cfg.addPostForm === 1;
			pr.setReply(false, !aib.t || Cfg.addPostForm > 1);
		})), $if(pr.txta, lBox('spacedQuote', true, null)), lBox('favOnReply', true, null), $if(pr.subj, lBox('warnSubjTrip', false, null)), $if(pr.file && !nav.Presto, lBox('fileThumb', true, function () {
			for (var inp = pr.fileObj; true; inp = inp.next) {
				inp.updateUtils();
				if (!inp.next) {
					break;
				}
			}
			if (inp.empty) {
				inp.hideInputs();
			}
			if (!aib.kus && !aib.multiFile) {
				pr.setPlaceholders();
			}
			updateCSS();
		})), $if(pr.mail, $New('div', null, [lBox('addSageBtn', false, function () {
			PostForm.hideField($parent(pr.mail, 'LABEL') || pr.mail);
			updateCSS();
		}), lBox('saveSage', false, null)])), $if(pr.cap, $New('div', null, [inpTxt('capUpdTime', 2, null), $txt(Lng.cfg.capUpdTime[lang]), optSel('captchaLang', true, null)])), $if(pr.txta, $New('div', null, [optSel('addTextBtns', false, function () {
			saveCfg('addTextBtns', this.selectedIndex);
			pr.addTextPanel();
		}), lBox('txtBtnsLoc', false, pr.addTextPanel.bind(pr))])), $if(pr.passw, $New('div', null, [inpTxt('passwValue', 9, PostForm.setUserPassw), $txt(Lng.cfg.userPassw[lang]), $btn(Lng.change[lang], '', function () {
			$q('input[info="passwValue"]').value = Math.round(Math.random() * 1e15).toString(32);
			PostForm.setUserPassw();
		}, 'de-cfg-button')])), $if(pr.name, $New('div', null, [inpTxt('nameValue', 9, PostForm.setUserName), $txt(' '), lBox('userName', false, PostForm.setUserName)])), $if(pr.rules || pr.passw || pr.name, $New('div', null, [$txt(Lng.dontShow[lang]), $if(pr.rules, lBox('noBoardRule', false, updateCSS)), $if(pr.passw, lBox('noPassword', false, function () {
			$toggle($parent(pr.passw, 'TR'));
		})), $if(pr.name, lBox('noName', false, function () {
			PostForm.hideField(pr.name);
		})), $if(pr.subj, lBox('noSubj', false, function () {
			PostForm.hideField(pr.subj);
		}))]))]);
	}

	function getCfgCommon() {
		return $New('div', { 'class': 'de-cfg-unvis', 'id': 'de-cfg-common' }, [optSel('scriptStyle', true, function () {
			saveCfg('scriptStyle', this.selectedIndex);
			$id('de-main').lang = $q('#de-win-reply > .de-win-head').lang = getThemeLang();
		}), $New('div', null, [lBox('userCSS', false, updateCSS), addEditButton('css', function (fn) {
			fn(Cfg.userCSSTxt, false, function () {
				saveCfg('userCSSTxt', this.value);
				updateCSS();
				toggleWindow('cfg', true);
			});
		}, 'de-cfg-button'), $add('<a href="' + gitWiki + 'css-tricks" class="de-abtn" target="_blank">[?]</a>')]), lBox('panelCounter', true, updateCSS), lBox('rePageTitle', true, null), lBox('animation', true, null), lBox('closePopups', true, null), lBox('inftyScroll', true, toggleInfinityScroll), $New('div', null, [lBox('hotKeys', false, function () {
			if (Cfg.hotKeys) {
				HotKeys.enable();
			} else {
				HotKeys.disable();
			}
		}), $btn(Lng.edit[lang], '', function (e) {
			$pd(e);
			if ($id('de-popup-edit-hotkeys')) {
				return;
			}
			Promise.resolve(HotKeys.readKeys()).then(function (keys) {
				var temp = KeyEditListener.getEditMarkup(keys),
				    el = $popup(temp[1], 'edit-hotkeys', false),
				    fn = new KeyEditListener(el, keys, temp[0]);
				el.addEventListener('focus', fn, true);
				el.addEventListener('blur', fn, true);
				el.addEventListener('click', fn, true);
				el.addEventListener('keydown', fn, true);
				el.addEventListener('keyup', fn, true);
			});
		}, 'de-cfg-button')]), $New('div', { 'class': 'de-cfg-depend' }, [inpTxt('loadPages', 2, null), $txt(Lng.cfg.loadPages[lang])]), $if(!nav.isChromeStorage && !nav.Presto || nav.isGM, $New('div', null, [lBox('updScript', true, null), $New('div', { 'class': 'de-cfg-depend' }, [optSel('scrUpdIntrv', false, null), $btn(Lng.checkNow[lang], '', function () {
			$popup(Lng.loading[lang], 'updavail', true);
			spawn(getStoredObj, 'DESU_Config').then(function (val) {
				return checkForUpdates(true, val.lastUpd);
			}).then(function (html) {
				return $popup(html, 'updavail', false);
			}, emptyFn);
		}, 'de-cfg-button')])])), $if(nav.isGlobal, $New('div', null, [$txt(Lng.cfg['excludeList'][lang]), $new('input', { 'type': 'text', 'id': 'de-exclude-edit', 'class': 'de-cfg-inptxt',
			'style': 'display: block; width: 80%;',
			'value': excludeList,
			'placeholder': '4chan.org, 8ch.net, ...' }, {
			'keyup': function keyup() {
				setStored('DESU_Exclude', excludeList = this.value);
			}
		}), lBox('turnOff', true, function () {
			spawn(getStoredObj, 'DESU_Config').then(function (val) {
				for (var dm in val) {
					if (dm !== aib.dm && dm !== 'global' && dm !== 'lastUpd') {
						val[dm].disabled = Cfg.turnOff;
					}
				}
				val[aib.dm].turnOff = Cfg.turnOff;
				setStored('DESU_Config', JSON.stringify(val));
			});
		})]))]);
	}

	function getCfgInfo() {
		function getHiddenThrCount() {
			var count = 0;
			for (var b in hThr) {
				count += Object.keys(hThr[b]).length;
			}
			return count;
		}
		var getInfoTable = function getInfoTable(data, needMs) {
			return data.map(function (data) {
				return '\n\t\t<div class="de-info-row">\n\t\t\t<span class="de-info-name">' + data[0] + '</span>\n\t\t\t<span>' + (data[1] + (needMs ? 'ms' : '')) + '</span>\n\t\t</div>';
			}).join('');
		};
		return $New('div', { 'class': 'de-cfg-unvis', 'id': 'de-cfg-info' }, [$add('\n\t\t<div style="padding-bottom: 10px;">\n\t\t\t<a href="' + gitWiki + 'versions" target="_blank">v' + version + '.' + commit + '</a>\n\t\t\t&nbsp;|&nbsp;\n\t\t\t<a href="http://www.freedollchan.org/scripts/" target="_blank">Freedollchan</a>\n\t\t\t&nbsp;|&nbsp;\n\t\t\t<a href="' + (gitWiki + (lang ? 'home-en/' : '')) + '" target="_blank">Github</a>\n\t\t</div>'), $add('\n\t\t<div id="de-info-table">\n\t\t\t<div id="de-info-stats">' + getInfoTable([[Lng.thrViewed[lang], Cfg.stats.view], [Lng.thrCreated[lang], Cfg.stats.op], [Lng.thrHidden[lang], getHiddenThrCount()], [Lng.postsSent[lang], Cfg.stats.reply]], false) + '</div>\n\t\t\t<div id="de-info-log">' + getInfoTable(Logger.getData(false), true) + '</div>\n\t\t</div>'), $btn(Lng.debug[lang], Lng.infoDebug[lang], function () {
			$popup(Lng.infoDebug[lang] + ':<textarea readonly class="de-editor"></textarea>', 'cfg-debug', false).firstElementChild.value = JSON.stringify({
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
		})]);
	}

	function addEditButton(name, getDataFn) {
		var className = arguments.length <= 2 || arguments[2] === undefined ? 'de-button' : arguments[2];

		return $btn(Lng.edit[lang], Lng.editInTxt[lang], function () {
			return getDataFn(function (val, isJSON, saveFn) {
				var el = $popup('<b>' + Lng.editor[name][lang] + '</b>' + '<textarea class="de-editor"></textarea>', 'edit-' + name, false),
				    ta = el.lastChild;
				ta.value = isJSON ? JSON.stringify(val, null, '\t') : val;
				el.appendChild($btn(Lng.save[lang], Lng.saveChanges[lang], isJSON ? (function (fun) {
					var data;
					try {
						data = JSON.parse(this.value.trim().replace(/[\n\r\t]/g, '') || '{}');
					} finally {
						if (data) {
							fun(data);
							closePopup('edit-' + name);
							closePopup('err-invaliddata');
						} else {
							$popup(Lng.invalidData[lang], 'err-invaliddata', false);
						}
					}
				}).bind(ta, saveFn) : saveFn.bind(ta)));
			});
		}, className);
	}

	function cfgTabClick(e) {
		var el = e.target;
		if (el.hasAttribute('selected')) {
			return;
		}
		var prefTab = $q('.de-cfg-body');
		if (prefTab) {
			prefTab.className = 'de-cfg-unvis';
			$q('.de-cfg-tab[selected]').removeAttribute('selected');
		}
		el.setAttribute('selected', '');
		var id = el.getAttribute('info'),
		    newTab = $id('de-cfg-' + id);
		if (!newTab) {
			$after($id('de-cfg-bar'), newTab = id === 'filters' ? getCfgFilters() : id === 'posts' ? getCfgPosts() : id === 'images' ? getCfgImages() : id === 'links' ? getCfgLinks() : id === 'form' ? getCfgForm() : id === 'common' ? getCfgCommon() : getCfgInfo());
			if (id === 'filters') {
				updRowMeter($id('de-spell-txt'));
			}
		}
		newTab.className = 'de-cfg-body';
		if (id === 'filters') {
			$id('de-spell-txt').value = Spells.list;
		}
		fixSettings();
	}

	function addSettings(body, id) {
		var cfgTab = function cfgTab(name) {
			return $new('div', {
				'class': aib.cReply + ' de-cfg-tab',
				'text': Lng.cfgTab[name][lang],
				'info': name }, {
				'click': cfgTabClick
			});
		};
		body.appendChild($New('div', { 'id': 'de-cfg-bar' }, [cfgTab('filters'), cfgTab('posts'), cfgTab('images'), cfgTab('links'), $if(pr.form || pr.oeForm, cfgTab('form')), cfgTab('common'), cfgTab('info')]));
		body.appendChild($New('div', { 'id': 'de-cfg-buttons' }, [optSel('language', false, function () {
			saveCfg('language', lang = this.selectedIndex);
			panel.remove();
			$del($id('de-css'));
			$del($id('de-css-dynamic'));
			scriptCSS();
			panel.init(DelForm.first.el);
			toggleWindow('cfg', false);
		}, 'de-cfg-lang-select'), addEditButton('cfg', function (fn) {
			fn(Cfg, true, function (data) {
				saveComCfg(aib.dm, data);
				window.location.reload();
			});
		}), $btn(Lng.reset[lang], Lng.resetCfg[lang], function () {
			var fn = function fn(a) {
				return $join(a, '<label class="de-block"><input type="checkbox"/> ', '</label>');
			},
			    el = $popup('<b>' + Lng.resetData[lang] + ':</b>', 'cfg-reset', false);
			el.insertAdjacentHTML('beforeend', '<div class="de-list"><b>' + aib.dm + '</b>:' + fn([Lng.panelBtn.cfg[lang], Lng.hiddenPosts[lang], Lng.hiddenThrds[lang], Lng.myPosts[lang]]) + '</div>' + '<div class="de-list"><b>' + Lng.allDomains[lang] + '</b>' + fn([Lng.panelBtn.cfg[lang], Lng.panelBtn.fav[lang], Lng.cfg.hotKeys[lang]]) + '</div>');
			el.appendChild($btn(Lng.clear[lang], '', function () {
				var els = $Q('input[type="checkbox"]', this.parentNode);
				for (var i = 0, len = els.length; i < len; ++i) {
					if (!els[i].checked) {
						continue;
					}
					switch (i) {
						case 1:
							locStorage.removeItem('de-posts');break;
						case 2:
							locStorage.removeItem('de-threads');break;
						case 3:
							locStorage.removeItem('de-myposts');break;
						case 5:
							delStored('DESU_Favorites');break;
						case 6:
							delStored('DESU_Keys');
					}
				}
				if (els[4].checked) {
					delStored('DESU_Config');
					delStored('DESU_Exclude');
				} else if (els[0].checked) {
					spawn(getStoredObj, 'DESU_Config').then(function (val) {
						delete val[aib.dm];
						setStored('DESU_Config', JSON.stringify(val));
						window.location.reload();
					});
					return;
				}
				window.location.reload();
			}));
		}), $if(nav.isGlobal, $btn(Lng.global[lang], Lng.globalCfg[lang], function () {
			var el = $popup('<b>' + Lng.globalCfg[lang] + ':</b>', 'cfg-global', false);
			el.appendChild($New('div', { 'class': 'de-list' }, [$btn(Lng.load[lang], '', function () {
				spawn(getStoredObj, 'DESU_Config').then(function (val) {
					if (val && 'global' in val && !$isEmpty(val.global)) {
						delete val[aib.dm];
						setStored('DESU_Config', JSON.stringify(val));
						window.location.reload();
					} else {
						$popup(Lng.noGlobalCfg[lang], 'err-noglobalcfg', false);
					}
				});
			}), $txt(Lng.loadGlobal[lang])]));
			el.appendChild($New('div', { 'class': 'de-list' }, [$btn(Lng.save[lang], '', function () {
				spawn(getStoredObj, 'DESU_Config').then(function (val) {
					var obj = {},
					    com = val[aib.dm];
					for (var i in com) {
						if (i !== 'correctTime' && i !== 'timePattern' && i !== 'userCSS' && i !== 'userCSSTxt' && com[i] !== defaultCfg[i] && i !== 'stats') {
							obj[i] = com[i];
						}
					}
					val.global = obj;
					setStored('DESU_Config', JSON.stringify(val));
					toggleWindow('cfg', true);
				});
			}), $txt(Lng.saveGlobal[lang])]));
			el.insertAdjacentHTML('beforeend', '<hr><small>' + Lng.descrGlobal[lang] + '</small>');
		})), $if(!nav.Presto, $btn(Lng.file[lang], '', function () {
			$popup('<b>' + Lng.impexpCfg[lang] + ':</b>' + '<div class="de-list">' + Lng.fileToCfg[lang] + ':<br>' + '<input type="file" accept=".json" id="de-import-file" style="margin-left: 12px;"/></div>' + '<div class="de-list"><a id="de-export-file" href="#">' + Lng.cfgToFile[lang] + '</div>', 'cfg-file', false);
			$id('de-import-file').onchange = function (_ref6) {
				var _ref6$target$files = _slicedToArray(_ref6.target.files, 1);

				var file = _ref6$target$files[0];

				if (file) {
					readFile(file, true).then(function (_ref7) {
						var data = _ref7.data;

						var dummy = JSON.parse(data);
						setStored('DESU_Config', data);
						window.location.reload();
					})['catch'](function () {
						return $popup(Lng.invalidData[lang], 'err-invaliddata', false);
					});
				}
			};
			$id('de-export-file').addEventListener('click', function (e) {
				spawn(getStored, 'DESU_Config').then(function (val) {
					var d = new Date(),
					    fn = function fn(i) {
						return parseInt(i) < 10 ? '0' + i : i;
					};
					downloadBlob(new Blob([val], { type: 'application/json' }), 'DE_Config_' + d.getFullYear() + fn(d.getMonth() + 1) + fn(d.getDate()) + '_' + fn(d.getHours()) + fn(d.getMinutes()) + '.json');
				});
				$pd(e);
			}, true);
		}))]));
		$q('.de-cfg-tab[info="' + (id || 'filters') + '"]', body).click();
	}




	function closePopup(data) {
		var el = typeof data === 'string' ? $id('de-popup-' + data) : data;
		if (el) {
			el.closeTimeout = null;
			if (!Cfg.animation) {
				$del(el);
				return;
			}
			nav.animEvent(el, function (node) {
				var p = node && node.parentNode;
				if (p) {
					p.removeChild(node);
				}
			});
			el.classList.add('de-close');
		}
	}

	function $popup(txt, id, wait) {
		var node,
		    el = $id('de-popup-' + id),
		    buttonHTML = wait ? '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' : '✖ ';
		if (el) {
			$q('div', el).innerHTML = txt.trim();
			$q('span', el).innerHTML = buttonHTML;
			clearTimeout(el.closeTimeout);
			if (!wait && Cfg.animation) {
				nav.animEvent(el, function (node) {
					node.classList.remove('de-blink');
				});
				el.classList.add('de-blink');
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
				nav.animEvent(el, function (node) {
					node.classList.remove('de-open');
				});
				el.classList.add('de-open');
			}
		}
		if (Cfg.closePopups && !wait && !id.includes('edit') && !id.includes('cfg')) {
			el.closeTimeout = setTimeout(closePopup, 4e3, el);
		}
		return el.lastElementChild;
	}

	function Menu(parentEl, html, clickFn) {
		var isFixed = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

		docBody.insertAdjacentHTML('beforeend', '<div class="' + aib.cReply + ' de-menu" style="position: ' + (isFixed ? 'fixed' : 'absolute') + '; left: 0px; top: 0px; visibility: hidden;">' + html + '</div>');
		var el = docBody.lastChild;
		var mStyle = el.style;
		var cr = parentEl.getBoundingClientRect();
		var width = el.offsetWidth;
		var xOffset = isFixed ? 0 : window.pageXOffset;
		if (cr.left + width < Post.sizing.wWidth) {
			mStyle.left = xOffset + cr.left + 'px';
		} else {
			mStyle.left = xOffset + cr.right - width + 'px';
		}
		var height = el.offsetHeight;
		var yOffset = isFixed ? 0 : window.pageYOffset;
		if (cr.bottom + height < Post.sizing.wHeight) {
			mStyle.top = yOffset + cr.bottom - .5 + 'px';
		} else {
			mStyle.top = yOffset + cr.top - height + .5 + 'px';
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
			var _this7 = this;

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
								return _this7.remove();
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
			case 'de-btn-addspell':
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
							$popup(Lng.loading[lang], 'savethr', true);
							Images_.afterpreload = loadDocFiles.bind(null, imgOnly);
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
		ntKeys: null,
		tKeys: null,
		version: 7,
		getDefaultKeys: function getDefaultKeys() {
			var globKeys = [
			0x004B 			, 0x004A 			, 0x0052 			, 0x0048 			, 0x1025 			, 0x900D 			, 0x4046 			, 0x4048 			, 0x0050 			, 0x0042 			, 0x4053 			, 0x0049 			, 0xC042 			, 0xC049 			, 0xC054 			, 0xC050 			, 0xC043 			, 0x1027 			, 0x4056 			];
			var nonThrKeys = [
			0x004D 			, 0x004E 			, 0x0056 			, 0x0045 			];
			var thrKeys = [
			0x0055 			];
			return [HotKeys.version, !!nav.Firefox, globKeys, nonThrKeys, thrKeys];
		},
		clear: function clear() {
			this.cPost = null;
			this._lastPageOffset = 0;
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
			var _this8 = this;

			if (!this.enabled) {
				this.enabled = true;
				this._paused = false;
				Promise.resolve(this.readKeys()).then(function (keys) {
					if (_this8.enabled) {
						_this8.gKeys = keys[2];
						_this8.ntKeys = keys[3];
						_this8.tKeys = keys[4];
						doc.addEventListener('keydown', _this8, true);
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
				this._lastPageOffset = 0;
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
							post.toggleUserVisib();
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
									GM_openInTab(aib.getThrdUrl(aib.b, post.tNum), false, true);
								} else {
									window.open(aib.getThrdUrl(aib.b, post.tNum), '_blank');
								}
							}
							break;
						} else if (idx === 3) {
						
							post = this._getFirstVisPost(false, true) || this._getNextVisPost(null, true, false);
							if (post) {
								if (post.thr.loadCount !== 0 && post.thr.op.next.count === 1) {
									var nextThr = post.thr.nextNotHidden;
									post.thr.load(visPosts, !!nextThr);
									post = (nextThr || post.thr).op;
								} else {
									post.thr.load('all', false);
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

		readKeys: async(regeneratorRuntime.mark(function _callee5() {
			var keys, str, tKeys, mapFunc;
			return regeneratorRuntime.wrap(function _callee5$(_context13) {
				while (1) {
					switch (_context13.prev = _context13.next) {
						case 0:
							return _context13.delegateYield(getStored('DESU_keys'), 't0', 1);

						case 1:
							str = _context13.t0;

							if (str) {
								_context13.next = 4;
								break;
							}

							return _context13.abrupt('return', this.getDefaultKeys());

						case 4:
							_context13.prev = 4;

							keys = JSON.parse(str);

						case 6:
							_context13.prev = 6;

							if (keys) {
								_context13.next = 9;
								break;
							}

							return _context13.abrupt('return', this.getDefaultKeys());

						case 9:
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
							if (keys[1] ^ !!nav.Firefox) {
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

								keys[1] = !!nav.Firefox;
								keys[2] = keys[2].map(mapFunc);
								keys[3] = keys[3].map(mapFunc);
								setStored('DESU_keys', JSON.stringify(keys));
							}
							return _context13.abrupt('return', keys);

						case 13:
						case 'end':
							return _context13.stop();
					}
				}
			}, _callee5, this, [[4,, 6, 13]]);
		})),

		_lastPageOffset: 0,
		_paused: false,
		_getFirstVisPost: function _getFirstVisPost(getThread, getFull) {
			if (this._lastPageOffset !== window.pageYOffset) {
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
				this._lastPageOffset = window.pageYOffset;
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
			this._lastPageOffset = window.pageYOffset;
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
	  'Space',,,,, 	  '←', '↑', '→', '↓',,,,,,,,  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',, ';',, '=',,,, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',,,,,,  	'Numpad 0', 'Numpad 1', 'Numpad 2', 'Numpad 3', 'Numpad 4', 'Numpad 5', 'Numpad 6', 'Numpad 7', 'Numpad 8', 'Numpad 9', 'Numpad *', 'Numpad +',, 'Numpad -', 'Numpad .', 'Numpad /',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
	         	   '-',,,,,,,,,,,,, ';', '=', ',', '-', '.', '/', '`',,,,,,,,,,,,,,,,,,,,,,,,,,, '[', '\\', ']', '\''];
	KeyEditListener.getStrKey = function (key) {
		return (key & 0x1000 ? 'Ctrl+' : '') + (key & 0x2000 ? 'Shift+' : '') + (key & 0x4000 ? 'Alt+' : '') + KeyEditListener.keyCodes[key & 0xFFF];
	};
	KeyEditListener.getEditMarkup = function (keys) {
		var allKeys = [];
		var html = Lng.hotKeyEdit[lang].join('').replace(/%l/g, '<label class="de-block">').replace(/%\/l/g, '</label>').replace(/%i([2-4])([0-9]+)(t)?/g, function (all, id1, id2, isText) {
			var key = keys[+id1][+id2];
			allKeys.push(key);
			return '<input class="de-input-key" type="text" de-id1="' + id1 + '" de-id2="' + id2 + '" size="16" value="' + KeyEditListener.getStrKey(key) + (isText ? '" de-text' : '"') + ' readonly/>';
		}) + '<input type="button" id="de-keys-save" class="de-button" value="' + Lng.save[lang] + '"/>' + '<input type="button" id="de-keys-reset" class="de-button" value="' + Lng.reset[lang] + '"/>';
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
					return { 'type': 0, 'idx': i, 'data': ab };
									} else if (dat[i] === 0x50 && dat[i + 1] === 0x4B && dat[i + 2] === 0x03) {
						return { 'type': 1, 'idx': i, 'data': ab };
											} else if (dat[i] === 0x52 && dat[i + 1] === 0x61 && dat[i + 2] === 0x72) {
							return { 'type': 2, 'idx': i, 'data': ab };
													} else if (dat[i] === 0x4F && dat[i + 1] === 0x67 && dat[i + 2] === 0x67) {
								return { 'type': 3, 'idx': i, 'data': ab };
															} else if (dat[i] === 0x49 && dat[i + 1] === 0x44 && dat[i + 2] === 0x33) {
									return { 'type': 4, 'idx': i, 'data': ab };
								}
			}
		}
		return {};
	}

	function WorkerPool(mReqs, wrkFn, errFn) {
		if (!nav.hasWorker) {
			this.run = function (data, transferObjs, fn) {
				return fn(wrkFn(data));
			};
			return;
		}
		var url = window.URL.createObjectURL(new Blob(['self.onmessage = function(e) {\n\t\tvar info = (' + String(wrkFn) + ')(e.data);\n\t\tif(info.data) {\n\t\t\tself.postMessage(info, [info.data]);\n\t\t} else {\n\t\t\tself.postMessage(info);\n\t\t}\n\t}'], { 'type': 'text/javascript' }));
		this._pool = new TasksPool(mReqs, this._createWorker.bind(this), null);
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
			var _this9 = this;

			return new Promise(function (resolve, reject) {
				var w = _this9._freeWorkers.pop();

				var _data = _slicedToArray(data, 3);

				var sendData = _data[0];
				var transferObjs = _data[1];
				var fn = _data[2];

				w.onmessage = function (e) {
					fn(e.data);
					_this9._freeWorkers.push(w);
					resolve();
				};
				w.onerror = function (err) {
					resolve();
					_this9._freeWorkers.push(w);
					_this9._errFn(err);
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
		nameLink.insertAdjacentHTML('afterend', '<a href="' + window.URL.createObjectURL(new Blob([nav.getUnsafeUint8Array(info.data, info.idx)], { 'type': app })) + '" class="de-img-' + (type > 2 ? 'audio' : 'arch') + '" title="' + Lng.downloadFile[lang] + '" download="' + fName.substring(0, fName.lastIndexOf('.')) + '.' + ext + '">.' + ext + '</a>');
	}

	function downloadImgData(url) {
		var repeatOnError = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		return $ajax(url, {
			responseType: 'arraybuffer',
			overrideMimeType: 'text/plain; charset=x-user-defined'
		}, !aib.fch || url.startsWith('blob')).then(function (xhr) {
			if (xhr.status === 0 && xhr.responseType === 'arraybuffer') {
				return new Uint8Array(xhr.response);
			}
			if ('response' in xhr) {
				return nav.getUnsafeUint8Array(xhr.response);
			}
			var txt = xhr.responseText,
			    rv = new Uint8Array(txt.length);
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
				console.error("FILE DETECTOR ERROR, line: " + e.lineno + " - " + e.message);
			});
			pool = new TasksPool(mReqs, function (num, data) {
				return downloadImgData(data[0]).then(function (imageData) {
					var _data2 = _slicedToArray(data, 5);

					var url = _data2[0];
					var imgLink = _data2[1];
					var iType = _data2[2];
					var nExp = _data2[3];
					var el = _data2[4];

					if (imageData) {
						var fName = url.substring(url.lastIndexOf("/") + 1),
						    nameLink = $q(aib.qImgName, aib.getImgWrap(imgLink));
						imgLink.setAttribute('download', fName);
						nameLink.setAttribute('download', fName);
						nameLink.setAttribute('de-href', nameLink.href);
						imgLink.href = nameLink.href = window.URL.createObjectURL(new Blob([imageData], { 'type': iType }));
						if (iType === 'video/webm') {
							el.setAttribute('de-video', '');
						}
						if (nExp) {
							el.src = imgLink.href;
						}
						if (rjf) {
							rjf.run(imageData.buffer, [imageData.buffer], addImgFileIcon.bind(null, nameLink, fName));
						}
					}
					if (Images_.progressId) {
						$popup(Lng.loadImage[lang] + cImg + '/' + len, Images_.progressId, true);
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
			var iType,
			    url = imgLink.href,
			    nExp = !!Cfg.openImgs;
			if (/\.gif$/i.test(url)) {
				iType = 'image/gif';
				nExp &= Cfg.openImgs !== 3;
			} else {
				if (/\.jpe?g$/i.test(url)) {
					iType = 'image/jpeg';
				} else if (/\.png$/i.test(url)) {
					iType = 'image/png';
				} else if (/\.webm$/i.test(url)) {
					iType = 'video/webm';
					nExp = false;
				} else {
					continue;
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

	function getDataFromImg(img) {
		var cnv = Images_.canvas || (Images_.canvas = doc.createElement('canvas'));
		cnv.width = img.width;
		cnv.height = img.height;
		cnv.getContext('2d').drawImage(img, 0, 0);
		return new Uint8Array(atob(cnv.toDataURL('image/png').split(',')[1]).split('').map(function (a) {
			return a.charCodeAt();
		}));
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
				var _data3 = _slicedToArray(data, 4);

				var url = _data3[0];
				var fName = _data3[1];
				var el = _data3[2];
				var imgLink = _data3[3];
				var safeName = fName.replace(/[\\\/:*?"<>|]/g, '_');
				progress.value = current;
				counter.innerHTML = current;
				current++;
				if (imgLink) {
					if (!imgData) {
						warnings += '<br>' + Lng.cantLoad[lang] + '<a href="' + url + '">' + url + '</a><br>' + Lng.willSavePview[lang];
						$popup(Lng.loadErrors[lang] + warnings, 'err-files', false);
						safeName = 'thumb-' + safeName.replace(/\.[a-z]+$/, '.png');
						imgData = getDataFromImg(el);
					}
					if (!imgOnly) {
						imgLink.href = $q('a[de-href], ' + aib.qImgName, aib.getImgWrap(imgLink)).href = safeName = 'images/' + safeName;
						if (safeName.match(/\.webm$/)) {
							tar.addFile(el.src = safeName.replace(/\.webm$/, '.png'), getDataFromImg(el));
						} else {
							el.src = safeName;
						}
					}
					tar.addFile(safeName, imgData);
				} else if (imgData && imgData.length > 0) {
					tar.addFile(el.href = el.src = 'data/' + safeName, imgData);
				} else {
					$del(el);
				}
			});
		}, function () {
			var docName = aib.dm + '-' + aib.b.replace(/[\\\/:*?"<>|]/g, '') + '-' + aib.t;
			if (!imgOnly) {
				var dt = doc.doctype;
				$q('head', dc).insertAdjacentHTML('beforeend', '<script type="text/javascript" src="data/dollscript.js"></script>');
				tar.addString('data/dollscript.js', '(' + String(typeof de_main_func_outer === 'undefined' ? de_main_func_inner : de_main_func_outer) + ')(null, true);');
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
				Images_.pool.run([url, imgLink.getAttribute('download') || url.substring(url.lastIndexOf("/") + 1), el, imgLink]);
			}
		});
		if (!imgOnly) {
			$each($Q('#de-main, .de-parea, .de-post-btns, .de-btn-src, .de-refmap, .de-thread-buttons, ' + '.de-video-obj, #de-win-reply, link[rel="alternate stylesheet"], script, ' + aib.qForm, dc), $del);
			$each($Q('a', dc), function (el) {
				var num,
				    tc = el.textContent;
				if (tc[0] === '>' && tc[1] === '>' && (num = +tc.substr(2)) && pByNum.has(num)) {
					el.href = aib.anchor + num;
				} else {
					el.href = getAbsLink(el.href);
				}
				if (!el.classList.contains('de-link-pref')) {
					el.className = 'de-link-pref ' + el.className;
				}
			});
			$each($Q(aib.qRPost, dc), function (post, i) {
				post.setAttribute('de-num', i === 0 ? aib.t : aib.getPNum(post));
			});
			var files = [];
			$each($Q('link, *[src]', dc), (function (el) {
				if (els.indexOf(el) !== -1) {
					return;
				}
				var fName,
				    url = el.tagName === 'LINK' ? el.href : el.src;
				if (!this.test(url)) {
					$del(el);
					return;
				}
				fName = url.substring(url.lastIndexOf("/") + 1).replace(/[\\\/:*?"<>|]/g, '_').toLowerCase();
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
			}).bind(new RegExp('^\\/\\/?|^https?:\\/\\/([^\\/]*\.)?' + regQuote(aib.dm) + '\\/', 'i')));
		}
		$popup((imgOnly ? Lng.loadImage[lang] : Lng.loadFile[lang]) + '<br><progress id="de-loadprogress" value="0" max="' + count + '"></progress> <span>1</span>/' + count, 'load-files', true);
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
		}).replace(/\-/g, '[^<]').replace(/\+/g, '[^0-9]').replace(/([sihdny]+)/g, '($1)').replace(/[sihdny]/g, '\\d').replace(/m|w/g, '([a-zA-Zа-яА-Я]+)');
		this.pattern = pattern.replace(/[\?\-\+]+/g, '').replace(/([a-z])\1+/g, '$1');
		this.diff = parseInt(diff, 10);
		this.arrW = Lng.week[dtLang];
		this.arrM = Lng.month[dtLang];
		this.arrFM = Lng.fullMonth[dtLang];
		if (rPattern) {
			this.genDateTime = DateTime.genRFunc(rPattern, diff);
		} else {
			this.onRPat = onRPat;
		}
	}
	DateTime.toggleSettings = function (el) {
		if (el.checked && (!/^[+-]\d{1,2}$/.test(Cfg.timeOffset) || DateTime.checkPattern(Cfg.timePattern))) {
			$popup(Lng.cTimeError[lang], 'err-correcttime', false);
			saveCfg('correctTime', 0);
			el.checked = false;
		}
	};
	DateTime.checkPattern = function (val) {
		return !val.includes('i') || !val.includes('h') || !val.includes('d') || !val.includes('y') || !(val.includes('n') || val.includes('m')) || /[^\?\-\+sihdmwny]|mm|ww|\?\?|([ihdny]\?)\1+/.test(val);
	};
	DateTime.genRFunc = function (rPattern, diff) {
		return new Function('dtime', 'return \'' + rPattern.replace('_o', (diff < 0 ? '' : '+') + diff).replace('_s', '\' + this.pad2(dtime.getSeconds()) + \'').replace('_i', '\' + this.pad2(dtime.getMinutes()) + \'').replace('_h', '\' + this.pad2(dtime.getHours()) + \'').replace('_d', '\' + this.pad2(dtime.getDate()) + \'').replace('_w', '\' + this.arrW[dtime.getDay()] + \'').replace('_n', '\' + this.pad2(dtime.getMonth() + 1) + \'').replace('_m', '\' + this.arrM[dtime.getMonth()] + \'').replace('_M', '\' + this.arrFM[dtime.getMonth()] + \'').replace('_y', '\' + (\'\' + dtime.getFullYear()).substring(2) + \'').replace('_Y', '\' + dtime.getFullYear() + \'') + '\';');
	};
	DateTime.prototype = {
		genDateTime: null,
		onRPat: null,
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
			this.genDateTime = DateTime.genRFunc(rPattern, this.diff);
			return true;
		},
		pad2: function pad2(num) {
			return num < 10 ? '0' + num : num;
		},
		fix: function fix(txt) {
			var _this10 = this;

			if (this.disabled || !this.genDateTime && !this.getRPattern(txt)) {
				return txt;
			}
			return txt.replace(new RegExp(this.regex, 'g'), function (str) {
				for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key3 = 1; _key3 < _len4; _key3++) {
					args[_key3 - 1] = arguments[_key3];
				}

				var second, minute, hour, day, month, year;
				for (var i = 0; i < 7; ++i) {
					var a = args[i];
					switch (_this10.pattern[i]) {
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
							switch (a.slice(0, 3).toLowerCase()) {
								case 'янв':case 'jan':
									month = 0;break;
								case 'фев':case 'feb':
									month = 1;break;
								case 'мар':case 'mar':
									month = 2;break;
								case 'апр':case 'apr':
									month = 3;break;
								case 'май':case 'мая':case 'may':
									month = 4;break;
								case 'июн':case 'jun':
									month = 5;break;
								case 'июл':case 'jul':
									month = 6;break;
								case 'авг':case 'aug':
									month = 7;break;
								case 'сен':case 'sep':
									month = 8;break;
								case 'окт':case 'oct':
									month = 9;break;
								case 'ноя':case 'nov':
									month = 10;break;
								case 'дек':case 'dec':
									month = 11;break;
								default:
									month = 0;break;
							}
					}
				}
				var dtime = new Date(year.length === 2 ? '20' + year : year, month, day, hour, minute, second || 0);
				dtime.setHours(dtime.getHours() + _this10.diff);
				return _this10.genDateTime(dtime);
			});
		}
	};




	function Videos(post) {
		var player = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var playerInfo = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

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
				val = Cfg.YTubeTitles ? JSON.parse(sesStorage['de-videos-data1'] || '[{}, {}]') : [{}, {}];
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
		var enableJsapi = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

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
				node.className = node.className === 'de-video-obj' ? 'de-video-obj de-video-expanded' : 'de-video-obj';
			};
		}
	};
	Videos._titlesLoaderHelper = function (_ref8, num) {
		var _ref9 = _slicedToArray(_ref8, 4);

		var link = _ref9[0];
		var isYtube = _ref9[1];
		var videoObj = _ref9[2];
		var id = _ref9[3];

		for (var _len5 = arguments.length, data = Array(_len5 > 2 ? _len5 - 2 : 0), _key4 = 2; _key4 < _len5; _key4++) {
			data[_key4 - 2] = arguments[_key4];
		}

		if (data.length !== 0) {
			var title = data[0];
			var author = data[1];
			var views = data[2];
			var publ = data[3];

			link.textContent = title;
			link.setAttribute('de-author', author);
			link.classList.add('de-video-title');
			link.title = Lng.author[lang] + author + (views ? ', ' + Lng.views[lang] + views : '') + (publ ? ', ' + Lng.published[lang] + publ : '');
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
		return $ajax('https://www.googleapis.com/youtube/v3/videos?key=' + Cfg.ytApiKey + '&id=' + id + '&part=snippet,statistics&fields=items/snippet/title,items/snippet/publishedAt,items/snippet/channelTitle,items/statistics/viewCount', null, false).then(function (xhr) {
			var items = JSON.parse(xhr.responseText).items[0];
			return Videos._titlesLoaderHelper(info, num, items.snippet.title, items.snippet.channelTitle, items.statistics.viewCount, items.snippet.publishedAt.substr(0, 10));
		})['catch'](function () {
			return Videos._getYTInfoOembed(info, num, id);
		});
	};
	Videos._getYTInfoOembed = function (info, num, id) {
		return $ajax('http://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D' + id + '&format=json', null, false).then(function (xhr) {
			var json = JSON.parse(xhr.responseText);
			return Videos._titlesLoaderHelper(info, num, json.title, json.author_name, null, null);
		})['catch'](function () {
			return Videos._titlesLoaderHelper(info, num);
		});
	};
	Videos._getTitlesLoader = function () {
		return Cfg.YTubeTitles && new TasksPool(4, function (num, info) {
			var _info = _slicedToArray(info, 4);

			var isYtube = _info[1];
			var id = _info[3];

			if (isYtube) {
				return Cfg.ytApiKey ? Videos._getYTInfoAPI(info, num, id) : Videos._getYTInfoOembed(info, num, id);
			}
			return $ajax(aib.prot + '//vimeo.com/api/v2/video/' + id + '.json', null, false).then(function (xhr) {
				var entry = JSON.parse(xhr.responseText)[0];
				return Videos._titlesLoaderHelper(info, num, entry["title"], entry["user_name"], entry["stats_number_of_plays"], /(.*)\s(.*)?/.exec(entry["upload_date"])[1]);
			})['catch'](function () {
				return Videos._titlesLoaderHelper(info, num);
			});
		}, function () {
			sesStorage['de-videos-data1'] = JSON.stringify(Videos._global.vData);
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
			var val = aib.insertYtPlayer(this.post.msg, '<div class="de-video-obj"></div>');
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
			if (m[4] || m[3] || m[2]) {
				if (m[4] >= 60) {
					m[3] = (m[3] || 0) + Math.floor(m[4] / 60);
					m[4] %= 60;
				}
				if (m[3] >= 60) {
					m[2] = (m[2] || 0) + Math.floor(m[3] / 60);
					m[3] %= 60;
				}
				time = (m[2] ? m[2] + 'h' : '') + (m[3] ? m[3] + 'm' : '') + (m[4] ? m[4] + 's' : '');
			}
			if (link) {
				link.href = link.href.replace(/^http:/, 'https:');
				if (time) {
					link.setAttribute('de-time', time);
				}
				link.className = 'de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo');
				if (dataObj) {
					link.textContent = dataObj[0];
					link.classList.add('de-video-title');
					link.setAttribute('de-author', dataObj[1]);
					link.title = Lng.author[lang] + dataObj[1] + (dataObj[2] ? ', ' + Lng.views[lang] + dataObj[2] : '') + (dataObj[3] ? ', ' + Lng.published[lang] + dataObj[3] : '');
				}
			} else {
				var src = isYtube ? aib.prot + '//www.youtube.com/watch?v=' + m[1] + (time ? '#t=' + time : '') : aib.prot + '//vimeo.com/' + m[1];
				this.post.msg.insertAdjacentHTML('beforeend', '<p class="de-video-ext"><a class="de-video-link ' + (isYtube ? 'de-ytube' : 'de-vimeo') + (dataObj ? ' de-video-title" title="' + Lng.author[lang] + dataObj[1] + ', ' + Lng.views[lang] + dataObj[2] + ', ' + Lng.published[lang] + dataObj[3] + '" de-author="' + dataObj[1] : '') + (time ? '" de-time="' + time : '') + '" href="' + src + '">' + (dataObj ? dataObj[0] : src) + '</a></p>');
				link = this.post.msg.lastChild.firstChild;
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
			var isPost = data instanceof AbstractPost,
			    loader = this._loader,
			    vids = aib.fixVideo(isPost, data),
			    links = $Q('a[href*="youtu"]', isPost ? data.el : data);
			for (var i = 0, len = links.length; i < len; ++i) {
				var link = links[i],
				    m = link.href.match(Videos.ytReg);
				if (m) {
					var mPost = isPost ? data : aib.getPostOfEl(link);
					if (mPost) {
						mPost.videos.addLink(m, loader, link, true);
					}
				}
			}
			if (Cfg.addVimeo) {
				links = $Q('a[href*="vimeo.com"]', isPost ? data.el : data);
				for (var i = 0, len = links.length; i < len; ++i) {
					var link = links[i],
					    m = link.href.match(Videos.vimReg);
					if (m) {
						var mPost = isPost ? data : aib.getPostOfEl(link);
						if (mPost) {
							mPost.videos.addLink(m, loader, link, false);
						}
					}
				}
			}
			for (var i = 0, len = vids.length; i < len; ++i) {
				var _vids$i = _slicedToArray(vids[i], 3);

				var pst = _vids$i[0];
				var m = _vids$i[1];
				var isYtube = _vids$i[2];

				if (pst) {
					pst.videos.addLink(m, loader, null, isYtube);
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
				if (link.target !== '_blank' && link.rel !== 'nofollow') {
					continue;
				}
				var src = link.href,
				    el = (isPost ? data : aib.getPostOfEl(link)).mp3Obj;
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
			var els = $Q('a[href*="vocaroo.com"]', isPost ? data.el : data);
			for (var i = 0, len = els.length; i < len; ++i) {
				var link = els[i],
				    src = link.href.split('\/').pop(),
				    el = link.previousSibling;
				if (!el || el.className !== 'de-vocaroo') {
					link.insertAdjacentHTML('beforebegin', '<div class="de-vocaroo"><embed' + ' width="148" height="44" wmode="transparent" type="application/x-shockwave-flash"' + ' src="http://vocaroo.com/player.swf?playMediaID=' + src + '"></div>');
				}
			}
		}
	}




	function ajaxLoad(url) {
		var returnForm = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
		var useCache = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

		var cData = ajaxLoad.cacheData.get(url);
		var ajaxURL = cData && !cData.hasCacheControl ? ajaxLoad.fixCachedURL(url) : url;
		return $ajax(ajaxURL, useCache && cData && cData.params).then(function (xhr) {
			var headers = 'getAllResponseHeaders' in xhr ? xhr.getAllResponseHeaders() : xhr.responseHeaders;
			var data = ajaxLoad.readCacheData(headers);
			if (!data.hasCacheControl && !ajaxLoad.cacheData.has(url)) {
				ajaxLoad.cacheData.set(url, data);
				return $ajax(ajaxLoad.fixCachedURL(url), useCache && data.params);
			}
			ajaxLoad.cacheData.set(url, data);
			return xhr;
		}).then(function (xhr) {
			var el,
			    text = xhr.responseText;
			if (text.includes('</html>')) {
				el = returnForm ? $q(aib.qDForm, $DOM(text)) : $DOM(text);
			}
			return el ? el : CancelablePromise.reject(new AjaxError(0, Lng.errCorruptData[lang]));
		}, function (err) {
			return err.code === 304 ? null : CancelablePromise.reject(err);
		});
	}
	ajaxLoad.cacheData = new Map();
	ajaxLoad.fixCachedURL = function (url) {
		return url + (url.includes('?') ? '&' : '?') + 'nocache=' + Math.random();
	};
	ajaxLoad.readCacheData = function (ajaxHeaders) {
		var ETag = null,
		    LastModified = null,
		    headers = null,
		    i = 0,
		    hasCacheControl = false;
		for (var _iterator3 = ajaxHeaders.split('\r\n'), _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
			var _ref10;

			if (_isArray3) {
				if (_i4 >= _iterator3.length) break;
				_ref10 = _iterator3[_i4++];
			} else {
				_i4 = _iterator3.next();
				if (_i4.done) break;
				_ref10 = _i4.value;
			}

			var header = _ref10;

			if (header.startsWith('Cache-Control: ')) {
				hasCacheControl = true;
				i++;
			} else if (header.startsWith('Last-Modified: ')) {
				LastModified = header.substr(15);
				i++;
			} else if (header.startsWith('Etag: ')) {
				ETag = header.substr(6);
				i++;
			}
			if (i === 3) {
				break;
			}
		}
		if (ETag || LastModified) {
			headers = {};
			if (ETag) {
				headers['If-None-Match'] = ETag;
			}
			if (LastModified) {
				headers['If-Modified-Since'] = LastModified;
			}
		}
		return { hasCacheControl: hasCacheControl, params: headers ? { headers: headers } : null };
	};

	function getJsonPosts(url) {
		return $ajax(url, { useCache: true }).then(function (xhr) {
			return JSON.parse(xhr.responseText);
		}, function (xhr) {
			return function (err) {
				return err.code === 304 ? null : CancelablePromise.reject(err);
			};
		});
	}

	function infoLoadErrors(e) {
		var showError = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		var isAjax = e instanceof AjaxError,
		    eCode = isAjax ? e.code : 0;
		if (eCode === 200) {
			closePopup('newposts');
		} else if (isAjax && eCode === 0) {
			$popup(e.message || Lng.noConnect[lang], 'newposts', false);
		} else {
			$popup(Lng.thrNotFound[lang] + aib.t + '): \n' + getErrorMessage(e), 'newposts', false);
			if (showError) {
				doc.title = '{' + eCode + '} ' + doc.title;
			}
		}
	}




	var Pages = {
		add: function add() {
			var _this11 = this;

			var pageNum = DelForm.last.pageNum + 1;
			if (this._adding || pageNum > aib.lastPage) {
				return;
			}
			this._adding = true;
			DelForm.last.el.insertAdjacentHTML('beforeend', '<div class="de-addpage-wait"><hr>' + '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' + Lng.loading[lang] + '</div>');
			spawn(readMyPosts);
			this._addPromise = ajaxLoad(aib.getPageUrl(aib.b, pageNum)).then(function (formEl) {
				var form = _this11._addForm(formEl, pageNum);
				if (!form.firstThr) {
					_this11._endAdding();
					_this11.add();
					return CancelablePromise.reject(new CancelError());
				}
				return spawn(_this11._updateForms, DelForm.last);
			}).then(function () {
				return _this11._endAdding();
			})['catch'](function (e) {
				if (!(e instanceof CancelError)) {
					$popup(getErrorMessage(e), 'add-page', false);
					_this11._endAdding();
				}
			});
		},

		load: async(regeneratorRuntime.mark(function _callee6(count) {
			var _iterator4, _isArray4, _i5, _ref11, form, len, i, el, first;

			return regeneratorRuntime.wrap(function _callee6$(_context14) {
				while (1) {
					switch (_context14.prev = _context14.next) {
						case 0:
							$popup(Lng.loading[lang], 'load-pages', true);
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
								if (pr.file) {
									pr.delFilesUtils();
								}
								pr.txta.value = '';
							}
							DelForm.tNums = new Set();
							_iterator4 = DelForm, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();

						case 11:
							if (!_isArray4) {
								_context14.next = 17;
								break;
							}

							if (!(_i5 >= _iterator4.length)) {
								_context14.next = 14;
								break;
							}

							return _context14.abrupt('break', 29);

						case 14:
							_ref11 = _iterator4[_i5++];
							_context14.next = 21;
							break;

						case 17:
							_i5 = _iterator4.next();

							if (!_i5.done) {
								_context14.next = 20;
								break;
							}

							return _context14.abrupt('break', 29);

						case 20:
							_ref11 = _i5.value;

						case 21:
							form = _ref11;

							$each($Q('a[href^="blob:"]', form.el), function (a) {
								return URL.revokeObjectURL(a.href);
							});
							$hide(form.el);

							if (!(form === DelForm.last)) {
								_context14.next = 26;
								break;
							}

							return _context14.abrupt('break', 29);

						case 26:
							$del(form.el);

						case 27:
							_context14.next = 11;
							break;

						case 29:
							DelForm.first = DelForm.last;
							len = Math.min(aib.lastPage + 1, aib.page + count);
							i = aib.page;

						case 32:
							if (!(i < len)) {
								_context14.next = 46;
								break;
							}

							_context14.prev = 33;
							_context14.next = 36;
							return ajaxLoad(aib.getPageUrl(aib.b, i));

						case 36:
							el = _context14.sent;

							this._addForm(el, i);
							_context14.next = 43;
							break;

						case 40:
							_context14.prev = 40;
							_context14.t0 = _context14['catch'](33);

							$popup(getErrorMessage(_context14.t0), 'load-pages', false);

						case 43:
							++i;
							_context14.next = 32;
							break;

						case 46:
							first = DelForm.first;

							if (!(first !== DelForm.last)) {
								_context14.next = 52;
								break;
							}

							DelForm.first = first.next;
							$del(first.el);
							return _context14.delegateYield(this._updateForms(DelForm.first), 't1', 51);

						case 51:
							closePopup('load-pages');

						case 52:
						case 'end':
							return _context14.stop();
					}
				}
			}, _callee6, this, [[33, 40]]);
		})),

		_adding: false,
		_addPromise: null,
		_addForm: function _addForm(formEl, pageNum) {
			formEl = doc.adoptNode(formEl);
			$hide(formEl = replacePost(formEl));
			$after(DelForm.last.el, formEl);
			var form = new DelForm(formEl, +pageNum, DelForm.last);
			DelForm.last = form;
			form.addStuff();
			if (pageNum != aib.page && form.firstThr) {
				formEl.insertAdjacentHTML('afterbegin', '\n\t\t\t<div class="de-page-num">\n\t\t\t\t<center style="font-size: 2em">' + Lng.page[lang] + ' ' + pageNum + '</center>\n\t\t\t\t<hr>\n\t\t\t</div>');
			}
			$show(formEl);
			return form;
		},
		_endAdding: function _endAdding() {
			$del($q('.de-addpage-wait'));
			this._adding = false;
			this._addPromise = null;
		},
		_updateForms: regeneratorRuntime.mark(function _updateForms(newForm) {
			return regeneratorRuntime.wrap(function _updateForms$(_context15) {
				while (1) {
					switch (_context15.prev = _context15.next) {
						case 0:
							return _context15.delegateYield(readPostsData(newForm.firstThr.op), 't0', 1);

						case 1:
							if (pr.passw) {
								PostForm.setUserPassw();
							}
							if (HotKeys.enabled) {
								HotKeys.clear();
							}

						case 3:
						case 'end':
							return _context15.stop();
					}
				}
			}, _updateForms, this);
		})
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
					for (var _iterator5 = reps, _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
						var _ref12;

						if (_isArray5) {
							if (_i6 >= _iterator5.length) break;
							_ref12 = _iterator5[_i6++];
						} else {
							_i6 = _iterator5.next();
							if (_i6.done) break;
							_ref12 = _i6.value;
						}

						var rep = _ref12;

						str += this._decompileRep(rep, false) + '\n';
					}
				}
				if (oreps) {
					for (var _iterator6 = oreps, _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
						var _ref13;

						if (_isArray6) {
							if (_i7 >= _iterator6.length) break;
							_ref13 = _iterator6[_i7++];
						} else {
							_i7 = _iterator6.next();
							if (_i7.done) break;
							_ref13 = _i7.value;
						}

						var orep = _ref13;

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
					saveCfg('hideBySpell', true);
					if (chk) {
						chk.checked = true;
					}
				} else if (!spells[1] && !spells[2] && !spells[3]) {
					saveCfg('hideBySpell', false);
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
			var wipeMsg = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

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

					var _ref14 = wipeMsg || [];

					var _ref15 = _slicedToArray(_ref14, 2);

					var msgBit = _ref15[0];
					var msgData = _ref15[1];
					var names = [];
					var bits = { 1: 'samelines', 2: 'samewords', 4: 'longwords', 8: 'symbols',
						16: 'capslock', 32: 'numbers', 64: 'whitespace'
					};
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
			saveCfg('hideBySpell', false);
		},
		outReplace: function outReplace(txt) {
			for (var _iterator7 = this.outreps, _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
				var _ref16;

				if (_isArray7) {
					if (_i8 >= _iterator7.length) break;
					_ref16 = _iterator7[_i8++];
				} else {
					_i8 = _iterator7.next();
					if (_i8.done) break;
					_ref16 = _i8.value;
				}

				var orep = _ref16;

				txt = txt.replace(orep[0], orep[1]);
			}
			return txt;
		},
		parseText: function parseText(text) {
			var codeGen = new SpellsCodegen(text),
			    data = codeGen.generate();
			if (codeGen.hasError) {
				$popup(Lng.error[lang] + ': ' + codeGen.error, 'err-spell', false);
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
			for (var _iterator8 = this.reps, _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
				var _ref17;

				if (_isArray8) {
					if (_i9 >= _iterator8.length) break;
					_ref17 = _iterator8[_i9++];
				} else {
					_i9 = _iterator8.next();
					if (_i9.done) break;
					_ref17 = _i9.value;
				}

				var orep = _ref17;

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
				saveCfg('spells', JSON.stringify(spells));
				fld.value = this.list;
			} else {
				if (!val) {
					closePopup('err-spell');
					SpellsRunner.unhideAll();
					this.disable();
					saveCfg('spells', JSON.stringify([Date.now(), null, null, null]));
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
				for (var _iterator9 = data, _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
					var _ref18;

					if (_isArray9) {
						if (_i10 >= _iterator9.length) break;
						_ref18 = _iterator9[_i10++];
					} else {
						_i10 = _iterator9.next();
						if (_i10.done) break;
						_ref18 = _i10.value;
					}

					var item = _ref18;

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
				for (var _iterator10 = data, _isArray10 = Array.isArray(_iterator10), _i11 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
					var _ref19;

					if (_isArray10) {
						if (_i11 >= _iterator10.length) break;
						_ref19 = _iterator10[_i11++];
					} else {
						_i11 = _iterator10.next();
						if (_i11.done) break;
						_ref19 = _i11.value;
					}

					var item = _ref19;

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
			for (var _iterator11 = data, _isArray11 = Array.isArray(_iterator11), _i12 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
				var _ref20;

				if (_isArray11) {
					if (_i12 >= _iterator11.length) break;
					_ref20 = _iterator11[_i12++];
				} else {
					_i12 = _iterator11.next();
					if (_i12.done) break;
					_ref20 = _i12.value;
				}

				var rep = _ref20;

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
			for (var i = 0, len = sp.length - 1; i < len; i++) {
			
				if (sp[i][0] === sp[i + 1][0] && sp[i][1] <= sp[i + 1][1] && sp[i][1] >= sp[i + 1][1] && (sp[i][2] === null ||
				sp[i][2] === undefined ||
				sp[i][2] <= sp[i + 1][2] && sp[i][2] >= sp[i + 1][2])) {
				
					sp.splice(i + 1, 1);
					i--;
					len--;
				
				} else if (sp[i][0] === 0xFF) {
						sp.push(sp.splice(i, 1)[0]);
						i--;
						len--;
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
							if (name === 'rep') {
								reps.push(res[1]);
							} else {
								outreps.push(res[1]);
							}
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
			if (haveComma !== !!m[2]) {
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

	var SpellsRunner = (function () {
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
				var _this12 = this;

				if (this._endPromise) {
					this._endPromise.then(function () {
						return _this12._savePostsHelper();
					});
				} else {
					this._savePostsHelper();
				}
			}
		}, {
			key: 'run',
			value: function run(post) {
				var _this13 = this;

				var interp = new SpellsInterpreter(post, this._spells);
				var res = interp.run();
				if (res instanceof Promise) {
					res = res.then(function (val) {
						return _this13._checkRes(post, val);
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
			value: function _checkRes(post, _ref21) {
				var _ref22 = _slicedToArray(_ref21, 3);

				var hasNumSpell = _ref22[0];
				var val = _ref22[1];
				var msg = _ref22[2];

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
					saveHiddenThreads(false);
					toggleWindow('hid', true);
				}
				ImagesHashStorage.endFn();
			}
		}]);

		return SpellsRunner;
	})();

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
						return val.then(this._asyncContinue.bind(this));
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

			var _checkRes4 = this._checkRes(spell, val, this._ctx[cl - 1]);

			var _checkRes5 = _slicedToArray(_checkRes4, 2);

			var rv = _checkRes5[0];
			var stopCheck = _checkRes5[1];

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
			for (var _iterator12 = this._triggeredSpellsStack, _isArray12 = Array.isArray(_iterator12), _i13 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
				var _ref23;

				if (_isArray12) {
					if (_i13 >= _iterator12.length) break;
					_ref23 = _iterator12[_i13++];
				} else {
					_i13 = _iterator12.next();
					if (_i13.done) break;
					_ref23 = _i13.value;
				}

				var spellEls = _ref23;

				for (var _iterator13 = spellEls, _isArray13 = Array.isArray(_iterator13), _i14 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
					var _ref24;

					if (_isArray13) {
						if (_i14 >= _iterator13.length) break;
						_ref24 = _iterator13[_i14++];
					} else {
						_i14 = _iterator13.next();
						if (_i14.done) break;
						_ref24 = _i14.value;
					}

					var _ref25 = _ref24;

					var _ref26 = _slicedToArray(_ref25, 3);

					var isNeg = _ref26[0];
					var spell = _ref26[1];
					var wipeMsg = _ref26[2];

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
			for (var _iterator14 = this._post.images, _isArray14 = Array.isArray(_iterator14), _i15 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
				var _ref27;

				if (_isArray14) {
					if (_i15 >= _iterator14.length) break;
					_ref27 = _iterator14[_i15++];
				} else {
					_i15 = _iterator14.next();
					if (_i15.done) break;
					_ref27 = _i15.value;
				}

				var image = _ref27;

				if (image instanceof Attachment && val.test(image.info)) {
					return true;
				}
			}
			return false;
		},

		_ihash: async(regeneratorRuntime.mark(function _callee7(val) {
			var _iterator15, _isArray15, _i16, _ref28, image, hash;

			return regeneratorRuntime.wrap(function _callee7$(_context16) {
				while (1) {
					switch (_context16.prev = _context16.next) {
						case 0:
							_iterator15 = this._post.images, _isArray15 = Array.isArray(_iterator15), _i16 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();

						case 1:
							if (!_isArray15) {
								_context16.next = 7;
								break;
							}

							if (!(_i16 >= _iterator15.length)) {
								_context16.next = 4;
								break;
							}

							return _context16.abrupt('break', 20);

						case 4:
							_ref28 = _iterator15[_i16++];
							_context16.next = 11;
							break;

						case 7:
							_i16 = _iterator15.next();

							if (!_i16.done) {
								_context16.next = 10;
								break;
							}

							return _context16.abrupt('break', 20);

						case 10:
							_ref28 = _i16.value;

						case 11:
							image = _ref28;

							if (image instanceof Attachment) {
								_context16.next = 14;
								break;
							}

							return _context16.abrupt('continue', 18);

						case 14:
							return _context16.delegateYield(ImagesHashStorage.getHash(image), 't0', 15);

						case 15:
							hash = _context16.t0;

							if (!(hash === val)) {
								_context16.next = 18;
								break;
							}

							return _context16.abrupt('return', true);

						case 18:
							_context16.next = 1;
							break;

						case 20:
							return _context16.abrupt('return', false);

						case 21:
						case 'end':
							return _context16.stop();
					}
				}
			}, _callee7, this);
		})),
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
			var hide;var images = this._post.images;

			var _val = _slicedToArray(val, 3);

			var compareRule = _val[0];
			var weightVals = _val[1];
			var sizeVals = _val[2];

			if (!val) {
				return images.hasAttachments;
			}
			for (var _iterator16 = images, _isArray16 = Array.isArray(_iterator16), _i17 = 0, _iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();;) {
				var _ref29;

				if (_isArray16) {
					if (_i17 >= _iterator16.length) break;
					_ref29 = _iterator16[_i17++];
				} else {
					_i17 = _iterator16.next();
					if (_i17.done) break;
					_ref29 = _i17.value;
				}

				var image = _ref29;

				if (!(image instanceof Attachment)) {
					continue;
				}
				if (weightVals) {
					var w = image.weight;
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
					var w = image.width,
					    h = image.height;
					switch (compareRule) {
						case 0:
							if (w >= sizeVals[0] && w <= sizeVals[1] && h >= sizeVals[2] && h <= sizeVals[3]) {
								return true;
							}
							break;
						case 1:
							if (w < sizeVals[0] && h < sizeVals[3]) {
								return true;
							}
							break;
						case 2:
							if (w > sizeVals[0] && h > sizeVals[3]) {
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
			var arr,
			    len,
			    x,
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
					for (var i = 0, n = len / 4, pop = 0; i < len; keys++) {
						x = arr[i];
						var j = 0;
						while (arr[i++] === x) {
							j++;
						}
						if (len > 25) {
							if (j > pop && x.length > 2) {
								pop = j;
							}
							if (pop >= n) {
								this._wipeMsg = [2, 'same "' + x.substr(0, 20) + '" x' + (pop + 1)];
								return true;
							}
						}
					}
					x = keys / len;
					if (x < .25) {
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
				if ((len = _txt.length) > 30 && (x = _txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length / len) > .4) {
					this._wipeMsg = [8, (x * 100).toFixed(0) + '%'];
					return true;
				}
			}
		
			if (val & 16) {
				arr = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
				if ((len = arr.length) > 4) {
					var n = 0,
					    capsw = 0,
					    casew = 0;
					for (var i = 0; i < len; i++) {
						x = arr[i];
						if ((x.match(/[a-zа-я]/ig) || []).length < 5) {
							continue;
						}
						if ((x.match(/[A-ZА-Я]/g) || []).length > 2) {
							casew++;
						}
						if (x === x.toUpperCase()) {
							capsw++;
						}
						n++;
					}
					if (capsw / n >= .3 && n > 4) {
						this._wipeMsg = [16, 'CAPS ' + capsw / arr.length * 100 + '%'];
						return true;
					} else if (casew / n >= .3 && n > 8) {
						this._wipeMsg = [16, 'cAsE ' + casew / arr.length * 100 + '%'];
						return true;
					}
				}
			}
		
			if (val & 32) {
				var _txt = txt.replace(/\s+/g, ' ').replace(/>>\d+|https*:\/\/.*?(?: |$)/g, '');
				if ((len = _txt.length) > 30 && (x = (len - _txt.replace(/\d/g, '').length) / len) > .4) {
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
			for (var _iterator17 = videos.vData, _isArray17 = Array.isArray(_iterator17), _i18 = 0, _iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();;) {
				var _ref30;

				if (_isArray17) {
					if (_i18 >= _iterator17.length) break;
					_ref30 = _iterator17[_i18++];
				} else {
					_i18 = _iterator17.next();
					if (_i18.done) break;
					_ref30 = _i18.value;
				}

				var siteData = _ref30;

				for (var _iterator18 = siteData, _isArray18 = Array.isArray(_iterator18), _i19 = 0, _iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();;) {
					var _ref31;

					if (_isArray18) {
						if (_i19 >= _iterator18.length) break;
						_ref31 = _iterator18[_i19++];
					} else {
						_i19 = _iterator18.next();
						if (_i19.done) break;
						_ref31 = _i19.value;
					}

					var data = _ref31;

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
		var _this14 = this;

		var oeForm = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var ignoreForm = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

		if (!ignoreForm && !form) {
			if (this.oeForm) {
				ajaxLoad(aib.getThrdUrl(aib.b, Thread.first.num), false).then(function (loadedDoc) {
					var form = $q(aib.qForm, loadedDoc),
					    oeForm = $q('form[name="oeform"], form[action*="paint"]', loadedDoc);
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
		this.file = $q('tr input[type="file"]', form);
		if (this.file) {
			this.fileTd = $parent(this.file, 'TD');
			this.spoil = $q('input[type="checkbox"][name="spoiler"]', this.fileTd);
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
		DelForm.first.el.insertAdjacentHTML('beforebegin', '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>');
		this.pArea[0] = DelForm.first.el.previousSibling;
		this._pBtn[0] = this.pArea[0].firstChild;
		this._pBtn[0].firstElementChild.onclick = this.showMainReply.bind(this, false);
		var el = aib.fch ? $q('.board', DelForm.first.el) : DelForm.first.el;
		el.insertAdjacentHTML('afterend', '<div class="de-parea"><div>[<a href="#"></a>]</div><hr></div>');
		this.pArea[1] = el.nextSibling;
		this._pBtn[1] = this.pArea[1].firstChild;
		this._pBtn[1].firstElementChild.onclick = this.showMainReply.bind(this, true);
		this.qArea = $add('<div style="display: none; ' + Cfg.replyWinX + '; ' + Cfg.replyWinY + '; z-index: ' + ++topWinZ + ';" id="de-win-reply" class="' + aib.cReply + (Cfg.replyWinDrag ? ' de-win' : ' de-win-inpost') + '"></div>');
		this.isBottom = Cfg.addPostForm === 1;
		this.setReply(false, !aib.t || Cfg.addPostForm > 1);
		el = this.qArea;
		el.insertAdjacentHTML('beforeend', '<div class="de-win-head">' + '<span class="de-win-title"></span>' + '<span class="de-win-buttons">' + '<svg class="de-btn-toggle"><use xlink:href="#de-symbol-win-arrow"/></svg>' + '<svg class="de-btn-close"><use xlink:href="#de-symbol-win-close"/></svg></span></div>' + '<div class="de-resizer de-resizer-top"></div>' + '<div class="de-resizer de-resizer-left"></div>' + '<div class="de-resizer de-resizer-right"></div>' + '<div class="de-resizer de-resizer-bottom"></div>');
		el = el.firstChild;
		el.lang = getThemeLang();
		makeDraggable(this.qArea, el, 'reply');
		el = el.lastChild;
		el.onmouseover = function (e) {
			switch (fixEventEl(e.target).classList[0]) {
				case 'de-btn-close':
					this.title = Lng.closeReply[lang];break;
				case 'de-btn-toggle':
					this.title = Cfg['replyWinDrag'] ? Lng.underPost[lang] : Lng.makeDrag[lang];
			}
		};
		el.firstChild.onclick = function () {
			toggleCfg('replyWinDrag');
			if (Cfg.replyWinDrag) {
				_this14.qArea.className = aib.cReply + ' de-win';
				updateWinZ(_this14.qArea.style);
			} else {
				_this14.qArea.className = aib.cReply + ' de-win-inpost';
				_this14.txta.focus();
			}
		};
		el.lastChild.onclick = this.closeReply.bind(this);
		if (!this.form || !this.txta) {
			return;
		}
		new WinResizer('reply', 'top', 'textaHeight', this.qArea, this.txta);
		new WinResizer('reply', 'left', 'textaWidth', this.qArea, this.txta);
		new WinResizer('reply', 'right', 'textaWidth', this.qArea, this.txta);
		new WinResizer('reply', 'bottom', 'textaHeight', this.qArea, this.txta);
		if (!aib.kus && (aib.multiFile || !Cfg.fileThumb)) {
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
			this.txta.insertAdjacentHTML('afterend', '<div id="de-resizer-text"></div>');
			this.txta.nextSibling.addEventListener('mousedown', {
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
			this.subm.insertAdjacentHTML('afterend', '<svg id="de-sagebtn" class="de-btn-sage">' + '<use xlink:href="#de-symbol-post-sage"/></svg>');
			this.subm.nextSibling.onclick = function (e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('sageReply');
				_this14._setSage();
			};
			setTimeout(function () {
				return _this14._setSage();
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
			if (Cfg.warnSubjTrip && _this14.subj && /#.|##./.test(_this14.subj.value)) {
				$pd(e);
				$popup(Lng.subjHasTrip[lang], 'upload', false);
				return;
			}
			var val = _this14.txta.value;
			if (Spells.outreps) {
				val = Spells.outReplace(val);
			}
			if (_this14.tNum && pByNum.get(_this14.tNum).subj === 'Dollchan Extension Tools') {
				var temp = '\n\n' + _this14._wrapText(aib.markupTags[5], '-'.repeat(50) + '\n' + nav.ua + '\nv' + version + '.' + commit + ' [' + nav.scriptInstall + ']')[1];
				if (!val.includes(temp)) {
					val += temp;
				}
			}
			_this14.txta.value = val;
			if (Cfg.ajaxReply) {
				$popup(Lng.checking[lang], 'upload', true);
			}
			if (_this14.video && (val = _this14.video.value) && (val = val.match(Videos.ytReg))) {
				_this14.video.value = 'http://www.youtube.com/watch?v=' + val[1];
			}
			if (_this14.isQuick) {
				$hide(_this14.pForm);
				$hide(_this14.qArea);
				$after(_this14._pBtn[+_this14.isBottom], _this14.pForm);
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
			if (Cfg.userName && _this14.name) {
				setTimeout(PostForm.setUserName, 1e3);
			}
			if (_this14.passw) {
				setTimeout(PostForm.setUserPassw, 1e3);
			}
		});
		var capEl = $q('input[type="text"][name*="aptcha"], *[id*="captcha"], *[class*="captcha"]', form);
		if (capEl) {
			this.cap = new Captcha(capEl, this.tNum);
			this.txta.addEventListener('focus', function () {
				_this14.cap.add();
				_this14.cap.updOutdated();
			});
			this.form.addEventListener('click', function () {
				return _this14.cap.add();
			}, true);
		} else {
			this.cap = null;
		}
		if (Cfg.ajaxReply && aib.qFormRedir && (el = $q(aib.qFormRedir, form))) {
			aib.disableRedirection(el);
		}
		if (Cfg.ajaxReply === 2) {
			this.form.onsubmit = function (e) {
				$pd(e);
				$popup(Lng.sendingPost[lang], 'upload', true);
				if (aib._2chruNet) {
					docBody.insertAdjacentHTML('beforeend', '<iframe class="ninja" id="csstest" src="/' + aib.b + '/csstest.foo"></iframe>');
					docBody.lastChild.onload = function (e) {
						$del(e.target);
						spawn(html5Submit, _this14.form, _this14.subm, true).then(function (dc) {
							return checkUpload(dc);
						}, function (e) {
							return $popup(getErrorMessage(e), 'upload', false);
						});
					};
					return;
				}
				spawn(html5Submit, _this14.form, _this14.subm, true).then(function (dc) {
					return checkUpload(dc);
				}, function (e) {
					return $popup(getErrorMessage(e), 'upload', false);
				});
			};
		} else if (Cfg.ajaxReply === 1) {
			this.form.target = 'de-iframe-pform';
			this.form.onsubmit = null;
		}
		el = this.file;
		if (el) {
			aib.fixFileInputs(el);
			this.eventFiles(true);
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
		for (var _iterator19 = DelForm, _isArray19 = Array.isArray(_iterator19), _i20 = 0, _iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();;) {
			var _ref32;

			if (_isArray19) {
				if (_i20 >= _iterator19.length) break;
				_ref32 = _iterator19[_i20++];
			} else {
				_i20 = _iterator19.next();
				if (_i20.done) break;
				_ref32 = _i20.value;
			}

			var form = _ref32;

			(form.passEl || {}).value = value;
		}
	};
	PostForm.prototype = {
		fileObj: null,
		filesCount: 0,
		isHidden: false,
		isQuick: false,
		isBottom: false,
		lastQuickPNum: -1,
		pForm: null,
		pArea: [],
		qArea: null,
		get fileArea() {
			var val;
			if (aib.multiFile) {
				val = $add('<tr><td></td><td><div id="de-file-area"></div></td></tr>');
				$after(this.fileTd.parentNode, val);
			} else {
				val = $q(aib.tiny ? 'th' : 'td', $parent(this.txta, 'TR'));
				val.innerHTML = '<div style="display: none;">' + val.innerHTML + '</div><div></div>';
				val = val.lastChild;
			}
			Object.defineProperty(this, 'fileArea', { value: val });
			return val;
		},
		get rarInput() {
			var val = docBody.appendChild($new('input', { 'type': 'file', 'style': 'display: none;' }, null));
			Object.defineProperty(this, 'rarInput', { value: val });
			return val;
		},
		addTextPanel: function addTextPanel() {
			var id,
			    val,
			    btns,
			    html = '',
			    tPanel = $id('de-txt-panel');
			if (!Cfg.addTextBtns || aib.fch && !this.spoil) {
				$del(tPanel);
				return;
			}
			if (!tPanel) {
				tPanel = $new('span', { 'id': 'de-txt-panel' }, { 'click': this, 'mouseover': this });
			}
			tPanel.style.cssFloat = Cfg.txtBtnsLoc ? 'none' : 'right';
			$after(Cfg.txtBtnsLoc ? $id('de-resizer-text') || this.txta : this.subm, tPanel);
			id = ['bold', 'italic', 'under', 'strike', 'spoil', 'code', 'sup', 'sub'], val = ['B', 'i', 'U', 'S', '%', 'C', 'v', '^'];
			btns = aib.markupTags;
			for (var i = 0, len = btns.length; i < len; ++i) {
				if (btns[i] === '') {
					continue;
				}
				html += '<span id="de-btn-' + id[i] + '" de-title="' + Lng.txtBtn[i][lang] + '" de-tag="' + btns[i] + '">' + (Cfg.addTextBtns === 2 ? (html === '' ? '[ ' : '') + '<a class="de-abtn" href="#">' + val[i] + '</a> / ' : Cfg.addTextBtns === 3 ? '<button type="button" style="font-weight: bold;">' + val[i] + '</button>' : '') + '</span>';
			}
			tPanel.innerHTML = html + ('<span id="de-btn-quote" de-title="' + Lng.txtBtn[8][lang] + '" de-tag="q">' + (Cfg.addTextBtns === 2 ? '<a class="de-abtn" href="#">&gt;</a> ]' : Cfg.addTextBtns === 3 ? '<button type="button" style="font-weight: bold;">&gt;</button>' : '') + '</span>');
		},
		delFilesUtils: function delFilesUtils() {
			for (var inp = this.fileObj; inp; inp = inp.next) {
				inp.delUtils();
			}
		},
		eventFiles: function eventFiles(clear) {
			var last = null,
			    els = $Q('input[type="file"]', this.fileTd);
			for (var i = 0, len = els.length; i < len; ++i) {
				var el = els[i],
				    inp = el.obj;
				if (inp) {
					inp.prev = last;
					if (last) {
						last.next = inp;
					}
					last = inp;
				} else {
					el.obj = last = new FileInput(this, el, last);
					last.init(false);
					if (clear && el.files && el.files.length) {
						last.clear();
					}
				}
			}
			this.fileObj = els[0].obj;
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
				return cr.bottom > 0 && cr.top < doc.documentElement.clientHeight;
			}
			return false;
		},
		get top() {
			return this.pForm.getBoundingClientRect().top;
		},
		showQuickReply: function showQuickReply(post, pNum, closeReply, isNumClick) {
			var temp,
			    isThr = aib.t,
			    qNum = post.tNum;
			if (!this.isQuick) {
				this.isQuick = true;
				this.setReply(true, false);
				$q('a', this._pBtn[+this.isBottom]).className = 'de-abtn de-parea-btn-' + (isThr ? 'reply' : 'thrd');
				if (!isThr && !aib.kus && !aib.dobr && !aib.mak) {
					if (this.oeForm) {
						$del($q('input[name="oek_parent"]', this.oeForm));
						this.oeForm.insertAdjacentHTML('afterbegin', '<input type="hidden" value="' + qNum + '" name="oek_parent"/>');
					}
					if (this.form) {
						$del($q('input[name="' + aib.thrid + '"]', this.form));
						this.form.insertAdjacentHTML('afterbegin', '<input type="hidden" id="de-thrid" value="' + qNum + '" name="' + aib.thrid + '"/>');
					}
				}
			} else if (closeReply && !quotetxt && post.wrap.nextElementSibling === this.qArea) {
				this.closeReply();
				return;
			}
			$after(post.wrap, this.qArea);
			if (this.qArea.classList.contains('de-win')) {
				updateWinZ(this.qArea.style);
			}
			if (!isThr) {
				this._toggleQuickReply(qNum);
			}
			if (!this.form) {
				return;
			}
			if (!isThr && this.tNum !== qNum) {
				this.tNum = qNum;
				this.refreshCapImg(false);
			}
			this.tNum = qNum;
			temp = this.txta.value;
			if (!Cfg.addOPLink && !isThr && post.isOp && !isNumClick) {
				this.txta.focus();
			} else {
				$txtInsert(this.txta, (isNumClick ? '>>' + pNum : (temp !== '' && temp.slice(-1) !== '\n' ? '\n' : '') + (this.lastQuickPNum === pNum && temp.includes('>>' + pNum) ? '' : '>>' + pNum + '\n')) + (quotetxt ? quotetxt.replace(/^\n|\n$/g, '').replace(/(^|\n)(.)/gm, '$1>' + (Cfg.spacedQuote ? ' ' : '') + '$2') + '\n' : ''));
			}
			temp = pByNum.get(pNum).thr.op.title.trim();
			if (temp.length > 27) {
				temp = temp.substr(0, 30) + '…';
			}
			$q('.de-win-title', this.qArea).textContent = temp || '#' + pNum;
			this.lastQuickPNum = pNum;
		},
		showMainReply: function showMainReply(isBottom, evt) {
			this.closeReply();
			if (!aib.t) {
				this.tNum = false;
				this.refreshCapImg(false);
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
					this._toggleQuickReply(0);
					$del($id('de-thrid'));
				}
				this.setReply(false, !aib.t || Cfg.addPostForm > 1);
			}
		},
		refreshCapImg: function refreshCapImg(isErr) {
			if (this.cap) {
				this.cap.update(isErr, isErr, this.tNum);
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
			    rep = aib.t ? 'reply' : 'thrd';
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
				$q('input[name="oek_parent"], input[name="replyto"]', this.oeForm).value = tNum;
			}
			if (this.form) {
				$q('#de-thrid, input[name*="thread"]', this.form).value = tNum;
			}
		},
		_setPlaceholder: function _setPlaceholder(val) {
			var el = val === 'cap' ? this.cap.textEl : this[val];
			if (el) {
				if (aib.multiFile || !Cfg.fileThumb) {
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

	function FileInput(form, el, prev) {
		this.el = el;
		this.place = el.parentNode;
		this.form = form;
		this.prev = prev;
		if (prev) {
			prev.next = this;
		}
	}
	FileInput.prototype = {
		empty: true,
		next: null,
		imgFile: null,
		thumb: null,
		clear: function clear() {
			var newEl,
			    form = this.form,
			    oldEl = this.el;
			oldEl.insertAdjacentHTML('afterend', oldEl.outerHTML);
			newEl = this.el.nextSibling;
			newEl.obj = this;
			newEl.addEventListener('change', this);
			newEl.addEventListener('dragleave', this);
			newEl.addEventListener('drop', this);
			if (form.file === oldEl) {
				form.file = newEl;
			}
			this.el = newEl;
			$del(oldEl);
			this.empty = true;
			this.hideInputs();
		},
		delUtils: function delUtils() {
			if (Cfg.fileThumb) {
				this.thumb.classList.add('de-file-off');
				if (this._mediaEl) {
					window.URL.revokeObjectURL(this._mediaEl.src);
					this._mediaEl.parentNode.title = Lng.clickToAdd[lang];
					$del(this._mediaEl);
					this._mediaEl = null;
				}
			}
			$del(this._delUtil);
			$del(this._spUtil);
			$del(this._rjUtil);
			this.imgFile = this._delUtil = this._spUtil = this._rjUtil = null;
			this._changeFilesCount(-1);
			this.clear();
		},
		updateUtils: function updateUtils() {
			this.init(true);
			if (this._delUtil) {
				$after(this._buttonsPlace, this._delUtil);
			}
			if (this._spUtil) {
				$after(this._buttonsPlace, this._spUtil);
			}
			if (this._rjUtil) {
				$after(this._buttonsPlace, this._rjUtil);
			}
		},
		handleEvent: function handleEvent(e) {
			var _this15 = this;

			switch (e.type) {
				case 'change':
					setTimeout(function () {
						return _this15._onFileChange();
					}, 20);return;
				case 'click':
					if (e.target === this._delUtil) {
						this.delUtils();
					} else if (e.target === this._spUtil) {
						this.form.spoil.checked = this._spUtil.checked;
						return;
					} else if (e.target === this._rjUtil) {
						this._addRarJpeg();
					} else if (e.target.className === 'de-file-img') {
						this.el.click();
					}
					e.stopPropagation();
					$pd(e);
					return;
				case 'dragover':
					this.thumb.classList.add('de-file-drag');
					$after(this.thumb, this.el);
					return;
				case 'dragleave':
				case 'drop':
					setTimeout(function () {
						_this15.thumb.classList.remove('de-file-drag');
						var el = _this15.place.firstChild;
						if (el) {
							$before(el, _this15.el);
						} else {
							_this15.place.appendChild(_this15.el);
						}
					}, 10);
					return;
				case 'mouseover':
					this.thumb.classList.add('de-file-hover');return;
				case 'mouseout':
					this.thumb.classList.remove('de-file-hover');
			}
		},
		hideInputs: function hideInputs() {
			var inp = this.next;
			while (inp && inp.empty) {
				inp = inp.next;
			}
			if (!inp) {
				inp = this;
				while (inp.prev && inp.prev.empty) {
					inp = inp.prev;
				}
				var hideThumbs = Cfg.fileThumb;
				while (inp = inp.next) {
					$hide(hideThumbs ? inp.thumb : inp._wrap);
				}
			}
		},
		init: function init(isUpdate) {
			var _this16 = this;

			if (Cfg.fileThumb) {
				setTimeout(function () {
					return $hide(_this16.form.fileTd.parentNode);
				}, 0);
				this.form.fileArea.insertAdjacentHTML('beforeend', '<div class="de-file de-file-off"><div class="de-file-img">' + '<div class="de-file-img" title="' + Lng.clickToAdd[lang] + '"></div></div></div>');
				this.thumb = this.form.fileArea.lastChild;
				this.thumb.addEventListener('mouseover', this);
				this.thumb.addEventListener('mouseout', this);
				this.thumb.addEventListener('click', this);
				this.thumb.addEventListener('dragover', this);
				this.el.addEventListener('dragleave', this);
				this.el.addEventListener('drop', this);
				if (isUpdate) {
					this._showPviewImage();
				} else if (this.prev) {
					$hide(this.thumb);
				}
			} else if (isUpdate) {
				$show(this._wrap);
				$show(this.form.fileTd.parentNode);
				if (this._mediaE) {
					window.URL.revokeObjectURL(this._mediaE.src);
				}
				$del(this.thumb);
				this.thumb = this._mediaEl = null;
			}
			if (!isUpdate) {
				this.el.classList.add('de-file-input');
				this.el.addEventListener('change', this);
			}
		},

		_mediaEl: null,
		_delUtil: null,
		_spUtil: null,
		_rjUtil: null,
		get _buttonsPlace() {
			return Cfg.fileThumb ? this.thumb.firstChild : this.el;
		},
		get _wrap() {
			return aib.multiFile ? this.el.parentNode : this.el;
		},
		_addRarJpeg: function _addRarJpeg() {
			var _this17 = this;

			var el = this.form.rarInput;
			el.onchange = function (e) {
				$del(_this17._rjUtil);
				_this17._buttonsPlace.insertAdjacentHTML('afterend', '<span><svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' + Lng.wait[lang] + '</span>');
				var myRjUtil = _this17._rjUtil = _this17._buttonsPlace.nextSibling,
				    file = e.target.files[0];
				readFile(file).then(function (_ref33) {
					var data = _ref33.data;

					if (_this17._rjUtil === myRjUtil) {
						myRjUtil.className = 'de-file-rarmsg de-file-utils';
						myRjUtil.title = _this17.el.files[0].name + ' + ' + file.name;
						myRjUtil.textContent = _this17.el.files[0].name.replace(/^.+\./, '') + ' + ' + file.name.replace(/^.+\./, '');
						_this17.imgFile = data;
					}
				});
			};
			el.click();
		},
		_changeFilesCount: function _changeFilesCount(val) {
			this.form.filesCount = Math.max(this.form.filesCount + val, 0);
			if (aib.dobr) {
				this.form.fileTd.firstElementChild.value = this.form.filesCount + 1;
			}
		},
		_onFileChange: function _onFileChange() {
			if (Cfg.fileThumb) {
				this._showPviewImage();
			} else {
				this.form.eventFiles(false);
			}
			if (this.empty) {
				this.empty = false;
				this._changeFilesCount(+1);
				$after(this._buttonsPlace, this._delUtil = $new('span', {
					'class': 'de-file-del de-file-utils',
					'title': Lng.removeFile[lang] }, {
					'click': this
				}));
				if (this.form.spoil) {
					$after(this._buttonsPlace, this._spUtil = $new('input', {
						'class': 'de-file-spoil de-file-utils',
						'type': 'checkbox',
						'title': Lng.spoilFile[lang] }, {
						'click': this
					}));
					this._spUtil.checked = this.form.spoil.checked;
				}
			} else if (this.imgFile) {
				this.imgFile = null;
			}
			if (this.next) {
				$show(Cfg.fileThumb ? this.next.thumb : this.next._wrap);
			}
			if (nav.Presto || aib.fch || !/^image\/(?:png|jpeg)$/.test(this.el.files[0].type)) {
				return;
			}
			if (this._rjUtil) {
				$del(this._rjUtil);
				this._rjUtil = null;
			}
			$after(this._buttonsPlace, this._rjUtil = $new('span', {
				'class': 'de-file-rar de-file-utils',
				'title': Lng.helpAddFile[lang] }, {
				'click': this
			}));
		},
		_showPviewImage: function _showPviewImage() {
			var _this18 = this;

			var files = this.el.files;
			if (!files || !files[0]) {
				return;
			}
			readFile(files[0]).then(function (_ref34) {
				var data = _ref34.data;

				_this18.form.eventFiles(false);
				if (_this18.empty) {
					return;
				}
				var file = _this18.el.files[0],
				    thumb = _this18.thumb;
				thumb.classList.remove('de-file-off');
				thumb = thumb.firstChild.firstChild;
				thumb.title = file.name + ', ' + (file.size / 1024).toFixed(2) + 'KB';
				thumb.insertAdjacentHTML('afterbegin', file.type === 'video/webm' ? '<video class="de-file-img" loop autoplay muted src=""></video>' : '<img class="de-file-img" src="">');
				_this18._mediaEl = thumb = thumb.firstChild;
				thumb.src = window.URL.createObjectURL(new Blob([data]));
				thumb = thumb.nextSibling;
				if (thumb) {
					window.URL.revokeObjectURL(thumb.src);
					$del(thumb);
				}
			});
		}
	};




	var Captcha = (function () {
		function Captcha(el, initNum) {
			_classCallCheck(this, Captcha);

			this.hasCaptcha = true;
			this.textEl = null;
			this.tNum = initNum;
			this.trEl = el.tagName === 'TR' ? el : $parent(el, 'TR');
			this._added = false;
			this._isOldRecap = !!$id('recaptcha_widget_div');
			this._isRecap = !!$q('[id*="recaptcha"]', this.trEl);
			this._lastUpdate = null;
			this._originHTML = this.trEl.innerHTML;
			$hide(this.trEl);
			if (this._isRecap) {
				docBody.insertAdjacentHTML('beforeend', '<div onclick="' + (this._isOldRecap ? 'Recaptcha.reload()' : 'grecaptcha.reset()') + '"></div>');
				this._recapUpdate = docBody.lastChild;
			} else {
				this.trEl.innerHTML = '';
			}
		}

		_createClass(Captcha, [{
			key: 'add',
			value: function add() {
				var _this19 = this;

				var focus = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
				var updateHTML = arguments.length <= 1 || arguments[1] === undefined ? !this._isRecap : arguments[1];

				if (this._added) {
					return;
				}
				this._added = true;
				if (updateHTML) {
					this.trEl.innerHTML = this._originHTML;
				}
				this.textEl = $q('input[type="text"][name*="aptcha"]:not([name="recaptcha_challenge_field"])', this.trEl);
				var initPromise = null;
				if (aib.initCaptcha) {
					initPromise = aib.initCaptcha(this);
				}
				if (initPromise) {
					initPromise.then(function () {
						return _this19.initCaptcha(focus, false);
					}, function (e) {
						if (e instanceof AjaxError) {
							_this19._setUpdateError(e);
						} else {
							_this19.hasCaptcha = false;
						}
					});
				} else if (this.hasCaptcha) {
					this.initCaptcha(focus, true);
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
						var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
						    en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
						var i,
						    code = e.charCode || e.keyCode,
						    chr = String.fromCharCode(code).toLowerCase();
						if (Cfg.captchaLang === 1) {
							if (code < 0x0410 || code > 0x04FF || (i = ru.indexOf(chr)) === -1) {
								return;
							}
							chr = en[i];
						} else {
							if (code < 0x0021 || code > 0x007A || (i = en.indexOf(chr)) === -1) {
								return;
							}
							chr = ru[i];
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
			key: 'initCaptcha',
			value: function initCaptcha(focus, updateImage) {
				if (!this.textEl) {
					$show(this.trEl);
					if (aib.updateCaptcha) {
						aib.updateCaptcha(this, false);
					}
					return;
				}
				this.initTextEl();
				var img;
				if (this._isRecap || !(img = $q('img', this.trEl))) {
					$show(this.trEl);
					return;
				}
				this.initImage(img);
				var a = img.parentNode;
				if (a.tagName === 'A') {
					$replace(a, img);
				}
				if (updateImage) {
					this.update(focus);
				} else {
					this._lastUpdate = Date.now();
				}
				$show(this.trEl);
			}
		}, {
			key: 'initImage',
			value: function initImage(img) {
				var _this20 = this;

				img.title = Lng.refresh[lang];
				img.alt = Lng.loading[lang];
				img.style.cssText = 'vertical-align: text-bottom; border: none; cursor: pointer;';
				img.onclick = function () {
					return _this20.update(true);
				};
			}
		}, {
			key: 'initTextEl',
			value: function initTextEl() {
				this.textEl.autocomplete = 'off';
				if (!aib.kus && (aib.multiFile || !Cfg.fileThumb)) {
					this.textEl.placeholder = Lng.cap[lang];
				}
				this.textEl.addEventListener('keypress', this);
				this.textEl.onkeypress = null;
				this.textEl.addEventListener('focus', this);
				this.textEl.onfocus = null;
			}
		}, {
			key: 'remove',
			value: function remove() {
				$hide(this.trEl);
				if (!this._isRecap) {
					this.trEl.innerHTML = '';
				} else if (!this._isOldRecap) {
					$replace($id('g-recaptcha'), '<div id="g-recaptcha"></div>');
				}
				this.hasCaptcha = true;
				this.textEl = null;
				this._added = false;
			}
		}, {
			key: 'renew',
			value: function renew() {
				this._added = false;
				this._originHTML = this.trEl.innerHTML;
				this.add(false, false);
			}
		}, {
			key: 'update',
			value: function update(focus) {
				var _this21 = this;

				var isErr = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
				var tNum = arguments.length <= 2 || arguments[2] === undefined ? this.tNum : arguments[2];

				if (tNum !== this.tNum) {
					this.remove();
				} else if (!this.hasCaptcha && !isErr) {
					return;
				}
				this.tNum = tNum;
				if (!this._added) {
					this.add();
					return;
				}
				this._lastUpdate = Date.now();
				if (aib.updateCaptcha) {
					var updatePromise = aib.updateCaptcha(this, isErr);
					if (updatePromise) {
						updatePromise.then(function () {
							return _this21._updateTextEl(focus);
						}, function (e) {
							return _this21._setUpdateError(e);
						});
						return;
					}
				} else {
					if (this._isRecap) {
						this._recapUpdate.click();
						return;
					}
					if (!this.textEl) {
						return;
					}
					var img = $q('img', this.trEl);
					if (img) {
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
				this._updateTextEl(focus);
			}
		}, {
			key: 'updOutdated',
			value: function updOutdated() {
				if (this._lastUpdate && Date.now() - this._lastUpdate > Cfg.capUpdTime * 1e3) {
					this.update(false);
				}
			}
		}, {
			key: '_setUpdateError',
			value: function _setUpdateError(e) {
				var _this22 = this;

				if (e) {
					this.trEl = e.toString();
					this._added = false;
					this.trEl.onclick = function () {
						_this22.trEl.onclick = null;
						_this22.add();
					};
					$show(this.trEl);
				}
			}
		}, {
			key: '_updateTextEl',
			value: function _updateTextEl(focus) {
				if (this.textEl) {
					this.textEl.value = '';
					if (focus) {
						this.textEl.focus();
					}
				}
			}
		}]);

		return Captcha;
	})();




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
		return (/successful|uploaded|updating|обновл|удален[о\.]/i.test(err) ? null : err
		);
	}

	function getUploadFunc() {
		$popup(Lng.sendingPost[lang] + '<br><progress id="de-uploadprogress" value="0" max="1" style="display: none; width: 200px;">' + '</progress><div style="display: none; font: bold 12px arial;">' + '<span></span> / <span></span> (<span></span>)</div>', 'upload', true);
		var beginTime = Date.now(),
		    inited = false,
		    progress = $id('de-uploadprogress'),
		    counterWrap = progress.nextElementSibling,
		    counterEl = counterWrap.firstElementChild,
		    totalEl = counterEl.nextElementSibling,
		    speedEl = totalEl.nextElementSibling;
		return function (data) {
			if (!inited) {
				var total = data.total;
				progress.setAttribute('max', total);
				$show(progress);
				totalEl.textContent = prettifySize(total);
				$show(counterWrap);
				inited = true;
			}
			var loaded = data.loaded;
			progress.value = loaded;
			counterEl.textContent = prettifySize(loaded);
			speedEl.textContent = prettifySize(loaded / (Date.now() - beginTime) * 1e3) + '/' + Lng.second[lang];
		};
	}

	function checkUpload(data) {
		var error = null,
		    postNum = null,
		    isDocument = data instanceof HTMLDocument;
		if (aib.getSubmitData) {
			if (aib.jsonSubmit) {
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
			if (/captch|капч|подтвер|verifi/i.test(error)) {
				pr.refreshCapImg(true);
			}
			$popup(error, 'upload', false);
			updater.sendErrNotif();
			updater['continue']();
			return;
		}
		spawn(addMyPost, postNum);
		if (Cfg.favOnReply && pr.tNum && !$q('.de-btn-fav-sel', pByNum.get(pr.tNum).el)) {
			pByNum.get(pr.tNum).thr.setFavorState(true, 'onreply');
		}
		pr.txta.value = '';
		if (pr.file) {
			pr.delFilesUtils();
		}
		if (pr.video) {
			pr.video.value = '';
		}
		Cfg.stats[pr.tNum ? 'reply' : 'op']++;
		saveComCfg(aib.dm, Cfg);
		if (!pr.tNum) {
			if (postNum) {
				window.location = aib.getThrdUrl(aib.b, postNum);
			} else if (isDocument) {
				window.location = aib.getThrdUrl(aib.b, aib.getTNum($q(aib.qDForm, data)));
			}
			return;
		}
		var el = isDocument && !aib.kus && (aib.qFormRedir === null || $q(aib.qFormRedir, data)) ? $q(aib.qDForm, data) : null;
		if (aib.t) {
			Post.clearMarks();
			if (el) {
				Thread.first.loadNewFromForm(el);
				if (Cfg.scrAfterRep) {
					scrollTo(0, window.pageYOffset + Thread.first.last.el.getBoundingClientRect().top);
				}
				updater['continue'](true);
				closePopup('upload');
			} else {
				Thread.first.loadNew(true).then(function () {
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
			}
		} else {
			if (el) {
				pByNum.get(pr.tNum).thr.loadFromForm(visPosts, true, el);
				closePopup('upload');
			} else {
				pByNum.get(pr.tNum).thr.load(visPosts, false, false).then(function () {
					return closePopup('upload');
				});
			}
		}
		pr.closeReply();
		pr.refreshCapImg(false);
		pr.filesCount = 0;
	}

	var checkDelete = async(regeneratorRuntime.mark(function _callee8(data) {
		var err, _ref35, _ref36, num, post, els, threads, isThr, i, len, el, _iterator20, _isArray20, _i21, _ref37, thr;

		return regeneratorRuntime.wrap(function _callee8$(_context17) {
			while (1) {
				switch (_context17.prev = _context17.next) {
					case 0:
						err = getSubmitError(data instanceof HTMLDocument ? data : $DOM(data));

						if (!err) {
							_context17.next = 5;
							break;
						}

						$popup(Lng.errDelete[lang] + err, 'delete', false);
						updater.sendErrNotif();
						return _context17.abrupt('return');

					case 5:
						_ref35 = doc.location.hash.match(/\d+/) || [];
						_ref36 = _slicedToArray(_ref35, 1);
						num = _ref36[0];

						if (num) {
							post = pByNum.get(+num);

							if (post) {
								if (!post.isOp) {
									post.el.className = aib.cReply;
								}
								doc.location.hash = '';
							}
						}
						els = $Q('[de-form] ' + aib.qRPost + ' input:checked'), threads = new Set(), isThr = aib.t;

						for (i = 0, len = els.length; i < len; ++i) {
							el = els[i];

							el.checked = false;
							if (!isThr) {
								threads.add(aib.getPostOfEl(el).thr);
							}
						}

						if (!isThr) {
							_context17.next = 23;
							break;
						}

						Post.clearMarks();
						_context17.prev = 13;
						_context17.next = 16;
						return Thread.first.loadNew(false);

					case 16:
						_context17.next = 21;
						break;

					case 18:
						_context17.prev = 18;
						_context17.t0 = _context17['catch'](13);

						infoLoadErrors(_context17.t0);

					case 21:
						_context17.next = 39;
						break;

					case 23:
						_iterator20 = threads, _isArray20 = Array.isArray(_iterator20), _i21 = 0, _iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();

					case 24:
						if (!_isArray20) {
							_context17.next = 30;
							break;
						}

						if (!(_i21 >= _iterator20.length)) {
							_context17.next = 27;
							break;
						}

						return _context17.abrupt('break', 39);

					case 27:
						_ref37 = _iterator20[_i21++];
						_context17.next = 34;
						break;

					case 30:
						_i21 = _iterator20.next();

						if (!_i21.done) {
							_context17.next = 33;
							break;
						}

						return _context17.abrupt('break', 39);

					case 33:
						_ref37 = _i21.value;

					case 34:
						thr = _ref37;
						_context17.next = 37;
						return thr.load(visPosts, false, false);

					case 37:
						_context17.next = 24;
						break;

					case 39:
						$popup(Lng.succDeleted[lang], 'delete', false);

					case 40:
					case 'end':
						return _context17.stop();
				}
			}
		}, _callee8, this, [[13, 18]]);
	}));

	function html5Submit(form, submitter) {
		var needProgress = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

		var formData, hasFiles, _iterator21, _isArray21, _i22, _ref38, _ref39, name, value, type, el, fileName, newFileName, data, ajaxParams, xhr;

		return regeneratorRuntime.wrap(function html5Submit$(_context18) {
			while (1) switch (_context18.prev = _context18.next) {
				case 0:
					formData = new FormData();
					hasFiles = false;
					_iterator21 = getFormElements(form, submitter), _isArray21 = Array.isArray(_iterator21), _i22 = 0, _iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();

				case 3:
					if (!_isArray21) {
						_context18.next = 9;
						break;
					}

					if (!(_i22 >= _iterator21.length)) {
						_context18.next = 6;
						break;
					}

					return _context18.abrupt('break', 36);

				case 6:
					_ref38 = _iterator21[_i22++];
					_context18.next = 13;
					break;

				case 9:
					_i22 = _iterator21.next();

					if (!_i22.done) {
						_context18.next = 12;
						break;
					}

					return _context18.abrupt('break', 36);

				case 12:
					_ref38 = _i22.value;

				case 13:
					_ref39 = _ref38;
					name = _ref39.name;
					value = _ref39.value;
					type = _ref39.type;
					el = _ref39.el;

					if (!(type === 'file')) {
						_context18.next = 33;
						break;
					}

					hasFiles = true;
					fileName = value.name, newFileName = Cfg.removeFName ? ' ' + fileName.substring(fileName.lastIndexOf('.')) : fileName;

					if (!(/^image\/(?:png|jpeg)$|^video\/webm$/.test(value.type) && (Cfg.postSameImg || Cfg.removeEXIF))) {
						_context18.next = 32;
						break;
					}

					_context18.next = 24;
					return readFile(value);

				case 24:
					_context18.t0 = _context18.sent.data;
					_context18.t1 = el.obj.imgFile;
					data = cleanFile(_context18.t0, _context18.t1);

					if (data) {
						_context18.next = 29;
						break;
					}

					return _context18.abrupt('return', Promise.reject(Lng.fileCorrupt[lang] + fileName));

				case 29:
					value = new File(data, newFileName);
					_context18.next = 33;
					break;

				case 32:
					if (Cfg.removeFName) {
						value = new File([value], newFileName);
					}

				case 33:
					formData.append(name, value);

				case 34:
					_context18.next = 3;
					break;

				case 36:
					ajaxParams = { method: 'POST', data: formData };

					if (needProgress && hasFiles) {
						ajaxParams.onprogress = getUploadFunc();
					}
					_context18.prev = 38;
					_context18.next = 41;
					return $ajax(form.action, ajaxParams);

				case 41:
					xhr = _context18.sent;
					return _context18.abrupt('return', aib.jsonSubmit ? xhr.responseText : $DOM(xhr.responseText));

				case 45:
					_context18.prev = 45;
					_context18.t2 = _context18['catch'](38);
					return _context18.abrupt('return', Promise.reject(_context18.t2));

				case 48:
				case 'end':
					return _context18.stop();
			}
		}, _marked[8], this, [[38, 45]]);
	}

	function readFile(file) {
		var asText = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		return new Promise(function (resolve, reject) {
			var fr = new FileReader();
		
			fr.onload = function (e) {
				return resolve({ data: e.target.result });
			};
			if (asText) {
				fr.readAsText(file);
			} else {
				fr.readAsArrayBuffer(file);
			}
		});
	}

	function cleanFile(data, extraData) {
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
								jpgDat = img.subarray(i + 11, i + 16);
							}
						}
						if (img[i + 1] >> 4 === 0xE && img[i + 1] !== 0xEE || img[i + 1] === 0xFE) {
							if (lIdx !== i) {
								val.push(img.subarray(lIdx, i));
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
			val.push(img.subarray(lIdx, i));
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
			    clz = Math.clz32(num);
			if (clz > 3) {
				this.error = true;
				return;
			}
			offset += clz + 1;
			if (offset + 4 >= dataLength) {
				this.error = true;
				return;
			}
			var id = num >>> 8 * (3 - clz),
			    headSize = clz + 1;
			num = elData.getUint32(offset);
			clz = Math.clz32(num);
			if (clz > 3) {
				if ((num & 0xFFFFFFFF >>> clz + 1) !== 0) {
					this.error = true;
					return;
				}
				if (offset + 8 >= dataLength) {
					this.error = true;
					return;
				}
				headSize += 4;
				offset += 4;
				num = elData.getUint32(offset);
				clz -= 4;
			}
			var size = num >>> 8 * (3 - clz);
			headSize += clz + 1;
			offset += clz + 1;
			if (offset + size > dataLength) {
				this.error = true;
				return;
			}
			this.data = elData;
			this.offset = offset;
			this.endOffset = offset + size;
			this.id = id;
			this.headSize = headSize;
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




	function genImgHash(data) {
		var buf = new Uint8Array(data[0]),
		    oldw = data[1],
		    oldh = data[2],
		    size = oldw * oldh;
		for (var i = 0, j = 0; i < size; i++, j += 4) {
			buf[i] = buf[j] * .3 + buf[j + 1] * .59 + buf[j + 2] * .11;
		}
		var newh = 8,
		    neww = 8,
		    levels = 3,
		    areas = 256 / levels,
		    values = 256 / (levels - 1),
		    hash = 0;
		for (var i = 0; i < newh; i++) {
			for (var j = 0; j < neww; j++) {
				var tmp = i / (newh - 1) * (oldh - 1),
				    l = Math.min(tmp | 0, oldh - 2),
				    u = tmp - l;
				tmp = j / (neww - 1) * (oldw - 1);
				var c = Math.min(tmp | 0, oldw - 2),
				    t = tmp - c;
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
	function ImgBtnsShowHider(nextFn, prevFn) {
		docBody.insertAdjacentHTML('beforeend', '<div style="display: none;">' + '<div id="de-img-btn-next" de-title="' + Lng.nextImg[lang] + '"></div>' + '<div id="de-img-btn-prev" de-title="' + Lng.prevImg[lang] + '"></div></div>');
		var btns = docBody.lastChild;
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
			var _this23 = this;

			clearTimeout(this._hideTmt);
			this._hideTmt = setTimeout(function () {
				return _this23.hide();
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
					if (this.data.isVideo && this.data.isControlClick(e)) {
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
			do {
				data = data.getFollow(isForward);
			} while (data && !data.isVideo && !data.isImage);
			if (data) {
				this.update(data, true, null);
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
			var val = new ImgBtnsShowHider(this.navigate.bind(this, true), this.navigate.bind(this, false));
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
			var _this24 = this;

			var _data$computeFullSize = data.computeFullSize();

			var _data$computeFullSize2 = _slicedToArray(_data$computeFullSize, 3);

			var width = _data$computeFullSize2[0];
			var height = _data$computeFullSize2[1];
			var minSize = _data$computeFullSize2[2];

			this._fullEl = data.getFullObject(false, function (el) {
				return _this24._resize(el);
			});
			this._width = width;
			this._height = height;
			this._minSize = minSize ? minSize / this._zoomFactor : Cfg.minImgSize;
			this._oldL = (Post.sizing.wWidth - width) / 2 - 1;
			this._oldT = (Post.sizing.wHeight - height) / 2 - 1;
			var obj = $add('<div class="de-img-center" style="top:' + this._oldT + 'px; left:' + this._oldL + 'px; width:' + width + 'px; height:' + height + 'px; display: block"></div>');
			if (data.isImage) {
				obj.insertAdjacentHTML('afterbegin', '<a style="width: inherit; height: inherit;" href="' + data.src + '"></a>');
				obj.firstChild.appendChild(this._fullEl);
			} else {
				obj.appendChild(this._fullEl);
			}
			this._elStyle = obj.style;
			this.data = data;
			this._obj = obj;
			obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', this, true);
			obj.addEventListener('mousedown', this, true);
			obj.addEventListener('click', this, true);
			if (data.inPview && !data.post.sticky) {
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
			if (this.data.isVideo && this._fullEl.tagName === 'VIDEO') {
				this._fullEl.pause();
				this._fullEl.removeAttribute('src');
			}
			if (this.data.inPview && this.data.post.sticky) {
				this.data.post.setSticky(false);
			}
			$del(this._obj);
			if (e && this.data.inPview) {
				this.data.sendCloseEvent(e, false);
			}
		},
		_resize: function _resize(el) {
			if (el !== this._fullEl) {
				return;
			}

			var _data$computeFullSize3 = this.data.computeFullSize();

			var _data$computeFullSize4 = _slicedToArray(_data$computeFullSize3, 3);

			var width = _data$computeFullSize4[0];
			var height = _data$computeFullSize4[1];
			var minSize = _data$computeFullSize4[2];

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
		}
	};

	var ExpandableMedia = (function () {
		function ExpandableMedia(post, el, prev) {
			_classCallCheck(this, ExpandableMedia);

			this.post = post;
			this.el = el;
			this.prev = prev;
			this.next = null;
			this.expanded = false;
			this._fullEl = null;
			if (prev) {
				prev.next = this;
			}
		}

		_createClass(ExpandableMedia, [{
			key: 'collapse',
			value: function collapse(e) {
				if (!this.isVideo || !this.isControlClick(e)) {
					$pd(e);
					this.expanded = false;
					$del(this._fullEl);
					this._fullEl = null;
					$show(this.el.parentNode);
					$del((aib.hasPicWrap ? this._getImageParent() : this.el.parentNode).nextSibling);
					if (e && this.inPview) {
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
				var minSize = Cfg.minImgSize,
				    width = this._size[0],
				    height = this._size[1];
				if (Cfg.resizeDPI) {
					width /= Post.sizing.dPxRatio;
					height /= Post.sizing.dPxRatio;
				}
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
					var maxWidth = Post.sizing.wWidth - 2,
					    maxHeight = Post.sizing.wHeight - 2;
					if (width > maxWidth || height > maxHeight) {
						var ar = width / height;
						if (ar > maxWidth / maxHeight) {
							width = maxWidth;
							height = width / ar;
						} else {
							height = maxHeight;
							width = height * ar;
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
				var _this25 = this;

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
				this._fullEl = this.getFullObject(true, null);
				this._fullEl.addEventListener('click', function (e) {
					return _this25.collapse(e);
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
			value: function getFullObject(inPost, onsizechange) {
				var _this26 = this;

				var obj,
				    src = this.src,
				    size = this._size;
				if (this.isVideo) {
				
					if (aib.tiny) {
						src = src.replace(/^.*?\?v=|&.*?$/g, '');
					}
					if (nav.canPlayWebm) {
						obj = $add('<video style="width: inherit; height: inherit" src="' + src + '" loop autoplay ' + (Cfg.webmControl ? 'controls ' : '') + (Cfg.webmVolume === 0 ? 'muted ' : '') + '></video>');
						obj.volume = Cfg.webmVolume / 100;
						setTimeout(function () {
							return obj.dispatchEvent(new CustomEvent('volumechange'));
						}, 150);
						obj.addEventListener('error', function () {
							if (!this.onceLoaded) {
								this.load();
								this.onceLoaded = true;
							}
						});
						obj.addEventListener('volumechange', function (e) {
							var val = this.muted ? 0 : Math.round(this.volume * 100);
							if (e.isTrusted && val !== Cfg.webmVolume) {
								saveCfg('webmVolume', val);
								locStorage['__de-webmvolume'] = val;
								locStorage.removeItem('__de-webmvolume');
							}
						});
					} else {
						obj = $add('<object style="width: inherit; height: inherit" data="' + src + '" type="application/x-vlc-plugin">' + '<param name="pluginspage" value="http://www.videolan.org/vlc/"/>' + '<param name="controls" value="' + (Cfg.webmControl ? 'true' : 'false') + '"/>' + '<param name="loop" value="true"/>' + '<param name="autoplay" value="true"/>' + '<param name="wmode" value="transparent"/></object>');
					}
				} else {
					var html = '<div class="de-img-wrapper' + (inPost ? ' de-img-wrapper-inpost' : size ? '' : ' de-img-wrapper-nosize') + '">';
					if (!inPost && !size) {
						html += '<svg class="de-img-load"><use xlink:href="#de-symbol-wait"/></svg>';
					}
					html += '<img class="de-img-full" src="' + src + '" alt="' + src + '"></div>';
					obj = $add(html);
					var img = obj.lastChild;
					img.onload = img.onerror = function (_ref40) {
						var target = _ref40.target;

						if (target.naturalHeight + target.naturalWidth === 0) {
							if (!target.onceLoaded) {
								target.src = target.src;
								target.onceLoaded = true;
							}
						} else {
							_this26._size = [target.naturalWidth, target.naturalHeight];
							var el = target.previousElementSibling;
							if (el) {
								var p = el.parentNode;
								$hide(el);
								p.classList.remove('de-img-wrapper-nosize');
								onsizechange && onsizechange(p);
							}
						}
					};
				}
				return obj;
			}
		}, {
			key: 'isControlClick',
			value: function isControlClick(e) {
				return Cfg.webmControl && e.clientY > e.target.getBoundingClientRect().bottom - 30;
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
				var val = /\.webm(?:&|$)/i.test(this.src) || this.src.startsWith('blob:') && this.el.hasAttribute('de-video');
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
	})();

	var EmbeddedImage = (function (_ExpandableMedia) {
		_inherits(EmbeddedImage, _ExpandableMedia);

		function EmbeddedImage() {
			_classCallCheck(this, EmbeddedImage);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(EmbeddedImage).apply(this, arguments));
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
	})(ExpandableMedia);

	var Attachment = (function (_ExpandableMedia2) {
		_inherits(Attachment, _ExpandableMedia2);

		function Attachment() {
			_classCallCheck(this, Attachment);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Attachment).apply(this, arguments));
		}

		_createClass(Attachment, [{
			key: '_getImageParent',
			value: function _getImageParent() {
				return aib.getImgParent(this.el.parentNode);
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
				return aib.getImgLink(this.el).href;
			}
		}, {
			key: 'info',
			get: function get() {
				var val = aib.getFileInfo(aib.getImgWrap(this.el.parentNode));
				Object.defineProperty(this, 'info', { value: val });
				return val;
			}
		}, {
			key: 'weight',
			get: function get() {
				var val = 0;
				if (this.info) {
					var w = this.info.match(/(\d+(?:[\.,]\d+)?)\s*([mkк])?i?[bб]/i);
					val = w[2] === 'M' ? w[1] * 1e3 | 0 : !w[2] ? Math.round(w[1] / 1e3) : w[1];
				}
				Object.defineProperty(this, 'weight', { value: val });
				return val;
			}
		}]);

		return Attachment;
	})(ExpandableMedia);

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

		_getHashHelper: regeneratorRuntime.mark(function _getHashHelper(imgObj) {
			var _this29 = this;

			var el, src, data, buffer, val, w, h, imgData, cnv, ctx;
			return regeneratorRuntime.wrap(function _getHashHelper$(_context19) {
				while (1) {
					switch (_context19.prev = _context19.next) {
						case 0:
							el = imgObj.el, src = imgObj.src;

							if (!(src in this._storage)) {
								_context19.next = 3;
								break;
							}

							return _context19.abrupt('return', this._storage[src]);

						case 3:
							if (el.complete) {
								_context19.next = 6;
								break;
							}

							_context19.next = 6;
							return new Promise(function (resolve) {
								return el.addEventListener('load', function () {
									return resolve();
								});
							});

						case 6:
							if (!(el.naturalWidth + el.naturalHeight === 0)) {
								_context19.next = 8;
								break;
							}

							return _context19.abrupt('return', -1);

						case 8:
							val = -1, w = el.naturalWidth, h = el.naturalHeight;

							if (!aib.fch) {
								_context19.next = 16;
								break;
							}

							_context19.next = 12;
							return downloadImgData(el.src);

						case 12:
							imgData = _context19.sent;

							if (imgData) {
								buffer = imgData.buffer;
							}
							_context19.next = 22;
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
								_context19.next = 27;
								break;
							}

							_context19.next = 25;
							return new Promise(function (resolve) {
								return _this29._workers.run([buffer, w, h], [buffer], function (val) {
									return resolve(val);
								});
							});

						case 25:
							data = _context19.sent;

							if (data && 'hash' in data) {
								val = data.hash;
							}

						case 27:
							this._storage[src] = val;
							return _context19.abrupt('return', val);

						case 29:
						case 'end':
							return _context19.stop();
					}
				}
			}, _getHashHelper, this);
		}),

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

	function processImageNames(el) {
		var addSrc = Cfg.imgSrcBtns,
		    delNames = Cfg.delImgNames;
		if (!addSrc && !delNames) {
			return;
		}
		for (var i = 0, els = $Q(aib.qImgName, el), len = els.length; i < len; i++) {
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
				link.textContent = link.textContent.split('.').slice(-1)[0];
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




	var AbstractPost = (function () {
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
				var _this30 = this;

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
									this._getFull(temp, false);
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
										$txtInsert(pr.txta, '>>' + this.num);
									} else {
										window.location = el.href.replace(/#i/, '#');
									}
								} else if ((temp = el.textContent)[0] === '>' && temp[1] === '>' && !temp[2].includes('\/')) {
									var num = temp.match(/\d+/),
									    post = pByNum.get(+num);
									if (!post) {
										return;
									}
									post.selectCurrent();
									post.el.scrollIntoView(true);
									window.location.href = aib.anchor + num;
									$pd(e);
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
						this._getFull(el, false);
						$pd(e);
						e.stopPropagation();
					}
					switch (el.classList[0]) {
						case 'de-btn-expthr':
							this.thr.load('all', false);
							return;
						case 'de-btn-fav':
							this.thr.setFavorState(true, 'user');return;
						case 'de-btn-fav-sel':
							this.thr.setFavorState(false, 'user');return;
						case 'de-btn-hide':
						case 'de-btn-hide-user':
						case 'de-btn-unhide':
						case 'de-btn-unhide-user':
							this.toggleUserVisib();
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
						this.btns.title = Lng.expandThrd[lang];
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
								if (this.kid) {
									this.kid.markToDel();
								} else if (!(this instanceof Pview) && Pview.top) {
									Pview.top.markToDel();
								}
							} else {
								this._linkDelay = setTimeout(function () {
									return _this30.kid = Pview.show(_this30, el);
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
				var _this31 = this;

				if (this.menu && this.menu.parentEl === el) {
					return;
				}
				if (isOutEvent) {
					clearTimeout(this._menuDelay);
				} else {
					this._menuDelay = setTimeout(function () {
						return _this31._showMenu(el, html);
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
			key: '_getFull',
			value: function _getFull(node, isInit) {
				var _this32 = this;

				if (aib.dobr) {
					$del(node.nextSibling);
					$del(node.previousSibling);
					$del(node);
					if (isInit) {
						$replace(this.msg.firstElementChild, $q('.alternate > div', this.el));
					} else {
						var sRunner = new SpellsRunner();
						this.updateMsg($q('.alternate > div', this.el), sRunner);
						sRunner.end();
					}
					return;
				}
				if (aib.mak) {
					$del(node.previousSibling);
					$show(node.previousSibling);
					$del(node);
					return;
				}
				if (!isInit) {
					$popup(Lng.loading[lang], 'load-fullmsg', true);
				}
				ajaxLoad(aib.getThrdUrl(aib.b, this.tNum)).then(function (form) {
					var maybeSpells = new Maybe(SpellsRunner);
					if (_this32.isOp) {
						_this32.updateMsg(replacePost(doc.adoptNode($q(aib.qPostMsg, form))), maybeSpells.value);
						$del(node);
					} else {
						var els = $Q(aib.qRPost, form);
						for (var i = 0, len = els.length; i < len; i++) {
							if (_this32.num === aib.getPNum(els[i])) {
								_this32.updateMsg(replacePost(doc.adoptNode($q(aib.qPostMsg, els[i]))), maybeSpells.value);
								$del(node);
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
				    p = (link.getAttribute('de-href') || link.href) + '" target="_blank">' + Lng.search[lang];
				return '<a class="de-menu-item de-src-google" href="http://google.com/searchbyimage?image_url=' + p + 'Google</a>' + '<a class="de-menu-item de-src-yandex" href="http://yandex.ru/images/search?rpt=imageview&img_url=' + p + 'Yandex</a>' + '<a class="de-menu-item de-src-tineye" href="http://tineye.com/search/?url=' + p + 'TinEye</a>' + '<a class="de-menu-item de-src-saucenao" href="http://saucenao.com/search.php?url=' + p + 'SauceNAO</a>' + '<a class="de-menu-item de-src-iqdb" href="http://iqdb.org/?url=' + p + 'IQDB</a>';
			}
		}, {
			key: '_showMenu',
			value: function _showMenu(el, html) {
				var _this33 = this;

				if (this._menu) {
					this._menu.remove();
				}
				this._menu = new Menu(el, html, function (el) {
					return _this33._clickMenu(el);
				}, false);
				this._menu.onremove = function () {
					return _this33._menu = null;
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
				this.msg.insertAdjacentHTML('beforebegin', '<div class="de-mp3"></div>');
				var value = this.msg.previousSibling;
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
	})();

	var Post = (function (_AbstractPost) {
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

			var _this34 = _possibleConstructorReturn(this, Object.getPrototypeOf(Post).call(this, thr, num, isOp));

			_this34.count = count;
			_this34.el = el;
			_this34.prev = prev;
			_this34.next = null;
			_this34.banned = false;
			_this34.deleted = false;
			_this34.hidden = false;
			_this34.omitted = false;
			_this34.spellHidden = false;
			_this34.userToggled = false;
			_this34.viewed = false;
			_this34._selRange = null;
			_this34._selText = '';
			if (prev) {
				prev.next = _this34;
			}
			pByEl.set(el, _this34);
			pByNum.set(num, _this34);
			var refEl = $q(aib.qPostRef, el),
			    html = '<span class="de-post-btns' + (isOp ? '' : ' de-post-counter') + '"><svg class="de-btn-hide"><use class="de-btn-hide-use" xlink:href="#de-symbol-post-hide"/>' + '<use class="de-btn-unhide-use" xlink:href="#de-symbol-post-unhide"/></svg>' + '<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>';
			_this34._pref = refEl;
			if (isOp) {
				if (!aib.t) {
					html += '<svg class="de-btn-expthr"><use xlink:href="#de-symbol-post-expthr"/></svg>';
				}
				html += '<svg class="de-btn-fav"><use xlink:href="#de-symbol-post-fav"/></svg>';
			}
			_this34.sage = aib.getSage(el);
			if (_this34.sage) {
				html += '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>';
			}
			refEl.insertAdjacentHTML('afterend', html + '</span>');
			_this34.btns = refEl.nextSibling;
			if (Cfg.expandTrunc && _this34.trunc) {
				_this34._getFull(_this34.trunc, true);
			}
			el.addEventListener('mouseover', _this34, true);
			return _this34;
		}

		_createClass(Post, [{
			key: 'addFuncs',
			value: function addFuncs() {
				_get(Object.getPrototypeOf(Post.prototype), 'addFuncs', this).call(this);
				if (isExpImg) {
					this.toggleImages(true);
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
					$toggle(this.thr.el, !needToHide);
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
			key: 'selectCurrent',
			value: function selectCurrent() {
				if (HotKeys.enabled) {
					if (HotKeys.cPost) {
						HotKeys.cPost.unselect();
					}
					HotKeys.cPost = this;
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
			value: function setUserVisib(hide, date, sync) {
				var note = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

				this.userToggled = true;
				this.setVisib(hide, note);
				if (this.isOp) {
					this.hideBtn.setAttribute('class', hide ? 'de-btn-unhide-user' : 'de-btn-hide-user');
				}
				uVis[this.num] = [+!hide, date];
				if (sync) {
					locStorage['__de-post'] = JSON.stringify({
						'brd': aib.b,
						'date': date,
						'isOp': this.isOp,
						'num': this.num,
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
				var _this35 = this;

				var note = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

				if (this.hidden === hide) {
					if (hide && note) {
						this.note.set(note);
					}
					return;
				}
				if (this.isOp) {
					this.thr.hidden = hide;
				} else {
					if (Cfg.delHiddPost) {
						if (hide) {
							this.wrap.classList.add('de-hidden');
						} else {
							this.wrap.classList.remove('de-hidden');
						}
					} else {
						this._pref.onmouseover = this._pref.onmouseout = !hide ? null : function (e) {
							return _this35.hideContent(e.type === 'mouseout');
						};
					}
				}
				if (Cfg.strikeHidd) {
					setTimeout(function () {
						return _this35._strikePostNum(hide);
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
					if (!this.hidden) {
						this.ref.hide();
					}
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
				var expand = arguments.length <= 0 || arguments[0] === undefined ? !this.images.expanded : arguments[0];

				for (var _iterator22 = this.images, _isArray22 = Array.isArray(_iterator22), _i23 = 0, _iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();;) {
					var _ref41;

					if (_isArray22) {
						if (_i23 >= _iterator22.length) break;
						_ref41 = _iterator22[_i23++];
					} else {
						_i23 = _iterator22.next();
						if (_i23.done) break;
						_ref41 = _i23.value;
					}

					var image = _ref41;

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
			key: 'toggleUserVisib',
			value: function toggleUserVisib() {
				var isOp = this.isOp,
				    hide = !this.hidden;
				this.setUserVisib(hide, Date.now(), true);
				if (isOp) {
					if (hide) {
						hThr[aib.b][this.num] = this.title;
					} else {
						delete hThr[aib.b][this.num];
					}
					saveHiddenThreads(false);
				}
				saveUserPosts();
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
								Spells.add(1 , '/' + regQuote(this._selText).replace(/\r?\n/g, '\\n') + '/', false);
							} else {
								Spells.add(0 , this._selText.toLowerCase(), false);
							}
						} else {
							dummy.innerHTML = '';
							dummy.appendChild(this._selRange.cloneContents());
							Spells.add(2 , '/' + regQuote(dummy.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '')) + '/', false);
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
					case 'hide-ihash':
						spawn(ImagesHashStorage.getHash, this.images.firstAttach).then(function (hash) {
							if (hash !== -1) {
								Spells.add(4 , hash, false);
							}
						});
						return;
					case 'hide-noimg':
						Spells.add(0x108 , '', true);return;
					case 'hide-text':
						var num = this.num,
						    wrds = Post.getWrds(this.text),
						    time = Date.now();
						for (var post = Thread.first.op; post; post = post.next) {
							Post.findSameText(num, hidden, wrds, time, post);
						}
						saveUserPosts();
						return;
					case 'hide-notext':
						Spells.add(0x10B , '', true);return;
					case 'hide-refs':
						this.ref[hidden ? 'unhide' : 'hide'](true);
						this.setUserVisib(!hidden, Date.now(), true);
						saveUserPosts();
						return;
					case 'thr-exp':
						var task = parseInt(el.textContent.match(/\d+/), 10);
						this.thr.load(!task ? 'all' : task === 10 ? 'more' : task, false);
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
				return this.thr.num;
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
	})(AbstractPost);

	Post.content = (function (_TemporaryContent) {
		_inherits(PostContent, _TemporaryContent);

		function PostContent(post) {
			_classCallCheck(this, PostContent);

			var _this36 = _possibleConstructorReturn(this, Object.getPrototypeOf(PostContent).call(this, post));

			if (_this36._inited) {
				return _possibleConstructorReturn(_this36);
			}
			_this36._inited = true;
			_this36.el = post.el;
			_this36.post = post;
			return _this36;
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
				var val = this.el.innerHTML;
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
				var value = this.post.msg.innerHTML.replace(/<\/?(?:br|p|li)[^>]*?>/gi, '\n').replace(/<[^>]+?>/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&nbsp;/g, ' ').trim();
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
				var val = aib.getWrap(this.el, this.post.isOp);
				Object.defineProperty(this, 'wrap', { value: val });
				return val;
			}
		}]);

		return PostContent;
	})(TemporaryContent);
	Post.hasNew = false;
	Post.hiddenNums = new Set();
	Post.note = (function () {
		function PostNote(post) {
			_classCallCheck(this, PostNote);

			this.text = null;
			this._post = post;
			if (post.isOp) {
				var tEl = post.thr.el;
				tEl.insertAdjacentHTML('beforebegin', '\n\t\t\t<div class="' + aib.cReply + ' de-thr-hid" id="de-thr-hid-' + post.num + '">\n\t\t\t\t' + Lng.hiddenThrd[lang] + '\n\t\t\t\t<a href="#">№' + post.num + '</a>\n\t\t\t\t<span class="de-thread-note"></span>\n\t\t\t</div>');
				this._noteEl = tEl.previousSibling;
				this._aEl = $q('a', this._noteEl);
				this.textEl = this._aEl.nextElementSibling;
			} else {
				post.btns.insertAdjacentHTML('beforeend', '<span class="de-post-note"></span>');
				this._noteEl = this.textEl = post.btns.lastChild;
			}
		}

		_createClass(PostNote, [{
			key: 'hide',
			value: function hide() {
				if (this._post.isOp) {
					this._aEl.onmouseover = this._aEl.onmouseout = this._aEl.onclick = null;
				}
				$hide(this._noteEl);
			}
		}, {
			key: 'set',
			value: function set(note) {
				var _this37 = this;

				this.text = note;
				var text;
				if (this._post.isOp) {
					this._aEl.onmouseover = this._aEl.onmouseout = function (e) {
						return _this37._post.hideContent(e.type === 'mouseout');
					};
					this._aEl.onclick = function (e) {
						$pd(e);
						_this37._post.toggleUserVisib();
					};
					text = note ? '(autohide: ' + note + ')' : '(' + this._post.title + ')';
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
				if (this.isOp) {
					this.set(null);
				} else {
					this.hide();
				}
			}
		}]);

		return PostNote;
	})();
	Post.getWrds = function (text) {
		return text.replace(/\s+/g, ' ').replace(/[^a-zа-яё ]/ig, '').trim().substring(0, 800).split(' ');
	};
	Post.findSameText = function (oNum, oHid, oWords, date, post) {
		var words = Post.getWrds(post.text),
		    len = words.length,
		    i = oWords.length,
		    olen = i,
		    _olen = i,
		    n = 0;
		if (len < olen * .4 || len > olen * 3) {
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
		if (n < _olen * .4 || len > _olen * 3) {
			return;
		}
		if (oHid) {
			if (post.spellHidden) {
				post.note.reset();
			} else {
				post.setVisib(false);
			}
			if (post.userToggled) {
				delete uVis[post.num];
				post.userToggled = false;
			}
		} else {
			post.setUserVisib(true, date, true, 'similar to >>' + oNum);
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
			var val = doc.documentElement.clientHeight;
			if (!this._enabled) {
				doc.defaultView.addEventListener('resize', this);
				this._enabled = true;
			}
			Object.defineProperties(this, {
				'wWidth': { writable: true, configurable: true, value: doc.documentElement.clientWidth },
				'wHeight': { writable: true, configurable: true, value: val }
			});
			return val;
		},
		get wWidth() {
			var val = doc.documentElement.clientWidth;
			if (!this._enabled) {
				doc.defaultView.addEventListener('resize', this);
				this._enabled = true;
			}
			Object.defineProperties(this, {
				'wWidth': { writable: true, configurable: true, value: val },
				'wHeight': { writable: true, configurable: true, value: doc.documentElement.clientHeight }
			});
			return val;
		},
		handleEvent: function handleEvent() {
			this.wHeight = doc.documentElement.clientHeight;
			this.wWidth = doc.documentElement.clientWidth;
		},

		_enabled: false
	};

	function PostImages(post) {
		var first = null,
		    last = null,
		    els = $Q(aib.qPostImg, post.el),
		    filesMap = new Map(),
		    hasAttachments = false;
		for (var i = 0, len = els.length; i < len; ++i) {
			var el = els[i];
			last = new Attachment(post, el, last);
			filesMap.set(el, last);
			hasAttachments = true;
			if (!first) {
				first = last;
			}
		}
		if (Cfg.addImgs) {
			els = Array.from($Q('.de-img-pre', post.el));
			for (var i = 0, len = els.length; i < len; ++i) {
				var el = els[i];
				last = new EmbeddedImage(post, el, last);
				filesMap.set(el, last);
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




	var Pview = (function (_AbstractPost2) {
		_inherits(Pview, _AbstractPost2);

		_createClass(Pview, null, [{
			key: 'show',
			value: function show(parent, link) {
				var rv,
				    tNum = +(link.pathname.match(/.+?\/[^\d]*(\d+)/) || [, aib.getPostOfEl(link).tNum])[1],
				    pNum = +(link.textContent.trim().match(/\d+$/) || [tNum])[0],
				    isTop = !(parent instanceof Pview),
				    pv = isTop ? Pview.top : parent.kid;
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
				if (pv) {
					var parent = pv.parent;
					if (parent.omitted) {
						pv['delete']();
						return;
					}
					if (parent.thr.loadCount === 1 && !parent.el.contains(pv._link)) {
						var el = parent.ref.getElByNum(pv.num);
						if (el) {
							pv._link = el;
						} else {
							pv['delete']();
							return;
						}
					}
					var cr = parent.hidden ? parent : pv._link.getBoundingClientRect();
					var diff = pv._isTop ? pv._offsetTop - (window.pageYOffset + cr.bottom) : pv._offsetTop + pv.el.offsetHeight - (window.pageYOffset + cr.top);
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

			var _this38 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pview).call(this, parent.thr, pNum, pNum === tNum));

			_this38._isLeft = false;
			_this38._isTop = false;
			_this38._link = link;
			_this38._fromCache = false;
			_this38._newPos = null;
			_this38._offsetTop = 0;
			_this38._readDelay = 0;
			_this38.sticky = false;
			_this38.parent = parent;
			_this38.tNum = tNum;
			var post = pByNum.get(pNum);
			if (post && (!post.isOp || !(parent instanceof Pview) || !parent._fromCache)) {
				_this38._showPost(post);
				return _possibleConstructorReturn(_this38);
			}
			_this38._fromCache = true;
			var b = link.pathname.match(/^\/?(.+\/)/)[1].replace(aib.res, '').replace(/\/$/, '');
			if (PviewsCache.has(b + tNum)) {
				_this38._loading = false;
				post = PviewsCache.get(b + tNum).getPost(pNum);
				if (post) {
					_this38._showPost(post);
				} else {
					_this38._showPview(_this38.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">' + Lng.postNotFound[lang] + '</span></div>'));
				}
				return _possibleConstructorReturn(_this38);
			}
			_this38._loading = true;
			_this38._showPview(_this38.el = $add('<div class="' + aib.cReply + ' de-pview-info de-pview">' + '<svg class="de-wait"><use xlink:href="#de-symbol-wait"/></svg>' + Lng.loading[lang] + '</div>'));
		
		
			_this38._loadPromise = ajaxLoad(aib.getThrdUrl(b, tNum)).then((function (form) {
				this._onload(b, form);
			}).bind(_this38), _this38._onerror.bind(_this38));
			return _this38;
		}

		_createClass(Pview, [{
			key: 'delete',
			value: function _delete() {
				this.parent.kid = null;
				this._link.classList.remove('de-link-parent');
				if (Pview.top === this) {
					Pview.top = null;
				}
				if (this._loading) {
					this._loadPromise.cancel();
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
						nav.animEvent(el, $del);
						el.classList.add('de-pview-anim');
						el.style[nav.animName] = 'de-post-close-' + (this._isTop ? 't' : 'b') + (this._isLeft ? 'l' : 'r');
					} else {
						$del(el);
					}
				} while (pv = pv.kid);
			}
		}, {
			key: 'deleteNonSticky',
			value: function deleteNonSticky() {
				var lastSticky = null,
				    pv = this;
				do {
					if (pv.sticky) {
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
				if (e.type === nav.animEnd && pv.style[nav.animName]) {
					pv.classList.remove('de-pview-anim');
					pv.style.cssText = this._newPos;
					this._newPos = null;
					$each($Q('.de-css-move', doc.head), $del);
					pv.removeEventListener(nav.animEnd, this);
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
					_get(Object.getPrototypeOf(Pview.prototype), 'handleEvent', this).call(this, e);
				}
			}
		}, {
			key: 'markToDel',
			value: function markToDel() {
				var _this39 = this;

				clearTimeout(Pview._delTO);
				Pview._delTO = setTimeout(function () {
					return _this39.deleteNonSticky();
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
				this.sticky = val;
			}
		}, {
			key: 'toggleUserVisib',
			value: function toggleUserVisib() {
				var post = pByNum.get(this.num);
				post.toggleUserVisib();
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
			value: function _onload(b, form) {
				var parentNum = this.parent.num,
				    post = new PviewsCache(doc.adoptNode(form), b, this.tNum).getPost(this.num);
				if (post && (aib.b !== b || !post.ref.hasMap || !post.ref.has(parentNum))) {
					var rm;
					if (post.ref.hasMap) {
						rm = $q('.de-refmap', post.el);
					} else {
						post.msg.insertAdjacentHTML('afterend', '<div class="de-refmap"></div>');
						rm = post.msg.nextSibling;
					}
					rm.insertAdjacentHTML('afterbegin', '<a class="de-link-ref" href="' + aib.getThrdUrl(b, this.parent.tNum) + aib.anchor + parentNum + '">&gt;&gt;' + (aib.b === b ? '' : '/' + aib.b + '/') + parentNum + '</a><span class="de-refcomma">, </span>');
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
				    bWidth = doc.documentElement.clientWidth,
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
				    isTop = offY + top + cr.height < doc.documentElement.clientHeight || offY - top < 5;
				top = window.pageYOffset + (isTop ? offY + cr.height : offY - top);
				this._offsetTop = top;
				this._isLeft = isLeft;
				this._isTop = isTop;
				if (!isAnim) {
					pv.style.top = top + 'px';
					return;
				}
				var uId = 'de-movecss-' + Math.round(Math.random() * 1e3);
				$css('@' + nav.cssFix + 'keyframes ' + uId + ' {to { ' + lmw + ' top:' + top + 'px; }}').className = 'de-css-move';
				if (this._newPos) {
					pv.style.cssText = this._newPos;
					pv.removeEventListener(nav.animEnd, this);
				} else {
					pv.style.cssText = oldCSS;
				}
				this._newPos = lmw + ' top:' + top + 'px;';
				pv.addEventListener(nav.animEnd, this);
				pv.classList.add('de-pview-anim');
				pv.style[nav.animName] = uId;
			}
		}, {
			key: '_showMenu',
			value: function _showMenu(el, html) {
				var _this40 = this;

				_get(Object.getPrototypeOf(Pview.prototype), '_showMenu', this).call(this, el, html);
				this._menu.onover = function () {
					return _this40.mouseEnter();
				};
				this._menu.onout = function () {
					return _this40.markToDel();
				};
			}
		}, {
			key: '_showPost',
			value: function _showPost(post) {
				if (this.el) {
					$del(this.el);
				}
				var el = this.el = post.el.cloneNode(true),
				    pText = '<svg class="de-btn-rep"><use xlink:href="#de-symbol-post-rep"/></svg>' + (post.sage ? '<svg class="de-btn-sage"><use xlink:href="#de-symbol-post-sage"/></svg>' : '') + '<svg class="de-btn-stick"><use xlink:href="#de-symbol-post-stick"/></svg>' + (post.deleted ? '' : '<span style="margin: 0 4px 0 2px; vertical-align: 1px; color: #4f7942; ' + 'font: bold 11px tahoma; cursor: default;">' + (post.isOp ? 'OP' : post.count + 1) + '</span>');
				pByEl.set(el, this);
				el.className = aib.cReply + ' de-pview' + (post.viewed ? ' de-viewed' : '');
				$show(el);
				$each($Q('.de-post-hiddencontent', el), function (node) {
					return node.classList.remove('de-post-hiddencontent');
				});
				if (Cfg.linksNavig === 2) {
					Pview._markLink(el, this.parent.num);
				}
				this._pref = $q(aib.qPostRef, el);
				this._link.classList.add('de-link-parent');
				if (post instanceof CacheItem) {
					this._pref.insertAdjacentHTML('afterend', '<span class="de-post-btns">' + pText + '</span');
					this.btns = this._pref.nextSibling;
					embedMediaLinks(this);
					if (Cfg.addYouTube) {
						new VideosParser().parse(this).end();
					}
					if (Cfg.addImgs) {
						embedImagesLinks(el);
					}
					processImageNames(el);
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
					nav.animEvent(el, function (node) {
						node.classList.remove('de-pview-anim');
						node.style[nav.animName] = '';
					});
					el.classList.add('de-pview-anim');
					el.style[nav.animName] = 'de-post-open-' + (this._isTop ? 't' : 'b') + (this._isLeft ? 'l' : 'r');
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
	})(AbstractPost);

	Pview.top = null;
	Pview._delTO = null;

	var CacheItem = (function () {
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
	})();

	var PviewsCache = (function (_TemporaryContent2) {
		_inherits(PviewsCache, _TemporaryContent2);

		function PviewsCache(form, b, tNum) {
			_classCallCheck(this, PviewsCache);

			var _this41 = _possibleConstructorReturn(this, Object.getPrototypeOf(PviewsCache).call(this, b + tNum));

			if (_this41._inited) {
				return _possibleConstructorReturn(_this41);
			}
			_this41._inited = true;
			var pBn = new Map(),
			    thr = $q(aib.qThread, form) || form,
			    posts = $Q(aib.qRPost, thr);
			for (var i = 0, len = posts.length; i < len; ++i) {
				var post = posts[i];
				pBn.set(aib.getPNum(post), new CacheItem(post, i + 1));
			}
			pBn.set(tNum, _this41._opObj = new CacheItem(aib.getOp(thr), 0));
			_this41._b = b;
			_this41._tNum = tNum;
			_this41._tUrl = aib.getThrdUrl(b, tNum);
			_this41._posts = pBn;
			if (Cfg.linksNavig === 2) {
				RefMap.gen(pBn, _this41._tUrl);
			}
			return _this41;
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
				pst.el = replacePost(pst.el);
				delete pst.msg;
				if (pst.ref.hasMap) {
					pst.ref.init(this._tUrl, Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null);
				}
				pst.itemInited = true;
				return pst;
			}
		}]);

		return PviewsCache;
	})(TemporaryContent);

	PviewsCache.purgeSecs = 3e5;




	var RefMap = (function () {
		_createClass(RefMap, null, [{
			key: 'gen',
			value: function gen(posts, thrURL) {
				var opNums = DelForm.tNums;
				for (var _iterator23 = posts, _isArray23 = Array.isArray(_iterator23), _i24 = 0, _iterator23 = _isArray23 ? _iterator23 : _iterator23[Symbol.iterator]();;) {
					var _ref42;

					if (_isArray23) {
						if (_i24 >= _iterator23.length) break;
						_ref42 = _iterator23[_i24++];
					} else {
						_i24 = _iterator23.next();
						if (_i24.done) break;
						_ref42 = _i24.value;
					}

					var _ref43 = _ref42;

					var _ref44 = _slicedToArray(_ref43, 2);

					var pNum = _ref44[0];
					var post = _ref44[1];

					var links = $Q('a', post.msg);
					for (var i = 0, len = links.length; i < len; ++i) {
						var lNum,
						    link = links[i],
						    tc = link.textContent;
						if (tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
							continue;
						}
						if (myPosts.has(lNum)) {
							link.classList.add('de-ref-my');
						}
						if (!posts.has(lNum)) {
							continue;
						}
						var ref = posts.get(lNum).ref;
						if (ref._inited) {
							ref.add(post, pNum);
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
				if (post && Cfg.linksNavig === 2) {
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
			value: function upd(post, add) {
				var pNum = post.num,
				    strNums = add && Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null,
				    isThr = aib.t;
				var links = $Q('a', post.msg);
				for (var i = 0, len = links.length; i < len; ++i) {
					var lNum,
					    link = links[i],
					    tc = link.textContent;
					if (tc[0] !== '>' || tc[1] !== '>' || !(lNum = parseInt(tc.substr(2), 10))) {
						continue;
					}
					if (add && myPosts.has(lNum)) {
						link.classList.add('de-ref-my');
						updater.refToYou();
					}
					if (!pByNum.has(lNum)) {
						continue;
					}
					var lPost = pByNum.get(lNum);
					if (!isThr) {
						link.href = '#' + (aib.fch ? 'p' : '') + lNum;
					}
					if (add) {
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
			this._inited = false;
			this._post = post;
			this._set = new Set();
		}

		_createClass(RefMap, [{
			key: 'add',
			value: function add(post, num) {
				var isHidden = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

				if (isHidden === null) {
					var strNums = Cfg.strikeHidd && Post.hiddenNums.size !== 0 ? Post.hiddenNums : null;
					isHidden = strNums ? strNums.has(+num) : false;
				}
				if (!this._set.has(num)) {
					this._set.add(num);
					this._el.insertAdjacentHTML('beforeend', this._getHTML(num, '', isHidden));
					if (Cfg.hideRefPsts && this._post.hidden) {
						if (!post.hidden) {
							post.ref.hide();
						}
						post.setVisib(true, 'reference to >>' + num);
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
				var canDo = arguments.length <= 0 || arguments[0] === undefined ? Cfg.hideRefPsts : arguments[0];

				if (!canDo || !this.hasMap) {
					return;
				}
				var date,
				    isUser = canDo === true;
				if (isUser) {
					date = Date.now();
				}
				for (var _iterator24 = this._set, _isArray24 = Array.isArray(_iterator24), _i25 = 0, _iterator24 = _isArray24 ? _iterator24 : _iterator24[Symbol.iterator]();;) {
					var _ref45;

					if (_isArray24) {
						if (_i25 >= _iterator24.length) break;
						_ref45 = _iterator24[_i25++];
					} else {
						_i25 = _iterator24.next();
						if (_i25.done) break;
						_ref45 = _i25.value;
					}

					var num = _ref45;

					var pst = pByNum.get(num);
					if (pst && (isUser || !pst.userToggled)) {
						if (isUser) {
							pst.setUserVisib(true, date, true, 'reference to >>' + this._post.num);
							pst.ref.hide(true);
						} else {
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
				for (var _iterator25 = this._set, _isArray25 = Array.isArray(_iterator25), _i26 = 0, _iterator25 = _isArray25 ? _iterator25 : _iterator25[Symbol.iterator]();;) {
					var _ref46;

					if (_isArray25) {
						if (_i26 >= _iterator25.length) break;
						_ref46 = _iterator25[_i26++];
					} else {
						_i26 = _iterator25.next();
						if (_i26.done) break;
						_ref46 = _i26.value;
					}

					var num = _ref46;

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
				var canDo = arguments.length <= 0 || arguments[0] === undefined ? Cfg.hideRefPsts : arguments[0];

				if (!canDo || !this.hasMap) {
					return;
				}
				var date,
				    isUser = canDo === true;
				if (isUser) {
					date = Date.now();
				}
				for (var _iterator26 = this._set, _isArray26 = Array.isArray(_iterator26), _i27 = 0, _iterator26 = _isArray26 ? _iterator26 : _iterator26[Symbol.iterator]();;) {
					var _ref47;

					if (_isArray26) {
						if (_i27 >= _iterator26.length) break;
						_ref47 = _iterator26[_i27++];
					} else {
						_i27 = _iterator26.next();
						if (_i27.done) break;
						_ref47 = _i27.value;
					}

					var num = _ref47;

					var pst = pByNum.get(num);
					if (pst && pst.hidden && (isUser || !pst.userToggled) && !pst.spellHidden) {
						if (isUser) {
							pst.setUserVisib(false, date, true);
							pst.ref.unhide(true);
						} else {
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
				return '<a href="' + tUrl + aib.anchor + num + '" class="de-link-ref' + (isHidden ? ' de-link-hid' : '') + '">&gt;&gt;' + num + '</a><span class="de-refcomma">, </span>';
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
	})();




	var Thread = (function () {
		_createClass(Thread, null, [{
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
			var _this42 = this;

			_classCallCheck(this, Thread);

			var els = $Q(aib.qRPost, el),
			    len = els.length,
			    omt = aib.t ? 1 : aib.getOmitted($q(aib.qOmitted, el), len);
			this.hasNew = false;
			this.hidden = false;
			this.loadCount = 0;
			this.next = null;
			this.num = num;
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
			el.removeAttribute('id');
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
				el.insertAdjacentHTML('beforeend', '<div class="de-thread-buttons">' + '<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>]</span>');
				this.btns = el.lastChild;
				var updBtn = this.btns.firstElementChild;
				updBtn.onclick = function (e) {
					$pd(e);
					_this42.load('new', false);
				};
				if (Cfg.hideReplies) {
					this.btns.insertAdjacentHTML('beforeend', ' <span class="de-replies-btn">[<a class="de-abtn" href="#"></a>]</span>');
					var repBtn = this.btns.lastChild;
					repBtn.onclick = function (e) {
						$pd(e);
						var nextCoord = !_this42.next || _this42.last.omitted ? null : _this42.next.top;
						_this42._toggleReplies(repBtn, updBtn);
						if (nextCoord) {
							scrollTo(window.pageXOffset, windows.pageYOffset + _this42.next.top - nextCoord);
						}
					};
					this._toggleReplies(repBtn, updBtn);
				}
			}
		}

		_createClass(Thread, [{
			key: 'addPost',
			value: function addPost(parent, el, i, prev, maybeVParser) {
				var post,
				    num = aib.getPNum(el),
				    wrap = doc.adoptNode(aib.getWrap(el, false));
				el = replacePost(el);
				post = new Post(el, this, num, i, false, prev);
				parent.appendChild(wrap);
				if (aib.t && !doc.hidden && Cfg.animation) {
					nav.animEvent(post.el, function (node) {
						node.classList.remove('de-post-new');
					});
					post.el.classList.add('de-post-new');
				}
				if (uVis[num]) {
					initPostUserVisib(post, num, uVis[num][0] === 0, Date.now());
				}
				if (maybeVParser.value) {
					maybeVParser.value.parse(post);
				}
				processImageNames(el);
				post.addFuncs();
				preloadImages(post);
				if (aib.t && Cfg.markNewPosts) {
					Post.addMark(el, false);
				}
				return post;
			}
		}, {
			key: 'deletePost',
			value: function deletePost(post, delAll, removePost) {
				SpellsRunner.cachedData = null;
				var count = 0,
				    idx = post.count;
				do {
					if (removePost) {
						$del(post.wrap);
						pByEl['delete'](post.el);
						pByNum['delete'](post.num);
						if (post.hidden) {
							post.ref.unhide();
						}
						RefMap.upd(post, false);
						if (post.prev.next = post.next) {
							post.next.prev = post.prev;
						}
						if (this.last === post) {
							this.last = post.prev;
						}
					} else {
						post.deleted = true;
						post.btns.classList.remove('de-post-counter');
						post.btns.classList.add('de-post-deleted');
						post.wrap.classList.add('de-post-removed');
						($q('input[type="checkbox"]', post.el) || {}).disabled = true;
					}
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
			key: 'load',
			value: function load(last, smartScroll) {
				var _this43 = this;

				var informUser = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

				if (informUser) {
					$popup(Lng.loading[lang], 'load-thr', true);
				}
				return ajaxLoad(aib.getThrdUrl(aib.b, this.num)).then(function (form) {
					return _this43.loadFromForm(last, smartScroll, form);
				}, function (e) {
					return $popup(getErrorMessage(e), 'load-thr', false);
				});
			}
		}, {
			key: 'loadFromForm',
			value: function loadFromForm(last, smartScroll, form) {
				var _this44 = this;

				var nextCoord,
				    loadedPosts = $Q(aib.qRPost, form),
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
						var newMsg = doc.adoptNode($q(aib.qPostMsg, form));
						op.updateMsg(replacePost(newMsg), maybeSpells.value);
					}
					op.ref.removeMap();
				}
				this.loadCount++;
				this._checkBans(form);
				aib.checkForm(form, maybeSpells);
				this._parsePosts(loadedPosts);
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
						needToShow = loadedPosts.length - needToOmit;
						break;
					case 'all':
					
						needToHide = needToOmit = 0;
						needToShow = loadedPosts.length;
						break;
					case 'more':
					
						needToHide = $Q('.de-hidden', thrEl).length - 10;
						needToOmit = Math.max(needToHide + post.count - 1, 0);
						needToHide = Math.max(needToHide, 0);
						needToShow = loadedPosts.length - needToOmit;
						break;
					default:
					
						needToHide = Math.max(existed - last, 0);
						needToOmit = Math.max(loadedPosts.length - last, 0);
						needToShow = last;
				}
				if (needToHide) {
					while (existed-- !== needToShow) {
						post.wrap.classList.add('de-hidden');
						post.omitted = true;
						post = post.next;
					}
				} else {
					var fragm = doc.createDocumentFragment(),
					    tPost = op,
					    nonExisted = loadedPosts.length - existed,
					    maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
					for (var i = Math.max(0, nonExisted + existed - needToShow); i < nonExisted; ++i) {
						tPost = this.addPost(fragm, loadedPosts[i], i + 1, tPost, maybeVParser);
						maybeSpells.value.run(tPost);
					}
					maybeVParser.end();
					$after(op.wrap, fragm);
					tPost.next = post;
					if (post) {
						post.prev = tPost;
					}
					needRMUpdate = true;
					needToShow = Math.min(nonExisted + existed, needToShow);
				}
				while (existed-- !== 0) {
					if (post.trunc) {
						var newMsg = doc.adoptNode($q(aib.qPostMsg, loadedPosts[post.count - 1]));
						post.updateMsg(replacePost(newMsg), maybeSpells.value);
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
					btn.insertAdjacentHTML('beforeend', '<span class="de-thread-collapse"> [<a class="de-abtn" href="' + aib.getThrdUrl(aib.b, this.num) + '"></a>]</span>');
					btn.lastChild.onclick = function (e) {
						$pd(e);
						_this44.load(visPosts, true);
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
			key: 'loadNew',
			value: function loadNew(useAPI) {
				var _this45 = this;

				if (aib.dobr && useAPI) {
					return getJsonPosts('/api/thread/' + aib.b + '/' + aib.t + '.json').then(function (json) {
						if (json) {
							if (json.error) {
								return CancelablePromise.reject(new AjaxError(0, json.message));
							}
							if (_this45._lastModified !== json.last_modified || _this45.pcount !== json.posts_count) {
								_this45._lastModified = json.last_modified;
								return _this45.loadNew(false);
							}
						}
						return 0;
					});
				}
				return ajaxLoad(aib.getThrdUrl(aib.b, aib.t), true, !aib.dobr).then(function (form) {
					return form ? _this45.loadNewFromForm(form) : 0;
				});
			}
		}, {
			key: 'loadNewFromForm',
			value: function loadNewFromForm(form) {
				this._checkBans(form);
				aib.checkForm(form, null);
				var lastOffset = pr.isVisible ? pr.top : null;

				var _parsePosts2 = this._parsePosts($Q(aib.qRPost, form));

				var _parsePosts3 = _slicedToArray(_parsePosts2, 2);

				var newPosts = _parsePosts3[0];
				var newVisPosts = _parsePosts3[1];

				if (lastOffset !== null) {
					scrollTo(window.pageXOffset, window.pageYOffset + pr.top - lastOffset);
				}
				if (newPosts !== 0) {
					panel.updateCounter(this.pcount, $Q(aib.qPostImg, this.el).length);
					Pview.updatePosition(true);
				}
				return newVisPosts;
			}
		}, {
			key: 'setFavorState',
			value: function setFavorState(val, type) {
				var _this46 = this;

				this.op.setFavBtn(val);
				readFav().then(function (fav) {
					var b = aib.b,
					    h = aib.host;
					if (val) {
						if (!fav[h]) {
							fav[h] = {};
						}
						if (!fav[h][b]) {
							fav[h][b] = {};
						}
						fav[h][b].url = aib.prot + '//' + aib.host + aib.getPageUrl(b, 0);
						fav[h][b][_this46.num] = {
							'cnt': _this46.pcount,
							'new': 0,
							'txt': _this46.op.title,
							'url': aib.getThrdUrl(b, _this46.num),
							'last': aib.anchor + _this46.last.num,
							'type': type
						};
					} else {
						removeFavoriteEntry(fav, h, b, _this46.num, false);
					}
					saveFavorites(fav);
				});
			}
		}, {
			key: 'updateHidden',
			value: function updateHidden(data) {
				var date = Date.now(),
				    thr = this;
				do {
					var realHid = thr.num in data;
					if (thr.hidden ^ realHid) {
						if (realHid) {
							thr.op.setUserVisib(true, date, false);
							data[thr.num] = thr.op.title;
						} else if (thr.hidden) {
							thr.op.setUserVisib(false, date, false);
						}
					}
				} while (thr = thr.next);
			}
		}, {
			key: '_checkBans',
			value: function _checkBans(thrNode) {
				if (!aib.qBan) {
					return;
				}
				var bEls = $Q(aib.qBan, thrNode);
				for (var i = 0, len = bEls.length; i < len; ++i) {
					var bEl = bEls[i],
					    pEl = aib.getPostElOfEl(bEl),
					    post = pEl ? pByNum.get(aib.getPNum(pEl)) : this.op;
					if (post && !post.banned) {
						if (!$q(aib.qBan, post.el)) {
							post.msg.appendChild(doc.adoptNode(bEl));
						}
						post.banned = true;
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
			value: function _importPosts(last, newPosts, begin, end, maybeVParser, maybeSpells) {
				var newCount = end - begin,
				    newVisCount = newCount,
				    fragm = doc.createDocumentFragment();
				for (; begin < end; ++begin) {
					last = this.addPost(fragm, newPosts[begin], begin + 1, last, maybeVParser);
					newVisCount -= maybeSpells.value.run(last);
				}
				return [newCount, newVisCount, fragm, last];
			}
		}, {
			key: '_parsePosts',
			value: function _parsePosts(nPosts) {
				var _this47 = this;

				var maybeSpells = new Maybe(SpellsRunner),
				    newPosts = 0,
				    newVisPosts = 0,
				    len = nPosts.length,
				    post = this.lastNotDeleted,
				    maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
				if (post.count !== 0 && (aib.dobr || post.count > len || aib.getPNum(nPosts[post.count - 1]) !== post.num)) {
					post = this.op.nextNotDeleted;
					var i,
					    firstChangedPost = null;
					for (i = post.count - 1; i < len && post;) {
						if (post.num === aib.getPNum(nPosts[i])) {
							i++;
							post = post.nextNotDeleted;
							continue;
						}
						if (post.num > aib.getPNum(nPosts[i])) {
							if (!firstChangedPost) {
								firstChangedPost = post.prev;
							}
							var cnt = 0;
							do {
								cnt++;
								i++;
							} while (aib.getPNum(nPosts[i]) < post.num);
							var res = this._importPosts(post.prev, nPosts, i - cnt, i, maybeVParser, maybeSpells);
							newPosts += res[0];
							this.pcount += res[0];
							newVisPosts += res[1];
							$after(post.prev.wrap, res[2]);
							res[3].next = post;
							post.prev = res[3];
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
					var res = this._importPosts(this.last, nPosts, this.lastNotDeleted.count, len, maybeVParser, maybeSpells);
					newPosts += res[0];
					newVisPosts += res[1];
					this.el.appendChild(res[2]);
					this.last = res[3];
					this.pcount = len + 1;
				}
				readFav().then(function (fav) {
					var f = fav[aib.host];
					if (!f || !f[aib.b]) {
						return;
					}
					if (f = f[aib.b][_this47.op.num]) {
						var el = $q('#de-win-fav > .de-win-body');
						if (el && el.hasChildNodes()) {
							el = $q('.de-fav-current > .de-entry[de-num="' + _this47.op.num + '"] .de-fav-inf-new', el);
							$hide(el);
							el.textContent = 0;
							el = el.nextElementSibling;
							el.textContent = _this47.pcount;
						}
						f.cnt = _this47.pcount;
						f['new'] = 0;
						f.last = aib.anchor + _this47.last.num;
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
			key: 'top',
			get: function get() {
				return this.op.top;
			}
		}]);

		return Thread;
	})();

	var navPanel = {
		addThr: function addThr(thr) {
			this._thrs.add(thr);
			if (this._thrs.size === 1) {
				doc.defaultView.addEventListener('scroll', this);
			}
			if (!this._visible) {
				var halfHeight = Post.sizing.wHeight / 2;
				if (thr.bottom > halfHeight && thr.top < halfHeight) {
					this._showHide(true);
					this._currentThr = thr;
				}
			}
		},
		handleEvent: function handleEvent(e) {
			var _this48 = this;

			switch (e.type) {
				case 'scroll':
					window.requestAnimationFrame(function () {
						var halfHeight = Post.sizing.wHeight / 2;
						for (var _iterator27 = _this48._thrs, _isArray27 = Array.isArray(_iterator27), _i28 = 0, _iterator27 = _isArray27 ? _iterator27 : _iterator27[Symbol.iterator]();;) {
							var _ref48;

							if (_isArray27) {
								if (_i28 >= _iterator27.length) break;
								_ref48 = _iterator27[_i28++];
							} else {
								_i28 = _iterator27.next();
								if (_i28.done) break;
								_ref48 = _i28.value;
							}

							var thr = _ref48;

							if (thr.bottom > halfHeight && thr.top < halfHeight) {
								if (!_this48._visible) {
									_this48._showHide(true);
								}
								_this48._currentThr = thr;
								return;
							}
						}
						if (_this48._visible) {
							_this48._showHide(false);
						}
					});
					break;
				case 'mouseover':
					this._expandCollapse(true, fixEventEl(e.relatedTarget));break;
				case 'mouseout':
					this._expandCollapse(false, fixEventEl(e.relatedTarget));break;
				case 'click':
					this._handleClick(e);break;
			}
		},
		init: function init() {
			docBody.insertAdjacentHTML('beforeend', '\n\t\t<div id="de-thr-navpanel" class="de-thr-navpanel-hidden" style="display: none;">\n\t\t\t<svg id="de-thr-navarrow"><use xlink:href="#de-symbol-nav-arrow"/></svg>\n\t\t\t<div id="de-thr-navup">\n\t\t\t\t<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-nav-up"/></svg>\n\t\t\t</div>\n\t\t\t<div id="de-thr-navdown">\n\t\t\t\t<svg viewBox="0 0 24 24"><use xlink:href="#de-symbol-nav-down"/></svg>\n\t\t\t</div>\n\t\t</div>');
			var el = docBody.lastChild;
			el.addEventListener('mouseover', this, true);
			el.addEventListener('mouseout', this, true);
			el.addEventListener('click', this, true);
			this._el = el;
			this._thrs = new Set();
		},
		removeThr: function removeThr(thr) {
			this._thrs['delete'](thr);
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
		_handleClick: function _handleClick(e) {
			var el = fixEventEl(e.target);
			if (el.tagName.toLowerCase() === 'svg') {
				el = el.parentNode;
			}
			switch (el.id) {
				case 'de-thr-navup':
					scrollTo(window.pageXOffset, window.pageYOffset + this._currentThr.top - 50);
					break;
				case 'de-thr-navdown':
					scrollTo(window.pageXOffset, window.pageYOffset + this._currentThr.btns.getBoundingClientRect().bottom - Post.sizing.wHeight + 50);
					break;
			}
		},
		_expandCollapse: function _expandCollapse(expand, rt) {
			var _this49 = this;

			if (!rt || !this._el.contains(rt.farthestViewportElement || rt)) {
				clearTimeout(this._showhideTO);
				this._showhideTO = setTimeout(expand ? function () {
					return _this49._el.classList.remove('de-thr-navpanel-hidden');
				} : function () {
					return _this49._el.classList.add('de-thr-navpanel-hidden');
				}, Cfg.linksOver);
			}
		},
		_showHide: function _showHide(show) {
			this._el.style.display = show ? 'initial' : 'none';
			this._visible = show;
		}
	};




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
			console.log('WEBSTORAGE ERROR: please, enable webstorage!');
			return false;
		}
		return true;
	}

	function initNavFuncs() {
		var ua = window.navigator.userAgent,
		    firefox = ua.includes('Gecko/'),
		    presto = !!window.opera,
		    webkit = ua.includes('WebKit/'),
		    chrome = webkit && ua.includes('Chrome/'),
		    safari = webkit && !chrome,
		    isGM = false,
		    isChromeStorage = window.chrome && !!window.chrome.storage,
		    isScriptStorage = !!scriptStorage && !ua.includes('Opera Mobi');
		if (!('requestAnimationFrame' in window)) {
		
			window.requestAnimationFrame = function (fn) {
				return setTimeout(fn, 0);
			};
		}
		var needFileHack = false;
		try {
			new File([''], '');
			if (firefox) {
				needFileHack = !FormData.prototype.get;
			}
		} catch (e) {
			needFileHack = true;
		}
		if (needFileHack) {
			var origFormData = FormData;
			var origAppend = FormData.prototype.append;
			FormData = function FormData() {
				for (var _len6 = arguments.length, args = Array(_len6), _key5 = 0; _key5 < _len6; _key5++) {
					args[_key5] = arguments[_key5];
				}

				var rv = new (Function.prototype.bind.apply(origFormData, [null].concat(args)))();
				rv.append = function append(name, value) {
					var fileName = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

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
		if ('toJSON' in aProto) {
			delete aProto.toJSON;
		}
		try {
			isGM = typeof GM_setValue === 'function' && (!chrome || !GM_setValue.toString().includes('not supported'));
		} catch (e) {}
		nav = {
			get ua() {
				return navigator.userAgent + (this.Firefox ? ' [' + navigator.buildID + ']' : '');
			},
			Firefox: firefox,
			Presto: presto,
			WebKit: webkit,
			Chrome: chrome,
			Safari: safari,
			isGM: isGM,
			get isES6() {
				return typeof de_main_func_outer === 'undefined';
			},
			isChromeStorage: isChromeStorage,
			isScriptStorage: isScriptStorage,
			isGlobal: isGM || isChromeStorage || isScriptStorage,
			scriptInstall: firefox ? typeof GM_info !== 'undefined' ? 'Greasemonkey' : 'Scriptish' : isChromeStorage ? 'Chrome extension' : isGM ? 'Monkey' : 'Native userscript',
			cssFix: webkit ? '-webkit-' : '',
			animName: webkit ? 'webkitAnimationName' : 'animationName',
			animEnd: webkit ? 'webkitAnimationEnd' : 'animationend',
			animEvent: function animEvent(el, fn) {
				el.addEventListener(this.animEnd, function aEvent() {
					this.removeEventListener(nav.animEnd, aEvent);
					fn(this);
					fn = null;
				});
			},
			cssMatches: function cssMatches(leftSel) {
				for (var _len7 = arguments.length, rules = Array(_len7 > 1 ? _len7 - 1 : 0), _key6 = 1; _key6 < _len7; _key6++) {
					rules[_key6 - 1] = arguments[_key6];
				}

				return leftSel + rules.join(', ' + leftSel);
			},

			fixLink: safari ? getAbsLink : function fixLink(url) {
				return url;
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
			get canPlayWebm() {
				var val = !!new Audio().canPlayType('video/webm; codecs="vp8,vorbis"');
				Object.defineProperty(this, 'canPlayWebm', { value: val });
				return val;
			},
			get matchesSelector() {
				var dE = doc.documentElement,
				    val = Function.prototype.call.bind(dE.matches || dE.mozMatchesSelector || dE.webkitMatchesSelector || dE.oMatchesSelector);
				Object.defineProperty(this, 'matchesSelector', { value: val });
				return val;
			},
		
			getUnsafeUint8Array: function getUnsafeUint8Array(data) {
				var i = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
				var len = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

				var rv;
				if (len === null) {
					rv = new Uint8Array(data, i);
					return rv instanceof Uint8Array ? rv : new unsafeWindow.Uint8Array(data, i);
				}
				rv = new Uint8Array(data, i, len);
				return rv instanceof Uint8Array ? rv : new unsafeWindow.Uint8Array(data, i, len);
			},
			getUnsafeDataView: function getUnsafeDataView(data, offset) {
				var rv = new DataView(data, offset || 0);
				return rv instanceof DataView ? rv : new unsafeWindow.DataView(data, offset || 0);
			}
		};
	}




	var BaseBoard = (function () {
		function BaseBoard(prot, dm) {
			_classCallCheck(this, BaseBoard);

		
			this.cReply = 'reply';
			this.qBan = '';
			this.qDelBut = 'input[type="submit"]';
			this.qDelPassw = 'input[type="password"], input[name="password"]';
			this.qDForm = '#delform, form[name="delform"]';
			this.qError = 'h1, h2, font[size="5"]';
			this.qFileInfo = '.filesize';
			this.qForm = '#postform';
			this.qFormPassw = 'tr input[type="password"]';
			this.qFormRedir = 'input[name="postredir"][value="1"]';
			this.qFormRules = '.rules, #rules';
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
			this.hasCatalog = false;
			this.hasOPNum = false;
			this.hasPicWrap = false;
			this.hasTextLinks = false;
			this.host = window.location.hostname;
			this.jsonSubmit = false;
			this.markupBB = false;
			this.multiFile = false;
			this.page = 0;
			this.prot = prot;
			this.res = 'res/';
			this.ru = false;
			this.t = false;
			this.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
			this.thrid = 'parent';

			this._qTable = 'form > table, div > table, div[id^="repl"]';
		}

		_createClass(BaseBoard, [{
			key: 'checkForm',
			value: function checkForm() {}

		}, {
			key: 'disableRedirection',
			value: function disableRedirection(el) {
			
				$hide($parent(el, 'TR'));
				el.checked = true;
			}
		}, {
			key: 'fixFileInputs',
			value: function fixFileInputs() {}
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
			key: 'getCaptchaSrc',
			value: function getCaptchaSrc(src, tNum) {
				var tmp = src.replace(/pl$/, 'pl?key=mainpage&amp;dummy=').replace(/dummy=[\d\.]*/, 'dummy=' + Math.random());
				return tNum ? tmp.replace(/mainpage|res\d+/, 'res' + tNum) : tmp.replace(/res\d+/, 'mainpage');
			}
		}, {
			key: 'getCatalogUrl',
			value: function getCatalogUrl() {
				return this.prot + '//' + this.host + '/' + this.b + '/catalog.html';
			}
		}, {
			key: 'getFileInfo',
			value: function getFileInfo(wrap) {
				var el = $q(this.qFileInfo, wrap);
				return el ? el.textContent : '';
			}
		}, {
			key: 'getImgLink',
			value: function getImgLink(img) {
			
				var el = img.parentNode;
				return el.tagName === 'SPAN' ? el.parentNode : el;
			}
		}, {
			key: 'getImgParent',
			value: function getImgParent(el) {
			
				return this.getImgWrap(el);
			}
		}, {
			key: 'getImgWrap',
			value: function getImgWrap(el) {
				var node = (el.tagName === 'SPAN' ? el.parentNode : el).parentNode;
				return node.tagName === 'SPAN' ? node.parentNode : node;
			}
		}, {
			key: 'getOmitted',
			value: function getOmitted(el, len) {
			
				var txt;
				return el && (txt = el.textContent) ? +(txt.match(/\d+/) || [0])[0] + 1 : 1;
			}
		}, {
			key: 'getOp',
			value: function getOp(thr) {
			
				var op = localRun ? $q('div[de-oppost]', thr) : $q(this.qOPost, thr);
				if (op) {
					return op;
				}
				op = thr.ownerDocument.createElement('div');
				op.setAttribute('de-oppost', '');
				var el,
				    opEnd = $q(this._qTable, thr);
				while ((el = thr.firstChild) !== opEnd) {
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
			key: 'getSage',
			value: function getSage(post) {
				var a = $q('a[href^="mailto:"], a[href="sage"]', post);
				return !!a && /sage/i.test(a.href);
			}
		}, {
			key: 'getThrdUrl',
			value: function getThrdUrl(b, tNum) {
			
				return this.prot + '//' + this.host + fixBrd(b) + this.res + tNum + this.docExt;
			}
		}, {
			key: 'getTNum',
			value: function getTNum(op) {
				return +$q('input[type="checkbox"]', op).value;
			}
		}, {
			key: 'getWrap',
			value: function getWrap(el, isOp) {
				if (isOp) {
					return el;
				}
				if (el.tagName === 'TD') {
					Object.defineProperty(this, 'getWrap', {
						value: function value(el, isOp) {
							return isOp ? el : $parent(el, 'TABLE');
						}
					});
				} else {
					Object.defineProperty(this, 'getWrap', {
						value: function value(el, isOp) {
							return el;
						}
					});
				}
				return this.getWrap(el, isOp);
			}
		}, {
			key: 'insertYtPlayer',
			value: function insertYtPlayer(msg, playerHtml) {
				msg.insertAdjacentHTML('beforebegin', playerHtml);
				return msg.previousSibling;
			}
		}, {
			key: 'css',
			get: function get() {
				return '';
			}
		}, {
			key: 'getSubmitData',
			get: function get() {
				return null;
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
			key: 'qImgName',
			get: function get() {
				var value = nav.cssMatches(this.qFileInfo + ' a', '[href$=".jpg"]', '[href$=".jpeg"]', '[href$=".png"]', '[href$=".gif"]', '[href$=".webm"]', '[href$=".apng"]');
				Object.defineProperty(this, 'qImgName', { value: value });
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
				var val = $q('.thread') ? '.thread' : $q('div[id*="_info"][style*="float"]') ? 'div[id^="t"]:not([style])' : '[id^="thread"]';
				Object.defineProperty(this, 'qThread', { value: val });
				return val;
			}
		}, {
			key: 'initCaptcha',
			get: function get() {
				return null;
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
			key: 'needRep',
			get: function get() {
			
				return dTime || Spells.reps || Cfg.crossLinks || this.repFn || this.hasTextLinks;
			}
		}, {
			key: 'reCrossLinks',
			get: function get() {
			
				var val = new RegExp('>https?:\\/\\/[^\\/]*' + this.dm + '\\/([a-z0-9]+)\\/' + regQuote(this.res) + '(\\d+)(?:[^#<]+)?(?:#i?(\\d+))?<', 'g');
				Object.defineProperty(this, 'reCrossLinks', { value: val });
				return val;
			}
		}, {
			key: 'repFn',
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
	})();

	function getImageBoard(checkDomains, checkEngines) {
		var ibDomains = {};
		var ibEngines = [];

	

		var Makaba = (function (_BaseBoard) {
			_inherits(Makaba, _BaseBoard);

			function Makaba(prot, dm) {
				_classCallCheck(this, Makaba);

				var _this50 = _possibleConstructorReturn(this, Object.getPrototypeOf(Makaba).call(this, prot, dm));

				_this50.mak = true;

				_this50.cReply = 'post reply';
				_this50.qBan = '.pomyanem';
				_this50.qClosed = '.sticky-img[src$="locked.png"]';
				_this50.qDForm = '#posts-form';
				_this50.qFormRedir = null;
				_this50.qFormRules = '.rules-area';
				_this50.qOmitted = '.mess-post';
				_this50.qPostHeader = '.post-details';
				_this50.qPostImg = '.preview';
				_this50.qPostMsg = '.post-message';
				_this50.qPostName = '.ananimas, .post-email';
				_this50.qPostSubj = '.post-title';
				_this50.qRPost = 'div.reply';
				_this50.qTrunc = null;

				_this50.hasCatalog = true;
				_this50.hasOPNum = true;
				_this50.hasPicWrap = true;
				_this50.jsonSubmit = true;
				_this50.markupBB = true;
				_this50.multiFile = true;
				_this50.timePattern = 'dd+nn+yy+w+hh+ii+ss';

				_this50._capUpdPromise = null;
				return _this50;
			}

			_createClass(Makaba, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '';
					for (var i = 0, len = 4; i < len; ++i) {
						str += '<div' + (i === 0 ? '' : ' style="display: none;"') + '><input type="file" name="image' + (i + 1) + '"/></div>';
					}
					$q('#postform .images-area', doc).lastElementChild.innerHTML = str;
				}
			}, {
				key: 'getImgParent',
				value: function getImgParent(node) {
					var el = $parent(node, 'FIGURE'),
					    parent = el.parentNode;
					return parent.lastElementChild === el ? parent : el;
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(el) {
					return $parent(el, 'FIGURE');
				}
			}, {
				key: 'getPNum',
				value: function getPNum(post) {
					return +post.getAttribute('data-num');
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					if (this._hasNames) {
						this.getSage = function (post) {
							var name = $q(this.qPostName, post);
							return name ? name.childElementCount === 0 && !$q('.ophui', post) : false;
						};
					} else {
						this.getSage = _get(Object.getPrototypeOf(Makaba.prototype), 'getSage', this);
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
						error = Lng.error[lang] + ":\n" + json.Reason;
					}
					return { error: error, postNum: postNum };
				}
			}, {
				key: 'getWrap',
				value: function getWrap(el) {
					return el.parentNode;
				}
			}, {
				key: 'init',
				value: function init() {
					$script('window.FormData = void 0; $(function() { $(window).off(); });');
					$each($Q('.autorefresh'), $del);
					var el = $q('td > .anoniconsselectlist');
					if (el) {
						$q('.option-area > td:last-child').appendChild(el);
					}
					if (el = $q('.search')) {
						$before($q('.menu').firstChild, el);
					}
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
					var _this51 = this;

					if (this._capUpdPromise) {
						this._capUpdPromise.cancel();
					}
					return this._capUpdPromise = $ajax('/makaba/captcha.fcgi?type=2chaptcha' + (pr.tNum ? '&action=thread' : '')).then(function (xhr) {
						_this51._capUpdPromise = null;
						var el = $q('.captcha-box', cap.trEl),
						    data = xhr.responseText;
						if (data.includes('VIPFAIL')) {
							el.innerHTML = 'Ваш пасс-код не действителен, пожалуйста, перелогиньтесь. <a href="#" id="renew-pass-btn">Обновить</a>';
						} else if (data.includes('VIP')) {
							el.innerHTML = 'Вам не нужно вводить капчу, у вас введен пасс-код.';
						} else if (data.includes('DISABLED')) {
							return CancelablePromise.reject();
						} else if (data.includes('CHECK')) {
							var key = data.substr(6),
							    src = '/makaba/captcha.fcgi?type=2chaptcha&action=image&id=' + key;
							if (el = $id('de-image-captcha')) {
								el.src = '';
								el.src = src;
							} else {
								el = $q('.captcha-image', cap.trEl);
								el.innerHTML = '<img id="de-image-captcha" src="' + src + '">';
								cap.initImage(el.firstChild);
							}
						
							$q('input[name="2chaptcha_id"]', cap.trEl).value = key;
						} else {
							el.textContent = data;
						}
					}, function (e) {
						if (!(e instanceof CancelError)) {
							_this51._capUpdPromise = null;
							return CancelablePromise.reject(e);
						}
					});
				}
			}, {
				key: 'css',
				get: function get() {
					return '\n\t\t\t.ABU-refmap, .box[onclick="ToggleSage()"], img[alt="webm file"], #de-win-reply.de-win .kupi-passcode-suka, .fa-media-icon, .logo + hr, .media-expand-button, .nav-arrows, .news, .norm-reply, .message-byte-len, .postform-hr, .postpanel > :not(img), .prerekl-hr, .posts > hr, .reflink::before, .thread-nav, #ABU-alert-wait, #media-thumbnail { display: none !important; }\n\t\t\t.captcha-image > img { cursor: pointer; }\n\t\t\t#de-txt-panel { font-size: 16px !important; }\n\t\t\t.images-area input { float: none !important; display: inline !important; }\n\t\t\t.images-single + .de-video-obj { display: inline-block; }\n\t\t\t.mess-post { display: block; }\n\t\t\t.post.reply .post-message { max-height: initial !important; }\n\t\t\t.postbtn-reply-href { font-size: 0px; }\n\t\t\t.postbtn-reply-href::after { font-size: 14px; content: attr(name); }\n\t\t\t' + (Cfg.expandTrunc ? '.expand-large-comment, div[id^="shrinked-post"] { display: none !important; } div[id^="original-post"] { display: block !important; }' : '') + '\n\t\t\t' + (Cfg.delImgNames ? '.filesize { display: inline !important; }' : '');
				}
			}, {
				key: 'qImgName',
				get: function get() {
					return '.file-attr > .desktop';
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
			}, {
				key: '_hasNames',
				get: function get() {
				
					var val = !!$q('.ananimas > span[id^="id_tag_"], .post-email > span[id^="id_tag_"]');
					Object.defineProperty(this, '_hasNames', { value: val });
					return val;
				}
			}]);

			return Makaba;
		})(BaseBoard);

		ibEngines.push(['body.makaba', Makaba]);
		ibDomains['2ch.hk'] = Makaba;
		ibDomains['2ch.pm'] = Makaba;

		var Futaba = (function (_BaseBoard2) {
			_inherits(Futaba, _BaseBoard2);

			function Futaba(prot, dm) {
				_classCallCheck(this, Futaba);

				var _this52 = _possibleConstructorReturn(this, Object.getPrototypeOf(Futaba).call(this, prot, dm));

				_this52.qDForm = 'form:not([enctype])';
				_this52.qForm = 'form:nth-of-type(1)';
				_this52.qFormRedir = null;
				_this52.qFormRules = '.chui';
				_this52.qOmitted = 'font[color="#707070"]';
				_this52.qPostImg = 'a[href$=".jpg"] > img, a[href$=".png"] > img, a[href$=".gif"] > img';
				_this52.qPostRef = '.del';
				_this52.qRPost = 'td:nth-child(2)';

				_this52.docExt = '.htm';
				_this52.thrid = 'resto';
				return _this52;
			}

			_createClass(Futaba, [{
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
				key: 'css',
				get: function get() {
					return '\n\t\t\t.ftbl { width: auto; margin: 0; }\n\t\t\t.reply { background: #f0e0d6; }\n\t\t\tspan { font-size: inherit; }';
				}
			}, {
				key: 'qImgName',
				get: function get() {
					return 'a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]';
				}
			}]);

			return Futaba;
		})(BaseBoard);

		ibEngines.push(['form[action*="futaba.php"]', Futaba]);

		var Tinyboard = (function (_BaseBoard3) {
			_inherits(Tinyboard, _BaseBoard3);

			function Tinyboard(prot, dm) {
				_classCallCheck(this, Tinyboard);

				var _this53 = _possibleConstructorReturn(this, Object.getPrototypeOf(Tinyboard).call(this, prot, dm));

				_this53.tiny = true;

				_this53.cReply = 'post reply';
				_this53.qClosed = '.fa-lock';
				_this53.qDForm = 'form[name*="postcontrols"]';
				_this53.qFileInfo = '.fileinfo';
				_this53.qForm = 'form[name="post"]';
				_this53.qFormPassw = 'input[name="password"]';
				_this53.qFormRedir = null;
				_this53.qOmitted = '.omitted';
				_this53.qPages = '.pages > a:nth-last-of-type(2)';
				_this53.qPostHeader = '.intro';
				_this53.qPostMsg = '.body';
				_this53.qPostName = '.name';
				_this53.qPostSubj = '.subject';
				_this53.qPostTrip = '.trip';
				_this53.qPostRef = '.post_no + a';
				_this53.qTrunc = '.toolong';

				_this53.firstPage = 1;
				_this53.hasCatalog = true;
				_this53.jsonSubmit = true;
				_this53.timePattern = 'nn+dd+yy++w++hh+ii+ss';
				_this53.thrid = 'thread';

				_this53._qTable = '.post.reply';
				return _this53;
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
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return p > 1 ? fixBrd(b) + p + this.docExt : fixBrd(b);
				}
			}, {
				key: 'getSubmitData',
				value: function getSubmitData(json) {
					return { error: json.error, postNum: +json.id };
				}
			}, {
				key: 'getTNum',
				value: function getTNum(op) {
					return +$q('input[type="checkbox"]', op).name.match(/\d+/)[0];
				}
			}, {
				key: 'init',
				value: function init() {
					$script('window.FormData = void 0;');
					var form = $q('form[name="post"][action="/post.php"]');
					if (form) {
						form.insertAdjacentHTML('beforeend', '<input name="json_response" value="1" type="hidden"/>');
					}
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return '\n\t\t\t.banner, ' + (this.t ? '' : '.de-btn-rep,') + ' .hide-thread-link, .mentioned, .post-hover { display: none !important; }\n\t\t\tdiv.post.reply { float: left; clear: left; display: block; }';
				}
			}, {
				key: 'qImgName',
				get: function get() {
					return 'p.fileinfo > a:first-of-type';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ["'''", "''", '__', '~~', '**', '[code'];
				}
			}]);

			return Tinyboard;
		})(BaseBoard);

		ibEngines.push(['form[name*="postcontrols"]', Tinyboard]);

		var Vichan = (function (_Tinyboard) {
			_inherits(Vichan, _Tinyboard);

			function Vichan(prot, dm) {
				_classCallCheck(this, Vichan);

				var _this54 = _possibleConstructorReturn(this, Object.getPrototypeOf(Vichan).call(this, prot, dm));

				_this54.qDelPassw = '#password';

				_this54.multiFile = true;
				return _this54;
			}

			_createClass(Vichan, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '';
					for (var i = 0, len = 5; i < len; ++i) {
						str += '<div' + (i === 0 ? '' : ' style="display: none;"') + '><input type="file" name="file' + (i === 0 ? '' : i + 1) + '"/></div>';
					}
					$id('upload').lastChild.innerHTML = str;
				}
			}, {
				key: 'init',
				value: function init() {
					_get(Object.getPrototypeOf(Vichan.prototype), 'init', this).call(this);
					setTimeout(function () {
						$del($id('updater'));
					}, 0);
					if (locStorage['file_dragdrop'] !== 'false') {
						locStorage['file_dragdrop'] = false;
						window.location.reload();
						return true;
					}
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Object.getPrototypeOf(Vichan.prototype), 'css', this) + '\n\t\t\t.boardlist { position: static !important; }\n\t\t\tbody { padding: 0 5px !important; }\n\t\t\t.fileinfo { width: 250px; }\n\t\t\t.multifile { width: auto !important; }\n\t\t\t#expand-all-images, #expand-all-images + .unimportant, .post-btn, small { display: none !important; }';
				}
			}]);

			return Vichan;
		})(Tinyboard);

		ibEngines.push(['tr#upload', Vichan]);

		var Kusaba = (function (_BaseBoard4) {
			_inherits(Kusaba, _BaseBoard4);

			function Kusaba(prot, dm) {
				_classCallCheck(this, Kusaba);

				var _this55 = _possibleConstructorReturn(this, Object.getPrototypeOf(Kusaba).call(this, prot, dm));

				_this55.kus = true;

				_this55.qError = 'h1, h2, div[style*="1.25em"]';
				_this55.qFormRedir = 'input[name="redirecttothread"][value="1"]';

				_this55.markupBB = true;
				return _this55;
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
						$del(el.previousSibling);
						$del(el.nextSibling);
						$del(el);
					}
				}
			}, {
				key: 'css',
				get: function get() {
					return '\n\t\t\t.extrabtns > a, .extrabtns > span, #newposts_get, .replymode, .ui-resizable-handle, blockquote + a { display: none !important; }\n\t\t\t.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }';
				}
			}]);

			return Kusaba;
		})(BaseBoard);

		ibEngines.push(['script[src*="kusaba"]', Kusaba]);
		ibEngines.push(['form#delform[action$="/board.php"]', Kusaba]);

		var _0chan = (function (_Kusaba) {
			_inherits(_0chan, _Kusaba);

			function _0chan(prot, dm) {
				_classCallCheck(this, _0chan);

				var _this56 = _possibleConstructorReturn(this, Object.getPrototypeOf(_0chan).call(this, prot, dm));

				_this56.qFormRedir = '#gotothread';
				_this56.qOPost = '.postnode';

				_this56.hasCatalog = true;
				_this56.ru = true;
				return _this56;
			}

			_createClass(_0chan, [{
				key: 'fixVideo',
				value: function fixVideo(isPost, data) {
					var videos = [],
					    els = $Q('.youtube.embed', isPost ? data.el : data);
					for (var i = 0, len = els.length; i < len; ++i) {
						var el = els[i];
						var id = el.getAttribute('data-id');
						var m = ['https://www.youtube.com/watch?v=' + id, id];
						videos.push([isPost ? data : this.getPostOfEl(el), m, true]);
						$del(el.parentNode);
					}
					return videos;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Object.getPrototypeOf(_0chan.prototype), 'css', this) + '.logo + hr, table[border="0"] + hr, .uibutton { display: none; }';
				}
			}]);

			return _0chan;
		})(Kusaba);

		ibEngines.push(['.maintable[width="98%"]', _0chan]);

		var Phutaba = (function (_BaseBoard5) {
			_inherits(Phutaba, _BaseBoard5);

			function Phutaba(prot, dm) {
				_classCallCheck(this, Phutaba);

				var _this57 = _possibleConstructorReturn(this, Object.getPrototypeOf(Phutaba).call(this, prot, dm));

				_this57.cReply = 'post';
				_this57.qError = '.error';
				_this57.qFormRedir = 'input[name="gb2"][value="thread"]';
				_this57.qOPost = '.thread_OP';
				_this57.qPages = '.pagelist > li:nth-last-child(2)';
				_this57.qPostHeader = '.post_head';
				_this57.qPostMsg = '.text';
				_this57.qPostSubj = '.subject';
				_this57.qPostTrip = '.tripcode';
				_this57.qRPost = '.thread_reply';
				_this57.qTrunc = '.tldr';

				_this57.docExt = '';
				_this57.firstPage = 1;
				_this57.markupBB = true;
				_this57.multiFile = true;
				_this57.res = 'thread/';
				return _this57;
			}

			_createClass(Phutaba, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '><input name="file" type="file"/></div>';
					el.removeAttribute('onchange');
					el.parentNode.parentNode.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(el) {
					return el.parentNode.parentNode;
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
				key: 'css',
				get: function get() {
					return '\n\t\t\t.content > hr, .de-parea > hr, .de-pview > .doubledash { display: none !important }\n\t\t\t.de-pview > .post { margin-left: 0; border: none; }\n\t\t\t#de-win-reply { float:left; margin-left:2em }';
				}
			}, {
				key: 'qImgName',
				get: function get() {
					return '.filename > a';
				}
			}]);

			return Phutaba;
		})(BaseBoard);

		ibEngines.push(['link[href$="phutaba.css"]', Phutaba]);

	

		var _0chanCc = (function (_chan) {
			_inherits(_0chanCc, _chan);

			function _0chanCc(prot, dm) {
				_classCallCheck(this, _0chanCc);

				var _this58 = _possibleConstructorReturn(this, Object.getPrototypeOf(_0chanCc).call(this, prot, dm));

				_this58.markupBB = false;
				return _this58;
			}

			_createClass(_0chanCc, [{
				key: 'markupTags',
				get: function get() {
					return ['**', '*', '[u', '[s', '%%', '[code'];
				}
			}]);

			return _0chanCc;
		})(_0chan);

		ibDomains['0chan.cc'] = _0chanCc;

		var _0chanSo = (function (_chan2) {
			_inherits(_0chanSo, _chan2);

			function _0chanSo() {
				_classCallCheck(this, _0chanSo);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_0chanSo).apply(this, arguments));
			}

			_createClass(_0chanSo, [{
				key: 'init',
				value: function init() {
					if (this.host !== 'www.0-chan.ru') {
						window.location.hostname = 'www.0-chan.ru';
						return true;
					}
					return false;
				}
			}]);

			return _0chanSo;
		})(_0chan);

		ibDomains['0-chan.ru'] = _0chanSo;
		ibDomains['0chan.so'] = _0chanSo;

		var _02chNet = (function (_BaseBoard6) {
			_inherits(_02chNet, _BaseBoard6);

			function _02chNet(prot, dm) {
				_classCallCheck(this, _02chNet);

				var _this60 = _possibleConstructorReturn(this, Object.getPrototypeOf(_02chNet).call(this, prot, dm));

				_this60.qFormRedir = 'input[name="gb2"][value="thread"]';

				_this60.ru = true;
				_this60.timePattern = 'yyyy+nn+dd++w++hh+ii+ss';
				return _this60;
			}

			return _02chNet;
		})(BaseBoard);

		ibDomains['02ch.net'] = _02chNet;

		var _02chSu = (function (_Kusaba2) {
			_inherits(_02chSu, _Kusaba2);

			function _02chSu(prot, dm) {
				_classCallCheck(this, _02chSu);

				var _this61 = _possibleConstructorReturn(this, Object.getPrototypeOf(_02chSu).call(this, prot, dm));

				_this61.hasCatalog = true;

				_this61._capUpdPromise = null;
				return _this61;
			}

			_createClass(_02chSu, [{
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					return this.updateCaptcha(cap);
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					var _this62 = this;

					if (this._capUpdPromise) {
						this._capUpdPromise.cancel();
					}
					return this._capUpdPromise = $ajax('/captcha_update.php').then(function (xhr) {
						_this62._capUpdPromise = null;
						cap.trEl.innerHTML = xhr.responseText;
						cap.textEl = $id('recaptcha_response_field');
						cap.initImage($q('img', cap.trEl));
						cap.initTextEl();
					}, function (e) {
						if (!(e instanceof CancelError)) {
							_this62._capUpdPromise = null;
							return CancelablePromise.reject(e);
						}
					});
				}
			}]);

			return _02chSu;
		})(Kusaba);

		ibDomains['02ch.su'] = _02chSu;

		var _2chruNet = (function (_BaseBoard7) {
			_inherits(_2chruNet, _BaseBoard7);

			function _2chruNet(prot, dm) {
				_classCallCheck(this, _2chruNet);

				var _this63 = _possibleConstructorReturn(this, Object.getPrototypeOf(_2chruNet).call(this, prot, dm));

				_this63._2chruNet = true;

				_this63.qFormRedir = 'input[name="noko"]';
				_this63.qPages = '#pager > li:nth-last-child(2)';

				_this63._capUpdPromise = null;
				return _this63;
			}

			_createClass(_2chruNet, [{
				key: 'disableRedirection',
				value: function disableRedirection(el) {
					$hide($parent(el, 'LABEL'));
					el.checked = true;
				}
			}, {
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					return this.updateCaptcha(cap);
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					var _this64 = this;

					if (this._capUpdPromise) {
						this._capUpdPromise.cancel();
					}
					return this._capUpdPromise = $ajax('/' + this.b + '/api/requires-captcha').then(function (xhr) {
						_this64._capUpdPromise = null;
						if (JSON.parse(xhr.responseText)['requires-captcha'] !== '1') {
							return CancelablePromise.reject();
						}
						$id('captchaimage').src = '/' + _this64.b + '/captcha?' + Math.random();
						if (!$id('de-_2chruNet-capchecker')) {
							cap.textEl.insertAdjacentHTML('afterend', '\n\t\t\t\t\t<span id="de-_2chruNet-capchecker" class="shortened" style="margin: 0px .5em;">\n\t\t\t\t\t\tпроверить капчу\n\t\t\t\t\t</span>');
							cap.textEl.nextSibling.onclick = function (_ref49) {
								var target = _ref49.target;

								$ajax('/' + _this64.b + '/api/validate-captcha', { method: 'POST' }).then(function (xhr) {
									if (JSON.parse(xhr.responseText).status === 'ok') {
										target.innerHTML = 'можно постить';
									} else {
										target.innerHTML = 'неверная капча';
										setTimeout(function () {
											return target.innerHTML = 'проверить капчу';
										}, 1e3);
									}
								}, emptyFn);
							};
						}
					}, function (e) {
						if (!(e instanceof CancelError)) {
							_this64._capUpdPromise = null;
							return CancelablePromise.reject(e);
						}
					});
				}
			}, {
				key: 'css',
				get: function get() {
					return '\n\t\t\t' + (this.t ? '' : '#postform em, ') + '.small, .replymode { display: none; }\n\t\t\ttr#captcha_tr { display: table-row; }';
				}
			}]);

			return _2chruNet;
		})(BaseBoard);

		ibDomains['2chru.net'] = _2chruNet;
		ibDomains['2-chru.net'] = _2chruNet;
		ibDomains['2chru.cafe'] = _2chruNet;
		ibDomains['2-chru.cafe'] = _2chruNet;
		ibDomains['dmirrgetyojz735v.onion'] = _2chruNet;

		var _2chRu = (function (_BaseBoard8) {
			_inherits(_2chRu, _BaseBoard8);

			function _2chRu(prot, dm) {
				_classCallCheck(this, _2chRu);

				var _this65 = _possibleConstructorReturn(this, Object.getPrototypeOf(_2chRu).call(this, prot, dm));

				_this65.qPages = 'table[border="1"] td > a:last-of-type';

				_this65.docExt = '.html';
				_this65.hasPicWrap = true;
				_this65.jsonSubmit = true;
				_this65.markupBB = true;
				_this65.multiFile = true;
				_this65.ru = true;

				_this65._qTable = 'table:not(.postfiles)';
				return _this65;
			}

			_createClass(_2chRu, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '><input name="file" maxlength="4" ' + 'accept="|sid|7z|bz2|m4a|flac|lzh|mo3|rar|spc|fla|nsf|jpg|mpp|aac|gz|xm|wav|' + 'mp3|png|it|lha|torrent|swf|zip|mpc|ogg|jpeg|gif|mod" type="file"/></div>';
					el.parentNode.innerHTML = '<div' + str + ('<div style="display: none;"' + str).repeat(3);
				}
			}, {
				key: 'getCaptchaSrc',
				value: function getCaptchaSrc(src, tNum) {
					return '/' + this.b + '/captcha.fpl?' + Math.random();
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
							error += ":\n" + json.error.text;
						}
					}
					return { error: error, postNum: postNum };
				}
			}, {
				key: 'init',
				value: function init() {
					var el = $q('#postform input[type="button"]');
					if (el) {
						$replace(el, '<input type="submit" value="Отправить"/>');
					}
					el = $q(this.qDForm);
					$each($Q('input[type="hidden"]', el), $del);
					el.appendChild($q('.userdelete'));
					return false;
				}
			}, {
				key: 'initCaptcha',
				value: function initCaptcha() {
					$id('captchadiv').innerHTML = '<img src="' + this.getCaptchaSrc() + '" style="vertical-align: bottom;" id="imgcaptcha"/>';
					return null;
				}
			}, {
				key: 'repFn',
				value: function repFn(str) {
					return str.replace(/data-original="\//g, 'src="/');
				}
			}, {
				key: 'css',
				get: function get() {
					return 'span[id$="_display"], #fastload { display: none; }';
				}
			}, {
				key: 'qThread',
				get: function get() {
					return '.threadz';
				}
			}]);

			return _2chRu;
		})(BaseBoard);

		ibDomains['2--ch.ru'] = _2chRu;
		ibDomains['2-ch.su'] = _2chRu;

		var _410chanOrg = (function (_Kusaba3) {
			_inherits(_410chanOrg, _Kusaba3);

			function _410chanOrg(prot, dm) {
				_classCallCheck(this, _410chanOrg);

				var _this66 = _possibleConstructorReturn(this, Object.getPrototypeOf(_410chanOrg).call(this, prot, dm));

				_this66.qFormRedir = 'input#noko';
				_this66.qPages = '.pgstbl > table > tbody > tr > td:nth-child(2)';

				_this66.markupBB = false;
				_this66.timePattern = 'dd+nn+yyyy++w++hh+ii+ss';
				return _this66;
			}

			_createClass(_410chanOrg, [{
				key: 'getCaptchaSrc',
				value: function getCaptchaSrc(src, tNum) {
					return src.replace(/\?[^?]+$|$/, '?board=' + aib.b + '&' + Math.random());
				}
			}, {
				key: 'getSage',
				value: function getSage(post) {
					var el = $q('.filetitle', post);
					return el && el.textContent.includes('⇩');
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Object.getPrototypeOf(_410chanOrg.prototype), 'css', this) + '\n\t\t\tbody { margin: 0 }\n\t\t\t#resizer { display: none; }\n\t\t\t.topmenu { position: static; }';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['**', '*', '__', '^^', '%%', '`'];
				}
			}]);

			return _410chanOrg;
		})(Kusaba);

		ibDomains['410chan.org'] = _410chanOrg;

		var _4chanOrg = (function (_BaseBoard9) {
			_inherits(_4chanOrg, _BaseBoard9);

			function _4chanOrg(prot, dm) {
				_classCallCheck(this, _4chanOrg);

				var _this67 = _possibleConstructorReturn(this, Object.getPrototypeOf(_4chanOrg).call(this, prot, dm));

				_this67.fch = true;

				_this67.cReply = 'post reply';
				_this67.qBan = 'strong[style="color: red;"]';
				_this67.qClosed = '.archivedIcon';
				_this67.qDelBut = '.deleteform > input[type="submit"]';
				_this67.qError = '#errmsg';
				_this67.qFileInfo = '.fileText';
				_this67.qForm = 'form[name="post"]';
				_this67.qFormRedir = null;
				_this67.qOmitted = '.summary.desktop';
				_this67.qOPost = '.op';
				_this67.qPages = '.pagelist > .pages:not(.cataloglink) > a:last-of-type';
				_this67.qPostHeader = '.postInfo';
				_this67.qPostImg = '.fileThumb > img:not(.fileDeletedRes)';
				_this67.qPostName = '.name';
				_this67.qPostRef = '.postInfo > .postNum';
				_this67.qPostSubj = '.subject';

				_this67.anchor = '#p';
				_this67.docExt = '';
				_this67.firstPage = 1;
				_this67.hasCatalog = true;
				_this67.hasTextLinks = true;
				_this67.res = 'thread/';
				_this67.timePattern = 'nn+dd+yy+w+hh+ii-?s?s?';
				_this67.thrid = 'resto';

				_this67._qTable = '.replyContainer';
				return _this67;
			}

			_createClass(_4chanOrg, [{
				key: 'getFileInfo',
				value: function getFileInfo(wrap) {
					var el = $q(this.qFileInfo, wrap);
					return el ? el.lastChild.textContent : '';
				}
			}, {
				key: 'getPageUrl',
				value: function getPageUrl(b, p) {
					return fixBrd(b) + (p > 1 ? p : '');
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
				key: 'getWrap',
				value: function getWrap(el, isOp) {
					return el.parentNode;
				}
			}, {
				key: 'init',
				value: function init() {
					Cfg.findImgFile = 0;
					return false;
				}
			}, {
				key: 'repFn',
				value: function repFn(str) {
					return str.replace(/<\/?wbr>/g, '').replace(/ \(OP\)<\/a/g, '</a').replace(/<span class="deadlink">&gt;&gt;(\d+)<\/span>/g, '<a class="de-ref-del" href="#p$1">&gt;&gt;$1</a>');
				}
			}, {
				key: 'css',
				get: function get() {
					return '\n\t\t\t.backlink, #blotter, .extButton, hr.desktop, .navLinks, .postMenuBtn, #togglePostFormLink { display: none !important; }\n\t\t\t.postForm { display: table !important; width: auto !important; }\n\t\t\ttextarea { margin-right: 0 !important; }';
				}
			}, {
				key: 'qFormSubj',
				get: function get() {
					return 'input[name="sub"]';
				}
			}, {
				key: 'qImgName',
				get: function get() {
					return '.fileText > a';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['', '', '', '', '[spoiler'];
				}
			}, {
				key: 'updateCaptcha',
				get: function get() {
					var el = $id('captchaFormPart'),
					    value = null;
					if (el) {
						docBody.insertAdjacentHTML('beforeend', '<div onclick="initRecaptcha();"></div>');
						value = (function (el) {
							$replace($id('g-recaptcha'), '<div id="g-recaptcha"></div>');
							this.click();
							$show(el);
							return null;
						}).bind(docBody.lastChild, el);
					}
					Object.defineProperty(this, 'updateCaptcha', { value: value });
					return value;
				}
			}]);

			return _4chanOrg;
		})(BaseBoard);

		ibDomains['4chan.org'] = _4chanOrg;

		var _8chNet = (function (_Vichan) {
			_inherits(_8chNet, _Vichan);

			function _8chNet(prot, dm) {
				_classCallCheck(this, _8chNet);

				var _this68 = _possibleConstructorReturn(this, Object.getPrototypeOf(_8chNet).call(this, prot, dm));

				_this68._capUpdPromise = null;
				return _this68;
			}

			_createClass(_8chNet, [{
				key: 'initCaptcha',
				value: function initCaptcha(cap) {
					$q('td', cap.trEl).innerHTML = '\n\t\t\t<input placeholder="{ Lng.cap[lang] }" class="captcha_text" type="text" name="captcha_text" size="25" maxlength="6" autocomplete="off"/>\n\t\t\t<input class="captcha_cookie" name="captcha_cookie" type="hidden"/>\n\t\t\t<div class="captcha_html"></div>';
					cap.textEl = $q('.captcha_text', cap.trEl);
					return this.updateCaptcha(cap, true);
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap) {
					var _this69 = this;

					if (this._capUpdPromise) {
						this._capUpdPromise.cancel();
					}
					return this._capUpdPromise = $ajax('/8chan-captcha/entrypoint.php?mode=get&extra=abcdefghijklmnopqrstuvwxyz').then(function (xhr) {
						_this69._capUpdPromise = null;
						var resp = JSON.parse(xhr.responseText);
						$q('.captcha_cookie', cap.trEl).value = resp.cookie;
						$q('.captcha_html', cap.trEl).innerHTML = resp.captchahtml;
						var img = $q('img', cap.trEl);
						if (img) {
							cap.initImage(img);
						}
					})['catch'](function (e) {
						if (!(e instanceof CancelError)) {
							_this69._capUpdPromise = null;
							return CancelablePromise.reject(e);
						}
					});
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Object.getPrototypeOf(_8chNet.prototype), 'css', this) + '#post-moderation-fields { display: initial !important; }';
				}
			}]);

			return _8chNet;
		})(Vichan);

		ibDomains['8ch.net'] = _8chNet;
		ibDomains['oxwugzccvk3dk6tj.onion'] = _8chNet;

		var _7chanOrg = (function (_BaseBoard10) {
			_inherits(_7chanOrg, _BaseBoard10);

			function _7chanOrg() {
				_classCallCheck(this, _7chanOrg);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(_7chanOrg).apply(this, arguments));
			}

			_createClass(_7chanOrg, [{
				key: 'init',
				value: function init() {
					return true;
				}
			}]);

			return _7chanOrg;
		})(BaseBoard);

		ibDomains['7chan.org'] = _7chanOrg;

		var Arhivach = (function (_BaseBoard11) {
			_inherits(Arhivach, _BaseBoard11);

			function Arhivach(prot, dm) {
				_classCallCheck(this, Arhivach);

				var _this71 = _possibleConstructorReturn(this, Object.getPrototypeOf(Arhivach).call(this, prot, dm));

				_this71.cReply = 'post';
				_this71.qDForm = 'body > .container-fluid';
				_this71.qPostHeader = '.post_head';
				_this71.qPostImg = '.post_image > img';
				_this71.qPostMsg = '.post_comment_body';
				_this71.qPostRef = '.post_id, .post_head > b';
				_this71.qRPost = '.post:not(:first-child):not([postid=""])';

				_this71.docExt = '';
				_this71.res = 'thread/';
				return _this71;
			}

			_createClass(Arhivach, [{
				key: 'getFileInfo',
				value: function getFileInfo(wrap) {
					var data = wrap.firstElementChild.getAttribute('onclick').replace(/'/g, '').split(',');
					if (data[1].split('.')[2] === 'webm') {
						return null;
					}
					return data[2] + 'x' + data[3];
				}
			}, {
				key: 'getImgLink',
				value: function getImgLink(img) {
					return img.parentNode.parentNode.parentNode.lastElementChild;
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(el) {
					return el.parentNode.parentNode;
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
				key: 'getThrdUrl',
				value: function getThrdUrl(b, tNum) {
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
				key: 'css',
				get: function get() {
					return '\n\t\t\t.de-cfg-inptxt, .de-cfg-label, .de-cfg-select { display: inline; width: auto; height: auto !important; font: 13px/15px arial !important; }\n\t\t\t.de-cfg-label.de-block { display: block; }\n\t\t\t.post_replies, .post[postid=""] { display: none !important; }\n\t\t\t.post { overflow-x: auto !important; }';
				}
			}, {
				key: 'qImgName',
				get: function get() {
					return '.img_filename';
				}
			}, {
				key: 'qThread',
				get: function get() {
					return '.thread_inner';
				}
			}]);

			return Arhivach;
		})(BaseBoard);

		ibDomains['arhivach.org'] = Arhivach;

		var Diochan = (function (_Kusaba4) {
			_inherits(Diochan, _Kusaba4);

			function Diochan() {
				_classCallCheck(this, Diochan);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(Diochan).apply(this, arguments));
			}

			_createClass(Diochan, [{
				key: 'css',
				get: function get() {
					return _get(Object.getPrototypeOf(Diochan.prototype), 'css', this) + '.resize { display: none; }';
				}
			}]);

			return Diochan;
		})(Kusaba);

		ibDomains['diochan.com'] = Diochan;
		ibDomains['niuchan.org'] = Diochan;

		var Dobrochan = (function (_BaseBoard12) {
			_inherits(Dobrochan, _BaseBoard12);

			function Dobrochan(prot, dm) {
				_classCallCheck(this, Dobrochan);

				var _this73 = _possibleConstructorReturn(this, Object.getPrototypeOf(Dobrochan).call(this, prot, dm));

				_this73.dobr = true;

				_this73.qClosed = 'img[src="/images/locked.png"]';
				_this73.qDForm = 'form[action*="delete"]';
				_this73.qError = '.post-error, h2';
				_this73.qFileInfo = '.fileinfo';
				_this73.qFormRedir = 'select[name="goto"]';
				_this73.qOmitted = '.abbrev > span:last-of-type';
				_this73.qPages = '.pages > tbody > tr > td';
				_this73.qPostMsg = '.postbody';
				_this73.qPostSubj = '.replytitle';
				_this73.qTrunc = '.abbrev > span:nth-last-child(2)';

				_this73.anchor = '#i';
				_this73.hasPicWrap = true;
				_this73.multiFile = true;
				_this73.ru = true;
				_this73.timePattern = 'dd+m+?+?+?+?+?+yyyy++w++hh+ii-?s?s?';
				return _this73;
			}

			_createClass(Dobrochan, [{
				key: 'disableRedirection',
				value: function disableRedirection(el) {
					$hide($parent(el, 'TR'));
					el.selectedIndex = 1;
				}
			}, {
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					el = $id('files_parent');
					$each($Q('input[type="file"]', el), function (el) {
						el.removeAttribute('onchange');
					});
					el.firstElementChild.value = 1;
				}
			}, {
				key: 'getImgLink',
				value: function getImgLink(img) {
					var el = img.parentNode;
					return el.tagName === 'A' ? el : $q('.fileinfo > a', img.previousElementSibling ? el : el.parentNode);
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(el) {
					return el.tagName === 'A' ? (el.previousElementSibling ? el : el.parentNode).parentNode : el.firstElementChild.tagName === 'IMG' ? el.parentNode : el;
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
							spawn(readCfg).then(function () {
								return saveCfg('__hanarating', $id('rating').value);
							});
						});
						return true;
					}
					$script('window.UploadProgress = function() {};');
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
						$hide($q('img', cap.trEl));
						$show(cap.trEl);
					}
					return null;
				}
			}, {
				key: 'insertYtPlayer',
				value: function insertYtPlayer(msg, playerHtml) {
					var prev = msg.previousElementSibling,
					    el = prev.tagName === 'BR' ? prev : msg;
					el.insertAdjacentHTML('beforebegin', playerHtml);
					return el.previousSibling;
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap, isErr) {
					var img = $q('img', cap.trEl);
					if (!img) {
						return null;
					}
					if (cap.textEl) {
						var src = img.getAttribute('src').split('/').slice(0, -1).join('/') + "/" + Date.now() + '.png';
						img.src = '';
						img.src = src;
					} else if (isErr) {
						var el = img.parentNode;
						el.innerHTML = '';
						el.appendChild(img);
						img.insertAdjacentHTML('afterend', '<br><input placeholder="Капча" autocomplete="off" id="captcha" name="captcha" size="35" type="text"/>');
						$show(img);
						cap.renew();
					}
					return null;
				}
			}, {
				key: 'css',
				get: function get() {
					return '\n\t\t\t.delete > img, .popup, .reply_, .search_google, .search_iqdb { display: none; }\n\t\t\t.delete { background: none; }\n\t\t\t.delete_checkbox { position: static !important; }\n\t\t\t.file + .de-video-obj { float: left; margin: 5px 20px 5px 5px; }\n\t\t\t.de-video-obj + div { clear: left; }';
				}
			}]);

			return Dobrochan;
		})(BaseBoard);

		ibDomains['dobrochan.com'] = Dobrochan;
		ibDomains['dobrochan.org'] = Dobrochan;
		ibDomains['dobrochan.ru'] = Dobrochan;

		var DvaChNet = (function (_BaseBoard13) {
			_inherits(DvaChNet, _BaseBoard13);

			function DvaChNet(prot, dm) {
				_classCallCheck(this, DvaChNet);

				var _this74 = _possibleConstructorReturn(this, Object.getPrototypeOf(DvaChNet).call(this, prot, dm));

				_this74.getCaptchaSrc = null;
				_this74.ru = true;

				_this74._capUpdPromise = null;
				return _this74;
			}

			_createClass(DvaChNet, [{
				key: 'init',
				value: function init() {
					var el = $id('submit_button');
					if (el) {
						$del(el.previousElementSibling);
						$replace(el, '<input type="submit" id="submit" name="submit" value="Ответ"/>');
					}
					return false;
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha() {
					var _this75 = this;

					if (this._capUpdPromise) {
						this._capUpdPromise.cancel();
						this._capUpdPromise = null;
					}
					return !$id('imgcaptcha') ? null : this._capUpdPromise = $ajax('/cgi/captcha?task=get_id').then(function (xhr) {
						_this75._capUpdPromise = null;
						var id = xhr.responseText;
						$id('imgcaptcha').src = '/cgi/captcha?task=get_image&id=' + id;
						$id('captchaid').value = id;
					}, function (e) {
						if (!(e instanceof CancelError)) {
							_this75._capUpdPromise = null;
						}
					});
				}
			}]);

			return DvaChNet;
		})(BaseBoard);

		ibDomains['dva-ch.net'] = DvaChNet;

		var Iichan = (function (_BaseBoard14) {
			_inherits(Iichan, _BaseBoard14);

			function Iichan(prot, dm) {
				_classCallCheck(this, Iichan);

				var _this76 = _possibleConstructorReturn(this, Object.getPrototypeOf(Iichan).call(this, prot, dm));

				_this76.hasCatalog = true;
				return _this76;
			}

			_createClass(Iichan, [{
				key: 'getCatalogUrl',
				value: function getCatalogUrl() {
					return this.prot + '//' + this.host + '/' + this.b + '/catalogue.html';
				}
			}, {
				key: 'init',
				value: function init() {
					defaultCfg.addSageBtn = 0;
					docBody.insertAdjacentHTML('beforeend', '<div onclick="highlight = function() {}"></div>');
					docBody.lastChild.click();
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return !this.t ? '' : '\n\t\t\t#de-main { margin-top: -37px; }\n\t\t\t.logo { margin-bottom: 14px; }';
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
			}]);

			return Iichan;
		})(BaseBoard);

		ibDomains['iichan.hk'] = Iichan;

		var Krautchan = (function (_BaseBoard15) {
			_inherits(Krautchan, _BaseBoard15);

			function Krautchan(prot, dm) {
				_classCallCheck(this, Krautchan);

				var _this77 = _possibleConstructorReturn(this, Object.getPrototypeOf(Krautchan).call(this, prot, dm));

				_this77.cReply = 'postreply';
				_this77.qBan = '.ban_mark';
				_this77.qClosed = 'img[src="/images/locked.gif"]';
				_this77.qDForm = 'form[action*="delete"]';
				_this77.qError = '.message_text';
				_this77.qFileInfo = '.fileinfo';
				_this77.qFormRedir = 'input#forward_thread';
				_this77.qFormRules = '#rules_row';
				_this77.qOmitted = '.omittedinfo';
				_this77.qPages = 'table[border="1"] > tbody > tr > td > a:nth-last-child(2) + a';
				_this77.qPostHeader = '.postheader';
				_this77.qPostImg = 'img[id^="thumbnail_"]';
				_this77.qPostRef = '.postnumber';
				_this77.qPostSubj = '.postsubject';
				_this77.qRPost = '.postreply';
				_this77.qTrunc = 'p[id^="post_truncated"]';

				_this77.hasCatalog = true;
				_this77.hasPicWrap = true;
				_this77.hasTextLinks = true;
				_this77.markupBB = true;
				_this77.multiFile = true;
				_this77.res = 'thread-';
				_this77.timePattern = 'yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?';
				return _this77;
			}

			_createClass(Krautchan, [{
				key: 'fixFileInputs',
				value: function fixFileInputs(el) {
					var str = '';
					for (var i = 0, len = 4; i < len; ++i) {
						str += '<div' + (i === 0 ? '' : ' style="display: none;"') + '><input type="file" name="file_' + i + '" tabindex="7"/></div>';
					}
					var node = $id('files_parent');
					node.innerHTML = str;
					node.removeAttribute('id');
				}
			}, {
				key: 'getCatalogUrl',
				value: function getCatalogUrl() {
					return this.prot + '//' + this.host + '/catalog/' + this.b;
				}
			}, {
				key: 'getImgWrap',
				value: function getImgWrap(el) {
					return el.parentNode;
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
					for (var i = 0, len = scripts.length; i < len; ++i) {
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
					var pMsg = msg.parentNode,
					    prev = pMsg.previousElementSibling,
					    node = prev.hasAttribute('style') ? prev : pMsg;
					node.insertAdjacentHTML('beforebegin', playerHtml);
					return node.previousSibling;
				}
			}, {
				key: 'repFn',
				value: function repFn(str) {
					return str.replace(/href="(#\d+)"/g, 'href="/' + aib.b + '/thread-' + aib.t + '.html$1"').replace(/<span class="invalidquotelink">&gt;&gt;(\d+)<\/span>/g, '<a class="de-ref-del" href="#$1">&gt;&gt;$1</a>');
				}
			}, {
				key: 'updateCaptcha',
				value: function updateCaptcha(cap, isErr) {
					if (isErr && !cap.hasCaptcha) {
						cap.hasCaptcha = true;
						cap.initCaptcha(false, false);
					}
					var sessionId = null;
					var cookie = doc.cookie;
					if (cookie.includes('desuchan.session')) {
						for (var _iterator28 = cookie.split(';'), _isArray28 = Array.isArray(_iterator28), _i29 = 0, _iterator28 = _isArray28 ? _iterator28 : _iterator28[Symbol.iterator]();;) {
							var _ref50;

							if (_isArray28) {
								if (_i29 >= _iterator28.length) break;
								_ref50 = _iterator28[_i29++];
							} else {
								_i29 = _iterator28.next();
								if (_i29.done) break;
								_ref50 = _i29.value;
							}

							var c = _ref50;

							var m = c.match(/^\s*desuchan\.session=(.*)$/);
							if (m) {
								sessionId = unescape(m[1].replace(/\+/g, ' '));
								break;
							}
						}
					}
					var id = this.b + (pr.tNum ? pr.tNum : '') + (sessionId ? '-' + sessionId : '') + '-' + new Date().getTime() + '-' + Math.round(100000000 * Math.random());
					var img = $q('img', cap.trEl);
					img.src = '';
					img.src = '/captcha?id=' + id;
					$q('input[name="captcha_name"]', cap.trEl).value = id;
					return null;
				}
			}, {
				key: 'css',
				get: function get() {
					return '\n\t\t\timg[src$="button-expand.gif"], img[src$="button-close.gif"], body > center > hr, form > div:first-of-type > hr, h2, .sage { display: none; }\n\t\t\t.de-thr-hid { float: none; }\n\t\t\t.de-video-obj + div { clear: left; }\n\t\t\tdiv[id^="Wz"] { z-index: 10000 !important; }\n\t\t\t.file_reply + .de-video-obj, .file_thread + .de-video-obj { margin: 5px 20px 5px 5px; float: left; }\n\t\t\tform[action="/paint"] > select { width: 105px; }\n\t\t\tform[action="/paint"] > input[type="text"] { width: 24px !important; }';
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
				key: 'qImgName',
				get: function get() {
					return '.filename > a';
				}
			}, {
				key: 'qThread',
				get: function get() {
					return '.thread_body';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['b', 'i', 'u', 's', 'spoiler', 'aa'];
				}
			}]);

			return Krautchan;
		})(BaseBoard);

		ibDomains['krautchan.net'] = Krautchan;

		var Lainchan = (function (_Vichan2) {
			_inherits(Lainchan, _Vichan2);

			function Lainchan(prot, dm) {
				_classCallCheck(this, Lainchan);

				var _this78 = _possibleConstructorReturn(this, Object.getPrototypeOf(Lainchan).call(this, prot, dm));

				_this78.qOPost = '.op';
				return _this78;
			}

			_createClass(Lainchan, [{
				key: 'css',
				get: function get() {
					return _get(Object.getPrototypeOf(Lainchan.prototype), 'css', this) + '\n\t\t\t.sidearrows { display: none !important; }\n\t\t\t.bar { position: static; }';
				}
			}]);

			return Lainchan;
		})(Vichan);

		ibDomains['lainchan.org'] = Lainchan;

		var MlpgCo = (function (_Vichan3) {
			_inherits(MlpgCo, _Vichan3);

			function MlpgCo(prot, dm) {
				_classCallCheck(this, MlpgCo);

				var _this79 = _possibleConstructorReturn(this, Object.getPrototypeOf(MlpgCo).call(this, prot, dm));

				_this79.qOPost = '.opContainer';
				return _this79;
			}

			return MlpgCo;
		})(Vichan);

		ibDomains['mlpg.co'] = MlpgCo;

		var Ponyach = (function (_BaseBoard16) {
			_inherits(Ponyach, _BaseBoard16);

			function Ponyach(prot, dm) {
				_classCallCheck(this, Ponyach);

				var _this80 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ponyach).call(this, prot, dm));

				_this80.multiFile = true;
				_this80.postMapInited = false;
				_this80.thrid = 'replythread';
				return _this80;
			}

			_createClass(Ponyach, [{
				key: 'checkForm',
				value: function checkForm(formEl, maybeSpells) {
					var _this81 = this;

				
					var myMaybeSpells = maybeSpells || new Maybe(SpellsRunner),
					    maybeVParser = new Maybe(Cfg.addYouTube ? VideosParser : null);
					if (!this.postMapInited) {
						this.postMapInited = true;
						$each($Q('.oppost[data-lastmodified], .reply[data-lastmodified]'), function (pEl) {
							return _this81.modifiedPosts.set(pEl, +pEl.getAttribute('data-lastmodified'));
						});
					}
					$each($Q('.oppost[data-lastmodified], .reply[data-lastmodified]', formEl), function (pEl) {
						var nPost,
						    post = pByNum.get(_this81.getPNum(pEl)),
						    pDate = +pEl.getAttribute('data-lastmodified');
						if (post && (!_this81.modifiedPosts.has(pEl) || _this81.modifiedPosts.get(pEl) < pDate)) {
							var thr = post.thr,
							    fragm = doc.createDocumentFragment();
							_this81.modifiedPosts.set(pEl, pDate);
							nPost = thr.addPost(fragm, pEl, post.count, post.prev, maybeVParser);
							if (thr.op === post) {
								thr.op = nPost;
							}
							if (thr.last === post) {
								thr.last = nPost;
							}
							if (post.next) {
								post.next.prev = nPost;
								nPost.next = post.next;
							}
							if (post.omitted) {
								nPost.omitted = true;
								nPost.wrap.classList.add('de-hidden');
							}
							myMaybeSpells.value.run(nPost);
							$before(post.wrap, fragm);
							$del(post.wrap);
						}
					});
					if (!maybeSpells) {
						myMaybeSpells.end();
					}
					maybeVParser.end();
				}
			}, {
				key: 'getPNum',
				value: function getPNum(post) {
					return +post.getAttribute('data-num');
				}
			}, {
				key: 'init',
				value: function init() {
					defaultCfg.postSameImg = 0;
					defaultCfg.removeEXIF = 0;
					return false;
				}
			}, {
				key: 'modifiedPosts',
				get: function get() {
				
					var val = new WeakMap();
					Object.defineProperty(this, 'modifiedPosts', { value: val });
					return val;
				}
			}]);

			return Ponyach;
		})(BaseBoard);

		ibDomains['ponya.ch'] = Ponyach;
		ibDomains['ponyach.cf'] = Ponyach;
		ibDomains['ponyach.ga'] = Ponyach;
		ibDomains['ponyach.ml'] = Ponyach;
		ibDomains['ponyach.ru'] = Ponyach;
		ibDomains['ponychan.ru'] = Ponyach;

		var Ponychan = (function (_Tinyboard2) {
			_inherits(Ponychan, _Tinyboard2);

			function Ponychan(prot, dm) {
				_classCallCheck(this, Ponychan);

				var _this82 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ponychan).call(this, prot, dm));

				_this82.qOPost = '.opContainer';
				return _this82;
			}

			_createClass(Ponychan, [{
				key: 'init',
				value: function init() {
					_get(Object.getPrototypeOf(Ponychan.prototype), 'init', this).call(this);
					$each($Q('img[data-mature-src]'), function (el) {
						el.src = el.getAttribute('data-mature-src');
					});
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Object.getPrototypeOf(Ponychan.prototype), 'css', this) + '\n\t\t\t.mature_thread { display: block !important; }\n\t\t\t.mature_warning { display: none; }';
				}
			}]);

			return Ponychan;
		})(Tinyboard);

		ibDomains['ponychan.net'] = Ponychan;

		var Synch = (function (_Tinyboard3) {
			_inherits(Synch, _Tinyboard3);

			function Synch(prot, dm) {
				_classCallCheck(this, Synch);

				var _this83 = _possibleConstructorReturn(this, Object.getPrototypeOf(Synch).call(this, prot, dm));

				_this83.qFileInfo = '.unimportant';

				_this83.markupBB = true;
				return _this83;
			}

			_createClass(Synch, [{
				key: 'init',
				value: function init() {
					var val = '{"simpleNavbar":true,"showInfo":true}';
					if (locStorage['settings'] !== val) {
						locStorage['settings'] = val;
						window.location.reload();
						return true;
					}
					_get(Object.getPrototypeOf(Synch.prototype), 'init', this).call(this);
					defaultCfg.timePattern = 'w+dd+m+yyyy+hh+ii+ss';
					defaultCfg.timeOffset = 4;
					defaultCfg.correctTime = 1;
					return false;
				}
			}, {
				key: 'css',
				get: function get() {
					return _get(Object.getPrototypeOf(Synch.prototype), 'css', this) + '\n\t\t\t.fa-sort { display: none; }\n\t\t\ttime::after { content: none; }';
				}
			}, {
				key: 'markupTags',
				get: function get() {
					return ['b', 'i', 'u', 's', 'spoiler', 'code', 'sub', 'sup'];
				}
			}]);

			return Synch;
		})(Tinyboard);

		ibDomains['syn-ch.ru'] = Synch;
		ibDomains['syn-ch.com'] = Synch;
		ibDomains['syn-ch.org'] = Synch;

		var Uchan = (function (_BaseBoard17) {
			_inherits(Uchan, _BaseBoard17);

			function Uchan(prot, dm) {
				_classCallCheck(this, Uchan);

				var _this84 = _possibleConstructorReturn(this, Object.getPrototypeOf(Uchan).call(this, prot, dm));

				_this84.qFormRedir = '#noko';
				return _this84;
			}

			_createClass(Uchan, [{
				key: 'disableRedirection',
				value: function disableRedirection(el) {
					$hide($parent(el, 'TR'));
					el.checked = false;
				}
			}, {
				key: 'css',
				get: function get() {
					return '\n\t\t\timg[src="/tr.png"], small { display: none; }\n\t\t\tform[action$="/paint.pl"] { width: 280px; }\n\t\t\tinput[name="oek_x"], input[name="oek_y"] { width: 30px !important; }';
				}
			}, {
				key: 'qImgName',
				get: function get() {
					return '.filesize > a:first-of-type';
				}
			}]);

			return Uchan;
		})(BaseBoard);

		ibDomains['uchan.to'] = Uchan;

		var prot = window.location.protocol;
		localRun = prot === 'file:';
		var dm = localRun ? (window.location.pathname.match(/\/([^-]+)-[^-]+-[^\.]+\.[a-z]+$/) || [, ''])[1] : window.location.hostname.match(/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/)[0];
		if (checkDomains && dm in ibDomains) {
			return new ibDomains[dm](prot, dm);
		}
		if (checkEngines) {
			for (var i = ibEngines.length - 1; i >= 0; --i) {
				var _ibEngines$i = _slicedToArray(ibEngines[i], 2);

				var path = _ibEngines$i[0];
				var Ctor = _ibEngines$i[1];

				if ($q(path, doc)) {
					return new Ctor(prot, dm);
				}
			}
			return new BaseBoard(prot, dm);
		}
		return null;
	}




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
					(function () {
						try {
							data = JSON.parse(val);
						} catch (err) {
							return;
						}
						if (data[0] === aib.b) {
							myPosts.add(data[1]);
							$each($Q('[de-form] a[href*="' + aib.anchor + data[1] + '"]'), function (el) {
								el.classList.add('de-ref-my');
							});
						}
					})();
				case '__de-webmvolume':
					val = +val || 0;
					Cfg.webmVolume = val;
					temp = $q('input[info="webmVolume"]');
					if (temp) {
						temp.value = val;
					}
					break;
				case '__de-post':
					(function () {
						try {
							data = JSON.parse(val);
						} catch (err) {
							return;
						}
						temp = data.hide;
						if (data.brd === aib.b && (post = pByNum.get(data.num)) && post.hidden ^ temp) {
							post.setUserVisib(temp, data.date, false);
						} else {
							uVis[data.num] = [+!temp, data.date];
						}
						if (data.isOp) {
							if (!(data.brd in hThr)) {
								if (temp) {
									hThr[data.brd] = {};
								} else {
									toggleWindow('hid', true);
									return;
								}
							}
							if (temp) {
								hThr[data.brd][data.num] = data.title;
							} else {
								delete hThr[data.brd][data.num];
							}
						}
						toggleWindow('hid', true);
					})();
					return;
				case 'de-threads':
					(function () {
						try {
							hThr = JSON.parse(val || '{}') || {};
						} catch (err) {
							hThr = {};
						}
						if (!(aib.b in hThr)) {
							hThr[aib.b] = {};
						}
						Thread.first.updateHidden(hThr[aib.b]);
						toggleWindow('hid', true);
					})();
					return;
				case '__de-spells':
					(function () {
						try {
							data = JSON.parse(val);
						} catch (err) {
							return;
						}
						Cfg.hideBySpell = data.hide;
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
							Spells.disable();
							temp = $id('de-spell-txt');
							if (temp) {
								temp.value = '';
							}
						}
						$show(docBody);
					})();
								default:
					return;
			}
		});
	}

	function parseURL() {
		var url;
		if (localRun) {
			url = window.location.pathname.match(/\/[^-]+-([^-]+)-([^\.]+)\.[a-z]+$/);
			aib.prot = 'http:';
			aib.host = aib.dm;
			aib.b = url ? url[1] : '';
			aib.t = url ? +url[2] : '';
			aib.docExt = '.html';
		} else {
			var temp;
			url = (window.location.pathname || '').replace(/^\//, '');
			if (url.match(aib.res)) {
				temp = url.split(aib.res);
				aib.b = temp[0].replace(/\/$/, '');
				aib.t = +temp[1].match(/^\d+/)[0];
				aib.page = aib.firstPage;
			} else {
				temp = url.match(/\/?(\d+)[^\/]*?$/);
				aib.page = temp && +temp[1] || aib.firstPage;
				aib.b = url.replace(temp && aib.page ? temp[0] : /\/(?:[^\/]+\.[a-z]+)?$/, '');
			}
			if (aib.docExt === null) {
				temp = url.match(/\.[a-z]+$/);
				aib.docExt = temp ? temp[0] : '.html';
			}
		}
	}

	function addSVGIcons() {
		docBody.insertAdjacentHTML('beforeend', '\n\t<div id="de-svg-icons" style="height: 0; width: 0; position: fixed;">\n\t<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t<defs>\n\t\t<linearGradient id="de-btn-back-gradient" x1="50%" y1="0%" y2="100%" x2="50%">\n\t\t\t<stop offset="0%" stop-color="#A0A0A0"/>\n\t\t\t<stop offset="50%" stop-color="#505050"/>\n\t\t\t<stop offset="100%" stop-color="#A0A0A0"/>\n\t\t</linearGradient>\n\t</defs>\n\t<!-- POST ICONS -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-back">\n\t\t<path class="de-svg-back" d="M4 1q-3 0,-3 3v8q0 3,3 3h8q3 0,3 -3v-8q0 -3,-3-3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-hide">\n\t\t<use class="de-svg-back" xlink:href="#de-symbol-post-back"/>\n\t\t<line class="de-svg-stroke" stroke-width="2.5" x1="4.5" y1="11.5" x2="11.5" y2="4.5"/>\n\t\t<line class="de-svg-stroke" stroke-width="2.5" x1="11.5" y1="11.5" x2="4.5" y2="4.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-unhide">\n\t\t<use class="de-svg-back" xlink:href="#de-symbol-post-back"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="8" y1="4" x2="8" y2="12"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="4" y1="8" x2="12" y2="8"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-rep">\n\t\t<use class="de-svg-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M5 11c0 .8.6 1.2 1.3.7l5-3c.6-.4.6-1 0-1.5l-5-3C5.6 4 5 4.3 5 5v6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-expthr">\n\t\t<use class="de-svg-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M4.5 6L8 3l3.5 3H9.25v4h2.25L8 13 4.5 10h2.25V6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-fav">\n\t\t<use class="de-svg-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M8 3l1.5 3 3.5.5-2.5 2.2 1 3.8-3.5-2-3.5 2 1-3.8L3 6.5 6.5 6 8 3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-stick">\n\t\t<use class="de-svg-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M5 5h6v6H5z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-sage">\n\t\t<use class="de-svg-back" xlink:href="#de-symbol-post-back"/>\n\t\t<path class="de-svg-fill" d="M4 9h8l-4 4.5zM6 3h4v1h-4zM6 5h4v1h-4zM6 7h4v1h-4z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-post-src">\n\t\t<use class="de-svg-back" xlink:href="#de-symbol-post-back"/>\n\t\t<circle class="de-svg-stroke" cx="7" cy="7" r="2.5" stroke-width="2"/>\n\t\t<line class="de-svg-stroke" stroke-width="2" x1="9" y1="9" x2="12" y2="12"/>\n\t</symbol>\n\t<!-- WINDOW ICONS -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-win-arrow">\n\t\t<path class="de-svg-stroke" stroke-width="3.5" d="M8 13V6"/>\n\t\t<path class="de-svg-fill"  d="M3.5 7h9L8 2.5 3.5 7z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-win-close">\n\t\t<path class="de-svg-stroke" stroke-width="2.5" d="M3.5 3.5l9 9m-9 0l9-9"/>\n\t</symbol>\n\t<!-- NAVIGATION PANEL ICONS -->\n\t<symbol viewBox="0 0 7 7" id="de-symbol-nav-arrow">\n\t\t<path class="de-svg-fill" d="M6 3.5L2 0v7z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 24 24" id="de-symbol-nav-up">\n\t\t<path class="de-svg-stroke" stroke-width="3" stroke-miterlimit="10" d="M3 22.5l9-9 9 9M3 13.5l9-9 9 9"/>\n\t</symbol>\n\t<symbol viewBox="0 0 24 24" id="de-symbol-nav-down">\n\t\t<path class="de-svg-stroke" stroke-width="3" stroke-miterlimit="10" d="M3 11.5l9 9 9-9M3 2.5l9 9 9-9"/>\n\t</symbol>\n\t<!-- MAIN PANEL -->\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-logo">\n\t\t<path class="de-svg-fill" d="M22 5h-10v16h4v-14h6z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M22 20.5H12c-2.8 0-5.7 0-5.7-4s2.8-4 5.7-4H21"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-cfg">\n\t\t<circle class="de-svg-stroke" stroke-width="3" cx="12.5" cy="12.5" r="6"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 6.5v-3M18.5 12.5h3M12.5 18.5v3M6.5 12.5h-3M16.7 8.3L19 6M16.7 16.7L19 19M8.3 16.7L6 19M8.3 8.3L6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-hid">\n\t\t<path class="de-svg-stroke" stroke-width="4" d="M6 19L19 6M6 6l13 13"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-fav">\n\t\t<path class="de-svg-fill" d="M12.5 3.5l2.5 6 6.5.5-5 4.2 2 6.8-6-4-6 4 2-6.8-5-4.2 6.5-.5 2.5-6z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-vid">\n\t\t<path class="de-svg-fill" d="M12.5 4a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1 13c-1.3 1-2.5.2-2.5-1.4V9.4C9 7.8 10.2 7 11.6 8l5.3 3c1.3.8 1.3 2.2 0 3l-5.4 3z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-refresh">\n\t\t<path class="de-svg-fill" d="M14 4v4.3a4.5 4.5 0 1 1-3 0V4a8.5 8.5 0 1 0 3 0z"/>\n\t\t<path class="de-svg-fill" d="M13 11V4h7"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-arrow">\n\t\t<path class="de-svg-stroke" stroke-width="5" d="M4 12.5h12"/>\n\t\t<path class="de-svg-fill" d="M14 19V6l7 6.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-expimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M8 12.5h9"/>\n\t\t<path class="de-svg-fill" d="M10 8v9l-5-4.5M15 17V8l5 4.5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-maskimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" d="M5 20L20 5M5 15.5L15.5 5M5 11l6-6M20 9.5L9.5 20M20 14l-6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-preimg">\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M20 18c0 1-1 2-2 2H7c-1 0-2-1-2-2V7c0-1 1-2 2-2h11c1 0 2 1 2 2v11z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 17V9"/>\n\t\t<path class="de-svg-fill" d="M8 15h9l-4.5 5"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-savethr">\n\t\t<path class="de-svg-fill" d="M18 4h-1v6H8V4H6C5 4 4 5 4 6v13c0 1 1 2 2 2h13c1 0 2-1 2-2V7l-3-3zM6 20v-8h13v8H6z"/>\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M13.5 9V4"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-upd">\n\t\t<circle cx="12.5" cy="10.8" r="4"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" stroke-linejoin="round" d="M4.5 12q8-10,16 0q-8 10,-16 0z"/>\n\t\t<path class="de-svg-stroke" d="M11 7L9.8 5M14 7l1.2-2M11 17l-1.2 2m4.2-2l1.2 2M7 8.5L5.3 6.8M7 15.5l-1.7 1.7M18 8.5l1.7-1.7M18 15.5l1.7 1.7"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-off">\n\t\t<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4l5 5z"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M15 9.5l6 6m0-6l-6 6"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-audio-on">\n\t\t<path class="de-svg-fill" d="M13 21V4L8 9H4v7h4z"/>\n\t\t<path class="de-svg-stroke" stroke-width="2" d="M15.5 7.5c1.7 3.3 1.7 6.7 0 10m3-12.5c3 5 3 10 0 15"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-catalog">\n\t\t<path class="de-svg-fill" d="M5 5h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 5h3v3H9zM5 9h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zM9 9h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9zm-4 4h3v3H5zm12 0h3v3h-3zm-4 0h3v3h-3zm-4 0h3v3H9z"/>\n\t</symbol>\n\t<symbol viewBox="0 0 25 25" id="de-symbol-panel-enable">\n\t\t<path class="de-svg-stroke" stroke-width="3" d="M12.5 4v8"/>\n\t\t<path class="de-svg-fill" d="M16 4.8v4a5 5 0 0 1-3.5 8.7A5 5 0 0 1 9 9V4.7a8.5 8.5 0 1 0 7 0z"/>\n\t</symbol>\n\t<!-- ----------------- -->\n\t<symbol viewBox="0 0 16 16" id="de-symbol-wait">\n\t\t<circle fill="#929087" cx="8" cy="2" r="2"/>\n\t\t<circle fill="#C5C2BA" cx="8" cy="14" r="2"/>\n\t\t<circle fill="#ACAAA0" cx="2" cy="8" r="2"/>\n\t\t<circle fill="#79766C" cx="14" cy="8" r="2"/>\n\t\t<circle fill="#D2CFC6" cx="12.25" cy="12.25" r="2"/>\n\t\t<circle fill="#9F9C93" cx="3.75" cy="3.75" r="2"/>\n\t\t<circle fill="#B9B6AE" cx="3.75" cy="12.25" r="2"/>\n\t\t<circle fill="#868379" cx="12.25" cy="3.75" r="2"/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-closed">\n\t\t<image display="inline" width="16" height="16" xlink:href="data:image/gif;base64,R0lGODlhEAAQAKIAAP3rqPPOd+y6V+WmN+Dg4M7OzmZmZv///yH5BAEAAAcALAAAAAAQABAAAANCeLrWvZARUqqJkjiLj9FMcWHf6IldGZqM4zqRAcw0zXpAoO/6LfeNnS8XcAhjAIHSoFwim0wockCtUodWq+/1UiQAADs="/>\n\t</symbol>\n\t<symbol viewBox="0 0 16 16" id="de-symbol-unavail">\n\t\t<circle fill="none" stroke="#CF4436" stroke-width="2" cx="8" cy="8" r="6"/>\n\t\t<path stroke="#CF4436" stroke-width="2" d="M3.8 3.8l8.4 8.4"/>\n\t</symbol>\n\t</svg>\n\t</div>');
	}




	var DelForm = (function () {
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
			key: 'doReplace',
			value: function doReplace(formEl) {
				if (aib.needRep) {
					formEl.insertAdjacentHTML('beforebegin', replaceString(formEl.outerHTML));
					$hide(formEl);
					formEl.id = 'de-dform-old';
					formEl = formEl.previousSibling;
					window.addEventListener('load', function () {
						return $del($id('de-dform-old'));
					});
				}
				return formEl;
			}
		}, {
			key: 'getThreads',
			value: function getThreads(formEl) {
				var threads = $Q(aib.qThread, formEl),
				    len = threads.length;
				if (len === 0) {
					if (localRun) {
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
						formEl.insertBefore(cThr.lastElementChild, node);
						var el = cThr.lastElementChild;
						if (el.tagName === 'BR') {
							formEl.insertBefore(el, node);
						}
						threads.push(cThr);
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
			var prev = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

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
					console.log('Repeated thread ' + num + '.');
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
				if (!localRun) {
					if (Cfg.ajaxReply === 2) {
						el.onsubmit = $pd;
						var btn = $q(aib.qDelBut, el);
						if (btn) {
							btn.onclick = function (e) {
								$pd(e);
								pr.closeReply();
								$popup(Lng.deleting[lang], 'delete', true);
								spawn(html5Submit, el, e.target).then(function (dc) {
									return checkDelete(dc);
								}, function (e) {
									return $popup(getErrorMessage(e), 'delete', false);
								});
							};
						}
					} else if (Cfg.ajaxReply === 1) {
						el.target = 'de-iframe-dform';
						el.onsubmit = function () {
							pr.closeReply();
							$popup(Lng.deleting[lang], 'delete', true);
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
				processImageNames(el);
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
	})();

	DelForm.tNums = new Set();

	function replaceString(txt) {
		if (dTime) {
			txt = dTime.fix(txt);
		}
		if (aib.repFn) {
			txt = aib.repFn(txt);
		}
		if (aib.hasTextLinks) {
			txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/[^"<>]*?)(<\/a>)?(?=$|<|\s)/ig, function (x, a, b, c) {
				return c ? x : a + '<a rel="noreferrer" href="' + b + '">' + b + '</a>';
			});
		}
		if (Spells.reps) {
			txt = Spells.replace(txt);
		}
		if (Cfg.crossLinks) {
			txt = txt.replace(aib.reCrossLinks, function (str, b, tNum, pNum) {
				return '>&gt;&gt;/' + b + '/' + (pNum || tNum) + '<';
			});
		}
		return txt;
	}

	function replacePost(el) {
		if (aib.needRep) {
			el.innerHTML = replaceString(el.innerHTML);
		}
		return el;
	}

	function initThreadUpdater(title, enableUpdate) {
		var focusLoadTime,
		    paused = false,
		    enabled = false,
		    disabledByUser = true,
		    lastECode = 200,
		    sendError = false,
		    newPosts = 0,
		    hasYouRefs = false;

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
				var _this85 = this;

				this.stop();
				if (this.repeatMS === 0) {
					this._el.play();
					return;
				}
				this._playInterval = setInterval(function () {
					return _this85._el.play();
				}, this.repeatMS);
			},
			stop: function stop() {
				if (this._playInterval) {
					clearInterval(this._playInterval);
					this._playInterval = null;
				}
			},

			get _el() {
				var value = $new('audio', { 'preload': 'auto', 'src': gitRaw + 'signal.ogg' }, null);
				Object.defineProperty(this, '_el', { value: value });
				return value;
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
				var _this86 = this;

				if (this._enabled && useCounter) {
					var seconds = delayMS / 1000;
					this._set(seconds);
					this._countingIV = setInterval(function () {
						seconds--;
						if (seconds === 0) {
							_this86._stop();
							callback();
						} else {
							_this86._set(seconds);
						}
					}, 1000);
				} else {
					this._countingTO = setTimeout(function () {
						_this86._countingTO = null;
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
				var _this87 = this;

				if (this._isInited) {
					return;
				}
				this._isInited = true;
				var icon = new Image();
				icon.onload = function (e) {
					try {
						_this87._initIconsHelper(e.target);
					} catch (e) {
						console.error('Icon error:', e);
					}
				};
				icon.src = aib.fch ? '/favicon.ico' : this._iconEl.href;
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
				var el = $q('head link[rel="shortcut icon"]', doc.head);
				Object.defineProperties(this, {
					'_iconEl': { value: el, writable: true },
					'originalIcon': { value: el ? el.href : null }
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
				drawLines(ctx, [14.5, 14.5, 7.5, 7.5], [7.5, 14.5, 14.5, 7.5], '#FA2020', 1.5, scale);
				this._iconError = canvas.toDataURL('image/png');
				ctx.putImageData(original, 0, 0);
				drawLines(ctx, [6, 11, 16, 11], [11, 6, 11, 16], '#404020', 4, scale);
				drawLines(ctx, [7, 11, 15, 11], [11, 7, 11, 15], '#E6E000', 2, scale);
				this._iconNew = canvas.toDataURL('image/png');
				ctx.putImageData(original, 0, 0);
				drawLines(ctx, [6, 11, 16, 11], [11, 6, 11, 16], '#1C5F23', 4, scale);
				drawLines(ctx, [7, 11, 15, 11], [11, 7, 11, 15], '#00F51B', 2, scale);
				this._iconYou = canvas.toDataURL('image/png');
				this._hasIcons = true;
			},
			_setIcon: function _setIcon(iconUrl) {
				$del(this._iconEl);
				doc.head.insertAdjacentHTML('afterbegin', '<link rel="shortcut icon" href="' + iconUrl + '">');
				this._iconEl = doc.head.firstChild;
			},
			_startBlink: function _startBlink(iconUrl) {
				var _this88 = this;

				if (this._blinkInterval) {
					if (this._currentIcon === iconUrl) {
						return;
					}
					clearInterval(this._blinkInterval);
				}
				this._currentIcon = iconUrl;
				this._blinkInterval = setInterval(function () {
					_this88._setIcon(_this88._isOriginalIcon ? _this88._currentIcon : _this88.originalIcon);
					_this88._isOriginalIcon = !_this88._isOriginalIcon;
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
				var _this89 = this;

				var post = Thread.first.last,
				    notif = new Notification(aib.dm + '/' + aib.b + '/' + aib.t + ': ' + newPosts + Lng.newPost[lang][lang !== 0 ? +(newPosts !== 1) : newPosts % 10 > 4 || newPosts % 10 === 0 || (newPosts % 100 / 10 | 0) === 1 ? 2 : newPosts % 10 === 1 ? 0 : 1] + Lng.newPost[lang][3], {
					'body': post.text.substring(0, 250).replace(/\s+/g, ' '),
					'tag': aib.dm + aib.b + aib.t,
					'icon': post.images.firstAttach ? post.images.firstAttach.src : favicon.originalIcon
				});
				notif.onshow = function () {
					return setTimeout(function () {
						if (notif === _this89._notifEl) {
							_this89.close();
						}
					}, 12e3);
				};
				notif.onclick = function () {
					return window.focus();
				};
				notif.onerror = function () {
					window.focus();
					_this89._requestPermission();
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
				var _this90 = this;

				this._granted = false;
				Notification.requestPermission(function (state) {
					if (state.toLowerCase() === 'denied') {
						saveCfg('desktNotif', 0);
					} else {
						_this90._granted = true;
					}
				});
			}
		};

		var updMachine = {
			start: function start() {
				var needSleep = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
				var loadOnce = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

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
				var updateStatus = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

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
					if (eCode === 404 && lastECode === 404) {
						updateTitle(eCode);
						disableUpdater();
					} else {
						lastECode = eCode;
						this._setUpdateStatus('warn');
						if (!Cfg.noErrInTitle) {
							updateTitle();
						}
						this._makeStep();
					}
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
						this._delay = this._initDelay;
					} else if (this._delay !== 12e4) {
						this._delay = Math.min(this._delay + this._initDelay, 12e4);
					}
				}
				this._makeStep();
			},
			_makeStep: function _makeStep() {
				var _this91 = this;

				var needSleep = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

				while (true) {
					switch (this._state) {
						case 0:
							if (needSleep) {
								this._state = 1;
								counter.count(this._delay, !doc.hidden, function () {
									return _this91._makeStep();
								});
								return;
							}
												case 1:
							counter.setWait();
							this._state = 2;
							this._loadPromise = Thread.first.loadNew(true).then(function (pCount) {
								return _this91._handleNewPosts(pCount, AjaxError.Success);
							}, function (e) {
								return _this91._handleNewPosts(0, e);
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
							console.error('Invalid State!', this._state, new Error().stack);
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
			disabledByUser = paused = false;
			newPosts = 0;
			hasYouRefs = false;
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
			var eCode = arguments.length <= 0 || arguments[0] === undefined ? lastECode : arguments[0];

			doc.title = (sendError === true ? '{' + Lng.error[lang] + '} ' : '') + (eCode === 200 ? '' : '{' + eCode + '} ') + (newPosts === 0 ? '' : '[' + newPosts + '] ') + title;
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
				$popup(Lng.loading[lang], 'newposts', true);
				forceLoadPosts();
			},
			pause: function pause() {
				if (enabled && !paused) {
					updMachine.stop();
					paused = true;
				}
			},
			'continue': function _continue() {
				var needSleep = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

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
				hasYouRefs = true;
			}
		};
	}

	function initPage() {
		if (!localRun && Cfg.ajaxReply === 1) {
			docBody.insertAdjacentHTML('beforeend', '<iframe name="de-iframe-pform" sandbox="" src="about:blank" style="display: none;"></iframe>' + '<iframe name="de-iframe-dform" sandbox="" src="about:blank" style="display: none;"></iframe>');
			doc.defaultView.addEventListener('message', function (_ref51) {
				var data = _ref51.data;

				switch (data.substr(0, 15)) {
					case 'de-iframe-pform':
						checkUpload($DOM(data.substr(15)));
						$q('iframe[name="de-iframe-pform"]').src = 'about:blank';
						break;
					case 'de-iframe-dform':
						checkDelete($DOM(data.substr(15)));break;
				}
			});
		}
		if (aib.t) {
			if (Cfg.rePageTitle) {
				doc.title = '/' + aib.b + ' - ' + Thread.first.op.title;
			}
			if (!localRun) {
				Cfg.stats.view++;
				saveComCfg(aib.dm, Cfg);
				Thread.first.el.insertAdjacentHTML('afterend', '<div class="de-thread-buttons">' + '<span class="de-thread-updater">[<a class="de-abtn" href="#"></a>' + '<span id="de-updater-count" style="display: none;"></span>]</span>' + (aib.mak ? '[<a class="de-abtn" href="#" onclick="UnbanShow();">Реквест разбана</a>]' : '') + '</div>');
			}
		} else {
			navPanel.init();
		}
		if (!localRun) {
			updater = initThreadUpdater(doc.title, aib.t && Cfg.ajaxUpdThr);
			if (aib.t) {
				Thread.first.el.nextSibling.firstChild.firstElementChild.addEventListener('click', updater.forceLoad);
			}
		}
	}

	function scrollPage() {
		if (!aib.t) {
			if (doc.hidden || needScroll) {
				window.scrollTo(0, 0);
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
				window.scrollTo(0, val);
				sesStorage.removeItem('de-scroll-' + aib.b + aib.t);
			} else if ((hash = window.location.hash) && (num = hash.match(/#[ip]?(\d+)$/)) && (num = +num[1]) && (post = pByNum.get(num)) && !post.isOp) {
				post.el.scrollIntoView(true);
				if (HotKeys.enabled) {
					HotKeys.cPost = post;
				}
				post.select();
			}
		}, 0);
	}

	function checkForUpdates(isForce, lastUpdateTime) {
		if (!isForce) {
			var day = 2 * 1000 * 60 * 60 * 24,
			    temp = Cfg.scrUpdIntrv;
			switch (temp) {
				case 0:
					temp = day;break;
				case 1:
					temp = day * 2;break;
				case 2:
					temp = day * 7;break;
				case 3:
					temp = day * 14;break;
				default:
					temp = day * 30;
			}
			if (Date.now() - +lastUpdateTime < temp) {
				return Promise.reject();
			}
		}
		return $ajax(gitRaw + 'Dollchan_Extension_Tools.meta.js', { 'Content-Type': 'text/plain' }, false).then(function (xhr) {
			var m = xhr.responseText.match(/@version\s+([0-9.]+)/),
			    dVer = m && m[1] ? m[1].split('.') : null;
			if (dVer) {
				var cVer = version.split('.');
				saveComCfg('lastUpd', Date.now());
				for (var i = 0, len = Math.max(cVer.length, dVer.length); i < len; ++i) {
					if ((+dVer[i] || 0) > (+cVer[i] || 0)) {
						return '<a style="color: blue; font-weight: bold;" href="' + gitRaw + 'Dollchan_Extension_Tools.user.js">' + Lng.updAvail[lang] + '</a>';
					} else if ((+dVer[i] || 0) < (+cVer[i] || 0)) {
						break;
					}
				}
				if (isForce) {
					return Lng.haveLatest[lang];
				}
			}
			return Promise.reject();
		}, function () {
			return isForce ? '<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lang] + '</div>' : Promise.reject();
		});
	}




	function getThemeLang() {
		return !Cfg.scriptStyle ? 'fr' : Cfg.scriptStyle === 1 ? 'en' : Cfg.scriptStyle === 2 ? 'de' : 'es';
	}

	function scriptCSS() {
		var cont = function cont(id, src) {
			return id + '::before { content: ""; padding-right: 16px; margin-right: 4px; background: url(' + src + ') no-repeat center; background-size: contain; }';
		};
		var gif = function gif(id, src) {
			return id + ' { background-image: url(data:image/gif;base64,' + src + '); background-repeat: no-repeat; background-position: center; }';
		};

	
		var p,
		    x = '#de-panel { position: fixed; right: 0; bottom: 0; z-index: 9999; border-radius: 15px 0 0 0; cursor: default; display: flex; min-height: 25px; color: #F5F5F5; }\
	#de-panel:lang(fr), .de-win-head:lang(fr) { background: linear-gradient(to bottom, #7b849b, #616b86 8%, #3a414f 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #121212 52%, #1f2740 100%); }\
	#de-panel:lang(en), .de-win-head:lang(en) { background: linear-gradient(to bottom, #4b90df, #3d77be 20%, #376cb0 28%, #295591 52%, rgba(0,0,0,0) 52%), linear-gradient(to bottom, rgba(0,0,0,0) 48%, #183d77 52%, #1f4485 72%, #264c90 80%, #325f9e 100%); }\
	#de-panel:lang(de), .de-win-head:lang(de) { background-color: #777; }\
	#de-panel:lang(es), .de-win-head:lang(es) { background-color: rgba(0,20,80,.72); }\
	#de-panel-logo { flex: none; margin: auto 3px auto 0; cursor: pointer; }\
	#de-panel-buttons { flex: 0 1 auto; display: flex; flex-flow: row wrap; align-items: center; padding: 0 0 0 2px; margin: 0; border-left: 1px solid #616b86; }\
	#de-panel-buttons:lang(en), #de-panel-info:lang(en) { border-color: #8fbbed; }\
	#de-panel-buttons:lang(de), #de-panel-info:lang(de) { border-color: #ccc; }\
	.de-panel-button { display: block; flex: none; margin: 0 1px; padding: 0; transition: all .3s ease; color: inherit !important; }\
	.de-panel-button:hover { color: inherit !important; }\
	.de-panel-button:lang(fr):hover, .de-panel-button:lang(en):hover, .de-panel-button:lang(es):hover { background-color: rgba(255,255,255,.15); box-shadow: 0 0 3px rgba(143,187,237,.5); }\
	.de-panel-svg, #de-panel-logo, .de-panel-logo-svg, .de-panel-button { width: 25px; height: 25px; }\
	.de-panel-svg:lang(de):hover { border: 2px solid #444; border-radius: 5px; box-sizing: border-box; transition: none; }\
	#de-panel-goback { transform: rotate(180deg); }\
	#de-panel-godown { transform: rotate(90deg); }\
	#de-panel-goup { transform: rotate(-90deg); }\
	#de-panel-upd-on { fill: #32ff32; }\
	#de-panel-upd-warn { fill: #fff441; }\
	#de-panel-upd-off { fill: #ff3232; }\
	#de-panel-audio-on > .de-panel-svg > .de-use-audio-off, #de-panel-audio-off > .de-panel-svg > .de-use-audio-on { display: none; }\
	#de-panel-info { flex: none; padding: 0 6px; margin-left: 2px; border-left: 1px solid #616b86; font: 18px serif; }\
	.de-svg-back { fill: inherit; stroke: none; }\
	.de-svg-stroke { stroke: currentColor; fill: none; }\
	.de-svg-fill { stroke: none; fill: currentColor; }\
	use { fill: inherit; pointer-events: none; }';

		if (Cfg.disabled) {
			$css(x).id = 'de-css';
			return;
		}

	
		x += '.de-win .de-btn-toggle { transform: rotate(180deg); }\
	.de-resizer { position: absolute; }\
	.de-resizer-bottom { height: 6px; bottom: -3px; left: 0; right: 0; cursor: ns-resize; }\
	.de-resizer-left { width: 6px; top: 0px; bottom: 0px; left: -3px; cursor: ew-resize; }\
	.de-resizer-right { width: 6px; top: 0px; bottom: 0px; right: -3px; cursor: ew-resize; }\
	.de-resizer-top { height: 6px; top: -3px; left: 0; right: 0; cursor: ns-resize; }\
	.de-win > .de-win-head { cursor: move; }\
	.de-win-buttons { position: absolute; right: 0; margin: 0 2px 0 0; font-size: 0; cursor: pointer; }\
	#de-win-cfg { width: 355px; }\
	#de-win-cfg, #de-win-fav, #de-win-hid, #de-win-vid { position: fixed; max-height: 92%; overflow-x: hidden; overflow-y: auto; }\
	#de-win-cfg > .de-win-body { float: none; display: block; width: auto; min-width: 0; max-width: 100% !important; padding: 0; margin: 0 !important; border: none; }\
	#de-win-fav > .de-win-body, #de-win-hid > .de-win-body, #de-win-vid > .de-win-body { padding: 9px; border: 1px solid gray; }\
	#de-win-fav input[type="checkbox"] { flex: none; margin-left: 15px; }\
	#de-win-hid { max-width: 60%; }\
	#de-win-vid > .de-win-body { display: flex; flex-direction: column; align-items: center; }\
	#de-win-vid .de-entry { white-space: normal; }\
	.de-win-head { position: relative; padding: 2px; border-radius: 10px 10px 0 0; color: #F5F5F5; font: bold 14px/16px arial; text-align: center; cursor: default; }' +

	
		'.de-block { display: block; }\
	#de-btn-addspell { margin-left: auto; }\
	#de-cfg-bar { display: flex; margin: 0; padding: 0; }\
	#de-cfg-bar:lang(fr) { background-color: #1f2740; }\
	#de-cfg-bar:lang(en) { background-color: #325f9e; }\
	#de-cfg-bar:lang(de) { background-color: #777; }\
	#de-cfg-bar:lang(es) { background-color: rgba(0,20,80,.72); }\
	.de-cfg-body { min-height: 315px; padding: 9px 7px 7px; margin-top: -1px; font: 13px/15px arial !important; box-sizing: content-box; -moz-box-sizing: content-box; }\
	.de-cfg-body, #de-cfg-buttons { border: 1px solid #183d77; border-top: none; }\
	.de-cfg-body:lang(de), #de-cfg-buttons:lang(de) { border-color: #444; }\
	.de-cfg-button { padding: 0 ' + (nav.Firefox ? '2' : '4') + 'px !important; margin: 0 4px; height: 21px; font: 12px arial !important; }\
	#de-cfg-buttons { display: flex; align-items: center; padding: 3px; }\
	.de-cfg-chkbox { ' + (nav.Presto ? '' : 'vertical-align: -1px !important; ') + 'margin: 2px 1px !important; }\
	.de-cfg-depend { padding-left: 17px; }\
	.de-cfg-inptxt { width: auto; padding: 0 2px !important; margin: 1px 4px 1px 0 !important; font: 13px arial !important; }\
	.de-cfg-label { padding: 0; margin: 0; }\
	.de-cfg-lang-select { flex: 1 0 auto; }\
	.de-cfg-select { padding: 0 2px; margin: 1px 0; font: 13px arial !important; }\
	.de-cfg-tab { flex: 1 0 auto; display: block !important; margin: 0 !important; float: none !important; width: auto !important; min-width: 0 !important; padding: 4px 0 !important; box-shadow: none !important; border: 1px solid #444 !important; border-radius: 4px 4px 0 0 !important; opacity: 1; font: bold 12px arial; text-align: center; cursor: default; background-image: linear-gradient(to bottom, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\
	.de-cfg-tab:hover { background-image: linear-gradient(to top, rgba(132,132,132,.35) 0%, rgba(79,79,79,.35) 50%, rgba(40,40,40,.35) 50%, rgba(80,80,80,.35) 100%) !important; }\
	.de-cfg-tab:lang(fr) { border-color: #121421 !important; }\
	.de-cfg-tab:lang(en) { border-color: #183d77 !important; }\
	.de-cfg-tab:lang(es) { border-color: #001450 !important; }\
	.de-cfg-tab[selected], .de-cfg-tab[selected]:hover { background-image: none !important; border-bottom: none !important; }\
	.de-cfg-tab::' + (nav.Firefox ? '-moz-' : '') + 'selection { background: transparent; }\
	.de-cfg-unvis { display: none; }\
	#de-info-log, #de-info-stats { width: 100%; padding: 0px 7px; }\
	#de-info-log { overflow-y: auto; border-left: 1px solid grey; }\
	.de-info-name { flex: 1 0 auto; }\
	.de-info-row { display: flex; }\
	#de-info-table { display: flex; height: 257px; }\
	.de-spell-btn { padding: 0 4px; }\
	#de-spell-editor { display: flex; align-items: stretch; height: 225px; padding: 2px 0; }\
	#de-spell-panel { display: flex; }\
	#de-spell-txt { padding: 2px !important; margin: 0; width: 100%; min-width: 0; border: none !important; outline: none !important; font: 12px courier new; ' + (nav.Presto ? '' : 'resize: none !important; ') + '}\
	#de-spell-rowmeter { padding: 2px 3px 0 0; overflow: hidden; min-width: 2em; background-color: #616b86; text-align: right; color: #fff; font: 12px courier new; }\
	#de-spell-rowmeter:lang(de) { background-color: #777; }' +

	
		'.de-post-btns { margin-left: 4px; }\
	.de-post-note:not(:empty) { color: inherit; margin: 0 4px; vertical-align: 1px; font: italic bold 12px serif; }\
	.de-thread-note { font-style: italic; }\
	.de-btn-hide > .de-btn-unhide-use, .de-btn-unhide > .de-btn-hide-use, .de-btn-hide-user > .de-btn-unhide-use, .de-btn-unhide-user > .de-btn-hide-use { display: none; }\
	.de-btn-close, .de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-sage, .de-btn-src, .de-btn-stick, .de-btn-stick-on, .de-btn-toggle { transform: rotate(0deg); margin: 0 2px -3px 0 !important; cursor: pointer; width: 16px; height: 16px; }' + (pr.form || pr.oeForm ? '' : '.de-btn-rep { display: none; }') +

	
		cont('.de-src-google', 'https://google.com/favicon.ico') + cont('.de-src-yandex', 'https://yandex.ru/favicon.ico') + cont('.de-src-tineye', 'https://tineye.com/favicon.ico') + cont('.de-src-saucenao', 'https://saucenao.com/favicon.ico') + cont('.de-src-iqdb', '//iqdb.org/favicon.ico') +

	
		'.de-post-counter::after { counter-increment: de-cnt 1; content: counter(de-cnt); margin: 0 4px 0 2px; vertical-align: 1px; color: #4f7942; font: bold 11px tahoma; cursor: default; }\
	.de-post-deleted::after { content: "' + Lng.deleted[lang] + '"; margin: 0 4px 0 2px; vertical-align: 1px; color: #727579; font: bold 11px tahoma; cursor: default; }' +

	
		'#de-txt-panel { display: block; height: 23px; font-weight: bold; cursor: pointer; }\
	#de-txt-panel > span:empty { display: inline-block; width: 23px; height: 22px; margin: 0 2px; }' + gif('#de-btn-bold:empty', (p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ') + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==') + gif('#de-btn-italic:empty', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==') + gif('#de-btn-under:empty', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7') + gif('#de-btn-strike:empty', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7') + gif('#de-btn-spoil:empty', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==') + gif('#de-btn-code:empty', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=') + gif('#de-btn-sup:empty', p + 'Q3IKpq4YAgZiSQhGByrzn7YURGFGWhxzMuqqBGC7wRUNkeU7nnWNoMosFXKzi8BHs3EQnDRAHLY2e0BxnWfEJkRdT80NNTrliG3aWcBhZhgIAOw==') + gif('#de-btn-sub:empty', p + 'R3IKpq4YAgZiSxquujtOCvIUayAkVZEoRcjCu2wbivMw2WaYi7vVYYqMFYq/i8BEM4ZIrYOmpdD49m2VFd2oiUZTORWcNYT9SpnZrTjiML0MBADs=') + gif('#de-btn-quote:empty', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=') +

	
		'@keyframes de-open { 0% { transform: translateY(-100%); } 100% { transform: translateY(0); } }\
	@keyframes de-close { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }\
	@keyframes de-blink {\
		0%, 100% { transform: translateX(0); }\
		10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\
		20%, 40%, 60%, 80% { transform: translateX(10px); }\
	}\
	@keyframes de-post-open-tl { from { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
	@keyframes de-post-open-bl { from { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
	@keyframes de-post-open-tr { from { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
	@keyframes de-post-open-br { from { transform: translate(50%,50%) scale(0); opacity: 0; } }\
	@keyframes de-post-close-tl { to { transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
	@keyframes de-post-close-bl { to { transform: translate(-50%,50%) scale(0); opacity: 0; } }\
	@keyframes de-post-close-tr { to { transform: translate(50%,-50%) scale(0); opacity: 0; } }\
	@keyframes de-post-close-br { to { transform: translate(50%,50%) scale(0); opacity: 0; } }\
	@keyframes de-post-new { from { transform: translate(0,-50%) scaleY(0); opacity: 0; } }\
	@keyframes de-win-open { from { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
	@keyframes de-win-close { to { transform: translate(0,50%) scaleY(0); opacity: 0; } }\
	.de-pview-anim { animation-duration: .2s; animation-timing-function: ease-in-out; animation-fill-mode: both; }\
	.de-open { animation: de-open .15s ease-out both; }\
	.de-close { animation: de-close .15s ease-in both; }\
	.de-blink { animation: de-blink .7s ease-in-out both; }\
	.de-post-new { animation: de-post-new .2s ease-out both; }\
	.de-win-open { animation: de-win-open .2s ease-out backwards; }\
	.de-win-close { animation: de-win-close .2s ease-in both; }';

	
		p = Math.max(Cfg.minImgSize || 0, 50);
		x += '.de-img-pre, .de-img-full { display: block; border: none; outline: none; cursor: pointer; }\
	.de-img-pre { max-width: 200px; max-height: 200px; }\
	.de-img-load { position: absolute; z-index: 2; width: 50px; height: 50px; top: 50%; left: 50%; margin: -25px; }\
	.de-img-full, .de-img-wrapper-nosize { width: 100%; height: 100%; }\
	.de-img-wrapper-inpost { min-width: ' + p + 'px; min-height: ' + p + 'px; float: left; ' + (aib.multiFile ? '' : 'padding: 2px 5px; -moz-box-sizing: border-box; box-sizing: border-box; ') + '}\
	.de-img-wrapper-nosize { position: relative; }\
	.de-img-wrapper-nosize > .de-img-full { position: absolute; z-index: 1; opacity: .3; }\
	.de-img-center { position: fixed; margin: 0 !important; z-index: 9999; background-color: #ccc; border: 1px solid black !important; box-sizing: content-box; -moz-box-sizing: content-box; }\
	#de-img-btn-next, #de-img-btn-prev { position: fixed; top: 50%; z-index: 10000; height: 36px; width: 36px; background-repeat: no-repeat; background-position: center; background-color: black; cursor: pointer; }\
	#de-img-btn-next { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJPjI8JkO1vlpzS0YvzhUdX/nigR2ZgSJ6IqY5Uy5UwJK/l/eI6A9etP1N8grQhUbg5RlLKAJD4DAJ3uCX1isU4s6xZ9PR1iY7j5nZibixgBQA7); right: 0; border-radius: 10px 0 0 10px; }\
	#de-img-btn-prev { background-image: url(data:image/gif;base64,R0lGODlhIAAgAIAAAPDw8P///yH5BAEAAAEALAAAAAAgACAAQAJOjI8JkO24ooxPzYvzfJrWf3Rg2JUYVI4qea1g6zZmPLvmDeM6Y4mxU/v1eEKOpziUIA1BW+rXXEVVu6o1dQ1mNcnTckp7In3LAKyMchUAADs=); left: 0; border-radius: 0 10px 10px 0; }' +

	
		cont('.de-video-link.de-ytube', 'https://youtube.com/favicon.ico') + cont('.de-video-link.de-vimeo', 'https://vimeo.com/favicon.ico') + cont('.de-img-arch', 'data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') + cont('.de-img-audio', 'data:image/gif;base64,R0lGODlhEAAQAKIAAGya4wFLukKG4oq3802i7Bqy9P///wAAACH5BAEAAAYALAAAAAAQABAAQANBaLrcHsMN4QQYhE01OoCcQIyOYQGooKpV1GwNuAwAa9RkqTPpWqGj0YTSELg0RIYM+TjOkgba0sOaAEbGBW7HTQAAOw==') + '.de-current::after { content: " ●"; }\t.de-img-arch, .de-img-audio { margin-left: 4px; color: inherit; text-decoration: none; font-weight: bold; }\t.de-mp3 { margin: 5px 20px; }\t.de-video-obj { margin: 5px 20px; white-space: nowrap; }\t#de-video-btn-resize { padding: 0 14px 8px 0; margin: 0 8px; border: 2px solid; border-radius: 2px; }\t#de-video-btn-hide, #de-video-btn-prev { margin-left: auto; }\t#de-video-buttons { display: flex; align-items: center; width: 100%; line-height: 16px; }\t.de-video-expanded { width: 854px !important; height: 480px !important; }\t#de-video-list { padding: 0 0 4px; overflow-y: auto; width: 100%; }\t.de-video-refpost { margin: 0 2px; }\t.de-video-resizer::after { content: "➕"; margin: 0 -15px 0 3px; vertical-align: 6px; color: #000; font-size: 12px; cursor: pointer; }\t.de-video-player, .de-video-thumb { width: 100%; height: 100%; }\ta.de-video-player { display: inline-block; position: relative; border-spacing: 0; border: none; }\ta.de-video-player::after { content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAWCAQAAACMYb/JAAAArklEQVR4AYXSr05CYRjA4cPGxjRosTijdvNJzmD1CrwAvQWugASNwGg0MoErOIVCPCMx0hmBMaAA4mPX8/2rT/i+9/1lPu0M3MtCN1OAvS+NEFkDmHqoJwcAbHzUkb9n7C5FqLynCAzdpAhLrynCRc9VnEDpKUWYpUmZIlt5nBQeY889amvGPj33HBvdt45WbAELeWyNP/qu/8dwBrDyVp9UBRi5DYXZdTLxEs77F5bCVAHlDJ1UAAAAAElFTkSuQmCC"); position: absolute;top: 50%; left: 50%; padding: 12px 24px; margin: -22px 0 0 -32px; background-color: rgba(255,0,0,.4); border-radius: 8px; line-height: 0; }\ta.de-video-player:hover::after { background-color: rgba(255,0,0,.7); }\t.de-video-title[de-time]::after { content: " [" attr(de-time) "]"; color: red; }\t.de-vocaroo > embed { display: inline-block; }\ttd > a + .de-video-obj, td > img + .de-video-obj { display: inline-block; }\tvideo { background: black; }' +

	
		'.de-file { display: inline-block; margin: 1px; height: ' + (p = aib.multiFile ? 90 : 130) + 'px; width: ' + p + 'px; text-align: center; border: 1px dashed grey; }\
	.de-file > .de-file-del, .de-file > .de-file-spoil { float: right; }\
	.de-file > .de-file-rar { float: left; }\
	.de-file > .de-file-rarmsg { float: left; padding: 0 4px 2px; color: #fff; background-color: rgba(55,55,55,.5); }\
	.de-file > .de-file-utils { display: none; }\
	.de-file > div { display: table; width: 100%; height: 100%; cursor: pointer; }\
	.de-file > div > div { display: table-cell; vertical-align: middle; }\
	.de-file + [type="file"] { opacity: 0; margin: 1px 0 0 -' + (p + 2) + 'px !important; vertical-align: top; width: ' + (p + 2) + 'px !important; height: ' + (p + 2) + 'px; border: none !important; cursor: pointer; }\
	#de-file-area { border-spacing: 0; margin-top: 1px; width: 275px; min-width: 100%; max-width: 100%; overflow-x: auto; overflow-y: hidden; white-space: nowrap; }\
	.de-file-drag { background: rgba(88,88,88,.4); border: 1px solid grey; }\
	.de-file-hover > .de-file-utils { display: block !important; position: relative; margin: -18px 2px; }\
	.de-file-hover > .de-file-spoil { margin: -16px 21px; }\
	.de-file-img > img, .de-file-img > video { max-width: ' + (p - 4) + 'px; max-height: ' + (p - 4) + 'px; }\
	.de-file-input { max-width: 300px; }\
	.de-file-off > div > div::after { content: "' + Lng.noFile[lang] + '"; }\
	.de-file-rarmsg { margin: 0 5px; font: bold 11px tahoma; cursor: default; }\
	.de-file-del, .de-file-rar { display: inline-block; margin: 0 4px -3px; width: 16px; height: 16px; cursor: pointer; }\
	.de-file-spoil { display: none; }' + gif('.de-file-del', 'R0lGODlhEAAQALMOAP8zAMopAJMAAP/M//+DIP8pAP86Av9MDP9sFP9zHv9aC/9gFf9+HJsAAP///wAAACH5BAEAAA4ALAAAAAAQABAAAARU0MlJKw3B4hrGyFP3hQNBjE5nooLJMF/3msIkJAmCeDpeU4LFQkFUCH8VwWHJRHIM0CiIMwBYryhS4XotZDuFLUAg6LLC1l/5imykgW+gU0K22C0RADs=') + gif('.de-file-rar', 'R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==') +

	
		'#de-resizer-text { display: inline-block !important; float: none !important; padding: 5px; margin: ' + (nav.Presto ? '-2px -10px' : '0 0 -1px -11px') + '; vertical-align: bottom; border-bottom: 2px solid #666; border-right: 2px solid #666; cursor: se-resize; }\
	.de-parea { text-align: center; }\
	.de-parea-btn-close::after { content: "' + Lng.hideForm[lang] + '"; }\
	.de-parea-btn-thrd::after { content: "' + Lng.makeThrd[lang] + '"; }\
	.de-parea-btn-reply::after { content: "' + Lng.makeReply[lang] + '"; }\
	#de-pform > form { padding: 0; margin: 0; border: none; }\
	#de-pform input[type="text"], #de-pform input[type="file"] { width: 200px; }\
	.de-win-inpost { float: none; clear: left; display: inline-block; width: auto; padding: 3px; margin: 2px 0; }\
	.de-win-inpost > .de-resizer { display: none; }\
	.de-win-inpost > .de-win-head { background: none; color: inherit; }\
	#de-win-reply { width: auto !important; min-width: 0; padding: 0 !important; border: none !important; }\
	#de-win-reply.de-win { position: fixed !important; padding: 0 !important; margin: 0 !important; border-radius: 10px 10px 0 0; }\
	#de-win-reply.de-win > .de-win-body { padding: 2px 2px 0 1px; border: 1px solid gray; }\
	#de-win-reply.de-win .de-textarea { min-width: 98% !important; resize: none !important; }\
	#de-win-reply.de-win #de-resizer-text { display: none !important; }\
	#de-sagebtn { margin: 4px !important; vertical-align: top; cursor: pointer; }\
	.de-textarea { display: inline-block; padding: 3px !important; min-width: 275px !important; min-height: 90px !important; resize: both; transition: none !important; }' +

	
		'.de-content-block > a { color: inherit; font-weight: bold; font-size: 14px; }\t.de-content-block > input { margin: 0 4px; }\t.de-entry { display: flex !important; align-items: center; float: none !important; padding: 0 4px 0 0 !important; margin: 2px 0 !important; border: none !important; font-size: 14px; overflow: hidden !important; white-space: nowrap; }\t.de-entry > a { flex: none; text-decoration: none; border: none; }\t.de-entry > input { margin: 2px 4px; }\t.de-entry-title { flex: auto; padding-left: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\t.de-fav-inf { flex: none; padding-left: 10px; font: bold 14px serif; cursor: default; }\t.de-fav-inf-new { color: #424f79; }\t.de-fav-inf-new::after { content: " +"; }\t.de-fav-inf-old { color: #4f7942; }\t.de-fav-user::after { content: "★"; display: inline-block; font-size: 13px; margin: -1px -13px 0 2px; vertical-align: 1px; cursor: default; }\t.de-fav-inf-icon:not(.de-fav-closed):not(.de-fav-unavail):not(.de-fav-wait),\t\t.de-fav-closed > .de-fav-unavail-use, .de-fav-closed > .de-fav-wait-use,\t\t.de-fav-unavail > .de-fav-closed-use, .de-fav-unavail > .de-fav-wait-use,\t\t.de-fav-wait > .de-fav-closed-use, .de-fav-wait > .de-fav-unavail-use { display: none; }\t.de-fav-inf-icon, .de-fav-inf-iwrap  { width: 16px; height: 16px; }\t.de-fav-inf-icon { margin-bottom: -3px; }' +

	
		'#de-thr-navpanel { color: #F5F5F5; height: 98px; width: 41px; position: fixed; top: 50%; left: 0px; padding: 0; margin: -49px 0 0; background: #777; border: 1px solid #525252; border-left: none; border-radius: 0 5px 5px 0; cursor: pointer; z-index: 1000; }\
	.de-thr-navpanel-hidden { opacity: .7; margin-left: -34px !important; }\
	#de-thr-navarrow { display: none; position: absolute; top: 50%; left: 34px; transform: translateY(-50%); width: 7px; height: 7px;}\
	.de-thr-navpanel-hidden > #de-thr-navarrow { display: initial; }\
	#de-thr-navup { padding: 12px 9px 13px 8px; border-radius: 0 5px 0 0; }\
	#de-thr-navdown { padding: 13px 9px 12px 8px; border-radius: 0 0 5px 0; }\
	#de-thr-navup, #de-thr-navdown { width: 41px; height: 49px; -moz-box-sizing: border-box; box-sizing: border-box; }\
	:not(.de-thr-navpanel-hidden) > #de-thr-navup:hover, :not(.de-thr-navpanel-hidden) > #de-thr-navdown:hover { background: #555; }' +

	
		'@keyframes de-wait-anim { to { transform: rotate(360deg); } }\
	.de-wait, .de-fav-wait , .de-img-load { animation: de-wait-anim 1s linear infinite; }\
	.de-wait { margin: 0 2px -3px 0 !important; width: 16px; height: 16px; }\
	.de-abtn { text-decoration: none !important; outline: none; }\
	.de-after-fimg { clear: left; }\
	#de-wrapper-popup { overflow-x: hidden !important; overflow-y: auto !important; -moz-box-sizing: border-box; box-sizing: border-box; max-height: 100vh; position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
	.de-popup { overflow: visible !important; clear: both !important; width: auto !important; min-width: 0pt !important; padding: 8px !important; margin: 1px !important; border: 1px solid grey !important; display: block !important; float: right !important; max-width: initial !important; }\
	.de-popup-btn { display: inline-block; vertical-align: top; color: green; cursor: pointer; line-height: 1.15; }\
	.de-popup-msg { display: inline-block; white-space: pre-wrap; }\
	.de-button { flex: none; padding: 0 ' + (nav.Firefox ? '2' : '4') + 'px !important; margin: 1px 2px; height: 24px; font: 13px arial; }\t.de-editor { display: block; font: 12px courier new; width: 619px; height: 337px; tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4; }\t.de-hidden { float: left; overflow: hidden !important; margin: 0 !important; padding: 0 !important; border: none !important; width: 0 !important; height: 0 !important; display: inline !important; }\t.de-input-key { padding: 0 2px !important; margin: 0 !important; font: 13px/15px arial !important; }\t.de-link-parent { outline: 1px dotted !important; }\t.de-link-pview { font-weight: bold; }\t.de-link-ref { text-decoration: none; }\t.de-list { padding-top: 4px; }\t.de-list::before { content: "●"; margin-right: 4px; }\t.de-menu { padding: 0 !important; margin: 0 !important; width: auto !important; min-width: 0; z-index: 9999; border: 1px solid grey !important;}\t.de-menu-item { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; cursor: pointer; }\t.de-menu-item:hover { background-color: #222; color: #fff; }\t.de-new-post { ' + (nav.Presto ? 'border-left: 4px solid rgba(0,0,255,.7); border-right: 4px solid rgba(0,0,255,.7); }' : 'box-shadow: 6px 0 2px -2px rgba(0,0,255,.8), -6px 0 2px -2px rgba(0,0,255,.8); }') + '\
	.de-omitted { color: grey; }\
	.de-omitted::before { content: "' + Lng.postsOmitted[lang] + '"; }\
	.de-post-hiddencontent { display: none !important; }\
	.de-pview { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey !important; margin: 0 !important; display: block !important; }\
	.de-pview-info { padding: 3px 6px !important; }\
	.de-ref-op::after { content: " (OP)"; }\
	.de-ref-my::after { content: " (You)"; }\
	.de-ref-del::after { content: " (Del)"; }\
	.de-ref-del.de-ref-my::after { content: " (Del)(You)"; }\
	.de-ref-op.de-ref-my::after { content: " (OP)(You)"; }\
	.de-refmap { margin: 10px 4px 4px 4px; font-size: 75%; font-style: italic; }\
	.de-refmap::before { content: "' + Lng.replies[lang] + ' "; }\
	.de-refcomma:last-child { display: none; }\
	.de-replies-hide::after { content: "' + Lng.hidePosts[lang] + '"; }\
	.de-replies-show::after { content: "' + Lng.showPosts[lang] + '"; }\
	.de-selected, .de-error-input { ' + (nav.Presto ? 'border-left: 4px solid rgba(255,0,0,.7); border-right: 4px solid rgba(255,0,0,.7); }' : 'box-shadow: 6px 0 2px -2px rgba(255,0,0,.8), -6px 0 2px -2px rgba(255,0,0,.8); }') + '\
	.de-thread-buttons { clear: left; margin-top: 5px; }\
	.de-thread-collapse > a::after { content: "' + Lng.collapseThrd[lang] + '"; }\
	.de-thread-updater > a::after { content: "' + Lng.getNewPosts[lang] + '"; }\
	#de-updater-count::before { content: ": "; }\
	.de-viewed { color: #747488 !important; }\
	form > hr { clear: both }';

		$css(x).id = 'de-css';
		$css('').id = 'de-css-dynamic';
		$css('').id = 'de-css-user';
		updateCSS();
	}

	function updateCSS() {
		var x = '.de-video-obj { width: ' + Cfg.YTubeWidth + 'px; height: ' + Cfg.YTubeHeigh + 'px; }';
		if (!Cfg.resizeImgs) {
			x += '.de-img-wrapper-inpost > .de-img-full { width: auto; }';
		}
		if (Cfg.postBtnsCSS === 0) {
			x += '.de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep, .de-btn-hide, .de-btn-unhide, .de-btn-src { fill: rgba(0,0,0,0); color: #4F7942; }\
		.de-btn-fav-sel, .de-btn-stick-on, .de-btn-sage, .de-btn-hide-user, .de-btn-unhide-user { fill: rgba(0,0,0,0); color: #F00; }';
		} else {
			x += '.de-btn-hide, .de-btn-unhide, .de-btn-src, .de-btn-sage, .de-btn-fav, .de-btn-stick, .de-btn-expthr, .de-btn-rep { color: #F5F5F5; }\
		.de-btn-hide-user { color: #BFFFBF; }\
		.de-btn-unhide-user { color: #FFBFBF; }\
		.de-btn-fav-sel { color: #FFE100; }\
		.de-btn-stick-on { color: #BFFFBF; }\
		.de-btn-sage { fill: #4B4B4B; }\
		.de-btn-expthr, .de-btn-fav, .de-btn-fav-sel, .de-btn-hide, .de-btn-hide-user, .de-btn-unhide, .de-btn-unhide-user, .de-btn-rep, .de-btn-src, .de-btn-stick, .de-btn-stick-on { fill: ' + (Cfg.postBtnsCSS === 1 && !nav.Presto ? 'url(#de-btn-back-gradient)' : Cfg.postBtnsBack) + '; }';
		}
		if (Cfg.hideReplies || Cfg.updThrBtns) {
			x += '.de-thread-buttons::before { content: ">> "; }';
		}
		if (Cfg.maskImgs) {
			x += aib.qPostImg + ', .de-img-pre, .de-video-obj { opacity: ' + Cfg.maskVisib / 100 + ' !important; } ' + aib.qPostImg.split(', ').join(':hover, ') + ':hover, .de-img-pre:hover, .de-video-obj:hover { opacity: 1 !important; }';
		}
		if (Cfg.delImgNames) {
			x += '.de-img-name { text-transform: capitalize; text-decoration: none; }';
		}
		if (Cfg.noSpoilers === 1) {
			x += '.spoiler, s { color: #F5F5F5 !important; background-color: #888 !important; }\
			.spoiler > a, s > a:not(:hover) { color: #F5F5F5 !important; background-color: #888 !important; }';
		} else if (Cfg.noSpoilers === 2) {
			x += '.spoiler, s { color: inherit !important; }\
			.spoiler > a, s > a:not(:hover) { color: inherit !important; }';
		}
		if (Cfg.widePosts) {
			x += '.' + aib.cReply.replace(/\s/, '.') + ':not(.de-pview) { float: none; width: 100%; }';
		}
		if (Cfg.strikeHidd) {
			x += '.de-link-hid { text-decoration: line-through !important; }';
		}
		x += '.postarea, small[id^="rfmap"], .theader, ' + (Cfg.panelCounter ? '' : '#de-panel-info, ') + (Cfg.imgNavBtns ? '' : '#de-img-btn-next, #de-img-btn-prev, ') + (Cfg.showHideBtn ? '' : '.de-btn-hide, ') + (Cfg.showRepBtn ? '' : '.de-btn-rep, ') + (Cfg.updThrBtns || aib.t ? '' : '.de-thread-updater, ') + (Cfg.removeHidd ? '.de-link-ref.de-link-hid, .de-link-ref.de-link-hid + .de-refcomma, ' : '') + (Cfg.delHiddPost ? '.de-thr-hid, .de-thr-hid + div + hr, .de-thr-hid + div + br, .de-thr-hid + div + br + hr, .de-thr-hid + div + div + hr, ' : '') + (Cfg.addSageBtn ? '' : '#de-sagebtn, ') + (Cfg.noPostNames ? aib.qPostName + ', ' + aib.qPostTrip + ', ' : '') + (Cfg.noBoardRule ? aib.qFormRules + ', ' : '') + (aib._2chruNet ? '' : '.thumbnailmsg, ') + (!aib.kus && (aib.multiFile || !Cfg.fileThumb) ? '#de-pform form > table > tbody > tr > td:not([colspan]):first-child, #de-pform form > table > tbody > tr > th:first-child, ' : '') + 'body > hr { display: none !important; }';
		$id('de-css-dynamic').textContent = x + '\n' + aib.css;
		$id('de-css-user').textContent = Cfg.userCSS ? Cfg.userCSSTxt : '';
	}




	function runMain(checkDomains, cfgPromise) {
		var formEl, str;
		return regeneratorRuntime.wrap(function runMain$(_context20) {
			while (1) switch (_context20.prev = _context20.next) {
				case 0:
					Logger.init();
					docBody = doc.body;

					if (docBody) {
						_context20.next = 4;
						break;
					}

					return _context20.abrupt('return');

				case 4:
					if (!aib) {
						aib = getImageBoard(checkDomains, true);
					}
					formEl = $q(aib.qDForm + ', form[de-form]');

					if (formEl) {
						_context20.next = 8;
						break;
					}

					return _context20.abrupt('return');

				case 8:
					Logger.log('Imageboard check');

					if (locStorage) {
						_context20.next = 13;
						break;
					}

					if (checkStorage()) {
						_context20.next = 12;
						break;
					}

					return _context20.abrupt('return');

				case 12:
					initNavFuncs();

				case 13:
					return _context20.delegateYield(getStored('DESU_Exclude'), 't0', 14);

				case 14:
					str = _context20.t0;

					if (!(str && str.includes(aib.dm))) {
						_context20.next = 17;
						break;
					}

					return _context20.abrupt('return');

				case 17:
					excludeList = str || '';

					if (Cfg) {
						_context20.next = 25;
						break;
					}

					if (!cfgPromise) {
						_context20.next = 24;
						break;
					}

					_context20.next = 22;
					return cfgPromise;

				case 22:
					_context20.next = 25;
					break;

				case 24:
					return _context20.delegateYield(readCfg(), 't1', 25);

				case 25:
					Logger.log('Config loading');

					if (!(!Cfg.disabled && (aib.init && aib.init() || $id('de-panel')))) {
						_context20.next = 28;
						break;
					}

					return _context20.abrupt('return');

				case 28:
					addSVGIcons();

					if (!Cfg.disabled) {
						_context20.next = 33;
						break;
					}

					panel.init(formEl);
					scriptCSS();
					return _context20.abrupt('return');

				case 33:
					initStorageEvent();
					parseURL();
					if (aib.t) {
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
					return _context20.delegateYield(readMyPosts(), 't2', 39);

				case 39:
					Logger.log('Read my posts');
					$hide(docBody);
					dummy = doc.createElement('div');
					formEl = DelForm.doReplace(formEl);
					Logger.log('Replace delform');
					pByEl = new Map();
					pByNum = new Map();
					_context20.prev = 46;

					DelForm.last = DelForm.first = new DelForm(formEl, aib.page, false);
					_context20.next = 55;
					break;

				case 50:
					_context20.prev = 50;
					_context20.t3 = _context20['catch'](46);

					console.log('DELFORM ERROR:\n' + getErrorMessage(_context20.t3));
					$show(docBody);
					return _context20.abrupt('return');

				case 55:
					Logger.log('Parse delform');
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
					return _context20.delegateYield(readPostsData(DelForm.first.firstThr.op), 't4', 72);

				case 72:
					Logger.log('Hide posts');
					scrollPage();
					Logger.log('Scroll page');
					Logger.finish();

				case 76:
				case 'end':
					return _context20.stop();
			}
		}, _marked[9], this, [[46, 50]]);
	}

	if (/^(?:about|chrome|opera|res):$/i.test(window.location.protocol)) {
		return;
	}
	switch (window.name) {
		case '':
			break;
		case 'de-iframe-pform':
		case 'de-iframe-dform':
			onDOMLoaded(function () {
				return window.parent.postMessage(window.name + doc.documentElement.outerHTML, "*");
			});
			return;
	}
	if (doc.readyState === 'interactive' || doc.readyState === 'complete') {
		needScroll = false;
		async(runMain)(true, null);
	} else {
		var cfgPromise = null;
		if (aib = getImageBoard(true, false)) {
			if (!checkStorage()) {
				return;
			}
			initNavFuncs();
			cfgPromise = spawn(readCfg);
		}
		needScroll = true;
		doc.addEventListener('onwheel' in doc.defaultView ? 'wheel' : 'mousewheel', function wFunc(e) {
			needScroll = false;
			doc.removeEventListener(e.type, wFunc);
		});
		doc.addEventListener('DOMContentLoaded', async(runMain.bind(null, false, cfgPromise)));
	}
})(window.opera && window.opera.scriptStorage, window.FormData);

},{}],99:[function(require,module,exports){
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
require('regenerator/runtime');

},{"core-js/fn/array/from":1,"core-js/fn/array/iterator":2,"core-js/fn/map":3,"core-js/fn/math/clz32":4,"core-js/fn/number/max-safe-integer":5,"core-js/fn/object/assign":6,"core-js/fn/promise":7,"core-js/fn/set":8,"core-js/fn/string/includes":9,"core-js/fn/string/repeat":10,"core-js/fn/string/starts-with":11,"core-js/fn/symbol":12,"core-js/fn/weak-map":13,"regenerator/runtime":97}]},{},[99,98]);
})();