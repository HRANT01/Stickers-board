<template>
  <NuxtLayout>
    <div class="flex h-fit overflow-hidden">
      <form
        class="flex flex-col gap-5 h-full basis-1/2 create-form p-6"
        @submit.prevent="editing ? updateSticker() : addSticker()"
      >
        <div>
          <UI-CustomInput
            v-model="title"
            placeholder="Sticker Title"
            :maxlength="40"
            required
          />
        </div>
        <div>
          <UI-CustomTextArea
            v-model="description"
            placeholder="Sticker Description"
            required
          />
        </div>
        <div>
          <button class="pl-5 pr-5 pt-3 pb-3 bg-blue-500 rounded" type="submit">
            {{ editing ? "Save Changes" : "Create Sticker" }}
          </button>
        </div>
      </form>

      <div class="basis-1/2 h-full">
        <ExisitngCardsList @edit-card="setStickerToEdit" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useStickersStore } from "@/store/index";
import { onBeforeRouteUpdate } from "vue-router";

const store = useStickersStore();

const title = ref("");
const description = ref("");
const editing = ref(false);

const stickers = computed(() => store.getStickers);

onMounted(() => {
  initializeState();
});

onBeforeRouteUpdate((to, from, next) => {
  initializeState();
  next();
});

onUnmounted(() => {
  store.cleanupBroadcastChannel();
});

const initializeState = () => {
  store.loadStickersFromLocalStorage();
  store.initializeBroadcastChannel();

  const newEditingSticker = store.getEditingSticker;
  if (newEditingSticker) {
    title.value = newEditingSticker.title;
    description.value = newEditingSticker.description;
    editing.value = true;
  } else {
    resetForm();
  }

  if (store.broadcastChannel) {
    store.broadcastChannel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === "SYNC_STICKERS") {
        store.stickers.splice(0, store.stickers.length, ...payload.stickers);

        const syncedEditingSticker = store.getEditingSticker;
        if (syncedEditingSticker) {
          title.value = syncedEditingSticker.title;
          description.value = syncedEditingSticker.description;
          editing.value = true;
        } else {
          resetForm();
        }
      }
    };
  }
};

const resetForm = () => {
  title.value = "";
  description.value = "";
  editing.value = false;
};

const setStickerToEdit = (id) => {
  const editableSticker = store.getStickerById(id);
  if (editableSticker) {
    store.setEditingSticker(editableSticker);
    title.value = editableSticker.title;
    description.value = editableSticker.description;
    editing.value = true;
  }
};

const addSticker = () => {
  store.addSticker({
    id: uuidv4(),
    title: title.value,
    description: description.value,
  });
  resetForm();
};

const updateSticker = () => {
  const editingSticker = store.getEditingSticker;
  if (editingSticker) {
    store.updateSticker({
      id: editingSticker.id,
      title: title.value,
      description: description.value,
    });
    store.setEditingSticker(null);
    resetForm();
  } else {
    console.error("No sticker found to update.");
  }
};
</script>

<style scoped>
.create-form {
  background-color: #f9f9f9;
  background-image: repeating-linear-gradient(
    130deg,
    #0c0606 0px,
    #e0e0e0 1px,
    #f9f9f9 1px,
    #f9f9f9 11px
  );
}
</style>
