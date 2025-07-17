import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  let locale = cookieStore.get("MYNEXTAPP_LOCALE")?.value || "am";

  const filePath = path.resolve(`./messages/${locale}.json`);
  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    locale = "am";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
