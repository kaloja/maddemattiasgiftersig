module.exports = function(eleventyConfig) {

  // Folders and files to pass through to site
  // ---------------------------------------------------------

  eleventyConfig.addPassthroughCopy('assets/images');
  eleventyConfig.addPassthroughCopy('assets/scripts/bundle.js');
  eleventyConfig.addPassthroughCopy('assets/styles/bundle.css');

  // Directory setup
  // ---------------------------------------------------------

  return {
    dir: {
      includes: 'includes',
      data: 'data',
      output: 'site'
    }
  }
}
