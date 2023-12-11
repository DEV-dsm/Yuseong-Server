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

export type RegisterReportRes = {
    result: ResultReport,
    budget: BudgetRes,
    performance: PerformanceRes,
    changeStatus: ChangeStatus[],
    achievementStatus: AchievementStatus,
    usingResource: UsingResource
}

export type BudgetRes = {
    budgetSum: BudgetResult,
    execution: BudgetResult
}

export type PerformanceRes = {
        result: PerformanceResult,
        detail: PerformanceDetailRes
}

export type PerformanceDetailRes = {
    totalChance: PerformanceDetail,
    totalPeople: PerformanceDetail
}

export type RegisterPlanRes = {
    
}