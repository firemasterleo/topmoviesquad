<template>
    <h1>settings</h1>
</template>


<style lang="scss" scoped>
h1 {
    color: black;
}
</style>


import { getFirestore } from 'firebase/firestore';
export const db = getFirestore(app); // Export Firestore