export const prerender = false
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const recaptcha = data.get("cf-turnstile-response");

    // Validate cloudflare recaptcha
    // const recaptchaResponse = await fetch(
    //     `https://www.google.com/recaptcha/api/siteverify?secret=${Deno.env.get("RECAPTCHA_SECRET")}&response=${recaptcha}`,
    //     {
    //         method: "POST",
    //     }
    // );
    // const recaptchaData = await recaptchaResponse.json();
    // if (!recaptchaData.success) {
    //     return new Response(
    //         JSON.stringify({
    //             message: "Invalid recaptcha",
    //         }),
    //         { status: 400 }
    //     );
    // }


    console.log(name, email, message, recaptcha);
    // Validate the data - you'll probably want to do more than this
    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }
    // Do something with the data, then return a success response
    return new Response(
        JSON.stringify({
            message: "Success!"
        }),
        { status: 200 }
    );
};