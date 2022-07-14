import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string | undefined) => Promise<boolean>;
type ClearFn = () => void; // Return success

interface Props {
  timeToClear?: number;
}

export const useCopyToClipboard = ({ timeToClear }: Props = {}): [
  CopiedValue,
  CopyFn,
  ClearFn
] => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  let timeoutId: NodeJS.Timeout;

  const copy: CopyFn = async (text = '') => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeoutClear();
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  const setTimeoutClear = () => {
    clearTimeout(timeoutId);
    if (timeToClear) timeoutId = setTimeout(clear, timeToClear);
  };

  const clear: ClearFn = () => {
    setCopiedText(null);
    clearTimeout(timeoutId);
  };

  return [copiedText, copy, clear];
};
