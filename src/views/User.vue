<template>
    <div>
        <div v-if="loading">Loading...</div>

        <div v-if="error">{{ error }}</div>

        <div v-if="!loading && !error" class="w-full flex flex-col overflow-hidden">
            <div class="w-full flex flex-col overflow-hidden">
                <div class="z-10 w-full flex flex-col items-center h-screen py-5">
                    <div
                        class="w-1/2 min-w-[300px] h-auto overflow-y-auto bg-gray-900/80 flex flex-col rounded-md p-4 backdrop-blur-sm">
                        <p @click="$router.back()" class="text-white sticky self-start top-0 z-20" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                                height="24px" viewBox="0 0 24 24" version="1.1">
                                <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Arrow" transform="translate(-96.000000, 0.000000)" fill-rule="nonzero">
                                        <g id="arrow_left_line" transform="translate(96.000000, 0.000000)">
                                            <path
                                                d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                                                id="MingCute" fill-rule="nonzero">
                                            </path>
                                            <path
                                                d="M3.63603,11.293 C3.24551,11.6835 3.24551,12.3167 3.63603,12.7072 L9.29289,18.3641 C9.68341,18.7546 10.3166,18.7546 10.7071,18.3641 C11.0976,17.9736 11.0976,17.3404 10.7071,16.9499 L6.75735,13.0001 L20,13.0001 C20.5523,13.0001 21,12.5524 21,12.0001 C21,11.4478 20.5523,11.0001 20,11.0001 L6.75735,11.0001 L10.7071,7.05037 C11.0976,6.65984 11.0976,6.02668 10.7071,5.63616 C10.3166,5.24563 9.68341,5.24563 9.29289,5.63616 L3.63603,11.293 Z"
                                                id="路径" fill="white">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </p>
                        <div class="flex lg:flex-row flex-col items-center gap-14">
                            <div class="w-[250px] h-[250px] rounded-lg"
                                :style="{ backgroundImage: `url('${userInfo?.images[1] ? userInfo?.images[1].url : 'https://placehold.co/600x600'}')`, backgroundSize: 'cover' }">
                            </div>
                            <div class="flex flex-col gap-4">
                                <h2 class="text-white font-bold text-3xl">{{ userInfo?.display_name }}</h2>
                                <p class="text-white font-medium text-md">{{
                                    userInfo?.followers.total.toLocaleString('en-US') }} followers</p>
                                <button type="button" @click="toSpotify(userInfo?.external_urls.spotify)"
                                    class="inline-flex items-center gap-2 py-2 px-4 border-2 border-green-500 rounded-full bg-green-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="24px" height="24px" viewBox="0 0 48 48" version="1.1">
                                        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="Color-" transform="translate(-200.000000, -460.000000)" fill="#00DA5A">
                                                <path
                                                    d="M238.16,481.36 C230.48,476.8 217.64,476.32 210.32,478.6 C209.12,478.96 207.92,478.24 207.56,477.16 C207.2,475.96 207.92,474.76 209,474.4 C217.52,471.88 231.56,472.36 240.44,477.64 C241.52,478.24 241.88,479.68 241.28,480.76 C240.68,481.6 239.24,481.96 238.16,481.36 M237.92,488.08 C237.32,488.92 236.24,489.28 235.4,488.68 C228.92,484.72 219.08,483.52 211.52,485.92 C210.56,486.16 209.48,485.68 209.24,484.72 C209,483.76 209.48,482.68 210.44,482.44 C219.2,479.8 230,481.12 237.44,485.68 C238.16,486.04 238.52,487.24 237.92,488.08 M235.04,494.68 C234.56,495.4 233.72,495.64 233,495.16 C227.36,491.68 220.28,490.96 211.88,492.88 C211.04,493.12 210.32,492.52 210.08,491.8 C209.84,490.96 210.44,490.24 211.16,490 C220.28,487.96 228.2,488.8 234.44,492.64 C235.28,493 235.4,493.96 235.04,494.68 M224,460 C210.8,460 200,470.8 200,484 C200,497.2 210.8,508 224,508 C237.2,508 248,497.2 248,484 C248,470.8 237.32,460 224,460"
                                                    id="Spotify">
                                                </path>
                                            </g>
                                        </g>
                                    </svg> See on Spotify </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="absolute w-screen h-auto min-h-screen blur-xl"
                    :style="{ backgroundImage: `url('${userInfo?.images[0] ? userInfo?.images[0].url : 'https://placehold.co/600x600'}')`, backgroundSize: 'cover' }">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { user } from '../types/SpotifyTypes.interface';
import axios from 'axios';

const authToken = sessionStorage.getItem('token');
const artistId = ref<string | null | string[]>(null);
const userInfo = ref<user>()
const loading = ref<boolean>(true)
const error = ref<any>(null)
const route = useRoute();

onMounted(() => {
    artistId.value = route.params.id;
    loading.value = true;
    getInfo()
})
const toSpotify = (url: string | undefined) => {
    const spotifyUrl = url
    if (spotifyUrl) {
        window.open(spotifyUrl, '_blank');
    } else {
        console.error('Spotify URL is undefined or null');
    }
}
const getInfo = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await axios.get(`/users/${artistId.value}`, {
            headers: {
                Authorization: authToken
            }
        });
        console.log('User Info:', response.data);
        userInfo.value = response.data
        loading.value = false
    } catch (error) {
        console.error('Error:', error);
        loading.value = false
    }
};
</script>

<style scoped></style>