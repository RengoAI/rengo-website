import { Page } from "@/components/layout/page";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const SecurityPage: React.FC = () => (
  <Page>
    <Box w="full" overflow="auto">
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
              Security at Rengo
            </Text>
            <Text textStyle="body" fontSize="lg" color="gray.600">
              Effective: July 24, 2025
            </Text>
          </VStack>

          {/* Security Content */}
          <VStack gap={6} align="stretch" maxW="none" w="full">
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI, Inc.'s security & compliance principles guide how we
              deliver our products and services, enabling people to simply and
              securely access the digital world of alternative investment
              management.
            </Text>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              Secure Personnel
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI, Inc. takes the security of its data and that of its
              clients and customers seriously and ensures that only vetted
              personnel are given access to their resources.
            </Text>

            <Box pl={4}>
              <VStack gap={2} align="stretch">
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • All Rengo AI, Inc. contractors and employees undergo
                  background checks prior to being engaged or employed by us in
                  accordance with local laws and industry best practices.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Confidentiality or other types of Non-Disclosure Agreements
                  (NDAs) are signed by all employees, contractors, and others
                  who have a need to access sensitive or internal information.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • We embed the culture of security into our business by
                  conducting employee security training & testing using current
                  and emerging techniques and attack vectors.
                </Text>
              </VStack>
            </Box>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              Secure Development
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              All development projects at Rengo AI, Inc., including on-premises
              software products, support services, and our own alternative
              investment management platform follow secure development lifecycle
              principles.
            </Text>

            <Box pl={4}>
              <VStack gap={2} align="stretch">
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • All development of new products, tools, and services, and
                  major changes to existing ones, undergo a design review to
                  ensure security requirements are incorporated into proposed
                  development.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • All team members that are regularly involved in any system
                  development undergo annual secure development training in
                  coding or scripting languages that they work with as well as
                  any other relevant training.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Software development is conducted in line with OWASP Top 10
                  recommendations for web application security.
                </Text>
              </VStack>
            </Box>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              Secure Testing
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI, Inc. deploys third party penetration testing and
              vulnerability scanning of all production and Internet facing
              systems on a regular basis.
            </Text>

            <Box pl={4}>
              <VStack gap={2} align="stretch">
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • All new systems and services are scanned prior to being
                  deployed to production.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • We perform penetration testing both by internal security
                  engineers and external penetration testing companies on new
                  systems and products or major changes to existing systems,
                  services, and products to ensure a comprehensive and
                  real-world view of our products & environment from multiple
                  perspectives.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • We perform static and dynamic software application security
                  testing of all code, including open source libraries, as part
                  of our software development process.
                </Text>
              </VStack>
            </Box>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              Cloud Security
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI, Inc. Cloud provides maximum security with complete
              customer isolation in a modern, multi-tenant cloud architecture.
              Rengo AI, Inc. Cloud leverages the native physical and network
              security features of the cloud service, and relies on the
              providers to maintain the infrastructure, services, and physical
              access policies and procedures.
            </Text>

            <Box pl={4}>
              <VStack gap={2} align="stretch">
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • All customer cloud environments and data are isolated using
                  Rengo AI, Inc.'s proprietary isolation approach. Each customer
                  environment is stored within a dedicated trust zone to prevent
                  any accidental or malicious co-mingling.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • All data is also encrypted at rest and in transmission to
                  prevent any unauthorized access and prevent data breaches. Our
                  entire platform is also continuously monitored by dedicated,
                  highly trained Rengo AI, Inc. experts.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • We separate each customer's data and our own, utilizing
                  unique encryption keys to ensure data is protected and
                  isolated.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Client's data protection complies with SOC 2 standards to
                  encrypt data in transit and at rest, ensuring customer and
                  company data and sensitive information is protected at all
                  times.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • We implement role-based access controls and the principles
                  of least privileged access, and review revoke access as
                  needed.
                </Text>
              </VStack>
            </Box>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              Data Protection & Privacy
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI, Inc. is committed to protecting the privacy and security
              of our users' sensitive financial and investment data through
              comprehensive data protection measures.
            </Text>

            <Box pl={4}>
              <VStack gap={2} align="stretch">
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • All sensitive data is encrypted using industry-standard
                  encryption algorithms both at rest and in transit.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • We maintain strict data retention policies and secure data
                  disposal procedures to ensure information is only kept as long
                  as necessary and is securely destroyed when no longer needed.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Access to customer data is restricted to authorized
                  personnel only and is logged and monitored for security
                  purposes.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • We comply with applicable data protection regulations
                  including GDPR, CCPA, and other relevant privacy laws.
                </Text>
              </VStack>
            </Box>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              Compliance & Certifications
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI, Inc. is committed to providing secure products and
              services to safely and easily manage alternative investment
              portfolios. Our external certifications provide independent
              assurance of Rengo AI, Inc.'s dedication to protecting our
              customers by regularly assessing and validating the protections
              and effective security practices Rengo AI, Inc. has in place.
            </Text>

            <Box pl={4}>
              <VStack gap={2} align="stretch">
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Regular third-party security audits and penetration testing
                  to validate our security posture.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Compliance with financial industry regulations and standards
                  applicable to investment management platforms.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Ongoing monitoring and assessment of security controls to
                  ensure continued effectiveness and improvement.
                </Text>
              </VStack>
            </Box>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              Incident Response
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              Rengo AI, Inc. maintains a comprehensive incident response plan to
              quickly identify, contain, and remediate security incidents while
              minimizing impact to our customers and stakeholders.
            </Text>

            <Box pl={4}>
              <VStack gap={2} align="stretch">
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • 24/7 security monitoring and alerting systems to detect
                  potential security incidents.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Dedicated incident response team trained to handle security
                  events efficiently and effectively.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Clear communication protocols to keep affected customers
                  informed during security incidents.
                </Text>
                <Text
                  textStyle="body"
                  fontSize="md"
                  lineHeight="1.7"
                  color="gray.700"
                >
                  • Regular testing and updating of incident response procedures
                  to ensure effectiveness.
                </Text>
              </VStack>
            </Box>

            <Text
              textStyle="h2"
              fontSize="2xl"
              fontWeight="semibold"
              color="gray.900"
              mt={6}
            >
              Contact Us
            </Text>
            <Text
              textStyle="body"
              fontSize="md"
              lineHeight="1.7"
              color="gray.700"
            >
              If you have any questions about our security practices or would
              like to report a security concern, please contact us at:
              security@getrengo.com
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
