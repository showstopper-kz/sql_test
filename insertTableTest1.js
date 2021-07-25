const { query } = require("./Mysql");
const { performance } = require('perf_hooks');

function randomString(e) {    
    e = e || 32;
    let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function buildURL() {
    let lenA = Math.floor( Math.random() * 100 );
    let lenB = Math.floor( Math.random() * 100 );
    let lenC = Math.floor( Math.random() * 100 );
    return 'https://trendmicro.com/' + randomString(lenA) + '/'
    + randomString(lenB) +'/'+ randomString(lenC)
}

async function insertInfo() {
    //console.log(targetType)

    var start = performance.now();
    for(j = 0; j < 500000; j++) {
        console.log(j)
        targetType = Math.floor( Math.random()*10 );
        id = String(j+1).padStart(8, 0);
        // console.log(id);

        date = new Date().toLocaleString();
        date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
        console.log(date)
        url = buildURL();
        // console.log(url);

        const rows = await query(`select uuid from customer_uuid where id = ${(j % 6000) + 1}`);
        customerId = rows[0].uuid;  
        //console.log(customerId);
        await query(`insert into test_table_50 (customer_id, id, target_type, target, created_time) values (\'${customerId}\', \'${id}\', ${targetType}, \'${url}\',\'${date}\')`);
    }
        var end = performance.now();
        console.log('cost is,',(end - start) / 1000, ' s');
}

insertInfo()

