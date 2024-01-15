<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Search from './Search.vue';
import axios from 'axios'
import InfoCard from './InfoCard.vue';
import { artistSearchResultObject, albumSearchResultObject, playlistSearchResultObject, tracksSearchResultObject, searchFieldProps } from '../types/SpotifyTypes.interface'



const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET
const token = ref<string | null>(null);
const authBearerToken = ref<string | null>(null)
const artistSearchResult = ref<artistSearchResultObject>();
const albumSearchResult = ref<albumSearchResultObject>();
const trackSearchResult = ref<tracksSearchResultObject>();
const playlistSearchResult = ref<playlistSearchResultObject>();
const searchResult = ref<object>()
const fetching = ref<Boolean>(false)
const searchFields = ref<Array<string>>(["album", "artist", "playlist", "track"])
const searchFieldsDictionary = ref<Array<searchFieldProps>>([{ name: "album", isSelected: false }, { name: "artist", isSelected: true }, { name: "playlist", isSelected: false }, { name: "track", isSelected: false }])
const currentField = ref<string>('artist')

onMounted(() => {
  getToken()
})
const getToken = async () => {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', clientId);
  data.append('client_secret', clientSecret);

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    token.value = response.data.access_token;
    console.log('token value: ', token.value)
    authBearerToken.value = 'Bearer ' + token.value;
    sessionStorage.setItem('token', authBearerToken.value)
  } catch (error) {
    console.error('Error:', error);
  }
};
const search = async (searchValue: string) => {
  fetching.value = true;
  try {
    const response = await axios.get('/search?q=' + searchValue + '&type=' + searchFields.value, {
      headers: {
        Authorization: authBearerToken.value
      }
    });
    searchResult.value = response.data
    artistSearchResult.value = response.data?.artists;
    playlistSearchResult.value = response.data?.playlists;
    trackSearchResult.value = response.data?.tracks;
    albumSearchResult.value = response.data?.albums;
    fetching.value = false;
    console.log(searchResult.value)
  } catch (error) {
    console.log('error:', error)
    fetching.value = false;
  }
}
const filterChanged = (field: string) => {
  var fileIndex = searchFieldsDictionary.value.findIndex(x => x.name == field)
  var item = searchFieldsDictionary.value[fileIndex]
  console.log('changed', field)
  if (item.isSelected == true) {
    item.isSelected = false
  } else {
    searchFieldsDictionary.value.forEach(field => {
      field.isSelected = false
    });
    searchFieldsDictionary.value[fileIndex].isSelected = true;
  }
  currentField.value = field
  currentFilterArray(field)

}
const currentFilterArray = (field: string) => {
  switch (field) {
    case 'artist':
      return artistSearchResult.value;
    case 'album':
      return albumSearchResult.value;
    case 'playlist':
      return playlistSearchResult.value;
    case 'track':
      return trackSearchResult.value;
    default:
      return null;
  }
}
</script>

<template>
  <div class="flex flex-col p-5 bg-slate-900">
    <Search @search-clicked="search" />
    <div v-if="fetching" role="status" class="flex-col gap-2 space-y-8 animate-pulse w-full mt-4 md:flex md:items-center">
      <div class="flex items-center justify-center w-[250px] h-[250px] bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 20 18">
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div class="w-[350px] relative bottom-[160px] backdrop-blur-sm">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-white w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-white max-w-[480px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-white mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-white max-w-[440px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-white max-w-[460px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-white max-w-[360px]"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="searchResult != null && fetching == false" class="mt-4">
      <div class="w-full flex flex-row flex-wrap gap-3 justify-center">
        <div v-for=" field  in  searchFieldsDictionary ">
          <button type="button" :class="{ selectedState: field.isSelected }" @click="filterChanged(field.name)"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{{
              field.name }}</button>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 p-4 mt-4 items-center justify-center" v-if="currentFilterArray(currentField)">

        <div v-for=" item  in  currentFilterArray(currentField)?.items ">
          <InfoCard :info="item" :info-type="currentField" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.selectedState {
  background-color: rgb(51, 51, 51);
}
</style>
