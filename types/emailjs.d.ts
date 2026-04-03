declare module '@emailjs/browser' {
  export function send(
    serviceId: string,
    templateId: string,
    templateParams: Record<string, any>,
    publicKey?: string
  ): Promise<{ status: number; text: string }>;

  export function init(publicKey: string | Record<string, string>): void;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_EMAILJS_SERVICE_ID?: string
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?: string
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_VERIFICATION?: string
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?: string
    }
  }
}
