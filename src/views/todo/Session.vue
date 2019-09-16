<template>
<div class="all-sessions">
    <section class="gather-infos">
        {{allSessions.length()}}
    </section>

    <section>

    </section>
</div>
</template>

<script>
export default {
    data(){
        return{
            allSessions:[
                {
                    desciption:"",
                    startTime: new Date().toLocaleString(),
                    endTime:new Date().toLocaleString(),
                    durantion: 20,
                    id:1,
                    startProgress:0,
                    endProgress:20,
                    finishProgress:20
                }
            ]
        }
    },
    computed:{
        
    }
}
</script>

<style scoped>

</style>