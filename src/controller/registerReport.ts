// // console.log(decodeURI('%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B4%EA%B3%A0'))

// // Pages[].Texts[].R[0].T => decodeURI
// // Texts의 모든 배열 요소 스캔
// // R에는 배열 객체 1개만 존재

import Pdfparser from "pdf2json";
import fs from "fs";

const pdfParser = new Pdfparser();

const registerResultReport = async (req, res) => {
    try {
        const filename: string = req.file.originalname;

        pdfParser.on("pdfParser_dataError", errData => console.error(errData));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            fs.writeFileSync(`result/${filename.split('.')[0]}.json`, JSON.stringify(pdfData));
        })

        pdfParser.loadPDF(`upload/${filename}`);

        const file = await fs.readFileSync(`result/${filename.split('.')[0]}.json`).toString();
        const data = await JSON.parse(file)
        // data.Pages[0].Texts[i].R[0].T

        const pageLength = data.Pages.length
        const datas: string[] = [];

        for (let a = 0; a < pageLength; a++){
            const textLength = data.Pages[a].Texts.length
        const thisData = data.Pages[a].Texts
            for (let b = 0; b < textLength; b++) {
                datas.push(decodeURI(thisData[b].R[0].T));
            }
            datas.push('\n')
        }

        console.log(datas);
        fs.writeFileSync(`result/${filename.split('.')[0]}.txt`, datas.join(' '))

        return res.status(201).json({
            datas
        })
    } catch (err) {
        console.error(err);
        return err;
    }
}

export {
    registerResultReport,
}