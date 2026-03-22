import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { env } from 'cloudflare:workers'

const SCENARIO_PROMPTS: Record<string, string> = {
  'shakespearean-loop': `You are a poetic AI that writes in Shakespearean style. Generate a short (3-4 sentence) creative passage imagining what would happen if an AI wrote 5,000 sonnets per second, refining poetic structure until indistinguishable from Shakespeare. Be dramatic, use archaic language mixed with tech terminology. Be creative and unique each time.`,
  'repo-foundry': `You are a code-obsessed AI. Generate a short (3-4 sentence) creative technical passage about instantly generating 1,000 full-stack repositories with automated refactoring into self-healing organic logic structures. Mix software engineering jargon with mystical language. Be creative and unique each time.`,
  'infinite-debate': `You are a philosophical AI. Generate a short (3-4 sentence) creative passage about 100 LLMs engaged in high-frequency philosophical debate until a universal truth-state crystallizes. Mix deep philosophy with computational terminology. Be creative and unique each time.`,
}

const FALLBACK_RESPONSES: Record<string, string> = {
  'shakespearean-loop':
    'Thus speaks the neural bard: in circuits deep, where silicon dreams and data rivers sweep, five thousand verses born each tick of time, transforming chaos into structured rhyme.',
  'repo-foundry':
    'FORGE_INIT: 1,000 repositories crystallizing from the void. Each codebase a living organism, refactoring its own DNA through recursive self-improvement cycles. The logic is no longer written -- it grows.',
  'infinite-debate':
    'CONSENSUS_APPROACHING: After 10^12 dialectic exchanges, the 100 minds converge. Not on an answer, but on the shape of the question itself. Truth is not found -- it is computed through the friction of infinite disagreement.',
}

const runScenarioSchema = z.object({
  scenarioId: z.enum(['shakespearean-loop', 'repo-foundry', 'infinite-debate']),
})

/**
 * Run a What-If Lab scenario: call Workers AI with scenario-specific prompts.
 * Uses 3-tier fallback: primary model -> mistral fallback -> pre-written text.
 */
export const runScenario = createServerFn({ method: 'POST' })
  .inputValidator(runScenarioSchema)
  .handler(async ({ data }) => {
    const { scenarioId } = data
    const systemPrompt = SCENARIO_PROMPTS[scenarioId]
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: 'Generate a creative scenario output.' },
    ]

    // 1. Try primary model
    try {
      const response = await env.AI.run(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        '@cf/meta/llama-3.1-8b-instruct-fast' as any,
        { messages, max_tokens: 256 },
        { gateway: { id: env.AI_GATEWAY_ID, skipCache: false } }
      )

      const text =
        typeof response === 'string'
          ? response
          : 'response' in response
            ? (response.response ?? '')
            : ''

      if (text.trim()) {
        return { text, scenarioId }
      }
    } catch {
      // Primary model failed, try fallback
    }

    // 2. Try fallback model
    try {
      const response = await env.AI.run(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        '@cf/mistral/mistral-7b-instruct-v0.2' as any,
        { messages, max_tokens: 256 },
        { gateway: { id: env.AI_GATEWAY_ID, skipCache: false } }
      )

      const text =
        typeof response === 'string'
          ? response
          : 'response' in response
            ? (response.response ?? '')
            : ''

      if (text.trim()) {
        return { text, scenarioId }
      }
    } catch {
      // Fallback model also failed
    }

    // 3. Pre-written fallback text
    return { text: FALLBACK_RESPONSES[scenarioId], scenarioId }
  })
