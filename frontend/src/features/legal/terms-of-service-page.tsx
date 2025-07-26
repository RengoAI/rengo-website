import { Page } from "@/components/layout/page";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const TermsOfServicePage: React.FC = () => (
  <Page>
    <Box w="full">
      <Container maxW="4xl" py={16} px={8}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack gap={4} textAlign="center" maxW="2xl" mx="auto">
            <Text
              textStyle="h1"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="gray.900"
              lineHeight={1.2}
            >
              Terms of Use
            </Text>
            <Text textStyle="body" fontSize="lg" color="gray.600">
              Effective: July 24, 2025
            </Text>
          </VStack>

          {/* Terms Content */}
          <VStack gap={6} align="stretch" maxW="none" w="full">
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI, Inc. ("Rengo AI," "we," "us," or "our") welcomes you. We
              invite you to access our website, available at www.getrengo.com
              (the "Website"), subject to the following Terms of Use (the "Terms
              of Use") and our Privacy Policy ("Privacy Policy") which is
              incorporated herein and made a part hereof by this reference
              (collectively, the "Agreement"). The Agreement may be updated by
              us from time to time without notice to you.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              By browsing, accessing, or using the Website, you acknowledge that
              you have read, understood, and agree to be legally bound by the
              Agreement.{" "}
              <Text as="span" fontWeight="bold">
                IF YOU DO NOT AGREE TO ANY OF THE TERMS OF THE AGREEMENT, THEN
                PLEASE DO NOT ACCESS OR USE THE WEBSITE.
              </Text>
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              <Text as="span" fontWeight="bold">
                THE SECTIONS BELOW TITLED "BINDING ARBITRATION" AND "CLASS
                ACTION WAIVER" CONTAIN A BINDING ARBITRATION AGREEMENT AND CLASS
                ACTION WAIVER. THEY AFFECT YOUR LEGAL RIGHTS. PLEASE READ THEM.
              </Text>
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              We reserve the right, at our sole discretion, to modify,
              discontinue, or terminate the availability of the Website, or to
              modify the Agreement, at any time and without prior notice. If we
              modify the Agreement, we will post the modification on the
              Website. By continuing to access or use the Website after we have
              posted a modification on the Website or have provided you with
              notice of a modification, you are indicating that you agree to be
              bound by the modified Agreement. If the modified Agreement is not
              acceptable to you, your only recourse is to cease using the
              Website.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              We provide access to and use of our proprietary alternative
              investment management platform (the "Platform") on a subscription
              basis, subject to the terms and conditions of that certain
              agreement between subscribers ("Subscribers") and Rengo AI (the
              "Master Services Agreement"). If there is a conflict between these
              Terms of Use and terms and conditions of the Master Services
              Agreement, the terms and conditions of the Master Services
              Agreement will take precedence with respect to the Subscriber's
              use of or access to the Platform services.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              If you accept or agree to the Agreement on behalf of a company or
              other legal entity, you represent and warrant that you have the
              authority to bind that company or other legal entity to the
              Agreement and, in such event, "you" and "your" will refer and
              apply to that company or other legal entity.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Capitalized terms not defined in these Terms of Use shall have the
              meaning set forth in our Privacy Policy.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              1. GUIDELINES
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              By using the Website, you agree to comply with these user
              guidelines (the "Guidelines") and you agree that:
            </Text>

            <Box pl={4}>
              <VStack gap={2} align="stretch">
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will comply with all applicable laws in your use of the
                  Website and will not use the Website for any unlawful purpose;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not access or use the Website to collect any market
                  research for a competing business;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not impersonate any person or entity or falsely
                  state or otherwise misrepresent your affiliation with a person
                  or entity;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not interfere with, or attempt to interrupt the
                  proper operation of, the Website through the use of any virus,
                  device, information collection or transmission mechanism,
                  software or routine, or access or attempt to gain access to
                  any Content, data, files, or passwords related to the Website
                  through hacking, password or data mining, or any other means;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not decompile, reverse engineer, or disassemble any
                  software or other products or processes accessible through the
                  Website;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not cover, obscure, block, or in any way interfere
                  with any advertisements and/or safety features on the Website;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not use any robot, spider, scraper, or other
                  automated means to access the Website for any purpose without
                  our express written permission;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not take any action that imposes or may impose (in
                  our sole discretion) an unreasonable or disproportionately
                  large load on our technical infrastructure;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not allow anyone other than your employees and
                  authorized representatives to access and use your account;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not resell, distribute, or sublicense the Website
                  or use it for the benefit of anyone other than you or your
                  business;
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not remove or modify any proprietary markings or
                  restrictive legends placed on the Website; and
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • You will not introduce, post, or upload to the Website any
                  Harmful Code.
                </Text>
              </VStack>
            </Box>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              As used herein, "Harmful Code" means computer code, programs, or
              programming devices that are intentionally designed to disrupt,
              modify, access, delete, damage, deactivate, disable, harm, or
              otherwise impede in any manner, including aesthetic disruptions or
              distortions, the operation of the Website, or any other associated
              software, firmware, hardware, computer system, or network
              (including, without limitation, "Trojan horses," "viruses,"
              "worms," "time bombs," "time locks," "devices," "traps," "access
              codes," or "drop dead" or "trap door" devices) or any other
              harmful, malicious, or hidden procedures, routines or mechanisms
              that would cause the Website to cease functioning or to damage or
              corrupt data, storage media, programs, equipment, or
              communications, or otherwise interfere with the operations of the
              Website.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI reserves the right, at any time, to modify, suspend, or
              discontinue the Website or any part thereof with or without
              notice. You agree that we will not be liable to you or to any
              third party for any modification, suspension, or discontinuance of
              Website or any part thereof. You are free to stop using the
              Website at any time.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              2. INTELLECTUAL PROPERTY
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              The Website is protected by copyright, trademark, and other laws
              of the United States and foreign countries. Except as expressly
              provided in these Terms of Use, Rengo AI and our licensors
              exclusively own all right, title, and interest in and to the
              Website, including all associated intellectual property rights.
              You shall not remove, alter, or obscure any copyright, trademark,
              service mark, or other proprietary rights notices incorporated in
              or accompanying the Website.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              You may view all content on the Website (the "Content") solely for
              your own personal use and not for any commercial use. We, and our
              licensors, retain all right, title, and interest, including all
              intellectual property rights, in and to the Content. You may not
              sell, transfer, assign, license, sublicense, or modify the Content
              or reproduce, display, publicly perform, make a derivative version
              of, distribute, or otherwise use the Content in any way for any
              public or commercial purpose. The use or posting of the Content on
              any other website, social media page, or in a networked computer
              environment for any purpose is expressly prohibited.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              If you violate any part of this Agreement, your permission to
              access and/or use the Content automatically terminates and you
              must immediately destroy any copies you have made of the Content.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              The trademarks, service marks, and logos of Rengo AI (the "Rengo
              AI Trademarks") used and displayed on the Website are registered
              and unregistered trademarks or service marks of Rengo AI. Other
              company, product, and service names located on the Website may be
              trademarks or service marks owned by others (the "Third-Party
              Trademarks," and, collectively with Rengo AI Trademarks, the
              "Trademarks"). Nothing on the Website should be construed as
              granting, by implication, estoppel, or otherwise, any license or
              right to use the Trademarks, without our prior written permission
              specific for each such use. Use of the Trademarks as part of a
              link to or from any website is prohibited unless establishment of
              such a link is approved in advance by us in writing. All goodwill
              generated from the use of Rengo AI Trademarks inures to our
              benefit.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              3. NO WARRANTIES; LIMITATION OF LIABILITY
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              <Text as="span" fontWeight="bold">
                YOU ACKNOWLEDGE THAT THE WEBSITE, THE CONTENT AND ANY OTHER DATA
                OR INFORMATION PROVIDED THROUGH THE WEBSITE MAY CONTAIN BUGS,
                ERRORS, AND OTHER PROBLEMS THAT COULD CAUSE SYSTEM FAILURES.
                RENGO AI DOES NOT REPRESENT OR WARRANT THAT THE WEBSITE OR THE
                CONTENT AND ANY OTHER DATA OR INFORMATION PROVIDED THROUGH THE
                WEBSITE WILL BE ACCURATE OR COMPLETE. CONSEQUENTLY, THE WEBSITE
                AND THE CONTENT AND ANY OTHER DATA OR INFORMATION PROVIDED
                THROUGH THE WEBSITE ARE PROVIDED "AS IS" AND "AS AVAILABLE"
                WITHOUT ANY WARRANTIES OF ANY KIND, INCLUDING THAT THE WEBSITE
                WILL OPERATE ERROR-FREE OR THAT THE WEBSITE OR ITS SERVER, OR
                THE CONTENT ARE FREE OF COMPUTER VIRUSES OR SIMILAR
                CONTAMINATION OR DESTRUCTIVE FEATURES.
              </Text>
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              <Text as="span" fontWeight="bold">
                WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
                WARRANTIES OF TITLE, MERCHANTABILITY, NON-INFRINGEMENT OF THIRD
                PARTIES' RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE AND ANY
                WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF
                PERFORMANCE, OR USAGE OF TRADE. IN CONNECTION WITH ANY WARRANTY,
                CONTRACT, OR COMMON LAW TORT CLAIMS WE AND OUR LICENSORS SHALL
                NOT BE LIABLE FOR ANY INCIDENTAL OR CONSEQUENTIAL DAMAGES, LOST
                PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS
                INTERRUPTION RESULTING FROM THE USE OR INABILITY TO ACCESS AND
                USE THE WEBSITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY
                OF SUCH DAMAGES.
              </Text>
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              4. FEEDBACK
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Although we encourage you to e-mail us, we do not want you to, and
              you should not, e-mail us any content that contains confidential
              information. With respect to all e-mails and communications you
              send to us, including, but not limited to, feedback, questions,
              comments, suggestions, and the like, we shall be free to use any
              ideas, concepts, know-how, or techniques contained in your
              communications for any purpose whatsoever, including but not
              limited to, the development, production, and marketing of products
              and services that incorporate such information without
              compensation or attribution to you.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              5. EXTERNAL SITES
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              The Website contain links to third-party websites ("External
              Sites"). These links are provided solely as a convenience to you
              and not as an endorsement by us of the content on such External
              Sites. The content of such External Sites is developed and
              provided by others. You should contact the site administrator or
              webmaster for those External Sites if you have any concerns
              regarding such links or any content located on such External
              Sites. We are not responsible for the content of any linked
              External Sites and do not make any representations regarding the
              content or accuracy of materials on such External Sites. You
              should take precautions when downloading files from all websites
              to protect your computer from viruses and other destructive
              programs. If you decide to access linked External Sites, you do so
              at your own risk.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              6. INDEMNIFICATION
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              You agree to defend, indemnify, and hold us and our officers,
              directors, employees, successors, licensees and assigns harmless
              from and against any claims, actions, or demands, including,
              without limitation, reasonable legal and accounting fees, arising
              or resulting from: (i) your breach of this Agreement; (ii) your
              misuse of the Content, or the Website; and/or (iii) your violation
              of any third-party right, including without limitation any
              copyright, trademark, property, or privacy right.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              7. COMPLIANCE WITH APPLICABLE LAWS
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              The Website is based in the United States. We make no claims
              concerning whether the Website may be viewed or be appropriate for
              use outside of the United States. If you access the Website from
              outside of the United States, you do so at your own risk. Whether
              inside or outside of the United States, you are solely responsible
              for ensuring compliance with the laws of your specific
              jurisdiction.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              8. CHANGES TO THESE TERMS
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              These Terms of Use are effective as of the date stated at the top
              of the Terms of Use. We may change these Terms of Use from time to
              time. Any such changes will be posted on the Website. By accessing
              the Website after we make any such changes to the Terms of Use,
              you are deemed to have accepted such changes. Please refer back to
              these Terms of Use on a regular basis.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              9. BINDING ARBITRATION
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              In the event of a dispute arising under or relating to this
              Agreement or any other products or services provided by us (each,
              a "Dispute"), such dispute will be finally and exclusively
              resolved by binding arbitration governed by the Federal
              Arbitration Act ("FAA").{" "}
              <Text as="span" fontWeight="bold">
                NEITHER PARTY SHALL HAVE THE RIGHT TO LITIGATE SUCH CLAIM IN
                COURT OR TO HAVE A JURY TRIAL
              </Text>
              , except either party may bring its claim in its local small
              claims court, if permitted by that small claims court rules and if
              within such court's jurisdiction.{" "}
              <Text as="span" fontWeight="bold">
                ARBITRATION IS DIFFERENT FROM COURT, AND DISCOVERY AND APPEAL
                RIGHTS MAY ALSO BE LIMITED IN ARBITRATION.
              </Text>{" "}
              All disputes will be resolved before a neutral arbitrator selected
              jointly by the parties, whose decision will be final, except for a
              limited right of appeal under the FAA.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              10. CLASS ACTION WAIVER
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              You agree that any arbitration or proceeding shall be limited to
              the Dispute between us and you individually. To the full extent
              permitted by law, (i) no arbitration or proceeding shall be joined
              with any other; (ii) there is no right or authority for any
              Dispute to be arbitrated or resolved on a class action-basis or to
              utilize class action procedures; and (iii) there is no right or
              authority for any Dispute to be brought in a purported
              representative capacity on behalf of the general public or any
              other persons.{" "}
              <Text as="span" fontWeight="bold">
                YOU AGREE THAT YOU MAY BRING CLAIMS AGAINST US ONLY IN YOUR
                INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN
                ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
              </Text>
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              11. EQUITABLE RELIEF
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              You acknowledge and agree that in the event of a breach or
              threatened violation of our intellectual property rights and
              confidential and proprietary information by you, we will suffer
              irreparable harm and will therefore be entitled to injunctive
              relief to enforce this Agreement. We may, without waiving any
              other remedies under this Agreement, seek from any court having
              jurisdiction any interim, equitable, provisional, or injunctive
              relief that is necessary to protect our rights and property
              pending the outcome of the arbitration referenced above.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              12. CONTROLLING LAW; EXCLUSIVE FORUM
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              The Agreement and any action related thereto will be governed by
              the laws of the State of Delaware, without regard to its conflict
              of laws provisions. You hereby irrevocably and unconditionally
              consent to the personal and subject matter jurisdiction of the
              federal and state courts in the State of Delaware for purposes of
              any such action by us.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              13. MISCELLANEOUS
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              If these Terms of Use are modified or Agreement is terminated in
              accordance with the Agreement, the following provisions of this
              Agreement shall remain in full force and effect: "Intellectual
              Property," "Feedback," "No Warranties; Limitation of Liability,"
              "Indemnification," "Compliance with Applicable Laws," "Changes to
              these Terms," "Controlling Law; Exclusive Forum," and
              "Miscellaneous."
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Our failure to act on or enforce any provision of the Agreement
              shall not be construed as a waiver of that provision or any other
              provision in this Agreement. No waiver shall be effective against
              us unless made in writing, and no such waiver shall be construed
              as a waiver in any other or subsequent instance. Except as
              expressly agreed by us and you in writing, the Agreement
              constitutes the entire agreement between you and us with respect
              to the subject matter, and supersedes all previous or
              contemporaneous agreements, whether written or oral, between the
              parties with respect to the subject matter.
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              <Text as="span" fontWeight="bold">
                Contact Information:
              </Text>
              <br />
              If you have any questions about these Terms of Use, please contact
              us at: legal@getrengo.com
            </Text>

            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
              fontWeight="bold"
              mt={6}
            >
              Copyright 2025 Rengo AI, Inc. All rights reserved.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  </Page>
);
