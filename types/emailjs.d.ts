declare module '@emailjs/browser' {
  export function send(
    serviceId: string,
    templateId: string,
    templateParams: Record<string, any>,
    publicKey?: string
  ): Promise<{ status: number; text: string }>;

  export function init(publicKey: string | Record<string, string>): void;
}
