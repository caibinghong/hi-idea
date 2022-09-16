<template>
    <div class="progress">
        <el-progress type="circle" :percentage="percentage" />
    </div>
</template>
<script >
import { ipcRenderer } from 'electron'
export default {
    data() {
        return {
            percentage: 0
        }
    },
    mounted() {
        ipcRenderer.on('downloadProgress', (e, arg) => {
            this.percentage.value = parseInt(arg.percent)
        })
    },
    methods: {

    }
}

</script>
<style lang='scss' scoped>
.progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
