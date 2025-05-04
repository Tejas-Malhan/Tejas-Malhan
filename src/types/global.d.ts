
interface Calendly {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement | null;
    prefill?: Record<string, any>;
    utm?: Record<string, any>;
  }) => void;
}

interface Window {
  Calendly?: Calendly;
}
