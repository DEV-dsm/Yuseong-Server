import { Amount } from "../enums/amount.enum.js"
import { BusinessType } from "../enums/businessType.enum.js"
import { Key } from "../enums/key.enum.js"
import { Related } from "../enums/related.enum.js"
import { Total } from "../enums/total.enum.js"
import { AchievementStatus } from "../models/achievementStatus.entity.js"
import { BudgetResult } from "../models/budgetResult.entity.js"
import { ChangeStatus } from "../models/changeStatus.entity.js"
import { PerformanceDetail } from "../models/performanceDetail.entity.js"
import { PerformanceResult } from "../models/performanceResult.entity.js"
import { ResultReport } from "../models/resultReport.entity.js"
import { UsingResource } from "../models/usingResource.entity.js"

export class RegisterReportRes{
    constructor(
        result: ResultReport,
        budget: BudgetRes,
        performance: PerformanceRes,
        changeStatus: ChangeStatus[],
        achievementStatus: AchievementStatus,
        usingResource: UsingResource
    ) {
        this.result = result
        this.budget = budget
        this.performance = performance
        this.changeStatus = changeStatus
        this.achievementStatus = achievementStatus
        this.usingResource = usingResource
    }
    result: ResultReport
    budget: BudgetRes
    performance: PerformanceRes
    changeStatus: ChangeStatus[]
    achievementStatus: AchievementStatus
    usingResource: UsingResource
}

class ResultRes {
    constructor(
        clubName: string,
        businessName: string,
        date: string,
        leader: string,
        writer: string,
        phone: string
    ) {
        this.clubName = clubName
        this.businessName = businessName
        this.date = date
        this.leader = leader
        this.writer = writer
        this.phone = phone
    }
    clubName: string
    businessName: string
    date: string
    leader: string
    writer: string
    phone: string
}

export class BudgetRes {
    constructor(
        budgetSum: BudgetResult,
        execution: BudgetResult
    ) {
        this.budgetSum = budgetSum
        this.execution = execution
    }
    budgetSum: BudgetResult
    execution: BudgetResult
}
class BudgetResultRes {
    constructor(
        reportId: number,
        key: Key,
        subsidy: number,
        burden: number,
        interestAccrued: number
    ) {
        this.reportId = reportId
        this.key = key
        this.subsidy = subsidy
        this.burden = burden
        this.interestAccrued = interestAccrued
    }
    reportId: number
    key: Key
    subsidy: number
    burden: number
    interestAccrued: number
}

export class PerformanceRes {
    constructor(
        result: PerformanceResult,
        detail: PerformanceDetailRes
    ) {
        this.result = result
        this.detail = detail
    }
    result: PerformanceResult
    detail: PerformanceDetailRes
}
class PerformResultRes {
    constructor(
        id: number,
        businessType: BusinessType,
        period: string,
        location: string
    ) {
        this.id = id
        this.businessType = businessType
        this.period = period
        this.location = location
    }
    id: number
    businessType: BusinessType
    period: string
    location: string
}
class PerformDetailRes {
    constructor(
        reportId: number,
        meeting: number,
        education: number,
        workshop: number,
        festival: number,
        etc: number,
        total: Total
    ) {
        this.reportId = reportId
        this.meeting = meeting
        this.education = education
        this.workshop = workshop
        this.festival = festival
        this.etc = etc
        this.total = total
    }
    reportId: number
    meeting: number
    education: number
    workshop: number
    festival: number
    etc: number = 0
    total: Total
}
export class PerformanceDetailRes{
    constructor(
        totalChance: PerformanceDetail,
        totalPeople: PerformanceDetail
    ) {
        this.totalChance = totalChance
        this.totalPeople = totalPeople
    }
    totalChance: PerformanceDetail
    totalPeople: PerformanceDetail
}

class ChangeStatusRes {
    constructor(
        reportId: number,
        appliedDate: string,
        approvalDate: string,
        changedContent: string
    ) {
        this.reportId = reportId
        this.appliedDate = appliedDate
        this.approvalDate = approvalDate
        this.changedContent = changedContent
    }
    reportId: number
    appliedDate: string
    approvalDate: string
    changedContent: string
}

class AchievementStatusRes {
    constructor(
        id: number,
        changedMember: Amount,
        increaseMain: Amount,
        increaseNew: Amount,
        changedRelation: Related
    ) {
        this.id = id
        this.changedMember = changedMember
        this.increaseMain = increaseMain
        this.increaseNew = increaseNew
        this.changedRelation = changedRelation
    }
    id: number
    changedMember: Amount
    increaseMain: Amount
    increaseNew: Amount
    changedRelation: Related
}

class UsingResourceRes {
    constructor(
        id: number,
        evaluation: string,
        changedAfter: string,
        difficultOrSuggest: string,
        nextPlan: string
    ) {
        this.id = id
        this.evaluation = evaluation
        this.changedAfter = changedAfter
        this.difficultOrSuggest = difficultOrSuggest
        this.nextPlan = nextPlan
    }
    id: number
    evaluation: string
    changedAfter: string
    difficultOrSuggest: string
    nextPlan: string
}