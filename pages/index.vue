<template>
    <!-- <nav>
    <div class="container containermenu">
        <div class="navstart">
          <img src="@/assets/img/WeFundz.svg" alt="logo"/><span class="titlenav">WeFundz</span>
        </div>
        <div class="navcenter">
          <div class="menu">
            <NuxtLink
              v-for="menuItem in menuItems"
              :key="menuItem.id"
              :to="menuItem.href"
              class="menu-item"
              :class="{ 'is-active': activeItem === menuItem.id }"
              @click="handleItemClick(menuItem.id, menuItem.color)"
            >
            <div class="menu-icon" >
            <naive-icon v-if="menuItem.name" :name="menuItem.name"></naive-icon></div> {{ $t(menuItem.label) }}
          </NuxtLink>
            <span class="menu-indicator" :style="{ width: indicatorWidth + 'px', left: indicatorLeft + 'px', backgroundColor: activeColor }"></span>
          </div>
        </div>
        <div class="navend" span="0 400:1 600:2 800:3">
            <div class="burger" @click="showmenu = true">
              <input type="checkbox" id="checkboxburger" >
              <label for="checkboxburger" class="toggleburger checkboxburgerchecked">
                <div class="barburger bar--topburger"></div>
                <div class="barburger bar--middleburger"></div>
                <div class="barburger bar--bottomburger"></div>
              </label>
            </div>
  
          <div class="contain-navend">
            
            <n-button round="true" color="#e3759b" @click="showModal = true" >
              <div class="menu-icon" >
              <naive-icon name="ph-plus"></naive-icon></div> {{ $t('nav_create_button') }}
            </n-button>
            <n-button round="true" v-if="!isActivated"  @click="open" color="#e3759b" ghost >
              <div class="menu-icon" >
              <naive-icon name="ph-wallet"></naive-icon></div> {{ $t('nav_connectwallet_button') }}
            </n-button>
            <n-dropdown :options="optionsprofil" @select="handleSelectprofil" v-if="isActivated" >
              <n-button round="true" class="accountdropdown">
                <div class="menu-icon" ><naive-icon name="ph-user"></naive-icon></div>
                 {{ address ? `${address.slice(0, 8)}...` : '' }}
                 <div class="menu-icon" ><naive-icon name="ph-caret-down-fill"></naive-icon></div>
              
                </n-button>
            </n-dropdown>
           
  
            <n-dropdown
            round="true"
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
        </div>
  
      </div>
  </nav> -->
  
  <div class="container">
    <n-button  @click="open" color="#e3759b" ghost>
        <div class="menu-icon" >
        <naive-icon name="ph-wallet"></naive-icon></div> {{ $t('nav_connectwallet_button') }}
    </n-button>

    <p>Address: {{address}}</p>
    <p>Chain: {{chainId}}</p>
  </div> 
 
  
  <vd-board :connectors="connectors" dark/>
  
  </template>
  
  <script>
  import { useMessage } from "naive-ui";
  import { h } from 'vue';
  import { NaiveIcon } from "#components" // Needs to be manually imported
  import { MetaMaskConnector, WalletConnectConnector, useBoard, useEthers } from 'vue-dapp';
  
  const { address, chainId, signer, isActivated, account } = useEthers();
  
  const renderIcon = (iconClass) => {
    return () => h(NaiveIcon, { name: iconClass });
  };
  
  const optionsprofil = [
    {
      label: 'My Campaign',
      icon: renderIcon('ph-note'),
      link: "/",
      key: "Campaign",
    },
    {
      label: "My Profil",
      icon: renderIcon('ph-user'),
      link: "/",
      key: "Profil",
    },
    {
      label: "Setting",
      icon: renderIcon('ph-gear-six'),
      link: "/",
      key: "Setting",
    },
    {
      label: "Disconnected",
      icon: renderIcon('ph-sign-out'),
      link: "/",
      key: "Disconnected",
    }
  ];
  
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
        
      // Utiliser watch pour surveiller les changements de l'adresse du compte
      watch(account, (newAccount) => {
      }, { immediate: true }); // { immediate: true } pour exécuter le watch dès l'initialisation
  
  
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
        isActivated
      };
    },
  };
  
  
  </script>