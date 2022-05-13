<script setup lang="ts">
import { ref } from 'vue'

import * as PIXI from 'pixi.js'
import Particle from '../data/Particle'

defineProps<{ msg: string }>()

let app = new PIXI.Application({
    resolution: devicePixelRatio,
    resizeTo: window,
});

const constant = 0.01;
const angle = Math.PI * 2.0;
const speed = 100;

var particles = ref(new Array());

let count = ref(0);
function addParticle(count_added: number) {
    Array(count_added).fill(0).map((_, __) => {
        particles.value.push(
            new Particle(
                { app },
                new PIXI.Point(
                    Math.floor(Math.random() * app.view.width),
                    Math.floor(Math.random() * app.view.height)
                ),
                constant,
                angle,
                speed
            )
        );
    });
    count.value += count_added;
}

document.getElementById("app")?.appendChild(app.view)

app.ticker.add(function (_) {
    for (let i of particles.value) {
        i.update();
    }
});

</script>

<template>
    <button type="button" @click="addParticle(20)">count is: {{ count }}</button>
</template>

<style>
#id {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#id {
    display: block;
}
</style>
