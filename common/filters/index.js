

export  function filterNum (val) {
	if (val) {
		let words = (Math.floor(val) + '').split('');
		let res = '';
		if (words.length <= 4) {
			res = val;
		}
		if (words.length === 5) {
			res = words[0] + "." + words[1] + '万';
		}
		if (words.length === 6) {
			res = words[0] + words[1] + "." + words[2] + '万';
		}
		if (words.length === 7) {
			res = words[0] + words[1] + words[2] + "." + words[3] + '万';
		}
		if (words.length === 8) {
			res = words[0] + words[1] + words[2] + words[3] + "." + words[4] + '万';
		}
		if (words.length === 9) {
			res = words[0] + "." + words[1] + '亿';
		}
		if (words.length === 10) {
			res = words[0] + words[1] + "." + words[2] + '亿';
		}
		return res;
	} else {
		return val;
	}
}