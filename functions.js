export function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return regex.test(String(email).toLowerCase())
}
