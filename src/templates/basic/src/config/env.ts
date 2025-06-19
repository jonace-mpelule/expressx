import 'dotenv/config'
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().min(1000),
    DATABASE_URL: z.string().min(3),
})

const envParseResult = envSchema.safeParse(process.env);
if (!envParseResult.success) {
    console.error("\x1b[31m%s\x1b[0m", "Invalid Environment Variables:", envParseResult.error.issues);
    process.exit(1);
}

const env = envParseResult.data
export default env;