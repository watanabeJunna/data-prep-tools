import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

interface IRequest {
    body: {
        fileName: string
        vector?: string[][]
    }
}

export default ({ body: { fileName, vector }, method }: NextApiRequest & IRequest, res: NextApiResponse): void => {
    if (method !== 'POST' && method !== 'PUT') {
        res.statusCode = 405
        res.end()
        return
    }

    if (!fileName) {
        res.statusCode = 400
        res.end()
        return
    }

    if (method === 'POST') {
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
        return
    }

    if (method === 'PUT') {
        const strArray: string = vector
                                    .map((features: string[]) => features.join(','))
                                    .join('\n')

        fs.writeFileSync(fileName as string , strArray, {encoding: 'utf-8'})

        res.statusCode = 200
        res.end()
        return
    }
}