import express from 'express';
import multer from "multer";

import { registerResultReport } from '../controller/registerReport.refactor.js'
import { enterprisePlan } from '../controller/registerApply.js'

const router = express();

const upload = multer({
    storage: multer.diskStorage({
        filename(req, file, done) {
            console.log(file, 'filename')
            done(null, file.originalname);
        },
        destination(req, file, done) {
            console.log(file, 'destination')
            done(null, 'upload');
        },
    }),
})

router.post('/register/report', upload.single('filename'), registerResultReport);
router.post('/register/apply', upload.single('filename'), enterprisePlan);

export default router;