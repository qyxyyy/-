// ChildComponent.js
// const { ref } = Vue;
// 定义 MenuComponent
const ImageUpload = {
    name: 'ImageUpload',
    template: `
     <div class="inline-file-group">
       
        <div class="file-input">
         <label>
             <input type="file" @change="handleFileChange($event)" accept="image/png, image/jpeg"/>
            <i class="fas fa-paperclip"></i> 选择图片
           </label> <span>(仅支持 PNG/JPG):</span>
        </div>
    </div>
    <div v-if="uploadFile.fileUrl" class="preview" style="margin-top: 5px">
          <img :src="uploadFile.fileUrl" alt="预览" style="max-width: 200px; max-height: 300px;">
          <div>
              <a :href="uploadFile.fileUrl" style="margin-right: 8px" target="_blank">预览</a>
             <a href="javascript:void(0)" @click="deleteFile()">删除</a>
                </div>
    </div>
        
    `,
    props: {
        // 定义一个名为 uploadFile 的属性，类型为对象，默认值为空对象
        fileUrl: {
            type: String,
            default: ''
        }
    },

    // 自定义事件
    emits: [ 'upload-success', 'delete-success'],
    // 接收props参数,通过解构获得 emit
    setup(props, {emit}) {
        // 使用 reactive 创建一个响应式对象 uploadFile，用于存储上传文件的信息
        // 初始时，filename 和 fileUrl 都为空
        const uploadFile = Vue.reactive({filename: '', fileUrl: ''});

        // 处理文件选择变化的方法
        const handleFileChange = (event) => {
            // 获取用户选择的文件
            const fileInput = event.target.files[0];
            // 如果用户没有选择文件，则直接返回，不进行后续操作
            if (!fileInput) return;
            // 创建一个 FormData 对象，用于处理文件上传
            const formData = new FormData();
            // 将选择的文件添加到 FormData 对象中
            formData.append('file', fileInput);
            // 使用 axios 发送 POST 请求到服务器的文件上传接口
            axios.post(`/api/file/upload`, formData, {
                // 设置请求头，指定请求体的内容类型为 multipart/form-data
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                // 保存上传的文件信息，将服务器返回的数据合并到 uploadFile 对象中
                Object.assign(uploadFile, response.data.data);
                // 每次选择文件后，清空文件输入框的值，以便下次选择相同文件时触发 change 事件
                event.target.value = null;
                // 向父组件发送上传成功的消息
                emit('upload-success', uploadFile);
            });
        };

        // 删除文件
        const deleteFile = () => {
            // 弹出确认框，让用户确认是否要删除文件
            if (!window.confirm(`确定要删除文件吗？`)) {
                // 如果用户取消删除操作，则直接返回，不进行后续操作
                return;
            }
            // 使用 axios 发送 DELETE 请求到服务器的文件删除接口
            axiosInstance.delete(`/api/file/delete`, {data: {
                fileName: uploadFile.fileUrl}
            })
                .then(res => {
                        // 将 uploadFile 对象的 filename 属性置为空字符串
                        uploadFile.fileUrl = '';
                        uploadFile.value={};
                        message.success('文件删除成功')
                        emit('delete-success');
                    } )
                .catch(error=>{
                    alert(`删除失败: ${error.response?.data?.message || '服务器错误'}`);
                 })
        };

        //  监听 props.fileUrl 的变化，并根据其值动态更新组件内部的 uploadFile.fileUrl
        Vue.watch(
            () => props.fileUrl,
            (newUrl) => {
                uploadFile.fileUrl = (newUrl && typeof newUrl === 'string')? newUrl:'';
            },
            // 即使 props.fileUrl 的初始值没有变化，也会在组件初始化时触发一次回调函数
            { immediate: true }
        );


        // 将 uploadFile 对象、handleFileChange 方法和 deleteFile 方法返回，供模板使用
        return {uploadFile, handleFileChange, deleteFile};
    }
};

