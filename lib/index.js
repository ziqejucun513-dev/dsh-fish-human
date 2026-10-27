import * as memory from './memory/index.js'
import * as mood from './mood/index.js'

export const name = 'fish-human'
export const inject = [...new Set([...(memory.inject || []), ...(mood.inject || [])])]

export function apply(ctx) {
  mood.apply(ctx)
  memory.apply(ctx)
}
