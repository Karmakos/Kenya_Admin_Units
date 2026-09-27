

export function isNumber(number) {
    if (typeof (number) != "number") {
        return "The query parameters must be numbers"
    }

    return number;

}