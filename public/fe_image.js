const url_upload = "/image/image_adapter"

function getFile(idInputFile){
    b = jQuery("#" + idInputFile);
    return b[0].files[0];
}
function uploadFile(idInputFile, cb){
    var a = new FormData();
    a.append('sampleFile', getFile(idInputFile))
    jQuery.ajax({
        url: url_upload,
        data: a,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function(data){
            if(typeof cb == "function"){
                cb(data);
            }
        }
    });
}

var Image = Backbone.Model.extend({
    urlRoot: "/api/images"
})

class CretaImage extends Image {
    constructor(id){
        super();
        console.log(id);
        this.onUpdateData = ()=>{};
        this.idFile = id;
    }
    upload = () => {
        var that = this;
        uploadFile(this.idFile, function(d){
            if(d.link){
                that.set("link", d.link);
                that.save({},{
                    success: function(){
                        that.onUpdateData();
                    }
                })
            }
        });
    }
}

Vue.component('upload_images', {
    props: [],
    data: function(){
        var id = Math.round(Math.random()*1000000);
        return {
            id: id.toString()
        }
    },
    methods: {
        model: {}
    },
    created: function(){
        console.log(this.id);
        this.model = new CretaImage(this.id);
    },
    template: `
        <div>
            <div class="mb-2">
                <input class="form-control" placeholder="Tiêu đề" v-model="model.attributes.title">    
            </div>
            <div class="">
                <input class="form-control" :id="id" type="file">
            </div>
            <div class="m-2 text-center">
                <button class="btn btn-primary" @click="model.upload()">Lưu</button>    
            </div>
        </div>
    `
})