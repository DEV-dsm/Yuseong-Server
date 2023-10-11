// // Pages[].Texts[].R[0].T => decodeURI
// // Texts의 모든 배열 요소 스캔
// // R에는 배열 객체 1개만 존재

import Pdfparser from "pdf2json";
import fs from "fs";

const pdfParser = new Pdfparser();

// 결과 보고서 분석 및 저장
const registerResultReport = async (req, res) => {
    try {
        const filename: string = req.file.originalname; // 파일 이름 가져오기

        pdfParser.on("pdfParser_dataError", errData => console.error(errData)); // 예외 처리
        pdfParser.on("pdfParser_dataReady", pdfData => {
            // pdf를 읽고 json으로 분석
            fs.writeFileSync(`result/${filename.split('.')[0]}.json`, JSON.stringify(pdfData));
        })
    
        pdfParser.loadPDF(`upload/${filename}`); // pdf 데이터 가져오기

        const file = fs.readFileSync(`result/${filename.split('.')[0]}.json`).toString(); // JSON 파일 읽고 String으로 전환
        const data = await JSON.parse(file) // JSON 파싱
        // data.Pages[0].Texts[i].R[0].T

        const info: string[][] = []; // 빈 배열 생성

        await data.map(element => { // 파싱한 데이터 디코딩해 배열에 넣기
            info.push(element.Texts.map(text => decodeURIComponent(text.R[0].T)));
            // decodeURI가 더 빠르지만 decodeURI에서는 디코딩하지 못하는 문자가 문서에 존재
            info.push(['\n'])
        })

        // 보기 편하게 배열 -> String
        const knowledge: string = info.map(element => element.join(' ')).toString();

        // txt 파일 작성 (테스팅 결과 확인용)
        fs.writeFileSync(`result/${filename.split('.')[0]}.txt`, knowledge)

        return res.status(201).json({
            'qwer': knowledge.split('\n')
        })
    } catch (err) {
        // 에러처리
        console.error(err);
        return err;
    }
}

export {
    registerResultReport,
}