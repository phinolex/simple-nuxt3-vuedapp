<template>

    <naive-config>
        <n-notification-provider placement="bottom" :container-style="{}">
          <n-loading-bar-provider>
            <n-dialog-provider>
                <n-message-provider>

                <Lazynuxt-page />

                </n-message-provider>

            </n-dialog-provider>
          </n-loading-bar-provider>
        </n-notification-provider>
      </naive-config>
</template>

<script setup lang="ts">

const { colorModePreference } = useNaiveColorMode();

// Set dark mode
colorModePreference.set("dark");
</script>