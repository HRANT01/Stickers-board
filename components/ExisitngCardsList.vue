<template>
  <div
    class="flex flex-col h-[70vh] w-full gap-6 mx-auto p-3 overflow-y-auto overflow-x-hidden"
  >
    <div v-if="loading" class="flex justify-center items-center h-full">
      <div class="loader-small"></div>
    </div>

    <div v-else>
      <div v-for="sticker in stickers" :key="sticker.id" class="mt-5">
        <Card
          :sticker="sticker"
          @delete-sticker="deleteSticker"
          @edit-sticker="EditSticker"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStickersStore } from "@/store/index";

const store = useStickersStore();
const emits = defineEmits(["edit-card"]);

const loading = ref(true);

onMounted(() => {
  store.loadStickersFromLocalStorage();
  loading.value = false;
});

const stickers = computed(() => store.getStickers);

const deleteSticker = (id) => {
  store.removeSticker(id);
};

const EditSticker = (id) => {
  emits("edit-card", id);
};
</script>

<style scoped>
.loader-small {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
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
