import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

export default ({ body: { fileName }, method }: NextApiRequest, res: NextApiResponse): void => {
    if (method !== 'POST') {
        res.statusCode = 405
        res.end()
        return
    }

    if (!fileName) {
        res.statusCode = 400
        res.end()
        return
    }

    if (!fs.existsSync(fileName)) {
        res.statusCode = 404
        res.end()
        return
    }

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200

    const text =  fs.readFileSync(fileName as string , 'utf-8')
    const array = text.split('\n')

    res.end(JSON.stringify(array))
}