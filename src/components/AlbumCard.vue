<template>
    <div v-if="info">
        <Carousel v-bind="settings" :breakpoints="breakpoints">
            <Slide v-for="slide in props.info" :key="slide.id" class="">
                <div class="flex flex-col gap-2 p-4 items-baseline text-left justify-start">
                    <div class="h-[200px] w-[200px] flex flex-col items-end justify-end"
                        :style="{ backgroundImage: `url('${slide?.images[1] ? slide?.images[1].url : 'https://placehold.co/600x600'}')`, backgroundSize: 'cover' }">
                        <button type="button" @click="toSpotify(slide.external_urls.spotify)" class="mb-1 mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                                height="24px" viewBox="0 0 48 48" version="1.1">
                                <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Color-" transform="translate(-200.000000, -460.000000)" fill="#00DA5A">
                                        <path
                                            d="M238.16,481.36 C230.48,476.8 217.64,476.32 210.32,478.6 C209.12,478.96 207.92,478.24 207.56,477.16 C207.2,475.96 207.92,474.76 209,474.4 C217.52,471.88 231.56,472.36 240.44,477.64 C241.52,478.24 241.88,479.68 241.28,480.76 C240.68,481.6 239.24,481.96 238.16,481.36 M237.92,488.08 C237.32,488.92 236.24,489.28 235.4,488.68 C228.92,484.72 219.08,483.52 211.52,485.92 C210.56,486.16 209.48,485.68 209.24,484.72 C209,483.76 209.48,482.68 210.44,482.44 C219.2,479.8 230,481.12 237.44,485.68 C238.16,486.04 238.52,487.24 237.92,488.08 M235.04,494.68 C234.56,495.4 233.72,495.64 233,495.16 C227.36,491.68 220.28,490.96 211.88,492.88 C211.04,493.12 210.32,492.52 210.08,491.8 C209.84,490.96 210.44,490.24 211.16,490 C220.28,487.96 228.2,488.8 234.44,492.64 C235.28,493 235.4,493.96 235.04,494.68 M224,460 C210.8,460 200,470.8 200,484 C200,497.2 210.8,508 224,508 C237.2,508 248,497.2 248,484 C248,470.8 237.32,460 224,460"
                                            id="Spotify">
                                        </path>
                                    </g>
                                </g>
                            </svg></button>
                    </div>
                    <RouterLink :to="{ name: 'album', params: { id: slide.id } }" class="text-white font-semibold">
                        <span v-if="slide?.name.length < 20">{{ slide?.name }}</span>
                        <span v-else>{{ slide?.name.substring(0, 20) + '...' }}</span>
                    </RouterLink>
                    <p class="text-white font-medium text-sm">{{ slide.total_tracks }} <span
                            v-if="slide.total_tracks == '1'">track</span> <span v-else>tracks</span></p>
                    <p class="text-white font-medium text-sm"> {{ formatDate(slide.release_date) }}</p>
                </div>

            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import { album } from '../types/SpotifyTypes.interface'
import { ref } from 'vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
const settings = ref({
    itemsToShow: 1,
    snapAlign: 'center',
},)

const breakpoints = ref({
    // 700px and up
    640: {
        itemsToShow: 1.4,
        snapAlign: 'center',
    },
    800: {
        itemsToShow: 1.8,
        snapAlign: 'center',
    },
    // 1024 and up
    1024: {
        itemsToShow: 2.4,
        snapAlign: 'start',
    },
    1200: {
        itemsToShow: 2.8,
        snapAlign: 'start',
    },
},)
const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    // Get the year
    const year = dateObject.getFullYear();
    return year
}
const toSpotify = (url: string) => {
    const spotifyUrl = url
    if (spotifyUrl) {
        window.open(spotifyUrl, '_blank');
    } else {
        console.error('Spotify URL is undefined or null');
    }
}

const props = defineProps<{
    info: album[] | undefined,
    infoType: string
}>()
</script>