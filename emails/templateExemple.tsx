import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import * as style from "./templateStyle";
interface StackOverflowTipsEmailProps {
  tips?: { id: number; description: string }[];
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const RaycastMagicLinkEmail = ({
  magicLink,
}: RaycastMagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Stack overflow tips for searching</Preview>
    <Body style={style.main}>
      <Container style={style.container}>
        <Section style={style.logo}>
          <Img width={146} src={`${baseUrl}/static/stack-overflow-logo.png`} />
        </Section>

        <Section style={style.header}>
          <Row>
            <Column style={style.headerContent}>
              <Heading style={style.headerContentTitle}>
                Find what you want, faster
              </Heading>
              <Text style={style.headerContentSubtitle}>
                Tips and tricks for searching on Stack Overflow
              </Text>
            </Column>
            <Column style={style.headerImageContainer}>
              <Img
                style={style.headerImage}
                width={340}
                src={`${baseUrl}/static/stack-overflow-header.png`}
              />
            </Column>
          </Row>
        </Section>

        <Section style={style.content}>
          <Heading as="h2" style={style.title}>
            Searching for solutions
          </Heading>
          <Text style={style.paragraph}>
            {` With more than 18 million questions, it's possible that someone has
            already provided a solution to the problem you're facing.{" "}`}
          </Text>
          <Text style={paragraph}>
            If you didn't request this, please ignore this email.
          </Text>

          <Hr style={style.divider} />

          <Heading as="h2" style={style.title}>
            Take a break and read about the worst coder in the world
          </Heading>

          <Section style={style.buttonContainer}>
            <Link
              style={style.button}
              href="https://stackoverflow.blog/2019/10/22/"
            >
              I need a break
            </Link>
          </Section>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Raycast Team
        </Text>
        <Hr style={hr} />
        <Img
          src={`${baseUrl}/static/raycast-logo.png`}
          width={32}
          height={32}
          style={{
            WebkitFilter: "grayscale(100%)",
            filter: "grayscale(100%)",
            margin: "20px 0",
          }}
        />
        <Text style={footer}>Raycast Technologies Inc.</Text>
        <Text style={footer}>
          2093 Philadelphia Pike #3222, Claymont, DE 19703
        </Text>
      </Container>
    </Body>
  </Html>
);

StackOverflowTipsEmail.PreviewProps = {
  tips: PropDefaults.tips,
} as StackOverflowTipsEmailProps;
