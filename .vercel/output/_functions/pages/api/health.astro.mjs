import { e as commonjsGlobal, g as getDefaultExportFromCjs } from '../../chunks/astro/server_Bgp0AKMO.mjs';
import require$$0$4 from 'node:os';
import require$$0$3 from 'node:events';
import nativeFs from 'fs';
import require$$1 from 'events';
import require$$2 from 'util';
import require$$3 from 'path';
import require$$5 from 'assert';
import require$$2$1 from 'worker_threads';
import require$$0$2 from 'module';
import nodePath from 'node:path';
import require$$0$1 from 'url';
import require$$7 from 'buffer';
import * as Sentry from '@sentry/node';
export { renderers } from '../../renderers.mjs';

var pino$1 = {exports: {}};

var errHelpers;
var hasRequiredErrHelpers;

function requireErrHelpers () {
	if (hasRequiredErrHelpers) return errHelpers;
	hasRequiredErrHelpers = 1;

	// **************************************************************
	// * Code initially copied/adapted from "pony-cause" npm module *
	// * Please upstream improvements there                         *
	// **************************************************************

	const isErrorLike = (err) => {
	  return err && typeof err.message === 'string'
	};

	/**
	 * @param {Error|{ cause?: unknown|(()=>err)}} err
	 * @returns {Error|Object|undefined}
	 */
	const getErrorCause = (err) => {
	  if (!err) return

	  /** @type {unknown} */
	  // @ts-ignore
	  const cause = err.cause;

	  // VError / NError style causes
	  if (typeof cause === 'function') {
	    // @ts-ignore
	    const causeResult = err.cause();

	    return isErrorLike(causeResult)
	      ? causeResult
	      : undefined
	  } else {
	    return isErrorLike(cause)
	      ? cause
	      : undefined
	  }
	};

	/**
	 * Internal method that keeps a track of which error we have already added, to avoid circular recursion
	 *
	 * @private
	 * @param {Error} err
	 * @param {Set<Error>} seen
	 * @returns {string}
	 */
	const _stackWithCauses = (err, seen) => {
	  if (!isErrorLike(err)) return ''

	  const stack = err.stack || '';

	  // Ensure we don't go circular or crazily deep
	  if (seen.has(err)) {
	    return stack + '\ncauses have become circular...'
	  }

	  const cause = getErrorCause(err);

	  if (cause) {
	    seen.add(err);
	    return (stack + '\ncaused by: ' + _stackWithCauses(cause, seen))
	  } else {
	    return stack
	  }
	};

	/**
	 * @param {Error} err
	 * @returns {string}
	 */
	const stackWithCauses = (err) => _stackWithCauses(err, new Set());

	/**
	 * Internal method that keeps a track of which error we have already added, to avoid circular recursion
	 *
	 * @private
	 * @param {Error} err
	 * @param {Set<Error>} seen
	 * @param {boolean} [skip]
	 * @returns {string}
	 */
	const _messageWithCauses = (err, seen, skip) => {
	  if (!isErrorLike(err)) return ''

	  const message = skip ? '' : (err.message || '');

	  // Ensure we don't go circular or crazily deep
	  if (seen.has(err)) {
	    return message + ': ...'
	  }

	  const cause = getErrorCause(err);

	  if (cause) {
	    seen.add(err);

	    // @ts-ignore
	    const skipIfVErrorStyleCause = typeof err.cause === 'function';

	    return (message +
	      (skipIfVErrorStyleCause ? '' : ': ') +
	      _messageWithCauses(cause, seen, skipIfVErrorStyleCause))
	  } else {
	    return message
	  }
	};

	/**
	 * @param {Error} err
	 * @returns {string}
	 */
	const messageWithCauses = (err) => _messageWithCauses(err, new Set());

	errHelpers = {
	  isErrorLike,
	  getErrorCause,
	  stackWithCauses,
	  messageWithCauses
	};
	return errHelpers;
}

var errProto;
var hasRequiredErrProto;

function requireErrProto () {
	if (hasRequiredErrProto) return errProto;
	hasRequiredErrProto = 1;

	const seen = Symbol('circular-ref-tag');
	const rawSymbol = Symbol('pino-raw-err-ref');

	const pinoErrProto = Object.create({}, {
	  type: {
	    enumerable: true,
	    writable: true,
	    value: undefined
	  },
	  message: {
	    enumerable: true,
	    writable: true,
	    value: undefined
	  },
	  stack: {
	    enumerable: true,
	    writable: true,
	    value: undefined
	  },
	  aggregateErrors: {
	    enumerable: true,
	    writable: true,
	    value: undefined
	  },
	  raw: {
	    enumerable: false,
	    get: function () {
	      return this[rawSymbol]
	    },
	    set: function (val) {
	      this[rawSymbol] = val;
	    }
	  }
	});
	Object.defineProperty(pinoErrProto, rawSymbol, {
	  writable: true,
	  value: {}
	});

	errProto = {
	  pinoErrProto,
	  pinoErrorSymbols: {
	    seen,
	    rawSymbol
	  }
	};
	return errProto;
}

var err;
var hasRequiredErr;

function requireErr () {
	if (hasRequiredErr) return err;
	hasRequiredErr = 1;

	err = errSerializer;

	const { messageWithCauses, stackWithCauses, isErrorLike } = requireErrHelpers();
	const { pinoErrProto, pinoErrorSymbols } = requireErrProto();
	const { seen } = pinoErrorSymbols;

	const { toString } = Object.prototype;

	function errSerializer (err) {
	  if (!isErrorLike(err)) {
	    return err
	  }

	  err[seen] = undefined; // tag to prevent re-looking at this
	  const _err = Object.create(pinoErrProto);
	  _err.type = toString.call(err.constructor) === '[object Function]'
	    ? err.constructor.name
	    : err.name;
	  _err.message = messageWithCauses(err);
	  _err.stack = stackWithCauses(err);

	  if (Array.isArray(err.errors)) {
	    _err.aggregateErrors = err.errors.map(err => errSerializer(err));
	  }

	  for (const key in err) {
	    if (_err[key] === undefined) {
	      const val = err[key];
	      if (isErrorLike(val)) {
	        // We append cause messages and stacks to _err, therefore skipping causes here
	        if (key !== 'cause' && !Object.prototype.hasOwnProperty.call(val, seen)) {
	          _err[key] = errSerializer(val);
	        }
	      } else {
	        _err[key] = val;
	      }
	    }
	  }

	  delete err[seen]; // clean up tag in case err is serialized again later
	  _err.raw = err;
	  return _err
	}
	return err;
}

var errWithCause;
var hasRequiredErrWithCause;

function requireErrWithCause () {
	if (hasRequiredErrWithCause) return errWithCause;
	hasRequiredErrWithCause = 1;

	errWithCause = errWithCauseSerializer;

	const { isErrorLike } = requireErrHelpers();
	const { pinoErrProto, pinoErrorSymbols } = requireErrProto();
	const { seen } = pinoErrorSymbols;

	const { toString } = Object.prototype;

	function errWithCauseSerializer (err) {
	  if (!isErrorLike(err)) {
	    return err
	  }

	  err[seen] = undefined; // tag to prevent re-looking at this
	  const _err = Object.create(pinoErrProto);
	  _err.type = toString.call(err.constructor) === '[object Function]'
	    ? err.constructor.name
	    : err.name;
	  _err.message = err.message;
	  _err.stack = err.stack;

	  if (Array.isArray(err.errors)) {
	    _err.aggregateErrors = err.errors.map(err => errWithCauseSerializer(err));
	  }

	  if (isErrorLike(err.cause) && !Object.prototype.hasOwnProperty.call(err.cause, seen)) {
	    _err.cause = errWithCauseSerializer(err.cause);
	  }

	  for (const key in err) {
	    if (_err[key] === undefined) {
	      const val = err[key];
	      if (isErrorLike(val)) {
	        if (!Object.prototype.hasOwnProperty.call(val, seen)) {
	          _err[key] = errWithCauseSerializer(val);
	        }
	      } else {
	        _err[key] = val;
	      }
	    }
	  }

	  delete err[seen]; // clean up tag in case err is serialized again later
	  _err.raw = err;
	  return _err
	}
	return errWithCause;
}

var req;
var hasRequiredReq;

function requireReq () {
	if (hasRequiredReq) return req;
	hasRequiredReq = 1;

	req = {
	  mapHttpRequest,
	  reqSerializer
	};

	const rawSymbol = Symbol('pino-raw-req-ref');
	const pinoReqProto = Object.create({}, {
	  id: {
	    enumerable: true,
	    writable: true,
	    value: ''
	  },
	  method: {
	    enumerable: true,
	    writable: true,
	    value: ''
	  },
	  url: {
	    enumerable: true,
	    writable: true,
	    value: ''
	  },
	  query: {
	    enumerable: true,
	    writable: true,
	    value: ''
	  },
	  params: {
	    enumerable: true,
	    writable: true,
	    value: ''
	  },
	  headers: {
	    enumerable: true,
	    writable: true,
	    value: {}
	  },
	  remoteAddress: {
	    enumerable: true,
	    writable: true,
	    value: ''
	  },
	  remotePort: {
	    enumerable: true,
	    writable: true,
	    value: ''
	  },
	  raw: {
	    enumerable: false,
	    get: function () {
	      return this[rawSymbol]
	    },
	    set: function (val) {
	      this[rawSymbol] = val;
	    }
	  }
	});
	Object.defineProperty(pinoReqProto, rawSymbol, {
	  writable: true,
	  value: {}
	});

	function reqSerializer (req) {
	  // req.info is for hapi compat.
	  const connection = req.info || req.socket;
	  const _req = Object.create(pinoReqProto);
	  _req.id = (typeof req.id === 'function' ? req.id() : (req.id || (req.info ? req.info.id : undefined)));
	  _req.method = req.method;
	  // req.originalUrl is for expressjs compat.
	  if (req.originalUrl) {
	    _req.url = req.originalUrl;
	  } else {
	    const path = req.path;
	    // path for safe hapi compat.
	    _req.url = typeof path === 'string' ? path : (req.url ? req.url.path || req.url : undefined);
	  }

	  if (req.query) {
	    _req.query = req.query;
	  }

	  if (req.params) {
	    _req.params = req.params;
	  }

	  _req.headers = req.headers;
	  _req.remoteAddress = connection && connection.remoteAddress;
	  _req.remotePort = connection && connection.remotePort;
	  // req.raw is  for hapi compat/equivalence
	  _req.raw = req.raw || req;
	  return _req
	}

	function mapHttpRequest (req) {
	  return {
	    req: reqSerializer(req)
	  }
	}
	return req;
}

var res;
var hasRequiredRes;

function requireRes () {
	if (hasRequiredRes) return res;
	hasRequiredRes = 1;

	res = {
	  mapHttpResponse,
	  resSerializer
	};

	const rawSymbol = Symbol('pino-raw-res-ref');
	const pinoResProto = Object.create({}, {
	  statusCode: {
	    enumerable: true,
	    writable: true,
	    value: 0
	  },
	  headers: {
	    enumerable: true,
	    writable: true,
	    value: ''
	  },
	  raw: {
	    enumerable: false,
	    get: function () {
	      return this[rawSymbol]
	    },
	    set: function (val) {
	      this[rawSymbol] = val;
	    }
	  }
	});
	Object.defineProperty(pinoResProto, rawSymbol, {
	  writable: true,
	  value: {}
	});

	function resSerializer (res) {
	  const _res = Object.create(pinoResProto);
	  _res.statusCode = res.headersSent ? res.statusCode : null;
	  _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
	  _res.raw = res;
	  return _res
	}

	function mapHttpResponse (res) {
	  return {
	    res: resSerializer(res)
	  }
	}
	return res;
}

var pinoStdSerializers;
var hasRequiredPinoStdSerializers;

function requirePinoStdSerializers () {
	if (hasRequiredPinoStdSerializers) return pinoStdSerializers;
	hasRequiredPinoStdSerializers = 1;

	const errSerializer = requireErr();
	const errWithCauseSerializer = requireErrWithCause();
	const reqSerializers = requireReq();
	const resSerializers = requireRes();

	pinoStdSerializers = {
	  err: errSerializer,
	  errWithCause: errWithCauseSerializer,
	  mapHttpRequest: reqSerializers.mapHttpRequest,
	  mapHttpResponse: resSerializers.mapHttpResponse,
	  req: reqSerializers.reqSerializer,
	  res: resSerializers.resSerializer,

	  wrapErrorSerializer: function wrapErrorSerializer (customSerializer) {
	    if (customSerializer === errSerializer) return customSerializer
	    return function wrapErrSerializer (err) {
	      return customSerializer(errSerializer(err))
	    }
	  },

	  wrapRequestSerializer: function wrapRequestSerializer (customSerializer) {
	    if (customSerializer === reqSerializers.reqSerializer) return customSerializer
	    return function wrappedReqSerializer (req) {
	      return customSerializer(reqSerializers.reqSerializer(req))
	    }
	  },

	  wrapResponseSerializer: function wrapResponseSerializer (customSerializer) {
	    if (customSerializer === resSerializers.resSerializer) return customSerializer
	    return function wrappedResSerializer (res) {
	      return customSerializer(resSerializers.resSerializer(res))
	    }
	  }
	};
	return pinoStdSerializers;
}

var caller;
var hasRequiredCaller;

function requireCaller () {
	if (hasRequiredCaller) return caller;
	hasRequiredCaller = 1;

	function noOpPrepareStackTrace (_, stack) {
	  return stack
	}

	caller = function getCallers () {
	  const originalPrepare = Error.prepareStackTrace;
	  Error.prepareStackTrace = noOpPrepareStackTrace;
	  const stack = new Error().stack;
	  Error.prepareStackTrace = originalPrepare;

	  if (!Array.isArray(stack)) {
	    return undefined
	  }

	  const entries = stack.slice(2);

	  const fileNames = [];

	  for (const entry of entries) {
	    if (!entry) {
	      continue
	    }

	    fileNames.push(entry.getFileName());
	  }

	  return fileNames
	};
	return caller;
}

var validator_1;
var hasRequiredValidator;

function requireValidator () {
	if (hasRequiredValidator) return validator_1;
	hasRequiredValidator = 1;

	validator_1 = validator;

	function validator (opts = {}) {
	  const {
	    ERR_PATHS_MUST_BE_STRINGS = () => 'fast-redact - Paths must be (non-empty) strings',
	    ERR_INVALID_PATH = (s) => `fast-redact – Invalid path (${s})`
	  } = opts;

	  return function validate ({ paths }) {
	    paths.forEach((s) => {
	      if (typeof s !== 'string') {
	        throw Error(ERR_PATHS_MUST_BE_STRINGS())
	      }
	      try {
	        if (/〇/.test(s)) throw Error()
	        const expr = (s[0] === '[' ? '' : '.') + s.replace(/^\*/, '〇').replace(/\.\*/g, '.〇').replace(/\[\*\]/g, '[〇]');
	        if (/\n|\r|;/.test(expr)) throw Error()
	        if (/\/\*/.test(expr)) throw Error()
	        /* eslint-disable-next-line */
	        Function(`
            'use strict'
            const o = new Proxy({}, { get: () => o, set: () => { throw Error() } });
            const 〇 = null;
            o${expr}
            if ([o${expr}].length !== 1) throw Error()`)();
	      } catch (e) {
	        throw Error(ERR_INVALID_PATH(s))
	      }
	    });
	  }
	}
	return validator_1;
}

var rx;
var hasRequiredRx;

function requireRx () {
	if (hasRequiredRx) return rx;
	hasRequiredRx = 1;

	rx = /[^.[\]]+|\[((?:.)*?)\]/g;

	/*
	Regular expression explanation:

	Alt 1: /[^.[\]]+/ - Match one or more characters that are *not* a dot (.)
	                    opening square bracket ([) or closing square bracket (])

	Alt 2: /\[((?:.)*?)\]/ - If the char IS dot or square bracket, then create a capture
	                         group (which will be capture group $1) that matches anything
	                         within square brackets. Expansion is lazy so it will
	                         stop matching as soon as the first closing bracket is met `]`
	                         (rather than continuing to match until the final closing bracket).
	*/
	return rx;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;

	const rx = requireRx();

	parse_1 = parse;

	function parse ({ paths }) {
	  const wildcards = [];
	  var wcLen = 0;
	  const secret = paths.reduce(function (o, strPath, ix) {
	    var path = strPath.match(rx).map((p) => p.replace(/'|"|`/g, ''));
	    const leadingBracket = strPath[0] === '[';
	    path = path.map((p) => {
	      if (p[0] === '[') return p.substr(1, p.length - 2)
	      else return p
	    });
	    const star = path.indexOf('*');
	    if (star > -1) {
	      const before = path.slice(0, star);
	      const beforeStr = before.join('.');
	      const after = path.slice(star + 1, path.length);
	      const nested = after.length > 0;
	      wcLen++;
	      wildcards.push({
	        before,
	        beforeStr,
	        after,
	        nested
	      });
	    } else {
	      o[strPath] = {
	        path: path,
	        val: undefined,
	        precensored: false,
	        circle: '',
	        escPath: JSON.stringify(strPath),
	        leadingBracket: leadingBracket
	      };
	    }
	    return o
	  }, {});

	  return { wildcards, wcLen, secret }
	}
	return parse_1;
}

var redactor_1;
var hasRequiredRedactor;

function requireRedactor () {
	if (hasRequiredRedactor) return redactor_1;
	hasRequiredRedactor = 1;

	const rx = requireRx();

	redactor_1 = redactor;

	function redactor ({ secret, serialize, wcLen, strict, isCensorFct, censorFctTakesPath }, state) {
	  /* eslint-disable-next-line */
	  const redact = Function('o', `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    const originalSecret = {}
    const secretKeys = Object.keys(secret)
    for (var i = 0; i < secretKeys.length; i++) {
      originalSecret[secretKeys[i]] = secret[secretKeys[i]]
    }

    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    this.secret = originalSecret
    ${resultTmpl(serialize)}
  `).bind(state);

	  redact.state = state;

	  if (serialize === false) {
	    redact.restore = (o) => state.restore(o);
	  }

	  return redact
	}

	function redactTmpl (secret, isCensorFct, censorFctTakesPath) {
	  return Object.keys(secret).map((path) => {
	    const { escPath, leadingBracket, path: arrPath } = secret[path];
	    const skip = leadingBracket ? 1 : 0;
	    const delim = leadingBracket ? '' : '.';
	    const hops = [];
	    var match;
	    while ((match = rx.exec(path)) !== null) {
	      const [ , ix ] = match;
	      const { index, input } = match;
	      if (index > skip) hops.push(input.substring(0, index - (ix ? 0 : 1)));
	    }
	    var existence = hops.map((p) => `o${delim}${p}`).join(' && ');
	    if (existence.length === 0) existence += `o${delim}${path} != null`;
	    else existence += ` && o${delim}${path} != null`;

	    const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p) => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join('\n')}
      }
    `;

	    const censorArgs = censorFctTakesPath
	      ? `val, ${JSON.stringify(arrPath)}`
	      : `val`;

	    return `
      if (${existence}) {
        const val = o${delim}${path}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path} = ${isCensorFct ? `censor(${censorArgs})` : 'censor'}
          ${circularDetection}
        }
      }
    `
	  }).join('\n')
	}

	function dynamicRedactTmpl (hasWildcards, isCensorFct, censorFctTakesPath) {
	  return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : ''
	}

	function resultTmpl (serialize) {
	  return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `
	}

	function strictImpl (strict, serialize) {
	  return strict === true
	    ? `throw Error('fast-redact: primitives cannot be redacted')`
	    : serialize === false ? `return o` : `return this.serialize(o)`
	}
	return redactor_1;
}

var modifiers;
var hasRequiredModifiers;

function requireModifiers () {
	if (hasRequiredModifiers) return modifiers;
	hasRequiredModifiers = 1;

	modifiers = {
	  groupRedact,
	  groupRestore,
	  nestedRedact,
	  nestedRestore
	};

	function groupRestore ({ keys, values, target }) {
	  if (target == null || typeof target === 'string') return
	  const length = keys.length;
	  for (var i = 0; i < length; i++) {
	    const k = keys[i];
	    target[k] = values[i];
	  }
	}

	function groupRedact (o, path, censor, isCensorFct, censorFctTakesPath) {
	  const target = get(o, path);
	  if (target == null || typeof target === 'string') return { keys: null, values: null, target, flat: true }
	  const keys = Object.keys(target);
	  const keysLength = keys.length;
	  const pathLength = path.length;
	  const pathWithKey = censorFctTakesPath ? [...path] : undefined;
	  const values = new Array(keysLength);

	  for (var i = 0; i < keysLength; i++) {
	    const key = keys[i];
	    values[i] = target[key];

	    if (censorFctTakesPath) {
	      pathWithKey[pathLength] = key;
	      target[key] = censor(target[key], pathWithKey);
	    } else if (isCensorFct) {
	      target[key] = censor(target[key]);
	    } else {
	      target[key] = censor;
	    }
	  }
	  return { keys, values, target, flat: true }
	}

	/**
	 * @param {RestoreInstruction[]} instructions a set of instructions for restoring values to objects
	 */
	function nestedRestore (instructions) {
	  for (let i = 0; i < instructions.length; i++) {
	    const { target, path, value } = instructions[i];
	    let current = target;
	    for (let i = path.length - 1; i > 0; i--) {
	      current = current[path[i]];
	    }
	    current[path[0]] = value;
	  }
	}

	function nestedRedact (store, o, path, ns, censor, isCensorFct, censorFctTakesPath) {
	  const target = get(o, path);
	  if (target == null) return
	  const keys = Object.keys(target);
	  const keysLength = keys.length;
	  for (var i = 0; i < keysLength; i++) {
	    const key = keys[i];
	    specialSet(store, target, key, path, ns, censor, isCensorFct, censorFctTakesPath);
	  }
	  return store
	}

	function has (obj, prop) {
	  return obj !== undefined && obj !== null
	    ? ('hasOwn' in Object ? Object.hasOwn(obj, prop) : Object.prototype.hasOwnProperty.call(obj, prop))
	    : false
	}

	function specialSet (store, o, k, path, afterPath, censor, isCensorFct, censorFctTakesPath) {
	  const afterPathLen = afterPath.length;
	  const lastPathIndex = afterPathLen - 1;
	  const originalKey = k;
	  var i = -1;
	  var n;
	  var nv;
	  var ov;
	  var wc = null;
	  var kIsWc;
	  var wcov;
	  var consecutive = false;
	  var level = 0;
	  // need to track depth of the `redactPath` tree
	  var depth = 0;
	  var redactPathCurrent = tree();
	  ov = n = o[k];
	  if (typeof n !== 'object') return
	  while (n != null && ++i < afterPathLen) {
	    depth += 1;
	    k = afterPath[i];
	    if (k !== '*' && !wc && !(typeof n === 'object' && k in n)) {
	      break
	    }
	    if (k === '*') {
	      if (wc === '*') {
	        consecutive = true;
	      }
	      wc = k;
	      if (i !== lastPathIndex) {
	        continue
	      }
	    }
	    if (wc) {
	      const wcKeys = Object.keys(n);
	      for (var j = 0; j < wcKeys.length; j++) {
	        const wck = wcKeys[j];
	        wcov = n[wck];
	        kIsWc = k === '*';
	        if (consecutive) {
	          redactPathCurrent = node(redactPathCurrent, wck, depth);
	          level = i;
	          ov = iterateNthLevel(wcov, level - 1, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, o[originalKey], depth + 1);
	        } else {
	          if (kIsWc || (typeof wcov === 'object' && wcov !== null && k in wcov)) {
	            if (kIsWc) {
	              ov = wcov;
	            } else {
	              ov = wcov[k];
	            }
	            nv = (i !== lastPathIndex)
	              ? ov
	              : (isCensorFct
	                ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
	                : censor);
	            if (kIsWc) {
	              const rv = restoreInstr(node(redactPathCurrent, wck, depth), ov, o[originalKey]);
	              store.push(rv);
	              n[wck] = nv;
	            } else {
	              if (wcov[k] === nv) ; else if ((nv === undefined && censor !== undefined) || (has(wcov, k) && nv === ov)) {
	                redactPathCurrent = node(redactPathCurrent, wck, depth);
	              } else {
	                redactPathCurrent = node(redactPathCurrent, wck, depth);
	                const rv = restoreInstr(node(redactPathCurrent, k, depth + 1), ov, o[originalKey]);
	                store.push(rv);
	                wcov[k] = nv;
	              }
	            }
	          }
	        }
	      }
	      wc = null;
	    } else {
	      ov = n[k];
	      redactPathCurrent = node(redactPathCurrent, k, depth);
	      nv = (i !== lastPathIndex)
	        ? ov
	        : (isCensorFct
	          ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
	          : censor);
	      if ((has(n, k) && nv === ov) || (nv === undefined && censor !== undefined)) ; else {
	        const rv = restoreInstr(redactPathCurrent, ov, o[originalKey]);
	        store.push(rv);
	        n[k] = nv;
	      }
	      n = n[k];
	    }
	    if (typeof n !== 'object') break
	  }
	}

	function get (o, p) {
	  var i = -1;
	  var l = p.length;
	  var n = o;
	  while (n != null && ++i < l) {
	    n = n[p[i]];
	  }
	  return n
	}

	function iterateNthLevel (wcov, level, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, parent, depth) {
	  if (level === 0) {
	    if (kIsWc || (typeof wcov === 'object' && wcov !== null && k in wcov)) {
	      if (kIsWc) {
	        ov = wcov;
	      } else {
	        ov = wcov[k];
	      }
	      nv = (i !== lastPathIndex)
	        ? ov
	        : (isCensorFct
	          ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
	          : censor);
	      if (kIsWc) {
	        const rv = restoreInstr(redactPathCurrent, ov, parent);
	        store.push(rv);
	        n[wck] = nv;
	      } else {
	        if (wcov[k] === nv) ; else if ((nv === undefined && censor !== undefined) || (has(wcov, k) && nv === ov)) ; else {
	          const rv = restoreInstr(node(redactPathCurrent, k, depth + 1), ov, parent);
	          store.push(rv);
	          wcov[k] = nv;
	        }
	      }
	    }
	  }
	  for (const key in wcov) {
	    if (typeof wcov[key] === 'object') {
	      redactPathCurrent = node(redactPathCurrent, key, depth);
	      iterateNthLevel(wcov[key], level - 1, k, path, afterPath, censor, isCensorFct, censorFctTakesPath, originalKey, n, nv, ov, kIsWc, wck, i, lastPathIndex, redactPathCurrent, store, parent, depth + 1);
	    }
	  }
	}

	/**
	 * @typedef {object} TreeNode
	 * @prop {TreeNode} [parent] reference to the parent of this node in the tree, or `null` if there is no parent
	 * @prop {string} key the key that this node represents (key here being part of the path being redacted
	 * @prop {TreeNode[]} children the child nodes of this node
	 * @prop {number} depth the depth of this node in the tree
	 */

	/**
	 * instantiate a new, empty tree
	 * @returns {TreeNode}
	 */
	function tree () {
	  return { parent: null, key: null, children: [], depth: 0 }
	}

	/**
	 * creates a new node in the tree, attaching it as a child of the provided parent node
	 * if the specified depth matches the parent depth, adds the new node as a _sibling_ of the parent instead
	  * @param {TreeNode} parent the parent node to add a new node to (if the parent depth matches the provided `depth` value, will instead add as a sibling of this
	  * @param {string} key the key that the new node represents (key here being part of the path being redacted)
	  * @param {number} depth the depth of the new node in the tree - used to determing whether to add the new node as a child or sibling of the provided `parent` node
	  * @returns {TreeNode} a reference to the newly created node in the tree
	 */
	function node (parent, key, depth) {
	  if (parent.depth === depth) {
	    return node(parent.parent, key, depth)
	  }

	  var child = {
	    parent,
	    key,
	    depth,
	    children: []
	  };

	  parent.children.push(child);

	  return child
	}

	/**
	 * @typedef {object} RestoreInstruction
	 * @prop {string[]} path a reverse-order path that can be used to find the correct insertion point to restore a `value` for the given `parent` object
	 * @prop {*} value the value to restore
	 * @prop {object} target the object to restore the `value` in
	 */

	/**
	 * create a restore instruction for the given redactPath node
	 * generates a path in reverse order by walking up the redactPath tree
	 * @param {TreeNode} node a tree node that should be at the bottom of the redact path (i.e. have no children) - this will be used to walk up the redact path tree to construct the path needed to restore
	 * @param {*} value the value to restore
	 * @param {object} target a reference to the parent object to apply the restore instruction to
	 * @returns {RestoreInstruction} an instruction used to restore a nested value for a specific object
	 */
	function restoreInstr (node, value, target) {
	  let current = node;
	  const path = [];
	  do {
	    path.push(current.key);
	    current = current.parent;
	  } while (current.parent != null)

	  return { path, value, target }
	}
	return modifiers;
}

var restorer_1;
var hasRequiredRestorer;

function requireRestorer () {
	if (hasRequiredRestorer) return restorer_1;
	hasRequiredRestorer = 1;

	const { groupRestore, nestedRestore } = requireModifiers();

	restorer_1 = restorer;

	function restorer () {
	  return function compileRestore () {
	    if (this.restore) {
	      this.restore.state.secret = this.secret;
	      return
	    }
	    const { secret, wcLen } = this;
	    const paths = Object.keys(secret);
	    const resetters = resetTmpl(secret, paths);
	    const hasWildcards = wcLen > 0;
	    const state = hasWildcards ? { secret, groupRestore, nestedRestore } : { secret };
	    /* eslint-disable-next-line */
	    this.restore = Function(
	      'o',
	      restoreTmpl(resetters, paths, hasWildcards)
	    ).bind(state);
	    this.restore.state = state;
	  }
	}

	/**
	 * Mutates the original object to be censored by restoring its original values
	 * prior to censoring.
	 *
	 * @param {object} secret Compiled object describing which target fields should
	 * be censored and the field states.
	 * @param {string[]} paths The list of paths to censor as provided at
	 * initialization time.
	 *
	 * @returns {string} String of JavaScript to be used by `Function()`. The
	 * string compiles to the function that does the work in the description.
	 */
	function resetTmpl (secret, paths) {
	  return paths.map((path) => {
	    const { circle, escPath, leadingBracket } = secret[path];
	    const delim = leadingBracket ? '' : '.';
	    const reset = circle
	      ? `o.${circle} = secret[${escPath}].val`
	      : `o${delim}${path} = secret[${escPath}].val`;
	    const clear = `secret[${escPath}].val = undefined`;
	    return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `
	  }).join('')
	}

	/**
	 * Creates the body of the restore function
	 *
	 * Restoration of the redacted object happens
	 * backwards, in reverse order of redactions,
	 * so that repeated redactions on the same object
	 * property can be eventually rolled back to the
	 * original value.
	 *
	 * This way dynamic redactions are restored first,
	 * starting from the last one working backwards and
	 * followed by the static ones.
	 *
	 * @returns {string} the body of the restore function
	 */
	function restoreTmpl (resetters, paths, hasWildcards) {
	  const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o) {
        if (o.flat === true) this.groupRestore(o)
        else this.nestedRestore(o)
        secret[k] = null
      }
    }
  ` : '';

	  return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `
	}
	return restorer_1;
}

var state_1;
var hasRequiredState;

function requireState () {
	if (hasRequiredState) return state_1;
	hasRequiredState = 1;

	state_1 = state;

	function state (o) {
	  const {
	    secret,
	    censor,
	    compileRestore,
	    serialize,
	    groupRedact,
	    nestedRedact,
	    wildcards,
	    wcLen
	  } = o;
	  const builder = [{ secret, censor, compileRestore }];
	  if (serialize !== false) builder.push({ serialize });
	  if (wcLen > 0) builder.push({ groupRedact, nestedRedact, wildcards, wcLen });
	  return Object.assign(...builder)
	}
	return state_1;
}

var fastRedact_1;
var hasRequiredFastRedact;

function requireFastRedact () {
	if (hasRequiredFastRedact) return fastRedact_1;
	hasRequiredFastRedact = 1;

	const validator = requireValidator();
	const parse = requireParse();
	const redactor = requireRedactor();
	const restorer = requireRestorer();
	const { groupRedact, nestedRedact } = requireModifiers();
	const state = requireState();
	const rx = requireRx();
	const validate = validator();
	const noop = (o) => o;
	noop.restore = noop;

	const DEFAULT_CENSOR = '[REDACTED]';
	fastRedact.rx = rx;
	fastRedact.validator = validator;

	fastRedact_1 = fastRedact;

	function fastRedact (opts = {}) {
	  const paths = Array.from(new Set(opts.paths || []));
	  const serialize = 'serialize' in opts ? (
	    opts.serialize === false ? opts.serialize
	      : (typeof opts.serialize === 'function' ? opts.serialize : JSON.stringify)
	  ) : JSON.stringify;
	  const remove = opts.remove;
	  if (remove === true && serialize !== JSON.stringify) {
	    throw Error('fast-redact – remove option may only be set when serializer is JSON.stringify')
	  }
	  const censor = remove === true
	    ? undefined
	    : 'censor' in opts ? opts.censor : DEFAULT_CENSOR;

	  const isCensorFct = typeof censor === 'function';
	  const censorFctTakesPath = isCensorFct && censor.length > 1;

	  if (paths.length === 0) return serialize || noop

	  validate({ paths, serialize, censor });

	  const { wildcards, wcLen, secret } = parse({ paths, censor });

	  const compileRestore = restorer();
	  const strict = 'strict' in opts ? opts.strict : true;

	  return redactor({ secret, wcLen, serialize, strict, isCensorFct, censorFctTakesPath }, state({
	    secret,
	    censor,
	    compileRestore,
	    serialize,
	    groupRedact,
	    nestedRedact,
	    wildcards,
	    wcLen
	  }))
	}
	return fastRedact_1;
}

var symbols;
var hasRequiredSymbols;

function requireSymbols () {
	if (hasRequiredSymbols) return symbols;
	hasRequiredSymbols = 1;

	const setLevelSym = Symbol('pino.setLevel');
	const getLevelSym = Symbol('pino.getLevel');
	const levelValSym = Symbol('pino.levelVal');
	const levelCompSym = Symbol('pino.levelComp');
	const useLevelLabelsSym = Symbol('pino.useLevelLabels');
	const useOnlyCustomLevelsSym = Symbol('pino.useOnlyCustomLevels');
	const mixinSym = Symbol('pino.mixin');

	const lsCacheSym = Symbol('pino.lsCache');
	const chindingsSym = Symbol('pino.chindings');

	const asJsonSym = Symbol('pino.asJson');
	const writeSym = Symbol('pino.write');
	const redactFmtSym = Symbol('pino.redactFmt');

	const timeSym = Symbol('pino.time');
	const timeSliceIndexSym = Symbol('pino.timeSliceIndex');
	const streamSym = Symbol('pino.stream');
	const stringifySym = Symbol('pino.stringify');
	const stringifySafeSym = Symbol('pino.stringifySafe');
	const stringifiersSym = Symbol('pino.stringifiers');
	const endSym = Symbol('pino.end');
	const formatOptsSym = Symbol('pino.formatOpts');
	const messageKeySym = Symbol('pino.messageKey');
	const errorKeySym = Symbol('pino.errorKey');
	const nestedKeySym = Symbol('pino.nestedKey');
	const nestedKeyStrSym = Symbol('pino.nestedKeyStr');
	const mixinMergeStrategySym = Symbol('pino.mixinMergeStrategy');
	const msgPrefixSym = Symbol('pino.msgPrefix');

	const wildcardFirstSym = Symbol('pino.wildcardFirst');

	// public symbols, no need to use the same pino
	// version for these
	const serializersSym = Symbol.for('pino.serializers');
	const formattersSym = Symbol.for('pino.formatters');
	const hooksSym = Symbol.for('pino.hooks');
	const needsMetadataGsym = Symbol.for('pino.metadata');

	symbols = {
	  setLevelSym,
	  getLevelSym,
	  levelValSym,
	  levelCompSym,
	  useLevelLabelsSym,
	  mixinSym,
	  lsCacheSym,
	  chindingsSym,
	  asJsonSym,
	  writeSym,
	  serializersSym,
	  redactFmtSym,
	  timeSym,
	  timeSliceIndexSym,
	  streamSym,
	  stringifySym,
	  stringifySafeSym,
	  stringifiersSym,
	  endSym,
	  formatOptsSym,
	  messageKeySym,
	  errorKeySym,
	  nestedKeySym,
	  wildcardFirstSym,
	  needsMetadataGsym,
	  useOnlyCustomLevelsSym,
	  formattersSym,
	  hooksSym,
	  nestedKeyStrSym,
	  mixinMergeStrategySym,
	  msgPrefixSym
	};
	return symbols;
}

var redaction_1;
var hasRequiredRedaction;

function requireRedaction () {
	if (hasRequiredRedaction) return redaction_1;
	hasRequiredRedaction = 1;

	const fastRedact = requireFastRedact();
	const { redactFmtSym, wildcardFirstSym } = requireSymbols();
	const { rx, validator } = fastRedact;

	const validate = validator({
	  ERR_PATHS_MUST_BE_STRINGS: () => 'pino – redacted paths must be strings',
	  ERR_INVALID_PATH: (s) => `pino – redact paths array contains an invalid path (${s})`
	});

	const CENSOR = '[Redacted]';
	const strict = false; // TODO should this be configurable?

	function redaction (opts, serialize) {
	  const { paths, censor } = handle(opts);

	  const shape = paths.reduce((o, str) => {
	    rx.lastIndex = 0;
	    const first = rx.exec(str);
	    const next = rx.exec(str);

	    // ns is the top-level path segment, brackets + quoting removed.
	    let ns = first[1] !== undefined
	      ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, '$1')
	      : first[0];

	    if (ns === '*') {
	      ns = wildcardFirstSym;
	    }

	    // top level key:
	    if (next === null) {
	      o[ns] = null;
	      return o
	    }

	    // path with at least two segments:
	    // if ns is already redacted at the top level, ignore lower level redactions
	    if (o[ns] === null) {
	      return o
	    }

	    const { index } = next;
	    const nextPath = `${str.substr(index, str.length - 1)}`;

	    o[ns] = o[ns] || [];

	    // shape is a mix of paths beginning with literal values and wildcard
	    // paths [ "a.b.c", "*.b.z" ] should reduce to a shape of
	    // { "a": [ "b.c", "b.z" ], *: [ "b.z" ] }
	    // note: "b.z" is in both "a" and * arrays because "a" matches the wildcard.
	    // (* entry has wildcardFirstSym as key)
	    if (ns !== wildcardFirstSym && o[ns].length === 0) {
	      // first time ns's get all '*' redactions so far
	      o[ns].push(...(o[wildcardFirstSym] || []));
	    }

	    if (ns === wildcardFirstSym) {
	      // new * path gets added to all previously registered literal ns's.
	      Object.keys(o).forEach(function (k) {
	        if (o[k]) {
	          o[k].push(nextPath);
	        }
	      });
	    }

	    o[ns].push(nextPath);
	    return o
	  }, {});

	  // the redactor assigned to the format symbol key
	  // provides top level redaction for instances where
	  // an object is interpolated into the msg string
	  const result = {
	    [redactFmtSym]: fastRedact({ paths, censor, serialize, strict })
	  };

	  const topCensor = (...args) => {
	    return typeof censor === 'function' ? serialize(censor(...args)) : serialize(censor)
	  };

	  return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
	    // top level key:
	    if (shape[k] === null) {
	      o[k] = (value) => topCensor(value, [k]);
	    } else {
	      const wrappedCensor = typeof censor === 'function'
	        ? (value, path) => {
	            return censor(value, [k, ...path])
	          }
	        : censor;
	      o[k] = fastRedact({
	        paths: shape[k],
	        censor: wrappedCensor,
	        serialize,
	        strict
	      });
	    }
	    return o
	  }, result)
	}

	function handle (opts) {
	  if (Array.isArray(opts)) {
	    opts = { paths: opts, censor: CENSOR };
	    validate(opts);
	    return opts
	  }
	  let { paths, censor = CENSOR, remove } = opts;
	  if (Array.isArray(paths) === false) { throw Error('pino – redact must contain an array of strings') }
	  if (remove === true) censor = undefined;
	  validate({ paths, censor });

	  return { paths, censor }
	}

	redaction_1 = redaction;
	return redaction_1;
}

var time;
var hasRequiredTime;

function requireTime () {
	if (hasRequiredTime) return time;
	hasRequiredTime = 1;

	const nullTime = () => '';

	const epochTime = () => `,"time":${Date.now()}`;

	const unixTime = () => `,"time":${Math.round(Date.now() / 1000.0)}`;

	const isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`; // using Date.now() for testability

	time = { nullTime, epochTime, unixTime, isoTime };
	return time;
}

var quickFormatUnescaped;
var hasRequiredQuickFormatUnescaped;

function requireQuickFormatUnescaped () {
	if (hasRequiredQuickFormatUnescaped) return quickFormatUnescaped;
	hasRequiredQuickFormatUnescaped = 1;
	function tryStringify (o) {
	  try { return JSON.stringify(o) } catch(e) { return '"[Circular]"' }
	}

	quickFormatUnescaped = format;

	function format(f, args, opts) {
	  var ss = (opts && opts.stringify) || tryStringify;
	  var offset = 1;
	  if (typeof f === 'object' && f !== null) {
	    var len = args.length + offset;
	    if (len === 1) return f
	    var objects = new Array(len);
	    objects[0] = ss(f);
	    for (var index = 1; index < len; index++) {
	      objects[index] = ss(args[index]);
	    }
	    return objects.join(' ')
	  }
	  if (typeof f !== 'string') {
	    return f
	  }
	  var argLen = args.length;
	  if (argLen === 0) return f
	  var str = '';
	  var a = 1 - offset;
	  var lastPos = -1;
	  var flen = (f && f.length) || 0;
	  for (var i = 0; i < flen;) {
	    if (f.charCodeAt(i) === 37 && i + 1 < flen) {
	      lastPos = lastPos > -1 ? lastPos : 0;
	      switch (f.charCodeAt(i + 1)) {
	        case 100: // 'd'
	        case 102: // 'f'
	          if (a >= argLen)
	            break
	          if (args[a] == null)  break
	          if (lastPos < i)
	            str += f.slice(lastPos, i);
	          str += Number(args[a]);
	          lastPos = i + 2;
	          i++;
	          break
	        case 105: // 'i'
	          if (a >= argLen)
	            break
	          if (args[a] == null)  break
	          if (lastPos < i)
	            str += f.slice(lastPos, i);
	          str += Math.floor(Number(args[a]));
	          lastPos = i + 2;
	          i++;
	          break
	        case 79: // 'O'
	        case 111: // 'o'
	        case 106: // 'j'
	          if (a >= argLen)
	            break
	          if (args[a] === undefined) break
	          if (lastPos < i)
	            str += f.slice(lastPos, i);
	          var type = typeof args[a];
	          if (type === 'string') {
	            str += '\'' + args[a] + '\'';
	            lastPos = i + 2;
	            i++;
	            break
	          }
	          if (type === 'function') {
	            str += args[a].name || '<anonymous>';
	            lastPos = i + 2;
	            i++;
	            break
	          }
	          str += ss(args[a]);
	          lastPos = i + 2;
	          i++;
	          break
	        case 115: // 's'
	          if (a >= argLen)
	            break
	          if (lastPos < i)
	            str += f.slice(lastPos, i);
	          str += String(args[a]);
	          lastPos = i + 2;
	          i++;
	          break
	        case 37: // '%'
	          if (lastPos < i)
	            str += f.slice(lastPos, i);
	          str += '%';
	          lastPos = i + 2;
	          i++;
	          a--;
	          break
	      }
	      ++a;
	    }
	    ++i;
	  }
	  if (lastPos === -1)
	    return f
	  else if (lastPos < flen) {
	    str += f.slice(lastPos);
	  }

	  return str
	}
	return quickFormatUnescaped;
}

var atomicSleep = {exports: {}};

var hasRequiredAtomicSleep;

function requireAtomicSleep () {
	if (hasRequiredAtomicSleep) return atomicSleep.exports;
	hasRequiredAtomicSleep = 1;

	/* global SharedArrayBuffer, Atomics */

	if (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined') {
	  const nil = new Int32Array(new SharedArrayBuffer(4));

	  function sleep (ms) {
	    // also filters out NaN, non-number types, including empty strings, but allows bigints
	    const valid = ms > 0 && ms < Infinity; 
	    if (valid === false) {
	      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
	        throw TypeError('sleep: ms must be a number')
	      }
	      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
	    }

	    Atomics.wait(nil, 0, 0, Number(ms));
	  }
	  atomicSleep.exports = sleep;
	} else {

	  function sleep (ms) {
	    // also filters out NaN, non-number types, including empty strings, but allows bigints
	    const valid = ms > 0 && ms < Infinity; 
	    if (valid === false) {
	      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
	        throw TypeError('sleep: ms must be a number')
	      }
	      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
	    }
	  }

	  atomicSleep.exports = sleep;

	}
	return atomicSleep.exports;
}

var sonicBoom;
var hasRequiredSonicBoom;

function requireSonicBoom () {
	if (hasRequiredSonicBoom) return sonicBoom;
	hasRequiredSonicBoom = 1;

	const fs = nativeFs;
	const EventEmitter = require$$1;
	const inherits = require$$2.inherits;
	const path = require$$3;
	const sleep = requireAtomicSleep();
	const assert = require$$5;

	const BUSY_WRITE_TIMEOUT = 100;
	const kEmptyBuffer = Buffer.allocUnsafe(0);

	// 16 KB. Don't write more than docker buffer size.
	// https://github.com/moby/moby/blob/513ec73831269947d38a644c278ce3cac36783b2/daemon/logger/copier.go#L13
	const MAX_WRITE = 16 * 1024;

	const kContentModeBuffer = 'buffer';
	const kContentModeUtf8 = 'utf8';

	const [major, minor] = (process.versions.node || '0.0').split('.').map(Number);
	const kCopyBuffer = major >= 22 && minor >= 7;

	function openFile (file, sonic) {
	  sonic._opening = true;
	  sonic._writing = true;
	  sonic._asyncDrainScheduled = false;

	  // NOTE: 'error' and 'ready' events emitted below only relevant when sonic.sync===false
	  // for sync mode, there is no way to add a listener that will receive these

	  function fileOpened (err, fd) {
	    if (err) {
	      sonic._reopening = false;
	      sonic._writing = false;
	      sonic._opening = false;

	      if (sonic.sync) {
	        process.nextTick(() => {
	          if (sonic.listenerCount('error') > 0) {
	            sonic.emit('error', err);
	          }
	        });
	      } else {
	        sonic.emit('error', err);
	      }
	      return
	    }

	    const reopening = sonic._reopening;

	    sonic.fd = fd;
	    sonic.file = file;
	    sonic._reopening = false;
	    sonic._opening = false;
	    sonic._writing = false;

	    if (sonic.sync) {
	      process.nextTick(() => sonic.emit('ready'));
	    } else {
	      sonic.emit('ready');
	    }

	    if (sonic.destroyed) {
	      return
	    }

	    // start
	    if ((!sonic._writing && sonic._len > sonic.minLength) || sonic._flushPending) {
	      sonic._actualWrite();
	    } else if (reopening) {
	      process.nextTick(() => sonic.emit('drain'));
	    }
	  }

	  const flags = sonic.append ? 'a' : 'w';
	  const mode = sonic.mode;

	  if (sonic.sync) {
	    try {
	      if (sonic.mkdir) fs.mkdirSync(path.dirname(file), { recursive: true });
	      const fd = fs.openSync(file, flags, mode);
	      fileOpened(null, fd);
	    } catch (err) {
	      fileOpened(err);
	      throw err
	    }
	  } else if (sonic.mkdir) {
	    fs.mkdir(path.dirname(file), { recursive: true }, (err) => {
	      if (err) return fileOpened(err)
	      fs.open(file, flags, mode, fileOpened);
	    });
	  } else {
	    fs.open(file, flags, mode, fileOpened);
	  }
	}

	function SonicBoom (opts) {
	  if (!(this instanceof SonicBoom)) {
	    return new SonicBoom(opts)
	  }

	  let { fd, dest, minLength, maxLength, maxWrite, periodicFlush, sync, append = true, mkdir, retryEAGAIN, fsync, contentMode, mode } = opts || {};

	  fd = fd || dest;

	  this._len = 0;
	  this.fd = -1;
	  this._bufs = [];
	  this._lens = [];
	  this._writing = false;
	  this._ending = false;
	  this._reopening = false;
	  this._asyncDrainScheduled = false;
	  this._flushPending = false;
	  this._hwm = Math.max(minLength || 0, 16387);
	  this.file = null;
	  this.destroyed = false;
	  this.minLength = minLength || 0;
	  this.maxLength = maxLength || 0;
	  this.maxWrite = maxWrite || MAX_WRITE;
	  this._periodicFlush = periodicFlush || 0;
	  this._periodicFlushTimer = undefined;
	  this.sync = sync || false;
	  this.writable = true;
	  this._fsync = fsync || false;
	  this.append = append || false;
	  this.mode = mode;
	  this.retryEAGAIN = retryEAGAIN || (() => true);
	  this.mkdir = mkdir || false;

	  let fsWriteSync;
	  let fsWrite;
	  if (contentMode === kContentModeBuffer) {
	    this._writingBuf = kEmptyBuffer;
	    this.write = writeBuffer;
	    this.flush = flushBuffer;
	    this.flushSync = flushBufferSync;
	    this._actualWrite = actualWriteBuffer;
	    fsWriteSync = () => fs.writeSync(this.fd, this._writingBuf);
	    fsWrite = () => fs.write(this.fd, this._writingBuf, this.release);
	  } else if (contentMode === undefined || contentMode === kContentModeUtf8) {
	    this._writingBuf = '';
	    this.write = write;
	    this.flush = flush;
	    this.flushSync = flushSync;
	    this._actualWrite = actualWrite;
	    fsWriteSync = () => fs.writeSync(this.fd, this._writingBuf, 'utf8');
	    fsWrite = () => fs.write(this.fd, this._writingBuf, 'utf8', this.release);
	  } else {
	    throw new Error(`SonicBoom supports "${kContentModeUtf8}" and "${kContentModeBuffer}", but passed ${contentMode}`)
	  }

	  if (typeof fd === 'number') {
	    this.fd = fd;
	    process.nextTick(() => this.emit('ready'));
	  } else if (typeof fd === 'string') {
	    openFile(fd, this);
	  } else {
	    throw new Error('SonicBoom supports only file descriptors and files')
	  }
	  if (this.minLength >= this.maxWrite) {
	    throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`)
	  }

	  this.release = (err, n) => {
	    if (err) {
	      if ((err.code === 'EAGAIN' || err.code === 'EBUSY') && this.retryEAGAIN(err, this._writingBuf.length, this._len - this._writingBuf.length)) {
	        if (this.sync) {
	          // This error code should not happen in sync mode, because it is
	          // not using the underlining operating system asynchronous functions.
	          // However it happens, and so we handle it.
	          // Ref: https://github.com/pinojs/pino/issues/783
	          try {
	            sleep(BUSY_WRITE_TIMEOUT);
	            this.release(undefined, 0);
	          } catch (err) {
	            this.release(err);
	          }
	        } else {
	          // Let's give the destination some time to process the chunk.
	          setTimeout(fsWrite, BUSY_WRITE_TIMEOUT);
	        }
	      } else {
	        this._writing = false;

	        this.emit('error', err);
	      }
	      return
	    }

	    this.emit('write', n);
	    const releasedBufObj = releaseWritingBuf(this._writingBuf, this._len, n);
	    this._len = releasedBufObj.len;
	    this._writingBuf = releasedBufObj.writingBuf;

	    if (this._writingBuf.length) {
	      if (!this.sync) {
	        fsWrite();
	        return
	      }

	      try {
	        do {
	          const n = fsWriteSync();
	          const releasedBufObj = releaseWritingBuf(this._writingBuf, this._len, n);
	          this._len = releasedBufObj.len;
	          this._writingBuf = releasedBufObj.writingBuf;
	        } while (this._writingBuf.length)
	      } catch (err) {
	        this.release(err);
	        return
	      }
	    }

	    if (this._fsync) {
	      fs.fsyncSync(this.fd);
	    }

	    const len = this._len;
	    if (this._reopening) {
	      this._writing = false;
	      this._reopening = false;
	      this.reopen();
	    } else if (len > this.minLength) {
	      this._actualWrite();
	    } else if (this._ending) {
	      if (len > 0) {
	        this._actualWrite();
	      } else {
	        this._writing = false;
	        actualClose(this);
	      }
	    } else {
	      this._writing = false;
	      if (this.sync) {
	        if (!this._asyncDrainScheduled) {
	          this._asyncDrainScheduled = true;
	          process.nextTick(emitDrain, this);
	        }
	      } else {
	        this.emit('drain');
	      }
	    }
	  };

	  this.on('newListener', function (name) {
	    if (name === 'drain') {
	      this._asyncDrainScheduled = false;
	    }
	  });

	  if (this._periodicFlush !== 0) {
	    this._periodicFlushTimer = setInterval(() => this.flush(null), this._periodicFlush);
	    this._periodicFlushTimer.unref();
	  }
	}

	/**
	 * Release the writingBuf after fs.write n bytes data
	 * @param {string | Buffer} writingBuf - currently writing buffer, usually be instance._writingBuf.
	 * @param {number} len - currently buffer length, usually be instance._len.
	 * @param {number} n - number of bytes fs already written
	 * @returns {{writingBuf: string | Buffer, len: number}} released writingBuf and length
	 */
	function releaseWritingBuf (writingBuf, len, n) {
	  // if Buffer.byteLength is equal to n, that means writingBuf contains no multi-byte character
	  if (typeof writingBuf === 'string' && Buffer.byteLength(writingBuf) !== n) {
	    // Since the fs.write callback parameter `n` means how many bytes the passed of string
	    // We calculate the original string length for avoiding the multi-byte character issue
	    n = Buffer.from(writingBuf).subarray(0, n).toString().length;
	  }
	  len = Math.max(len - n, 0);
	  writingBuf = writingBuf.slice(n);
	  return { writingBuf, len }
	}

	function emitDrain (sonic) {
	  const hasListeners = sonic.listenerCount('drain') > 0;
	  if (!hasListeners) return
	  sonic._asyncDrainScheduled = false;
	  sonic.emit('drain');
	}

	inherits(SonicBoom, EventEmitter);

	function mergeBuf (bufs, len) {
	  if (bufs.length === 0) {
	    return kEmptyBuffer
	  }

	  if (bufs.length === 1) {
	    return bufs[0]
	  }

	  return Buffer.concat(bufs, len)
	}

	function write (data) {
	  if (this.destroyed) {
	    throw new Error('SonicBoom destroyed')
	  }

	  const len = this._len + data.length;
	  const bufs = this._bufs;

	  if (this.maxLength && len > this.maxLength) {
	    this.emit('drop', data);
	    return this._len < this._hwm
	  }

	  if (
	    bufs.length === 0 ||
	    bufs[bufs.length - 1].length + data.length > this.maxWrite
	  ) {
	    bufs.push('' + data);
	  } else {
	    bufs[bufs.length - 1] += data;
	  }

	  this._len = len;

	  if (!this._writing && this._len >= this.minLength) {
	    this._actualWrite();
	  }

	  return this._len < this._hwm
	}

	function writeBuffer (data) {
	  if (this.destroyed) {
	    throw new Error('SonicBoom destroyed')
	  }

	  const len = this._len + data.length;
	  const bufs = this._bufs;
	  const lens = this._lens;

	  if (this.maxLength && len > this.maxLength) {
	    this.emit('drop', data);
	    return this._len < this._hwm
	  }

	  if (
	    bufs.length === 0 ||
	    lens[lens.length - 1] + data.length > this.maxWrite
	  ) {
	    bufs.push([data]);
	    lens.push(data.length);
	  } else {
	    bufs[bufs.length - 1].push(data);
	    lens[lens.length - 1] += data.length;
	  }

	  this._len = len;

	  if (!this._writing && this._len >= this.minLength) {
	    this._actualWrite();
	  }

	  return this._len < this._hwm
	}

	function callFlushCallbackOnDrain (cb) {
	  this._flushPending = true;
	  const onDrain = () => {
	    // only if _fsync is false to avoid double fsync
	    if (!this._fsync) {
	      try {
	        fs.fsync(this.fd, (err) => {
	          this._flushPending = false;
	          cb(err);
	        });
	      } catch (err) {
	        cb(err);
	      }
	    } else {
	      this._flushPending = false;
	      cb();
	    }
	    this.off('error', onError);
	  };
	  const onError = (err) => {
	    this._flushPending = false;
	    cb(err);
	    this.off('drain', onDrain);
	  };

	  this.once('drain', onDrain);
	  this.once('error', onError);
	}

	function flush (cb) {
	  if (cb != null && typeof cb !== 'function') {
	    throw new Error('flush cb must be a function')
	  }

	  if (this.destroyed) {
	    const error = new Error('SonicBoom destroyed');
	    if (cb) {
	      cb(error);
	      return
	    }

	    throw error
	  }

	  if (this.minLength <= 0) {
	    cb?.();
	    return
	  }

	  if (cb) {
	    callFlushCallbackOnDrain.call(this, cb);
	  }

	  if (this._writing) {
	    return
	  }

	  if (this._bufs.length === 0) {
	    this._bufs.push('');
	  }

	  this._actualWrite();
	}

	function flushBuffer (cb) {
	  if (cb != null && typeof cb !== 'function') {
	    throw new Error('flush cb must be a function')
	  }

	  if (this.destroyed) {
	    const error = new Error('SonicBoom destroyed');
	    if (cb) {
	      cb(error);
	      return
	    }

	    throw error
	  }

	  if (this.minLength <= 0) {
	    cb?.();
	    return
	  }

	  if (cb) {
	    callFlushCallbackOnDrain.call(this, cb);
	  }

	  if (this._writing) {
	    return
	  }

	  if (this._bufs.length === 0) {
	    this._bufs.push([]);
	    this._lens.push(0);
	  }

	  this._actualWrite();
	}

	SonicBoom.prototype.reopen = function (file) {
	  if (this.destroyed) {
	    throw new Error('SonicBoom destroyed')
	  }

	  if (this._opening) {
	    this.once('ready', () => {
	      this.reopen(file);
	    });
	    return
	  }

	  if (this._ending) {
	    return
	  }

	  if (!this.file) {
	    throw new Error('Unable to reopen a file descriptor, you must pass a file to SonicBoom')
	  }

	  if (file) {
	    this.file = file;
	  }
	  this._reopening = true;

	  if (this._writing) {
	    return
	  }

	  const fd = this.fd;
	  this.once('ready', () => {
	    if (fd !== this.fd) {
	      fs.close(fd, (err) => {
	        if (err) {
	          return this.emit('error', err)
	        }
	      });
	    }
	  });

	  openFile(this.file, this);
	};

	SonicBoom.prototype.end = function () {
	  if (this.destroyed) {
	    throw new Error('SonicBoom destroyed')
	  }

	  if (this._opening) {
	    this.once('ready', () => {
	      this.end();
	    });
	    return
	  }

	  if (this._ending) {
	    return
	  }

	  this._ending = true;

	  if (this._writing) {
	    return
	  }

	  if (this._len > 0 && this.fd >= 0) {
	    this._actualWrite();
	  } else {
	    actualClose(this);
	  }
	};

	function flushSync () {
	  if (this.destroyed) {
	    throw new Error('SonicBoom destroyed')
	  }

	  if (this.fd < 0) {
	    throw new Error('sonic boom is not ready yet')
	  }

	  if (!this._writing && this._writingBuf.length > 0) {
	    this._bufs.unshift(this._writingBuf);
	    this._writingBuf = '';
	  }

	  let buf = '';
	  while (this._bufs.length || buf) {
	    if (buf.length <= 0) {
	      buf = this._bufs[0];
	    }
	    try {
	      const n = fs.writeSync(this.fd, buf, 'utf8');
	      const releasedBufObj = releaseWritingBuf(buf, this._len, n);
	      buf = releasedBufObj.writingBuf;
	      this._len = releasedBufObj.len;
	      if (buf.length <= 0) {
	        this._bufs.shift();
	      }
	    } catch (err) {
	      const shouldRetry = err.code === 'EAGAIN' || err.code === 'EBUSY';
	      if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
	        throw err
	      }

	      sleep(BUSY_WRITE_TIMEOUT);
	    }
	  }

	  try {
	    fs.fsyncSync(this.fd);
	  } catch {
	    // Skip the error. The fd might not support fsync.
	  }
	}

	function flushBufferSync () {
	  if (this.destroyed) {
	    throw new Error('SonicBoom destroyed')
	  }

	  if (this.fd < 0) {
	    throw new Error('sonic boom is not ready yet')
	  }

	  if (!this._writing && this._writingBuf.length > 0) {
	    this._bufs.unshift([this._writingBuf]);
	    this._writingBuf = kEmptyBuffer;
	  }

	  let buf = kEmptyBuffer;
	  while (this._bufs.length || buf.length) {
	    if (buf.length <= 0) {
	      buf = mergeBuf(this._bufs[0], this._lens[0]);
	    }
	    try {
	      const n = fs.writeSync(this.fd, buf);
	      buf = buf.subarray(n);
	      this._len = Math.max(this._len - n, 0);
	      if (buf.length <= 0) {
	        this._bufs.shift();
	        this._lens.shift();
	      }
	    } catch (err) {
	      const shouldRetry = err.code === 'EAGAIN' || err.code === 'EBUSY';
	      if (shouldRetry && !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
	        throw err
	      }

	      sleep(BUSY_WRITE_TIMEOUT);
	    }
	  }
	}

	SonicBoom.prototype.destroy = function () {
	  if (this.destroyed) {
	    return
	  }
	  actualClose(this);
	};

	function actualWrite () {
	  const release = this.release;
	  this._writing = true;
	  this._writingBuf = this._writingBuf || this._bufs.shift() || '';

	  if (this.sync) {
	    try {
	      const written = fs.writeSync(this.fd, this._writingBuf, 'utf8');
	      release(null, written);
	    } catch (err) {
	      release(err);
	    }
	  } else {
	    fs.write(this.fd, this._writingBuf, 'utf8', release);
	  }
	}

	function actualWriteBuffer () {
	  const release = this.release;
	  this._writing = true;
	  this._writingBuf = this._writingBuf.length ? this._writingBuf : mergeBuf(this._bufs.shift(), this._lens.shift());

	  if (this.sync) {
	    try {
	      const written = fs.writeSync(this.fd, this._writingBuf);
	      release(null, written);
	    } catch (err) {
	      release(err);
	    }
	  } else {
	    // fs.write will need to copy string to buffer anyway so
	    // we do it here to avoid the overhead of calculating the buffer size
	    // in releaseWritingBuf.
	    if (kCopyBuffer) {
	      this._writingBuf = Buffer.from(this._writingBuf);
	    }
	    fs.write(this.fd, this._writingBuf, release);
	  }
	}

	function actualClose (sonic) {
	  if (sonic.fd === -1) {
	    sonic.once('ready', actualClose.bind(null, sonic));
	    return
	  }

	  if (sonic._periodicFlushTimer !== undefined) {
	    clearInterval(sonic._periodicFlushTimer);
	  }

	  sonic.destroyed = true;
	  sonic._bufs = [];
	  sonic._lens = [];

	  assert(typeof sonic.fd === 'number', `sonic.fd must be a number, got ${typeof sonic.fd}`);
	  try {
	    fs.fsync(sonic.fd, closeWrapped);
	  } catch {
	  }

	  function closeWrapped () {
	    // We skip errors in fsync

	    if (sonic.fd !== 1 && sonic.fd !== 2) {
	      fs.close(sonic.fd, done);
	    } else {
	      done();
	    }
	  }

	  function done (err) {
	    if (err) {
	      sonic.emit('error', err);
	      return
	    }

	    if (sonic._ending && !sonic._writing) {
	      sonic.emit('finish');
	    }
	    sonic.emit('close');
	  }
	}

	/**
	 * These export configurations enable JS and TS developers
	 * to consumer SonicBoom in whatever way best suits their needs.
	 * Some examples of supported import syntax includes:
	 * - `const SonicBoom = require('SonicBoom')`
	 * - `const { SonicBoom } = require('SonicBoom')`
	 * - `import * as SonicBoom from 'SonicBoom'`
	 * - `import { SonicBoom } from 'SonicBoom'`
	 * - `import SonicBoom from 'SonicBoom'`
	 */
	SonicBoom.SonicBoom = SonicBoom;
	SonicBoom.default = SonicBoom;
	sonicBoom = SonicBoom;
	return sonicBoom;
}

var onExitLeakFree;
var hasRequiredOnExitLeakFree;

function requireOnExitLeakFree () {
	if (hasRequiredOnExitLeakFree) return onExitLeakFree;
	hasRequiredOnExitLeakFree = 1;

	const refs = {
	  exit: [],
	  beforeExit: []
	};
	const functions = {
	  exit: onExit,
	  beforeExit: onBeforeExit
	};

	let registry;

	function ensureRegistry () {
	  if (registry === undefined) {
	    registry = new FinalizationRegistry(clear);
	  }
	}

	function install (event) {
	  if (refs[event].length > 0) {
	    return
	  }

	  process.on(event, functions[event]);
	}

	function uninstall (event) {
	  if (refs[event].length > 0) {
	    return
	  }
	  process.removeListener(event, functions[event]);
	  if (refs.exit.length === 0 && refs.beforeExit.length === 0) {
	    registry = undefined;
	  }
	}

	function onExit () {
	  callRefs('exit');
	}

	function onBeforeExit () {
	  callRefs('beforeExit');
	}

	function callRefs (event) {
	  for (const ref of refs[event]) {
	    const obj = ref.deref();
	    const fn = ref.fn;

	    // This should always happen, however GC is
	    // undeterministic so it might not happen.
	    /* istanbul ignore else */
	    if (obj !== undefined) {
	      fn(obj, event);
	    }
	  }
	  refs[event] = [];
	}

	function clear (ref) {
	  for (const event of ['exit', 'beforeExit']) {
	    const index = refs[event].indexOf(ref);
	    refs[event].splice(index, index + 1);
	    uninstall(event);
	  }
	}

	function _register (event, obj, fn) {
	  if (obj === undefined) {
	    throw new Error('the object can\'t be undefined')
	  }
	  install(event);
	  const ref = new WeakRef(obj);
	  ref.fn = fn;

	  ensureRegistry();
	  registry.register(obj, ref);
	  refs[event].push(ref);
	}

	function register (obj, fn) {
	  _register('exit', obj, fn);
	}

	function registerBeforeExit (obj, fn) {
	  _register('beforeExit', obj, fn);
	}

	function unregister (obj) {
	  if (registry === undefined) {
	    return
	  }
	  registry.unregister(obj);
	  for (const event of ['exit', 'beforeExit']) {
	    refs[event] = refs[event].filter((ref) => {
	      const _obj = ref.deref();
	      return _obj && _obj !== obj
	    });
	    uninstall(event);
	  }
	}

	onExitLeakFree = {
	  register,
	  registerBeforeExit,
	  unregister
	};
	return onExitLeakFree;
}

const version = "3.1.0";
const require$$0 = {
  version};

var wait_1;
var hasRequiredWait;

function requireWait () {
	if (hasRequiredWait) return wait_1;
	hasRequiredWait = 1;

	const MAX_TIMEOUT = 1000;

	function wait (state, index, expected, timeout, done) {
	  const max = Date.now() + timeout;
	  let current = Atomics.load(state, index);
	  if (current === expected) {
	    done(null, 'ok');
	    return
	  }
	  let prior = current;
	  const check = (backoff) => {
	    if (Date.now() > max) {
	      done(null, 'timed-out');
	    } else {
	      setTimeout(() => {
	        prior = current;
	        current = Atomics.load(state, index);
	        if (current === prior) {
	          check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
	        } else {
	          if (current === expected) done(null, 'ok');
	          else done(null, 'not-equal');
	        }
	      }, backoff);
	    }
	  };
	  check(1);
	}

	// let waitDiffCount = 0
	function waitDiff (state, index, expected, timeout, done) {
	  // const id = waitDiffCount++
	  // process._rawDebug(`>>> waitDiff ${id}`)
	  const max = Date.now() + timeout;
	  let current = Atomics.load(state, index);
	  if (current !== expected) {
	    done(null, 'ok');
	    return
	  }
	  const check = (backoff) => {
	    // process._rawDebug(`${id} ${index} current ${current} expected ${expected}`)
	    // process._rawDebug('' + backoff)
	    if (Date.now() > max) {
	      done(null, 'timed-out');
	    } else {
	      setTimeout(() => {
	        current = Atomics.load(state, index);
	        if (current !== expected) {
	          done(null, 'ok');
	        } else {
	          check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
	        }
	      }, backoff);
	    }
	  };
	  check(1);
	}

	wait_1 = { wait, waitDiff };
	return wait_1;
}

var indexes;
var hasRequiredIndexes;

function requireIndexes () {
	if (hasRequiredIndexes) return indexes;
	hasRequiredIndexes = 1;

	const WRITE_INDEX = 4;
	const READ_INDEX = 8;

	indexes = {
	  WRITE_INDEX,
	  READ_INDEX
	};
	return indexes;
}

var threadStream;
var hasRequiredThreadStream;

function requireThreadStream () {
	if (hasRequiredThreadStream) return threadStream;
	hasRequiredThreadStream = 1;

	const { version } = require$$0;
	const { EventEmitter } = require$$1;
	const { Worker } = require$$2$1;
	const { join } = require$$3;
	const { pathToFileURL } = require$$0$1;
	const { wait } = requireWait();
	const {
	  WRITE_INDEX,
	  READ_INDEX
	} = requireIndexes();
	const buffer = require$$7;
	const assert = require$$5;

	const kImpl = Symbol('kImpl');

	// V8 limit for string size
	const MAX_STRING = buffer.constants.MAX_STRING_LENGTH;

	class FakeWeakRef {
	  constructor (value) {
	    this._value = value;
	  }

	  deref () {
	    return this._value
	  }
	}

	class FakeFinalizationRegistry {
	  register () {}

	  unregister () {}
	}

	// Currently using FinalizationRegistry with code coverage breaks the world
	// Ref: https://github.com/nodejs/node/issues/49344
	const FinalizationRegistry = process.env.NODE_V8_COVERAGE ? FakeFinalizationRegistry : commonjsGlobal.FinalizationRegistry || FakeFinalizationRegistry;
	const WeakRef = process.env.NODE_V8_COVERAGE ? FakeWeakRef : commonjsGlobal.WeakRef || FakeWeakRef;

	const registry = new FinalizationRegistry((worker) => {
	  if (worker.exited) {
	    return
	  }
	  worker.terminate();
	});

	function createWorker (stream, opts) {
	  const { filename, workerData } = opts;

	  const bundlerOverrides = '__bundlerPathsOverrides' in globalThis ? globalThis.__bundlerPathsOverrides : {};
	  const toExecute = bundlerOverrides['thread-stream-worker'] || join(__dirname, 'lib', 'worker.js');

	  const worker = new Worker(toExecute, {
	    ...opts.workerOpts,
	    trackUnmanagedFds: false,
	    workerData: {
	      filename: filename.indexOf('file://') === 0
	        ? filename
	        : pathToFileURL(filename).href,
	      dataBuf: stream[kImpl].dataBuf,
	      stateBuf: stream[kImpl].stateBuf,
	      workerData: {
	        $context: {
	          threadStreamVersion: version
	        },
	        ...workerData
	      }
	    }
	  });

	  // We keep a strong reference for now,
	  // we need to start writing first
	  worker.stream = new FakeWeakRef(stream);

	  worker.on('message', onWorkerMessage);
	  worker.on('exit', onWorkerExit);
	  registry.register(stream, worker);

	  return worker
	}

	function drain (stream) {
	  assert(!stream[kImpl].sync);
	  if (stream[kImpl].needDrain) {
	    stream[kImpl].needDrain = false;
	    stream.emit('drain');
	  }
	}

	function nextFlush (stream) {
	  const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
	  let leftover = stream[kImpl].data.length - writeIndex;

	  if (leftover > 0) {
	    if (stream[kImpl].buf.length === 0) {
	      stream[kImpl].flushing = false;

	      if (stream[kImpl].ending) {
	        end(stream);
	      } else if (stream[kImpl].needDrain) {
	        process.nextTick(drain, stream);
	      }

	      return
	    }

	    let toWrite = stream[kImpl].buf.slice(0, leftover);
	    let toWriteBytes = Buffer.byteLength(toWrite);
	    if (toWriteBytes <= leftover) {
	      stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
	      // process._rawDebug('writing ' + toWrite.length)
	      write(stream, toWrite, nextFlush.bind(null, stream));
	    } else {
	      // multi-byte utf-8
	      stream.flush(() => {
	        // err is already handled in flush()
	        if (stream.destroyed) {
	          return
	        }

	        Atomics.store(stream[kImpl].state, READ_INDEX, 0);
	        Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);

	        // Find a toWrite length that fits the buffer
	        // it must exists as the buffer is at least 4 bytes length
	        // and the max utf-8 length for a char is 4 bytes.
	        while (toWriteBytes > stream[kImpl].data.length) {
	          leftover = leftover / 2;
	          toWrite = stream[kImpl].buf.slice(0, leftover);
	          toWriteBytes = Buffer.byteLength(toWrite);
	        }
	        stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
	        write(stream, toWrite, nextFlush.bind(null, stream));
	      });
	    }
	  } else if (leftover === 0) {
	    if (writeIndex === 0 && stream[kImpl].buf.length === 0) {
	      // we had a flushSync in the meanwhile
	      return
	    }
	    stream.flush(() => {
	      Atomics.store(stream[kImpl].state, READ_INDEX, 0);
	      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
	      nextFlush(stream);
	    });
	  } else {
	    // This should never happen
	    destroy(stream, new Error('overwritten'));
	  }
	}

	function onWorkerMessage (msg) {
	  const stream = this.stream.deref();
	  if (stream === undefined) {
	    this.exited = true;
	    // Terminate the worker.
	    this.terminate();
	    return
	  }

	  switch (msg.code) {
	    case 'READY':
	      // Replace the FakeWeakRef with a
	      // proper one.
	      this.stream = new WeakRef(stream);

	      stream.flush(() => {
	        stream[kImpl].ready = true;
	        stream.emit('ready');
	      });
	      break
	    case 'ERROR':
	      destroy(stream, msg.err);
	      break
	    case 'EVENT':
	      if (Array.isArray(msg.args)) {
	        stream.emit(msg.name, ...msg.args);
	      } else {
	        stream.emit(msg.name, msg.args);
	      }
	      break
	    case 'WARNING':
	      process.emitWarning(msg.err);
	      break
	    default:
	      destroy(stream, new Error('this should not happen: ' + msg.code));
	  }
	}

	function onWorkerExit (code) {
	  const stream = this.stream.deref();
	  if (stream === undefined) {
	    // Nothing to do, the worker already exit
	    return
	  }
	  registry.unregister(stream);
	  stream.worker.exited = true;
	  stream.worker.off('exit', onWorkerExit);
	  destroy(stream, code !== 0 ? new Error('the worker thread exited') : null);
	}

	class ThreadStream extends EventEmitter {
	  constructor (opts = {}) {
	    super();

	    if (opts.bufferSize < 4) {
	      throw new Error('bufferSize must at least fit a 4-byte utf-8 char')
	    }

	    this[kImpl] = {};
	    this[kImpl].stateBuf = new SharedArrayBuffer(128);
	    this[kImpl].state = new Int32Array(this[kImpl].stateBuf);
	    this[kImpl].dataBuf = new SharedArrayBuffer(opts.bufferSize || 4 * 1024 * 1024);
	    this[kImpl].data = Buffer.from(this[kImpl].dataBuf);
	    this[kImpl].sync = opts.sync || false;
	    this[kImpl].ending = false;
	    this[kImpl].ended = false;
	    this[kImpl].needDrain = false;
	    this[kImpl].destroyed = false;
	    this[kImpl].flushing = false;
	    this[kImpl].ready = false;
	    this[kImpl].finished = false;
	    this[kImpl].errored = null;
	    this[kImpl].closed = false;
	    this[kImpl].buf = '';

	    // TODO (fix): Make private?
	    this.worker = createWorker(this, opts); // TODO (fix): make private
	    this.on('message', (message, transferList) => {
	      this.worker.postMessage(message, transferList);
	    });
	  }

	  write (data) {
	    if (this[kImpl].destroyed) {
	      error(this, new Error('the worker has exited'));
	      return false
	    }

	    if (this[kImpl].ending) {
	      error(this, new Error('the worker is ending'));
	      return false
	    }

	    if (this[kImpl].flushing && this[kImpl].buf.length + data.length >= MAX_STRING) {
	      try {
	        writeSync(this);
	        this[kImpl].flushing = true;
	      } catch (err) {
	        destroy(this, err);
	        return false
	      }
	    }

	    this[kImpl].buf += data;

	    if (this[kImpl].sync) {
	      try {
	        writeSync(this);
	        return true
	      } catch (err) {
	        destroy(this, err);
	        return false
	      }
	    }

	    if (!this[kImpl].flushing) {
	      this[kImpl].flushing = true;
	      setImmediate(nextFlush, this);
	    }

	    this[kImpl].needDrain = this[kImpl].data.length - this[kImpl].buf.length - Atomics.load(this[kImpl].state, WRITE_INDEX) <= 0;
	    return !this[kImpl].needDrain
	  }

	  end () {
	    if (this[kImpl].destroyed) {
	      return
	    }

	    this[kImpl].ending = true;
	    end(this);
	  }

	  flush (cb) {
	    if (this[kImpl].destroyed) {
	      if (typeof cb === 'function') {
	        process.nextTick(cb, new Error('the worker has exited'));
	      }
	      return
	    }

	    // TODO write all .buf
	    const writeIndex = Atomics.load(this[kImpl].state, WRITE_INDEX);
	    // process._rawDebug(`(flush) readIndex (${Atomics.load(this.state, READ_INDEX)}) writeIndex (${Atomics.load(this.state, WRITE_INDEX)})`)
	    wait(this[kImpl].state, READ_INDEX, writeIndex, Infinity, (err, res) => {
	      if (err) {
	        destroy(this, err);
	        process.nextTick(cb, err);
	        return
	      }
	      if (res === 'not-equal') {
	        // TODO handle deadlock
	        this.flush(cb);
	        return
	      }
	      process.nextTick(cb);
	    });
	  }

	  flushSync () {
	    if (this[kImpl].destroyed) {
	      return
	    }

	    writeSync(this);
	    flushSync(this);
	  }

	  unref () {
	    this.worker.unref();
	  }

	  ref () {
	    this.worker.ref();
	  }

	  get ready () {
	    return this[kImpl].ready
	  }

	  get destroyed () {
	    return this[kImpl].destroyed
	  }

	  get closed () {
	    return this[kImpl].closed
	  }

	  get writable () {
	    return !this[kImpl].destroyed && !this[kImpl].ending
	  }

	  get writableEnded () {
	    return this[kImpl].ending
	  }

	  get writableFinished () {
	    return this[kImpl].finished
	  }

	  get writableNeedDrain () {
	    return this[kImpl].needDrain
	  }

	  get writableObjectMode () {
	    return false
	  }

	  get writableErrored () {
	    return this[kImpl].errored
	  }
	}

	function error (stream, err) {
	  setImmediate(() => {
	    stream.emit('error', err);
	  });
	}

	function destroy (stream, err) {
	  if (stream[kImpl].destroyed) {
	    return
	  }
	  stream[kImpl].destroyed = true;

	  if (err) {
	    stream[kImpl].errored = err;
	    error(stream, err);
	  }

	  if (!stream.worker.exited) {
	    stream.worker.terminate()
	      .catch(() => {})
	      .then(() => {
	        stream[kImpl].closed = true;
	        stream.emit('close');
	      });
	  } else {
	    setImmediate(() => {
	      stream[kImpl].closed = true;
	      stream.emit('close');
	    });
	  }
	}

	function write (stream, data, cb) {
	  // data is smaller than the shared buffer length
	  const current = Atomics.load(stream[kImpl].state, WRITE_INDEX);
	  const length = Buffer.byteLength(data);
	  stream[kImpl].data.write(data, current);
	  Atomics.store(stream[kImpl].state, WRITE_INDEX, current + length);
	  Atomics.notify(stream[kImpl].state, WRITE_INDEX);
	  cb();
	  return true
	}

	function end (stream) {
	  if (stream[kImpl].ended || !stream[kImpl].ending || stream[kImpl].flushing) {
	    return
	  }
	  stream[kImpl].ended = true;

	  try {
	    stream.flushSync();

	    let readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);

	    // process._rawDebug('writing index')
	    Atomics.store(stream[kImpl].state, WRITE_INDEX, -1);
	    // process._rawDebug(`(end) readIndex (${Atomics.load(stream.state, READ_INDEX)}) writeIndex (${Atomics.load(stream.state, WRITE_INDEX)})`)
	    Atomics.notify(stream[kImpl].state, WRITE_INDEX);

	    // Wait for the process to complete
	    let spins = 0;
	    while (readIndex !== -1) {
	      // process._rawDebug(`read = ${read}`)
	      Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1000);
	      readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);

	      if (readIndex === -2) {
	        destroy(stream, new Error('end() failed'));
	        return
	      }

	      if (++spins === 10) {
	        destroy(stream, new Error('end() took too long (10s)'));
	        return
	      }
	    }

	    process.nextTick(() => {
	      stream[kImpl].finished = true;
	      stream.emit('finish');
	    });
	  } catch (err) {
	    destroy(stream, err);
	  }
	  // process._rawDebug('end finished...')
	}

	function writeSync (stream) {
	  const cb = () => {
	    if (stream[kImpl].ending) {
	      end(stream);
	    } else if (stream[kImpl].needDrain) {
	      process.nextTick(drain, stream);
	    }
	  };
	  stream[kImpl].flushing = false;

	  while (stream[kImpl].buf.length !== 0) {
	    const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
	    let leftover = stream[kImpl].data.length - writeIndex;
	    if (leftover === 0) {
	      flushSync(stream);
	      Atomics.store(stream[kImpl].state, READ_INDEX, 0);
	      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
	      continue
	    } else if (leftover < 0) {
	      // stream should never happen
	      throw new Error('overwritten')
	    }

	    let toWrite = stream[kImpl].buf.slice(0, leftover);
	    let toWriteBytes = Buffer.byteLength(toWrite);
	    if (toWriteBytes <= leftover) {
	      stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
	      // process._rawDebug('writing ' + toWrite.length)
	      write(stream, toWrite, cb);
	    } else {
	      // multi-byte utf-8
	      flushSync(stream);
	      Atomics.store(stream[kImpl].state, READ_INDEX, 0);
	      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);

	      // Find a toWrite length that fits the buffer
	      // it must exists as the buffer is at least 4 bytes length
	      // and the max utf-8 length for a char is 4 bytes.
	      while (toWriteBytes > stream[kImpl].buf.length) {
	        leftover = leftover / 2;
	        toWrite = stream[kImpl].buf.slice(0, leftover);
	        toWriteBytes = Buffer.byteLength(toWrite);
	      }
	      stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
	      write(stream, toWrite, cb);
	    }
	  }
	}

	function flushSync (stream) {
	  if (stream[kImpl].flushing) {
	    throw new Error('unable to flush while flushing')
	  }

	  // process._rawDebug('flushSync started')

	  const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);

	  let spins = 0;

	  // TODO handle deadlock
	  while (true) {
	    const readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);

	    if (readIndex === -2) {
	      throw Error('_flushSync failed')
	    }

	    // process._rawDebug(`(flushSync) readIndex (${readIndex}) writeIndex (${writeIndex})`)
	    if (readIndex !== writeIndex) {
	      // TODO stream timeouts for some reason.
	      Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1000);
	    } else {
	      break
	    }

	    if (++spins === 10) {
	      throw new Error('_flushSync took too long (10s)')
	    }
	  }
	  // process._rawDebug('flushSync finished')
	}

	threadStream = ThreadStream;
	return threadStream;
}

var transport_1;
var hasRequiredTransport;

function requireTransport () {
	if (hasRequiredTransport) return transport_1;
	hasRequiredTransport = 1;

	const { createRequire } = require$$0$2;
	const getCallers = requireCaller();
	const { join, isAbsolute, sep } = nodePath;
	const sleep = requireAtomicSleep();
	const onExit = requireOnExitLeakFree();
	const ThreadStream = requireThreadStream();

	function setupOnExit (stream) {
	  // This is leak free, it does not leave event handlers
	  onExit.register(stream, autoEnd);
	  onExit.registerBeforeExit(stream, flush);

	  stream.on('close', function () {
	    onExit.unregister(stream);
	  });
	}

	function buildStream (filename, workerData, workerOpts, sync) {
	  const stream = new ThreadStream({
	    filename,
	    workerData,
	    workerOpts,
	    sync
	  });

	  stream.on('ready', onReady);
	  stream.on('close', function () {
	    process.removeListener('exit', onExit);
	  });

	  process.on('exit', onExit);

	  function onReady () {
	    process.removeListener('exit', onExit);
	    stream.unref();

	    if (workerOpts.autoEnd !== false) {
	      setupOnExit(stream);
	    }
	  }

	  function onExit () {
	    /* istanbul ignore next */
	    if (stream.closed) {
	      return
	    }
	    stream.flushSync();
	    // Apparently there is a very sporadic race condition
	    // that in certain OS would prevent the messages to be flushed
	    // because the thread might not have been created still.
	    // Unfortunately we need to sleep(100) in this case.
	    sleep(100);
	    stream.end();
	  }

	  return stream
	}

	function autoEnd (stream) {
	  stream.ref();
	  stream.flushSync();
	  stream.end();
	  stream.once('close', function () {
	    stream.unref();
	  });
	}

	function flush (stream) {
	  stream.flushSync();
	}

	function transport (fullOptions) {
	  const { pipeline, targets, levels, dedupe, worker = {}, caller = getCallers(), sync = false } = fullOptions;

	  const options = {
	    ...fullOptions.options
	  };

	  // Backwards compatibility
	  const callers = typeof caller === 'string' ? [caller] : caller;

	  // This will be eventually modified by bundlers
	  const bundlerOverrides = '__bundlerPathsOverrides' in globalThis ? globalThis.__bundlerPathsOverrides : {};

	  let target = fullOptions.target;

	  if (target && targets) {
	    throw new Error('only one of target or targets can be specified')
	  }

	  if (targets) {
	    target = bundlerOverrides['pino-worker'] || join(__dirname, 'worker.js');
	    options.targets = targets.filter(dest => dest.target).map((dest) => {
	      return {
	        ...dest,
	        target: fixTarget(dest.target)
	      }
	    });
	    options.pipelines = targets.filter(dest => dest.pipeline).map((dest) => {
	      return dest.pipeline.map((t) => {
	        return {
	          ...t,
	          level: dest.level, // duplicate the pipeline `level` property defined in the upper level
	          target: fixTarget(t.target)
	        }
	      })
	    });
	  } else if (pipeline) {
	    target = bundlerOverrides['pino-worker'] || join(__dirname, 'worker.js');
	    options.pipelines = [pipeline.map((dest) => {
	      return {
	        ...dest,
	        target: fixTarget(dest.target)
	      }
	    })];
	  }

	  if (levels) {
	    options.levels = levels;
	  }

	  if (dedupe) {
	    options.dedupe = dedupe;
	  }

	  options.pinoWillSendConfig = true;

	  return buildStream(fixTarget(target), options, worker, sync)

	  function fixTarget (origin) {
	    origin = bundlerOverrides[origin] || origin;

	    if (isAbsolute(origin) || origin.indexOf('file://') === 0) {
	      return origin
	    }

	    if (origin === 'pino/file') {
	      return join(__dirname, '..', 'file.js')
	    }

	    let fixTarget;

	    for (const filePath of callers) {
	      try {
	        const context = filePath === 'node:repl'
	          ? process.cwd() + sep
	          : filePath;

	        fixTarget = createRequire(context).resolve(origin);
	        break
	      } catch (err) {
	        // Silent catch
	        continue
	      }
	    }

	    if (!fixTarget) {
	      throw new Error(`unable to determine transport target for "${origin}"`)
	    }

	    return fixTarget
	  }
	}

	transport_1 = transport;
	return transport_1;
}

var tools;
var hasRequiredTools;

function requireTools () {
	if (hasRequiredTools) return tools;
	hasRequiredTools = 1;

	/* eslint no-prototype-builtins: 0 */

	const format = requireQuickFormatUnescaped();
	const { mapHttpRequest, mapHttpResponse } = requirePinoStdSerializers();
	const SonicBoom = requireSonicBoom();
	const onExit = requireOnExitLeakFree();
	const {
	  lsCacheSym,
	  chindingsSym,
	  writeSym,
	  serializersSym,
	  formatOptsSym,
	  endSym,
	  stringifiersSym,
	  stringifySym,
	  stringifySafeSym,
	  wildcardFirstSym,
	  nestedKeySym,
	  formattersSym,
	  messageKeySym,
	  errorKeySym,
	  nestedKeyStrSym,
	  msgPrefixSym
	} = requireSymbols();
	const { isMainThread } = require$$2$1;
	const transport = requireTransport();

	function noop () {
	}

	function genLog (level, hook) {
	  if (!hook) return LOG

	  return function hookWrappedLog (...args) {
	    hook.call(this, args, LOG, level);
	  }

	  function LOG (o, ...n) {
	    if (typeof o === 'object') {
	      let msg = o;
	      if (o !== null) {
	        if (o.method && o.headers && o.socket) {
	          o = mapHttpRequest(o);
	        } else if (typeof o.setHeader === 'function') {
	          o = mapHttpResponse(o);
	        }
	      }
	      let formatParams;
	      if (msg === null && n.length === 0) {
	        formatParams = [null];
	      } else {
	        msg = n.shift();
	        formatParams = n;
	      }
	      // We do not use a coercive check for `msg` as it is
	      // measurably slower than the explicit checks.
	      if (typeof this[msgPrefixSym] === 'string' && msg !== undefined && msg !== null) {
	        msg = this[msgPrefixSym] + msg;
	      }
	      this[writeSym](o, format(msg, formatParams, this[formatOptsSym]), level);
	    } else {
	      let msg = o === undefined ? n.shift() : o;

	      // We do not use a coercive check for `msg` as it is
	      // measurably slower than the explicit checks.
	      if (typeof this[msgPrefixSym] === 'string' && msg !== undefined && msg !== null) {
	        msg = this[msgPrefixSym] + msg;
	      }
	      this[writeSym](null, format(msg, n, this[formatOptsSym]), level);
	    }
	  }
	}

	// magically escape strings for json
	// relying on their charCodeAt
	// everything below 32 needs JSON.stringify()
	// 34 and 92 happens all the time, so we
	// have a fast case for them
	function asString (str) {
	  let result = '';
	  let last = 0;
	  let found = false;
	  let point = 255;
	  const l = str.length;
	  if (l > 100) {
	    return JSON.stringify(str)
	  }
	  for (var i = 0; i < l && point >= 32; i++) {
	    point = str.charCodeAt(i);
	    if (point === 34 || point === 92) {
	      result += str.slice(last, i) + '\\';
	      last = i;
	      found = true;
	    }
	  }
	  if (!found) {
	    result = str;
	  } else {
	    result += str.slice(last);
	  }
	  return point < 32 ? JSON.stringify(str) : '"' + result + '"'
	}

	function asJson (obj, msg, num, time) {
	  const stringify = this[stringifySym];
	  const stringifySafe = this[stringifySafeSym];
	  const stringifiers = this[stringifiersSym];
	  const end = this[endSym];
	  const chindings = this[chindingsSym];
	  const serializers = this[serializersSym];
	  const formatters = this[formattersSym];
	  const messageKey = this[messageKeySym];
	  const errorKey = this[errorKeySym];
	  let data = this[lsCacheSym][num] + time;

	  // we need the child bindings added to the output first so instance logged
	  // objects can take precedence when JSON.parse-ing the resulting log line
	  data = data + chindings;

	  let value;
	  if (formatters.log) {
	    obj = formatters.log(obj);
	  }
	  const wildcardStringifier = stringifiers[wildcardFirstSym];
	  let propStr = '';
	  for (const key in obj) {
	    value = obj[key];
	    if (Object.prototype.hasOwnProperty.call(obj, key) && value !== undefined) {
	      if (serializers[key]) {
	        value = serializers[key](value);
	      } else if (key === errorKey && serializers.err) {
	        value = serializers.err(value);
	      }

	      const stringifier = stringifiers[key] || wildcardStringifier;

	      switch (typeof value) {
	        case 'undefined':
	        case 'function':
	          continue
	        case 'number':
	          /* eslint no-fallthrough: "off" */
	          if (Number.isFinite(value) === false) {
	            value = null;
	          }
	        // this case explicitly falls through to the next one
	        case 'boolean':
	          if (stringifier) value = stringifier(value);
	          break
	        case 'string':
	          value = (stringifier || asString)(value);
	          break
	        default:
	          value = (stringifier || stringify)(value, stringifySafe);
	      }
	      if (value === undefined) continue
	      const strKey = asString(key);
	      propStr += ',' + strKey + ':' + value;
	    }
	  }

	  let msgStr = '';
	  if (msg !== undefined) {
	    value = serializers[messageKey] ? serializers[messageKey](msg) : msg;
	    const stringifier = stringifiers[messageKey] || wildcardStringifier;

	    switch (typeof value) {
	      case 'function':
	        break
	      case 'number':
	        /* eslint no-fallthrough: "off" */
	        if (Number.isFinite(value) === false) {
	          value = null;
	        }
	      // this case explicitly falls through to the next one
	      case 'boolean':
	        if (stringifier) value = stringifier(value);
	        msgStr = ',"' + messageKey + '":' + value;
	        break
	      case 'string':
	        value = (stringifier || asString)(value);
	        msgStr = ',"' + messageKey + '":' + value;
	        break
	      default:
	        value = (stringifier || stringify)(value, stringifySafe);
	        msgStr = ',"' + messageKey + '":' + value;
	    }
	  }

	  if (this[nestedKeySym] && propStr) {
	    // place all the obj properties under the specified key
	    // the nested key is already formatted from the constructor
	    return data + this[nestedKeyStrSym] + propStr.slice(1) + '}' + msgStr + end
	  } else {
	    return data + propStr + msgStr + end
	  }
	}

	function asChindings (instance, bindings) {
	  let value;
	  let data = instance[chindingsSym];
	  const stringify = instance[stringifySym];
	  const stringifySafe = instance[stringifySafeSym];
	  const stringifiers = instance[stringifiersSym];
	  const wildcardStringifier = stringifiers[wildcardFirstSym];
	  const serializers = instance[serializersSym];
	  const formatter = instance[formattersSym].bindings;
	  bindings = formatter(bindings);

	  for (const key in bindings) {
	    value = bindings[key];
	    const valid = key !== 'level' &&
	      key !== 'serializers' &&
	      key !== 'formatters' &&
	      key !== 'customLevels' &&
	      bindings.hasOwnProperty(key) &&
	      value !== undefined;
	    if (valid === true) {
	      value = serializers[key] ? serializers[key](value) : value;
	      value = (stringifiers[key] || wildcardStringifier || stringify)(value, stringifySafe);
	      if (value === undefined) continue
	      data += ',"' + key + '":' + value;
	    }
	  }
	  return data
	}

	function hasBeenTampered (stream) {
	  return stream.write !== stream.constructor.prototype.write
	}

	function buildSafeSonicBoom (opts) {
	  const stream = new SonicBoom(opts);
	  stream.on('error', filterBrokenPipe);
	  // If we are sync: false, we must flush on exit
	  if (!opts.sync && isMainThread) {
	    onExit.register(stream, autoEnd);

	    stream.on('close', function () {
	      onExit.unregister(stream);
	    });
	  }
	  return stream

	  function filterBrokenPipe (err) {
	    // Impossible to replicate across all operating systems
	    /* istanbul ignore next */
	    if (err.code === 'EPIPE') {
	      // If we get EPIPE, we should stop logging here
	      // however we have no control to the consumer of
	      // SonicBoom, so we just overwrite the write method
	      stream.write = noop;
	      stream.end = noop;
	      stream.flushSync = noop;
	      stream.destroy = noop;
	      return
	    }
	    stream.removeListener('error', filterBrokenPipe);
	    stream.emit('error', err);
	  }
	}

	function autoEnd (stream, eventName) {
	  // This check is needed only on some platforms
	  /* istanbul ignore next */
	  if (stream.destroyed) {
	    return
	  }

	  if (eventName === 'beforeExit') {
	    // We still have an event loop, let's use it
	    stream.flush();
	    stream.on('drain', function () {
	      stream.end();
	    });
	  } else {
	    // For some reason istanbul is not detecting this, but it's there
	    /* istanbul ignore next */
	    // We do not have an event loop, so flush synchronously
	    stream.flushSync();
	  }
	}

	function createArgsNormalizer (defaultOptions) {
	  return function normalizeArgs (instance, caller, opts = {}, stream) {
	    // support stream as a string
	    if (typeof opts === 'string') {
	      stream = buildSafeSonicBoom({ dest: opts });
	      opts = {};
	    } else if (typeof stream === 'string') {
	      if (opts && opts.transport) {
	        throw Error('only one of option.transport or stream can be specified')
	      }
	      stream = buildSafeSonicBoom({ dest: stream });
	    } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
	      stream = opts;
	      opts = {};
	    } else if (opts.transport) {
	      if (opts.transport instanceof SonicBoom || opts.transport.writable || opts.transport._writableState) {
	        throw Error('option.transport do not allow stream, please pass to option directly. e.g. pino(transport)')
	      }
	      if (opts.transport.targets && opts.transport.targets.length && opts.formatters && typeof opts.formatters.level === 'function') {
	        throw Error('option.transport.targets do not allow custom level formatters')
	      }

	      let customLevels;
	      if (opts.customLevels) {
	        customLevels = opts.useOnlyCustomLevels ? opts.customLevels : Object.assign({}, opts.levels, opts.customLevels);
	      }
	      stream = transport({ caller, ...opts.transport, levels: customLevels });
	    }
	    opts = Object.assign({}, defaultOptions, opts);
	    opts.serializers = Object.assign({}, defaultOptions.serializers, opts.serializers);
	    opts.formatters = Object.assign({}, defaultOptions.formatters, opts.formatters);

	    if (opts.prettyPrint) {
	      throw new Error('prettyPrint option is no longer supported, see the pino-pretty package (https://github.com/pinojs/pino-pretty)')
	    }

	    const { enabled, onChild } = opts;
	    if (enabled === false) opts.level = 'silent';
	    if (!onChild) opts.onChild = noop;
	    if (!stream) {
	      if (!hasBeenTampered(process.stdout)) {
	        // If process.stdout.fd is undefined, it means that we are running
	        // in a worker thread. Let's assume we are logging to file descriptor 1.
	        stream = buildSafeSonicBoom({ fd: process.stdout.fd || 1 });
	      } else {
	        stream = process.stdout;
	      }
	    }
	    return { opts, stream }
	  }
	}

	function stringify (obj, stringifySafeFn) {
	  try {
	    return JSON.stringify(obj)
	  } catch (_) {
	    try {
	      const stringify = stringifySafeFn || this[stringifySafeSym];
	      return stringify(obj)
	    } catch (_) {
	      return '"[unable to serialize, circular reference is too complex to analyze]"'
	    }
	  }
	}

	function buildFormatters (level, bindings, log) {
	  return {
	    level,
	    bindings,
	    log
	  }
	}

	/**
	 * Convert a string integer file descriptor to a proper native integer
	 * file descriptor.
	 *
	 * @param {string} destination The file descriptor string to attempt to convert.
	 *
	 * @returns {Number}
	 */
	function normalizeDestFileDescriptor (destination) {
	  const fd = Number(destination);
	  if (typeof destination === 'string' && Number.isFinite(fd)) {
	    return fd
	  }
	  // destination could be undefined if we are in a worker
	  if (destination === undefined) {
	    // This is stdout in UNIX systems
	    return 1
	  }
	  return destination
	}

	tools = {
	  noop,
	  buildSafeSonicBoom,
	  asChindings,
	  asJson,
	  genLog,
	  createArgsNormalizer,
	  stringify,
	  buildFormatters,
	  normalizeDestFileDescriptor
	};
	return tools;
}

/**
 * Represents default log level values
 *
 * @enum {number}
 */

var constants;
var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	const DEFAULT_LEVELS = {
	  trace: 10,
	  debug: 20,
	  info: 30,
	  warn: 40,
	  error: 50,
	  fatal: 60
	};

	/**
	 * Represents sort order direction: `ascending` or `descending`
	 *
	 * @enum {string}
	 */
	const SORTING_ORDER = {
	  ASC: 'ASC',
	  DESC: 'DESC'
	};

	constants = {
	  DEFAULT_LEVELS,
	  SORTING_ORDER
	};
	return constants;
}

var levels;
var hasRequiredLevels;

function requireLevels () {
	if (hasRequiredLevels) return levels;
	hasRequiredLevels = 1;
	/* eslint no-prototype-builtins: 0 */
	const {
	  lsCacheSym,
	  levelValSym,
	  useOnlyCustomLevelsSym,
	  streamSym,
	  formattersSym,
	  hooksSym,
	  levelCompSym
	} = requireSymbols();
	const { noop, genLog } = requireTools();
	const { DEFAULT_LEVELS, SORTING_ORDER } = requireConstants();

	const levelMethods = {
	  fatal: (hook) => {
	    const logFatal = genLog(DEFAULT_LEVELS.fatal, hook);
	    return function (...args) {
	      const stream = this[streamSym];
	      logFatal.call(this, ...args);
	      if (typeof stream.flushSync === 'function') {
	        try {
	          stream.flushSync();
	        } catch (e) {
	          // https://github.com/pinojs/pino/pull/740#discussion_r346788313
	        }
	      }
	    }
	  },
	  error: (hook) => genLog(DEFAULT_LEVELS.error, hook),
	  warn: (hook) => genLog(DEFAULT_LEVELS.warn, hook),
	  info: (hook) => genLog(DEFAULT_LEVELS.info, hook),
	  debug: (hook) => genLog(DEFAULT_LEVELS.debug, hook),
	  trace: (hook) => genLog(DEFAULT_LEVELS.trace, hook)
	};

	const nums = Object.keys(DEFAULT_LEVELS).reduce((o, k) => {
	  o[DEFAULT_LEVELS[k]] = k;
	  return o
	}, {});

	const initialLsCache = Object.keys(nums).reduce((o, k) => {
	  o[k] = '{"level":' + Number(k);
	  return o
	}, {});

	function genLsCache (instance) {
	  const formatter = instance[formattersSym].level;
	  const { labels } = instance.levels;
	  const cache = {};
	  for (const label in labels) {
	    const level = formatter(labels[label], Number(label));
	    cache[label] = JSON.stringify(level).slice(0, -1);
	  }
	  instance[lsCacheSym] = cache;
	  return instance
	}

	function isStandardLevel (level, useOnlyCustomLevels) {
	  if (useOnlyCustomLevels) {
	    return false
	  }

	  switch (level) {
	    case 'fatal':
	    case 'error':
	    case 'warn':
	    case 'info':
	    case 'debug':
	    case 'trace':
	      return true
	    default:
	      return false
	  }
	}

	function setLevel (level) {
	  const { labels, values } = this.levels;
	  if (typeof level === 'number') {
	    if (labels[level] === undefined) throw Error('unknown level value' + level)
	    level = labels[level];
	  }
	  if (values[level] === undefined) throw Error('unknown level ' + level)
	  const preLevelVal = this[levelValSym];
	  const levelVal = this[levelValSym] = values[level];
	  const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym];
	  const levelComparison = this[levelCompSym];
	  const hook = this[hooksSym].logMethod;

	  for (const key in values) {
	    if (levelComparison(values[key], levelVal) === false) {
	      this[key] = noop;
	      continue
	    }
	    this[key] = isStandardLevel(key, useOnlyCustomLevelsVal) ? levelMethods[key](hook) : genLog(values[key], hook);
	  }

	  this.emit(
	    'level-change',
	    level,
	    levelVal,
	    labels[preLevelVal],
	    preLevelVal,
	    this
	  );
	}

	function getLevel (level) {
	  const { levels, levelVal } = this;
	  // protection against potential loss of Pino scope from serializers (edge case with circular refs - https://github.com/pinojs/pino/issues/833)
	  return (levels && levels.labels) ? levels.labels[levelVal] : ''
	}

	function isLevelEnabled (logLevel) {
	  const { values } = this.levels;
	  const logLevelVal = values[logLevel];
	  return logLevelVal !== undefined && this[levelCompSym](logLevelVal, this[levelValSym])
	}

	/**
	 * Determine if the given `current` level is enabled by comparing it
	 * against the current threshold (`expected`).
	 *
	 * @param {SORTING_ORDER} direction comparison direction "ASC" or "DESC"
	 * @param {number} current current log level number representation
	 * @param {number} expected threshold value to compare with
	 * @returns {boolean}
	 */
	function compareLevel (direction, current, expected) {
	  if (direction === SORTING_ORDER.DESC) {
	    return current <= expected
	  }

	  return current >= expected
	}

	/**
	 * Create a level comparison function based on `levelComparison`
	 * it could a default function which compares levels either in "ascending" or "descending" order or custom comparison function
	 *
	 * @param {SORTING_ORDER | Function} levelComparison sort levels order direction or custom comparison function
	 * @returns Function
	 */
	function genLevelComparison (levelComparison) {
	  if (typeof levelComparison === 'string') {
	    return compareLevel.bind(null, levelComparison)
	  }

	  return levelComparison
	}

	function mappings (customLevels = null, useOnlyCustomLevels = false) {
	  const customNums = customLevels
	    /* eslint-disable */
	    ? Object.keys(customLevels).reduce((o, k) => {
	        o[customLevels[k]] = k;
	        return o
	      }, {})
	    : null;
	    /* eslint-enable */

	  const labels = Object.assign(
	    Object.create(Object.prototype, { Infinity: { value: 'silent' } }),
	    useOnlyCustomLevels ? null : nums,
	    customNums
	  );
	  const values = Object.assign(
	    Object.create(Object.prototype, { silent: { value: Infinity } }),
	    useOnlyCustomLevels ? null : DEFAULT_LEVELS,
	    customLevels
	  );
	  return { labels, values }
	}

	function assertDefaultLevelFound (defaultLevel, customLevels, useOnlyCustomLevels) {
	  if (typeof defaultLevel === 'number') {
	    const values = [].concat(
	      Object.keys(customLevels || {}).map(key => customLevels[key]),
	      useOnlyCustomLevels ? [] : Object.keys(nums).map(level => +level),
	      Infinity
	    );
	    if (!values.includes(defaultLevel)) {
	      throw Error(`default level:${defaultLevel} must be included in custom levels`)
	    }
	    return
	  }

	  const labels = Object.assign(
	    Object.create(Object.prototype, { silent: { value: Infinity } }),
	    useOnlyCustomLevels ? null : DEFAULT_LEVELS,
	    customLevels
	  );
	  if (!(defaultLevel in labels)) {
	    throw Error(`default level:${defaultLevel} must be included in custom levels`)
	  }
	}

	function assertNoLevelCollisions (levels, customLevels) {
	  const { labels, values } = levels;
	  for (const k in customLevels) {
	    if (k in values) {
	      throw Error('levels cannot be overridden')
	    }
	    if (customLevels[k] in labels) {
	      throw Error('pre-existing level values cannot be used for new levels')
	    }
	  }
	}

	/**
	 * Validates whether `levelComparison` is correct
	 *
	 * @throws Error
	 * @param {SORTING_ORDER | Function} levelComparison - value to validate
	 * @returns
	 */
	function assertLevelComparison (levelComparison) {
	  if (typeof levelComparison === 'function') {
	    return
	  }

	  if (typeof levelComparison === 'string' && Object.values(SORTING_ORDER).includes(levelComparison)) {
	    return
	  }

	  throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type')
	}

	levels = {
	  initialLsCache,
	  genLsCache,
	  levelMethods,
	  getLevel,
	  setLevel,
	  isLevelEnabled,
	  mappings,
	  assertNoLevelCollisions,
	  assertDefaultLevelFound,
	  genLevelComparison,
	  assertLevelComparison
	};
	return levels;
}

var meta;
var hasRequiredMeta;

function requireMeta () {
	if (hasRequiredMeta) return meta;
	hasRequiredMeta = 1;

	meta = { version: '9.9.0' };
	return meta;
}

var proto;
var hasRequiredProto;

function requireProto () {
	if (hasRequiredProto) return proto;
	hasRequiredProto = 1;

	/* eslint no-prototype-builtins: 0 */

	const { EventEmitter } = require$$0$3;
	const {
	  lsCacheSym,
	  levelValSym,
	  setLevelSym,
	  getLevelSym,
	  chindingsSym,
	  parsedChindingsSym,
	  mixinSym,
	  asJsonSym,
	  writeSym,
	  mixinMergeStrategySym,
	  timeSym,
	  timeSliceIndexSym,
	  streamSym,
	  serializersSym,
	  formattersSym,
	  errorKeySym,
	  messageKeySym,
	  useOnlyCustomLevelsSym,
	  needsMetadataGsym,
	  redactFmtSym,
	  stringifySym,
	  formatOptsSym,
	  stringifiersSym,
	  msgPrefixSym,
	  hooksSym
	} = requireSymbols();
	const {
	  getLevel,
	  setLevel,
	  isLevelEnabled,
	  mappings,
	  initialLsCache,
	  genLsCache,
	  assertNoLevelCollisions
	} = requireLevels();
	const {
	  asChindings,
	  asJson,
	  buildFormatters,
	  stringify
	} = requireTools();
	const {
	  version
	} = requireMeta();
	const redaction = requireRedaction();

	// note: use of class is satirical
	// https://github.com/pinojs/pino/pull/433#pullrequestreview-127703127
	const constructor = class Pino {};
	const prototype = {
	  constructor,
	  child,
	  bindings,
	  setBindings,
	  flush,
	  isLevelEnabled,
	  version,
	  get level () { return this[getLevelSym]() },
	  set level (lvl) { this[setLevelSym](lvl); },
	  get levelVal () { return this[levelValSym] },
	  set levelVal (n) { throw Error('levelVal is read-only') },
	  get msgPrefix () { return this[msgPrefixSym] },
	  [lsCacheSym]: initialLsCache,
	  [writeSym]: write,
	  [asJsonSym]: asJson,
	  [getLevelSym]: getLevel,
	  [setLevelSym]: setLevel
	};

	Object.setPrototypeOf(prototype, EventEmitter.prototype);

	// exporting and consuming the prototype object using factory pattern fixes scoping issues with getters when serializing
	proto = function () {
	  return Object.create(prototype)
	};

	const resetChildingsFormatter = bindings => bindings;
	function child (bindings, options) {
	  if (!bindings) {
	    throw Error('missing bindings for child Pino')
	  }
	  options = options || {}; // default options to empty object
	  const serializers = this[serializersSym];
	  const formatters = this[formattersSym];
	  const instance = Object.create(this);

	  if (options.hasOwnProperty('serializers') === true) {
	    instance[serializersSym] = Object.create(null);

	    for (const k in serializers) {
	      instance[serializersSym][k] = serializers[k];
	    }
	    const parentSymbols = Object.getOwnPropertySymbols(serializers);
	    /* eslint no-var: off */
	    for (var i = 0; i < parentSymbols.length; i++) {
	      const ks = parentSymbols[i];
	      instance[serializersSym][ks] = serializers[ks];
	    }

	    for (const bk in options.serializers) {
	      instance[serializersSym][bk] = options.serializers[bk];
	    }
	    const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
	    for (var bi = 0; bi < bindingsSymbols.length; bi++) {
	      const bks = bindingsSymbols[bi];
	      instance[serializersSym][bks] = options.serializers[bks];
	    }
	  } else instance[serializersSym] = serializers;
	  if (options.hasOwnProperty('formatters')) {
	    const { level, bindings: chindings, log } = options.formatters;
	    instance[formattersSym] = buildFormatters(
	      level || formatters.level,
	      chindings || resetChildingsFormatter,
	      log || formatters.log
	    );
	  } else {
	    instance[formattersSym] = buildFormatters(
	      formatters.level,
	      resetChildingsFormatter,
	      formatters.log
	    );
	  }
	  if (options.hasOwnProperty('customLevels') === true) {
	    assertNoLevelCollisions(this.levels, options.customLevels);
	    instance.levels = mappings(options.customLevels, instance[useOnlyCustomLevelsSym]);
	    genLsCache(instance);
	  }

	  // redact must place before asChindings and only replace if exist
	  if ((typeof options.redact === 'object' && options.redact !== null) || Array.isArray(options.redact)) {
	    instance.redact = options.redact; // replace redact directly
	    const stringifiers = redaction(instance.redact, stringify);
	    const formatOpts = { stringify: stringifiers[redactFmtSym] };
	    instance[stringifySym] = stringify;
	    instance[stringifiersSym] = stringifiers;
	    instance[formatOptsSym] = formatOpts;
	  }

	  if (typeof options.msgPrefix === 'string') {
	    instance[msgPrefixSym] = (this[msgPrefixSym] || '') + options.msgPrefix;
	  }

	  instance[chindingsSym] = asChindings(instance, bindings);
	  const childLevel = options.level || this.level;
	  instance[setLevelSym](childLevel);
	  this.onChild(instance);
	  return instance
	}

	function bindings () {
	  const chindings = this[chindingsSym];
	  const chindingsJson = `{${chindings.substr(1)}}`; // at least contains ,"pid":7068,"hostname":"myMac"
	  const bindingsFromJson = JSON.parse(chindingsJson);
	  delete bindingsFromJson.pid;
	  delete bindingsFromJson.hostname;
	  return bindingsFromJson
	}

	function setBindings (newBindings) {
	  const chindings = asChindings(this, newBindings);
	  this[chindingsSym] = chindings;
	  delete this[parsedChindingsSym];
	}

	/**
	 * Default strategy for creating `mergeObject` from arguments and the result from `mixin()`.
	 * Fields from `mergeObject` have higher priority in this strategy.
	 *
	 * @param {Object} mergeObject The object a user has supplied to the logging function.
	 * @param {Object} mixinObject The result of the `mixin` method.
	 * @return {Object}
	 */
	function defaultMixinMergeStrategy (mergeObject, mixinObject) {
	  return Object.assign(mixinObject, mergeObject)
	}

	function write (_obj, msg, num) {
	  const t = this[timeSym]();
	  const mixin = this[mixinSym];
	  const errorKey = this[errorKeySym];
	  const messageKey = this[messageKeySym];
	  const mixinMergeStrategy = this[mixinMergeStrategySym] || defaultMixinMergeStrategy;
	  let obj;
	  const streamWriteHook = this[hooksSym].streamWrite;

	  if (_obj === undefined || _obj === null) {
	    obj = {};
	  } else if (_obj instanceof Error) {
	    obj = { [errorKey]: _obj };
	    if (msg === undefined) {
	      msg = _obj.message;
	    }
	  } else {
	    obj = _obj;
	    if (msg === undefined && _obj[messageKey] === undefined && _obj[errorKey]) {
	      msg = _obj[errorKey].message;
	    }
	  }

	  if (mixin) {
	    obj = mixinMergeStrategy(obj, mixin(obj, num, this));
	  }

	  const s = this[asJsonSym](obj, msg, num, t);

	  const stream = this[streamSym];
	  if (stream[needsMetadataGsym] === true) {
	    stream.lastLevel = num;
	    stream.lastObj = obj;
	    stream.lastMsg = msg;
	    stream.lastTime = t.slice(this[timeSliceIndexSym]);
	    stream.lastLogger = this; // for child loggers
	  }
	  stream.write(streamWriteHook ? streamWriteHook(s) : s);
	}

	function noop () {}

	function flush (cb) {
	  if (cb != null && typeof cb !== 'function') {
	    throw Error('callback must be a function')
	  }

	  const stream = this[streamSym];

	  if (typeof stream.flush === 'function') {
	    stream.flush(cb || noop);
	  } else if (cb) cb();
	}
	return proto;
}

var safeStableStringify = {exports: {}};

var hasRequiredSafeStableStringify;

function requireSafeStableStringify () {
	if (hasRequiredSafeStableStringify) return safeStableStringify.exports;
	hasRequiredSafeStableStringify = 1;
	(function (module, exports) {

		const { hasOwnProperty } = Object.prototype;

		const stringify = configure();

		// @ts-expect-error
		stringify.configure = configure;
		// @ts-expect-error
		stringify.stringify = stringify;

		// @ts-expect-error
		stringify.default = stringify;

		// @ts-expect-error used for named export
		exports.stringify = stringify;
		// @ts-expect-error used for named export
		exports.configure = configure;

		module.exports = stringify;

		// eslint-disable-next-line no-control-regex
		const strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;

		// Escape C0 control characters, double quotes, the backslash and every code
		// unit with a numeric value in the inclusive range 0xD800 to 0xDFFF.
		function strEscape (str) {
		  // Some magic numbers that worked out fine while benchmarking with v8 8.0
		  if (str.length < 5000 && !strEscapeSequencesRegExp.test(str)) {
		    return `"${str}"`
		  }
		  return JSON.stringify(str)
		}

		function sort (array, comparator) {
		  // Insertion sort is very efficient for small input sizes, but it has a bad
		  // worst case complexity. Thus, use native array sort for bigger values.
		  if (array.length > 2e2 || comparator) {
		    return array.sort(comparator)
		  }
		  for (let i = 1; i < array.length; i++) {
		    const currentValue = array[i];
		    let position = i;
		    while (position !== 0 && array[position - 1] > currentValue) {
		      array[position] = array[position - 1];
		      position--;
		    }
		    array[position] = currentValue;
		  }
		  return array
		}

		const typedArrayPrototypeGetSymbolToStringTag =
		  Object.getOwnPropertyDescriptor(
		    Object.getPrototypeOf(
		      Object.getPrototypeOf(
		        new Int8Array()
		      )
		    ),
		    Symbol.toStringTag
		  ).get;

		function isTypedArrayWithEntries (value) {
		  return typedArrayPrototypeGetSymbolToStringTag.call(value) !== undefined && value.length !== 0
		}

		function stringifyTypedArray (array, separator, maximumBreadth) {
		  if (array.length < maximumBreadth) {
		    maximumBreadth = array.length;
		  }
		  const whitespace = separator === ',' ? '' : ' ';
		  let res = `"0":${whitespace}${array[0]}`;
		  for (let i = 1; i < maximumBreadth; i++) {
		    res += `${separator}"${i}":${whitespace}${array[i]}`;
		  }
		  return res
		}

		function getCircularValueOption (options) {
		  if (hasOwnProperty.call(options, 'circularValue')) {
		    const circularValue = options.circularValue;
		    if (typeof circularValue === 'string') {
		      return `"${circularValue}"`
		    }
		    if (circularValue == null) {
		      return circularValue
		    }
		    if (circularValue === Error || circularValue === TypeError) {
		      return {
		        toString () {
		          throw new TypeError('Converting circular structure to JSON')
		        }
		      }
		    }
		    throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined')
		  }
		  return '"[Circular]"'
		}

		function getDeterministicOption (options) {
		  let value;
		  if (hasOwnProperty.call(options, 'deterministic')) {
		    value = options.deterministic;
		    if (typeof value !== 'boolean' && typeof value !== 'function') {
		      throw new TypeError('The "deterministic" argument must be of type boolean or comparator function')
		    }
		  }
		  return value === undefined ? true : value
		}

		function getBooleanOption (options, key) {
		  let value;
		  if (hasOwnProperty.call(options, key)) {
		    value = options[key];
		    if (typeof value !== 'boolean') {
		      throw new TypeError(`The "${key}" argument must be of type boolean`)
		    }
		  }
		  return value === undefined ? true : value
		}

		function getPositiveIntegerOption (options, key) {
		  let value;
		  if (hasOwnProperty.call(options, key)) {
		    value = options[key];
		    if (typeof value !== 'number') {
		      throw new TypeError(`The "${key}" argument must be of type number`)
		    }
		    if (!Number.isInteger(value)) {
		      throw new TypeError(`The "${key}" argument must be an integer`)
		    }
		    if (value < 1) {
		      throw new RangeError(`The "${key}" argument must be >= 1`)
		    }
		  }
		  return value === undefined ? Infinity : value
		}

		function getItemCount (number) {
		  if (number === 1) {
		    return '1 item'
		  }
		  return `${number} items`
		}

		function getUniqueReplacerSet (replacerArray) {
		  const replacerSet = new Set();
		  for (const value of replacerArray) {
		    if (typeof value === 'string' || typeof value === 'number') {
		      replacerSet.add(String(value));
		    }
		  }
		  return replacerSet
		}

		function getStrictOption (options) {
		  if (hasOwnProperty.call(options, 'strict')) {
		    const value = options.strict;
		    if (typeof value !== 'boolean') {
		      throw new TypeError('The "strict" argument must be of type boolean')
		    }
		    if (value) {
		      return (value) => {
		        let message = `Object can not safely be stringified. Received type ${typeof value}`;
		        if (typeof value !== 'function') message += ` (${value.toString()})`;
		        throw new Error(message)
		      }
		    }
		  }
		}

		function configure (options) {
		  options = { ...options };
		  const fail = getStrictOption(options);
		  if (fail) {
		    if (options.bigint === undefined) {
		      options.bigint = false;
		    }
		    if (!('circularValue' in options)) {
		      options.circularValue = Error;
		    }
		  }
		  const circularValue = getCircularValueOption(options);
		  const bigint = getBooleanOption(options, 'bigint');
		  const deterministic = getDeterministicOption(options);
		  const comparator = typeof deterministic === 'function' ? deterministic : undefined;
		  const maximumDepth = getPositiveIntegerOption(options, 'maximumDepth');
		  const maximumBreadth = getPositiveIntegerOption(options, 'maximumBreadth');

		  function stringifyFnReplacer (key, parent, stack, replacer, spacer, indentation) {
		    let value = parent[key];

		    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
		      value = value.toJSON(key);
		    }
		    value = replacer.call(parent, key, value);

		    switch (typeof value) {
		      case 'string':
		        return strEscape(value)
		      case 'object': {
		        if (value === null) {
		          return 'null'
		        }
		        if (stack.indexOf(value) !== -1) {
		          return circularValue
		        }

		        let res = '';
		        let join = ',';
		        const originalIndentation = indentation;

		        if (Array.isArray(value)) {
		          if (value.length === 0) {
		            return '[]'
		          }
		          if (maximumDepth < stack.length + 1) {
		            return '"[Array]"'
		          }
		          stack.push(value);
		          if (spacer !== '') {
		            indentation += spacer;
		            res += `\n${indentation}`;
		            join = `,\n${indentation}`;
		          }
		          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
		          let i = 0;
		          for (; i < maximumValuesToStringify - 1; i++) {
		            const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
		            res += tmp !== undefined ? tmp : 'null';
		            res += join;
		          }
		          const tmp = stringifyFnReplacer(String(i), value, stack, replacer, spacer, indentation);
		          res += tmp !== undefined ? tmp : 'null';
		          if (value.length - 1 > maximumBreadth) {
		            const removedKeys = value.length - maximumBreadth - 1;
		            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
		          }
		          if (spacer !== '') {
		            res += `\n${originalIndentation}`;
		          }
		          stack.pop();
		          return `[${res}]`
		        }

		        let keys = Object.keys(value);
		        const keyLength = keys.length;
		        if (keyLength === 0) {
		          return '{}'
		        }
		        if (maximumDepth < stack.length + 1) {
		          return '"[Object]"'
		        }
		        let whitespace = '';
		        let separator = '';
		        if (spacer !== '') {
		          indentation += spacer;
		          join = `,\n${indentation}`;
		          whitespace = ' ';
		        }
		        const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
		        if (deterministic && !isTypedArrayWithEntries(value)) {
		          keys = sort(keys, comparator);
		        }
		        stack.push(value);
		        for (let i = 0; i < maximumPropertiesToStringify; i++) {
		          const key = keys[i];
		          const tmp = stringifyFnReplacer(key, value, stack, replacer, spacer, indentation);
		          if (tmp !== undefined) {
		            res += `${separator}${strEscape(key)}:${whitespace}${tmp}`;
		            separator = join;
		          }
		        }
		        if (keyLength > maximumBreadth) {
		          const removedKeys = keyLength - maximumBreadth;
		          res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
		          separator = join;
		        }
		        if (spacer !== '' && separator.length > 1) {
		          res = `\n${indentation}${res}\n${originalIndentation}`;
		        }
		        stack.pop();
		        return `{${res}}`
		      }
		      case 'number':
		        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
		      case 'boolean':
		        return value === true ? 'true' : 'false'
		      case 'undefined':
		        return undefined
		      case 'bigint':
		        if (bigint) {
		          return String(value)
		        }
		        // fallthrough
		      default:
		        return fail ? fail(value) : undefined
		    }
		  }

		  function stringifyArrayReplacer (key, value, stack, replacer, spacer, indentation) {
		    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
		      value = value.toJSON(key);
		    }

		    switch (typeof value) {
		      case 'string':
		        return strEscape(value)
		      case 'object': {
		        if (value === null) {
		          return 'null'
		        }
		        if (stack.indexOf(value) !== -1) {
		          return circularValue
		        }

		        const originalIndentation = indentation;
		        let res = '';
		        let join = ',';

		        if (Array.isArray(value)) {
		          if (value.length === 0) {
		            return '[]'
		          }
		          if (maximumDepth < stack.length + 1) {
		            return '"[Array]"'
		          }
		          stack.push(value);
		          if (spacer !== '') {
		            indentation += spacer;
		            res += `\n${indentation}`;
		            join = `,\n${indentation}`;
		          }
		          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
		          let i = 0;
		          for (; i < maximumValuesToStringify - 1; i++) {
		            const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
		            res += tmp !== undefined ? tmp : 'null';
		            res += join;
		          }
		          const tmp = stringifyArrayReplacer(String(i), value[i], stack, replacer, spacer, indentation);
		          res += tmp !== undefined ? tmp : 'null';
		          if (value.length - 1 > maximumBreadth) {
		            const removedKeys = value.length - maximumBreadth - 1;
		            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
		          }
		          if (spacer !== '') {
		            res += `\n${originalIndentation}`;
		          }
		          stack.pop();
		          return `[${res}]`
		        }
		        stack.push(value);
		        let whitespace = '';
		        if (spacer !== '') {
		          indentation += spacer;
		          join = `,\n${indentation}`;
		          whitespace = ' ';
		        }
		        let separator = '';
		        for (const key of replacer) {
		          const tmp = stringifyArrayReplacer(key, value[key], stack, replacer, spacer, indentation);
		          if (tmp !== undefined) {
		            res += `${separator}${strEscape(key)}:${whitespace}${tmp}`;
		            separator = join;
		          }
		        }
		        if (spacer !== '' && separator.length > 1) {
		          res = `\n${indentation}${res}\n${originalIndentation}`;
		        }
		        stack.pop();
		        return `{${res}}`
		      }
		      case 'number':
		        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
		      case 'boolean':
		        return value === true ? 'true' : 'false'
		      case 'undefined':
		        return undefined
		      case 'bigint':
		        if (bigint) {
		          return String(value)
		        }
		        // fallthrough
		      default:
		        return fail ? fail(value) : undefined
		    }
		  }

		  function stringifyIndent (key, value, stack, spacer, indentation) {
		    switch (typeof value) {
		      case 'string':
		        return strEscape(value)
		      case 'object': {
		        if (value === null) {
		          return 'null'
		        }
		        if (typeof value.toJSON === 'function') {
		          value = value.toJSON(key);
		          // Prevent calling `toJSON` again.
		          if (typeof value !== 'object') {
		            return stringifyIndent(key, value, stack, spacer, indentation)
		          }
		          if (value === null) {
		            return 'null'
		          }
		        }
		        if (stack.indexOf(value) !== -1) {
		          return circularValue
		        }
		        const originalIndentation = indentation;

		        if (Array.isArray(value)) {
		          if (value.length === 0) {
		            return '[]'
		          }
		          if (maximumDepth < stack.length + 1) {
		            return '"[Array]"'
		          }
		          stack.push(value);
		          indentation += spacer;
		          let res = `\n${indentation}`;
		          const join = `,\n${indentation}`;
		          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
		          let i = 0;
		          for (; i < maximumValuesToStringify - 1; i++) {
		            const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
		            res += tmp !== undefined ? tmp : 'null';
		            res += join;
		          }
		          const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
		          res += tmp !== undefined ? tmp : 'null';
		          if (value.length - 1 > maximumBreadth) {
		            const removedKeys = value.length - maximumBreadth - 1;
		            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
		          }
		          res += `\n${originalIndentation}`;
		          stack.pop();
		          return `[${res}]`
		        }

		        let keys = Object.keys(value);
		        const keyLength = keys.length;
		        if (keyLength === 0) {
		          return '{}'
		        }
		        if (maximumDepth < stack.length + 1) {
		          return '"[Object]"'
		        }
		        indentation += spacer;
		        const join = `,\n${indentation}`;
		        let res = '';
		        let separator = '';
		        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
		        if (isTypedArrayWithEntries(value)) {
		          res += stringifyTypedArray(value, join, maximumBreadth);
		          keys = keys.slice(value.length);
		          maximumPropertiesToStringify -= value.length;
		          separator = join;
		        }
		        if (deterministic) {
		          keys = sort(keys, comparator);
		        }
		        stack.push(value);
		        for (let i = 0; i < maximumPropertiesToStringify; i++) {
		          const key = keys[i];
		          const tmp = stringifyIndent(key, value[key], stack, spacer, indentation);
		          if (tmp !== undefined) {
		            res += `${separator}${strEscape(key)}: ${tmp}`;
		            separator = join;
		          }
		        }
		        if (keyLength > maximumBreadth) {
		          const removedKeys = keyLength - maximumBreadth;
		          res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
		          separator = join;
		        }
		        if (separator !== '') {
		          res = `\n${indentation}${res}\n${originalIndentation}`;
		        }
		        stack.pop();
		        return `{${res}}`
		      }
		      case 'number':
		        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
		      case 'boolean':
		        return value === true ? 'true' : 'false'
		      case 'undefined':
		        return undefined
		      case 'bigint':
		        if (bigint) {
		          return String(value)
		        }
		        // fallthrough
		      default:
		        return fail ? fail(value) : undefined
		    }
		  }

		  function stringifySimple (key, value, stack) {
		    switch (typeof value) {
		      case 'string':
		        return strEscape(value)
		      case 'object': {
		        if (value === null) {
		          return 'null'
		        }
		        if (typeof value.toJSON === 'function') {
		          value = value.toJSON(key);
		          // Prevent calling `toJSON` again
		          if (typeof value !== 'object') {
		            return stringifySimple(key, value, stack)
		          }
		          if (value === null) {
		            return 'null'
		          }
		        }
		        if (stack.indexOf(value) !== -1) {
		          return circularValue
		        }

		        let res = '';

		        const hasLength = value.length !== undefined;
		        if (hasLength && Array.isArray(value)) {
		          if (value.length === 0) {
		            return '[]'
		          }
		          if (maximumDepth < stack.length + 1) {
		            return '"[Array]"'
		          }
		          stack.push(value);
		          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
		          let i = 0;
		          for (; i < maximumValuesToStringify - 1; i++) {
		            const tmp = stringifySimple(String(i), value[i], stack);
		            res += tmp !== undefined ? tmp : 'null';
		            res += ',';
		          }
		          const tmp = stringifySimple(String(i), value[i], stack);
		          res += tmp !== undefined ? tmp : 'null';
		          if (value.length - 1 > maximumBreadth) {
		            const removedKeys = value.length - maximumBreadth - 1;
		            res += `,"... ${getItemCount(removedKeys)} not stringified"`;
		          }
		          stack.pop();
		          return `[${res}]`
		        }

		        let keys = Object.keys(value);
		        const keyLength = keys.length;
		        if (keyLength === 0) {
		          return '{}'
		        }
		        if (maximumDepth < stack.length + 1) {
		          return '"[Object]"'
		        }
		        let separator = '';
		        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
		        if (hasLength && isTypedArrayWithEntries(value)) {
		          res += stringifyTypedArray(value, ',', maximumBreadth);
		          keys = keys.slice(value.length);
		          maximumPropertiesToStringify -= value.length;
		          separator = ',';
		        }
		        if (deterministic) {
		          keys = sort(keys, comparator);
		        }
		        stack.push(value);
		        for (let i = 0; i < maximumPropertiesToStringify; i++) {
		          const key = keys[i];
		          const tmp = stringifySimple(key, value[key], stack);
		          if (tmp !== undefined) {
		            res += `${separator}${strEscape(key)}:${tmp}`;
		            separator = ',';
		          }
		        }
		        if (keyLength > maximumBreadth) {
		          const removedKeys = keyLength - maximumBreadth;
		          res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
		        }
		        stack.pop();
		        return `{${res}}`
		      }
		      case 'number':
		        return isFinite(value) ? String(value) : fail ? fail(value) : 'null'
		      case 'boolean':
		        return value === true ? 'true' : 'false'
		      case 'undefined':
		        return undefined
		      case 'bigint':
		        if (bigint) {
		          return String(value)
		        }
		        // fallthrough
		      default:
		        return fail ? fail(value) : undefined
		    }
		  }

		  function stringify (value, replacer, space) {
		    if (arguments.length > 1) {
		      let spacer = '';
		      if (typeof space === 'number') {
		        spacer = ' '.repeat(Math.min(space, 10));
		      } else if (typeof space === 'string') {
		        spacer = space.slice(0, 10);
		      }
		      if (replacer != null) {
		        if (typeof replacer === 'function') {
		          return stringifyFnReplacer('', { '': value }, [], replacer, spacer, '')
		        }
		        if (Array.isArray(replacer)) {
		          return stringifyArrayReplacer('', value, [], getUniqueReplacerSet(replacer), spacer, '')
		        }
		      }
		      if (spacer.length !== 0) {
		        return stringifyIndent('', value, [], spacer, '')
		      }
		    }
		    return stringifySimple('', value, [])
		  }

		  return stringify
		} 
	} (safeStableStringify, safeStableStringify.exports));
	return safeStableStringify.exports;
}

var multistream_1;
var hasRequiredMultistream;

function requireMultistream () {
	if (hasRequiredMultistream) return multistream_1;
	hasRequiredMultistream = 1;

	const metadata = Symbol.for('pino.metadata');
	const { DEFAULT_LEVELS } = requireConstants();

	const DEFAULT_INFO_LEVEL = DEFAULT_LEVELS.info;

	function multistream (streamsArray, opts) {
	  streamsArray = streamsArray || [];
	  opts = opts || { dedupe: false };

	  const streamLevels = Object.create(DEFAULT_LEVELS);
	  streamLevels.silent = Infinity;
	  if (opts.levels && typeof opts.levels === 'object') {
	    Object.keys(opts.levels).forEach(i => {
	      streamLevels[i] = opts.levels[i];
	    });
	  }

	  const res = {
	    write,
	    add,
	    remove,
	    emit,
	    flushSync,
	    end,
	    minLevel: 0,
	    lastId: 0,
	    streams: [],
	    clone,
	    [metadata]: true,
	    streamLevels
	  };

	  if (Array.isArray(streamsArray)) {
	    streamsArray.forEach(add, res);
	  } else {
	    add.call(res, streamsArray);
	  }

	  // clean this object up
	  // or it will stay allocated forever
	  // as it is closed on the following closures
	  streamsArray = null;

	  return res

	  // we can exit early because the streams are ordered by level
	  function write (data) {
	    let dest;
	    const level = this.lastLevel;
	    const { streams } = this;
	    // for handling situation when several streams has the same level
	    let recordedLevel = 0;
	    let stream;

	    // if dedupe set to true we send logs to the stream with the highest level
	    // therefore, we have to change sorting order
	    for (let i = initLoopVar(streams.length, opts.dedupe); checkLoopVar(i, streams.length, opts.dedupe); i = adjustLoopVar(i, opts.dedupe)) {
	      dest = streams[i];
	      if (dest.level <= level) {
	        if (recordedLevel !== 0 && recordedLevel !== dest.level) {
	          break
	        }
	        stream = dest.stream;
	        if (stream[metadata]) {
	          const { lastTime, lastMsg, lastObj, lastLogger } = this;
	          stream.lastLevel = level;
	          stream.lastTime = lastTime;
	          stream.lastMsg = lastMsg;
	          stream.lastObj = lastObj;
	          stream.lastLogger = lastLogger;
	        }
	        stream.write(data);
	        if (opts.dedupe) {
	          recordedLevel = dest.level;
	        }
	      } else if (!opts.dedupe) {
	        break
	      }
	    }
	  }

	  function emit (...args) {
	    for (const { stream } of this.streams) {
	      if (typeof stream.emit === 'function') {
	        stream.emit(...args);
	      }
	    }
	  }

	  function flushSync () {
	    for (const { stream } of this.streams) {
	      if (typeof stream.flushSync === 'function') {
	        stream.flushSync();
	      }
	    }
	  }

	  function add (dest) {
	    if (!dest) {
	      return res
	    }

	    // Check that dest implements either StreamEntry or DestinationStream
	    const isStream = typeof dest.write === 'function' || dest.stream;
	    const stream_ = dest.write ? dest : dest.stream;
	    // This is necessary to provide a meaningful error message, otherwise it throws somewhere inside write()
	    if (!isStream) {
	      throw Error('stream object needs to implement either StreamEntry or DestinationStream interface')
	    }

	    const { streams, streamLevels } = this;

	    let level;
	    if (typeof dest.levelVal === 'number') {
	      level = dest.levelVal;
	    } else if (typeof dest.level === 'string') {
	      level = streamLevels[dest.level];
	    } else if (typeof dest.level === 'number') {
	      level = dest.level;
	    } else {
	      level = DEFAULT_INFO_LEVEL;
	    }

	    const dest_ = {
	      stream: stream_,
	      level,
	      levelVal: undefined,
	      id: ++res.lastId
	    };

	    streams.unshift(dest_);
	    streams.sort(compareByLevel);

	    this.minLevel = streams[0].level;

	    return res
	  }

	  function remove (id) {
	    const { streams } = this;
	    const index = streams.findIndex(s => s.id === id);

	    if (index >= 0) {
	      streams.splice(index, 1);
	      streams.sort(compareByLevel);
	      this.minLevel = streams.length > 0 ? streams[0].level : -1;
	    }

	    return res
	  }

	  function end () {
	    for (const { stream } of this.streams) {
	      if (typeof stream.flushSync === 'function') {
	        stream.flushSync();
	      }
	      stream.end();
	    }
	  }

	  function clone (level) {
	    const streams = new Array(this.streams.length);

	    for (let i = 0; i < streams.length; i++) {
	      streams[i] = {
	        level,
	        stream: this.streams[i].stream
	      };
	    }

	    return {
	      write,
	      add,
	      remove,
	      minLevel: level,
	      streams,
	      clone,
	      emit,
	      flushSync,
	      [metadata]: true
	    }
	  }
	}

	function compareByLevel (a, b) {
	  return a.level - b.level
	}

	function initLoopVar (length, dedupe) {
	  return dedupe ? length - 1 : 0
	}

	function adjustLoopVar (i, dedupe) {
	  return dedupe ? i - 1 : i + 1
	}

	function checkLoopVar (i, length, dedupe) {
	  return dedupe ? i >= 0 : i < length
	}

	multistream_1 = multistream;
	return multistream_1;
}

var hasRequiredPino;

function requirePino () {
	if (hasRequiredPino) return pino$1.exports;
	hasRequiredPino = 1;

	const os = require$$0$4;
	const stdSerializers = requirePinoStdSerializers();
	const caller = requireCaller();
	const redaction = requireRedaction();
	const time = requireTime();
	const proto = requireProto();
	const symbols = requireSymbols();
	const { configure } = requireSafeStableStringify();
	const { assertDefaultLevelFound, mappings, genLsCache, genLevelComparison, assertLevelComparison } = requireLevels();
	const { DEFAULT_LEVELS, SORTING_ORDER } = requireConstants();
	const {
	  createArgsNormalizer,
	  asChindings,
	  buildSafeSonicBoom,
	  buildFormatters,
	  stringify,
	  normalizeDestFileDescriptor,
	  noop
	} = requireTools();
	const { version } = requireMeta();
	const {
	  chindingsSym,
	  redactFmtSym,
	  serializersSym,
	  timeSym,
	  timeSliceIndexSym,
	  streamSym,
	  stringifySym,
	  stringifySafeSym,
	  stringifiersSym,
	  setLevelSym,
	  endSym,
	  formatOptsSym,
	  messageKeySym,
	  errorKeySym,
	  nestedKeySym,
	  mixinSym,
	  levelCompSym,
	  useOnlyCustomLevelsSym,
	  formattersSym,
	  hooksSym,
	  nestedKeyStrSym,
	  mixinMergeStrategySym,
	  msgPrefixSym
	} = symbols;
	const { epochTime, nullTime } = time;
	const { pid } = process;
	const hostname = os.hostname();
	const defaultErrorSerializer = stdSerializers.err;
	const defaultOptions = {
	  level: 'info',
	  levelComparison: SORTING_ORDER.ASC,
	  levels: DEFAULT_LEVELS,
	  messageKey: 'msg',
	  errorKey: 'err',
	  nestedKey: null,
	  enabled: true,
	  base: { pid, hostname },
	  serializers: Object.assign(Object.create(null), {
	    err: defaultErrorSerializer
	  }),
	  formatters: Object.assign(Object.create(null), {
	    bindings (bindings) {
	      return bindings
	    },
	    level (label, number) {
	      return { level: number }
	    }
	  }),
	  hooks: {
	    logMethod: undefined,
	    streamWrite: undefined
	  },
	  timestamp: epochTime,
	  name: undefined,
	  redact: null,
	  customLevels: null,
	  useOnlyCustomLevels: false,
	  depthLimit: 5,
	  edgeLimit: 100
	};

	const normalize = createArgsNormalizer(defaultOptions);

	const serializers = Object.assign(Object.create(null), stdSerializers);

	function pino (...args) {
	  const instance = {};
	  const { opts, stream } = normalize(instance, caller(), ...args);

	  if (opts.level && typeof opts.level === 'string' && DEFAULT_LEVELS[opts.level.toLowerCase()] !== undefined) opts.level = opts.level.toLowerCase();

	  const {
	    redact,
	    crlf,
	    serializers,
	    timestamp,
	    messageKey,
	    errorKey,
	    nestedKey,
	    base,
	    name,
	    level,
	    customLevels,
	    levelComparison,
	    mixin,
	    mixinMergeStrategy,
	    useOnlyCustomLevels,
	    formatters,
	    hooks,
	    depthLimit,
	    edgeLimit,
	    onChild,
	    msgPrefix
	  } = opts;

	  const stringifySafe = configure({
	    maximumDepth: depthLimit,
	    maximumBreadth: edgeLimit
	  });

	  const allFormatters = buildFormatters(
	    formatters.level,
	    formatters.bindings,
	    formatters.log
	  );

	  const stringifyFn = stringify.bind({
	    [stringifySafeSym]: stringifySafe
	  });
	  const stringifiers = redact ? redaction(redact, stringifyFn) : {};
	  const formatOpts = redact
	    ? { stringify: stringifiers[redactFmtSym] }
	    : { stringify: stringifyFn };
	  const end = '}' + (crlf ? '\r\n' : '\n');
	  const coreChindings = asChindings.bind(null, {
	    [chindingsSym]: '',
	    [serializersSym]: serializers,
	    [stringifiersSym]: stringifiers,
	    [stringifySym]: stringify,
	    [stringifySafeSym]: stringifySafe,
	    [formattersSym]: allFormatters
	  });

	  let chindings = '';
	  if (base !== null) {
	    if (name === undefined) {
	      chindings = coreChindings(base);
	    } else {
	      chindings = coreChindings(Object.assign({}, base, { name }));
	    }
	  }

	  const time = (timestamp instanceof Function)
	    ? timestamp
	    : (timestamp ? epochTime : nullTime);
	  const timeSliceIndex = time().indexOf(':') + 1;

	  if (useOnlyCustomLevels && !customLevels) throw Error('customLevels is required if useOnlyCustomLevels is set true')
	  if (mixin && typeof mixin !== 'function') throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`)
	  if (msgPrefix && typeof msgPrefix !== 'string') throw Error(`Unknown msgPrefix type "${typeof msgPrefix}" - expected "string"`)

	  assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
	  const levels = mappings(customLevels, useOnlyCustomLevels);

	  if (typeof stream.emit === 'function') {
	    stream.emit('message', { code: 'PINO_CONFIG', config: { levels, messageKey, errorKey } });
	  }

	  assertLevelComparison(levelComparison);
	  const levelCompFunc = genLevelComparison(levelComparison);

	  Object.assign(instance, {
	    levels,
	    [levelCompSym]: levelCompFunc,
	    [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
	    [streamSym]: stream,
	    [timeSym]: time,
	    [timeSliceIndexSym]: timeSliceIndex,
	    [stringifySym]: stringify,
	    [stringifySafeSym]: stringifySafe,
	    [stringifiersSym]: stringifiers,
	    [endSym]: end,
	    [formatOptsSym]: formatOpts,
	    [messageKeySym]: messageKey,
	    [errorKeySym]: errorKey,
	    [nestedKeySym]: nestedKey,
	    // protect against injection
	    [nestedKeyStrSym]: nestedKey ? `,${JSON.stringify(nestedKey)}:{` : '',
	    [serializersSym]: serializers,
	    [mixinSym]: mixin,
	    [mixinMergeStrategySym]: mixinMergeStrategy,
	    [chindingsSym]: chindings,
	    [formattersSym]: allFormatters,
	    [hooksSym]: hooks,
	    silent: noop,
	    onChild,
	    [msgPrefixSym]: msgPrefix
	  });

	  Object.setPrototypeOf(instance, proto());

	  genLsCache(instance);

	  instance[setLevelSym](level);

	  return instance
	}

	pino$1.exports = pino;

	pino$1.exports.destination = (dest = process.stdout.fd) => {
	  if (typeof dest === 'object') {
	    dest.dest = normalizeDestFileDescriptor(dest.dest || process.stdout.fd);
	    return buildSafeSonicBoom(dest)
	  } else {
	    return buildSafeSonicBoom({ dest: normalizeDestFileDescriptor(dest), minLength: 0 })
	  }
	};

	pino$1.exports.transport = requireTransport();
	pino$1.exports.multistream = requireMultistream();

	pino$1.exports.levels = mappings();
	pino$1.exports.stdSerializers = serializers;
	pino$1.exports.stdTimeFunctions = Object.assign({}, time);
	pino$1.exports.symbols = symbols;
	pino$1.exports.version = version;

	// Enables default and name export with TypeScript and Babel
	pino$1.exports.default = pino;
	pino$1.exports.pino = pino;
	return pino$1.exports;
}

var pinoExports = requirePino();
const pino = /*@__PURE__*/getDefaultExportFromCjs(pinoExports);

const NODE_ENV$1 = process.env.NODE_ENV || "development";
const VERCEL_ENV = process.env.VERCEL_ENV || NODE_ENV$1;
const LOG_LEVEL = process.env.LOG_LEVEL || (NODE_ENV$1 === "production" ? "info" : "debug");
const COMMIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA;
const DEPLOYED_AT = process.env.VERCEL_DEPLOYMENT_URL ? (/* @__PURE__ */ new Date()).toISOString() : void 0;
const REDACTION_PATHS = [
  "authorization",
  "cookie",
  "password",
  "email",
  "phone",
  "token",
  "secret",
  "key",
  // Nested redaction paths
  "req.headers.authorization",
  "req.headers.cookie",
  'req.headers["set-cookie"]',
  'req.headers["x-api-key"]',
  'res.headers["set-cookie"]',
  "body.password",
  "body.email",
  "body.phone",
  "query.token",
  "query.key",
  // Additional custom paths from environment
  ...process.env.REDACTION_EXTRA_KEYS?.split(",").filter(Boolean) || []
];
const baseLoggerConfig = {
  level: LOG_LEVEL,
  base: {
    service: "web",
    env: NODE_ENV$1,
    vercelEnv: VERCEL_ENV,
    ...COMMIT_SHA && { commitSha: COMMIT_SHA },
    ...DEPLOYED_AT && { deployedAt: DEPLOYED_AT }
  },
  redact: {
    paths: REDACTION_PATHS,
    censor: "[REDACTED]"
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: (req) => ({
      method: req.method,
      url: req.url,
      headers: req.headers,
      // Only log content-length and type, not raw body
      contentLength: req.headers?.["content-length"],
      contentType: req.headers?.["content-type"]
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      headers: res.headers
    })
  },
  formatters: {
    level: (label) => ({ level: label })
  }
};
const createDevLogger = () => {
  return pino({
    ...baseLoggerConfig,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        levelFirst: true,
        messageFormat: "{service}[{requestId}] {msg}"
      }
    }
  });
};
const createProdLogger = () => {
  return pino({
    ...baseLoggerConfig,
    timestamp: pino.stdTimeFunctions.isoTime
  });
};
const logger = NODE_ENV$1 === "development" ? createDevLogger() : createProdLogger();

const NODE_ENV = process.env.NODE_ENV || "development";
const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV || NODE_ENV;
const SENTRY_TRACES_SAMPLE_RATE = parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || "0.1");
const initSentry = () => {
  if (!SENTRY_DSN) {
    logger.warn("Sentry DSN not configured, error tracking disabled");
    return;
  }
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
    // Performance monitoring
    profilesSampleRate: NODE_ENV === "production" ? 0.05 : 0,
    // Release tracking
    release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA,
    // Disable client-side features for server-only usage
    autoSessionTracking: false,
    sendClientReports: false,
    // Filter out common noise
    beforeSend(event, hint) {
      const error = hint.originalException;
      if (error instanceof Error) {
        if (error.message?.includes("ECONNRESET") || error.message?.includes("EPIPE")) {
          return null;
        }
        if (event.tags?.route && event.tags?.status) {
          const status = parseInt(event.tags.status);
          const userAgent = event.tags?.userAgentCategory;
          if (userAgent === "bot" && status >= 400 && status < 500 && status !== 401 && status !== 403) {
            return null;
          }
        }
      }
      return event;
    },
    // Enhanced error context
    integrations: [
      Sentry.httpIntegration(),
      Sentry.nodeContextIntegration(),
      Sentry.consoleIntegration()
    ]
  });
  logger.info({
    environment: SENTRY_ENV,
    tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE
  }, "Sentry initialized");
};
const captureErrorWithContext = (error, context) => {
  return Sentry.withScope((scope) => {
    if (context?.requestId) {
      scope.setTag("requestId", context.requestId);
    }
    if (context?.traceId) {
      scope.setTag("traceId", context.traceId);
    }
    if (context?.route) {
      scope.setTag("route", context.route);
    }
    if (context?.method) {
      scope.setTag("method", context.method);
    }
    if (context?.status) {
      scope.setTag("status", context.status.toString());
    }
    if (context?.userAgentCategory) {
      scope.setTag("userAgentCategory", context.userAgentCategory);
    }
    scope.setContext("request", {
      requestId: context?.requestId,
      traceId: context?.traceId,
      route: context?.route,
      method: context?.method,
      ipHash: context?.ipHash,
      userAgentCategory: context?.userAgentCategory
    });
    return Sentry.captureException(error);
  });
};
const setupGlobalErrorHandling = () => {
  process.on("uncaughtException", (error) => {
    logger.fatal({ err: error }, "Uncaught exception");
    captureErrorWithContext(error);
    setTimeout(() => {
      process.exit(1);
    }, 2e3);
  });
  process.on("unhandledRejection", (reason, promise) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    logger.fatal({ err: error, promise }, "Unhandled promise rejection");
    captureErrorWithContext(error);
  });
  const gracefulShutdown = (signal) => {
    logger.info(`Received ${signal}, shutting down gracefully`);
    Sentry.close(2e3).then(() => {
      logger.info("Sentry client closed");
      process.exit(0);
    });
  };
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};
initSentry();
setupGlobalErrorHandling();

const loggedOperation = async (operationName, fn, context = {}) => {
  const requestLogger = context.logger || logger;
  const startTime = Date.now();
  const logContext = {
    operation: operationName,
    requestId: context.requestId,
    traceId: context.traceId
  };
  requestLogger.debug(logContext, `Starting operation: ${operationName}`);
  try {
    const result = await fn();
    const durationMs = Date.now() - startTime;
    requestLogger.info({ ...logContext, durationMs }, `Completed operation: ${operationName}`);
    return result;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    const durationMs = Date.now() - startTime;
    requestLogger.error(
      { ...logContext, err, durationMs },
      `Operation failed: ${operationName}`
    );
    captureErrorWithContext(err, {
      requestId: context.requestId,
      traceId: context.traceId,
      route: `operation:${operationName}`
    });
    throw err;
  }
};

const prerender = false;
const GET = async ({ locals }) => {
  const logger = locals.logger;
  const { requestId, traceId } = locals.requestContext || {};
  try {
    logger?.info("Health check requested");
    const healthData = await loggedOperation(
      "health-check",
      async () => {
        return {
          status: "healthy",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || "unknown",
          environment: process.env.VERCEL_ENV || "development"
        };
      },
      { requestId, traceId, logger }
    );
    logger?.info({ healthData }, "Health check completed successfully");
    return new Response(JSON.stringify(healthData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (error) {
    logger?.error({ err: error }, "Health check failed");
    return new Response(JSON.stringify({
      status: "unhealthy",
      error: "Internal server error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
