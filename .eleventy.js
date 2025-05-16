module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Add a global data value for GA4 Measurement ID, configurable via environment variable or fallback
  eleventyConfig.addGlobalData("ga4_id", process.env.GA4_ID || "G-EMPRP3KC10");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
