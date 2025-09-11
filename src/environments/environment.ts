export const environment = {
  production: false,
  youtube: {
    apiKey: 'REPLACE_WITH_YOUTUBE_API_KEY',
    channelId: 'REPLACE_WITH_CHANNEL_ID',
    // Optional: change page size if needed (max 50)
    maxResults: 12 as number,
  },
} as const;


