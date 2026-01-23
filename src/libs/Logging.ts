"use server"
import fs from "node:fs/promises";

/**
 * Log to file.
 * @param message something to log. (message, JSON ...)
 * @param fname filename
 * @returns True if ok. Else otherwise.
 */
export async function log(message: string, fname: string = "logs"): Promise<boolean> {
    try {
        const now = new Date();
        await fs.appendFile(process.cwd() + "/logs/" + fname, "\n\n" + now + "\n" + message);
    } catch (e) {
        return false;
    }
    
    return true;
}