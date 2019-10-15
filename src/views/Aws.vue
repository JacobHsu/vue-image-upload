<template>
  <div class="s3">
    <h1>This s3 page</h1>
    {{imageUrl}}
    <div class="dropzone">
        
        <input 
        type="file" 
        class="input-file"
        @change="onUpload"
        ref="oneFileInput"
        >
        <!-- <button @click="$refs.oneFileInput.click()">Pick File Then Upload</button> -->
        <p v-if="!uploading && !imageData" class="call-to-action">
            Drag your files here
        </p>
        <img :src="imageData">
    </div>
     

  </div>
</template>

<script>
export default {
  name: 's3',
  data() {
    return {
      selectedFile: null,
      uploading: false,
      imageData:"",
      imageUrl:""
    }
  },
  created() {

    const albumBucketName = process.env.VUE_APP_S3_ALBUM_BUCKETNAME
    const bucketRegion = process.env.VUE_APP_S3_BUCKET_REGION
    const accessKeyId = process.env.VUE_APP_S3_ACCESS_KEYID
    const secretAccessKey = process.env.VUE_APP_S3_SECRET_ACCESSKEY

    AWS.config.update({
        region: bucketRegion,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        } 
    });

    var s3 = new AWS.S3({params: {Bucket: albumBucketName}});  //选择桶

    //listObjects     
    s3.listObjects(function(err, data) {
        console.log('listObjects')
        if (err) {
            console.log(err, err.stack); // an error occurred
            throw err;
        }
        console.log(data);           // successful response
        console.table(data.Contents)
        
    });

  },
  methods: {
    async onUpload() {
        const albumName = 'icon';
        const file = this.$refs.oneFileInput.files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + '/';
        var photoKey =  albumPhotosKey + fileName;

          if (file) {
              var reader = new FileReader();
              reader.onload = (e) => {
                  this.imageData = e.target.result;
              }
              reader.readAsDataURL(file);
          }

        const albumBucketName = process.env.VUE_APP_S3_ALBUM_BUCKETNAME
        const s3 = new AWS.S3({params: {Bucket: albumBucketName}});
        let putObjectPromise = await s3.upload({
            Key: photoKey,
            Body: file,
            ContentType: 'image/png',
            ACL: 'public-read'
        }, function(err, data) {
            if (err) {
                return alert('There was an error uploading your photo: ', err.message);
            }
            alert('Successfully uploaded photo.', data.Location);
            console.log('s3 data--->',data)
            console.log('image url:', data.Location)
            
        }).promise();
        let location = putObjectPromise.Location
        console.log('location',location )
        this.imageUrl = location

    }
  }
}
</script>
<style scoped>
    .dropzone {
        top: 50%;
        left: 42%;
        max-width: 200px;
        min-height: 200px;
        padding: 10px 10px;
        position: relative;
        cursor: pointer;
        outline: 2px dashed grey;
        outline-offset: -10px;
        background: lightcyan;
        color:dimgray;
        display: flex;
        align-items: center;
        justify-content: center;
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
</style>