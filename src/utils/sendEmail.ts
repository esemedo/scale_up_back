import { render } from "@react-email/render";
import { Resend } from "resend";

const resend = new Resend("re_MAkMG4oT_L6TDv5pmhfUVCcPdjx7Z3WiW");

export async function sendEmailUtils(
  receiver: string,
  subject: string,
  emailComponent:React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) {
    const emailHtml = render(emailComponent);

    const { data, error } = await resend.emails.send({
      from: "contact@exploitation.cloud", 
      to: [receiver],
      subject: subject,
      html: emailHtml,
    });

}