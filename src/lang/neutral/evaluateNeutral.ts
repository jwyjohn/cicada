import * as Cores from "../core"
import { evaluate } from "../core"
import { Ctx, ctxToEnv } from "../ctx"
import { Mod } from "../mod"
import { Neutral } from "../neutral"
import * as Values from "../value"
import { readback, Value } from "../value"

export function evaluateNeutral(mod: Mod, ctx: Ctx, type: Value, neutral: Neutral): Value | void {
  switch (neutral.kind) {
    case "Var": {
      return mod.solution.walk(Values.TypedNeutral(type, neutral))
    }

    case "Ap": {
      const targetType = neutral.targetType
      const target = evaluateNeutral(mod, ctx, targetType, neutral.target)
      const arg = neutral.arg
      if (target !== undefined) {
        const targetCore = readback(mod, ctx, targetType, target)
        const argCore = readback(mod, ctx, arg.type, arg.value)
        let ret = evaluate(ctxToEnv(ctx), Cores.Ap(targetCore, argCore))
        if (ret.kind != "TypedNeutral") {
          return ret
        }
      }
      return
    }

    case "ApImplicit": {
      const targetType = neutral.targetType
      const target = evaluateNeutral(mod, ctx, targetType, neutral.target)
      const arg = neutral.arg
      if (target !== undefined) {
        const targetCore = readback(mod, ctx, targetType, target)
        const argCore = readback(mod, ctx, arg.type, arg.value)
        let ret = evaluate(ctxToEnv(ctx), Cores.ApImplicit(targetCore, argCore))
        if (ret.kind != "TypedNeutral") {
          return ret
        }
      }
      return
    }

    case "Car": {
      const targetType = neutral.targetType
      const target = evaluateNeutral(mod, ctx, targetType, neutral.target)
      if (target !== undefined) {
        const targetCore = readback(mod, ctx, targetType, target)
        let ret = evaluate(ctxToEnv(ctx), Cores.Car(targetCore))
        if (ret.kind != "TypedNeutral") {
          return ret
        }
      }
      return
    }

    case "Cdr": {
      const targetType = neutral.targetType
      const target = evaluateNeutral(mod, ctx, targetType, neutral.target)
      if (target !== undefined) {
        const targetCore = readback(mod, ctx, targetType, target)
        let ret = evaluate(ctxToEnv(ctx), Cores.Cdr(targetCore))
      }
      return
    }

    case "Dot": {
      const targetType = neutral.targetType
      const target = evaluateNeutral(mod, ctx, targetType, neutral.target)
      if (target !== undefined) {
        const targetCore = readback(mod, ctx, targetType, target)
        let ret = evaluate(ctxToEnv(ctx), Cores.Dot(targetCore, neutral.name))
        if (ret.kind != "TypedNeutral") {
          return ret
        }
      }
      return
    }
  }
  return
}
