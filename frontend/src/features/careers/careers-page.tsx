import { Page } from "@/components/layout/page";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const CareersPage: React.FC = () => (
  <Page>
    <Box w="full" overflow="auto">
      {/* Hero Section */}
      <Box bg="primary.700" py={20}>
        <Container maxW="6xl" px={8}>
          <VStack gap={8} textAlign="center">
            <VStack gap={4} maxW="4xl">
              <Text
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                color="white"
                lineHeight={1.2}
              >
                Build the future of private data.
              </Text>
              <Box>
                <Link href="#open-roles">
                  <Button
                    variant="outline"
                    size="lg"
                    color="white"
                    borderColor="white"
                    _hover={{ bg: "white", color: "primary.700" }}
                  >
                    View Open Roles →
                  </Button>
                </Link>
              </Box>
            </VStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="6xl" py={16} px={8}>
        <VStack gap={16} align="stretch">
          {/* Our Values Section */}
          <VStack gap={8} align="stretch">
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="gray.900"
              textAlign="center"
            >
              Our Values
            </Text>

            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
              gap={8}
            >
              <GridItem>
                <Box
                  p={6}
                  h="full"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="white"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  transition="all 0.2s"
                >
                  <VStack gap={4} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                      Obsess Over Customers
                    </Text>
                    <Text
                      textStyle="body"
                      fontSize="md"
                      lineHeight="1.7"
                      color="gray.700"
                    >
                      We seek to deeply understand our customers' business and
                      pain points, anticipating their needs, challenging
                      assumptions, and co-creating transformative solutions that
                      secure their long-term success.
                    </Text>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  p={6}
                  h="full"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="white"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  transition="all 0.2s"
                >
                  <VStack gap={4} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                      Build for the Long Game
                    </Text>
                    <Text
                      textStyle="body"
                      fontSize="md"
                      lineHeight="1.7"
                      color="gray.700"
                    >
                      We optimize for enduring value, not just short-term wins.
                      We invest in ideas, systems, and relationships that
                      compound over time.
                    </Text>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  p={6}
                  h="full"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="white"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  transition="all 0.2s"
                >
                  <VStack gap={4} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                      Be Relentlessly Curious
                    </Text>
                    <Text
                      textStyle="body"
                      fontSize="md"
                      lineHeight="1.7"
                      color="gray.700"
                    >
                      We master the fundamentals, and obsess over the edge.
                    </Text>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  p={6}
                  h="full"
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="white"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  transition="all 0.2s"
                >
                  <VStack gap={4} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                      Act Like An Owner
                    </Text>
                    <Text
                      textStyle="body"
                      fontSize="md"
                      lineHeight="1.7"
                      color="gray.700"
                    >
                      We lead from the front; no work is beneath us.
                    </Text>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>

            <Box textAlign="center" py={4}>
              <Text fontSize="lg" fontWeight="medium" color="gray.800">
                ...and we remember, people are our biggest moat.
              </Text>
            </Box>
          </VStack>

          {/* Benefits Section */}
          <VStack gap={8} align="stretch">
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="gray.900"
              textAlign="center"
            >
              Benefits at Rengo AI
            </Text>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={8}
            >
              <GridItem>
                <Box
                  p={6}
                  h="full"
                  bg="gray.50"
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <VStack gap={4} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                      Healthcare
                    </Text>
                    <Text
                      textStyle="body"
                      fontSize="md"
                      lineHeight="1.7"
                      color="gray.700"
                    >
                      Your well-being is critical. We provide both HMO and PPO
                      health plans, as well as dental and vision care.
                    </Text>
                    <Box pl={4}>
                      <VStack gap={1} align="stretch">
                        <Text textStyle="body" fontSize="sm" color="gray.600">
                          • One Medical
                        </Text>
                        <Text textStyle="body" fontSize="sm" color="gray.600">
                          • KindBody
                        </Text>
                        <Text textStyle="body" fontSize="sm" color="gray.600">
                          • Teladoc
                        </Text>
                        <Text textStyle="body" fontSize="sm" color="gray.600">
                          • TalkSpace
                        </Text>
                        <Text textStyle="body" fontSize="sm" color="gray.600">
                          • Health Advocate
                        </Text>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  p={6}
                  h="full"
                  bg="gray.50"
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <VStack gap={4} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                      Office
                    </Text>
                    <Text
                      textStyle="body"
                      fontSize="md"
                      lineHeight="1.7"
                      color="gray.700"
                    >
                      Modern office space with flexibility to work remotely when
                      needed.
                    </Text>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  p={6}
                  h="full"
                  bg="gray.50"
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <VStack gap={4} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                      Unlimited PTO
                    </Text>
                    <Text
                      textStyle="body"
                      fontSize="md"
                      lineHeight="1.7"
                      color="gray.700"
                    >
                      We value rich and balanced lives and offer unlimited PTO /
                      sick leave. We believe in trusting our coworkers and offer
                      a truly flexible and family-friendly work-life balance.
                    </Text>
                  </VStack>
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  p={6}
                  h="full"
                  bg="gray.50"
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <VStack gap={4} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold" color="gray.900">
                      Additional
                    </Text>
                    <Box>
                      <VStack gap={1} align="stretch">
                        <Text textStyle="body" fontSize="md" color="gray.700">
                          • Competitive compensation (base salary and equity)
                        </Text>
                        <Text textStyle="body" fontSize="md" color="gray.700">
                          • Commuter Benefits
                        </Text>
                        <Text textStyle="body" fontSize="md" color="gray.700">
                          • 401K
                        </Text>
                        <Text textStyle="body" fontSize="md" color="gray.700">
                          • HSA & FSA
                        </Text>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </VStack>

          {/* CTA Section */}
          <Box id="open-roles" py={16}>
            <VStack gap={8} textAlign="center">
              <VStack gap={4} maxW="4xl">
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  color="gray.900"
                  lineHeight={1.2}
                >
                  Work at the cutting edge of private data management.
                </Text>
                <Box>
                  <Link href="mailto:careers@getrengo.com">
                    <Button colorScheme="primary" size="lg">
                      View Open Roles →
                    </Button>
                  </Link>
                </Box>
                <Text textStyle="body" fontSize="md" color="gray.600" mt={4}>
                  Interested in joining our team? Send us your resume at{" "}
                  <Link
                    href="mailto:careers@getrengo.com"
                    color="primary.600"
                    textDecoration="underline"
                  >
                    careers@getrengo.com
                  </Link>
                </Text>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  </Page>
);
