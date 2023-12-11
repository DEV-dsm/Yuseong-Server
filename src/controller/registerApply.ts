import { pdf2json } from "../middleware/pdf2json.js";
import * as fs from 'fs';

// DB
import { Business } from "../models/business.entity.js";
import { BusinessInformation } from "../models/businessInformation.entity.js";
import { AppDataSource } from "../models/dataSource.js";
import { RegularyMeeting } from "../models/regularyMeeting.entity.js";
import { Status } from "../models/status.entity.js";
import { Request, Response } from "express";
import { RegisterPlanRes } from "../dto/response.dto.js";
import { bufferStream } from "../middleware/bufferStream.js";

// busienssRepository 사업계획서
const business = AppDataSource.getRepository(Business);
const status = AppDataSource.getRepository(Status);
const businessInformation = AppDataSource.getRepository(BusinessInformation);
const regularyMeeting = AppDataSource.getRepository(RegularyMeeting);


export const enterprisePlan = async (req, res: Response) /*: Promise<RegisterPlanRes | unknown>*/ => {
    try {
        // const page = await pdf2json(req);
        const page1 = await bufferStream(req)

        // const cover: string = page!.shift()
        //     ?? ''
        // const page1 = page.join(' ')

        // console.log(cover)

        // fs.writeFileSync(`result/${req.file.originalname.split('.')[0]}2.txt`, Buffer.concat(data).toString())

        // console.log(page)
        const planRes: RegisterPlanRes = {

        }
        
        return res.status(201).json({
            "data": planRes,
            "statusCode": 201,
            "statusMsg": 'Created'
        })
    } catch (err) {
        console.error(err);
        return err;
    }
}