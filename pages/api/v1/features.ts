import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

interface IRequest {
    body: {
        filename: string
        features?: string[][]
    }
}

export default ({ body: { filename, features }, method }: NextApiRequest & IRequest, res: NextApiResponse) => {
    if (method !== 'POST' && method !== 'PUT') {
        res.statusCode = 405
        res.end()
        return
    }

    if (!filename) {
        res.statusCode = 400
        res.end()
        return
    }

    if (method === 'POST') {
        if (!fs.existsSync(filename)) {
            res.statusCode = 404
            res.end()
            return
        }

        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200

        const text =  fs.readFileSync(filename as string, 'utf-8')
        const array = text.split('\n')

        res.end(JSON.stringify(array))
        return
    }

    if (method === 'PUT') {
        const strArray: string = features.map((features: string[]) => { 
            return features.join(',')
        }).join('\n')

        fs.writeFileSync(filename as string , strArray, {encoding: 'utf-8'})

        res.statusCode = 200
        res.end()
        return
    }
}