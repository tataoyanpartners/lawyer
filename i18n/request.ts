import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  let locale = cookieStore.get("MYNEXTAPP_LOCALE")?.value || "am";

  // Validate locale against supported locales
  const supportedLocales = ['en', 'am', 'ru'];
  if (!supportedLocales.includes(locale)) {
    locale = "am";
  }

  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to default locale if translation file doesn't exist
    locale = "am";
    messages = (await import(`../messages/am.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
