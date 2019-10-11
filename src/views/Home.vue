<template>
  <div class="home">
    <input 
      style="display:none" 
      type="file" 
      @change="onFileSelected"
      ref="fileInput">
    <button @click="$refs.fileInput.click()">Pick File</button>
    <button @click="onUpload">Upload</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      selectedFile: null
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      console.log(event)
    },
    onUpload() {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name)
      axios.post('my-domain.com/file-upload', fd, {
            onUploadProgress: progressEvent => {
              console.log('Upload Progress', Math.round(progressEvent.loaded / progressEvent.total*100)+'%' )
            }
          })
          .then(res=>{
            console.log(res)
          })
    }
  }
}
</script>
