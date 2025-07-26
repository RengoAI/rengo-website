import { Page } from "@/components/layout/page";
import { Prose } from "@/components/ui/prose";
import { Box, Center, Container, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const PrivacyPolicyPage: React.FC = () => (
  <Page>
    <Box w="full" overflow="auto">
      <Container maxW="4xl" py={8} px={6}>
        <VStack gap={6} align="stretch">
          {/* Header */}
          <Center>
            <VStack gap={3} textAlign="center" maxW="2xl">
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                color="gray.900"
                lineHeight={1.2}
              >
                Privacy Policy
              </Text>
              <Text fontSize="md" color="gray.600">
                Effective: January 20, 2025
              </Text>
            </VStack>
          </Center>

          {/* Privacy Policy Content */}
          <Box maxW="none" w="full">
            <Prose maxW="none" fontSize="sm" lineHeight="1.6" color="gray.700">
              <p>
                We at Rengo AI, Inc. ("Rengo AI," "we," "us," or "our") know
                that data privacy is very important to you. We have created this
                privacy policy (the "Privacy Policy") to describe how we collect
                and process information from and about you via our website at
                www.getrengo.com (the "Website") and when you otherwise interact
                with us (collectively, the "Services").
              </p>

              <p>
                By accepting this Privacy Policy, accessing or using the
                Services, or otherwise manifesting your assent to this Privacy
                Policy, you agree to be bound by this Privacy Policy. If you do
                not agree to (or cannot comply with) all of the terms of this
                Privacy Policy you may not access or use the Services.
              </p>

              <p>
                Capitalized terms not defined in this Privacy Policy shall have
                the meaning set forth in our Terms of Use.
              </p>

              <h2>I. The Information We Collect</h2>
              <p>
                In the course of providing the Services, we may collect or
                receive the following types of information about you, which may
                include personal information.
              </p>

              <h3>1. Contact Information</h3>
              <p>
                We collect contact information through our Services, which
                typically includes your name, email address, phone number, and
                any information you provide in messages to us ("Contact
                Information"). We use Contact Information for purposes such as
                providing you with information about the Services, responding to
                your inquiries, sending you email alerts (including marketing
                emails), or providing you with the Services.
              </p>

              <h3>
                2. Information obtained automatically from your online activity
              </h3>
              <p>
                When visitors ("Visitors") access or use our Services, we may
                automatically collect certain information sent to us by the
                person's computer, mobile device, tablet, or any other device.
                For Visitors who are candidates for employment with us, please
                review the Workforce Privacy Notice attached hereto as Appendix
                1 for more information on how we handle your data.
              </p>

              <p>
                We automatically receive standard technical information when you
                access or use the Services through use of browser cookies,
                pixels, web server logs, web beacons, and similar technologies
                (collectively, "Tracking Technologies"). The information
                collected enable us to personalize your experience with the
                Services, understand how you use them, maintain a persistent
                session, and improve and further develop our Services.
              </p>

              <p>
                We may also automatically collect other information when you
                access or use the Services such as (i) information about the
                device used; (ii) IP addresses; (iii) browser type and language;
                (iv) referring and exit pages and URLs; (v) date and time of
                access; (vi) the content viewed; (vii) the amount of time spent
                on particular pages; (viii) what features of the Services are
                used or visited; (ix) details of any purchases; (x) click stream
                information; and (xi) precise geolocation data.
              </p>

              <h3>3. Geolocation information</h3>
              <p>
                To provide access to the Services while you are using an
                electronic device, we automatically collect geolocation
                information from your mobile device, your wireless carrier, or
                certain third-party service providers ("Geolocation
                Information"). You may control the collection of Geolocation
                Information through the user settings on your device.
              </p>

              <h3>4. Information obtained from other sources</h3>
              <p>
                We collect personal information from Visitors when they access
                or use our Services. We may also collect or receive your
                personal information from third parties or when you visit, use,
                or access the Services from third-party websites. This includes
                any social media pages we may have on third-party services such
                as Twitter and LinkedIn.
              </p>

              <h3>
                5. Information obtained from third-party analytics services
              </h3>
              <p>
                We use third-party analytics services (such as Google Analytics)
                to evaluate your use of the Services, compile reports on
                activity, collect demographic data, analyze performance metrics,
                collect and evaluate other information relating to the Services
                and mobile and internet usage.
              </p>

              <p>
                For Google Analytics, please visit:{" "}
                <a
                  href="https://support.google.com/analytics/answer/6004245?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://support.google.com/analytics/answer/6004245?hl=en
                </a>{" "}
                and{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>
              </p>

              <h2>II. Information Use and Sharing</h2>
              <p>
                We use and share your personal information as set forth below:
              </p>
              <ul>
                <li>To monitor, support, analyze, and improve the Services;</li>
                <li>To communicate with you regarding the Services;</li>
                <li>
                  To fulfill your requests for information regarding new or
                  improved products and services;
                </li>
                <li>To conduct marketing and advertising programs;</li>
                <li>
                  To engage research, project planning, troubleshooting
                  problems, and detecting and protecting against error, fraud,
                  or other criminal activity;
                </li>
                <li>
                  To protect the safety and security of our Services and
                  business;
                </li>
                <li>
                  To third-party contractors and service providers that provide
                  services to us;
                </li>
                <li>To fulfill our legal and regulatory requirements;</li>
                <li>To comply with applicable law;</li>
                <li>
                  To assess or complete a corporate sale, merger,
                  reorganization, sale of assets, dissolution, investment, or
                  similar corporate event;
                </li>
                <li>Otherwise, with your consent.</li>
              </ul>

              <h2>III. User Access and Choice</h2>
              <p>
                If the personal information on file for you changes, or if you
                no longer desire our Services, you may correct or update it by
                contacting us under Section XII ("Contacting Us") of this
                Privacy Policy.
              </p>

              <p>
                You may manage your receipt of marketing and non-transactional
                communications by clicking on the "unsubscribe" hyperlink
                located on the bottom of any of our marketing emails.
              </p>

              <h2>IV. External Websites and Third Parties</h2>
              <p>
                Unless explicitly stated otherwise, our Privacy Policy addresses
                only our use and disclosure of information we collect from
                and/or about you in your interactions with Rengo AI. If you
                choose to disclose information to third parties, the use and
                disclosure restrictions contained in this Privacy Policy will
                not apply.
              </p>

              <h2>V. Security</h2>
              <p>
                We follow commercially reasonable and generally accepted
                standards to protect the personal information submitted to us,
                both during transmission and once we receive it. Please
                understand, however, that no method of transmission over the
                internet, or method of electronic storage, is 100% secure.
              </p>

              <h2>VI. Children's Privacy</h2>
              <p>
                Our Services are only available to individuals aged 18 or older,
                and we do not knowingly collect personal information from any
                person under the age of 18. If an individual under the age of 18
                has provided us with Personal Information, a parent or guardian
                of that child may contact us and request that such information
                be deleted.
              </p>

              <h2>VII. Do Not Track</h2>
              <p>
                As discussed above, third parties such as advertising networks
                and analytics providers may collect information about your
                online activities over time and across different websites when
                you access or use the Services. At this time, we do not monitor,
                recognize, or honor any opt-out or do not track mechanisms.
              </p>

              <h2>VIII. Notice to California Residents</h2>
              <p>
                Under California's "Shine the Light" law (Civil Code Section §
                1798.83), residents of California have the right to obtain
                certain information about the types of personal information that
                companies with whom they have an established business
                relationship have shared with third parties for direct marketing
                purposes. If you wish to submit a request pursuant to Section
                1798.83, please contact us via email at legal@getrengo.com.
              </p>

              <p>
                Additionally, as a California resident, you have certain rights
                under the California Privacy Rights Act (CPRA). These include:
              </p>
              <ul>
                <li>
                  The right to know what personal information we collect, use,
                  disclose, or sell;
                </li>
                <li>The right to request deletion of your personal data;</li>
                <li>The right to correct inaccurate personal information;</li>
                <li>
                  The right to opt out of the sale or sharing of your personal
                  information;
                </li>
                <li>
                  The right to limit the use of your sensitive personal
                  information.
                </li>
              </ul>

              <p>
                To exercise these rights, you may submit a request by emailing
                legal@getrengo.com. We do not discriminate against individuals
                who exercise their CPRA rights.
              </p>

              <h2>IX. Notice to Nevada Residents</h2>
              <p>
                We do not sell your personal information as defined under Nevada
                law. Nonetheless, if you are a resident of Nevada, you have the
                right to opt-out of the sale of certain personal information to
                third parties. You can exercise this right by emailing us at
                legal@getrengo.com with the subject line "Nevada Do Not Sell
                Request."
              </p>

              <h2>X. Notice to Non-US Residents</h2>
              <p>
                Our Website is hosted in the United States. Please be aware that
                your information may be transferred to, processed, maintained,
                and used on computers, servers, and systems located outside of
                your jurisdiction where the privacy laws may not be as
                protective as those in your country of origin.
              </p>

              <h2>XI. Changes to this Privacy Policy</h2>
              <p>
                This Privacy Policy is effective as of the date stated at the
                top of this Privacy Policy. We may update this Privacy Policy
                from time to time without notice to you.
              </p>

              <h2>XII. Contacting Us</h2>
              <p>
                If you have any questions about our Privacy Policy, our privacy
                practices, or if you would like to exercise your rights and
                choices, please contact us at: legal@getrengo.com
              </p>

              <p>
                <strong>
                  Copyright 2025 Rengo AI, Inc. All rights reserved.
                </strong>
              </p>
            </Prose>
          </Box>
        </VStack>
      </Container>
    </Box>
  </Page>
);
