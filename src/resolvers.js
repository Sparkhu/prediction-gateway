const Influx = require('influx') 
const config = require('config');

const dbs = config.get('databases')


var ampds2_tables = [
    {
        name: 'electricity'
    }
]

const resolvers = {
  Query: {
    featurePrediction: async (obj, args) => {
        res = {
            start: null,
            end: null,
            length: 0,
            feature: {
                name: args.input.featureName
            },
            prediction: {
                timestamps: [],
                values: []
            }
        };
        db = dbs.find(d => d.name === args.input.dbName);
        if(db.conn.scheme === 'influx'){
            console.log("Influx fetching called")
            var influx = new Influx.InfluxDB({
                host: db.conn.host,
                port: db.conn.port,
                database: db.name
            });
            if(!args.input.end && !args.input.reqNum)
              args.input.reqNum = 50;
            queryStatement = `SELECT ${args.input.featureName} FROM ${args.input.tableName} WHERE time >= '${args.input.start}'`;
            if(args.input.end)
              queryStatement += ` AND time <= ${args.input.end}`;
            if(args.input.reqNum)
              queryStatement += ` LIMIT ${args.input.reqNum}`;
            queryStatement += " tz('Asia/Seoul');";
            console.log("query: "+queryStatement);
            var results = await influx.query(queryStatement);
            if(!results[0]){
                console.log("no result")
                return res;
            }
            res.start = results[0].time;
            res.end = results[results.length-1].time;
            res.length = results.length;
            res.feature = {
                name: args.input.featureName
            };
            res.prediction= {
                timestamps: results.map(point => point.time),
                values: results.map(point => point[args.input.featureName])
            };
        }
        return res;
    }
    
  }
};

module.exports = resolvers;


`
response 객체 등 new find findBy로 클래스화하기
`