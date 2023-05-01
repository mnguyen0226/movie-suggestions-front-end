<template>
  <div v-for="(item, index) in items" :key="index" ref="itemRefs[index]">
    <!-- render the item content here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // array of items to render
      itemRefs: [], // array of refs to the item elements
      itemTimes: {}, // object to store time spent on screen for each item
    };
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = this.itemRefs.indexOf(entry.target);
        if (entry.isIntersecting) {
          this.itemTimes[index] = Date.now(); // set start time
        } else {
          const timeOnScreen = Date.now() - this.itemTimes[index];
          this.itemTimes[index] = timeOnScreen; // store time spent on screen
        }
      });
    });

    this.itemRefs = this.items.map(() => this.$refs.itemRefs.push(null));

    this.$nextTick(() => {
      this.itemRefs.forEach((ref) => {
        this.observer.observe(ref);
      });
    });
  },
};
</script>