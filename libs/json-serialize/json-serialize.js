/*
  JSON-Serialize.js 1.1.3
  (c) 2011, 2012 Kevin Malakoff - http://kmalakoff.github.com/json-serialize/
  License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/
(function() {
  return (function(factory) {
    // AMD
    if (typeof define === 'function' && define.amd) {
      return define('json-serialize', factory);
    }
    // CommonJS/NodeJS or No Loader
    else {
      return factory.call(this);
    }
  })(function() {// Generated by CoffeeScript 1.10.0

/*
  JSON-Serialize.js 1.1.3
  (c) 2011, 2012 Kevin Malakoff - http://kmalakoff.github.com/json-serialize/
  License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
var JSONS, isArray, isEmpty, keyPath, root, stringHasISO8601DateSignature;

root = this;

JSONS = this.JSONS = typeof exports !== 'undefined' ? exports : {};

JSONS.VERSION = "1.1.3";

JSONS.TYPE_FIELD = "_type";

JSONS.NAMESPACE_ROOTS = [root];

isEmpty = function(obj) {
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

isArray = function(obj) {
  return obj.constructor === Array;
};

stringHasISO8601DateSignature = function(string) {
  return (string.length >= 19) && (string[4] === "-") && (string[7] === "-") && (string[10] === "T") && (string[string.length - 1] === "Z");
};

keyPath = function(object, keypath) {
  var current_object, i, key, keypath_components, l;
  keypath_components = keypath.split(".");
  if (keypath_components.length === 1) {
    return ((object instanceof Object) && (object.hasOwnProperty(keypath)) ? object[keypath] : void 0);
  }
  current_object = object;
  l = keypath_components.length;
  for (i in keypath_components) {
    key = keypath_components[i];
    key = keypath_components[i];
    if (!(key in current_object)) {
      break;
    }
    if (++i === l) {
      return current_object[key];
    }
    current_object = current_object[key];
    if (!current_object || (!(current_object instanceof Object))) {
      break;
    }
  }
  return void 0;
};

JSONS.serialize = function(obj, options) {
  var j, key, len, result, value;
  if (!obj || (typeof obj !== "object")) {
    return obj;
  }
  if (obj.toJSON) {
    return obj.toJSON();
  }
  if (isArray(obj)) {
    result = [];
    for (j = 0, len = obj.length; j < len; j++) {
      value = obj[j];
      result.push(JSONS.serialize(value));
    }
  } else if (isEmpty(obj)) {
    return null;
  } else {
    result = {};
    for (key in obj) {
      value = obj[key];
      result[key] = JSONS.serialize(value);
    }
  }
  return result;
};

JSONS.deserialize = function(json, options) {
  var constructor_or_root, date, e, error, instance, j, json_as_JSON, json_type, k, key, len, len1, namespace_root, ref, result, type, value;
  json_type = typeof json;
  if (json_type === "string") {
    if (json.length && (json[0] === "{") || (json[0] === "[")) {
      try {
        json_as_JSON = JSON.parse(json);
        if (json_as_JSON) {
          json = json_as_JSON;
        }
      } catch (error) {
        e = error;
        throw new TypeError("Unable to parse JSON: " + json);
      }
    } else if (!(options && options.skip_dates) && stringHasISO8601DateSignature(json)) {
      try {
        date = new Date(json);
        if (date) {
          return date;
        }
      } catch (undefined) {}
    }
  }
  if ((json_type !== "object") || isEmpty(json)) {
    return json;
  }
  if (isArray(json)) {
    result = [];
    for (j = 0, len = json.length; j < len; j++) {
      value = json[j];
      result.push(JSONS.deserialize(value));
    }
    return result;
  } else if ((options && options.skip_type_field) || !json.hasOwnProperty(JSONS.TYPE_FIELD)) {
    result = {};
    for (key in json) {
      value = json[key];
      result[key] = JSONS.deserialize(value);
    }
    return result;
  } else {
    type = json[JSONS.TYPE_FIELD];
    ref = JSONS.NAMESPACE_ROOTS;
    for (k = 0, len1 = ref.length; k < len1; k++) {
      namespace_root = ref[k];
      constructor_or_root = keyPath(namespace_root, type);
      if (!constructor_or_root) {
        continue;
      }
      if (constructor_or_root.fromJSON) {
        return constructor_or_root.fromJSON(json);
      } else if (constructor_or_root.prototype && constructor_or_root.prototype.parse) {
        instance = new constructor_or_root();
        if (instance.set) {
          return instance.set(instance.parse(json));
        }
        return instance.parse(json);
      }
    }
    return null;
  }
};
; return JSONS;});
}).call(this);