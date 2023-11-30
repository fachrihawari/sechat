import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, body) {
    if (process.env.NODE_ENV === "development") {
        console.log(`Email sent to ${to} with subject ${subject}`);
        console.log(body);
        return;
    }

    return resend.emails.send({
        from: "sechat@hawari.dev",
        to,
        subject,
        html: body
    })
}
