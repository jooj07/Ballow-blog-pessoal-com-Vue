const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/stats",{useNewUrlParser: true, useUnifiedTopology: true})
.catch(e =>{
  console.log("\x1b[41m","=> Não foi possível conectar ao mongodb... :'(","\x1b[0m")
})

