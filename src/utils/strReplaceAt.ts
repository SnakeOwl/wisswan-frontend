export default function strReplaceAt(str: string, index: number, replace: string) {
    return str.substring(0, index) + replace + str.substring(index + replace.length);
}
