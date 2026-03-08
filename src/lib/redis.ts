import Redis from 'ioredis';

// Ensure this only creates a single instance in development to avoid connection spikes
const globalForRedis = global as unknown as { redis: Redis };

export const redis = globalForRedis.redis || new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

/**
 * Acquires a lock for a specific time slot to prevent double-booking.
 * The lock naturally expires after the specified TTL to prevent deadlocks.
 * 
 * @param providerId The provider's ID
 * @param slotStartTime The ISO string of the slot start
 * @param ttlSeconds Time-to-live for the lock in seconds (default 10 mins)
 * @returns boolean indicating if the lock was successfully acquired
 */
export async function lockBookingSlot(providerId: string, slotStartTime: string, ttlSeconds: number = 600): Promise<boolean> {
  const key = `booking_lock:${providerId}:${slotStartTime}`;
  // NX ensures we only set the key if it does NOT exist.
  // EX sets the expiration in seconds.
  const result = await redis.set(key, 'locked', 'EX', ttlSeconds, 'NX');
  return result === 'OK';
}

/**
 * Releases a booking lock early, for example if the user cancels the process
 * or if the booking completes successfully.
 * 
 * @param providerId The provider's ID
 * @param slotStartTime The ISO string of the slot start
 */
export async function releaseBookingSlot(providerId: string, slotStartTime: string): Promise<void> {
  const key = `booking_lock:${providerId}:${slotStartTime}`;
  await redis.del(key);
}

/**
 * Checks if a slot is currently locked by someone else.
 */
export async function isBookingSlotLocked(providerId: string, slotStartTime: string): Promise<boolean> {
  const key = `booking_lock:${providerId}:${slotStartTime}`;
  const value = await redis.get(key);
  return value !== null;
}
