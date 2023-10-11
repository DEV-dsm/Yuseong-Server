// // Pages[].Texts[].R[0].T => decodeURI
// // Texts의 모든 배열 요소 스캔
// // R에는 배열 객체 1개만 존재

import Pdfparser from "pdf2json";
import fs from "fs";
import { Business } from "../models/business.entity.js";
import { AppDataSource } from "../models/dataSource.js";
import { ResultReport } from "../models/resultReport.entity.js";

const pdfParser = new Pdfparser();

// businessRepository 사업신청서(게획서)
const business = AppDataSource.getRepository(Business);

// resultRepository 결과보고서
const resultReport = AppDataSource.getRepository(ResultReport);

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
        const data = await JSON.parse(file).Pages // JSON 파싱

        const info: any[] = []; // 빈 배열 생성

        await data.map(element => { // 파싱한 데이터 디코딩해 배열에 넣기
            info.push(element.Texts.map(text => decodeURIComponent(text.R[0].T)));
            // decodeURI가 더 빠르지만 decodeURI에서는 디코딩하지 못하는 문자가 문서에 존재
        })

        // 보기 편하게 배열 -> String
        const knowledge: string[] = [];
        info.map(element => {
            element.toString().replaceAll(', ', ' ');
            knowledge.push(element.toString().replaceAll(',', ' '))
        })

        // 1페이지의 내용 정리
        const resultPage1 = knowledge[0].split('○');

        await resultReport.save({
            clubName: resultPage1[2].split(': ')[1],
            businessName: resultPage1[3].split(': ')[1],
            date: new Date().toISOString(),
            leader: resultPage1[4].split('( 대표자 ): ')[1].replaceAll(' ( 서명 / 날인 )', '').replaceAll(' ', ''),
            writer: resultPage1[5].split('작 성 자 ')[1].replaceAll(' ( 서명 / 날인 )', '').replaceAll(' ', ''),
            phone: resultPage1[6].split('연 락 처 ')[1].replaceAll('  ', '-'),
        })

        // 사업종류 구분
        const thisIndex = knowledge[0].search('■');

        return res.status(201).json({
            'data': knowledge
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