import yaml from "js-yaml";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import xmlFiltersPlugin from "eleventy-xml-plugin";
import pluginRss from "@11ty/eleventy-plugin-rss";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function(eleventyConfig) {
  // 11ty watch targets
  eleventyConfig.addWatchTarget("./src/_scss/");
  // 11ty YAML support
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  // 11ty Collections
  eleventyConfig.addCollection("services", (collection) => {
    return collection.getFilteredByGlob("./src/_services/*.md");
  });
  eleventyConfig.addCollection("projects", (collection) => {
    return collection.getFilteredByGlob("./src/_projects/*.md");
  });
  eleventyConfig.addCollection("team", (collection) => {
    return collection.getFilteredByGlob("./src/_team/*.md");
  });

  // Layout Aliases
  eleventyConfig.addLayoutAlias("basic", "basic.liquid");
  eleventyConfig.addLayoutAlias("contact", "contact.liquid");
  eleventyConfig.addLayoutAlias("default", "default.liquid");
  eleventyConfig.addLayoutAlias("home", "home.liquid");
  eleventyConfig.addLayoutAlias("list", "list.liquid");
  eleventyConfig.addLayoutAlias("project", "project.liquid");
  eleventyConfig.addLayoutAlias("service", "service.liquid");
  eleventyConfig.addLayoutAlias("team", "team.liquid");

  // Custom Filters
  eleventyConfig.addFilter("sortByWeight", sortByWeight);
  eleventyConfig.addFilter("sortByTitle", sortByTitle);
  eleventyConfig.addFilter("jsonify", function(value) {
    return JSON.stringify(value);
  });
  eleventyConfig.addFilter("excludeFromSitemap", function(pages) {
    return pages.filter((page) => !page.data.excludeFromSitemap);
  });

  // Markdownify filter (render markdown strings in templates)
  const md = markdownIt({ html: true });
  eleventyConfig.addLiquidFilter("markdownify", function(value) {
    if (!value) return "";
    return md.render(value);
  });

  // GA4 global data from env
  eleventyConfig.addGlobalData("ga4_id", process.env.GA4_ID || "G-YNLNEHLGQS");

  // General config
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "/robots.txt" });
  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
    dynamicPartials: true,
    strictFilters: true,
  });
  eleventyConfig.setQuietMode(true);
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAttrs));
  eleventyConfig.addPlugin(syntaxHighlight);

  // RSS
  eleventyConfig.addPlugin(xmlFiltersPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addLiquidFilter("getNewestCollectionItemDate", pluginRss.getNewestCollectionItemDate);
  eleventyConfig.addLiquidFilter("absoluteUrl", pluginRss.absoluteUrl);
  eleventyConfig.addLiquidFilter("convertHtmlToAbsoluteUrls", pluginRss.convertHtmlToAbsoluteUrls);
  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
  eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);

  return {
    pathPrefix: "/",
    addPassthroughCopy: true,
    markdownTemplateEngine: "liquid",
    templateFormats: ["html", "md", "liquid"],
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      projects: "_projects",
      services: "_services",
      team: "_team"
    },
  };
};

function sortByWeight(values) {
  return values.sort((a, b) => {
    if (!a.data.weight) {
      return 1;
    }
    if (!b.data.weight) {
      return -1;
    }
    if (a.data.weight === b.data.weight) {
      return 0;
    }
    return a.data.weight < b.data.weight ? -1 : 1;
  });
}

function sortByTitle(values) {
    return values.slice().sort((a, b) => a.data.title.localeCompare(b.data.title));
}
