<template>
	<a
		:href="checkUrl()"
		target="_blank"
		class="flex items-center px-3 py-2 hover:bg-background hover:drop-shadow-2xl transition-all ease-in-out duration-300"
	>
		<component :is="icon" class="w-5 h-5"></component>
		<p class="hidden md:block">{{ text }}</p>
	</a>
</template>

<script>
export default {
	name: "CbExternalLink",

	props: {
		href: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			icon: "",
			text: "",
		};
	},

	created() {
		this.selectIcon();
	},

	methods: {
		checkUrl() {
			if (this.href.includes("https")) {
				return this.href;
			} else {
				return `https://${this.href}`;
			}
		},

		selectIcon() {
			if (this.href.includes("youtube") && this.href.includes("music.")) {
				this.icon = "icons-youtube-music";
				this.text = "Youtube Music";
			} else if (this.href.includes("youtube")) {
				this.icon = "icons-youtube";
				this.text = "Youtube";
			} else if (this.href.includes("apple") && this.href.includes("music")) {
				this.icon = "icons-apple-music";
				this.text = "Apple Music";
			} else if (this.href.includes("spotify")) {
				this.icon = "icons-spotify";
				this.text = "Spotify";
			} else if (this.href.includes("tidal")) {
				this.icon = "icons-tidal";
				this.text = "Tidal";
			} else if (this.href.includes("soundcloud")) {
				this.icon = "icons-soundcloud";
				this.text = "Soundcloud";
			} else if (this.href.includes("facebook")) {
				this.icon = "icons-facebook";
				this.text = "Facebook";
			} else if (this.href.includes("instagram")) {
				this.icon = "icons-instagram";
				this.text = "Instagram";
			} else if (this.href.includes("twitter")) {
				this.icon = "icons-twitter";
				this.text = "Twitter";
			} else if (this.href.includes("tiktok")) {
				this.icon = "icons-tiktok";
				this.text = "Tiktok";
			} else if (this.href.includes("snapchat")) {
				this.icon = "icons-snapchat";
				this.text = "Snapchat";
			} else if (this.href.includes("weibo")) {
				this.icon = "icons-weibo";
				this.text = "Weibo";
			} else {
				this.icon = "icons-unknow";
				this.text = this.extractRootDomain(this.href);
			}
		},
		extractRootDomain(url) {
			var domain = this.extractHostname(url),
				splitArr = domain.split("."),
				arrLen = splitArr.length;
			//extracting the root domain here
			//if there is a subdomain
			if (arrLen > 2) {
				domain = splitArr[arrLen - 2] + "." + splitArr[arrLen - 1];
				//check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
				if (
					splitArr[arrLen - 2].length == 2 &&
					splitArr[arrLen - 1].length == 2
				) {
					//this is using a ccTLD
					domain = splitArr[arrLen - 3] + "." + domain;
				}
			}
			//remove '.com'
			var n = domain.indexOf(".");
			domain = domain.substring(0, n != -1 ? n : domain.length);
			//Uppercase first letter
			var x = domain.charAt(0).toUpperCase() + domain.slice(1);
			if (x == "Qq") {
				x = domain.toUpperCase();
			}
			if (
				x === "Youtube" ||
				x === "Apple" ||
				x === "Huawei" ||
				x === "Amazon" ||
				x === "Line" ||
				x === "QQ" ||
				x === "Stingray"
			) {
				x = x + " Music";
			}
			if (url.includes("www.youtube")) {
				x = "Youtube";
			}
			return x;
		},

		extractHostname(url) {
			var hostname;
			//find & remove protocol (http, ftp, etc.) and get hostname

			if (url.indexOf("//") > -1) {
				hostname = url.split("/")[2];
			} else {
				hostname = url.split("/")[0];
			}

			//find & remove port number
			hostname = hostname.split(":")[0];
			//find & remove "?"
			hostname = hostname.split("?")[0];

			return hostname;
		},
	},
};
</script>