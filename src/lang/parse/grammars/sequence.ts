export const sequence = {
  $grammar: {
    "sequence:sequence": [
      '"{"',
      { entries: { $ap: ["zero_or_more", "sequence_entry"] } },
      '"return"',
      { ret: "exp" },
      '"}"',
    ],
  },
}

export const sequence_entry = {
  $grammar: {
    "sequence_entry:let": [
      '"let"',
      { name: "identifier" },
      '"="',
      { exp: "exp" },
    ],
    "sequence_entry:let_the": [
      '"let"',
      { name: "identifier" },
      '":"',
      { t: "exp" },
      '"="',
      { exp: "exp" },
    ],
    // "sequence_entry:check": ['"check"', { exp: "exp" }, '":"', { t: "exp" }],
    // "sequence_entry:let_fn": [
    //   '"function"',
    //   { name: "identifier" },
    //   '"("',
    //   { typings: "typings" },
    //   '")"',
    //   '":"',
    //   { ret_t: "exp" },
    //   { sequence: "sequence" },
    // ],
  },
}
