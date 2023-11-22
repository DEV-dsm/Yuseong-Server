// 라이브러리
import Pdfparser from "pdf2json";
import fs from "fs";

// DB
import { AppDataSource } from "../models/dataSource.js";
import { ResultReport } from "../models/resultReport.entity.js";
import { BusinessType } from "../enums/businessType.enum.js";
import { PerformanceResult } from "../models/performanceResult.entity.js";
import { PerformanceDetail } from "../models/performanceDetail.entity.js";
import { Total } from "../enums/total.enum.js";
import { BudgetResult } from "../models/budgetResult.entity.js";
import { Key } from "../enums/key.enum.js";
import { ChangeStatus } from "../models/changeStatus.entity.js";
import { PushResult } from "../models/pushResult.entity.js";
import { AchievementStatus } from "../models/achievementStatus.entity.js";
import { UsingResource } from "../models/usingResource.entity.js";
import { Amount } from "../enums/amount.enum.js"
import { Related } from "../enums/related.enum.js";

// 라이브러리 객체 생성
const pdfParser = new Pdfparser();

// businessRepository 사업신청서(게획서)

// resultRepository 결과보고서
const resultReport = AppDataSource.getRepository(ResultReport);
const budgetResult = AppDataSource.getRepository(BudgetResult);
const performanceResult = AppDataSource.getRepository(PerformanceResult);
const performanceDetail = AppDataSource.getRepository(PerformanceDetail);
const changeStatus = AppDataSource.getRepository(ChangeStatus);
const pushResult = AppDataSource.getRepository(PushResult);
const achievementStatus = AppDataSource.getRepository(AchievementStatus);
const usingResource = AppDataSource.getRepository(UsingResource);

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

        // 보기 편하게 배열 -> String
        const info: any[] = [];

        await data.map(element => { // 파싱한 데이터 디코딩해 배열에 넣기
            const list: string[] = [];
            // 페이지 1개 = 배열 1개
            element.Texts.map(text => {
                let thisText = text.R[0].T.toString();
                thisText = thisText.replaceAll('%2C', '');
                list.push(decodeURIComponent(thisText));
            });
            // 모든 페이지 배열을 한데로 모음
            info.push(list.toString().replaceAll(',', ' '));
            // decodeURI가 더 빠르지만 decodeURI에서는 디코딩하지 못하는 문자가 문서에 존재
        })
        
        // 배열의 0번째 제외하고 다 합칠 방법?
        const infolength = info.length;
        let knowledge = [info[0], '']
        for (let i = 1; i < infolength; i++){
            knowledge[1] = knowledge[1].concat(info[i]);
        }
        
        // 사진 자료 포함된 도표가 분석 중간에 끼어듬
        knowledge[1] = knowledge[1].replace('사 업 운 영 사 진 세부사업 ① 세부사업 ② 세부사업 ③ ', '');

        fs.writeFileSync(`result/${filename.split('.')[0]}.txt`, knowledge.join('\n'))

        // 1페이지의 내용 정리
        const resultPage1 = knowledge[0].split('○');
        const thisDate = knowledge[0].split('자  부  담')[1].split(' 제출자')[0].split(' ').filter(x => x.length >= 1).map(x => Number(x))

        // 결과보고서 db 저장 1
        const result = await resultReport.save({
            clubName: resultPage1[2].split(': ')[1],
            businessName: resultPage1[3].split(': ')[1],
            date: new Date(thisDate[3], thisDate[5] - 1, thisDate[7]).toLocaleDateString(),
            leader: resultPage1[4].split('( 대표자 ): ')[1].replaceAll(' ( 서명 / 날인 )', '').replaceAll(' ', ''),
            writer: resultPage1[5].split('작 성 자 ')[1].replaceAll(' ( 서명 / 날인 )', '').replaceAll(' ', ''),
            phone: resultPage1[6].split('연 락 처 ')[1].replaceAll('  ', '-'),
        })

        // 보조금, 자부담
        const subsidy: number[] = []
        knowledge[1].split('보조금')[1].split('자부담')[0].split(' 원 ').filter(x => !x.includes('%')).map(x => subsidy.push(Number(x)));
        const burden: number[] = [];
        knowledge[1].split('자부담')[1].split('합계')[0].split(' 원 ').filter(x => !x.includes('%')).map(x => burden.push(Number(x)));
        const interestAccrued = Number(knowledge[1].split('( 환수  금액임 )')[1].split('원')[0].replaceAll(' ', '').trim());

        // 예산액
        const budgetSum = await budgetResult.save({
            reportId: result.id,
            key: Key.budgetSum,
            subsidy: subsidy[0],
            burden: burden[0],
            interestAccrued,
        })

        // 집행액
        const execution = await budgetResult.save({
            reportId: result.id,
            key: Key.execution,
            subsidy: subsidy[1],
            burden: burden[1],
            interestAccrued,
        })

        // 사업종류 구분
        const businessType = knowledge[0].split('■')[1].split('□')[0].trim().replaceAll('  ', '');

        // 기간, 지역 저장
        const period: string = knowledge[1].split('사업기간 ')[1].split(' 사업지역')[0];
        const location: string = knowledge[1].split('사업지역 ')[1].split('추 진 성 과')[0].replace('  ', ' ');

        // 저장
        const performance = await performanceResult.save({
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
        const totalNum = await performanceDetail.save({
            reportId: result.id,
            meeting: resultChance[0],
            education: resultChance[1],
            workshop: resultChance[2],
            festival: resultChance[3],
            etc: resultChance[4] || 0,
            total: Total.num
        })

        // 총인원 저장
        const totalPeople = await performanceDetail.save({
            reportId: result.id,
            meeting: resultPeople[0],
            education: resultPeople[1],
            workshop: resultPeople[2],
            festival: resultPeople[3],
            etc: resultPeople[4] || 0,
            total: Total.people
        })

        // 2페이지 - 사업변경현황
        const resultPage2 = knowledge[1].split('변경내용 ')[1].split('사 업 추 진 결 과')[0]
            .split(/([0-9]{2}\.[0-9]{2})/).filter(x => x.length >= 2);

        let change: object[] = [];
        for (let index = 0; index < resultPage2.length; index += 3){
            const thisDate = new Date().toLocaleDateString(); // 현재 날짜 기준
            // 신청일자
            const appliedDate = thisDate.replaceAll(/\. [0-9]{2}\. [0-9]{2}/g, `.${resultPage2[index]}`);
            // 승인일자
            const approvalDate = thisDate.replaceAll(/\. [0-9]{2}\. [0-9]{2}/g, `.${resultPage2[index + 1]}`);

            change.push(await changeStatus.save({
                reportId: result.id,
                appliedDate: appliedDate.toLocaleString(),
                approvalDate: approvalDate.toLocaleString(),
                changedContent: resultPage2[index + 2].trim(),
            }))
        }

        const businessPush = knowledge[1].split('추진내용  및  방법 자체평가')[1].split('사 업 비 정 산 구  분')[0].trim();

        const checkEnterprise = knowledge[1].split('변화결과')[1].split('2)')[0].replaceAll(' ', '') // 사업 평가

        const changeMoim = checkEnterprise.split('모임구성원수변화')[1].split('핵심주체')[0].split('⌵')[0] // 모임 구성원수 변화
        const increaseMain = checkEnterprise.split('(모임을이끄는주민)증가')[1].split('새롭게')[0].split('⌵')[0] // 핵심주체
        const newResidentIncrease = checkEnterprise.split('주민의증가')[1].split('행정과의관계변화')[0].split('⌵')[0] // 새롭게 참여하는 주민의 증가
        const changedRelation = checkEnterprise.split('행정과의관계변화')[1].split('⌵')[1]; // 행정과의 관계 변화

        const thisSave = await achievementStatus.save({
            id: result.id,
            changedMember: changeMoim.includes('증가') ?  Amount.increase : changeMoim.includes('변화없음') ? Amount.nothing : Amount.decrease,
            increaseMain: increaseMain.includes('증가') ? Amount.increase : increaseMain.includes('변화없음') ? Amount.nothing : Amount.decrease,
            increaseNew: newResidentIncrease.includes('증가') ? Amount.increase : newResidentIncrease.includes('변화없음') ? Amount.nothing : Amount.decrease,
            changedRelation: changedRelation.includes('매우') ? (changedRelation.includes('않다') ? Related.veryDislike : Related.veryTrue) : changedRelation.includes('그렇지') ? (changedRelation.includes('않다') ? Related.not : Related.yes) : Related.normal,
        })

        // const local = knowledge[1].split('지역자원  활용  및  연계내용')[1] // 지역 자원 연계 및 활용 방안 : 구분자 X

        const evaluation = knowledge[1].split('진행 지역과  연계  활동에  대한  총평')[1].split('3)')[0];
        const changedAfter = knowledge[1].split('알리고  싶은  일 )')[1].split('4)')[0].replaceAll('※ 공동체  변화사례  제시  /  마을의  변화  또는  구성원들의  변화', '')
        const difficultOrSuggest = knowledge[1].split('4)')[1]
        const nextPlan = knowledge[1].split('5)')[1]

        const resource = await usingResource.save({
            id: result.id,
            evaluation,
            changedAfter,
            difficultOrSuggest,
            nextPlan
        })

        // await pushResult.save({
        //     id: result.id,
        //     businessName: '',
        //     businessResult: '',
        //     method: '',
        //     evaluation: ''
        // })



        return res.status(201).json({
            'data': {
                result,
                'budget' : {
                    budgetSum,
                    execution,
                },
                performance,
                'total': {
                    totalNum,
                    totalPeople,
                },
                'changeStatus': change,
                'achievementStatus': thisSave,
                'usingResource' : resource
            }
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