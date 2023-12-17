import * as fs from 'fs'
import EventEmitter from 'events';
import * as fflate from 'fflate'
import * as zlib from 'zlib'

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
        const dataStream = fs.readFileSync(`result/${filename.split('.')[0]}.txt`)
        fs.writeFileSync(`result/test.txt`, dataStream.toString('hex'))
        // stream : 73747265616d
        // endstream : 656e6473747265616d
        // Filter : 46696c746572
        // >> : 3e3e
        // << : 3c3c
        // 공백 : 20
        dataStream.toString('hex')
            .split('656e646f626a') // endobj
            .filter(x => x.includes('73747265616d') && x.includes('46696c746572')) // stream && Filter
            .map(async e => {
                const filter = e.split('46696c746572')[1].split('73747265616d')[0].replaceAll('20', '').split('2f')[1]
                const stream = e.split('3e3e')[1].split('3c3c')[0].replaceAll('20', '')

                if (filter.includes('466c6174654465636f6465')) { // FlateDecode
                    const bufferStream = Buffer.from(stream)
                    const decompress = zlib.inflateSync(bufferStream)
                }
            })
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

const decompress = (byteArray: string) => {
    const compressedData = Buffer.from(byteArray);

    const decompressedData = fflate.inflateSync(compressedData);
    const decompressedHexString = decompressedData.toString();

    return decompressedHexString;
}