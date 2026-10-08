/** Used only for tel: / WhatsApp links — do not render in UI */
export const PHONE = '03276069025'
export const PHONE_INTL = '+923276069025'

export const callUrl = `tel:${PHONE_INTL}`
export const whatsappUrl = `https://wa.me/923276069025`

export function whatsappLink(message: string): string {
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`
}
