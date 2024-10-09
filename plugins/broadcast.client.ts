// plugins/broadcast.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Check if window is available (client-side only)
  if (typeof window !== "undefined") {
    // Create a BroadcastChannel instance with the channel name 'sticker_sync'
    const broadcastChannel = new BroadcastChannel("sticker_sync");

    // Provide the BroadcastChannel instance globally
    nuxtApp.provide("broadcastChannel", broadcastChannel);
  }
});
