const clickhouse = require('@clickhouse/client')

// var clickConnect = new clickhouse();

const client = clickhouse({
    host: process.env.CLICKHOUSE_HOST,
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD
})


    await client.exec({
        query: `
          CREATE TABLE IF NOT EXISTS clickhouse_js_example_table
          (id UInt64, name String)
          ORDER BY (id)
        `,
        clickhouse_settings: {
            wait_end_of_query: 1,
        },
    })


