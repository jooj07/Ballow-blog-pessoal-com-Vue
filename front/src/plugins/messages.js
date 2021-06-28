import Vue from "vue"
import Toasted from 'vue-toasted'

Vue.use(Toasted,{
  iconPack:"mdi",
  theme:"bubble",
  position: "top-center",
  duration:4000
})

Vue.toasted.register(
  "defaultSuccess",
  "Yay, everything ended up well!",
  {type:"sucess", icon:'mdi-robot-happy-outline'}
)

Vue.toasted.register(
  'defaultError',
  backEndMsg=>!backEndMsg.msg ? "Oh boy... Something went wrong." : backEndMsg.msg,
  {type:"error", icon:"mdi-emoticon-sad-outline"}
)