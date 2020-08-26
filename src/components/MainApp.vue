<template>
    <div>
        <vs-row vs-type="flex" class="mt-5">
            <vs-col vs-w="4" vs-offset="4" vs-type="flex">
                <vs-card>
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <input ref="file" type="file" hidden name="profile_image" v-on:change="handleFileInput">
                            <vs-button :disabled="start_uploading" @click="$refs.file.click()" class="text-center m-3"
                                       color="primary" type="border"
                                       icon="backup">UPLOAD YOUR FILE
                            </vs-button>
                        </vs-col>
                    </vs-row>
                    <vs-row>
                        <vs-col>
                            <vs-progress v-show="start_uploading" :percent="uploadPercentage" color="primary">primary
                            </vs-progress>
                        </vs-col>
                    </vs-row>


                    <vs-row v-if="metrics" class="mt-5 p-2">
                        <vs-col>
                            <vs-table :data="metrics">
                                <template slot="header">
                                    <vs-row v-if="mete_data">
                                        <img :src="mete_data['icon_path']" width="50" height="50">
                                        <h5 class="mt-3">{{mete_data["lng_name"]}}</h5>
                                    </vs-row>
                                </template>
                                <template slot="thead">
                                    <vs-th>
                                        METER
                                    </vs-th>
                                    <vs-th>
                                        VALUE
                                    </vs-th>
                                </template>

                                <template slot-scope="{data}">
                                    <vs-tr :state="'primary'" :key="indextr" v-for="(tr, indextr) in data">
                                        <vs-td :data="data[indextr].metric">
                                            {{data[indextr].metric}}
                                        </vs-td>

                                        <vs-td :data="data[indextr].value">
                                            {{data[indextr].value}}
                                        </vs-td>

                                    </vs-tr>
                                </template>
                            </vs-table>
                        </vs-col>
                    </vs-row>


                </vs-card>
            </vs-col>
        </vs-row>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'MainApp',
        props: {
            msg: String
        },
        data() {
            return {
                start_uploading: false,
                uploadPercentage: 0.0,
                mete_data: null,
                metrics: null
            }
        },
        methods: {
            handleFileInput(e) {
                console.log("file")

                this.start_uploading = true;
                this.$vs.loading()


                print(e.target.files[0]);
                let formData = new FormData();
                formData.append('sloc_file', e.target.files[0]);
                axios.post("/api/sloc/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                        console.log(this.uploadPercentage)
                    }
                }).then(response => {
                    this.$vs.loading.close()

                    console.log(response)
                    this.mete_data = response.data["mata_data"]
                    this.metrics = response.data["data"]
                    this.start_uploading = false;
                    this.uploadPercentage = 0;


                }).catch(err => {
                    this.$vs.loading.close()

                    console.log(err)
                    this.start_uploading = false;
                })

            },
        }
    }
</script>

<style scoped>

</style>
