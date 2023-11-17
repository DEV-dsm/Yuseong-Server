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
import { BudgetRes, PerformanceDetailRes, PerformanceRes, RegisterReportRes } from "../dto/response.dto.js";

// 라이브러리 객체 생성
const pdfParser = new Pdfparser();

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
        /**
         * 결과 보고서 파일의 이름
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
        
        // 각 배열의 요소는 페이지
        // ex) 표지 = page[0]
        // ex) 1페이지 = page[1]
        /**
         * page 변수 : string 배열
         * 
         * 각 페이지에 있는 텍스트를 모두 모아 띄어쓰기를 구분자로 하여 저장
         */
        const page: string[] = await data.map(element => 
            element.Texts.map(
                text => decodeURIComponent(
                    text.R[0].T.toString().replaceAll('%2C', '')
                )).join(' ')
        )

        // 1페이지 내용 정리
        /**
         * 필요 내용
         * - 기획공모사업의 종류 (BusinessType ENUM)
         * - 결과보고서 표지 registerReport
         *    - 공동체명 clubName
         *    - 사업명 businessName
         *    - 제출일자 date
         *    - 대표자 leader
         *    - 작성자 writer
         *    - 연락처 phone
         */
        const cover = page[0]
        const page1 = page[1]

        const clubName: string = cover.split('■')[1].split('□')[0].replaceAll(' ', '')
        const businessName: string = cover.split('사  업  명  : ')[1].split(' ○')[0]
        const date: string[] = cover.split('자  부  담 ')[1].split(' 제출자')[0].split(' ').filter(x => x.match(/^[0-9].*$/g))
        const leader: string = cover.split('( 대표자 ):')[1].split('( 서명 / 날인 )')[0].replaceAll(' ', '');
        const writer: string = cover.split('작 성 자 ')[1].split(' ( 서명 / 날인 )')[0].replaceAll(' ', '');
        const phone: string = cover.split(' 연 락 처 ')[1].replaceAll('  ', '-')

        /**
         * 표지 내용 정리 (사업비 제외)
         */
        const page1Result = await resultReport.save({
            clubName,
            businessName,
            date: `${date[3]}-${date[4]}-${date[5]}`, // yyyy-mm-dd 형식
            leader,
            writer,
            phone
        })

        /**
         * 결과 보고서 id
         */
        const id = page1Result.id

        /** 
         * 보조금 
         * 
         * - [0] : 예산액
         * - [1] : 집행액
         * - [2] : 잔액 ([0] - [1])
         */
        const subsidy: number[] = cover.split('보  조  금 ')[1].split('자')[0].split(' ').map(x => Number(x))

        /**
         * 자부담
         * 
         * - [0] : 예산액
         * - [1] : 집행액
         * - [2] : 잔액 ([0] - [1])
         */
        const burden: number[] = cover.split('자  부  담 ')[1].split('년')[0].split(' ').map(x => Number(x))

        /**
         * 보조금 이자 발생액 (환수금액)
         */
        const interestAccrued: number = page[2]
            .split('( 환수  금액임 )')[1]
            .split(' ')
            .filter(x => x.match(/^\d?.*$/))
            .map(x => Number(x))[0]

        /**
         * 예산액
         */
        const budgetSum = await budgetResult.save({
            reportId: id,
            key: Key.budgetSum,
            subsidy: subsidy[0],
            burden: burden[0],
            interestAccrued
        })

        /**
         * 집행액
         */
        const execution = await budgetResult.save({
            reportId: id,
            key: Key.budgetSum,
            subsidy: subsidy[1],
            burden: burden[1],
            interestAccrued
        })

        /** 사업 종류 */
        const businessType: BusinessType = BusinessType.alleyEconomy

        /**기간 */
        const period: string = page1.split('사업기간 ')[1]?.split(' 사업지역')[0];

        /**지역*/
        const location: string = page1.split('사업지역 ')[1].split('추 진 성 과')[0].replaceAll('  ', ' ');

        /** 활동 결과 */
        const performResult = await performanceResult.save({
            id,
            businessType,
            period,
            location
        })

        /** 분야별 활동 총 횟수 */
        const performDetailTotalChance = await performanceDetail.save({
            reportId: id,
            meeting: 0,
            education: 0,
            workshop: 0,
            festival: 0,
            etc: 0,
            total: Total.num
        })

        /** 분야별 활동 총 인원 */
        const performDetailTotalPeople = await performanceDetail.save({
            reportId: id,
            meeting: 0,
            education: 0,
            workshop: 0,
            festival: 0,
            etc: 0,
            total: Total.people
        })

        const listOfString: string[] = page1
            .split('변경내용 ')[1].split('사 업 추 진 결 과')[0]
            .split(/([0-9]{2}\.[0-9]{2})/)
            .filter(x => x.length >= 2)
            
        const changeStatuses: ChangeStatus[] = [];
        
        for (let i = 0, j = listOfString.length; i < j; i+= 3){
            changeStatuses.push(await changeStatus.save({
                reportId: id,
                appliedDate: `${date[3]}.`,
                approvalDate: `${date[3]}`,
                changedContent: listOfString[i + 2].trim()
            }))
        }

        const changedMember: Amount = Amount.increase
        const increaseMain: Amount = Amount.decrease
        const increaseNew: Amount = Amount.decrease
        const changedRelation: Related = Related.normal

        const achievementStatuses: AchievementStatus
            = await achievementStatus.save({
                id: page1Result.id,
                changedMember,
                increaseMain,
                increaseNew,
                changedRelation
        })

        const evaluation: string = ''
        const changedAfter: string = ''
        const difficultOrSuggest: string = ''
        const nextPlan: string = ''

        const usingResources: UsingResource
            = await usingResource.save({
                id: page1Result.id,
                evaluation,
                changedAfter,
                difficultOrSuggest,
                nextPlan
        })

        const reportResult = new RegisterReportRes(
            page1Result,
            new BudgetRes(
                budgetSum,
                execution
            ),
            new PerformanceRes(
                performResult,
                new PerformanceDetailRes(
                    performDetailTotalChance,
                    performDetailTotalPeople
                )
            ),
            changeStatuses,
            achievementStatuses,
            usingResources
        )

        return res.status(201).json({
            "data": reportResult,
            "statusCode" : 201,
            "statusMsg" : 'Created'
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