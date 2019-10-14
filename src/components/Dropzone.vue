<template>
  <div class="container">
    <h1> dropzone </h1>

    <form @submit.prevent="sendFile" enctype="multipart/form-data">

        <div class="dropzone">
            <input 
                type="file" 
                class="input-file"
                ref="file"
                @change="sendFile"  
            />
            <p v-if="!uploading" class="call-to-action">
                Drag your files here
            </p>
            <p v-if="uploading" class="process-bar">
                <progress 
                    class="progress is-primary"
                    :value="progress"
                    max="100">
                    {{progress}} %
                </progress>
 
            </p>
        </div>
        <div class="content">
            <ul>
                <li v-for="file in uploadedFiles" :key="file.originalname">
                    {{file.originalname}}
                </li>
            </ul>
        </div>

    </form>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Dropzone',
  data() {
    return {
      file: "",
      message: "",
      error: false,
      uploading: false,
      uploadedFiles:[],
      progress: 0
    }
  },
  props: {
    msg: String
  },
  methods: {
    async sendFile() {
        // @change="sendFile" 變更後馬上送
        const file = this.$refs.file.files[0];
        const formData = new FormData();
        formData.append('file', file)
        try {
            this.uploading = true;
            const res = await axios.post('/dropzone', formData, {
                onUploadProgress: e => {
                  this.progress = Math.round(e.loaded*100 /e.total)
                }
            });
            this.uploadedFiles.push(res.data.file);
            this.uploading = false;
        } catch(err) {
            this.message = "Something went wrong";
            this.error = true;
            this.uploading = false;
        }
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dropzone {
        min-height: 200px;
        padding: 10px 10px;
        position: relative;
        cursor: pointer;
        outline: 2px dashed grey;
        outline-offset: -10px;
        background: lightcyan;
        color:dimgray;
    }
    .input-file {
        opacity: 0;
        /* border-style: dashed; */
        width: 100%;
        height: 200px;
        position: absolute;
        top: 0px;
        left: 0px;
        cursor: pointer;
    }
    .dropzone:hover {
        background: lightblue;
    }
    .dropzone .call-to-action {
        font-size: 1.2rem;
        text-align: center;
        padding: 70px 0;
    }
    .dropzone .progress-bar {
        text-align: center;
        padding: 70px 10px;
    }
</style>
