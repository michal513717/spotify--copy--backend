import express, { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";

let formidable = require('formidable');
let fs = require('fs');

export class UploadRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UploadRoutes');
    }


    configureRoutes() {
        
        this.app.route('/upload')
            .post(async (req: express.Request, res: express.Response) => { // need to add chekcing system // who send the files 

                var form = new formidable.IncomingForm();
                form.uploadDir = __dirname + "/../uploadFiles"       // folder to save files
                form.keepExtensions = true                           // save with file extension
                form.multiples = true                                // mulitpli save    
                form.parse(req, function (err:any, fields:any, files:any) {}); // need to add callback for cheking files 
        });

        return this.app;
    }
}