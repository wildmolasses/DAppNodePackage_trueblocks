
/*

WARNING: This file is autogenerated by template-parser.
You can edit the corresponding template file in /templates.

*/

const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const app = express();
const port = !isNaN(process.argv[2]) ? process.argv[2] : 8080;
let env = process.env;
env.API_MODE = true;
//env.TEST_MODE = true;
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/docs', express.static(__dirname + '/docs'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    return res.send(
`Welcome to TrueBlocks!
Try one of the following:
    /list?address=0x8ad69ae99804935d56704162e3f6a6f442d2ed4a
    /export?address=0x8ad69ae99804935d56704162e3f6a6f442d2ed4a
    /export_logs/:id
    /ls
    /accounts/:id
    /blocks/:id
    /transactions/:id
    /logs/:id
    /receipts/:id
    /traces/:id
    /tracecnt/:id
    /abi/:id
    /state/balance/:id
    /state/code/:id
    /state/nonce/:id
    /balances/:id
    /message/:bytes
    /slurp/:id
    /quotes/:id
`);
})

var cnt = 0;
function reportAndSend(routeName, code, res) {
    console.log(`"${routeName}" exiting: ${code === undefined ? "OK" : code}`);
    console.log(`------------- ${++cnt} ---------------------------`);
    return res.send();
}

const generateCmd = (opts, queryObj) => {
    let cmd = Object.entries(queryObj).map(([key, val]) => {
        let option = opts[key];
        let cmdString = [];
        if(option.optionType === "main") {
            cmdString.push(val);
        } else if(option.dataType === "boolean") {
            cmdString.push(`--${key}`)
        } else {
            cmdString.push(`--${key}`, val)
        }
        return cmdString;
    }).reduce((acc, val) => acc.concat(val), [])
    .join(' ');
    console.log(`command options passed to tool: ${cmd}`);
    return cmd;
}

app.get('/export', (req, res) => {   
    let opts = {"maxBlocks":{"dataType":"<val>","optionType":"optional"},"ripe":{"dataType":"boolean","optionType":"hidden"},"unripe":{"dataType":"boolean","optionType":"hidden"},"noBlooms":{"dataType":"boolean","optionType":"hidden"},"staging":{"dataType":"boolean","optionType":"hidden"},"start":{"dataType":"<num>","optionType":"hidden"},"address_list":{"dataType":"boolean","optionType":"main"},"fmt":{"dataType":"<fmt>","optionType":"optional"},"articulate":{"dataType":"boolean","optionType":"optional"},"logs":{"dataType":"boolean","optionType":"optional"},"blocks":{"dataType":"<on/off>","optionType":"hidden"},"txs":{"dataType":"<on/off>","optionType":"hidden"},"traces":{"dataType":"<on/off>","optionType":"hidden"},"ddos":{"dataType":"<on/off>","optionType":"hidden"},"maxTraces":{"dataType":"<num>","optionType":"hidden"},"end":{"dataType":"<num>","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['export', cmd], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("export", code, res);
    })
})

app.get('/list', (req, res) => {
    let opts = {"maxBlocks":{"dataType":"<val>","optionType":"optional"},"ripe":{"dataType":"boolean","optionType":"hidden"},"unripe":{"dataType":"boolean","optionType":"hidden"},"noBlooms":{"dataType":"boolean","optionType":"hidden"},"staging":{"dataType":"boolean","optionType":"hidden"},"start":{"dataType":"<num>","optionType":"hidden"},"filenames":{"dataType":"boolean","optionType":"main"},"check":{"dataType":"boolean","optionType":"optional"},"data":{"dataType":"boolean","optionType":"optional"},"sort":{"dataType":"boolean","optionType":"optional"},"fix":{"dataType":"boolean","optionType":"optional"},"list":{"dataType":"boolean","optionType":"optional"},"cacheBals":{"dataType":"boolean","optionType":"optional"},"balances":{"dataType":"boolean","optionType":"optional"},"import":{"dataType":"boolean","optionType":"optional"},"remove":{"dataType":"boolean","optionType":"optional"},"truncate":{"dataType":"<num>","optionType":"optional"},"maxBlock":{"dataType":"<num>","optionType":"optional"},"merge":{"dataType":"boolean","optionType":"optional"},"fmt":{"dataType":"<fmt>","optionType":"optional"},"skip":{"dataType":"boolean","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['list', cmd],  {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("list", code, res);
    })
})

app.get('/ls', (req, res) => {
    var longList = ""
    if (req.query.ll)
        longList = "-l";
    let chifra = spawn("chifra", ['ls', req.query.address, longList], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("ls", code, res);
    })
})

app.get('/accounts', (req, res) => {
    let opts = {"terms":{"dataType":"boolean","optionType":"main"},"expand":{"dataType":"boolean","optionType":"optional"},"matchCase":{"dataType":"boolean","optionType":"optional"},"owned":{"dataType":"boolean","optionType":"optional"},"custom":{"dataType":"boolean","optionType":"optional"},"prefund":{"dataType":"boolean","optionType":"optional"},"named":{"dataType":"boolean","optionType":"optional"},"addr":{"dataType":"boolean","optionType":"optional"},"fmt":{"dataType":"<fmt>","optionType":"hidden"},"other":{"dataType":"boolean","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['accounts', cmd], {env: env});
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("accounts", code, res);
    })
})

app.get('/blocks', (req, res) => {
    let opts = {"block_list":{"dataType":"boolean","optionType":"main"},"hash_only":{"dataType":"boolean","optionType":"optional"},"check":{"dataType":"boolean","optionType":"optional"},"addrs":{"dataType":"boolean","optionType":"optional"},"uniq":{"dataType":"boolean","optionType":"optional"},"uniqTx":{"dataType":"boolean","optionType":"optional"},"number":{"dataType":"boolean","optionType":"optional"},"filter":{"dataType":"<addr>","optionType":"optional"},"latest":{"dataType":"boolean","optionType":"hidden"},"force":{"dataType":"boolean","optionType":"hidden"},"quiet":{"dataType":"boolean","optionType":"hidden"},"source":{"dataType":"[c|r]","optionType":"hidden"},"fields":{"dataType":"[a|m|c|r]","optionType":"hidden"},"normalize":{"dataType":"boolean","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['blocks', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("blocks", code, res);
    })
})

app.get('/transactions', (req, res) => {
    let opts = {"trans_list":{"dataType":"boolean","optionType":"main"},"articulate":{"dataType":"boolean","optionType":"optional"},"trace":{"dataType":"boolean","optionType":"optional"},"fmt":{"dataType":"<fmt>","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['trans', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("transactions", code, res);
    })
})

app.get('/logs', (req, res) => {
    let opts = {"trans_list":{"dataType":"boolean","optionType":"main"},"articulate":{"dataType":"boolean","optionType":"optional"},"fmt":{"dataType":"<fmt>","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['logs', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("logs", code, res);
    })
})

app.get('/receipts', (req, res) => {
    let opts = {"trans_list":{"dataType":"boolean","optionType":"main"},"articulate":{"dataType":"boolean","optionType":"optional"},"logs":{"dataType":"boolean","optionType":"optional"},"fmt":{"dataType":"<fmt>","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['receipts', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("receipts", code, res);
    })
})

app.get('/traces', (req, res) => {
    let opts = {"trans_list":{"dataType":"boolean","optionType":"main"},"articulate":{"dataType":"boolean","optionType":"optional"},"countOnly":{"dataType":"boolean","optionType":"optional"},"noHeader":{"dataType":"boolean","optionType":"optional"},"fmt":{"dataType":"<fmt>","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['traces', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("traces", code, res);
    })
})

app.get('/slurp', (req, res) => {
    let opts = {"addrs":{"dataType":"boolean","optionType":"main"},"blocks":{"dataType":"<range>","optionType":"optional"},"type":{"dataType":"<tx_type>","optionType":"optional"},"fmt":{"dataType":"<str>","optionType":"optional"},"silent":{"dataType":"boolean","optionType":"optional"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['slurp', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("slurp", code, res);
    })
})

app.get('/abi', (req, res) => {
    let opts = {"addr":{"dataType":"boolean","optionType":"main"},"canonical":{"dataType":"boolean","optionType":"optional"},"generate":{"dataType":"boolean","optionType":"optional"},"data":{"dataType":"boolean","optionType":"optional"},"encode":{"dataType":"boolean","optionType":"optional"},"json":{"dataType":"boolean","optionType":"optional"},"noconst":{"dataType":"boolean","optionType":"optional"},"open":{"dataType":"boolean","optionType":"optional"},"sol":{"dataType":"<fn>","optionType":"optional"},"silent":{"dataType":"boolean","optionType":"hidden"},"nodec":{"dataType":"boolean","optionType":"hidden"},"known":{"dataType":"boolean","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['abi', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("abi", code, res);
    })
})

app.get('/state', (req, res) => {
    let opts = {"address_list":{"dataType":"boolean","optionType":"main"},"block_list":{"dataType":"boolean","optionType":"main"},"mode":{"dataType":"<val>","optionType":"optional"},"nozero":{"dataType":"boolean","optionType":"optional"},"changes":{"dataType":"boolean","optionType":"optional"},"noHeader":{"dataType":"boolean","optionType":"hidden"},"fmt":{"dataType":"<fmt>","optionType":"hidden"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['data', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("state/nonce", code, res);
    })
})

app.get('/balances/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
    let chifra = spawn("chifra", ['balances', `${id}`], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("balances", code, res);
    })
})

app.get('/message/:id', (req, res) => {
    var id = "";
    if (typeof req.params.id != undefined)
        id = req.params.id;
//    let chifra = spawn("chifra", ['data', '--message', `${id}`], { env: env });
    let chifra = spawn("chifra", ['data', '--message', `${id}`], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("message", code, res);
    })
})

app.get('/quotes', (req, res) => {
    let opts = {"at":{"dataType":"<timestamp>","optionType":"optional"},"current":{"dataType":"boolean","optionType":"optional"},"data":{"dataType":"boolean","optionType":"optional"},"freshen":{"dataType":"boolean","optionType":"optional"},"period":{"dataType":"<5|15|30|*120|240|1440>","optionType":"optional"},"pair":{"dataType":"<val>","optionType":"optional"}};
    let cmd = generateCmd(opts, req.query);
    let chifra = spawn("chifra", ['quotes', cmd], { env: env });
    chifra.stderr.pipe(process.stderr);
    chifra.stdout.pipe(res).on('finish', (code) => {
        reportAndSend("quotes", code, res);
    })
})

app.listen(port, () => {
    console.log('TrueBlocks Data API initialized on port ' + port);
});
