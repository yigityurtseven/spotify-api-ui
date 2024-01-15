<template>
    <div v-if="info">
        <RouterLink :to="{ name: 'artist', params: { id: props.info.id } }" v-if="props.infoType == 'artist'"
            class="flex flex-col lg:h-[350px] lg:w-[350px] h-[300px] w-[300px] bg-white border   rounded-lg shadow md:flex-col md:max-w-xl   hover:bg-gray-100  dark:border-transparent dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-auto rounded-lg h-full lg:min-h-[350px] min-h-[300px]"
                :src="props.info.images[0] ? props.info.images[0]?.url : 'https://placehold.co/600x600'" alt="">
            <div
                class="flex flex-col w-full h-auto relative bottom-[95px] rounded-lg justify-between p-4    hover:cursor-pointer duration-200 transition ease-in-out leading-normal backdrop-blur-sm">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <span v-if="props.info?.name.length < 22">{{ props.info?.name }}</span>
                    <span v-else>{{ props.info?.name.substring(0, 22) + '...' }}</span>
                </h5>
                <p class="text-white">{{ props.info?.followers.total.toLocaleString('en-US') }} followers</p>
            </div>
        </RouterLink>
        <RouterLink :to="{ name: 'album', params: { id: props.info.id } }" v-if="props.infoType == 'album'"
            class="flex flex-col lg:h-[350px] lg:w-[350px] h-[300px] w-[300px] bg-white border   rounded-lg shadow md:flex-col md:max-w-xl   hover:bg-gray-100  dark:border-transparent dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded-lg h-full lg:min-h-[350px] min-h-[300px]"
                :src="props.info.images[0] ? props.info.images[0]?.url : 'https://placehold.co/600x600'" alt="">
            <div
                class="flex flex-col w-full h-auto relative bottom-[120px] rounded-lg justify-between p-4    hover:cursor-pointer duration-200 transition ease-in-out leading-normal backdrop-blur-sm">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <span v-if="props.info?.name.length < 22">{{ props.info?.name }}</span>
                    <span v-else>{{ props.info?.name.substring(0, 22) + '...' }}</span>
                </h5>
                <p class="text-white"><span> {{ props.info.album_type }} </span> - {{ formatDate(props.info.release_date) }}
                </p>
                <!-- todo add artist href below -->
                <p class="text-white">{{ props.info.artists[0].name }}</p>
            </div>
        </RouterLink>
        <a href="#" v-if="props.infoType == 'track'"
            class="flex flex-col lg:h-[350px] lg:w-[350px] h-[300px] w-[300px] bg-white border   rounded-lg shadow   hover:bg-gray-100  dark:border-transparent dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded-lg h-full lg:min-h-[350px] min-h-[300px]"
                :src="props.info.album.images[0] ? props.info.album.images[0]?.url : 'https://placehold.co/600x600'" alt="">
            <div
                class="flex flex-col w-full h-auto relative bottom-[95px] rounded-b-lg border-transparent justify-between p-4    hover:cursor-pointer duration-200 transition ease-in-out leading-normal backdrop-blur-sm">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <span v-if="props.info?.name.length < 25">{{ props.info?.name }}</span>
                    <span v-else>{{ props.info?.name.substring(0, 25) + '...' }}</span>
                </h5>
                <p class="text-white">{{ props.info.artists[0].name }} - {{ formatMinute(props.info.duration_ms) }}</p>
            </div>
        </a>
        <RouterLink :to="{ name: 'playlist', params: { id: props.info.id } }" v-if="props.infoType == 'playlist'"
            class="flex flex-col lg:h-[350px] lg:w-[350px] h-[300px] w-[300px] bg-white border   rounded-lg shadow md:flex-col md:max-w-xl   hover:bg-gray-100  dark:border-transparent dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded-lg h-full lg:min-h-[350px] min-h-[300px]"
                :src="props.info.images[0]?.url ? props.info.images[0]?.url : 'https://placehold.co/600x600'" alt="">
            <div
                class="flex flex-col w-full h-auto relative bottom-[95px] rounded-lg justify-between p-4    hover:cursor-pointer duration-200 transition ease-in-out leading-normal backdrop-blur-sm">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <span v-if="props.info?.name.length < 25">{{ props.info?.name }}</span>
                    <span v-else>{{ props.info?.name.substring(0, 25) + '...' }}</span>
                </h5>
                <p class="text-white">{{ props.info.owner.display_name }}</p>
            </div>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { artist, track, album, playlist } from '../types/SpotifyTypes.interface'
import { RouterLink } from 'vue-router';

const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);

    // Get the year
    const year = dateObject.getFullYear();

    // Format the date as a human-readable string (e.g., "December 11, 2015")
    // const formattedDate = dateObject.toLocaleDateString("en-US", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric"
    // });

    return year
}

const formatMinute = (milisecond: number) => {
    var minutes = Math.floor(milisecond / 60000);
    var seconds = Number(((milisecond % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const props = defineProps<{
    info: artist | track | album | playlist,
    infoType: string
}>()
</script>