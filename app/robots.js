export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "*",
            disallow: ["/Payment-Success/*", "/Payment-Failed/*"],
        },
        sitemap: 'https://apexmun.vercel.app/sitemap.xml',
    }
}