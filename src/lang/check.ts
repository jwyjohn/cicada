import { Core } from "./Core"
import { Ctx } from "./Ctx"
import * as Exps from "./Exp"
import { Exp } from "./Exp"
import * as Globals from "./globals"
import { inclusion } from "./inclusion"
import { infer } from "./infer"
import * as Values from "./Value"
import { assertValue, Value } from "./Value"

export function check(ctx: Ctx, exp: Exp, type: Value): Core {
  switch (exp.kind) {
    case "Var": {
      return checkByInfer(ctx, exp, type)
    }

    case "Pi": {
      return checkByInfer(ctx, exp, type)
    }

    case "MultiPi": {
      return checkByInfer(ctx, exp, type)
    }

    case "MultiFn": {
      const pi = assertValue(ctx, type, Values.Pi)
      return checkFn(ctx, exp.bindings, exp.ret, pi)
    }

    case "Ap": {
      return checkByInfer(ctx, exp, type)
    }

    case "Sigma": {
      throw new Error("TODO")
    }

    case "Cons": {
      throw new Error("TODO")
    }

    case "Car": {
      return checkByInfer(ctx, exp, type)
    }

    case "Cdr": {
      return checkByInfer(ctx, exp, type)
    }

    default:
      throw new Error(`check is not implemented for exp: ${exp.kind}`)
  }
}

export function checkByInfer(ctx: Ctx, exp: Exp, type: Value): Core {
  const inferred = infer(ctx, exp)
  inclusion(ctx, inferred.type, type)
  return inferred.core
}

export function checkType(ctx: Ctx, type: Exp): Core {
  return check(ctx, type, Globals.Type)
}

export function checkFn(
  ctx: Ctx,
  bindings: Array<Exps.FnBinding>,
  ret: Exp,
  pi: Values.Pi
): Core {
  throw new Error("TODO")
}
