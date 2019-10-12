<template>
  <div class="home">
    <uploadFiles msg="Welcome to uploadFiles"/>

    <input 
      style="display:none" 
      type="file" 
      @change="onFileSelected"
      ref="fileInput">
    <button @click="$refs.fileInput.click()">Pick File</button>
    <button @click="onUpload">Upload</button>

    <vue2Dropzone msg="Welcome to vue2-dropzone"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import vue2Dropzone from '@/components/vue2Dropzone.vue'
import uploadFiles from '@/components/uploadFiles.vue'
 
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
    uploadFiles
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
