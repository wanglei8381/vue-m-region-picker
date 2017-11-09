/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.3.4
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "development" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return this
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.4';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    "development" !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, warn$3)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}}"
}

function genForScopedSlot (key, el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el)) +
    '})'
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(19)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

(function () {

    var stack = {};
    var i = 1;
    var helper = {};

    helper.add = function (el, event, cb, useCapture) {
        el._uid = el._uid || i++;
        var obj = stack[el._uid] = stack[el._uid] ? stack[el._uid] : {};
        var arr = obj[event] = obj[event] ? obj[event] : [];
        arr.push(cb);
        el.addEventListener(event, cb, !!useCapture);
    };

    helper.remove = function (el, event, cb) {
        if (typeof cb === 'function' && cb.name) {
            el.removeEventListener(event, cb);
        } else if (el._uid && stack[el._uid]) {
            var obj = stack[el._uid];
            var keys = [];
            if (event) {
                if (obj[event]) {
                    keys.push(event);
                }
            } else {
                keys = Object.keys(obj);
            }

            keys.forEach(function (key) {
                obj[key].forEach(function (_cb) {
                    el.removeEventListener(event, _cb);
                });
                delete obj[key];
            });

        }
    };

    //引入Node中
    Node.prototype.addEvent = function (event, cb, useCapture) {
        helper.add(this, event, cb, useCapture);
        return this;
    }

    Node.prototype.removeEvent = function (event, cb) {
        helper.remove(this, event, cb);
        return this;
    }

    if (true) {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = helper;
        }
        exports.domEventHelper = helper;
    } else {
        window.domEventHelper = helper;
    }

})();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

//触摸事件处理
var Event = __webpack_require__(23);
var domEventHelper = __webpack_require__(4);

function Touch(el) {
    Event.call(this);
    this.el = el || document;
    this.touch = null;
    this.lastTimestamp = Date.now();
    this.spend = 0;
    this.x1 = this.y1 = this.x2 = this.y2 = undefined;
}

Touch.prototype = Object.create(Event.prototype, {
    'constructor': {
        value: Touch
    }
});

Touch.prototype._add = function () {
    domEventHelper.add(this.el, 'touchstart', this.touchStart.bind(this), false);
    domEventHelper.add(this.el, 'touchmove', this.touchMove.bind(this), false);
    domEventHelper.add(this.el, 'touchend', this.touchEnd.bind(this), false);
    domEventHelper.add(this.el, 'touchcancel', this.touchCancel.bind(this), false);
};

Touch.prototype._remove = function () {
    domEventHelper.remove(this.el, 'touchstart');
    domEventHelper.remove(this.el, 'touchmove');
    domEventHelper.remove(this.el, 'touchend');
    domEventHelper.remove(this.el, 'touchcancel');
};

Touch.prototype.touchStart = function (e) {
    this.lastTimestamp = Date.now();
    var touch = e.touches[0];
    this.touch = touch;
    this.touch.el = 'tagName' in touch.target ?
        touch.target : touch.target.parentNode;

    this.x2 = this.x1 = touch.pageX;
    this.y2 = this.y1 = touch.pageY;
    this.trigger('touch:start', {
        x1: this.x1,
        y1: this.y1,
        e: e,
        el: this.touch.el,
        timestamp: this.lastTimestamp
    });
};

Touch.prototype.touchMove = function (e) {
    this.spend = Date.now() - this.lastTimestamp;
    var touch = e.touches[0];
    var yrange = 0;
    var xrange = 0;
    if (this.y2) {
        yrange = this.y2 - touch.pageY;
        xrange = this.x2 - touch.pageX;
    }

    this.x2 = touch.pageX;
    this.y2 = touch.pageY;

    this.trigger('touch:move', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        e: e,
        toUp: yrange > 0,
        toLeft: xrange > 0,
        xrange: xrange,
        yrange: yrange,
        spend: this.spend
    });
};

Touch.prototype.touchEnd = function (e) {
    this.spend = Date.now() - this.lastTimestamp;
    this.trigger('touch:end', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
        e: e,
        spend: this.spend
    });
};

Touch.prototype.touchCancel = function () {
    //this.pause('touch:start touch:move touch:end');
    this.trigger('touch:cancel', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
        spend: this.spend
    });
    this.spend = 0;
    this.touch = null;
    this.x1 = this.y1 = this.x2 = this.y2 = undefined;
};

Touch.prototype.start = function () {
    this._add();
    var _this = this;

    domEventHelper.add(window, 'scroll', function (e) {
        // this.touchCancel();
        _this.trigger('scroll', e);
    }, false);

    //重新绑定dom
    this.on('touch:el', function (e) {
        _this._remove();
        _this.el = el;
        _this._add();
    });
};

Touch.prototype.destroy = function () {
    this._remove();
    domEventHelper.remove(window);
}

function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
}

module.exports = Touch;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(18)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(16),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wanglei/platform/workspace/vue-m-region-picker/src/region-picker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] region-picker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bbcf79c0", Component.options)
  } else {
    hotAPI.reload("data-v-bbcf79c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_super_touch__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_super_touch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_super_touch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_super_animation__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_super_animation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_super_animation__);
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
  props: ['alias', 'list', 'curIdx', 'label'],

  data() {
    return {
      distinct: 0,
      speed: 0.5,
      curIndex: 0,
      threshold: 20,
      animatePause: true
    };
  },

  computed: {
    maxVal() {
      return (this.list.length - 1) * this.threshold;
    }
  },

  watch: {
    list() {
      this.$nextTick(this.reload);
    },

    curIdx(val, oval) {
      this.curIndex = val;
      this.distinct = val * this.threshold;
      // 当下标变化时,自动滚动到指定位置
      if (this.$list) {
        this.highlight(oval, val);
      }
      if (this.$container) {
        this.$container.style.webkitTransform = 'rotateX(' + this.distinct + 'deg)';
      }
    }
  },

  methods: {
    move(res) {
      let distinct = this.distinct;
      distinct += res.yrange * this.speed;
      this.distinct = this.internalCal(distinct);
    },

    end() {
      let distinct = this.distinct;
      this.distinct = this.internalCal(distinct, true);
      this.$container.style.webkitTransition = '100ms ease-out';
      this.$emit('picker', this.curIndex, this.alias);
    },
    internalCal(distinct, isEnd) {
      let threshold = this.threshold;
      let baseNum = isEnd ? -0 : threshold * 2;
      if (distinct > this.maxVal + baseNum) {
        distinct = this.maxVal + baseNum;
      }
      if (distinct < -baseNum) {
        distinct = -baseNum;
      }

      let base = parseInt(distinct / threshold);
      let min = threshold * base;
      let max = min + threshold;
      let interval = max;
      if (distinct - min <= max - distinct) {
        interval = min;
      }
      distinct = isEnd ? interval : distinct;
      if (distinct >= 0 && distinct <= this.maxVal) {
        // 选中的下表
        let idx = interval / threshold;
        this.highlight(this.curIndex, idx);
        this.curIndex = idx;
      }

      this.$container.style.webkitTransform = 'rotateX(' + distinct + 'deg)';
      this.showCal();
      return distinct;
    },
    showCal() {
      // 小于13全部显示
      // if (this.list.length <= 13) return
      let min = this.curIndex - 5;
      let max = this.curIndex + 5;
      for (let i = 0, len = this.list.length; i < len; i++) {
        this.$list[i].style.visibility = i >= min && i <= max ? 'visible' : 'hidden';
      }
    },
    startInertiaScroll(res) {
      // 缓动
      var v = (res.y1 - res.y2) / res.spend;
      var duration = Math.abs(v / 0.0006); // 速度减到0
      var dist = v * duration / 2; // 最后执行的距离
      var _distinct = this.distinct;
      var minVal = -this.threshold * 2;
      var maxVal = this.maxVal + this.threshold * 2;
      var index = 0;
      var r = 0;
      duration /= 5;
      var _inertiaMove = () => {
        if (this.animatePause) {
          this.distinct = _distinct;
          return;
        }
        r = __WEBPACK_IMPORTED_MODULE_1_super_animation__["quart"].easeOut(index++, this.distinct, dist, duration);
        _distinct = this.internalCal(r);
        if (index < duration && r >= minVal && r <= maxVal) {
          requestAnimationFrame(_inertiaMove);
        } else {
          this.animatePause = true;
          this.distinct = _distinct;
          this.end();
        }
      };
      _inertiaMove();
    },
    highlight(pidx, idx) {
      var len = this.$list.length;
      if (pidx < len) {
        this.$list[pidx].classList.remove('highlight');
      }
      if (idx < len) {
        this.$list[idx].classList.add('highlight');
      }
    },
    reload() {
      // 当数据变化时,重新加载数据
      this.$container = this.$el.querySelector('.m-picker-list');
      this.$list = this.$container.querySelectorAll('li');
      this.highlight(this.curIndex, 0);
      this.curIndex = 0;
      this.distinct = this.curIndex * this.threshold;
      this.showCal();
      this.$container.style.webkitTransform = 'rotateX(' + this.distinct + 'deg)';
      this.$container.addEventListener('webkitTransitionEnd', () => {
        this.$container.style.webkitTransition = null;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$options.ready.call(this);
    });
  },
  ready() {
    this.curIndex = parseInt(this.curIdx);
    if (this.list.length > 0) {
      this.reload();
    }

    var touch = new __WEBPACK_IMPORTED_MODULE_0_super_touch___default.a(this.$el);
    touch.start();
    touch.on('touch:start', res => {
      // 暂停执行缓动
      this.animatePause = true;
      res.e.preventDefault();
    });

    touch.on('touch:move', res => {
      res.e.preventDefault();
      this.move(res);
    });

    touch.on('touch:end', res => {
      res.e.preventDefault();
      if (Math.abs(res.y1 - res.y2) < this.threshold * 2) {
        this.end();
      } else {
        this.animatePause = false;
        this.startInertiaScroll(res);
      }
    });
  }
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Picker__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Picker__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



const defaultFnObj = {
  type: Function,
  required: false,
  default: function () {}
};

const props = {
  list: {
    type: [Object, Array],
    required: true
  },
  label: {
    type: String,
    required: false,
    default: 'label'
  },
  curIdxs: {
    type: Array,
    required: false,
    default: function () {
      if (this.list[0] instanceof Array) {
        var arr = [];
        for (let i = 0; i < this.list.length; i++) {
          arr[i] = 0;
        }
        return arr;
      }
      return [0, 0, 0];
    }
  },
  cancel: defaultFnObj,
  confirm: defaultFnObj,
  change: defaultFnObj
};

/* harmony default export */ __webpack_exports__["default"] = {
  name: 'vue-m-picker',
  props,
  data() {
    return { open: false };
  },

  computed: {
    datas() {
      var list = this.list;
      if (!(this.list[0] instanceof Array)) {
        list = [this.list];
      }
      var obj = {};
      list.forEach(function (arr, index) {
        obj[index] = arr;
      });
      return obj;
    },
    style() {
      var length = Object.keys(this.datas).length;
      return {
        width: 100 / length + '%',
        float: 'left'
      };
    }
  },

  watch: {
    // curIdxs(val, oval){
    //     this.cache = val
    // }
    datas(nobj, oobj) {
      // 主要修复在数据更改时,初始化的对应下表为0
      let size = Object.keys(nobj).length;
      for (let i = 0; i < size; i++) {
        if (nobj[i] !== oobj[i]) {
          this.cache[i] = 0;
        }
      }
    }
  },

  methods: {
    openWin() {
      this.open = true;
    },
    close() {
      this.open = false;
      this.cancel();
    },
    choose() {
      this.open = false;
      this.confirm.apply(this, this.cache);
    },
    picker(index, alias) {
      this.cache[parseInt(alias)] = index;
      this.change(parseInt(alias), index);
    }
  },

  mounted() {
    this.cache = [];
    this.$nextTick(function () {
      this.cache = this.curIdxs;
    });
  },

  components: {
    Picker: __WEBPACK_IMPORTED_MODULE_0__Picker___default.a
  }
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__areas__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__areas___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__areas__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_m_picker__ = __webpack_require__(24);
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
  components: { 'wag-region-picker-cpt': __WEBPACK_IMPORTED_MODULE_1_vue_m_picker__["a" /* default */] },
  data: function () {
    return {
      list: []
    };
  },
  props: {
    type: {
      type: Number,
      default: 3
    },
    raw: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    label() {
      return this.raw ? 'text' : 'abbreviated';
    }
  },
  methods: {
    confirm(i, j, k) {
      var province = this.provinceList[i];
      var city = this.cityList[j];
      var area = this.areaList[k];
      var p = { name: province.abbreviated, text: province.text, value: province.value };
      var c = { name: city.abbreviated, text: city.text, value: city.value };
      var a = { name: area.abbreviated, text: area.text, value: area.value };
      if (this.type === 3) {
        this.$emit('confirm', p, c, a);
      } else if (this.type === 2) {
        this.$emit('confirm', p, c);
      } else if (this.type === 1) {
        this.$emit('confirm', p);
      }
    },
    change(itemIndex, index) {
      if (this.type === 1) return;
      if (itemIndex === 0) {
        this.provincePicker(index);
      } else if (itemIndex === 1 && this.type === 3) {
        this.cityPicker(index);
      }
    },
    provincePicker(idx) {
      this.cityList = __WEBPACK_IMPORTED_MODULE_0__areas___default.a[1][idx];
      if (this.type === 2) {
        this.list.splice(1, 1, this.cityList);
      } else {
        this.areaList = __WEBPACK_IMPORTED_MODULE_0__areas___default.a[2][idx][0];
        this.list.splice(1, 2, this.cityList, this.areaList);
      }

      this.provinceIdx = idx;
    },
    cityPicker(idx) {
      this.areaList = __WEBPACK_IMPORTED_MODULE_0__areas___default.a[2][this.provinceIdx][idx];
      this.list.splice(2, 1, this.areaList);
    }
  },
  mounted() {
    this.provinceIdx = 0;
    this.provinceList = __WEBPACK_IMPORTED_MODULE_0__areas___default.a[0];
    this.cityList = __WEBPACK_IMPORTED_MODULE_0__areas___default.a[1][0];
    this.areaList = __WEBPACK_IMPORTED_MODULE_0__areas___default.a[2][0][0];
    if (this.type === 1) {
      this.list = this.provinceList;
    } else if (this.type === 2) {
      this.list = [this.provinceList, this.cityList];
    } else if (this.type === 3) {
      this.list = [this.provinceList, this.cityList, this.areaList];
    }
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "/**\n   transform\n       1: transform的值有先后顺序,如rotateX(40deg) translateZ(60px);表示先在X轴旋转40度,再在Z轴上移动60px\n           如果translateZ(60px) rotateX(40deg);表示先在Z轴上移动60px,再在X轴旋转40度\n      2: transform-origin要和transform一起使用才有效\n*/\n.picker-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  visibility: hidden;\n}\n.picker-container.open {\n  z-index: 2;\n  visibility: visible;\n}\n.picker-container.open .picker-wrapper {\n  transform: translate3d(0, 0, 0);\n  -webkit-transform: translate3d(0, 0, 0);\n}\n.picker-container .picker-wrapper {\n  position: fixed;\n  width: 100%;\n  z-index: 1;\n  bottom: 0;\n  left: 0;\n  background: #fff;\n  overflow: hidden;\n  transition: transform 0.3s linear;\n  -webkit-transition: -webkit-transform 0.3s linear;\n  transform: translate3d(0, 250px, 0);\n  -webkit-transform: translate3d(0, 250px, 0);\n}\n.picker-container .picker-wrapper .picker-action {\n  box-sizing: border-box;\n  background-color: #fff;\n  padding: 5px 10px;\n  box-shadow: 0 -1px 3px 1px #ddd;\n  border-bottom: 1px solid #e5e5e5;\n}\n.picker-container .picker-wrapper .picker-action .picker-btn {\n  display: inline-block;\n  outline: none;\n  line-height: 1.42;\n  padding: 6px 12px;\n  font-size: 16px;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  color: #316ccb;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.picker-container .picker-wrapper .picker-action .picker-btn.picker-btn-confirm {\n  float: right;\n}\n.m-picker,\n.m-picker * {\n  box-sizing: border-box;\n}\n.m-picker {\n  height: 200px;\n  background-color: #fff;\n}\n.m-picker .m-picker-inner {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  -webkit-mask-box-image: -webkit-linear-gradient(to top, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);\n  -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);\n}\n.m-picker .m-picker-inner .m-picker-list,\n.m-picker .m-picker-inner .m-picker-rule {\n  z-index: 1;\n  position: absolute;\n  top: 50%;\n  margin-top: -18px;\n  width: 100%;\n  list-style: none;\n  padding: 0;\n  line-height: 36px;\n  height: 36px;\n}\n.m-picker .m-picker-inner .m-picker-rule {\n  z-index: 2;\n  border-top: 1px solid rgba(0,0,0,0.1);\n  border-bottom: 1px solid rgba(0,0,0,0.1);\n}\n.m-picker .m-picker-inner .m-picker-list {\n  transform-style: preserve-3d;\n  -webkit-transform-style: preserve-3d;\n}\n.m-picker .m-picker-inner .m-picker-list .m-picker-item {\n  display: inline-block;\n  position: absolute;\n  width: 100%;\n  text-align: center;\n  font-size: 16px;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Arial\", \"sans-serif\";\n  color: #959595;\n/* 超出的部分省略 */\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n/* 元素不面向屏幕时是否可见 */\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n}\n.m-picker .m-picker-inner .m-picker-list .m-picker-item.highlight {\n  color: #353535;\n  font-weight: bold;\n}\n.open-wrapper {\n  display: inline-block;\n}\n.picker-mask {\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0,0,0,0.4);\n}\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\n.picker-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0,0,0,0.4);\n  -webkit-transition: opacity 400ms;\n  transition: opacity 400ms;\n  opacity: 0;\n  text-align: left;\n}\n.picker-wrapper {\n  position: fixed;\n  width: 100%;\n  z-index: 1;\n  bottom: 0;\n  left: 0;\n  transition: transform 0.3s linear;\n  -webkit-transition: -webkit-transform 0.3s linear;\n  transform: translate3d(0, 250px, 0);\n  -webkit-transform: translate3d(0, 250px, 0);\n}\n.picker-container.open {\n  z-index: 2;\n  opacity: 1;\n}\n.picker-container.open .picker-wrapper {\n  transform: translate3d(0, 0, 0);\n  -webkit-transform: translate3d(0, 0, 0);\n}\n.picker-wrapper .picker-action {\n  box-sizing: border-box;\n  background-color: #fff;\n  padding: 5px 10px;\n  box-shadow: 0 -1px 3px 1px #ddd;\n  border-bottom: 1px solid #e5e5e5;\n}\n.picker-wrapper .picker-action .picker-btn {\n  display: inline-block;\n  outline: none;\n  line-height: 1.42;\n  padding: 6px 12px;\n  font-size: 16px;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  color: #316ccb;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.picker-wrapper .picker-action .picker-btn.picker-btn-confirm {\n  float: right;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(14),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wanglei/platform/workspace/vue-m-region-picker/node_modules/vue-m-picker/src/Picker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Picker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-646b249a", Component.options)
  } else {
    hotAPI.reload("data-v-646b249a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(15),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/wanglei/platform/workspace/vue-m-region-picker/node_modules/vue-m-picker/src/PickerContainer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PickerContainer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7be9b6b7", Component.options)
  } else {
    hotAPI.reload("data-v-7be9b6b7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-picker"
  }, [_c('div', {
    staticClass: "m-picker-inner"
  }, [_c('div', {
    staticClass: "m-picker-rule"
  }), _vm._v(" "), _c('ul', {
    staticClass: "m-picker-list"
  }, _vm._l((_vm.list), function(item, index) {
    return _c('li', {
      key: index,
      staticClass: "m-picker-item",
      style: ({
        transform: 'rotateX(' + (-_vm.threshold * index) + 'deg) translateZ(90px)'
      })
    }, [_vm._v("\n        " + _vm._s(typeof item === 'object' ? item[_vm.label] : item) + "\n      ")])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-646b249a", module.exports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    directives: [{
      name: "touch",
      rawName: "v-touch:tap",
      value: (_vm.openWin),
      expression: "openWin",
      arg: "tap"
    }],
    staticClass: "open-wrapper"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "touch",
      rawName: "v-touch:tap",
      value: (_vm.close),
      expression: "close",
      arg: "tap"
    }],
    staticClass: "picker-container",
    class: {
      'open': _vm.open
    }
  }, [_c('div', {
    directives: [{
      name: "touch",
      rawName: "v-touch:tap.stop",
      arg: "tap",
      modifiers: {
        "stop": true
      }
    }],
    staticClass: "picker-wrapper"
  }, [_c('div', {
    staticClass: "picker-action"
  }, [_c('span', {
    directives: [{
      name: "touch",
      rawName: "v-touch:tap",
      value: (_vm.close),
      expression: "close",
      arg: "tap"
    }],
    staticClass: "picker-btn"
  }, [_vm._v("取消")]), _vm._v(" "), _c('span', {
    directives: [{
      name: "touch",
      rawName: "v-touch:tap",
      value: (_vm.choose),
      expression: "choose",
      arg: "tap"
    }],
    staticClass: "picker-btn picker-btn-confirm"
  }, [_vm._v("确定")])]), _vm._v(" "), _vm._t("header"), _vm._v(" "), _vm._l((_vm.datas), function(item, index) {
    return _c('div', {
      key: index,
      style: (_vm.style)
    }, [_c('Picker', {
      attrs: {
        "list": item,
        "alias": index,
        "label": _vm.label,
        "cur-idx": _vm.curIdxs[index]
      },
      on: {
        "picker": _vm.picker
      }
    })], 1)
  })], 2)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.open),
      expression: "open"
    }],
    staticClass: "picker-mask"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7be9b6b7", module.exports)
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wag-region-picker-cpt', {
    attrs: {
      "list": _vm.list,
      "label": _vm.label,
      "confirm": _vm.confirm,
      "change": _vm.change
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bbcf79c0", module.exports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("99822bd2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/stylus-loader/index.js!./style.styl", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/stylus-loader/index.js!./style.styl");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("9f756830", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bbcf79c0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/stylus-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./region-picker.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bbcf79c0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/stylus-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./region-picker.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/*
 * 常用动画算法,借用张鑫旭的Tween.js,
 *
 * linear：无缓动效果
 * quadratic：二次方的缓动（t^2）
 * cubic：三次方的缓动（t^3）
 * quartic：四次方的缓动（t^4）
 * quintic：五次方的缓动（t^5）
 * Sinusoidal：正弦曲线的缓动（sin(t)）
 * Exponential：指数曲线的缓动（2^t）
 * Circular：圆形曲线的缓动（sqrt(1-t^2)）
 * elastic：指数衰减的正弦曲线缓动
 * 超过范围的三次方缓动（(s+1)*t^3 – s*t^2）
 * 指数衰减的反弹缓动
 *
 * t: current time（当前时间）
 * b: beginning value（初始值）
 * c: change in value（变化量）
 * d: duration（持续时间）
 */
var Tween = {
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    quad: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    cubic: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    quart: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    quint: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    sine: {
        easeIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    expo: {
        easeIn: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    circ: {
        easeIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    elastic: {
        easeIn: function (t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function (t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function (t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    back: {
        easeIn: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function (t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    bounce: {
        easeIn: function (t, b, c, d) {
            return c - Tween.bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function (t, b, c, d) {
            if (t < d / 2) {
                return Tween.bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
}

module.exports = Tween;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var lastTime = 0;

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

var cancelAnimation = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (id) {
        clearTimeout(id);
    };

module.exports = function (cb) {
    return typeof cb === 'function' ? animate(cb) : cancelAnimation(cb);
};



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);
if (typeof window !== 'undefined') {
    __webpack_require__(21);
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

(function () {

    /**
     * Event事件对象
     * cxt上下文
     * @constructor
     */
    function Event(cxt) {
        this._events = {};
        this.cxt = cxt;
    }

    //off,pause,resume通用方法
    function eventsApi(self, name, cb, cxt) {
        var events = {};

        for (var key in self._events) {
            events[key] = self._events[key];
        }

        if (name) {
            events = {};
            name.split(/\s/).forEach(function (ename) {
                if (ename && self._events[ename]) {
                    events[ename] = self._events[ename];
                }
            });
        }

        var keys = Object.keys(events);
        if (keys.length === 0) return this;

        if (cb && typeof cb === 'function') {
            keys.forEach(function (key) {
                events[key] = events[key].filter(function (event) {
                    return event.cb == cb;
                });
            });
        }

        if (cxt) {
            keys.forEach(function (key) {
                events[key] = events[key].filter(function (event) {
                    return event.cxt == cxt;
                });
            });
        }

        return events;
    }

    //暂停,恢复通用方法
    function eventsPauseApi(self, name, cb, cxt, val) {
        var events = eventsApi(self, name, cb, cxt);
        for (var key in events) {
            events[key].forEach(function (item) {
                item.pause = val;
            });
        }
    }

    //on,once通用方法
    function eventsOnApi(self, name, cb, cxt, once) {
        if (!name || typeof cb != 'function' || typeof name !== 'string') return this;
        name.split(/\s/).forEach(function (ename) {
            if (!ename) return;
            var handlers = self._events[ename] || [];
            handlers.push({
                cb: cb,
                cxt: cxt || self.cxt || self,
                pause: false,
                i: 0,
                once: once
            });
            self._events[ename] = handlers;
        });
    }

    /**
     * 绑定一个事件
     * @param name 只能是字符串
     * @param cb
     * @param cxt
     * @returns {Event}
     */
    Event.prototype.on = function (name, cb, cxt) {
        eventsOnApi(this, name, cb, cxt, false);
        return this;
    };

    Event.prototype.once = function (name, cb, cxt) {
        eventsOnApi(this, name, cb, cxt, true);
        return this;
    };

    /**
     * 卸载某个事件
     * @param name
     * @returns {Event}
     */
    Event.prototype.off = function (name, cb, cxt) {

        var events = eventsApi(this, name, cb, cxt);
        for (var key in events) {
            var e = this._events[key];
            events[key].slice(0).forEach(function (item) {
                e.splice(e.indexOf(item), 1);
            });
        }

        return this;
    }

    /**
     * 暂停某个事件,用法同off
     * @param name
     * @returns {Event}
     */
    Event.prototype.pause = function (name, cb, cxt) {
        eventsPauseApi(this, name, cb, cxt, true);
        return this;
    };

    /**
     * 恢复某个事件,用法同off
     * @param name
     * @returns {Event}
     */
    Event.prototype.resume = function (name, cb, cxt) {
        eventsPauseApi(this, name, cb, cxt, false);
        return this;
    };

    /**
     * 触发某个事件
     * @param name
     * @returns {Event}
     */
    Event.prototype.trigger = function (name) {

        var self = this;
        if (!name || typeof name !== 'string') return this;
        var len = arguments.length;
        var args = [], i = 1;
        while (i < len) {
            args.push(arguments[i++]);
        }

        name.split(/\s/).forEach(function (ename) {
            if (ename && self._events[ename]) {
                self._events[ename].forEach(function (handle) {
                    if (!handle.pause && !(handle.i === 1 && handle.once)) {
                        handle.cb.apply(handle.cxt, args);
                        handle.i++;
                    }
                });
            }
        });

        return this;
    };

    if (true) {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Event;
        }
        exports.Event = Event;
    } else {
        window.Event = Event;
    }

})();

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_m_touch__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_m_touch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_m_touch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_styl__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PickerContainer_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PickerContainer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__PickerContainer_vue__);





__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_m_touch___default.a)

/* harmony default export */ __webpack_exports__["a"] = __WEBPACK_IMPORTED_MODULE_3__PickerContainer_vue___default.a;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var Touch = __webpack_require__(5)
var domEventHelper = __webpack_require__(4)

module.exports = function (Vue, options) {

  options = options || {}
  var longTapTime = options.longTapTime || 350
  var isSupportTouch = "ontouchend" in document

  Vue.directive('touch', {
    bind: function (el, binding, vnode) {
      var longTapTimeout      = null,
          tapTimeout          = null,
          swipeTimeout        = null,
          handler, args       = null,
          isFunctionalHandler = isFunction(binding.value)

      if (isFunctionalHandler) {
        handler = binding.value
      } else if (isObject(binding.value)) {
        el.__value = binding.value
        handler = binding.value.handler
      }

      var resolve = function (res, type) {
        if (type !== binding.arg || !handler) return
        var e = res.e
        var _handler = function () {
          if (isFunctionalHandler) {
            args = [e, el]
          } else {
            args = [el.__value, e, el]
          }
          if (binding.modifiers.self) {
            if (e.target === el) {
              handler.apply(binding.value, args)
            }
          } else {
            handler.apply(binding.value, args)
          }
        }

        switch (binding.arg) {
          case 'tap':
            if (!isSupportTouch || (res.spend < 250 && Math.abs(res.x1 - res.x2) < 10 && Math.abs(res.y1 - res.y2) < 10)) {
              _handler()
            }
            break
          case 'longtap':
            _handler()
            break
          case 'swipeleft':
            if (res.dir === 'left' && Math.abs(res.x1 - res.x2) > 30) {
              _handler()
            }
            break
          case 'swiperight':
            if (res.dir === 'right' && Math.abs(res.x1 - res.x2) > 30) {
              _handler()
            }
            break
        }
      }

      var modify = function (e) {
        if (binding.modifiers.stop) {
          e.stopPropagation()
        }
        if (binding.modifiers.prevent) {
          e.preventDefault()
        }
      }

      // 不支持touch事件
      if (!isSupportTouch) {
        domEventHelper.add(el, 'click', function (e) {
          modify(e)
          resolve({e: e}, 'tap')
        })
        return
      }

      var touch = el.__touch = new Touch(el)

      touch.on('touch:start', function (res) {
        modify(res.e)
        longTapTimeout = setTimeout(function () {
          resolve(res, 'longtap')
        }, longTapTime)
      })

      touch.on('touch:move', function (res) {
        modify(res.e)
        clearTimeout(longTapTimeout)
      })

      touch.on('touch:end', function (res) {
        clearTimeout(longTapTimeout)
        modify(res.e)
        tapTimeout = setTimeout(function () {
          resolve(res, 'tap')
        }, 0)

        swipeTimeout = setTimeout(function () {
          resolve(res, 'swipeleft')
          resolve(res, 'swiperight')
        }, 0)
      })

      touch.on('scroll', function () {
        clearTimeout(tapTimeout)
        clearTimeout(longTapTimeout)
        clearTimeout(swipeTimeout)
      })

      touch.start()
    },

    update: function (el, binding) {
      if (isObject(binding.value)) {
        el.__value = binding.value
      }
    },

    unbind: function (el) {
      // 删除dom监听事件
      if (!isSupportTouch) {
        domEventHelper.remove(el, 'click')
      } else if (el.__touch) {
        el.__touch.destroy()
        el.__touch = null
      }
    }
  })
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isFunction (obj) {
  return typeof obj === 'function'
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = [
  [
    {"text": "北京","abbreviated":"北京","value":"1098"},
    {"text": "天津","abbreviated":"天津","value":"3256"},
    {"text": "河北","abbreviated":"河北","value":"1511"},
    {"text": "山西","abbreviated":"山西","value":"2728"},
    {"text": "内蒙古","abbreviated":"内蒙古","value":"2434"},
    {"text": "辽宁","abbreviated":"辽宁","value":"2361"},
    {"text": "吉林","abbreviated":"吉林","value":"2118"},
    {"text": "黑龙江","abbreviated":"黑龙江","value":"1816"},
    {"text": "上海","abbreviated":"上海","value":"2610"},
    {"text": "江苏","abbreviated":"江苏","value":"2177"},
    {"text": "浙江","abbreviated":"浙江","value":"3478"},
    {"text": "安徽","abbreviated":"安徽","value":"1002"},
    {"text": "福建","abbreviated":"福建","value":"1103"},
    {"text": "江西","abbreviated":"江西","value":"2258"},
    {"text": "山东","abbreviated":"山东","value":"2847"},
    {"text": "河南","abbreviated":"河南","value":"1670"},
    {"text": "湖北","abbreviated":"湖北","value":"1908"},
    {"text": "湖南","abbreviated":"湖南","value":"2002"},
    {"text": "广东","abbreviated":"广东","value":"2614"},
    {"text": "广西","abbreviated":"广西","value":"1277"},
    {"text": "海南","abbreviated":"海南","value":"1474"},
    {"text": "重庆","abbreviated":"重庆","value":"3262"},
    {"text": "四川","abbreviated":"四川","value":"3078"},
    {"text": "贵州","abbreviated":"贵州","value":"1382"},
    {"text": "云南","abbreviated":"云南","value":"3559"},
    {"text": "西藏","abbreviated":"西藏","value":"3290"},
    {"text": "陕西","abbreviated":"陕西","value":"2973"},
    {"text": "甘肃","abbreviated":"甘肃","value":"1181"},
    {"text": "青海","abbreviated":"青海","value":"2561"},
    {"text": "宁夏","abbreviated":"宁夏","value":"2536"},
    {"text": "新疆","abbreviated":"新疆","value":"3371"},
    {"text": "台湾","abbreviated":"台湾","value":"4858"},
    {"text": "香港","abbreviated":"香港","value":"4846"},
    {"text": "澳门","abbreviated":"澳门","value":"4853"}
  ],
  [
    [
      {

        "text": "北京","abbreviated":"北京",
        "value": 1099
      }
    ],
    [
      {

        "text": "天津","abbreviated":"天津",
        "value": 3257
      }
    ],
    [
      {

        "text": "石家庄","abbreviated":"石家庄",
        "value": 1512
      },
      {

        "text": "唐山","abbreviated":"唐山",
        "value": 1531
      },
      {

        "text": "秦皇岛","abbreviated":"秦皇岛",
        "value": 1541
      },
      {

        "text": "邯郸","abbreviated":"邯郸",
        "value": 1547
      },
      {

        "text": "邢台","abbreviated":"邢台",
        "value": 1564
      },
      {

        "text": "保定","abbreviated":"保定",
        "value": 1583
      },
      {

        "text": "张家口","abbreviated":"张家口",
        "value": 1607
      },
      {

        "text": "承德","abbreviated":"承德",
        "value": 1622
      },
      {

        "text": "沧州","abbreviated":"沧州",
        "value": 1632
      },
      {

        "text": "廊坊","abbreviated":"廊坊",
        "value": 1648
      },
      {

        "text": "衡水","abbreviated":"衡水",
        "value": 1658
      }
    ],
    [
      {

        "text": "太原","abbreviated":"太原",
        "value": 2729
      },
      {

        "text": "大同","abbreviated":"大同",
        "value": 2735
      },
      {

        "text": "阳泉","abbreviated":"阳泉",
        "value": 2744
      },
      {

        "text": "长治","abbreviated":"长治",
        "value": 2748
      },
      {

        "text": "晋城","abbreviated":"晋城",
        "value": 2761
      },
      {

        "text": "朔州","abbreviated":"朔州",
        "value": 2768
      },
      {

        "text": "晋中","abbreviated":"晋中",
        "value": 2774
      },
      {

        "text": "忻州","abbreviated":"忻州",
        "value": 2786
      },
      {

        "text": "临汾","abbreviated":"临汾",
        "value": 2801
      },
      {

        "text": "运城","abbreviated":"运城",
        "value": 2819
      },
      {

        "text": "吕梁","abbreviated":"吕梁",
        "value": 2833
      }
    ],
    [
      {

        "text": "乌兰察布","abbreviated":"乌兰察布",
        "value": 2492
      },
      {

        "text": "锡林郭勒盟","abbreviated":"锡林郭勒盟",
        "value": 2504
      },
      {

        "text": "巴彦淖尔","abbreviated":"巴彦淖尔",
        "value": 2517
      },
      {

        "text": "阿拉善盟","abbreviated":"阿拉善盟",
        "value": 2525
      },
      {

        "text": "兴安盟","abbreviated":"兴安盟",
        "value": 2529
      },
      {

        "text": "呼和浩特","abbreviated":"呼和浩特",
        "value": 2435
      },
      {

        "text": "包头","abbreviated":"包头",
        "value": 2442
      },
      {

        "text": "乌海","abbreviated":"乌海",
        "value": 2447
      },
      {

        "text": "赤峰","abbreviated":"赤峰",
        "value": 2449
      },
      {

        "text": "通辽","abbreviated":"通辽",
        "value": 2460
      },
      {

        "text": "鄂尔多斯","abbreviated":"鄂尔多斯",
        "value": 2469
      },
      {

        "text": "呼伦贝尔","abbreviated":"呼伦贝尔",
        "value": 2478
      }
    ],
    [
      {

        "text": "本溪","abbreviated":"本溪",
        "value": 2384
      },
      {

        "text": "沈阳","abbreviated":"沈阳",
        "value": 2362
      },
      {

        "text": "大连","abbreviated":"大连",
        "value": 2368
      },
      {

        "text": "鞍山","abbreviated":"鞍山",
        "value": 2374
      },
      {

        "text": "抚顺","abbreviated":"抚顺",
        "value": 2379
      },
      {

        "text": "丹东","abbreviated":"丹东",
        "value": 2388
      },
      {

        "text": "锦州","abbreviated":"锦州",
        "value": 2393
      },
      {

        "text": "葫芦岛","abbreviated":"葫芦岛",
        "value": 2399
      },
      {

        "text": "营口","abbreviated":"营口",
        "value": 2404
      },
      {

        "text": "盘锦","abbreviated":"盘锦",
        "value": 2408
      },
      {

        "text": "阜新","abbreviated":"阜新",
        "value": 2412
      },
      {

        "text": "辽阳","abbreviated":"辽阳",
        "value": 2416
      },
      {

        "text": "铁岭","abbreviated":"铁岭",
        "value": 2420
      },
      {

        "text": "朝阳","abbreviated":"朝阳",
        "value": 2427
      }
    ],
    [
      {

        "text": "长春","abbreviated":"长春",
        "value": 2119
      },
      {

        "text": "吉林","abbreviated":"吉林",
        "value": 2125
      },
      {

        "text": "四平","abbreviated":"四平",
        "value": 2132
      },
      {

        "text": "辽源","abbreviated":"辽源",
        "value": 2138
      },
      {

        "text": "通化","abbreviated":"通化",
        "value": 2142
      },
      {

        "text": "白山","abbreviated":"白山",
        "value": 2149
      },
      {

        "text": "松原","abbreviated":"松原",
        "value": 2156
      },
      {

        "text": "白城","abbreviated":"白城",
        "value": 2162
      },
      {

        "text": "延边朝鲜族自治州","abbreviated":"延边朝鲜族自治州",
        "value": 2168
      }
    ],
    [
      {

        "text": "哈尔滨","abbreviated":"哈尔滨",
        "value": 1817
      },
      {

        "text": "齐齐哈尔","abbreviated":"齐齐哈尔",
        "value": 1831
      },
      {

        "text": "鹤岗","abbreviated":"鹤岗",
        "value": 1842
      },
      {

        "text": "双鸭山","abbreviated":"双鸭山",
        "value": 1846
      },
      {

        "text": "鸡西","abbreviated":"鸡西",
        "value": 1852
      },
      {

        "text": "大庆","abbreviated":"大庆",
        "value": 1857
      },
      {

        "text": "伊春","abbreviated":"伊春",
        "value": 1863
      },
      {

        "text": "牡丹江","abbreviated":"牡丹江",
        "value": 1867
      },
      {

        "text": "佳木斯","abbreviated":"佳木斯",
        "value": 1875
      },
      {

        "text": "七台河","abbreviated":"七台河",
        "value": 1883
      },
      {

        "text": "黑河","abbreviated":"黑河",
        "value": 1886
      },
      {

        "text": "绥化","abbreviated":"绥化",
        "value": 1893
      },
      {

        "text": "大兴安岭","abbreviated":"大兴安岭",
        "value": 1904
      }
    ],
    [
      {

        "text": "上海","abbreviated":"上海",
        "value": 2611
      }
    ],
    [
      {

        "text": "南京","abbreviated":"南京",
        "value": 2178
      },
      {

        "text": "徐州","abbreviated":"徐州",
        "value": 2182
      },
      {

        "text": "连云港","abbreviated":"连云港",
        "value": 2190
      },
      {

        "text": "淮安","abbreviated":"淮安",
        "value": 2196
      },
      {

        "text": "宿迁","abbreviated":"宿迁",
        "value": 2202
      },
      {

        "text": "盐城","abbreviated":"盐城",
        "value": 2208
      },
      {

        "text": "扬州","abbreviated":"扬州",
        "value": 2218
      },
      {

        "text": "泰州","abbreviated":"泰州",
        "value": 2224
      },
      {

        "text": "南通","abbreviated":"南通",
        "value": 2230
      },
      {

        "text": "镇江","abbreviated":"镇江",
        "value": 2238
      },
      {

        "text": "常州","abbreviated":"常州",
        "value": 2243
      },
      {

        "text": "无锡","abbreviated":"无锡",
        "value": 2247
      },
      {

        "text": "苏州","abbreviated":"苏州",
        "value": 2251
      }
    ],
    [
      {

        "text": "宁波","abbreviated":"宁波",
        "value": 3486
      },
      {

        "text": "温州","abbreviated":"温州",
        "value": 3493
      },
      {

        "text": "嘉兴","abbreviated":"嘉兴",
        "value": 3503
      },
      {

        "text": "湖州","abbreviated":"湖州",
        "value": 3510
      },
      {

        "text": "绍兴","abbreviated":"绍兴",
        "value": 3515
      },
      {

        "text": "金华","abbreviated":"金华",
        "value": 3522
      },
      {

        "text": "舟山","abbreviated":"舟山",
        "value": 3537
      },
      {

        "text": "台州","abbreviated":"台州",
        "value": 3541
      },
      {

        "text": "丽水","abbreviated":"丽水",
        "value": 3549
      },
      {

        "text": "杭州","abbreviated":"杭州",
        "value": 3479
      },
      {

        "text": "衢州","abbreviated":"衢州",
        "value": 3531
      }
    ],
    [
      {

        "text": "阜阳","abbreviated":"阜阳",
        "value": 1054
      },
      {

        "text": "合肥","abbreviated":"合肥",
        "value": 1003
      },
      {

        "text": "芜湖","abbreviated":"芜湖",
        "value": 1008
      },
      {

        "text": "蚌埠","abbreviated":"蚌埠",
        "value": 1013
      },
      {

        "text": "淮南","abbreviated":"淮南",
        "value": 1018
      },
      {

        "text": "马鞍山","abbreviated":"马鞍山",
        "value": 1021
      },
      {

        "text": "淮北","abbreviated":"淮北",
        "value": 1024
      },
      {

        "text": "铜陵","abbreviated":"铜陵",
        "value": 1027
      },
      {

        "text": "安庆","abbreviated":"安庆",
        "value": 1030
      },
      {

        "text": "黄山","abbreviated":"黄山",
        "value": 1040
      },
      {

        "text": "滁州","abbreviated":"滁州",
        "value": 1046
      },
      {

        "text": "宿州","abbreviated":"宿州",
        "value": 1061
      },
      {

        "text": "巢湖","abbreviated":"巢湖",
        "value": 1067
      },
      {

        "text": "六安","abbreviated":"六安",
        "value": 1073
      },
      {

        "text": "亳州","abbreviated":"亳州",
        "value": 1080
      },
      {

        "text": "池州","abbreviated":"池州",
        "value": 1085
      },
      {

        "text": "宣城","abbreviated":"宣城",
        "value": 1090
      }
    ],
    [
      {

        "text": "福州","abbreviated":"福州",
        "value": 1104
      },
      {

        "text": "厦门","abbreviated":"厦门",
        "value": 1114
      },
      {

        "text": "三明","abbreviated":"三明",
        "value": 1116
      },
      {

        "text": "莆田","abbreviated":"莆田",
        "value": 1128
      },
      {

        "text": "泉州","abbreviated":"泉州",
        "value": 1131
      },
      {

        "text": "漳州","abbreviated":"漳州",
        "value": 1141
      },
      {

        "text": "南平","abbreviated":"南平",
        "value": 1152
      },
      {

        "text": "龙岩","abbreviated":"龙岩",
        "value": 1163
      },
      {

        "text": "宁德","abbreviated":"宁德",
        "value": 1171
      }
    ],
    [
      {

        "text": "南昌","abbreviated":"南昌",
        "value": 2259
      },
      {

        "text": "景德镇","abbreviated":"景德镇",
        "value": 2265
      },
      {

        "text": "萍乡","abbreviated":"萍乡",
        "value": 2269
      },
      {

        "text": "新余","abbreviated":"新余",
        "value": 2274
      },
      {

        "text": "九江","abbreviated":"九江",
        "value": 2277
      },
      {

        "text": "鹰潭","abbreviated":"鹰潭",
        "value": 2289
      },
      {

        "text": "赣州","abbreviated":"赣州",
        "value": 2293
      },
      {

        "text": "吉安","abbreviated":"吉安",
        "value": 2312
      },
      {

        "text": "宜春","abbreviated":"宜春",
        "value": 2325
      },
      {

        "text": "抚州","abbreviated":"抚州",
        "value": 2336
      },
      {

        "text": "上饶","abbreviated":"上饶",
        "value": 2348
      }
    ],
    [
      {

        "text": "聊城","abbreviated":"聊城",
        "value": 2946
      },
      {

        "text": "滨州","abbreviated":"滨州",
        "value": 2955
      },
      {

        "text": "菏泽","abbreviated":"菏泽",
        "value": 2963
      },
      {

        "text": "潍坊","abbreviated":"潍坊",
        "value": 2874
      },
      {

        "text": "日照","abbreviated":"日照",
        "value": 2917
      },
      {

        "text": "济南","abbreviated":"济南",
        "value": 2848
      },
      {

        "text": "青岛","abbreviated":"青岛",
        "value": 2854
      },
      {

        "text": "淄博","abbreviated":"淄博",
        "value": 2861
      },
      {

        "text": "枣庄","abbreviated":"枣庄",
        "value": 2866
      },
      {

        "text": "东营","abbreviated":"东营",
        "value": 2869
      },
      {

        "text": "烟台","abbreviated":"烟台",
        "value": 2884
      },
      {

        "text": "威海","abbreviated":"威海",
        "value": 2894
      },
      {

        "text": "济宁","abbreviated":"济宁",
        "value": 2899
      },
      {

        "text": "泰安","abbreviated":"泰安",
        "value": 2911
      },
      {

        "text": "莱芜","abbreviated":"莱芜",
        "value": 2921
      },
      {

        "text": "德州","abbreviated":"德州",
        "value": 2923
      },
      {

        "text": "临沂","abbreviated":"临沂",
        "value": 2935
      }
    ],
    [
      {

        "text": "郑州","abbreviated":"郑州",
        "value": 1671
      },
      {

        "text": "鹤壁","abbreviated":"鹤壁",
        "value": 1713
      },
      {

        "text": "开封","abbreviated":"开封",
        "value": 1679
      },
      {

        "text": "洛阳","abbreviated":"洛阳",
        "value": 1686
      },
      {

        "text": "平顶山","abbreviated":"平顶山",
        "value": 1697
      },
      {

        "text": "焦作","abbreviated":"焦作",
        "value": 1705
      },
      {

        "text": "新乡","abbreviated":"新乡",
        "value": 1717
      },
      {

        "text": "安阳","abbreviated":"安阳",
        "value": 1727
      },
      {

        "text": "濮阳","abbreviated":"濮阳",
        "value": 1734
      },
      {

        "text": "许昌","abbreviated":"许昌",
        "value": 1741
      },
      {

        "text": "漯河","abbreviated":"漯河",
        "value": 1748
      },
      {

        "text": "三门峡","abbreviated":"三门峡",
        "value": 1753
      },
      {

        "text": "南阳","abbreviated":"南阳",
        "value": 1760
      },
      {

        "text": "商丘","abbreviated":"商丘",
        "value": 1773
      },
      {

        "text": "信阳","abbreviated":"信阳",
        "value": 1782
      },
      {

        "text": "周口","abbreviated":"周口",
        "value": 1792
      },
      {

        "text": "驻马店","abbreviated":"驻马店",
        "value": 1803
      },
      {

        "text": "济源","abbreviated":"济源",
        "value": 4915
      }
    ],
    [
      {

        "text": "武汉","abbreviated":"武汉",
        "value": 1909
      },
      {

        "text": "黄石","abbreviated":"黄石",
        "value": 1911
      },
      {

        "text": "襄阳","abbreviated":"襄阳",
        "value": 1915
      },
      {

        "text": "十堰","abbreviated":"十堰",
        "value": 1923
      },
      {

        "text": "荆州","abbreviated":"荆州",
        "value": 1931
      },
      {

        "text": "宜昌","abbreviated":"宜昌",
        "value": 1939
      },
      {

        "text": "荆门","abbreviated":"荆门",
        "value": 1949
      },
      {

        "text": "鄂州","abbreviated":"鄂州",
        "value": 1954
      },
      {

        "text": "孝感","abbreviated":"孝感",
        "value": 1956
      },
      {

        "text": "黄冈","abbreviated":"黄冈",
        "value": 1964
      },
      {

        "text": "咸宁","abbreviated":"咸宁",
        "value": 1975
      },
      {

        "text": "随州","abbreviated":"随州",
        "value": 1982
      },
      {

        "text": "仙桃","abbreviated":"仙桃",
        "value": 1985
      },
      {

        "text": "天门","abbreviated":"天门",
        "value": 1987
      },
      {

        "text": "潜江","abbreviated":"潜江",
        "value": 1989
      },
      {

        "text": "神农架林区","abbreviated":"神农架林区",
        "value": 1991
      },
      {

        "text": "恩施土家族苗族自治州","abbreviated":"恩施土家族苗族自治州",
        "value": 1993
      }
    ],
    [
      {

        "text": "长沙","abbreviated":"长沙",
        "value": 2003
      },
      {

        "text": "株洲","abbreviated":"株洲",
        "value": 2009
      },
      {

        "text": "湘潭","abbreviated":"湘潭",
        "value": 2016
      },
      {

        "text": "衡阳","abbreviated":"衡阳",
        "value": 2021
      },
      {

        "text": "邵阳","abbreviated":"邵阳",
        "value": 2030
      },
      {

        "text": "岳阳","abbreviated":"岳阳",
        "value": 2041
      },
      {

        "text": "常德","abbreviated":"常德",
        "value": 2049
      },
      {

        "text": "张家界","abbreviated":"张家界",
        "value": 2058
      },
      {

        "text": "益阳","abbreviated":"益阳",
        "value": 2062
      },
      {

        "text": "郴州","abbreviated":"郴州",
        "value": 2068
      },
      {

        "text": "永州","abbreviated":"永州",
        "value": 2079
      },
      {

        "text": "怀化","abbreviated":"怀化",
        "value": 2090
      },
      {

        "text": "娄底","abbreviated":"娄底",
        "value": 2103
      },
      {

        "text": "湘西土家族苗族自治州","abbreviated":"湘西土家族苗族自治州",
        "value": 2109
      }
    ],
    [
      {

        "text": "云浮","abbreviated":"云浮",
        "value": 2722
      },
      {

        "text": "广州","abbreviated":"广州",
        "value": 2615
      },
      {

        "text": "深圳","abbreviated":"深圳",
        "value": 2619
      },
      {

        "text": "珠海","abbreviated":"珠海",
        "value": 2621
      },
      {

        "text": "汕头","abbreviated":"汕头",
        "value": 2623
      },
      {

        "text": "韶关","abbreviated":"韶关",
        "value": 2628
      },
      {

        "text": "河源","abbreviated":"河源",
        "value": 2638
      },
      {

        "text": "梅州","abbreviated":"梅州",
        "value": 2645
      },
      {

        "text": "惠州","abbreviated":"惠州",
        "value": 2654
      },
      {

        "text": "汕尾","abbreviated":"汕尾",
        "value": 2660
      },
      {

        "text": "东莞","abbreviated":"东莞",
        "value": 2665
      },
      {

        "text": "中山","abbreviated":"中山",
        "value": 2667
      },
      {

        "text": "江门","abbreviated":"江门",
        "value": 2669
      },
      {

        "text": "佛山","abbreviated":"佛山",
        "value": 2675
      },
      {

        "text": "阳江","abbreviated":"阳江",
        "value": 2677
      },
      {

        "text": "湛江","abbreviated":"湛江",
        "value": 2682
      },
      {

        "text": "茂名","abbreviated":"茂名",
        "value": 2689
      },
      {

        "text": "肇庆","abbreviated":"肇庆",
        "value": 2695
      },
      {

        "text": "清远","abbreviated":"清远",
        "value": 2703
      },
      {

        "text": "潮州","abbreviated":"潮州",
        "value": 2712
      },
      {

        "text": "揭阳","abbreviated":"揭阳",
        "value": 2716
      }
    ],
    [
      {

        "text": "百色","abbreviated":"百色",
        "value": 1337
      },
      {

        "text": "南宁","abbreviated":"南宁",
        "value": 1278
      },
      {

        "text": "柳州","abbreviated":"柳州",
        "value": 1287
      },
      {

        "text": "桂林","abbreviated":"桂林",
        "value": 1295
      },
      {

        "text": "梧州","abbreviated":"梧州",
        "value": 1309
      },
      {

        "text": "北海","abbreviated":"北海",
        "value": 1315
      },
      {

        "text": "防城港","abbreviated":"防城港",
        "value": 1318
      },
      {

        "text": "钦州","abbreviated":"钦州",
        "value": 1322
      },
      {

        "text": "贵港","abbreviated":"贵港",
        "value": 1326
      },
      {

        "text": "玉林","abbreviated":"玉林",
        "value": 1330
      },
      {

        "text": "贺州","abbreviated":"贺州",
        "value": 1350
      },
      {

        "text": "河池","abbreviated":"河池",
        "value": 1355
      },
      {

        "text": "来宾","abbreviated":"来宾",
        "value": 1367
      },
      {

        "text": "崇左","abbreviated":"崇左",
        "value": 1374
      }
    ],
    [
      {

        "text": "保亭黎族苗族自治县","abbreviated":"保亭黎族苗族自治县",
        "value": 1507
      },
      {

        "text": "南沙群岛","abbreviated":"南沙群岛",
        "value": 3705
      },
      {

        "text": "西沙群岛","abbreviated":"西沙群岛",
        "value": 3707
      },
      {

        "text": "中沙群岛的岛礁及其海域","abbreviated":"中沙群岛的岛礁及其海域",
        "value": 3709
      },
      {

        "text": "海口","abbreviated":"海口",
        "value": 1475
      },
      {

        "text": "三亚","abbreviated":"三亚",
        "value": 1477
      },
      {

        "text": "五指山","abbreviated":"五指山",
        "value": 1479
      },
      {

        "text": "琼海","abbreviated":"琼海",
        "value": 1481
      },
      {

        "text": "儋州","abbreviated":"儋州",
        "value": 1483
      },
      {

        "text": "文昌","abbreviated":"文昌",
        "value": 1485
      },
      {

        "text": "万宁","abbreviated":"万宁",
        "value": 1487
      },
      {

        "text": "东方","abbreviated":"东方",
        "value": 1489
      },
      {

        "text": "澄迈县","abbreviated":"澄迈县",
        "value": 1491
      },
      {

        "text": "定安县","abbreviated":"定安县",
        "value": 1493
      },
      {

        "text": "屯昌县","abbreviated":"屯昌县",
        "value": 1495
      },
      {

        "text": "临高县","abbreviated":"临高县",
        "value": 1497
      },
      {

        "text": "白沙黎族自治县","abbreviated":"白沙黎族自治县",
        "value": 1499
      },
      {

        "text": "昌江黎族自治县","abbreviated":"昌江黎族自治县",
        "value": 1501
      },
      {

        "text": "乐东黎族自治县","abbreviated":"乐东黎族自治县",
        "value": 1503
      },
      {

        "text": "陵水黎族自治县","abbreviated":"陵水黎族自治县",
        "value": 1505
      },
      {

        "text": "琼中黎族苗族自治县","abbreviated":"琼中黎族苗族自治县",
        "value": 1509
      },
      {

        "text": "三沙","abbreviated":"三沙",
        "value": 4985
      }
    ],
    [
      {

        "text": "重庆","abbreviated":"重庆",
        "value": 3263
      }
    ],
    [
      {

        "text": "成都","abbreviated":"成都",
        "value": 3079
      },
      {

        "text": "自贡","abbreviated":"自贡",
        "value": 3091
      },
      {

        "text": "攀枝花","abbreviated":"攀枝花",
        "value": 3095
      },
      {

        "text": "泸州","abbreviated":"泸州",
        "value": 3099
      },
      {

        "text": "德阳","abbreviated":"德阳",
        "value": 3105
      },
      {

        "text": "绵阳","abbreviated":"绵阳",
        "value": 3112
      },
      {

        "text": "广元","abbreviated":"广元",
        "value": 3121
      },
      {

        "text": "遂宁","abbreviated":"遂宁",
        "value": 3127
      },
      {

        "text": "内江","abbreviated":"内江",
        "value": 3132
      },
      {

        "text": "乐山","abbreviated":"乐山",
        "value": 3137
      },
      {

        "text": "南充","abbreviated":"南充",
        "value": 3146
      },
      {

        "text": "宜宾","abbreviated":"宜宾",
        "value": 3154
      },
      {

        "text": "广安","abbreviated":"广安",
        "value": 3165
      },
      {

        "text": "达州","abbreviated":"达州",
        "value": 3171
      },
      {

        "text": "巴中","abbreviated":"巴中",
        "value": 3179
      },
      {

        "text": "眉山","abbreviated":"眉山",
        "value": 3193
      },
      {

        "text": "资阳","abbreviated":"资阳",
        "value": 3200
      },
      {

        "text": "阿坝藏族羌族自治州","abbreviated":"阿坝藏族羌族自治州",
        "value": 3205
      },
      {

        "text": "甘孜藏族自治州","abbreviated":"甘孜藏族自治州",
        "value": 3219
      },
      {

        "text": "凉山彝族自治州","abbreviated":"凉山彝族自治州",
        "value": 3238
      },
      {

        "text": "雅安","abbreviated":"雅安",
        "value": 3184
      }
    ],
    [
      {

        "text": "黔东南苗族侗族自治州","abbreviated":"黔东南苗族侗族自治州",
        "value": 1444
      },
      {

        "text": "贵阳","abbreviated":"贵阳",
        "value": 1383
      },
      {

        "text": "六盘水","abbreviated":"六盘水",
        "value": 1389
      },
      {

        "text": "遵义","abbreviated":"遵义",
        "value": 1394
      },
      {

        "text": "安顺","abbreviated":"安顺",
        "value": 1408
      },
      {

        "text": "铜仁","abbreviated":"铜仁",
        "value": 1415
      },
      {

        "text": "毕节","abbreviated":"毕节",
        "value": 1426
      },
      {

        "text": "黔西南布依族苗族自治州","abbreviated":"黔西南布依族苗族自治州",
        "value": 1435
      },
      {

        "text": "黔南布依族苗族自治州","abbreviated":"黔南布依族苗族自治州",
        "value": 1461
      }
    ],
    [
      {

        "text": "昆明","abbreviated":"昆明",
        "value": 3560
      },
      {

        "text": "曲靖","abbreviated":"曲靖",
        "value": 3571
      },
      {

        "text": "玉溪","abbreviated":"玉溪",
        "value": 3581
      },
      {

        "text": "保山","abbreviated":"保山",
        "value": 3591
      },
      {

        "text": "昭通","abbreviated":"昭通",
        "value": 3597
      },
      {

        "text": "普洱","abbreviated":"普洱",
        "value": 3609
      },
      {

        "text": "临沧","abbreviated":"临沧",
        "value": 3620
      },
      {

        "text": "丽江","abbreviated":"丽江",
        "value": 3629
      },
      {

        "text": "文山壮族苗族自治州","abbreviated":"文山壮族苗族自治州",
        "value": 3635
      },
      {

        "text": "红河哈尼族彝族自治州","abbreviated":"红河哈尼族彝族自治州",
        "value": 3644
      },
      {

        "text": "西双版纳傣族自治州","abbreviated":"西双版纳傣族自治州",
        "value": 3658
      },
      {

        "text": "楚雄彝族自治州","abbreviated":"楚雄彝族自治州",
        "value": 3662
      },
      {

        "text": "大理白族自治州","abbreviated":"大理白族自治州",
        "value": 3673
      },
      {

        "text": "德宏傣族景颇族自治州","abbreviated":"德宏傣族景颇族自治州",
        "value": 3686
      },
      {

        "text": "怒江傈僳族自治州","abbreviated":"怒江傈僳族自治州",
        "value": 3692
      },
      {

        "text": "迪庆藏族自治州","abbreviated":"迪庆藏族自治州",
        "value": 3697
      }
    ],
    [
      {

        "text": "拉萨","abbreviated":"拉萨",
        "value": 3291
      },
      {

        "text": "那曲","abbreviated":"那曲",
        "value": 3300
      },
      {

        "text": "昌都","abbreviated":"昌都",
        "value": 3311
      },
      {

        "text": "山南","abbreviated":"山南",
        "value": 3323
      },
      {

        "text": "日喀则","abbreviated":"日喀则",
        "value": 3336
      },
      {

        "text": "阿里","abbreviated":"阿里",
        "value": 3355
      },
      {

        "text": "林芝","abbreviated":"林芝",
        "value": 3363
      }
    ],
    [
      {

        "text": "西安","abbreviated":"西安",
        "value": 2974
      },
      {

        "text": "铜川","abbreviated":"铜川",
        "value": 2980
      },
      {

        "text": "宝鸡","abbreviated":"宝鸡",
        "value": 2983
      },
      {

        "text": "咸阳","abbreviated":"咸阳",
        "value": 2995
      },
      {

        "text": "渭南","abbreviated":"渭南",
        "value": 3008
      },
      {

        "text": "延安","abbreviated":"延安",
        "value": 3020
      },
      {

        "text": "汉中","abbreviated":"汉中",
        "value": 3034
      },
      {

        "text": "榆林","abbreviated":"榆林",
        "value": 3046
      },
      {

        "text": "安康","abbreviated":"安康",
        "value": 3059
      },
      {

        "text": "商洛","abbreviated":"商洛",
        "value": 3070
      }
    ],
    [
      {

        "text": "甘南藏族自治州","abbreviated":"甘南藏族自治州",
        "value": 1259
      },
      {

        "text": "兰州","abbreviated":"兰州",
        "value": 1182
      },
      {

        "text": "金昌","abbreviated":"金昌",
        "value": 1187
      },
      {

        "text": "白银","abbreviated":"白银",
        "value": 1190
      },
      {

        "text": "天水","abbreviated":"天水",
        "value": 1195
      },
      {

        "text": "嘉峪关","abbreviated":"嘉峪关",
        "value": 1202
      },
      {

        "text": "武威","abbreviated":"武威",
        "value": 1204
      },
      {

        "text": "张掖","abbreviated":"张掖",
        "value": 1209
      },
      {

        "text": "平凉","abbreviated":"平凉",
        "value": 1216
      },
      {

        "text": "酒泉","abbreviated":"酒泉",
        "value": 1224
      },
      {

        "text": "庆阳","abbreviated":"庆阳",
        "value": 1232
      },
      {

        "text": "定西","abbreviated":"定西",
        "value": 1241
      },
      {

        "text": "陇南","abbreviated":"陇南",
        "value": 1249
      },
      {

        "text": "临夏回族自治州","abbreviated":"临夏回族自治州",
        "value": 1268
      }
    ],
    [
      {

        "text": "西宁","abbreviated":"西宁",
        "value": 2562
      },
      {

        "text": "海东","abbreviated":"海东",
        "value": 2567
      },
      {

        "text": "海北藏族自治州","abbreviated":"海北藏族自治州",
        "value": 2574
      },
      {

        "text": "黄南藏族自治州","abbreviated":"黄南藏族自治州",
        "value": 2579
      },
      {

        "text": "海南藏族自治州","abbreviated":"海南藏族自治州",
        "value": 2584
      },
      {

        "text": "果洛藏族自治州","abbreviated":"果洛藏族自治州",
        "value": 2590
      },
      {

        "text": "玉树藏族自治州","abbreviated":"玉树藏族自治州",
        "value": 2597
      },
      {

        "text": "海西蒙古族藏族自治州","abbreviated":"海西蒙古族藏族自治州",
        "value": 2604
      }
    ],
    [
      {

        "text": "银川","abbreviated":"银川",
        "value": 2537
      },
      {

        "text": "石嘴山","abbreviated":"石嘴山",
        "value": 2542
      },
      {

        "text": "吴忠","abbreviated":"吴忠",
        "value": 2547
      },
      {

        "text": "中卫","abbreviated":"中卫",
        "value": 2552
      },
      {

        "text": "固原","abbreviated":"固原",
        "value": 2554
      }
    ],
    [
      {

        "text": "乌鲁木齐","abbreviated":"乌鲁木齐",
        "value": 3372
      },
      {

        "text": "克拉玛依","abbreviated":"克拉玛依",
        "value": 3375
      },
      {

        "text": "石河子","abbreviated":"石河子",
        "value": 3377
      },
      {

        "text": "阿拉尔","abbreviated":"阿拉尔",
        "value": 3379
      },
      {

        "text": "图木舒克","abbreviated":"图木舒克",
        "value": 3381
      },
      {

        "text": "五家渠","abbreviated":"五家渠",
        "value": 3383
      },
      {

        "text": "吐鲁番","abbreviated":"吐鲁番",
        "value": 3385
      },
      {

        "text": "哈密","abbreviated":"哈密",
        "value": 3389
      },
      {

        "text": "和田","abbreviated":"和田",
        "value": 3393
      },
      {

        "text": "阿克苏","abbreviated":"阿克苏",
        "value": 3402
      },
      {

        "text": "克孜勒苏柯尔克孜自治州","abbreviated":"克孜勒苏柯尔克孜自治州",
        "value": 3425
      },
      {

        "text": "巴音郭楞蒙古自治州","abbreviated":"巴音郭楞蒙古自治州",
        "value": 3430
      },
      {

        "text": "昌吉回族自治州","abbreviated":"昌吉回族自治州",
        "value": 3440
      },
      {

        "text": "博尔塔拉蒙古自治州","abbreviated":"博尔塔拉蒙古自治州",
        "value": 3449
      },
      {

        "text": "伊犁哈萨克自治州","abbreviated":"伊犁哈萨克自治州",
        "value": 3453
      },
      {

        "text": "喀什","abbreviated":"喀什",
        "value": 3412
      },
      {

        "text": "阿勒泰地区","abbreviated":"阿勒泰地区",
        "value": 3781
      },
      {

        "text": "塔城地区","abbreviated":"塔城地区",
        "value": 3782
      }
    ],
    [
      {

        "text": "台北市","abbreviated":"台北市",
        "value": 4901
      },
      {

        "text": "高雄市","abbreviated":"高雄市",
        "value": 4903
      },
      {

        "text": "新北市","abbreviated":"新北市",
        "value": 4859
      },
      {

        "text": "基隆市","abbreviated":"基隆市",
        "value": 4891
      },
      {

        "text": "新竹市","abbreviated":"新竹市",
        "value": 4893
      },
      {

        "text": "台中市","abbreviated":"台中市",
        "value": 4895
      },
      {

        "text": "嘉义市","abbreviated":"嘉义市",
        "value": 4897
      },
      {

        "text": "台南市","abbreviated":"台南市",
        "value": 4899
      },
      {

        "text": "桃园县","abbreviated":"桃园县",
        "value": 4863
      },
      {

        "text": "新竹县","abbreviated":"新竹县",
        "value": 4865
      },
      {

        "text": "苗栗县","abbreviated":"苗栗县",
        "value": 4867
      },
      {

        "text": "台中县","abbreviated":"台中县",
        "value": 4869
      },
      {

        "text": "彰化县","abbreviated":"彰化县",
        "value": 4871
      },
      {

        "text": "南投县","abbreviated":"南投县",
        "value": 4873
      },
      {

        "text": "云林县","abbreviated":"云林县",
        "value": 4875
      },
      {

        "text": "嘉义县","abbreviated":"嘉义县",
        "value": 4877
      },
      {

        "text": "台南县","abbreviated":"台南县",
        "value": 4879
      },
      {

        "text": "高雄县","abbreviated":"高雄县",
        "value": 4881
      },
      {

        "text": "屏东县","abbreviated":"屏东县",
        "value": 4883
      },
      {

        "text": "宜兰县","abbreviated":"宜兰县",
        "value": 4861
      },
      {

        "text": "花莲县","abbreviated":"花莲县",
        "value": 4887
      },
      {

        "text": "台东县","abbreviated":"台东县",
        "value": 4885
      },
      {

        "text": "澎湖县","abbreviated":"澎湖县",
        "value": 4889
      },
      {

        "text": "金门县","abbreviated":"金门县",
        "value": 4905
      },
      {

        "text": "连江县","abbreviated":"连江县",
        "value": 4907
      }
    ],
    [
      {

        "text": "香港岛","abbreviated":"香港岛",
        "value": 4847
      },
      {

        "text": "九龙","abbreviated":"九龙",
        "value": 4849
      },
      {

        "text": "新界","abbreviated":"新界",
        "value": 4851
      }
    ],
    [
      {

        "text": "澳门半岛","abbreviated":"澳门半岛",
        "value": 4854
      },
      {

        "text": "澳门离岛","abbreviated":"澳门离岛",
        "value": 4856
      }
    ]
  ],
  [
    [
      [
        {

          "text": "北京市朝阳区","abbreviated":"朝阳区",
          "value": 4476
        },
        {

          "text": "北京市崇文区","abbreviated":"崇文区",
          "value": 4477
        },
        {

          "text": "北京市大兴区","abbreviated":"大兴区",
          "value": 4478
        },
        {

          "text": "北京市东城区","abbreviated":"东城区",
          "value": 4479
        },
        {

          "text": "北京市房山区","abbreviated":"房山区",
          "value": 4480
        },
        {

          "text": "北京市丰台区","abbreviated":"丰台区",
          "value": 4481
        },
        {

          "text": "北京市海淀区","abbreviated":"海淀区",
          "value": 4482
        },
        {

          "text": "北京市门头沟区","abbreviated":"门头沟区",
          "value": 4483
        },
        {

          "text": "北京市平谷区","abbreviated":"平谷区",
          "value": 4484
        },
        {

          "text": "北京市石景山区","abbreviated":"石景山区",
          "value": 4485
        },
        {

          "text": "北京市顺义区","abbreviated":"顺义区",
          "value": 4486
        },
        {

          "text": "北京市通州区","abbreviated":"通州区",
          "value": 4487
        },
        {

          "text": "北京市西城区","abbreviated":"西城区",
          "value": 4488
        },
        {

          "text": "北京市宣武区","abbreviated":"宣武区",
          "value": 4489
        },
        {

          "text": "北京市昌平区","abbreviated":"昌平区",
          "value": 4390
        },
        {

          "text": "北京市怀柔区","abbreviated":"怀柔区",
          "value": 4391
        },
        {

          "text": "北京市","abbreviated":"北京市",
          "value": 1100
        },
        {

          "text": "密云县","abbreviated":"密云县",
          "value": 1101
        },
        {

          "text": "延庆县","abbreviated":"延庆县",
          "value": 1102
        }
      ]
    ],
    [
      [
        {

          "text": "天津市","abbreviated":"天津市",
          "value": 3258
        },
        {

          "text": "静海县","abbreviated":"静海县",
          "value": 3259
        },
        {

          "text": "宁河县","abbreviated":"宁河县",
          "value": 3260
        },
        {

          "text": "蓟县","abbreviated":"蓟县",
          "value": 3261
        },
        {

          "text": "天津市宝坻区","abbreviated":"宝坻区",
          "value": 4282
        },
        {

          "text": "天津市北辰区","abbreviated":"北辰区",
          "value": 4283
        },
        {

          "text": "天津市东丽区","abbreviated":"东丽区",
          "value": 4285
        },
        {

          "text": "天津市和平区","abbreviated":"和平区",
          "value": 4287
        },
        {

          "text": "天津市河北区","abbreviated":"河北区",
          "value": 4288
        },
        {

          "text": "天津市河东区","abbreviated":"河东区",
          "value": 4289
        },
        {

          "text": "天津市河西区","abbreviated":"河西区",
          "value": 4290
        },
        {

          "text": "天津市红桥区","abbreviated":"红桥区",
          "value": 4291
        },
        {

          "text": "天津市津南区","abbreviated":"津南区",
          "value": 4292
        },
        {

          "text": "天津市南开区","abbreviated":"南开区",
          "value": 4293
        },
        {

          "text": "天津市武清区","abbreviated":"武清区",
          "value": 4295
        },
        {

          "text": "天津市西青区","abbreviated":"西青区",
          "value": 4296
        },
        {

          "text": "天津市滨海新区","abbreviated":"滨海新区",
          "value": 4909
        }
      ]
    ],
    [
      [
        {

          "text": "行唐县","abbreviated":"行唐县",
          "value": 1523
        },
        {

          "text": "石家庄市桥西区","abbreviated":"桥西区",
          "value": 4412
        },
        {

          "text": "石家庄市长安区","abbreviated":"长安区",
          "value": 4632
        },
        {

          "text": "石家庄市井陉矿区","abbreviated":"井陉矿区",
          "value": 4633
        },
        {

          "text": "石家庄市桥东区","abbreviated":"桥东区",
          "value": 4634
        },
        {

          "text": "石家庄市新华区","abbreviated":"新华区",
          "value": 4635
        },
        {

          "text": "石家庄市裕华区","abbreviated":"裕华区",
          "value": 4636
        },
        {

          "text": "石家庄市","abbreviated":"石家庄市",
          "value": 1513
        },
        {

          "text": "辛集市","abbreviated":"辛集市",
          "value": 1514
        },
        {

          "text": "藁城市","abbreviated":"藁城市",
          "value": 1515
        },
        {

          "text": "晋州市","abbreviated":"晋州市",
          "value": 1516
        },
        {

          "text": "新乐市","abbreviated":"新乐市",
          "value": 1517
        },
        {

          "text": "石家庄市鹿泉区","abbreviated":"鹿泉区",
          "value": 1518
        },
        {

          "text": "平山县","abbreviated":"平山县",
          "value": 1519
        },
        {

          "text": "井陉县","abbreviated":"井陉县",
          "value": 1520
        },
        {

          "text": "栾城县","abbreviated":"栾城县",
          "value": 1521
        },
        {

          "text": "正定县","abbreviated":"正定县",
          "value": 1522
        },
        {

          "text": "灵寿县","abbreviated":"灵寿县",
          "value": 1524
        },
        {

          "text": "高邑县","abbreviated":"高邑县",
          "value": 1525
        },
        {

          "text": "赵县","abbreviated":"赵县",
          "value": 1526
        },
        {

          "text": "赞皇县","abbreviated":"赞皇县",
          "value": 1527
        },
        {

          "text": "深泽县","abbreviated":"深泽县",
          "value": 1528
        },
        {

          "text": "无极县","abbreviated":"无极县",
          "value": 1529
        },
        {

          "text": "元氏县","abbreviated":"元氏县",
          "value": 1530
        }
      ],
      [
        {

          "text": "迁西县","abbreviated":"迁西县",
          "value": 1535
        },
        {

          "text": "唐山市丰南区","abbreviated":"丰南区",
          "value": 4637
        },
        {

          "text": "唐山市丰润区","abbreviated":"丰润区",
          "value": 4638
        },
        {

          "text": "唐山市古冶区","abbreviated":"古冶区",
          "value": 4639
        },
        {

          "text": "唐山市开平区","abbreviated":"开平区",
          "value": 4640
        },
        {

          "text": "唐山市路北区","abbreviated":"路北区",
          "value": 4641
        },
        {

          "text": "唐山市路南区","abbreviated":"路南区",
          "value": 4642
        },
        {

          "text": "唐山市","abbreviated":"唐山市",
          "value": 1532
        },
        {

          "text": "遵化市","abbreviated":"遵化市",
          "value": 1533
        },
        {

          "text": "迁安市","abbreviated":"迁安市",
          "value": 1534
        },
        {

          "text": "滦南县","abbreviated":"滦南县",
          "value": 1536
        },
        {

          "text": "玉田县","abbreviated":"玉田县",
          "value": 1537
        },
        {

          "text": "唐海县","abbreviated":"唐海县",
          "value": 1538
        },
        {

          "text": "乐亭县","abbreviated":"乐亭县",
          "value": 1539
        },
        {

          "text": "滦县","abbreviated":"滦县",
          "value": 1540
        }
      ],
      [
        {

          "text": "秦皇岛市北戴河区","abbreviated":"北戴河区",
          "value": 4629
        },
        {

          "text": "秦皇岛市海港区","abbreviated":"海港区",
          "value": 4630
        },
        {

          "text": "秦皇岛市山海关区","abbreviated":"山海关区",
          "value": 4631
        },
        {

          "text": "秦皇岛市","abbreviated":"秦皇岛市",
          "value": 1542
        },
        {

          "text": "昌黎县","abbreviated":"昌黎县",
          "value": 1543
        },
        {

          "text": "卢龙县","abbreviated":"卢龙县",
          "value": 1544
        },
        {

          "text": "抚宁县","abbreviated":"抚宁县",
          "value": 1545
        },
        {

          "text": "青龙满族自治县","abbreviated":"青龙满族自治县",
          "value": 1546
        }
      ],
      [
        {

          "text": "邯郸市丛台区","abbreviated":"丛台区",
          "value": 4623
        },
        {

          "text": "邯郸市峰峰矿区","abbreviated":"峰峰矿区",
          "value": 4624
        },
        {

          "text": "邯郸市复兴区","abbreviated":"复兴区",
          "value": 4625
        },
        {

          "text": "邯郸市邯山区","abbreviated":"邯山区",
          "value": 4626
        },
        {

          "text": "邯郸市","abbreviated":"邯郸市",
          "value": 1548
        },
        {

          "text": "武安市","abbreviated":"武安市",
          "value": 1549
        },
        {

          "text": "邯郸县","abbreviated":"邯郸县",
          "value": 1550
        },
        {

          "text": "永年县","abbreviated":"永年县",
          "value": 1551
        },
        {

          "text": "曲周县","abbreviated":"曲周县",
          "value": 1552
        },
        {

          "text": "馆陶县","abbreviated":"馆陶县",
          "value": 1553
        },
        {

          "text": "魏县","abbreviated":"魏县",
          "value": 1554
        },
        {

          "text": "成安县","abbreviated":"成安县",
          "value": 1555
        },
        {

          "text": "大名县","abbreviated":"大名县",
          "value": 1556
        },
        {

          "text": "涉县","abbreviated":"涉县",
          "value": 1557
        },
        {

          "text": "鸡泽县","abbreviated":"鸡泽县",
          "value": 1558
        },
        {

          "text": "邱县","abbreviated":"邱县",
          "value": 1559
        },
        {

          "text": "广平县","abbreviated":"广平县",
          "value": 1560
        },
        {

          "text": "肥乡县","abbreviated":"肥乡县",
          "value": 1561
        },
        {

          "text": "临漳县","abbreviated":"临漳县",
          "value": 1562
        },
        {

          "text": "磁县","abbreviated":"磁县",
          "value": 1563
        }
      ],
      [
        {

          "text": "隆尧县","abbreviated":"隆尧县",
          "value": 1574
        },
        {

          "text": "邢台市桥东区","abbreviated":"桥东区",
          "value": 4643
        },
        {

          "text": "邢台市桥西区","abbreviated":"桥西区",
          "value": 4644
        },
        {

          "text": "邢台市","abbreviated":"邢台市",
          "value": 1565
        },
        {

          "text": "南宫市","abbreviated":"南宫市",
          "value": 1566
        },
        {

          "text": "沙河市","abbreviated":"沙河市",
          "value": 1567
        },
        {

          "text": "邢台县","abbreviated":"邢台县",
          "value": 1568
        },
        {

          "text": "柏乡县","abbreviated":"柏乡县",
          "value": 1569
        },
        {

          "text": "任县","abbreviated":"任县",
          "value": 1570
        },
        {

          "text": "清河县","abbreviated":"清河县",
          "value": 1571
        },
        {

          "text": "宁晋县","abbreviated":"宁晋县",
          "value": 1572
        },
        {

          "text": "威县","abbreviated":"威县",
          "value": 1573
        },
        {

          "text": "临城县","abbreviated":"临城县",
          "value": 1575
        },
        {

          "text": "广宗县","abbreviated":"广宗县",
          "value": 1576
        },
        {

          "text": "临西县","abbreviated":"临西县",
          "value": 1577
        },
        {

          "text": "内丘县","abbreviated":"内丘县",
          "value": 1578
        },
        {

          "text": "平乡县","abbreviated":"平乡县",
          "value": 1579
        },
        {

          "text": "巨鹿县","abbreviated":"巨鹿县",
          "value": 1580
        },
        {

          "text": "新河县","abbreviated":"新河县",
          "value": 1581
        },
        {

          "text": "南和县","abbreviated":"南和县",
          "value": 1582
        }
      ],
      [
        {

          "text": "安国市","abbreviated":"安国市",
          "value": 1587
        },
        {

          "text": "望都县","abbreviated":"望都县",
          "value": 1599
        },
        {

          "text": "保定市北市区","abbreviated":"北市区",
          "value": 4616
        },
        {

          "text": "保定市南市区","abbreviated":"南市区",
          "value": 4617
        },
        {

          "text": "保定市新市区","abbreviated":"新市区",
          "value": 4618
        },
        {

          "text": "保定市","abbreviated":"保定市",
          "value": 1584
        },
        {

          "text": "涿州市","abbreviated":"涿州市",
          "value": 1585
        },
        {

          "text": "定州市","abbreviated":"定州市",
          "value": 1586
        },
        {

          "text": "高碑店市","abbreviated":"高碑店市",
          "value": 1588
        },
        {

          "text": "满城县","abbreviated":"满城县",
          "value": 1589
        },
        {

          "text": "清苑县","abbreviated":"清苑县",
          "value": 1590
        },
        {

          "text": "涞水县","abbreviated":"涞水县",
          "value": 1591
        },
        {

          "text": "阜平县","abbreviated":"阜平县",
          "value": 1592
        },
        {

          "text": "徐水县","abbreviated":"徐水县",
          "value": 1593
        },
        {

          "text": "定兴县","abbreviated":"定兴县",
          "value": 1594
        },
        {

          "text": "唐县","abbreviated":"唐县",
          "value": 1595
        },
        {

          "text": "高阳县","abbreviated":"高阳县",
          "value": 1596
        },
        {

          "text": "容城县","abbreviated":"容城县",
          "value": 1597
        },
        {

          "text": "涞源县","abbreviated":"涞源县",
          "value": 1598
        },
        {

          "text": "安新县","abbreviated":"安新县",
          "value": 1600
        },
        {

          "text": "易县","abbreviated":"易县",
          "value": 1601
        },
        {

          "text": "曲阳县","abbreviated":"曲阳县",
          "value": 1602
        },
        {

          "text": "蠡县","abbreviated":"蠡县",
          "value": 1603
        },
        {

          "text": "顺平县","abbreviated":"顺平县",
          "value": 1604
        },
        {

          "text": "博野县","abbreviated":"博野县",
          "value": 1605
        },
        {

          "text": "雄县","abbreviated":"雄县",
          "value": 1606
        }
      ],
      [
        {

          "text": "张家口市桥东区","abbreviated":"桥东区",
          "value": 4645
        },
        {

          "text": "张家口市桥西区","abbreviated":"桥西区",
          "value": 4646
        },
        {

          "text": "张家口市下花园区","abbreviated":"下花园区",
          "value": 4647
        },
        {

          "text": "张家口市宣化区","abbreviated":"宣化区",
          "value": 4648
        },
        {

          "text": "张家口市","abbreviated":"张家口市",
          "value": 1608
        },
        {

          "text": "宣化县","abbreviated":"宣化县",
          "value": 1609
        },
        {

          "text": "康保县","abbreviated":"康保县",
          "value": 1610
        },
        {

          "text": "张北县","abbreviated":"张北县",
          "value": 1611
        },
        {

          "text": "阳原县","abbreviated":"阳原县",
          "value": 1612
        },
        {

          "text": "赤城县","abbreviated":"赤城县",
          "value": 1613
        },
        {

          "text": "沽源县","abbreviated":"沽源县",
          "value": 1614
        },
        {

          "text": "怀安县","abbreviated":"怀安县",
          "value": 1615
        },
        {

          "text": "怀来县","abbreviated":"怀来县",
          "value": 1616
        },
        {

          "text": "崇礼县","abbreviated":"崇礼县",
          "value": 1617
        },
        {

          "text": "尚义县","abbreviated":"尚义县",
          "value": 1618
        },
        {

          "text": "蔚县","abbreviated":"蔚县",
          "value": 1619
        },
        {

          "text": "涿鹿县","abbreviated":"涿鹿县",
          "value": 1620
        },
        {

          "text": "万全县","abbreviated":"万全县",
          "value": 1621
        }
      ],
      [
        {

          "text": "承德市双滦区","abbreviated":"双滦区",
          "value": 4410
        },
        {

          "text": "承德市双桥区","abbreviated":"双桥区",
          "value": 4621
        },
        {

          "text": "承德市鹰手营子矿区","abbreviated":"鹰手营子矿区",
          "value": 4622
        },
        {

          "text": "承德市","abbreviated":"承德市",
          "value": 1623
        },
        {

          "text": "承德县","abbreviated":"承德县",
          "value": 1624
        },
        {

          "text": "兴隆县","abbreviated":"兴隆县",
          "value": 1625
        },
        {

          "text": "隆化县","abbreviated":"隆化县",
          "value": 1626
        },
        {

          "text": "平泉县","abbreviated":"平泉县",
          "value": 1627
        },
        {

          "text": "滦平县","abbreviated":"滦平县",
          "value": 1628
        },
        {

          "text": "丰宁满族自治县","abbreviated":"丰宁满族自治县",
          "value": 1629
        },
        {

          "text": "围场满族蒙古族自治县","abbreviated":"围场满族蒙古族自治县",
          "value": 1630
        },
        {

          "text": "宽城满族自治县","abbreviated":"宽城满族自治县",
          "value": 1631
        }
      ],
      [
        {

          "text": "吴桥县","abbreviated":"吴桥县",
          "value": 1646
        },
        {

          "text": "沧州市新华区","abbreviated":"新华区",
          "value": 4619
        },
        {

          "text": "沧州市运河区","abbreviated":"运河区",
          "value": 4620
        },
        {

          "text": "沧州市","abbreviated":"沧州市",
          "value": 1633
        },
        {

          "text": "泊头市","abbreviated":"泊头市",
          "value": 1634
        },
        {

          "text": "任丘市","abbreviated":"任丘市",
          "value": 1635
        },
        {

          "text": "黄骅市","abbreviated":"黄骅市",
          "value": 1636
        },
        {

          "text": "河间市","abbreviated":"河间市",
          "value": 1637
        },
        {

          "text": "沧县","abbreviated":"沧县",
          "value": 1638
        },
        {

          "text": "青县","abbreviated":"青县",
          "value": 1639
        },
        {

          "text": "献县","abbreviated":"献县",
          "value": 1640
        },
        {

          "text": "东光县","abbreviated":"东光县",
          "value": 1641
        },
        {

          "text": "海兴县","abbreviated":"海兴县",
          "value": 1642
        },
        {

          "text": "盐山县","abbreviated":"盐山县",
          "value": 1643
        },
        {

          "text": "肃宁县","abbreviated":"肃宁县",
          "value": 1644
        },
        {

          "text": "南皮县","abbreviated":"南皮县",
          "value": 1645
        },
        {

          "text": "孟村回族自治县","abbreviated":"孟村回族自治县",
          "value": 1647
        }
      ],
      [
        {

          "text": "廊坊市安次区","abbreviated":"安次区",
          "value": 4411
        },
        {

          "text": "廊坊市广阳区","abbreviated":"广阳区",
          "value": 4628
        },
        {

          "text": "廊坊市","abbreviated":"廊坊市",
          "value": 1649
        },
        {

          "text": "霸州市","abbreviated":"霸州市",
          "value": 1650
        },
        {

          "text": "三河市","abbreviated":"三河市",
          "value": 1651
        },
        {

          "text": "固安县","abbreviated":"固安县",
          "value": 1652
        },
        {

          "text": "永清县","abbreviated":"永清县",
          "value": 1653
        },
        {

          "text": "香河县","abbreviated":"香河县",
          "value": 1654
        },
        {

          "text": "大城县","abbreviated":"大城县",
          "value": 1655
        },
        {

          "text": "文安县","abbreviated":"文安县",
          "value": 1656
        },
        {

          "text": "大厂回族自治县","abbreviated":"大厂回族自治县",
          "value": 1657
        }
      ],
      [
        {

          "text": "衡水市","abbreviated":"衡水市",
          "value": 1659
        },
        {

          "text": "衡水市桃城区","abbreviated":"桃城区",
          "value": 4627
        },
        {

          "text": "冀州市","abbreviated":"冀州市",
          "value": 1660
        },
        {

          "text": "深州市","abbreviated":"深州市",
          "value": 1661
        },
        {

          "text": "饶阳县","abbreviated":"饶阳县",
          "value": 1662
        },
        {

          "text": "枣强县","abbreviated":"枣强县",
          "value": 1663
        },
        {

          "text": "故城县","abbreviated":"故城县",
          "value": 1664
        },
        {

          "text": "阜城县","abbreviated":"阜城县",
          "value": 1665
        },
        {

          "text": "安平县","abbreviated":"安平县",
          "value": 1666
        },
        {

          "text": "武邑县","abbreviated":"武邑县",
          "value": 1667
        },
        {

          "text": "景县","abbreviated":"景县",
          "value": 1668
        },
        {

          "text": "武强县","abbreviated":"武强县",
          "value": 1669
        }
      ]
    ],
    [
      [
        {

          "text": "娄烦县","abbreviated":"娄烦县",
          "value": 2734
        },
        {

          "text": "太原市尖草坪区","abbreviated":"尖草坪区",
          "value": 4189
        },
        {

          "text": "太原市晋源区","abbreviated":"晋源区",
          "value": 4190
        },
        {

          "text": "太原市万柏林区","abbreviated":"万柏林区",
          "value": 4191
        },
        {

          "text": "太原市小店区","abbreviated":"小店区",
          "value": 4192
        },
        {

          "text": "太原市杏花岭区","abbreviated":"杏花岭区",
          "value": 4193
        },
        {

          "text": "太原市迎泽区","abbreviated":"迎泽区",
          "value": 4386
        },
        {

          "text": "太原市","abbreviated":"太原市",
          "value": 2730
        },
        {

          "text": "古交市","abbreviated":"古交市",
          "value": 2731
        },
        {

          "text": "阳曲县","abbreviated":"阳曲县",
          "value": 2732
        },
        {

          "text": "清徐县","abbreviated":"清徐县",
          "value": 2733
        }
      ],
      [
        {

          "text": "大同市城区","abbreviated":"城区",
          "value": 4180
        },
        {

          "text": "大同市矿区","abbreviated":"矿区",
          "value": 4181
        },
        {

          "text": "大同市南郊区","abbreviated":"南郊区",
          "value": 4182
        },
        {

          "text": "大同市新荣区","abbreviated":"新荣区",
          "value": 4183
        },
        {

          "text": "大同市","abbreviated":"大同市",
          "value": 2736
        },
        {

          "text": "大同县","abbreviated":"大同县",
          "value": 2737
        },
        {

          "text": "天镇县","abbreviated":"天镇县",
          "value": 2738
        },
        {

          "text": "灵丘县","abbreviated":"灵丘县",
          "value": 2739
        },
        {

          "text": "阳高县","abbreviated":"阳高县",
          "value": 2740
        },
        {

          "text": "左云县","abbreviated":"左云县",
          "value": 2741
        },
        {

          "text": "广灵县","abbreviated":"广灵县",
          "value": 2742
        },
        {

          "text": "浑源县","abbreviated":"浑源县",
          "value": 2743
        }
      ],
      [
        {

          "text": "阳泉市城区","abbreviated":"城区",
          "value": 4195
        },
        {

          "text": "阳泉市郊区","abbreviated":"郊区",
          "value": 4196
        },
        {

          "text": "阳泉市矿区","abbreviated":"矿区",
          "value": 4197
        },
        {

          "text": "阳泉市","abbreviated":"阳泉市",
          "value": 2745
        },
        {

          "text": "平定县","abbreviated":"平定县",
          "value": 2746
        },
        {

          "text": "盂县","abbreviated":"盂县",
          "value": 2747
        }
      ],
      [
        {

          "text": "长治市城区","abbreviated":"城区",
          "value": 4179
        },
        {

          "text": "长治市郊区","abbreviated":"郊区",
          "value": 4384
        },
        {

          "text": "长治市","abbreviated":"长治市",
          "value": 2749
        },
        {

          "text": "潞城市","abbreviated":"潞城市",
          "value": 2750
        },
        {

          "text": "长治县","abbreviated":"长治县",
          "value": 2751
        },
        {

          "text": "长子县","abbreviated":"长子县",
          "value": 2752
        },
        {

          "text": "平顺县","abbreviated":"平顺县",
          "value": 2753
        },
        {

          "text": "襄垣县","abbreviated":"襄垣县",
          "value": 2754
        },
        {

          "text": "沁源县","abbreviated":"沁源县",
          "value": 2755
        },
        {

          "text": "屯留县","abbreviated":"屯留县",
          "value": 2756
        },
        {

          "text": "黎城县","abbreviated":"黎城县",
          "value": 2757
        },
        {

          "text": "武乡县","abbreviated":"武乡县",
          "value": 2758
        },
        {

          "text": "沁县","abbreviated":"沁县",
          "value": 2759
        },
        {

          "text": "壶关县","abbreviated":"壶关县",
          "value": 2760
        }
      ],
      [
        {

          "text": "晋城市城区","abbreviated":"城区",
          "value": 4184
        },
        {

          "text": "晋城市","abbreviated":"晋城市",
          "value": 2762
        },
        {

          "text": "高平市","abbreviated":"高平市",
          "value": 2763
        },
        {

          "text": "泽州县","abbreviated":"泽州县",
          "value": 2764
        },
        {

          "text": "陵川县","abbreviated":"陵川县",
          "value": 2765
        },
        {

          "text": "阳城县","abbreviated":"阳城县",
          "value": 2766
        },
        {

          "text": "沁水县","abbreviated":"沁水县",
          "value": 2767
        }
      ],
      [
        {

          "text": "朔州市平鲁区","abbreviated":"平鲁区",
          "value": 4187
        },
        {

          "text": "朔州市朔城区","abbreviated":"朔城区",
          "value": 4188
        },
        {

          "text": "朔州市","abbreviated":"朔州市",
          "value": 2769
        },
        {

          "text": "山阴县","abbreviated":"山阴县",
          "value": 2770
        },
        {

          "text": "右玉县","abbreviated":"右玉县",
          "value": 2771
        },
        {

          "text": "应县","abbreviated":"应县",
          "value": 2772
        },
        {

          "text": "怀仁县","abbreviated":"怀仁县",
          "value": 2773
        }
      ],
      [
        {

          "text": "和顺县","abbreviated":"和顺县",
          "value": 2783
        },
        {

          "text": "晋中市榆次区","abbreviated":"榆次区",
          "value": 4185
        },
        {

          "text": "晋中市","abbreviated":"晋中市",
          "value": 2775
        },
        {

          "text": "介休市","abbreviated":"介休市",
          "value": 2776
        },
        {

          "text": "昔阳县","abbreviated":"昔阳县",
          "value": 2777
        },
        {

          "text": "灵石县","abbreviated":"灵石县",
          "value": 2778
        },
        {

          "text": "祁县","abbreviated":"祁县",
          "value": 2779
        },
        {

          "text": "左权县","abbreviated":"左权县",
          "value": 2780
        },
        {

          "text": "寿阳县","abbreviated":"寿阳县",
          "value": 2781
        },
        {

          "text": "太谷县","abbreviated":"太谷县",
          "value": 2782
        },
        {

          "text": "平遥县","abbreviated":"平遥县",
          "value": 2784
        },
        {

          "text": "榆社县","abbreviated":"榆社县",
          "value": 2785
        }
      ],
      [
        {

          "text": "静乐县","abbreviated":"静乐县",
          "value": 2795
        },
        {

          "text": "忻州市忻府区","abbreviated":"忻府区",
          "value": 4194
        },
        {

          "text": "忻州市","abbreviated":"忻州市",
          "value": 2787
        },
        {

          "text": "原平市","abbreviated":"原平市",
          "value": 2788
        },
        {

          "text": "代县","abbreviated":"代县",
          "value": 2789
        },
        {

          "text": "神池县","abbreviated":"神池县",
          "value": 2790
        },
        {

          "text": "五寨县","abbreviated":"五寨县",
          "value": 2791
        },
        {

          "text": "五台县","abbreviated":"五台县",
          "value": 2792
        },
        {

          "text": "偏关县","abbreviated":"偏关县",
          "value": 2793
        },
        {

          "text": "宁武县","abbreviated":"宁武县",
          "value": 2794
        },
        {

          "text": "繁峙县","abbreviated":"繁峙县",
          "value": 2796
        },
        {

          "text": "河曲县","abbreviated":"河曲县",
          "value": 2797
        },
        {

          "text": "保德县","abbreviated":"保德县",
          "value": 2798
        },
        {

          "text": "定襄县","abbreviated":"定襄县",
          "value": 2799
        },
        {

          "text": "岢岚县","abbreviated":"岢岚县",
          "value": 2800
        }
      ],
      [
        {

          "text": "大宁县","abbreviated":"大宁县",
          "value": 2808
        },
        {

          "text": "临汾市尧都区","abbreviated":"尧都区",
          "value": 4186
        },
        {

          "text": "临汾市","abbreviated":"临汾市",
          "value": 2802
        },
        {

          "text": "侯马市","abbreviated":"侯马市",
          "value": 2803
        },
        {

          "text": "霍州市","abbreviated":"霍州市",
          "value": 2804
        },
        {

          "text": "汾西县","abbreviated":"汾西县",
          "value": 2805
        },
        {

          "text": "吉县","abbreviated":"吉县",
          "value": 2806
        },
        {

          "text": "安泽县","abbreviated":"安泽县",
          "value": 2807
        },
        {

          "text": "浮山县","abbreviated":"浮山县",
          "value": 2809
        },
        {

          "text": "古县","abbreviated":"古县",
          "value": 2810
        },
        {

          "text": "隰县","abbreviated":"隰县",
          "value": 2811
        },
        {

          "text": "襄汾县","abbreviated":"襄汾县",
          "value": 2812
        },
        {

          "text": "翼城县","abbreviated":"翼城县",
          "value": 2813
        },
        {

          "text": "永和县","abbreviated":"永和县",
          "value": 2814
        },
        {

          "text": "乡宁县","abbreviated":"乡宁县",
          "value": 2815
        },
        {

          "text": "曲沃县","abbreviated":"曲沃县",
          "value": 2816
        },
        {

          "text": "洪洞县","abbreviated":"洪洞县",
          "value": 2817
        },
        {

          "text": "蒲县","abbreviated":"蒲县",
          "value": 2818
        }
      ],
      [
        {

          "text": "运城市盐湖区","abbreviated":"盐湖区",
          "value": 4198
        },
        {

          "text": "运城市","abbreviated":"运城市",
          "value": 2820
        },
        {

          "text": "河津市","abbreviated":"河津市",
          "value": 2821
        },
        {

          "text": "永济市","abbreviated":"永济市",
          "value": 2822
        },
        {

          "text": "闻喜县","abbreviated":"闻喜县",
          "value": 2823
        },
        {

          "text": "新绛县","abbreviated":"新绛县",
          "value": 2824
        },
        {

          "text": "平陆县","abbreviated":"平陆县",
          "value": 2825
        },
        {

          "text": "垣曲县","abbreviated":"垣曲县",
          "value": 2826
        },
        {

          "text": "绛县","abbreviated":"绛县",
          "value": 2827
        },
        {

          "text": "稷山县","abbreviated":"稷山县",
          "value": 2828
        },
        {

          "text": "芮城县","abbreviated":"芮城县",
          "value": 2829
        },
        {

          "text": "夏县","abbreviated":"夏县",
          "value": 2830
        },
        {

          "text": "万荣县","abbreviated":"万荣县",
          "value": 2831
        },
        {

          "text": "临猗县","abbreviated":"临猗县",
          "value": 2832
        }
      ],
      [
        {

          "text": "吕梁市","abbreviated":"吕梁市",
          "value": 3701
        },
        {

          "text": "吕梁市离石区","abbreviated":"离石区",
          "value": 4385
        },
        {

          "text": "孝义市","abbreviated":"孝义市",
          "value": 2835
        },
        {

          "text": "汾阳市","abbreviated":"汾阳市",
          "value": 2836
        },
        {

          "text": "文水县","abbreviated":"文水县",
          "value": 2837
        },
        {

          "text": "中阳县","abbreviated":"中阳县",
          "value": 2838
        },
        {

          "text": "兴县","abbreviated":"兴县",
          "value": 2839
        },
        {

          "text": "临县","abbreviated":"临县",
          "value": 2840
        },
        {

          "text": "方山县","abbreviated":"方山县",
          "value": 2841
        },
        {

          "text": "柳林县","abbreviated":"柳林县",
          "value": 2842
        },
        {

          "text": "岚县","abbreviated":"岚县",
          "value": 2843
        },
        {

          "text": "交口县","abbreviated":"交口县",
          "value": 2844
        },
        {

          "text": "交城县","abbreviated":"交城县",
          "value": 2845
        },
        {

          "text": "石楼县","abbreviated":"石楼县",
          "value": 2846
        }
      ]
    ],
    [
      [
        {

          "text": "乌兰察布市","abbreviated":"乌兰察布市",
          "value": 2493
        },
        {

          "text": "乌兰察布市集宁区","abbreviated":"集宁区",
          "value": 4124
        },
        {

          "text": "丰镇市","abbreviated":"丰镇市",
          "value": 2494
        },
        {

          "text": "兴和县","abbreviated":"兴和县",
          "value": 2495
        },
        {

          "text": "卓资县","abbreviated":"卓资县",
          "value": 2496
        },
        {

          "text": "商都县","abbreviated":"商都县",
          "value": 2497
        },
        {

          "text": "凉城县","abbreviated":"凉城县",
          "value": 2498
        },
        {

          "text": "化德县","abbreviated":"化德县",
          "value": 2499
        },
        {

          "text": "察哈尔右翼前旗","abbreviated":"察哈尔右翼前旗",
          "value": 2500
        },
        {

          "text": "察哈尔右翼中旗","abbreviated":"察哈尔右翼中旗",
          "value": 2501
        },
        {

          "text": "察哈尔右翼后旗","abbreviated":"察哈尔右翼后旗",
          "value": 2502
        },
        {

          "text": "四子王旗","abbreviated":"四子王旗",
          "value": 2503
        }
      ],
      [
        {

          "text": "锡林浩特市","abbreviated":"锡林浩特市",
          "value": 2505
        },
        {

          "text": "二连浩特市","abbreviated":"二连浩特市",
          "value": 2506
        },
        {

          "text": "多伦县","abbreviated":"多伦县",
          "value": 2507
        },
        {

          "text": "阿巴嘎旗","abbreviated":"阿巴嘎旗",
          "value": 2508
        },
        {

          "text": "西乌珠穆沁旗","abbreviated":"西乌珠穆沁旗",
          "value": 2509
        },
        {

          "text": "东乌珠穆沁旗","abbreviated":"东乌珠穆沁旗",
          "value": 2510
        },
        {

          "text": "苏尼特左旗","abbreviated":"苏尼特左旗",
          "value": 2511
        },
        {

          "text": "苏尼特右旗","abbreviated":"苏尼特右旗",
          "value": 2512
        },
        {

          "text": "太仆寺旗","abbreviated":"太仆寺旗",
          "value": 2513
        },
        {

          "text": "正镶白旗","abbreviated":"正镶白旗",
          "value": 2514
        },
        {

          "text": "正蓝旗","abbreviated":"正蓝旗",
          "value": 2515
        },
        {

          "text": "镶黄旗","abbreviated":"镶黄旗",
          "value": 2516
        }
      ],
      [
        {

          "text": "乌拉特后旗","abbreviated":"乌拉特后旗",
          "value": 2524
        },
        {

          "text": "巴彦淖尔市","abbreviated":"巴彦淖尔市",
          "value": 3785
        },
        {

          "text": "巴彦淖尔市临河区","abbreviated":"临河区",
          "value": 2518
        },
        {

          "text": "五原县","abbreviated":"五原县",
          "value": 2519
        },
        {

          "text": "磴口县","abbreviated":"磴口县",
          "value": 2520
        },
        {

          "text": "杭锦后旗","abbreviated":"杭锦后旗",
          "value": 2521
        },
        {

          "text": "乌拉特中旗","abbreviated":"乌拉特中旗",
          "value": 2522
        },
        {

          "text": "乌拉特前旗","abbreviated":"乌拉特前旗",
          "value": 2523
        }
      ],
      [
        {

          "text": "阿拉善左旗","abbreviated":"阿拉善左旗",
          "value": 2526
        },
        {

          "text": "阿拉善右旗","abbreviated":"阿拉善右旗",
          "value": 2527
        },
        {

          "text": "额济纳旗","abbreviated":"额济纳旗",
          "value": 2528
        }
      ],
      [
        {

          "text": "乌兰浩特市","abbreviated":"乌兰浩特市",
          "value": 2530
        },
        {

          "text": "阿尔山市","abbreviated":"阿尔山市",
          "value": 2531
        },
        {

          "text": "突泉县","abbreviated":"突泉县",
          "value": 2532
        },
        {

          "text": "扎赉特旗","abbreviated":"扎赉特旗",
          "value": 2533
        },
        {

          "text": "科尔沁右翼前旗","abbreviated":"科尔沁右翼前旗",
          "value": 2534
        },
        {

          "text": "科尔沁右翼中旗","abbreviated":"科尔沁右翼中旗",
          "value": 2535
        }
      ],
      [
        {

          "text": "呼和浩特市赛罕区","abbreviated":"赛罕区",
          "value": 4116
        },
        {

          "text": "呼和浩特市新城区","abbreviated":"新城区",
          "value": 4117
        },
        {

          "text": "呼和浩特市玉泉区","abbreviated":"玉泉区",
          "value": 4118
        },
        {

          "text": "呼和浩特市回民区","abbreviated":"回民区",
          "value": 4377
        },
        {

          "text": "呼和浩特市","abbreviated":"呼和浩特市",
          "value": 2436
        },
        {

          "text": "托克托县","abbreviated":"托克托县",
          "value": 2437
        },
        {

          "text": "清水河县","abbreviated":"清水河县",
          "value": 2438
        },
        {

          "text": "武川县","abbreviated":"武川县",
          "value": 2439
        },
        {

          "text": "和林格尔县","abbreviated":"和林格尔县",
          "value": 2440
        },
        {

          "text": "土默特左旗","abbreviated":"土默特左旗",
          "value": 2441
        }
      ],
      [
        {

          "text": "包头市东河区","abbreviated":"东河区",
          "value": 4107
        },
        {

          "text": "包头市九原区","abbreviated":"九原区",
          "value": 4108
        },
        {

          "text": "包头市昆都仑区","abbreviated":"昆都仑区",
          "value": 4109
        },
        {

          "text": "包头市青山区","abbreviated":"青山区",
          "value": 4110
        },
        {

          "text": "包头市石拐区","abbreviated":"石拐区",
          "value": 4111
        },
        {

          "text": "包头市白云矿区","abbreviated":"白云矿区",
          "value": 4376
        },
        {

          "text": "包头市","abbreviated":"包头市",
          "value": 2443
        },
        {

          "text": "固阳县","abbreviated":"固阳县",
          "value": 2444
        },
        {

          "text": "土默特右旗","abbreviated":"土默特右旗",
          "value": 2445
        },
        {

          "text": "达尔罕茂明安联合旗","abbreviated":"达尔罕茂明安联合旗",
          "value": 2446
        }
      ],
      [
        {

          "text": "乌海市海勃湾区","abbreviated":"海勃湾区",
          "value": 4121
        },
        {

          "text": "乌海市海南区","abbreviated":"海南区",
          "value": 4122
        },
        {

          "text": "乌海市乌达区","abbreviated":"乌达区",
          "value": 4123
        },
        {

          "text": "乌海市","abbreviated":"乌海市",
          "value": 2448
        }
      ],
      [
        {

          "text": "巴林右旗","abbreviated":"巴林右旗",
          "value": 2459
        },
        {

          "text": "赤峰市红山区","abbreviated":"红山区",
          "value": 4112
        },
        {

          "text": "赤峰市松山区","abbreviated":"松山区",
          "value": 4113
        },
        {

          "text": "赤峰市元宝山区","abbreviated":"元宝山区",
          "value": 4114
        },
        {

          "text": "赤峰市","abbreviated":"赤峰市",
          "value": 2450
        },
        {

          "text": "宁城县","abbreviated":"宁城县",
          "value": 2451
        },
        {

          "text": "林西县","abbreviated":"林西县",
          "value": 2452
        },
        {

          "text": "喀喇沁旗","abbreviated":"喀喇沁旗",
          "value": 2453
        },
        {

          "text": "巴林左旗","abbreviated":"巴林左旗",
          "value": 2454
        },
        {

          "text": "敖汉旗","abbreviated":"敖汉旗",
          "value": 2455
        },
        {

          "text": "阿鲁科尔沁旗","abbreviated":"阿鲁科尔沁旗",
          "value": 2456
        },
        {

          "text": "翁牛特旗","abbreviated":"翁牛特旗",
          "value": 2457
        },
        {

          "text": "克什克腾旗","abbreviated":"克什克腾旗",
          "value": 2458
        }
      ],
      [
        {

          "text": "通辽市科尔沁区","abbreviated":"科尔沁区",
          "value": 4120
        },
        {

          "text": "通辽市","abbreviated":"通辽市",
          "value": 2461
        },
        {

          "text": "霍林郭勒市","abbreviated":"霍林郭勒市",
          "value": 2462
        },
        {

          "text": "开鲁县","abbreviated":"开鲁县",
          "value": 2463
        },
        {

          "text": "科尔沁左翼中旗","abbreviated":"科尔沁左翼中旗",
          "value": 2464
        },
        {

          "text": "科尔沁左翼后旗","abbreviated":"科尔沁左翼后旗",
          "value": 2465
        },
        {

          "text": "库伦旗","abbreviated":"库伦旗",
          "value": 2466
        },
        {

          "text": "奈曼旗","abbreviated":"奈曼旗",
          "value": 2467
        },
        {

          "text": "扎鲁特旗","abbreviated":"扎鲁特旗",
          "value": 2468
        }
      ],
      [
        {

          "text": "乌审旗","abbreviated":"乌审旗",
          "value": 2472
        },
        {

          "text": "鄂尔多斯市东胜区","abbreviated":"东胜区",
          "value": 4115
        },
        {

          "text": "鄂尔多斯市","abbreviated":"鄂尔多斯市",
          "value": 2470
        },
        {

          "text": "准格尔旗","abbreviated":"准格尔旗",
          "value": 2471
        },
        {

          "text": "伊金霍洛旗","abbreviated":"伊金霍洛旗",
          "value": 2473
        },
        {

          "text": "鄂托克旗","abbreviated":"鄂托克旗",
          "value": 2474
        },
        {

          "text": "鄂托克前旗","abbreviated":"鄂托克前旗",
          "value": 2475
        },
        {

          "text": "杭锦旗","abbreviated":"杭锦旗",
          "value": 2476
        },
        {

          "text": "达拉特旗","abbreviated":"达拉特旗",
          "value": 2477
        }
      ],
      [
        {

          "text": "鄂温克族自治旗","abbreviated":"鄂温克族自治旗",
          "value": 2491
        },
        {

          "text": "呼伦贝尔市海拉尔区","abbreviated":"海拉尔区",
          "value": 4119
        },
        {

          "text": "呼伦贝尔市","abbreviated":"呼伦贝尔市",
          "value": 2479
        },
        {

          "text": "满洲里市","abbreviated":"满洲里市",
          "value": 2480
        },
        {

          "text": "牙克石市","abbreviated":"牙克石市",
          "value": 2481
        },
        {

          "text": "扎兰屯市","abbreviated":"扎兰屯市",
          "value": 2482
        },
        {

          "text": "根河市","abbreviated":"根河市",
          "value": 2483
        },
        {

          "text": "额尔古纳市","abbreviated":"额尔古纳市",
          "value": 2484
        },
        {

          "text": "陈巴尔虎旗","abbreviated":"陈巴尔虎旗",
          "value": 2485
        },
        {

          "text": "阿荣旗","abbreviated":"阿荣旗",
          "value": 2486
        },
        {

          "text": "新巴尔虎左旗","abbreviated":"新巴尔虎左旗",
          "value": 2487
        },
        {

          "text": "新巴尔虎右旗","abbreviated":"新巴尔虎右旗",
          "value": 2488
        },
        {

          "text": "鄂伦春自治旗","abbreviated":"鄂伦春自治旗",
          "value": 2489
        },
        {

          "text": "莫力达瓦达斡尔族自治旗","abbreviated":"莫力达瓦达斡尔族自治旗",
          "value": 2490
        },
        {

          "text": "呼伦贝尔市扎赉诺尔区","abbreviated":"扎赉诺尔区",
          "value": 4997
        }
      ]
    ],
    [
      [
        {

          "text": "本溪市南芬区","abbreviated":"南芬区",
          "value": 4061
        },
        {

          "text": "本溪市平山区","abbreviated":"平山区",
          "value": 4062
        },
        {

          "text": "本溪市溪湖区","abbreviated":"溪湖区",
          "value": 4063
        },
        {

          "text": "本溪市明山区","abbreviated":"明山区",
          "value": 4370
        },
        {

          "text": "本溪市","abbreviated":"本溪市",
          "value": 2385
        },
        {

          "text": "本溪满族自治县","abbreviated":"本溪满族自治县",
          "value": 2386
        },
        {

          "text": "桓仁满族自治县","abbreviated":"桓仁满族自治县",
          "value": 2387
        }
      ],
      [
        {

          "text": "沈阳市大东区","abbreviated":"大东区",
          "value": 4093
        },
        {

          "text": "沈阳市东陵区","abbreviated":"东陵区",
          "value": 4094
        },
        {

          "text": "沈阳市和平区","abbreviated":"和平区",
          "value": 4095
        },
        {

          "text": "沈阳市皇姑区","abbreviated":"皇姑区",
          "value": 4096
        },
        {

          "text": "沈阳市沈北新区","abbreviated":"沈北新区",
          "value": 4097
        },
        {

          "text": "沈阳市沈河区","abbreviated":"沈河区",
          "value": 4098
        },
        {

          "text": "沈阳市苏家屯区","abbreviated":"苏家屯区",
          "value": 4099
        },
        {

          "text": "沈阳市于洪区","abbreviated":"于洪区",
          "value": 4100
        },
        {

          "text": "沈阳市铁西区","abbreviated":"铁西区",
          "value": 4375
        },
        {

          "text": "沈阳市","abbreviated":"沈阳市",
          "value": 2363
        },
        {

          "text": "新民市","abbreviated":"新民市",
          "value": 2364
        },
        {

          "text": "法库县","abbreviated":"法库县",
          "value": 2365
        },
        {

          "text": "辽中县","abbreviated":"辽中县",
          "value": 2366
        },
        {

          "text": "康平县","abbreviated":"康平县",
          "value": 2367
        }
      ],
      [
        {

          "text": "大连市甘井子区","abbreviated":"甘井子区",
          "value": 4066
        },
        {

          "text": "大连市金州区","abbreviated":"金州区",
          "value": 4067
        },
        {

          "text": "大连市沙河口区","abbreviated":"沙河口区",
          "value": 4068
        },
        {

          "text": "大连市西岗区","abbreviated":"西岗区",
          "value": 4069
        },
        {

          "text": "大连市中山区","abbreviated":"中山区",
          "value": 4070
        },
        {

          "text": "大连市旅顺口区","abbreviated":"旅顺口区",
          "value": 4371
        },
        {

          "text": "大连市","abbreviated":"大连市",
          "value": 2369
        },
        {

          "text": "瓦房店市","abbreviated":"瓦房店市",
          "value": 2370
        },
        {

          "text": "普兰店市","abbreviated":"普兰店市",
          "value": 2371
        },
        {

          "text": "庄河市","abbreviated":"庄河市",
          "value": 2372
        },
        {

          "text": "长海县","abbreviated":"长海县",
          "value": 2373
        }
      ],
      [
        {

          "text": "鞍山市立山区","abbreviated":"立山区",
          "value": 4057
        },
        {

          "text": "鞍山市千山区","abbreviated":"千山区",
          "value": 4058
        },
        {

          "text": "鞍山市铁东区","abbreviated":"铁东区",
          "value": 4059
        },
        {

          "text": "鞍山市铁西区","abbreviated":"铁西区",
          "value": 4060
        },
        {

          "text": "鞍山市","abbreviated":"鞍山市",
          "value": 2375
        },
        {

          "text": "海城市","abbreviated":"海城市",
          "value": 2376
        },
        {

          "text": "台安县","abbreviated":"台安县",
          "value": 2377
        },
        {

          "text": "岫岩满族自治县","abbreviated":"岫岩满族自治县",
          "value": 2378
        }
      ],
      [
        {

          "text": "抚顺市东洲区","abbreviated":"东洲区",
          "value": 4074
        },
        {

          "text": "抚顺市顺城区","abbreviated":"顺城区",
          "value": 4075
        },
        {

          "text": "抚顺市新抚区","abbreviated":"新抚区",
          "value": 4076
        },
        {

          "text": "抚顺市望花区","abbreviated":"望花区",
          "value": 4372
        },
        {

          "text": "抚顺市","abbreviated":"抚顺市",
          "value": 2380
        },
        {

          "text": "抚顺县","abbreviated":"抚顺县",
          "value": 2381
        },
        {

          "text": "清原满族自治县","abbreviated":"清原满族自治县",
          "value": 2382
        },
        {

          "text": "新宾满族自治县","abbreviated":"新宾满族自治县",
          "value": 2383
        }
      ],
      [
        {

          "text": "丹东市元宝区","abbreviated":"元宝区",
          "value": 4071
        },
        {

          "text": "丹东市振安区","abbreviated":"振安区",
          "value": 4072
        },
        {

          "text": "丹东市振兴区","abbreviated":"振兴区",
          "value": 4073
        },
        {

          "text": "丹东市","abbreviated":"丹东市",
          "value": 2389
        },
        {

          "text": "东港市","abbreviated":"东港市",
          "value": 2390
        },
        {

          "text": "凤城市","abbreviated":"凤城市",
          "value": 2391
        },
        {

          "text": "宽甸满族自治县","abbreviated":"宽甸满族自治县",
          "value": 2392
        }
      ],
      [
        {

          "text": "北镇市","abbreviated":"北镇市",
          "value": 2396
        },
        {

          "text": "锦州市古塔区","abbreviated":"古塔区",
          "value": 4084
        },
        {

          "text": "锦州市凌河区","abbreviated":"凌河区",
          "value": 4085
        },
        {

          "text": "锦州市太和区","abbreviated":"太和区",
          "value": 4086
        },
        {

          "text": "锦州市","abbreviated":"锦州市",
          "value": 2394
        },
        {

          "text": "凌海市","abbreviated":"凌海市",
          "value": 2395
        },
        {

          "text": "黑山县","abbreviated":"黑山县",
          "value": 2397
        },
        {

          "text": "义县","abbreviated":"义县",
          "value": 2398
        }
      ],
      [
        {

          "text": "葫芦岛市连山区","abbreviated":"连山区",
          "value": 4082
        },
        {

          "text": "葫芦岛市南票区","abbreviated":"南票区",
          "value": 4083
        },
        {

          "text": "葫芦岛市龙港区","abbreviated":"龙港区",
          "value": 4373
        },
        {

          "text": "葫芦岛市","abbreviated":"葫芦岛市",
          "value": 2400
        },
        {

          "text": "兴城市","abbreviated":"兴城市",
          "value": 2401
        },
        {

          "text": "绥中县","abbreviated":"绥中县",
          "value": 2402
        },
        {

          "text": "建昌县","abbreviated":"建昌县",
          "value": 2403
        }
      ],
      [
        {

          "text": "营口市鲅鱼圈区","abbreviated":"鲅鱼圈区",
          "value": 4103
        },
        {

          "text": "营口市老边区","abbreviated":"老边区",
          "value": 4104
        },
        {

          "text": "营口市西市区","abbreviated":"西市区",
          "value": 4105
        },
        {

          "text": "营口市站前区","abbreviated":"站前区",
          "value": 4106
        },
        {

          "text": "营口市","abbreviated":"营口市",
          "value": 2405
        },
        {

          "text": "大石桥市","abbreviated":"大石桥市",
          "value": 2406
        },
        {

          "text": "盖州市","abbreviated":"盖州市",
          "value": 2407
        }
      ],
      [
        {

          "text": "盘锦市","abbreviated":"盘锦市",
          "value": 2409
        },
        {

          "text": "盘锦市兴隆台区","abbreviated":"兴隆台区",
          "value": 4092
        },
        {

          "text": "盘锦市双台子区","abbreviated":"双台子区",
          "value": 4374
        },
        {

          "text": "盘山县","abbreviated":"盘山县",
          "value": 2410
        },
        {

          "text": "大洼县","abbreviated":"大洼县",
          "value": 2411
        }
      ],
      [
        {

          "text": "阜新市海州区","abbreviated":"海州区",
          "value": 4077
        },
        {

          "text": "阜新市清河门区","abbreviated":"清河门区",
          "value": 4078
        },
        {

          "text": "阜新市太平区","abbreviated":"太平区",
          "value": 4079
        },
        {

          "text": "阜新市细河区","abbreviated":"细河区",
          "value": 4080
        },
        {

          "text": "阜新市新邱区","abbreviated":"新邱区",
          "value": 4081
        },
        {

          "text": "阜新市","abbreviated":"阜新市",
          "value": 2413
        },
        {

          "text": "彰武县","abbreviated":"彰武县",
          "value": 2414
        },
        {

          "text": "阜新蒙古族自治县","abbreviated":"阜新蒙古族自治县",
          "value": 2415
        }
      ],
      [
        {

          "text": "辽阳市白塔区","abbreviated":"白塔区",
          "value": 4087
        },
        {

          "text": "辽阳市弓长岭区","abbreviated":"弓长岭区",
          "value": 4088
        },
        {

          "text": "辽阳市宏伟区","abbreviated":"宏伟区",
          "value": 4089
        },
        {

          "text": "辽阳市太子河区","abbreviated":"太子河区",
          "value": 4090
        },
        {

          "text": "辽阳市文圣区","abbreviated":"文圣区",
          "value": 4091
        },
        {

          "text": "辽阳市","abbreviated":"辽阳市",
          "value": 2417
        },
        {

          "text": "灯塔市","abbreviated":"灯塔市",
          "value": 2418
        },
        {

          "text": "辽阳县","abbreviated":"辽阳县",
          "value": 2419
        }
      ],
      [
        {

          "text": "铁岭市清河区","abbreviated":"清河区",
          "value": 4101
        },
        {

          "text": "铁岭市银州区","abbreviated":"银州区",
          "value": 4102
        },
        {

          "text": "铁岭市","abbreviated":"铁岭市",
          "value": 2421
        },
        {

          "text": "调兵山市","abbreviated":"调兵山市",
          "value": 2422
        },
        {

          "text": "开原市","abbreviated":"开原市",
          "value": 2423
        },
        {

          "text": "铁岭县","abbreviated":"铁岭县",
          "value": 2424
        },
        {

          "text": "昌图县","abbreviated":"昌图县",
          "value": 2425
        },
        {

          "text": "西丰县","abbreviated":"西丰县",
          "value": 2426
        }
      ],
      [
        {

          "text": "朝阳市龙城区","abbreviated":"龙城区",
          "value": 4064
        },
        {

          "text": "朝阳市双塔区","abbreviated":"双塔区",
          "value": 4065
        },
        {

          "text": "朝阳市","abbreviated":"朝阳市",
          "value": 2428
        },
        {

          "text": "凌源市","abbreviated":"凌源市",
          "value": 2429
        },
        {

          "text": "北票市","abbreviated":"北票市",
          "value": 2430
        },
        {

          "text": "朝阳县","abbreviated":"朝阳县",
          "value": 2431
        },
        {

          "text": "建平县","abbreviated":"建平县",
          "value": 2432
        },
        {

          "text": "喀喇沁左翼蒙古族自治县","abbreviated":"喀喇沁左翼蒙古族自治县",
          "value": 2433
        }
      ]
    ],
    [
      [
        {

          "text": "德惠市","abbreviated":"德惠市",
          "value": 2123
        },
        {

          "text": "长春市南关区","abbreviated":"南关区",
          "value": 4430
        },
        {

          "text": "长春市朝阳区","abbreviated":"朝阳区",
          "value": 4821
        },
        {

          "text": "长春市二道区","abbreviated":"二道区",
          "value": 4822
        },
        {

          "text": "长春市宽城区","abbreviated":"宽城区",
          "value": 4823
        },
        {

          "text": "长春市绿园区","abbreviated":"绿园区",
          "value": 4824
        },
        {

          "text": "长春市双阳区","abbreviated":"双阳区",
          "value": 4825
        },
        {

          "text": "长春市","abbreviated":"长春市",
          "value": 2120
        },
        {

          "text": "九台市","abbreviated":"九台市",
          "value": 2121
        },
        {

          "text": "榆树市","abbreviated":"榆树市",
          "value": 2122
        },
        {

          "text": "农安县","abbreviated":"农安县",
          "value": 2124
        }
      ],
      [
        {

          "text": "吉林市昌邑区","abbreviated":"昌邑区",
          "value": 4826
        },
        {

          "text": "吉林市船营区","abbreviated":"船营区",
          "value": 4827
        },
        {

          "text": "吉林市丰满区","abbreviated":"丰满区",
          "value": 4828
        },
        {

          "text": "吉林市龙潭区","abbreviated":"龙潭区",
          "value": 4829
        },
        {

          "text": "吉林市","abbreviated":"吉林市",
          "value": 2126
        },
        {

          "text": "舒兰市","abbreviated":"舒兰市",
          "value": 2127
        },
        {

          "text": "桦甸市","abbreviated":"桦甸市",
          "value": 2128
        },
        {

          "text": "蛟河市","abbreviated":"蛟河市",
          "value": 2129
        },
        {

          "text": "磐石市","abbreviated":"磐石市",
          "value": 2130
        },
        {

          "text": "永吉县","abbreviated":"永吉县",
          "value": 2131
        }
      ],
      [
        {

          "text": "双辽市","abbreviated":"双辽市",
          "value": 2135
        },
        {

          "text": "四平市铁西区","abbreviated":"铁西区",
          "value": 4431
        },
        {

          "text": "四平市铁东区","abbreviated":"铁东区",
          "value": 4832
        },
        {

          "text": "四平市","abbreviated":"四平市",
          "value": 2133
        },
        {

          "text": "公主岭市","abbreviated":"公主岭市",
          "value": 2134
        },
        {

          "text": "梨树县","abbreviated":"梨树县",
          "value": 2136
        },
        {

          "text": "伊通满族自治县","abbreviated":"伊通满族自治县",
          "value": 2137
        }
      ],
      [
        {

          "text": "辽源市龙山区","abbreviated":"龙山区",
          "value": 4830
        },
        {

          "text": "辽源市西安区","abbreviated":"西安区",
          "value": 4831
        },
        {

          "text": "辽源市","abbreviated":"辽源市",
          "value": 2139
        },
        {

          "text": "东辽县","abbreviated":"东辽县",
          "value": 2140
        },
        {

          "text": "东丰县","abbreviated":"东丰县",
          "value": 2141
        }
      ],
      [
        {

          "text": "通化市东昌区","abbreviated":"东昌区",
          "value": 4834
        },
        {

          "text": "通化市二道江区","abbreviated":"二道江区",
          "value": 4835
        },
        {

          "text": "通化市","abbreviated":"通化市",
          "value": 2143
        },
        {

          "text": "梅河口市","abbreviated":"梅河口市",
          "value": 2144
        },
        {

          "text": "集安市","abbreviated":"集安市",
          "value": 2145
        },
        {

          "text": "通化县","abbreviated":"通化县",
          "value": 2146
        },
        {

          "text": "辉南县","abbreviated":"辉南县",
          "value": 2147
        },
        {

          "text": "柳河县","abbreviated":"柳河县",
          "value": 2148
        }
      ],
      [
        {

          "text": "白山市八道江区","abbreviated":"八道江区",
          "value": 4820
        },
        {

          "text": "白山市","abbreviated":"白山市",
          "value": 2150
        },
        {

          "text": "临江市","abbreviated":"临江市",
          "value": 2151
        },
        {

          "text": "靖宇县","abbreviated":"靖宇县",
          "value": 2152
        },
        {

          "text": "抚松县","abbreviated":"抚松县",
          "value": 2153
        },
        {

          "text": "白山市江源区","abbreviated":"江源区",
          "value": 2154
        },
        {

          "text": "长白朝鲜族自治县","abbreviated":"长白朝鲜族自治县",
          "value": 2155
        }
      ],
      [
        {

          "text": "松原市宁江区","abbreviated":"宁江区",
          "value": 4833
        },
        {

          "text": "松原市","abbreviated":"松原市",
          "value": 2157
        },
        {

          "text": "乾安县","abbreviated":"乾安县",
          "value": 2158
        },
        {

          "text": "长岭县","abbreviated":"长岭县",
          "value": 2159
        },
        {

          "text": "扶余县","abbreviated":"扶余县",
          "value": 2160
        },
        {

          "text": "前郭尔罗斯蒙古族自治县","abbreviated":"前郭尔罗斯蒙古族自治县",
          "value": 2161
        }
      ],
      [
        {

          "text": "白城市洮北区","abbreviated":"洮北区",
          "value": 4819
        },
        {

          "text": "白城市","abbreviated":"白城市",
          "value": 2163
        },
        {

          "text": "大安市","abbreviated":"大安市",
          "value": 2164
        },
        {

          "text": "洮南市","abbreviated":"洮南市",
          "value": 2165
        },
        {

          "text": "镇赉县","abbreviated":"镇赉县",
          "value": 2166
        },
        {

          "text": "通榆县","abbreviated":"通榆县",
          "value": 2167
        }
      ],
      [
        {

          "text": "延吉市","abbreviated":"延吉市",
          "value": 2169
        },
        {

          "text": "图们市","abbreviated":"图们市",
          "value": 2170
        },
        {

          "text": "敦化市","abbreviated":"敦化市",
          "value": 2171
        },
        {

          "text": "龙井市","abbreviated":"龙井市",
          "value": 2172
        },
        {

          "text": "珲春市","abbreviated":"珲春市",
          "value": 2173
        },
        {

          "text": "和龙市","abbreviated":"和龙市",
          "value": 2174
        },
        {

          "text": "安图县","abbreviated":"安图县",
          "value": 2175
        },
        {

          "text": "汪清县","abbreviated":"汪清县",
          "value": 2176
        }
      ]
    ],
    [
      [
        {

          "text": "哈尔滨市南岗区","abbreviated":"南岗区",
          "value": 4415
        },
        {

          "text": "哈尔滨市道里区","abbreviated":"道里区",
          "value": 4704
        },
        {

          "text": "哈尔滨市道外区","abbreviated":"道外区",
          "value": 4705
        },
        {

          "text": "哈尔滨市平房区","abbreviated":"平房区",
          "value": 4706
        },
        {

          "text": "哈尔滨市松北区","abbreviated":"松北区",
          "value": 4707
        },
        {

          "text": "哈尔滨市香坊区","abbreviated":"香坊区",
          "value": 4708
        },
        {

          "text": "哈尔滨市","abbreviated":"哈尔滨市",
          "value": 1818
        },
        {

          "text": "哈尔滨市阿城区","abbreviated":"阿城区",
          "value": 1819
        },
        {

          "text": "尚志市","abbreviated":"尚志市",
          "value": 1820
        },
        {

          "text": "双城市","abbreviated":"双城市",
          "value": 1821
        },
        {

          "text": "五常市","abbreviated":"五常市",
          "value": 1822
        },
        {

          "text": "哈尔滨市呼兰区","abbreviated":"呼兰区",
          "value": 1823
        },
        {

          "text": "方正县","abbreviated":"方正县",
          "value": 1824
        },
        {

          "text": "宾县","abbreviated":"宾县",
          "value": 1825
        },
        {

          "text": "依兰县","abbreviated":"依兰县",
          "value": 1826
        },
        {

          "text": "巴彦县","abbreviated":"巴彦县",
          "value": 1827
        },
        {

          "text": "通河县","abbreviated":"通河县",
          "value": 1828
        },
        {

          "text": "木兰县","abbreviated":"木兰县",
          "value": 1829
        },
        {

          "text": "延寿县","abbreviated":"延寿县",
          "value": 1830
        }
      ],
      [
        {

          "text": "齐齐哈尔市富拉尔基区","abbreviated":"富拉尔基区",
          "value": 4418
        },
        {

          "text": "齐齐哈尔市昂昂溪区","abbreviated":"昂昂溪区",
          "value": 4731
        },
        {

          "text": "齐齐哈尔市建华区","abbreviated":"建华区",
          "value": 4732
        },
        {

          "text": "齐齐哈尔市龙沙区","abbreviated":"龙沙区",
          "value": 4733
        },
        {

          "text": "齐齐哈尔市梅里斯达斡尔族区","abbreviated":"梅里斯达斡尔族区",
          "value": 4734
        },
        {

          "text": "齐齐哈尔市碾子山区","abbreviated":"碾子山区",
          "value": 4735
        },
        {

          "text": "齐齐哈尔市铁锋区","abbreviated":"铁锋区",
          "value": 4736
        },
        {

          "text": "齐齐哈尔市","abbreviated":"齐齐哈尔市",
          "value": 1832
        },
        {

          "text": "讷河市","abbreviated":"讷河市",
          "value": 1833
        },
        {

          "text": "富裕县","abbreviated":"富裕县",
          "value": 1834
        },
        {

          "text": "拜泉县","abbreviated":"拜泉县",
          "value": 1835
        },
        {

          "text": "甘南县","abbreviated":"甘南县",
          "value": 1836
        },
        {

          "text": "依安县","abbreviated":"依安县",
          "value": 1837
        },
        {

          "text": "克山县","abbreviated":"克山县",
          "value": 1838
        },
        {

          "text": "泰来县","abbreviated":"泰来县",
          "value": 1839
        },
        {

          "text": "克东县","abbreviated":"克东县",
          "value": 1840
        },
        {

          "text": "龙江县","abbreviated":"龙江县",
          "value": 1841
        }
      ],
      [
        {

          "text": "鹤岗市东山区","abbreviated":"东山区",
          "value": 4709
        },
        {

          "text": "鹤岗市工农区","abbreviated":"工农区",
          "value": 4710
        },
        {

          "text": "鹤岗市南山区","abbreviated":"南山区",
          "value": 4711
        },
        {

          "text": "鹤岗市向阳区","abbreviated":"向阳区",
          "value": 4712
        },
        {

          "text": "鹤岗市兴安区","abbreviated":"兴安区",
          "value": 4713
        },
        {

          "text": "鹤岗市兴山区","abbreviated":"兴山区",
          "value": 4714
        },
        {

          "text": "鹤岗市","abbreviated":"鹤岗市",
          "value": 1843
        },
        {

          "text": "萝北县","abbreviated":"萝北县",
          "value": 1844
        },
        {

          "text": "绥滨县","abbreviated":"绥滨县",
          "value": 1845
        }
      ],
      [
        {

          "text": "宝清县","abbreviated":"宝清县",
          "value": 1849
        },
        {

          "text": "双鸭山市宝山区","abbreviated":"宝山区",
          "value": 4737
        },
        {

          "text": "双鸭山市尖山区","abbreviated":"尖山区",
          "value": 4738
        },
        {

          "text": "双鸭山市岭东区","abbreviated":"岭东区",
          "value": 4739
        },
        {

          "text": "双鸭山市四方台区","abbreviated":"四方台区",
          "value": 4740
        },
        {

          "text": "双鸭山市","abbreviated":"双鸭山市",
          "value": 1847
        },
        {

          "text": "集贤县","abbreviated":"集贤县",
          "value": 1848
        },
        {

          "text": "友谊县","abbreviated":"友谊县",
          "value": 1850
        },
        {

          "text": "饶河县","abbreviated":"饶河县",
          "value": 1851
        }
      ],
      [
        {

          "text": "鸡西市城子河区","abbreviated":"城子河区",
          "value": 4715
        },
        {

          "text": "鸡西市滴道区","abbreviated":"滴道区",
          "value": 4716
        },
        {

          "text": "鸡西市恒山区","abbreviated":"恒山区",
          "value": 4717
        },
        {

          "text": "鸡西市鸡冠区","abbreviated":"鸡冠区",
          "value": 4718
        },
        {

          "text": "鸡西市梨树区","abbreviated":"梨树区",
          "value": 4719
        },
        {

          "text": "鸡西市麻山区","abbreviated":"麻山区",
          "value": 4720
        },
        {

          "text": "鸡西市","abbreviated":"鸡西市",
          "value": 1853
        },
        {

          "text": "密山市","abbreviated":"密山市",
          "value": 1854
        },
        {

          "text": "虎林市","abbreviated":"虎林市",
          "value": 1855
        },
        {

          "text": "鸡东县","abbreviated":"鸡东县",
          "value": 1856
        }
      ],
      [
        {

          "text": "肇源县","abbreviated":"肇源县",
          "value": 1861
        },
        {

          "text": "大庆市大同区","abbreviated":"大同区",
          "value": 4696
        },
        {

          "text": "大庆市红岗区","abbreviated":"红岗区",
          "value": 4697
        },
        {

          "text": "大庆市龙凤区","abbreviated":"龙凤区",
          "value": 4698
        },
        {

          "text": "大庆市让胡路区","abbreviated":"让胡路区",
          "value": 4699
        },
        {

          "text": "大庆市萨尔图区","abbreviated":"萨尔图区",
          "value": 4700
        },
        {

          "text": "大庆市","abbreviated":"大庆市",
          "value": 1858
        },
        {

          "text": "林甸县","abbreviated":"林甸县",
          "value": 1859
        },
        {

          "text": "肇州县","abbreviated":"肇州县",
          "value": 1860
        },
        {

          "text": "杜尔伯特蒙古族自治县","abbreviated":"杜尔伯特蒙古族自治县",
          "value": 1862
        }
      ],
      [
        {

          "text": "伊春市红星区","abbreviated":"红星区",
          "value": 4419
        },
        {

          "text": "伊春市西林区","abbreviated":"西林区",
          "value": 4420
        },
        {

          "text": "伊春市翠峦区","abbreviated":"翠峦区",
          "value": 4742
        },
        {

          "text": "伊春市带岭区","abbreviated":"带岭区",
          "value": 4743
        },
        {

          "text": "伊春市金山屯区","abbreviated":"金山屯区",
          "value": 4744
        },
        {

          "text": "伊春市美溪区","abbreviated":"美溪区",
          "value": 4745
        },
        {

          "text": "伊春市南岔区","abbreviated":"南岔区",
          "value": 4746
        },
        {

          "text": "伊春市上甘岭区","abbreviated":"上甘岭区",
          "value": 4747
        },
        {

          "text": "伊春市汤旺河区","abbreviated":"汤旺河区",
          "value": 4748
        },
        {

          "text": "伊春市乌马河区","abbreviated":"乌马河区",
          "value": 4749
        },
        {

          "text": "伊春市乌伊岭区","abbreviated":"乌伊岭区",
          "value": 4750
        },
        {

          "text": "伊春市五营区","abbreviated":"五营区",
          "value": 4751
        },
        {

          "text": "伊春市新青区","abbreviated":"新青区",
          "value": 4752
        },
        {

          "text": "伊春市伊春区","abbreviated":"伊春区",
          "value": 4753
        },
        {

          "text": "伊春市友好区","abbreviated":"友好区",
          "value": 4754
        },
        {

          "text": "伊春市","abbreviated":"伊春市",
          "value": 1864
        },
        {

          "text": "铁力市","abbreviated":"铁力市",
          "value": 1865
        },
        {

          "text": "嘉荫县","abbreviated":"嘉荫县",
          "value": 1866
        }
      ],
      [
        {

          "text": "东宁县","abbreviated":"东宁县",
          "value": 1874
        },
        {

          "text": "牡丹江市爱民区","abbreviated":"爱民区",
          "value": 4724
        },
        {

          "text": "牡丹江市东安区","abbreviated":"东安区",
          "value": 4725
        },
        {

          "text": "牡丹江市西安区","abbreviated":"西安区",
          "value": 4726
        },
        {

          "text": "牡丹江市阳明区","abbreviated":"阳明区",
          "value": 4727
        },
        {

          "text": "牡丹江市","abbreviated":"牡丹江市",
          "value": 1868
        },
        {

          "text": "绥芬河市","abbreviated":"绥芬河市",
          "value": 1869
        },
        {

          "text": "宁安市","abbreviated":"宁安市",
          "value": 1870
        },
        {

          "text": "海林市","abbreviated":"海林市",
          "value": 1871
        },
        {

          "text": "穆棱市","abbreviated":"穆棱市",
          "value": 1872
        },
        {

          "text": "林口县","abbreviated":"林口县",
          "value": 1873
        }
      ],
      [
        {

          "text": "佳木斯市前进区","abbreviated":"前进区",
          "value": 4417
        },
        {

          "text": "佳木斯市东风区","abbreviated":"东风区",
          "value": 4721
        },
        {

          "text": "佳木斯市郊区","abbreviated":"郊区",
          "value": 4722
        },
        {

          "text": "佳木斯市向阳区","abbreviated":"向阳区",
          "value": 4723
        },
        {

          "text": "佳木斯市","abbreviated":"佳木斯市",
          "value": 1876
        },
        {

          "text": "同江市","abbreviated":"同江市",
          "value": 1877
        },
        {

          "text": "富锦市","abbreviated":"富锦市",
          "value": 1878
        },
        {

          "text": "桦川县","abbreviated":"桦川县",
          "value": 1879
        },
        {

          "text": "抚远县","abbreviated":"抚远县",
          "value": 1880
        },
        {

          "text": "桦南县","abbreviated":"桦南县",
          "value": 1881
        },
        {

          "text": "汤原县","abbreviated":"汤原县",
          "value": 1882
        }
      ],
      [
        {

          "text": "七台河市茄子河区","abbreviated":"茄子河区",
          "value": 4728
        },
        {

          "text": "七台河市桃山区","abbreviated":"桃山区",
          "value": 4729
        },
        {

          "text": "七台河市新兴区","abbreviated":"新兴区",
          "value": 4730
        },
        {

          "text": "七台河市","abbreviated":"七台河市",
          "value": 1884
        },
        {

          "text": "勃利县","abbreviated":"勃利县",
          "value": 1885
        }
      ],
      [
        {

          "text": "黑河市爱辉区","abbreviated":"爱辉区",
          "value": 4416
        },
        {

          "text": "黑河市","abbreviated":"黑河市",
          "value": 1887
        },
        {

          "text": "北安市","abbreviated":"北安市",
          "value": 1888
        },
        {

          "text": "五大连池市","abbreviated":"五大连池市",
          "value": 1889
        },
        {

          "text": "逊克县","abbreviated":"逊克县",
          "value": 1890
        },
        {

          "text": "嫩江县","abbreviated":"嫩江县",
          "value": 1891
        },
        {

          "text": "孙吴县","abbreviated":"孙吴县",
          "value": 1892
        }
      ],
      [
        {

          "text": "绥化市北林区","abbreviated":"北林区",
          "value": 4741
        },
        {

          "text": "绥化市","abbreviated":"绥化市",
          "value": 1894
        },
        {

          "text": "安达市","abbreviated":"安达市",
          "value": 1895
        },
        {

          "text": "肇东市","abbreviated":"肇东市",
          "value": 1896
        },
        {

          "text": "海伦市","abbreviated":"海伦市",
          "value": 1897
        },
        {

          "text": "绥棱县","abbreviated":"绥棱县",
          "value": 1898
        },
        {

          "text": "兰西县","abbreviated":"兰西县",
          "value": 1899
        },
        {

          "text": "明水县","abbreviated":"明水县",
          "value": 1900
        },
        {

          "text": "青冈县","abbreviated":"青冈县",
          "value": 1901
        },
        {

          "text": "庆安县","abbreviated":"庆安县",
          "value": 1902
        },
        {

          "text": "望奎县","abbreviated":"望奎县",
          "value": 1903
        }
      ],
      [
        {

          "text": "大兴安岭地区加格达奇区","abbreviated":"大兴安岭地区加格达奇区",
          "value": 3703
        },
        {

          "text": "大兴安岭市","abbreviated":"大兴安岭市",
          "value": 3704
        },
        {

          "text": "大兴安岭地区呼中区","abbreviated":"大兴安岭地区呼中区",
          "value": 4701
        },
        {

          "text": "大兴安岭地区松岭区","abbreviated":"大兴安岭地区松岭区",
          "value": 4702
        },
        {

          "text": "大兴安岭地区新林区","abbreviated":"大兴安岭地区新林区",
          "value": 4703
        },
        {

          "text": "呼玛县","abbreviated":"呼玛县",
          "value": 1905
        },
        {

          "text": "塔河县","abbreviated":"塔河县",
          "value": 1906
        },
        {

          "text": "漠河县","abbreviated":"漠河县",
          "value": 1907
        }
      ]
    ],
    [
      [
        {

          "text": "上海市宝山区","abbreviated":"宝山区",
          "value": 4221
        },
        {

          "text": "上海市长宁区","abbreviated":"长宁区",
          "value": 4222
        },
        {

          "text": "上海市奉贤区","abbreviated":"奉贤区",
          "value": 4223
        },
        {

          "text": "上海市虹口区","abbreviated":"虹口区",
          "value": 4224
        },
        {

          "text": "上海市黄浦区","abbreviated":"黄浦区",
          "value": 4225
        },
        {

          "text": "上海市嘉定区","abbreviated":"嘉定区",
          "value": 4226
        },
        {

          "text": "上海市金山区","abbreviated":"金山区",
          "value": 4227
        },
        {

          "text": "上海市静安区","abbreviated":"静安区",
          "value": 4228
        },
        {

          "text": "上海市卢湾区","abbreviated":"卢湾区",
          "value": 4229
        },
        {

          "text": "上海市闵行区","abbreviated":"闵行区",
          "value": 4230
        },
        {

          "text": "上海市浦东新区","abbreviated":"浦东新区",
          "value": 4232
        },
        {

          "text": "上海市普陀区","abbreviated":"普陀区",
          "value": 4233
        },
        {

          "text": "上海市青浦区","abbreviated":"青浦区",
          "value": 4234
        },
        {

          "text": "上海市松江区","abbreviated":"松江区",
          "value": 4235
        },
        {

          "text": "上海市徐汇区","abbreviated":"徐汇区",
          "value": 4236
        },
        {

          "text": "上海市杨浦区","abbreviated":"杨浦区",
          "value": 4237
        },
        {

          "text": "上海市闸北区","abbreviated":"闸北区",
          "value": 4238
        },
        {

          "text": "上海市","abbreviated":"上海市",
          "value": 2612
        },
        {

          "text": "崇明县","abbreviated":"崇明县",
          "value": 2613
        }
      ]
    ],
    [
      [
        {

          "text": "南京市白下区","abbreviated":"白下区",
          "value": 4002
        },
        {

          "text": "南京市鼓楼区","abbreviated":"鼓楼区",
          "value": 4003
        },
        {

          "text": "南京市建邺区","abbreviated":"建邺区",
          "value": 4004
        },
        {

          "text": "南京市江宁区","abbreviated":"江宁区",
          "value": 4005
        },
        {

          "text": "南京市六合区","abbreviated":"六合区",
          "value": 4006
        },
        {

          "text": "南京市浦口区","abbreviated":"浦口区",
          "value": 4007
        },
        {

          "text": "南京市栖霞区","abbreviated":"栖霞区",
          "value": 4008
        },
        {

          "text": "南京市秦淮区","abbreviated":"秦淮区",
          "value": 4009
        },
        {

          "text": "南京市下关区","abbreviated":"下关区",
          "value": 4010
        },
        {

          "text": "南京市玄武区","abbreviated":"玄武区",
          "value": 4011
        },
        {

          "text": "南京市雨花台区","abbreviated":"雨花台区",
          "value": 4012
        },
        {

          "text": "南京市","abbreviated":"南京市",
          "value": 2179
        },
        {

          "text": "溧水县","abbreviated":"溧水县",
          "value": 2180
        },
        {

          "text": "高淳县","abbreviated":"高淳县",
          "value": 2181
        }
      ],
      [
        {

          "text": "新沂市","abbreviated":"新沂市",
          "value": 2185
        },
        {

          "text": "徐州市鼓楼区","abbreviated":"鼓楼区",
          "value": 4030
        },
        {

          "text": "徐州市贾汪区","abbreviated":"贾汪区",
          "value": 4031
        },
        {

          "text": "徐州市泉山区","abbreviated":"泉山区",
          "value": 4032
        },
        {

          "text": "徐州市云龙区","abbreviated":"云龙区",
          "value": 4033
        },
        {

          "text": "徐州市九里区","abbreviated":"九里区",
          "value": 4366
        },
        {

          "text": "徐州市","abbreviated":"徐州市",
          "value": 2183
        },
        {

          "text": "邳州市","abbreviated":"邳州市",
          "value": 2184
        },
        {

          "text": "铜山县","abbreviated":"铜山县",
          "value": 2186
        },
        {

          "text": "睢宁县","abbreviated":"睢宁县",
          "value": 2187
        },
        {

          "text": "沛县","abbreviated":"沛县",
          "value": 2188
        },
        {

          "text": "丰县","abbreviated":"丰县",
          "value": 2189
        }
      ],
      [
        {

          "text": "连云港市连云区","abbreviated":"连云区",
          "value": 4000
        },
        {

          "text": "连云港市新浦区","abbreviated":"新浦区",
          "value": 4001
        },
        {

          "text": "连云港市海州区","abbreviated":"海州区",
          "value": 4844
        },
        {

          "text": "连云港市","abbreviated":"连云港市",
          "value": 2191
        },
        {

          "text": "东海县","abbreviated":"东海县",
          "value": 2192
        },
        {

          "text": "灌云县","abbreviated":"灌云县",
          "value": 2193
        },
        {

          "text": "赣榆县","abbreviated":"赣榆县",
          "value": 2194
        },
        {

          "text": "灌南县","abbreviated":"灌南县",
          "value": 2195
        }
      ],
      [
        {

          "text": "涟水县","abbreviated":"涟水县",
          "value": 2198
        },
        {

          "text": "淮安市楚州区","abbreviated":"楚州区",
          "value": 4840
        },
        {

          "text": "淮安市淮阴区","abbreviated":"淮阴区",
          "value": 4841
        },
        {

          "text": "淮安市清河区","abbreviated":"清河区",
          "value": 4842
        },
        {

          "text": "淮安市清浦区","abbreviated":"清浦区",
          "value": 4843
        },
        {

          "text": "淮安市","abbreviated":"淮安市",
          "value": 2197
        },
        {

          "text": "洪泽县","abbreviated":"洪泽县",
          "value": 2199
        },
        {

          "text": "金湖县","abbreviated":"金湖县",
          "value": 2200
        },
        {

          "text": "盱眙县","abbreviated":"盱眙县",
          "value": 2201
        }
      ],
      [
        {

          "text": "宿迁市宿城区","abbreviated":"宿城区",
          "value": 4021
        },
        {

          "text": "宿迁市","abbreviated":"宿迁市",
          "value": 2203
        },
        {

          "text": "宿迁市宿豫区","abbreviated":"宿豫区",
          "value": 2204
        },
        {

          "text": "沭阳县","abbreviated":"沭阳县",
          "value": 2205
        },
        {

          "text": "泗阳县","abbreviated":"泗阳县",
          "value": 2206
        },
        {

          "text": "泗洪县","abbreviated":"泗洪县",
          "value": 2207
        }
      ],
      [
        {

          "text": "东台市","abbreviated":"东台市",
          "value": 2210
        },
        {

          "text": "盐城市亭湖区","abbreviated":"亭湖区",
          "value": 4034
        },
        {

          "text": "盐城市","abbreviated":"盐城市",
          "value": 2209
        },
        {

          "text": "大丰市","abbreviated":"大丰市",
          "value": 2211
        },
        {

          "text": "盐城市盐都区","abbreviated":"盐都区",
          "value": 2212
        },
        {

          "text": "建湖县","abbreviated":"建湖县",
          "value": 2213
        },
        {

          "text": "响水县","abbreviated":"响水县",
          "value": 2214
        },
        {

          "text": "阜宁县","abbreviated":"阜宁县",
          "value": 2215
        },
        {

          "text": "射阳县","abbreviated":"射阳县",
          "value": 2216
        },
        {

          "text": "滨海县","abbreviated":"滨海县",
          "value": 2217
        }
      ],
      [
        {

          "text": "扬州市广陵区","abbreviated":"广陵区",
          "value": 4035
        },
        {

          "text": "扬州市邗江区","abbreviated":"邗江区",
          "value": 4036
        },
        {

          "text": "扬州市维扬区","abbreviated":"维扬区",
          "value": 4037
        },
        {

          "text": "扬州市","abbreviated":"扬州市",
          "value": 2219
        },
        {

          "text": "高邮市","abbreviated":"高邮市",
          "value": 2220
        },
        {

          "text": "扬州市江都区","abbreviated":"江都区",
          "value": 2221
        },
        {

          "text": "仪征市","abbreviated":"仪征市",
          "value": 2222
        },
        {

          "text": "宝应县","abbreviated":"宝应县",
          "value": 2223
        }
      ],
      [
        {

          "text": "泰州市高港区","abbreviated":"高港区",
          "value": 4022
        },
        {

          "text": "泰州市海陵区","abbreviated":"海陵区",
          "value": 4023
        },
        {

          "text": "泰州市","abbreviated":"泰州市",
          "value": 2225
        },
        {

          "text": "泰兴市","abbreviated":"泰兴市",
          "value": 2226
        },
        {

          "text": "泰州市姜堰区","abbreviated":"姜堰区",
          "value": 2227
        },
        {

          "text": "靖江市","abbreviated":"靖江市",
          "value": 2228
        },
        {

          "text": "兴化市","abbreviated":"兴化市",
          "value": 2229
        }
      ],
      [
        {

          "text": "南通市崇川区","abbreviated":"崇川区",
          "value": 4013
        },
        {

          "text": "南通市港闸区","abbreviated":"港闸区",
          "value": 4014
        },
        {

          "text": "南通市","abbreviated":"南通市",
          "value": 2231
        },
        {

          "text": "如皋市","abbreviated":"如皋市",
          "value": 2232
        },
        {

          "text": "南通市通州区","abbreviated":"通州区",
          "value": 2233
        },
        {

          "text": "海门市","abbreviated":"海门市",
          "value": 2234
        },
        {

          "text": "启东市","abbreviated":"启东市",
          "value": 2235
        },
        {

          "text": "海安县","abbreviated":"海安县",
          "value": 2236
        },
        {

          "text": "如东县","abbreviated":"如东县",
          "value": 2237
        }
      ],
      [
        {

          "text": "镇江市丹徒区","abbreviated":"丹徒区",
          "value": 4038
        },
        {

          "text": "镇江市润州区","abbreviated":"润州区",
          "value": 4039
        },
        {

          "text": "镇江市京口区","abbreviated":"京口区",
          "value": 4367
        },
        {

          "text": "镇江市","abbreviated":"镇江市",
          "value": 2239
        },
        {

          "text": "丹阳市","abbreviated":"丹阳市",
          "value": 2240
        },
        {

          "text": "扬中市","abbreviated":"扬中市",
          "value": 2241
        },
        {

          "text": "句容市","abbreviated":"句容市",
          "value": 2242
        }
      ],
      [
        {

          "text": "溧阳市","abbreviated":"溧阳市",
          "value": 2246
        },
        {

          "text": "常州市钟楼区","abbreviated":"钟楼区",
          "value": 4432
        },
        {

          "text": "常州市戚墅堰区","abbreviated":"戚墅堰区",
          "value": 4836
        },
        {

          "text": "常州市天宁区","abbreviated":"天宁区",
          "value": 4837
        },
        {

          "text": "常州市武进区","abbreviated":"武进区",
          "value": 4838
        },
        {

          "text": "常州市新北区","abbreviated":"新北区",
          "value": 4839
        },
        {

          "text": "常州市","abbreviated":"常州市",
          "value": 2244
        },
        {

          "text": "金坛市","abbreviated":"金坛市",
          "value": 2245
        }
      ],
      [
        {

          "text": "无锡市北塘区","abbreviated":"北塘区",
          "value": 4024
        },
        {

          "text": "无锡市滨湖区","abbreviated":"滨湖区",
          "value": 4025
        },
        {

          "text": "无锡市崇安区","abbreviated":"崇安区",
          "value": 4026
        },
        {

          "text": "无锡市惠山区","abbreviated":"惠山区",
          "value": 4027
        },
        {

          "text": "无锡市南长区","abbreviated":"南长区",
          "value": 4028
        },
        {

          "text": "无锡市锡山区","abbreviated":"锡山区",
          "value": 4029
        },
        {

          "text": "无锡市","abbreviated":"无锡市",
          "value": 2248
        },
        {

          "text": "江阴市","abbreviated":"江阴市",
          "value": 2249
        },
        {

          "text": "宜兴市","abbreviated":"宜兴市",
          "value": 2250
        }
      ],
      [
        {

          "text": "苏州市沧浪区","abbreviated":"沧浪区",
          "value": 4015
        },
        {

          "text": "苏州市虎丘区","abbreviated":"虎丘区",
          "value": 4016
        },
        {

          "text": "苏州市金阊区","abbreviated":"金阊区",
          "value": 4017
        },
        {

          "text": "苏州市平江区","abbreviated":"平江区",
          "value": 4018
        },
        {

          "text": "苏州市吴中区","abbreviated":"吴中区",
          "value": 4019
        },
        {

          "text": "苏州市相城区","abbreviated":"相城区",
          "value": 4020
        },
        {

          "text": "苏州市","abbreviated":"苏州市",
          "value": 2252
        },
        {

          "text": "常熟市","abbreviated":"常熟市",
          "value": 2253
        },
        {

          "text": "张家港市","abbreviated":"张家港市",
          "value": 2254
        },
        {

          "text": "太仓市","abbreviated":"太仓市",
          "value": 2255
        },
        {

          "text": "昆山市","abbreviated":"昆山市",
          "value": 2256
        },
        {

          "text": "苏州市吴江区","abbreviated":"吴江区",
          "value": 2257
        },
        {

          "text": "苏州工业园区","abbreviated":"苏州工业园区",
          "value": 4918
        },
        {

          "text": "苏州市姑苏区","abbreviated":"姑苏区",
          "value": 4995
        }
      ]
    ],
    [
      [
        {

          "text": "宁波市","abbreviated":"宁波市",
          "value": 3487
        },
        {

          "text": "余姚市","abbreviated":"余姚市",
          "value": 3488
        },
        {

          "text": "慈溪市","abbreviated":"慈溪市",
          "value": 3489
        },
        {

          "text": "奉化市","abbreviated":"奉化市",
          "value": 3490
        },
        {

          "text": "宁海县","abbreviated":"宁海县",
          "value": 3491
        },
        {

          "text": "象山县","abbreviated":"象山县",
          "value": 3492
        },
        {

          "text": "宁波市北仑区","abbreviated":"北仑区",
          "value": 4334
        },
        {

          "text": "宁波市海曙区","abbreviated":"海曙区",
          "value": 4335
        },
        {

          "text": "宁波市江北区","abbreviated":"江北区",
          "value": 4336
        },
        {

          "text": "宁波市江东区","abbreviated":"江东区",
          "value": 4337
        },
        {

          "text": "宁波市鄞州区","abbreviated":"鄞州区",
          "value": 4338
        },
        {

          "text": "宁波市镇海区","abbreviated":"镇海区",
          "value": 4339
        }
      ],
      [
        {

          "text": "温州市","abbreviated":"温州市",
          "value": 3494
        },
        {

          "text": "瑞安市","abbreviated":"瑞安市",
          "value": 3495
        },
        {

          "text": "乐清市","abbreviated":"乐清市",
          "value": 3496
        },
        {

          "text": "永嘉县","abbreviated":"永嘉县",
          "value": 3497
        },
        {

          "text": "洞头县","abbreviated":"洞头县",
          "value": 3498
        },
        {

          "text": "平阳县","abbreviated":"平阳县",
          "value": 3499
        },
        {

          "text": "苍南县","abbreviated":"苍南县",
          "value": 3500
        },
        {

          "text": "文成县","abbreviated":"文成县",
          "value": 3501
        },
        {

          "text": "泰顺县","abbreviated":"泰顺县",
          "value": 3502
        },
        {

          "text": "温州市龙湾区","abbreviated":"龙湾区",
          "value": 4346
        },
        {

          "text": "温州市鹿城区","abbreviated":"鹿城区",
          "value": 4347
        },
        {

          "text": "温州市瓯海区","abbreviated":"瓯海区",
          "value": 4348
        }
      ],
      [
        {

          "text": "嘉兴市","abbreviated":"嘉兴市",
          "value": 3504
        },
        {

          "text": "海宁市","abbreviated":"海宁市",
          "value": 3505
        },
        {

          "text": "平湖市","abbreviated":"平湖市",
          "value": 3506
        },
        {

          "text": "桐乡市","abbreviated":"桐乡市",
          "value": 3507
        },
        {

          "text": "嘉善县","abbreviated":"嘉善县",
          "value": 3508
        },
        {

          "text": "海盐县","abbreviated":"海盐县",
          "value": 3509
        },
        {

          "text": "嘉兴市南湖区","abbreviated":"南湖区",
          "value": 4329
        },
        {

          "text": "嘉兴市秀洲区","abbreviated":"秀洲区",
          "value": 4330
        }
      ],
      [
        {

          "text": "湖州市","abbreviated":"湖州市",
          "value": 3511
        },
        {

          "text": "长兴县","abbreviated":"长兴县",
          "value": 3512
        },
        {

          "text": "德清县","abbreviated":"德清县",
          "value": 3513
        },
        {

          "text": "安吉县","abbreviated":"安吉县",
          "value": 3514
        },
        {

          "text": "湖州市南浔区","abbreviated":"南浔区",
          "value": 4327
        },
        {

          "text": "湖州市吴兴区","abbreviated":"吴兴区",
          "value": 4328
        }
      ],
      [
        {

          "text": "绍兴市","abbreviated":"绍兴市",
          "value": 3516
        },
        {

          "text": "诸暨市","abbreviated":"诸暨市",
          "value": 3517
        },
        {

          "text": "嵊州市","abbreviated":"嵊州市",
          "value": 3519
        },
        {

          "text": "绍兴市柯桥区","abbreviated":"柯桥区",
          "value": 3520
        },
        {

          "text": "新昌县","abbreviated":"新昌县",
          "value": 3521
        },
        {

          "text": "绍兴市上虞区","abbreviated":"上虞区",
          "value": 3518
        },
        {

          "text": "绍兴市越城区","abbreviated":"越城区",
          "value": 4342
        }
      ],
      [
        {

          "text": "金华市","abbreviated":"金华市",
          "value": 3523
        },
        {

          "text": "兰溪市","abbreviated":"兰溪市",
          "value": 3524
        },
        {

          "text": "义乌市","abbreviated":"义乌市",
          "value": 3525
        },
        {

          "text": "东阳市","abbreviated":"东阳市",
          "value": 3526
        },
        {

          "text": "永康市","abbreviated":"永康市",
          "value": 3527
        },
        {

          "text": "武义县","abbreviated":"武义县",
          "value": 3528
        },
        {

          "text": "浦江县","abbreviated":"浦江县",
          "value": 3529
        },
        {

          "text": "磐安县","abbreviated":"磐安县",
          "value": 3530
        },
        {

          "text": "金华市金东区","abbreviated":"金东区",
          "value": 4331
        },
        {

          "text": "金华市婺城区","abbreviated":"婺城区",
          "value": 4332
        }
      ],
      [
        {

          "text": "舟山市","abbreviated":"舟山市",
          "value": 3538
        },
        {

          "text": "岱山县","abbreviated":"岱山县",
          "value": 3539
        },
        {

          "text": "嵊泗县","abbreviated":"嵊泗县",
          "value": 3540
        },
        {

          "text": "舟山市定海区","abbreviated":"定海区",
          "value": 4349
        },
        {

          "text": "舟山市普陀区","abbreviated":"普陀区",
          "value": 4350
        }
      ],
      [
        {

          "text": "台州市","abbreviated":"台州市",
          "value": 3542
        },
        {

          "text": "温岭市","abbreviated":"温岭市",
          "value": 3544
        },
        {

          "text": "玉环县","abbreviated":"玉环县",
          "value": 3545
        },
        {

          "text": "天台县","abbreviated":"天台县",
          "value": 3546
        },
        {

          "text": "仙居县","abbreviated":"仙居县",
          "value": 3547
        },
        {

          "text": "三门县","abbreviated":"三门县",
          "value": 3548
        },
        {

          "text": "临海市","abbreviated":"临海市",
          "value": 3543
        },
        {

          "text": "台州市黄岩区","abbreviated":"黄岩区",
          "value": 4343
        },
        {

          "text": "台州市椒江区","abbreviated":"椒江区",
          "value": 4344
        },
        {

          "text": "台州市路桥区","abbreviated":"路桥区",
          "value": 4345
        }
      ],
      [
        {

          "text": "丽水市","abbreviated":"丽水市",
          "value": 3550
        },
        {

          "text": "龙泉市","abbreviated":"龙泉市",
          "value": 3551
        },
        {

          "text": "缙云县","abbreviated":"缙云县",
          "value": 3552
        },
        {

          "text": "青田县","abbreviated":"青田县",
          "value": 3553
        },
        {

          "text": "云和县","abbreviated":"云和县",
          "value": 3554
        },
        {

          "text": "遂昌县","abbreviated":"遂昌县",
          "value": 3555
        },
        {

          "text": "松阳县","abbreviated":"松阳县",
          "value": 3556
        },
        {

          "text": "庆元县","abbreviated":"庆元县",
          "value": 3557
        },
        {

          "text": "景宁畲族自治县","abbreviated":"景宁畲族自治县",
          "value": 3558
        },
        {

          "text": "丽水市莲都区","abbreviated":"莲都区",
          "value": 4333
        }
      ],
      [
        {

          "text": "杭州市","abbreviated":"杭州市",
          "value": 3480
        },
        {

          "text": "建德市","abbreviated":"建德市",
          "value": 3481
        },
        {

          "text": "杭州市富阳区","abbreviated":"富阳区",
          "value": 3482
        },
        {

          "text": "临安市","abbreviated":"临安市",
          "value": 3483
        },
        {

          "text": "桐庐县","abbreviated":"桐庐县",
          "value": 3484
        },
        {

          "text": "淳安县","abbreviated":"淳安县",
          "value": 3485
        },
        {

          "text": "杭州市滨江区","abbreviated":"滨江区",
          "value": 4319
        },
        {

          "text": "杭州市拱墅区","abbreviated":"拱墅区",
          "value": 4320
        },
        {

          "text": "杭州市江干区","abbreviated":"江干区",
          "value": 4321
        },
        {

          "text": "杭州市上城区","abbreviated":"上城区",
          "value": 4322
        },
        {

          "text": "杭州市西湖区","abbreviated":"西湖区",
          "value": 4323
        },
        {

          "text": "杭州市下城区","abbreviated":"下城区",
          "value": 4324
        },
        {

          "text": "杭州市萧山区","abbreviated":"萧山区",
          "value": 4325
        },
        {

          "text": "杭州市余杭区","abbreviated":"余杭区",
          "value": 4326
        }
      ],
      [
        {

          "text": "衢州市","abbreviated":"衢州市",
          "value": 3532
        },
        {

          "text": "江山市","abbreviated":"江山市",
          "value": 3533
        },
        {

          "text": "龙游县","abbreviated":"龙游县",
          "value": 3534
        },
        {

          "text": "常山县","abbreviated":"常山县",
          "value": 3535
        },
        {

          "text": "开化县","abbreviated":"开化县",
          "value": 3536
        },
        {

          "text": "衢州市柯城区","abbreviated":"柯城区",
          "value": 4340
        },
        {

          "text": "衢州市衢江区","abbreviated":"衢江区",
          "value": 4341
        }
      ]
    ],
    [
      [
        {

          "text": "阜阳市颍东区","abbreviated":"颍东区",
          "value": 4445
        },
        {

          "text": "阜阳市颍泉区","abbreviated":"颍泉区",
          "value": 4446
        },
        {

          "text": "阜阳市颍州区","abbreviated":"颍州区",
          "value": 4447
        },
        {

          "text": "阜阳市","abbreviated":"阜阳市",
          "value": 1055
        },
        {

          "text": "界首市","abbreviated":"界首市",
          "value": 1056
        },
        {

          "text": "临泉县","abbreviated":"临泉县",
          "value": 1057
        },
        {

          "text": "颍上县","abbreviated":"颍上县",
          "value": 1058
        },
        {

          "text": "阜南县","abbreviated":"阜南县",
          "value": 1059
        },
        {

          "text": "太和县","abbreviated":"太和县",
          "value": 1060
        }
      ],
      [
        {

          "text": "合肥市包河区","abbreviated":"包河区",
          "value": 4448
        },
        {

          "text": "合肥市庐阳区","abbreviated":"庐阳区",
          "value": 4449
        },
        {

          "text": "合肥市蜀山区","abbreviated":"蜀山区",
          "value": 4450
        },
        {

          "text": "合肥市瑶海区","abbreviated":"瑶海区",
          "value": 4451
        },
        {

          "text": "合肥市","abbreviated":"合肥市",
          "value": 1004
        },
        {

          "text": "长丰县","abbreviated":"长丰县",
          "value": 1005
        },
        {

          "text": "肥东县","abbreviated":"肥东县",
          "value": 1006
        },
        {

          "text": "肥西县","abbreviated":"肥西县",
          "value": 1007
        },
        {

          "text": "巢湖市","abbreviated":"巢湖市",
          "value": 1068
        },
        {

          "text": "庐江县","abbreviated":"庐江县",
          "value": 1071
        }
      ],
      [
        {

          "text": "芜湖市镜湖区","abbreviated":"镜湖区",
          "value": 4471
        },
        {

          "text": "芜湖市鸠江区","abbreviated":"鸠江区",
          "value": 4472
        },
        {

          "text": "芜湖市三山区","abbreviated":"三山区",
          "value": 4473
        },
        {

          "text": "芜湖市弋江区","abbreviated":"弋江区",
          "value": 4474
        },
        {

          "text": "芜湖市","abbreviated":"芜湖市",
          "value": 1009
        },
        {

          "text": "芜湖县","abbreviated":"芜湖县",
          "value": 1010
        },
        {

          "text": "南陵县","abbreviated":"南陵县",
          "value": 1011
        },
        {

          "text": "繁昌县","abbreviated":"繁昌县",
          "value": 1012
        },
        {

          "text": "无为县","abbreviated":"无为县",
          "value": 1070
        }
      ],
      [
        {

          "text": "蚌埠市蚌山区","abbreviated":"蚌山区",
          "value": 4436
        },
        {

          "text": "蚌埠市淮上区","abbreviated":"淮上区",
          "value": 4437
        },
        {

          "text": "蚌埠市龙子湖区","abbreviated":"龙子湖区",
          "value": 4438
        },
        {

          "text": "蚌埠市禹会区","abbreviated":"禹会区",
          "value": 4439
        },
        {

          "text": "蚌埠市","abbreviated":"蚌埠市",
          "value": 1014
        },
        {

          "text": "怀远县","abbreviated":"怀远县",
          "value": 1015
        },
        {

          "text": "固镇县","abbreviated":"固镇县",
          "value": 1016
        },
        {

          "text": "五河县","abbreviated":"五河县",
          "value": 1017
        }
      ],
      [
        {

          "text": "淮南市八公山区","abbreviated":"八公山区",
          "value": 4455
        },
        {

          "text": "淮南市大通区","abbreviated":"大通区",
          "value": 4456
        },
        {

          "text": "淮南市潘集区","abbreviated":"潘集区",
          "value": 4457
        },
        {

          "text": "淮南市田家庵区","abbreviated":"田家庵区",
          "value": 4458
        },
        {

          "text": "淮南市谢家集区","abbreviated":"谢家集区",
          "value": 4459
        },
        {

          "text": "淮南市","abbreviated":"淮南市",
          "value": 1019
        },
        {

          "text": "凤台县","abbreviated":"凤台县",
          "value": 1020
        }
      ],
      [
        {

          "text": "马鞍山市雨山区","abbreviated":"雨山区",
          "value": 4389
        },
        {

          "text": "马鞍山市花山区","abbreviated":"花山区",
          "value": 4465
        },
        {

          "text": "马鞍山市金家庄区","abbreviated":"金家庄区",
          "value": 4466
        },
        {

          "text": "马鞍山市","abbreviated":"马鞍山市",
          "value": 1022
        },
        {

          "text": "当涂县","abbreviated":"当涂县",
          "value": 1023
        },
        {

          "text": "含山县","abbreviated":"含山县",
          "value": 1069
        },
        {

          "text": "和县","abbreviated":"和县",
          "value": 1072
        },
        {

          "text": "马鞍山市博望区","abbreviated":"博望区",
          "value": 105022
        }
      ],
      [
        {

          "text": "淮北市杜集区","abbreviated":"杜集区",
          "value": 4452
        },
        {

          "text": "淮北市烈山区","abbreviated":"烈山区",
          "value": 4453
        },
        {

          "text": "淮北市相山区","abbreviated":"相山区",
          "value": 4454
        },
        {

          "text": "淮北市","abbreviated":"淮北市",
          "value": 1025
        },
        {

          "text": "濉溪县","abbreviated":"濉溪县",
          "value": 1026
        }
      ],
      [
        {

          "text": "铜陵市铜官山区","abbreviated":"铜官山区",
          "value": 4470
        },
        {

          "text": "铜陵市郊区","abbreviated":"郊区",
          "value": 4468
        },
        {

          "text": "铜陵市狮子山区","abbreviated":"狮子山区",
          "value": 4469
        },
        {

          "text": "铜陵市","abbreviated":"铜陵市",
          "value": 1028
        },
        {

          "text": "铜陵县","abbreviated":"铜陵县",
          "value": 1029
        }
      ],
      [
        {

          "text": "安庆市大观区","abbreviated":"大观区",
          "value": 4433
        },
        {

          "text": "安庆市宜秀区","abbreviated":"宜秀区",
          "value": 4434
        },
        {

          "text": "安庆市迎江区","abbreviated":"迎江区",
          "value": 4435
        },
        {

          "text": "安庆市","abbreviated":"安庆市",
          "value": 1031
        },
        {

          "text": "桐城市","abbreviated":"桐城市",
          "value": 1032
        },
        {

          "text": "宿松县","abbreviated":"宿松县",
          "value": 1033
        },
        {

          "text": "枞阳县","abbreviated":"枞阳县",
          "value": 1034
        },
        {

          "text": "太湖县","abbreviated":"太湖县",
          "value": 1035
        },
        {

          "text": "怀宁县","abbreviated":"怀宁县",
          "value": 1036
        },
        {

          "text": "岳西县","abbreviated":"岳西县",
          "value": 1037
        },
        {

          "text": "望江县","abbreviated":"望江县",
          "value": 1038
        },
        {

          "text": "潜山县","abbreviated":"潜山县",
          "value": 1039
        }
      ],
      [
        {

          "text": "歙县","abbreviated":"歙县",
          "value": 1043
        },
        {

          "text": "黄山市黄山区","abbreviated":"黄山区",
          "value": 4460
        },
        {

          "text": "黄山市徽州区","abbreviated":"徽州区",
          "value": 4461
        },
        {

          "text": "黄山市屯溪区","abbreviated":"屯溪区",
          "value": 4462
        },
        {

          "text": "黄山市","abbreviated":"黄山市",
          "value": 1041
        },
        {

          "text": "休宁县","abbreviated":"休宁县",
          "value": 1042
        },
        {

          "text": "祁门县","abbreviated":"祁门县",
          "value": 1044
        },
        {

          "text": "黟县","abbreviated":"黟县",
          "value": 1045
        }
      ],
      [
        {

          "text": "滁州市琅琊区","abbreviated":"琅琊区",
          "value": 4443
        },
        {

          "text": "滁州市南谯区","abbreviated":"南谯区",
          "value": 4444
        },
        {

          "text": "滁州市","abbreviated":"滁州市",
          "value": 1047
        },
        {

          "text": "天长市","abbreviated":"天长市",
          "value": 1048
        },
        {

          "text": "明光市","abbreviated":"明光市",
          "value": 1049
        },
        {

          "text": "全椒县","abbreviated":"全椒县",
          "value": 1050
        },
        {

          "text": "来安县","abbreviated":"来安县",
          "value": 1051
        },
        {

          "text": "定远县","abbreviated":"定远县",
          "value": 1052
        },
        {

          "text": "凤阳县","abbreviated":"凤阳县",
          "value": 1053
        }
      ],
      [
        {

          "text": "灵璧县","abbreviated":"灵璧县",
          "value": 1066
        },
        {

          "text": "宿州市埇桥区","abbreviated":"埇桥区",
          "value": 4467
        },
        {

          "text": "宿州市","abbreviated":"宿州市",
          "value": 1062
        },
        {

          "text": "萧县","abbreviated":"萧县",
          "value": 1063
        },
        {

          "text": "泗县","abbreviated":"泗县",
          "value": 1064
        },
        {

          "text": "砀山县","abbreviated":"砀山县",
          "value": 1065
        }
      ],
      [
        {

          "text": "巢湖市居巢区","abbreviated":"居巢区",
          "value": 4441
        }
      ],
      [
        {

          "text": "六安市金安区","abbreviated":"金安区",
          "value": 4463
        },
        {

          "text": "六安市裕安区","abbreviated":"裕安区",
          "value": 4464
        },
        {

          "text": "六安市","abbreviated":"六安市",
          "value": 1074
        },
        {

          "text": "寿县","abbreviated":"寿县",
          "value": 1075
        },
        {

          "text": "霍山县","abbreviated":"霍山县",
          "value": 1076
        },
        {

          "text": "霍邱县","abbreviated":"霍邱县",
          "value": 1077
        },
        {

          "text": "舒城县","abbreviated":"舒城县",
          "value": 1078
        },
        {

          "text": "金寨县","abbreviated":"金寨县",
          "value": 1079
        }
      ],
      [
        {

          "text": "亳州市谯城区","abbreviated":"谯城区",
          "value": 4440
        },
        {

          "text": "亳州市","abbreviated":"亳州市",
          "value": 1081
        },
        {

          "text": "利辛县","abbreviated":"利辛县",
          "value": 1082
        },
        {

          "text": "涡阳县","abbreviated":"涡阳县",
          "value": 1083
        },
        {

          "text": "蒙城县","abbreviated":"蒙城县",
          "value": 1084
        }
      ],
      [
        {

          "text": "池州市贵池区","abbreviated":"贵池区",
          "value": 4442
        },
        {

          "text": "池州市","abbreviated":"池州市",
          "value": 1086
        },
        {

          "text": "东至县","abbreviated":"东至县",
          "value": 1087
        },
        {

          "text": "石台县","abbreviated":"石台县",
          "value": 1088
        },
        {

          "text": "青阳县","abbreviated":"青阳县",
          "value": 1089
        }
      ],
      [
        {

          "text": "宣城市宣州区","abbreviated":"宣州区",
          "value": 4475
        },
        {

          "text": "宣城市","abbreviated":"宣城市",
          "value": 1091
        },
        {

          "text": "宁国市","abbreviated":"宁国市",
          "value": 1092
        },
        {

          "text": "广德县","abbreviated":"广德县",
          "value": 1093
        },
        {

          "text": "郎溪县","abbreviated":"郎溪县",
          "value": 1094
        },
        {

          "text": "泾县","abbreviated":"泾县",
          "value": 1095
        },
        {

          "text": "旌德县","abbreviated":"旌德县",
          "value": 1096
        },
        {

          "text": "绩溪县","abbreviated":"绩溪县",
          "value": 1097
        }
      ]
    ],
    [
      [
        {

          "text": "长乐市","abbreviated":"长乐市",
          "value": 1107
        },
        {

          "text": "福州市仓山区","abbreviated":"仓山区",
          "value": 4490
        },
        {

          "text": "福州市晋安区","abbreviated":"晋安区",
          "value": 4491
        },
        {

          "text": "福州市马尾区","abbreviated":"马尾区",
          "value": 4492
        },
        {

          "text": "福州市台江区","abbreviated":"台江区",
          "value": 4493
        },
        {

          "text": "福州市鼓楼区","abbreviated":"鼓楼区",
          "value": 4392
        },
        {

          "text": "福州市","abbreviated":"福州市",
          "value": 1105
        },
        {

          "text": "福清市","abbreviated":"福清市",
          "value": 1106
        },
        {

          "text": "闽侯县","abbreviated":"闽侯县",
          "value": 1108
        },
        {

          "text": "闽清县","abbreviated":"闽清县",
          "value": 1109
        },
        {

          "text": "永泰县","abbreviated":"永泰县",
          "value": 1110
        },
        {

          "text": "连江县","abbreviated":"连江县",
          "value": 1111
        },
        {

          "text": "罗源县","abbreviated":"罗源县",
          "value": 1112
        },
        {

          "text": "平潭县","abbreviated":"平潭县",
          "value": 1113
        }
      ],
      [
        {

          "text": "厦门市海沧区","abbreviated":"海沧区",
          "value": 4505
        },
        {

          "text": "厦门市湖里区","abbreviated":"湖里区",
          "value": 4506
        },
        {

          "text": "厦门市集美区","abbreviated":"集美区",
          "value": 4507
        },
        {

          "text": "厦门市思明区","abbreviated":"思明区",
          "value": 4508
        },
        {

          "text": "厦门市同安区","abbreviated":"同安区",
          "value": 4509
        },
        {

          "text": "厦门市翔安区","abbreviated":"翔安区",
          "value": 4510
        },
        {

          "text": "厦门市","abbreviated":"厦门市",
          "value": 1115
        }
      ],
      [
        {

          "text": "将乐县","abbreviated":"将乐县",
          "value": 1120
        },
        {

          "text": "三明市梅列区","abbreviated":"梅列区",
          "value": 4504
        },
        {

          "text": "三明市三元区","abbreviated":"三元区",
          "value": 4394
        },
        {

          "text": "三明市","abbreviated":"三明市",
          "value": 1117
        },
        {

          "text": "永安市","abbreviated":"永安市",
          "value": 1118
        },
        {

          "text": "明溪县","abbreviated":"明溪县",
          "value": 1119
        },
        {

          "text": "大田县","abbreviated":"大田县",
          "value": 1121
        },
        {

          "text": "宁化县","abbreviated":"宁化县",
          "value": 1122
        },
        {

          "text": "建宁县","abbreviated":"建宁县",
          "value": 1123
        },
        {

          "text": "沙县","abbreviated":"沙县",
          "value": 1124
        },
        {

          "text": "尤溪县","abbreviated":"尤溪县",
          "value": 1125
        },
        {

          "text": "清流县","abbreviated":"清流县",
          "value": 1126
        },
        {

          "text": "泰宁县","abbreviated":"泰宁县",
          "value": 1127
        }
      ],
      [
        {

          "text": "莆田市城厢区","abbreviated":"城厢区",
          "value": 4497
        },
        {

          "text": "莆田市荔城区","abbreviated":"荔城区",
          "value": 4498
        },
        {

          "text": "莆田市秀屿区","abbreviated":"秀屿区",
          "value": 4499
        },
        {

          "text": "莆田市涵江区","abbreviated":"涵江区",
          "value": 4393
        },
        {

          "text": "莆田市","abbreviated":"莆田市",
          "value": 1129
        },
        {

          "text": "仙游县","abbreviated":"仙游县",
          "value": 1130
        }
      ],
      [
        {

          "text": "泉州市","abbreviated":"泉州市",
          "value": 1132
        },
        {

          "text": "泉州市丰泽区","abbreviated":"丰泽区",
          "value": 4500
        },
        {

          "text": "泉州市鲤城区","abbreviated":"鲤城区",
          "value": 4501
        },
        {

          "text": "泉州市洛江区","abbreviated":"洛江区",
          "value": 4502
        },
        {

          "text": "泉州市泉港区","abbreviated":"泉港区",
          "value": 4503
        },
        {

          "text": "石狮市","abbreviated":"石狮市",
          "value": 1133
        },
        {

          "text": "晋江市","abbreviated":"晋江市",
          "value": 1134
        },
        {

          "text": "南安市","abbreviated":"南安市",
          "value": 1135
        },
        {

          "text": "惠安县","abbreviated":"惠安县",
          "value": 1136
        },
        {

          "text": "永春县","abbreviated":"永春县",
          "value": 1137
        },
        {

          "text": "安溪县","abbreviated":"安溪县",
          "value": 1138
        },
        {

          "text": "德化县","abbreviated":"德化县",
          "value": 1139
        },
        {

          "text": "金门县","abbreviated":"金门县",
          "value": 1140
        }
      ],
      [
        {

          "text": "漳州市龙文区","abbreviated":"龙文区",
          "value": 4511
        },
        {

          "text": "漳州市芗城区","abbreviated":"芗城区",
          "value": 4512
        },
        {

          "text": "漳州市","abbreviated":"漳州市",
          "value": 1142
        },
        {

          "text": "龙海市","abbreviated":"龙海市",
          "value": 1143
        },
        {

          "text": "平和县","abbreviated":"平和县",
          "value": 1144
        },
        {

          "text": "南靖县","abbreviated":"南靖县",
          "value": 1145
        },
        {

          "text": "诏安县","abbreviated":"诏安县",
          "value": 1146
        },
        {

          "text": "漳浦县","abbreviated":"漳浦县",
          "value": 1147
        },
        {

          "text": "华安县","abbreviated":"华安县",
          "value": 1148
        },
        {

          "text": "东山县","abbreviated":"东山县",
          "value": 1149
        },
        {

          "text": "长泰县","abbreviated":"长泰县",
          "value": 1150
        },
        {

          "text": "云霄县","abbreviated":"云霄县",
          "value": 1151
        }
      ],
      [
        {

          "text": "南平市延平区","abbreviated":"延平区",
          "value": 4495
        },
        {

          "text": "南平市","abbreviated":"南平市",
          "value": 1153
        },
        {

          "text": "建瓯市","abbreviated":"建瓯市",
          "value": 1154
        },
        {

          "text": "邵武市","abbreviated":"邵武市",
          "value": 1155
        },
        {

          "text": "武夷山市","abbreviated":"武夷山市",
          "value": 1156
        },
        {

          "text": "建阳市","abbreviated":"建阳市",
          "value": 1157
        },
        {

          "text": "松溪县","abbreviated":"松溪县",
          "value": 1158
        },
        {

          "text": "光泽县","abbreviated":"光泽县",
          "value": 1159
        },
        {

          "text": "顺昌县","abbreviated":"顺昌县",
          "value": 1160
        },
        {

          "text": "浦城县","abbreviated":"浦城县",
          "value": 1161
        },
        {

          "text": "政和县","abbreviated":"政和县",
          "value": 1162
        }
      ],
      [
        {

          "text": "龙岩市新罗区","abbreviated":"新罗区",
          "value": 4494
        },
        {

          "text": "龙岩市","abbreviated":"龙岩市",
          "value": 1164
        },
        {

          "text": "漳平市","abbreviated":"漳平市",
          "value": 1165
        },
        {

          "text": "长汀县","abbreviated":"长汀县",
          "value": 1166
        },
        {

          "text": "武平县","abbreviated":"武平县",
          "value": 1167
        },
        {

          "text": "上杭县","abbreviated":"上杭县",
          "value": 1168
        },
        {

          "text": "永定县","abbreviated":"永定县",
          "value": 1169
        },
        {

          "text": "连城县","abbreviated":"连城县",
          "value": 1170
        }
      ],
      [
        {

          "text": "福安市","abbreviated":"福安市",
          "value": 1173
        },
        {

          "text": "宁德市蕉城区","abbreviated":"蕉城区",
          "value": 4496
        },
        {

          "text": "宁德市","abbreviated":"宁德市",
          "value": 1172
        },
        {

          "text": "福鼎市","abbreviated":"福鼎市",
          "value": 1174
        },
        {

          "text": "寿宁县","abbreviated":"寿宁县",
          "value": 1175
        },
        {

          "text": "霞浦县","abbreviated":"霞浦县",
          "value": 1176
        },
        {

          "text": "柘荣县","abbreviated":"柘荣县",
          "value": 1177
        },
        {

          "text": "屏南县","abbreviated":"屏南县",
          "value": 1178
        },
        {

          "text": "古田县","abbreviated":"古田县",
          "value": 1179
        },
        {

          "text": "周宁县","abbreviated":"周宁县",
          "value": 1180
        }
      ]
    ],
    [
      [
        {

          "text": "南昌市东湖区","abbreviated":"东湖区",
          "value": 4047
        },
        {

          "text": "南昌市青山湖区","abbreviated":"青山湖区",
          "value": 4048
        },
        {

          "text": "南昌市青云谱区","abbreviated":"青云谱区",
          "value": 4049
        },
        {

          "text": "南昌市湾里区","abbreviated":"湾里区",
          "value": 4050
        },
        {

          "text": "南昌市西湖区","abbreviated":"西湖区",
          "value": 4051
        },
        {

          "text": "南昌市","abbreviated":"南昌市",
          "value": 2260
        },
        {

          "text": "新建县","abbreviated":"新建县",
          "value": 2261
        },
        {

          "text": "南昌县","abbreviated":"南昌县",
          "value": 2262
        },
        {

          "text": "进贤县","abbreviated":"进贤县",
          "value": 2263
        },
        {

          "text": "安义县","abbreviated":"安义县",
          "value": 2264
        }
      ],
      [
        {

          "text": "景德镇市昌江区","abbreviated":"昌江区",
          "value": 4044
        },
        {

          "text": "景德镇市珠山区","abbreviated":"珠山区",
          "value": 4045
        },
        {

          "text": "景德镇市","abbreviated":"景德镇市",
          "value": 2266
        },
        {

          "text": "乐平市","abbreviated":"乐平市",
          "value": 2267
        },
        {

          "text": "浮梁县","abbreviated":"浮梁县",
          "value": 2268
        }
      ],
      [
        {

          "text": "莲花县","abbreviated":"莲花县",
          "value": 2271
        },
        {

          "text": "萍乡市安源区","abbreviated":"安源区",
          "value": 4052
        },
        {

          "text": "萍乡市湘东区","abbreviated":"湘东区",
          "value": 4369
        },
        {

          "text": "萍乡市","abbreviated":"萍乡市",
          "value": 2270
        },
        {

          "text": "上栗县","abbreviated":"上栗县",
          "value": 2272
        },
        {

          "text": "芦溪县","abbreviated":"芦溪县",
          "value": 2273
        }
      ],
      [
        {

          "text": "新余市渝水区","abbreviated":"渝水区",
          "value": 4054
        },
        {

          "text": "新余市","abbreviated":"新余市",
          "value": 2275
        },
        {

          "text": "分宜县","abbreviated":"分宜县",
          "value": 2276
        }
      ],
      [
        {

          "text": "九江市浔阳区","abbreviated":"浔阳区",
          "value": 4046
        },
        {

          "text": "九江市庐山区","abbreviated":"庐山区",
          "value": 4368
        },
        {

          "text": "九江市","abbreviated":"九江市",
          "value": 2278
        },
        {

          "text": "瑞昌市","abbreviated":"瑞昌市",
          "value": 2279
        },
        {

          "text": "九江县","abbreviated":"九江县",
          "value": 2280
        },
        {

          "text": "星子县","abbreviated":"星子县",
          "value": 2281
        },
        {

          "text": "武宁县","abbreviated":"武宁县",
          "value": 2282
        },
        {

          "text": "彭泽县","abbreviated":"彭泽县",
          "value": 2283
        },
        {

          "text": "永修县","abbreviated":"永修县",
          "value": 2284
        },
        {

          "text": "修水县","abbreviated":"修水县",
          "value": 2285
        },
        {

          "text": "湖口县","abbreviated":"湖口县",
          "value": 2286
        },
        {

          "text": "德安县","abbreviated":"德安县",
          "value": 2287
        },
        {

          "text": "都昌县","abbreviated":"都昌县",
          "value": 2288
        },
        {

          "text": "共青城市","abbreviated":"共青城市",
          "value": 105021
        }
      ],
      [
        {

          "text": "鹰潭市月湖区","abbreviated":"月湖区",
          "value": 4056
        },
        {

          "text": "鹰潭市","abbreviated":"鹰潭市",
          "value": 2290
        },
        {

          "text": "贵溪市","abbreviated":"贵溪市",
          "value": 2291
        },
        {

          "text": "余江县","abbreviated":"余江县",
          "value": 2292
        }
      ],
      [
        {

          "text": "赣州市章贡区","abbreviated":"章贡区",
          "value": 4041
        },
        {

          "text": "赣州市","abbreviated":"赣州市",
          "value": 2294
        },
        {

          "text": "瑞金市","abbreviated":"瑞金市",
          "value": 2295
        },
        {

          "text": "南康市","abbreviated":"南康市",
          "value": 2296
        },
        {

          "text": "石城县","abbreviated":"石城县",
          "value": 2297
        },
        {

          "text": "安远县","abbreviated":"安远县",
          "value": 2298
        },
        {

          "text": "赣县","abbreviated":"赣县",
          "value": 2299
        },
        {

          "text": "宁都县","abbreviated":"宁都县",
          "value": 2300
        },
        {

          "text": "寻乌县","abbreviated":"寻乌县",
          "value": 2301
        },
        {

          "text": "兴国县","abbreviated":"兴国县",
          "value": 2302
        },
        {

          "text": "定南县","abbreviated":"定南县",
          "value": 2303
        },
        {

          "text": "上犹县","abbreviated":"上犹县",
          "value": 2304
        },
        {

          "text": "于都县","abbreviated":"于都县",
          "value": 2305
        },
        {

          "text": "龙南县","abbreviated":"龙南县",
          "value": 2306
        },
        {

          "text": "崇义县","abbreviated":"崇义县",
          "value": 2307
        },
        {

          "text": "信丰县","abbreviated":"信丰县",
          "value": 2308
        },
        {

          "text": "全南县","abbreviated":"全南县",
          "value": 2309
        },
        {

          "text": "大余县","abbreviated":"大余县",
          "value": 2310
        },
        {

          "text": "会昌县","abbreviated":"会昌县",
          "value": 2311
        }
      ],
      [
        {

          "text": "井冈山市","abbreviated":"井冈山市",
          "value": 2314
        },
        {

          "text": "吉安市吉州区","abbreviated":"吉州区",
          "value": 4042
        },
        {

          "text": "吉安市青原区","abbreviated":"青原区",
          "value": 4043
        },
        {

          "text": "吉安市","abbreviated":"吉安市",
          "value": 2313
        },
        {

          "text": "吉安县","abbreviated":"吉安县",
          "value": 2315
        },
        {

          "text": "永丰县","abbreviated":"永丰县",
          "value": 2316
        },
        {

          "text": "永新县","abbreviated":"永新县",
          "value": 2317
        },
        {

          "text": "新干县","abbreviated":"新干县",
          "value": 2318
        },
        {

          "text": "泰和县","abbreviated":"泰和县",
          "value": 2319
        },
        {

          "text": "峡江县","abbreviated":"峡江县",
          "value": 2320
        },
        {

          "text": "遂川县","abbreviated":"遂川县",
          "value": 2321
        },
        {

          "text": "安福县","abbreviated":"安福县",
          "value": 2322
        },
        {

          "text": "吉水县","abbreviated":"吉水县",
          "value": 2323
        },
        {

          "text": "万安县","abbreviated":"万安县",
          "value": 2324
        }
      ],
      [
        {

          "text": "丰城市","abbreviated":"丰城市",
          "value": 2327
        },
        {

          "text": "宜春市袁州区","abbreviated":"袁州区",
          "value": 4055
        },
        {

          "text": "宜春市","abbreviated":"宜春市",
          "value": 2326
        },
        {

          "text": "樟树市","abbreviated":"樟树市",
          "value": 2328
        },
        {

          "text": "高安市","abbreviated":"高安市",
          "value": 2329
        },
        {

          "text": "铜鼓县","abbreviated":"铜鼓县",
          "value": 2330
        },
        {

          "text": "靖安县","abbreviated":"靖安县",
          "value": 2331
        },
        {

          "text": "宜丰县","abbreviated":"宜丰县",
          "value": 2332
        },
        {

          "text": "奉新县","abbreviated":"奉新县",
          "value": 2333
        },
        {

          "text": "万载县","abbreviated":"万载县",
          "value": 2334
        },
        {

          "text": "上高县","abbreviated":"上高县",
          "value": 2335
        }
      ],
      [
        {

          "text": "金溪县","abbreviated":"金溪县",
          "value": 2340
        },
        {

          "text": "抚州市临川区","abbreviated":"临川区",
          "value": 4040
        },
        {

          "text": "抚州市","abbreviated":"抚州市",
          "value": 2337
        },
        {

          "text": "南丰县","abbreviated":"南丰县",
          "value": 2338
        },
        {

          "text": "乐安县","abbreviated":"乐安县",
          "value": 2339
        },
        {

          "text": "南城县","abbreviated":"南城县",
          "value": 2341
        },
        {

          "text": "东乡县","abbreviated":"东乡县",
          "value": 2342
        },
        {

          "text": "资溪县","abbreviated":"资溪县",
          "value": 2343
        },
        {

          "text": "宜黄县","abbreviated":"宜黄县",
          "value": 2344
        },
        {

          "text": "广昌县","abbreviated":"广昌县",
          "value": 2345
        },
        {

          "text": "黎川县","abbreviated":"黎川县",
          "value": 2346
        },
        {

          "text": "崇仁县","abbreviated":"崇仁县",
          "value": 2347
        }
      ],
      [
        {

          "text": "上饶市信州区","abbreviated":"信州区",
          "value": 4053
        },
        {

          "text": "上饶市","abbreviated":"上饶市",
          "value": 2349
        },
        {

          "text": "德兴市","abbreviated":"德兴市",
          "value": 2350
        },
        {

          "text": "上饶县","abbreviated":"上饶县",
          "value": 2351
        },
        {

          "text": "广丰县","abbreviated":"广丰县",
          "value": 2352
        },
        {

          "text": "鄱阳县","abbreviated":"鄱阳县",
          "value": 2353
        },
        {

          "text": "婺源县","abbreviated":"婺源县",
          "value": 2354
        },
        {

          "text": "铅山县","abbreviated":"铅山县",
          "value": 2355
        },
        {

          "text": "余干县","abbreviated":"余干县",
          "value": 2356
        },
        {

          "text": "横峰县","abbreviated":"横峰县",
          "value": 2357
        },
        {

          "text": "弋阳县","abbreviated":"弋阳县",
          "value": 2358
        },
        {

          "text": "玉山县","abbreviated":"玉山县",
          "value": 2359
        },
        {

          "text": "万年县","abbreviated":"万年县",
          "value": 2360
        }
      ]
    ],
    [
      [
        {

          "text": "聊城市","abbreviated":"聊城市",
          "value": 2947
        },
        {

          "text": "临清市","abbreviated":"临清市",
          "value": 2948
        },
        {

          "text": "高唐县","abbreviated":"高唐县",
          "value": 2949
        },
        {

          "text": "阳谷县","abbreviated":"阳谷县",
          "value": 2950
        },
        {

          "text": "茌平县","abbreviated":"茌平县",
          "value": 2951
        },
        {

          "text": "莘县","abbreviated":"莘县",
          "value": 2952
        },
        {

          "text": "东阿县","abbreviated":"东阿县",
          "value": 2953
        },
        {

          "text": "冠县","abbreviated":"冠县",
          "value": 2954
        },
        {

          "text": "聊城市东昌府区","abbreviated":"东昌府区",
          "value": 4149
        }
      ],
      [
        {

          "text": "滨州市","abbreviated":"滨州市",
          "value": 2956
        },
        {

          "text": "邹平县","abbreviated":"邹平县",
          "value": 2957
        },
        {

          "text": "沾化县","abbreviated":"沾化县",
          "value": 2958
        },
        {

          "text": "惠民县","abbreviated":"惠民县",
          "value": 2959
        },
        {

          "text": "博兴县","abbreviated":"博兴县",
          "value": 2960
        },
        {

          "text": "阳信县","abbreviated":"阳信县",
          "value": 2961
        },
        {

          "text": "无棣县","abbreviated":"无棣县",
          "value": 2962
        },
        {

          "text": "滨州市滨城区","abbreviated":"滨城区",
          "value": 4135
        }
      ],
      [
        {

          "text": "菏泽市","abbreviated":"菏泽市",
          "value": 2964
        },
        {

          "text": "鄄城县","abbreviated":"鄄城县",
          "value": 2965
        },
        {

          "text": "单县","abbreviated":"单县",
          "value": 2966
        },
        {

          "text": "郓城县","abbreviated":"郓城县",
          "value": 2967
        },
        {

          "text": "曹县","abbreviated":"曹县",
          "value": 2968
        },
        {

          "text": "定陶县","abbreviated":"定陶县",
          "value": 2969
        },
        {

          "text": "巨野县","abbreviated":"巨野县",
          "value": 2970
        },
        {

          "text": "东明县","abbreviated":"东明县",
          "value": 2971
        },
        {

          "text": "成武县","abbreviated":"成武县",
          "value": 2972
        },
        {

          "text": "菏泽市牡丹区","abbreviated":"牡丹区",
          "value": 4139
        }
      ],
      [
        {

          "text": "潍坊市坊子区","abbreviated":"坊子区",
          "value": 4163
        },
        {

          "text": "潍坊市寒亭区","abbreviated":"寒亭区",
          "value": 4164
        },
        {

          "text": "潍坊市潍城区","abbreviated":"潍城区",
          "value": 4165
        },
        {

          "text": "潍坊市奎文区","abbreviated":"奎文区",
          "value": 4382
        },
        {

          "text": "潍坊市","abbreviated":"潍坊市",
          "value": 2875
        },
        {

          "text": "青州市","abbreviated":"青州市",
          "value": 2876
        },
        {

          "text": "诸城市","abbreviated":"诸城市",
          "value": 2877
        },
        {

          "text": "寿光市","abbreviated":"寿光市",
          "value": 2878
        },
        {

          "text": "安丘市","abbreviated":"安丘市",
          "value": 2879
        },
        {

          "text": "高密市","abbreviated":"高密市",
          "value": 2880
        },
        {

          "text": "昌邑市","abbreviated":"昌邑市",
          "value": 2881
        },
        {

          "text": "昌乐县","abbreviated":"昌乐县",
          "value": 2882
        },
        {

          "text": "临朐县","abbreviated":"临朐县",
          "value": 2883
        }
      ],
      [
        {

          "text": "日照市东港区","abbreviated":"东港区",
          "value": 4158
        },
        {

          "text": "日照市岚山区","abbreviated":"岚山区",
          "value": 4159
        },
        {

          "text": "日照市","abbreviated":"日照市",
          "value": 2918
        },
        {

          "text": "五莲县","abbreviated":"五莲县",
          "value": 2919
        },
        {

          "text": "莒县","abbreviated":"莒县",
          "value": 2920
        }
      ],
      [
        {

          "text": "济南市","abbreviated":"济南市",
          "value": 2849
        },
        {

          "text": "济南市长清区","abbreviated":"长清区",
          "value": 4140
        },
        {

          "text": "济南市槐荫区","abbreviated":"槐荫区",
          "value": 4141
        },
        {

          "text": "济南市历城区","abbreviated":"历城区",
          "value": 4142
        },
        {

          "text": "济南市市中区","abbreviated":"市中区",
          "value": 4143
        },
        {

          "text": "济南市天桥区","abbreviated":"天桥区",
          "value": 4144
        },
        {

          "text": "济南市历下区","abbreviated":"历下区",
          "value": 4379
        },
        {

          "text": "章丘市","abbreviated":"章丘市",
          "value": 2850
        },
        {

          "text": "平阴县","abbreviated":"平阴县",
          "value": 2851
        },
        {

          "text": "济阳县","abbreviated":"济阳县",
          "value": 2852
        },
        {

          "text": "商河县","abbreviated":"商河县",
          "value": 2853
        }
      ],
      [
        {

          "text": "青岛市城阳区","abbreviated":"城阳区",
          "value": 4152
        },
        {

          "text": "青岛市黄岛区","abbreviated":"黄岛区",
          "value": 4153
        },
        {

          "text": "青岛市崂山区","abbreviated":"崂山区",
          "value": 4154
        },
        {

          "text": "青岛市李沧区","abbreviated":"李沧区",
          "value": 4155
        },
        {

          "text": "青岛市市北区","abbreviated":"市北区",
          "value": 4156
        },
        {

          "text": "青岛市四方区","abbreviated":"四方区",
          "value": 4157
        },
        {

          "text": "青岛市市南区","abbreviated":"市南区",
          "value": 4381
        },
        {

          "text": "青岛市","abbreviated":"青岛市",
          "value": 2855
        },
        {

          "text": "胶南市","abbreviated":"胶南市",
          "value": 2856
        },
        {

          "text": "胶州市","abbreviated":"胶州市",
          "value": 2857
        },
        {

          "text": "平度市","abbreviated":"平度市",
          "value": 2858
        },
        {

          "text": "莱西市","abbreviated":"莱西市",
          "value": 2859
        },
        {

          "text": "即墨市","abbreviated":"即墨市",
          "value": 2860
        }
      ],
      [
        {

          "text": "淄博市","abbreviated":"淄博市",
          "value": 2862
        },
        {

          "text": "淄博市博山区","abbreviated":"博山区",
          "value": 4174
        },
        {

          "text": "淄博市临淄区","abbreviated":"临淄区",
          "value": 4175
        },
        {

          "text": "淄博市张店区","abbreviated":"张店区",
          "value": 4176
        },
        {

          "text": "淄博市周村区","abbreviated":"周村区",
          "value": 4177
        },
        {

          "text": "淄博市淄川区","abbreviated":"淄川区",
          "value": 4178
        },
        {

          "text": "桓台县","abbreviated":"桓台县",
          "value": 2863
        },
        {

          "text": "高青县","abbreviated":"高青县",
          "value": 2864
        },
        {

          "text": "沂源县","abbreviated":"沂源县",
          "value": 2865
        }
      ],
      [
        {

          "text": "枣庄市山亭区","abbreviated":"山亭区",
          "value": 4170
        },
        {

          "text": "枣庄市市中区","abbreviated":"市中区",
          "value": 4171
        },
        {

          "text": "枣庄市薛城区","abbreviated":"薛城区",
          "value": 4172
        },
        {

          "text": "枣庄市峄城区","abbreviated":"峄城区",
          "value": 4173
        },
        {

          "text": "枣庄市台儿庄区","abbreviated":"台儿庄区",
          "value": 4383
        },
        {

          "text": "枣庄市","abbreviated":"枣庄市",
          "value": 2867
        },
        {

          "text": "滕州市","abbreviated":"滕州市",
          "value": 2868
        }
      ],
      [
        {

          "text": "东营市东营区","abbreviated":"东营区",
          "value": 4137
        },
        {

          "text": "东营市河口区","abbreviated":"河口区",
          "value": 4138
        },
        {

          "text": "东营市","abbreviated":"东营市",
          "value": 2870
        },
        {

          "text": "垦利县","abbreviated":"垦利县",
          "value": 2871
        },
        {

          "text": "广饶县","abbreviated":"广饶县",
          "value": 2872
        },
        {

          "text": "利津县","abbreviated":"利津县",
          "value": 2873
        }
      ],
      [
        {

          "text": "烟台市福山区","abbreviated":"福山区",
          "value": 4166
        },
        {

          "text": "烟台市莱山区","abbreviated":"莱山区",
          "value": 4167
        },
        {

          "text": "烟台市牟平区","abbreviated":"牟平区",
          "value": 4168
        },
        {

          "text": "烟台市芝罘区","abbreviated":"芝罘区",
          "value": 4169
        },
        {

          "text": "烟台市","abbreviated":"烟台市",
          "value": 2885
        },
        {

          "text": "龙口市","abbreviated":"龙口市",
          "value": 2886
        },
        {

          "text": "莱阳市","abbreviated":"莱阳市",
          "value": 2887
        },
        {

          "text": "莱州市","abbreviated":"莱州市",
          "value": 2888
        },
        {

          "text": "招远市","abbreviated":"招远市",
          "value": 2889
        },
        {

          "text": "蓬莱市","abbreviated":"蓬莱市",
          "value": 2890
        },
        {

          "text": "栖霞市","abbreviated":"栖霞市",
          "value": 2891
        },
        {

          "text": "海阳市","abbreviated":"海阳市",
          "value": 2892
        },
        {

          "text": "长岛县","abbreviated":"长岛县",
          "value": 2893
        },
        {

          "text": "烟台市开发区","abbreviated":"开发区",
          "value": 4940
        },
        {

          "text": "烟台市高新区","abbreviated":"高新区",
          "value": 4941
        }
      ],
      [
        {

          "text": "威海市环翠区","abbreviated":"环翠区",
          "value": 4162
        },
        {

          "text": "威海市","abbreviated":"威海市",
          "value": 2895
        },
        {

          "text": "乳山市","abbreviated":"乳山市",
          "value": 2896
        },
        {

          "text": "文登市","abbreviated":"文登市",
          "value": 2897
        },
        {

          "text": "荣成市","abbreviated":"荣成市",
          "value": 2898
        }
      ],
      [
        {

          "text": "济宁市任城区","abbreviated":"任城区",
          "value": 4145
        },
        {

          "text": "济宁市市中区","abbreviated":"市中区",
          "value": 4146
        },
        {

          "text": "济宁市","abbreviated":"济宁市",
          "value": 2900
        },
        {

          "text": "曲阜市","abbreviated":"曲阜市",
          "value": 2901
        },
        {

          "text": "兖州市","abbreviated":"兖州市",
          "value": 2902
        },
        {

          "text": "邹城市","abbreviated":"邹城市",
          "value": 2903
        },
        {

          "text": "鱼台县","abbreviated":"鱼台县",
          "value": 2904
        },
        {

          "text": "金乡县","abbreviated":"金乡县",
          "value": 2905
        },
        {

          "text": "嘉祥县","abbreviated":"嘉祥县",
          "value": 2906
        },
        {

          "text": "微山县","abbreviated":"微山县",
          "value": 2907
        },
        {

          "text": "汶上县","abbreviated":"汶上县",
          "value": 2908
        },
        {

          "text": "泗水县","abbreviated":"泗水县",
          "value": 2909
        },
        {

          "text": "梁山县","abbreviated":"梁山县",
          "value": 2910
        }
      ],
      [
        {

          "text": "泰安市岱岳区","abbreviated":"岱岳区",
          "value": 4160
        },
        {

          "text": "泰安市泰山区","abbreviated":"泰山区",
          "value": 4161
        },
        {

          "text": "泰安市","abbreviated":"泰安市",
          "value": 2912
        },
        {

          "text": "新泰市","abbreviated":"新泰市",
          "value": 2913
        },
        {

          "text": "肥城市","abbreviated":"肥城市",
          "value": 2914
        },
        {

          "text": "宁阳县","abbreviated":"宁阳县",
          "value": 2915
        },
        {

          "text": "东平县","abbreviated":"东平县",
          "value": 2916
        }
      ],
      [
        {

          "text": "莱芜市钢城区","abbreviated":"钢城区",
          "value": 4147
        },
        {

          "text": "莱芜市莱城区","abbreviated":"莱城区",
          "value": 4148
        },
        {

          "text": "莱芜市","abbreviated":"莱芜市",
          "value": 2922
        }
      ],
      [
        {

          "text": "齐河县","abbreviated":"齐河县",
          "value": 2929
        },
        {

          "text": "德州市德城区","abbreviated":"德城区",
          "value": 4136
        },
        {

          "text": "德州市","abbreviated":"德州市",
          "value": 2924
        },
        {

          "text": "乐陵市","abbreviated":"乐陵市",
          "value": 2925
        },
        {

          "text": "禹城市","abbreviated":"禹城市",
          "value": 2926
        },
        {

          "text": "陵县","abbreviated":"陵县",
          "value": 2927
        },
        {

          "text": "宁津县","abbreviated":"宁津县",
          "value": 2928
        },
        {

          "text": "武城县","abbreviated":"武城县",
          "value": 2930
        },
        {

          "text": "庆云县","abbreviated":"庆云县",
          "value": 2931
        },
        {

          "text": "平原县","abbreviated":"平原县",
          "value": 2932
        },
        {

          "text": "夏津县","abbreviated":"夏津县",
          "value": 2933
        },
        {

          "text": "临邑县","abbreviated":"临邑县",
          "value": 2934
        }
      ],
      [
        {

          "text": "沂水县","abbreviated":"沂水县",
          "value": 2939
        },
        {

          "text": "苍山县","abbreviated":"苍山县",
          "value": 2940
        },
        {

          "text": "平邑县","abbreviated":"平邑县",
          "value": 2942
        },
        {

          "text": "莒南县","abbreviated":"莒南县",
          "value": 2943
        },
        {

          "text": "蒙阴县","abbreviated":"蒙阴县",
          "value": 2944
        },
        {

          "text": "临沭县","abbreviated":"临沭县",
          "value": 2945
        },
        {

          "text": "费县","abbreviated":"费县",
          "value": 2941
        },
        {

          "text": "临沂市兰山区","abbreviated":"兰山区",
          "value": 4150
        },
        {

          "text": "临沂市罗庄区","abbreviated":"罗庄区",
          "value": 4151
        },
        {

          "text": "临沂市河东区","abbreviated":"河东区",
          "value": 4380
        },
        {

          "text": "临沂市","abbreviated":"临沂市",
          "value": 2936
        },
        {

          "text": "沂南县","abbreviated":"沂南县",
          "value": 2937
        },
        {

          "text": "郯城县","abbreviated":"郯城县",
          "value": 2938
        }
      ]
    ],
    [
      [
        {

          "text": "郑州市二七区","abbreviated":"二七区",
          "value": 4689
        },
        {

          "text": "郑州市管城回族区","abbreviated":"管城回族区",
          "value": 4690
        },
        {

          "text": "郑州市惠济区","abbreviated":"惠济区",
          "value": 4691
        },
        {

          "text": "郑州市金水区","abbreviated":"金水区",
          "value": 4692
        },
        {

          "text": "郑州市上街区","abbreviated":"上街区",
          "value": 4693
        },
        {

          "text": "郑州市中原区","abbreviated":"中原区",
          "value": 4694
        },
        {

          "text": "郑州市","abbreviated":"郑州市",
          "value": 1672
        },
        {

          "text": "巩义市","abbreviated":"巩义市",
          "value": 1673
        },
        {

          "text": "新郑市","abbreviated":"新郑市",
          "value": 1674
        },
        {

          "text": "新密市","abbreviated":"新密市",
          "value": 1675
        },
        {

          "text": "登封市","abbreviated":"登封市",
          "value": 1676
        },
        {

          "text": "荥阳市","abbreviated":"荥阳市",
          "value": 1677
        },
        {

          "text": "中牟县","abbreviated":"中牟县",
          "value": 1678
        }
      ],
      [
        {

          "text": "鹤壁市鹤山区","abbreviated":"鹤山区",
          "value": 4653
        },
        {

          "text": "鹤壁市淇滨区","abbreviated":"淇滨区",
          "value": 4654
        },
        {

          "text": "鹤壁市山城区","abbreviated":"山城区",
          "value": 4655
        },
        {

          "text": "鹤壁市","abbreviated":"鹤壁市",
          "value": 1714
        },
        {

          "text": "浚县","abbreviated":"浚县",
          "value": 1715
        },
        {

          "text": "淇县","abbreviated":"淇县",
          "value": 1716
        }
      ],
      [
        {

          "text": "开封市鼓楼区","abbreviated":"鼓楼区",
          "value": 4660
        },
        {

          "text": "开封市金明区","abbreviated":"金明区",
          "value": 4661
        },
        {

          "text": "开封市龙亭区","abbreviated":"龙亭区",
          "value": 4662
        },
        {

          "text": "开封市顺河回族区","abbreviated":"顺河回族区",
          "value": 4663
        },
        {

          "text": "开封市禹王台区","abbreviated":"禹王台区",
          "value": 4664
        },
        {

          "text": "开封市","abbreviated":"开封市",
          "value": 1680
        },
        {

          "text": "开封县","abbreviated":"开封县",
          "value": 1681
        },
        {

          "text": "尉氏县","abbreviated":"尉氏县",
          "value": 1682
        },
        {

          "text": "兰考县","abbreviated":"兰考县",
          "value": 1683
        },
        {

          "text": "杞县","abbreviated":"杞县",
          "value": 1684
        },
        {

          "text": "通许县","abbreviated":"通许县",
          "value": 1685
        }
      ],
      [
        {

          "text": "洛阳市廛河回族区","abbreviated":"廛河回族区",
          "value": 4665
        },
        {

          "text": "洛阳市吉利区","abbreviated":"吉利区",
          "value": 4666
        },
        {

          "text": "洛阳市涧西区","abbreviated":"涧西区",
          "value": 4667
        },
        {

          "text": "洛阳市老城区","abbreviated":"老城区",
          "value": 4668
        },
        {

          "text": "洛阳市洛龙区","abbreviated":"洛龙区",
          "value": 4669
        },
        {

          "text": "洛阳市西工区","abbreviated":"西工区",
          "value": 4670
        },
        {

          "text": "洛阳市","abbreviated":"洛阳市",
          "value": 1687
        },
        {

          "text": "偃师市","abbreviated":"偃师市",
          "value": 1688
        },
        {

          "text": "孟津县","abbreviated":"孟津县",
          "value": 1689
        },
        {

          "text": "汝阳县","abbreviated":"汝阳县",
          "value": 1690
        },
        {

          "text": "伊川县","abbreviated":"伊川县",
          "value": 1691
        },
        {

          "text": "洛宁县","abbreviated":"洛宁县",
          "value": 1692
        },
        {

          "text": "嵩县","abbreviated":"嵩县",
          "value": 1693
        },
        {

          "text": "宜阳县","abbreviated":"宜阳县",
          "value": 1694
        },
        {

          "text": "新安县","abbreviated":"新安县",
          "value": 1695
        },
        {

          "text": "栾川县","abbreviated":"栾川县",
          "value": 1696
        }
      ],
      [
        {

          "text": "平顶山市石龙区","abbreviated":"石龙区",
          "value": 4675
        },
        {

          "text": "平顶山市卫东区","abbreviated":"卫东区",
          "value": 4676
        },
        {

          "text": "平顶山市新华区","abbreviated":"新华区",
          "value": 4677
        },
        {

          "text": "平顶山市湛河区","abbreviated":"湛河区",
          "value": 4678
        },
        {

          "text": "平顶山市","abbreviated":"平顶山市",
          "value": 1698
        },
        {

          "text": "汝州市","abbreviated":"汝州市",
          "value": 1699
        },
        {

          "text": "舞钢市","abbreviated":"舞钢市",
          "value": 1700
        },
        {

          "text": "宝丰县","abbreviated":"宝丰县",
          "value": 1701
        },
        {

          "text": "叶县","abbreviated":"叶县",
          "value": 1702
        },
        {

          "text": "郏县","abbreviated":"郏县",
          "value": 1703
        },
        {

          "text": "鲁山县","abbreviated":"鲁山县",
          "value": 1704
        }
      ],
      [
        {

          "text": "焦作市解放区","abbreviated":"解放区",
          "value": 4656
        },
        {

          "text": "焦作市马村区","abbreviated":"马村区",
          "value": 4657
        },
        {

          "text": "焦作市山阳区","abbreviated":"山阳区",
          "value": 4658
        },
        {

          "text": "焦作市中站区","abbreviated":"中站区",
          "value": 4659
        },
        {

          "text": "焦作市","abbreviated":"焦作市",
          "value": 1706
        },
        {

          "text": "沁阳市","abbreviated":"沁阳市",
          "value": 1707
        },
        {

          "text": "孟州市","abbreviated":"孟州市",
          "value": 1708
        },
        {

          "text": "修武县","abbreviated":"修武县",
          "value": 1709
        },
        {

          "text": "温县","abbreviated":"温县",
          "value": 1710
        },
        {

          "text": "武陟县","abbreviated":"武陟县",
          "value": 1711
        },
        {

          "text": "博爱县","abbreviated":"博爱县",
          "value": 1712
        }
      ],
      [
        {

          "text": "封丘县","abbreviated":"封丘县",
          "value": 1725
        },
        {

          "text": "新乡市凤泉区","abbreviated":"凤泉区",
          "value": 4683
        },
        {

          "text": "新乡市红旗区","abbreviated":"红旗区",
          "value": 4684
        },
        {

          "text": "新乡市牧野区","abbreviated":"牧野区",
          "value": 4685
        },
        {

          "text": "新乡市卫滨区","abbreviated":"卫滨区",
          "value": 4686
        },
        {

          "text": "新乡市","abbreviated":"新乡市",
          "value": 1718
        },
        {

          "text": "卫辉市","abbreviated":"卫辉市",
          "value": 1719
        },
        {

          "text": "辉县市","abbreviated":"辉县市",
          "value": 1720
        },
        {

          "text": "新乡县","abbreviated":"新乡县",
          "value": 1721
        },
        {

          "text": "获嘉县","abbreviated":"获嘉县",
          "value": 1722
        },
        {

          "text": "原阳县","abbreviated":"原阳县",
          "value": 1723
        },
        {

          "text": "长垣县","abbreviated":"长垣县",
          "value": 1724
        },
        {

          "text": "延津县","abbreviated":"延津县",
          "value": 1726
        }
      ],
      [
        {

          "text": "安阳市北关区","abbreviated":"北关区",
          "value": 4649
        },
        {

          "text": "安阳市龙安区","abbreviated":"龙安区",
          "value": 4650
        },
        {

          "text": "安阳市文峰区","abbreviated":"文峰区",
          "value": 4651
        },
        {

          "text": "安阳市殷都区","abbreviated":"殷都区",
          "value": 4652
        },
        {

          "text": "安阳市","abbreviated":"安阳市",
          "value": 1728
        },
        {

          "text": "林州市","abbreviated":"林州市",
          "value": 1729
        },
        {

          "text": "安阳县","abbreviated":"安阳县",
          "value": 1730
        },
        {

          "text": "滑县","abbreviated":"滑县",
          "value": 1731
        },
        {

          "text": "内黄县","abbreviated":"内黄县",
          "value": 1732
        },
        {

          "text": "汤阴县","abbreviated":"汤阴县",
          "value": 1733
        }
      ],
      [
        {

          "text": "南乐县","abbreviated":"南乐县",
          "value": 1737
        },
        {

          "text": "濮阳市华龙区","abbreviated":"华龙区",
          "value": 4679
        },
        {

          "text": "濮阳市","abbreviated":"濮阳市",
          "value": 1735
        },
        {

          "text": "濮阳县","abbreviated":"濮阳县",
          "value": 1736
        },
        {

          "text": "台前县","abbreviated":"台前县",
          "value": 1738
        },
        {

          "text": "清丰县","abbreviated":"清丰县",
          "value": 1739
        },
        {

          "text": "范县","abbreviated":"范县",
          "value": 1740
        }
      ],
      [
        {

          "text": "许昌市魏都区","abbreviated":"魏都区",
          "value": 4413
        },
        {

          "text": "许昌市","abbreviated":"许昌市",
          "value": 1742
        },
        {

          "text": "禹州市","abbreviated":"禹州市",
          "value": 1743
        },
        {

          "text": "长葛市","abbreviated":"长葛市",
          "value": 1744
        },
        {

          "text": "许昌县","abbreviated":"许昌县",
          "value": 1745
        },
        {

          "text": "鄢陵县","abbreviated":"鄢陵县",
          "value": 1746
        },
        {

          "text": "襄城县","abbreviated":"襄城县",
          "value": 1747
        }
      ],
      [
        {

          "text": "漯河市源汇区","abbreviated":"源汇区",
          "value": 4671
        },
        {

          "text": "漯河市召陵区","abbreviated":"召陵区",
          "value": 4672
        },
        {

          "text": "漯河市","abbreviated":"漯河市",
          "value": 1749
        },
        {

          "text": "漯河市郾城区","abbreviated":"郾城区",
          "value": 1750
        },
        {

          "text": "临颍县","abbreviated":"临颍县",
          "value": 1751
        },
        {

          "text": "舞阳县","abbreviated":"舞阳县",
          "value": 1752
        }
      ],
      [
        {

          "text": "三门峡市湖滨区","abbreviated":"湖滨区",
          "value": 4680
        },
        {

          "text": "三门峡市","abbreviated":"三门峡市",
          "value": 1754
        },
        {

          "text": "义马市","abbreviated":"义马市",
          "value": 1755
        },
        {

          "text": "灵宝市","abbreviated":"灵宝市",
          "value": 1756
        },
        {

          "text": "渑池县","abbreviated":"渑池县",
          "value": 1757
        },
        {

          "text": "卢氏县","abbreviated":"卢氏县",
          "value": 1758
        },
        {

          "text": "陕县","abbreviated":"陕县",
          "value": 1759
        }
      ],
      [
        {

          "text": "南阳市宛城区","abbreviated":"宛城区",
          "value": 4673
        },
        {

          "text": "南阳市卧龙区","abbreviated":"卧龙区",
          "value": 4674
        },
        {

          "text": "南阳市","abbreviated":"南阳市",
          "value": 1761
        },
        {

          "text": "邓州市","abbreviated":"邓州市",
          "value": 1762
        },
        {

          "text": "桐柏县","abbreviated":"桐柏县",
          "value": 1763
        },
        {

          "text": "方城县","abbreviated":"方城县",
          "value": 1764
        },
        {

          "text": "淅川县","abbreviated":"淅川县",
          "value": 1765
        },
        {

          "text": "镇平县","abbreviated":"镇平县",
          "value": 1766
        },
        {

          "text": "唐河县","abbreviated":"唐河县",
          "value": 1767
        },
        {

          "text": "南召县","abbreviated":"南召县",
          "value": 1768
        },
        {

          "text": "内乡县","abbreviated":"内乡县",
          "value": 1769
        },
        {

          "text": "新野县","abbreviated":"新野县",
          "value": 1770
        },
        {

          "text": "社旗县","abbreviated":"社旗县",
          "value": 1771
        },
        {

          "text": "西峡县","abbreviated":"西峡县",
          "value": 1772
        }
      ],
      [
        {

          "text": "宁陵县","abbreviated":"宁陵县",
          "value": 1776
        },
        {

          "text": "商丘市梁园区","abbreviated":"梁园区",
          "value": 4681
        },
        {

          "text": "商丘市睢阳区","abbreviated":"睢阳区",
          "value": 4682
        },
        {

          "text": "商丘市","abbreviated":"商丘市",
          "value": 1774
        },
        {

          "text": "永城市","abbreviated":"永城市",
          "value": 1775
        },
        {

          "text": "虞城县","abbreviated":"虞城县",
          "value": 1777
        },
        {

          "text": "民权县","abbreviated":"民权县",
          "value": 1778
        },
        {

          "text": "夏邑县","abbreviated":"夏邑县",
          "value": 1779
        },
        {

          "text": "柘城县","abbreviated":"柘城县",
          "value": 1780
        },
        {

          "text": "睢县","abbreviated":"睢县",
          "value": 1781
        }
      ],
      [
        {

          "text": "商城县","abbreviated":"商城县",
          "value": 1788
        },
        {

          "text": "信阳市平桥区","abbreviated":"平桥区",
          "value": 4687
        },
        {

          "text": "信阳市浉河区","abbreviated":"浉河区",
          "value": 4688
        },
        {

          "text": "信阳市","abbreviated":"信阳市",
          "value": 1783
        },
        {

          "text": "潢川县","abbreviated":"潢川县",
          "value": 1784
        },
        {

          "text": "淮滨县","abbreviated":"淮滨县",
          "value": 1785
        },
        {

          "text": "息县","abbreviated":"息县",
          "value": 1786
        },
        {

          "text": "新县","abbreviated":"新县",
          "value": 1787
        },
        {

          "text": "固始县","abbreviated":"固始县",
          "value": 1789
        },
        {

          "text": "罗山县","abbreviated":"罗山县",
          "value": 1790
        },
        {

          "text": "光山县","abbreviated":"光山县",
          "value": 1791
        }
      ],
      [
        {

          "text": "沈丘县","abbreviated":"沈丘县",
          "value": 1801
        },
        {

          "text": "周口市川汇区","abbreviated":"川汇区",
          "value": 4695
        },
        {

          "text": "周口市","abbreviated":"周口市",
          "value": 1793
        },
        {

          "text": "项城市","abbreviated":"项城市",
          "value": 1794
        },
        {

          "text": "商水县","abbreviated":"商水县",
          "value": 1795
        },
        {

          "text": "淮阳县","abbreviated":"淮阳县",
          "value": 1796
        },
        {

          "text": "太康县","abbreviated":"太康县",
          "value": 1797
        },
        {

          "text": "鹿邑县","abbreviated":"鹿邑县",
          "value": 1798
        },
        {

          "text": "西华县","abbreviated":"西华县",
          "value": 1799
        },
        {

          "text": "扶沟县","abbreviated":"扶沟县",
          "value": 1800
        },
        {

          "text": "郸城县","abbreviated":"郸城县",
          "value": 1802
        }
      ],
      [
        {

          "text": "驻马店市驿城区","abbreviated":"驿城区",
          "value": 4414
        },
        {

          "text": "驻马店市","abbreviated":"驻马店市",
          "value": 1804
        },
        {

          "text": "确山县","abbreviated":"确山县",
          "value": 1805
        },
        {

          "text": "新蔡县","abbreviated":"新蔡县",
          "value": 1806
        },
        {

          "text": "上蔡县","abbreviated":"上蔡县",
          "value": 1807
        },
        {

          "text": "西平县","abbreviated":"西平县",
          "value": 1808
        },
        {

          "text": "泌阳县","abbreviated":"泌阳县",
          "value": 1809
        },
        {

          "text": "平舆县","abbreviated":"平舆县",
          "value": 1810
        },
        {

          "text": "汝南县","abbreviated":"汝南县",
          "value": 1811
        },
        {

          "text": "遂平县","abbreviated":"遂平县",
          "value": 1812
        },
        {

          "text": "正阳县","abbreviated":"正阳县",
          "value": 1813
        }
      ],
      [
        {

          "text": "济源市","abbreviated":"济源市",
          "value": 1815
        }
      ]
    ],
    [
      [
        {

          "text": "武汉市江岸区","abbreviated":"江岸区",
          "value": 4423
        },
        {

          "text": "武汉市蔡甸区","abbreviated":"蔡甸区",
          "value": 4769
        },
        {

          "text": "武汉市东西湖区","abbreviated":"东西湖区",
          "value": 4770
        },
        {

          "text": "武汉市汉南区","abbreviated":"汉南区",
          "value": 4771
        },
        {

          "text": "武汉市汉阳区","abbreviated":"汉阳区",
          "value": 4772
        },
        {

          "text": "武汉市洪山区","abbreviated":"洪山区",
          "value": 4773
        },
        {

          "text": "武汉市黄陂区","abbreviated":"黄陂区",
          "value": 4774
        },
        {

          "text": "武汉市江汉区","abbreviated":"江汉区",
          "value": 4775
        },
        {

          "text": "武汉市江夏区","abbreviated":"江夏区",
          "value": 4776
        },
        {

          "text": "武汉市硚口区","abbreviated":"硚口区",
          "value": 4777
        },
        {

          "text": "武汉市青山区","abbreviated":"青山区",
          "value": 4778
        },
        {

          "text": "武汉市武昌区","abbreviated":"武昌区",
          "value": 4779
        },
        {

          "text": "武汉市新洲区","abbreviated":"新洲区",
          "value": 4780
        },
        {

          "text": "武汉市","abbreviated":"武汉市",
          "value": 1910
        }
      ],
      [
        {

          "text": "黄石市铁山区","abbreviated":"铁山区",
          "value": 4421
        },
        {

          "text": "黄石市黄石港区","abbreviated":"黄石港区",
          "value": 4759
        },
        {

          "text": "黄石市西塞山区","abbreviated":"西塞山区",
          "value": 4760
        },
        {

          "text": "黄石市下陆区","abbreviated":"下陆区",
          "value": 4761
        },
        {

          "text": "黄石市","abbreviated":"黄石市",
          "value": 1912
        },
        {

          "text": "大冶市","abbreviated":"大冶市",
          "value": 1913
        },
        {

          "text": "阳新县","abbreviated":"阳新县",
          "value": 1914
        }
      ],
      [
        {

          "text": "南漳县","abbreviated":"南漳县",
          "value": 1920
        },
        {

          "text": "襄樊市樊城区","abbreviated":"樊城区",
          "value": 4424
        },
        {

          "text": "襄樊市襄城区","abbreviated":"襄城区",
          "value": 4782
        },
        {

          "text": "襄阳市襄州区","abbreviated":"襄州区",
          "value": 4783
        },
        {

          "text": "襄阳市","abbreviated":"襄阳市",
          "value": 1916
        },
        {

          "text": "老河口市","abbreviated":"老河口市",
          "value": 1917
        },
        {

          "text": "枣阳市","abbreviated":"枣阳市",
          "value": 1918
        },
        {

          "text": "宜城市","abbreviated":"宜城市",
          "value": 1919
        },
        {

          "text": "谷城县","abbreviated":"谷城县",
          "value": 1921
        },
        {

          "text": "保康县","abbreviated":"保康县",
          "value": 1922
        },
        {

          "text": "高新开发区","abbreviated":"高新开发区",
          "value": 4919
        },
        {

          "text": "鱼梁洲开发区","abbreviated":"鱼梁洲开发区",
          "value": 4920
        },
        {

          "text": "隆中风景区","abbreviated":"隆中风景区",
          "value": 4921
        }
      ],
      [
        {

          "text": "十堰市张湾区","abbreviated":"张湾区",
          "value": 4422
        },
        {

          "text": "十堰市茅箭区","abbreviated":"茅箭区",
          "value": 4767
        },
        {

          "text": "十堰市","abbreviated":"十堰市",
          "value": 1924
        },
        {

          "text": "丹江口市","abbreviated":"丹江口市",
          "value": 1925
        },
        {

          "text": "郧县","abbreviated":"郧县",
          "value": 1926
        },
        {

          "text": "竹山县","abbreviated":"竹山县",
          "value": 1927
        },
        {

          "text": "房县","abbreviated":"房县",
          "value": 1928
        },
        {

          "text": "郧西县","abbreviated":"郧西县",
          "value": 1929
        },
        {

          "text": "竹溪县","abbreviated":"竹溪县",
          "value": 1930
        }
      ],
      [
        {

          "text": "洪湖市","abbreviated":"洪湖市",
          "value": 1933
        },
        {

          "text": "荆州市荆州区","abbreviated":"荆州区",
          "value": 4764
        },
        {

          "text": "荆州市沙市区","abbreviated":"沙市区",
          "value": 4765
        },
        {

          "text": "荆州市","abbreviated":"荆州市",
          "value": 1932
        },
        {

          "text": "石首市","abbreviated":"石首市",
          "value": 1934
        },
        {

          "text": "松滋市","abbreviated":"松滋市",
          "value": 1935
        },
        {

          "text": "监利县","abbreviated":"监利县",
          "value": 1936
        },
        {

          "text": "公安县","abbreviated":"公安县",
          "value": 1937
        },
        {

          "text": "江陵县","abbreviated":"江陵县",
          "value": 1938
        }
      ],
      [
        {

          "text": "宜昌市点军区","abbreviated":"点军区",
          "value": 4785
        },
        {

          "text": "宜昌市伍家岗区","abbreviated":"伍家岗区",
          "value": 4786
        },
        {

          "text": "宜昌市西陵区","abbreviated":"西陵区",
          "value": 4787
        },
        {

          "text": "宜昌市猇亭区","abbreviated":"猇亭区",
          "value": 4788
        },
        {

          "text": "宜昌市夷陵区","abbreviated":"夷陵区",
          "value": 4789
        },
        {

          "text": "宜昌市","abbreviated":"宜昌市",
          "value": 1940
        },
        {

          "text": "宜都市","abbreviated":"宜都市",
          "value": 1941
        },
        {

          "text": "当阳市","abbreviated":"当阳市",
          "value": 1942
        },
        {

          "text": "枝江市","abbreviated":"枝江市",
          "value": 1943
        },
        {

          "text": "秭归县","abbreviated":"秭归县",
          "value": 1944
        },
        {

          "text": "远安县","abbreviated":"远安县",
          "value": 1945
        },
        {

          "text": "兴山县","abbreviated":"兴山县",
          "value": 1946
        },
        {

          "text": "五峰土家族自治县","abbreviated":"五峰土家族自治县",
          "value": 1947
        },
        {

          "text": "长阳土家族自治县","abbreviated":"长阳土家族自治县",
          "value": 1948
        }
      ],
      [
        {

          "text": "荆门市东宝区","abbreviated":"东宝区",
          "value": 4762
        },
        {

          "text": "荆门市掇刀区","abbreviated":"掇刀区",
          "value": 4763
        },
        {

          "text": "荆门市","abbreviated":"荆门市",
          "value": 1950
        },
        {

          "text": "钟祥市","abbreviated":"钟祥市",
          "value": 1951
        },
        {

          "text": "京山县","abbreviated":"京山县",
          "value": 1952
        },
        {

          "text": "沙洋县","abbreviated":"沙洋县",
          "value": 1953
        }
      ],
      [
        {

          "text": "鄂州市鄂城区","abbreviated":"鄂城区",
          "value": 4755
        },
        {

          "text": "鄂州市华容区","abbreviated":"华容区",
          "value": 4756
        },
        {

          "text": "鄂州市梁子湖区","abbreviated":"梁子湖区",
          "value": 4757
        },
        {

          "text": "鄂州市","abbreviated":"鄂州市",
          "value": 1955
        }
      ],
      [
        {

          "text": "孝感市孝南区","abbreviated":"孝南区",
          "value": 4784
        },
        {

          "text": "孝感市","abbreviated":"孝感市",
          "value": 1957
        },
        {

          "text": "应城市","abbreviated":"应城市",
          "value": 1958
        },
        {

          "text": "安陆市","abbreviated":"安陆市",
          "value": 1959
        },
        {

          "text": "汉川市","abbreviated":"汉川市",
          "value": 1960
        },
        {

          "text": "云梦县","abbreviated":"云梦县",
          "value": 1961
        },
        {

          "text": "大悟县","abbreviated":"大悟县",
          "value": 1962
        },
        {

          "text": "孝昌县","abbreviated":"孝昌县",
          "value": 1963
        }
      ],
      [
        {

          "text": "黄冈市黄州区","abbreviated":"黄州区",
          "value": 4758
        },
        {

          "text": "黄冈市","abbreviated":"黄冈市",
          "value": 1965
        },
        {

          "text": "麻城市","abbreviated":"麻城市",
          "value": 1966
        },
        {

          "text": "武穴市","abbreviated":"武穴市",
          "value": 1967
        },
        {

          "text": "红安县","abbreviated":"红安县",
          "value": 1968
        },
        {

          "text": "罗田县","abbreviated":"罗田县",
          "value": 1969
        },
        {

          "text": "浠水县","abbreviated":"浠水县",
          "value": 1970
        },
        {

          "text": "蕲春县","abbreviated":"蕲春县",
          "value": 1971
        },
        {

          "text": "黄梅县","abbreviated":"黄梅县",
          "value": 1972
        },
        {

          "text": "英山县","abbreviated":"英山县",
          "value": 1973
        },
        {

          "text": "团风县","abbreviated":"团风县",
          "value": 1974
        }
      ],
      [
        {

          "text": "咸宁市咸安区","abbreviated":"咸安区",
          "value": 4781
        },
        {

          "text": "咸宁市","abbreviated":"咸宁市",
          "value": 1976
        },
        {

          "text": "赤壁市","abbreviated":"赤壁市",
          "value": 1977
        },
        {

          "text": "嘉鱼县","abbreviated":"嘉鱼县",
          "value": 1978
        },
        {

          "text": "通山县","abbreviated":"通山县",
          "value": 1979
        },
        {

          "text": "崇阳县","abbreviated":"崇阳县",
          "value": 1980
        },
        {

          "text": "通城县","abbreviated":"通城县",
          "value": 1981
        }
      ],
      [
        {

          "text": "随州市","abbreviated":"随州市",
          "value": 1983
        },
        {

          "text": "随州市曾都区","abbreviated":"曾都区",
          "value": 4768
        },
        {

          "text": "广水市","abbreviated":"广水市",
          "value": 1984
        },
        {

          "text": "随县","abbreviated":"随县",
          "value": 4910
        }
      ],
      [
        {

          "text": "仙桃市","abbreviated":"仙桃市",
          "value": 1986
        }
      ],
      [
        {

          "text": "天门市","abbreviated":"天门市",
          "value": 1988
        }
      ],
      [
        {

          "text": "潜江市","abbreviated":"潜江市",
          "value": 1990
        }
      ],
      [
        {

          "text": "神农架林区","abbreviated":"神农架林区",
          "value": 4766
        },
        {

          "text": "神农架林区","abbreviated":"神农架林区",
          "value": 1992
        }
      ],
      [
        {

          "text": "建始县","abbreviated":"建始县",
          "value": 1996
        },
        {

          "text": "恩施市","abbreviated":"恩施市",
          "value": 1994
        },
        {

          "text": "利川市","abbreviated":"利川市",
          "value": 1995
        },
        {

          "text": "来凤县","abbreviated":"来凤县",
          "value": 1997
        },
        {

          "text": "巴东县","abbreviated":"巴东县",
          "value": 1998
        },
        {

          "text": "鹤峰县","abbreviated":"鹤峰县",
          "value": 1999
        },
        {

          "text": "宣恩县","abbreviated":"宣恩县",
          "value": 2000
        },
        {

          "text": "咸丰县","abbreviated":"咸丰县",
          "value": 2001
        }
      ]
    ],
    [
      [
        {

          "text": "宁乡县","abbreviated":"宁乡县",
          "value": 2008
        },
        {

          "text": "长沙市芙蓉区","abbreviated":"芙蓉区",
          "value": 4425
        },
        {

          "text": "长沙市开福区","abbreviated":"开福区",
          "value": 4790
        },
        {

          "text": "长沙市天心区","abbreviated":"天心区",
          "value": 4791
        },
        {

          "text": "长沙市雨花区","abbreviated":"雨花区",
          "value": 4792
        },
        {

          "text": "长沙市岳麓区","abbreviated":"岳麓区",
          "value": 4793
        },
        {

          "text": "长沙市","abbreviated":"长沙市",
          "value": 2004
        },
        {

          "text": "浏阳市","abbreviated":"浏阳市",
          "value": 2005
        },
        {

          "text": "长沙县","abbreviated":"长沙县",
          "value": 2006
        },
        {

          "text": "望城县","abbreviated":"望城县",
          "value": 2007
        }
      ],
      [
        {

          "text": "株洲市天元区","abbreviated":"天元区",
          "value": 4429
        },
        {

          "text": "株洲市荷塘区","abbreviated":"荷塘区",
          "value": 4816
        },
        {

          "text": "株洲市芦淞区","abbreviated":"芦淞区",
          "value": 4817
        },
        {

          "text": "株洲市石峰区","abbreviated":"石峰区",
          "value": 4818
        },
        {

          "text": "株洲市","abbreviated":"株洲市",
          "value": 2010
        },
        {

          "text": "醴陵市","abbreviated":"醴陵市",
          "value": 2011
        },
        {

          "text": "株洲县","abbreviated":"株洲县",
          "value": 2012
        },
        {

          "text": "炎陵县","abbreviated":"炎陵县",
          "value": 2013
        },
        {

          "text": "茶陵县","abbreviated":"茶陵县",
          "value": 2014
        },
        {

          "text": "攸县","abbreviated":"攸县",
          "value": 2015
        }
      ],
      [
        {

          "text": "湘潭市雨湖区","abbreviated":"雨湖区",
          "value": 4806
        },
        {

          "text": "湘潭市岳塘区","abbreviated":"岳塘区",
          "value": 4807
        },
        {

          "text": "湘潭市","abbreviated":"湘潭市",
          "value": 2017
        },
        {

          "text": "湘乡市","abbreviated":"湘乡市",
          "value": 2018
        },
        {

          "text": "韶山市","abbreviated":"韶山市",
          "value": 2019
        },
        {

          "text": "湘潭县","abbreviated":"湘潭县",
          "value": 2020
        }
      ],
      [
        {

          "text": "衡阳市南岳区","abbreviated":"南岳区",
          "value": 4797
        },
        {

          "text": "衡阳市石鼓区","abbreviated":"石鼓区",
          "value": 4798
        },
        {

          "text": "衡阳市雁峰区","abbreviated":"雁峰区",
          "value": 4799
        },
        {

          "text": "衡阳市蒸湘区","abbreviated":"蒸湘区",
          "value": 4800
        },
        {

          "text": "衡阳市珠晖区","abbreviated":"珠晖区",
          "value": 4801
        },
        {

          "text": "衡阳市","abbreviated":"衡阳市",
          "value": 2022
        },
        {

          "text": "耒阳市","abbreviated":"耒阳市",
          "value": 2023
        },
        {

          "text": "常宁市","abbreviated":"常宁市",
          "value": 2024
        },
        {

          "text": "衡阳县","abbreviated":"衡阳县",
          "value": 2025
        },
        {

          "text": "衡东县","abbreviated":"衡东县",
          "value": 2026
        },
        {

          "text": "衡山县","abbreviated":"衡山县",
          "value": 2027
        },
        {

          "text": "衡南县","abbreviated":"衡南县",
          "value": 2028
        },
        {

          "text": "祁东县","abbreviated":"祁东县",
          "value": 2029
        }
      ],
      [
        {

          "text": "邵阳市北塔区","abbreviated":"北塔区",
          "value": 4427
        },
        {

          "text": "邵阳市大祥区","abbreviated":"大祥区",
          "value": 4804
        },
        {

          "text": "邵阳市双清区","abbreviated":"双清区",
          "value": 4805
        },
        {

          "text": "邵阳市","abbreviated":"邵阳市",
          "value": 2031
        },
        {

          "text": "武冈市","abbreviated":"武冈市",
          "value": 2032
        },
        {

          "text": "邵东县","abbreviated":"邵东县",
          "value": 2033
        },
        {

          "text": "洞口县","abbreviated":"洞口县",
          "value": 2034
        },
        {

          "text": "新邵县","abbreviated":"新邵县",
          "value": 2035
        },
        {

          "text": "绥宁县","abbreviated":"绥宁县",
          "value": 2036
        },
        {

          "text": "新宁县","abbreviated":"新宁县",
          "value": 2037
        },
        {

          "text": "邵阳县","abbreviated":"邵阳县",
          "value": 2038
        },
        {

          "text": "隆回县","abbreviated":"隆回县",
          "value": 2039
        },
        {

          "text": "城步苗族自治县","abbreviated":"城步苗族自治县",
          "value": 2040
        }
      ],
      [
        {

          "text": "汨罗市","abbreviated":"汨罗市",
          "value": 2044
        },
        {

          "text": "岳阳市君山区","abbreviated":"君山区",
          "value": 4428
        },
        {

          "text": "岳阳市岳阳楼区","abbreviated":"岳阳楼区",
          "value": 4812
        },
        {

          "text": "岳阳市云溪区","abbreviated":"云溪区",
          "value": 4813
        },
        {

          "text": "岳阳市","abbreviated":"岳阳市",
          "value": 2042
        },
        {

          "text": "临湘市","abbreviated":"临湘市",
          "value": 2043
        },
        {

          "text": "岳阳县","abbreviated":"岳阳县",
          "value": 2045
        },
        {

          "text": "湘阴县","abbreviated":"湘阴县",
          "value": 2046
        },
        {

          "text": "平江县","abbreviated":"平江县",
          "value": 2047
        },
        {

          "text": "华容县","abbreviated":"华容县",
          "value": 2048
        }
      ],
      [
        {

          "text": "安乡县","abbreviated":"安乡县",
          "value": 2056
        },
        {

          "text": "常德市鼎城区","abbreviated":"鼎城区",
          "value": 4794
        },
        {

          "text": "常德市武陵区","abbreviated":"武陵区",
          "value": 4795
        },
        {

          "text": "常德市","abbreviated":"常德市",
          "value": 2050
        },
        {

          "text": "津市市","abbreviated":"市",
          "value": 2051
        },
        {

          "text": "澧县","abbreviated":"澧县",
          "value": 2052
        },
        {

          "text": "临澧县","abbreviated":"临澧县",
          "value": 2053
        },
        {

          "text": "桃源县","abbreviated":"桃源县",
          "value": 2054
        },
        {

          "text": "汉寿县","abbreviated":"汉寿县",
          "value": 2055
        },
        {

          "text": "石门县","abbreviated":"石门县",
          "value": 2057
        }
      ],
      [
        {

          "text": "张家界市武陵源区","abbreviated":"武陵源区",
          "value": 4814
        },
        {

          "text": "张家界市永定区","abbreviated":"永定区",
          "value": 4815
        },
        {

          "text": "张家界市","abbreviated":"张家界市",
          "value": 2059
        },
        {

          "text": "慈利县","abbreviated":"慈利县",
          "value": 2060
        },
        {

          "text": "桑植县","abbreviated":"桑植县",
          "value": 2061
        }
      ],
      [
        {

          "text": "益阳市赫山区","abbreviated":"赫山区",
          "value": 4808
        },
        {

          "text": "益阳市资阳区","abbreviated":"资阳区",
          "value": 4809
        },
        {

          "text": "益阳市","abbreviated":"益阳市",
          "value": 2063
        },
        {

          "text": "沅江市","abbreviated":"沅江市",
          "value": 2064
        },
        {

          "text": "桃江县","abbreviated":"桃江县",
          "value": 2065
        },
        {

          "text": "南县","abbreviated":"南县",
          "value": 2066
        },
        {

          "text": "安化县","abbreviated":"安化县",
          "value": 2067
        },
        {

          "text": "大通湖管理委员会","abbreviated":"大通湖管理委员会",
          "value": 4916
        },
        {

          "text": "益阳高新区","abbreviated":"益阳高新区",
          "value": 4917
        }
      ],
      [
        {

          "text": "郴州市","abbreviated":"郴州市",
          "value": 2069
        },
        {

          "text": "郴州市苏仙区","abbreviated":"苏仙区",
          "value": 4426
        },
        {

          "text": "郴州市北湖区","abbreviated":"北湖区",
          "value": 4796
        },
        {

          "text": "资兴市","abbreviated":"资兴市",
          "value": 2070
        },
        {

          "text": "宜章县","abbreviated":"宜章县",
          "value": 2071
        },
        {

          "text": "汝城县","abbreviated":"汝城县",
          "value": 2072
        },
        {

          "text": "安仁县","abbreviated":"安仁县",
          "value": 2073
        },
        {

          "text": "嘉禾县","abbreviated":"嘉禾县",
          "value": 2074
        },
        {

          "text": "临武县","abbreviated":"临武县",
          "value": 2075
        },
        {

          "text": "桂东县","abbreviated":"桂东县",
          "value": 2076
        },
        {

          "text": "永兴县","abbreviated":"永兴县",
          "value": 2077
        },
        {

          "text": "桂阳县","abbreviated":"桂阳县",
          "value": 2078
        }
      ],
      [
        {

          "text": "永州市冷水滩区","abbreviated":"冷水滩区",
          "value": 4810
        },
        {

          "text": "永州市零陵区","abbreviated":"零陵区",
          "value": 4811
        },
        {

          "text": "永州市","abbreviated":"永州市",
          "value": 2080
        },
        {

          "text": "祁阳县","abbreviated":"祁阳县",
          "value": 2081
        },
        {

          "text": "蓝山县","abbreviated":"蓝山县",
          "value": 2082
        },
        {

          "text": "宁远县","abbreviated":"宁远县",
          "value": 2083
        },
        {

          "text": "新田县","abbreviated":"新田县",
          "value": 2084
        },
        {

          "text": "东安县","abbreviated":"东安县",
          "value": 2085
        },
        {

          "text": "江永县","abbreviated":"江永县",
          "value": 2086
        },
        {

          "text": "道县","abbreviated":"道县",
          "value": 2087
        },
        {

          "text": "双牌县","abbreviated":"双牌县",
          "value": 2088
        },
        {

          "text": "江华瑶族自治县","abbreviated":"江华瑶族自治县",
          "value": 2089
        }
      ],
      [
        {

          "text": "怀化市鹤城区","abbreviated":"鹤城区",
          "value": 4802
        },
        {

          "text": "怀化市","abbreviated":"怀化市",
          "value": 2091
        },
        {

          "text": "洪江市","abbreviated":"洪江市",
          "value": 2092
        },
        {

          "text": "会同县","abbreviated":"会同县",
          "value": 2093
        },
        {

          "text": "沅陵县","abbreviated":"沅陵县",
          "value": 2094
        },
        {

          "text": "辰溪县","abbreviated":"辰溪县",
          "value": 2095
        },
        {

          "text": "溆浦县","abbreviated":"溆浦县",
          "value": 2096
        },
        {

          "text": "中方县","abbreviated":"中方县",
          "value": 2097
        },
        {

          "text": "新晃侗族自治县","abbreviated":"新晃侗族自治县",
          "value": 2098
        },
        {

          "text": "芷江侗族自治县","abbreviated":"芷江侗族自治县",
          "value": 2099
        },
        {

          "text": "通道侗族自治县","abbreviated":"通道侗族自治县",
          "value": 2100
        },
        {

          "text": "靖州苗族侗族自治县","abbreviated":"靖州苗族侗族自治县",
          "value": 2101
        },
        {

          "text": "麻阳苗族自治县","abbreviated":"麻阳苗族自治县",
          "value": 2102
        }
      ],
      [
        {

          "text": "娄底市娄星区","abbreviated":"娄星区",
          "value": 4803
        },
        {

          "text": "娄底市","abbreviated":"娄底市",
          "value": 2104
        },
        {

          "text": "冷水江市","abbreviated":"冷水江市",
          "value": 2105
        },
        {

          "text": "涟源市","abbreviated":"涟源市",
          "value": 2106
        },
        {

          "text": "新化县","abbreviated":"新化县",
          "value": 2107
        },
        {

          "text": "双峰县","abbreviated":"双峰县",
          "value": 2108
        }
      ],
      [
        {

          "text": "吉首市","abbreviated":"吉首市",
          "value": 2110
        },
        {

          "text": "古丈县","abbreviated":"古丈县",
          "value": 2111
        },
        {

          "text": "龙山县","abbreviated":"龙山县",
          "value": 2112
        },
        {

          "text": "永顺县","abbreviated":"永顺县",
          "value": 2113
        },
        {

          "text": "凤凰县","abbreviated":"凤凰县",
          "value": 2114
        },
        {

          "text": "泸溪县","abbreviated":"泸溪县",
          "value": 2115
        },
        {

          "text": "保靖县","abbreviated":"保靖县",
          "value": 2116
        },
        {

          "text": "花垣县","abbreviated":"花垣县",
          "value": 2117
        }
      ]
    ],
    [
      [
        {

          "text": "云浮市云城区","abbreviated":"云城区",
          "value": 4564
        },
        {

          "text": "云浮市","abbreviated":"云浮市",
          "value": 2723
        },
        {

          "text": "罗定市","abbreviated":"罗定市",
          "value": 2724
        },
        {

          "text": "云安县","abbreviated":"云安县",
          "value": 2725
        },
        {

          "text": "新兴县","abbreviated":"新兴县",
          "value": 2726
        },
        {

          "text": "郁南县","abbreviated":"郁南县",
          "value": 2727
        }
      ],
      [
        {

          "text": "广州市海珠区","abbreviated":"海珠区",
          "value": 4398
        },
        {

          "text": "广州市白云区","abbreviated":"白云区",
          "value": 4532
        },
        {

          "text": "广州市番禺区","abbreviated":"番禺区",
          "value": 4533
        },
        {

          "text": "广州市花都区","abbreviated":"花都区",
          "value": 4534
        },
        {

          "text": "广州市黄埔区","abbreviated":"黄埔区",
          "value": 4535
        },
        {

          "text": "广州市荔湾区","abbreviated":"荔湾区",
          "value": 4536
        },
        {

          "text": "广州市萝岗区","abbreviated":"萝岗区",
          "value": 4537
        },
        {

          "text": "广州市南沙区","abbreviated":"南沙区",
          "value": 4538
        },
        {

          "text": "广州市天河区","abbreviated":"天河区",
          "value": 4539
        },
        {

          "text": "广州市越秀区","abbreviated":"越秀区",
          "value": 4540
        },
        {

          "text": "广州市","abbreviated":"广州市",
          "value": 2616
        },
        {

          "text": "从化市","abbreviated":"从化市",
          "value": 2617
        },
        {

          "text": "广州市增城区","abbreviated":"增城区",
          "value": 2618
        }
      ],
      [
        {

          "text": "深圳市南山区","abbreviated":"南山区",
          "value": 4402
        },
        {

          "text": "深圳市宝安区","abbreviated":"宝安区",
          "value": 4558
        },
        {

          "text": "深圳市福田区","abbreviated":"福田区",
          "value": 4559
        },
        {

          "text": "深圳市龙岗区","abbreviated":"龙岗区",
          "value": 4560
        },
        {

          "text": "深圳市罗湖区","abbreviated":"罗湖区",
          "value": 4561
        },
        {

          "text": "深圳市盐田区","abbreviated":"盐田区",
          "value": 4562
        },
        {

          "text": "深圳市","abbreviated":"深圳市",
          "value": 2620
        },
        {

          "text": "深圳市光明新区","abbreviated":"光明新区",
          "value": 4982
        }
      ],
      [
        {

          "text": "珠海市斗门区","abbreviated":"斗门区",
          "value": 4570
        },
        {

          "text": "珠海市金湾区","abbreviated":"金湾区",
          "value": 4571
        },
        {

          "text": "珠海市香洲区","abbreviated":"香洲区",
          "value": 4572
        },
        {

          "text": "珠海市","abbreviated":"珠海市",
          "value": 2622
        }
      ],
      [
        {

          "text": "汕头市潮南区","abbreviated":"潮南区",
          "value": 4550
        },
        {

          "text": "汕头市潮阳区","abbreviated":"潮阳区",
          "value": 4551
        },
        {

          "text": "汕头市澄海区","abbreviated":"澄海区",
          "value": 4552
        },
        {

          "text": "汕头市濠江区","abbreviated":"濠江区",
          "value": 4553
        },
        {

          "text": "汕头市金平区","abbreviated":"金平区",
          "value": 4554
        },
        {

          "text": "汕头市龙湖区","abbreviated":"龙湖区",
          "value": 4555
        },
        {

          "text": "汕头市","abbreviated":"汕头市",
          "value": 2624
        },
        {

          "text": "南澳县","abbreviated":"南澳县",
          "value": 2627
        }
      ],
      [
        {

          "text": "韶关市武江区","abbreviated":"武江区",
          "value": 4556
        },
        {

          "text": "韶关市浈江区","abbreviated":"浈江区",
          "value": 4557
        },
        {

          "text": "韶关市","abbreviated":"韶关市",
          "value": 2629
        },
        {

          "text": "乐昌市","abbreviated":"乐昌市",
          "value": 2630
        },
        {

          "text": "南雄市","abbreviated":"南雄市",
          "value": 2631
        },
        {

          "text": "仁化县","abbreviated":"仁化县",
          "value": 2632
        },
        {

          "text": "始兴县","abbreviated":"始兴县",
          "value": 2633
        },
        {

          "text": "翁源县","abbreviated":"翁源县",
          "value": 2634
        },
        {

          "text": "韶关市曲江区","abbreviated":"曲江区",
          "value": 2635
        },
        {

          "text": "新丰县","abbreviated":"新丰县",
          "value": 2636
        },
        {

          "text": "乳源瑶族自治县","abbreviated":"乳源瑶族自治县",
          "value": 2637
        }
      ],
      [
        {

          "text": "连平县","abbreviated":"连平县",
          "value": 2643
        },
        {

          "text": "河源市源城区","abbreviated":"源城区",
          "value": 4541
        },
        {

          "text": "河源市","abbreviated":"河源市",
          "value": 2639
        },
        {

          "text": "和平县","abbreviated":"和平县",
          "value": 2640
        },
        {

          "text": "龙川县","abbreviated":"龙川县",
          "value": 2641
        },
        {

          "text": "紫金县","abbreviated":"紫金县",
          "value": 2642
        },
        {

          "text": "东源县","abbreviated":"东源县",
          "value": 2644
        }
      ],
      [
        {

          "text": "梅州市梅江区","abbreviated":"梅江区",
          "value": 4400
        },
        {

          "text": "梅州市","abbreviated":"梅州市",
          "value": 2646
        },
        {

          "text": "兴宁市","abbreviated":"兴宁市",
          "value": 2647
        },
        {

          "text": "梅县","abbreviated":"梅县",
          "value": 2648
        },
        {

          "text": "蕉岭县","abbreviated":"蕉岭县",
          "value": 2649
        },
        {

          "text": "大埔县","abbreviated":"大埔县",
          "value": 2650
        },
        {

          "text": "丰顺县","abbreviated":"丰顺县",
          "value": 2651
        },
        {

          "text": "五华县","abbreviated":"五华县",
          "value": 2652
        },
        {

          "text": "平远县","abbreviated":"平远县",
          "value": 2653
        }
      ],
      [
        {

          "text": "惠州市惠城区","abbreviated":"惠城区",
          "value": 4399
        },
        {

          "text": "惠州市惠阳区","abbreviated":"惠阳区",
          "value": 4542
        },
        {

          "text": "惠州市","abbreviated":"惠州市",
          "value": 2655
        },
        {

          "text": "惠东县","abbreviated":"惠东县",
          "value": 2657
        },
        {

          "text": "博罗县","abbreviated":"博罗县",
          "value": 2658
        },
        {

          "text": "龙门县","abbreviated":"龙门县",
          "value": 2659
        }
      ],
      [
        {

          "text": "汕尾市城区","abbreviated":"城区",
          "value": 4401
        },
        {

          "text": "汕尾市","abbreviated":"汕尾市",
          "value": 2661
        },
        {

          "text": "陆丰市","abbreviated":"陆丰市",
          "value": 2662
        },
        {

          "text": "海丰县","abbreviated":"海丰县",
          "value": 2663
        },
        {

          "text": "陆河县","abbreviated":"陆河县",
          "value": 2664
        }
      ],
      [
        {

          "text": "东莞市","abbreviated":"东莞市",
          "value": 2666
        }
      ],
      [
        {

          "text": "中山市","abbreviated":"中山市",
          "value": 2668
        }
      ],
      [
        {

          "text": "江门市江海区","abbreviated":"江海区",
          "value": 4543
        },
        {

          "text": "江门市蓬江区","abbreviated":"蓬江区",
          "value": 4544
        },
        {

          "text": "江门市新会区","abbreviated":"新会区",
          "value": 4545
        },
        {

          "text": "江门市","abbreviated":"江门市",
          "value": 2670
        },
        {

          "text": "台山市","abbreviated":"台山市",
          "value": 2671
        },
        {

          "text": "开平市","abbreviated":"开平市",
          "value": 2672
        },
        {

          "text": "鹤山市","abbreviated":"鹤山市",
          "value": 2673
        },
        {

          "text": "恩平市","abbreviated":"恩平市",
          "value": 2674
        }
      ],
      [
        {

          "text": "佛山市禅城区","abbreviated":"禅城区",
          "value": 4527
        },
        {

          "text": "佛山市高明区","abbreviated":"高明区",
          "value": 4528
        },
        {

          "text": "佛山市南海区","abbreviated":"南海区",
          "value": 4529
        },
        {

          "text": "佛山市三水区","abbreviated":"三水区",
          "value": 4530
        },
        {

          "text": "佛山市顺德区","abbreviated":"顺德区",
          "value": 4531
        },
        {

          "text": "佛山市","abbreviated":"佛山市",
          "value": 2676
        }
      ],
      [
        {

          "text": "阳江市江城区","abbreviated":"江城区",
          "value": 4563
        },
        {

          "text": "阳江市","abbreviated":"阳江市",
          "value": 2678
        },
        {

          "text": "阳春市","abbreviated":"阳春市",
          "value": 2679
        },
        {

          "text": "阳西县","abbreviated":"阳西县",
          "value": 2680
        },
        {

          "text": "阳东县","abbreviated":"阳东县",
          "value": 2681
        }
      ],
      [
        {

          "text": "湛江市赤坎区","abbreviated":"赤坎区",
          "value": 4565
        },
        {

          "text": "湛江市麻章区","abbreviated":"麻章区",
          "value": 4566
        },
        {

          "text": "湛江市坡头区","abbreviated":"坡头区",
          "value": 4567
        },
        {

          "text": "湛江市霞山区","abbreviated":"霞山区",
          "value": 4568
        },
        {

          "text": "湛江市","abbreviated":"湛江市",
          "value": 2683
        },
        {

          "text": "廉江市","abbreviated":"廉江市",
          "value": 2684
        },
        {

          "text": "雷州市","abbreviated":"雷州市",
          "value": 2685
        },
        {

          "text": "吴川市","abbreviated":"吴川市",
          "value": 2686
        },
        {

          "text": "遂溪县","abbreviated":"遂溪县",
          "value": 2687
        },
        {

          "text": "徐闻县","abbreviated":"徐闻县",
          "value": 2688
        }
      ],
      [
        {

          "text": "茂名市茂港区","abbreviated":"茂港区",
          "value": 4547
        },
        {

          "text": "茂名市茂南区","abbreviated":"茂南区",
          "value": 4548
        },
        {

          "text": "茂名市","abbreviated":"茂名市",
          "value": 2690
        },
        {

          "text": "高州市","abbreviated":"高州市",
          "value": 2691
        },
        {

          "text": "化州市","abbreviated":"化州市",
          "value": 2692
        },
        {

          "text": "信宜市","abbreviated":"信宜市",
          "value": 2693
        },
        {

          "text": "电白县","abbreviated":"电白县",
          "value": 2694
        }
      ],
      [
        {

          "text": "肇庆市鼎湖区","abbreviated":"鼎湖区",
          "value": 4403
        },
        {

          "text": "肇庆市端州区","abbreviated":"端州区",
          "value": 4569
        },
        {

          "text": "肇庆市","abbreviated":"肇庆市",
          "value": 2696
        },
        {

          "text": "高要市","abbreviated":"高要市",
          "value": 2697
        },
        {

          "text": "四会市","abbreviated":"四会市",
          "value": 2698
        },
        {

          "text": "广宁县","abbreviated":"广宁县",
          "value": 2699
        },
        {

          "text": "德庆县","abbreviated":"德庆县",
          "value": 2700
        },
        {

          "text": "封开县","abbreviated":"封开县",
          "value": 2701
        },
        {

          "text": "怀集县","abbreviated":"怀集县",
          "value": 2702
        }
      ],
      [
        {

          "text": "清远市清城区","abbreviated":"清城区",
          "value": 4549
        },
        {

          "text": "清远市","abbreviated":"清远市",
          "value": 2704
        },
        {

          "text": "英德市","abbreviated":"英德市",
          "value": 2705
        },
        {

          "text": "连州市","abbreviated":"连州市",
          "value": 2706
        },
        {

          "text": "佛冈县","abbreviated":"佛冈县",
          "value": 2707
        },
        {

          "text": "阳山县","abbreviated":"阳山县",
          "value": 2708
        },
        {

          "text": "清新县","abbreviated":"清新县",
          "value": 2709
        },
        {

          "text": "连山壮族瑶族自治县","abbreviated":"连山壮族瑶族自治县",
          "value": 2710
        },
        {

          "text": "连南瑶族自治县","abbreviated":"连南瑶族自治县",
          "value": 2711
        }
      ],
      [
        {

          "text": "潮州市湘桥区","abbreviated":"湘桥区",
          "value": 4397
        },
        {

          "text": "潮州市","abbreviated":"潮州市",
          "value": 2713
        },
        {

          "text": "潮州市潮安区","abbreviated":"潮安区",
          "value": 2714
        },
        {

          "text": "饶平县","abbreviated":"饶平县",
          "value": 2715
        }
      ],
      [
        {

          "text": "揭阳市榕城区","abbreviated":"榕城区",
          "value": 4546
        },
        {

          "text": "揭阳市","abbreviated":"揭阳市",
          "value": 2717
        },
        {

          "text": "普宁市","abbreviated":"普宁市",
          "value": 2718
        },
        {

          "text": "揭阳市揭东区","abbreviated":"揭东区",
          "value": 2719
        },
        {

          "text": "揭西县","abbreviated":"揭西县",
          "value": 2720
        },
        {

          "text": "惠来县","abbreviated":"惠来县",
          "value": 2721
        }
      ]
    ],
    [
      [
        {

          "text": "百色市右江区","abbreviated":"右江区",
          "value": 4573
        },
        {

          "text": "百色市","abbreviated":"百色市",
          "value": 1338
        },
        {

          "text": "凌云县","abbreviated":"凌云县",
          "value": 1339
        },
        {

          "text": "平果县","abbreviated":"平果县",
          "value": 1340
        },
        {

          "text": "西林县","abbreviated":"西林县",
          "value": 1341
        },
        {

          "text": "乐业县","abbreviated":"乐业县",
          "value": 1342
        },
        {

          "text": "德保县","abbreviated":"德保县",
          "value": 1343
        },
        {

          "text": "田林县","abbreviated":"田林县",
          "value": 1344
        },
        {

          "text": "田阳县","abbreviated":"田阳县",
          "value": 1345
        },
        {

          "text": "靖西县","abbreviated":"靖西县",
          "value": 1346
        },
        {

          "text": "田东县","abbreviated":"田东县",
          "value": 1347
        },
        {

          "text": "那坡县","abbreviated":"那坡县",
          "value": 1348
        },
        {

          "text": "隆林各族自治县","abbreviated":"隆林各族自治县",
          "value": 1349
        }
      ],
      [
        {

          "text": "南宁市江南区","abbreviated":"江南区",
          "value": 4592
        },
        {

          "text": "南宁市良庆区","abbreviated":"良庆区",
          "value": 4593
        },
        {

          "text": "南宁市青秀区","abbreviated":"青秀区",
          "value": 4594
        },
        {

          "text": "南宁市西乡塘区","abbreviated":"西乡塘区",
          "value": 4595
        },
        {

          "text": "南宁市兴宁区","abbreviated":"兴宁区",
          "value": 4596
        },
        {

          "text": "南宁市长洲区","abbreviated":"长洲区",
          "value": 4598
        },
        {

          "text": "南宁市蝶山区","abbreviated":"蝶山区",
          "value": 4599
        },
        {

          "text": "南宁市万秀区","abbreviated":"万秀区",
          "value": 4600
        },
        {

          "text": "南宁市","abbreviated":"南宁市",
          "value": 1279
        },
        {

          "text": "南宁市邕宁区","abbreviated":"邕宁区",
          "value": 1280
        },
        {

          "text": "武鸣县","abbreviated":"武鸣县",
          "value": 1281
        },
        {

          "text": "隆安县","abbreviated":"隆安县",
          "value": 1282
        },
        {

          "text": "马山县","abbreviated":"马山县",
          "value": 1283
        },
        {

          "text": "上林县","abbreviated":"上林县",
          "value": 1284
        },
        {

          "text": "宾阳县","abbreviated":"宾阳县",
          "value": 1285
        },
        {

          "text": "横县","abbreviated":"横县",
          "value": 1286
        }
      ],
      [
        {

          "text": "柳州市柳南区","abbreviated":"柳南区",
          "value": 4406
        },
        {

          "text": "柳州市城中区","abbreviated":"城中区",
          "value": 4589
        },
        {

          "text": "柳州市柳北区","abbreviated":"柳北区",
          "value": 4590
        },
        {

          "text": "柳州市鱼峰区","abbreviated":"鱼峰区",
          "value": 4591
        },
        {

          "text": "柳州市","abbreviated":"柳州市",
          "value": 1288
        },
        {

          "text": "柳江县","abbreviated":"柳江县",
          "value": 1289
        },
        {

          "text": "柳城县","abbreviated":"柳城县",
          "value": 1290
        },
        {

          "text": "鹿寨县","abbreviated":"鹿寨县",
          "value": 1291
        },
        {

          "text": "融安县","abbreviated":"融安县",
          "value": 1292
        },
        {

          "text": "融水苗族自治县","abbreviated":"融水苗族自治县",
          "value": 1293
        },
        {

          "text": "三江侗族自治县","abbreviated":"三江侗族自治县",
          "value": 1294
        }
      ],
      [
        {

          "text": "桂林市象山区","abbreviated":"象山区",
          "value": 4405
        },
        {

          "text": "桂林市叠彩区","abbreviated":"叠彩区",
          "value": 4582
        },
        {

          "text": "桂林市七星区","abbreviated":"七星区",
          "value": 4583
        },
        {

          "text": "桂林市秀峰区","abbreviated":"秀峰区",
          "value": 4584
        },
        {

          "text": "桂林市雁山区","abbreviated":"雁山区",
          "value": 4585
        },
        {

          "text": "桂林市","abbreviated":"桂林市",
          "value": 1296
        },
        {

          "text": "阳朔县","abbreviated":"阳朔县",
          "value": 1297
        },
        {

          "text": "临桂县","abbreviated":"临桂县",
          "value": 1298
        },
        {

          "text": "灵川县","abbreviated":"灵川县",
          "value": 1299
        },
        {

          "text": "全州县","abbreviated":"全州县",
          "value": 1300
        },
        {

          "text": "平乐县","abbreviated":"平乐县",
          "value": 1301
        },
        {

          "text": "兴安县","abbreviated":"兴安县",
          "value": 1302
        },
        {

          "text": "灌阳县","abbreviated":"灌阳县",
          "value": 1303
        },
        {

          "text": "荔浦县","abbreviated":"荔浦县",
          "value": 1304
        },
        {

          "text": "资源县","abbreviated":"资源县",
          "value": 1305
        },
        {

          "text": "永福县","abbreviated":"永福县",
          "value": 1306
        },
        {

          "text": "龙胜各族自治县","abbreviated":"龙胜各族自治县",
          "value": 1307
        },
        {

          "text": "恭城瑶族自治县","abbreviated":"恭城瑶族自治县",
          "value": 1308
        }
      ],
      [
        {

          "text": "藤县","abbreviated":"藤县",
          "value": 1313
        },
        {

          "text": "梧州市","abbreviated":"梧州市",
          "value": 1310
        },
        {

          "text": "岑溪市","abbreviated":"岑溪市",
          "value": 1311
        },
        {

          "text": "苍梧县","abbreviated":"苍梧县",
          "value": 1312
        },
        {

          "text": "蒙山县","abbreviated":"蒙山县",
          "value": 1314
        },
        {

          "text": "梧州市龙圩区","abbreviated":"龙圩区",
          "value": 4993
        }
      ],
      [
        {

          "text": "北海市海城区","abbreviated":"海城区",
          "value": 4574
        },
        {

          "text": "北海市铁山港区","abbreviated":"铁山港区",
          "value": 4575
        },
        {

          "text": "北海市银海区","abbreviated":"银海区",
          "value": 4576
        },
        {

          "text": "北海市","abbreviated":"北海市",
          "value": 1316
        },
        {

          "text": "合浦县","abbreviated":"合浦县",
          "value": 1317
        }
      ],
      [
        {

          "text": "防城港市防城区","abbreviated":"防城区",
          "value": 4577
        },
        {

          "text": "防城港市港口区","abbreviated":"港口区",
          "value": 4578
        },
        {

          "text": "防城港市","abbreviated":"防城港市",
          "value": 1319
        },
        {

          "text": "东兴市","abbreviated":"东兴市",
          "value": 1320
        },
        {

          "text": "上思县","abbreviated":"上思县",
          "value": 1321
        }
      ],
      [
        {

          "text": "浦北县","abbreviated":"浦北县",
          "value": 1325
        },
        {

          "text": "钦州市","abbreviated":"钦州市",
          "value": 1323
        },
        {

          "text": "灵山县","abbreviated":"灵山县",
          "value": 1324
        },
        {

          "text": "钦州市钦南区","abbreviated":"钦南区",
          "value": 4960
        },
        {

          "text": "钦州市钦北区","abbreviated":"钦北区",
          "value": 4961
        }
      ],
      [
        {

          "text": "贵港市港北区","abbreviated":"港北区",
          "value": 4579
        },
        {

          "text": "贵港市港南区","abbreviated":"港南区",
          "value": 4580
        },
        {

          "text": "贵港市覃塘区","abbreviated":"覃塘区",
          "value": 4581
        },
        {

          "text": "贵港市","abbreviated":"贵港市",
          "value": 1327
        },
        {

          "text": "桂平市","abbreviated":"桂平市",
          "value": 1328
        },
        {

          "text": "平南县","abbreviated":"平南县",
          "value": 1329
        }
      ],
      [
        {

          "text": "玉林市","abbreviated":"玉林市",
          "value": 1331
        },
        {

          "text": "北流市","abbreviated":"北流市",
          "value": 1332
        },
        {

          "text": "容县","abbreviated":"容县",
          "value": 1333
        },
        {

          "text": "陆川县","abbreviated":"陆川县",
          "value": 1334
        },
        {

          "text": "博白县","abbreviated":"博白县",
          "value": 1335
        },
        {

          "text": "兴业县","abbreviated":"兴业县",
          "value": 1336
        },
        {

          "text": "玉林市玉州区","abbreviated":"玉州区",
          "value": 4980
        },
        {

          "text": "玉林市福绵区","abbreviated":"福绵区",
          "value": 4994
        }
      ],
      [
        {

          "text": "贺州市八步区","abbreviated":"八步区",
          "value": 4587
        },
        {

          "text": "贺州市","abbreviated":"贺州市",
          "value": 1351
        },
        {

          "text": "钟山县","abbreviated":"钟山县",
          "value": 1352
        },
        {

          "text": "昭平县","abbreviated":"昭平县",
          "value": 1353
        },
        {

          "text": "富川瑶族自治县","abbreviated":"富川瑶族自治县",
          "value": 1354
        }
      ],
      [
        {

          "text": "河池市金城江区","abbreviated":"金城江区",
          "value": 4586
        },
        {

          "text": "河池市","abbreviated":"河池市",
          "value": 1356
        },
        {

          "text": "宜州市","abbreviated":"宜州市",
          "value": 1357
        },
        {

          "text": "天峨县","abbreviated":"天峨县",
          "value": 1358
        },
        {

          "text": "凤山县","abbreviated":"凤山县",
          "value": 1359
        },
        {

          "text": "南丹县","abbreviated":"南丹县",
          "value": 1360
        },
        {

          "text": "东兰县","abbreviated":"东兰县",
          "value": 1361
        },
        {

          "text": "都安瑶族自治县","abbreviated":"都安瑶族自治县",
          "value": 1362
        },
        {

          "text": "罗城仫佬族自治县","abbreviated":"罗城仫佬族自治县",
          "value": 1363
        },
        {

          "text": "巴马瑶族自治县","abbreviated":"巴马瑶族自治县",
          "value": 1364
        },
        {

          "text": "环江毛南族自治县","abbreviated":"环江毛南族自治县",
          "value": 1365
        },
        {

          "text": "大化瑶族自治县","abbreviated":"大化瑶族自治县",
          "value": 1366
        }
      ],
      [
        {

          "text": "来宾市兴宾区","abbreviated":"兴宾区",
          "value": 4588
        },
        {

          "text": "来宾市","abbreviated":"来宾市",
          "value": 1368
        },
        {

          "text": "合山市","abbreviated":"合山市",
          "value": 1369
        },
        {

          "text": "象州县","abbreviated":"象州县",
          "value": 1370
        },
        {

          "text": "武宣县","abbreviated":"武宣县",
          "value": 1371
        },
        {

          "text": "忻城县","abbreviated":"忻城县",
          "value": 1372
        },
        {

          "text": "金秀瑶族自治县","abbreviated":"金秀瑶族自治县",
          "value": 1373
        }
      ],
      [
        {

          "text": "崇左市江洲区","abbreviated":"江洲区",
          "value": 4404
        },
        {

          "text": "崇左市","abbreviated":"崇左市",
          "value": 1375
        },
        {

          "text": "凭祥市","abbreviated":"凭祥市",
          "value": 1376
        },
        {

          "text": "扶绥县","abbreviated":"扶绥县",
          "value": 1377
        },
        {

          "text": "大新县","abbreviated":"大新县",
          "value": 1378
        },
        {

          "text": "天等县","abbreviated":"天等县",
          "value": 1379
        },
        {

          "text": "宁明县","abbreviated":"宁明县",
          "value": 1380
        },
        {

          "text": "龙州县","abbreviated":"龙州县",
          "value": 1381
        }
      ]
    ],
    [
      [
        {

          "text": "保亭黎族苗族自治县","abbreviated":"保亭黎族苗族自治县",
          "value": 1508
        }
      ],
      [
        {

          "text": "南沙群岛","abbreviated":"南沙群岛",
          "value": 3706
        }
      ],
      [
        {

          "text": "西沙群岛","abbreviated":"西沙群岛",
          "value": 3708
        }
      ],
      [
        {

          "text": "中沙群岛的岛礁及其海域","abbreviated":"中沙群岛的岛礁及其海域",
          "value": 3780
        }
      ],
      [
        {

          "text": "海口市龙华区","abbreviated":"龙华区",
          "value": 4409
        },
        {

          "text": "海口市美兰区","abbreviated":"美兰区",
          "value": 4613
        },
        {

          "text": "海口市琼山区","abbreviated":"琼山区",
          "value": 4614
        },
        {

          "text": "海口市秀英区","abbreviated":"秀英区",
          "value": 4615
        },
        {

          "text": "海口市","abbreviated":"海口市",
          "value": 1476
        }
      ],
      [
        {

          "text": "三亚市","abbreviated":"三亚市",
          "value": 1478
        },
        {

          "text": "三亚市海棠区","abbreviated":"海棠区",
          "value": 4989
        },
        {

          "text": "三亚市吉阳区","abbreviated":"吉阳区",
          "value": 4990
        },
        {

          "text": "三亚市天涯区","abbreviated":"天涯区",
          "value": 4991
        },
        {

          "text": "三亚市崖州区","abbreviated":"崖州区",
          "value": 4992
        }
      ],
      [
        {

          "text": "五指山市","abbreviated":"五指山市",
          "value": 1480
        }
      ],
      [
        {

          "text": "琼海市","abbreviated":"琼海市",
          "value": 1482
        }
      ],
      [
        {

          "text": "儋州市","abbreviated":"儋州市",
          "value": 1484
        }
      ],
      [
        {

          "text": "文昌市","abbreviated":"文昌市",
          "value": 1486
        }
      ],
      [
        {

          "text": "万宁市","abbreviated":"万宁市",
          "value": 1488
        }
      ],
      [
        {

          "text": "东方市","abbreviated":"东方市",
          "value": 1490
        }
      ],
      [
        {

          "text": "澄迈县","abbreviated":"澄迈县",
          "value": 1492
        }
      ],
      [
        {

          "text": "定安县","abbreviated":"定安县",
          "value": 1494
        }
      ],
      [
        {

          "text": "屯昌县","abbreviated":"屯昌县",
          "value": 1496
        }
      ],
      [
        {

          "text": "临高县","abbreviated":"临高县",
          "value": 1498
        }
      ],
      [
        {

          "text": "白沙黎族自治县","abbreviated":"白沙黎族自治县",
          "value": 1500
        }
      ],
      [
        {

          "text": "昌江黎族自治县","abbreviated":"昌江黎族自治县",
          "value": 1502
        }
      ],
      [
        {

          "text": "乐东黎族自治县","abbreviated":"乐东黎族自治县",
          "value": 1504
        }
      ],
      [
        {

          "text": "陵水黎族自治县","abbreviated":"陵水黎族自治县",
          "value": 1506
        }
      ],
      [
        {

          "text": "琼中黎族苗族自治县","abbreviated":"琼中黎族苗族自治县",
          "value": 1510
        }
      ],
      [
        {

          "text": "西沙群岛","abbreviated":"西沙群岛",
          "value": 4986
        },
        {

          "text": "南沙群岛","abbreviated":"南沙群岛",
          "value": 4987
        },
        {

          "text": "中沙群岛的岛礁及其海域","abbreviated":"中沙群岛的岛礁及其海域",
          "value": 4988
        }
      ]
    ],
    [
      [
        {

          "text": "重庆市","abbreviated":"重庆市",
          "value": 3264
        },
        {

          "text": "重庆市永川区","abbreviated":"永川区",
          "value": 3265
        },
        {

          "text": "重庆市合川区","abbreviated":"合川区",
          "value": 3266
        },
        {

          "text": "重庆市江津区","abbreviated":"江津区",
          "value": 3267
        },
        {

          "text": "重庆市南川区","abbreviated":"南川区",
          "value": 3268
        },
        {

          "text": "綦江县","abbreviated":"綦江县",
          "value": 3269
        },
        {

          "text": "潼南县","abbreviated":"潼南县",
          "value": 3270
        },
        {

          "text": "荣昌县","abbreviated":"荣昌县",
          "value": 3271
        },
        {

          "text": "璧山县","abbreviated":"璧山县",
          "value": 3272
        },
        {

          "text": "大足县","abbreviated":"大足县",
          "value": 3273
        },
        {

          "text": "梁平县","abbreviated":"梁平县",
          "value": 3275
        },
        {

          "text": "城口县","abbreviated":"城口县",
          "value": 3276
        },
        {

          "text": "垫江县","abbreviated":"垫江县",
          "value": 3277
        },
        {

          "text": "武隆县","abbreviated":"武隆县",
          "value": 3278
        },
        {

          "text": "丰都县","abbreviated":"丰都县",
          "value": 3279
        },
        {

          "text": "奉节县","abbreviated":"奉节县",
          "value": 3280
        },
        {

          "text": "开县","abbreviated":"开县",
          "value": 3281
        },
        {

          "text": "云阳县","abbreviated":"云阳县",
          "value": 3282
        },
        {

          "text": "忠县","abbreviated":"忠县",
          "value": 3283
        },
        {

          "text": "巫溪县","abbreviated":"巫溪县",
          "value": 3284
        },
        {

          "text": "巫山县","abbreviated":"巫山县",
          "value": 3285
        },
        {

          "text": "石柱土家族自治县","abbreviated":"石柱土家族自治县",
          "value": 3286
        },
        {

          "text": "秀山土家族苗族自治县","abbreviated":"秀山土家族苗族自治县",
          "value": 3287
        },
        {

          "text": "酉阳土家族苗族自治县","abbreviated":"酉阳土家族苗族自治县",
          "value": 3288
        },
        {

          "text": "彭水苗族土家族自治县","abbreviated":"彭水苗族土家族自治县",
          "value": 3289
        },
        {

          "text": "铜梁县","abbreviated":"铜梁县",
          "value": 3274
        },
        {

          "text": "重庆市巴南区","abbreviated":"巴南区",
          "value": 4351
        },
        {

          "text": "重庆市北碚区","abbreviated":"北碚区",
          "value": 4352
        },
        {

          "text": "重庆市长寿区","abbreviated":"长寿区",
          "value": 4353
        },
        {

          "text": "重庆市大渡口区","abbreviated":"大渡口区",
          "value": 4354
        },
        {

          "text": "重庆市涪陵区","abbreviated":"涪陵区",
          "value": 4355
        },
        {

          "text": "重庆市江北区","abbreviated":"江北区",
          "value": 4356
        },
        {

          "text": "重庆市九龙坡区","abbreviated":"九龙坡区",
          "value": 4357
        },
        {

          "text": "重庆市南岸区","abbreviated":"南岸区",
          "value": 4358
        },
        {

          "text": "重庆市黔江区","abbreviated":"黔江区",
          "value": 4359
        },
        {

          "text": "重庆市沙坪坝区","abbreviated":"沙坪坝区",
          "value": 4360
        },
        {

          "text": "重庆市双桥区","abbreviated":"双桥区",
          "value": 4361
        },
        {

          "text": "重庆市万盛区","abbreviated":"万盛区",
          "value": 4362
        },
        {

          "text": "重庆市万州区","abbreviated":"万州区",
          "value": 4363
        },
        {

          "text": "重庆市渝北区","abbreviated":"渝北区",
          "value": 4364
        },
        {

          "text": "重庆市渝中区","abbreviated":"渝中区",
          "value": 4365
        }
      ]
    ],
    [
      [
        {

          "text": "成都市","abbreviated":"成都市",
          "value": 3080
        },
        {

          "text": "都江堰市","abbreviated":"都江堰市",
          "value": 3081
        },
        {

          "text": "彭州市","abbreviated":"彭州市",
          "value": 3082
        },
        {

          "text": "邛崃市","abbreviated":"邛崃市",
          "value": 3083
        },
        {

          "text": "崇州市","abbreviated":"崇州市",
          "value": 3084
        },
        {

          "text": "金堂县","abbreviated":"金堂县",
          "value": 3085
        },
        {

          "text": "郫县","abbreviated":"郫县",
          "value": 3086
        },
        {

          "text": "新津县","abbreviated":"新津县",
          "value": 3087
        },
        {

          "text": "双流县","abbreviated":"双流县",
          "value": 3088
        },
        {

          "text": "蒲江县","abbreviated":"蒲江县",
          "value": 3089
        },
        {

          "text": "大邑县","abbreviated":"大邑县",
          "value": 3090
        },
        {

          "text": "成都市成华区","abbreviated":"成华区",
          "value": 4240
        },
        {

          "text": "成都市金牛区","abbreviated":"金牛区",
          "value": 4241
        },
        {

          "text": "成都市锦江区","abbreviated":"锦江区",
          "value": 4242
        },
        {

          "text": "成都市龙泉驿区","abbreviated":"龙泉驿区",
          "value": 4243
        },
        {

          "text": "成都市青白江区","abbreviated":"青白江区",
          "value": 4244
        },
        {

          "text": "成都市青羊区","abbreviated":"青羊区",
          "value": 4245
        },
        {

          "text": "成都市温江区","abbreviated":"温江区",
          "value": 4246
        },
        {

          "text": "成都市武侯区","abbreviated":"武侯区",
          "value": 4247
        },
        {

          "text": "成都市新都区","abbreviated":"新都区",
          "value": 4248
        },
        {

          "text": "成都市高新区","abbreviated":"高新区",
          "value": 105020
        }
      ],
      [
        {

          "text": "自贡市","abbreviated":"自贡市",
          "value": 3092
        },
        {

          "text": "荣县","abbreviated":"荣县",
          "value": 3093
        },
        {

          "text": "富顺县","abbreviated":"富顺县",
          "value": 3094
        },
        {

          "text": "自贡市大安区","abbreviated":"大安区",
          "value": 4278
        },
        {

          "text": "自贡市贡井区","abbreviated":"贡井区",
          "value": 4279
        },
        {

          "text": "自贡市沿滩区","abbreviated":"沿滩区",
          "value": 4280
        },
        {

          "text": "自贡市自流井区","abbreviated":"自流井区",
          "value": 4281
        }
      ],
      [
        {

          "text": "攀枝花市","abbreviated":"攀枝花市",
          "value": 3096
        },
        {

          "text": "米易县","abbreviated":"米易县",
          "value": 3097
        },
        {

          "text": "盐边县","abbreviated":"盐边县",
          "value": 3098
        },
        {

          "text": "攀枝花市东区","abbreviated":"东区",
          "value": 4270
        },
        {

          "text": "攀枝花市仁和区","abbreviated":"仁和区",
          "value": 4271
        },
        {

          "text": "攀枝花市西区","abbreviated":"西区",
          "value": 4272
        }
      ],
      [
        {

          "text": "泸州市","abbreviated":"泸州市",
          "value": 3100
        },
        {

          "text": "泸县","abbreviated":"泸县",
          "value": 3101
        },
        {

          "text": "合江县","abbreviated":"合江县",
          "value": 3102
        },
        {

          "text": "叙永县","abbreviated":"叙永县",
          "value": 3103
        },
        {

          "text": "古蔺县","abbreviated":"古蔺县",
          "value": 3104
        },
        {

          "text": "泸州市江阳区","abbreviated":"江阳区",
          "value": 4259
        },
        {

          "text": "泸州市龙马潭区","abbreviated":"龙马潭区",
          "value": 4260
        },
        {

          "text": "泸州市纳溪区","abbreviated":"纳溪区",
          "value": 4261
        }
      ],
      [
        {

          "text": "德阳市","abbreviated":"德阳市",
          "value": 3106
        },
        {

          "text": "广汉市","abbreviated":"广汉市",
          "value": 3107
        },
        {

          "text": "什邡市","abbreviated":"什邡市",
          "value": 3108
        },
        {

          "text": "绵竹市","abbreviated":"绵竹市",
          "value": 3109
        },
        {

          "text": "罗江县","abbreviated":"罗江县",
          "value": 3110
        },
        {

          "text": "中江县","abbreviated":"中江县",
          "value": 3111
        },
        {

          "text": "德阳市旌阳区","abbreviated":"旌阳区",
          "value": 4250
        }
      ],
      [
        {

          "text": "绵阳市","abbreviated":"绵阳市",
          "value": 3113
        },
        {

          "text": "江油市","abbreviated":"江油市",
          "value": 3114
        },
        {

          "text": "盐亭县","abbreviated":"盐亭县",
          "value": 3115
        },
        {

          "text": "三台县","abbreviated":"三台县",
          "value": 3116
        },
        {

          "text": "平武县","abbreviated":"平武县",
          "value": 3117
        },
        {

          "text": "北川羌族自治县","abbreviated":"北川羌族自治县",
          "value": 3118
        },
        {

          "text": "安县","abbreviated":"安县",
          "value": 3119
        },
        {

          "text": "梓潼县","abbreviated":"梓潼县",
          "value": 3120
        },
        {

          "text": "绵阳市涪城区","abbreviated":"涪城区",
          "value": 4263
        },
        {

          "text": "绵阳市游仙区","abbreviated":"游仙区",
          "value": 4264
        }
      ],
      [
        {

          "text": "广元市","abbreviated":"广元市",
          "value": 3122
        },
        {

          "text": "青川县","abbreviated":"青川县",
          "value": 3123
        },
        {

          "text": "旺苍县","abbreviated":"旺苍县",
          "value": 3124
        },
        {

          "text": "剑阁县","abbreviated":"剑阁县",
          "value": 3125
        },
        {

          "text": "苍溪县","abbreviated":"苍溪县",
          "value": 3126
        },
        {

          "text": "广元市朝天区","abbreviated":"朝天区",
          "value": 4252
        },
        {

          "text": "广元市利州区","abbreviated":"利州区",
          "value": 4253
        },
        {

          "text": "广元市元坝区","abbreviated":"元坝区",
          "value": 4254
        }
      ],
      [
        {

          "text": "遂宁市","abbreviated":"遂宁市",
          "value": 3128
        },
        {

          "text": "射洪县","abbreviated":"射洪县",
          "value": 3129
        },
        {

          "text": "大英县","abbreviated":"大英县",
          "value": 3131
        },
        {

          "text": "蓬溪县","abbreviated":"蓬溪县",
          "value": 3130
        },
        {

          "text": "遂宁市安居区","abbreviated":"安居区",
          "value": 4273
        },
        {

          "text": "遂宁市船山区","abbreviated":"船山区",
          "value": 4274
        }
      ],
      [
        {

          "text": "内江市","abbreviated":"内江市",
          "value": 3133
        },
        {

          "text": "资中县","abbreviated":"资中县",
          "value": 3134
        },
        {

          "text": "隆昌县","abbreviated":"隆昌县",
          "value": 3135
        },
        {

          "text": "威远县","abbreviated":"威远县",
          "value": 3136
        },
        {

          "text": "内江市东兴区","abbreviated":"东兴区",
          "value": 4265
        },
        {

          "text": "内江市市中区","abbreviated":"市中区",
          "value": 4266
        }
      ],
      [
        {

          "text": "乐山市","abbreviated":"乐山市",
          "value": 3138
        },
        {

          "text": "峨眉山市","abbreviated":"峨眉山市",
          "value": 3139
        },
        {

          "text": "夹江县","abbreviated":"夹江县",
          "value": 3140
        },
        {

          "text": "井研县","abbreviated":"井研县",
          "value": 3141
        },
        {

          "text": "犍为县","abbreviated":"犍为县",
          "value": 3142
        },
        {

          "text": "马边彝族自治县","abbreviated":"马边彝族自治县",
          "value": 3144
        },
        {

          "text": "峨边彝族自治县","abbreviated":"峨边彝族自治县",
          "value": 3145
        },
        {

          "text": "沐川县","abbreviated":"沐川县",
          "value": 3143
        },
        {

          "text": "乐山市金口河区","abbreviated":"金口河区",
          "value": 4255
        },
        {

          "text": "乐山市沙湾区","abbreviated":"沙湾区",
          "value": 4256
        },
        {

          "text": "乐山市市中区","abbreviated":"市中区",
          "value": 4257
        },
        {

          "text": "乐山市五通桥区","abbreviated":"五通桥区",
          "value": 4258
        }
      ],
      [
        {

          "text": "南充市","abbreviated":"南充市",
          "value": 3147
        },
        {

          "text": "阆中市","abbreviated":"阆中市",
          "value": 3148
        },
        {

          "text": "营山县","abbreviated":"营山县",
          "value": 3149
        },
        {

          "text": "蓬安县","abbreviated":"蓬安县",
          "value": 3150
        },
        {

          "text": "仪陇县","abbreviated":"仪陇县",
          "value": 3151
        },
        {

          "text": "南部县","abbreviated":"南部县",
          "value": 3152
        },
        {

          "text": "西充县","abbreviated":"西充县",
          "value": 3153
        },
        {

          "text": "南充市高坪区","abbreviated":"高坪区",
          "value": 4267
        },
        {

          "text": "南充市嘉陵区","abbreviated":"嘉陵区",
          "value": 4268
        },
        {

          "text": "南充市顺庆区","abbreviated":"顺庆区",
          "value": 4269
        }
      ],
      [
        {

          "text": "宜宾市","abbreviated":"宜宾市",
          "value": 3155
        },
        {

          "text": "宜宾县","abbreviated":"宜宾县",
          "value": 3156
        },
        {

          "text": "兴文县","abbreviated":"兴文县",
          "value": 3157
        },
        {

          "text": "南溪县","abbreviated":"南溪县",
          "value": 3158
        },
        {

          "text": "珙县","abbreviated":"珙县",
          "value": 3159
        },
        {

          "text": "长宁县","abbreviated":"长宁县",
          "value": 3160
        },
        {

          "text": "高县","abbreviated":"高县",
          "value": 3161
        },
        {

          "text": "江安县","abbreviated":"江安县",
          "value": 3162
        },
        {

          "text": "筠连县","abbreviated":"筠连县",
          "value": 3163
        },
        {

          "text": "屏山县","abbreviated":"屏山县",
          "value": 3164
        },
        {

          "text": "宜宾市翠屏区","abbreviated":"翠屏区",
          "value": 4276
        }
      ],
      [
        {

          "text": "广安市","abbreviated":"广安市",
          "value": 3166
        },
        {

          "text": "华蓥市","abbreviated":"华蓥市",
          "value": 3167
        },
        {

          "text": "岳池县","abbreviated":"岳池县",
          "value": 3168
        },
        {

          "text": "邻水县","abbreviated":"邻水县",
          "value": 3169
        },
        {

          "text": "武胜县","abbreviated":"武胜县",
          "value": 3170
        },
        {

          "text": "广安市广安区","abbreviated":"广安区",
          "value": 4251
        },
        {

          "text": "广安市前锋区","abbreviated":"前锋区",
          "value": 4983
        }
      ],
      [
        {

          "text": "达州市","abbreviated":"达州市",
          "value": 3172
        },
        {

          "text": "万源市","abbreviated":"万源市",
          "value": 3173
        },
        {

          "text": "达县","abbreviated":"达县",
          "value": 3174
        },
        {

          "text": "渠县","abbreviated":"渠县",
          "value": 3175
        },
        {

          "text": "宣汉县","abbreviated":"宣汉县",
          "value": 3176
        },
        {

          "text": "开江县","abbreviated":"开江县",
          "value": 3177
        },
        {

          "text": "大竹县","abbreviated":"大竹县",
          "value": 3178
        },
        {

          "text": "达州市通川区","abbreviated":"通川区",
          "value": 4249
        }
      ],
      [
        {

          "text": "巴中市","abbreviated":"巴中市",
          "value": 3180
        },
        {

          "text": "南江县","abbreviated":"南江县",
          "value": 3181
        },
        {

          "text": "平昌县","abbreviated":"平昌县",
          "value": 3182
        },
        {

          "text": "通江县","abbreviated":"通江县",
          "value": 3183
        },
        {

          "text": "巴中市巴州区","abbreviated":"巴州区",
          "value": 4239
        },
        {

          "text": "巴中市恩阳区","abbreviated":"恩阳区",
          "value": 4984
        }
      ],
      [
        {

          "text": "眉山市","abbreviated":"眉山市",
          "value": 3194
        },
        {

          "text": "仁寿县","abbreviated":"仁寿县",
          "value": 3195
        },
        {

          "text": "洪雅县","abbreviated":"洪雅县",
          "value": 3197
        },
        {

          "text": "丹棱县","abbreviated":"丹棱县",
          "value": 3198
        },
        {

          "text": "青神县","abbreviated":"青神县",
          "value": 3199
        },
        {

          "text": "彭山县","abbreviated":"彭山县",
          "value": 3196
        },
        {

          "text": "眉山市东坡区","abbreviated":"东坡区",
          "value": 4262
        }
      ],
      [
        {

          "text": "资阳市","abbreviated":"资阳市",
          "value": 3201
        },
        {

          "text": "简阳市","abbreviated":"简阳市",
          "value": 3202
        },
        {

          "text": "安岳县","abbreviated":"安岳县",
          "value": 3203
        },
        {

          "text": "乐至县","abbreviated":"乐至县",
          "value": 3204
        },
        {

          "text": "资阳市雁江区","abbreviated":"雁江区",
          "value": 4277
        }
      ],
      [
        {

          "text": "马尔康县","abbreviated":"马尔康县",
          "value": 3206
        },
        {

          "text": "九寨沟县","abbreviated":"九寨沟县",
          "value": 3207
        },
        {

          "text": "红原县","abbreviated":"红原县",
          "value": 3208
        },
        {

          "text": "汶川县","abbreviated":"汶川县",
          "value": 3209
        },
        {

          "text": "理县","abbreviated":"理县",
          "value": 3211
        },
        {

          "text": "若尔盖县","abbreviated":"若尔盖县",
          "value": 3212
        },
        {

          "text": "小金县","abbreviated":"小金县",
          "value": 3213
        },
        {

          "text": "黑水县","abbreviated":"黑水县",
          "value": 3214
        },
        {

          "text": "金川县","abbreviated":"金川县",
          "value": 3215
        },
        {

          "text": "松潘县","abbreviated":"松潘县",
          "value": 3216
        },
        {

          "text": "壤塘县","abbreviated":"壤塘县",
          "value": 3217
        },
        {

          "text": "茂县","abbreviated":"茂县",
          "value": 3218
        },
        {

          "text": "阿坝县","abbreviated":"阿坝县",
          "value": 3210
        }
      ],
      [
        {

          "text": "康定县","abbreviated":"康定县",
          "value": 3220
        },
        {

          "text": "丹巴县","abbreviated":"丹巴县",
          "value": 3221
        },
        {

          "text": "炉霍县","abbreviated":"炉霍县",
          "value": 3222
        },
        {

          "text": "九龙县","abbreviated":"九龙县",
          "value": 3223
        },
        {

          "text": "甘孜县","abbreviated":"甘孜县",
          "value": 3224
        },
        {

          "text": "雅江县","abbreviated":"雅江县",
          "value": 3225
        },
        {

          "text": "新龙县","abbreviated":"新龙县",
          "value": 3226
        },
        {

          "text": "道孚县","abbreviated":"道孚县",
          "value": 3227
        },
        {

          "text": "白玉县","abbreviated":"白玉县",
          "value": 3228
        },
        {

          "text": "理塘县","abbreviated":"理塘县",
          "value": 3229
        },
        {

          "text": "德格县","abbreviated":"德格县",
          "value": 3230
        },
        {

          "text": "乡城县","abbreviated":"乡城县",
          "value": 3231
        },
        {

          "text": "石渠县","abbreviated":"石渠县",
          "value": 3232
        },
        {

          "text": "稻城县","abbreviated":"稻城县",
          "value": 3233
        },
        {

          "text": "色达县","abbreviated":"色达县",
          "value": 3234
        },
        {

          "text": "巴塘县","abbreviated":"巴塘县",
          "value": 3235
        },
        {

          "text": "泸定县","abbreviated":"泸定县",
          "value": 3236
        },
        {

          "text": "得荣县","abbreviated":"得荣县",
          "value": 3237
        }
      ],
      [
        {

          "text": "西昌市","abbreviated":"西昌市",
          "value": 3239
        },
        {

          "text": "美姑县","abbreviated":"美姑县",
          "value": 3240
        },
        {

          "text": "昭觉县","abbreviated":"昭觉县",
          "value": 3241
        },
        {

          "text": "金阳县","abbreviated":"金阳县",
          "value": 3242
        },
        {

          "text": "甘洛县","abbreviated":"甘洛县",
          "value": 3243
        },
        {

          "text": "布拖县","abbreviated":"布拖县",
          "value": 3244
        },
        {

          "text": "雷波县","abbreviated":"雷波县",
          "value": 3245
        },
        {

          "text": "普格县","abbreviated":"普格县",
          "value": 3246
        },
        {

          "text": "宁南县","abbreviated":"宁南县",
          "value": 3247
        },
        {

          "text": "喜德县","abbreviated":"喜德县",
          "value": 3248
        },
        {

          "text": "会东县","abbreviated":"会东县",
          "value": 3249
        },
        {

          "text": "越西县","abbreviated":"越西县",
          "value": 3250
        },
        {

          "text": "会理县","abbreviated":"会理县",
          "value": 3251
        },
        {

          "text": "盐源县","abbreviated":"盐源县",
          "value": 3252
        },
        {

          "text": "德昌县","abbreviated":"德昌县",
          "value": 3253
        },
        {

          "text": "冕宁县","abbreviated":"冕宁县",
          "value": 3254
        },
        {

          "text": "木里藏族自治县","abbreviated":"木里藏族自治县",
          "value": 3255
        }
      ],
      [
        {

          "text": "雅安市","abbreviated":"雅安市",
          "value": 3185
        },
        {

          "text": "芦山县","abbreviated":"芦山县",
          "value": 3186
        },
        {

          "text": "石棉县","abbreviated":"石棉县",
          "value": 3187
        },
        {

          "text": "名山县","abbreviated":"名山县",
          "value": 3188
        },
        {

          "text": "天全县","abbreviated":"天全县",
          "value": 3189
        },
        {

          "text": "荥经县","abbreviated":"荥经县",
          "value": 3190
        },
        {

          "text": "宝兴县","abbreviated":"宝兴县",
          "value": 3191
        },
        {

          "text": "汉源县","abbreviated":"汉源县",
          "value": 3192
        },
        {

          "text": "雅安市雨城区","abbreviated":"雨城区",
          "value": 4275
        }
      ]
    ],
    [
      [
        {

          "text": "丹寨县","abbreviated":"丹寨县",
          "value": 1460
        },
        {

          "text": "凯里市","abbreviated":"凯里市",
          "value": 1445
        },
        {

          "text": "施秉县","abbreviated":"施秉县",
          "value": 1446
        },
        {

          "text": "从江县","abbreviated":"从江县",
          "value": 1447
        },
        {

          "text": "锦屏县","abbreviated":"锦屏县",
          "value": 1448
        },
        {

          "text": "镇远县","abbreviated":"镇远县",
          "value": 1449
        },
        {

          "text": "麻江县","abbreviated":"麻江县",
          "value": 1450
        },
        {

          "text": "台江县","abbreviated":"台江县",
          "value": 1451
        },
        {

          "text": "天柱县","abbreviated":"天柱县",
          "value": 1452
        },
        {

          "text": "黄平县","abbreviated":"黄平县",
          "value": 1453
        },
        {

          "text": "榕江县","abbreviated":"榕江县",
          "value": 1454
        },
        {

          "text": "剑河县","abbreviated":"剑河县",
          "value": 1455
        },
        {

          "text": "三穗县","abbreviated":"三穗县",
          "value": 1456
        },
        {

          "text": "雷山县","abbreviated":"雷山县",
          "value": 1457
        },
        {

          "text": "黎平县","abbreviated":"黎平县",
          "value": 1458
        },
        {

          "text": "岑巩县","abbreviated":"岑巩县",
          "value": 1459
        }
      ],
      [
        {

          "text": "清镇市","abbreviated":"清镇市",
          "value": 1385
        },
        {

          "text": "贵阳市南明区","abbreviated":"南明区",
          "value": 4408
        },
        {

          "text": "贵阳市白云区","abbreviated":"白云区",
          "value": 4603
        },
        {

          "text": "贵阳市花溪区","abbreviated":"花溪区",
          "value": 4604
        },
        {

          "text": "贵阳市乌当区","abbreviated":"乌当区",
          "value": 4605
        },
        {

          "text": "贵阳市小河区","abbreviated":"小河区",
          "value": 4606
        },
        {

          "text": "贵阳市云岩区","abbreviated":"云岩区",
          "value": 4607
        },
        {

          "text": "贵阳市","abbreviated":"贵阳市",
          "value": 1384
        },
        {

          "text": "开阳县","abbreviated":"开阳县",
          "value": 1386
        },
        {

          "text": "修文县","abbreviated":"修文县",
          "value": 1387
        },
        {

          "text": "息烽县","abbreviated":"息烽县",
          "value": 1388
        }
      ],
      [
        {

          "text": "六盘水市六枝特区","abbreviated":"六枝特区",
          "value": 4608
        },
        {

          "text": "六盘水市钟山区","abbreviated":"钟山区",
          "value": 4609
        },
        {

          "text": "六盘水市","abbreviated":"六盘水市",
          "value": 1390
        },
        {

          "text": "水城县","abbreviated":"水城县",
          "value": 1391
        },
        {

          "text": "盘县","abbreviated":"盘县",
          "value": 1392
        },
        {

          "text": "六枝特区","abbreviated":"六枝特区",
          "value": 1393
        }
      ],
      [
        {

          "text": "仁怀市","abbreviated":"仁怀市",
          "value": 1397
        },
        {

          "text": "遵义市红花岗区","abbreviated":"红花岗区",
          "value": 4611
        },
        {

          "text": "遵义市汇川区","abbreviated":"汇川区",
          "value": 4612
        },
        {

          "text": "遵义市","abbreviated":"遵义市",
          "value": 1395
        },
        {

          "text": "赤水市","abbreviated":"赤水市",
          "value": 1396
        },
        {

          "text": "遵义县","abbreviated":"遵义县",
          "value": 1398
        },
        {

          "text": "绥阳县","abbreviated":"绥阳县",
          "value": 1399
        },
        {

          "text": "桐梓县","abbreviated":"桐梓县",
          "value": 1400
        },
        {

          "text": "习水县","abbreviated":"习水县",
          "value": 1401
        },
        {

          "text": "凤冈县","abbreviated":"凤冈县",
          "value": 1402
        },
        {

          "text": "正安县","abbreviated":"正安县",
          "value": 1403
        },
        {

          "text": "余庆县","abbreviated":"余庆县",
          "value": 1404
        },
        {

          "text": "湄潭县","abbreviated":"湄潭县",
          "value": 1405
        },
        {

          "text": "道真仡佬族苗族自治县","abbreviated":"道真仡佬族苗族自治县",
          "value": 1406
        },
        {

          "text": "务川仡佬族苗族自治县","abbreviated":"务川仡佬族苗族自治县",
          "value": 1407
        }
      ],
      [
        {

          "text": "安顺市西秀区","abbreviated":"西秀区",
          "value": 4602
        },
        {

          "text": "安顺市","abbreviated":"安顺市",
          "value": 1409
        },
        {

          "text": "普定县","abbreviated":"普定县",
          "value": 1410
        },
        {

          "text": "平坝县","abbreviated":"平坝县",
          "value": 1411
        },
        {

          "text": "镇宁布依族苗族自治县","abbreviated":"镇宁布依族苗族自治县",
          "value": 1412
        },
        {

          "text": "紫云苗族布依族自治县","abbreviated":"紫云苗族布依族自治县",
          "value": 1413
        },
        {

          "text": "关岭布依族苗族自治县","abbreviated":"关岭布依族苗族自治县",
          "value": 1414
        }
      ],
      [
        {

          "text": "铜仁地区万山特区","abbreviated":"铜仁地区万山特区",
          "value": 4610
        },
        {

          "text": "铜仁市","abbreviated":"铜仁市",
          "value": 1416
        },
        {

          "text": "德江县","abbreviated":"德江县",
          "value": 1417
        },
        {

          "text": "江口县","abbreviated":"江口县",
          "value": 1418
        },
        {

          "text": "思南县","abbreviated":"思南县",
          "value": 1419
        },
        {

          "text": "石阡县","abbreviated":"石阡县",
          "value": 1420
        },
        {

          "text": "玉屏侗族自治县","abbreviated":"玉屏侗族自治县",
          "value": 1421
        },
        {

          "text": "松桃苗族自治县","abbreviated":"松桃苗族自治县",
          "value": 1422
        },
        {

          "text": "印江土家族苗族自治县","abbreviated":"印江土家族苗族自治县",
          "value": 1423
        },
        {

          "text": "沿河土家族自治县","abbreviated":"沿河土家族自治县",
          "value": 1424
        },
        {

          "text": "万山特区","abbreviated":"万山特区",
          "value": 1425
        }
      ],
      [
        {

          "text": "毕节市","abbreviated":"毕节市",
          "value": 1427
        },
        {

          "text": "黔西县","abbreviated":"黔西县",
          "value": 1428
        },
        {

          "text": "大方县","abbreviated":"大方县",
          "value": 1429
        },
        {

          "text": "织金县","abbreviated":"织金县",
          "value": 1430
        },
        {

          "text": "金沙县","abbreviated":"金沙县",
          "value": 1431
        },
        {

          "text": "赫章县","abbreviated":"赫章县",
          "value": 1432
        },
        {

          "text": "纳雍县","abbreviated":"纳雍县",
          "value": 1433
        },
        {

          "text": "威宁彝族回族苗族自治县","abbreviated":"威宁彝族回族苗族自治县",
          "value": 1434
        }
      ],
      [
        {

          "text": "兴义市","abbreviated":"兴义市",
          "value": 1436
        },
        {

          "text": "望谟县","abbreviated":"望谟县",
          "value": 1437
        },
        {

          "text": "兴仁县","abbreviated":"兴仁县",
          "value": 1438
        },
        {

          "text": "普安县","abbreviated":"普安县",
          "value": 1439
        },
        {

          "text": "册亨县","abbreviated":"册亨县",
          "value": 1440
        },
        {

          "text": "晴隆县","abbreviated":"晴隆县",
          "value": 1441
        },
        {

          "text": "贞丰县","abbreviated":"贞丰县",
          "value": 1442
        },
        {

          "text": "安龙县","abbreviated":"安龙县",
          "value": 1443
        }
      ],
      [
        {

          "text": "都匀市","abbreviated":"都匀市",
          "value": 1462
        },
        {

          "text": "福泉市","abbreviated":"福泉市",
          "value": 1463
        },
        {

          "text": "贵定县","abbreviated":"贵定县",
          "value": 1464
        },
        {

          "text": "惠水县","abbreviated":"惠水县",
          "value": 1465
        },
        {

          "text": "罗甸县","abbreviated":"罗甸县",
          "value": 1466
        },
        {

          "text": "瓮安县","abbreviated":"瓮安县",
          "value": 1467
        },
        {

          "text": "荔波县","abbreviated":"荔波县",
          "value": 1468
        },
        {

          "text": "龙里县","abbreviated":"龙里县",
          "value": 1469
        },
        {

          "text": "平塘县","abbreviated":"平塘县",
          "value": 1470
        },
        {

          "text": "长顺县","abbreviated":"长顺县",
          "value": 1471
        },
        {

          "text": "独山县","abbreviated":"独山县",
          "value": 1472
        },
        {

          "text": "三都水族自治县","abbreviated":"三都水族自治县",
          "value": 1473
        }
      ]
    ],
    [
      [
        {

          "text": "昆明市","abbreviated":"昆明市",
          "value": 3561
        },
        {

          "text": "安宁市","abbreviated":"安宁市",
          "value": 3562
        },
        {

          "text": "富民县","abbreviated":"富民县",
          "value": 3563
        },
        {

          "text": "嵩明县","abbreviated":"嵩明县",
          "value": 3564
        },
        {

          "text": "呈贡县","abbreviated":"呈贡县",
          "value": 3565
        },
        {

          "text": "晋宁县","abbreviated":"晋宁县",
          "value": 3566
        },
        {

          "text": "宜良县","abbreviated":"宜良县",
          "value": 3567
        },
        {

          "text": "禄劝彝族苗族自治县","abbreviated":"禄劝彝族苗族自治县",
          "value": 3568
        },
        {

          "text": "石林彝族自治县","abbreviated":"石林彝族自治县",
          "value": 3569
        },
        {

          "text": "寻甸回族自治县","abbreviated":"寻甸回族自治县",
          "value": 3570
        },
        {

          "text": "昆明市东川区","abbreviated":"东川区",
          "value": 4310
        },
        {

          "text": "昆明市官渡区","abbreviated":"官渡区",
          "value": 4311
        },
        {

          "text": "昆明市盘龙区","abbreviated":"盘龙区",
          "value": 4312
        },
        {

          "text": "昆明市五华区","abbreviated":"五华区",
          "value": 4313
        },
        {

          "text": "昆明市西山区","abbreviated":"西山区",
          "value": 4314
        }
      ],
      [
        {

          "text": "曲靖市","abbreviated":"曲靖市",
          "value": 3572
        },
        {

          "text": "宣威市","abbreviated":"宣威市",
          "value": 3573
        },
        {

          "text": "陆良县","abbreviated":"陆良县",
          "value": 3574
        },
        {

          "text": "会泽县","abbreviated":"会泽县",
          "value": 3575
        },
        {

          "text": "富源县","abbreviated":"富源县",
          "value": 3576
        },
        {

          "text": "罗平县","abbreviated":"罗平县",
          "value": 3577
        },
        {

          "text": "马龙县","abbreviated":"马龙县",
          "value": 3578
        },
        {

          "text": "师宗县","abbreviated":"师宗县",
          "value": 3579
        },
        {

          "text": "沾益县","abbreviated":"沾益县",
          "value": 3580
        },
        {

          "text": "曲靖市麒麟区","abbreviated":"麒麟区",
          "value": 4316
        }
      ],
      [
        {

          "text": "玉溪市","abbreviated":"玉溪市",
          "value": 3582
        },
        {

          "text": "华宁县","abbreviated":"华宁县",
          "value": 3583
        },
        {

          "text": "澄江县","abbreviated":"澄江县",
          "value": 3584
        },
        {

          "text": "易门县","abbreviated":"易门县",
          "value": 3585
        },
        {

          "text": "通海县","abbreviated":"通海县",
          "value": 3586
        },
        {

          "text": "江川县","abbreviated":"江川县",
          "value": 3587
        },
        {

          "text": "元江哈尼族彝族傣族自治县","abbreviated":"元江哈尼族彝族傣族自治县",
          "value": 3588
        },
        {

          "text": "新平彝族傣族自治县","abbreviated":"新平彝族傣族自治县",
          "value": 3589
        },
        {

          "text": "峨山彝族自治县","abbreviated":"峨山彝族自治县",
          "value": 3590
        },
        {

          "text": "玉溪市红塔区","abbreviated":"红塔区",
          "value": 4317
        }
      ],
      [
        {

          "text": "保山市","abbreviated":"保山市",
          "value": 3592
        },
        {

          "text": "施甸县","abbreviated":"施甸县",
          "value": 3593
        },
        {

          "text": "龙陵县","abbreviated":"龙陵县",
          "value": 3595
        },
        {

          "text": "腾冲县","abbreviated":"腾冲县",
          "value": 3596
        },
        {

          "text": "昌宁县","abbreviated":"昌宁县",
          "value": 3594
        },
        {

          "text": "保山市隆阳区","abbreviated":"隆阳区",
          "value": 4309
        }
      ],
      [
        {

          "text": "昭通市","abbreviated":"昭通市",
          "value": 3598
        },
        {

          "text": "永善县","abbreviated":"永善县",
          "value": 3599
        },
        {

          "text": "绥江县","abbreviated":"绥江县",
          "value": 3600
        },
        {

          "text": "镇雄县","abbreviated":"镇雄县",
          "value": 3601
        },
        {

          "text": "大关县","abbreviated":"大关县",
          "value": 3602
        },
        {

          "text": "盐津县","abbreviated":"盐津县",
          "value": 3603
        },
        {

          "text": "巧家县","abbreviated":"巧家县",
          "value": 3604
        },
        {

          "text": "彝良县","abbreviated":"彝良县",
          "value": 3605
        },
        {

          "text": "水富县","abbreviated":"水富县",
          "value": 3607
        },
        {

          "text": "鲁甸县","abbreviated":"鲁甸县",
          "value": 3608
        },
        {

          "text": "威信县","abbreviated":"威信县",
          "value": 3606
        },
        {

          "text": "昭通市昭阳区","abbreviated":"昭阳区",
          "value": 4318
        }
      ],
      [
        {

          "text": "普洱市","abbreviated":"普洱市",
          "value": 3610
        },
        {

          "text": "宁洱哈尼族彝族自治县","abbreviated":"宁洱哈尼族彝族自治县",
          "value": 3611
        },
        {

          "text": "景东彝族自治县","abbreviated":"景东彝族自治县",
          "value": 3612
        },
        {

          "text": "镇沅彝族哈尼族拉祜族自治县","abbreviated":"镇沅彝族哈尼族拉祜族自治县",
          "value": 3613
        },
        {

          "text": "景谷傣族彝族自治县","abbreviated":"景谷傣族彝族自治县",
          "value": 3614
        },
        {

          "text": "墨江哈尼族自治县","abbreviated":"墨江哈尼族自治县",
          "value": 3615
        },
        {

          "text": "澜沧拉祜族自治县","abbreviated":"澜沧拉祜族自治县",
          "value": 3616
        },
        {

          "text": "西盟佤族自治县","abbreviated":"西盟佤族自治县",
          "value": 3617
        },
        {

          "text": "江城哈尼族彝族自治县","abbreviated":"江城哈尼族彝族自治县",
          "value": 3618
        },
        {

          "text": "孟连傣族拉祜族佤族自治县","abbreviated":"孟连傣族拉祜族佤族自治县",
          "value": 3619
        },
        {

          "text": "普洱市思茅区","abbreviated":"思茅区",
          "value": 4845
        }
      ],
      [
        {

          "text": "临沧市临翔区","abbreviated":"临翔区",
          "value": 3621
        },
        {

          "text": "镇康县","abbreviated":"镇康县",
          "value": 3622
        },
        {

          "text": "凤庆县","abbreviated":"凤庆县",
          "value": 3623
        },
        {

          "text": "云县","abbreviated":"云县",
          "value": 3624
        },
        {

          "text": "永德县","abbreviated":"永德县",
          "value": 3625
        },
        {

          "text": "双江拉祜族佤族布朗族傣族自治县","abbreviated":"双江拉祜族佤族布朗族傣族自治县",
          "value": 3626
        },
        {

          "text": "沧源佤族自治县","abbreviated":"沧源佤族自治县",
          "value": 3627
        },
        {

          "text": "耿马傣族佤族自治县","abbreviated":"耿马傣族佤族自治县",
          "value": 3628
        },
        {

          "text": "临沧市","abbreviated":"临沧市",
          "value": 3783
        }
      ],
      [
        {

          "text": "丽江市","abbreviated":"丽江市",
          "value": 3630
        },
        {

          "text": "玉龙纳西族自治县","abbreviated":"玉龙纳西族自治县",
          "value": 3631
        },
        {

          "text": "华坪县","abbreviated":"华坪县",
          "value": 3632
        },
        {

          "text": "永胜县","abbreviated":"永胜县",
          "value": 3633
        },
        {

          "text": "宁蒗彝族自治县","abbreviated":"宁蒗彝族自治县",
          "value": 3634
        },
        {

          "text": "丽江市古城区","abbreviated":"古城区",
          "value": 4315
        }
      ],
      [
        {

          "text": "文山县","abbreviated":"文山县",
          "value": 3636
        },
        {

          "text": "麻栗坡县","abbreviated":"麻栗坡县",
          "value": 3637
        },
        {

          "text": "砚山县","abbreviated":"砚山县",
          "value": 3638
        },
        {

          "text": "广南县","abbreviated":"广南县",
          "value": 3639
        },
        {

          "text": "马关县","abbreviated":"马关县",
          "value": 3640
        },
        {

          "text": "富宁县","abbreviated":"富宁县",
          "value": 3641
        },
        {

          "text": "西畴县","abbreviated":"西畴县",
          "value": 3642
        },
        {

          "text": "丘北县","abbreviated":"丘北县",
          "value": 3643
        }
      ],
      [
        {

          "text": "个旧市","abbreviated":"个旧市",
          "value": 3645
        },
        {

          "text": "开远市","abbreviated":"开远市",
          "value": 3646
        },
        {

          "text": "弥勒县","abbreviated":"弥勒县",
          "value": 3647
        },
        {

          "text": "红河县","abbreviated":"红河县",
          "value": 3648
        },
        {

          "text": "绿春县","abbreviated":"绿春县",
          "value": 3649
        },
        {

          "text": "蒙自县","abbreviated":"蒙自县",
          "value": 3650
        },
        {

          "text": "泸西县","abbreviated":"泸西县",
          "value": 3651
        },
        {

          "text": "建水县","abbreviated":"建水县",
          "value": 3652
        },
        {

          "text": "元阳县","abbreviated":"元阳县",
          "value": 3653
        },
        {

          "text": "石屏县","abbreviated":"石屏县",
          "value": 3654
        },
        {

          "text": "河口瑶族自治县","abbreviated":"河口瑶族自治县",
          "value": 3656
        },
        {

          "text": "屏边苗族自治县","abbreviated":"屏边苗族自治县",
          "value": 3657
        },
        {

          "text": "金平苗族瑶族傣族自治县","abbreviated":"金平苗族瑶族傣族自治县",
          "value": 3655
        }
      ],
      [
        {

          "text": "景洪市","abbreviated":"景洪市",
          "value": 3659
        },
        {

          "text": "勐海县","abbreviated":"勐海县",
          "value": 3660
        },
        {

          "text": "勐腊县","abbreviated":"勐腊县",
          "value": 3661
        }
      ],
      [
        {

          "text": "楚雄市","abbreviated":"楚雄市",
          "value": 3663
        },
        {

          "text": "元谋县","abbreviated":"元谋县",
          "value": 3664
        },
        {

          "text": "南华县","abbreviated":"南华县",
          "value": 3665
        },
        {

          "text": "牟定县","abbreviated":"牟定县",
          "value": 3666
        },
        {

          "text": "武定县","abbreviated":"武定县",
          "value": 3667
        },
        {

          "text": "大姚县","abbreviated":"大姚县",
          "value": 3668
        },
        {

          "text": "双柏县","abbreviated":"双柏县",
          "value": 3669
        },
        {

          "text": "禄丰县","abbreviated":"禄丰县",
          "value": 3670
        },
        {

          "text": "永仁县","abbreviated":"永仁县",
          "value": 3671
        },
        {

          "text": "姚安县","abbreviated":"姚安县",
          "value": 3672
        }
      ],
      [
        {

          "text": "大理市","abbreviated":"大理市",
          "value": 3674
        },
        {

          "text": "剑川县","abbreviated":"剑川县",
          "value": 3675
        },
        {

          "text": "弥渡县","abbreviated":"弥渡县",
          "value": 3676
        },
        {

          "text": "云龙县","abbreviated":"云龙县",
          "value": 3677
        },
        {

          "text": "洱源县","abbreviated":"洱源县",
          "value": 3678
        },
        {

          "text": "鹤庆县","abbreviated":"鹤庆县",
          "value": 3679
        },
        {

          "text": "祥云县","abbreviated":"祥云县",
          "value": 3680
        },
        {

          "text": "宾川县","abbreviated":"宾川县",
          "value": 3681
        },
        {

          "text": "永平县","abbreviated":"永平县",
          "value": 3682
        },
        {

          "text": "漾濞彝族自治县","abbreviated":"漾濞彝族自治县",
          "value": 3683
        },
        {

          "text": "巍山彝族回族自治县","abbreviated":"巍山彝族回族自治县",
          "value": 3684
        },
        {

          "text": "南涧彝族自治县","abbreviated":"南涧彝族自治县",
          "value": 3685
        }
      ],
      [
        {

          "text": "潞西市","abbreviated":"潞西市",
          "value": 3687
        },
        {

          "text": "瑞丽市","abbreviated":"瑞丽市",
          "value": 3688
        },
        {

          "text": "盈江县","abbreviated":"盈江县",
          "value": 3689
        },
        {

          "text": "梁河县","abbreviated":"梁河县",
          "value": 3690
        },
        {

          "text": "陇川县","abbreviated":"陇川县",
          "value": 3691
        }
      ],
      [
        {

          "text": "泸水县","abbreviated":"泸水县",
          "value": 3693
        },
        {

          "text": "福贡县","abbreviated":"福贡县",
          "value": 3694
        },
        {

          "text": "兰坪白族普米族自治县","abbreviated":"兰坪白族普米族自治县",
          "value": 3695
        },
        {

          "text": "贡山独龙族怒族自治县","abbreviated":"贡山独龙族怒族自治县",
          "value": 3696
        }
      ],
      [
        {

          "text": "香格里拉县","abbreviated":"香格里拉县",
          "value": 3698
        },
        {

          "text": "德钦县","abbreviated":"德钦县",
          "value": 3699
        },
        {

          "text": "维西傈僳族自治县","abbreviated":"维西傈僳族自治县",
          "value": 3700
        }
      ]
    ],
    [
      [
        {

          "text": "拉萨市","abbreviated":"拉萨市",
          "value": 3292
        },
        {

          "text": "林周县","abbreviated":"林周县",
          "value": 3293
        },
        {

          "text": "达孜县","abbreviated":"达孜县",
          "value": 3294
        },
        {

          "text": "尼木县","abbreviated":"尼木县",
          "value": 3295
        },
        {

          "text": "当雄县","abbreviated":"当雄县",
          "value": 3296
        },
        {

          "text": "曲水县","abbreviated":"曲水县",
          "value": 3297
        },
        {

          "text": "墨竹工卡县","abbreviated":"墨竹工卡县",
          "value": 3298
        },
        {

          "text": "堆龙德庆县","abbreviated":"堆龙德庆县",
          "value": 3299
        },
        {

          "text": "拉萨市城关区","abbreviated":"城关区",
          "value": 4297
        }
      ],
      [
        {

          "text": "那曲县","abbreviated":"那曲县",
          "value": 3301
        },
        {

          "text": "嘉黎县","abbreviated":"嘉黎县",
          "value": 3302
        },
        {

          "text": "申扎县","abbreviated":"申扎县",
          "value": 3303
        },
        {

          "text": "巴青县","abbreviated":"巴青县",
          "value": 3304
        },
        {

          "text": "聂荣县","abbreviated":"聂荣县",
          "value": 3305
        },
        {

          "text": "尼玛县","abbreviated":"尼玛县",
          "value": 3306
        },
        {

          "text": "比如县","abbreviated":"比如县",
          "value": 3307
        },
        {

          "text": "索县","abbreviated":"索县",
          "value": 3308
        },
        {

          "text": "班戈县","abbreviated":"班戈县",
          "value": 3309
        },
        {

          "text": "安多县","abbreviated":"安多县",
          "value": 3310
        },
        {

          "text": "双湖县","abbreviated":"双湖县",
          "value": 4998
        }
      ],
      [
        {

          "text": "昌都县","abbreviated":"昌都县",
          "value": 3312
        },
        {

          "text": "芒康县","abbreviated":"芒康县",
          "value": 3313
        },
        {

          "text": "贡觉县","abbreviated":"贡觉县",
          "value": 3314
        },
        {

          "text": "八宿县","abbreviated":"八宿县",
          "value": 3315
        },
        {

          "text": "左贡县","abbreviated":"左贡县",
          "value": 3316
        },
        {

          "text": "边坝县","abbreviated":"边坝县",
          "value": 3317
        },
        {

          "text": "洛隆县","abbreviated":"洛隆县",
          "value": 3318
        },
        {

          "text": "江达县","abbreviated":"江达县",
          "value": 3319
        },
        {

          "text": "类乌齐县","abbreviated":"类乌齐县",
          "value": 3320
        },
        {

          "text": "丁青县","abbreviated":"丁青县",
          "value": 3321
        },
        {

          "text": "察雅县","abbreviated":"察雅县",
          "value": 3322
        }
      ],
      [
        {

          "text": "乃东县","abbreviated":"乃东县",
          "value": 3324
        },
        {

          "text": "琼结县","abbreviated":"琼结县",
          "value": 3325
        },
        {

          "text": "措美县","abbreviated":"措美县",
          "value": 3326
        },
        {

          "text": "加查县","abbreviated":"加查县",
          "value": 3327
        },
        {

          "text": "贡嘎县","abbreviated":"贡嘎县",
          "value": 3328
        },
        {

          "text": "洛扎县","abbreviated":"洛扎县",
          "value": 3329
        },
        {

          "text": "曲松县","abbreviated":"曲松县",
          "value": 3330
        },
        {

          "text": "桑日县","abbreviated":"桑日县",
          "value": 3331
        },
        {

          "text": "扎囊县","abbreviated":"扎囊县",
          "value": 3332
        },
        {

          "text": "错那县","abbreviated":"错那县",
          "value": 3333
        },
        {

          "text": "浪卡子县","abbreviated":"浪卡子县",
          "value": 3335
        },
        {

          "text": "隆子县","abbreviated":"隆子县",
          "value": 3334
        }
      ],
      [
        {

          "text": "日喀则市","abbreviated":"日喀则市",
          "value": 3337
        },
        {

          "text": "定结县","abbreviated":"定结县",
          "value": 3338
        },
        {

          "text": "萨迦县","abbreviated":"萨迦县",
          "value": 3339
        },
        {

          "text": "江孜县","abbreviated":"江孜县",
          "value": 3340
        },
        {

          "text": "拉孜县","abbreviated":"拉孜县",
          "value": 3341
        },
        {

          "text": "定日县","abbreviated":"定日县",
          "value": 3342
        },
        {

          "text": "康马县","abbreviated":"康马县",
          "value": 3343
        },
        {

          "text": "聂拉木县","abbreviated":"聂拉木县",
          "value": 3344
        },
        {

          "text": "吉隆县","abbreviated":"吉隆县",
          "value": 3345
        },
        {

          "text": "谢通门县","abbreviated":"谢通门县",
          "value": 3347
        },
        {

          "text": "昂仁县","abbreviated":"昂仁县",
          "value": 3348
        },
        {

          "text": "岗巴县","abbreviated":"岗巴县",
          "value": 3349
        },
        {

          "text": "仲巴县","abbreviated":"仲巴县",
          "value": 3350
        },
        {

          "text": "萨嘎县","abbreviated":"萨嘎县",
          "value": 3351
        },
        {

          "text": "仁布县","abbreviated":"仁布县",
          "value": 3352
        },
        {

          "text": "白朗县","abbreviated":"白朗县",
          "value": 3353
        },
        {

          "text": "南木林县","abbreviated":"南木林县",
          "value": 3354
        },
        {

          "text": "亚东县","abbreviated":"亚东县",
          "value": 3346
        }
      ],
      [
        {

          "text": "噶尔县","abbreviated":"噶尔县",
          "value": 3356
        },
        {

          "text": "措勤县","abbreviated":"措勤县",
          "value": 3357
        },
        {

          "text": "普兰县","abbreviated":"普兰县",
          "value": 3358
        },
        {

          "text": "革吉县","abbreviated":"革吉县",
          "value": 3359
        },
        {

          "text": "日土县","abbreviated":"日土县",
          "value": 3360
        },
        {

          "text": "札达县","abbreviated":"札达县",
          "value": 3361
        },
        {

          "text": "改则县","abbreviated":"改则县",
          "value": 3362
        }
      ],
      [
        {

          "text": "林芝县","abbreviated":"林芝县",
          "value": 3364
        },
        {

          "text": "墨脱县","abbreviated":"墨脱县",
          "value": 3365
        },
        {

          "text": "朗县","abbreviated":"朗县",
          "value": 3366
        },
        {

          "text": "米林县","abbreviated":"米林县",
          "value": 3367
        },
        {

          "text": "察隅县","abbreviated":"察隅县",
          "value": 3368
        },
        {

          "text": "波密县","abbreviated":"波密县",
          "value": 3369
        },
        {

          "text": "工布江达县","abbreviated":"工布江达县",
          "value": 3370
        }
      ]
    ],
    [
      [
        {

          "text": "西安市","abbreviated":"西安市",
          "value": 2975
        },
        {

          "text": "高陵县","abbreviated":"高陵县",
          "value": 2976
        },
        {

          "text": "蓝田县","abbreviated":"蓝田县",
          "value": 2977
        },
        {

          "text": "户县","abbreviated":"户县",
          "value": 2978
        },
        {

          "text": "周至县","abbreviated":"周至县",
          "value": 2979
        },
        {

          "text": "西安市灞桥区","abbreviated":"灞桥区",
          "value": 4208
        },
        {

          "text": "西安市长安区","abbreviated":"长安区",
          "value": 4209
        },
        {

          "text": "西安市莲湖区","abbreviated":"莲湖区",
          "value": 4210
        },
        {

          "text": "西安市临潼区","abbreviated":"临潼区",
          "value": 4211
        },
        {

          "text": "西安市未央区","abbreviated":"未央区",
          "value": 4212
        },
        {

          "text": "西安市新城区","abbreviated":"新城区",
          "value": 4213
        },
        {

          "text": "西安市阎良区","abbreviated":"阎良区",
          "value": 4214
        },
        {

          "text": "西安市雁塔区","abbreviated":"雁塔区",
          "value": 4215
        },
        {

          "text": "西安市碑林区","abbreviated":"碑林区",
          "value": 4388
        }
      ],
      [
        {

          "text": "铜川市","abbreviated":"铜川市",
          "value": 2981
        },
        {

          "text": "宜君县","abbreviated":"宜君县",
          "value": 2982
        },
        {

          "text": "铜川市王益区","abbreviated":"王益区",
          "value": 4204
        },
        {

          "text": "铜川市耀州区","abbreviated":"耀州区",
          "value": 4205
        },
        {

          "text": "铜川市印台区","abbreviated":"印台区",
          "value": 4206
        }
      ],
      [
        {

          "text": "宝鸡市","abbreviated":"宝鸡市",
          "value": 2984
        },
        {

          "text": "岐山县","abbreviated":"岐山县",
          "value": 2986
        },
        {

          "text": "凤翔县","abbreviated":"凤翔县",
          "value": 2987
        },
        {

          "text": "太白县","abbreviated":"太白县",
          "value": 2989
        },
        {

          "text": "麟游县","abbreviated":"麟游县",
          "value": 2990
        },
        {

          "text": "扶风县","abbreviated":"扶风县",
          "value": 2991
        },
        {

          "text": "千阳县","abbreviated":"千阳县",
          "value": 2992
        },
        {

          "text": "眉县","abbreviated":"眉县",
          "value": 2993
        },
        {

          "text": "凤县","abbreviated":"凤县",
          "value": 2994
        },
        {

          "text": "陇县","abbreviated":"陇县",
          "value": 2988
        },
        {

          "text": "宝鸡市陈仓区","abbreviated":"陈仓区",
          "value": 4200
        },
        {

          "text": "宝鸡市渭滨区","abbreviated":"渭滨区",
          "value": 4201
        },
        {

          "text": "宝鸡市金台区","abbreviated":"金台区",
          "value": 4387
        }
      ],
      [
        {

          "text": "咸阳市","abbreviated":"咸阳市",
          "value": 2996
        },
        {

          "text": "兴平市","abbreviated":"兴平市",
          "value": 2997
        },
        {

          "text": "礼泉县","abbreviated":"礼泉县",
          "value": 2998
        },
        {

          "text": "泾阳县","abbreviated":"泾阳县",
          "value": 2999
        },
        {

          "text": "三原县","abbreviated":"三原县",
          "value": 3001
        },
        {

          "text": "彬县","abbreviated":"彬县",
          "value": 3002
        },
        {

          "text": "旬邑县","abbreviated":"旬邑县",
          "value": 3003
        },
        {

          "text": "长武县","abbreviated":"长武县",
          "value": 3004
        },
        {

          "text": "乾县","abbreviated":"乾县",
          "value": 3005
        },
        {

          "text": "武功县","abbreviated":"武功县",
          "value": 3006
        },
        {

          "text": "淳化县","abbreviated":"淳化县",
          "value": 3007
        },
        {

          "text": "永寿县","abbreviated":"永寿县",
          "value": 3000
        },
        {

          "text": "咸阳市秦都区","abbreviated":"秦都区",
          "value": 4216
        },
        {

          "text": "咸阳市渭城区","abbreviated":"渭城区",
          "value": 4217
        },
        {

          "text": "咸阳市杨凌区","abbreviated":"杨凌区",
          "value": 4218
        }
      ],
      [
        {

          "text": "渭南市","abbreviated":"渭南市",
          "value": 3009
        },
        {

          "text": "韩城市","abbreviated":"韩城市",
          "value": 3010
        },
        {

          "text": "华阴市","abbreviated":"华阴市",
          "value": 3011
        },
        {

          "text": "潼关县","abbreviated":"潼关县",
          "value": 3013
        },
        {

          "text": "白水县","abbreviated":"白水县",
          "value": 3014
        },
        {

          "text": "澄城县","abbreviated":"澄城县",
          "value": 3015
        },
        {

          "text": "华县","abbreviated":"华县",
          "value": 3016
        },
        {

          "text": "合阳县","abbreviated":"合阳县",
          "value": 3017
        },
        {

          "text": "富平县","abbreviated":"富平县",
          "value": 3018
        },
        {

          "text": "大荔县","abbreviated":"大荔县",
          "value": 3019
        },
        {

          "text": "蒲城县","abbreviated":"蒲城县",
          "value": 3012
        },
        {

          "text": "渭南市临渭区","abbreviated":"临渭区",
          "value": 4207
        }
      ],
      [
        {

          "text": "延安市","abbreviated":"延安市",
          "value": 3021
        },
        {

          "text": "安塞县","abbreviated":"安塞县",
          "value": 3022
        },
        {

          "text": "洛川县","abbreviated":"洛川县",
          "value": 3023
        },
        {

          "text": "子长县","abbreviated":"子长县",
          "value": 3024
        },
        {

          "text": "黄陵县","abbreviated":"黄陵县",
          "value": 3025
        },
        {

          "text": "延川县","abbreviated":"延川县",
          "value": 3026
        },
        {

          "text": "富县","abbreviated":"富县",
          "value": 3027
        },
        {

          "text": "延长县","abbreviated":"延长县",
          "value": 3028
        },
        {

          "text": "甘泉县","abbreviated":"甘泉县",
          "value": 3029
        },
        {

          "text": "宜川县","abbreviated":"宜川县",
          "value": 3030
        },
        {

          "text": "志丹县","abbreviated":"志丹县",
          "value": 3031
        },
        {

          "text": "黄龙县","abbreviated":"黄龙县",
          "value": 3032
        },
        {

          "text": "吴起县","abbreviated":"吴起县",
          "value": 3033
        },
        {

          "text": "延安市宝塔区","abbreviated":"宝塔区",
          "value": 4219
        }
      ],
      [
        {

          "text": "汉中市","abbreviated":"汉中市",
          "value": 3035
        },
        {

          "text": "留坝县","abbreviated":"留坝县",
          "value": 3036
        },
        {

          "text": "镇巴县","abbreviated":"镇巴县",
          "value": 3037
        },
        {

          "text": "城固县","abbreviated":"城固县",
          "value": 3038
        },
        {

          "text": "南郑县","abbreviated":"南郑县",
          "value": 3039
        },
        {

          "text": "洋县","abbreviated":"洋县",
          "value": 3040
        },
        {

          "text": "宁强县","abbreviated":"宁强县",
          "value": 3041
        },
        {

          "text": "佛坪县","abbreviated":"佛坪县",
          "value": 3042
        },
        {

          "text": "勉县","abbreviated":"勉县",
          "value": 3043
        },
        {

          "text": "西乡县","abbreviated":"西乡县",
          "value": 3044
        },
        {

          "text": "略阳县","abbreviated":"略阳县",
          "value": 3045
        },
        {

          "text": "汉中市汉台区","abbreviated":"汉台区",
          "value": 4202
        }
      ],
      [
        {

          "text": "榆林市","abbreviated":"榆林市",
          "value": 3047
        },
        {

          "text": "清涧县","abbreviated":"清涧县",
          "value": 3048
        },
        {

          "text": "绥德县","abbreviated":"绥德县",
          "value": 3049
        },
        {

          "text": "神木县","abbreviated":"神木县",
          "value": 3050
        },
        {

          "text": "佳县","abbreviated":"佳县",
          "value": 3051
        },
        {

          "text": "子洲县","abbreviated":"子洲县",
          "value": 3053
        },
        {

          "text": "靖边县","abbreviated":"靖边县",
          "value": 3054
        },
        {

          "text": "横山县","abbreviated":"横山县",
          "value": 3055
        },
        {

          "text": "米脂县","abbreviated":"米脂县",
          "value": 3056
        },
        {

          "text": "吴堡县","abbreviated":"吴堡县",
          "value": 3057
        },
        {

          "text": "定边县","abbreviated":"定边县",
          "value": 3058
        },
        {

          "text": "府谷县","abbreviated":"府谷县",
          "value": 3052
        },
        {

          "text": "榆林市榆阳区","abbreviated":"榆阳区",
          "value": 4220
        }
      ],
      [
        {

          "text": "安康市","abbreviated":"安康市",
          "value": 3060
        },
        {

          "text": "紫阳县","abbreviated":"紫阳县",
          "value": 3061
        },
        {

          "text": "岚皋县","abbreviated":"岚皋县",
          "value": 3062
        },
        {

          "text": "旬阳县","abbreviated":"旬阳县",
          "value": 3063
        },
        {

          "text": "平利县","abbreviated":"平利县",
          "value": 3065
        },
        {

          "text": "石泉县","abbreviated":"石泉县",
          "value": 3066
        },
        {

          "text": "宁陕县","abbreviated":"宁陕县",
          "value": 3067
        },
        {

          "text": "白河县","abbreviated":"白河县",
          "value": 3068
        },
        {

          "text": "汉阴县","abbreviated":"汉阴县",
          "value": 3069
        },
        {

          "text": "镇坪县","abbreviated":"镇坪县",
          "value": 3064
        },
        {

          "text": "安康市汉滨区","abbreviated":"汉滨区",
          "value": 4199
        }
      ],
      [
        {

          "text": "商洛市","abbreviated":"商洛市",
          "value": 3071
        },
        {

          "text": "镇安县","abbreviated":"镇安县",
          "value": 3072
        },
        {

          "text": "山阳县","abbreviated":"山阳县",
          "value": 3073
        },
        {

          "text": "洛南县","abbreviated":"洛南县",
          "value": 3074
        },
        {

          "text": "商南县","abbreviated":"商南县",
          "value": 3075
        },
        {

          "text": "丹凤县","abbreviated":"丹凤县",
          "value": 3076
        },
        {

          "text": "柞水县","abbreviated":"柞水县",
          "value": 3077
        },
        {

          "text": "商洛市商州区","abbreviated":"商州区",
          "value": 4203
        }
      ]
    ],
    [
      [
        {

          "text": "合作市","abbreviated":"合作市",
          "value": 1260
        },
        {

          "text": "临潭县","abbreviated":"临潭县",
          "value": 1261
        },
        {

          "text": "卓尼县","abbreviated":"卓尼县",
          "value": 1262
        },
        {

          "text": "舟曲县","abbreviated":"舟曲县",
          "value": 1263
        },
        {

          "text": "迭部县","abbreviated":"迭部县",
          "value": 1264
        },
        {

          "text": "玛曲县","abbreviated":"玛曲县",
          "value": 1265
        },
        {

          "text": "碌曲县","abbreviated":"碌曲县",
          "value": 1266
        },
        {

          "text": "夏河县","abbreviated":"夏河县",
          "value": 1267
        }
      ],
      [
        {

          "text": "皋兰县","abbreviated":"皋兰县",
          "value": 1186
        },
        {

          "text": "兰州市七里河区","abbreviated":"七里河区",
          "value": 4396
        },
        {

          "text": "兰州市安宁区","abbreviated":"安宁区",
          "value": 4517
        },
        {

          "text": "兰州市城关区","abbreviated":"城关区",
          "value": 4518
        },
        {

          "text": "兰州市红古区","abbreviated":"红古区",
          "value": 4519
        },
        {

          "text": "兰州市西固区","abbreviated":"西固区",
          "value": 4520
        },
        {

          "text": "兰州市","abbreviated":"兰州市",
          "value": 1183
        },
        {

          "text": "永登县","abbreviated":"永登县",
          "value": 1184
        },
        {

          "text": "榆中县","abbreviated":"榆中县",
          "value": 1185
        }
      ],
      [
        {

          "text": "金昌市金川区","abbreviated":"金川区",
          "value": 4515
        },
        {

          "text": "金昌市","abbreviated":"金昌市",
          "value": 1188
        },
        {

          "text": "永昌县","abbreviated":"永昌县",
          "value": 1189
        }
      ],
      [
        {

          "text": "白银市白银区","abbreviated":"白银区",
          "value": 4395
        },
        {

          "text": "白银市平川区","abbreviated":"平川区",
          "value": 4513
        },
        {

          "text": "白银市","abbreviated":"白银市",
          "value": 1191
        },
        {

          "text": "靖远县","abbreviated":"靖远县",
          "value": 1192
        },
        {

          "text": "景泰县","abbreviated":"景泰县",
          "value": 1193
        },
        {

          "text": "会宁县","abbreviated":"会宁县",
          "value": 1194
        }
      ],
      [
        {

          "text": "甘谷县","abbreviated":"甘谷县",
          "value": 1198
        },
        {

          "text": "天水市北道区","abbreviated":"北道区",
          "value": 4523
        },
        {

          "text": "天水市秦城区","abbreviated":"秦城区",
          "value": 4524
        },
        {

          "text": "天水市","abbreviated":"天水市",
          "value": 1196
        },
        {

          "text": "武山县","abbreviated":"武山县",
          "value": 1197
        },
        {

          "text": "清水县","abbreviated":"清水县",
          "value": 1199
        },
        {

          "text": "秦安县","abbreviated":"秦安县",
          "value": 1200
        },
        {

          "text": "张家川回族自治县","abbreviated":"张家川回族自治县",
          "value": 1201
        }
      ],
      [
        {

          "text": "嘉峪关市","abbreviated":"嘉峪关市",
          "value": 1203
        }
      ],
      [
        {

          "text": "武威市凉州区","abbreviated":"凉州区",
          "value": 4525
        },
        {

          "text": "武威市","abbreviated":"武威市",
          "value": 1205
        },
        {

          "text": "民勤县","abbreviated":"民勤县",
          "value": 1206
        },
        {

          "text": "古浪县","abbreviated":"古浪县",
          "value": 1207
        },
        {

          "text": "天祝藏族自治县","abbreviated":"天祝藏族自治县",
          "value": 1208
        }
      ],
      [
        {

          "text": "张掖市甘州区","abbreviated":"甘州区",
          "value": 4526
        },
        {

          "text": "张掖市","abbreviated":"张掖市",
          "value": 1210
        },
        {

          "text": "民乐县","abbreviated":"民乐县",
          "value": 1211
        },
        {

          "text": "山丹县","abbreviated":"山丹县",
          "value": 1212
        },
        {

          "text": "临泽县","abbreviated":"临泽县",
          "value": 1213
        },
        {

          "text": "高台县","abbreviated":"高台县",
          "value": 1214
        },
        {

          "text": "肃南裕固族自治县","abbreviated":"肃南裕固族自治县",
          "value": 1215
        }
      ],
      [
        {

          "text": "平凉市崆峒区","abbreviated":"崆峒区",
          "value": 4521
        },
        {

          "text": "平凉市","abbreviated":"平凉市",
          "value": 1217
        },
        {

          "text": "灵台县","abbreviated":"灵台县",
          "value": 1218
        },
        {

          "text": "静宁县","abbreviated":"静宁县",
          "value": 1219
        },
        {

          "text": "崇信县","abbreviated":"崇信县",
          "value": 1220
        },
        {

          "text": "华亭县","abbreviated":"华亭县",
          "value": 1221
        },
        {

          "text": "泾川县","abbreviated":"泾川县",
          "value": 1222
        },
        {

          "text": "庄浪县","abbreviated":"庄浪县",
          "value": 1223
        }
      ],
      [
        {

          "text": "酒泉市肃州区","abbreviated":"肃州区",
          "value": 4516
        },
        {

          "text": "酒泉市","abbreviated":"酒泉市",
          "value": 1225
        },
        {

          "text": "玉门市","abbreviated":"玉门市",
          "value": 1226
        },
        {

          "text": "敦煌市","abbreviated":"敦煌市",
          "value": 1227
        },
        {

          "text": "瓜州县","abbreviated":"瓜州县",
          "value": 1228
        },
        {

          "text": "金塔县","abbreviated":"金塔县",
          "value": 1229
        },
        {

          "text": "阿克塞哈萨克族自治县","abbreviated":"阿克塞哈萨克族自治县",
          "value": 1230
        },
        {

          "text": "肃北蒙古族自治县","abbreviated":"肃北蒙古族自治县",
          "value": 1231
        }
      ],
      [
        {

          "text": "庆阳市西峰区","abbreviated":"西峰区",
          "value": 4522
        },
        {

          "text": "庆阳市","abbreviated":"庆阳市",
          "value": 1233
        },
        {

          "text": "庆城县","abbreviated":"庆城县",
          "value": 1234
        },
        {

          "text": "镇原县","abbreviated":"镇原县",
          "value": 1235
        },
        {

          "text": "合水县","abbreviated":"合水县",
          "value": 1236
        },
        {

          "text": "华池县","abbreviated":"华池县",
          "value": 1237
        },
        {

          "text": "环县","abbreviated":"环县",
          "value": 1238
        },
        {

          "text": "宁县","abbreviated":"宁县",
          "value": 1239
        },
        {

          "text": "正宁县","abbreviated":"正宁县",
          "value": 1240
        }
      ],
      [
        {

          "text": "漳县","abbreviated":"漳县",
          "value": 1247
        },
        {

          "text": "定西市安定区","abbreviated":"安定区",
          "value": 4514
        },
        {

          "text": "定西市","abbreviated":"定西市",
          "value": 1242
        },
        {

          "text": "岷县","abbreviated":"岷县",
          "value": 1243
        },
        {

          "text": "渭源县","abbreviated":"渭源县",
          "value": 1244
        },
        {

          "text": "陇西县","abbreviated":"陇西县",
          "value": 1245
        },
        {

          "text": "通渭县","abbreviated":"通渭县",
          "value": 1246
        },
        {

          "text": "临洮县","abbreviated":"临洮县",
          "value": 1248
        }
      ],
      [
        {

          "text": "陇南市","abbreviated":"陇南市",
          "value": 3784
        },
        {

          "text": "成县","abbreviated":"成县",
          "value": 1250
        },
        {

          "text": "礼县","abbreviated":"礼县",
          "value": 1251
        },
        {

          "text": "康县","abbreviated":"康县",
          "value": 1252
        },
        {

          "text": "陇南市武都区","abbreviated":"武都区",
          "value": 1253
        },
        {

          "text": "文县","abbreviated":"文县",
          "value": 1254
        },
        {

          "text": "两当县","abbreviated":"两当县",
          "value": 1255
        },
        {

          "text": "徽县","abbreviated":"徽县",
          "value": 1256
        },
        {

          "text": "宕昌县","abbreviated":"宕昌县",
          "value": 1257
        },
        {

          "text": "西和县","abbreviated":"西和县",
          "value": 1258
        }
      ],
      [
        {

          "text": "广河县","abbreviated":"广河县",
          "value": 1273
        },
        {

          "text": "临夏市","abbreviated":"临夏市",
          "value": 1269
        },
        {

          "text": "临夏县","abbreviated":"临夏县",
          "value": 1270
        },
        {

          "text": "康乐县","abbreviated":"康乐县",
          "value": 1271
        },
        {

          "text": "永靖县","abbreviated":"永靖县",
          "value": 1272
        },
        {

          "text": "和政县","abbreviated":"和政县",
          "value": 1274
        },
        {

          "text": "东乡族自治县","abbreviated":"东乡族自治县",
          "value": 1275
        },
        {

          "text": "积石山保安族东乡族撒拉族自治县","abbreviated":"积石山保安族东乡族撒拉族自治县",
          "value": 1276
        }
      ]
    ],
    [
      [
        {

          "text": "西宁市城北区","abbreviated":"城北区",
          "value": 4132
        },
        {

          "text": "西宁市城东区","abbreviated":"城东区",
          "value": 4133
        },
        {

          "text": "西宁市城西区","abbreviated":"城西区",
          "value": 4134
        },
        {

          "text": "西宁市城中区","abbreviated":"城中区",
          "value": 4378
        },
        {

          "text": "西宁市","abbreviated":"西宁市",
          "value": 2563
        },
        {

          "text": "湟源县","abbreviated":"湟源县",
          "value": 2564
        },
        {

          "text": "湟中县","abbreviated":"湟中县",
          "value": 2565
        },
        {

          "text": "大通回族土族自治县","abbreviated":"大通回族土族自治县",
          "value": 2566
        }
      ],
      [
        {

          "text": "平安县","abbreviated":"平安县",
          "value": 2568
        },
        {

          "text": "乐都县","abbreviated":"乐都县",
          "value": 2569
        },
        {

          "text": "民和回族土族自治县","abbreviated":"民和回族土族自治县",
          "value": 2570
        },
        {

          "text": "互助土族自治县","abbreviated":"互助土族自治县",
          "value": 2571
        },
        {

          "text": "化隆回族自治县","abbreviated":"化隆回族自治县",
          "value": 2572
        },
        {

          "text": "循化撒拉族自治县","abbreviated":"循化撒拉族自治县",
          "value": 2573
        }
      ],
      [
        {

          "text": "海晏县","abbreviated":"海晏县",
          "value": 2575
        },
        {

          "text": "祁连县","abbreviated":"祁连县",
          "value": 2576
        },
        {

          "text": "刚察县","abbreviated":"刚察县",
          "value": 2577
        },
        {

          "text": "门源回族自治县","abbreviated":"门源回族自治县",
          "value": 2578
        }
      ],
      [
        {

          "text": "同仁县","abbreviated":"同仁县",
          "value": 2580
        },
        {

          "text": "泽库县","abbreviated":"泽库县",
          "value": 2581
        },
        {

          "text": "尖扎县","abbreviated":"尖扎县",
          "value": 2582
        },
        {

          "text": "河南蒙古族自治县","abbreviated":"河南蒙古族自治县",
          "value": 2583
        }
      ],
      [
        {

          "text": "贵德县","abbreviated":"贵德县",
          "value": 2587
        },
        {

          "text": "共和县","abbreviated":"共和县",
          "value": 2585
        },
        {

          "text": "同德县","abbreviated":"同德县",
          "value": 2586
        },
        {

          "text": "兴海县","abbreviated":"兴海县",
          "value": 2588
        },
        {

          "text": "贵南县","abbreviated":"贵南县",
          "value": 2589
        }
      ],
      [
        {

          "text": "玛沁县","abbreviated":"玛沁县",
          "value": 2591
        },
        {

          "text": "班玛县","abbreviated":"班玛县",
          "value": 2592
        },
        {

          "text": "甘德县","abbreviated":"甘德县",
          "value": 2593
        },
        {

          "text": "达日县","abbreviated":"达日县",
          "value": 2594
        },
        {

          "text": "久治县","abbreviated":"久治县",
          "value": 2595
        },
        {

          "text": "玛多县","abbreviated":"玛多县",
          "value": 2596
        }
      ],
      [
        {

          "text": "杂多县","abbreviated":"杂多县",
          "value": 2599
        },
        {

          "text": "玉树县","abbreviated":"玉树县",
          "value": 2598
        },
        {

          "text": "称多县","abbreviated":"称多县",
          "value": 2600
        },
        {

          "text": "治多县","abbreviated":"治多县",
          "value": 2601
        },
        {

          "text": "囊谦县","abbreviated":"囊谦县",
          "value": 2602
        },
        {

          "text": "曲麻莱县","abbreviated":"曲麻莱县",
          "value": 2603
        }
      ],
      [
        {

          "text": "德令哈市","abbreviated":"德令哈市",
          "value": 2605
        },
        {

          "text": "格尔木市","abbreviated":"格尔木市",
          "value": 2606
        },
        {

          "text": "乌兰县","abbreviated":"乌兰县",
          "value": 2607
        },
        {

          "text": "天峻县","abbreviated":"天峻县",
          "value": 2608
        },
        {

          "text": "都兰县","abbreviated":"都兰县",
          "value": 2609
        }
      ]
    ],
    [
      [
        {

          "text": "银川市金凤区","abbreviated":"金凤区",
          "value": 4128
        },
        {

          "text": "银川市西夏区","abbreviated":"西夏区",
          "value": 4129
        },
        {

          "text": "银川市兴庆区","abbreviated":"兴庆区",
          "value": 4130
        },
        {

          "text": "银川市","abbreviated":"银川市",
          "value": 2538
        },
        {

          "text": "永宁县","abbreviated":"永宁县",
          "value": 2539
        },
        {

          "text": "贺兰县","abbreviated":"贺兰县",
          "value": 2540
        },
        {

          "text": "灵武市","abbreviated":"灵武市",
          "value": 2541
        }
      ],
      [
        {

          "text": "石嘴山市大武口区","abbreviated":"大武口区",
          "value": 4126
        },
        {

          "text": "石嘴山市","abbreviated":"石嘴山市",
          "value": 2543
        },
        {

          "text": "平罗县","abbreviated":"平罗县",
          "value": 2544
        },
        {

          "text": "石嘴山市惠农区","abbreviated":"惠农区",
          "value": 2546
        }
      ],
      [
        {

          "text": "吴忠市利通区","abbreviated":"利通区",
          "value": 4127
        },
        {

          "text": "吴忠市","abbreviated":"吴忠市",
          "value": 2548
        },
        {

          "text": "青铜峡市","abbreviated":"青铜峡市",
          "value": 2549
        },
        {

          "text": "同心县","abbreviated":"同心县",
          "value": 2550
        },
        {

          "text": "盐池县","abbreviated":"盐池县",
          "value": 2551
        },
        {

          "text": "吴忠市红寺堡区","abbreviated":"红寺堡区",
          "value": 4911
        }
      ],
      [
        {

          "text": "中卫市","abbreviated":"中卫市",
          "value": 3702
        },
        {

          "text": "中卫市沙坡头区","abbreviated":"沙坡头区",
          "value": 4131
        },
        {

          "text": "中宁县","abbreviated":"中宁县",
          "value": 2553
        },
        {

          "text": "海原县","abbreviated":"海原县",
          "value": 2556
        }
      ],
      [
        {

          "text": "固原市原州区","abbreviated":"原州区",
          "value": 4125
        },
        {

          "text": "固原市","abbreviated":"固原市",
          "value": 2555
        },
        {

          "text": "西吉县","abbreviated":"西吉县",
          "value": 2557
        },
        {

          "text": "隆德县","abbreviated":"隆德县",
          "value": 2558
        },
        {

          "text": "泾源县","abbreviated":"泾源县",
          "value": 2559
        },
        {

          "text": "彭阳县","abbreviated":"彭阳县",
          "value": 2560
        }
      ]
    ],
    [
      [
        {

          "text": "乌鲁木齐市","abbreviated":"乌鲁木齐市",
          "value": 3373
        },
        {

          "text": "乌鲁木齐县","abbreviated":"乌鲁木齐县",
          "value": 3374
        },
        {

          "text": "乌鲁木齐市达坂城区","abbreviated":"达坂城区",
          "value": 4302
        },
        {

          "text": "乌鲁木齐市沙依巴克区","abbreviated":"沙依巴克区",
          "value": 4304
        },
        {

          "text": "乌鲁木齐市水磨沟区","abbreviated":"水磨沟区",
          "value": 4305
        },
        {

          "text": "乌鲁木齐市天山区","abbreviated":"天山区",
          "value": 4306
        },
        {

          "text": "乌鲁木齐市头屯河区","abbreviated":"头屯河区",
          "value": 4307
        },
        {

          "text": "乌鲁木齐市新市区","abbreviated":"新市区",
          "value": 4308
        },
        {

          "text": "乌鲁木齐市米东区","abbreviated":"米东区",
          "value": 4912
        },
        {

          "text": "乌鲁木齐市经济技术开发区","abbreviated":"经济技术开发区",
          "value": 4913
        },
        {

          "text": "乌鲁木齐市高新技术开发区","abbreviated":"高新技术开发区",
          "value": 4914
        }
      ],
      [
        {

          "text": "克拉玛依市","abbreviated":"克拉玛依市",
          "value": 3376
        },
        {

          "text": "克拉玛依市白碱滩区","abbreviated":"白碱滩区",
          "value": 4298
        },
        {

          "text": "克拉玛依市独山子区","abbreviated":"独山子区",
          "value": 4299
        },
        {

          "text": "克拉玛依市克拉玛依区","abbreviated":"克拉玛依区",
          "value": 4300
        },
        {

          "text": "克拉玛依市乌尔禾区","abbreviated":"乌尔禾区",
          "value": 4301
        }
      ],
      [
        {

          "text": "石河子市","abbreviated":"石河子市",
          "value": 3378
        }
      ],
      [
        {

          "text": "阿拉尔市","abbreviated":"阿拉尔市",
          "value": 3380
        }
      ],
      [
        {

          "text": "图木舒克市","abbreviated":"图木舒克市",
          "value": 3382
        }
      ],
      [
        {

          "text": "五家渠市","abbreviated":"五家渠市",
          "value": 3384
        }
      ],
      [
        {

          "text": "吐鲁番市","abbreviated":"吐鲁番市",
          "value": 3386
        },
        {

          "text": "托克逊县","abbreviated":"托克逊县",
          "value": 3387
        },
        {

          "text": "鄯善县","abbreviated":"鄯善县",
          "value": 3388
        }
      ],
      [
        {

          "text": "哈密市","abbreviated":"哈密市",
          "value": 3390
        },
        {

          "text": "伊吾县","abbreviated":"伊吾县",
          "value": 3391
        },
        {

          "text": "巴里坤哈萨克自治县","abbreviated":"巴里坤哈萨克自治县",
          "value": 3392
        }
      ],
      [
        {

          "text": "和田市","abbreviated":"和田市",
          "value": 3394
        },
        {

          "text": "和田县","abbreviated":"和田县",
          "value": 3395
        },
        {

          "text": "洛浦县","abbreviated":"洛浦县",
          "value": 3396
        },
        {

          "text": "民丰县","abbreviated":"民丰县",
          "value": 3397
        },
        {

          "text": "皮山县","abbreviated":"皮山县",
          "value": 3398
        },
        {

          "text": "策勒县","abbreviated":"策勒县",
          "value": 3399
        },
        {

          "text": "墨玉县","abbreviated":"墨玉县",
          "value": 3401
        },
        {

          "text": "于田县","abbreviated":"于田县",
          "value": 3400
        }
      ],
      [
        {

          "text": "阿克苏市","abbreviated":"阿克苏市",
          "value": 3403
        },
        {

          "text": "温宿县","abbreviated":"温宿县",
          "value": 3404
        },
        {

          "text": "沙雅县","abbreviated":"沙雅县",
          "value": 3405
        },
        {

          "text": "拜城县","abbreviated":"拜城县",
          "value": 3406
        },
        {

          "text": "阿瓦提县","abbreviated":"阿瓦提县",
          "value": 3407
        },
        {

          "text": "库车县","abbreviated":"库车县",
          "value": 3408
        },
        {

          "text": "柯坪县","abbreviated":"柯坪县",
          "value": 3409
        },
        {

          "text": "新和县","abbreviated":"新和县",
          "value": 3410
        },
        {

          "text": "乌什县","abbreviated":"乌什县",
          "value": 3411
        }
      ],
      [
        {

          "text": "阿图什市","abbreviated":"阿图什市",
          "value": 3426
        },
        {

          "text": "阿合奇县","abbreviated":"阿合奇县",
          "value": 3427
        },
        {

          "text": "乌恰县","abbreviated":"乌恰县",
          "value": 3428
        },
        {

          "text": "阿克陶县","abbreviated":"阿克陶县",
          "value": 3429
        }
      ],
      [
        {

          "text": "库尔勒市","abbreviated":"库尔勒市",
          "value": 3431
        },
        {

          "text": "和静县","abbreviated":"和静县",
          "value": 3432
        },
        {

          "text": "尉犁县","abbreviated":"尉犁县",
          "value": 3433
        },
        {

          "text": "和硕县","abbreviated":"和硕县",
          "value": 3434
        },
        {

          "text": "且末县","abbreviated":"且末县",
          "value": 3435
        },
        {

          "text": "博湖县","abbreviated":"博湖县",
          "value": 3436
        },
        {

          "text": "轮台县","abbreviated":"轮台县",
          "value": 3437
        },
        {

          "text": "若羌县","abbreviated":"若羌县",
          "value": 3438
        },
        {

          "text": "焉耆回族自治县","abbreviated":"焉耆回族自治县",
          "value": 3439
        }
      ],
      [
        {

          "text": "昌吉市","abbreviated":"昌吉市",
          "value": 3441
        },
        {

          "text": "阜康市","abbreviated":"阜康市",
          "value": 3442
        },
        {

          "text": "米泉市","abbreviated":"米泉市",
          "value": 3443
        },
        {

          "text": "奇台县","abbreviated":"奇台县",
          "value": 3444
        },
        {

          "text": "玛纳斯县","abbreviated":"玛纳斯县",
          "value": 3445
        },
        {

          "text": "吉木萨尔县","abbreviated":"吉木萨尔县",
          "value": 3446
        },
        {

          "text": "呼图壁县","abbreviated":"呼图壁县",
          "value": 3447
        },
        {

          "text": "木垒哈萨克自治县","abbreviated":"木垒哈萨克自治县",
          "value": 3448
        }
      ],
      [
        {

          "text": "博乐市","abbreviated":"博乐市",
          "value": 3450
        },
        {

          "text": "精河县","abbreviated":"精河县",
          "value": 3451
        },
        {

          "text": "温泉县","abbreviated":"温泉县",
          "value": 3452
        },
        {

          "text": "阿拉山口市","abbreviated":"阿拉山口市",
          "value": 4996
        }
      ],
      [
        {

          "text": "奎屯市","abbreviated":"奎屯市",
          "value": 3455
        },
        {

          "text": "伊宁县","abbreviated":"伊宁县",
          "value": 3456
        },
        {

          "text": "特克斯县","abbreviated":"特克斯县",
          "value": 3457
        },
        {

          "text": "尼勒克县","abbreviated":"尼勒克县",
          "value": 3458
        },
        {

          "text": "昭苏县","abbreviated":"昭苏县",
          "value": 3459
        },
        {

          "text": "新源县","abbreviated":"新源县",
          "value": 3460
        },
        {

          "text": "霍城县","abbreviated":"霍城县",
          "value": 3461
        },
        {

          "text": "巩留县","abbreviated":"巩留县",
          "value": 3462
        },
        {

          "text": "察布查尔锡伯自治县","abbreviated":"察布查尔锡伯自治县",
          "value": 3463
        },
        {

          "text": "伊宁市","abbreviated":"伊宁市",
          "value": 3454
        }
      ],
      [
        {

          "text": "喀什市","abbreviated":"喀什市",
          "value": 3413
        },
        {

          "text": "巴楚县","abbreviated":"巴楚县",
          "value": 3414
        },
        {

          "text": "泽普县","abbreviated":"泽普县",
          "value": 3415
        },
        {

          "text": "伽师县","abbreviated":"伽师县",
          "value": 3416
        },
        {

          "text": "叶城县","abbreviated":"叶城县",
          "value": 3417
        },
        {

          "text": "岳普湖县","abbreviated":"岳普湖县",
          "value": 3418
        },
        {

          "text": "疏勒县","abbreviated":"疏勒县",
          "value": 3419
        },
        {

          "text": "麦盖提县","abbreviated":"麦盖提县",
          "value": 3420
        },
        {

          "text": "英吉沙县","abbreviated":"英吉沙县",
          "value": 3421
        },
        {

          "text": "莎车县","abbreviated":"莎车县",
          "value": 3422
        },
        {

          "text": "疏附县","abbreviated":"疏附县",
          "value": 3423
        },
        {

          "text": "塔什库尔干塔吉克自治县","abbreviated":"塔什库尔干塔吉克自治县",
          "value": 3424
        }
      ],
      [
        {

          "text": "阿勒泰市","abbreviated":"阿勒泰市",
          "value": 3471
        },
        {

          "text": "青河县","abbreviated":"青河县",
          "value": 3472
        },
        {

          "text": "吉木乃县","abbreviated":"吉木乃县",
          "value": 3473
        },
        {

          "text": "富蕴县","abbreviated":"富蕴县",
          "value": 3474
        },
        {

          "text": "布尔津县","abbreviated":"布尔津县",
          "value": 3475
        },
        {

          "text": "福海县","abbreviated":"福海县",
          "value": 3476
        },
        {

          "text": "哈巴河县","abbreviated":"哈巴河县",
          "value": 3477
        }
      ],
      [
        {

          "text": "塔城市","abbreviated":"塔城市",
          "value": 3464
        },
        {

          "text": "乌苏市","abbreviated":"乌苏市",
          "value": 3465
        },
        {

          "text": "额敏县","abbreviated":"额敏县",
          "value": 3466
        },
        {

          "text": "沙湾县","abbreviated":"沙湾县",
          "value": 3468
        },
        {

          "text": "托里县","abbreviated":"托里县",
          "value": 3469
        },
        {

          "text": "和布克赛尔蒙古自治县","abbreviated":"和布克赛尔蒙古自治县",
          "value": 3470
        },
        {

          "text": "裕民县","abbreviated":"裕民县",
          "value": 3467
        }
      ]
    ],
    [
      [
        {

          "text": "台北市","abbreviated":"台北市",
          "value": 4902
        }
      ],
      [
        {

          "text": "高雄市","abbreviated":"高雄市",
          "value": 4904
        }
      ],
      [
        {

          "text": "新北市","abbreviated":"新北市",
          "value": 4860
        }
      ],
      [
        {

          "text": "基隆市","abbreviated":"基隆市",
          "value": 4892
        }
      ],
      [
        {

          "text": "新竹市","abbreviated":"新竹市",
          "value": 4894
        }
      ],
      [
        {

          "text": "台中市","abbreviated":"台中市",
          "value": 4896
        }
      ],
      [
        {

          "text": "嘉义市","abbreviated":"嘉义市",
          "value": 4898
        }
      ],
      [
        {

          "text": "台南市","abbreviated":"台南市",
          "value": 4900
        }
      ],
      [
        {

          "text": "桃园县","abbreviated":"桃园县",
          "value": 4864
        }
      ],
      [
        {

          "text": "新竹县","abbreviated":"新竹县",
          "value": 4866
        }
      ],
      [
        {

          "text": "苗栗县","abbreviated":"苗栗县",
          "value": 4868
        }
      ],
      [
        {

          "text": "台中县","abbreviated":"台中县",
          "value": 4870
        }
      ],
      [
        {

          "text": "彰化县","abbreviated":"彰化县",
          "value": 4872
        }
      ],
      [
        {

          "text": "南投县","abbreviated":"南投县",
          "value": 4874
        }
      ],
      [
        {

          "text": "云林县","abbreviated":"云林县",
          "value": 4876
        }
      ],
      [
        {

          "text": "嘉义县","abbreviated":"嘉义县",
          "value": 4878
        }
      ],
      [
        {

          "text": "台南县","abbreviated":"台南县",
          "value": 4880
        }
      ],
      [
        {

          "text": "高雄县","abbreviated":"高雄县",
          "value": 4882
        }
      ],
      [
        {

          "text": "屏东县","abbreviated":"屏东县",
          "value": 4884
        }
      ],
      [
        {

          "text": "宜兰县","abbreviated":"宜兰县",
          "value": 4862
        }
      ],
      [
        {

          "text": "花莲县","abbreviated":"花莲县",
          "value": 4888
        }
      ],
      [
        {

          "text": "台东县","abbreviated":"台东县",
          "value": 4886
        }
      ],
      [
        {

          "text": "澎湖县","abbreviated":"澎湖县",
          "value": 4890
        }
      ],
      [
        {

          "text": "金门","abbreviated":"金门",
          "value": 4906
        }
      ],
      [
        {

          "text": "连江","abbreviated":"连江",
          "value": 4908
        }
      ]
    ],
    [
      [
        {

          "text": "香港岛","abbreviated":"香港岛",
          "value": 4848
        }
      ],
      [
        {

          "text": "九龙","abbreviated":"九龙",
          "value": 4850
        }
      ],
      [
        {

          "text": "新界","abbreviated":"新界",
          "value": 4852
        }
      ]
    ],
    [
      [
        {

          "text": "澳门半岛","abbreviated":"澳门半岛",
          "value": 4855
        }
      ],
      [
        {

          "text": "澳门离岛","abbreviated":"澳门离岛",
          "value": 4857
        }
      ]
    ]
  ]
]

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Vue = __webpack_require__(1);
Vue.component('region-picker', __webpack_require__(6));
new Vue({
    el: '#container',
    data: function () {
        return {
            message: ''
        }
    },
    methods: {
        confirm(province, city, area){
            this.message = province.name + '/' + city.name + '/' + area.name;
        }
    }
});

/***/ })
/******/ ]);