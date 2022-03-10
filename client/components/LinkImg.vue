<template>
    <a :href="url" target="_blank" v-if="url" class="Card rounded p-2 px-3 bg-black-two bg-opacity-90 hover:bg-opacity-50 text-white flex space-x-1.5">
        <div class="mt-1">
            <img :src="urls">
        </div>
        <span class="linkName">{{this.extractRootDomain(this.url)}}</span>
    </a>
</template>

<script>
    export default {

        props:['url', 'name'],

        data(){
            return {
                urls: '',
            }
        },

        created(){
            this.urls = "https://www.google.com/s2/favicons?domain=" + this.url
        },

        methods:{
            extractRootDomain(url) {
                var domain = this.extractHostname(url),
                    splitArr = domain.split('.'),
                    arrLen = splitArr.length;
                //extracting the root domain here
                //if there is a subdomain 
                if (arrLen > 2) {
                    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
                    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
                    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
                        //this is using a ccTLD
                        domain = splitArr[arrLen - 3] + '.' + domain;
                    }
                }
                //remove '.com'
                var n = domain.indexOf('.');
                domain = domain.substring(0, n != -1 ? n : domain.length);
                //Uppercase first letter
                var x = domain.charAt(0).toUpperCase() + domain.slice(1);
                if(x == "Qq") {
                    x = domain.toUpperCase()
                }
                if(x === "Youtube" || x === "Apple" || x === "Huawei" || x === "Amazon" || x === "Line" || x === "QQ" || x === "Stingray") {
                    x = x + " Music"
                }
                if(url.includes('www.youtube')) {
                    x = 'Youtube'
                }
                return x;
            },
            
            extractHostname(url) {
                var hostname;
                //find & remove protocol (http, ftp, etc.) and get hostname

                if (url.indexOf("//") > -1) {
                    hostname = url.split('/')[2];
                }
                else {
                    hostname = url.split('/')[0];
                }

                //find & remove port number
                hostname = hostname.split(':')[0];
                //find & remove "?"
                hostname = hostname.split('?')[0];

                return hostname;
            },
        },
    }
</script>

<style>
@media screen and (max-width: 1024px) {
    .linkName {
        display: none !important;
    }
}
</style>