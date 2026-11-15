import {
  ArticleBody,
  ArticleFlow,
  ArticleHeader,
  ArticleHeading,
  ArticleParagraph,
  ArticleSubheading,
} from "@/components/site/article";
import { Box, Link, VStack } from "@chakra-ui/react";
import React from "react";

/** The policy's sections, for its contents list. */
const SECTIONS = [
  "I. The Information We Collect",
  "II. Information Use and Sharing",
  "III. User Access and Choice",
  "IV. External Websites and Third Parties",
  "V. Security",
  "VI. Children's Privacy",
  "VII. Do Not Track",
  "VIII. Notice to California Residents",
  "IX. Notice to Nevada Residents",
  "X. Notice to Non-US Residents",
  "XI. Changes to this Privacy Policy",
  "XII. Contacting Us",
];

export const PrivacyPolicyPage: React.FC = () => (
  <>
    <ArticleHeader
      title="Privacy Policy"
      properties={["Effective: July 24, 2025"]}
    />
    <ArticleBody contents={SECTIONS}>
      <ArticleFlow>
        <ArticleParagraph>
          We at Rengo AI, Inc. ("Rengo AI," "we," "us," or "our") know that data
          privacy is very important to you. We have created this privacy policy
          (the "Privacy Policy") to describe how we collect and process
          information from and about you via our website at www.rengoai.com (the
          "Website") and when you otherwise interact with us (collectively, the
          "Services").
        </ArticleParagraph>

        <ArticleParagraph>
          By accepting this Privacy Policy, accessing or using the Services, or
          otherwise manifesting your assent to this Privacy Policy, you agree to
          be bound by this Privacy Policy. If you do not agree to (or cannot
          comply with) all of the terms of this Privacy Policy you may not
          access or use the Services.
        </ArticleParagraph>

        <ArticleParagraph>
          Capitalized terms not defined in this Privacy Policy shall have the
          meaning set forth in our Terms of Use.
        </ArticleParagraph>

        <ArticleHeading text="I. The Information We Collect" />
        <ArticleParagraph>
          In the course of providing the Services, we may collect or receive the
          following types of information about you, which may include personal
          information.
        </ArticleParagraph>

        <ArticleSubheading text="1. Contact Information" />
        <ArticleParagraph>
          We collect contact information through our Services, which typically
          includes your name, email address, phone number, and any information
          you provide in messages to us ("Contact Information"). We use Contact
          Information for purposes such as providing you with information about
          the Services, responding to your inquiries, sending you email alerts
          (including marketing emails), or providing you with the Services.
        </ArticleParagraph>

        <ArticleSubheading text="2. Information obtained automatically from your online activity" />
        <ArticleParagraph>
          When visitors ("Visitors") access or use our Services, we may
          automatically collect certain information sent to us by the person's
          computer, mobile device, tablet, or any other device. For Visitors who
          are candidates for employment with us, please review the Workforce
          Privacy Notice attached hereto as Appendix 1 for more information on
          how we handle your data.
        </ArticleParagraph>

        <ArticleParagraph>
          We automatically receive standard technical information when you
          access or use the Services through use of browser cookies, pixels, web
          server logs, web beacons, and similar technologies (collectively,
          "Tracking Technologies"). The information collected enable us to
          personalize your experience with the Services, understand how you use
          them, maintain a persistent session, and improve and further develop
          our Services.
        </ArticleParagraph>

        <ArticleParagraph>
          We may also automatically collect other information when you access or
          use the Services such as (i) information about the device used; (ii)
          IP addresses; (iii) browser type and language; (iv) referring and exit
          pages and URLs; (v) date and time of access; (vi) the content viewed;
          (vii) the amount of time spent on particular pages; (viii) what
          features of the Services are used or visited; (ix) details of any
          purchases; (x) click stream information; and (xi) precise geolocation
          data.
        </ArticleParagraph>

        <ArticleSubheading text="3. Geolocation information" />
        <ArticleParagraph>
          To provide access to the Services while you are using an electronic
          device, we automatically collect geolocation information from your
          mobile device, your wireless carrier, or certain third-party service
          providers ("Geolocation Information"). You may control the collection
          of Geolocation Information through the user settings on your device.
        </ArticleParagraph>

        <ArticleSubheading text="4. Information obtained from other sources" />
        <ArticleParagraph>
          We collect personal information from Visitors when they access or use
          our Services. We may also collect or receive your personal information
          from third parties or when you visit, use, or access the Services from
          third-party websites. This includes any social media pages we may have
          on third-party services such as Twitter and LinkedIn.
        </ArticleParagraph>

        <ArticleSubheading text="5. Information obtained from third-party analytics services" />
        <ArticleParagraph>
          We use third-party analytics services (such as Google Analytics) to
          evaluate your use of the Services, compile reports on activity,
          collect demographic data, analyze performance metrics, collect and
          evaluate other information relating to the Services and mobile and
          internet usage.
        </ArticleParagraph>

        <ArticleParagraph>
          For Google Analytics, please visit:{" "}
          <Link
            href="https://support.google.com/analytics/answer/6004245?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            color="site.highlight"
            textDecoration="underline"
          >
            https://support.google.com/analytics/answer/6004245?hl=en
          </Link>{" "}
          and{" "}
          <Link
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            color="site.highlight"
            textDecoration="underline"
          >
            https://tools.google.com/dlpage/gaoptout
          </Link>
        </ArticleParagraph>

        <ArticleSubheading text="6. Online advertising and tracking partners" />
        <ArticleParagraph>
          When you visit or log in to our website, cookies and similar
          technologies may be used by our online data partners or vendors to
          associate these activities with other personal information they or
          others have about you, including by association with your email or
          mailing address. We (or service providers on our behalf) may then send
          communications and marketing to these email addresses. You may opt out
          of receiving this advertising by visiting{" "}
          <Link
            href="https://app.retention.com/optout"
            target="_blank"
            rel="noopener noreferrer"
            color="site.highlight"
            textDecoration="underline"
          >
            https://app.retention.com/optout
          </Link>
          .
        </ArticleParagraph>

        <ArticleHeading text="II. Information Use and Sharing" />
        <ArticleParagraph>
          We use and share your personal information as set forth below:
        </ArticleParagraph>
        <Box pl="16px">
          <VStack gap={2} align="stretch">
            <ArticleParagraph>
              • To monitor, support, analyze, and improve the Services;
            </ArticleParagraph>
            <ArticleParagraph>
              • To communicate with you regarding the Services;
            </ArticleParagraph>
            <ArticleParagraph>
              • To fulfill your requests for information regarding new or
              improved products and services;
            </ArticleParagraph>
            <ArticleParagraph>
              • To conduct marketing and advertising programs;
            </ArticleParagraph>
            <ArticleParagraph>
              • To engage research, project planning, troubleshooting problems,
              and detecting and protecting against error, fraud, or other
              criminal activity;
            </ArticleParagraph>
            <ArticleParagraph>
              • To protect the safety and security of our Services and business;
            </ArticleParagraph>
            <ArticleParagraph>
              • To third-party contractors and service providers that provide
              services to us;
            </ArticleParagraph>
            <ArticleParagraph>
              • To fulfill our legal and regulatory requirements;
            </ArticleParagraph>
            <ArticleParagraph>
              • To comply with applicable law;
            </ArticleParagraph>
            <ArticleParagraph>
              • To assess or complete a corporate sale, merger, reorganization,
              sale of assets, dissolution, investment, or similar corporate
              event;
            </ArticleParagraph>
            <ArticleParagraph>• Otherwise, with your consent.</ArticleParagraph>
          </VStack>
        </Box>

        <ArticleHeading text="III. User Access and Choice" />
        <ArticleParagraph>
          If the personal information on file for you changes, or if you no
          longer desire our Services, you may correct or update it by contacting
          us under Section XII ("Contacting Us") of this Privacy Policy.
        </ArticleParagraph>

        <ArticleParagraph>
          You may manage your receipt of marketing and non-transactional
          communications by clicking on the "unsubscribe" hyperlink located on
          the bottom of any of our marketing emails.
        </ArticleParagraph>

        <ArticleHeading text="IV. External Websites and Third Parties" />
        <ArticleParagraph>
          Unless explicitly stated otherwise, our Privacy Policy addresses only
          our use and disclosure of information we collect from and/or about you
          in your interactions with Rengo AI. If you choose to disclose
          information to third parties, the use and disclosure restrictions
          contained in this Privacy Policy will not apply.
        </ArticleParagraph>

        <ArticleHeading text="V. Security" />
        <ArticleParagraph>
          We follow commercially reasonable and generally accepted standards to
          protect the personal information submitted to us, both during
          transmission and once we receive it. Please understand, however, that
          no method of transmission over the internet, or method of electronic
          storage, is 100% secure.
        </ArticleParagraph>

        <ArticleHeading text="VI. Children's Privacy" />
        <ArticleParagraph>
          Our Services are only available to individuals aged 18 or older, and
          we do not knowingly collect personal information from any person under
          the age of 18. If an individual under the age of 18 has provided us
          with Personal Information, a parent or guardian of that child may
          contact us and request that such information be deleted.
        </ArticleParagraph>

        <ArticleHeading text="VII. Do Not Track" />
        <ArticleParagraph>
          As discussed above, third parties such as advertising networks and
          analytics providers may collect information about your online
          activities over time and across different websites when you access or
          use the Services. At this time, we do not monitor, recognize, or honor
          any opt-out or do not track mechanisms.
        </ArticleParagraph>

        <ArticleHeading text="VIII. Notice to California Residents" />
        <ArticleParagraph>
          Under California's "Shine the Light" law (Civil Code Section §
          1798.83), residents of California have the right to obtain certain
          information about the types of personal information that companies
          with whom they have an established business relationship have shared
          with third parties for direct marketing purposes. If you wish to
          submit a request pursuant to Section 1798.83, please contact us via
          email at legal@rengoai.com.
        </ArticleParagraph>

        <ArticleParagraph>
          Additionally, as a California resident, you have certain rights under
          the California Privacy Rights Act (CPRA). These include:
        </ArticleParagraph>
        <Box pl="16px">
          <VStack gap={2} align="stretch">
            <ArticleParagraph>
              • The right to know what personal information we collect, use,
              disclose, or sell;
            </ArticleParagraph>
            <ArticleParagraph>
              • The right to request deletion of your personal data;
            </ArticleParagraph>
            <ArticleParagraph>
              • The right to correct inaccurate personal information;
            </ArticleParagraph>
            <ArticleParagraph>
              • The right to opt out of the sale or sharing of your personal
              information;
            </ArticleParagraph>
            <ArticleParagraph>
              • The right to limit the use of your sensitive personal
              information.
            </ArticleParagraph>
          </VStack>
        </Box>

        <ArticleParagraph>
          To exercise these rights, you may submit a request by emailing
          legal@rengoai.com. We do not discriminate against individuals who
          exercise their CPRA rights.
        </ArticleParagraph>

        <ArticleHeading text="IX. Notice to Nevada Residents" />
        <ArticleParagraph>
          We do not sell your personal information as defined under Nevada law.
          Nonetheless, if you are a resident of Nevada, you have the right to
          opt-out of the sale of certain personal information to third parties.
          You can exercise this right by emailing us at legal@rengoai.com with
          the subject line "Nevada Do Not Sell Request."
        </ArticleParagraph>

        <ArticleHeading text="X. Notice to Non-US Residents" />
        <ArticleParagraph>
          Our Website is hosted in the United States. Please be aware that your
          information may be transferred to, processed, maintained, and used on
          computers, servers, and systems located outside of your jurisdiction
          where the privacy laws may not be as protective as those in your
          country of origin.
        </ArticleParagraph>

        <ArticleHeading text="XI. Changes to this Privacy Policy" />
        <ArticleParagraph>
          This Privacy Policy is effective as of the date stated at the top of
          this Privacy Policy. We may update this Privacy Policy from time to
          time without notice to you.
        </ArticleParagraph>

        <ArticleHeading text="XII. Contacting Us" />
        <ArticleParagraph>
          If you have any questions about our Privacy Policy, our privacy
          practices, or if you would like to exercise your rights and choices,
          please contact us at: legal@rengoai.com
        </ArticleParagraph>

        <ArticleParagraph>
          Copyright 2025 Rengo AI, Inc. All rights reserved.
        </ArticleParagraph>
      </ArticleFlow>
    </ArticleBody>
  </>
);
