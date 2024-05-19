import { render } from "@react-email/render";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailUtils(
  receiver: string,
  subject: string,
  emailComponent: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >
) {
  if (!process.env.EMAIL_ADDRESS) {
    throw new Error("EMAIL_ADDRESS is not defined in the .env file");
  }

  const emailHtml = render(emailComponent);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_ADDRESS,
    to: [receiver],
    subject: subject,
    html: emailHtml,
  });
}
