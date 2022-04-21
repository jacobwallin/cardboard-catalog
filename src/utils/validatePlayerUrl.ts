export default function validatePlayerUrl(url: string): boolean {
  return (
    /^https?:\/\/www.baseball-reference.com\/players\/[a-z.]\/[\w.']{4,7}\d{2}.shtml/.test(
      url
    ) ||
    /^https?:\/\/www.baseball-reference.com\/register\/player.fcgi\?id=/.test(
      url
    )
  );
}
