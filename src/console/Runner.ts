import fs from "fs"
import { Loader } from "../loader"

export class Runner {
  loader = new Loader()

  constructor() {
    this.loader.fetcher.register("file", (url) => fs.promises.readFile(url.pathname, "utf8"))
  }

  async run(url: URL, opts?: { silent?: boolean }): Promise<{ error?: unknown }> {
    try {
      const mod = await this.loader.load(url)
      const outputs = Array.from(mod.outputs.values())
      const output = outputs.join("\n")
      if (!opts?.silent) {
        if (output) console.log(output)
      }

      return { error: undefined }
    } catch (error) {
      if (!opts?.silent) {
        if (error instanceof Error) console.error(error.message)
        else console.error(error)
      }

      return { error }
    }
  }
}
