export const stmt = {
  $grammar: {
    "stmt:check": ['"check"', { exp: "exp" }, '":"', { t: "exp" }],
    "stmt:let": ['"let"', { name: "name" }, '"="', { exp: "exp" }],
    "stmt:let_the": ['"let"', { name: "name" }, '":"', { t: "exp" }, '"="', { exp: "exp" }],
    "stmt:let_function": [
      '"function"',
      { name: "name" },
      '"("',
      { bindings: "fn_bindings" },
      '")"',
      { sequence: "sequence" },
    ],
    "stmt:let_function_with_ret_type": [
      '"function"',
      { name: "name" },
      '"("',
      { bindings: "fn_bindings" },
      '")"',
      '":"',
      { ret_t: "exp" },
      { sequence: "sequence" },
    ],
    "stmt:compute": ['"compute"', { exp: "exp" }],
    "stmt:clazz": [
      '"class"',
      { name: "name" },
      '"{"',
      { bindings: { $ap: ["zero_or_more", "clazz_binding"] } },
      '"}"',
    ],
    "stmt:conversion": [
      '"conversion"',
      { type: "exp" },
      '"["',
      { exps: { $ap: ["zero_or_more", "exp", '","'] } },
      { last_exp: "exp" },
      { $ap: ["optional", '","'] },
      '"]"',
    ],
    "stmt:inclusion": [
      '"inclusion"',
      '"["',
      { types: { $ap: ["zero_or_more", "exp", '","'] } },
      { last_type: "exp" },
      { $ap: ["optional", '","'] },
      '"]"',
    ],
    "stmt:solve": [
      '"solve"',
      '"("',
      { bindings: "solve_bindings" },
      '")"',
      '"{"',
      { equations: { $ap: ["zero_or_more", "equation"] } },
      '"}"',
    ],
    "stmt:solve_empty_bindings": [
      '"solve"',
      '"("',
      '")"',
      '"{"',
      { equations: { $ap: ["zero_or_more", "equation"] } },
      '"}"',
    ],
    "stmt:import": [
      '"import"',
      '"{"',
      { bindings: { $ap: ["zero_or_more", "import_binding"] } },
      '"}"',
      '"from"',
      { path: { $pattern: ["string"] } },
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
