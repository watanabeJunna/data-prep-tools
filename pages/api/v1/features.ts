import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

interface IRequest extends NextApiRequest {
    body: {
        filename: string
        features: string[][]
    }
}

export default ({body, method}: IRequest, res: NextApiResponse) => {
    if (method !== 'POST' && method !== 'PUT') {
        res.statusCode = 405
        res.end()
        return
    }

    if (!body.filename) {
        res.statusCode = 400
        res.end()
        return
    }

    if (method === 'POST') {
        if (!fs.existsSync(body.filename)) {
            res.statusCode = 404
            res.end()
            return
        }

        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200

        const text =  fs.readFileSync(body.filename, 'utf-8')
        const array = text.split('\n')

        res.end(JSON.stringify(array))
        return
    }

    if (method === 'PUT') {
        const featurestr: string = body.features.map((features: string[]) => { 
            return features.join(',')
        }).join('\n')

        fs.writeFileSync(body.filename , featurestr, {encoding: 'utf-8'})

        res.statusCode = 200
        res.end()
        return
    }
}