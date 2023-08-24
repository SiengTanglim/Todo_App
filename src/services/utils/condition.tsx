export function checkPhoneNumber(phoneNumber: string) {
    if (phoneNumber.trim().length === 0 || phoneNumber.trim().length < 8) {
        return false;
    }
    let phone_number = phoneNumber;
    if (phone_number.charAt(0) === '0') {
        phone_number = phone_number.substring(1, phone_number.length);
    }
    return phone_number;
}
