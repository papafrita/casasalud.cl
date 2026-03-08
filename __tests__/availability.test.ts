import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getAvailableSlots } from '../src/lib/availability';
import { prisma } from '../src/lib/prisma';
import { addMinutes, parseISO } from 'date-fns';

vi.mock('../src/lib/prisma', () => ({
    prisma: {
        availabilityRule: { findMany: vi.fn() },
        appointment: { findMany: vi.fn() }
    }
}));

describe('getAvailableSlots', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-03-05T00:00:00.000Z')); // Ensure "now" doesn't invalidate future slots
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('generates 30 min slots without conflicting appointments', async () => {
        const mockRule = {
            startTime: parseISO('1970-01-01T09:00:00.000Z'),
            endTime: parseISO('1970-01-01T11:00:00.000Z')
        };
        (prisma.availabilityRule.findMany as any).mockResolvedValue([mockRule]);
        (prisma.appointment.findMany as any).mockResolvedValue([]);

        const slots = await getAvailableSlots('provider-id', '2026-03-10');
        expect(slots.length).toBe(4);
        expect(slots[0].startTime).toContain('12:00:00.000Z'); // 09:00 CLST is 12:00 UTC
    });

    it('filters out slots conflicting with appointments including 15 min buffer', async () => {
        const mockRule = {
            startTime: parseISO('1970-01-01T09:00:00.000Z'), // 12:00 UTC
            endTime: parseISO('1970-01-01T11:00:00.000Z')   // 14:00 UTC
        };

        // Existing appointment from 09:30 to 10:00 (CLST) -> 12:30 to 13:00 (UTC)
        const mockAppointment = {
            startTime: parseISO('2026-03-10T12:30:00.000Z'),
            endTime: parseISO('2026-03-10T13:00:00.000Z'),
        };

        (prisma.availabilityRule.findMany as any).mockResolvedValue([mockRule]);
        (prisma.appointment.findMany as any).mockResolvedValue([mockAppointment]);

        const slots = await getAvailableSlots('provider-id', '2026-03-10');
        // Base slots logic:
        // Slot 1: 09:00-09:30 - ends at 09:30. Appt starts at 09:30. But 15m buffer applies. 
        // Wait, if appt starts at 09:30, buffer means we can't end later than 09:15.
        // So 09:00-09:30 overlaps the buffer! Excluded.
        // Slot 2: 09:30-10:00 - Overlaps appt. Excluded.
        // Slot 3: 10:00-10:30 - Starts at 10:00. Appt ends at 10:00. Buffer means we can't start before 10:15. 
        // So 10:00-10:30 overlaps the buffer! Excluded.
        // Slot 4: 10:30-11:00 - Starts at 10:30. Valid!
        expect(slots.length).toBe(1);
        expect(slots[0].startTime).toContain('13:30:00.000Z'); // 10:30 CLST is 13:30 UTC
    });
});
