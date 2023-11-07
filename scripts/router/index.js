import express from 'express';
import multer from "multer";
import * as register from '../controller/registerReport.js';
const router = express();
const upload = multer({
    storage: multer.diskStorage({
        filename(req, file, done) {
            console.log(file);
            done(null, file.originalname);
        },
        destination(req, file, done) {
            console.log(file);
            done(null, 'upload');
        },
    }),
});
router.post('/register/report', upload.single('filename'), register.registerResultReport);
export default router;
//# sourceMappingURL=index.js.map