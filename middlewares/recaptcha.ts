import { Request, Response, NextFunction } from 'express';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import RecaptchaError from '../errors/RecaptchaError';

const { GOOGLE_PROJECT_ID = '', RECAPTCHA_SITE_KEY = '' } = process.env;

const validateRecaptcha = (req: Request, res: Response, next: NextFunction) => {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    throw new RecaptchaError();
  }

  const client = new RecaptchaEnterpriseServiceClient();

  client.createAssessment({
    assessment: {
      event: {
        token: recaptchaToken,
        siteKey: RECAPTCHA_SITE_KEY,
      },
    },
    parent: client.projectPath(GOOGLE_PROJECT_ID),
  })
    .then((response) => {
      if (!response[0].tokenProperties?.valid) {
        throw new RecaptchaError();
      }

      next();
    })
    .catch(next);
};

export default validateRecaptcha;
