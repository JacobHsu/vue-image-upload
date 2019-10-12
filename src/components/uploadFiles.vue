<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div class="field">
            <div class="file is-boxed is-primary">
                <label class="file-label">
                    <input 
                        type="file"
                        ref="file"
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
      file: ""
    }
  },
  props: {
    msg: String
  },
  methods: {
    selectFile() {
        this.file = this.$refs.file.files[0]
    },
    async sendFile() {
        const formData = new FormData();
        formData.append('file', this.file)
        try {
            await axios.post('/upload', formData)
        } catch(err) {
            console.log(123, err)
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
