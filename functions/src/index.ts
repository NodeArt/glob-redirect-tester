import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as services from './service/match.service';

const corsHandler = cors({origin: true});

module.exports.globMatcher = functions.https.onRequest((req, res) => {

  corsHandler(req, res, () => {
    try {
      const from = req.query.from as string;
      const to = req.query.to as string;
      const url = req.query.url as string;
      const result = services.checkWildcardPatterns(from, url, to);

      res.send(JSON.stringify({from, to, url, result}));
    } catch (e) {
      res.send(e);
    }
  })
});
