<template>
    <div class="lang">
    <n-dropdown
    placement="bottom-start"
    trigger="hover"
    size="small"
    :options="options"
    @select="handleSelect"
  >
  <n-button round="true" quaternary>
    <div class="menu-icon" ><naive-icon name="ph-globe"></naive-icon></div> {{ $t('nav_lang_text') }}
  </n-button>
  </n-dropdown>
</div>

  <div class="container">
    <div class="inside-container">
        <n-button @click="open" color="#e3759b" round="true">
            <template v-if="!isActivated">
              <div class="menu-icon">
                <naive-icon name="ph-wallet"></naive-icon>
              </div>
              {{ $t('nav_connectwallet_button') }}
            </template>
          
            <template v-else>
              <div class="menu-icon">
                <naive-icon name="ph-arrows-left-right"></naive-icon> <!-- Assuming you want to change the icon -->
              </div>
              {{ $t('nav_connectwallet_button_switch') }}
            </template>
          </n-button>



    <n-card :title="$t('title')">

        <template v-if="!isActivated">
            {{ $t('message') }}
          </template>
        
          <template v-else>
            <p>Address: {{address}}</p>
            <p>Chain: {{chainId}}</p>
          </template>

       
      </n-card>
  </div> 
</div>
  
  <vd-board :connectors="connectors" dark/>
  
  </template>
  
  <script>
  import { useMessage } from "naive-ui";
  import { h } from 'vue';
  import { NaiveIcon } from "#components" // Needs to be manually imported
  import { MetaMaskConnector, WalletConnectConnector, useBoard, useEthers } from 'vue-dapp';
  
  const { address, chainId, signer, isActivated, account, isConnected } = useEthers();
  
  const options = [
    {
      label: "Français",
      key: "fr"
    },
    {
      label: "English",
      key: "en"
    }
  ];
  
  export default {
    setup() {
      const { open } = useBoard();
        
  
      const connectors = [
        new MetaMaskConnector({
          appUrl: "http://localhost:3000/",
        }),
        new WalletConnectConnector({
          projectId: '80c55c1a9efb7ba1d32582051978a81d', // YOUR PROJECT ID, check https://cloud.walletconnect.com/
          chains: [56], // BNB CHAIN
          showQrModal: true,
          qrModalOptions: {
            themeMode: 'dark',
            themeVariables: undefined,
            chainImages: false,
            desktopWallets: undefined,
            walletImages: undefined,
            mobileWallets: undefined,
            enableExplorer: false,
            explorerAllowList: undefined,
            tokenImages: false,
            privacyPolicyUrl: undefined,
            explorerDenyList: undefined,
            termsOfServiceUrl: undefined,
          },
        }),
      ]
      const { locale } = useI18n();
      const message = useMessage();
      return {
        address, 
        chainId, 
        connectors, 
        open, 
        signer, 
        isActivated,
        options,
        handleSelect(key) {
        console.log(key)
        locale.value = key;
        if(key) {

        }
        // message.info(String(key));
      }
      };
    },
  };
  
  
  </script>