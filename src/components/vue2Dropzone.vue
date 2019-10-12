<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <vue-dropzone
        ref="myVueDropzone"
        :useCustomSlot="true"
        id="dropzone"
        @vdropzone-upload-progress="uploadProgress"
        :options="dropzoneOptions"
        @vdropzone-file-added="fileAdded"
        @vdropzone-sending-multiple="sendingFiles"
        @vdropzone-success-multiple="success"
    ></vue-dropzone>
    {{getTempAttachments}}
    {{getAttachments}}
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
export default {
  name: 'vue2Dropzone',
  data() {
    return {
        tempAttachments: [],
        attachments: [],
        // dropzoneOptions: {
        //     url: 'https://httpbin.org/post',
        //     thumbnailWidth: 150,
        //     maxFilesize: 0.5,
        //     headers: { "My-Awesome-Header": "header value" },
        //     addRemoveLinks: true
        // },
        dropzoneOptions: {
            url: `https://httpbin.org/post`,//`the server url, where you want your filesto be sent`,
            maxFilesize: 102400000, //<max file size in MB>,
            headers: {
                Authorization: `Access Token`//`<your application access-token>`
            },
            // The way you want to receive the files in the server
            paramName: function(n) {
              return "file[]";
            },
            dictDefaultMessage: "Upload Files Here xD",
            //includeStyling: false,
            //previewsContainer: false,
            //thumbnailWidth: 250,
            //thumbnailHeight: 140,
            uploadMultiple: true,
            parallelUploads: 20,
            addRemoveLinks: true
        },

    }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
    msg: String
  },
  methods: {
    // function called for every file dropped or selected
    fileAdded(file) {
      console.log("File Dropped => ", file);
      // Construct your file object to render in the UI
      let attachment = {};
      attachment._id = file.upload.uuid;
      attachment.title = file.name;
      attachment.type = "file";
      attachment.extension = "." + file.type.split("/")[1];
      attachment.user = JSON.parse(localStorage.getItem("user"));
      attachment.content = "File Upload by Select or Drop";
      attachment.thumb = file.dataURL;
      attachment.thumb_list = file.dataURL;
      attachment.isLoading = true;
      attachment.progress = null;
      attachment.size = file.size;
      this.tempAttachments = [...this.tempAttachments, attachment];
    },
    // a middle layer function where you can change the XHR request properties
    sendingFiles(files, xhr, formData) {
      console.log(
        "if you want to change the upload time or add data to the formData you can do it here."
      );
      console.log("Files sending", files);
    },
    // function where we get the upload progress
    uploadProgress(file, progress, bytesSent) {
      console.log("File Upload Progress", progress,`${Math.floor(progress)}`);
      this.tempAttachments.map(attachment => {
        if (attachment.title === file.name) {
          attachment.progress = `${Math.floor(progress)}`;
        }
      });
    },
    // called on successful upload of a file
    success(file, response) {
      console.log("File uploaded successfully");
      console.log("Response is ->", response);
    }
  },
  computed: {
    getTempAttachments() {
      return this.tempAttachments;
    },
    getAttachments() {
      return this.attachments;
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
