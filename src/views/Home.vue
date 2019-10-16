<template>
  <div class="home">
    <!-- <Dropzone/>-->
    <uploadFiles msg="Welcome to uploadFiles"/> 

    <input 
      style="display:none" 
      type="file" 
      @change="onFileSelected"
      ref="fileInput">
    <button @click="$refs.fileInput.click()">Pick File</button>
    <button @click="onUpload">Upload</button> |

    <input 
      style="display:none" 
      type="file" 
      @change="fileSelectedAndUpload"
      ref="oneFileInput">
    <button @click="$refs.oneFileInput.click()">Pick File And Upload</button>

    <vue2Dropzone msg="Welcome to vue2-dropzone"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import vue2Dropzone from '@/components/vue2Dropzone.vue'
import uploadFiles from '@/components/uploadFiles.vue'
import Dropzone from '@/components/Dropzone.vue'

import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      selectedFile: null
    }
  },
  components: {
    HelloWorld,
    vue2Dropzone,
    uploadFiles,
    Dropzone
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
    },
    fileSelectedAndUpload() {
      const file = this.$refs.oneFileInput.files[0];
      const fd = new FormData();
      fd.append('image', file)
      //https://httpbin.org/post
      axios.post('https://httpbin.org/post', fd, {
            onUploadProgress: progressEvent => {
              console.log('Upload Progress',progressEvent.loaded, progressEvent.total, Math.round(progressEvent.loaded / progressEvent.total*100)+'%' )
            }
          })
          .then(res=>{
            console.log(res)
          })
       console.log(file)
    }
  }
}
</script>
