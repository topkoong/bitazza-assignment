export const formatNumber = (n) => {
	if (n && n.toLocaleString) {
		return n.toLocaleString('th-TH', {
			minimumFractionDigits: 2,
		});
	} else {
		return n;
	}
};
