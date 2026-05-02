module.exports = {
  siteUrl:process.env.NEXTAUTH_URL,
  generateRobotsTxt: true,
   robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXTAUTH_URL}/sitemap.xml`,
    ],
  },
};