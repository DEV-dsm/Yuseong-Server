import Pdfparser from "pdf2json";
import * as fs from "fs";

// 라이브러리 객체 생성
const pdfParser = new Pdfparser();

export const pdf2json = async (req) => {
    /**
     * 파일의 이름
     */
    const filename: string = req.file.originalname;

    pdfParser.on("pdfParser_dataError", errData => console.error(errData)); // 예외 처리
    pdfParser.on("pdfParser_dataReady", pdfData => {
        // pdf를 읽고 json으로 분석
        fs.writeFileSync(`result/${filename.split('.')[0]}.json`, JSON.stringify(pdfData));
    })

    pdfParser.loadPDF(`upload/${filename}`); // pdf 데이터 가져오기

    /**
     * JSON 파일을 읽고 String으로 변환하여 저장
     */
    const fileContentsToString = fs.readFileSync(`result/${filename.split('.')[0]}.json`).toString();
    /**
     * JSON -> String으로 변환된 데이터를 파싱해 Pages 요소의 값을 저장
     */
    const data = await JSON.parse(fileContentsToString).Pages // JSON 파싱
    const write: string = await data.map(e => {
        e.Texts.map(
            t => decodeURIComponent(
                        t.R[0].T.toString().replaceAll('%2C', '')
                    )
                ).join(' ')
        }).join('\n')
    fs.writeFileSync(`result/${filename.split('.')[0]}.txt`, write);

    // 각 배열의 요소는 페이지
    // ex) 표지 = page[0]
    // ex) 1페이지 = page[1]
    /**
     * page 변수 : string 배열
     * 
     * 각 페이지에 있는 텍스트를 모두 모아 띄어쓰기를 구분자로 하여 저장
     */
    return await data.map(element => 
        element.Texts.map(
            text => decodeURIComponent(
                text.R[0].T.toString().replaceAll('%2C', '')
            )).join(' ')
    )
}