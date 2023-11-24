import { pdf2json } from "../middleware/pdf2json.js";
import * as fs from 'fs';

// DB
import { Business } from "../models/business.entity.js";
import { BusinessInformation } from "../models/businessInformation.entity.js";
import { AppDataSource } from "../models/dataSource.js";
import { RegularyMeeting } from "../models/regularyMeeting.entity.js";
import { Status } from "../models/status.entity.js";
import { Request, Response } from "express";
import { RegisterBusinessPlan } from "../dto/response.dto.js";

// busienssRepository 사업계획서
const business = AppDataSource.getRepository(Business);
const status = AppDataSource.getRepository(Status);
const businessInformation = AppDataSource.getRepository(BusinessInformation);
const regularyMeeting = AppDataSource.getRepository(RegularyMeeting);

export const enterprisePlan = async (req: Request, res: Response): Promise<RegisterBusinessPlan | unknown> => {
    try {
        const page = await pdf2json(req);

        const cover: string = page!.shift()
            ?? ''
        const page1 = page.join(' ')

        console.log(cover)
        console.log(page1)

        return new RegisterBusinessPlan(

        )
    } catch (err) {
        console.error(err);
        return err;
    }
}