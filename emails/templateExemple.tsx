import {
  Body,
  Column,
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
  Row,
} from "@react-email/components";
import * as React from "react";
import * as style from "./templateStyle";
interface StackOverflowTipsEmailProps {
  tips?: { id: number; description: string }[];
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const PropDefaults: StackOverflowTipsEmailProps = {
  tips: [
    {
      id: 1,
      description:
        'To find a specific phrase, enter it in quotes: "local storage"',
    },
    {
      id: 1,
      description:
        "To search within specific tag(s), enter them in square brackets: [javascript]",
    },
    {
      id: 1,
      description:
        'Combine them to get even more precise results - [javascript] "local storage" searches for the phrase “local storage” in questions that have the [javascript] tag',
    },
  ],
};

export const StackOverflowTipsEmail = ({
  tips = [],
}: StackOverflowTipsEmailProps) => (
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

          <Hr style={style.divider} />

          <Heading as="h2" style={style.title}>
            Use the search bar at the top of the page to find what you need
          </Heading>
          <Text style={style.paragraph}>
            Here are a few simple search tips to get you started:
          </Text>
          <ul>
            {tips.map((tip) => (
              <li key={tip.id}>
                <Text style={style.paragraph}>{tip.description}</Text>
              </li>
            ))}
          </ul>

          <Text style={style.paragraph}>
            The more information you can put in the search bar, the more likely
            you will be to either find the answer you need or feel confident
            that no one else has asked the question before.
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
      </Container>

      <Section style={style.footer}>
        <Text style={style.footerText}>
          {`You're receiving this email because your Stack Overflow activity
          triggered this tip or reminder.`}
        </Text>

        <Link href="/" style={style.footerLink}>
          Unsubscribe from emails like this{" "}
        </Link>
        <Link href="/" style={style.footerLink}>
          Edit email settings{" "}
        </Link>
        <Link href="/" style={style.footerLink}>
          Contact us
        </Link>
        <Link href="/" style={style.footerLink}>
          Privacy
        </Link>

        <Hr style={style.footerDivider} />

        <Img width={111} src={`${baseUrl}/static/stack-overflow-logo-sm.png`} />
        <Text style={style.footerAddress}>
          <strong>Stack Overflow</strong>, 110 William Street, 28th Floor, New
          York, NY 10038
        </Text>
        <Text style={style.footerHeart}>{"<3"}</Text>
      </Section>
    </Body>
  </Html>
);

StackOverflowTipsEmail.PreviewProps = {
  tips: PropDefaults.tips,
} as StackOverflowTipsEmailProps;
