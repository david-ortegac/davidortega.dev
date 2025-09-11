export const environment = {
  production: true,
  youtube: {
    apiKey: process.env['API_KEY'] || 'REPLACE_WITH_YOUTUBE_API_KEY',
    channelId: process.env['CHANNEL_ID'] || 'REPLACE_WITH_CHANNEL_ID',
    maxResults: 12 as number,
  },
} as const;


