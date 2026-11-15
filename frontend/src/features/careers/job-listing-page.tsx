import { rootRoute } from "@/app/app-routes";
import {
  ArticleBody,
  ArticleFlow,
  ArticleHeader,
  ArticleHeading,
  ArticleList,
  ArticleParagraph,
} from "@/components/site/article";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SolidCta } from "@/components/site/solid-cta";
import {
  getOpenRoleById,
  roleMailto,
  type JobContentBlock,
} from "@/features/careers/open-roles";
import { useRequiredStringParams } from "@/shared/hooks/use-required-string-params";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router";

const JobBlock: React.FC<{ block: JobContentBlock }> = ({ block }) =>
  block.type === "paragraph" ? (
    <ArticleParagraph>{block.text}</ArticleParagraph>
  ) : (
    <ArticleList items={block.items} />
  );

/**
 * One open role, in the site's long-read layout like a blog post: the
 * header on the colour wash (back to careers, the title, and the
 * group and location as its properties), then the sections in
 * one reading column, ending on the apply button.
 */
export const JobListingPage: React.FC = () => {
  const { roleId } = useRequiredStringParams();
  const role = getOpenRoleById(roleId);

  if (!role) {
    return <Navigate to={rootRoute({}).careers({}).$} replace />;
  }

  return (
    <Box bg="site.bg.page">
      <SiteNav edge />

      <Box as="main" id="main">
        <Box as="article">
          <ArticleHeader
            back={{ to: rootRoute({}).careers({}).$, label: "Careers" }}
            title={role.title}
            properties={[role.group, role.location]}
          />

          <ArticleBody
            contents={role.sections.map((section) => section.heading)}
          >
            <ArticleFlow>
              {role.sections.map((section, s) => (
                <React.Fragment key={section.heading}>
                  {/* The first heading sits at the top of the column. */}
                  <Box mt={s === 0 ? "-28px" : 0}>
                    <ArticleHeading text={section.heading} />
                  </Box>
                  {section.blocks.map((block, i) => (
                    <JobBlock key={`${section.heading}-${i}`} block={block} />
                  ))}
                </React.Fragment>
              ))}
            </ArticleFlow>

            {/* The site's one button, as in the hero. */}
            <Box mt={{ base: "40px", md: "48px" }}>
              <SolidCta
                href={roleMailto(role.title)}
                h="27px"
                labelProps={{ gap: "8px" }}
              >
                Apply for this job
              </SolidCta>
            </Box>
          </ArticleBody>
        </Box>
      </Box>

      <SiteFooter />
    </Box>
  );
};
