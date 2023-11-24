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
import { pdf2json } from "../middleware/pdf2json.js";
import { Request, Response } from "express";

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
export const registerResultReport = async (req: Request, res: Response): Promise<RegisterReportRes | unknown> => {
    try {
        const page = await pdf2json(req);

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

        const cover: string = page!.shift()
            ?? '■ □ 사  업  명  :  ○ 자  부  담  제출자  ( 대표자 ):  ( 서명 / 날인 ) 작 성 자  ( 서명 / 날인 ) 연 락 처'
        const page1 = page.join(' ')

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
        const interestAccrued: number = page1
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

        /** */
        const totalChance: number[] = page1.split('총회수 ')[1].split('총인원 ')[0].split('회').map(x => Number(x.replaceAll(' ', '')))
        const totalPeople: number[] = page1.split('총인원 ')[1].split('사 업 변 경 현 황')[0].split('명').map(x => Number(x.replaceAll(' ', '')))

        /** 추진성과(회의) */
        const meeting: number[] = [
            totalChance[0],
            totalPeople[0]
        ]
        /** 추진성과(교육) */
        const education: number[] = [
            totalChance[1],
            totalPeople[1]
        ]
        /** 추진성과(워크숍) */
        const workshop: number[] = [
            totalChance[2],
            totalPeople[2]
        ]
        /** 추진성과(행사) */
        const festival: number[] = [
            totalChance[3],
            totalPeople[3]
        ]
        /** 추진성과(기타) */
        const etc: number[] = [
            totalChance[4],
            totalPeople[4]
        ].map(x => {
            if (!x) return 0
            else return x
        })

        /** 분야별 활동 총 횟수 */
        const performDetailTotalChance = await performanceDetail.save({
            reportId: id,
            meeting: meeting[0],
            education: education[0],
            workshop: workshop[0],
            festival: festival[0],
            etc: etc[0],
            total: Total.num
        })

        /** 분야별 활동 총 인원 */
        const performDetailTotalPeople = await performanceDetail.save({
            reportId: id,
            meeting: meeting[1],
            education: education[1],
            workshop: workshop[1],
            festival: festival[1],
            etc: etc[1],
            total: Total.people
        })


        // 꼭 고칠 부분 ( ~ 260 )

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

        const enums = page1.split('변화결과 모임  구성원  수  ')[1].split('2)  지역자원')[0]
        const changedMemberIf = enums.split('변화 감소')[1].split('핵심  주체')[0].replaceAll(' ', '').split('(⌵)')[0]
        const increaseMainIf = enums.split('주민 )  증가 ')[1].split(' 새롭게')[0].replaceAll(' ', '').split('(⌵)')[0]
        const increaseNewIf = enums.split('주민의  증가 ')[1].split(' 행정과의')[0].replaceAll(' ', '').split('(⌵)')[0]
        const changedRelationIf = enums.split('관계  변화')[1].replaceAll(' ', '').split('⌵')[0]

        const changedMember: Amount
            = changedMemberIf.includes('증가') ? Amount.increase
                : changedMemberIf.includes('변화없음') ? Amount.nothing : Amount.decrease
        const increaseMain: Amount
            = increaseMainIf.includes('증가') ? Amount.increase
                : increaseMainIf.includes('변화없음') ? Amount.nothing : Amount.decrease
        const increaseNew: Amount
            = increaseNewIf.includes('증가') ? Amount.increase
                : increaseNewIf.includes('변화없음') ? Amount.nothing : Amount.decrease
        const changedRelation: Related
            = changedRelationIf.includes('매우 그렇다') ? Related.veryTrue
                : changedRelationIf.includes('그렇다') ? Related.yes
                : changedRelationIf.includes('보통  이다') ? Related.normal
                : changedRelationIf.includes('그렇지  않다') ? Related.not
                : Related.veryDislike

        const achievementStatuses: AchievementStatus
            = await achievementStatus.save({
                id: page1Result.id,
                changedMember,
                increaseMain,
                increaseNew,
                changedRelation
        })

        /** 지역자원 활용 및 연계내용 */

        /** 함께하는 주민모임 또는 단체 내용 */
        const evaluation: string = page1.split('지역자원  활용  및  연계내용')[1].split('3)')[0]
        /** 공모사업 후 달라진 점 (보람된 / 알리고 싶은 일) */
        const changedAfter: string = page1.split('공모사업  후  달라진  점')[1].split('4)')[0]

        // 현재 pdf2json 라이브러리 기술 상의 이유로 문단 순서가 바뀌어서 전달됨에 따라 OCR 라이브러리로 교체 예정

        /** 어려운 혹은 제안하고 싶은 점 */
        const difficultOrSuggest: string = ''
        /** 앞으로 계획 */
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
    } catch (err : unknown) {
        // 에러처리
        console.error(err);
        return err;
    }
}