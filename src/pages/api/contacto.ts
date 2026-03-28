import type { APIRoute } from "astro";
import { CLOUDFLARE_SECRETKEY } from "astro:env/server";
import { sendContactEmail } from "../../lib/email";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const turnstileToken = data.get("cf-turnstile-response");

    // Validate Cloudflare Turnstile
    const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: CLOUDFLARE_SECRETKEY,
                response: turnstileToken as string,
            }),
        }
    );
    const turnstileData = await turnstileResponse.json();
    if (!turnstileData.success) {
        return new Response(
            JSON.stringify({ message: "Invalid turnstile" }),
            { status: 400 }
        );
    }

    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({ message: "Missing required fields" }),
            { status: 400 }
        );
    }

    await sendContactEmail(name as string, email as string, message as string);

    return new Response(
        JSON.stringify({ message: "Success!" }),
        { status: 200 }
    );
};
