import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, body) {
    return resend.emails.send({
        from: "sechat@hawari.dev",
        to,
        subject,
        html: body
    })
}
