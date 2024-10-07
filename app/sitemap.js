export default function sitemap() {
  return [
    {
      url: 'https://apexmun.vercel.app',
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: 'https://apexmun.vercel.app/Register',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://apexmun.vercel.app/Committee',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://apexmun.vercel.app/ReachUs',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]
}