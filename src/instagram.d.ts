interface InstgrmEmbeds {
  process(): void;
}

interface Instgrm {
  Embeds: InstgrmEmbeds;
}

declare global {
  interface Window {
    instgrm?: Instgrm;
  }
}

export {};
