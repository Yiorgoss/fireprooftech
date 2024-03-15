import {
  Text,
  Hr,
  Html,
  Tailwind,
  Preview,
  Heading,
  Img,
  Container,
  Body,
  Row,
  Column
} from '@react-email/components';
import * as React from 'react';
import * as m from '$pg/messages';
import { contactInfo } from '$lib/siteConfig';

export default function InquiryEmail({ lang = 'en', dir = 'ltr' }: { lang: string, dir: string }) {
  return (
    <Html lang={lang} dir={dir}>
      <Preview>{m.email_verification_preview()}</Preview>
      <Tailwind>
        <Body style={main}>
          <Container className="py-10 w-full bg-white">
            <Row>
              <Column>
                <Img
                  className=""
                  src="https://fireprooftech.vercel.app/favicons/android-chrome-512x512.png"
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Column>
              <Column>
                <Heading as="h1" className="">
                  {m.email_verification_heading()}
                </Heading>
              </Column>
            </Row>
          </Container>
          <Container className="px-10 text-lg">
            <Text className="text-base">{m.email_verification_text_1()}</Text>
            <Text className="text-base">{m.email_verification_text_2()}</Text>
            <Hr />
            <Text className="text-base">{m.email_verification_text_3()}</Text>
            <Text className="text-2xl">{contactInfo[0].info}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};
