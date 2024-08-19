const transactionService = require('./TransactionService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Health Checking
app.get('/health', (req, res) => {
    res.json("This is the health check");
});

// ADD TRANSACTION
app.post('/transaction', (req, res) => {
    try {
        console.log(req.body);
        console.log(req.body.amount);
        console.log(req.body.description);
        var success = transactionService.addTransaction(req.body.amount, req.body.description);
        if (success === 200) res.json({ message: 'Added transaction successfully' });
    } catch (err) {
        res.json({ message: 'Something went wrong', error: err.message });
    }
});

// GET ALL TRANSACTIONS
app.get('/transaction', (req, res) => {
    try {
        var transactionList = [];
        transactionService.getAllTransactions(function (results) {
            console.log("We are in the callback:");
            for (const row of results) {
                transactionList.push({ "id": row.id, "amount": row.amount, "description": row.description });
            }
            console.log(transactionList);
            res.statusCode = 200;
            res.json({ "result": transactionList });
        });
    } catch (err) {
        res.json({ message: "Could not get all transactions", error: err.message });
    }
});

// DELETE ALL TRANSACTIONS
app.delete('/transaction', (req, res) => {
    try {
        transactionService.deleteAllTransactions(function (result) {
            res.statusCode = 200;
            res.json({ message: "Delete function execution finished." });
        });
    } catch (err) {
        res.json({ message: "Deleting all transactions may have failed.", error: err.message });
    }
});

// DELETE ONE TRANSACTION
app.delete('/transaction/:id', (req, res) => {
    try {
        transactionService.deleteTransactionById(req.params.id, function (result) {
            res.statusCode = 200;
            res.json({ message: `Transaction with id ${req.params.id} seemingly deleted` });
        });
    } catch (err) {
        res.json({ message: "Error deleting transaction", error: err.message });
    }
});

// GET SINGLE TRANSACTION
app.get('/transaction/:id', (req, res) => {
    try {
        transactionService.findTransactionById(req.params.id, function (result) {
            res.statusCode = 200;
            var id = result[0].id;
            var amt = result[0].amount;
            var desc = result[0].description;
            res.json({ "id": id, "amount": amt, "description": desc });
        });
    } catch (err) {
        res.json({ message: "Error retrieving transaction", error: err.message });
    }
});

app.listen(port, () => {
    console.log(`AB3 backend app listening at http://localhost:${port}`);
});
