import fs from 'fs'

export class File {
    encoding = 'utf-8'

    readLines = (fileName: string): string[] => {
        const text =  fs.readFileSync(fileName, this.encoding)

        return text.split('\n')
    }
}