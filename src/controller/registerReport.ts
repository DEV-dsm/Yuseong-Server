// // Pages[].Texts[].R[0].T => decodeURI
// // Texts의 모든 배열 요소 스캔
// // R에는 배열 객체 1개만 존재

import Pdfparser from "pdf2json";
import fs from "fs";
import { Business } from "../models/business.entity.js";
import { AppDataSource } from "../models/dataSource.js";
import { ResultReport } from "../models/resultReport.entity.js";
import { BusinessType } from "../enums/businessType.enum.js";
import { PerformanceResult } from "../models/performanceResult.entity.js";
import { PerformanceDetail } from "../models/performanceDetail.entity.js";
import { Total } from "../enums/total.enum.js";
import { BudgetResult } from "../models/budgetResult.entity.js";
import { Key } from "../enums/key.enum.js";

const pdfParser = new Pdfparser();

// businessRepository 사업신청서(게획서)

// resultRepository 결과보고서
const resultReport = AppDataSource.getRepository(ResultReport);
const budgetResult = AppDataSource.getRepository(BudgetResult);
const performanceResult = AppDataSource.getRepository(PerformanceResult);
const performanceDetail = AppDataSource.getRepository(PerformanceDetail);

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
            element.map(item => {
                if (item.includes(',')){
                    const index = element.findIndex(x => x === item)
                    element[index] = item.replaceAll(',', '')
                }
            })
            knowledge.push(element.toString().replaceAll(',', ' '))
        })

        fs.writeFileSync(`/Users/xii/Desktop/Project/Yuseong-Server/src/result/${filename.split('.')[0]}.txt`, knowledge.join('\n'))

        // 1페이지의 내용 정리
        const resultPage1 = knowledge[0].split('○');

        // 결과보고서 db 저장 1
        const result = await resultReport.save({
            clubName: resultPage1[2].split(': ')[1],
            businessName: resultPage1[3].split(': ')[1],
            date: new Date().toISOString(),
            leader: resultPage1[4].split('( 대표자 ): ')[1].replaceAll(' ( 서명 / 날인 )', '').replaceAll(' ', ''),
            writer: resultPage1[5].split('작 성 자 ')[1].replaceAll(' ( 서명 / 날인 )', '').replaceAll(' ', ''),
            phone: resultPage1[6].split('연 락 처 ')[1].replaceAll('  ', '-'),
        })

        // 보조금, 자부담
        const subsidy: number[] = []
        knowledge[0].split('보  조  금')[1].split('자  부  담')[0].split(' ').map(x => subsidy.push(Number(x)));
        const burden: number[] = [];
        knowledge[0].split('자  부  담')[1].split('   년')[0].split(' ').map(x => burden.push(Number(x)));

        console.log(subsidy, burden)

        // 예산액
        await budgetResult.save({
            id: result.id,
            subsidy: subsidy[1],
            burden: burden[1],
            key: Key.budgetSum
        })

        // 집행액
        await budgetResult.save({
            id: result.id,
            subsidy: subsidy[2],
            burden: burden[2],
            key: Key.execution
        })

        // 사업종류 구분
        let businessType: string = '';
        const thisIndex = knowledge[0].search('■');
        if (thisIndex === 35) businessType = BusinessType.yuseongMagic;
        else if (thisIndex == 49) businessType = BusinessType.villageMedia;
        else if (thisIndex == 71) businessType = BusinessType.alleyEconomy;
        else if (thisIndex == 91) businessType = BusinessType.sharePlace;
        else if (thisIndex == 107) businessType = BusinessType.livinglab;
        else if (thisIndex == 118) businessType = BusinessType.climateChange;
        else if (thisIndex == 134) businessType = BusinessType.careSystem;
        else if (thisIndex == 148) businessType = BusinessType.coronaBlue;

        // 기간, 지역 저장
        const period: string = knowledge[1].split('사업기간 ')[1].split(' 사업지역')[0];
        const location: string = knowledge[1].split('사업지역 ')[1].split('추 진 성 과')[0].replace('  ', ' ');

        // 저장
        await performanceResult.save({
            id: result.id,
            businessType,
            period,
            location,
        })

        // 총횟수 및 인원 값 구하기
        const resultChance: number[] = [];
        (knowledge[1].split('총회수 ')[1].split('총인원')[0].replaceAll(' ', '').split('회'))
            .map(x => resultChance.push(Number(x)));
        const resultPeople: number[] = [];
        (knowledge[1].split('총인원 ')[1].split('사 업 변 경')[0].replaceAll(' ', '').split('명'))
            .map(x => resultPeople.push(Number(x)));

        // 총횟수 저장
        await performanceDetail.save({
            id: result.id,
            meeting: resultChance[0],
            education: resultChance[1],
            workshop: resultChance[2],
            festival: resultChance[3],
            etc: resultChance[4] || 0,
            total: Total.num
        })

        // 총인원 저장
        await performanceDetail.save({
            id: result.id,
            meeting: resultPeople[0],
            education: resultPeople[1],
            workshop: resultPeople[2],
            festival: resultPeople[3],
            etc: resultPeople[4] || 0,
            total: Total.people
        })
        
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