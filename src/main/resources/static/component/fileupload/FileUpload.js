// 定义一个名为 FileUpload 的 Vue 组件
const FileUpload = {
    name: 'FileUpload',
    // 组件的模板，定义了组件的 HTML 结构
    template: `
     <div class="inline-file-group">
        
        <div class="file-input">
         <label>
            <!-- 文件输入框，当选择文件发生变化时触发 handleFileChange 方法 -->
                <!-- accept 属性指定允许选择的文件类型 -->
             <input type="file" @change="handleFileChange($event)" accept=".pdf, .docx, .zip, .rar">
             <!-- 显示选择文件的图标和文本 -->
            <i class="fas fa-paperclip"></i> 选择文件
           </label><span>附件 (支持 PDF/DOCX/ZIP):</span>
        </div>
    </div>
    <!-- 当 uploadFile 对象的 fileUrl 属性存在时，显示文件预览和操作区域 -->
    <div v-if="uploadFile.fileUrl" class="preview">
    <!-- 显示上传文件的文件名 -->
       文件名: {{ uploadFile.fileUrl }}
       <a :href="uploadFile.fileUrl" style="margin-left: 8px" target="_blank">预览</a>
       <a :href="uploadFile.fileUrl" style="margin-left: 8px;margin-right: 8px" download>下载</a>
       <a href="javascript:void(0)" @click="deleteFile()">删除</a>
     </div>
    `,
    props: {
        // 定义一个名为 fileUrl 的属性，类型为对象，默认值为空对象
        fileUrl: {
            type: String, default: ''
        }
    },
    // 自定义事件
    emits: ['upload-success', 'delete-success'],
    setup(props, {emit}) {
        // 使用 reactive 创建一个响应式对象 uploadFile，用于存储上传文件的信息
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

        // 删除文件的方法
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
                    message.success('文件删除成功')
                    emit('delete-success');
                })
                .catch(error => {
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
            //确保在组件加载时，uploadFile.fileUrl 的值被正确初始化为 props.fileUrl 的初始值
            { immediate: true }
        );

        // 将 uploadFile 对象、handleFileChange 方法和 deleteFile 方法返回，供模板使用
        return {uploadFile, handleFileChange, deleteFile};
    }
};
