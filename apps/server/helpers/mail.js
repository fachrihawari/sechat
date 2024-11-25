import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, body) {
    if (process.env.NODE_ENV === "development") {
        console.log(`Email sent to ${to} with subject ${subject}`);
        console.log(body);
        return;
    }

    return resend.emails.send({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: body
    })
}
