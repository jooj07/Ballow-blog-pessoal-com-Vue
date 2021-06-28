<template>
  <v-app>
   
    <v-container fluid v-if="article" wrap>
      <v-flex xs12 xm12 md12 lg12>
        <v-toolbar class="rounded-lg ml-2" flat outlined dense floating>
          <v-btn icon @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-divider vertical inset></v-divider>
          <v-icon class="mx-2" left>mdi-magnify</v-icon>
          {{ font }}
          <v-btn icon @click="increase"><v-icon>mdi-plus</v-icon></v-btn>
          <v-btn icon @click="decrease"
            ><v-icon>mdi-minus</v-icon></v-btn
          ></v-toolbar
        >
      </v-flex>
      <v-flex xs12 xm12 md12 lg12>
        <v-img
          contain
          v-if="article.imageUrl"
          max-height="300"
          max-width="800"
          :src="article.imageUrl"
        ></v-img>
        <v-img
          contain
          v-else
          max-height="300"
          max-width="800"
          src="@/assets/article.png"
        ></v-img>
      </v-flex>
      <v-flex xs12 xm12 md12 lg12>
        <h1 class="text-h3 my-2">{{ article.name }}</h1>
        <h2 class="subtitle-2 my-2">{{ article.description }}</h2>
        <div :class="typografy[font]" v-html=" article.content "></div>
      </v-flex>
    </v-container>
    <v-row v-if="!article">
      <v-col class="d-flex justify-center align-center" cols="12">
        <loading />
        loading...
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["id"],
  data: () => ({
    typografy: {
      0: "text-caption",
      1: "text-body-2",
      2: "text-body-1",
      3: "text-subtitle-1",
      4: "text-h6",
      5: "text-h5",
      6: "text-h4",
      7: "text-h3",
      8: "text-h2",
      9: "text-h1",
    },
    font: 3,
  }),
  computed: {
    ...mapState("feed", ["article"]),
  },
  methods: {
    ...mapActions("feed", ["getArticle"]),
    increase() {
      // if(this.font<9){
      //   this.font++
      // }
      this.font < 9 ? this.font++ : this.font;
    },
    decrease() {
      // if(this.font>0){
      //   this.font--
      // }
      this.font > 0 ? this.font-- : this.font;
    },
  },
  created() {
    this.getArticle(this.id);
    
  },
};
</script>

<style></style>
