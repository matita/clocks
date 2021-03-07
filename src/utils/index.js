export { default as copy } from './copy';

export const slimEncode = (text) => encodeURIComponent(text)
  .replace(/%20/g, '+')
  .replace(/%2C/g, ',');

export const serializeClocks = (clocks) => clocks
  .filter((clock) => !clock.isLocal)
  .map((clock) => [
    clock.location,
    clock.minutesOffset,
    clock.name || ''
  ].map(slimEncode).join(';'))
  .join('|');

export const deserializeClocks = (clocksStr) => (clocksStr || '')
  .split('|')
  .filter((p) => !!p) // discard empty strings
  .map((part) => {
    const [ location, minutesOffset, name ] = part.split(';').map(decodeURIComponent);
    return {
      location,
      name,
      minutesOffset: +minutesOffset,
    };
  });
