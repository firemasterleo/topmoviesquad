<template>

    <div class="body">
        <div class="image">
          <div class="veil"></div>
                  <img src="../assets/moviebg4.jpg" alt="Hero Image">
        </div>


    </div>
    
</template>


<style lang="scss" scoped>

// body::-webkit-scrollbar {
//     display: none;
//   }
  

    .body {
        width: 100vw;
        height: 150rem;
        overflow-x: hidden;
    }

  .image {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -10;
    .veil {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.562);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // opacity: 40%;
    }
  }
</style>