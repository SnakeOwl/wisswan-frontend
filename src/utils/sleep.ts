/**
 * 
 * @param miliseconds 
 * @returns 
 * 
 * @example
 * async function demo() {
    for (let i = 0; i < 5; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
    }
    console.log('Done');
}
 */
export default function sleep(miliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}