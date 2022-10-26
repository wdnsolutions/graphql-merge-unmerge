'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = {next: verb(0), throw: verb(1), return: verb(2)}),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {value: op[1], done: false};
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return {value: op[0] ? op[1] : void 0, done: true};
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
exports.__esModule = true;
exports.Batch = void 0;
var generate_alphabetic_name_1 = require('generate-alphabetic-name');
var Batch = /** @class */ (function () {
  function Batch(run) {
    this._started = false;
    this._queue = [];
    this._resolvers = new Map();
    this._run = run;
  }
  Batch.prototype.queue = function (_a) {
    var query = _a.query,
      variables = _a.variables;
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (this._started) {
              throw new Error(
                'This batch has already started, please create a fresh batch',
              );
            }
            return [
              4 /*yield*/,
              new Promise(function (resolve, reject) {
                // we take a shallow clone because it is valid to run
                // the same query multiple times
                var q = {query: query, variables: variables};
                _this._queue.push(q);
                _this._resolvers.set(q, {resolve: resolve, reject: reject});
              }),
            ];
          case 1:
            return [2 /*return*/, _b.sent()];
        }
      });
    });
  };
  Batch.prototype._runAndReport = function (input, isSecondAttempt) {
    if (isSecondAttempt === void 0) {
      isSecondAttempt = false;
    }
    return __awaiter(this, void 0, void 0, function () {
      var merged;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!input.length) return [2 /*return*/];
            merged = merge(input);
            return [
              4 /*yield*/,
              Promise.all(
                __spreadArray(
                  __spreadArray(
                    [],
                    merged.unmergedQueries.map(function (q) {
                      return __awaiter(_this, void 0, void 0, function () {
                        var res, _a, _b, ex_1;
                        return __generator(this, function (_c) {
                          switch (_c.label) {
                            case 0:
                              res = this._resolvers.get(q);
                              _c.label = 1;
                            case 1:
                              _c.trys.push([1, 3, , 4]);
                              _b = (_a = res).resolve;
                              return [4 /*yield*/, this._run(q)];
                            case 2:
                              _b.apply(_a, [_c.sent()]);
                              return [3 /*break*/, 4];
                            case 3:
                              ex_1 = _c.sent();
                              res.reject(ex_1);
                              return [3 /*break*/, 4];
                            case 4:
                              return [2 /*return*/];
                          }
                        });
                      });
                    }),
                  ),
                  [
                    merged.mergedQuery &&
                      this._run(merged.mergedQuery)
                        .then(function (results) {
                          return __awaiter(_this, void 0, void 0, function () {
                            var unmerged, nextBatch_1, errored, i, res;
                            var _this = this;
                            return __generator(this, function (_a) {
                              switch (_a.label) {
                                case 0:
                                  unmerged = merged.unmergeMergedQueries(
                                    results,
                                  );
                                  if (
                                    !(
                                      results.errors &&
                                      results.errors.length &&
                                      !isSecondAttempt &&
                                      input.length > 1
                                    )
                                  )
                                    return [3 /*break*/, 2];
                                  nextBatch_1 = [];
                                  errored = unmerged.map(function (
                                    response,
                                    i,
                                  ) {
                                    if (response.errors) {
                                      return _this._runAndReport(
                                        [input[i]],
                                        true,
                                      );
                                    } else {
                                      nextBatch_1.push(input[i]);
                                      return null;
                                    }
                                  });
                                  return [
                                    4 /*yield*/,
                                    Promise.all([
                                      errored,
                                      this._runAndReport(nextBatch_1, true),
                                    ]),
                                  ];
                                case 1:
                                  _a.sent();
                                  return [3 /*break*/, 3];
                                case 2:
                                  for (i = 0; i < unmerged.length; i++) {
                                    res = this._resolvers.get(
                                      merged.mergedQueries[i],
                                    );
                                    if (!unmerged[i].errors && results.errors) {
                                      res.resolve(
                                        __assign(__assign({}, unmerged[i]), {
                                          errors: results.errors,
                                        }),
                                      );
                                    } else {
                                      res.resolve(unmerged[i]);
                                    }
                                  }
                                  _a.label = 3;
                                case 3:
                                  return [2 /*return*/];
                              }
                            });
                          });
                        })
                        ['catch'](function (err) {
                          for (
                            var _i = 0, _a = merged.mergedQueries;
                            _i < _a.length;
                            _i++
                          ) {
                            var q = _a[_i];
                            var res = _this._resolvers.get(q);
                            res.reject(err);
                          }
                        }),
                  ],
                ),
              ),
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  Batch.prototype.run = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this._started) {
              throw new Error('You cannot run the same batch multiple times');
            }
            this._started = true;
            return [4 /*yield*/, this._runAndReport(this._queue)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  return Batch;
})();
exports.Batch = Batch;
function merge(queries) {
  if (queries.length === 1) {
    return {
      mergedQuery: undefined,
      mergedQueries: [],
      unmergeMergedQueries: undefined,
      unmergedQueries: queries,
      allQueries: queries,
      unmergeAllQueries: function (v) {
        return v;
      },
    };
  }
  var mergedQueries = [];
  var unmergedQueries = [];
  var definitions = [];
  var fragments = [];
  var nextFragmentName = uniqueNameSet();
  var fragmentNames = new Map();
  for (var _i = 0, queries_1 = queries; _i < queries_1.length; _i++) {
    var q = queries_1[_i];
    var queryOps = q.query.definitions.filter(function (d) {
      return d.kind === 'OperationDefinition' && d.operation === 'query';
    });
    if (
      q.query.definitions.every(function (d) {
        var _a;
        return (
          ((d.kind === 'OperationDefinition' &&
            d.operation === 'query' &&
            d.selectionSet.selections.every(function (s) {
              return s.kind === 'Field';
            })) ||
            d.kind === 'FragmentDefinition') &&
          !((_a = d.directives) === null || _a === void 0 ? void 0 : _a.length)
        );
      }) &&
      queryOps.length === 1
    ) {
      var query = queryOps[0];
      var fragmentNameMapping = new Map();
      for (
        var _a = 0,
          _b = q.query.definitions.filter(function (d) {
            return d.kind === 'FragmentDefinition';
          });
        _a < _b.length;
        _a++
      ) {
        var fragment = _b[_a];
        var oldName = fragment.name.value;
        var newName = fragmentNames.get(fragment);
        if (!newName) {
          newName = nextFragmentName(oldName);
          fragmentNames.set(fragment, newName);
          fragments.push(
            oldName === newName
              ? fragment
              : __assign(__assign({}, fragment), {
                  name: __assign(__assign({}, fragment.name), {value: newName}),
                }),
          );
        }
        if (oldName !== newName) fragmentNameMapping.set(oldName, newName);
      }
      definitions.push({
        query: q,
        definition: {
          query: fragmentNameMapping.size
            ? __assign(__assign({}, query), {
                selectionSet: renameFragments(
                  query.selectionSet,
                  fragmentNameMapping,
                ),
              })
            : query,
          variables: q.variables,
        },
      });
      mergedQueries.push(q);
    } else {
      unmergedQueries.push(q);
    }
  }
  var merged = definitions.length
    ? mergeDefinitions(
        definitions.map(function (d) {
          return d.definition;
        }),
      )
    : undefined;
  var mergedQuery = merged && {
    query: {
      kind: 'Document',
      definitions: __spreadArray([merged.query], fragments),
    },
    variables: merged.variables,
  };
  return {
    mergedQuery: mergedQuery,
    mergedQueries: mergedQueries,
    unmergedQueries: unmergedQueries,
    allQueries: mergedQuery
      ? __spreadArray([mergedQuery], unmergedQueries)
      : unmergedQueries,
    unmergeMergedQueries:
      merged &&
      function (mergedResults) {
        var resultsMap = new Map();
        var unmergedData = merged.unmergeData(mergedResults.data);
        var unmergedErrors = merged.unmergeErrors(mergedResults.errors || []);
        for (var i = 0; i < definitions.length; i++) {
          resultsMap.set(definitions[i].query, {
            data: unmergedData[i],
            errors: unmergedErrors[i].length ? unmergedErrors[i] : undefined,
          });
        }
        return mergedQueries.map(function (d) {
          return resultsMap.get(d);
        });
      },
    unmergeAllQueries: merged
      ? function (_a) {
          var mergedResults = _a[0],
            otherResults = _a.slice(1);
          var resultsMap = new Map();
          var unmergedData = merged.unmergeData(mergedResults.data);
          var unmergedErrors = merged.unmergeErrors(mergedResults.errors || []);
          for (var i = 0; i < definitions.length; i++) {
            resultsMap.set(definitions[i].query, {
              data: unmergedData[i],
              errors: unmergedErrors[i].length ? unmergedErrors[i] : undefined,
            });
          }
          for (var i = 0; i < otherResults.length; i++) {
            resultsMap.set(unmergedQueries[i], otherResults[i]);
          }
          return queries.map(function (d) {
            return resultsMap.get(d);
          });
        }
      : function (v) {
          return v;
        },
  };
}
exports['default'] = merge;
function uniqueNameSet(init) {
  var usedNames = new Set(init);
  var uniqueID = 1;
  return function (suggestion) {
    var result =
      suggestion ||
      generate_alphabetic_name_1.generateAlphabeticNameFromNumber(uniqueID++);
    while (usedNames.has(result)) {
      result = generate_alphabetic_name_1.generateAlphabeticNameFromNumber(
        uniqueID++,
      );
    }
    usedNames.add(result);
    return result;
  };
}
function valueNodesAreEqual(a, b) {
  if (a === undefined && b === undefined) return true;
  if (a === undefined || b === undefined) return false;
  if (a.kind === 'NullValue' && b.kind === 'NullValue') return true;
  if (
    (a.kind === 'BooleanValue' && b.kind === 'BooleanValue') ||
    (a.kind === 'FloatValue' && b.kind === 'FloatValue') ||
    (a.kind === 'IntValue' && b.kind === 'IntValue') ||
    (a.kind === 'StringValue' && b.kind === 'StringValue') ||
    (a.kind === 'EnumValue' && b.kind === 'EnumValue')
  ) {
    return a.value === b.value;
  }
  return false;
}
function findExistingVariable(defs, values, def, value) {
  for (var _i = 0, defs_1 = defs; _i < defs_1.length; _i++) {
    var d = defs_1[_i];
    if (
      valueNodesAreEqual(d.defaultValue, def.defaultValue) &&
      (!d.directives || d.directives.length === 0) &&
      (!def.directives || def.directives.length === 0) &&
      values[d.variable.name.value] === value
    ) {
      return d.variable.name.value;
    }
  }
  return undefined;
}
function mergeDefinitions(definitions) {
  var variableNames = uniqueNameSet();
  var variableDefinitions = [];
  var variables = {};
  var selections = [];
  var extractResults = [];
  for (
    var _i = 0, definitions_1 = definitions;
    _i < definitions_1.length;
    _i++
  ) {
    var _a = definitions_1[_i],
      query = _a.query,
      localVariables = _a.variables;
    var variableMapping = new Map();
    for (
      var _b = 0, _c = query.variableDefinitions || [];
      _b < _c.length;
      _b++
    ) {
      var vari = _c[_b];
      var originalName = vari.variable.name.value;
      var existingVariable = findExistingVariable(
        variableDefinitions,
        variables,
        vari,
        localVariables[originalName],
      );
      var transformedName = existingVariable || variableNames(originalName);
      if (originalName !== transformedName) {
        variableMapping.set(originalName, transformedName);
      }
      if (!existingVariable) {
        variables[transformedName] = localVariables[originalName];
        variableDefinitions.push(
          __assign(__assign({}, vari), {
            variable: __assign(__assign({}, vari.variable), {
              name: __assign(__assign({}, vari.variable.name), {
                value: transformedName,
              }),
            }),
          }),
        );
      }
    }
    extractResults.push(
      mergeFields(
        selections,
        renameVariables(query.selectionSet, variableMapping).selections.map(
          function (s) {
            if (s.kind !== 'Field') {
              throw new Error(
                'We can only merge simple fields at the top level',
              );
            }
            return s;
          },
        ),
      ),
    );
  }
  return {
    query: {
      kind: 'OperationDefinition',
      operation: 'query',
      variableDefinitions: variableDefinitions,
      selectionSet: {
        kind: 'SelectionSet',
        selections: selections,
      },
    },
    variables: variables,
    unmergeData: function (data) {
      return extractResults.map(function (e) {
        return e.extractData(data);
      });
    },
    unmergeErrors: function (errors) {
      return extractResults.map(function (e) {
        var outputErrors = [];
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
          var error = errors_1[_i];
          if (error.path) {
            var path = e.errorPath(error.path);
            if (path) {
              outputErrors.push(__assign(__assign({}, error), {path: path}));
            }
          } else {
            outputErrors.push(error);
          }
        }
        return outputErrors;
      });
    },
  };
}
function renameVariables(set, variableMapping) {
  if (variableMapping.size === 0) return set;
  return __assign(__assign({}, set), {
    selections: set.selections.map(function (s) {
      switch (s.kind) {
        case 'Field':
          return __assign(__assign({}, s), {
            arguments:
              s.arguments &&
              s.arguments.map(function (a) {
                return __assign(__assign({}, a), {
                  value:
                    a.value.kind === 'Variable'
                      ? __assign(__assign({}, a.value), {
                          name: __assign(__assign({}, a.value.name), {
                            value:
                              variableMapping.get(a.value.name.value) ||
                              a.value.name.value,
                          }),
                        })
                      : a.value,
                });
              }),
            selectionSet:
              s.selectionSet &&
              renameVariables(s.selectionSet, variableMapping),
          });
        case 'FragmentSpread':
          return s;
        case 'InlineFragment':
          return __assign(__assign({}, s), {
            selectionSet: renameVariables(s.selectionSet, variableMapping),
          });
      }
    }),
  });
}
function renameFragments(set, fragmentNameMapping) {
  if (fragmentNameMapping.size === 0) return set;
  return __assign(__assign({}, set), {
    selections: set.selections.map(function (s) {
      switch (s.kind) {
        case 'Field':
          return __assign(__assign({}, s), {
            selectionSet:
              s.selectionSet &&
              renameFragments(s.selectionSet, fragmentNameMapping),
          });
        case 'FragmentSpread':
          var newName = fragmentNameMapping.get(s.name.value);
          if (!newName) return s;
          return __assign(__assign({}, s), {
            name: __assign(__assign({}, s.name), {value: newName}),
          });
        case 'InlineFragment':
          return __assign(__assign({}, s), {
            selectionSet: renameFragments(s.selectionSet, fragmentNameMapping),
          });
      }
    }),
  });
}
function selectSelectionSet(value, set) {
  var _a, _b;
  if (!set) return value;
  if (Array.isArray(value)) {
    return value.map(function (v) {
      return selectSelectionSet(v, set);
    });
  }
  if (!value) return value;
  var result = {};
  for (var _i = 0, _c = set.selections; _i < _c.length; _i++) {
    var selection = _c[_i];
    if (selection.kind !== 'Field') {
      return value;
    }
    result[
      ((_a = selection.alias) === null || _a === void 0 ? void 0 : _a.value) ||
        selection.name.value
    ] = selectSelectionSet(
      value[
        ((_b = selection.alias) === null || _b === void 0
          ? void 0
          : _b.value) || selection.name.value
      ],
      selection.selectionSet,
    );
  }
  return result;
}
function errorPathForSelectionSet(path, set) {
  var _a;
  if (!set) return path;
  var keyIndex = path.findIndex(function (p) {
    return typeof p === 'string';
  });
  if (keyIndex === -1) {
    return path;
  }
  var key = path[keyIndex];
  for (var _i = 0, _b = set.selections; _i < _b.length; _i++) {
    var selection = _b[_i];
    if (selection.kind !== 'Field') {
      return path;
    }
    var name_1 =
      ((_a = selection.alias) === null || _a === void 0 ? void 0 : _a.value) ||
      selection.name.value;
    if (key === name_1) {
      var childrenInput = path.slice(keyIndex + 1);
      if (errorPathForSelectionSet(childrenInput, selection.selectionSet)) {
        return path;
      } else {
        return null;
      }
    }
  }
  return null;
}
function selectByFieldMappings(value, set) {
  if (Array.isArray(value))
    return value.map(function (v) {
      return selectByFieldMappings(v, set);
    });
  if (!value) return value;
  var result = {};
  for (var _i = 0, set_1 = set; _i < set_1.length; _i++) {
    var mapping = set_1[_i];
    result[mapping.output] = mapping.children
      ? mapping.children.extractData(value[mapping.alias])
      : value[mapping.alias];
  }
  return result;
}
function mergeFields(existingFields, newFields) {
  var _a, _b, _c;
  var aliasNames = uniqueNameSet(
    existingFields.map(function (e) {
      var _a;
      return (
        ((_a = e.alias) === null || _a === void 0 ? void 0 : _a.value) ||
        e.name.value
      );
    }),
  );
  var fieldMappings = [];
  var _loop_1 = function (newField) {
    var outputName =
      ((_a = newField.alias) === null || _a === void 0 ? void 0 : _a.value) ||
      newField.name.value;
    var queryName = newField.name.value;
    var existingFieldIndex = existingFields.findIndex(function (ef) {
      return fieldsCanBeMerged(ef, newField);
    });
    if (existingFieldIndex === -1) {
      var aliasName = aliasNames(outputName);
      var alias =
        aliasName === queryName ? undefined : {kind: 'Name', value: aliasName};
      existingFields.push(__assign(__assign({}, newField), {alias: alias}));
      var unmergeable =
        (_b = newField.selectionSet) === null || _b === void 0
          ? void 0
          : _b.selections.some(function (s) {
              return s.kind !== 'Field';
            });
      fieldMappings.push({
        alias: aliasName,
        output: outputName,
        children: unmergeable
          ? undefined
          : {
              extractData: function (v) {
                return selectSelectionSet(v, newField.selectionSet);
              },
              errorPath: function (p) {
                return errorPathForSelectionSet(p, newField.selectionSet);
              },
            },
      });
    } else {
      var existingSelectionSet =
        existingFields[existingFieldIndex].selectionSet;
      var newSelectionSet = newField.selectionSet;
      var newSelections =
        existingSelectionSet && existingSelectionSet.selections.slice();
      var children = void 0;
      if (newSelections && newSelectionSet) {
        children = mergeFields(newSelections, newSelectionSet.selections);
      }
      existingFields[existingFieldIndex] = __assign(
        __assign({}, existingFields[existingFieldIndex]),
        {
          selectionSet:
            existingSelectionSet &&
            newSelections &&
            __assign(__assign({}, existingSelectionSet), {
              selections: newSelections,
            }),
        },
      );
      var aliasName =
        ((_c = existingFields[existingFieldIndex].alias) === null ||
        _c === void 0
          ? void 0
          : _c.value) || existingFields[existingFieldIndex].name.value;
      fieldMappings.push({
        alias: aliasName,
        output: outputName,
        children: children,
      });
    }
  };
  for (var _i = 0, newFields_1 = newFields; _i < newFields_1.length; _i++) {
    var newField = newFields_1[_i];
    _loop_1(newField);
  }
  return {
    extractData: function (data) {
      return selectByFieldMappings(data, fieldMappings);
    },
    errorPath: function (path) {
      var keyIndex = path.findIndex(function (p) {
        return typeof p === 'string';
      });
      if (keyIndex === -1) {
        return path;
      }
      var key = path[keyIndex];
      for (
        var _i = 0, fieldMappings_1 = fieldMappings;
        _i < fieldMappings_1.length;
        _i++
      ) {
        var f = fieldMappings_1[_i];
        if (f.alias === key) {
          if (!f.children) {
            return f.output === f.alias
              ? path
              : __spreadArray(__spreadArray([], path.slice(0, keyIndex)), [
                  f.output,
                ]);
          }
          var childrenInput = path.slice(keyIndex + 1);
          var childrenResult = f.children.errorPath(childrenInput);
          if (!childrenResult) return null;
          return f.output === f.alias && childrenInput === childrenResult
            ? path
            : __spreadArray(
                __spreadArray(__spreadArray([], path.slice(0, keyIndex)), [
                  f.output,
                ]),
                childrenResult,
              );
        }
      }
      return null;
    },
  };
}
function fieldsCanBeMerged(a, b) {
  var _a, _b, _c, _d;
  if (a.name.value !== b.name.value) return false;
  if (
    ((_a = a.directives) === null || _a === void 0 ? void 0 : _a.length) ||
    ((_b = b.directives) === null || _b === void 0 ? void 0 : _b.length)
  )
    return false;
  if (!argumentsAreEqual(a.arguments, b.arguments)) return false;
  if (
    ((_c = a.selectionSet) === null || _c === void 0
      ? void 0
      : _c.selections.some(function (s) {
          return s.kind !== 'Field';
        })) ||
    ((_d = b.selectionSet) === null || _d === void 0
      ? void 0
      : _d.selections.some(function (s) {
          return s.kind !== 'Field';
        }))
  )
    return false;
  return true;
}
function argumentsAreEqual(a, b) {
  if (
    (a === undefined || a.length === 0) &&
    (b === undefined || b.length === 0)
  ) {
    return true;
  }
  if (a === undefined) return false;
  if (b === undefined) return false;
  if (a.length !== b.length) return false;
  return a.every(function (aa) {
    return b.some(function (bb) {
      return argumentEqual(aa, bb);
    });
  });
}
function argumentEqual(a, b) {
  return (
    a.name.value === b.name.value &&
    ((a.value.kind === 'Variable' &&
      b.value.kind === 'Variable' &&
      a.value.name.value === b.value.name.value) ||
      valueNodesAreEqual(a.value, b.value))
  );
}
