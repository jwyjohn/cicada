import { Mod } from "./lang/mod"
import { parseStmts } from "./lang/parse"
import { Loader } from "./loader"

export async function runCode(code: string): Promise<string> {
  const loader = new Loader()
  const stmts = parseStmts(code)
  const mod = new Mod({ loader, url: new URL("test://") })
  await mod.executeStmts(stmts)
  const outputs = Array.from(mod.outputs.values())
  console.log(outputs.join("\n"))
  return outputs.join("\n")
}

runCode(`
solve (ab: Pair(String, String), ba: Pair(String, String), a: String, b: String, b2: String) {
  unify b2 = car(ba)
  unify ba = cons(b, a)
  unify a = car(ab)
  unify b = cdr(ab)
  unify ab = cons("a", "b")
}
`)
