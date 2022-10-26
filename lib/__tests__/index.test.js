'use strict';
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', {value: raw});
    } else {
      cooked.raw = raw;
    }
    return cooked;
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
exports.__esModule = true;
var __1 = require('../');
var apollo_server_1 = require('apollo-server');
var graphql_tag_1 = require('graphql-tag');
var graphql_1 = require('graphql');
/**
 * We want to test that they don't break things
 */
graphql_tag_1.disableFragmentWarnings();
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var typeDefs = apollo_server_1.gql(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  union Result = User | Team\n\n  type User {\n    id: Int!\n    name: String!\n    teams: [Team!]!\n  }\n\n  type Team {\n    id: Int!\n    name: String!\n    users: [User!]!\n  }\n\n  type Query {\n    teams: [Team!]!\n    users: [User!]!\n    node(id: Int): Result\n    user(id: Int): User\n    team(id: Int): Team\n    teamRequired(id: Int): Team!\n    errorable: String!\n  }\n',
      ],
      [
        '\n  union Result = User | Team\n\n  type User {\n    id: Int!\n    name: String!\n    teams: [Team!]!\n  }\n\n  type Team {\n    id: Int!\n    name: String!\n    users: [User!]!\n  }\n\n  type Query {\n    teams: [Team!]!\n    users: [User!]!\n    node(id: Int): Result\n    user(id: Int): User\n    team(id: Int): Team\n    teamRequired(id: Int): Team!\n    errorable: String!\n  }\n',
      ],
    )),
);
var records = [
  {t: 'Team', id: 1, name: 'Team A'},
  {t: 'Team', id: 2, name: 'Team B'},
  {t: 'User', id: 3, name: 'User A'},
  {t: 'User', id: 4, name: 'User B'},
  {t: 'User', id: 5, name: 'User C'},
  {t: 'User', id: 6, name: 'User D'},
];
var userTeams = [
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
];
var resolvers = {
  Result: {
    __resolveType: function (_a) {
      var t = _a.t;
      return t;
    },
  },
  Query: {
    teams: function () {
      return records.filter(function (_a) {
        var t = _a.t;
        return t === 'Team';
      });
    },
    users: function () {
      return records.filter(function (_a) {
        var t = _a.t;
        return t === 'User';
      });
    },
    node: function (_, _a) {
      var id = _a.id;
      return (
        records.find(function (r) {
          return r.id === id;
        }) || null
      );
    },
    user: function (_, _a) {
      var id = _a.id;
      return (
        records.find(function (r) {
          return r.t === 'User' && r.id === id;
        }) || null
      );
    },
    team: function (_, _a) {
      var id = _a.id;
      return (
        records.find(function (r) {
          return r.t === 'Team' && r.id === id;
        }) || null
      );
    },
    teamRequired: function (_, _a) {
      var id = _a.id;
      return (
        records.find(function (r) {
          return r.t === 'Team' && r.id === id;
        }) || null
      );
    },
    errorable: function () {
      throw new Error('Oops');
    },
  },
  User: {
    teams: function (r) {
      return userTeams
        .filter(function (_a) {
          var _ = _a[0],
            userId = _a[1];
          return userId === r.id;
        })
        .map(function (_a) {
          var teamId = _a[0];
          return records.find(function (r) {
            return r.id === teamId;
          });
        });
    },
  },
  Team: {
    users: function (r) {
      return userTeams
        .filter(function (_a) {
          var teamId = _a[0],
            _ = _a[1];
          return teamId === r.id;
        })
        .map(function (_a) {
          var _ = _a[0],
            userId = _a[1];
          return records.find(function (r) {
            return r.id === userId;
          });
        });
    },
  },
};
var server = new apollo_server_1.ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
test('merge unmerge', function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var merged, mergedResults, results;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          merged = __1['default']([
            {
              query: graphql_tag_1['default'](
                templateObject_2 ||
                  (templateObject_2 = __makeTemplateObject(
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            id\n            teams {\n              name\n            }\n          }\n        }\n      ',
                    ],
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            id\n            teams {\n              name\n            }\n          }\n        }\n      ',
                    ],
                  )),
              ),
              variables: {id: 3},
            },
            {
              query: graphql_tag_1['default'](
                templateObject_3 ||
                  (templateObject_3 = __makeTemplateObject(
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            id\n            name\n          }\n        }\n      ',
                    ],
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            id\n            name\n          }\n        }\n      ',
                    ],
                  )),
              ),
              variables: {id: 3},
            },
            {
              query: graphql_tag_1['default'](
                templateObject_4 ||
                  (templateObject_4 = __makeTemplateObject(
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            name\n          }\n        }\n      ',
                    ],
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            name\n          }\n        }\n      ',
                    ],
                  )),
              ),
              variables: {id: 4},
            },
            {
              query: graphql_tag_1['default'](
                templateObject_5 ||
                  (templateObject_5 = __makeTemplateObject(
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            name\n          }\n        }\n      ',
                    ],
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            name\n          }\n        }\n      ',
                    ],
                  )),
              ),
              variables: {id: 42},
            },
            {
              query: graphql_tag_1['default'](
                templateObject_6 ||
                  (templateObject_6 = __makeTemplateObject(
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            id\n          }\n        }\n      ',
                    ],
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            id\n          }\n        }\n      ',
                    ],
                  )),
              ),
              variables: {id: 42},
            },
            {
              query: graphql_tag_1['default'](
                templateObject_7 ||
                  (templateObject_7 = __makeTemplateObject(
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            teams {\n              name\n            }\n          }\n        }\n      ',
                    ],
                    [
                      '\n        query($id: Int!) {\n          user(id: $id) {\n            teams {\n              name\n            }\n          }\n        }\n      ',
                    ],
                  )),
              ),
              variables: {id: 42},
            },
            {
              query: graphql_tag_1['default'](
                templateObject_8 ||
                  (templateObject_8 = __makeTemplateObject(
                    [
                      '\n        query($id: Int!) {\n          node(id: $id) {\n            ... on User {\n              name\n              teams {\n                name\n              }\n            }\n          }\n        }\n      ',
                    ],
                    [
                      '\n        query($id: Int!) {\n          node(id: $id) {\n            ... on User {\n              name\n              teams {\n                name\n              }\n            }\n          }\n        }\n      ',
                    ],
                  )),
              ),
              variables: {id: 4},
            },
            {
              query: graphql_tag_1['default'](
                templateObject_9 ||
                  (templateObject_9 = __makeTemplateObject(
                    [
                      '\n        query($id: Int!) {\n          node(id: $id) {\n            ... on User {\n              name\n            }\n          }\n        }\n      ',
                    ],
                    [
                      '\n        query($id: Int!) {\n          node(id: $id) {\n            ... on User {\n              name\n            }\n          }\n        }\n      ',
                    ],
                  )),
              ),
              variables: {id: 4},
            },
          ]);
          expect(
            merged.allQueries.map(function (_a) {
              var query = _a.query,
                variables = _a.variables;
              return {
                query: graphql_1.print(query),
                variables: variables,
              };
            }),
          ).toMatchInlineSnapshot(
            '\n    Array [\n      Object {\n        "query": "query ($id: Int!, $b: Int!, $c: Int!) {\n      user(id: $id) {\n        id\n        teams {\n          name\n        }\n        name\n      }\n      b: user(id: $b) {\n        name\n      }\n      c: user(id: $c) {\n        name\n        id\n        teams {\n          name\n        }\n      }\n      node(id: $b) {\n        ... on User {\n          name\n          teams {\n            name\n          }\n        }\n      }\n      d: node(id: $b) {\n        ... on User {\n          name\n        }\n      }\n    }\n    ",\n        "variables": Object {\n          "b": 4,\n          "c": 42,\n          "id": 3,\n        },\n      },\n    ]\n  ',
          );
          return [
            4 /*yield*/,
            Promise.all(
              merged.allQueries.map(function (_a) {
                var query = _a.query,
                  variables = _a.variables;
                return server.executeOperation({
                  query: graphql_1.print(query),
                  variables: variables,
                });
              }),
            ),
          ];
        case 1:
          mergedResults = _a.sent();
          results = merged.unmergeAllQueries(mergedResults);
          results.forEach(function (r) {
            return expect(r.errors).toBeFalsy();
          });
          expect(
            results.map(function (r) {
              return r.data;
            }),
          ).toMatchInlineSnapshot(
            '\n    Array [\n      Object {\n        "user": Object {\n          "id": 3,\n          "teams": Array [\n            Object {\n              "name": "Team A",\n            },\n          ],\n        },\n      },\n      Object {\n        "user": Object {\n          "id": 3,\n          "name": "User A",\n        },\n      },\n      Object {\n        "user": Object {\n          "name": "User B",\n        },\n      },\n      Object {\n        "user": null,\n      },\n      Object {\n        "user": null,\n      },\n      Object {\n        "user": null,\n      },\n      Object {\n        "node": Object {\n          "name": "User B",\n          "teams": Array [\n            Object {\n              "name": "Team A",\n            },\n          ],\n        },\n      },\n      Object {\n        "node": Object {\n          "name": "User B",\n        },\n      },\n    ]\n  ',
          );
          return [2 /*return*/];
      }
    });
  });
});
test('batch', function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var queries, batch, results;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          queries = [];
          batch = new __1.Batch(function (_a) {
            var query = _a.query,
              variables = _a.variables;
            return __awaiter(void 0, void 0, void 0, function () {
              var q;
              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    q = {
                      query: graphql_1.print(query),
                      variables: variables,
                    };
                    queries.push(q);
                    return [4 /*yield*/, server.executeOperation(q)];
                  case 1:
                    return [2 /*return*/, _b.sent()];
                }
              });
            });
          });
          results = Promise.all([
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_10 ||
                      (templateObject_10 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                teams {\n                  name\n                }\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                teams {\n                  name\n                }\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 3},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": Object {\n          "id": 3,\n          "teams": Array [\n            Object {\n              "name": "Team A",\n            },\n          ],\n        },\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_11 ||
                      (templateObject_11 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                name\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                name\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 3},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": Object {\n          "id": 3,\n          "name": "User A",\n        },\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_12 ||
                      (templateObject_12 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                name\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                name\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 4},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": Object {\n          "name": "User B",\n        },\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_13 ||
                      (templateObject_13 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                name\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                name\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 42},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": null,\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_14 ||
                      (templateObject_14 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 42},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": null,\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_15 ||
                      (templateObject_15 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                teams {\n                  name\n                }\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                teams {\n                  name\n                }\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 42},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": null,\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_16 ||
                      (templateObject_16 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              node(id: $id) {\n                ... on User {\n                  name\n                  teams {\n                    name\n                  }\n                }\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              node(id: $id) {\n                ... on User {\n                  name\n                  teams {\n                    name\n                  }\n                }\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 4},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "node": Object {\n          "name": "User B",\n          "teams": Array [\n            Object {\n              "name": "Team A",\n            },\n          ],\n        },\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_17 ||
                      (templateObject_17 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              node(id: $id) {\n                ... on User {\n                  name\n                }\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              node(id: $id) {\n                ... on User {\n                  name\n                }\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 4},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "node": Object {\n          "name": "User B",\n        },\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_18 ||
                      (templateObject_18 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              teamRequired(id: $id) {\n                name\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              teamRequired(id: $id) {\n                name\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 9999},
                })
                .then(function (r) {
                  return r.errors;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Array [\n        [GraphQLError: Cannot return null for non-nullable field Query.teamRequired.],\n      ]\n    ',
            ),
          ]);
          return [4 /*yield*/, Promise.all([batch.run(), results])];
        case 1:
          _a.sent();
          expect(queries).toMatchInlineSnapshot(
            '\n    Array [\n      Object {\n        "query": "query ($id: Int!, $b: Int!, $c: Int!, $d: Int!) {\n      user(id: $id) {\n        id\n        teams {\n          name\n        }\n        name\n      }\n      b: user(id: $b) {\n        name\n      }\n      c: user(id: $c) {\n        name\n        id\n        teams {\n          name\n        }\n      }\n      node(id: $b) {\n        ... on User {\n          name\n          teams {\n            name\n          }\n        }\n      }\n      d: node(id: $b) {\n        ... on User {\n          name\n        }\n      }\n      teamRequired(id: $d) {\n        name\n      }\n    }\n    ",\n        "variables": Object {\n          "b": 4,\n          "c": 42,\n          "d": 9999,\n          "id": 3,\n        },\n      },\n      Object {\n        "query": "query ($id: Int!) {\n      teamRequired(id: $id) {\n        name\n      }\n    }\n    ",\n        "variables": Object {\n          "id": 9999,\n        },\n      },\n      Object {\n        "query": "query ($id: Int!, $b: Int!, $c: Int!) {\n      user(id: $id) {\n        id\n        teams {\n          name\n        }\n        name\n      }\n      b: user(id: $b) {\n        name\n      }\n      c: user(id: $c) {\n        name\n        id\n        teams {\n          name\n        }\n      }\n      node(id: $b) {\n        ... on User {\n          name\n          teams {\n            name\n          }\n        }\n      }\n      d: node(id: $b) {\n        ... on User {\n          name\n        }\n      }\n    }\n    ",\n        "variables": Object {\n          "b": 4,\n          "c": 42,\n          "id": 3,\n        },\n      },\n    ]\n  ',
          );
          return [2 /*return*/];
      }
    });
  });
});
test('batch fragments', function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var queries, batch, results;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          queries = [];
          batch = new __1.Batch(function (_a) {
            var query = _a.query,
              variables = _a.variables;
            return __awaiter(void 0, void 0, void 0, function () {
              var q;
              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    q = {
                      query: graphql_1.print(query),
                      variables: variables,
                    };
                    queries.push(q);
                    return [4 /*yield*/, server.executeOperation(q)];
                  case 1:
                    return [2 /*return*/, _b.sent()];
                }
              });
            });
          });
          results = Promise.all([
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_19 ||
                      (templateObject_19 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                ...UserTeams\n              }\n            }\n\n            fragment UserTeams on User {\n              teams {\n                name\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                ...UserTeams\n              }\n            }\n\n            fragment UserTeams on User {\n              teams {\n                name\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 3},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": Object {\n          "id": 3,\n          "teams": Array [\n            Object {\n              "name": "Team A",\n            },\n          ],\n        },\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_20 ||
                      (templateObject_20 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                ...UserTeams\n              }\n            }\n\n            fragment UserTeams on User {\n              teams {\n                name\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                ...UserTeams\n              }\n            }\n\n            fragment UserTeams on User {\n              teams {\n                name\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 4},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": Object {\n          "id": 4,\n          "teams": Array [\n            Object {\n              "name": "Team A",\n            },\n          ],\n        },\n      }\n    ',
            ),
            expect(
              batch
                .queue({
                  query: graphql_tag_1['default'](
                    templateObject_21 ||
                      (templateObject_21 = __makeTemplateObject(
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                ...UserTeams\n              }\n            }\n\n            fragment UserTeams on User {\n              teams {\n                id\n              }\n            }\n          ',
                        ],
                        [
                          '\n            query($id: Int!) {\n              user(id: $id) {\n                id\n                ...UserTeams\n              }\n            }\n\n            fragment UserTeams on User {\n              teams {\n                id\n              }\n            }\n          ',
                        ],
                      )),
                  ),
                  variables: {id: 3},
                })
                .then(function (r) {
                  expect(r.errors).toBeFalsy();
                  return r.data;
                }),
            ).resolves.toMatchInlineSnapshot(
              '\n      Object {\n        "user": Object {\n          "id": 3,\n          "teams": Array [\n            Object {\n              "id": 1,\n            },\n          ],\n        },\n      }\n    ',
            ),
          ]);
          return [4 /*yield*/, Promise.all([batch.run(), results])];
        case 1:
          _a.sent();
          expect(queries).toMatchInlineSnapshot(
            '\n    Array [\n      Object {\n        "query": "query ($id: Int!, $b: Int!) {\n      user(id: $id) {\n        id\n        ...UserTeams\n      }\n      b: user(id: $b) {\n        id\n        ...UserTeams\n      }\n      c: user(id: $id) {\n        id\n        ...b\n      }\n    }\n\n    fragment UserTeams on User {\n      teams {\n        name\n      }\n    }\n\n    fragment b on User {\n      teams {\n        id\n      }\n    }\n    ",\n        "variables": Object {\n          "b": 4,\n          "id": 3,\n        },\n      },\n    ]\n  ',
          );
          return [2 /*return*/];
      }
    });
  });
});
var templateObject_1,
  templateObject_2,
  templateObject_3,
  templateObject_4,
  templateObject_5,
  templateObject_6,
  templateObject_7,
  templateObject_8,
  templateObject_9,
  templateObject_10,
  templateObject_11,
  templateObject_12,
  templateObject_13,
  templateObject_14,
  templateObject_15,
  templateObject_16,
  templateObject_17,
  templateObject_18,
  templateObject_19,
  templateObject_20,
  templateObject_21;
