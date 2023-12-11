import * as fs from 'fs'
import EventEmitter from 'events';

export const bufferStream = async (req) => {
    /**
     * 파일의 이름
     */
    const filename: string = req.file.originalname;

    /** 읽어오는 스트림 */
    const readStream = await fs.createReadStream(`upload/${filename}`, {
        highWaterMark: 64,
    })
    /** 파일 작성 스트림 */
    const writeStream = await fs.createWriteStream(`result/${filename.split('.')[0]}.txt`)
    writeStream.setDefaultEncoding('hex')

    const data: any[] = []

    const event = new EventEmitter();
    event.on('read end', async () => {
        const dataStream = await fs.readFileSync(`result/${filename.split('.')[0]}.txt`)
        const objs = await dataStream
            .toString()
            .split('\r\n')
            .filter(x => !(x.includes('endobj')))
    })

    readStream.on('data', chunk => {
        data.push(chunk)
    }).on('end', () => {
        console.log('read end')
        event.emit('read end')
    }).on('error', err => {
        console.warn(err)
    })

    readStream.pipe(writeStream) // 파이프로 연결

    return ''
}