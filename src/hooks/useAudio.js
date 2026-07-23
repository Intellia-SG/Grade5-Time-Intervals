import { useEffect } from 'react';
import { narrate, stopNarration } from '../utils/audio.js';

export function useAudio(segments, enabled = true, deps = []) {
  useEffect(() => {
    if (enabled && segments && segments.length > 0) {
      narrate(segments, enabled);
    }
    return () => {
      stopNarration();
    };
  }, [enabled, ...deps]);
}
