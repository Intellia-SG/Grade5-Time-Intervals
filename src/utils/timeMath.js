/**
 * Time Math Engine for Grade 5 Time Intervals
 * Performs minute-based time arithmetic (0-1439 minutes) avoiding Date/timezone pitfalls.
 */

// Convert 12h representation to total minutes from midnight (0..1439)
export function to24hMinutes({ hour, minute, period }) {
  let h = hour % 12;
  if (period && period.toUpperCase() === 'PM') {
    h += 12;
  }
  return h * 60 + (minute || 0);
}

// Parse string formats: "9:45 a.m.", "08:15", "14:30", "2:30 p.m.", "11:45 PM"
export function parseTimeString(timeStr) {
  if (!timeStr) return 0;
  const cleaned = timeStr.trim().toLowerCase();
  
  const isPm = cleaned.includes('p.m.') || cleaned.includes('pm');
  const isAm = cleaned.includes('a.m.') || cleaned.includes('am');
  
  const digitsOnly = cleaned.replace(/[^\d:]/g, '');
  const parts = digitsOnly.split(':');
  
  let hour = parseInt(parts[0], 10) || 0;
  let minute = parseInt(parts[1], 10) || 0;

  if (isPm || isAm) {
    hour = hour % 12;
    if (isPm) hour += 12;
    return hour * 60 + minute;
  } else {
    // 24-hour time
    return (hour % 24) * 60 + minute;
  }
}

// Add duration in minutes to start time, wrapping at 1440 (24 hrs)
export function addDuration(startMinutes, durationMinutes) {
  return (startMinutes + durationMinutes) % 1440;
}

// Subtract duration in minutes from end time, wrapping backwards past midnight
export function subtractDuration(endMinutes, durationMinutes) {
  return (endMinutes - durationMinutes + 1440 * 10) % 1440;
}

// Calculate elapsed duration between two minutes-since-midnight values
export function elapsedMinutes(startMinutes, endMinutes) {
  return (endMinutes - startMinutes + 1440) % 1440;
}

// Format total minutes to 12-hour object { hour, minute, period, formatted }
export function formatTo12h(totalMinutes) {
  const norm = (totalMinutes % 1440 + 1440) % 1440;
  const h24 = Math.floor(norm / 60);
  const m = norm % 60;
  const period = h24 >= 12 ? 'p.m.' : 'a.m.';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const formattedMinutes = String(m).padStart(2, '0');
  
  return {
    hour: h12,
    minute: m,
    period,
    formatted: `${h12}:${formattedMinutes} ${period}`
  };
}

// Format total minutes to 24-hour string "HH:MM"
export function formatTo24h(totalMinutes) {
  const norm = (totalMinutes % 1440 + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Format minutes duration into human readable string, e.g. "2 hr 15 min"
export function formatDuration(durationMinutes) {
  const h = Math.floor(durationMinutes / 60);
  const m = durationMinutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

// Detect if interval crosses midnight boundary
export function crossesMidnight(startMinutes, durationMinutes) {
  return startMinutes + durationMinutes >= 1440;
}

// Detect if interval crosses AM/PM boundary without crossing midnight
export function crossesAmPm(startMinutes, durationMinutes) {
  const end = startMinutes + durationMinutes;
  return Math.floor(startMinutes / 720) !== Math.floor(end / 720) && end < 1440;
}

// Helper to convert time format according to requested mode ('12h' or '24h')
export function formatTimeDisplay(totalMinutes, format = '12h') {
  if (format === '24h') {
    return formatTo24h(totalMinutes);
  }
  return formatTo12h(totalMinutes).formatted;
}
