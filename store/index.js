import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStickersStore = defineStore("stickers", {
  state: () => ({
    stickers: reactive([]),
    editingSticker: null,
    broadcastChannel: null,
  }),

  getters: {
    getStickers(state) {
      return state.stickers;
    },
    getStickerById: (state) => (id) => {
      return state.stickers.find((sticker) => sticker.id === id);
    },
    getEditingSticker(state) {
      return state.editingSticker;
    },
  },

  actions: {
    initializeBroadcastChannel() {
      if (typeof window !== "undefined" && !this.broadcastChannel) {
        this.broadcastChannel = new BroadcastChannel("stickers_sync_channel");

        this.broadcastChannel.onmessage = (event) => {
          const { type, payload } = event.data;

          if (type === "SYNC_STICKERS") {
            this.stickers.splice(0, this.stickers.length, ...payload.stickers);
          }
        };
      }
    },

    syncStickersState() {
      if (this.broadcastChannel) {
        const stickersClone = JSON.parse(JSON.stringify(this.stickers));
        this.broadcastChannel.postMessage({
          type: "SYNC_STICKERS",
          payload: { stickers: stickersClone },
        });
      }
    },

    loadStickersFromLocalStorage() {
      try {
        if (typeof window !== "undefined") {
          const storedStickers = localStorage.getItem("stickers");
          if (storedStickers) {
            this.stickers.splice(
              0,
              this.stickers.length,
              ...JSON.parse(storedStickers)
            );
          }
        }
      } catch (error) {
        console.error("Failed to load stickers from localStorage", error);
      }
      this.initializeBroadcastChannel();
    },

    saveToLocalStorage() {
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("stickers", JSON.stringify(this.stickers));
        }
      } catch (error) {
        console.error("Failed to save stickers to localStorage", error);
      }
      this.syncStickersState();
    },

    addSticker(sticker) {
      this.stickers.push(sticker);
      this.saveToLocalStorage();
    },

    removeSticker(id) {
      const index = this.stickers.findIndex((sticker) => sticker.id === id);
      if (index !== -1) {
        this.stickers.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    updateSticker(updatedSticker) {
      const index = this.stickers.findIndex(
        (sticker) => sticker.id === updatedSticker.id
      );
      if (index !== -1) {
        this.stickers[index] = updatedSticker;
        this.saveToLocalStorage();
      }
    },

    setEditingSticker(sticker) {
      this.editingSticker = sticker;
    },

    cleanupBroadcastChannel() {
      if (this.broadcastChannel) {
        this.broadcastChannel.close();
        this.broadcastChannel = null;
      }
    },
  },
});
