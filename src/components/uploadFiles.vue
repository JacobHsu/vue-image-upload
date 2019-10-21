<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">

        <div v-if="message" :class="`message ${error ?'is-danger':'is-success'}`">
          <div class="message-body">{{message}}</div>
        </div>
        <div class="field">
            <div class="file is-boxed is-primary">
                <label class="file-label">
                    <input 
                        type="file"
                        ref="files"
                        @change="selectFile"
                        class="file-input"/>
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                choose a file...
                            </span>
                        </span>

                        <span v-if="file" class="file-name">{{file.name}}</span>

                    </label>
            </div>
            <!-- <label for="file" class="label">Upload File</label>
            <input 
                type="file"
                ref="file"
                @change="selectFile"/>  -->
        </div>
        <div class="field">
            <button class="class is-info">
                Send
            </button>
        </div>
    </form>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'uploadFiles',
  data() {
    return {
      file: "",
      message: "",
      error: false
    }
  },
  props: {
    msg: String
  },
  methods: {
    selectFile() {
        const file = this.$refs.file.files[0];
        const allowedTypes = ["image/jpeg","image/png","image/gif"];
        const MAX_SIZE = 20000;
        const tooLarge = file.size > MAX_SIZE;
        if(allowedTypes.includes(file.type) && !tooLarge) {
          this.file = file 
          this.error = false;
          this.message = "";
        } else {
          this.error = true;
          this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE/1000}kb` : "Only Images are allowed From vue"
        }

        function uploadFile(file) {
            return new Promise(function(resolve, reject) {
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (e) => {
                  let img = new Image();
                  img.src = e.target.result;
                  img.onload = function() {
                    console.log(`the image dimensions are ${this.width}x${this.height}`)
                    if(this.width <= 300 && this.height <= 300) {
                        resolve(e.target.result)
                    } else {
                        reject('请上传 300 X 300 像素的PNG图档')
                    }
        
                  }
              }
            })
        }
        uploadFile(file).then(function(result){
            console.log('handle result',result)
        }).catch(function(err){
            console.log(err)
            return alert(err); 
        })

    },
    async sendFile() {
        const formData = new FormData();
        formData.append('file', this.file)
        try {
            await axios.post('/upload', formData);
            this.message = "File has been uploaded";
            this.file = "";
            this.error = false;
        } catch(err) {
            this.message = err.response.data.error;//"Something went wrong";
            this.error = true;
        }
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
