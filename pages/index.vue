<template>
  <NuxtLayout>
    <div
      v-if="loading"
      class="flex justify-center items-center h-[calc(100vh-200px)]"
    >
      <div class="loader"></div>
    </div>

    <div
      v-if="!loading && stickers.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 w-[90%] mx-auto"
    >
      <div v-for="sticker in stickers" :key="sticker.id">
        <Card
          :sticker="sticker"
          @delete-sticker="deleteSticker"
          @edit-sticker="editSticker"
        />
      </div>
    </div>

    <div
      v-if="!loading && !stickers.length"
      class="flex justify-center items-center h-[calc(100vh-200px)]"
    >
      <div class="text-center text-[4vw] font-bold w-[80%]">
        There are no stickers to show. You can create a new one on the settings
        page !!!
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useStickersStore } from "@/store/index";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

const router = useRouter();
const store = useStickersStore();

const loading = ref(true);

const stickers = computed(() => store.getStickers);

onMounted(() => {
  loadStickersAndInitializeChannel();
});

onBeforeRouteUpdate((to, from, next) => {
  loadStickersAndInitializeChannel();
  next();
});

onUnmounted(() => {
  store.cleanupBroadcastChannel();
});

const loadStickersAndInitializeChannel = () => {
  store.loadStickersFromLocalStorage();
  store.initializeBroadcastChannel();
  loading.value = false;
};

const deleteSticker = (id) => {
  store.removeSticker(id);
};

const editSticker = (id) => {
  const editableSticker = store.getStickerById(id);
  if (editableSticker) {
    store.setEditingSticker(editableSticker);
    router.push({ name: "settings" });
  }
};
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
