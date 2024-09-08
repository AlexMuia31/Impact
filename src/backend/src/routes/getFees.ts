import {Request, Response, Router} from 'express';
import {getFees} from '../utils/fees';

const router = Router();

router.get('/get-fees', async (req: Request, res: Response) => {

    try {
        const userId =req.currUser ? req.currUser.id : req.body.userId
        const {amount, token} = req.body;

        let fees = await getFees(userId, amount, token);
        console.log({fees});

        if(!fees){
           return null
        }

    res.send({
        status: 200,
        message: 'Fees fetched successfully',
        data:  fees
        });

    } catch (error) {
        console.log('Error getting fees', error);
        res.send({
            status: 500,
            message: 'Error fetching fees',
            data: error
        });

    }
});

export {router as feesRouter};