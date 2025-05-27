module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });
  
  // Add a global data value for GA4 Measurement ID, configurable via environment variable or fallback
  eleventyConfig.addGlobalData("ga4_id", process.env.GA4_ID || "G-YNLNEHLGQS");

  // Add a custom jsonify filter
  eleventyConfig.addFilter("jsonify", function(value) {
    return JSON.stringify(value);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
