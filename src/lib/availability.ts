import { prisma } from './prisma';
import { addMinutes, isBefore, isAfter, isEqual, parse, set } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'America/Santiago';

export interface Slot {
    startTime: string; // ISO string 
    endTime: string;   // ISO string
}

export async function getAvailableSlots(
    providerId: string,
    dateStr: string, // YYYY-MM-DD format
    slotDurationMinutes: number = 30,
    bufferMinutes: number = 15
): Promise<Slot[]> {
    // Parse target date assuming local to Chilean timezone
    const targetDate = parse(dateStr, 'yyyy-MM-dd', new Date());
    const zonedTargetDate = toZonedTime(targetDate, TIMEZONE);
    const dayOfWeek = zonedTargetDate.getDay();

    // Fetch availability rules for provider on this day
    const rules = await prisma.availabilityRule.findMany({
        where: {
            providerId,
            dayOfWeek,
        }
    });

    if (rules.length === 0) return [];

    // Setup interval for fetching appointments (start of day to end of day)
    const startOfDayUtc = set(zonedTargetDate, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const endOfDayUtc = set(zonedTargetDate, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });

    const appointments = await prisma.appointment.findMany({
        where: {
            providerId,
            status: { not: 'CANCELLED' },
            startTime: { gte: startOfDayUtc },
            endTime: { lte: endOfDayUtc },
        }
    });

    const availableSlots: Slot[] = [];
    const now = new Date(); // Used to ensure we don't return slots in the past

    for (const rule of rules) {
        const ruleStart = rule.startTime;
        const ruleEnd = rule.endTime;

        // Construct the actual UTC start/end times for today in Santiago TimeZone
        // Prisma db.Time parses to 1970-01-01T__:__:00.000Z, getUTCHours retrieves the real hour
        const ruleStartZoned = set(zonedTargetDate, {
            hours: ruleStart.getUTCHours(),
            minutes: ruleStart.getUTCMinutes()
        });
        const ruleEndZoned = set(zonedTargetDate, {
            hours: ruleEnd.getUTCHours(),
            minutes: ruleEnd.getUTCMinutes()
        });

        let currentSlotStart = ruleStartZoned;

        while (isBefore(addMinutes(currentSlotStart, slotDurationMinutes), ruleEndZoned) || isEqual(addMinutes(currentSlotStart, slotDurationMinutes), ruleEndZoned)) {
            const currentSlotEnd = addMinutes(currentSlotStart, slotDurationMinutes);

            // Exclude past slots
            if (isBefore(currentSlotStart, now)) {
                currentSlotStart = addMinutes(currentSlotStart, slotDurationMinutes);
                continue;
            }

            // Check overlaps with appointments (+buffer)
            let isOverlapping = false;
            for (const app of appointments) {
                const appStartWithBuffer = addMinutes(app.startTime, -bufferMinutes);
                const appEndWithBuffer = addMinutes(app.endTime, bufferMinutes);

                // Overlapping condition: ASlot starts before BEnd and AEnd is after BStart
                if (isBefore(currentSlotStart, appEndWithBuffer) && isAfter(currentSlotEnd, appStartWithBuffer)) {
                    isOverlapping = true;
                    break;
                }
            }

            if (!isOverlapping) {
                availableSlots.push({
                    startTime: currentSlotStart.toISOString(),
                    endTime: currentSlotEnd.toISOString(),
                });
            }

            // Move to next adjacent generic slot block
            currentSlotStart = addMinutes(currentSlotStart, slotDurationMinutes);
        }
    }

    return availableSlots;
}
