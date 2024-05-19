import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PurchaseOrderEmailProps {
  idDei: number;
}

export const PurchaseOrderEmail = ({
  idDei,
}: PurchaseOrderEmailProps) => {
  return <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Le bon de commande a été retourné.</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={linkStyle}  href={`http://localhost:3000/api/purchase-orders/files/${idDei}`}>
              👉 Cliquez ici pour voir votre bon de commande 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            Si vous n'êtes pas à l'origine de cette requête, ignorez ce mail.
          </Text>
        </Section>
        <Text style={paragraph}>
          Meilleur voeux,
          <br />- Coding Factory
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Coding Factory</Text>
        <Text style={footer}>
          3 Rue Armand Moisant, 75015 Paris
        </Text>
      </Container>
    </Body>
  </Html>
}





export default PurchaseOrderEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const linkStyle = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
