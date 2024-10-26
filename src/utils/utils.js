export function choose(array) {
	return array[randomNumber(0, array.length - 1, false)]
}

export function randomNumber(minimumNumber = 0, maximumNumber = 1, float = true, exacc = false) {
	let number = minimumNumber + (Math.random() * (maximumNumber - minimumNumber))
	if (!float) number = Math.round(number);
	if (exacc) return choose([minimumNumber, maximumNumber])
	return number;
}