import { configDotenv } from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { AchievementStatus } from "./achievementStatus.entity.js";
import { BudgetDetail } from "./budgetDetail.entity.js";
import { BudgetPlan } from "./budgetPlan.entity.js";
import { BudgetResult } from "./budgetResult.entity.js";
import { Business } from "./business.entity.js";
import { BusinessDetail } from "./businessDetail.entity.js";
import { BusinessInformation } from "./businessInformation.entity.js";
import { BusinessMapping } from "./businessMapping.entity.js";
import { BusinessPlan } from "./businessPlan.entity.js";
import { LocalResource } from "./localResource.entity.js";
import { OperationDetail } from "./operationDetail.entity.js";
import { PerformanceDetail } from "./performanceDetail.entity.js";
import { PerformanceResult } from "./performanceResult.entity.js";
import { PushResult } from "./pushResult.entity.js";
import { RegularyMeeting } from "./regularyMeeting.entity.js";
import { Resident } from "./resident.entity.js";
import { ResultReport } from "./resultReport.entity.js";
import { RunningRule } from "./runningRule.entity.js";
import { Status } from "./status.entity.js";
import { ChangeStatus } from "./changeStatus.entity.js";
import { UsingResource } from "./usingResource.entity.js";

configDotenv();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        AchievementStatus,
        Business,
        BusinessDetail,
        BusinessInformation,
        BusinessMapping,
        BusinessPlan,
        BudgetDetail,
        BudgetPlan,
        BudgetResult,
        PerformanceResult,
        LocalResource,
        OperationDetail,
        PerformanceDetail,
        PushResult,
        ChangeStatus,
        RegularyMeeting,
        Resident,
        ResultReport,
        RunningRule,
        Status,
        UsingResource,
    ],
    migrations: [],
    subscribers: [],
});