/**
 * In-memory token bucket. Fine for a single Vercel instance and free-tier use.
 * For production scale, swap to Upstash Redis or @vercel/kv.
 */

type Bucket = { tokens: number; lastRefill: number };
const buckets = new Map<string, Bucket>();

const CAPACITY = 5; // burst
const REFILL_PER_MS = 5 / (60 * 1000); // 5 per minute

export function rateLimit(key: string): { ok: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: CAPACITY, lastRefill: now };

  const elapsed = now - bucket.lastRefill;
  bucket.tokens = Math.min(CAPACITY, bucket.tokens + elapsed * REFILL_PER_MS);
  bucket.lastRefill = now;

  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    const retryAfterMs = Math.ceil((1 - bucket.tokens) / REFILL_PER_MS);
    return { ok: false, remaining: 0, retryAfterMs };
  }

  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { ok: true, remaining: Math.floor(bucket.tokens), retryAfterMs: 0 };
}
